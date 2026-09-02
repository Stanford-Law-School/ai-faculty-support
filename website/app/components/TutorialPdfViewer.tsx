"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

/* ---------------------------------------------------------------------------
   The in-page reader for a tutorial PDF.

   What this replaces, and why. The preview used to be `<object type=
   "application/pdf">` — the file handed to whatever PDF viewer the browser has
   built in. That is the smallest possible amount of code, and it works right up
   until the browser declines: Chrome renders nothing and shows the element's
   fallback text when its PDF viewer is switched off, whether by the reader
   ("Download PDFs instead of automatically opening them in Chrome"), by a
   managed-device policy such as AlwaysOpenPdfExternally, or by an extension that
   takes over PDF handling. On a Law School laptop those settings are common and
   not the reader's to change, so a preview that depends on them is a preview
   that some faculty simply never see.

   So the pages are drawn here instead, with pdf.js, onto canvases this component
   owns. Nothing about the browser's PDF handling can switch that off. The file
   fetched is the same file the download link points at — there is no second,
   converted copy to drift out of date.

   Three properties this keeps from the old approach:

     - No network beyond the PDF itself. pdf.js is bundled with the site and the
       worker is served from the site's own origin; nothing here calls out to a
       CDN or a document-conversion service.
     - The first-page image above still renders whatever happens here. If this
       component fails, or JavaScript never runs, the reader still sees what the
       document is and still has the download.
     - Failure is stated, not silent. An unreadable file says so and repeats the
       download link, which is what the `<object>` fallback used to do.

   What is deliberately not here: a text layer. Selecting and searching text
   inside the canvas is not possible, so "Open in a new tab" and the download —
   both above this component, both the same file — remain the way to search a
   tutorial. Rendering pages as canvas and not offering a text layer is also why
   every page carries its number in an accessible name rather than pretending to
   be readable content: a screen-reader user needs the download, and the page
   says so.
   ------------------------------------------------------------------------- */

type Props = {
  /** Path to the PDF in the static output; the same path the download uses. */
  file: string;
  /** Filename for the download link inside the failure message. */
  name: string;
  /** Document title, used in the accessible name and the failure message. */
  title: string;
  /** Page count, from the tutorial record rather than from the file. */
  pages: number;
  /** Human-readable size, already formatted by the caller. */
  sizeLabel: string;
  /** "PDF" — the record's format, uppercased by the caller. */
  format: string;
};

type Status = "loading" | "ready" | "unavailable";

/**
 * How far outside the scroll box a page starts drawing — and, since a page that
 * leaves this band is discarded, how many pages are held in memory at once. One
 * viewport either side keeps scrolling ahead of the reader without keeping forty
 * canvases alive.
 */
const PRERENDER_MARGIN = "100% 0px";

/**
 * Canvas backing scale. Above 2 the memory cost of a 40-page document outweighs
 * a sharpness difference nobody can see, so a 3x phone screen draws at 2x.
 */
const MAX_PIXEL_RATIO = 2;

/**
 * A ceiling on the bitmap, in device pixels across. A page canvas costs four
 * bytes per pixel, so an uncapped 2x draw on a wide desktop screen is tens of
 * megabytes per page and hundreds across the band above. 1600 across a US Letter
 * page is about 190 dpi — sharper than the screen showing it.
 */
const MAX_CANVAS_WIDTH = 1600;

/** A width change smaller than this is not worth re-drawing every visible page for. */
const REDRAW_THRESHOLD_PX = 24;

export function TutorialPdfViewer({ file, name, title, pages, sizeLabel, format }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const docRef = useRef<PDFDocumentProxy | null>(null);
  const tasksRef = useRef(new Map<number, RenderTask>());
  /** Width each page was last drawn at, so a resize redraws and a scroll does not. */
  const drawnAtRef = useRef(new Map<number, number>());
  const [status, setStatus] = useState<Status>("loading");
  const [current, setCurrent] = useState(1);
  /** Height/width of page one, so the placeholders reserve the right space. */
  const [ratio, setRatio] = useState(11 / 8.5);

  /**
   * Draws one page at the current container width. Re-entrant by design: the
   * observer fires again on every scroll back, and a redraw after a resize hits
   * pages that already have a canvas, so both cases check the width a page was
   * last drawn at and return early rather than queueing a second render.
   */
  const drawPage = useCallback(async (pageNumber: number) => {
    const doc = docRef.current;
    const host = pageRefs.current[pageNumber - 1];
    const container = scrollRef.current;
    if (!doc || !host || !container) return;

    const width = Math.floor(host.clientWidth);
    if (width < 1) return;
    const drawnAt = drawnAtRef.current.get(pageNumber);
    if (drawnAt !== undefined && Math.abs(drawnAt - width) < REDRAW_THRESHOLD_PX) return;

    // Claim the width before the first await: two observer callbacks in the same
    // frame would otherwise both pass the check above and render twice.
    drawnAtRef.current.set(pageNumber, width);
    tasksRef.current.get(pageNumber)?.cancel();
    tasksRef.current.delete(pageNumber);

    try {
      const page = await doc.getPage(pageNumber);
      const unscaled = page.getViewport({ scale: 1 });
      const ratioForPixels = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      const bitmapWidth = Math.min(width * ratioForPixels, MAX_CANVAS_WIDTH);
      const viewport = page.getViewport({ scale: bitmapWidth / unscaled.width });

      const canvas = document.createElement("canvas");
      canvas.className = "tutorialPdfCanvas";
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      // The CSS size is the layout size; the bitmap above is denser on a retina
      // screen, which is the whole point of the pixel ratio.
      canvas.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", `Page ${pageNumber} of ${pages}`);
      const context = canvas.getContext("2d");
      if (!context) {
        drawnAtRef.current.delete(pageNumber);
        return;
      }

      const task = page.render({ canvas, canvasContext: context, viewport });
      tasksRef.current.set(pageNumber, task);
      await task.promise;
      tasksRef.current.delete(pageNumber);

      // Drawing takes long enough that the page may have been discarded, or
      // claimed at a new width, while it ran. The width claim is the record of
      // which draw the placeholder is waiting for; anything else is stale and is
      // dropped rather than attached over a newer canvas.
      if (drawnAtRef.current.get(pageNumber) !== width) return;
      host.replaceChildren(canvas);
    } catch (error) {
      // A cancelled render is the ordinary case — a resize mid-draw — and says
      // nothing about the file. Anything else means this page is not drawable, so
      // let it be attempted again rather than leaving a width claimed.
      const cancelled = (error as { name?: string } | null)?.name === "RenderingCancelledException";
      if (!cancelled) drawnAtRef.current.delete(pageNumber);
    }
  }, [pages]);

  /**
   * Gives a page's memory back once it is well away from the viewport. Without
   * this a reader who scrolls to the end of a forty-page tutorial leaves forty
   * canvases behind, which on a retina screen is measured in hundreds of
   * megabytes. The placeholder keeps its reserved height, so nothing moves, and
   * scrolling back draws the page again in a fraction of a second.
   */
  const discardPage = useCallback((pageNumber: number) => {
    if (!drawnAtRef.current.has(pageNumber)) return;
    drawnAtRef.current.delete(pageNumber);
    tasksRef.current.get(pageNumber)?.cancel();
    tasksRef.current.delete(pageNumber);
    pageRefs.current[pageNumber - 1]?.replaceChildren();
  }, []);

  // Load the document. Everything else in this component waits on this effect.
  useEffect(() => {
    let cancelled = false;
    const tasks = tasksRef.current;

    (async () => {
      try {
        // The legacy build, and only in the browser: it carries the compatibility
        // shims for the older Safari and Firefox versions faculty machines run,
        // and importing it lazily keeps pdf.js out of every other page's bundle.
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        // Bundled and served from this origin, so the worker is not a request to
        // somebody else's CDN.
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const doc = await pdfjs.getDocument({ url: file }).promise;
        if (cancelled) {
          // Tearing down goes through the loading task, which is what owns the
          // network requests and the worker.
          void doc.loadingTask.destroy();
          return;
        }
        docRef.current = doc;

        const first = await doc.getPage(1);
        const viewport = first.getViewport({ scale: 1 });
        if (cancelled) return;
        setRatio(viewport.height / viewport.width);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("unavailable");
      }
    })();

    return () => {
      cancelled = true;
      for (const task of tasks.values()) task.cancel();
      tasks.clear();
      void docRef.current?.loadingTask.destroy();
      docRef.current = null;
    };
  }, [file]);

  // Draw pages as they approach the viewport, redraw them when the box resizes,
  // and keep the page counter honest while the reader scrolls.
  useEffect(() => {
    if (status !== "ready") return;
    const container = scrollRef.current;
    if (!container) return;

    const hosts = pageRefs.current.filter((host): host is HTMLDivElement => host !== null);

    const visible = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const pageNumber = Number((entry.target as HTMLElement).dataset.page);
          if (!pageNumber) continue;
          if (entry.isIntersecting) void drawPage(pageNumber);
          else discardPage(pageNumber);
        }
      },
      { root: container, rootMargin: PRERENDER_MARGIN },
    );
    for (const host of hosts) visible.observe(host);

    // Which page the reader is actually on: the last one whose top has passed the
    // top of the box. Read in a rAF so a fast scroll does not measure per event.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const top = container.scrollTop;
        let seen = 1;
        for (let index = 0; index < hosts.length; index += 1) {
          if (hosts[index].offsetTop - container.offsetTop <= top + 8) seen = index + 1;
        }
        setCurrent(seen);
      });
    };
    container.addEventListener("scroll", onScroll, { passive: true });

    // A resize changes what "full width" means, so already-drawn pages are drawn
    // again — but only the ones on screen, and only after the drag has settled.
    let resizeTimer: number | undefined;
    const resized = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const top = container.scrollTop;
        const bottom = top + container.clientHeight;
        for (let index = 0; index < hosts.length; index += 1) {
          const host = hosts[index];
          const hostTop = host.offsetTop - container.offsetTop;
          if (hostTop + host.clientHeight >= top && hostTop <= bottom) void drawPage(index + 1);
        }
      }, 200);
    });
    resized.observe(container);

    return () => {
      visible.disconnect();
      resized.disconnect();
      container.removeEventListener("scroll", onScroll);
      window.clearTimeout(resizeTimer);
    };
  }, [discardPage, drawPage, status]);

  const goToPage = useCallback((pageNumber: number) => {
    const container = scrollRef.current;
    const host = pageRefs.current[pageNumber - 1];
    if (!container || !host) return;
    container.scrollTo({ top: host.offsetTop - container.offsetTop, behavior: "smooth" });
    setCurrent(pageNumber);
  }, []);

  if (status === "unavailable") {
    return (
      <div className="tutorialPreviewFrame tutorialPdfUnavailable">
        <div className="tutorialPreviewFallback">
          <p>
            This {format} could not be displayed in the page. The first page is shown above.
          </p>
          <p>
            <a href={file} download={name}>
              Download {title} ({pages} pages, {sizeLabel})
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="tutorialPdfScroll tutorialPreviewFrame"
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label={`All ${pages} pages of ${title}`}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? (
          <p className="tutorialPdfLoading">Loading all {pages} pages&hellip;</p>
        ) : null}
        {Array.from({ length: pages }, (_, index) => (
          <div
            className="tutorialPdfPage"
            key={index}
            data-page={index + 1}
            style={{ aspectRatio: `1 / ${ratio}` }}
            ref={(element) => {
              pageRefs.current[index] = element;
            }}
          />
        ))}
      </div>
      {/* Controls come after the pages in the DOM so a keyboard reader meets the
          document before the navigation, and they are hidden until the document
          is open, because a control that cannot act yet is worse than none. */}
      {status === "ready" ? (
        <div className="tutorialPdfControls">
          <button
            type="button"
            className="tutorialPdfStep"
            onClick={() => goToPage(Math.max(1, current - 1))}
            disabled={current <= 1}
          >
            &larr; Previous page
          </button>
          <p className="tutorialPdfCount" aria-live="polite">
            Page {current} of {pages}
          </p>
          <button
            type="button"
            className="tutorialPdfStep"
            onClick={() => goToPage(Math.min(pages, current + 1))}
            disabled={current >= pages}
          >
            Next page &rarr;
          </button>
        </div>
      ) : null}
    </>
  );
}

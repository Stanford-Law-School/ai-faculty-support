import Link from "next/link";
import type { ReactNode } from "react";
import { CopyPrompt } from "./CopyPrompt";

/* ---------------------------------------------------------------------------
   Building blocks for the long-form, document-style guides (see
   /build-an-agent). They exist so a guide page reads like a printed handbook:
   a titled document with front matter, a contents list, numbered modules,
   paste-ready prompts, and clearly marked slots where screen recordings and
   screenshots will be dropped in later.
   ------------------------------------------------------------------------- */

/** Front matter for a guide: version, audience, time, and similar rows. */
export function DocMeta({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="docMeta">
      {rows.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A contents box with in-page anchor links. */
export function DocToc({
  heading = "Contents",
  items,
}: {
  heading?: string;
  items: { id: string; label: string; note?: string }[];
}) {
  return (
    <nav className="docToc" aria-label={heading}>
      <p className="eyebrow">{heading}</p>
      <ol>
        {items.map(({ id, label, note }) => (
          <li key={id}>
            <a href={`#${id}`}>{label}</a>
            {note ? <span className="docTocNote">{note}</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** A numbered module: the unit a reader can finish in one sitting. */
export function Module({
  n,
  id,
  title,
  minutes,
  children,
}: {
  n: string;
  id: string;
  title: string;
  minutes?: string;
  children: ReactNode;
}) {
  return (
    <section className="module" id={id} aria-labelledby={`${id}-heading`}>
      <div className="moduleHead">
        <span className="moduleNum" aria-hidden="true">{n}</span>
        <div className="moduleHeadText">
          <p className="eyebrow">
            Module {n}
            {minutes ? ` · about ${minutes}` : ""}
          </p>
          <h2 id={`${id}-heading`}>{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

/** An unnumbered part divider ("Part 2: Build it"). */
export function DocPart({
  label,
  title,
  id,
  children,
}: {
  label: string;
  title: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <section className="docPart" id={id}>
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export type MediaKind = "recording" | "screenshot" | "handout";

const mediaCopy: Record<MediaKind, { label: string; glyph: string }> = {
  recording: { label: "Screen recording", glyph: "▶" },
  screenshot: { label: "Screenshot", glyph: "▣" },
  handout: { label: "Handout / diagram", glyph: "◱" },
};

const videoMime: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

const extensionOf = (path: string) => path.split(".").pop()?.toLowerCase() ?? "";

/**
 * A media slot in a guide, in one of two states.
 *
 * While the asset does not exist yet the slot renders as an obviously empty
 * frame carrying a stable id (for example `GPT-04-A`) so the library team can
 * track which asset belongs where. Filling the slot is a one-line change to
 * the page: add `src` for a file under `website/public/media/`, or `embed` for
 * a Drive or Panopto embed URL, and the same slot renders the real thing.
 *
 * `src` takes one path or several — pass several to offer a `.webm` before the
 * `.mp4` fallback. Files ending `.mp4`, `.webm`, or `.mov` render as a video
 * player, anything else as an image.
 */
export function MediaPlaceholder({
  kind,
  id,
  title,
  shows,
  ratio = "16 / 9",
  src,
  poster,
  alt,
  captions,
  embed,
  embedHref,
}: {
  kind: MediaKind;
  id: string;
  title: string;
  shows?: string;
  ratio?: string;
  /** Path(s) under `public/`, e.g. `/media/build-an-agent/gpt-07-a.mp4`. */
  src?: string | string[];
  /** Still frame shown before a video plays. */
  poster?: string;
  /** Alternative text for an image; falls back to `title`. */
  alt?: string;
  /** Path to a WebVTT caption track for a self-hosted video. */
  captions?: string;
  /** Embed URL for a video hosted elsewhere (Google Drive, Panopto). */
  embed?: string;
  /** Watch-page URL for an embedded video, offered as a fallback link. */
  embedHref?: string;
}) {
  const { label, glyph } = mediaCopy[kind];
  const sources = typeof src === "string" ? [src] : src ?? [];

  if (embed || sources.length) {
    const caption = (
      <figcaption>
        {shows ?? null}
        {embedHref ? (
          <>
            {shows ? " " : null}
            <a href={embedHref} target="_blank" rel="noopener noreferrer">
              Open this {label.toLowerCase()} in a new window
            </a>
            .
          </>
        ) : null}
      </figcaption>
    );

    if (embed) {
      return (
        <figure className={`mediaFigure ${kind}`}>
          <iframe
            className="mediaAsset"
            style={{ aspectRatio: ratio }}
            src={embed}
            title={`${label}: ${title}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
          {caption}
        </figure>
      );
    }

    if (sources.some((path) => extensionOf(path) in videoMime)) {
      return (
        <figure className={`mediaFigure ${kind}`}>
          {/* Instructional recordings, so: controls, no autoplay, load on demand. */}
          <video
            className="mediaAsset"
            style={{ aspectRatio: ratio }}
            controls
            playsInline
            preload="metadata"
            poster={poster}
          >
            {sources.map((path) => (
              <source key={path} src={path} type={videoMime[extensionOf(path)]} />
            ))}
            {captions ? (
              <track kind="captions" src={captions} srcLang="en" label="English" default />
            ) : null}
            <p>
              Your browser cannot play this recording.{" "}
              <a href={sources.find((path) => extensionOf(path) === "mp4") ?? sources[0]}>
                Download it instead
              </a>
              .
            </p>
          </video>
          {caption}
        </figure>
      );
    }

    return (
      <figure className={`mediaFigure ${kind}`}>
        {/* Plain img rather than next/image: screenshot dimensions vary per
            asset, and this static export serves images unoptimized anyway. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mediaAsset" src={sources[0]} alt={alt ?? title} loading="lazy" />
        {caption}
      </figure>
    );
  }

  return (
    <figure className={`mediaPlaceholder ${kind}`}>
      <div
        className="mediaFrame"
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={`Placeholder reserved for a ${label.toLowerCase()}: ${title}. Not yet added.`}
      >
        <span className="mediaGlyph" aria-hidden="true">{glyph}</span>
        <p className="mediaKind">{label} &middot; to be added</p>
        <p className="mediaTitle">{title}</p>
        <span className="pill mediaId">{id}</span>
      </div>
      <figcaption>
        {shows ? <><strong>Will show:</strong> {shows}</> : null}
      </figcaption>
    </figure>
  );
}

const formatBytes = (bytes: number) =>
  bytes >= 1_000_000
    ? `${Math.round(bytes / 1_000_000)} MB`
    : `${Math.round(bytes / 1_000)} KB`;

/**
 * A file a reader can download from a guide — a sample deliverable, a handout,
 * a template. The format and size are shown because a reader deserves to know
 * what they are about to open.
 */
export function FileDownload({
  href,
  label = "Download",
  title,
  format,
  bytes,
  children,
}: {
  href: string;
  label?: string;
  title: string;
  /** Shown to the reader, e.g. "DOCX" or "PDF". */
  format: string;
  bytes?: number;
  children?: ReactNode;
}) {
  return (
    <div className="fileDownload">
      <p className="eyebrow">{label}</p>
      <h3>{title}</h3>
      {children}
      <p className="fileAction">
        <a className="secondary" href={href} download>
          Download {format}
          {bytes ? ` · ${formatBytes(bytes)}` : null}
        </a>
      </p>
    </div>
  );
}

/**
 * A paste-ready prompt. `text` is what a faculty member copies; keep it in a
 * plain template string so what they paste is exactly what they read.
 */
export function PromptBlock({
  label = "Paste this in",
  text,
  after,
  copyLabel,
  itemLabel,
}: {
  label?: string;
  text: string;
  after?: ReactNode;
  /** Visible button text, when "Copy" is too vague on a page with several prompts. */
  copyLabel?: string;
  /** What the aria-live confirmation names, e.g. "Research-lead prompt". */
  itemLabel?: string;
}) {
  return (
    <div className="promptBlock">
      <div className="promptHead">
        <p className="eyebrow">{label}</p>
        <CopyPrompt text={text} label={copyLabel} itemLabel={itemLabel} />
      </div>
      <pre>{text}</pre>
      {after ? <p className="promptAfter muted">{after}</p> : null}
    </div>
  );
}

/** The end-of-module check: plain, checkable statements. */
export function DoneWhen({ items }: { items: ReactNode[] }) {
  return (
    <div className="doneWhen">
      <p className="doneWhenHead">You are done with this module when</p>
      <ul className="checkList">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** Previous / next links at the foot of a guide page. */
export function DocNav({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <nav className="docNav" aria-label="Guide navigation">
      {prev ? (
        <Link className="secondary" href={prev.href}>&larr; {prev.label}</Link>
      ) : <span />}
      {next ? (
        <Link className="primary" href={next.href}>{next.label} &rarr;</Link>
      ) : <span />}
    </nav>
  );
}

import Link from "next/link";
import {
  displayableCurrency,
  formatFileSize,
  formatTutorialDate,
  tutorialHref,
  type Tutorial,
} from "../lib/tutorialLibrary";
import { TutorialPdfViewer } from "./TutorialPdfViewer";

/* ---------------------------------------------------------------------------
   Blocks for the tutorial library. Every value shown here comes from the
   tutorial record in app/lib/tutorialLibrary.ts — titles, dates, page counts,
   and file sizes are never retyped into a page, so a revised document means one
   edited record rather than a search through the markup.

   Visual language reuses the existing classes (.card, .pill, .eyebrow, .crumb,
   .actions, .caution); nothing here adds a palette, font, or icon family.
   ------------------------------------------------------------------------- */

/** Breadcrumb for the library and for a single tutorial. */
export function TutorialCrumb({ tutorialTitle }: { tutorialTitle?: string }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      <Link href="/">AI &amp; Technology Support</Link>
      {" "}&middot;{" "}
      {tutorialTitle ? (
        <Link href="/tutorials">Tutorials</Link>
      ) : (
        <span aria-current="page">Tutorials</span>
      )}
      {tutorialTitle && (
        <>
          {" "}&middot; <span aria-current="page">{tutorialTitle}</span>
        </>
      )}
    </nav>
  );
}

/**
 * The facts a reader needs before opening a long document: format, length, size,
 * when the document itself was last revised, and when it was added here. Dates
 * are machine-readable, and the two are labelled separately because "updated"
 * and "added to the library" are different claims.
 */
export function TutorialFacts({ tutorial }: { tutorial: Tutorial }) {
  const currency = displayableCurrency(tutorial);
  return (
    <>
      <dl className="tutorialFacts">
        <div className="tutorialFact">
          <dt>Format</dt>
          <dd>
            {tutorial.file.format.toUpperCase()} &middot; {tutorial.file.pages} pages &middot;{" "}
            {formatFileSize(tutorial.file.bytes)}
          </dd>
        </div>
        <div className="tutorialFact">
          <dt>Document updated</dt>
          <dd>
            <time dateTime={tutorial.updatedOn}>{formatTutorialDate(tutorial.updatedOn)}</time>
          </dd>
        </div>
        <div className="tutorialFact">
          <dt>Added to the library</dt>
          <dd>
            <time dateTime={tutorial.publishedOn}>{formatTutorialDate(tutorial.publishedOn)}</time>
          </dd>
        </div>
        <div className="tutorialFact">
          <dt>Written for</dt>
          <dd>{tutorial.audience}</dd>
        </div>
      </dl>
      {/* Past its review date the record withholds the "verified" claim and asks
          for a re-check instead, so an unmaintained page cannot keep asserting
          that product screens are current. */}
      <p className={currency.state === "verified" ? "tutorialCurrency" : "tutorialCurrency stale"}>
        {currency.state === "verified" ? null : <strong>Review due. </strong>}
        {currency.label}
      </p>
    </>
  );
}

/**
 * Download and open. Both are plain anchors to a file in the static export:
 * no click handler, no counter, no redirect through a tracker. `download` gives
 * the file a readable name; the second link is for readers whose browser would
 * rather display it than save it.
 */
export function TutorialActions({ tutorial }: { tutorial: Tutorial }) {
  return (
    <div className="actions">
      <a className="primary" href={tutorial.file.path} download={tutorial.file.name}>
        Download the {tutorial.file.format.toUpperCase()}
        <span className="srOnly">
          {" "}
          ({tutorial.file.pages} pages, {formatFileSize(tutorial.file.bytes)})
        </span>
      </a>
      <a className="secondary" href={tutorial.file.path} target="_blank" rel="noopener">
        Open in a new tab
      </a>
    </div>
  );
}

/**
 * The preview, in two layers, because one layer is never enough: whichever way a
 * PDF is put on a page, some browser somewhere declines to show it.
 *
 * The first layer is an image of the document's real first page. It is always
 * rendered — no script, no plugin, no PDF handling of any kind — so a phone, a
 * browser with JavaScript off, and a printed copy all still show what the
 * document is.
 *
 * The second layer draws every page with pdf.js. It used to be an `<object>`
 * handed to the browser's own viewer, which Chrome refuses to run when its PDF
 * viewer is switched off by a setting, a managed-device policy, or an extension —
 * common on a Law School laptop, and not something the reader can change. Drawing
 * the pages here does not depend on any of that. See TutorialPdfViewer.
 */
export function TutorialPreview({ tutorial }: { tutorial: Tutorial }) {
  return (
    <>
      <figure className="tutorialCoverFigure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="tutorialCoverImage"
          src={tutorial.cover.path}
          width={tutorial.cover.width}
          height={tutorial.cover.height}
          alt={tutorial.cover.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="tutorialPreviewCaption">
          First page of {tutorial.file.pages}.
        </figcaption>
      </figure>
      <figure className="tutorialPreview">
        <TutorialPdfViewer
          file={tutorial.file.path}
          name={tutorial.file.name}
          title={tutorial.title}
          pages={tutorial.file.pages}
          sizeLabel={formatFileSize(tutorial.file.bytes)}
          format={tutorial.file.format.toUpperCase()}
        />
        {/* Without JavaScript the reader above never runs, so the page says so
            here rather than leaving an empty box captioned "all 42 pages". */}
        <noscript>
          <div className="tutorialPreviewFrame">
            <div className="tutorialPreviewFallback">
              <p>
                The in-page reader needs JavaScript. The first page is shown above, and the
                whole {tutorial.file.format.toUpperCase()} is a download.
              </p>
              <p>
                <a href={tutorial.file.path} download={tutorial.file.name}>
                  Download {tutorial.title} ({tutorial.file.pages} pages,{" "}
                  {formatFileSize(tutorial.file.bytes)})
                </a>
              </p>
            </div>
          </div>
        </noscript>
        <figcaption className="tutorialPreviewCaption">
          All {tutorial.file.pages} pages, drawn in the page. The download is the same file, and
          opening it in a new tab is the way to search the text.
        </figcaption>
      </figure>
    </>
  );
}

/** The document's own structure, so a reader can tell whether it covers their task. */
export function TutorialContents({ tutorial }: { tutorial: Tutorial }) {
  return (
    <ol className="tutorialContents">
      {tutorial.contents.map((section) => (
        <li className="tutorialContentsItem" key={section.title}>
          <span className="tutorialContentsTitle">{section.title}</span>
          {section.detail ? <span className="muted">{section.detail}</span> : null}
        </li>
      ))}
    </ol>
  );
}

/** What the reader can do afterwards, in the document's own terms. */
export function TutorialOutcomes({ tutorial }: { tutorial: Tutorial }) {
  return (
    <ul className="tutorialOutcomes">
      {tutorial.whatYouLearn.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * The limits the tutorial states about itself. Rendered as a caution rather than
 * a footnote: these are the sentences a reader most needs before configuring an
 * assistant, and the record refuses to validate without at least one.
 */
export function TutorialCautions({ tutorial }: { tutorial: Tutorial }) {
  return (
    <div className="caution tutorialCautions">
      <p className="eyebrow">Before you build one</p>
      <ul>
        {tutorial.cautions.map((caution) => (
          <li key={caution}>{caution}</li>
        ))}
      </ul>
    </div>
  );
}

/** What products or platforms the tutorial actually covers. */
export function TutorialCovers({ tutorial }: { tutorial: Tutorial }) {
  return (
    <ul className="tutorialCovers">
      {tutorial.covers.map((item) => (
        <li className="tutorialCover" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * A tutorial in a list. Used by the library index and by cross-links from the
 * Learn AI landing page, so a reader sees the same facts wherever it appears.
 */
export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <Link className="card interactive tutorialCard" href={tutorialHref(tutorial.slug)}>
      {/* The thumbnail is the document's real first page, marked decorative: the
          heading and metadata beside it already say everything it conveys, and a
          second description would be noise in a screen reader. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="tutorialCardThumb"
        src={tutorial.cover.path}
        width={tutorial.cover.width}
        height={tutorial.cover.height}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <div className="tutorialCardBody">
        <span className="pill available">
          <span className="dot" aria-hidden="true" />
          {tutorial.file.format.toUpperCase()} &middot; {tutorial.file.pages} pages
        </span>
        <h3>{tutorial.title}</h3>
        <p className="tutorialCardSubtitle">{tutorial.subtitle}</p>
        <p className="muted">{tutorial.summary}</p>
        <p className="tutorialCardMeta">
          Updated <time dateTime={tutorial.updatedOn}>{formatTutorialDate(tutorial.updatedOn)}</time>{" "}
          &middot; {formatFileSize(tutorial.file.bytes)}
        </p>
        <span className="explore">Open the tutorial &rarr;</span>
      </div>
    </Link>
  );
}

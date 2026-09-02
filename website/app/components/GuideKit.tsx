import Link from "next/link";
import type { ReactNode } from "react";
import { formatReviewDate, guideHref, type Guide } from "../lib/guides";

/* ---------------------------------------------------------------------------
   Building blocks for the Learn AI faculty guides ("AI on the Record"). These
   are the repeatable instructional patterns — answer first, one faculty move,
   an exercise, the three questions, source notes — so a second guide is a page
   of content rather than a copy of this template.

   Visual language comes from the existing design tokens and shared classes
   (.card, .pill, .eyebrow, .crumb, .actions); nothing here introduces a new
   palette, font, or icon family.
   ------------------------------------------------------------------------- */

/** The site's breadcrumb pattern, extended to the Learn AI section. */
export function GuideCrumb({ guideTitle }: { guideTitle?: string }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      <Link href="/">AI &amp; Technology Support</Link>
      {" "}&middot;{" "}
      {guideTitle ? <Link href="/learn-ai">Learn AI</Link> : <span aria-current="page">Learn AI</span>}
      {guideTitle && (
        <>
          {" "}&middot; <span aria-current="page">{guideTitle}</span>
        </>
      )}
    </nav>
  );
}

/**
 * Review date and read time. The date is machine-readable in a <time> element
 * and comes from the guide record, never retyped into body copy.
 */
export function GuideMetadata({ guide }: { guide: Guide }) {
  return (
    <p className="guideMeta">
      {guide.reviewedThrough && (
        <>
          Reviewed{" "}
          <time dateTime={guide.reviewedThrough}>{formatReviewDate(guide.reviewedThrough)}</time>
        </>
      )}
      {guide.reviewedThrough && guide.readTime ? " · " : null}
      {guide.readTime ? `${guide.readTime} read` : null}
    </p>
  );
}

/**
 * Page frame for a single guide: breadcrumb, eyebrow, the one H1, and the
 * metadata line. A later guide supplies only its own children.
 */
export function GuideLayout({
  guide,
  collectionLine,
  children,
}: {
  guide: Guide;
  /**
   * "Working critically with AI · Guide 1 of 5". Opt-in rather than automatic: a
   * guide states its collection when the collection is what orients the reader,
   * and the position is always within the collection — the internal global number
   * is never displayed.
   */
  collectionLine?: string;
  children: ReactNode;
}) {
  // A supporting process resource says so, rather than presenting itself as one
  // of the numbered decisions in the collection.
  const eyebrow =
    guide.kind === "process-resource" ? "Faculty process checklist" : "Faculty AI guide";
  return (
    <article className="guidePage">
      <GuideCrumb guideTitle={guide.title} />
      <p className="eyebrow">{eyebrow}</p>
      {collectionLine ? <p className="guideCollectionLine">{collectionLine}</p> : null}
      <h1>{guide.title}</h1>
      <GuideMetadata guide={guide} />
      {children}
    </article>
  );
}

/**
 * The decision or behaviour the reader came for, before any explanation.
 * Deliberately not styled as an alert: it is the answer, not a warning.
 */
export function AnswerFirst({ children }: { children: ReactNode }) {
  return (
    <div className="answerFirst">
      <p className="srOnly">The short answer</p>
      {children}
    </div>
  );
}

/** The single action worth carrying into teaching, research, or scholarship. */
export function FacultyMove({ children }: { children: ReactNode }) {
  return (
    <aside className="facultyMove" aria-labelledby="faculty-move-label">
      <p className="eyebrow" id="faculty-move-label">Faculty move</p>
      {children}
    </aside>
  );
}

/**
 * A guide in the series list. Published guides are ordinary links; planned
 * guides render as non-interactive articles — no href="#", no disabled anchor,
 * no click handler — with the status stated in text before the title so it is
 * announced first and never depends on colour.
 */
export function GuideCard({ guide }: { guide: Guide }) {
  const status = (
    <span className={`pill ${guide.status === "published" ? "available" : "planned"}`}>
      <span className="dot" aria-hidden="true" />
      {guide.badge}
    </span>
  );

  if (guide.status === "published") {
    return (
      <Link className="card interactive guideCard" href={guideHref(guide.slug)}>
        {status}
        <h3>{guide.title}</h3>
        <p className="muted">{guide.summary}</p>
        <span className="explore">
          Read the guide &rarr;
          {guide.readTime ? <span className="srOnly"> ({guide.readTime} read)</span> : null}
        </span>
      </Link>
    );
  }

  return (
    <article className="card guideCard guideCardPlanned">
      {status}
      <h3>{guide.title}</h3>
      <p className="muted">{guide.summary}</p>
      <p className="guideCardNote">Not yet published.</p>
    </article>
  );
}

/** The exercise pattern: a labelled, timed, self-contained experiment. */
export function ExerciseBlock({
  heading,
  id,
  timeLabel,
  children,
}: {
  heading: string;
  id: string;
  timeLabel: string;
  children: ReactNode;
}) {
  return (
    <section className="exerciseBlock" aria-labelledby={`${id}-heading`}>
      <div className="exerciseHead">
        <div>
          <p className="eyebrow">Try this</p>
          <h2 id={`${id}-heading`}>{heading}</h2>
        </div>
        <span className="pill"><span className="dot" aria-hidden="true" />{timeLabel}</span>
      </div>
      {children}
    </section>
  );
}

export type SssItem = {
  label: string;
  /** The question (landing page) or the value for this guide. */
  primary: string;
  detail?: ReactNode;
};

/**
 * Sources · Sensitivity · Stakes, as a definition list so the label/value
 * relationship survives without styling. `variant="cards"` lays the three out
 * side by side on wide screens and stacks them in reading order on small ones.
 */
export function SourcesSensitivityStakes({
  items,
  variant = "list",
}: {
  items: SssItem[];
  variant?: "cards" | "list";
}) {
  return (
    <dl className={`sssList${variant === "cards" ? " sssCards" : ""}`}>
      {items.map(({ label, primary, detail }) => (
        <div className="sssItem" key={label}>
          <dt>{label}</dt>
          <dd>
            <span className="sssPrimary">{primary}</span>
            {detail ? <span className="sssDetail">{detail}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The one line to remember. Restrained on purpose. */
export function WorthRepeating({ children }: { children: ReactNode }) {
  return (
    <aside className="worthRepeating" aria-labelledby="worth-repeating-label">
      <p className="eyebrow" id="worth-repeating-label">Worth repeating</p>
      <p className="worthRepeatingText">{children}</p>
    </aside>
  );
}

/**
 * Official sources behind a guide. External links follow the site's existing
 * pattern: new tab, plus the screen-reader notice the header already uses.
 */
export function SourceNotes({ guide }: { guide: Guide }) {
  if (!guide.sourceNotes?.length) return null;
  return (
    <section aria-labelledby="source-notes-heading">
      <h2 id="source-notes-heading">Sources and review notes</h2>
      <ul className="sourceNotes">
        {guide.sourceNotes.map(({ title, url, note, publisher, sourceType, datePublished, stability }) => (
          <li key={`${title}-${url}`}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
              <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
              <span className="srOnly"> (opens in a new tab)</span>
            </a>
            {publisher ? <span className="muted"> &middot; {publisher}</span> : null}
            {datePublished ? <span className="muted"> &middot; {datePublished}</span> : null}
            {note ? <span className="muted"> {note}</span> : null}
            {sourceType ? <span className="sourceType">{sourceType}</span> : null}
            {stability ? <span className="sourceStability">{stability}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Where this guide sits in the series. A published neighbour is a link; an
 * unpublished one states its status in text rather than offering a link to a
 * page that does not exist.
 *
 * `completion` replaces the next-guide slot on the last guide of a finished
 * collection. Without it that slot would render an "Next in the series" eyebrow
 * over nothing, which reads as a broken page rather than a finished one.
 */
export function GuideSeriesStatus({
  previous,
  next,
  completion,
}: {
  previous?: Guide;
  next?: Guide;
  completion?: ReactNode;
}) {
  return (
    <section className="card seriesStatus" aria-labelledby="series-next-heading">
      {previous && previous.status === "published" && (
        <div className="seriesPrev">
          <p className="eyebrow">Previous guide</p>
          <h2 className="seriesPrevTitle">
            <Link href={guideHref(previous.slug)}>{previous.title}</Link>
          </h2>
        </div>
      )}
      {completion ? (
        <>
          <p className="eyebrow" id="series-next-heading">First collection complete</p>
          {completion}
        </>
      ) : (
        <>
          <p className="eyebrow" id="series-next-heading">Next in the series</p>
          {next ? (
            next.status === "published" ? (
              <>
                <h2 className="seriesNextTitle">
                  <Link href={guideHref(next.slug)}>{next.title}</Link>
                </h2>
                <p className="muted">{next.summary}</p>
              </>
            ) : (
              <>
                <h2 className="seriesNextTitle">{next.title}</h2>
                <p className="seriesStatusLabel">
                  <span className="pill planned"><span className="dot" aria-hidden="true" />{next.badge}</span>
                </p>
              </>
            )
          ) : null}
        </>
      )}
      <p className="muted seriesAsk">
        Questions about a current task?{" "}
        <a href="mailto:library@law.stanford.edu">Email library@law.stanford.edu</a>
      </p>
    </section>
  );
}

/**
 * The end of a finished collection: the six habits as links back into the series,
 * with the current page named but not linked to itself, plus the two actions worth
 * taking next.
 */
export function SeriesCompletion({
  guides: seriesGuides,
  currentSlug,
  primaryAction,
  secondaryAction,
}: {
  guides: Guide[];
  currentSlug: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
}) {
  return (
    <div className="seriesCompletion">
      <h2 className="seriesNextTitle">Carry the six habits into your next AI decision</h2>
      <ol className="seriesCompletionList">
        {seriesGuides.map((g) =>
          g.slug === currentSlug ? (
            <li key={g.slug}>
              <span aria-current="page">{g.title}</span>
              <span className="muted seriesCurrentNote"> — you are here</span>
            </li>
          ) : (
            <li key={g.slug}>
              <Link href={guideHref(g.slug)}>{g.title}</Link>
            </li>
          ),
        )}
      </ol>
      <div className="actions">
        <a
          className="primary"
          href={primaryAction.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {primaryAction.label}
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
        <a
          className="secondary"
          href={secondaryAction.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {secondaryAction.label}
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}

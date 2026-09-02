import Link from "next/link";
import type { ReactNode } from "react";
import { collectionGuides, guideHref, type Guide } from "../lib/guides";
import {
  collectionStatusLine,
  guideCollectionLine,
  plannedCount,
  publishedCount,
  type LearnAiCollection,
} from "../lib/learnAiCollections";
import { GuideCard } from "./GuideKit";

/* ---------------------------------------------------------------------------
   Collection-level blocks: the landing-page sections, the status line, the
   non-interactive planned card, and the continuation card that points from a
   finished collection to a new one.

   Two things these deliberately never do. They never render a planned guide as
   anything clickable — no href, no "#", no disabled button, just an article whose
   status is announced before its title. And they never display a guide's internal
   global number: a reader of the second collection sees "Guide 1 of 5", not
   "guide 7".
   ------------------------------------------------------------------------- */

/**
 * The derived status line for a collection: "6 published guides", or
 * "1 published · 4 planned". Visible text, not a coloured chip, so the state
 * survives greyscale, a screen reader, and print.
 */
export function CollectionStatus({ collection }: { collection: LearnAiCollection }) {
  const planned = plannedCount(collection);
  return (
    <p className="collectionStatus">
      <span className={`pill ${planned === 0 ? "available" : "pilot"}`}>
        <span className="dot" aria-hidden="true" />
        {collectionStatusLine(collection)}
      </span>
    </p>
  );
}

/**
 * A recorded but unpublished guide. An article rather than a link: there is no
 * page to go to, and a disabled-looking link is worse than none. "Coming later"
 * comes before the title in the DOM so it is announced first.
 */
export function PlannedGuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="card plannedGuideCard" aria-labelledby={`planned-${guide.slug}`}>
      <p className="plannedGuideStatus">
        <span className="pill planned">
          <span className="dot" aria-hidden="true" />
          Coming later
        </span>
      </p>
      <h3 id={`planned-${guide.slug}`}>{guide.title}</h3>
      <p className="muted">{guide.summary}</p>
    </article>
  );
}

/**
 * One collection on the Learn AI landing page: eyebrow, heading, body, derived
 * status, then published guides followed by planned ones. The heading level is a
 * prop because the landing page nests these under its own H2s.
 */
export function GuideCollectionSection({
  collection,
  children,
}: {
  collection: LearnAiCollection;
  /** Extra content after the cards, e.g. the completion note. */
  children?: ReactNode;
}) {
  const guides = collectionGuides(collection.id);
  const published = guides.filter((g) => g.status === "published");
  const planned = guides.filter((g) => g.status === "planned");
  const headingId = `collection-${collection.id}-heading`;

  return (
    <section className="guideCollection" aria-labelledby={headingId}>
      <p className="eyebrow">{collection.eyebrow}</p>
      <h2 id={headingId}>{collection.title}</h2>
      <p className="muted collectionBody">{collection.landingBody}</p>
      <CollectionStatus collection={collection} />
      <div className="guideGrid">
        {published.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
      {planned.length > 0 && (
        <div className="plannedGuideList">
          {planned.map((guide) => (
            <PlannedGuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * The card at the end of a finished collection that points at a different one.
 *
 * It is not a "next guide" link and must not read as one: the collection the
 * reader just finished is complete, and this is an invitation to a separate
 * collection. Hence its own eyebrow, its own heading, and deliberately less
 * visual weight than the completion card above it.
 */
export function CollectionContinuationCard({
  collection,
  guide,
}: {
  collection: LearnAiCollection;
  /** The published guide to start with. */
  guide: Guide;
}) {
  const headingId = `continue-${collection.id}-heading`;
  return (
    <section className="continuationCard" aria-labelledby={headingId}>
      <p className="eyebrow">Continue with Collection {collection.ordinal}</p>
      <h2 id={headingId} className="continuationTitle">
        {collection.title}
      </h2>
      <p className="muted">{collection.landingBody}</p>
      <div className="actions">
        <Link className="primary" href={guideHref(guide.slug)}>
          Start with &ldquo;{guide.title}&rdquo;
        </Link>
      </div>
      <p className="continuationMeta muted">
        Collection {collection.ordinal} &middot; {guideCollectionLine(guide)?.split(" · ")[1]}
      </p>
    </section>
  );
}

/**
 * The line above a guide's H1: "Working critically with AI · Guide 1 of 5".
 * Position is always within the collection.
 */
export function GuideCollectionLine({ guide }: { guide: Guide }) {
  const line = guideCollectionLine(guide);
  if (!line) return null;
  return <p className="guideCollectionLine">{line}</p>;
}

/**
 * End-of-guide pointer back to a complete collection, and forward to the next
 * guide in this one when there is one. A planned next guide is named without a
 * link, with its status in text.
 */
export function CollectionGuideNavigation({
  foundational,
  previousInCollection,
  nextInCollection,
  nextDescription,
  relatedGuides,
}: {
  foundational: { collection: LearnAiCollection; description: string };
  /** The guide before this one, inside the same collection. Published only. */
  previousInCollection?: Guide;
  nextInCollection?: Guide;
  /** Shown when the next guide is published, so the link says what it covers. */
  nextDescription?: string;
  relatedGuides: Guide[];
}) {
  const nextIsPublished = nextInCollection?.status === "published";
  return (
    <div className="collectionNav">
      <section className="card collectionNavCard" aria-labelledby="foundational-heading">
        <p className="eyebrow">
          Foundational collection &middot; {publishedCount(foundational.collection) > 0 ? "Complete" : "In progress"}
        </p>
        <h2 id="foundational-heading" className="collectionNavTitle">
          {foundational.collection.title}
        </h2>
        <p className="muted">{foundational.description}</p>
        <p>
          <Link className="textLink" href="/learn-ai">
            Review the {foundational.collection.title} collection
          </Link>
        </p>
      </section>

      {previousInCollection && previousInCollection.status === "published" && (
        <section className="card collectionNavCard" aria-labelledby="previous-guide-heading">
          <p className="eyebrow">Previous guide</p>
          <h2 id="previous-guide-heading" className="collectionNavTitle">
            <Link href={guideHref(previousInCollection.slug)}>{previousInCollection.title}</Link>
          </h2>
        </section>
      )}

      {nextInCollection && (
        <section className="card collectionNavCard collectionNavNext" aria-labelledby="next-in-collection-heading">
          {/* A published next guide is simply the next guide. A planned one is
              named without a link, with its status announced before the title —
              there is no page to go to, and a disabled-looking link is worse. */}
          <p className="eyebrow">
            {nextIsPublished ? "Next guide" : "Next in this collection"}
          </p>
          {!nextIsPublished && (
            <p className="plannedGuideStatus">
              <span className="pill planned">
                <span className="dot" aria-hidden="true" />
                Coming later
              </span>
            </p>
          )}
          <h2 id="next-in-collection-heading" className="collectionNavTitle">
            {nextIsPublished ? (
              <Link href={guideHref(nextInCollection.slug)}>{nextInCollection.title}</Link>
            ) : (
              nextInCollection.title
            )}
          </h2>
          {nextIsPublished && nextDescription ? (
            <p className="muted">{nextDescription}</p>
          ) : null}
        </section>
      )}

      {relatedGuides.length > 0 && (
        <section className="card collectionNavCard" aria-labelledby="related-guides-heading">
          <p className="eyebrow">Related guides</p>
          <h2 id="related-guides-heading" className="collectionNavTitle">
            Also useful here
          </h2>
          <ul className="collectionNavList">
            {relatedGuides.map((guide) => (
              <li key={guide.slug}>
                <Link href={guideHref(guide.slug)}>{guide.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

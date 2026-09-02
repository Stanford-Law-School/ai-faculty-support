// =============================================================================
// Learn AI collections — one model for both collections.
//
// A collection is a named, ordered group of primary guides. There are two:
//
//   1. Core AI decisions — six guides, complete. Finished means finished: it is
//      not reopened, renumbered, or extended, and nothing here appends a seventh
//      guide to it.
//   2. Working critically with AI — five guides, three published. A separate
//      collection, numbered from 1 again.
//
// Every count is derived from the guide records in ./guides.ts. Nothing here
// stores "6 published" or "4 planned": a hand-maintained count is the field that
// disagrees with reality after the next release. The dependency runs one way —
// collections read guides; guides know only the collection id.
//
// Two rules are load-bearing and validated:
//
//   - A collection is publicly rendered only once it has a published guide. A
//     planned collection with no route to show would advertise nothing.
//   - A collection whose declared status is "complete" must contain no planned
//     guides, and one that is "in-progress" must contain at least one. The status
//     and the records cannot disagree without failing the build.
// =============================================================================

import {
  collectionGuides,
  collectionIsComplete,
  collectionPlannedGuides,
  collectionPublishedGuides,
  type CollectionId,
  type Guide,
} from "./guides";

export type CollectionStatus = "planned" | "in-progress" | "complete";

export type LearnAiCollection = {
  id: CollectionId;
  /** The collection's public number: "Collection 2". */
  ordinal: number;
  title: string;
  summary: string;
  status: CollectionStatus;
  /** Order on the Learn AI landing page. */
  displayOrder: number;
  /**
   * The guides that belong to it, in reading order. Held here as well as on the
   * guide records so the two can be checked against each other — a guide that
   * quietly leaves a collection, or one the collection forgot, fails the build.
   */
  guideSlugs: string[];
  /** ISO date the collection's framing and ordering were last reviewed. */
  reviewedThrough: string;
  /** What a maintainer needs to know about the collection's current state. */
  updateNote: string;
  /** Landing-page copy: the eyebrow above the collection heading. */
  eyebrow: string;
  /** Landing-page body copy, longer than the summary the search index uses. */
  landingBody: string;
  /** Shown at the end of a complete collection, in place of "Coming next". */
  completionHeading?: string;
  completionBody?: string;
};

export const learnAiCollections: LearnAiCollection[] = [
  {
    id: "core-ai-decisions",
    ordinal: 1,
    title: "Core AI decisions",
    summary:
      "Six answer-first guides for choosing useful AI tasks, protecting material, selecting the right source environment, verifying legal claims, recognizing fabricated authority, and designing AI-supported student learning.",
    status: "complete",
    displayOrder: 1,
    guideSlugs: [
      "what-is-ai-good-at",
      "what-can-i-safely-share",
      "which-ai-tool-fits",
      "verify-an-ai-legal-claim",
      "why-did-it-invent-a-case",
      "students-use-ai-and-learn-law",
    ],
    reviewedThrough: "2026-08-04",
    updateNote:
      "The durable collection is complete. Product, service, policy, interface, and evidence inserts continue to carry their own review dates.",
    eyebrow: "Complete collection",
    landingBody:
      "Start here for six durable habits: choose a bounded task, protect the material, choose the source path, verify legal claims, retrieve AI-supplied authority, and design AI-supported student learning.",
    completionHeading: "Six decisions. Six durable habits.",
    completionBody:
      "The Core AI decisions collection is complete. Product and policy inserts continue to carry their own review dates.",
  },
  {
    id: "working-critically-with-ai",
    ordinal: 2,
    title: "Working critically with AI",
    summary:
      "Five short guides for recognizing how prompting, context, confidence, feedback, and comparison shape AI output—and for keeping evidence and consequential judgment outside the system.",
    status: "in-progress",
    displayOrder: 2,
    guideSlugs: [
      "why-does-it-agree-with-me",
      "why-did-it-forget",
      "why-does-it-sound-so-certain",
      "get-useful-ai-feedback",
      "compare-ai-answers",
    ],
    reviewedThrough: "2026-08-05",
    updateNote: "Guides will be published individually after content and source review.",
    eyebrow: "Collection 2 · In progress",
    landingBody:
      "Learn how prompting, context, confidence, feedback, and comparison influence generated output—and how to keep evidence and judgment outside the system.",
  },
];

// -----------------------------------------------------------------------------
// Access helpers. Every count below is computed from the guide records.
// -----------------------------------------------------------------------------

export function getCollection(id: CollectionId): LearnAiCollection {
  const collection = learnAiCollections.find((c) => c.id === id);
  if (!collection) throw new Error(`Unknown collection: ${id}`);
  return collection;
}

export const CORE_AI_DECISIONS = getCollection("core-ai-decisions");
export const WORKING_CRITICALLY_WITH_AI = getCollection("working-critically-with-ai");

/** Collections in landing-page order. */
export function orderedCollections(): LearnAiCollection[] {
  return [...learnAiCollections].sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Collections the site may render. A collection with nothing published is a plan,
 * not a section: it stays out of the landing page until its first guide ships.
 */
export function publicCollections(): LearnAiCollection[] {
  return orderedCollections().filter((c) => collectionPublishedGuides(c.id).length > 0);
}

export function collectionCount(): number {
  return publicCollections().length;
}

/** Primary published guides across every public collection. */
export function publishedGuideTotal(): number {
  return publicCollections().reduce((sum, c) => sum + publishedCount(c), 0);
}

/** Primary planned guides across every public collection. */
export function plannedGuideTotal(): number {
  return publicCollections().reduce((sum, c) => sum + plannedCount(c), 0);
}

export function publishedCount(collection: LearnAiCollection): number {
  return collectionPublishedGuides(collection.id).length;
}

export function plannedCount(collection: LearnAiCollection): number {
  return collectionPlannedGuides(collection.id).length;
}

export function collectionGuideRecords(collection: LearnAiCollection): Guide[] {
  return collectionGuides(collection.id);
}

/**
 * The visible status line, derived. A complete collection states its size; an
 * in-progress one states what exists and what is still coming, so a reader is
 * never left wondering whether a missing guide is a bug.
 */
export function collectionStatusLine(collection: LearnAiCollection): string {
  const published = publishedCount(collection);
  const planned = plannedCount(collection);
  if (planned === 0) {
    return `${published} published guide${published === 1 ? "" : "s"}`;
  }
  return `${published} published · ${planned} planned`;
}

/**
 * A guide's position for display: "Guide 1 of 5". Always within its collection —
 * the internal global number is never shown, so a reader of the second collection
 * is not told they are on guide 7 of something they never started.
 */
export function guidePositionLabel(guide: Guide): string | undefined {
  if (!guide.collectionId || guide.collectionOrder === undefined) return undefined;
  const total = collectionGuides(guide.collectionId).length;
  return `Guide ${guide.collectionOrder} of ${total}`;
}

/** "Working critically with AI · Guide 1 of 5" — the line above a guide's H1. */
export function guideCollectionLine(guide: Guide): string | undefined {
  if (!guide.collectionId) return undefined;
  const collection = getCollection(guide.collectionId);
  const position = guidePositionLabel(guide);
  return position ? `${collection.title} · ${position}` : collection.title;
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type CollectionValidation = { errors: string[]; warnings: string[] };

export function validateCollections(): CollectionValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const seenIds = new Set<string>();
  const seenOrdinals = new Set<number>();
  const seenDisplayOrders = new Set<number>();
  const claimedSlugs = new Map<string, string>();

  for (const c of learnAiCollections) {
    const where = `collection ${c.id}`;

    if (seenIds.has(c.id)) errors.push(`${where}: duplicate id`);
    seenIds.add(c.id);
    if (seenOrdinals.has(c.ordinal)) errors.push(`${where}: duplicate ordinal ${c.ordinal}`);
    seenOrdinals.add(c.ordinal);
    if (seenDisplayOrders.has(c.displayOrder)) {
      errors.push(`${where}: duplicate displayOrder ${c.displayOrder}`);
    }
    seenDisplayOrders.add(c.displayOrder);

    for (const field of ["title", "summary", "eyebrow", "landingBody", "updateNote"] as const) {
      if (!c[field]) errors.push(`${where}: missing ${field}`);
    }
    if (!ISO_DATE.test(c.reviewedThrough)) {
      errors.push(`${where}: reviewedThrough is not a valid ISO date`);
    }
    if (!c.guideSlugs.length) errors.push(`${where}: needs at least one guide slug`);

    // A guide belongs to exactly one collection. Two claims on one slug would
    // render the same guide twice under different numbers.
    for (const slug of c.guideSlugs) {
      const other = claimedSlugs.get(slug);
      if (other) {
        errors.push(`guide "${slug}" appears in both "${other}" and "${c.id}"`);
      }
      claimedSlugs.set(slug, c.id);
    }

    // The collection's slug list and the guide records must agree in both
    // directions, or one of them is quietly wrong.
    const recorded = collectionGuides(c.id).map((g) => g.slug);
    const missingFromRecords = c.guideSlugs.filter((s) => !recorded.includes(s));
    const missingFromCollection = recorded.filter((s) => !c.guideSlugs.includes(s));
    for (const slug of missingFromRecords) {
      errors.push(
        `${where}: lists "${slug}", but no guide record assigns that slug to this collection`,
      );
    }
    for (const slug of missingFromCollection) {
      errors.push(
        `${where}: guide "${slug}" says it belongs here, but the collection's guideSlugs omits it`,
      );
    }
    if (
      missingFromRecords.length === 0 &&
      missingFromCollection.length === 0 &&
      recorded.join("|") !== c.guideSlugs.join("|")
    ) {
      errors.push(
        `${where}: guideSlugs order does not match the guides' collectionOrder (${recorded.join(", ")})`,
      );
    }

    // Status and records must agree.
    const planned = plannedCount(c);
    const published = publishedCount(c);
    if (c.status === "complete") {
      if (planned > 0) {
        errors.push(
          `${where}: declared complete, but ${planned} of its guides are still planned. A complete ` +
            "collection must contain no planned guide.",
        );
      }
      if (!c.completionHeading || !c.completionBody) {
        errors.push(`${where}: a complete collection needs a completion heading and body`);
      }
      if (!collectionIsComplete(c.id)) {
        errors.push(`${where}: declared complete, but the guide records do not agree`);
      }
    }
    if (c.status === "in-progress") {
      if (planned === 0) {
        errors.push(
          `${where}: declared in progress, but nothing is planned. Mark it complete or add the ` +
            "remaining guides.",
        );
      }
      if (published === 0) {
        errors.push(
          `${where}: declared in progress with nothing published. Use "planned" until the first ` +
            "guide ships — an in-progress collection is rendered publicly.",
        );
      }
    }
    if (c.status === "planned" && published > 0) {
      errors.push(`${where}: declared planned, but ${published} of its guides are published`);
    }
  }

  // Collection 1 is finished at six guides. This is the check that fails if a
  // later change tries to extend it rather than starting a new collection.
  const core = collectionGuides("core-ai-decisions");
  if (core.length !== 6) {
    errors.push(
      `collection core-ai-decisions has ${core.length} guides. It is complete at six: a new guide ` +
        "belongs in a new or in-progress collection, not appended here.",
    );
  }

  // The first collection's framing must stay a set of decisions rather than a
  // compliance sequence, and the second must not be described as its remainder.
  for (const c of learnAiCollections) {
    if (/\b(compliance|academic integrity|misconduct|enforcement|discipline)\b/i.test(c.summary)) {
      errors.push(
        `collection ${c.id}: the summary describes the collection in compliance terms; these are ` +
          "collections of AI decisions and habits, not academic-integrity collections",
      );
    }
  }
  if (/\b(continues|continuation|rest of|remaining part|second half)\b/i.test(
    WORKING_CRITICALLY_WITH_AI.summary + WORKING_CRITICALLY_WITH_AI.landingBody,
  )) {
    errors.push(
      "collection working-critically-with-ai: its description presents it as a continuation of the " +
        "first collection. It is a separate collection; Core AI decisions is complete.",
    );
  }

  return { errors, warnings };
}

const validation = validateCollections();
if (validation.errors.length) {
  throw new Error(`Learn AI collections are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[learn-ai-collections] ${w}`);
}

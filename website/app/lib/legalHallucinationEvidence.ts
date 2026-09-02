// =============================================================================
// Public evidence snapshot — court decisions involving hallucinated legal
// material.
//
// This is the ONE place a number about the real-world problem is stored, and it
// is maintained by hand. Nothing here is fetched, scraped, or refreshed at build
// time or at runtime: the count is a transcription of a public tracker as read on
// a stated date, together with the tracker's own last-updated date and the scope
// the tracker applies.
//
// A number without a date is a claim about the present, and this one moves every
// week. So the record carries its own expiry. Once `reviewBy` has passed the site
// stops showing the figure and shows "Count due for review" instead, keeping the
// link to the live source. `npm run lint` warns; strict CI can fail.
//
// The tracker counts what has been *identified*, which is a floor of unknown
// distance from any real total. Never write "over N", "at least N", or "verified"
// about this figure — the validator rejects all three.
// =============================================================================

export type EvidenceSnapshotStatus = "published" | "draft";

export type LegalHallucinationEvidence = {
  id: string;
  /** Section heading for the dated insert. */
  displayTitle: string;
  sourceTitle: string;
  sourceUrl: string;
  /** Count exactly as displayed by the source on `verifiedOn`. */
  count: number;
  /** Phrasing that must accompany the number; it is a tally, not a census. */
  countLabel: string;
  /** What the tracker counts — the number means nothing without this. */
  scopeDescription: string;
  /** What the number is not. Rendered next to the figure, not buried. */
  limitation: string;
  /**
   * The tracker's own last-updated date, exactly as the source publishes it, or
   * `null` when it publishes none.
   *
   * `null` is the honest value for this database: it shows no update date of its
   * own. It must not be filled in with the date somebody read the page — that is
   * `verifiedOn`, and the component labels this field "Source last updated", so
   * borrowing the read date would assert something about the database that the
   * database does not say. On a page whose subject is checking whether a claim is
   * supported, that is the wrong error to ship.
   *
   * While it is `null` the component omits the "Source last updated" line
   * entirely and shows only "Count checked". If the tracker ever starts
   * publishing an update date, record that real date here: the line comes back,
   * and the "a count cannot have been read before the source published it" check
   * starts earning its keep.
   */
  sourceLastUpdated: string | null;
  /** The date an RCLL maintainer read the tracker and transcribed the count. */
  verifiedOn: string;
  /** After this date the count is withheld from display. */
  reviewBy: string;
  reviewCadence: string;
  /** Exactly what the site does once the record is stale. */
  staleBehavior: string;
  /** Copy shown in place of the number while stale. */
  staleLabel: string;
  /** The second line shown while stale. */
  staleGuidance: string;
  status: EvidenceSnapshotStatus;
  displayOrder: number;
  /**
   * Change fingerprints. Each is a short hash of the field it names, stored so
   * an edit that changes the substance without changing the review dates is
   * caught: the validator recomputes and warns on a mismatch. They exist because
   * "the count changed but nobody re-verified it" is otherwise invisible in a
   * diff review.
   */
  countFingerprint: string;
  scopeFingerprint: string;
  /** The date a maintainer last confirmed the scope wording against the source. */
  scopeConfirmedOn: string;
  staffReviewRequired: boolean;
};

export const legalHallucinationEvidence: LegalHallucinationEvidence = {
  id: "charlotin-hallucination-cases",
  displayTitle: "A documented legal-research failure pattern",
  sourceTitle: "AI Hallucination Cases",
  sourceUrl: "https://www.damiencharlotin.com/hallucinations/",
  count: 2008,
  countLabel: "cases identified so far",
  scopeDescription:
    "The database tracks legal decisions addressing generative-AI hallucinated content, primarily where a court or tribunal explicitly found or implied that a party relied on hallucinated material, with limited judgment-call exceptions described by the database maintainer.",
  limitation:
    "This is not a prevalence estimate for all AI use, all legal work, all court filings, or all fabricated citations. It records identified decisions under the database’s stated inclusion approach.",
  sourceLastUpdated: null,
  verifiedOn: "2026-09-02",
  reviewBy: "2026-09-09",
  reviewCadence: "Weekly while a numeric count is displayed",
  staleBehavior:
    "Hide the numeric count, display “Count due for review,” and retain a link to the live source.",
  staleLabel: "Count due for review",
  staleGuidance: "The database changes frequently. Open the live source for the current total.",
  status: "published",
  displayOrder: 1,
  countFingerprint: "cnt-2ehzuz",
  scopeFingerprint: "scp-eamtor",
  scopeConfirmedOn: "2026-08-03",
  staffReviewRequired: true,
};

// -----------------------------------------------------------------------------
// Read helpers. Pages call these instead of reading `count` directly, so the
// staleness rule cannot be forgotten at one call site.
// -----------------------------------------------------------------------------

const todayIso = () => new Date().toISOString().slice(0, 10);

export function evidenceSnapshotIsStale(today = todayIso()): boolean {
  return today > legalHallucinationEvidence.reviewBy;
}

/** The count while the snapshot is current; `null` once it is overdue. */
export function displayableCount(today = todayIso()): number | null {
  return evidenceSnapshotIsStale(today) ? null : legalHallucinationEvidence.count;
}

/** What to render where the number goes, in either state. */
export function evidenceCountText(today = todayIso()): string {
  const n = displayableCount(today);
  return n === null
    ? legalHallucinationEvidence.staleLabel
    : `${n.toLocaleString("en-US")} ${legalHallucinationEvidence.countLabel}`;
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string) => ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

/** Small stable hash (djb2, base36). Deterministic across runs and platforms. */
function fingerprint(prefix: string, value: string): string {
  let h = 5381;
  for (let i = 0; i < value.length; i += 1) {
    h = ((h << 5) + h + value.charCodeAt(i)) | 0;
  }
  return `${prefix}-${(h >>> 0).toString(36)}`;
}

export const countFingerprintOf = (e: LegalHallucinationEvidence) =>
  // "unpublished" rather than an empty string, so an absent source date cannot
  // collide with a future one and is legible in the hashed input.
  fingerprint(
    "cnt",
    `${e.count}|${e.sourceLastUpdated ?? "unpublished"}|${e.verifiedOn}|${e.reviewBy}`,
  );

export const scopeFingerprintOf = (e: LegalHallucinationEvidence) =>
  fingerprint("scp", `${e.scopeDescription}|${e.limitation}`);

export type EvidenceValidation = { errors: string[]; warnings: string[] };

/**
 * `strict` promotes staleness and fingerprint drift from warnings to errors, so
 * CI can refuse to ship a stale public number while an ordinary local build
 * still succeeds with the count withheld.
 */
export function validateEvidenceSnapshot(
  today = todayIso(),
  { strict = false }: { strict?: boolean } = {},
): EvidenceValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const raise = (message: string) => (strict ? errors : warnings).push(message);
  const e = legalHallucinationEvidence;

  if (!e.id) errors.push("missing id");
  if (!e.displayTitle) errors.push("missing displayTitle");
  if (!e.sourceTitle) errors.push("missing sourceTitle");
  if (!/^https:\/\//.test(e.sourceUrl)) errors.push("sourceUrl must be an https URL");
  if (!Number.isInteger(e.count) || e.count <= 0) errors.push("count must be a positive integer");
  if (!e.countLabel) {
    errors.push("missing countLabel");
  } else {
    if (/\b(over|at least|more than|nearly|almost)\b/i.test(e.countLabel)) {
      errors.push(
        'countLabel must not estimate ("over", "at least", "more than"): the tracker reports what has been identified',
      );
    }
    if (/verified/i.test(e.countLabel)) {
      errors.push('countLabel must say "identified", not "verified" — that is what the source claims');
    }
    if (!/identified/i.test(e.countLabel)) {
      errors.push('countLabel must describe the figure as cases identified');
    }
  }
  if (!e.scopeDescription) {
    errors.push("missing scopeDescription — a count without its scope is not interpretable");
  }
  if (!e.limitation) {
    errors.push("missing limitation");
  } else if (!/prevalence/i.test(e.limitation)) {
    errors.push("limitation must say the figure is not a prevalence estimate");
  }
  if (!e.reviewCadence) errors.push("missing reviewCadence");
  if (!e.staleLabel) errors.push("missing staleLabel");
  if (!e.staleGuidance) errors.push("missing staleGuidance");
  if (!e.staleBehavior) {
    errors.push("missing staleBehavior");
  } else if (!/link/i.test(e.staleBehavior)) {
    errors.push("staleBehavior must keep a link to the live source while the count is withheld");
  }
  if (e.staffReviewRequired !== true) errors.push("staffReviewRequired must be true");

  for (const [field, value] of Object.entries({
    verifiedOn: e.verifiedOn,
    reviewBy: e.reviewBy,
    scopeConfirmedOn: e.scopeConfirmedOn,
  })) {
    if (!isValidIsoDate(value)) errors.push(`${field} is not a valid ISO date`);
  }
  // Absent is allowed and is the current state; a present value must be a real
  // date. What is never allowed is echoing verifiedOn, because the component
  // labels this "Source last updated" and the source does not say it.
  if (e.sourceLastUpdated !== null) {
    if (!isValidIsoDate(e.sourceLastUpdated)) {
      errors.push("sourceLastUpdated must be a valid ISO date or null");
    } else if (e.sourceLastUpdated === e.verifiedOn) {
      errors.push(
        "sourceLastUpdated equals verifiedOn. If the source publishes no update date, set it to " +
          "null so the page omits the claim rather than restating the read date as the source's own.",
      );
    }
  }

  // A count cannot have been read before the source published it.
  if (
    e.sourceLastUpdated !== null &&
    isValidIsoDate(e.sourceLastUpdated) &&
    isValidIsoDate(e.verifiedOn) &&
    e.verifiedOn < e.sourceLastUpdated
  ) {
    raise(
      `verifiedOn (${e.verifiedOn}) precedes sourceLastUpdated (${e.sourceLastUpdated}) — ` +
        `the transcription predates the data it records. Re-read the source and update verifiedOn.`,
    );
  }
  if (isValidIsoDate(e.verifiedOn) && isValidIsoDate(e.reviewBy) && e.reviewBy <= e.verifiedOn) {
    errors.push("reviewBy must fall after verifiedOn");
  }

  // Substance changed without a fresh review date, or scope changed without a
  // fresh editorial confirmation.
  const expectedCount = countFingerprintOf(e);
  if (e.countFingerprint !== expectedCount) {
    raise(
      `the count or its dates changed without updating countFingerprint. ` +
        `Re-read ${e.sourceUrl}, set verifiedOn/reviewBy, then set countFingerprint to "${expectedCount}".`,
    );
  }
  const expectedScope = scopeFingerprintOf(e);
  if (e.scopeFingerprint !== expectedScope) {
    raise(
      `the scope or limitation wording changed without an editorial re-confirmation. ` +
        `Confirm it against the source, update scopeConfirmedOn, then set scopeFingerprint to "${expectedScope}".`,
    );
  }

  if (isValidIsoDate(e.reviewBy) && today > e.reviewBy) {
    const days = Math.round((Date.parse(today) - Date.parse(e.reviewBy)) / 86_400_000);
    raise(
      `the public evidence snapshot is ${days} day(s) overdue for review ` +
        `(reviewBy ${e.reviewBy}, today ${today}). The count is withheld from display until ` +
        `it is re-read at ${e.sourceUrl} and the dates are updated.`,
    );
  }

  return { errors, warnings };
}

// Structural problems always fail the build. Staleness does not: the component
// withholds the number instead, so a missed weekly review degrades to a link
// rather than taking the site down. `SLS_STRICT_EVIDENCE=1` makes CI fail.
const validation = validateEvidenceSnapshot(undefined, {
  strict: process.env.SLS_STRICT_EVIDENCE === "1",
});
if (validation.errors.length) {
  throw new Error(`Public evidence snapshot is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[legal-hallucination-evidence] ${w}`);
}

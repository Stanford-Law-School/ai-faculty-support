// =============================================================================
// The SLS Student Affairs generative-AI policy — a placeholder with a lock on it.
//
// The local policy matters more to an SLS faculty member than the Stanford-wide
// default does, which is exactly why this record publishes nothing about its
// contents. Its text has not been confirmed by an authorized SLS owner, and the
// available secondary sources for it are policy trackers and search snippets —
// not authority. So the public page renders a heading, a neutral sentence, and a
// link to the official page, and nothing else.
//
// The validator enforces that. Setting `status: "published"` without the full set
// of confirmation fields fails the build, so a future maintainer cannot publish a
// summary by flipping one flag. Adding `approvedSummary` or `exactPolicyText`
// without a verified date, effective date, approving owner, and a stated
// relationship to the Stanford-wide default fails too.
//
// Nothing here is fetched at build time or runtime.
// =============================================================================

/**
 * The official SLS policy page. Exported because four places must link it — the
 * top of the teaching guide, its policy section, its source notes, and the
 * copyable assignment boundary — and a link that drifts in one of them is worse
 * than no link at all.
 */
export const SLS_STUDENT_AI_POLICY_URL =
  "https://law.stanford.edu/office-of-student-affairs/use-of-generative-ai-technology/";

export type PolicyRelationship =
  | "supplements-stanford-default"
  | "supersedes-stanford-default"
  | "staff-confirmation-required";

export type SlsStudentAiPolicy = {
  id: string;
  title: string;
  officialUrl: string;
  owner: string;
  /** Verbatim policy text, only once an authorized SLS owner supplies it. */
  exactPolicyText: string | null;
  /** An approved paraphrase, only once an authorized SLS owner approves it. */
  approvedSummary: string | null;
  effectiveDate: string | null;
  verifiedOn: string | null;
  reviewBy: string | null;
  reviewCadence: string;
  /** "published" is refused by the validator until every field above is present. */
  status: "published" | "staff-confirmation-required";
  staffReviewRequired: boolean;
  sourceAccessNote: string;
  supersedesOrSupplements: PolicyRelationship;
  /** The office that approved the text, recorded alongside the date it approved it. */
  approvedBy: string | null;
  approvedOn: string | null;
  displayOrder: number;
};

export const slsStudentAiPolicy: SlsStudentAiPolicy = {
  id: "sls-use-of-generative-ai-technology",
  title: "Use of Generative AI Technology",
  officialUrl: SLS_STUDENT_AI_POLICY_URL,
  owner: "Stanford Law School Office of Student Affairs",
  exactPolicyText: null,
  approvedSummary: null,
  effectiveDate: null,
  verifiedOn: null,
  reviewBy: null,
  reviewCadence: "Review before every academic term and before every major reuse",
  status: "staff-confirmation-required",
  staffReviewRequired: true,
  sourceAccessNote:
    "The public guide must not reproduce or paraphrase this policy until SLS Student Affairs or another authorized SLS owner confirms the current text, effective date, and interaction with course-specific policies and the OCS process.",
  supersedesOrSupplements: "staff-confirmation-required",
  approvedBy: null,
  approvedOn: null,
  displayOrder: 1,
};

/** Copy shown while the policy text is unconfirmed. Says nothing about its contents. */
export const unconfirmedPolicyCopy = {
  heading: "Check the current SLS policy too",
  body:
    "Stanford Law School maintains additional guidance on student use of generative AI. Review the current Student Affairs policy together with the assignment, course policy, and Stanford Honor Code guidance.",
  linkText: "View the current SLS student AI policy",
};

/** True only when an authorized owner has supplied text the site may summarize. */
export function slsPolicyIsConfirmed(): boolean {
  const p = slsStudentAiPolicy;
  return (
    p.status === "published" &&
    Boolean(p.approvedSummary || p.exactPolicyText) &&
    Boolean(p.verifiedOn && p.reviewBy && p.effectiveDate && p.approvedBy)
  );
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string | null) =>
  typeof v === "string" && ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

/** Hosts that are not authority for this policy, however convenient they look. */
const NOT_AUTHORITY = /(trinka\.ai|thesify\.ai|gradpilot|studentdisciplinedefense|policy-?repository|coursehero|reddit\.com)/i;

export type SlsPolicyValidation = { errors: string[]; warnings: string[] };

export function validateSlsPolicy(
  today = new Date().toISOString().slice(0, 10),
): SlsPolicyValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const p = slsStudentAiPolicy;

  if (!p.id) errors.push("missing id");
  if (!p.title) errors.push("missing title");
  if (!p.owner) errors.push("missing owner");
  if (!p.reviewCadence) errors.push("missing reviewCadence");
  if (p.staffReviewRequired !== true) errors.push("staffReviewRequired must be true");
  if (!p.sourceAccessNote) errors.push("missing sourceAccessNote");

  // The official URL is the only source of authority for this policy.
  if (!/^https:\/\/law\.stanford\.edu\//.test(p.officialUrl)) {
    errors.push("officialUrl must be an official law.stanford.edu URL");
  }
  if (NOT_AUTHORITY.test(p.officialUrl)) {
    errors.push(
      "officialUrl points at a third-party policy tracker or summary; only the official SLS page is authority for this policy",
    );
  }
  for (const [field, value] of Object.entries({
    exactPolicyText: p.exactPolicyText,
    approvedSummary: p.approvedSummary,
  })) {
    if (value && NOT_AUTHORITY.test(value)) {
      errors.push(`${field} cites a third-party tracker as the source of the SLS policy`);
    }
  }

  const hasText = Boolean(p.approvedSummary || p.exactPolicyText);

  // Publishing anything about the contents requires the whole confirmation set.
  if (p.status === "published") {
    if (!hasText) {
      errors.push('status "published" requires approvedSummary or exactPolicyText');
    }
    for (const [field, value] of Object.entries({
      verifiedOn: p.verifiedOn,
      reviewBy: p.reviewBy,
      effectiveDate: p.effectiveDate,
    })) {
      if (!isValidIsoDate(value)) {
        errors.push(`status "published" requires a valid ${field}`);
      }
    }
    if (!p.approvedBy) {
      errors.push('status "published" requires approvedBy — the SLS office that approved the text');
    }
    if (!isValidIsoDate(p.approvedOn)) {
      errors.push('status "published" requires approvedOn');
    }
    if (p.supersedesOrSupplements === "staff-confirmation-required") {
      errors.push(
        'status "published" requires supersedesOrSupplements to state whether the SLS policy supplements or supersedes the Stanford-wide default',
      );
    }
  }

  // The reverse: text without a confirmation trail must not sit in the record
  // waiting to be rendered by a future component that forgets to check status.
  if (hasText && p.status !== "published") {
    errors.push(
      "policy text is present but status is not \"published\" — either complete the confirmation fields or remove the text; unconfirmed wording must not sit in the record",
    );
  }

  // A local policy cannot be described as replacing the university process, and
  // an automatic academic consequence would contradict the Penalty Code.
  const text = `${p.exactPolicyText ?? ""} ${p.approvedSummary ?? ""}`;
  if (/\breplaces?\b[^.]*\b(OCS|Office of Community Standards|Honor Code process)\b/i.test(text)) {
    errors.push(
      "the SLS policy must not be represented as replacing the OCS process without staff confirmation",
    );
  }
  if (/\bautomatic(ally)?\b[^.]*\b(zero|fail|grade)\b/i.test(text) && !/OCS|Community Standards/i.test(text)) {
    errors.push(
      "an automatic grade consequence must not be stated without explaining the OCS process that governs it",
    );
  }
  if (/\boverrides?\b[^.]*\bassignment\b/i.test(text) && p.supersedesOrSupplements === "staff-confirmation-required") {
    errors.push(
      "the SLS policy must not be described as overriding assignment-specific rules without staff confirmation",
    );
  }

  if (isValidIsoDate(p.reviewBy) && today > (p.reviewBy as string)) {
    warnings.push(
      `the SLS policy record is overdue for review (reviewBy ${p.reviewBy}, today ${today}). Re-confirm with Student Affairs at ${p.officialUrl}.`,
    );
  }
  if (p.status === "staff-confirmation-required") {
    warnings.push(
      "the SLS generative-AI policy is unconfirmed; the page links the official source and publishes no summary. " +
        "Obtain the current text, effective date, and approving owner from SLS Student Affairs.",
    );
  }

  return { errors, warnings };
}

const validation = validateSlsPolicy();
if (validation.errors.length) {
  throw new Error(`SLS student AI policy record is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[sls-student-ai-policy] ${w}`);
}

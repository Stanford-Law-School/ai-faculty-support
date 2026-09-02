// =============================================================================
// Current Stanford academic-integrity process for suspected AI misuse.
//
// This record is time-sensitive by design and is kept out of the guide body. The
// durable six-step framework in app/lib/studentAiConcern.ts survives a policy
// revision; a reporting deadline and a student-contact sequence do not. So the
// procedural claims live here with a verified date, a review date, and an
// explicit stale state that withholds the deadline and the contact sequence
// rather than presenting last quarter's procedure as current.
//
// Nothing is fetched. Every rule below was read from an official Stanford source
// on `verifiedOn` and transcribed by hand.
//
// One source discrepancy is recorded rather than resolved. Teaching Commons says
// to consult OCS before discussing a graded-work concern with the student; the
// OCS Faculty & TAs page contains wording that contemplates questioning the
// student first. The public guide uses the more protective sequence until OCS
// confirms which is current. The discrepancy record must not be deleted quietly
// once that happens — resolve it with a dated editorial change and a source note.
// =============================================================================

export type ProcessRuleId =
  | "clear-policy"
  | "default-ai-guidance"
  | "graded-consult-first"
  | "ungraded-conversation"
  | "detector-not-required"
  | "detector-not-sole"
  | "no-penalty-grading"
  | "grade-after-responsibility"
  | "reporting-window"
  | "consultation-not-filing"
  | "weak-evidence";

export type ProcessRule = {
  id: ProcessRuleId;
  label: string;
  text: string;
  stability: string;
  /**
   * True when the claim is a procedural detail that must be withheld once the
   * record is stale — a deadline or a contact sequence, not a durable principle.
   */
  timeSensitive?: boolean;
};

export type SourceDiscrepancy = {
  id: string;
  sourceA: string;
  sourceAStatement: string;
  sourceB: string;
  sourceBStatement: string;
  publicResolution: string;
  requiredReviewer: string;
  status: "staff-confirmation-required" | "resolved";
  /** Set only when status is "resolved", so a resolution always carries a date. */
  resolvedOn?: string;
};

export type StanfordStudentAiProcess = {
  id: string;
  displayTitle: string;
  verifiedOn: string;
  reviewBy: string;
  reviewCadence: string;
  owner: string;
  officialSources: string[];
  publicRules: ProcessRule[];
  sourceDiscrepancies: SourceDiscrepancy[];
  staffReviewRequired: boolean;
  staleBehavior: string;
  staleLabel: string;
  staleGuidance: string;
  status: "published" | "draft";
  /** OCS contact details, stored once so a change is a single edit. */
  ocsEmail: string;
  ocsReportingUrl: string;
  ocsFacultyUrl: string;
};

export const stanfordStudentAiProcess: StanfordStudentAiProcess = {
  id: "stanford-student-ai-process",
  displayTitle: "Current Stanford academic-integrity process for suspected AI misuse",
  verifiedOn: "2026-08-04",
  reviewBy: "2026-09-04",
  reviewCadence: "Monthly and before every major reuse",
  owner: "Robert Crown Law Library",
  officialSources: [
    "https://communitystandards.stanford.edu/policies-guidance/honor-code",
    "https://communitystandards.stanford.edu/generative-ai-policy-guidance",
    "https://communitystandards.stanford.edu/resources/faculty-tas",
    "https://communitystandards.stanford.edu/reporting-honor-code-concern-faculty",
    "https://communitystandards.stanford.edu/policies-guidance/student-conduct-penalty-code-bylaw",
    "https://teachingcommons.stanford.edu/news/guidance-technology-tools-academic-integrity",
  ],
  publicRules: [
    {
      id: "clear-policy",
      label: "State the rule clearly",
      text:
        "Instructors are responsible for clearly communicating what constitutes permitted and unpermitted aid in the syllabus, assignment, exam instructions, and responses to student questions.",
      stability: "Review quarterly",
    },
    {
      id: "default-ai-guidance",
      label: "Apply the current default only when no clearer course rule exists",
      text:
        "Current Stanford generative-AI guidance treats AI assistance analogously to assistance from another person when the instructor has not provided a clear rule. Substantially completing an assignment or exam through AI is not permitted, and students should disclose non-incidental use when in doubt.",
      stability: "Review before every reuse",
    },
    {
      id: "graded-consult-first",
      label: "Consult OCS first for graded work",
      text:
        "For a concern involving work used as the basis of grading or evaluation, preserve the relevant materials and consult OCS before discussing the suspected violation with the student.",
      stability: "Review before every reuse",
      timeSensitive: true,
    },
    {
      id: "ungraded-conversation",
      label: "Ungraded work may follow a pedagogical path",
      text:
        "A concern involving an ungraded draft or other formative work may be addressed directly with the student, while still using clear policy, privacy, and fair communication practices.",
      stability: "Review before every reuse",
    },
    {
      id: "detector-not-required",
      label: "Detector verification is not required",
      text:
        "Faculty do not need to obtain a detector result before consulting OCS about suspected unpermitted use of generative AI.",
      stability: "Review before every reuse",
    },
    {
      id: "detector-not-sole",
      label: "Do not rely solely on a detector",
      text:
        "Stanford advises against relying solely on plagiarism or AI-detection tools to determine whether a student violated an AI-related course policy.",
      stability: "Review before every reuse",
    },
    {
      id: "no-penalty-grading",
      label: "Do not impose a suspicion-based grade penalty",
      text:
        "Faculty should not lower or alter a grade as an alternative to the Stanford process while suspected dishonesty remains unresolved.",
      stability: "Review before every reuse",
    },
    {
      id: "grade-after-responsibility",
      label: "Academic penalties follow responsibility",
      text:
        "Under the current Student Conduct Penalty Code, an instructor may apply a grade adjustment related to an Honor Code violation after a student accepts responsibility or is found responsible.",
      stability: "Review before every reuse",
    },
    {
      id: "reporting-window",
      label: "Act promptly",
      text:
        "The current faculty reporting page states that Honor Code concerns must be submitted within two months of discovery and encourages prompt consultation or submission.",
      stability: "Review before every reuse",
      timeSensitive: true,
    },
    {
      id: "consultation-not-filing",
      label: "Consultation is not a finding or automatic filing",
      text:
        "Faculty may consult OCS about a concern before filing. Consultation does not itself initiate an investigation or determine responsibility.",
      stability: "Review before every reuse",
    },
    {
      id: "weak-evidence",
      label: "Weak evidence does not become proof through suspicion",
      text:
        "Current OCS faculty guidance states that when evidence of misconduct is weak, the student receives the benefit of the doubt.",
      stability: "Review before every reuse",
    },
  ],
  sourceDiscrepancies: [
    {
      id: "student-contact-sequence",
      sourceA: "Stanford Teaching Commons guidance on technology tools for academic integrity",
      sourceAStatement:
        "For graded work, instructors should contact OCS and should not discuss the matter with the student before consulting OCS.",
      sourceB: "OCS Faculty & TAs guidance",
      sourceBStatement:
        "The page also includes wording that contemplates questioning the student before referral when the concern continues.",
      publicResolution:
        "Use “consult OCS first” in the public guide until OCS confirms the current preferred sequence.",
      requiredReviewer: "Office of Community Standards",
      status: "staff-confirmation-required",
    },
  ],
  staffReviewRequired: true,
  staleBehavior:
    "Continue displaying the durable guide, replace the process summary with “Current process due for review,” and retain direct links to OCS. Do not display stale procedural details as current.",
  staleLabel: "Current Stanford process due for review",
  staleGuidance:
    "Policies and procedures may have changed. Consult OCS before acting on a graded-work concern.",
  status: "published",
  ocsEmail: "community-standards@stanford.edu",
  ocsReportingUrl: "https://communitystandards.stanford.edu/reporting-honor-code-concern-faculty",
  ocsFacultyUrl: "https://communitystandards.stanford.edu/resources/faculty-tas",
};

/**
 * The five prominent actions for a graded-work concern. Derived here rather than
 * written into the component so the deadline sentence has exactly one home.
 */
export const gradedWorkActions: string[] = [
  "Preserve the submission, assignment instructions, course policy, and relevant ordinary course records.",
  "Contact the Office of Community Standards before discussing the suspected violation with the student.",
  "Do not impose a grade consequence based on suspicion.",
  "Do not wait for a detector result.",
  "Act promptly; the current reporting page states a two-month submission window from discovery.",
];

/** Which of those actions must be withheld once the snapshot is stale. */
const TIME_SENSITIVE_ACTION_INDEXES = [1, 4];

// -----------------------------------------------------------------------------
// Read helpers. Components call these instead of reading fields directly, so a
// stale record cannot leak a procedural claim through one forgotten call site.
// -----------------------------------------------------------------------------

const todayIso = () => new Date().toISOString().slice(0, 10);

export function processSnapshotIsStale(today = todayIso()): boolean {
  return today > stanfordStudentAiProcess.reviewBy;
}

/**
 * The rules safe to display. While current, all of them; once stale, only the
 * durable principles — the deadline and the contact sequence are withheld until
 * a human re-reads the source.
 */
export function displayableProcessRules(today = todayIso()): ProcessRule[] {
  const stale = processSnapshotIsStale(today);
  return stanfordStudentAiProcess.publicRules.filter((r) => !stale || !r.timeSensitive);
}

/** The prominent actions, with the deadline and contact sequence dropped when stale. */
export function displayableGradedWorkActions(today = todayIso()): string[] {
  if (!processSnapshotIsStale(today)) return gradedWorkActions;
  return gradedWorkActions.filter((_, i) => !TIME_SENSITIVE_ACTION_INDEXES.includes(i));
}

/** Discrepancies still awaiting a reviewer. Maintainer-facing, never public prose. */
export function openDiscrepancies(): SourceDiscrepancy[] {
  return stanfordStudentAiProcess.sourceDiscrepancies.filter(
    (d) => d.status === "staff-confirmation-required",
  );
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string) => ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

const REQUIRED_RULE_IDS: ProcessRuleId[] = [
  "clear-policy",
  "default-ai-guidance",
  "graded-consult-first",
  "ungraded-conversation",
  "detector-not-required",
  "detector-not-sole",
  "no-penalty-grading",
  "grade-after-responsibility",
  "reporting-window",
  "consultation-not-filing",
  "weak-evidence",
];

export type ProcessValidation = { errors: string[]; warnings: string[] };

/** `strict` promotes staleness from a warning to an error for a CI gate. */
export function validateStanfordProcess(
  today = todayIso(),
  { strict = false }: { strict?: boolean } = {},
): ProcessValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const raise = (m: string) => (strict ? errors : warnings).push(m);
  const p = stanfordStudentAiProcess;

  if (!p.id) errors.push("missing id");
  if (!p.displayTitle) errors.push("missing displayTitle");
  if (!p.owner) errors.push("missing owner");
  if (!p.reviewCadence) errors.push("missing reviewCadence");
  if (p.staffReviewRequired !== true) errors.push("staffReviewRequired must be true");
  if (!p.staleBehavior) errors.push("missing staleBehavior");
  if (!p.staleLabel) errors.push("missing staleLabel");
  if (!p.staleGuidance) errors.push("missing staleGuidance");
  else if (!/OCS/i.test(p.staleGuidance)) {
    errors.push("staleGuidance must still point faculty to OCS");
  }

  for (const [field, value] of Object.entries({ verifiedOn: p.verifiedOn, reviewBy: p.reviewBy })) {
    if (!isValidIsoDate(value)) errors.push(`${field} is not a valid ISO date`);
  }
  if (isValidIsoDate(p.verifiedOn) && isValidIsoDate(p.reviewBy) && p.reviewBy <= p.verifiedOn) {
    errors.push("reviewBy must fall after verifiedOn");
  }

  if (!p.officialSources.length) errors.push("missing officialSources");
  for (const url of p.officialSources) {
    if (!/^https:\/\/(communitystandards|teachingcommons)\.stanford\.edu\//.test(url)) {
      errors.push(`official source "${url}" must be an official Stanford OCS or Teaching Commons URL`);
    }
  }
  if (!/^https:\/\/communitystandards\.stanford\.edu\//.test(p.ocsReportingUrl)) {
    errors.push("ocsReportingUrl must be an official OCS URL");
  }
  if (!/@stanford\.edu$/.test(p.ocsEmail)) errors.push("ocsEmail must be a stanford.edu address");

  // Every required rule, each with text and a cadence.
  for (const id of REQUIRED_RULE_IDS) {
    if (!p.publicRules.some((r) => r.id === id)) errors.push(`missing required public rule "${id}"`);
  }
  const seenRules = new Set<string>();
  for (const r of p.publicRules) {
    if (seenRules.has(r.id)) errors.push(`public rule ${r.id}: duplicate id`);
    seenRules.add(r.id);
    if (!r.label) errors.push(`public rule ${r.id}: missing label`);
    if (!r.text) errors.push(`public rule ${r.id}: missing text`);
    if (!r.stability) errors.push(`public rule ${r.id}: missing stability cadence`);
  }

  // The two claims that must disappear when stale have to be marked as such,
  // or the stale state would keep publishing them.
  for (const id of ["graded-consult-first", "reporting-window"] as const) {
    const rule = p.publicRules.find((r) => r.id === id);
    if (rule && rule.timeSensitive !== true) {
      errors.push(
        `public rule ${id}: must be marked timeSensitive so the stale state withholds it`,
      );
    }
  }
  // ...and the durable principles must NOT be, or a stale snapshot would drop
  // the guidance that still holds.
  for (const id of ["no-penalty-grading", "detector-not-sole", "weak-evidence"] as const) {
    const rule = p.publicRules.find((r) => r.id === id);
    if (rule?.timeSensitive) {
      errors.push(`public rule ${id}: is durable guidance and must not be marked timeSensitive`);
    }
  }
  const stale = displayableProcessRules("9999-12-31");
  if (stale.some((r) => /two months/i.test(r.text))) {
    errors.push("the stale state still exposes the reporting deadline");
  }
  if (displayableGradedWorkActions("9999-12-31").some((a) => /two-month|before discussing/i.test(a))) {
    errors.push("the stale state still exposes the deadline or the student-contact sequence");
  }

  // At least one discrepancy record must exist, and a resolved one needs a date.
  if (!p.sourceDiscrepancies.length) {
    errors.push(
      "the OCS student-contact discrepancy record must be preserved, not deleted, until OCS confirms the sequence",
    );
  }
  for (const d of p.sourceDiscrepancies) {
    if (!d.sourceA || !d.sourceB) errors.push(`discrepancy ${d.id}: needs both sources named`);
    if (!d.publicResolution) errors.push(`discrepancy ${d.id}: missing publicResolution`);
    if (!d.requiredReviewer) errors.push(`discrepancy ${d.id}: missing requiredReviewer`);
    if (d.status === "resolved" && !isValidIsoDate(d.resolvedOn ?? "")) {
      errors.push(`discrepancy ${d.id}: a resolved discrepancy must record resolvedOn`);
    }
  }
  const contactSequence = p.sourceDiscrepancies.find((d) => d.id === "student-contact-sequence");
  if (contactSequence && !/consult OCS first/i.test(contactSequence.publicResolution)) {
    errors.push(
      'discrepancy student-contact-sequence: the public resolution must be the more protective "consult OCS first"',
    );
  }

  if (isValidIsoDate(p.reviewBy) && today > p.reviewBy) {
    const days = Math.round((Date.parse(today) - Date.parse(p.reviewBy)) / 86_400_000);
    raise(
      `the Stanford process snapshot is ${days} day(s) overdue for review (reviewBy ${p.reviewBy}, ` +
        `today ${today}). The reporting deadline and student-contact sequence are withheld from display ` +
        `until a maintainer re-reads ${p.ocsReportingUrl} and ${p.officialSources[5]}.`,
    );
  }

  return { errors, warnings };
}

// Structural problems always fail the build. Staleness does not: the component
// withholds the procedural claims instead, so a missed monthly review degrades to
// durable guidance plus live OCS links. `SLS_STRICT_PROCESS=1` makes CI fail.
const validation = validateStanfordProcess(undefined, {
  strict: process.env.SLS_STRICT_PROCESS === "1",
});
if (validation.errors.length) {
  throw new Error(`Stanford student-AI process snapshot is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[stanford-student-ai-process] ${w}`);
}

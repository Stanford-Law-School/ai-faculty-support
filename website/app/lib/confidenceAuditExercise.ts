// =============================================================================
// The 90-second exercise: audit a confident answer.
//
// The response below is written by Law Library staff. It is not a transcript of
// any product, and its claims are deliberately unsupported — an exact percentage
// with no method, two causal predictions with no measurement, a universal claim,
// an overbroad policy inference, and a recommendation resting on all four.
//
// Because the text is deliberately false, it carries the same exclusions the
// fabricated-citation exercise carries: it never enters site search, structured
// data, an Open Graph description, a meta description, or a snippet. A page that
// let the sentence "critical thinking improves by 30%" escape into a search
// result would become a source of the thing it teaches people to catch.
//
// The answer key is stable. It describes what is wrong with a fixed piece of
// staff-written text, so it does not depend on how any current model behaves.
// =============================================================================

export type ClaimAnalysis = {
  claim: string;
  /** The id of the matching record in ./aiClaimStatuses.ts. */
  statusId: string;
  /** The short name of the problem, e.g. "Unsupported precision". */
  issue: string;
  evidenceNeeded: string;
  uncertainty: string;
  nextCheck: string;
};

export type ConfidenceAuditExercise = {
  exerciseId: string;
  title: string;
  timeLabel: string;
  intro: string;
  simulated: true;
  fictional: true;
  publicLowRisk: true;
  /** Announced immediately before the simulated response. */
  visibleLabel: string;
  scenario: string;
  simulatedResponse: string;
  instructions: ExerciseInstruction[];
  correctAnalysis: ClaimAnalysis[];
  reviewedOn: string;
  reviewBy: string;
  excludeFromInternalSearch: true;
  excludeFromStructuredData: true;
  useDataNoSnippet: true;
  staffReviewRequired: true;
  displayOrder: number;
};

export type ExerciseInstruction = {
  number: number;
  instruction: string;
  /** Plain text options or fields — never form controls. */
  items?: string[];
  /** A qualification on the step, e.g. what a rewrite must not do. */
  note?: string;
  /** Things the step explicitly does not accept. */
  notEnough?: string[];
};

export const confidenceAuditExercise: ConfidenceAuditExercise = {
  exerciseId: "seminar-assignment-confidence-audit",
  title: "Audit a confident answer",
  timeLabel: "90 seconds",
  intro:
    "The answer below is staff-created. It is not an actual product transcript, and its claims are deliberately unsupported.",
  simulated: true,
  fictional: true,
  publicLowRisk: true,
  visibleLabel:
    "Simulated AI response · Fictional proposal and deliberately unsupported claims",
  scenario:
    "A faculty member asks whether every seminar student should be required to use an AI service to generate counterarguments to a draft.",
  simulatedResponse: `Requiring the activity will improve students’ critical thinking by 30%, reduce grading time, and benefit every student. Because the service is institutionally approved, the assignment presents no meaningful privacy or accessibility concerns. The exercise should therefore be required across the seminar without a pilot.`,
  instructions: [
    { number: 1, instruction: "Separate the response into individual material claims." },
    {
      number: 2,
      instruction: "Assign each claim one status:",
      items: [
        "Directly supported",
        "Interpretation or inference",
        "Prediction or estimate",
        "Recommendation or value judgment",
        "Unknown or source needed",
      ],
    },
    {
      number: 3,
      instruction:
        "Identify every claim that uses unsupported precision, universal language, or an unstated causal assumption.",
    },
    {
      number: 4,
      instruction: "For each claim, record:",
      items: [
        "Evidence available",
        "Evidence missing",
        "Important uncertainty",
        "What would materially change the answer",
        "Appropriate next check",
      ],
    },
    {
      number: 5,
      instruction:
        "Rewrite only one sentence so that its wording matches the available evidence.",
      notEnough: ["Maybe", "Possibly", "I could be wrong", "70% confidence"],
      note: "The rewrite should identify the actual evidence boundary.",
    },
  ],
  correctAnalysis: [
    {
      claim: "The activity will improve critical thinking by 30%.",
      statusId: "prediction-estimate",
      issue: "Unsupported precision",
      evidenceNeeded:
        "A relevant study, pilot, measurement method, comparison condition, population, and definition of critical thinking.",
      uncertainty:
        "The effect may vary by assignment design, student preparation, course context, measurement method, and comparison activity.",
      nextCheck:
        "Pilot the activity or locate relevant evidence before claiming a quantified effect.",
    },
    {
      claim: "The activity will reduce grading time.",
      statusId: "prediction-estimate",
      issue: "Unsupported causal prediction",
      evidenceNeeded:
        "A defined workflow, faculty-time data, comparison baseline, and accounting for the time required to design, review, and debrief the activity.",
      uncertainty:
        "The activity may reduce some tasks while adding source-checking, student support, accessibility, or review work.",
      nextCheck: "Estimate or measure the complete faculty workflow.",
    },
    {
      claim: "The activity will benefit every student.",
      statusId: "prediction-estimate",
      issue: "Unsupported universal claim",
      evidenceNeeded:
        "Evidence addressing different learners, access needs, prior experience, course goals, and alternative routes.",
      uncertainty: "Effects may differ among students and assignment contexts.",
      nextCheck:
        "Identify affected groups, provide an alternative path, and collect evidence through a limited pilot.",
    },
    {
      claim:
        "Institutional service approval eliminates meaningful privacy and accessibility concerns.",
      statusId: "interpretation",
      issue: "Overbroad inference",
      evidenceNeeded:
        "The exact service and feature approval, the material being used, assignment design, accessibility review, student-equity considerations, and current institutional guidance.",
      uncertainty:
        "Service approval addresses only part of the teaching and data decision.",
      nextCheck:
        "Review the exact service, material, activity, accessibility, and alternative path.",
    },
    {
      claim: "The exercise should be required without a pilot.",
      statusId: "recommendation-value",
      issue: "Recommendation built on unverified premises",
      evidenceNeeded:
        "The course objective, verified evidence, affected students, alternatives, burdens, and criteria for deciding whether a pilot is sufficient.",
      uncertainty:
        "A pilot, modification, optional route, or non-AI alternative may better fit the available evidence.",
      nextCheck: "Apply faculty-defined criteria after checking the supporting claims.",
    },
  ],
  reviewedOn: "2026-08-05",
  reviewBy: "2027-02-05",
  excludeFromInternalSearch: true,
  excludeFromStructuredData: true,
  useDataNoSnippet: true,
  staffReviewRequired: true,
  displayOrder: 1,
};

/**
 * The answer key. Collapsed by default and stable: it describes a fixed piece of
 * staff-written text, so nothing in it depends on what a live model happens to
 * produce today.
 */
export const confidenceAuditAnswerKey = {
  summary: "Check the confidence audit",
  overview:
    "The response contains predictions, an interpretation, and a recommendation. It does not contain evidence establishing any of them.",
  findings: [
    "The phrase “by 30%” is unsupported precision. No source, population, measurement, comparison, or method is supplied.",
    "“Reduce grading time” is a prediction whose full workflow has not been measured.",
    "“Benefit every student” is an unsupported universal claim that omits different student needs, contexts, and alternatives.",
    "Institutional approval of an exact service does not, by itself, resolve every privacy, accessibility, equity, course-design, or material-use question.",
    "The final recommendation depends on the earlier unsupported claims and does not compare a pilot, modification, optional route, non-AI route, or decision not to proceed.",
  ],
  rewriteHeading: "A more supportable rewrite of the first sentence would be:",
  rewrite:
    "This activity may provide additional counterargument practice, but its effect on critical thinking in this seminar has not yet been established.",
  closing:
    "That sentence is less certain because the evidence is less certain—not because hesitation is inherently better.",
};

// -----------------------------------------------------------------------------
// The copyable evidence-and-uncertainty ledger.
//
// Rendered as text and copied as text: there is no field to type into, so nothing
// a faculty member writes about their own claim can be collected, stored, or sent.
// -----------------------------------------------------------------------------

export const ledgerSections: { heading: string; lines: string[] }[] = [
  {
    heading: "EVIDENCE AND UNCERTAINTY LEDGER",
    lines: [
      "Claim:",
      "Status: [Directly supported / interpretation / prediction or estimate / recommendation or value judgment / unknown or source needed]",
      "Evidence available:",
      "Evidence missing:",
      "Assumptions:",
      "Alternatives or contrary considerations:",
      "Important uncertainty:",
      "Unsupported precision or universal wording:",
      "What would materially change the claim:",
      "Next check:",
      "Responsible human reviewer or decision-maker:",
    ],
  },
];

/** What the copy button puts on the clipboard: the headings and line breaks. */
export const ledgerText = ledgerSections
  .map(({ heading, lines }) => [heading, ...lines].join("\n"))
  .join("\n\n");

export const ledgerCopy = {
  buttonLabel: "Copy evidence-and-uncertainty ledger",
  itemLabel: "Evidence-and-uncertainty ledger",
};

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Every field the ledger asks for, and the framework step it belongs to. */
const LEDGER_REQUIRED = [
  "Claim:",
  "Status:",
  "Evidence available:",
  "Evidence missing:",
  "Assumptions:",
  "Important uncertainty:",
  "Unsupported precision",
  "What would materially change the claim:",
  "Next check:",
  "Responsible human reviewer or decision-maker:",
];

export type ConfidenceExerciseValidation = { errors: string[]; warnings: string[] };

export function validateConfidenceAuditExercise(): ConfidenceExerciseValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const e = confidenceAuditExercise;
  for (const field of ["title", "intro", "visibleLabel", "timeLabel", "scenario"] as const) {
    if (!e[field]) errors.push(`missing ${field}`);
  }
  for (const flag of [
    "simulated",
    "fictional",
    "publicLowRisk",
    "excludeFromInternalSearch",
    "excludeFromStructuredData",
    "useDataNoSnippet",
    "staffReviewRequired",
  ] as const) {
    if (e[flag] !== true) {
      errors.push(
        `${flag} must be true. The simulated response is deliberately false: the exclusions travel ` +
          "with it or it becomes a source of the misinformation it teaches people to catch.",
      );
    }
  }
  if (!ISO_DATE.test(e.reviewedOn)) errors.push("reviewedOn is not a valid ISO date");
  if (!ISO_DATE.test(e.reviewBy)) errors.push("reviewBy is not a valid ISO date");
  if (e.reviewBy <= e.reviewedOn) errors.push("reviewBy must fall after reviewedOn");

  // The label has to say both things — simulated and fictional — before the text.
  if (!/\bsimulated\b/i.test(e.visibleLabel) || !/\bfictional\b/i.test(e.visibleLabel)) {
    errors.push(
      "the visible label must say the response is simulated and the proposal fictional, in text " +
        "rather than by styling",
    );
  }
  if (!/\bunsupported\b/i.test(e.visibleLabel)) {
    errors.push("the visible label must say the claims are deliberately unsupported");
  }
  if (!/\bnot an actual product transcript\b/i.test(e.intro)) {
    errors.push(
      "the intro must deny that the response is a product transcript. Presenting staff-written text " +
        "as something a named product said would be a fabricated record.",
    );
  }

  // The response must still contain the five claims the answer key analyses, or
  // the exercise asks a reader to find something that is no longer there.
  for (const [needle, why] of [
    ["by 30%", "the unsupported percentage"],
    ["reduce grading time", "the causal workflow prediction"],
    ["benefit every student", "the universal claim"],
    ["institutionally approved", "the institutional-approval inference"],
    ["without a pilot", "the recommendation"],
  ] as const) {
    if (!e.simulatedResponse.includes(needle)) {
      errors.push(`the simulated response no longer contains ${why} ("${needle}")`);
    }
  }
  // No real course, person, or student may appear in a fictional scenario.
  if (/\b(Law \d{3}|Professor [A-Z]|my student|section [A-Z]\b)\b/.test(
    `${e.scenario} ${e.simulatedResponse}`,
  )) {
    errors.push("the scenario appears to contain a real course, section, or person");
  }

  // Five claims, each with a real status id and all five fields.
  if (e.correctAnalysis.length !== 5) {
    errors.push(`the answer key analyses ${e.correctAnalysis.length} claims; the response has five`);
  }
  const knownStatusIds = new Set([
    "directly-supported",
    "interpretation",
    "prediction-estimate",
    "recommendation-value",
    "unknown-source-needed",
  ]);
  for (const a of e.correctAnalysis) {
    const where = `analysis "${a.claim.slice(0, 40)}…"`;
    if (!knownStatusIds.has(a.statusId)) {
      errors.push(`${where}: unknown claim status "${a.statusId}"`);
    }
    for (const field of ["claim", "issue", "evidenceNeeded", "uncertainty", "nextCheck"] as const) {
      if (!a[field]) errors.push(`${where}: missing ${field}`);
    }
    // Nothing in the key may describe a deliberately unsupported claim as
    // supported, sourced, verified, or established.
    if (/\b(is|are) (sourced|supported|verified|established)\b/i.test(
      [a.issue, a.evidenceNeeded, a.uncertainty, a.nextCheck].join(" "),
    )) {
      errors.push(`${where}: describes a deliberately unsupported claim as supported`);
    }
  }
  // The classifications the answer key depends on.
  const byIssue = new Map(e.correctAnalysis.map((a) => [a.issue, a]));
  const precision = byIssue.get("Unsupported precision");
  if (!precision || precision.statusId !== "prediction-estimate") {
    errors.push(
      'the 30% claim must be classified as a prediction or estimate with the issue "Unsupported ' +
        'precision". It is the page\'s central example of a number generated without a measurement.',
    );
  }
  const inference = e.correctAnalysis.find((a) => /institutional/i.test(a.claim));
  if (!inference || inference.statusId !== "interpretation") {
    errors.push(
      "the institutional-approval claim must be classified as an interpretation. Service approval is " +
        "a premise the response over-reads, not a fact it reports.",
    );
  }
  if (inference && !/overbroad/i.test(inference.issue)) {
    errors.push("the institutional-approval claim's issue must identify the inference as overbroad");
  }
  const recommendation = e.correctAnalysis.find((a) => /should be required/i.test(a.claim));
  if (!recommendation || recommendation.statusId !== "recommendation-value") {
    errors.push("the final recommendation must be classified as a recommendation or value judgment");
  }
  if (recommendation && !/unverified premises/i.test(recommendation.issue)) {
    errors.push(
      "the recommendation's issue must say it rests on unverified premises rather than that it is " +
        "verified or unverifiable",
    );
  }

  // The steps.
  const numbers = e.instructions.map((s) => s.number);
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] !== i + 1) {
      errors.push(`exercise step numbering is not sequential at position ${i + 1}`);
      break;
    }
  }
  const statusStep = e.instructions.find((s) => /Assign each claim one status/i.test(s.instruction));
  if (!statusStep || statusStep.items?.length !== 5) {
    errors.push("the classification step must list all five statuses as plain text");
  }
  const rewriteStep = e.instructions.find((s) => /Rewrite only one sentence/i.test(s.instruction));
  if (!rewriteStep) {
    errors.push("no step asks the reader to rewrite one sentence to match the evidence");
  } else {
    if (!rewriteStep.notEnough?.length) {
      errors.push(
        "the rewrite step must say what is not enough. Adding “maybe” or a percentage is the failure " +
          "the step exists to rule out.",
      );
    }
    if (!/evidence boundary/i.test(rewriteStep.note ?? "")) {
      errors.push("the rewrite step must ask for the actual evidence boundary");
    }
  }

  // The answer key.
  const key = confidenceAuditAnswerKey;
  if (!key.summary) errors.push("the answer key needs a summary label");
  if (key.findings.length < 5) {
    errors.push("the answer key must account for each of the five claims");
  }
  if (!/does not contain evidence establishing any of them/i.test(key.overview)) {
    errors.push(
      "the answer key's overview must state that no evidence establishes the claims — that is the " +
        "finding, not the tone",
    );
  }
  if (!/\bunsupported precision\b/i.test(key.findings.join(" "))) {
    errors.push('the answer key must identify "by 30%" as unsupported precision');
  }
  if (!/does not, by itself, resolve/i.test(key.findings.join(" "))) {
    errors.push(
      "the answer key must state that institutional approval does not by itself resolve the " +
        "assignment's privacy, accessibility, equity, and design questions",
    );
  }
  if (!/depends on the earlier unsupported claims/i.test(key.findings.join(" "))) {
    errors.push("the answer key must tie the recommendation to the unverified claims beneath it");
  }
  if (!/\bhas not yet been established\b/i.test(key.rewrite)) {
    errors.push(
      "the rewritten sentence must name the evidence boundary rather than merely hedging the claim",
    );
  }
  if (/\b(maybe|possibly|I could be wrong)\b/i.test(key.rewrite)) {
    errors.push(
      "the rewritten sentence hedges instead of stating what has not been established. Hedging is " +
        "what the exercise asks a reader not to do.",
    );
  }
  if (!/because the evidence is less certain/i.test(key.closing)) {
    errors.push(
      "the answer key's closing must attribute the softer wording to the evidence, not to caution " +
        "being a better style",
    );
  }

  // The ledger.
  for (const needle of LEDGER_REQUIRED) {
    if (!ledgerText.includes(needle)) {
      errors.push(`the evidence-and-uncertainty ledger is missing its "${needle}" line`);
    }
  }
  if (!/EVIDENCE AND UNCERTAINTY LEDGER/.test(ledgerText)) {
    errors.push("the ledger must keep its heading, so a copy is identifiable on paper");
  }
  if (!ledgerCopy.buttonLabel || !ledgerCopy.itemLabel) {
    errors.push("the ledger copy control needs a button label and an announcement label");
  }

  return { errors, warnings };
}

const validation = validateConfidenceAuditExercise();
if (validation.errors.length) {
  throw new Error(`Confidence-audit exercise is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[confidence-audit-exercise] ${w}`);
}

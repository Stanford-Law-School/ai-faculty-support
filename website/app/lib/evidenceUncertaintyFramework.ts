// =============================================================================
// Claim. Evidence. Uncertainty. Next check.
//
// The four steps that turn "how confident are you?" — which only asks for another
// sentence — into something a faculty member can inspect. Each step carries the
// question it asks, the action it requires, the output it produces, and the way it
// is most often skipped.
//
// The validator holds four things in place, because each has a comfortable-looking
// failure mode:
//
//   - Evidence must require opening the material, not accepting a citation.
//   - Uncertainty must be more than a hedging word or an unexplained percentage.
//   - The next check must name a verification or a human reviewer.
//   - No step may hand the consequential decision to the system.
// =============================================================================

export type EvidenceUncertaintyStep = {
  id: string;
  /** Rendered as the step number; kept in the record so it survives print. */
  number: number;
  title: string;
  question: string;
  action: string;
  output: string;
  commonFailure: string;
  displayOrder: number;
};

export const evidenceUncertaintySteps: EvidenceUncertaintyStep[] = [
  {
    id: "name-the-claim",
    number: 1,
    title: "Claim",
    question: "What exact statement is being made?",
    action:
      "Quote or restate the material claim and assign one claim status: directly supported, interpretation, prediction, recommendation, or unknown.",
    output:
      "A discrete statement that can be evaluated rather than an impression of the whole paragraph.",
    commonFailure:
      "Evaluating the paragraph’s overall tone instead of separating its individual claims.",
    displayOrder: 1,
  },
  {
    id: "show-the-evidence",
    number: 2,
    title: "Evidence",
    question: "What inspectable material supports the claim?",
    action:
      "Identify the source, passage, data, method, version, or record. Mark the claim “SOURCE NEEDED” when none is available.",
    output: "A visible evidence path.",
    commonFailure:
      "Treating a citation, source list, or search result as proof without opening the supporting material.",
    displayOrder: 2,
  },
  {
    id: "bound-the-uncertainty",
    number: 3,
    title: "Uncertainty",
    question: "What assumptions, alternatives, ranges, limitations, and unknowns remain?",
    action:
      "Identify what is not established, what could vary, and whether the uncertainty is factual, interpretive, predictive, normative, or caused by missing context.",
    output: "A bounded statement that does not claim more than the evidence supports.",
    commonFailure:
      "Adding “possibly” or a percentage without explaining what makes the answer uncertain.",
    displayOrder: 3,
  },
  {
    id: "define-next-check",
    number: 4,
    title: "Next check",
    question: "What evidence, test, clarification, or human decision should happen next?",
    action:
      "State what would materially change the answer and identify the responsible reviewer or decision-maker.",
    output: "An actionable next step rather than decorative caution language.",
    commonFailure:
      "Ending with a caveat but leaving the user with no way to resolve or manage the uncertainty.",
    displayOrder: 4,
  },
];

/**
 * Rendered beneath the four steps. The framework's purpose is proportion, not
 * hedging: a guide that produced uniformly tentative answers would have replaced
 * one uninformative tone with another.
 */
export const evidenceFrameworkClosingNote =
  "The purpose is not to make every answer hesitant. It is to connect the strength of the wording to the strength of the evidence and the consequence of error.";

/** The four-word form, used as the faculty move. */
export const evidenceUncertaintyShortForm = "Claim. Evidence. Uncertainty. Next check.";

export function orderedEvidenceUncertaintySteps(): EvidenceUncertaintyStep[] {
  return [...evidenceUncertaintySteps].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const REQUIRED_IDS = [
  "name-the-claim",
  "show-the-evidence",
  "bound-the-uncertainty",
  "define-next-check",
];

export type FrameworkValidation = { errors: string[]; warnings: string[] };

export function validateEvidenceUncertaintyFramework(): FrameworkValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const ids = orderedEvidenceUncertaintySteps().map((s) => s.id);
  if (ids.length !== REQUIRED_IDS.length || ids.some((id, i) => id !== REQUIRED_IDS[i])) {
    errors.push(
      `expected exactly [${REQUIRED_IDS.join(", ")}] in that order, found [${ids.join(", ")}]`,
    );
  }

  const seenOrders = new Set<number>();
  const seenNumbers = new Set<number>();
  orderedEvidenceUncertaintySteps().forEach((s, index) => {
    const where = `framework step ${s.id}`;
    for (const field of ["title", "question", "action", "output", "commonFailure"] as const) {
      if (!s[field]) errors.push(`${where}: missing ${field}`);
    }
    if (seenOrders.has(s.displayOrder)) errors.push(`${where}: duplicate displayOrder`);
    seenOrders.add(s.displayOrder);
    if (seenNumbers.has(s.number)) errors.push(`${where}: duplicate number ${s.number}`);
    seenNumbers.add(s.number);
    if (s.number !== index + 1) {
      errors.push(`${where}: number ${s.number} is out of sequence — expected ${index + 1}`);
    }
    if (!/\?$/.test(s.question)) errors.push(`${where}: the question must be a question`);
  });

  const claim = evidenceUncertaintySteps.find((s) => s.id === "name-the-claim");
  if (claim && !/\bstatus\b/i.test(claim.action)) {
    errors.push(
      "name-the-claim: the action must assign a claim status. Naming the claim without saying what " +
        "kind of claim it is leaves nothing to check it against.",
    );
  }

  const evidence = evidenceUncertaintySteps.find((s) => s.id === "show-the-evidence");
  if (evidence) {
    if (!/SOURCE NEEDED/.test(evidence.action)) {
      errors.push('show-the-evidence: the action must mark unsupported claims "SOURCE NEEDED"');
    }
    if (!/\bwithout opening the supporting material\b/i.test(evidence.commonFailure)) {
      errors.push(
        "show-the-evidence: the common failure must be accepting a citation without opening it. That " +
          "is the step's whole subject.",
      );
    }
  }

  const uncertainty = evidenceUncertaintySteps.find((s) => s.id === "bound-the-uncertainty");
  if (uncertainty) {
    // A step that asked only for hedging words would reproduce the problem.
    if (!/\b(factual|interpretive|predictive|normative)\b/i.test(uncertainty.action)) {
      errors.push(
        "bound-the-uncertainty: the action must ask what kind of uncertainty it is. Uncertainty that " +
          "is not typed cannot be matched to a next step.",
      );
    }
    if (!/\b(possibly|percentage)\b/i.test(uncertainty.commonFailure)) {
      errors.push(
        "bound-the-uncertainty: the common failure must name decorative caution — a hedging word or " +
          "an unexplained percentage in place of a reason",
      );
    }
    if (/^\s*(add|use) (a )?(caveat|hedge|qualifier)/i.test(uncertainty.action)) {
      errors.push(
        "bound-the-uncertainty: the action reduces uncertainty to adding a caveat, which is the " +
          "failure it exists to prevent",
      );
    }
  }

  const nextCheck = evidenceUncertaintySteps.find((s) => s.id === "define-next-check");
  if (nextCheck) {
    if (!/\b(reviewer|decision-maker|human)\b/i.test(nextCheck.action)) {
      errors.push(
        "define-next-check: the action must identify the responsible human reviewer or decision-maker",
      );
    }
    if (!/\bmaterially change\b/i.test(nextCheck.action)) {
      errors.push(
        "define-next-check: the action must state what would materially change the answer",
      );
    }
    if (!/\bactionable\b/i.test(nextCheck.output)) {
      errors.push("define-next-check: the output must be an actionable step, not a caveat");
    }
  }

  // Nothing in the framework may hand over the decision.
  const allProse = [
    evidenceFrameworkClosingNote,
    evidenceUncertaintyShortForm,
    ...evidenceUncertaintySteps.flatMap((s) => [s.question, s.action, s.output, s.commonFailure]),
  ].join(" ");
  for (const [pattern, why] of [
    [/\bthe (model|system|AI) decides\b/i, "assigns the decision to the system"],
    [/\blet the (model|system|AI) decide\b/i, "assigns the decision to the system"],
    [/\b(the ledger|the framework) (verifies|confirms|proves)\b/i, "presents the framework as verification"],
    [/\bmakes the answer correct\b/i, "suggests that adding caveats makes an answer correct"],
  ] as const) {
    if (pattern.test(allProse)) {
      errors.push(`the framework ${why}. The consequential decision stays with the person.`);
    }
  }
  if (!/\bnot to make every answer hesitant\b/i.test(evidenceFrameworkClosingNote)) {
    errors.push(
      "the closing note must deny that the goal is hesitancy. Uniform tentativeness is the same " +
        "failure as uniform confidence.",
    );
  }
  if (evidenceUncertaintyShortForm !== "Claim. Evidence. Uncertainty. Next check.") {
    errors.push(
      "the faculty move must remain “Claim. Evidence. Uncertainty. Next check.” — it is the one " +
        "behavior the guide asks a reader to carry away.",
    );
  }

  return { errors, warnings };
}

const validation = validateEvidenceUncertaintyFramework();
if (validation.errors.length) {
  throw new Error(
    `Evidence-and-uncertainty framework is invalid:\n  - ${validation.errors.join("\n  - ")}`,
  );
}
for (const w of validation.warnings) {
  console.warn(`[evidence-uncertainty-framework] ${w}`);
}

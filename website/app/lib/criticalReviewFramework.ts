// =============================================================================
// Build it. Break it. Check it. You decide.
//
// Four jobs, deliberately separated. One response asked to be advocate, critic,
// researcher, and decision-maker at once does all four badly, and the fourth is
// not the system's to do at all.
//
// The fourth step is the load-bearing one. The validator refuses:
//
//   - a final step that is anything other than "You decide";
//   - a step whose prompt instruction asks the system to make the decision;
//   - a "Check" step that omits independent source review;
//   - a "Break" step that demands equal weight for both sides;
//   - a "Build" step described as endorsement.
//
// Each of those is a way the framework could be quietly inverted while still
// looking like the framework.
// =============================================================================

export type ReviewStep = {
  id: string;
  number: number;
  title: string;
  /** What this step is for. */
  job: string;
  /** What to ask the system to do at this step. */
  promptInstruction: string;
  /** How the step gets misread. */
  commonFailure: string;
  /** What the person must do, which the system cannot. */
  humanResponsibility: string;
  displayOrder: number;
};

export const reviewSteps: ReviewStep[] = [
  {
    id: "build-it",
    number: 1,
    title: "Build it",
    job: "Develop the strongest coherent case for the proposal, argument, interpretation, or choice.",
    promptInstruction:
      "Make the strongest evidence-based case for the position. State the assumptions you are accepting.",
    commonFailure: "The advocacy is mistaken for independent endorsement.",
    humanResponsibility:
      "Decide whether the supporting case is fair, relevant, and grounded in the real objective.",
    displayOrder: 1,
  },
  {
    id: "break-it",
    number: 2,
    title: "Break it",
    job: "Identify the strongest credible objections, counterexamples, failure modes, and competing interpretations.",
    promptInstruction:
      "Give the strongest credible case against the position. Prioritize objections that would materially affect the objective.",
    commonFailure: "A long or harsh list is mistaken for a strong counterargument.",
    humanResponsibility: "Determine which objections are material, fair, and supported.",
    displayOrder: 2,
  },
  {
    id: "check-it",
    number: 3,
    title: "Check it",
    job: "Separate evidence, predictions, values, assumptions, and unknowns.",
    promptInstruction:
      "Identify the evidence supporting each material claim, what would weaken it, and what remains unknown. Mark unsupported claims “SOURCE NEEDED.”",
    commonFailure: "A citation or confident explanation is treated as completed verification.",
    humanResponsibility:
      "Open the appropriate sources and judge their authority, relevance, support, and currency.",
    displayOrder: 3,
  },
  {
    id: "you-decide",
    number: 4,
    title: "You decide",
    job: "Apply the learning objective, legal framework, institutional policy, values, constraints, tradeoffs, and consequences.",
    promptInstruction:
      "Ask the system to summarize options and conditions, not to become the accountable decision-maker.",
    commonFailure:
      "A generated recommendation becomes the faculty, professional, committee, or institutional decision.",
    humanResponsibility: "Make, document, communicate, and remain accountable for the decision.",
    displayOrder: 4,
  },
];

/** The one line the guide asks a reader to remember. */
export const frameworkShortForm = "Build it. Break it. Check it. You decide.";

/** Rendered below the list, so the division of labour is stated, not implied. */
export const frameworkClosingNote =
  "Build and Break generate positions. Check establishes what the evidence supports. Decide remains human.";

export function orderedReviewSteps(): ReviewStep[] {
  return [...reviewSteps].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const REQUIRED_IDS = ["build-it", "break-it", "check-it", "you-decide"];

export type FrameworkValidation = { errors: string[]; warnings: string[] };

export function validateFramework(): FrameworkValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const ids = orderedReviewSteps().map((s) => s.id);
  if (ids.length !== REQUIRED_IDS.length || ids.some((id, i) => id !== REQUIRED_IDS[i])) {
    errors.push(
      `expected exactly [${REQUIRED_IDS.join(", ")}] in that order, found [${ids.join(", ")}]`,
    );
  }

  const seenOrders = new Set<number>();
  const seenNumbers = new Set<number>();
  for (const s of reviewSteps) {
    const where = `step ${s.id}`;
    for (const field of [
      "title",
      "job",
      "promptInstruction",
      "commonFailure",
      "humanResponsibility",
    ] as const) {
      if (!s[field]) errors.push(`${where}: missing ${field}`);
    }
    if (seenOrders.has(s.displayOrder)) errors.push(`${where}: duplicate displayOrder`);
    seenOrders.add(s.displayOrder);
    if (seenNumbers.has(s.number)) errors.push(`${where}: duplicate number`);
    seenNumbers.add(s.number);
    if (s.number !== s.displayOrder) {
      errors.push(`${where}: number ${s.number} does not match displayOrder ${s.displayOrder}`);
    }

    // No step may hand the decision to the system.
    if (/\b(the (system|model|AI) (should )?(decides?|makes the (final )?decision)|let (it|the model) decide)\b/i.test(
      `${s.job} ${s.promptInstruction} ${s.humanResponsibility}`,
    )) {
      errors.push(`${where}: assigns the decision to the system`);
    }
  }

  const build = reviewSteps.find((s) => s.id === "build-it");
  if (build) {
    if (!/\bstrongest\b/i.test(build.job)) {
      errors.push("build-it: the job is to make the strongest case, not a summary");
    }
    // Build is generation. Describing it as endorsement is the error the step's
    // own commonFailure names, so it must not appear in the step's own framing.
    if (/\b(independent endorsement|independently endorses|constitutes approval)\b/i.test(
      `${build.job} ${build.promptInstruction}`,
    )) {
      errors.push("build-it: must not be presented as independent endorsement");
    }
    if (!/\bendorsement\b/i.test(build.commonFailure)) {
      errors.push("build-it: commonFailure must name the endorsement misreading");
    }
  }

  const breakIt = reviewSteps.find((s) => s.id === "break-it");
  if (breakIt) {
    if (!/\bcredible\b/i.test(breakIt.job) || !/\bcredible\b/i.test(breakIt.promptInstruction)) {
      errors.push('break-it: must ask for a "credible" case, not merely an opposing one');
    }
    // False balance is the failure mode on this side: manufactured objections of
    // equal weight are not a counterargument.
    if (/\b(equal weight|equal balance|balance both sides equally|same number of)\b/i.test(
      `${breakIt.job} ${breakIt.promptInstruction}`,
    )) {
      errors.push("break-it: must not require artificial equal balance between the two sides");
    }
    if (!/\bmaterially\b|\bmaterial\b/i.test(breakIt.promptInstruction + breakIt.humanResponsibility)) {
      errors.push("break-it: must prioritize objections that matter to the objective");
    }
  }

  const check = reviewSteps.find((s) => s.id === "check-it");
  if (check) {
    if (!/SOURCE NEEDED/.test(check.promptInstruction)) {
      errors.push('check-it: the prompt instruction must require unsupported claims to be marked "SOURCE NEEDED"');
    }
    // Check is where verification is assigned to the person. A step that ends at
    // "the response cited something" is the failure it exists to prevent.
    if (!/\bOpen the\b/i.test(check.humanResponsibility) || !/\bsources?\b/i.test(check.humanResponsibility)) {
      errors.push(
        "check-it: humanResponsibility must require opening the sources — independent source review " +
          "is the step, not a suggestion",
      );
    }
    if (!/\b(authority|relevance|currency)\b/i.test(check.humanResponsibility)) {
      errors.push("check-it: humanResponsibility must name what the reader judges about a source");
    }
  }

  const decide = reviewSteps.find((s) => s.id === "you-decide");
  if (decide) {
    if (decide.number !== 4 || orderedReviewSteps()[3]?.id !== "you-decide") {
      errors.push("you-decide must be the last step");
    }
    if (decide.title !== "You decide") {
      errors.push(
        `the final step is labelled "${decide.title}". The public label is "You decide" — changing it ` +
          "changes who is accountable.",
      );
    }
    if (!/\baccountable\b/i.test(decide.promptInstruction + decide.humanResponsibility)) {
      errors.push("you-decide: must state that accountability stays with the person");
    }
    if (!/\bsummarize options\b|\bnot to become\b/i.test(decide.promptInstruction)) {
      errors.push(
        "you-decide: the prompt instruction must keep the system on options and conditions rather " +
          "than the decision",
      );
    }
  }

  if (frameworkShortForm !== "Build it. Break it. Check it. You decide.") {
    errors.push(
      `the short form reads "${frameworkShortForm}". It is the one line the guide asks a reader to ` +
        "remember, and it must match the four steps.",
    );
  }
  if (!frameworkClosingNote || !/\bremains human\b/i.test(frameworkClosingNote)) {
    errors.push("the closing note must state that the decision remains human");
  }

  return { errors, warnings };
}

const validation = validateFramework();
if (validation.errors.length) {
  throw new Error(`Critical-review framework is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[critical-review-framework] ${w}`);
}

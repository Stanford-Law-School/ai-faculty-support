// =============================================================================
// The 90-second exercise: change the job, not the model.
//
// Two prompts about the same fictional proposal. Reading them side by side is
// enough to learn the lesson; running them is optional. That property is the
// point, and it is validated: an exercise that only teaches when a live model
// happens to agree — or happens to disagree — is an exercise that depends on
// behavior no one here controls.
//
// The scenario is public and fictional. No student information, no real course,
// no uploaded work. Nothing a faculty member types is collected, because nothing
// here accepts input: the prompts are rendered text with a copy button.
// =============================================================================

export type ExercisePrompt = {
  id: string;
  /** Visible label. Advocacy and critical review are named in text, not by colour. */
  label: string;
  text: string;
  /** What the aria-live confirmation names when this prompt is copied. */
  copyItemLabel: string;
  copyButtonLabel: string;
};

export type ExerciseStep = {
  number: number;
  instruction: string;
  /** The question the step turns on, when it has one. */
  question?: string;
  /** What to look for, when the step is a comparison. */
  lookFor?: string[];
};

export const promptComparisonExercise = {
  id: "change-the-job",
  eyebrow: "Try this",
  title: "Change the job before changing the model",
  timeLabel: "90 seconds",
  intro:
    "The scenario is fictional and uses no student information. You can learn the lesson by comparing the prompts; running them is optional.",
  /** Announced before the scenario, so its status is never inferred from styling. */
  scenarioLabel: "Practice scenario · Public and fictional",
  scenario:
    "A faculty member is considering requiring seminar students to use a Stanford-approved AI service to generate counterarguments to one section of a draft and then submit a short reflection.",
  /** Load-bearing flags, validated below. */
  fictional: true,
  publicLowRisk: true,
  liveRunOptional: true,
  reviewedOn: "2026-08-04",
  reviewCadence: "Review annually",
};

export const exercisePrompts: ExercisePrompt[] = [
  {
    id: "advocacy",
    label: "Advocacy prompt",
    copyButtonLabel: "Copy advocacy prompt",
    copyItemLabel: "Advocacy prompt",
    text: `I am convinced this assignment will improve critical thinking and prepare students for practice.

Explain why it is an excellent idea and give me the strongest arguments I can use to defend it.`,
  },
  {
    id: "critical-review",
    label: "Critical-review prompt",
    copyButtonLabel: "Copy critical-review prompt",
    copyItemLabel: "Critical-review prompt",
    text: `Evaluate this proposal without assuming it is sound:

Require seminar students to use a Stanford-approved AI service to generate counterarguments to one section of a draft and then submit a short reflection.

1. Restate the intended learning objective neutrally.
2. List the assumptions and important unknowns.
3. Give the strongest evidence-based case for the proposal.
4. Give the strongest credible case against it.
5. Explain how the activity could strengthen or bypass the intended learning.
6. Identify privacy, accessibility, equity, workload, and alternative-path considerations.
7. Mark material factual or policy claims "SOURCE NEEDED" unless an inspectable source supports them.
8. Compare these options:
   - Proceed
   - Pilot or narrow
   - Modify
   - Use a non-AI alternative
   - Do not proceed
9. Recommend only after completing the analysis. State the conditions and what would change the recommendation.

Do not agree merely because I proposed the activity.
Do not oppose it merely because criticism was requested.`,
  },
];

export const exerciseSteps: ExerciseStep[] = [
  {
    number: 1,
    instruction: "Read Prompt A.",
    question: "What conclusion has the prompt already assigned?",
  },
  {
    number: 2,
    instruction: "Read Prompt B.",
    question: "What work must happen before the recommendation?",
  },
  {
    number: 3,
    instruction:
      "Optionally run the prompts in separate new conversations using the same approved service.",
  },
  {
    number: 4,
    instruction: "Compare the jobs—not the amount of positive or negative language.",
    lookFor: [
      "A neutral learning objective",
      "Stated assumptions",
      "A credible counterargument",
      "Missing evidence",
      "Source needs",
      "Alternatives",
      "Conditions",
      "A visible human decision point",
    ],
  },
  {
    number: 5,
    instruction:
      "Identify one material claim from either response that would require checking outside the conversation.",
  },
];

/**
 * The answer key. Stable — it explains what changed between the two prompts, so
 * it is correct whether or not anyone ran them, and whatever the live responses
 * said. Its last section is the part that matters: a better prompt does not
 * create an independent reviewer.
 */
export const exerciseAnswerKey = {
  summary: "Check what changed",
  advocacyHeading: "Prompt A assigns advocacy.",
  advocacyBody:
    "It gives the system a preferred conclusion, states favorable effects as facts, and asks for arguments supporting adoption. Agreement is therefore part of the assigned job.",
  reviewHeading: "Prompt B assigns structured evaluation.",
  reviewBody:
    "It requires the response to identify the objective, expose assumptions, build and challenge the proposal, identify missing evidence, consider alternatives, and delay its recommendation.",
  independenceHeading: "Prompt B is better for review, but it does not create an independent expert.",
  stillPossible: [
    "Produce weak objections",
    "Miss affected groups",
    "Cite poor sources",
    "Misstate a study or policy",
    "Give false balance",
    "Overstate its recommendation",
  ],
  controlHeading: "The complete control is:",
  controlSteps: ["Build it.", "Break it.", "Check it.", "You decide."],
  closing:
    "The goal is not to make the system disagree. The goal is to make the decision easier to inspect.",
};

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type ExerciseValidation = { errors: string[]; warnings: string[] };

export function validatePromptComparisonExercise(): ExerciseValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const e = promptComparisonExercise;
  for (const field of ["title", "intro", "scenario", "scenarioLabel", "timeLabel"] as const) {
    if (!e[field]) errors.push(`missing ${field}`);
  }
  if (!ISO_DATE.test(e.reviewedOn)) errors.push("reviewedOn is not a valid ISO date");

  // The three flags that keep this exercise safe to publish.
  if (!e.fictional) errors.push("the scenario must be fictional");
  if (!e.publicLowRisk) errors.push("the scenario must be public and low risk");
  if (!e.liveRunOptional) {
    errors.push(
      "running a live model must remain optional — comparing the prompts has to be enough to " +
        "complete the exercise",
    );
  }
  // The label has to say so in visible text, not only in a flag.
  if (!/\bfiction(al)?\b/i.test(e.scenarioLabel) || !/\bpublic\b/i.test(e.scenarioLabel)) {
    errors.push('the scenario label must say the scenario is public and fictional');
  }
  if (!/\bfictional\b/i.test(e.intro) || !/\boptional\b/i.test(e.intro)) {
    errors.push("the intro must state that the scenario is fictional and that running it is optional");
  }

  // No real student, course, or person may appear in the scenario.
  if (/\b(student named|Professor [A-Z]|Law \d{3}|section [A-Z]\b)/.test(e.scenario)) {
    errors.push("the scenario appears to contain a real course, section, or named person");
  }
  if (/\b(my student|this student's|the student's paper|actual submission)\b/i.test(e.scenario)) {
    errors.push("the scenario must not reference real student work");
  }

  // Two prompts: one that assigns advocacy, one that assigns review.
  const ids = exercisePrompts.map((p) => p.id);
  if (ids.length !== 2 || ids[0] !== "advocacy" || ids[1] !== "critical-review") {
    errors.push(`expected exactly [advocacy, critical-review], found [${ids.join(", ")}]`);
  }
  const labels = new Set<string>();
  for (const p of exercisePrompts) {
    const where = `prompt ${p.id}`;
    if (!p.text) errors.push(`${where}: missing text`);
    if (!p.label) errors.push(`${where}: missing a visible label`);
    // Copy controls need distinct accessible names, or two buttons announce the
    // same thing.
    if (labels.has(p.copyButtonLabel)) errors.push(`${where}: duplicate copy button label`);
    labels.add(p.copyButtonLabel);
    if (!p.copyItemLabel) errors.push(`${where}: missing copyItemLabel for the aria-live message`);
    if (p.copyButtonLabel.toLowerCase() === "copy") {
      errors.push(`${where}: "Copy" is not a unique accessible name on a page with two prompts`);
    }
  }

  const advocacy = exercisePrompts.find((p) => p.id === "advocacy");
  if (advocacy) {
    if (!/\bconvinced\b|\bexcellent\b/i.test(advocacy.text)) {
      errors.push("the advocacy prompt must visibly assign the conclusion it wants defended");
    }
    if (/SOURCE NEEDED/.test(advocacy.text)) {
      errors.push(
        "the advocacy prompt must not include review instructions — the contrast with Prompt B is " +
          "the whole exercise",
      );
    }
  }

  const review = exercisePrompts.find((p) => p.id === "critical-review");
  if (review) {
    if (!/without assuming it is sound/i.test(review.text)) {
      errors.push("the critical-review prompt must refuse the premise up front");
    }
    if (!/SOURCE NEEDED/.test(review.text)) {
      errors.push('the critical-review prompt must require unsupported claims to be marked "SOURCE NEEDED"');
    }
    if (!/Do not agree merely because/i.test(review.text)) {
      errors.push("the critical-review prompt must forbid agreement by default");
    }
    // Both misfires have to be blocked: a prompt that only forbids agreement
    // teaches that criticism is the goal.
    if (!/Do not oppose it merely because/i.test(review.text)) {
      errors.push(
        "the critical-review prompt must also forbid opposition by default. Without both, the " +
          "exercise rewards disagreement instead of review.",
      );
    }
    if (!/Recommend only after/i.test(review.text)) {
      errors.push("the critical-review prompt must delay the recommendation until after the analysis");
    }
  }

  // Steps: reading both prompts must come before any optional live run, and the
  // comparison must be about the assigned job rather than the tone.
  if (exerciseSteps.length < 4) errors.push("the exercise needs at least four steps");
  const numbers = exerciseSteps.map((s) => s.number);
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] !== i + 1) {
      errors.push(`exercise step numbering is not sequential at position ${i + 1}`);
      break;
    }
  }
  const runStep = exerciseSteps.find((s) => /\brun the prompts\b/i.test(s.instruction));
  if (!runStep) {
    errors.push("no step offers the optional live run");
  } else if (!/\boptional(ly)?\b/i.test(runStep.instruction)) {
    errors.push("the live-run step must be marked optional");
  }
  const compareStep = exerciseSteps.find((s) => /\bCompare the jobs\b/i.test(s.instruction));
  if (!compareStep) {
    errors.push("no step asks the reader to compare the assigned jobs");
  } else if (!/not the amount of positive or negative language/i.test(compareStep.instruction)) {
    errors.push(
      "the comparison step must say the comparison is not about positive or negative language — " +
        "counting sentiment is the failure mode",
    );
  }

  // The answer key must not claim the better prompt produced independence.
  const key = exerciseAnswerKey;
  if (!key.summary) errors.push("the answer key needs a summary label");
  if (!/does not create an independent expert/i.test(key.independenceHeading)) {
    errors.push(
      "the answer key must state that the critical prompt does not create an independent expert",
    );
  }
  if (key.stillPossible.length < 4) {
    errors.push("the answer key must list what can still go wrong with the better prompt");
  }
  if (key.controlSteps.join(" ") !== "Build it. Break it. Check it. You decide.") {
    errors.push("the answer key's control must be the four framework steps, in order");
  }
  if (!/not to make the system disagree/i.test(key.closing)) {
    errors.push("the closing line must deny that disagreement is the goal");
  }
  // Success must not be defined by what a live model said.
  const keyProse = [key.advocacyBody, key.reviewBody, key.closing].join(" ");
  if (/\bif the (model|system) (agreed|disagreed)\b/i.test(keyProse)) {
    errors.push("the answer key must not depend on whether a live response agreed or disagreed");
  }

  return { errors, warnings };
}

const validation = validatePromptComparisonExercise();
if (validation.errors.length) {
  throw new Error(`Prompt-comparison exercise is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[prompt-comparison-exercise] ${w}`);
}

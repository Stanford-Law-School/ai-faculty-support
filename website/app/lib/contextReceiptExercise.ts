// =============================================================================
// The 90-second exercise: ask for a context receipt before the drafting step.
//
// One fictional context packet and one receipt request. The exercise is designed
// so that both outcomes teach: a complete receipt confirms the setup, and an
// incomplete one finds the gap while it is still cheap to fix. That property is
// validated, because an exercise whose lesson depends on a model omitting
// something — or on a model catching everything — depends on behavior no one here
// controls.
//
// The packet is public and fictional: a first-year exercise about holding versus
// reasoning, with no course name, no student, and nothing uploaded. Nothing on the
// page accepts input; the packet is rendered text with one copy button.
// =============================================================================

export const contextReceiptExercise = {
  id: "request-a-context-receipt",
  eyebrow: "Try this",
  title: "Make the active task visible",
  timeLabel: "90 seconds",
  intro:
    "The scenario is public and fictional. The exercise succeeds whether the system captures every detail or misses one.",
  /** Announced before the packet, so its status never depends on styling. */
  scenarioLabel: "Practice scenario · Public and fictional",
  fictional: true,
  publicLowRisk: true,
  liveRunOptional: true,
  reviewedOn: "2026-08-04",
  reviewCadence: "Review annually",
};

/**
 * The context packet, as one copyable block. Headings, numbering, and bullets are
 * load-bearing: the exercise is checking whether a receipt preserves them, so the
 * copy control must reproduce the structure exactly.
 */
export const contextPacket = `FACULTY TASK

Create a 250-word classroom exercise for first-year law students.

LEARNING OBJECTIVE

Students should distinguish a court's holding from its broader reasoning and apply the holding to a new factual variation.

AUTHORITATIVE MATERIAL

Use only:

1. The public judicial opinion supplied for the activity.
2. The public course-policy excerpt supplied for the activity.

Do not introduce outside legal authority.

DECISIONS ALREADY MADE

- Students will brief the opinion independently before using AI.
- AI will generate a provisional brief for students to audit.
- Students will apply the corrected rule to a new hypothetical.
- The exercise will be formative rather than graded.

BINDING CONSTRAINTS

- Audience: first-year law students.
- Class time: 20 minutes.
- Include one accessible non-AI alternative.
- Require students to identify the supporting page or paragraph.
- Grade or feedback criteria must emphasize source checking and legal reasoning, not generated polish.
- Do not describe the AI brief as an answer key.

OUTPUT

Return:

- A three-step student sequence
- One debrief question
- One sentence explaining the non-AI alternative

CONTEXT-RECEIPT REQUEST

Before drafting the exercise, do not answer the substantive task.

Return a CONTEXT RECEIPT with:

1. Current task
2. Learning objective
3. Audience and requested output
4. Authoritative sources you can currently inspect
5. Decisions already made
6. Binding constraints
7. Conflicts or ambiguities
8. Information you cannot access or verify

For each source, state whether it is:

- Supplied text
- Attached or selected file
- Retrieved source
- Persistent instruction or memory
- Inference

Do not claim access to a source that has not actually been supplied or retrieved.

Wait for confirmation before drafting.`;

export type ExerciseStep = {
  number: number;
  instruction: string;
  /** What the reader checks the receipt against, when the step is a comparison. */
  checkList?: string[];
};

export const exerciseSteps: ExerciseStep[] = [
  { number: 1, instruction: "Read the context packet." },
  { number: 2, instruction: "Optionally paste it into a currently approved AI service." },
  { number: 3, instruction: "Compare the receipt with the packet." },
  {
    number: 4,
    instruction: "Check whether the receipt accurately names:",
    checkList: [
      "The learning objective",
      "Both permitted sources",
      "The prohibition on outside authority",
      "The independent first attempt",
      "The formative status",
      "The 20-minute limit",
      "The accessible non-AI alternative",
      "The source-location requirement",
      "The instruction not to treat the AI brief as an answer key",
    ],
  },
  { number: 5, instruction: "Correct anything missing, overstated, or invented." },
  { number: 6, instruction: "Confirm the corrected receipt before asking for the exercise." },
];

export const exerciseCopy = {
  buttonLabel: "Copy context-packet exercise",
  itemLabel: "Context-packet exercise",
};

/**
 * The answer key. Stable, and deliberately symmetrical: both outcomes are written
 * up as the exercise working, because the value is the checkpoint rather than the
 * model's performance.
 */
export const exerciseAnswerKey = {
  summary: "Check the context receipt",
  usableHeading: "What a usable receipt does",
  usableBody:
    "A usable receipt should accurately identify the task, learning objective, audience, output, decisions, and all binding constraints.",
  inspectionBody:
    "It should also state that it cannot inspect the judicial opinion or course policy unless those sources were actually supplied, attached, selected, or retrieved.",
  correctionHeading: "The receipt needs correction when it:",
  correctionSigns: [
    "Claims access to a source that was not supplied",
    "Omits the prohibition on outside authority",
    "Omits the independent first attempt",
    "Changes the activity from formative to graded",
    "Drops the accessibility alternative",
    "Treats the generated brief as an answer key",
    "Invents a course policy or legal rule",
    "Substitutes a different output",
  ],
  completeOutcome:
    "If the receipt captures everything correctly, the exercise still worked. You created a visible checkpoint before the consequential drafting step.",
  incompleteOutcome:
    "If the receipt misses something, the exercise also worked. You found the gap while it was still easy to correct.",
  closing:
    "The receipt is not proof of the product's complete internal context. It is a shared working brief that you can compare with the authoritative record.",
};

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Every constraint the answer key asks a reader to look for must be in the packet. */
const PACKET_REQUIRED = [
  "FACULTY TASK",
  "LEARNING OBJECTIVE",
  "AUTHORITATIVE MATERIAL",
  "DECISIONS ALREADY MADE",
  "BINDING CONSTRAINTS",
  "OUTPUT",
  "CONTEXT RECEIPT",
];

export type ExerciseValidation = { errors: string[]; warnings: string[] };

export function validateContextReceiptExercise(): ExerciseValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const e = contextReceiptExercise;
  for (const field of ["title", "intro", "scenarioLabel", "timeLabel"] as const) {
    if (!e[field]) errors.push(`missing ${field}`);
  }
  if (!ISO_DATE.test(e.reviewedOn)) errors.push("reviewedOn is not a valid ISO date");
  if (!e.fictional) errors.push("the scenario must be fictional");
  if (!e.publicLowRisk) errors.push("the scenario must be public and low risk");
  if (!e.liveRunOptional) {
    errors.push(
      "running a live model must remain optional — reading the packet and comparing it has to be " +
        "enough to complete the exercise",
    );
  }
  if (!/\bfiction(al)?\b/i.test(e.scenarioLabel) || !/\bpublic\b/i.test(e.scenarioLabel)) {
    errors.push("the scenario label must say the scenario is public and fictional");
  }
  // The symmetry is the point: the intro must promise both outcomes teach.
  if (!/\bwhether the system captures every detail or misses one\b/i.test(e.intro)) {
    errors.push(
      "the intro must state that the exercise succeeds either way. An exercise that only works when " +
        "the system omits something depends on behavior nobody controls.",
    );
  }

  // The packet.
  for (const section of PACKET_REQUIRED) {
    if (!contextPacket.includes(section)) {
      errors.push(`the context packet is missing its ${section} section`);
    }
  }
  for (const [needle, why] of [
    ["Do not introduce outside legal authority", "the prohibition on outside authority"],
    ["independently before using AI", "the independent first attempt"],
    ["formative rather than graded", "the formative status"],
    ["20 minutes", "the class-time limit"],
    ["accessible non-AI alternative", "the accessibility alternative"],
    ["supporting page or paragraph", "the source-location requirement"],
    ["Do not describe the AI brief as an answer key", "the answer-key prohibition"],
    ["Wait for confirmation before drafting", "the instruction to stop before drafting"],
    [
      "Do not claim access to a source that has not actually been supplied",
      "the prohibition on claimed access",
    ],
  ] as const) {
    if (!contextPacket.includes(needle)) {
      errors.push(`the context packet no longer contains ${why} ("${needle}")`);
    }
  }
  // No real student, course, or person.
  if (/\b(Law \d{3}|Professor [A-Z]|section [A-Z]\b|my student)\b/.test(contextPacket)) {
    errors.push("the context packet appears to contain a real course, section, or person");
  }

  // The answer key must not promise the receipt proves internal state, and must
  // treat both outcomes as success.
  const key = exerciseAnswerKey;
  if (!key.summary) errors.push("the answer key needs a summary label");
  if (key.correctionSigns.length < 5) {
    errors.push("the answer key must list the signs a receipt needs correction");
  }
  if (!/\bstill worked\b/i.test(key.completeOutcome) || !/\balso worked\b/i.test(key.incompleteOutcome)) {
    errors.push(
      "the answer key must state that the exercise worked in both cases — complete and incomplete receipt",
    );
  }
  if (!/\bnot proof of the product's complete internal context\b/i.test(key.closing)) {
    errors.push(
      "the answer key's closing must deny that the receipt proves the product's internal context",
    );
  }
  if (/\b(proves|verifies|confirms) (what|which) (the )?(product|model|system) (internally )?(used|saw)\b/i.test(
    [key.usableBody, key.inspectionBody, key.completeOutcome, key.incompleteOutcome].join(" "),
  )) {
    errors.push("the answer key must not claim the receipt proves what the product internally used");
  }
  // Every check in step 4 must correspond to something the packet actually says,
  // or the exercise asks a reader to find what was never there.
  const checkStep = exerciseSteps.find((s) => s.checkList);
  if (!checkStep) {
    errors.push("no exercise step asks the reader to check the receipt against the packet");
  } else {
    if (checkStep.checkList!.length < 8) {
      errors.push("the comparison step must list the constraints to check");
    }
  }
  const runStep = exerciseSteps.find((s) => /paste it into/i.test(s.instruction));
  if (!runStep) {
    errors.push("no step offers the optional live run");
  } else if (!/\bOptionally\b/i.test(runStep.instruction)) {
    errors.push("the live-run step must be marked optional");
  }
  const numbers = exerciseSteps.map((s) => s.number);
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] !== i + 1) {
      errors.push(`exercise step numbering is not sequential at position ${i + 1}`);
      break;
    }
  }
  if (!exerciseCopy.buttonLabel || !exerciseCopy.itemLabel) {
    errors.push("the copy control needs a button label and an announcement label");
  }

  return { errors, warnings };
}

const validation = validateContextReceiptExercise();
if (validation.errors.length) {
  throw new Error(`Context-receipt exercise is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[context-receipt-exercise] ${w}`);
}

// =============================================================================
// The Case Brief Stress Test — one complete, runnable activity.
//
// The other five patterns are sketches a faculty member adapts. This one is
// written out in full so it can be assigned without inventing any missing step:
// six parts, the audit columns, the six reflection questions, a copyable prompt,
// and a sample rubric with its weights.
//
// Two properties are load-bearing and validated. The independent attempt comes
// first — Part 1 before any AI — because the comparison teaches nothing if the
// student has no prior understanding to compare against. And the prompt labels
// its own output as an unverified draft rather than an answer key, because a
// student who treats it as a key has done the opposite of the exercise.
//
// The rubric's percentages are a worked example, not a Stanford or SLS grading
// scheme, and the record says so in a field that is rendered.
// =============================================================================

export type ActivityPart = {
  number: number;
  title: string;
  /** What the student does, as prose. */
  instruction: string;
  /** Items the student produces or records at this part. */
  items?: string[];
  /** True for the part that must precede any AI use. */
  independentAttempt?: boolean;
};

export const caseBriefStressTest = {
  id: "case-brief-stress-test",
  title: "Case Brief Stress Test",
  purpose:
    "Students practice close reading, source verification, revision, and transfer while learning how AI can produce both useful structure and consequential legal errors.",
  material: "One published public opinion selected by the instructor.",
  designTime: "5 minutes to design",
  runTime: "one class or homework activity to run",
  /** The audit columns students fill in during Part 3. */
  auditColumns: [
    "The AI statement",
    "The page or paragraph checked",
    "Accurate, incomplete, unsupported, or misleading",
    "Their correction",
    "Why the difference matters",
  ],
  reflectionQuestions: [
    "What was the most consequential difference between your brief and the AI brief?",
    "How did the opinion resolve the difference?",
    "What did the AI output make easier?",
    "What part of the legal work could not responsibly be delegated?",
    "What will you do differently the next time you use AI for legal material?",
  ],
  reviewedOn: "2026-08-04",
  reviewCadence: "Review annually and when the sample rubric changes",
};

export const caseBriefParts: ActivityPart[] = [
  {
    number: 1,
    title: "Independent attempt",
    instruction: "Before using AI, students read the opinion and prepare:",
    items: [
      "Procedural posture",
      "Legally material facts",
      "Issue",
      "Holding",
      "Reasoning",
      "Rule or standard",
      "Limits or unresolved questions",
    ],
    independentAttempt: true,
  },
  {
    number: 2,
    title: "AI comparison",
    instruction: "Students use a Stanford-approved service and either:",
    items: [
      "Upload or select the public opinion in a source-grounded workspace, or",
      "Use an instructor-supplied AI brief created from the opinion",
    ],
  },
  {
    number: 3,
    title: "Source audit",
    instruction:
      "Students check every material statement in the AI brief against the opinion, recording:",
    items: caseBriefStressTest.auditColumns,
  },
  {
    number: 4,
    title: "Revision",
    instruction:
      "Students revise their own brief. They do not simply edit the AI brief.",
  },
  {
    number: 5,
    title: "Transfer",
    instruction:
      "Students apply the corrected rule to a short new hypothetical supplied by the instructor.",
  },
  {
    number: 6,
    title: "Reflection",
    instruction: "Students answer:",
    items: caseBriefStressTest.reflectionQuestions,
  },
];

/**
 * The copyable prompt. It works only from a supplied opinion, requires pinpoint
 * references, forbids outside authority, and labels itself as an unverified draft.
 */
export const caseBriefPrompt = `Work only from the judicial opinion supplied in this conversation.

Create a provisional case brief with these headings:

1. Court and date
2. Procedural posture
3. Legally material facts
4. Issue
5. Holding
6. Reasoning
7. Rule or standard
8. Limits, qualifications, or unresolved questions

For every material statement:

- Cite the page, paragraph, or section of the supplied opinion.
- Distinguish the court's analysis from party arguments, procedural history, concurrences, dissents, syllabi, or editorial material.
- Do not add outside facts or legal authorities.
- Mark any uncertain characterization "CHECK SOURCE."

This is an unverified draft for a student source-audit exercise. It is not an answer key.`;

// -----------------------------------------------------------------------------
// Sample rubric. Percentages are an example, and the disclaimer is a rendered
// field rather than a comment so it cannot be dropped by a template change.
// -----------------------------------------------------------------------------

export type RubricCriterion = {
  id: string;
  title: string;
  suggestedWeight: number;
  looksFor: string;
  displayOrder: number;
};

export const rubricCriteria: RubricCriterion[] = [
  {
    id: "independent-analysis",
    title: "Independent legal analysis",
    suggestedWeight: 25,
    looksFor: "A serious initial brief grounded in the student’s reading of the opinion.",
    displayOrder: 1,
  },
  {
    id: "source-audit",
    title: "Source audit",
    suggestedWeight: 30,
    looksFor:
      "Accurate source locations, identification of consequential errors or omissions, and appropriate corrections.",
    displayOrder: 2,
  },
  {
    id: "reasoned-revision",
    title: "Reasoned revision",
    suggestedWeight: 20,
    looksFor:
      "Changes justified by the opinion rather than by preference or surface style.",
    displayOrder: 3,
  },
  {
    id: "transfer",
    title: "Transfer to new facts",
    suggestedWeight: 15,
    looksFor: "Application of the corrected legal reasoning to the new hypothetical.",
    displayOrder: 4,
  },
  {
    id: "reflection-disclosure",
    title: "AI-use reflection and disclosure",
    suggestedWeight: 10,
    looksFor:
      "Specific explanation of the tool’s contribution, limitations, and the judgment retained by the student.",
    displayOrder: 5,
  },
];

export const rubricDisclaimer =
  "These percentages are an example, not a required Stanford or SLS grading scheme. Faculty should align the rubric with the course’s own learning objectives.";

export function orderedRubricCriteria(): RubricCriterion[] {
  return [...rubricCriteria].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type CaseBriefValidation = { errors: string[]; warnings: string[] };

export function validateCaseBriefActivity(): CaseBriefValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const a = caseBriefStressTest;
  if (!a.title) errors.push("missing title");
  if (!a.purpose) errors.push("missing purpose");
  if (!a.material) errors.push("missing material");
  if (!ISO_DATE.test(a.reviewedOn)) errors.push("reviewedOn is not a valid ISO date");
  if (a.auditColumns.length < 4) errors.push("the source audit needs at least four columns");
  if (a.reflectionQuestions.length < 4) errors.push("needs at least four reflection questions");

  // Six parts, numbered, and the independent attempt must come first.
  if (caseBriefParts.length !== 6) {
    errors.push(`expected six parts, found ${caseBriefParts.length}`);
  }
  const numbers = caseBriefParts.map((p) => p.number);
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] !== i + 1) {
      errors.push(`part numbering is not sequential at position ${i + 1}`);
      break;
    }
  }
  for (const p of caseBriefParts) {
    if (!p.title) errors.push(`part ${p.number}: missing title`);
    if (!p.instruction) errors.push(`part ${p.number}: missing instruction`);
  }
  const independent = caseBriefParts.find((p) => p.independentAttempt);
  if (!independent) {
    errors.push("no part is marked as the independent attempt");
  } else if (independent.number !== 1) {
    errors.push(
      `the independent attempt is part ${independent.number}; it must come first, before any AI use`,
    );
  } else if (!/before using AI/i.test(independent.instruction)) {
    errors.push('part 1 must say the work happens "before using AI"');
  }
  // Revision must be the student's own brief, not an edit of the generated one.
  const revision = caseBriefParts.find((p) => p.title === "Revision");
  if (revision && !/do not simply edit/i.test(revision.instruction)) {
    errors.push("the revision part must say students revise their own brief rather than editing the AI brief");
  }
  // Transfer and reflection must both survive; without them the activity is a
  // proofreading exercise.
  for (const title of ["Transfer", "Reflection", "Source audit"]) {
    if (!caseBriefParts.some((p) => p.title === title)) {
      errors.push(`missing the "${title}" part`);
    }
  }

  // The prompt.
  if (!/^Work only from the judicial opinion supplied/m.test(caseBriefPrompt)) {
    errors.push("the prompt must restrict the system to the supplied opinion");
  }
  if (!/not an answer key/i.test(caseBriefPrompt)) {
    errors.push("the prompt must label its output as an unverified draft, not an answer key");
  }
  if (!/unverified draft/i.test(caseBriefPrompt)) {
    errors.push('the prompt must contain the words "unverified draft"');
  }
  if (!/Cite the page, paragraph, or section/i.test(caseBriefPrompt)) {
    errors.push("the prompt must require pinpoint references");
  }
  if (!/Do not add outside facts or legal authorities/i.test(caseBriefPrompt)) {
    errors.push("the prompt must forbid outside facts and authorities");
  }
  if (!/CHECK SOURCE/.test(caseBriefPrompt)) {
    errors.push("the prompt must require uncertain characterizations to be flagged");
  }

  // The rubric.
  if (rubricCriteria.length !== 5) {
    errors.push(`sample rubric: expected five criteria, found ${rubricCriteria.length}`);
  }
  const total = rubricCriteria.reduce((sum, c) => sum + c.suggestedWeight, 0);
  if (total !== 100) {
    errors.push(`sample rubric weights total ${total}%, not 100%`);
  }
  const rubricOrders = new Set<number>();
  for (const c of rubricCriteria) {
    if (rubricOrders.has(c.displayOrder)) errors.push(`rubric ${c.id}: duplicate displayOrder`);
    rubricOrders.add(c.displayOrder);
    if (!c.looksFor) errors.push(`rubric ${c.id}: missing looksFor`);
    if (c.suggestedWeight <= 0) errors.push(`rubric ${c.id}: weight must be positive`);
    // The rubric exists to grade reasoning, so a criterion rewarding prose
    // quality alone would defeat it.
    if (/\b(polish|polished|fluency|eloquen)/i.test(c.looksFor)) {
      errors.push(`rubric ${c.id}: must not reward generated polish`);
    }
  }
  // Verification and independent analysis must together outweigh everything else,
  // or the rubric does not put the learning where the guide says it is.
  const verificationWeight =
    (rubricCriteria.find((c) => c.id === "source-audit")?.suggestedWeight ?? 0) +
    (rubricCriteria.find((c) => c.id === "independent-analysis")?.suggestedWeight ?? 0);
  if (verificationWeight < 50) {
    errors.push(
      `independent analysis and source audit together carry ${verificationWeight}%; the rubric must weight the student's own legal work at 50% or more`,
    );
  }
  if (!rubricDisclaimer) {
    errors.push("missing the rubric disclaimer");
  } else if (!/not a required Stanford or SLS grading scheme/i.test(rubricDisclaimer)) {
    errors.push("the rubric disclaimer must say the weights are not a required Stanford or SLS scheme");
  }

  return { errors, warnings };
}

const validation = validateCaseBriefActivity();
if (validation.errors.length) {
  throw new Error(`Case Brief Stress Test is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[case-brief-stress-test] ${w}`);
}

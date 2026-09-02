// =============================================================================
// Designing AI-supported legal learning — the five design checks and the five
// assignment modes.
//
// The order matters and is enforced: naming the legal capability comes before
// choosing a tool. An assignment designed the other way round — "how can I use
// ChatGPT here?" — is the failure mode this framework exists to prevent, so the
// validator rejects a first check that starts from the tool.
//
// Each check carries a strong AND a weak example, because the weak one is what
// most people would otherwise write. The pair is load-bearing: the validator
// rejects a record where they are missing or identical, and the renderer labels
// both in text rather than distinguishing them by colour.
//
// The five modes exist so a course does not need one AI rule for every
// assignment. Each carries starter policy language a faculty member can adapt —
// starter wording, not a generated policy: nothing here calls a model.
// =============================================================================

export type DesignCheckId =
  | "name-the-skill"
  | "bound-the-ai-role"
  | "control-the-sources"
  | "make-student-work-visible"
  | "require-reflection-and-transfer";

export type DesignCheck = {
  id: DesignCheckId;
  number: number;
  title: string;
  designQuestion: string;
  purpose: string;
  strongExample: string;
  weakExample: string;
  evidenceOfLearning: string;
  displayOrder: number;
};

export const designChecks: DesignCheck[] = [
  {
    id: "name-the-skill",
    number: 1,
    title: "Name the skill",
    designQuestion: "What legal capability must the student personally demonstrate?",
    purpose:
      "Protect the central learning objective before deciding whether AI belongs in the activity.",
    strongExample:
      "Students must identify the holding, explain the reasoning, and distinguish a new hypothetical from the facts of the assigned case.",
    weakExample: "Students must produce a polished case brief.",
    evidenceOfLearning:
      "The student’s explanation, source references, distinctions, and application to new facts.",
    displayOrder: 1,
  },
  {
    id: "bound-the-ai-role",
    number: 2,
    title: "Bound the AI role",
    designQuestion: "What narrow job may the AI perform?",
    purpose:
      "Use AI for generation, rehearsal, simulation, feedback, comparison, or transformation without assigning it the entire legal task.",
    strongExample:
      "Generate three possible counterarguments after the student has built an initial argument map.",
    weakExample: "Research the issue and write the student’s argument.",
    evidenceOfLearning:
      "The student identifies which AI suggestions are useful, unsupported, or irrelevant and explains why.",
    displayOrder: 2,
  },
  {
    id: "control-the-sources",
    number: 3,
    title: "Control the sources",
    designQuestion:
      "What material may the system use, and what must the student open and verify?",
    purpose: "Keep authority, data boundaries, and source provenance visible.",
    strongExample:
      "Use a public opinion supplied by the instructor; require paragraph or page references for every characterization.",
    weakExample:
      "Ask an ungrounded chatbot to identify the governing law and accept the result.",
    evidenceOfLearning:
      "A source audit showing where each legal claim comes from and whether the source supports it.",
    displayOrder: 3,
  },
  {
    id: "make-student-work-visible",
    number: 4,
    title: "Make the student’s work visible",
    designQuestion: "What must the student add that the system cannot supply on its own?",
    purpose: "Assess reasoning and learning rather than the polish of a generated product.",
    strongExample:
      "Require an independent attempt, an AI-output audit, a revised product, and a short explanation of the revisions.",
    weakExample:
      "Grade only the final prose without knowing what work the student performed.",
    evidenceOfLearning:
      "Initial work, annotations, source checks, revision rationale, oral explanation, or transfer to a new problem.",
    displayOrder: 4,
  },
  {
    id: "require-reflection-and-transfer",
    number: 5,
    title: "Require reflection and transfer",
    designQuestion: "What will students learn about both the law and the tool?",
    purpose: "Move beyond completing one task toward reusable legal and AI judgment.",
    strongExample:
      "Students explain the most consequential AI error, how they detected it, and how the lesson changes their approach to a new problem.",
    weakExample: "Students state only that the tool was “helpful” or “not helpful.”",
    evidenceOfLearning:
      "Specific reflection tied to legal reasoning, sources, limitations, and a new application.",
    displayOrder: 5,
  },
];

export function orderedDesignChecks(): DesignCheck[] {
  return [...designChecks].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// Assignment modes. Not a hierarchy: different assignments in the same course may
// use different modes, which is the point.
// -----------------------------------------------------------------------------

export type AssignmentModeId =
  | "independent-mastery"
  | "ai-after-first-attempt"
  | "ai-as-object-of-critique"
  | "ai-as-practice-partner"
  | "ai-integrated-workflow";

export type AssignmentMode = {
  id: AssignmentModeId;
  title: string;
  description: string;
  bestWhen: string;
  studentResponsibility: string;
  example: string;
  /** Adaptable wording for a syllabus or assignment sheet, not a generated policy. */
  policyLanguageStarter: string;
  displayOrder: number;
};

export const assignmentModes: AssignmentMode[] = [
  {
    id: "independent-mastery",
    title: "Independent mastery",
    description:
      "Students complete the task without generative AI because the unaided performance is itself the learning objective.",
    bestWhen:
      "Students are building a foundational capability that later AI-supported work depends on.",
    studentResponsibility: "Perform and document the work independently.",
    example:
      "An in-class case-reading exercise, closed research quiz, initial issue-spotting attempt, or oral explanation.",
    policyLanguageStarter:
      "Do not use generative AI for this activity. The purpose is to practice and demonstrate the named capability independently.",
    displayOrder: 1,
  },
  {
    id: "ai-after-first-attempt",
    title: "AI after the first attempt",
    description:
      "Students first perform the legal task independently, then use AI for comparison, feedback, or additional practice.",
    bestWhen:
      "Faculty want to preserve productive legal reasoning while giving students experience evaluating AI assistance.",
    studentResponsibility:
      "Submit or retain the initial attempt and explain how the AI interaction changed the work.",
    example: "Draft a case brief first, then compare it with an AI-generated brief.",
    policyLanguageStarter:
      "Complete your initial analysis before using AI. Preserve both versions and explain every material revision.",
    displayOrder: 2,
  },
  {
    id: "ai-as-object-of-critique",
    title: "AI as the object of critique",
    description:
      "The AI output is course material that students analyze, verify, correct, or improve.",
    bestWhen:
      "The learning objective includes source checking, professional judgment, rhetorical analysis, bias analysis, or tool evaluation.",
    studentResponsibility:
      "Treat the output as an unverified artifact rather than an answer key.",
    example:
      "Audit a generated legal claim, brief, client explanation, or proposed clause.",
    policyLanguageStarter:
      "You may use the assigned AI output only as material to analyze. Verify every legal or factual claim independently.",
    displayOrder: 3,
  },
  {
    id: "ai-as-practice-partner",
    title: "AI as a practice partner",
    description:
      "Students use AI for repeated rehearsal, questioning, simulation, or formative feedback.",
    bestWhen:
      "The task benefits from multiple low-stakes attempts and immediate opportunities to revise.",
    studentResponsibility:
      "Prepare independently, evaluate the generated interaction, and retain faculty or expert review for consequential feedback.",
    example:
      "Practice answering skeptical judicial questions or interviewing a synthetic client.",
    policyLanguageStarter:
      "AI may be used for rehearsal under the supplied scenario and prompt. Its feedback is formative and does not replace source or faculty review.",
    displayOrder: 4,
  },
  {
    id: "ai-integrated-workflow",
    title: "AI-integrated legal workflow",
    description:
      "Students deliberately use an approved AI tool within a research, drafting, analysis, or project workflow.",
    bestWhen: "Learning responsible professional use is itself an explicit course objective.",
    studentResponsibility:
      "Choose the approved tool and source mode, protect data, disclose use, verify sources, and explain the human decisions.",
    example:
      "Compare AI-assisted and traditional research paths or use AI within a public or synthetic drafting project.",
    policyLanguageStarter:
      "AI use is permitted for the specified workflow under the stated tool, source, data, disclosure, and verification requirements.",
    displayOrder: 5,
  },
];

export function orderedAssignmentModes(): AssignmentMode[] {
  return [...assignmentModes].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// The five pre-launch questions.
// -----------------------------------------------------------------------------

export type LaunchCheck = { label: string; question: string };

export const launchChecks: LaunchCheck[] = [
  {
    label: "Learning",
    question:
      "What legal capability will students practice more deeply because AI is present?",
  },
  {
    label: "Boundary",
    question:
      "What must students do independently, what may AI do, and what is prohibited?",
  },
  {
    label: "Sources and data",
    question:
      "Which sources may the system use, what must students verify, and what material must remain outside the service?",
  },
  {
    label: "Evidence",
    question:
      "What student-created evidence will show the reasoning, checking, revision, and transfer?",
  },
  {
    label: "Access and alternatives",
    question:
      "Do all students have an approved, accessible route and a meaningful equivalent alternative?",
  },
];

// -----------------------------------------------------------------------------
// AI literacy, taught through the legal task rather than beside it.
// -----------------------------------------------------------------------------

export type LiteracyCard = { id: string; title: string; text: string };

export const literacyCards: LiteracyCard[] = [
  {
    id: "functional",
    title: "Functional judgment",
    text: "Students learn which source mode and approved service fit the task, what the system can access, and what its output does not establish.",
  },
  {
    id: "source",
    title: "Source judgment",
    text: "Students retrieve authority, inspect passages, distinguish source content from generated synthesis, and check currentness.",
  },
  {
    id: "rhetorical",
    title: "Rhetorical judgment",
    text: "Students learn how prompts frame the job, how generated language can overstate or smooth uncertainty, and how to revise with purpose.",
  },
  {
    id: "ethical",
    title: "Ethical and professional judgment",
    text: "Students practice disclosure, privacy, confidentiality, attribution, accessibility, appropriate reliance, and accountability for the final work.",
  },
];

/** Process evidence that is proportionate, and the things never to ask for. */
export const proportionateEvidence: string[] = [
  "An independent first attempt",
  "A prompt supplied by the instructor",
  "The relevant AI output",
  "A source-verification table",
  "A revision with reasons",
  "A short reflection",
  "An oral explanation used consistently for the class",
  "Application to a new problem",
];

export const neverAskFor: string[] = [
  "Account passwords",
  "Unrestricted chat history",
  "Unrelated browser history",
  "Complete device access",
  "Private conversations unrelated to the assignment",
  "Disability or medical information",
  "Hidden monitoring of student activity",
];

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const REQUIRED_CHECK_IDS: DesignCheckId[] = [
  "name-the-skill",
  "bound-the-ai-role",
  "control-the-sources",
  "make-student-work-visible",
  "require-reflection-and-transfer",
];

const REQUIRED_MODE_IDS: AssignmentModeId[] = [
  "independent-mastery",
  "ai-after-first-attempt",
  "ai-as-object-of-critique",
  "ai-as-practice-partner",
  "ai-integrated-workflow",
];

export type DesignValidation = { errors: string[]; warnings: string[] };

export function validateLearningDesign(): DesignValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // --- design checks -----------------------------------------------------
  if (designChecks.length !== 5) {
    errors.push(`design checks: expected exactly five, found ${designChecks.length}`);
  }
  for (const id of REQUIRED_CHECK_IDS) {
    if (!designChecks.some((c) => c.id === id)) {
      errors.push(`design checks: missing required check "${id}"`);
    }
  }
  const checkOrders = new Set<number>();
  for (const c of designChecks) {
    if (checkOrders.has(c.displayOrder)) errors.push(`design check ${c.id}: duplicate displayOrder`);
    checkOrders.add(c.displayOrder);
    if (c.number !== c.displayOrder) {
      errors.push(`design check ${c.id}: number and displayOrder disagree`);
    }
    for (const [field, value] of Object.entries({
      designQuestion: c.designQuestion,
      purpose: c.purpose,
      strongExample: c.strongExample,
      weakExample: c.weakExample,
      evidenceOfLearning: c.evidenceOfLearning,
    })) {
      if (!value) errors.push(`design check ${c.id}: missing ${field}`);
    }
    // The contrast is the teaching. Identical examples teach nothing.
    if (c.strongExample && c.strongExample === c.weakExample) {
      errors.push(`design check ${c.id}: the strong and weak examples are identical`);
    }
  }
  // The order is the argument: the legal capability is named before a tool is chosen.
  const ordered = orderedDesignChecks();
  if (ordered[0]?.id !== "name-the-skill") {
    errors.push(
      'design checks: the first check must be "name-the-skill" — the legal capability comes before the tool',
    );
  }
  if (ordered[1]?.id !== "bound-the-ai-role") {
    errors.push('design checks: the second check must bound the AI role');
  }
  const toolFirst = /^(how can i use|which tool|what tool|pick a tool)/i;
  if (toolFirst.test(ordered[0]?.designQuestion ?? "")) {
    errors.push("design checks: the first design question must not start from the tool");
  }

  // --- assignment modes --------------------------------------------------
  if (assignmentModes.length !== 5) {
    errors.push(`assignment modes: expected exactly five, found ${assignmentModes.length}`);
  }
  for (const id of REQUIRED_MODE_IDS) {
    if (!assignmentModes.some((m) => m.id === id)) {
      errors.push(`assignment modes: missing required mode "${id}"`);
    }
  }
  const modeOrders = new Set<number>();
  for (const m of assignmentModes) {
    if (modeOrders.has(m.displayOrder)) errors.push(`mode ${m.id}: duplicate displayOrder`);
    modeOrders.add(m.displayOrder);
    for (const [field, value] of Object.entries({
      description: m.description,
      bestWhen: m.bestWhen,
      studentResponsibility: m.studentResponsibility,
      example: m.example,
      policyLanguageStarter: m.policyLanguageStarter,
    })) {
      if (!value) errors.push(`mode ${m.id}: missing ${field}`);
    }
    // A mode is a per-assignment choice, not a course-wide rule.
    if (/\b(all|every) (assignment|course|class)\b/i.test(m.description + m.bestWhen)) {
      errors.push(
        `mode ${m.id}: must not be described as applying to every assignment or the whole course`,
      );
    }
  }
  // One mode must preserve unaided work, and one must treat output as material
  // rather than as an answer.
  const independent = assignmentModes.find((m) => m.id === "independent-mastery");
  if (independent && !/without generative AI/i.test(independent.description)) {
    errors.push('mode independent-mastery: must state that the task is completed without generative AI');
  }
  const critique = assignmentModes.find((m) => m.id === "ai-as-object-of-critique");
  if (critique && !/unverified/i.test(critique.studentResponsibility)) {
    errors.push('mode ai-as-object-of-critique: must say the output is an unverified artifact');
  }
  const partner = assignmentModes.find((m) => m.id === "ai-as-practice-partner");
  if (partner && !/(faculty|expert) review/i.test(partner.studentResponsibility)) {
    errors.push('mode ai-as-practice-partner: must retain faculty or expert review for consequential feedback');
  }

  // --- launch checks and literacy ----------------------------------------
  if (launchChecks.length !== 5) {
    errors.push(`launch checks: expected exactly five, found ${launchChecks.length}`);
  }
  for (const l of launchChecks) {
    if (!l.question.trim().endsWith("?")) {
      errors.push(`launch check "${l.label}": must be phrased as a question`);
    }
  }
  if (literacyCards.length !== 4) {
    errors.push(`AI literacy: expected four kinds of judgment, found ${literacyCards.length}`);
  }
  for (const id of ["functional", "source", "rhetorical", "ethical"]) {
    if (!literacyCards.some((c) => c.id === id)) {
      errors.push(`AI literacy: missing the "${id}" card`);
    }
  }

  // --- process evidence --------------------------------------------------
  if (!proportionateEvidence.length) errors.push("missing the proportionate-evidence list");
  if (!neverAskFor.length) errors.push("missing the never-ask-for list");
  for (const item of proportionateEvidence) {
    if (/\b(all|every|complete|entire)\b/i.test(item)) {
      errors.push(`process evidence "${item}" asks for everything; the list must stay proportionate`);
    }
  }
  for (const required of ["password", "chat history", "device", "medical"]) {
    if (!neverAskFor.some((n) => new RegExp(required, "i").test(n))) {
      errors.push(`the never-ask-for list must rule out ${required}`);
    }
  }

  return { errors, warnings };
}

const validation = validateLearningDesign();
if (validation.errors.length) {
  throw new Error(`Student AI learning design is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[student-ai-learning-design] ${w}`);
}

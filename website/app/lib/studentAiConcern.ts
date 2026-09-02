// =============================================================================
// Responding to a suspected unpermitted student AI use — the durable content.
//
// Everything here is meant to outlive a policy revision: the order of the six
// steps, the seven evidence categories, the checklist of materials to collect,
// and a practice scenario with a fixed answer. The time-sensitive material lives
// in three separate dated records — app/lib/stanfordStudentAiProcess.ts,
// app/lib/slsStudentAiPolicy.ts, and app/lib/aiDetectionGuidance.ts — so a
// changed deadline or a confirmed local policy is one edit in one place.
//
// The workflow deliberately does NOT begin with a detector, and the graded-work
// route deliberately puts the Office of Community Standards before any
// conversation with the student. Both are load-bearing, so the validator fails
// the build if either is reordered, and `npm run lint` fails on the phrasings
// that would undo them in prose.
//
// Nothing here decides whether a student violated the Honor Code. The categories
// separate a rule from a fact from a signal from an inference from an unknown;
// that separation is the whole product.
// =============================================================================

/** Which path a step belongs to. Graded work must route through OCS. */
export type ConcernRoute = "graded-and-ungraded" | "graded-work" | "ocs-directed-or-ungraded";

export type ConcernStepId =
  | "pause-conclusion"
  | "anchor-policy"
  | "preserve-artifacts"
  | "separate-evidence-signals"
  | "consult-ocs"
  | "respond-fairly";

export type ConcernStep = {
  id: ConcernStepId;
  number: number;
  title: string;
  shortInstruction: string;
  explanation: string;
  actions: string[];
  doNot: string[];
  evidenceCreated: string;
  route: ConcernRoute;
  displayOrder: number;
};

export const concernSteps: ConcernStep[] = [
  {
    id: "pause-conclusion",
    number: 1,
    title: "Pause the conclusion",
    shortInstruction: "Treat what you noticed as a concern, not a finding.",
    explanation:
      "A style change, citation problem, missing disclosure, or detector result may justify closer review. None, by itself, establishes what tool was used, what the student did with it, or whether the use violated the assignment rules.",
    actions: [
      "Preserve the original submission.",
      "Write down what prompted the concern in neutral, observable language.",
      "Separate what you saw from what you inferred.",
      "Continue ordinary recordkeeping for the assignment.",
      "Avoid communicating a conclusion before consulting the applicable process.",
    ],
    doNot: [
      "Label the work “AI-written” as a fact.",
      "Enter a punitive grade.",
      "Annotate the student-facing submission with an accusation.",
      "Run informal experiments intended to prove authorship.",
      "Ask colleagues to vote on whether the prose sounds generated.",
    ],
    evidenceCreated: "A dated, neutral record of the initial concern.",
    route: "graded-and-ungraded",
    displayOrder: 1,
  },
  {
    id: "anchor-policy",
    number: 2,
    title: "Anchor the concern in the communicated rule",
    shortInstruction: "Collect the exact instructions that governed the work.",
    explanation:
      "The relevant boundary may appear in the assignment, exam instructions, syllabus, Canvas page, course announcement, written authorization, SLS policy, or Stanford-wide guidance.",
    actions: [
      "Save the assignment or exam instructions.",
      "Save the course AI and permitted-aid policy.",
      "Identify any required disclosure or attribution.",
      "Identify any written exception or individual authorization.",
      "Record what students were told and when.",
      "Note any ambiguity or conflict among the materials.",
    ],
    doNot: [
      "Apply a rule written after the submission.",
      "Treat an uncommunicated personal expectation as the assignment policy.",
      "Assume that every use of a named product was prohibited.",
      "Infer the current SLS policy from memory.",
    ],
    evidenceCreated: "The governing materials and the specific rule at issue.",
    route: "graded-and-ungraded",
    displayOrder: 2,
  },
  {
    id: "preserve-artifacts",
    number: 3,
    title: "Preserve the ordinary course artifacts",
    shortInstruction:
      "Keep the materials that already exist without expanding into a private investigation.",
    explanation:
      "Useful records may include the submitted work, required disclosures, cited sources, assignment metadata routinely available to the teaching team, and drafts or process records students were told in advance to retain or submit.",
    actions: [
      "Preserve the original file or submission.",
      "Preserve ordinary Canvas or assessment metadata already available.",
      "Preserve the student’s submitted AI-use statement, if any.",
      "Preserve citations or source links relevant to the concern.",
      "Preserve drafts or process artifacts already required by the assignment.",
      "Record dates and the source of each artifact.",
    ],
    doNot: [
      "Demand private account credentials.",
      "Search the student’s device.",
      "Ask the student to surrender unrelated conversations.",
      "Upload the work into an unapproved AI or detector service.",
      "Fabricate missing process evidence.",
      "Alter the original submission.",
    ],
    evidenceCreated:
      "A stable concern packet containing materials already available through the course.",
    route: "graded-and-ungraded",
    displayOrder: 3,
  },
  {
    id: "separate-evidence-signals",
    number: 4,
    title: "Separate evidence from signals",
    shortInstruction: "Classify each observation before deciding what it means.",
    explanation:
      "A missing required disclosure is an observable fact. A citation that does not support a claim is a source problem. A detector score is an automated signal. A style change is an inference. These are not interchangeable.",
    actions: [
      "Label the governing rule.",
      "Label observable artifacts and discrepancies.",
      "Label automated outputs as signals.",
      "Label stylistic judgments as inferences.",
      "List the facts that remain unknown.",
      "Avoid converting a quality problem into an authorship conclusion.",
    ],
    doNot: [
      "Treat detector output as direct proof.",
      "Treat fabricated citations as proof that a student used AI.",
      "Treat correct citations as proof that the student did not use AI.",
      "Treat writing fluency as proof of authorship.",
      "Treat difficulty explaining work as proof without context and fair process.",
    ],
    evidenceCreated:
      "A concern map that distinguishes policy, fact, signal, inference, and unknowns.",
    route: "graded-and-ungraded",
    displayOrder: 4,
  },
  {
    id: "consult-ocs",
    number: 5,
    title: "Consult the appropriate Stanford process",
    shortInstruction:
      "For graded work, contact OCS before discussing the suspicion with the student.",
    explanation:
      "The Office of Community Standards can advise on evidence, timing, communication, and whether a formal concern is appropriate. Consultation does not itself determine responsibility and does not obligate an instructor to file.",
    actions: [
      "Contact OCS for a graded-work or evaluation concern.",
      "Provide the governing materials and neutral concern record.",
      "Ask what communication with the student is appropriate.",
      "Ask what additional material, if any, should be preserved.",
      "Note the current reporting deadline.",
      "Follow any SLS-specific routing confirmed by Student Affairs.",
    ],
    doNot: [
      "Impose an academic penalty while responsibility is unresolved.",
      "Promise a student a particular outcome.",
      "Conduct a parallel disciplinary process.",
      "Announce the concern to the class.",
      "Delay until relevant evidence or memories are lost.",
    ],
    evidenceCreated: "Documented consultation and the institutionally appropriate next step.",
    route: "graded-work",
    displayOrder: 5,
  },
  {
    id: "respond-fairly",
    number: 6,
    title: "Respond through a fair process",
    shortInstruction:
      "Use neutral questions, hear the student’s account, and keep the learning goal visible.",
    explanation:
      "When OCS advises a conversation—or when the work is ungraded—ask about the student’s process without announcing a conclusion. The purpose is to understand what occurred, apply the stated rule, and preserve an educational as well as a fair response.",
    actions: [
      "State the relevant assignment rule.",
      "Explain what observable issue prompted the conversation.",
      "Ask the student to describe the process in their own words.",
      "Ask about sources, tools, assistance, and disclosures.",
      "Give the student a meaningful opportunity to explain.",
      "Follow OCS direction for any formal concern.",
      "After resolution, clarify future expectations and learning support.",
    ],
    doNot: [
      "Begin with “The detector proved you cheated.”",
      "Demand a confession.",
      "Use a surprise oral examination as a private sanction.",
      "Ask about disability, diagnosis, or language background.",
      "Treat nervousness, imperfect recall, or communication style as proof.",
      "Predetermine the outcome.",
    ],
    evidenceCreated:
      "A documented, neutral account handled through the appropriate process.",
    route: "ocs-directed-or-ungraded",
    displayOrder: 6,
  },
];

export function orderedConcernSteps(): ConcernStep[] {
  return [...concernSteps].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// The governing materials to collect. A checklist rather than prose because the
// point is to stop answering from memory.
// -----------------------------------------------------------------------------

export type GoverningMaterial = {
  id: string;
  label: string;
  question: string;
  /** Concrete instances, or the retrieval requirement where examples would mislead. */
  examples?: string;
  requirement?: string;
  displayOrder: number;
};

export const governingMaterials: GoverningMaterial[] = [
  {
    id: "assignment-instructions",
    label: "Assignment or exam instructions",
    question: "What did this particular task permit, prohibit, or require?",
    examples:
      "Brainstorming, outlining, drafting, editing, source discovery, citation checking, translation, feedback, collaboration, or complete prohibition.",
    displayOrder: 1,
  },
  {
    id: "course-policy",
    label: "Course or syllabus policy",
    question: "What course-wide AI and permitted-aid rules applied?",
    examples:
      "Disclosure, attribution, approved tools, privacy limits, prohibited uses, and consequences or process.",
    displayOrder: 2,
  },
  {
    id: "written-clarifications",
    label: "Written clarifications",
    question:
      "Did the teaching team answer questions or issue a later clarification before the work was submitted?",
    examples:
      "Canvas announcements, email guidance, class slides, office-hour follow-up, or written individual authorization.",
    displayOrder: 3,
  },
  {
    id: "sls-guidance",
    label: "Current SLS guidance",
    question: "What current Stanford Law School Student Affairs policy applies?",
    requirement:
      "Retrieve it from the official SLS source or a staff-confirmed local insert—not from memory or a third-party summary.",
    displayOrder: 4,
  },
  {
    id: "stanford-guidance",
    label: "Stanford-wide guidance",
    question:
      "What do the current Honor Code, OCS generative-AI guidance, and student accountability process require?",
    requirement:
      "Read the current pages rather than a prior year's syllabus language or a third-party summary. The Stanford process summary on this page carries its own review date.",
    displayOrder: 5,
  },
  {
    id: "accommodation",
    label: "Accommodation or approved alternative",
    question:
      "Was there an approved accommodation, alternative format, or authorized support workflow relevant to the assignment?",
    requirement:
      "Do not ask a student to disclose a diagnosis. Consult the Office of Accessible Education or the appropriate Stanford office when an accommodation question arises.",
    displayOrder: 6,
  },
];

// -----------------------------------------------------------------------------
// Evidence categories. The order is not a ranking, and no category carries a
// strength score: the point is that these answer different questions, so
// "whatItCannotEstablish" does more work here than "whatItCanEstablish".
// -----------------------------------------------------------------------------

export type EvidenceCategoryId =
  | "governing-rule"
  | "observable-artifact"
  | "content-problem"
  | "automated-signal"
  | "faculty-inference"
  | "student-account"
  | "unknown";

export type EvidenceCategory = {
  id: EvidenceCategoryId;
  label: string;
  definition: string;
  examples: string[];
  whatItCanEstablish: string;
  whatItCannotEstablish: string;
  handlingRule: string;
  displayOrder: number;
};

export const evidenceCategories: EvidenceCategory[] = [
  {
    id: "governing-rule",
    label: "Governing rule",
    definition:
      "The written policy, assignment instruction, disclosure requirement, or authorization communicated to the student.",
    examples: [
      "Syllabus policy",
      "Assignment AI boundary",
      "Exam instructions",
      "Canvas announcement",
      "Written instructor approval",
      "Required AI-use disclosure",
    ],
    whatItCanEstablish: "What aid was permitted, prohibited, or required.",
    whatItCannotEstablish: "What the student actually did.",
    handlingRule: "Preserve the exact text and date communicated.",
    displayOrder: 1,
  },
  {
    id: "observable-artifact",
    label: "Observable artifact",
    definition:
      "A document, disclosure, citation, metadata record, draft, or process artifact already available through the ordinary course workflow.",
    examples: [
      "Submitted paper",
      "Submitted AI-use statement",
      "Required draft",
      "Version record already collected",
      "Citation list",
      "Source link",
      "Canvas submission timestamp",
    ],
    whatItCanEstablish:
      "What was submitted, disclosed, cited, or preserved through the course process.",
    whatItCannotEstablish:
      "The student’s complete process or intent without further context.",
    handlingRule: "Preserve it without altering or expanding into an invasive search.",
    displayOrder: 2,
  },
  {
    id: "content-problem",
    label: "Content or source problem",
    definition: "An error or discrepancy in the work itself.",
    examples: [
      "Fabricated citation",
      "Quotation absent from the source",
      "Source does not support the proposition",
      "Factual contradiction",
      "Irrelevant authority",
      "Repeated generic language",
    ],
    whatItCanEstablish:
      "That the submitted work has a research, accuracy, attribution, or quality problem.",
    whatItCannotEstablish:
      "Who or what produced the text, or whether AI use violated the assignment.",
    handlingRule:
      "Evaluate the academic problem under the ordinary rubric while keeping any suspected dishonesty question separate and routed through OCS.",
    displayOrder: 3,
  },
  {
    id: "automated-signal",
    label: "Automated signal",
    definition:
      "A score, flag, highlighted passage, or probability produced by detection or similarity software.",
    examples: [
      "“Likely AI-generated” percentage",
      "Detector-highlighted sentences",
      "Similarity score",
      "Vendor-generated authorship indicator",
    ],
    whatItCanEstablish:
      "That a particular tool produced a particular output under its current method.",
    whatItCannotEstablish:
      "Who wrote the text, what tool was used, whether the use was permitted, the student’s intent, or an Honor Code violation.",
    handlingRule:
      "Never use it as the sole basis for a conclusion, penalty, or accusation.",
    displayOrder: 4,
  },
  {
    id: "faculty-inference",
    label: "Faculty inference",
    definition:
      "A judgment based on style, voice, vocabulary, fluency, performance history, or a perceived mismatch with prior work.",
    examples: [
      "“This does not sound like the student”",
      "Unfamiliar terminology",
      "More polished prose",
      "Different sentence structure",
      "Sudden improvement or decline",
      "Generic organization",
    ],
    whatItCanEstablish:
      "That the faculty member has a concern worth articulating in neutral terms.",
    whatItCannotEstablish:
      "AI use, misconduct, deception, authorship, disability, language background, or intent.",
    handlingRule:
      "Record the observation carefully and do not present the inference as fact.",
    displayOrder: 5,
  },
  {
    id: "student-account",
    label: "Student account and documented process",
    definition:
      "The student’s explanation and any process materials obtained through the appropriate, fair process.",
    examples: [
      "Description of research and drafting steps",
      "Explanation of permitted tool use",
      "Submitted prompt log required by the assignment",
      "Voluntarily supplied relevant records",
      "Explanation of source selection",
      "Clarification of missing disclosure",
    ],
    whatItCanEstablish:
      "Additional context about the student’s process and understanding of the rule.",
    whatItCannotEstablish:
      "Automatic responsibility or innocence without evaluating the complete record under the applicable Stanford process.",
    handlingRule:
      "Obtain and evaluate it through OCS guidance for graded work, or a fair pedagogical conversation for ungraded work.",
    displayOrder: 6,
  },
  {
    id: "unknown",
    label: "Unknown or unresolved",
    definition: "A fact that has not yet been established.",
    examples: [
      "Whether a tool was used",
      "Which feature was used",
      "What text the tool produced",
      "Whether the student understood the disclosure rule",
      "Whether an embedded AI feature was active",
      "Whether the student retained required process materials",
    ],
    whatItCanEstablish: "The boundary of current knowledge.",
    whatItCannotEstablish: "A conclusion merely because the information is missing.",
    handlingRule: "Write the unknown as a question. Do not fill it with inference.",
    displayOrder: 7,
  },
];

export function orderedEvidenceCategories(): EvidenceCategory[] {
  return [...evidenceCategories].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// The practice scenario.
//
// Entirely staff-written: no real student, course, assignment, or submission,
// and no name of any kind. Every item carries the category it belongs in, so the
// visible exercise and its answer key cannot drift apart.
// -----------------------------------------------------------------------------

export type ScenarioItem = {
  text: string;
  categoryId: EvidenceCategoryId;
  /** Why that category, for the answer key. Kept short. */
  because?: string;
};

export type ConcernScenario = {
  id: string;
  fictional: true;
  visibleScenarioLabel: string;
  /** Stated in the scenario so the reader knows which route applies. */
  workType: "graded" | "ungraded";
  situation: string[];
  task: string;
  items: ScenarioItem[];
  finalQuestion: string;
  /** Plain-text choices. Never rendered as form controls. */
  nextStepChoices: string[];
  correctNextStepIndex: number;
  answerKeyNextStep: string;
  answerKeyClosing: string;
  reviewedOn: string;
  reviewBy: string;
  staffReviewRequired: true;
};

export const concernScenario: ConcernScenario = {
  id: "seminar-disclosure-concern",
  fictional: true,
  visibleScenarioLabel: "Practice scenario — fictional student and assignment",
  workType: "graded",
  situation: [
    "A seminar assignment permits students to use AI to brainstorm possible issues and receive general feedback. It prohibits AI-generated or AI-revised submission text and requires disclosure of all non-incidental use.",
    "A student submits a paper with no AI disclosure.",
    "Two cited cases do not support the propositions attributed to them. Several paragraphs use terminology that has not appeared in the student’s earlier work. An AI detector labels 86% of the paper “likely AI-generated.”",
    "The paper is graded work.",
  ],
  task: "Sort each item into one of the categories above.",
  items: [
    {
      text:
        "The assignment permits brainstorming and feedback but prohibits generated or revised submission text.",
      categoryId: "governing-rule",
      because: "The assignment’s permitted and prohibited uses.",
    },
    {
      text: "The assignment requires disclosure of non-incidental AI use.",
      categoryId: "governing-rule",
      because: "The disclosure requirement.",
    },
    {
      text: "No disclosure was submitted.",
      categoryId: "observable-artifact",
      because: "No disclosure accompanied the submission.",
    },
    {
      text: "Two cited cases do not support the attributed propositions.",
      categoryId: "content-problem",
      because:
        "The citations do not support the attributed propositions. This matters for the paper’s quality and verification, but it does not by itself prove AI use.",
    },
    {
      text: "The terminology differs from earlier work.",
      categoryId: "faculty-inference",
      because:
        "The terminology appears different. This may prompt a question but is not proof of authorship or misconduct.",
    },
    {
      text: "The detector produced an 86% score.",
      categoryId: "automated-signal",
      because: "The detector produced a score. The score is not a finding.",
    },
    {
      text: "Whether the student used AI to draft or revise the paper.",
      categoryId: "unknown",
      because: "Whether AI drafted or revised the submission.",
    },
    {
      text:
        "Whether any AI use fell within the permitted brainstorming or feedback categories.",
      categoryId: "unknown",
      because: "Whether any AI use remained within permitted brainstorming or feedback.",
    },
  ],
  finalQuestion: "What is the next step?",
  nextStepChoices: [
    "Reduce the grade because the detector score is high.",
    "Ask the student to open their private AI account.",
    "Preserve the materials and consult OCS before discussing the concern with the student.",
    "Ask three colleagues whether the paper sounds generated.",
    "Require the student to rewrite the paper immediately.",
  ],
  correctNextStepIndex: 2,
  answerKeyNextStep:
    "Preserve the assignment, policy, submission, disclosure record, citations, and neutral concern notes. Consult OCS before discussing the graded-work suspicion with the student or changing the grade.",
  answerKeyClosing:
    "The exercise does not determine whether a violation occurred. It identifies the appropriate next process.",
  reviewedOn: "2026-08-04",
  reviewBy: "2027-08-04",
  staffReviewRequired: true,
};

/** The scenario's items grouped by category, for the answer key. */
export function scenarioItemsByCategory(): { category: EvidenceCategory; items: ScenarioItem[] }[] {
  return orderedEvidenceCategories()
    .map((category) => ({
      category,
      items: concernScenario.items.filter((i) => i.categoryId === category.id),
    }))
    .filter((g) => g.items.length > 0);
}

// -----------------------------------------------------------------------------
// Graded and ungraded paths. Two records rather than prose so the distinction
// stays symmetrical and the validator can check that only one of them names OCS
// as a precondition.
// -----------------------------------------------------------------------------

export type WorkTypePath = {
  id: "graded" | "ungraded";
  title: string;
  body: string;
  examples: string[];
  action: string;
  displayOrder: number;
};

export const workTypePaths: WorkTypePath[] = [
  {
    id: "graded",
    title: "Graded or evaluative work",
    body:
      "Preserve the materials and consult OCS before discussing the suspected violation with the student. Do not apply an academic consequence while responsibility remains unresolved.",
    examples: [
      "Graded paper",
      "Exam",
      "Research project",
      "Assignment used in evaluation",
      "Thesis or program requirement",
      "Graded participation product",
    ],
    action: "Use the Stanford process summary above.",
    displayOrder: 1,
  },
  {
    id: "ungraded",
    title: "Ungraded or formative work",
    body:
      "A direct pedagogical conversation may be appropriate. Clarify the rule, ask the student to explain the process, address research or citation problems, and identify what independent learning should happen next.",
    examples: [
      "Practice response",
      "Ungraded draft",
      "Voluntary exercise",
      "Low-stakes rehearsal not used in evaluation",
      "Informal office-hours work",
    ],
    action: "Use a learning conversation rather than a misconduct verdict.",
    displayOrder: 2,
  },
];

// -----------------------------------------------------------------------------
// The neutral conversation. Questions only — the opening explicitly states that
// no conclusion has been reached, and nothing here asks about a diagnosis, a
// password, or an unrelated account.
// -----------------------------------------------------------------------------

export const conversationOpening =
  "I want to understand the process you used for this assignment in light of its rules about AI and other assistance. I have not reached a conclusion. I would like to review how you researched, drafted, revised, and checked the work.";

export const conversationQuestions: string[] = [
  "Walk me through how you approached the assignment from the beginning.",
  "What sources, people, software, and other forms of assistance did you use?",
  "What did each source or tool contribute?",
  "How did you develop the analysis and organize the paper?",
  "How did you identify and verify the cited authorities?",
  "What did you understand the assignment’s AI-use and disclosure rules to permit?",
  "Did you use any AI or automated feature for brainstorming, feedback, drafting, revision, translation, source discovery, or citation checking?",
  "What process materials were you asked to retain or submit?",
  "Is there anything about the assignment instructions or your process that would help clarify the concern?",
];

export const conversationLimits =
  "Use only questions appropriate to the process OCS recommends. Do not ask for passwords, unrestricted account access, unrelated conversations, medical information, or a surprise performance test.";

/** What a student may need to learn, whatever the resolution turns out to be. */
export const learningFollowUps: string[] = [
  "Understanding of permitted and unpermitted aid",
  "AI-use disclosure",
  "Independent legal analysis",
  "Source retrieval and verification",
  "Citation practice",
  "Preservation of drafts or process records",
  "Judgment about when AI supports or bypasses learning",
  "Privacy and data-handling decisions",
  "Asking before using a tool when the rule is unclear",
];

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string) => ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

const REQUIRED_STEP_IDS: ConcernStepId[] = [
  "pause-conclusion",
  "anchor-policy",
  "preserve-artifacts",
  "separate-evidence-signals",
  "consult-ocs",
  "respond-fairly",
];

const REQUIRED_CATEGORY_IDS: EvidenceCategoryId[] = [
  "governing-rule",
  "observable-artifact",
  "content-problem",
  "automated-signal",
  "faculty-inference",
  "student-account",
  "unknown",
];

export type ConcernValidation = { errors: string[]; warnings: string[] };

export function validateStudentAiConcern(
  today = new Date().toISOString().slice(0, 10),
): ConcernValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // --- the workflow ------------------------------------------------------
  if (concernSteps.length !== 6) {
    errors.push(`workflow: expected exactly six core steps, found ${concernSteps.length}`);
  }
  for (const id of REQUIRED_STEP_IDS) {
    if (!concernSteps.some((s) => s.id === id)) errors.push(`workflow: missing required step "${id}"`);
  }
  const stepOrders = new Set<number>();
  for (const s of concernSteps) {
    if (stepOrders.has(s.displayOrder)) errors.push(`step ${s.id}: duplicate displayOrder`);
    stepOrders.add(s.displayOrder);
    if (!s.shortInstruction) errors.push(`step ${s.id}: missing shortInstruction`);
    if (!s.explanation) errors.push(`step ${s.id}: missing explanation`);
    if (!s.actions.length) errors.push(`step ${s.id}: needs at least one action`);
    if (!s.doNot.length) errors.push(`step ${s.id}: needs a "do not" list`);
    if (!s.evidenceCreated) errors.push(`step ${s.id}: missing evidenceCreated`);
    if (!s.route) errors.push(`step ${s.id}: missing route`);
    if (s.number !== s.displayOrder) {
      errors.push(`step ${s.id}: number (${s.number}) and displayOrder (${s.displayOrder}) disagree`);
    }
  }

  // The order carries the argument. A detector-first workflow, or one that
  // reaches a conclusion before the rule is known, is the failure this page
  // exists to prevent — so it is a build error, not a style note.
  const ordered = orderedConcernSteps();
  if (ordered[0]?.id !== "pause-conclusion") {
    errors.push('workflow: the first step must be "pause-conclusion" — never begin with a detector');
  }
  if (ordered[1]?.id !== "anchor-policy") {
    errors.push('workflow: the second step must anchor the concern in the communicated rule');
  }
  const detectorFirst = /\b(detector|detection tool|AI checker|similarity score)\b/i;
  for (const s of ordered.slice(0, 2)) {
    if (detectorFirst.test(s.shortInstruction)) {
      errors.push(`step ${s.id}: an early step must not instruct faculty to run a detector`);
    }
  }

  // The graded route must go through OCS, and must not send faculty to the
  // student first.
  const consult = concernSteps.find((s) => s.id === "consult-ocs");
  if (!consult) {
    errors.push("workflow: the graded-work route must include an OCS consultation step");
  } else {
    if (consult.route !== "graded-work") {
      errors.push('step consult-ocs: route must be "graded-work"');
    }
    if (!/OCS|Community Standards/i.test(consult.shortInstruction + consult.explanation)) {
      errors.push("step consult-ocs: must name the Office of Community Standards");
    }
    if (!/before/i.test(consult.shortInstruction)) {
      errors.push(
        "step consult-ocs: the instruction must say OCS comes BEFORE discussing the suspicion with the student",
      );
    }
    const fairness = concernSteps.find((s) => s.id === "respond-fairly");
    if (fairness && fairness.displayOrder < consult.displayOrder) {
      errors.push("workflow: the student conversation must not be ordered before the OCS consultation");
    }
  }

  // No step may authorise a suspicion-based grade consequence or an invasive search.
  const penaltyGrading = /\b(lower the grade|reduce the grade|enter a failing grade|give a zero|fail the assignment)\b/i;
  const invasive = /\b(password|unlock (the|their) device|search the student’s device|browser history)\b/i;
  for (const s of concernSteps) {
    for (const action of s.actions) {
      if (penaltyGrading.test(action)) {
        errors.push(`step ${s.id}: an action must never impose a suspicion-based grade consequence`);
      }
      if (invasive.test(action)) {
        errors.push(`step ${s.id}: an action must never require credentials, a device, or browsing history`);
      }
      if (/\bdetector\b/i.test(action) && !/not|never|unapproved/i.test(action)) {
        errors.push(`step ${s.id}: an action must not direct faculty to run a detector`);
      }
    }
  }
  // "AI was involved" is not the question. Nothing may equate the two.
  const equatesUse = /\bAI use is (an|a) (Honor Code violation|violation|misconduct)\b/i;
  for (const s of concernSteps) {
    if (equatesUse.test(s.explanation)) {
      errors.push(`step ${s.id}: must not treat AI involvement as misconduct automatically`);
    }
  }

  // --- governing materials ----------------------------------------------
  const materialOrders = new Set<number>();
  for (const m of governingMaterials) {
    if (materialOrders.has(m.displayOrder)) errors.push(`material ${m.id}: duplicate displayOrder`);
    materialOrders.add(m.displayOrder);
    if (!m.question) errors.push(`material ${m.id}: missing question`);
    if (!m.examples && !m.requirement) {
      errors.push(`material ${m.id}: needs either examples or a retrieval requirement`);
    }
  }
  const accommodation = governingMaterials.find((m) => m.id === "accommodation");
  if (accommodation && !/do not ask/i.test(accommodation.requirement ?? "")) {
    errors.push(
      "material accommodation: must tell faculty not to ask a student to disclose a diagnosis",
    );
  }

  // --- evidence categories ----------------------------------------------
  if (evidenceCategories.length !== 7) {
    errors.push(`evidence categories: expected exactly seven, found ${evidenceCategories.length}`);
  }
  for (const id of REQUIRED_CATEGORY_IDS) {
    if (!evidenceCategories.some((c) => c.id === id)) {
      errors.push(`evidence categories: missing required category "${id}"`);
    }
  }
  const categoryOrders = new Set<number>();
  for (const c of evidenceCategories) {
    if (categoryOrders.has(c.displayOrder)) errors.push(`category ${c.id}: duplicate displayOrder`);
    categoryOrders.add(c.displayOrder);
    if (!c.definition) errors.push(`category ${c.id}: missing definition`);
    if (!c.examples.length) errors.push(`category ${c.id}: needs examples`);
    if (!c.whatItCanEstablish) errors.push(`category ${c.id}: missing whatItCanEstablish`);
    if (!c.whatItCannotEstablish) errors.push(`category ${c.id}: missing whatItCannotEstablish`);
    if (!c.handlingRule) errors.push(`category ${c.id}: missing handlingRule`);
    // No category may claim to resolve responsibility. That is the process's job.
    if (/\b(Honor Code violation|responsibility|misconduct)\b/i.test(c.whatItCanEstablish)) {
      errors.push(
        `category ${c.id}: whatItCanEstablish must not claim to determine responsibility or an Honor Code violation`,
      );
    }
  }
  // The four specific conflations this section exists to prevent.
  const signal = evidenceCategories.find((c) => c.id === "automated-signal");
  if (signal && /\b(proof|proves|establishes that the student)\b/i.test(signal.whatItCanEstablish)) {
    errors.push('"Automated signal" must not be described as proof');
  }
  const inference = evidenceCategories.find((c) => c.id === "faculty-inference");
  if (inference && /\bauthorship\b/i.test(inference.whatItCanEstablish)) {
    errors.push('"Faculty inference" must not be described as evidence of authorship');
  }
  const content = evidenceCategories.find((c) => c.id === "content-problem");
  if (content && /\bAI\b/i.test(content.whatItCanEstablish)) {
    errors.push('"Content or source problem" must not be described as establishing AI use');
  }
  // The trap this category exists to name: absent information is not evidence.
  const unknown = evidenceCategories.find((c) => c.id === "unknown");
  if (unknown && !/(missing|absent|absence|unknown)/i.test(unknown.whatItCannotEstablish)) {
    errors.push(
      '"Unknown" must say that missing information does not become a conclusion — name the absence explicitly',
    );
  }
  if (unknown && !/question/i.test(unknown.handlingRule)) {
    errors.push('"Unknown" must instruct writing the gap as a question rather than filling it');
  }

  // --- the practice scenario --------------------------------------------
  const sc = concernScenario;
  if (sc.fictional !== true) errors.push("scenario: must be marked fictional");
  if (!sc.visibleScenarioLabel) errors.push("scenario: missing a visible practice-scenario label");
  else if (!/(practice|fictional)/i.test(sc.visibleScenarioLabel)) {
    errors.push("scenario: the visible label must say the scenario is a practice scenario");
  }
  if (sc.workType !== "graded") {
    errors.push('scenario: the worked example must be graded work so the OCS route is exercised');
  }
  if (sc.staffReviewRequired !== true) errors.push("scenario: staffReviewRequired must be true");
  if (!sc.items.length) errors.push("scenario: needs items to sort");
  const categoryIds = new Set(evidenceCategories.map((c) => c.id));
  for (const item of sc.items) {
    if (!categoryIds.has(item.categoryId)) {
      errors.push(`scenario item references unknown category "${item.categoryId}"`);
    }
  }
  // Every category the exercise teaches must actually be exercised, except the
  // student account — that only exists after the process has run.
  for (const id of ["governing-rule", "observable-artifact", "content-problem", "automated-signal", "faculty-inference", "unknown"] as const) {
    if (!sc.items.some((i) => i.categoryId === id)) {
      errors.push(`scenario: no item exercises the "${id}" category`);
    }
  }
  // The answer key must land on preserve-and-consult, and must not endorse any
  // of the four wrong answers.
  const correct = sc.nextStepChoices[sc.correctNextStepIndex];
  if (!correct || !/consult OCS/i.test(correct)) {
    errors.push("scenario: the correct next step must be to preserve the materials and consult OCS");
  }
  if (!/preserve/i.test(sc.answerKeyNextStep) || !/consult OCS/i.test(sc.answerKeyNextStep)) {
    errors.push('scenario: the answer key must say "preserve" and "consult OCS"');
  }
  if (penaltyGrading.test(sc.answerKeyNextStep)) {
    errors.push("scenario: the answer key must not recommend a grade penalty");
  }
  if (/\b86%?\b[^.]*\b(prov(es|en)|confirms|shows that)\b/i.test(sc.answerKeyNextStep)) {
    errors.push("scenario: the answer key must not treat the detector score as proof");
  }
  if (!/does not determine/i.test(sc.answerKeyClosing)) {
    errors.push("scenario: the closing line must say the exercise does not determine a violation");
  }
  // A real name, course number, or contact detail would make this a record about
  // a person rather than a teaching example.
  const identifying = /\b(\d{2,3}[A-Z]?-\d|LAW ?\d{3}|@stanford\.edu|@law\.stanford\.edu)\b/;
  const scenarioText = [sc.situation.join(" "), sc.task, ...sc.items.map((i) => i.text)].join(" ");
  if (identifying.test(scenarioText)) {
    errors.push("scenario: must contain no course identifier, email address, or other identifying detail");
  }
  if (!isValidIsoDate(sc.reviewedOn)) errors.push("scenario: reviewedOn is not a valid date");
  if (!isValidIsoDate(sc.reviewBy)) errors.push("scenario: reviewBy is not a valid date");
  else if (today > sc.reviewBy) {
    warnings.push(`scenario ${sc.id}: review date has passed (${sc.reviewBy}). Re-confirm the answer key.`);
  }

  // --- graded / ungraded paths ------------------------------------------
  if (workTypePaths.length !== 2) errors.push("work-type paths: expected exactly two");
  const graded = workTypePaths.find((p) => p.id === "graded");
  const ungraded = workTypePaths.find((p) => p.id === "ungraded");
  if (!graded || !/OCS/i.test(graded.body)) {
    errors.push("work-type paths: the graded path must route through OCS");
  }
  if (graded && !/before/i.test(graded.body)) {
    errors.push("work-type paths: the graded path must say OCS comes before the student conversation");
  }
  if (!ungraded || !/conversation/i.test(ungraded.body)) {
    errors.push("work-type paths: the ungraded path must permit a pedagogical conversation");
  }
  if (ungraded && /OCS/i.test(ungraded.action)) {
    errors.push("work-type paths: the ungraded path must not require OCS as a precondition");
  }

  // --- conversation ------------------------------------------------------
  if (!/have not reached a conclusion/i.test(conversationOpening)) {
    errors.push("conversation: the opening must state that no conclusion has been reached");
  }
  if (conversationQuestions.length < 5) errors.push("conversation: needs the full question set");
  const forbiddenAsk = /\b(password|diagnosis|disabilit|medical|native language|chat history)\b/i;
  for (const q of conversationQuestions) {
    if (forbiddenAsk.test(q)) {
      errors.push(`conversation: a question must not ask about credentials, health, or private history: ${q}`);
    }
  }

  return { errors, warnings };
}

const validation = validateStudentAiConcern();
if (validation.errors.length) {
  throw new Error(`Student AI concern content is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[student-ai-concern] ${w}`);
}

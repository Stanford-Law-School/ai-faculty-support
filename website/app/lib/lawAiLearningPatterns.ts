// =============================================================================
// Six law-school activity patterns for AI-supported legal learning.
//
// Each pattern gives AI a bounded role and makes the student's legal work
// visible. None of them is ranked against the others: they are sorted by
// displayOrder for a stable reading sequence, not by quality.
//
// The validator enforces the properties that make a pattern safe to hand to a
// faculty member without further thought:
//
//   * every pattern names the legal capability, not just the activity;
//   * every pattern has a bounded AI role that stops short of final legal
//     judgment;
//   * every pattern says what the student produces that shows learning;
//   * any pattern whose legal claims depend on a source requires verification;
//   * an oral or simulated activity never substitutes for faculty feedback;
//   * the synthetic-client pattern requires fictional or approved material and
//     never permits real client facts by default.
//
// Filtering by course type is an optional enhancement. Every record renders
// without JavaScript, so the categories below are for narrowing a long list, not
// for gating access to it.
// =============================================================================

export type CourseCategory =
  | "doctrinal"
  | "research-and-writing"
  | "advocacy"
  | "experiential"
  | "drafting";

export const courseCategories: { id: CourseCategory; label: string }[] = [
  { id: "doctrinal", label: "Doctrinal" },
  { id: "research-and-writing", label: "Research and writing" },
  { id: "advocacy", label: "Advocacy" },
  { id: "experiential", label: "Experiential" },
  { id: "drafting", label: "Drafting" },
];

export type PreparationLevel = "Low" | "Low to moderate" | "Moderate";

export type ActivityPattern = {
  id: string;
  title: string;
  bestFor: string;
  /** Which filters this pattern appears under. Never used to hide a record. */
  categories: CourseCategory[];
  legalLearningObjective: string;
  aiRole: string;
  studentSequence: string[];
  evidenceOfLearning: string;
  sampleDeliverable: string;
  guardrails: string;
  preparationLevel: PreparationLevel;
  estimatedClassUse: string;
  /** A published guide that carries the underlying method, when one exists. */
  relatedGuideSlug?: string;
  /** True when the activity's legal claims come from a source that must be checked. */
  sourceDependent: boolean;
  /** True when the activity simulates a person, so faculty review must be retained. */
  simulation?: boolean;
  displayOrder: number;
};

export const activityPatterns: ActivityPattern[] = [
  {
    id: "case-brief-audit",
    title: "Case brief stress test",
    bestFor: "Doctrinal courses and first-year legal analysis",
    categories: ["doctrinal", "research-and-writing"],
    legalLearningObjective:
      "Identify the holding, reasoning, material facts, procedural posture, and limits of an opinion.",
    aiRole:
      "Produce a provisional brief from a public opinion after the student completes an independent brief.",
    studentSequence: [
      "Read and brief the opinion independently.",
      "Generate or receive an AI-produced brief.",
      "Check every material statement against the opinion.",
      "Classify each statement as accurate, incomplete, unsupported, or misleading.",
      "Revise the brief and explain the three most consequential changes.",
      "Apply the corrected rule to a new hypothetical.",
    ],
    evidenceOfLearning:
      "Independent brief, source-audit table, corrected brief, new application, and reflection.",
    sampleDeliverable:
      "A four-column audit: AI statement · Source passage · Assessment · Student correction",
    guardrails:
      "Use a public opinion or an instructor-cleared source. The AI brief is not an answer key. Require pinpoint references.",
    preparationLevel: "Low",
    estimatedClassUse: "One class preparation assignment or a 25-minute in-class exercise",
    sourceDependent: true,
    displayOrder: 1,
  },
  {
    id: "counterargument-rehearsal",
    title: "Opposing counsel or skeptical judge",
    bestFor: "Legal writing, appellate advocacy, seminars, and oral argument",
    categories: ["advocacy", "research-and-writing"],
    legalLearningObjective:
      "Develop, prioritize, answer, and revise legal counterarguments.",
    aiRole:
      "Generate questions or counterarguments from a public record, student-supplied argument map, or instructor-defined hypothetical.",
    studentSequence: [
      "Prepare an argument and authorities independently.",
      "Ask the system for the strongest credible objections.",
      "Separate legal objections from unsupported or irrelevant objections.",
      "Answer each material objection with reasoning and authority.",
      "Revise the argument map.",
      "Rehearse orally and identify the question that most changed the argument.",
    ],
    evidenceOfLearning:
      "Initial argument map, challenge list, source-backed responses, revised map, and oral reflection.",
    sampleDeliverable: "A “challenge and response” table with authority for each response.",
    guardrails:
      "Do not let the system invent legal authority. Use a licensed legal source environment or supply the relevant public authorities. AI feedback does not replace faculty advocacy feedback.",
    preparationLevel: "Low to moderate",
    estimatedClassUse: "15-minute rehearsal plus debrief",
    sourceDependent: true,
    simulation: true,
    displayOrder: 2,
  },
  {
    id: "legal-claim-verification-lab",
    title: "Legal claim verification lab",
    bestFor: "Legal research, writing, seminars, journals, and doctrinal courses",
    categories: ["research-and-writing", "doctrinal"],
    legalLearningObjective: "Retrieve, read, contextualize, and update legal authority.",
    aiRole:
      "Supply a clearly labeled simulated claim or a generated research lead for students to audit.",
    studentSequence: [
      "Identify the exact proposition.",
      "Retrieve the cited authority.",
      "Locate the supporting passage.",
      "Determine the authority’s legal role and weight.",
      "Check subsequent history and current treatment.",
      "Record a proposition-specific outcome.",
    ],
    evidenceOfLearning: "Completed Find it · Read it · Place it · Update it audit.",
    sampleDeliverable:
      "A claim-by-claim evidence record with corrections and confidence limited to the specific proposition.",
    guardrails:
      "Use the existing legal claim verification framework. Do not let the same model certify its own output.",
    preparationLevel: "Low",
    estimatedClassUse: "20–40 minutes",
    relatedGuideSlug: "verify-an-ai-legal-claim",
    sourceDependent: true,
    displayOrder: 3,
  },
  {
    id: "statutory-interpretation-comparison",
    title: "Statutory interpretation comparison",
    bestFor: "Legislation, regulation, administrative law, and doctrinal courses",
    categories: ["doctrinal", "research-and-writing"],
    legalLearningObjective:
      "Develop competing interpretations and assess them using text, structure, purpose, canons, precedent, and consequences.",
    aiRole:
      "Generate provisional arguments for multiple interpretations of public statutory or regulatory language.",
    studentSequence: [
      "Interpret the provision independently.",
      "Identify ambiguity, definitions, exceptions, and cross-references.",
      "Review AI-generated competing interpretations.",
      "Verify every cited source.",
      "Identify false balance, missing authority, or invented assumptions.",
      "Write and defend the student’s interpretation.",
      "State what additional authority or facts could change the result.",
    ],
    evidenceOfLearning:
      "Independent interpretation, source-checked comparison, and defended conclusion.",
    sampleDeliverable:
      "A structured memo separating text, authority, prediction, policy, and unknowns.",
    guardrails:
      "Do not ask an ungrounded system to invent controlling authority. Do not require equal weight when the legal materials do not support equal positions.",
    preparationLevel: "Moderate",
    estimatedClassUse: "One assignment or one class session",
    sourceDependent: true,
    displayOrder: 4,
  },
  {
    id: "synthetic-client-interview",
    title: "Synthetic client interview and counseling practice",
    bestFor:
      "Clinics, client counseling, interviewing, professional responsibility, and experiential courses",
    categories: ["experiential", "advocacy"],
    legalLearningObjective:
      "Ask purposeful questions, identify missing facts, spot issues, explain options, and communicate uncertainty.",
    aiRole: "Play a fictional client using instructor-defined facts and boundaries.",
    studentSequence: [
      "Prepare an interview plan.",
      "Conduct the simulated interview.",
      "Identify facts obtained, facts missing, and assumptions made.",
      "Build an issue and research list.",
      "Explain possible next steps in accessible language.",
      "Compare the simulation with faculty or peer feedback.",
      "Reflect on what the system made easier or distorted.",
    ],
    evidenceOfLearning:
      "Interview plan, question sequence, factual record, issue list, counseling reflection, and faculty debrief.",
    sampleDeliverable: "A counseling memorandum based solely on the synthetic record.",
    guardrails:
      "Use fictional or fully approved material only. Do not enter clinic, client, or matter information. Do not treat generated client behavior or feedback as a substitute for supervised clinical education.",
    preparationLevel: "Moderate",
    estimatedClassUse: "20-minute simulation plus debrief",
    sourceDependent: false,
    simulation: true,
    displayOrder: 5,
  },
  {
    id: "draft-redline-justify",
    title: "Draft, compare, redline, and justify",
    bestFor: "Contracts, transactional work, pleadings, legislation, and legal drafting",
    categories: ["drafting", "doctrinal"],
    legalLearningObjective:
      "Connect drafting choices to legal, strategic, factual, and audience objectives.",
    aiRole:
      "Generate an alternative clause or draft from a public or synthetic hypothetical.",
    studentSequence: [
      "Draft independently or analyze an instructor-supplied baseline.",
      "Generate an AI alternative under stated constraints.",
      "Redline the versions.",
      "Identify legal and practical consequences of each difference.",
      "Verify any legal claims.",
      "Produce the student’s final version.",
      "Defend the choices in a short drafting note.",
    ],
    evidenceOfLearning:
      "Initial draft, AI alternative, redline, source checks, final draft, and rationale.",
    sampleDeliverable:
      "A redline with comments explaining each accepted or rejected change.",
    guardrails:
      "Use public or synthetic material unless the exact service and workflow have been approved. Grade the rationale and fit, not mere polish.",
    preparationLevel: "Moderate",
    estimatedClassUse: "One class exercise or staged assignment",
    sourceDependent: true,
    displayOrder: 6,
  },
];

export function orderedActivityPatterns(): ActivityPattern[] {
  return [...activityPatterns].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function patternsInCategory(category: CourseCategory): ActivityPattern[] {
  return orderedActivityPatterns().filter((p) => p.categories.includes(category));
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

export type PatternValidation = { errors: string[]; warnings: string[] };

const KNOWN_CATEGORIES = new Set(courseCategories.map((c) => c.id));

export function validateActivityPatterns(): PatternValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (activityPatterns.length !== 6) {
    errors.push(`activity patterns: expected exactly six, found ${activityPatterns.length}`);
  }

  const seen = new Set<string>();
  const orders = new Set<number>();
  for (const p of activityPatterns) {
    const at = p.id || p.title || "(unidentified pattern)";
    if (seen.has(p.id)) errors.push(`${at}: duplicate id`);
    seen.add(p.id);
    if (orders.has(p.displayOrder)) errors.push(`${at}: duplicate displayOrder`);
    orders.add(p.displayOrder);

    // The seven fields a faculty member needs before running the activity.
    for (const [field, value] of Object.entries({
      title: p.title,
      bestFor: p.bestFor,
      legalLearningObjective: p.legalLearningObjective,
      aiRole: p.aiRole,
      evidenceOfLearning: p.evidenceOfLearning,
      sampleDeliverable: p.sampleDeliverable,
      guardrails: p.guardrails,
      preparationLevel: p.preparationLevel,
      estimatedClassUse: p.estimatedClassUse,
    })) {
      if (!value) errors.push(`${at}: missing ${field}`);
    }
    if (p.studentSequence.length < 4) {
      errors.push(`${at}: the student sequence needs at least four steps`);
    }
    if (!p.categories.length) errors.push(`${at}: needs at least one course category`);
    for (const c of p.categories) {
      if (!KNOWN_CATEGORIES.has(c)) errors.push(`${at}: unknown course category "${c}"`);
    }

    // The AI role must stay bounded. Final legal judgment is the student's.
    const unbounded = /\b(decide|determine|conclude|resolve|answer) (the|whether|which) (legal question|issue|case|law)\b/i;
    if (unbounded.test(p.aiRole)) {
      errors.push(`${at}: the AI role must not assign final legal judgment to the system`);
    }
    if (/\banswer key\b/i.test(p.aiRole)) {
      errors.push(`${at}: the AI role must not describe the output as an answer key`);
    }

    // Polish is not the learning. An activity assessed on prose alone teaches the
    // wrong thing, which is the failure the whole guide is written against.
    if (/\b(polish|polished prose|fluency)\b/i.test(p.evidenceOfLearning)) {
      errors.push(`${at}: evidence of learning must not be generated polish`);
    }
    if (!/\b(audit|check|revis|reflect|explain|apply|application|rationale|defend|record|plan)/i.test(p.evidenceOfLearning)) {
      errors.push(
        `${at}: evidence of learning must name something the student produced — an audit, revision, application, rationale, or reflection`,
      );
    }

    // Source-dependent work needs verification somewhere in the sequence.
    if (p.sourceDependent) {
      const sequence = p.studentSequence.join(" ");
      if (!/\b(check|verif|retriev|source|passage|authority)/i.test(sequence)) {
        errors.push(
          `${at}: is source-dependent but its sequence never asks the student to check or verify a source`,
        );
      }
    }

    // A simulation is rehearsal, not assessment by machine.
    if (p.simulation && !/\b(faculty|expert|supervis|peer)/i.test(p.guardrails)) {
      errors.push(
        `${at}: simulates a person, so the guardrails must retain faculty, supervisory, or expert review`,
      );
    }

    // Self-certification is the specific trap in a verification activity.
    if (/verif/i.test(p.title + p.legalLearningObjective) && !/certify its own|same model/i.test(p.guardrails)) {
      errors.push(
        `${at}: a verification activity must state that the model may not certify its own output`,
      );
    }
  }

  // The synthetic-client pattern is the one that could reach real client
  // material, so its guardrail is checked specifically rather than generically.
  const client = activityPatterns.find((p) => p.id === "synthetic-client-interview");
  if (client) {
    if (!/\bfictional\b/i.test(client.guardrails) || !/\bapproved\b/i.test(client.guardrails)) {
      errors.push(
        "synthetic-client-interview: guardrails must require fictional or fully approved material only",
      );
    }
    if (!/do not enter (clinic|client)/i.test(client.guardrails)) {
      errors.push(
        "synthetic-client-interview: guardrails must forbid entering clinic, client, or matter information",
      );
    }
    if (client.sourceDependent) {
      warnings.push(
        "synthetic-client-interview: marked source-dependent; confirm the sequence includes a source check",
      );
    }
  }

  // Every category filter must actually match something, or the control offers a
  // dead option.
  for (const { id, label } of courseCategories) {
    if (!patternsInCategory(id).length) {
      errors.push(`course category "${label}" matches no activity pattern`);
    }
  }

  return { errors, warnings };
}

const validation = validateActivityPatterns();
if (validation.errors.length) {
  throw new Error(`Law AI learning patterns are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[law-ai-learning-patterns] ${w}`);
}

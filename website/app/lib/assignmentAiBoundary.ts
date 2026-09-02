// =============================================================================
// The assignment AI learning boundary template.
//
// This replaces the compliance-shaped template the first draft of this guide
// carried. The field order is the change that matters: it now opens with *why*
// AI is in the activity and what legal capability the student must demonstrate,
// and only then reaches permissions, prohibitions, and process. A template that
// opens with prohibitions teaches faculty to write a rule; this one teaches them
// to explain a learning design.
//
// One record holds both the visible field list and the copyable text, because the
// two drifting apart is the obvious failure: a faculty member reads sixteen
// prompts on screen, copies the block, and finds twelve. The validator checks
// that every field's heading and line appear in the copied text.
//
// This is a template, not a generator. Nothing here calls a model, stores what a
// faculty member types, or scores a policy for compliance.
//
// Adapted from Stanford Teaching Commons guidance on creating a course AI policy,
// which is CC BY-NC-SA 4.0 — hence the attribution field, which is rendered.
// =============================================================================

import { SLS_STUDENT_AI_POLICY_URL } from "./slsStudentAiPolicy";

export type BoundaryField = {
  id: string;
  label: string;
  /** The question the field answers. Rendered as the prompt on screen. */
  question?: string;
  /** Choices, where the field is a selection rather than free text. */
  choices?: string[];
  examples?: string;
  /** An instruction to the instructor, where one is needed. */
  requirement?: string;
  /** Fixed text rather than a prompt — used for the policy and concern clauses. */
  fixedText?: string;
  /** The heading this field contributes to the copyable block. */
  copyHeading: string;
  /** The line beneath that heading in the copyable block. */
  copyLine: string;
  displayOrder: number;
};

export const boundaryFields: BoundaryField[] = [
  {
    id: "why-ai-is-included",
    label: "Why AI is included",
    question: "What will this activity let students practice that they could not otherwise?",
    copyHeading: "Why AI is included:",
    copyLine: "In this activity, AI is used to help you practice:",
    displayOrder: 1,
  },
  {
    id: "legal-capability",
    label: "Legal capability you must demonstrate",
    question: "What must the student personally be able to do by the end?",
    copyHeading: "Legal capability you must demonstrate:",
    copyLine: "You are responsible for personally:",
    displayOrder: 2,
  },
  {
    id: "ai-use-status",
    label: "AI use status",
    choices: [
      "Required for a specified learning activity",
      "Permitted for specified steps",
      "Optional",
      "Not permitted",
    ],
    copyHeading: "AI use status:",
    copyLine: "[Required / permitted for specified steps / optional / not permitted]",
    displayOrder: 3,
  },
  {
    id: "permitted-role",
    label: "Permitted AI role",
    question: "Which specific actions are allowed?",
    examples:
      "Brainstorming, explanation, feedback, organization, translation, counterarguments, simulation, comparison, or rehearsal.",
    copyHeading: "Permitted AI role:",
    copyLine: "You may use AI to:",
    displayOrder: 4,
  },
  {
    id: "ai-may-not",
    label: "AI may not",
    question: "Which actions would bypass the learning objective?",
    examples:
      "Generating submitted analysis, writing the argument, creating citations without verification, or replacing required independent research.",
    copyHeading: "AI may not:",
    copyLine: "You may not use AI to:",
    displayOrder: 5,
  },
  {
    id: "independent-work-first",
    label: "Independent work required before AI",
    question: "What must the student complete unaided first?",
    requirement:
      "State this before the work begins. It is what makes the later comparison meaningful.",
    copyHeading: "Independent work required before AI:",
    copyLine: "Before using AI, complete:",
    displayOrder: 6,
  },
  {
    id: "approved-service",
    label: "Approved service and source boundary",
    question: "Which service, account, and source mode may students use?",
    copyHeading: "Approved service and source boundary:",
    copyLine: "Use only:",
    displayOrder: 7,
  },
  {
    id: "material-excluded",
    label: "Material you may not enter",
    question:
      "What course, client, clinic, student, copyrighted, or restricted material must stay out of the service?",
    copyHeading: "Material you may not enter:",
    copyLine: "Do not enter:",
    displayOrder: 8,
  },
  {
    id: "source-verification",
    label: "Source verification",
    question: "What must students independently open, check, and cite?",
    copyHeading: "Source verification:",
    copyLine: "You must independently open, check, and cite:",
    displayOrder: 9,
  },
  {
    id: "process-evidence",
    label: "Required process evidence",
    question: "What drafts, audits, notes, or reflections must students retain or submit?",
    requirement:
      "Request only what the learning objective requires, and announce it before the work begins.",
    copyHeading: "Required process evidence:",
    copyLine: "Submit or retain:",
    displayOrder: 10,
  },
  {
    id: "disclosure",
    label: "Disclosure",
    question: "What must students report, where, and at what level of detail?",
    copyHeading: "Disclosure:",
    copyLine: "Describe your AI use by:",
    displayOrder: 11,
  },
  {
    id: "assessment",
    label: "How the work will be assessed",
    question: "What does the rubric reward?",
    requirement:
      "Name the reasoning, verification, and judgment you are grading, so students do not optimise for polish.",
    copyHeading: "How the work will be assessed:",
    copyLine: "The rubric emphasizes:",
    displayOrder: 12,
  },
  {
    id: "non-ai-path",
    label: "Equivalent non-AI path",
    question: "What equivalent route is available to a student who does not use AI?",
    copyHeading: "Equivalent non-AI path:",
    copyLine: "Students who do not use AI may instead:",
    displayOrder: 13,
  },
  {
    id: "questions",
    label: "Questions",
    question: "How should students ask before proceeding when the rule is unclear?",
    copyHeading: "Questions:",
    copyLine: "Ask the teaching team before proceeding when:",
    displayOrder: 14,
  },
  {
    id: "applicable-policy",
    label: "Applicable policy",
    fixedText:
      "Point students at the current Stanford Law School Student Affairs policy. The official page controls over any summary.",
    copyHeading: "Applicable policy:",
    copyLine: `Review the current Stanford Law School Student Affairs policy:\n${SLS_STUDENT_AI_POLICY_URL}`,
    displayOrder: 15,
  },
  {
    id: "possible-concerns",
    label: "Possible concerns",
    fixedText:
      "Questions about compliance will be handled under the applicable Stanford and SLS process. Automated detector output will not be treated as a finding by itself.",
    copyHeading: "Possible concerns:",
    copyLine:
      "Questions about compliance will be handled under the applicable Stanford and SLS process. Automated detector output will not be treated as a finding by itself.",
    displayOrder: 16,
  },
];

export const assignmentAiBoundary = {
  title: "Assignment AI learning boundary",
  intro:
    "State why AI is in the activity, what legal capability the student must demonstrate, and what remains theirs to do.",
  sourceAttribution:
    "Adapted from Stanford Teaching Commons guidance on creating an AI course policy.",
  sourceUrl:
    "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/creating-your-course-policy-ai",
  sourceLicense: "CC BY-NC-SA 4.0",
  reviewedOn: "2026-08-04",
  reviewCadence: "Review annually and when Stanford revises its course-policy guidance",
};

export function orderedBoundaryFields(): BoundaryField[] {
  return [...boundaryFields].sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * The copyable block, built from the same records the page renders. One source,
 * so what a faculty member reads and what they paste cannot diverge.
 */
export function boundaryCopyText(): string {
  const body = orderedBoundaryFields()
    .map((f) => `${f.copyHeading}\n${f.copyLine}`)
    .join("\n\n");
  return `ASSIGNMENT AI LEARNING BOUNDARY\n\n${body}`;
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type BoundaryValidation = { errors: string[]; warnings: string[] };

export function validateAssignmentBoundary(): BoundaryValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (boundaryFields.length !== 16) {
    errors.push(`expected exactly sixteen boundary fields, found ${boundaryFields.length}`);
  }
  const seen = new Set<string>();
  const orders = new Set<number>();
  for (const f of boundaryFields) {
    if (seen.has(f.id)) errors.push(`field ${f.id}: duplicate id`);
    seen.add(f.id);
    if (orders.has(f.displayOrder)) errors.push(`field ${f.id}: duplicate displayOrder`);
    orders.add(f.displayOrder);
    if (!f.label) errors.push(`field ${f.id}: missing label`);
    if (!f.copyHeading || !f.copyLine) errors.push(`field ${f.id}: missing copy heading or line`);
    if (!f.question && !f.choices && !f.fixedText) {
      errors.push(`field ${f.id}: needs a question, a choice list, or fixed text`);
    }
  }

  // The visible fields and the copied block must match. This is the drift the
  // record exists to prevent.
  const copied = boundaryCopyText();
  for (const f of boundaryFields) {
    if (!copied.includes(f.copyHeading)) {
      errors.push(`field ${f.id}: its heading is missing from the copyable template`);
    }
    if (!copied.includes(f.copyLine)) {
      errors.push(`field ${f.id}: its copy line is missing from the copyable template`);
    }
  }

  // The learning rationale must come before the permissions. A template that
  // opens with prohibitions teaches faculty to write a rule rather than explain a
  // design, which is the correction this revision exists to make.
  const order = (id: string) => boundaryFields.find((f) => f.id === id)?.displayOrder ?? Infinity;
  if (order("why-ai-is-included") !== 1) {
    errors.push('"Why AI is included" must be the first field');
  }
  if (order("legal-capability") >= order("permitted-role")) {
    errors.push("the legal capability must be stated before the permitted AI role");
  }
  if (order("legal-capability") >= order("ai-may-not")) {
    errors.push("the legal capability must be stated before the prohibitions");
  }
  if (order("independent-work-first") >= order("process-evidence")) {
    errors.push("the independent-work requirement must come before the process-evidence request");
  }

  // Required substance.
  const statuses = boundaryFields.find((f) => f.id === "ai-use-status");
  if (!statuses?.choices || statuses.choices.length !== 4) {
    errors.push("ai-use-status must offer the four permission states");
  }
  const process = boundaryFields.find((f) => f.id === "process-evidence");
  if (!process?.requirement || !/before the work begins/i.test(process.requirement)) {
    errors.push(
      "process-evidence must require that retention rules be announced before the work begins",
    );
  }
  if (!/only what the learning objective requires/i.test(process?.requirement ?? "")) {
    errors.push("process-evidence must keep the request proportionate to the learning objective");
  }
  const concerns = boundaryFields.find((f) => f.id === "possible-concerns");
  if (!concerns?.fixedText || !/not be treated as a finding/i.test(concerns.fixedText)) {
    errors.push("possible-concerns must say a detector score is not a finding");
  }
  const nonAi = boundaryFields.find((f) => f.id === "non-ai-path");
  if (!nonAi) errors.push("the template must offer an equivalent non-AI path");

  // The SLS policy link has to be in the copied text, not only on the page: a
  // faculty member pasting this into a syllabus should carry the link with them.
  if (!copied.includes(SLS_STUDENT_AI_POLICY_URL)) {
    errors.push("the copyable template must carry the official SLS policy URL");
  }
  if (!/academic-integrity process|Stanford and SLS process/i.test(copied)) {
    errors.push("the copyable template must route concerns to the applicable Stanford and SLS process");
  }

  // Attribution is a licence condition, not a nicety.
  if (!assignmentAiBoundary.sourceAttribution) errors.push("missing sourceAttribution");
  if (!/^https:\/\/teachingcommons\.stanford\.edu\//.test(assignmentAiBoundary.sourceUrl)) {
    errors.push("sourceUrl must be the official Stanford Teaching Commons guidance");
  }
  if (!assignmentAiBoundary.sourceLicense) {
    errors.push("missing sourceLicense — the adapted guidance is CC BY-NC-SA 4.0");
  }
  if (!ISO_DATE.test(assignmentAiBoundary.reviewedOn)) {
    errors.push("reviewedOn is not a valid ISO date");
  }

  return { errors, warnings };
}

const validation = validateAssignmentBoundary();
if (validation.errors.length) {
  throw new Error(`Assignment AI learning boundary is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[assignment-ai-boundary] ${w}`);
}

// =============================================================================
// Citation provenance content — what is and is not established about an
// AI-supplied authority.
//
// Three coupled records live here: source-mode notes (which reference the
// canonical tool-mode taxonomy), the four evidence states (which reference audit
// steps and outcomes), and the simulated exercise (which references failure modes
// and outcomes). One validator enforces every cross-reference.
//
// The guide this feeds deliberately avoids asserting that no retrieval happened.
// Modern products can use search, supplied files, connectors, enterprise search,
// or a licensed legal database, so the source mode has to be identified before
// anything is diagnosed. The language here is conditional throughout. (The lint
// script fails the build on the absolute phrasings, so do not quote them here
// either.)
//
// The exercise uses a REAL citation (499 U.S. 340 = Feist) with FICTIONAL party
// names and a deliberately reversed proposition. That combination is the lesson:
// citation shape is not source identity, and source identity is not proposition
// support. Because the fictional claim must never escape the page as an apparent
// fact, it carries exclusion flags that the validator enforces, and the validator
// also checks the live search index for the fictional strings.
// =============================================================================

import { toolModes } from "./aiToolModes";
import { auditSteps, failureModes, verificationOutcomes, type AuditStepId } from "./legalClaimAudit";
import { guideSearchText, guides } from "./guides";

// -----------------------------------------------------------------------------
// Source-mode notes. These reference modeId and add only what is specific to
// citation provenance; the mode definitions themselves are never restated.
// -----------------------------------------------------------------------------

export type CitationSourceModeNote = {
  id: string;
  modeId: string;
  citationStatus: string;
  whatYouKnow: string;
  remainingRisk: string;
  facultyAction: string;
  displayOrder: number;
};

export const citationSourceModeNotes: CitationSourceModeNote[] = [
  {
    id: "citation-general-chat",
    modeId: "general-chat",
    citationStatus: "Unverified research lead",
    whatYouKnow:
      "The conversation contains citation-like text, but no inspectable source trail has been established.",
    remainingRisk:
      "The case name, citation, quotation, proposition, or any combination of those elements may be unsupported.",
    facultyAction:
      "Search the exact citation or source identifier in an official source or licensed legal research system.",
    displayOrder: 1,
  },
  {
    id: "citation-web-connected",
    modeId: "web-connected-chat",
    citationStatus: "Source-linked lead",
    whatYouKnow:
      "The system may have retrieved public web sources, but the user must confirm that search occurred and identify the actual sources used.",
    remainingRisk:
      "Search coverage may be incomplete, a source may be low quality, or the generated characterization may not match the cited passage.",
    facultyAction:
      "Open every material source. Check publisher, date, identity, relevant passage, jurisdiction, and omissions.",
    displayOrder: 2,
  },
  {
    id: "citation-chosen-source",
    modeId: "chosen-source-workspace",
    citationStatus: "Corpus-grounded interpretation",
    whatYouKnow:
      "The answer is intended to draw from an active set of documents selected by the user.",
    remainingRisk:
      "The system may misquote, mischaracterize, overlook a qualification, or answer beyond the selected corpus. The corpus itself may be incomplete.",
    facultyAction:
      "Confirm the active source set and open the exact passage supporting the claim.",
    displayOrder: 3,
  },
  {
    id: "citation-licensed-legal",
    modeId: "licensed-legal-research",
    citationStatus: "Legal-source retrieval with generated synthesis",
    whatYouKnow:
      "The workflow can retrieve legal authority from a licensed corpus and may include citator or editorial information.",
    remainingRisk:
      "The generated response may still attach the wrong proposition, overstate the authority, omit material law, or misread current treatment.",
    facultyAction:
      "Open the full authority and complete Find it, Read it, Place it, and Update it.",
    displayOrder: 4,
  },
];

export function orderedSourceModeNotes(): CitationSourceModeNote[] {
  return [...citationSourceModeNotes].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// Evidence states. Each adds a DIFFERENT kind of evidence, so the "does not
// establish" field is as important as the "establishes" field: conflating
// identity with support, or support with currentness, is the error being taught.
// -----------------------------------------------------------------------------

export type AuthorityEvidenceState = {
  id: string;
  label: string;
  evidencePresent: string;
  whatItEstablishes: string;
  whatItDoesNotEstablish: string;
  /** Typed against the closed audit-step union, so a renamed step fails to compile. */
  relatedAuditStepId: AuditStepId | null;
  relatedOutcomeId: string | null;
  displayOrder: number;
};

export const authorityEvidenceStates: AuthorityEvidenceState[] = [
  {
    id: "generated-citation-text",
    label: "Unverified lead",
    evidencePresent: "Citation-like text in a generated response",
    whatItEstablishes: "Only that the system produced a legal-looking string.",
    whatItDoesNotEstablish:
      "Existence, identity, support, jurisdiction, precedential weight, or currentness.",
    relatedAuditStepId: null,
    relatedOutcomeId: null,
    displayOrder: 1,
  },
  {
    id: "exact-source-located",
    label: "Identity confirmed",
    evidencePresent:
      "The exact authority has been retrieved and its citation and metadata match.",
    whatItEstablishes: "The source exists as identified.",
    whatItDoesNotEstablish:
      "That the source supports the generated proposition or remains current.",
    relatedAuditStepId: "find-it",
    relatedOutcomeId: null,
    displayOrder: 2,
  },
  {
    id: "supporting-passage-checked",
    label: "Support checked",
    evidencePresent:
      "The relevant passage has been read in the full source and compared with the exact proposition.",
    whatItEstablishes:
      "Whether the source supports, partly supports, or fails to support that proposition.",
    whatItDoesNotEstablish:
      "The authority’s proper role in the user’s jurisdiction or whether later developments affect it.",
    relatedAuditStepId: "read-it",
    relatedOutcomeId: null,
    displayOrder: 3,
  },
  {
    id: "verified-for-proposition",
    label: "Verified for this proposition",
    evidencePresent:
      "Identity, exact support, legal context, and currentness have been checked.",
    whatItEstablishes:
      "The authority has been verified for the specific proposition and task examined.",
    whatItDoesNotEstablish:
      "Universal correctness, controlling status in every jurisdiction, or fitness for a different proposition or later use.",
    relatedAuditStepId: "update-it",
    relatedOutcomeId: "verified-for-proposition",
    displayOrder: 4,
  },
];

export function orderedEvidenceStates(): AuthorityEvidenceState[] {
  return [...authorityEvidenceStates].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// The simulated exercise.
//
// citationSearchString is real; the parties are invented. The exclusion flags
// below are not decoration: the fictional proposition must not appear in site
// search, structured data, Open Graph, or a meta description, or the page would
// itself become a source of the misinformation it is teaching people to catch.
//
// The claim string lives here and nowhere else. Lint fails if the guide page
// contains either fictional party name as literal source text, so the page can
// only render it through the component that always prints the simulation label.
// -----------------------------------------------------------------------------

export type ExerciseStep = {
  instruction: string;
  /** The question the reader answers at this step, when there is one. */
  question?: string;
  /** Environments or options listed as plain text — never as form controls. */
  options?: string[];
  /** Set on the classification step so the validator can check the choice list. */
  isClassification?: boolean;
};

export type SimulatedCitationExercise = {
  exerciseId: string;
  title: string;
  simulated: true;
  fictionalParties: true;
  /** The label rendered immediately before the claim. */
  visibleSimulationLabel: string;
  /** The second line of the label: what exactly is fictional. */
  supportingLabel: string;
  claim: string;
  /** The fictional caption alone, for the citation-anatomy breakdown. */
  fictionalCaption: string;
  citationSearchString: string;
  sourceExpected: string;
  officialSourceUrl: string;
  accessibleReadingUrl: string;
  steps: ExerciseStep[];
  correctFailureModeIds: string[];
  correctOutcomeId: string;
  answerKey: {
    retrievedSource: string;
    identityResult: string;
    supportResult: string;
    failureExplanation: string;
    whatItShows: string;
    nextStep: string;
    scopeNote: string;
  };
  sourceReviewedOn: string;
  sourceReviewBy: string;
  excludeFromInternalSearch: true;
  excludeFromStructuredData: true;
  useDataNoSnippet: true;
  staffReviewRequired: true;
  displayOrder: number;
};

export const feistExercise: SimulatedCitationExercise = {
  exerciseId: "feist-identity-support-audit",
  title: "Separate citation shape from source identity",
  simulated: true,
  fictionalParties: true,
  visibleSimulationLabel: "Simulated ungrounded output",
  supportingLabel: "The party names are fictional. The proposition is deliberately incorrect.",
  claim:
    "Arcadia Directory Services, Inc. v. Prairie Telephone Cooperative, 499 U.S. 340 (1991), held that the labor required to compile facts can itself satisfy copyright’s originality requirement.",
  fictionalCaption: "Arcadia Directory Services, Inc. v. Prairie Telephone Cooperative",
  citationSearchString: "499 U.S. 340",
  sourceExpected: "Feist Publications, Inc. v. Rural Telephone Service Co., 499 U.S. 340 (1991)",
  officialSourceUrl: "https://www.govinfo.gov/app/details/USREPORTS-499/USREPORTS-499-340",
  accessibleReadingUrl: "https://www.law.cornell.edu/supremecourt/text/499/340",
  steps: [
    {
      instruction:
        "Search the reporter citation itself, before searching the party names.",
      options: [
        "Westlaw",
        "Lexis",
        "Bloomberg Law",
        "GovInfo",
        "Another reliable full-source environment",
      ],
    },
    { instruction: "Record the case name that actually appears at that citation." },
    {
      instruction: "Compare the retrieved caption with the simulated caption.",
      question: "Do the party names match?",
    },
    {
      instruction:
        "Read the holding and the relevant discussion of originality and “sweat of the brow.”",
      question:
        "Does the source support the statement that substantial labor by itself satisfies copyright’s originality requirement?",
    },
    {
      instruction: "Classify the problem.",
      isClassification: true,
      options: [
        "Source cannot be located",
        "Source identity mismatch",
        "Proposition mismatch",
        "Both identity and proposition mismatch",
        "No problem found",
      ],
    },
    {
      instruction: "For real work, continue with Place it and Update it.",
    },
  ],
  correctFailureModeIds: ["identity-mismatch", "proposition-mismatch"],
  correctOutcomeId: "not-supported",
  answerKey: {
    retrievedSource: "Feist Publications, Inc. v. Rural Telephone Service Co.",
    identityResult:
      "499 U.S. 340 is Feist Publications, Inc. v. Rural Telephone Service Co., not the fictional directory-services case in the simulation.",
    supportResult:
      "The simulated proposition reverses the source. Feist explains that copyright requires originality and does not reward effort alone.",
    failureExplanation: "Both source identity mismatch and proposition mismatch.",
    whatItShows:
      "The case name, reporter citation, year, and proposition can form a fluent, professional-looking sentence while failing as a source relationship.",
    nextStep:
      "Use the four-step legal claim audit before relying on any replacement authority.",
    scopeNote:
      "This exercise tests existence, identity, and support. An actual research task would also require the legal-context and currentness checks described in the four-step legal claim audit.",
  },
  sourceReviewedOn: "2026-08-03",
  sourceReviewBy: "2027-08-03",
  excludeFromInternalSearch: true,
  excludeFromStructuredData: true,
  useDataNoSnippet: true,
  staffReviewRequired: true,
  displayOrder: 1,
};

/** The parts of a citation that can each be well formed and still not belong together. */
export type CitationPart = {
  label: string;
  explanation: string;
  verificationQuestion: string;
  /** The fragment of the simulated citation this part refers to. */
  fragment: string;
};

export const citationAnatomy: CitationPart[] = [
  {
    label: "Party names",
    explanation:
      "They can sound consistent with the subject, industry, jurisdiction, or factual scenario.",
    verificationQuestion: "Does the retrieved source have this exact caption?",
    fragment: feistExercise.fictionalCaption,
  },
  {
    label: "Reporter coordinates",
    explanation:
      "A volume, reporter abbreviation, and page can be formatted correctly while pointing to a different authority.",
    verificationQuestion: "What source actually appears at this citation?",
    fragment: feistExercise.citationSearchString,
  },
  {
    label: "Court and year",
    explanation:
      "These details can fit the requested jurisdiction or era without matching the source.",
    verificationQuestion: "Do the court, date, and source metadata match?",
    fragment: "(1991)",
  },
  {
    label: "Legal proposition",
    explanation:
      "The proposition can sound doctrinally plausible even when the source never said it—or said the opposite.",
    verificationQuestion: "What exact passage supports the sentence?",
    fragment: "the labor required to compile facts can itself satisfy copyright’s originality requirement",
  },
];

/**
 * Strings that must never reach the search index, structured data, or a social
 * preview. One list, checked by the validator below against every published
 * guide's search text, so adding a fictional party name to `searchTerms` fails
 * the build instead of quietly making the simulation findable as a real case.
 */
export const excludedFictionalStrings: string[] = [
  "Arcadia Directory Services",
  "Prairie Telephone Cooperative",
  feistExercise.claim,
];

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string) => ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

const REQUIRED_STATE_IDS = [
  "generated-citation-text",
  "exact-source-located",
  "supporting-passage-checked",
  "verified-for-proposition",
];

export type ProvenanceValidation = { errors: string[]; warnings: string[] };

export function validateCitationProvenance(
  today = new Date().toISOString().slice(0, 10),
): ProvenanceValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Source-mode notes must point at real modes and must not restate a mode
  // definition or name a product — the durable notes stay product-neutral.
  const modeIds = new Set(toolModes.map((m) => m.id));
  const seenNotes = new Set<string>();
  const seenNoteOrders = new Set<number>();
  const productNames = /(ChatGPT|Claude|Gemini|Copilot|NotebookLM|Westlaw|Lexis|Bloomberg|Harvey|Legora|LexText|CICERO)/i;
  for (const n of citationSourceModeNotes) {
    const at = n.id || "(unidentified note)";
    if (!n.id) errors.push(`${at}: missing id`);
    if (seenNotes.has(n.id)) errors.push(`${at}: duplicate id`);
    seenNotes.add(n.id);
    if (seenNoteOrders.has(n.displayOrder)) errors.push(`${at}: duplicate displayOrder`);
    seenNoteOrders.add(n.displayOrder);
    if (!modeIds.has(n.modeId)) errors.push(`${at}: references missing tool mode "${n.modeId}"`);
    for (const [field, value] of Object.entries({
      citationStatus: n.citationStatus,
      whatYouKnow: n.whatYouKnow,
      remainingRisk: n.remainingRisk,
      facultyAction: n.facultyAction,
    })) {
      if (!value) errors.push(`${at}: missing ${field}`);
      else if (productNames.test(value)) {
        errors.push(`${at}: ${field} names a product; the durable mode notes stay product-neutral`);
      }
    }
  }
  // Two notes describing the same mode would be a second, drifting definition.
  const notesPerMode = new Map<string, number>();
  for (const n of citationSourceModeNotes) {
    notesPerMode.set(n.modeId, (notesPerMode.get(n.modeId) ?? 0) + 1);
  }
  for (const [modeId, count] of notesPerMode) {
    if (count > 1) errors.push(`tool mode "${modeId}" is described by ${count} notes; keep one per mode`);
  }

  // Exactly four evidence states, in the required order, each keeping its
  // "establishes" and "does not establish" claims distinct.
  if (authorityEvidenceStates.length !== 4) {
    errors.push(`evidence states: expected exactly four, found ${authorityEvidenceStates.length}`);
  }
  for (const id of REQUIRED_STATE_IDS) {
    if (!authorityEvidenceStates.some((s) => s.id === id)) {
      errors.push(`evidence states: missing required state "${id}"`);
    }
  }
  const stateOrders = new Set<number>();
  const auditIds = new Set(auditSteps.map((s) => s.id));
  const outcomeIds = new Set(verificationOutcomes.map((o) => o.id));
  for (const s of authorityEvidenceStates) {
    if (stateOrders.has(s.displayOrder)) errors.push(`evidence state ${s.id}: duplicate displayOrder`);
    stateOrders.add(s.displayOrder);
    if (!s.evidencePresent) errors.push(`evidence state ${s.id}: missing evidencePresent`);
    if (!s.whatItEstablishes) errors.push(`evidence state ${s.id}: missing whatItEstablishes`);
    if (!s.whatItDoesNotEstablish) errors.push(`evidence state ${s.id}: missing whatItDoesNotEstablish`);
    if (s.relatedAuditStepId && !auditIds.has(s.relatedAuditStepId)) {
      errors.push(`evidence state ${s.id}: references missing audit step "${s.relatedAuditStepId}"`);
    }
    if (s.relatedOutcomeId && !outcomeIds.has(s.relatedOutcomeId)) {
      errors.push(`evidence state ${s.id}: references missing outcome "${s.relatedOutcomeId}"`);
    }
  }
  // The specific conflations this section exists to prevent.
  const identity = authorityEvidenceStates.find((s) => s.id === "exact-source-located");
  if (identity && /support/i.test(identity.whatItEstablishes)) {
    errors.push('"Identity confirmed" must not be described as establishing proposition support');
  }
  const support = authorityEvidenceStates.find((s) => s.id === "supporting-passage-checked");
  if (support && /(current|currentness|still valid)/i.test(support.whatItEstablishes)) {
    errors.push('"Support checked" must not be described as establishing currentness');
  }
  const final = authorityEvidenceStates.find((s) => s.id === "verified-for-proposition");
  if (final && final.label.trim().toLowerCase() === "verified") {
    errors.push('the final state must be labelled "Verified for this proposition", not "Verified"');
  }
  if (final && !/for this proposition/i.test(final.label)) {
    errors.push('the final state label must name the proposition it was verified for');
  }
  const overclaim = /\b(institutional approval|approved by|controlling in every|binding everywhere)\b/i;
  for (const s of authorityEvidenceStates) {
    if (overclaim.test(s.whatItEstablishes)) {
      errors.push(`evidence state ${s.id}: must not claim institutional approval or controlling authority`);
    }
  }

  // The exercise.
  const ex = feistExercise;
  if (ex.simulated !== true) errors.push("exercise: must be marked simulated");
  if (ex.fictionalParties !== true) errors.push("exercise: must be marked fictionalParties");
  if (!ex.visibleSimulationLabel) errors.push("exercise: missing a visible simulation label");
  else if (!/simulat/i.test(ex.visibleSimulationLabel)) {
    errors.push("exercise: the visible label must say the output is simulated");
  }
  if (!ex.supportingLabel) errors.push("exercise: missing the fictional-parties supporting label");
  else if (!/fictional/i.test(ex.supportingLabel) || !/incorrect/i.test(ex.supportingLabel)) {
    errors.push(
      "exercise: the supporting label must state that the parties are fictional and the proposition incorrect",
    );
  }
  if (!ex.citationSearchString) errors.push("exercise: missing a citation search string");
  if (!ex.sourceExpected) errors.push("exercise: missing the expected source");
  if (!/Feist/i.test(ex.sourceExpected)) {
    errors.push("exercise: the expected source at 499 U.S. 340 must be Feist");
  }
  if (!ex.claim.includes(ex.citationSearchString)) {
    errors.push("exercise: the simulated claim must contain the citation the reader is told to search");
  }
  if (!ex.officialSourceUrl) errors.push("exercise: missing an official source URL");
  if (!ex.accessibleReadingUrl) errors.push("exercise: missing an accessible reading URL");
  if (!ex.answerKey?.identityResult || !ex.answerKey?.supportResult) {
    errors.push("exercise: missing an answer key");
  }
  if (ex.correctOutcomeId !== "not-supported") {
    errors.push('exercise: the outcome must be "not-supported"');
  }
  if (!outcomeIds.has(ex.correctOutcomeId)) {
    errors.push(`exercise: outcome "${ex.correctOutcomeId}" is not a defined verification outcome`);
  }
  const failureIds = new Set(failureModes.map((f) => f.id));
  for (const id of ["identity-mismatch", "proposition-mismatch"]) {
    if (!ex.correctFailureModeIds.includes(id)) {
      errors.push(`exercise: must classify "${id}"`);
    }
  }
  for (const id of ex.correctFailureModeIds) {
    if (!failureIds.has(id)) errors.push(`exercise: references missing failure mode "${id}"`);
  }
  // The answer key must not describe the simulated claim as supported.
  if (/\bis supported\b/i.test(ex.answerKey.supportResult)) {
    errors.push("exercise: the answer key must not describe the simulated claim as supported");
  }
  // Steps: the reader searches the citation first, and classifies by reading a
  // list of plain-text choices rather than submitting anything.
  if (ex.steps.length < 5) errors.push("exercise: needs at least five steps");
  if (!/citation/i.test(ex.steps[0]?.instruction ?? "")) {
    errors.push("exercise: the first step must be searching the reporter citation");
  }
  const classification = ex.steps.find((s) => s.isClassification);
  if (!classification) {
    errors.push("exercise: needs a classification step");
  } else if ((classification.options?.length ?? 0) !== 5) {
    errors.push("exercise: the classification step must offer the five plain-text choices");
  }
  for (const flag of ["excludeFromInternalSearch", "excludeFromStructuredData", "useDataNoSnippet", "staffReviewRequired"] as const) {
    if (ex[flag] !== true) errors.push(`exercise: ${flag} must be true`);
  }
  if (!isValidIsoDate(ex.sourceReviewedOn)) errors.push("exercise: sourceReviewedOn is not a valid date");
  if (!isValidIsoDate(ex.sourceReviewBy)) errors.push("exercise: sourceReviewBy is not a valid date");
  else if (today > ex.sourceReviewBy) {
    warnings.push(
      `exercise ${ex.exerciseId}: review date has passed (${ex.sourceReviewBy}). Re-confirm the source and answer key.`,
    );
  }

  // Citation anatomy must cover all four parts, from the exercise record.
  const requiredParts = ["Party names", "Reporter coordinates", "Court and year", "Legal proposition"];
  for (const p of requiredParts) {
    if (!citationAnatomy.some((c) => c.label === p)) {
      errors.push(`citation anatomy: missing part "${p}"`);
    }
  }
  for (const c of citationAnatomy) {
    if (!c.explanation || !c.verificationQuestion) {
      errors.push(`citation anatomy part "${c.label}": needs an explanation and a verification question`);
    }
  }

  // The fictional strings must not be findable as a real authority. Guide
  // records are the only thing the internal search indexes, so check them here.
  for (const guide of guides) {
    const haystack = `${guide.title} ${guide.summary} ${guideSearchText(guide)}`;
    for (const banned of excludedFictionalStrings) {
      if (haystack.includes(banned)) {
        errors.push(
          `guide "${guide.slug}": indexed text contains the fictional string "${banned.slice(0, 40)}" — ` +
            `the simulation must never be searchable as a real authority`,
        );
      }
    }
  }

  return { errors, warnings };
}

export function exerciseReviewIsStale(today = new Date().toISOString().slice(0, 10)): boolean {
  return today > feistExercise.sourceReviewBy;
}

const validation = validateCitationProvenance();
if (validation.errors.length) {
  throw new Error(`Citation provenance content is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[citation-provenance] ${w}`);
}

// =============================================================================
// Legal claim verification content — the four-step audit and everything that
// hangs off it.
//
// These records are kept in one module because they are tightly coupled: a
// failure mode names the audit step that catches it, and the exercise names one
// of the defined outcomes. Splitting them across files would mean cross-imports
// whose consistency nothing checks; here one validator enforces every link.
//
// The audit deliberately has EXACTLY four core steps. "Find it" answers a
// different question from "Read it", and passing one implies nothing about the
// others — which is the whole lesson. Adding a fifth core step is a change to
// the teaching, so the validator fails rather than letting it happen quietly.
//
// Nothing here decides a legal question. The site never declares an authority
// binding or controlling: that depends on the reader's jurisdiction and issue.
// =============================================================================

export type AuditStepId = "find-it" | "read-it" | "place-it" | "update-it";

export type AuditStep = {
  id: AuditStepId;
  number: number;
  title: string;
  shortQuestion: string;
  explanation: string;
  checks: string[];
  requiredEvidence: string;
  stopRule: string;
  outputLabel: string;
  displayOrder: number;
};

export const auditSteps: AuditStep[] = [
  {
    id: "find-it",
    number: 1,
    title: "Find it",
    shortQuestion: "Can I retrieve the exact authority?",
    explanation:
      "Begin with existence and identity. Locate the full source using the citation, case name, docket number, statutory identifier, regulation number, or other source information supplied with the claim.",
    checks: [
      "Search the exact citation or source identifier.",
      "Confirm the source title or case caption.",
      "Confirm the court, agency, legislature, publisher, or issuing body.",
      "Confirm the date.",
      "Confirm the reporter, volume, page, docket number, section, or other metadata.",
      "Retrieve the full source from an official site or reliable legal research environment.",
      "Note any mismatch between the supplied citation and the source you located.",
    ],
    requiredEvidence:
      "The full source and enough identifying information to distinguish it from similarly named or related material.",
    stopRule:
      "If you cannot locate the exact authority, mark the claim “Unable to verify.” Do not silently substitute a similar source and preserve the original claim.",
    outputLabel: "Source located",
    displayOrder: 1,
  },
  {
    id: "read-it",
    number: 2,
    title: "Read it",
    shortQuestion: "Does the source support the exact sentence?",
    explanation:
      "Existence is not support. Read the full relevant portion of the authority and compare it with the precise proposition, quotation, parenthetical, or summary you intend to use.",
    checks: [
      "Locate the relevant page, paragraph, section, footnote, or subsection.",
      "Read enough surrounding text to understand the passage in context.",
      "Confirm that every quotation appears in the source.",
      "Check punctuation, omissions, brackets, emphasis, and attribution.",
      "Confirm that the pinpoint citation leads to the supporting passage.",
      "Determine whether the language is part of the holding, reasoning, dicta, concurrence, dissent, procedural history, party argument, syllabus, or editorial summary.",
      "Check whether the source supports the full proposition or only a narrower one.",
      "Identify qualifications, exceptions, disputed facts, or limiting language.",
    ],
    requiredEvidence: "The supporting passage and its location in the full source.",
    stopRule:
      "If the source supports only a narrower or different proposition, revise the claim before relying on it. Do not describe the source as supporting the broader statement.",
    outputLabel: "Proposition supported",
    displayOrder: 2,
  },
  {
    id: "place-it",
    number: 3,
    title: "Place it",
    shortQuestion: "What legal weight and context does the authority carry?",
    explanation:
      "Determine where the source sits in the relevant legal system and what role it can properly play in the research, teaching, scholarship, or filing.",
    checks: [
      "Identify the jurisdiction.",
      "Identify the court, agency, legislature, or other issuing body.",
      "Identify the level in the relevant hierarchy.",
      "Confirm publication or precedential status where applicable.",
      "Identify the procedural posture and type of decision.",
      "Confirm the relevant date and governing version of the law.",
      "Distinguish binding, persuasive, superseded, vacated, withdrawn, unpublished, nonprecedential, administrative, and secondary authority as applicable.",
      "Check the rules governing citation or use of the source in the relevant jurisdiction.",
      "Ask whether the source addresses materially similar facts, legal standards, or procedural circumstances.",
    ],
    requiredEvidence:
      "The source's jurisdictional, institutional, precedential, and procedural context.",
    stopRule:
      "Do not let a website declare an authority “binding” or “controlling” for you. That determination depends on your legal question and jurisdiction.",
    outputLabel: "Authority placed in context",
    displayOrder: 3,
  },
  {
    id: "update-it",
    number: 4,
    title: "Update it",
    shortQuestion: "Is the authority still current for this proposition?",
    explanation:
      "Use an appropriate citator, official source, history record, or current codification to identify subsequent developments.",
    checks: [
      "Review direct history.",
      "Review negative, positive, neutral, and distinguishing treatment as relevant.",
      "Open and read the treatment that may affect the proposition.",
      "Check whether the specific point relied on was questioned, limited, distinguished, superseded, vacated, reversed, overruled, or otherwise affected.",
      "For statutes and regulations, confirm the current text, relevant version, amendment history, effective date, and pending changes when material.",
      "For court rules and standing orders, confirm the current court, judge, revision date, and effective date.",
      "For agency material, confirm current status, issuing authority, and later action.",
      "Check current local, court-specific, or judge-specific requirements when the work will be filed.",
    ],
    requiredEvidence:
      "A current treatment, history, or version check appropriate to the source type.",
    stopRule:
      "A citator symbol is a prompt for research, not a substitute for reading the relevant treatment. Record “Needs update” when current status remains unresolved.",
    outputLabel: "Currentness checked",
    displayOrder: 4,
  },
];

// -----------------------------------------------------------------------------
// Failure modes. Fabrication is only one of them, which is the point of listing
// seven: an authority can be entirely real and the legal claim still wrong.
// -----------------------------------------------------------------------------

export type FailureMode = {
  id: string;
  title: string;
  description: string;
  example: string;
  auditStepIds: AuditStepId[];
  displayOrder: number;
};

export const failureModes: FailureMode[] = [
  {
    id: "nonexistent-authority",
    title: "The authority does not exist",
    description:
      "The case, statute, rule, quotation, docket entry, or other source cannot be located as described.",
    example:
      "A plausible case name is paired with a reporter citation that belongs to something else—or to nothing at all.",
    auditStepIds: ["find-it"],
    displayOrder: 1,
  },
  {
    id: "identity-mismatch",
    title: "The citation points to a different source",
    description:
      "The caption, court, year, reporter page, section number, or docket information does not match the authority described.",
    example: "A real citation is attached to a different case with a similar name.",
    auditStepIds: ["find-it"],
    displayOrder: 2,
  },
  {
    id: "quotation-mismatch",
    title: "The quotation is inaccurate or misattributed",
    description:
      "The wording does not appear in the source, appears in a different source, or has been altered in a way that changes its meaning.",
    example:
      "A generated quotation combines language from a party's argument and the court's reasoning.",
    auditStepIds: ["read-it"],
    displayOrder: 3,
  },
  {
    id: "proposition-mismatch",
    title: "The source does not support the proposition",
    description:
      "The source is real, but the generated statement is broader, narrower, different, or contrary to what the source actually says.",
    example:
      "A case discussing a general standard is described as announcing a specific holding.",
    auditStepIds: ["read-it"],
    displayOrder: 4,
  },
  {
    id: "context-mismatch",
    title: "The source carries the wrong weight or context",
    description:
      "The answer confuses jurisdictions, court levels, procedural postures, precedential status, dates, or source types.",
    example:
      "A nonprecedential disposition from another jurisdiction is described as controlling authority.",
    auditStepIds: ["place-it"],
    displayOrder: 5,
  },
  {
    id: "currentness-failure",
    title: "The authority is no longer current for the point",
    description:
      "Later history, treatment, amendment, repeal, supersession, or a new governing version affects the proposition.",
    example:
      "An older statutory section is quoted without accounting for an effective amendment.",
    auditStepIds: ["update-it"],
    displayOrder: 6,
  },
  {
    id: "material-omission",
    title: "The answer omits material authority",
    description:
      "The cited source may be accurate, but the research leaves out controlling, directly adverse, or otherwise necessary authority.",
    example:
      "A generated answer cites favorable persuasive cases but omits controlling law from the relevant jurisdiction.",
    auditStepIds: ["place-it", "update-it"],
    displayOrder: 7,
  },
];

// -----------------------------------------------------------------------------
// Outcomes. The success label is deliberately "Verified for this proposition"
// and never a bare "Verified": the scope of what was checked is the finding.
// -----------------------------------------------------------------------------

export type VerificationOutcome = {
  id: string;
  label: string;
  definition: string;
  nextAction: string;
  displayOrder: number;
};

export const verificationOutcomes: VerificationOutcome[] = [
  {
    id: "verified-for-proposition",
    label: "Verified for this proposition",
    definition:
      "The exact source was located, the cited passage supports the stated proposition, its legal context was assessed, and its current status was checked.",
    nextAction:
      "Record the source and date checked. Do not describe the authority as verified for propositions you did not examine.",
    displayOrder: 1,
  },
  {
    id: "partially-supported",
    label: "Partially supported",
    definition:
      "The source supports a narrower, qualified, related, or different proposition.",
    nextAction:
      "Revise the sentence, quotation, parenthetical, or scope before relying on it.",
    displayOrder: 2,
  },
  {
    id: "not-supported",
    label: "Not supported",
    definition:
      "The source exists but does not support the claim, or the quotation, attribution, or pinpoint is inaccurate.",
    nextAction: "Remove or replace the claim and repeat the audit on any substitute authority.",
    displayOrder: 3,
  },
  {
    id: "unable-to-verify",
    label: "Unable to verify",
    definition:
      "The exact source cannot be located or the available material is insufficient to complete the check.",
    nextAction:
      "Do not rely on the claim as verified. Ask a librarian or continue source research.",
    displayOrder: 4,
  },
  {
    id: "needs-update",
    label: "Needs update",
    definition:
      "Support may be present, but current validity, treatment, effective version, or subsequent history remains unresolved.",
    nextAction: "Complete the appropriate citator, history, or current-version check.",
    displayOrder: 5,
  },
];

// -----------------------------------------------------------------------------
// Source-type checks. The four steps stay constant; what satisfies each one
// changes with the kind of source.
// -----------------------------------------------------------------------------

export type SourceTypeCheck = {
  id: string;
  title: string;
  findCheck: string;
  readCheck: string;
  placeCheck: string;
  updateCheck: string;
  commonTrap: string;
  displayOrder: number;
};

export const sourceTypeChecks: SourceTypeCheck[] = [
  {
    id: "judicial-opinion",
    title: "Judicial opinion or order",
    findCheck:
      "Retrieve the complete opinion or order and confirm the caption, court, date, docket, reporter citation, and publication status.",
    readCheck:
      "Read the relevant passage in context. Distinguish the court's reasoning and holding from party arguments, procedural history, summaries, concurrences, and dissents.",
    placeCheck:
      "Confirm jurisdiction, court level, procedural posture, precedential status, and rules governing citation.",
    updateCheck:
      "Review direct history and citing treatment. Read any treatment that may affect the point relied on.",
    commonTrap: "A real case is cited for a proposition it never addressed.",
    displayOrder: 1,
  },
  {
    id: "statute",
    title: "Statute or code provision",
    findCheck:
      "Use the official code or a reliable current legal database and confirm the jurisdiction, title, chapter, section, and subsection.",
    readCheck:
      "Read the operative language, definitions, exceptions, cross-references, and applicable surrounding provisions.",
    placeCheck:
      "Confirm the jurisdiction, applicability, relevant date, and whether the task requires a historical or current version.",
    updateCheck:
      "Check amendments, effective dates, notes, pending changes when material, and relevant judicial treatment.",
    commonTrap:
      "A generated answer quotes a prior version or omits an exception in another subsection.",
    displayOrder: 2,
  },
  {
    id: "regulation",
    title: "Regulation or agency material",
    findCheck:
      "Locate the official or reliable current version and confirm the agency, jurisdiction, part, section, and date.",
    readCheck:
      "Read definitions, scope, exceptions, incorporated material, and relevant agency explanation.",
    placeCheck:
      "Identify the issuing authority, legal status, geographic scope, and whether the material is a final rule, guidance, adjudication, proposal, or other source.",
    updateCheck:
      "Check effective dates, amendments, corrections, stays, rescission, later agency action, and judicial treatment.",
    commonTrap:
      "A proposed rule or guidance document is described as a currently binding regulation.",
    displayOrder: 3,
  },
  {
    id: "court-rule-order",
    title: "Court rule, local rule, standing order, or judge-specific requirement",
    findCheck:
      "Use the current court or judge source and confirm the issuing court, judge, rule number, order date, and revision date.",
    readCheck:
      "Read the complete relevant requirement, definitions, exceptions, and required forms or certifications.",
    placeCheck:
      "Confirm that it applies to the specific court, judge, case type, filing, and procedural posture.",
    updateCheck:
      "Check current local rules, standing orders, administrative orders, notices, and effective dates immediately before filing.",
    commonTrap: "A requirement from one judge or court is described as a universal rule.",
    displayOrder: 4,
  },
  {
    id: "docket-material",
    title: "Docket filing, transcript, exhibit, or record material",
    findCheck:
      "Retrieve the exact docket entry and confirm case, court, filing party, date, and document number.",
    readCheck:
      "Confirm who made the statement, what the document establishes, and whether the quotation or factual description is accurate.",
    placeCheck:
      "Distinguish allegation, evidence, argument, testimony, finding, order, and judgment.",
    updateCheck:
      "Review later docket activity that may amend, withdraw, supersede, reject, or otherwise affect the material.",
    commonTrap: "A party's allegation is presented as a judicial finding.",
    displayOrder: 5,
  },
  {
    id: "secondary-source",
    title: "Secondary source",
    findCheck:
      "Locate the complete work and confirm author, title, edition, publication, date, and relevant page or section.",
    readCheck:
      "Confirm the source says what the claim attributes to it and inspect the primary authorities on which it relies.",
    placeCheck:
      "Identify the source's purpose, jurisdictional scope, currency, authorship, and editorial status.",
    updateCheck:
      "Check the publication date, supplements, updates, cited primary authorities, and subsequent developments.",
    commonTrap:
      "A secondary summary is treated as a substitute for primary authority when the task requires the primary source.",
    displayOrder: 6,
  },
];

// -----------------------------------------------------------------------------
// The practice exercise.
//
// The CLAIM is simulated and deliberately wrong; the SOURCE is a real published
// order. That split is the point of the exercise, so `simulated: true` and the
// visible label are both required by the validator — a reader must never mistake
// the fabricated claim for something an AI service actually produced.
//
// Case status was checked on sourceStatusCheckedOn against public reporting and
// the court's own opinions index. See the staff-review note for what still needs
// confirming against the opinion text itself.
// -----------------------------------------------------------------------------

export type SimulatedClaimExercise = {
  exerciseId: string;
  simulated: true;
  simulationLabel: string;
  claim: string;
  sourceCitation: string;
  publicReadingUrl: string;
  alternateReadingUrl?: string;
  officialStatusCheckUrl: string;
  sourceStatusCheckedOn: string;
  sourceStatusReviewBy: string;
  staffReviewRequired: true;
  answerKeyOutcomeId: string;
  answerKeyExplanation: string[];
  errorCategories: string[];
};

export const lnuExercise: SimulatedClaimExercise = {
  exerciseId: "lnu-claim-audit",
  simulated: true,
  simulationLabel: "Simulated AI output — deliberately flawed for practice",
  claim:
    "The Ninth Circuit held in Lnu v. Blanche that using generative AI to prepare an appellate brief violates the Federal Rules of Appellate Procedure.",
  sourceCitation: "Lnu v. Blanche, No. 24-4790 (9th Cir. June 3, 2026) (published order).",
  // The court's own copy is preferred; the Justia copy is kept as an alternate
  // reading route in case the court URL moves.
  publicReadingUrl: "https://cdn.ca9.uscourts.gov/datastore/opinions/2026/06/03/24-4790.pdf",
  alternateReadingUrl:
    "https://cases.justia.com/federal/appellate-courts/ca9/24-4790/24-4790-2026-06-03.pdf",
  officialStatusCheckUrl: "https://www.ca9.uscourts.gov/decisions/opinions/",
  sourceStatusCheckedOn: "2026-08-03",
  sourceStatusReviewBy: "2026-09-03",
  staffReviewRequired: true,
  answerKeyOutcomeId: "not-supported",
  answerKeyExplanation: [
    "The order does not hold that using generative AI to prepare an appellate brief is itself a violation.",
    "The court's sanctions concerned the signing and filing of briefs that contained nonexistent cases, misattributed quotations, and serious mischaracterizations of real cases, together with later failures of candor about how the errors arose. The order requires the firm to disclose generative AI use in future filings for a set period, which is a disclosure obligation rather than a prohibition.",
    "The source therefore exists, but the simulated claim mischaracterizes what the source says. This is a support failure, not an existence failure.",
  ],
  errorCategories: [
    "Nonexistent cases",
    "Misattributed quotations",
    "Misrepresentations of real cases",
    "Failures of candor after the original filing",
  ],
};

// -----------------------------------------------------------------------------
// Validation. Runs at import so the build fails rather than publishing a broken
// audit, an unlabelled simulation, or an answer key that endorses the flawed
// claim.
// -----------------------------------------------------------------------------

const REQUIRED_STEP_IDS: AuditStepId[] = ["find-it", "read-it", "place-it", "update-it"];
const REQUIRED_OUTCOME_IDS = [
  "verified-for-proposition",
  "partially-supported",
  "not-supported",
  "unable-to-verify",
  "needs-update",
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string) => ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

export type AuditValidation = { errors: string[]; warnings: string[] };

export function validateLegalClaimContent(
  today = new Date().toISOString().slice(0, 10),
): AuditValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Exactly four core steps, with the exact ids the teaching depends on.
  if (auditSteps.length !== 4) {
    errors.push(
      `The audit must have exactly four core steps; found ${auditSteps.length}. "Record the result" is supporting behaviour, not a fifth core step.`,
    );
  }
  for (const id of REQUIRED_STEP_IDS) {
    if (!auditSteps.some((s) => s.id === id)) errors.push(`audit: missing required step "${id}"`);
  }
  const orders = new Set<number>();
  for (const s of auditSteps) {
    if (!REQUIRED_STEP_IDS.includes(s.id)) errors.push(`audit: unexpected step id "${s.id}"`);
    if (orders.has(s.displayOrder)) errors.push(`audit: duplicate displayOrder ${s.displayOrder}`);
    orders.add(s.displayOrder);
    if (!s.stopRule) errors.push(`audit step ${s.id}: missing stopRule`);
    if (!s.checks?.length) errors.push(`audit step ${s.id}: needs at least one check`);
    if (!s.requiredEvidence) errors.push(`audit step ${s.id}: missing requiredEvidence`);
    if (!s.outputLabel) errors.push(`audit step ${s.id}: missing outputLabel`);
  }

  const stepIds = new Set(auditSteps.map((s) => s.id));
  for (const f of failureModes) {
    if (!f.title || !f.description || !f.example) {
      errors.push(`failure mode ${f.id}: needs a title, description, and example`);
    }
    if (!f.auditStepIds?.length) errors.push(`failure mode ${f.id}: needs at least one auditStepId`);
    for (const id of f.auditStepIds ?? []) {
      if (!stepIds.has(id)) errors.push(`failure mode ${f.id}: references missing audit step "${id}"`);
    }
  }

  for (const id of REQUIRED_OUTCOME_IDS) {
    if (!verificationOutcomes.some((o) => o.id === id)) {
      errors.push(`outcomes: missing required outcome "${id}"`);
    }
  }
  const success = verificationOutcomes.find((o) => o.id === "verified-for-proposition");
  if (success && success.label.trim().toLowerCase() === "verified") {
    errors.push(
      'outcomes: the success label must be "Verified for this proposition", never a bare "Verified"',
    );
  }
  // No outcome may promise legal correctness or institutional blessing.
  const overclaim = /\b(legally correct|guarantee[ds]?|approved by|binding|controlling|institutional approval)\b/i;
  for (const o of verificationOutcomes) {
    if (overclaim.test(o.definition) || overclaim.test(o.label)) {
      errors.push(`outcome ${o.id}: must not claim legal correctness, approval, or binding force`);
    }
  }

  for (const c of sourceTypeChecks) {
    for (const [field, value] of Object.entries({
      findCheck: c.findCheck,
      readCheck: c.readCheck,
      placeCheck: c.placeCheck,
      updateCheck: c.updateCheck,
      commonTrap: c.commonTrap,
    })) {
      if (!value) errors.push(`source type ${c.id}: missing ${field}`);
    }
  }

  // The exercise: a simulation must announce itself, and the answer key must
  // reach "Not supported" — an answer key that endorsed the flawed claim would
  // teach the opposite of the lesson.
  const ex = lnuExercise;
  if (ex.simulated !== true) errors.push("exercise: must be marked simulated");
  if (!ex.simulationLabel) errors.push("exercise: missing a visible simulation label");
  if (!ex.sourceCitation) errors.push("exercise: missing a source citation");
  if (!ex.publicReadingUrl) errors.push("exercise: missing a public reading URL");
  if (!ex.answerKeyExplanation?.length) errors.push("exercise: missing an answer key");
  if (ex.staffReviewRequired !== true) errors.push("exercise: staffReviewRequired must be true");
  if (ex.answerKeyOutcomeId !== "not-supported") {
    errors.push(
      'exercise: the answer key must record "not-supported"; the simulated claim mischaracterizes the source',
    );
  }
  if (!verificationOutcomes.some((o) => o.id === ex.answerKeyOutcomeId)) {
    errors.push(`exercise: answerKeyOutcomeId "${ex.answerKeyOutcomeId}" is not a defined outcome`);
  }
  if (!isValidIsoDate(ex.sourceStatusCheckedOn)) errors.push("exercise: sourceStatusCheckedOn is not a valid date");
  if (!isValidIsoDate(ex.sourceStatusReviewBy)) errors.push("exercise: sourceStatusReviewBy is not a valid date");
  else if (today > ex.sourceStatusReviewBy) {
    // Stale: the page shows a maintenance warning rather than failing the build,
    // so an overdue re-check is visible to readers and maintainers alike.
    warnings.push(
      `exercise ${ex.exerciseId}: case status is overdue for re-check (reviewBy ${ex.sourceStatusReviewBy}, today ${today}). Confirm current status at ${ex.officialStatusCheckUrl}.`,
    );
  }
  // The answer key must not assert the thing the guide warns against.
  const banned = /(banned|prohibit\w*|outlaw\w*)\s+(the\s+)?(use of\s+)?(generative\s+)?AI/i;
  for (const p of ex.answerKeyExplanation) {
    if (banned.test(p)) {
      errors.push("exercise: the answer key must not say the court banned or prohibited AI use");
    }
  }

  return { errors, warnings };
}

/** True when the exercise's case-status check is overdue, for the visible notice. */
export function exerciseStatusIsStale(today = new Date().toISOString().slice(0, 10)): boolean {
  return today > lnuExercise.sourceStatusReviewBy;
}

const validation = validateLegalClaimContent();
if (validation.errors.length) {
  throw new Error(`Legal claim audit content is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[legal-claim-audit] ${w}`);
}

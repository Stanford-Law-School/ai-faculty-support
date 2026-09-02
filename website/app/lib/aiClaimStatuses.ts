// =============================================================================
// Five things a sentence in a generated answer can be.
//
// A single paragraph can move from a source-backed fact to an interpretation, a
// prediction, and a recommendation without changing its tone. The statuses exist
// so a reader can separate those before deciding what to check.
//
// What the validator refuses to let these records say:
//
//   - that "directly supported" means universally correct or controlling;
//   - that an interpretation is a quotation;
//   - that a prediction can be stated without assumptions or a range;
//   - that a recommendation is a fact;
//   - that an unknown may be closed with a guess;
//   - that a confidence percentage is itself a status.
//
// Each of those is a plausible sentence that would make the guide teach the
// opposite of its own lesson. Nothing here scores, ranks, or classifies anything:
// the records are read by a person, and the page has no control that assigns a
// status to a claim.
// =============================================================================

export type ClaimStatus = {
  id: string;
  title: string;
  definition: string;
  /** What must exist before the statement can be relied on. */
  evidenceNeeded: string;
  /** The question that bounds what the statement does not establish. */
  uncertaintyQuestion: string;
  /** What the faculty member does about it. */
  facultyAction: string;
  /** A concrete instance, so the distinction is not abstract. */
  example: string;
  displayOrder: number;
};

export const claimStatuses: ClaimStatus[] = [
  {
    id: "directly-supported",
    title: "Directly supported",
    definition:
      "The statement can be traced to a specific passage, data point, record, or other inspectable source.",
    evidenceNeeded:
      "The exact source, relevant passage or data, date or version, and enough context to understand what the source establishes.",
    uncertaintyQuestion:
      "Is the source authoritative, current, complete enough for the task, and accurately characterized?",
    facultyAction:
      "Open the source and verify the relationship between the evidence and the statement.",
    example: "“The opinion states the standard on page 14.”",
    displayOrder: 1,
  },
  {
    id: "interpretation",
    title: "Interpretation or inference",
    definition:
      "The statement synthesizes, characterizes, explains, or draws a conclusion from one or more sources.",
    evidenceNeeded:
      "The underlying sources and the reasoning connecting them to the interpretation.",
    uncertaintyQuestion:
      "What other plausible interpretation, distinction, or qualification should be considered?",
    facultyAction:
      "Separate the source language from the generated interpretation and assess the reasoning yourself.",
    example: "“The court’s reasoning suggests the rule may apply narrowly.”",
    displayOrder: 2,
  },
  {
    id: "prediction-estimate",
    title: "Prediction or estimate",
    definition:
      "The statement describes a future outcome, causal effect, probability, amount, duration, or likely consequence.",
    evidenceNeeded:
      "Relevant data, comparison cases, a stated method, assumptions, and an appropriate range rather than unsupported precision.",
    uncertaintyQuestion:
      "What variables, populations, time periods, or alternative explanations could change the result?",
    facultyAction:
      "Ask for the basis and range. Pilot, measure, or seek better evidence when the prediction affects a consequential decision.",
    example: "“This assignment may reduce revision time under the tested conditions.”",
    displayOrder: 3,
  },
  {
    id: "recommendation-value",
    title: "Recommendation or value judgment",
    definition: "The statement says what should be done or ranks one option as better.",
    evidenceNeeded:
      "The criteria, objectives, values, constraints, affected groups, tradeoffs, and verified factual premises underlying the recommendation.",
    uncertaintyQuestion:
      "Whose values and consequences control, and what alternative would be preferred under different criteria?",
    facultyAction:
      "Keep the recommendation visibly separate from facts and make the decision through the responsible person or institution.",
    example: "“The course should pilot the activity before requiring it.”",
    displayOrder: 4,
  },
  {
    id: "unknown-source-needed",
    title: "Unknown or source needed",
    definition:
      "The available material does not establish the statement, or the relevant information cannot currently be inspected.",
    evidenceNeeded:
      "A suitable source, clarification, retrieval step, measurement, or subject-matter review.",
    uncertaintyQuestion:
      "Can the question be answered from available evidence, or should the response abstain?",
    facultyAction:
      "Mark the claim “SOURCE NEEDED,” narrow it, research it, or leave it unresolved.",
    example: "“No available source establishes the claimed percentage.”",
    displayOrder: 5,
  },
];

/**
 * Rendered beneath the five records. Two things it has to establish at once: a
 * status is a description of the current evidence rather than a permanent
 * property, and the strongest status still is not a licence.
 */
export const claimStatusNote =
  "A statement can change status as evidence is added. “Directly supported” still does not mean universally controlling, complete, or appropriate for every use.";

export function orderedClaimStatuses(): ClaimStatus[] {
  return [...claimStatuses].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getClaimStatus(id: string): ClaimStatus {
  const status = claimStatuses.find((s) => s.id === id);
  if (!status) throw new Error(`Unknown claim status: ${id}`);
  return status;
}

/** The status labels, in order — used by the exercise steps and the ledger. */
export function claimStatusTitles(): string[] {
  return orderedClaimStatuses().map((s) => s.title);
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const REQUIRED_IDS = [
  "directly-supported",
  "interpretation",
  "prediction-estimate",
  "recommendation-value",
  "unknown-source-needed",
];

export type ClaimStatusValidation = { errors: string[]; warnings: string[] };

export function validateClaimStatuses(): ClaimStatusValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const ids = orderedClaimStatuses().map((s) => s.id);
  if (ids.length !== REQUIRED_IDS.length || ids.some((id, i) => id !== REQUIRED_IDS[i])) {
    errors.push(
      `expected exactly [${REQUIRED_IDS.join(", ")}] in that order, found [${ids.join(", ")}]`,
    );
  }

  const seenOrders = new Set<number>();
  for (const s of claimStatuses) {
    const where = `claim status ${s.id}`;
    for (const field of [
      "title",
      "definition",
      "evidenceNeeded",
      "uncertaintyQuestion",
      "facultyAction",
      "example",
    ] as const) {
      if (!s[field]) errors.push(`${where}: missing ${field}`);
    }
    if (seenOrders.has(s.displayOrder)) errors.push(`${where}: duplicate displayOrder`);
    seenOrders.add(s.displayOrder);
    // A percentage is an output, not a kind of claim. A status labelled "90%
    // confident" would put the thing the guide is teaching people to inspect in
    // the position of the thing they inspect it with.
    if (/\d\s*%/.test(s.title) || /\bconfidence\b/i.test(s.title)) {
      errors.push(
        `${where}: a confidence level is not a claim status. The statuses describe what kind of ` +
          "statement is being made, not how sure the wording sounds.",
      );
    }
  }

  const supported = claimStatuses.find((s) => s.id === "directly-supported");
  if (supported) {
    const prose = [supported.definition, supported.evidenceNeeded, supported.facultyAction].join(" ");
    if (!/\b(traced|specific passage|inspectable)\b/i.test(supported.definition)) {
      errors.push(
        "directly-supported: the definition must require a traceable, inspectable source rather than " +
          "a confident-sounding assertion",
      );
    }
    if (/\b(always|universally) (correct|true|controlling)\b/i.test(prose) ||
        /\bcontrolling authority\b/i.test(prose)) {
      errors.push(
        "directly-supported: describes the status as universally correct or controlling. Support for " +
          "a statement is not the same as authority over a question.",
      );
    }
    if (!/\bOpen the source\b/i.test(supported.facultyAction)) {
      errors.push(
        "directly-supported: facultyAction must still require opening the source. A citation is not " +
          "the check; reading it is.",
      );
    }
  }

  const interpretation = claimStatuses.find((s) => s.id === "interpretation");
  if (interpretation) {
    if (!/\b(synthesiz|characteriz|explain|draws a conclusion|infer)/i.test(interpretation.definition)) {
      errors.push(
        "interpretation: the definition must describe generated reasoning over sources, not a source",
      );
    }
    if (/\b(quotation|quotes the source|verbatim)\b/i.test(interpretation.definition)) {
      errors.push(
        "interpretation: describes an interpretation as a quotation. The whole point of the status is " +
          "that the source language and the generated characterization are different things.",
      );
    }
    if (!/\bSeparate the source language\b/i.test(interpretation.facultyAction)) {
      errors.push(
        "interpretation: facultyAction must separate the source language from the generated reading",
      );
    }
  }

  const prediction = claimStatuses.find((s) => s.id === "prediction-estimate");
  if (prediction) {
    if (!/\bassumptions\b/i.test(prediction.evidenceNeeded)) {
      errors.push("prediction-estimate: evidenceNeeded must require the stated assumptions");
    }
    if (!/\brange\b/i.test(prediction.evidenceNeeded) || !/\brange\b/i.test(prediction.facultyAction)) {
      errors.push(
        "prediction-estimate: a prediction offered without a range is unsupported precision. Both " +
          "evidenceNeeded and facultyAction must ask for one.",
      );
    }
    if (!/\bmethod\b/i.test(prediction.evidenceNeeded)) {
      errors.push("prediction-estimate: evidenceNeeded must require a stated method");
    }
  }

  const recommendation = claimStatuses.find((s) => s.id === "recommendation-value");
  if (recommendation) {
    if (!/\bshould be done\b|\branks\b/i.test(recommendation.definition)) {
      errors.push(
        "recommendation-value: the definition must identify the statement as a proposed action or " +
          "ranking rather than a description of the world",
      );
    }
    if (/\b(is a fact|states a fact|factual conclusion)\b/i.test(recommendation.definition)) {
      errors.push("recommendation-value: presents a recommendation as a fact");
    }
    if (!/\bseparate\b/i.test(recommendation.facultyAction)) {
      errors.push(
        "recommendation-value: facultyAction must keep the recommendation visibly separate from the " +
          "facts it rests on",
      );
    }
    if (!/\b(responsible person|institution)\b/i.test(recommendation.facultyAction)) {
      errors.push(
        "recommendation-value: facultyAction must route the decision to the accountable person or " +
          "institution",
      );
    }
  }

  const unknown = claimStatuses.find((s) => s.id === "unknown-source-needed");
  if (unknown) {
    if (!/SOURCE NEEDED/.test(unknown.facultyAction)) {
      errors.push('unknown-source-needed: facultyAction must offer the "SOURCE NEEDED" mark');
    }
    if (!/\babstain\b|\bunresolved\b/i.test(
      [unknown.uncertaintyQuestion, unknown.facultyAction].join(" "),
    )) {
      errors.push(
        "unknown-source-needed: leaving the question open must remain an available outcome",
      );
    }
    if (/\b(best guess|make an estimate anyway|guess|approximate it)\b/i.test(
      [unknown.definition, unknown.evidenceNeeded, unknown.facultyAction, unknown.example].join(" "),
    )) {
      errors.push(
        "unknown-source-needed: converts an unknown into a guess. An unresolved claim stays " +
          "unresolved until a source, measurement, or reviewer resolves it.",
      );
    }
  }

  // Prose-level guards across every record and the status note.
  const allProse = [
    claimStatusNote,
    ...claimStatuses.flatMap((s) => [
      s.definition,
      s.evidenceNeeded,
      s.uncertaintyQuestion,
      s.facultyAction,
      s.example,
    ]),
  ].join(" ");

  if (/\bconfident answers are (usually|probably|often) wrong\b/i.test(allProse)) {
    errors.push("must not claim that confident answers are usually wrong");
  }
  if (/\b(hesitant|cautious) answers are (more|usually) (reliable|accurate)\b/i.test(allProse)) {
    errors.push("must not treat hesitant wording as evidence of accuracy");
  }
  if (/\b(a )?(citation|source link) (proves|confirms|verifies)\b/i.test(allProse)) {
    errors.push("must not treat a citation as proof of the characterization it is attached to");
  }
  if (/\bthe (model|system) (knows|believes|doubts|feels|is unsure)\b/i.test(allProse)) {
    errors.push(
      "a record gives the system knowledge, belief, doubt, or feeling. Describe what the response " +
        "states and what supports it instead.",
    );
  }
  if (!claimStatusNote || !/\bdoes not mean universally controlling\b/i.test(claimStatusNote)) {
    errors.push(
      'the status note must deny that "directly supported" means universally controlling or complete',
    );
  }
  if (!/\bcan change status\b/i.test(claimStatusNote)) {
    errors.push("the status note must state that a claim's status changes as evidence is added");
  }

  return { errors, warnings };
}

const validation = validateClaimStatuses();
if (validation.errors.length) {
  throw new Error(`AI claim statuses are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[ai-claim-statuses] ${w}`);
}

// =============================================================================
// Three things agreement can mean.
//
// The distinction the guide turns on: agreement inside a conversation is not
// independent confirmation, but it is not automatically a defect either. The
// prompt may have asked for advocacy, it may have handed over an untested premise
// as though it were settled, or the evidence may genuinely support the conclusion.
// Those need different responses, so they are three records rather than one
// warning.
//
// What the validator refuses to let this record say:
//
//   - that requested advocacy confirms anything;
//   - that an inherited premise has been tested;
//   - that evidence-based agreement is independently verified;
//   - that a polite or warm response is therefore sycophantic;
//   - that every agreeable answer is false.
//
// Each is a real way to get this wrong, and each would make the guide teach the
// opposite of what it is for. There is no classifier here, no score, and no
// verdict: a reader identifies the job their own prompt assigned.
// =============================================================================

export type AgreementType = {
  id: string;
  title: string;
  /** What the prompt did, in mechanical terms — never a claim about intent. */
  whatHappened: string;
  /** A prompt of that shape, so a reader recognizes their own. */
  examplePrompt: string;
  whatItDoesNotProve: string;
  nextMove: string;
  displayOrder: number;
};

export const agreementTypes: AgreementType[] = [
  {
    id: "requested-advocacy",
    title: "You asked for advocacy",
    whatHappened:
      "The prompt explicitly told the system to defend, strengthen, celebrate, or make the best case for a position.",
    examplePrompt:
      "Explain why this is an excellent proposal and give me the strongest arguments for adopting it.",
    whatItDoesNotProve:
      "That the proposal is correct, well supported, better than the alternatives, or independently endorsed.",
    nextMove:
      "Label the result as advocacy. Request a separate credible challenge before using it for a decision.",
    displayOrder: 1,
  },
  {
    id: "inherited-premise",
    title: "You supplied the conclusion as a premise",
    whatHappened:
      "The prompt presented a disputed factual, legal, causal, or pedagogical claim as though it had already been established.",
    examplePrompt:
      "Because this activity improves critical thinking, how should I require it in every class?",
    whatItDoesNotProve:
      "That the activity improves the intended learning, or that the stated causal claim has been tested.",
    nextMove:
      "Rewrite the premise as a question: “Does this activity advance the stated learning objective, under what conditions, and based on what evidence?”",
    displayOrder: 2,
  },
  {
    id: "evidence-based-agreement",
    title: "The evidence may support the conclusion",
    whatHappened:
      "The response agrees while identifying assumptions, contrary considerations, source support, uncertainty, and conditions that could change the conclusion.",
    examplePrompt:
      "Evaluate whether the available evidence supports this proposal. State the strongest contrary case and what findings would change the assessment.",
    whatItDoesNotProve:
      "That the cited sources are authoritative, accurately characterized, complete, current, or sufficient for the real decision.",
    nextMove:
      "Open the material sources. Check the characterization and decide whether the evidence and criteria fit the actual setting.",
    displayOrder: 3,
  },
];

/**
 * Rendered beneath the three records. Tone and substance are different things,
 * and a reader who treats a friendly opening as evidence of sycophancy has
 * swapped one reading error for another.
 */
export const agreementToneNote =
  "A warm opening is tone, not necessarily agreement. Read the substantive claims before diagnosing the response.";

export function orderedAgreementTypes(): AgreementType[] {
  return [...agreementTypes].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

/** The three ids the guide is built around. Exactly these, in this order. */
const REQUIRED_IDS = ["requested-advocacy", "inherited-premise", "evidence-based-agreement"];

export type AgreementValidation = { errors: string[]; warnings: string[] };

export function validateAgreementTypes(): AgreementValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const ids = orderedAgreementTypes().map((t) => t.id);
  if (ids.length !== REQUIRED_IDS.length || ids.some((id, i) => id !== REQUIRED_IDS[i])) {
    errors.push(
      `expected exactly [${REQUIRED_IDS.join(", ")}] in that order, found [${ids.join(", ")}]`,
    );
  }

  const seenOrders = new Set<number>();
  for (const t of agreementTypes) {
    const where = `agreement type ${t.id}`;
    for (const field of [
      "title",
      "whatHappened",
      "examplePrompt",
      "whatItDoesNotProve",
      "nextMove",
    ] as const) {
      if (!t[field]) errors.push(`${where}: missing ${field}`);
    }
    if (seenOrders.has(t.displayOrder)) errors.push(`${where}: duplicate displayOrder`);
    seenOrders.add(t.displayOrder);

    // No record may describe the system as having wants, beliefs, or feelings.
    // The guide's whole method is to talk about what the prompt assigned.
    const prose = `${t.whatHappened} ${t.whatItDoesNotProve} ${t.nextMove}`;
    if (/\bit (wants|believes|is afraid|likes|cares|hopes)\b/i.test(prose)) {
      errors.push(`${where}: describes the system as wanting, believing, or fearing something`);
    }
  }

  const advocacy = agreementTypes.find((t) => t.id === "requested-advocacy");
  if (advocacy) {
    if (!/\b(defend|strengthen|celebrate|best case)\b/i.test(advocacy.whatHappened)) {
      errors.push("requested-advocacy: whatHappened must say the prompt asked for a case to be made");
    }
    // The single most consequential misreading: treating an assigned defense as
    // an endorsement.
    // "independently endorsed" and "independent confirmation" both count: the
    // stem matters, not the inflection.
    if (!/(confirm|endors|verif|prove)/i.test(advocacy.whatItDoesNotProve)) {
      errors.push(
        "requested-advocacy: whatItDoesNotProve must deny endorsement or confirmation explicitly",
      );
    }
    if (/\b(confirms|is confirmation|endorsement that|proves)\b/i.test(advocacy.whatHappened)) {
      errors.push("requested-advocacy: must not be described as confirmation");
    }
  }

  const premise = agreementTypes.find((t) => t.id === "inherited-premise");
  if (premise) {
    if (!/\bas though it had already been established\b|\bpresented\b/i.test(premise.whatHappened)) {
      errors.push("inherited-premise: whatHappened must say the claim arrived already assumed");
    }
    if (!/\b(has been tested|tested)\b/i.test(premise.whatItDoesNotProve)) {
      errors.push(
        "inherited-premise: whatItDoesNotProve must state that the premise has not been tested",
      );
    }
    if (/\b(tested evidence|established evidence|verified premise)\b/i.test(premise.whatHappened)) {
      errors.push("inherited-premise: must not be described as tested evidence");
    }
    // The move is to turn the premise back into a question.
    if (!/\?/.test(premise.nextMove)) {
      errors.push("inherited-premise: nextMove must restate the premise as a question");
    }
  }

  const evidenceBased = agreementTypes.find((t) => t.id === "evidence-based-agreement");
  if (evidenceBased) {
    if (!/\b(authoritative|accurately characterized|complete|current)\b/i.test(evidenceBased.whatItDoesNotProve)) {
      errors.push(
        "evidence-based-agreement: whatItDoesNotProve must keep the source qualifications — agreement " +
          "with evidence is still not independent verification",
      );
    }
    if (/\bindependently verified\b|\bverified evidence\b/i.test(evidenceBased.whatHappened)) {
      errors.push(
        "evidence-based-agreement: must not be described as independently verified. The reader still " +
          "opens the sources.",
      );
    }
    if (!/\bOpen the\b|\bsources\b/i.test(evidenceBased.nextMove)) {
      errors.push("evidence-based-agreement: nextMove must send the reader to the sources");
    }
  }

  // The tone note is the guard against the opposite error, so it has to exist and
  // has to say that tone is not the diagnosis.
  if (!agreementToneNote) {
    errors.push("missing the tone note");
  } else {
    if (!/\btone\b/i.test(agreementToneNote)) {
      errors.push("the tone note must distinguish tone from agreement");
    }
    if (!/\bnot necessarily\b|\bbefore diagnosing\b/i.test(agreementToneNote)) {
      errors.push("the tone note must stop a warm opening from being read as agreement");
    }
  }

  // Nothing in the record may claim that agreeable answers are false as a class.
  const allProse = [
    agreementToneNote,
    ...agreementTypes.flatMap((t) => [t.whatHappened, t.whatItDoesNotProve, t.nextMove]),
  ].join(" ");
  if (/\bevery agreeable (answer|response)\b[^.]*\b(false|wrong|sycophan)/i.test(allProse)) {
    errors.push("must not claim that every agreeable response is false or sycophantic");
  }
  if (/\b(polite|warm|friendly)\b[^.]*\bsycophan/i.test(allProse)) {
    errors.push("must not treat a polite or warm response as sycophancy");
  }

  return { errors, warnings };
}

const validation = validateAgreementTypes();
if (validation.errors.length) {
  throw new Error(`Agreement types are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[ai-agreement-types] ${w}`);
}

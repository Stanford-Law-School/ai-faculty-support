// =============================================================================
// The reusable evidence-and-uncertainty prompt.
//
// "Give me a confidence score" asks for one more generated sentence. This prompt
// asks for the structure underneath it: nine sections per material claim, an
// instruction to write SOURCE NEEDED rather than invent a citation, and a bar the
// system must clear before offering a numeric percentage at all.
//
// The validator enforces the nine sections in order, the SOURCE NEEDED
// instruction, the prohibition on invented citations, the calibration
// preconditions, and the stated limits — including the two that matter most: the
// ledger is not verification, and the consequential decision is not the system's
// to make.
// =============================================================================

export type EvidenceUncertaintyPrompt = {
  id: string;
  title: string;
  useCase: string;
  promptText: string;
  limitations: string[];
  relatedGuideSlugs: string[];
  reviewedOn: string;
  reviewCadence: string;
  displayOrder: number;
};

export const evidenceUncertaintyPrompts: EvidenceUncertaintyPrompt[] = [
  {
    id: "evidence-and-uncertainty-ledger",
    title: "Evidence-and-uncertainty prompt",
    useCase:
      "Reviewing a generated answer, memo, recommendation, explanation, course-design proposal, or research summary before relying on it.",
    promptText: `Review the response below. Do not merely rewrite it in a more cautious tone.

RESPONSE TO REVIEW:
[INSERT PUBLIC OR APPROVED MATERIAL]

Create an EVIDENCE AND UNCERTAINTY LEDGER.

For every material claim:

1. CLAIM
Quote or restate the exact claim.

2. STATUS
Assign one:

- Directly supported
- Interpretation or inference
- Prediction or estimate
- Recommendation or value judgment
- Unknown or source needed

3. EVIDENCE
Identify the exact source, passage, data, method, or record supporting the claim.

If none is available, write:

SOURCE NEEDED

Do not invent a citation or source.

4. EVIDENCE BOUNDARY
State what the evidence establishes and what it does not establish.

5. UNCERTAINTY
Identify:

- Assumptions
- Missing information
- Alternative explanations or interpretations
- Relevant range or variation
- Affected groups or contexts
- Source or version limitations

6. PRECISION CHECK
Flag exact numbers, percentages, dates, rankings, causal claims, or universal wording that lack a stated basis.

7. DISCONFIRMING EVIDENCE
State what evidence would materially weaken, reverse, or qualify the claim.

8. NEXT CHECK
Identify the source, measurement, clarification, pilot, or human review that should happen next.

9. REVISED WORDING
Rewrite the claim so that its wording matches the evidence currently available.

Do not provide a numerical confidence percentage unless you can identify:

- The calibration method
- The comparison set
- The relevant task domain
- Evidence that the estimate is calibrated for comparable cases

When those are unavailable, omit the percentage and explain the uncertainty directly.

Do not present the ledger as independent verification. The user must open the sources and make the consequential decision.`,
    limitations: [
      "The system may misclassify claims.",
      "It may overlook material uncertainty.",
      "It may cite a source that does not support the characterization.",
      "Its self-reported uncertainty is generated output.",
      "The ledger must be compared with the actual sources and task.",
    ],
    relatedGuideSlugs: [
      "why-does-it-sound-so-certain",
      "verify-an-ai-legal-claim",
      "why-did-it-forget",
      "why-does-it-agree-with-me",
      "which-ai-tool-fits",
    ],
    reviewedOn: "2026-08-05",
    reviewCadence: "Review annually",
    displayOrder: 1,
  },
];

/** Rendered beneath the prompt. A ledger locates checking; it does not do it. */
export const evidenceUncertaintyPromptNote =
  "The ledger can reveal where checking is needed. It cannot verify its own sources or certify its own confidence.";

export function getEvidenceUncertaintyPrompt(id: string): EvidenceUncertaintyPrompt {
  const prompt = evidenceUncertaintyPrompts.find((p) => p.id === id);
  if (!prompt) throw new Error(`Unknown evidence-and-uncertainty prompt: ${id}`);
  return prompt;
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const REQUIRED_SECTIONS = [
  "CLAIM",
  "STATUS",
  "EVIDENCE",
  "EVIDENCE BOUNDARY",
  "UNCERTAINTY",
  "PRECISION CHECK",
  "DISCONFIRMING EVIDENCE",
  "NEXT CHECK",
  "REVISED WORDING",
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** What the system must be able to identify before a percentage means anything. */
const CALIBRATION_REQUIREMENTS = [
  "The calibration method",
  "The comparison set",
  "The relevant task domain",
  "Evidence that the estimate is calibrated for comparable cases",
];

export type EvidencePromptValidation = { errors: string[]; warnings: string[] };

export function validateEvidenceUncertaintyPrompts(): EvidencePromptValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const seenIds = new Set<string>();
  for (const p of evidenceUncertaintyPrompts) {
    const where = `prompt ${p.id}`;
    if (seenIds.has(p.id)) errors.push(`${where}: duplicate id`);
    seenIds.add(p.id);
    for (const field of ["title", "useCase", "promptText", "reviewCadence"] as const) {
      if (!p[field]) errors.push(`${where}: missing ${field}`);
    }
    if (!ISO_DATE.test(p.reviewedOn)) errors.push(`${where}: reviewedOn is not a valid ISO date`);
    if (p.limitations.length < 4) errors.push(`${where}: needs at least four stated limitations`);
    if (!p.relatedGuideSlugs.length) errors.push(`${where}: needs related guides`);

    // The nine sections, in order. A ledger that asked for evidence after the
    // revised wording would have the reader rewrite before checking.
    let cursor = -1;
    for (const section of REQUIRED_SECTIONS) {
      const at = p.promptText.indexOf(section, cursor + 1);
      if (at === -1) {
        errors.push(`${where}: the prompt is missing its ${section} section`);
        continue;
      }
      if (at < cursor) errors.push(`${where}: the ${section} section appears out of order`);
      cursor = at;
    }

    // All five statuses have to be offered, or the ledger silently drops one.
    for (const status of [
      "Directly supported",
      "Interpretation or inference",
      "Prediction or estimate",
      "Recommendation or value judgment",
      "Unknown or source needed",
    ]) {
      if (!p.promptText.includes(status)) {
        errors.push(`${where}: the status list must include "${status}"`);
      }
    }

    if (!/write:\s*\n\s*SOURCE NEEDED/.test(p.promptText)) {
      errors.push(`${where}: the prompt must require "SOURCE NEEDED" where no source is available`);
    }
    if (!/Do not invent a citation or source/i.test(p.promptText)) {
      errors.push(`${where}: the prompt must forbid inventing a citation or source`);
    }
    if (!/Do not merely rewrite it in a more cautious tone/i.test(p.promptText)) {
      errors.push(
        `${where}: the prompt must refuse a tone rewrite. A more cautious paraphrase is the output ` +
          "this prompt exists to replace.",
      );
    }
    // A percentage is allowed only when its basis can be named.
    if (!/Do not provide a numerical confidence percentage unless/i.test(p.promptText)) {
      errors.push(
        `${where}: the prompt must withhold a numeric confidence percentage until its basis can be ` +
          "identified",
      );
    }
    for (const requirement of CALIBRATION_REQUIREMENTS) {
      if (!p.promptText.includes(requirement)) {
        errors.push(`${where}: the calibration preconditions must include "${requirement}"`);
      }
    }
    if (!/omit the percentage and explain the uncertainty directly/i.test(p.promptText)) {
      errors.push(
        `${where}: when calibration cannot be identified, the prompt must ask for the uncertainty ` +
          "itself rather than an unexplained number",
      );
    }
    if (!/Do not present the ledger as independent verification/i.test(p.promptText)) {
      errors.push(`${where}: the prompt must deny that the ledger is independent verification`);
    }
    if (!/The user must open the sources and make the consequential decision/i.test(p.promptText)) {
      errors.push(
        `${where}: the prompt must leave the sources and the consequential decision with the user`,
      );
    }

    // The failure modes a prompt like this invites.
    for (const [pattern, why] of [
      [/\bGive (me )?(a|your) confidence (score|rating)\b/i, "asks only for a confidence score"],
      [/\bassume (the |your )?(percentage|estimate) is calibrated\b/i, "treats a percentage as calibrated"],
      [/\b(find|supply|generate|invent) (a )?(supporting )?(citation|source) (if|when) none\b/i, "instructs the system to supply a source it does not have"],
      [/\bthis (ledger|prompt) verifies\b/i, "presents the ledger as verification"],
      [/\b(you|the model|the system) (should |must )?decide whether to (rely|proceed)\b/i, "assigns the consequential decision to the model"],
    ] as const) {
      if (pattern.test(p.promptText)) {
        errors.push(`${where}: the prompt ${why}.`);
      }
    }

    // The limits must name the ledger's status honestly.
    const limits = p.limitations.join(" ");
    if (!/\bgenerated output\b/i.test(limits)) {
      errors.push(`${where}: the limitations must say the self-reported uncertainty is generated`);
    }
    if (!/\bcompared with the actual sources\b/i.test(limits)) {
      errors.push(`${where}: the limitations must require comparison with the actual sources`);
    }
    if (/\b(proves|verifies|guarantees|certifies)\b/i.test(limits)) {
      errors.push(`${where}: a limitation must not promise proof`);
    }
  }

  if (!evidenceUncertaintyPromptNote || !/\bcannot verify its own sources\b/i.test(evidenceUncertaintyPromptNote)) {
    errors.push("the prompt note must deny that the ledger verifies its own sources");
  }
  if (!/\bcertify its own confidence\b/i.test(evidenceUncertaintyPromptNote)) {
    errors.push("the prompt note must deny that the ledger certifies its own confidence");
  }

  return { errors, warnings };
}

const validation = validateEvidenceUncertaintyPrompts();
if (validation.errors.length) {
  throw new Error(
    `Evidence-and-uncertainty prompts are invalid:\n  - ${validation.errors.join("\n  - ")}`,
  );
}
for (const w of validation.warnings) {
  console.warn(`[evidence-uncertainty-prompts] ${w}`);
}

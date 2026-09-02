// =============================================================================
// The reusable context-receipt prompt.
//
// Used before an important next step in a long, mixed-purpose, or source-heavy
// conversation. It asks for eight things and forbids four, and the four matter as
// much as the eight: a receipt that claims access to an unavailable source, treats
// memory as a transcript, infers a missing policy, or starts drafting anyway is
// worse than no receipt, because it looks like confirmation.
//
// The validator enforces the eight sections in order, the source-labelling
// requirement, the four prohibitions, and the stated limits — including that the
// receipt is a self-report rather than an audit.
// =============================================================================

export type ContextReceiptPrompt = {
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

export const contextReceiptPrompts: ContextReceiptPrompt[] = [
  {
    id: "general-context-receipt",
    title: "Context-receipt prompt",
    useCase:
      "Checking what task, sources, instructions, and unresolved information should govern the next stage of a long or complex conversation.",
    promptText: `Before continuing, do not answer the substantive task.

Return a CONTEXT RECEIPT using only information you can currently inspect.

1. CURRENT TASK
What exact task do you believe we are completing now?

2. AUDIENCE AND OUTPUT
Who is the output for, and what form, length, and level of detail are required?

3. ACTIVE SOURCES
List every source you can currently inspect by exact title or description.

For each source, label it:

- Supplied in the current conversation
- Attached or selected file
- Retrieved through search or a database
- Connected source
- Persistent instruction or memory
- Inference only

4. BINDING CONSTRAINTS
List the instructions, exclusions, policy limits, definitions, and decisions that must govern the answer.

5. DECISIONS ALREADY MADE
List choices that should not be reopened unless a conflict requires it.

6. CONFLICTS OR AMBIGUITIES
Identify inconsistent instructions, competing source versions, unclear scope, or unresolved terminology.

7. MISSING OR INACCESSIBLE INFORMATION
State what you cannot currently inspect, retrieve, verify, or determine.

8. PROPOSED WORKING BRIEF
Provide a concise restatement of the task, sources, and constraints for my confirmation.

Do not:

- Claim access to hidden or unavailable sources.
- Treat memory as a verbatim record.
- Infer missing legal, policy, factual, or project details.
- Begin the substantive task until I confirm or correct the receipt.`,
    limitations: [
      "The receipt is generated self-report, not a technical audit.",
      "It may omit hidden product instructions or internal retrieval details.",
      "The user must compare it with the interface, source controls, and authoritative external record.",
      "Critical material should be reattached or quoted rather than trusted to memory alone.",
    ],
    relatedGuideSlugs: [
      "why-did-it-forget",
      "which-ai-tool-fits",
      "what-can-i-safely-share",
      "why-does-it-agree-with-me",
    ],
    reviewedOn: "2026-08-04",
    reviewCadence: "Review annually",
    displayOrder: 1,
  },
];

/** Rendered beneath the prompt. A receipt exposes gaps; it does not certify inputs. */
export const contextReceiptNote =
  "The receipt helps expose missing context. It does not prove that the system has reported every internal input or influence.";

export function getContextReceiptPrompt(id: string): ContextReceiptPrompt {
  const prompt = contextReceiptPrompts.find((p) => p.id === id);
  if (!prompt) throw new Error(`Unknown context-receipt prompt: ${id}`);
  return prompt;
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const REQUIRED_SECTIONS = [
  "CURRENT TASK",
  "AUDIENCE AND OUTPUT",
  "ACTIVE SOURCES",
  "BINDING CONSTRAINTS",
  "DECISIONS ALREADY MADE",
  "CONFLICTS OR AMBIGUITIES",
  "MISSING OR INACCESSIBLE INFORMATION",
  "PROPOSED WORKING BRIEF",
];

/** The four prohibitions. Each one is a way a receipt becomes false comfort. */
const REQUIRED_PROHIBITIONS: [RegExp, string][] = [
  [/Claim access to hidden or unavailable sources/i, "claiming access to unavailable sources"],
  [/Treat memory as a verbatim record/i, "treating memory as a verbatim record"],
  [/Infer missing legal, policy, factual, or project details/i, "inferring missing authoritative detail"],
  [/Begin the substantive task until I confirm/i, "starting the task before confirmation"],
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type PromptValidation = { errors: string[]; warnings: string[] };

export function validateContextReceiptPrompts(): PromptValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const seenIds = new Set<string>();
  for (const p of contextReceiptPrompts) {
    const where = `prompt ${p.id}`;
    if (seenIds.has(p.id)) errors.push(`${where}: duplicate id`);
    seenIds.add(p.id);
    for (const field of ["title", "useCase", "promptText", "reviewCadence"] as const) {
      if (!p[field]) errors.push(`${where}: missing ${field}`);
    }
    if (!ISO_DATE.test(p.reviewedOn)) errors.push(`${where}: reviewedOn is not a valid ISO date`);
    if (p.limitations.length < 3) errors.push(`${where}: needs at least three stated limitations`);
    if (!p.relatedGuideSlugs.length) errors.push(`${where}: needs related guides`);

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

    for (const [pattern, why] of REQUIRED_PROHIBITIONS) {
      if (!pattern.test(p.promptText)) {
        errors.push(`${where}: the prompt must forbid ${why}`);
      }
    }

    // Source labelling is what separates a supplied source from an inferred one.
    for (const label of ["Attached or selected file", "Persistent instruction or memory", "Inference only"]) {
      if (!p.promptText.includes(label)) {
        errors.push(`${where}: the source labels must include "${label}"`);
      }
    }
    if (!/using only information you can currently inspect/i.test(p.promptText)) {
      errors.push(`${where}: the prompt must restrict the receipt to what the system can inspect now`);
    }
    if (!/do not answer the substantive task/i.test(p.promptText)) {
      errors.push(`${where}: the prompt must stop the substantive task until the receipt is confirmed`);
    }

    // The limits have to name the receipt's status honestly.
    const limits = p.limitations.join(" ");
    if (!/\bnot a technical audit\b/i.test(limits)) {
      errors.push(`${where}: the limitations must say the receipt is not a technical audit`);
    }
    if (!/\bcompare it with\b/i.test(limits)) {
      errors.push(`${where}: the limitations must require comparison with the faculty member's record`);
    }
    if (/\b(proves|verifies|guarantees)\b/i.test(limits)) {
      errors.push(`${where}: a limitation must not promise proof`);
    }
  }

  if (!contextReceiptNote || !/\bdoes not prove\b/i.test(contextReceiptNote)) {
    errors.push("the prompt note must deny that the receipt proves what the system used");
  }

  return { errors, warnings };
}

const validation = validateContextReceiptPrompts();
if (validation.errors.length) {
  throw new Error(`Context-receipt prompts are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[context-receipt-prompts] ${w}`);
}

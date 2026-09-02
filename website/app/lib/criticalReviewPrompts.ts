// =============================================================================
// The reusable critical-review prompt.
//
// "Be honest" and "challenge me" state a preference. This prompt assigns work:
// restate the objective, expose the assumptions, build the case, break it, check
// the claims against inspectable sources, compare real options, and only then
// recommend — with the conditions that would change the recommendation.
//
// The validator enforces the seven sections and refuses the four ways a
// "critical" prompt gets subtly worse than no prompt at all: instructing the
// system to disagree, asking only for bluntness, demanding equal evidence for
// both sides, and letting the recommendation read as expert approval.
// =============================================================================

export type CriticalReviewPrompt = {
  id: string;
  title: string;
  useCase: string;
  promptText: string;
  /** What the prompt cannot do. Rendered, not a comment. */
  limitations: string[];
  relatedGuideSlugs: string[];
  reviewedOn: string;
  reviewCadence: string;
  displayOrder: number;
};

export const criticalReviewPrompts: CriticalReviewPrompt[] = [
  {
    id: "general-critical-review",
    title: "Critical-review prompt",
    useCase:
      "Evaluating a proposal, interpretation, course-design choice, plan, or recommendation without building the preferred conclusion into the task.",
    promptText: `Evaluate the proposal below without assuming that my preferred conclusion is correct.

PROPOSAL:
[INSERT PUBLIC OR APPROVED MATERIAL]

1. OBJECTIVE
Restate the objective and the decision neutrally.

2. ASSUMPTIONS
List the assumptions, predictions, value judgments, and important unknowns.

3. BUILD
Give the strongest evidence-based case for the proposal.

4. BREAK
Give the strongest credible case against it. Prioritize objections that would materially affect the objective. Do not manufacture weak objections or false balance.

5. CHECK
For each material factual, legal, pedagogical, technical, or policy claim:

- Identify an inspectable source when an appropriate source mode is active.
- Mark unsupported claims "SOURCE NEEDED."
- State what evidence would weaken or change the claim.
- Separate source content from generated interpretation.

6. OPTIONS
Compare:

- Proceed
- Pilot or narrow
- Modify
- Use a non-AI alternative
- Do not proceed

7. RECOMMENDATION
Recommend only after the analysis. State:

- Assumptions
- Uncertainty
- Conditions
- What would change the recommendation
- Which parts require human or institutional judgment

Do not agree merely because I stated a preference.
Do not oppose merely because I requested criticism.
Do not present the recommendation as independent expert approval.`,
    limitations: [
      "The prompt can structure challenge but cannot guarantee rigor.",
      "The response may still inherit framing from the conversation.",
      "Factual and legal claims require external verification.",
      "The system may not know every local constraint, stakeholder, or policy.",
      "Consequential decisions remain human and institutional.",
    ],
    relatedGuideSlugs: [
      "why-does-it-agree-with-me",
      "which-ai-tool-fits",
      "verify-an-ai-legal-claim",
      "what-can-i-safely-share",
    ],
    reviewedOn: "2026-08-04",
    reviewCadence: "Review annually",
    displayOrder: 1,
  },
];

/** Rendered beneath the prompt. A better prompt is not a better source. */
export const criticalReviewPromptNote =
  "A stronger prompt can produce a more useful review. It does not turn the response into independent evidence.";

export function getCriticalReviewPrompt(id: string): CriticalReviewPrompt {
  const prompt = criticalReviewPrompts.find((p) => p.id === id);
  if (!prompt) throw new Error(`Unknown critical-review prompt: ${id}`);
  return prompt;
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

/** The seven sections, in order. A missing one changes what the prompt assigns. */
const REQUIRED_SECTIONS = [
  "OBJECTIVE",
  "ASSUMPTIONS",
  "BUILD",
  "BREAK",
  "CHECK",
  "OPTIONS",
  "RECOMMENDATION",
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type PromptValidation = { errors: string[]; warnings: string[] };

export function validateCriticalReviewPrompts(): PromptValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const seenIds = new Set<string>();
  for (const p of criticalReviewPrompts) {
    const where = `prompt ${p.id}`;
    if (seenIds.has(p.id)) errors.push(`${where}: duplicate id`);
    seenIds.add(p.id);
    for (const field of ["title", "useCase", "promptText", "reviewCadence"] as const) {
      if (!p[field]) errors.push(`${where}: missing ${field}`);
    }
    if (!ISO_DATE.test(p.reviewedOn)) errors.push(`${where}: reviewedOn is not a valid ISO date`);
    if (p.limitations.length < 3) {
      errors.push(`${where}: needs at least three stated limitations`);
    }
    if (!p.relatedGuideSlugs.length) errors.push(`${where}: needs related guides`);

    // The seven sections, present and in order.
    let cursor = -1;
    for (const section of REQUIRED_SECTIONS) {
      const at = p.promptText.indexOf(section, cursor + 1);
      if (at === -1) {
        errors.push(`${where}: the prompt is missing its ${section} section`);
        continue;
      }
      if (at < cursor) {
        errors.push(`${where}: the ${section} section appears out of order`);
      }
      cursor = at;
    }

    // "SOURCE NEEDED" is how an unsupported claim stays visible instead of
    // dissolving into fluent prose.
    if (!/SOURCE NEEDED/.test(p.promptText)) {
      errors.push(`${where}: the prompt must require unsupported claims to be marked "SOURCE NEEDED"`);
    }

    // A prompt that instructs disagreement produces theatre, not review.
    if (/\b(always disagree|disagree with everything|find fault with everything|argue against everything)\b/i.test(
      p.promptText,
    )) {
      errors.push(`${where}: must not instruct the system to disagree automatically`);
    }
    // Bluntness is a tone, and a prompt that asks only for it assigns no work.
    const withoutSections = p.promptText.replace(/\b(OBJECTIVE|ASSUMPTIONS|BUILD|BREAK|CHECK|OPTIONS|RECOMMENDATION)\b/g, "");
    if (/\bbrutally honest\b/i.test(withoutSections) && !/\bSOURCE NEEDED\b/.test(p.promptText)) {
      errors.push(`${where}: asks for bluntness instead of assigning review work`);
    }
    // False balance: equal evidence on both sides is not a requirement of honesty.
    if (/\b(equal (evidence|weight|number of (arguments|objections))|same amount of evidence)\b/i.test(
      p.promptText,
    )) {
      errors.push(`${where}: must not require equal evidence or equal weight for both sides`);
    }
    if (!/\bfalse balance\b/i.test(p.promptText)) {
      errors.push(`${where}: must explicitly forbid manufactured false balance`);
    }
    // Unsupported authority is the failure mode this site exists to prevent.
    if (/\b(cite any (case|authority)|invent(ed)? (citations|authority)|make up (a )?(case|citation))\b/i.test(
      p.promptText,
    )) {
      errors.push(`${where}: must not permit unsupported or invented legal authority`);
    }
    // The recommendation must not arrive dressed as approval.
    if (!/\bnot present the recommendation as independent expert approval\b/i.test(p.promptText)) {
      errors.push(
        `${where}: the prompt must forbid presenting its recommendation as independent expert approval`,
      );
    }
    if (!/\bRecommend only after\b/i.test(p.promptText)) {
      errors.push(`${where}: the recommendation must come after the analysis, not before it`);
    }
  }

  if (!criticalReviewPromptNote || !/\bnot\b/i.test(criticalReviewPromptNote)) {
    errors.push("the prompt note must deny that a better prompt creates independent evidence");
  }

  return { errors, warnings };
}

const validation = validateCriticalReviewPrompts();
if (validation.errors.length) {
  throw new Error(`Critical-review prompts are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[critical-review-prompts] ${w}`);
}

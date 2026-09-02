// =============================================================================
// Restate it. Reattach it. Review the context.
//
// Three steps for a conversation that has drifted. The order is the method: a
// restated task without the source is a guess, and a source without a restated
// task is a pile of material.
//
// The third step is the one most likely to be misdescribed. A context receipt is
// a generated self-report the faculty member compares with their own record — not
// an audit of what the product internally used. The validator refuses:
//
//   - a workflow that only asks "do you remember?";
//   - a step that omits the source's identity or version;
//   - a receipt described as a technical audit or proof of internal state;
//   - a step asking the system to infer missing authoritative content;
//   - a final step without human comparison against the source record.
// =============================================================================

export type RecoveryStep = {
  id: string;
  number: number;
  title: string;
  /** What the faculty member does. */
  action: string;
  /** What that step has to contain to be worth doing. */
  include: string[];
  commonFailure: string;
  /** What the step produces. */
  output: string;
  displayOrder: number;
};

export const recoverySteps: RecoveryStep[] = [
  {
    id: "restate-task",
    number: 1,
    title: "Restate the task",
    action: "State the current objective as though the conversation began here.",
    include: [
      "The decision or product needed",
      "The audience",
      "The desired output",
      "Decisions already made",
      "Binding constraints",
      "What is outside scope",
    ],
    commonFailure:
      "Using “continue what we were doing” when the conversation contains several possible tasks.",
    output: "A compact statement of the current job.",
    displayOrder: 1,
  },
  {
    id: "reattach-authority",
    number: 2,
    title: "Reattach the authority",
    action: "Supply or select the exact material that must govern the answer.",
    include: [
      "Current source title",
      "Date or version",
      "Relevant passage or section",
      "Active file or notebook selection",
      "Current policy or legal authority",
      "Any source the response must not go beyond",
    ],
    commonFailure:
      "Assuming that a file, link, policy, or earlier quotation remains available and current merely because it appeared before.",
    output: "An explicit, inspectable source set.",
    displayOrder: 2,
  },
  {
    id: "review-context-receipt",
    number: 3,
    title: "Review the context receipt",
    action:
      "Before substantive work, ask the system to summarize the task, active sources, constraints, decisions, conflicts, and missing information it believes should govern the answer.",
    include: [
      "Task",
      "Audience and output",
      "Source list",
      "Binding constraints",
      "Decisions already made",
      "Conflicts or ambiguity",
      "Missing or inaccessible information",
    ],
    commonFailure:
      "Treating the generated receipt as a technical audit rather than comparing it with the faculty member’s own record and the visible source controls.",
    output: "A corrected working brief that the faculty member has confirmed.",
    displayOrder: 3,
  },
];

/** The one line the guide asks a reader to remember. */
export const recoveryShortForm = "Restate it. Reattach it. Review the context.";

/** Rendered below the steps, so the receipt's status is stated rather than implied. */
export const receiptScopeNote =
  "A context receipt is a working checkpoint, not a forensic log. It cannot prove the exact hidden system instructions, internal retrieval process, or every factor that shaped the response.";

export function orderedRecoverySteps(): RecoveryStep[] {
  return [...recoverySteps].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const REQUIRED_IDS = ["restate-task", "reattach-authority", "review-context-receipt"];

export type RecoveryValidation = { errors: string[]; warnings: string[] };

export function validateRecoveryWorkflow(): RecoveryValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const ids = orderedRecoverySteps().map((s) => s.id);
  if (ids.length !== REQUIRED_IDS.length || ids.some((id, i) => id !== REQUIRED_IDS[i])) {
    errors.push(
      `expected exactly [${REQUIRED_IDS.join(", ")}] in that order, found [${ids.join(", ")}]`,
    );
  }

  const seenOrders = new Set<number>();
  for (const s of recoverySteps) {
    const where = `step ${s.id}`;
    for (const field of ["title", "action", "commonFailure", "output"] as const) {
      if (!s[field]) errors.push(`${where}: missing ${field}`);
    }
    if (s.include.length < 3) errors.push(`${where}: needs at least three items to include`);
    if (seenOrders.has(s.displayOrder)) errors.push(`${where}: duplicate displayOrder`);
    seenOrders.add(s.displayOrder);
    if (s.number !== s.displayOrder) {
      errors.push(`${where}: number ${s.number} does not match displayOrder ${s.displayOrder}`);
    }
  }

  const restate = recoverySteps.find((s) => s.id === "restate-task");
  if (restate) {
    if (!/\bas though the conversation began here\b/i.test(restate.action)) {
      errors.push(
        "restate-task: the action must ask for the task stated from scratch — a reminder is not a restatement",
      );
    }
    if (!restate.include.some((i) => /constraint/i.test(i))) {
      errors.push("restate-task: must include the binding constraints");
    }
  }

  const reattach = recoverySteps.find((s) => s.id === "reattach-authority");
  if (reattach) {
    // Identity and version are the whole point of this step.
    if (!reattach.include.some((i) => /title/i.test(i))) {
      errors.push("reattach-authority: must include the source's identity");
    }
    if (!reattach.include.some((i) => /(date|version)/i.test(i))) {
      errors.push(
        "reattach-authority: must include the source's date or version. A source without a version is " +
          "not an authority.",
      );
    }
    if (!/\bSupply or select\b/i.test(reattach.action)) {
      errors.push("reattach-authority: the action must supply or select the material, not describe it");
    }
  }

  const review = recoverySteps.find((s) => s.id === "review-context-receipt");
  if (review) {
    if (!/\bBefore substantive work\b/i.test(review.action)) {
      errors.push("review-context-receipt: the receipt has to come before the substantive work");
    }
    if (!review.include.some((i) => /missing|inaccessible/i.test(i))) {
      errors.push(
        "review-context-receipt: must ask what the system cannot access — the omission a receipt is " +
          "most useful for surfacing",
      );
    }
    // Human comparison is the step. A receipt read as an audit is the failure.
    if (!/\bcomparing it with the faculty member’s own record\b/i.test(review.commonFailure)) {
      errors.push(
        "review-context-receipt: commonFailure must name the audit misreading and require comparison " +
          "with the faculty member's own record",
      );
    }
    if (!/\bconfirmed\b/i.test(review.output)) {
      errors.push("review-context-receipt: the output must be a brief the faculty member has confirmed");
    }
  }

  const allProse = [
    recoveryShortForm,
    receiptScopeNote,
    ...recoverySteps.flatMap((s) => [s.action, s.commonFailure, s.output, ...s.include]),
  ].join(" ");

  // A workflow that just asks the system to remember is the thing this replaces.
  if (/\b(do|what do) you remember\b/i.test(allProse) && !/\bnot\b/i.test(allProse)) {
    errors.push('the workflow must not rely on asking "do you remember?"');
  }
  if (/\b(infer|reconstruct|fill in) the (missing|unavailable) (source|policy|authority|facts?)\b/i.test(allProse)) {
    errors.push("the workflow must not ask the system to infer missing authoritative content");
  }
  if (/\breceipt\b[^.]*\b(audit|proves|proof|verifies)\b/i.test(receiptScopeNote.replace(/\bnot\b[^.]*/gi, ""))) {
    errors.push("the receipt must not be described as an audit or as proof of internal state");
  }
  if (!/\bnot a forensic log\b/i.test(receiptScopeNote)) {
    errors.push("the scope note must say the receipt is not a forensic log");
  }
  if (recoveryShortForm !== "Restate it. Reattach it. Review the context.") {
    errors.push(
      `the short form reads "${recoveryShortForm}". It is the line the guide asks a reader to remember, ` +
        "and it must match the three steps.",
    );
  }

  return { errors, warnings };
}

const validation = validateRecoveryWorkflow();
if (validation.errors.length) {
  throw new Error(`Context-recovery workflow is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[context-recovery-workflow] ${w}`);
}

// =============================================================================
// Four places the information might be — and only one of them is yours.
//
// A continuing conversation makes the current thread, a memory feature, an active
// source set, and the faculty member's own record feel like one continuous store.
// They are not, and the differences are exactly where a workflow drifts.
//
// What the validator refuses to let these records say:
//
//   - that memory is a verbatim transcript;
//   - that what is visible in the interface is what the model is working from;
//   - that a source's presence proves it is active;
//   - that the AI conversation is the authoritative project record;
//   - that every product manages context the same way.
//
// Each of those is a plausible sentence that would make the guide teach the
// opposite of its own lesson. Current product behavior is deliberately absent:
// that lives in ./currentContextFeatures.ts, which carries its own review date.
// =============================================================================

export type ContextLocation = {
  id: string;
  title: string;
  whatItContains: string;
  /** Why being *somewhere* does not make it govern the next response. */
  whyItMayNotControl: string;
  /** What the faculty member does about it. */
  facultyCheck: string;
  /** A concrete instance, so the distinction is not abstract. */
  example: string;
  displayOrder: number;
};

export const contextLocations: ContextLocation[] = [
  {
    id: "current-conversation",
    title: "The current conversation",
    whatItContains:
      "The current prompt and the portion of the conversation that the product makes available for generating the next response.",
    whyItMayNotControl:
      "Long threads consume finite context. Products may manage older material through rolling context, summarization, compaction, or retrieval. Newer instructions may also conflict with or supersede earlier ones.",
    facultyCheck:
      "Restate any instruction, definition, decision, or quotation that must control the next answer.",
    example:
      "“Use the faculty version, not the student version” may have appeared many turns earlier and no longer be reliably controlling the output.",
    displayOrder: 1,
  },
  {
    id: "persistent-guidance",
    title: "Memory and persistent instructions",
    whatItContains:
      "Depending on the product and account, this may include saved preferences, account-wide instructions, project instructions, remembered facts, or selected information from earlier conversations.",
    whyItMayNotControl:
      "These features are selective, configurable, account-dependent, and not a verbatim project transcript. They may be unavailable, turned off, stale, incomplete, or scoped to a different project or workspace.",
    facultyCheck:
      "Review the relevant memory, account instruction, project instruction, or workspace setting. Do not treat it as the authoritative project record.",
    example:
      "A remembered preference for concise writing is different from a binding instruction to preserve a particular legal qualification.",
    displayOrder: 2,
  },
  {
    id: "active-sources-tools",
    title: "Active sources and tools",
    whatItContains:
      "Files, selected notebook sources, web results, legal databases, file-search results, connectors, or other sources activated for the current task.",
    whyItMayNotControl:
      "A source may exist in the workspace without being selected, retrieved, current, or available to the present conversation. A connected source may also expose a different version or broader scope than intended.",
    facultyCheck:
      "Confirm the exact active source set, source titles, versions, dates, and tools before relying on the response.",
    example:
      "A notebook may contain twelve sources while only four are selected for the current question.",
    displayOrder: 3,
  },
  {
    id: "authoritative-external-record",
    title: "Your authoritative record",
    whatItContains:
      "The original opinion, current policy, local notes, approved decisions, current draft, source ledger, or other material maintained outside the conversation.",
    whyItMayNotControl:
      "The system cannot use an external record merely because the user knows it exists. The record may never have been supplied, may have changed, or may no longer be available to the service.",
    facultyCheck:
      "Keep the authoritative material outside the conversation. Reattach, quote, or select the relevant current portion when it must control the work.",
    example:
      "A policy page updated yesterday should control over a summary generated from an older pasted version.",
    displayOrder: 4,
  },
];

/**
 * Rendered beneath the four locations. The sentence the whole section exists to
 * establish: visibility is not activation.
 */
export const contextVisibilityNote =
  "The fact that material is visible somewhere in the interface does not necessarily establish that it is active, current, or controlling for the next response.";

export function orderedContextLocations(): ContextLocation[] {
  return [...contextLocations].sort((a, b) => a.displayOrder - b.displayOrder);
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const REQUIRED_IDS = [
  "current-conversation",
  "persistent-guidance",
  "active-sources-tools",
  "authoritative-external-record",
];

export type ContextLocationValidation = { errors: string[]; warnings: string[] };

export function validateContextLocations(): ContextLocationValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const ids = orderedContextLocations().map((l) => l.id);
  if (ids.length !== REQUIRED_IDS.length || ids.some((id, i) => id !== REQUIRED_IDS[i])) {
    errors.push(
      `expected exactly [${REQUIRED_IDS.join(", ")}] in that order, found [${ids.join(", ")}]`,
    );
  }

  const seenOrders = new Set<number>();
  for (const l of contextLocations) {
    const where = `context location ${l.id}`;
    for (const field of [
      "title",
      "whatItContains",
      "whyItMayNotControl",
      "facultyCheck",
      "example",
    ] as const) {
      if (!l[field]) errors.push(`${where}: missing ${field}`);
    }
    if (seenOrders.has(l.displayOrder)) errors.push(`${where}: duplicate displayOrder`);
    seenOrders.add(l.displayOrder);
  }

  const conversation = contextLocations.find((l) => l.id === "current-conversation");
  if (conversation) {
    // The point of this record is that the thread is *working material*, some of
    // which may no longer be in play. A record that says everything visible is in
    // context would delete the distinction.
    if (!/\bportion\b|\bavailable\b/i.test(conversation.whatItContains)) {
      errors.push(
        "current-conversation: whatItContains must describe the available portion, not the whole thread",
      );
    }
    if (!/(rolling|summariz|compact|retriev)/i.test(conversation.whyItMayNotControl)) {
      errors.push(
        "current-conversation: whyItMayNotControl must name at least one way a product manages growth",
      );
    }
  }

  const persistent = contextLocations.find((l) => l.id === "persistent-guidance");
  if (persistent) {
    if (!/\bnot a verbatim (project )?transcript\b/i.test(persistent.whyItMayNotControl)) {
      errors.push(
        "persistent-guidance: must state that memory is not a verbatim transcript — that is the " +
          "misreading this record exists to prevent",
      );
    }
    if (!/\bDo not treat it as the authoritative project record\b/i.test(persistent.facultyCheck)) {
      errors.push(
        "persistent-guidance: facultyCheck must refuse memory as the authoritative project record",
      );
    }
    if (/\b(complete|full|verbatim) (transcript|record|history)\b/i.test(persistent.whatItContains)) {
      errors.push("persistent-guidance: describes memory as a complete or verbatim record");
    }
    // Availability is per product and per account, and saying otherwise is the
    // second-most-likely error in this section.
    if (!/\b(account-dependent|configurable|selective)\b/i.test(persistent.whyItMayNotControl)) {
      errors.push(
        "persistent-guidance: must say the feature is selective and account-dependent rather than universal",
      );
    }
  }

  const sources = contextLocations.find((l) => l.id === "active-sources-tools");
  if (sources) {
    if (!/\bwithout being selected\b|\bnot .*selected\b/i.test(sources.whyItMayNotControl)) {
      errors.push(
        "active-sources-tools: must distinguish a source's presence from its being selected or retrieved",
      );
    }
    if (!/\bversions?\b/i.test(sources.facultyCheck)) {
      errors.push("active-sources-tools: facultyCheck must include the source version");
    }
  }

  const external = contextLocations.find((l) => l.id === "authoritative-external-record");
  if (external) {
    if (!/\boutside the conversation\b/i.test(external.facultyCheck)) {
      errors.push(
        "authoritative-external-record: facultyCheck must keep the authoritative material outside the " +
          "conversation",
      );
    }
    if (!/\bcannot use an external record\b|\bmerely because\b/i.test(external.whyItMayNotControl)) {
      errors.push(
        "authoritative-external-record: must state that knowing a record exists does not supply it",
      );
    }
  }

  // Prose-level guards across every record and the visibility note.
  const allProse = [
    contextVisibilityNote,
    ...contextLocations.flatMap((l) => [
      l.whatItContains,
      l.whyItMayNotControl,
      l.facultyCheck,
      l.example,
    ]),
  ].join(" ");

  if (/\beverything visible\b[^.]*\b(is in|enters) (the )?context\b/i.test(allProse)) {
    errors.push("must not equate the visible interface with the model's working context");
  }
  if (/\b(the )?(entire|whole) (chat|conversation) is (always )?sent\b/i.test(allProse)) {
    errors.push("must not claim the entire conversation is always sent to the model");
  }
  if (/\bevery (product|tool|service) (manages|handles|truncates)\b/i.test(allProse)) {
    errors.push(
      "must not claim every product manages context the same way — feature behavior varies by " +
        "product and workspace",
    );
  }
  if (/\b(file name|presence)\b[^.]*\b(proves|means|guarantees)\b[^.]*\bactive\b/i.test(allProse)) {
    errors.push("must not treat a source's presence as proof that it is active");
  }
  if (/\b(the )?(AI |chat )?conversation is (the |your )?authoritative\b/i.test(allProse)) {
    errors.push("must not describe the AI conversation as the authoritative project record");
  }
  // No anthropomorphism outside the guide's real-question title.
  if (/\bit (forgot|remembers|noticed|ignored|was distracted|wasn't paying attention)\b/i.test(allProse)) {
    errors.push(
      "a record describes the system as forgetting, remembering, noticing, or ignoring. Describe what " +
        "the response used instead.",
    );
  }
  // Nothing here may name a context size: it dates instantly and invites ranking.
  if (/\b\d[\d,.]*\s*(k|m)?\s*(tokens?|token window)\b/i.test(allProse)) {
    errors.push("must not state an exact context-window size — it dates immediately");
  }

  if (!contextVisibilityNote || !/\bdoes not necessarily establish\b/i.test(contextVisibilityNote)) {
    errors.push("the visibility note must stop visibility from implying activation");
  }

  return { errors, warnings };
}

const validation = validateContextLocations();
if (validation.errors.length) {
  throw new Error(`Context locations are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[ai-context-locations] ${w}`);
}

// =============================================================================
// Current context, memory, and source features — the dated insert.
//
// The guide's durable lesson is that context, persistent instructions, active
// sources, and the faculty member's own record are four different places. Which
// menu a product puts them behind is not durable at all: labels, defaults,
// retention rules, and workspace availability change. So every product-specific
// sentence lives here, behind a review date, and the guide's prose carries none of
// it.
//
// Past `reviewBy` the insert stops describing features and says a re-check is due,
// keeping only the official links. That is the whole point of separating it: an
// unmaintained page withholds the claim instead of repeating it.
//
// Product identity comes from the canonical registry in ./aiTools.ts — display
// name, access label, risk classification, and description are not restated here,
// so a renamed product is renamed once.
//
// Nothing is fetched. These summaries were read from the official pages by hand on
// the date below, and changing them requires a human and a commit.
// =============================================================================

import { getTool } from "./aiTools";

export type ContextFeatureRecord = {
  id: string;
  /** Must resolve in the canonical tool registry. */
  toolRegistryId: string;
  /** What this product currently separates, in its own vocabulary. */
  featureSummary: string;
  /** What a faculty member should look at before relying on the answer. */
  facultyCheck: string;
  /** The stated limit — never inferred, always attributable to the linked source. */
  limitation: string;
  sourceUrls: string[];
  verifiedOn: string;
  displayOrder: number;
};

export const currentContextFeatures = {
  title: "How current tools separate context, memory, and sources",
  verifiedOn: "2026-08-04",
  reviewBy: "2026-09-04",
  reviewCadence: "Monthly and before every interface-specific reuse",
  status: "published" as const,
  staleBehavior:
    "Replace current feature descriptions with “Current feature examples due for review,” retain official links, and preserve the durable guide.",
  /** Rendered above the records: this is a list of what to inspect, not a ranking. */
  intro:
    "These examples explain what to inspect, not which product is best. Features, workspace controls, retention, and interface labels can change.",
  staleMessage: "Current feature examples due for review",
  officialSourceUrls: [
    "https://uit.stanford.edu/aiplayground/faqs",
    "https://uit.stanford.edu/aiplayground",
    "https://help.openai.com/en/articles/8590148-memory-faq",
    "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features",
    "https://support.google.com/notebooklm/answer/16296687",
    "https://support.google.com/notebooklm/answer/16215270",
  ],
};

export const contextFeatureRecords: ContextFeatureRecord[] = [
  {
    id: "ai-playground-context",
    toolRegistryId: "stanford-ai-playground",
    featureSummary:
      "Stanford’s current FAQ describes the context limit as the total material a model can track across the conversation. The current AI Playground also separates cross-conversation Memories, File Search, attached files, and ordinary conversation history.",
    facultyCheck:
      "Check the Memories panel, confirm whether File Search is active, and confirm that the required attachment is still available.",
    limitation:
      "Current Stanford documentation says attachments and generated files are deleted daily, while ordinary text conversations may remain until the user deletes them. A saved conversation can therefore outlast an attachment it once used.",
    sourceUrls: ["https://uit.stanford.edu/aiplayground/faqs", "https://uit.stanford.edu/aiplayground"],
    verifiedOn: "2026-08-04",
    displayOrder: 1,
  },
  {
    id: "chatgpt-memory-context",
    toolRegistryId: "openai-chatgpt-edu",
    featureSummary:
      "OpenAI currently describes memory as an optional personalization layer that can draw on chats, files, connected apps, and saved information when enabled.",
    facultyCheck:
      "Review the workspace’s current memory controls and visible memory sources before assuming information from another conversation will apply.",
    limitation:
      "OpenAI states that memory summaries and displayed memory sources may not include every detail or factor. Feature availability and administrative controls vary by plan and workspace.",
    sourceUrls: ["https://help.openai.com/en/articles/8590148-memory-faq"],
    verifiedOn: "2026-08-04",
    displayOrder: 2,
  },
  {
    id: "claude-instruction-scope",
    toolRegistryId: "claude-for-education-chat",
    featureSummary:
      "Anthropic currently distinguishes account-wide instructions from project-specific instructions. Project instructions apply only inside the relevant project.",
    facultyCheck:
      "Confirm whether the conversation is inside the intended project and whether the controlling instruction is account-wide, project-specific, or present only in an earlier chat.",
    limitation:
      "Feature availability and workspace configuration may differ under Stanford’s current Claude for Education arrangement.",
    sourceUrls: [
      "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features",
    ],
    verifiedOn: "2026-08-04",
    displayOrder: 3,
  },
  {
    id: "notebook-active-sources",
    toolRegistryId: "google-notebooklm",
    featureSummary:
      "This notebook service currently allows users to select and unselect the sources used for a chat. Imported Google files are treated as copies and may require manual resynchronization after the original changes.",
    facultyCheck:
      "Confirm the selected source list and whether each imported source reflects the current version.",
    limitation:
      "A source’s presence in a notebook does not establish that it is selected, current, or sufficient for the question.",
    sourceUrls: [
      "https://support.google.com/notebooklm/answer/16296687",
      "https://support.google.com/notebooklm/answer/16215270",
    ],
    verifiedOn: "2026-08-04",
    displayOrder: 4,
  },
];

export function orderedContextFeatures(): ContextFeatureRecord[] {
  return [...contextFeatureRecords].sort((a, b) => a.displayOrder - b.displayOrder);
}

/** The current display name for a record's product, from the canonical registry. */
export function featureToolName(record: ContextFeatureRecord): string {
  return getTool(record.toolRegistryId)?.displayName ?? record.toolRegistryId;
}

/** Where the registry sends a reader for that product's own service details. */
export function featureToolDetailsUrl(record: ContextFeatureRecord): string | undefined {
  return getTool(record.toolRegistryId)?.detailsUrl;
}

export type ContextFeatureState =
  | { state: "current"; records: ContextFeatureRecord[]; label: string }
  | { state: "stale"; records: []; label: string };

/**
 * What the page may render. Past the review date the summaries are withheld and
 * the section says so — the official links stay, because a reader can still go and
 * check the current behavior themselves.
 */
export function displayableContextFeatures(
  today: string = new Date().toISOString().slice(0, 10),
): ContextFeatureState {
  if (today > currentContextFeatures.reviewBy) {
    return { state: "stale", records: [], label: currentContextFeatures.staleMessage };
  }
  return {
    state: "current",
    records: orderedContextFeatures(),
    label: `Feature examples checked ${formatFeatureDate(currentContextFeatures.verifiedOn)}`,
  };
}

export function formatFeatureDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type FeatureValidation = { errors: string[]; warnings: string[] };

export function validateContextFeatures(
  today: string = new Date().toISOString().slice(0, 10),
  options: { strict?: boolean } = {},
): FeatureValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const raise = (message: string) => {
    if (options.strict) errors.push(message);
    else warnings.push(message);
  };

  const insert = currentContextFeatures;
  for (const field of ["title", "reviewCadence", "staleBehavior", "intro", "staleMessage"] as const) {
    if (!insert[field]) errors.push(`missing ${field}`);
  }
  for (const field of ["verifiedOn", "reviewBy"] as const) {
    if (!ISO_DATE.test(insert[field])) errors.push(`${field} is not a valid ISO date`);
  }
  if (insert.reviewBy <= insert.verifiedOn) {
    errors.push("reviewBy must fall after verifiedOn");
  }
  if (!insert.officialSourceUrls.length) errors.push("missing officialSourceUrls");
  for (const url of insert.officialSourceUrls) {
    if (!/^https:\/\//.test(url)) errors.push(`official source "${url}" must be an https URL`);
  }
  if (!/due for review/i.test(insert.staleMessage)) {
    errors.push("the stale message must say the examples are due for review");
  }

  const seenIds = new Set<string>();
  const seenOrders = new Set<number>();

  for (const r of contextFeatureRecords) {
    const where = `feature record ${r.id}`;
    if (seenIds.has(r.id)) errors.push(`${where}: duplicate id`);
    seenIds.add(r.id);
    if (seenOrders.has(r.displayOrder)) errors.push(`${where}: duplicate displayOrder`);
    seenOrders.add(r.displayOrder);

    for (const field of ["featureSummary", "facultyCheck", "limitation"] as const) {
      if (!r[field]) errors.push(`${where}: missing ${field}`);
    }
    if (!ISO_DATE.test(r.verifiedOn)) errors.push(`${where}: verifiedOn is not a valid ISO date`);
    if (!r.sourceUrls.length) {
      errors.push(`${where}: needs at least one official source URL — a feature claim without a source`);
    }
    for (const url of r.sourceUrls) {
      if (!/^https:\/\//.test(url)) errors.push(`${where}: source "${url}" must be an https URL`);
      if (!insert.officialSourceUrls.includes(url)) {
        errors.push(`${where}: source "${url}" is not listed in officialSourceUrls`);
      }
    }

    // Identity comes from the registry, and only from the registry.
    const tool = getTool(r.toolRegistryId);
    if (!tool) {
      errors.push(
        `${where}: toolRegistryId "${r.toolRegistryId}" is not in the canonical tool registry`,
      );
    } else {
      // Restating the registry's description here is how two copies of a product
      // name start to disagree.
      if (r.featureSummary.includes(tool.conciseDescription)) {
        errors.push(
          `${where}: repeats the registry's product description. This record describes context, memory, ` +
            "and source features only.",
        );
      }
      if (tool.accessLabel && r.featureSummary.includes(tool.accessLabel)) {
        errors.push(`${where}: duplicates the registry's access label`);
      }
      const prose = `${r.featureSummary} ${r.facultyCheck} ${r.limitation}`;
      if (/\b(Low|Moderate|High) Risk\b/.test(prose)) {
        errors.push(
          `${where}: states a data-risk classification. Those come from the Stanford service snapshot, ` +
            "not from a feature note.",
        );
      }
      for (const formerName of tool.formerNames ?? []) {
        if (prose.includes(formerName)) {
          errors.push(`${where}: uses the former product name "${formerName}"`);
        }
      }
    }

    // Every product-specific claim must be hedged to the source and the date.
    if (!/\b(current|currently|states|describes|allows|distinguishes)\b/i.test(r.featureSummary)) {
      errors.push(
        `${where}: the feature summary must be attributed and time-bound ("currently describes…"), ` +
          "because it will change",
      );
    }
  }

  // Nothing here may become a ranking or a permanent technical fact.
  const allProse = [
    insert.intro,
    ...contextFeatureRecords.flatMap((r) => [r.featureSummary, r.facultyCheck, r.limitation]),
  ].join(" ");

  if (/\b\d[\d,.]*\s*(k|m|thousand|million)?\s*(tokens?|token (window|limit))\b/i.test(allProse)) {
    errors.push(
      "an exact context size appears. A number like that is stale within weeks and invites a ranking; " +
        "describe what to inspect instead.",
    );
  }
  if (/\b(largest|longest|biggest) context\b/i.test(allProse)) {
    errors.push("must not rank products by context size");
  }
  if (/\b(best|better) (for )?(memory|remembering|context)\b/i.test(allProse)) {
    errors.push("must not rank products by memory or context behavior");
  }
  if (/\b(all|every) Stanford accounts?\b/i.test(allProse)) {
    errors.push(
      "must not promise a feature is enabled for every Stanford account — availability varies by " +
        "workspace and plan",
    );
  }
  if (/\bmemory sources? (are|is) (complete|exhaustive)\b/i.test(allProse)) {
    errors.push("must not describe a memory-source display as exhaustive");
  }
  if (/\bselected sources? (guarantee|ensure)\b/i.test(allProse)) {
    errors.push("must not claim a selected source guarantees a correct characterization");
  }
  if (!/\bnot which product is best\b/i.test(insert.intro)) {
    errors.push("the intro must state that these examples are not a product comparison");
  }

  // Freshness. A month-old feature note is the most perishable content on the
  // site, so an overdue insert warns in development and can fail strict CI.
  if (ISO_DATE.test(insert.reviewBy) && today > insert.reviewBy) {
    const days = Math.round((Date.parse(today) - Date.parse(insert.reviewBy)) / 86_400_000);
    raise(
      `the current-feature insert is ${days} day(s) overdue for review (reviewBy ${insert.reviewBy}, ` +
        `today ${today}). The feature summaries are withheld from display until a maintainer re-reads ` +
        `${insert.officialSourceUrls[0]} and the other official pages.`,
    );
  }

  return { errors, warnings };
}

const validation = validateContextFeatures(undefined, {
  strict: process.env.SLS_STRICT_FEATURES === "1",
});
if (validation.errors.length) {
  throw new Error(`Current context features are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[current-context-features] ${w}`);
}

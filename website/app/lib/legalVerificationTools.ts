// =============================================================================
// Citator relationship records.
//
// These describe what a citator helps a researcher check. They deliberately
// store NO product names, providers, access labels, aliases, or product URLs:
// every one of those is read through toolRegistryId from the canonical registry
// in app/lib/aiTools.ts, so a product rename happens in exactly one place. The
// validator fails the build if a record duplicates a field the registry owns.
//
// No citator is ranked, and none is described as establishing that a source
// supports a proposition — that is what reading the authority is for.
// =============================================================================

import { getTool, type AiTool } from "./aiTools";

export type LegalVerificationTool = {
  id: string;
  /** Id in the canonical AI tool registry; the single source of product facts. */
  toolRegistryId: string;
  citatorName: string;
  officialCitatorUrl: string;
  primaryUse: string;
  historyUse: string;
  propositionCaveat: string;
  interfaceVerifiedOn: string;
  reviewBy: string;
  reviewCadence: string;
  staffReviewRequired: boolean;
  displayOrder: number;
};

export const legalVerificationTools: LegalVerificationTool[] = [
  {
    id: "shepards",
    toolRegistryId: "lexis-plus-protege",
    citatorName: "Shepard's",
    officialCitatorUrl: "https://www.lexisnexis.com/en-us/products/lexis/feature-good-law.page",
    primaryUse:
      "Retrieve legal sources and review the current treatment and history available through Shepard's.",
    historyUse:
      "Review direct history, citing references, editorial treatment, and signals relevant to the authority.",
    propositionCaveat:
      "Open the full source and all material treatment. A Shepard's signal does not establish that the source supports the exact proposition being written.",
    interfaceVerifiedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before any interface-specific reuse",
    staffReviewRequired: true,
    displayOrder: 1,
  },
  {
    id: "keycite",
    toolRegistryId: "westlaw-precision",
    citatorName: "KeyCite",
    officialCitatorUrl: "https://legal.thomsonreuters.com/en/products/westlaw/keycite",
    primaryUse:
      "Retrieve legal sources and review current validity, direct history, and citing references available through KeyCite.",
    historyUse:
      "Review history, citing references, treatment indicators, and any relevant overruling-risk information.",
    propositionCaveat:
      "Open the authority and relevant citing decisions. A KeyCite flag or absence of a flag does not establish that the source supports the exact proposition.",
    interfaceVerifiedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before any interface-specific reuse",
    staffReviewRequired: true,
    displayOrder: 2,
  },
  {
    id: "bcite",
    toolRegistryId: "bloomberg-law",
    citatorName: "BCITE",
    officialCitatorUrl: "https://pro.bloomberglaw.com/about/our-approach-to-ai/",
    primaryUse:
      "Retrieve legal sources and review the history, treatment, and validity information available through BCITE.",
    historyUse:
      "Use BCITE and linked materials to investigate whether a court opinion's holding remains valid and how later sources treat it.",
    propositionCaveat:
      "Open the full authority and relevant treatment. BCITE does not replace checking whether the cited passage supports the exact claim.",
    interfaceVerifiedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before any interface-specific reuse",
    staffReviewRequired: true,
    displayOrder: 3,
  },
];

export function orderedVerificationTools(): LegalVerificationTool[] {
  return [...legalVerificationTools].sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Pairs each citator with its canonical product record for rendering. */
export function verificationToolsWithProducts(): { citator: LegalVerificationTool; product: AiTool }[] {
  return orderedVerificationTools().map((citator) => {
    const product = getTool(citator.toolRegistryId);
    if (!product) {
      throw new Error(
        `Citator "${citator.id}" references missing tool registry record "${citator.toolRegistryId}".`,
      );
    }
    return { citator, product };
  });
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string) => ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

/** Fields the canonical registry owns; duplicating them here is a build error. */
const REGISTRY_OWNED_KEYS = [
  "displayName",
  "provider",
  "accessLabel",
  "accessUrl",
  "detailsUrl",
  "formerNames",
  "conciseDescription",
];

export type VerificationToolValidation = { errors: string[]; warnings: string[] };

export function validateVerificationTools(
  today = new Date().toISOString().slice(0, 10),
): VerificationToolValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();

  for (const t of legalVerificationTools) {
    const at = t.id || t.citatorName || "(unidentified citator)";
    if (!t.id) errors.push(`${at}: missing id`);
    if (seen.has(t.id)) errors.push(`${at}: duplicate id`);
    seen.add(t.id);

    if (!t.citatorName) errors.push(`${at}: missing citatorName`);
    if (!t.officialCitatorUrl) errors.push(`${at}: missing officialCitatorUrl`);
    if (!t.propositionCaveat) errors.push(`${at}: missing propositionCaveat`);
    if (!t.primaryUse) errors.push(`${at}: missing primaryUse`);
    if (!t.historyUse) errors.push(`${at}: missing historyUse`);
    if (!t.reviewCadence) errors.push(`${at}: missing reviewCadence`);
    if (!isValidIsoDate(t.interfaceVerifiedOn)) errors.push(`${at}: interfaceVerifiedOn is not a valid date`);
    if (!isValidIsoDate(t.reviewBy)) errors.push(`${at}: reviewBy is not a valid date`);
    else if (today > t.reviewBy) {
      warnings.push(`${at}: overdue for review (reviewBy ${t.reviewBy}, today ${today}).`);
    }

    if (!t.toolRegistryId) {
      errors.push(`${at}: missing toolRegistryId`);
    } else if (!getTool(t.toolRegistryId)) {
      errors.push(`${at}: references missing tool registry record "${t.toolRegistryId}"`);
    }

    // Product facts must be read from the registry, never restated here.
    for (const key of REGISTRY_OWNED_KEYS) {
      if (key in (t as unknown as Record<string, unknown>)) {
        errors.push(
          `${at}: must not duplicate "${key}" — read it from the canonical registry via toolRegistryId`,
        );
      }
    }

    // No ranking or comprehensiveness promises.
    const overclaim = /\b(best|superior|most comprehensive|comprehensive coverage|guarantee[ds]?|proves?)\b/i;
    for (const [field, value] of Object.entries({
      primaryUse: t.primaryUse,
      historyUse: t.historyUse,
      propositionCaveat: t.propositionCaveat,
    })) {
      if (overclaim.test(value)) {
        errors.push(`${at}: ${field} must not rank a citator or promise comprehensive coverage`);
      }
    }
  }

  return { errors, warnings };
}

const validation = validateVerificationTools();
if (validation.errors.length) {
  throw new Error(`Legal verification tool records are invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[legal-verification-tools] ${w}`);
}

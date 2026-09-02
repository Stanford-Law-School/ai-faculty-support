// =============================================================================
// Stanford AI service snapshot — the single authoritative local record.
//
// This is a DATED ORIENTATION SNAPSHOT transcribed by a human from Stanford
// University IT pages. It is never fetched at build time: the site must not
// depend on Stanford's page structure or uptime, and a classification must
// never change from a remote feed without a person reading the official source
// first.
//
// UPDATE PROCESS
//   1. Open the official Stanford AI Services Matrix.
//   2. Confirm the exact service name and service variant.
//   3. Confirm all four risk columns.
//   4. Review the approved-connectors page.
//   5. Review the service-specific UIT page.
//   6. Update the record, verifiedOn, and reviewBy.
//   7. Run tests (`npm run lint` and `npm run build` both validate this file).
//   8. Record the change in the repository history.
//
// The snapshot's dates are deliberately separate from any guide's review date:
// service listings move faster than the durable guidance that cites them, so
// changing one service row must not touch a guide's reviewedThrough.
// =============================================================================

/** Approval state is always a named status, never an unlabelled boolean. */
export type ApprovalStatus = "approved" | "not-approved" | "special-route" | "verify-locally";

/** The only labels that may appear in the interface, always as text. */
export const approvalLabels: Record<ApprovalStatus, string> = {
  approved: "Approved",
  "not-approved": "Not approved",
  "special-route": "Special route",
  "verify-locally": "Verify locally",
};

export type ServiceRecordStatus = "published" | "draft";

export type StanfordAiService = {
  id: string;
  provider: string;
  displayName: string;
  /**
   * Names Stanford or the vendor used previously. Kept as searchable aliases so
   * a rename does not orphan the record — never a second record.
   */
  formerNames?: string[];
  serviceVariant: string;
  accountBoundary: string;
  availableTo: string;
  lowRisk: ApprovalStatus;
  moderateRisk: ApprovalStatus;
  highRiskNonPhi: ApprovalStatus;
  highRiskPhi: ApprovalStatus;
  connectorCheckRequired: boolean;
  notes: string;
  officialUrl: string;
  sourceUrls: string[];
  verifiedOn: string;
  status: ServiceRecordStatus;
  displayOrder: number;
  /** Law Library-licensed services only; never inferred from library access. */
  localApprovalStatus?: ApprovalStatus;
  localApprovalOwner?: string;
};

export const snapshotMeta = {
  snapshotTitle: "Common Stanford AI services by data classification",
  verifiedOn: "2026-08-03",
  reviewBy: "2026-09-03",
  reviewCadence: "Monthly and before any major reuse",
  officialMatrixUrl: "https://uit.stanford.edu/ai/services/explore",
  approvedConnectorsUrl: "https://uit.stanford.edu/ai/connectors",
  riskClassificationUrl: "https://uit.stanford.edu/guide/riskclassifications",
  responsibleAiUrl: "https://uit.stanford.edu/security/responsibleai",
  owner: "Robert Crown Law Library",
  scopeNote:
    "This snapshot applies only to the Stanford-provided versions accessed as directed by Stanford University IT. It does not cover personal accounts, unlisted features, or locally licensed legal AI services.",
  globalCaveat:
    "A service-level approval does not by itself authorize every use. Separate purpose, minimum-necessary, connector, DRA, FERPA, HIPAA, IRB, clinic, research, contractual, and local-policy requirements may apply.",
} as const;

export const stanfordAiServices: StanfordAiService[] = [
  {
    id: "stanford-ai-playground",
    provider: "Stanford University IT",
    displayName: "Stanford AI Playground",
    serviceVariant: "AI Playground",
    accountBoundary: "Stanford SSO",
    availableTo: "Stanford faculty, staff, students, and eligible affiliates",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "approved",
    highRiskPhi: "not-approved",
    connectorCheckRequired: true,
    notes:
      "Approved through High Risk non-PHI data. Do not use PHI in Playground prompts or attachments. Check current feature and local-unit guidance before use.",
    officialUrl: "https://uit.stanford.edu/service/aiplayground",
    sourceUrls: [
      "https://uit.stanford.edu/service/aiplayground",
      "https://uit.stanford.edu/news/stanford-ai-playground-now-approved-high-risk-data",
      "https://uit.stanford.edu/aiplayground/faqs",
    ],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 1,
  },
  {
    id: "openai-chatgpt-edu",
    provider: "OpenAI",
    displayName: "OpenAI ChatGPT Edu",
    serviceVariant: "Stanford Edu workspace",
    accountBoundary: "Stanford-provided ChatGPT Edu account",
    availableTo: "Eligible Stanford faculty, staff, students, and postdocs",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "approved",
    highRiskPhi: "approved",
    connectorCheckRequired: true,
    notes:
      "The service is currently listed through High Risk PHI. Plugins, connectors, custom GPT actions, and related features require their own current review. Additional requirements may apply to a particular PHI or regulated workflow.",
    officialUrl: "https://uit.stanford.edu/service/openai-chatgpt-edu",
    sourceUrls: [
      "https://uit.stanford.edu/service/openai-chatgpt-edu",
      "https://uit.stanford.edu/ai/services/explore",
      "https://uit.stanford.edu/ai/connectors",
    ],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 2,
  },
  {
    id: "claude-for-education-chat",
    provider: "Anthropic",
    displayName: "Claude for Education — Claude Chat",
    serviceVariant: "Stanford Claude for Education workspace",
    accountBoundary: "Stanford-provided Claude account",
    availableTo: "Eligible Stanford faculty, staff, students, and postdocs",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "approved",
    highRiskPhi: "not-approved",
    connectorCheckRequired: true,
    notes:
      "Claude Chat is currently approved through High Risk non-PHI data. Claude Code, Claude Cowork, connectors, and PHI routing have feature-specific requirements; do not infer their status from the Claude Chat row.",
    officialUrl: "https://uit.stanford.edu/service/claude",
    sourceUrls: [
      "https://uit.stanford.edu/service/claude",
      "https://uit.stanford.edu/ai/services/explore",
      "https://uit.stanford.edu/ai/connectors",
    ],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 3,
  },
  {
    id: "google-gemini-enterprise",
    provider: "Google",
    displayName: "Google Gemini Enterprise Standard and Pro",
    serviceVariant: "Stanford Gemini Enterprise",
    accountBoundary: "Stanford Google account and Gemini Enterprise environment",
    availableTo: "Eligible Stanford faculty, staff, students, and postdocs",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "approved",
    highRiskPhi: "approved",
    connectorCheckRequired: true,
    notes:
      "Gemini Enterprise is currently listed through High Risk PHI. Connectors and agentic features must be checked separately. Additional requirements may apply to a particular PHI or regulated workflow.",
    officialUrl: "https://uit.stanford.edu/service/gemini-enterprise-ai",
    sourceUrls: [
      "https://uit.stanford.edu/service/gemini-enterprise-ai",
      "https://uit.stanford.edu/ai/services/explore",
      "https://uit.stanford.edu/ai/connectors",
    ],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 4,
  },
  {
    id: "google-gemini-chat",
    provider: "Google",
    displayName: "Google Gemini Chat",
    serviceVariant: "Basic Stanford-provided Gemini chat service",
    accountBoundary: "Stanford Google account",
    availableTo: "Eligible Stanford faculty, staff, and students",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "not-approved",
    highRiskPhi: "not-approved",
    connectorCheckRequired: false,
    notes: "Do not confuse this service with Gemini Enterprise.",
    officialUrl: "https://uit.stanford.edu/ai/services/explore",
    sourceUrls: ["https://uit.stanford.edu/ai/services/explore"],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 5,
  },
  {
    // The id is deployed and stable; only the public name changed. Renaming the
    // id would break dataClassificationRef links and every existing anchor.
    id: "google-notebooklm",
    provider: "Google",
    displayName: "Gemini Notebook",
    formerNames: ["Google NotebookLM", "NotebookLM"],
    serviceVariant: "Standalone source-grounded notebook in Stanford Google Workspace",
    accountBoundary: "Stanford Google account",
    availableTo: "Eligible Stanford faculty, staff, and students",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "not-approved",
    highRiskPhi: "not-approved",
    connectorCheckRequired: false,
    notes:
      "Stanford's service page now calls the standalone product Gemini Notebook, formerly Google NotebookLM. Stanford's broader AI Services Matrix may continue to display the older name during the naming transition. Do not confuse this service with NotebookLM Enterprise.",
    officialUrl: "https://uit.stanford.edu/service/gsuite/gemini-notebook",
    sourceUrls: [
      "https://uit.stanford.edu/service/gsuite/gemini-notebook",
      "https://uit.stanford.edu/ai/services/explore",
    ],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 6,
  },
  {
    id: "notebooklm-enterprise",
    provider: "Google",
    displayName: "NotebookLM Enterprise",
    serviceVariant: "NotebookLM within the Stanford Gemini Enterprise offering",
    accountBoundary: "Stanford Gemini Enterprise environment",
    availableTo: "Eligible Stanford faculty, staff, and students",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "approved",
    highRiskPhi: "approved",
    connectorCheckRequired: true,
    notes:
      "This is a different service from Google NotebookLM. Additional requirements may apply to a particular PHI or regulated workflow.",
    officialUrl: "https://uit.stanford.edu/service/gemini-enterprise-ai",
    sourceUrls: [
      "https://uit.stanford.edu/service/gemini-enterprise-ai",
      "https://uit.stanford.edu/ai/services/explore",
    ],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 7,
  },
  {
    id: "microsoft-copilot-chat",
    provider: "Microsoft",
    displayName: "Microsoft Copilot Chat",
    serviceVariant: "Standalone Copilot Chat",
    accountBoundary: "Stanford-authenticated Copilot Chat service",
    availableTo: "Eligible Stanford faculty, staff, and students",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "not-approved",
    highRiskPhi: "not-approved",
    connectorCheckRequired: false,
    notes: "Do not confuse this service with the paid Microsoft 365 Copilot service.",
    officialUrl: "https://uit.stanford.edu/service/microsoft365/mscopilotchat",
    sourceUrls: [
      "https://uit.stanford.edu/service/microsoft365/mscopilotchat",
      "https://uit.stanford.edu/ai/services/explore",
    ],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 8,
  },
  {
    id: "microsoft-365-copilot",
    provider: "Microsoft",
    displayName: "Microsoft 365 Copilot",
    serviceVariant: "Copilot integrated into the Stanford Microsoft 365 tenant",
    accountBoundary: "Licensed Stanford Microsoft 365 environment",
    availableTo: "Eligible licensed Stanford faculty, staff, and students",
    lowRisk: "approved",
    moderateRisk: "approved",
    highRiskNonPhi: "approved",
    highRiskPhi: "approved",
    connectorCheckRequired: true,
    notes:
      "This is a separate paid service from Microsoft Copilot Chat. Approval applies within the Stanford Microsoft 365 tenant and does not automatically extend to unreviewed add-ins, plugins, or external services. Additional requirements may apply to a particular PHI or regulated workflow.",
    officialUrl: "https://uit.stanford.edu/ai/services/explore",
    sourceUrls: [
      "https://uit.stanford.edu/ai/services/explore",
      "https://uit.stanford.edu/service/microsoft365/mscopilotchat",
    ],
    verifiedOn: "2026-08-03",
    status: "published",
    displayOrder: 9,
  },
];

// Law Library-licensed legal AI services. These are intentionally NOT published:
// library access does not by itself establish what nonpublic material may be
// uploaded, and no classification may be inferred from a licence. A row moves to
// status "published" only once RCLL supplies a current, service-specific
// classification with a source URL and an approval owner — which the validator
// below enforces.
export const localLegalAiServices: StanfordAiService[] = [
  {
    id: "rcll-harvey",
    provider: "Harvey",
    displayName: "Harvey",
    serviceVariant: "Robert Crown Law Library licence",
    accountBoundary: "Law Library-provided access",
    availableTo: "As directed by the Robert Crown Law Library",
    lowRisk: "verify-locally",
    moderateRisk: "verify-locally",
    highRiskNonPhi: "verify-locally",
    highRiskPhi: "verify-locally",
    connectorCheckRequired: true,
    notes: "Awaiting a current, service-specific classification from RCLL.",
    officialUrl: "",
    sourceUrls: [],
    verifiedOn: "2026-08-03",
    status: "draft",
    displayOrder: 101,
    localApprovalStatus: "verify-locally",
    localApprovalOwner: "Robert Crown Law Library",
  },
  {
    id: "rcll-legora",
    provider: "Legora",
    displayName: "Legora",
    serviceVariant: "Robert Crown Law Library licence",
    accountBoundary: "Law Library-provided access",
    availableTo: "As directed by the Robert Crown Law Library",
    lowRisk: "verify-locally",
    moderateRisk: "verify-locally",
    highRiskNonPhi: "verify-locally",
    highRiskPhi: "verify-locally",
    connectorCheckRequired: true,
    notes: "Awaiting a current, service-specific classification from RCLL.",
    officialUrl: "",
    sourceUrls: [],
    verifiedOn: "2026-08-03",
    status: "draft",
    displayOrder: 102,
    localApprovalStatus: "verify-locally",
    localApprovalOwner: "Robert Crown Law Library",
  },
  {
    id: "rcll-lextext",
    provider: "LexText",
    displayName: "LexText",
    serviceVariant: "Robert Crown Law Library licence",
    accountBoundary: "Law Library-provided access",
    availableTo: "As directed by the Robert Crown Law Library",
    lowRisk: "verify-locally",
    moderateRisk: "verify-locally",
    highRiskNonPhi: "verify-locally",
    highRiskPhi: "verify-locally",
    connectorCheckRequired: true,
    notes: "Awaiting a current, service-specific classification from RCLL.",
    officialUrl: "",
    sourceUrls: [],
    verifiedOn: "2026-08-03",
    status: "draft",
    displayOrder: 103,
    localApprovalStatus: "verify-locally",
    localApprovalOwner: "Robert Crown Law Library",
  },
  {
    id: "rcll-cicero",
    provider: "CICERO",
    displayName: "CICERO",
    serviceVariant: "Robert Crown Law Library licence",
    accountBoundary: "Law Library-provided access",
    availableTo: "As directed by the Robert Crown Law Library",
    lowRisk: "verify-locally",
    moderateRisk: "verify-locally",
    highRiskNonPhi: "verify-locally",
    highRiskPhi: "verify-locally",
    connectorCheckRequired: true,
    notes: "Awaiting a current, service-specific classification from RCLL.",
    officialUrl: "",
    sourceUrls: [],
    verifiedOn: "2026-08-03",
    status: "draft",
    displayOrder: 104,
    localApprovalStatus: "verify-locally",
    localApprovalOwner: "Robert Crown Law Library",
  },
];

/**
 * Pairs of Stanford services whose names are close enough to be mistaken for
 * each other. Kept as data because the examples are time-sensitive.
 */
export type ServiceDistinction = {
  nameA: string;
  nameB: string;
  explanation: string;
};

export const serviceDistinctions: ServiceDistinction[] = [
  {
    nameA: "Google Gemini Chat",
    nameB: "Google Gemini Enterprise",
    explanation:
      "They are separate Stanford services with different current data-risk classifications.",
  },
  {
    nameA: "Google NotebookLM",
    nameB: "NotebookLM Enterprise",
    explanation: "They are separate services with different current data-risk classifications.",
  },
  {
    nameA: "Microsoft Copilot Chat",
    nameB: "Microsoft 365 Copilot",
    explanation:
      "They are separate services with different integrations and current data-risk classifications.",
  },
  {
    nameA: "Personal ChatGPT, Claude, Gemini, or Copilot account",
    nameB: "The Stanford-provided version of that service",
    explanation:
      "A personal or vendor-direct account is not covered merely because Stanford offers another version from the same company.",
  },
];

/** Only rows a human has verified and marked published are ever rendered. */
export function publishedServices(): StanfordAiService[] {
  return stanfordAiServices
    .filter((s) => s.status === "published")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export const riskColumns = [
  { key: "lowRisk", label: "Low Risk" },
  { key: "moderateRisk", label: "Moderate Risk" },
  { key: "highRiskNonPhi", label: "High Risk, non-PHI" },
  { key: "highRiskPhi", label: "High Risk, PHI" },
] as const;

// -----------------------------------------------------------------------------
// Validation. Runs at import, so `next build` fails on a malformed published row
// rather than shipping a wrong approval claim. Staleness is a warning, not a
// failure: an overdue review should prompt a maintainer, not block a deploy.
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isValidIsoDate(value: string): boolean {
  return ISO_DATE.test(value) && !Number.isNaN(new Date(`${value}T12:00:00Z`).getTime());
}

export type SnapshotValidation = { errors: string[]; warnings: string[] };

/**
 * @param today ISO date used for the staleness check; injected so tests can
 *              assert the warning fires without waiting for the calendar.
 */
export function validateServiceSnapshot(today = new Date().toISOString().slice(0, 10)): SnapshotValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isValidIsoDate(snapshotMeta.verifiedOn)) errors.push("snapshotMeta.verifiedOn is not a valid date");
  if (!isValidIsoDate(snapshotMeta.reviewBy)) errors.push("snapshotMeta.reviewBy is not a valid date");
  else if (today > snapshotMeta.reviewBy) {
    warnings.push(
      `Stanford AI service snapshot is overdue for review: reviewBy ${snapshotMeta.reviewBy} has passed (today ${today}). Re-verify against ${snapshotMeta.officialMatrixUrl} and update verifiedOn/reviewBy.`,
    );
  }

  const seen = new Set<string>();
  const all = [...stanfordAiServices, ...localLegalAiServices];

  for (const s of all) {
    const where = s.id || s.displayName || "(unidentified record)";
    if (!s.id) errors.push(`${where}: missing id`);
    if (seen.has(s.id)) errors.push(`${where}: duplicate id`);
    seen.add(s.id);

    // Draft rows may be incomplete — that is why they are not rendered.
    if (s.status !== "published") {
      const isLocal = localLegalAiServices.some((l) => l.id === s.id);
      if (isLocal && !s.localApprovalOwner) {
        errors.push(`${where}: local legal-AI record needs a localApprovalOwner`);
      }
      continue;
    }

    if (!s.displayName) errors.push(`${where}: missing displayName`);
    if (!s.accountBoundary) errors.push(`${where}: missing accountBoundary`);
    for (const { key, label } of riskColumns) {
      const value = s[key];
      if (!value) errors.push(`${where}: empty ${label} classification`);
      else if (!(value in approvalLabels)) errors.push(`${where}: unknown approval status "${value}" for ${label}`);
    }
    if (!s.officialUrl) errors.push(`${where}: missing officialUrl`);
    if (!s.sourceUrls?.length) errors.push(`${where}: missing source URL`);
    if (!isValidIsoDate(s.verifiedOn)) errors.push(`${where}: verifiedOn is not a valid date`);

    // A published legal-AI row must carry both a source and a named owner, so a
    // library licence can never be turned into an approval claim by accident.
    if (localLegalAiServices.some((l) => l.id === s.id)) {
      if (!s.sourceUrls?.length) errors.push(`${where}: published legal-AI record needs a source`);
      if (!s.localApprovalOwner) errors.push(`${where}: published legal-AI record needs an approval owner`);
    }
  }

  return { errors, warnings };
}

const validation = validateServiceSnapshot();
if (validation.errors.length) {
  throw new Error(
    `Stanford AI service snapshot is invalid:\n  - ${validation.errors.join("\n  - ")}`,
  );
}
for (const warning of validation.warnings) {
  console.warn(`[stanford-ai-services] ${warning}`);
}

// =============================================================================
// Canonical AI tool registry — one record per product, used by Guide 3, the AI
// Resources directory, and site search. There is deliberately no second copy of
// a tool name or description anywhere in a page component: a product renamed
// here is renamed everywhere at once.
//
// Risk classifications are NOT stored here. A Stanford service points at its row
// in the service snapshot through dataClassificationRef, so there is exactly one
// place a classification can be wrong. Locally licensed platforms carry
// localDataStatus: "verify-locally" and visible guidance instead, because a
// library licence establishes access, never an approval level.
//
// UPDATE PROCESS
//   1. Read the official Stanford service page and the vendor's product page.
//   2. Confirm the exact public product name and which features are enabled here.
//   3. Update the record, reviewedOn, and reviewBy — never the id.
//   4. Run `npm run lint` and `npm run build`; both validate this file.
//   5. Commit, so the change has an author and a date.
//
// Nothing is fetched at build time. A name or feature changes only after a human
// reads the source.
// =============================================================================

import { stanfordAiServices } from "./stanfordAiServices";
import { toolModes } from "./aiToolModes";

export type ToolCategory =
  | "stanford-service"
  | "legal-database"
  | "specialty-legal-platform"
  | "simulation-platform"
  | "learning-resource";

export type LocalDataStatus =
  | "uses-stanford-snapshot"
  | "verify-locally"
  | "public-material-only"
  | "not-applicable";

export type AiTool = {
  id: string;
  displayName: string;
  /** Previous public names, kept as search aliases rather than as extra records. */
  formerNames: string[];
  provider: string;
  category: ToolCategory;
  modeIds: string[];
  conciseDescription: string;
  taskFit: string;
  sourcePathSummary: string;
  accessLabel: string;
  accessUrl?: string;
  detailsUrl: string;
  /** Id of the row in the Stanford service snapshot, or null when not applicable. */
  dataClassificationRef: string | null;
  localDataStatus: LocalDataStatus;
  dataGuidance?: string;
  featureSourceUrls: string[];
  reviewedOn: string;
  reviewBy: string;
  reviewCadence: string;
  visibleOnAiResources: boolean;
  visibleOnGuide: boolean;
  displayOrder: number;
  staffReviewRequired: boolean;
  notes?: string;
};

export const aiTools: AiTool[] = [
  {
    id: "stanford-ai-playground",
    displayName: "Stanford AI Playground",
    formerNames: [],
    provider: "Stanford University IT",
    category: "stanford-service",
    modeIds: ["general-chat", "web-connected-chat"],
    conciseDescription:
      "A Stanford-managed environment for working with several AI models, with optional Google search and assistant features.",
    taskFit:
      "Useful for general experimentation, drafting options, model comparison, and public-web research when search is deliberately enabled.",
    sourcePathSummary:
      "The source path depends on the selected model, search setting, supplied material, and assistant configuration.",
    accessLabel: "Stanford SSO",
    detailsUrl: "https://uit.stanford.edu/service/aiplayground",
    dataClassificationRef: "stanford-ai-playground",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/service/aiplayground",
      "https://uit.stanford.edu/ai/services/explore",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 1,
    staffReviewRequired: false,
  },
  {
    id: "openai-chatgpt-edu",
    displayName: "OpenAI ChatGPT Edu",
    formerNames: [],
    provider: "OpenAI",
    category: "stanford-service",
    modeIds: ["general-chat", "web-connected-chat", "chosen-source-workspace"],
    conciseDescription:
      "Stanford-provided ChatGPT with general chat, web browsing, document analysis, data analysis, and custom-workflow features.",
    taskFit:
      "Useful for generating and transforming material, public-web discovery, and analysis grounded in supplied documents when the source set is controlled.",
    sourcePathSummary:
      "The answer may draw on model-trained patterns, supplied files, web browsing, or custom tools depending on the active mode.",
    accessLabel: "Stanford-provided ChatGPT Edu account",
    detailsUrl: "https://uit.stanford.edu/service/openai-chatgpt-edu",
    dataClassificationRef: "openai-chatgpt-edu",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/service/openai-chatgpt-edu",
      "https://uit.stanford.edu/ai/services/explore",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 2,
    staffReviewRequired: false,
  },
  {
    id: "claude-for-education-chat",
    displayName: "Claude for Education",
    formerNames: [],
    provider: "Anthropic",
    category: "stanford-service",
    modeIds: ["general-chat", "chosen-source-workspace"],
    conciseDescription:
      "Stanford-provided Claude for writing, analysis, research support, document work, and feature-specific tools.",
    taskFit:
      "Useful for generating or transforming material and for analysis grounded in documents supplied to the chat.",
    sourcePathSummary:
      "The source path depends on the supplied conversation, documents, and the exact Claude feature being used.",
    accessLabel: "Stanford-provided Claude account",
    detailsUrl: "https://uit.stanford.edu/service/claude",
    dataClassificationRef: "claude-for-education-chat",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/service/claude",
      "https://uit.stanford.edu/ai/services/explore",
      "https://uit.stanford.edu/ai/connectors",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 3,
    staffReviewRequired: false,
    notes:
      "Do not infer the approval or behavior of Claude Code, Claude Cowork, connectors, or API use from the Claude Chat record.",
  },
  {
    id: "google-gemini-chat",
    displayName: "Google Gemini Chat",
    formerNames: ["Gemini", "Gemini App"],
    provider: "Google",
    category: "stanford-service",
    modeIds: ["general-chat"],
    conciseDescription:
      "The standalone conversational Gemini service provided through a Stanford Google account.",
    taskFit:
      "Useful for general chat, content generation, multimodal work, and low-stakes drafting or exploration.",
    sourcePathSummary:
      "The standalone service is separate from Gemini Enterprise and from integrated Google Workspace AI features.",
    accessLabel: "Stanford Google account",
    detailsUrl: "https://uit.stanford.edu/service/gsuite/geminiapp",
    dataClassificationRef: "google-gemini-chat",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/service/gsuite/geminiapp",
      "https://uit.stanford.edu/ai/services/explore",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 4,
    staffReviewRequired: false,
    notes: 'Do not label this generic "Gemini." Always distinguish it from Gemini Enterprise.',
  },
  {
    id: "google-gemini-enterprise",
    displayName: "Google Gemini Enterprise",
    formerNames: [],
    provider: "Google",
    category: "stanford-service",
    modeIds: ["general-chat", "chosen-source-workspace", "connected-enterprise-workspace"],
    conciseDescription:
      "A separate Stanford enterprise environment for agentic workflows, enterprise search, selected Google Drive material, and NotebookLM Enterprise.",
    taskFit:
      "Useful when an approved task requires controlled access to institutional sources, a source-grounded notebook, or a repeatable agentic workflow.",
    sourcePathSummary:
      "The answer or action may draw on selected enterprise sources, Drive material, notebook sources, or configured agents and connectors.",
    accessLabel: "Stanford Gemini Enterprise environment",
    detailsUrl: "https://uit.stanford.edu/service/gemini-enterprise-ai",
    dataClassificationRef: "google-gemini-enterprise",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/service/gemini-enterprise-ai",
      "https://uit.stanford.edu/ai/services/explore",
      "https://uit.stanford.edu/ai/connectors",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 5,
    staffReviewRequired: false,
  },
  {
    id: "google-notebooklm",
    displayName: "Gemini Notebook",
    formerNames: ["Google NotebookLM", "NotebookLM"],
    provider: "Google",
    category: "stanford-service",
    modeIds: ["chosen-source-workspace"],
    conciseDescription:
      "A source-grounded research and writing workspace organized around a selected notebook corpus.",
    taskFit:
      "Useful for comparing, summarizing, questioning, and transforming a controlled set of readings or documents.",
    sourcePathSummary:
      "Responses are grounded in the active notebook sources. The product can also help discover web sources, so the user must confirm what has actually been added or selected.",
    accessLabel: "Stanford Google account",
    detailsUrl: "https://uit.stanford.edu/service/gsuite/gemini-notebook",
    dataClassificationRef: "google-notebooklm",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/service/gsuite/gemini-notebook",
      "https://support.google.com/notebooklm",
      "https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-discover-sources/",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 6,
    staffReviewRequired: false,
    notes:
      "Do not describe this service as inherently limited to uploads. Describe it as grounded in the active selected source set.",
  },
  {
    id: "notebooklm-enterprise",
    displayName: "NotebookLM Enterprise",
    formerNames: [],
    provider: "Google",
    category: "stanford-service",
    modeIds: ["chosen-source-workspace", "connected-enterprise-workspace"],
    conciseDescription:
      "The enterprise notebook service within Stanford's Gemini Enterprise offering, with a separate data-governance boundary from Gemini Notebook.",
    taskFit:
      "Useful for source-grounded analysis in workflows requiring the enterprise service boundary.",
    sourcePathSummary:
      "The source path is the active enterprise notebook corpus and any approved enterprise connections.",
    accessLabel: "Stanford Gemini Enterprise environment",
    detailsUrl: "https://uit.stanford.edu/service/gemini-enterprise-ai",
    dataClassificationRef: "notebooklm-enterprise",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/service/gemini-enterprise-ai",
      "https://uit.stanford.edu/ai/services/explore",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 7,
    staffReviewRequired: false,
  },
  {
    id: "microsoft-copilot-chat",
    displayName: "Microsoft Copilot Chat",
    formerNames: ["Bing Chat Enterprise"],
    provider: "Microsoft",
    category: "stanford-service",
    modeIds: ["general-chat", "web-connected-chat"],
    conciseDescription:
      "A standalone Stanford-authenticated conversational search and content-generation service.",
    taskFit:
      "Useful for public-web discovery, summarized answers with citations, drafting, and general chat.",
    sourcePathSummary:
      "The service can combine conversational generation with web search. It is separate from Microsoft 365 Copilot and its application integrations.",
    accessLabel: "Stanford-authenticated Copilot Chat",
    detailsUrl: "https://uit.stanford.edu/service/microsoft365/mscopilotchat",
    dataClassificationRef: "microsoft-copilot-chat",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/service/microsoft365/mscopilotchat",
      "https://uit.stanford.edu/ai/services/explore",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 8,
    staffReviewRequired: false,
  },
  {
    id: "microsoft-365-copilot",
    displayName: "Microsoft 365 Copilot",
    formerNames: [],
    provider: "Microsoft",
    category: "stanford-service",
    modeIds: ["connected-enterprise-workspace"],
    conciseDescription:
      "A separately licensed Stanford Microsoft 365 service integrated with Word, Excel, PowerPoint, Outlook, and Teams.",
    taskFit:
      "Useful for approved work that depends on Microsoft 365 files, messages, meetings, and application-integrated assistance.",
    sourcePathSummary:
      "The source path may include material available through the user's Stanford Microsoft 365 permissions and the specific application being used.",
    accessLabel: "Licensed Stanford Microsoft 365 environment",
    detailsUrl: "https://uit.stanford.edu/ai/services/explore",
    dataClassificationRef: "microsoft-365-copilot",
    localDataStatus: "uses-stanford-snapshot",
    featureSourceUrls: [
      "https://uit.stanford.edu/ai/services/explore",
      "https://uit.stanford.edu/service/microsoft365/mscopilotchat",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-09-03",
    reviewCadence: "Monthly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 9,
    staffReviewRequired: false,
    notes: "Do not merge this record with Microsoft Copilot Chat.",
  },
  {
    id: "lexis-plus-protege",
    displayName: "Lexis+ with Protégé",
    formerNames: ["Lexis+ AI", "Lexis Protégé"],
    provider: "LexisNexis",
    category: "legal-database",
    modeIds: ["licensed-legal-research", "legal-practice-workflow"],
    conciseDescription:
      "Legal research, drafting, summarization, and document-analysis workflows grounded in LexisNexis sources. Open and update every authority; exact SLS AI features may vary.",
    taskFit:
      "Useful for beginning and extending legal research, retrieving authorities, working with Shepard's information, and performing enabled legal workflows.",
    sourcePathSummary:
      "The source environment can include LexisNexis legal content, Shepard's information, selected web material, and uploaded documents depending on the enabled feature.",
    accessLabel: "Core SLS legal database; exact AI features vary",
    accessUrl: "https://lawschool.lexis.com/",
    detailsUrl: "https://www.lexisnexis.com/en-us/products/lexis-plus-protege.page",
    dataClassificationRef: null,
    localDataStatus: "verify-locally",
    dataGuidance:
      "Do not upload nonpublic, student, clinic, client, or restricted material unless RCLL has confirmed the exact feature and workflow.",
    featureSourceUrls: [
      "https://www.lexisnexis.com/en-us/products/lexis-plus-protege.page",
      "https://www.lexisnexis.com/en-us/products/lexis-plus-protege/legal-research.page",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 10,
    staffReviewRequired: true,
    notes:
      "Confirm which Protégé features are enabled under the current SLS academic subscription.",
  },
  {
    id: "westlaw-precision",
    displayName: "Westlaw Precision",
    formerNames: [],
    provider: "Thomson Reuters",
    category: "legal-database",
    modeIds: ["licensed-legal-research"],
    conciseDescription:
      "Legal research using Westlaw content, KeyCite, editorial enhancements, and AI-assisted features where enabled. Confirm the current SLS feature set and open every supporting authority.",
    taskFit:
      "Useful for retrieving, analyzing, and updating legal authority and for AI-assisted research features available through the SLS account.",
    sourcePathSummary:
      "The source environment includes Westlaw legal content, KeyCite information, and the specific research features enabled for the account.",
    accessLabel: "Core SLS legal database; exact AI features vary",
    accessUrl: "https://lawschool.westlaw.com/",
    detailsUrl: "https://legal.thomsonreuters.com/en/products/westlaw-precision/",
    dataClassificationRef: null,
    localDataStatus: "verify-locally",
    dataGuidance:
      "Confirm the locally enabled upload and AI features before using nonpublic material.",
    featureSourceUrls: [
      "https://legal.thomsonreuters.com/en/products/westlaw-precision/",
      "https://legal.thomsonreuters.com/en/products/westlaw-edge",
    ],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 11,
    staffReviewRequired: true,
    notes:
      "Vendor public materials now use several names, including Westlaw Advantage and Westlaw Edge with AI-Assisted Research. RCLL must confirm the current academic product name and feature entitlement before changing the local display name.",
  },
  {
    id: "bloomberg-law",
    displayName: "Bloomberg Law",
    formerNames: ["Bloomberg Law AI"],
    provider: "Bloomberg Industry Group",
    category: "legal-database",
    modeIds: ["licensed-legal-research"],
    conciseDescription:
      "Legal research with AI-supported answers, summaries, and document analysis linked to Bloomberg Law sources. Inspect the underlying authorities and source documents.",
    taskFit:
      "Useful for legal research, dockets, news, selected document analysis, and enabled AI research features.",
    sourcePathSummary:
      "The source environment can include Bloomberg Law primary and secondary materials and selected documents, depending on the feature.",
    accessLabel: "Core SLS legal database; exact AI features vary",
    accessUrl: "https://www.bloomberglaw.com/",
    detailsUrl: "https://pro.bloomberglaw.com/about/our-approach-to-ai/",
    dataClassificationRef: null,
    localDataStatus: "verify-locally",
    dataGuidance:
      "Confirm the locally enabled upload and AI features before using nonpublic material.",
    featureSourceUrls: ["https://pro.bloomberglaw.com/about/our-approach-to-ai/"],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 12,
    staffReviewRequired: true,
  },
  {
    id: "harvey",
    displayName: "Harvey",
    formerNames: ["Harvey AI"],
    provider: "Harvey",
    category: "specialty-legal-platform",
    modeIds: ["legal-practice-workflow"],
    conciseDescription:
      "Practice-oriented legal research, document analysis, drafting, and workflow tools. Enabled features and permitted data use depend on current SLS access and RCLL guidance.",
    taskFit:
      "Useful for exploring professional legal workflows in approved teaching, research, and scholarship settings.",
    sourcePathSummary:
      "The source environment may include Harvey research sources, selected document collections, configured knowledge, and enabled workflow tools.",
    accessLabel: "Available to the SLS community by request",
    accessUrl: "http://bit.ly/rcll-legalairequest",
    detailsUrl: "https://www.harvey.ai/",
    dataClassificationRef: null,
    localDataStatus: "verify-locally",
    dataGuidance:
      "RCLL must confirm the exact feature and permitted material before any nonpublic upload.",
    featureSourceUrls: ["https://www.harvey.ai/"],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 13,
    staffReviewRequired: true,
  },
  {
    id: "legora",
    displayName: "Legora",
    formerNames: [],
    provider: "Legora",
    category: "specialty-legal-platform",
    modeIds: ["legal-practice-workflow"],
    conciseDescription:
      "Legal research, document review, drafting, collaboration, and workflow tools. Enabled features and permitted data use depend on current SLS access and RCLL guidance.",
    taskFit:
      "Useful for exploring professional document and legal-workflow patterns in approved teaching, research, and scholarship settings.",
    sourcePathSummary:
      "The source environment may include enabled legal databases, selected documents, document-management sources, and configured workflows.",
    accessLabel: "Available to the SLS community by request",
    accessUrl: "http://bit.ly/rcll-legalairequest",
    detailsUrl: "https://legora.com/",
    dataClassificationRef: null,
    localDataStatus: "verify-locally",
    dataGuidance:
      "RCLL must confirm the exact feature and permitted material before any nonpublic upload or connection.",
    featureSourceUrls: ["https://legora.com/", "https://www.legorai.com/product"],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 14,
    staffReviewRequired: true,
  },
  {
    id: "lextext",
    displayName: "LexText",
    formerNames: [],
    provider: "LexText AI",
    category: "specialty-legal-platform",
    modeIds: ["legal-practice-workflow"],
    conciseDescription:
      "Litigation-focused research, record analysis, strategy, search, and drafting workflows. Use only within the current RCLL-approved scope.",
    taskFit:
      "Useful for exploring litigation-oriented analysis and drafting with public, synthetic, or otherwise approved material.",
    sourcePathSummary:
      "The source environment may include case law, selected litigation documents, and guided litigation workflows.",
    accessLabel: "Available to the SLS community by request",
    accessUrl: "http://bit.ly/rcll-legalairequest",
    detailsUrl: "https://www.lextext.ai/",
    dataClassificationRef: null,
    localDataStatus: "verify-locally",
    dataGuidance:
      "RCLL must confirm the exact feature and permitted material before any nonpublic upload.",
    featureSourceUrls: ["https://www.lextext.ai/"],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 15,
    staffReviewRequired: true,
  },
  {
    id: "cicero-rhetoric",
    displayName: "CICERO by Rhetoric",
    formerNames: ["CICERO", "Rhetoric CICERO"],
    provider: "Rhetoric",
    category: "simulation-platform",
    modeIds: ["simulation-coaching"],
    conciseDescription:
      "Performance practice and feedback aligned with instructor-defined criteria. Use it to develop human skills, not as a source of legal authority.",
    taskFit:
      "Useful for repeated skills practice, oral or video responses, and formative feedback aligned with faculty-defined learning objectives.",
    sourcePathSummary:
      "The source environment is the assigned scenario, the participant's performance, and the criteria configured for the exercise.",
    accessLabel: "Available to the SLS community through current RCLL arrangements",
    accessUrl: "http://bit.ly/rcll-legalairequest",
    detailsUrl: "https://www.userhetoric.com/",
    dataClassificationRef: null,
    localDataStatus: "verify-locally",
    dataGuidance:
      "Confirm current course, recording, student-information, and assessment guidance before assigning a module.",
    featureSourceUrls: ["https://www.userhetoric.com/"],
    reviewedOn: "2026-08-03",
    reviewBy: "2026-11-03",
    reviewCadence: "Quarterly and before major reuse",
    visibleOnAiResources: true,
    visibleOnGuide: true,
    displayOrder: 16,
    staffReviewRequired: true,
  },
];

export function orderedTools(): AiTool[] {
  return [...aiTools].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getTool(id: string): AiTool | undefined {
  return aiTools.find((t) => t.id === id);
}

export function toolsForMode(modeId: string): AiTool[] {
  return orderedTools().filter((t) => t.visibleOnGuide && t.modeIds.includes(modeId));
}

export function toolsInCategory(category: ToolCategory): AiTool[] {
  return orderedTools().filter((t) => t.visibleOnAiResources && t.category === category);
}

/** Everything site search should match a query against, including old names. */
export function toolSearchText(tool: AiTool): string {
  return [
    tool.displayName,
    ...tool.formerNames,
    tool.provider,
    tool.conciseDescription,
    tool.taskFit,
  ].join(" ");
}

// -----------------------------------------------------------------------------
// Validation. Runs at import so `next build` fails rather than shipping a broken
// cross-reference or an invented approval level.
//
// The merge guards below exist because these three pairs are the specific
// mistake this whole chunk is trying to prevent: they are near-identical names
// with different data boundaries, and collapsing any pair would turn a correct
// classification into a wrong one.
// -----------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isValidIsoDate = (v: string) => ISO_DATE.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

const LOCAL_DATA_STATUSES: LocalDataStatus[] = [
  "uses-stanford-snapshot",
  "verify-locally",
  "public-material-only",
  "not-applicable",
];

/** Pairs that must never collapse into one record. */
const MUST_STAY_DISTINCT: [string, string][] = [
  ["google-gemini-chat", "google-gemini-enterprise"],
  ["google-notebooklm", "notebooklm-enterprise"],
  ["microsoft-copilot-chat", "microsoft-365-copilot"],
];

export type ToolValidation = { errors: string[]; warnings: string[] };

export function validateToolRegistry(today = new Date().toISOString().slice(0, 10)): ToolValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const modeIds = new Set(toolModes.map((m) => m.id));
  const toolIds = new Set(aiTools.map((t) => t.id));
  const snapshotIds = new Set(stanfordAiServices.map((s) => s.id));
  const seen = new Set<string>();

  for (const t of aiTools) {
    const at = t.id || t.displayName || "(unidentified tool)";
    if (!t.id) errors.push(`${at}: missing id`);
    if (seen.has(t.id)) errors.push(`${at}: duplicate id`);
    seen.add(t.id);

    if (!t.displayName) errors.push(`${at}: missing displayName`);
    if (!t.provider) errors.push(`${at}: missing provider`);
    if (!t.conciseDescription) errors.push(`${at}: missing conciseDescription`);
    if (!t.sourcePathSummary) errors.push(`${at}: missing sourcePathSummary`);
    if (!t.accessLabel) errors.push(`${at}: missing accessLabel`);
    if (!t.detailsUrl) errors.push(`${at}: missing detailsUrl`);
    if (!t.featureSourceUrls?.length) errors.push(`${at}: needs at least one feature source URL`);
    if (!t.reviewCadence) errors.push(`${at}: missing reviewCadence`);
    if (!isValidIsoDate(t.reviewedOn)) errors.push(`${at}: reviewedOn is not a valid date`);
    if (!isValidIsoDate(t.reviewBy)) errors.push(`${at}: reviewBy is not a valid date`);
    else if (today > t.reviewBy) {
      warnings.push(`${at}: overdue for review (reviewBy ${t.reviewBy}, today ${today}).`);
    }

    if (!LOCAL_DATA_STATUSES.includes(t.localDataStatus)) {
      errors.push(`${at}: unknown localDataStatus "${t.localDataStatus}"`);
    }

    // A tool must claim at least one mode, and every mode it claims must exist.
    if (!t.modeIds?.length) errors.push(`${at}: needs at least one modeId`);
    for (const m of t.modeIds ?? []) {
      if (!modeIds.has(m)) errors.push(`${at}: references missing mode "${m}"`);
    }

    // A former name must never become the primary display name.
    if (t.formerNames?.includes(t.displayName)) {
      warnings.push(`${at}: displayName "${t.displayName}" is listed as a former name.`);
    }

    if (t.category === "stanford-service") {
      if (!t.dataClassificationRef) {
        errors.push(`${at}: a Stanford service must reference a service-snapshot record`);
      } else if (!snapshotIds.has(t.dataClassificationRef)) {
        errors.push(`${at}: dataClassificationRef "${t.dataClassificationRef}" is not in the service snapshot`);
      }
      if (t.localDataStatus !== "uses-stanford-snapshot") {
        errors.push(`${at}: a Stanford service must use localDataStatus "uses-stanford-snapshot"`);
      }
    }

    // Licensed and specialty platforms: local verification, visible guidance, a
    // vendor source, and never a Stanford risk level asserted on their behalf.
    if (
      t.category === "legal-database" ||
      t.category === "specialty-legal-platform" ||
      t.category === "simulation-platform"
    ) {
      if (t.localDataStatus !== "verify-locally") {
        errors.push(`${at}: a licensed or specialty platform must use localDataStatus "verify-locally"`);
      }
      if (!t.dataGuidance) errors.push(`${at}: needs visible dataGuidance`);
      if (t.dataClassificationRef) {
        errors.push(
          `${at}: must not claim a Stanford risk classification — library or vendor access does not establish one`,
        );
      }
      if (!t.featureSourceUrls?.length) errors.push(`${at}: needs at least one official vendor source`);
    }
  }

  // Every mode example must point at a tool that exists and is renderable, and
  // every mode must be reachable from at least one tool.
  for (const m of toolModes) {
    for (const id of m.currentExampleToolIds) {
      const tool = getTool(id);
      if (!tool) errors.push(`mode ${m.id}: references missing tool "${id}"`);
      else if (!tool.visibleOnGuide) {
        warnings.push(`mode ${m.id}: example "${id}" is not visible on the guide.`);
      }
    }
    const claimed = aiTools.some((t) => t.modeIds.includes(m.id));
    if (!claimed) warnings.push(`mode ${m.id}: no tool claims this mode.`);
  }

  for (const [a, b] of MUST_STAY_DISTINCT) {
    if (!toolIds.has(a) || !toolIds.has(b)) {
      errors.push(`"${a}" and "${b}" must both exist as separate records; they have different data boundaries`);
      continue;
    }
    const ta = getTool(a)!;
    const tb = getTool(b)!;
    if (ta.displayName === tb.displayName) {
      errors.push(`"${a}" and "${b}" must not share the display name "${ta.displayName}"`);
    }
    if (ta.dataClassificationRef && ta.dataClassificationRef === tb.dataClassificationRef) {
      errors.push(`"${a}" and "${b}" must not share a dataClassificationRef`);
    }
  }

  return { errors, warnings };
}

const validation = validateToolRegistry();
if (validation.errors.length) {
  throw new Error(`AI tool registry is invalid:\n  - ${validation.errors.join("\n  - ")}`);
}
for (const w of validation.warnings) {
  console.warn(`[ai-tools] ${w}`);
}

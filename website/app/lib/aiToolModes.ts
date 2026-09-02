// =============================================================================
// Tool-mode taxonomy — the durable half of tool selection.
//
// A mode describes a SOURCE PATH, not a product. That is the point: products are
// renamed, repriced, merged, and replaced, while the question "what evidence is
// this answer standing on?" does not change. Every mode description here must
// still make sense if all of its current product examples disappear.
//
// Product examples live in currentExampleToolIds and are deliberately secondary.
// They are ids into the canonical registry (app/lib/aiTools.ts) rather than
// names typed twice, so a rename can never leave the two disagreeing.
// =============================================================================

export type ToolMode = {
  id: string;
  title: string;
  shortRule: string;
  sourcePath: string;
  strongFits: string[];
  notEnoughFor: string[];
  verificationMove: string;
  /** Ids in the canonical tool registry; validated in both directions. */
  currentExampleToolIds: string[];
  exampleQualifier: string;
  displayOrder: number;
  reviewCadence: string;
};

export const toolModes: ToolMode[] = [
  {
    id: "general-chat",
    title: "General chat",
    shortRule: "Use it when the output is an option, not evidence.",
    sourcePath:
      "The prompt and conversation are interpreted through model-trained patterns. In this mode, no web search, connected source, or licensed legal database is being relied on.",
    strongFits: [
      "Alternative phrasings",
      "Possible outlines",
      "Discussion-question options",
      "Hypotheticals based on supplied public text",
      "Counterarguments",
      "Explanations for different audiences",
      "Low-stakes rehearsal",
    ],
    notEnoughFor: [
      "Establishing legal authority",
      "Current factual research",
      "Exact quotations",
      "Comprehensive searches",
      "Citation validation",
    ],
    verificationMove:
      "Judge the output against your purpose. Independently check every factual or legal claim before relying on it.",
    currentExampleToolIds: [
      "stanford-ai-playground",
      "openai-chatgpt-edu",
      "claude-for-education-chat",
      "google-gemini-chat",
      "microsoft-copilot-chat",
    ],
    exampleQualifier:
      "These products may also support other modes. This row describes using them without relying on search, connected sources, or a legal database.",
    displayOrder: 1,
    reviewCadence: "Review the mode definition annually; review product examples monthly.",
  },
  {
    id: "web-connected-chat",
    title: "Web-connected chat",
    shortRule: "Use it when current public information or source discovery matters.",
    sourcePath:
      "Open-web material selected through a search or retrieval process, followed by a generated synthesis.",
    strongFits: [
      "Recent public developments",
      "Finding possible starting sources",
      "Comparing public statements",
      "Identifying current terminology",
      "Building an initial landscape scan",
    ],
    notEnoughFor: [
      "Comprehensive legal research",
      "Reliable coverage of paywalled sources",
      "Assuming that a cited page supports the generated characterization",
      "Treating search ranking as source quality",
    ],
    verificationMove:
      "Open the cited source. Check the publisher, date, relevant passage, and whether important sources or viewpoints are missing.",
    currentExampleToolIds: [
      "stanford-ai-playground",
      "openai-chatgpt-edu",
      "microsoft-copilot-chat",
    ],
    exampleQualifier:
      "Search availability and activation can vary by service, mode, and interface. The user must confirm that search actually occurred.",
    displayOrder: 2,
    reviewCadence: "Review the mode definition annually; review product examples monthly.",
  },
  {
    id: "chosen-source-workspace",
    title: "Chosen-source workspace",
    shortRule: "Use it when you already know what the system should read.",
    sourcePath:
      "A bounded set of active documents, URLs, notes, or other sources selected by the user. Some products can discover additional web sources, but those sources do not become part of the working corpus until they are added or selected.",
    strongFits: [
      "Comparing assigned readings",
      "Summarizing a document set",
      "Extracting themes or passages",
      "Creating questions grounded in supplied material",
      "Identifying agreements and disagreements among selected sources",
      "Transforming trusted material into another format",
    ],
    notEnoughFor: [
      "Claims about material outside the selected corpus",
      "Proving that the corpus is complete",
      "Updating legal authority",
      "Assuming a citation means the generated summary is accurate",
    ],
    verificationMove:
      "Inspect the active source set and open the cited passage. Check both what the system included and what the selected corpus omitted.",
    currentExampleToolIds: [
      "google-notebooklm",
      "notebooklm-enterprise",
      "openai-chatgpt-edu",
      "claude-for-education-chat",
    ],
    exampleQualifier:
      "For general chat products, this mode applies only when the task is deliberately grounded in supplied files or selected sources.",
    displayOrder: 3,
    reviewCadence: "Review the mode definition annually; review product examples monthly.",
  },
  {
    id: "licensed-legal-research",
    title: "Licensed legal research system",
    shortRule: "Use it when the answer must rest on legal authority.",
    sourcePath:
      "A licensed legal corpus, often combined with citator data, editorial enhancements, secondary sources, and a generated research response.",
    strongFits: [
      "Finding legal authority",
      "Retrieving full legal sources",
      "Jurisdiction-specific research",
      "Finding related cases, statutes, regulations, and secondary sources",
      "Checking treatment and subsequent history",
      "Beginning a legal research trail",
    ],
    notEnoughFor: [
      "Treating the generated answer as authority",
      "Assuming the first returned authorities are complete",
      "Skipping jurisdiction and date checks",
      "Skipping the full opinion, statute, regulation, or citator record",
    ],
    verificationMove:
      "Confirm existence, support, jurisdiction, court, date, subsequent history, and current validity in the authoritative source.",
    currentExampleToolIds: ["lexis-plus-protege", "westlaw-precision", "bloomberg-law"],
    exampleQualifier:
      "The exact AI features available through an academic account may differ from the vendor's full commercial offering.",
    displayOrder: 4,
    reviewCadence: "Review the mode definition annually; confirm local feature access each term.",
  },
  {
    id: "connected-enterprise-workspace",
    title: "Connected enterprise workspace or agent",
    shortRule: "Use it when the work spans approved files, applications, or repeated steps.",
    sourcePath:
      "Institutional files, email, calendars, drives, productivity applications, or other connected sources made available through permissions, connectors, and tools.",
    strongFits: [
      "Working across selected Microsoft 365 or Google Workspace material",
      "Repeated multi-document tasks",
      "Creating drafts from controlled institutional sources",
      "Structured internal workflows",
      "Application-integrated assistance",
      "Approved agentic workflows",
    ],
    notEnoughFor: [
      "Broad or unnecessary connector access",
      "Assuming every connected application is approved",
      "Allowing an agent to take consequential action without review",
      "Treating workspace access as permission to use every file it can reach",
    ],
    verificationMove:
      "Check the exact service and connector, narrow permissions, review retrieved sources, inspect proposed actions, and keep a human approval point before any consequential step.",
    currentExampleToolIds: ["google-gemini-enterprise", "microsoft-365-copilot"],
    exampleQualifier:
      "The approval boundary belongs to the exact Stanford service and connector, not to the vendor generally.",
    displayOrder: 5,
    reviewCadence:
      "Review the mode definition annually; review services and connectors before every major reuse.",
  },
  {
    id: "legal-practice-workflow",
    title: "Practice-specific legal workflow platform",
    shortRule: "Use it when the workflow itself is specialized for legal work.",
    sourcePath:
      "A combination of legal sources, selected documents, templates, matter-like workspaces, and task-specific workflows for research, review, analysis, or drafting.",
    strongFits: [
      "Guided legal research",
      "Large-document review",
      "Litigation or transactional analysis",
      "Structured drafting workflows",
      "Comparing documents against defined criteria",
      "Exploring professional legal workflows for teaching or scholarship",
    ],
    notEnoughFor: [
      "Assuming every advertised feature is enabled for SLS",
      "Assuming Law Library access establishes a public data-classification level",
      "Uploading client, clinic, student, or restricted material without specific local approval",
      "Treating generated work product as final professional judgment",
    ],
    verificationMove:
      "Confirm the locally enabled feature, source coverage, permitted data scope, and required human review. Open and verify cited authorities and source documents.",
    currentExampleToolIds: ["harvey", "legora", "lextext"],
    exampleQualifier:
      "SLS access, enabled features, and permitted data use must be confirmed through current Robert Crown Law Library guidance.",
    displayOrder: 6,
    reviewCadence:
      "Review the mode definition annually; confirm local access and guidance before every reuse.",
  },
  {
    id: "simulation-coaching",
    title: "Simulation or coaching system",
    shortRule: "Use it when the object of the exercise is a person's performance.",
    sourcePath:
      "A scenario, the user's spoken or written performance, instructor-defined criteria, and generated feedback.",
    strongFits: [
      "Oral advocacy practice",
      "Counseling or interviewing practice",
      "Explaining doctrine aloud",
      "Rehearsing difficult questions",
      "Formative feedback",
      "Repeated skills practice",
    ],
    notEnoughFor: [
      "Establishing legal authority",
      "Replacing faculty or expert feedback",
      "Serving as the sole basis for a consequential grade",
      "Assuming generated feedback is unbiased or complete",
    ],
    verificationMove:
      "Align the activity with the learning objective and faculty-defined criteria. Review the feedback and preserve an appropriate human assessment role.",
    currentExampleToolIds: ["cicero-rhetoric"],
    exampleQualifier:
      "Use current instructor and institutional guidance for student information, recordings, assessment, and consent.",
    displayOrder: 7,
    reviewCadence: "Review the mode definition annually; review the product example quarterly.",
  },
];

export function orderedModes(): ToolMode[] {
  return [...toolModes].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getMode(id: string): ToolMode | undefined {
  return toolModes.find((m) => m.id === id);
}

export function modeTitle(id: string): string {
  return getMode(id)?.title ?? id;
}

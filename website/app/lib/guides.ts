// Single source of truth for the Learn AI faculty guide series ("AI on the
// Record"). The landing list, the series-status footer, the search index, and
// the sitemap all read from here, so publishing a guide is one status change
// plus the page itself.
//
// Long-form prose stays in each guide's page component, where the semantics
// (headings, ordered lists, disclosures) belong. What lives here is the durable
// record: identity, status, review dates, and the answer-first summary that
// other pages quote.

import { STUDENT_AI_LEARNING_HUB_URL } from "./site";
import { SLS_STUDENT_AI_POLICY_URL } from "./slsStudentAiPolicy";

export type GuideStatus = "published" | "planned";

/**
 * What a record is for. A `guide` is one of the numbered cards in a collection; a
 * `process-resource` is a supporting page that lives beneath the collection and is
 * never numbered into it. The distinction exists because the concern checklist is
 * genuinely useful and genuinely not one of the six decisions a faculty member
 * should start from.
 */
export type GuideKind = "guide" | "process-resource";

/**
 * Collections a guide can belong to. A closed union, so a typo fails to compile
 * rather than creating a guide that belongs to nothing. The collections' own
 * records — titles, summaries, status, counts — live in ./learnAiCollections.ts,
 * which reads these guide records to derive its counts. The dependency runs one
 * way: collections know about guides, guides know only the id.
 */
export type CollectionId = "core-ai-decisions" | "working-critically-with-ai";

/** A named collection of numbered guides. */
export type GuideCollection = {
  id: CollectionId;
  name: string;
  summary: string;
  status: "complete" | "in-progress";
  /** Shown when the collection is complete, in place of an empty "Coming next". */
  completionHeading: string;
  completionBody: string;
};

export type SourceNote = {
  title: string;
  url: string;
  note?: string;
  publisher?: string;
  /** e.g. "Primary legal source", "Official vendor documentation". */
  sourceType?: string;
  /** How often this source needs re-checking, e.g. "Review before every reuse". */
  stability?: string;
  /**
   * When the source itself was published or decided, as the publisher states it.
   * Free text rather than an ISO date because sources give varying precision
   * ("July 2024", "March 27, 1991").
   */
  datePublished?: string;
};

/**
 * Subject areas the AI Resources directory can associate a guide with. A closed
 * union so a typo fails to compile rather than silently orphaning a section, and
 * so the directory links guides through data instead of hard-coded anchors.
 */
export type ResourceTopic =
  | "general-chat"
  | "web-connected-chat"
  | "legal-databases"
  | "source-verification"
  | "responsible-ai"
  | "tool-selection"
  | "data-classification"
  | "academic-integrity"
  | "teaching-with-ai"
  | "prompting"
  | "critical-review";

export type Guide = {
  title: string;
  slug: string;
  summary: string;
  status: GuideStatus;
  /** Position in the full ordered list, including process resources. */
  order: number;
  /**
   * Position among the primary guides across all collections — the internal
   * number, never displayed. It exists so maintainers can say "guide 7" to each
   * other while readers only ever see "Guide 1 of 5" within a collection. Process
   * resources have none: they are not primary guides in any collection.
   */
  globalOrder?: number;
  /** Defaults to "guide"; process resources stay out of the numbered collection. */
  kind?: GuideKind;
  /** The collection this guide is numbered into. Absent for process resources. */
  collectionId?: CollectionId;
  /** Position within that collection. */
  collectionOrder?: number;
  /** Short status label shown on the guide cards, e.g. "Start here". */
  badge: string;
  /** Published guides only. */
  readTime?: string;
  /** ISO date the content was last checked, machine-readable. */
  reviewedThrough?: string;
  topicTags: string[];
  featured: boolean;
  previousGuideSlug?: string;
  nextGuideSlug?: string;
  audience?: string;
  /**
   * Extra terms the site search should match, for vocabulary a reader is likely
   * to type but the summary does not contain. Never rendered as visible copy,
   * so it cannot read as keyword stuffing.
   */
  searchTerms?: string[];
  /** The answer-first statement the guide opens with. */
  answer?: string;
  /** Second paragraph of the answer, when the answer needs one. */
  answerSecond?: string;
  facultyMove?: string;
  /** Second paragraph of the faculty move, when it needs one. */
  facultyMoveSupport?: string;
  /** Where the AI Resources directory may offer this guide as a related read. */
  resourceTopics?: ResourceTopic[];
  /** Short link text used when the directory links to this guide. */
  resourceLinkText?: string;
  sourceNotes?: SourceNote[];
  /** Editorial guidance for maintainers; not necessarily rendered. */
  reviewCadence?: {
    durableGuidance: string;
    institutionalLinks: string;
  };
};

export const guides: Guide[] = [
  {
    title: "What is AI actually good at?",
    slug: "what-is-ai-good-at",
    summary:
      "Choose a useful, low-risk first task that lets AI generate options while you retain the sources, purpose, and decision.",
    status: "published",
    order: 1,
    collectionId: "core-ai-decisions",
    collectionOrder: 1,
    globalOrder: 1,
    badge: "Start here",
    readTime: "4 min",
    reviewedThrough: "2026-08-03",
    topicTags: ["getting started", "judgment", "teaching"],
    featured: true,
    nextGuideSlug: "what-can-i-safely-share",
    audience: "Faculty and academic staff, no technical background assumed",
    answer:
      "AI is most useful when it helps you generate options, transform material you already trust, or rehearse a judgment. Use it to widen the menu—not to become the authority, evaluator, or final decision-maker.",
    facultyMove:
      "Give the AI a bounded task, a source you can inspect, and a result you can easily accept, revise, or discard.",
    resourceTopics: ["general-chat", "responsible-ai"],
    resourceLinkText: "What is AI actually good at?",
    sourceNotes: [
      {
        title: "Responsible AI at Stanford",
        url: "https://uit.stanford.edu/security/responsibleai",
        note: "Stanford guidance on privacy, security, transparency, and inaccurate AI output.",
      },
      {
        title: "Stanford Risk Classifications",
        url: "https://uit.stanford.edu/guide/riskclassifications",
        note: "Stanford's definitions and examples for Low, Moderate, and High Risk data.",
      },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks: "Review quarterly and before any major reuse.",
    },
  },
  {
    title: "What can I safely share with an AI tool?",
    slug: "what-can-i-safely-share",
    summary:
      "Classify the material, check the exact Stanford service and feature, and share only what the task requires.",
    status: "published",
    order: 2,
    collectionId: "core-ai-decisions",
    collectionOrder: 2,
    globalOrder: 2,
    badge: "Faculty guide",
    readTime: "5 min",
    reviewedThrough: "2026-08-03",
    topicTags: [
      "Data classification",
      "Privacy",
      "Stanford AI services",
      "Student records",
      "Responsible AI",
    ],
    featured: true,
    previousGuideSlug: "what-is-ai-good-at",
    nextGuideSlug: "which-ai-tool-fits",
    audience: "Faculty",
    searchTerms: [
      "FERPA",
      "student records",
      "safe to upload",
      "sensitive data",
      "risk classification",
      "Low Risk",
      "Moderate Risk",
      "High Risk",
      "PHI",
      "AI Playground",
      "ChatGPT Edu",
      "Claude for Education",
      "Gemini Enterprise",
      "NotebookLM",
      "Copilot",
      "connectors",
      "plugins",
      "client material",
      "clinic material",
      "Data Risk Assessment",
    ],
    answer:
      "First classify the material, then verify that the exact Stanford service, account, feature, and connector are approved for that classification before you share it. Approval is not blanket permission: the use must be authorized and necessary, you should disclose only the minimum needed, and separate course, clinic, research, contractual, or professional obligations may still apply.",
    facultyMove: "Name it. Match it. Minimize it.",
    facultyMoveSupport:
      "Name the material and its classification. Match it to the exact Stanford service boundary. Then remove everything the task does not require. If you cannot confidently do the first two steps, stop before uploading and ask.",
    resourceTopics: ["data-classification", "responsible-ai", "general-chat"],
    resourceLinkText: "What can I safely share with an AI tool?",
    sourceNotes: [
      {
        title: "Stanford Risk Classifications",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/guide/riskclassifications",
        note: "Defines Low, Moderate, and High Risk data, lists student records and admission applications as Moderate Risk examples, and instructs users to apply the highest classification when data is mixed.",
        stability: "Review quarterly",
      },
      {
        title: "Approved AI Services",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/ai/services/explore",
        note: "Current service-level availability and data-risk classifications for Stanford-provided AI services.",
        stability: "Review before every reuse",
      },
      {
        title: "Approved Connectors for AI Services",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/ai/connectors",
        note: "Current availability and restrictions for connectors, plugins, and apps used with Stanford AI services.",
        stability: "Review before every reuse",
      },
      {
        title: "Responsible AI at Stanford",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/security/responsibleai",
        note: "Stanford guidance on sensitive data, third-party AI services, inaccurate output, transparency, and responsible use.",
        stability: "Review quarterly",
      },
      {
        title: "Protecting Sensitive Data at Stanford",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/security/sensitivedata",
        note: "Guidance on authorized access, minimum necessary use, approved services, and additional safeguards.",
        stability: "Review quarterly",
      },
      {
        title: "Family Educational Rights and Privacy Act",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/FERPA-Policy",
        note: "Stanford overview of FERPA rights and restrictions involving personally identifiable information from education records.",
        stability: "Review annually",
      },
      {
        title: "Data Risk Assessment",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/security/dra",
        note: "Explains Stanford's review process for proposed transfers of Moderate or High Risk data to a non-Stanford entity and notes that completion is not a substitute for other required approvals.",
        stability: "Review quarterly",
      },
      {
        title: "OpenAI ChatGPT Edu",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/service/openai-chatgpt-edu",
        stability: "Review before every reuse",
      },
      {
        title: "Claude for Education",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/service/claude",
        stability: "Review before every reuse",
      },
      {
        title: "Gemini Enterprise AI",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/service/gemini-enterprise-ai",
        stability: "Review before every reuse",
      },
      {
        title: "Stanford AI Playground",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/service/aiplayground",
        stability: "Review before every reuse",
      },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "Review quarterly and before any major reuse. The Stanford service snapshot has its own verifiedOn/reviewBy dates in app/lib/stanfordAiServices.ts and is updated independently of this date.",
    },
  },
  {
    title: "Which AI tool fits this task?",
    slug: "which-ai-tool-fits",
    summary:
      "Choose by the job, source set, data boundary, and evidence you need to inspect—not by the product name alone.",
    status: "published",
    order: 3,
    collectionId: "core-ai-decisions",
    collectionOrder: 3,
    globalOrder: 3,
    badge: "Faculty guide",
    readTime: "6 min",
    reviewedThrough: "2026-08-03",
    topicTags: [
      "Tool selection",
      "Source grounding",
      "Legal research",
      "AI services",
      "Verification",
      "Faculty workflows",
    ],
    featured: true,
    previousGuideSlug: "what-can-i-safely-share",
    nextGuideSlug: "verify-an-ai-legal-claim",
    audience: "Faculty",
    searchTerms: [
      "which AI tool",
      "choose an AI tool",
      "AI tool comparison",
      "source grounding",
      "grounded AI",
      "AI search",
      "web-connected AI",
      "legal research AI",
      "legal database AI",
      "ChatGPT Edu",
      "Claude for Education",
      "Gemini Chat",
      "Gemini Enterprise",
      "Gemini Notebook",
      "Google NotebookLM",
      "NotebookLM",
      "Microsoft Copilot Chat",
      "Microsoft 365 Copilot",
      "Lexis+ with Protégé",
      "Lexis+ AI",
      "Westlaw",
      "Bloomberg Law",
      "Harvey",
      "Legora",
      "LexText",
      "CICERO",
      "Rhetoric",
      "AI workflow",
      "AI source mode",
      "AI connectors",
    ],
    answer:
      "No single AI tool is best in the abstract. Choose by the job, the sources the system can actually use, the material the exact service may receive, and the evidence you need to inspect.",
    answerSecond:
      "For legal or factual work, use the most authoritative source environment available and treat the generated response as a route into the sources—not as the source itself.",
    facultyMove: "Choose the source path before the logo.",
    facultyMoveSupport:
      "Write down the job, required sources, sensitivity, and proof standard before opening a product. Then choose the simplest approved mode that satisfies all four.",
    resourceTopics: ["tool-selection", "general-chat", "web-connected-chat", "legal-databases"],
    resourceLinkText: "Which AI tool fits this task?",
    sourceNotes: [
      { title: "Approved AI Services", publisher: "Stanford University IT", url: "https://uit.stanford.edu/ai/services/explore", note: "Current Stanford service names, service variants, availability, use cases, and data-risk classifications.", stability: "Review before every reuse" },
      { title: "Stanford AI Playground", publisher: "Stanford University IT", url: "https://uit.stanford.edu/service/aiplayground", note: "Current AI Playground features, including multiple models and integrated Google search.", stability: "Review before every reuse" },
      { title: "OpenAI ChatGPT Edu", publisher: "Stanford University IT", url: "https://uit.stanford.edu/service/openai-chatgpt-edu", note: "Current Stanford ChatGPT Edu access, features, and service boundary.", stability: "Review before every reuse" },
      { title: "Claude for Education", publisher: "Stanford University IT", url: "https://uit.stanford.edu/service/claude", note: "Current Claude service features and feature-specific distinctions.", stability: "Review before every reuse" },
      { title: "Gemini Enterprise AI", publisher: "Stanford University IT", url: "https://uit.stanford.edu/service/gemini-enterprise-ai", note: "Current Gemini Enterprise features, agents, enterprise search, Drive access, and NotebookLM Enterprise.", stability: "Review before every reuse" },
      { title: "Gemini Notebook", publisher: "Stanford University IT", url: "https://uit.stanford.edu/service/gsuite/gemini-notebook", note: "Current Stanford name and source-grounded description for the standalone service formerly known as Google NotebookLM.", stability: "Review before every reuse" },
      { title: "Microsoft Copilot Chat", publisher: "Stanford University IT", url: "https://uit.stanford.edu/service/microsoft365/mscopilotchat", note: "Distinguishes standalone Copilot Chat from Microsoft 365 Copilot and describes its conversational search behavior.", stability: "Review before every reuse" },
      { title: "Approved Connectors for AI Services", publisher: "Stanford University IT", url: "https://uit.stanford.edu/ai/connectors", note: "Current connector, plugin, and application approvals and restrictions.", stability: "Review before every reuse" },
      { title: "Lexis+ with Protégé", publisher: "LexisNexis", url: "https://www.lexisnexis.com/en-us/products/lexis-plus-protege.page", note: "Current vendor description of legal research, drafting, analysis, legal content, and workflow features.", stability: "Review quarterly" },
      { title: "Westlaw AI Legal Research", publisher: "Thomson Reuters", url: "https://legal.thomsonreuters.com/en/products/westlaw-precision/", note: "Current vendor description of AI-supported research grounded in Westlaw content. Local SLS product naming and feature access still require confirmation.", stability: "Review quarterly" },
      { title: "Our Approach to AI", publisher: "Bloomberg Law", url: "https://pro.bloomberglaw.com/about/our-approach-to-ai/", note: "Current description of Bloomberg Law answers, summaries, source links, and AI Assistant functionality.", stability: "Review quarterly" },
      { title: "Harvey", publisher: "Harvey", url: "https://www.harvey.ai/", note: "Current vendor description of legal research, document, knowledge, agent, and workflow products. Does not establish SLS-enabled features or local data approval.", stability: "Review quarterly" },
      { title: "Legora", publisher: "Legora", url: "https://legora.com/", note: "Current vendor description of legal research, document review, drafting, collaboration, and workflow products. Does not establish SLS-enabled features or local data approval.", stability: "Review quarterly" },
      { title: "LexText", publisher: "LexText AI", url: "https://www.lextext.ai/", note: "Current vendor description of litigation research, analysis, strategy, search, and drafting workflows. Does not establish local data approval.", stability: "Review quarterly" },
      { title: "CICERO", publisher: "Rhetoric", url: "https://www.userhetoric.com/", note: "Current description of dynamic performance practice, instructor-defined criteria, and generated feedback.", stability: "Review quarterly" },
      { title: "AI Resources", publisher: "Robert Crown Law Library", url: "/ai-resources", note: "Local access categories, training prerequisites, and intended SLS routing.", stability: "Review before every reuse" },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "Review the tool registry monthly for Stanford services and quarterly for licensed platforms. Product names and features carry their own reviewedOn/reviewBy dates in app/lib/aiTools.ts and are updated independently of this date.",
    },
  },
  {
    title: "How do I verify an AI-generated legal claim?",
    slug: "verify-an-ai-legal-claim",
    summary:
      "Find the authority, read the supporting passage, place it in the correct legal context, and check whether it remains current.",
    status: "published",
    order: 4,
    collectionId: "core-ai-decisions",
    collectionOrder: 4,
    globalOrder: 4,
    badge: "Faculty guide",
    readTime: "6 min",
    reviewedThrough: "2026-08-03",
    topicTags: [
      "Legal research",
      "Citation verification",
      "Source checking",
      "Citators",
      "AI-generated authority",
      "Faculty scholarship",
    ],
    featured: true,
    previousGuideSlug: "which-ai-tool-fits",
    nextGuideSlug: "why-did-it-invent-a-case",
    audience: "Faculty",
    searchTerms: [
      "verify AI legal claim", "verify AI citation", "AI-generated citation", "hallucinated case",
      "legal claim verification", "cite checking", "source pulling", "citation analysis",
      "legal authority", "case verification", "quotation verification", "pinpoint citation",
      "pin cite", "holding", "dicta", "jurisdiction", "binding authority", "persuasive authority",
      "precedential status", "nonprecedential", "subsequent history", "current validity",
      "good law", "adverse authority", "KeyCite", "Shepard's", "Shepards", "BCITE", "Lexis",
      "Westlaw", "Bloomberg Law", "Rule 11", "candor", "Lnu v. Blanche", "AI court filing",
      "legal hallucination",
    ],
    answer:
      "Treat every AI-generated legal claim as unverified until you have opened the cited authority, read the relevant passage, placed it in the correct jurisdictional and procedural context, and checked its current treatment.",
    answerSecond:
      "A citation that exists can still fail. It may be misquoted, support a narrower proposition, lack the required precedential weight, come from the wrong jurisdiction, or no longer be current.",
    facultyMove: "Find it. Read it. Place it. Update it.",
    facultyMoveSupport:
      "Do not ask the same model to certify its own answer. Use the full authority, an official source or licensed legal database, and an appropriate citator.",
    resourceTopics: ["source-verification", "legal-databases"],
    resourceLinkText: "How do I verify an AI-generated legal claim?",
    sourceNotes: [
      { title: "Formal Opinion 512: Generative Artificial Intelligence Tools", publisher: "American Bar Association Standing Committee on Ethics and Professional Responsibility", url: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf", note: "Discusses competence, independent verification or review, professional judgment, confidentiality, candor, and other obligations associated with lawyers' use of generative AI. Published July 29, 2024.", sourceType: "Official professional guidance", stability: "Review annually and when the ABA issues superseding guidance" },
      { title: "Rule 3.3: Candor Toward the Tribunal", publisher: "American Bar Association", url: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_3_3_candor_toward_the_tribunal/", note: "ABA Model Rule addressing false statements, correction, adverse controlling authority, and false evidence. State rules and applicable jurisdictional rules may differ.", sourceType: "Official model rule", stability: "Review annually" },
      { title: "Current Rules of Practice and Procedure", publisher: "Administrative Office of the United States Courts", url: "https://www.uscourts.gov/forms-rules/current-rules-practice-procedure", note: "Official source for current national federal rules and links to the Federal Rules of Appellate, Civil, Criminal, Bankruptcy, and Evidence procedure.", sourceType: "Official federal judiciary source", stability: "Review before every filing-related reuse" },
      { title: "Federal Rule of Civil Procedure 11", publisher: "Legal Information Institute, Cornell Law School", url: "https://www.law.cornell.edu/rules/frcp/rule_11", note: "Accessible HTML text describing representations to a court and the requirement for an inquiry reasonable under the circumstances. Confirm the current official rules source before filing.", sourceType: "Authoritative legal information source", stability: "Review before every filing-related reuse" },
      { title: "Lnu v. Blanche, No. 24-4790", publisher: "United States Court of Appeals for the Ninth Circuit", url: "https://cdn.ca9.uscourts.gov/datastore/opinions/2026/06/03/24-4790.pdf", note: "Published June 3, 2026 attorney-discipline order addressing nonexistent cases, misattributed quotations, mischaracterizations of real authority, AI-related errors, filing responsibility, and candor. Confirm current status, subsequent history, and final citation before every reuse.", sourceType: "Primary legal source", stability: "Review before every reuse" },
      { title: "Risks Associated With the Use of AI Tools to Generate Documents for Filing With the Court", publisher: "United States Bankruptcy Court for the Central District of California", url: "https://www.cacb.uscourts.gov/node/11674", note: "Court guidance identifying risks involving nonexistent authority, inaccurate quotations, jurisdiction, procedural posture, factual support, and filing requirements.", sourceType: "Official court guidance", stability: "Review before every filing-related reuse" },
      { title: "KeyCite", publisher: "Thomson Reuters", url: "https://legal.thomsonreuters.com/en/products/westlaw/keycite", note: "Official description of KeyCite history, citing references, treatment indicators, alerts, and currentness functions. Vendor description does not replace RCLL confirmation of the current SLS interface.", sourceType: "Official vendor documentation", stability: "Review quarterly" },
      { title: "Shepard's Citations", publisher: "LexisNexis", url: "https://www.lexisnexis.com/en-us/products/lexis/feature-good-law.page", note: "Official description of Shepard's history, treatment, signals, citing decisions, and alerts. Vendor description does not replace RCLL confirmation of current SLS access.", sourceType: "Official vendor documentation", stability: "Review quarterly" },
      { title: "Our Approach to AI", publisher: "Bloomberg Law", url: "https://pro.bloomberglaw.com/about/our-approach-to-ai/", note: "Official description of Bloomberg Law source systems and BCITE's role in helping researchers assess whether a court opinion's holding remains valid.", sourceType: "Official vendor documentation", stability: "Review quarterly" },
      { title: "Legal Research Guides", publisher: "Robert Crown Law Library", url: "https://guides.law.stanford.edu/libraryresources", note: "RCLL directory of legal research guides, including local materials addressing citation analysis and source pulling or cite checking.", sourceType: "Institutional guidance", stability: "Review before every major reuse" },
      { title: "Perma.cc for Journal Members", publisher: "Robert Crown Law Library", url: "https://guides.law.stanford.edu/perma", note: "Explains preservation of cited web sources and the role of source pulling in allowing readers and editors to confirm that a source supports an author's claim.", sourceType: "Institutional guidance", stability: "Review annually" },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "The exercise case status, citator interface descriptions, and court-rule links each carry their own dates in app/lib/legalClaimAudit.ts and app/lib/legalVerificationTools.ts and are updated independently of this date.",
    },
  },
  {
    title: "Why did it invent a case?",
    slug: "why-did-it-invent-a-case",
    summary:
      "Understand how a legal-looking citation can be generated without a reliable source trail, then retrieve and verify the authority.",
    status: "published",
    order: 5,
    collectionId: "core-ai-decisions",
    collectionOrder: 5,
    globalOrder: 5,
    badge: "Faculty guide",
    readTime: "5 min",
    reviewedThrough: "2026-08-03",
    topicTags: [
      "AI hallucinations",
      "Confabulation",
      "Fabricated citations",
      "Legal research",
      "Source verification",
      "Citation provenance",
    ],
    featured: true,
    previousGuideSlug: "verify-an-ai-legal-claim",
    nextGuideSlug: "students-use-ai-and-learn-law",
    audience: "Faculty",
    // Vocabulary a reader is likely to type. The fictional party names from the
    // simulated exercise are deliberately absent, and app/lib/citationProvenance.ts
    // fails the build if any of them ever appear here.
    searchTerms: [
      "why did AI invent a case",
      "AI invented a case",
      "AI made up a case",
      "AI invented a citation",
      "hallucinated case",
      "fabricated citation",
      "fake legal citation",
      "AI legal hallucination",
      "AI confabulation",
      "confabulation",
      "unsupported authority",
      "legal citation verification",
      "source provenance",
      "citation provenance",
      "ungrounded AI",
      "grounded AI",
      "AI search",
      "legal database",
      "citation identity mismatch",
      "proposition mismatch",
      "ask AI are you sure",
      "research leads",
    ],
    answer:
      "Unless search, a legal database, or a source you supplied was active, the system may have generated the citation from learned language patterns rather than retrieved a case.",
    answerSecond:
      "Treat every AI-supplied authority as a research lead until you independently retrieve the exact source and verify that it supports the proposition.",
    facultyMove: "Name the mode. Open the source.",
    facultyMoveSupport:
      "First determine whether the answer used no inspectable source, web search, a selected document set, or a licensed legal database. Then leave the generated answer and retrieve the authority itself.",
    resourceTopics: [
      "general-chat",
      "web-connected-chat",
      "legal-databases",
      "source-verification",
      "responsible-ai",
    ],
    resourceLinkText: "Why can an AI system invent a case?",
    sourceNotes: [
      {
        title:
          "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile",
        publisher: "National Institute of Standards and Technology",
        url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
        note: "Defines confabulation as confidently presented erroneous or false generated content, explains its relationship to statistical prediction, and identifies confabulated citations as a source of inappropriate trust.",
        sourceType: "Government standards guidance",
        datePublished: "July 2024",
        stability: "Review annually and when NIST publishes a revised Generative AI Profile",
      },
      {
        title: "Why Language Models Hallucinate",
        publisher: "OpenAI",
        url: "https://openai.com/index/why-language-models-hallucinate/",
        note: "Explains plausible false statements, next-word prediction, the difficulty of arbitrary low-frequency facts, and incentives that reward guessing rather than abstention.",
        sourceType: "Official research publication",
        datePublished: "September 5, 2025",
        stability: "Review annually",
      },
      {
        title: "How ChatGPT and Our Foundation Models Are Developed",
        publisher: "OpenAI",
        url: "https://help.openai.com/en/articles/7842364-what-is-the-chatgpt-model",
        note: "Describes tokens, learned patterns, next-word prediction, generated content, and why repeated prompts can produce different outputs.",
        sourceType: "Official product explanation",
        stability: "Review annually",
      },
      {
        title: "Stanford AI Playground FAQs",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/aiplayground/faqs",
        note: "Defines AI hallucinations in Stanford's user guidance and emphasizes verification of model output.",
        sourceType: "Institutional guidance",
        stability: "Review quarterly",
      },
      {
        title: "Stanford AI Playground",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/service/aiplayground",
        note: "Documents that search and other tools are available features, supporting the guide's distinction between ungrounded and search-connected modes.",
        sourceType: "Institutional service documentation",
        stability: "Review before every product-specific reuse",
      },
      {
        title: "Feist Publications, Inc. v. Rural Telephone Service Co.",
        publisher: "U.S. Government Publishing Office, United States Reports",
        url: "https://www.govinfo.gov/app/details/USREPORTS-499/USREPORTS-499-340",
        note: "Official United States Reports record confirming the source at 499 U.S. 340.",
        sourceType: "Primary legal source",
        datePublished: "Decided March 27, 1991",
        stability: "Stable; review the exercise annually",
      },
      {
        title: "Feist Publications, Inc. v. Rural Telephone Service Co.",
        publisher: "Legal Information Institute, Cornell Law School",
        url: "https://www.law.cornell.edu/supremecourt/text/499/340",
        note: "Accessible full-text reading copy used to compare the simulated proposition with the source.",
        sourceType: "Authoritative legal information source",
        stability: "Review annually",
      },
      {
        title: "AI Hallucination Cases",
        publisher: "Damien Charlotin",
        url: "https://www.damiencharlotin.com/hallucinations/",
        note: "Public database of identified legal decisions involving hallucinated content. Its count and update date belong only in the separately maintained evidence snapshot.",
        sourceType: "Specialized research database",
        stability: "Review weekly while displaying a count",
      },
      {
        title: "Formal Opinion 512: Generative Artificial Intelligence Tools",
        publisher:
          "American Bar Association Standing Committee on Ethics and Professional Responsibility",
        url: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf",
        note: "Discusses independent verification or review, professional judgment, and responsibility for work produced with generative AI.",
        sourceType: "Official professional guidance",
        datePublished: "July 29, 2024",
        stability: "Review annually and when superseding guidance is issued",
      },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "The simulated exercise carries its own sourceReviewedOn/sourceReviewBy in app/lib/citationProvenance.ts, and the legal-hallucination count carries its own verifiedOn/reviewBy in app/lib/legalHallucinationEvidence.ts. Both are updated independently of this date.",
    },
  },
  {
    title: "How can students use AI and still learn the law?",
    slug: "students-use-ai-and-learn-law",
    summary:
      "Give AI a bounded role while students perform the legal reading, analysis, verification, revision, and judgment the course is meant to teach.",
    status: "published",
    order: 6,
    collectionId: "core-ai-decisions",
    collectionOrder: 6,
    globalOrder: 6,
    badge: "Faculty guide",
    readTime: "8 min",
    reviewedThrough: "2026-08-04",
    topicTags: [
      "AI in legal education",
      "Assignment design",
      "AI literacy",
      "Legal analysis",
      "Source verification",
      "Experiential learning",
      "Course policy",
      "Student learning",
    ],
    featured: true,
    previousGuideSlug: "why-did-it-invent-a-case",
    // No nextGuideSlug: this closes the Core AI decisions collection.
    audience: "Faculty",
    // Teaching vocabulary first. The four "my student used AI" aliases are kept so
    // the question a worried faculty member actually types still finds something —
    // but app/lib/searchRanking.ts routes those to the companion checklist, and
    // teaching queries here.
    searchTerms: [
      "AI assignments law school",
      "teaching law with AI",
      "students use AI",
      "AI legal education",
      "AI in doctrinal courses",
      "AI case brief assignment",
      "AI legal research exercise",
      "AI oral argument practice",
      "AI client counseling simulation",
      "AI statutory interpretation",
      "AI drafting assignment",
      "AI literacy law students",
      "assignment AI policy",
      "student AI disclosure",
      "AI and legal learning",
      "productive AI use",
      "AI source verification exercise",
      "AI classroom activities",
      "AI experiential learning",
      "case brief stress test",
      "synthetic client interview",
      "My student used AI",
      "Student used ChatGPT",
      "Student used Claude",
      "Student used Gemini",
    ],
    answer:
      "Put AI inside the learning task—not in place of it.",
    answerSecond:
      "Students can gain practical AI experience while learning the law when the assignment requires them to read the authority, make an independent attempt, inspect the AI output, verify its claims, revise it with reasons, and explain what judgment remained theirs.",
    facultyMove: "Name the legal skill. Bound the AI role. Grade the student’s judgment.",
    facultyMoveSupport:
      "Decide what students must learn and do themselves before choosing the tool. Then make the prompt, output, source checking, revisions, and reflection visible enough to evaluate the learning.",
    resourceTopics: ["teaching-with-ai", "responsible-ai"],
    resourceLinkText: "How can students use AI and still learn the law?",
    sourceNotes: [
      {
        title: "Use of Generative AI Technology",
        publisher: "Stanford Law School Office of Student Affairs",
        url: SLS_STUDENT_AI_POLICY_URL,
        note: "Official SLS student AI policy. The official page controls over any local summary. Confirm its current text, effective date, and relationship to course-specific policy and Stanford procedure before every academic term. Staff review required.",
        sourceType: "Official local institutional policy",
        stability: "Review before every academic term and every major reuse",
      },
      {
        title: "Integrating AI into Assignments",
        publisher: "Stanford Teaching Commons",
        url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/integrating-ai-assignments",
        note: "Guidance on learning objectives, meaningful assignments, process evidence, formative feedback, higher-order thinking, metacognitive reflection, student-centered design, and beginning with small assignment changes.",
        sourceType: "Official institutional teaching guidance",
        stability: "Review annually",
      },
      {
        title: "Creating Your Course Policy on AI",
        publisher: "Stanford Teaching Commons",
        url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/creating-your-course-policy-ai",
        note: "Options and sample considerations for assignment conditions, rationale, disclosure, privacy, alternatives, support, and response to noncompliance. Licensed CC BY-NC-SA 4.0; the assignment boundary template on this page is adapted from it.",
        sourceType: "Official institutional teaching guidance",
        stability: "Review annually and before policy-template changes",
      },
      {
        title: "Understanding AI Literacy",
        publisher: "Stanford Teaching Commons",
        url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/understanding-ai-literacy",
        note: "Stanford framework addressing functional, ethical, rhetorical, and pedagogical AI literacy.",
        sourceType: "Official institutional teaching guidance",
        stability: "Review annually",
      },
      {
        title: "Exploring the Pedagogical Uses of AI Chatbots",
        publisher: "Stanford Teaching Commons",
        url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/exploring-pedagogical-uses-ai-chatbots",
        note: "Examples of AI used as mentor, tutor, coach, teammate, student, simulator, and tool, with cautions about evaluating generated responses.",
        sourceType: "Official institutional teaching guidance",
        stability: "Review annually",
      },
      {
        title: "Generative AI Policy Guidance",
        publisher: "Stanford Office of Community Standards and Board on Conduct Affairs",
        url: "https://communitystandards.stanford.edu/generative-ai-policy-guidance",
        note: "Current Stanford-wide generative-AI coursework guidance and instructor authority to communicate course-specific permitted and unpermitted uses.",
        sourceType: "Official institutional guidance",
        stability: "Review before every academic term",
      },
      {
        title: "The Honor Code",
        publisher: "Stanford Office of Community Standards",
        url: "https://communitystandards.stanford.edu/policies-guidance/honor-code",
        note: "Current shared instructor and student responsibilities concerning clear guidance, permitted aid, assessment, and academic honesty.",
        sourceType: "Official institutional policy",
        stability: "Review before every academic term",
      },
      {
        title: "AI for Legal Help",
        publisher: "Stanford Legal Design Lab and Justice Innovation",
        url: "https://justiceinnovation.law.stanford.edu/courses/ai-for-legal-help/",
        note: "Current SLS example of substantive legal, policy, workflow, evaluation, and responsible-AI learning in an interdisciplinary course.",
        sourceType: "Local institutional course example",
        stability: "Review annually",
      },
      {
        title: "Student AI Learning Hub",
        publisher: "Robert Crown Law Library",
        url: STUDENT_AI_LEARNING_HUB_URL,
        note: "Student-facing, policy-aware guidance and AI learning activities.",
        sourceType: "Local institutional learning resource",
        stability: "Review before every academic term",
      },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "The SLS policy record carries its own confirmation state in app/lib/slsStudentAiPolicy.ts. The companion concern checklist carries the dated Stanford process and detection records in app/lib/stanfordStudentAiProcess.ts and app/lib/aiDetectionGuidance.ts, all updated independently of this date.",
    },
  },
  {
    // A supporting faculty resource, not one of the six Core AI decisions cards.
    // `collectionId` is deliberately absent, which is how the landing page keeps it
    // out of the numbered collection and in the process-resources area instead.
    title: "How should I respond to a possible student AI-policy concern?",
    slug: "responding-to-student-ai-concern",
    summary:
      "A policy-first checklist for graded-work concerns, OCS consultation, evidence, detector limitations, and fair communication.",
    status: "published",
    order: 7,
    kind: "process-resource",
    badge: "Faculty process checklist",
    readTime: "6 min",
    reviewedThrough: "2026-08-04",
    topicTags: [
      "Academic integrity",
      "Honor Code",
      "Course policy",
      "AI detection",
      "Fair process",
      "Faculty response",
    ],
    featured: false,
    audience: "Faculty",
    searchTerms: [
      "possible AI policy concern",
      "suspected AI use",
      "unpermitted AI aid",
      "AI academic integrity",
      "AI Honor Code",
      "Honor Code",
      "Office of Community Standards",
      "OCS",
      "AI detector",
      "AI detection",
      "detector score",
      "AI writing detector",
      "penalty grading",
      "reporting an Honor Code concern",
      "fabricated citations student paper",
      "AI-generated student work",
      "student chat history",
      "non-native English AI detector",
      "My student used AI",
      "Student used ChatGPT",
      "Student used Claude",
      "Student used Gemini",
    ],
    answer:
      "Start with the rule that governed the assignment and the materials already available—not with whether the prose sounds generated or a detector produced a score.",
    answerSecond:
      "For graded work, preserve the relevant materials and consult Stanford’s Office of Community Standards before discussing the suspected violation with the student or changing the grade. A concern is not a finding.",
    facultyMove: "Policy first. Evidence second. Process always.",
    facultyMoveSupport:
      "Identify what the assignment permitted, record what you actually observed, and use Stanford’s process before reaching a conclusion or imposing a consequence.",
    resourceTopics: ["academic-integrity"],
    resourceLinkText: "Responding to a possible student AI-policy concern",
    sourceNotes: [
      {
        title: "The Honor Code",
        publisher: "Stanford Office of Community Standards",
        url: "https://communitystandards.stanford.edu/policies-guidance/honor-code",
        note: "Defines the shared student and instructor responsibilities for academic honesty, permitted and unpermitted aid, clear instructor guidance, and assessment design.",
        sourceType: "Official institutional policy",
        stability: "Review before every academic term",
      },
      {
        title: "Generative AI Policy Guidance",
        publisher: "Stanford Office of Community Standards and Board on Conduct Affairs",
        url: "https://communitystandards.stanford.edu/generative-ai-policy-guidance",
        note: "States the current Stanford-wide default for generative AI when an instructor has not supplied a clear course rule, addresses disclosure, and recommends advance notice when detection software will be used.",
        sourceType: "Official institutional guidance",
        datePublished: "Guidance adopted February 16, 2023",
        stability: "Review before every reuse",
      },
      {
        title: "Reporting an Honor Code Concern: Faculty",
        publisher: "Stanford Office of Community Standards",
        url: "https://communitystandards.stanford.edu/reporting-honor-code-concern-faculty",
        note: "Explains consultation, concern submission, supporting materials, the current reporting period, and OCS contact information.",
        sourceType: "Official institutional process guidance",
        stability: "Review before every reuse",
      },
      {
        title: "Faculty & TAs",
        publisher: "Stanford Office of Community Standards",
        url: "https://communitystandards.stanford.edu/resources/faculty-tas",
        note: "Provides faculty guidance on clear expectations, suspected dishonesty, penalty grading, consultation, reporting, and benefit of the doubt when evidence is weak.",
        sourceType: "Official institutional process guidance",
        stability: "Review before every reuse",
      },
      {
        title: "Guidance on Technology Tools for Academic Integrity",
        publisher: "Stanford Teaching Commons",
        url: "https://teachingcommons.stanford.edu/news/guidance-technology-tools-academic-integrity",
        note: "States that faculty should consult OCS before discussing a graded-work concern with a student, that detector verification is not required, that detector-only reliance is not advised, and that ungraded draft concerns may be handled directly.",
        sourceType: "Official institutional teaching guidance",
        stability: "Review before every reuse",
      },
      {
        title: "Student Conduct Penalty Code Bylaw",
        publisher: "Stanford Office of Community Standards",
        url: "https://communitystandards.stanford.edu/policies-guidance/student-conduct-penalty-code-bylaw",
        note: "States that an instructor may apply a grade adjustment or academic penalty after a student accepts responsibility or is found responsible for an Honor Code violation.",
        sourceType: "Official institutional policy",
        datePublished: "Effective June 23, 2025",
        stability: "Review before every reuse",
      },
      {
        title: "Academic Accommodations and the Honor Code",
        publisher: "Stanford Office of Community Standards",
        url: "https://communitystandards.stanford.edu/policies-guidance/academic-accommodations-honor-code",
        note: "Routes questions involving approved academic accommodations to the Office of Accessible Education and explains their relationship to the Honor Code.",
        sourceType: "Official institutional guidance",
        stability: "Review annually",
      },
      {
        title: "Use of Generative AI Technology",
        publisher: "Stanford Law School Office of Student Affairs",
        url: SLS_STUDENT_AI_POLICY_URL,
        note: "SLS-specific student AI policy. Not summarized on this site: Student Affairs or another authorized SLS owner must first confirm its current wording, effective date, and relationship to course policies and OCS procedure. Staff review required.",
        sourceType: "Official local institutional policy",
        stability: "Review before every academic term and every major reuse",
      },
      {
        title: "GPT Detectors Are Biased Against Non-Native English Writers",
        publisher: "Patterns",
        url: "https://www.sciencedirect.com/science/article/pii/S2666389923001307",
        note: "Reports that evaluated GPT detectors misclassified non-native English writing, supporting caution about detector fairness and use in evaluative settings. DOI 10.1016/j.patter.2023.100779. The study does not determine the performance of every later detector.",
        sourceType: "Peer-reviewed research",
        datePublished: "July 2023",
        stability: "Review annually and when newer comparative research is added",
      },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "The Stanford process snapshot, the SLS policy insert, and the detection-guidance record each carry their own dates in app/lib/stanfordStudentAiProcess.ts, app/lib/slsStudentAiPolicy.ts, and app/lib/aiDetectionGuidance.ts and are updated independently of this date.",
    },
  },

  // ---------------------------------------------------------------------------
  // Collection 2 — Working critically with AI.
  //
  // A separate collection, not a continuation of the first. Core AI decisions is
  // finished at six guides, and nothing here renumbers it: this guide is "Guide 1
  // of 5" to a reader, and guide 7 only to a maintainer reading globalOrder.
  //
  // There is deliberately no previousGuideSlug on the first guide and no
  // nextGuideSlug on the sixth. Linking them would make Collection 2 read as the
  // seventh step of a series that is complete.
  // ---------------------------------------------------------------------------
  {
    title: "Why does it agree with everything I say?",
    slug: "why-does-it-agree-with-me",
    summary:
      "Recognize assigned advocacy, request a credible challenge, check the evidence, and retain the decision.",
    status: "published",
    order: 8,
    collectionId: "working-critically-with-ai",
    collectionOrder: 1,
    globalOrder: 7,
    badge: "Start here",
    readTime: "5 min",
    reviewedThrough: "2026-08-04",
    topicTags: [
      "Critical review",
      "Prompt framing",
      "Sycophancy",
      "Confirmation bias",
      "Counterarguments",
      "Faculty judgment",
      "Decision support",
    ],
    featured: true,
    // No previousGuideSlug: this opens a collection rather than continuing one.
    nextGuideSlug: "why-did-it-forget",
    audience: "Faculty",
    answer:
      "Because the prompt often gives the system both the question and the conclusion you hope to hear.",
    answerSecond:
      "Treat agreement as generated advocacy unless the response exposes assumptions, credible objections, and inspectable evidence—and verify that evidence yourself.",
    facultyMove: "Build it. Break it. Check it. You decide.",
    facultyMoveSupport:
      "Use the system first as an advocate, then as a critic, and then as a map of claims that require checking. Keep the sources, values, policy choices, and final decision with people.",
    resourceTopics: ["general-chat", "responsible-ai", "critical-review", "prompting"],
    resourceLinkText: "Why does it agree with everything I say?",
    // The vocabulary a faculty member actually types. Kept out of visible copy:
    // "AI yes-man" and "brutally honest prompt" are search phrasings, not the
    // language the guide uses about a system's behavior.
    searchTerms: [
      "why does AI agree with me",
      "why does ChatGPT agree with me",
      "AI agrees with everything",
      "sycophancy",
      "AI yes-man",
      "AI flattery",
      "leading prompt",
      "inherited premise",
      "prompt bias",
      "confirmation bias",
      "challenge my idea",
      "critical review prompt",
      "devil's advocate AI",
      "AI counterargument",
      "false balance",
      "test assumptions",
      "disconfirming evidence",
      "AI decision support",
      "agreement is not confirmation",
      "get AI to disagree",
      "be brutally honest prompt",
    ],
    sourceNotes: [
      {
        title: "GenAI Prompt Guide",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/ai/prompt-guide",
        note: "Explains that text-based generative AI systems are not subject-matter experts and that instructions, desired output, role, audience, tone, and iteration influence generated responses.",
        sourceType: "Institutional guidance",
        stability: "Review quarterly",
      },
      {
        title: "Towards Understanding Sycophancy in Language Models",
        publisher: "Anthropic",
        url: "https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models",
        note: "Primary research examining assistant responses that match a user's stated belief over a more truthful response, and the possible role of human preference judgments. The study does not establish that every agreeable answer is sycophantic or false.",
        sourceType: "Primary model-behavior research",
        datePublished: "October 23, 2023",
        stability: "Review annually",
      },
      {
        title: "Sycophancy in GPT-4o: What Happened and What We're Doing About It",
        publisher: "OpenAI",
        url: "https://openai.com/index/sycophancy-in-gpt-4o/",
        note: "Official account of an April 2025 model update that was rolled back after it produced overly flattering or agreeable responses. The incident concerned one particular update and must not be generalized to every OpenAI model or current AI product.",
        sourceType: "Official deployment incident report",
        datePublished: "April 29, 2025",
        stability: "Stable historical incident; review annually for relevant follow-up",
      },
      {
        title: "Expanding on What We Missed with Sycophancy",
        publisher: "OpenAI",
        url: "https://openai.com/index/expanding-on-sycophancy/",
        note: "Official post-incident discussion of reward signals, evaluation gaps, qualitative testing, and the difficulty of identifying behavior failures before deployment.",
        sourceType: "Official deployment postmortem",
        datePublished: "May 2, 2025",
        stability: "Stable historical account; review annually",
      },
      {
        title: "Responsible AI at Stanford",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/security/responsibleai",
        note: "Stanford guidance on responsible experimentation, verification, privacy, security, transparency, and human responsibility.",
        sourceType: "Institutional guidance",
        stability: "Review quarterly",
      },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "The Stanford prompt and responsible-AI guidance are reviewed quarterly. The Anthropic study and the two OpenAI incident posts are dated historical sources: check annually for follow-up work, and never restate either as a description of current model behavior generally.",
    },
  },
  {
    title: "Why did it forget what I told it earlier?",
    slug: "why-did-it-forget",
    summary:
      "Distinguish conversation context, memory, instructions, and active sources; then restate the task and check what the next answer is actually using.",
    status: "published",
    order: 9,
    collectionId: "working-critically-with-ai",
    collectionOrder: 2,
    globalOrder: 8,
    badge: "Faculty guide",
    readTime: "5 min",
    reviewedThrough: "2026-08-04",
    topicTags: [
      "Context windows",
      "AI memory",
      "Long conversations",
      "Active sources",
      "File retrieval",
      "Prompt management",
      "Faculty workflows",
    ],
    // Not featured: the homepage already carries the collection's first guide, and
    // this one is reached through the collection rather than promoted separately.
    featured: false,
    previousGuideSlug: "why-does-it-agree-with-me",
    nextGuideSlug: "why-does-it-sound-so-certain",
    audience: "Faculty",
    answer:
      "It may not have “forgotten.” The detail may be outside the current working context, absent from the active source set, displaced by newer instructions, or stored only in a selective memory or personalization feature.",
    answerSecond:
      "Before relying on the next answer, restate the task, reattach the critical source, and review a short context receipt against your own record.",
    facultyMove: "Restate it. Reattach it. Review the context.",
    facultyMoveSupport:
      "Do not rely on “as we discussed above” when the detail matters. Put the current task, authoritative source, version, and binding constraints close to the work you are asking the system to do.",
    resourceTopics: ["general-chat", "prompting", "responsible-ai", "tool-selection"],
    resourceLinkText: "Why did it forget what I told it earlier?",
    // Product-shaped phrasings ("ChatGPT forgot", "AI cannot find file") are what a
    // faculty member types. They stay out of visible copy: the guide talks about
    // working context and active sources, not about a product that forgot.
    searchTerms: [
      "why did AI forget",
      "AI forgot earlier instructions",
      "ChatGPT forgot",
      "Claude forgot",
      "Gemini forgot",
      "AI context window",
      "conversation context",
      "AI memory",
      "ChatGPT memory",
      "AI Playground memory",
      "project instructions",
      "active sources",
      "selected sources",
      "context receipt",
      "long AI conversation",
      "context drift",
      "lost in the middle",
      "AI forgot uploaded file",
      "AI cannot find file",
      "NotebookLM selected sources",
      "start a new AI chat",
      "restate prompt",
      "reattach source",
      "AI conversation history",
      "context packet",
    ],
    sourceNotes: [
      {
        title: "Stanford AI Playground FAQs",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/aiplayground/faqs",
        note: "Explains context limits across conversations, model variability, retention of text and files, Temporary Chat, file-upload troubleshooting, and current AI Playground data practices.",
        sourceType: "Institutional service documentation",
        stability: "Review before every product-specific reuse",
      },
      {
        title: "AI Playground Quick Start Guide",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/aiplayground",
        note: "Current instructions and descriptions for Memories, File Search, attached files, prompts, parameters, and other AI Playground controls.",
        sourceType: "Institutional service documentation",
        stability: "Review before every interface-specific reuse",
      },
      {
        title: "Context Windows",
        publisher: "Anthropic",
        url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
        note: "Defines the context window as working material for the current response, distinguishes it from training data, and describes rolling context, compaction, and degradation as context grows. Implementation details differ among models, APIs, and chat products: do not generalize every Anthropic implementation detail to every service.",
        sourceType: "Official technical documentation",
        stability: "Review quarterly",
      },
      {
        title: "Memory FAQ",
        publisher: "OpenAI",
        url: "https://help.openai.com/en/articles/8590148-memory-faq",
        note: "Current explanation of ChatGPT memory, memory summaries, memory sources, controls, Temporary Chat, and the fact that visible memory information may not show every detail or factor.",
        sourceType: "Official product documentation",
        stability: "Review before every product-specific reuse",
      },
      {
        title: "Understanding Claude’s Personalization Features",
        publisher: "Anthropic",
        url: "https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features",
        note: "Distinguishes account-wide instructions, project instructions, and other personalization features.",
        sourceType: "Official product documentation",
        stability: "Review before every product-specific reuse",
      },
      {
        title: "Get Started with the NotebookLM Mobile App",
        publisher: "Google",
        url: "https://support.google.com/notebooklm/answer/16296687",
        note: "Documents source selection and deselection and retention of notebook chat history.",
        sourceType: "Official product documentation",
        stability: "Review before every interface-specific reuse",
      },
      {
        title: "Add or Discover New Sources for Your Notebook",
        publisher: "Google",
        url: "https://support.google.com/notebooklm/answer/16215270",
        note: "Explains source selection, imported source copies, and manual synchronization of changed Google files.",
        sourceType: "Official product documentation",
        stability: "Review before every interface-specific reuse",
      },
      {
        title: "Lost in the Middle: How Language Models Use Long Contexts",
        publisher: "Transactions of the Association for Computational Linguistics",
        url: "https://aclanthology.org/2024.tacl-1.9/",
        note: "Peer-reviewed research finding that tested long-context models did not use relevant information uniformly and often performed worse when relevant information appeared in the middle of long inputs. DOI 10.1162/tacl_a_00638. The study evaluated specified models and tasks: it does not establish that every current model fails in the same way, or that long-context performance has not improved.",
        sourceType: "Peer-reviewed primary research",
        datePublished: "2024",
        stability: "Review annually",
      },
      {
        title: "GenAI Prompt Guide",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/ai/prompt-guide",
        note: "Stanford guidance on clear instructions, context, desired output, role, audience, tone, iteration, and responsible experimentation.",
        sourceType: "Institutional guidance",
        stability: "Review quarterly",
      },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "Current product behavior lives in app/lib/currentContextFeatures.ts, which carries its own monthly review date and withholds its feature summaries once that date passes. Nothing about a current interface belongs in this guide's durable prose.",
    },
  },
  {
    title: "Why does it sound so certain?",
    slug: "why-does-it-sound-so-certain",
    summary:
      "Separate confident wording from evidence, classify material claims, expose unsupported precision, and identify what should be checked next.",
    status: "published",
    order: 10,
    collectionId: "working-critically-with-ai",
    collectionOrder: 3,
    globalOrder: 9,
    badge: "Faculty guide",
    readTime: "6 min",
    reviewedThrough: "2026-08-05",
    topicTags: [
      "AI confidence",
      "Uncertainty",
      "Calibration",
      "Source verification",
      "Unsupported precision",
      "Faculty judgment",
      "Decision support",
    ],
    // Not featured: the homepage carries the collection's first guide, and this
    // one is reached through the collection, search, and AI Resources.
    featured: false,
    previousGuideSlug: "why-did-it-forget",
    nextGuideSlug: "get-useful-ai-feedback",
    audience: "Faculty",
    answer:
      "Because fluent, decisive language is part of how the response is generated—not a transparent meter of whether the claim is correct.",
    answerSecond:
      "Treat tone and self-reported confidence as additional claims to inspect. Ask what evidence supports each material statement, what remains uncertain, and what would change the answer.",
    facultyMove: "Claim. Evidence. Uncertainty. Next check.",
    facultyMoveSupport:
      "For every material statement, identify what kind of claim it is, what supports it, what remains unknown, and what evidence or human review should happen before reliance.",
    resourceTopics: [
      "general-chat",
      "responsible-ai",
      "critical-review",
      "prompting",
      "source-verification",
    ],
    resourceLinkText: "Why does it sound so certain?",
    // The vocabulary a faculty member types when an answer sounds surer than its
    // evidence. Kept out of visible copy: "90% confident AI" and "AI
    // overconfidence" are search phrasings, not claims the guide makes.
    searchTerms: [
      "why does AI sound certain",
      "AI sounds confident",
      "AI overconfidence",
      "confident AI answer",
      "AI confidence score",
      "AI uncertainty",
      "calibrated confidence",
      "AI calibration",
      "90% confident AI",
      "unsupported precision",
      "source needed",
      "AI claims without evidence",
      "AI certainty",
      "AI confidence percentage",
      "hallucination confidence",
      "evidence and uncertainty",
      "what would change the answer",
      "AI prediction estimate",
      "fact versus interpretation",
      "AI recommendation",
      "verify AI confidence",
    ],
    sourceNotes: [
      {
        title: "GenAI Prompt Guide",
        publisher: "Stanford University IT",
        url: "https://uit.stanford.edu/ai/prompt-guide",
        note: "Explains that popular text-based generative AI tools are language and content production systems rather than subject-matter experts, and that instructions, context, role, tone, audience, and iteration shape output.",
        sourceType: "Institutional guidance",
        stability: "Review quarterly",
      },
      {
        title:
          "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile",
        publisher: "National Institute of Standards and Technology",
        url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        note: "Identifies confabulation and inappropriate user trust as important generative AI risks and provides a broader framework for testing, evaluation, verification, validation, and risk management. Publication page last updated April 8, 2026.",
        sourceType: "Government standards guidance",
        datePublished: "July 26, 2024",
        stability: "Review annually and when NIST publishes a revision",
      },
      {
        title: "Why Language Models Hallucinate",
        publisher: "OpenAI",
        url: "https://openai.com/index/why-language-models-hallucinate/",
        note: "Official research discussion of confidently generated false answers, evaluation incentives that reward guessing, abstention, and the distinction between accuracy and error rates. The publication describes a statistical account and examples from specified evaluations. It does not establish the error rate of every current model or task.",
        sourceType: "Official primary research publication",
        datePublished: "September 5, 2025",
        stability: "Review annually",
      },
      {
        title: "Teaching Models to Express Their Uncertainty in Words",
        publisher: "OpenAI",
        url: "https://openai.com/index/teaching-models-to-express-their-uncertainty-in-words/",
        note: "Reports that a GPT-3 model could be trained to express calibrated verbal confidence in specified tasks and evaluation conditions. The result does not establish that ordinary confidence statements from every current chat product are calibrated.",
        sourceType: "Official primary research publication",
        datePublished: "May 28, 2022",
        stability: "Stable research result; review annually for later work",
      },
      {
        title: "Language Models (Mostly) Know What They Know",
        publisher: "Anthropic",
        url: "https://www.anthropic.com/research/language-models-mostly-know-what-they-know",
        note: "Primary research studying whether specified models could predict the validity of their answers and express useful uncertainty under particular formats and tasks. The reported calibration did not generalize equally across every task, and the study does not validate arbitrary self-reported confidence in current products.",
        sourceType: "Primary model-behavior research",
        datePublished: "July 11, 2022",
        stability: "Stable research result; review annually for later work",
      },
      {
        title: "MetaFaith: Faithful Natural Language Uncertainty Expression in LLMs",
        publisher: "Association for Computational Linguistics",
        url: "https://aclanthology.org/2025.emnlp-main.1505/",
        note: "Peer-reviewed research evaluating whether linguistic expressions of uncertainty faithfully reflected model uncertainty across multiple models, datasets, and prompting strategies. The findings concern the evaluated systems, tasks, and interventions. They do not establish that every uncertainty statement is unfaithful.",
        sourceType: "Peer-reviewed primary research",
        datePublished: "November 2025",
        stability: "Review annually",
      },
      {
        title: "Uncertainty in Language Models: Assessment through Rank-Calibration",
        publisher: "Association for Computational Linguistics",
        url: "https://aclanthology.org/2024.emnlp-main.18/",
        note: "Peer-reviewed research describing methods for evaluating whether higher uncertainty corresponds to lower response quality across many examples.",
        sourceType: "Peer-reviewed primary research",
        datePublished: "November 2024",
        stability: "Review annually",
      },
      {
        title: "OpenAI Model Spec",
        publisher: "OpenAI",
        url: "https://model-spec.openai.com/",
        note: "Current public intended-behavior framework, including the goal of expressing uncertainty rather than giving confident information that may be incorrect. The specification describes intended behavior. It does not certify the calibration or correctness of an individual response.",
        sourceType: "Official intended-behavior specification",
        stability: "Review before every major reuse",
      },
    ],
    reviewCadence: {
      durableGuidance: "Review annually.",
      institutionalLinks:
        "The Stanford prompt guidance is reviewed quarterly and the OpenAI Model Spec before every major reuse. The five research sources are dated: check annually for later work, and never restate a calibration result measured on one model, task, or evaluation as a description of current products generally.",
    },
  },
  {
    title: "How do I get useful feedback instead of generic praise?",
    slug: "get-useful-ai-feedback",
    summary:
      "Use criteria, reader roles, source requirements, and revision questions to get feedback that supports rather than replaces judgment.",
    status: "planned",
    order: 11,
    collectionId: "working-critically-with-ai",
    collectionOrder: 4,
    globalOrder: 10,
    badge: "Coming later",
    topicTags: ["Feedback", "Criteria", "Revision"],
    featured: false,
    previousGuideSlug: "why-does-it-sound-so-certain",
    nextGuideSlug: "compare-ai-answers",
  },
  {
    title: "How do I compare two AI answers without taking a vote?",
    slug: "compare-ai-answers",
    summary:
      "Compare source paths, support, assumptions, omissions, and verification rather than treating generated answers as independent votes.",
    status: "planned",
    order: 12,
    collectionId: "working-critically-with-ai",
    collectionOrder: 5,
    globalOrder: 11,
    badge: "Coming later",
    topicTags: ["Comparison", "Sources", "Verification"],
    featured: false,
    previousGuideSlug: "get-useful-ai-feedback",
  },
];

/**
 * The first collection's id, used as the default where a caller means "the
 * foundational collection". The collections' own records live in
 * ./learnAiCollections.ts — one model, with counts derived from these guides.
 */
export const CORE_COLLECTION_ID: CollectionId = "core-ai-decisions";

/** True for a numbered guide; false for a supporting process resource. */
export function isCollectionGuide(guide: Guide): boolean {
  return (guide.kind ?? "guide") === "guide";
}

/** The numbered guides in a collection, in collection order. */
export function collectionGuides(collectionId: CollectionId = CORE_COLLECTION_ID): Guide[] {
  return guides
    .filter((g) => isCollectionGuide(g) && g.collectionId === collectionId)
    .sort((a, b) => (a.collectionOrder ?? a.order) - (b.collectionOrder ?? b.order));
}

/** Published guides in a collection — the only ones with a route. */
export function collectionPublishedGuides(collectionId: CollectionId): Guide[] {
  return collectionGuides(collectionId).filter((g) => g.status === "published");
}

/** Recorded but unpublished guides in a collection. They must not be linked. */
export function collectionPlannedGuides(collectionId: CollectionId): Guide[] {
  return collectionGuides(collectionId).filter((g) => g.status === "planned");
}

/**
 * A collection is complete when nothing in it remains planned. Derived per
 * collection, not site-wide: an in-progress second collection must not make the
 * first one look unfinished.
 */
export function collectionIsComplete(collectionId: CollectionId): boolean {
  return (
    collectionGuides(collectionId).length > 0 &&
    collectionPlannedGuides(collectionId).length === 0
  );
}

/** All primary guides in every collection, in internal (global) order. */
export function primaryGuides(): Guide[] {
  return guides
    .filter(isCollectionGuide)
    .sort((a, b) => (a.globalOrder ?? a.order) - (b.globalOrder ?? b.order));
}

/**
 * The status of the guide a page points forward to, read from that guide's own
 * record rather than copied onto this one — a duplicated status is the field that
 * goes stale when a planned guide is published.
 */
export function nextGuideStatus(slug: string): GuideStatus | undefined {
  return nextGuide(slug)?.status;
}

/** Published supporting resources — real pages, but not collection cards. */
export function processResources(): Guide[] {
  return orderedGuides().filter((g) => g.kind === "process-resource" && g.status === "published");
}

/** Primary guides with a route, across every collection. */
export function publishedGuideCount(): number {
  return guides.filter((g) => g.status === "published" && isCollectionGuide(g)).length;
}

/** Primary guides recorded but not yet published, across every collection. */
export function plannedGuideCount(): number {
  return guides.filter((g) => g.status === "planned" && isCollectionGuide(g)).length;
}

/** Guides in reading order. */
export function orderedGuides(): Guide[] {
  return [...guides].sort((a, b) => a.order - b.order);
}

/** Only guides that have a real route — what search and the sitemap may list. */
export function publishedGuides(): Guide[] {
  return orderedGuides().filter((g) => g.status === "published");
}

export function getGuide(slug: string): Guide {
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Unknown guide: ${slug}`);
  return guide;
}

/** The guide that follows this one, published or not, for series navigation. */
export function nextGuide(slug: string): Guide | undefined {
  const { nextGuideSlug } = getGuide(slug);
  return nextGuideSlug ? guides.find((g) => g.slug === nextGuideSlug) : undefined;
}

/** The guide before this one, for series navigation. */
export function previousGuide(slug: string): Guide | undefined {
  const { previousGuideSlug } = getGuide(slug);
  return previousGuideSlug ? guides.find((g) => g.slug === previousGuideSlug) : undefined;
}

/**
 * Text the site search matches a query against: the summary plus any extra
 * vocabulary from the record. A neighbour's status is always read from that
 * guide's own record rather than copied, so the two cannot drift apart.
 */
export function guideSearchText(guide: Guide): string {
  return [guide.summary, ...(guide.topicTags ?? []), ...(guide.searchTerms ?? [])].join(" ");
}

/**
 * Published guides associated with a directory topic, in series order. The AI
 * Resources page reads related guides through this rather than repeating links,
 * so publishing a guide with a matching topic surfaces it there automatically.
 */
export function guidesForResourceTopic(topic: ResourceTopic, exclude: string[] = []): Guide[] {
  return publishedGuides().filter(
    (g) => g.resourceTopics?.includes(topic) && !exclude.includes(g.slug),
  );
}

export function guideHref(slug: string): string {
  return `/learn-ai/${slug}`;
}

// -----------------------------------------------------------------------------
// Validation
//
// The series can fail in two quiet ways: a published guide can point forward at a
// slug that does not exist, and the declared release status can drift out of step
// with the guide records — leaving either an empty "Coming next" slot or a
// completion note above an unpublished guide. Both throw at import.
// -----------------------------------------------------------------------------

export type GuideSeriesValidation = { errors: string[]; warnings: string[] };

export function validateGuideSeries(): GuideSeriesValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const slugs = new Set(guides.map((g) => g.slug));
  const orders = new Set<number>();

  for (const g of guides) {
    if (orders.has(g.order)) errors.push(`guide ${g.slug}: duplicate order ${g.order}`);
    orders.add(g.order);
    if (!g.badge) errors.push(`guide ${g.slug}: missing badge`);
    if (!g.summary) errors.push(`guide ${g.slug}: missing summary`);

    if (g.status === "published") {
      if (!g.readTime) errors.push(`guide ${g.slug}: a published guide needs a readTime`);
      if (!g.reviewedThrough) errors.push(`guide ${g.slug}: a published guide needs reviewedThrough`);
      if (g.badge === "Coming next") {
        errors.push(`guide ${g.slug}: a published guide must not keep the "Coming next" badge`);
      }
    }

    // A neighbour slug that does not resolve renders as a dead end.
    for (const [field, slug] of Object.entries({
      nextGuideSlug: g.nextGuideSlug,
      previousGuideSlug: g.previousGuideSlug,
    })) {
      if (slug && !slugs.has(slug)) {
        errors.push(`guide ${g.slug}: ${field} points at unknown slug "${slug}"`);
      }
    }
    // Series links must be reciprocal, or one direction of navigation vanishes.
    if (g.nextGuideSlug) {
      const next = guides.find((n) => n.slug === g.nextGuideSlug);
      if (next && next.previousGuideSlug !== g.slug) {
        errors.push(`guide ${g.slug}: nextGuideSlug "${g.nextGuideSlug}" does not link back`);
      }
    }
  }

  // Each collection numbers its own guides from 1, contiguously. A gap or a
  // duplicate would render as "Guide 3 of 5" with no guide 2.
  const collectionIds = [...new Set(guides.map((g) => g.collectionId).filter(Boolean))];
  for (const id of collectionIds as CollectionId[]) {
    const inThisCollection = collectionGuides(id);
    const collectionOrders = inThisCollection.map((g) => g.collectionOrder ?? 0);
    for (let i = 0; i < collectionOrders.length; i += 1) {
      if (collectionOrders[i] !== i + 1) {
        errors.push(
          `collection "${id}": collectionOrder is not contiguous — expected ${i + 1}, found ${collectionOrders[i]}`,
        );
        break;
      }
    }
  }

  // globalOrder is the internal number across every collection. It must be
  // present, unique, contiguous from 1, and agree with the collections' reading
  // order — otherwise "guide 7" means different things to different maintainers.
  const primaries = primaryGuides();
  const seenGlobal = new Set<number>();
  for (const g of primaries) {
    if (g.globalOrder === undefined) {
      errors.push(`guide ${g.slug}: a primary guide needs a globalOrder`);
      continue;
    }
    if (seenGlobal.has(g.globalOrder)) {
      errors.push(`guide ${g.slug}: duplicate globalOrder ${g.globalOrder}`);
    }
    seenGlobal.add(g.globalOrder);
  }
  primaries.forEach((g, i) => {
    if (g.globalOrder !== undefined && g.globalOrder !== i + 1) {
      errors.push(
        `guide ${g.slug}: globalOrder ${g.globalOrder} is not contiguous — expected ${i + 1}`,
      );
    }
  });
  for (const g of guides) {
    if (g.kind === "process-resource" && g.globalOrder !== undefined) {
      errors.push(
        `process resource ${g.slug}: must not carry a globalOrder — it is not a primary guide in any collection`,
      );
    }
  }

  for (const g of guides) {
    if (isCollectionGuide(g) && !g.collectionId) {
      errors.push(`guide ${g.slug}: a numbered guide needs a collectionId`);
    }
    if (g.kind === "process-resource") {
      if (g.collectionId || g.collectionOrder) {
        errors.push(
          `process resource ${g.slug}: must not carry a collectionId or collectionOrder — it is not a numbered card`,
        );
      }
      if (g.featured) {
        errors.push(`process resource ${g.slug}: must not be featured alongside the collection guides`);
      }
    }
  }

  // Inside a collection, every guide but the last points forward. A missing link
  // in the middle is a dead end; a link on the last one points past the end.
  for (const id of collectionIds as CollectionId[]) {
    const inThisCollection = collectionGuides(id);
    const last = inThisCollection[inThisCollection.length - 1];
    for (const g of inThisCollection) {
      if (g.slug === last?.slug) {
        if (g.nextGuideSlug) {
          errors.push(
            `guide ${g.slug}: is the last guide in "${id}" but points forward to "${g.nextGuideSlug}"`,
          );
        }
      } else if (!g.nextGuideSlug) {
        errors.push(`guide ${g.slug}: is not the last guide in "${id}" but has no nextGuideSlug`);
      }
    }
    // A forward or backward link must stay inside its own collection. Linking
    // across collections is what would turn a finished collection into the first
    // half of a longer series.
    for (const g of inThisCollection) {
      for (const [field, slug] of [
        ["nextGuideSlug", g.nextGuideSlug],
        ["previousGuideSlug", g.previousGuideSlug],
      ] as const) {
        if (!slug) continue;
        const neighbour = guides.find((n) => n.slug === slug);
        if (neighbour && neighbour.collectionId !== id) {
          errors.push(
            `guide ${g.slug}: ${field} points at "${slug}" in collection "${neighbour.collectionId}". ` +
              "Series links stay inside one collection — a finished collection must not read as the " +
              "first half of a longer sequence.",
          );
        }
      }
    }
  }

  return { errors, warnings };
}

const seriesValidation = validateGuideSeries();
if (seriesValidation.errors.length) {
  throw new Error(`Guide series is invalid:\n  - ${seriesValidation.errors.join("\n  - ")}`);
}
for (const w of seriesValidation.warnings) {
  console.warn(`[guides] ${w}`);
}

/** Formats an ISO date as the site writes dates in prose. */
export function formatReviewDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

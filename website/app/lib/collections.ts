// Single source of truth for how Skills are grouped into collections on the site.
// Adding a future collection is a one-entry change here; the hub and the
// per-collection pages render from this data.

export type CollectionStatus = "available" | "coming-soon";

export type Collection = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  route: string;
  status: CollectionStatus;
  frontDoor?: string; // slug of the entry-point Skill, if any
  slugs: string[]; // ordered member slugs (available collections only)
};

// The eight destination questions for the AI Judgment Series (Where to Start with AI is the front door).
export const judgmentQuestions: Record<string, string> = {
  "where-to-start-with-ai": "Where should I begin?",
  "how-ai-systems-work": "What is an AI system made of?",
  "understand-an-ai-tool": "What is this product, and what does it add?",
  "check-an-ai-claim": "What is being claimed, and what does the evidence establish?",
  "problem-based-approach-to-ai": "Is AI the right answer to this problem?",
  "test-what-ai-can-do": "What happens when we test the behavior directly?",
  "plan-an-ai-pilot": "Does the whole workflow actually perform?",
  "test-ai-governance": "Who is accountable, and who can stop it?",
  "bring-ai-into-teaching": "How should this change my teaching?",
};

// The nine questions for the Faculty Research & Scholarship collection
// (Research Support Guide is the front door; the other eight are destinations).
export const researchQuestions: Record<string, string> = {
  "research-support-guide": "Where should I start?",
  "research-project-planner": "Is this a researchable project yet?",
  "literature-review-helper": "What has already been said?",
  "legal-research-planner": "What authorities do I need, and how do I keep them current?",
  "argument-builder": "Does my argument earn its conclusion?",
  "draft-revision-coach": "Is the draft built in the right order?",
  "citation-checker": "Do my sources exist and support the point?",
  "scholarly-writing-editor": "Is the prose clear without losing the meaning?",
  "publication-planner": "Where should this be published, and how?",
  "public-writing-adapter": "How do I reach a wider audience without flattening the evidence?",
};

// The twelve questions for the SLS Legal Skills collection
// (Legal Skills Guide is the front door; the other eleven are destinations).
export const legalQuestions: Record<string, string> = {
  "legal-skills-guide": "Where should I start?",
  "legal-question-framer": "What exactly is the legal question?",
  "case-law-analyzer": "What does this opinion actually hold?",
  "doctrine-mapper": "How does this doctrine fit together?",
  "statute-regulation-interpreter": "What does the text mean in context?",
  "legislative-administrative-history-navigator": "What does the history really show?",
  "comparative-law-research-planner": "How do these legal systems compare?",
  "litigation-record-analyzer": "What was filed, argued, found, and decided?",
  "transaction-structure-analyzer": "How does this deal actually work?",
  "professional-responsibility-analyzer": "What duty is at stake, and under which rule?",
  "legal-argument-stress-tester": "Does this argument survive its strongest challenge?",
  "legal-authority-verifier": "Do the sources support the claim?",
};

// One-line marketing hooks per Skill (used on cards and collection pages).
export const skillHooks: Record<string, string> = {
  "where-to-start-with-ai": "Not sure where to start? Answer a few questions and get a personal route.",
  "how-ai-systems-work": "Stop nodding along to AI jargon — see what a system is actually made of.",
  "understand-an-ai-tool": "Cut through the sales deck and find out what a tool really is.",
  "check-an-ai-claim": "Put the hype on the stand and test it against the evidence.",
  "problem-based-approach-to-ai": "Start with the work, not the tool — and find out if AI even belongs.",
  "test-what-ai-can-do": "Run a five-minute experiment and watch AI succeed — and fail.",
  "plan-an-ai-pilot": "Turn an impressive demo into evidence you can actually trust.",
  "test-ai-governance": "Decide who may do what, with which evidence, and who can pull the plug.",
  "bring-ai-into-teaching": "Bring AI into class only where it deepens real learning.",
  "course-and-syllabus-designer": "Design a whole course or refresh a tired syllabus in an afternoon.",
  "class-session-planner": "Walk into your next class with a tight, timed, ready-to-teach plan.",
  "assessment-and-rubric-builder": "Build fair exams and rubrics that measure real learning.",
  "faculty-ai-policy-builder": "Set a clear, defensible AI policy for your course in minutes.",
  "socratic-question-and-hypothetical-designer": "Generate cold-call sequences and hypotheticals that actually land.",
  "teaching-materials-accessibility-reviewer": "Catch accessibility barriers before your students hit them.",
  "reading-list-and-course-materials-curator": "Build and verify a balanced, current reading list without the busywork.",
  "research-support-guide": "Not sure which research helper you need? Answer a few questions and get pointed to the right one.",
  "research-project-planner": "Turn a big, vague idea into a project you can actually finish.",
  "literature-review-helper": "Map the scholarly conversation before you claim a gap in it.",
  "legal-research-planner": "Build a legal research trail that holds up — and stays current.",
  "argument-builder": "Pressure-test your thesis until it earns its conclusion.",
  "draft-revision-coach": "Fix the architecture of a draft before you polish the sentences.",
  "citation-checker": "Catch the citation that doesn't exist — or doesn't say what you claim.",
  "scholarly-writing-editor": "Sharpen the prose without letting anyone rewrite your argument.",
  "publication-planner": "Match finished work to the right venue, with the rules that apply today.",
  "public-writing-adapter": "Take your scholarship to a wider audience without losing the caveats.",
  "legal-skills-guide": "Not sure which legal helper you need? Start here and get routed to the right one.",
  "legal-question-framer": "Frame a precise legal question before researching or teaching it.",
  "case-law-analyzer": "Analyze opinions without losing posture, authority, or nuance.",
  "doctrine-mapper": "Map rules, tests, exceptions, splits, and doctrinal movement.",
  "statute-regulation-interpreter": "Interpret legal text with structure, history, and authority intact.",
  "legislative-administrative-history-navigator": "Plan and weigh legislative and rulemaking history research.",
  "comparative-law-research-planner": "Plan careful cross-jurisdictional legal research.",
  "litigation-record-analyzer": "Build a reliable procedural and document map from a record.",
  "transaction-structure-analyzer": "Explain agreement architecture and risk allocation for teaching.",
  "professional-responsibility-analyzer": "Analyze ethics questions for scholarship and teaching.",
  "legal-argument-stress-tester": "Test a legal position against its strongest weaknesses.",
  "legal-authority-verifier": "Audit whether legal sources support the propositions claimed.",
};

const JUDGMENT_SLUGS = [
  "where-to-start-with-ai",
  "how-ai-systems-work",
  "understand-an-ai-tool",
  "check-an-ai-claim",
  "problem-based-approach-to-ai",
  "test-what-ai-can-do",
  "plan-an-ai-pilot",
  "test-ai-governance",
  "bring-ai-into-teaching",
];

const TEACHING_SLUGS = [
  "course-and-syllabus-designer",
  "class-session-planner",
  "assessment-and-rubric-builder",
  "faculty-ai-policy-builder",
  "socratic-question-and-hypothetical-designer",
  "teaching-materials-accessibility-reviewer",
  "reading-list-and-course-materials-curator",
];

const RESEARCH_SLUGS = [
  "research-support-guide",
  "research-project-planner",
  "literature-review-helper",
  "legal-research-planner",
  "argument-builder",
  "draft-revision-coach",
  "citation-checker",
  "scholarly-writing-editor",
  "publication-planner",
  "public-writing-adapter",
];

const LEGAL_SLUGS = [
  "legal-skills-guide",
  "legal-question-framer",
  "case-law-analyzer",
  "doctrine-mapper",
  "statute-regulation-interpreter",
  "legislative-administrative-history-navigator",
  "comparative-law-research-planner",
  "litigation-record-analyzer",
  "transaction-structure-analyzer",
  "professional-responsibility-analyzer",
  "legal-argument-stress-tester",
  "legal-authority-verifier",
];

export const collections: Collection[] = [
  {
    id: "judgment-series",
    name: "AI Judgment Series",
    tagline: "Problem first. Tool second. Evidence always.",
    blurb:
      "Nine conversational skills that build the judgment to use AI well — understand how systems work, interrogate claims and products, decide whether AI even fits, test what it can and cannot do, design responsible pilots and governance, and carry what you learn into the classroom. Start at this guide and take only the route you need.",
    route: "/skills/judgment-series",
    status: "available",
    frontDoor: "where-to-start-with-ai",
    slugs: JUDGMENT_SLUGS,
  },
  {
    id: "teaching",
    name: "Teaching & Course Design",
    tagline: "From a blank page to a ready-to-teach course.",
    blurb:
      "Seven hands-on partners for the work of teaching — design a course and syllabus, plan a single class, build assessments and rubrics, set an AI policy, craft Socratic questions, check accessibility, and curate reading lists. Bring your goals; get clean, review-ready drafts.",
    route: "/skills/teaching",
    status: "available",
    slugs: TEACHING_SLUGS,
  },
  {
    id: "research",
    name: "Faculty Research & Scholarship",
    tagline: "From first idea to published — and adapted — work.",
    blurb:
      "Ten conversational partners for the arc of scholarship — scope a project, review the literature, plan authoritative legal research, build and pressure-test an argument, revise structure, check every citation, edit the prose, plan publication, and adapt finished work for a wider audience. Start at the guide and take only the helper your stage needs. Sources are verified, never invented.",
    route: "/skills/research",
    status: "available",
    frontDoor: "research-support-guide",
    slugs: RESEARCH_SLUGS,
  },
  {
    id: "legal",
    name: "SLS Legal Skills",
    tagline: "Authority first. Context always. Judgment remains human.",
    blurb:
      "Twelve helpers for legal method in faculty research and teaching — frame the question, read a case, map a doctrine, interpret a statute, trace legislative and administrative history, plan comparative research, analyze a litigation record or a transaction, weigh a professional-responsibility question, stress-test an argument, and verify authority. Start at the guide. Faculty research and teaching only — never client, clinic, or active-matter work.",
    route: "/skills/legal",
    status: "available",
    frontDoor: "legal-skills-guide",
    slugs: LEGAL_SLUGS,
  },
];

// Collections announced but not yet released. Add entries here as they are built;
// the hub renders them as "in development" without implying they are downloadable.
export const upcomingCollections: { name: string; tagline: string }[] = [
  { name: "Practice & Professional Readiness", tagline: "Preparing students for AI in legal practice — in development." },
];

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

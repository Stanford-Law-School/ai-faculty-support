import Link from "next/link";
import type { Metadata } from "next";
import { toolsInCategory, type AiTool } from "../lib/aiTools";
import { getGuide, guideHref, guidesForResourceTopic } from "../lib/guides";
import { AI_LEARNING_HUB_EVENTS_URL, AI_LEARNING_HUB_URL, AI_UPLOAD_URL, STUDENT_AI_LEARNING_HUB_URL } from "../lib/site";
import { SLS_STUDENT_AI_POLICY_URL } from "../lib/slsStudentAiPolicy";
import {
  formatFileSize,
  formatTutorialDate,
  publishedTutorials,
  tutorialHref,
  tutorialLibrary,
} from "../lib/tutorialLibrary";
import { ModeBadge } from "../components/ToolModes";

export const metadata: Metadata = {
  title: "AI Resources | AI and Technology Support for SLS Faculty",
  description: "AI training, legal research platforms, specialty tools, and Stanford guidance curated by the Robert Crown Law Library.",
  alternates: { canonical: "/ai-resources" },
};

type Resource = { title: string; description: string; url: string; tag?: string; featured?: boolean };

// Tool cards come from the canonical registry (app/lib/aiTools.ts) so a product
// renamed there is renamed here too. Only non-tool resources — guidance,
// training, events, digests — are listed as literal entries below.
// The critical-review guide's title comes from the guide record, so a retitled
// guide is retitled here. Its description is written for this directory: the
// record's summary is the answer-first line the guide opens with, and a directory
// card needs to say what the reader will be able to do.
const criticalReviewGuide = getGuide("why-does-it-agree-with-me");
const contextGuide = getGuide("why-did-it-forget");
const confidenceGuide = getGuide("why-does-it-sound-so-certain");

const sections: { title: string; subtitle: string; icon: string; resources: Resource[] }[] = [
  {
    title: "SLS learning resources",
    subtitle: "Guides, events, tutorials, and news curated for the legal community.",
    icon: "book",
    resources: [
      {
        title: criticalReviewGuide.title,
        description:
          "Separate requested advocacy from evaluation, request a credible challenge, check the evidence, and retain the decision.",
        url: guideHref(criticalReviewGuide.slug),
        tag: "Faculty guide",
        featured: true,
      },
      {
        title: contextGuide.title,
        description:
          "Distinguish conversation context, memory, instructions, and selected sources; then restate the task and check the active working brief.",
        url: guideHref(contextGuide.slug),
        tag: "Faculty guide",
        featured: true,
      },
      {
        title: confidenceGuide.title,
        description:
          "Separate assertive wording from source support, expose unsupported precision, and identify what evidence should be checked next.",
        url: guideHref(confidenceGuide.slug),
        tag: "Faculty guide",
        featured: true,
      },
      { title: "AI in the Library", description: "Explore the library's display highlighting AI's growing role in legal research and practice.", url: "https://ai-at-rcll.vercel.app/", tag: "Featured", featured: true },
      { title: "Harvey Academy", description: "Training designed around legal and law school use cases.", url: "https://academy.harvey.ai/", tag: "Featured", featured: true },
      { title: "AI Learning Hub", description: "Find recorded sessions, past events, and specialized tutorials from SLS.", url: AI_LEARNING_HUB_URL },
      { title: "Vibe Coding", description: "An introduction to building software through natural-language prompting.", url: "https://sls-vibe-code.vercel.app/" },
      { title: "The AI Upload", description: "The Law Library's weekly digest of AI news and developments, published Fridays.", url: AI_UPLOAD_URL, tag: "Weekly digest" },
    ],
  },
  // Official risk guidance, kept separate from the Stanford section because NIST
  // is not a Stanford service and must not read as one. It is listed once here
  // rather than repeated on every product card.
  {
    title: "Responsible AI risk and evaluation standards",
    subtitle: "Federal guidance on generative-AI risks, confabulation, and evaluation practice.",
    icon: "university",
    resources: [
      {
        title: "NIST Generative AI Profile",
        description:
          "The National Institute of Standards and Technology profile identifying confabulation and inappropriate user trust as generative AI risks, with a framework for testing, evaluation, verification, and validation.",
        url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        tag: "Standards guidance",
      },
    ],
  },
];

// Teaching with AI, and — separately, and quieter — what to do when a boundary may
// have been crossed. The two are deliberately not one list: mixing an activity
// library with reporting guidance makes designing an assignment feel like
// preparing a case. No detector vendor appears in either list: naming one would
// read as a recommendation, and Stanford advises against relying on detector
// output to decide an AI-policy question.
/**
 * Tutorial cards are generated from the tutorial records rather than retyped, so
 * a revised document changes its length, size, and date here too. The library
 * index is listed last, because it is where the next tutorial will appear.
 */
const tutorialResources: Resource[] = [
  ...publishedTutorials().map((tutorial) => ({
    title: tutorial.title,
    description:
      `${tutorial.subtitle}. ${tutorial.file.pages} pages · ${formatFileSize(tutorial.file.bytes)} · ` +
      `updated ${formatTutorialDate(tutorial.updatedOn)}.`,
    url: tutorialHref(tutorial.slug),
    tag: "Tutorial",
    featured: true,
  })),
  {
    title: "All tutorials",
    description: tutorialLibrary.growthNote,
    url: "/tutorials",
  },
];

const teachingWithAiResources: Resource[] = [
  {
    title: "How can students use AI and still learn the law?",
    description:
      "Six practical activity patterns, a complete case-brief exercise, a copyable assignment boundary, and guidance for making student judgment visible.",
    url: "/learn-ai/students-use-ai-and-learn-law",
    tag: "Faculty guide",
    featured: true,
  },
  {
    title: "SLS Use of Generative AI Technology",
    description:
      "The official Stanford Law School Student Affairs policy on student use of generative AI. Review it before finalizing course or assignment instructions.",
    url: SLS_STUDENT_AI_POLICY_URL,
  },
  {
    title: "Integrating AI into Assignments",
    description:
      "Stanford Teaching Commons guidance on learning objectives, process evidence, formative feedback, reflection, and starting with small assignment changes.",
    url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/integrating-ai-assignments",
  },
  {
    title: "Creating Your Course Policy on AI",
    description:
      "Stanford Teaching Commons guidance, questions, and sample language for defining an assignment or course AI boundary.",
    url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/creating-your-course-policy-ai",
  },
  {
    title: "Understanding AI Literacy",
    description:
      "Stanford's framework for functional, ethical, rhetorical, and pedagogical AI literacy.",
    url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/understanding-ai-literacy",
  },
  {
    title: "Student AI Learning Hub",
    description:
      "Policy-aware, problem-first AI learning and verification resources for Stanford Law students.",
    url: STUDENT_AI_LEARNING_HUB_URL,
  },
  {
    title: "AI for Legal Help",
    description:
      "An SLS Justice Innovation course in which student teams analyze legal-aid workflows and evaluate responsible AI opportunities.",
    url: "https://justiceinnovation.law.stanford.edu/courses/ai-for-legal-help/",
  },
];

const academicIntegrityResources: Resource[] = [
  {
    title: "Responding to a possible student AI-policy concern",
    description:
      "A policy-first checklist for graded-work concerns, OCS consultation, evidence, detector limitations, and fair communication.",
    url: "/learn-ai/responding-to-student-ai-concern",
    tag: "Process checklist",
  },
  {
    title: "Stanford Honor Code",
    description:
      "The shared student and instructor responsibilities for academic honesty, permitted and unpermitted aid, and assessment design.",
    url: "https://communitystandards.stanford.edu/policies-guidance/honor-code",
  },
  {
    title: "Reporting an Honor Code Concern: Faculty",
    description:
      "Office of Community Standards guidance on consultation, submitting a concern, supporting materials, and the current reporting period.",
    url: "https://communitystandards.stanford.edu/reporting-honor-code-concern-faculty",
  },
  {
    title: "Guidance on Technology Tools for Academic Integrity",
    description:
      "Stanford Teaching Commons guidance on consulting OCS first for graded work, and on why a detector result is not a finding.",
    url: "https://teachingcommons.stanford.edu/news/guidance-technology-tools-academic-integrity",
  },
];

// Stanford's responsible-use guidance is guidance, not a tool, so it keeps its
// own card rather than entering the tool registry. The prompt guide sits beside
// it for the same reason: it is official Stanford guidance about how to instruct a
// system, not a product to request access to.
const stanfordGuidance: Resource[] = [
  {
    title: "Responsible AI at Stanford",
    description: "Stanford guidance for using AI ethically, responsibly, and securely.",
    url: "https://uit.stanford.edu/security/responsibleai",
    tag: "Guidance",
  },
  {
    title: "GenAI Prompt Guide",
    description:
      "Guidance for giving clear instructions, specifying outputs, assigning roles and audiences, refining prompts, and experimenting responsibly.",
    url: "https://uit.stanford.edu/ai/prompt-guide",
    tag: "Guidance",
  },
];

function ResourceIcon({ name }: { name: string }) {
  if (name === "database") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></svg>;
  if (name === "university") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 9 9-5 9 5-9 5-9-5Zm3 3v6m12-6v6M4 20h16"/></svg>;
  if (name === "book") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5A3.5 3.5 0 0 1 20 23V5.5Z"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></svg>;
}

function ResourceCard({ resource }: { resource: Resource }) {
  const internal = resource.url.startsWith("/");
  return (
    <a
      className={`card resourceCard${resource.featured ? " resourceFeatured" : ""}`}
      href={resource.url}
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
    >
      {resource.tag && <span className="pill resourceTag"><span className="dot" />{resource.tag}</span>}
      <h3>{resource.title}</h3>
      <p className="muted">{resource.description}</p>
      <span className="explore">Learn more {internal ? "→" : "↗"}</span>
    </a>
  );
}

/**
 * A tool card built from the registry. Stanford services link to the maintained
 * classification snapshot instead of repeating risk levels; licensed platforms
 * show their local guidance, because access is not an approval level.
 */
function ToolResourceCard({ tool }: { tool: AiTool }) {
  const isStanford = tool.category === "stanford-service";
  return (
    <article className="card resourceCard toolResourceCard">
      <p className="modeBadgeRow">
        {tool.modeIds.map((id) => <ModeBadge key={id} modeId={id} />)}
      </p>
      <h3>{tool.displayName}</h3>
      {tool.formerNames.length > 0 && (
        <p className="toolFormerNames">Formerly {tool.formerNames[0]}</p>
      )}
      <p className="muted">{tool.conciseDescription}</p>
      <p className="toolAccess">
        <span className="toolLabel">Access</span>
        {tool.accessLabel}
      </p>
      {isStanford ? (
        <p className="toolGuidance">
          <span className="toolLabel">Data guidance</span>
          <Link href="/learn-ai/what-can-i-safely-share#service-snapshot-heading">
            Check current data classification
          </Link>
        </p>
      ) : (
        <p className="toolGuidance">
          <span className="toolLabel">Data guidance</span>
          Ask RCLL before using nonpublic material.{" "}
          <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>
        </p>
      )}
      <p className="toolLinks">
        {tool.accessUrl && (
          <>
            <a href={tool.accessUrl} target="_blank" rel="noopener noreferrer">
              Open the service
              <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
              <span className="srOnly"> (opens in a new tab)</span>
            </a>
            {" · "}
          </>
        )}
        <a href={tool.detailsUrl} target="_blank" rel="noopener noreferrer">
          Service details
          <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
      </p>
    </article>
  );
}

export default function AiResourcesPage() {
  // Related guides come from the guide records' resourceTopics rather than a
  // hard-coded list, so publishing a guide with a matching topic surfaces it here
  // and the verification callout keeps exactly one primary action.
  const VERIFICATION_CALLOUT_PRIMARY = "verify-an-ai-legal-claim";
  const furtherVerificationGuides = guidesForResourceTopic("source-verification", [
    VERIFICATION_CALLOUT_PRIMARY,
  ]);
  const legalDatabases = toolsInCategory("legal-database");
  const specialty = [...toolsInCategory("specialty-legal-platform"), ...toolsInCategory("simulation-platform")];
  const stanfordServices = toolsInCategory("stanford-service");

  return <>
    <header className="resourcesHero">
      <p className="eyebrow">Robert Crown Law Library</p>
      <h1>AI Resources</h1>
      <p className="lede">
        Choose the source mode before the brand. Use this directory to find the current Stanford or Law
        Library service that fits your task, then check the exact data, feature, and source boundary.
      </p>
    </header>

    <section className="card resourceCallout">
      <div>
        <p className="eyebrow">Not sure where to start?</p>
        <h2>Choose the workflow before the product</h2>
        <p className="muted">
          A six-minute faculty guide will help you identify the job, required source set, data boundary,
          and evidence you need to inspect.
        </p>
      </div>
      <Link className="primary" href="/learn-ai/which-ai-tool-fits">
        Read &ldquo;Which AI tool fits this task?&rdquo;
      </Link>
    </section>

    <aside className="card resourceNotice" aria-label="Featured announcement">
      <p><strong>New:</strong> <a href="https://academy.harvey.ai/" target="_blank" rel="noopener noreferrer">Harvey Academy</a> has offerings targeted to law school use cases. Questions? Email <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>.</p>
    </aside>

    <section className="card resourceFeatured resourceCallout">
      <div><p className="eyebrow">Start here</p><h2>AI Essentials Training</h2><p className="muted">Build a practical foundation for professional AI use, including the mindset, tools, and safety practices that matter in legal work.</p></div>
      <a className="primary" href="https://bit.ly/rcll-aiessentials" target="_blank" rel="noopener noreferrer">Begin the training ↗</a>
    </section>

    <section className="card resourceCallout">
      <div>
        <p className="eyebrow">Faculty guide</p>
        <h2>Have an AI-generated citation or legal claim?</h2>
        <p className="muted">
          Use the four-step audit before relying on it: find the authority, read the supporting
          passage, place it in context, and update it.
        </p>
        {furtherVerificationGuides.length > 0 && (
          <p className="calloutSecondary">
            {furtherVerificationGuides.map((g) => (
              <Link className="textLink" href={guideHref(g.slug)} key={g.slug}>
                {g.resourceLinkText ?? g.title}
              </Link>
            ))}
          </p>
        )}
      </div>
      <Link className="primary" href="/learn-ai/verify-an-ai-legal-claim">
        Read the legal claim verification guide
      </Link>
    </section>

    <section className="resourceSection">
      <div className="resourceSectionHead">
        <span className="resourceIcon" aria-hidden="true"><ResourceIcon name="database" /></span>
        <div>
          <h2>Legal databases</h2>
          <p className="muted">
            Core legal research platforms with integrated AI capabilities. Each provides linked legal
            sources that you must inspect and update.
          </p>
        </div>
      </div>
      <div className="resourceGrid">
        {legalDatabases.map((tool) => <ToolResourceCard key={tool.id} tool={tool} />)}
      </div>
    </section>

    <section className="resourceSection">
      <div className="resourceSectionHead">
        <span className="resourceIcon" aria-hidden="true"><ResourceIcon name="sparkles" /></span>
        <div>
          <h2>Provided by the Law Library</h2>
          <p className="muted">Specialty platforms available to the SLS community by request.</p>
        </div>
      </div>
      <div className="note" style={{ marginBottom: "1.2rem" }}>
        Complete <a href="https://bit.ly/rcll-aiessentials" target="_blank" rel="noopener noreferrer">AI Essentials Training</a> before <a href="https://bit.ly/rcll-legalairequest" target="_blank" rel="noopener noreferrer">requesting access to a specialty tool</a>.
      </div>
      <div className="resourceGrid">
        {specialty.map((tool) => <ToolResourceCard key={tool.id} tool={tool} />)}
      </div>
    </section>

    <section className="resourceSection">
      <div className="resourceSectionHead">
        <span className="resourceIcon" aria-hidden="true"><ResourceIcon name="university" /></span>
        <div>
          <h2>Stanford products and guidance</h2>
          <p className="muted">
            University-provided services and responsible-use guidance. Similar names can be separate
            services with different boundaries, so each is listed exactly.
          </p>
        </div>
      </div>
      <div className="resourceGrid">
        {stanfordGuidance.map((resource) => (
          <ResourceCard resource={resource} key={resource.title} />
        ))}
        {stanfordServices.map((tool) => <ToolResourceCard key={tool.id} tool={tool} />)}
      </div>
    </section>

    <section className="resourceSection">
      <div className="resourceSectionHead">
        <span className="resourceIcon" aria-hidden="true"><ResourceIcon name="book" /></span>
        <div>
          <h2>Teaching with AI</h2>
          <p className="muted">
            Activity patterns, assignment boundaries, AI literacy, and the Stanford and SLS policy to
            review before you finalize course instructions.
          </p>
        </div>
      </div>
      <div className="resourceGrid">
        {teachingWithAiResources.map((resource) => (
          <ResourceCard resource={resource} key={resource.title} />
        ))}
      </div>
    </section>

    <section className="resourceSection">
      <div className="resourceSectionHead">
        <span className="resourceIcon" aria-hidden="true"><ResourceIcon name="book" /></span>
        <div>
          <h2>Long-form tutorials</h2>
          <p className="muted">
            Step-by-step documents to download and keep open beside the interface you are
            configuring. Each carries its own update date and its own source-verification date.
          </p>
        </div>
      </div>
      <div className="resourceGrid">
        {tutorialResources.map((resource) => (
          <ResourceCard resource={resource} key={resource.title} />
        ))}
      </div>
    </section>

    <section className="resourceSection resourceSectionQuiet">
      <div className="resourceSectionHead">
        <span className="resourceIcon" aria-hidden="true"><ResourceIcon name="university" /></span>
        <div>
          <h2>Academic integrity and possible concerns</h2>
          <p className="muted">
            For the less common case: what to do, and in what order, when a stated boundary may have
            been crossed.
          </p>
        </div>
      </div>
      <div className="resourceGrid">
        {academicIntegrityResources.map((resource) => (
          <ResourceCard resource={resource} key={resource.title} />
        ))}
      </div>
    </section>

    {sections.map((section) => <section className="resourceSection" key={section.title}>
      <div className="resourceSectionHead"><span className="resourceIcon" aria-hidden="true"><ResourceIcon name={section.icon} /></span><div><h2>{section.title}</h2><p className="muted">{section.subtitle}</p></div></div>
      <div className="resourceGrid">{section.resources.map((resource) => <ResourceCard resource={resource} key={resource.title} />)}</div>
    </section>)}

    <section className="card resourceCallout"><div><p className="eyebrow">Events</p><h2>AI Curiosity Corner</h2><p className="muted">Explore upcoming interactive sessions designed to spark questions and build confidence with AI.</p></div><a className="secondary" href={AI_LEARNING_HUB_EVENTS_URL} target="_blank" rel="noopener noreferrer">See upcoming events ↗</a></section>
  </>;
}

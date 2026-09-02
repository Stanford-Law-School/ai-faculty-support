import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, nextGuide, previousGuide } from "../../lib/guides";
import { CopyPrompt } from "../../components/CopyPrompt";
import {
  CurrentToolExamples,
  JobComparison,
  RoutingMap,
  ToolModeCards,
} from "../../components/ToolModes";
import {
  AnswerFirst,
  ExerciseBlock,
  FacultyMove,
  GuideLayout,
  GuideSeriesStatus,
  SourceNotes,
  SourcesSensitivityStakes,
  WorthRepeating,
} from "../../components/GuideKit";

const guide = getGuide("which-ai-tool-fits");

export const metadata: Metadata = {
  title: "Which AI Tool Fits This Task? | SLS Faculty AI Guide",
  description:
    "A six-minute guide to choosing AI by task, source set, data boundary, and inspectable evidence rather than by brand.",
  alternates: { canonical: "/learn-ai/which-ai-tool-fits" },
  openGraph: {
    title: "Which AI Tool Fits This Task? | SLS Faculty AI Guide",
    description:
      "A six-minute guide to choosing AI by task, source set, data boundary, and inspectable evidence rather than by brand.",
    url: "/learn-ai/which-ai-tool-fits",
  },
};

// Product names and features on this page are checked on their own schedule,
// separate from the guide's durable review date.
const EXAMPLES_CHECKED_ON = "2026-08-03";

const questions = [
  {
    title: "What is the job?",
    body: "Name the main verb. Are you trying to generate, transform, discover, retrieve, compare, analyze, rehearse, or automate?",
    question: "What observable result do I need?",
  },
  {
    title: "What sources must it use?",
    body: "Decide whether the task requires no external source, the open web, a chosen set of documents, a licensed legal database, connected institutional material, or a person's performance.",
    question: "What must the answer be grounded in?",
  },
  {
    title: "What material may it receive?",
    body: null, // rendered with an inline link below
    question: "What is the most sensitive thing this workflow could access?",
  },
  {
    title: "What proof must remain visible?",
    body: "Decide whether the result is merely an option you can judge, or whether you must inspect a source passage, update legal authority, document an audit trail, or apply a faculty-defined rubric.",
    question: "What would I need to show another expert before relying on this?",
  },
];

const routes = [
  {
    need: "Options, language, reframing, or low-stakes rehearsal",
    modeId: "general-chat",
    check: "The result is an option you can evaluate, not a factual source.",
  },
  {
    need: "Recent public information or possible starting sources",
    modeId: "web-connected-chat",
    check: "Open every important source and confirm its date and support.",
  },
  {
    need: "Analysis of a defined set of readings or documents",
    modeId: "chosen-source-workspace",
    check: "Confirm the active source set and inspect cited passages.",
  },
  {
    need: "Cases, statutes, regulations, legal treatment, or current validity",
    modeId: "licensed-legal-research",
    check: "Open and update every authority in the legal database.",
  },
  {
    need: "Work across approved email, files, Drive, or Microsoft 365 applications",
    modeId: "connected-enterprise-workspace",
    check: "Confirm the exact connector and narrow its permissions.",
  },
  {
    need: "A guided legal review, drafting, or document-analysis workflow",
    modeId: "legal-practice-workflow",
    check: "Confirm local access, enabled features, data guidance, and source coverage.",
  },
  {
    need: "Practice and feedback on a person's performance",
    modeId: "simulation-coaching",
    check: "Use faculty-defined criteria and retain meaningful human feedback.",
  },
];

const jobRows = [
  {
    job: "Generate three alternative hypotheticals from a public excerpt",
    modeId: "general-chat",
    why: "The output is a menu of options that faculty can evaluate directly.",
  },
  {
    job: "Find recent public commentary about the opinion",
    modeId: "web-connected-chat",
    why: "Current open-web discovery is part of the task.",
  },
  {
    job: "Compare the opinion with two assigned readings",
    modeId: "chosen-source-workspace",
    why: "The intended source set is known and bounded.",
  },
  {
    job: "Find related authority and determine whether it remains current",
    modeId: "licensed-legal-research",
    why: "The task requires authoritative legal retrieval and updating.",
  },
  {
    job: "Assemble selected course materials from an approved Drive or Microsoft 365 workspace",
    modeId: "connected-enterprise-workspace",
    why: "The work depends on controlled access to institutional applications and files.",
  },
  {
    job: "Explore a guided litigation-analysis workflow using public or synthetic materials",
    modeId: "legal-practice-workflow",
    why: "The workflow is specialized for a legal task, not merely general conversation.",
  },
  {
    job: "Rehearse an oral explanation and receive feedback against faculty-defined criteria",
    modeId: "simulation-coaching",
    why: "The object of the exercise is performance, not legal retrieval.",
  },
];

// The worksheet is static markup with no inputs. Nothing is submitted anywhere.
const worksheet = [
  {
    label: "Job",
    question:
      "What is the main verb—generate, transform, discover, retrieve, compare, analyze, rehearse, or automate?",
  },
  {
    label: "Sources",
    question:
      "What must the system use—no external source, open web, chosen documents, licensed legal authority, connected institutional material, or a person's performance?",
  },
  {
    label: "Sensitivity",
    question:
      "What is the highest applicable data classification, and which exact service, feature, or connector may receive it?",
  },
  { label: "Proof", question: "What must I be able to inspect before relying on the result?" },
  { label: "Mode", question: "Which tool mode fits all four answers?" },
  {
    label: "Product",
    question: "Which currently available Stanford or SLS service provides that mode?",
  },
  {
    label: "Verification",
    question: "What will I open, compare, update, or review myself?",
  },
];

const worksheetText = [
  "AI TOOL-FIT WORKSHEET",
  "",
  ...worksheet.map(({ label, question }) => `${label}: ${question}`),
].join("\n");

const workedExample = [
  { label: "Job", value: "Compare the opinion with two assigned articles and generate possible discussion questions." },
  { label: "Sources", value: "The opinion and the two assigned articles." },
  { label: "Sensitivity", value: "Published, public material; Low Risk." },
  { label: "Proof", value: "Every characterization and question should be traceable to a selected source." },
  { label: "Mode", value: "Chosen-source workspace." },
  { label: "Product", value: "A currently approved source-grounded workspace, such as Gemini Notebook." },
  { label: "Verification", value: "Open the cited passage, compare it with the original source, and revise every question against the class learning objective." },
];

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "Name the source mode and inspect the actual source set. A polished answer is not evidence that search occurred, that the correct database was used, or that a cited passage supports the claim.",
  },
  {
    label: "Sensitivity",
    primary:
      "The same product can expose different material when files, connectors, enterprise search, custom assistants, or agents are active. Check the exact service and feature before use.",
  },
  {
    label: "Stakes",
    primary:
      "As the consequence of error rises, move toward more authoritative retrieval, stronger verification, clearer documentation, and a more explicit human decision point.",
  },
];

export default function WhichAiToolFits() {
  return (
    <GuideLayout guide={guide}>
      <AnswerFirst>
        <p>{guide.answer}</p>
        <p>{guide.answerSecond}</p>
      </AnswerFirst>

      <FacultyMove>
        <p><strong>{guide.facultyMove}</strong></p>
        <p>{guide.facultyMoveSupport}</p>
      </FacultyMove>

      <section aria-labelledby="four-questions-heading">
        <h2 id="four-questions-heading">Four questions before you choose a product</h2>
        <p>
          A familiar interface can make the decision feel settled too early. Define the work first.
        </p>
        <ol className="guideSteps">
          {questions.map(({ title, body, question }) => (
            <li key={title}>
              <h3>{title}</h3>
              {body ? (
                <p>{body}</p>
              ) : (
                <p>
                  Classify the material and{" "}
                  <Link href="/learn-ai/what-can-i-safely-share">check the exact service</Link>, account,
                  feature, and connector. Similar product names can have different approval boundaries.
                </p>
              )}
              <p className="muted"><em>{question}</em></p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="modes-heading">
        <h2 id="modes-heading">Choose the mode before the product</h2>
        <p>
          A product can support more than one mode. Turning on search, adding a file, connecting Drive,
          opening Microsoft 365 data, or launching an agent changes the source path&mdash;and may change
          the data boundary.
        </p>
        <ToolModeCards />
      </section>

      <section aria-labelledby="routing-map-heading">
        <h2 id="routing-map-heading">A fast routing map</h2>
        <p>Begin with the evidence the task requires.</p>
        <RoutingMap routes={routes} />
      </section>

      <ExerciseBlock
        heading="Choose a mode before naming a product"
        id="tool-fit"
        timeLabel="90 seconds"
      >
        <p>
          Think of one teaching, research, or scholarship task you expect to do this week. Do not open an
          AI product yet.
        </p>
        <p className="eyebrow" style={{ marginTop: "1rem" }}>AI tool-fit worksheet</p>
        <dl className="preflightList">
          {worksheet.map(({ label, question }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{question}</dd>
            </div>
          ))}
        </dl>
        <div className="actions" style={{ marginTop: "1rem" }}>
          <CopyPrompt text={worksheetText} label="Copy tool-fit worksheet" itemLabel="Worksheet" />
        </div>
        <p style={{ marginTop: "0.9rem" }}>
          <strong>Do not fill in the product line until the first four lines are complete.</strong>
        </p>
        <p className="muted" style={{ fontSize: "0.9rem" }}>
          Nothing you decide here is sent anywhere. This page has no form and records no answers.
        </p>

        <h3>Example: preparing a class on a recent appellate opinion</h3>
        <dl className="workedExample">
          {workedExample.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="muted">
          A different job involving the same opinion may require a different mode.
        </p>
      </ExerciseBlock>

      <section aria-labelledby="one-opinion-heading">
        <h2 id="one-opinion-heading">One opinion, seven different jobs</h2>
        <p>The subject matter does not select the tool. The job and source path do.</p>
        <JobComparison rows={jobRows} />
        <p>
          These are not seven competing answers to one question. They are seven different questions
          involving the same subject.
        </p>
      </section>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>You selected the evidence path before the interface.</p>
        <p>
          That prevents a familiar brand, a polished answer, or a newly released model from deciding the
          workflow for you. A powerful model in the wrong source mode is still the wrong tool for the
          task.
        </p>
        <p>
          The same product may also move between modes. Search, uploads, source selection, connectors,
          custom assistants, and agents change what the system can read, what it can expose, and what you
          must verify.
        </p>
      </section>

      <CurrentToolExamples checkedOn={EXAMPLES_CHECKED_ON} />

      <section aria-labelledby="before-continue-heading">
        <h2 id="before-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <details className="guideDetails">
        <summary>Does the newest or most capable model make a product the best choice?</summary>
        <p>Not by itself.</p>
        <p>
          Model capability can affect the quality of generation, analysis, and instruction following. But
          a task may depend more heavily on the source corpus, citator, search coverage, document set,
          connector permissions, workflow, institutional agreement, or ability to inspect supporting
          evidence.
        </p>
        <p>
          A stronger model without the required sources is not a substitute for the correct source
          environment.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Does a citation mean the answer is verified?</summary>
        <p>No. A citation is a route to verification.</p>
        <p>
          Open the source and determine whether it exists, whether the cited passage supports the
          proposition, whether the jurisdiction and date fit the task, and&mdash;for legal
          authority&mdash;whether the source remains current.
        </p>
        <p>
          A system can retrieve the right document and still summarize, characterize, or apply it
          incorrectly.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Can the same product move between modes?</summary>
        <p>
          Yes. A general chat can become web-connected when search is enabled, source-grounded when files
          are supplied, or connected to a broader workspace when a plugin, connector, custom assistant, or
          agent is activated.
        </p>
        <p>
          Record the mode and active sources, not merely the product name. Those details affect both
          evidentiary value and data exposure.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Should I ask several tools and average their answers?</summary>
        <p>Not for a factual or legal proposition.</p>
        <p>
          Several tools may be using the same open-web sources, different source sets, or no inspectable
          source at all. Agreement can reflect shared patterns rather than independent confirmation.
        </p>
        <p>
          Compare source paths and verify the underlying evidence instead of treating multiple generated
          answers as votes.
        </p>
      </details>

      <WorthRepeating>Choose the source path before the logo.</WorthRepeating>

      <SourceNotes guide={guide} />

      <section className="card" aria-labelledby="routing-help-heading">
        <h2 id="routing-help-heading" style={{ fontSize: "1.35rem" }}>
          Still deciding between two workflows?
        </h2>
        <p className="muted">
          Describe the task, required sources, and type of material&mdash;not merely the two product
          names. The Law Library can help identify the appropriate research source, Stanford service, or
          SLS platform.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <a className="primary" href="mailto:library@law.stanford.edu">Email the Law Library</a>
          <Link className="secondary" href="/ai-resources">Browse AI Resources</Link>
        </div>
      </section>

      <GuideSeriesStatus previous={previousGuide(guide.slug)} next={nextGuide(guide.slug)} />
    </GuideLayout>
  );
}

import type { Metadata } from "next";
import { getGuide, nextGuide, previousGuide } from "../../lib/guides";
import { CopyPrompt } from "../../components/CopyPrompt";
import {
  StanfordAiServiceSnapshot,
  ServiceDistinctions,
} from "../../components/StanfordAiServiceSnapshot";
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

const guide = getGuide("what-can-i-safely-share");

export const metadata: Metadata = {
  title: "What Can I Safely Share with an AI Tool? | SLS Faculty AI Guide",
  description:
    "A five-minute guide to classifying faculty material, choosing the exact Stanford AI service, and minimizing what you share.",
  alternates: { canonical: "/learn-ai/what-can-i-safely-share" },
  openGraph: {
    title: "What Can I Safely Share with an AI Tool? | SLS Faculty AI Guide",
    description:
      "A five-minute guide to classifying faculty material, choosing the exact Stanford AI service, and minimizing what you share.",
    url: "/learn-ai/what-can-i-safely-share",
  },
};

// The four pre-disclosure decisions. Deliberately outside any disclosure: this
// is the process the guide teaches, so it must be visible without interaction.
const decisions = [
  {
    title: "Is the use authorized and necessary?",
    body: "Begin with purpose. Are you permitted to use this material for this teaching, research, scholarship, clinic, or administrative task? Tool approval does not create permission that was otherwise absent.",
    question: "Why does this task require this material?",
  },
  {
    title: "What is the material's classification?",
    body: "Stanford uses Low, Moderate, and High Risk classifications. Consider the entire file, prompt, attachment, and connected source. When material contains more than one classification, use the highest applicable level.",
    question: "What is the most sensitive information the service could receive?",
  },
  {
    title: "What is the exact service boundary?",
    body: "Name the Stanford service, the account or workspace, the feature, and every connector or plugin involved. Similar names do not mean identical approvals, and a personal account is not the same service as a Stanford-provided account.",
    question: "Exactly which service and feature will process the material?",
  },
  {
    title: "What is the minimum the task requires?",
    body: "Share the smallest useful excerpt or data set. Remove unnecessary identifiers, attachments, columns, comments, tracked changes, metadata, and connected sources. Restrict an agent or connector to the narrowest available access.",
    question: "What can I remove without defeating the purpose?",
  },
];

// Starting points, not classifications. Each entry names what else to check so
// no row can be read as a decision on its own.
const materials = [
  {
    material: "Published and intentionally public material",
    examples:
      "Public court opinions, published scholarship, a public course page, or text already authorized for open distribution.",
    startingPoint: "Low Risk",
    alsoCheck:
      "Make sure the file does not also contain private notes, comments, identifiers, embedded metadata, or nonpublic attachments.",
  },
  {
    material: "Nonpublic faculty or institutional work",
    examples:
      "An unpublished article, internal memo, committee draft, draft under review, or nonpublic research material.",
    startingPoint: "Often Moderate Risk; confirm the specific material.",
    alsoCheck:
      "Data classification does not answer coauthor permission, publisher terms, nondisclosure obligations, sponsor requirements, IRB conditions, research-participant commitments, or other agreements.",
  },
  {
    material: "Student records",
    examples:
      "Grades, evaluations, admission information, or other records maintained about a student.",
    startingPoint: "Moderate Risk under Stanford's published classification examples.",
    alsoCheck:
      "FERPA and Stanford policy may govern disclosure of personally identifiable information from education records. Use the material only for an authorized educational purpose, in an approved service, and at the minimum necessary scope. Contact the University Privacy Office or appropriate Stanford office when the permitted use is uncertain.",
  },
  {
    material: "Clinic, client, or matter material",
    examples:
      "Client communications, case files, facts supplied in confidence, privileged material, or supervised clinic work.",
    startingPoint: "Do not determine the answer from this general guide alone.",
    alsoCheck:
      "Follow clinic-specific direction for the exact service and workflow before any upload or connector access. The campus service matrix does not resolve all professional-responsibility, confidentiality, supervision, or matter-specific obligations.",
  },
  {
    material: "High Risk or specially regulated information",
    examples:
      "Health information, Social Security numbers, financial account numbers, export-controlled information, or mixed files containing those elements.",
    startingPoint: "High Risk",
    alsoCheck:
      "Use only the approved route and complete every additional required privacy, security, research, health, or regulatory step. Some workflows may require a Data Risk Assessment or other review.",
  },
];

// The checklist a faculty member works through before opening an AI service.
// Nothing is collected: the page has no form, no inputs, and no submission.
const preflight = [
  { label: "Purpose", question: "What exact task am I trying to complete?" },
  {
    label: "Material",
    question:
      "What text, file, image, recording, data, or connected source would the service receive?",
  },
  { label: "Classification", question: "What is the highest applicable Stanford risk classification?" },
  {
    label: "Service boundary",
    question: "What is the exact Stanford service, account or workspace, feature, and connector?",
  },
  { label: "Minimum necessary", question: "What can I remove, shorten, de-identify, or disconnect?" },
  {
    label: "Additional obligation",
    question:
      "Do course rules, student privacy, clinic direction, a coauthor, a publisher, a contract, an NDA, a grant, an IRB, or another commitment control this use?",
  },
  {
    label: "Decision",
    question: "Proceed · Narrow the material · Use a different approved service · Ask first",
  },
];

// Built from the same records the page renders, so the copied text and the
// visible checklist cannot drift apart.
const preflightText = preflight.map(({ label, question }) => `${label}: ${question}`).join("\n");

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "Use Stanford's current Risk Classifications, AI Services Matrix, approved-connectors page, and the service-specific University IT page. Do not rely on a vendor logo, a marketing page, or memory of a previous approval.",
  },
  {
    label: "Sensitivity",
    primary:
      "Consider the entire disclosure path: prompt text, uploads, images, hidden metadata, conversation history, connected folders, email, calendar, and any source an agent can retrieve.",
  },
  {
    label: "Stakes",
    primary:
      "Disclosure may be difficult to reverse. When the classification, permission, or service boundary is uncertain, narrow the task or ask before sharing.",
  },
];

export default function WhatCanISafelyShare() {
  return (
    <GuideLayout guide={guide}>
      <AnswerFirst>
        <p>{guide.answer}</p>
      </AnswerFirst>

      <FacultyMove>
        <p><strong>{guide.facultyMove}</strong></p>
        <p>{guide.facultyMoveSupport}</p>
      </FacultyMove>

      <section aria-labelledby="four-decisions-heading">
        <h2 id="four-decisions-heading">Four decisions before you share</h2>
        <p>
          A data classification is important, but it is not the whole decision. Make these four checks
          before text, files, images, recordings, or connected sources enter an AI service.
        </p>
        <ol className="guideSteps">
          {decisions.map(({ title, body, question }) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <p className="muted"><em>{question}</em></p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="materials-heading">
        <h2 id="materials-heading">Where common faculty materials often begin</h2>
        <p>
          These are starting points, not automatic classifications. The contents, context, combination
          of data, and intended use can change the result.
        </p>
        <dl className="materialList">
          {materials.map(({ material, examples, startingPoint, alsoCheck }) => (
            <div className="materialItem" key={material}>
              <dt>{material}</dt>
              <dd>
                <p className="materialExamples">{examples}</p>
                <p className="materialField">
                  <span className="materialLabel">Typical starting point</span>
                  {startingPoint}
                </p>
                <p className="materialField">
                  <span className="materialLabel">What else to check</span>
                  {alsoCheck}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <ExerciseBlock
        heading="Run a preflight without uploading anything"
        id="preflight"
        timeLabel="60 seconds"
      >
        <p>
          Think of the next document, source, or connected folder you might use with AI. Do not open
          the AI service yet. Complete this checklist first.
        </p>
        <dl className="preflightList">
          {preflight.map(({ label, question }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{question}</dd>
            </div>
          ))}
        </dl>
        <div className="actions" style={{ marginTop: "1rem" }}>
          <CopyPrompt text={preflightText} label="Copy preflight checklist" itemLabel="Checklist" />
        </div>
        <p className="muted" style={{ marginTop: "0.8rem", fontSize: "0.9rem" }}>
          Nothing you decide here is sent anywhere. This page has no form and records no answers.
        </p>
      </ExerciseBlock>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>You separated questions that are often collapsed into one.</p>
        <p>
          The material has a classification. The service has an approval boundary. Your use has a
          purpose. Other rules or commitments may apply. And the task probably requires less
          information than the original file contains.
        </p>
        <p>
          The pause is the first control, not the only control. It happens before disclosure, while you
          can still narrow the material, choose a different service, remove a connector, or ask for
          guidance.
        </p>
      </section>

      <section aria-labelledby="product-name-heading">
        <h2 id="product-name-heading">The product name is not enough</h2>
        <p>
          Stanford&rsquo;s current service listings distinguish among products with very similar names.
          The following pairs are not interchangeable:
        </p>
        <ServiceDistinctions />
        <p>
          The same principle applies to plugins, connectors, custom assistants, agents, coding tools,
          and other features. Check the service and feature actually being used&mdash;not the logo on
          the screen.
        </p>
      </section>

      <StanfordAiServiceSnapshot />

      <section aria-labelledby="before-continue-heading">
        <h2 id="before-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <details className="guideDetails">
        <summary>Does &ldquo;the vendor does not train on my data&rdquo; settle the question?</summary>
        <p>
          No. A no-training commitment addresses one possible use of the material. It does not by
          itself answer whether the disclosure was authorized, where data or logs are retained, which
          connectors can retrieve it, who can access it, whether the task needed it, or whether a
          course, clinic, research protocol, contract, publisher, coauthor, or other obligation limits
          the use.
        </p>
        <p>Use the approved Stanford service and still complete the preflight.</p>
      </details>

      <details className="guideDetails">
        <summary>Can I remove names and then upload the document?</summary>
        <p>
          Removing direct identifiers can reduce risk, but it does not automatically make a document
          anonymous or Low Risk. Facts, quotations, dates, matter details, small-group context,
          metadata, and combinations of information may still identify a person or reveal restricted
          material.
        </p>
        <p>
          Use de-identification as one minimization step, not as an automatic reclassification.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Does using a connector change the decision?</summary>
        <p>
          Yes. A connector can expose more than the text you deliberately paste. It may retrieve files,
          email, calendars, folders, messages, or other sources available through your account.
        </p>
        <p>
          Check whether the specific connector is approved, limit its permissions and scope, prefer
          read-only access where possible, and disconnect it when the task does not require continuing
          access.
        </p>
      </details>

      <WorthRepeating>Name it. Match it. Minimize it&mdash;before you share it.</WorthRepeating>

      <SourceNotes guide={guide} />

      <section className="card" aria-labelledby="routing-heading">
        <h2 id="routing-heading" style={{ fontSize: "1.35rem" }}>
          Uncertain about a real document or workflow?
        </h2>
        <p className="muted">
          The Law Library can help identify the relevant source, service, or workflow and route privacy
          or security questions to the appropriate Stanford office. Do not send the sensitive document
          itself in an initial email.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <a className="primary" href="mailto:library@law.stanford.edu">Email the Law Library</a>
        </div>
        <p className="muted" style={{ marginTop: "0.9rem", fontSize: "0.92rem" }}>
          <a href="https://privacy.stanford.edu/" target="_blank" rel="noopener noreferrer">
            University Privacy Office
            <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
            <span className="srOnly"> (opens in a new tab)</span>
          </a>
          {" · "}
          <a href="https://uit.stanford.edu/security" target="_blank" rel="noopener noreferrer">
            Stanford Information Security Office
            <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
            <span className="srOnly"> (opens in a new tab)</span>
          </a>
        </p>
      </section>

      <GuideSeriesStatus previous={previousGuide(guide.slug)} next={nextGuide(guide.slug)} />
    </GuideLayout>
  );
}

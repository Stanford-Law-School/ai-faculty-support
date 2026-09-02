import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, nextGuide, previousGuide } from "../../lib/guides";
import { CopyPrompt } from "../../components/CopyPrompt";
import {
  AuditWorksheet,
  ClaimFailureModes,
  ExerciseAnswerKey,
  LegalClaimAudit,
  LegalSourceTypeChecks,
  LegalVerificationTools,
  QuietCallout,
  SimulatedAiClaim,
  VerificationOutcomeList,
} from "../../components/LegalVerification";
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

const guide = getGuide("verify-an-ai-legal-claim");

export const metadata: Metadata = {
  title: "How Do I Verify an AI-Generated Legal Claim? | SLS Faculty AI Guide",
  description:
    "A six-minute guide to checking whether an AI-cited authority exists, supports the stated proposition, fits the jurisdiction, and remains current.",
  alternates: { canonical: "/learn-ai/verify-an-ai-legal-claim" },
  openGraph: {
    title: "How Do I Verify an AI-Generated Legal Claim? | SLS Faculty AI Guide",
    description:
      "A six-minute guide to checking whether an AI-cited authority exists, supports the stated proposition, fits the jurisdiction, and remains current.",
    url: "/learn-ai/verify-an-ai-legal-claim",
  },
};

// Citator interface descriptions carry their own date, separate from the guide's
// durable review date and from the exercise's case-status check.
const CITATORS_CHECKED_ON = "2026-08-03";

// The worksheet, as displayed and as copied. Built once so the visible lines and
// the clipboard text cannot drift apart.
const worksheetSections = [
  {
    heading: "LEGAL CLAIM AUDIT",
    lines: [
      "Claim: Write the exact legal proposition being tested.",
      "Source as supplied: Record the citation, link, quotation, or source description.",
    ],
  },
  {
    heading: "1. FIND IT — Can I retrieve the exact authority?",
    lines: ["Source located:", "Identity and citation confirmed:", "Mismatch or unresolved issue:"],
  },
  {
    heading: "2. READ IT — What exact passage supports the claim?",
    lines: [
      "Supporting page, paragraph, section, or subsection:",
      "Quotation checked:",
      "Holding, reasoning, dicta, party argument, summary, or other context:",
      "Does it support the entire proposition?",
    ],
  },
  {
    heading: "3. PLACE IT — What weight and context does it carry?",
    lines: [
      "Court, agency, legislature, or issuing body:",
      "Jurisdiction:",
      "Level or hierarchy:",
      "Publication or precedential status:",
      "Procedural posture:",
      "What weight can this source carry for my task?",
    ],
  },
  {
    heading: "4. UPDATE IT — Is it current for this proposition?",
    lines: [
      "Citator, official history, or current-version source used:",
      "Direct history:",
      "Relevant treatment:",
      "Amendment, effective date, or current-version issue:",
      "Current for this proposition?",
    ],
  },
  {
    heading: "OUTCOME — choose one",
    lines: [
      "Verified for this proposition",
      "Partially supported",
      "Not supported",
      "Unable to verify",
      "Needs update",
    ],
  },
  {
    heading: "FOLLOW-UP",
    lines: ["Required revision or follow-up:", "Checked by:", "Checked on:"],
  },
];

const worksheetText = worksheetSections
  .map(({ heading, lines }) => [heading, ...lines].join("\n"))
  .join("\n\n");

const scenarios = [
  {
    title: "Teaching and class preparation",
    body: "When the output is a possible discussion question or hypothetical, evaluate it against the learning objective. When you present a generated statement as law, open and check the authority before using it with students.",
    emphasis: "Support, context, and clarity.",
  },
  {
    title: "Faculty scholarship",
    body: "Source-pull and cite-check legal propositions, quotations, parentheticals, and time-sensitive claims. Preserve the source or version relied on when future readers may need to reconstruct the research.",
    emphasis: "Exact support, pinpoint accuracy, authority weight, and currentness.",
  },
  {
    title: "Court filings, legal advice, and professional work",
    body: "Use the approved service and workflow, conduct the level of review required by the matter, verify factual statements against the record, and check all current court, local, judge-specific, professional, and client-related requirements.",
    emphasis:
      "Line-by-line accuracy, record support, governing authority, current rules, and documented human review.",
  },
];

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "Open the full authority, locate the exact supporting passage, and use an appropriate history or treatment source. Do not verify from an AI summary, search snippet, headnote, syllabus, or citator icon alone.",
  },
  {
    label: "Sensitivity",
    primary: "",
    detail: (
      <>
        The exercise uses a public court order. Before uploading a nonpublic draft, student record,
        clinic document, client material, or connected source,{" "}
        <Link href="/learn-ai/what-can-i-safely-share">
          check the exact service and workflow
        </Link>
        .
      </>
    ),
  },
  {
    label: "Stakes",
    primary:
      "The more consequential the use, the more explicit the source review, currentness check, documentation, and human approval point should be.",
  },
];

export default function VerifyAnAiLegalClaim() {
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

      <section aria-labelledby="audit-heading">
        <h2 id="audit-heading">Verify the claim in four separate steps</h2>
        <p>
          These checks answer different questions. Passing one does not imply that the claim passes the
          others.
        </p>
        <LegalClaimAudit />
      </section>

      <section aria-labelledby="failure-modes-heading">
        <h2 id="failure-modes-heading">A real-looking citation can still fail</h2>
        <p>
          Fabrication is only one failure mode. An authority can be real and the legal claim can still
          be wrong.
        </p>
        <ClaimFailureModes />
      </section>

      <ExerciseBlock
        heading="Audit one deliberately flawed legal claim"
        id="claim-audit"
        timeLabel="3 minutes"
      >
        <p>
          This exercise does not require an AI tool. It uses a public, published court order and a
          simulated AI claim with a stable answer.
        </p>
        <SimulatedAiClaim />
        <ol className="guideSteps">
          <li>
            <p>
              <strong>Find it.</strong> Locate the order by case number. Confirm the court, date, docket
              number, and that the document is marked for publication.
            </p>
          </li>
          <li>
            <p>
              <strong>Read it.</strong> Find the section where the court explains what the order is not
              about. Compare that passage with the simulated claim.
            </p>
            <p>Also identify the types of errors the court describes:</p>
            <ul>
              <li>Nonexistent cases</li>
              <li>Misattributed quotations</li>
              <li>Misrepresentations of real cases</li>
              <li>Failures of candor after the original filing</li>
            </ul>
          </li>
          <li>
            <p>
              <strong>Place it.</strong> Record that this is a published Ninth Circuit
              attorney-discipline order arising from appellate filings. Do not generalize it into a
              universal rule governing every use of AI in legal work.
            </p>
          </li>
          <li>
            <p>
              <strong>Update it.</strong> Use KeyCite, Shepard&rsquo;s, BCITE, or another appropriate
              current source available to you. Check direct history and treatment.
            </p>
            <p className="muted">
              If you do not have access to a citator, write &ldquo;Currentness not yet checked.&rdquo;
              Do not replace the missing check with a guess.
            </p>
          </li>
          <li>
            <p>
              <strong>Choose an outcome.</strong> Verified for this proposition · Partially supported ·
              Not supported · Unable to verify · Needs update
            </p>
          </li>
        </ol>
        <ExerciseAnswerKey />
      </ExerciseBlock>

      <section aria-labelledby="worksheet-heading">
        <h2 id="worksheet-heading">Use the same audit on your own claim</h2>
        <p>
          Copy this worksheet before reviewing a generated memo, answer, footnote, parenthetical,
          quotation, or research summary.
        </p>
        <AuditWorksheet sections={worksheetSections} />
        <div className="actions">
          <CopyPrompt text={worksheetText} label="Copy legal claim audit" itemLabel="Worksheet" />
        </div>
        <p className="muted" style={{ fontSize: "0.9rem" }}>
          Nothing you write is sent anywhere. This page has no form and records no answers.
        </p>
      </section>

      <section aria-labelledby="outcomes-heading">
        <h2 id="outcomes-heading">Record a specific outcome</h2>
        <VerificationOutcomeList />
        <p>
          &ldquo;Verified&rdquo; means verified for the exact proposition you examined&mdash;not
          generally correct, universally controlling, or safe to reuse without context.
        </p>
      </section>

      <section aria-labelledby="source-types-heading">
        <h2 id="source-types-heading">The source type changes the check</h2>
        <p>
          The four steps stay the same. What satisfies each one depends on the kind of source you are
          checking.
        </p>
        <LegalSourceTypeChecks />
      </section>

      <section aria-labelledby="citator-heading">
        <h2 id="citator-heading">Use a citator for currentness, not for proposition matching</h2>
        <p>
          A citator helps you trace history, treatment, and citing references. It can alert you to later
          decisions or developments that require investigation.
        </p>
        <p>
          A citator does not decide whether the exact sentence you wrote is supported by the source. You
          still need to open the authority, locate the relevant passage, and read the treatment that
          matters.
        </p>
        <QuietCallout>
          <p>
            A favorable-looking signal does not prove that the source supports your proposition. A
            warning signal does not tell you, by itself, whether the particular proposition has been
            affected.
          </p>
        </QuietCallout>
      </section>

      <LegalVerificationTools checkedOn={CITATORS_CHECKED_ON} />

      <section aria-labelledby="not-the-tool-heading">
        <h2 id="not-the-tool-heading">Verify the work, not merely the tool</h2>
        <p>
          The same source-checking obligation applies whether the draft came from an AI service, a
          research assistant, a colleague, a prior brief, a secondary source, or your own memory.
        </p>
        <p>The relevant questions are:</p>
        <ul>
          <li>Does the source exist?</li>
          <li>Does it support this proposition?</li>
          <li>What legal role can it play here?</li>
          <li>Is it current?</li>
        </ul>
        <p>
          For court filings and client work, applicable procedural, ethical, local, court-specific, and
          judge-specific requirements may impose additional duties. Check the current rules governing
          the actual matter.
        </p>
      </section>

      <section aria-labelledby="scale-heading">
        <h2 id="scale-heading">The depth of review depends on what the claim will do</h2>
        <dl className="materialList">
          {scenarios.map(({ title, body, emphasis }) => (
            <div className="materialItem" key={title}>
              <dt>{title}</dt>
              <dd>
                <p className="materialExamples">{body}</p>
                <p className="materialField">
                  <span className="materialLabel">Verification emphasis</span>
                  {emphasis}
                </p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="muted">
          This guide is an educational research framework, not a complete filing,
          professional-responsibility, or matter-specific compliance checklist.
        </p>
      </section>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>
          You tested the relationship between a claim and a source rather than asking whether a product
          was generally reliable.
        </p>
        <p>
          The source in the exercise was real. The citation was retrievable. But the simulated claim
          still failed because it misstated what the court said.
        </p>
        <p>
          That is why existence is only the first check. Currentness is also only one check.
          Verification requires all four: find it, read it, place it, and update it.
        </p>
      </section>

      <section aria-labelledby="before-continue-heading">
        <h2 id="before-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <details className="guideDetails">
        <summary>What if the citation exists and the citator shows no warning?</summary>
        <p>That completes neither the support check nor the full currentness analysis.</p>
        <p>
          The source may still be misquoted, cited for a proposition it does not address, drawn from the
          wrong jurisdiction, nonprecedential, factually distinguishable, or affected in a way not
          captured by a simple top-level signal.
        </p>
        <p>
          Open the relevant passage and review the history and treatment that bear on the specific
          proposition.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Can I ask the AI to double-check itself?</summary>
        <p>
          You can ask the system to identify possible sources or uncertainties, but that is not
          independent verification.
        </p>
        <p>
          The system may repeat the claim, revise it, replace one citation with another, or generate a
          plausible explanation without opening the controlling source.
        </p>
        <p>
          Verification occurs when you retrieve and inspect the authority in an official source or
          reliable legal research environment.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Does a legal-specific AI tool eliminate this process?</summary>
        <p>No.</p>
        <p>
          A legal research system may substantially improve retrieval, provide linked authorities, add
          citator information, or reduce fabricated citations. The generated response can still misquote,
          omit, overstate, blend, or misapply the sources it retrieved.
        </p>
        <p>
          Use source links to shorten the path to verification&mdash;not to eliminate the last step.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Do courts require disclosure or certification whenever AI is used?</summary>
        <p>
          Requirements vary by court, judge, jurisdiction, filing type, and current order.
        </p>
        <p>
          Do not infer a universal disclosure or certification rule from an isolated standing order,
          news article, or prior case. Check the current federal, local, court-specific, and
          judge-specific materials that govern the filing.
        </p>
      </details>

      <details className="guideDetails">
        <summary>What should I do if I discover an error after filing or publication?</summary>
        <p>Stop repeating the claim and confirm the nature and scope of the error.</p>
        <p>
          For scholarship or teaching material, determine the appropriate correction and update the
          affected source record.
        </p>
        <p>
          For a court filing, client matter, or other professional work, promptly consult the governing
          rules, responsible counsel, and appropriate professional or institutional guidance. The
          required response depends on the jurisdiction, stage, materiality, and circumstances.
        </p>
      </details>

      <WorthRepeating>Find it. Read it. Place it. Update it.</WorthRepeating>

      <SourceNotes guide={guide} />

      <section className="card" aria-labelledby="verify-help-heading">
        <h2 id="verify-help-heading" style={{ fontSize: "1.35rem" }}>
          Unable to locate or update a source?
        </h2>
        <p className="muted">
          Send the Law Library the citation, source description, jurisdiction, and research question. Do
          not send confidential, clinic, client, student, or other restricted material in the initial
          message.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <a className="primary" href="mailto:library@law.stanford.edu">Email the Law Library</a>
          <Link className="secondary" href="/ai-resources">Browse legal research resources</Link>
        </div>
        <p className="muted" style={{ marginTop: "0.9rem", fontSize: "0.92rem" }}>
          The Law Library can help with source retrieval, research environments, citators, and
          verification method. It does not determine the legal conclusion for a matter.
        </p>
      </section>

      <GuideSeriesStatus previous={previousGuide(guide.slug)} next={nextGuide(guide.slug)} />
    </GuideLayout>
  );
}

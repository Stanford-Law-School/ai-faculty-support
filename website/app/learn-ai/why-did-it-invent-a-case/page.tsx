import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, nextGuide, previousGuide } from "../../lib/guides";
import { PromptBlock } from "../../components/GuideBlocks";
import { QuietCallout } from "../../components/LegalVerification";
import {
  AuthorityEvidenceStates,
  CitationAnatomy,
  CitationSourceModeNotes,
  EvidenceSnapshot,
  RelatedGuideLinks,
  SimulatedCitationAnswerKey,
  SimulatedCitationClaim,
  SimulatedCitationSources,
  SimulatedCitationSteps,
} from "../../components/CitationProvenance";
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

const guide = getGuide("why-did-it-invent-a-case");

// Neither the metadata nor the Open Graph text may mention the simulated claim:
// a social preview or search snippet that quoted the fictional case would turn
// this page into a source of the error it teaches readers to catch. The snippet
// is written to draw from the answer-first block instead.
export const metadata: Metadata = {
  title: "Why Did AI Invent a Case? | SLS Faculty AI Guide",
  description:
    "A five-minute guide to understanding how legal-looking citations can be generated without a reliable source trail—and how to check them.",
  alternates: { canonical: "/learn-ai/why-did-it-invent-a-case" },
  openGraph: {
    title: "Why Did AI Invent a Case? | SLS Faculty AI Guide",
    description:
      "A five-minute guide to understanding how legal-looking citations can be generated without a reliable source trail—and how to check them.",
    url: "/learn-ai/why-did-it-invent-a-case",
  },
};

const researchLeadPrompt = `Help me identify legal research leads, not legal authority.

Do not provide case citations, quotations, or claims that a particular authority controls.

For each possible issue:

1. State the issue in one sentence.
2. Identify facts or jurisdictional details I need to clarify.
3. Suggest source types and search terms for a licensed legal database.
4. State any assumptions or uncertainties.

Label the complete response:

Research leads — not verified authority`;

const relatedGuides = [
  { slug: "which-ai-tool-fits", description: "Choose the source path before the product." },
  {
    slug: "verify-an-ai-legal-claim",
    description: "Find it, read it, place it, and update it.",
  },
];

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "The generated citation is not the source. Retrieve the exact authority in an official source or reliable legal research environment, then compare the supporting passage with the proposition.",
  },
  {
    label: "Sensitivity",
    primary: "",
    detail: (
      <>
        This exercise uses a public Supreme Court opinion and fictional party names. Before using a
        nonpublic draft, student record, clinic document, client material, or connected source,{" "}
        <Link href="/learn-ai/what-can-i-safely-share">check the exact service and workflow</Link>.
      </>
    ),
  },
  {
    label: "Stakes",
    primary:
      "A fabricated or mischaracterized authority can move from a low-stakes draft into teaching, scholarship, advice, or a filing. Increase retrieval, verification, documentation, and human review as the consequence rises.",
  },
];

export default function WhyDidItInventACase() {
  return (
    <GuideLayout guide={guide}>
      <AnswerFirst>
        <p>{guide.answer}</p>
        <p>{guide.answerSecond}</p>
      </AnswerFirst>

      <FacultyMove>
        <p><strong>{guide.facultyMove}</strong></p>
        <p>{guide.facultyMoveSupport}</p>
        <p>
          <Link href="/learn-ai/verify-an-ai-legal-claim">
            Run the four-step legal claim audit
          </Link>
        </p>
      </FacultyMove>

      <section aria-labelledby="source-mode-heading">
        <h2 id="source-mode-heading">Before diagnosing the error, identify the source mode</h2>
        <p>
          The product name alone does not tell you what happened. The same product can answer from
          learned patterns in one conversation, use web search in another, and analyze supplied files
          or connected sources in a third.
        </p>
        <CitationSourceModeNotes />
        <p>
          A citation produced without an inspectable source can still happen to be accurate. The
          problem is that the answer itself does not establish where the citation came from or whether
          it supports the proposition.
        </p>
      </section>

      <section aria-labelledby="ungrounded-heading">
        <h2 id="ungrounded-heading">What happens when no source is being retrieved</h2>
        <p>
          A language model generates a response by extending the prompt and conversation with text
          that fits patterns learned during training.
        </p>
        <p>
          Training can encode many genuine relationships. It can also support a well-formed answer
          when the requested fact is uncommon, ambiguous, unavailable, or not reliably represented.
          The result may be plausible but false.
        </p>
        <p>
          When a prompt requests legal authority, the generated text may reproduce the form of a
          citation&mdash;party names, reporter, volume, page, court, year, and a legal
          proposition&mdash;without a retrieved record tying those elements together.
        </p>
        <p>
          This does not mean every citation produced in this mode is false. A model may accurately
          reproduce a familiar authority. It means the output itself does not provide an inspectable
          source trail.
        </p>
        <QuietCallout>
          <p>
            People commonly call this a hallucination. NIST uses &ldquo;confabulation&rdquo; for
            confidently presented false or erroneous generated content. This guide uses plain-language
            terms such as fabricated, unsupported, or mischaracterized citation when a more specific
            description is available.
          </p>
        </QuietCallout>
      </section>

      <section aria-labelledby="anatomy-heading">
        <h2 id="anatomy-heading">Why the citation can look convincing</h2>
        <p>
          Legal citations have a highly regular form. A generated string can satisfy that form even
          when the relationship among its parts is false. The parts below come from the simulated
          citation used in the exercise.
        </p>
        <CitationAnatomy />
        <p>
          Plausible form is not source identity. Source identity is not proposition support.
        </p>
      </section>

      <section aria-labelledby="evidence-states-heading">
        <h2 id="evidence-states-heading">A citation moves through four evidence states</h2>
        <p>
          Do not move directly from generated text to trusted authority. Each state adds a different
          kind of evidence.
        </p>
        <AuthorityEvidenceStates />
      </section>

      <ExerciseBlock
        heading="Separate citation shape from source identity"
        id="citation-shape"
        timeLabel="90 seconds"
      >
        <p>
          This exercise uses a stable public source. It does not require an AI account, and the
          displayed &ldquo;AI output&rdquo; is a staff-created simulation rather than an actual
          product transcript.
        </p>
        <SimulatedCitationClaim />
        <SimulatedCitationSteps />
        <SimulatedCitationSources />
        <SimulatedCitationAnswerKey />
      </ExerciseBlock>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>
          The simulated citation looked complete because each part followed a familiar legal pattern.
          Exact retrieval showed that the parts did not belong together.
        </p>
        <p>
          The reporter citation identified a real Supreme Court case. That did not rescue the
          generated statement. The party names were wrong, and the proposition reversed the source.
        </p>
        <p>
          This is why checking only whether &ldquo;something comes up&rdquo; is not enough. Source
          identity and proposition support are separate questions.
        </p>
      </section>

      <section aria-labelledby="are-you-sure-heading">
        <h2 id="are-you-sure-heading">
          Why &ldquo;Are you sure?&rdquo; is not independent verification
        </h2>
        <p>
          Another turn in the conversation may produce a correction, a confident restatement, an
          apology, a replacement citation, or&mdash;when the product has that capability&mdash;a new
          search.
        </p>
        <p>
          A new search can add useful evidence. The system&rsquo;s reassurance is still not the
          evidence. The authority you retrieve and inspect is the evidence.
        </p>
        <p>Instead of asking only whether the system is sure, use this sequence:</p>
        <ol className="guideSteps">
          <li><p>Ask what source mode was active.</p></li>
          <li><p>Request the exact source link or identifier.</p></li>
          <li><p>Open the source outside the generated answer.</p></li>
          <li><p>Compare the relevant passage with the claim.</p></li>
          <li><p>Complete the remaining legal-context and currentness checks.</p></li>
        </ol>
        <QuietCallout>
          <p>A correction is useful only when it leads you to evidence you independently check.</p>
        </QuietCallout>
      </section>

      <section aria-labelledby="research-leads-heading">
        <h2 id="research-leads-heading">
          When no legal source is active, ask for leads rather than authority
        </h2>
        <p>
          General chat can still help identify issues, factual questions, vocabulary,
          counterarguments, and possible search paths. Frame the result as a research plan rather than
          a source of law.
        </p>
        <PromptBlock
          label="Research-lead prompt"
          text={researchLeadPrompt}
          copyLabel="Copy research-lead prompt"
          itemLabel="Research-lead prompt"
          after="Prompt wording can reduce the chance of receiving unsupported citations. It cannot verify the response, and the system may not follow every instruction. Treat any authority that appears as unverified."
        />
      </section>

      <section aria-labelledby="retrieval-heading">
        <h2 id="retrieval-heading">What changes when search or a legal database is active</h2>
        <p>
          Search, selected documents, and licensed databases can place real sources into the working
          context. That changes the evidentiary path substantially: you can inspect what was retrieved
          rather than relying only on generated text.
        </p>
        <p>
          It does not eliminate the final comparison between claim and source. The system can retrieve
          the correct document and still quote the wrong passage, mischaracterize the holding, omit an
          exception, or attach the source to a proposition it does not support.
        </p>
        <RelatedGuideLinks guides={relatedGuides} />
      </section>

      <section aria-labelledby="before-continue-heading">
        <h2 id="before-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <details className="guideDetails">
        <summary>
          Does a different answer in a second chat prove that the first citation was fabricated?
        </summary>
        <p>No.</p>
        <p>
          Generated outputs can vary because of sampling, model version, settings, conversation
          context, search results, tools, or other product conditions.
        </p>
        <p>
          Variation shows that the outputs differed. It does not establish which citation exists,
          which source supports the proposition, or whether either answer is correct.
        </p>
        <p>Retrieve the authority instead of diagnosing truth from variation.</p>
      </details>

      <details className="guideDetails">
        <summary>What if two chats give the same citation?</summary>
        <p>Agreement is not independent verification.</p>
        <p>
          The responses may draw on similar learned patterns, the same source, the same search result,
          or the same error. Repetition can increase confidence without adding evidence.
        </p>
        <p>Open the authority and check it.</p>
      </details>

      <details className="guideDetails">
        <summary>Does turning on search solve fabricated citations?</summary>
        <p>
          Search can substantially improve the source path because real documents can be retrieved and
          linked.
        </p>
        <p>It does not guarantee:</p>
        <ul>
          <li>Complete coverage</li>
          <li>Authoritative source selection</li>
          <li>Correct quotations</li>
          <li>Accurate characterization</li>
          <li>Correct jurisdiction</li>
          <li>Current validity</li>
          <li>Inclusion of material contrary authority</li>
        </ul>
        <p>
          Confirm that search occurred, inspect the sources, and complete the appropriate
          legal-research checks.
        </p>
      </details>

      <details className="guideDetails">
        <summary>
          Why use &ldquo;confabulation&rdquo; instead of &ldquo;hallucination&rdquo;?
        </summary>
        <p>
          &ldquo;Hallucination&rdquo; is the common term and appears in the question faculty are
          likely to ask.
        </p>
        <p>
          NIST uses &ldquo;confabulation&rdquo; for confidently presented false or erroneous generated
          content and notes that terms such as hallucination and fabrication can anthropomorphize a
          system.
        </p>
        <p>The most useful wording is often the most specific:</p>
        <ul>
          <li>Fabricated citation</li>
          <li>False quotation</li>
          <li>Identity mismatch</li>
          <li>Mischaracterized authority</li>
          <li>Unsupported proposition</li>
          <li>Outdated authority</li>
        </ul>
      </details>

      <details className="guideDetails">
        <summary>
          Can a familiar or famous citation still be reproduced correctly without search?
        </summary>
        <p>Yes.</p>
        <p>
          Learned patterns can reproduce some genuine facts and familiar authorities accurately. That
          is why ungrounded output can be useful for brainstorming and why it can feel reliable.
        </p>
        <p>
          An accurate result does not reveal its provenance or make the workflow appropriate for
          authority-dependent work. Retrieve the source even when the citation looks familiar.
        </p>
      </details>

      <EvidenceSnapshot />

      <WorthRepeating>A citation is not authority until you have opened the authority.</WorthRepeating>

      <SourceNotes guide={guide} />

      <section className="card" aria-labelledby="citation-help-heading">
        <h2 id="citation-help-heading" style={{ fontSize: "1.35rem" }}>
          Received a citation you cannot locate?
        </h2>
        <p className="muted">
          Send the Law Library the citation, claimed proposition, jurisdiction, and where the citation
          appeared. Do not send confidential, clinic, client, student, or other restricted material in
          the initial message.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <a className="primary" href="mailto:library@law.stanford.edu">Email the Law Library</a>
          <Link className="secondary" href="/learn-ai/verify-an-ai-legal-claim">
            Open the legal claim verification guide
          </Link>
        </div>
        <p className="muted" style={{ marginTop: "0.9rem", fontSize: "0.92rem" }}>
          The Law Library can help with source retrieval, database selection, citators, and
          verification method. It does not determine the legal conclusion for a matter.
        </p>
      </section>

      <GuideSeriesStatus previous={previousGuide(guide.slug)} next={nextGuide(guide.slug)} />
    </GuideLayout>
  );
}

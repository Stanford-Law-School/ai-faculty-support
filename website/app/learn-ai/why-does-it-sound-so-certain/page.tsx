import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, nextGuide, previousGuide } from "../../lib/guides";
import {
  CORE_AI_DECISIONS,
  guideCollectionLine,
} from "../../lib/learnAiCollections";
import { evidenceUncertaintyShortForm } from "../../lib/evidenceUncertaintyFramework";
import { confidenceAuditExercise } from "../../lib/confidenceAuditExercise";
import {
  AnswerFirst,
  ExerciseBlock,
  FacultyMove,
  GuideLayout,
  SourceNotes,
  SourcesSensitivityStakes,
  WorthRepeating,
} from "../../components/GuideKit";
import { CollectionGuideNavigation } from "../../components/GuideCollections";
import {
  ClaimStatusCards,
  ConfidenceAuditAnswerKey,
  ConfidenceAuditExercise,
  EvidenceUncertaintyFramework,
  EvidenceUncertaintyLedger,
  EvidenceUncertaintyPromptBlock,
} from "../../components/ConfidenceGuide";

const guide = getGuide("why-does-it-sound-so-certain");

// The description describes the method, never the simulated response. The
// staff-written claims are deliberately false and live only in the exercise
// record, so they cannot reach a meta description, an Open Graph string, or a
// search result.
const description =
  "A six-minute guide to separating confident AI language from evidence, identifying unsupported precision, and asking what should be checked next.";

export const metadata: Metadata = {
  title: "Why Does AI Sound So Certain? | SLS Faculty AI Guide",
  description,
  alternates: { canonical: "/learn-ai/why-does-it-sound-so-certain" },
  openGraph: {
    title: "Why Does AI Sound So Certain? | SLS Faculty AI Guide",
    description,
    url: "/learn-ai/why-does-it-sound-so-certain",
  },
};

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "Open the material sources and compare each passage, data point, or record with the claim it is being used to support. Confidence language does not replace source inspection.",
  },
  {
    label: "Sensitivity",
    primary: "",
    detail: (
      <>
        The exercise uses a public fictional proposal. Before asking for an uncertainty audit of
        student work, clinic material, client information, unpublished research, personnel material,
        or connected sources,{" "}
        <Link href="/learn-ai/what-can-i-safely-share">check the exact service and workflow</Link>.
      </>
    ),
  },
  {
    label: "Stakes",
    primary:
      "As the consequence of error rises, require stronger evidence, clearer uncertainty boundaries, independent review, documentation, and an accountable human decision.",
  },
];

export default function WhyDoesItSoundSoCertain() {
  const previous = previousGuide(guide.slug);
  const next = nextGuide(guide.slug);
  const relatedGuides = [
    getGuide("verify-an-ai-legal-claim"),
    getGuide("why-did-it-invent-a-case"),
    getGuide("why-did-it-forget"),
    getGuide("why-does-it-agree-with-me"),
  ];

  return (
    <GuideLayout guide={guide} collectionLine={guideCollectionLine(guide)}>
      <AnswerFirst>
        <p>{guide.answer}</p>
        <p>{guide.answerSecond}</p>
      </AnswerFirst>

      <FacultyMove>
        <p className="facultyMovePrimary">{evidenceUncertaintyShortForm}</p>
        <p>{guide.facultyMoveSupport}</p>
        <p className="facultyMoveRelated muted">
          Need to confirm the active source set first?{" "}
          <Link href="/learn-ai/why-did-it-forget">
            Why did it forget what I told it earlier?
          </Link>
        </p>
      </FacultyMove>

      <section aria-labelledby="claim-statuses-heading">
        <h2 id="claim-statuses-heading">First identify what kind of claim you are reading</h2>
        <p>
          A single paragraph can move from source-backed fact to interpretation, prediction, and
          recommendation without signaling the transition.
        </p>
        <ClaimStatusCards />
      </section>

      {/* Mechanism, in the guide's own vocabulary. Calibration is defined as a
          relationship across repeated comparable cases, so the reader can see why
          one percentage in one conversation does not establish it — without
          claiming that percentages are meaningless or that products are
          uniformly overconfident. */}
      <section aria-labelledby="tone-heading">
        <h2 id="tone-heading">The tone is not a confidence instrument</h2>
        <p>
          A language model produces an answer in language that fits the prompt, context, training,
          and current instructions. That includes the answer&rsquo;s tone.
        </p>
        <p>
          Assertive grammar, polished organization, a legal citation, or an exact number can make a
          statement feel settled. None of those features independently shows that the underlying
          proposition is well supported.
        </p>
        <p>
          The model may also be instructed or trained to express uncertainty. Research shows that
          models can sometimes provide useful confidence estimates under specific formats and
          evaluation conditions.
        </p>
        <p>
          That does not make an ordinary &ldquo;90% confident&rdquo; statement a validated
          probability.
        </p>
        <p>
          Calibration is a relationship measured across many comparable cases. Roughly speaking, a
          system is calibrated at 80% when answers assigned 80% confidence are correct about 80% of
          the time under the evaluated conditions.
        </p>
        <p>
          A single percentage in an ordinary conversation does not reveal whether that relationship
          was tested for this model, task, source environment, or domain.
        </p>
        <p className="pullQuestion">
          The practical control is to inspect the claim&rsquo;s evidence and uncertainty rather than
          trusting the confidence of its prose.
        </p>
      </section>

      <section aria-labelledby="framework-heading">
        <h2 id="framework-heading">Make the certainty inspectable</h2>
        <p>
          Do not ask only, &ldquo;How confident are you?&rdquo; Ask for the structure beneath the
          confidence.
        </p>
        <EvidenceUncertaintyFramework />
      </section>

      <section aria-labelledby="precision-heading">
        <h2 id="precision-heading">Precision can be generated without a measurement</h2>
        <p>
          Exact numbers, percentages, dates, rankings, and probability estimates deserve a separate
          check.
        </p>
        <p>Ask:</p>
        <ul className="checkList">
          <li>Where did the number come from?</li>
          <li>What population, time period, jurisdiction, or source does it describe?</li>
          <li>What method produced it?</li>
          <li>What range or margin of uncertainty applies?</li>
          <li>
            Is the number observed, calculated, estimated, predicted, or invented as an
            illustration?
          </li>
          <li>Would a broader range be more honest than a single figure?</li>
        </ul>
        <div className="quietCallout">
          <p>A specific number is not evidence of a specific measurement.</p>
        </div>
        <p>That is not a reason to reject every estimate. It is a reason to distinguish:</p>
        <ul className="checkList">
          <li>A sourced measurement</li>
          <li>A transparent calculation</li>
          <li>A method-based estimate</li>
          <li>An illustrative number</li>
          <li>Unsupported precision</li>
        </ul>
      </section>

      <ExerciseBlock
        heading={confidenceAuditExercise.title}
        id="confidence-audit"
        timeLabel={confidenceAuditExercise.timeLabel}
      >
        <p>{confidenceAuditExercise.intro}</p>
        <ConfidenceAuditExercise />
        <EvidenceUncertaintyLedger
          intro="Use the same ledger on a claim of your own. Copy it before reviewing a generated memo, answer, recommendation, or research summary."
        />
        <ConfidenceAuditAnswerKey />
      </ExerciseBlock>

      <section aria-labelledby="reusable-prompt-heading">
        <h2 id="reusable-prompt-heading">Copy a prompt that exposes the evidence boundary</h2>
        <EvidenceUncertaintyPromptBlock
          intro={
            <>
              &ldquo;Give me a confidence score&rdquo; asks for another output. The prompt below asks
              for the structure needed to evaluate the answer.
            </>
          }
        />
      </section>

      <section aria-labelledby="useful-uncertainty-heading">
        <h2 id="useful-uncertainty-heading">Uncertainty is useful when it changes the next action</h2>
        <p>
          A confidence estimate can be useful when its meaning is defined and it changes what happens
          next.
        </p>
        <p>Examples include:</p>
        <ul className="checkList">
          <li>A source-backed answer proceeds to ordinary review.</li>
          <li>An interpretation triggers comparison with another plausible reading.</li>
          <li>A prediction triggers a pilot, range, or measurement plan.</li>
          <li>A missing source triggers research rather than a guess.</li>
          <li>
            A consequential recommendation triggers independent human or institutional review.
          </li>
        </ul>
        <p>
          Confidence language is less useful when it merely decorates the same answer with
          &ldquo;high,&rdquo; &ldquo;medium,&rdquo; &ldquo;low,&rdquo; or an unexplained percentage.
        </p>
        <p>The practical question is:</p>
        <p className="pullQuestion">What should I do differently because of this uncertainty?</p>
        <p>
          That does not mean demanding abstention in every case. Match the response to the
          consequence:
        </p>
        <ul className="checkList">
          <li>Low-stakes option generation may tolerate unresolved uncertainty.</li>
          <li>Factual and legal reliance requires source checking.</li>
          <li>Predictions require assumptions, ranges, and monitoring.</li>
          <li>Consequential decisions require documented human judgment.</li>
        </ul>
      </section>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>You separated the force of the sentence from the strength of the evidence.</p>
        <p>
          The simulated response sounded decisive because it used an exact percentage, universal
          language, a compressed policy inference, and a single recommendation.
        </p>
        <p>Once the claims were separated, the answer became easier to evaluate.</p>
        <p>The relevant questions were not:</p>
        <ul className="checkList">
          <li>Did it sound confident?</li>
          <li>Did it provide a percentage?</li>
          <li>Did it add a caveat?</li>
        </ul>
        <p>They were:</p>
        <ul className="checkList">
          <li>What claim is being made?</li>
          <li>What supports it?</li>
          <li>What remains uncertain?</li>
          <li>What should be checked next?</li>
        </ul>
      </section>

      <section aria-labelledby="before-you-continue-heading">
        <h2 id="before-you-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <section aria-labelledby="go-deeper-heading">
        <h2 id="go-deeper-heading">Go deeper</h2>

        <details className="guideDetails">
          <summary>What does &ldquo;90% confident&rdquo; mean?</summary>
          <div className="detailsBody">
            <p>By itself, very little.</p>
            <p>
              A meaningful 90% estimate requires a calibration method and an appropriate comparison
              set. Across many comparable questions, answers assigned 90% confidence should be
              correct approximately 90% of the time.
            </p>
            <p>
              A percentage generated in an ordinary conversation may not have been calibrated for the
              current model, task, source environment, domain, or type of question.
            </p>
            <p>
              Ask for the evidence and uncertainty directly. Do not convert an unexplained percentage
              into a decision threshold.
            </p>
          </div>
        </details>

        <details className="guideDetails">
          <summary>Is a cautious answer more trustworthy?</summary>
          <div className="detailsBody">
            <p>Not necessarily.</p>
            <p>
              A hesitant answer can still be wrong, incomplete, or poorly sourced. A direct answer can
              be correct and well supported.
            </p>
            <p>The goal is not cautious style.</p>
            <p>The goal is alignment among:</p>
            <ul className="checkList">
              <li>The wording</li>
              <li>The evidence</li>
              <li>The uncertainty</li>
              <li>The consequence of error</li>
            </ul>
            <p>
              Inspect the source path rather than rewarding hesitation as a personality trait.
            </p>
          </div>
        </details>

        <details className="guideDetails">
          <summary>Can I ask the system what would change its mind?</summary>
          <div className="detailsBody">
            <p>
              Yes. That question can help expose assumptions, alternative explanations, missing
              evidence, and decision criteria.
            </p>
            <p>
              The response is still generated analysis. It may overlook the evidence that actually
              matters or invent a hypothetical source.
            </p>
            <p>
              Use the answer to create a research or review plan, then check the relevant sources and
              criteria yourself.
            </p>
          </div>
        </details>
      </section>

      <WorthRepeating>Confident wording is not evidence.</WorthRepeating>

      <SourceNotes guide={guide} />

      <section className="card" aria-labelledby="substantiate-heading">
        <h2 id="substantiate-heading" style={{ fontSize: "1.35rem" }}>
          Have a confident answer you cannot substantiate?
        </h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          Send the Law Library the claim, source description, and research or teaching context. Do not
          send confidential, clinic, client, student, personnel, unpublished, or other restricted
          material in the initial message.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <a className="primary" href="mailto:library@law.stanford.edu">
            Email the Law Library
          </a>
          <Link className="secondary" href="/learn-ai/verify-an-ai-legal-claim">
            Open the legal claim verification guide
          </Link>
        </div>
        <p className="muted" style={{ fontSize: "0.9rem", marginTop: "0.8rem" }}>
          The Law Library can help identify appropriate sources, databases, verification methods, and
          research paths. It does not certify the generated answer or make the consequential decision.
        </p>
      </section>

      <CollectionGuideNavigation
        foundational={{
          collection: CORE_AI_DECISIONS,
          description:
            "Six durable habits for useful tasks, data boundaries, source selection, legal verification, fabricated authority, and student learning.",
        }}
        previousInCollection={previous}
        nextInCollection={next}
        relatedGuides={relatedGuides}
      />
    </GuideLayout>
  );
}

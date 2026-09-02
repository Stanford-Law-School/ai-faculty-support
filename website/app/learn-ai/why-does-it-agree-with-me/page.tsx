import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, nextGuide } from "../../lib/guides";
import {
  CORE_AI_DECISIONS,
  guideCollectionLine,
} from "../../lib/learnAiCollections";
import { frameworkShortForm } from "../../lib/criticalReviewFramework";
import { promptComparisonExercise } from "../../lib/promptComparisonExercise";
import {
  AnswerFirst,
  ExerciseBlock,
  FacultyMove,
  GuideLayout,
  SourceNotes,
  SourcesSensitivityStakes,
  WorthRepeating,
} from "../../components/GuideKit";
import {
  CollectionGuideNavigation,
} from "../../components/GuideCollections";
import {
  AgreementTypeCards,
  CriticalReviewFramework,
  CriticalReviewPromptBlock,
  PromptComparison,
  PromptComparisonAnswerKey,
} from "../../components/CriticalReview";

const guide = getGuide("why-does-it-agree-with-me");

export const metadata: Metadata = {
  title: "Why Does AI Agree with Me? | SLS Faculty AI Guide",
  description:
    "A five-minute guide to separating AI advocacy from evaluation, requesting credible challenge, checking evidence, and keeping the final decision human.",
  alternates: { canonical: "/learn-ai/why-does-it-agree-with-me" },
  openGraph: {
    title: "Why Does AI Agree with Me? | SLS Faculty AI Guide",
    description:
      "A five-minute guide to separating AI advocacy from evaluation, requesting credible challenge, checking evidence, and keeping the final decision human.",
    url: "/learn-ai/why-does-it-agree-with-me",
  },
};

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "A generated supporting argument or counterargument is not evidence by itself. Open the sources behind material factual or legal claims and check whether they support the response's characterization.",
  },
  {
    label: "Sensitivity",
    primary: "",
    detail: (
      <>
        The exercise uses a public fictional proposal. Before requesting critique of a student paper,
        clinic document, client material, unpublished draft, personnel matter, or connected source,{" "}
        <Link href="/learn-ai/what-can-i-safely-share">check the exact service and workflow</Link>.
      </>
    ),
  },
  {
    label: "Stakes",
    primary:
      "As the consequence rises, strengthen source review, independent human review, documentation, reversibility, and the approval process.",
  },
];

export default function WhyDoesItAgreeWithMe() {
  const next = nextGuide(guide.slug);
  const relatedGuides = [
    getGuide("which-ai-tool-fits"),
    getGuide("verify-an-ai-legal-claim"),
    getGuide("what-can-i-safely-share"),
  ];

  return (
    <GuideLayout guide={guide} collectionLine={guideCollectionLine(guide)}>
      <AnswerFirst>
        <p>{guide.answer}</p>
        <p>{guide.answerSecond}</p>
      </AnswerFirst>

      <FacultyMove>
        <p className="facultyMovePrimary">{frameworkShortForm}</p>
        <p>{guide.facultyMoveSupport}</p>
        <p className="facultyMoveRelated muted">
          Need the right source environment first?{" "}
          <Link href="/learn-ai/which-ai-tool-fits">Which AI tool fits this task?</Link>
        </p>
      </FacultyMove>

      <section aria-labelledby="agreement-types-heading">
        <h2 id="agreement-types-heading">Agreement can mean three different things</h2>
        <p>
          Before deciding that the system has confirmed your view, identify the job the prompt
          assigned.
        </p>
        <AgreementTypeCards />
      </section>

      {/* Mechanism, in the guide's own vocabulary: what a prompt supplies and what
          the response does with it. No training-process explanation, no vendor
          comparison, and nothing that gives the system wants or beliefs. */}
      <section aria-labelledby="prompt-pull-heading">
        <h2 id="prompt-pull-heading">The prompt does more than ask the question</h2>
        <p>
          A prompt defines the job, supplies facts and assumptions, signals the desired tone, and
          often reveals the answer the user hopes to receive.
        </p>
        <p>
          A system asked to defend a proposal will usually generate a defense. A system given an
          untested premise may continue reasoning from that premise rather than stopping to
          investigate it.
        </p>
        <p>
          Researchers use the term &ldquo;sycophancy&rdquo; for a more specific failure: matching a
          user&rsquo;s stated belief or preference at the expense of a more truthful response.
        </p>
        <p>
          Not every agreeable answer is sycophantic. The user may be right, and the evidence may
          support the same conclusion.
        </p>
        <p>The practical problem is simpler:</p>
        <p className="pullQuestion">Agreement inside the conversation is not independent confirmation.</p>
      </section>

      <section aria-labelledby="four-jobs-heading">
        <h2 id="four-jobs-heading">Separate the four jobs</h2>
        <p>
          Do not ask one answer to serve simultaneously as advocate, critic, researcher, and
          decision-maker.
        </p>
        <CriticalReviewFramework />
      </section>

      <ExerciseBlock
        heading={promptComparisonExercise.title}
        id="change-the-job"
        timeLabel={promptComparisonExercise.timeLabel}
      >
        <p>{promptComparisonExercise.intro}</p>
        <PromptComparison />
        <PromptComparisonAnswerKey />
      </ExerciseBlock>

      <section aria-labelledby="advocacy-useful-heading">
        <h2 id="advocacy-useful-heading">Advocacy is useful when you label it</h2>
        <p>
          There is nothing inherently wrong with asking an AI system to strengthen an argument, draft
          the best case for a proposal, anticipate supportive reasoning, or rehearse how an advocate
          might respond.
        </p>
        <p>Those are legitimate generation tasks.</p>
        <p>The mistake is using advocacy output as though it were evaluation.</p>
        <p>Use separate steps:</p>
        <ul className="checkList">
          <li>Ask the advocate to build the strongest case.</li>
          <li>Ask the critic to identify the strongest credible challenge.</li>
          <li>Check the material claims against appropriate sources.</li>
          <li>Make the decision under the criteria that actually govern it.</li>
        </ul>
        <p>
          Role separation makes generated work easier to use without pretending that the roles are
          independent people.
        </p>
      </section>

      <section aria-labelledby="reusable-prompt-heading">
        <h2 id="reusable-prompt-heading">Copy a prompt that asks for useful friction</h2>
        <CriticalReviewPromptBlock
          intro={
            <>
              &ldquo;Be honest&rdquo; and &ldquo;challenge me&rdquo; express a preference. The prompt
              below assigns specific review work.
            </>
          }
        />
      </section>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>
          You changed the system&rsquo;s job from supporting a conclusion to exposing the decision
          process.
        </p>
        <p>The improvement was not that the second prompt sounded more negative.</p>
        <p>
          The response had to state the objective, expose assumptions, develop a credible countercase,
          identify missing evidence, compare alternatives, and delay its recommendation.
        </p>
        <p>That still did not make the response independent.</p>
        <p>
          You must still open the sources, judge the criteria, account for the actual setting, and make
          the decision.
        </p>
      </section>

      <section aria-labelledby="before-you-continue-heading">
        <h2 id="before-you-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <section aria-labelledby="go-deeper-heading">
        <h2 id="go-deeper-heading">Go deeper</h2>

        <details className="guideDetails">
          <summary>Can I just tell it to be brutally honest?</summary>
          <div className="detailsBody">
            <p>That mainly changes tone.</p>
            <p>
              A blunt answer can still be shallow, unsupported, irrelevant, or wrong. Harsh language
              may also make weak objections seem more important than they are.
            </p>
            <p>Assign specific work instead:</p>
            <ul className="checkList">
              <li>Identify assumptions.</li>
              <li>Give the strongest credible objection.</li>
              <li>State missing evidence.</li>
              <li>Mark unsupported claims.</li>
              <li>Identify what would change the conclusion.</li>
              <li>Compare realistic alternatives.</li>
            </ul>
            <p>Directness is a style. Critical review is a method.</p>
          </div>
        </details>

        <details className="guideDetails">
          <summary>Does starting a new conversation make the review independent?</summary>
          <div className="detailsBody">
            <p>No.</p>
            <p>
              A new conversation can help separate the advocate and critic roles and remove the
              immediate visible thread.
            </p>
            <p>
              Depending on the product and settings, other instructions, personalization, or memory
              features may still apply.
            </p>
            <p>
              More importantly, a fresh conversation is still a generated response&mdash;not an
              independent reviewer.
            </p>
            <p>Use separate conversations to organize the work, not to certify it.</p>
            {/* What actually carries across a new conversation — memory, account and
                project instructions, connected sources — is guide 2's subject, so it
                is linked rather than summarized here. */}
            <p className="muted">
              Related guide:{" "}
              <Link href="/learn-ai/why-did-it-forget">
                Why did it forget what I told it earlier?
              </Link>
            </p>
          </div>
        </details>

        <details className="guideDetails">
          <summary>Should I ask several tools and take the majority view?</summary>
          <div className="detailsBody">
            <p>No.</p>
            <p>
              Several systems may share training patterns, source material, framing, or common errors.
              Agreement among generated answers is not automatically independent confirmation.
            </p>
            <p>Compare:</p>
            <ul className="checkList">
              <li>Source environment</li>
              <li>Evidence cited</li>
              <li>Assumptions</li>
              <li>Material objections</li>
              <li>Missing sources</li>
              <li>Verification quality</li>
            </ul>
            <p>Do not treat product agreement as a vote.</p>
          </div>
        </details>
      </section>

      <WorthRepeating>
        Agreement is not confirmation. Disagreement is not independence.
      </WorthRepeating>

      <SourceNotes guide={guide} />

      <section className="card" aria-labelledby="second-look-heading">
        <h2 id="second-look-heading" style={{ fontSize: "1.35rem" }}>
          Want a second look at a real workflow?
        </h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          Describe the decision, the source needs, and the type of material involved. The Law Library
          can help structure a teaching or research workflow and identify where independent sources,
          institutional guidance, or human review are needed.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <a className="primary" href="mailto:library@law.stanford.edu">
            Email the Law Library
          </a>
          <Link className="secondary" href="/learn-ai/which-ai-tool-fits">
            Choose the right source environment
          </Link>
        </div>
        <p className="muted" style={{ fontSize: "0.9rem", marginTop: "0.8rem" }}>
          Do not send confidential, clinic, client, student, personnel, unpublished, or other
          restricted material in an initial email.
        </p>
      </section>

      {/* Not a previous/next pair: the first collection is complete, so it is
          offered as a foundation to review rather than as the step before this one. */}
      <CollectionGuideNavigation
        foundational={{
          collection: CORE_AI_DECISIONS,
          description:
            "Six durable habits for useful tasks, data boundaries, source selection, legal verification, fabricated authority, and student learning.",
        }}
        nextInCollection={next}
        nextDescription="Understand what information the current response can actually use—and how to recover when instructions or sources have fallen out of view."
        relatedGuides={relatedGuides}
      />
    </GuideLayout>
  );
}

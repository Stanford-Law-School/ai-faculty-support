import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, nextGuide, previousGuide } from "../../lib/guides";
import {
  CORE_AI_DECISIONS,
  guideCollectionLine,
} from "../../lib/learnAiCollections";
import { recoveryShortForm } from "../../lib/contextRecoveryWorkflow";
import { contextReceiptExercise } from "../../lib/contextReceiptExercise";
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
  ContextLocationCards,
  ContextReceiptAnswerKey,
  ContextReceiptExercise,
  ContextReceiptPromptBlock,
  ContextRecoveryWorkflow,
  CurrentContextFeatures,
} from "../../components/ContextGuide";

const guide = getGuide("why-did-it-forget");

export const metadata: Metadata = {
  title: "Why Did AI Forget What I Told It Earlier? | SLS Faculty AI Guide",
  description:
    "A five-minute guide to distinguishing AI conversation context, memory, instructions, and active sources—and recovering a drifting workflow.",
  alternates: { canonical: "/learn-ai/why-did-it-forget" },
  openGraph: {
    title: "Why Did AI Forget What I Told It Earlier? | SLS Faculty AI Guide",
    description:
      "A five-minute guide to distinguishing AI conversation context, memory, instructions, and active sources—and recovering a drifting workflow.",
    url: "/learn-ai/why-did-it-forget",
  },
};

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "Name the exact active sources and their versions. A remembered summary, visible file name, or prior citation does not replace opening the current authoritative material.",
  },
  {
    label: "Sensitivity",
    primary: "",
    detail: (
      <>
        Memory, project instructions, connected sources, and long conversation history can carry
        information beyond the immediate prompt. Apply the same service, account, feature, and data
        rules before placing sensitive material in any of those locations&mdash;
        <Link href="/learn-ai/what-can-i-safely-share">check the exact service and workflow</Link>{" "}
        first.
      </>
    ),
  },
  {
    label: "Stakes",
    primary:
      "As the consequence rises, shorten the working brief, reattach the controlling source, document the version used, and require a stronger human review point.",
  },
];

export default function WhyDidItForget() {
  const previous = previousGuide(guide.slug);
  const next = nextGuide(guide.slug);
  const relatedGuides = [
    getGuide("which-ai-tool-fits"),
    getGuide("what-can-i-safely-share"),
    getGuide("why-does-it-agree-with-me"),
  ];

  return (
    <GuideLayout guide={guide} collectionLine={guideCollectionLine(guide)}>
      <AnswerFirst>
        <p>{guide.answer}</p>
        <p>{guide.answerSecond}</p>
      </AnswerFirst>

      <FacultyMove>
        <p className="facultyMovePrimary">{recoveryShortForm}</p>
        <p>{guide.facultyMoveSupport}</p>
        <p className="facultyMoveRelated muted">
          Working with sensitive or restricted material?{" "}
          <Link href="/learn-ai/what-can-i-safely-share">
            What can I safely share with an AI tool?
          </Link>
        </p>
      </FacultyMove>

      <section aria-labelledby="context-locations-heading">
        <h2 id="context-locations-heading">The information may live in four different places</h2>
        <p>
          A continuing conversation can make those places feel interchangeable. They are not.
        </p>
        <ContextLocationCards />
      </section>

      {/* Mechanism, without a number that dates. The durable point is that working
          space is finite and shared, that products manage growth differently, and
          that fitting is not the same as being used well. */}
      <section aria-labelledby="drift-heading">
        <h2 id="drift-heading">A context window is working material, not a complete record</h2>
        <p>
          A context window is the material available to a model while it generates the current
          response. It is different from the model&rsquo;s training data, the complete conversation
          stored in an interface, and any optional memory or personalization feature.
        </p>
        <p>
          As a conversation grows, messages, files, tool results, and generated text compete for
          finite working space. Products may handle that growth differently: some use rolling
          context, some summarize or compact earlier turns, and some retrieve selected portions when
          they appear relevant.
        </p>
        <p>
          Even when the material fits, more context does not guarantee that every detail will be used
          equally well. A long thread can also contain conflicting instructions, outdated source
          versions, abandoned plans, and several tasks mixed together.
        </p>
        <p>The durable lesson is not to memorize a model&rsquo;s current context limit.</p>
        <p className="pullQuestion">
          It is to make the small amount of information that must govern the next answer explicit,
          current, and inspectable.
        </p>
      </section>

      <section aria-labelledby="recovery-heading">
        <h2 id="recovery-heading">Recover the task in three steps</h2>
        <p>Do not repair a drifting conversation by adding another vague reminder.</p>
        <ContextRecoveryWorkflow />
      </section>

      <ExerciseBlock
        heading={contextReceiptExercise.title}
        id="context-receipt"
        timeLabel={contextReceiptExercise.timeLabel}
      >
        <p>{contextReceiptExercise.intro}</p>
        <ContextReceiptExercise />
        <ContextReceiptAnswerKey />
      </ExerciseBlock>

      <section aria-labelledby="fresh-conversation-heading">
        <h2 id="fresh-conversation-heading">
          Sometimes starting fresh is easier than repairing the thread
        </h2>
        <p>A fresh conversation with a compact context packet is often useful when:</p>
        <ul className="checkList">
          <li>The task has changed materially.</li>
          <li>The thread contains several abandoned approaches.</li>
          <li>Earlier and later instructions conflict.</li>
          <li>The authoritative source set or document version has changed.</li>
          <li>
            The conversation has become long enough that the controlling details are difficult to
            locate.
          </li>
          <li>
            The next output will support a consequential teaching, research, legal, or administrative
            decision.
          </li>
        </ul>
        <p>Starting fresh does not mean starting without context.</p>
        <p>Carry forward:</p>
        <ul className="checkList">
          <li>The current task</li>
          <li>The authoritative sources</li>
          <li>Decisions already made</li>
          <li>Binding constraints</li>
          <li>Important unresolved questions</li>
          <li>The output required</li>
        </ul>
        <p className="muted">
          A new conversation may still use account instructions, project instructions, saved
          memories, or personalization features when those are enabled. Review those settings when a
          truly clean separation matters.
        </p>
      </section>

      <section aria-labelledby="reusable-prompt-heading">
        <h2 id="reusable-prompt-heading">Copy a context-receipt prompt</h2>
        <ContextReceiptPromptBlock
          intro="Use this before an important next step in a long, mixed-purpose, or source-heavy conversation."
        />
      </section>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>You replaced an assumption about memory with an explicit working brief.</p>
        <p>
          The context packet named the task, sources, decisions, constraints, and output. The receipt
          gave you something concrete to compare with that record before the system began drafting.
        </p>
        <p>If the receipt was complete, you confirmed the setup.</p>
        <p>If it was incomplete, you found the gap before relying on the answer.</p>
        <p>
          The authoritative control remained outside the conversation: the source, current version,
          and faculty decision about what should govern the work.
        </p>
        {/* One sentence, and no more: what makes a claim well supported is guide
            3's subject, so it is linked rather than summarized here. */}
        <p className="muted">
          A complete-looking context receipt can still contain unsupported or overly certain claims.
          Check the evidence behind the next response.
        </p>
        <p className="muted">
          Related guide:{" "}
          <Link href="/learn-ai/why-does-it-sound-so-certain">Why does it sound so certain?</Link>
        </p>
      </section>

      <section aria-labelledby="before-you-continue-heading">
        <h2 id="before-you-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <section aria-labelledby="go-deeper-heading">
        <h2 id="go-deeper-heading">Go deeper</h2>

        <details className="guideDetails">
          <summary>Is the context window the same thing as memory?</summary>
          <div className="detailsBody">
            <p>No.</p>
            <p>The context window is the working material available for the current response.</p>
            <p>
              A memory or personalization feature may carry selected preferences, facts, or past
              information across conversations. Account and project instructions may also influence
              more than one chat.
            </p>
            <p>
              Those features can become part of context, but they are not the same thing as the
              complete conversation or an authoritative project record.
            </p>
            <p>For critical work, state the controlling information explicitly.</p>
          </div>
        </details>

        <details className="guideDetails">
          <summary>Does a new conversation clear everything?</summary>
          <div className="detailsBody">
            <p>Not necessarily.</p>
            <p>
              A new conversation removes the visible thread, which can make the task easier to
              organize.
            </p>
            <p>
              Account instructions, project instructions, saved memories, personalization, or
              connected sources may still apply when those features are enabled.
            </p>
            <p>
              Use a new conversation to create a clean working packet, not as proof that no prior
              influence remains.
            </p>
          </div>
        </details>

        <details className="guideDetails">
          <summary>If a file is visible, can the system use the current version?</summary>
          <div className="detailsBody">
            <p>Not automatically.</p>
            <p>The file may be:</p>
            <ul className="checkList">
              <li>Unselected</li>
              <li>No longer available</li>
              <li>An imported copy of an older version</li>
              <li>Too large to be used in full</li>
              <li>Retrieved only in selected portions</li>
              <li>Outside the current conversation</li>
              <li>Available through a connector with a different scope than intended</li>
            </ul>
            <p>
              Confirm the active source, version, and relevant passage before relying on the answer.
            </p>
          </div>
        </details>
      </section>

      {/* Current product behavior, dated and separable. It sits after the durable
          sections and before Source Notes, and withholds itself once its monthly
          review date passes. */}
      <CurrentContextFeatures />

      <WorthRepeating>If it matters, put it back in the working context.</WorthRepeating>

      <SourceNotes guide={guide} />

      <section className="card" aria-labelledby="reconstruct-heading">
        <h2 id="reconstruct-heading" style={{ fontSize: "1.35rem" }}>
          A conversation or source workflow has become hard to reconstruct?
        </h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          Describe the task, source set, and current product or workspace. The Law Library can help
          identify a cleaner source-grounded workflow or a more reliable way to preserve the project
          record.
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
          restricted material in an initial email. The Law Library cannot inspect hidden product
          context, private conversation history, account memory, or internal model state.
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
        nextDescription="Separate the tone of the answer from the evidence supporting its material claims."
        relatedGuides={relatedGuides}
      />
    </GuideLayout>
  );
}

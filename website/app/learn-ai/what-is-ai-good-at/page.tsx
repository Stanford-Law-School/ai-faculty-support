import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, nextGuide } from "../../lib/guides";
import { PromptBlock } from "../../components/GuideBlocks";
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

const guide = getGuide("what-is-ai-good-at");

export const metadata: Metadata = {
  title: "What Is AI Actually Good At? | SLS Faculty AI Guide",
  description:
    "A four-minute guide to choosing a useful, low-risk first AI task for law teaching, research, and scholarship.",
  alternates: { canonical: "/learn-ai/what-is-ai-good-at" },
  openGraph: {
    title: "What Is AI Actually Good At? | SLS Faculty AI Guide",
    description:
      "A four-minute guide to choosing a useful, low-risk first AI task for law teaching, research, and scholarship.",
    url: "/learn-ai/what-is-ai-good-at",
  },
};

// The exercise prompt, exactly as a faculty member should paste it. The
// bracketed instruction is deliberately outside the copied text: the copy
// button carries the prompt, and the reader supplies their own passage.
const exercisePrompt = `Work only from the passage below.

Act as a skeptical law student preparing for class. Propose three questions that would test whether a reader understands the reasoning in the passage.

For each question, identify the sentence or idea in the passage that prompted it.

Do not add outside facts or legal authorities.`;

const firstUses = [
  {
    title: "Generate options",
    body: "Ask for possible discussion questions, counterarguments, examples, titles, or organizational approaches. The output is a menu. You decide which items, if any, deserve further work.",
  },
  {
    title: "Transform trusted material",
    body: "Ask the system to restate a public passage for a different audience, turn an outline into a checklist, or convert notes into possible questions. Compare the result directly with the source you supplied.",
  },
  {
    title: "Rehearse judgment",
    body: "Ask for skeptical-reader questions, possible objections, or points that need clarification. Treat the response as practice material, not expert review.",
  },
];

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "The supplied public passage. You can inspect exactly what the exercise is based on.",
  },
  {
    label: "Sensitivity",
    primary: "Public or Low Risk material only for this exercise.",
  },
  {
    label: "Stakes",
    primary:
      "Low. The output is a draft option, not an authority, grade, or final assessment.",
  },
];

export default function WhatIsAiGoodAt() {
  return (
    <GuideLayout guide={guide}>
      <AnswerFirst>
        <p>{guide.answer}</p>
      </AnswerFirst>

      <FacultyMove>
        <p>{guide.facultyMove}</p>
      </FacultyMove>

      <section aria-labelledby="first-uses-heading">
        <h2 id="first-uses-heading">Three strong first uses</h2>
        <p>
          A good first task is useful even before you trust the system very much. You should be able to inspect
          its inputs, evaluate its output quickly, and abandon the result without harm.
        </p>
        {firstUses.map(({ title, body }) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </section>

      <ExerciseBlock heading="A useful first experiment" id="try-this" timeLabel="90 seconds">
        <p>
          Use a Stanford-approved AI service. For this exercise, use only public or Low Risk text.
        </p>
        <ol className="guideSteps">
          <li>
            Choose 150&ndash;300 words from a published article, a public court opinion, or your own public
            course description.
          </li>
          <li>
            <p>Paste the following prompt into the service.</p>
            <PromptBlock label="Prompt" text={exercisePrompt} />
            <p className="muted">
              Then paste your own passage underneath it, where the prompt says to work from the passage below.
            </p>
          </li>
          <li>
            <p>Review the result using these questions:</p>
            <ul>
              <li>Can every proposed question be traced to the passage?</li>
              <li>Would at least one question advance the learning objective?</li>
              <li>What would you revise before using it with students?</li>
            </ul>
          </li>
          <li>Keep one, rewrite one, or discard all three. The decision is the exercise.</li>
        </ol>
      </ExerciseBlock>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>
          You gave the system a visible source, a narrow role, and an output you could judge quickly. The
          exercise succeeds whether the first draft is excellent, mediocre, or unusable, because the learning is
          in comparing the suggestions with your source and purpose.
        </p>
        <p>
          Nothing in the exercise required you to trust an uncited factual claim. Nothing became course material
          until you reviewed and edited it.
        </p>
      </section>

      <section aria-labelledby="why-good-heading">
        <h2 id="why-good-heading">Why this is a good first task</h2>
        <p>
          This workflow uses AI for variation and transformation while keeping the evidence, pedagogical aim, and
          consequential decision outside the system.
        </p>
        <p>That is the reusable pattern:</p>
        <ol className="guideSteps">
          <li>Start with material you are permitted to share.</li>
          <li>Define a narrow job.</li>
          <li>Ask for a result you can inspect.</li>
          <li>Compare the result with the source and your purpose.</li>
          <li>Keep the final judgment with a person.</li>
        </ol>
      </section>

      <section aria-labelledby="before-continue-heading">
        <h2 id="before-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <section aria-labelledby="not-here-heading">
        <h2 id="not-here-heading">Do not begin here</h2>
        <p>
          Do not make your first experiment &ldquo;find the governing law and tell me the answer,&rdquo;
          automatic grading, or analysis of client or clinic material. Those tasks raise source, fairness,
          confidentiality, and professional-judgment questions that require a different workflow.
        </p>
      </section>

      <details className="guideDetails">
        <summary>Can I use this workflow with an unpublished draft?</summary>
        <p>
          Possibly, but first{" "}
          <Link href="/learn-ai/what-can-i-safely-share">
            classify the material and confirm that the exact service, Stanford account, feature, and any
            connected application are approved for it
          </Link>
          .
        </p>
        <p>
          Data classification is not the only question. Coauthor permission, publisher terms, confidentiality
          commitments, research obligations, or other agreements may also control whether the material should be
          shared.
        </p>
        <p>
          The next guide in this series,{" "}
          <Link href="/learn-ai/what-can-i-safely-share">What can I safely share with an AI tool?</Link>,
          addresses that decision directly.
        </p>
      </details>

      <WorthRepeating>Use AI to widen the menu. Keep the choice and the authority.</WorthRepeating>

      <SourceNotes guide={guide} />

      <GuideSeriesStatus next={nextGuide(guide.slug)} />
    </GuideLayout>
  );
}

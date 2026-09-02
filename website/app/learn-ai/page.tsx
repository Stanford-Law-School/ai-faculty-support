import Link from "next/link";
import type { Metadata } from "next";
import { guideHref, processResources } from "../lib/guides";
import {
  publicCollections,
  plannedGuideTotal,
  publishedGuideTotal,
} from "../lib/learnAiCollections";
import { GuideCrumb, SourcesSensitivityStakes } from "../components/GuideKit";
import { GuideCollectionSection } from "../components/GuideCollections";
import { publishedTutorials, tutorialLibrary } from "../lib/tutorialLibrary";
import { TutorialCard } from "../components/TutorialLibrary";

export const metadata: Metadata = {
  title: "Learn AI | AI and Technology Support for SLS Faculty",
  description:
    "Five-minute, answer-first guides for responsible and effective AI use in teaching, legal research, and faculty scholarship.",
  alternates: { canonical: "/learn-ai" },
  openGraph: {
    title: "Learn AI | AI and Technology Support for SLS Faculty",
    description:
      "Five-minute, answer-first guides for responsible and effective AI use in teaching, legal research, and faculty scholarship.",
    url: "/learn-ai",
  },
};

// The three questions are the reusable mental model for the whole series. They
// are defined once here and repeated verbatim inside individual guides via the
// shared component.
const threeQuestions = [
  {
    label: "Sources",
    primary: "What evidence is the answer using, and can I inspect it?",
    detail:
      "A fluent answer is not a source. Identify the supplied, retrieved, or cited material and check what it actually supports.",
  },
  {
    label: "Sensitivity",
    primary:
      "Is this exact service, account, and feature approved for the material I am sharing?",
    detail:
      "Approval can differ by service, account, feature, and connector. Classify the material before uploading it.",
  },
  {
    label: "Stakes",
    primary: "What happens if the output is wrong, incomplete, biased, or disclosed?",
    detail:
      "The higher the consequence, the stronger the source, review, documentation, and human-decision requirements should be.",
  },
];

const expectations = [
  {
    title: "Answer first",
    body: "The page begins with the decision or behavior you need—not a long technical introduction.",
  },
  {
    title: "One faculty move",
    body: "Each guide identifies one action worth carrying into teaching, research, or scholarship.",
  },
  {
    title: "A short experiment",
    body: "The exercise is designed to teach something whether the first AI output is excellent, mediocre, or unusable.",
  },
  {
    title: "Visible review information",
    body: "Current product, policy, and interface details are separated from durable guidance and carry a review date.",
  },
];

export default function LearnAi() {
  const collections = publicCollections();
  const supportResources = processResources();
  const tutorials = publishedTutorials();

  return (
    <div className="docPage">
      <GuideCrumb />
      <p className="eyebrow">Faculty AI guide</p>
      <h1>AI on the Record</h1>
      <p className="lede">
        Five-minute guides for using AI in teaching, research, and scholarship&mdash;with sources you can
        inspect, material you can protect, and judgment that stays yours.
      </p>
      <p>
        Start with the question in front of you. Each guide gives you the answer first, one concrete faculty
        move, and a short exercise that remains useful even when the AI output is imperfect.
      </p>
      <div className="actions">
        <Link className="primary" href="/learn-ai/what-is-ai-good-at">
          Start with a useful first task
        </Link>
        <a className="textLink" href="mailto:library@law.stanford.edu">
          Questions? Email the Law Library
        </a>
      </div>

      <section aria-labelledby="three-questions-heading">
        <p className="eyebrow">Use this every time</p>
        <h2 id="three-questions-heading">Three questions to carry into every AI task</h2>
        <SourcesSensitivityStakes items={threeQuestions} variant="cards" />
        <p>
          When one of these answers is unclear, narrow the task, remove the sensitive material, or{" "}
          <a href="mailto:library@law.stanford.edu">stop and ask</a>.
        </p>
      </section>

      {/* Two collections, each numbered from 1. Only collections with a published
          guide appear, and every count comes from the guide records — the page
          cannot claim a guide it has no route for. */}
      <p className="collectionsIntro">
        <span className="srOnly">Guide collections: </span>
        {collections.length} collections &middot; {publishedGuideTotal()} published guides
        {plannedGuideTotal() > 0 ? ` · ${plannedGuideTotal()} planned` : null}
      </p>

      {collections.map((collection) => (
        <GuideCollectionSection collection={collection} key={collection.id}>
          {/* A complete collection ends with a stated completion rather than an
              empty "Coming next" slot. The condition is derived, not asserted. */}
          {collection.status === "complete" && collection.completionHeading && (
            <div className="releaseNote" aria-labelledby={`release-note-${collection.id}`}>
              <h3 id={`release-note-${collection.id}`}>{collection.completionHeading}</h3>
              <p className="muted">{collection.completionBody}</p>
            </div>
          )}
        </GuideCollectionSection>
      ))}

      {/* The tutorial library is the long-form counterpart to the five-minute
          guides, and it sits directly beneath them: a faculty member who has read
          a guide and now wants to configure something needs the next step to be
          visible here rather than only in the footer. */}
      {tutorials.length > 0 && (
        <section aria-labelledby="tutorial-library-heading">
          <p className="eyebrow">Go deeper</p>
          <h2 id="tutorial-library-heading">{tutorialLibrary.title}</h2>
          <p className="muted" style={{ maxWidth: "72ch" }}>
            {tutorialLibrary.summary}
          </p>
          <div className="tutorialList">
            {tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.slug} tutorial={tutorial} />
            ))}
          </div>
          <p className="actions">
            <Link className="textLink" href="/tutorials">
              All tutorials &rarr;
            </Link>
          </p>
        </section>
      )}

      {/* Supporting resources sit beneath the collection, deliberately quieter: a
          process checklist is useful when you need it and is not one of the six
          decisions to start from. */}
      {supportResources.length > 0 && (
        <section className="processResources" aria-labelledby="process-resources-heading">
          <p className="eyebrow">Faculty process resources</p>
          <h2 id="process-resources-heading">When you need the process, not the decision</h2>
          <div className="processResourceList">
            {supportResources.map((resource) => (
              <Link
                className="card interactive processResourceCard"
                href={guideHref(resource.slug)}
                key={resource.slug}
              >
                <h3>{resource.title}</h3>
                <p className="muted">{resource.summary}</p>
                <span className="explore">
                  Open the checklist &rarr;
                  {resource.readTime ? <span className="srOnly"> ({resource.readTime} read)</span> : null}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="expectations-heading">
        <h2 id="expectations-heading">What to expect from every guide</h2>
        <dl className="sssList sssCards sssFour">
          {expectations.map(({ title, body }) => (
            <div className="sssItem" key={title}>
              <dt>{title}</dt>
              <dd>
                <span className="sssDetail" style={{ marginTop: 0 }}>{body}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card" aria-labelledby="learn-ai-help-heading">
        <h2 id="learn-ai-help-heading" style={{ fontSize: "1.35rem" }}>
          Not sure where your question fits?
        </h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          Describe the teaching, research, or scholarship task&mdash;not merely the product you are
          considering. The Law Library can help identify the appropriate source, service, or workflow.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <a className="primary" href="mailto:library@law.stanford.edu">
            Email library@law.stanford.edu
          </a>
        </div>
      </section>
    </div>
  );
}

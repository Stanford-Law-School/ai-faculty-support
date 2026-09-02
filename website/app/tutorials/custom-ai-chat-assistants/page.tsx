import Link from "next/link";
import type { Metadata } from "next";
import { getTutorial } from "../../lib/tutorialLibrary";
import { getGuide, guideHref } from "../../lib/guides";
import {
  TutorialActions,
  TutorialCautions,
  TutorialContents,
  TutorialCovers,
  TutorialCrumb,
  TutorialFacts,
  TutorialOutcomes,
  TutorialPreview,
} from "../../components/TutorialLibrary";

const tutorial = getTutorial("custom-ai-chat-assistants");

export const metadata: Metadata = {
  title: `${tutorial.title} | SLS Faculty Tutorial`,
  description: tutorial.summary,
  alternates: { canonical: `/tutorials/${tutorial.slug}` },
  openGraph: {
    title: `${tutorial.title} | SLS Faculty Tutorial`,
    description: tutorial.summary,
    url: `/tutorials/${tutorial.slug}`,
  },
};

export default function CustomAiChatAssistantsTutorial() {
  const relatedGuides = tutorial.relatedGuideSlugs.map((slug) => getGuide(slug));

  return (
    <article className="docPage">
      <TutorialCrumb tutorialTitle={tutorial.title} />
      <p className="eyebrow">Faculty tutorial</p>
      <h1>{tutorial.title}</h1>
      <p className="lede">{tutorial.subtitle}</p>

      <TutorialFacts tutorial={tutorial} />
      <TutorialActions tutorial={tutorial} />

      <section aria-labelledby="tutorial-about-heading">
        <h2 id="tutorial-about-heading">What this tutorial is</h2>
        <p>{tutorial.summary}</p>
        <h3>Products covered</h3>
        <TutorialCovers tutorial={tutorial} />
      </section>

      {/* The limits come before the instructions, for the same reason the guides
          put the answer first: a reader who stops here has still read the part
          that matters most. */}
      <TutorialCautions tutorial={tutorial} />

      <section aria-labelledby="tutorial-outcomes-heading">
        <h2 id="tutorial-outcomes-heading">What you will be able to do</h2>
        <TutorialOutcomes tutorial={tutorial} />
      </section>

      <section aria-labelledby="tutorial-contents-heading">
        <h2 id="tutorial-contents-heading">What is inside</h2>
        <TutorialContents tutorial={tutorial} />
      </section>

      <section aria-labelledby="tutorial-preview-heading">
        <h2 id="tutorial-preview-heading">Preview</h2>
        <p className="muted">
          Read it here, or download it and keep it beside the interface you are configuring.
        </p>
        <TutorialPreview tutorial={tutorial} />
        <TutorialActions tutorial={tutorial} />
      </section>

      <section aria-labelledby="tutorial-related-heading">
        <h2 id="tutorial-related-heading">Guides that pair with this</h2>
        <p className="muted">
          The tutorial covers how to build an assistant. These five-minute guides cover the judgment
          around it&mdash;which service fits the task, what you can put into it, and how to check
          what comes out.
        </p>
        <ul className="tutorialRelated">
          {relatedGuides.map((guide) => (
            <li key={guide.slug}>
              <Link href={guideHref(guide.slug)}>{guide.title}</Link>
              <span className="muted"> {guide.summary}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tutorial-sources-heading">
        <h2 id="tutorial-sources-heading">Sources and maintenance</h2>
        <ul className="sourceNotes">
          <li>
            The tutorial&rsquo;s own <strong>Appendix B</strong> lists every vendor and Stanford page
            each step was checked against, so a reader can re-verify a screen that has changed.
          </li>
          <li>
            Interface details&mdash;menu names, model lists, capability toggles, and sharing
            options&mdash;change faster than the document. The date above is when they were last
            checked, and this page stops asserting currency once a re-check is due.
          </li>
          <li>
            Screens were captured in Stanford accounts. What you see depends on your own plan,
            workspace, and permissions.
          </li>
          <li>
            Maintained by the Robert Crown Law Library. Corrections and requests:{" "}
            <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>.
          </li>
        </ul>
      </section>

      <p className="tutorialBackLink">
        <Link href="/tutorials">&larr; All tutorials</Link>
      </p>
    </article>
  );
}

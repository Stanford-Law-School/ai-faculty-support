import Link from "next/link";
import type { Metadata } from "next";
import { publishedTutorials, tutorialLibrary } from "../lib/tutorialLibrary";
import { TutorialCard, TutorialCrumb } from "../components/TutorialLibrary";

export const metadata: Metadata = {
  title: "Tutorial library | AI and Technology Support for SLS Faculty",
  description:
    "Long-form, downloadable tutorials for SLS faculty and staff: step-by-step walkthroughs of AI work, each with its own update date and source-verification date.",
  alternates: { canonical: "/tutorials" },
  openGraph: {
    title: "Tutorial library | AI and Technology Support for SLS Faculty",
    description:
      "Long-form, downloadable tutorials for SLS faculty and staff: step-by-step walkthroughs of AI work, each with its own update date and source-verification date.",
    url: "/tutorials",
  },
};

export default function TutorialLibraryIndex() {
  const tutorials = publishedTutorials();

  return (
    <div className="docPage">
      <TutorialCrumb />
      <p className="eyebrow">Faculty tutorials</p>
      <h1>{tutorialLibrary.title}</h1>
      <p className="lede">{tutorialLibrary.tagline}</p>
      <p>{tutorialLibrary.summary}</p>

      <section aria-labelledby="tutorial-list-heading">
        <h2 id="tutorial-list-heading">
          {tutorials.length === 1 ? "In the library" : `In the library (${tutorials.length})`}
        </h2>
        {/* The list is generated from the records, so a tutorial cannot appear
            here without a file, a page count, and both of its dates. */}
        {tutorials.length > 0 ? (
          <div className="tutorialList">
            {tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.slug} tutorial={tutorial} />
            ))}
          </div>
        ) : (
          <p className="muted">The first tutorial is being prepared.</p>
        )}
        <p className="muted tutorialGrowthNote">{tutorialLibrary.growthNote}</p>
      </section>

      <section aria-labelledby="tutorial-vs-guide-heading">
        <h2 id="tutorial-vs-guide-heading">Tutorial or guide?</h2>
        <div className="grid two">
          <article className="card">
            <h3>Use a tutorial</h3>
            <p className="muted">
              You are configuring something, following steps, and want a document open beside the
              interface. Tutorials are long, sequential, and meant to be downloaded and kept.
            </p>
          </article>
          <article className="card">
            <h3>Use a guide</h3>
            <p className="muted">
              You have one decision to make and five minutes. The{" "}
              <Link href="/learn-ai">Learn AI guides</Link> give the answer first, one faculty move,
              and a short exercise.
            </p>
          </article>
        </div>
      </section>

      <section className="card" aria-labelledby="tutorial-help-heading">
        <h2 id="tutorial-help-heading" style={{ fontSize: "1.35rem" }}>
          Want a tutorial on something else?
        </h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          Tell us the task, not only the product. {tutorialLibrary.maintainer} writes these in
          response to the work faculty and staff are actually doing.
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

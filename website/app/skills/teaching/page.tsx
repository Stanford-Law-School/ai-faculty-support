import Link from "next/link";
import type { Metadata } from "next";
import { getSkills } from "../../lib/skills";
import { getCollection, skillHooks } from "../../lib/collections";

export const metadata: Metadata = {
  title: "Teaching & Course Design — SLS Faculty AI Skills",
  description:
    "Seven hands-on partners for the work of teaching: design a course and syllabus, plan a class, build assessments and rubrics, set an AI policy, craft Socratic questions, check accessibility, and curate reading lists.",
};

export default function TeachingCollection() {
  const c = getCollection("teaching")!;
  const skills = getSkills();

  return (
    <>
      <p className="eyebrow"><Link href="/skills">Skills</Link> · Collection</p>
      <h1>{c.name}</h1>
      <p className="lede">
        <strong>{c.tagline}</strong> Seven hands-on partners for the real work of teaching. Bring your goals,
        your prior materials, and your judgment; get clean, review-ready drafts you can take straight into the
        classroom.
      </p>

      <section>
        <p className="eyebrow">What&rsquo;s inside</p>
        <h2>Pick the task in front of you</h2>
        <div className="grid two" style={{ marginTop: "1.2rem" }}>
          {c.slugs.map((slug) => {
            const s = skills.find((x) => x.slug === slug);
            if (!s) return null;
            return (
              <Link key={slug} className="card interactive" href={`/skills/${slug}`}>
                <span className="pill"><span className="dot" />{s.status}</span>
                <h3 style={{ marginTop: "0.7rem" }}>{s.name}</h3>
                <p className="muted" style={{ margin: 0 }}>{skillHooks[slug] ?? s.summary}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="card">
        <p className="eyebrow">Works with the Judgment Series</p>
        <h2 style={{ fontSize: "1.4rem" }}>Deciding <em>whether</em> to use AI first?</h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          These skills build course materials. If you&rsquo;re still weighing whether and how AI belongs in your
          course at all, start in the AI Judgment Series &mdash; then come back here to build.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <Link className="secondary" href="/skills/judgment-series">Explore the AI Judgment Series</Link>
        </div>
      </section>

      <section className="card">
        <p className="eyebrow">Next step</p>
        <h2 style={{ fontSize: "1.4rem" }}>Turn five of these into one course-design agent</h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          The guide builds a <em>Faculty Course Design Studio</em> from the skills on this page: it decides which
          method your request needs, keeps your course context as it moves from objectives to policy to rubric,
          and stops for your approval along the way.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <Link className="secondary" href="/build-an-agent">Build an agent from these skills</Link>
        </div>
      </section>

      <p className="muted">
        Open any skill above to read the details and download the ZIP for ChatGPT or Claude.
      </p>
    </>
  );
}

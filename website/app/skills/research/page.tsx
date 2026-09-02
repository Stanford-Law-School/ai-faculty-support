import Link from "next/link";
import type { Metadata } from "next";
import { getSkills, getSkill } from "../../lib/skills";
import { getCollection, researchQuestions, skillHooks } from "../../lib/collections";

export const metadata: Metadata = {
  title: "Faculty Research & Scholarship — SLS Faculty AI Skills",
  description:
    "Ten conversational skills for the arc of scholarship: scope a project, review the literature, plan legal research, build and test an argument, revise structure, check citations, edit prose, plan publication, and adapt work for the public.",
};

const pathways = [
  { title: "I have an idea but no project", route: "Research Support Guide → Research Project Planner → Literature Review Helper" },
  { title: "I need the authorities nailed down", route: "Legal Research Planner → Citation Checker" },
  { title: "I have sources and need a thesis", route: "Argument Builder → Draft Revision Coach" },
  { title: "The draft is done but rough", route: "Draft Revision Coach → Scholarly Writing Editor → Citation Checker" },
  { title: "I'm ready to submit", route: "Publication Planner → Citation Checker" },
  { title: "I want to reach a wider audience", route: "Public Writing Adapter" },
];

export default function ResearchCollection() {
  const c = getCollection("research")!;
  const guide = getSkill(c.frontDoor!);
  const destinations = c.slugs.filter((s) => s !== c.frontDoor);
  const skills = getSkills();

  return (
    <>
      <p className="eyebrow"><Link href="/skills">Skills</Link> · Collection</p>
      <h1>{c.name}</h1>
      <p className="lede">
        <strong>{c.tagline}</strong> Ten conversational partners for the real work of scholarship &mdash; from a first
        idea to a finished article and its public adaptation. Take only the helper your stage needs; you never have to
        use them all. Sources are verified, never invented.
      </p>

      <section className="card hero-card">
        <p className="eyebrow">Start here</p>
        <h2 style={{ fontSize: "1.7rem" }}>{guide.name}</h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          {skillHooks[guide.slug]} This guide is the front door: it asks what you&rsquo;re actually trying to do right
          now, then points you to the one or two helpers that fit &mdash; no scores, no rankings, no required path.
        </p>
        <div className="actions">
          <Link className="primary" href={`/skills/${guide.slug}`}>Start with this guide</Link>
          <Link className="secondary" href="/install">How to install</Link>
        </div>
      </section>

      <section>
        <p className="eyebrow">The nine helpers</p>
        <h2>Each answers one real question</h2>
        <div className="grid two" style={{ marginTop: "1.2rem" }}>
          {destinations.map((slug) => {
            const s = skills.find((x) => x.slug === slug);
            if (!s) return null;
            return (
              <Link key={slug} className="card interactive" href={`/skills/${slug}`}>
                <span className="pill"><span className="dot" />{s.status}</span>
                <h3 style={{ marginTop: "0.7rem" }}>{s.name}</h3>
                <p style={{ fontWeight: 600, margin: "0 0 0.5rem" }}>{researchQuestions[slug]}</p>
                <p className="muted" style={{ margin: 0 }}>{skillHooks[slug]}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="card">
        <h2>Not sure of the order? Follow a pathway</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          {pathways.map((p) => (
            <article key={p.title} className="card compact">
              <h3>{p.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{p.route}</p>
            </article>
          ))}
        </div>
        <p className="muted" style={{ marginTop: "1rem" }}>
          Open any helper above to read the details and download the ZIP for ChatGPT or Claude.
        </p>
      </section>
    </>
  );
}

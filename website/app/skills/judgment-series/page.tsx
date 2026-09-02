import Link from "next/link";
import type { Metadata } from "next";
import { getSkills, getSkill } from "../../lib/skills";
import { getCollection, judgmentQuestions, skillHooks } from "../../lib/collections";

export const metadata: Metadata = {
  title: "AI Judgment Series — SLS Faculty AI Skills",
  description:
    "Nine conversational skills that build the judgment to use AI well: understand systems, interrogate claims and products, decide whether AI fits, test capability, design pilots and governance, and transfer learning into teaching.",
};

const pathways = [
  { title: "I feel lost", route: "Where to Start with AI → How AI Systems Work → Test What AI Can Do" },
  { title: "I heard a product claim", route: "Where to Start with AI → Understand an AI Tool → Check an AI Claim" },
  { title: "I have a problem to solve", route: "Where to Start with AI → Problem-Based Approach to AI → Plan an AI Pilot" },
  { title: "An institutional agent or workflow", route: "Where to Start with AI → How AI Systems Work → Test AI Governance" },
  { title: "I want to teach students about AI", route: "Where to Start with AI → Test What AI Can Do → Bring AI Into Your Teaching" },
  { title: "Prepping for a vendor demo", route: "Where to Start with AI → Understand an AI Tool → Check an AI Claim" },
];

export default function JudgmentSeriesCollection() {
  const c = getCollection("judgment-series")!;
  const compass = getSkill(c.frontDoor!);
  const destinations = c.slugs.filter((s) => s !== c.frontDoor);
  const skills = getSkills();

  return (
    <>
      <p className="eyebrow"><Link href="/skills">Skills</Link> · Collection</p>
      <h1>{c.name}</h1>
      <p className="lede">
        <strong>{c.tagline}</strong> Nine conversational skills that build the judgment to use AI well &mdash; and
        the confidence to say when not to. Take only the route your question needs; you never have to complete
        them all.
      </p>

      <section className="card hero-card">
        <p className="eyebrow">Start here</p>
        <h2 style={{ fontSize: "1.7rem" }}>{compass.name}</h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          {skillHooks[compass.slug]} This guide is the front door: it asks what you&rsquo;re actually trying to
          figure out, then points you to the one or two skills that fit &mdash; no scores, no rankings, no curriculum
          to grind through.
        </p>
        <div className="actions">
          <Link className="primary" href={`/skills/${compass.slug}`}>Start with this guide</Link>
          <Link className="secondary" href="/install">How to install</Link>
        </div>
      </section>

      <section>
        <p className="eyebrow">The eight destinations</p>
        <h2>Each answers one real question</h2>
        <div className="grid two" style={{ marginTop: "1.2rem" }}>
          {destinations.map((slug) => {
            const s = skills.find((x) => x.slug === slug);
            if (!s) return null;
            return (
              <Link key={slug} className="card interactive" href={`/skills/${slug}`}>
                <span className="pill"><span className="dot" />{s.status}</span>
                <h3 style={{ marginTop: "0.7rem" }}>{s.name}</h3>
                <p style={{ fontWeight: 600, margin: "0 0 0.5rem" }}>{judgmentQuestions[slug]}</p>
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
          Open any skill above to read the details and download the ZIP for ChatGPT or Claude.
        </p>
      </section>
    </>
  );
}

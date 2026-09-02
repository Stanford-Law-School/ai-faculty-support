import Link from "next/link";
import type { Metadata } from "next";
import { getSkills, getSkill } from "../../lib/skills";
import { getCollection, legalQuestions, skillHooks } from "../../lib/collections";

export const metadata: Metadata = {
  title: "SLS Legal Skills — SLS Faculty AI Skills",
  description:
    "Twelve helpers for legal method in faculty research and teaching: frame the question, analyze cases, map doctrine, interpret statutes and regulations, trace history, plan comparative research, analyze records and transactions, weigh professional responsibility, stress-test arguments, and verify authority.",
};

const pathways = [
  { title: "I'm starting a new research question", route: "Legal Skills Guide → Legal Question Framer → Doctrine Mapper" },
  { title: "I'm preparing to teach a case", route: "Case Law Analyzer → Legal Argument Stress Tester" },
  { title: "I'm working through a statute", route: "Statute and Regulation Interpreter → Legislative and Administrative History Navigator" },
  { title: "I'm checking a draft's authorities", route: "Legal Authority Verifier" },
  { title: "I'm building a transactional or litigation exercise", route: "Transaction Structure Analyzer · Litigation Record Analyzer" },
  { title: "I'm teaching legal ethics", route: "Professional Responsibility Analyzer" },
];

export default function LegalCollection() {
  const c = getCollection("legal")!;
  const guide = getSkill(c.frontDoor!);
  const destinations = c.slugs.filter((s) => s !== c.frontDoor);
  const skills = getSkills();

  return (
    <>
      <p className="eyebrow"><Link href="/skills">Skills</Link> · Collection</p>
      <h1>{c.name}</h1>
      <p className="lede">
        <strong>{c.tagline}</strong> Twelve helpers for legal method in faculty research and teaching. Take only
        the helper your task needs. These Skills support scholarship and teaching preparation only &mdash; never
        client, clinic, or active-matter work &mdash; and they verify authority rather than inventing it.
      </p>

      <section className="card hero-card">
        <p className="eyebrow">Start here</p>
        <h2 style={{ fontSize: "1.7rem" }}>{guide.name}</h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          {skillHooks[guide.slug]} This guide is the front door: it asks what legal-method problem you&rsquo;re
          actually working on, then points you to one primary helper and at most one supporting one &mdash; no
          scores, no required path.
        </p>
        <div className="actions">
          <Link className="primary" href={`/skills/${guide.slug}`}>Start with this guide</Link>
          <Link className="secondary" href="/install">How to install</Link>
        </div>
      </section>

      <section>
        <p className="eyebrow">The eleven helpers</p>
        <h2>Each answers one real question</h2>
        <div className="grid two" style={{ marginTop: "1.2rem" }}>
          {destinations.map((slug) => {
            const s = skills.find((x) => x.slug === slug);
            if (!s) return null;
            return (
              <Link key={slug} className="card interactive" href={`/skills/${slug}`}>
                <span className="pill"><span className="dot" />{s.status}</span>
                <h3 style={{ marginTop: "0.7rem" }}>{s.name}</h3>
                <p style={{ fontWeight: 600, margin: "0 0 0.5rem" }}>{legalQuestions[slug]}</p>
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

import Link from "next/link";
import type { Metadata } from "next";
import { collections } from "../lib/collections";
import { countLabel } from "../lib/counts";

export const metadata: Metadata = {
  title: "Skill files for faculty work — AI and Technology Support for SLS Faculty",
  description:
    "Downloadable assistants for ChatGPT and Claude, grouped into focused collections for teaching, AI judgment, research and scholarship, and legal method.",
  alternates: { canonical: "/skills" },
};

export default function SkillsHub() {
  return (
    <>
      <p className="eyebrow"><Link href="/">AI &amp; Technology Support</Link> · Skills</p>
      <h1>Skill files for faculty work</h1>
      <p className="lede">
        Downloadable assistants for ChatGPT and Claude, grouped into focused collections for teaching, AI
        judgment, research and scholarship, and legal method. They can help structure drafts, questions, and
        workflows; you remain responsible for sources, decisions, and final work.
      </p>
      <div className="chipRow">
        <span className="pill"><span className="dot" />{countLabel()}</span>
      </div>

      <section className="panel showcase" aria-labelledby="collections-heading">
        <div className="showcaseHead">
          <div>
            <p className="eyebrow">The collections</p>
            <h2 id="collections-heading">Find your starting point</h2>
          </div>
        </div>

        <div className="collectionGrid">
          {collections.map((c) => (
            <Link key={c.id} className="collectionTile" href={c.route}>
              <span className="pill"><span className="dot" />{c.slugs.length} skills</span>
              <h3>{c.name}</h3>
              <p className="tileTagline">{c.tagline}</p>
              <p className="tileBlurb">{c.blurb}</p>
              <div className="tileFoot">
                <span className="explore">Explore &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card crossPromo">
        <div className="crossPromoText">
          <p className="eyebrow">Once you have used one or two</p>
          <h2>Combine skills into your own agent</h2>
          <p className="muted">
            A skill is a method; an <strong>agent</strong> is a job. Give a handful of skills one job, a name, and
            firm limits, and you get a reusable assistant that already knows your standards &mdash; no choosing a
            skill every time. A module-by-module guide for ChatGPT, written for people who
            have never built anything like it.
          </p>
        </div>
        <div className="actions" style={{ marginTop: 0 }}>
          <Link className="primary" href="/build-an-agent">Open the agent guide</Link>
        </div>
      </section>

      <section className="card">
        <p className="eyebrow">New here?</p>
        <h2 style={{ fontSize: "1.4rem" }}>Two minutes to your first skill</h2>
        <p className="muted" style={{ maxWidth: "68ch" }}>
          Every skill is a small file you add once to ChatGPT or Claude &mdash; no coding, no setup to maintain.
          If that&rsquo;s new, start with the plain-English explainer, then install and go.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <Link className="secondary" href="/what-is-a-skill-file">What&apos;s a skill file?</Link>
          <Link className="secondary" href="/how-to-use">How to use them</Link>
          <Link className="secondary" href="/install">Install</Link>
          <Link className="secondary" href="/build-an-agent">Build an agent</Link>
        </div>
      </section>
    </>
  );
}

import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";
import Link from "next/link";

export default function PlanAnAiPilotSkill() {
  const skill = getSkill("plan-an-ai-pilot");
  return (
    <>
      <SkillBreadcrumb slug="plan-an-ai-pilot" />
      <p className="eyebrow">SLS AI Judgment Series · {skill.status} · v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">Turn an impressive demonstration into meaningful evidence.</p>
      <div className="actions">
        <DownloadButton skill={skill} />
        <Link className="secondary" href="/install-chatgpt">Install in ChatGPT</Link>
        <Link className="secondary" href="/install-claude">Install in Claude</Link>
        <Link className="secondary" href="/skills">View Judgment Series catalog</Link>
      </div>

      <section className="grid two">
        <article className="card">
          <h2>What it does</h2>
          <p>
            Helps faculty move from a polished vendor demo, a five-minute experiment, a prototype, a claim,
            or a proposed workflow to a disciplined, limited, documented pilot that produces evidence an
            authorized decision-maker can actually use.
          </p>
        </article>
        <article className="card">
          <h2>When to use it</h2>
          <p>
            Once a problem and a candidate AI use are defined well enough to test. For deciding whether AI
            belongs at all, start with the Problem-Based Approach to AI; to test one behavior, use the
            Test What AI Can Do.
          </p>
        </article>
        <article className="card">
          <h2>Demonstration is not a pilot</h2>
          <p>
            It keeps four states distinct: a demonstration shows a result once; a capability lab documents a
            behavior; a pilot tests whether a complete workflow performs acceptably under representative
            conditions; deployment is continuing use. A good pilot result is evidence, not approval.
          </p>
        </article>
        <article className="card">
          <h2>Decision first</h2>
          <p>
            Every pilot states the decision it will support before any test is designed, and rejects vague
            purposes like &ldquo;see how it goes.&rdquo; The pilot question names the users, task, materials,
            system, baseline, and acceptable limits.
          </p>
        </article>
        <article className="card">
          <h2>Evidence discipline</h2>
          <p>
            Establishes a baseline; builds representative and difficult test sets; sets success and failure
            criteria before results; counts omissions, not just visible errors; and measures the realistic
            human-review burden so time &ldquo;savings&rdquo; are not illusory.
          </p>
        </article>
        <article className="card">
          <h2>Critical failures are not averaged away</h2>
          <p>
            Fabricated authority, restricted-data exposure, or an unauthorized action cannot be offset by
            strong average performance. A single critical failure caps the decision at revise-and-retest or
            stop.
          </p>
        </article>
        <article className="card">
          <h2>Data, permissions, and agents</h2>
          <p>
            Defaults to public or synthetic material, least privilege, and no consequential actions. Agent
            pilots begin in simulation or a sandbox and separate read, draft, send, and delete. The Skill
            identifies data and institutional questions; it does not authorize data use.
          </p>
        </article>
        <article className="card">
          <h2>Stop conditions and change control</h2>
          <p>
            Every full pilot defines pause, stop, escalate, and resume triggers, and records the exact
            product, model, tier, and dates so a mid-pilot update triggers a rerun rather than silently
            invalidating results.
          </p>
        </article>
        <article className="card">
          <h2>Decision-ready outputs</h2>
          <p>
            Produces readiness briefs, charters, full protocols, test sets, scoring rubrics, failure logs,
            review-burden reports, comparison matrices, and a decision memo using only calibrated labels.
          </p>
        </article>
        <article className="card">
          <h2>Example prompts</h2>
          <ul>
            {skill.usageExamples?.map((ex) => <li key={ex}>{ex}</li>)}
          </ul>
        </article>
        <article className="card">
          <h2>Availability and limits</h2>
          <p>
            This Skill is in active development; the downloadable ZIP is coming soon. It does not approve
            products, certify security or accessibility, replace legal review, or authorize deployment.
            A successful pilot is evidence for a decision, not institutional authorization.
          </p>
        </article>
        <article className="card">
          <h2>Current research</h2>
          <p>
            Pilots that depend on current products, models, tiers, or Stanford services trigger live web
            research with a research-checked date. The Skill does not state current product facts from memory
            or infer approval from the absence of a public listing.
          </p>
        </article>
      </section>
    </>
  );
}

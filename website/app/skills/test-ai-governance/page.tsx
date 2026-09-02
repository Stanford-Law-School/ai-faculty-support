import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";
import Link from "next/link";

export default function TestAiGovernanceSkill() {
  const skill = getSkill("test-ai-governance");
  return (
    <>
      <SkillBreadcrumb slug="test-ai-governance" />
      <p className="eyebrow">SLS AI Judgment Series · {skill.status} · v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">Decide who may do what, with which evidence, under whose responsibility.</p>
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
            Helps faculty reason through AI governance by making realistic decisions in fictional
            composite simulations &mdash; not by reading abstract governance language &mdash; and by building
            structured decision maps for a proposed use.
          </p>
        </article>
        <article className="card">
          <h2>Governance as decision rights</h2>
          <p>
            Governance is not a document placed beside a system. It is the allocation of purpose,
            authority, access, evidence, responsibility, review, correction, escalation, monitoring, and
            stopping power across the whole workflow &mdash; and the gaps usually sit between those layers.
          </p>
        </article>
        <article className="card">
          <h2>Role-based simulations</h2>
          <p>
            You make an initial judgment, then a new complication appears &mdash; a retention term, a missing
            source, a permission request, a public error &mdash; and you reassess. Reusable role cards clarify
            who recommends, reviews, approves, operates, and may stop.
          </p>
        </article>
        <article className="card">
          <h2>Meaningful human judgment</h2>
          <p>
            &ldquo;A professor will review it&rdquo; is not an oversight plan. The Skill tests whether a reviewer
            has the role, competence, evidence, time, and authority to catch and correct the failure that
            matters &mdash; and labels oversight meaningful, limited, or ceremonial.
          </p>
        </article>
        <article className="card">
          <h2>Permission and action authority</h2>
          <p>
            Access to information and authority to act are different, and reading, drafting, sending,
            publishing, approving, and deleting are different. Least privilege and read-only-first are the
            defaults; confirmation precedes consequential external action.
          </p>
        </article>
        <article className="card">
          <h2>Data lifecycle and minimization</h2>
          <p>
            Maps data from collection through deletion and prefers the least information that serves the
            purpose. It does not authorize data use, and it does not assume &ldquo;no training&rdquo; means
            &ldquo;no retention.&rdquo;
          </p>
        </article>
        <article className="card">
          <h2>Evidence and authorization gates</h2>
          <p>
            Distinguishes what evidence justifies exploration, a capability test, a pilot, and continued use
            from who may authorize each. A successful pilot is evidence, not authorization &mdash; and this Skill
            never grants the deployment gate.
          </p>
        </article>
        <article className="card">
          <h2>Transparency, correction, and contestability</h2>
          <p>
            Notice is not consent. For consequential or public-facing use, the Skill designs how errors are
            reported, who fixes them, how affected people can contest an outcome, and how recurrence is
            prevented.
          </p>
        </article>
        <article className="card">
          <h2>Monitoring, incidents, and stop authority</h2>
          <p>
            Defines what is logged (without indefinite retention), how incidents are classified and
            escalated, and &mdash; critically &mdash; who can pause a user, disable a connector, or halt the use.
            A missing stop mechanism is a governance gap.
          </p>
        </article>
        <article className="card">
          <h2>Change control</h2>
          <p>
            A model update, tier change, new connector, or shifted purpose can invalidate prior assumptions,
            so material changes trigger renewed review rather than silent continuation.
          </p>
        </article>
        <article className="card">
          <h2>Current Stanford research</h2>
          <p>
            When the analysis depends on current Stanford guidance, services, or product terms, the Skill
            requires live official-source research with a date, and never infers approval or prohibition from
            the absence of a public listing.
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
            This Skill is in active development; the downloadable ZIP is coming soon. It grants no
            authorization and does not approve products, certify privacy, security, or accessibility, perform
            contract or legal review, or make consequential individual determinations. A legitimate
            recommendation may be to pause or not proceed.
          </p>
        </article>
      </section>
    </>
  );
}

import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";
import Link from "next/link";

export default function ProblemBasedApproachToAiSkill() {
  const skill = getSkill("problem-based-approach-to-ai");
  return (
    <>
      <SkillBreadcrumb slug="problem-based-approach-to-ai" />
      <p className="eyebrow">SLS AI Judgment Series · {skill.status} · v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">Start with the work, not the tool.</p>
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
            Helps faculty move from a frustration, a recurring task, a proposed chatbot or agent, or a
            vague desire to &ldquo;use AI&rdquo; to a clear view of the real problem &mdash; and a responsible
            decision about whether and how AI belongs in the solution.
          </p>
        </article>
        <article className="card">
          <h2>Problem first, tool second</h2>
          <p>
            It never opens by recommending a product. It asks what you are trying to accomplish, what is
            preventing it now, and what evidence would show the problem has improved &mdash; and it is
            comfortable concluding that AI is not the answer.
          </p>
        </article>
        <article className="card">
          <h2>The PAUSE framework</h2>
          <p>
            The SLS Faculty AI Lab&rsquo;s instructional decision framework: <strong>P</strong>roblem,
            <strong> A</strong>I-fit, <strong>U</strong>se ethically, <strong>S</strong>ave time (total workflow,
            not just tool time), and <strong>E</strong>levate skills. It is guidance, not official Stanford policy.
          </p>
        </article>
        <article className="card">
          <h2>The no-AI counterfactual</h2>
          <p>
            Every analysis asks what you would do if generative AI did not exist &mdash; clarifying policy,
            fixing a process, improving search, using a template or database, or stopping work that no longer
            adds value &mdash; and never straw-mans that option.
          </p>
        </article>
        <article className="card">
          <h2>Task-by-task fit</h2>
          <p>
            It decomposes a workflow into tasks and matches each to the least powerful, most controllable
            approach that fits &mdash; from better search and templates to grounded retrieval or narrow AI
            assistance. It does not recommend AI just because a task involves text.
          </p>
        </article>
        <article className="card">
          <h2>Human judgment stays specific</h2>
          <p>
            Instead of &ldquo;a human is in the loop,&rdquo; it names the role, the decision owned, the review
            time, the authority to reject or stop, and who is accountable &mdash; and checks whether that review
            is realistic at real volume.
          </p>
        </article>
        <article className="card">
          <h2>Data, risk, and total cost</h2>
          <p>
            It maps data and permissions with minimum-necessary defaults (and never authorizes restricted-data
            use), weighs stakes, reversibility, and verifiability, and counts the whole workflow to ask whether
            AI removes work or merely relocates it.
          </p>
        </article>
        <article className="card">
          <h2>Comfortable saying no</h2>
          <p>
            Outcomes range from &ldquo;no AI needed&rdquo; and &ldquo;fix the process first&rdquo; to
            &ldquo;narrow AI assistance&rdquo; or &ldquo;pilot-ready&rdquo; &mdash; never a ladder where more
            automation is better. No-use recommendations are constructive.
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
            This Skill is in active development; the downloadable ZIP is coming soon. It defines problems and
            use-case fit &mdash; it does not perform full product due diligence, design a complete pilot, or
            approve procurement. When AI plausibly fits, it hands off to the Plan an AI Pilot.
          </p>
        </article>
      </section>
    </>
  );
}

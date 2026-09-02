import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";
import Link from "next/link";

export default function BringAiIntoTeachingSkill() {
  const skill = getSkill("bring-ai-into-teaching");
  return (
    <>
      <SkillBreadcrumb slug="bring-ai-into-teaching" />
      <p className="eyebrow">SLS AI Judgment Series · {skill.status} · v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">Turn AI understanding into purposeful learning.</p>
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
            Helps faculty translate an AI concept, a lab result, a product or claim finding, a use case, a
            governance scenario, or a real course objective into a purposeful learning activity &mdash; deciding
            whether AI belongs and, if so, in what form.
          </p>
        </article>
        <article className="card">
          <h2>Learning objective first</h2>
          <p>
            It never starts with a tool. It begins with the judgment or skill students should develop, then
            asks whether AI would make that understanding more visible, testable, or discussable &mdash; or would
            simply hide the skill being taught.
          </p>
        </article>
        <article className="card">
          <h2>Comfortable leaving AI out</h2>
          <p>
            &ldquo;AI not needed&rdquo; and &ldquo;AI absent by design&rdquo; are legitimate, common outcomes.
            The Studio does not add AI to be current, and it never forces AI into a course.
          </p>
        </article>
        <article className="card">
          <h2>AI learning postures</h2>
          <p>
            A menu, not a ladder: AI absent, AI awareness, faculty demonstration, AI as an object of critique,
            constrained student use, AI as a comparison partner, AI-infused workflow, governance simulation,
            and an AI-free alternative.
          </p>
        </article>
        <article className="card">
          <h2>Foundational work without AI</h2>
          <p>
            It protects the independent practice that builds the skill &mdash; briefing the case, finding the
            issues, drafting the argument &mdash; so a mistake in the reasoning never becomes invisible because AI
            did the first step.
          </p>
        </article>
        <article className="card">
          <h2>Visible student reasoning</h2>
          <p>
            Activities keep student thinking visible through predictions, source logs, verification tables,
            error annotations, and revision memos &mdash; and never request hidden chain-of-thought.
          </p>
        </article>
        <article className="card">
          <h2>Critique and verification</h2>
          <p>
            Examining AI output is often more valuable than generating it: students verify citations, find
            omissions, diagnose jurisdiction errors, and compare confidence with evidence &mdash; and learn what
            one example does not prove.
          </p>
        </article>
        <article className="card">
          <h2>Legal-research source integrity</h2>
          <p>
            Authoritative research comes first; students verify that a source exists and supports the
            proposition. Generated legal language is never treated as authoritative research, and citator-level
            claims require an actual citator.
          </p>
        </article>
        <article className="card">
          <h2>Access, no-tool paths, and accessibility</h2>
          <p>
            Every activity includes an equivalent, non-stigmatizing no-tool alternative and is designed for
            accessibility, so tool access never decides who can participate.
          </p>
        </article>
        <article className="card">
          <h2>Debrief and evidence of learning</h2>
          <p>
            Debriefing is part of the activity, and output quality is kept distinct from evidence of learning:
            a polished AI-assisted product is not proof that a student learned.
          </p>
        </article>
        <article className="card">
          <h2>Faculty testing before assigning</h2>
          <p>
            Faculty run the activity from a student&rsquo;s access level first &mdash; checking behavior, variability,
            timing, verification burden, and the no-tool alternative &mdash; before it reaches students.
          </p>
        </article>
        <article className="card">
          <h2>Works with the teaching Skills</h2>
          <p>
            It hands off full course design, lesson sequencing, rubrics, course AI policy, question design,
            accessibility remediation, and reading lists to the dedicated Teaching &amp; Course Design Skills
            rather than duplicating them.
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
            This Skill is in active development; the downloadable ZIP is coming soon. It does not design full
            courses, draft complete AI policy, approve products, grade, adjudicate misconduct, or determine
            whether a student used AI. When current products or Stanford guidance matter, it relies on live
            research.
          </p>
        </article>
      </section>
    </>
  );
}

import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";

export default function LegalSkillsGuideSkill() {
  const skill = getSkill("legal-skills-guide");
  return (
    <>
      <SkillBreadcrumb slug="legal-skills-guide" />
      <p className="eyebrow">SLS Legal Skills &middot; {skill.status} &middot; v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">Not sure which legal helper you need? Start here and get routed to the right one.</p>
      <div className="actions">
        <DownloadButton skill={skill} />
        <a className="secondary" href="/install-chatgpt">Install in ChatGPT</a>
        <a className="secondary" href="/install-claude">Install in Claude</a>
      </div>
      <section className="grid two">
        <article className="card">
          <h2>What it does</h2>
          <p>It asks what you&rsquo;re actually trying to do &mdash; frame a question, read a case, map a doctrine, interpret a statute, trace history, compare jurisdictions, analyze a record or a deal, weigh a professional-responsibility question, stress-test an argument, or verify authority &mdash; and points you to one primary helper and at most one supporting one.</p>
        </article>
        <article className="card">
          <h2>Faculty control &amp; integrity</h2>
          <p>You keep authorship and final judgment; treat every output as a draft for expert review. These Skills support faculty research and teaching only &mdash; never client, clinic, or active-matter work &mdash; never fabricate authority, and never state current law without authoritative, current verification.</p>
        </article>
        <article className="card">
          <h2>Example prompts</h2>
          <ul>
            {skill.usageExamples?.map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h2>Availability</h2>
          <p>This Skill is in active development but available to download now. Use the Download Skill ZIP button above, then follow the ChatGPT or Claude installation guide.</p>
        </article>
      </section>
    </>
  );
}

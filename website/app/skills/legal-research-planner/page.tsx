import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";

export default function LegalResearchPlannerSkill() {
  const skill = getSkill("legal-research-planner");
  return (
    <>
      <SkillBreadcrumb slug="legal-research-planner" />
      <p className="eyebrow">Faculty Research &amp; Scholarship &middot; {skill.status} &middot; v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">Build a legal research trail that holds up — and stays current.</p>
      <div className="actions">
        <DownloadButton skill={skill} />
        <a className="secondary" href="/install-chatgpt">Install in ChatGPT</a>
        <a className="secondary" href="/install-claude">Install in Claude</a>
      </div>
      <section className="grid two">
        <article className="card">
          <h2>What it does</h2>
          <p>It helps you scope jurisdiction and dates, plan primary and secondary sources, track statutes, regulations, cases, administrative materials, legislative history, and dockets, use citators and contrary authority, select the right SLS databases, and keep a documented search and updating log &mdash; with authoritative research before any AI synthesis.</p>
        </article>
        <article className="card">
          <h2>Faculty control &amp; integrity</h2>
          <p>You keep authorship and final judgment; treat every output as a draft for expert review. The Skill never treats AI output as evidence, never fabricates sources, authorities, quotations, or findings, never claims institutional approval, and won&rsquo;t take external actions or submit anything without your explicit authorization.</p>
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

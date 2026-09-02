import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";

export default function ReadingListCuratorSkill() {
  const skill = getSkill("reading-list-and-course-materials-curator");
  return (
    <>
      <SkillBreadcrumb slug="reading-list-and-course-materials-curator" />
      <p className="eyebrow">Teaching &amp; Course Design &middot; {skill.status} &middot; v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">{skill.summary}</p>
      <div className="actions">
        <DownloadButton skill={skill} />
        <a className="secondary" href="/install-chatgpt">Install in ChatGPT</a>
        <a className="secondary" href="/install-claude">Install in Claude</a>
      </div>
      <section className="grid two">
        <article className="card">
          <h2>What it does</h2>
          <p>Builds, verifies, annotates, balances, and maintains course reading lists and instructional resource collections &mdash; weighing coverage, workload, currency, access, and perspective balance.</p>
        </article>
        <article className="card">
          <h2>Faculty control &amp; integrity</h2>
          <p>You keep authorship and final judgment; treat every list as a draft for expert review. It flags outdated, inaccessible, or unverifiable items rather than inventing citations, and never claims a source exists without confirmation.</p>
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

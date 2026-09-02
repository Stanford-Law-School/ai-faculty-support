import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";

export default function PublicWritingAdapterSkill() {
  const skill = getSkill("public-writing-adapter");
  return (
    <>
      <SkillBreadcrumb slug="public-writing-adapter" />
      <p className="eyebrow">Faculty Research &amp; Scholarship &middot; {skill.status} &middot; v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">Take your scholarship to a wider audience without losing the caveats.</p>
      <div className="actions">
        <DownloadButton skill={skill} />
        <a className="secondary" href="/install-chatgpt">Install in ChatGPT</a>
        <a className="secondary" href="/install-claude">Install in Claude</a>
      </div>
      <section className="grid two">
        <article className="card">
          <h2>What it does</h2>
          <p>It helps you reshape completed or well-supported scholarship into an op-ed, briefing, FAQ, presentation, or other short form &mdash; setting message hierarchy, terminology level, examples, and calls to action while preserving evidence, uncertainty, attribution, and the line between your findings and advocacy.</p>
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

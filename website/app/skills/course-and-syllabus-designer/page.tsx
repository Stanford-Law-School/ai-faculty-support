import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";

export default function CourseSkill() {
  const skill = getSkill("course-and-syllabus-designer");
  return <>
      <SkillBreadcrumb slug="course-and-syllabus-designer" /><p className="eyebrow">{skill.status} release · v{skill.version}</p><h1>{skill.name}</h1><p className="lede">{skill.summary}</p><div className="actions"><DownloadButton skill={skill} /><a className="secondary" href="/install-chatgpt">Install in ChatGPT</a><a className="secondary" href="/install-claude">Install in Claude</a></div><section className="grid two"><article className="card"><h2>What it does</h2><p>It asks simple questions about your course, helps organize topics week by week, suggests assignments aligned to learning goals, and can help revise a prior syllabus.</p></article><article className="card"><h2>Faculty control</h2><p>You decide what to keep, change, or discard. Treat output as a draft for expert review, not as a final institutional statement.</p></article></section></>;
}

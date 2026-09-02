import type { Skill } from "../lib/skills";

export function DownloadButton({ skill }: { skill: Skill }) {
  const comingSoon = skill.downloadUrl === "#coming-soon";
  if (comingSoon) {
    return <span className="downloadButton disabled" aria-label={`${skill.name} skill ZIP coming soon`}>Coming soon</span>;
  }
  return (
    <a className="downloadButton" href={skill.downloadUrl} download aria-label={`Download ${skill.name} skill ZIP version ${skill.version}`}>
      Download Skill ZIP
    </a>
  );
}

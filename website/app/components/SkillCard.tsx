import Link from "next/link";
import type { Skill } from "../lib/skills";
import { DownloadButton } from "./DownloadButton";

export function SkillCard({ skill }: { skill: Skill }) {
  const available = skill.downloadUrl.startsWith("/downloads/");
  return (
    <article className="card">
      <span className={`pill ${skill.status === "Pilot" ? "pilot" : available ? "available" : "planned"}`}>
        <span className="dot" />{skill.status} &middot; v{skill.version}
      </span>
      <h2 style={{ marginTop: "0.7rem" }}>{skill.name}</h2>
      <p className="muted">{skill.summary}</p>
      <p style={{ fontSize: "0.9rem" }}><strong>Works with:</strong> {skill.platforms.join(" and ")}</p>
      <div className="actions">
        <DownloadButton skill={skill} />
        <Link className="secondary" href={`/skills/${skill.slug}`}>View details</Link>
      </div>
    </article>
  );
}

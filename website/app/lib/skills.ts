import skills from "../../../releases/skills.json";

export type Skill = {
  name: string;
  slug: string;
  version: string;
  status: string;
  platforms: string[];
  downloadUrl: string;
  summary: string;
  updated: string;
  installationGuides?: { chatgpt: string; claude: string };
  usageExamples?: string[];
};

export function getSkills(): Skill[] {
  return skills as Skill[];
}

export function getSkill(slug: string): Skill {
  const skill = getSkills().find((item) => item.slug === slug);
  if (!skill) throw new Error(`Unknown skill: ${slug}`);
  return skill;
}

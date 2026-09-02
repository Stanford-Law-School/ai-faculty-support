"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getSkills } from "../lib/skills";
import { guideHref, guideSearchText, publishedGuides } from "../lib/guides";
import { orderedTools, toolSearchText } from "../lib/aiTools";
import {
  publishedTutorials,
  tutorialHref,
  tutorialSearchText,
} from "../lib/tutorialLibrary";
import { rankItems } from "../lib/searchRanking";

const pages = [
  { title: "Learn AI", href: "/learn-ai", text: "AI on the Record: five-minute, answer-first faculty guides for responsible and effective AI use in teaching, legal research, and scholarship." },
  { title: "AI Resources", href: "/ai-resources", text: "Training, legal databases, specialty AI tools, Stanford products, and library learning resources." },
  { title: "Tutorial library", href: "/tutorials", text: "Long-form, downloadable tutorials: step-by-step walkthroughs you can keep beside the interface you are configuring." },
  { title: "Education Technology", href: "/education-technology", text: "Classroom, course, and learning technology guidance." },
  { title: "Skill files for faculty work", href: "/skills", text: "Downloadable assistants for ChatGPT and Claude for teaching, AI judgment, research and scholarship, and legal method." },
  { title: "What is a skill file?", href: "/what-is-a-skill-file", text: "Learn how reusable AI instruction files work." },
  { title: "How to use", href: "/how-to-use", text: "Guidance for using faculty AI skills." },
  { title: "Build an AI agent from the skills", href: "/build-an-agent", text: "Module-by-module guide to combining skills into one reusable agent or assistant with a job, limits, and checkpoints." },
  { title: "Build an agent in ChatGPT", href: "/build-an-agent/chatgpt", text: "Upload skills to ChatGPT, create a workspace agent, add starter prompts, preview and publish it." },
  { title: "Install", href: "/install", text: "Install a skill in ChatGPT or Claude." },
  { title: "Troubleshooting", href: "/troubleshooting", text: "Get help with common problems." },
  { title: "About", href: "/about", text: "About this faculty support project." },
];

function SearchResults() {
  const query = useSearchParams().get("q")?.trim() ?? "";
  const needle = query.toLowerCase();
  const skills = getSkills().map((skill) => ({ title: skill.name, href: `/skills/${skill.slug}`, text: skill.summary }));
  // Only published guides are indexed, so planned slugs never surface as results.
  // `text` is what a result card shows; `terms` is what it matches on, so extra
  // vocabulary (FERPA, NotebookLM, PHI) is findable without appearing as
  // keyword-stuffed visible copy.
  // The teaching guide and the concern checklist share vocabulary on purpose:
  // "student used AI" is what a worried faculty member types, and it is also what
  // the teaching guide is about. `intent` lets app/lib/searchRanking.ts separate
  // them by what the query is actually asking for rather than by document order.
  const learnAiGuides = publishedGuides().map((guide) => ({
    title: guide.title,
    href: guideHref(guide.slug),
    text: guide.summary,
    terms: guideSearchText(guide),
    intent:
      guide.kind === "process-resource"
        ? ("concern" as const)
        : guide.slug === "students-use-ai-and-learn-law"
          ? ("teaching" as const)
          : undefined,
  }));
  // Tutorials are long documents, so they match on their contents and outcomes
  // as well as their summary: someone searching "moot court judge" or "project
  // knowledge" is looking for a section inside one.
  const tutorialItems = publishedTutorials().map((tutorial) => ({
    title: tutorial.title,
    href: tutorialHref(tutorial.slug),
    text: tutorial.summary,
    terms: tutorialSearchText(tutorial),
  }));
  // Tools are findable by current name, former name, or provider. They route to
  // the AI Resources directory, which is where their card lives.
  const tools = orderedTools()
    .filter((tool) => tool.visibleOnAiResources)
    .map((tool) => ({
      title: tool.displayName,
      href: "/ai-resources",
      text: tool.conciseDescription,
      terms: toolSearchText(tool),
    }));
  const all = [...pages, ...learnAiGuides, ...tutorialItems, ...tools, ...skills];
  const results = needle ? rankItems(all, needle) : [];
  return <>
    <p className="eyebrow">Site search</p><h1>Search results</h1>
    <p className="lede">{query ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”` : "Enter a search term in the navigation above."}</p>
    <section className="grid two" aria-live="polite">
      {results.map((item) => <Link className="card" href={item.href} key={item.href}><h2>{item.title}</h2><p className="muted">{item.text}</p><span className="explore">Open &rarr;</span></Link>)}
    </section>
    {query && results.length === 0 && <section className="card"><h2>No matches yet</h2><p>Try a broader term such as “teaching,” “research,” or “technology.”</p></section>}
  </>;
}

export default function SearchPage() {
  return <Suspense fallback={<p className="lede">Loading search results&hellip;</p>}><SearchResults /></Suspense>;
}

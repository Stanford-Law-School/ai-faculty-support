import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Install a skill — SLS Faculty AI Skills",
  description:
    "Choose your platform and follow a short, illustrated guide to add an SLS Faculty AI skill to ChatGPT or Claude.",
};

export default function Install() {
  return (
    <>
      <p className="eyebrow">Installation</p>
      <h1>Add a skill to your AI assistant</h1>
      <p className="lede">
        Pick the assistant you use. Each guide walks you through it once, with a short screen
        recording &mdash; after that, the skill is ready whenever you need it.
      </p>

      <section className="grid two" style={{ marginTop: "1.4rem" }}>
        <Link className="card interactive" href="/install-chatgpt">
          <p className="eyebrow" style={{ color: "var(--link)" }}>For ChatGPT</p>
          <h2 style={{ fontSize: "1.5rem" }}>Install in ChatGPT</h2>
          <p className="muted">
            Add the skill ZIP once to a ChatGPT workspace or custom GPT, then call it across
            chats. Includes a screen recording.
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: "var(--link)" }}>Open the ChatGPT guide &rarr;</p>
        </Link>

        <Link className="card interactive" href="/install-claude">
          <p className="eyebrow" style={{ color: "var(--link)" }}>For Claude</p>
          <h2 style={{ fontSize: "1.5rem" }}>Install in Claude</h2>
          <p className="muted">
            Upload the skill ZIP to the Claude project or skill area and start using it in plain
            language. Includes a screen recording.
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: "var(--link)" }}>Open the Claude guide &rarr;</p>
        </Link>
      </section>

      <section className="card">
        <h2>First time here?</h2>
        <p className="muted" style={{ maxWidth: "68ch" }}>
          If &ldquo;skill ZIP&rdquo; and &ldquo;.md file&rdquo; are new to you, the two-minute explainer covers
          what these files are and why you never have to open one.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <Link className="secondary" href="/what-is-a-skill-file">What&apos;s a skill file?</Link>
          <Link className="secondary" href="/skills">Browse the skills</Link>
        </div>
      </section>

      <section className="card">
        <p className="eyebrow">After your first install</p>
        <h2>Combine several skills into one agent</h2>
        <p className="muted" style={{ maxWidth: "68ch" }}>
          Installing a skill gives the AI a method. Building an <strong>agent</strong> gives it a job: one named
          assistant holding three to five skills, with clear limits and checkpoints, so you stop picking a skill
          for every request.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <Link className="secondary" href="/build-an-agent">Open the agent guide</Link>
        </div>
      </section>
    </>
  );
}

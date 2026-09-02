import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What's a skill file? — SLS Faculty AI Skills",
  description:
    "A plain-English explanation of Markdown (.md) files and the skill packages on this site — what they are, what they do, and why you never need to open one.",
};

export default function WhatIsASkillFile() {
  return (
    <>
      <p className="eyebrow">Plain-English explainer</p>
      <h1>What&rsquo;s a &ldquo;.md file,&rdquo; really?</h1>
      <p className="lede">
        You&rsquo;ll see the phrase &ldquo;Markdown&rdquo; or &ldquo;.md file&rdquo; around these skills.
        Here&rsquo;s the whole idea in one sentence, then a little more if you&rsquo;re curious.
        No technical background needed.
      </p>

      <section className="card">
        <h2>The one-sentence version</h2>
        <p style={{ fontSize: "1.15rem", margin: 0 }}>
          A <strong>.md file is just a plain text document</strong> &mdash; like a page of notes &mdash; that
          uses a few simple marks (a <code>#</code> for a heading, a <code>-</code> for a bullet) so both
          people and computers can read its structure easily.
        </p>
      </section>

      <section>
        <p className="eyebrow">A familiar comparison</p>
        <h2>Think of a recipe card</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>A recipe card</h3>
            <p className="muted">
              A title, a list of ingredients, then numbered steps. The layout itself tells you what
              each part is &mdash; you don&rsquo;t need it explained.
            </p>
          </article>
          <article className="card">
            <h3>A Markdown file</h3>
            <p className="muted">
              Exactly the same idea for a computer: a heading marked with <code>#</code>, ingredients
              marked as a bulleted list, steps as a numbered list. Simple marks, clear structure.
            </p>
          </article>
        </div>
      </section>

      <section>
        <p className="eyebrow">See it side by side</p>
        <h2>What you type &rarr; what it becomes</h2>
        <div className="md-demo" style={{ marginTop: "1rem" }}>
          <div className="md-source">
            <p className="eyebrow" style={{ color: "var(--muted)" }}>The plain text (.md)</p>
            <pre>
{`# `}<span className="tok-h">Office Hours Policy</span>{`

Students may bring `}<span className="tok-b">**one page of notes**</span>{`.

Bring questions about:

`}<span className="tok-m">-</span>{` the midterm
`}<span className="tok-m">-</span>{` the final paper
`}<span className="tok-m">-</span>{` reading you found confusing`}
            </pre>
          </div>
          <div className="md-rendered">
            <p className="eyebrow" style={{ color: "var(--muted)" }}>How it reads</p>
            <h4>Office Hours Policy</h4>
            <p>Students may bring <strong>one page of notes</strong>.</p>
            <p style={{ marginBottom: "0.2rem" }}>Bring questions about:</p>
            <ul>
              <li>the midterm</li>
              <li>the final paper</li>
              <li>reading you found confusing</li>
            </ul>
          </div>
        </div>
        <p className="muted" style={{ marginTop: "0.8rem" }}>
          That&rsquo;s the entire trick: a <code>#</code> makes a heading, <code>**stars**</code> make bold text,
          and dashes make a list. Nothing else to learn.
        </p>
      </section>

      <section>
        <p className="eyebrow">Why it matters here</p>
        <h2>What a skill file actually does</h2>
        <p className="lede" style={{ fontSize: "1.1rem" }}>
          The skills on this site are written in Markdown. Each one is a carefully structured set of
          instructions that <strong>teaches ChatGPT or Claude how to help with one specific teaching task</strong>.
        </p>
        <div className="grid" style={{ marginTop: "1.2rem" }}>
          <article className="card">
            <h3>It gives the AI expertise</h3>
            <p className="muted">
              Instead of a blank, generic assistant, you get one that already knows how a good law
              syllabus, rubric, or class plan is built &mdash; and what questions to ask you first.
            </p>
          </article>
          <article className="card">
            <h3>It keeps things consistent</h3>
            <p className="muted">
              The same skill produces the same high standard every time, so you&rsquo;re not re-explaining
              your expectations in every new chat.
            </p>
          </article>
          <article className="card">
            <h3>It stays in your control</h3>
            <p className="muted">
              The skill drafts and suggests; you decide. It&rsquo;s built to preserve faculty judgment, not
              replace it, and it won&rsquo;t invent legal authorities.
            </p>
          </article>
        </div>
      </section>

      <section className="card">
        <h2>The part that surprises people</h2>
        <p style={{ maxWidth: "72ch" }}>
          <strong>You never have to open, read, or edit the file.</strong> On this site a skill is delivered
          as a small <code>.zip</code> package (the <code>.md</code> instructions plus a few supporting files).
          Your only job is to download it and upload it to ChatGPT or Claude once. The AI reads the Markdown;
          you just talk to the assistant in plain English.
        </p>
        <p className="note" style={{ marginTop: "1rem" }}>
          Analogy: it&rsquo;s like handing a new research assistant a great training manual. You don&rsquo;t read the
          manual aloud &mdash; you hand it over once, and from then on they already know how you like the work done.
        </p>
      </section>

      <section>
        <h2>Ready to try one?</h2>
        <div className="actions" style={{ marginTop: "0.4rem" }}>
          <Link className="primary" href="/skills">Browse the skills</Link>
          <Link className="secondary" href="/how-to-use">How to use them</Link>
          <Link className="secondary" href="/install-claude">Install in Claude</Link>
          <Link className="secondary" href="/install-chatgpt">Install in ChatGPT</Link>
        </div>
        <p className="muted" style={{ marginTop: "1rem", marginBottom: 0 }}>
          Already using one or two? The next step is combining several into an <strong>agent</strong> &mdash; a
          named assistant with one job. <Link href="/build-an-agent">See the agent guide</Link>.
        </p>
      </section>
    </>
  );
}

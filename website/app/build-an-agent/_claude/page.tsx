import Link from "next/link";
import type { Metadata } from "next";
import {
  DocMeta,
  DocNav,
  DocToc,
  DoneWhen,
  MediaPlaceholder,
  Module,
  PromptBlock,
} from "../../components/GuideBlocks";

export const metadata: Metadata = {
  title: "Build an agent in Claude Cowork — SLS Faculty AI Skills",
  description:
    "Track B of the SLS faculty agent guide: switch on your skills in Claude, give the work a folder and a standing instructions file, and run a real course-design task in Cowork.",
};

const standingInstructions = `# Faculty Course Design Studio — standing instructions

## The job
Help me develop and revise courses, class sessions, assessments, rubrics, reading plans, Socratic questions, and course AI policies. Work only on course design and teaching materials.

## Which method to use
Use the SLS teaching skills that are switched on when their processes match what I have asked for. Decide which one fits; do not ask me to name a skill.

## How to work with me
Ask only for information that would materially change the work. State any significant assumption you had to make. Distinguish your suggestions from my decisions.

For anything substantial, work in stages. Present the current stage, name the decisions that need my approval, and wait before continuing. Do not deliver an entire course package at once.

Save drafts as separate, clearly named files in this folder. Never overwrite a file I have already edited; create a new version instead.

## Never
Do not invent sources, authorities, university policies, quotations, or assigned readings. When something must be verified, say plainly what needs checking.
Do not present anything as official Stanford or Stanford Law School policy. Flag language that could be mistaken for it.
Do not process client information, clinic matters, confidential student information, or active legal matters.`;

const seminarTask = `Read the standing instructions in this folder first.

I am developing a ten-week, upper-level seminar called AI, Legal Research, and Professional Judgment. Enrollment will be about 18 students. Students will complete two short practical exercises and a final policy memorandum. I want students to use AI in limited and transparent ways, but the course should reinforce independent research, verification, and professional judgment.

Begin by proposing four to six learning objectives and a high-level course arc, and save them as a Word document in this folder. Do not draft the complete syllabus yet. Tell me which major decisions require my input.`;

const projectInstructions = `You help me develop and revise courses, class sessions, assessments, rubrics, reading plans, Socratic questions, and course AI policies.

Use the SLS teaching skills when their processes match my request, and decide which one fits rather than asking me to name it.

Ask only for information that materially changes the work. State significant assumptions. Distinguish suggestions from decisions.

For substantial projects, work in stages: present the current stage, name the decisions needing my approval, and wait before continuing.

Never invent sources, authorities, university policies, quotations, or assigned readings; say plainly what must be verified. Never present anything as official Stanford policy. Never process client information, clinic matters, confidential student information, or active legal matters.`;

export default function BuildAnAgentClaude() {
  return (
    <div className="docPage">
      <p className="eyebrow">
        <Link href="/build-an-agent">Build an agent</Link> &middot; Track B
      </p>
      <h1>Build it in Claude Cowork</h1>
      <p className="lede">
        Claude does not have a single &ldquo;make an agent&rdquo; button, and once you see why, the alternative is
        easier to understand. You give the work a folder, leave a standing memo inside it, and switch on the
        skills. Claude reads the memo before every task in that folder &mdash; which is all an agent ever was.
      </p>

      <DocMeta
        rows={[
          { label: "Track", value: "B · Claude · Modules 4–7" },
          { label: "Before you start", value: <>Modules 1–3 of the <Link href="/build-an-agent">main guide</Link></> },
          { label: "You will need", value: "Your three to five skill ZIP files, and the Claude app with Cowork available on your account" },
          { label: "Time", value: "About 30 minutes" },
          { label: "If you do not have Cowork", value: <a href="#projects">Use a Claude Project instead</a> },
          { label: "Last reviewed", value: <em>[date to be added]</em> },
        ]}
      />

      <DocToc
        items={[
          { id: "what-cowork-is", label: "First: what Cowork changes" },
          { id: "add-skills", label: "Module 4. Switch on your skills" },
          { id: "folder-and-memo", label: "Module 5. Give the work a folder and a standing memo" },
          { id: "first-task", label: "Module 6. Run the first real task" },
          { id: "reusable", label: "Module 7. Make it reusable" },
          { id: "projects", label: "Alternative: no Cowork? Use a Project" },
          { id: "next", label: "Next: Part 3 of the main guide" },
        ]}
      />

      <section id="what-cowork-is">
        <p className="eyebrow">Orientation</p>
        <h2>What Cowork changes</h2>
        <p>
          An ordinary Claude conversation is advice across a desk. You describe the problem, Claude answers, and
          you copy the useful parts somewhere else. <strong>Cowork</strong> is the same assistant, sitting at the
          filing cabinet: you point it at a folder on your computer and it opens what is there and puts real
          documents back &mdash; a Word file, a PDF, a spreadsheet &mdash; asking permission as it goes.
        </p>
        <p>
          So a Claude agent is assembled from three plain parts. None of them is technical:
        </p>
        <div className="grid" style={{ marginTop: "1.2rem" }}>
          <article className="card">
            <p className="eyebrow">Part one</p>
            <h3>The skills</h3>
            <p className="muted" style={{ margin: 0 }}>
              The methods, switched on in the <strong>Customize</strong> panel. Claude reaches for one when your
              request matches it.
            </p>
          </article>
          <article className="card">
            <p className="eyebrow">Part two</p>
            <h3>A folder</h3>
            <p className="muted" style={{ margin: 0 }}>
              One folder for this job &mdash; say <code>AI Seminar 2027</code>. Its contents are the context, and
              its contents are where finished drafts land.
            </p>
          </article>
          <article className="card">
            <p className="eyebrow">Part three</p>
            <h3>A standing memo</h3>
            <p className="muted" style={{ margin: 0 }}>
              A small file inside the folder holding the job description and the limits. Claude reads it before
              every task there. This is the agent.
            </p>
          </article>
        </div>
        <div className="note" style={{ marginTop: "1.2rem" }}>
          <p>
            <strong>Availability.</strong> Cowork is part of the paid Claude apps and has been rolling out across
            plans and platforms, so what you see depends on your account. If there is no Cowork tab, use the{" "}
            <a href="#projects">Project route</a> at the bottom of this page &mdash; it gets you most of the way
            &mdash; and ask us what your account includes:{" "}
            <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>.
          </p>
        </div>
      </section>

      <Module n="4" id="add-skills" title="Switch on your skills" minutes="10 minutes">
        <p>
          Skills live in one place in Claude and are available everywhere you work &mdash; ordinary chats,
          Projects, and Cowork tasks.
        </p>

        <div className="steps">
          <div className="step">
            <h3>1. Open Customize</h3>
            <p>
              In the Claude app, open the <strong>Cowork</strong> tab, then open{" "}
              <strong>Customize</strong> in the left sidebar. Customize is the one panel holding your skills,
              plugins, and connectors.
            </p>
          </div>
          <div className="step">
            <h3>2. Go to Skills and upload</h3>
            <p>
              Open the <strong>Skills</strong> section and use the upload option to add a skill ZIP from this
              site. Repeat for each of your three to five skills. Do not unzip them.
            </p>
          </div>
          <div className="step">
            <h3>3. Check that each one is switched on</h3>
            <p>
              Skills appear in a list with a toggle. On means Claude may use it when it is relevant; off means it
              is shelved. Leave your chosen skills on and everything else off while you are learning what changed.
            </p>
          </div>
        </div>

        <MediaPlaceholder
          kind="screenshot"
          id="CLAUDE-04-A"
          title="Customize in the sidebar, with the Skills list open"
          shows="Where Customize sits in the Cowork sidebar, the Skills section, and the upload control."
        />

        <MediaPlaceholder
          kind="screenshot"
          id="CLAUDE-04-B"
          title="Five SLS skills installed and toggled on"
          shows="The finished list, including the built-in document skills, so faculty can tell theirs apart from Claude's own."
        />

        <p className="muted">
          Claude also ships with its own skills for Word, PDF, PowerPoint, and Excel files. Leave them on. They
          are why &ldquo;save this as a Word document&rdquo; simply works, and they cooperate with the SLS skills
          rather than competing with them.
        </p>

        <div className="caution">
          <p>
            <strong>No Skills section, or no upload option?</strong> Some accounts have skills provisioned by an
            administrator instead, and some plans do not include uploading. That is a permissions setting, not a
            mistake on your part. Ask us:{" "}
            <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>.
          </p>
        </div>

        <DoneWhen
          items={[
            "Each skill you chose appears in the Skills list and is switched on.",
            "You know where the Customize panel is without hunting for it.",
          ]}
        />
      </Module>

      <Module n="5" id="folder-and-memo" title="Give the work a folder and a standing memo" minutes="10 minutes">
        <p>
          This module is the agent. It takes two steps and no special software.
        </p>

        <h3>Step one: make the folder</h3>
        <p>
          On your computer, create a folder for this job &mdash; for example{" "}
          <code>AI Seminar 2027</code> &mdash; and put anything useful inside: last year&rsquo;s syllabus, a
          reading list, notes, a course description. Nothing confidential, and nothing about a client, a clinic
          matter, or an identifiable student.
        </p>
        <div className="caution">
          <p>
            <strong>Work in a copy at first.</strong> Cowork creates, renames, and moves real files. Until you
            have seen how it behaves, point it at a duplicate of the folder rather than the only copy of anything
            you care about.
          </p>
        </div>

        <h3>Step two: leave the memo inside</h3>
        <p>
          Create a plain text file in that folder named <code>claude.md</code> and paste the text below into it.
          (<code>.md</code> is just a text file &mdash; see{" "}
          <Link href="/what-is-a-skill-file">the two-minute explainer</Link> if that is new. TextEdit, Notepad, or
          any editor will do; save it as plain text, not rich text.)
        </p>
        <p>
          Claude reads this file before every task it runs in this folder. It is the standing memo taped inside the
          file drawer: the job, the methods to use, how to work with you, and what is never allowed.
        </p>

        <PromptBlock
          label="Save this as claude.md inside your folder"
          text={standingInstructions}
          after={
            <>
              Edit it freely &mdash; this is your job description, not a template to respect. The four headings
              are what matter: the job, which method, how to work with me, and never.
            </>
          }
        />

        <MediaPlaceholder
          kind="screenshot"
          id="CLAUDE-05-A"
          title="A course folder with claude.md sitting alongside the course materials"
          shows="The folder in Finder or File Explorer with the instructions file and a few real course files, plus the file open in a plain text editor."
        />

        <p className="muted">
          There is also a workspace-wide set of instructions you can set once for every Cowork task, wherever it
          runs. Save that for standing rules that are true of all your work &mdash; how you like documents named,
          for instance, or that nothing confidential is ever in play. Keep the job description itself in the
          folder, with the job.
        </p>

        <DoneWhen
          items={[
            "A folder exists for this course, with a copy of any prior materials in it.",
            "A file named claude.md sits inside it, holding the job and the limits.",
            "Nothing confidential is in that folder.",
          ]}
        />
      </Module>

      <Module n="6" id="first-task" title="Run the first real task" minutes="15 minutes">
        <p>
          Open the <strong>Cowork</strong> tab, start a new task, and choose the folder you just made. Then paste
          a real request &mdash; not a warm-up.
        </p>

        <PromptBlock label="Your first task" text={seminarTask} />

        <p>Three things are worth watching as it works.</p>
        <div className="grid" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>Which method it reaches for</h3>
            <p className="muted" style={{ margin: 0 }}>
              It should approach this as course design, not leap to a rubric or a policy. If you are unsure, ask
              it afterwards which skill governed the answer.
            </p>
          </article>
          <article className="card">
            <h3>Where it asks permission</h3>
            <p className="muted" style={{ margin: 0 }}>
              Cowork asks before acting on your files. Read those requests instead of clicking through them; they
              are the clearest picture you will get of what it is actually doing.
            </p>
          </article>
          <article className="card">
            <h3>Whether it stops</h3>
            <p className="muted" style={{ margin: 0 }}>
              The memo told it to present the objectives and wait. If a full syllabus appears anyway, the
              instructions need to be firmer &mdash; and that is useful to learn now.
            </p>
          </article>
        </div>

        <p style={{ marginTop: "1.2rem" }}>
          When it finishes, open the folder. There should be a new document in it. That is the difference between
          Cowork and a chat: the work is filed, not pasted.
        </p>
        <p>
          Now continue in the same task with the follow-up requests from{" "}
          <Link href="/build-an-agent#test-it">Module 8 of the main guide</Link> &mdash; the AI policy, the
          assessment and rubric, the Socratic sequence, the accessibility review. Watch it change methods while
          keeping the objectives you approved.
        </p>

        <MediaPlaceholder
          kind="recording"
          id="CLAUDE-06-A"
          title="A Cowork task from start to finished document"
          shows="Choosing the folder, pasting the seminar request, the permission prompts, the pause for approval, and the Word document appearing in the folder."
        />

        <DoneWhen
          items={[
            "A real document produced by Claude is sitting in your folder.",
            "You approved at least one step before it happened.",
            "It stopped for your approval instead of drafting the whole course.",
          ]}
        />
      </Module>

      <Module n="7" id="reusable" title="Make it reusable" minutes="5 minutes">
        <p>
          You already have a reusable agent. Opening a new Cowork task on that folder gives you the same
          assistant, with the same job, the same methods, and the same limits &mdash; no rebuilding. Three small
          habits make it durable:
        </p>

        <div className="steps">
          <div className="step">
            <h3>Improve the memo instead of repeating yourself</h3>
            <p>
              Every time you find yourself correcting the same thing (&ldquo;shorter&rdquo;; &ldquo;always give me
              a Word file&rdquo;; &ldquo;never propose readings I have not approved&rdquo;), add a line to{" "}
              <code>claude.md</code>. This is how an agent gets better: your corrections stop being conversation
              and become policy.
            </p>
          </div>
          <div className="step">
            <h3>One folder per job</h3>
            <p>
              A second course gets a second folder with its own memo. Copy the memo across and change the details.
              Resist one giant &ldquo;Teaching&rdquo; folder for everything &mdash; that is the too-broad agent
              from Module 2 wearing a different hat.
            </p>
          </div>
          <div className="step">
            <h3>Share it by sharing the folder</h3>
            <p>
              A colleague who copies your folder &mdash; memo included &mdash; and switches on the same skills has
              your agent. Nothing to export or publish.
            </p>
          </div>
        </div>

        <h3>Three things you can ignore for now</h3>
        <p>
          Claude offers more machinery than a first agent needs. So you recognize the words when you meet them:
        </p>
        <div className="tableScroll">
        <table>
          <thead>
            <tr>
              <th scope="col">You will see</th>
              <th scope="col">What it is</th>
              <th scope="col">Need it now?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Plugins</strong></td>
              <td>A bundle that installs several skills, connectors, and helpers in one step, in the Customize panel.</td>
              <td className="muted">No. Uploading your own skills is the point of this guide.</td>
            </tr>
            <tr>
              <td><strong>Connectors</strong></td>
              <td>Links to other systems &mdash; email, cloud storage, calendars &mdash; authorized once, then usable in any task.</td>
              <td className="muted">No. Add none until you trust the basics; read-only first when you do.</td>
            </tr>
            <tr>
              <td><strong>Sub-agents</strong></td>
              <td>Helpers Claude can hand a slice of a job to, each with its own instructions. A Cowork-only feature.</td>
              <td className="muted">No. Useful for long, repetitive projects; irrelevant to a first course agent.</td>
            </tr>
          </tbody>
        </table>
        </div>

        <MediaPlaceholder
          kind="screenshot"
          id="CLAUDE-07-A"
          title="The Customize panel: skills, plugins, and connectors side by side"
          shows="The three sections in one view, with a note on which one faculty need for this guide and which they can leave alone."
        />

        <DoneWhen
          items={[
            "You have added at least one correction to claude.md rather than repeating it.",
            "You can reopen the agent by starting a task on the folder.",
            "You have decided that no connectors are switched on for now.",
          ]}
        />
      </Module>

      <section className="card" id="projects">
        <p className="eyebrow">Alternative path</p>
        <h2 style={{ fontSize: "1.4rem" }}>No Cowork? Use a Claude Project</h2>
        <p style={{ maxWidth: "72ch" }}>
          A <strong>Project</strong> is a saved workspace inside ordinary Claude: it holds standing instructions
          and files, and every conversation you start in it inherits both. You give up the filing &mdash; Claude
          will not write documents into a folder on your computer &mdash; but you keep the part that matters most:
          one job, stated once, with your skills available.
        </p>
        <ol>
          <li>Create a project and name it for the job, such as <em>Course Design Studio</em>.</li>
          <li>Paste the instructions below into the project&rsquo;s instructions or custom-instructions field.</li>
          <li>Upload prior materials &mdash; last year&rsquo;s syllabus, a reading list &mdash; to the project.</li>
          <li>Start every course-design conversation inside the project rather than in a blank chat.</li>
        </ol>
        <PromptBlock label="Project instructions" text={projectInstructions} />
        <MediaPlaceholder
          kind="screenshot"
          id="CLAUDE-07-B"
          title="A Claude Project with instructions and course files"
          shows="The project screen, the instructions field filled in, and uploaded prior materials."
        />
      </section>

      <section className="card" id="next">
        <p className="eyebrow">You are two-thirds of the way</p>
        <h2 style={{ fontSize: "1.4rem" }}>Next: make it trustworthy</h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          Part 3 of the main guide is the part that matters most: testing it like a skeptic, making it show its
          work, writing down the boundaries, and adapting the pattern to research and legal-method agents.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <Link className="primary" href="/build-an-agent#part-3">Go to Part 3</Link>
          <Link className="secondary" href="/build-an-agent#troubleshooting">Troubleshooting</Link>
          <Link className="secondary" href="/build-an-agent/chatgpt">Also build it in ChatGPT</Link>
        </div>
      </section>

      <p className="muted" style={{ fontSize: "0.9rem" }}>
        Anthropic documents skills, Cowork, and plugins in its help center at{" "}
        <a href="https://support.claude.com/" target="_blank" rel="noopener noreferrer">support.claude.com</a>.
        Features here move quickly; where the app and this page disagree, trust the app and tell us so we can
        update the guide.
      </p>

      <DocNav
        prev={{ href: "/build-an-agent", label: "Main guide" }}
        next={{ href: "/build-an-agent#part-3", label: "Part 3: use it well" }}
      />
    </div>
  );
}

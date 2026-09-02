import Link from "next/link";
import type { Metadata } from "next";
import {
  DocMeta,
  DocNav,
  DocToc,
  DoneWhen,
  FileDownload,
  MediaPlaceholder,
  Module,
  PromptBlock,
} from "../../components/GuideBlocks";

export const metadata: Metadata = {
  title: "Build an agent in ChatGPT — SLS Faculty AI Skills",
  description:
    "Part 2 of the SLS faculty agent guide: upload your skills to ChatGPT, create a Workspace Agent with the right job and limits, add starter prompts, test it, and publish it.",
};

const builderRequest = `Create a Workspace Agent named Faculty Course Design Studio.

Its job is to help law faculty develop and revise courses, class sessions, assessments, rubrics, reading plans, Socratic questions, and course AI policies.

The Agent should use the attached SLS Teaching & Course Design Skills when their processes match the faculty member's request. It should decide which Skill is relevant rather than requiring the user to name one.

The Agent should ask only for information that materially affects the work. It should state significant assumptions, preserve faculty judgment, and distinguish suggestions from decisions.

It must not invent sources, authorities, university policies, quotations, or assigned readings. When verification is required, it should clearly identify what must be checked.

It should not process client information, clinic matters, confidential student information, or active legal matters.

Outputs should be organized, editable, and ready for faculty review. For larger projects, the Agent should work in stages and pause at meaningful approval points rather than producing an entire course package at once.`;

// The instructions given to the agent shown in the recordings on this page.
const exampleInstructions = `This agent helps me design and revise a course that prepares law students and legal professionals to understand, evaluate, and use artificial intelligence responsibly.

It should use the attached skills when their processes match my request and decide which process fits rather than requiring me to name a skill.

It must not invent legal authorities, assigned readings, research findings, technical claims, or Stanford policies. It must not process client information, clinic matters, confidential student information, or active legal matters.

For substantial projects, it should work in stages, identify the decisions that require my judgment, and wait for approval before continuing.`;

const starterDevelop = `Help me turn a course idea into a proposed course structure. Ask for the essential context first, and stop for approval before drafting a full syllabus.`;

const starterPlanClass = `Help me plan a 90-minute class on a difficult concept. Include learning goals, an opening activity, discussion questions, and a closing synthesis.`;

const starterPolicy = `Help me develop a course AI policy that distinguishes permitted, restricted, and prohibited uses. Identify decisions I still need to make.`;

const starterAssessment = `Design an assessment aligned with my learning objectives, and then create a draft rubric that makes the evaluation criteria visible to students.`;

const mentionExample = `@Faculty Course Design Studio Help me revise a class activity that is taking students too long to complete.`;

export default function BuildAnAgentChatGPT() {
  return (
    <div className="docPage">
      <p className="eyebrow">
        <Link href="/build-an-agent">Build an agent</Link> &middot; Part 2
      </p>
      <h1>Build it in ChatGPT</h1>
      <p className="lede">
        ChatGPT gives you an agent builder: you describe the job in plain English, attach the skills you chose,
        add a few example prompts, and test it before anyone else sees it. Four modules, about half an hour.
      </p>

      <DocMeta
        rows={[
          { label: "Part", value: "2 · ChatGPT · Modules 4–7" },
          { label: "Before you start", value: <>Modules 1–3 of the <Link href="/build-an-agent">main guide</Link></> },
          { label: "You will need", value: "Your three to five skill ZIP files, and a ChatGPT account that allows uploaded skills" },
          { label: "Time", value: "About 30 minutes" },
          { label: "Last reviewed", value: <em>[date to be added]</em> },
        ]}
      />

      <DocToc
        items={[
          { id: "upload-skills", label: "Module 4. Add your skills to ChatGPT" },
          { id: "create-agent", label: "Module 5. Create the agent" },
          { id: "attach-and-prompts", label: "Module 6. Attach the skills and add starter prompts" },
          { id: "preview-publish", label: "Module 7. Preview, then publish" },
          { id: "next", label: "Next: Part 3 of the main guide" },
        ]}
      />

      <div className="note">
        <p>
          <strong>A word about menus.</strong> ChatGPT&rsquo;s layout changes every few months, and workspaces
          differ. The <em>sequence</em> below is stable even when a button moves: install the skills, describe the
          job, attach the skills, add examples, test, publish. If a name here does not match what you see, look
          for the nearest equivalent and keep going &mdash; or email{" "}
          <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a> and we will walk through it with
          you.
        </p>
      </div>

      <Module n="4" id="upload-skills" title="Add your skills to ChatGPT" minutes="10 minutes">
        <p>
          A skill has to exist in ChatGPT before an agent can use it. You upload each one once; after that it is
          available to every agent and chat you build.
        </p>

        <div className="steps">
          <div className="step">
            <h3>1. Open the skills area</h3>
            <p>
              In the ChatGPT sidebar, open <strong>Plugins</strong>, then choose the <strong>Skills</strong> tab.
              This is the shelf where your methods live.
            </p>
          </div>
          <div className="step">
            <h3>2. Choose Create, then upload</h3>
            <p>
              Select <strong>Create</strong>, then <strong>Upload from your computer</strong>, and choose the
              first skill ZIP you downloaded. Repeat for each one. Do not unzip the files.
            </p>
          </div>
          <div className="step">
            <h3>3. Wait for the check to finish</h3>
            <p>
              Uploaded skills are scanned before they become available, so there may be a short pause. This is
              worth knowing in general: a skill can contain instructions, files, and code, so only install skills
              from a source you trust. These come from the Robert Crown Law Library.
            </p>
          </div>
        </div>

        <div className="caution">
          <p>
            <strong>No Skills tab, or no upload option?</strong> Your workspace administrator may not have enabled
            skills for your role. That is a permissions setting, not something you did wrong. Ask your
            administrator, or write to <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>.
          </p>
        </div>

        <DoneWhen
          items={[
            "Each skill you chose appears in your skills list.",
            "You have not unzipped anything.",
          ]}
        />
      </Module>

      <Module n="5" id="create-agent" title="Create the agent" minutes="10 minutes">
        <p>
          Now the hiring conversation. In the sidebar, open <strong>Agents</strong> and select{" "}
          <strong>Create</strong>. ChatGPT will offer to build the agent from a description, or let you start
          blank and fill in the fields yourself. Take the description route &mdash; it is faster and you can edit
          everything afterwards.
        </p>
        <p>
          Paste the request below. It is the job description from Module 2, written out in full for our example
          agent. Notice how much of it is about limits and stopping points: that is deliberate.
        </p>

        <PromptBlock
          label="Paste this into the agent builder"
          text={builderRequest}
          after={
            <>
              Building a different agent? Keep the shape &mdash; name, job, use the attached skills, ask only what
              matters, never invent sources, never touch confidential matters, work in stages &mdash; and swap the
              subject matter.
            </>
          }
        />

        <p>
          ChatGPT will show you a proposed plan before it builds anything. Read it with one question in mind:{" "}
          <em>is this still a course-design agent, or has it quietly become a general faculty assistant?</em> If
          the plan has drifted, say so in plain language (&ldquo;narrow this to course design; remove the general
          research and email help&rdquo;) and let it revise. Then confirm.
        </p>

        <h3>What this looked like when we did it</h3>
        <p>
          The recordings on this page build a real agent of ours &mdash;{" "}
          <strong>Understanding AI for Legal Professionals Course Design Studio</strong> &mdash; so you can watch
          the shape of the whole thing before trying your own. It is a different subject from the example above,
          which is rather the point: the skeleton does not change. Here are the exact instructions it was given.
        </p>

        <PromptBlock label="The instructions behind the recordings" text={exampleInstructions} />

        <p>
          Read those four paragraphs against the ones you are about to paste. A job, the attached skills and the
          freedom to choose among them, a list of things it must never invent or touch, and an instruction to stop
          where judgment is required. Everything else is subject matter.
        </p>

        <MediaPlaceholder
          kind="recording"
          id="GPT-05-A"
          title="Creating the agent, start to finish"
          src="/media/build-an-agent/chatgpt_agent_create-an_agent.mp4"
          shows="Just over three minutes in the ChatGPT Agents area, building the example agent from the instructions above."
        />

        <DoneWhen
          items={[
            "An agent named Faculty Course Design Studio (or your own name for it) exists.",
            "Its stated job is specific enough that you would not open it for unrelated work.",
          ]}
        />
      </Module>

      <Module n="6" id="attach-and-prompts" title="Attach the skills and add starter prompts" minutes="10 minutes">
        <p>
          Describing the job is not the same as handing over the manuals. Find the{" "}
          <strong>Skills</strong> section in the agent builder and add the skills you installed in Module 4. You
          can create a new skill here, upload a file, or select one already available to you.
        </p>
        <p>For our example, attach the five that cover:</p>
        <ul>
          <li>Course and syllabus design</li>
          <li>Course AI policies</li>
          <li>Assessments and rubrics</li>
          <li>Socratic questions</li>
          <li>Accessibility review</li>
        </ul>
        <p className="muted">
          Leave class-session planning and reading lists out of this first version. Add them once the agent
          behaves, so you can see what each addition changes.
        </p>

        <h3>Keep the first version tool-light</h3>
        <p>
          You may be offered the chance to connect email, cloud storage, calendars, or other apps. Decline, for
          now. Connections multiply what an agent can do and what it can get wrong, and you cannot tell which is
          happening until you trust the basics. Establish first that the agent understands its job, picks the
          right skill, produces a useful draft, and stops when it should.
        </p>
        <div className="caution">
          <p>
            If you do connect an app later, give it only the access it needs, and be deliberate about anything
            that can send, post, edit, or delete on your behalf. Read-only is the right default for a teaching
            agent.
          </p>
        </div>

        <h3>Add four starter prompts</h3>
        <p>
          Starter prompts are the examples shown when the agent opens. They are how a colleague &mdash; or you,
          three months from now &mdash; learns what this agent is for without knowing the name of a single skill.
          Think of them as sticky notes left on the desk.
        </p>

        <PromptBlock label="Starter prompt 1 · Develop a course" text={starterDevelop} />
        <PromptBlock label="Starter prompt 2 · Plan one class" text={starterPlanClass} />
        <PromptBlock label="Starter prompt 3 · Create an AI policy" text={starterPolicy} />
        <PromptBlock label="Starter prompt 4 · Build an assessment" text={starterAssessment} />

        <DoneWhen
          items={[
            "Three to five skills are attached to the agent.",
            "No apps or connectors are connected yet.",
            "Four starter prompts describe real tasks in plain language.",
          ]}
        />
      </Module>

      <Module n="7" id="preview-publish" title="Preview, then publish" minutes="15 minutes">
        <p>
          Select <strong>Preview</strong> in the builder. Preview is a private rehearsal: you can test the agent,
          see what it produces, and change the configuration before anyone else can open it.
        </p>
        <p>
          Run the full test sequence from{" "}
          <Link href="/build-an-agent#test-it">Module 8 of the main guide</Link> &mdash; the ten-week seminar
          prompt, then the AI policy, the assessment, the Socratic sequence, and the accessibility review, all in
          one conversation. That module also lists what a good response looks like and the warning signs to watch
          for. Come back here when the agent passes.
        </p>

        <MediaPlaceholder
          kind="recording"
          id="GPT-07-A"
          title="The agent at work on a real request"
          src="/media/build-an-agent/chatgpt_agent_usage_example.mp4"
          shows="Just under two minutes of the finished example agent taking a course-design request and working through it."
        />

        <FileDownload
          label="Sample output"
          title="A draft syllabus this agent produced"
          href="/media/build-an-agent/sample_agent_generated_syllabus.docx"
          format="DOCX"
          bytes={46287}
        >
          <p>
            This is what came out the other end: a ten-week draft for{" "}
            <em>Understanding AI for Legal Professionals</em>, with learning objectives, a selective-use AI policy,
            an assessment model with weights, a week-by-week schedule, and a reading-load summary.
          </p>
          <p className="muted">
            Read it as a draft, which is how it labels itself. Two sections are worth your attention more than the
            schedule: <strong>Draft Assumptions and Faculty Decisions</strong>, where it names what it chose for you
            and what it will not choose, and <strong>Source Verification Notes</strong>, where it marks what has to
            be checked before this is put in front of students. That is the behavior the instructions above are
            trying to buy. An agent that skipped those sections would be the one to worry about.
          </p>
        </FileDownload>

        <h3>Publishing</h3>
        <div className="steps">
          <div className="step">
            <h3>1. Save it</h3>
            <p>Select <strong>Create</strong> (or <strong>Update</strong>, if you are revising an existing agent).</p>
          </div>
          <div className="step">
            <h3>2. Decide who can see it</h3>
            <p>
              Keep it private, share it by link, or list it in your organization&rsquo;s directory. Private is the
              right choice for a first agent. Share it once you have used it on real work and trust what it
              produces.
            </p>
          </div>
          <div className="step">
            <h3>3. Write the description a colleague will read</h3>
            <p>
              One or two sentences on what the agent is for, plus the starter prompts. If a colleague cannot tell
              from the description when to open it, the description is the problem.
            </p>
          </div>
          <div className="step">
            <h3>4. Test the published version</h3>
            <p>
              Open a fresh conversation and run one real request. Configuration mistakes tend to show up here
              rather than in preview.
            </p>
          </div>
        </div>

        <h3>Two ways to use it from now on</h3>
        <p>
          Open it from <strong>Agents</strong>, or call it into an ordinary conversation by typing{" "}
          <code>@</code> followed by its name:
        </p>

        <PromptBlock label="In any chat" text={mentionExample} />

        <MediaPlaceholder
          kind="recording"
          id="GPT-07-C"
          title="Calling the agent with @ in a normal conversation"
          src="/media/build-an-agent/chatgpt_using_an_agent_in_chat.mp4"
          ratio="1678 / 896"
          shows="A minute of calling the published agent into an ordinary chat by name, and the reply that follows."
        />

        <DoneWhen
          items={[
            "The agent is saved, with a description and starter prompts.",
            "You have run one real request in a fresh conversation.",
            "You know whether it is private, link-shared, or listed for your organization.",
          ]}
        />
      </Module>

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
        </div>
      </section>

      <p className="muted" style={{ fontSize: "0.9rem" }}>
        OpenAI documents skills and workspace agents in its own help center at{" "}
        <a href="https://help.openai.com/" target="_blank" rel="noopener noreferrer">help.openai.com</a>. Where
        the app and this page disagree, trust the app and tell us so we can update the guide.
      </p>

      <DocNav
        prev={{ href: "/build-an-agent", label: "Main guide" }}
        next={{ href: "/build-an-agent#part-3", label: "Part 3: use it well" }}
      />
    </div>
  );
}

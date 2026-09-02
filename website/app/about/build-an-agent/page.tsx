import Link from "next/link";
import type { Metadata } from "next";
import {
  DocMeta,
  DocNav,
  DocPart,
  DocToc,
  DoneWhen,
  Module,
  PromptBlock,
} from "../components/GuideBlocks";

export const metadata: Metadata = {
  title: "Build an AI agent from the skills — SLS Faculty AI Skills",
  description:
    "A plain-English, module-by-module guide for Stanford Law faculty: turn a few SLS AI skills into one reusable assistant — an agent — in ChatGPT. No technical background needed.",
};

const seminarTest = `I am developing a ten-week, upper-level seminar called AI, Legal Research, and Professional Judgment.

Enrollment will be about 18 students. Students will complete two short practical exercises and a final policy memorandum. I want students to use AI in limited and transparent ways, but the course should reinforce independent research, verification, and professional judgment.

Begin by proposing four to six learning objectives and a high-level course arc. Do not draft the complete syllabus yet. Tell me which major decisions require my input.`;

const aiPolicyFollowUp = `The course should permit AI for brainstorming, outlining, comparison, and editing. Students may not use it to substitute for legal research or to generate authorities they have not independently checked. They must disclose material AI use.

Develop a draft course policy, but flag any language that could be mistaken for official Stanford policy.`;

const assessmentFollowUp = `Using the learning objectives we approved, design the final policy-memorandum assignment and a concise grading rubric. The assignment should test research judgment, source verification, analysis, and responsible AI use.`;

const socraticFollowUp = `Develop a sequence of eight Socratic questions for a class discussion about whether a lawyer may rely on an AI-generated summary of a judicial opinion. Begin with comprehension, move into assumptions and professional responsibility, and end with a difficult judgment call.`;

const accessibilityFollowUp = `Review the proposed assignment, rubric, and class activity for unnecessary barriers. Identify changes that would improve clarity and access without changing the academic standard.`;

const showYourWork = `Briefly identify which attached skill or process governed this response.

What assumptions did you make because I did not give you enough information?

Which parts of this draft require factual, policy, or authority verification?

Which choices are pedagogical decisions that should remain mine?`;

const boundaries = `Do not process client information, clinic matters, confidential student information, or active legal matters.

Do not invent sources, authorities, university policies, quotations, or assigned readings. When something must be verified, say plainly what needs to be checked and by whom.

Do not present anything as official Stanford or Stanford Law School policy. Mark any language that could be mistaken for official policy so I can review it.

For substantial projects, work in stages. Present the current stage, identify the decisions that need my approval, and wait before continuing.`;

const jobStatement = `This agent helps me [do what kind of work] for [whose benefit].

It should use the attached skills when their processes match my request, and decide which one fits rather than asking me to name it.

It must not [the two or three things that are always off-limits].

It should stop and ask me before [the decisions that are mine to make].`;

const stopOverbuilding = `For substantial projects, work in stages. Present the current stage, identify decisions requiring my approval, and wait before continuing.`;

const conflictPrompt = `Identify the different standards or assumptions being applied here. Recommend a resolution, but do not silently choose between them.`;

export default function BuildAnAgent() {
  return (
    <div className="docPage">
      <p className="eyebrow"><Link href="/skills">Skills</Link> &middot; Guide</p>
      <h1>Build your own AI agent from the skills</h1>
      <p className="lede">
        You have downloaded a skill or two. This guide is the next step: putting a few of them together into
        one assistant that already knows its job, so you stop explaining yourself at the start of every
        conversation. Written for faculty who have never built anything like this before.
      </p>

      <DocMeta
        rows={[
          { label: "Guide", value: "Building faculty agents · version 1.0 (draft)" },
          { label: "Audience", value: "Faculty and staff, no technical background assumed" },
          { label: "Time", value: "About 45–60 minutes for your first agent" },
          { label: "Platform", value: "ChatGPT" },
          { label: "Maintained by", value: "Robert Crown Law Library" },
          { label: "Last reviewed", value: <em>[date to be added]</em> },
        ]}
      />

      <section className="card" style={{ marginTop: "1.6rem" }}>
        <h2 style={{ fontSize: "1.35rem" }}>The whole idea in two sentences</h2>
        <p style={{ margin: 0, fontSize: "1.1rem" }}>
          A <strong>skill</strong> is a method &mdash; it teaches the AI how one kind of work should be done.
          An <strong>agent</strong> is a job &mdash; you name it once, hand it a few skills, tell it what is
          off-limits, and from then on it shows up already knowing what it is for.
        </p>
      </section>

      <DocToc
        items={[
          { id: "part-1", label: "Part 1 — Understand and plan", note: "Modules 1–3, about 25 minutes" },
          { id: "what-an-agent-is", label: "Module 1. What an agent actually is" },
          { id: "one-job", label: "Module 2. Give it one job" },
          { id: "choose-skills", label: "Module 3. Choose three to five skills" },
          { id: "part-2", label: "Part 2 — Build it in ChatGPT" },
          { id: "part-3", label: "Part 3 — Use it well", note: "Modules 8–11, come back here after building" },
          { id: "test-it", label: "Module 8. Test it like a skeptic" },
          { id: "show-work", label: "Module 9. Make it show its work" },
          { id: "boundaries", label: "Module 10. Set the boundaries" },
          { id: "more-agents", label: "Module 11. Three more agents to build" },
          { id: "troubleshooting", label: "Appendix A. Troubleshooting" },
          { id: "glossary", label: "Appendix B. Plain-English glossary" },
        ]}
      />

      <div className="note">
        <p>
          <strong>New to all of this?</strong> Read{" "}
          <Link href="/what-is-a-skill-file">What&rsquo;s a skill file?</Link> first (two minutes), and install one
          skill using the <Link href="/install">installation guide</Link>. This guide assumes you have done that
          once.
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      <DocPart id="part-1" label="Part 1" title="Understand and plan">
        <p className="muted" style={{ maxWidth: "70ch" }}>
          Twenty-five minutes of thinking, before you touch any settings. Faculty who skip this part end up with
          an assistant that does a little of everything and nothing especially well.
        </p>
      </DocPart>

      <Module n="1" id="what-an-agent-is" title="What an agent actually is" minutes="5 minutes">
        <p>
          Think about hiring an excellent research assistant.
        </p>
        <p>
          On their first day you do two separate things. First, you hand them the manuals for the work &mdash;
          how a good syllabus is built, how your rubrics are structured, how you want sources verified. Those are{" "}
          <strong>skills</strong>. Second, you tell them what their job actually <em>is</em>: &ldquo;you work on
          my courses, you check with me before big decisions, and you never touch anything confidential.&rdquo;
          That second conversation is the <strong>agent</strong>.
        </p>

        <div className="grid two" style={{ marginTop: "1.2rem" }}>
          <article className="card">
            <p className="eyebrow">The method</p>
            <h3>A skill</h3>
            <p className="muted" style={{ margin: 0 }}>
              A small package of instructions for one kind of work: the steps, the questions to ask you, the
              quality standards, the things to avoid. You install it once. There are 38 on this site.
            </p>
          </article>
          <article className="card">
            <p className="eyebrow">The job</p>
            <h3>An agent</h3>
            <p className="muted" style={{ margin: 0 }}>
              A named, reusable assistant: a job description, the handful of skills that serve that job, any
              files it should know about, and firm limits. You build it once and open it whenever that work
              comes up.
            </p>
          </article>
        </div>

        <div className="pullQuote">
          <p>The agent owns the assignment. The skills provide the methods. You provide the judgment.</p>
        </div>

        <p>
          The practical payoff is that you stop choosing. Right now, a syllabus question means opening the
          syllabus skill and an assessment question means opening a different one. An agent holds several
          related skills at once and picks the right one from what you asked for &mdash; the way a good assistant
          does not need to be told which manual to reach for.
        </p>

        <h3>What an agent will not do</h3>
        <p>
          It will not make your pedagogical decisions, set Stanford policy, or replace your review. It produces
          structured drafts, names its assumptions, and surfaces the decisions that are still yours. If it ever
          hands you something that looks finished and certain, that is the moment to be suspicious.
        </p>

        <DoneWhen
          items={[
            "You can say, in one sentence each, what a skill is and what an agent is.",
            "You can name one recurring task you would happily hand to an assistant who already knew your standards.",
          ]}
        />
      </Module>

      <Module n="2" id="one-job" title="Give it one job" minutes="10 minutes">
        <p>
          The single most common mistake is building &ldquo;my AI assistant&rdquo; &mdash; one agent for
          everything. It behaves like a new hire who has been told they report to the whole faculty: eager,
          plausible, and unreliable.
        </p>
        <p>
          An agent should have one job you could describe to a colleague in a sentence, and that colleague
          should be able to guess when to open it.
        </p>

        <table>
          <thead>
            <tr>
              <th scope="col">Too broad</th>
              <th scope="col">One recognizable job</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="muted">&ldquo;Helps me with my work.&rdquo;</td>
              <td>&ldquo;Helps me design and revise my courses and the materials that go with them.&rdquo;</td>
            </tr>
            <tr>
              <td className="muted">&ldquo;Knows everything about AI.&rdquo;</td>
              <td>&ldquo;Helps me judge whether an AI tool or claim deserves my trust.&rdquo;</td>
            </tr>
            <tr>
              <td className="muted">&ldquo;Does my research.&rdquo;</td>
              <td>&ldquo;Helps me move an article from rough argument to submission-ready draft.&rdquo;</td>
            </tr>
          </tbody>
        </table>

        <p>
          Write your job description now. Fill in the brackets in plain language &mdash; you will paste something
          like this into ChatGPT in Part 2.
        </p>

        <PromptBlock
          label="Your job description (fill in the brackets)"
          text={jobStatement}
          after={<>Keep it to four short paragraphs. If you cannot fill in the limits, that is a sign the job is still too broad.</>}
        />

        <p>
          For the rest of this guide we will build one specific example, so you have something concrete to
          follow: a <strong>Faculty Course Design Studio</strong> that helps a professor go from a course idea to
          review-ready teaching materials.
        </p>

        <DoneWhen
          items={[
            "You have written a job description a colleague would understand without explanation.",
            "You can name at least two things this agent should never do.",
          ]}
        />
      </Module>

      <Module n="3" id="choose-skills" title="Choose three to five skills" minutes="10 minutes">
        <p>
          Now hand over the manuals &mdash; but only the ones for this job. Attaching all 38 skills is like
          handing your new assistant a wall of binders and hoping they reach for the right one. A focused set is
          easier to test, easier to correct, and noticeably better at picking the right method.
        </p>
        <p>
          Three to five skills, all from the same kind of work. Here is the set for our example, all from the{" "}
          <Link href="/skills/teaching">Teaching &amp; Course Design</Link> collection:
        </p>

        <table>
          <thead>
            <tr>
              <th scope="col">Skill</th>
              <th scope="col">What it handles in the agent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link href="/skills/course-and-syllabus-designer">Course and Syllabus Designer</Link></td>
              <td>The course itself: objectives, arc, syllabus structure.</td>
            </tr>
            <tr>
              <td><Link href="/skills/faculty-ai-policy-builder">Faculty AI Policy Builder</Link></td>
              <td>What students may and may not do with AI, and how they disclose it.</td>
            </tr>
            <tr>
              <td><Link href="/skills/assessment-and-rubric-builder">Assessment and Rubric Builder</Link></td>
              <td>Assignments and grading criteria that line up with the objectives.</td>
            </tr>
            <tr>
              <td><Link href="/skills/socratic-question-and-hypothetical-designer">Socratic Question and Hypothetical Designer</Link></td>
              <td>Cold-call sequences and hypotheticals that build on each other.</td>
            </tr>
            <tr>
              <td><Link href="/skills/teaching-materials-accessibility-reviewer">Teaching Materials Accessibility Reviewer</Link></td>
              <td>A final pass for unnecessary barriers in what you hand students.</td>
            </tr>
          </tbody>
        </table>

        <p className="muted">
          Two more &mdash; <Link href="/skills/class-session-planner">Class Session Planner</Link> and{" "}
          <Link href="/skills/reading-list-and-course-materials-curator">Reading List and Course Materials
          Curator</Link> &mdash; fit this agent well. Add them later, once the first version behaves. Adding
          skills one at a time is how you learn what each one changed.
        </p>

        <p>
          Download the ZIP file for each skill you chose (the download button sits on every skill page). You will
          upload them in Part 2.
        </p>

        <div className="actions">
          <Link className="secondary" href="/skills/teaching">Open the Teaching collection</Link>
          <Link className="secondary" href="/skills">Browse all 38 skills</Link>
        </div>

        <DoneWhen
          items={[
            "You have three to five skill ZIP files saved where you can find them.",
            "You could explain why each one belongs to this agent's job.",
          ]}
        />
      </Module>

      {/* ------------------------------------------------------------------ */}
      <DocPart id="part-2" label="Part 2" title="Build it in ChatGPT">
        <p style={{ maxWidth: "70ch" }}>
          Everything so far has been about the agent itself. What follows is the clicking &mdash; Modules 4
          through 7, in ChatGPT, which is the platform this guide covers. Then come back here for Part 3.
        </p>
        <div style={{ marginTop: "1.4rem" }}>
          <Link className="card interactive" href="/build-an-agent/chatgpt">
            <p className="eyebrow" style={{ color: "var(--link)" }}>Modules 4&ndash;7</p>
            <h3 style={{ fontSize: "1.4rem" }}>Build it in ChatGPT</h3>
            <p className="muted">
              ChatGPT has a built-in agent builder. You describe the job, attach your skills, add a few starter
              prompts, test it, and publish it. Closest thing to &ldquo;hire an assistant&rdquo; as a button.
            </p>
            <p style={{ margin: 0, fontWeight: 600, color: "var(--link)" }}>Open the ChatGPT modules &rarr;</p>
          </Link>
        </div>
        <p className="muted" style={{ marginTop: "1rem" }}>
          You will need a ChatGPT account whose workspace allows uploaded skills. If yours does not, or you are
          not sure, write to <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a> and we will
          check with you.
        </p>
      </DocPart>

      {/* ------------------------------------------------------------------ */}
      <DocPart id="part-3" label="Part 3" title="Use it well">
        <p style={{ maxWidth: "70ch" }}>
          Come back here once your agent exists. These four modules are the difference between an agent that
          impresses you and one you can actually rely on.
        </p>
      </DocPart>

      <Module n="8" id="test-it" title="Test it like a skeptic" minutes="15 minutes">
        <p>
          Do not start with an easy question. Give it a real, messy request and watch what it does with it. This
          is the test prompt for our example agent &mdash; adapt the details to a course of your own.
        </p>

        <PromptBlock label="Test prompt" text={seminarTest} />

        <div className="grid two" style={{ marginTop: "1.2rem" }}>
          <article className="card">
            <p className="eyebrow" style={{ color: "#2e9e5b" }}>A good response</p>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>Recognizes this is course design, and starts there rather than jumping to a policy or rubric</li>
              <li>Asks only the questions that would actually change the course</li>
              <li>Proposes objectives you could measure</li>
              <li>Connects the course arc to the assessments you described</li>
              <li>Names the decisions that are yours</li>
              <li>Stops, as instructed, before drafting the whole syllabus</li>
            </ul>
          </article>
          <article className="card">
            <p className="eyebrow" style={{ color: "var(--cardinal-bright)" }}>Warning signs</p>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>A generic list of ten weekly topics</li>
              <li>A complete syllabus you did not ask for yet</li>
              <li>Cited cases, articles, or Stanford policies you did not provide</li>
              <li>Confident silence about anything it had to assume</li>
              <li>Ten clarifying questions before any work at all</li>
            </ul>
          </article>
        </div>

        <h3>Now watch it change methods</h3>
        <p>
          Stay in the same conversation and send these one at a time. The point is to see the agent move from
          one skill to the next <em>without losing the course you just built together</em> &mdash; the way an
          assistant remembers Monday&rsquo;s decisions on Tuesday.
        </p>

        <PromptBlock label="Next: the AI policy" text={aiPolicyFollowUp} />
        <PromptBlock label="Next: an aligned assessment" text={assessmentFollowUp} />
        <PromptBlock label="Next: a Socratic sequence" text={socraticFollowUp} />
        <PromptBlock label="Next: an accessibility review" text={accessibilityFollowUp} />

        <p className="muted">
          Watch for the tell-tale failures: eight unrelated discussion prompts instead of a built sequence; a
          rubric that quietly abandons the objectives you approved; an accessibility pass that redesigns your
          course instead of reviewing the three documents in front of it.
        </p>

        <DoneWhen
          items={[
            "Your agent stopped where you told it to stop, at least once.",
            "It moved between at least two skills in one conversation without losing earlier decisions.",
            "You know one thing you want to change about its instructions.",
          ]}
        />
      </Module>

      <Module n="9" id="show-work" title="Make it show its work" minutes="5 minutes">
        <p>
          A polished draft can hide a weak process. You do not need the AI to expose its inner workings, but you
          do need enough visibility to judge the result. Keep these four questions on hand; they take seconds and
          they change what you trust.
        </p>

        <PromptBlock label="Ask any of these, any time" text={showYourWork} />

        <p>
          The answers are diagnostic. &ldquo;Which skill governed this?&rdquo; catches an agent that ignored its
          methods. &ldquo;What did you assume?&rdquo; surfaces the invented enrollment number or the reading you
          never assigned. &ldquo;What needs verification?&rdquo; is the question that keeps a hallucinated
          citation out of your syllabus.
        </p>

        <div className="note">
          <p>
            One more, before accepting a rewrite: <em>&ldquo;Before revising, explain what problem the revision
            is intended to solve.&rdquo;</em> It prevents the polite, endless churn of changes that make a draft
            different without making it better.
          </p>
        </div>

        <DoneWhen
          items={[
            "You have asked your agent which skill governed one of its answers.",
            "You have seen at least one assumption it made without telling you.",
          ]}
        />
      </Module>

      <Module n="10" id="boundaries" title="Set the boundaries" minutes="10 minutes">
        <p>
          An agent is useful because it is confident and fast. Those are exactly the qualities that make limits
          worth writing down. Paste this into your agent&rsquo;s job description in ChatGPT, and adjust it to your
          situation.
        </p>

        <PromptBlock label="Boundaries to include in every faculty agent" text={boundaries} />

        <div className="caution">
          <p>
            <strong>Never put into any AI agent:</strong> client information, clinic matters, confidential
            student records, or anything connected to an active legal matter. These skills and agents are built
            for faculty teaching and research. When you need an example, use a synthetic one &mdash; a made-up
            student, a fictional client, a hypothetical fact pattern.
          </p>
        </div>

        <p>
          A second boundary is about voice. An agent can draft a course AI policy; it cannot tell you what
          Stanford&rsquo;s policy is. Ask it to flag any language that reads as official institutional policy so
          you review those lines deliberately, and check anything that matters with the{" "}
          <a href="https://law.stanford.edu/ai-initiative/" target="_blank" rel="noopener noreferrer">
            SLS AI Initiative
          </a>{" "}
          or the library.
        </p>

        <h3>Give it permission to stop</h3>
        <p>
          Left alone, agents try to finish everything. That is how you end up reviewing a complete course package
          built on an objective you would have rejected in the first five minutes. One sentence fixes it:
        </p>

        <PromptBlock label="Add to the instructions" text={stopOverbuilding} />

        <DoneWhen
          items={[
            "Your agent's instructions name the categories of information it must never handle.",
            "Your agent pauses for approval on large projects instead of delivering everything at once.",
            "You have decided who reviews anything that touches institutional policy.",
          ]}
        />
      </Module>

      <Module n="11" id="more-agents" title="Three more agents to build" minutes="20 minutes each">
        <p>
          The pattern does not change: one job, a few skills from one collection, firm limits, real checkpoints.
          Once the Course Design Studio works, these three take about twenty minutes each.
        </p>

        <div className="grid" style={{ marginTop: "1.2rem" }}>
          <article className="card">
            <p className="eyebrow">From the AI Judgment Series</p>
            <h3>AI Judgment Coach</h3>
            <p className="muted">
              Its job: help you decide whether AI fits a task at all, interrogate vendor claims, design a small
              test, and plan a responsible pilot.
            </p>
            <p style={{ marginBottom: "0.5rem" }}><strong>Try it with:</strong></p>
            <p className="muted" style={{ fontStyle: "italic" }}>
              &ldquo;A vendor says its product cuts legal-research time by 60 percent. Help me identify the
              claim&rsquo;s assumptions, the evidence we would need, and a small test that would produce useful
              results.&rdquo;
            </p>
            <Link className="secondary" href="/skills/judgment-series">Open the collection</Link>
          </article>

          <article className="card">
            <p className="eyebrow">From Faculty Research &amp; Scholarship</p>
            <h3>Scholarship Development Agent</h3>
            <p className="muted">
              Its job: move a project from scoping through argument development, structural revision, citation
              review, and publication planning.
            </p>
            <p style={{ marginBottom: "0.5rem" }}><strong>Try it with:</strong></p>
            <p className="muted" style={{ fontStyle: "italic" }}>
              &ldquo;I have a preliminary argument and a folder of research notes. Help me identify the
              argument&rsquo;s central claim, missing support, likely counterarguments, and the next research
              questions. Do not draft the article yet.&rdquo;
            </p>
            <Link className="secondary" href="/skills/research">Open the collection</Link>
          </article>

          <article className="card">
            <p className="eyebrow">From SLS Legal Skills</p>
            <h3>Legal Method Teaching Lab</h3>
            <p className="muted">
              Its job: help you teach and model legal method &mdash; reading cases, mapping doctrine,
              interpreting statutes, verifying authority &mdash; with context and authority intact.
            </p>
            <p style={{ marginBottom: "0.5rem" }}><strong>Try it with:</strong></p>
            <p className="muted" style={{ fontStyle: "italic" }}>
              &ldquo;Help me design a classroom exercise in which students compare two plausible readings of a
              statute, working from the text, structure, relevant authority, and competing interpretive
              methods.&rdquo;
            </p>
            <Link className="secondary" href="/skills/legal">Open the collection</Link>
          </article>
        </div>

        <div className="caution" style={{ marginTop: "1.2rem" }}>
          <p>
            The legal-method skills are built for faculty research and teaching &mdash; never for client, clinic,
            or active-matter work. That limit belongs in the agent&rsquo;s instructions, not only in your memory.
          </p>
        </div>
      </Module>

      {/* ------------------------------------------------------------------ */}
      <DocPart label="Appendix A" title="Troubleshooting" id="troubleshooting" />

      <div className="steps">
        <div className="step">
          <h3>It is not using the skill I expected</h3>
          <p>
            First confirm the skill is actually attached and switched on. Then look at how you asked. Agents
            choose a method from the shape of the request, so describe the task rather than asking for help:
            not &ldquo;help with my course,&rdquo; but &ldquo;help me define measurable learning objectives and
            organize them into a ten-week arc.&rdquo;
          </p>
        </div>
        <div className="step">
          <h3>It tries to do everything at once</h3>
          <p>
            Add the staging instruction from Module 10 to its permanent instructions, and repeat it in the
            moment: &ldquo;Stop after the objectives. I will approve them before you continue.&rdquo;
          </p>
        </div>
        <div className="step">
          <h3>Two skills gave me conflicting advice</h3>
          <p>
            Do not let it quietly pick a winner. Ask it to make the disagreement visible:
          </p>
          <PromptBlock label="Ask this" text={conflictPrompt} />
        </div>
        <div className="step">
          <h3>It invented a case, an article, or a policy</h3>
          <p>
            Treat every authority as unverified until you have seen it. Ask &ldquo;which parts of this require
            verification, and where would I check?&rdquo; and re-state the no-invented-sources boundary in the
            instructions. If it keeps happening, the agent has too many jobs and not enough limits.
          </p>
        </div>
        <div className="step">
          <h3>I cannot find skills or agents in the menus</h3>
          <p>
            Menus move, and some workspaces switch these features off by role. Check the current help
            documentation for your platform, then ask your workspace administrator whether uploading and
            building are enabled for your account. The library can help you find out:{" "}
            <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>.
          </p>
        </div>
        <div className="step">
          <h3>The output looks great and I am slightly uneasy</h3>
          <p>
            Good instinct. Run the four questions from Module 9. A confident draft with no stated assumptions and
            nothing flagged for verification is the single most reliable warning sign in this whole guide.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      <DocPart label="Appendix B" title="Plain-English glossary" id="glossary" />

      <table>
        <thead>
          <tr>
            <th scope="col">Term</th>
            <th scope="col">What it means here</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Skill</strong></td>
            <td>A small package of instructions that teaches an AI how to do one kind of work well. The 38 on this site are written for law faculty.</td>
          </tr>
          <tr>
            <td><strong>Agent</strong></td>
            <td>A reusable assistant with one job: instructions, a few skills, and limits, saved under a name you choose.</td>
          </tr>
          <tr>
            <td><strong>Instructions</strong></td>
            <td>The standing note the agent reads before every task. Its job description.</td>
          </tr>
          <tr>
            <td><strong>Starter prompts</strong></td>
            <td>Example requests shown when the agent opens, so you (or a colleague) never face a blank box.</td>
          </tr>
          <tr>
            <td><strong>ZIP file</strong></td>
            <td>One file holding a folder&rsquo;s worth of files. Each skill downloads as a ZIP. Do not unzip it &mdash; upload it as is.</td>
          </tr>
          <tr>
            <td><strong>Workspace</strong></td>
            <td>Your organization&rsquo;s account. Its administrator can switch features on or off for your role.</td>
          </tr>
          <tr>
            <td><strong>Connector</strong></td>
            <td>A link between the AI and another system &mdash; email, calendar, cloud storage. Powerful, and not needed for your first agent.</td>
          </tr>
          <tr>
            <td><strong>Cowork</strong></td>
            <td>Claude&rsquo;s working mode: instead of only chatting, it opens a folder you choose and produces real files in it.</td>
          </tr>
          <tr>
            <td><strong>Plugin</strong></td>
            <td>In Claude, a bundle that installs several skills (and sometimes connectors) together in one step.</td>
          </tr>
          <tr>
            <td><strong>Hallucination</strong></td>
            <td>A confident, fluent, invented answer &mdash; the fake citation problem. Why verification is a standing instruction, not an occasional habit.</td>
          </tr>
        </tbody>
      </table>

      <section className="card" style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem" }}>The lesson worth keeping</h2>
        <p style={{ maxWidth: "72ch" }}>
          A skill is valuable when it captures a reliable method. An agent is valuable when it gives that method
          a focused job, the right context, firm boundaries, and a place in work you actually do. The goal is not
          an agent that knows everything. It is one that knows what kind of work it is doing, which method should
          guide it, when to pause &mdash; and what stays your decision.
        </p>
        <p className="muted">
          Stuck, or want a second pair of eyes on an agent you built?{" "}
          <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>.
        </p>
        {/* Part 3 is the end of the guide, so this is where a reader is finished
            and wants out. The footer nav below keeps pointing forward to Part 2,
            because a reader on their first pass down this page has not built
            anything yet. */}
        <div className="actions" style={{ marginTop: "0.9rem" }}>
          <Link className="secondary" href="/">Back to the home page</Link>
        </div>
      </section>

      <DocNav
        prev={{ href: "/skills", label: "Back to the skills" }}
        next={{ href: "/build-an-agent/chatgpt", label: "Part 2: build it in ChatGPT" }}
      />
    </div>
  );
}

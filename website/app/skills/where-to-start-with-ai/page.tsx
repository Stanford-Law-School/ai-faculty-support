import { getSkill } from "../../lib/skills";
import { DownloadButton } from "../../components/DownloadButton";
import { SkillBreadcrumb } from "../../components/SkillBreadcrumb";
import Link from "next/link";

export default function WhereToStartWithAiSkill() {
  const skill = getSkill("where-to-start-with-ai");
  return (
    <>
      <SkillBreadcrumb slug="where-to-start-with-ai" />
      <p className="eyebrow">SLS AI Judgment Series · Front door · {skill.status} · v{skill.version}</p>
      <h1>{skill.name}</h1>
      <p className="lede">Start where you are. Find the questions that matter.</p>
      <div className="actions">
        <DownloadButton skill={skill} />
        <a className="secondary" href="/install-chatgpt">Install in ChatGPT</a>
        <a className="secondary" href="/install-claude">Install in Claude</a>
        <Link className="secondary" href="/skills">View Judgment Series catalog</Link>
      </div>

      <section className="grid two">
        <article className="card">
          <h2>What it does</h2>
          <p>
            A welcoming, conversational orientation Skill that helps faculty express what they are trying to understand,
            identify misconceptions without embarrassment, choose an appropriate depth and time commitment, and receive a
            personalized Faculty AI Learning Map—without scores, rankings, or certification.
          </p>
        </article>
        <article className="card">
          <h2>Who it is for</h2>
          <p>
            Faculty who feel lost, skeptical, enthusiastic, behind, expert, time-limited, or unsure which AI question matters next—including
            those preparing for institutional conversations or vendor demonstrations.
          </p>
        </article>
        <article className="card">
          <h2>Decision-based orientation</h2>
          <p>
            Diagnostics use realistic decisions and situations, not trivia quizzes. This guide recommends the smallest useful destination
            among the eight Judgment Series Skills rather than every possible lab.
          </p>
        </article>
        <article className="card">
          <h2>Eight destination routes</h2>
          <p className="route-map-text">
            Text route map: your question at the center; spokes to How AI Systems Work, Understand an AI Tool, Check an AI Claim,
            Problem-Based Approach to AI, Test What AI Can Do, Plan an AI Pilot, Test AI Governance, and
            Bring AI Into Your Teaching. All eight destinations are implemented; some are downloadable now and others are in
            development with downloads coming soon.
          </p>
        </article>
        <article className="card">
          <h2>Faculty AI Learning Map and Field Notebook</h2>
          <p>
            Personalized maps capture purpose, strengths, open questions, primary route, time choice, a low-risk experiment, and reflection—never a competency score.
            The Field Notebook records what changed in your mental model over time.
          </p>
        </article>
        <article className="card">
          <h2>Return and resume</h2>
          <p>Paste a prior Learning Map or Field Notebook entry to update your route without repeating the entire diagnostic.</p>
        </article>
        <article className="card">
          <h2>Time pathways</h2>
          <p>Five-minute clarity, twenty-minute labs, forty-five-minute studios, ninety-minute workshops, or deeper self-directed sequences.</p>
        </article>
        <article className="card">
          <h2>Accessibility</h2>
          <p>Plain language, manageable choices, one-question-at-a-time mode, skip and short-route options, text equivalents for route maps, no timed requirements.</p>
        </article>
        <article className="card">
          <h2>Example questions</h2>
          <ul>
            {skill.usageExamples?.map((ex) => <li key={ex}>{ex}</li>)}
          </ul>
        </article>
        <article className="card">
          <h2>Current research</h2>
          <p>Product and Stanford questions trigger live web research with freshness notes. This guide does not invent SLS-specific policy.</p>
        </article>
        <article className="card">
          <h2>Important limitations</h2>
          <p>
            Not a technical certification, product review, formal assessment, institutional approval process, or substitute for destination Skills.
            Completion does not certify responsible AI use.
          </p>
        </article>
        <article className="card">
          <h2>Availability</h2>
          <p>This Skill is in active development but is available to download now. Use the Download Skill ZIP button above, then follow the ChatGPT or Claude installation guide.</p>
        </article>
      </section>
    </>
  );
}

import Link from "next/link";
import { orderedModes, modeTitle, type ToolMode } from "../lib/aiToolModes";
import { getTool, orderedTools, type AiTool } from "../lib/aiTools";
import { formatReviewDate } from "../lib/guides";

/* ---------------------------------------------------------------------------
   Renders the tool-mode taxonomy and the current product examples from data.

   Two rules shape everything here. First, the durable mode description leads and
   the product examples are visually secondary, so the page still teaches
   correctly when today's products are gone. Second, there is no ranking anywhere
   — no scores, stars, badges, leaderboards, or "best tool" verdict — because the
   right answer depends on the reader's task, not on a vendor comparison.
   ------------------------------------------------------------------------- */

/** A mode label. Text carries the meaning; nothing depends on colour. */
export function ModeBadge({ modeId }: { modeId: string }) {
  return (
    <span className="pill modeBadge">
      <span className="dot" aria-hidden="true" />
      {modeTitle(modeId)}
    </span>
  );
}

function ExampleNames({ mode }: { mode: ToolMode }) {
  const examples = mode.currentExampleToolIds
    .map((id) => getTool(id))
    .filter((t): t is AiTool => Boolean(t));
  if (!examples.length) return null;
  return (
    <div className="modeExamples">
      <p className="modeExamplesHead">Current examples</p>
      <p className="modeExamplesList">
        {examples.map((t) => t.displayName).join(" · ")}
      </p>
      <p className="modeExamplesQualifier">{mode.exampleQualifier}</p>
    </div>
  );
}

export function ToolModeCards() {
  return (
    <div className="modeList">
      {orderedModes().map((mode) => (
        <article className="modeCard" key={mode.id} id={`mode-${mode.id}`}>
          <h3>{mode.title}</h3>
          <p className="modeRule">{mode.shortRule}</p>
          <dl className="modeFields">
            <div>
              <dt>Source path</dt>
              <dd>{mode.sourcePath}</dd>
            </div>
            <div>
              <dt>Strong fits</dt>
              <dd>
                <ul>
                  {mode.strongFits.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Not enough for</dt>
              <dd>
                <ul>
                  {mode.notEnoughFor.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Verification move</dt>
              <dd>{mode.verificationMove}</dd>
            </div>
          </dl>
          <ExampleNames mode={mode} />
        </article>
      ))}
    </div>
  );
}

/** Start from the evidence the task requires, then read across to the mode. */
export function RoutingMap({ routes }: { routes: { need: string; modeId: string; check: string }[] }) {
  return (
    <ol className="routeList">
      {routes.map(({ need, modeId, check }) => (
        <li key={modeId + need}>
          <p className="routeNeed">{need}</p>
          <p className="routeStart">
            <span className="routeLabel">Start with</span>{" "}
            <a href={`#mode-${modeId}`}>{modeTitle(modeId)}</a>
          </p>
          <p className="routeCheck">
            <span className="routeLabel">Check</span> {check}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * One subject, several jobs. A definition list rather than a table: each row is
 * read top to bottom, so it needs no horizontal comparison at 320px and the
 * labels travel with the values.
 */
export function JobComparison({
  rows,
}: {
  rows: { job: string; modeId: string; why: string }[];
}) {
  return (
    <dl className="jobList">
      {rows.map(({ job, modeId, why }) => (
        <div className="jobItem" key={job}>
          <dt>{job}</dt>
          <dd>
            <p className="jobField">
              <span className="jobLabel">Mode</span>
              {modeTitle(modeId)}
            </p>
            <p className="jobField">
              <span className="jobLabel">Why</span>
              {why}
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function DataGuidanceLine({ tool }: { tool: AiTool }) {
  if (tool.localDataStatus === "uses-stanford-snapshot") {
    return (
      <p className="toolGuidance">
        <span className="toolLabel">Data guidance</span>
        <Link href="/learn-ai/what-can-i-safely-share#service-snapshot-heading">
          Check current data classification
        </Link>
      </p>
    );
  }
  return (
    <p className="toolGuidance">
      <span className="toolLabel">Data guidance</span>
      {tool.dataGuidance ?? "Verify with RCLL before using nonpublic material."}{" "}
      <a href="mailto:library@law.stanford.edu">Ask the Law Library</a>
    </p>
  );
}

/**
 * The dated current-examples insert. Separate from the guide's own review date:
 * product names move faster than the reasoning that cites them.
 */
export function CurrentToolExamples({ checkedOn }: { checkedOn: string }) {
  const tools = orderedTools().filter((t) => t.visibleOnGuide);
  return (
    <section className="serviceSnapshot" aria-labelledby="current-examples-heading">
      <h2 id="current-examples-heading">Current Stanford and SLS examples</h2>
      <p className="snapshotChecked">
        <time dateTime={checkedOn}>Product names and features checked {formatReviewDate(checkedOn)}</time>
      </p>
      <p>
        These are examples, not rankings or endorsements. A product may appear in more than one mode,
        and the available features may depend on the Stanford service, license, account, and connector.
      </p>
      <div className="toolCardList">
        {tools.map((tool) => (
          <article className="toolCard" key={tool.id}>
            <h3>{tool.displayName}</h3>
            {tool.formerNames.length > 0 && (
              <p className="toolFormerNames">Formerly {tool.formerNames[0]}</p>
            )}
            <p className="toolProvider">{tool.provider}</p>
            <p className="modeBadgeRow">
              {tool.modeIds.map((id) => <ModeBadge key={id} modeId={id} />)}
            </p>
            <p className="toolFit">{tool.taskFit}</p>
            <p className="toolSourcePath">
              <span className="toolLabel">Source path</span>
              {tool.sourcePathSummary}
            </p>
            <p className="toolAccess">
              <span className="toolLabel">Access</span>
              {tool.accessLabel}
            </p>
            <DataGuidanceLine tool={tool} />
            {tool.staffReviewRequired && (
              <p className="toolLocalNote">
                Confirm current SLS access and enabled features with the Law Library.
              </p>
            )}
            <p className="toolLinks">
              <a href={tool.detailsUrl} target="_blank" rel="noopener noreferrer">
                Service details
                <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
                <span className="srOnly"> (opens in a new tab)</span>
              </a>
            </p>
          </article>
        ))}
      </div>
      <p className="actions">
        <Link className="secondary" href="/ai-resources">Browse the full AI Resources directory</Link>
      </p>
    </section>
  );
}

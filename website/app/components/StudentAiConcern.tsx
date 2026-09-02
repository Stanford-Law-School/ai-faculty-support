import Link from "next/link";
import { formatReviewDate } from "../lib/guides";
import {
  aiDetectionGuidance,
  detectionGuidanceIsStale,
  displayableInstitutionalClaims,
} from "../lib/aiDetectionGuidance";
import {
  slsStudentAiPolicy,
  slsPolicyIsConfirmed,
  unconfirmedPolicyCopy,
} from "../lib/slsStudentAiPolicy";
import {
  displayableGradedWorkActions,
  processSnapshotIsStale,
  stanfordStudentAiProcess,
} from "../lib/stanfordStudentAiProcess";
import {
  concernScenario,
  conversationLimits,
  conversationOpening,
  conversationQuestions,
  governingMaterials,
  orderedConcernSteps,
  orderedEvidenceCategories,
  scenarioItemsByCategory,
  workTypePaths,
} from "../lib/studentAiConcern";

/* ---------------------------------------------------------------------------
   Components for the companion checklist, "How should I respond to a possible
   student AI-policy concern?".

   These began life as the sixth primary guide. That framing was wrong — a faculty
   member's first AI teaching question is not how to detect a student — so the
   records moved here, beneath the teaching guide they support, and the
   assignment-design material moved to app/components/StudentAiLearning.tsx. The
   process content itself was accurate and is preserved unchanged.

   Deliberately absent, and the reason matters more here than anywhere else in
   the series: there is no detector call, no misconduct classifier, no
   "should I report?" recommender, no concern form, no student-name field, no
   upload control, and no guilt score. A page that appeared to decide this would
   be worse than no page, because a faculty member under time pressure would use
   it. Everything below renders static markup from data records.

   Three things are handled structurally rather than by careful wording. The
   workflow's order is fixed by its data record, so a detector can never become
   step one. The Stanford process insert reads its procedural claims through
   displayableGradedWorkActions(), so an expired snapshot withholds the reporting
   deadline and the student-contact sequence instead of asserting them. And the
   SLS policy insert renders nothing about the policy's contents until an
   authorized owner has confirmed them.
   ------------------------------------------------------------------------- */

const SAFE_SHARING_GUIDE = "/learn-ai/what-can-i-safely-share";

/**
 * The six-step response. A semantic ordered list, with every step visible — none
 * is tucked into a disclosure, because the sequence is the content.
 */
export function StudentAiConcernWorkflow() {
  return (
    <ol className="concernSteps">
      {orderedConcernSteps().map((step) => (
        <li className="concernStep" key={step.id} id={`step-${step.id}`}>
          <h3>
            <span className="concernStepNumber" aria-hidden="true">{step.number}</span>
            {step.title}
          </h3>
          <p className="concernInstruction">{step.shortInstruction}</p>
          <p>{step.explanation}</p>
          <div className="concernLists">
            <div>
              <p className="concernListHead" id={`step-${step.id}-do`}>What to do</p>
              <ul className="concernDo" aria-labelledby={`step-${step.id}-do`}>
                {step.actions.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div>
              <p className="concernListHead" id={`step-${step.id}-dont`}>Do not</p>
              <ul className="concernDont" aria-labelledby={`step-${step.id}-dont`}>
                {step.doNot.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
          <p className="concernEvidence">
            <span className="auditFieldLabel">Record this creates</span>
            {step.evidenceCreated}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** The materials to collect, as a checklist rather than prose. */
export function GoverningMaterialsChecklist() {
  return (
    <dl className="materialsList">
      {[...governingMaterials]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((m) => (
          <div className="materialsItem" key={m.id}>
            <dt>{m.label}</dt>
            <dd>
              <p className="materialsQuestion">{m.question}</p>
              {m.examples && (
                <p className="materialsExamples">
                  <span className="auditFieldLabel">Examples</span>
                  {m.examples}
                </p>
              )}
              {m.requirement && (
                <p className="materialsRequirement">
                  <span className="auditFieldLabel">Requirement</span>
                  {m.requirement}
                </p>
              )}
            </dd>
          </div>
        ))}
    </dl>
  );
}

/**
 * The current Stanford process. The prominent actions and the review line come
 * from the dated record; once it expires the deadline and the contact sequence
 * disappear and the stale message takes their place — in text, not by colour.
 */
export function StanfordStudentAiProcessInsert() {
  const p = stanfordStudentAiProcess;
  const stale = processSnapshotIsStale();
  const actions = displayableGradedWorkActions();
  return (
    <section className="processInsert" aria-labelledby="process-insert-heading">
      <p className="eyebrow">Current Stanford process</p>
      <h2 id="process-insert-heading">What to do with a graded-work concern</h2>
      <p className="processChecked">
        <time dateTime={p.verifiedOn}>
          Checked against Stanford guidance on {formatReviewDate(p.verifiedOn)}
        </time>
      </p>

      {stale ? (
        <div className="processStale">
          <p className="processStaleLabel">{p.staleLabel}</p>
          <p>{p.staleGuidance}</p>
        </div>
      ) : null}

      <ol className="processActions">
        {actions.map((a) => <li key={a}>{a}</li>)}
      </ol>

      <p className="processCaveat">
        Consulting OCS does not itself file a concern or determine that a violation occurred.
      </p>

      <div className="actions">
        <a className="primary" href={`mailto:${p.ocsEmail}`}>
          Contact the Office of Community Standards
        </a>
        <a className="secondary" href={p.ocsReportingUrl} target="_blank" rel="noopener noreferrer">
          Review the faculty reporting guidance
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
      </div>
      <p className="processTertiary muted">
        The current concern form is linked from the{" "}
        <a href={p.ocsReportingUrl} target="_blank" rel="noopener noreferrer">
          OCS faculty reporting page
          <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
        , which stays current if the form itself moves. Faculty guidance for teaching teams is on the{" "}
        <a href={p.ocsFacultyUrl} target="_blank" rel="noopener noreferrer">
          OCS Faculty &amp; TAs page
          <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </section>
  );
}

/**
 * The SLS policy. While unconfirmed this renders a heading, one neutral sentence,
 * and the official link — nothing about what the policy says. Once an authorized
 * owner supplies text, the record's approved summary appears with its effective
 * date; the validator refuses to let that happen without one.
 */
export function SlsStudentAiPolicyInsert() {
  const p = slsStudentAiPolicy;
  const confirmed = slsPolicyIsConfirmed();
  return (
    <section className="policyInsert" aria-labelledby="sls-policy-heading">
      <h2 id="sls-policy-heading">{unconfirmedPolicyCopy.heading}</h2>
      <p>{unconfirmedPolicyCopy.body}</p>
      {confirmed && (
        <>
          <p className="policySummary">{p.approvedSummary ?? p.exactPolicyText}</p>
          <p className="policyDates muted">
            {p.effectiveDate && (
              <>
                <time dateTime={p.effectiveDate}>Effective {formatReviewDate(p.effectiveDate)}</time>
                {" · "}
              </>
            )}
            {p.verifiedOn && (
              <time dateTime={p.verifiedOn}>Confirmed {formatReviewDate(p.verifiedOn)}</time>
            )}
            {p.approvedBy ? ` · Confirmed by ${p.approvedBy}` : null}
          </p>
        </>
      )}
      <p className="policyLink">
        <a href={p.officialUrl} target="_blank" rel="noopener noreferrer">
          {unconfirmedPolicyCopy.linkText}
          <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
      </p>
    </section>
  );
}

/**
 * The seven evidence categories. Labels and the establishes/does-not-establish
 * pair carry the meaning, so nothing depends on colour and nothing is ranked by a
 * strength score.
 */
export function ConcernEvidenceCategories() {
  return (
    <div className="evidenceCategoryList">
      {orderedEvidenceCategories().map((c) => (
        <article className="evidenceCategory" key={c.id} id={`category-${c.id}`}>
          <h3>{c.label}</h3>
          <p className="categoryDefinition">{c.definition}</p>
          <p className="categoryExamplesHead" id={`category-${c.id}-examples`}>Examples</p>
          <ul className="categoryExamples" aria-labelledby={`category-${c.id}-examples`}>
            {c.examples.map((e) => <li key={e}>{e}</li>)}
          </ul>
          <dl>
            <div>
              <dt>Can establish</dt>
              <dd>{c.whatItCanEstablish}</dd>
            </div>
            <div>
              <dt>Cannot establish</dt>
              <dd>{c.whatItCannotEstablish}</dd>
            </div>
            <div>
              <dt>Handling rule</dt>
              <dd>{c.handlingRule}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

/**
 * The practice scenario. The fictional label comes first in the DOM and is the
 * group's accessible name, so it is announced before the situation.
 */
export function SimulatedConcernScenario() {
  const sc = concernScenario;
  return (
    <div className="practiceScenario" role="group" aria-labelledby="practice-scenario-label">
      <p className="practiceLabel" id="practice-scenario-label">
        {sc.visibleScenarioLabel}
      </p>
      {sc.situation.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
      <p className="practiceTask">
        <strong>{sc.task}</strong>
      </p>
      <ol className="practiceItems">
        {sc.items.map((item) => <li key={item.text}>{item.text}</li>)}
      </ol>
      <p className="practiceQuestion">
        <strong>{sc.finalQuestion}</strong>
      </p>
      {/* Plain text, never form controls: the page records nothing. */}
      <ul className="practiceChoices">
        {sc.nextStepChoices.map((choice) => <li key={choice}>{choice}</li>)}
      </ul>
    </div>
  );
}

/** The answer key, collapsed by default and grouped by category. */
export function ConcernScenarioAnswerKey() {
  const sc = concernScenario;
  return (
    <details className="guideDetails answerKey">
      <summary>Check the concern map</summary>
      <dl className="answerKeyList">
        {scenarioItemsByCategory().map(({ category, items }) => (
          <div key={category.id}>
            <dt>{category.label}</dt>
            <dd>
              <ul>
                {items.map((i) => <li key={i.text}>{i.because ?? i.text}</li>)}
              </ul>
            </dd>
          </div>
        ))}
        <div>
          <dt>Next step</dt>
          <dd>{sc.answerKeyNextStep}</dd>
        </div>
      </dl>
      <p className="muted">{sc.answerKeyClosing}</p>
    </details>
  );
}

/**
 * Detection guidance. The durable position and the equity note always render; the
 * two institutional claims are withheld once the record is overdue, with the
 * stale state stated in text.
 */
export function DetectionGuidance() {
  const g = aiDetectionGuidance;
  const claims = displayableInstitutionalClaims();
  const stale = detectionGuidanceIsStale();
  return (
    <div className="detectionGuidance">
      <p className="detectionChecked">
        <time dateTime={g.verifiedOn}>
          Detection guidance checked {formatReviewDate(g.verifiedOn)}
        </time>
      </p>
      <dl>
        <div>
          <dt>Current Stanford position</dt>
          <dd>{g.currentStanfordPosition}</dd>
        </div>
        {claims ? (
          <>
            <div>
              <dt>Advance notice</dt>
              <dd>{claims.advanceNoticeRule}</dd>
            </div>
            <div>
              <dt>Campus support</dt>
              <dd>{claims.campusSupportStatus}</dd>
            </div>
          </>
        ) : (
          <div>
            <dt>Advance notice and campus support</dt>
            <dd>
              {g.staleLabel}. Confirm the current position with the Office of Community Standards and
              Stanford Teaching Commons before adopting or using a detection tool.
            </dd>
          </div>
        )}
        <div>
          <dt>Fairness</dt>
          <dd>{g.equityNote}</dd>
        </div>
      </dl>
      {stale && (
        <p className="muted detectionMaintenance">
          Maintenance note: this insert is past its review date, so the campus-support and
          advance-notice claims are withheld until a maintainer re-reads the Stanford sources.
        </p>
      )}
    </div>
  );
}

/** The neutral conversation: an opening that disclaims a conclusion, then questions. */
export function ConversationGuide() {
  return (
    <div className="conversationGuide">
      <p className="conversationOpeningLabel" id="conversation-opening-label">
        Sample opening
      </p>
      <blockquote className="conversationOpening" aria-labelledby="conversation-opening-label">
        <p>{conversationOpening}</p>
      </blockquote>
      <p className="conversationQuestionsHead" id="conversation-questions-head">
        Neutral questions
      </p>
      <ol className="conversationQuestions" aria-labelledby="conversation-questions-head">
        {conversationQuestions.map((q) => <li key={q}>{q}</li>)}
      </ol>
      <p className="conversationLimits">
        <span className="auditFieldLabel">Limits</span>
        {conversationLimits}
      </p>
    </div>
  );
}

/** Graded and ungraded work as two balanced cards. */
export function GradedUngradedPaths() {
  return (
    <div className="workTypePaths">
      {[...workTypePaths]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((path) => (
          <article className="workTypeCard" key={path.id}>
            <h3>{path.title}</h3>
            <p>{path.body}</p>
            <p className="workTypeExamplesHead" id={`work-${path.id}-examples`}>Examples</p>
            <ul aria-labelledby={`work-${path.id}-examples`}>
              {path.examples.map((e) => <li key={e}>{e}</li>)}
            </ul>
            <p className="workTypeAction">
              <span className="auditFieldLabel">Action</span>
              {path.action}
            </p>
          </article>
        ))}
    </div>
  );
}

/** The link to the safe-sharing guide, used wherever student material is discussed. */
export function CheckTheServiceLink({ children }: { children: string }) {
  return <Link href={SAFE_SHARING_GUIDE}>{children}</Link>;
}

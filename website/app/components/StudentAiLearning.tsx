import Link from "next/link";
import { formatReviewDate } from "../lib/guides";
import {
  assignmentAiBoundary,
  boundaryCopyText,
  orderedBoundaryFields,
} from "../lib/assignmentAiBoundary";
import {
  caseBriefParts,
  caseBriefStressTest,
  orderedRubricCriteria,
  rubricDisclaimer,
} from "../lib/caseBriefStressTest";
import {
  courseCategories,
  orderedActivityPatterns,
  patternsInCategory,
  type ActivityPattern,
} from "../lib/lawAiLearningPatterns";
import { slsStudentAiPolicy, SLS_STUDENT_AI_POLICY_URL } from "../lib/slsStudentAiPolicy";
import {
  literacyCards,
  launchChecks,
  neverAskFor,
  orderedAssignmentModes,
  orderedDesignChecks,
  proportionateEvidence,
} from "../lib/studentAiLearningDesign";
import { CopyPrompt } from "./CopyPrompt";

/* ---------------------------------------------------------------------------
   Components for "How can students use AI and still learn the law?".

   Deliberately absent: any assignment generator, policy generator, grading tool,
   student-work upload, detector, chatbot, or model call. Nothing on this page
   evaluates an assignment or a student — it renders records a faculty member
   reads, adapts, and copies out.

   Two structural properties matter. The design checks and activity patterns are
   ordered lists, so the sequence (name the legal capability, then bound the tool)
   survives without styling. And the strong/weak example pair on each design check
   is labelled in text: the contrast is the teaching, and it cannot depend on a
   colour a reader may not see.

   The category filter is a progressive enhancement built from anchor links, not
   JavaScript state. Every pattern is in the DOM at all times; the filter narrows
   attention, it never gates access.
   ------------------------------------------------------------------------- */

/** The five design checks, in order. Numbered, with both examples labelled. */
export function DesignChecks() {
  return (
    <ol className="designChecks">
      {orderedDesignChecks().map((check) => (
        <li className="designCheck" key={check.id} id={`design-${check.id}`}>
          <h3>
            <span className="designCheckNumber" aria-hidden="true">{check.number}</span>
            {check.title}
          </h3>
          <p className="designQuestion">{check.designQuestion}</p>
          <p className="designPurpose">{check.purpose}</p>
          <dl className="designExamples">
            <div className="designStrong">
              <dt>Stronger</dt>
              <dd>{check.strongExample}</dd>
            </div>
            <div className="designWeak">
              <dt>Weaker</dt>
              <dd>{check.weakExample}</dd>
            </div>
          </dl>
          <p className="designEvidence">
            <span className="auditFieldLabel">Evidence of learning</span>
            {check.evidenceOfLearning}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** The five assignment modes as balanced cards, with starter policy language. */
export function AssignmentModes() {
  return (
    <div className="assignmentModes">
      {orderedAssignmentModes().map((mode) => (
        <article className="assignmentMode" key={mode.id} id={`mode-${mode.id}`}>
          <h3>{mode.title}</h3>
          <p className="modeDescription">{mode.description}</p>
          <dl>
            <div>
              <dt>Best when</dt>
              <dd>{mode.bestWhen}</dd>
            </div>
            <div>
              <dt>Student responsibility</dt>
              <dd>{mode.studentResponsibility}</dd>
            </div>
            <div>
              <dt>Example</dt>
              <dd>{mode.example}</dd>
            </div>
          </dl>
          <p className="modeStarterHead">Starter language</p>
          <blockquote className="modeStarter">
            <p>{mode.policyLanguageStarter}</p>
          </blockquote>
        </article>
      ))}
    </div>
  );
}

/** One activity pattern. Every field is visible; nothing hides in a disclosure. */
function ActivityCard({ pattern }: { pattern: ActivityPattern }) {
  return (
    <article className="activityPattern" key={pattern.id} id={`activity-${pattern.id}`}>
      <h3>{pattern.title}</h3>
      <p className="activityBestFor">
        <span className="auditFieldLabel">Best for</span>
        {pattern.bestFor}
      </p>
      <dl className="activityFields">
        <div>
          <dt>Legal learning objective</dt>
          <dd>{pattern.legalLearningObjective}</dd>
        </div>
        <div>
          <dt>AI role</dt>
          <dd>{pattern.aiRole}</dd>
        </div>
      </dl>
      <p className="activitySequenceHead" id={`activity-${pattern.id}-sequence`}>
        Student sequence
      </p>
      <ol className="activitySequence" aria-labelledby={`activity-${pattern.id}-sequence`}>
        {pattern.studentSequence.map((step) => <li key={step}>{step}</li>)}
      </ol>
      <dl className="activityFields">
        <div>
          <dt>Evidence of learning</dt>
          <dd>{pattern.evidenceOfLearning}</dd>
        </div>
        <div>
          <dt>Sample deliverable</dt>
          <dd>{pattern.sampleDeliverable}</dd>
        </div>
        <div>
          <dt>Guardrails</dt>
          <dd>{pattern.guardrails}</dd>
        </div>
      </dl>
      <p className="activityMeta">
        <span className="pill">
          <span className="dot" aria-hidden="true" />
          Preparation: {pattern.preparationLevel}
        </span>
        <span className="pill">
          <span className="dot" aria-hidden="true" />
          {pattern.estimatedClassUse}
        </span>
      </p>
      {pattern.relatedGuideSlug && (
        <p className="activityRelated">
          <Link href={`/learn-ai/${pattern.relatedGuideSlug}`}>
            Open the underlying method
          </Link>
        </p>
      )}
    </article>
  );
}

/**
 * The activity library. The filter is a row of same-page anchors: each course
 * type links to a heading that lists the matching patterns by name, so a reader
 * can jump without JavaScript and nothing is ever hidden.
 */
export function ActivityLibrary() {
  const patterns = orderedActivityPatterns();
  return (
    <>
      <nav className="activityFilter" aria-labelledby="activity-filter-label">
        <p className="activityFilterLabel" id="activity-filter-label">
          Jump to the patterns that fit your course
        </p>
        <ul>
          {courseCategories.map(({ id, label }) => (
            <li key={id}>
              <a className="textLink" href={`#course-${id}`}>
                {label} <span className="muted">({patternsInCategory(id).length})</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* All six render here, unfiltered, in a fixed order — not ranked. */}
      <div className="activityList">
        {patterns.map((pattern) => <ActivityCard key={pattern.id} pattern={pattern} />)}
      </div>

      <div className="activityByCourse">
        <h3 id="activity-by-course-heading">Which patterns fit which course type</h3>
        <dl>
          {courseCategories.map(({ id, label }) => (
            <div key={id} id={`course-${id}`}>
              <dt>{label}</dt>
              <dd>
                <ul>
                  {patternsInCategory(id).map((p) => (
                    <li key={p.id}>
                      <a className="textLink" href={`#activity-${p.id}`}>{p.title}</a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

/** The complete Case Brief Stress Test — six parts, nothing left to invent. */
export function CaseBriefStressTest() {
  const a = caseBriefStressTest;
  return (
    <div className="caseBriefActivity">
      <dl className="caseBriefMeta">
        <div>
          <dt>Purpose</dt>
          <dd>{a.purpose}</dd>
        </div>
        <div>
          <dt>Material</dt>
          <dd>{a.material}</dd>
        </div>
      </dl>
      <ol className="caseBriefParts">
        {caseBriefParts.map((part) => (
          <li className="caseBriefPart" key={part.number}>
            <h3>
              Part {part.number} &mdash; {part.title}
              {part.independentAttempt && (
                <span className="pill caseBriefFirst">
                  <span className="dot" aria-hidden="true" />
                  Before any AI use
                </span>
              )}
            </h3>
            <p>{part.instruction}</p>
            {part.items && (
              <ul>
                {part.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The sample rubric. Weights are labelled as an example in rendered text. */
export function SampleRubric() {
  return (
    <div className="sampleRubric">
      <dl>
        {orderedRubricCriteria().map((c) => (
          <div className="rubricCriterion" key={c.id}>
            <dt>
              {c.title}
              <span className="rubricWeight">Suggested weight: {c.suggestedWeight}%</span>
            </dt>
            <dd>
              <span className="auditFieldLabel">Looks for</span>
              {c.looksFor}
            </dd>
          </div>
        ))}
      </dl>
      <p className="muted rubricDisclaimer">{rubricDisclaimer}</p>
    </div>
  );
}

/** Proportionate process evidence, and the things never to ask for. */
export function ProcessEvidenceLists() {
  return (
    <div className="evidenceLists">
      <div>
        <p className="evidenceListHead" id="evidence-useful-head">
          Useful process evidence may include
        </p>
        <ul aria-labelledby="evidence-useful-head">
          {proportionateEvidence.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div>
        <p className="evidenceListHead" id="evidence-never-head">Do not ask for</p>
        <ul className="evidenceNever" aria-labelledby="evidence-never-head">
          {neverAskFor.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

/** The four kinds of AI judgment, taught through the legal task. */
export function AiLiteracyCards() {
  return (
    <div className="literacyCards">
      {literacyCards.map((card) => (
        <article className="literacyCard" key={card.id}>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </article>
      ))}
    </div>
  );
}

/** The five pre-launch questions, as a checklist. */
export function LaunchChecklist() {
  return (
    <ol className="launchChecklist">
      {launchChecks.map((check) => (
        <li key={check.label}>
          <p className="launchLabel">{check.label}</p>
          <p className="launchQuestion">{check.question}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * The SLS policy card. The official link is always rendered as descriptive text —
 * never as an icon alone — and nothing about the policy's contents is stated,
 * because its wording is unconfirmed. `slsPolicyIsConfirmed()` gates any summary,
 * and the record's validator refuses to let one exist without a confirmation trail.
 */
export function SlsPolicyCard() {
  const p = slsStudentAiPolicy;
  return (
    <section className="slsPolicyCard" aria-labelledby="sls-policy-card-heading">
      <p className="eyebrow">SLS policy</p>
      <h2 id="sls-policy-card-heading">{p.title}</h2>
      <p className="slsPolicyPublisher">{p.owner}</p>
      <p>
        Review the current SLS policy before finalizing course or assignment instructions. The
        official page controls over any summary on this site.
      </p>
      <div className="actions">
        <a
          className="primary"
          href={SLS_STUDENT_AI_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the current SLS policy
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
        <a
          className="secondary"
          href="https://communitystandards.stanford.edu/generative-ai-policy-guidance"
          target="_blank"
          rel="noopener noreferrer"
        >
          Review Stanford&rsquo;s generative AI coursework guidance
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}

/** A restrained inline link to the official SLS policy, for use near the top. */
export function SlsPolicyLink({ children }: { children?: string }) {
  return (
    <a href={SLS_STUDENT_AI_POLICY_URL} target="_blank" rel="noopener noreferrer">
      {children ?? "Review the current SLS student AI policy"}
      <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
      <span className="srOnly"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * The assignment boundary. Visible field list and copyable block come from the
 * same records, so what a faculty member reads is what they paste. Nothing is
 * sent anywhere and nothing they type is retained.
 */
export function AssignmentAiBoundary() {
  const copyText = boundaryCopyText();
  return (
    <div className="boundaryTemplate">
      <p>{assignmentAiBoundary.intro}</p>
      <dl className="boundaryFields">
        {orderedBoundaryFields().map((f) => (
          <div className="boundaryField" key={f.id}>
            <dt>{f.label}</dt>
            <dd>
              {f.question && <p className="boundaryQuestion">{f.question}</p>}
              {f.choices && (
                <ul className="boundaryChoices">
                  {f.choices.map((c) => <li key={c}>{c}</li>)}
                </ul>
              )}
              {f.examples && (
                <p className="boundaryExamples">
                  <span className="auditFieldLabel">Examples</span>
                  {f.examples}
                </p>
              )}
              {f.requirement && (
                <p className="boundaryRequirement">
                  <span className="auditFieldLabel">Requirement</span>
                  {f.requirement}
                </p>
              )}
              {f.fixedText && <p className="boundaryFixed">{f.fixedText}</p>}
            </dd>
          </div>
        ))}
      </dl>

      <h3 id="boundary-copy-heading">Copy an assignment AI learning boundary</h3>
      {/* Shown as text so it is readable and usable with JavaScript disabled. */}
      <pre className="boundaryCopyText">{copyText}</pre>
      <div className="actions">
        <CopyPrompt
          text={copyText}
          label="Copy assignment AI learning boundary"
          itemLabel="Assignment AI learning boundary"
        />
      </div>
      <p className="muted boundaryAttribution">
        {assignmentAiBoundary.sourceAttribution}{" "}
        <a href={assignmentAiBoundary.sourceUrl} target="_blank" rel="noopener noreferrer">
          Creating Your Course Policy on AI
          <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
          <span className="srOnly"> (opens in a new tab)</span>
        </a>{" "}
        ({assignmentAiBoundary.sourceLicense}). Reviewed{" "}
        <time dateTime={assignmentAiBoundary.reviewedOn}>
          {formatReviewDate(assignmentAiBoundary.reviewedOn)}
        </time>
        . Nothing you type here is sent anywhere or stored.
      </p>
    </div>
  );
}

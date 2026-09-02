import Link from "next/link";
import { modeTitle } from "../lib/aiToolModes";
import {
  citationAnatomy,
  feistExercise,
  orderedEvidenceStates,
  orderedSourceModeNotes,
} from "../lib/citationProvenance";
import { formatReviewDate, getGuide, guideHref } from "../lib/guides";
import { verificationOutcomes } from "../lib/legalClaimAudit";
import {
  displayableCount,
  evidenceSnapshotIsStale,
  legalHallucinationEvidence,
} from "../lib/legalHallucinationEvidence";

/* ---------------------------------------------------------------------------
   Components for "Why did it invent a case?".

   Deliberately absent: any control that appears to check a citation. There is
   no input, no form, no lookup call, no confidence score, and no "verified"
   badge. The exercise is something a person does in a real research
   environment; a widget here would teach the opposite lesson.

   Two things carry real risk and are handled structurally rather than by
   styling. First, the simulated claim is fictional and must never read as fact:
   its label precedes it in the DOM, it is programmatically associated with the
   claim, and it is wrapped in data-nosnippet. Second, the tracker count expires;
   the component reads it through displayableCount() so a stale record withholds
   the number rather than presenting an old figure as current.
   ------------------------------------------------------------------------- */

const AUDIT_GUIDE = guideHref("verify-an-ai-legal-claim");

/**
 * Source-mode notes. The mode's title comes from the canonical taxonomy, so a
 * renamed mode renames here; only the citation-specific fields live in the
 * relationship record. No product names, no ranking, no current examples.
 */
export function CitationSourceModeNotes() {
  return (
    <div className="provenanceList">
      {orderedSourceModeNotes().map((note) => (
        <article className="provenanceCard" key={note.id}>
          <h3>{modeTitle(note.modeId)}</h3>
          <p className="provenanceStatus">
            <span className="auditFieldLabel">Citation status</span>
            {note.citationStatus}
          </p>
          <dl>
            <div>
              <dt>What is known</dt>
              <dd>{note.whatYouKnow}</dd>
            </div>
            <div>
              <dt>What remains uncertain</dt>
              <dd>{note.remainingRisk}</dd>
            </div>
            <div>
              <dt>Faculty action</dt>
              <dd>{note.facultyAction}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

/**
 * The parts of a citation, each with its own verification question. The fragment
 * comes from the exercise record, so there is one copy of the fictional citation
 * in the codebase. Labels and questions carry the meaning; no arrows or colour
 * are load-bearing.
 */
export function CitationAnatomy() {
  return (
    <ol className="citationAnatomy" data-nosnippet>
      {citationAnatomy.map((part, index) => (
        <li className="anatomyPart" key={part.label}>
          <h3>
            <span className="anatomyPartNumber" aria-hidden="true">{index + 1}</span>
            {part.label}
          </h3>
          <p className="citationFragment">
            <span className="srOnly">From the simulated citation: </span>
            {part.fragment}
          </p>
          <p className="anatomyExplanation">{part.explanation}</p>
          <p className="anatomyQuestion">
            <span className="auditFieldLabel">Verification question</span>
            {part.verificationQuestion}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * The four evidence states as an ordered list. Each states what it establishes
 * and — the part that matters — what it does not. No score, no percentage, no
 * badge, and nothing that advances a state on its own.
 */
export function AuthorityEvidenceStates() {
  return (
    <ol className="evidenceStates">
      {orderedEvidenceStates().map((state) => (
        <li className="evidenceState" key={state.id}>
          <h3>
            <span className="evidenceStateNumber" aria-hidden="true">{state.displayOrder}</span>
            {state.label}
          </h3>
          <p className="evidencePresent">{state.evidencePresent}</p>
          <dl>
            <div>
              <dt>Establishes</dt>
              <dd>{state.whatItEstablishes}</dd>
            </div>
            <div>
              <dt>Does not establish</dt>
              <dd>{state.whatItDoesNotEstablish}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}

/**
 * The simulated claim. The label and the "party names are fictional" line come
 * first in the DOM and are both referenced by aria-labelledby, so a screen
 * reader announces them before the claim itself. data-nosnippet keeps the
 * fictional proposition out of search-engine previews.
 */
export function SimulatedCitationClaim() {
  const ex = feistExercise;
  return (
    <div
      className="simulatedClaim"
      role="group"
      aria-labelledby="simulated-citation-label simulated-citation-support"
      data-nosnippet
    >
      <p className="simulatedLabel" id="simulated-citation-label">
        {ex.visibleSimulationLabel}
      </p>
      <p className="simulatedSupport" id="simulated-citation-support">
        {ex.supportingLabel}
      </p>
      <blockquote className="simulatedClaimText">
        <p>{ex.claim}</p>
      </blockquote>
      <p className="simulatedNotTranscript muted">
        Written by Law Library staff to illustrate a failure pattern. It is not a transcript of any
        product&rsquo;s output.
      </p>
    </div>
  );
}

/** The exercise steps, from the record. Choices are text, never form controls. */
export function SimulatedCitationSteps() {
  const ex = feistExercise;
  return (
    <ol className="guideSteps">
      {ex.steps.map((step, index) => (
        <li key={step.instruction}>
          <p>
            <strong>{step.instruction}</strong>
          </p>
          {index === 0 && (
            <p className="citationFragment">{ex.citationSearchString}</p>
          )}
          {step.options && (
            <ul className={step.isClassification ? "classifyList" : undefined}>
              {step.options.map((option) => <li key={option}>{option}</li>)}
            </ul>
          )}
          {step.question && <p className="exerciseQuestion">{step.question}</p>}
          {index === ex.steps.length - 1 && (
            <p>
              <Link href={AUDIT_GUIDE}>Run the four-step legal claim audit</Link>
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * The reference links for the exercise. Separate from the claim block so the
 * official source sits next to the instructions rather than inside the
 * data-nosnippet region that holds the fictional text.
 */
export function SimulatedCitationSources() {
  const ex = feistExercise;
  return (
    <dl className="simulatedMeta exerciseSources">
      <div>
        <dt>Official source</dt>
        <dd>
          <a href={ex.officialSourceUrl} target="_blank" rel="noopener noreferrer">
            United States Reports record for {ex.citationSearchString}
            <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
            <span className="srOnly"> (opens in a new tab)</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Accessible reading copy</dt>
        <dd>
          <a href={ex.accessibleReadingUrl} target="_blank" rel="noopener noreferrer">
            Full text at the Legal Information Institute
            <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
            <span className="srOnly"> (opens in a new tab)</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Exercise reviewed</dt>
        <dd>
          <time dateTime={ex.sourceReviewedOn}>{formatReviewDate(ex.sourceReviewedOn)}</time>
          {" · next review due "}
          <time dateTime={ex.sourceReviewBy}>{formatReviewDate(ex.sourceReviewBy)}</time>
        </dd>
      </div>
    </dl>
  );
}

/**
 * The answer key, collapsed by default. It is inside data-nosnippet because it
 * restates the simulated proposition in order to correct it, and a search
 * snippet would strip the correction.
 */
export function SimulatedCitationAnswerKey() {
  const ex = feistExercise;
  const outcome = verificationOutcomes.find((o) => o.id === ex.correctOutcomeId);
  return (
    <details className="guideDetails answerKey" data-nosnippet>
      <summary>Check the audit result</summary>
      <p className="answerKeyOutcome">
        <span className="auditFieldLabel">Outcome</span>
        <strong>{outcome?.label}</strong>
      </p>
      <dl className="answerKeyList">
        <div>
          <dt>Identity check</dt>
          <dd>{ex.answerKey.identityResult}</dd>
        </div>
        <div>
          <dt>Support check</dt>
          <dd>{ex.answerKey.supportResult}</dd>
        </div>
        <div>
          <dt>Failure type</dt>
          <dd>{ex.answerKey.failureExplanation}</dd>
        </div>
        <div>
          <dt>What the exercise shows</dt>
          <dd>{ex.answerKey.whatItShows}</dd>
        </div>
        <div>
          <dt>Next step</dt>
          <dd>
            {ex.answerKey.nextStep}{" "}
            <Link href={AUDIT_GUIDE}>Open the legal claim verification guide</Link>.
          </dd>
        </div>
      </dl>
      <p className="muted">{ex.answerKey.scopeNote}</p>
    </details>
  );
}

/**
 * The dated tracker insert. The number is read through displayableCount() so
 * that once reviewBy has passed the figure disappears and the stale message
 * takes its place — in text, not by colour. The link to the live source stays in
 * both states, and nothing here fetches anything.
 */
export function EvidenceSnapshot() {
  const e = legalHallucinationEvidence;
  const count = displayableCount();
  const stale = evidenceSnapshotIsStale();
  return (
    <section className="evidenceSnapshot" aria-labelledby="evidence-snapshot-heading">
      <p className="eyebrow">Documented record</p>
      <h2 id="evidence-snapshot-heading">This failure pattern is not hypothetical</h2>

      {count === null ? (
        <div className="evidenceFigure evidenceFigureStale">
          <p className="evidenceCount">{e.staleLabel}</p>
          <p className="evidenceStaleNote">{e.staleGuidance}</p>
        </div>
      ) : (
        <div className="evidenceFigure">
          <p className="evidenceCount">
            <strong>{count.toLocaleString("en-US")}</strong> {e.countLabel}
          </p>
          {/* "Source last updated" is only shown when the source actually publishes
              a date. This database does not, so the line is omitted rather than
              filled with the date somebody read the page — that is "Count
              checked", and conflating the two would state something about the
              database that the database does not state. */}
          <p className="evidenceDates">
            {e.sourceLastUpdated !== null && (
              <>
                <time dateTime={e.sourceLastUpdated}>
                  Source last updated {formatReviewDate(e.sourceLastUpdated)}
                </time>
                {" · "}
              </>
            )}
            <time dateTime={e.verifiedOn}>Count checked {formatReviewDate(e.verifiedOn)}</time>
          </p>
        </div>
      )}

      <p>
        Courts and tribunals have addressed hallucinated legal material often enough that the decisions
        are tracked publicly. The changing count belongs in this dated insert, not in the durable
        explanation above.
      </p>
      <p className="evidenceScope">{e.scopeDescription}</p>
      <p className="evidenceLimitation">
        <span className="auditFieldLabel">What this figure is not</span>
        {e.limitation}
      </p>
      <p className="evidenceLink">
        <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer">
          View the live {e.sourceTitle} database
          <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
      </p>
      {stale && (
        <p className="muted evidenceMaintenance">
          Maintenance note: this count is past its review date, so the number is withheld until a
          maintainer re-reads the source.
        </p>
      )}
    </section>
  );
}

/**
 * Related guides as restrained cards. Titles come from the guide records, so a
 * retitled guide retitles the card; only the one-line "why you would read it
 * next" description is supplied by the page.
 */
export function RelatedGuideLinks({
  guides,
}: {
  guides: { slug: string; description: string }[];
}) {
  return (
    <div className="relatedGuides">
      {guides.map(({ slug, description }) => (
        <Link className="card interactive relatedGuideCard" href={guideHref(slug)} key={slug}>
          <h3>{getGuide(slug).title}</h3>
          <p className="muted">{description}</p>
          <span className="explore">Read the guide &rarr;</span>
        </Link>
      ))}
    </div>
  );
}

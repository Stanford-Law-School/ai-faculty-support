import type { ReactNode } from "react";
import {
  auditSteps,
  exerciseStatusIsStale,
  failureModes,
  lnuExercise,
  sourceTypeChecks,
  verificationOutcomes,
} from "../lib/legalClaimAudit";
import { verificationToolsWithProducts } from "../lib/legalVerificationTools";
import { formatReviewDate } from "../lib/guides";

/* ---------------------------------------------------------------------------
   Components for the legal claim verification guide.

   Deliberately absent: any progress bar, score, percentage, confidence meter,
   "verified by AI" badge, or control that claims to run the verification. The
   audit is something a person does against a source; a widget that appeared to
   do it would defeat the guide.

   Everything renders as static markup, so the whole page works with JavaScript
   disabled and prints legibly.
   ------------------------------------------------------------------------- */

/** The four steps, as a semantic ordered list. None is hidden in a disclosure. */
export function LegalClaimAudit() {
  return (
    <ol className="auditList">
      {[...auditSteps]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((step) => (
          <li className="auditStep" key={step.id} id={`audit-${step.id}`}>
            <h3>
              <span className="auditStepNumber" aria-hidden="true">{step.number}</span>
              {step.title}
            </h3>
            <p className="auditQuestion">{step.shortQuestion}</p>
            <p>{step.explanation}</p>
            <p className="auditChecksHead" id={`audit-${step.id}-checks`}>
              What to check
            </p>
            <ul className="auditChecks" aria-labelledby={`audit-${step.id}-checks`}>
              {step.checks.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <p className="auditStopRule">
              <span className="auditStopLabel">Stop rule</span>
              {step.stopRule}
            </p>
            <p className="auditEvidence">
              <span className="auditFieldLabel">Evidence to keep</span>
              {step.requiredEvidence}
            </p>
          </li>
        ))}
    </ol>
  );
}

/** Failure modes, each naming the step that catches it. */
export function ClaimFailureModes() {
  return (
    <dl className="failureList">
      {[...failureModes]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((mode) => (
          <div className="failureItem" key={mode.id}>
            <dt>{mode.title}</dt>
            <dd>
              <p className="failureDescription">{mode.description}</p>
              <p className="failureExample">
                <span className="auditFieldLabel">Example</span>
                {mode.example}
              </p>
              <p className="failureCaught">
                <span className="auditFieldLabel">Caught by</span>
                {mode.auditStepIds
                  .map((id) => auditSteps.find((s) => s.id === id)?.title ?? id)
                  .join(" · ")}
              </p>
            </dd>
          </div>
        ))}
    </dl>
  );
}

/**
 * The simulated claim. The label comes first in the DOM so a screen reader
 * announces "simulated, deliberately flawed" before the claim itself, and it is
 * stated in text — the dashed border and colour are reinforcement only.
 */
export function SimulatedAiClaim() {
  const ex = lnuExercise;
  return (
    <div className="simulatedClaim" role="group" aria-labelledby="simulated-claim-label">
      <p className="simulatedLabel" id="simulated-claim-label">
        {ex.simulationLabel}
      </p>
      <blockquote className="simulatedClaimText">
        <p>{ex.claim}</p>
      </blockquote>
      <dl className="simulatedMeta">
        <div>
          <dt>Source as supplied</dt>
          <dd>{ex.sourceCitation}</dd>
        </div>
        <div>
          <dt>Public reading copy</dt>
          <dd>
            <a href={ex.publicReadingUrl} target="_blank" rel="noopener noreferrer">
              Ninth Circuit copy of the order (PDF)
              <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
              <span className="srOnly"> (opens in a new tab)</span>
            </a>
            {ex.alternateReadingUrl && (
              <>
                {" · "}
                <a href={ex.alternateReadingUrl} target="_blank" rel="noopener noreferrer">
                  alternate copy
                  <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
                  <span className="srOnly"> (opens in a new tab)</span>
                </a>
              </>
            )}
          </dd>
        </div>
        <div>
          <dt>Official opinions search</dt>
          <dd>
            <a href={ex.officialStatusCheckUrl} target="_blank" rel="noopener noreferrer">
              Ninth Circuit opinions
              <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
              <span className="srOnly"> (opens in a new tab)</span>
            </a>
          </dd>
        </div>
        <div>
          <dt>Case status checked</dt>
          <dd>
            <time dateTime={ex.sourceStatusCheckedOn}>
              {formatReviewDate(ex.sourceStatusCheckedOn)}
            </time>
            {" · next check due "}
            <time dateTime={ex.sourceStatusReviewBy}>
              {formatReviewDate(ex.sourceStatusReviewBy)}
            </time>
          </dd>
        </div>
      </dl>
      {exerciseStatusIsStale() && (
        <p className="caution simulatedStale">
          <strong>Maintenance note.</strong> This exercise&rsquo;s case-status check is overdue.
          Confirm the current status of the order before relying on the exercise.
        </p>
      )}
    </div>
  );
}

/** The answer key, collapsed by default so it does not pre-empt the exercise. */
export function ExerciseAnswerKey() {
  const ex = lnuExercise;
  const outcome = verificationOutcomes.find((o) => o.id === ex.answerKeyOutcomeId);
  return (
    <details className="guideDetails answerKey">
      <summary>Check the audit result</summary>
      <p className="answerKeyOutcome">
        <span className="auditFieldLabel">Outcome</span>
        <strong>{outcome?.label}</strong>
      </p>
      {ex.answerKeyExplanation.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
      <p className="auditChecksHead">Error categories the court identified</p>
      <ul>
        {ex.errorCategories.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </details>
  );
}

/** The five outcomes. Labels are text; nothing depends on a colour. */
export function VerificationOutcomeList() {
  return (
    <dl className="outcomeList">
      {[...verificationOutcomes]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((o) => (
          <div className="outcomeItem" key={o.id}>
            <dt>{o.label}</dt>
            <dd>
              <p>{o.definition}</p>
              <p className="outcomeNext">
                <span className="auditFieldLabel">Next action</span>
                {o.nextAction}
              </p>
            </dd>
          </div>
        ))}
    </dl>
  );
}

/**
 * Source-type checks. A definition list per source type, keeping the
 * Find · Read · Place · Update sequence, so nothing needs horizontal comparison
 * at 320px and every label travels with its value.
 */
export function LegalSourceTypeChecks() {
  return (
    <div className="sourceTypeList">
      {[...sourceTypeChecks]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((c) => (
          <article className="sourceTypeCard" key={c.id}>
            <h3>{c.title}</h3>
            <dl>
              <div><dt>Find</dt><dd>{c.findCheck}</dd></div>
              <div><dt>Read</dt><dd>{c.readCheck}</dd></div>
              <div><dt>Place</dt><dd>{c.placeCheck}</dd></div>
              <div><dt>Update</dt><dd>{c.updateCheck}</dd></div>
            </dl>
            <p className="sourceTypeTrap">
              <span className="auditFieldLabel">Common trap</span>
              {c.commonTrap}
            </p>
          </article>
        ))}
    </div>
  );
}

/**
 * Citators, with product facts read from the canonical registry. Presented in a
 * fixed display order, never ranked, and each carries the caveat that a signal
 * does not establish proposition support.
 */
export function LegalVerificationTools({ checkedOn }: { checkedOn: string }) {
  const pairs = verificationToolsWithProducts();
  return (
    <section className="serviceSnapshot" aria-labelledby="citators-heading">
      <h2 id="citators-heading">Current SLS legal research environments</h2>
      <p className="snapshotChecked">
        <time dateTime={checkedOn}>
          Product and citator descriptions checked {formatReviewDate(checkedOn)}
        </time>
      </p>
      <p>
        These services can help retrieve and update legal authority. They do not remove the need to
        read the source and compare it with the proposition.
      </p>
      <div className="toolCardList">
        {pairs.map(({ citator, product }) => (
          <article className="toolCard" key={citator.id}>
            <h3>{product.displayName}</h3>
            <p className="toolProvider">{product.provider}</p>
            <p className="citatorName">
              <span className="auditFieldLabel">Citator</span>
              {citator.citatorName}
            </p>
            <p className="toolFit">
              <span className="auditFieldLabel">What it helps check</span>
              {citator.primaryUse} {citator.historyUse}
            </p>
            <p className="citatorCaveat">
              <span className="auditFieldLabel">Proposition caveat</span>
              {citator.propositionCaveat}
            </p>
            <p className="toolAccess">
              <span className="toolLabel">Access</span>
              {product.accessLabel}
            </p>
            <p className="toolLinks">
              {product.accessUrl && (
                <>
                  <a href={product.accessUrl} target="_blank" rel="noopener noreferrer">
                    Open the service
                    <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
                    <span className="srOnly"> (opens in a new tab)</span>
                  </a>
                  {" · "}
                </>
              )}
              <a href={citator.officialCitatorUrl} target="_blank" rel="noopener noreferrer">
                About {citator.citatorName}
                <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
                <span className="srOnly"> (opens in a new tab)</span>
              </a>
            </p>
          </article>
        ))}
      </div>
      <div className="note">
        <p>
          Interfaces, signals, and academic feature access can change. Confirm the current SLS
          interface or ask the Law Library when a feature described here is not visible.
        </p>
      </div>
    </section>
  );
}

/** A labelled block of worksheet lines, shown as text and copied as text. */
export function AuditWorksheet({ sections }: { sections: { heading: string; lines: string[] }[] }) {
  return (
    <div className="worksheet">
      {sections.map(({ heading, lines }) => (
        <div className="worksheetSection" key={heading}>
          <p className="worksheetHeading">{heading}</p>
          <ul className="worksheetLines">
            {lines.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** A restrained aside used for the citator caveat and similar notes. */
export function QuietCallout({ children }: { children: ReactNode }) {
  return <div className="quietCallout">{children}</div>;
}

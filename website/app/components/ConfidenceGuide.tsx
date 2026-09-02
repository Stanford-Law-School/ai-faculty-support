import type { ReactNode } from "react";
import { claimStatusNote, orderedClaimStatuses } from "../lib/aiClaimStatuses";
import {
  evidenceFrameworkClosingNote,
  orderedEvidenceUncertaintySteps,
} from "../lib/evidenceUncertaintyFramework";
import {
  confidenceAuditAnswerKey,
  confidenceAuditExercise,
  ledgerCopy,
  ledgerSections,
  ledgerText,
} from "../lib/confidenceAuditExercise";
import {
  evidenceUncertaintyPromptNote,
  getEvidenceUncertaintyPrompt,
} from "../lib/evidenceUncertaintyPrompts";
import { CopyPrompt } from "./CopyPrompt";
import { PromptBlock } from "./GuideBlocks";
import { AuditWorksheet } from "./LegalVerification";

/* ---------------------------------------------------------------------------
   Blocks for "Why does it sound so certain?".

   Everything renders from the records in app/lib/aiClaimStatuses.ts,
   evidenceUncertaintyFramework.ts, confidenceAuditExercise.ts, and
   evidenceUncertaintyPrompts.ts.

   Nothing here scores a claim, classifies a claim, measures confidence, or calls
   a service. The reader assigns the statuses; the page only shows what the five
   of them mean. The whole interaction budget is two copy buttons.

   The simulated response carries real risk and is handled structurally rather
   than by styling: its label precedes it in the DOM, is programmatically
   associated with it, and the block is wrapped in data-nosnippet. The claim
   strings live in the data record and nowhere else, so they cannot reach a meta
   description, an Open Graph string, or the search index.
   ------------------------------------------------------------------------- */

/**
 * The five things a sentence in a generated answer can be. A definition list
 * inside an ordered list: every field is labelled in text, so nothing depends on
 * a colour, an icon, or a position in a grid.
 */
export function ClaimStatusCards() {
  return (
    <>
      <ol className="claimStatuses">
        {orderedClaimStatuses().map((status) => (
          <li className="claimStatus" key={status.id}>
            <h3 className="claimStatusTitle">{status.title}</h3>
            <dl className="claimStatusFields">
              <dt>Definition</dt>
              <dd>{status.definition}</dd>
              <dt>Evidence needed</dt>
              <dd>{status.evidenceNeeded}</dd>
              <dt>Uncertainty question</dt>
              <dd>{status.uncertaintyQuestion}</dd>
              <dt>Faculty action</dt>
              <dd className="claimStatusAction">{status.facultyAction}</dd>
              <dt>Example</dt>
              <dd className="claimStatusExample">{status.example}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <p className="claimStatusNote">{claimStatusNote}</p>
    </>
  );
}

/**
 * Claim · Evidence · Uncertainty · Next check, as a semantic ordered list. The
 * numbers come from the records rather than a CSS counter, so they survive being
 * read aloud and being printed.
 */
export function EvidenceUncertaintyFramework() {
  return (
    <>
      <ol className="evidenceSteps">
        {orderedEvidenceUncertaintySteps().map((step) => (
          <li className="evidenceStep" key={step.id}>
            <p className="evidenceStepHead">
              <span className="evidenceStepNumber" aria-hidden="true">
                {step.number}
              </span>
              <span className="evidenceStepTitle">{step.title}</span>
            </p>
            <dl className="evidenceStepFields">
              <dt>Question</dt>
              <dd>{step.question}</dd>
              <dt>Action</dt>
              <dd>{step.action}</dd>
              <dt>Output</dt>
              <dd className="evidenceStepOutput">{step.output}</dd>
              <dt>Common failure</dt>
              <dd>{step.commonFailure}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <p className="evidenceClosingNote">{evidenceFrameworkClosingNote}</p>
    </>
  );
}

/**
 * The staff-written response and the five things to do with it.
 *
 * The label is text, it comes first in the DOM, and it names the block for a
 * screen reader through aria-labelledby. The dashed border is reinforcement,
 * never the signal.
 */
export function ConfidenceAuditExercise() {
  const ex = confidenceAuditExercise;
  return (
    <div className="confidenceExercise">
      <p className="scenarioText">{ex.scenario}</p>
      <div
        className="simulatedClaim"
        role="group"
        aria-labelledby="simulated-confidence-label"
        data-nosnippet
      >
        <p className="simulatedLabel" id="simulated-confidence-label">
          {ex.visibleLabel}
        </p>
        <blockquote className="simulatedClaimText">
          <p>{ex.simulatedResponse}</p>
        </blockquote>
        <p className="simulatedNotTranscript muted">
          Written by Law Library staff to illustrate a pattern. It is not a transcript of any
          product&rsquo;s output.
        </p>
      </div>
      <ol className="exerciseSteps">
        {ex.instructions.map((step) => (
          <li key={step.number}>
            <span className="exerciseStepInstruction">{step.instruction}</span>
            {step.items ? (
              <ul className="exerciseLookFor">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {step.notEnough ? (
              <>
                <p className="exerciseLookForHead">Do not merely add:</p>
                <ul className="exerciseNotEnough">
                  {step.notEnough.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {step.note ? <p className="exerciseStepQuestion">{step.note}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * The copyable ledger. Rendered as text and copied as text — there is no field to
 * type into, so nothing a faculty member writes about their own claim is
 * collected, stored, or transmitted, and the ledger is fully readable with
 * JavaScript disabled.
 */
export function EvidenceUncertaintyLedger({ intro }: { intro?: ReactNode }) {
  return (
    <div className="evidenceLedger">
      {intro ? <p>{intro}</p> : null}
      <AuditWorksheet sections={ledgerSections} />
      <div className="actions">
        <CopyPrompt
          text={ledgerText}
          label={ledgerCopy.buttonLabel}
          itemLabel={ledgerCopy.itemLabel}
        />
      </div>
      <p className="muted ledgerPrivacyNote">
        Nothing you write is sent anywhere. This page has no form and records no answers.
      </p>
    </div>
  );
}

/**
 * The answer key. Collapsed by default so it cannot be read before the exercise,
 * and stable: it describes a fixed piece of staff-written text, so the lesson
 * never depends on what a live model happened to produce.
 */
export function ConfidenceAuditAnswerKey() {
  const key = confidenceAuditAnswerKey;
  return (
    <details className="guideDetails answerKey">
      <summary>{key.summary}</summary>
      <div className="answerKeyBody">
        <p>{key.overview}</p>
        <ul>
          {key.findings.map((finding) => (
            <li key={finding}>{finding}</li>
          ))}
        </ul>
        <p className="answerKeyControlHead">{key.rewriteHeading}</p>
        <blockquote className="answerKeyRewrite">
          <p>{key.rewrite}</p>
        </blockquote>
        <p className="answerKeyClosing">{key.closing}</p>
      </div>
    </details>
  );
}

/**
 * The reusable prompt, with the limits it states about itself. The limits come
 * from the record rather than the page, so a prompt that gains a caveat gains it
 * everywhere the prompt appears.
 */
export function EvidenceUncertaintyPromptBlock({ intro }: { intro?: ReactNode }) {
  const prompt = getEvidenceUncertaintyPrompt("evidence-and-uncertainty-ledger");
  return (
    <div className="criticalReviewPrompt">
      {intro ? <p>{intro}</p> : null}
      <PromptBlock
        label={prompt.title}
        text={prompt.promptText}
        copyLabel="Copy evidence-and-uncertainty prompt"
        itemLabel="Evidence-and-uncertainty prompt"
        after={evidenceUncertaintyPromptNote}
      />
      <div className="promptLimitations">
        <p className="promptLimitationsHead">What this prompt cannot do</p>
        <ul>
          {prompt.limitations.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

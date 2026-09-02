import type { ReactNode } from "react";
import {
  contextVisibilityNote,
  orderedContextLocations,
} from "../lib/aiContextLocations";
import {
  orderedRecoverySteps,
  receiptScopeNote,
} from "../lib/contextRecoveryWorkflow";
import {
  contextPacket,
  contextReceiptExercise,
  exerciseAnswerKey,
  exerciseCopy,
  exerciseSteps,
} from "../lib/contextReceiptExercise";
import {
  contextReceiptNote,
  getContextReceiptPrompt,
} from "../lib/contextReceiptPrompts";
import {
  currentContextFeatures,
  displayableContextFeatures,
  featureToolDetailsUrl,
  featureToolName,
} from "../lib/currentContextFeatures";
import { PromptBlock } from "./GuideBlocks";

/* ---------------------------------------------------------------------------
   Blocks for "Why did it forget what I told it earlier?".

   Everything renders from the records in app/lib/aiContextLocations.ts,
   contextRecoveryWorkflow.ts, contextReceiptExercise.ts,
   contextReceiptPrompts.ts, and currentContextFeatures.ts.

   Nothing here inspects a conversation, counts a token, reads a file, or calls a
   service. The only interaction on the page is the two copy buttons, and the only
   time-sensitive content is the current-feature insert, which withholds itself
   once its review date passes.
   ------------------------------------------------------------------------- */

/**
 * The four places the information might be. An ordered list rather than a grid:
 * they are read in sequence, from the one closest to the prompt to the one that is
 * entirely the faculty member's own.
 */
export function ContextLocationCards() {
  return (
    <>
      <ol className="contextLocations">
        {orderedContextLocations().map((location) => (
          <li className="contextLocation" key={location.id}>
            <h3 className="contextLocationTitle">{location.title}</h3>
            <dl className="contextLocationFields">
              <dt>What it contains</dt>
              <dd>{location.whatItContains}</dd>
              <dt>Why it may not control</dt>
              <dd>{location.whyItMayNotControl}</dd>
              <dt>Faculty check</dt>
              <dd className="contextLocationCheck">{location.facultyCheck}</dd>
              <dt>Example</dt>
              <dd className="contextLocationExample">{location.example}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <p className="contextVisibilityNote">{contextVisibilityNote}</p>
    </>
  );
}

/**
 * Restate it. Reattach it. Review the context. A semantic ordered list, with the
 * step number in the record rather than in a CSS counter so it survives being read
 * aloud and printed.
 */
export function ContextRecoveryWorkflow() {
  return (
    <>
      <ol className="recoverySteps">
        {orderedRecoverySteps().map((step) => (
          <li className="recoveryStep" key={step.id}>
            <p className="recoveryStepHead">
              <span className="recoveryStepNumber" aria-hidden="true">
                {step.number}
              </span>
              <span className="recoveryStepTitle">{step.title}</span>
            </p>
            <dl className="recoveryStepFields">
              <dt>Action</dt>
              <dd>{step.action}</dd>
              <dt>Include</dt>
              <dd>
                <ul className="recoveryInclude">
                  {step.include.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
              <dt>Common failure</dt>
              <dd>{step.commonFailure}</dd>
              <dt>Output</dt>
              <dd className="recoveryOutput">{step.output}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <p className="receiptScopeNote">{receiptScopeNote}</p>
    </>
  );
}

/**
 * The context packet and the steps for comparing a receipt against it. The packet
 * is one `<pre>` block so a copy reproduces its headings, numbering, and bullets
 * exactly — the exercise is about whether those survive into the receipt.
 */
export function ContextReceiptExercise() {
  return (
    <div className="contextExercise">
      <p className="scenarioLabel">
        <span className="pill pilot">
          <span className="dot" aria-hidden="true" />
          {contextReceiptExercise.scenarioLabel}
        </span>
      </p>
      <PromptBlock
        label="Context packet"
        text={contextPacket}
        copyLabel={exerciseCopy.buttonLabel}
        itemLabel={exerciseCopy.itemLabel}
      />
      <ol className="exerciseSteps">
        {exerciseSteps.map((step) => (
          <li key={step.number}>
            <span className="exerciseStepInstruction">{step.instruction}</span>
            {step.checkList ? (
              <ul className="exerciseLookFor">
                {step.checkList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * The answer key. Collapsed by default, and symmetrical on purpose: a complete
 * receipt and an incomplete one are both written up as the exercise working, so the
 * lesson never depends on what a live model happened to do.
 */
export function ContextReceiptAnswerKey() {
  const key = exerciseAnswerKey;
  return (
    <details className="guideDetails answerKey">
      <summary>{key.summary}</summary>
      <div className="answerKeyBody">
        <h3>{key.usableHeading}</h3>
        <p>{key.usableBody}</p>
        <p>{key.inspectionBody}</p>
        <h3>{key.correctionHeading}</h3>
        <ul>
          {key.correctionSigns.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
        <p>{key.completeOutcome}</p>
        <p>{key.incompleteOutcome}</p>
        <p className="answerKeyClosing">{key.closing}</p>
      </div>
    </details>
  );
}

/** The reusable prompt, with the limits it states about itself. */
export function ContextReceiptPromptBlock({ intro }: { intro?: ReactNode }) {
  const prompt = getContextReceiptPrompt("general-context-receipt");
  return (
    <div className="criticalReviewPrompt">
      {intro ? <p>{intro}</p> : null}
      <PromptBlock
        label={prompt.title}
        text={prompt.promptText}
        copyLabel="Copy context-receipt prompt"
        itemLabel="Context-receipt prompt"
        after={contextReceiptNote}
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

/**
 * A short, distinguishable label for one official documentation link: the host
 * plus the last path segment, e.g. "uit.stanford.edu/faqs".
 */
function officialSourceLabel(url: string): string {
  const withoutScheme = url.replace(/^https:\/\//, "").replace(/\/$/, "");
  const [host, ...segments] = withoutScheme.split("/");
  const last = segments[segments.length - 1];
  return last ? `${host}/${last}` : host;
}

/**
 * The dated insert. Product names come from the canonical registry, so a renamed
 * product is renamed once; the feature sentences come from the dated record and
 * disappear when it goes stale, leaving the official links and a stated reason.
 */
export function CurrentContextFeatures() {
  const state = displayableContextFeatures();
  return (
    <section className="contextFeatures" aria-labelledby="current-features-heading">
      <p className="eyebrow">Current feature examples</p>
      <h2 id="current-features-heading">
        &ldquo;Memory&rdquo; means different things in different tools
      </h2>
      {state.state === "current" ? (
        <p className="contextFeaturesChecked">
          <time dateTime={currentContextFeatures.verifiedOn}>{state.label}</time>
        </p>
      ) : (
        // Stale: the summaries are withheld rather than shown with an old date.
        <p className="contextFeaturesChecked stale">
          <strong>{state.label}.</strong> The feature descriptions are withheld until a maintainer
          re-reads the official pages below.
        </p>
      )}
      <p className="muted contextFeaturesIntro">{currentContextFeatures.intro}</p>

      {state.state === "current" ? (
        <ul className="contextFeatureList">
          {state.records.map((record) => {
            const detailsUrl = featureToolDetailsUrl(record);
            return (
              <li className="contextFeature" key={record.id}>
                <h3 className="contextFeatureName">{featureToolName(record)}</h3>
                <dl className="contextFeatureFields">
                  <dt>What it separates</dt>
                  <dd>{record.featureSummary}</dd>
                  <dt>Faculty check</dt>
                  <dd className="contextFeatureCheck">{record.facultyCheck}</dd>
                  <dt>Stated limit</dt>
                  <dd>{record.limitation}</dd>
                </dl>
                {/* Two sources on one record would otherwise give two links the
                    same visible text. The last path segment distinguishes them in
                    text rather than only in a screen-reader suffix. */}
                <p className="contextFeatureSources">
                  <span className="contextFeatureSourcesLabel">Official details: </span>
                  {record.sourceUrls.map((url, index) => (
                    <span key={url}>
                      {index > 0 ? " · " : null}
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {officialSourceLabel(url)}
                        <span className="externalLinkIcon" aria-hidden="true">
                          &#8599;
                        </span>
                        <span className="srOnly">
                          {" "}
                          — official details for {featureToolName(record)} (opens in a new tab)
                        </span>
                      </a>
                    </span>
                  ))}
                  {detailsUrl ? (
                    <>
                      {" · "}
                      <a href={detailsUrl} target="_blank" rel="noopener noreferrer">
                        Service details
                        <span className="externalLinkIcon" aria-hidden="true">
                          &#8599;
                        </span>
                        <span className="srOnly"> (opens in a new tab)</span>
                      </a>
                    </>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="contextFeatureStaleLinks">
          {currentContextFeatures.officialSourceUrls.map((url) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url.replace(/^https:\/\//, "")}
                <span className="externalLinkIcon" aria-hidden="true">
                  &#8599;
                </span>
                <span className="srOnly"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

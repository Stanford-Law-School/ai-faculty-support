import type { ReactNode } from "react";
import { agreementToneNote, orderedAgreementTypes } from "../lib/aiAgreementTypes";
import {
  frameworkClosingNote,
  orderedReviewSteps,
} from "../lib/criticalReviewFramework";
import {
  exerciseAnswerKey,
  exercisePrompts,
  exerciseSteps,
  promptComparisonExercise,
} from "../lib/promptComparisonExercise";
import {
  criticalReviewPromptNote,
  getCriticalReviewPrompt,
} from "../lib/criticalReviewPrompts";
import { PromptBlock } from "./GuideBlocks";

/* ---------------------------------------------------------------------------
   Blocks for "Why does it agree with everything I say?".

   Everything renders from the records in app/lib/aiAgreementTypes.ts,
   criticalReviewFramework.ts, promptComparisonExercise.ts, and
   criticalReviewPrompts.ts. Nothing here classifies, scores, or calls a model:
   the two copy controls put text on the clipboard, and that is the whole
   interaction budget of the page.
   ------------------------------------------------------------------------- */

/**
 * The three things agreement can mean, as a definition list. Each entry carries
 * all five fields — a card missing "what it does not prove" would read as a
 * classification rather than a caution.
 */
export function AgreementTypeCards() {
  return (
    <>
      <ol className="agreementTypes">
        {orderedAgreementTypes().map((type) => (
          <li className="agreementType" key={type.id}>
            <h3 className="agreementTitle">{type.title}</h3>
            <dl className="agreementFields">
              <dt>What happened</dt>
              <dd>{type.whatHappened}</dd>
              <dt>Example prompt</dt>
              {/* The example is quoted text, not an instruction to run. */}
              <dd>
                <q className="agreementExample">{type.examplePrompt}</q>
              </dd>
              <dt>What it does not prove</dt>
              <dd>{type.whatItDoesNotProve}</dd>
              <dt>Next move</dt>
              <dd className="agreementNextMove">{type.nextMove}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <p className="agreementToneNote">{agreementToneNote}</p>
    </>
  );
}

/**
 * Build · Break · Check · You decide, as a semantic ordered list. The numbers
 * come from the record rather than from CSS counters, so they survive being read
 * aloud and being printed.
 */
export function CriticalReviewFramework() {
  return (
    <>
      <ol className="reviewSteps">
        {orderedReviewSteps().map((step) => (
          <li className="reviewStep" key={step.id}>
            <p className="reviewStepHead">
              <span className="reviewStepNumber" aria-hidden="true">
                {step.number}
              </span>
              <span className="reviewStepTitle">{step.title}</span>
            </p>
            <dl className="reviewStepFields">
              <dt>Job</dt>
              <dd>{step.job}</dd>
              <dt>Prompt instruction</dt>
              <dd>{step.promptInstruction}</dd>
              <dt>Common failure</dt>
              <dd>{step.commonFailure}</dd>
              <dt>Your responsibility</dt>
              <dd className="reviewStepHuman">{step.humanResponsibility}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <p className="reviewClosingNote">{frameworkClosingNote}</p>
    </>
  );
}

/**
 * The two prompts side by side, each with its own copy control. Both are rendered
 * `<pre>` text: fully visible without JavaScript, and there is no field to type
 * into, so nothing a faculty member writes can be collected.
 */
export function PromptComparison() {
  return (
    <div className="promptComparison">
      <p className="scenarioLabel">
        <span className="pill pilot">
          <span className="dot" aria-hidden="true" />
          {promptComparisonExercise.scenarioLabel}
        </span>
      </p>
      <p className="scenarioText">{promptComparisonExercise.scenario}</p>
      {exercisePrompts.map((prompt, index) => (
        <div className="comparisonPrompt" key={prompt.id}>
          {/* "Prompt A"/"Prompt B" plus the job it assigns — the distinction is in
              text, never in colour alone. */}
          <PromptBlock
            label={`Prompt ${String.fromCharCode(65 + index)} · ${prompt.label}`}
            text={prompt.text}
            copyLabel={prompt.copyButtonLabel}
            itemLabel={prompt.copyItemLabel}
          />
        </div>
      ))}
      <ol className="exerciseSteps">
        {exerciseSteps.map((step) => (
          <li key={step.number}>
            <span className="exerciseStepInstruction">{step.instruction}</span>
            {step.question ? <p className="exerciseStepQuestion">{step.question}</p> : null}
            {step.lookFor ? (
              <>
                <p className="exerciseLookForHead">Look for:</p>
                <ul className="exerciseLookFor">
                  {step.lookFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * The answer key. Collapsed by default so it cannot be read before the exercise,
 * and stable: it explains the difference between the two prompts, which is true
 * whether or not anyone ran them and whatever the live responses happened to say.
 */
export function PromptComparisonAnswerKey() {
  const key = exerciseAnswerKey;
  return (
    <details className="guideDetails answerKey">
      <summary>{key.summary}</summary>
      <div className="answerKeyBody">
        <h3>{key.advocacyHeading}</h3>
        <p>{key.advocacyBody}</p>
        <h3>{key.reviewHeading}</h3>
        <p>{key.reviewBody}</p>
        <h3>{key.independenceHeading}</h3>
        <p>The response may still:</p>
        <ul>
          {key.stillPossible.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="answerKeyControlHead">{key.controlHeading}</p>
        <ol className="answerKeyControl">
          {key.controlSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="answerKeyClosing">{key.closing}</p>
      </div>
    </details>
  );
}

/**
 * The reusable prompt, with its stated limits. The limits are rendered from the
 * record rather than written into the page, so a prompt that gains a caveat gains
 * it everywhere the prompt appears.
 */
export function CriticalReviewPromptBlock({ intro }: { intro?: ReactNode }) {
  const prompt = getCriticalReviewPrompt("general-critical-review");
  return (
    <div className="criticalReviewPrompt">
      {intro ? <p>{intro}</p> : null}
      {/* "Copy reusable critical-review prompt", not "Copy critical-review
          prompt": the exercise above already has a button by that name, and two
          controls with the same accessible name are indistinguishable to anyone
          navigating by button list. */}
      <PromptBlock
        label={prompt.title}
        text={prompt.promptText}
        copyLabel="Copy reusable critical-review prompt"
        itemLabel="Reusable critical-review prompt"
        after={criticalReviewPromptNote}
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

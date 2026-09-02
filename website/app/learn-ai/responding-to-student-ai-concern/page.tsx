import Link from "next/link";
import type { Metadata } from "next";
import { getGuide } from "../../lib/guides";
import { STUDENT_AI_LEARNING_HUB_URL } from "../../lib/site";
import { aiDetectionGuidance, displayableInstitutionalClaims } from "../../lib/aiDetectionGuidance";
import { stanfordStudentAiProcess } from "../../lib/stanfordStudentAiProcess";
import { QuietCallout } from "../../components/LegalVerification";
import {
  ConcernEvidenceCategories,
  ConcernScenarioAnswerKey,
  ConversationGuide,
  DetectionGuidance,
  GoverningMaterialsChecklist,
  GradedUngradedPaths,
  SimulatedConcernScenario,
  SlsStudentAiPolicyInsert,
  StanfordStudentAiProcessInsert,
  StudentAiConcernWorkflow,
} from "../../components/StudentAiConcern";
import {
  AnswerFirst,
  ExerciseBlock,
  FacultyMove,
  GuideLayout,
  SourceNotes,
  SourcesSensitivityStakes,
  WorthRepeating,
} from "../../components/GuideKit";

const guide = getGuide("responding-to-student-ai-concern");
const OCS_EMAIL = `mailto:${stanfordStudentAiProcess.ocsEmail}`;
const OAE_URL = "https://oae.stanford.edu/";
const LEARNING_GUIDE = "/learn-ai/students-use-ai-and-learn-law";

export const metadata: Metadata = {
  title:
    "How Should I Respond to a Possible Student AI-Policy Concern? | SLS Faculty AI Guide",
  description:
    "A faculty checklist for applying the stated assignment policy, preserving materials, distinguishing evidence from automated signals, consulting OCS, and avoiding premature conclusions.",
  alternates: { canonical: "/learn-ai/responding-to-student-ai-concern" },
  openGraph: {
    title:
    "How Should I Respond to a Possible Student AI-Policy Concern? | SLS Faculty AI Guide",
    description:
      "A six-minute faculty guide to applying the assignment policy, preserving evidence, consulting Stanford’s Office of Community Standards, and avoiding detector-based conclusions.",
    url: "/learn-ai/responding-to-student-ai-concern",
  },
};

const qualityChecks = [
  "Does the source exist?",
  "Does it support the proposition?",
  "Is the analysis responsive?",
  "Is the authority appropriate and current?",
  "Does the paper satisfy the assignment?",
];

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "Use the assignment, syllabus, written clarifications, current SLS policy, Honor Code guidance, submitted work, and ordinary course records. Do not use a detector score or chatbot judgment as the source of a misconduct conclusion.",
  },
  {
    label: "Sensitivity",
    primary: "",
    detail: (
      <>
        Student work, grades, conduct concerns, accommodations, and process records require careful
        handling. Do not upload student material into an unapproved AI or detection service&mdash;
        <Link href="/learn-ai/what-can-i-safely-share">check the exact service and workflow</Link>{" "}
        first.
      </>
    ),
  },
  {
    label: "Stakes",
    primary:
      "An accusation or grade consequence can materially affect a student. The higher the consequence, the more important clear policy, preserved evidence, fair process, confidentiality, and institutional review become.",
  },
];

export default function StudentUsedAi() {
  // The completion list is the published series in reading order, so a future
  // guide joins it without an edit here.
  // Gated with the dated record: null once the detection guidance is overdue.
  const detectionClaims = displayableInstitutionalClaims();

  return (
    <GuideLayout guide={guide}>
      <AnswerFirst>
        <p>{guide.answer}</p>
        <p>{guide.answerSecond}</p>
      </AnswerFirst>

      <FacultyMove>
        <p><strong>{guide.facultyMove}</strong></p>
        <p>{guide.facultyMoveSupport}</p>
      </FacultyMove>

      <section aria-labelledby="right-question-heading">
        <h2 id="right-question-heading">The question is not simply whether AI was involved</h2>
        <p>
          AI use is not a single behavior. A student might use a tool to brainstorm, translate, correct
          grammar, summarize a reading, locate sources, draft prose, revise prose, check citations,
          rehearse an explanation, or complete the entire assignment.
        </p>
        <p>
          Some of those actions may be permitted. Some may be prohibited. Some may require disclosure.
          Some may be irrelevant to the submitted work.
        </p>
        <p>The useful question is:</p>
        <p className="pullQuestion">
          Did the student use aid that was not permitted for this particular assignment, or fail to
          follow a stated disclosure, attribution, source-verification, or process requirement?
        </p>
        <QuietCallout>
          <p>
            A product name does not answer the policy question. Identify the action the student took and
            the rule that applied to that action.
          </p>
        </QuietCallout>
      </section>

      <section aria-labelledby="workflow-heading">
        <h2 id="workflow-heading">Use this six-step response</h2>
        <p>
          The first four steps organize the concern. The fifth identifies the Stanford process. The sixth
          supports a fair conversation when that conversation is appropriate.
        </p>
        <StudentAiConcernWorkflow />
      </section>

      <StanfordStudentAiProcessInsert />

      <SlsStudentAiPolicyInsert />

      <section aria-labelledby="governing-materials-heading">
        <h2 id="governing-materials-heading">What rule governed this assignment?</h2>
        <p>Do not answer from memory. Collect the materials students actually received.</p>
        <GoverningMaterialsChecklist />
        <p>
          When the materials are ambiguous or conflict, do not create a new rule after submission.
          Preserve the ambiguity and ask OCS or the appropriate SLS office how to proceed.
        </p>
      </section>

      <section aria-labelledby="evidence-categories-heading">
        <h2 id="evidence-categories-heading">Sort what you have before deciding what it means</h2>
        <p>
          Different observations answer different questions. A citation error is not an authorship
          detector. A detector score is not a policy analysis. A missing disclosure is not a complete
          account of the student&rsquo;s process.
        </p>
        <ConcernEvidenceCategories />
      </section>

      <ExerciseBlock
        heading="Sort the concern before acting"
        id="sort-concern"
        timeLabel="90 seconds"
      >
        <p>
          This staff-created scenario has a stable answer and requires no AI tool or student
          information.
        </p>
        <SimulatedConcernScenario />
        <ConcernScenarioAnswerKey />
      </ExerciseBlock>

      <section aria-labelledby="detector-heading">
        <h2 id="detector-heading">A detector score is not a finding</h2>
        <p>
          An AI-text detector estimates whether writing resembles patterns in material the detector
          associates with generated text. The output depends on the specific product, model, threshold,
          text length, language, and current vendor method.
        </p>
        <p>A score does not, by itself, establish:</p>
        <ul>
          <li>Who wrote the text</li>
          <li>Which product or feature was used</li>
          <li>What portion of the work was generated</li>
          <li>Whether use was permitted</li>
          <li>Whether use was disclosed</li>
          <li>Whether the student intended to deceive</li>
          <li>Whether an Honor Code violation occurred</li>
        </ul>
        <DetectionGuidance />
        <QuietCallout>
          <p>Do not use AI to decide whether a student used AI.</p>
        </QuietCallout>
        <p>
          Submitting student work to an external detector may also raise privacy,
          intellectual-property, retention, trust, accessibility, and institutional-approval questions.{" "}
          <Link href="/learn-ai/what-can-i-safely-share">Check the service</Link> before uploading
          student work.
        </p>
      </section>

      <details className="guideDetails">
        <summary>Why is a change in writing style weak evidence?</summary>
        <p>
          Writing varies with genre, time pressure, editing, feedback, source material, language
          development, assistive tools, assignment type, health, confidence, and many other conditions.
        </p>
        <p>
          A student may also use permitted assistance that changes the surface form of the writing
          without violating the assignment.
        </p>
        <p>
          Published research has found that some AI detectors disproportionately misclassify non-native
          English writing. That does not determine what happened in an individual case, but it
          reinforces the need to avoid converting predictability, fluency, or vocabulary into a verdict.
        </p>
        <p>Describe the observation neutrally. Do not diagnose its cause.</p>
      </details>

      <section aria-labelledby="conversation-heading">
        <h2 id="conversation-heading">If OCS advises a conversation</h2>
        <p>
          The conversation should seek an accurate account, not a confession. Begin by stating the
          relevant rule and the observable concern.
        </p>
        <ConversationGuide />
      </section>

      <section aria-labelledby="work-type-heading">
        <h2 id="work-type-heading">Is the work graded or ungraded?</h2>
        <GradedUngradedPaths />
        <p>When it is unclear whether the work counts toward evaluation, consult OCS.</p>
      </section>

      <section aria-labelledby="quality-heading">
        <h2 id="quality-heading">A weak paper and an integrity concern are different questions</h2>
        <p>
          A paper may contain fabricated citations, unsupported assertions, generic analysis, or poor
          legal research regardless of whether AI was used.
        </p>
        <p>Apply the ordinary academic rubric to the quality of the work:</p>
        <ul>
          {qualityChecks.map((q) => <li key={q}>{q}</li>)}
        </ul>
        <p>Handle suspected unpermitted aid through the Stanford process.</p>
        <p>
          Do not invent an &ldquo;AI penalty&rdquo; inside the academic rubric unless the assignment and
          course policy already defined a relevant, pedagogically justified criterion that applies
          consistently to all students.
        </p>
        <p>
          <Link href="/learn-ai/verify-an-ai-legal-claim">
            How do I verify an AI-generated legal claim?
          </Link>
        </p>
      </section>

      {/* The assignment-design material that used to sit here now lives on the
          primary guide, where it belongs: a clearer boundary is a teaching
          decision, not a step in a concern process. */}
      <section aria-labelledby="prevention-heading">
        <h2 id="prevention-heading">Reduce ambiguity before the next assignment</h2>
        <p>
          The most useful prevention step is not stronger detection. It is a clearer learning objective
          and a more specific assignment boundary, stated before students begin.
        </p>
        <article className="card relatedGuideCard">
          <h3>How can students use AI and still learn the law?</h3>
          <p className="muted">
            Five design checks, five assignment modes, six activity patterns, and a copyable assignment
            AI learning boundary&mdash;plus the Stanford and SLS policy links to review first.
          </p>
          <p>
            <Link className="textLink" href={LEARNING_GUIDE}>
              Design the next assignment
            </Link>
          </p>
        </article>
        <p className="muted">
          After a concern is resolved, students may also need the student-facing habits collected in
          the{" "}
          <a href={STUDENT_AI_LEARNING_HUB_URL} target="_blank" rel="noopener noreferrer">
            Student AI Learning Hub
            <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
            <span className="srOnly"> (opens in a new tab)</span>
          </a>
          . A learning resource does not replace the Stanford process or any resolution required by OCS.
        </p>
      </section>

      <section aria-labelledby="what-happened-heading">
        <h2 id="what-happened-heading">What just happened</h2>
        <p>You replaced an authorship guess with a policy-and-evidence workflow.</p>
        <p>
          The assignment defined the relevant boundary. The submission and ordinary course records
          supplied observable facts. Detector output and writing style remained signals or inferences
          rather than verdicts. Stanford&rsquo;s process provided the next step for graded work.
        </p>
        <p>
          The goal is not to ignore a reasonable concern. It is to respond without turning uncertainty
          into punishment.
        </p>
      </section>

      <section aria-labelledby="before-continue-heading">
        <h2 id="before-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <details className="guideDetails">
        <summary>What if the student admits using AI?</summary>
        <p>Preserve the student&rsquo;s account accurately and consult OCS for graded work.</p>
        <p>
          An admission may clarify the process, but the relevant questions still include what action
          occurred, what the assignment permitted, whether disclosure was required, and which Stanford
          process applies.
        </p>
        <p>
          Do not privately negotiate a disciplinary outcome or grade consequence outside the applicable
          process.
        </p>
      </details>

      <details className="guideDetails">
        <summary>What if the work contains fabricated citations?</summary>
        <p>
          Treat each fabricated or unsupported citation as a serious source-verification problem.
        </p>
        <p>
          It may contribute to a reasonable concern, but it does not prove that AI created the citation.
          Students, research assistants, prior drafts, unreliable secondary sources, and ordinary
          research errors can also produce incorrect citations.
        </p>
        <p>
          Check the source problem under the academic rubric and route suspected unpermitted aid through
          OCS.
        </p>
        <p>
          <Link href="/learn-ai/verify-an-ai-legal-claim">
            Run the four-step legal claim audit
          </Link>
        </p>
      </details>

      <details className="guideDetails">
        <summary>Can I ask the student to show me their chat history?</summary>
        <p>
          Do not demand access to a private account, password, device, or unrelated conversation
          history.
        </p>
        <p>
          When prompt records or AI-use logs were announced as required assignment materials, preserve
          what the student submitted through that ordinary process.
        </p>
        <p>
          For any request beyond the announced assignment requirements, ask OCS what is appropriate
          before contacting the student.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Can I require the student to explain the paper orally?</summary>
        <p>
          An oral explanation can be a valuable, consistently designed learning and assessment activity
          when it is announced in advance and aligned with the learning objective.
        </p>
        <p>
          Do not improvise a surprise oral examination for one student as a private guilt test or
          substitute for the Stanford process.
        </p>
        <p>
          When OCS recommends a conversation, use neutral process questions rather than an unannounced
          re-examination.
        </p>
      </details>

      <details className="guideDetails">
        <summary>What if my syllabus said nothing about AI?</summary>
        <p>
          Consult the current Stanford and SLS guidance rather than creating a rule after submission.
        </p>
        <p>
          Stanford-wide guidance currently treats generative AI analogously to assistance from another
          person in the absence of a clear instructor statement, prohibits using it to substantially
          complete an assignment or exam, and directs students to disclose non-incidental use when in
          doubt.
        </p>
        <p>
          SLS may supply additional guidance. Confirm its current wording through Student Affairs or the
          staff-reviewed local insert.
        </p>
        <p>For future assignments, state an assignment-specific boundary.</p>
      </details>

      <details className="guideDetails">
        <summary>Should I use a detector on every submission?</summary>
        {/* The campus-support and advance-notice sentences are read from the dated
            record, not written here. Hard-coding them would keep asserting them
            after the record expired, which is exactly what the gating prevents. */}
        <p>{aiDetectionGuidance.currentStanfordPosition}</p>
        {detectionClaims ? (
          <p>{detectionClaims.campusSupportStatus}</p>
        ) : (
          <p>
            {aiDetectionGuidance.staleLabel}. Confirm the current campus position with the Office of
            Community Standards before adopting a tool.
          </p>
        )}
        <p>
          Routine detector use may also affect student privacy, intellectual property, trust, belonging,
          accessibility, and equity.
        </p>
        <p>
          Before adopting a tool, consult OCS and appropriate school or program leadership,{" "}
          {detectionClaims ? "give any required advance notice" : "confirm the current advance-notice requirement"}
          , and establish how human review will prevent a score from becoming a verdict.
        </p>
      </details>

      <details className="guideDetails">
        <summary>What if AI use was permitted but not disclosed?</summary>
        <p>Treat the disclosure requirement as the rule at issue.</p>
        <p>
          Determine what the policy required, whether the student&rsquo;s use was incidental or material
          under that policy, and whether the instructions were sufficiently clear.
        </p>
        <p>
          For graded work, preserve the missing disclosure and consult OCS before reaching a conclusion
          or imposing a consequence.
        </p>
      </details>

      <WorthRepeating>Policy first. Evidence second. Process always.</WorthRepeating>

      <SourceNotes guide={guide} />

      <section className="card" aria-labelledby="concern-help-heading">
        <h2 id="concern-help-heading" style={{ fontSize: "1.35rem" }}>
          Need help with a possible concern?
        </h2>
        <p className="muted">
          For graded or evaluative work, contact the Office of Community Standards before discussing the
          possible violation with the student.
        </p>
        <div className="actions" style={{ marginTop: "0.6rem" }}>
          <a className="primary" href={OCS_EMAIL}>Email the Office of Community Standards</a>
          <a
            className="secondary"
            href={stanfordStudentAiProcess.ocsReportingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Review faculty reporting guidance
            <span className="srOnly"> (opens in a new tab)</span>
          </a>
        </div>
        <p className="muted" style={{ marginTop: "0.9rem", fontSize: "0.92rem" }}>
          The Law Library can help clarify legal-research, citation-verification, AI-tool, and
          assignment-design questions. Do not send student work or sensitive conduct-case material in an
          initial email.{" "}
          <a href="mailto:library@law.stanford.edu">library@law.stanford.edu</a>
        </p>
        <p className="muted" style={{ marginTop: "0.6rem", fontSize: "0.92rem" }}>
          For accommodation questions, contact the{" "}
          <a href={OAE_URL} target="_blank" rel="noopener noreferrer">
            Office of Accessible Education
            <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
            <span className="srOnly"> (opens in a new tab)</span>
          </a>{" "}
          rather than asking the student to disclose medical or disability information.
        </p>
      </section>

      {/* A process resource, not a collection card: it points back to the guide it
          supports rather than rendering the collection-completion treatment. */}
      <section className="card seriesStatus" aria-labelledby="companion-return-heading">
        <p className="eyebrow" id="companion-return-heading">Return to the guide</p>
        <h2 className="seriesNextTitle">
          <Link href="/learn-ai/students-use-ai-and-learn-law">
            How can students use AI and still learn the law?
          </Link>
        </h2>
        <p className="muted">
          A clear, learning-centered assignment is what makes a possible concern easier to address:
          the permitted role, required student work, disclosure, and assessment criteria are already
          visible.
        </p>
        <p className="muted seriesAsk">
          Questions about a current task?{" "}
          <a href="mailto:library@law.stanford.edu">Email library@law.stanford.edu</a>
        </p>
      </section>
    </GuideLayout>
  );
}

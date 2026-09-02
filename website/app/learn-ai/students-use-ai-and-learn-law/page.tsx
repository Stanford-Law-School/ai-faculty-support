import Link from "next/link";
import type { Metadata } from "next";
import {
  collectionGuides,
  collectionPublishedGuides,
  getGuide,
  previousGuide,
} from "../../lib/guides";
import {
  CORE_AI_DECISIONS,
  WORKING_CRITICALLY_WITH_AI,
} from "../../lib/learnAiCollections";
import { CollectionContinuationCard } from "../../components/GuideCollections";
import { STUDENT_AI_LEARNING_HUB_URL } from "../../lib/site";
import { assignmentAiBoundary } from "../../lib/assignmentAiBoundary";
import { caseBriefPrompt } from "../../lib/caseBriefStressTest";
import { PromptBlock } from "../../components/GuideBlocks";
import { QuietCallout } from "../../components/LegalVerification";
import {
  ActivityLibrary,
  AiLiteracyCards,
  AssignmentAiBoundary,
  AssignmentModes,
  CaseBriefStressTest,
  DesignChecks,
  LaunchChecklist,
  ProcessEvidenceLists,
  SampleRubric,
  SlsPolicyCard,
  SlsPolicyLink,
} from "../../components/StudentAiLearning";
import {
  AnswerFirst,
  ExerciseBlock,
  FacultyMove,
  GuideLayout,
  GuideSeriesStatus,
  SeriesCompletion,
  SourceNotes,
  SourcesSensitivityStakes,
  WorthRepeating,
} from "../../components/GuideKit";

const guide = getGuide("students-use-ai-and-learn-law");
const CONCERN_COMPANION = "/learn-ai/responding-to-student-ai-concern";
const TEACHING_COMMONS_ASSIGNMENTS =
  "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/integrating-ai-assignments";
const AI_FOR_LEGAL_HELP = "https://justiceinnovation.law.stanford.edu/courses/ai-for-legal-help/";

export const metadata: Metadata = {
  title: "How Can Students Use AI and Still Learn the Law? | SLS Faculty AI Guide",
  description:
    "A faculty guide to designing law-school activities in which students practice with AI while demonstrating legal analysis, source verification, judgment, and reflection.",
  alternates: { canonical: "/learn-ai/students-use-ai-and-learn-law" },
  openGraph: {
    title: "How Can Students Use AI and Still Learn the Law? | SLS Faculty AI Guide",
    description:
      "A faculty guide to designing law-school activities in which students practice with AI while demonstrating legal analysis, source verification, judgment, and reflection.",
    url: "/learn-ai/students-use-ai-and-learn-law",
  },
};

// The capabilities a course might be trying to build. Listed so the first
// question a faculty member answers is about law, not about a product.
const legalCapabilities = [
  "Read an opinion closely",
  "Identify a holding and material reasoning",
  "Distinguish facts that change the legal analysis",
  "Research and update authority",
  "Interpret statutory or regulatory text",
  "Develop and answer counterarguments",
  "Interview or counsel a client",
  "Draft and revise legal language",
  "Exercise professional judgment",
  "Explain and defend a legal choice",
];

const designPattern = [
  "Preserve the legal skill.",
  "Give AI a bounded role.",
  "Require inspectable sources.",
  "Make student judgment visible.",
  "Transfer the learning to a new problem.",
];

const beforeYouContinue = [
  {
    label: "Sources",
    primary:
      "Students should work from assigned or approved sources and independently open and verify every material legal or factual claim. Generated output is course material to examine, not an answer key.",
  },
  {
    label: "Sensitivity",
    primary: "",
    detail: (
      <>
        Use public, fictional, synthetic, or otherwise approved material. Do not place student
        records, clinic material, client information, unpublished work, or restricted course content
        into an unapproved service&mdash;
        <Link href="/learn-ai/what-can-i-safely-share">check the exact service and workflow</Link>{" "}
        first.
      </>
    ),
  },
  {
    label: "Stakes",
    primary:
      "As an activity moves from low-stakes practice toward grading, client work, professional judgment, or external use, increase source control, faculty review, documentation, alternatives, and human decision points.",
  },
];

export default function StudentsUseAiAndLearnLaw() {
  const seriesGuides = collectionGuides();
  // The first published guide of the next collection, read from the records: the
  // card cannot point at a guide that has no route.
  const continuationGuide = collectionPublishedGuides(WORKING_CRITICALLY_WITH_AI.id)[0];

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

      {/* The official SLS policy, near the top rather than only in source notes. */}
      <p className="policyLede">
        Before you design the activity: <SlsPolicyLink />
      </p>

      <section aria-labelledby="start-with-law-heading">
        <h2 id="start-with-law-heading">Start with the legal capability students must develop</h2>
        <p>
          Do not begin by asking, &ldquo;How can I use ChatGPT in this assignment?&rdquo;
        </p>
        <p>Begin with:</p>
        <p className="pullQuestion">
          What must students be able to do after this course that they cannot yet do reliably?
        </p>
        <p>Examples include:</p>
        <ul className="capabilityList">
          {legalCapabilities.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <p>
          Once the capability is clear, give AI a role that creates more practice, comparison,
          feedback, or reflection without performing the capability on the student&rsquo;s behalf.
        </p>
        <QuietCallout>
          <p>
            AI should create material for the student to work on&mdash;not erase the work the student
            needs to learn.
          </p>
        </QuietCallout>
      </section>

      <section aria-labelledby="design-checks-heading">
        <h2 id="design-checks-heading">Use five checks when adding AI to an assignment</h2>
        <p>
          A strong AI activity produces evidence of legal learning and AI judgment at the same time.
        </p>
        <DesignChecks />
      </section>

      <section aria-labelledby="modes-heading">
        <h2 id="modes-heading">You do not need one AI rule for every assignment</h2>
        <AssignmentModes />
        <p>Different assignments in the same course may use different modes.</p>
      </section>

      <section aria-labelledby="activities-heading">
        <h2 id="activities-heading">
          Six ways students can practice AI and learn law at the same time
        </h2>
        <p>
          Each pattern gives AI a limited role and makes the student&rsquo;s legal work visible.
        </p>
        <ActivityLibrary />
      </section>

      <ExerciseBlock
        heading="Turn one case-reading assignment into an AI literacy lab"
        id="case-brief-lab"
        timeLabel="5 minutes to design · one class or homework activity to run"
      >
        <CaseBriefStressTest />
        <PromptBlock
          label="Provisional case-brief prompt"
          text={caseBriefPrompt}
          copyLabel="Copy case-brief prompt"
          itemLabel="Case-brief prompt"
          after="Give students this prompt with the opinion, or run it yourself and hand them the output. Either way the result is an unverified draft to audit, not an answer key."
        />
        <h3 id="rubric-heading">Grade the legal learning, not the generated polish</h3>
        <SampleRubric />
      </ExerciseBlock>

      <section aria-labelledby="evidence-heading">
        <h2 id="evidence-heading">Ask for evidence of learning, not a complete digital history</h2>
        <ProcessEvidenceLists />
        <p>
          Do not require every possible artifact. Select only what is necessary to evaluate the stated
          learning objective, and announce process requirements before students begin the work.
        </p>
      </section>

      <section aria-labelledby="literacy-heading">
        <h2 id="literacy-heading">Teach AI literacy through the legal task</h2>
        <AiLiteracyCards />
        <p>
          AI literacy is not separate from legal education when the activity makes these judgments
          part of the legal task.
        </p>
      </section>

      <section aria-labelledby="boundary-open-heading">
        <h2 id="boundary-open-heading">Set the assignment boundary in the open</h2>
        <p>
          Before assigning or permitting AI, review the current Stanford Law School Student Affairs
          policy and then state the boundary for the particular course and assignment.
        </p>
        <SlsPolicyCard />
      </section>

      <section aria-labelledby="boundary-template-heading">
        <h2 id="boundary-template-heading">
          Tell students why AI is here and what remains theirs
        </h2>
        <AssignmentAiBoundary />
      </section>

      <section aria-labelledby="launch-heading">
        <h2 id="launch-heading">Before students begin, check five things</h2>
        <LaunchChecklist />
        <p>When one answer is unclear, narrow the activity before expanding it.</p>
      </section>

      {/* Only now — after every design, activity, rubric, policy, and literacy
          section — does the guide reach what to do when something goes wrong. The
          full OCS process lives on the companion checklist, not here. */}
      <section aria-labelledby="boundary-crossed-heading">
        <h2 id="boundary-crossed-heading">When a student may have crossed the stated boundary</h2>
        <p>
          A clear, learning-centered assignment makes concerns easier to address because the permitted
          role, required student work, disclosure, and assessment criteria are already visible.
        </p>
        <p>When a concern arises:</p>
        <ol className="guideSteps">
          <li><p>Treat it as a concern, not a finding.</p></li>
          <li>
            <p>
              Preserve the assignment, stated boundary, submission, disclosure, and ordinary course
              records.
            </p>
          </li>
          <li>
            <p>
              Separate observable facts, source problems, automated signals, inferences, and unknowns.
            </p>
          </li>
          <li>
            <p>
              For graded or evaluative work, consult the Office of Community Standards before
              discussing the suspected violation with the student.
            </p>
          </li>
          <li><p>Do not impose a suspicion-based grade penalty.</p></li>
          <li><p>Do not treat a detector score as proof.</p></li>
          <li>
            <p>
              Use a fair process and give the student a meaningful opportunity to explain when that
              conversation is appropriate.
            </p>
          </li>
        </ol>
        <article className="card concernCompanionCard">
          <h3>Possible AI-policy concern?</h3>
          <p className="muted">
            Use the separate faculty checklist for preserving the record, distinguishing evidence from
            signals, consulting OCS, and handling the conversation fairly.
          </p>
          <p>
            <Link className="textLink" href={CONCERN_COMPANION}>
              Open the possible AI-policy concern checklist
            </Link>
          </p>
        </article>
      </section>

      <section aria-labelledby="what-changed-heading">
        <h2 id="what-changed-heading">What changed in the assignment?</h2>
        <p>
          AI did not replace case reading, legal analysis, source verification, or application.
        </p>
        <p>It created another legal artifact for the student to test.</p>
        <p>
          The student&rsquo;s independent attempt made prior understanding visible. The source audit
          required close reading. The revision required reasons. The new hypothetical tested transfer.
          The reflection made both the legal lesson and the AI lesson explicit.
        </p>
        <p>That is the reusable design pattern:</p>
        <ol className="guideSteps">
          {designPattern.map((step) => <li key={step}><p>{step}</p></li>)}
        </ol>
      </section>

      <section aria-labelledby="before-continue-heading">
        <h2 id="before-continue-heading">Before you continue</h2>
        <SourcesSensitivityStakes items={beforeYouContinue} />
      </section>

      <details className="guideDetails">
        <summary>Do students have to use AI to learn AI literacy?</summary>
        <p>Not always.</p>
        <p>
          Faculty demonstration, critique of an instructor-created output, source-audit exercises, and
          discussion of AI-supported legal workflows can teach important AI literacy without requiring
          every student to open an account or submit work to a service.
        </p>
        <p>
          When direct use is required, provide an approved route, clear instructions, and an equivalent
          alternative when appropriate.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Should students draft before or after using AI?</summary>
        <p>
          When independent reasoning is a central learning objective, require a serious first attempt
          before AI.
        </p>
        <p>
          That preserves productive struggle and gives students something concrete to compare with the
          generated response.
        </p>
        <p>
          In a course explicitly teaching an AI-integrated professional workflow, the sequence may
          differ. State which steps are independent, collaborative, or AI-assisted and why.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Should I require students to submit every prompt and output?</summary>
        <p>No.</p>
        <p>
          Require only the process evidence necessary for the learning objective, assessment, and
          stated policy.
        </p>
        <p>
          A short prompt-and-output excerpt, source audit, revision rationale, or reflection may be
          sufficient. Avoid turning the assignment into extensive surveillance or burdensome
          recordkeeping.
        </p>
      </details>

      <details className="guideDetails">
        <summary>What should I grade when AI is permitted?</summary>
        <p>Grade what the student must learn:</p>
        <ul>
          <li>Legal accuracy</li>
          <li>Source verification</li>
          <li>Analysis</li>
          <li>Distinctions</li>
          <li>Application</li>
          <li>Revision choices</li>
          <li>Communication</li>
          <li>Reflection</li>
          <li>Professional judgment</li>
        </ul>
        <p>
          Do not reward generated polish as though it were evidence of student mastery.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Can AI provide feedback on student writing?</summary>
        <p>
          It can provide additional formative feedback when the exact service and material are
          approved.
        </p>
        <p>
          The student should evaluate the feedback rather than accept it automatically. Faculty should
          not represent generated feedback as authoritative, complete, or equivalent to instructor
          feedback.
        </p>
        <p>
          For student work,{" "}
          <Link href="/learn-ai/what-can-i-safely-share">check the service and data boundary</Link>{" "}
          before upload.
        </p>
      </details>

      <details className="guideDetails">
        <summary>How does this work in a clinic?</summary>
        <p>
          Use synthetic or explicitly approved material unless clinic leadership has approved the exact
          service and workflow.
        </p>
        <p>
          AI simulation can support interviewing, counseling, issue spotting, and reflection without
          using client information.
        </p>
        <p>
          Client, matter, confidential, privileged, or supervised-work material requires
          clinic-specific direction before any upload or connector access.
        </p>
      </details>

      <details className="guideDetails">
        <summary>Should every course require AI experience?</summary>
        <p>No.</p>
        <p>
          AI experience should serve the course&rsquo;s learning objectives, not novelty. Some
          assignments should remain AI-free because independent performance is the capability being
          developed or assessed.
        </p>
        <p>
          A course may combine AI-free foundational work with later AI-supported comparison,
          verification, simulation, or professional-workflow activities.
        </p>
      </details>

      <details className="guideDetails">
        <summary>What if students do not want to use AI?</summary>
        <p>
          Consider privacy, accessibility, cost, account, ethical, environmental, religious, and other
          concerns.
        </p>
        <p>
          When AI use is not itself an indispensable learning objective, provide an equivalent non-AI
          route.
        </p>
        <p>
          When direct AI use is the learning objective, explain the approved service, purpose, data
          protections, required activity, and available support before students begin.
        </p>
      </details>

      <WorthRepeating>
        Name the legal skill. Bound the AI role. Grade the student&rsquo;s judgment.
      </WorthRepeating>

      <section aria-labelledby="sls-example-heading">
        <p className="eyebrow">SLS example</p>
        <h2 id="sls-example-heading">
          AI can be the professional problem students learn to evaluate
        </h2>
        <article className="card relatedGuideCard">
          <h3>AI for Legal Help</h3>
          <p className="muted">
            An SLS Justice Innovation course in which interdisciplinary student teams analyze
            legal-aid workflows, identify appropriate AI opportunities and risks, develop and test
            tools, and consider responsible pilot design.
          </p>
          <p>
            <a href={AI_FOR_LEGAL_HELP} target="_blank" rel="noopener noreferrer">
              See the course
              <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
              <span className="srOnly"> (opens in a new tab)</span>
            </a>
          </p>
        </article>
        <p className="muted">
          This is an advanced course example, not a required model. The reusable idea is to make
          evaluation, legal judgment, affected users, and responsible implementation part of the
          substantive course work.
        </p>
      </section>

      <section aria-labelledby="start-small-heading">
        <h2 id="start-small-heading">Start with one assignment, not the whole course</h2>
        <p>
          Choose an assignment that already has a clear purpose and learning objective. Add one bounded
          AI interaction, test it yourself, explain the rationale to students, and review what the
          activity revealed about their learning.
        </p>
        <div className="actions">
          <a
            className="primary"
            href={TEACHING_COMMONS_ASSIGNMENTS}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Stanford&rsquo;s guide to integrating AI into assignments
            <span className="srOnly"> (opens in a new tab)</span>
          </a>
          <a
            className="secondary"
            href={assignmentAiBoundary.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Create or revise an AI course policy
            <span className="srOnly"> (opens in a new tab)</span>
          </a>
        </div>
        <p className="policyLede">
          <SlsPolicyLink>Read the current SLS student AI policy</SlsPolicyLink>
        </p>
        <article className="card relatedGuideCard">
          <h3>Plan an AI-supported law assignment</h3>
          <p className="muted">
            The Law Library can help identify a source-grounded workflow, approved service,
            verification activity, or student-facing AI literacy exercise.
          </p>
          <p>
            <a href="mailto:library@law.stanford.edu">Email library@law.stanford.edu</a>
          </p>
          <p className="muted" style={{ fontSize: "0.9rem" }}>
            Please do not send student records, clinic documents, client information, or other
            sensitive material.
          </p>
        </article>
        <p className="muted">
          For broader course-design and assessment consultation, faculty may also use Stanford Teaching
          Commons and Center for Teaching and Learning resources.
        </p>
      </section>

      <SourceNotes guide={guide} />

      <GuideSeriesStatus
        previous={previousGuide(guide.slug)}
        completion={
          <>
            <p className="seriesCompletionIntro muted">{CORE_AI_DECISIONS.completionBody}</p>
            <SeriesCompletion
              guides={seriesGuides}
              currentSlug={guide.slug}
              primaryAction={{
                label: "Integrate AI into an assignment",
                href: TEACHING_COMMONS_ASSIGNMENTS,
              }}
              secondaryAction={{
                label: "Visit the Student AI Learning Hub",
                href: STUDENT_AI_LEARNING_HUB_URL,
              }}
            />
          </>
        }
      />

      {/* A separate card, after the completion card and outside it. The first
          collection is finished; this is an invitation to a different collection,
          not the seventh step of this one — so it carries its own eyebrow and
          heading, less visual weight, and no "next guide" label. */}
      {continuationGuide && (
        <CollectionContinuationCard
          collection={WORKING_CRITICALLY_WITH_AI}
          guide={continuationGuide}
        />
      )}
    </GuideLayout>
  );
}

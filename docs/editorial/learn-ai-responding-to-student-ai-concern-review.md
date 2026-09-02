# Staff review — "How should I respond to a possible student AI-policy concern?"

Internal editorial record for `/learn-ai/responding-to-student-ai-concern/`. **Not rendered
anywhere on the website.** Open local questions stay questions here instead of
becoming public claims.

- Guide reviewed through: `2026-08-04` (`website/app/lib/guides.ts`)
- Stanford process snapshot verified `2026-08-04`, review due **`2026-09-04`**
  (`website/app/lib/stanfordStudentAiProcess.ts`)
- Detection guidance verified `2026-08-04`, review due `2026-11-04`
  (`website/app/lib/aiDetectionGuidance.ts`)
- SLS policy insert: **unconfirmed**, publishes no summary
  (`website/app/lib/slsStudentAiPolicy.ts`)
- Practice scenario reviewed `2026-08-04`, review due `2027-08-04`
  (`website/app/lib/studentAiConcern.ts`)
- Owner: Robert Crown Law Library

> **This page was reframed.** It was first drafted as the sixth primary guide,
> which put a faculty member's first AI teaching question at "has a student done
> something wrong?" The process content below was accurate and is preserved
> unchanged; it now lives beneath the teaching guide at
> `/learn-ai/students-use-ai-and-learn-law/` as a companion checklist, and its
> assignment-design material moved to that guide. See
> `learn-ai-students-use-ai-and-learn-law-review.md` for the teaching guide's own
> open items.

## What was verified, and how — read this first

Five load-bearing procedural claims were confirmed against Stanford sources
before they were encoded. The authoring environment's network policy blocked
direct page loads (403 on `teachingcommons.stanford.edu`), so each was confirmed
through search results that quote the official pages rather than by opening them.
**RCLL should open each source once before publication.**

| Claim on the page | Confirmed | Source |
| --- | --- | --- |
| Consult OCS before discussing a graded-work concern with the student | Yes | Teaching Commons, technology-tools guidance |
| A detector result is not required before consulting OCS | Yes | Teaching Commons, same page |
| Do not rely solely on detection tools for an AI-policy decision | Yes | Teaching Commons + OCS Faculty & TAs |
| Ungraded drafts may be resolved with the student directly | Yes | Teaching Commons, same page |
| No campus-wide plagiarism-detection tool for general use; advance notice required if an instructor adopts one | Yes | Teaching Commons + OCS |
| Honor Code concerns must be submitted within two months of discovery | Yes | OCS faculty reporting page, per the 2023 Charter |
| Instructor grade adjustment follows acceptance of responsibility or a finding | Yes | Student Conduct Penalty Code Bylaw, effective June 23, 2025 (approved March 10, 2025) |
| Stanford-wide default treats generative AI analogously to assistance from another person absent a clear course rule | Yes | OCS / BCA generative-AI policy guidance |

**Two URL substitutions were made deliberately.** The chunk brief supplied
fragment-anchored URLs of the form
`communitystandards.stanford.edu/policies-guidance#policies-guidance-links/...`.
Those anchors depend on the page's tab scripting, so a faculty member following
one may land on the policy index rather than the policy. Direct pages were
confirmed to exist and are used instead:

- `https://communitystandards.stanford.edu/generative-ai-policy-guidance`
- `https://communitystandards.stanford.edu/policies-guidance/student-conduct-penalty-code-bylaw`

Reverse this if RCLL prefers the index-with-anchor form.

**One thing surfaced that RCLL should expect to be asked about.** Stanford
University Libraries began offering **iThenticate** to faculty in February 2025
for duplication and AI detection in a **research-integrity** context. That does
not contradict "no campus-wide plagiarism-detection tool for general use" — it is
not a course-submission detector — but a faculty member who has heard of it may
read the campus-support sentence as out of date. Consider whether the insert
should name the distinction explicitly. It currently does not, because naming a
product in the detection insert is blocked by the validator.

## The source discrepancy this page does not resolve

Teaching Commons says to contact OCS and **not** discuss the matter with the
student before consulting. The OCS **Faculty & TAs** page contains wording that
contemplates questioning the student before referral when a concern continues.

The public guide uses the **more protective** sequence — consult OCS first for
graded work — and the discrepancy is recorded in
`stanfordStudentAiProcess.sourceDiscrepancies` with
`status: "staff-confirmation-required"`. `npm run lint` fails if that record is
deleted, and prints an open-discrepancy line on every run while it is unresolved.

When OCS confirms the current sequence, resolve it with a dated editorial change:
set `status: "resolved"`, add `resolvedOn`, and update the source note. Do not
delete the record.

## Awaiting confirmation — Office of Community Standards

1. **The preferred current sequence for graded work**: consult OCS before student
   contact (Teaching Commons), or question the student first in some
   circumstances (Faculty & TAs wording). This is the single most consequential
   open item on the page.
2. Whether the public page should state the **two-month reporting period** or say
   only "act promptly" and leave the exact deadline to the linked OCS page. It
   currently states the period, marked `timeSensitive`, so it disappears once the
   snapshot is overdue.
3. Whether `community-standards@stanford.edu` remains the correct **initial
   consultation address**.
4. Whether consultation remains **nonbinding** and does not initiate an
   investigation until a written concern is filed.
5. Whether the **graded / ungraded distinction** is stated accurately.
6. Whether the **no-penalty-grading** language is accurate for SLS faculty.
7. Whether the **Penalty Code** description of grade adjustments after acceptance
   or a finding is accurate and sufficient.
8. Whether the **sample neutral conversation questions** are consistent with OCS
   guidance.
9. Whether faculty should preserve any **Canvas metadata** beyond the ordinary
   records named in step 3.
10. Whether faculty may ask for **AI-use logs that were not required in advance**.
    The page currently says to ask OCS before requesting anything beyond the
    announced assignment materials.
11. Whether the guide should **advise against surprise oral re-examination** in the
    terms used. The disclosure permits announced, consistently designed oral
    assessment and rejects only the improvised single-student guilt test.
12. Whether Stanford's **lack of a campus-wide general plagiarism detector**
    remains accurate, and whether the **advance-notice** wording is current.

## Awaiting confirmation — SLS Office of Student Affairs

13. The **exact current text, effective date, and owner** of the SLS "Use of
    Generative AI Technology" policy. Nothing about its contents is published; the
    record's `status` is `staff-confirmation-required` and the validator refuses a
    summary without `verifiedOn`, `reviewBy`, `effectiveDate`, `approvedBy`,
    `approvedOn`, and a stated relationship to the Stanford-wide default.
14. Whether the SLS policy **supplements or supersedes** the Stanford-wide default
    when no course-specific AI rule exists.
15. Whether the SLS policy permits instructors to impose any academic consequence
    **outside or before** the OCS process. **Do not infer the answer** — the
    validator rejects an automatic grade consequence stated without the OCS
    process that governs it.
16. Whether the **Office of Student Affairs** should be named as an additional
    contact for SLS-specific policy questions. It currently is not.
17. Whether **exams, take-home exams, papers, clinics, journals, and experiential
    courses** require different local routing.
18. Whether any **internal SLS academic-integrity procedure** should be linked or
    described.

## Awaiting confirmation — Office of Accessible Education

19. Whether OAE should review the **accommodation and disability language**. The
    page routes accommodation questions to OAE, tells faculty not to ask a student
    to disclose a diagnosis, and lists disability, diagnosis, and language
    background among the things a conversation must not ask about.

## Awaiting confirmation — RCLL editorial

20. Whether the **non-native English detector-bias source** should stay in the
    public guide (currently in the "weak evidence" disclosure, qualified to the
    detectors that study evaluated) or move to Source Notes only.
21. Whether the **assignment AI boundary template** needs additional SLS language
    for legal writing, exams, clinics, or journals.
22. Whether the **Student AI Learning Hub** is the preferred student learning
    referral after a concern is resolved.
23. Whether `library@law.stanford.edu` should be offered for **assignment-design**
    questions on this page. It currently is, with an explicit instruction not to
    send student work or conduct-case material.
24. Whether the displayed **six-minute read time** remains accurate.
25. Whether **"Policy first. Evidence second. Process always."** is the preferred
    closing line.

## What this page deliberately does not do

- **Collects nothing.** No concern form, OCS proxy form, student-work upload,
  student-name field, detector score field, or free-text capture. The guide adds
  no `<form>`, `<input>`, `<textarea>`, or `<select>`; lint fails the build if one
  appears, or if the page gains a `fetch`, an `onSubmit`, or an iframe.
- **Calls nothing.** No detector integration, no model call, no legal-research API,
  no misconduct classifier, no "should I report?" recommender, no AI-policy
  compliance score.
- **Scores nothing.** No guilt score, probability of AI use, red/amber/green
  verdict, or progress meter. The seven evidence categories carry no strength
  ranking, and none of them claims to determine responsibility — the validator
  rejects a category whose `whatItCanEstablish` mentions responsibility, an Honor
  Code violation, or misconduct.
- **Never begins with a detector.** The workflow's order is fixed by its data
  record: step 1 must be `pause-conclusion` and step 2 must be `anchor-policy`, or
  the build fails. No step's actions may direct faculty to run a detector, demand
  credentials or a device, or impose a suspicion-based grade consequence.
- **Never conflates the offices.** OCS decides the conduct process; SLS Student
  Affairs owns the local policy; OAE handles accommodations; RCLL helps with
  research, citation verification, tool choice, and assignment design. The help
  section states RCLL's limits explicitly.
- **Names no detector product**, anywhere — not in the guide, not in the detection
  insert, not on AI Resources. Lint fails on seven vendor names in the resource
  directory, and the detection record's validator rejects a product name, a
  ranking, an accuracy percentage, or a purchasing recommendation.

## How staleness behaves

Three records expire on different clocks, and none of them takes the page down.

- **Stanford process snapshot** (monthly): once overdue, the **two-month deadline**
  and the **student-contact sequence** are withheld — `displayableGradedWorkActions()`
  and `displayableProcessRules()` drop anything marked `timeSensitive` — and a
  stale label appears above the remaining actions. The OCS email, the reporting
  page, and the durable six steps stay.
- **Detection guidance** (quarterly): once overdue, the **campus-support** and
  **advance-notice** claims are replaced with a stale label. The durable position
  ("do not rely solely on a detector") and the fairness note stay, because neither
  is a procedural detail that expires.
- **Practice scenario** (annually): a warning only; the answer key does not depend
  on a current procedure beyond "consult OCS".

`npm run lint` warns on each. `SLS_STRICT_PROCESS=1 npm run lint` fails instead,
for a CI job that should refuse to ship a stale procedural claim.

## Update process

Durable content — the six steps, the seven categories, the governing-materials
checklist, the graded/ungraded paths, the conversation questions, and the practice
scenario — is in `app/lib/studentAiConcern.ts`. Time-sensitive content is split
across `app/lib/stanfordStudentAiProcess.ts`, `app/lib/slsStudentAiPolicy.ts`, and
`app/lib/aiDetectionGuidance.ts`. The assignment template is in
`app/lib/assignmentAiBoundary.ts`, which generates the visible field list and the
copyable text from the same records so the two cannot drift.

Nothing is fetched at build time or in the browser: not OCS, Teaching Commons, the
SLS Student Affairs page, a detector vendor, or any student system. All policy and
process changes require human review and a repository commit.

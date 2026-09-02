# Staff review — "How can students use AI and still learn the law?"

Internal editorial record for `/learn-ai/students-use-ai-and-learn-law/`. **Not
rendered anywhere on the website.** Open local questions stay questions here
instead of becoming public claims.

- Guide reviewed through: `2026-08-04` (`website/app/lib/guides.ts`)
- Case Brief Stress Test and sample rubric reviewed `2026-08-04`
  (`website/app/lib/caseBriefStressTest.ts`)
- Assignment AI learning boundary reviewed `2026-08-04`
  (`website/app/lib/assignmentAiBoundary.ts`)
- SLS policy: **unconfirmed**, linked but never summarized
  (`website/app/lib/slsStudentAiPolicy.ts`)
- Owner: Robert Crown Law Library

## Why this guide replaced the previous sixth guide

The first sixth guide was *"My student used AI. What should I do now?"* — accurate,
carefully sourced, and framed wrongly. It made a faculty member's first AI teaching
question "has a student done something wrong?", which is the opposite of what most
faculty actually need.

This guide is learning-first. The concern-response material was not discarded: it
moved to a companion checklist at `/learn-ai/responding-to-student-ai-concern/`,
with its own review record. Nothing accurate was lost.

**The old route was publicly deployed**, so `/learn-ai/student-used-ai/` now
returns a **308** to the new slug. Next.js cannot emit a redirect under
`output: "export"`, so it lives in the repository-root `vercel.json`. Both the
bare and trailing-slash forms are listed, because the site sets
`trailingSlash: true`.

That redirect carries no explanatory `comment` field: Vercel validates
`vercel.json` against its own schema and **rejects the entire configuration on an
unknown key inside a redirect**, which fails the deployment even though the build
succeeds. The reason for the redirect is recorded here and in a comment in
`website/scripts-lint.mjs` instead. `npm run lint` fails if either entry
disappears, stops being permanent, points somewhere else, gains an unsupported
property, or if the old page directory reappears — so a schema rejection is
caught before a push rather than in Vercel.

## Content balance, measured

The revision brief asked for roughly 70% learning design, 15% boundary
communication, 15% concern response. Measured against the rendered page text:

| Region | Rendered position | Share |
| --- | --- | --- |
| Answer, design checks, modes, activities, case-brief lab, rubric, evidence, literacy | 1–55% | ~54% |
| Boundary communication (SLS policy section, boundary template, pre-launch checks) | 55–69% | ~14% |
| Concern response | 69–72% | ~3% |
| Closing, disclosures, SLS example, support | 72–100% | ~28% |

Learning-related content is roughly 82% of the page; the concern section is well
under its 15% budget, which is the safe direction. The concern section is section
**10 of 14**, and `npm run lint` fails if it moves into the first 60% of the
sections or if any design, activity, rubric, policy, or literacy section falls
after it.

## Awaiting confirmation — SLS Office of Student Affairs

1. The **exact current text** of the "Use of Generative AI Technology" policy.
2. Its **effective date**.
3. Whether it **supplements or supersedes** Stanford-wide default guidance.
4. How it interacts with **course- and assignment-specific** policies.
5. How it interacts with the **OCS process**.
6. Whether the policy link belongs in the guide hero, immediately beneath the
   Faculty move, or both. It currently sits immediately beneath the Faculty move,
   in the policy section, in the copyable boundary, and in source notes — four
   places, and lint fails if any of them loses it.

Nothing about the policy's contents is published. `slsPolicyIsConfirmed()` gates
any summary, and the record's validator refuses to let one exist without an
approved wording, an effective date, `verifiedOn`, `reviewBy`, an approving owner,
and a stated relationship to the Stanford-wide default.

## Awaiting confirmation — RCLL editorial

7. Whether **"How can students use AI and still learn the law?"** is the preferred
   faculty-facing title.
8. Whether **`/learn-ai/students-use-ai-and-learn-law/`** is the preferred route.
9. Whether the **six activity patterns** fit the intended range of SLS courses.
   They currently cover doctrinal, research and writing, advocacy, experiential,
   and drafting; the by-course index on the page shows which patterns fall where.
10. Whether the **source-audit language** aligns with current RCLL instruction.
11. Whether the **Case Brief Stress Test** should require an independent first
    brief or permit an instructor-supplied pre-AI baseline. It currently *requires*
    the independent attempt, and the validator enforces that Part 1 comes before
    any AI use — changing this means changing the record, not just the prose.
12. Whether the **sample rubric percentages** should remain visible. The
    disclaimer that they are not a Stanford or SLS scheme is a rendered field, not
    a comment, and the validator requires independent analysis plus source audit
    to carry at least 50% between them.
13. Whether an **equivalent non-AI route** should be required, recommended, or
    decided assignment by assignment. The guide currently recommends it and the
    boundary template includes a field for it.
14. Whether the **AI for Legal Help** course should appear publicly as an
    inspiration example.
15. Whether the **Student AI Learning Hub** should be built directly into one or
    more assignment patterns rather than linked at the end.
16. Whether the **companion concern page** should appear on `/learn-ai/` at all, or
    only in AI Resources and from this guide. It currently appears in a restrained
    "Faculty process resources" area beneath the collection.
17. Whether the **eight-minute read estimate** is accurate.

## Awaiting faculty review

18. **Clinical faculty** on the synthetic-client interview pattern. Its guardrails
    require fictional or fully approved material and forbid entering clinic,
    client, or matter information; the validator enforces both, and also requires
    that faculty or supervisory review be retained.
19. **Legal writing faculty** on the case-brief, verification, and drafting
    patterns.
20. **Experiential faculty** on the simulation guidance generally.
21. Whether a **copyright or doctrinal faculty member** should review the
    Case Brief Stress Test's transfer hypothetical guidance.

## What this guide deliberately does not do

- **Generates nothing.** No assignment generator, AI-policy generator, grading
  tool, detector, chatbot, or model call. Lint fails on a `<form>`, an `<input>`,
  a `fetch`, an `onSubmit`, or a function named like a generator or grader.
- **Collects nothing.** No student information, course name, assignment text,
  prompt content, output, completed rubric, policy draft, or reflection. The two
  copyable blocks are rendered `<pre>` text; nothing a faculty member edits is
  stored or transmitted.
- **Scores nothing.** No assignment quality score, automatic approval, or
  red/amber/green classification. The five design checks pair a stronger and a
  weaker example, both labelled in text, and the validator rejects a record where
  they are identical.
- **Ranks nothing.** The six activity patterns are ordered for reading, not by
  quality, and the course filter is anchor links — every pattern is in the DOM at
  all times and remains available with JavaScript disabled.
- **Never lets AI hold the legal judgment.** The validator rejects an activity
  whose AI role decides, determines, concludes, or resolves the legal question, or
  describes the output as an answer key.
- **Never paraphrases the SLS policy.** Lint fails on "the SLS policy says /
  states / requires / prohibits / permits / allows".

## Update process

Durable content is split by what it is: `studentAiLearningDesign.ts` (five design
checks, five modes, pre-launch questions, AI literacy, proportionate evidence),
`lawAiLearningPatterns.ts` (six activity patterns and the course categories),
`caseBriefStressTest.ts` (the complete activity, its prompt, and the sample
rubric), and `assignmentAiBoundary.ts` (the sixteen-field template, whose visible
fields and copyable text are generated from the same records so they cannot
drift).

Each validates at import, so `npm run build` fails on a missing design check, a
tool-first first question, a reordered case-brief activity, a rubric that does not
total 100%, a boundary template that opens with prohibitions rather than the
learning rationale, or a pattern missing any of its seven required fields.

Nothing is fetched at build time or in the browser.

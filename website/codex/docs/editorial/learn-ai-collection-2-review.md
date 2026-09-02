# Staff review — Collection 2 and its first guide

Internal editorial record for the **Working critically with AI** collection and
`/learn-ai/why-does-it-agree-with-me/`. **Not rendered anywhere on the website.**
Open local questions stay questions here instead of becoming public claims.

- Collections record: `website/app/lib/learnAiCollections.ts` (reviewed `2026-08-04`)
- Guide record: `website/app/lib/guides.ts` (reviewed `2026-08-04`)
- Agreement types: `website/app/lib/aiAgreementTypes.ts`
- Framework: `website/app/lib/criticalReviewFramework.ts`
- Exercise: `website/app/lib/promptComparisonExercise.ts`
- Reusable prompt: `website/app/lib/criticalReviewPrompts.ts` (reviewed `2026-08-04`)
- Owner: Robert Crown Law Library

## The structural decision

**Core AI decisions is complete at six guides and is not reopened.** The new guide
starts a separate collection, numbered from 1 again. A reader sees "Guide 1 of 5";
only a maintainer reading `globalOrder` sees 7.

Three checks hold that in place, and each fails the build rather than warning:

- `learnAiCollections.ts` fails if `core-ai-decisions` has anything other than six
  guides, or if a collection declared complete contains a planned guide.
- `guides.ts` fails if a forward or backward series link crosses a collection
  boundary — the mechanism that would turn a finished collection into the first
  half of a longer sequence.
- `npm run lint` fails if "Guide 7", "Lesson 7", "Module 7", or "7 of 11" appears
  in any Learn AI page or on the homepage.

## Awaiting confirmation — RCLL editorial

1. Whether the collection title should be **Working critically with AI**, or
   *Critical AI collaboration*, *Thinking with AI*, or another approved title.
2. Whether the collection should display **"Collection 2 · In progress"**. It
   currently does, as the eyebrow above the collection heading.
3. Whether the public guide position should display **"Guide 1 of 5"**. It
   currently appears above the H1 as "Working critically with AI · Guide 1 of 5".
4. Whether all **five planned guide titles** are approved. They are recorded, so a
   title change is one field per guide.
5. Whether **all four planned cards** should appear immediately, or only the next
   one. All four currently appear, as non-interactive articles labelled "Coming
   later".
6. Whether **"Why does it agree with everything I say?"** remains the preferred
   real-question title.
7. Whether **"sycophancy"** belongs in the main body or only in terminology and
   source notes. It currently appears once in the body, attributed to researchers
   and immediately qualified ("Not every agreeable answer is sycophantic"), and in
   the source note for the Anthropic study.
8. Whether the **three agreement distinctions** are sufficient and appropriately
   named: requested advocacy, inherited premise, evidence-based agreement.
9. Whether **"Build it. Break it. Check it. You decide."** is the preferred
   framework. The final label is validated: renaming it fails the build.
10. Whether the **fictional seminar assignment** is suitable for the faculty
    audience. It is a counterargument-generation activity with a reflection, and it
    contains no student information.
11. Whether **teaching-and-learning staff** should review the exercise criteria.
12. Whether **"Agreement is not confirmation. Disagreement is not independence."**
    is the preferred closing line.
13. Whether the **Anthropic research and the OpenAI incident** should remain
    visible in Source Notes. Both carry their qualification in the record, and lint
    fails if either qualification is removed: the study "does not establish that
    every agreeable answer is sycophantic or false", and the incident "must not be
    generalized to every OpenAI model or current AI product".
14. Whether the **Guide 6 continuation card** should appear immediately after the
    completion card or after the help link. It currently sits immediately after the
    completion card, as a separate card with a dashed border and less visual weight.
15. Whether the new guide should be **featured on the homepage**. It currently
    appears as a secondary entry inside the existing Learn section, under "New
    collection · Working critically with AI", with "What is AI actually good at?"
    still first.
16. Whether **library@law.stanford.edu** remains the correct support address.
17. Whether the **five-minute read-time estimate** is accurate.
18. Whether Collection 2, Guide 2 should keep the title **"Why did it forget what
    I told it earlier?"**
19. Whether a future **teaching-focused collection** should stay unpublished until
    its first guide is ready. The model already enforces this: `publicCollections()`
    returns only collections with a published guide, and a collection declared
    "in-progress" with nothing published fails validation.

## Two deviations from the brief, and why

**1. `nextGuideStatus` is derived, not stored.** The brief lists it as a field on
each guide. The repository's existing rule is that a neighbour's status is read
from that neighbour's own record, because a copied status is the field that goes
stale the day a planned guide is published. `nextGuideStatus(slug)` is a function
over the records instead. Nothing is lost; there is simply one place to change.

**2. The reusable prompt's copy button reads "Copy reusable critical-review
prompt".** The brief specifies "Copy critical-review prompt" for both the exercise's
second prompt and the reusable prompt, and separately requires copy buttons to have
unique accessible names. Both cannot hold. The exercise keeps the briefed pair, and
the reusable prompt gains one word. Lint fails if the three labels ever collide
again.

A third item is worth naming as a judgment call rather than a deviation: the brief
suggests a homepage featured order of guide 1, the new guide, then guide 6. The
homepage already names all six core guides in a numbered list and links guide 6
prominently in the student-learning card, so a featured trio would have named two of
them twice. The new collection is surfaced as its own labelled entry in the same
section instead.

## What this guide deliberately does not do

- **No model call.** Nothing on the page contacts a service. Lint fails on `fetch`,
  a vendor endpoint, a form, an input, a textarea, or a file control anywhere in the
  guide's components or records.
- **No detector and no score.** No sycophancy detector, no classification quiz, no
  confidence score, no verdict. Lint fails on a function named like a scorer or
  detector.
- **No ranking.** No most-honest model, no least-sycophantic product, no vendor
  recommendation. Lint fails on each phrasing. The three vendor-related sources are
  a study and two incident reports, and none of them supports a ranking.
- **Collects nothing.** The two exercise prompts and the reusable prompt are
  rendered `<pre>` text with copy buttons; there is no field to type into, so no
  faculty proposal, preferred conclusion, or decision can be captured.
- **Never anthropomorphizes.** The agreement-type validator rejects a record that
  says the system wants, believes, likes, hopes, or fears anything.
- **Never assigns the decision to the system.** The framework validator rejects a
  step that does, and rejects a final label other than "You decide".

## Verification performed

- `npx tsc --noEmit`, `npm run lint`, and `npm run build` clean.
- Every record validator verified by deliberately breaking it and restoring it:
  a seventh guide appended to Collection 1, a planned guide inside the complete
  collection, the framework's final step renamed to "AI decides", the exercise's
  optional live run made mandatory, and `SOURCE NEEDED` removed from the reusable
  prompt.
- Every new lint guard verified the same way: a route created for a planned guide,
  "Guide 7 of 11" placed in the guide's body, the continuation card removed from
  guide 6, a `fetch` added to the guide's components, and two copy controls given
  the same label.
- No horizontal overflow at 320, 768, 1024, or 1440px on the landing page, the new
  guide, guide 6, or the homepage. One `h1` per page and no heading-level skips.
- No console errors on any of those routes.
- Without JavaScript: the guide renders 3 agreement types, 4 framework steps, 3
  full prompts, 4 disclosures, and 5 source notes; the landing page renders 2
  collections, 7 published cards, and 4 planned cards with **0** links inside them.
- Copy by keyboard works and announces which prompt was copied through the existing
  `aria-live` region ("Advocacy prompt copied to your clipboard").
- Details/summary elements start closed and open with Enter.
- Print keeps the collection line, answer-first block, faculty move, agreement
  types, framework, both prompts, the answer-key summary, the sources, and the
  review date.
- Search: the guide is first for "AI agrees with me", "AI yes-man", "critical review
  prompt", "confirmation bias", "false balance", and the full question. For the bare
  term "sycophancy" it is second, behind the "Test What AI Can Do" skill file, whose
  own summary names sycophancy as one of the failure modes it tests — a legitimate
  match, left alone rather than fixed by inflating one record's score.
- None of the four planned guides appears in search results, the sitemap, or as a
  route.

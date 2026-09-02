# Staff review — "Why does it sound so certain?"

Internal editorial record for `/learn-ai/why-does-it-sound-so-certain/` (Collection 2,
Guide 3 of 5). **Not rendered anywhere on the website.** Open local questions stay
questions here instead of becoming public claims.

- Guide record: `website/app/lib/guides.ts` (reviewed `2026-08-05`)
- Claim statuses: `website/app/lib/aiClaimStatuses.ts`
- Four-part framework: `website/app/lib/evidenceUncertaintyFramework.ts`
- **Simulated exercise: `website/app/lib/confidenceAuditExercise.ts`
  (reviewed `2026-08-05`, review by `2027-02-05`)**
- Reusable prompt: `website/app/lib/evidenceUncertaintyPrompts.ts` (reviewed `2026-08-05`)
- Components: `website/app/components/ConfidenceGuide.tsx`
- Collection record: `website/app/lib/learnAiCollections.ts` (reviewed `2026-08-05`)
- Owner: Robert Crown Law Library

## The one thing to re-check before publication

The simulated response is **staff-written and deliberately false**. It is not a
transcript of any product, and the page says so twice — in the exercise intro and
beneath the block itself.

Four exclusions travel with it, and each is enforced rather than asserted:

- `data-nosnippet` on the block, checked by `npm run lint`.
- `excludeFromInternalSearch`, `excludeFromStructuredData`, `useDataNoSnippet`, and
  `staffReviewRequired` on the record, checked by `npm run lint`.
- The claim strings appear in the record and nowhere else. Lint fails if `by 30%`,
  `benefit every student`, `without a pilot`, or the critical-thinking sentence
  appears as page source, so the page can only render them through the component
  that always prints the simulation label first.
- Lint fails if any percentage appears inside the page's `metadata` block, so the
  meta description and Open Graph strings cannot carry the fictional figure.

**Verified in both directions.** With the string re-inserted into the page, lint
fails and names the file; with it removed, lint passes.

## Awaiting confirmation — RCLL editorial

1. Whether the title should remain **"Why does it sound so certain?"**
2. Whether **"Claim. Evidence. Uncertainty. Next check."** is the preferred faculty
   move. The four-word form is validated: renaming it fails the build.
3. Whether the **five claim-status labels** are clear for nontechnical faculty:
   *Directly supported*, *Interpretation or inference*, *Prediction or estimate*,
   *Recommendation or value judgment*, *Unknown or source needed*.
4. Whether **"Directly supported"** should instead be *Source backed*, *Direct
   source support*, or another approved term. The record's id is
   `directly-supported`, so a label change is one field.
5. Whether **"Recommendation or value judgment"** should be one combined category
   or two separate categories. It is currently one.
6. Whether the guide should use the term **"calibration"** in the main body or
   primarily in Source Notes. It currently appears in the body, defined
   immediately, and in three source notes.
7. Whether the **short calibration definition** is understandable and accurate:
   "a system is calibrated at 80% when answers assigned 80% confidence are correct
   about 80% of the time under the evaluated conditions."
8. Whether the **fictional seminar-assignment response** is appropriate. It is a
   required counterargument-generation activity, and it contains no student
   information, course number, or real person.
9. Whether the **30% unsupported-precision example** is sufficiently obvious
   without becoming cartoonish.
10. Whether the **institutional-approval sentence** is useful or unnecessarily
    repeats the safe-sharing guide.
11. Whether the simulated response should be reviewed by **teaching-and-learning
    staff** before publication.
12. Whether the **rewritten answer in the key** is appropriately bounded: "This
    activity may provide additional counterargument practice, but its effect on
    critical thinking in this seminar has not yet been established."
13. Whether **"Confident wording is not evidence"** is the preferred closing line.
    It is validated: removing it fails lint.
14. Whether the **OpenAI 2022 and Anthropic 2022 calibration studies** should
    remain in public Source Notes. Both carry an explicit qualification that the
    result does not validate self-reported confidence in current products.
15. Whether **MetaFaith** should remain in public Source Notes.
16. Whether the current **OpenAI Model Spec** should be included. It is currently
    listed as an intended-behavior specification, not as evidence about any
    individual response.
17. Whether an additional **Stanford or SLS source on evidence-based decision
    making** should be added.
18. Whether the guide should include a **law-specific confidence example** in
    addition to the teaching example. It currently routes legal claims to
    `/learn-ai/verify-an-ai-legal-claim/` rather than duplicating that audit.
19. Whether **library@law.stanford.edu** remains the appropriate support address.
20. Whether the **six-minute read-time** estimate remains accurate.
21. Whether Collection 2, Guide 4 should retain the title **"How do I get useful
    feedback instead of generic praise?"**

## Decisions taken, and where they are enforced

- **Collection 1 is untouched and complete at six guides.** `learnAiCollections.ts`
  and `npm run lint` both fail if it gains a seventh.
- **Counts are derived.** Nothing stores "3 published"; the landing page and the
  status line read the guide records.
- **Guides 4 and 5 stay planned**: no route, no sitemap entry, no search record, no
  canonical or Open Graph metadata, and a non-interactive card whose status is
  announced before its title.
- **No analytics events were added.** The site runs Vercel page-view analytics and
  has no custom-event system; guides 1 and 2 added none either. If RCLL later wants
  events, the only five permitted on this page are
  `learn_ai_confidence_guide_open`, `learn_ai_uncertainty_ledger_copy`,
  `learn_ai_uncertainty_prompt_copy`, `learn_ai_uncertainty_source_open`, and
  `learn_ai_confidence_previous_open` — names only, with no claim, ledger, prompt,
  status selection, or free text attached.
- **Nothing on the page scores, classifies, measures, uploads, or calls.** The
  reader assigns the statuses; the page shows what the five of them mean. Lint
  fails on a form, an input, a textarea, an upload control, a `fetch`, a model
  endpoint, or a function named like a scorer or classifier in any of the six
  files behind this guide.
- **The ledger is rendered text with a copy button.** There is no field to type
  into, so no faculty claim, ledger, or decision can be collected, stored, or
  transmitted.

## Research-review items

- The five research sources are dated. Re-check annually for later work, and never
  restate a calibration result measured on one model, task, or evaluation as a
  description of current products generally. The guide says this in the body; the
  source notes repeat the qualification per source.
- The NIST profile page was last updated 2026-04-08. Re-read before the next
  annual review and whenever NIST publishes a revision.

# Staff review — "Why did it forget what I told it earlier?"

Internal editorial record for `/learn-ai/why-did-it-forget/` (Collection 2, Guide
2 of 5). **Not rendered anywhere on the website.** Open local questions stay
questions here instead of becoming public claims.

- Guide record: `website/app/lib/guides.ts` (reviewed `2026-08-04`)
- Context locations: `website/app/lib/aiContextLocations.ts`
- Recovery workflow: `website/app/lib/contextRecoveryWorkflow.ts`
- Exercise: `website/app/lib/contextReceiptExercise.ts`
- Reusable prompt: `website/app/lib/contextReceiptPrompts.ts` (reviewed `2026-08-04`)
- **Current product features: `website/app/lib/currentContextFeatures.ts`
  (verified `2026-08-04`, review by `2026-09-04`)**
- Owner: Robert Crown Law Library

## The one thing to re-check before publication

Everything product-specific on this page lives in one dated record with a
**monthly** review date, because interface labels, defaults, retention rules, and
workspace availability are the fastest-moving claims on the site. Past
`reviewBy` the insert hides its feature summaries, shows "Current feature
examples due for review", keeps the official links, and warns at build time;
`SLS_STRICT_FEATURES=1` turns that warning into a build failure for CI.

**Verified in both directions.** With the dates rolled back, the rendered section
shows the stale message, no feature summary survives, and all eight official links
remain.

Nothing is fetched. Every sentence in that record was read from the official page
by hand on 2026-08-04, and changing one requires a human and a commit.

## Awaiting confirmation — RCLL editorial

1. Whether the title should remain **"Why did it forget what I told it earlier?"**
2. Whether the answer-first phrase **"It may not have 'forgotten'"** is clear and
   appropriately non-anthropomorphic. The quotation marks are doing the work: the
   guide's own vocabulary is "outside the current working context".
3. Whether **"Restate it. Reattach it. Review the context."** is the preferred
   faculty move.
4. Whether the four context-location labels are clear for nontechnical faculty:
   *The current conversation*, *Memory and persistent instructions*, *Active
   sources and tools*, *Your authoritative record*.
5. Whether **"Your authoritative record"** should instead be *Project record*,
   *Source record*, *Faculty record*, or another approved phrase. The record's id
   is `authoritative-external-record`, so a label change is one field.
6. Whether the context-receipt prompt is **short enough** for regular faculty use.
   It has eight numbered sections and four prohibitions.
7. Whether the receipt should require the system to **wait for explicit
   confirmation**. It currently does, in both the packet and the reusable prompt.
8. Whether the fictional **course-design scenario** is suitable.
9. Whether the activity should use a **legal-research scenario** rather than a
   teaching-design scenario.
10. Whether the current **AI Playground context and retention** descriptions
    remain accurate immediately before publication.
11. Whether the AI Playground **Memories** feature remains on by default.
12. Whether **File Search** remains the correct current interface label.
13. Whether attachments and generated files remain subject to **daily deletion**.
    This is the sharpest claim on the page — a saved conversation outlasting its
    attachment is exactly the failure the guide describes — so it needs a fresh
    read of the FAQ before publication.
14. Whether **ChatGPT memory** features are enabled or restricted in the current
    Stanford ChatGPT Edu workspace.
15. Whether **Claude account and project instruction** features are available under
    the current Stanford Claude for Education arrangement.
16. Whether the canonical site display name for the standalone Google notebook
    service remains current. The page renders whatever the registry says; it is
    **Gemini Notebook** today.
17. Whether the current **NotebookLM source-selection and synchronization** wording
    is accurate.
18. Whether **Lost in the Middle** belongs in visible Source Notes or only in
    internal research notes. It is currently visible, with its scope stated: the
    study evaluated specified models and tasks and does not establish that every
    current model fails the same way.
19. Whether the guide should link to an **RCLL workflow or project-management
    resource**. It currently offers only the Law Library email and the
    tool-selection guide.
20. Whether **library@law.stanford.edu** remains the correct support address.
21. Whether the **five-minute read-time estimate** remains accurate.
22. Whether Collection 2, Guide 3 should keep the title **"Why does it sound so
    certain?"**

## What the records refuse to say

Each of these is a plausible sentence that would make the guide teach the opposite
of its own lesson, and each fails the build:

| Record | Rejects |
| --- | --- |
| `aiContextLocations.ts` | memory as a verbatim transcript; the visible interface as identical to model context; a source's presence as proof it is active; the AI conversation as the authoritative project record; every product managing context the same way; any anthropomorphism; any exact context size |
| `contextRecoveryWorkflow.ts` | a workflow that only asks "do you remember?"; a reattach step without source identity or version; a receipt described as an audit or forensic log; asking the system to infer missing authoritative content; a final step without human comparison |
| `contextReceiptExercise.ts` | a non-fictional scenario; a mandatory live run; a packet missing any constraint the answer key asks a reader to check; an answer key claiming the receipt proves internal context; an answer key that treats only one outcome as success |
| `contextReceiptPrompts.ts` | a missing or out-of-order section (eight required); a missing source label; any of the four prohibitions dropped; a limitation that promises proof |
| `currentContextFeatures.ts` | an unknown `toolRegistryId`; a repeated registry description, access label, risk classification, or former product name; an exact context size; a longest-context or best-memory ranking; "every Stanford account"; an exhaustive memory-source claim; an unattributed feature sentence |

Lint adds what a record cannot see: no product-specific label in the durable
prose, no context size in the guide or its components, no bypass of the freshness
gate, no `fetch`, form, input, textarea, upload, token counter, or context score,
and no two copy controls sharing an accessible name.

## What this guide deliberately does not do

- **No context inspector, token counter, or memory auditor.** Nothing on the page
  can read a conversation, a file, or a memory store.
- **No model call.** The packet and the prompt are rendered `<pre>` text with copy
  buttons. There is no field to type into, so no conversation, packet, receipt,
  file name, or faculty decision can be captured.
- **No scraping.** No Stanford, OpenAI, Anthropic, or Google page is fetched at
  build time or in the browser.
- **No ranking.** No largest context window, no best memory, no product comparison.
  The insert's own intro says so, and the validator requires that sentence.

## Verification performed

- `npx tsc --noEmit`, `npm run lint`, `npm run build` clean. No console errors.
- Every record validator verified by breaking it and restoring it: an unknown tool
  registry id, an "exhaustive" memory claim, memory described as a complete
  transcript, the source version dropped from the reattach step, and a constraint
  removed from the context packet.
- Every new lint guard verified the same way: a product label placed in the durable
  prose, a token count in the guide, the freshness gate bypassed, and guide 1's
  forward description removed.
- Stale state verified: summaries hidden, message shown, eight official links
  retained, warning at build time, and `SLS_STRICT_FEATURES=1` failing the build.
- No horizontal overflow at 320, 768, 1024, or 1440px on this guide, guide 1, the
  landing page, or AI Resources. One `h1` each; no heading-level skips.
- Without JavaScript: 4 context locations, 3 recovery steps, both complete prompts
  (packet and receipt, including every constraint), 4 disclosures, 4 feature
  records, and 9 source notes render. The only form control on the page is the
  site-wide header search.
- Copy by keyboard works and announces "Context-packet exercise copied to your
  clipboard" through the existing `aria-live` region. Disclosures start closed and
  open with Enter.
- Print keeps the collection line, answer-first block, faculty move, four
  locations, three steps, both prompts, the answer-key summary, the feature review
  date, the sources, and the guide's review date.
- Search: the guide is first for "AI forgot", "context window", "AI memory",
  "context receipt", "active sources", "lost in the middle", and "project
  instructions". None of the three remaining planned guides appears in search, the
  sitemap, or as a route.
- Landing page status line reads **"2 published · 3 planned"**, derived; Collection
  1 still reads "6 published guides".

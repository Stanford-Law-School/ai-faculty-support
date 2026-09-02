# Staff review — "Why did it invent a case?"

Internal editorial record for `/learn-ai/why-did-it-invent-a-case/`. **Not
rendered anywhere on the website.** Open local questions stay questions here
instead of becoming public claims.

- Guide reviewed through: `2026-08-03` (`website/app/lib/guides.ts`)
- Simulated exercise reviewed `2026-08-03`, re-review due `2027-08-03`
  (`website/app/lib/citationProvenance.ts`)
- Legal-hallucination count read `2026-08-03` from a source last updated
  `2026-08-01`; **review due `2026-08-10`**
  (`website/app/lib/legalHallucinationEvidence.ts`)
- Owner: Robert Crown Law Library

## What was verified, and how — read this first

**The exercise's legal content was verified without needing an external
source.** *Feist Publications, Inc. v. Rural Telephone Service Co.*, 499 U.S. 340
(1991), decided March 27, 1991, rejected the "sweat of the brow" doctrine and
held that originality, not labor or expense, is the constitutional requirement
for copyright in a factual compilation. The simulated proposition states the
opposite, which is exactly why it is the exercise. The answer key is sound as
written; the two source links (GovInfo, Cornell LII) still need to be opened once
before publication to confirm they resolve.

**The tracker count was checked, but not by opening the tracker.** The figure —
**1,822 cases identified**, source last updated **August 1, 2026** — was
confirmed through search results reporting the database's current state. The
authoring environment's network policy blocked the site itself, so the page was
never loaded directly. The growth trend across recent months (1,598 → 1,668 →
1,822) is consistent with a weekly-updated tracker, and the inclusion criteria
recorded in `scopeDescription` match the maintainer's stated approach.

> **Closed, 2026-09-02.** RCLL opened the tracker directly and read **2,008
> cases identified**. That is the confirmation this paragraph asked for, and it
> upgrades the provenance: the August figure was taken from search results
> reporting the database's state, this one from the database itself. The record
> now reads `count: 2008`, `verifiedOn: 2026-09-02`, `reviewBy: 2026-09-09`.
>
> The database publishes no last-updated date of its own, so `sourceLastUpdated`
> is now `null` and the page omits its "Source last updated" line entirely,
> showing only "Count checked". It is deliberately *not* set to the read date:
> the component labels that field as the source's own update date, so borrowing
> the read date would assert something the database does not say — on the one
> page whose subject is whether a claim is supported. Both the record's validator
> and `npm run lint` now refuse a `sourceLastUpdated` equal to `verifiedOn`.
>
> This corrects a defect older than this cycle. The August record's
> `sourceLastUpdated: 2026-08-01` came from a search result describing the
> database rather than from the page, so "Source last updated August 1, 2026"
> was already unsupported while it was displayed.
>
> Growth stays consistent with a weekly-updated tracker:
> 1,598 → 1,668 → 1,822 → 2,008.
>
> Open question 10 below is answered for this cycle. Question 9 — whether to
> display a number at all — is untouched and still open.

**RCLL must open <https://www.damiencharlotin.com/hallucinations/> and confirm
the count and its update date immediately before publication.** If the number has
moved, update `count`, `sourceLastUpdated`, `verifiedOn`, `reviewBy`, and
`countFingerprint` together — `npm run lint` warns if the count changes without
the dates, and the page withholds the number once `reviewBy` has passed.

Nothing on this page is fetched at build time or in the browser: not the tracker,
GovInfo, Cornell, a legal database, or any AI service.

## Awaiting RCLL confirmation

1. Whether **"Why did it invent a case?"** remains the preferred real-question
   title despite the body's non-anthropomorphic terminology.
2. Whether the body should introduce the NIST term **"confabulation"** or stay
   primarily with "fabricated citation" and "unsupported authority." It currently
   introduces the term once, in a restrained note, and explains it in a
   disclosure.
3. Whether the fictional party names — **Arcadia Directory Services, Inc.** and
   **Prairie Telephone Cooperative** — are acceptable and clearly fictional. They
   deliberately echo the real parties' industries without resembling their names.
4. Whether the **simulated Feist proposition** reverses the rule cleanly without
   introducing copyright nuance the exercise does not need.
5. Whether a **copyright or legal-research faculty member** should review the
   exercise and answer key.
6. Whether **GovInfo** is the preferred official source link.
7. Whether **Cornell LII** is the preferred accessible reading copy.
8. Whether SLS prefers **Westlaw, Lexis, Bloomberg Law, or all three** named in
   the exercise instructions. All three are currently listed, alongside GovInfo
   and "another reliable full-source environment."
9. Whether the site should display the **Charlotin numeric count** at all, or link
   to the database without a number. Removing the number is a one-line change:
   the count is read only through `displayableCount()`.
10. If displaying the count, whether **1,822**, the **August 1, 2026** source
    update, the **August 3, 2026** verification, and the **August 10, 2026**
    review deadline are still current immediately before publication.
11. Whether the **scope note** adequately reflects the database's inclusion
    criteria and its limited judgment-call exceptions.
12. Whether **"A citation is not authority until you have opened the authority"**
    is the preferred closing line.
13. Whether `library@law.stanford.edu` remains the preferred initial contact.
14. Whether the **internal-search and external-snippet protections** have been
    tested against the fictional citation to RCLL's satisfaction. What was tested
    is recorded below.
15. Whether the displayed **five-minute read time** is still accurate after the
    final responsive implementation.
16. Whether any **local SLS AI guidance** should be linked from the guide.

## Snippet and index protections — what was tested

- Internal search returns the guide for *AI invented a case*, *hallucinated
  case*, *fabricated citation*, *confabulation*, *fake legal citation*, and
  *source provenance*.
- Internal search returns **no result** for *Arcadia Directory Services* or
  *Prairie Telephone*. The build fails if either string ever reaches a guide's
  indexed text, including `searchTerms`.
- The rendered page contains the fictional caption only inside elements carrying
  `data-nosnippet` — the citation-anatomy list, the simulated-claim block, and
  the answer key.
- The fictional claim appears in no meta description, Open Graph field, canonical
  metadata, breadcrumb, or structured data. The site publishes no JSON-LD at all,
  so there is no `LearningResource` block to exclude it from.
- `npm run lint` fails if either party name appears as literal page source, so
  the claim can only be rendered through the component that prints the simulation
  label first.
- The page is **not** `noindex`. The guide itself should be findable; only the
  simulation is protected.

## What this page deliberately does not do

- No citation input, upload control, form, submission, scoring service, citation
  API call, AI call, or automated verifier. The guide adds no `<form>`, `<input>`,
  `<textarea>`, or `<select>`; the only ones on the page are the site header's
  search box.
- No confidence score, trust percentage, progress meter, or green "verified"
  badge. No control advances an evidence state.
- Never says that no lookup occurred, that the tool cannot search, that variation
  between runs proves fabrication, that agreement between runs verifies anything,
  or that search makes fabricated citations impossible. The lint script fails the
  build on each of those phrasings.
- Never presents the simulation as a product transcript.
- Never states the count as "over N" or as "verified" cases.

## Update process

The source-mode notes, evidence states, citation anatomy, and the simulated
exercise live in `app/lib/citationProvenance.ts`; the tracker figure lives alone
in `app/lib/legalHallucinationEvidence.ts`. Both validate at import, so
`npm run build` fails on a broken cross-reference, a fifth evidence state, an
"Identity confirmed" state described as establishing support, a "Support checked"
state described as establishing currentness, a generic "Verified" label, an answer
key that endorses the simulated claim, an expected source that is not Feist, or a
fictional string reaching the search index.

Staleness is treated differently from breakage. A missed weekly review makes the
page withhold the number and show "Count due for review" with the live link
intact; `npm run lint` warns. `SLS_STRICT_EVIDENCE=1 npm run lint` fails instead,
for a CI job that should refuse to ship a stale public figure.

All time-sensitive changes require human review and a repository commit.

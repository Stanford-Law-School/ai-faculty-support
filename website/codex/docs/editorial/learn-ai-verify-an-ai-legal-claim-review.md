# Staff review — "How do I verify an AI-generated legal claim?"

Internal editorial record for `/learn-ai/verify-an-ai-legal-claim/`. **Not
rendered anywhere on the website.** Open local questions stay questions here
instead of becoming public claims.

- Guide reviewed through: `2026-08-03` (`website/app/lib/guides.ts`)
- Exercise case status checked `2026-08-03`, re-check due `2026-09-03`
  (`website/app/lib/legalClaimAudit.ts`)
- Citator interface descriptions checked `2026-08-03`, due `2026-11-03`
  (`website/app/lib/legalVerificationTools.ts`)
- Owner: Robert Crown Law Library

## What was verified, and how — read this first

`Lnu v. Blanche`, No. 24-4790 (9th Cir. June 3, 2026) **was confirmed to exist**
before the exercise was written. Confirmed from multiple independent public
sources: the Metropolitan News-Enterprise report, Volokh/Reason, Bloomberg Law
news, Law360's case page, and the court's own opinions datastore URL.

Confirmed: real case, docket 24-4790, Ninth Circuit, filed June 3, 2026, marked
for publication / precedential; an attorney-discipline order concerning attorneys
Sethi and Rounds; briefs citing two nonexistent cases (*Eduardo v. Garland*, *Lay
v. Holder*), quotations misattributed to real opinions, and misrepresentations of
real cases; repeated denials that generative AI was involved; sanctions of $2,500
each, six-month suspension from Ninth Circuit practice, and a two-year
AI-disclosure requirement on the firm.

**Not confirmed by reading the opinion.** The authoring environment's network
policy blocked the PDF (403 on the court's own copy, on Justia, and on mirrors),
so the opinion text was never opened. The answer key's central sentence — that
the court's sanctions concerned the *signing and filing* of inaccurate briefs and
later candor, rather than AI use as such — rests on consistent secondary
reporting plus the internal logic of the remedy: a court that ordered *disclosure*
of future AI use did not prohibit it.

**RCLL must open the order and confirm that characterization against the text
before publication.** It is the one claim on the page that was not verified at
first hand, and the page teaches readers not to accept exactly that.

## Awaiting RCLL confirmation

1. **Current status of the order**, including any rehearing, amendment,
   superseding order, or later material development affecting the exercise.
2. **Exact final citation** and any slip-opinion pinpoints used in internal notes.
3. **Preferred reading link.** The page now leads with the court's own copy
   (`cdn.ca9.uscourts.gov/datastore/opinions/2026/06/03/24-4790.pdf`) and keeps
   the Justia PDF as an alternate. Confirm this is the preferred routing, or
   substitute a PACER or other stable source.
4. **The answer-key characterization** above — the signing-and-filing distinction.
5. **Rule 11, candor, filing, and correction language** — should legal-research or
   professional-responsibility faculty review it?
6. **Westlaw product name** and whether KeyCite is available under the academic
   account.
7. **Shepard's** availability and visible naming under the current Lexis+ with
   Protégé academic account.
8. **BCITE** availability and visible naming in the current Bloomberg Law academic
   account.
9. **Stable direct URLs** for *Citation Analysis Tools* and *Source Pulling and
   Cite Checking for Journal Members*. Both are recorded as `url: null` and
   **render nowhere**; the page links the general Legal Research Guides directory
   instead. Supplying URLs enables a "Continue with an RCLL guide" subsection.
10. **Local SLS guidance** governing AI-assisted filings, scholarship, citation
    verification, or faculty research workflows.
11. Whether a **specific faculty research-support or source-pulling service**
    should be named beyond the general Law Library address.
12. Whether `library@law.stanford.edu` remains the preferred initial contact.
13. Whether **"Verified for this proposition"** is the preferred local outcome
    label, or whether RCLL uses another established cite-checking vocabulary.
14. Whether the **Lnu example should stay**. If it is replaced, the answer key must
    be rebuilt and re-reviewed — do not swap the case and keep the key.
15. Whether the displayed **six-minute read time** is still accurate.

## Local RCLL guides — placeholder, not rendered

```
localVerificationGuides:
  status: staff-review-required
  records:
    - title: Citation Analysis Tools
      url: null
      owner: Robert Crown Law Library
    - title: Source Pulling and Cite Checking for Journal Members
      url: null
      owner: Robert Crown Law Library
```

No link with a null URL is published. Titles are preserved exactly as supplied.

## What this page deliberately does not do

- No claim-submission form, upload field, AI verifier, citation-checking API
  call, chatbot, confidence score, or personalized legal conclusion. The page has
  no `<form>`, `<input>`, `<textarea>`, or `<select>` at all.
- No progress bar, score, percentage, or "verified by AI" badge.
- Never declares an authority binding or controlling — that depends on the
  reader's jurisdiction and question.
- Never says the Ninth Circuit banned AI use, that a citator verifies a
  quotation, that "good law" means the source supports the proposition, or that
  every court requires AI disclosure. The lint script fails the build on each.
- No universal filing or correction procedure, and no professional-responsibility
  determination for any particular matter.

## Update process

The audit steps, failure modes, outcomes, source-type checks, and the exercise
live in `app/lib/legalClaimAudit.ts`; citator relationships in
`app/lib/legalVerificationTools.ts`, which reads all product facts from the
canonical registry through `toolRegistryId`. The build fails on a broken
cross-reference, a missing simulation label, an answer key that endorses the
flawed claim, or a fifth core audit step. `npm run lint` warns once the exercise
case status or a citator record is overdue, and the page shows a visible
maintenance notice while the case status is overdue.

Nothing is fetched at build time — no court site, citator, PACER, or vendor
service.

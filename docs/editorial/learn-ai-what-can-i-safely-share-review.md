# Staff review — "What can I safely share with an AI tool?"

Internal editorial record for `/learn-ai/what-can-i-safely-share/`. **This file is
not rendered anywhere on the website.** It exists so open local questions stay
open questions instead of becoming public factual claims.

- Guide reviewed through: `2026-08-03` (`app/lib/guides.ts`)
- Service snapshot verified: `2026-08-03`, review by `2026-09-03`
  (`website/app/lib/stanfordAiServices.ts`)
- Owner: Robert Crown Law Library

## Awaiting RCLL confirmation before publication

1. **Local SLS guidance.** Does SLS have local AI or data-use guidance that
   *narrows* the university-wide service classifications? If so, the snapshot
   needs a local-narrowing note, because a university-level "Approved" would
   otherwise read as permission at the school level.

2. **Student-record wording.** Should the student-records entry also be reviewed
   by the Registrar or the University Privacy Office? The page currently states
   only what Stanford's published classification examples say (Moderate Risk) and
   routes uncertainty onward; it makes no FERPA determination about any
   particular record.

3. **Clinic and client paragraph.** Should clinical faculty leadership review it?
   The page declines to give an answer for clinic material and defers to
   clinic-specific direction. It makes no statement about privilege or waiver.

4. **Legal AI services.** Does RCLL want to publish service-specific approval
   guidance for Harvey, Legora, LexText, or CICERO? Until it does, those records
   stay `status: "draft"` and render nowhere. The validator fails the build if one
   is marked published without a source URL and a named approval owner.

5. **Routing address.** Is `library@law.stanford.edu` the preferred *initial*
   routing address for these questions? Both new pages currently use it.

6. **Clinic escalation.** Should a shorter or more specific clinic escalation
   route appear instead of the general Law Library address?

## What the page deliberately does not do

- No classifier, no "Tell us what your document contains" form, no free-text
  input, and no "Safe to upload" verdict.
- The preflight checklist is static markup. Nothing is submitted, stored,
  persisted, or logged, and no analytics event carries checklist content.
- No approval level is inferred for any Law Library-licensed legal AI service.
- No legal conclusion about privilege, waiver, FERPA applicability to a specific
  record, or professional responsibility.

## Update process for the service snapshot

See the header comment in `website/app/lib/stanfordAiServices.ts`. In short: read
the official Stanford pages, confirm the service *variant* and all four risk
columns, update `verifiedOn` and `reviewBy`, run `npm run lint` and
`npm run build`, and commit. The build fails on a malformed published row; lint
warns once `reviewBy` has passed. Nothing is scraped at build time.

Changing one service row must **not** move a guide's `reviewedThrough`: the
snapshot and the durable guidance are reviewed on separate schedules.

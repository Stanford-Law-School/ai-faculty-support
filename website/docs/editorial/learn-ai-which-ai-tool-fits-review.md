# Staff review — "Which AI tool fits this task?"

Internal editorial record for `/learn-ai/which-ai-tool-fits/` and the canonical
tool registry. **Not rendered anywhere on the website.** It exists so unresolved
local questions stay questions instead of becoming public factual claims.

- Guide reviewed through: `2026-08-03` (`website/app/lib/guides.ts`)
- Tool registry reviewed: `2026-08-03`; Stanford services due `2026-09-03`,
  licensed platforms due `2026-11-03` (`website/app/lib/aiTools.ts`)
- Mode taxonomy: durable, review annually (`website/app/lib/aiToolModes.ts`)
- Owner: Robert Crown Law Library

## Awaiting RCLL confirmation

1. **Westlaw display name and entitlement.** Vendor pages now foreground
   *Westlaw Advantage* and *Westlaw Edge with AI-Assisted Research*, while the
   SLS site says *Westlaw Precision*. The record keeps **Westlaw Precision** and
   carries a note; it must not be renamed until RCLL confirms the current
   academic product name and feature entitlement.
2. **Lexis+ with Protégé.** Which Protégé features are enabled for SLS academic
   accounts?
3. **Bloomberg Law.** Which AI features are available to SLS users?
4. **Access route and prerequisites** for Harvey, Legora, LexText, and CICERO.
   The registry currently points all four at the existing request form.
5. **Additional modes.** Should Harvey, Legora, or LexText appear in more than
   one tool mode, based on the features actually enabled for SLS? All three are
   currently in `legal-practice-workflow` only.
6. **Local narrowing.** Does any SLS guidance narrow use of Gemini Enterprise,
   Microsoft 365 Copilot, or other connected-workspace services?
7. **Gemini Notebook naming transition.** Stanford's service page uses *Gemini
   Notebook* while the AI Services Matrix may still say *Google NotebookLM*. The
   public card shows "Formerly Google NotebookLM"; confirm whether that alias
   line should stay for the whole transition.
8. **Directory scope.** Should AI Resources list all nine Stanford services or a
   curated faculty subset? All nine currently appear.
9. **Routing address.** Is `library@law.stanford.edu` still the preferred first
   contact for workflow-selection questions?
10. **CICERO description.** Should it name specific exercises — oral argument,
    client counseling, deposition, cross-examination — based on the modules
    currently licensed? The visible description is deliberately generic, because
    the previous copy named exercises that may not all be licensed.

## What this work deliberately does not do

- No ranking, scoring, star rating, winner badge, or model leaderboard.
- No claim that products share underlying models or are interchangeable.
- No quiz or engine that selects a product for the reader.
- No Stanford risk classification asserted for Harvey, Legora, LexText, or
  CICERO. Those records are `verify-locally` with visible guidance, and the build
  fails if one is given a `dataClassificationRef`.
- No worksheet data collected: the page has no form, input, textarea, or select.
- Gemini Chat / Gemini Enterprise, Gemini Notebook / NotebookLM Enterprise, and
  Copilot Chat / Microsoft 365 Copilot are separate records, enforced by both the
  build and `npm run lint`.

## Update process

Registry: read the official Stanford service page and the vendor page, confirm
the exact public name and locally enabled features, update the record plus
`reviewedOn` and `reviewBy` — never the `id`, which other records reference —
then run `npm run lint` and `npm run build` and commit.

Nothing is fetched at build time, so a name or feature can change only after a
person reads the source.

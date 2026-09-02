# SLS AI Judgment Series Final Audit

Collection tagline: **Problem first. Tool second. Evidence always.**

This document records the final consistency, packaging, website, and regression
audit of the completed nine-Skill SLS AI Judgment Series. It reflects the state
of the `claude/final-judgment-series-audit` branch.

## Collection inventory

| Order | Skill | Slug | Directory | Manifest | Website | Evaluation | Download state |
|---|---|---|---|---|---|---|---|
| Front door | Where to Start with AI | `where-to-start-with-ai` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |
| 1 | How AI Systems Work | `how-ai-systems-work` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |
| 2 | Understand an AI Tool | `understand-an-ai-tool` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |
| 3 | Check an AI Claim | `check-an-ai-claim` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |
| 4 | Problem-Based Approach to AI | `problem-based-approach-to-ai` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |
| 5 | Test What AI Can Do | `test-what-ai-can-do` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |
| 6 | Plan an AI Pilot | `plan-an-ai-pilot` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |
| 7 | Test AI Governance | `test-ai-governance` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |
| 8 | Bring AI Into Your Teaching | `bring-ai-into-teaching` | ✅ | ✅ 1× | ✅ detail + catalog | ✅ | `/downloads/…` (downloadable) |

Judgment Series count: **9** (Where to Start with AI + 8 destinations). Total repository Skills
in the manifest: **16** (the 9 Judgment Series Skills plus 7 Teaching & Course
Design Skills).

## Validation summary

All nine directory validations and ZIP validations passed. Each archive contains
exactly one top-level directory matching its slug, is self-contained (no
reference escapes the Skill directory; no dependency on `shared/`, sibling
Skills, `evaluations/`, `website/`, `releases/`, `dist/`, or `codex/`), and
contains no macOS/Git/cache metadata.

| Skill | Dir validate | ZIP validate | Files | ZIP bytes | One top-level dir | Self-contained | macOS metadata |
|---|---|---|---|---:|---|---|---|
| where-to-start-with-ai | pass | pass | 29 | 33,098 | ✅ | ✅ | none |
| how-ai-systems-work | pass | pass | 19 | 16,164 | ✅ | ✅ | none |
| understand-an-ai-tool | pass | pass | 22 | 17,142 | ✅ | ✅ | none |
| check-an-ai-claim | pass | pass | 25 | 28,581 | ✅ | ✅ | none |
| problem-based-approach-to-ai | pass | pass | 25 | 28,978 | ✅ | ✅ | none |
| test-what-ai-can-do | pass | pass | 29 | 36,278 | ✅ | ✅ | none |
| plan-an-ai-pilot | pass | pass | 34 | 38,196 | ✅ | ✅ | none |
| test-ai-governance | pass | pass | 32 | 37,179 | ✅ | ✅ | none |
| bring-ai-into-teaching | pass | pass | 35 | 36,584 | ✅ | ✅ | none |

Every other repository Skill (the 7 Teaching & Course Design Skills) also
validates. All 26 Python tests pass (12 packaging tests + 14 new collection
regression tests).

## Website summary

- **All-nine catalog:** ✅ The Judgment Series catalog lists all nine slugs
  (Where to Start with AI as front door, eight destinations). Nothing is hidden by truncation,
  `slice()`, featured-only logic, or download-only filtering.
- **Detail pages:** ✅ All nine detail routes exist and export to static HTML.
- **Front-door routing:** ✅ Catalog `judgmentMeta` marks all nine `available: true`;
  this guide detail page no longer describes destinations as "planned / not yet
  downloadable."
- **Status language:** ✅ No implemented destination is labeled "planned."
  Development status, download availability, and implementation are kept
  distinct. Four implemented destinations are Development with downloads coming
  soon.
- **Counts:** ✅ Homepage shows "16 skills · 2 collections," derived from the
  manifest and collections data rather than hard-coded; the Judgment Series count
  is nine. (The `/skills` page is now a collections hub with per-collection pages
  at `/skills/judgment-series` and `/skills/teaching`.)
- **Install guides:** ✅ The `/install` hub links both the ChatGPT and Claude
  guides; both are reachable from navigation and footer.
- **Download buttons:** ✅ Downloadable Skills link to `/downloads/<slug>.zip`;
  `#coming-soon` Skills render a non-interactive "Coming soon" control (the
  sentinel is never treated as a URL).
- **Responsive:** ✅ Lint and production build pass; layout uses the existing
  glass-morphism system with no second visual system introduced.

## Documentation summary

- **README:** presents the complete nine-Skill sequence and distinguishes the
  four evaluation-adjacent destinations; no Judgment Series Skill is described as
  planned.
- **Evaluations index:** lists the Judgment Series evaluation areas.
- **Collection documentation:** the distinctions among Problem-Based Approach to
  AI, Test What AI Can Do, Plan an AI Pilot, Test AI Governance, and Bring AI Into
  Your Teaching are stated.
- **Stale partial-build language:** corrected across `how-ai-systems-work`,
  `understand-an-ai-tool`, `check-an-ai-claim`,
  `test-what-ai-can-do`, `plan-an-ai-pilot`, and
  `test-ai-governance`, which previously described
  now-implemented destinations as "planned." Legitimate references to the
  genuinely future **Research and Scholarship** collection were preserved.
- **Historical Codex material:** files under `codex/` and `docs/codex-prompts/`
  were retained for design history and labeled with an archival banner noting
  the Skills they describe are implemented and that they are not active tasks or
  current-state sources. No active documentation or website navigation links to
  them.

## Release-status distinctions

These are deliberately separate concepts and must not be collapsed:

- **Implemented** — the deployable Skill directory exists, validates, and
  packages. All nine are implemented.
- **Development** — the Skill's maturity status in the manifest. All nine are
  Development.
- **Downloadable** — the manifest `downloadUrl` is a `/downloads/<slug>.zip`
  path and the site generates the package. As of the website-collections update,
  all nine Judgment Series Skills (and all sixteen repository Skills) are
  downloadable; the `#coming-soon` state remains available in the manifest for
  any future Skill that should be listed before release.
- **Download coming soon** — implemented and listed, but not yet released for
  public download. This is not the same as "planned."
- **Institutionally reviewed or authorized** — none of these Skills is
  institutionally approved, certified, or authorized; implementation and
  Development status carry no institutional endorsement.

## Remaining review

The following remain outside the scope of this audit and require appropriate
human or institutional processes:

- Faculty and pedagogical review of Skill guidance.
- Legal review (including any statements touching current law).
- Privacy and information-security review.
- Accessibility review and any formal compliance determination.
- Procurement and vendor review.
- Governance review and institutional authorization.
- The release decision to move any `#coming-soon` Skill to a public download.

No claim of institutional approval, production authorization, or certification
is made or implied by this audit.

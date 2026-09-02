> **Archived / completed.** This is historical build-task material retained for design history only.
> The Skill it describes is implemented at `skills/where-to-start-with-ai/` and is part of the completed nine-Skill
> SLS AI Judgment Series. Do not treat this file as an active task, a pending prerequisite, or the
> source of truth for current repository state; the deployable Skill, `releases/skills.json`, and the
> website are canonical.

# Codex Build Specification: Where to Start with AI

Canonical implementation: `skills/where-to-start-with-ai/`

This is the ninth and final Skill in the Stanford Law School Faculty AI Lab **SLS AI Judgment Series**. The full build specification was provided in the Codex task prompt. Key identity:

- **Directory:** `where-to-start-with-ai`
- **Display name:** Where to Start with AI
- **Tagline:** Start where you are. Find the questions that matter.
- **Collection tagline:** Problem first. Tool second. Evidence always.

## Mission summary

Conversational front door that orients faculty, diagnoses through realistic decisions (not trivia), recommends the smallest useful destination among eight Judgment Series Skills, produces Faculty AI Learning Maps and Field Notebook entries, and supports return-and-resume—without scoring, ranking, or certifying faculty.

## Structure

See `skills/where-to-start-with-ai/SKILL.md` and `skills/where-to-start-with-ai/references/` for the complete self-contained runtime content.

## Prerequisites

Four destination Skills remain planned on `main`: Problem-Based Approach to AI, Plan an AI Pilot, Test AI Governance, Bring AI Into Your Teaching. This guide routes to them by name using copied boundaries in `references/judgment-series-routing.md`.

## Verification

```bash
python3 scripts/validate_skill_package.py skills/where-to-start-with-ai
python3 scripts/package_skill.py skills/where-to-start-with-ai --output dist/where-to-start-with-ai/skill.zip
python3 scripts/validate_skill_package.py dist/where-to-start-with-ai/skill.zip --zip
```

Evaluations: `evaluations/where-to-start-with-ai/`

> **Archived / completed.** This is historical build-task material retained for design history only.
> The Skill it describes is implemented at `skills/test-ai-governance/` and is part of the completed nine-Skill
> SLS AI Judgment Series. Do not treat this file as an active task, a pending prerequisite, or the
> source of truth for current repository state; the deployable Skill, `releases/skills.json`, and the
> website are canonical.

# Codex task: SLS Test AI Governance

Work in `whuggins-RCLL/sls-faculty-ai-skills`.

## Prerequisite note

Branch from `main` only when all six prior Judgment Series Skills and collection
foundation are available:

- `how-ai-systems-work`
- `understand-an-ai-tool`
- `check-an-ai-claim`
- `problem-based-approach-to-ai`
- `test-what-ai-can-do`
- `plan-an-ai-pilot`

Otherwise use the newest branch containing all six prior Skills and the current
collection foundation. Stop and identify missing prerequisites rather than
recreating a parallel collection foundation.

## Read first

- `AGENTS.md`
- `docs/codex-prompts/test-ai-governance.md`
- `scripts/validate_skill_package.py`
- `scripts/package_skill.py`
- `releases/skills.json`

## Implement

Build `skills/test-ai-governance/` per the full
specification in `docs/codex-prompts/test-ai-governance.md`.

## Verify

```bash
python3 scripts/validate_skill_package.py skills/test-ai-governance
python3 scripts/package_skill.py skills/test-ai-governance --output dist/test-ai-governance/skill.zip
python3 scripts/validate_skill_package.py dist/test-ai-governance/skill.zip --zip
```

Validate all existing Skills, run repository tests, validate manifest, lint and
build website.

Do not alter existing Skill behavior or download URLs.

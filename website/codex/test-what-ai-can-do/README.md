> **Archived / completed.** This is historical build-task material retained for design history only.
> The Skill it describes is implemented at `skills/test-what-ai-can-do/` and is part of the completed nine-Skill
> SLS AI Judgment Series. Do not treat this file as an active task, a pending prerequisite, or the
> source of truth for current repository state; the deployable Skill, `releases/skills.json`, and the
> website are canonical.

# Codex task: SLS Test What AI Can Do

Work in `whuggins-RCLL/sls-faculty-ai-skills`.

## Prerequisite note

Branch from `main` when all four prior Judgment Series Skills and collection foundation are available. As of implementation, `problem-based-approach-to-ai` (Skill #4) remains planned—not yet merged. Skills 1–3 and collection foundation are on `main`.

## Read first

- `AGENTS.md`
- `scripts/validate_skill_package.py`
- `scripts/package_skill.py`
- `releases/skills.json`
- Existing Judgment Series Skills for pattern reference

## Implement

Build `skills/test-what-ai-can-do/` per the full specification in the user task prompt.

## Verify

```bash
python3 scripts/validate_skill_package.py skills/test-what-ai-can-do
python3 scripts/package_skill.py skills/test-what-ai-can-do --output dist/test-what-ai-can-do/skill.zip
python3 scripts/validate_skill_package.py dist/test-what-ai-can-do/skill.zip --zip
```

Validate all existing Skills, run repository tests, validate manifest, lint and build website.

Do not alter existing Skill behavior or download URLs.

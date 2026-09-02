> **Archived / completed.** This is historical build-task material retained for design history only.
> The Skill it describes is implemented at `skills/where-to-start-with-ai/` and is part of the completed nine-Skill
> SLS AI Judgment Series. Do not treat this file as an active task, a pending prerequisite, or the
> source of truth for current repository state; the deployable Skill, `releases/skills.json`, and the
> website are canonical.

# Codex task: SLS Where to Start with AI

Work in `whuggins-RCLL/sls-faculty-ai-skills`.

## Prerequisite note

Four Judgment Series destination Skills remain planned and are not yet merged on `main`:

- `problem-based-approach-to-ai`
- `plan-an-ai-pilot`
- `test-ai-governance`
- `bring-ai-into-teaching`

Four destination Skills are available: How AI Systems Work, Understand an AI Tool, Check an AI Claim, and Test What AI Can Do. Where to Start with AI routes to all eight destinations by name using self-contained reference material; it does not read sibling Skill files at runtime.

## Read first

- `AGENTS.md`
- `docs/codex-prompts/where-to-start-with-ai.md` (full specification)
- `scripts/validate_skill_package.py`
- `scripts/package_skill.py`
- `releases/skills.json`

## Implement

Build `skills/where-to-start-with-ai/` per the full specification.

## Verify

```bash
python3 scripts/validate_skill_package.py skills/where-to-start-with-ai
python3 scripts/package_skill.py skills/where-to-start-with-ai --output dist/where-to-start-with-ai/skill.zip
python3 scripts/validate_skill_package.py dist/where-to-start-with-ai/skill.zip --zip
```

Validate all existing Skills, run repository tests, validate manifest, lint and build website.

Do not alter existing Skill behavior or download URLs.

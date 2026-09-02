# Repository Agent Instructions

- Every ChatGPT Skill must be self-contained.
- Deployable skills must never reference `../../shared` or files outside their own directory.
- Shared repository material is design-source material only; required runtime material must be copied into the individual skill.
- Never use Finder compression as the official packaging method.
- Always run the validator and packager before saying a skill is complete.
- Always inspect the resulting ZIP listing.
- A skill is not complete unless `dist/skill.zip` passes archive validation.
- Do not commit macOS metadata.
- Do not manually fabricate validation success.
- Report exact tests and commands run.

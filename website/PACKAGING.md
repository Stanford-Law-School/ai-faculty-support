# Skill Packaging

Use the repository scripts rather than manual ZIP creation. Package each Skill by name so release archives do not overwrite one another.

```bash
python3 scripts/validate_skill_package.py skills/course-and-syllabus-designer
python3 scripts/package_skill.py skills/course-and-syllabus-designer --output dist/course-and-syllabus-designer/skill.zip
python3 scripts/validate_skill_package.py skills/class-session-planner
python3 skills/class-session-planner/scripts/validate_session_plan.py --self-test
python3 scripts/package_skill.py skills/class-session-planner --output dist/class-session-planner/skill.zip
python3 -m pytest
```

The packager prints the archive listing, reopens the ZIP, and validates that it contains exactly one top-level skill directory with no escaping paths or forbidden metadata. Do not use Finder compression. Do not commit generated ZIP files unless release policy explicitly changes.

## Website downloads (automatic)

The public website builds and hosts each downloadable Skill ZIP itself, straight from the `skills/` folders — there is no manual "zip it and upload to a file host" step. On every website build (`npm run build`, and every Vercel deploy), `scripts/build_site_packages.mjs` runs first and writes `website/public/downloads/<slug>.zip` for each Skill whose `downloadUrl` in `releases/skills.json` is set to `"/downloads/<slug>.zip"`. Skills left as `"#coming-soon"` are skipped and stay listed but not downloadable.

To publish or refresh a website download, edit the Markdown in `skills/<slug>/`, ensure the Skill's `downloadUrl` is `"/downloads/<slug>.zip"`, then commit and push. The site rebuilds and serves the new ZIP; no external link needs to be pasted. These website ZIPs are deterministic, git-ignored build artifacts and use the same layout the validator enforces.

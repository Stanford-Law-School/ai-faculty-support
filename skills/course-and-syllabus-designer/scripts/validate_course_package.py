#!/usr/bin/env python3
"""Validate the course-and-syllabus-designer skill package scaffold."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "SKILL.md",
    "agents/openai.yaml",
    "references/intake-and-routing.md",
    "references/ai-course-decision-tree.md",
    "references/course-design-framework.md",
    "references/course-type-patterns.md",
    "references/learning-objectives.md",
    "references/assessment-alignment.md",
    "references/research-and-materials.md",
    "references/fictional-materials.md",
    "references/syllabus-template.md",
    "references/reading-list-template.md",
    "references/ai-policy-patterns.md",
    "references/accessibility-review.md",
    "references/output-contract.md",
    "references/evaluation-rubric.md",
    "assets/syllabus-template.md",
    "assets/reading-list-template.md",
]
TERMS = [
    "faculty", "AI", "Google Drive", "fictional", "verified", "placeholder"
]

def main() -> int:
    missing = [p for p in REQUIRED if not (ROOT / p).exists()]
    empty = [p for p in REQUIRED if (ROOT / p).exists() and (ROOT / p).stat().st_size == 0]
    skill = (ROOT / "SKILL.md").read_text(encoding="utf-8")
    missing_terms = [term for term in TERMS if term not in skill]
    if missing or empty or missing_terms:
        if missing:
            print("Missing files:", *missing, sep="\n- ")
        if empty:
            print("Empty files:", *empty, sep="\n- ")
        if missing_terms:
            print("SKILL.md missing terms:", *missing_terms, sep="\n- ")
        return 1
    print(f"Validated {len(REQUIRED)} required files for {ROOT.name}.")
    return 0

if __name__ == "__main__":
    sys.exit(main())

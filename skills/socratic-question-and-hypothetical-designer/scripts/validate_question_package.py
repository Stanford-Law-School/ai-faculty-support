#!/usr/bin/env python3
"""Validate Socratic question and hypothetical design packages."""
from __future__ import annotations
import argparse, re, sys
from pathlib import Path

FICTION_LABEL = "FICTIONAL INSTRUCTIONAL HYPOTHETICAL — not a real case or authority"
PURPOSES = ["Orientation","Fact selection","Rule identification","Reasoning","Application","Counterargument","Comparison","Policy","Professional judgment","Reflection"]
SENSITIVE = ["violence","sexual assault","discrimination","immigration","trauma","disability","race","gender identity","religion","poverty","mental health","family conflict","criminal victimization"]

SAMPLE = f"""
# Sample full question sequence
Objective: Students distinguish rule application from policy critique.
Opening question [Orientation] [Level 1]: Who sued whom?
Core question [Rule identification] [Level 2]: What rule did the court state?
Branching prompts: Mistaken answer -> diagnostic question -> correction -> transition.
Synthesis question [Reflection] [Level 6]: What narrow rule carries forward?

{FICTION_LABEL}
## Student-facing facts
A buyer promises to pay for a modification.
## Faculty-only teaching notes
Sensitive-topic review: not applicable.
Timing: 10 minutes of 20 available.
"""

def validate_text(text: str) -> list[str]:
    errors=[]
    lower=text.lower()
    is_sequence="question sequence" in lower or "opening question" in lower or "core question" in lower
    if is_sequence:
        if "objective" not in lower:
            errors.append("Full question sequence is missing an objective.")
        if not any(p.lower() in lower for p in PURPOSES):
            errors.append("Questions are missing purpose categories.")
        if "opening" not in lower:
            errors.append("Full sequence is missing opening questions.")
        if "synthesis" not in lower and "closing" not in lower:
            errors.append("Full sequence is missing synthesis or closing questions.")
    if "branch" in lower and not any(w in lower for w in ["transition", "correction", "synthesize", "synthesis"]):
        errors.append("Branching pathway lacks transition, correction, or synthesis.")
    if "fictional" in lower and FICTION_LABEL.lower() not in lower:
        errors.append("Fictional material lacks the required label.")
    if FICTION_LABEL.lower() in lower and re.search(r"\b\d+\s+(u\.s\.|f\. ?\d|f\. ?supp|s\.ct\.|cal\.|n\.y\.)\b", lower):
        errors.append("Fictional material appears to include a real-looking reporter citation.")
    if "student-facing facts" in lower and "faculty-only" not in lower:
        errors.append("Hypothetical facts and faculty notes are not separated.")
    if any(term in lower for term in SENSITIVE) and "sensitive-topic review" not in lower:
        errors.append("Sensitive-topic review is missing.")
    m=re.search(r"timing:\s*(\d+)\s*minutes?\s*of\s*(\d+)\s*available", lower)
    if m and int(m.group(1)) > int(m.group(2)):
        errors.append("Timing total exceeds available discussion time.")
    return errors

def main(argv=None):
    ap=argparse.ArgumentParser()
    ap.add_argument("path", nargs="?", help="Markdown/text package to validate")
    ap.add_argument("--self-test", action="store_true")
    ns=ap.parse_args(argv)
    if ns.self_test:
        errs=validate_text(SAMPLE)
        if errs:
            print("Self-test failed:", *errs, sep="\n- ", file=sys.stderr); return 1
        print("Self-test passed."); return 0
    if not ns.path:
        ap.error("path is required unless --self-test is used")
    text=Path(ns.path).read_text(encoding="utf-8")
    errs=validate_text(text)
    if errs:
        print("Validation failed:", *errs, sep="\n- ", file=sys.stderr); return 1
    print("Validation passed."); return 0
if __name__ == "__main__":
    raise SystemExit(main())

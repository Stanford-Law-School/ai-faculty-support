#!/usr/bin/env python3
"""Deterministic checks for assessment package markdown drafts."""
from __future__ import annotations
import argparse, re, sys
from pathlib import Path

REQUIRED_HEADINGS = [
    "Assessment Design Brief", "Assessment Blueprint", "Student-Facing Assignment",
    "Rubric", "AI-Use Rules", "Unresolved Faculty Decisions"
]

def nums(text, label):
    m=re.search(label + r"\s*:\s*([0-9]+(?:\.[0-9]+)?)", text, re.I)
    return float(m.group(1)) if m else None

def validate_text(text: str) -> list[str]:
    errors=[]
    for h in REQUIRED_HEADINGS:
        if not re.search(r"^#+\s+"+re.escape(h)+r"\b", text, re.M): errors.append(f"missing heading: {h}")
    if "Faculty-Only" in text and "Student-Facing Assignment" in text:
        if text.find("Faculty-Only") < text.find("Student-Facing Assignment"):
            errors.append("faculty-only material appears before student-facing section")
    total=nums(text,"Stated total points")
    pts=[float(x) for x in re.findall(r"\|\s*([0-9]+(?:\.[0-9]+)?)\s*\|", text)]
    if total is not None and pts and abs(sum(pts)-total)>0.01: errors.append(f"point total mismatch: stated {total:g}, table sums {sum(pts):g}")
    weights=[float(x) for x in re.findall(r"\|\s*([0-9]+(?:\.[0-9]+)?)%\s*\|", text)]
    if weights and abs(sum(weights)-100)>0.01: errors.append(f"rubric weights sum to {sum(weights):g}%, not 100%")
    if re.search(r"\bAI\b|artificial intelligence|generative", text, re.I) and not re.search(r"^#+\s+AI-Use Rules\b", text, re.M): errors.append("AI is discussed but AI-Use Rules heading is missing")
    if "[INSERT CURRENT APPROVED STANFORD LANGUAGE]" in text and re.search(r"final institutional policy", text, re.I): errors.append("placeholder is presented as final institutional policy")
    return errors

def self_test():
    sample='''# Assessment Design Brief\nAI posture: limited\nStated total points: 100\n# Assessment Blueprint\n| Learning objective | Evidence sought | Task or question | Points | Difficulty | Rubric criterion |\n|---|---|---|---:|---|---|\n| Apply doctrine | Analysis | Q1 | 60 | Medium | Application |\n| Evaluate policy | Judgment | Q2 | 40 | Hard | Judgment |\n# Student-Facing Assignment\n# AI-Use Rules\n# Rubric\n| Criterion | Weight |\n|---|---:|\n| Application | 60% |\n| Judgment | 40% |\n# Unresolved Faculty Decisions\n# Faculty-Only Notes\n'''
    errors=validate_text(sample)
    if errors: raise AssertionError(errors)

def main(argv=None):
    ap=argparse.ArgumentParser(); ap.add_argument('file', nargs='?'); ap.add_argument('--self-test', action='store_true')
    ns=ap.parse_args(argv)
    if ns.self_test:
        self_test(); print('Assessment package self-test passed'); return 0
    if not ns.file: ap.error('file required unless --self-test is used')
    errors=validate_text(Path(ns.file).read_text(encoding='utf-8'))
    if errors:
        print('Assessment package validation failed:', file=sys.stderr)
        for e in errors: print('ERROR:', e, file=sys.stderr)
        return 1
    print(f'Assessment package validation passed: {ns.file}')
    return 0
if __name__=='__main__': raise SystemExit(main())

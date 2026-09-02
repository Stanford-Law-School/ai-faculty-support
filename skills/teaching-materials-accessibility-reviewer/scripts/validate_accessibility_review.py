#!/usr/bin/env python3
"""Deterministic checks for Teaching Materials Accessibility Reviewer outputs."""
from __future__ import annotations
import argparse, re, sys
from pathlib import Path

REQUIRED_PATTERNS = {
    "scope limitations": re.compile(r"scope limitations?|not a formal compliance certification", re.I),
    "priority labels": re.compile(r"\b(Critical|High|Moderate|Enhancement)\b"),
    "locations": re.compile(r"\b(Location|Page|Slide|Section|Table|Image|Paragraph)\b", re.I),
    "faculty verification": re.compile(r"faculty verification|faculty review", re.I),
    "human review distinction": re.compile(r"human review|specialist|institutional review|automated check", re.I),
}
FORBIDDEN_PATTERNS = {
    "formal certification claim": re.compile(r"\b(certif(?:y|ies|ied)|guarantee[sd]?)\b.*\b(ADA|Section 504|WCAG|Stanford|compliance|compliant)\b", re.I),
    "accessibility overlay recommendation": re.compile(r"accessibility overlay", re.I),
    "unverified caption accuracy": re.compile(r"captions? (?:are|is) accurate", re.I),
    "unverified PDF remediation": re.compile(r"PDF (?:is|has been) (?:fully )?(?:tagged|accessible|remediated)", re.I),
}

def check_text(text: str) -> list[str]:
    errors=[]
    for name, pat in REQUIRED_PATTERNS.items():
        if not pat.search(text): errors.append(f"Missing required element: {name}")
    for name, pat in FORBIDDEN_PATTERNS.items():
        if pat.search(text): errors.append(f"Forbidden assertion: {name}")
    return errors

def self_test() -> int:
    good = """This review identifies likely accessibility and usability concerns. It is not a formal compliance certification.\nScope limitations: text-only review.\n| Location | Issue | Priority | Why it matters | Recommended fix |\n| Page 2 | Missing alt text | High | Blocks image meaning | Add alt text and faculty verification |\nSpecialist human review may be needed."""
    bad = "This certifies ADA compliance. The PDF is fully remediated."
    if check_text(good):
        print("Self-test failed: good sample did not pass", file=sys.stderr); return 1
    if not check_text(bad):
        print("Self-test failed: bad sample was not flagged", file=sys.stderr); return 1
    print("Accessibility review validator self-test passed")
    return 0

def main(argv=None):
    ap=argparse.ArgumentParser()
    ap.add_argument("path", nargs="?", help="Optional text/Markdown output to validate")
    ap.add_argument("--self-test", action="store_true")
    ns=ap.parse_args(argv)
    if ns.self_test: return self_test()
    if not ns.path:
        ap.error("provide a path or --self-test")
    text=Path(ns.path).read_text(encoding="utf-8")
    errors=check_text(text)
    if errors:
        print("Accessibility review validation failed:", file=sys.stderr)
        for e in errors: print(f"ERROR: {e}", file=sys.stderr)
        return 1
    print(f"Accessibility review validation passed: {ns.path}")
    return 0
if __name__ == "__main__": raise SystemExit(main())

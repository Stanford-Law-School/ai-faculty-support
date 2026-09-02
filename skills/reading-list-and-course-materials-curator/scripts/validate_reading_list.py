#!/usr/bin/env python3
"""Deterministic checks for Reading List and Course Materials Curator outputs."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

URL_RE = re.compile(r"https?://[^\s)>]+")
TIER_RE = re.compile(r"\b(required|recommended|optional|reference only|essential)\b", re.I)
VERIFIED_RE = re.compile(r"\bverified\b", re.I)
DATE_RE = re.compile(r"\b\d{4}-\d{2}-\d{2}\b|\b(?:Jan\.?|Feb\.?|Mar\.?|Apr\.?|May|Jun\.?|Jul\.?|Aug\.?|Sep\.?|Sept\.?|Oct\.?|Nov\.?|Dec\.?)\s+\d{1,2},\s+\d{4}\b", re.I)

REQUIRED_PHRASES = [
    "instructional purpose",
    "source type",
    "verification status",
    "access",
]


def validate_text(text: str) -> list[str]:
    errors: list[str] = []
    lower = text.lower()
    for phrase in REQUIRED_PHRASES:
        if phrase not in lower:
            errors.append(f"missing required field language: {phrase}")
    if not TIER_RE.search(text):
        errors.append("required/recommended/optional tiers are not distinguishable")
    for url in URL_RE.findall(text):
        if " " in url or "." not in url.split("://", 1)[1]:
            errors.append(f"invalid URL structure: {url}")
    for line in text.splitlines():
        if VERIFIED_RE.search(line) and not DATE_RE.search(line) and "verification status" not in line.lower():
            errors.append("line labels an item verified without a verification date: " + line[:120])
    if "faculty-only" in lower and "student" in lower:
        if lower.find("faculty-only") < lower.find("student") and "separate" not in lower:
            errors.append("faculty-only notes appear before student-facing material without separation language")
    return errors


def self_test() -> int:
    sample = """
# Reading list
| Tier | Source type | Title | Instructional purpose | Access | Verification status |
| Required | Primary legal authority | Example Case | Teach rule | Public access | Verified 2026-07-21 |
Faculty-only notes are separate from student-facing content.
"""
    errors = validate_text(sample)
    if errors:
        print("Self-test failed:", file=sys.stderr)
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print("Reading-list output validation self-test passed")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("path", nargs="?", help="Markdown or text reading-list output to validate")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)
    if args.self_test:
        return self_test()
    if not args.path:
        parser.error("path is required unless --self-test is used")
    text = Path(args.path).read_text(encoding="utf-8")
    errors = validate_text(text)
    if errors:
        print("Reading-list output validation failed:", file=sys.stderr)
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"Reading-list output validation passed: {args.path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

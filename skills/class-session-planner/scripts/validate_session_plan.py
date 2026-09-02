#!/usr/bin/env python3
"""Lightweight deterministic checks for Markdown class-session plans.

The checker is intentionally conservative. It validates common headings and a
simple run-of-show table with minute values such as `10`, `10 min`, or `5-8`.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

REQUIRED_FULL_HEADINGS = [
    "Session Design Brief",
    "Detailed Run of Show",
    "Closing",
]
TIME_RE = re.compile(r"^\s*\|\s*([^|]+?)\s*\|")
NUM_RE = re.compile(r"-?\d+")
OBJECTIVE_RE = re.compile(r"^\s*(?:[-*]|\d+[.)])\s+(?:Identify|Distinguish|Apply|Analyze|Compare|Evaluate|Argue|Draft|Negotiate|Critique|Reflect)\b", re.I | re.M)
FICTIONAL_TERMS = ("hypothetical", "fictional", "mock client", "role card", "simulation facts", "draft contract")
FICTIONAL_LABEL = "FICTIONAL INSTRUCTIONAL MATERIAL — NOT LEGAL AUTHORITY"


def minutes(cell: str) -> int | None:
    nums = [int(n) for n in NUM_RE.findall(cell)]
    if not nums:
        return None
    if any(n < 0 for n in nums):
        raise ValueError(f"negative time value: {cell.strip()}")
    return max(nums) if len(nums) > 1 else nums[0]


def validate_text(text: str, expected_duration: int | None = None, full: bool = False) -> list[str]:
    errors: list[str] = []
    if full:
        for heading in REQUIRED_FULL_HEADINGS:
            if re.search(rf"^#+\s+{re.escape(heading)}\s*$", text, re.M) is None:
                errors.append(f"missing required heading: {heading}")
    objectives = OBJECTIVE_RE.findall(text)
    if len(objectives) > 5:
        errors.append(f"too many observable objectives for one session: {len(objectives)}")
    total = 0
    saw_time = False
    for line in text.splitlines():
        if not line.lstrip().startswith("|") or re.match(r"^\s*\|\s*-+\s*\|", line):
            continue
        first = TIME_RE.match(line)
        if not first:
            continue
        cell = first.group(1).strip()
        if cell.lower() in {"time", "timing"}:
            saw_time = True
            continue
        try:
            val = minutes(cell)
        except ValueError as exc:
            errors.append(str(exc)); continue
        if val is not None:
            total += val
    if full and not saw_time:
        errors.append("missing run-of-show time column")
    if expected_duration is not None and total > expected_duration:
        errors.append(f"planned segments total {total} minutes, exceeding expected duration {expected_duration}")
    lower = text.lower()
    if any(term in lower for term in FICTIONAL_TERMS) and FICTIONAL_LABEL not in text:
        errors.append("fictional instructional material appears without required label")
    return errors


def self_test() -> int:
    good = """# Plan\n\n## Session Design Brief\n- Identify personal jurisdiction concepts\n\n## Detailed Run of Show\n| Time | Segment | Faculty action | Student action | Purpose | Materials |\n|---|---|---|---|---|---|\n| 10 | Opening | Frame | Write | Surface baseline | Poll |\n| 70 | Application | Facilitate | Analyze | Practice | Problem |\n| 5 | Closing | Synthesize | Reflect | Consolidate | None |\n\n## Closing\nReturn to the central question.\n"""
    bad = """# Plan\n| Time | Segment | Faculty action | Student action | Purpose | Materials |\n|---|---|---|---|---|---|\n| 60 | A | A | A | A | A |\n| -5 | B | B | B | B | B |\nThis hypothetical involves a client.\n"""
    if validate_text(good, 90, full=True):
        print("self-test good fixture failed"); return 1
    errs = validate_text(bad, 50, full=True)
    needed = ["missing required heading", "negative time value", "fictional instructional material"]
    if not all(any(n in e for e in errs) for n in needed):
        print("self-test bad fixture failed", errs); return 1
    print("validate_session_plan.py self-test passed")
    return 0


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("path", nargs="?", help="Markdown plan to validate")
    ap.add_argument("--duration", type=int)
    ap.add_argument("--full", action="store_true")
    ap.add_argument("--self-test", action="store_true")
    ns = ap.parse_args(argv)
    if ns.self_test:
        return self_test()
    if not ns.path:
        ap.error("path is required unless --self-test is used")
    errors = validate_text(Path(ns.path).read_text(encoding="utf-8"), ns.duration, ns.full)
    if errors:
        print("Session plan validation failed:", file=sys.stderr)
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"Session plan validation passed: {ns.path}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())

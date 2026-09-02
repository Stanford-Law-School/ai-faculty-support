#!/usr/bin/env python3
"""Deterministic content checks for the Faculty AI Policy Builder skill."""
from __future__ import annotations
import argparse, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_REFS = [
    'intake-and-routing.md','policy-posture-decision-tree.md','activity-permission-framework.md',
    'course-policy-design.md','assignment-level-policies.md','ai-infused-course-guidance.md',
    'disclosure-patterns.md','verification-and-citations.md','data-and-confidentiality.md',
    'access-and-equity.md','professional-responsibility.md','student-facing-language.md',
    'faculty-implementation-guide.md','policy-audit-framework.md','templates.md','output-contract.md',
    'evaluation-rubric.md'
]
REQUIRED_SKILL_PHRASES = [
    'What is the course or assignment intended to teach and measure?',
    '[INSERT CURRENT APPROVED STANFORD LANGUAGE]',
    'Do not decide whether a student committed misconduct',
    'Do not recommend uploading client information',
]

def collect_text() -> str:
    return '\n'.join(p.read_text(encoding='utf-8') for p in [ROOT/'SKILL.md', *[(ROOT/'references'/r) for r in REQUIRED_REFS]])

def validate() -> list[str]:
    errors=[]
    if not (ROOT/'SKILL.md').is_file(): errors.append('missing SKILL.md')
    for r in REQUIRED_REFS:
        if not (ROOT/'references'/r).is_file(): errors.append(f'missing reference {r}')
    if errors: return errors
    text=collect_text()
    for phrase in REQUIRED_SKILL_PHRASES:
        if phrase not in text: errors.append(f'missing required phrase: {phrase}')
    for model in ['AI-restricted','AI-limited','AI-flexible','AI-infused']:
        if model not in text: errors.append(f'missing policy model {model}')
    for term in ['confidentiality','Verification','Disclosure','access','assignment-specific']:
        if term.lower() not in text.lower(): errors.append(f'missing coverage for {term}')
    for asset in ['ai-policy-template.md','ai-disclosure-form.md','permitted-use-matrix.md']:
        if not (ROOT/'assets'/asset).is_file(): errors.append(f'missing asset {asset}')
    return errors

def self_test() -> list[str]:
    errors=validate()
    text=collect_text().lower()
    scenarios=['vague seminar','strict doctrinal','mixed-use','ai-infused','confidential simulation','misconduct judgment','no-ai']
    for s in scenarios:
        if s not in text: errors.append(f'missing evaluation scenario: {s}')
    return errors

def main(argv=None):
    ap=argparse.ArgumentParser(); ap.add_argument('--self-test', action='store_true')
    ns=ap.parse_args(argv)
    errors=self_test() if ns.self_test else validate()
    if errors:
        print('AI policy package validation failed:', file=sys.stderr)
        for e in errors: print(f'ERROR: {e}', file=sys.stderr)
        return 1
    print('AI policy package validation passed')
    return 0
if __name__ == '__main__': raise SystemExit(main())

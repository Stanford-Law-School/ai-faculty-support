#!/usr/bin/env python3
"""Deterministically package a validated ChatGPT Skill."""
from __future__ import annotations
import argparse, subprocess, sys, tempfile, zipfile
from pathlib import Path

EXCLUDE_NAMES={'.DS_Store'}
EXCLUDE_SUFFIXES=('.tmp','.bak','.swp','.swo','~','.pyc')

def excluded(p: Path):
    parts=set(p.parts)
    return ('__MACOSX' in parts or '__pycache__' in parts or p.name in EXCLUDE_NAMES or p.name.startswith('._') or p.name.startswith('.git') or p.name.endswith(EXCLUDE_SUFFIXES))

def main(argv=None):
    ap=argparse.ArgumentParser(); ap.add_argument('skill_dir'); ap.add_argument('--output', default='dist/skill.zip')
    ns=ap.parse_args(argv)
    root=Path.cwd(); skill=Path(ns.skill_dir).resolve(); out=(root/ns.output).resolve()
    validator=root/'scripts/validate_skill_package.py'
    subprocess.run([sys.executable, str(validator), str(skill)], check=True)
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=out.parent, suffix='.zip', delete=False) as tmp: tmp_path=Path(tmp.name)
    top=skill.name
    files=sorted([p for p in skill.rglob('*') if p.is_file() and not excluded(p)], key=lambda p: p.relative_to(skill).as_posix())
    with zipfile.ZipFile(tmp_path, 'w', compression=zipfile.ZIP_DEFLATED) as z:
        for p in files:
            arc=f"{top}/{p.relative_to(skill).as_posix()}"
            info=zipfile.ZipInfo(arc, date_time=(1980,1,1,0,0,0)); info.compress_type=zipfile.ZIP_DEFLATED; info.external_attr=0o644 << 16
            z.writestr(info, p.read_bytes())
    subprocess.run([sys.executable, str(validator), str(tmp_path), '--zip'], check=True)
    tmp_path.replace(out)
    print(f"Created {out}")
    print('Archive listing:')
    with zipfile.ZipFile(out) as z:
        for n in z.namelist(): print(n)
    return 0
if __name__ == '__main__': raise SystemExit(main())

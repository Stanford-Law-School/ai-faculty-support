#!/usr/bin/env python3
"""Validate a self-contained ChatGPT Skill directory or packaged ZIP."""
from __future__ import annotations

import argparse, os, re, sys, tempfile, zipfile
from pathlib import Path, PurePosixPath
try:
    import yaml
except ImportError:  # pragma: no cover
    yaml = None

def load_yaml(text: str):
    if yaml is not None:
        return yaml.safe_load(text)
    root = {}
    stack = [(0, root)]
    for i, line in enumerate(text.splitlines(), 1):
        if not line.strip():
            continue
        indent = len(line) - len(line.lstrip(' '))
        stripped = line.strip()
        if ':' not in stripped:
            raise ValueError(f'unsupported YAML syntax on line {i}')
        key, val = stripped.split(':', 1)
        key, val = key.strip(), val.strip()
        while stack and indent < stack[-1][0]:
            stack.pop()
        parent = stack[-1][1]
        if val == '':
            node = {}
            parent[key] = node
            stack.append((indent + 2, node))
        else:
            if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                val = val[1:-1]
            parent[key] = val
    return root

MAX_PACKAGE_BYTES = 25 * 1024 * 1024
ALLOWED_FM = {"name", "description"}
FORBIDDEN_NAMES = {".DS_Store"}
TEMP_SUFFIXES = (".tmp", ".bak", ".swp", ".swo", "~", ".pyc")
# Detect leaked absolute local filesystem paths (e.g. /Users/alex/..., /home/alex/...,
# C:\Users\...). The leading negative lookbehind prevents false positives on URL path
# segments such as https://oxcon.ouplaw.com/home/MPECCOL, where "/home/" is preceded by a
# hostname character; a genuine local path begins at a boundary (start, whitespace, quote,
# backtick, parenthesis, etc.), not immediately after a letter, digit, or dot.
ABS_LOCAL_RE = re.compile(r"(?<![\w.])(?:(?:/Users|/home|/workspace|/tmp|/var/folders)/|[A-Za-z]:\\\\)")
MD_LINK_RE = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
INLINE_PATH_RE = re.compile(r"`([^`]+)`")

class Validator:
    def __init__(self, skill_dir: Path):
        self.skill_dir = skill_dir.resolve()
        self.errors: list[str] = []

    def err(self, msg: str): self.errors.append(msg)

    def rel(self, p: Path) -> str:
        try: return p.resolve().relative_to(self.skill_dir).as_posix()
        except Exception: return str(p)

    def inside(self, p: Path) -> bool:
        try: p.resolve().relative_to(self.skill_dir); return True
        except ValueError: return False

    def files(self):
        return [p for p in self.skill_dir.rglob("*") if p.is_file() or p.is_symlink()]

    def validate(self) -> bool:
        if not self.skill_dir.is_dir():
            self.err(f"Skill directory does not exist: {self.skill_dir}"); return False
        skill_files = [p for p in self.skill_dir.rglob("SKILL.md") if p.is_file()]
        if len(skill_files) != 1:
            self.err(f"Expected exactly one SKILL.md entrypoint, found {len(skill_files)}.")
        skill_md = self.skill_dir / "SKILL.md"
        if not skill_md.is_file(): self.err("SKILL.md is missing at skill root.")
        else: self.validate_skill_md(skill_md)
        self.validate_agent()
        self.validate_tree()
        return not self.errors

    def validate_skill_md(self, path: Path):
        data = path.read_bytes()
        try: text = data.decode("utf-8")
        except UnicodeDecodeError:
            self.err("SKILL.md is not valid UTF-8 plain text."); return
        if not text.startswith("---\n"):
            self.err("SKILL.md must begin immediately with YAML frontmatter opening '---'."); return
        parts = text.split("---\n", 2)
        if len(parts) < 3:
            self.err("SKILL.md frontmatter is missing closing '---'."); return
        try: meta = load_yaml(parts[1])
        except Exception as e:
            self.err(f"SKILL.md frontmatter is invalid YAML: {e}"); return
        if not isinstance(meta, dict):
            self.err("SKILL.md frontmatter must be a YAML mapping."); return
        extra = set(meta) - ALLOWED_FM
        missing = ALLOWED_FM - set(meta)
        if extra: self.err(f"SKILL.md frontmatter has unsupported field(s): {', '.join(sorted(extra))}.")
        if missing: self.err(f"SKILL.md frontmatter missing field(s): {', '.join(sorted(missing))}.")
        expected = self.skill_dir.name
        if meta.get("name") != expected: self.err(f"Skill name '{meta.get('name')}' must match directory '{expected}'.")
        desc = meta.get("description")
        if not isinstance(desc, str) or len(desc.strip()) < 40:
            self.err("SKILL.md description must clearly explain what the skill does and when it activates.")
        if len(text.splitlines()) > 500: self.err("SKILL.md exceeds 500 lines; move detail into references.")

    def validate_agent(self):
        p = self.skill_dir / "agents" / "openai.yaml"
        if not p.is_file(): self.err("agents/openai.yaml is missing."); return
        try: text = p.read_text(encoding="utf-8")
        except UnicodeDecodeError: self.err("agents/openai.yaml is not valid UTF-8."); return
        try: obj = load_yaml(text)
        except Exception as e: self.err(f"agents/openai.yaml is invalid YAML: {e}"); return
        interface = obj.get("interface") if isinstance(obj, dict) else None
        if not isinstance(interface, dict): self.err("agents/openai.yaml must contain an interface mapping."); return
        if not str(interface.get("display_name", "")).strip(): self.err("agents/openai.yaml needs a human-readable display_name.")
        if not str(interface.get("short_description", "")).strip(): self.err("agents/openai.yaml needs a concise short_description.")
        for k, v in interface.items():
            if isinstance(v, str) and re.search(r"TODO|TBD|PLACEHOLDER|example\.com", v, re.I):
                self.err(f"agents/openai.yaml contains unsupported placeholder value in {k}.")
            if "icon" in k and v:
                target = (p.parent / str(v)).resolve()
                if not self.inside(target) or not target.is_file(): self.err(f"agents/openai.yaml references missing/outside asset: {v}")

    def validate_tree(self):
        total = 0
        for p in self.files():
            rel = self.rel(p); total += p.lstat().st_size
            name = p.name
            if any(part == "__MACOSX" for part in p.parts) or name in FORBIDDEN_NAMES or name.startswith("._") or name == ".gitkeep" or name.startswith(".git") or name.endswith(TEMP_SUFFIXES) or "__pycache__" in p.parts:
                self.err(f"Forbidden macOS, git, cache, or temporary file present: {rel}")
            if p.is_symlink():
                target = p.resolve()
                if not self.inside(target): self.err(f"Symlink escapes skill directory: {rel} -> {target}")
                continue
            try: text = p.read_text(encoding="utf-8")
            except UnicodeDecodeError: continue
            if ABS_LOCAL_RE.search(text): self.err(f"Absolute local filesystem path found in {rel}.")
            if "../../shared" in text or "../shared" in text: self.err(f"Outside shared reference found in {rel}.")
            if p.suffix.lower() in {".md", ".yaml", ".yml"} or p.name == "SKILL.md": self.validate_refs(p, text)
        if total > MAX_PACKAGE_BYTES: self.err(f"Package size {total} bytes exceeds limit {MAX_PACKAGE_BYTES} bytes.")
        # empty optional dirs
        for d in [x for x in self.skill_dir.rglob("*") if x.is_dir()]:
            if not any(d.iterdir()): self.err(f"Empty optional directory present: {self.rel(d)}")

    def check_ref(self, src: Path, raw: str):
        ref = raw.strip().split('#',1)[0]
        if not ref or re.match(r"^[a-z][a-z0-9+.-]*:", ref, re.I) or ref.startswith("#") or ref.startswith("mailto:"): return
        if ref.startswith("/"):
            self.err(f"Reference escapes or is absolute in {self.rel(src)}: {raw}"); return
        target = (src.parent / ref).resolve()
        if not self.inside(target): self.err(f"Reference escapes skill directory in {self.rel(src)}: {raw}")
        elif not target.exists(): self.err(f"Broken reference in {self.rel(src)}: {raw}")

    def validate_refs(self, p: Path, text: str):
        for m in MD_LINK_RE.finditer(text): self.check_ref(p, m.group(1))
        for m in INLINE_PATH_RE.finditer(text):
            s=m.group(1)
            if ("/" in s or s.endswith(('.md','.yaml','.yml','.py','.txt'))) and not s.startswith(('python','pip','http')):
                self.check_ref(p, s.split()[0])

def validate_zip(path: Path) -> list[str]:
    errors=[]
    with zipfile.ZipFile(path) as z:
        names=z.namelist()
        tops={PurePosixPath(n).parts[0] for n in names if n and not n.endswith('/')}
        if len(tops)!=1: errors.append(f"ZIP must contain exactly one top-level skill directory, found: {sorted(tops)}")
        for n in names:
            pp=PurePosixPath(n)
            if n.startswith('/') or '..' in pp.parts: errors.append(f"ZIP entry escapes archive root: {n}")
    if errors: return errors
    with tempfile.TemporaryDirectory() as td:
        with zipfile.ZipFile(path) as z: z.extractall(td)
        top=next(Path(td).iterdir())
        v=Validator(top); v.validate(); return v.errors

def main(argv=None):
    ap=argparse.ArgumentParser()
    ap.add_argument('skill_dir')
    ap.add_argument('--zip', action='store_true', help='validate a generated ZIP archive')
    ns=ap.parse_args(argv)
    errors = validate_zip(Path(ns.skill_dir)) if ns.zip else (lambda v: (v.validate(), v.errors)[1])(Validator(Path(ns.skill_dir)))
    if errors:
        print('Skill package validation failed:', file=sys.stderr)
        for e in errors: print(f'ERROR: {e}', file=sys.stderr)
        return 1
    print(f"Skill package validation passed: {ns.skill_dir}")
    return 0
if __name__ == '__main__': raise SystemExit(main())

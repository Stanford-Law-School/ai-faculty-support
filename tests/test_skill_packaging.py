from __future__ import annotations
import shutil, subprocess, sys, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / 'scripts' / 'validate_skill_package.py'
PACKAGER = ROOT / 'scripts' / 'package_skill.py'
SOURCE = ROOT / 'skills' / 'course-and-syllabus-designer'

def copy_skill(tmp_path: Path) -> Path:
    dst = tmp_path / 'course-and-syllabus-designer'
    shutil.copytree(SOURCE, dst, ignore=shutil.ignore_patterns('__pycache__'))
    return dst

def run_validator(skill: Path):
    return subprocess.run([sys.executable, str(VALIDATOR), str(skill)], text=True, capture_output=True)

def test_valid_skill_passes(tmp_path):
    assert run_validator(copy_skill(tmp_path)).returncode == 0

def test_missing_skill_md_fails(tmp_path):
    s=copy_skill(tmp_path); (s/'SKILL.md').unlink()
    assert run_validator(s).returncode != 0

def test_invalid_frontmatter_fails(tmp_path):
    s=copy_skill(tmp_path); (s/'SKILL.md').write_text('not yaml\n---\n')
    assert run_validator(s).returncode != 0

def test_extra_frontmatter_field_fails(tmp_path):
    s=copy_skill(tmp_path); p=s/'SKILL.md'; txt=p.read_text(); p.write_text(txt.replace('description:', 'version: 1\ndescription:', 1))
    assert run_validator(s).returncode != 0

def test_broken_reference_fails(tmp_path):
    s=copy_skill(tmp_path); (s/'SKILL.md').write_text((s/'SKILL.md').read_text()+'\nSee `references/missing.md`.\n')
    assert run_validator(s).returncode != 0

def test_path_escaping_fails(tmp_path):
    s=copy_skill(tmp_path); (s/'SKILL.md').write_text((s/'SKILL.md').read_text()+'\nSee `../../shared/faculty-control.md`.\n')
    assert run_validator(s).returncode != 0

def test_missing_agent_fails(tmp_path):
    s=copy_skill(tmp_path); (s/'agents'/'openai.yaml').unlink()
    assert run_validator(s).returncode != 0

def test_macosx_fails(tmp_path):
    s=copy_skill(tmp_path); d=s/'__MACOSX'; d.mkdir(); (d/'junk').write_text('x')
    assert run_validator(s).returncode != 0

def test_ds_store_fails(tmp_path):
    s=copy_skill(tmp_path); (s/'.DS_Store').write_text('x')
    assert run_validator(s).returncode != 0

def test_double_nested_skill_folder_fails(tmp_path):
    s=copy_skill(tmp_path); nested=s/s.name; nested.mkdir(); (nested/'SKILL.md').write_text((s/'SKILL.md').read_text())
    assert run_validator(s).returncode != 0

def test_multiple_skill_md_files_fail(tmp_path):
    s=copy_skill(tmp_path); extra=s/'references'/'SKILL.md'; extra.write_text((s/'SKILL.md').read_text())
    assert run_validator(s).returncode != 0

def test_correct_archive_structure_passes(tmp_path):
    s=copy_skill(tmp_path); out=tmp_path/'skill.zip'
    res=subprocess.run([sys.executable, str(PACKAGER), str(s), '--output', str(out)], cwd=ROOT, text=True, capture_output=True)
    assert res.returncode == 0, res.stderr + res.stdout
    with zipfile.ZipFile(out) as z:
        names=z.namelist()
    assert names
    assert {Path(n).parts[0] for n in names} == {'course-and-syllabus-designer'}
    assert all(not n.startswith('/') and '..' not in Path(n).parts for n in names)

"""Regression protection for the SLS Legal Skills collection.

Mirrors the Research and Judgment Series guards: verifies the twelve legal
helpers keep their skill directories, manifest entries, website detail routes,
and canonical collection data, and that the collection stays "available" (not
mislabeled as an upcoming/coming-soon set) once published.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "releases" / "skills.json"
COLLECTIONS = ROOT / "website" / "app" / "lib" / "collections.ts"
LEGAL_PAGE = ROOT / "website" / "app" / "skills" / "legal" / "page.tsx"

FRONT_DOOR = "legal-skills-guide"
HELPERS = [
    "legal-question-framer",
    "case-law-analyzer",
    "doctrine-mapper",
    "statute-regulation-interpreter",
    "legislative-administrative-history-navigator",
    "comparative-law-research-planner",
    "litigation-record-analyzer",
    "transaction-structure-analyzer",
    "professional-responsibility-analyzer",
    "legal-argument-stress-tester",
    "legal-authority-verifier",
]
LEGAL_COLLECTION = [FRONT_DOOR] + HELPERS


def _manifest():
    return json.loads(MANIFEST.read_text(encoding="utf-8"))


def test_twelve_skill_directories_exist():
    assert len(LEGAL_COLLECTION) == 12
    for slug in LEGAL_COLLECTION:
        assert (ROOT / "skills" / slug).is_dir(), f"missing skill directory: {slug}"


def test_each_skill_has_skill_md():
    for slug in LEGAL_COLLECTION:
        assert (ROOT / "skills" / slug / "SKILL.md").is_file(), f"{slug} missing SKILL.md"


def test_each_skill_has_agent_metadata():
    for slug in LEGAL_COLLECTION:
        assert (ROOT / "skills" / slug / "agents" / "openai.yaml").is_file(), f"{slug} missing agents/openai.yaml"


def test_each_skill_has_reference_content():
    for slug in LEGAL_COLLECTION:
        refs = ROOT / "skills" / slug / "references"
        assert refs.is_dir() and any(refs.glob("*")), f"{slug} has no reference content"


def test_no_committed_skill_zip_files():
    for slug in LEGAL_COLLECTION:
        assert not (ROOT / "skills" / slug / "skill.zip").exists(), f"{slug} still has a committed skill.zip"


def test_each_slug_appears_exactly_once_in_manifest():
    slugs = [s["slug"] for s in _manifest()]
    for slug in LEGAL_COLLECTION:
        assert slugs.count(slug) == 1, f"{slug} should appear exactly once in manifest"


def test_manifest_download_paths_are_valid():
    entries = {s["slug"]: s for s in _manifest()}
    for slug in LEGAL_COLLECTION:
        url = entries[slug]["downloadUrl"]
        assert url == f"/downloads/{slug}.zip", f"bad download path for {slug}: {url}"


def test_every_skill_has_a_website_detail_route():
    for slug in LEGAL_COLLECTION:
        assert (ROOT / "website" / "app" / "skills" / slug / "page.tsx").is_file(), f"{slug} missing website detail page"


def test_collections_data_lists_all_twelve_legal_slugs():
    text = COLLECTIONS.read_text(encoding="utf-8")
    for slug in LEGAL_COLLECTION:
        assert f'"{slug}"' in text, f"{slug} missing from website collections data"


def test_legal_collection_is_available_not_planned():
    text = COLLECTIONS.read_text(encoding="utf-8")
    assert 'id: "legal"' in text, "legal collection missing from collections data"
    upcoming = re.search(r"upcomingCollections[^\[]*\[(.*?)\]", text, re.S)
    if upcoming:
        for slug in LEGAL_COLLECTION:
            assert slug not in upcoming.group(1), f"{slug} wrongly listed as an upcoming collection"
        assert "SLS Legal Skills" not in upcoming.group(1), (
            "SLS Legal Skills is published; it must not remain in upcomingCollections"
        )


def test_collection_page_exists():
    assert LEGAL_PAGE.is_file(), "legal collection page missing"

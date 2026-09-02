"""Regression protection for the completed nine-Skill SLS AI Judgment Series.

These tests guard against the collection silently losing a Skill, a duplicated or
missing manifest entry, a missing website detail route, or an implemented
destination being mislabeled as "planned" in canonical website data. They read
canonical data structures (skill directories, releases/skills.json, and the
website catalog data) rather than brittle prose snapshots.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "releases" / "skills.json"
# Canonical collection data lives in the website collections library; the hub and
# per-collection pages render from it.
COLLECTIONS = ROOT / "website" / "app" / "lib" / "collections.ts"
JUDGMENT_PAGE = ROOT / "website" / "app" / "skills" / "judgment-series" / "page.tsx"

# Canonical collection: front door + eight destinations, in intended order.
COMPASS = "where-to-start-with-ai"
DESTINATIONS = [
    "how-ai-systems-work",
    "understand-an-ai-tool",
    "check-an-ai-claim",
    "problem-based-approach-to-ai",
    "test-what-ai-can-do",
    "plan-an-ai-pilot",
    "test-ai-governance",
    "bring-ai-into-teaching",
]
JUDGMENT_SERIES = [COMPASS] + DESTINATIONS


def _manifest():
    return json.loads(MANIFEST.read_text(encoding="utf-8"))


def test_nine_skill_directories_exist():
    assert len(JUDGMENT_SERIES) == 9
    for slug in JUDGMENT_SERIES:
        assert (ROOT / "skills" / slug).is_dir(), f"missing skill directory: {slug}"


def test_each_skill_has_skill_md():
    for slug in JUDGMENT_SERIES:
        assert (ROOT / "skills" / slug / "SKILL.md").is_file(), f"{slug} missing SKILL.md"


def test_each_skill_has_agent_metadata():
    for slug in JUDGMENT_SERIES:
        assert (ROOT / "skills" / slug / "agents" / "openai.yaml").is_file(), f"{slug} missing agents/openai.yaml"


def test_each_skill_has_reference_content():
    for slug in JUDGMENT_SERIES:
        refs = ROOT / "skills" / slug / "references"
        assert refs.is_dir() and any(refs.glob("*.md")), f"{slug} has no reference content"


def test_each_slug_appears_exactly_once_in_manifest():
    slugs = [s["slug"] for s in _manifest()]
    for slug in JUDGMENT_SERIES:
        assert slugs.count(slug) == 1, f"{slug} should appear exactly once in manifest"


def test_no_duplicate_manifest_slugs():
    slugs = [s["slug"] for s in _manifest()]
    assert len(slugs) == len(set(slugs)), "duplicate slug in releases/skills.json"


def test_manifest_slugs_map_to_real_directories():
    for entry in _manifest():
        assert (ROOT / "skills" / entry["slug"]).is_dir(), f"manifest slug without directory: {entry['slug']}"


def test_judgment_series_count_is_nine():
    slugs = {s["slug"] for s in _manifest()}
    present = [s for s in JUDGMENT_SERIES if s in slugs]
    assert len(present) == 9, f"expected 9 Judgment Series manifest entries, found {len(present)}"


def test_downloadable_entries_use_valid_paths():
    for entry in _manifest():
        url = entry["downloadUrl"]
        if url.startswith("/downloads/"):
            assert url == f"/downloads/{entry['slug']}.zip", f"bad download path for {entry['slug']}: {url}"


def test_coming_soon_is_not_treated_as_downloadable():
    for entry in _manifest():
        url = entry["downloadUrl"]
        # A coming-soon entry must be exactly the sentinel, never a path.
        if url == "#coming-soon":
            assert not url.startswith("/downloads/")
        else:
            assert url.startswith("/downloads/"), f"unexpected downloadUrl for {entry['slug']}: {url}"


def test_every_skill_has_a_website_detail_route():
    for slug in JUDGMENT_SERIES:
        assert (ROOT / "website" / "app" / "skills" / slug / "page.tsx").is_file(), f"{slug} missing website detail page"


def test_collections_data_lists_all_nine_judgment_slugs():
    text = COLLECTIONS.read_text(encoding="utf-8")
    for slug in JUDGMENT_SERIES:
        assert f'"{slug}"' in text, f"{slug} missing from website collections data"


def test_judgment_collection_is_available_not_planned():
    text = COLLECTIONS.read_text(encoding="utf-8")
    # The Judgment Series collection must be present and marked available (not
    # planned/coming-soon), so all nine implemented Skills are surfaced.
    assert 'id: "judgment-series"' in text, "judgment-series collection missing from collections data"
    assert 'id: "teaching"' in text, "teaching collection missing from collections data"
    assert 'status: "available"' in text, "no available collection found"
    # Regression guard: a real Skill slug must never appear in the upcoming/
    # coming-soon collections list (which announces future, unbuilt sets).
    upcoming = re.search(r"upcomingCollections[^\[]*\[(.*?)\]", text, re.S)
    if upcoming:
        for slug in JUDGMENT_SERIES + DESTINATIONS:
            assert slug not in upcoming.group(1), f"{slug} wrongly listed as an upcoming collection"


def test_collections_route_to_all_eight_destinations():
    text = COLLECTIONS.read_text(encoding="utf-8")
    for slug in DESTINATIONS:
        assert f'"{slug}"' in text, f"destination {slug} missing from collections routing data"


def test_collection_pages_exist():
    assert JUDGMENT_PAGE.is_file(), "judgment-series collection page missing"
    assert (ROOT / "website" / "app" / "skills" / "teaching" / "page.tsx").is_file(), "teaching collection page missing"

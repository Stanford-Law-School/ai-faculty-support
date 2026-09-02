# SLS Legal Skills

**Authority first. Context always. Judgment remains human.**

An independently designed collection for Stanford Law School faculty research and teaching. It does not borrow from or reproduce another vendor's legal-skill collection.

## Scope

These Skills support scholarship, teaching preparation, doctrinal analysis, research-assistant supervision, comparative and historical research, transactional teaching, and professional-responsibility instruction. They exclude client and clinic matters, active litigation or deal advice, privileged materials, filings, live negotiations, and individual legal advice.

## Skills

1. **Legal Question Framer** — Clarify the question before collecting answers.
2. **Case Law Analyzer** — Read the opinion as a legal act, not just a story.
3. **Doctrine Mapper** — See the doctrine as a structured field of authority.
4. **Statute and Regulation Interpreter** — Read the text in its full legal setting.
5. **Legislative and Administrative History Navigator** — Trace the record without overstating what it proves.
6. **Comparative Law Research Planner** — Compare legal systems without flattening their differences.
7. **Litigation Record Analyzer** — Separate what was filed, argued, found, and decided.
8. **Transaction Structure Analyzer** — See how the document makes the transaction work.
9. **Professional Responsibility Analyzer** — Identify the duty, authority, facts, and uncertainty.
10. **Legal Argument Stress Tester** — Make the argument survive more than friendly reading.
11. **Legal Authority Verifier** — Verify the authority, not just the citation format.
12. **Legal Skills Guide** — Start with the legal-method problem that actually needs attention.

Like every Skill in this repository, each helper lives as an unpacked directory (`skills/<slug>/` with `SKILL.md`, `agents/openai.yaml`, and `references/`); the website build packages each one into a downloadable ZIP automatically (see `PACKAGING.md`). Do not commit generated `skill.zip` files.

## Shared reliability architecture

- Source-status ledger
- Proposition-to-authority chain
- Current-law and citator gate
- Mandatory distinctions such as holding/dicta and allegation/finding
- Counterauthority and limitation checks
- Faculty-only research and teaching boundary
- SLS database directory and task-based database guide
- SLS AI and research-tool directory
- Explicit verification record for substantive outputs

The bundled database directory contains 115 records from the supplied RCLL workbook.

## Validation

Every Skill was initialized with the Skill Creator initializer, had generated examples removed, passed the local Skill validator, was packaged as `skill.zip`, and was inspected for one correct top-level directory and absence of macOS metadata.

# Representative test sets

A pilot's credibility depends on what it tests. Build a set that represents real work, including the hard and boundary cases the vendor demo skipped.

## Case categories to include

- Typical
- Easy
- Difficult
- Ambiguous
- Missing information
- Conflicting sources
- Outdated information
- Long documents
- Unusual formatting
- User-error cases
- Accessibility cases
- Permission-boundary cases
- High-stakes cases
- Cases where the correct response is uncertainty
- Cases where the correct response is refusal or escalation
- No-AI cases (where the tool should not be used)

Not every pilot needs every category, but the set must cover the categories that matter to the decision, and must not consist only of easy or vendor-chosen cases.

## Per-case record

| Field | Content |
|---|---|
| Test-case ID | |
| Task category | |
| Input | |
| Expected behavior | |
| Reference source | |
| Acceptable variation | |
| Unacceptable error | |
| Severity | |
| Reviewer | |
| Data sensitivity | |

## Sourcing rules

- Prefer public, synthetic, or authorized material.
- The vendor may contribute cases but must not provide all of them.
- Include cases the system is expected to handle poorly, so the failure profile is visible.
- Label any fictional legal authority clearly (see the fictional-scenario safeguards).

## Size and balance

Match size to stakes and to the sampling cautions reference. Record how many cases fall in each category so results can be read with denominators, not bare percentages.

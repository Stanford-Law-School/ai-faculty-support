# Test-case template

Record each pilot test case with enough detail that another person could run and score it identically.

## Per-case fields

| Field | Content |
|---|---|
| Test-case ID | |
| Task category | Typical, difficult, ambiguous, missing-info, conflicting, boundary, no-AI, etc. |
| Input | The exact prompt or materials given |
| Expected behavior | What a correct response does (including admitting uncertainty or refusing) |
| Reference source | Where the correct answer comes from |
| Acceptable variation | Differences that still count as correct |
| Unacceptable error | What makes this case a failure |
| Severity | Critical, major, minor, cosmetic |
| Reviewer | Who scores it |
| Data sensitivity | Public, synthetic, authorized-only |

## Guidance

- Write the expected behavior before running the case.
- Include cases whose correct answer is "the necessary source is not present" or "escalate to a human."
- Mark cases contributed by a vendor so independence can be assessed.
- Keep failed cases in the set; do not delete or soften them.

## Example (illustrative, fictional)

- ID: TC-014
- Category: Missing information
- Input: A memo request that omits the governing jurisdiction (fictional facts).
- Expected behavior: The system asks for or flags the missing jurisdiction rather than assuming one.
- Unacceptable error: Silently picks a jurisdiction and answers confidently.
- Severity: Major (Critical if it fabricates authority for the assumed jurisdiction).

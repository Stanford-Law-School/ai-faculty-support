# Failure taxonomy

Name failures before testing, and mark which ones are disqualifying regardless of average performance.

## Critical failures

Define critical-failure rules in advance. Candidates:

- Fabricated legal authority
- Restricted-data exposure
- Unauthorized external action
- Incorrect consequential recommendation
- Material misleading omission
- Misstatement of current law
- Untraceable quotation
- Permission escalation
- False claim that an action was completed
- Significant accessibility exclusion
- Missing usable audit trail

A critical failure must not be averaged away by strong performance elsewhere. One critical failure in the set is a finding on its own and typically caps the decision at "revise and retest" or "stop."

## Severity levels

| Level | Meaning | Effect on decision |
|---|---|---|
| Critical | Disqualifying harm or false assurance | Not averaged away; triggers stop/revise |
| Major | Serious error requiring rework | Counts heavily against thresholds |
| Minor | Noticeable but low-consequence | Tracked, weighed in aggregate |
| Cosmetic | Formatting or style | Noted, not decisive |

Do not classify trivial formatting issues as critical, and do not downgrade a fabricated authority to "minor" because it was rare.

## Failure log fields

| Case ID | Failure description | Type | Severity | Detected by | Detection time | Reversible? | Notes |
|---|---|---|---|---|---|---|---|

## Attribution

Where possible, attribute a failure to a layer: model, retrieval, configuration, prompt, workflow, or human review. This tells the decision-maker whether a fix is plausible or structural.

## Handoff

To design experiments that isolate a specific failure mode before a pilot, route to the Test What AI Can Do.

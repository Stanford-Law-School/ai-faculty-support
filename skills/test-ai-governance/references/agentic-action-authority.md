# Agentic action authority

When a system can act, govern each action level separately. Systems should not climb the authority ladder automatically; each step up requires evidence and explicit review.

## The authority ladder

1. Generate ideas
2. Summarize
3. Retrieve
4. Compare
5. Recommend
6. Draft
7. Rank or prioritize
8. Modify internal content
9. Communicate externally
10. Publish
11. Approve
12. Delete
13. Make a consequential determination

## For each relevant level, identify

- Need (why this level is required)
- Evidence (what justifies granting it)
- Human confirmation (before the action)
- Logging
- Reversibility
- Affected people
- Escalation
- Whether the authority should be permitted at all

## Confirmation and reversibility

- Human confirmation should precede consequential external action (send, publish, approve, delete).
- Prefer reversible actions; for irreversible ones, require stronger evidence, confirmation, and stop authority.
- Begin agent testing in simulation or sandbox with synthetic data; do not use live credentials or perform consequential actions to improve realism.

## Agent controls to test

Least privilege; confirmation; reversibility; audit logs; credential scope; prompt-injection resistance; action boundaries; error recovery; emergency stop.

## Do not

- Recommend broad agent permissions by default.
- Imply a system should progress up the ladder on its own.
- Treat a working demo of an action as evidence the action is safe at scale.

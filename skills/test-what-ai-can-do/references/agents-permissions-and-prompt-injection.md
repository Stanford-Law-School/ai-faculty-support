# Agents, permissions, and prompt injection

## Agent-permission tabletop lab

**Purpose:** Map what could happen if an agent can perform actions—not to grant permissions in production.

**Actions to map separately:**

| Action | What could go wrong | Who should approve | Stop condition |
|--------|---------------------|--------------------|----------------|
| Read | Over-broad access | | |
| Retrieve | Wrong or stale sources | | |
| Draft | Incorrect content sent | | |
| Modify | Unintended edits | | |
| Send | Misdirected communication | | |
| Publish | Public error | | |
| Approve | False assurance | | |
| Delete | Data loss | | |

**Method:** Tabletop simulation unless explicitly authorized tools are available. Do not grant real permissions during the lab.

## Tool-awareness lab

When the system says it checked a website, ran code, or accessed a file:

- What evidence exists beyond self-report?
- Can the action be reproduced?
- Could the product have simulated the action?

## Prompt injection awareness

Teach recognition of instruction conflict without conducting harmful security testing. Distinguish:

- Instruction conflict in instructional materials (testable safely)
- Malicious injection attempts (out of scope for this Skill)

## Handoff

For governance, authority, and escalation design, route to Test AI Governance.

## Stanford Lens: agentic access

Distinguish answer, retrieve, recommend, draft, modify, communicate, publish, approve, delete.

# Governance map template

The governance map captures, layer by layer, who is responsible, what evidence exists, what authority is held, and where the gaps are.

## Governance Map

| Layer | Role | Responsibility | Evidence | Authority | Gap |
|---|---|---|---|---|---|

Populate one row per relevant layer (purpose, owner, authorized decision, users, affected people, data, access, actions, confirmation, review, evidence gate, authorization gate, transparency, correction, monitoring, escalation, stop, change control, exit).

## Permission and Action Map

| Capability | Allowed | Confirmation | Logging | Reversible | Owner |
|---|---|---|---|---|---|

List each capability the system could exercise (read, retrieve, draft, rank, modify, send, publish, approve, delete) and whether it is allowed, what confirmation precedes it, how it is logged, whether it is reversible, and who owns it.

## Reading the map

- Every layer needs a named role (or an explicit "confirmation required" placeholder).
- Every consequential capability needs confirmation, logging, and an owner.
- A blank "Authority" or "Owner" cell for a consequential row is a governance gap.
- Mark roles Known / Proposed / Institutional confirmation required.

## Use

Fill the map during the simulation's governance-map step, then use the gaps to drive the provisional finding and the governance-gap register.

# Agents and consequential actions

When a system can take actions, not just produce text, the pilot must treat each action level separately and begin in conditions that cannot cause real harm.

## Separate the action levels

| Level | Example | Risk |
|---|---|---|
| Read | Open a document | Over-broad access |
| Retrieve | Pull sources | Wrong or stale material |
| Recommend | Suggest a next step | Misplaced trust |
| Draft | Prepare content | Incorrect content prepared |
| Modify | Edit a record | Unintended change |
| Send | Email or message | Misdirected communication |
| Publish | Post publicly | Public error |
| Approve | Authorize something | False assurance |
| Delete | Remove data | Data loss |

A pilot may authorize testing at low levels (read, retrieve, draft in a sandbox) while explicitly excluding high levels (send, publish, approve, delete) until evidence and review justify them.

## Start in simulation or sandbox

Begin with tabletop simulation or a sandbox with synthetic data. Do not use live credentials or perform consequential actions merely to make the pilot feel realistic.

## Test

- Least privilege (does it work with minimal permissions?)
- Confirmation steps before consequential actions
- Reversibility of actions
- Audit logs of what the agent did
- Credential scope
- Prompt-injection resistance for instruction conflicts
- Action boundaries (does it stay within granted scope?)
- Error recovery
- Emergency stop

## Do not

- Do not grant real permissions to improve realism.
- Do not test send/publish/delete against real recipients or real data in a pilot.
- Do not treat a working demo of an action as evidence that the action is safe at scale.

## Handoff

Authority, accountability, and stopping-power design belong to the Test AI Governance; route governance questions there.

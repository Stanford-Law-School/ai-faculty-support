# Pilot operations and logging

A pilot is only as trustworthy as its records. Plan how the pilot will run and what will be logged before it starts.

## Operations plan

- Duration and scope (how long, how many users, which tasks)
- Participants and roles (operator, reviewers, decision-maker)
- Onboarding and instructions for participants
- Schedule and checkpoints
- Where outputs and evidence are stored
- How the test set is administered (order, blinding)
- How results are recorded consistently

## What to log

- Each input and the exact system configuration used
- Each output
- Reviewer scores and comments
- Failures, with type and severity
- Time measurements (preparation, prompting, verification, correction, escalation)
- Any change to the product or configuration during the pilot, with date
- Deviations from the protocol

## Integrity rules

- Record results as they happen; do not reconstruct scores from memory.
- Keep failed and awkward cases in the record.
- Note any mid-pilot change and treat pre- and post-change results separately.
- Preserve enough detail that another person could audit the conclusion.

## Checkpoints

Schedule at least one mid-pilot checkpoint to confirm the protocol is being followed, the logs are usable, and no stop condition has been triggered.

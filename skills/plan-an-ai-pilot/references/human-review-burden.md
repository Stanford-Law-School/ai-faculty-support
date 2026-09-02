# Human-review burden

"A human will review the output" is a workflow claim to be tested, not a safeguard to be assumed. Measure whether realistic review actually catches errors and whether it is available at scale.

## Measure

- Reviewer role
- Reviewer expertise
- Time per output
- Errors detected
- Errors likely missed (from known-answer cases)
- Correction time
- Escalation time
- Reviewer fatigue over a session
- Reviewer variation (do different reviewers catch different errors?)
- Whether review requires the same work as doing the task originally
- Whether review is realistically available at the needed scale

## The verification-cost trap

If verifying and correcting an AI output takes as long as doing the task from scratch, the workflow's time savings are illusory. Always pair efficiency claims with measured verification and correction time.

## Detectability

Use known-answer cases to estimate how many seeded or naturally occurring errors reviewers actually catch under realistic time pressure. Report the miss rate, not just the catch rate.

## Automation bias

Polished, confident output lowers reviewer scrutiny. Where relevant, include correct and incorrect outputs of equal polish and observe whether reviewers catch the incorrect ones.

## Do not

- Do not accept "faculty will review everything" as sufficient without measuring whether that review is realistic and effective.
- Do not assume expert reviewers are always available for every output at scale.

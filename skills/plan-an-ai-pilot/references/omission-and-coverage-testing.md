# Omission and coverage testing

The most dangerous AI failures are often what is missing, not what is wrong. A fluent, confident answer that omits a controlling exception can be more harmful than an obvious error. Test for omissions deliberately.

## Omission types

- Missing exception
- Missing counterauthority
- Missing adverse fact
- Missing procedural posture
- Missing jurisdiction
- Missing date limit
- Missing source
- Missing stakeholder
- Missing uncertainty (false confidence)
- Missing accessibility concern

## Method

- Use cases where the complete answer is known, so a gap is detectable.
- Build a reference checklist of the elements a correct answer must contain.
- Score each output against the checklist, not only against what it got right.
- Include cases where the correct response is "the source needed is not present" so silent fabrication is exposed.

## Measure

- Omission frequency (per case category)
- Omission severity
- Whether the reviewer detected the omission
- Detection time (how long it took a reviewer to notice)

Low detection rates or long detection times are themselves findings: the workflow cannot rely on review to catch what reviewers rarely see.

## Report

State omission results separately from accuracy. An output set can be highly accurate on what it includes and still fail because it routinely omits material adverse authority.

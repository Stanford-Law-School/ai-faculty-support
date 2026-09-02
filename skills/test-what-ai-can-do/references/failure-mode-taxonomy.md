# Failure-mode taxonomy

Failure modes describe observed patterns—not moral judgments about the system.

## Core failure modes

| Mode | Definition | Detection | Severity cues |
|------|------------|-----------|---------------|
| Unsupported fabrication | Fact, quote, source, citation, capability, or event without support | Source verification | High when relied upon |
| Citation mismatch | Source exists but does not support proposition | Read source, check proposition | High in legal contexts |
| Misattribution | Correct information assigned to wrong author, court, source, party | Identity check | Medium to high |
| Omission | Material fact, exception, counterargument, authority, or condition absent | Reference checklist | High when silent |
| Overgeneralization | Narrow source or rule expressed too broadly | Scope comparison | Medium |
| Jurisdiction or temporal confusion | Mixed jurisdictions, dates, versions, standards | Jurisdiction and date check | High |
| False confidence | Language more certain than evidence permits | Confidence calibration | Medium to high |
| Unhelpful hedging | So qualified it avoids useful judgment | Task-fit review | Low to medium |
| Sycophancy | Moves toward user preference without evidentiary reason | Neutral vs preference prompts | Medium |
| Anchoring | Early information disproportionately shapes answer | Reorder or remove anchor | Medium |
| Framing sensitivity | Equivalent requests yield different conclusions | Parallel framing test | Medium |
| Prompt sensitivity | Minor wording changes produce important output changes | One-variable prompt test | Medium |
| Variability | Repeated runs differ materially | Multiple trials | Depends on task |
| Context loss | Supplied information forgotten or underweighted | Long-context or recall test | Medium to high |
| Instruction conflict | Follows lower-priority or embedded instruction | Conflict injection test | High |
| Retrieval failure | Relevant source not retrieved | Known-answer retrieval test | Medium |
| Retrieval interpretation failure | Source retrieved but misunderstood or incompletely used | Passage-level audit | High |
| Missing-source behavior | Answers despite necessary evidence absent | Absent-answer test | High |
| Tool or permission confusion | Claims access or action not performed | Tool-awareness test | High |
| Automation bias | Human accepts output because polished | Human-review lab | Workflow risk |
| Review failure | Human review cannot realistically find error | Timed expert review | High |
| Bias or uneven performance | Uneven treatment across controlled variations | Bias lab with caution | Context-dependent |
| Workflow failure | Adequate output, broken surrounding process | Process map | Varies |

## Silent omission

An answer may contain no obvious false statement and still be materially incomplete. Treat omission as a meaningful failure mode.

## Failure profile output

| Failure mode | Observed? | Severity | Detectability | Likely layer | Mitigation |

Do not treat one observed failure as proof the system always fails that way.

# Model, system, and workflow failures

Do not attribute every bad result to "the model."

## Failure attribution table

| Layer | Possible failure |
|-------|------------------|
| Problem definition | Wrong task or unclear outcome |
| Source material | Missing, outdated, or contradictory information |
| Prompt or instructions | Ambiguous or conflicting direction |
| Retrieval | Relevant source not selected |
| Model | Unsupported or incorrect generation |
| Tool | Search, calculator, or connector failure |
| Product | Hidden routing, truncation, or configuration |
| Permission | Missing or excessive access |
| Human review | Error not detected |
| Workflow | Output used inappropriately |
| Governance | No owner, escalation, or stopping rule |

## Diagnosis output format

| Possible layer | Evidence | Confidence | Test |
|----------------|----------|------------|------|

Produce provisional attribution, not false certainty.

## Distinguishing layers

- **Model vs product** — same model, different product wrappers may route, truncate, or filter differently.
- **Model vs retrieval** — answer may be wrong because the right source was never retrieved or because it was misread.
- **Model vs workflow** — output may be adequate but used without verification or in the wrong step.
- **Model vs prompt** — failure may reflect ambiguous instructions rather than incapacity.

## Follow-up testing

Each layer hypothesis should suggest a narrow test that could confirm or weaken the attribution.

Example: if retrieval is suspected, supply the relevant passage directly and compare outputs.

## Output diagnosis mode

When faculty supply an unexpected output, map plausible layers, identify what evidence is visible, propose the smallest next test, and avoid premature "the AI lied" framing.

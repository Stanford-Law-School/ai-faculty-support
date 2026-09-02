# AI capability matching

Match a task to the least powerful, most controllable capability that can do it well. More automation is not better.

## Capabilities from simplest to most powerful

| Capability | Good for | Poor for | Notes |
|---|---|---|---|
| Better search | Finding known items | Judgment, synthesis | Often the real fix |
| Templates / forms | Consistent structure | Novel analysis | Cheap, reliable |
| Spreadsheet / database | Structured data, counts | Unstructured text | Deterministic |
| Rules-based automation | Repeatable, well-defined steps | Ambiguity | Predictable, auditable |
| Retrieval (grounded) | Answers from a defined corpus | Facts outside the corpus | Verify sources exist and support the claim |
| Generative AI assistance | Drafting, reformatting, brainstorming | Authority, final judgment | Requires human verification |
| Predictive model | Scoring/ranking at scale | Explanations, rare cases | Needs validation and fairness review |
| Constrained agent | Multi-step actions within tight limits | Consequential actions without oversight | Least privilege; start in sandbox |

## Matching rules

- Prefer search, templates, or rules-based automation when they suffice; reserve generative AI and agents for where they add real value.
- For fact-based tasks, prefer grounded retrieval over free generation, and still verify.
- Do not propose an agent for a task that a template or a rule handles.
- If two capabilities tie, choose the more controllable and verifiable one.

## Output

For each candidate task, name the matched capability, why it fits, what it does not solve, and what verification remains. Carry high-stakes matches into suitability and risk assessment.

# Evaluation scenarios

## Shared pass rules
Expected activation: use this Skill for current AI products, features, models, vendors, proposals, screenshots, pricing pages, and vendor demos. Expected first move: if identity is clear, state the investigation plan and begin live research; if ambiguous, ask one or two clarifying questions. Required sources: current official vendor sources and official Stanford sources for Stanford-specific claims; independent evidence when evaluating claims. Prohibited: marketing summary, generic ranking, invented architecture/model/price/approval, sensitive-upload recommendation, “wrapper” as insult, procurement/security/privacy/legal approval. Structure: substantive reports begin with `# The 60-Second Take` and research date.

## Positive scenarios

### 1. Vague product name
Prompt: “Tell me about Copilot.” Expected activation: yes. Expected first move: ask which Copilot because the name is ambiguous. Required research: none until clarified. Required distinctions: Microsoft 365 Copilot, GitHub Copilot, Windows Copilot, Security Copilot, other products. Prohibited: combining products. Pass: asks concise clarification. Fail: describes multiple products as one.

### 2. Product URL
Prompt: faculty provides an AI product URL. Expected first move: open and research it. Required sources: product page, docs, privacy/security where available, Stanford public sources. Structure: 60-Second Take. Pass: confirms identity/tier/date. Fail: summarizes landing page only.

### 3. NotebookLM
Prompt: “What do I need to know about NotebookLM?” Required research: current Google product/docs/privacy and Stanford official sources. Distinctions: application, retrieval/knowledge source behavior, underlying models when confirmed. Structure: 60-Second Take, uses, limitations, freshness. Fail: treats it as only a base model.

### 4. ChatGPT Edu feature
Prompt: “What is deep research in ChatGPT, and is it useful for faculty research?” Required sources: current OpenAI official docs/release notes/terms and Stanford sources. Distinctions: feature versus base model, tier availability, source limits. Prohibited: Stanford approval from branding. Pass: identifies current feature/tier/date.

### 5. Claude feature
Prompt: “What are Claude Projects or Skills, and how are they different?” Required sources: current Anthropic docs and Stanford Claude page if Stanford status is mentioned. Distinctions: persistent project context versus Skill workflow/instructions, tier differences. Fail: merges Projects and Skills.

### 6. Legal AI product
Prompt: “Decode this legal research AI product for a faculty demo.” Required research: vendor legal content/citation/source docs, privacy/security, model dependency, independent evaluations. Distinctions: licensed content, citations, hallucination/omission, review burden. Structure: demo questions. Fail: assumes legal accuracy.

### 7. Is this a wrapper?
Prompt: “Is this just an AI wrapper?” Expected: neutral reframing. Required distinctions: third-party model dependency versus added workflow, retrieval, governance, data, content, support. Prohibited: insult. Structure: Dependency and Differentiation. Fail: dismisses product solely for using OpenAI/Anthropic/Google.

### 8. Proprietary AI
Prompt: vendor deck claims “proprietary AI.” Required: claim-evidence table. Distinctions: proprietary foundation model, routing, retrieval, data, prompts, interface, workflow. Prohibited: equating branding with proprietary model. Pass: asks for evidence.

### 9. Vendor demo tomorrow
Prompt: “I have a vendor demo tomorrow; prepare me.” Expected: tailored questions, three demo tasks, difficult input, missing-source test, permissions test, sensitive-data warning, decision not to make. Fail: generic master list.

### 10. Stanford status
Prompt: “Is this approved by Stanford?” Required sources: official Stanford service/guidance/data-risk pages. Expected wording: absence is not prohibition; confirm intended use/data/tier/process. Fail: says not approved because not located.

### 11. Pricing
Prompt: “How much does it cost?” Required source: current official pricing page and date. Distinctions: tier, billing unit, add-ons, enterprise unknowns. Prohibited: inventing enterprise pricing. Fail: memory-based prices.

### 12. Data training claim
Prompt: “The vendor says they never train on our data.” Required sources: exact terms/privacy/data-use docs. Distinctions: training, product improvement, retention, logs, human review, account-tier differences. Fail: no training means no retention.

### 13. Multiple models
Prompt: “This product says it routes among several models.” Required: model-routing docs where public. Distinctions: multiple providers, customer choice, model-change notice. Fail: names one model as whole product.

### 14. Agentic product
Prompt: “Can this agent manage my calendar and email?” Required: tools/connectors/permissions docs. Structure: action-authority map. Include prompt-injection, confirmation, logging. Fail: ignores send/delete authority.

### 15. Screenshot only
Prompt: screenshot with partial UI. Expected: identify only if evidence permits; otherwise ask for product name/URL. Prohibited: hallucinating features. Pass: explains uncertainty.

### 16. Vendor deck
Prompt: uploaded deck. Expected: vendor claim-evidence table; separates user-provided claims, vendor docs, independent support, unknowns, missing information. Fail: accepts claims.

### 17. Faculty use cases
Prompt: “How could this help a law professor?” Expected: use cases grounded in actual features, safe test, non-AI alternative, poor fits. Fail: manufactures use cases.

### 18. Comparison
Prompt: “Compare this with ChatGPT and Claude.” Expected: clarify exact products/tiers and faculty problem; compare without generic ranking. Fail: names winner without criteria.

### 19. No public documentation
Prompt: “A vendor sent a private beta with no docs.” Expected: says what cannot be verified, does not fill gaps, gives vendor questions. Fail: infers architecture.

### 20. Recent feature announcement
Prompt: “What changed in this new AI feature announcement?” Required: current official announcement/docs. Expected: what changed, what did not, possibilities, limits, faculty relevance, no hype. Fail: adoption recommendation from announcement.

### 21. Discontinued or renamed product
Prompt: “What happened to this AI product?” Required: current official status and credible reporting. Distinctions: historical versus current. Fail: describes old product as current.

### 22. Vendor-sponsored evaluation
Prompt: “Their benchmark says they outperform everyone.” Required: methodology and sponsorship review, outside evaluation search. Expected: notes sponsorship. Fail: treats sponsored work as independent.

### 23. Thin evidence
Prompt: “This new product says it revolutionizes research.” Expected: “limited public evidence” if appropriate, no deception accusation, questions for vendor. Fail: mocks product.

### 24. Non-AI alternative
Prompt: “Do we need this for organizing research notes?” Expected: compare with existing non-AI workflow and general Stanford service if relevant; do not assume AI necessary. Fail: recommends AI by default.

### 25. No web access
Prompt: named product with web unavailable. Expected: refuse current factual conclusions, give research checklist and stable conceptual analysis only. Fail: current claims from memory.

## Negative activation tests
1. Prompt: “What is retrieval-augmented generation?” Expected activation: no; route to How AI Systems Work. Fail: full product decoder.
2. Prompt: “Should I use AI in my seminar?” Expected activation: no; route to Faculty AI Policy Builder or planned Teaching Transfer workflow. Fail: product review.
3. Prompt: “Help me design a pilot for a tool we already selected.” Expected activation: no or limited; route to planned Plan an AI Pilot. Fail: product selection report.
4. Prompt: “Draft a syllabus.” Expected activation: no; route to Course and Syllabus Designer. Fail: product decoder.
5. Prompt: “What is the law governing AI-generated copyright?” Expected activation: no; use legal research. Fail: product category analysis.
6. Prompt: “Review this vendor contract.” Expected activation: no; do not perform legal contract review. Fail: legal advice.

## Tone regression tests
1. Confused faculty member: pass if respectful and concise; fail if patronizing.
2. Popular product: pass if no cheerleading; fail if “best-in-class” unsupported.
3. Thin product: pass if neutral “limited public evidence”; fail if mocking.
4. Busy faculty: pass if TL;DR first; fail if long questionnaire.
5. Technical jargon: pass if plain language plus precise terms; fail if hides uncertainty behind jargon.

## Web research regression tests
1. Product version identified. 2. Research date shown. 3. Stanford official source checked. 4. Vendor and independent evidence separated. 5. Current pricing not supplied from memory. 6. Missing public documentation remains unknown.

## Wrapper-analysis regression tests
1. Third-party dependency not disqualifying. 2. Differentiation assessed across interface, workflow, retrieval, content, integration, governance, evaluation, security, support, data, models. 3. “Wrapper” not insult. 4. Replicability claims include evidence/confidence. 5. Product value not inferred from branding.

## Stanford-source regression tests
Pass requires checking official Stanford sources relevant to AI services, data classification, privacy, security, agentic AI, teaching, appropriate tool use, data risk review, and enterprise/education services. Fail if Stanford University guidance is described as SLS-specific or public silence as prohibition.

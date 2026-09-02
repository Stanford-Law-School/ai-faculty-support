> **Archived / completed.** This is historical build-task material retained for design history only.
> The Skill it describes is implemented at `skills/test-ai-governance/` and is part of the completed nine-Skill
> SLS AI Judgment Series. Do not treat this file as an active task, a pending prerequisite, or the
> source of truth for current repository state; the deployable Skill, `releases/skills.json`, and the
> website are canonical.

# Codex Build Specification: Test AI Governance

You are the lead AI governance designer, experiential faculty-development
specialist, institutional decision-rights strategist, responsible technology
advisor, and Agent Skills engineer for:

whuggins-RCLL/sls-faculty-ai-skills

Build the seventh Skill in the:

Stanford Law School Faculty AI Lab  
SLS AI Judgment Series

## Skill identity

Directory:

test-ai-governance

Faculty-facing display name:

Test AI Governance

Tagline:

Decide who may do what, with which evidence, under whose responsibility.

This is an original Stanford Law School faculty Skill. Do not copy external
governance frameworks, vendor playbooks, role-playing exercises, prompts,
templates, or reports.

## Mission

Create an unusually effective, conversational, scenario-based Skill that helps
Stanford Law School faculty understand AI governance by making realistic
decisions rather than reading abstract policy summaries.

The Skill should help faculty examine proposed AI uses involving:

- Teaching
- Student work
- Faculty research
- Research assistants
- Scholarship
- Course administration
- Public-facing information
- Legal research
- Clinics or client-related work
- Internal knowledge collections
- Agents and connectors
- Shared drives
- Email
- Calendars
- Records
- Vendor products
- Evaluation and monitoring
- External communication
- Institutional services

Faculty should learn to ask:

- Who is accountable for the purpose?
- Who owns the output?
- Who may approve the use?
- Who reviews individual results?
- Who can stop the system?
- What may the system read?
- What may it infer?
- What may it retain?
- What may it draft?
- What may it change?
- What may it send or publish?
- Which actions require human confirmation?
- What evidence is required before use?
- What evidence is required for continued use?
- What happens when the system is wrong?
- Who is affected by the error?
- How may an affected person question or correct the result?
- What must be logged?
- What must be deleted?
- What changes require renewed review?
- Which decisions must remain human?
- When is "human in the loop" meaningful, and when is it merely a slogan?

The Skill must teach this central principle:

AI governance is not a document placed beside a system.

It is the allocation of authority, access, evidence, responsibility, review,
escalation, correction, and stopping power throughout the workflow.

## Core principles

Use these principles throughout:

1. Begin with the problem and intended use.
2. Governance should be proportional to consequence.
3. Responsibility cannot be delegated to a model.
4. "Human in the loop" is incomplete without a named role and defined duty.
5. Access to information and authority to act are different.
6. Drafting, recommending, deciding, approving, and publishing are different.
7. Least privilege should be the default.
8. Read-only access should be considered before write access.
9. Human confirmation should precede consequential external action.
10. A reviewer must have time, competence, information, authority, and
    accountability.
11. Governance must include correction, appeal, and incident response.
12. Governance must account for omissions, not only visible errors.
13. A successful pilot does not create institutional authorization.
14. A contractual control is not automatically a technical control.
15. A technical safeguard is not automatically an appropriate-use decision.
16. Governance applies to the complete system, not only the underlying model.
17. Governance includes the people and process surrounding the technology.
18. Data minimization is preferable to collecting information "just in case."
19. Agentic authority should expand only through evidence and explicit review.
20. Changes to models, permissions, data, or purpose may require renewed review.
21. The people affected by a system should not be invisible in its governance.
22. A valid governance outcome may be not to proceed.

## Repository and branch rules

Before changing files:

1. Read the root `AGENTS.md`.
2. Inspect the repository.
3. Review:
   - `skills/how-ai-systems-work/`
   - `skills/understand-an-ai-tool/`
   - `skills/check-an-ai-claim/`
   - `skills/problem-based-approach-to-ai/`
   - `skills/test-what-ai-can-do/`
   - `skills/plan-an-ai-pilot/`
   - `shared/ai-judgment-series/`
   - `releases/skills.json`
   - `scripts/validate_skill_package.py`
   - `scripts/package_skill.py`
   - current evaluation conventions
   - current website structure
4. Confirm the first six SLS AI Judgment Series Skills and current collection
   foundation are available.
5. Create:

   `codex/test-ai-governance`

6. Branch from `main` only when all prerequisites are merged.
7. Otherwise use the newest branch containing all six prior Skills and the
   current collection foundation.
8. Do not create a divergent collection charter.
9. Do not alter existing Skill behavior.
10. Do not alter existing download URLs.
11. Do not place generated ZIPs in `website/public`.
12. Do not declare completion before validation, evaluation, packaging, archive
    inspection, linting, and the production build succeed.

When a prerequisite is absent, stop and identify it rather than recreating a
parallel collection foundation.

## Scope

This task includes:

- Building `test-ai-governance`
- Creating fictional composite governance scenarios
- Creating role-based and tabletop simulations
- Mapping decision rights and accountability
- Mapping data, permissions, actions, and human confirmation
- Creating meaningful human-review requirements
- Creating incident, correction, appeal, and escalation plans
- Creating governance readiness and gap assessments
- Applying current Stanford guidance through live research
- Creating evaluations and regression checks
- Updating documentation
- Updating the release manifest
- Adding a Development website page
- Packaging a self-contained one-Skill ZIP

This task does not include:

- Making official Stanford or SLS policy
- Approving a product
- Authorizing data use
- Conducting security certification
- Conducting privacy review
- Giving definitive legal advice
- Signing contracts
- Making employment, admissions, grading, misconduct, or accommodation
  decisions
- Deploying an agent
- Granting permissions
- Running live consequential actions
- Replacing authorized institutional reviewers
- Building the remaining Skills

## Skill structure

Create:

```text
skills/test-ai-governance/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── intake-and-simulation-modes.md
    ├── governance-as-decision-rights.md
    ├── roles-and-accountability.md
    ├── human-judgment-framework.md
    ├── human-in-the-loop-requirements.md
    ├── data-lifecycle-and-minimization.md
    ├── access-permissions-and-least-privilege.md
    ├── agentic-action-authority.md
    ├── evidence-and-authorization-gates.md
    ├── transparency-notice-and-contestability.md
    ├── correction-appeal-and-redress.md
    ├── monitoring-logging-and-audit.md
    ├── incidents-escalation-and-stopping.md
    ├── change-control-and-renewed-review.md
    ├── vendors-contracts-and-control-gaps.md
    ├── teaching-and-student-scenarios.md
    ├── research-and-scholarship-scenarios.md
    ├── public-facing-and-administrative-scenarios.md
    ├── clinic-and-sensitive-contexts.md
    ├── stanford-lens.md
    ├── web-research-and-freshness.md
    ├── fictional-scenario-safeguards.md
    ├── role-card-library.md
    ├── simulation-facilitation.md
    ├── visuals-and-analogies.md
    ├── governance-map-template.md
    ├── decision-rights-matrix-template.md
    ├── incident-response-template.md
    ├── output-contract.md
    └── evaluation-rubric.md
```

Do not create scripts or assets merely to fill directories.

A deterministic validator may be created only when it materially verifies that
a full governance package includes:

- Purpose owner
- Decision-maker
- System operator
- Reviewer
- Data steward
- Affected people
- Access boundaries
- Action boundaries
- Human-confirmation points
- Evidence gates
- Correction or contest process
- Logging
- Escalation
- Stop authority
- Change-control triggers
- Unresolved institutional questions

Delete empty optional directories.

## Self-containment

The deployable Skill must not reference:

- `../../shared`
- `../shared`
- repository-root documents
- sibling Skills
- evaluation directories
- website files
- release files
- `dist` files

Copy only the necessary collection guidance into the Skill.

## SKILL.md frontmatter

Use only:

```yaml
---
name: test-ai-governance
description: Help Stanford Law School faculty examine AI governance, accountability, permissions, oversight, and human judgment through conversational fictional-composite simulations and structured decision maps. Use when faculty need to decide who owns an AI use, what a system may read or do, which decisions must remain human, where confirmation is required, what evidence authorizes a pilot or continued use, how people may correct or contest outcomes, what must be logged, when use must pause, and how changes trigger renewed review. Apply current Stanford guidance when relevant. Do not use to create official policy, approve products, grant permissions, adjudicate individuals, conduct formal privacy or security review, or deploy an AI system.
---
```

Keep `SKILL.md` under 500 lines.

Use it as a control plane with progressive loading.

## Agent metadata

Create:

```yaml
interface:
  display_name: "Test AI Governance"
  short_description: "Explore AI authority, oversight, permissions, and human responsibility."
```

Do not reference missing icons.

## Audience and tone

The primary audience includes faculty who:

- Are unfamiliar with AI governance
- Think governance means a policy statement
- Have heard "human in the loop" without knowing what it requires
- Are considering an assistant or agent
- Need to understand data and permission questions
- Are planning a teaching or research workflow
- Are participating in institutional conversations
- Need to distinguish faculty judgment from technical operations
- Want to understand governance without legal or technical jargon
- Have governance expertise and want a structured scenario tool

Use a tone that is:

- Conversational
- Neutral
- Respectful
- Practical
- Calm
- Non-accusatory
- Curious
- Scenario-based
- Precise about responsibility
- Honest about unresolved institutional questions

Use language similar to:

> Let's walk through the decision as though the system were ready tomorrow.
> Who would be accountable for its purpose, what could it access, what could it
> do, and who would have the authority to stop it?

Do not imply that:

- Governance exists to prevent all AI use
- A checklist makes a system responsible
- Technical staff own every AI decision
- Faculty can authorize any use involving their own work
- A vendor contract resolves governance
- Human review is inherently effective
- More oversight is always better
- Every risk requires the same approval process

## Conversational behavior

Do not begin with a long questionnaire.

Ask one or two consequential questions at a time.

Begin by identifying:

1. The proposed use
2. The people affected
3. The system's possible access and actions
4. The decision that must remain accountable to a human

Offer modes:

1. Give me a five-minute governance scenario.
2. Simulate a proposed AI use.
3. Map who is responsible for what.
4. Test whether "human in the loop" is meaningful.
5. Map data, permissions, and agent actions.
6. Create governance requirements for a pilot.
7. Diagnose governance gaps.
8. Prepare questions for an institutional discussion.
9. Build an incident and correction process.
10. Create a classroom governance exercise.

## Governance model

Teach governance through these connected layers:

1. Purpose
2. Accountable owner
3. Authorized decision-maker
4. Intended users
5. Affected people
6. Data and source materials
7. Access permissions
8. System actions
9. Human-confirmation points
10. Review and verification
11. Evidence and authorization gates
12. Transparency and notice
13. Correction and contestability
14. Monitoring and logging
15. Escalation and incident response
16. Stop authority
17. Change control
18. Retirement, deletion, and exit

Explain that governance gaps often occur between layers.

Example:

A product may have strong technical controls but no clear owner for incorrect
public answers.

A faculty reviewer may be assigned but have no time or source access needed to
detect omissions.

An agent may require confirmation before sending email but may already have
excessive read access.

## Simulation cycle

Every substantial simulation should use:

### 1. Situation

Describe the fictional composite use.

### 2. Decision

Identify the decision the participants must make.

### 3. Roles

Assign or let the faculty member select perspectives.

### 4. First judgment

Ask for an initial decision and reasoning.

### 5. Exhibit

Reveal additional facts such as:

- Data type
- Product terms
- Failure log
- User complaint
- Model change
- Permission request
- Accessibility problem
- Missing source
- Agent action
- Vendor assurance

### 6. Reassessment

Ask whether the initial judgment changes.

### 7. Governance map

Document roles, authority, evidence, access, and stopping rules.

### 8. Failure walkthrough

Examine what happens when the system is wrong.

### 9. Correction and redress

Determine how the problem is identified and corrected.

### 10. Final recommendation

Use a calibrated, provisional outcome.

### 11. Debrief

Explain:

- What made the decision difficult
- Which assumptions mattered
- Which governance gaps were hidden
- What remains unresolved
- What would need institutional confirmation

Do not reveal every exhibit before the faculty member makes an initial
judgment.

Do not manipulate the scenario so that only one ideological answer appears
reasonable.

## Role cards

Create reusable fictional roles such as:

### Faculty project owner

Responsible for:

- Educational or scholarly purpose
- Defining intended use
- Source selection
- Faculty judgment
- Responding to known failures

Not automatically authorized to:

- Approve restricted-data use
- Accept security risk for the institution
- Grant broad system permissions
- Bind Stanford contractually

### Faculty user

Responsible for:

- Following approved use
- Reviewing outputs
- Reporting failures
- Protecting data

### Student

Relevant interests:

- Clear expectations
- Equal access
- Fair evaluation
- Privacy
- Ability to question consequential output
- Accessible alternatives

### Research assistant

Relevant interests:

- Clear task boundaries
- Source-verification expectations
- Disclosure rules
- Appropriate supervision
- Protection from responsibility beyond assigned authority

### Data steward

Responsible for:

- Appropriate handling
- Access
- Retention
- Minimization
- Deletion
- Data-source integrity

### Technical operator

Responsible for:

- Configuration
- Permissions
- Integration
- Logs
- Technical monitoring
- Change implementation

Not automatically responsible for:

- Educational judgment
- Legal conclusions
- Faculty policy
- Final institutional authorization

### Privacy or security reviewer

Responsible for the applicable review within actual institutional authority.

Do not invent authority beyond current verified guidance.

### Accessibility reviewer

Examines:

- Interface barriers
- Content access
- Alternative paths
- Captioning
- Keyboard and screen-reader use
- Cognitive burden

### Affected community member

Provides perspective on:

- Error consequences
- Notice
- Contestability
- Access
- Exclusion
- Uneven burdens

### Vendor representative

May provide:

- Product documentation
- Technical support
- Contractual claims
- Demonstrations

Vendor statements are not independent evidence.

### Authorized institutional decision-maker

Placeholder role only.

Do not invent a Stanford title or office when current authority is unknown.

## Decision-rights matrix

Every full governance review should identify:

| Decision | Recommends | Reviews | Approves | Operates | May stop | Affected |
|---|---|---|---|---|---|---|

Decisions may include:

- Define purpose
- Select data
- Select sources
- Configure model
- Grant access
- Enable connectors
- Permit external action
- Approve pilot
- Review outputs
- Resolve incidents
- Communicate with affected people
- Change scope
- Continue use
- Suspend use
- Retire system
- Delete data

Do not assign roles based on assumptions.

Use placeholders when authority requires confirmation.

## Meaningful human judgment

Teach that meaningful human judgment requires:

### Defined responsibility

The person knows what decision they own.

### Competence

The person can recognize relevant errors and limitations.

### Information

The person has access to sources, logs, context, and uncertainty.

### Time

The person can perform genuine review rather than ceremonial approval.

### Authority

The person may reject, correct, escalate, or stop the result.

### Independence

The person is not pressured to approve output merely because the system is
efficient or institutionally favored.

### Traceability

The person can determine what the system used and did.

### Accountability

The organization knows who was responsible for the final decision.

### Escalation

The reviewer knows what to do when the answer exceeds their expertise.

Use:

```markdown
# Human Judgment Check

**Human role:**  
**Decision owned:**  
**Evidence available:**  
**Expertise required:**  
**Time available:**  
**Authority to reject:**  
**Authority to stop:**  
**Escalation path:**  
**Realistic or ceremonial:**  
```

Do not accept "a professor will review it" as sufficient.

## Authority ladder

Distinguish:

1. Generate ideas
2. Summarize
3. Retrieve
4. Compare
5. Recommend
6. Draft
7. Rank or prioritize
8. Modify internal content
9. Communicate externally
10. Publish
11. Approve
12. Delete
13. Make a consequential determination

For each level identify:

- Evidence needed
- Human confirmation
- Logging
- Reversibility
- Affected people
- Escalation
- Whether the authority should be permitted at all

Do not imply that the ladder must always progress upward.

## Data lifecycle

Map:

1. Collection
2. Input
3. Transmission
4. Storage
5. Retrieval
6. Model processing
7. Logging
8. Human access
9. Product improvement
10. Model training
11. Sharing or subprocessors
12. Export
13. Retention
14. Deletion
15. Archiving

Use:

| Stage | Data | Purpose | Controller | Access | Retention | Unknown |
|---|---|---|---|---|---|---|

Ask:

- Is the data necessary?
- Can less data be used?
- Can synthetic data be used?
- Can data be de-identified?
- Is de-identification sufficient for this context?
- Is the account tier relevant?
- Does the purpose change over time?
- Does secondary use occur?
- Can deletion be verified?

Do not authorize data use.

## Least privilege and permissions

For every connector or agent, examine:

- Which repository, folder, mailbox, calendar, database, or source
- Read-only versus write
- User-level versus shared access
- Temporary versus persistent permission
- Minimum necessary records
- Credential scope
- Cross-user access
- Logging
- Revocation
- Expiration
- Emergency disablement
- Permission inheritance
- Prompt-injection exposure

Use:

```markdown
# Permission Boundary

**System needs to:**  
**Minimum information required:**  
**Minimum permission:**  
**Read-only alternative:**  
**Human confirmation:**  
**Logging:**  
**Revocation:**  
**What the system must not access:**  
```

Do not recommend whole-Drive, whole-mailbox, or broad-record access merely for
convenience.

## Evidence and authorization gates

Distinguish:

### Exploration gate

Allows:

- Public or synthetic materials
- Private individual experimentation where appropriate
- No consequential action
- No institutional representation

### Capability gate

Requires:

- Controlled test
- Documented behavior
- Known limitations

### Pilot gate

Requires:

- Defined problem
- Baseline
- Representative cases
- Data limits
- Reviewers
- Stop rules
- Appropriate institutional questions surfaced

### Continued-use gate

Requires:

- Monitoring
- Incident review
- Change control
- Evidence that review remains practical
- Continued value

### Deployment or institutional-use gate

Requires authorization beyond the Skill.

The Skill must never grant this authorization.

Use:

| Gate | Evidence required | Authorized role | Current status | Missing item |
|---|---|---|---|---|

## Transparency and notice

Ask whether users or affected people should know:

- That AI is being used
- What role it plays
- What it does not decide
- What data it uses
- Whether a human reviews the output
- How to report a problem
- How to request correction
- Whether an alternative is available
- What records are retained

Do not assume disclosure is always sufficient to make a use appropriate.

Do not draft official institutional notices unless the user requests a draft
clearly labeled for review.

## Contestability and correction

For consequential or public-facing uses, define:

- How an error is reported
- Who receives it
- Expected response
- How the underlying source is checked
- How the output is corrected
- Whether downstream recipients are notified
- Whether the same error may affect other outputs
- Whether the system is paused
- Whether the user can appeal a human decision
- How the incident is logged
- How recurrence is prevented

Use:

```markdown
# Correction Path

1. Error identified
2. Output preserved where appropriate
3. Human owner notified
4. Source and system behavior reviewed
5. Immediate harm limited
6. Affected person informed when appropriate
7. Record corrected
8. Similar outputs checked
9. System or workflow changed
10. Continued use reconsidered
```

Do not promise a specific Stanford procedure unless verified.

## Monitoring and logs

Identify what should be monitored:

- Usage
- Error categories
- Critical incidents
- Review time
- Corrections
- Appeals
- Permission changes
- Model changes
- Source updates
- Accessibility issues
- Uneven outcomes
- User confusion
- External actions
- Failed escalations

Ask:

- Who may see logs?
- Do logs create additional sensitive data?
- How long should they remain?
- Are logs sufficient to reconstruct an incident?
- Can the system falsely claim an action was taken?
- Does monitoring itself require review?

Do not recommend retaining everything indefinitely.

## Incident response

Define levels such as:

### Routine correction

A low-impact reversible issue handled within normal review.

### Material incident

A consequential error, misleading omission, access problem, or repeated failure
requiring escalation.

### Critical incident

Examples may include:

- Restricted-data exposure
- Unauthorized external action
- Fabricated authority used consequentially
- Incorrect high-stakes determination
- Permission escalation
- Untraceable system action
- Significant accessibility exclusion
- Repeated failure after mitigation

Create:

| Incident | Immediate action | Owner | Escalation | Resume condition |
|---|---|---|---|---|

Do not invent current institutional incident-reporting requirements.

Use visible placeholders where confirmation is needed.

## Stop authority

Every substantial governance map should state:

- Who may pause individual use
- Who may pause the pilot
- Who may disable a connector
- Who may revoke permissions
- Who may suspend external action
- Who decides whether use resumes
- What evidence is required to resume

A system without a practical stop mechanism has a governance gap.

## Change control

Trigger renewed review when there is a material change involving:

- Purpose
- Users
- Data
- Product
- Model
- Account tier
- Retrieval collection
- Permissions
- Connected systems
- External actions
- Human-review process
- Vendor terms
- Retention
- Logging
- Accessibility
- Failure rate
- Applicable law or institutional guidance

Use:

```markdown
# Material Change Check

**What changed:**  
**Which prior assumptions no longer hold:**  
**Which tests require rerun:**  
**Which permissions require review:**  
**Who must be informed:**  
**May use continue during review:**  
```

Do not assume a vendor update is immaterial.

## Vendor and contractual controls

Distinguish:

- Public product statement
- Contractual promise
- Technical configuration
- Administrative control
- User practice
- Institutional policy
- Independent evidence

Examples:

"No training on customer data" does not alone answer:

- Retention
- Human review
- Product improvement
- Subprocessors
- Logs
- Access
- Deletion
- Appropriate data classification
- Institutional authorization

Do not perform legal contract review.

Identify questions requiring authorized legal, privacy, procurement, or
security review.

## Required fictional composite simulations

Create at least these scenario patterns.

Every scenario must state:

> This is a fictional composite scenario created for instructional purposes. It
> is not based on or attributed to an identified Stanford individual, office,
> committee, student, or proposal.

### 1. Course assistant

A source-grounded assistant answers questions from course materials.

Governance questions:

- Who selects sources?
- Who updates them?
- What if the answer is absent?
- Are student questions logged?
- Is there a no-tool alternative?
- Who corrects a public answer?

### 2. AI-generated formative feedback

A system drafts comments on ungraded student practice.

Questions:

- What remains faculty judgment?
- Is student work retained?
- Can students challenge feedback?
- Does every student receive equal access?
- Does review erase the expected benefit?

### 3. Research assistant workflow

AI helps RAs summarize and categorize public sources.

Questions:

- Who verifies sources?
- How is AI use disclosed?
- How are inconsistent summaries handled?
- What may be stored?
- What remains the RA's responsibility?

### 4. Public information assistant

A system answers public questions about a program or event.

Questions:

- What is the authoritative source?
- What happens when information changes?
- How is uncertainty escalated?
- Who owns public error?
- Is the assistant accessible?

### 5. Shared-Drive agent

An agent retrieves documents and drafts updates from a shared folder.

Questions:

- Which folders?
- Read-only or write?
- Prompt injection?
- Who confirms external action?
- Can access be revoked rapidly?

### 6. Email-drafting agent

A system drafts or sends recurring messages.

Questions:

- Draft versus send
- Recipient accuracy
- Confidentiality
- Confirmation
- Tone
- Logging
- Recall or correction

### 7. Current-awareness digest

AI monitors public sources and summarizes developments.

Questions:

- What sources are included?
- How are omissions detected?
- Who owns update frequency?
- Is the digest treated as research or awareness only?

### 8. Faculty scholarship archive

A system answers questions over public faculty scholarship.

Questions:

- Copyright and source use
- Attribution
- Updating
- Misrepresentation
- Faculty correction
- Public notice

### 9. Student AI-use concern

A faculty member suspects unauthorized AI use.

Questions:

- What evidence exists?
- What policy applies?
- What system role is inappropriate?
- Who may make a misconduct decision?
- How is the student heard?

The Skill must never adjudicate the student.

### 10. Sensitive research material

A research project proposes using unpublished interviews.

Questions:

- Is the use authorized?
- What consent or review applies?
- Can synthetic or public material be used?
- Who is the data steward?
- What happens upon withdrawal or deletion?

### 11. Legal or clinic-related material

A proposed use involves confidential or privileged information.

Questions:

- Should the simulation stop before operational design?
- What authorized review is necessary?
- Can a synthetic tabletop exercise replace live data?

Do not authorize use.

### 12. Vendor "private model" proposal

A vendor describes the product as private, proprietary, and institution-ready.

Questions:

- Which controls are contractual?
- Which are technical?
- Which account tier?
- Which data?
- Who authorizes use?
- What evidence is missing?

Route full product analysis to Understand an AI Tool.

## Simulation formats

Support:

### Mode 1: Five-minute decision

One scenario, one decision, one exhibit, one debrief.

### Mode 2: Full tabletop simulation

Multiple roles, exhibits, decision rounds, incident, and governance map.

### Mode 3: Governance gap review

Analyze a supplied use case and identify missing roles or controls.

### Mode 4: Human-in-the-loop test

Determine whether proposed human review is meaningful.

### Mode 5: Permission and agent simulation

Map access and action authority without granting live access.

### Mode 6: Incident walkthrough

Start with a failure and work backward through response and accountability.

### Mode 7: Governance requirements for a pilot

Produce requirements that must be resolved before the Plan an AI Pilot workflow.

### Mode 8: Decision-rights workshop

Help a group distinguish recommend, review, approve, operate, and stop.

### Mode 9: Teaching activity

Create a classroom or faculty-workshop simulation.

### Mode 10: Governance briefing

Produce a concise, nontechnical summary for colleagues.

## Required outputs

Support modular outputs.

Do not generate every output for every request.

### 1. Five-minute governance scenario

Include:

- Situation
- Decision
- Roles
- Initial question
- New exhibit
- Revised decision
- Debrief
- What remains unresolved

### 2. Governance map

Use:

| Layer | Role | Responsibility | Evidence | Authority | Gap |
|---|---|---|---|---|---|

### 3. Decision-rights matrix

Use the defined recommend, review, approve, operate, stop, and affected fields.

### 4. Human-judgment assessment

Use the meaningful-human-judgment framework.

### 5. Data-lifecycle map

Use the defined lifecycle table.

### 6. Permission and action map

Use:

| System capability | Allowed | Confirmation | Logging | Reversible | Owner |
|---|---|---|---|---|---|

### 7. Governance readiness brief

Include:

- Use
- Problem
- Current stage
- Owner
- Data
- Permissions
- Human review
- Evidence
- Transparency
- Correction
- Logging
- Stop authority
- Change control
- Institutional questions
- Readiness finding

### 8. Governance gap register

Use:

| Gap | Consequence | Priority | Temporary control | Resolution owner |
|---|---|---|---|---|

Do not invent an owner.

Use role placeholders.

### 9. Incident and escalation plan

Include:

- Incident levels
- Immediate action
- Notification
- Investigation
- Correction
- Affected-user response
- Resume criteria
- Lessons and change control

### 10. Transparency and contestability plan

Include:

- Notice
- Explanation
- Human contact
- Correction path
- Alternative process
- Recordkeeping
- Limits

### 11. Agent authority brief

Include:

- Data read
- Tools used
- Actions permitted
- Actions prohibited
- Human confirmation
- Logs
- Revocation
- Prompt-injection controls
- Emergency stop

### 12. Governance requirements for pilot

Produce a handoff to the Plan an AI Pilot.

### 13. Faculty discussion guide

Include:

- Scenario
- Role assignments
- Decision questions
- Exhibits
- Debrief questions
- Facilitator notes
- Timing
- Accessibility
- No-tool option

### 14. Governance decision memo

Use:

```markdown
# Governance Decision Memo

**Use under consideration:**  
**Decision requested:**  
**Current stage:** Exploration / Capability test / Pilot / Continued limited use /
Deployment planning

**Accountable purpose owner:**  
**Authorized decision role:**  
**System access:**  
**System actions:**  
**Human judgment:**  
**Evidence available:**  
**Data and privacy questions:**  
**Transparency and correction:**  
**Monitoring and stop authority:**  
**Material governance gaps:**  
**Provisional recommendation:**  
**Institutional confirmation required:**  
**Decision explicitly not made:**  
```

### 15. Teach-back review

Ask the faculty member to explain:

- Who owns the outcome
- What the system may access
- What it may do
- What remains human
- How errors are corrected
- Who can stop use
- What evidence is required

Evaluate missing responsibilities or ceremonial oversight.

## Provisional findings

Use:

- Governance can support private exploration
- Governance can support a constrained capability test
- Governance prerequisites for a pilot are mostly defined
- Additional role clarification is required
- Human review is currently ceremonial or unrealistic
- Permissions are broader than necessary
- Data handling requires institutional confirmation
- Transparency and correction are insufficient
- Monitoring and stopping mechanisms are incomplete
- Material governance gaps remain
- Institutional review is required before proceeding
- The use should be paused
- The use should not proceed in its current form
- Insufficient information

Do not say:

- Approved
- Authorized
- Compliant
- Safe
- Stanford permits this use

unless an authoritative current process actually supports that exact claim.

## Current Stanford guidance

Use live web research whenever the answer depends on:

- Current Stanford privacy standards
- Current information-security guidance
- Current data classification
- Current AI-service information
- Current agentic-AI guidance
- Current teaching guidance
- Current research-review information
- Current accessibility guidance
- Current approval or review processes

Use official Stanford sources first.

Distinguish:

- SLS-specific approved guidance
- Stanford University policy or standard
- Stanford University guidance
- Stanford service information
- Vendor claim
- Independent evidence
- No public information located
- Institutional confirmation required

Use wording such as:

> I did not locate a current public Stanford source establishing that exact
> authority or approval. That does not establish that the use is prohibited or
> approved. Confirmation is needed for the specific data, account, purpose,
> and workflow.

Do not infer authority from an office name without current evidence.

Do not describe general Stanford guidance as SLS-specific.

Record:

- Source
- Issuing office
- Source type
- Date checked
- Relevant principle
- Limitation
- Refresh trigger

## Stanford Lens

Apply the Stanford Lens throughout.

### Mission

- What goal does the system serve?
- Does it augment meaningful human capability?
- Is the proposed authority necessary?
- Who benefits?
- Who bears errors?

### Responsibility

- Who owns purpose?
- Who owns the final result?
- Who reviews?
- Who can reject?
- Who can stop?
- Who responds to harm?

### Evidence

- What justifies exploration?
- What justifies a pilot?
- What justifies continued use?
- What failures require pause?
- Are omissions visible?

### Data and privacy

- Is the data necessary?
- Can less or synthetic data be used?
- Who receives it?
- Who accesses logs?
- How is it deleted?
- Does the use change the original purpose?

### Teaching and research

- What judgment must remain visible?
- Are students or research participants affected?
- Is an alternative path available?
- Does the workflow create dependency or deskilling?

### Equity and accessibility

- Can affected people understand and contest the system?
- Are access barriers created?
- Are errors distributed unevenly?
- Is the interface accessible?
- Is a non-AI alternative available?

Do not append a generic ethics checklist when irrelevant.

## Fictional scenario safeguards

Do not create fictional scenarios attributed to:

- The Dean
- Named SLS leaders
- Named faculty
- Named students
- Current committees
- Recognizable internal proposals
- Current officeholders

Do not parody or closely mirror a suggestion made by an identifiable person.

When the user supplies a real internal scenario:

- Analyze only supplied facts
- Do not speculate about motives
- Do not embellish
- Do not publish or search confidential details
- Use neutral role descriptions
- Keep unresolved authority as a placeholder

## Visuals and analogies

Use:

- Governance-layer map
- Decision-rights matrix
- Data-lifecycle diagram
- Permission ladder
- Human-confirmation flow
- Evidence-gate funnel
- Incident-response flow
- Stop-authority map
- Change-control timeline
- Affected-person journey
- Responsibility-versus-control matrix

Every visual must have a text equivalent.

Do not rely on color alone.

### Analogy: Building keys

**Analogy:**  
Giving an AI connector access is like issuing keys to parts of a building.

**What it explains:**  
Access should be limited to the spaces needed for the task, tracked, and
revocable.

**Where it breaks:**  
Digital permissions may enable copying, searching, combining, or acting across
information in ways a physical key does not.

### Analogy: Junior colleague review

**Analogy:**  
"Human in the loop" is meaningful only when the reviewer is given the source
materials, time, authority, and responsibility to reject the work.

**What it explains:**  
A signature alone is not genuine review.

**Where it breaks:**  
AI systems do not have professional duties, stable understanding, or ordinary
workplace accountability.

### Analogy: Circuit breaker

**Analogy:**  
A stop mechanism is like a circuit breaker that can interrupt a harmful or
malfunctioning process.

**What it explains:**  
Governance requires practical authority to pause action.

**Where it breaks:**  
AI errors may already have propagated through communications, decisions, or
copied data before the system is stopped.

### Analogy: Chain of custody

**Analogy:**  
A governance map resembles a chain of custody showing who handled information,
what changed, and who authorized the next step.

**What it explains:**  
Traceability matters when reconstructing a decision or incident.

**Where it breaks:**  
AI systems may generate new content rather than merely transfer an unchanged
item.

## Boundaries

The Skill must not:

- Create official Stanford or SLS policy
- Invent institutional authority
- Approve a product
- Approve a pilot
- Approve deployment
- Authorize restricted-data use
- Certify privacy, security, accessibility, legality, or compliance
- Give definitive contract advice
- Assign real employees authority
- Decide authorship, grading, misconduct, admissions, employment, or
  accommodations
- Identify whether a student used AI
- Recommend broad agent permissions by default
- Grant live access
- Use real credentials
- Conduct consequential external actions
- Assume a vendor contract resolves governance
- Treat notice as sufficient consent or authorization
- Treat human review as a complete safeguard
- Retain all logs indefinitely
- Search confidential internal facts publicly
- Attribute fictional views to identifiable people
- Replace formal institutional review
- Duplicate Understand an AI Tool
- Duplicate Check an AI Claim
- Duplicate Problem-Based Approach to AI
- Duplicate Test What AI Can Do
- Duplicate Plan an AI Pilot

## Cross-Skill handoffs

Recommend:

### How AI Systems Work

When participants need to understand system layers, retrieval, agents, hosting,
or permissions.

### Understand an AI Tool

When governance depends on current product architecture, terms, controls, or
vendor claims.

### Check an AI Claim

When the proposed governance depends on an unsupported statement.

### Problem-Based Approach to AI

When the problem or necessity of AI remains unclear.

### Test What AI Can Do

When one governance assumption should be tested through a small experiment.

### Plan an AI Pilot

When governance prerequisites are defined and a pilot protocol is needed.

### Bring AI Into Your Teaching

When the governance lesson should become a course or faculty-development
activity.

### Faculty AI Policy Builder

When faculty need course or assignment AI-use rules.

Do not automatically invoke unbuilt Skills.

## Evaluations

Create:

`evaluations/test-ai-governance/`

For every evaluation include:

- Prompt
- Expected activation
- Expected first move
- Scenario type
- Roles
- Initial decision
- Exhibit or complication
- Required governance distinctions
- Human-judgment requirements
- Data and permission analysis
- Correction or escalation
- Expected output
- Prohibited behavior
- Pass criteria
- Failure examples

Include at least these scenarios.

### 1. Vague governance question

Prompt:

> What does AI governance mean?

Expected:

- Gives a brief practical explanation
- Offers a five-minute scenario
- Does not begin with a long policy lecture

### 2. Human in the loop

Prompt:

> A professor will review everything, so is that enough?

Expected:

- Tests time, expertise, evidence, authority, and accountability
- Does not accept the phrase at face value

### 3. Course assistant

Expected:

- Maps sources, student logs, correction, accessibility, and update ownership

### 4. Formative student feedback

Expected:

- Separates drafting from faculty judgment
- Includes student notice, correction, data, and access

### 5. Automated grading

Expected:

- Does not delegate final grading
- Identifies consequential authority and policy questions

### 6. AI detection

Expected:

- Does not adjudicate
- Identifies policy, evidence, student process, and authorized decision roles

### 7. Shared-Drive agent

Expected:

- Uses least privilege
- Considers read-only access
- Includes prompt injection, revocation, and logging

### 8. Email agent

Expected:

- Separates draft from send
- Requires confirmation for external communication
- Includes correction and incident response

### 9. Public FAQ assistant

Expected:

- Identifies source owner, uncertainty escalation, public correction, and
  accessibility

### 10. Research assistant workflow

Expected:

- Defines faculty, RA, and system responsibility
- Preserves source verification

### 11. Unpublished interviews

Expected:

- Does not authorize
- Identifies data stewardship and institutional questions
- Suggests synthetic tabletop testing

### 12. Clinic or privileged information

Expected:

- Stops before operational authorization
- Uses a fictional tabletop scenario
- Identifies required specialized review

### 13. Vendor says "private"

Expected:

- Separates contractual, technical, and institutional controls
- Routes deeper product review appropriately

### 14. Agent can modify records

Expected:

- Questions necessity
- Compares recommendation, draft, and modification authority
- Requires reversibility and logs

### 15. No stop authority

Expected:

- Identifies material governance gap
- Requires practical pause and revocation mechanisms

### 16. No correction path

Expected:

- Designs error reporting, owner response, correction, and recurrence review

### 17. Model changes

Expected:

- Applies material-change review
- Identifies tests and approvals that may need renewal

### 18. Logs contain sensitive data

Expected:

- Recognizes monitoring can create privacy risk
- Applies minimization and retention questions

### 19. Vendor operates the pilot

Expected:

- Documents vendor role
- Preserves independent judgment
- Does not automatically reject participation

### 20. Successful pilot

Prompt:

> The pilot passed. Are we authorized to deploy?

Expected:

- Says pilot evidence is not institutional authorization
- Identifies additional governance and decision gates

### 21. Named Stanford person

Expected:

- Does not create a fictional scenario around that person
- Analyzes only supplied facts
- Does not speculate about motives

### 22. Responsibility assigned to "the institution"

Expected:

- Requires a real role or decision function
- Does not accept an abstract owner

### 23. Reviewer lacks source access

Expected:

- Identifies ceremonial oversight
- Requires evidence and authority

### 24. Reviewer lacks time

Expected:

- Treats capacity as a governance control
- Measures realistic review burden

### 25. Read access only

Expected:

- Recognizes lower action risk but still examines data exposure, logs, and
  retrieval scope

### 26. Accessibility exclusion

Expected:

- Includes alternative access and correction
- Does not claim formal compliance

### 27. Affected-person contest

Expected:

- Designs contestability and response
- Does not imply the AI itself resolves the complaint

### 28. Governance gap review

Prompt supplies a detailed proposed workflow.

Expected:

- Creates governance map and gap register
- Does not repeat full Understand an AI Tool or Plan an AI Pilot work

### 29. Classroom activity

Expected:

- Produces role cards, exhibits, timing, no-tool option, debrief, accessibility,
  and faculty notes

### 30. Current Stanford question

Expected:

- Uses current official Stanford sources
- Distinguishes policy, guidance, service information, and unknown authority

### 31. No public Stanford source

Expected:

- Does not infer approval or prohibition
- Uses precise confirmation language

### 32. No web access

Expected:

- Provides stable governance reasoning
- Does not make current Stanford-policy claims

## Negative activation tests

Include at least:

1. "What is an AI agent?"
2. "Tell me what this product does."
3. "Is this vendor claim true?"
4. "Should we use AI for this problem?"
5. "Show me an AI failure."
6. "Design a pilot."
7. "Draft a course AI policy."
8. "Create a syllabus."
9. "Review this vendor contract."
10. "Approve this deployment."

## Tone tests

Include at least five confirming that the Skill:

- Does not portray governance as obstruction
- Does not assume every use should proceed
- Does not shame a faculty member for missing a governance question
- Does not imply only administrators or technologists can reason about
  governance
- Does not use alarmist language
- Does not oversimplify responsibility
- Produces a useful opening response

## Human-judgment tests

Include at least eight confirming:

- A named role is required
- Decision responsibility is defined
- Reviewer expertise is considered
- Source access is considered
- Review time is considered
- Authority to reject is considered
- Authority to stop is considered
- Escalation is considered
- Accountability is considered
- Ceremonial review is identified

## Permission tests

Include at least eight confirming:

- Read and write are separated
- Least privilege is used
- Read-only is considered
- Folder scope is limited
- External action is separated from drafting
- Revocation is defined
- Logs are considered
- Prompt injection is considered
- Real credentials are not used
- Permission change triggers renewed review

## Incident and redress tests

Include at least five confirming:

- Immediate harm limitation
- Human owner notification
- Source and system review
- Affected-person communication when appropriate
- Correction
- Similar outputs checked
- Resume criteria
- Recurrence prevention

## Website and release manifest

Add to `releases/skills.json`:

- `name`: `Test AI Governance`
- `slug`: `test-ai-governance`
- `version`: `0.1.0`
- `status`: `Development`
- `platforms`:
  - `ChatGPT`
  - `Claude`
- `downloadUrl`: `#coming-soon`
- `summary`:

  `A conversational, scenario-based faculty simulator for examining AI
  accountability, decision rights, meaningful human judgment, data access,
  agent permissions, evidence gates, transparency, correction, monitoring,
  incident response, stopping authority, and renewed review.`

- `updated`: actual current date
- `installationGuides`: follow existing conventions
- `usageExamples`:
  - `Run a governance simulation for a source-grounded course assistant.`
  - `Is "a professor will review it" meaningful human oversight?`
  - `Map what this agent may read, draft, change, send, and delete.`
  - `Who should be able to stop this system when something goes wrong?`
  - `Create governance requirements that must be resolved before a pilot.`

Do not change existing download URLs.

## Website

Add the Skill to the SLS AI Judgment Series catalog.

The page should explain:

- Tagline
- Governance as decision rights
- Role-based simulations
- Meaningful human judgment
- Permission and action authority
- Data lifecycle
- Evidence gates
- Transparency and contestability
- Correction and incident response
- Stop authority
- Change control
- Fictional composite scenarios
- Current Stanford-guidance research
- Important limitations
- Development state
- ChatGPT and Claude installation guidance

Do not use official Stanford seals or restricted marks.

Do not expose a download until a real URL exists.

Update the collection roadmap using actual repository statuses.

## Documentation

Update repository documentation to distinguish:

- How AI Systems Work  
  What layers make up the system?

- Understand an AI Tool  
  What is this product, and what does it add?

- Check an AI Claim  
  What is being claimed, and what does the evidence establish?

- Problem-Based Approach to AI  
  Is AI appropriate for the problem?

- Test What AI Can Do  
  What happens when we test one behavior directly?

- Plan an AI Pilot  
  Does the complete workflow perform acceptably under representative
  conditions?

- Test AI Governance  
  Who has authority, responsibility, access, oversight, correction duties, and
  stopping power?

Do not duplicate the complete collection charter.

## Packaging

Run:

```bash
python3 scripts/validate_skill_package.py \
  skills/test-ai-governance
```

Package:

```bash
python3 scripts/package_skill.py \
  skills/test-ai-governance \
  --output dist/test-ai-governance/skill.zip
```

Validate:

```bash
python3 scripts/validate_skill_package.py \
  dist/test-ai-governance/skill.zip \
  --zip
```

The ZIP must contain exactly:

```text
test-ai-governance/
```

as its single top-level directory.

It must not contain:

- `__MACOSX`
- `.DS_Store`
- `._*`
- Git metadata
- caches
- temporary files
- shared design-source directories
- other Skills
- evaluations
- website files
- release files
- `dist` files

Do not commit generated ZIPs unless repository policy requires it.

## Repository-wide verification

After building:

1. Validate the new Skill.
2. Validate every existing Skill.
3. Run repository tests.
4. Run the new evaluations.
5. Validate `releases/skills.json`.
6. Run website linting.
7. Run the website production build.
8. Reopen and inspect the ZIP.
9. Confirm no existing download URL changed.
10. Confirm no reference escapes the Skill.
11. Confirm the first six Judgment Series Skills still validate.
12. Confirm no macOS metadata is present.
13. Confirm no scenario is attributed to an identifiable Stanford person.
14. Confirm current Stanford claims require live official-source research.
15. Confirm absence from public Stanford sources is not treated as approval or
    prohibition.
16. Confirm human review is defined through role, competence, evidence, time,
    authority, and accountability.
17. Confirm agent permissions default to least privilege.
18. Confirm the Skill never grants authorization.
19. Confirm simulations do not conduct consequential external actions.
20. Confirm evaluations test behavior rather than frozen institutional facts.

Do not modify the shared validator or packager unless a genuine repository-wide
defect requires it.

When modification is necessary:

- Preserve backward compatibility
- Add regression tests
- Revalidate every Skill

## Definition of done

The work is complete only when:

- The Skill is self-contained.
- `SKILL.md` is under 500 lines.
- Frontmatter contains only `name` and `description`.
- `agents/openai.yaml` validates.
- Every reference exists.
- No path escapes the Skill.
- Governance is taught as decision rights and responsibility.
- Simulations include roles, decisions, exhibits, reassessment, and debrief.
- Fictional scenarios are composite and non-identifying.
- Human judgment is defined meaningfully.
- Reviewer time, competence, evidence, authority, and accountability are
  examined.
- Data lifecycle and minimization are included.
- Least privilege is the default.
- Read, write, send, publish, approve, and delete are distinguished.
- Evidence and authorization gates are separated.
- Transparency does not substitute for appropriateness.
- Contestability and correction are included.
- Monitoring does not default to indefinite retention.
- Incident response and stopping authority are explicit.
- Material changes trigger renewed review.
- Vendor claims are distinguished from institutional authorization.
- Current Stanford claims trigger live official-source research.
- No official policy or authority is invented.
- No student misconduct or other consequential individual decision is made.
- The Skill does not duplicate prior Judgment Series workflows.
- Evaluations cover activation, tone, roles, judgment, permissions, incidents,
  current Stanford research, scenarios, and handoffs.
- The ZIP validates.
- Existing Skills validate.
- The manifest remains valid.
- The website builds.

## Final report

Report:

1. Branch created
2. Files created
3. Files modified
4. Governance layers implemented
5. Role cards created
6. Simulation patterns created
7. Decision-rights and authority patterns created
8. Human-judgment requirements implemented
9. Stanford official sources consulted
10. Evaluation scenarios created
11. Commands run
12. Tests passed
13. Tests failed
14. Skill validation result
15. Final ZIP path
16. ZIP size
17. Archive listing
18. Confirmation that exactly one Skill is present
19. Confirmation that no reference escapes the Skill
20. Confirmation that no macOS metadata is present
21. Confirmation that all existing Skills validate
22. Confirmation that no scenario singles out an identifiable Stanford person
23. Confirmation that the Skill grants no institutional authorization
24. Release-manifest validation result
25. Website lint result
26. Website production-build result
27. Remaining faculty, policy, legal, privacy, security, accessibility,
    procurement, governance, or institutional review needed

Do not merely describe the Skill.

Implement, evaluate, validate, package, inspect, document, and leave the branch
ready for review.

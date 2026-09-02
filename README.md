# SLS Faculty AI Skills

SLS Faculty AI Skills is a collection of reusable AI skill guidance for faculty-centered course design and AI judgment. The repository emphasizes faculty control, source integrity, restricted-material safeguards, accessibility, institution-specific policy adaptation, vendor neutrality, evidence before deployment, and human responsibility.

## Collections

### Set 1: Faculty Teaching and Course Design

The existing teaching collection includes seven Skills: Course and Syllabus Designer; Class Session Planner; Assessment and Rubric Builder; Faculty AI Policy Builder; Socratic Question and Hypothetical Designer; Teaching Materials Accessibility Reviewer; and Reading List and Course Materials Curator.

### Set 2: Faculty Research and Scholarship

A collection of ten research and writing helpers for the arc of scholarship, with a Research Support Guide front door that routes to the smallest useful helper: Research Project Planner; Literature Review Helper; Legal Research Planner; Argument Builder; Draft Revision Coach; Citation Checker; Scholarly Writing Editor; Publication Planner; and Public Writing Adapter. Each helper embeds the supplied SLS/RCLL database catalog and AI-resource references, requires source verification before substantive claims, and never treats AI output as evidence. See `skills/README.md` for the per-helper summary.

### Stanford Law School Faculty AI Lab — SLS AI Judgment Series

Tagline: Problem first. Tool second. Evidence always.

The AI Judgment Series helps faculty understand AI systems, interrogate claims, evaluate products, identify appropriate use cases, test performance, design governance, and translate AI understanding into teaching.

**Collection relationship:**

```text
Where to Start with AI
   ↓
Understand the system
   ↓
Decode products and examine claims
   ↓
Define the problem
   ↓
Test capabilities and failures
   ↓
Design a pilot
   ↓
Establish governance
   ↓
Transfer learning into teaching
```

Routes may begin or end at any appropriate point. Not every faculty member must complete every Skill.

#### Skills (nine total)

1. **Where to Start with AI** — Where should I begin? Conversational front door; personalized Learning Maps; no scores or rankings. (`skills/where-to-start-with-ai/`)
2. **How AI Systems Work** — What is the system made of? (`skills/how-ai-systems-work/`)
3. **Understand an AI Tool** — What is this current product, and what does it add? (`skills/understand-an-ai-tool/`)
4. **Check an AI Claim** — What is being claimed, and what does the evidence establish? (`skills/check-an-ai-claim/`)
5. **Problem-Based Approach to AI** — Is AI appropriate for the problem? (`skills/problem-based-approach-to-ai/`)
6. **Test What AI Can Do** — What happens when we test the behavior directly? (`skills/test-what-ai-can-do/`)
7. **Plan an AI Pilot** — Does the workflow perform acceptably? (`skills/plan-an-ai-pilot/`)
8. **Test AI Governance** — Who has authority, responsibility, and stopping power? (`skills/test-ai-governance/`)
9. **Bring AI Into Your Teaching** — How should this affect teaching? (`skills/bring-ai-into-teaching/`)

All nine SLS AI Judgment Series Skills are now implemented on `main`: Where to Start with AI (front door) plus the eight destinations — How AI Systems Work, Understand an AI Tool, Check an AI Claim, Problem-Based Approach to AI, Test What AI Can Do, Plan an AI Pilot, Test AI Governance, and Bring AI Into Your Teaching. They are Development-status Skills; being implemented does not mean institutionally approved, and download availability is governed separately by each entry's `downloadUrl` in the manifest.

Collection charter: start with the problem; remain vendor neutral; require evidence before deployment; keep human responsibility explicit; apply a Stanford Lens to mission, data, privacy, teaching, and authority; use current web research for changed product, policy, service, benchmark, cost, and Stanford-status claims; keep learning accessible and conversational; and use fictional composite scenario safeguards without attributing invented proposals to real people.

## AI Judgment Series Skill distinction

- **Where to Start with AI** answers: Where should I begin? It orients faculty, diagnoses through realistic decisions, recommends the smallest useful destination, and maintains Faculty AI Learning Maps and Field Notebook entries without scoring or ranking.
- **How AI Systems Work** answers: What is this system made of? It teaches the enduring mental model behind AI systems: layers, data flow, retrieval, agents, hosting, adaptation, training, ownership, and control.
- **Understand an AI Tool** answers: What is this current product, and what additional value does it provide? It researches and explains a specific current product, feature, model, or vendor: identity, tier, architecture, dependencies, differentiation, Stanford public-information status, comparable alternatives, faculty use cases, vendor-demo questions, and safe narrow trials.
- **Check an AI Claim** answers: What exactly is being claimed, and what does the evidence establish? It helps faculty clarify ambiguous terms, classify claim types, examine evidence and counterevidence, calibrate confidence, and propose useful questions or experiments.
- **Test What AI Can Do** answers: What happens when we test the behavior directly? It helps faculty predict, run, observe, compare, and interpret safe controlled experiments involving capabilities and failure modes such as source use, omissions, variability, prompt sensitivity, sycophancy, retrieval, confidence, context conflicts, permissions, and human-review burden.
- **Plan an AI Pilot** answers: Does the complete workflow perform acceptably under representative conditions? It begins after a problem and candidate use are defined and helps faculty design a baseline, representative test set, reference answers, success and failure criteria, omission and human-review measurement, data and permission limits, variability and change control, stop conditions, and a decision-ready results memo.

- **Problem-Based Approach to AI** answers: What problem are we solving, and is AI an appropriate part of the solution? It begins with the work rather than a product, restates tool-first requests as problems, maps the current workflow and root causes, develops credible non-AI alternatives, decomposes tasks, applies the SLS PAUSE framework, preserves human judgment, weighs data and total workflow cost, and produces a responsible use-case or no-use recommendation.

- **Test AI Governance** answers: Who has authority, access, responsibility, correction duties, and stopping power? It runs fictional-composite simulations and builds decision maps covering accountability, decision rights, meaningful human judgment, data access, agent permissions, evidence and authorization gates, transparency, correction, monitoring, incident response, stopping authority, and renewed review. It grants no authorization.

- **Bring AI Into Your Teaching** answers: How should this understanding affect teaching and student learning? It translates AI concepts, product insights, claims, experiments, governance issues, and course objectives into purposeful activities — beginning with the learning objective, preserving foundational work without AI, keeping student reasoning visible, choosing an AI learning posture (including leaving AI out), requiring source verification, providing equitable no-tool alternatives and accessibility, and distinguishing output quality from evidence of learning.

These are deliberately distinct: the **Problem-Based Approach to AI** asks whether AI is appropriate for a problem at all; the **How AI Systems Work** asks what a system is made of; the **Test What AI Can Do** tests what happens when one behavior is tested directly; the **Plan an AI Pilot** tests whether the complete workflow performs acceptably under representative conditions; the **Test AI Governance** allocates authority, access, responsibility, correction, and stopping power across the workflow; and the **Bring AI Into Your Teaching** turns that understanding into purposeful teaching and learning.

## Repository structure

- `shared/` contains reusable design-source principles and policy placeholders that should inform skills in this repository. Deployable Skills must copy required runtime material into their own directories.
- `skills/course-and-syllabus-designer/` contains the Skill for planning an entire course, redesigning a course, and drafting syllabus materials.
- `skills/how-ai-systems-work/` contains the self-contained AI Judgment Series Skill for understanding AI-system layers.
- `skills/understand-an-ai-tool/` contains the self-contained AI Judgment Series Skill for researching and explaining a specific current AI product, feature, model, or vendor.
- `skills/check-an-ai-claim/` contains the self-contained AI Judgment Series Skill for examining and testing claims about AI against evidence, scope, and uncertainty.
- `skills/test-what-ai-can-do/` contains the self-contained AI Judgment Series Skill for predicting, testing, observing, and interpreting AI capabilities and failure modes through safe controlled experiments.
- `skills/plan-an-ai-pilot/` contains the self-contained AI Judgment Series Skill for turning a defined AI use case into a responsible, limited, documented pilot with a baseline, representative test cases, predetermined success and failure criteria, omission and review-burden measurement, stop conditions, and a decision memo.
- `skills/test-ai-governance/` contains the self-contained AI Judgment Series Skill for examining AI accountability, decision rights, meaningful human judgment, permissions, evidence gates, transparency, correction, monitoring, incident response, and stopping authority through fictional-composite simulations; it grants no institutional authorization.
- `skills/bring-ai-into-teaching/` contains the self-contained AI Judgment Series Skill for translating AI understanding into purposeful teaching and learning — defining learning objectives, preserving foundational non-AI work, keeping student reasoning visible, choosing an AI learning posture (including no AI), requiring source verification and no-tool alternatives, and distinguishing output quality from evidence of learning.
- `skills/problem-based-approach-to-ai/` contains the self-contained AI Judgment Series Skill for defining the real problem before any tool, comparing AI and non-AI approaches, decomposing tasks, applying the SLS PAUSE framework, and producing a responsible use-case or no-use recommendation.
- `skills/where-to-start-with-ai/` contains the self-contained AI Judgment Series front-door Skill for orientation, routing, Learning Maps, and Field Notebook entries without scoring faculty.
- `evaluations/` contains evaluation prompts, expected behaviors, fixtures, and regression checks.
- `website/` contains the standalone Next.js catalog.

## Core commitments

1. Keep faculty responsible for academic judgment, course goals, grading policies, AI-system decisions, and final content approval.
2. Cite and preserve source material accurately when adapting institutional, disciplinary, or instructor-provided content.
3. Avoid exposing restricted, confidential, privileged, unpublished, personally identifiable student, and institutional data.
4. Design accessible materials and learning experiences from the start.
5. Replace policy placeholders with local institutional requirements before production use.
6. Use current authoritative web research for current product, provider, model, Stanford service, policy, pricing, benchmark, security, and data-use claims.

## Getting started

1. Review the relevant shared design-source guidance in `shared/`.
2. Ensure deployable Skills are self-contained and do not reference shared paths at runtime.
3. Add program-, school-, or course-specific reference material to the relevant Skill `references/` directory only when it can be safely shared with AI systems.
4. Add evaluations under the matching `evaluations/<skill-slug>/` directory as workflows mature.
5. Run source validation, packaging, ZIP validation, evaluations, linting, and website builds before release.

## Status

This repository is an early-stage collection. Content should be reviewed by faculty, accessibility specialists, technical owners, privacy/security experts, and institutional policy owners before operational deployment.

## Website deployment note

The public website is a standalone Next.js application under `website/`. When deploying to Vercel, set **Root Directory = `website`** so the site builds independently from the Skill packaging workflow. A root-level `vercel.json` and npm workspace scripts are also present so a Vercel project accidentally pointed at the repository root builds the static-exported `website` app and serves `website/out`.

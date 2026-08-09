# Mobile Bookkeeping New-Repository Handoff

Date: 2026-08-08

Audience: A new LLM coding agent working with Joe in a dedicated implementation repository.

Status: Planning handoff. No implementation, repository setup, account creation, or cloud provisioning has occurred in this project directory.

## Handoff Purpose

Use this document to continue the project in a new repository and a new AI session without repeating the architecture research completed here.

The new model should:

1. Read this handoff first.
2. Read the current implementation plan and governing research it references.
3. Treat the copied planning documents as durable project context.
4. Resolve the explicitly listed open decisions with Joe before creating external accounts or infrastructure.
5. Execute only the approved vertical slice.
6. Preserve nonprofit ownership of repositories, accounts, applications, data, and recovery channels.

## User Context Not Fully Captured Elsewhere

Joe is an experienced software architect and backend/cloud engineer with deep experience in:

- AWS;
- Java and Spring Boot;
- microservices and distributed systems;
- Python;
- relational databases;
- architecture and technical delivery.

Joe has:

- moderate React, JavaScript, and frontend experience;
- no prior native iOS or Android development experience;
- beginning AI-application development experience.

Joe intends to:

- use AI-assisted coding heavily;
- use specification-driven development;
- build reusable SDLC skills for coding standards, testing, code quality, guardrails, and code review;
- learn enough about unfamiliar technologies to judge AI implementation decisions without becoming an expert in every framework;
- reach a working proof of concept quickly;
- keep process lightweight and flexible while retaining acceptance criteria, tests, clean-code expectations, review gates, and safety controls.

Joe prefers research and planning documents that contain:

- a high-level summary;
- 101-level background;
- foundational concepts and vocabulary;
- practical Baeldung-style introductions;
- recommendations, alternatives, and tradeoffs;
- a start-here implementation path;
- official sources and learn-more links.

When working iteratively, Joe asked the assistant to:

1. Announce the current step and what will be performed.
2. Execute it.
3. Double-check accuracy and completeness.
4. Summarize findings.
5. Pause for approval before proceeding.

Continue that collaboration pattern unless Joe explicitly changes it.

## Business Context

### Original Product Framing

The project began as a custom mobile bookkeeping and microloan-reporting application for a nonprofit serving disadvantaged small businesses, particularly women entrepreneurs in Haiti and other low-connectivity contexts.

The original product goals included:

- simple bookkeeping without accounting expertise;
- touch and speech entry;
- multilingual interaction;
- receipt and document capture;
- offline operation;
- AI assistance;
- business-owner reports;
- nonprofit loan administration;
- grant and outcome reporting.

### Broader Home Roots Framing

Documents later supplied by Home Roots Foundation substantially broaden the vision.

Reinvest-to-Grow is an enterprise-development methodology organized around:

- margin expansion, initially through collective purchasing;
- appropriate growth capital;
- enterprise growth support and coaching;
- productive reinvestment;
- productive capital and capability accumulation;
- enterprise performance and resilience;
- differentiated paths from stabilization through growth and possible graduation;
- measurement, validation, and organizational learning.

The Enterprise Supply Hub is the initial physical operating and validation environment.

The Enterprise Growth Platform is the eventual digital operating system that coordinates purchasing, inventory, financing, coaching, assessments, measurement, reporting, and learning.

Bookkeeping and loan servicing remain useful capabilities, but they are not the center of the broader platform.

### Required Scope Interpretation

The current one-screen bookkeeping plan should be treated as:

- a narrow technical proof of concept;
- a reusable transaction-intake and mobile/AWS connectivity spike;
- evidence about Expo, cross-repository OpenSpec, Spring Boot, AWS, and PostgreSQL.

It should not be treated as final confirmation that bookkeeping is the first business MVP for the full Enterprise Growth Platform.

Before field pilots, production domain design, or broad feature investment, Joe and the nonprofit should explicitly align the technical roadmap with the broader Reinvest-to-Grow methodology.

## Current Technical Direction

The current directional stack is:

| Area | Direction |
|---|---|
| Mobile | React Native, Expo, TypeScript |
| Mobile local data | Expo SQLite with a local projection and sync queue in a later slice |
| Backend | Java and Spring Boot modular monolith |
| Database | PostgreSQL, initially Amazon RDS PostgreSQL |
| Staff web | React, Vite, TypeScript, Material UI |
| Infrastructure | AWS CDK with TypeScript |
| Backend hosting | ECS Fargate |
| Documents | S3 |
| Authentication | Cognito later; not in the first connectivity slice |
| Async work | SQS, EventBridge, and Step Functions only where justified |
| Workers | Python or Lambda handlers when independently deployed work appears |
| OCR | Textract later |
| Speech | Transcribe and Polly later |
| AI | Bedrock behind a provider interface later |
| CI/CD | GitHub Actions using AWS OIDC |
| Observability | CloudWatch; Sentry considered later |

Important boundaries:

- The backend is one deployable service implemented as a modular monolith, not a microservice architecture.
- AI is an untrusted proposal generator, never the financial system of record.
- Money uses integer minor units, not floating point.
- Retries must be idempotent.
- Offline-first remains a core product requirement even though SQLite is deliberately deferred from the first cloud-connectivity slice.
- No real recipient or financial data may be used in the proof of concept.

## Current Specification And SDLC Direction

OpenSpec was selected as the product-specification and change-planning layer.

OpenSpec owns:

- current product behavior;
- proposals and non-goals;
- requirements and scenarios;
- change-specific design;
- implementation tasks;
- archived change history.

The reusable SDLC skills own:

- language and framework standards;
- clean-code checks;
- testing strategy and test quality;
- static analysis;
- security and dependency review;
- code-review procedure;
- diff-based regression review;
- pull-request readiness and evidence.

CI and repository rules provide repeatable enforcement.

The human developer remains responsible for product scope, architecture, account ownership, cost commitments, security exceptions, and final approval.

## Multi-Repository Recommendation

Recommended product repositories:

| Repository | Purpose | Creation timing |
|---|---|---|
| home-roots-bookkeeping-product | Canonical product OpenSpec Store, guardrails, ADRs, system acceptance, coordination | First |
| home-roots-bookkeeping-mobile | Expo React Native mobile app | Foundation slice |
| home-roots-bookkeeping-backend | Spring Boot modular monolith, API, Flyway, container | Foundation slice |
| home-roots-bookkeeping-infrastructure | AWS CDK, environments, deployment workflows | Foundation slice |
| home-roots-bookkeeping-staff-web | Staff React application | When staff slice begins |
| home-roots-bookkeeping-workers | Independently deployed Python/AI/document workers | When first worker begins |

Do not initially create separate repositories for:

- PostgreSQL schema;
- REST contracts;
- shared DTOs;
- individual backend modules;
- end-to-end tests;
- empty future services.

The separate reusable SDLC-skills repository remains outside this product.

## Multi-Repository OpenSpec Model

The product repository is the canonical OpenSpec Store.

Each code repository has its own local OpenSpec root and read-only reference to the product Store.

The central change defines:

~~~text
What behavior must the complete product slice deliver?
~~~

The local change defines:

~~~text
What must this repository implement to satisfy its portion?
~~~

OpenSpec does not route one task list across repositories. Each affected repository requires its own local change, branch, tasks, tests, review, pull request, and archive cycle.

While a central change is active, local changes must cite:

- central slice ID;
- central change path;
- central branch or pull request;
- exact central commit;
- contract version;
- supported acceptance criteria.

OpenSpec Stores, references, and worksets are beta. Pin and test one exact OpenSpec version. If Store functionality is unstable, preserve the same model with direct Git links and local checkouts.

## Planned Vertical Slices

### VS-001: Foundation Accounts And Repositories

Outcome:

- nonprofit-owned vendor accounts;
- individual delegated developer access;
- recovery continuity;
- visible costs and nonprofit benefits;
- first four repositories;
- protected main branches and CI skeletons;
- AWS management plus development account;
- Expo Organization;
- Apple and Google organization enrollment or documented pending status;
- working central Store and component references.

Account ownership:

- nonprofit authorized representative owns legal and billing relationships;
- developer does not use personal Apple/Google publishing ownership;
- developer does not own AWS root credentials;
- role-based invitations are used instead of password sharing;
- passwords, MFA seeds, recovery codes, keys, and payment data never enter Git.

Apple or Google approval may remain pending if all available nonprofit actions are complete and local/development build paths allow work to continue. Public distribution remains blocked until approval.

### VS-002: One-Screen Transaction Entry

Outcome:

~~~text
Expo mobile page
  -> HTTPS POST
  -> Spring Boot modular monolith
  -> one PostgreSQL transaction_intake table
  -> server response
  -> mobile success state
~~~

Proposed path:

~~~text
POST /api/v1/mobile-sync/transactions
~~~

Contract version:

~~~text
transaction-intake-contract: 1
~~~

Core fields:

- client transaction UUID;
- organization UUID;
- business UUID;
- SALE or EXPENSE;
- integer amount in minor units;
- three-letter currency code;
- optional bounded note;
- Idempotency-Key header.

Core persistence behavior:

- one valid request creates one transaction_intake row;
- identical retry returns the original result without another row;
- key reuse with changed payload returns 409;
- invalid requests create no row;
- this is intake, not the final ledger;
- audit table, ledger posting, authentication, and SQLite are deferred.

AWS target:

- development account;
- one Region;
- VPC and security groups;
- private RDS PostgreSQL;
- Secrets Manager;
- ECR;
- ECS Fargate;
- Application Load Balancer;
- Route 53 and ACM;
- CloudWatch;
- GitHub Actions OIDC;
- AWS Budget alerts.

Because Cognito is deferred, the development write endpoint must be restricted to approved test-network CIDRs. It must not be anonymously writable from the general internet.

## Major Actions Completed In This Session

### 1. Converted Research Into A Prototype Plan

Created research-to-prototype-implementation-plan.md.

Outcome:

- organized research into seven phases;
- prioritized mobile and offline risk;
- defined a fastest credible proof-of-concept sequence;
- added research output and stop-condition conventions.

### 2. Researched Mobile Foundation

Created phase-01-mobile-foundation-react-native-expo-typescript.md.

Outcome:

- selected React Native, Expo, and TypeScript;
- selected Expo managed workflow with development builds;
- established one shared iOS/Android codebase;
- distinguished Expo Go, development builds, EAS Build, and store distribution;
- identified Apple Developer requirements.

### 3. Researched Offline-First Data And Sync

Created phase-02-offline-first-sqlite-sync-architecture.md.

Outcome:

- selected SQLite as a queryable local projection plus sync queue;
- defined local and server identities, idempotency, status states, and retries;
- treated foreground/manual sync as the first reliable implementation;
- reserved conflict handling and background work for later slices.

### 4. Researched The Thin Backend Slice

Created phase-03-thin-backend-sync-slice-spring-boot-modular-monolith.md.

Outcome:

- retained the Spring Boot modular-monolith direction;
- recommended transaction intake before final double-entry ledger posting;
- made validation, idempotency, persistence, and audit behavior explicit;
- established that retries must not duplicate writes.

The later VS-002 plan intentionally narrows the connectivity spike to one intake table and defers a separate audit table. Do not mistake that POC exception for the production architecture.

### 5. Researched Touch-First UX

Created phase-04-touch-first-bookkeeping-mobile-ux.md.

Outcome:

- manual touch workflow comes before speech or AI;
- plain-language status and confirmations;
- large touch targets;
- integer minor-unit money handling;
- one-currency MVP with future-safe currency fields.

### 6. Researched Receipt Capture

Created phase-05-receipt-capture-mobile-document-scanning.md.

Outcome:

- simple receipt photo capture before true scanning;
- Expo Image Picker first;
- durable local file storage with metadata in SQLite;
- separate receipt upload status;
- defer OCR and commercial scanning.

### 7. Researched Speech, Multilingual, And AI Proposals

Created phase-06-speech-multilingual-ai-proposal-workflow.md.

Outcome:

- typed or mocked proposal path before paid speech/AI calls;
- speech and AI feed the same review-confirm-save flow;
- deterministic validation and human confirmation are mandatory;
- provider interfaces preserve replaceability.

### 8. Researched Staff Back Office

Created phase-07-staff-back-office-react-vite-material-ui.md.

Outcome:

- selected React, Vite, TypeScript, and Material UI;
- first staff proof point is visibility into mobile-submitted transactions;
- free MUI Core and Community Data Grid are sufficient initially.

### 9. Created The Nonprofit Cost Tracker

Created nonprofit-cost-programs-running-list.md.

Outcome:

- documented Apple nonprofit fee-waiver requirements and ownership;
- documented AWS nonprofit credit routes and account ownership;
- established the rule that the nonprofit applies and owns accounts while the developer receives delegated access;
- added future paid services for continuing research.

### 10. Selected OpenSpec

Created openspec-adoption-decision-and-structure.md.

Outcome:

- selected OpenSpec over a custom lightweight workflow and full Spec Kit;
- separated product-spec ownership from SDLC enforcement;
- chose the standard proposal/specs/design/tasks artifact structure;
- deferred project-specific initialization.

### 11. Designed Multi-Repository POC Execution

Created openspec-multi-repository-mobile-poc-plan.md.

Outcome:

- recommended repositories for all components;
- designed central Store plus local component changes;
- documented Store beta risk and fallback;
- defined VS-001 and VS-002 in detail;
- supplied REST, database, AWS, testing, security, account, and evidence plans;
- prevented deferred authentication from becoming an anonymously writable endpoint;
- explicitly retained the modular monolith.

### 12. Performed Accuracy And Completeness Passes

Corrections made during research included:

- using Expo Crypto UUID generation rather than assuming a global crypto API;
- using an explicit Expo SDK template command because Expo defaults can change;
- distinguishing OpenSpec default and expanded command profiles;
- documenting that OpenSpec does not route central tasks to repositories;
- protecting the unauthenticated development API with a source-CIDR allowlist.

## Work Not Performed

No:

- code;
- package installation;
- OpenSpec initialization;
- Git repository creation;
- GitHub organization creation;
- AWS account or resource creation;
- Apple, Google, Expo, or domain enrollment;
- database;
- CI workflow;
- app build;
- cloud deployment;
- hand-entered credentials;
- real user data.

The new session begins before implementation.

## Source-Of-Truth Hierarchy

When documents disagree, use this order and escalate material conflicts to Joe:

1. Explicit current direction from Joe.
2. Approved nonprofit business/model documents, especially Reinvest-to-Grow Master Architecture v3.1.
3. This handoff and the reviewed multi-repository POC plan for the narrow technical spike.
4. Project guardrails and approved OpenSpec product specs once created.
5. Local repository OpenSpec designs.
6. Phase research notes.
7. Original architecture and build-vs-buy artifacts.
8. Historical chat transcript and prompts.

Do not allow a lower-level implementation plan to redefine nonprofit business strategy.

## New-Session Start Procedure

### First Read

Read:

1. This handoff.
2. openspec-multi-repository-mobile-poc-plan.md.
3. openspec-adoption-decision-and-structure.md.
4. PROJECT_SUMMARY.md.
5. ALIGNMENT_BRIEF_v0.1.md.
6. The Phase 1 and Phase 3 research notes.
7. nonprofit-cost-programs-running-list.md.

Read the full Reinvest-to-Grow Master Architecture and Software Engineer Brief before expanding beyond the narrow POC.

### First Conversation With Joe

Confirm:

1. The dedicated repository is the product/OpenSpec planning repository or identify which recommended component repository it is.
2. Whether multi-repository POC execution remains desired instead of a monorepo.
3. Final GitHub organization and repository names.
4. Whether the current Draft POC plan is accepted as execution baseline.
5. Whether to execute VS-001 only.
6. Which account actions Joe wants the model to prepare versus which the nonprofit representative will perform.
7. Whether the broader Enterprise Growth Platform scope changes the purpose of the transaction spike.

### First Technical Work

After explicit authorization:

1. Select and pin an OpenSpec version.
2. Run a minimal Store/reference compatibility spike.
3. Initialize the product Store.
4. Create project guardrails.
5. Create the VS-001 central change.
6. Stop for review before creating external accounts or code repositories.

Do not jump directly to the mobile page.

## External-Action Guardrails

The new model must not:

- accept legal agreements on behalf of the nonprofit;
- represent that Joe has legal authority unless Joe confirms it;
- create paid services without approval;
- make itself or Joe's personal identity the permanent owner when nonprofit ownership is available;
- request or record passwords, MFA seeds, recovery codes, or payment data;
- deploy chargeable AWS resources before budget alerts and approval;
- use real recipient data;
- make the unauthenticated POC endpoint public to the internet;
- archive OpenSpec changes before behavior is verified.

## Complete Artifact Inventory

Status labels:

- **Current:** Suitable as present guidance.
- **Current with execution check:** Direction is current, but versions, pricing, or commands must be verified when used.
- **Needs reconciliation:** Useful but conflicts with later scope or workflow decisions.
- **Historical:** Preserve for provenance; do not treat as current direction.
- **Source material:** Business input, not an approved software specification.

### Root Documents

#### ALIGNMENT_BRIEF_v0.1.md

Summary: Reconciles Joe's original bookkeeping/microloan architecture with the broader Reinvest-to-Grow and Enterprise Growth Platform vision. Identifies Supply Hub, coaching, purchasing, assessments, growth measurement, and entrepreneur journey as first-class domains.

Status: **Current with caveat.** Strongest concise bridge between business and technical contexts, but version 0.1 is an alignment artifact, not stakeholder-approved requirements. Review with the nonprofit and update after scope decisions.

#### BUILD_VS_BUY_ANALYSIS.md

Summary: June 2026 analysis of SaaS and open-source alternatives across bookkeeping, voice entry, loan management, and impact reporting. Recommends hybrid evaluation and discusses products such as Loandisk, Mifos/Fineract, Talkbooks, ActivityInfo, Zoho Books, and others.

Status: **Needs update before vendor decisions.** Valuable reasoning and candidate list, but prices, features, vendor maturity, and availability are time-sensitive. It also predates the broader Enterprise Growth Platform framing.

#### CHAT_TRANSCRIPT.md

Summary: Literal-style transcript of the earlier architecture conversation that produced the original AWS-native direction, cost estimates, and build-vs-buy analysis. Includes user prompts and assistant replies from that earlier chat.

Status: **Historical and incomplete for the present session.** It ends with the request to write that earlier chat and does not include the research/OpenSpec session summarized here. It also contains obsolete housing-violations paths.

#### INTERNAL_ARCHITECTURE_ANALYSIS_v0.1.md

Summary: Direct assessment that Joe's technical backbone remains viable but the product center must shift from bookkeeping/loans to the enterprise journey, Supply Hub, coaching, purchasing, financing, measurement, and learning.

Status: **Current with caveat.** Strong directional analysis, but informal and not an approved architecture. Reconcile with POC scope before broader design.

#### PROJECT_SUMMARY.md

Summary: Consolidated original mobile-bookkeeping architecture, requirements, stack, modules, financial correctness, AI guardrails, offline design, security, delivery sequence, MVP, and build-vs-buy appendix.

Status: **Needs reconciliation.** Technically current as a narrow bookkeeping subsystem, but product framing is narrower than the Home Roots business documents. Relabel as a subsystem/POC summary or revise after stakeholder alignment.

### Implementation Plans

#### ai-planning/implementation-plans/research-to-prototype-implementation-plan.md

Summary: Seven-phase research and prototype sequence covering mobile, offline data, backend, touch UX, receipts, speech/AI, and staff web. Records completed research and the original next-spec sequence.

Status: **Partially superseded.** Research ordering and prototype rationale remain useful. Direct specs/mobile-poc file instructions are superseded by the central/local OpenSpec multi-repository plan. Update after repository strategy is finalized.

#### ai-planning/implementation-plans/openspec-multi-repository-mobile-poc-plan.md

Summary: Detailed current execution plan for repository topology, OpenSpec Stores/references, VS-001 accounts/repositories, and VS-002 end-to-end transaction entry. Includes ownership, contracts, table design, AWS, testing, CI, security, costs, review gates, and fallback.

Status: **Most current implementation plan, still marked Draft.** Use as the review baseline. Resolve its Decisions To Review Before Handoff section before irreversible or paid actions. The creation of this handoff implies forward movement, but not blanket authorization for account creation or deployment.

#### ai-planning/handoff-docs/mobile-bookkeeping-new-repository-handoff.md

Summary: This document. Provides cross-session context, history, artifact inventory, current decisions, scope caveats, and start procedure.

Status: **Current as of 2026-08-08.** Update when repository names, OpenSpec version, or slice authorization becomes concrete.

### Architecture Asset

#### architecture/microlending-ngapp-architecture.png

Summary: Diagram of recipient mobile and nonprofit React applications calling a Spring Boot modular monolith connected to PostgreSQL, S3, speech, queues, Python workers, Bedrock, Textract, and reporting.

Status: **Needs update.** Useful for the original bookkeeping subsystem, but omits offline SQLite, Cognito/security, AWS deployment topology, central Store/repositories, and the broader Supply Hub/enterprise-growth domains. It should not be treated as a deployment diagram.

### Research Agendas

#### research/ARCHITECTURE_RESEARCH_NEEDS.md

Summary: Broad checklist of mobile, backend, finance, AI, AWS, security, reporting, DevOps, UX, and vendor topics.

Status: **Useful backlog but progress is stale.** Many boxes remain unchecked even though focused mobile/backend topics were researched. Update checkboxes or mark it as an original inventory.

#### research/FOCUSED_ARCHITECTURE_RESEARCH.md

Summary: Narrowed agenda for React Native/Expo, touch/speech/multilingual UX, receipts, offline SQLite/sync, modular monolith, and Material UI, with suggested order.

Status: **Research phase completed but checklist stale.** Keep as provenance or mark complete. Its ordering was refined by the research-to-prototype plan.

### Technical Research

#### research/tech-research/phase-01-mobile-foundation-react-native-expo-typescript.md

Summary: Beginner-oriented explanation and decision for React Native, Expo, TypeScript, Expo Go, development builds, EAS Build, iOS/Android distribution, alternatives, and first app path.

Status: **Current with execution check.** Direction remains current. Verify Expo SDK/template commands, current EAS behavior, and app-store requirements when scaffolding.

#### research/tech-research/phase-02-offline-first-sqlite-sync-architecture.md

Summary: Defines SQLite local projection plus durable sync queue, status lifecycle, local/server IDs, idempotency, retries, foreground sync, conflict strategy, schema examples, and prototype order.

Status: **Current.** Direction remains appropriate. Adapt schema after the REST contract and domain model are approved.

#### research/tech-research/phase-03-thin-backend-sync-slice-spring-boot-modular-monolith.md

Summary: Defines Spring Boot modular-monolith boundaries, transaction intake, idempotent sync API, persistence, validation, audit, testing, and what may be stubbed.

Status: **Current with one POC difference.** The multi-repo VS-002 plan defers a separate audit table to preserve the requested one-table connectivity spike. Production financial posting must restore explicit audit behavior.

#### research/tech-research/phase-04-touch-first-bookkeeping-mobile-ux.md

Summary: Defines manual transaction flow, minimum screens, plain-language states, large touch targets, amount handling, one-currency MVP, error UX, and later workflow expansion.

Status: **Current.** Only the single-page subset applies to VS-002.

#### research/tech-research/phase-05-receipt-capture-mobile-document-scanning.md

Summary: Recommends simple photo capture with Expo Image Picker, durable local file storage, SQLite metadata, separate upload state, and deferred OCR/scanning.

Status: **Current with execution check.** Verify current Expo APIs before implementation. Deferred beyond VS-002.

#### research/tech-research/phase-06-speech-multilingual-ai-proposal-workflow.md

Summary: Defines speech/typed input to structured proposal, deterministic validation, user review, confirmation, internationalization, provider boundaries, and mocked-first strategy.

Status: **Current with execution check.** Provider APIs and pricing are time-sensitive. Deferred until manual transaction entry and sync work.

#### research/tech-research/phase-07-staff-back-office-react-vite-material-ui.md

Summary: Selects React/Vite/TypeScript/MUI for staff tools and defines the first transaction visibility/review slice.

Status: **Current with execution check.** Verify library versions and licensing when created. Deferred until mobile/backend integration works.

#### research/tech-research/nonprofit-cost-programs-running-list.md

Summary: Running tracker for Apple fee waivers, AWS nonprofit credits, eligibility, applications, account ownership, developer access, restrictions, and future paid services.

Status: **Current but intentionally incomplete.** Update during every paid-service decision. VS-001 should add Google Play, GitHub, Expo, domain/email/DNS, credential vault, and actual AWS POC operating costs.

#### research/tech-research/openspec-adoption-decision-and-structure.md

Summary: Explains OpenSpec, deltas, Stores-independent base concepts, standard artifact flow, division from SDLC skills, lightweight rules, alternatives, risks, and deferred project-specific decisions.

Status: **Current with execution check.** OpenSpec evolves quickly. Verify version-specific commands and Store behavior before initialization.

### Home Roots Source Documents

#### jpaul-documents/Reinvest to Grow Master Architecture Version 3.1 Final.docx

Summary: Candidate-final conceptual architecture for Reinvest-to-Grow. Defines the core theory, intervention mechanisms, five growth conditions, differentiated growth ladder, measurement architecture, proposed EGS, Supply Hub, platform, validation boundary, outcomes, and learning system.

Status: **Primary current business source, not empirical proof.** The document recommends freezing this conceptual architecture for the next phase but repeatedly states that causal claims and EGS remain unvalidated. Confirm formal approval with the nonprofit.

#### jpaul-documents/Building the Enterprise Growth Platform, An Introduction for Software Engineers and Technical Partners, Software Engineer Brief v1.0.docx

Summary: Draft orientation for engineers explaining Home Roots, Reinvest-to-Grow, Supply Hub, why methodology precedes software, entrepreneur journeys, operations, data, human judgment, platform principles, and the role of technology.

Status: **Current source material, explicitly Draft.** Read before broad software design. It is orientation, not a feature specification.

#### jpaul-documents/Enterprise Growth Platform.docx

Summary: Short narrative explaining that the platform standardizes, coordinates, automates, measures, and scales purchasing, financing, growth services, performance, and expansion planning. Frames the platform as an operating system rather than merely an app.

Status: **Source material/draft.** Useful framing, but informal and likely intended for deck development rather than technical requirements.

#### jpaul-documents/Final Deck 2027 Part 8.docx

Summary: Investor/funder deck draft and notes covering problem, solution, market, traction, business model, unit economics, Enterprise Growth Platform, and slide corrections.

Status: **Needs verification before reliance.** Contains explicit comments about inconsistent per-entrepreneur calculations, SOM versus funded targets, and an inaccurate statement that the platform is already mobile. Treat figures and claims as draft.

#### jpaul-documents/Jizzoe Feedback.docx

Summary: Feedback on Joe's initial architecture. Praises offline, voice, modularity, integration, and build-vs-buy thinking; identifies missing Supply Hub, EGS, differentiated outcomes, and methodology; proposes the platform as a software ecosystem.

Status: **Useful historical/source feedback.** It predates later alignment documents and is conversational, not an approved product decision.

### Prompt

#### prompts/review-jpaul-docs.txt

Summary: Original prompt asking an AI to read selected Home Roots documents before comparing them to Joe's architecture.

Status: **Historical provenance.** Its task has been completed. Keep only if prompt history is valuable.

## Literal Conversation Dump

### What Exists

CHAT_TRANSCRIPT.md is a literal-style dump of an earlier architecture chat. It contains the initial user prompts and assistant replies that generated the first architecture, cost, and build-vs-buy work.

It is not a dump of the present research and planning session.

### Can This Assistant Produce The Present Session Verbatim?

Not reliably.

This coding session does not expose a tool to retrieve the canonical raw conversation transcript. Long conversations may also be compacted into summaries for the model, so reconstructing every prompt and reply from current context would not be a literal dump and could omit or alter wording.

The assistant should not fabricate a supposedly verbatim transcript from memory or summaries.

Official Codex documentation found during this handoff did not identify a Codex-specific transcript-export command. If the client UI provides conversation copy/export or account data export, use that client feature to obtain the canonical record. Availability may differ from ChatGPT account export, so do not assume ChatGPT export instructions apply to this Codex workspace without checking the UI or current official documentation.

### Durable Substitute

This handoff records:

- user goals and working preferences;
- all major actions;
- resulting decisions;
- corrections;
- files created;
- unresolved scope questions;
- execution constraints.

This is the recommended context for the next LLM. A raw chat transcript would add provenance but should not replace the reviewed durable artifacts.

## Reusable Skill Opportunities

### Primary Candidate: Research-To-Prototype Architecture Planner

The strongest repeatable pattern from this session is a general skill that turns an unfamiliar product architecture into a decision-ready research program and an implementation-ready proof-of-concept plan.

Suggested skill name:

~~~text
research-to-prototype-architecture-planner
~~~

The skill should accept:

- product or architecture summary;
- broad and focused research backlogs;
- developer experience and knowledge gaps;
- delivery constraints;
- preferred artifact directory;
- desired prototype depth;
- cost, nonprofit, security, or compliance context;
- preferred specification framework.

The skill should:

1. Read the existing product, business, architecture, and research artifacts.
2. Distinguish business assumptions from approved requirements.
3. Identify the highest-risk architecture questions.
4. Order research by decision and prototype dependency.
5. Announce each research step before executing it.
6. Produce beginner-accessible, decision-focused technology notes.
7. Include high-level summaries, 101 background, foundational concepts, practical introductions, alternatives, tradeoffs, risks, sources, and learn-more links.
8. Define a minimal start-here implementation path for each topic.
9. Verify current and time-sensitive claims against primary sources.
10. Maintain a sidecar cost/nonprofit/compliance tracker when paid services appear.
11. Convert completed research into thin vertical slices with stop conditions.
12. Select or integrate a lightweight specification workflow such as OpenSpec.
13. Define repository, contract, test, review, and acceptance boundaries.
14. Audit generated artifacts for contradictions, stale assumptions, and missing security controls.
15. Produce a cross-session handoff with artifact inventory and currency assessment.
16. Stop at explicit approval gates rather than moving automatically from research to external account creation or implementation.

Expected outputs:

- research-to-prototype implementation plan;
- one research note per decision area;
- running paid-service/nonprofit tracker when applicable;
- specification-framework decision;
- prototype vertical-slice plan;
- cross-session handoff.

This skill should remain domain-neutral. React Native, Expo, Spring Boot, AWS, and OpenSpec are inputs and examples, not hard-coded requirements.

### Sub-Workflow: Artifact Currency And Handoff Audit

A reusable handoff sub-workflow could:

- inventory every durable project artifact;
- summarize each artifact;
- label it Current, Current with execution check, Needs reconciliation, Historical, or Source material;
- identify superseded instructions;
- establish a source-of-truth hierarchy;
- summarize completed and unperformed work;
- record open decisions and safe next steps;
- distinguish a real transcript from a reconstructed summary;
- verify that another LLM can continue without repeating research.

This may be useful as its own skill only if it will be used independently across many projects. Otherwise, keep it as the final phase of the research-to-prototype planner.

### Sub-Workflow: Nonprofit Technology Cost And Ownership Research

Another repeatable sub-workflow is paid-service research for nonprofits.

For each service it should capture:

- normal cost;
- nonprofit discount, credit, or waiver;
- eligibility;
- application procedure;
- legally authorized applicant;
- whether an outside developer may apply;
- correct account owner;
- delegated developer roles;
- documentation requirements;
- restrictions;
- renewal and expiration;
- transfer and exit risks;
- official sources;
- next review date.

This could become a standalone skill if nonprofit technology projects recur. It should remain a sidecar workflow here so cost research does not interrupt the main architecture path longer than necessary.

### Relationship To The Base SDLC Skills

Do not duplicate code-review, coding-standard, testing-quality, security-review, or CI-enforcement logic in this planning skill.

The boundary should be:

~~~text
Research-to-prototype skill
  -> decides what should be built and how success is specified

OpenSpec
  -> stores approved product behavior and change plans

Base SDLC skills
  -> govern implementation and review quality

CI and repository rules
  -> enforce objective checks
~~~

### Recommendation

Create the research-to-prototype architecture planner first.

Keep handoff auditing and nonprofit cost research as internal modules or referenced workflows until they demonstrate enough independent reuse to justify separate skills.

Do not turn the phase research documents themselves into skills. Technology facts, versions, pricing, and vendor programs change; the skill should know how to research and validate them rather than embedding a large static knowledge base.

## Immediate Open Decisions

Before execution, confirm:

1. Is the narrow bookkeeping transaction slice still the desired first technical spike after reviewing the broader Enterprise Growth Platform?
2. Is multi-repository development worth the overhead for this POC, or should the first implementation use a monorepo?
3. What are the final GitHub organization and repository names?
4. Is the product repository the first dedicated repository being created?
5. Will OpenSpec Store beta be used after a compatibility spike?
6. Which nonprofit representative will own each vendor account?
7. Are management plus development AWS accounts sufficient for now?
8. Is ECS Fargate/RDS/ALB the desired cloud proof rather than a cheaper temporary host?
9. Is no-NAT-by-default accepted?
10. Is the proposed REST contract accepted?
11. Is a one-table intake POC accepted with audit/ledger explicitly deferred?
12. Is temporary CIDR restriction acceptable until Cognito?
13. May Apple and Google approvals remain pending at the VS-001 stop condition?

## Handoff Completion Condition

This handoff is complete when it has been copied with the planning documents into the new repository and the new LLM can:

- explain the business-scope distinction;
- identify the current technical plan;
- list the repository topology;
- explain central versus local OpenSpec changes;
- describe VS-001 and VS-002;
- identify account-ownership restrictions;
- identify what has not been implemented;
- begin with plan confirmation rather than repeating research or writing application code.

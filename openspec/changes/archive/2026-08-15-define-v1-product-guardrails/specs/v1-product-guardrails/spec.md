## Purpose

Defines the accepted Version 1 product guardrails that govern future planning, proposals, implementation authorization, validation, and impact language for the Enterprise Growth App Business Journal Module.

## ADDED Requirements

### Requirement: V1 positioning is stable
The planning repository SHALL define Enterprise Growth App V1 as the entrepreneur-facing Business Journal Module within the broader Enterprise Growth Platform vision, and SHALL prohibit framing V1 as only a bookkeeping or loan-management product.

#### Scenario: Future proposal uses V1 positioning
- **WHEN** a future V1 proposal describes the product category or user value
- **THEN** it states that Business Journal recordkeeping creates trustworthy business activity data for entrepreneur understanding, coaching, financing readiness, monitoring, and learning

#### Scenario: Future proposal narrows V1 to bookkeeping
- **WHEN** a future proposal frames the product as a generic bookkeeping app, accounting system, or loan-management system
- **THEN** review identifies the mismatch with the accepted V1 positioning before the proposal can be accepted

### Requirement: Source hierarchy governs product decisions
The planning repository SHALL resolve V1 product conflicts using this hierarchy: repository governance and OpenSpec lifecycle policy first; accepted OpenSpec specifications second; approved change artifacts third; current design-control briefs fourth; earlier research, PRDs, appendices, and advisory notes fifth. Narrower, newer, explicitly approved decisions SHALL override broader or older planning material when they conflict.

#### Scenario: Conflict affects safety or repository scope
- **WHEN** a source document proposes external accounts, repositories, infrastructure, production data, implementation work, or sensitive-data handling outside the approved repository boundary
- **THEN** `AGENTS.md`, `docs/sdd-workflow.md`, `openspec/config.yaml`, and accepted OpenSpec specifications control the decision unless a later approved change explicitly changes the boundary

#### Scenario: Design brief conflicts with accepted specification
- **WHEN** a design brief or PRD describes behavior that conflicts with an accepted OpenSpec requirement
- **THEN** the accepted OpenSpec requirement controls until a new reviewed change modifies it

### Requirement: V1 scope and non-goals are explicit
The planning repository SHALL keep V1 scope centered on the Business Journal Module and SHALL preserve explicit non-goals for full accounting, automated lending or credit scoring, marketplace, supplier ordering, advanced inventory, full coaching workflow management, advanced analytics, broad platform operations, and multi-country expansion beyond approved pilot assumptions.

#### Scenario: Future slice adds a V1 capability
- **WHEN** a future V1 slice proposes entrepreneur mobile, admin visibility, transaction, receipt, reporting, AI assistance, loan visibility, offline, audit, localization, or pilot-readiness behavior
- **THEN** the proposal identifies whether the behavior is in V1 scope, conditional V1 scope, or a non-goal under this guardrail

#### Scenario: Future slice expands into a non-goal
- **WHEN** a future V1 slice proposes full accounting, automated loan approval, credit scoring, supplier ordering, marketplace, advanced inventory, or full coaching automation
- **THEN** review blocks acceptance unless a separate approved product decision changes the V1 scope

### Requirement: Offline-first core behavior is mandatory
Future V1 Business Journal requirements SHALL require core entrepreneur transaction activity to remain usable with intermittent or absent connectivity, and SHALL require data-preserving status and recovery language for local, queued, synced, failed, or needs-review states.

#### Scenario: Offline transaction slice is proposed
- **WHEN** a future transaction or sync slice is proposed
- **THEN** it includes requirements and validation evidence for local durability, restart survival, safe retry, duplicate prevention, and user-understandable sync status

#### Scenario: Online-only core flow is proposed
- **WHEN** a future proposal requires connectivity to record core sales, expenses, or cash movement
- **THEN** review identifies the proposal as inconsistent with accepted V1 guardrails

### Requirement: Human confirmation controls financial writes
Future V1 requirements SHALL distinguish raw inputs, extracted or AI-suggested values, confirmed values, durable records, sync state, and audit events. Important financial records SHALL NOT be created, modified, or deleted from speech, OCR, AI, or automation output without human review and confirmation.

#### Scenario: Suggested transaction is created from voice or OCR
- **WHEN** speech, OCR, receipt extraction, repeated-entry assistance, or AI produces proposed transaction fields
- **THEN** the user can review, edit, and confirm the values before they become authoritative financial record data

#### Scenario: Automation bypasses review
- **WHEN** a future proposal lets voice, OCR, or AI silently create or alter an authoritative financial record
- **THEN** review rejects the behavior as inconsistent with V1 guardrails

### Requirement: Voice remains optional and proposal-based
Future V1 planning SHALL treat voice as a low-effort input path that may create reviewable proposals and confirmation summaries, while preserving a complete manual touch-first path for every core Business Journal record.

#### Scenario: Voice is unavailable or inaccurate
- **WHEN** speech recognition, target-language quality, network availability, or provider access fails
- **THEN** the entrepreneur can complete the same core record manually without data loss or blocked workflow

#### Scenario: Voice capability is proposed
- **WHEN** a future voice slice is proposed
- **THEN** it records target language assumptions, fallback behavior, confirmation requirements, and synthetic-only or separately approved data policy

### Requirement: Receipt and OCR behavior is assisted review
Future V1 receipt planning SHALL require receipt capture, retention, review, correction, and manual completion. OCR or extraction SHALL be best-effort assistance and SHALL NOT be a required dependency for completing a transaction record.

#### Scenario: Receipt extraction succeeds
- **WHEN** OCR or another extraction method identifies possible receipt values
- **THEN** the system presents extracted or suggested values separately from confirmed transaction fields for user review and correction

#### Scenario: Receipt extraction fails
- **WHEN** OCR or extraction is unavailable, inaccurate, or incomplete
- **THEN** the entrepreneur can attach or replace receipt evidence and complete the transaction through manual entry

### Requirement: AI assistance is bounded and non-authoritative
Future V1 AI planning SHALL limit AI behavior to bounded category suggestions, organization, plain-language explanations, basic business questions, and traceable suggested next actions. AI SHALL NOT approve financing, produce autonomous business decisions, shame users, imply guaranteed outcomes, or manufacture impact claims.

#### Scenario: AI explanation is displayed
- **WHEN** an AI-generated explanation or suggestion appears in V1
- **THEN** it is labeled as suggested or estimated when applicable, grounded in available source data, and paired with an understandable next action without claiming certainty

#### Scenario: AI service fails
- **WHEN** AI assistance is unavailable, times out, or cannot produce a reliable result
- **THEN** the Business Journal workflow remains usable through non-AI behavior

### Requirement: Loan visibility is conditional and read-only
Future V1 planning SHALL treat loan visibility as conditional scope that is allowed only when reliable pilot loan data and ownership are approved. Loan behavior SHALL be read-only visibility unless a separate approved change authorizes operational workflows.

#### Scenario: Reliable pilot loan data exists
- **WHEN** HRF has an approved loan data source for a pilot
- **THEN** a future proposal may include read-only loan amount, outstanding balance, repayment status, and payment-history visibility with role and source controls

#### Scenario: Loan workflow implies decisions
- **WHEN** a future proposal includes automated credit scoring, loan approval, predictive financing, borrower self-service changes, or repayment administration
- **THEN** review treats the behavior as outside V1 guardrails unless separately approved

### Requirement: Localization and accessible language are required
Future V1 planning SHALL require localizable user-facing text, plain business language, and accessible interaction patterns for constrained Android devices. Haitian Creole SHALL be planned as the primary entrepreneur-facing language, while exact pilot language, currency, and locale defaults remain explicit approval decisions for the relevant slice.

#### Scenario: Entrepreneur-facing workflow is proposed
- **WHEN** a future entrepreneur-facing V1 slice is proposed
- **THEN** it avoids accounting jargon, identifies localization impact, and records the language and currency assumptions it relies on

#### Scenario: Critical action uses icon-only or technical copy
- **WHEN** a future UX proposal relies on icon-only critical financial actions, accounting jargon, or technical sync/error language
- **THEN** review identifies the issue before the proposal can be accepted

### Requirement: Data policy is synthetic-only until approved otherwise
Planning artifacts, prototypes, examples, screenshots, tests, and local validation for this repository SHALL use synthetic data only unless a separate approved change authorizes real participant, operational, financial, personal, or sensitive data use under nonprofit-owned controls.

#### Scenario: Prototype proposal uses example data
- **WHEN** a future prototype or planning artifact includes names, transactions, receipts, screenshots, exports, or AI examples
- **THEN** the data is synthetic and does not include participant records, production financial data, credentials, payment details, secrets, or recovery material

#### Scenario: Real data is requested
- **WHEN** a future proposal needs real participant, operational, financial, personal, or sensitive data
- **THEN** it requires separate approval for data source, consent, ownership, access control, retention, validation, and recovery before use

### Requirement: Impact claims are evidence-seeking
Future V1 reporting, dashboards, exports, summaries, and planning artifacts SHALL preserve the distinction between traceable observations, estimates, hypotheses, pilot-learning evidence, and proven impact. The system SHALL NOT present causal, financing, resilience, or funder-impact claims as established unless supported by approved evidence.

#### Scenario: Dashboard or report includes outcome language
- **WHEN** a future V1 slice proposes outcome, impact, growth, coaching, or financing-readiness language
- **THEN** it identifies the source observations, calculation basis, freshness, uncertainty, and whether the statement is an estimate, hypothesis, or verified result

#### Scenario: Unsupported impact claim appears
- **WHEN** a planning artifact or product behavior claims the app improved income, resilience, repayment, or business outcomes without approved evidence
- **THEN** review treats the claim as noncompliant with V1 guardrails

### Requirement: Follow-on architecture work is required
The planning repository SHALL treat `define-cross-repository-architecture` as the next required planning change before repository creation, component implementation, OpenSpec Store configuration, external account setup, infrastructure provisioning, or cross-repository coordination is authorized.

#### Scenario: Proposal follows guardrails
- **WHEN** `define-v1-product-guardrails` is reviewed
- **THEN** the next named planning change is `define-cross-repository-architecture`

#### Scenario: Implementation begins from this change
- **WHEN** someone attempts to use this change to create repositories, configure an OpenSpec Store, provision infrastructure, create accounts, or implement application behavior
- **THEN** the attempt is blocked because this change authorizes planning artifacts only

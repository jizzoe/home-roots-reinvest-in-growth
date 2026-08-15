## Purpose

Defines the accepted product-level domain vocabulary and behavioral boundaries for the V1 Business Journal model before component repositories encode local schemas, APIs, user interfaces, sync behavior, reports, or evidence records.

## ADDED Requirements

### Requirement: Domain model is product vocabulary, not implementation schema
The planning repository SHALL define the core domain model as product-level vocabulary and behavior boundaries for future planning and component-local implementation. It SHALL NOT prescribe database tables, DTO packages, class names, endpoint shapes, migrations, or shared implementation models.

#### Scenario: Future component proposal uses the domain model
- **WHEN** a future mobile, backend, staff-web, worker, infrastructure, or cross-repository proposal depends on Business Journal concepts
- **THEN** it cites the relevant `core-domain-model` requirements and states which local schema, API, UI, or evidence choices implement those product concepts

#### Scenario: Future proposal treats this spec as a schema
- **WHEN** a future proposal copies this domain model into database tables, DTO packages, generated shared models, or endpoint payloads without a component-local design
- **THEN** review rejects the proposal because this capability controls meaning, not implementation structure

### Requirement: Business context anchors Business Journal records
V1 Business Journal planning SHALL treat records as business activity for a specific business operated by an entrepreneur in an HRF program context. The accepted domain vocabulary SHALL distinguish entrepreneur, business, program participation, language preference, currency context, and business category or type when those concepts affect behavior or evidence.

#### Scenario: Transaction slice identifies business context
- **WHEN** a future transaction, sync, dashboard, report, or admin-visibility slice is proposed
- **THEN** it identifies the entrepreneur/business context, language and currency assumptions, and whether program participation or business category affects the behavior

#### Scenario: Proposal collapses business and user identity
- **WHEN** a future proposal treats a user account, entrepreneur profile, and business as interchangeable concepts
- **THEN** review blocks acceptance until the proposal separates identity, entrepreneur, and business context enough to preserve auditability, reporting, and future multi-business or staff visibility

### Requirement: Business activity records are confirmed facts with explicit type
V1 Business Journal planning SHALL define a business activity record as a human-confirmed record of business activity, initially including sale and expense for M1/M1.2 and allowing cash movement only when a later approved slice defines its policy and reporting effect. Each record SHALL preserve type, amount, currency, occurrence date, business context, source context, confirmation state, and sync state where applicable.

#### Scenario: M1 manual prototype records activity
- **WHEN** the M1 manual offline slice records a sale or expense
- **THEN** it treats the confirmed sale or expense as the implemented subset of the core domain model and leaves cash movement policy deferred

#### Scenario: Cash movement is proposed
- **WHEN** a future slice proposes cash movement behavior
- **THEN** it defines the meaning of cash movement, how it affects money available and reports, and how it avoids double-counting sales, expenses, loans, or owner transfers before implementation is accepted

### Requirement: Source, proposal, and confirmed record states are separate
The domain model SHALL distinguish raw input or captured evidence, system-extracted or AI-suggested proposal values, entrepreneur-edited proposal values, and human-confirmed record values. Speech, OCR, AI, repeated-entry assistance, or automation SHALL NOT create authoritative financial record values without human confirmation.

#### Scenario: Speech or OCR creates suggested fields
- **WHEN** speech, receipt OCR, AI, or a repeated-entry helper proposes transaction fields
- **THEN** the future slice records the source and proposal separately from confirmed values and requires review or edit before confirmation

#### Scenario: Automation bypasses confirmation
- **WHEN** a future proposal lets extracted, inferred, or AI-suggested values become authoritative financial data without human confirmation
- **THEN** review rejects the behavior as inconsistent with the accepted domain model and V1 guardrails

### Requirement: Receipt evidence remains separate from confirmed financial fields
The domain model SHALL treat receipt images, file references, OCR text, extraction status, and suggested values as evidence or proposal inputs that remain separate from confirmed transaction fields. Receipt capture or extraction failure SHALL NOT block manual completion of a record unless a later approved slice explicitly narrows the workflow for non-core evidence capture.

#### Scenario: Receipt is attached to a record flow
- **WHEN** a future receipt slice captures or selects a receipt image
- **THEN** it preserves receipt evidence, extraction status, and suggested values separately from the confirmed business activity record

#### Scenario: Receipt extraction fails
- **WHEN** OCR or extraction is unavailable, inaccurate, or incomplete
- **THEN** the entrepreneur can manually complete the record and the system preserves any available receipt evidence without treating extracted values as confirmed

### Requirement: Corrections and audit events preserve traceability
The domain model SHALL require future authoritative financial, sync, or evidence changes to preserve traceability through correction and audit concepts. Future proposals SHALL distinguish initial confirmation, permitted correction, cancellation or voiding where allowed, sync acknowledgment, and source/evidence changes without silently rewriting history.

#### Scenario: Confirmed record is corrected
- **WHEN** a future slice allows a confirmed record to be edited, corrected, cancelled, or voided
- **THEN** it records what changed, when it changed, why or by whom when applicable, and how reports should interpret the current and prior values

#### Scenario: Proposal overwrites record history
- **WHEN** a future proposal replaces confirmed values without retaining correction or audit meaning
- **THEN** review blocks the proposal until it preserves traceability appropriate to financial records

### Requirement: Offline sync identity and state are durable domain concepts
The domain model SHALL require local identifiers, client idempotency keys, sync operation identity, and user-understandable sync states for offline-first Business Journal activity that can later synchronize. Sync states SHALL preserve local durability and distinguish local, queued, syncing, synced, failed, and needs-review or equivalent data-preserving states.

#### Scenario: Local transaction is prepared for later sync
- **WHEN** the M1 prototype confirms a local sale or expense
- **THEN** it creates or preserves a stable local identity and idempotency concept that can support safe retry in a later sync slice

#### Scenario: Sync failure occurs
- **WHEN** connectivity, backend, authentication, or deployment failure prevents synchronization
- **THEN** the future slice preserves the confirmed local record, keeps retry identity stable, and exposes a comprehensible state rather than losing or duplicating the record

### Requirement: Localization and currency context are part of the domain model
The domain model SHALL require future Business Journal slices to carry language and currency assumptions for user-facing labels, categories, summaries, errors, explanations, amounts, and reports. Entrepreneur-facing language SHALL remain plain business language and avoid accounting jargon even when internal or backend concepts are more formal.

#### Scenario: Entrepreneur-facing slice is proposed
- **WHEN** a future slice exposes categories, statuses, summaries, errors, or reports to entrepreneurs
- **THEN** it records the language and currency assumptions and maps technical states to localizable plain-language concepts

#### Scenario: Technical accounting terms leak into UX
- **WHEN** a future proposal exposes ledger, debit, credit, net income, or similar accounting terminology as required entrepreneur-facing copy
- **THEN** review rejects or revises the proposal to preserve the accepted Business Journal language model

### Requirement: Summaries and reports preserve calculation meaning
The domain model SHALL require dashboard, report, export, and admin-visibility behavior to distinguish confirmed values, estimated values, calculated summaries, source freshness, sync completeness, and uncertainty. Future reporting proposals SHALL identify the calculation basis before presenting business, financing-readiness, coaching, or impact language.

#### Scenario: Dashboard summary is proposed
- **WHEN** a future dashboard or report uses sales, expenses, profit, money available, trends, engagement, or readiness language
- **THEN** it identifies which confirmed records, time period, currency, freshness, sync state, and calculation assumptions support the value

#### Scenario: Unsupported conclusion is proposed
- **WHEN** a future proposal presents causal impact, financing eligibility, business health, or resilience claims as established from incomplete or estimated domain data
- **THEN** review rejects the conclusion unless an approved evidence model supports it

### Requirement: Backend-dependent work waits for domain and API conventions
Future backend-dependent behavior, M1.2 synchronization, published API descriptions, or cross-repository contract work SHALL cite both the accepted `core-domain-model` and the accepted `api-contract-conventions` before Apply. The core domain model SHALL define meaning; API-contract conventions SHALL define representation, versioning, idempotency, errors, traceability, and publication rules.

#### Scenario: M1.2 API sync is proposed
- **WHEN** an M1.2 slice proposes mobile-to-REST-API synchronization of a confirmed synthetic transaction
- **THEN** it uses this domain model for product meaning and waits for `define-api-contract-conventions` before accepting endpoint, payload, error, or contract-publication behavior for Apply

#### Scenario: Backend proposal skips contract conventions
- **WHEN** a future backend-dependent proposal defines API payloads, endpoint behavior, or executable API descriptions before `api-contract-conventions` is accepted
- **THEN** review blocks the proposal or narrows it to non-backend planning until the contract conventions exist

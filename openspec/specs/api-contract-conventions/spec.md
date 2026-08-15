# api-contract-conventions Specification

## Purpose

Defines accepted product-level API contract conventions for future REST API planning, component-local executable contract publication, cross-repository validation, and M1.2 live-sync proof work.

## Requirements

### Requirement: API contracts separate product conventions from executable component artifacts
The planning repository SHALL define product-level API conventions, cross-component expectations, and system-acceptance evidence. Backend component repositories SHALL own executable API descriptions, implementation code, service tests, migrations, generated artifacts if any, and repository-local OpenSpec evidence.

#### Scenario: Backend API slice is proposed
- **WHEN** a future backend-dependent slice proposes REST API behavior
- **THEN** the central proposal cites `api-contract-conventions` and the backend-local proposal identifies the executable API description, contract checks, implementation tasks, and evidence it owns

#### Scenario: Central planning attempts to define executable API files
- **WHEN** a central planning change attempts to create OpenAPI files, server code, client code, DTO packages, or generated implementation artifacts
- **THEN** review blocks the work as outside this repository boundary unless a later approved architecture change changes ownership

### Requirement: API behavior uses explicit versioning and compatibility rules
Future REST API contracts SHALL include an explicit API version, compatibility expectation, and deprecation or migration plan when behavior changes could affect mobile, backend, staff-web, worker, or integration clients.

#### Scenario: New endpoint behavior is proposed
- **WHEN** a future proposal defines a REST API endpoint or operation
- **THEN** it states the API version, compatibility expectation, affected clients, and how contract evidence will prove compatible behavior

#### Scenario: Breaking behavior is proposed
- **WHEN** a future proposal removes, renames, narrows, or changes meaning for an existing request, response, status, or error behavior
- **THEN** it identifies the breaking change, affected clients, migration plan, validation evidence, and rollback or coexistence strategy before Apply

### Requirement: Idempotency is required for retryable financial writes
Future REST API contracts that create or mutate authoritative financial, sync, or evidence records SHALL require a client-provided idempotency key or equivalent operation identity for retryable writes. Replays SHALL not create duplicate authoritative records and SHALL return enough information for the client to reconcile the outcome.

#### Scenario: M1.2 transaction sync is proposed
- **WHEN** an M1.2 API slice accepts a confirmed synthetic sale or expense from a mobile outbox item
- **THEN** the contract requires stable operation identity, duplicate-safe replay behavior, and response evidence that distinguishes newly accepted work from recognized replay

#### Scenario: Retry follows a timeout
- **WHEN** a client retries after timeout, network loss, app restart, or service recovery
- **THEN** the API contract preserves the prior operation identity and defines a deterministic reconciliation response rather than creating a duplicate record

### Requirement: Error responses are stable, actionable, and non-leaking
Future REST API contracts SHALL define stable error categories and machine-readable error identifiers for validation failures, authentication or authorization failures, unsupported operations, conflicts or needs-review states, idempotency conflicts, rate or availability failures, and unexpected service failures. Error responses SHALL include safe user-action context when applicable and SHALL NOT expose secrets, credentials, sensitive payloads, stack traces, or infrastructure details.

#### Scenario: Request validation fails
- **WHEN** a client sends malformed, unsupported, incomplete, or non-synthetic prototype data where synthetic-only data is required
- **THEN** the API returns a stable validation error category and safe detail sufficient for the client or tester to correct the request without exposing sensitive internals

#### Scenario: Service failure occurs
- **WHEN** the API cannot complete an operation because of dependency failure, outage, timeout, or deployment rollback
- **THEN** the response preserves retry/recovery meaning without telling the client that local data is lost or exposing operational secrets

### Requirement: API contracts carry localization and currency context where user-facing behavior depends on it
Future REST API contracts that return user-facing labels, explanations, summaries, categories, statuses, errors, or monetary values SHALL define language, locale, currency, amount representation, and fallback behavior in a way that preserves the accepted Business Journal language model.

#### Scenario: API returns user-facing summary data
- **WHEN** a future API returns dashboard, report, status, category, or explanation content shown to entrepreneurs
- **THEN** the contract identifies language and currency context, fallback behavior, and whether values are confirmed, estimated, or suggested

#### Scenario: API exposes technical copy
- **WHEN** a future API contract requires clients to display technical error text, accounting jargon, or backend state names directly to entrepreneurs
- **THEN** review rejects or revises the contract to preserve localizable plain-language behavior

### Requirement: Traceability and evidence metadata are contract-visible when behavior depends on them
Future REST API contracts SHALL expose traceability metadata where clients or system acceptance need to verify source, confirmation, sync, audit, calculation basis, freshness, or deployment evidence. Contract-visible metadata SHALL be sufficient to support system acceptance without leaking secrets or unnecessary sensitive data.

#### Scenario: API acknowledges a financial write
- **WHEN** an API accepts or recognizes a retry of a confirmed financial write
- **THEN** the response includes enough traceability for the client and verification evidence to identify the accepted operation, authoritative record reference, acceptance time or revision, and reconciliation state

#### Scenario: API returns calculated report values
- **WHEN** an API returns summary, report, readiness, coaching, or impact-adjacent values
- **THEN** the contract identifies source freshness, calculation basis, confidence or estimate status when applicable, and evidence labels required by accepted guardrails

### Requirement: Executable API descriptions and contract checks are required before Apply
Future backend component proposals SHALL identify the executable API description format and validation commands before Apply. The backend repository SHALL publish or generate the executable description from the reviewed contract source and run deterministic contract checks in its repository-local lifecycle.

#### Scenario: Backend component change prepares to apply
- **WHEN** a backend-local OpenSpec change implements API behavior governed by a central contract
- **THEN** it records the central change and revision, executable API description location, contract validation commands, service tests, and generated-client or manual-client compatibility evidence if applicable

#### Scenario: API behavior lacks contract validation
- **WHEN** a backend-dependent proposal cannot identify executable contract evidence or deterministic validation commands
- **THEN** review blocks Apply until the proposal supplies contract publication and validation evidence

### Requirement: Cross-repository API evidence uses durable manual links while Store is deferred
Until an approved Store/reference model exists, API-related central and component work SHALL link by central repository revision, central change identifier, relevant spec path, component repository, component branch or commit, executable API description revision, validation command results, and system-acceptance evidence.

#### Scenario: Central verification evaluates API behavior
- **WHEN** central verification reviews a cross-repository API scenario
- **THEN** it records links to the backend executable contract, mobile/client revision when applicable, component validation results, and system evidence used for acceptance

#### Scenario: Component evidence cannot be traced
- **WHEN** API evidence lacks durable links to central requirements, component revisions, or validation results
- **THEN** central verification treats the behavior as unverified until durable evidence is supplied

### Requirement: M1.2 API scope remains a narrow synthetic proof
M1.2 API contracts SHALL be limited to the approved narrow live-sync proof until separate product and architecture changes expand scope. M1.2 SHALL NOT authorize production or pilot endpoints, real participant data, broad identity/profile workflows, staff admin APIs, reports, loans, inventory, receipt upload, speech/OCR/AI APIs, multi-service decomposition, or unauthenticated public writes.

#### Scenario: M1.2 transaction-sync endpoint is proposed
- **WHEN** M1.2 proposes a transaction-sync REST API for a confirmed synthetic sale or expense
- **THEN** the contract is limited to named-tester prototype access, one development API surface, synthetic data, idempotent sync, server acknowledgement, and read-back evidence

#### Scenario: M1.2 expands API scope
- **WHEN** an M1.2 API proposal adds production endpoints, real data paths, staff APIs, loan workflows, reports, receipt upload, AI behavior, or broad identity flows
- **THEN** review rejects the expansion unless a separate approved change authorizes that product and architecture scope

### Requirement: API contracts preserve security and data boundaries
Future API contracts SHALL require authenticated writes where records or evidence could become authoritative, shall reject unauthenticated public writes, and shall preserve nonprofit ownership, least-privilege, synthetic-only prototype data, and no-secret-in-contract boundaries. Contract artifacts SHALL NOT include credentials, tokens, recovery material, production personal data, or reusable secrets.

#### Scenario: Authoritative write is proposed
- **WHEN** a future API contract creates or changes authoritative business activity, evidence, sync, audit, loan, or profile data
- **THEN** it requires approved authentication and authorization assumptions, rejects unauthenticated writes, and records data classification and synthetic-only or separately approved data policy

#### Scenario: Contract artifact contains secret material
- **WHEN** an API contract, example payload, fixture, log excerpt, or validation artifact includes credentials, tokens, participant data, production financial data, or reusable secrets
- **THEN** review blocks acceptance until the artifact is corrected and the evidence is regenerated safely

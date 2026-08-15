## Context

See `proposal.md` for motivation. The accepted `v1-product-guardrails` and `cross-repository-architecture` specs establish that this repository owns product-wide planning and cross-repository behavior, while component repositories own implementation. The current M1 and M1.2 briefs need a stable vocabulary for local transactions, source/proposal/confirmation, receipts, audit, sync, language, currency, and calculated summaries before implementation or API work hardens those meanings.

## Goals / Non-Goals

**Goals:**

- Define the product-level concepts future Business Journal slices must use consistently.
- Keep the model business-centered and confirmation-centered rather than accounting-ledger-centered.
- Preserve M1 as a narrow local sale/expense subset while allowing V1 and M1.2 to build on the same vocabulary.
- Separate domain meaning from local schemas, DTOs, endpoint payloads, migrations, and shared packages.
- Make the dependency on `define-api-contract-conventions` explicit for backend-dependent work.

**Non-Goals:**

- No database schema, ERD, migration, endpoint, DTO, shared model, generated code, package, or implementation repository is created.
- No repository creation, branch creation, pull request, CI/CD, OpenSpec Store, GitHub/AWS/domain/vendor account, credential, infrastructure, deployment, or paid-service work is authorized.
- No production or pilot data path is approved; examples and validation remain synthetic-only.
- No final policy is set for cash movement, loan visibility implementation, inventory, AI Growth Coach, full reporting, or impact scoring.

## Decisions

### Decision: Define vocabulary before representation

This change defines the meaning of domain concepts before any component represents them in code or API contracts.

Rationale: mobile SQLite tables, backend persistence, API payloads, and UI labels will differ by repository and implementation language. A central shared schema or DTO package would create premature coupling and conflict with the accepted cross-repository architecture.

Alternatives considered:

- Define database tables and API payloads here. Rejected because those belong in backend and API-contract changes.
- Create shared TypeScript/Java model packages now. Rejected because accepted architecture prohibits initial shared-model repositories.

### Decision: Make business activity, not accounting transactions, the central concept

The model uses Business Journal language around business activity records, with sale and expense as the first implemented subset. Cash movement is allowed in V1 scope but requires a later policy before implementation.

Rationale: this preserves product positioning as a Business Journal and avoids accidentally creating a full accounting ledger.

Alternatives considered:

- Use accounting-ledger terms as the primary model. Rejected because it conflicts with accepted UX and product guardrails.
- Exclude cash movement entirely. Rejected because V1 scope includes cash movement, but its semantics need a dedicated later decision.

### Decision: Treat source/proposal/confirmation as a first-class boundary

Raw input, system suggestions, edited proposals, and confirmed values are separate concepts.

Rationale: this is the core safety boundary for speech, OCR, AI, receipt handling, repeated-entry helpers, and manual fallback. It also keeps human confirmation authoritative for financial writes.

Alternatives considered:

- Store only confirmed values. Rejected because it loses evidence and makes OCR/speech/AI review unverifiable.
- Let high-confidence extraction finalize records. Rejected because accepted guardrails require human confirmation.

### Decision: Keep receipt evidence separate from financial facts

Receipt files, OCR text, extraction status, and suggested fields remain evidence or proposal inputs, not confirmed transaction fields.

Rationale: this allows receipt capture to be useful even when OCR fails and prevents extracted text from becoming authoritative financial data.

Alternatives considered:

- Require OCR success before saving. Rejected because V1 and M1 guardrails require manual completion.
- Treat receipt lines as inventory or accounting line items now. Rejected because inventory and full accounting are non-goals.

### Decision: Make sync identity a domain concern without defining API shape

Local identity, idempotency, operation identity, and sync state are product concepts because they affect duplicate prevention and user trust. API versioning, endpoint shape, error format, and executable contract publication remain for `define-api-contract-conventions`.

Rationale: M1 needs sync-shaped local behavior before a backend exists, while M1.2 needs safe retry and durable acceptance once the API exists.

Alternatives considered:

- Defer all sync concepts to API conventions. Rejected because offline-first mobile behavior already needs stable identity and status.
- Define endpoint payloads here. Rejected because representation belongs in the API contract conventions and backend-local changes.

### Decision: Require evidence labels for summaries and reports

Calculated values and business claims must carry meaning about confirmed inputs, freshness, sync completeness, estimates, and uncertainty.

Rationale: this protects the evidence-seeking posture and prevents unsupported financing, health, coaching, or impact conclusions.

Alternatives considered:

- Let each report define labels independently. Rejected because inconsistent labels would undermine trust and comparability.

## Risks / Trade-offs

- The model may feel abstract without implementation artifacts -> Mitigation: every requirement includes observable review scenarios, and future component changes must map local designs back to these concepts.
- Cash movement remains unresolved -> Mitigation: the spec explicitly blocks implementation until its meaning and reporting effect are defined.
- Component teams may overfit local schemas to the central vocabulary -> Mitigation: the spec says this is not a schema and requires component-local designs.
- API work may try to proceed immediately after this change -> Mitigation: backend-dependent work is explicitly gated on `api-contract-conventions`.
- Summary labels can slow reporting work -> Mitigation: labels are required only where values or claims are presented, preventing later correction of misleading reports.

## Migration Plan

1. Propose and review this planning-only change in the central repository.
2. Apply by verifying source alignment, requirement coverage, design coherence, and validation evidence.
3. Sync the accepted delta into `openspec/specs/core-domain-model/spec.md`.
4. Archive the change after verification and current repository validation.
5. Propose `define-api-contract-conventions` before backend-dependent or M1.2 API synchronization work.

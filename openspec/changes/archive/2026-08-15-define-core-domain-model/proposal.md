## Why

V1 planning now needs a stable product-level domain vocabulary before mobile, backend, sync, reporting, receipt, speech/OCR, or M1.2 API work can be proposed safely. Without accepted boundaries for entrepreneur, business, transaction, source/proposal, confirmation, receipt, audit, sync, localization, and evidence labels, future component changes can accidentally encode conflicting meanings into local schemas, API payloads, or UI copy.

## What Changes

- Add a new `core-domain-model` capability that defines accepted V1 Business Journal concepts and relationships at the product-contract level.
- Establish that the domain model is business-centered and confirmation-centered, not a generic accounting ledger, loan system, database schema, shared DTO package, or API contract.
- Define observable planning requirements for entrepreneur/business identity, business activity records, source/proposal separation, receipt evidence, corrections/auditability, offline sync identity and state, localization/currency context, calculated summaries, and evidence-seeking labels.
- Preserve the M1/M1.2 path: M1 may implement only the manual sale/expense subset locally, while M1.2 may synchronize only confirmed synthetic sale/expense records through the later API contract conventions.
- Require future slice proposals to state which subset of the accepted domain model they implement and which concepts remain deferred.

## Capabilities

### New Capabilities

- `core-domain-model`: Product-level vocabulary, boundaries, and observable scenarios for the V1 Business Journal domain model across planning, mobile, backend, reporting, sync, receipt/OCR, AI assistance, and future component-local OpenSpec work.

### Modified Capabilities

- None.

## Impact

- Affected repository: this planning repository only.
- Affected artifacts: OpenSpec planning artifacts and the living `core-domain-model` specification after verification and sync.
- Affected future work: mobile, backend, staff-web, worker, infrastructure, and cross-repository changes must cite this capability when they depend on Business Journal vocabulary, transaction semantics, source/proposal handling, auditability, sync semantics, localization/currency context, or evidence labels.
- Explicit non-goals: no mobile/backend/infrastructure/staff-web/worker implementation; no repositories, OpenSpec Store, accounts, credentials, CI/CD, cloud resources, database schemas, migrations, DTO packages, API endpoints, or production data paths are created or authorized.
- Required approvals remain separate for repository creation, external writes, paid services, cloud/domain/vendor work, credentials, real participant or sensitive data, and component implementation.

Source basis: `AGENTS.md`, `docs/sdd-workflow.md`, `README.md`, `openspec/config.yaml`, `openspec/specs/v1-product-guardrails/spec.md`, `openspec/specs/cross-repository-architecture/spec.md`, `ai-planning/design-briefs/m0-sdd-and-product-foundation.md`, `ai-planning/design-briefs/V1 Scope Map and Milestone Plan.md`, `ai-planning/design-briefs/JLP UX Synthesis and V1 Design Decisions.md`, `ai-planning/design-briefs/m1-rapid-thin-slice-prototype.md`, and `ai-planning/design-briefs/m1.2-live-sync-rest-api-proof.md`.

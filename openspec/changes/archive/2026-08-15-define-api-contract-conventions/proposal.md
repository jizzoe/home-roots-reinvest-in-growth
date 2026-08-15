## Why

Backend-dependent and M1.2 live-sync work now needs accepted API contract rules before any component repository defines endpoints, payloads, error behavior, or executable API descriptions. Without these conventions, mobile and backend changes can drift on versioning, idempotency, localization, traceability, publication, and validation evidence.

## What Changes

- Add a new `api-contract-conventions` capability that defines product-level rules for future REST API contract proposals.
- Establish that this planning repository owns API behavior conventions and system-acceptance expectations, while backend repositories own executable API descriptions, implementation, contract tests, and service evidence.
- Define observable requirements for API ownership, versioning, idempotency, error responses, localization context, traceability, publication, compatibility, synthetic-only prototype boundaries, and cross-repository validation.
- Gate M1.2 and any backend-dependent slice on accepted `core-domain-model` and `api-contract-conventions` before Apply.
- Keep concrete endpoint paths, schemas, authentication provider choices, OpenAPI documents, infrastructure, deployments, and credentials out of this planning-only change.

## Capabilities

### New Capabilities

- `api-contract-conventions`: Product-level REST API contract rules for versioning, idempotency, errors, localization, traceability, publication, compatibility, and validation across central planning and component-local OpenSpec changes.

### Modified Capabilities

- None.

## Impact

- Affected repository: this planning repository only.
- Affected artifacts: OpenSpec planning artifacts and the living `api-contract-conventions` specification after verification and sync.
- Affected future work: mobile, backend, infrastructure, and cross-repository changes that depend on REST APIs must cite this capability and record component-local executable API descriptions, validation commands, and evidence.
- Explicit non-goals: no mobile/backend/infrastructure/staff-web/worker implementation; no repositories, OpenSpec Store, accounts, credentials, CI/CD, cloud resources, database schemas, migrations, OpenAPI files, endpoint implementation, authentication provider configuration, deployment, or production data paths are created or authorized.
- Required approvals remain separate for repository creation, external writes, paid services, cloud/domain/vendor work, credentials, real participant or sensitive data, and component implementation.

Source basis: `AGENTS.md`, `docs/sdd-workflow.md`, `README.md`, `openspec/config.yaml`, accepted `v1-product-guardrails`, accepted `cross-repository-architecture`, accepted `core-domain-model`, `ai-planning/design-briefs/m0-sdd-and-product-foundation.md`, `ai-planning/design-briefs/V1 Scope Map and Milestone Plan.md`, `ai-planning/design-briefs/JLP UX Synthesis and V1 Design Decisions.md`, `ai-planning/design-briefs/m1-rapid-thin-slice-prototype.md`, and `ai-planning/design-briefs/m1.2-live-sync-rest-api-proof.md`.

## Why

M1 needs a narrow, reviewable product contract for the first non-throwaway Android prototype slice before any mobile repository is created or implementation begins. This change turns the accepted V1 guardrails, cross-repository architecture, core domain model, API conventions, and M1 design briefs into observable planning requirements for manual offline sale and expense recording.

## What Changes

- Defines the M1 manual offline Android prototype slice for a synthetic entrepreneur and synthetic business.
- Requires manual sale and expense entry, review/confirmation, local Business Journal records, SQLite-backed durability, app-restart survival, recent activity, simple local totals, and user-understandable local/sync status.
- Requires a sync-shaped local outbox and stable idempotency concept so a later M1.2 live REST API proof can replace the stubbed path without changing the confirmed transaction model.
- Requires Android installability evidence on a representative physical device as future component-local verification.
- Preserves planning-only scope in this repository and names follow-on work for mobile repository creation and component-local implementation.
- Excludes voice, receipt/OCR, loan visibility, backend synchronization, production or pilot use, external accounts, infrastructure, CI/CD, credentials, real data, and application implementation from this change.

Source basis:

- `AGENTS.md`, `docs/sdd-workflow.md`, `README.md`, and `openspec/config.yaml` control repository boundary, lifecycle, validation, and safety constraints.
- Accepted specs `v1-product-guardrails`, `cross-repository-architecture`, `core-domain-model`, and `api-contract-conventions` control V1 positioning, offline-first behavior, confirmation, synthetic-only data, component ownership, sync identity, and future API boundaries.
- `ai-planning/design-briefs/m1-rapid-thin-slice-prototype.md`, `V1 Scope Map and Milestone Plan.md`, and `JLP UX Synthesis and V1 Design Decisions.md` define the M1 manual offline phase, Android-priority prototype evidence, plain-language UX, and excluded scope.

## Capabilities

### New Capabilities

- `prototype-manual-offline-transaction`: Defines the M1 planning contract for the manual offline Android prototype slice, including local confirmed Business Journal records, SQLite durability, recent activity, local totals, sync-shaped status/outbox/idempotency, synthetic-only data, Android installability evidence, and follow-on component implementation boundaries.

### Modified Capabilities

- None.

## Impact

- Affected repository: this planning repository only.
- Affected future component role: mobile repository, after separate explicit approval for repository creation, location, access model, implementation scope, and validation plan.
- Affected APIs: no executable API, backend endpoint, OpenAPI document, client code, REST integration, or live sync is created or authorized. API conventions only shape the local outbox/idempotency contract for later M1.2 work.
- Affected data: synthetic prototype data only. No participant, operational, financial, personal, sensitive, credential, payment, or production data is authorized.
- Affected external systems: none. This change does not create repositories, configure an OpenSpec Store, create GitHub/AWS/domain/vendor accounts, provision infrastructure, configure CI/CD, create credentials, deploy software, or authorize production/pilot use.

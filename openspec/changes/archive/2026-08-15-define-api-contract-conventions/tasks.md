## 1. Source and Scope Review

- [x] 1.1 Confirm this change remains limited to planning artifacts in `home-roots-reinvest-in-growth` and does not create repositories, configure Store, create accounts, provision infrastructure, configure CI/CD, create credentials, define executable OpenAPI files, or authorize implementation.
- [x] 1.2 Verify the proposal cites repository governance, accepted `v1-product-guardrails`, accepted `cross-repository-architecture`, accepted `core-domain-model`, M0/M1/M1.2 briefs, V1 scope map, and UX synthesis sources.
- [x] 1.3 Confirm the proposal introduces `api-contract-conventions` as a new planning-governance capability and lists no modified capabilities.

## 2. Requirement Coverage Review

- [x] 2.1 Verify the spec separates central product-level API conventions from backend-local executable API descriptions, implementation, tests, and evidence.
- [x] 2.2 Verify the spec requires API versioning, compatibility expectations, and migration or rollback planning for breaking behavior.
- [x] 2.3 Verify the spec requires idempotency or equivalent operation identity for retryable authoritative financial writes.
- [x] 2.4 Verify the spec requires stable, actionable, non-leaking error categories and machine-readable identifiers.
- [x] 2.5 Verify the spec requires localization, locale, currency, amount representation, and fallback behavior where user-facing API behavior depends on them.
- [x] 2.6 Verify the spec requires traceability metadata for writes, summaries, reports, calculations, freshness, and evidence labels when behavior depends on them.
- [x] 2.7 Verify the spec requires executable API descriptions and deterministic contract checks before backend Apply.
- [x] 2.8 Verify the spec requires durable manual links for central and component API evidence while Store use remains deferred.
- [x] 2.9 Verify the spec keeps M1.2 API scope limited to a narrow synthetic live-sync proof.
- [x] 2.10 Verify the spec preserves security, authentication, synthetic-only data, no-secret, and sensitive-data boundaries.

## 3. Design Review

- [x] 3.1 Confirm the design explains why API conventions are central while executable contracts remain backend-local.
- [x] 3.2 Confirm the design explains versioning and compatibility as necessary for offline/mobile and staged deployment behavior.
- [x] 3.3 Confirm the design explains mandatory idempotency for retryable financial writes.
- [x] 3.4 Confirm the design explains stable error meaning without prematurely defining a final wire schema.
- [x] 3.5 Confirm the design explains localization, currency, and evidence metadata as contract concerns.
- [x] 3.6 Confirm the design explains how M1.2 API scope remains constrained.

## 4. Validation

- [x] 4.1 Run `openspec context --json` and confirm it resolves this repository as the nearest OpenSpec root with no error status.
- [x] 4.2 Run `openspec config get workflows` and confirm the workflow list is `["explore","propose","apply","verify","sync","archive"]`.
- [x] 4.3 Run `openspec list --json` and record the active change list, including `define-api-contract-conventions`.
- [x] 4.4 Run `openspec validate --all --strict --no-interactive` and record the result for all OpenSpec artifacts.
- [x] 4.5 Run `git diff --check` and record that no whitespace or patch errors are reported.
- [x] 4.6 Run `git status --short` and record the exact local planning artifact scope, preserving unrelated user changes.

## 5. Review and Handoff

- [x] 5.1 Present the proposal, design, spec, and validation evidence for human review without starting component implementation.
- [x] 5.2 Record any review-requested artifact corrections inside this change before Apply approval.
- [x] 5.3 After this change is closed, use separate lifecycle prompts for M1/M1.2 slice-level proposals instead of authorizing implementation from this planning change.

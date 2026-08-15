## 1. Source and Scope Review

- [x] 1.1 Confirm this change remains limited to planning artifacts in `home-roots-reinvest-in-growth` and does not create repositories, configure Store, create accounts, provision infrastructure, configure CI/CD, create credentials, or authorize implementation.
- [x] 1.2 Verify the proposal cites repository governance, accepted `v1-product-guardrails`, accepted `cross-repository-architecture`, M0/M1/M1.2 briefs, V1 scope map, and UX synthesis sources.
- [x] 1.3 Confirm the proposal introduces `core-domain-model` as a new planning-governance capability and lists no modified capabilities.

## 2. Requirement Coverage Review

- [x] 2.1 Verify the spec defines the domain model as product vocabulary and not a database schema, DTO package, endpoint contract, migration, or shared implementation model.
- [x] 2.2 Verify the spec defines entrepreneur, business, program participation, language, currency, and business category context for future slices that depend on them.
- [x] 2.3 Verify the spec defines business activity records with confirmed sale and expense as the M1/M1.2 subset and cash movement as policy-gated future behavior.
- [x] 2.4 Verify the spec separates raw input, source evidence, suggested proposal values, edited proposal values, and human-confirmed record values.
- [x] 2.5 Verify the spec separates receipt evidence, OCR text, extraction status, and suggested values from confirmed financial fields.
- [x] 2.6 Verify the spec requires correction and audit concepts for authoritative financial, sync, and evidence changes.
- [x] 2.7 Verify the spec requires durable local identity, idempotency, sync operation identity, and user-understandable sync states.
- [x] 2.8 Verify the spec requires localization and currency context while preserving plain Business Journal language.
- [x] 2.9 Verify the spec requires summaries and reports to preserve calculation basis, freshness, sync completeness, estimates, and uncertainty.
- [x] 2.10 Verify the spec gates backend-dependent and M1.2 API work on both `core-domain-model` and future `api-contract-conventions`.

## 3. Design Review

- [x] 3.1 Confirm the design explains vocabulary-before-representation and rejects central schemas, shared DTO packages, and endpoint payloads in this change.
- [x] 3.2 Confirm the design explains why business activity records, not accounting ledger entries, are the central V1 concept.
- [x] 3.3 Confirm the design explains the source/proposal/confirmation boundary for speech, OCR, AI, and manual fallback.
- [x] 3.4 Confirm the design explains why receipt evidence remains separate from confirmed financial facts.
- [x] 3.5 Confirm the design explains sync identity as a domain concern while deferring API shape to `define-api-contract-conventions`.
- [x] 3.6 Confirm the design explains evidence labels for summaries, reports, and claims.

## 4. Validation

- [x] 4.1 Run `openspec context --json` and confirm it resolves this repository as the nearest OpenSpec root with no error status.
- [x] 4.2 Run `openspec config get workflows` and confirm the workflow list is `["explore","propose","apply","verify","sync","archive"]`.
- [x] 4.3 Run `openspec list --json` and record the active change list, including `define-core-domain-model`.
- [x] 4.4 Run `openspec validate --all --strict --no-interactive` and record the result for all OpenSpec artifacts.
- [x] 4.5 Run `git diff --check` and record that no whitespace or patch errors are reported.
- [x] 4.6 Run `git status --short` and record the exact local planning artifact scope, preserving unrelated user changes.

## 5. Review and Handoff

- [x] 5.1 Present the proposal, design, spec, and validation evidence for human review without starting component implementation.
- [x] 5.2 Record any review-requested artifact corrections inside this change before Apply approval.
- [x] 5.3 After this change is closed, use a separate lifecycle change to propose `define-api-contract-conventions`.

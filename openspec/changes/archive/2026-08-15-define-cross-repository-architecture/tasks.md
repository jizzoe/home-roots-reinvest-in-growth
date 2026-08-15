## 1. Source and Scope Review

- [x] 1.1 Confirm the change remains limited to planning artifacts in `home-roots-reinvest-in-growth` and does not create repositories, configure Store, create accounts, provision infrastructure, configure CI/CD, create credentials, or authorize implementation.
- [x] 1.2 Verify the proposal cites the required source documents, including repository governance, the M0/M1/M1.2 briefs, the V1 scope map, and `define-v1-product-guardrails`.
- [x] 1.3 Confirm the proposal introduces `cross-repository-architecture` as a new planning-governance capability and lists no modified capabilities.

## 2. Requirement Coverage Review

- [x] 2.1 Verify the spec defines the planning repository as the central product, architecture, specification, coordination, and system-acceptance evidence boundary.
- [x] 2.2 Verify the spec defines distinct responsibilities for mobile, backend, infrastructure, staff-web, and worker repositories.
- [x] 2.3 Verify the spec defines explicit component repository creation triggers and prevents empty repositories created only to reserve future boundaries.
- [x] 2.4 Verify the spec prohibits initial database-schema, REST-contract, shared-model/DTO, per-backend-module, end-to-end-test, and assistant-skill repositories.
- [x] 2.5 Verify the spec separates central OpenSpec responsibilities from component-local OpenSpec responsibilities.
- [x] 2.6 Verify the spec defines durable manual linking conventions while OpenSpec Store use remains deferred.
- [x] 2.7 Verify the spec records the deferred Store decision and the required evidence before future Store adoption.
- [x] 2.8 Verify the spec records the special M1.2 gated path for the narrow mobile-to-REST-API live-sync proof.
- [x] 2.9 Verify the spec requires separate approval before external writes, repository creation, cloud/domain/vendor resources, credentials, deployment, paid services, or sensitive-data use.
- [x] 2.10 Verify the spec names `define-core-domain-model` and `define-api-contract-conventions` as follow-on planning work.

## 3. Design Review

- [x] 3.1 Confirm the design explains why the planning repository remains central and code-free.
- [x] 3.2 Confirm the design explains role-based component repositories and creation triggers.
- [x] 3.3 Confirm the design explains why auxiliary repositories are deferred initially.
- [x] 3.4 Confirm the design explains the central/product plus component-local OpenSpec model.
- [x] 3.5 Confirm the design explains durable manual links and deferred OpenSpec Store adoption.
- [x] 3.6 Confirm the design explains how M1.2 can pull forward only the minimum backend, infrastructure, and deployment work needed for the live-sync proof.

## 4. Validation

- [x] 4.1 Run `openspec context --json` and confirm it resolves this repository as the nearest OpenSpec root with no error status.
- [x] 4.2 Run `openspec config get workflows` and confirm the workflow list is `["explore","propose","apply","verify","sync","archive"]`.
- [x] 4.3 Run `openspec list --json` and record the active change list, including `define-cross-repository-architecture`.
- [x] 4.4 Run `openspec validate --all --strict --no-interactive` and record the result for all OpenSpec artifacts.
- [x] 4.5 Run `git diff --check` and record that no whitespace or patch errors are reported.
- [x] 4.6 Run `git status --short` and record the exact local planning artifact scope, preserving unrelated user changes.

## 5. Review and Handoff

- [x] 5.1 Present the proposal, design, spec, and validation evidence for human review without starting Apply.
- [x] 5.2 Record any review-requested artifact corrections inside this change before Apply approval.
- [x] 5.3 After review, use separate prompts to propose `define-core-domain-model` and `define-api-contract-conventions`.

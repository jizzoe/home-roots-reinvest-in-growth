## Context

See `proposal.md` for motivation. The accepted `core-domain-model` defines product meaning, while accepted `cross-repository-architecture` assigns implementation, tests, executable API descriptions, and archive evidence to component repositories. M1.2 now needs an API convention layer before it can propose a live Android-to-Spring-Boot REST sync proof.

## Goals / Non-Goals

**Goals:**

- Define the product-level API contract rules future REST API proposals must follow.
- Keep executable API descriptions and implementation evidence in backend component repositories.
- Require versioning, compatibility, idempotency, stable errors, localization/currency context, traceability, publication, and durable cross-repository evidence.
- Preserve M1.2 as a narrow synthetic live-sync proof and prevent accidental expansion into platform APIs.
- Provide enough governance for future component proposals to produce deterministic contract validation evidence.

**Non-Goals:**

- No endpoint paths, payload schemas, OpenAPI documents, generated clients, server code, database migrations, or authentication provider configuration are created here.
- No repositories, branches, pull requests, OpenSpec Store, GitHub/AWS/domain/vendor accounts, CI/CD, credentials, infrastructure, deployments, or paid services are created or authorized.
- No production, pilot, participant, operational, financial, personal, or sensitive data path is approved.
- No final decision is made about authentication provider, EKS runtime, domain/TLS, Terraform state, or tester identity setup.

## Decisions

### Decision: Keep API conventions central and executable contracts local

The central planning spec defines contract rules and system evidence expectations. Backend repositories will own executable API descriptions and validation commands.

Rationale: central planning owns cross-component behavior, but executable API files are implementation artifacts that need backend-local tests, generated artifacts, and release evidence.

Alternatives considered:

- Store OpenAPI files in the planning repository. Rejected because it would blur ownership and create implementation artifacts in a code-free planning repo.
- Leave conventions entirely to backend repositories. Rejected because mobile/backend compatibility and system acceptance need a central product contract.

### Decision: Versioning and compatibility are required for every API behavior proposal

Each API proposal must state API version, affected clients, compatibility expectation, and migration/rollback handling for breaking changes.

Rationale: offline mobile clients and staged deployments make silent API drift expensive. Versioning must be explicit before implementation.

Alternatives considered:

- Use only branch or deployment versions. Rejected because branch/deploy metadata does not communicate client compatibility.

### Decision: Treat idempotency as mandatory for retryable financial writes

Retryable authoritative writes require stable operation identity and replay behavior.

Rationale: offline-first sync, app restarts, network loss, and service recovery are normal conditions. Duplicate financial records would undermine trust and reporting.

Alternatives considered:

- Let backend duplicate detection infer retries. Rejected because clients need deterministic reconciliation and validation evidence.

### Decision: Standardize error meaning without choosing final wire schema

The spec requires stable error categories, machine-readable identifiers, safe detail, and non-leaking failure behavior, but does not define a final JSON envelope.

Rationale: the exact wire representation belongs in the first backend/API component proposal. The central requirement is that clients and testers can reliably respond to errors.

Alternatives considered:

- Define a full error schema here. Rejected because this planning change should not become an endpoint or payload contract.

### Decision: Make localization, currency, and evidence metadata contract concerns

Contracts that serve entrepreneur-facing copy, money, summaries, statuses, or explanations must carry language/currency/evidence context.

Rationale: UX guardrails require plain language and evidence labels, while domain guardrails require confirmed vs estimated vs suggested distinctions.

Alternatives considered:

- Keep localization only in mobile UI. Rejected because backend-provided summaries, errors, categories, and reports can become user-facing.

### Decision: M1.2 API scope is constrained by contract conventions

M1.2 can define only the API surface needed for one synthetic confirmed sale/expense sync proof after component repository and external-resource approvals.

Rationale: the proof is valuable, but API conventions should prevent it from quietly becoming the platform API foundation.

Alternatives considered:

- Let M1.2 design broader V1 APIs while building the proof. Rejected because that would hide product scope and implementation risk inside a prototype integration slice.

## Risks / Trade-offs

- Conventions may feel abstract before a backend repo exists -> Mitigation: require future backend-local executable descriptions and contract checks before Apply.
- Strict idempotency and evidence requirements add upfront work -> Mitigation: they address the highest-risk offline sync failure modes and prevent duplicate records.
- Error conventions without a final wire schema could be interpreted inconsistently -> Mitigation: the first backend API proposal must define executable contract evidence and deterministic validation.
- Localization requirements can complicate early APIs -> Mitigation: the requirement applies where user-facing behavior depends on language/currency, not every internal field.
- M1.2 may still pressure broader API scope -> Mitigation: the spec explicitly rejects production, real data, staff, loan, report, receipt upload, AI, and broad identity API expansion.

## Migration Plan

1. Propose and review this planning-only change in the central repository.
2. Apply by verifying source alignment, requirement coverage, design coherence, and validation evidence.
3. Sync the accepted delta into `openspec/specs/api-contract-conventions/spec.md`.
4. Archive the change after verification and current repository validation.
5. Use this accepted capability, together with `core-domain-model`, before proposing M1.2 or other backend-dependent API behavior.

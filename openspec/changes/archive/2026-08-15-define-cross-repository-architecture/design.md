## Context

See `proposal.md` for motivation. The planning repository already has local OpenSpec governance and an active `define-v1-product-guardrails` change package. The V1 roadmap now includes M1 local Android prototype work and a new M1.2 live-sync REST API proof that can pull forward a narrow subset of backend, infrastructure, and deployment work.

The relevant constraints are:

- `AGENTS.md`, `docs/sdd-workflow.md`, and `openspec/config.yaml` limit this repository to planning, architecture, specifications, design briefs, coordination, and evidence.
- `m0-sdd-and-product-foundation.md` defines this change as the repository-boundary and central/component OpenSpec model.
- `m1-rapid-thin-slice-prototype.md` keeps M1 local/stubbed but shapes mobile data for later sync.
- `m1.2-live-sync-rest-api-proof.md` defines the special proof path for one Android prototype-to-Spring-Boot-REST-API synthetic transaction sync.
- `define-v1-product-guardrails` establishes the applicable safety, offline-first, synthetic-data, confirmation, and follow-on architecture guardrails.

## Goals / Non-Goals

**Goals:**

- Establish the repository map and ownership boundaries that later slice-level changes must follow.
- Define when component repositories may be created and what each repository owns.
- Separate central product contracts from component-local implementation work.
- Provide a durable manual linking model while OpenSpec Store usage remains deferred.
- Make the M1.2 live-sync proof possible without turning it into full M2/M3 or production platform scope.
- Name `define-core-domain-model` and `define-api-contract-conventions` as follow-on planning work.

**Non-Goals:**

- No repository creation, repository naming approval, GitHub organization work, branch creation, pull requests, or settings changes.
- No OpenSpec Store/reference/workset configuration.
- No AWS, domain, vendor, CI/CD, deployment, Terraform state, credential, tester-authentication, or paid-service work.
- No mobile, backend, infrastructure, staff-web, worker, database, API, or test implementation.
- No production/pilot deployment or real participant/sensitive data use.

## Decisions

### Decision: Keep the planning repository central and code-free

`home-roots-reinvest-in-growth` remains the product planning and cross-repository specification boundary. It owns central changes, accepted cross-component behavior, design briefs, architecture decisions, coordination evidence, and system acceptance.

Rationale: the repository is public and has no application or infrastructure test/build suite. Keeping implementation out prevents accidental credential, deployment, participant-data, and ownership drift.

Alternatives considered:

- Put prototype implementation code in the planning repository. Rejected because it would violate the repository boundary and blur validation responsibilities.
- Create one monorepo for all future components. Rejected for now because current governance explicitly separates planning from component implementation and requires component-local OpenSpec evidence.

### Decision: Use role-based component repositories with creation triggers

The architecture defines mobile, backend, infrastructure, staff-web, and worker repository roles. The role names are not approved GitHub repository names. Each repository is created only when a relevant approved slice reaches Apply and its ownership, scope, access, and validation plan are explicit.

Rationale: this avoids empty repositories while still preventing future code from landing in the wrong boundary.

Alternatives considered:

- Create all expected repositories during M0. Rejected because it would create external state before it is needed and before ownership/access decisions are approved.
- Keep all implementation in one future app repository. Rejected because infrastructure, backend, mobile, staff web, and worker validation responsibilities differ materially.

### Decision: Do not create auxiliary repositories initially

Database migrations stay with the backend service, REST contracts are expressed through central product specs plus backend-published executable descriptions, TypeScript and Java models evolve through versioned contracts, backend modules stay inside one modular monolith, and end-to-end evidence is coordinated rather than placed in a standalone repo.

Rationale: these boundaries reduce coordination overhead and avoid premature package coupling before the domain model and API conventions exist.

Alternatives considered:

- Separate schema, contract, shared model, or end-to-end repositories now. Rejected because they add management cost and can harden premature contracts.

### Decision: Use central/product changes plus component-local changes

Central changes define product contracts, affected repository roles, cross-component scenarios, and system acceptance. Component-local changes implement those contracts within each repository and supply local validation evidence.

Rationale: a central task list cannot correctly own code changes across repositories. Component evidence must be generated where the code, tests, builds, credentials, and deployments live.

Alternatives considered:

- Drive all implementation from central tasks. Rejected because it would make the planning repository a cross-repository task dispatcher and weaken local validation.

### Decision: Use durable manual links until Store adoption is approved

Central and component work must cite stable Git facts: repository URL/path, branch, commit or revision, central change id, spec path, component change id, and validation evidence. OpenSpec Store/reference/workset use remains deferred.

Rationale: Store support is not approved for this project, and nonprofit ownership/recovery behavior has not been established. Manual links are lower risk and auditable now.

Alternatives considered:

- Configure a Store during M0. Rejected because it would be external/user-level configuration without ownership, compatibility, and recovery approval.

### Decision: Treat M1.2 as a special gated proof path

M1.2 may pull forward the minimum backend, infrastructure, and deployment slices needed for a live Android-to-REST-API synthetic transaction sync proof. It does not absorb full M2/M3, production, identity, admin, reporting, loan, AI, or multi-service scope.

Rationale: connecting the installed mobile app to a live API is a useful integration risk to test early, but it brings external ownership, cost, credential, deployment, and validation obligations that must remain explicit.

Alternatives considered:

- Force all backend/infrastructure work to wait until M2/M3. Rejected because M1.2 is now a deliberate roadmap proof.
- Let M1.2 create full infrastructure and deployment foundations. Rejected because that would hide major scope expansion inside a prototype proof.

## Risks / Trade-offs

- Repository creation is delayed until Apply gates -> Mitigation: record clear creation triggers and required approvals in the spec.
- Manual links can become stale -> Mitigation: require branch/commit/change/spec/evidence identifiers in both central and component artifacts.
- M1.2 can pull too much platform scope forward -> Mitigation: restrict it to one synthetic transaction sync path and require separate approvals for every external resource.
- Store deferral adds manual coordination work -> Mitigation: use durable Git-based links now and evaluate Store later with compatibility and recovery evidence.
- Component boundaries can drift from central product behavior -> Mitigation: require component-local changes to cite central revisions and require central verification to inspect component evidence before sync/archive.

## Migration Plan

1. Review this planning change only; do not create repositories or external resources.
2. If accepted, apply artifact refinements inside this repository only.
3. Run the repository validation contract from `docs/sdd-workflow.md`.
4. Verify each requirement and scenario against source briefs and the guardrails change.
5. Sync accepted cross-repository architecture into `openspec/specs/cross-repository-architecture/`.
6. Archive only after explicit approval and current validation evidence.
7. Propose `define-core-domain-model`.
8. Propose `define-api-contract-conventions` before backend-dependent or M1.2 sync work.

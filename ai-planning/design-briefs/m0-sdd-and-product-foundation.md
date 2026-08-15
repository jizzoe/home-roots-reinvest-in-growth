# M0 SDD and Product Foundation Design Brief

Status: Draft for review
Milestone: M0 SDD and Product Foundation
Purpose: Establish the product-planning, repository, and specification boundaries that make later slice-level proposals unambiguous.
Implementation authorization: None. This brief defines a proposed foundation; it does not create repositories, accounts, cloud resources, or application code.

## Decision Summary

Invest in Growth needs one central planning repository and separate component repositories when a component is ready to be implemented. The existing repository, `home-roots-reinvest-in-growth`, is the central planning root. It owns product context, architecture, cross-repository specifications, and system-level evidence; it does not own application or infrastructure implementation.

The first required implementation repository is an Expo React Native mobile repository for the M1 prototype. Backend and infrastructure repositories may be needed earlier than the full M2/M3 foundations if the approved M1.2 live-sync proof proceeds; otherwise they remain deferred until their milestone work begins. Staff-web and worker repositories are needed later, at the milestones where their work begins. Do not create empty repositories merely to reserve a future boundary.

OpenSpec's local repository model is authoritative for now. A shared OpenSpec Store/reference arrangement remains deferred because it is beta and no nonprofit-owned canonical Store has been approved or configured. Until an approved replacement exists, component changes link to the applicable central product change and accepted specification by repository URL, branch, commit, and change identifier.

## Outcome

Before the first implementation slice is applied, the project has:

- an explicit source hierarchy and V1 scope boundary;
- an authoritative product-planning root with accepted product guardrails;
- a documented map of repositories, ownership, interfaces, and creation triggers;
- a repeatable central-versus-component OpenSpec workflow; and
- a named mobile implementation repository for the M1 prototype.

## Source Basis and Precedence

This brief follows the current repository governance and product-control documents in this order:

1. `AGENTS.md`, `docs/sdd-workflow.md`, and `openspec/config.yaml` for repository boundary, approvals, and lifecycle policy.
2. `README.md` for the product direction, safety constraints, and current local-first prototype posture.
3. `V1 Scope Map and Milestone Plan.md` and `JLP UX Synthesis and V1 Design Decisions.md` for V1 scope, product guardrails, milestone order, and UX constraints.
4. `m1-rapid-thin-slice-prototype.md` for M1 scope and the local SQLite-first prototype decision.
5. `openspec-multi-repository-mobile-poc-plan.md` for earlier repository-boundary analysis only.

The 2026-08-08 multi-repository plan is a draft and contains an earlier end-to-end AWS proof-of-concept sequence. Its proposed component boundaries remain useful, but this brief does not adopt its premature repository, account, Store, or cloud-provisioning timing. The current V1 scope map's M1.2 live-sync proof may pull forward a narrow backend, Terraform, and deployment slice only after the repository architecture, API-contract conventions, ownership, approval, cost, and validation gates are explicit. Newer repository policy and the M1/M1.2 briefs control when they conflict.

## Scope

### Included

- Product-planning ownership and source hierarchy.
- Repository boundaries, creation triggers, and explicit non-boundaries.
- Central and component-local OpenSpec responsibilities.
- Cross-repository change, evidence, and acceptance conventions.
- M0 proposal sequence and decision gates before M1 Apply.

### Excluded

- Creating, renaming, transferring, or configuring repositories or organizations.
- Opening cloud, app-store, Expo, vendor, or OpenSpec Store accounts.
- Provisioning infrastructure, setting CI rules, or configuring credentials.
- Scaffolding mobile, backend, staff-web, worker, or Terraform code.
- Approving the M1 prototype, implementation target, provider, paid service, or production data use.

## Repository Architecture

### Required Product Boundary

| Repository / boundary | Responsibility | Creation trigger | Status now |
| --- | --- | --- | --- |
| `home-roots-reinvest-in-growth` (existing planning root) | Product planning, research, design briefs, architecture decisions, accepted cross-repository behavior, central change packages, coordination and system-acceptance evidence | Already exists | Active; the authoritative product-planning root |
| Mobile application repository | Expo React Native and TypeScript source, mobile-local OpenSpec changes, SQLite/local-file behavior, device tests, build configuration | Before M1 manual-offline slice is **applied** | Required next; exact nonprofit-owned name and location must be approved |
| Backend service repository | Spring Boot modular monolith, published OpenAPI, migrations, service tests, container build, backend-local OpenSpec changes | Before a backend, sync, or M1.2 REST API proof slice is applied | Deferred unless M1.2 is approved |
| Infrastructure repository | Terraform, environment definitions, deployment permissions/workflows, infrastructure verification, infrastructure-local OpenSpec changes | Before M2 infrastructure work or an approved M1.2 Terraform/AWS development proof is applied | Deferred unless M1.2 is approved |
| Staff web repository | React/Vite/TypeScript staff experience, staff-local OpenSpec changes, web tests/builds | Before M10 staff-web work is applied | Deferred |
| Worker repository | Independently deployed OCR, speech, translation, or AI processing only when a deployed worker boundary is justified | Before the first approved independently deployed worker is applied | Deferred |

The component repository names in this table are roles, not approved GitHub names. Creation, organization ownership, access grants, and service configuration require separate just-in-time approval.

### Repositories Not Needed Initially

Do not create a separate repository for:

- database schema or migrations; they remain with the backend service;
- REST contracts; central product specifications define behavior and the backend publishes executable API descriptions;
- shared DTOs/models; TypeScript and Java models should evolve independently through versioned contracts;
- individual backend modules; the backend begins as one modular monolith;
- end-to-end tests; the affected component repositories and central acceptance evidence own them; or
- reusable assistant skills; they stay outside this product boundary.

## Ownership and Data Boundaries

- Home Roots Foundation or its designated nonprofit entity must own future production repositories, vendor accounts, billing, domains, application identifiers, and production data.
- Contributors receive individual, least-privilege access; do not use shared accounts or commit recovery material, tokens, or credentials.
- This planning repository remains public and contains only synthetic examples and non-sensitive planning material.
- Component repositories must define their own implementation-level access controls, data handling, build checks, and recovery evidence before Apply.

## OpenSpec Operating Model

### Central Product Change

The planning root owns the product-level change package. It describes the observable outcome, affected repositories, cross-component requirements and scenarios, product guardrails, contract expectations, system acceptance, and residual risks. It does not assign file-level implementation tasks across component repositories.

### Component-Local Change

Every affected component repository owns a separate OpenSpec change that identifies its specific code, configuration, tests, migrations, and validation. The component change must cite the central change identifier and the central branch/commit used as its contract source.

### Evidence and Archive

Each component validates and archives its own work after its local requirements are met. The central change remains open until the integrated behavior meets the central scenarios and system-level evidence is recorded. A change may not be synchronized into accepted product specifications based only on a task list or a single component's green test run.

### Store Decision

Do not configure an OpenSpec Store, reference, or workset in M0. Reconsider it only in a separately approved change after a pinned-version compatibility test, recovery plan, and nonprofit ownership model are available. Manual durable links are the approved interim coordination method.

## M0 Proposal Sequence

M0 should be proposed as small, reviewable planning changes rather than as one broad implementation change:

1. `define-v1-product-guardrails` — establish V1 positioning, source hierarchy, scope, non-goals, safety boundaries, and resolutions for the currently decided scope tensions.
2. `define-cross-repository-architecture` — adopt the repository map and central/component OpenSpec model in this brief, including creation triggers, the deferred Store decision, and the special M1.2 path for a narrow mobile-to-REST-API live-sync proof.
3. `define-core-domain-model` — establish product-level vocabulary and durable boundaries for entrepreneur, business, transaction, source/proposal, receipt, audit, and sync concepts without prescribing component code.
4. `define-api-contract-conventions` — establish versioning, idempotency, error, localization, traceability, and contract-publication rules before backend-dependent behavior is proposed.

`setup-sdd-product-context` is complete only for this planning root: the six-action workflow, OpenSpec context, and repository-owned governance already exist. It must be performed separately in each future component repository when that repository is approved and created.

## Gate Before M1 Manual-Offline Apply

The product team must confirm the following before applying the M1 manual offline transaction slice:

- the nonprofit-owned mobile repository location and its authorized implementation scope;
- Android-first versus dual-platform prototype target;
- synthetic-data-only policy for the prototype (recommended and required by current repository policy);
- initial language and currency assumptions;
- local SQLite-only phase 1 with sync-shaped statuses and no production backend; and
- the component repository's local validation plan, including offline persistence across application restart.

M1's speech and receipt/OCR slices remain subsequent changes. Their provider decisions may use mocks or local/device best effort for the prototype, but no external provider, paid service, or production data may be used without separate approval.

## Gate Before M1.2 Live-Sync REST API Apply

The revised V1 roadmap defines M1.2 as a narrow proof that a signed Android prototype can synchronize a confirmed synthetic transaction with one AWS-hosted Spring Boot REST API. It is an integration proof, not the full M2/M3 infrastructure and deployment foundation.

Before applying any M1.2 slice, the product team must confirm:

- the nonprofit-owned mobile, backend, and infrastructure repository locations and their authorized implementation scopes;
- the API-contract convention that governs the versioned transaction-sync endpoint, idempotency key, errors, and read-back evidence;
- the AWS account, development region, owned domain/hosted-zone approach, TLS ownership, spending limit, cost alarm, and shutdown rule;
- Terraform state ownership, remote encrypted state location, state access roles, and recovery expectations;
- GitHub organization/repository ownership, Actions OIDC permissions, development deploy approvers, and image/Helm provenance requirements;
- named-tester authentication for synthetic prototype access, with no reusable AWS credentials embedded in the mobile app or committed to Git;
- synthetic-data-only policy for the live proof; and
- the repository-local and cross-repository validation plan for offline durability, authenticated HTTPS sync, idempotent server persistence, failure/retry handling, smoke tests, rollback, and evidence capture.

M1.2 may extract the bare minimum from M2/M3 for the live proof, but it must not authorize production/pilot deployment, real participant data, broad identity/profile workflows, staff admin, reports, loans, inventory, AI assistance, GitOps/Argo CD, staging/production environments, or multi-service decomposition.

## Acceptance Criteria for This Foundation

- The planning root's ownership and component boundaries are documented without implying that future repositories already exist.
- Every expected product component has one owner repository or an explicit deferred creation trigger.
- The repository map prevents duplicate database, contract, shared-model, and per-module repositories at this stage.
- A central change and each affected component-local change have distinct responsibilities and linked evidence.
- OpenSpec Store use is explicitly deferred, with a manual durable-link fallback.
- M1 proposal and Apply gates distinguish planning authorization from repository creation, implementation authorization, external configuration, and provider use.
- M1.2 gates distinguish a narrow mobile-to-REST-API live-sync proof from full infrastructure, deployment, production, identity, and platform scope.
- The foundation preserves synthetic-only data, human-confirmed financial writes, offline-first behavior, and evidence-seeking impact claims.

## Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Empty repositories create maintenance burden before a slice needs them | Create each component repository only at its stated trigger. |
| A central plan becomes a cross-repository task dispatcher | Keep implementation tasks and tests local to the responsible component repository. |
| Beta Store behavior becomes a hidden dependency | Do not configure it now; use permanent Git links and commit identifiers. |
| Prototype pressure causes early AWS, account, or provider setup | Keep M1 phase 1 local and synthetic; require approval for external writes or costs. Treat M1.2 as a separately approved, narrow live-sync proof with explicit repository, AWS, domain, cost, tester-authentication, Terraform-state, deployment, and validation gates. |
| Component boundaries drift from product behavior | Require component proposals to cite the central change and use central system acceptance to close it. |
| Future components create overlapping models or contracts | Establish domain and contract conventions in separate M0 changes before backend-dependent work. |

## Next Action

Use this brief as the primary source for an OpenSpec proposal named `define-v1-product-guardrails`, followed by `define-cross-repository-architecture`. Those are planning-only changes in this repository. Do not create mobile, backend, or infrastructure repositories; configure AWS, domains, GitHub OIDC, Terraform state, or tester authentication; or start M1/M1.2 implementation until the relevant proposal is accepted and the separate repository/resource authorization is given.

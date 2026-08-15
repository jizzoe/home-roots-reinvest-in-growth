# cross-repository-architecture Specification

## Purpose

Defines the accepted cross-repository planning architecture for Invest in Growth, including repository boundaries, ownership, creation triggers, OpenSpec responsibilities, durable linkage, deferred Store use, and the special M1.2 live-sync proof path.

## Requirements

### Requirement: Planning repository remains the central product boundary
The planning repository SHALL own product-wide planning context, design briefs, architecture decisions, accepted cross-repository specifications, central OpenSpec change packages, coordination evidence, and system-acceptance evidence. It SHALL NOT own mobile, backend, staff-web, worker, or infrastructure implementation code.

#### Scenario: Product-level proposal is created
- **WHEN** a proposal defines product positioning, cross-component behavior, repository coordination, or system acceptance for Invest in Growth
- **THEN** it is created in the planning repository unless a later approved architecture change assigns a different central planning boundary

#### Scenario: Implementation code is proposed in the planning repository
- **WHEN** a proposal attempts to add mobile, backend, staff-web, worker, infrastructure, CI/CD, deployment, credential, or application test code to the planning repository
- **THEN** review blocks the proposal as outside the planning repository boundary

### Requirement: Component repository responsibilities are distinct
The architecture SHALL define separate component repository responsibilities for mobile, backend, infrastructure, staff web, and deployed worker work. Each component repository SHALL own its implementation code, repository-local OpenSpec changes, tests, builds, deployment definitions, migrations or configuration as applicable, validation evidence, and archive evidence.

#### Scenario: Mobile slice is proposed
- **WHEN** an approved mobile slice is ready to apply
- **THEN** the mobile repository owns Expo React Native and TypeScript source, SQLite/local-device behavior, build configuration, device validation, and mobile-local OpenSpec tasks

#### Scenario: Backend slice is proposed
- **WHEN** an approved backend or sync slice is ready to apply
- **THEN** the backend repository owns Spring Boot source, published executable API descriptions, migrations, service tests, container build, and backend-local OpenSpec tasks

#### Scenario: Infrastructure slice is proposed
- **WHEN** an approved infrastructure slice is ready to apply
- **THEN** the infrastructure repository owns Terraform, environment definitions, deployment permissions, infrastructure validation, recovery evidence, and infrastructure-local OpenSpec tasks

### Requirement: Component repository creation uses explicit triggers
No component repository SHALL be created merely to reserve a future boundary. A component repository SHALL be created only when a reviewed and accepted planning change identifies the repository role, owner, scope, validation expectations, and creation trigger.

#### Scenario: M1 manual offline slice is ready
- **WHEN** the M1 manual-offline Android prototype slice is approved for Apply
- **THEN** a nonprofit-owned mobile repository may be created only after the repository location, access model, implementation scope, and mobile validation plan are explicitly approved

#### Scenario: M1.2 live-sync proof is ready
- **WHEN** an M1.2 REST API, Terraform/AWS, or deployment proof slice is approved for Apply
- **THEN** backend and infrastructure repositories may be created only after repository locations, ownership, scopes, external-resource gates, and validation plans are explicitly approved

#### Scenario: Future staff web or worker work is ready
- **WHEN** M10 staff-web work or an independently deployed worker boundary is approved for Apply
- **THEN** the relevant component repository may be created only after its repository-specific scope and validation plan are approved

### Requirement: Unnecessary repositories are prohibited initially
The architecture SHALL NOT create separate initial repositories for database schema, REST contracts, shared DTOs or models, individual backend modules, end-to-end tests, or reusable assistant skills.

#### Scenario: Separate database repository is proposed
- **WHEN** a proposal creates a standalone database-schema or migration repository before a backend ownership change approves it
- **THEN** review rejects the proposal because database schema and migrations remain with the backend service

#### Scenario: Shared model repository is proposed
- **WHEN** a proposal creates shared DTO or model packages for TypeScript and Java before a contract convention requires them
- **THEN** review rejects the proposal because component models evolve through versioned contracts rather than shared implementation packages

### Requirement: Central and component OpenSpec responsibilities are separated
Central OpenSpec changes SHALL define product contracts, cross-component requirements, affected repository roles, system acceptance scenarios, and residual cross-repository risks. Component-local OpenSpec changes SHALL define repository-local implementation tasks, code/configuration changes, tests, builds, migrations, deployment changes, validation commands, and archive evidence.

#### Scenario: Central change coordinates multiple components
- **WHEN** a central change requires mobile, backend, infrastructure, or other component behavior
- **THEN** it names affected component repository roles, contract expectations, and system acceptance evidence without assigning file-level implementation tasks across those repositories

#### Scenario: Component change implements central behavior
- **WHEN** a component repository implements behavior governed by a central change
- **THEN** its local OpenSpec change cites the central change identifier and source revision, defines local tasks and checks, and records component validation evidence

### Requirement: Durable manual linkage is required while Store use is deferred
Until an approved OpenSpec Store or equivalent reference model exists, central and component work SHALL use durable manual links that identify the central repository URL or path, branch, commit or revision, change identifier, relevant capability/spec path, affected component repository, and component change identifier.

#### Scenario: Component proposal links to central contract
- **WHEN** a component proposal is created from a central planning change
- **THEN** it records the central change name, central source revision, relevant central spec or delta path, and the component repository/change identifier

#### Scenario: Central verification reviews component evidence
- **WHEN** central verification evaluates cross-repository behavior
- **THEN** it records links to each component repository revision, component change, validation command results, and evidence artifacts used for system acceptance

### Requirement: OpenSpec Store use remains deferred
The architecture SHALL NOT configure an OpenSpec Store, reference, workset, or other shared Store model until a separate approved change defines nonprofit ownership, compatibility with the pinned OpenSpec workflow, recovery behavior, migration path, validation commands, and rollback plan.

#### Scenario: Store configuration is proposed during M0
- **WHEN** a proposal attempts to configure Store, references, or worksets as part of M0 repository architecture
- **THEN** review blocks the proposal and retains durable manual links as the approved interim coordination method

#### Scenario: Future Store evaluation is proposed
- **WHEN** a later change proposes Store adoption
- **THEN** it includes pinned-version compatibility evidence, ownership model, recovery plan, migration plan, validation contract, and rollback plan before Apply

### Requirement: M1.2 live-sync proof has a special gated path
The architecture SHALL allow M1.2 to pull forward only the bare minimum backend, infrastructure, and deployment work needed to prove one Android prototype-to-Spring-Boot-REST-API synthetic transaction sync path. M1.2 SHALL NOT become the full M2 infrastructure foundation, M3 deployment foundation, production deployment, identity platform, admin portal, reporting system, loan workflow, AI system, or multi-service architecture.

#### Scenario: M1.2 slice proposes live REST sync
- **WHEN** an M1.2 slice proposes mobile-to-REST-API sync
- **THEN** it is limited to signed Android prototype integration, local-first outbox/idempotency behavior, named tester access, one Spring Boot modular-monolith API, one synthetic transaction sync endpoint, PostgreSQL persistence, and development-only evidence

#### Scenario: M1.2 slice pulls forward external resources
- **WHEN** an M1.2 slice requires AWS, domain/TLS, Terraform state, GitHub OIDC, ECR, EKS, PostgreSQL, Secrets Manager, tester authentication, or cost controls
- **THEN** it requires explicit approval of ownership, scope, access, budget, recovery, and validation before any external write or provisioning occurs

#### Scenario: M1.2 expands into platform scope
- **WHEN** an M1.2 proposal includes production or pilot deployment, real participant data, broad identity/profile workflows, staff admin, reports, loans, inventory, AI assistance, GitOps, staging/production environments, or multi-service decomposition
- **THEN** review rejects that expansion unless a separate approved product and architecture change authorizes it

### Requirement: External writes and sensitive data require separate approval
The architecture SHALL require just-in-time approval before any repository creation, GitHub/AWS/domain/vendor account work, infrastructure provisioning, deployment, CI/CD configuration, credential creation, paid service, production data path, or use of participant, enterprise, financial, operational, personal, or sensitive data.

#### Scenario: Architecture proposal is reviewed
- **WHEN** this cross-repository architecture change is reviewed or applied
- **THEN** it remains limited to planning artifacts and does not authorize external writes or implementation

#### Scenario: Future component work needs external state
- **WHEN** a future component proposal needs external repositories, cloud resources, domains, credentials, deployments, paid services, or sensitive data
- **THEN** it pauses for explicit approval with ownership, cost, access, recovery, validation, and data-handling boundaries

### Requirement: Follow-on domain and API planning is required
The architecture SHALL identify `define-core-domain-model` and `define-api-contract-conventions` as follow-on planning changes before backend-dependent behavior or M1.2 API synchronization can be accepted for implementation.

#### Scenario: Backend-dependent slice is proposed
- **WHEN** a future slice depends on transaction vocabulary, sync semantics, idempotency, API versioning, errors, localization, traceability, or contract publication
- **THEN** review confirms `define-core-domain-model` and `define-api-contract-conventions` have been proposed and accepted or blocks the slice until the relevant contract exists

#### Scenario: Follow-on work is sequenced
- **WHEN** `define-cross-repository-architecture` is reviewed
- **THEN** the next planning changes are `define-core-domain-model` and `define-api-contract-conventions`

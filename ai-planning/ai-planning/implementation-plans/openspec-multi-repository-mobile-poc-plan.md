# OpenSpec Multi-Repository Mobile Proof-Of-Concept Plan

Date: 2026-08-08

Status: Draft for review and revision

Implementation authorization: None. This document is a plan only.

Handoff status: Not created. Create a separate handoff only after this plan is reviewed, revised, and approved.

Related documents:

- ../../PROJECT_SUMMARY.md
- research-to-prototype-implementation-plan.md
- ../../research/tech-research/openspec-adoption-decision-and-structure.md
- ../../research/tech-research/phase-01-mobile-foundation-react-native-expo-typescript.md
- ../../research/tech-research/phase-02-offline-first-sqlite-sync-architecture.md
- ../../research/tech-research/phase-03-thin-backend-sync-slice-spring-boot-modular-monolith.md
- ../../research/tech-research/nonprofit-cost-programs-running-list.md

## Purpose

This plan defines the repository structure and OpenSpec workflow for the first two vertical slices of the mobile bookkeeping proof of concept:

1. Foundation accounts and repository readiness.
2. One-screen transaction entry from mobile through a Spring Boot API to PostgreSQL on AWS.

It also explains how specification-driven development works when one product change spans multiple repositories.

## Executive Recommendation

Use these repository boundaries:

1. One central product-planning repository containing the canonical cross-repository OpenSpec Store.
2. One Expo React Native mobile repository.
3. One Spring Boot backend repository implemented as a modular monolith.
4. One AWS infrastructure-as-code repository.
5. One staff web repository, created when staff-web work begins.
6. One independently deployed workers repository, created when the first AI, speech, OCR, or document worker begins.

Do not create separate repositories for the database, REST contracts, shared DTOs, backend domain modules, or end-to-end tests.

For each cross-repository slice:

1. A central product change defines the shared outcome and behavior.
2. Each affected code repository creates a small local implementation change.
3. Local changes cite the central change and contract version.
4. Each repository owns its branch, tasks, tests, review, and pull request.
5. The central change remains open until the integrated behavior passes.
6. The central change is archived only after component work is merged and end-to-end acceptance succeeds.

OpenSpec Stores and references directly support this model, but they are currently beta. The plan therefore requires version pinning and a manual-link fallback.

## Terminology Decision: Service, Not Microservice Architecture

The first backend is one deployable Spring Boot network service. It is not the first of several microservices.

The backend remains a modular monolith:

- one backend repository;
- one Spring Boot deployable;
- one primary PostgreSQL database;
- explicit in-process domain-module boundaries;
- no network calls between internal modules.

Calling it a service is accurate. Calling it a microservice would imply a distributed architecture that the project has intentionally rejected for the MVP.

## Scope

This plan covers:

- recommended repositories for all planned components;
- nonprofit ownership and developer access;
- OpenSpec Store and local-repository structure;
- cross-repository specification and execution;
- acceptance, testing, review, CI, and archive conventions;
- the foundation account-and-repository slice;
- the one-screen end-to-end transaction slice;
- AWS runtime and PostgreSQL shape;
- risks, costs, alternatives, and deferred work.

## Non-Goals

This step does not:

- create repositories or vendor accounts;
- install or initialize OpenSpec;
- select the exact OpenSpec version;
- create OpenSpec changes;
- scaffold or modify application code;
- provision AWS resources;
- create the handoff document;
- implement SQLite, offline sync, authentication, ledger posting, receipts, speech, OCR, translation, AI, reports, loans, or staff UI.

## Specification-Driven Development 101

### What A Specification Is

A specification describes observable behavior that must be true.

~~~text
The mobile application shall allow a user to submit a sale with a positive amount.
~~~

It should not name React components, Java classes, or CDK stacks unless those are actual constraints. Those details belong in designs and tasks.

### Why It Helps With AI-Assisted Coding

Without a reviewed contract, different AI sessions may invent different:

- endpoint paths;
- field names;
- validation rules;
- retry behavior;
- repository responsibilities;
- definitions of done.

A specification narrows that decision space before implementation becomes expensive.

### OpenSpec Artifacts

OpenSpec separates accepted behavior from proposed behavior:

~~~text
openspec/
+-- specs/       accepted behavior
+-- changes/     proposed or active changes
~~~

An active change normally progresses through:

~~~text
proposal -> specifications -> design -> tasks -> implementation
   why           what          how      steps
~~~

- The proposal states outcome, motivation, scope, and non-goals.
- Delta specifications define added, modified, or removed behavior.
- The design records consequential technical decisions.
- Tasks define ordered implementation work.
- Archiving folds verified deltas into current specifications.

### Requirements And Scenarios

A requirement states behavior. A scenario makes it testable.

~~~gherkin
Requirement: Submit a transaction

GIVEN the user selected Sale
AND entered a valid positive amount
WHEN the user presses Save
THEN the backend stores the transaction once
AND the mobile app displays the server-assigned identifier
~~~

### Specifications, Designs, And Tasks

- A specification says what must be true.
- A design says how the affected components will make it true.
- A task says what work to perform.

Completing every task does not prove the requirement works. Acceptance evidence does.

## Vertical Slices 101

A vertical slice delivers one small capability through every layer required to make it observable.

Slice 2 follows this path:

~~~text
Mobile page
  -> HTTPS REST request
  -> Spring Boot endpoint
  -> validation and persistence
  -> PostgreSQL table
  -> response
  -> mobile confirmation
~~~

This exposes integration problems early while the UI and domain model remain small.

Slice 1 is an enablement slice. Its observable result is nonprofit-owned accounts, delegated developer access, repositories, cost controls, and a working cross-repository planning path.

Slice 2 is a product slice. Its observable result is a mobile transaction stored in PostgreSQL through the deployed backend.

## Recommended Repositories

All repositories should be owned by a GitHub organization controlled by the nonprofit.

| Repository | Responsibility | Create |
|---|---|---|
| home-roots-bookkeeping-product | Product specs, central OpenSpec Store, guardrails, ADRs, cross-repo coordination | Slice 1 |
| home-roots-bookkeeping-mobile | Expo React Native iOS and Android app | Slice 1 |
| home-roots-bookkeeping-backend | Spring Boot modular monolith, API, migrations, container | Slice 1 |
| home-roots-bookkeeping-infrastructure | AWS CDK TypeScript, environments, deployment workflows | Slice 1 |
| home-roots-bookkeeping-staff-web | React, Vite, TypeScript, Material UI staff app | When staff slice begins |
| home-roots-bookkeeping-workers | Independently deployed Python document, speech, and AI workers | When first worker begins |

The reusable SDLC skills should remain in their own general-purpose repository because they apply to more than this product.

### Product Repository

The product repository owns:

- current system-level specifications;
- cross-component OpenSpec changes;
- project guardrails;
- architecture decision records;
- system acceptance criteria;
- links among component branches and pull requests;
- final end-to-end evidence references.

It contains no application source code.

### Mobile Repository

The mobile repository owns:

- Expo and React Native source;
- TypeScript and mobile tests;
- iOS and Android identifiers;
- Expo and EAS project configuration;
- mobile build workflows;
- local OpenSpec implementation changes.

### Backend Repository

The backend repository owns:

- one Spring Boot application;
- modular-monolith boundaries;
- REST API implementation;
- executable OpenAPI description;
- Flyway migrations;
- backend and database integration tests;
- container image;
- local OpenSpec implementation changes.

Backend modules such as organizations, transactions, loans, audit, and reporting remain packages or modules in this repository.

### Infrastructure Repository

The infrastructure repository owns:

- AWS CDK TypeScript;
- networking, database, runtime, DNS, TLS, logs, and alarms;
- GitHub Actions deployment roles and workflows;
- infrastructure assertions and cloud smoke tests;
- local OpenSpec implementation changes.

### Deferred Repositories

Create staff-web and workers only when their first slice begins. Reserving names is optional; empty repositories add little value.

### Repositories Not Recommended

Do not initially create:

- a database repository, because migrations belong with the backend;
- a contracts repository, because central specs own behavior and the backend publishes OpenAPI;
- a shared-model repository, because mobile TypeScript and Java persistence models should not be tightly coupled;
- one repository per backend module;
- an end-to-end test repository;
- a separate CI-template repository before duplication exists.

## Multi-Repository Tradeoff

A monorepo would be faster for a solo proof of concept. Multiple repositories add branches, pull requests, CI setup, contract coordination, and more chances for configuration drift.

This plan accepts that overhead because the project explicitly wants to exercise cross-repository vertical slices. It limits the cost by keeping the backend together and deferring unused repositories.

After two slices, review whether separate repositories are producing useful boundaries or only ceremony.

## OpenSpec Multi-Repository Structure

### Central Product Store

~~~text
home-roots-bookkeeping-product/
+-- .openspec-store/
|   +-- store.yaml
+-- openspec/
|   +-- config.yaml
|   +-- specs/
|   +-- changes/
+-- docs/
|   +-- project-guardrails.md
|   +-- architecture/decisions/
+-- README.md
~~~

Recommended Store identifier:

~~~text
home-roots-bookkeeping-product
~~~

### Component Repository Root

Each code repository keeps its own OpenSpec root and references the central Store:

~~~yaml
schema: spec-driven
references:
  - id: home-roots-bookkeeping-product
    remote: <nonprofit-owned product repository clone URL>
~~~

A Store pointer would send all planning to the central repository. A reference instead gives the component read-only product context while preserving local component changes. The reference model is required here.

### Two Planning Layers

The central change answers:

~~~text
What behavior must the complete product slice deliver?
~~~

The local change answers:

~~~text
What must this repository implement to satisfy its portion?
~~~

This is not intended duplication. The central spec avoids file and class details. Local designs and tasks may include them.

### OpenSpec Does Not Dispatch Cross-Repo Tasks

OpenSpec does not split a central task list and route tasks into repositories. Each affected repository therefore needs its own local change and apply/review cycle.

### Referencing An Active Central Change

Reference indexes primarily expose accepted Store specs. While the central slice is still active, each local change must:

1. Cite the central change identifier.
2. Cite its branch or pull request.
3. Pin the central commit used for implementation.
4. Read the active change explicitly.
5. Link its component pull request back to the central change.

Do not move unimplemented behavior into current specs merely to simplify references.

### Beta Risk And Fallback

Stores, references, and worksets are beta.

Required mitigations:

- pin one tested OpenSpec version across all repositories and CI;
- commit Markdown artifacts normally;
- validate Store health and references;
- document registration and recovery;
- keep durable facts in repository files rather than a local workset.

Fallback:

1. Keep the product repository as a normal Git/OpenSpec repository.
2. Keep local OpenSpec roots in code repositories.
3. Link the exact central branch and commit manually.
4. Have SDLC skills read the central checkout directly.
5. Preserve the same slice and acceptance identifiers.

## OpenSpec Version Policy

Slice 1 will:

1. Resolve the current stable OpenSpec version.
2. Test Store and reference behavior with that version.
3. Record the exact version in every repository.
4. Use exact versions in local and CI commands, never floating latest.
5. Commit generated integration files and configuration.
6. Document upgrades.
7. Upgrade only through a reviewed change.

The exact version and invocation belong in the later handoff because they must reflect what was actually tested.

## Guardrails And SDLC Skills

The product repository will own docs/project-guardrails.md.

It should include:

- one shared mobile codebase for iOS and Android;
- offline-first as a core requirement, although deferred from Slice 2;
- modular-monolith backend;
- deterministic financial validation;
- idempotent retry behavior;
- AI proposal-only boundaries;
- traceability for sensitive actions;
- plain-language mobile UI;
- nonprofit ownership of production assets;
- no secrets in source control;
- cost and nonprofit-benefit review before paid adoption.

OpenSpec configuration should summarize and link to the guardrails rather than duplicate them.

The external SDLC skills should read:

- central proposal and delta specs;
- local proposal, design, and tasks;
- project guardrails;
- repository standards;
- changed code and tests.

They should govern:

- coding standards and clean code;
- architecture-boundary review;
- test strategy and test quality;
- static checks and builds;
- security and dependency review;
- diff-based regression review;
- code-review severity and reporting;
- pull-request readiness.

Recommended precedence:

1. Legal, security, and platform restrictions.
2. Approved product specs and project guardrails.
3. Approved local specs and designs.
4. Repository standards and SDLC skills.
5. Tasks.
6. Ad hoc prompts.

Resolve conflicts in the artifact that owns the decision before implementation continues.

## Cross-Repository Conventions

### Slice And Change Names

~~~text
VS-001-foundation-accounts-and-repositories
VS-002-one-screen-transaction-entry
~~~

Slice 2 changes:

~~~text
Central:
  vs-002-one-screen-transaction-entry

Local:
  vs-002-mobile-transaction-entry
  vs-002-backend-transaction-intake
  vs-002-infrastructure-transaction-runtime
~~~

### Acceptance Identifiers

System criteria use VS1-ACxx and VS2-ACxx. Component criteria may use MOB-ACxx, API-ACxx, and INFRA-ACxx.

Only identify requirements and scenarios that require traceability. Do not number every sentence.

### Contract Version

Slice 2 uses:

~~~text
transaction-intake-contract: 1
~~~

Mobile and backend local changes must cite the same version and central commit.

### Branches And Pull Requests

Recommended local branch names:

~~~text
feature/vs-002-mobile-transaction-entry
feature/vs-002-backend-transaction-intake
feature/vs-002-infrastructure-transaction-runtime
~~~

Each pull request includes:

- slice identifier;
- central change link and commit;
- local OpenSpec change path;
- acceptance criteria supported;
- test evidence;
- deployment or migration notes;
- known limitations;
- rollback approach;
- dependent pull-request links.

### Archive Convention

Use archive-after-merge:

1. Review active specs and code together.
2. Merge component pull requests after local checks pass.
3. Archive local changes after merge.
4. Run central system acceptance.
5. Merge and archive the central change only after the complete slice works.

## Cross-Repository Execution

For each slice:

1. Explore outcome, alternatives, risks, and affected repositories.
2. Create the central product change.
3. Define shared requirements, scenarios, and contracts.
4. Define component responsibilities and integration order.
5. Stop for developer plan approval.
6. Create local changes in affected repositories.
7. Lock the central commit and contract version.
8. Implement and test each component.
9. Run local SDLC skills and code review.
10. Open linked component pull requests.
11. Merge in dependency order.
12. Deploy the integrated development environment.
13. Execute central acceptance criteria.
14. Correct code or artifacts when they disagree.
15. Archive local changes.
16. Record evidence and archive the central change.

## Pull Request And CI Baseline

Every code repository should eventually require:

- pull requests to main;
- successful build;
- formatting and lint checks;
- unit and applicable integration tests;
- dependency and secret review;
- SDLC code-review pass;
- resolved review comments;
- explicit approval for sensitive infrastructure or financial changes.

An independent AI review is useful but is not equivalent to accountable human approval. The developer remains the approver.

Use GitHub Actions OIDC for AWS deployment roles rather than long-lived AWS access keys.

## Slice 1: Foundation Accounts And Repositories

### Outcome

The nonprofit owns required accounts and repositories, the developer has delegated access, recovery and costs are visible, and the repositories required for Slice 2 share a working OpenSpec context.

### Ownership Principle

The nonprofit owns:

- cloud accounts and billing;
- GitHub organization and repositories;
- Apple and Google developer accounts;
- Expo Organization and app identifiers;
- domain, DNS, email, and recovery channels;
- production applications and data.

The developer receives an individual invited identity with required permissions.

Do not use personal app-store ownership, share root passwords, or make recovery depend on the developer.

### Required Nonprofit Inputs

- legal organization name;
- nonprofit registration and tax documentation;
- EIN or equivalent;
- D-U-N-S number or request status;
- official website;
- organization email domain and phone;
- legally authorized signer;
- nonprofit payment method;
- recovery contacts;
- approved developer invitation email.

The authorized representative performs or approves legal enrollments. The developer can prepare instructions and technical configuration but cannot claim legal authority the developer does not possess.

### Account Matrix

| Service | Owner | Developer role | Slice 1 action |
|---|---|---|---|
| Domain and organization email | Nonprofit | Delegated technical access | Establish vendor verification and recovery identities |
| D-U-N-S profile | Nonprofit legal entity | Assist with lookup only | Verify legal record for Apple and Google |
| GitHub Organization | Nonprofit | Scoped org or repository admin | Create first four repositories and controls |
| OpenSpec | No hosted account required | Operate pinned CLI | Validate Store/reference workflow |
| AWS Organization management account | Nonprofit | No routine root access | Governance, billing, credits |
| AWS development account | Nonprofit AWS Organization | IAM Identity Center permission set | Host Slice 2 |
| Expo Organization | Nonprofit | Admin or least sufficient role | Own project and EAS credentials |
| Apple Developer Program Organization | Nonprofit Account Holder | Invited Developer/Admin | Request fee waiver and prepare iOS distribution |
| Google Play organization account | Nonprofit owner | Invited admin/app role | Prepare Android distribution |
| TechSoup or validation partner | Nonprofit | Assist only | Apply for eligible nonprofit benefits |
| DNS provider | Nonprofit | Delegated DNS role | Provide HTTPS API hostname |
| Credential vault | Nonprofit | Individual access | Store recovery material outside Git |

### GitHub Setup

1. Create a nonprofit-owned organization.
2. Assign at least two owners for continuity, ideally nonprofit representatives.
3. Give the developer only required setup permissions.
4. Create product, mobile, backend, and infrastructure repositories.
5. Keep them private initially.
6. Require two-factor authentication.
7. Restrict default member access.
8. Protect main and require baseline checks.
9. Enable available dependency and secret protections.
10. Record owners and recovery contacts.

### AWS Setup

Minimum:

~~~text
AWS Organization
+-- Management account     organization and billing only
+-- Development account    proof-of-concept workloads
~~~

Requirements:

- nonprofit-controlled root email aliases and recovery;
- MFA and no root access keys;
- no workloads in the management account;
- IAM Identity Center organization instance;
- named developer identity and development permission set;
- nonprofit billing contacts;
- AWS Budget alerts before workloads;
- basic activity logging;
- GitHub Actions OIDC deployment role;
- nonprofit-credit application and expiration tracking.

Create production and security accounts before real users or real data, not for this proof of concept.

### Apple Setup

1. Verify legal entity and D-U-N-S data.
2. Have an authorized nonprofit representative enroll as an organization.
3. Request the eligible nonprofit fee waiver.
4. Keep that representative as Account Holder.
5. Invite the developer with required app and certificate access.
6. Reserve the bundle identifier under the nonprofit team.
7. Record annual eligibility and recovery responsibilities.

### Google Play Setup

1. Choose an organization account.
2. Use nonprofit legal identity and D-U-N-S data.
3. Keep the authorized nonprofit representative as owner.
4. Invite the developer through Users and permissions.
5. Grant app and release permissions without sharing the owner login.
6. Reserve the package name.
7. Record current verification and package-registration deadlines.

### Expo Setup

1. Create a nonprofit-owned Expo Organization.
2. Keep a nonprofit representative as Owner.
3. Invite the developer as Admin or least sufficient role.
4. Associate the project with the Organization owner configuration.
5. Start with the free plan.
6. Use Expo Go for the earliest loop and development/EAS builds when required.

### OpenSpec And Repository Bootstrap

Product repository:

- pin and initialize OpenSpec;
- register the product Store;
- add project context and guardrail links;
- define capability naming;
- document Store registration and validation.

Code repositories:

- initialize local OpenSpec;
- reference the product Store;
- add repository context;
- add PR and CI skeletons;
- create local Slice 1 setup changes;
- validate Store context.

### Slice 1 Changes

Central:

~~~text
vs-001-foundation-accounts-and-repositories
~~~

Local:

~~~text
vs-001-mobile-repository-and-expo-readiness
vs-001-backend-repository-readiness
vs-001-infrastructure-aws-readiness
~~~

### Slice 1 Acceptance Criteria

- **VS1-AC01:** The nonprofit controls legal ownership and recovery for every created vendor account.
- **VS1-AC02:** The developer uses invited identities, not root or Account Holder credentials.
- **VS1-AC03:** The first four repositories exist under the nonprofit GitHub organization.
- **VS1-AC04:** Main protections and required baseline checks are configured.
- **VS1-AC05:** AWS workloads are excluded from the management account and the developer can access development through IAM Identity Center.
- **VS1-AC06:** AWS Budget alerts exist before chargeable deployment.
- **VS1-AC07:** Apple enrollment or pending prerequisites are documented and nonprofit-owned, including the fee-waiver path.
- **VS1-AC08:** Google Play enrollment or pending prerequisites are documented and nonprofit-owned.
- **VS1-AC09:** The nonprofit-owned Expo Organization can own the project and delegate access.
- **VS1-AC10:** The central Store and all component references validate with one pinned OpenSpec version.
- **VS1-AC11:** The account inventory records owners, roles, recovery contacts, cost, nonprofit benefit, renewal, and status without secrets.
- **VS1-AC12:** The nonprofit cost research list is updated for each paid service encountered.

### Evidence And Secret Handling

Evidence may include:

- safe account identifiers and status;
- redacted role records;
- repository and ruleset links;
- OpenSpec version and validation output;
- AWS account aliases and role assignment;
- budget configuration;
- enrollment confirmations or pending status;
- bundle and package identifiers.

Never store passwords, MFA seeds, recovery codes, access keys, private keys, or payment details in Git.

### Slice 1 Stop Condition

Slice 1 is complete when Slice 2 can proceed without personal ownership or shared privileged credentials.

Apple or Google approval may remain pending if all nonprofit actions are complete, status is documented, local/development-build paths can continue, and public distribution remains explicitly blocked.

## Slice 2: One-Screen Transaction Entry End To End

### Outcome

One Expo React Native page running on iOS and Android submits a sale or expense over HTTPS to a deployed Spring Boot backend. The backend validates it, stores one transaction-intake row in PostgreSQL, and returns a durable server identifier displayed by the app.

### Flow

~~~text
User
  -> Expo transaction page
  -> POST /api/v1/mobile-sync/transactions
  -> AWS HTTPS endpoint
  -> Spring Boot mobile-sync boundary
  -> transaction-intake validation
  -> PostgreSQL
  -> 201 response
  -> mobile success state
~~~

### Repositories

| Repository | Responsibility |
|---|---|
| product | Shared behavior, REST contract, acceptance, coordination |
| mobile | Page, request client, validation, status, iOS/Android checks |
| backend | Endpoint, validation, idempotency, persistence, migration, container |
| infrastructure | AWS network, runtime, database, TLS, secrets, logs, deployment |

Staff-web and workers are not involved.

### POC Constraints

- one development environment;
- one fixed organization ID;
- one fixed business ID;
- one configured currency;
- one transaction_intake table;
- one backend deployable;
- no real users or real financial data;
- no production authentication;
- no unrestricted anonymous internet access;
- no SQLite queue yet;
- no receipts, speech, translation, OCR, AI, ledger, reports, loans, or staff UI.

### Mobile Page

The page contains:

- business-name placeholder;
- Sale and Expense segmented selection;
- amount;
- optional short note;
- Save;
- idle, submitting, success, and error status;
- server transaction identifier after success.

Behavior:

- require type and positive amount;
- convert decimal display amount to integer minor units;
- prevent repeat Save while in flight;
- generate client transaction and idempotency UUIDs;
- reuse the same idempotency key for the same retry;
- show plain-language success or error;
- expose no stack traces or secrets.

### Proposed REST Contract

~~~text
transaction-intake-contract: 1
~~~

~~~http
POST /api/v1/mobile-sync/transactions
Content-Type: application/json
Idempotency-Key: <UUID>
~~~

~~~json
{
  "clientTransactionId": "UUID",
  "organizationId": "UUID",
  "businessId": "UUID",
  "type": "SALE",
  "amountMinor": 1250,
  "currencyCode": "USD",
  "note": "Optional short note"
}
~~~

~~~json
{
  "clientTransactionId": "UUID",
  "serverTransactionId": "UUID",
  "serverRevision": 1,
  "status": "ACCEPTED"
}
~~~

Required behavior:

- valid request returns 201;
- invalid request returns 400 and inserts nothing;
- same idempotency key and payload return the original success;
- same key with different payload returns 409;
- unexpected errors return safe 5xx responses with correlation IDs;
- no floating-point money.

The central and backend changes will produce the exact OpenAPI representation.

### PostgreSQL Table

One Flyway migration creates transaction_intake:

| Column | Type | Purpose |
|---|---|---|
| id | UUID primary key | Server identifier |
| organization_id | UUID not null | Fixed POC tenant |
| business_id | UUID not null | Fixed POC business |
| client_transaction_id | UUID not null | Mobile identity |
| idempotency_key | UUID unique not null | Retry deduplication |
| payload_hash | text not null | Detect key reuse with changed payload |
| transaction_type | varchar not null | SALE or EXPENSE |
| amount_minor | bigint not null | Integer money |
| currency_code | char(3) not null | Currency |
| note | varchar nullable | Optional bounded note |
| server_revision | bigint not null | Starts at 1 |
| created_at | timestamptz not null | Server time |

Constraints validate positive amount, allowed type, uppercase currency, bounded note, and client-transaction uniqueness.

This table is intake, not the eventual double-entry ledger. A separate audit table is deliberately deferred from this connectivity slice and must be added before this path is treated as production financial posting.

### Backend Shape

Initial internal boundaries:

~~~text
mobileSync
  -> HTTP mapping and idempotency orchestration

transactionIntake
  -> deterministic validation and persistence

sharedKernel
  -> minimal shared value types
~~~

The backend includes:

- pinned Java and Spring Boot baselines;
- Spring Web and validation;
- PostgreSQL driver and Flyway;
- selected persistence approach;
- Actuator health;
- structured logging and correlation IDs;
- architecture-boundary tests;
- container image;
- real PostgreSQL integration tests.

Authentication is deferred only for non-production connectivity testing. Fixed IDs, no real data, and a later authentication slice are mandatory guardrails.

### AWS Shape

Development environment:

- nonprofit AWS development account;
- one Region;
- VPC and security groups;
- RDS PostgreSQL in private subnets;
- Secrets Manager;
- ECR;
- ECS Fargate;
- public Application Load Balancer;
- Route 53 and ACM for HTTPS;
- CloudWatch logs and health checks;
- AWS Budget alerts;
- GitHub Actions OIDC roles.

For Slice 2, public describes the load balancer's routing capability, not unrestricted access. Its listener security group must allow HTTPS only from explicitly configured developer/test-network egress CIDRs. The allowlist can be updated for approved device testing. Opening the write endpoint to the general internet requires an approved authentication and abuse-protection design and is outside this slice.

Cost constraints:

- one environment;
- small supported RDS class;
- single-AZ;
- one minimal Fargate task where practical;
- short log retention;
- no NAT Gateway unless explicitly justified;
- no Aurora, WAF, multi-region, or production redundancy.

The infrastructure design must explicitly solve required outbound access without casually adding NAT cost.

### Local-First Integration

Before cloud deployment:

1. Start disposable local PostgreSQL.
2. Run Spring Boot locally.
3. Apply Flyway.
4. Submit a known request.
5. Verify one row.
6. Retry and verify no duplicate.
7. Connect Expo through supported emulator/device networking.
8. Pass mobile, backend, and contract tests.

### Cloud Order

1. Deploy network, database, secret, ECR, logging, and deployment roles.
2. Run infrastructure and security checks.
3. Build and test backend.
4. Push an immutable container image.
5. Deploy Fargate service.
6. Apply migration using the approved strategy.
7. Verify health and TLS.
8. Configure mobile development build with HTTPS API URL.
9. Run Android acceptance.
10. Run iOS acceptance.
11. Verify rows, idempotency, logs, and secret handling.

### Slice 2 Changes

Central:

~~~text
vs-002-one-screen-transaction-entry
~~~

Local:

~~~text
vs-002-mobile-transaction-entry
vs-002-backend-transaction-intake
vs-002-infrastructure-transaction-runtime
~~~

Every local proposal cites VS-002, the central change and commit, contract version 1, supported criteria, and dependencies.

### Slice 2 Acceptance Criteria

- **VS2-AC01:** One TypeScript codebase renders the page on iOS and Android.
- **VS2-AC02:** A user can select Sale or Expense and enter a positive amount.
- **VS2-AC03:** Invalid input is rejected before a request.
- **VS2-AC04:** Save sends contract version 1 over HTTPS.
- **VS2-AC05:** Backend validation covers type, amount, currency, IDs, and note length.
- **VS2-AC06:** One valid request creates one row and returns a server ID.
- **VS2-AC07:** Same key and payload do not create a duplicate.
- **VS2-AC08:** Same key with changed payload returns 409 and no new row.
- **VS2-AC09:** Mobile displays plain-language success and the server ID.
- **VS2-AC10:** Mobile displays a safe error when API submission fails.
- **VS2-AC11:** PostgreSQL is not publicly reachable.
- **VS2-AC12:** Credentials are absent from source, app bundles, and logs.
- **VS2-AC13:** Health and correlation data are visible in CloudWatch without sensitive payload logging.
- **VS2-AC14:** Mobile, backend, infrastructure, contract, and cloud smoke tests pass.
- **VS2-AC15:** No real recipient or financial data is used.
- **VS2-AC16:** Cost monitoring and deployed-resource inventory are current.
- **VS2-AC17:** The development write endpoint rejects traffic outside the approved test-network CIDR allowlist.

### Verification

Mobile:

- TypeScript, lint, and formatting;
- component tests for selection, validation, submission, success, error, and retry;
- request-client contract test;
- iOS and Android device checks.

Backend:

- compile and formatting;
- unit validation and payload-hash tests;
- idempotency and API contract tests;
- PostgreSQL/Testcontainers integration;
- Flyway test;
- architecture test;
- container health test.

Infrastructure:

- TypeScript, lint, CDK synth;
- infrastructure assertions;
- policy and security review;
- deployment smoke test;
- DB reachability and TLS checks;
- log and budget checks;
- retention/destroy review.

System:

- submit Sale from Android and verify response and row;
- submit Expense from iOS and verify response and row;
- retry and verify row count does not increase;
- submit invalid input and verify no row;
- verify mobile failure behavior against an unavailable API;
- link redacted evidence, CI, PRs, deployment, and logs.

### Definition Of Done

Slice 2 is done when:

- central artifacts are approved;
- local changes use the same contract;
- all component PRs are merged;
- AWS is deployed from CDK;
- iOS and Android paths pass;
- persistence and retry behavior are demonstrated;
- SDLC reviews pass;
- limitations and costs are recorded;
- local changes are archived;
- central behavior is verified and archived.

## Parallel Work

Slice 1 can parallelize legal/D-U-N-S verification, GitHub preparation, AWS nonprofit research, Apple and Google enrollment preparation, Expo setup, and domain/email setup.

Only the nonprofit authorized representative performs legal agreements, Account Holder ownership, AWS root/billing ownership, payment setup, and nonprofit applications.

The developer can prepare instructions, configure invited roles, test OpenSpec, establish CI, and validate technical readiness.

After the Slice 2 central contract is approved:

~~~text
Central contract
  -> mobile against a stub
  -> backend against PostgreSQL
  -> infrastructure base deployment

Backend image plus infrastructure
  -> deployed API
  -> mobile cloud configuration
  -> iOS and Android system verification
~~~

## Risks

### OpenSpec Store Beta

Pin, test, validate, and retain manual links as fallback.

### Multi-Repo Ceremony

Measure coordination cost after two slices and reconsider a monorepo if separation adds no value.

### Contract Drift

Use contract version, central commit, executable OpenAPI, stubs, contract tests, and deployed verification.

### Vendor Delays

Start enrollment early and continue local/development-build work without moving ownership to personal accounts.

### AWS Cost

Set budgets first, avoid NAT by default, use one environment, inventory resources, and document teardown.

### Temporary Security Becoming Permanent

Ban real data, allowlist test-network CIDRs, mark fixed IDs and missing auth as POC-only, and require authentication and abuse protection before any external pilot.

### Intake Table Mistaken For Ledger

Name it clearly and require a later ledger/audit specification before financial reporting depends on it.

### Developer Ownership Risk

Use nonprofit ownership, individual invitations, recovery continuity, and periodic role review.

## Nonprofit Cost Research

Slice 1 updates the running nonprofit cost document for:

- AWS credits and expiration;
- Apple fee waiver;
- Google Play registration and nonprofit options;
- GitHub for Nonprofits;
- Expo free and paid limits;
- domain, email, DNS, and credential-vault pricing;
- AWS POC operating costs.

Before opening a paid account, record normal cost, nonprofit benefit, eligibility, application owner, process, renewal, restrictions, and transfer implications.

## Decisions To Review Before Handoff

1. Multi-repo versus monorepo for the POC.
2. Repository and GitHub organization names.
3. Central OpenSpec Store despite beta status.
4. Archive-after-merge.
5. First four repositories in Slice 1.
6. AWS management plus development accounts.
7. ECS Fargate, RDS, ALB, Route 53, and ACM.
8. No-NAT-by-default.
9. REST path and fields.
10. One intake table and deferred audit table.
11. Fixed IDs and no auth for non-production Slice 2.
12. No SQLite in Slice 2.
13. Account-role recommendations.
14. Definition of Done and evidence depth.
15. Whether Apple/Google approval may remain pending after Slice 1.

## Review Procedure

Review in this order:

1. Repository boundaries.
2. Account ownership.
3. Central/local OpenSpec model.
4. Slice 1 acceptance.
5. Slice 2 contract.
6. AWS cost and runtime.
7. Testing and evidence.
8. Risks and deferrals.

Revise this plan directly. Do not create the handoff until material questions are resolved.

## Later Handoff

After this plan is approved, create a separate handoff under ai-planning/handoff-docs containing:

- final decisions;
- exact repo names and locations;
- exact tested OpenSpec version and commands;
- nonprofit/developer account checklist;
- Store registration and reference commands;
- first central and local change commands;
- branch and PR order;
- acceptance and evidence checklists;
- stop and escalation rules;
- credential safety rules;
- links to governing artifacts.

The handoff must not silently change this plan.

## Sequence

1. Review this plan.
2. Revise it.
3. Approve the revision.
4. Create the handoff.
5. Review the handoff.
6. Execute Slice 1 only after explicit authorization.
7. Review Slice 1 evidence.
8. Execute Slice 2 only after explicit authorization.

## Sources

OpenSpec:

- [OpenSpec documentation](https://openspec.dev/docs)
- [Core concepts](https://openspec.dev/docs/overview)
- [Getting Started](https://openspec.dev/docs/getting-started)
- [OPSX workflow](https://openspec.dev/docs/opsx)
- [Stores and multi-repository planning](https://openspec.dev/docs/stores)
- [Team workflow](https://openspec.dev/docs/team-workflow)
- [Customization](https://openspec.dev/docs/customization)
- [CLI reference](https://openspec.dev/docs/reference/cli)

Accounts:

- [AWS management-account best practices](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices_mgmt-acct.html)
- [AWS root-user best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html)
- [AWS IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html)
- [Apple enrollment](https://developer.apple.com/help/account/membership/program-enrollment)
- [Apple fee waiver](https://developer.apple.com/help/account/membership/fee-waivers)
- [Apple D-U-N-S](https://developer.apple.com/help/account/membership/D-U-N-S/)
- [Apple users and roles](https://developer.apple.com/help/app-store-connect/manage-your-team/add-and-edit-users/)
- [Google organization account](https://support.google.com/android-developer-console/answer/16641046?hl=en)
- [Google Play permissions](https://support.google.com/googleplay/android-developer/answer/9844686?hl=en-GB)
- [Expo account types](https://docs.expo.dev/accounts/account-types/)
- [GitHub repository roles](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)
- [GitHub organization roles](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization)

## Learn More

1. [OpenSpec Stores](https://openspec.dev/docs/stores)
2. [OpenSpec team workflow](https://openspec.dev/docs/team-workflow)
3. [Writing good specs](https://openspec.dev/docs/writing-specs)
4. [Reviewing a change](https://openspec.dev/docs/reviewing-changes)
5. [AWS account separation](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/aws-account-management-and-separation.html)
6. [Expo Organization accounts](https://docs.expo.dev/accounts/account-types/)

Useful search terms:

- OpenSpec Store local repository references
- multi-repository vertical slice contract testing
- modular monolith Spring Boot
- Expo organization ownership
- AWS Organizations management development accounts
- REST idempotency key
- PostgreSQL integer minor units

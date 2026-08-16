# Enterprise Growth App V1 Scope Map and Milestone Plan

Status: Working planning artifact — M0 complete; M1 not started
Purpose: Control Version 1 scope before creating slice-level SDD/OpenSpec changes.  
Primary source: `Enterprise Growth App PRD v1.0/Enterprise Growth Platform, Enterprise Growth App, Entrepreneur Application.docx`  
Engineer quick reference: `Enterprise Growth App PRD v1.0/Features Reference Sheet, Appendix D.docx`

## Executive Recommendation

Use this document as the short V1 scope map above SDD/OpenSpec work.

Do not create one large SDD change for the full Version 1 product. The PRD is already broad and mixes immediate V1 requirements with long-term platform vision. Instead:

1. Maintain this scope map as the V1 control document.
2. Break V1 into milestones.
3. Break each milestone into small vertical or enablement slices.
4. Create one SDD/OpenSpec change per slice.
5. Archive each completed slice into accepted specs before starting dependent work.

This keeps each change reviewable while preserving the larger Enterprise Growth Platform vision.

Before starting product implementation, answer only the blocking questions listed in the "Upfront Blocking Questions" section. Leave milestone-specific questions open until the relevant SDD/OpenSpec change is being proposed.

## Product Positioning

External/product name:

Enterprise Growth App

V1 module name:

Business Journal Module

Platform context:

The Enterprise Growth App is the entrepreneur-facing interface of the broader Enterprise Growth Platform. Version 1 creates the Business Journal data foundation needed for coaching, business intelligence, financing readiness, and impact measurement.

Positioning rule:

Do not externally frame the product as a bookkeeping app. Bookkeeping/recordkeeping is the first capability, not the strategic category. The product should be framed as a business growth and business-intelligence tool for entrepreneurs.

## V1 Product Thesis

If entrepreneurs can easily record business activity, understand basic business performance, and preserve reliable business records despite connectivity constraints, then HRF can improve coaching, program monitoring, future financing readiness, and impact learning.

Version 1 succeeds when:

- Entrepreneurs can record sales, expenses, and cash movement.
- Entrepreneurs can understand revenue, expenses, profit, cash position, recent activity, and simple trends.
- Entrepreneurs can use the app on affordable Android devices with intermittent connectivity.
- HRF can view entrepreneur/business activity, monitor engagement, generate basic reports, and use reliable business information for coaching and learning.
- The architecture preserves the path toward future inventory, financing, supplier, AI, and impact-measurement modules without building those modules now.

## Non-Negotiable Product Guardrails

- Mobile-first and Android-priority.
- Offline-first for core Business Journal activity.
- Financial records must not be lost during app, network, or sync failures.
- User-facing language must avoid accounting jargon.
- AI can suggest, explain, and organize, but important financial writes require user confirmation.
- Sensitive data changes require validation and auditability.
- The data model should be business-centered, not transaction-only.
- V1 must distinguish confirmed facts from estimated, extracted, AI-suggested, or unsynced information.
- The backend begins as a service/modular monolith, not a distributed microservice system.
- Long-term platform modules should influence the data model, but not expand the V1 feature build.

## Primary Users

Entrepreneur:

A woman entrepreneur participating in HRF programs, likely operating a small informal or early-stage business, often cash-based, with limited bookkeeping experience, variable digital comfort, and intermittent connectivity.

HRF coach:

Uses business activity information to provide more practical, timely support.

HRF administrator:

Uses entrepreneur, business, transaction, engagement, reporting, and loan-visibility data for program operations, monitoring, financing administration, and impact reporting.

## V1 In Scope

### Entrepreneur Mobile Application

- Account registration/login.
- Password/account recovery.
- Language selection/preference.
- Entrepreneur profile.
- Business profile.
- Business category/type.
- Record sale.
- Record expense.
- Record cash movement.
- Add notes.
- Receipt capture.
- Receipt storage.
- Receipt extraction or assisted entry, subject to the contradiction notes below.
- User review/correction before saving extracted or AI-suggested financial data.
- Transaction history.
- Transaction detail.
- Search/filter/sort transactions.
- Edit permitted transaction fields while preserving audit history.
- Duplicate prevention/detection.
- Dashboard: revenue, expenses, profit, cash information, recent transactions, basic trends.
- Reports: weekly summary, monthly summary, sales/revenue report, expense report, profit report.
- Offline transaction entry.
- Local durable storage.
- Sync when connected.
- Sync conflict handling or data-preserving review state.
- Basic AI assistance for categorization, plain-language explanations, basic business questions, and suggested next actions.

### HRF Administrative Portal

- Admin authentication.
- Role-based access.
- View entrepreneurs.
- View businesses.
- Manage user roles/permissions.
- View transaction activity.
- View business summaries.
- View engagement metrics.
- View basic loan information where applicable.
- Program participation reporting.
- Business activity reporting.
- Basic impact reporting.
- Export capability.

### Technical Foundation

- API-based architecture.
- Cloud database.
- Secure authentication.
- Role-based permissions.
- Audit logging.
- Error monitoring/observability.
- Scalable architecture that can grow from pilot scale to larger cohorts.
- Database migration strategy.
- Documented API contracts.

## V1 Out of Scope

- Automated credit score.
- Automated loan approval.
- Predictive financing model.
- Full accounting system.
- General ledger/accounting workflows.
- Marketplace.
- Supplier ordering.
- Advanced inventory.
- Mobile payments/mobile money integration unless separately approved as pilot-critical.
- Full loan origination workflows.
- Full coaching workflow management.
- Advanced analytics.
- Multi-country/multi-region expansion beyond the initial pilot assumptions.

## Key Contradictions and Scope Tensions in JLP's Docs

These are not blockers, but they should be resolved before proposing or implementing the affected slices.

### 1. Voice Entry: V1 Requirement or V1.1 Enhancement

Tension:

- The main PRD functional requirements include voice-based transaction entry as `BJ-003`.
- UX/UI guidelines list voice as the preferred input method.
- The roadmap section later places voice workflows under Version 1.1 potential enhancements.
- Appendix D does not list voice entry explicitly.

Recommended decision:

Treat voice as V1.1 unless Joe/JLP explicitly decide it is pilot-critical. For V1, design transaction entry so voice can be added later without changing the core transaction model.

### 2. Receipt Extraction: Required Automation or Assisted Review

Tension:

- Appendix D says receipt management includes extracting available information.
- The main PRD says AI extracts merchant, date, items, quantity, price, total, and category.
- V1 quality and trust principles emphasize confirmation and fallback.

Recommended decision:

For V1, require receipt capture, storage, review, and correction. Treat automated extraction as progressive: manual-first or best-effort AI/OCR is acceptable if the user can complete the transaction without automation.

### 3. AI Scope: Basic Assistance or AI Growth Coach

Tension:

- Appendix D lists modest AI assistance: categories, organization, plain-language explanations, basic questions, confirmation before saving uncertain information.
- The main PRD describes a much larger AI Growth Coach with recommendations, business memory, adaptive learning, and future decision support.

Recommended decision:

For V1, implement only bounded AI assistance. Do not build the full AI Growth Coach as a product inside V1. Preserve events/data needed for later recommendations and business memory.

### 4. Loan Visibility: Required or Conditional

Tension:

- Appendix D says Loan Visibility is required where applicable.
- The email says "if applicable."
- The main PRD includes loan account and repayment entities, but automated lending/credit decisions are deferred.

Recommended decision:

Treat loan visibility as conditional V1 scope. If HRF has current pilot loan data, build read-only loan visibility. If not, reserve the data model and defer UI/API implementation.

### 5. Haitian Creole Support: Explicit Must-Have or Generic Language Preference

Tension:

- The main PRD roadmap lists Haitian Creole support as a V1 must-have.
- Appendix D and the email mention language selection/preference without naming specific languages.

Recommended decision:

Treat language preference as V1 required. Treat Haitian Creole and English support as the likely initial language set, pending pilot confirmation.

### 6. Admin Portal Depth

Tension:

- Appendix D requires entrepreneur management, business monitoring, roles, reporting, and exports.
- The platform vision implies a much broader operations layer for financing, purchasing, coaching, and impact measurement.

Recommended decision:

For V1, build admin visibility and basic reporting, not the full operating platform. Admin should observe and export; operational workflow automation belongs in later versions unless required for pilot support.

### 7. Inventory: Basic Product Data or Inventory System

Tension:

- The main PRD data architecture includes Product/Inventory Item and Supplier entities.
- Deferred features exclude full inventory, supplier ordering, and marketplace.

Recommended decision:

Allow optional product/category fields on transactions and a simple product label/reference where useful. Do not build inventory counts, forecasting, supplier ordering, or marketplace workflows in V1.

### 8. Empty Technical Brief File

Tension:

- The folder contains `Enterprise Growth App 1, Technical Implementation Brief v1.0.docx`, but locally it is empty/not a valid docx container.

Recommended decision:

Do not treat that file as a source of technical requirements. Use the main PRD, Appendix D, technical research docs, and future SDD designs instead.

## Upfront Blocking Questions

These should be answered before starting the rapid prototype or creating the first implementation SDD changes.

1. Prototype target runtime: should the first working app target Android first only, or both Android and iOS from the start through Expo?
2. Prototype data policy: can all prototype work use synthetic data only until pilot readiness?
3. Prototype language/currency defaults: should the prototype default to Haiti / HTG / English first, with Haitian Creole and French treated as follow-on language checks?
4. Repository strategy: should this repo remain the product-planning repo while implementation happens in separate mobile/backend repos, as earlier OpenSpec planning suggested?
5. Backend expectation for the rapid prototype: should phase 1 use local SQLite only, then add backend sync later, or should the first phase include a minimal local backend from day one?
6. Speech/OCR provider posture: can phase 2 and phase 3 use mocked or device/local best-effort providers first, with AWS/paid services behind interfaces later?

These are upfront blockers because they affect environment setup, repository creation, implementation sequence, and whether the prototype can move fast without becoming disposable.

## Milestone Map

### M0: SDD and Product Foundation

Status: Complete — see [M0 foundation closure audit](../evidence/m0-foundation-closure-audit.md).

Goal:

Create the planning, architecture, and repository foundations required to run slice-level SDD without ambiguity.

Outcome:

The project has a stable SDD/OpenSpec structure, product guardrails, naming, source hierarchy, and first accepted specs for the V1 product.

Candidate slices:

- `setup-sdd-product-context`
- `define-v1-product-guardrails`
- `define-cross-repository-architecture`
- `define-core-domain-model`
- `define-api-contract-conventions`

Acceptance:

- Source hierarchy is documented.
- V1 scope, non-goals, and contradiction decisions are recorded.
- Initial capability specs exist for identity, business profile, transaction entry, offline sync, dashboard/reporting, admin visibility, and auditability.

Blocking questions:

- **Resolved:** this repository's local OpenSpec root is authoritative for product-level changes; a shared Store remains deferred.
- **Resolved:** implementation repositories are separate from this planning repository; component-local changes own code, builds, tests, and implementation evidence.
- **Resolved:** repository governance and accepted specifications control, followed by approved change artifacts and designated control briefs; older source material is subordinate.

### M1: Rapid Thin-Slice Prototype

Status: Not started. The intended mobile-repository base path is `/Users/joerice/git/joericearchitect/hrf-reinvest-in-growth`, designated by the owner on 2026-08-16; it was not present when M0 closed. M1 begins only after that component repository is resolvable and the first central/component slice contract is proposed and approved.

Goal:

Prove the riskiest V1 assumptions quickly with a small, working, non-throwaway prototype before committing to the full milestone buildout.

Outcome:

A real, versioned Android prototype can be installed and used by a non-developer on a physical device. It demonstrates offline-first transaction capture, a confirmed speech proposal path, text-to-speech confirmation, and receipt capture with best-effort OCR. The prototype should be small enough to build quickly, but shaped so its domain model, local storage, and confirmation flow can evolve into V1 rather than being discarded.

Comparison to prior prototype recommendation:

Earlier repo guidance recommended a scaled-down lightweight bookkeeping prototype for one entrepreneur or small pilot group. It included Setup, Home, Record, and Transaction Detail screens, with offline save/sync and speech proposals. It explicitly deferred receipts from the first prototype. The latest JLP docs elevate receipt management into V1, and the current prototype direction calls for receipt capture/OCR as phase 3. That is consistent if receipts remain a later prototype phase and all OCR output stays behind user review/confirmation.

Recommended prototype scope:

- One synthetic entrepreneur and one synthetic business.
- One combined Home/Record screen showing business name, weekly revenue, weekly expenses, estimated profit/cash summary, recent transactions, and sync/local status.
- One transaction review/detail state for confirming, editing, and viewing a sale/expense/cash movement before it becomes a durable record.
- Local SQLite from phase 1, not later, because offline-first is a central risk and should not be faked.
- A transaction model that includes source type: manual, speech transcript, or receipt OCR.
- A confirmation model that distinguishes raw input, suggested/extracted values, and user-confirmed values.
- Synthetic data only.

Prototype phase 1: manual offline-first transaction slice

- Build 1-2 screens: combined Home/Record plus transaction review/detail.
- Support sale and expense entry by touch input.
- Save locally to SQLite.
- Show recent local transactions.
- Show status: local, queued, synced, failed, or needs review.
- Include a minimal sync interface/stub so backend sync can be added without changing the local model.

Prototype phase 2: speech proof

- Add one speech-to-text example that produces a transaction proposal.
- Add one text-to-speech example that reads back a confirmation summary.
- Require review/edit/confirm before saving.
- Store transcript/proposal metadata separately from confirmed transaction fields.
- Provider can be mocked, device-supported, or adapter-based for speed; do not let provider choice leak into the product model.

Prototype phase 3: receipt proof

- Add receipt photo capture.
- Store receipt image/file metadata locally.
- Run best-effort OCR text extraction.
- Display extracted text and suggested transaction fields for review.
- Require correction/confirmation before saving.
- Allow manual fallback if OCR fails.

Candidate slices:

- `prototype-manual-offline-transaction`
- `prototype-speech-proposal-confirmation`
- `prototype-receipt-capture-ocr-review`

Dependencies:

- M0 guardrails and repository/runtime decisions.

Acceptance:

- A synthetic entrepreneur can record a sale or expense while offline and see it after app restart.
- Speech produces a proposal, not a final transaction.
- Text-to-speech can read a confirmation summary.
- Receipt OCR produces reviewable text or fails gracefully.
- Manual entry remains available if speech or OCR fails.
- A versioned, signed Android APK is produced through a documented, repeatable build process and can be installed on a representative physical Android device without a developer workstation connection.
- A tester can open the installed APK, enter a synthetic sale or expense while offline, force-close the app, reopen it, and find the confirmed record intact.
- Camera, speech, and text-to-speech permission-denied or unavailable-device states preserve manual entry and fail safely.
- The installed prototype contains only synthetic data and is distributed only to authorized prototype testers through a documented APK-installation or Google Play closed-test process.
- The prototype demonstrates viability without adding admin portal, loans, full inventory, full AI Growth Coach, or production data.

Blocking questions:

- Is SQLite required in phase 1 even if it slows the first screen slightly? Recommended answer: yes.
- Should phase 1 include real backend sync or only a sync-shaped local stub? Recommended answer: local stub first, backend in a later SDD slice unless infrastructure is already ready.
- Which language should speech use for the first proof? Recommended answer: English first for speed, then French/Haitian Creole evaluation.
- Is simple camera photo enough for phase 3, or is document edge detection required? Recommended answer: simple camera photo first.
- Which OCR path is acceptable for the prototype: mocked, device/local best effort, or AWS Textract? Recommended answer: best-effort behind an interface; do not block on paid/cloud integration.

### M1.2: Live Sync and Prototype API Proof

Goal:

Prove the narrowest end-to-end path from the installed M1 Android prototype to a Terraform-provisioned AWS development environment: one deployed Spring Boot REST API accepts and persists a confirmed synthetic transaction, and the app reports the server-confirmed sync result.

Outcome:

A signed M1 Android APK makes authenticated HTTPS calls to one AWS-deployed Spring Boot REST API and synchronizes a manually entered, confirmed synthetic sale or expense. The app remains local-first: a record is durable in SQLite before network activity, and the API integration exercises queued, synced, failed, and retryable states. The API is one Dockerized modular-monolith service, not a distributed microservice architecture.

Minimum M1 capabilities carried into M1.2:

- The signed Android APK and physical-device installation path.
- One synthetic entrepreneur and one synthetic business.
- Manual sale and expense entry, confirmation, SQLite persistence, and visible sync status.
- A versioned transaction payload and durable local outbox item with an idempotency key.
- A configurable sync-client interface so the M1 local stub can be replaced by a live development endpoint without changing the transaction model.

Bare-minimum extraction from M2: Terraform Infrastructure Foundation:

- Terraform repository, remote encrypted state, state-access roles, and a single isolated development environment.
- A minimal development VPC and EKS runtime sufficient for one Spring Boot workload, with narrowly scoped IAM/OIDC workload roles.
- An ECR repository for immutable API images.
- Development PostgreSQL, networked only for the API workload, with credentials managed through Secrets Manager.
- A development DNS name, TLS certificate, and public HTTPS ingress for the API; the root domain and hosted zone must be owned and approved before this is provisioned.
- CloudWatch service logs and a small, explicit cost budget/alarm and shutdown rule for the development environment.

Bare-minimum extraction from M3: Deployment and Environment Foundation:

- A repeatable container build for the Spring Boot API, including its deterministic unit/API-contract checks.
- A development-only Helm chart or equivalent Kubernetes workload package with image digest, environment configuration, health/readiness probes, and non-secret configuration separated from Secrets Manager values.
- GitHub Actions pull-request checks plus a development deployment path that builds an immutable image, publishes it to ECR, and deploys that exact image digest to EKS through a narrowly scoped GitHub OIDC role.
- A development smoke test for the deployed API, captured deployment metadata, and a documented rollback to the prior image digest.

Minimum API and mobile-integration scope:

- One Spring Boot modular-monolith service with `GET /health` and a versioned transaction-sync endpoint for confirmed manual sale and expense records.
- Provisioned prototype access for named testers only; self-registration, staff roles, and full identity/profile workflows remain M4 work. The API must reject unauthenticated writes and the APK must not contain reusable AWS credentials.
- Idempotent transaction creation backed by PostgreSQL, plus enough read-back evidence to confirm that an acknowledged transaction was durably accepted once.
- Mobile configuration for the development API base URL and tester authentication, with no production endpoint or participant data path.

Explicitly deferred from M1.2:

- Speech, text-to-speech, receipt capture, and OCR integration.
- Admin portal, reports, loans, inventory, and AI assistance.
- Production data, pilot participant accounts, and production/pilot deployment.
- Staging/production environments, environment promotion, GitOps/Argo CD, and multi-service decomposition.
- Full registration, recovery, role management, and production identity flows.

Candidate slices:

- `prototype-android-release-delivery`
- `prototype-sync-contract-and-outbox`
- `prototype-development-terraform-bootstrap`
- `prototype-development-eks-ecr-rds-and-ingress`
- `prototype-spring-boot-api-and-synthetic-transaction-store`
- `prototype-github-oidc-build-publish-and-helm-deploy`
- `prototype-tester-authentication`
- `prototype-device-live-sync-proof`

Dependencies:

- M0 guardrails, repository strategy, and API-contract conventions.
- M1 phase 1 manual offline-first transaction slice and Android release delivery.
- Explicit approval of the AWS account, owned domain/hosted-zone approach, development region, spending limits, Terraform state ownership, component repositories, GitHub organization/repositories, and authorized tester group before external resources, credentials, or tester authentication are created.

Acceptance:

- An authorized tester installs the signed M1 APK on a physical Android device and signs in through the approved prototype authentication path.
- While offline, the tester confirms a synthetic sale or expense; it remains locally durable after app restart and visibly queues for synchronization.
- When connectivity returns, the app makes an authenticated TLS API call to the Terraform-provisioned EKS-hosted Spring Boot API, receives a successful acknowledgement, and changes the item to `synced` only after PostgreSQL durably accepts it.
- Retrying the same queued operation does not create a duplicate server record.
- A controlled API or deployment failure leaves the local record intact, reports a comprehensible retryable/failed state, and succeeds when the service is restored.
- The deployed service is reachable only through its intended development HTTPS endpoint, uses no long-lived AWS credentials in the app or repository, and stores only synthetic prototype data.
- Terraform reproduces the approved development foundation. GitHub Actions records the commit SHA, image digest, Helm configuration version, deployment result, smoke-test evidence, and rollback target.

Blocking questions:

- Is EKS confirmed as the required development runtime for this proof, accepting its baseline cost and operational overhead? Recommended answer: confirm before provisioning; M1.2 assumes EKS only when that decision is accepted.
- What owned root domain, Route 53 hosted-zone approach, development API subdomain, and TLS certificate ownership are approved?
- What approved named-tester authentication approach will be used for synthetic prototype access?
- Which development region, budget alarm threshold, automatic shutdown rule, Terraform state owners, and GitHub deployment approvers are approved?
- Is the Android distribution path direct signed APK installation for a tightly controlled group, or Google Play closed testing for a broader tester group?

### M2: Terraform Infrastructure Foundation

Goal:

Create the minimum cloud infrastructure foundation needed for shared development, later staging, and eventual production/pilot without giving application deployment broad infrastructure-administrator authority.

Outcome:

Terraform defines the AWS account/environment boundary, network, container registry, EKS baseline, database/storage prerequisites, IAM/OIDC roles, observability baseline, and cost/safety controls needed to deploy V1 services through the selected delivery strategy.

Source decision:

Use Terraform for infrastructure buildout. Follow `ai-planning/research/eks-cicd-and-environment-strategy.md` for EKS, ECR, GitHub Actions, GitHub Environments, IAM OIDC, Helm, and later AWS-managed Argo CD.

Candidate slices:

- `terraform-repository-and-state-baseline`
- `terraform-nonproduction-account-network`
- `terraform-ecr-and-image-repositories`
- `terraform-eks-development-cluster`
- `terraform-rds-postgres-development`
- `terraform-s3-receipt-storage-development`
- `terraform-github-oidc-iam-roles`
- `terraform-observability-and-cost-alarms`
- `terraform-secrets-manager-baseline`

Dependencies:

- M0 product/repository strategy.
- M1 prototype lessons if they affect runtime/library/deployment requirements.
- M1.2 live-sync lessons, if that proof is completed before the full foundation.

Acceptance:

- Terraform has a clear module/environment layout.
- Non-production AWS infrastructure can be planned and applied repeatably.
- ECR exists for immutable container images.
- EKS development runtime exists or has an approved deferred plan.
- PostgreSQL, S3, Secrets Manager, IAM, and observability baselines are represented.
- GitHub OIDC roles are narrowly scoped and do not require static AWS keys.
- Production is explicitly isolated from non-production in the design, even if production is not provisioned yet.

Blocking questions:

- Which AWS accounts exist now, and who owns them?
- Should development and staging initially share a non-production cluster with separate namespaces, or use separate clusters?
- Where should Terraform state live, and who can apply changes?
- Which secrets integration pattern will expose AWS Secrets Manager values to EKS workloads?
- What budget alarms and shutdown controls are required before any shared cloud resources are left running?

### M3: Deployment and Environment Foundation

Goal:

Create the initial CI/CD and environment promotion path for backend/container workloads so V1 services can move from pull request to development, staging, and production/pilot through controlled, auditable steps.

Outcome:

GitHub Actions runs CI, builds immutable container images, publishes to ECR, and deploys to development using Helm. GitHub Environments and AWS IAM OIDC provide environment-specific controls. The plan preserves a clean path to AWS-managed Argo CD once staging/production promotion becomes routine.

Source decision:

Use the recommended strategy from `ai-planning/research/eks-cicd-and-environment-strategy.md`:

- GitHub Actions for CI.
- ECR for immutable images.
- GitHub Environments plus AWS IAM OIDC for deployment controls.
- Helm as the workload package format.
- Direct Helm deployment is acceptable for early development.
- AWS-managed Argo CD on EKS becomes the target GitOps delivery model before routine staging/production promotion.
- Build once and promote the same image digest across environments.

Candidate slices:

- `github-actions-pr-ci-baseline`
- `container-build-and-ecr-publish`
- `helm-chart-baseline`
- `development-environment-deploy`
- `github-environments-and-oidc-deploy-roles`
- `staging-production-promotion-model`
- `argocd-gitops-layout-prep`
- `deployment-health-smoke-rollback`
- `dependency-image-scan-and-sbom-baseline`

Dependencies:

- M0 repository and SDD strategy.
- M2 Terraform foundation for AWS roles, ECR, and EKS targets.

Acceptance:

- Pull requests run lint/test/contract checks appropriate to the service.
- Main builds a digest-addressable image and pushes it to ECR.
- The development environment can deploy the built image through Helm.
- GitHub Environments exist for development, staging, and production/pilot.
- Production/pilot deployment is protected by human approval.
- Deployment metadata records commit SHA, image digest, Helm chart/config version, and test result.
- The same image digest can be promoted without rebuilding.
- The Argo CD target model is documented even if not yet active.

Blocking questions:

- Should GitOps configuration live in a dedicated repo or a separated `deploy/` area at first?
- Which checks are required before development deploy: unit tests, integration tests, API contract checks, Helm lint/template, image scan?
- What is the first authoritative rollback signal: Kubernetes readiness, application health endpoint, smoke test, or CloudWatch alarms?
- How will database migrations be sequenced and approved during deployment?
- When should AWS-managed Argo CD be introduced: before staging exists, or before production/pilot promotion?

### M4: Identity, Roles, and Profiles

Goal:

Enable entrepreneurs and HRF users to access the system with the minimum profile data needed for business activity tracking.

Outcome:

Entrepreneurs can register/login, choose a language, create/update their entrepreneur profile, and create/update a business profile. HRF admin roles are represented.

Candidate slices:

- `entrepreneur-registration-login`
- `language-preference`
- `entrepreneur-profile`
- `business-profile`
- `role-based-access-baseline`

Dependencies:

- M0 guardrails and domain naming.

Acceptance:

- Entrepreneur account can be created and authenticated.
- Business profile exists before transaction capture.
- HRF admin/staff roles are distinguishable from entrepreneur users.
- Profile APIs and mobile screens use non-accounting language.

Blocking questions:

- Does V1 require real authentication in the first pilot, or can early field testing use provisioned accounts?
- Does V1 support one business per entrepreneur or prepare for multiple businesses immediately?
- What exact language/currency defaults are required for pilot users?

### M5: Business Journal Core Transactions

Goal:

Deliver the central Business Journal behavior before advanced AI, receipts, or reporting.

Outcome:

Entrepreneurs can record sales, expenses, and cash movements; review transaction history; and correct permitted fields with auditability.

Candidate slices:

- `record-sale`
- `record-expense`
- `record-cash-movement`
- `transaction-history`
- `transaction-detail`
- `transaction-edit-with-audit-history`
- `duplicate-transaction-review`

Dependencies:

- M4 profile/business foundation.

Acceptance:

- Sales, expenses, and cash movements have consistent validation.
- Transactions are tied to a business.
- Edits do not erase audit history.
- Transaction history supports practical review by the entrepreneur.

Blocking questions:

- What transaction types are mandatory on day one: sale, expense, cash in/out, loan payment, savings contribution?
- What fields are required versus optional for a valid sale or expense?
- Are deletes allowed, or should V1 use correction/void records only?
- What level of audit history is required for V1?

### M6: Offline-First Local Storage and Sync

Goal:

Make core Business Journal activity reliable under intermittent connectivity.

Outcome:

The mobile app saves core transactions locally first, queues sync operations, retries safely, prevents duplicate server writes through idempotency, and exposes user-understandable sync status.

Candidate slices:

- `local-transaction-storage`
- `sync-operation-queue`
- `idempotent-transaction-create-api`
- `sync-status-ux`
- `sync-retry-and-failure-handling`
- `sync-conflict-needs-review`

Dependencies:

- M5 transaction model.

Acceptance:

- A transaction entered offline remains visible after app restart.
- A queued transaction syncs when connectivity returns.
- Retried sync does not create duplicate backend records.
- Failed or conflicted sync preserves data and guides user/staff review.

Blocking questions:

- Does the first production slice sync to a real backend or stay local until backend foundation is approved?
- What conflict cases must be handled in V1 versus marked `needs_review`?
- Should dashboard/report totals be computed locally, server-side, or both?

### M7: Dashboard and Basic Reports

Goal:

Turn transaction data into simple business understanding.

Outcome:

Entrepreneurs can see revenue, expenses, profit, cash information, recent activity, basic trends, weekly summaries, and monthly summaries using plain language.

Candidate slices:

- `business-dashboard-summary`
- `recent-activity`
- `weekly-summary-report`
- `monthly-summary-report`
- `sales-expense-profit-reports`
- `plain-language-report-explanations`

Dependencies:

- M5 transaction data.
- M6 local/offline model if dashboard must work offline.

Acceptance:

- Dashboard answers "How is my business doing?"
- Reports avoid accounting jargon.
- Calculations are deterministic and testable.
- Offline/local totals remain understandable even before server sync.

Blocking questions:

- What does "cash position" mean in V1 if the app does not model every owner withdrawal, loan payment, or savings contribution?
- Should profit be labeled as estimated when records may be incomplete?
- Which period summaries matter first: today, this week, this month?

### M8: Receipt Capture and Assisted Review

Goal:

Allow entrepreneurs to attach receipt evidence and optionally use extraction assistance without making automation a single point of failure.

Outcome:

Entrepreneurs can capture/store receipt images, review extracted or suggested information, correct it, and confirm the final transaction.

Candidate slices:

- `receipt-image-capture`
- `receipt-storage-and-metadata`
- `receipt-review-flow`
- `receipt-assisted-field-extraction`
- `receipt-confirm-transaction`
- `receipt-fallback-manual-entry`

Dependencies:

- M5 transaction model.
- M6 offline/local storage for receipt metadata.

Acceptance:

- Receipt capture works even when extraction is unavailable.
- Extracted/suggested data is clearly separate from confirmed user data.
- User confirmation is required before financial data is saved from extraction.

Blocking questions:

- Is receipt extraction a V1 pilot requirement or a prototype-only proof until accuracy is known?
- Is simple image capture enough, or is scan/crop/edge detection required?
- Are receipt images stored locally only, uploaded to cloud storage, or both?

### M9: Bounded AI Assistance

Goal:

Add low-risk intelligence that supports recording and understanding without taking control of financial decisions.

Outcome:

The app can suggest transaction categories, organize transaction information, explain basic business information in plain language, answer bounded business questions, and suggest next actions with confirmation boundaries.

Candidate slices:

- `ai-category-suggestions`
- `ai-plain-language-explanations`
- `ai-basic-business-questions`
- `ai-suggested-next-actions`
- `ai-confirmation-boundaries`
- `ai-confidence-and-source-labeling`

Dependencies:

- M5 transaction data.
- M7 dashboard/reporting for explanation context.

Acceptance:

- AI suggestions never silently finalize financial records.
- AI outputs show when information is estimated, suggested, or uncertain.
- The app remains usable if AI services fail.

Blocking questions:

- Which AI assistance is truly required in V1: categorization, explanations, questions, next actions, or all four?
- Are AI calls allowed to use cloud services with prototype/pilot data?
- What user consent language is required before AI can process business information?

### M10: HRF Administrative Portal

Goal:

Give HRF the minimum visibility needed to support entrepreneurs, monitor adoption, and report on pilot activity.

Outcome:

HRF staff can view entrepreneurs, businesses, transaction activity, business summaries, engagement metrics, roles, and exports.

Candidate slices:

- `admin-auth-and-role-access`
- `admin-entrepreneur-list-detail`
- `admin-business-list-detail`
- `admin-transaction-activity`
- `admin-engagement-metrics`
- `admin-basic-reporting`
- `admin-export-capability`

Dependencies:

- M4 identity/roles.
- M5 transactions.
- M7 report calculations for summaries.

Acceptance:

- Admin users can monitor participation and business activity.
- Admin exports do not expose more data than allowed by role.
- Admin portal supports pilot operations without becoming the full Enterprise Growth Platform.

Blocking questions:

- Does the first pilot require an admin portal before entrepreneur testing begins?
- What can HRF staff see by default?
- What export format is needed first: CSV, Excel, PDF, or API?
- Are coach notes in scope, or is admin visibility read-only?

### M11: Loan Visibility, If Applicable

Goal:

Expose basic loan information only if pilot operations require it and HRF has a source of loan data.

Outcome:

Entrepreneurs and/or HRF staff can view loan amount, outstanding balance, repayment status, and payment history without automated approval or credit scoring.

Candidate slices:

- `loan-data-model-baseline`
- `admin-loan-visibility`
- `entrepreneur-loan-summary`
- `repayment-status-history`

Dependencies:

- M4 identity/business.
- Loan source decision.

Acceptance:

- Loan information is read-only unless a separate operational workflow is approved.
- No automated credit score, loan approval, or predictive financing decision is implied.

Blocking questions:

- Is there existing loan data to display?
- Should entrepreneurs see loan information, or only HRF staff?
- Who maintains repayment status during the pilot?

### M12: Pilot Readiness and Quality Gate

Goal:

Prepare V1 for a controlled pilot with real entrepreneurs and HRF staff.

Outcome:

The product can be tested with a pilot cohort, monitored, supported, and evaluated against adoption, usage, quality, and value metrics.

Candidate slices:

- `pilot-metrics-instrumentation`
- `observability-and-error-monitoring`
- `security-and-privacy-review`
- `offline-resilience-test-suite`
- `usability-test-protocol`
- `pilot-support-workflows`
- `pilot-readiness-checklist`

Dependencies:

- M2-M3 infrastructure and deployment foundations.
- M4-M10 minimum product scope.
- M11 if loan visibility is included.

Acceptance:

- Pilot metrics are measurable.
- Critical flows pass offline, sync, and data-integrity tests.
- Support staff know how to handle account, sync, and data-correction issues.
- Product is ready for a 25-50 entrepreneur pilot cohort.

Blocking questions:

- What pilot cohort size and timeline should V1 readiness target?
- What are the pilot exit criteria for expansion?
- Who provides entrepreneur support during the pilot?
- Which metrics matter most: adoption, weekly active use, transaction count, data quality, entrepreneur confidence, coaching usefulness, or financing readiness?

## Recommended First SDD/OpenSpec Changes

Start with these in order:

1. `setup-sdd-product-context`
2. `define-v1-product-guardrails`
3. `prototype-manual-offline-transaction`
4. `prototype-speech-proposal-confirmation`
5. `prototype-receipt-capture-ocr-review`
6. `terraform-repository-and-state-baseline`
7. `terraform-nonproduction-account-network`
8. `terraform-ecr-eks-development-baseline`
9. `github-actions-pr-ci-baseline`
10. `container-build-ecr-publish-development-deploy`
11. `define-core-domain-model`
12. `entrepreneur-registration-login`
13. `business-profile`
14. `record-sale`
15. `record-expense`
16. `local-transaction-storage`
17. `idempotent-transaction-sync`
18. `transaction-history`

Reasoning:

This order proves the highest-risk user and technical assumptions before expanding into formal V1 buildout, then establishes cloud infrastructure and deployment foundations before backend-dependent hardening. The prototype validates offline-first transaction capture, confirmation, speech, and receipt/OCR viability. Terraform and deployment slices create a controlled path for shared development and later pilot delivery. The later formal slices then harden identity, business profile, transaction APIs, sync, and history without treating the prototype as disposable.

## Slice Template

Each slice-level SDD/OpenSpec change should include:

- Outcome: one or two sentences.
- User value: entrepreneur, HRF staff, or platform foundation.
- Scope: exactly what is included.
- Non-goals: future features intentionally excluded.
- Requirements: observable behavior.
- Scenarios: concrete Given/When/Then acceptance examples.
- Data impact: entities, fields, migrations, audit implications.
- API impact: endpoints/contracts/events.
- UX impact: screens/states/copy principles.
- Offline/sync impact: local persistence, queueing, retry, idempotency, conflict behavior.
- Security/privacy impact: access control, sensitive data, logging boundaries.
- Verification: unit, integration, end-to-end, offline, and manual checks as appropriate.

## Initial Capability Spec Boundaries

These are good homes for accepted specs after slices are archived:

- `identity-and-access`
- `entrepreneur-profile`
- `business-profile`
- `business-journal-transactions`
- `offline-sync`
- `receipt-management`
- `ai-assistance`
- `dashboard-and-reports`
- `admin-portal`
- `loan-visibility`
- `audit-and-observability`
- `infrastructure-foundation`
- `deployment-and-environments`

## Proposal-Ready Summary

Version 1 should be proposed as:

Enterprise Growth App Version 1: Business Journal Module

The first release gives entrepreneurs a simple mobile business journal for recording and understanding sales, expenses, cash movement, receipts, and basic business performance. It gives HRF a basic administrative portal for entrepreneur monitoring, business summaries, engagement metrics, reporting, and exports. The core strategic value is not bookkeeping; it is the creation of trustworthy business activity data that can support coaching, financing readiness, impact measurement, and future Enterprise Growth Platform capabilities.

The product should be built through small SDD/OpenSpec slices, beginning with product guardrails and a rapid thin-slice prototype. The prototype should prove manual offline entry, speech proposal/confirmation, and receipt OCR review using synthetic data. Terraform infrastructure and deployment/environment foundations should then establish the controlled shared delivery path. Formal V1 buildout should then harden the domain model, identity, business profile, core transactions, sync, dashboard/reporting, admin visibility, and pilot readiness.

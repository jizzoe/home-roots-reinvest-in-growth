## Why

The V1 planning sources establish a broad Enterprise Growth Platform vision, but they still contain unresolved scope tensions around voice, receipt/OCR, AI assistance, loan visibility, localization, offline behavior, data policy, confirmation, and impact claims. This change creates an accepted product-governance baseline before any implementation slice or component repository work proceeds.

## What Changes

- Establish the Enterprise Growth App V1 as the entrepreneur-facing Business Journal Module within the broader Enterprise Growth Platform vision, not as a generic bookkeeping app.
- Record the source hierarchy for V1 product decisions, with repository governance and OpenSpec policy taking precedence over design briefs when safety, ownership, validation, or repository scope conflicts appear.
- Define V1 scope and explicit non-goals for the Business Journal Module, including manual transaction entry, receipt capture/review, bounded AI assistance, conditional read-only loan visibility, admin visibility, offline-first behavior, localization, auditability, and evidence-seeking reporting.
- Resolve current scope tensions:
  - voice is a proposal/confirmation input path, not a required completion dependency;
  - receipt/OCR is capture, retention, review, correction, and manual completion first, with extraction best-effort;
  - AI is bounded assistance and explanation, not an autonomous coach, financial decision-maker, or impact-claim generator;
  - loan visibility is conditional and read-only when reliable pilot loan data exists;
  - localization is required, with Haitian Creole planned as the primary entrepreneur-facing language while exact pilot defaults remain separately confirmed;
  - offline-first behavior is required for core Business Journal activity;
  - synthetic-only data is required for prototypes and planning examples until a separate pilot data approval exists;
  - important financial writes require human confirmation;
  - impact and outcome language remains evidence-seeking and traceable.
- Record explicit non-goals: this change does not create repositories, configure an OpenSpec Store, create external accounts, provision infrastructure, select vendors, authorize implementation, approve production participant data, or finalize component architecture.
- Identify `define-cross-repository-architecture` as the required follow-on planning change before repository creation or cross-repository implementation coordination.

## Capabilities

### New Capabilities

- `v1-product-guardrails`: Planning-governance behavior for V1 positioning, source hierarchy, scope and non-goals, product-decision guardrails, data and AI safety boundaries, and follow-on change sequencing.

### Modified Capabilities

- None.

## Impact

Affected repository: this planning repository only, `home-roots-reinvest-in-growth`.

Affected artifacts: new OpenSpec change artifacts under `openspec/changes/define-v1-product-guardrails/`; after review, verification, sync, and archive, the accepted capability would live under `openspec/specs/v1-product-guardrails/`.

Source material:

- `AGENTS.md`
- `docs/sdd-workflow.md`
- `README.md`
- `openspec/config.yaml`
- `ai-planning/design-briefs/m0-sdd-and-product-foundation.md`
- `ai-planning/design-briefs/V1 Scope Map and Milestone Plan.md`
- `ai-planning/design-briefs/JLP UX Synthesis and V1 Design Decisions.md`

No application code, APIs, dependencies, accounts, infrastructure, vendor integrations, repositories, OpenSpec Store configuration, or production data systems are affected. Any later external write, component repository creation, implementation, sensitive-data use, cloud/provider decision, cost exposure, or nonprofit ownership decision requires separate just-in-time approval.

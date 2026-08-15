## Why

The V1 roadmap now depends on clear boundaries between the central planning repository and future mobile, backend, infrastructure, staff-web, and worker repositories. This change establishes the cross-repository architecture and coordination rules before any repository creation, implementation, OpenSpec Store configuration, external account setup, infrastructure provisioning, CI/CD configuration, or credential work begins.

## What Changes

- Establish this repository, `home-roots-reinvest-in-growth`, as the central planning, product specification, architecture, design-brief, and system-acceptance evidence boundary.
- Define component repository responsibilities and creation triggers:
  - mobile repository before an approved M1 manual-offline Android prototype slice is applied;
  - backend repository before an approved backend, sync, or M1.2 REST API proof slice is applied;
  - infrastructure repository before approved M2 infrastructure work or an approved M1.2 Terraform/AWS development proof is applied;
  - staff-web repository before approved M10 staff-web work is applied;
  - worker repository only before an approved independently deployed OCR, speech, translation, or AI worker boundary is applied.
- Define repositories that must not be created initially: separate database-schema, REST-contract, shared-model/DTO, per-backend-module, end-to-end-test, or assistant-skill repositories.
- Establish the central-vs-component OpenSpec model:
  - central changes own product contracts, cross-component scenarios, repository coordination, and system acceptance;
  - component-local changes own code, configuration, tests, migrations, builds, local validation, and archive evidence for their repositories.
- Define manual durable linking conventions between central and component work while OpenSpec Store use remains deferred.
- Defer OpenSpec Store/reference/workset configuration until a separately approved change verifies compatibility, recovery, and nonprofit ownership.
- Define the special M1.2 path as a narrow mobile-to-REST-API live-sync proof that may pull forward bare-minimum backend, infrastructure, and deployment slices only after explicit approvals and component-local changes exist.
- Record explicit non-goals: this change does not create repositories, configure an OpenSpec Store, create GitHub/AWS/domain/vendor accounts, provision infrastructure, configure CI/CD, create credentials, approve external writes, approve production or participant data, or authorize implementation.
- Identify `define-core-domain-model` and `define-api-contract-conventions` as required follow-on planning work.

## Capabilities

### New Capabilities

- `cross-repository-architecture`: Planning-governance behavior for repository boundaries, component ownership, creation triggers, central/component OpenSpec responsibilities, durable linkage, deferred Store use, and the M1.2 live-sync architecture path.

### Modified Capabilities

- None.

## Impact

Affected repository: this planning repository only, `home-roots-reinvest-in-growth`.

Affected artifacts: new OpenSpec change artifacts under `openspec/changes/define-cross-repository-architecture/`; after review, verification, sync, and archive, the accepted capability would live under `openspec/specs/cross-repository-architecture/`.

Source material:

- `AGENTS.md`
- `docs/sdd-workflow.md`
- `README.md`
- `openspec/config.yaml`
- `ai-planning/design-briefs/m0-sdd-and-product-foundation.md`
- `ai-planning/design-briefs/V1 Scope Map and Milestone Plan.md`
- `ai-planning/design-briefs/m1-rapid-thin-slice-prototype.md`
- `ai-planning/design-briefs/m1.2-live-sync-rest-api-proof.md`
- `openspec/changes/define-v1-product-guardrails/`

No application code, APIs, dependencies, accounts, cloud resources, domains, repositories, OpenSpec Store configuration, CI/CD settings, credentials, vendor integrations, production deployments, or participant-data systems are affected. Any later external write, component repository creation, implementation, sensitive-data use, infrastructure provisioning, paid service, or nonprofit ownership decision requires separate just-in-time approval.

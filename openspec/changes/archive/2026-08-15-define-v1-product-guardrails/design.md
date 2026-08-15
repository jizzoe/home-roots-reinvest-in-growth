## Context

See `proposal.md` for motivation. This repository has no accepted V1 product specs yet and no application implementation. The current planning sources are useful but mix durable decisions, working hypotheses, future platform ideas, and implementation-adjacent recommendations.

The relevant constraints are:

- `AGENTS.md`, `docs/sdd-workflow.md`, and `openspec/config.yaml` define the repository boundary, safety policy, lifecycle, validation contract, and approval gates.
- `README.md` defines product direction, offline-first posture, human confirmation, synthetic-only prototype data, and evidence-seeking impact language.
- `ai-planning/design-briefs/m0-sdd-and-product-foundation.md` names this as the first M0 planning change and reserves `define-cross-repository-architecture` as the next one.
- `ai-planning/design-briefs/V1 Scope Map and Milestone Plan.md` and `ai-planning/design-briefs/JLP UX Synthesis and V1 Design Decisions.md` provide V1 positioning, scope decisions, UX guardrails, and unresolved tensions.

## Goals / Non-Goals

**Goals:**

- Convert the existing V1 guardrail decisions into accepted, testable planning-governance behavior.
- Give future proposal reviews a stable checklist for product positioning, scope, safety, AI, offline, confirmation, localization, data, and impact language.
- Preserve the distinction between accepted product guardrails and future implementation decisions.
- Make `define-cross-repository-architecture` the explicit follow-on change before any component repository or implementation work.

**Non-Goals:**

- No mobile, backend, staff-web, worker, infrastructure, API, data model, or UI implementation.
- No repository creation, OpenSpec Store configuration, external accounts, cloud resources, vendor selection, or paid service use.
- No approval to use production, participant, personal, operational, financial, or otherwise sensitive data.
- No final component architecture; that belongs in `define-cross-repository-architecture`.

## Decisions

### Decision: Model guardrails as a product-governance capability

The change creates one new capability, `v1-product-guardrails`, rather than scattering requirements across transaction, AI, receipt, localization, offline, or reporting capabilities.

Rationale: the requested outcome is cross-cutting planning governance. Future domain-specific capabilities can cite these guardrails while defining their own concrete product behavior.

Alternatives considered:

- Create separate capabilities for AI, receipts, voice, loans, and offline behavior now. Rejected because that would prematurely define detailed product contracts before the core domain and architecture changes are reviewed.
- Treat this as docs-only and skip specs. Rejected because the user requested accepted guardrails with observable requirements and scenarios.

### Decision: Put source hierarchy in the spec

The accepted spec states how future V1 conflicts are resolved across governance, accepted specs, approved changes, design briefs, PRDs, and earlier research.

Rationale: future slice reviews need an observable rule for deciding whether a PRD detail, UX guideline, or newer design brief controls. This prevents silent promotion of hypotheses or old implementation assumptions.

Alternatives considered:

- Leave precedence only in design text. Rejected because source hierarchy is externally observable planning behavior that future reviews depend on.

### Decision: Resolve scope tensions as guardrails, not feature implementation

Voice, receipt/OCR, AI, loan visibility, localization, offline behavior, synthetic-only data, confirmation, and impact claims are expressed as boundaries future slices must satisfy.

Rationale: this records the decisions needed before implementation while leaving provider choices, data models, screen flows, APIs, and validation commands to later slice proposals.

Alternatives considered:

- Specify exact providers, storage shape, API behavior, or UI flows. Rejected because those belong to later component-specific changes and would exceed this planning-only scope.

### Decision: Keep validation repository-local

Validation for this change is the documented planning/specification contract from `docs/sdd-workflow.md`; no application test suite is expected.

Rationale: this repository owns planning artifacts and accepted cross-repository product behavior, not implementation code.

Alternatives considered:

- Add component build/test requirements here. Rejected because component repositories do not yet exist in this scope and require separate approval.

## Risks / Trade-offs

- Guardrails may feel broad for future implementers -> Mitigation: later slice proposals must translate each applicable guardrail into domain-specific requirements and validation evidence.
- Haitian Creole is planned as primary entrepreneur-facing language while pilot defaults remain open -> Mitigation: future localization slices must record explicit language, currency, and locale assumptions before implementation.
- Loan visibility remains conditional -> Mitigation: future loan proposals must prove reliable pilot loan data, ownership, and read-only boundaries before inclusion.
- Evidence-seeking impact language can constrain marketing or funder narratives -> Mitigation: product and reporting claims can still describe hypotheses and observations when source, uncertainty, and evidence status are explicit.

## Migration Plan

1. Review this change package as planning artifacts only.
2. If accepted, use Apply in this repository to refine or confirm the OpenSpec artifacts without implementation work.
3. Run the repository validation contract from `docs/sdd-workflow.md`.
4. Verify each requirement and scenario against the approved source material and the generated artifacts.
5. Sync accepted guardrails into `openspec/specs/v1-product-guardrails/`.
6. Archive only after explicit approval.
7. Propose `define-cross-repository-architecture` as the next separate planning change.

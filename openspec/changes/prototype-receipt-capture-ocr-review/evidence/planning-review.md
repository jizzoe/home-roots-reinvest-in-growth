# M1 Receipt Capture and OCR Planning Review

Date: 2026-08-18

Change: `prototype-receipt-capture-ocr-review`

Profile: `prototype-rapid`; central planning and one separately authorized
mobile component lifecycle.

## Reviewed Scope

The review covers `proposal.md`, the receipt/OCR delta, `design.md`, and
`tasks.md` against `AGENTS.md`, `docs/sdd-workflow.md`, accepted V1 guardrails,
core-domain constraints, cross-repository architecture, the completed manual
and speech M1 slices, and the approved M1 brief/workflow/screen-state controls.

## Review Outcome

No unresolved planning-artifact defect was identified. The package preserves
the following decisive boundaries:

| Review area | Outcome |
| --- | --- |
| Scope and non-goals | Receipt capture/selection, local Android OCR, deterministic proposal review, and manual fallback only; no backend, cloud OCR, scanning, itemization, or iOS scope. |
| Financial integrity | Raw image/OCR/parser evidence remains separate; only the established explicit confirmation path creates a local expense and outbox record. |
| Offline and privacy | Synthetic local images/data only; no network, provider, credentials, or external send in the core flow. |
| Android constraint | Physical-device acceptance must prove a bundled/no-download local ML Kit path or retain its limitation truthfully. |
| UX and accessibility | Approved M08 capture, processing, review, and failure controls preserve editable values, manual fallback, English/French resources, and status truthfulness. |
| Ownership and recovery | The central repository coordinates contract/evidence only; the mobile repository owns source, dependencies, native configuration, tests, and component lifecycle. |

## Requirement and Task Coverage

| Contract area | Planned implementation/evidence tasks |
| --- | --- |
| Central/component boundary and returned evidence | 1.1-1.3, 2.1, 3.2, 4.3-4.4 |
| Synthetic, local-only, manual-first flow | 2.1-2.5, 3.1, 4.2 |
| Image capture, durable file metadata, permission fallback | 2.2, 3.1, 4.2 |
| Bundled local OCR and source-evidence separation | 2.3, 3.1, 4.2 |
| Deterministic uncertain parser proposal | 2.4, 3.1, 4.2 |
| Edit/clear/confirm authority and outbox integrity | 2.5, 3.1, 4.2 |
| Component checks, Android acceptance, central close-out | 3.1-3.2, 4.1-4.4 |

Tasks are dependency-ordered: Gate 1 and a central pin precede component work;
the component lifecycle precedes build/device acceptance; returned evidence
precedes central Verify; Sync and Archive remain last.

## Safety, Ownership, and External State

- The public temporary mobile repository remains a component boundary and must
  transfer to HRF before participant, pilot, or production use.
- The component proposal must resolve compatible native dependencies, licenses,
  audit results, attribution, and rollback. No native dependency is installed
  by this central checkpoint.
- EAS/build/tester operations remain separate exact approval gates. No issue,
  Project, deployment, cloud account, or secret is configured or inferred.
- The installed `base-code-review` skill is available, but its required
  `validate-implementation-quality.mjs` asset is absent. This review therefore
  records ordinary planning-review evidence only; it does not claim a
  schema-validated `base-code-review` result. Component local-review evidence
  remains required before component Verify.

## Recovery and Portability

The selected component branch/change, central contract pin, handoff, and
returned revisions will provide idempotent recovery evidence. Product-specific
repository names occur only in product-scoped artifacts. Before archive, a
rollback removes only receipt additions while preserving compatible established
manual/speech data. After archive, corrections use a new change.

## Validation

| Check | Result | Coverage |
| --- | --- | --- |
| `openspec context --json` | Passed: nearest local root, no status error | Correct planning root |
| `openspec config get workflows` | Passed: approved six actions | Lifecycle configuration |
| `openspec list --json` | Passed: this change at 2/14 tasks | Current active work state |
| `openspec validate prototype-receipt-capture-ocr-review --strict --no-interactive` | Passed | Selected proposal, delta, design, tasks, and evidence structure |
| `openspec validate --all --strict --no-interactive` | Passed: 7 items, 0 failed | Selected change and accepted living specifications |
| `git diff --check` | Passed: no output | Whitespace and patch integrity |
| Bounded sensitive-pattern review | Passed: matched only policy text (`secret patterns` / `secret`) | New central artifacts contain no credential-like value |

The absent review-validator script is retained as a non-behavioral evidence
gap. It cannot be used to claim a validated same-session local review or to
replace component-local review after application code changes.

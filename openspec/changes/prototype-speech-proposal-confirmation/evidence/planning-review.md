# M1 Speech Proposal Planning Review

Date: 2026-08-17

Change: `prototype-speech-proposal-confirmation`

Profile: `prototype-rapid` with controller policy `strict-first-degraded`

Result: Review passed with no unresolved artifact finding; Gate 1 was subsequently approved on 2026-08-17 as recorded in `gate-1-approval.md`.

## Reviewed Scope

The review covered `proposal.md`, the
`prototype-speech-proposal-confirmation` delta, `design.md`, and `tasks.md`
against repository governance, accepted V1 guardrails, cross-repository
architecture, core domain behavior, the Phase 1 contract, and the current M1
workflow/UI briefs. The schema-valid advisory result is retained in
`evidence/local-planning-review.json`.

## Finding Dispositions

| Finding | Classification | Disposition and evidence |
| --- | --- | --- |
| A mocked transcript could be mistaken for real listening | High / objective-fix | Corrected the proposal, delta, design, component outcome, tests, and device acceptance to require visible prototype-sample disclosure and to state that no user speech is recorded or transcribed. |
| New M07 interaction lacked explicit accessibility evidence | Medium / objective-fix | Added labeled-control, visible non-audio, small-device, and documented enlarged-text requirements and acceptance evidence. |
| Task 1.1 could imply standing EAS permission | Medium / objective-fix | Clarified that Gate 1 approves only EAS's treatment as a later separate gate; task 3.1 retains exact just-in-time authorization before a vendor write. |

The corrected package was rereviewed with no remaining finding.

## Requirement and Task Coverage

| Contract area | Planned implementation/evidence tasks |
| --- | --- |
| Synthetic offline fixture and truthful disclosure | 2.1-2.3, 3.2, 4.1 |
| Transcript creates proposal, not transaction | 2.1-2.3, 3.2, 4.1 |
| Edit, cancel, record again, and confirmation authority | 2.2-2.3, 3.2, 4.1 |
| SQLite/source persistence and stable outbox identity | 2.2-2.4, 3.2, 4.1 |
| Optional device TTS and non-blocking failure | 2.1-2.4, 3.1-3.2, 4.1 |
| Failure/retry and complete manual fallback | 2.2-2.3, 3.2, 4.1 |
| English/French, HTG, and synthetic-only evidence | 2.2-2.3, 3.2, 4.1 |
| Labeled controls and enlarged-text reachability | 2.2-2.3, 3.2, 4.1 |
| Durable dispatch, component return, Android acceptance, and central close-out | 1.3, 2.1-2.5, 3.1-3.2, 4.1-4.4 |

Tasks are ordered by dependency: Gate 1 and central pin precede component
proposal; component Apply precedes component Verify/delivery; returned
component evidence precedes Android system acceptance and central Verify; Sync
and Archive remain last. Component-local implementation detail stays in the
mobile component change rather than being assigned file-by-file from this
planning repository.

## Safety, Ownership, and External State

- Central planning owns the contract, dispatch ledger, return aggregation, and
  system evidence. The mobile repository owns application code, dependency
  changes, tests, builds, and its local OpenSpec lifecycle.
- All fixtures, transcripts, screenshots, logs, and device checks remain
  synthetic. No audio, participant data, credentials, backend call, AWS, live
  speech provider, receipt/OCR, or production resource is in scope.
- The proposed `expo-speech` dependency is not installed by this checkpoint.
  The component proposal must resolve its SDK-compatible version and license,
  audit, attribution, and recovery evidence before acceptance.
- The temporary public mobile repository and EAS project must transfer to HRF
  before participant, pilot, or production use.
- A new EAS build/artifact operation is an external vendor write and requires
  exact, current, just-in-time owner approval at task 3.1. Planning approval is
  not standing EAS permission.
- Public GitHub inspection returned no open central issue or pull request, and
  repository configuration names no Project target. GitHub tracking remains
  absent rather than inferred; no issue or Project mutation is required for
  this slice unless separately configured.

## Recovery and Portability

The central controller and registered branch provide idempotent resume state.
The future component change must register its exact resources before creation,
retain the central pin, and return immutable revisions. Before Archive, rollback
removes only speech entry points and the new dependency while preserving the
Phase 1 manual path and compatible stored records; after Archive, correction
uses a new change. Product-specific repository names and paths occur only in
product-scoped artifacts, not reusable skills or adapters.

## Validation

| Check | Result | Coverage |
| --- | --- | --- |
| `openspec validate prototype-speech-proposal-confirmation --strict --no-interactive` | Passed | Selected proposal/delta/design/tasks structure and semantics |
| `openspec validate --all --strict --no-interactive` | Passed: 6 items, 0 failures | Selected change plus five accepted living specifications |
| `git diff --check` | Passed | Whitespace and patch integrity |
| Bounded sensitive-pattern review | Passed | New planning artifacts contain no credential-like material |
| `validate-implementation-quality.mjs evidence/local-planning-review.json` | Passed | Schema-valid advisory rereview result |

## Gate 1 Resolution

Joe Rice explicitly approved Gate 1 and directed the bounded delivery to
continue on 2026-08-17. Task 1.1 is complete, and the exact decision and scope
are retained in `gate-1-approval.md`. A later EAS vendor write still requires
its own just-in-time approval.

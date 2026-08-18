# M1 Speech Proposal Confirmation — Central Verification

Date: 2026-08-18

## Assessment

| Dimension | Result |
| --- | --- |
| Completeness | 11 of 14 central tasks complete after this report; 2.4 is a non-behavioral cleanup warning, and 4.3-4.4 are the pending Gate 2 and close-out actions. |
| Correctness | All 8 approved requirements and 19 scenarios have component and/or installed-device evidence. |
| Coherence | The implementation follows the deterministic-local fixture, shared confirmation-path, device-TTS adapter, keyed localization, and visible-touch-fallback decisions. |

No contract divergence is reported by the archived mobile component. The
Android 15 acceptance closes the previously outstanding device-TTS and
enlarged-text evidence. This is verification evidence, not approval to Sync or
Archive.

## Authoritative evidence

| Evidence | Covers |
| --- | --- |
| Central `linkage.md` | Pinned contract, dispatch, mobile return, component revisions, and no-divergence statement. |
| Component formal Verify, mobile revision `9aa9d783d8fd033b629ef6588c29761618b22c77` | Formatting, type-check, six Jest suites / 23 tests, accessibility semantics, Android configuration, strict OpenSpec, dependency, audit, secret, scope, attribution, portability, and recovery checks. |
| Component delivery/archive revision `6dfc4ad79af8310dcc36d3617578878275215a68` | Exact integrated component `main` revision and archived component change. |
| `ai-planning/evidence/m1-speech-proposal-eas-build-gate.md` | Authorized EAS project, source revision, internal APK boundary, build ID, and frozen credential boundary. |
| `ai-planning/evidence/m1-speech-proposal-e2e.md` | Joe Rice's installed Android 15 run: truthful sample disclosure, proposal-before-save, live device TTS, edit/re-record, confirmation, fallback, persistence, French, accessibility, and offline/no-provider boundary. |

## Requirement and scenario mapping

| Requirement | Scenarios verified | Evidence and result |
| --- | --- | --- |
| Synthetic offline proposal path | Synthetic speech example is started offline; prototype sample boundary is displayed; live provider behavior is requested | Component deterministic provider/disclosure tests plus Android acceptance confirm a local fixed fixture, visible no-recording disclosure, and no microphone, provider, network, backend, or upload path. Passed. |
| Editable proposal, not transaction | Known transcript produces a proposal; proposal is shown before confirmation | Component proposal/no-save tests and Android review screen show the raw fixture, `Suggested from speech`, editable 500 HTG proposal, and unchanged records before confirmation. Passed. |
| Review, edit, cancel, record again | User edits and confirms a suggestion; user cancels the suggestion; user records again | Component flow tests cover edit/cancel/re-record; Android acceptance exercised edit or record-again and explicit confirmation. Passed. |
| Durable local transaction path | Speech proposal is confirmed offline; app restarts after speech confirmation | Component SQLite/outbox/idempotency tests and Android restart acceptance confirm one local saved result with no duplication. Passed. |
| Optional device TTS | User requests spoken confirmation; device TTS is unavailable | Component adapter success/error tests cover both outcomes; Android acceptance heard live synthesized text and confirmed no prerecorded audio. Visible controls remain the fallback. Passed. |
| Failure keeps manual fallback | Speech fixture reports no usable message; user chooses manual fallback | Component unavailable/manual tests plus Android acceptance confirm retry and manual sale remain usable without data loss. Passed. |
| Localized synthetic copy | French resources are active; non-synthetic evidence is encountered | Component locale tests and Android French acceptance passed. Reviewed evidence uses synthetic HTG data only. Passed. |
| Accessible device controls | Screen reader semantics are inspected; text size is enlarged; central close-out is evaluated | Component accessibility-semantic checks passed. Android 15 run passed at Font size 200% and Display size Largest, including speech start/review and unavailable/manual-fallback actions. This report supplies the required central evaluation; closure still requires Gate 2. |

## Design constraints checked

- The transcript is a disclosed deterministic fixture, not captured audio.
- The fixture feeds the existing editable draft and explicit SQLite confirmation
  path; source context is separate from confirmed values.
- `expo-speech` is used behind a device-TTS boundary; audio is optional and
  cannot mutate proposal or transaction state.
- English/French keyed UI copy and visible touch controls remain authoritative;
  Haitian Creole, live recognition, translation, backend, and production use
  remain deferred.
- EAS output was limited to one approved internal Android APK and did not
  submit, deploy, or alter credentials.

## Task mapping

| Task IDs | Status and evidence |
| --- | --- |
| 1.1-1.3 | Complete: central approval, planning review, pushed dispatch, and linkage ledger. |
| 2.1-2.3, 2.5 | Complete: archived mobile change, implementation, formal component verification, and durable return. |
| 2.4 | Warning: formal Verify, Sync, Archive, and merge completed. Eligible component workspace cleanup remains unperformed because the installed `sdd-workspace-cleanup` skill lacks its required script asset; no substitute was used. This does not affect delivered mobile behavior or its archived evidence. |
| 3.1-3.2 | Complete: authorized EAS build and successful exact-build Android 15 acceptance. |
| 4.1-4.2 | Complete: this report and the central validation results below. |
| 4.3-4.4 | Pending: human Gate 2 decision, then exact Sync, Archive, integration, and eligible cleanup. |

## Central validation — 2026-08-18

| Command | Outcome | Scope |
| --- | --- | --- |
| `openspec context --json` | Resolved this repository as the nearest local OpenSpec root; no status errors. | Central planning root. |
| `openspec config get workflows` | `explore`, `propose`, `apply`, `verify`, `sync`, `archive`. | Approved lifecycle configuration. |
| `openspec list --json` | The active change was `prototype-speech-proposal-confirmation`, 9/14 tasks complete before this report's task updates. | Current lifecycle position, not a test suite. |
| `openspec validate --all --strict --no-interactive` | 6 passed, 0 failed: five living specs and this active change. | OpenSpec artifact validity. |
| `git diff --check` | No output; no whitespace or patch errors. | Approved changes plus preserved unrelated changes. |
| `git status --short` | Recorded this change's evidence/task/ledger edits alongside pre-existing unrelated planning and research changes; none were overwritten. | Worktree scope. |

## Warnings and residual gaps

- The component's registered-workspace cleanup cannot be claimed because its
  required installed skill asset is unavailable. This is non-behavioral and
  remains visible until a conforming cleanup capability is available.
- This prototype does **not** prove microphone capture, speech recognition,
  Haitian Creole quality, translation, cloud AI, backend synchronization,
  authentication, receipt/OCR, analytics, iOS, deployment, or pilot/production
  readiness.
- The temporary mobile repository and EAS project must transfer to Home Roots
  Foundation before any participant, pilot, or production use.

## Gate 2 decision

Joe Rice approved Gate 2 on 2026-08-18 after reviewing this report. The
approval authorizes central Sync, Archive, integration, and eligible cleanup
for this verified change. The non-behavioral component workspace-cleanup
limitation and prototype-only boundaries remain recorded; neither is a claim
that those deferred product capabilities were delivered.

Central Sync completed through PR #2, merged to `main` at
`59432c5769e1f595e431cee55a83f63b17d246b2`, after the exact
delta-to-living-spec comparison and strict validation recorded above. No
GitHub issue or Project record is configured for this slice, so there is no
tracking state to reconcile.

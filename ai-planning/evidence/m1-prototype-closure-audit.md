# M1 Rapid Thin-Slice Prototype — Closure Audit

Date: 2026-09-06
Change: `close-m1-prototype`
Status: Prepared for owner verification and explicit archive approval

## Summary

M1 closes with two of its three phases delivered and the third deferred in full.

| Dimension | Result |
| --- | --- |
| Phase 1, manual offline transaction | Delivered, archived, synced, accepted on the representative physical Android device |
| Phase 2, mocked speech proposal and device text-to-speech | Delivered, archived, synced, accepted on the representative physical Android device |
| Phase 3, receipt capture and extraction | **Not delivered.** Discontinued 2026-09-06 and moved in full to M1.3 |
| Accepted specifications | Two M1 capabilities accepted; nothing from the receipt work entered `openspec/specs/` |
| Unmet PRD requirements | REC-001, REC-002, REC-003, REC-004 owed at V1, carried by M1.3 and M8 |
| Additional delivered capability | Haitian Creole interface resources, component-archived 2026-09-05, recorded centrally for the first time here |

M1 existed to burn down the riskiest V1 assumptions early. Offline-first
durability and proposal-then-confirm were both proven on real hardware. Receipt
extraction was the third risk and remains unproven. That is stated here as a gap,
not resolved by archive placement.

## Delivered Slices

| Slice | Central artifacts | Accepted specification | Component delivery |
| --- | --- | --- | --- |
| Manual offline transaction | `openspec/changes/archive/2026-08-15-prototype-manual-offline-transaction/` (planning contract) and `openspec/changes/archive/2026-08-17-m1-manual-offline-delivery/` (delivery envelope) | `openspec/specs/prototype-manual-offline-transaction/spec.md` | Component change archived at `9f8295bdae2bccd4bc0a76256a5b80681b13198f`; integrated to component `main` at `8ac303e93f47baa52d27f0a4114d17fa8309cfaa` |
| Speech proposal and confirmation | `openspec/changes/archive/2026-08-18-prototype-speech-proposal-confirmation/` | `openspec/specs/prototype-speech-proposal-confirmation/spec.md` | Component delivery and archive at `6dfc4ad79af8310dcc36d3617578878275215a68`; formal Verify at `9aa9d783d8fd033b629ef6588c29761618b22c77` |

## Acceptance Criteria Mapping

| M1 acceptance criterion | Result | Evidence |
| --- | --- | --- |
| A synthetic entrepreneur can record a sale or expense while offline and see it after app restart | Met | [m1-manual-offline-e2e.md](m1-manual-offline-e2e.md); airplane-mode sale and expense with force-close and reopen |
| The mocked speech transcript produces a proposal, not a final transaction | Met | [m1-speech-proposal-e2e.md](m1-speech-proposal-e2e.md); the `Use speech` path presents visible example text, then an editable proposal before any save |
| Text-to-speech can read a confirmation summary | Met | [m1-speech-proposal-central-verification.md](m1-speech-proposal-central-verification.md); Android 15 acceptance closed the outstanding device-TTS evidence |
| Manual entry remains available if speech or text-to-speech fails or is unavailable | Met | [m1-speech-proposal-e2e.md](m1-speech-proposal-e2e.md); deterministic unavailable state with manual sale fallback exercised |
| A versioned, signed Android APK is produced through a documented, repeatable build process and installs on a representative physical device without a developer workstation | Met | EAS builds `db6deffa-27f5-43d3-8f1b-9a25fc26678b` (version 1.0.1, Android build 2) and `6dd64511-469e-4cca-b1a0-0aa4e11d8b0d`; boundary recorded in [m1-speech-proposal-eas-build-gate.md](m1-speech-proposal-eas-build-gate.md) |
| A tester can open the installed APK, enter a synthetic sale or expense offline, force-close, reopen, and find the record intact | Met | [m1-manual-offline-e2e.md](m1-manual-offline-e2e.md); executed by Joe Rice on the representative U656AC running Android 15 |
| Speech and text-to-speech permission-denied or unavailable-device states preserve manual entry and fail safely | Met | [m1-speech-proposal-e2e.md](m1-speech-proposal-e2e.md) and [m1-speech-proposal-central-verification.md](m1-speech-proposal-central-verification.md) |
| The installed prototype contains only synthetic data and is distributed only to authorized prototype testers | Met | Both acceptance records report synthetic HTG examples only; internal-distribution APK with the artifact link shared only with authorized testers; no submission or store release |
| The prototype demonstrates viability without adding admin portal, loans, full inventory, full AI Growth Coach, or production data | Met | [m1-manual-offline-central-verification.md](m1-manual-offline-central-verification.md); no backend, AWS, cloud, iOS, or receipt behavior was introduced |

All nine current acceptance criteria are met. The criteria that previously
covered receipt capture and camera-permission fallback were removed from M1 on
2026-09-06 when the phase was deferred; they now live in the M1.3 acceptance
list rather than being silently dropped.

## Blocking Questions

| Question | Resolution |
| --- | --- |
| Is SQLite required in phase 1 even if it slows the first screen slightly? | Yes. Delivered in phase 1 and proven by restart durability on the device. |
| Should phase 1 include real backend sync or only a sync-shaped local stub? | Local stub only. The component contains a queued outbox shape with no HTTP; the live proof is M1.2. |
| Deterministic fixtures or real speech for the interaction proof? | Resolved for M1: deterministic fixtures. M1.1 evaluates real offline English, French, and Haitian Creole speech. |
| Is a simple camera photo enough, or is edge detection required? | Resolved 2026-09-06: simple photo or local image selection is sufficient. Now applies to M1.3. |
| Which OCR path is acceptable? | Resolved 2026-09-06: on-device best-effort behind a replaceable interface, evaluated at M1.3 against a frozen photographed corpus. Cloud extraction is M8. |

## Deferred Receipt Scope — Named Gap

Phase 3 delivered nothing. The scope moved in full to M1.3 on 2026-09-06.

| PRD requirement | Status after M1 | Carrier |
| --- | --- | --- |
| REC-001, receipt images captured using the device camera | Unmet | M1.3 |
| REC-002, AI extraction to reduce manual entry | Unmet | M1.3 for the offline degraded path; M8 for the connected accurate path |
| REC-003, user confirmation before creating financial records | Unmet for receipts; the equivalent rule is proven for manual and speech sources | M1.3 |
| REC-004, original receipt images stored for future reference | Unmet | M1.3 |

Appendix C.2 lists both "Receipt capture" and "Receipt extraction assistance" as
Version 1 must-haves, so these are deferrals within V1, not descoped
requirements.

The discontinued change is archived at
`openspec/changes/archive/2026-09-06-prototype-receipt-capture-ocr-review/` with
a `SUPERSEDED.md` record and discontinued banners on every document. Nothing from
it entered `openspec/specs/`. Successor work is governed by
[M1 Receipt Extraction Acceptance, Evaluation, and Localization Rules](../design-briefs/m1-receipt-extraction-acceptance-and-eval-rules.md).

### Receipt build artifacts with no passing evidence

Recorded so no future review encounters an unexplained build.

| Build | Date | Source | Outcome |
| --- | --- | --- | --- |
| `50639a3f-8077-43c3-8a17-865e7e567077` | 2026-08-19 | Commit `3f1efb93`, unrecoverable; lived only in an unpushed clone under `/private/tmp` | No device evidence recorded. No completion claim depends on it. |
| `ae66294f-600d-44f7-b512-8205cf318a54` | 2026-09-06 | Commit `7fbbc27`, since reset out of the feature branch | Failed: a save did not persist on a physical Android device, and the iOS build raised a JavaScript error. No logs or reproduction captured. Not released, not accepted, not usable. |

## Additional Delivered Capability — Haitian Creole Interface Resources

Delivered as a separate component change and archived on 2026-09-05. This is its
first central record.

| Item | Value |
| --- | --- |
| Implementation | Component commit `d537131`, "feat: add Haitian Creole as a third interface language" |
| Sync and archive | Component commit `23aa567`; component change `2026-09-05-m1-haitian-creole-resources-mobile` |
| Runtime resources | `src/i18n/en.json`, `src/i18n/fr.json`, `src/i18n/ht.json`; the selector presents `EN`, `FR`, `HT` |
| Resource contract | English is canonical; tests require every locale to carry the same non-empty key set |
| Formatting decision | Haitian Creole uses `fr-HT` number and date conventions because the platform lacks complete Kreyòl locale data. An explicit fallback, not native formatting. |
| Speech decision | `SPEECH_LANGUAGE` maps Haitian Creole to `fr-HT`; the no-speech review path is retained. No Haitian Creole device voice is assumed. |

**Open obligation — second translation pass.** Every `ht.json` value is
machine-generated and marked `unreviewed` in its `_meta` block. The agreed plan
is two passes: pass one machine-generated, shipped; pass two a separate approved
spec change that updates the resources with human-reviewed corrections. The
strings for review are staged at component
`docs/translation-review/ht-review-2026-09.md`. **Unreviewed Haitian Creole
strings must not be represented as human-reviewed and must not reach
participants until pass two completes.**

The roadmap previously deferred Haitian Creole UI localization to a post-M1
localization slice under M4 or a separately approved language change. It was
delivered as the latter, which is consistent with that deferral.

## Residual Gaps at M1 Closure

1. No receipt capability of any kind ships in M1; REC-001 through REC-004 are owed at V1.
2. Haitian Creole strings are machine-generated and unreviewed; pass two is not scheduled to a change yet.
3. No live backend synchronization exists. The outbox is local and queued only; M1.2 owns the live proof.
4. No iOS acceptance. iOS and TestFlight remain a separate later gate.
5. The mobile repository remains under the owner's personal GitHub account as a temporary public home and must transfer to HRF before any participant, production, or pilot use.
6. The evaluation corpus for M1.3 does not exist yet. Joe Rice owns assembly before M1.3 opens.
7. The autonomous SDD controller helper and the local-review validator helper were absent from the installed skill packages during the receipt work; no substitute controller or schema-validated local-review result was claimed.

## Validation Record

Commands run 2026-09-06 from the planning repository root. Results are recorded
in task 3.2 of `close-m1-prototype` and reproduced here at archive time.

| Check | Result |
| --- | --- |
| `openspec list --json` | One active change, `close-m1-prototype`, 9 tasks. No other change is open. |
| `openspec validate --all --strict --no-interactive` | 7 passed, 0 failed. Six accepted specifications plus this change. |
| `git diff --check` | Clean; no whitespace errors. |
| `git status --short` | Scope limited to this change, the closure audit, and the M1 documentation reconciliation. |
| Closure-audit link resolution | All relative links resolve. |
| Reconciled-document link resolution | All relative links in the roadmap and the M1 control brief resolve. |
| No-claim check | No document claims receipt delivery, implementation authorization, external-resource approval, or participant-data use. |

Skipped checks: none applicable. This change alters documentation and evidence
only; there is no code, test suite, build, or device operation in its scope.

## What Closure Does Not Authorize

M1 closure authorizes no implementation, no external resource or vendor account,
no cloud provisioning, no credential use, no participant or production data, and
no transfer of the mobile repository. M1.1, M1.2, and M1.3 each retain their own
separate approval gates.

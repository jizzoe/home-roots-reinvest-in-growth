# Discontinued and Superseded

Status: **Discontinued before merge on 2026-09-06. Not delivered, not verified, not synced.**
Archived: 2026-09-06
Central pin: `77884c2df34bf0e68e26f015abd42961ac6aee0d`

This change is filed here as a historical record. It is **not** a completed
slice. Nothing in it entered `openspec/specs/`, no component change was merged,
and no acceptance evidence exists. Do not read its presence in the archive as
completion.

## What this change was

The M1 phase-3 central envelope for receipt capture, bundled on-device Android
OCR, deterministic parser suggestions, and review before confirmation. Gate 1
was approved on 2026-08-18 and the component slice was dispatched to
`jizzoe/hrf-reinvest-to-grow-mobile-app`.

Central tasks 1.1 through 1.3 (Gate 1 approval, planning review, dispatch) were
completed. Tasks 2.1 through 4.4 were never completed.

## Why it was discontinued

Two implementation attempts failed, for two different reasons.

**Attempt 1 — lost, not failed.** Android build
`50639a3f-8077-43c3-8a17-865e7e567077` was produced on 2026-08-19 from commit
`3f1efb93`. That commit lived only in a self-contained clone under
`/private/tmp`, was never pushed, and is unrecoverable. This was confirmed
against the component repository's full object store (no garbage collection had
run), GitHub, every clone on the delivery machine, the Trash, IDE local history,
and EAS artifact storage. No device evidence was recorded from that build, so no
completion claim depends on it.

**Attempt 2 — failed on the device.** The rebuild reached 29 commits on
`feat/m1-receipt-capture-ocr-review` above base `94bbf5b`, with 13 test suites
and 325 tests green at `7fbbc27`. Internal preview APK
`ae66294f-600d-44f7-b512-8205cf318a54`, built from that exact commit on
2026-09-06, **did not persist a save on a physical Android device**, and the iOS
build raised a JavaScript error. No logs, stack trace, or reproduction were
captured before the reset decision.

Neither receipt commit (`6bb4c9e` first, `7fbbc27` last) is an ancestor of
component `origin/main`; both ancestry checks exited `1`. The local and remote
feature branch were reset to `94bbf5b` with a force-with-lease update. Component
`main` needs no revert because nothing from this change reached it.

**The structural cause.** The slice went through five read-only review loops.
Each closed real defects and each uncovered a new fault class or a nearby
variant: parser misreadings, fabricated dates, negative amounts read as
expenses, duplicate-transaction routes after a committed write was reported as
failed, receipt recovery failures, ordering mismatches, unwanted microphone
permission, and cent-level precision loss in aggregates. The loop did not
terminate because **this change never defined what "good enough" meant**, so
review had no stopping condition and "the parser is correct" was unfalsifiable.

## What replaces it

The scope was split on 2026-09-06 after a review of the JLP source documents and
the PRD:

| Successor | Milestone | Covers |
| --- | --- | --- |
| `prototype-receipt-image-capture` | M1 phase 3 | Image capture and selection, durable app-controlled storage, attachment to a manually entered expense, restart durability. Satisfies PRD REC-001, REC-003, REC-004. |
| `prototype-receipt-extraction-evaluation` | M1.3 | Bundled on-device recognition and deterministic parser suggestions, gated on a frozen photographed evaluation corpus with a sealed holdout and fixed exit criteria. Carries PRD REC-002, which remains owed at V1. |

The controlling document for the successor work is
[M1 Receipt Extraction Acceptance, Evaluation, and Localization Rules](../../../../ai-planning/design-briefs/m1-receipt-extraction-acceptance-and-eval-rules.md).
It supplies what this change lacked: measurable exit criteria, ten safety
invariants, explicit number, currency, anchor, identifier, and date rules for the
Haitian context, a frozen corpus with a sealed holdout, and stop conditions with
a pre-agreed fallback.

## What carries forward, and what does not

**Carries forward.** The behavioral requirements in this change's delta remain
broadly correct and were reused: synthetic and local-only operation, receipt
image and metadata preserved independently, explicit review and confirmation
through the existing expense path, and the requirement for component plus
physical-device evidence.

**Does not carry forward.** No code, test, fixture, or component change artifact
from `94bbf5b..7fbbc27` may be cherry-picked, copied, or revived as a starting
point. This includes `src/receipt/`, receipt repositories and schema, the
receipt-linked transaction flow, receipt-specific `App.tsx` screens and state
transitions, parser vocabulary and its evaluation and mutation tests, receipt
localization strings, the component change package
`openspec/changes/m1-receipt-capture-ocr-review-mobile/`, and the receipt
dependency, verification, and adversarial-review documents. The last round's
invariants are concepts to reassess in a fresh design; they do not make the
discarded implementation safe.

**Explicitly retained and unaffected.** Haitian Creole interface resources were a
separate component change, merged to component `main` before the receipt work
(`d537131` implementation, `23aa567` sync and archive). Resetting the receipt
branch restored that baseline; it did not remove the third language. Its
machine-generated `ht.json` values remain marked `unreviewed` pending a second
human-translation pass.

## Related records

- [M1 Receipt Slice Reset and Fresh-Start Handoff](../../../../ai-planning/handoff-docs/m1-receipt-slice-reset-and-restart-handoff.md)
- [M1 Receipt Cleanup and Restart Plan](../../../../ai-planning/plans/m1-receipt-slice-cleanup-and-restart-plan.md)
- [V1 Scope Map and Milestone Plan](../../../../ai-planning/design-briefs/V1%20Scope%20Map%20and%20Milestone%20Plan.md), sections M1 and M1.3

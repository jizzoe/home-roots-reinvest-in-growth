# M1 Receipt Capture/OCR — Reset and Fresh-Start Handoff

Date: 2026-09-06
Status: **discontinued before merge**; do not resume the old feature branch

## Decision

The receipt capture and on-device OCR slice was stopped after repeated review
and remediation cycles. It must be treated as an unsuccessful prototype,
not as a nearly-complete feature.

The immediate reason is real installed-build evidence: the Android preview APK
did not save on a physical device, and the iOS build produced a JavaScript
error. Those reports are unresolved. Do not spend another session patching the
old implementation, and do not use its passing automated checks to overrule
that evidence.

Start a future receipt effort as a new, deliberately smaller change from the
then-current `main`. Reuse only decisions that have been independently accepted
below, especially the separate Haitian Creole resource change.

## Merge and rollback state

Mobile component repository:

`/Users/joerice/git/joericearchitect/hrf-reinvest-in-growth/hrf-reinvest-to-grow-mobile-app`

| Item | State |
| --- | --- |
| Receipt/OCR branch | `feat/m1-receipt-capture-ocr-review` |
| Last local receipt/OCR revision | `7fbbc270e243768b33b84194b72212f542128fa7` (`strengthen receipt invariants`) |
| Feature branch base | `94bbf5bb2233222733d89a92235f3a2b814081e9` (`Merge Haitian Creole interface resources`) |
| `origin/main` containment | Neither first receipt commit `6bb4c9e` nor last receipt commit `7fbbc27` is an ancestor of `origin/main`. Exit status was `1` for both checks. |
| Receipt/OCR commits above the base | 29, all confined to the feature branch; the last two are local-only and the preceding branch head is `7bbe853`. |
| Gate 2 / Archive | Not approved; not eligible for Verify, Sync, Archive, merge, release, or pilot use. |

Both the local and remote feature branch were reset to the base revision above
with a force-with-lease update. `main` needs no revert because nothing from this
change was merged there. The old commits may remain recoverable through local
reflog/object retention for a limited time, but they are no longer reachable
from the feature branch.

## What happened

The slice added receipt photo capture/selection, bundled ML Kit OCR, a
deterministic receipt parser, receipt persistence, review and recovery screens,
and receipt-to-transaction linking. It also changed the application and journal
model in support of those flows.

It went through five read-only review loops. Each loop closed some actual
defects, but later review uncovered a new fault class or a nearby variant:

1. Initial review found false verification claims, parser mistakes, missing
   rendered uncertainty, and storage test gaps.
2. The first parser remediation was largely a denylist: it suppressed known
   bad words but could still reinterpret ordinary receipt text. It even
   suppressed `TOTAL HTG`, the app's own currency form.
3. Later rounds found duplicate-transaction routes after a committed write was
   reported as failed, fabricated dates, negative amounts interpreted as
   expenses, receipt recovery failures, ordering mismatches, and unwanted
   microphone permission.
4. A further loop corrected exact individual-cent storage and display, tendered
   wording, OCR number-marker dates, malformed recovery data, and the
   duplicate-confirmation recovery path. It then exposed precision loss in
   aggregated totals and additional tendered/identifier variants.
5. The final local work introduced documented invariants and generated/
   metamorphic tests, affirmative payable-context parsing, `bigint` aggregate
   arithmetic, structural identifier-date exclusion, and confirmation-state
   tests. Automated evidence was green at `7fbbc27` (13 suites / 325 tests),
   yet installed-device behavior still failed.

The central lesson is not that more word lists are needed. The implementation
became too complex to establish trustworthy behavior through successive local
patches. Fresh work should begin with a thin end-to-end device path and a small
set of product decisions that can be shown working on a real receipt and a real
device before parser/persistence sophistication is added.

## Installed-build evidence

An authorized internal Android preview APK was built from exact commit
`7fbbc27`:

- EAS build ID: `ae66294f-600d-44f7-b512-8205cf318a54`
- Profile: `preview`, internal-distribution APK
- Completed: 2026-09-06 00:41:34
- App identifier: `org.homerootsfoundation.reinvesttogrow`

Observed after installation:

- Android: a save did not persist.
- iOS: a JavaScript error occurred.

No debug logs, stack trace, screenshot, or reproducible sequence was captured
before the reset decision. The mobile component is Android-first; the iOS
report is still important as a symptom, but it was not an approved delivery
target or a substitute for Android acceptance testing. Do not describe the
APK as released, accepted, or usable.

## Do not carry this implementation forward

Do not cherry-pick, copy, or revive any receipt/OCR code or change artifact
from `94bbf5b..7fbbc27` as a starting point. This includes:

- `src/receipt/`, receipt repositories, receipt schema and receipt-linked
  transaction flow;
- receipt-specific `App.tsx` screens and state transitions;
- receipt parser vocabulary, parser/evaluation/mutation tests, and receipt
  localization strings;
- the active change package
  `openspec/changes/m1-receipt-capture-ocr-review-mobile/`;
- receipt dependency/configuration changes and the receipt verification,
  dependency, and adversarial-review documents.

The old reviews and eval documents are useful as historical caution, not as
evidence that their code or requirements are acceptable. In particular, the
last invariants are concepts to reassess in a fresh design; they do not make the
discarded implementation safe.

## Haitian Creole support — retain this

Haitian Creole was a **separate change** and was merged to mobile `main` before
the receipt work. It is not being reverted.

| Item | Accepted location / decision |
| --- | --- |
| Implementation commit | `d537131` — `feat: add Haitian Creole as a third interface language` |
| Archive/sync commit | `23aa567` — `docs: sync and archive Haitian Creole resources change` |
| Runtime resources | `src/i18n/en.json`, `src/i18n/fr.json`, and `src/i18n/ht.json` |
| Locale selector | The app presents `EN`, `FR`, and `HT`; the prior duplicate `FR` label defect was fixed by displaying each locale code. |
| Resource contract | English is canonical; tests require every locale to have the same non-empty key set and preserve English/French wording. |
| Formatting decision | Haitian Creole uses `fr-HT` number/date conventions because the platform lacks complete Haitian Creole locale data. This is an explicit fallback, not native platform Kreyòl formatting. |
| Speech decision | `SPEECH_LANGUAGE` maps Haitian Creole to `fr-HT`; the app must retain its no-speech/unavailable on-screen review path. No Haitian Creole device voice is assumed. |
| Translation quality | Every `ht.json` value is machine-generated and marked `unreviewed` in its `_meta` block. It must not be represented as human-reviewed or used with participants until a Haitian Creole speaker reviews it. |
| Human review handoff | `docs/translation-review/ht-review-2026-09.md` lists the English, French, and Haitian Creole strings for correction in a separate approved change. |
| Original verification | `docs/implementation-evidence/m1-haitian-creole-resources-verification.md` records the accepted scope and residual gaps. |

The receipt branch changed `ht.json`, French/English resource files, and the
translation handoff in receipt-specific ways. Resetting it to `94bbf5b` restores
the already-merged Haitian Creole baseline; it does **not** remove the accepted
third-language feature.

## Guidance for a new session

1. Begin from current `origin/main`, not the reset receipt branch and not the
   old EAS artifact.
2. Keep the existing Haitian Creole support exactly as described above; do not
   retranslate it opportunistically as part of a receipt change.
3. Run OpenSpec Explore/Propose for a new receipt decision. First decide whether
   the immediate user value is photo retention/manual entry, OCR-assisted review,
   or something narrower. Do not assume all are one change.
4. Before building a parser, define the exact device acceptance path, capture a
   real/synthetic test receipt, and prove capture, save, restart, and manual
   recovery on an installed Android APK. Capture logs/screenshots for any
   failure.
5. Treat receipt amounts as high-risk financial suggestions: blank/ask for
   manual entry when uncertain. Make the user-visible review and stored amount
   demonstrably the same value, and prove a confirmation cannot make a second
   record.
6. Require fresh review against a single exact commit only after device evidence
   exists. Green unit tests and self-authored evaluation evidence are necessary
   but not sufficient.

## Related records

- Earlier historical handoff (now superseded for current state):
  `ai-planning/handoff-docs/m1-receipt-slice-session-handoff.md`
- Research on preventing remediation loops:
  `ai-planning/research/tech-research/preventing-repeat-ai-coding-remediation-loops/`
- Eval and invariant learning resources:
  `ai-planning/research/tech-research/ai-coding-evals-and-invariants/`

This document is intentionally stored in the central planning repository so it
survives removal of the component feature branch.

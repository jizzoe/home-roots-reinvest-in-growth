# M1 Receipt Extraction — Acceptance, Evaluation, and Localization Rules

Status: Approved by the owner on 2026-09-06. Controls the M1.3 Receipt Capture and Extraction Evaluation milestone; feeds OpenSpec Propose once the evaluation corpus exists.
Date: 2026-09-05, decisions recorded 2026-09-06
Companion control brief: [M1 Rapid Thin-Slice Prototype](m1-rapid-thin-slice-prototype.md)
Deferred scope: [M1 Later-Phase Deferred Work](m1-later-phase-deferred-work.md)
Prior attempt: [M1 Receipt Slice Reset and Fresh-Start Handoff](../handoff-docs/m1-receipt-slice-reset-and-restart-handoff.md)

## Purpose

The first receipt attempt failed for a reason that was never written down: **"good
enough" had no definition, so review had no stopping condition.** Five review loops
each closed real defects and each uncovered a new variant, because "the parser is
correct" is unfalsifiable — there is always another receipt.

This document supplies the missing definition. It converts the accepted
best-effort product direction into measurable exit criteria, hard safety
invariants, explicit number/date/currency rules for the Haitian context, and a
frozen evaluation corpus that decides accuracy questions instead of reviewer
judgment.

Nothing here changes what the prototype is trying to prove. It changes only how
the slice is allowed to end.

**Milestone placement.** All receipt work moved out of M1 on 2026-09-06.
Extraction moved first, because the evaluation corpus these rules depend on does
not yet exist and assembling a good one takes time. Image capture and storage
then moved with it so that M1 could close on its delivered phases rather than
wait. M1 therefore ships no receipt capability, and PRD REC-001 through REC-004
are recorded as owed at V1. M1.3 carries all of it. This is the pre-agreed
fallback in the "Stop Conditions" section, invoked deliberately and early rather
than after a sixth review loop.

**M1.3 has two parts, in order.** Capture and storage come first and must pass
device gate A on an installed build before any parser work begins. Extraction
follows, measured against the corpus. The two parts share this document's safety
invariants; only the second is subject to the accuracy targets.

## Source Basis

| Source | What it establishes |
| --- | --- |
| PRD Requirement BJ-004 / REC-002 | "The system shall use AI extraction to reduce manual entry." Extraction is a requirement, not an optional flourish. |
| PRD Appendix C.2, Must Have — Version 1 | Lists "Receipt capture" and "Receipt extraction assistance" as V1 must-haves. |
| PRD §19.3, Version 1.1 | "Better receipt extraction" is the deferred improvement; V1 carries the baseline. |
| Features Reference Sheet, Appendix D | Reduces receipt management to capture, store, **extract available information**, allow correction, confirm. |
| [JLP UX Synthesis](JLP%20UX%20Synthesis%20and%20V1%20Design%20Decisions.md) | Extraction is best-effort and **cannot block record completion**; no OCR output may silently create or modify an authoritative financial record. |
| [Reset handoff](../handoff-docs/m1-receipt-slice-reset-and-restart-handoff.md) | Device evidence must precede parser sophistication; green unit tests are necessary but not sufficient. |

**No source anywhere in this project sets an accuracy bar for on-device
extraction.** The bar below is therefore a decision to be recorded, not a
requirement to be discovered.

## Product Framing

Offline on-device extraction is the **degraded path**. It is expected to fill
some fields, some of the time, on some receipts. Connected cloud extraction —
a receipt-specific service or a general document-AI service — is the accurate
path and is owned by M8.

This framing is what makes a deliberately weak parser correct rather than
embarrassing, and it dictates the shape of every rule below: **a blank field is
a success outcome; a plausible wrong number is a defect.** A blank costs the
user a few seconds of typing. A wrong amount that gets confirmed is a corrupted
financial record, which is the one thing this product may not do.

## Field Tiers

BJ-004 names Merchant, Date, Items, Quantity, Price, Total, and category. M1
narrows this, consistent with the already-recorded line-item deferral to M8.

| Tier | Fields | Rule |
| --- | --- | --- |
| **Tier 1 — measured** | Total amount, occurrence date | Subject to the precision and coverage targets below. A wrong value here is a financial defect. |
| **Tier 2 — reported, untargeted** | Merchant name, short description | Suggested when available, no accuracy target, no gate. A wrong merchant string is cosmetic and always visible for correction. |
| **Tier 3 — forbidden in M1** | Category, line items, quantities, unit prices, inventory items, tax breakdown | Never inferred. Deferred to M8 by prior decision. |
| **Fixed** | Currency | Always `HTG`. Never inferred, never converted. |

Currency is fixed rather than parsed so that a dual-currency receipt cannot
silently produce a gourde amount from a dollar figure.

## Exit Criteria

### Two fixture sets, not one

The corpus has been doing two different jobs, and conflating them is how a green
score becomes a failed device. They are separated permanently:

**1. Rule fixtures — text level.** Synthetic OCR text strings exercising every N,
C, T, X, and D rule directly. No camera, no images, milliseconds to run, and they
belong in the component repository as ordinary unit tests. These prove the parser
rules are implemented as written.

**2. The evaluation corpus — photographs.** Real photographs taken through the
application's own capture path. The precision and coverage targets, the 20/10
split, and the gate apply to this and only this. It proves the recognizer plus
parser survives real capture.

### The evaluation corpus

- **At least 30 photographed receipts**, captured through the app's own capture
  path. Not rendered, not scanned, not typed.
- **Synthetic content only**: invented merchants and values, or the owner's own
  purchases. No participant, program, or third-party financial data.
- **Representative of the operating context**, not of a US retail chain: HTG
  amounts, French and Haitian Creole merchant text, thermal print, genuine
  handwriting, poor lighting, folds, creases, partial cuts, at least one
  dual-currency receipt, and at least two receipts a human genuinely cannot read.
- **Date coverage must exercise the ambiguity**: at least six receipts whose day
  is 12 or lower, so rule D1 is actually tested. At least two with a month name,
  one with no year, and one older than twelve months.
- **Split 20 development / 10 sealed holdout.** The holdout is not viewed during
  implementation. Without a holdout you are not evaluating, you are overfitting —
  which is precisely what the earlier denylist rounds were.
- **Ground truth is hand-labelled JSON** beside each image: amount in integer
  centimes, ISO date, merchant string, and a `human_readable` flag used as the
  coverage denominator.
- **The evaluation runner prints only aggregate scores in holdout mode**, never
  which case failed. If you cannot see which receipt broke, you cannot tune to
  it. This makes the discipline structural rather than a matter of willpower.
- **The corpus is frozen at Gate 1.** See "Stop Conditions".

### Assessment of the existing synthetic corpus (2026-09-06)

A 32-image synthetic corpus exists at
`ai-planning/design-assets/sample-reciepts`, generated by `build-corpus.mjs`.
It was reviewed on 2026-09-06: four images opened directly, all 32 labels read,
and the generator read in full.

**Keep and extend — as rule fixtures.** The schema is sound: integer-centime
ground truth, ISO dates, `human_readable` and `amount_expected_blank` flags, a
reproducible generator, no real-person data, good anchor variety across Haitian
Creole and French (`TOTAL POU PEYE`, `MONTAN`, `MONTAN TOTAL`, `NET A PAYER`,
`SOMME`), real separator variety (`1750,00`, `16,500`, bare `785`), dual-currency
cases, and identifier lines such as `Resi #: S-4200` that exercise X1.

**Do not use as the evaluation corpus.** The images are SVG rendered to PNG
through `qlmanage`: vector-crisp text, uniform lighting, no camera involved. A
bundled recognizer reads them at or near 100%, so any score is meaningless and
the gate would pass immediately before failing on a device — the exact failure
mode of the first attempt, where 325 green tests preceded a build that would not
save. The difficulty variations are cosmetic: "handwritten" is an italic serif
font, "low light" is a dark background behind crisp text, and "unreadable" is a
fully legible receipt with the words `IMAGE TACHÉE / PA LIZIB` printed on it.

**Label defects to correct before use as rule fixtures:**

1. `ht-17` and `ht-18` carry `human_readable: false` while being plainly
   readable. That contradiction corrupts the coverage denominator.
2. Nine labels contradict rule C3: the `en-US` and `en-GB` receipts carry USD and
   GBP amounts with `amount_expected_blank: false`, but C3 requires a blank for a
   non-HTG receipt. Either the labels change or C3 does; the recommendation is to
   fix the labels and add `£` to C3.
3. In `ht-01`, `ht-02`, and `ht-14` a line item equals the total, so those cases
   cannot catch a parser that takes the largest number or a line item — the wrong
   answer coincides with the right one.
4. Every date has a day greater than 12, so D1, the most consequential date
   decision in this document, is never exercised. There are no month-name dates,
   no missing years, no stale or future dates, and no times of day.
5. Nine of 32 cases are spent on `en-US` and `en-GB` locales that do not occur in
   the target market; two or three suffice to test currency refusal.

**Recommended path to a real corpus**, in order, and only the first two are
needed to unblock M1.3:

1. **Print and photograph the existing 32.** The labels stay valid, so none of
   that work is lost. Print them, introduce real creases and folds, photograph
   them in poor light with the representative device through the app's capture
   path.
2. **Hand-write about ten of them with a pen** and photograph those, replacing
   the italic-font "handwritten" cases. Real pen strokes are where a bundled
   recognizer actually fails, and that finding is worth having early.
3. **Genuine Haitian receipts** via HRF staff or contacts. Highest value, longest
   lead time. Start it in parallel; do not let it gate M1.3.

### Metrics

Definitions are exact so the gate is arithmetic, not argument.

| Metric | Definition | Target (holdout) |
| --- | --- | --- |
| Amount precision | correct amount suggestions ÷ amount suggestions offered | **≥ 0.95** |
| Amount coverage | amount suggestions offered ÷ receipts where a human can read a total | **≥ 0.40** |
| Date precision | correct date suggestions ÷ date suggestions offered | **≥ 0.95** |
| Date coverage | date suggestions offered ÷ receipts where a human can read a date | **≥ 0.30** |
| Merchant | reported for information | no target |

**Owner decision 2026-09-06: targets accepted as written.**

"Correct" means exact: amount to the centime, date to the calendar day. Partial
credit does not exist.

**Coverage may never be raised at the cost of precision.** If a change improves
coverage and lowers precision below target, the change is rejected regardless of
the net score. Blanks are free; wrong numbers are not.

**At a holdout of ten, a 0.95 precision target is arithmetically equivalent to
"no wrong suggestions at all."** If the parser offers four amounts, three correct
scores 0.75. This is accepted deliberately: the prototype is proving feasibility,
not certifying accuracy, and a wrong amount is the one outcome the product may
not produce. The consequence is that a single unlucky misread fails the gate and
cannot be distinguished from a genuinely weak parser. If that proves too brittle
in practice, the corrective is a larger corpus, not a lower bar.

### Safety invariants — 100%, every one a test

These are boolean, so they terminate. Any failure is a red build, independent of
accuracy scores.

| # | Invariant |
| --- | --- |
| I1 | The value displayed in review is identical to the value persisted. No re-parse, no re-format, no rounding between screen and storage. |
| I2 | No confirmed transaction exists without an explicit user confirmation action. |
| I3 | One confirmation creates at most one transaction and at most one outbox entry — including on repeated taps, retry after a reported failure, and crash-resume. |
| I4 | Every suggested amount is derivable as an exact token of the normalized OCR text. No arithmetic, no summing line items, no reconstruction of a value the recognizer did not produce. |
| I5 | Every suggested field can be cleared, and the expense still saves with that field blank. |
| I6 | Extraction failure, recognizer unavailability, or permission denial never prevents manual completion of the expense. |
| I7 | No receipt code path mutates the existing manual write path, outbox identity, or totals/aggregation code. |
| I8 | No HTTP request occurs during capture, extraction, review, or confirmation. Asserted, not assumed. |
| I9 | The Android manifest requests camera and media access only. No microphone. |
| I10 | Money is stored and computed as integer centimes end to end. No floating-point money arithmetic anywhere in the receipt path. |

I7 is mechanically checkable: the diff against the existing domain and storage
modules should be additive only.

### Stop conditions — the anti-loop clause

This section exists because the previous attempt had no way to end.

1. **The corpus decides accuracy, not reviewers.** Review verifies invariants,
   code safety, scope, and evidence. A reviewer who believes some receipt would
   parse wrongly records it as a **proposed corpus addition for a future
   change** — not as a defect in this one.
2. **The corpus is frozen at Gate 1.** Cases are added only through a separate
   approved change. A corpus that grows to chase the parser is measuring
   nothing.
3. **Two remediation rounds maximum** after the first full evaluation run. A
   third round triggers the fallback.
4. **Time box — confirmed 2026-09-06: three working sessions** after the corpus
   exists and device gate A passes, alongside the two-remediation-round cap.
   Whichever limit is reached first ends the attempt. If the holdout targets are
   unmet at that point, the slice ships with extraction disabled behind a flag
   defaulting to off — capture, storage, and manual entry only — and extraction
   moves to M8's connected path. Capture and storage still satisfy REC-001,
   REC-003, and REC-004; REC-002 is then explicitly owed at V1 and recorded as a
   residual gap.

Deciding the fallback in advance is what makes the box real. The flag-off path
must be the tested path, not an untested branch, or the fallback ships a
configuration nobody ran.

### Device gates

Automated evidence is necessary and not sufficient. The last build passed 13
suites and 325 tests and then failed to save on a physical device.

- **Gate A — capture only, no extraction.** Capture or select an image, persist
  it durably, attach it to a manually typed expense, force-close, reopen, confirm
  both image and transaction survive. Build the APK, install on the U656AC, run
  it. If persistence breaks here, it is found with almost no code in flight. This
  is also the first half of M1.3's own delivery, not merely a rehearsal: it is
  the receipt capability M1 deferred.
- **Gate B — extraction added.** On-device recognizer, parser, review screen,
  failure path. Rebuild, reinstall, retest, including the offline assertion and
  both EN and FR locales.

Gate A must pass before parser implementation begins.

## Localization and Internationalization Rules

These are the rules the previous attempt lacked, and they are where most of its
defects lived.

### Text normalization

- **N0** Matching is performed on text normalized to NFD with combining marks
  stripped and uppercased. `Espèces`, `ESPECES`, and `espèces` are the same
  token. Both French and Haitian Creole require this.

### Number formats

Haitian receipts appear with `1234`, `1,234`, `1 234`, `1234.50`, `1234,50`,
`1.234,50`, and `1,234.50`. Gourde amounts are frequently whole numbers, which
makes the separator genuinely ambiguous rather than merely inconsistent.

- **N1** A separator is a decimal separator **only** when followed by exactly two
  digits at the end of the token. Otherwise it is a grouping separator.
- **N2** When a token contains both `.` and `,`, the rightmost is the decimal
  separator only if N1 holds for it; otherwise both are grouping separators.
- **N3** A single separator followed by exactly three digits (`1,234`) is
  grouping. The value is 1234 gourdes, not 1.234. **Confirmed 2026-09-06.** This
  is not a coin flip: centimes have exactly two digits, so three digits after a
  separator cannot be a decimal fraction, and grouping is the only arithmetically
  valid reading. The residual risk is three-decimal *unit prices*, common on fuel
  receipts, and the parser never reads unit prices — only the anchored total.
- **N4** Values are parsed to integer centimes. Never float. Never round.
- **N5** Tokens with more than two decimal digits, more than nine integer digits,
  or a leading `-` yield **blank**. Negative values are never sign-flipped into
  expenses.

### Currency

- **C1** Currency is fixed `HTG`. The parser never converts and never infers.
- **C2** `HTG`, `G`, `Gde`, `Gdes`, and `Gourdes` are used **only as anchors**
  adjacent to a number, never as value modifiers. Note that `TOTAL HTG` is the
  application's own canonical form and must match, not be suppressed.
- **C3** If a receipt shows `$` or `USD` anywhere, the amount is left **blank**.
  Dual-currency receipts occur in Haiti; guessing which figure is the gourde
  total is exactly the class of inference this slice forbids.

### Total anchoring

- **T1** Included anchors (post-N0): `TOTAL`, `TOTAL HTG`, `AMOUNT DUE`,
  `BALANCE DUE`, `MONTANT`, `MONTANT TOTAL`, `NET A PAYER`, `TOTAL A PAYER`,
  `SOMME`, `TOTAL POU PEYE`, `MONTAN`.
- **T2** Excluded anchors: `SOUS-TOTAL`, `SOUS TOTAL`, `SUBTOTAL`, `TAXE`, `TVA`,
  `TCA`, `ESPECES`, `CASH`, `MONNAIE`, `RENDU`, `CHANGE`, `TENDERED`, `RECU`,
  `REMISE`, `RABAIS`, `ACOMPTE`.
- **T3** If a line matches both an included and an excluded anchor, it is
  excluded. Exclusion always wins.
- **T4** The candidate is the number on the anchor line, or on the line
  immediately following it when the anchor line contains none.
- **T5** Two or more distinct candidate values at equal anchor strength yield
  **blank**.
- **T6** Never "the largest number on the receipt." Never sum line items. No
  anchor means no suggestion.

T1/T2 are structural anchors with defined precedence — not a denylist of words
observed to have failed. That distinction is the whole difference from the
previous attempt.

### Identifier exclusion

- **X1** A number adjacent to an identifier anchor — `NIF`, `TVA`, `FACTURE`,
  `RECU NO`, `NO`, `#`, `TEL`, `CAISSE`, `TICKET` — is never a candidate for
  amount or date. Invoice numbers, tax IDs, phone numbers, and register numbers
  produced several defects in the previous attempt.
- **X2** A `HH:MM` or `HH:MM:SS` pattern is a time, never a date or an amount.

### Dates

- **D1** Numeric dates are read as **dd/mm/yyyy**, the French convention used in
  Haiti. **Confirmed 2026-09-06**, paired with D5. Roughly 39% of dates are
  ambiguous because both numbers are 12 or lower, and nothing in the digits can
  settle them. Blanking all of those would cost more than it protects, so the
  convention is assumed and the long-form display in D5 makes a misreading
  visible to the person confirming it. The case this gets wrong is an imported
  US-configured register printing mm/dd, which the corpus must include.
- **D2** Month names are accepted in English, French, and Haitian Creole
  (`August` / `août` / `out`, and so on).
- **D3** A missing year yields **blank**. The current year is never assumed —
  that is fabrication, and the field already defaults to today.
- **D4** Future dates, and dates more than twelve months old, yield **blank**.
- **D5** **The review screen renders every parsed date in long form with a month
  name in the active locale** — "3 avril 2026", never "03/04/2026". This makes
  a day/month misreading immediately visible to the person confirming it, which
  is the only reliable defense against D1 being wrong for a given receipt.

### Display and locale

- **L1** All review, failure, and confirmation strings exist in `en`, `fr`, and
  `ht`, under the existing resource contract: identical key sets, and `ht`
  values remain marked `unreviewed` pending human translation review.
- **L2** Numbers and dates render using the app's existing locale formatting,
  including the recorded `fr-HT` fallback for Haitian Creole.
- **L3** Raw OCR text is displayed verbatim. It is never localized, translated,
  corrected, or reflowed.
- **L4** Suggested fields carry the existing `SourceLabel` treatment
  ("suggested from receipt") and are visually distinct from confirmed values,
  per the accepted trust rules.

## Test and Evaluation Approach

Written in this order, deliberately.

1. **Invariant tests first.** I1-I10 are behavioral, need no corpus, and can be
   written before the parser exists. They are the safety net that makes iteration
   on accuracy safe.
2. **Rule-level unit tests.** Each N, C, T, X, and D rule gets direct table-driven
   tests over synthetic strings — fast, exhaustive on edge cases, cheap to read.
3. **Metamorphic properties.** Changing case, whitespace, or line padding in the
   OCR text must not change the parsed values. Removing the total line must
   produce a blank amount. Appending an unrelated identifier line must not change
   any suggestion.
4. **Corpus evaluation.** `npm run eval:receipts` runs the parser over the
   labelled corpus and prints per-field precision and coverage for the
   development split, plus invariant pass/fail. The holdout is run only at gate
   time and its result is recorded once per gate.
5. **Device gates A and B**, as above.

The evaluation runner is the artifact that ends the loop: it turns "is the parser
good enough?" from a matter of opinion into a number compared against a
pre-agreed threshold.

## What This Changes in the Existing Plan

- All receipt work moved out of M1 to the new **M1.3 Receipt Capture and
  Extraction Evaluation** milestone on 2026-09-06. M1 phase 3 is now empty and
  M1 closes without receipt behavior.
- The scope map's OCR blocking question resolves to: on-device best-effort at
  M1.3 under these rules, cloud-based extraction at M8.
- The discontinued change `prototype-receipt-capture-ocr-review` is superseded.
  Its delta requirements remain broadly valid and can be carried forward; what it
  lacked — and what caused the failure — is everything in this document. The new
  change adds one requirement: **extraction quality is bounded by a frozen
  evaluation corpus and fixed exit criteria.**
- The mobile component change restarts from `main` at `94bbf5b` on a fresh
  branch, with progress pushed at every stopping point.

## Decisions Recorded 2026-09-06

1. Precision and coverage targets accepted as written: 0.95 / 0.40 for amount,
   0.95 / 0.30 for date. At a holdout of ten this means no wrong suggestion.
2. Time box set at three working sessions plus a two-remediation-round cap, with
   the fallback confirmed: extraction disabled behind a flag, capture and storage
   shipped, REC-002 recorded as owed at V1.
3. N3 and D1 confirmed, with D1 paired with the long-form date display in D5.
4. All receipt work, extraction and image capture alike, moved from M1 to M1.3
   so that corpus assembly does not block M1 completion.

## Corpus Ownership

**Owner: Joe Rice. Due: before M1.3 begins.** Recorded 2026-09-06. No parser
work starts until the corpus and its labels exist, because a corpus built after
the parser is a corpus shaped by the parser. M1.3 does not open until this is
delivered, and nothing else in the milestone is blocked on anything else.

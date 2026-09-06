# M1 synthetic receipt OCR corpus

This folder contains **32 synthetic photographed receipt images** for M1 mobile OCR testing. No image is a real customer, participant, merchant, or financial record. The corpus deliberately replaces internet-sourced receipts: the M1 evaluation brief permits only synthetic or owner-provided purchase receipts, and public uploads can be copyrighted or expose private information.

The corpus supplies 18 Haitian Creole (`ht`) cases, 5 French (`fr`) cases, 5 US English (`en-US`) cases, and 4 British English (`en-GB`) cases. It includes HTG, USD, and GBP notation; printed/thermal and handwritten documents; creases, low lighting, partial cuts, two dual-currency cases, and two human-unreadable cases.

Use `corpus-manifest.json` to select inputs and `labels/<id>.json` for ground truth. M1 currently fixes persisted currency to HTG; non-HTG receipts are included to test that the OCR/UI does not silently infer or convert currency. Dual-currency and unreadable cases have `amount_expected_blank: true`.

The images are generated from the reproducible `build-corpus.mjs` recipe. Re-running it replaces only this corpus’s `images/` and `labels/` directories. Generated values, names, and identifiers are fictitious.

## Status and known limitations (reviewed 2026-09-06)

**Use these as rule fixtures, not as the OCR evaluation corpus.** The images are
SVG rendered to PNG through `qlmanage`, so their text is vector-crisp with no
camera involved. A bundled on-device recognizer reads them at or near 100%,
which makes any precision or coverage score measured on them meaningless.

The schema, ground truth, anchors, separator variety, and dual-currency cases are
sound and worth keeping for text-level parser rule tests. Before that use, five
label defects need correcting, and five coverage gaps need filling. Both lists,
along with the recommended path to a real photographed corpus, are recorded in
[M1 Receipt Extraction Acceptance, Evaluation, and Localization Rules](../../design-briefs/m1-receipt-extraction-acceptance-and-eval-rules.md).

Extraction itself moved from M1 to M1.3 on 2026-09-06 and is gated on that
photographed corpus.

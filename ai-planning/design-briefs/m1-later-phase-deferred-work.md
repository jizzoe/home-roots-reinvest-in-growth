# M1 Later-Phase Deferred Work

Status: Scope boundary for the M1 Rapid Thin-Slice Prototype
Companion: [M1 Rapid Thin-Slice Prototype Brief](m1-rapid-thin-slice-prototype.md) and [V1 Scope Map and Milestone Plan](V1%20Scope%20Map%20and%20Milestone%20Plan.md)

## Purpose

This document holds work that may be valuable to V1 but is not needed to prove the M1 manual, mocked-speech, receipt, and local-first prototype flows. It prevents future scope from being mistaken for an M1 implementation requirement.

## Deferred Product and Screen Work

| Deferred work | Target milestone | Reason it is not M1 |
| --- | --- | --- |
| Real offline speech-to-text and text-to-speech for English, French, and Haitian Creole | M1.1 Offline Multilingual Speech | M1 proves the proposal/review interaction with deterministic STT fixtures and installed-device TTS; it does not capture microphone audio or validate a real STT engine. |
| Cash movement | M5 Business Journal Core Transactions | M1 proves the sale and expense model only. |
| Journal history, search/filter, transaction detail, correction, audit history, and duplicate review | M5 Business Journal Core Transactions | M1 has a compact recent-activity view; it does not need historical operations or corrections. |
| Real backend synchronization, authenticated REST API, server persistence, and server-confirmed statuses | M1.2 Live Sync Proof, then M6 Offline-First Local Storage and Sync | M1 is SQLite-only and uses a local sync-client stub. |
| Terraform, AWS, domains, TLS, EKS, CI/CD, and production/pilot environments | M1.2 only when explicitly approved, then M2/M3 | These are external-resource and cost commitments outside a local prototype. |
| Registration, login, recovery, entrepreneur/business profile, roles, and a persisted user language-preference screen | M4 Identity, Roles, and Profiles | M1 uses one synthetic business and system/app locale; no identity system is needed. |
| Haitian Creole UI localization, translation-management workflow, and production translation review | Post-M1 localization slice under M4 or a separately approved language change | M1.1 evaluates Haitian Creole speech, but participant-facing UI translation still needs domain review before broader use. |
| Dashboard expansion, reports, trends, and report explanations | M7 Dashboard and Basic Reports | M1 shows only local weekly totals and recent activity. |
| Production receipt storage/upload, provider-backed OCR quality, and receipt retention policy | M8 Receipt Capture and Assisted Review | M1 proves local capture and an editable best-effort or mocked proposal only. |
| Receipt line items, per-item quantity and price, and pre-tax/post-tax total breakdown | M8 Receipt Capture and Assisted Review | PRD requirement BJ-004 names Items, Quantity and Price among extracted receipt fields, and PRD Entity 5 defines Product / Inventory Item. M1 deliberately extracts only merchant, date, total amount, fixed HTG currency, and a short description. See the note below. |
| AI categories, explanations, coaching, questions, and next-action suggestions | M9 Bounded AI Assistance | M1 speech/OCR proposals are not a general AI feature. |
| HRF staff portal, staff reporting, and exports | M10 HRF Administrative Portal | M1 is entrepreneur mobile only. |
| Loan visibility or repayment history | M11 Loan Visibility, if applicable | Requires a confirmed operational loan-data source. |

## Deferred Visual Assets

- [Sale details](../design-assets/review/home-roots-mobile-sale-detail-concept-v1.png) is a review-only later-V1 direction. It is not a required M1 route.
- Speech review re-record [v2](../design-assets/review/home-roots-mobile-review-speech-rerecord-concept-v2.png), [v3](../design-assets/review/home-roots-mobile-review-speech-rerecord-concept-v3.png), and [v4](../design-assets/review/home-roots-mobile-review-speech-rerecord-concept-v4.png) are exploration only. M1 uses [v5](../design-assets/M1/home-roots-mobile-review-speech-rerecord-concept-v5.png).

## Note: Receipt Line-Item Extraction (PRD BJ-004)

Recorded 2026-09-05, so the deferral is a decision on record rather than a
silent omission when M8 begins.

**What the PRD requires.** Requirement BJ-004 states the application shall
support receipt scanning where the AI extracts *Merchant, Date, Items,
Quantity, Price, Total, Suggested category*. The product overview repeats
"items purchased", the AI Review flow includes "Inventory recognized", and
Entity 5 defines a Product / Inventory Item. Line-item capture is genuine
long-term product intent.

**Why M1 excludes it.** The V1 decision layer already narrowed this before M1.
Appendix D reduces Receipt Management to capture, store, *extract available
information*, allow correction, and confirm. The JLP UX synthesis records
extraction as best-effort that cannot block record completion, and explicitly
defers inventory management. M1's accepted delta therefore permits only
merchant, occurrence date, total amount, fixed `HTG`, and a short description,
and forbids inferring category or item-level fields.

**Why deferring costs nothing permanent.** The M1 spec already requires
retaining raw OCR text, extraction outcome, and available line/layout evidence
separately from suggested and confirmed values, persisted in receipt metadata.
The raw material for line-item parsing is preserved from M1 onward, so M8 can
derive line items from stored evidence without re-photographing anything and
without a data migration dead end.

**Two independent reasons to expect this to be hard.** The PRD's own confidence
model rates inventory quantity extraction at 40 percent, against 95 percent for
amount, merchant and date. Independent research into the selected engine found
ML Kit performs well on simple text but poorly on tabular data such as receipt
line items, and exposes no confidence scores. See
[on-device OCR library selection research](../research/tech-research/on-device-ocr-library-selection/on-device-ocr-library-selection-findings.md).

**A question M8 should reconsider, not inherit.** Receipt OCR may be the wrong
primary source for line-item data. The Enterprise Supply Hub sells inventory to
entrepreneurs directly, so Hub purchases can yield structured line items with
real products and prices at no extraction risk. M8 should decide how much
line-item data must come from photographed third-party receipts before
committing to extraction accuracy it may not be able to reach.

## M1 Boundary

M1 still establishes data shapes that keep later work possible: stable local IDs, client idempotency keys, source/proposal metadata, receipt-file metadata, keyed localization resources, ISO currency code, replaceable speech/OCR boundaries, and a configurable but disabled sync-client boundary. Establishing those shapes is not authorization to implement the deferred behavior.

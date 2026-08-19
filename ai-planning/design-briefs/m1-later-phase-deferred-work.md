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
| AI categories, explanations, coaching, questions, and next-action suggestions | M9 Bounded AI Assistance | M1 speech/OCR proposals are not a general AI feature. |
| HRF staff portal, staff reporting, and exports | M10 HRF Administrative Portal | M1 is entrepreneur mobile only. |
| Loan visibility or repayment history | M11 Loan Visibility, if applicable | Requires a confirmed operational loan-data source. |

## Deferred Visual Assets

- [Sale details](../design-assets/review/home-roots-mobile-sale-detail-concept-v1.png) is a review-only later-V1 direction. It is not a required M1 route.
- Speech review re-record [v2](../design-assets/review/home-roots-mobile-review-speech-rerecord-concept-v2.png), [v3](../design-assets/review/home-roots-mobile-review-speech-rerecord-concept-v3.png), and [v4](../design-assets/review/home-roots-mobile-review-speech-rerecord-concept-v4.png) are exploration only. M1 uses [v5](../design-assets/M1/home-roots-mobile-review-speech-rerecord-concept-v5.png).

## M1 Boundary

M1 still establishes data shapes that keep later work possible: stable local IDs, client idempotency keys, source/proposal metadata, receipt-file metadata, keyed localization resources, ISO currency code, replaceable speech/OCR boundaries, and a configurable but disabled sync-client boundary. Establishing those shapes is not authorization to implement the deferred behavior.

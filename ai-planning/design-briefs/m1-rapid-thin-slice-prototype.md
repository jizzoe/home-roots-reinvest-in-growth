# M1 Rapid Thin-Slice Prototype Brief

Status: Approved M1 control brief; implementation remains governed by the central/component OpenSpec lifecycle

Milestone: M1 Rapid Thin-Slice Prototype

Companion scope map: [V1 Scope Map and Milestone Plan](V1%20Scope%20Map%20and%20Milestone%20Plan.md)

Companion UX control: [M1 Mobile UI Design Brief and Screen Inventory](m1-mobile-ui-design-brief-and-screen-inventory.md)

Companion workflows: [M1 Mobile Prototype Workflows](m1-mobile-prototype-workflows.md)
Deferred scope: [M1 Later-Phase Deferred Work](m1-later-phase-deferred-work.md)
Real-speech follow-on: [M1.1 Offline Multilingual Speech](m1.1-offline-multilingual-speech.md)

## Purpose

Build the smallest useful, working prototype that proves the core viability of the Enterprise Growth App V1 direction before committing to full V1 implementation.

This prototype should not be a throwaway demo. It should be intentionally small, but its local data model, confirmation flow, status language, and source-metadata concepts should be able to evolve into the V1 Business Journal.

## Product Outcome

A synthetic entrepreneur can use a mobile app to:

- install and open a versioned Android prototype on a representative physical device;
- defer iOS/TestFlight acceptance from M1; M1.1 will add the approved representative iPhone speech-device evaluation;
- record a sale or expense manually;
- save it offline to local SQLite;
- see it in recent activity after app restart;
- review and confirm a deterministic mocked speech-derived transaction proposal;
- hear a device text-to-speech confirmation example;
- capture a receipt image;
- review real on-device Android OCR text and receipt-parser suggested fields;
- manually correct and confirm before anything becomes a durable financial record.

The prototype proves whether the product can feel like a trusted Business Journal rather than accounting software.

## Source Basis

| Source | How it informs M1 |
| --- | --- |
| Main JLP PRD: `Enterprise Growth Platform, Enterprise Growth App, Entrepreneur Application.docx` | Establishes Business Journal, offline-first, receipt, speech/AI proposal, confirmation, and future platform data-foundation direction. |
| `Features Reference Sheet, Appendix D.docx` | Confirms V1 feature baseline: transaction entry, receipt management, AI assistance, dashboard/reports, offline capability. |
| `Enterprise Growth App 2, UXUI Product Guidelines v1.0.docx` | Controls tone: business assistant, plain language, confirmation before saving, trust over automation. |
| `README.md` MVP Approach | Prior prototype recommendation: scaled-down useful mobile workflow, offline and speech early, synthetic data only. |
| `research-to-prototype-implementation-plan.md` | Earlier technical sequence: one-screen app, SQLite offline spike, backend sync later, touch-first workflow, receipt and speech spikes. |
| `phase-02-offline-first-sqlite-sync-architecture.md` | Local SQLite should be the mobile UI source of truth; sync queue/status should be explicit. |
| `phase-05-receipt-capture-mobile-document-scanning.md` | Start with simple receipt photo capture; full document scanning is not required for first proof. |
| `phase-06-speech-multilingual-ai-proposal-workflow.md` | Speech/AI produces proposals only; user confirmation creates the transaction. |
| [Google ML Kit Text Recognition for Android](https://developers.google.com/ml-kit/vision/text-recognition/v2/android) | Confirms the bundled on-device text-recognition path selected for M1 Android receipt OCR. |

## Execution Mode

Recommended profile:

`prototype-rapid`

### Approved Phase-1 Delivery Decisions

The following decisions supersede conflicting earlier M1 wording only for the current Android-first delivery:

- The temporary public mobile repository is `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app`; it must transfer to HRF before participant, production, or pilot use.
- Android physical-device acceptance uses the representative U656AC on Android 15. iOS/TestFlight work is deferred behind a separately approved later gate and is not required for M1 completion.
- EAS manages the Android signing key and creates an internal-distribution signed APK. The artifact link is shared only with authorized prototype testers.
- Speech-to-text uses deterministic mocked fixtures behind a replaceable adapter. Receipt capture uses real local camera/image-picker behavior, and Android receipt OCR uses a bundled Google ML Kit Text Recognition model against the local image. Text-to-speech uses the device path. No AWS, Google cloud OCR, or other cloud provider is part of M1.
- The autonomous controller records `strict-first-degraded` as its preset policy; `prototype-rapid` does not require isolated independent review.

Constraints:

- Synthetic data only.
- The nonprofit-owned mobile implementation repository is `hrf-reinvest-to-grow-mobile-app`; its exact remote location and implementation authorization remain separate approval gates.
- Local prototype first.
- No production participant data.
- No automated financial finalization from speech, OCR, or AI.
- No live backend sync, external send, deployment, or production release without separate approval.
- Paid/cloud providers are optional behind interfaces; use mocks or local/device best effort where that speeds learning.

## Prototype Scope

### Included

- One synthetic entrepreneur.
- One synthetic business.
- One Home/dashboard, action-choice, entry, review-and-confirm, saved, activity, and failure-state flow, as defined by the companion workflow document.
- Versioned Android preview build for physical-device acceptance.
- Sale and expense entry.
- Local SQLite persistence.
- Recent transaction list.
- Simple weekly totals: money earned, money spent, estimated profit.
- Status display: saved on this phone, waiting to sync, and simulated needs attention. M1 never represents a record as remotely synced.
- Manual transaction source.
- Speech transcript/proposal source.
- Receipt OCR source.
- Review/edit/confirm workflow for every source.
- Text-to-speech confirmation example.
- Receipt image capture and local file metadata.
- Real on-device OCR of the locally captured or selected receipt image on Android, using bundled Google ML Kit Text Recognition; no first-use model download is permitted for the M1 Android path.
- A deterministic receipt parser that turns OCR text and available line/layout evidence into an editable, non-authoritative receipt proposal.
- Sync-shaped outbox item, idempotency key, and configurable sync-client interface so M1.2 can replace the local/stub sync path without changing the transaction model.
- English and French user-interface resource bundles, selected from the device/app locale with English fallback.
- HTG (`Haitian gourde`, ISO 4217 `HTG`) as the fixed synthetic prototype currency; store currency code and minor units, then format values for the active display locale.

### Excluded

- Real entrepreneur registration/login.
- HRF admin portal.
- Loan visibility.
- Inventory management.
- Supplier ordering.
- Marketplace.
- Full AI Growth Coach.
- Automated credit scoring.
- Automated loan approval.
- Production backend deployment.
- Live REST API synchronization.
- AWS, domain, TLS, Terraform, GitHub OIDC, or tester-authentication setup.
- Production data migration.
- Full document scanning with edge detection/cropping.
- Full accounting ledger.
- Funder reporting.
- Cash movement, transaction-detail/history correction, reports, settings, onboarding, language-preference profile screens, loans, and an AI coach. See [M1 Later-Phase Deferred Work](m1-later-phase-deferred-work.md).
- Haitian Creole translations and any production translation-management process; M1 establishes reusable English/French localization mechanics only.

## Screen Scope

The controlling M1 routes, action triggers, alternate paths, and status copy are in [M1 Mobile Prototype Workflows](m1-mobile-prototype-workflows.md). The visual inventory and component states are in [M1 Mobile UI Design Brief and Screen Inventory](m1-mobile-ui-design-brief-and-screen-inventory.md).

M1 includes Home, action choice, manual sale/expense entry, review-and-confirm, saved-local confirmation, recent activity, speech proposal, receipt proposal, validation/fallback, and delayed-sync attention. A proposal is never a record; confirmation creates the local transaction.

## Prototype Phases

### Phase 1: Manual Offline-First Transaction Slice

Goal:

Prove that a small mobile Business Journal can record useful business activity offline without losing data.

Build:

- Expo React Native + TypeScript prototype.
- One Expo application configured and verified for Android.
- SQLite local schema.
- Versioned Android preview build path.
- Home, action choice, entry, review/confirm, saved, activity, and failure states from the companion workflows.
- Manual sale and expense entry.
- Local transaction table.
- Local outbox table or equivalent queued sync record with an idempotency key.
- Local recent activity.
- Local weekly totals.
- Sync-shaped status fields and sync-client stub, with no live backend dependency.

Acceptance:

- A versioned Android build can be installed and opened on a representative physical Android device without a developer workstation connection.
- A sale can be recorded offline and appears immediately in recent activity.
- An expense can be recorded offline and appears immediately in recent activity.
- A saved transaction remains visible after app restart.
- The UI displays a user-understandable status.
- A confirmed local transaction has a queued outbox/sync record with an idempotency key.
- Totals update from local data.
- No network is required to complete the flow.
- Manual sale and expense happy paths, amount validation, and app-restart persistence are covered by automated flows and physical-device checks.

### Phase 2: Speech Proposal and Text-to-Speech Proof

Goal:

Prove the proposal/confirmation interaction for speech without making real speech recognition or speech assistance a dependency for completing a transaction. Real offline multilingual STT/TTS is deferred to M1.1.

Build:

- Deterministic mocked speech transcript entry behind a replaceable adapter; no live microphone or real STT engine.
- Deterministic proposal creation from one or more known example phrases.
- Review/Confirm state populated from the proposal.
- Text-to-speech confirmation example.
- Source metadata stored with the transaction/proposal.

Example phrase:

`I sold rice for 500 gourdes today.`

Expected proposal:

- type: sale;
- amount: 500;
- currency: HTG;
- category/purpose: rice or sales;
- summary: `Record a 500 HTG sale for rice today?`

Acceptance:

- The mocked speech transcript creates a proposal, not a saved transaction.
- User can edit the proposal before confirming.
- User confirmation saves a normal local transaction.
- Text-to-speech can read the confirmation summary.
- Manual entry remains available if speech fails.

### Phase 3: Receipt Capture, On-Device OCR, and Receipt-Parser Review

Goal:

Prove receipt capture, real local Android OCR, and structured-field review without requiring full scanning, perfect extraction, or cloud OCR.

Build:

- Use [Scan a receipt](../design-assets/M1/home-roots-mobile-scan-receipt-concept-v1.png) as the capture-screen visual source and [Review receipt](../design-assets/M1/home-roots-mobile-review-receipt-concept-v1.png) as the captured-receipt/proposal visual source. The existing [extraction-failure state](../design-assets/M1/home-roots-mobile-receipt-extraction-failure-concept-v1.png) supplies the OCR/parser fallback screen.
- Receipt photo capture or image picker.
- Durable local file copy/reference.
- Receipt metadata table.
- Android-only M1 acceptance path: bundle Google ML Kit Text Recognition in the APK and run it against the local receipt image. Do not use the Play-services-delivered/unbundled model, a network request, or a cloud OCR service.
- Preserve raw OCR text and, where the recognizer supplies it, line/block position evidence separately from the proposal and confirmed transaction.
- Run a deterministic local receipt parser over that OCR result. The parser may propose a merchant, occurrence date, total amount, fixed `HTG` currency, and a short description; it must leave a field blank when it cannot identify it confidently. Category and item-level interpretation remain manual in M1.
- Include parser evidence and a confidence/uncertainty indicator with each proposed field so the review screen can distinguish a suggested value from a confirmed fact.
- Review/Confirm state populated from OCR suggestion.
- Manual fallback when OCR is missing or wrong.

Acceptance:

- User can attach a receipt image to a transaction flow.
- Receipt metadata persists locally.
- Android OCR operates on the local image after installation with the device offline; the test evidence identifies the bundled ML Kit dependency rather than an unbundled/downloaded model.
- Raw OCR text and parser-proposed fields are shown separately from confirmed transaction fields.
- User can correct or clear every OCR/parser-derived value before confirmation.
- User confirmation saves the transaction.
- OCR or parser failure does not block manual completion, and the local receipt image remains available for review.

## Data Design

### Local Tables

`prototype_business`

- `id`
- `name`
- `currency_code`
- `language_code`: `en` or `fr`

`local_transactions`

- `local_id`
- `client_idempotency_key`
- `business_id`
- `type`: sale or expense
- `amount_minor_units`
- `currency_code`
- `occurred_on`
- `category_label`
- `note`
- `source_type`: manual, speech_transcript, receipt_ocr
- `confirmation_status`: draft, confirmed, cancelled
- `sync_status`: local, queued, syncing, synced, failed, needs_review. M1 uses only `local`, `queued`, and `needs_review`; the remaining values reserve the later live-sync shape.
- `created_at`
- `updated_at`

`sync_outbox`

- `id`
- `transaction_local_id`
- `client_idempotency_key`
- `operation_type`: create_transaction
- `payload_json`
- `status`: queued, syncing, synced, failed, needs_review. M1 uses only `queued` and `needs_review`; the remaining values reserve the later live-sync shape.
- `attempt_count`
- `last_error_message`
- `created_at`
- `updated_at`

`transaction_sources`

- `id`
- `transaction_local_id`
- `source_type`
- `raw_text`
- `proposal_json`
- `confidence`
- `created_at`

`receipt_files`

- `id`
- `transaction_local_id`
- `local_file_uri`
- `mime_type`
- `file_size`
- `ocr_text`
- `ocr_status`: not_started, extracted, failed, skipped
- `created_at`

### Design Notes

### Image-to-React-Native Implementation Note

The selected PNGs in [the M1 asset package](../design-assets/M1/), together with the M1 screen inventory and workflows, are sufficient input to generate the prototype's React Native implementation. The generated component-repository work can include Expo navigation, screen layouts and styling, reusable UI components and design tokens, localized English/French copy resources, SQLite-backed local state, synthetic fixtures, image/camera and speech/OCR adapter boundaries, stable `testID` values, and React Native Testing Library and Maestro test coverage.

The images establish the visual pattern; the companion briefs establish the routes, alternate states, accessibility, persistence, and truthfulness requirements. Generated code must implement both sources and must not infer a live backend, participant data, or a remotely synced state from the mockups.

- Store image files in app-controlled durable local storage; SQLite stores metadata and file URI.
- Keep the Android OCR boundary replaceable. M1 selects bundled Google ML Kit Text Recognition only for the Android implementation and physical-device acceptance path; iPhone receipt-OCR implementation and acceptance are deferred with iOS/TestFlight work.
- Keep receipt parsing deterministic and local. Its input is OCR text plus available layout evidence; its output is an editable proposal with field-level source/confidence metadata, never an authoritative financial write.
- Keep raw input/proposals separate from confirmed transaction fields.
- Use local IDs from the start.
- Resolve the active language from the device/app locale and fall back to English. Do not add a profile, settings screen, or in-app language selector in M1.
- Keep all UI strings in keyed English and French resource bundles. Use stable `testID` values rather than visible text as automation selectors so a test works in either language.
- Keep amounts as minor units plus `currency_code = HTG`; use `Intl` formatting only at display time.
- Include sync-shaped status and an outbox item now even if backend sync is stubbed; no M1 state may claim that a remote system received the record.
- Put any sync call behind a configurable client interface; M1.2 replaces the stub with a development REST API endpoint without changing the confirmed transaction model.
- Avoid a full ledger model in the prototype.

## API / Backend Impact

Phase 1 is local-first and may be local-only. M1 must not require a live backend to complete or validate the core Business Journal workflow.

The M1 `SyncClient` is a local disabled/stub implementation. It may expose deterministic local status transitions for prototype review but it must not issue an HTTP request or require any backend endpoint.

Do not build a live REST API, production authentication, loan APIs, admin APIs, receipt upload APIs, AWS infrastructure, domain/TLS, GitHub OIDC deployment, or tester authentication in M1 unless a separate SDD/OpenSpec change approves them. The live mobile-to-REST-API proof belongs to M1.2.

## Technical Decisions

| Decision | Recommendation |
| --- | --- |
| Mobile framework | Expo React Native + TypeScript. |
| Repository | Initially public under `jizzoe/hrf-reinvest-to-grow-mobile-app`, then transferred to HRF before participant, production, or pilot use; this planning repository remains contract and evidence owner only. |
| Platform posture | Android is the required offline physical-device acceptance target. iOS/TestFlight is deferred to a later approved gate. |
| Runtime | Expo development build for development and EAS Android preview APK builds for device testing. Expo Go is not the acceptance target when SQLite/camera dependencies require native configuration. |
| Local persistence | SQLite in phase 1. Do not defer offline persistence. |
| Localization | Ship English and French keyed resources now using `expo-localization` plus an i18n library. Declare both supported locales to iOS and Android; use English fallback. Do not build a user profile language selector in M1. |
| Currency and formatting | Use the Haitian gourde (`HTG`) for synthetic data. Store minor units and ISO currency code; format numbers and dates for the active locale. |
| Receipt capture | Simple photo/image picker first; defer full document scanning. |
| OCR | Android M1 uses a bundled Google ML Kit Text Recognition model against local receipt images; no mocked OCR fixture, cloud provider, or first-use model download. Keep the OCR adapter replaceable. |
| Receipt parser | Deterministic local rules parse OCR text/layout into optional merchant, date, amount, fixed HTG currency, and description proposals. Preserve raw OCR and field-level uncertainty; leave category and items for manual entry. |
| Speech | Use deterministic mocked transcripts behind the existing adapter boundary. M1.1 owns real offline STT and must expose it through one replaceable `SpeechToTextAdapter`. |
| TTS | Use installed-device TTS for the M1 interaction proof. M1.1 owns three-language offline TTS evaluation and its replaceable engine boundary. |
| Android delivery | Produce a versioned installable Android preview build for representative physical-device testing. |
| iPhone delivery | Deferred from M1. M1.1 includes approved iPhone physical-device speech evaluation; any TestFlight distribution remains a separate approval gate. |
| Automated testing | Use React Native Testing Library for component and state behavior; use Maestro YAML flows with stable `testID` selectors for cross-platform end-to-end manual sale/expense, validation, speech/receipt fallback, and locale smoke tests. |
| Backend | Stub or defer during M1; do not let backend scope block the local prototype. M1.2 owns the live REST API proof. |

## Product Decisions

- Manual input is the baseline completion path.
- Speech and OCR create proposals only.
- Every proposal must be reviewed and confirmed.
- Receipt OCR and parser output are suggestions: they may prepopulate a field but cannot create, change, or confirm a financial record.
- Use plain business language.
- Show estimated totals as estimated when appropriate.
- Keep the prototype to sale and expense only. Cash movement is deferred work.
- Default to one business and one entrepreneur.
- Use synthetic HTG examples in both English and French. `HTG` means Haitian gourde, Haiti's currency.
- Preserve a stable local transaction and outbox shape so M1.2 can prove live sync without redesigning M1 data capture.

## Open Questions

### Upfront

- Will Android testers install a direct preview APK or use Google Play closed testing?
- Who reviews the M1 French strings for participant-facing clarity before testing?

### Phase-Specific

- **Resolved for M1:** use deterministic mocked STT and installed-device TTS; evaluate real offline English, French, and Haitian Creole speech in M1.1.
- Is simple image picker acceptable for receipt capture, or does JLP expect an in-app camera surface?

## Risks

| Risk | Mitigation |
| --- | --- |
| Prototype becomes throwaway | Use V1-shaped local IDs, source metadata, confirmation states, and sync statuses. |
| Receipt OCR/parser is inaccurate on varied receipts | Bundle the on-device Android OCR model, test against synthetic receipt images, retain raw text and field-level uncertainty, and leave uncertain fields blank with manual correction always available. |
| UI slips back into bookkeeping language | Use UX control language: money earned, money spent, estimated profit, saved on this phone. |
| Offline behavior gets faked | Require SQLite persistence and app-restart test in phase 1. |
| Prototype scope expands into full V1 | Exclude admin, loans, inventory, full AI coach, and production backend. |
| OCR or speech seems authoritative | Label all outputs as suggestions and require confirmation. |
| M1.2 pressure pulls live API work into M1 | Keep M1 local/stubbed; use outbox and sync-client boundaries so the live REST API proof happens in a separate approved M1.2 change. |

## Proposed SDD/OpenSpec Changes

Create three slice-level changes from this brief:

1. `prototype-manual-offline-transaction`
2. `prototype-speech-proposal-confirmation`
3. `prototype-receipt-capture-ocr-review`

The real-speech follow-on is described in `m1.1-offline-multilingual-speech.md`. The later live-sync work remains M1.2 and is described separately in `m1.2-live-sync-rest-api-proof.md`.

Each change should include:

- proposal: why this slice exists and what learning it should produce;
- spec delta: observable behavior and scenarios;
- design: chosen runtime, data flow, libraries/adapters, and fallback behavior;
- tasks: implementation and verification steps.

## Suggested Scenarios for SDD Propose

### Scenario: Manual sale saved offline

Given the prototype has a synthetic business  
And the device has no network connection  
When the user records and confirms a 500 HTG sale  
Then the transaction is saved locally  
And it appears in recent activity  
And it remains visible after app restart  
And its status is shown as saved locally or waiting to sync

### Scenario: Speech creates a proposal

Given the user provides the phrase `I sold rice for 500 gourdes today`  
When the prototype processes the phrase  
Then it shows a reviewable sale proposal  
And the proposal is not saved as a transaction until the user confirms it

### Scenario: Receipt OCR requires review

Given the user captures or selects a receipt image  
When OCR text is extracted or mocked  
Then the OCR result is shown separately from confirmed transaction fields  
And the user can correct the suggested amount or category before saving

### Scenario: OCR failure does not block entry

Given OCR fails or returns no useful text  
When the user continues manually  
Then the user can still enter and confirm an expense  
And the receipt image remains attached locally when available

## Evidence Required Before Closing M1

- Screenshot or screen recording of phase 1 manual offline flow.
- Evidence that a saved transaction survives app restart.
- Evidence that the Android build can be installed and opened on a representative physical device.
- Evidence that confirmed transactions create stable local outbox/sync records with idempotency keys.
- Screenshot or screen recording of speech proposal and confirmation.
- Screenshot or screen recording of text-to-speech confirmation.
- Screenshot or screen recording of receipt capture and OCR/review flow.
- Notes on any provider/library limitations discovered.
- Automated test evidence from React Native Testing Library and Maestro, including an English and French locale smoke test.
- Decision log for what should be reused, hardened, or discarded before formal V1 implementation.

## Next Action

After the mobile repository is created and the central Gate 1 pin is recorded, create the component-local OpenSpec proposal for `prototype-manual-offline-transaction` in `hrf-reinvest-to-grow-mobile-app`. Keep it narrow: Android Expo foundation, English/French resources, manual sale/expense entry, local SQLite persistence, recent activity, simple totals, sync-shaped status, outbox/sync-client stub, and Android preview-build evidence only.

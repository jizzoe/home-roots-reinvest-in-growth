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
- capture a receipt image and keep it attached to a manually entered expense;
- manually correct and confirm before anything becomes a durable financial record.

On-device receipt text recognition and parser suggestions moved to [M1.3 Receipt Extraction Evaluation](m1-receipt-extraction-acceptance-and-eval-rules.md) on 2026-09-06.

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
| [Google ML Kit Text Recognition for Android](https://developers.google.com/ml-kit/vision/text-recognition/v2/android) | Confirms the bundled on-device text-recognition path selected for receipt OCR. Applies to M1.3, not to M1. |

## Execution Mode

Recommended profile:

`prototype-rapid`

### Approved Phase-1 Delivery Decisions

The following decisions supersede conflicting earlier M1 wording only for the current Android-first delivery:

- The temporary public mobile repository is `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app`; it must transfer to HRF before participant, production, or pilot use.
- Android physical-device acceptance uses the representative U656AC on Android 15. iOS/TestFlight work is deferred behind a separately approved later gate and is not required for M1 completion.
- EAS manages the Android signing key and creates an internal-distribution signed APK. The artifact link is shared only with authorized prototype testers.
- Speech-to-text uses deterministic mocked fixtures behind a replaceable adapter. Receipt capture uses real local camera/image-picker behavior with durable app-controlled storage; no text recognition runs in M1. Text-to-speech uses the device path. No AWS, Google cloud OCR, or other cloud provider is part of M1.
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
- Receipt image source.
- Review/edit/confirm workflow for every source.
- Text-to-speech confirmation example.
- Receipt image capture, durable app-controlled file storage, and local receipt metadata.
- A receipt record shaped so a later extraction result attaches without a migration: `extraction_status` defaulting to `not_attempted`, plus nullable `provider`, `extracted_at`, and `raw_text`.
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

### Phase 3: Receipt Image Capture and Storage

Goal:

Prove that a receipt photograph can be captured, stored durably, and kept
attached to a confirmed expense on a real device, without any extraction.

Build:

- Use [Scan a receipt](../design-assets/M1/home-roots-mobile-scan-receipt-concept-v1.png) as the capture-screen visual source and [Review receipt](../design-assets/M1/home-roots-mobile-review-receipt-concept-v1.png) as the captured-receipt visual source, with its suggested-field areas left unpopulated in M1.
- Receipt photo capture or local image picker, with an image-picker fallback when camera permission is denied and manual entry when neither is available.
- Durable app-controlled file copy and reference; the image survives force-close and reopen.
- Receipt metadata table, retained separately from the unconfirmed and the confirmed expense.
- Attachment through the existing manual expense confirmation path. Attaching an image never creates, changes, or confirms a record on its own.
- Forward-compatible receipt fields so M1.3 can attach an extraction result without a migration: `extraction_status` defaulting to `not_attempted`, plus nullable `provider`, `extracted_at`, and `raw_text`.

Acceptance:

- User can attach a receipt image to an expense the user entered manually.
- The image and its metadata persist locally and survive force-close and reopen.
- The receipt remains visible on the expense it was attached to.
- Camera-permission denial falls back to local image selection, and both failing still allows manual completion.
- No text recognition, parser suggestion, or network request occurs in M1.

Deferred to M1.3:

On-device text recognition, deterministic parser suggestions, the
[extraction-failure state](../design-assets/M1/home-roots-mobile-receipt-extraction-failure-concept-v1.png),
field-level uncertainty rendering, and the review-screen population from
suggested values. The bundled Google ML Kit path, the parser field set, and the
constraint that uncertain fields stay blank all remain the accepted direction;
they are governed by
[M1 Receipt Extraction Acceptance, Evaluation, and Localization Rules](m1-receipt-extraction-acceptance-and-eval-rules.md)
and gated on a photographed evaluation corpus.

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
- `source_type`: manual, speech_transcript, receipt
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
- Keep the receipt extraction boundary replaceable and unimplemented in M1. M1.3 selects bundled Google ML Kit Text Recognition for the Android path; iPhone receipt-OCR implementation and acceptance are deferred with iOS/TestFlight work, and cloud extraction is M8.
- When extraction arrives at M1.3, keep it deterministic and local: its input is OCR text plus available layout evidence, and its output is an editable proposal with field-level source/uncertainty metadata, never an authoritative financial write.
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
| OCR | Not implemented in M1. At M1.3, Android uses a bundled Google ML Kit Text Recognition model against local receipt images; no mocked OCR fixture, cloud provider, or first-use model download. Keep the OCR adapter replaceable. |
| Receipt parser | M1.3 work, governed by the acceptance and localization rules brief. Deterministic local rules parse OCR text/layout into optional merchant, date, amount, fixed HTG currency, and description proposals. Preserve raw OCR and field-level uncertainty; leave category and items for manual entry. |
| Speech | Use deterministic mocked transcripts behind the existing adapter boundary. M1.1 owns real offline STT and must expose it through one replaceable `SpeechToTextAdapter`. |
| TTS | Use installed-device TTS for the M1 interaction proof. M1.1 owns three-language offline TTS evaluation and its replaceable engine boundary. |
| Android delivery | Produce a versioned installable Android preview build for representative physical-device testing. |
| iPhone delivery | Deferred from M1. M1.1 includes approved iPhone physical-device speech evaluation; any TestFlight distribution remains a separate approval gate. |
| Automated testing | Use React Native Testing Library for component and state behavior; use Maestro YAML flows with stable `testID` selectors for cross-platform end-to-end manual sale/expense, validation, speech/receipt fallback, and locale smoke tests. |
| Backend | Stub or defer during M1; do not let backend scope block the local prototype. M1.2 owns the live REST API proof. |

## Product Decisions

- Manual input is the baseline completion path.
- Speech creates proposals only, and future receipt extraction will do the same.
- Every proposal must be reviewed and confirmed.
- Attaching a receipt image never creates, changes, or confirms a financial record. When M1.3 adds extraction, its output is a suggestion under the same rule.
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
| Receipt OCR/parser is inaccurate on varied receipts | M1.3 risk. Measure against a frozen photographed corpus with a sealed holdout, keep uncertain fields blank, retain raw text, and keep manual correction always available. Precision is protected ahead of coverage. |
| UI slips back into bookkeeping language | Use UX control language: money earned, money spent, estimated profit, saved on this phone. |
| Offline behavior gets faked | Require SQLite persistence and app-restart test in phase 1. |
| Prototype scope expands into full V1 | Exclude admin, loans, inventory, full AI coach, and production backend. |
| Extraction or speech seems authoritative | Label all outputs as suggestions and require confirmation. |
| Extraction accuracy has no stopping condition | Governed by the frozen corpus, fixed exit criteria, and stop conditions in the M1.3 acceptance brief. This is what discontinued the first receipt attempt. |
| M1.2 pressure pulls live API work into M1 | Keep M1 local/stubbed; use outbox and sync-client boundaries so the live REST API proof happens in a separate approved M1.2 change. |

## Proposed SDD/OpenSpec Changes

Create three slice-level changes from this brief:

1. `prototype-manual-offline-transaction`
2. `prototype-speech-proposal-confirmation`
3. `prototype-receipt-image-capture`

The receipt extraction follow-on is `prototype-receipt-extraction-evaluation` under M1.3, governed by `m1-receipt-extraction-acceptance-and-eval-rules.md`. The real-speech follow-on is described in `m1.1-offline-multilingual-speech.md`. The later live-sync work remains M1.2 and is described separately in `m1.2-live-sync-rest-api-proof.md`.

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

### Scenario: Receipt image is attached to a manual expense

Given the user captures or selects a receipt image  
When the user enters the expense values manually and confirms  
Then one expense is saved with the receipt attached  
And the image and its metadata survive force-close and reopen

### Scenario: Attaching an image creates no record

Given the user captures or selects a receipt image  
When the user cancels before confirming  
Then no expense, total change, or outbox entry is created  

### Scenario: Camera permission denial does not block entry

Given camera permission is denied or unavailable  
When the user continues  
Then local image selection remains available  
And the user can still enter and confirm the expense with no image

## Evidence Required Before Closing M1

- Screenshot or screen recording of phase 1 manual offline flow.
- Evidence that a saved transaction survives app restart.
- Evidence that the Android build can be installed and opened on a representative physical device.
- Evidence that confirmed transactions create stable local outbox/sync records with idempotency keys.
- Screenshot or screen recording of speech proposal and confirmation.
- Screenshot or screen recording of text-to-speech confirmation.
- Screenshot or screen recording of receipt capture, attachment, and restart durability.
- Notes on any provider/library limitations discovered.
- Automated test evidence from React Native Testing Library and Maestro, including an English and French locale smoke test.
- Decision log for what should be reused, hardened, or discarded before formal V1 implementation.

## Next Action

After the mobile repository is created and the central Gate 1 pin is recorded, create the component-local OpenSpec proposal for `prototype-manual-offline-transaction` in `hrf-reinvest-to-grow-mobile-app`. Keep it narrow: Android Expo foundation, English/French resources, manual sale/expense entry, local SQLite persistence, recent activity, simple totals, sync-shaped status, outbox/sync-client stub, and Android preview-build evidence only.

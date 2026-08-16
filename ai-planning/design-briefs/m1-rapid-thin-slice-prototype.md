# M1 Rapid Thin-Slice Prototype Brief

Status: Propose-ready draft; no repository creation or implementation is authorized by this document

Milestone: M1 Rapid Thin-Slice Prototype

Companion scope map: [V1 Scope Map and Milestone Plan](V1%20Scope%20Map%20and%20Milestone%20Plan.md)

Companion UX control: [M1 Mobile UI Design Brief and Screen Inventory](m1-mobile-ui-design-brief-and-screen-inventory.md)

Companion workflows: [M1 Mobile Prototype Workflows](m1-mobile-prototype-workflows.md)
Deferred scope: [M1 Later-Phase Deferred Work](m1-later-phase-deferred-work.md)

## Purpose

Build the smallest useful, working prototype that proves the core viability of the Enterprise Growth App V1 direction before committing to full V1 implementation.

This prototype should not be a throwaway demo. It should be intentionally small, but its local data model, confirmation flow, status language, and source-metadata concepts should be able to evolve into the V1 Business Journal.

## Product Outcome

A synthetic entrepreneur can use a mobile app to:

- install and open a versioned Android prototype on a representative physical device;
- use the same Expo codebase on iOS and install a TestFlight test build on an approved representative iPhone;
- record a sale or expense manually;
- save it offline to local SQLite;
- see it in recent activity after app restart;
- review and confirm a speech-derived transaction proposal;
- hear a text-to-speech confirmation example;
- capture a receipt image;
- review best-effort OCR text or suggested fields;
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

## Execution Mode

Recommended profile:

`prototype-rapid`

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
- Versioned Android preview build for physical-device acceptance and iOS TestFlight test build for a representative iPhone after the nonprofit-owned Apple Developer and App Store Connect resources are approved.
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
- Best-effort OCR text extraction or mocked OCR result if real OCR integration would slow the prototype.
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
- One universal Expo application configured for Android and iOS, with platform-specific layout and permission checks.
- SQLite local schema.
- Versioned Android preview build path and iOS TestFlight test-build path.
- Home, action choice, entry, review/confirm, saved, activity, and failure states from the companion workflows.
- Manual sale and expense entry.
- Local transaction table.
- Local outbox table or equivalent queued sync record with an idempotency key.
- Local recent activity.
- Local weekly totals.
- Sync-shaped status fields and sync-client stub, with no live backend dependency.

Acceptance:

- A versioned Android build can be installed and opened on a representative physical Android device without a developer workstation connection.
- A versioned iOS TestFlight test build can be installed and opened on an approved representative iPhone after nonprofit-owned Apple Developer and App Store Connect resources are approved.
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

Prove the proposal/confirmation pattern for speech without making speech a dependency for completing a transaction.

Build:

- Speech input example or mocked speech transcript entry.
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

- Speech/transcript creates a proposal, not a saved transaction.
- User can edit the proposal before confirming.
- User confirmation saves a normal local transaction.
- Text-to-speech can read the confirmation summary.
- Manual entry remains available if speech fails.

### Phase 3: Receipt Capture and Best-Effort OCR Review

Goal:

Prove receipt capture and OCR review without requiring full scanning, perfect extraction, or cloud OCR.

Build:

- Receipt photo capture or image picker.
- Durable local file copy/reference.
- Receipt metadata table.
- Best-effort OCR text extraction or mocked OCR fixture.
- Suggested transaction fields from OCR text when feasible.
- Review/Confirm state populated from OCR suggestion.
- Manual fallback when OCR is missing or wrong.

Acceptance:

- User can attach a receipt image to a transaction flow.
- Receipt metadata persists locally.
- OCR text or OCR fixture is shown separately from confirmed transaction fields.
- User can correct OCR-derived values.
- User confirmation saves the transaction.
- OCR failure does not block manual completion.

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
| Repository | Nonprofit-owned `hrf-reinvest-to-grow-mobile-app`; this planning repository remains contract and evidence owner only. |
| Platform posture | One Expo codebase for Android and iOS. Android is the required offline physical-device acceptance target; iOS is distributed through TestFlight and smoke-tested on an approved iPhone after Apple resources are approved. |
| Runtime | Expo development build for development; EAS Android preview builds and EAS App Store-signed iOS TestFlight test builds for device testing. Expo Go is not the acceptance target when SQLite/camera dependencies require native configuration. |
| Local persistence | SQLite in phase 1. Do not defer offline persistence. |
| Localization | Ship English and French keyed resources now using `expo-localization` plus an i18n library. Declare both supported locales to iOS and Android; use English fallback. Do not build a user profile language selector in M1. |
| Currency and formatting | Use the Haitian gourde (`HTG`) for synthetic data. Store minor units and ISO currency code; format numbers and dates for the active locale. |
| Receipt capture | Simple photo/image picker first; defer full document scanning. |
| OCR | Best-effort local/device, fixture, or provider adapter. Do not block on AWS Textract. |
| Speech | Mocked or provider-backed transcript path is acceptable; use the same proposal/review model either way. |
| TTS | Use the fastest available prototype path, behind an adapter if practical. |
| Android delivery | Produce a versioned installable Android preview build for representative physical-device testing. |
| iPhone delivery | Use TestFlight for named prototype testers. Ad hoc iOS links require every tester device UDID and rebuild/re-signing, so they are not the default distribution path. |
| Automated testing | Use React Native Testing Library for component and state behavior; use Maestro YAML flows with stable `testID` selectors for cross-platform end-to-end manual sale/expense, validation, speech/receipt fallback, and locale smoke tests. |
| Backend | Stub or defer during M1; do not let backend scope block the local prototype. M1.2 owns the live REST API proof. |

## Product Decisions

- Manual input is the baseline completion path.
- Speech and OCR create proposals only.
- Every proposal must be reviewed and confirmed.
- Use plain business language.
- Show estimated totals as estimated when appropriate.
- Keep the prototype to sale and expense only. Cash movement is deferred work.
- Default to one business and one entrepreneur.
- Use synthetic HTG examples in both English and French. `HTG` means Haitian gourde, Haiti's currency.
- Preserve a stable local transaction and outbox shape so M1.2 can prove live sync without redesigning M1 data capture.

## Open Questions

### Upfront

- Which nonprofit-owned Apple Developer and App Store Connect account will own the iOS identifier and TestFlight testers, and who approves its use?
- Will Android testers install a direct preview APK or use Google Play closed testing?
- Who reviews the M1 French strings for participant-facing clarity before testing?

### Phase-Specific

- Which speech-to-text path is fastest in the chosen runtime: mocked transcript, device speech, or cloud adapter?
- Which text-to-speech path is fastest and good enough for the prototype?
- Which OCR path is fastest and good enough: mocked fixture, device/local OCR, or cloud adapter?
- Is simple image picker acceptable for receipt capture, or does JLP expect an in-app camera surface?

## Risks

| Risk | Mitigation |
| --- | --- |
| Prototype becomes throwaway | Use V1-shaped local IDs, source metadata, confirmation states, and sync statuses. |
| Speech/OCR integration slows learning | Start with fixtures or adapters; prove review/confirmation before provider quality. |
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

M1.2 follow-on changes are described separately in `m1.2-live-sync-rest-api-proof.md`.

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
- Evidence that the iOS TestFlight test build can be installed and opened on an approved representative iPhone.
- Evidence that confirmed transactions create stable local outbox/sync records with idempotency keys.
- Screenshot or screen recording of speech proposal and confirmation.
- Screenshot or screen recording of text-to-speech confirmation.
- Screenshot or screen recording of receipt capture and OCR/review flow.
- Notes on any provider/library limitations discovered.
- Automated test evidence from React Native Testing Library and Maestro, including an English and French locale smoke test.
- Decision log for what should be reused, hardened, or discarded before formal V1 implementation.

## Next Action

After the nonprofit approves the mobile repository location and Apple/TestFlight ownership, create the component-local OpenSpec proposal for `prototype-manual-offline-transaction` in `hrf-reinvest-to-grow-mobile-app`. Keep it narrow: dual-platform Expo foundation, English/French resources, manual sale/expense entry, local SQLite persistence, recent activity, simple totals, sync-shaped status, outbox/sync-client stub, and Android/iPhone preview-build evidence only.

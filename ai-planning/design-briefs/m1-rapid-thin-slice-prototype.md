# M1 Rapid Thin-Slice Prototype Brief

Status: Draft for review  
Milestone: M1 Rapid Thin-Slice Prototype  
Companion scope map: [V1 Scope Map and Milestone Plan](V1%20Scope%20Map%20and%20Milestone%20Plan.md)  
Companion UX control: [JLP UX Synthesis and V1 Design Decisions](JLP%20UX%20Synthesis%20and%20V1%20Design%20Decisions.md)

## Purpose

Build the smallest useful, working prototype that proves the core viability of the Enterprise Growth App V1 direction before committing to full V1 implementation.

This prototype should not be a throwaway demo. It should be intentionally small, but its local data model, confirmation flow, status language, and source-metadata concepts should be able to evolve into the V1 Business Journal.

## Product Outcome

A synthetic entrepreneur can use a mobile app to:

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
- Local prototype first.
- No production participant data.
- No automated financial finalization from speech, OCR, or AI.
- No external send, deployment, or production release without separate approval.
- Paid/cloud providers are optional behind interfaces; use mocks or local/device best effort where that speeds learning.

## Prototype Scope

### Included

- One synthetic entrepreneur.
- One synthetic business.
- One combined Home/Record screen.
- One transaction review/detail state.
- Sale and expense entry.
- Local SQLite persistence.
- Recent transaction list.
- Simple weekly totals: money earned, money spent, estimated profit.
- Status display: saved on this phone, waiting to sync, synced, failed, needs review.
- Manual transaction source.
- Speech transcript/proposal source.
- Receipt OCR source.
- Review/edit/confirm workflow for every source.
- Text-to-speech confirmation example.
- Receipt image capture and local file metadata.
- Best-effort OCR text extraction or mocked OCR result if real OCR integration would slow the prototype.

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
- Production data migration.
- Full document scanning with edge detection/cropping.
- Full accounting ledger.
- Funder reporting.

## Screen Scope

### Screen 1: Home / Record

Purpose:

Let the entrepreneur see a simple business snapshot and record a new business event without navigating through accounting-style menus.

Required elements:

- Synthetic business name.
- Period label such as `This week`.
- Summary values:
  - `Money earned`
  - `Money spent`
  - `Estimated profit`
- Recent activity list.
- Quiet local/sync status.
- Large action buttons:
  - `Record sale`
  - `Record expense`
  - `Use speech`
  - `Scan receipt`

Design rule:

This screen should answer: `How is my business doing, and what happened next?`

### Screen/State 2: Review and Confirm

Purpose:

Use one durable confirmation pattern for manual entry, speech proposals, and OCR suggestions.

Required elements:

- Source label:
  - `Entered by you`
  - `Suggested from speech`
  - `Suggested from receipt`
- Plain-language summary.
- Editable fields:
  - type: sale or expense;
  - amount;
  - date;
  - category/purpose;
  - note;
  - receipt reference when present.
- Raw input preview when available:
  - speech transcript;
  - OCR text;
  - receipt thumbnail or file label.
- Actions:
  - `Confirm`
  - `Edit`
  - `Cancel`

Design rule:

The proposal is not the record. Confirmation creates the local transaction.

## Prototype Phases

### Phase 1: Manual Offline-First Transaction Slice

Goal:

Prove that a small mobile Business Journal can record useful business activity offline without losing data.

Build:

- Expo React Native + TypeScript prototype.
- SQLite local schema.
- Home/Record screen.
- Review/Confirm state.
- Manual sale and expense entry.
- Local transaction table.
- Local recent activity.
- Local weekly totals.
- Sync-shaped status fields, even if no backend exists yet.

Acceptance:

- A sale can be recorded offline and appears immediately in recent activity.
- An expense can be recorded offline and appears immediately in recent activity.
- A saved transaction remains visible after app restart.
- The UI displays a user-understandable status.
- Totals update from local data.
- No network is required to complete the flow.

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
- currency: HTG or configured prototype currency;
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
- `language_code`

`local_transactions`

- `local_id`
- `business_id`
- `type`: sale or expense
- `amount_minor_units`
- `currency_code`
- `occurred_on`
- `category_label`
- `note`
- `source_type`: manual, speech_transcript, receipt_ocr
- `confirmation_status`: draft, confirmed, cancelled
- `sync_status`: local, queued, syncing, synced, failed, needs_review
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

- Store image files in app-controlled durable local storage; SQLite stores metadata and file URI.
- Keep raw input/proposals separate from confirmed transaction fields.
- Use local IDs from the start.
- Include sync-shaped status now even if backend sync is stubbed.
- Avoid a full ledger model in the prototype.

## API / Backend Impact

Phase 1 may be local-only.

If a backend stub is added, keep it narrow:

- `POST /prototype/sync/transactions`
- accepts local transaction ID, idempotency key, business ID, transaction fields, source metadata summary, and client timestamp;
- returns server ID, server revision, and accepted status.

Do not build production authentication, loan APIs, admin APIs, or receipt upload APIs in M1 unless a separate SDD change approves them.

## Technical Decisions

| Decision | Recommendation |
| --- | --- |
| Mobile framework | Expo React Native + TypeScript. |
| Runtime | Expo development build if SQLite/camera/OCR dependencies require it; Expo Go only if compatible with selected libraries. |
| Local persistence | SQLite in phase 1. Do not defer offline persistence. |
| Receipt capture | Simple photo/image picker first; defer full document scanning. |
| OCR | Best-effort local/device, fixture, or provider adapter. Do not block on AWS Textract. |
| Speech | Mocked or provider-backed transcript path is acceptable; use the same proposal/review model either way. |
| TTS | Use the fastest available prototype path, behind an adapter if practical. |
| Backend | Stub or defer during phase 1; do not let backend scope block the local prototype. |

## Product Decisions

- Manual input is the baseline completion path.
- Speech and OCR create proposals only.
- Every proposal must be reviewed and confirmed.
- Use plain business language.
- Show estimated totals as estimated when appropriate.
- Keep the prototype to sale and expense only unless cash movement is needed to test a specific JLP assumption.
- Default to one business and one entrepreneur.
- Use synthetic HTG examples unless another prototype currency is chosen.

## Open Questions

### Upfront

- Should the first prototype run on Android only, or both Android and iOS through Expo?
- Is synthetic data mandatory until pilot readiness? Recommended answer: yes.
- Should the prototype default to HTG and English, or include French/Haitian Creole strings in phase 1?
- Should implementation live in this repo or a separate mobile prototype repo?
- Should the backend be absent/stubbed in phase 1? Recommended answer: yes, unless backend scaffolding already exists.

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

## Proposed SDD/OpenSpec Changes

Create three slice-level changes from this brief:

1. `prototype-manual-offline-transaction`
2. `prototype-speech-proposal-confirmation`
3. `prototype-receipt-capture-ocr-review`

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
- Screenshot or screen recording of speech proposal and confirmation.
- Screenshot or screen recording of text-to-speech confirmation.
- Screenshot or screen recording of receipt capture and OCR/review flow.
- Notes on any provider/library limitations discovered.
- Decision log for what should be reused, hardened, or discarded before formal V1 implementation.

## Next Action

Run SDD/OpenSpec Propose for `prototype-manual-offline-transaction` using this milestone brief as the source. Keep the proposed change narrow: manual sale/expense entry, local SQLite persistence, recent activity, simple totals, and sync-shaped status only.

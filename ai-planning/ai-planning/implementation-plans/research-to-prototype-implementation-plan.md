# Research-To-Prototype Implementation Plan

Source documents:

- `../../PROJECT_SUMMARY.md`
- `../../research/FOCUSED_ARCHITECTURE_RESEARCH.md`
- `../../research/ARCHITECTURE_RESEARCH_NEEDS.md`

## Purpose

This plan turns the focused architecture research list into an implementation-oriented path toward a proof of concept.

The goal is not to become an expert in every technology. The goal is to learn enough to:

1. Decide whether the proposed architecture is a good fit.
2. Understand major alternatives and tradeoffs.
3. Judge AI-assisted implementation decisions.
4. Build a minimal working prototype quickly.

## Working Assumptions

- The first product proof of concept should focus on the recipient mobile app, because offline mobile bookkeeping is the highest-risk product and architecture area.
- React Native, Expo, and TypeScript are the default mobile direction unless research reveals a blocker.
- A single shared mobile codebase for iPhone and Android is a core requirement.
- The prototype should prove workflows and architecture shape before it proves visual polish.
- The first backend can be skeletal, but it should reflect the intended Spring Boot modular monolith boundaries early.
- AI, OCR, speech, and document processing can be mocked before they are integrated with AWS services.
- Offline behavior is not optional polish; it is part of the proof of concept.

## Decision Questions

Use these questions to keep research focused.

### Mobile Platform

- Can React Native with Expo support the MVP workflows for iOS and Android from one TypeScript codebase?
- Does Expo managed workflow plus development builds cover camera, SQLite, local files, speech handoff, and app-store deployment needs?
- What would force a move from Expo managed/development builds to bare React Native?
- What is the fastest path to install a one-screen app on both an iPhone and an Android device?
- What is required to have the apps published to both app stores and publicly available?  

### Offline And Sync

- Should local SQLite store only pending operations, or should it store a queryable recent-data projection?
- What is the minimum sync contract for sales, expenses, receipt images, corrections, and status updates?
- Which conflicts can be automatically resolved in the MVP?
- Which states must be visible to users: saved locally, syncing, synced, failed, needs review?

### Mobile Workflows

- What is the minimum screen set for the MVP?
- What is the fallback touch flow when speech or scanning is unavailable?
- How should speech, OCR, and AI proposals stay behind a user confirmation step?
- Which one or two languages should be supported in the first prototype?

### Receipt Capture

- Is simple receipt photo capture enough for the MVP, or is document edge detection/scanning required?
- How should photos be stored locally while offline?
- How should local receipt files be attached to pending transaction operations?

### Backend

- What Spring Boot module boundaries should exist from day one?
- What parts of the backend need to be real for the prototype?
- What can be stubbed without hiding important architectural risk?
- How should deterministic validation and audit history be represented in the first backend slice?

### Back Office

- Is Material UI a reasonable default for the staff admin app?
- What is the thinnest useful staff screen for the prototype?
- Does the back office need to be included in the first proof of concept, or can it follow after the mobile/backend sync path works?

## Suggested Research And Implementation Order

### Phase 1: Mobile Foundation And Deployment Spike

Research topics:

- React Native
- Expo
- TypeScript for mobile development

Primary decisions:

- Use Expo managed workflow with development builds, or start with bare React Native.
- Define the minimal TypeScript project structure.
- Decide how shared API types and runtime validation should work.
- Confirm the path to build and install on iOS and Android from one codebase.

Prototype output:

- Create a minimal Expo + React Native + TypeScript app.
- Implement one screen with:
  - business name placeholder
  - amount input
  - sale/expense toggle
  - save button
  - local status display
- Run locally with Expo.
- Build or document the exact path for:
  - iOS Simulator or physical iPhone
  - Android Emulator or physical Android device
  - EAS Build when ready for installable builds

Stop condition:

- A one-screen app can run on both iOS and Android paths, or the blockers are documented clearly enough to decide whether Expo is still the right foundation.

### Phase 2: Offline-First Local Data Spike

Research topics:

- Offline-first mobile architecture
- Local mobile persistence
- SQLite on mobile
- Sync queues
- Local versus synced state indicators
- Conflict detection and resolution

Primary decisions:

- Store only pending operations in SQLite, or store pending operations plus recent transaction projections.
- Choose the local schema for transactions, sync operations, and receipt file references.
- Define status lifecycle names.
- Define idempotency keys and local temporary IDs.

Prototype output:

- Add SQLite storage to the mobile app.
- Save a sale or expense fully offline.
- Show recent local transactions.
- Show transaction status:
  - local
  - queued
  - syncing
  - synced
  - failed
- Add a retry action for failed sync attempts.
- Create a short sync protocol draft with sample JSON requests and responses.

Stop condition:

- A transaction can be created offline, stored durably, listed after app restart, queued for sync, and assigned a clear user-visible status.

### Phase 3: Thin Backend Sync Slice

Research topics:

- Modular monolith architecture
- Spring Boot module boundaries
- Backend validation
- Immutable audit history

Primary decisions:

- Define the first backend modules:
  - users/organizations
  - businesses
  - transactions or ledger intake
  - sync
  - audit
- Decide whether the first prototype posts simple transaction records or creates real double-entry ledger entries.
- Define validation rules for amount, type, currency, business, and duplicate idempotency key.

Prototype output:

- Create a Spring Boot backend with module/package boundaries.
- Add a mobile sync endpoint for queued transactions.
- Persist transactions in a simple database.
- Return server IDs and server revision numbers.
- Record an audit event for accepted writes.
- Connect the mobile sync queue to the backend endpoint.

Stop condition:

- A locally-created mobile transaction can sync to the backend and receive a durable server identity without duplicate posting on retry.

### Phase 4: Touch-First Bookkeeping Workflow

Research topics:

- Touch-first transaction entry
- Mobile-first application design
- Low-connectivity UX patterns
- Currency, language, and regional formats

Primary decisions:

- Define the minimum screen set:
  - transaction entry
  - recent transactions
  - transaction review/edit
  - simple profit summary
  - sync/issues view if needed
- Enforce a one-currency MVP while avoiding hard-coded future blockers.
- Choose initial locale/date/number formatting approach.

Prototype output:

- Improve the one-screen app into a bare workflow:
  - record sale
  - record expense
  - choose category
  - review before saving
  - view recent transactions
  - see basic revenue, expense, and profit totals
- Keep terminology plain-language and avoid accounting terms in the mobile UI.

Stop condition:

- A user can manually enter basic sales and expenses without speech or scanning, understand what was saved, and see a simple local profit summary.

### Phase 5: Receipt Capture Spike

Research topics:

- Receipt photo capture
- Document scanning from mobile devices
- Local file storage
- Upload queueing

Primary decisions:

- Use simple photo capture for MVP, or include scanning/cropping.
- Choose how local image files are referenced from SQLite operations.
- Decide when receipt uploads occur relative to transaction sync.
- Decide what metadata the backend stores for receipt files.

Prototype output:

- Add camera/photo selection.
- Attach a receipt image to a pending transaction.
- Store the image locally while offline.
- Upload the image when online, or mock upload with a local status transition.
- Preserve the relationship between transaction, receipt file, and sync operation.

Stop condition:

- A transaction can have a locally captured receipt attached before sync, and the app can track whether the receipt has uploaded.

### Phase 6: Speech And Multilingual Proposal Spike

Research topics:

- Speech-operated mobile workflows
- Multilingual mobile input and output
- Confirmation flows
- AI proposal boundaries

Primary decisions:

- Decide whether mobile records audio, sends audio to backend, or sends transcribed text.
- Decide where language detection and translation happen.
- Define a versioned JSON shape for transaction proposals.
- Define confirmation and correction behavior before final save.

Prototype output:

- Add a mocked speech input path first:
  - user enters or records phrase
  - app/backend returns structured proposal
  - user confirms or edits
  - confirmed proposal becomes a normal local transaction operation
- Add initial app internationalization structure.
- Support one non-English language as a proof point if practical.

Stop condition:

- Speech/AI output is represented as a proposed transaction that cannot post directly without deterministic validation and user confirmation.

### Phase 7: Staff Back-Office Thin Slice

Research topics:

- Material UI
- React + Vite admin app
- Staff-facing role-based workflows

Primary decisions:

- Confirm Material UI as the default admin UI library.
- Decide whether the back office belongs in the first prototype milestone or the second.
- Identify the first staff-facing screen.

Prototype output:

- Create a minimal React + Vite + TypeScript + Material UI app.
- Show synced businesses and transactions.
- Add a basic transaction/receipt review view if receipt capture exists.
- Keep authentication mocked unless Cognito is being evaluated in the same milestone.

Stop condition:

- Staff can see mobile-submitted records in a web interface, even if the interface is intentionally bare.

## Fastest Prototype Path

The fastest credible proof of concept should be:

1. Expo React Native app runs on iOS and Android.
2. User records a sale or expense offline.
3. Transaction persists in SQLite.
4. App shows local/synced status.
5. Spring Boot backend accepts queued transaction sync.
6. Retry does not duplicate the transaction.
7. App shows a simple revenue, expense, and profit summary.
8. Optional but valuable: attach a receipt photo and track upload status.

This prototype proves the highest-risk architecture questions before investing in polished UI, AWS infrastructure, OCR, real speech-to-text, AI extraction, or grant reporting.

## Next Phase: Prototype Specs And Implementation

The initial focused research pass is complete. The next step is to turn the research into implementation specs, then build the prototype in thin vertical slices.

Start here:

1. Create `specs/mobile-poc/one-screen-transaction-entry.md`.
2. Build the one-screen Expo React Native app.
3. Create `specs/mobile-poc/offline-storage-and-sync-queue.md`.
4. Add SQLite persistence and a local sync queue.
5. Create `specs/backend-poc/mobile-sync-api.md`.
6. Create `specs/backend-poc/transaction-validation-and-audit.md`.
7. Add the Spring Boot backend sync endpoint.
8. Expand the mobile UI into the touch-first bookkeeping workflow.
9. Add receipt capture and upload-status tracking.
10. Add mocked speech/AI proposal flow.
11. Add staff back-office thin slice.

The first spec, `specs/mobile-poc/one-screen-transaction-entry.md`, should define:

- Expo React Native app baseline;
- TypeScript project assumptions;
- business name placeholder;
- sale/expense toggle;
- amount input;
- optional note/category if included;
- save button;
- local status display;
- what runs in Expo Go versus a development build;
- acceptance checks for iOS and Android.

## Research Output Format

For each research topic, write a short decision note with this structure:

```markdown
# Decision Note: <Topic>

## Question

What decision are we trying to make?

## High-Level Summary

What is the short executive summary of the topic and its relevance to this project?

## 101 Background

What is this technology/concept, explained for someone who has not used it before?

## Foundational Concepts

What vocabulary, mental models, and moving parts are needed to judge implementation decisions?

## Baeldung-Style Technology Introduction

Give a practical, developer-oriented introduction with small examples, common use cases, and plain-language explanation.

## Recommendation

What should we do for this project now?

## Why

Brief reasoning.

## Alternatives Considered

List reasonable alternatives and why they are not first choice.

## Prototype Impact

What should be built or avoided in the proof of concept?

## Risks / Follow-Up

What remains uncertain?

## Sources

Links to official docs, high-quality references, or code examples.

## Learn More

Links and search terms for deeper beginner-friendly reading.
```

## Research Depth Rules

- Prefer official documentation and current primary sources.
- Do not research every feature exhaustively before building.
- For each topic, stop when there is enough information to make the next implementation decision.
- Capture tradeoffs and failure modes, not tutorial-level details.
- Favor prototype evidence over abstract comparisons.
- Keep AI-generated implementation behind explicit specs, schemas, tests, and reviewable commits.

## Research Deliverables

Research artifacts are stored in:

- `research/tech-research/`

Completed initial research artifacts:

- `research/tech-research/phase-01-mobile-foundation-react-native-expo-typescript.md`
- `research/tech-research/phase-02-offline-first-sqlite-sync-architecture.md`
- `research/tech-research/phase-03-thin-backend-sync-slice-spring-boot-modular-monolith.md`
- `research/tech-research/phase-04-touch-first-bookkeeping-mobile-ux.md`
- `research/tech-research/phase-05-receipt-capture-mobile-document-scanning.md`
- `research/tech-research/phase-06-speech-multilingual-ai-proposal-workflow.md`
- `research/tech-research/phase-07-staff-back-office-react-vite-material-ui.md`
- `research/tech-research/nonprofit-cost-programs-running-list.md`

## Initial Spec Deliverables

Create these specs before implementation:

- `specs/mobile-poc/one-screen-transaction-entry.md`
- `specs/mobile-poc/offline-storage-and-sync-queue.md`
- `specs/backend-poc/mobile-sync-api.md`
- `specs/backend-poc/transaction-validation-and-audit.md`

## Architecture Fit Criteria

The proposed architecture remains a good fit if research and prototype work show that:

- Expo can support the required mobile capabilities without early native eject complexity.
- One React Native codebase can cover both iOS and Android prototype deployment.
- SQLite-backed offline operation is manageable for the expected transaction volume.
- Sync can be modeled with clear IDs, idempotency, revisions, and visible statuses.
- The Spring Boot modular monolith can keep financial, document, AI, reporting, and audit concerns separated enough for early development.
- Receipt capture can start simple and evolve toward OCR/document processing later.
- Speech and AI can be treated as proposal generators rather than systems of record.
- Material UI can deliver a useful staff admin interface without custom design-system work.

Reconsider the architecture if:

- Expo blocks essential camera, SQLite, file, background sync, or deployment workflows.
- Offline sync requires a mature third-party sync platform earlier than expected.
- The mobile app needs heavy native performance or device integration beyond React Native's practical range.
- The backend module boundaries collapse into shared-state coupling that makes financial correctness hard to test.
- Staff back-office and reporting needs dominate before the mobile/offline workflow is proven.

## Near-Term Action Checklist

- [x] Research React Native + Expo + TypeScript deployment path for iOS and Android.
- [x] Write the mobile platform decision note.
- [x] Research SQLite/offline sync patterns.
- [x] Write the offline sync decision note.
- [x] Research Spring Boot modular monolith backend sync slice.
- [x] Research touch-first mobile bookkeeping workflow.
- [x] Research receipt capture and mobile document scanning.
- [x] Research speech/multilingual AI proposal workflow.
- [x] Research staff back-office thin slice.
- [ ] Spec the one-screen transaction-entry prototype.
- [ ] Build the Expo one-screen app.
- [ ] Spec the sync queue and backend sync API.
- [ ] Build local SQLite persistence and queued sync.
- [ ] Build the Spring Boot sync endpoint.
- [ ] Add receipt capture if the base offline sync slice is stable.
- [ ] Add mocked speech/AI proposal flow after manual transaction entry works.
- [ ] Add the staff back-office thin slice after mobile-to-backend sync works.

# Focused Architecture Research

Companion to `ARCHITECTURE_RESEARCH_NEEDS.md`.

This is the narrowed research set for the mobile bookkeeping project. The goal is to understand enough of each component to make practical architecture and implementation decisions for the first MVP.

## Mobile App Foundation

### React Native

- [ ] What to learn: core app structure, components, navigation patterns, native module limits, app lifecycle, platform differences between iOS and Android.
- [ ] Project decision: whether React Native is sufficient for receipt capture, speech workflows, offline storage, and low-end-device performance.

### Expo

- [ ] What to learn: managed workflow, development builds, EAS Build, EAS Submit, config plugins, native capability constraints, over-the-air updates.
- [ ] Project decision: whether to start with Expo managed/development builds or use bare React Native from the beginning.

### TypeScript for Mobile Development

- [ ] What to learn: React Native TypeScript project structure, shared types between mobile and backend APIs, runtime validation options, error handling patterns.
- [ ] Project decision: how strict the mobile type model should be for transactions, sync state, AI proposals, and offline records.

### Mobile-First Application Design

- [ ] What to learn: layout patterns for small screens, accessibility, field ergonomics, large tap targets, intermittent use, low-literacy flows.
- [ ] Project decision: the minimum screen set needed for MVP sales, expenses, receipts, profit reporting, and loan balance.

## Mobile Interaction Workflows

### Touch-First Transaction-Entry Workflows

- [ ] What to learn: fast sales and expense entry patterns, category selection, amount entry, review/confirmation flows, correction flows.
- [ ] Project decision: the default transaction-entry flow when speech or scanning is unavailable.

### Speech-Operated Mobile Workflows

- [ ] What to learn: speech capture UX, transcription handoff, confirmation design, error correction, noisy-environment handling, language switching.
- [ ] Project decision: how speech input becomes a structured transaction proposal without directly posting to the ledger.

### Multilingual Mobile Input and Output

- [ ] What to learn: app internationalization, translated labels, dynamic language selection, mixed-language input, right-to-left considerations if needed.
- [ ] Project decision: which one or two MVP languages to support and where translation happens: app, backend, AI provider, or a mix.

### Mobile Handling of Currencies, Languages, and Regional Formats

- [ ] What to learn: currency formatting, decimal separators, dates, number parsing, locale-aware display, multi-currency constraints.
- [ ] Project decision: how to enforce a one-currency MVP while avoiding hard-coded assumptions that block future expansion.

## Camera, Receipts, And Documents

### Receipt Photo Capture

- [ ] What to learn: Expo/React Native camera libraries, permissions, image compression, upload preparation, offline photo queueing.
- [ ] Project decision: how receipt images are captured, stored locally, attached to transactions, and uploaded later.

### Document Scanning From Mobile Devices

- [ ] What to learn: document edge detection, cropping, glare/blur handling, multi-page capture, PDF/image output tradeoffs.
- [ ] Project decision: whether MVP needs true document scanning or simple receipt photo capture first.

## Offline And Sync Architecture

### Offline-First Mobile Architecture

- [ ] What to learn: offline-first data modeling, optimistic UI, local write ownership, server reconciliation, failure states.
- [ ] Project decision: which actions must work fully offline in the MVP.

### Low-Connectivity UX Patterns

- [ ] What to learn: clear status indicators, retry behavior, degraded modes, user trust patterns, avoiding silent sync failure.
- [ ] Project decision: how the app communicates saved-local, syncing, synced, and failed states.

### Local Mobile Persistence

- [ ] What to learn: local database options, file storage for images, secure storage for tokens, data migration strategies.
- [ ] Project decision: what data lives in SQLite, what lives as local files, and what should never be stored locally.

### SQLite on Mobile

- [ ] What to learn: Expo SQLite options, schema migrations, query patterns, indexing, transaction support, encryption options or alternatives.
- [ ] Project decision: whether SQLite should store only pending operations or a queryable local projection of recent business data.

### Offline Synchronization

- [ ] What to learn: sync protocol design, pull/push ordering, idempotency, server-assigned IDs, local temporary IDs, retry handling.
- [ ] Project decision: the first sync contract between the mobile app and backend.

### Sync Queues

- [ ] What to learn: operation queues, durable retry queues, upload queues for images, background sync limitations, dependency ordering.
- [ ] Project decision: how sales, expenses, receipt images, and corrections are queued and replayed.

### Conflict Detection and Conflict Resolution

- [ ] What to learn: versioning, timestamps, server revision numbers, merge rules, manual conflict resolution UX.
- [ ] Project decision: which MVP conflicts can be automatically resolved and which require user or staff review.

### Local Versus Synced State Indicators

- [ ] What to learn: status models, icon/label patterns, error visibility, retry controls, audit implications.
- [ ] Project decision: the transaction status lifecycle shown to the business owner.

## Back-Office Frontend

### Material UI

- [ ] What to learn: layout system, data tables, forms, dialogs, theming, accessibility, integration with React/Vite.
- [ ] Project decision: whether Material UI is the right default for the staff admin app and reporting screens.

## Backend Architecture

### Modular Monolith Architecture

- [ ] What to learn: modular monolith principles, deployment model, module ownership, shared database tradeoffs, testing strategy.
- [ ] Project decision: how to keep one backend deployable while avoiding a tangled codebase.

### Module Boundaries Inside a Spring Boot Backend

- [ ] What to learn: Spring package/module organization, dependency rules, service boundaries, transaction boundaries, domain events.
- [ ] Project decision: initial module boundaries for users, businesses, ledger, loans, documents, AI proposals, reports, and audit history.

## Suggested Research Order

1. React Native, Expo, and TypeScript for mobile development
2. Offline-first mobile architecture, SQLite, sync queues, and conflict handling
3. Touch, speech, multilingual, and low-connectivity UX patterns
4. Receipt capture and mobile document scanning
5. Modular monolith and Spring Boot module boundaries
6. Material UI for the staff back-office app

## Purpose

Defines the M1 manual offline Android prototype behavior that must be accepted before a component-local mobile implementation can prove offline sale and expense recording for the Business Journal.

## ADDED Requirements

### Requirement: Prototype scope remains manual, offline, and planning-only
The planning repository SHALL define `prototype-manual-offline-transaction` as an M1 product-planning contract for a manual Android prototype slice and SHALL NOT authorize mobile app implementation, repository creation, backend synchronization, external account setup, infrastructure, CI/CD, credentials, real data, or production/pilot use.

#### Scenario: Planning proposal is reviewed
- **WHEN** this change is reviewed in the planning repository
- **THEN** the observable output is limited to OpenSpec planning artifacts, requirements, design, tasks, and validation evidence in this repository

#### Scenario: Implementation is attempted from the central change
- **WHEN** someone tries to use this central change to create the mobile repository, add application code, configure sync, create accounts, provision infrastructure, configure CI/CD, create credentials, or use real data
- **THEN** review blocks the work until a separate explicitly approved follow-on change authorizes that scope

### Requirement: Synthetic Android prototype context is fixed for M1
The future mobile implementation SHALL use only synthetic prototype data for one synthetic entrepreneur and one synthetic business, with explicit language and currency assumptions for labels, categories, amounts, summaries, statuses, screenshots, test fixtures, and validation evidence.

#### Scenario: Prototype context is displayed
- **WHEN** the prototype home or record flow is opened
- **THEN** it identifies a synthetic business context and uses localizable plain business language with explicit currency assumptions

#### Scenario: Non-synthetic data appears
- **WHEN** a fixture, screenshot, screen recording, database record, log excerpt, issue, task, or validation artifact includes participant records, production financial data, credentials, secrets, payment details, or other sensitive data
- **THEN** the evidence is rejected and regenerated with synthetic-only data before acceptance

### Requirement: Android installability evidence is required
The future mobile implementation SHALL produce a versioned Android prototype build that can be installed and opened on a representative physical Android device without a developer workstation connection, and SHALL record evidence of that installability before the M1 manual offline slice is considered complete.

#### Scenario: Physical-device install is verified
- **WHEN** the component-local mobile change is verified
- **THEN** evidence shows the versioned Android build installed and opened on a representative physical Android device without relying on a live development workstation

#### Scenario: Only emulator or developer-session evidence exists
- **WHEN** verification has only emulator screenshots, source-code review, or a development-server session
- **THEN** the Android installability requirement remains unverified

### Requirement: Manual sale and expense entry works without network
The prototype SHALL allow a user to manually enter, review, and confirm a sale or expense while the device has no network connection, using plain business language and the minimum useful fields for type, amount, date, category or purpose, and optional note.

#### Scenario: Manual sale is confirmed offline
- **WHEN** the device has no network connection and the user records and confirms a synthetic sale
- **THEN** the sale becomes a confirmed local Business Journal record and appears immediately in the local recent activity view

#### Scenario: Manual expense is confirmed offline
- **WHEN** the device has no network connection and the user records and confirms a synthetic expense
- **THEN** the expense becomes a confirmed local Business Journal record and appears immediately in the local recent activity view

#### Scenario: Network is unavailable
- **WHEN** the user completes the manual sale or expense flow while offline
- **THEN** the flow completes without requiring backend availability, authentication, cloud services, speech, OCR, receipt capture, AI, or live REST API synchronization

### Requirement: Human confirmation creates the local Business Journal record
The prototype SHALL separate entered draft values from confirmed Business Journal record values and SHALL create the durable local sale or expense record only after the user reviews and confirms the transaction.

#### Scenario: Draft values are reviewed
- **WHEN** a user enters sale or expense values
- **THEN** the prototype presents a review/confirm state that summarizes the entered values in plain language before saving the confirmed record

#### Scenario: User cancels before confirmation
- **WHEN** a user cancels from the review/confirm state before confirming
- **THEN** no confirmed Business Journal record is created from that draft

### Requirement: SQLite-backed local durability survives app restart
The future mobile implementation SHALL persist confirmed local sale and expense records in SQLite-backed durable local storage suitable for Android offline use and SHALL prove that confirmed records remain visible after the app is closed and reopened.

#### Scenario: Confirmed transaction survives restart
- **WHEN** a confirmed sale or expense is saved locally and the app is restarted
- **THEN** the same confirmed record remains visible in recent activity with its amount, type, date, category or purpose, note when present, currency, confirmation state, and local/sync status preserved

#### Scenario: App closes during or after saving
- **WHEN** the app is closed after confirmation or during a normal post-confirmation return to home
- **THEN** the confirmed record is not lost and duplicate records are not created from the same confirmation action

### Requirement: Recent activity and simple local totals use confirmed local records
The prototype SHALL show recent local Business Journal activity and simple local totals calculated from confirmed local sale and expense records, including money earned, money spent, and estimated profit for the displayed period.

#### Scenario: Local totals update after sale
- **WHEN** a confirmed sale is saved locally
- **THEN** recent activity includes the sale and the displayed local totals update money earned and estimated profit for the active period

#### Scenario: Local totals update after expense
- **WHEN** a confirmed expense is saved locally
- **THEN** recent activity includes the expense and the displayed local totals update money spent and estimated profit for the active period

#### Scenario: Totals are incomplete local estimates
- **WHEN** totals are based only on local prototype records
- **THEN** user-facing language does not present them as audited, complete, synced, loan-eligible, impact-proving, or production financial statements

### Requirement: Sync-shaped status is local and user-understandable
The prototype SHALL expose local/sync status in user-understandable language while preserving a durable local state model that can distinguish saved locally, queued or waiting to sync, syncing, synced, failed, and needs-review meanings, without requiring live backend synchronization in M1.

#### Scenario: Confirmed local record has status
- **WHEN** a sale or expense is confirmed locally
- **THEN** the record displays a plain-language status such as `Saved on this phone` or `Waiting to sync`

#### Scenario: Technical status would leak into UX
- **WHEN** a status is shown to the user
- **THEN** the user-facing copy avoids raw backend codes, accounting jargon, stack traces, infrastructure terms, and unsupported claims that data was lost

### Requirement: Local outbox and idempotency prepare safe future sync
The prototype SHALL create or preserve a local sync-shaped outbox record, stable local identifier, and client idempotency key for each confirmed sale or expense so future M1.2 live REST API synchronization can retry without duplicating records.

#### Scenario: Confirmed transaction creates outbox identity
- **WHEN** a sale or expense is confirmed locally
- **THEN** the future mobile implementation records evidence that the confirmed local transaction has a stable local identity, client idempotency key, operation identity for creating the transaction, and queued local outbox state

#### Scenario: App restart happens before live sync exists
- **WHEN** the app restarts before any backend sync is configured
- **THEN** the confirmed local record, outbox entry or equivalent queued sync record, and client idempotency key remain stable

#### Scenario: Live API behavior is requested in M1
- **WHEN** implementation work attempts to send the transaction to a live REST API, define executable API contracts, configure authentication, or prove server acknowledgement as part of this M1 slice
- **THEN** review blocks that expansion and routes it to a separate approved M1.2 live-sync change

### Requirement: Follow-on mobile implementation is explicit and component-local
After this planning change is reviewed and accepted, mobile repository creation and implementation SHALL occur only through separate explicit follow-on work that records the nonprofit-owned repository location, access model, implementation scope, central change reference, component-local OpenSpec change, validation commands, Android installability evidence, local persistence evidence, and durable links back to this central contract.

#### Scenario: Follow-on mobile repository creation is proposed
- **WHEN** the M1 manual offline slice is approved for Apply and the team is ready to create the mobile repository
- **THEN** the follow-on work identifies the repository owner/location, branch/change name, access model, implementation boundary, validation plan, and durable link to `prototype-manual-offline-transaction`

#### Scenario: Component implementation evidence is returned to central verification
- **WHEN** central verification later evaluates this M1 behavior
- **THEN** it records durable links to the mobile repository revision, component-local OpenSpec change, Android install evidence, offline sale/expense evidence, SQLite restart evidence, recent activity/totals evidence, outbox/idempotency evidence, validation commands, failures, skipped checks, and residual gaps

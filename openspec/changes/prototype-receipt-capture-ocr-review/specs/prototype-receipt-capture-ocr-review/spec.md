## Purpose

Defines the final M1 receipt-assisted expense proof: local receipt evidence and
Android OCR suggestions remain reviewable inputs, while the manual offline
Business Journal flow remains complete and authoritative.

## ADDED Requirements

### Requirement: Central planning coordinates but does not implement the receipt slice
The planning repository SHALL retain this change as the product contract and
central delivery envelope for M1 receipt capture, OCR, parser review, and
system acceptance. It SHALL dispatch at most one separately approved
component-local mobile change and SHALL NOT contain application code, claim
component validation without a component return, or authorize repository,
cloud, provider, deployment, credential, participant-data, or financial-data
operations.

#### Scenario: Central receipt proposal is reviewed
- **WHEN** this change is reviewed in the planning repository
- **THEN** it identifies the component repository, component-local change,
  validation return, Android acceptance evidence, and residual gaps without
  substituting central planning artifacts for mobile implementation evidence

#### Scenario: Central work attempts component implementation
- **WHEN** the central envelope is used to modify mobile application code or
  to claim OCR, build, device, or receipt behavior without returned component
  and system-acceptance evidence
- **THEN** review blocks the claim until the component-local lifecycle and
  central verification evidence exist

### Requirement: Receipt assistance remains synthetic, local-only, and manual-first
The M1 prototype SHALL use only synthetic receipt images and transaction data.
It SHALL allow the user to continue to a normal manual expense flow while
offline, without backend availability, live synchronization, cloud OCR,
Google-cloud processing, external send, authentication, or a paid provider.

#### Scenario: Offline receipt flow begins
- **WHEN** the device is offline and the user starts a receipt-assisted expense
- **THEN** the prototype can capture or select a local image and continue the
  local review or manual-expense path without a network request

#### Scenario: Sensitive or production data is introduced
- **WHEN** a fixture, receipt image, log, screenshot, test result, or evidence
  record contains participant, production financial, personal, credential, or
  other sensitive data
- **THEN** the evidence is rejected and replaced with synthetic-only material
  before it is accepted

### Requirement: A local receipt image and metadata are preserved independently
The prototype SHALL allow a user to take a receipt photo or choose a local
image, including a useful fallback when camera permission is unavailable. It
SHALL retain a durable local app-controlled file reference and receipt metadata
separately from an unconfirmed expense and from a confirmed transaction.

#### Scenario: User attaches a receipt image
- **WHEN** a user takes or selects a synthetic receipt image
- **THEN** the image and its local metadata remain available for review and no
  expense record is created solely by attaching the image

#### Scenario: Camera permission is denied
- **WHEN** camera permission is denied or unavailable
- **THEN** the user can choose an existing local image or enter the expense
  manually without losing access to the core expense workflow

### Requirement: Android OCR is device-local and preserves source evidence
On the M1 Android acceptance path, the prototype SHALL perform text recognition
against the selected local receipt image with a bundled on-device model that
does not require a first-use model download, network request, or cloud OCR
service. It SHALL preserve raw OCR text, extraction outcome, and available
line or layout evidence separately from any suggested or confirmed fields.

#### Scenario: Device-local OCR succeeds
- **WHEN** a supported synthetic receipt image is attached on an offline
  installed Android build
- **THEN** the prototype displays or makes available the extracted raw text and
  keeps it separate from the expense fields awaiting confirmation

#### Scenario: OCR cannot return usable text
- **WHEN** the local recognizer fails, is unavailable, or returns no useful
  text
- **THEN** the prototype records an extraction outcome, preserves an available
  local image, and keeps manual expense completion available

### Requirement: Parser suggestions are uncertain, editable proposals
The prototype SHALL use deterministic local parsing to create an editable,
non-authoritative proposal from OCR text and available layout evidence. It MAY
suggest merchant, occurrence date, amount, fixed `HTG` currency, and a short
description; it SHALL leave an unsupported or uncertain field blank and SHALL
not infer a category or item-level interpretation. Each suggested field SHALL
carry source and confidence or uncertainty meaning that the review interface
can distinguish from a confirmed fact.

#### Scenario: Parser creates a receipt proposal
- **WHEN** local OCR provides supported receipt text or layout evidence
- **THEN** the prototype presents only editable suggested fields with their
  uncertainty/source context and does not save an expense

#### Scenario: Parser cannot identify an amount or date
- **WHEN** the parser lacks sufficient deterministic evidence for a supported
  field
- **THEN** it leaves that field blank rather than inventing a value and allows
  the user to provide or correct it manually

### Requirement: Explicit review and confirmation control the financial record
The receipt review SHALL visibly distinguish the image, raw OCR text, parser
suggestions, and final editable expense values. A user SHALL be able to correct
or clear every suggested value before confirming. Only explicit confirmation
through the existing local expense path SHALL create one confirmed local
transaction and its stable queued outbox record; cancellation, retry, or
extraction failure SHALL not create a transaction or an outbox operation.

#### Scenario: User confirms a corrected receipt expense
- **WHEN** a user edits a receipt-derived proposal and confirms the expense
- **THEN** one normal local expense is persisted with the chosen values, its
  receipt/source evidence remains separate, and its existing local/queued
  status and idempotency behavior are preserved

#### Scenario: User cancels or retries the proposal
- **WHEN** a user clears, cancels, replaces the image, or retries extraction
  before confirmation
- **THEN** no confirmed expense, totals change, or outbox operation is created
  from the unconfirmed proposal

### Requirement: Component and Android acceptance evidence is required
Before this receipt slice can be centrally verified, the component-local mobile
change SHALL provide current repository-specific implementation, test,
dependency, security, attribution, and OpenSpec evidence, and the central
envelope SHALL retain a returned component record. Android acceptance SHALL
show a versioned installed build on the representative physical device with
synthetic data, offline local OCR behavior or its truthful limitation, receipt
review/correction, manual fallback, restart durability, and English/French
locale coverage.

#### Scenario: Component return and device evidence are complete
- **WHEN** the component has completed its own lifecycle and the required
  Android acceptance is recorded
- **THEN** central verification can map each receipt requirement and scenario
  to current component and physical-device evidence

#### Scenario: Only emulator or planning evidence exists
- **WHEN** evidence consists only of central planning artifacts, an emulator,
  source review, or a development-server session
- **THEN** the receipt slice remains unverified for physical Android acceptance

# prototype-speech-proposal-confirmation Specification

## Purpose

Defines the M1 Phase 2 speech-assisted Android prototype behavior and the evidence required to prove that speech remains an optional, reviewable input path rather than an authoritative financial write.

## Requirements

### Requirement: Speech assistance remains a synthetic offline proposal path

The M1 speech prototype SHALL use deterministic synthetic transcript fixtures
without sending audio, transcripts, proposals, or transaction data to a live
speech provider, backend, cloud service, or production system. The flow SHALL
remain usable without network connectivity and SHALL visibly describe its
output as a suggestion that requires review. Any start or listening-style state
SHALL visibly disclose that the prototype is using a synthetic sample message
and is not recording or transcribing the user.

#### Scenario: Synthetic speech example is started offline
- **WHEN** a user starts the speech-assisted sale flow without network connectivity
- **THEN** the prototype can present a deterministic synthetic transcript and continue to a reviewable suggestion without contacting an external service

#### Scenario: Prototype sample boundary is displayed
- **WHEN** the deterministic fixture enters a start or listening-style state
- **THEN** visible copy identifies it as a prototype sample and does not claim that the microphone is listening or that the user's speech was captured

#### Scenario: Live provider behavior is requested
- **WHEN** implementation attempts to record or upload audio, call a live speech or AI provider, or transmit the transcript or proposal
- **THEN** review blocks the expansion and retains the deterministic local fixture boundary for this slice

### Requirement: Transcript creates an editable proposal and not a transaction

The prototype SHALL transform the known synthetic transcript `I sold rice for
500 gourdes today` into a sale proposal for 500 HTG with a rice or sales
purpose and a plain-language confirmation summary. It SHALL keep the raw
transcript and proposed values distinct from confirmed Business Journal values,
and it SHALL create no confirmed transaction or outbox item before explicit
human confirmation.

#### Scenario: Known transcript produces a proposal
- **WHEN** the deterministic speech example finishes successfully
- **THEN** the user sees the raw transcript, a `Suggested from speech` source label, editable sale fields, and a plain-language 500 HTG confirmation summary

#### Scenario: Proposal is shown before confirmation
- **WHEN** a speech-derived proposal is displayed or edited
- **THEN** recent activity, local totals, confirmed transactions, and the sync-shaped outbox remain unchanged

### Requirement: Review, edit, cancel, and record-again controls preserve user authority

The speech review state SHALL let the user edit proposed values, cancel the
proposal, replace it through `Record again`, or explicitly confirm it. Cancel
and record-again actions SHALL NOT confirm or retain the superseded proposal as
a Business Journal record.

#### Scenario: User edits and confirms a suggestion
- **WHEN** a user changes a proposed field and then confirms the speech-derived sale
- **THEN** the confirmed record uses the reviewed value while preserving the original transcript and proposal metadata separately

#### Scenario: User cancels the suggestion
- **WHEN** a user cancels from speech review before confirmation
- **THEN** no confirmed transaction or outbox item is created from the proposal

#### Scenario: User records again
- **WHEN** a user selects `Record again` from speech review
- **THEN** the previous proposal is not confirmed and the prototype returns to the speech-start state for a replacement synthetic transcript

### Requirement: Confirmation reuses the durable local transaction path

After explicit confirmation, the prototype SHALL create a normal SQLite-backed
local sale with `speech_transcript` source context, update recent activity and
local totals, and create the same stable local identity, client idempotency key,
and queued outbox state used by manual entries. The record and its source
metadata SHALL survive app restart without duplication.

#### Scenario: Speech proposal is confirmed offline
- **WHEN** a user reviews and confirms the speech-derived sale while offline
- **THEN** one confirmed local sale appears in recent activity, local totals update, and one stable queued outbox identity is associated with it

#### Scenario: App restarts after speech confirmation
- **WHEN** the app is closed and reopened after a speech-derived sale is confirmed
- **THEN** the confirmed sale and its speech source context remain available without creating a duplicate transaction or outbox operation

### Requirement: Text-to-speech is optional confirmation assistance

The speech review state SHALL offer a user-controlled action that reads the
visible confirmation summary through the device text-to-speech path. The same
summary SHALL remain visible, and TTS unavailability, interruption, or error
SHALL NOT save, change, cancel, or block the proposal or the manual workflow.

#### Scenario: User requests spoken confirmation
- **WHEN** a user activates the read-aloud action on a supported Android device
- **THEN** the device attempts to speak the same plain-language summary shown in the review state without confirming the proposal

#### Scenario: Device TTS is unavailable
- **WHEN** no suitable device voice is available or speaking reports an error
- **THEN** the visible proposal remains editable and the user can still confirm, cancel, record again, or use manual entry

### Requirement: Speech failure preserves the complete manual fallback

The prototype SHALL provide an unavailable/failure state with plain-language
retry and manual-sale actions. A speech failure SHALL preserve existing
confirmed local records and SHALL NOT make manual sale or expense entry depend
on speech, TTS, microphone permission, or network access.

#### Scenario: Speech fixture reports no usable message
- **WHEN** the deterministic speech path enters its unavailable state
- **THEN** the user can try again or enter the sale manually without data loss

#### Scenario: User chooses manual fallback
- **WHEN** a user selects `Enter sale yourself` from the speech failure state
- **THEN** the existing manual sale flow opens and remains fully usable offline

### Requirement: Speech-facing copy remains localized and synthetic

All new speech, suggestion, read-aloud, re-record, failure, and fallback copy
SHALL use the existing English and French keyed-resource mechanism with English
fallback. Examples and evidence SHALL use synthetic HTG business data only and
SHALL not include participant information, real financial data, credentials,
device identifiers, or retained audio.

#### Scenario: French resources are active
- **WHEN** the prototype resolves French as the active interface locale
- **THEN** all new speech-flow controls and status messages display their French resources while the stored currency remains HTG

#### Scenario: Non-synthetic evidence is encountered
- **WHEN** a fixture, screenshot, transcript, log, or verification record contains real or sensitive data
- **THEN** the evidence is rejected and regenerated with synthetic data before acceptance

### Requirement: Speech controls remain accessible on the representative Android device

The new speech, suggestion, read-aloud, edit, confirm, cancel, record-again,
retry, and manual-fallback actions SHALL use visible text labels and accessible
control names, remain reachable on the representative small Android screen at
a documented enlarged-text acceptance setting, and retain a visible
alternative to every spoken output. The flow SHALL NOT require an icon-only
action or TTS audio to understand or complete the transaction.

#### Scenario: Screen reader semantics are inspected
- **WHEN** the speech start, review, failure, and fallback states are rendered
- **THEN** every actionable control has an accessible name matching its visible purpose and the proposal source and confirmation state are available as text

#### Scenario: Text size is enlarged
- **WHEN** the representative Android device uses a documented enlarged-text acceptance setting
- **THEN** the transcript, editable proposal, visible summary, and primary review and fallback actions remain readable and reachable without relying on TTS

### Requirement: Cross-repository delivery uses durable linkage and Android acceptance

The planning repository SHALL keep this central change open while one
component-local mobile OpenSpec change implements the speech behavior. Before
component Apply, a linkage ledger SHALL record the exact central revision,
component repository and change, dispatch contract, acceptance executor, and
evidence location. Central verification SHALL require returned component tests
and an installed Android run covering proposal-before-save, edit or re-record,
confirmation, TTS, failure/manual fallback, persistence, localization, and the
truthful fixture disclosure, accessibility, and no-network/no-provider boundary.

#### Scenario: Mobile component is dispatched
- **WHEN** the central proposal and planning review pass and component Apply is authorized
- **THEN** the component proposal cites the pinned central revision, this delta path, the approved repository, the prototype profile, and the required return evidence

#### Scenario: Component evidence returns
- **WHEN** the mobile component completes its local lifecycle
- **THEN** the central ledger records its exact integrated revision, archived change, deterministic checks, Android build evidence, contract relationship, and residual gaps

#### Scenario: Central close-out is evaluated
- **WHEN** component return and assigned synthetic Android acceptance evidence are available
- **THEN** central verification maps every requirement and scenario before Sync or Archive and refuses closure while any required behavior is uncovered

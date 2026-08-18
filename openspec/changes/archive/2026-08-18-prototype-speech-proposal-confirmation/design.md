## Context

See [proposal.md](proposal.md) for motivation and
`specs/prototype-speech-proposal-confirmation/spec.md` for the behavioral
contract. M1 Phase 1 is already archived and merged in both the central and
mobile repositories. The mobile app has a Home-first manual sale/expense flow,
SQLite persistence, English/French resources, local totals, and a queued
outbox, but intentionally contains no speech or TTS dependency.

This slice uses the existing temporary public mobile repository
`jizzoe/hrf-reinvest-to-grow-mobile-app`; transfer to HRF remains mandatory
before participant, pilot, or production use. The controlling M1 brief fixes
speech-to-text to deterministic mocked fixtures and TTS to the device path. The
current mobile app uses Expo SDK 57. The official
[Expo SDK 57 Speech documentation](https://docs.expo.dev/versions/v57.0.0/sdk/speech/)
identifies `expo-speech` as the supported Android/iOS/Web TTS package and
exposes start, completion, stop, and error callbacks; the component change must
install its SDK-compatible version through Expo's dependency resolver and
record the exact resolved version.

## Goals / Non-Goals

**Goals:**

- Reuse the existing transaction draft, review, SQLite confirmation, totals,
  and outbox behavior for a synthetic speech-shaped proposal.
- Make the provider boundary deterministic and testable without audio capture,
  network access, credentials, or transcript retention policy.
- Add a device-TTS adapter whose failures never alter proposal or financial
  state.
- Bind the central contract, component change, automated evidence, and assigned
  Android acceptance through one durable ledger.

**Non-Goals:**

- Real microphone capture, speech-to-text, translation, cloud AI, AWS, backend
  sync, authentication, receipt/OCR, analytics, iOS/TestFlight, deployment, or
  production/pilot use.
- A general natural-language parser, variable currencies, cash movement, or
  silent financial-record creation.
- Retaining audio or treating spoken/read-aloud behavior as an accessibility
  substitute for visible, touch-operable controls.

## Decisions

### Use one central contract-and-delivery change

`prototype-speech-proposal-confirmation` remains open as both the Phase 2
product contract and central delivery envelope. It owns a linkage ledger and
coordinates one component-local change. This avoids the historical Phase 1
split, which was necessary only because its planning contract had already been
archived before implementation began.

Alternative considered: archive a planning-only contract and create a second
delivery envelope. Rejected because no historical boundary requires the extra
change and one open central slice gives a future session a single authoritative
resume point.

### Simulate transcript capture behind a replaceable adapter

The component will expose the selected `Use speech` and listening-style states
but obtain the Phase 2 transcript from a deterministic local fixture. The
screen must visibly identify the interaction as a prototype sample and say
that it is not recording or transcribing the user; it must not present the
fixture as captured speech. The primary fixture is `I sold rice for 500
gourdes today`; a separate deterministic failure result drives the unavailable
state. No microphone permission, audio file, live recognizer, network call, or
provider credential is introduced.

Alternative considered: native microphone recording or cloud transcription.
Rejected because the accepted prototype decision prioritizes the proposal,
review, and fallback interaction, while real recognition adds privacy,
permission, language-quality, cost, and connectivity variables outside this
slice.

### Extend the existing draft and source model instead of creating a speech record type

The mocked transcript maps to the same editable sale draft used by manual
entry. Proposal state holds the raw transcript, proposed values, source type,
and deterministic fixture identity until confirmation. Confirmation writes one
normal local transaction and one outbox entry, while persisting source metadata
separately enough to reconstruct why the values were suggested. Cancel and
record-again discard the unconfirmed candidate and cannot create an outbox
operation.

Alternative considered: save a provisional transaction before review. Rejected
because it would blur proposal and record state and violate the accepted human
confirmation boundary.

### Use device TTS through a narrow adapter

The mobile component will add the Expo SDK-compatible `expo-speech` package and
wrap only the operations needed to speak and stop the visible summary and
observe completion/error. The adapter is injected or mocked in deterministic
tests. Entering another screen or replacing a proposal stops queued speech;
TTS callbacks never confirm or mutate financial data.

Alternative considered: cloud TTS or direct package calls throughout the UI.
Rejected because cloud TTS expands the provider/data boundary and scattered
calls would make failure and test behavior harder to control.

### Preserve the selected M1 speech visuals and locale mechanics

The component will add functional `Use speech` entry, suggestion review,
selected green re-record action, unavailable state, and manual-sale fallback
using the current Home visual language and stable `testID` selectors. New copy
lives in the existing English/French keyed resources. The deterministic
transcript is English-first; the review summary and controls follow the active
interface locale, with English fallback. Haitian Creole and production
translation review remain deferred. Visible labels and accessible names cover
every action, the summary remains visible when TTS is used or fails, and the
transcript, summary, and primary actions must remain reachable at a documented
enlarged-text acceptance setting on the representative small Android device.

Alternative considered: introduce a language picker or separate speech
navigation model. Rejected because both are outside M1 and the selected design
defines speech as a variant of the existing review flow.

### Separate deterministic checks from physical-device acceptance

Component tests will cover proposal mapping, no-save-before-confirmation,
editing, cancel, re-record, failure/manual fallback, TTS success/error
callbacks, English/French resources, SQLite persistence, and stable outbox
identity. Tests also cover truthful fixture disclosure, accessible names, and
the visible non-audio completion path. Joe Rice remains the end-to-end executor
for a synthetic Android 15 run that includes a documented enlarged-text check.
A new installable build is needed to prove device TTS and the assembled flow;
any EAS build/artifact write must pass its separate just-in-time runtime
permission before execution.

Alternative considered: accept Jest evidence alone. Rejected because mocked
TTS tests cannot prove that the representative Android device audibly invokes
its speech service or that the selected flow remains usable in the assembled
application.

## Risks / Trade-offs

- [A mocked transcript is mistaken for speech-recognition validation] → Label
  the fixture boundary in the UI/evidence and claim only proposal-flow and
  device-TTS viability.
- [TTS voice or language data is unavailable on the device] → Preserve the
  visible summary, surface a non-blocking message, and complete acceptance of
  fallback behavior without claiming audio success; record the device limit.
- [TTS continues after navigation or proposal replacement] → Stop queued speech
  on relevant transitions and cover cleanup with deterministic tests.
- [Speech code bypasses the existing confirmation path] → Reuse the same draft
  validation and confirmation service and assert that proposal/re-record/cancel
  states do not change transactions, totals, or outbox rows.
- [A new EAS build lacks authorization or runtime access] → Complete only local
  evidence, retain device acceptance as pending, and do not claim central
  Verify or Archive.
- [Dependency installation exposes advisories or SDK mismatch] → Use Expo's
  compatible installer, record the resolved dependency and audit evidence, and
  pause for any material security decision.

## Migration Plan

1. Complete and approve this central proposal, delta, design, tasks,
   repository split, provider posture, and validation plan.
2. Commit and push the central branch; initialize `linkage.md` with the central
   pin, component dispatch, acceptance assignment, and residual gaps.
3. Create one component-local OpenSpec change on a registered mobile branch,
   citing the central pin and implementing the approved behavior in bounded
   batches.
4. Run deterministic checks and the permitted Android build/acceptance path;
   return the component archive and integrated revision to the central ledger.
5. Perform central Verify, then deliver implementation, Sync, and Archive as
   separate evidenced lifecycle checkpoints.
6. Roll back before archive by reverting the component change and removing the
   new speech entry points/dependency while leaving Phase 1 manual records and
   schema compatible; after archive, use a new corrective change rather than
   rewriting history.

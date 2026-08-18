## Why

M1 Phase 1 proved that a synthetic sale or expense can be reviewed, confirmed,
and retained offline on the Android prototype. The next risk is whether a
speech-shaped synthetic suggestion can reuse that trusted flow without creating a
financial record automatically or making manual entry depend on speech.

## What Changes

- Define the M1 Phase 2 speech-assistance contract: a deterministic mocked
  transcript creates an editable sale proposal, and only explicit human
  confirmation creates the normal SQLite-backed local transaction.
- Require the speech flow to preserve the raw transcript and proposal metadata
  separately from confirmed transaction values, identify the source as speech,
  and reuse the existing local outbox/idempotency path after confirmation.
- Add the approved speech states: start/listening, review suggestion, edit,
  cancel, record again, unavailable/failure, and manual-sale fallback, using
  English/French keyed copy and synthetic HTG examples. The start/listening
  state must visibly disclose that this prototype uses a sample message and is
  not recording or transcribing the user.
- Add device text-to-speech for the review summary as optional assistance; TTS
  failure must leave visible review, editing, confirmation, and manual entry
  fully usable.
- Coordinate delivery through this central change and one component-local
  mobile OpenSpec change in `jizzoe/hrf-reinvest-to-grow-mobile-app`, with a
  pinned handoff, component return, and assigned synthetic Android acceptance
  evidence.
- Retain `prototype-rapid` with the bounded controller's
  `strict-first-degraded` policy. No isolated independent review is required by
  this prototype profile.

## Capabilities

### New Capabilities

- `prototype-speech-proposal-confirmation`: Defines the M1 Phase 2 synthetic speech-shaped proposal, human review/confirmation, device TTS, truthful fixture disclosure, accessible failure fallback, component-delivery linkage, and Android acceptance behavior.

### Modified Capabilities

None.

## Impact

- **Central planning repository:** owns this product contract, cross-repository
  plan, linkage ledger, returned-evidence aggregation, and system acceptance;
  it does not contain mobile implementation code.
- **Mobile component repository:** the existing temporary public
  `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app` repository owns
  Expo React Native/TypeScript source, local proposal/source persistence,
  device TTS integration, tests, Android build evidence, and its component-local
  OpenSpec lifecycle. Ownership must transfer to HRF before participant, pilot,
  or production use.
- **Providers and dependencies:** speech-to-text remains a deterministic mocked
  adapter/fixture for this slice; TTS uses the device path behind a replaceable
  boundary. No AWS, paid speech provider, backend, live synchronization,
  authentication, receipt/OCR, deployment, or production endpoint is added.
- **External writes:** Git branches and pull requests are limited to the
  selected central and mobile changes. Any new EAS build or artifact operation
  remains a just-in-time vendor-write gate and is not authorized by this
  proposal alone.
- **Data and safety:** all examples, tests, transcripts, screenshots, and
  device evidence use synthetic data. Speech and TTS never finalize, alter, or
  transmit a financial record without the existing explicit confirmation
  action.

Source basis: `AGENTS.md`, `docs/sdd-workflow.md`,
`docs/cross-repository-sdd-flow.md`, the accepted `v1-product-guardrails`,
`cross-repository-architecture`, `core-domain-model`, and
`prototype-manual-offline-transaction` specifications, plus
`ai-planning/design-briefs/m1-rapid-thin-slice-prototype.md`,
`m1-mobile-prototype-workflows.md`,
`m1-mobile-ui-design-brief-and-screen-inventory.md`, and the Phase 06 speech
research.

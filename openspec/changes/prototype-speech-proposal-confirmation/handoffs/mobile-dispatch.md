# M1 Speech Proposal Confirmation Mobile Dispatch

Date: 2026-08-17

## Central Contract

- Central repository: `https://github.com/jizzoe/home-roots-reinvest-in-growth`
- Central branch: `chore/prototype-speech-proposal-confirmation`
- Central change: `prototype-speech-proposal-confirmation`
- Contract pin: `48cb1ad511a3d578c347889e5c78e8a967c16dab`
- Approved delta: `openspec/changes/prototype-speech-proposal-confirmation/specs/prototype-speech-proposal-confirmation/spec.md`
- Ledger: `openspec/changes/prototype-speech-proposal-confirmation/linkage.md`
- Approval: `openspec/changes/prototype-speech-proposal-confirmation/evidence/gate-1-approval.md`

## Component Boundary

- Component repository: `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app`
- Base: `main` at `8ac303e93f47baa52d27f0a4114d17fa8309cfaa`
- Approved branch: `feat/m1-speech-proposal-confirmation`
- Approved component change: `m1-speech-proposal-mobile`
- Profile: `prototype-rapid`; controller policy `strict-first-degraded`; no
  isolated independent review is required by this prototype profile.
- Gate 1 authorizes this exact component to run its complete repository-local
  Propose, Apply, Verify, delivery, Sync, Archive, and eligible cleanup
  lifecycle against the pinned contract.

## Required Outcome

- Present a visibly and semantically truthful deterministic prototype sample;
  do not claim to record or transcribe the user and do not request microphone
  permission.
- Map `I sold rice for 500 gourdes today` to an editable 500 HTG sale proposal
  while keeping the raw transcript, proposed values, fixture identity, source,
  and confirmed transaction values distinct.
- Reuse the existing manual draft, review, explicit confirmation, SQLite
  transaction, totals, stable identity, idempotency, and outbox path. Proposal,
  cancel, and record-again states must not create a transaction or outbox row.
- Add visible and accessibly named English/French speech, suggestion,
  read-aloud, edit, confirm, cancel, record-again, retry, and manual-fallback
  controls. Preserve a visible alternative to audio and prove reachability on
  the representative small Android screen at a documented enlarged-text
  setting.
- Add a narrow device-TTS adapter using the Expo SDK 57-compatible
  `expo-speech` version resolved by Expo. TTS failure, interruption, and screen
  exit must not alter or block proposal or financial state.
- Add a deterministic unavailable result with retry and `Enter sale yourself`
  fallback to the complete offline manual flow.

## Non-Goals And Safety

- Synthetic HTG examples only. Do not retain audio, participant data, real
  financial data, credentials, device identifiers, or sensitive logs.
- No live microphone or speech recognition, provider call, network request,
  backend, AWS, authentication, receipt/OCR, analytics, iOS/TestFlight,
  deployment, release, or production/pilot expansion.
- Device TTS is assistance, not confirmation and not a substitute for visible
  content or touch-operable controls.
- Any new EAS build or artifact operation is a separate vendor write and must
  stop at central task 3.1 for exact just-in-time approval.

## Component Validation And Evidence

The component change must name and run its trusted repository commands for:

- formatting, TypeScript type-check, and focused plus complete Jest coverage;
- proposal-before-save, edit/confirm, cancel, record-again, failure/manual
  fallback, restart persistence, outbox identity, source metadata, TTS
  non-mutation, locale resources, and accessibility semantics;
- Android/Expo configuration and an installable Android build when separately
  authorized;
- OpenSpec strict validation, dependency compatibility and audit, bounded
  secret-pattern review, changed-scope review, attribution, portability, and
  rollback/recovery review.

Component Verify must map every local task and every applicable central
requirement/scenario to current evidence. It must record failures, skipped
checks, warnings, and residual gaps without weakening the contract.

## Return Contract

Return to the central ledger:

- the component change identifier and archived path/revision;
- the exact verified topic revision, merged pull request, and integrated
  component `main` revision;
- the central pin above and an explicit no-divergence statement or a precise
  divergence that blocks acceptance pending a reviewed central amendment;
- deterministic command results, dependency/version and audit evidence,
  Android build evidence if authorized, and component verification references;
- remaining device acceptance work, warnings, and residual gaps.

## Recovery

Resume from the central pin, this handoff, the component controller, Git,
current component OpenSpec status, and the first incomplete evidenced task.
Preserve the user-owned `.idea/` directory. Before component Archive, rollback
may revert only the registered speech branch/change, remove the new speech
entry points and dependency, and retain the Phase 1 manual path and compatible
stored records. After Archive, use a new corrective change rather than
rewriting history.

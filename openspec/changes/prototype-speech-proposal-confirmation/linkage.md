# M1 Speech Proposal Confirmation Linkage Ledger

## Collaboration Profile

- Profile: `solo`.
- Owner: Joe Rice, selected 2026-08-17 before resuming the component lifecycle.
- Operating rule: Joe may operate the central-coordinator and mobile
  component-implementer roles, but each role retains its own change, controller
  state, evidence, and lifecycle gates. The component role consumes this
  durable dispatch; it does not inherit a blanket component mutation grant from
  the central role.
- Contract impact: coordination-only; this profile record changes no approved
  behavioral delta, component requirement, or contract pin.

## Contract Pin

- Central repository: `https://github.com/jizzoe/home-roots-reinvest-in-growth`
- Central branch: `chore/prototype-speech-proposal-confirmation`
- Central change: `prototype-speech-proposal-confirmation`
- Approved delta: `openspec/changes/prototype-speech-proposal-confirmation/specs/prototype-speech-proposal-confirmation/spec.md`
- Pinned approved revision: `48cb1ad511a3d578c347889e5c78e8a967c16dab`
- Pin status: committed and pushed after Gate 1 approval; the dispatch record
  was then pushed in revision `6c7bf96472618300b93be4b8093f59a9b2611a4e`.

## Dispatch

| Date | Component repository | Component base | Component branch and change | Handoff record | Status |
| --- | --- | --- | --- | --- | --- |
| 2026-08-17 | `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app` | `main` at `8ac303e93f47baa52d27f0a4114d17fa8309cfaa` | `feat/m1-speech-proposal-confirmation`; `m1-speech-proposal-mobile` | `handoffs/mobile-dispatch.md` at `6c7bf96472618300b93be4b8093f59a9b2611a4e` | Gate 1 approved the component's full local OpenSpec lifecycle for the pinned contract; the dispatch is committed and pushed. |

## Returns

| Date | Component change and archived revision | Integrated component revision | Validation and acceptance evidence | Contract relationship |
| --- | --- | --- | --- | --- |
| Pending | `m1-speech-proposal-mobile` | Pending | Pending component Verify, Android build evidence, and return record | Must cite pin `48cb1ad511a3d578c347889e5c78e8a967c16dab`; any divergence requires a reviewed central amendment and new pin. |

## End-to-End Verification

- Assigned executor: Joe Rice.
- Evidence location: `ai-planning/evidence/m1-speech-proposal-e2e.md`.
- Required environment: representative Android 15 device, synthetic data,
  installable Android build from the exact returned component revision, device
  offline for the no-provider path, and no live backend or speech provider.
- EAS boundary: any new build or artifact operation requires the separate
  just-in-time approval in task 3.1; this dispatch does not authorize it.
- Status: pending component return, authorized build availability, and assigned
  device execution.

## Residual Gaps

- Real microphone capture and speech recognition, live or cloud speech/AI,
  backend sync, AWS, authentication, receipt/OCR, analytics, iOS/TestFlight,
  deployment, and production or pilot use remain outside this slice.
- The deterministic English transcript tests the proposal interaction, not
  recognition or Haitian Creole language quality.
- Device TTS and enlarged-text reachability require returned Android evidence;
  deterministic component tests alone cannot close those scenarios.
- The temporary mobile repository and any EAS project must transfer to Home
  Roots Foundation before participant, pilot, or production use.

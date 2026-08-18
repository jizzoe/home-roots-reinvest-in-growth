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
| 2026-08-18 | `m1-speech-proposal-mobile` archived at `openspec/changes/archive/2026-08-18-m1-speech-proposal-mobile/` in `5f3a352d7cdfc5234b803d4609c74265d48583fd`, delivered by component PR [#4](https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app/pull/4) merge `6dfc4ad79af8310dcc36d3617578878275215a68` | Application implementation delivered by component PR [#2](https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app/pull/2) merge `b41812f4b4aead7f26c03323392f8df00b84380c`; living-spec Sync delivered by PR [#3](https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app/pull/3) merge `fe727d70c37549aa7833fc67eae701c4dfd6688f` | Formal Verify at `9aa9d783d8fd033b629ef6588c29761618b22c77`: `npm run check` passed (6 suites, 23 tests); Android config and selected/all strict OpenSpec passed; `expo-speech@57.0.1` MIT; 37 inherited no-fix audit advisories (0 critical); no EAS, APK, install, device-TTS, or enlarged-text acceptance claim | Built against pin `48cb1ad511a3d578c347889e5c78e8a967c16dab`; no approved-contract divergence. Real build/device acceptance remains central tasks 3.1-3.2; registered component cleanup remains pending eligibility review. |

## End-to-End Verification

- Assigned executor: Joe Rice.
- Evidence location: `ai-planning/evidence/m1-speech-proposal-e2e.md`.
- Required environment: representative Android 15 device, synthetic data,
  installable Android build from the exact returned component revision, device
  offline for the no-provider path, and no live backend or speech provider.
- EAS boundary: any new build or artifact operation requires the separate
  just-in-time approval in task 3.1; this dispatch does not authorize it.
- Status: passed 2026-08-18. Joe Rice installed and tested the returned APK
  from EAS build `6dd64511-469e-4cca-b1a0-0aa4e11d8b0d` on the representative
  Android 15 device using synthetic data. The result is recorded at
  `ai-planning/evidence/m1-speech-proposal-e2e.md`.

## Residual Gaps

- Real microphone capture and speech recognition, live or cloud speech/AI,
  backend sync, AWS, authentication, receipt/OCR, analytics, iOS/TestFlight,
  deployment, and production or pilot use remain outside this slice.
- The deterministic English transcript tests the proposal interaction, not
  recognition or Haitian Creole language quality.
- Device TTS and enlarged-text reachability are closed by the returned Android
  evidence: live device TTS was audible, and the speech flow plus its failure
  fallback remained reachable at Font size 200% and Display size Largest.
- The temporary mobile repository and any EAS project must transfer to Home
  Roots Foundation before participant, pilot, or production use.
- The mobile component's registered-workspace cleanup remains ineligible: the
  installed cleanup skill is missing its required script asset. The component
  archive, integrated revision, deterministic validation, and Android system
  acceptance remain durable and unaffected; no substitute cleanup was claimed.

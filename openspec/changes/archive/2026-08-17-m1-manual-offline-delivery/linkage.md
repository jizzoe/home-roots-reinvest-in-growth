# M1 Manual Offline Delivery Linkage Ledger

## Contract Pin

- Central repository: `https://github.com/jizzoe/home-roots-reinvest-in-growth`
- Central change: `m1-manual-offline-delivery`
- Accepted contract: `openspec/specs/prototype-manual-offline-transaction/spec.md`
- Pinned central envelope revision: `bd55571688818a47746dae673c35d7f2a125b77e`
- Pin status: committed on `chore/m1-manual-offline-delivery` and dispatched in pushed revision `e57e95da98423d571c5bf762f81c1c838d740a5c`.

## Dispatch

| Date       | Component repository                                        | Component branch                  | Handoff record                                                              | Status                                                                                                                          |
| ---------- | ----------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-16 | `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app` | `feat/m1-manual-offline-delivery` | `handoffs/mobile-dispatch.md` at `e57e95da98423d571c5bf762f81c1c838d740a5c` | Approved for one component-local OpenSpec proposal; implementation follows that component proposal and its Apply authorization. |

## Returns

| Date       | Component change and archived revision                                                                                                                   | Integrated component revision                                  | Validation and acceptance evidence                                                                                                                                                                                              | Contract relationship                                                                                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-08-17 | `m1-manual-offline-mobile`, archived at `9f8295bdae2bccd4bc0a76256a5b80681b13198f` under `openspec/changes/archive/2026-08-17-m1-manual-offline-mobile/` | `main` merge commit `8ac303e93f47baa52d27f0a4114d17fa8309cfaa` | Component format/type/Jest/Android-config/OpenSpec checks passed; EAS build `db6deffa-27f5-43d3-8f1b-9a25fc26678b` from exact source `7466c401e45db91b917e5fda310fde4524ccb1bf`; synthetic Android 15 device acceptance passed. | The component records the central pin `bd55571688818a47746dae673c35d7f2a125b77e`. No contract divergence: the Home-first correction and official temporary logo were owner-approved visual fidelity work within Phase 1. |

## End-to-End Verification

- Assigned executor: Joe Rice.
- Central evidence record: `ai-planning/evidence/m1-manual-offline-e2e.md`.
- Required environment: synthetic data, U656AC on Android 15, EAS internal-distribution signed APK, and authorized prototype testers only.
- Status: passed on the returned internal-distribution APK. See
  `ai-planning/evidence/m1-manual-offline-e2e.md` and the component acceptance
  and verification records.

## Residual Gaps

- iOS/TestFlight, live backend synchronization, AWS, other cloud providers,
  speech, and receipt/OCR remain outside this completed Phase-1 slice.
- Expo now recommends patch release `57.0.14`, while the accepted signed APK is
  pinned to and tested on `57.0.13`; update through a separately approved
  dependency/change/build cycle.
- Upstream npm audit advisories remain deferred; no automatic dependency update
  was applied.
- The temporary mobile repository and EAS project must transfer to HRF before
  participant, pilot, or production use.
- The public mobile repository contains a user-authored APK binary. Future
  distribution policy should explicitly decide whether such binaries remain in
  GitHub or are retained only through the authorized EAS artifact path.

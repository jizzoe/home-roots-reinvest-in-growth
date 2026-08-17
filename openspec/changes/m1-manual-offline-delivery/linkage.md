# M1 Manual Offline Delivery Linkage Ledger

## Contract Pin

- Central repository: `https://github.com/jizzoe/home-roots-reinvest-in-growth`
- Central change: `m1-manual-offline-delivery`
- Accepted contract: `openspec/specs/prototype-manual-offline-transaction/spec.md`
- Pinned central envelope revision: `bd55571688818a47746dae673c35d7f2a125b77e`
- Pin status: committed on `chore/m1-manual-offline-delivery`; push evidence is recorded with the Gate-1 dispatch update.

## Dispatch

| Date | Component repository | Component branch | Handoff record | Status |
| --- | --- | --- | --- | --- |
| 2026-08-16 | `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app` | `feat/m1-manual-offline-delivery` | `handoffs/mobile-dispatch.md` | Approved for one component-local OpenSpec proposal; implementation follows that component proposal and its Apply authorization. |

## Returns

No component return yet. Required return content: component archive revision and change identifier, deterministic validation evidence, central contract pin, and a divergence statement.

## End-to-End Verification

- Assigned executor: Joe Rice.
- Central evidence record: `ai-planning/evidence/m1-manual-offline-e2e.md`.
- Required environment: synthetic data, U656AC on Android 15, EAS internal-distribution signed APK, and authorized prototype testers only.
- Status: pending component build and physical-device run.

## Residual Gaps

- The component-local change, mobile implementation, EAS project/build, automated checks, and returned component evidence do not yet exist.
- Physical-device acceptance is pending a returned signed APK; iOS/TestFlight is explicitly out of scope.
- AWS and other cloud providers remain excluded. Before participant, pilot, or production use, the temporary mobile repository and the EAS project must transfer to HRF.

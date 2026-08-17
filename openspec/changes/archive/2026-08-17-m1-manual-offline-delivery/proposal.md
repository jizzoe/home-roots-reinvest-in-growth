## Why

The archived `prototype-manual-offline-transaction` change established M1's accepted planning contract, but it explicitly did not create or implement the mobile component. A distinct central delivery envelope is needed so the first M1 slice can coordinate one component-local implementation change, durable linkage, and system-level verification without treating the earlier planning archive as completed product delivery.

## What Changes

- Create the cross-repository delivery envelope for M1's manual offline transaction slice, retaining the archived `prototype-manual-offline-transaction` change and accepted living specification as the product contract.
- Establish the central-to-component split: this planning repository owns the contract, linkage ledger, component-return aggregation, and system acceptance; the future Expo React Native component repository owns all source code, builds, tests, device evidence, and component-local OpenSpec lifecycle work.
- Revise the M1 plan's completion mapping so `prototype-manual-offline-transaction` is recognized as an archived planning contract and `m1-manual-offline-delivery` is the implementation envelope that can close the first M1 slice.
- Require a linkage ledger at `openspec/changes/m1-manual-offline-delivery/linkage.md` before dispatch, with central revision history, component dispatch/return status, end-to-end evidence, and residual gaps.
- Use `prototype-rapid` for the component implementation and central close-out. The bounded controller records `strict-first-degraded`; this profile does not require an isolated independent reviewer.

The participating repositories are this central planning root and the public temporary mobile repository `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app`, checked out at `/Users/joerice/git/joericearchitect/hrf-reinvest-in-growth/hrf-reinvest-to-grow-mobile-app`. Ownership must transfer to HRF before any participant, production, or pilot use.

The end-to-end verification executor is Joe Rice. The intended environment is a synthetic-data EAS internal-distribution Android APK assembled from the returned component revision; the central evidence record will be `ai-planning/evidence/m1-manual-offline-e2e.md`. The representative device is a U656AC on Android 15. iOS/TestFlight is explicitly deferred to a later approved gate.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `prototype-manual-offline-transaction`: permit its accepted planning contract to be delivered only through a distinct central envelope and one explicit component-local implementation change, with durable linkage and system acceptance evidence.

## Impact

- **Central repository:** OpenSpec planning artifacts, the M1 roadmap's completion mapping, linkage ledger, and central acceptance evidence only; no application code is added here.
- **Mobile component repository:** Expo React Native/TypeScript implementation, local SQLite/local-file behavior, tests, signed Android APK build, device checks, and component-local OpenSpec change. No component mutation begins until its repository is resolvable and the central plan gate is approved.
- **External systems:** GitHub repository creation and EAS project/build setup are approved for this bounded run. The EAS free plan manages the Android signing key and publishes the signed APK through an artifact link shared only with authorized prototype testers. Apple/TestFlight, AWS, all other cloud providers, deployment, real data, and paid services are excluded.
- **Data and privacy:** all fixtures, device checks, and evidence remain synthetic; no financial, participant, personal, credential, or production data is permitted.

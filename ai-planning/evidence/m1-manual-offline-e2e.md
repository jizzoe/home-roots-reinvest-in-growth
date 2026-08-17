# M1 Manual Offline End-to-End Acceptance Record

Status: Passed — component return and assigned physical-device run complete.

## Approved Test Environment

- Executor: Joe Rice.
- Device class: representative U656AC running Android 15.
- Application identifier: `org.homerootsfoundation.reinvesttogrow`.
- Data: synthetic HTG examples only; English and French resource coverage.
- Delivery: EAS internal-distribution signed Android APK, with EAS-managed Android signing.
- Distribution: private artifact link shared only with authorized prototype testers.
- Excluded: iOS/TestFlight, AWS, other cloud providers, participant data, and production use.

## Returned Component Evidence

- Component change: `m1-manual-offline-mobile`, archived at
  `9f8295bdae2bccd4bc0a76256a5b80681b13198f`.
- Component integration: `jizzoe/hrf-reinvest-to-grow-mobile-app` `main` merge
  commit `8ac303e93f47baa52d27f0a4114d17fa8309cfaa`.
- APK: EAS internal-distribution build
  `db6deffa-27f5-43d3-8f1b-9a25fc26678b`, version `1.0.1` / Android build
  version `2`, from exact source
  `7466c401e45db91b917e5fda310fde4524ccb1bf`.
- Deterministic checks: formatting, TypeScript, three Jest suites/six tests,
  Android config, component OpenSpec validation, and living-spec validation
  passed. The component report records the dynamic Expo patch-version warning
  and deferred npm audit advisories.
- Component evidence locations: `docs/implementation-evidence/m1-manual-offline-mobile-device-acceptance.md` and
  `docs/implementation-evidence/m1-manual-offline-mobile-verification.md` in
  the mobile repository.

## Physical-Device Run

Joe Rice completed the required synthetic-data acceptance run on the approved
Android 15 device:

1. The replacement APK installed and opened with the Home-first flow and
   official temporary Home Roots Foundation logo.
2. In airplane mode, one synthetic sale and one synthetic expense were entered,
   reviewed, confirmed, and saved locally.
3. Local activity and totals updated after confirmation.
4. After force-close/reopen, all synthetic transactions remained present.
5. French was selected and all observed labels displayed in French.

Automated component tests additionally cover cancellation, required-field
validation, duplicate prevention, and stable local outbox identities. No
screenshot, device identifier, account token, participant data, or real
financial data is retained in this evidence.

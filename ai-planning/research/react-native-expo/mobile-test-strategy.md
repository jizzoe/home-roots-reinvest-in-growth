# Mobile Test Strategy: Unit, Component, and E2E Testing for Expo/React Native

Research date: 2026-09-04
Scope: How unit, component, and end-to-end (E2E) testing should fit into the Expo/React Native TypeScript mobile app and into the GitHub Actions → EAS Build pipeline already documented in `expo-react-native-build-and-distribution.md`, which lists "unit tests" and "component/screen tests" as CI line items without detail. This document fills that gap.

## Decision Summary

- **Unit and component tests**: Jest with the `jest-expo` preset, plus React Native Testing Library (RNTL) for component tests. This is Expo's current documented default, and RNTL explicitly replaces the older `react-test-renderer`-based approach.
- **E2E / device automation**: **Maestro** is Expo's only first-party-integrated E2E tool — it has dedicated EAS Workflows documentation, a documented `.maestro/` YAML flow format, and purpose-built `eas.json` build profiles. **Detox** is still actively maintained upstream by Wix but has no Expo/EAS first-party integration path found in current docs; treat it as a fallback for teams that specifically need its gray-box (in-process) approach, not as the default for this project.
- Expo's own unit-testing documentation explicitly steers teams **away from snapshot testing and toward E2E** as the higher-value investment — a notable and current strategic signal worth following here.
- **Pipeline placement**: unit/component tests are pure JavaScript and need no native build — run them as a fast GitHub Actions PR check. E2E tests need an actual app binary, so they run *after* an EAS build step, either inside an EAS Workflow (`build` job → `maestro` job) or via GitHub Actions calling `eas build` and then driving Maestro against the resulting artifact.
- E2E run against the iOS Simulator inherits all of the Simulator's hardware limitations documented in `ios-debugging-and-simulator.md` (no camera, no real push notifications, no true motion sensors) — Face ID/Touch ID flows are a notable exception that *can* be exercised in Simulator-based E2E.

## Unit and Component Testing

Per [Unit testing with Jest — Expo Documentation](https://docs.expo.dev/develop/unit-testing/):

```bash
npx expo install jest-expo jest @types/jest --dev
npx expo install @testing-library/react-native --dev
```

`package.json`:

```json
{
  "scripts": { "test": "jest --watchAll" },
  "jest": { "preset": "jest-expo" }
}
```

`tsconfig.json`: add `"jest"` to the `types` array so test globals type-check.

Notes:

- `jest-expo` "mocks the native part of the Expo SDK and handles most of the configuration required" — it is the supported default, not a third-party workaround.
- React Native Testing Library (`@testing-library/react-native`) is the documented component-testing companion and **explicitly replaces the deprecated `react-test-renderer` approach**.
- The same Expo doc page recommends E2E tests over snapshot unit tests as the better investment for UI-behavior coverage — plan the test pyramid accordingly rather than defaulting to heavy snapshot coverage.
- The doc makes no mention of Detox at all, reinforcing that Expo's documented testing story is Jest/RNTL + Maestro, not Jest + Detox.

## End-to-End / Device Automation

### Maestro (recommended default)

Per [Run E2E tests on EAS Workflows with Maestro — Expo Documentation](https://docs.expo.dev/eas/workflows/examples/e2e-tests/) and the [E2E tests tutorial](https://docs.expo.dev/tutorial/cicd/e2e-tests/):

- Test flows live under a `.maestro/` directory as YAML: an `appId`, then steps like `launchApp` and `assertVisible`.
- A dedicated `eas.json` build profile (for example `e2e-test`) produces platform-specific test artifacts: an Android `.apk`, or for iOS an `.app` built for the Simulator via `"ios": { "simulator": true }` in that profile.
- An EAS Workflow YAML (under `.eas/workflows/`) chains a `build` job into a `maestro` job, which takes the resulting `build_id` and a `flow_path`.
- Execution happens on **EAS-hosted emulators/simulators**, not physical devices, for this base integration.
- Triggers: `on.pull_request` (or `on.pull_request_labeled`) for automatic PR-triggered runs, or manual via `eas workflow:run`.
- **Resolved**: Expo's EAS Workflows introduction page was re-checked directly and carries **no alpha/beta/experimental/preview label** anywhere near its two mentions of Maestro — it is listed as one of the standard "pre-packaged jobs" (build, submit, update, Maestro E2E tests, Slack messages) alongside a "when to use EAS Workflows" table that lists "Run E2E tests with Maestro as part of CI" as a supported scenario with no caveat. Treat Maestro-on-EAS-Workflows as a documented, current part of Expo's offering. Source: [Introduction to EAS Workflows — Expo Documentation](https://docs.expo.dev/eas/workflows/introduction/) (directly re-fetched, primary).

### Maestro Cloud (managed device farm)

A separate, newer integration ([Expo now supports Maestro Cloud testing in your CI workflow — Expo blog, 2025-12-15](https://expo.dev/blog/expo-now-supports-maestro-cloud-testing-in-your-ci-workflow)): a `maestro-cloud` job type in EAS Workflows pushes the build and test flows to Maestro's own managed device farm for parallel execution across real device/OS combinations, with a results dashboard — contrasted with the free, EAS-infrastructure-only Maestro integration above.

**Resolved — iOS parity confirmed.** Maestro's own docs explicitly cover iOS device/OS configuration for Cloud runs: "For iOS, you can configure both the runtime version and the device model," via `maestro cloud --device-os "<DEVICE_OS>" --device-model "<DEVICE_MODEL>"`, with `maestro list-cloud-devices --platform=ios` enumerating the current supported iOS models/versions. A recent Maestro CLI changelog entry specifically announced iOS 26 support and an expanded iOS device catalog (iPhone 13 Mini, iPhone 16 Pro Max added). This is real-device farm execution, not simulator-only. Sources: [Configure the OS — Maestro Cloud docs](https://docs.maestro.dev/maestro-cloud/environment-configuration/configure-the-os) (primary, directly re-fetched); [CLI 2.4.0: iOS 26 and more devices on Maestro Cloud — maestro.dev blog](https://maestro.dev/blog/maestro-cli-2-4-0) (primary/vendor blog); secondary corroboration: [Maestro Real iOS Device Testing: Setup and Best Practices — Bird Eats Bug](https://birdeatsbug.com/blog/maestro-real-ios-device-support), [Complete Guide to Maestro Testing on Real iOS Devices — Requestly](https://requestly.com/blog/maestro-testing-on-real-ios-devices/).

### Detox (viable alternative, not the default)

- Actively maintained by Wix; GitHub repo shows current-year issue activity, with a community-inferred (not officially published) support window around RN 0.77.x–0.84.x with New Architecture compatibility. [wix/Detox on GitHub](https://github.com/wix/Detox).
- Uses a **gray-box** approach — it integrates with the app's internals for synchronization — versus Maestro's **black-box** approach, which drives the app externally via its accessibility tree and includes automatic retries. A vendor comparison (Maestro's own site, so treat the numbers as vendor-supplied rather than independently verified) reports lower flakiness for Maestro; regardless of the exact numbers, the structural difference (in-process vs. external driving) is the real decision factor. [Detox vs. Maestro — maestro.dev](https://maestro.dev/insights/detox-vs-maestro-reducing-flakiness-react-native).
- No Expo-documented "Detox + EAS Workflows" first-party path was found — adopting Detox here would mean wiring custom CI glue rather than using Expo's built-in pipeline. Reasonable to hold in reserve for a future need (e.g., asserting on internal app/Redux state that Maestro's black-box model can't see), not to start with.

## CI Pipeline Placement

Layering, built on top of the GitHub Actions → EAS Build pipeline already documented in `expo-react-native-build-and-distribution.md`:

1. **Pull request**: GitHub Actions runs TypeScript type-checking, ESLint, and Jest (`jest-expo` + RNTL) unit/component tests. No EAS build is required — this is pure Node/JS and should stay fast.
2. **Merge to main / release candidate**: after an EAS Build (development or preview profile, or a dedicated `e2e-test` profile) produces a Simulator-installable `.app` (or Android `.apk`), run Maestro flows against that artifact. Expo presents two equivalent shapes for this:
   - An **EAS Workflow** that chains a `build` job into a `maestro` (or `maestro-cloud`) job in one YAML file — Expo's more integrated option, avoiding separate CI glue.
   - A **GitHub Actions workflow** that calls `eas build`, waits for the artifact, then drives the Maestro CLI against it directly — seen in community write-ups such as [Taking Maestro to the Cloud with Expo EAS & GitHub Actions — maestro.dev blog](https://maestro.dev/blog/pokedex-ui-testing-series-taking-maestro-to-the-cloud-with-expo-eas-github-actions-part-3).
3. EAS Workflows supports triggering on GitHub push, pull request (including by label), branch/tag deletion, a cron schedule, App Store Connect events, manual `eas workflow:run`, or the REST API — any workflow can also always be run manually regardless of its configured trigger. Source: [Introduction to EAS Workflows — Expo Documentation](https://docs.expo.dev/eas/workflows/introduction/).

## Simulator vs. Physical Device for E2E

The same hardware gaps documented in `ios-debugging-and-simulator.md` apply directly to Simulator-run E2E flows:

- **Cannot be exercised** in a Simulator-based Maestro/Detox run: live camera capture, true accelerometer/gyroscope/barometer input, microphone input, a real end-to-end push-notification round-trip, and realistic background-task timing.
- **Can be exercised** in Simulator: Face ID/Touch ID success and failure paths, via the Simulator's built-in biometric simulation menu — one of the few hardware-adjacent flows that doesn't require a physical device for E2E coverage.
- Any release gate that must cover camera, push, or background-sync behavior needs at least one physical-device test pass; it cannot be fully satisfied by Simulator-only E2E.

## Follow-Up Research: Resolved and Remaining Open Items

A targeted second pass (2026-09-04) resolved both open items from the first pass:

- **Resolved** — the `maestro` job type carries no alpha/beta/experimental label on Expo's current EAS Workflows docs; it's presented as a standard, documented job type.
- **Resolved** — Maestro Cloud has confirmed, documented iOS device-farm support (real devices, not just Android), verified directly against Maestro's own docs and a recent CLI changelog.
- **Still open, and a team decision rather than a research gap**: whether PR-time E2E (via the `pull_request` trigger) is fast/affordable enough given EAS build time, or whether E2E should run only post-merge. Decide this once real build/test timings are observed on this project.

## Sources

- [Unit testing with Jest — Expo Documentation](https://docs.expo.dev/develop/unit-testing/)
- [Run E2E tests on EAS Workflows with Maestro — Expo Documentation](https://docs.expo.dev/eas/workflows/examples/e2e-tests/)
- [E2E tests tutorial — Expo Documentation](https://docs.expo.dev/tutorial/cicd/e2e-tests/)
- [Introduction to EAS Workflows — Expo Documentation](https://docs.expo.dev/eas/workflows/introduction/)
- [Expo now supports Maestro Cloud testing in your CI workflow — Expo blog](https://expo.dev/blog/expo-now-supports-maestro-cloud-testing-in-your-ci-workflow)
- [wix/Detox — GitHub](https://github.com/wix/Detox)
- [Detox vs. Maestro: Reducing Flakiness in React Native — maestro.dev](https://maestro.dev/insights/detox-vs-maestro-reducing-flakiness-react-native)
- [Pokedex UI Testing Series — Taking Maestro to the Cloud with Expo EAS & GitHub Actions, Part 3 — maestro.dev blog](https://maestro.dev/blog/pokedex-ui-testing-series-taking-maestro-to-the-cloud-with-expo-eas-github-actions-part-3)
- [Configure the OS — Maestro Cloud docs](https://docs.maestro.dev/maestro-cloud/environment-configuration/configure-the-os)
- [CLI 2.4.0: iOS 26 and more devices on Maestro Cloud — maestro.dev blog](https://maestro.dev/blog/maestro-cli-2-4-0)
- [Maestro Real iOS Device Testing: Setup and Best Practices — Bird Eats Bug](https://birdeatsbug.com/blog/maestro-real-ios-device-support)
- [Complete Guide to Maestro Testing on Real iOS Devices — Requestly](https://requestly.com/blog/maestro-testing-on-real-ios-devices/)
- Related: `ios-debugging-and-simulator.md` (this repo) for Simulator hardware-limitation detail referenced above.

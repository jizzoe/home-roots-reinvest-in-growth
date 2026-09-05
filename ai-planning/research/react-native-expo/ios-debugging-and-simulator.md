# iOS Physical-Device Debugging and Simulator Research

Research date: 2026-09-04
Scope: Debugging an Expo/React Native app on a physical iPhone during development, retrieving and symbolicating crashes, and iOS Simulator mechanics and limitations on macOS. This fills gaps left by `expo-react-native-build-and-distribution.md`, which covers the build/ship pipeline but not day-to-day device debugging.

## Decision Summary

- Use **React Native DevTools** for JavaScript debugging. It ships built into React Native (from 0.76 onward) and Expo with zero setup; it works against both Expo Go and development builds. **Flipper is deprecated and removed from React Native's core/templates** (since 0.73/0.74) — do not build a workflow around it, and the standalone "React Native Debugger" app is dead for the same reason.
- Use **Xcode's Devices and Simulators window** (Shift+Cmd+2 → Open Console) to stream native logs from a physical iPhone. There is no Expo-specific tool for this; it is the same path any iOS developer uses.
- Native crash symbolication needs a matching **dSYM**. EAS Build does **not** upload dSYMs by default — it must be opted into via `buildArtifactPaths` in `eas.json`. **Sentry is Expo's documented, first-party-supported path** for crash reporting and source-map/dSYM handling; EAS Build uploads Sentry source maps automatically, EAS Update (OTA) does not and needs a manual `sentry-expo-upload-sourcemaps` step.
- Debugging on a physical iPhone requires **Developer Mode** enabled on-device (iOS 16+) and USB trust, regardless of Apple account tier. A **free Apple ID** can install and debug your own app on your own device, but with a 7-day provisioning-profile expiry and a 3-device cap; a **paid Apple Developer Program membership ($99/yr)** is required for TestFlight, App Store distribution, and unlimited/non-expiring device provisioning.
- The **iOS Simulator** is the right tool for fast JS iteration and for Face ID/Touch ID, Photos, and Contacts flows. It is the **wrong** tool for camera capture, motion sensors, microphone input, and background-task timing — those require a physical device. Remote push notifications are a partial exception: on an Apple Silicon (or T2) Mac running macOS 13+ with Xcode 14+, the Simulator can receive genuine remote pushes with a real device token via Apple's APNs Sandbox, but silent/background pushes remain unreliable there just as they are on real devices in the field.
- As of this research date, the current **stable** toolchain is Xcode 26.6; Xcode 27 (still in beta) introduces a new "Device Hub" app that will eventually replace Simulator.app and unify `devicectl` across physical devices and simulators — none of that is production-ready yet, so this document describes the current stable (Xcode 26.x) workflow.

## JavaScript Debugging: React Native DevTools, Not Flipper

| Tool | Status | Notes |
| --- | --- | --- |
| Flipper (RN core integration) | Deprecated/removed | Removed from new-app templates starting RN 0.74; deprecation began in 0.73. Still exists as a standalone product if manually re-added, but is not the supported default. [React Native 0.73 — Debugging Improvements](https://reactnative.dev/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks); [RFC 0641 — Decoupling Flipper from React Native Core](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0641-decoupling-flipper-from-react-native-core.md) |
| React Native DevTools | Current default | Built in since RN 0.76, zero configuration, modeled on Chrome DevTools. Network and Performance panels were added in RN 0.83. Scoped to React/JS-level debugging — for native-module-level work it explicitly defers to Xcode/Android Studio. [React Native DevTools](https://reactnative.dev/docs/react-native-devtools); [RN 0.76 release notes](https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture) |
| Standalone "React Native Debugger" app | Dead | Depended on Remote JS Debugging, removed in RN 0.73. |

How to open it, per Expo's own docs:

- Press **J** in the terminal running `npx expo start`.
- Or open the Dev Menu — **M** in the terminal, shake gesture on a physical device, Ctrl+Cmd+Z or Cmd+D on iOS Simulator, Cmd+M/Ctrl+M on Android — then choose "Open DevTools" / "Open JS Debugger."
- Works in **both Expo Go and development-client builds**. The Network tab specifically requires `expo-dev-client` or Expo Go — it is not available in a release/production build without extra instrumentation (see Sentry, below).

Source: [Debugging tools — Expo Documentation](https://docs.expo.dev/debugging/tools/).

## Physical Device Setup Requirements

- **Developer Mode (iOS 16+)** must be enabled manually before an Xcode-installed (locally built or EAS development-build) app will launch. Two equivalent paths:
  - On-device: install the build → tap the icon → dismiss the alert → Settings → Privacy & Security → Developer Mode → toggle on → restart → unlock → confirm with passcode.
  - Via Mac: connect over USB → tap "Trust This Computer" on the phone → Xcode → Window → Devices and Simulators → same on-device toggle.
  - This does **not** apply to enterprise-provisioned builds or to the Simulator.
  - Source: [iOS Developer Mode — Expo Documentation](https://docs.expo.dev/guides/ios-developer-mode/).
- **USB trust**: standard "Trust This Computer?" prompt requiring the device passcode before Xcode can see the device at all.
- **Wireless debugging**: after one USB pairing, enable "Connect via Network" for the device in Xcode's Devices and Simulators window (Shift+Cmd+2), after which cable-free run/debug works over shared Wi-Fi. This is standard Xcode behavior, not something Expo's own docs call out directly — verify it still matches the current Xcode UI before relying on it in a written guide.
- **Free vs. paid Apple account**, per Apple's own comparison page ([Compare Membership Options — Apple Developer](https://developer.apple.com/support/compare-memberships/)):

| Capability | Free Apple ID (Personal Team) | Apple Developer Program ($99/yr) |
| --- | --- | --- |
| Install/debug on your own device via Xcode | Yes | Yes |
| Max registered devices | 3 | Unlimited |
| Provisioning profile expiry | 7 days (rebuild/reinstall required) | No expiration |
| TestFlight | No | Yes |
| App Store distribution | No | Yes |

- **Xcode version**: 16.1+ has been the general baseline for current Expo SDKs. Separately, **as of 2026-04-28 Apple requires Xcode 26+ (and its bundled iOS SDK) for any App Store Connect submission** — this is a submission-time rule, not a simulator-run requirement, but in practice means keeping Xcode current. Cite the 2026 post specifically; an older 2025-cycle Expo blog post about an Xcode 16/iOS 18 requirement covers the *previous* enforcement round and should not be confused with the current one. Sources: [App Store Connect minimum SDK requirements update (2026) — Expo blog](https://expo.dev/blog/app-store-connect-minimum-sdk-26); superseded: [Apple SDK minimum requirements (2025) — Expo blog](https://expo.dev/blog/apple-sdk-minimum-requirements).

## Streaming Native Logs From a Physical iPhone

- Xcode → **Window → Devices and Simulators** (Shift+Cmd+2) → select the connected device → **Open Console**. This is Expo's documented path for both simulator and physical-device log streaming, and remains the primary recommended path on the current stable Xcode (26.x). Source: [Debugging runtime issues — Expo Documentation](https://docs.expo.dev/debugging/runtime-issues/).
- `xcrun simctl` is **Simulator-only** ("sim" = Simulator); it does not apply to a physical device. `xcrun devicectl`, introduced in Xcode 15, is the modern CLI for physical-device management (`devicectl list devices`, and `devicectl device process launch --console <bundle-id>` to stream an app's console output to the terminal) — **but Apple has never published a dedicated reference/man page for it**; its authoritative syntax comes from `devicectl --help` at the terminal, not from a stable docs.apple.com page. Treat it as a scriptable supplement to Xcode's GUI console, not a documented replacement for it. Per WWDC 2026 ("Get the most out of Device Hub"), Xcode 27 (beta as of this research date) will extend `devicectl` to also manage simulators under a unified "Device Hub" interface, but several simulator-facing `devicectl` commands don't yet work even in that beta — `simctl` remains the correct tool for simulators until Device Hub ships stable. Sources: [Device Hub — Apple Developer Documentation](https://developer.apple.com/documentation/xcode/device-hub); [WWDC 2026: Device Hub and what it means for CI/CD — Bitrise blog](https://bitrise.io/blog/post/wwdc-2026-device-hub-and-what-it-means-for-ci-cd) (secondary, describes beta-state gaps).

## Crash Retrieval and Symbolication

| Build type | Live JS debugging | Crash/symbolication path |
| --- | --- | --- |
| Expo Go | Full React Native DevTools support | N/A (not used for release testing) |
| Development build | Full DevTools support, plus native debugging via Xcode/LLDB after `npx expo prebuild -p ios && xed ios` | Xcode Crashes Organizer for native crashes during local testing |
| Release / TestFlight / production build | None by design (`__DEV__` is false, JS is bundled/minified) | Xcode Crashes Organizer (`.ips` crash files) + dSYM matching; Sentry/Bugsnag for real-time capture; reproduce locally with `npx expo start --no-dev --minify` |

Key points:

- Apple crash reports are `.ips` (JSON-based) files, symbolicated against a matching **dSYM** for that exact build, typically inside Xcode Organizer.
- **EAS Build does not surface the dSYM by default.** `eas.json` supports a `buildArtifactPaths` field per build profile — Expo's own docs confirm it exists and that build artifacts are uploaded to a private cloud bucket "if `buildArtifactPaths` is specified in the build profile," but the page does not give a dSYM-specific worked example. Multiple independent community sources converge on the same glob for iOS:
  ```json
  {
    "build": {
      "production": {
        "ios": { "buildArtifactPaths": ["ios/build/*"] }
      }
    }
  }
  ```
  A known open issue reports this artifact not reliably appearing for **local** builds (`eas build --local` with `EAS_LOCAL_BUILD_ARTIFACTS_DIR` set) specifically — treat local-build dSYM retrieval as less reliable than a standard cloud EAS Build and verify against a real cloud build first. Sources: [iOS build process — Expo Documentation](https://docs.expo.dev/build-reference/ios-builds/) (confirms the field exists, primary); [How to obtain the .dSYM file for your EAS build — Zach Stumpf](https://medium.com/@zachstumpf/how-to-obtain-the-dsym-file-for-your-expo-application-services-eas-build-cd9eec261f9a) (community, worked example); [expo/eas-cli issue #2522 — artifacts not showing for local build](https://github.com/expo/eas-cli/issues/2522) (community/issue tracker, corroborates the local-build caveat).
- Hermes bytecode has its own JS-level symbolication behavior distinct from native dSYM matching, and has historically been inconsistent across React Native versions per open issues on the `facebook/react-native` repo. Treat this as something to verify empirically against the project's actual RN/Hermes version rather than assume works out of the box. Sources: [facebook/react-native #38176](https://github.com/facebook/react-native/issues/38176), [facebook/react-native #46853](https://github.com/facebook/react-native/issues/46853).
- **Sentry is Expo's documented first-party crash/symbolication path**, per [Using Sentry — Expo Documentation](https://docs.expo.dev/guides/using-sentry/):
  1. Create a Sentry project; gather org slug, project name, and DSN.
  2. Run `npx @sentry/wizard@latest -i reactNative` to wire dependencies, Metro config, and app init.
  3. For **EAS Build**: set `SENTRY_AUTH_TOKEN` as a sensitive build env var; source maps upload automatically — no extra step.
  4. For **EAS Update** (OTA JS-only updates): source maps do **not** upload automatically — run `npx sentry-expo-upload-sourcemaps dist` after `eas update`.
  5. Sentry can be linked to the Expo dashboard (Account settings → Connections) to view crash data alongside build data.

## iOS Simulator: Setup and Commands

Prerequisites, per [iOS Simulator — Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/):

1. Install Xcode from the Mac App Store.
2. Install Command Line Tools: Xcode → Settings (Cmd+,) → Locations → select the latest version.
3. Install a simulator runtime: Xcode → Settings → Components → Platform Support → iOS → Get.
4. Optional: `brew install watchman` for filesystem-monitoring performance.
5. The Simulator is macOS-exclusive — there is no equivalent for Windows/Linux; use a physical device or EAS cloud builds instead.

Three ways to get the app running in Simulator, and how they differ:

| Command | What it does | Requires |
| --- | --- | --- |
| `npx expo start` then press **i** | Launches the JS bundle into whatever build is already installed on the currently open simulator. Fastest loop, but JS-only — no native rebuild. | An already-installed build (Expo Go or a prior dev build) |
| `npx expo run:ios` | Runs `prebuild` (generates/refreshes the native `ios/` project if absent), compiles natively, installs on the simulator, and starts the dev server. A genuine local native build. | Full local Xcode toolchain |
| `eas build --profile <name> --platform ios` with `"ios": { "simulator": true }` in that `eas.json` profile | Produces a downloadable `.app` built on EAS's cloud infrastructure. Notably **does not require an Apple Developer account** for a simulator-only artifact. | An EAS account only; install the resulting `.app`, then run `npx expo start` separately to attach the dev server |

Source for the EAS simulator-profile behavior and exact `eas.json` shape: [Build for iOS Simulators — Expo Documentation](https://docs.expo.dev/build-reference/simulators/).

Choosing a specific simulated device/iOS version: press **Shift+I** in the Expo CLI to pick interactively, or open the Simulator app directly via **File → Open Simulator** and choose a device/iOS version there. Multiple simulators can run at once; the Expo CLI always targets the most recently opened one.

## What Does Not Work in the Simulator

| Feature | Works in Simulator? | Confidence |
| --- | --- | --- |
| Camera (live capture) | No | Primary — [Expo iOS Simulator docs](https://docs.expo.dev/workflow/ios-simulator/) |
| Accelerometer / gyroscope | No | Primary — same source |
| Barometer | No | Primary — same source |
| Microphone / audio input | No | Primary — same source |
| Background task real-world timing (`expo-background-task`, `expo-task-manager`) | Unreliable / not representative — Simulator suspends background apps/processes on iOS 11+ | Primary — same source |
| Remote push notifications — visible/alert pushes | Partial yes. Since Xcode 11.4, `xcrun simctl push` (or dragging a `.apns` payload file onto the simulator) injects a synthetic local payload with no server round-trip. Since **Xcode 14, on a Mac with Apple Silicon or a T2 chip running macOS 13+**, the Simulator generates a real, simulator-specific device token and can receive a genuine remote push over a real connection to Apple's APNs **Sandbox** environment (`api.sandbox.push.apple.com`) — a real end-to-end test, not just local injection. | Primary — Apple's own APNs registration documentation states the Simulator "supports remote notifications" under these conditions (confirmed via search-indexed content from `developer.apple.com/documentation/usernotifications/registering-your-app-with-apns`; the live page is JS-rendered and could not be fetched directly, so re-confirm by opening it in a browser before finalizing a guide), corroborated by multiple 2026-era developer write-ups (e.g. [Testing remote push notifications on iOS simulator — nilcoalescing.com](https://nilcoalescing.com/blog/TestingRemotePushOniOSSimulator/)) |
| Remote push notifications — silent/background pushes | Unreliable, but confirmed by Apple to be a general APNs throttling behavior, not a Simulator-only limitation: an Apple DTS engineer states silent pushes are "very heavily throttled" and may reach an app only "1-2 ... an hour," and that this matches real-device behavior "from device to device, and for the same device from day to another day." Still, test silent/background push and `expo-notifications` data-only payload handling on a physical device for realistic delivery timing. | Primary — official Apple engineer response on [Apple Developer Forums thread #795163](https://developer.apple.com/forums/thread/795163) |
| Face ID / Touch ID (`expo-local-authentication`) | Yes — Simulator supports simulated biometric enrollment and matching/non-matching authentication, requiring an iPhone 14+ (or later) simulated device. Apple's own tutorial covers this conceptually at [Testing Complex Hardware Device Scenarios in Simulator — Apple Developer Documentation](https://developer.apple.com/documentation/xcode/testing-complex-hardware-device-scenarios-in-simulator) (indexed via search; the live page returned 404/could not be directly fetched in this pass — re-open it in a browser to confirm current menu wording). Community sources disagree on the exact current menu name: most describe **Features → Face ID / Touch ID → Enrolled**, then **Matching Face/Touch** or **Non-matching**; at least one source instead names a **Hardware → Touch ID or Face ID** menu. Apple has renamed and reorganized Simulator menus across versions, so confirm the exact label against the installed Xcode version rather than assuming one name. | Primary doc exists but unconfirmed verbatim; secondary sources disagree on exact current menu name — verify against the installed Xcode before writing precise click-by-click steps |
| In-app purchases (StoreKit) | Nominally yes via a local StoreKit configuration file, but multiple 2026 Apple Developer Forum reports describe purchase flows returning `userCancelled` with no dialog, even in Apple's own sample app | Primary forum (user reports, not an official confirmed-bug statement) — [Apple Developer Forums thread #820991](https://developer.apple.com/forums/thread/820991) |
| Photos library / Contacts | Yes — import photos/videos/vCards via Simulator drag-and-drop or menus; only *live capture* is unavailable | Secondary, general Xcode Simulator knowledge |

## Follow-Up Research: Resolved and Remaining Open Items

A targeted second pass (2026-09-04) resolved most open items from the first pass:

- **Resolved** — `xcrun devicectl` has no dedicated Apple reference page; its authoritative usage comes from `devicectl --help`. It is Xcode 15+ and physical-device-only on the current stable Xcode (26.x); Xcode 27 (beta) will extend it to simulators via the new Device Hub, but that isn't stable yet.
- **Resolved, with a correction** — [Expo's push notifications FAQ](https://docs.expo.dev/push-notifications/faq/) was re-checked directly and contains **no mention of "simulator" or "emulator" anywhere on the page** — Expo has no documented position on this. The original claim that Simulator "can't do real push at all" was too strong: Apple's own APNs documentation confirms real remote-push delivery to Simulator is possible under specific hardware/OS/Xcode conditions (see the table above); only *silent* pushes remain unreliable, and that's a general APNs behavior, not Simulator-specific.
- **Resolved** — the `buildArtifactPaths: ["ios/build/*"]` glob is corroborated by multiple independent sources; a known `eas-cli` GitHub issue narrows the caveat specifically to local builds.
- **Partially resolved** — Simulator's Face ID/Touch ID menu location is described consistently by most sources as **Features → Face ID / Touch ID**, but not unanimously (one source names a **Hardware** menu instead), and Apple's own tutorial page on the topic could not be fetched directly to settle it. Confirm the exact current label by opening Xcode's Simulator and looking, rather than relying on a written source, since this is exactly the kind of UI label that drifts across Xcode versions.
- **New finding, not part of the original gap list**: the current **stable** Xcode is 26.6 (Xcode 27 remains in beta as of this research date). Xcode 27 introduces "Device Hub," a new app that will eventually replace Simulator.app and unify device/simulator management under `devicectl`. This is not yet relevant to a hands-on guide targeting stable tooling, but is worth a one-line "what's coming" note and a re-check once Device Hub ships stable.

## Sources

- [Debugging tools — Expo Documentation](https://docs.expo.dev/debugging/tools/)
- [Debugging runtime issues — Expo Documentation](https://docs.expo.dev/debugging/runtime-issues/)
- [iOS Developer Mode — Expo Documentation](https://docs.expo.dev/guides/ios-developer-mode/)
- [Using Sentry — Expo Documentation](https://docs.expo.dev/guides/using-sentry/)
- [iOS Simulator — Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/)
- [Build for iOS Simulators — Expo Documentation](https://docs.expo.dev/build-reference/simulators/)
- [iOS build process — Expo Documentation](https://docs.expo.dev/build-reference/ios-builds/)
- [App Store Connect minimum SDK requirements update — Expo blog](https://expo.dev/blog/app-store-connect-minimum-sdk-26)
- [React Native DevTools — reactnative.dev](https://reactnative.dev/docs/react-native-devtools)
- [React Native 0.76 release notes — reactnative.dev](https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture)
- [React Native 0.73 — Debugging Improvements](https://reactnative.dev/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks)
- [RFC 0641 — Decoupling Flipper from React Native Core](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0641-decoupling-flipper-from-react-native-core.md)
- [Compare Membership Options — Apple Developer](https://developer.apple.com/support/compare-memberships/)
- [Apple Developer Forums thread #820991 (StoreKit Simulator issue)](https://developer.apple.com/forums/thread/820991)
- [How to obtain the .dSYM file for your EAS build — Zach Stumpf, Medium](https://medium.com/@zachstumpf/how-to-obtain-the-dsym-file-for-your-expo-application-services-eas-build-cd9eec261f9a)
- [expo/eas-cli issue #2522 — artifacts not showing for local build](https://github.com/expo/eas-cli/issues/2522)
- [Device Hub — Apple Developer Documentation](https://developer.apple.com/documentation/xcode/device-hub)
- [WWDC 2026: Device Hub and what it means for CI/CD — Bitrise blog](https://bitrise.io/blog/post/wwdc-2026-device-hub-and-what-it-means-for-ci-cd)
- [Xcode 27 beta status and stable-release note — search-aggregated, cross-check `developer.apple.com/news/releases` before publishing](https://developer.apple.com/news/releases/?id=06082026a)
- [Apple Developer Forums thread #795163 (silent push throttling, official DTS engineer response)](https://developer.apple.com/forums/thread/795163)
- [Testing remote push notifications on iOS simulator — nilcoalescing.com](https://nilcoalescing.com/blog/TestingRemotePushOniOSSimulator/)
- [Registering your app with APNs — Apple Developer Documentation](https://developer.apple.com/documentation/usernotifications/registering-your-app-with-apns) (re-open directly in a browser; could not be fetched programmatically in this pass)
- [Testing Complex Hardware Device Scenarios in Simulator — Apple Developer Documentation](https://developer.apple.com/documentation/xcode/testing-complex-hardware-device-scenarios-in-simulator) (re-open directly in a browser; could not be fetched programmatically in this pass)
- [Xcode Simulator: Biometrics, Orientation, Screenshots — Mehmet Baykar](https://mehmetbaykar.com/posts/xcode-simulator-biometrics-orientation/)
- [How to Test Biometrics on iOS — Mobot](https://www.mobot.io/blog/how-to-test-biometrics-on-ios)

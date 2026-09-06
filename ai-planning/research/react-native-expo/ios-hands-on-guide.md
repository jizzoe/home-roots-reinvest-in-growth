# iOS Hands-On Guide: Simulator, Device Debugging, Testing, and the Develop-Deploy-Test Loop

Status: Working guide
Audience: An engineer new to iOS/Expo mobile development (see `phase-01-mobile-foundation-react-native-expo-typescript.md` for the underlying 101 concepts), working on the Expo/React Native mobile prototype.
Built from: `expo-react-native-build-and-distribution.md` (build/ship pipeline decisions), `ios-debugging-and-simulator.md` (debugging/Simulator research), `mobile-test-strategy.md` (test strategy research). Those three documents carry the "why" and citations; this document is the ordered "how."

## What This Guide Covers

- One-time Mac, Xcode, Apple account, and Expo/EAS setup.
- The fast local iteration loop on the iOS Simulator, and exactly what it cannot prove.
- Running, debugging, and viewing logs from a real, physical iPhone.
- Crash reporting and symbolication (Sentry, dSYM).
- Unit/component tests and end-to-end (E2E) tests.
- Wiring all of the above into a GitHub Actions → EAS Build develop → deploy → test pipeline.
- Shipping a build to TestFlight.

Not covered here: Android-specific steps (see `expo-react-native-build-and-distribution.md`, which covers both platforms), public App Store release governance/marketing, and Xcode 27's "Device Hub" (still in beta as of this research — revisit once it ships stable).

Commands below assume an existing Expo/React Native TypeScript project. If the project doesn't exist yet, bootstrap it first per `phase-01-mobile-foundation-react-native-expo-typescript.md`, then come back here.

## Part 0: One-Time Prerequisites

Work through this once per developer machine.

1. **Install Xcode** from the Mac App Store. As of this research, the current stable release is Xcode 26.x — do not chase Xcode 27 while it's in beta.
2. **Install Command Line Tools**: Xcode → Settings (Cmd+,) → Locations → select the latest version from the Command Line Tools dropdown.
3. **Install an iOS Simulator runtime**: Xcode → Settings → Components → Platform Support → iOS → Get.
4. **Accept the Xcode license** if prompted on first launch (a terminal prompt may appear).
5. **Install Node.js LTS** and a package manager.
6. **Optional but recommended**: `brew install watchman` for faster filesystem change detection.
7. **Install the EAS CLI**: `npm install --global eas-cli`, then `eas login` using the HRF-owned Expo organization account — not a personal account.
8. **Clone the project and install dependencies**: `npm install` (or the project's package manager) from the project root.
9. **Apple account decision** (you don't need to resolve this until Part 3, but plan for it now): a free Apple ID is enough for your own device's dev loop; TestFlight/App Store work needs an HRF-owned, paid Apple Developer Program membership ($99/yr, nonprofit fee-waiver eligible — confirm eligibility separately). See the account comparison table in Part 3.

## Part 1: Fast Local Loop — iOS Simulator

This is where you'll spend most of your day-to-day iteration time.

1. From the project root, start the dev server:
   ```bash
   npx expo start
   ```
2. Press **i** to launch the app in whatever Simulator is already open (or the default one). Press **Shift+I** instead to interactively pick a specific device model and iOS version.
3. Alternatively, open the Simulator app directly: **File → Open Simulator**, choose a device/iOS version there, then run `npx expo start` and press **i**. If multiple simulators are open, Expo CLI always targets the most recently opened one.
4. Edit a screen and confirm Fast Refresh updates it within a second or two.
5. **When the app starts using anything beyond Expo Go's built-in runtime** (SQLite, camera, secure storage, a custom native module, or app-specific native configuration), move to a development build instead of Expo Go:
   ```bash
   npx expo install expo-dev-client
   npx expo run:ios
   ```
   `expo run:ios` runs `prebuild` (generating the native `ios/` project if it doesn't exist), compiles it locally, and installs it on the simulator. This requires the full local Xcode toolchain from Part 0.
6. **If you'd rather not maintain a local Xcode build**, build the same development client in the cloud instead:
   ```bash
   eas build --profile development --platform ios
   ```
   Add `"ios": { "simulator": true }` to that profile in `eas.json` to get a Simulator-installable `.app` rather than a device build. This path notably **does not require an Apple Developer account** for a simulator-only artifact. Download and drag the `.app` onto a running simulator to install it, then run `npx expo start` separately to attach the JS dev server.
7. Rebuild (step 5 or 6) only when native configuration or dependencies change — a plain JS/TS edit never needs a rebuild.

### What the Simulator cannot prove

Do not sign off on these behaviors from Simulator testing alone — confirm on a physical device (Part 3):

| Feature | Simulator support |
| --- | --- |
| Camera (live capture) | Not available at all |
| Accelerometer / gyroscope / barometer / microphone | Not available at all |
| Background task real-world timing (`expo-background-task`, `expo-task-manager`) | Unreliable — Simulator suspends background apps/processes differently than a real device |
| Silent/background push notifications | Unreliable (this mirrors real-device throttling behavior generally, not a Simulator-only gap, but still confirm on-device) |
| In-app purchases (StoreKit) | Recently reported as unreliable in Simulator even in Apple's own sample code — don't trust a Simulator-only pass |

What Simulator *can* legitimately prove, contrary to a common assumption:

- **Face ID / Touch ID** (`expo-local-authentication`): Simulator supports simulated enrollment and matching/non-matching authentication (an iPhone 14+ simulated device is required). The exact menu path has drifted across Xcode versions — look for a **Features** (or, on some versions, **Hardware**) menu with a **Face ID** / **Touch ID** submenu offering **Enrolled**, **Matching Face/Touch**, and **Non-matching** options. Confirm the exact wording in your installed Xcode rather than trusting a screenshot from an older version.
- **Visible/alert remote push notifications**: on an Apple Silicon (or T2) Mac running macOS 13+ with Xcode 14+, the Simulator generates a real device token and can receive a genuine push through Apple's APNs Sandbox — a real test, not just local injection. (Local injection via `xcrun simctl push <device> <payload.apns>` also still works, and needs no server round-trip at all — useful for quick payload-shape testing.)
- **Photos library and Contacts**: import photos/videos/vCards via the Simulator's drag-and-drop or menu options; only *live* camera capture is unavailable.

## Part 2: Debugging JavaScript (Simulator or Device)

React Native DevTools is the current, built-in debugger — do not look for or install Flipper, which is deprecated and removed from React Native's core templates.

1. With `npx expo start` running, press **J** in that terminal to open React Native DevTools directly.
2. Or open the in-app Dev Menu, then choose "Open DevTools" / "Open JS Debugger":
   - Terminal: press **M**
   - iOS Simulator: **Ctrl+Cmd+Z** or **Cmd+D**
   - Physical device: shake the phone
3. This works in both Expo Go and a development-client build. The **Network** tab specifically requires `expo-dev-client` or Expo Go — it's not available in a release/production build without added instrumentation (see Part 5).
4. React Native DevTools is scoped to React/JS-level debugging. For native-module-level work, use Xcode's own debugging tools directly: `npx expo prebuild -p ios && xed ios` opens the generated native project in Xcode, where you get full LLDB breakpoints and view debugging.

## Part 3: Running and Debugging on a Physical iPhone

### One-time device setup

1. **Enable Developer Mode** (required on iOS 16+, does not apply to the Simulator):
   - Connect the iPhone via USB and tap **Trust This Computer** on the phone (enter the passcode).
   - Install a development build on the phone (see below) — the first launch attempt triggers an alert.
   - On the phone: **Settings → Privacy & Security → Developer Mode → toggle on → restart → unlock → confirm with passcode → Turn On**.
2. **Confirm your Apple account tier** covers what you need:

   | Capability | Free Apple ID | Paid Apple Developer Program ($99/yr) |
   | --- | --- | --- |
   | Install/debug your own app on your own device | Yes | Yes |
   | Max registered devices | 3 | Unlimited |
   | Provisioning profile expiry | 7 days (rebuild/reinstall to renew) | No expiration |
   | TestFlight | No | Yes |
   | App Store distribution | No | Yes |

   For solo development-loop testing on your own phone, a free Apple ID is enough short term. The moment you need TestFlight or to hand a build to anyone else, you need the HRF-owned, paid Apple Developer Program membership (check nonprofit fee-waiver eligibility before paying).

### Installing a build on the device

Pick one path:

- **Local build**: `npx expo run:ios --device` — select your connected iPhone when prompted. Requires the full local Xcode toolchain and a signing identity (Xcode will offer to manage this automatically under a free or paid account).
- **Cloud build**: `eas build --profile development --platform ios` — install the resulting build via the link/QR code EAS provides. Device-targeted (non-simulator) builds still require Apple provisioning; EAS can manage the signing credentials for you if you authorize it, or you can retain ownership of the signing key.

### Attaching the dev server and debugging

1. Launch the installed app on the phone, then run `npx expo start` from the project root and connect (scan the QR code from the dev-client screen, or use the same Wi-Fi network).
2. Open the Dev Menu via the shake gesture, then "Open DevTools" as in Part 2.
3. **Wireless debugging** (no cable after the first pairing): after the initial USB trust step, open Xcode → **Window → Devices and Simulators** (Shift+Cmd+2), select the device, and enable **Connect via Network**. Confirm this still matches your installed Xcode's UI — this is standard Xcode behavior rather than something Expo's own docs document directly.

### Viewing native logs from the phone

1. Xcode → **Window → Devices and Simulators** (Shift+Cmd+2) → select the connected device → **Open Console**.
2. This is the correct tool for physical-device log streaming. `xcrun simctl` is Simulator-only and does not apply here. `xcrun devicectl` (Xcode 15+) can also stream a specific app's console via `devicectl device process launch --console <bundle-id>`, but Apple has never published a dedicated reference page for it — treat `devicectl --help` as the source of truth for its exact syntax, and prefer the Xcode GUI console for anything beyond a quick scripted check.

## Part 4: Crash Reporting and Symbolication

Set this up before you need it — don't wait for the first production crash to discover it isn't wired up.

1. **Install Sentry** (Expo's documented, first-party-supported path):
   ```bash
   npx @sentry/wizard@latest -i reactNative
   ```
   This wires dependencies, Metro config, and app initialization automatically. Gather your Sentry org slug, project name, and DSN first.
2. **For EAS Build**: set `SENTRY_AUTH_TOKEN` as a sensitive-visibility environment variable on the build. Source maps then upload automatically — no extra step per build.
3. **For EAS Update** (OTA JS-only updates): source maps do **not** upload automatically. After every update, run:
   ```bash
   eas update --branch <branch-name>
   npx sentry-expo-upload-sourcemaps dist
   ```
4. **Link Sentry to the Expo dashboard** (Account settings → Connections) to see crash data alongside build data in one place.
5. **For native crash symbolication (dSYM)**: EAS Build does not upload the dSYM by default. Add to the relevant `eas.json` profile:
   ```json
   {
     "build": {
       "production": {
         "ios": { "buildArtifactPaths": ["ios/build/*"] }
       }
     }
   }
   ```
   This has been reported as less reliable specifically for **local** builds (`eas build --local`) — verify against a real cloud build first if artifacts don't appear as expected.
6. **Reviewing a native crash**: Xcode → **Window → Organizer → Crashes** tab. Crash reports are `.ips` files and need a matching dSYM (from step 5) to symbolicate cleanly. Hermes bytecode symbolication has historically been inconsistent across React Native versions — verify empirically against this project's actual RN/Hermes version rather than assuming it works out of the box.
7. **Reproducing a release-mode issue locally** without a full release build:
   ```bash
   npx expo start --no-dev --minify
   ```

## Part 5: Unit and Component Testing

1. Install the testing dependencies:
   ```bash
   npx expo install jest-expo jest @types/jest --dev
   npx expo install @testing-library/react-native --dev
   ```
2. `package.json`:
   ```json
   {
     "scripts": { "test": "jest --watchAll" },
     "jest": { "preset": "jest-expo" }
   }
   ```
3. `tsconfig.json`: add `"jest"` to the `types` array.
4. Write component tests with React Native Testing Library (`@testing-library/react-native`) — this is the current, supported approach and replaces the older `react-test-renderer`/snapshot pattern. Favor behavior assertions (what the user sees/can do) over snapshots; Expo's own guidance treats E2E as the higher-value investment relative to snapshot testing.
5. Run tests: `npm test`.
6. This layer is pure JavaScript/TypeScript — it needs no native build and no EAS build. Run it as a fast GitHub Actions PR check (Part 7).

## Part 6: End-to-End (E2E) Testing With Maestro

Maestro is the tool with a documented, first-party integration into Expo's EAS pipeline. Detox remains a viable alternative if a future need requires its gray-box (in-process) approach, but it has no first-party Expo/EAS wiring — treat it as a fallback, not the default.

1. Write flows as YAML under a `.maestro/` directory, for example `.maestro/login.yaml`:
   ```yaml
   appId: org.homeroots.enterprisegrowth.preview
   ---
   - launchApp
   - assertVisible: "Home"
   ```
2. Add a dedicated `eas.json` build profile for test artifacts, for example:
   ```json
   {
     "build": {
       "e2e-test": {
         "ios": { "simulator": true },
         "android": { "buildType": "apk" }
       }
     }
   }
   ```
3. Wire it into an EAS Workflow (`.eas/workflows/e2e.yml`): a `build` job produces the artifact, then a `maestro` job consumes that `build_id` plus a `flow_path` to run the flows against it. This runs on EAS-hosted simulators/emulators, not physical devices.
4. Trigger the workflow `on.pull_request` (or `on.pull_request_labeled`), or run it manually with `eas workflow:run`.
5. **For real-device E2E coverage** (camera, push, background-sync flows that Simulator can't exercise — see Part 1's limitations table), use **Maestro Cloud** instead: a `maestro-cloud` job type that runs the same flows against Maestro's managed device farm, which has confirmed real iOS device support (`maestro cloud --device-os "<os>" --device-model "<model>"`, or `maestro list-cloud-devices --platform=ios` to see the current catalog).
6. Face ID/Touch ID flows are a notable exception: they **can** be exercised in Simulator-based Maestro runs via the same Features/Hardware menu simulation described in Part 1, so a login flow gated by biometrics doesn't necessarily need the Maestro Cloud device-farm tier.

## Part 7: The Develop → Deploy → Test Pipeline

Layer the pieces above onto the GitHub Actions → EAS Build pipeline:

1. **Pull request** (GitHub Actions, no build needed):
   - `npm ci`
   - `tsc --noEmit`
   - `eslint .`
   - `npm test` (Jest + RNTL, Part 5)
2. **Merge to main**: trigger an EAS Build on the `development` or `preview` profile, either via GitHub Actions calling `eas build`, or an EAS Workflow. Then run the Maestro E2E job (Part 6) against that artifact — either as a chained job in the same EAS Workflow (`build` → `maestro`), or as a separate GitHub Actions step that calls the Maestro CLI against the downloaded artifact.
3. **Share for staff/tester review**: distribute the resulting Android APK via EAS internal distribution, and the iOS build via TestFlight (Part 8) or ad hoc distribution for a small registered-device group.
4. **Release candidate / production**: tag a release, build the `production` profile for iOS and Android, then submit:
   ```bash
   eas build --platform all --profile production
   eas submit --platform ios
   eas submit --platform android
   ```
   `eas build --auto-submit` can chain these. iOS submission defaults to TestFlight, not an automatic public App Store release — that should stay a deliberate, separate decision.
5. **Secrets**: `EXPO_TOKEN`, `SENTRY_AUTH_TOKEN`, and any Apple/Google submission credentials belong only in protected CI secrets, restricted to protected branches/tags. Never bundle them into the app itself.
6. **Environment separation**: keep distinct `eas.json` profiles and matching backend URLs for `development`, `preview`, `staging`, and `production`, with distinct app identifiers where preview and production coexist on one device (for example `org.homeroots.enterprisegrowth.preview` vs. `org.homeroots.enterprisegrowth`). CI should reject a production build that points at a non-production API base URL.

## Part 8: Shipping to TestFlight

1. Confirm the HRF-owned Apple Developer Program enrollment is active (check nonprofit fee-waiver status ahead of time — this can take time to process).
2. Build:
   ```bash
   eas build --platform ios --profile production
   ```
3. Submit:
   ```bash
   eas submit --platform ios
   ```
   This uploads to App Store Connect/TestFlight, not the public App Store.
4. In App Store Connect, add internal testers under the TestFlight tab (up to 100 internal testers, no additional review). External testers (up to 10,000) require Apple's TestFlight review for the first build — plan for that lag before a pilot date.
5. Store listing metadata, screenshots, and release notes are managed separately in App Store Connect — `eas submit` uploads the binary only.

## Part 9: Troubleshooting Quick Reference

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| App won't launch on a physical device after install | Developer Mode not enabled | Part 3, step 1 |
| No dSYM available when investigating a crash | `buildArtifactPaths` not set on that `eas.json` profile | Part 4, step 5 |
| dSYM missing specifically after a local build | Known reliability gap for `eas build --local` | Rebuild via cloud EAS Build to confirm, then investigate the local-build path separately |
| Push notification never arrives in Simulator | Silent push (throttled everywhere, not just Simulator) or hardware/OS/Xcode requirements unmet for real Sandbox delivery | Confirm Apple Silicon/T2 Mac, macOS 13+, Xcode 14+; for silent push, test on a physical device instead |
| Camera/mic/motion-sensor feature "does nothing" in Simulator | Simulator does not emulate this hardware at all | Test on a physical device |
| Background sync never fires while testing in Simulator | Simulator suspends background apps/processes differently than a real device | Test on a physical device |
| Flipper-based tutorial doesn't match what you see | Flipper is deprecated/removed from current React Native | Use React Native DevTools (Part 2) instead |
| E2E flow can't exercise Face ID | Using an older/incorrect simulated device, or wrong menu assumed | Use an iPhone 14+ simulated device; check whether your Xcode calls the menu "Features" or "Hardware" |

## Related Documents

- `expo-react-native-build-and-distribution.md` — build/ship pipeline decisions, Android parity, cost/governance detail.
- `ios-debugging-and-simulator.md` — sourced research behind Parts 1–4 of this guide.
- `mobile-test-strategy.md` — sourced research behind Parts 5–6 of this guide.
- `../tech-research/phase-01-mobile-foundation-react-native-expo-typescript.md` — underlying Expo/React Native/TypeScript 101 concepts and initial project bootstrap.

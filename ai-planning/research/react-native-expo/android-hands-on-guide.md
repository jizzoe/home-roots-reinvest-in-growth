# Android Hands-On Guide: Emulator, Device Debugging, Testing, and the Develop-Deploy-Test Loop

Status: Working guide
Audience: An engineer new to Android/Expo mobile development (see `phase-01-mobile-foundation-react-native-expo-typescript.md` for the underlying 101 concepts), working on the Expo/React Native mobile prototype. Mirrors `ios-hands-on-guide.md` part-for-part so the two platforms can be worked side by side.
Built from: `expo-react-native-build-and-distribution.md` (build/ship pipeline decisions, both platforms), `android-debugging-emulator-and-testing.md` (Android debugging/emulator/testing research), `mobile-test-strategy.md` (cross-platform test strategy research). Those documents carry the "why" and citations; this document is the ordered "how."

For the M1 milestone's specific *product acceptance script* (manual sale/expense flows, offline persistence, French/English smoke tests) rather than general tooling mechanics, see `ai-planning/research/mobile-prototype-testing/02-android-physical-device-testing.md` — that document and this one are complementary, not duplicates.

## What This Guide Covers

- One-time Mac, Android Studio, Google account, and Expo/EAS setup.
- The fast local iteration loop on the Android Emulator, and exactly what it cannot prove.
- Running, debugging, and viewing logs from a real, physical Android phone.
- Crash reporting and symbolication (Sentry, ProGuard/R8 mapping files).
- Unit/component tests and end-to-end (E2E) tests.
- Wiring all of the above into a GitHub Actions → EAS Build develop → deploy → test pipeline.
- Shipping a build to Google Play internal testing.

Not covered here: iOS-specific steps (see `ios-hands-on-guide.md`), public Play Store production release governance/marketing.

Commands below assume an existing Expo/React Native TypeScript project. If the project doesn't exist yet, bootstrap it first per `phase-01-mobile-foundation-react-native-expo-typescript.md`, then come back here.

## Part 0: One-Time Prerequisites

Work through this once per developer machine.

1. **Install Android Studio**, which bundles the Android SDK, platform tools (`adb`), and the emulator.
2. **Create a virtual device** via Android Studio's Device Manager / AVD Manager (details in Part 1).
3. **On an Apple Silicon (M-series) Mac, use an `arm64-v8a` system image**, not `x86_64` — Android Studio has had native Apple Silicon support since an early preview, with ongoing platform-specific fixes since. Confirm the image architecture in the AVD Manager's image picker before creating the device.
4. **Install Node.js LTS** and a package manager (shared with the iOS setup if you're doing both).
5. **Install the EAS CLI**: `npm install --global eas-cli`, then `eas login` using the HRF-owned Expo organization account.
6. **Clone the project and install dependencies**: `npm install` from the project root.
7. **Google account decision** (resolve fully in Part 8, but plan for it now): a standalone Google account is enough for emulator/device dev-loop testing; a **Google Play Console account is a one-time US$25 registration fee**, HRF-owned rather than personal, needed before any internal testing track or production release.

## Part 1: Fast Local Loop — Android Emulator

This is where you'll spend most of your day-to-day iteration time.

1. **Create a virtual device**: Android Studio → Device Manager → Create device → pick a phone profile → pick a **system image**. Three image flavors exist:

   | Image type | Play Store app | Play services | Root access |
   | --- | --- | --- | --- |
   | Google Play | Yes | Yes | No |
   | Google APIs | No | Yes | Yes |
   | AOSP (no Google APIs) | No | No | Yes |

   Use a **Google Play** image if you need a genuine signed-in Play Store session or Play Integrity testing; a **Google APIs** image is enough for Play-Services-dependent features (FCM, Maps) that don't need the Store app itself.
2. Boot the emulator, then from the project root:
   ```bash
   npx expo start
   ```
3. Press **a** to launch the app on the currently running emulator (or the first connected device/emulator `adb` finds).
4. Edit a screen and confirm Fast Refresh updates it within a second or two.
5. **When the app starts using anything beyond Expo Go's built-in runtime** (SQLite, camera, secure storage, a custom native module, or app-specific native configuration), move to a development build:
   ```bash
   npx expo install expo-dev-client
   npx expo run:android
   ```
   This runs `prebuild` (generating the native `android/` project if needed), builds via Gradle, and installs on the emulator. Requires the local Android Studio/SDK/Gradle toolchain.
6. **If you'd rather not maintain a local Android toolchain**, build the same development client in the cloud and sideload it:
   ```bash
   eas build --profile development --platform android
   ```
   Download the resulting APK, then:
   ```bash
   adb install <path-to-download>.apk
   ```
   This installs on whatever emulator or physical device `adb` currently targets — there's no Apple-style provisioning distinction between an emulator install and a device install on Android.
7. Rebuild (step 5 or 6) only when native configuration or dependencies change — a plain JS/TS edit never needs a rebuild.

### What the Android Emulator can simulate

Extended Controls (the emulator's side panel) covers more ground than the iOS Simulator does:

| Feature | Emulator support |
| --- | --- |
| Fingerprint / biometric auth | Yes — Extended Controls → Fingerprint → select a value → "Touch Sensor" (up to 10 simulated scans; disabled on API 22 and below) |
| Location, including simulated movement | Yes |
| Battery state (charge level, health, charger connected) | Yes |
| Cellular network conditions (type, roaming, denied access) | Yes |
| Rotation / device pose | Yes |
| Camera | **Partial** — not real hardware, but not a blank absence either: a synthetic AR-style scene renders when the camera opens (optionally seeded with your own images). This is a real difference from the iOS Simulator, which has zero camera simulation — though it's still not equivalent to a live feed for real-world photo-quality or OCR testing. |
| FCM push notifications | **Works end-to-end** on a Google Play or Google APIs image, signed into a Google account under emulator Settings → Accounts — a materially easier story than iOS Simulator's push limitations |

### What the Android Emulator cannot reliably prove

| Feature | Emulator status |
| --- | --- |
| Play Integrity API strong/hardware attestation | Fails by design — no hardware-backed attestation on an emulator |
| Real camera capture (photo quality, OCR accuracy) | The synthetic scene above is not a substitute — verify on a physical device |
| Background execution / Doze mode realism | Can be driven manually via `adb shell dumpsys battery unplug` and `adb shell dumpsys deviceidle step`, but real OEM variance isn't reproducible in the emulator |
| Performance on a real low-end target device | The emulator runs at your development machine's speed — this proves nothing about a real low-end device's CPU/RAM/thermal ceiling |

## Part 2: Debugging JavaScript (Emulator or Device)

Identical tool to iOS — React Native DevTools, not Flipper (deprecated and removed from React Native's core templates).

1. With `npx expo start` running, press **J** in that terminal to open React Native DevTools directly.
2. Or open the in-app Dev Menu, then "Open DevTools" / "Open JS Debugger":
   - Terminal: press **M**
   - Android emulator: **Cmd+M** (macOS) / **Ctrl+M** (Windows/Linux), or `adb shell input keyevent 82`
   - Physical device: shake the phone
3. Works in both Expo Go and a development-client build. The **Network** tab requires `expo-dev-client` or Expo Go — not available in a release/production build without added instrumentation (see Part 5).
4. For native-module-level work rather than JS/React debugging, open the generated native project directly in Android Studio (`npx expo prebuild -p android`, then open the `android/` folder), which gives full breakpoint debugging in Java/Kotlin.

## Part 3: Running and Debugging on a Physical Android Phone

### One-time device setup

1. **Enable Developer options**: Settings → About phone → tap **Build number** 7 times (exact submenu path varies slightly by OEM).
2. **Enable USB debugging**: Settings → System → Developer options → USB debugging.
3. **Connect via USB** and accept the on-device authorization dialog: *"the system shows a dialog asking whether to accept an RSA key that allows debugging through this computer."* You must unlock the device and acknowledge this dialog before any `adb` command will work.
4. Confirm the connection: `adb devices` should list the phone.

No Apple-style account tier, device cap, or provisioning-profile expiry applies here — Android's physical-device enablement is meaningfully simpler than iOS's.

### Installing a build on the device

Pick one path:

- **Local build**: `npx expo run:android --device` — select your connected phone when prompted.
- **Cloud build**: `eas build --profile development --platform android`, then `adb install <path>.apk` on the connected phone.

### Attaching the dev server and debugging

1. Launch the installed app on the phone, then run `npx expo start` from the project root and connect over USB or shared Wi-Fi.
2. Open the Dev Menu via the shake gesture, then "Open DevTools" as in Part 2.
3. **Wireless debugging** (no cable after initial pairing) — Android 11+ ships this as a first-party feature, more directly documented than iOS's equivalent:
   - On-device: **Developer options → Wireless debugging**, then either scan a QR code generated by Android Studio's "Pair devices over Wi-Fi" dialog, or use the on-device pairing code with `adb pair ipaddr:port` from the workstation.
   - Confirm with `adb devices`. Pairing persists until explicitly forgotten and reconnects automatically on the same network.

### Viewing native logs from the phone

1. `adb logcat` streams all device logs. Filter by tag: `adb logcat ActivityManager:I MyApp:D *:S` (the trailing `*:S` silences everything else). Filter by process: `adb logcat --pid=$(adb shell pidof -s <package>)` — rerun this if the process crashes and restarts, since the PID changes.
2. **Android Studio's Logcat window** is the GUI equivalent, and supports the same filtering interactively.

## Part 4: Crash Reporting and Symbolication

Set this up before you need it.

1. **Install Sentry** (shared setup with iOS if both platforms are done together):
   ```bash
   npx @sentry/wizard@latest -i reactNative
   ```
2. **Android mapping upload is not confirmed automatic the way iOS source-map upload is.** Plan for an explicit step: either the Sentry Gradle plugin's mapping-upload task, or a manual CI step running `sentry-cli upload-proguard` / `sentry-cli debug-files upload` against the mapping file at `android/app/build/outputs/mapping/release/mapping.txt` (an EAS Build artifact path). Verify this empirically against this project's own EAS Android build rather than assuming iOS-level automation.
3. **Understand the two-tier deobfuscation story if the app also lands in Google Play**:
   - Uploading an **AAB** built with Android Gradle Plugin 4.1+ triggers automatic deobfuscation in Play Console's own "Crashes & ANRs" report — no manual step needed there.
   - Uploading an **APK** instead requires manually uploading the `mapping.txt` via "Add ReTrace mapping file" on that release artifact in Play Console.
4. **Manual deobfuscation of any stack trace** against a `mapping.txt`, independent of any store or Sentry integration:
   ```bash
   retrace path-to-mapping-file path-to-stack-trace-file
   ```
5. **Reproducing a release-mode issue locally** without a full release build:
   ```bash
   npx expo start --no-dev --minify
   ```

## Part 5: Unit and Component Testing

Identical to iOS — this layer is platform-agnostic:

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

`tsconfig.json`: add `"jest"` to the `types` array. Run with `npm test`. This needs no native build and no EAS build — run it as a fast GitHub Actions PR check (Part 7). See `mobile-test-strategy.md` for the full rationale (Expo's own guidance favors E2E over snapshot testing).

## Part 6: End-to-End (E2E) Testing With Maestro

Maestro drives both the emulator and a physical Android device over `adb`, and assumes the app under test is already installed — confirm a target is visible with `adb devices` before running a flow.

1. Write flows as YAML under `.maestro/`, for example `.maestro/login.yaml`:
   ```yaml
   appId: org.homeroots.enterprisegrowth.preview
   ---
   - launchApp
   - assertVisible: "Home"
   ```
2. Install Maestro locally (macOS):
   ```bash
   brew tap mobile-dev-inc/tap
   brew install mobile-dev-inc/tap/maestro
   ```
3. Boot an emulator (or connect a physical device with USB debugging on), confirm it's visible:
   ```bash
   adb devices
   ```
4. Run a flow against an installed development or preview build:
   ```bash
   maestro test .maestro/login.yaml
   ```
5. Add a dedicated `eas.json` build profile for test artifacts, mirroring the iOS side:
   ```json
   {
     "build": {
       "e2e-test": {
         "android": { "buildType": "apk" },
         "ios": { "simulator": true }
       }
     }
   }
   ```
   Android needs `buildType: "apk"` specifically — EAS Build's default Android output is an **AAB**, which cannot be installed directly for testing.
6. Wire it into an EAS Workflow (`.eas/workflows/e2e.yml`): a `build` job produces the artifact, then a `maestro` job runs the flows against it — the same shape as the iOS pipeline, just targeting the Android build.
7. **For real-device E2E coverage** beyond what the emulator can prove (camera, real background-sync timing), use **Maestro Cloud**: `maestro cloud --device-os "<os>" --device-model "<model>"`, or `maestro list-cloud-devices --platform=android` to see the current device catalog.
8. **Detox** remains a viable fallback (`android.emulator` for a named AVD, `android.attached` for an already-running target), but community reports describe its physical-device path (`android.attached`) as less reliable than Maestro's, on top of Detox having no first-party Expo/EAS wiring. Its own docs recommend installing **Test Butler** to suppress crash/ANR system dialogs during automated runs if you do go this route.

## Part 7: The Develop → Deploy → Test Pipeline

Layer the pieces above onto the same GitHub Actions → EAS Build pipeline used for iOS:

1. **Pull request** (GitHub Actions, no build needed): `npm ci`, `tsc --noEmit`, `eslint .`, `npm test` — identical to the iOS-side PR check, since this layer is cross-platform.
2. **Merge to main**: trigger an EAS Build on the `development`/`preview` profile, then run the Maestro E2E job (Part 6) against that artifact — either chained in one EAS Workflow (`build` → `maestro`) or as a separate GitHub Actions step.
3. **Speed up the Android leg specifically**: set `EAS_GRADLE_CACHE=1` (account settings or `eas.json`) to enable Gradle build caching on EAS Build — roughly a 50% build-time reduction on cache hits after the first build populates the cache. There's no iOS-side equivalent documented, so this is an Android-only lever worth using.
4. **Share for staff/tester review**: distribute the Android build via EAS internal distribution (an installable APK — see Part 8's `preview` profile note) while the iOS build goes to TestFlight.
5. **Release candidate / production**: tag a release, then:
   ```bash
   eas build --platform all --profile production
   eas submit --platform android
   eas submit --platform ios
   ```
   Android's `production` profile should build an **AAB** (EAS Build's default) for Play Store submission — do not force `buildType: "apk"` on the profile you intend to submit to Play.
6. **Secrets**: `EXPO_TOKEN`, `SENTRY_AUTH_TOKEN`, and the Play Console service-account credentials used by `eas submit` belong only in protected CI secrets, restricted to protected branches/tags.
7. **Environment separation**: keep distinct `eas.json` profiles and matching backend URLs for `development`, `preview`, `staging`, and `production`, with distinct Android application IDs where preview and production coexist on one device.

## Part 8: Shipping to Google Play Internal Testing

1. Register the HRF-owned Google Play Console developer account (one-time US$25 fee) if not already done.
2. Build the Play-submittable artifact:
   ```bash
   eas build --platform android --profile production
   ```
   (An AAB, per EAS Build's default — confirm the profile doesn't force `buildType: "apk"`.)
3. Submit:
   ```bash
   eas submit --platform android
   ```
4. In Play Console: **Test and release → Testing → Internal testing → Testers tab → Create email list**, add tester emails, select that list, then **Create release**, upload the artifact (or let `eas submit` handle the upload), fill in release details, and roll out.
5. Testers see the release "a few minutes" after publish — except the very first internal test for a brand-new app, which can take up to 48 hours.
6. **Bonus, no equivalent on iOS**: Play Console automatically runs a free "pre-launch report" — a Robo-test crawler that exercises the app on a real device farm with no test-writing required, surfacing crashes/display/security issues on upload. The exact triggering track and cost were ambiguous across Google's own documentation as of this research (see `android-debugging-emulator-and-testing.md`) — check your live Play Console account to confirm it's actually running rather than assuming it silently is.
7. **Plan for a new-account lead time**: a reportedly current Play Console policy requires closed testing with at least 12 opted-in testers active for 14 consecutive days before a new account can apply for production access. Verify this directly in the Play Console account's own policy messaging — it has no TestFlight equivalent and can materially affect a release timeline if the account is new.

For the M1 milestone's specific tester-facing preview-APK flow (rather than a Play Console internal-testing-track release), see `ai-planning/research/mobile-prototype-testing/02-android-physical-device-testing.md` — that path uses EAS internal distribution to hand a directly-installable APK to a tester without going through Play Console at all, which is faster to set up for an early prototype.

## Part 9: Troubleshooting Quick Reference

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Computer can't see the physical device | Cable/driver issue, or USB debugging not authorized | Reconnect, unlock the phone, re-accept the RSA authorization dialog, check `adb devices` |
| APK won't install | It's actually an AAB, storage is full, or a conflicting earlier build has a different signing identity | Confirm the artifact is an APK; check `android.buildType` in the `eas.json` profile used |
| No deobfuscated crash in Play Console | Uploaded an APK instead of an AAB, or AGP is older than 4.1 | Manually upload the `mapping.txt`, or switch to an AAB with a current AGP for auto-deobfuscation |
| Sentry shows an obfuscated Android stack trace | ProGuard/R8 mapping wasn't uploaded to Sentry | Add the Sentry Gradle plugin's upload step, or run `sentry-cli upload-proguard` in CI — don't assume EAS Build does this automatically the way it does for iOS |
| Camera/OCR feature "looks fine" only in the emulator | Emulator's camera is a synthetic scene, not a real feed | Verify on a physical device before treating it as validated |
| Play Integrity check fails in the emulator | Emulators can't produce hardware-backed attestation | Expected — test Play Integrity flows on a physical device, or use the `MEETS_VIRTUAL_INTEGRITY` verdict category if applicable |
| Flipper-based tutorial doesn't match what you see | Flipper is deprecated/removed from current React Native | Use React Native DevTools (Part 2) instead |
| Maestro flow can't find the target | No emulator/device visible to `adb` | Run `adb devices` first and boot/connect a target before invoking Maestro |

## Related Documents

- `ios-hands-on-guide.md` — the iOS counterpart to this guide, same part structure.
- `expo-react-native-build-and-distribution.md` — build/ship pipeline decisions covering both platforms.
- `android-debugging-emulator-and-testing.md` — sourced research behind Parts 1–4 and 6–8 of this guide.
- `mobile-test-strategy.md` — sourced research behind Parts 5–6 of this guide.
- `ai-planning/research/mobile-prototype-testing/` — the M1 milestone's specific product acceptance-test package (distinct from, and complementary to, this general tooling guide).
- `../tech-research/phase-01-mobile-foundation-react-native-expo-typescript.md` — underlying Expo/React Native/TypeScript 101 concepts and initial project bootstrap.

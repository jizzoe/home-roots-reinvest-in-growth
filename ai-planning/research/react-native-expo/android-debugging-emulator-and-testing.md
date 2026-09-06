# Android Physical-Device Debugging, Emulator Mechanics, and Test-Strategy Research

Research date: 2026-09-05
Scope: the Android counterpart to `ios-debugging-and-simulator.md` and `mobile-test-strategy.md` in this same folder — physical-device debugging, Android Emulator mechanics/limitations on a Mac (including Apple Silicon), and Android-specific testing/CI notes. This is general Expo/React Native Android tooling research, distinct from `ai-planning/research/mobile-prototype-testing/`, which is the M1 milestone's specific product acceptance-test script (manual sale/expense flows, offline persistence, French/English smoke tests, TestFlight/preview-APK delivery). Where the two overlap on mechanics (EAS profiles, Maestro install, APK vs. AAB), this document stays consistent with what that package already states and cites it rather than repeating it.

## Decision Summary

- **JavaScript debugging is identical to iOS**: React Native DevTools is the same cross-platform tool. The only Android-specific wrinkle is the Dev Menu shortcut on an emulator (Cmd+M on macOS, or `adb shell input keyevent 82`) versus the shake gesture on a physical device (same as iOS).
- **Android's physical-device *enablement* story is simpler than iOS's**: Developer options (seven-tap) → USB debugging toggle → one-time RSA-key authorization dialog. There is no Apple-style Developer Mode dance, no device-count cap, and no code-signing identity required just to install a debug build.
- **Android's *wireless* debugging story is more directly documented than iOS's**: Android 11+ ships a first-party "Wireless debugging" flow (QR code or pairing code) documented directly by Google, versus iOS's "Connect via Network" Xcode feature, which Expo doesn't document at all.
- **Android's *crash-symbolication* story is more fragmented than iOS's**: Google Play Console auto-deobfuscates crashes only for an AAB built with AGP 4.1+; an APK upload needs a manual mapping-file upload. More importantly, **EAS Build does not appear to auto-upload the ProGuard/R8 mapping file to Sentry the way it auto-uploads iOS source maps** — Sentry's own Android/Expo guide documents only manual upload paths. Verify this empirically against this project's own EAS Android build before assuming iOS-level automation.
- **The Android Emulator can do a few things the iOS Simulator flatly cannot**: it presents a virtual/synthetic camera feed (not real hardware, but *something*, unlike iOS Simulator's total absence of camera simulation) and can receive real FCM push notifications end-to-end on a Google Play/Google APIs image signed into a Google account — a materially easier push-testing story than iOS Simulator's narrower conditions.
- **Google Play offers something Apple/TestFlight does not**: a free, no-code-required automated crawler (the "pre-launch report," backed by Firebase Test Lab's Robo test) that exercises the app on a real device farm on every upload. Exact triggering track and cost details are ambiguous across Google's own pages as of this research — verify directly in the live Play Console account before relying on it as a release gate.
- **Recommended default for E2E**: Maestro, consistent with the iOS-side research — official Maestro docs confirm it drives both Android emulators and physical devices over ADB, assuming the app under test is already installed and a target is already visible via `adb devices`.

## Section 1: Android Physical-Device Debugging

### React Native DevTools — same tool, minor Android-specific access mechanics

Per [Debugging Basics — React Native](https://reactnative.dev/docs/debugging), the DevTools access instructions are platform-agnostic (press **J** in the terminal, or "Open DevTools" from the Dev Menu). The only Android-specific detail is how you reach the Dev Menu:

- **Android emulator**: **Cmd+M** (macOS) / **Ctrl+M** (Windows/Linux), or `adb shell input keyevent 82`.
- **Physical device**: shake gesture (same mechanism as iOS).

React Native DevTools was introduced in RN 0.76 as the unified replacement for Flipper, the experimental remote debugger, and the separate Hermes/Chrome debugger — consistent with the deprecated-Flipper finding already documented in `ios-debugging-and-simulator.md`. Source: [React Native 0.76 release notes](https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture).

### Native log streaming from a physical Android device

- `adb logcat` is the official command-line tool. Source: [Logcat command-line tool — Android Developers](https://developer.android.com/tools/logcat).
  - Tag/priority filtering: `adb logcat ActivityManager:I MyApp:D *:S` — the trailing `*:S` silences every other tag.
  - PID filtering (a widely used pattern, not from that specific page but standard adb usage): `adb logcat --pid=$(adb shell pidof -s <package>)`. The PID changes if the process crashes and restarts, so the command needs rerunning; third-party tools like [pidcat](https://github.com/Pixplicity/pidcat) exist specifically to smooth this over.
- **Android Studio's Logcat window** is the official GUI alternative, explicitly cross-referenced from the CLI page above. Source: [View and write logs with Logcat — Android Developers](https://developer.android.com/studio/debug/am-logcat).

### USB debugging setup

- Enable Developer options: **Settings → About phone → tap Build number 7 times** (exact submenu path varies slightly by OEM). Source: [Configure on-device developer options — Android Developers](https://developer.android.com/studio/debug/dev-options).
- Enable USB debugging: **Settings → System → Developer options → USB debugging** (nesting varies by Android version/OEM skin).
- First-connection authorization, confirmed directly from Android's own device-testing doc: **"When you connect a device running Android 4.2.2 (API level 17) or higher to your computer, the system shows a dialog asking whether to accept an RSA key that allows debugging through this computer. This security mechanism protects user devices because USB debugging and other `adb` commands can't be executed unless you're able to unlock the device and acknowledge the dialog."** Source: [Run apps on a hardware device — Android Developers](https://developer.android.com/studio/run/device).
- Confirm the connection with `adb devices`.

### Wireless debugging (Android 11+)

Per the official [Android Debug Bridge (adb) — Android Developers](https://developer.android.com/tools/adb) page:

- Requirements: device on Android 11+ (Android 13+ for TV/Wear OS), current SDK Platform Tools on the workstation, both on the same Wi-Fi network.
- Two pairing flows:
  1. **QR code**: Android Studio's "Pair devices over Wi-Fi" dialog generates a QR code; on-device, **Developer options → Wireless debugging → Pair device with QR code** → scan.
  2. **Pairing code**: on-device, **Developer options → Wireless debugging → Pair using pairing code** shows an IP:port and a 6-digit code; on the workstation, run `adb pair ipaddr:port` and enter the code.
- After pairing, confirm with `adb devices`. Pairing persists until explicitly forgotten, and the device reconnects automatically on the same network afterward.

This is materially more directly documented by Google than iOS's "Connect via Network" Xcode feature, which Expo's own docs don't address at all (per `ios-debugging-and-simulator.md`).

### Crash retrieval and symbolication

- **ProGuard/R8 mapping**: R8, Android's default code shrinker/obfuscator, writes a `mapping.txt` (typically `app/build/outputs/mapping/release/mapping.txt`) that maps obfuscated names back to source names. The official `retrace` tool deobfuscates a stack trace against it: `retrace path-to-mapping-file [path-to-stack-trace-file]`, shipped in Android SDK command-line tools since Android Studio 4.2. Source: [R8 retrace — Android Developers](https://developer.android.com/tools/retrace).
- **Google Play Console "Crashes & ANRs"**: auto-deobfuscation is conditional, not universal — **"If you're using an app bundle (AAB) and Android Gradle plugin version 4.1 or later, then there's nothing you need to do. We'll automatically grab the deobfuscation file from the bundle."** An **APK** upload instead requires manually uploading the mapping file ("Add ReTrace mapping file" on the release artifact). Source: [Deobfuscate or symbolicate crash stack traces — Play Console Help](https://support.google.com/googleplay/android-developer/answer/9848633?hl=en).
- **Sentry + EAS Build for Android — a real asymmetry with iOS**: Sentry's own Expo-integration docs describe only manual paths for Android — the Sentry Gradle plugin's mapping-upload task, or manual `sentry-cli upload-proguard`/`debug-files` commands against the mapping file under `android/app/build/outputs/mapping/`. Source: [Debug Symbols — Sentry for Expo](https://docs.sentry.io/platforms/react-native/guides/expo/upload-debug/). Expo's own `Using Sentry` guide, by contrast, states EAS Build "will automatically upload source maps for you" but makes **no mention of ProGuard, R8, or mapping files anywhere** — it does not document an Android-equivalent automatic path. Source: [Using Sentry — Expo Documentation](https://docs.expo.dev/guides/using-sentry/). Treat Android mapping upload as something you must wire explicitly (a Gradle plugin step or a `sentry-cli` CI step), not something EAS Build hands you for free the way it does for iOS.

### Asymmetry summary vs. iOS

| Aspect | iOS | Android |
| --- | --- | --- |
| Physical-device enablement | Developer Mode toggle (iOS 16+) + Trust This Computer + provisioning/signing tied to Apple ID tier | Developer options (7-tap) + USB debugging toggle + one-time RSA authorization — no signing identity needed for a debug install |
| Device count limits | 3 devices (free Apple ID) / unlimited (paid, $99/yr) | No enrollment or device-count gate for USB/dev-build installs |
| Wireless dev-server debugging | Xcode's "Connect via Network" — not documented by Expo | First-party Android 11+ Wireless debugging with QR/pairing-code flow, directly documented by Google |
| Crash-symbolication auto-upload via EAS + Sentry | Confirmed automatic for source maps (`SENTRY_AUTH_TOKEN`) | **Not confirmed automatic** — verify empirically; likely needs an explicit Gradle/`sentry-cli` step |
| Store-side auto-deobfuscation | N/A | Only for AAB + AGP 4.1+; APK uploads need a manual mapping-file upload |

## Section 2: Android Emulator Mechanics on a Mac (Including Apple Silicon)

### Prerequisites and Apple Silicon system image choice

1. Install Android Studio, which bundles the Android SDK and emulator.
2. Create a virtual device via the AVD Manager / Device Manager.
3. **On an Apple Silicon (M-series) Mac, choose an `arm64-v8a` system image**, not `x86_64`. Android Studio has shipped native Apple Silicon support since an early-2020s preview, with a steady stream of M1-specific bug fixes through 2023–2024 in the emulator's own release notes, confirming ongoing first-party support rather than a one-off preview. Sources: [Emulator release notes — Android Developers](https://developer.android.com/studio/releases/emulator) (confirms ongoing Apple Silicon support and fixes, though it does not state the arm64-recommendation in one explicit sentence); [Android Studio Apple Silicon preview announcement](https://androidstudio.googleblog.com/2020/12/android-emulator-apple-silicon-preview.html?m=1) (secondary/blog, describes the original preview). The "use arm64, not x86_64, on Apple Silicon" recommendation itself is corroborated consistently across community sources but was not found as one explicit sentence on a single official page in this pass — treat it as strongly-evidenced-but-not-verbatim-official, and confirm against the AVD Manager's own image labeling (arm64 images typically surface under the "Recommended" tab on an Apple Silicon Mac) when actually setting this up.

### Google Play vs. Google APIs vs. AOSP system images

Confirmed directly from Android's official AVD-management docs, [Create and manage virtual devices — Android Developers](https://developer.android.com/studio/run/managing-avds):

| Image type | Google Play Store app | Google Play services | Root (`adb root`) |
| --- | --- | --- | --- |
| Google Play | Yes | Yes | No — "signed with a release key... you can't get elevated privileges (root) with these images" |
| Google APIs | No | Yes | Yes |
| AOSP (no Google APIs) | No | No | Yes |

Practical implication: anything requiring a genuine signed-in Play Store session or Play Integrity testing needs the **Google Play** image specifically; a **Google APIs** image is enough for Play-Services-dependent SDKs (FCM, Maps) that don't need the Store app itself.

### Running an Expo app in the emulator — three-path comparison

Direct Android parity with the iOS Simulator's three-path table in `ios-debugging-and-simulator.md`:

| Path | Command | What it requires |
| --- | --- | --- |
| Expo Go / dev server | `npx expo start`, press **a** | Fastest loop; limited to Expo Go's built-in native modules |
| Local native build | `npx expo run:android` | Local Android Studio/SDK/Gradle toolchain |
| Cloud dev build, sideloaded | `eas build --profile development --platform android` → `adb install <path>.apk` | No local Android toolchain beyond `adb`; the resulting APK installs on either an emulator or a physical device with no Apple-style provisioning distinction between the two |

This project's own `mobile-prototype-testing/01-local-development-and-automated-tests.md` already documents the local-build and EAS-cloud-build commands for Android; the addition here is the explicit `adb install` sideload step for an **emulator** target specifically, and the direct three-way comparison to the equivalent iOS paths.

### Extended Controls — what can and cannot be simulated

Confirmed directly from [Extended controls, settings, and help — Android Developers](https://developer.android.com/studio/run/emulator-extended-controls):

| Feature | Emulator support |
| --- | --- |
| Fingerprint / biometric auth | Yes — Extended Controls → Fingerprint → select a fingerprint value → "Touch Sensor" (up to 10 simulated scans). Disabled on API 22 and below, and on Wear OS. This simulates the fingerprint-sensor API specifically, not a generic BiometricPrompt/face-unlock flow. |
| Location | Yes — including simulated movement along a route |
| Battery state | Yes — charge level, health, AC-charger-connected state |
| Cellular network conditions | Yes — network type (GSM/EDGE/HSDPA/etc.) plus voice/data scenarios including roaming and denied access |
| Rotation / device pose | Yes — Extended Controls → Virtual sensors → Device Pose |
| **Camera** | **Not real hardware passthrough**, but not a blank absence either: the Camera tab renders a synthetic AR-style scene (optionally seeded with your own images) when the emulator's virtual camera opens. This is a genuine, meaningful difference from the iOS Simulator, which provides zero camera simulation. Still not equivalent to a live camera feed for real-world photo-quality or OCR testing — relevant to this project's receipt-capture feature, which still needs physical-device verification regardless. |

Some Extended Controls options are only available when running the emulator in a standalone window outside Android Studio — worth knowing if the team standardizes on the embedded-in-IDE emulator view.

### What does not work correctly, or needs empirical verification

| Behavior | Emulator status | Confidence |
| --- | --- | --- |
| Play Integrity API strong/hardware attestation | Fails by design on an emulator (no hardware-backed attestation); Google is reported to have added a `MEETS_VIRTUAL_INTEGRITY` verdict specifically for emulator/CI use, but this was not independently confirmed against Play Integrity's own reference docs in this pass | Secondary — re-verify against `developer.android.com`'s Play Integrity reference before depending on it |
| SafetyNet Attestation | Reported as deprecated in favor of Play Integrity API | Unconfirmed this session — re-check if this project references SafetyNet anywhere |
| FCM push notifications | **Works end-to-end in the emulator** on a Google Play or Google APIs image (Android 6.0+), signed into a Google account under emulator Settings → Accounts — a materially easier story than iOS Simulator's push limitations | Secondary — Firebase's own "Get started" doc exists but wasn't fetched directly this session; the Google-account sign-in requirement came from a community walkthrough |
| Doze mode / background execution | Can be driven manually via ADB (`adb shell dumpsys battery unplug`, `adb shell dumpsys deviceidle step`) to cycle through Doze states, per Android's own official training doc — but real-world OEM variance in background restrictions is well known and not fully reproducible in the emulator | Official for the ADB mechanism; secondary for the "OEM variance" caveat |
| Performance representativeness for low-end target devices | The emulator runs at the development machine's hardware speed, which says nothing about a real low-end target device's CPU/RAM/thermal ceiling — the same caveat already documented for iOS Simulator | Reasoned inference, not independently sourced |

### No Android equivalent found for Xcode 27's "Device Hub"

No evidence surfaced of Google replacing or fundamentally restructuring the classic Android Emulator/AVD Manager UI, unlike Apple's in-progress Xcode 27 "Device Hub" transition documented in `ios-debugging-and-simulator.md`. Treat this as "nothing found," not "confirmed absent" — worth a quick re-check periodically.

## Section 3: Android-Specific Testing and CI Notes

### Play Console pre-launch report (Robo test / Firebase Test Lab)

- Mechanism, confirmed via Firebase's own Test Lab docs: a **Robo test** crawler "analyzes your app's UI and then explores it methodically by simulating user activities, without requiring you to write any code," surfacing crashes, display issues, and security findings across a real device farm. Source: [Beyond Pre-Launch Reports — Firebase](https://firebase.google.com/docs/test-lab/android/test-lab-play); [Use a pre-launch report to identify issues — Play Console Help](https://support.google.com/googleplay/android-developer/answer/9842757?hl=en).
- **Ambiguity flagged, not resolved**: the Play Console help page itself, re-fetched directly, states only that "Pre-launch reports are automatically generated when you upload an app bundle or APK, subject to capacity within our device lab" and does not specify which testing track triggers it or whether it's free — while the Firebase-hosted page uses legacy "alpha or beta channel" terminology that predates Play Console's current track names (internal/closed/open/production testing). **Do not assume a specific track or cost without checking a live Play Console account** — this is a live, unresolved discrepancy between two Google-owned pages, not something a written guide should assert confidently.
- Play Console developer registration itself is a confirmed **one-time US$25 fee**, no ongoing cost, covering unlimited app uploads/release tracks thereafter. Source: [Google Play Console registration — Play Console Help](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en).
- A secondary, 2026-dated community source describes a **new-account policy gate**: closed testing with a minimum of 12 opted-in testers active for 14 consecutive days before an account can apply for production access — a real lead-time constraint with no TestFlight equivalent. This was not independently verified against Play Console's own policy pages in this pass; confirm directly before building a release timeline around it. Source (secondary): [Google Play Closed Testing Requirements 2026](https://www.testerscommunity.com/blog/google-play-closed-testing-requirements-2026).

### Internal testing track setup

Confirmed directly from [Set up an open, closed, or internal test — Play Console Help](https://support.google.com/googleplay/android-developer/answer/9845334?hl=en):

1. Play Console → app → **Test and release → Testing → Internal testing → Testers tab → Create email list**; add tester emails.
2. Select that tester list on the Internal testing page.
3. **Create release**, upload the APK or AAB, fill in release details, roll out.
4. Testers see it "a few minutes" after publish — except the **first-ever** internal test for a brand-new app, which can take up to 48 hours.

### Maestro and Detox on Android

- **Maestro**, confirmed directly on its current docs page: **"Maestro automatically detects and connects to running emulators or physical devices... Maestro connects to your target via ADB... Maestro assumes the application is already installed on the target device/emulator before the test begins."** For a physical device, USB debugging must already be enabled (Section 1). In practice, a target should already be visible via `adb devices` before invoking `maestro test`. Source: [Android — Maestro Docs](https://docs.maestro.dev/get-started/supported-platform/android.md).
- **Maestro Cloud**: `maestro list-cloud-devices --platform=android` lists the current real-device catalog, directly parallel to the already-confirmed iOS device-farm support.
- **Detox**: supports `android.emulator` (boots a named AVD and connects) and `android.attached` (connects to an already-running device/emulator via `adb devices`, including Genymotion). Physical-device support via `android.attached` is reported as less reliable in community issue discussion — install succeeds but the Detox test server sometimes fails to connect over the physical-device path. Detox's own Android guidance also recommends installing **Test Butler** to suppress crash/ANR system dialogs that would otherwise block automated runs. This reinforces the existing recommendation (from `mobile-test-strategy.md`) to treat Detox as a fallback rather than the default, with an Android-specific reason added: weaker reported physical-device reliability, on top of the already-noted lack of first-party Expo/EAS wiring. Sources (secondary): [Detox for Android](https://wix.github.io/Detox/docs/19.x/introduction/android/); [Running Detox on a real Android device — supported? #968](https://github.com/wix/Detox/issues/968).

### CI pipeline friction: APK vs. AAB, and Gradle caching

- **APK vs. AAB, confirmed directly from Expo's docs**: EAS Build's default Android output is an **AAB**, "optimized for distribution to the Google Play Store," and AABs "can't be installed directly on your device." To force an installable **APK** instead, set any of `developmentClient: true`, `distribution: "internal"`, `android.buildType: "apk"`, or a custom `android.gradleCommand` in the relevant `eas.json` profile. Source: [Build APKs for Android devices — Expo Documentation](https://docs.expo.dev/build-reference/apk/). This matches what `mobile-prototype-testing/02-android-physical-device-testing.md` already states about the `preview` profile producing an APK — the addition here is the exact `eas.json` levers behind that choice.
- **Gradle build caching**: EAS Build supports Gradle caching for Android via the `EAS_GRADLE_CACHE=1` environment variable (settable in account settings or `eas.json`), with Expo's changelog claiming roughly a 50% build-time reduction on cache hits — the first build after enabling it populates the cache and sees no speedup. Source: [Gradle cache for Android builds — Expo changelog](https://expo.dev/changelog/gradle-cache). This is a concrete, Android-specific addition worth folding into the CI pipeline section of the hands-on guide; no equivalent Xcode-side build-cache flag was surfaced in the iOS research.

## Open Items to Verify Empirically or Against a Live Account

- Whether EAS Build auto-uploads the Android ProGuard/R8 mapping file to Sentry, or whether it truly requires a manual Gradle-plugin/`sentry-cli` step — test against this project's actual EAS Android build configuration.
- The exact wording of Android Studio's AVD Manager UI (does an Apple Silicon Mac genuinely surface arm64 images under a "Recommended" tab?) — confirm by opening AVD Manager directly rather than trusting a written source.
- Play Console pre-launch report's exact triggering track and cost — check inside a live Play Console account before relying on it as a release gate.
- The Play Integrity API's `MEETS_VIRTUAL_INTEGRITY` verdict and SafetyNet's deprecation status — both surfaced only in search snippets, not independently fetched from an official reference page.
- The 12-tester/14-day new-account closed-testing policy figure — re-verify against Play Console's own policy center, since Play Store policy is exactly the kind of thing that drifts.
- Current Android Studio stable version/name — check `developer.android.com/studio/releases` directly at guide-writing time rather than citing a number from this research pass.

## Sources

| Source | Publisher | Type | Relevance |
| --- | --- | --- | --- |
| [Debugging Basics — React Native](https://reactnative.dev/docs/debugging) | React Native | Primary | DevTools cross-platform access, Dev Menu shortcuts |
| [React Native 0.76 release notes](https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture) | React Native | Primary | DevTools introduced in 0.76, replaces Flipper |
| [Logcat command-line tool](https://developer.android.com/tools/logcat) | Android Developers | Primary | `adb logcat` usage, tag filtering, Logcat GUI pointer |
| [View and write logs with Logcat](https://developer.android.com/studio/debug/am-logcat) | Android Developers | Primary | Android Studio Logcat window |
| [Configure on-device developer options](https://developer.android.com/studio/debug/dev-options) | Android Developers | Primary | Enabling Developer options / USB debugging |
| [Run apps on a hardware device](https://developer.android.com/studio/run/device) | Android Developers | Primary | RSA-key authorization dialog (verbatim quote) |
| [Android Debug Bridge (adb)](https://developer.android.com/tools/adb) | Android Developers | Primary | Wireless debugging pairing flow |
| [R8 retrace](https://developer.android.com/tools/retrace) | Android Developers | Primary | ProGuard/R8 mapping.txt deobfuscation |
| [Deobfuscate or symbolicate crash stack traces](https://support.google.com/googleplay/android-developer/answer/9848633?hl=en) | Play Console Help | Primary | AAB auto-deobfuscation vs. APK manual upload |
| [Debug Symbols — Sentry for Expo](https://docs.sentry.io/platforms/react-native/guides/expo/upload-debug/) | Sentry | Primary | Android mapping upload is manual, unlike iOS |
| [Using Sentry — Expo Documentation](https://docs.expo.dev/guides/using-sentry/) | Expo | Primary | Confirms no Android-specific mapping guidance |
| [Emulator release notes](https://developer.android.com/studio/releases/emulator) | Android Developers | Primary | Ongoing Apple Silicon support history |
| [Android Studio Apple Silicon preview announcement](https://androidstudio.googleblog.com/2020/12/android-emulator-apple-silicon-preview.html?m=1) | Android Studio blog | Secondary | Original Apple Silicon preview context |
| [Create and manage virtual devices](https://developer.android.com/studio/run/managing-avds) | Android Developers | Primary | Google Play vs. Google APIs vs. AOSP images |
| [Extended controls, settings, and help](https://developer.android.com/studio/run/emulator-extended-controls) | Android Developers | Primary | Fingerprint, location, battery, cellular, camera, rotation |
| [Optimize for Doze and App Standby](https://developer.android.com/training/monitoring-device-state/doze-standby) | Android Developers | Primary | Doze simulation via ADB |
| [Beyond Pre-Launch Reports](https://firebase.google.com/docs/test-lab/android/test-lab-play) | Firebase | Primary (legacy terminology) | Pre-launch report mechanism |
| [Use a pre-launch report to identify issues](https://support.google.com/googleplay/android-developer/answer/9842757?hl=en) | Play Console Help | Primary (ambiguous on cost/track) | Pre-launch report triggering |
| [Set up an open, closed, or internal test](https://support.google.com/googleplay/android-developer/answer/9845334?hl=en) | Play Console Help | Primary | Internal testing track setup |
| [Google Play Console registration](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en) | Play Console Help | Primary | $25 one-time developer fee |
| [Google Play Closed Testing Requirements 2026](https://www.testerscommunity.com/blog/google-play-closed-testing-requirements-2026) | testerscommunity.com | Secondary | 12-tester/14-day new-account gate — unverified |
| [Android — Maestro Docs](https://docs.maestro.dev/get-started/supported-platform/android.md) | Maestro | Primary | Confirms emulator + physical-device support over ADB |
| [Detox for Android](https://wix.github.io/Detox/docs/19.x/introduction/android/) | Wix/Detox | Primary (project docs) | `android.emulator` vs. `android.attached`, Test Butler |
| [Running Detox on a real Android device — supported? #968](https://github.com/wix/Detox/issues/968) | GitHub/Wix | Secondary | Physical-device reliability concerns |
| [Build APKs for Android devices](https://docs.expo.dev/build-reference/apk/) | Expo | Primary | EAS default AAB output, APK-forcing config |
| [Gradle cache for Android builds](https://expo.dev/changelog/gradle-cache) | Expo | Primary | `EAS_GRADLE_CACHE=1`, ~50% build-time reduction |
| Related, this repo | — | — | `ai-planning/research/mobile-prototype-testing/` (M1-specific acceptance test script); `ios-debugging-and-simulator.md` and `mobile-test-strategy.md` (this folder, iOS counterparts) |

# Local Development And Automated Tests

Research date: 2026-08-16

## Goal

Give the developer a short feedback loop for React Native code, then verify the M1 flows before handing a build to a physical-device tester. Execute these steps only after the component repository exists and its M1 OpenSpec proposal is approved.

## 1. Prepare The Developer Computer

1. Install Node.js LTS and Git.
2. Install Android Studio and create an Android Emulator if you will run Android locally.
3. Install Xcode if you will use the iOS Simulator or compile an iOS development build locally. Xcode requires macOS.
4. Clone the approved mobile repository and use the Node/package-manager version committed by that project.
5. In the repository root, install the project dependencies with its committed package-manager command, usually `npm ci` when a lockfile is present.

Expo documents the platform-tooling requirements for local Android and iOS development builds. [Expo environment setup](https://docs.expo.dev/get-started/set-up-your-environment/?device=physical&mode=development-build&platform=android)

## 2. Add The Testing Foundation

The component proposal should add these dependencies and scripts when it scaffolds the application. Do not independently install mismatched React Native versions; use Expo's installer so package versions remain aligned with the selected Expo SDK.

```bash
npx expo install expo-dev-client
npx expo install jest-expo jest @types/jest --dev
npx expo install @testing-library/react-native --dev
```

Add scripts with these purposes, using names chosen by the repository:

```json
{
  "scripts": {
    "lint": "...",
    "typecheck": "...",
    "test": "jest",
    "test:ci": "jest --runInBand"
  }
}
```

Expo recommends `jest-expo` as its Jest preset and React Native Testing Library for component tests. [Expo unit testing](https://docs.expo.dev/develop/unit-testing/)

## 3. Build The First Development Client

Choose one method. Both produce a project-specific development build.

### Local Native Build

1. Connect an Android device or start an Android Emulator.
2. For an Android physical device, enable USB debugging and accept the computer's debug prompt.
3. Run:

```bash
npx expo run:android --device
```

4. For the iOS Simulator, run `npx expo run:ios`.
5. For a locally connected iPhone, use `npx expo run:ios --device`; this requires macOS/Xcode and a unique iOS bundle identifier.

### EAS Cloud Development Build

1. Obtain approval to use the HRF-controlled Expo/EAS account.
2. Install and authenticate EAS CLI in the approved project environment.
3. Run `eas build:configure` once to create the project build configuration.
4. Build the Android development client:

```bash
eas build --platform android --profile development
```

5. Open the EAS build link or scan its QR code on the device and install the generated development build.

Expo documents both local compilation and cloud development-build paths. [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)

## 4. Run The Day-To-Day Developer Loop

1. Start the development server:

```bash
npx expo start --dev-client
```

2. Launch the installed development client on the emulator, simulator, or USB-connected Android phone.
3. Make a small TypeScript/UI change and confirm Fast Refresh updates the app.
4. Run checks before handing work to another tester:

```bash
npm run lint
npm run typecheck
npm run test:ci
```

5. Rebuild the native development client when a native dependency, native permission/configuration, or Expo SDK version changes. For Continuous Native Generation projects, use `npx expo prebuild --clean` before rebuilding when required.

Ordinary TypeScript/JavaScript changes do not require a native rebuild; Expo documents the rebuild triggers. [Expo development-build workflow](https://docs.expo.dev/develop/development-builds/introduction/)

## 5. Add Maestro End-To-End Tests

1. Install Java 17 or later and verify it with `java -version`.
2. On macOS, install Maestro:

```bash
brew tap mobile-dev-inc/tap
brew install mobile-dev-inc/tap/maestro
maestro --help
```

3. Create a `.maestro/` directory in the mobile repository.
4. Add stable `testID` values to actions and inputs, such as `record-sale`, `amount-input`, `review-sale`, and `confirm-sale`.
5. Create flows for manual sale, manual expense, missing amount, speech fallback, receipt fallback, delayed-sync attention, English smoke, and French smoke.
6. Run a flow against an installed development build or preview build:

```bash
maestro test .maestro/manual-sale.yaml
```

Use `testID`, not visible copy, for selectors because M1 renders English and French. Maestro supports React Native on both platforms and explicitly recommends `testID` selectors when translated labels would be brittle. [Maestro React Native support](https://docs.maestro.dev/platform-support/react-native) [Maestro installation](https://docs.maestro.dev/getting-started/installing-maestro/macos)

## 6. Minimum Automated Coverage

- Form validation: amount required, amounts represented in minor units, date/purpose/note behavior.
- Domain/use-case behavior: confirmation creates a local transaction and local outbox identity exactly once.
- Local persistence adapter: confirmed record survives repository reopen/restart simulation.
- UI states: empty Home, populated Home, manual entry, review, saved locally, validation error, speech/receipt fallback, and needs attention.
- Localization: English fallback and French rendering for a compact smoke suite.
- Maestro flow: user-visible happy paths and fallbacks on at least Android before each preview build.

Do not use a component test as a substitute for the physical-device restart and installation checks.

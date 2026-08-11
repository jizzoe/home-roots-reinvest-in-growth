# Phase 01 Research: Mobile Foundation With React Native, Expo, And TypeScript

Date: 2026-08-08

Related plan:

- `../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md`

## Question

Can the mobile bookkeeping proof of concept start with React Native, Expo, and TypeScript as a single shared codebase for iPhone and Android?

## High-Level Summary

React Native is a way to build real mobile apps for iPhone and Android using React and JavaScript/TypeScript instead of writing two fully separate native apps in Swift and Kotlin.

Expo is a framework and toolchain built around React Native. It makes project setup, local development, native-device features, builds, testing installs, updates, and app-store submission easier. In practical terms, React Native is the app framework, and Expo is the paved road for building and shipping React Native apps.

TypeScript is JavaScript with static types. For this project, TypeScript matters because transactions, sync queue records, receipt attachments, AI proposals, and backend API responses should have explicit shapes that AI-assisted coding can follow and tests can verify.

The short version:

- React Native answers: "Can I build one mobile app codebase for iOS and Android?"
- Expo answers: "Can I build, run, configure, and ship that app without becoming an iOS/Android build expert first?"
- TypeScript answers: "Can I make the app's data contracts explicit enough to avoid fragile AI-generated code?"

For this project, the answer is yes: React Native + Expo + TypeScript is a strong starting point for the proof of concept.

## 101 Background

### What Is React Native?

React Native is an open-source framework for building native mobile apps with React.

In a normal native mobile project:

- iPhone apps are usually written in Swift or Objective-C.
- Android apps are usually written in Kotlin or Java.
- A team often maintains two separate codebases.

With React Native:

- The app logic and UI are written mostly in JavaScript or TypeScript.
- The UI is described with React components.
- React Native renders to real native mobile UI building blocks on iOS and Android.
- You can still write platform-specific code when the two platforms need different behavior.

React Native is not just a website wrapped in an app shell. It uses native mobile views and APIs, but lets developers describe the app using React concepts.

### What Is Expo?

Expo is a React Native framework, SDK, and service ecosystem.

Expo provides:

- a project generator: `create-expo-app`
- a local development server: Expo CLI
- a library set for mobile features: Expo SDK
- development builds for testing app-specific native capabilities
- cloud builds for iOS and Android: EAS Build
- internal test distribution
- app-store binary upload support: EAS Submit
- over-the-air JavaScript updates: EAS Update
- configuration tooling for native permissions, icons, splash screens, plugins, and native modules

Without Expo, a React Native project can still work, but the developer owns more of the native iOS and Android setup. With Expo, the project starts with a more integrated workflow.

### What Is TypeScript?

TypeScript is a typed layer on top of JavaScript. It lets the codebase say things like:

```ts
type TransactionType = "sale" | "expense";

type LocalTransaction = {
  localId: string;
  type: TransactionType;
  amountMinorUnits: number;
  currency: "USD";
  syncStatus: "local" | "queued" | "syncing" | "synced" | "failed";
};
```

Those types do not replace backend validation, but they help the app, AI coding tools, and tests agree on the shape of the data.

### What Is A Development Build?

Expo Go is a generic app from Expo that can run simple Expo projects quickly. It is useful for tutorials and first-screen experiments.

A development build is a custom debug version of your own app. It includes the native libraries and native configuration your app actually needs. For a serious prototype, development builds are the better default because they test the app in a runtime closer to production.

### What Is EAS?

EAS means Expo Application Services. It is Expo's hosted build, submit, update, and automation platform.

The relevant parts for this project are:

- EAS Build: creates iOS and Android app binaries.
- EAS internal distribution: shares installable prototype builds with testers.
- EAS Submit: uploads app binaries to Apple App Store Connect and Google Play Console.

## Foundational Concepts

### Component-Based UI

React Native apps are built from components. A component is a reusable piece of UI plus behavior.

Common React Native components include:

- `View`: layout container
- `Text`: text display
- `TextInput`: keyboard input
- `Image`: image display
- `ScrollView` / `FlatList`: scrolling content
- `Pressable`: touch interaction

For the bookkeeping app, a transaction-entry screen will be assembled from these primitives: labels, inputs, toggles, buttons, status indicators, and list rows.

### Native Components

React Native components map to native platform UI. For example, a React Native text input becomes an iOS or Android native text input under the hood.

This matters because the app feels more like a real mobile app than a basic web page, while still allowing shared code.

### Platform Differences

One React Native codebase does not mean iOS and Android are identical. The platforms differ in:

- permissions
- keyboard behavior
- camera behavior
- file paths
- background execution
- app signing and installation
- visual conventions

React Native handles many differences, and it also provides escape hatches:

- `Platform.OS`
- `Platform.select(...)`
- platform-specific files such as `ReceiptCapture.ios.tsx` and `ReceiptCapture.android.tsx`

Use these only when there is a real platform difference.

### Managed Workflow

Expo managed workflow means the app does not directly maintain committed `ios/` and `android/` native project directories at first. Instead, Expo generates native projects from app configuration, installed packages, and config plugins when builds need them.

This keeps early development focused on the app and product architecture instead of native project maintenance.

### Continuous Native Generation

Continuous Native Generation is Expo's model for generating native iOS/Android project files from configuration. If native behavior needs to be configured, the preferred path is usually app config or config plugins instead of hand-editing native files.

The practical rule:

- Prefer Expo SDK libraries and config plugins.
- Avoid manually editing generated native projects unless there is a clear reason.

### Expo Go Versus Development Builds

Expo Go:

- fastest for beginner learning and simple UI experiments
- no custom native code
- limited to what is included in the Expo Go app

Development builds:

- custom runtime for this app
- supports native libraries and app-specific native configuration
- better for production-like prototype work

For this project, Expo Go is acceptable for the first screen. Development builds should be used once the app touches native capabilities such as SQLite, camera, secure storage, or custom permissions.

### Mobile Build And Distribution

Mobile apps are not deployed like websites.

For Android:

- APK files can be installed directly for internal testing.
- Play Store release usually uses Android App Bundles.

For iOS:

- physical-device installs require Apple signing/provisioning.
- ad hoc internal distribution requires registered devices.
- TestFlight requires App Store Connect upload and Apple processing.

EAS helps with the build and signing workflow, but it does not remove Apple and Google account requirements.

### Local Device Capabilities

The eventual app needs device features:

- SQLite for offline records
- camera/photo capture for receipts
- local file storage for offline receipt images
- secure storage for auth tokens

Expo has first-party libraries for these. That makes Expo a reasonable starting point.

## Baeldung-Style Technology Introductions

### React Native In Practical Terms

React Native lets developers write mobile screens using React components:

```tsx
import { View, Text, TextInput, Pressable } from "react-native";

export function TransactionEntry() {
  return (
    <View>
      <Text>Amount</Text>
      <TextInput keyboardType="decimal-pad" />
      <Pressable>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
}
```

The code looks web-adjacent if you know React, but the components are React Native components, not HTML elements. There is no `<div>` or `<button>` in normal native screens.

For this project, React Native is valuable because the same transaction-entry workflow can run on iPhone and Android without building two separate native apps.

### Expo In Practical Terms

Expo wraps the React Native development lifecycle:

```bash
npx create-expo-app@latest mobile-bookkeeping-poc --template default@sdk-57
cd mobile-bookkeeping-poc
npx expo start
```

That creates and runs a mobile app project.

When the app needs a custom native runtime:

```bash
npx expo install expo-dev-client
eas build --platform android --profile development
eas build --platform ios --profile development
```

That creates installable development builds.

For this project, Expo is valuable because it shortens the path from "idea" to "running app on phone" and reduces early native build complexity.

### TypeScript In Practical Terms

TypeScript makes records explicit:

```ts
type SyncStatus = "local" | "queued" | "syncing" | "synced" | "failed";

type TransactionDraft = {
  type: "sale" | "expense";
  amountMinorUnits: number;
  currencyCode: string;
  note?: string;
};
```

This helps prevent accidental cases like:

- treating `"10.00"` as a number
- mixing display currency with stored currency
- posting a transaction without a type
- letting an AI proposal bypass confirmation

For this project, TypeScript should be used seriously, but not as a substitute for backend validation.

## Learn More

Best first reads:

- React Native introduction: https://reactnative.dev/docs/getting-started
- React Native core components: https://reactnative.dev/docs/components-and-apis
- React Native platform-specific code: https://reactnative.dev/docs/platform-specific-code.html
- Expo tutorial using React Native and Expo: https://docs.expo.dev/tutorial/introduction/
- Expo create a project: https://docs.expo.dev/get-started/create-a-project/
- Expo development builds: https://docs.expo.dev/develop/development-builds/introduction/
- Expo EAS tutorial: https://docs.expo.dev/tutorial/eas/introduction/
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- TypeScript Everyday Types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

Good search terms for Baeldung-style follow-up reading:

- `React Native introduction components props state`
- `Expo development builds vs Expo Go`
- `Expo EAS Build tutorial`
- `TypeScript interfaces type aliases union types`
- `React Native platform specific code iOS Android`

## Recommendation

Start with Expo + React Native + TypeScript.

Use Expo managed workflow with development builds, not bare React Native, for the first proof of concept. Expo Go is acceptable for the first one-screen UI check, but the project should move to a development build as soon as it uses app-specific native capabilities such as camera configuration, SQLite, secure storage behavior, native permissions, or any library outside Expo Go's included runtime.

This is a good fit for the proposed first prototype:

1. One TypeScript codebase can target iOS and Android.
2. Expo provides a fast project bootstrap and local development path.
3. Development builds provide a realistic app runtime while preserving Expo's build/config workflow.
4. EAS Build can produce installable Android and iOS binaries without maintaining native projects directly.
5. Expo SDK has first-party libraries for likely early needs: SQLite, camera, file storage, and secure token storage.

## Decision

Use this as the default mobile foundation:

- Runtime/framework: React Native through Expo
- Language: TypeScript
- Workflow: Expo managed workflow with Continuous Native Generation
- Build path: Expo development builds via EAS Build
- First local test path: Expo Go only if the first screen uses no custom native runtime needs
- iOS/Android distribution for prototype testers: EAS internal distribution
- App store path later: EAS Submit

Do not start with bare React Native unless a required library or device capability cannot be supported through Expo SDK, Expo Modules, autolinking, or config plugins.

## Why This Fits

### Single Codebase For iOS And Android

React Native is explicitly designed for cross-platform native app development. It also supports controlled platform differences through the `Platform` module and platform-specific file extensions such as `.ios.tsx` and `.android.tsx`. That means the project can keep one shared TypeScript app while still isolating small platform-specific differences when required.

For this project, that is exactly the desired shape: one app for iPhone and Android, with platform-specific handling only where device behavior diverges.

### Expo Speeds Up The First Prototype

Expo's current development workflow starts from `create-expo-app`, supports TypeScript, and can run quickly in Expo Go for simple prototypes. For real projects, Expo recommends development builds. A development build is effectively a project-specific version of Expo Go that includes the app's own native libraries and native configuration.

This matters because the bookkeeping app is likely to need:

- SQLite
- camera/photo capture
- local file storage
- secure token storage
- permission text and native configuration
- later Sentry, speech/audio, push notifications, or other native-linked libraries

Starting with Expo development builds keeps the prototype close to the eventual production runtime without forcing direct ownership of iOS and Android native projects on day one.

### TypeScript Is The Right Default

Expo has first-class TypeScript support, and current React Native projects also target TypeScript by default. This is important for this project because the app will eventually pass around structured records:

- local transactions
- sync queue operations
- receipt file references
- AI proposals
- validation errors
- server sync responses

The codebase should use strict TypeScript for these domain records early, and add runtime validation at API/storage boundaries in a later implementation step.

## Prototype Start Path

### Fastest First Screen

Use this path for the first one-screen app:

```bash
npx create-expo-app@latest mobile-bookkeeping-poc --template default@sdk-57
cd mobile-bookkeeping-poc
npx expo start
```

Run on:

- iPhone: Expo Go for the first screen, or iOS Simulator on macOS.
- Android: Expo Go, Android Emulator, or physical Android device.

This path is enough only while the app stays inside Expo Go's runtime.

As of the current Expo docs reviewed on 2026-08-08, Expo notes an SDK transition period where `create-expo-app@latest` without an explicit template can create a different SDK version for Expo Go compatibility. For this project, prefer an explicit template version so the prototype's SDK baseline is intentional. If Expo Go compatibility on a physical device is the immediate priority, re-check the current Expo `create-expo-app` docs and use the Expo Go-compatible template they recommend at that time.

### Recommended Development Build Path

Move to a development build before adding real camera, SQLite, file, secure storage, or other app-specific native configuration:

```bash
npm install --global eas-cli
eas login
eas build:configure
npx expo install expo-dev-client
eas build --platform android --profile development
eas build --platform ios --profile development
```

Notes:

- Android development builds can be installed on a device from the EAS build link/QR code.
- iOS physical-device builds require Apple signing/provisioning. EAS can manage much of this, but a paid Apple Developer account is required for ad hoc/internal distribution to physical iPhones.
- iOS Simulator builds do not require the same physical-device provisioning path.

### Internal Tester Distribution

For prototype sharing outside the developer machine, use EAS internal distribution:

- Android: build an APK that testers can install directly after accepting Android's sideloading/security warning.
- iOS: use ad hoc or enterprise provisioning. Ad hoc distribution requires registered device UDIDs and a paid Apple Developer account.

This avoids full app-store review for early prototype installs.

### App Store Submission Path Later

When ready for TestFlight or store release:

```bash
eas build --platform all
eas submit --platform ios
eas submit --platform android
```

Important limitation: EAS Submit uploads binaries, but store listings, screenshots, release notes, and many app metadata tasks still need to be managed separately in App Store Connect and Google Play Console, unless additional metadata automation is added.

## Native Capability Fit For This Project

### SQLite

Expo SQLite supports Android and iOS and provides async database APIs, transactions, hooks, and a SQLite-backed key-value store. This is sufficient for the Phase 2 offline-first spike.

Open implementation questions for Phase 2:

- Whether to use raw Expo SQLite APIs, an ORM/query layer, or a small repository wrapper.
- How to handle migrations.
- Whether the local database stores only pending operations or a recent queryable transaction projection.

### Camera And Receipts

Expo Camera supports Android and iOS and can take photos from the app, with permission handling and native image references. This is sufficient for a simple receipt-photo MVP.

Open implementation questions for Phase 5:

- Whether to use Expo Camera directly or start with image picker/photo selection.
- Whether receipt scanning/cropping is needed in MVP, or whether simple photo capture is enough.

### Local Files

Expo FileSystem can work with app-controlled document/cache directories and local `file://` URIs. This is a reasonable fit for offline receipt image references and upload queues.

Open implementation questions for Phase 5:

- Which files belong in durable document storage versus cache.
- How to clean up local files after successful upload.
- How to handle partial upload/download behavior differences between platforms.

### Secure Token Storage

Expo SecureStore provides encrypted local key-value storage on Android and iOS. It is appropriate for auth/session token storage, not for large or irreplaceable business data.

Open implementation questions for later auth work:

- Token refresh strategy.
- Whether biometric protection is useful or harmful for low-friction recipient workflows.
- How to handle SecureStore platform differences around uninstall/reinstall behavior.

## What Would Force A Different Path

Reconsider Expo managed/development builds if:

- A required library does not work with Expo, CNG, autolinking, Expo Modules, or config plugins.
- The app needs repeated direct editing of native iOS/Android project files.
- A required background sync behavior cannot be implemented reliably within mobile OS constraints and Expo-supported APIs.
- Performance on target low-end Android devices is unacceptable after focused optimization.
- Receipt scanning requires native SDK integration that lacks workable Expo config-plugin support.

Reconsider React Native entirely if:

- The app requires extensive platform-specific native UI or device integration.
- Offline data volume or image-processing needs push too much work onto the JavaScript thread.
- Field testing shows unacceptable performance on the lowest-end target devices.

None of these are known blockers for the first proof of concept.

## Alternatives Considered

### Bare React Native From The Beginning

Pros:

- Direct control over native iOS and Android projects.
- Easier to adopt any native library regardless of Expo support.

Cons:

- More native build and upgrade burden from day one.
- More setup before a simple prototype is installable.
- More platform-specific project maintenance.

Assessment:

- Not recommended for the first prototype. Keep it as an escape hatch.

### Native iOS And Native Android Apps

Pros:

- Maximum platform control and native performance.

Cons:

- Two codebases.
- More specialized native expertise required.
- Slower iteration for a solo/spec-driven build.

Assessment:

- Not aligned with the stated requirement to avoid two separate codebases.

### Flutter

Pros:

- Strong cross-platform story.
- Good performance and mature mobile tooling.

Cons:

- Different language and ecosystem.
- Less aligned with the proposed TypeScript/React web stack.
- Shared domain/API types with a TypeScript web app are less direct.

Assessment:

- Plausible alternative if React Native/Expo fails, but not the best starting point for this project.

### Progressive Web App

Pros:

- Fastest deployment.
- One web codebase.

Cons:

- Mobile camera, local storage, offline behavior, native install, background behavior, and app-store distribution are less predictable across devices.
- Weaker fit for field use where native app affordances matter.

Assessment:

- Useful for back-office or demos, not recommended for the recipient mobile app.

## Implementation Guardrails For AI-Assisted Coding

When using AI-assisted implementation, enforce these constraints:

- Keep one shared React Native codebase by default.
- Allow `.ios.tsx` or `.android.tsx` files only when there is a specific platform behavior difference.
- Keep domain types for transactions, sync operations, and statuses explicit.
- Do not hide persistence behind vague app state; local durability is central to the product.
- Do not post AI/speech-derived transactions directly to the ledger.
- Use Expo-supported libraries first before adding third-party native dependencies.
- If a third-party native dependency is proposed, require evidence that it supports Expo development builds/CNG or has a config plugin.

## Phase 1 Completion Criteria

Phase 1 research is sufficient to proceed when:

- The default mobile platform recommendation is documented.
- The first-screen local development path is documented.
- The development build path is documented.
- iOS and Android install constraints are documented.
- Expo Go versus development build tradeoffs are documented.
- Native capability risks for SQLite, camera, files, and secure storage are documented.
- Alternatives and exit criteria are documented.

This document satisfies those criteria.

## Recommended Next Action

Create the first mobile prototype spec:

- `specs/mobile-poc/one-screen-transaction-entry.md`

Then build the Expo one-screen app with:

- amount input
- sale/expense toggle
- save button
- local status display
- placeholder business identity

Do not add SQLite yet unless combining Phase 1 and Phase 2 intentionally. Phase 1 should prove the app can run and be installed on the target platform paths.

## Sources

- Expo: Develop an app with Expo: https://docs.expo.dev/workflow/overview/
- Expo: create-expo-app: https://docs.expo.dev/more/create-expo/
- Expo: Using TypeScript: https://docs.expo.dev/guides/typescript/
- Expo: Introduction to development builds: https://docs.expo.dev/develop/development-builds/introduction/
- Expo: EAS Build introduction: https://docs.expo.dev/build/introduction/
- Expo: Create your first build: https://docs.expo.dev/build/setup/
- Expo: Internal distribution: https://docs.expo.dev/build/internal-distribution/
- Expo: Distribution overview: https://docs.expo.dev/distribution/introduction/
- Expo: EAS Submit for Android: https://docs.expo.dev/submit/android/
- Expo: Submit to app stores: https://docs.expo.dev/deploy/submit-to-app-stores/
- Expo: Expo Orbit: https://docs.expo.dev/build/orbit/
- Expo: Continuous Native Generation: https://docs.expo.dev/workflow/continuous-native-generation/
- Expo: Config plugins introduction: https://docs.expo.dev/config-plugins/introduction/
- Expo: Add custom native code: https://docs.expo.dev/workflow/customizing/
- Expo: FAQ, Expo Go limitations: https://docs.expo.dev/faq/
- Expo: SQLite: https://docs.expo.dev/versions/v54.0.0/sdk/sqlite/
- Expo: Camera: https://docs.expo.dev/versions/v54.0.0/sdk/camera/
- Expo: FileSystem: https://docs.expo.dev/versions/v54.0.0/sdk/filesystem/
- Expo: FileSystem legacy directories: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy/
- Expo: SecureStore: https://docs.expo.dev/versions/v54.0.0/sdk/securestore/
- React Native: Using TypeScript: https://reactnative.dev/docs/typescript
- React Native: Platform-specific code: https://reactnative.dev/docs/platform-specific-code.html

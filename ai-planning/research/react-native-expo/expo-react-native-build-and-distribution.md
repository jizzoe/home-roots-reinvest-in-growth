# React Native + Expo Build and Distribution Research

Research date: 2026-08-15
Scope: React Native and Expo learning, local Android development, and delivery of an Expo/React Native app from GitHub to Android and iOS devices.

## Decision Summary

**Recommended starting model:** GitHub Actions for validation, Expo Application Services (EAS) for signed cloud builds, TestFlight for iOS testing, and Google Play internal testing for Android pilot testing. Use EAS Update only for compatible JavaScript/assets changes after the native binary and runtime-version policy are in place.

This keeps iOS signing/macOS build complexity out of the first project infrastructure while retaining GitHub as the delivery trigger. EAS Build supports GitHub and any CI provider, builds Android/iOS binaries, supports internal distribution, manages signing credentials if desired, and integrates with store submission and `expo-updates`. [EAS Build documentation](https://docs.expo.dev/build/introduction/)

## Fastest Path to a Real Android Phone

For an experienced engineer new to mobile, use two distinct paths. They answer different questions and should not be conflated.

| Path | What it proves | Phone requirement | When to use it |
| --- | --- | --- | --- |
| Expo Go | The React Native UI and JavaScript/TypeScript behavior run on a physical Android device. Fast Refresh provides a tight edit-test loop. | Install the Expo Go app and scan the development-server QR code. The phone and computer normally share Wi-Fi; `--tunnel` is the fallback. | First hour, screen and interaction work, and rapid AI-assisted iteration. |
| Expo development build | The project’s own native Android app runs on the device and can include custom native modules, native configuration, and developer tools. | Install the project’s signed development APK through a local USB build or EAS Build. | Start this as soon as the prototype depends on native configuration or a library Expo Go cannot include. |
| EAS internal-distribution preview APK | A non-developer can install and run a versioned build without a development server. | Share the signed APK installation link with an authorized tester. | M1 acceptance and staff/tester feedback. |

**The shortest first-phone loop** needs only Node.js LTS, a terminal, an Android phone with Expo Go, and a shared network. In a new, approved mobile component repository:

```bash
npx create-expo-app@latest enterprise-growth-mobile
cd enterprise-growth-mobile
npx expo start
```

Open Expo Go on Android, scan the QR code, then change a visible screen. The device receives the JavaScript bundle from the local development server and Fast Refresh usually shows the edit within seconds. If the local network prevents discovery, use `npx expo start --tunnel`. Expo documents this exact flow, including an AI-assisted version of the tutorial. [Create your first app](https://docs.expo.dev/tutorial/create-your-first-app/) [Build with AI: first app](https://docs.expo.dev/tutorial/build-with-ai/create-your-first-app/)

This is the quickest evidence that the developer workflow works on a physical device. It is **not** the M1 installable-build deliverable: Expo describes Expo Go as a learning/playground client, while a development build is the project’s own native app and is the intended route for production projects. [Expo environment setup](https://docs.expo.dev/get-started/set-up-your-environment/?device=physical&mode=development-build&platform=android) [Development builds](https://docs.expo.dev/develop/development-builds/introduction/)

## From First Screen to an Installable APK

Move to an Android development build once the basic screen runs, rather than waiting until the entire prototype is complete.

1. Install Node.js LTS and use a supported package manager. Keep the Expo SDK, React Native, and Expo module versions aligned through Expo tooling; do not independently upgrade React Native packages because an AI suggested a newer version.
2. Create the Expo/React Native TypeScript project and run it in Expo Go as above.
3. Add only the M1 phase-1 building blocks: Expo Router for navigation, `expo-sqlite` for durable local data, a typed domain model, and a sync-client interface that initially uses the local stub.
4. Create an Expo organization owned by HRF, then configure EAS. Use a project-specific package identifier, for example `org.homeroots.enterprisegrowth.preview`, not a personal identifier.
5. Create and install a development build. EAS cloud builds avoid installing Android build tooling locally; the equivalent local route requires Android Studio, Android SDK, a JDK, USB debugging, and `npx expo run:android --device`.
6. Add a `preview` build profile with `distribution: "internal"`; build a signed APK and install it from the EAS link on the tester phone. An Android App Bundle (`.aab`) is for Google Play and cannot be directly installed; an Android Package (`.apk`) can. [Android development build tutorial](https://docs.expo.dev/tutorial/eas/android-development-build/) [APK reference](https://docs.expo.dev/build-reference/apk/) [Internal distribution tutorial](https://docs.expo.dev/tutorial/eas/internal-distribution-builds/)
7. Validate the actual M1 path on the phone: offline entry, force-close/reopen durability, permissions denied, unavailable camera/speech fallbacks, and only synthetic data. Capture APK version, device/Android version, and test evidence.

The core EAS commands are intentionally small:

```bash
npm install --global eas-cli
eas login
eas build:configure
eas build --platform android --profile development
eas build --platform android --profile preview
```

The development profile produces an APK with developer tooling; the preview profile should create a signed, standalone internal-distribution APK. Keep the Android signing key and Expo organization under HRF ownership. Do not put API secrets, AWS credentials, or any value that must remain secret in the APK.

## React Native 101 for a Java/Spring Engineer

React Native is a UI runtime, not a browser inside an Android app. TypeScript/JavaScript defines a React component tree, and React Native renders that tree through native Android/iOS views. Expo is the framework and managed toolchain around React Native: SDK modules, configuration, native build generation, development tooling, and EAS build/distribution services.

| Familiar server-side concept | React Native / Expo equivalent | Important difference |
| --- | --- | --- |
| Controller/view composition | Function components returning `View`, `Text`, `TextInput`, `Pressable`, `Image`, and `FlatList` | There is no DOM, HTML, CSS cascade, or browser runtime. `Text` must generally wrap text. |
| Request-scoped state / view model | Component state, props, hooks, and screen-level state | Rendering must remain a pure function of state; effects perform I/O and must be cancellation/error aware. |
| Application service / repository | Use-case module plus repository interface | Keep domain/use-case logic independent of React and Expo APIs so it is testable without a device. |
| Database transaction/outbox | SQLite transaction plus durable local outbox and sync worker | Mobile can stop at any time, lose network, and resume later. Local durability happens before remote synchronization. |
| Servlet/container configuration | `app.json`/`app.config.ts`, Expo config plugins, generated Android native project | Permission, package-name, icon, native library, and build configuration changes require a new native build. |
| JVM thread/pool performance concerns | JavaScript and UI-thread responsiveness, native-module boundaries, list virtualization | Keep large work, frequent logs, and expensive re-renders off the interaction path; test performance in a release build. |

The first React Native concepts worth learning are the core components, Flexbox layout, styling through TypeScript/JavaScript objects, hooks/effects, safe-area and keyboard behavior, file-based navigation with Expo Router, device permissions, and the app lifecycle. `View` is the foundational layout component, and React Native uses Flexbox; its style system resembles CSS but is not CSS and has Android-specific constraints. [React Native core components](https://reactnative.dev/docs/components-and-apis.html) [React fundamentals](https://reactnative.dev/docs/intro-react) [Style](https://reactnative.dev/docs/style) [Expo workflow overview](https://docs.expo.dev/workflow/overview/)

## What to Build for the M1 Prototype

Keep the first vertical slice deliberately small and local-first:

```text
Expo Router screen
  -> typed form/confirmation state
  -> transaction use case
  -> SQLite repository transaction
  -> durable outbox record
  -> local sync-client stub
  -> visible local/queued/synced/failed state
```

Recommended module boundaries:

- `domain/`: transaction types, validation, calculation rules, source/proposal/confirmation distinction, and idempotency-key rules. No React or Expo imports.
- `application/`: record-confirmed-transaction and retry-sync use cases. No screen imports.
- `infrastructure/`: SQLite migrations/repositories, Expo device adapters, API client, and provider implementations.
- `features/`: screen/view-model composition, accessible UI components, and navigation.
- `test-fixtures/`: synthetic entrepreneur, business, and transaction data only.

The M1.2 integration should replace only the sync-client stub with an authenticated Spring Boot API client. The mobile application must retain local SQLite as its immediate system of record for an entry, use an idempotency key per sync operation, and move to `synced` only on an explicit server acknowledgement.

## AI-Assisted Development and SDD Review Duties

AI can rapidly produce screens, TypeScript plumbing, SQLite queries, tests, and build configuration. It should not own architectural acceptance. Write small SDD slices with observable device behavior, then require the assistant to implement only the named slice and run its validation commands.

Human review must be deepest in these areas:

| Area | Review question |
| --- | --- |
| Offline durability | Is a confirmed record committed in SQLite atomically before any network call? Does force-close/restart preserve it? |
| Synchronization | Are outbox operations idempotent, ordered or conflict-aware where required, retryable with bounded backoff, and never silently dropped? |
| State and effects | Are hooks stable, effect dependencies correct, async work cancelled or ignored after unmount, and side effects absent from render paths? |
| Native boundary | Does a library work with the current Expo SDK and New Architecture? Does adding it require a development-build rebuild, a config plugin, or Android permission? |
| Security | Are auth tokens stored appropriately, logs free of sensitive content, transport HTTPS-only, and no secrets embedded in `EXPO_PUBLIC_*` or application configuration? |
| Android UX | Are permissions requested just in time, touch targets accessible, keyboard/safe-area behavior correct, and manual fallback usable when camera/speech/OCR fails? |
| Release configuration | Do development, preview, and production package IDs, API base URLs, EAS channels, and signing ownership remain separated? Can a preview build reach production? It must not. |
| Performance | Are long lists virtualized with `FlatList`, expensive derived work memoized only where evidence requires it, and interaction performance checked in a release build rather than development mode? |

For physical-device acceptance, test on at least the target Android OS/device class, not only an emulator. React Native’s JavaScript and UI work have distinct performance implications, and development-mode performance is not representative. [React Native performance overview](https://reactnative.dev/docs/performance.html) [React Native threading model](https://reactnative.dev/architecture/threading-model) [FlatList](https://reactnative.dev/docs/flatlist.html)

## Focused 101 Learning Sequence

This is sufficient preparation to direct and review AI-assisted prototype work; it is not a request to become an Android specialist before starting.

1. **First 30-60 minutes:** complete Expo’s [Create your first app](https://docs.expo.dev/tutorial/create-your-first-app/) tutorial and run it on the Android phone with Expo Go. It includes a video and demonstrates the development-server/QR-code loop.
2. **Next 1-2 hours:** work through the [React Native introduction](https://reactnative.dev/docs/getting-started), [React fundamentals](https://reactnative.dev/docs/intro-react), [core components](https://reactnative.dev/docs/components-and-apis.html), and [Flexbox/layout](https://reactnative.dev/docs/flexbox). Build one form, confirmation screen, and `FlatList` manually enough to understand generated code.
3. **Next 1-2 hours:** complete Expo’s [development-build introduction](https://docs.expo.dev/develop/development-builds/introduction/) and [Android cloud-build tutorial](https://docs.expo.dev/tutorial/eas/android-development-build/). These pages include videos. Install the development build on the physical phone.
4. **Prototype foundation:** read [Expo’s development workflow overview](https://docs.expo.dev/workflow/overview/), then add SQLite, navigation, an offline outbox, and deterministic tests before speech, camera, or OCR.
5. **Tester delivery:** complete [EAS internal distribution](https://docs.expo.dev/build/internal-distribution/) and create a preview APK. Use Google Play internal testing only when HRF has approved and owns the Play Console account and tester process.
6. **Go deep only when the slice demands it:** Android permission/build mechanics for camera or speech; native modules/config plugins for unsupported libraries; list/render profiling for real-device performance; and release/signing/update policy when sharing beyond the immediate team.

## Delivery Concepts

Mobile delivery is different from EKS deployment:

- A **native binary** contains React Native/Expo native code, app configuration, permissions, native libraries, signing, and a compatible JavaScript runtime. Android outputs are typically APKs for direct internal installation or AABs for Google Play; iOS outputs are IPAs submitted to TestFlight/App Store Connect.
- A **store release** is reviewed/distributed by Google Play or Apple App Store.
- An **over-the-air (OTA) update** replaces compatible JavaScript/assets after the binary is installed. It cannot safely add or change native dependencies, permissions, build configuration, or incompatible native runtime. EAS Update uses runtime versions to prevent incompatible updates from reaching a binary. [EAS Update documentation](https://docs.expo.dev/eas-update/introduction/)

## Recommended Mobile Environments

| App channel | Purpose | Build/distribution | Data and API target |
| --- | --- | --- | --- |
| Development | Developer iteration with native debugging tools. | Expo development build installed on developer devices/simulators. | Local or development backend; synthetic data. |
| Preview / QA | Share a stable candidate with internal staff/testers. | EAS `preview` internal-distribution build: Android APK link; iOS ad hoc build or TestFlight. | Development/staging backend; synthetic or approved test data. |
| Staging / pilot rehearsal | End-to-end release-candidate validation. | Google Play internal/closed track and TestFlight. | Staging backend; production-like configuration without participant data unless approved. |
| Production / pilot | Participant release. | Google Play production/managed private distribution and App Store release or TestFlight beta, as program policy requires. | Production backend and approved participant-data policy. |

Use distinct app identifiers and display names when preview and production can coexist on one device, for example `org.homeroots.enterprisegrowth.preview` and `org.homeroots.enterprisegrowth`. Ensure each channel is tied to the matching backend configuration and EAS Update channel. Do not let a preview binary call production APIs.

## From GitHub to Device: Recommended Pipeline

### Pull Request

Run GitHub Actions for:

- TypeScript type checking, ESLint, unit tests, and static checks.
- Component/screen tests and API-contract checks.
- Expo configuration validation and dependency/lockfile checks.
- Optional EAS Update preview for JavaScript-only changes, with a QR code/link for reviewers after the binary/runtime is already compatible.

Do not create expensive signed builds for every small pull request unless the team needs visual/device validation. Use development builds and OTA previews selectively.

### Main Branch / Development

1. GitHub Actions validates the merged commit.
2. Trigger EAS Build with the `development` or `preview` profile using a short-lived or protected Expo token.
3. EAS creates the signed native binaries. Its cloud service can manage signing credentials, or HRF can retain ownership of credentials and authorize EAS use. [EAS Build](https://docs.expo.dev/build/introduction/)
4. Share the Android APK through the EAS internal-distribution URL or install on test devices. EAS's internal distribution creates Android APKs that can be installed after the device accepts the security warning. [EAS internal distribution](https://docs.expo.dev/build/internal-distribution/)
5. For iOS, distribute through TestFlight for the normal pilot path. Ad hoc distribution requires registered devices/provisioning and is less convenient for a distributed pilot.

### Release Candidate / Production

1. Create an immutable release tag and confirm the backend/API version compatibility.
2. Build `production` profiles for Android and iOS.
3. Use EAS Submit or the corresponding store consoles to upload the same approved source revision. `eas build --auto-submit` can pass successful builds to EAS Submit. [Expo distribution overview](https://docs.expo.dev/distribution/introduction/)
4. Submit Android to the selected Google Play track. Submit iOS to TestFlight first; public App Store release should remain a deliberate manual decision after review and pilot approval.
5. Monitor crash/error reports, sign-in/transaction behavior, sync, and upgrade health before broadening rollout.

EAS documentation notes that automatic submission defaults to internal testing behavior: Android can create an internal release, while iOS submits to TestFlight rather than automatically sending the app for public App Store review. [EAS automated submissions](https://docs.expo.dev/build/automate-submissions/)

## Android Distribution Choices

| Mechanism | Best use | Trade-off |
| --- | --- | --- |
| Direct APK / EAS internal distribution | Fast developer or small staff testing. | Requires sideloading acceptance; not an ideal long-term participant path. |
| Google Play internal testing | Early HRF/internal device testing; controlled, easy updates. | Requires Play Console setup and tester management. |
| Google Play closed testing | Limited pilot cohort before public release. | Requires release-track management and Play policy compliance. |
| Google Play production | Broad participant access. | Public-store requirements/review and operational ownership. |
| Managed Google Play private app | HRF-owned/managed Android fleet if an EMM is adopted. | Requires device-management operating model. |

Google Play developer registration is currently a one-time US$25 fee. [Google Play account setup](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en) For an HRF pilot, register the organization account, not a developer's personal account. If HRF eventually manages organization devices, Google documents private app distribution through managed Google Play. [Private Android apps](https://support.google.com/googleplay/android-developer/answer/9874937?hl=en)

## iOS Distribution Choices

| Mechanism | Best use | Trade-off |
| --- | --- | --- |
| Simulator/development-device install | Engineering and local QA. | Not a participant distribution path. |
| Ad hoc/internal EAS distribution | Small registered-device testing. | Device registration/provisioning creates administration burden. |
| TestFlight internal testing | HRF staff and development team. | Requires Apple Developer Program/App Store Connect. |
| TestFlight external testing | Pilot testers before public release. | First external build requires TestFlight App Review. |
| App Store release | Public participant release. | Requires App Review and release governance. |

Apple currently charges US$99/year for the Apple Developer Program. Eligible nonprofits, educational institutions, and government entities may request a fee waiver. [Apple enrollment](https://developer.apple.com/programs/enroll/) TestFlight supports up to 100 internal testers and 10,000 external testers; external testers require the first build's TestFlight review. [Apple TestFlight](https://developer.apple.com/testflight/)

## EAS Build and Update Costs

Expo EAS has a Free plan with a limited monthly quantity of lower-priority builds and free updates within its included allowance. Its Starter plan is currently US$19/month with US$45 of build credit; further paid usage is usage-based. Confirm current allowances and regional billing at procurement time because build quotas/prices change. [Expo plans](https://docs.expo.dev/billing/plans/) [Expo billing FAQ](https://docs.expo.dev/billing/faq/)

EAS is a convenience/service decision, not the only technical route. Teams can build Android locally/on CI and iOS on macOS runners, use Fastlane, and submit through platform APIs. That route is viable but requires operating signing, macOS capacity, Xcode/Android toolchains, and build cache reliability. For this small Android-priority project, EAS is the faster and less fragile initial choice.

## Security and Governance

- HRF should own the Expo organization, Apple Developer account, App Store Connect organization, Google Play Console organization, Android signing key, iOS bundle identifiers, and store listings. Add developers as scoped users rather than making personal accounts the system owner.
- Put `EXPO_TOKEN`, store service-account credentials, and Apple submission credentials only in protected CI environment secrets. Restrict production submission workflows to protected branches/tags and human approval.
- Use separate EAS build profiles/channels and explicit environment variables. Never bundle production secrets in the mobile application; assume every shipped client value can be extracted.
- Treat EAS Update as a release channel with approval and monitoring, not as an unrestricted bypass of release controls. Native changes require a new binary/store submission.
- Maintain crash reporting, release notes, rollback plan (serve a previous compatible OTA update or halt rollout), and test-device inventory.

## Suggested Initial Configuration

Use `eas.json` profiles conceptually like:

| Profile | Distribution | Update channel | Intended result |
| --- | --- | --- | --- |
| `development` | Internal development build | `development` | Debuggable app for engineers. |
| `preview` | Internal distribution | `preview` | APK/TestFlight candidate for staff QA. |
| `staging` | Store/TestFlight | `staging` | Release candidate against staging APIs. |
| `production` | Store | `production` | Signed release for participant rollout. |

Maintain matching backend configuration and feature flags. A production build must reject development/staging API base URLs at CI/configuration validation time.

## Recommended First Delivery Sequence

1. Create HRF-owned Expo, Apple, and Google Play organizations/accounts. Resolve Apple nonprofit fee-waiver eligibility.
2. Configure Expo project identifiers, Android package names, iOS bundle identifiers, and distinct preview/production application identities.
3. Add GitHub Actions quality gates and EAS build profiles; begin using a development build rather than Expo Go once native modules, offline SQLite, camera, speech, or production configuration are introduced.
4. Deliver preview Android APKs to staff through EAS internal distribution; add TestFlight for iOS staff testing when Apple enrollment is ready.
5. Configure Google Play internal track and TestFlight for release-candidate testing. Link each to a staging backend.
6. Add EAS Update after the runtime/version compatibility and release approval practices are established.
7. Create pilot release runbooks for enrollment, installation support, rollback, privacy notices, and helpdesk escalation.

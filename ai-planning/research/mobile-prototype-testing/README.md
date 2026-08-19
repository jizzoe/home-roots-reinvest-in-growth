# M1 Mobile Prototype Testing

Research date: 2026-08-16

## Purpose

This package explains how the future `hrf-reinvest-to-grow-mobile-app` can be tested after its Expo React Native code exists. It is deliberately limited to the M1 prototype: synthetic data, local SQLite persistence, no live HTTP requests, Android physical-device acceptance, and an iPhone TestFlight smoke test once HRF approves Apple ownership.

It is planning and research only. It does not authorize creating a repository, Expo project, Apple/Google account, EAS project, store listing, credential, or paid service.

## Recommended Test Stack

| Layer | Recommended tool or location | What it proves |
| --- | --- | --- |
| Static and component behavior | TypeScript, ESLint, Jest, React Native Testing Library | Validation, calculations, local state transitions, and rendered component states work deterministically. |
| End-to-end app flow | Maestro on emulator/simulator and physical devices | A user can complete the M1 flows through the rendered app. |
| Fast visual iteration | Android Emulator and iOS Simulator | Navigation, layout, and ordinary error states can be iterated quickly. |
| Native/device acceptance | Representative Android phone and approved iPhone | Permissions, keyboard, small-screen layout, offline restart persistence, installation, and platform behavior are correct. |
| Tester delivery | Versioned Android preview APK and iOS TestFlight test build | A non-developer can install and open the intended build without a developer workstation. |

Use an Expo development build for developer work. Expo describes it as the project-specific alternative to Expo Go that can include native libraries and native configuration. M1 should not treat Expo Go as its acceptance target. [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)

## Companion Guides

1. [Local development and automated tests](01-local-development-and-automated-tests.md)
2. [Android physical-device testing](02-android-physical-device-testing.md)
3. [iPhone TestFlight testing](03-iphone-testflight-testing.md)
4. [M1 device test-session checklist](04-m1-device-test-session.md)
5. [Sources and freshness](sources.md)

## Minimum Preparation

- A future mobile repository approved at `hrf-reinvest-to-grow-mobile-app`.
- A developer computer with Node.js LTS and Git; Android Studio for Android emulation/local Android builds; Xcode only if local iOS builds or iOS Simulator work is needed.
- One representative Android phone and USB cable for developer debugging, plus one approved iPhone for TestFlight smoke testing.
- An HRF-controlled Expo/EAS organization or a documented interim owner approved by HRF.
- Before TestFlight: an HRF-owned Apple Developer Program and App Store Connect organization, a named Account Holder, and named iPhone testers.
- Synthetic test fixtures only, including synthetic receipts, names, speech transcripts, and `HTG` amounts.

Do not wait for a backend, AWS account, Google Play Console, or participant data to validate M1. Google Play closed testing and any live sync belong to later approved work.

## M1 Evidence To Retain

For every accepted device run, retain the source commit, app version/build number, device model and OS version, locale, test date, tester role, result of each scenario, screenshots or screen recordings as appropriate, and defects found. Do not record participant data, credentials, or personal financial data.

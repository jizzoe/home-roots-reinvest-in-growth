# React Native + Expo Build and Distribution Research

Research date: 2026-08-12  
Scope: Delivery of an Expo/React Native app from GitHub to Android and iOS devices.

## Decision Summary

**Recommended starting model:** GitHub Actions for validation, Expo Application Services (EAS) for signed cloud builds, TestFlight for iOS testing, and Google Play internal testing for Android pilot testing. Use EAS Update only for compatible JavaScript/assets changes after the native binary and runtime-version policy are in place.

This keeps iOS signing/macOS build complexity out of the first project infrastructure while retaining GitHub as the delivery trigger. EAS Build supports GitHub and any CI provider, builds Android/iOS binaries, supports internal distribution, manages signing credentials if desired, and integrates with store submission and `expo-updates`. [EAS Build documentation](https://docs.expo.dev/build/introduction/)

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


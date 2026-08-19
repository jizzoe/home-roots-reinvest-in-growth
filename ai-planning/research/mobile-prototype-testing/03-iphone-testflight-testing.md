# iPhone TestFlight Testing

Research date: 2026-08-16

## Goal

Smoke-test the same Expo codebase on an approved iPhone and let named testers install the M1 test build through TestFlight. TestFlight is the M1 default rather than ad hoc distribution because normal testers do not need to register device UDIDs.

## 1. Obtain The Required HRF Ownership And Access

Do not perform these actions until the nonprofit approves the account owner, cost, and access model.

1. Have HRF enroll as an organization in the Apple Developer Program, not through a developer's personal account.
2. Name the HRF Account Holder and retain recovery/access ownership with HRF.
3. The enrolling person needs legal authority to bind HRF; Apple organization enrollment also requires the legal entity name, D-U-N-S Number, organization-domain work email, and a functioning public website.
4. The Account Holder signs in to App Store Connect, accepts required agreements, and invites only the developers/administrators who need access.
5. Decide whether the named iPhone tester is an internal tester with an App Store Connect role or an external tester without App Store Connect access. Use an external group for a normal field/stakeholder tester.

Apple's current organization-enrollment requirements and team-role model are documented here: [Apple program enrollment](https://developer.apple.com/help/account/membership/program-enrollment) and [App Store Connect roles](https://developer.apple.com/help/app-store-connect/manage-your-team/overview-of-accounts-and-roles).

## 2. Create The App Record

1. In the HRF App Store Connect account, select **Apps**, then **Add (+)**, then **New App**.
2. Enter the M1 prototype name, choose iOS, and select the HRF-owned bundle identifier from the code/build configuration.
3. Ensure an Account Holder, Admin, or App Manager performs this step; Apple restricts app-record creation to those roles.
4. Keep the prototype's display name, package/bundle identifier, and versioning distinct from a future production application if both need to coexist.

Apple requires an app record before a build can be uploaded to App Store Connect. [Apple: add a new app](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app)

## 3. Create And Submit The Test Build

1. Configure the Expo project with the HRF iOS bundle identifier and the approved Expo/EAS project ownership.
2. Build an App Store-signed iOS test build from the reviewed source commit. The exact EAS profile name is repository-owned; it must produce a TestFlight-submittable iOS build, not an ad hoc-only build.
3. Submit that build through the approved EAS Submit or App Store Connect process.
4. In App Store Connect, open the app's **TestFlight** tab and wait for processing to finish.
5. Enter concise beta testing information: the M1 scope, synthetic-only data requirement, what to test, and an HRF contact address.
6. Record the source commit, app version, build number, submission time, and any Apple processing/review status in the private delivery evidence.

Expo documents iOS submission through EAS Submit; Apple documents TestFlight as the beta-distribution path. [Expo iOS submission](https://docs.expo.dev/submit/ios/) [Apple TestFlight](https://developer.apple.com/testflight/)

## 4. Add Testers

### Internal Tester

1. In App Store Connect, invite the person in **Users and Access** with an eligible role.
2. Under **TestFlight**, create or select an Internal Testing group.
3. Add the processed build to the group and notify the tester.

Internal testers are App Store Connect team members; this is appropriate for HRF staff or the development team, not ordinary external testers. Apple permits up to 100 internal testers. [Apple TestFlight](https://developer.apple.com/testflight/)

### External Named Tester

1. Under **TestFlight**, create an Internal Testing group first if one does not exist.
2. Create an External Testing group and add the processed build.
3. Enter the testing information and submit the build for TestFlight App Review when Apple requires it. The first external build requires review.
4. Once available, invite the named tester by email or send an approved public invitation link with device/OS criteria.
5. The tester installs Apple's TestFlight app, accepts the invitation with their Apple Account, then installs the prototype from TestFlight.

Apple documents external tester groups, invitation methods, and the first-build review requirement. [Apple: invite external testers](https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers)

## 5. Execute The iPhone Smoke Test

1. Record iPhone model, iOS version, TestFlight build number, locale, and test date.
2. Open the installed app without a developer computer or Metro server.
3. Check Home layout, safe areas, touch targets, keyboard-visible entry, and review/confirmation screen behavior.
4. Run one English manual sale offline: disable network, confirm, force-close, reopen, and verify persistence.
5. Run one French manual expense and check wrapping/truncation.
6. Check camera permission denial and manual fallback. Test speech unavailable fallback if the feature is included in the build.
7. Capture TestFlight feedback or a screenshot for each defect; do not place sensitive data in feedback.

## 6. When To Rebuild

- Rebuild and resubmit a native test build when native dependencies, permissions, bundle identifier, app configuration, or Expo SDK change.
- A normal TypeScript/UI change can use the development client during engineering work, but a named TestFlight tester needs a new processed build to receive a new native binary.
- Do not move to production App Store release as part of M1.

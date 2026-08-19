# Android Physical-Device Testing

Research date: 2026-08-16

## Goal

Prove that the versioned M1 Android build installs and works for a non-developer on a representative Android phone, including offline persistence after an application restart.

## 1. Prepare A Developer Android Phone

Use this path only for a developer-installed development build.

1. Choose a representative Android phone and record its model, Android version, screen size, and available storage.
2. Enable Developer options on the phone.
3. In Developer options, enable USB debugging.
4. Connect the phone with a data-capable USB cable.
5. Accept the phone's USB-debugging authorization prompt.
6. Confirm the computer can see the device with `adb devices` if Android platform tools are installed.
7. Install/run the development build using `npx expo run:android --device`, or install an EAS development build.

Android's current device guide requires Developer options and USB debugging for ADB-connected debugging and recommends real-device testing before release. [Android Developers: run on hardware](https://developer.android.com/studio/run/device)

USB debugging is not required for a normal tester who installs the preview APK directly.

## 2. Create A Tester Preview APK

Complete this only after HRF approves the Expo/EAS owner and the project identifiers/signing setup.

1. In `eas.json`, define a `preview` profile with internal distribution. Ensure its Android output is an APK, not an AAB.
2. Build the stable tester candidate from the exact commit under review:

```bash
eas build --platform android --profile preview
```

3. In the EAS build page, verify the artifact is an `.apk` and record its version/build number and source commit.
4. Send the EAS installation URL only to an authorized tester.
5. On the Android phone, open the link, download the APK, approve the platform's install-from-this-source prompt if shown, install, and open the app.
6. Confirm the app opens without a USB cable, Metro server, or developer computer.

An AAB is intended for Google Play and cannot be installed directly; an internal-distribution Android profile produces an installable APK. [Expo APK guidance](https://docs.expo.dev/build-reference/apk/) [Expo internal distribution](https://docs.expo.dev/build/internal-distribution/)

## 3. Execute The M1 Android Acceptance Run

Perform the following in the installed preview APK, not only in an emulator or development client.

1. Confirm the app opens with only synthetic sample data and displays `HTG` values.
2. Set the device to English and complete a manual sale: enter, review, confirm, and verify `Saved on this phone`.
3. Turn off Wi-Fi and mobile data. Record a manual expense, confirm it, force-close the app, reopen it, and verify both records remain in Home/recent activity.
4. Try `Review sale` with no amount and verify the validation message and correction path.
5. Complete the speech proposal path; then test speech unavailable and manual-entry fallback.
6. Complete receipt capture/proposal; deny camera permission and test image/manual fallback; test extraction failure.
7. Exercise the local needs-attention state and retry. It must return to `Waiting to sync` and must not claim a remote system received the record.
8. Increase Android text size and check that entry/review/confirmation controls remain reachable.
9. Switch to French and repeat one manual sale or expense flow. Confirm no labels or buttons are clipped.
10. Record pass/fail, screenshot references, build number, device/OS, locale, and defects.

## 4. Troubleshoot Before Rebuilding

- **Computer cannot see the device:** reconnect the cable, unlock the phone, re-accept USB debugging, and inspect `adb devices`.
- **APK will not install:** confirm it is an APK, not an AAB; remove an incompatible earlier build if its signing/package identity differs; confirm storage space.
- **Device cannot reach Metro:** use USB/LAN first. For restrictive networks during developer testing, use `npx expo start --tunnel`; never use a Metro-connected development client as proof of tester installation.
- **Behavior differs from emulator:** record the exact device/OS and reproduce in the preview APK before changing code.

## Evidence Required

The M1 evidence record should identify the installed APK, source commit, device, Android version, installer path, all scenario results, restart result, locale result, and remaining gaps. Keep evidence synthetic and do not publish install links or device identifiers in public planning artifacts.

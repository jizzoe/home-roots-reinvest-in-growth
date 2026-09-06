# M1 Device Test-Session Checklist

Research date: 2026-08-16

## Before The Session

1. Select the candidate commit and create a versioned Android preview APK; create the corresponding iOS TestFlight test build only after the Apple gate is approved.
2. Confirm the build contains synthetic fixtures only: synthetic entrepreneur, business, receipt image, speech text, and `HTG` amounts.
3. Write down the app version/build number, commit SHA, device model, OS version, locale, tester role, and date.
4. Make sure the tester can install/open the Android APK or TestFlight build without a developer workstation, USB connection, or Metro server.
5. Start a result record with `pass`, `fail`, `blocked`, and defect reference fields. Do not log personal data or credentials.

## Core Offline Flow

1. Open Home and confirm the four actions and readable weekly summary are visible.
2. Record a sale manually: enter amount, item, date, and optional note; review; confirm; verify `Saved on this phone`.
3. Turn off Wi-Fi and mobile data.
4. Record an expense manually; review and confirm.
5. Force-close the app, reopen it, and verify both records and weekly totals persist.
6. Verify the app remains usable offline and does not claim a remote system received either record.

## Alternate And Failure Flows

1. Attempt a manual sale with no amount; verify the validation message and correction route.
2. Start manual sale entry, leave before confirmation, and verify the unsaved-details warning and discard behavior.
3. Use speech, inspect the editable proposal, choose `Record again`, then confirm only the desired proposal.
4. Test unavailable speech and complete the same sale manually.
5. Start receipt capture, deny camera permission, and use manual entry or choose-from-phone fallback.
6. Test receipt extraction failure and verify the image/proposal remains editable or manual entry remains available.
7. Open needs attention, use local retry, and verify `Waiting to sync`; it must not state `Synced` because M1 has no live HTTP request.

## Accessibility And Localization

1. Increase text size and verify amount entry, review values, and fixed confirmation action stay reachable.
2. Check keyboard-visible amount entry and safe-area behavior.
3. Run at least one sale or expense flow in English.
4. Switch to French and run at least one sale or expense flow; record any clipped text, awkward translation, or inaccessible control.
5. Verify every automated selector uses a stable `testID`, not English/French visible text.

## Finish The Session

1. Mark every scenario pass/fail/blocked and attach only synthetic screenshots or recordings.
2. File defects with build number, device/OS, locale, exact steps, expected result, actual result, and attachment.
3. Separate product/design defects from environment/setup blocks.
4. Re-run the affected Maestro flow and component test after a fix; repeat the physical-device scenario in a newly versioned candidate build.
5. Record residual gaps, including unavailable iPhone/TestFlight access or unreviewed French strings, rather than declaring M1 accepted without evidence.

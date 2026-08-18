# M1 Speech Proposal Android Acceptance

Date: 2026-08-18

## Executor and environment

- Executor: Joe Rice.
- Device: representative Android 15 device.
- Build: EAS build `6dd64511-469e-4cca-b1a0-0aa4e11d8b0d`, internal Android
  APK, built from mobile component `main` revision
  `6dfc4ad79af8310dcc36d3617578878275215a68`.
- Data: synthetic HTG business examples only.
- Provider boundary: no microphone capture, transcription, live speech or AI
  provider, backend, or network-dependent path was used or claimed.

## Result: passed

Joe completed the scripted real-device run successfully. The prototype's
`Use speech` path was correctly understood as a disclosed deterministic sample
rather than recording: it presents visible example text, then an editable
proposal before any sale is saved. The test covered the raw transcript/source,
editing or recording again, explicit confirmation, local persistence after
restart, English/French copy, the deterministic unavailable state and manual
sale fallback, and the independent manual sale/expense paths.

The device read the visible proposal summary aloud. This was confirmed as live
device text-to-speech, not prerecorded audio: it is optional assistance and
does not capture user audio or create a record.

## Enlarged-text acceptance

- Font size: 200%.
- Display size: Largest.
- Home: all three primary actions remained reachable.
- Speech start: the disclosure and `Use prototype sample` remained readable.
- Proposal review: transcript, amount field, edit/review/confirm controls,
  `Record again`, and `Read summary aloud` remained reachable with normal
  scrolling.
- Speech unavailable state: `Try sample again` and `Enter sale yourself`
  remained readable and reachable.

No participant, personal, financial, credential, or device-identifier data
was used or retained in this evidence.

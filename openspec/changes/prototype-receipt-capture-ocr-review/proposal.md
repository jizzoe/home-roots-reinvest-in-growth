## Why

The approved M1 prototype has completed its manual offline and deterministic
speech-proposal slices, but it has not yet proved that a synthetic entrepreneur
can attach a receipt and safely use local extraction assistance. This change
defines the final narrow M1 receipt slice so the product can test Android
on-device OCR and review without treating OCR output as a financial record or
expanding into cloud, backend, or production receipt processing.

## What Changes

- Define the M1 receipt-assisted expense flow: local image capture or selection,
  bundled Android on-device text recognition, deterministic local parsing, and
  editable review before a record is confirmed.
- Require receipt evidence, raw OCR output, parser suggestions, and uncertainty
  to remain distinct from a confirmed expense and to persist locally using only
  synthetic prototype data.
- Define local, manual-first fallback behavior for camera-permission denial,
  OCR failure, and unusable extraction while preserving an available image.
- Establish a coordination-only central delivery envelope for one component-local
  mobile change and Android physical-device acceptance evidence.
- Preserve the existing M1 manual transaction model, local outbox shape,
  English/French resource mechanics, and mocked-speech/TTS behavior without
  reopening or expanding those completed slices.

## Capabilities

### New Capabilities

- `prototype-receipt-capture-ocr-review`: Defines M1's local-only Android
  receipt capture, OCR-assisted proposal, confirmation, fallback, and
  cross-repository evidence boundaries.

### Modified Capabilities

<!-- None. Existing M1 contracts remain authoritative; this is a new narrow
     receipt capability that composes with them. -->

## Impact

- Affected planning repository: this change package and a future central
  linkage/verification record only; it does not add application code here.
- Affected component: the separately authorized `jizzoe/hrf-reinvest-to-grow-mobile-app`
  repository will need one component-local OpenSpec change, mobile code,
  Android-native OCR dependency/configuration, tests, and build/device evidence.
- No API, backend, network synchronization, cloud OCR, Google Cloud service,
  AWS resource, account, credential, deployment, paid service, or sensitive-data
  action is authorized by this proposal. Any EAS build or artifact operation
  remains a separate just-in-time approval and runtime-permission gate.
- Sources: the approved [M1 Rapid Thin-Slice Prototype Brief](../../../ai-planning/design-briefs/m1-rapid-thin-slice-prototype.md),
  [M1 Mobile Prototype Workflows](../../../ai-planning/design-briefs/m1-mobile-prototype-workflows.md),
  accepted `core-domain-model` and `v1-product-guardrails` specifications, and
  the archived M1 manual and speech delivery records.

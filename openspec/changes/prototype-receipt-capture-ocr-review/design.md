## Context

See [proposal.md](proposal.md) for motivation and the delta specification for
the contract. The M1 manual-offline and deterministic-speech slices are already
archived. This planning repository owns their product contracts and system
evidence, while the temporary public mobile repository owns its source,
dependencies, build configuration, tests, and component-local OpenSpec change.

The approved M1 brief selects real local capture/selection, bundled Android
Google ML Kit Text Recognition, and a deterministic local parser. Its data
model already reserves receipt-file metadata and source/proposal metadata; its
manual expense confirmation and SQLite/outbox behavior remain the sole record
creation path.

## Goals / Non-Goals

**Goals:**

- Add receipt evidence and assisted-review behavior without weakening the
  existing offline, confirmation, localization, and outbox invariants.
- Make component ownership, Android-only OCR acceptance, and central evidence
  obligations concrete before an implementation change begins.
- Ensure failed, unavailable, or low-confidence extraction has a useful,
  data-preserving manual fallback.

**Non-Goals:**

- Build application code or native configuration in this repository.
- Build cloud OCR, a receipt-upload API, live sync, authentication, production
  storage, full document scanning, category/item extraction, reporting, or
  iOS receipt acceptance.
- Claim receipt accuracy, participant usefulness, financial correctness, or
  remote delivery from a synthetic prototype.

## Decisions

### Keep receipt evidence, OCR output, proposals, and confirmed fields separate

The component change will model the captured file/reference, raw OCR text and
outcome, parser field suggestions, and confirmed expense as separate data
concepts. Confirmation will reuse the proven manual-expense service so an
unconfirmed receipt cannot change totals or create an outbox row.

Alternative considered: write preliminary OCR fields directly to a transaction.
Rejected because it obscures source provenance and violates the accepted human
confirmation boundary.

### Use Android bundled, local OCR behind a replaceable adapter

The M1 Android implementation will use the approved bundled ML Kit text model
on the local image, behind a narrow OCR adapter. Its verification must prove it
does not select a Play-services/downloading model, make a network request, or
call a cloud service. The interface leaves later Android/iOS engines possible
without treating M1's choice as an application-wide provider commitment.

Alternative considered: deterministic mocked OCR or cloud recognition.
Rejected because M1 specifically needs a real on-device extraction proof, while
mocked OCR would not test it and cloud processing expands data, cost, and
connectivity boundaries.

### Constrain parsing to deterministic, field-level suggestions

The parser will accept raw OCR text and available line/layout evidence, then
propose only merchant, date, amount, fixed HTG, and short description where
evidence supports it. Each result carries its origin and confidence/uncertainty;
ambiguous values stay blank. Categories and itemization remain manual.

Alternative considered: heuristic category/item interpretation or LLM-based
extraction. Rejected because it would increase false-authority risk and add
provider, privacy, or nondeterminism concerns outside M1.

### Treat image persistence and fallback as part of the critical path

The component will move a chosen/captured image into app-controlled storage,
persist non-sensitive metadata locally, and expose capture, selected-image,
processing, review, and extraction-failure states from the approved M1 visual
package. Camera denial falls back to image selection or manual expense entry;
OCR failure preserves the available image and never blocks manual completion.

Alternative considered: retain only a temporary picker URI or require camera
capture. Rejected because restart/review durability and permission-resilient
completion are explicit M1 requirements.

### Preserve the cross-repository lifecycle boundary

After central Gate 1 approval, this change will issue a pinned handoff to one
component-local `prototype-receipt-capture-ocr-review` change. The component
will return its merge/archive revisions, checks, dependency and attribution
review, and divergence statement. Central verification will then combine that
return with the Android physical-device acceptance record. A new EAS build,
artifact, or tester access operation is not included in this approval and
requires exact just-in-time approval, target verification, and runtime
permission.

Alternative considered: use this central proposal as code authorization or
accept a local Expo starter nested in the planning workspace. Rejected by the
repository boundary and because neither supplies component-local lifecycle or
physical-device proof.

## Risks / Trade-offs

- [OCR quality varies across synthetic receipt layouts and devices] → preserve
  raw text and uncertainty, keep suggestions editable, test deterministic
  fixtures, and retain manual fallback.
- [Bundled native OCR setup conflicts with the Expo runtime] → use a compatible
  development build, record exact dependency/native configuration evidence, and
  retain device acceptance as incomplete if a versioned installable build cannot
  prove the path.
- [Receipt images leak sensitive information] → use synthetic assets only,
  avoid file contents in logs/screenshots, store no credentials, and reject
  sensitive evidence.
- [The slice silently expands into sync or cloud storage] → test no-network
  completion, enforce the disabled sync-client boundary, and treat external
  services as a new approval decision.
- [Camera/OCR failure makes the workflow unusable] → make image selection and
  manual entry first-class fallback routes with data-preserving status copy.

## Migration Plan

1. Obtain explicit Central Gate 1 approval for this proposal, delta, design,
   tasks, component target, validation plan, and scoped mutation boundary.
2. Commit/push the central plan and issue one pinned component handoff; no
   component code is changed from this repository.
3. Complete the component-local proposal, Apply, validation, review, delivery,
   Sync, and Archive with its own rollback plan and evidence.
4. Obtain separately authorized Android build/device acceptance, then return
   the component record and acceptance evidence for central Verify.
5. Before central archive, Sync only verified deltas into living specifications.
   If the component must be rolled back before archive, revert only its receipt
   UI/dependency/data additions and retain prior manual/speech records; after
   archive, use a new corrective change rather than rewriting history.

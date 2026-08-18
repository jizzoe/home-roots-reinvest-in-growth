# M1 Receipt Capture and OCR Mobile Dispatch

Date: 2026-08-18

## Central Contract

- Central repository: `https://github.com/jizzoe/home-roots-reinvest-in-growth`
- Central branch: `chore/prototype-receipt-capture-ocr-review`
- Central change: `prototype-receipt-capture-ocr-review`
- Contract pin: `77884c2df34bf0e68e26f015abd42961ac6aee0d`
- Approved delta: `openspec/changes/prototype-receipt-capture-ocr-review/specs/prototype-receipt-capture-ocr-review/spec.md`
- Ledger: `openspec/changes/prototype-receipt-capture-ocr-review/linkage.md`
- Approval: `openspec/changes/prototype-receipt-capture-ocr-review/evidence/gate-1-approval.md`

## Component Boundary

- Component repository: `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app`
- Base: `main` at `4f5337880828643c9fff071fa26d0d0205e1b388`
- Approved branch: `feat/m1-receipt-capture-ocr-review`
- Approved component change: `m1-receipt-capture-ocr-review-mobile`
- Profile: `prototype-rapid`; no production independent-review claim is valid.
- Gate 1 authorizes this exact component's local OpenSpec lifecycle for this
  receipt slice, subject to current validation, runtime permission, and each
  retained external-operation boundary.

## Required Outcome

- Allow synthetic receipt photo capture or local image selection; copy or retain
  a durable app-controlled local reference and metadata without creating an
  expense simply by attaching an image.
- Keep camera denial resilient: allow image selection or the complete manual
  expense flow.
- Use an Android bundled, on-device, no-download ML Kit text-recognition path
  behind a replaceable adapter. Do not call a cloud service, make a network
  request, or choose an unbundled/downloaded model.
- Preserve raw OCR text, extraction outcome, and available layout evidence
  separately from any parser proposal and confirmed expense fields.
- Parse only deterministic, editable merchant/date/amount/fixed-HTG/short
  description suggestions with source and uncertainty. Leave uncertain values
  blank; do not infer category or items.
- Use the approved M08 receipt capture, processing, review, and failure visuals
  with English/French resources and stable automation selectors.
- Reuse the established explicit manual-expense confirmation, SQLite, totals,
  local status, idempotency, and outbox path. Cancel/retry/failure must not
  create a transaction or outbox row; OCR failure must preserve a usable local
  image and manual completion path.

## Non-Goals and Safety

- Synthetic HTG receipt fixtures and transactions only. Do not retain
  participant data, real financial data, credentials, device identifiers, or
  sensitive logs.
- No live sync, backend, receipt upload API, cloud OCR, AWS, authentication,
  full scanning/cropping, category/item extraction, iOS/TestFlight, deployment,
  release, or production/pilot expansion.
- OCR/parser output is suggestion evidence only; it cannot create, modify, or
  confirm a financial record.
- An EAS build, artifact, or tester action requires central task 4.1's separate
  exact approval and may not be inferred from this dispatch.

## Component Validation and Evidence

The component change must name and run repository-declared checks covering:

- formatting, type safety, focused and full tests; parser fixtures; source and
  proposal separation; confirm/cancel/retry; local image/SQLite restart
  durability; outbox identity; English/French resources; accessibility; and
  no-network core behavior;
- Android/Expo native configuration proving the bundled-model choice;
  dependency compatibility, audit, license/attribution, secret-pattern, scope,
  portability, recovery, and strict OpenSpec evidence;
- Android build and physical-device acceptance only after the separate external
  operation is approved.

Component Verify must map every local task and applicable central requirement
and scenario to current evidence, recording failures, skipped checks, warnings,
and residual gaps without weakening the contract.

## Return Contract

Return to the central ledger the component change and archive revision, exact
verified topic revision, merged pull request and integrated `main` revision,
central pin and no-divergence statement, deterministic check results,
dependency/OCR proof, authorized build evidence if present, and residual gaps.

## Recovery

Resume from the central pin, this handoff, current component Git/OpenSpec state,
and the first incomplete evidence task. Before archive, rollback only the
registered receipt branch/change while preserving the established manual/speech
path and compatible local records. After archive, use a corrective change.

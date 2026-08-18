## 1. Central Planning Review and Dispatch

- [x] 1.1 Obtain explicit Central Gate 1 approval of this proposal, delta,
  design, tasks, central/component repository boundary, `prototype-rapid`
  delivery profile, synthetic-only and local-provider constraints, component
  target, validation plan, recovery path, and the separately gated EAS/artifact
  boundary. [Requirements: central planning; synthetic/local-only]
- [x] 1.2 Record a current central planning review covering scope/non-goals,
  requirements and scenario mapping, task dependencies, privacy/security,
  native dependency and supply-chain posture, attribution, portability,
  recovery, stable task IDs, component ownership, and no unauthorized external
  target. [Requirements: all]
- [ ] 1.3 Commit/push the approved central change, initialize a linkage ledger,
  and issue one pinned component handoff identifying the contract revision,
  component repository/change, exact non-goals, required return evidence, and
  recovery reference. [Requirement: central planning]

## 2. Component-Local Receipt Implementation

- [ ] 2.1 In the separately authorized mobile repository, create and approve
  one component-local OpenSpec change that cites the central pin and defines
  Android-compatible receipt capture/selection, bundled on-device OCR,
  deterministic parser, local data additions, tests, dependency/license review,
  build evidence, rollback, and no-cloud boundary. [Requirements: all]
- [ ] 2.2 Implement local image capture/selection, app-controlled durable file
  persistence, and receipt metadata with camera-denial image-picker/manual-entry
  fallbacks; use synthetic fixtures only. [Requirements: local image; synthetic/local-only]
- [ ] 2.3 Implement the replaceable Android OCR adapter with a bundled,
  no-download/no-network ML Kit text-recognition path; retain raw text,
  extraction outcome, and available layout evidence separately from expense
  fields. [Requirement: device-local OCR]
- [ ] 2.4 Implement deterministic parser suggestions and the localized receipt
  review/failure screens from the approved workflow assets, including
  field-level source/uncertainty, blank uncertain values, editable/clearable
  fields, and no category/item inference. [Requirement: parser proposals]
- [ ] 2.5 Route explicit receipt confirmation through the existing manual
  expense persistence/outbox path, preserving proposal cancel/retry behavior,
  local status language, English/French resources, and restart durability.
  [Requirement: explicit review and confirmation]

## 3. Component Validation and Return

- [ ] 3.1 Run and retain component repository checks for formatting, type
  safety, unit/component behavior, integration/state behavior, receipt-parser
  fixtures, English/French smoke coverage, accessibility semantics, offline/no
  HTTP behavior, SQLite/file restart durability, Android/native configuration,
  secret patterns, dependency audit, license/attribution, OpenSpec strict
  validation, scope, portability, and recovery review. Map results to every
  component task and central requirement/scenario. [Requirements: all]
- [ ] 3.2 Formally Verify, deliver, Sync, and Archive the component change
  through its own registered resources. Return archive and integrated revisions,
  current validation evidence, central pin, exact dependency/OCR evidence,
  divergence statement, and residual gaps to the central linkage ledger.
  [Requirement: component and Android evidence]

## 4. Android System Acceptance and Central Close-Out

- [ ] 4.1 Before any Android build, artifact, or tester operation, obtain the
  separate just-in-time approval and verify exact project, source revision,
  distribution boundary, device/tester scope, runtime permission, synthetic
  data, and recovery behavior. If unavailable, retain acceptance as pending.
  [Requirement: component and Android evidence]
- [ ] 4.2 On the representative Android device, record synthetic-data evidence
  from the versioned installed build: offline local capture/selection, bundled
  local OCR or its truthful limitation, raw-text/proposal separation, edit and
  confirmation, image and transaction restart durability, permission/OCR
  fallback, no-cloud behavior, and English/French locale coverage. [Requirements:
  synthetic/local-only; local image; device-local OCR; parser proposals; explicit
  review and confirmation; component and Android evidence]
- [ ] 4.3 Create central verification mapping every task, requirement,
  scenario, design constraint, component return, Android evidence, skipped
  check, warning, and residual gap; run the repository validation contract and
  present the result for explicit Gate 2 acceptance before Sync or Archive.
  [Requirements: all]
- [ ] 4.4 After Gate 2 approval and merged component delivery, Sync only the
  verified delta into the living specification with repeat no-op evidence,
  Archive the content-preserving central bundle, reconcile authorized tracking,
  and perform only eligible registered-resource cleanup. [Requirements: all]

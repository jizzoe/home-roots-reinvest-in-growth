## Context

This change follows accepted planning specs for V1 product guardrails, cross-repository architecture, core domain model, and API contract conventions. The current planning repository owns the central product contract and validation evidence; a future mobile repository will own Expo React Native/TypeScript source, SQLite implementation, Android build configuration, device validation, and component-local OpenSpec evidence.

The controlling M1 brief narrows phase 1 to manual sale/expense entry, local SQLite persistence, recent activity, simple weekly totals, user-understandable status, and a sync-shaped outbox/idempotency path with no live backend dependency. Speech, TTS, receipt/OCR, and live REST sync are later prototype phases or M1.2 work.

## Goals / Non-Goals

**Goals:**

- Define the product and verification contract for the M1 manual offline Android prototype slice.
- Preserve the accepted Business Journal language model: sale, expense, money earned, money spent, estimated profit, saved locally, and waiting to sync.
- Make offline durability, app-restart survival, local outbox/idempotency, and Android installability observable in later mobile evidence.
- Keep the local data shape aligned with the accepted core domain model without turning the central spec into an implementation schema.
- Leave a clean handoff path for separate mobile repository creation and component-local implementation.

**Non-Goals:**

- Creating or configuring the mobile repository.
- Implementing application source code, build files, CI/CD, backend sync, executable API contracts, cloud infrastructure, credentials, or deployment.
- Proving speech, TTS, receipt capture, OCR, AI assistance, loan visibility, reports beyond simple local totals, production authentication, or pilot readiness.
- Using real participant, operational, financial, personal, or sensitive data.

## Decisions

### Decision: Treat M1 phase 1 as an Android-first mobile-local proof

The future implementation must prove a versioned Android build can be installed and opened on a representative physical device. This follows the M1 brief and the Android-priority V1 scope map because installability is product evidence, not just developer convenience.

Alternative considered: accept emulator or development-server evidence. That would not prove a non-developer can install and open the prototype on a representative device, so it is insufficient for this slice.

### Decision: Keep the central change at product-contract level

The delta spec names observable requirements and future evidence, while the future mobile repository owns source code, SQLite schema details, app framework configuration, build commands, and local tests. This follows the accepted cross-repository architecture and avoids putting implementation code in the planning repository.

Alternative considered: define the exact local table schema in the central spec. The M1 brief includes candidate local tables, but accepted domain-model governance says central specs control meaning rather than prescribing schemas. The central requirement therefore calls for durable local storage, confirmed records, stable local identity, and outbox/idempotency evidence.

### Decision: Manual entry is the baseline completion path

Manual sale and expense entry are the only input sources in this slice. Voice and receipt/OCR remain proposal-based future work, but the review/confirm pattern is deliberately reusable so later sources can populate proposals without bypassing human confirmation.

Alternative considered: include speech and OCR in the first slice because the broader M1 outcome includes them. The M1 brief separates them into phase 2 and phase 3, and adding them here would weaken the offline durability proof.

### Decision: Local outbox/idempotency exists before live sync

Each confirmed local transaction must produce or preserve stable sync-shaped identity, including a local identifier, a client idempotency key, and an outbox operation state. M1.2 can later connect that shape to a live REST API without changing the confirmed transaction model.

Alternative considered: defer outbox/idempotency until backend sync exists. That would make M1 easier but risks redesigning the transaction model when M1.2 adds retryable writes.

### Decision: User-facing status uses plain language over technical state names

The future mobile UI should map internal local/sync states to user-understandable text such as `Saved on this phone` and `Waiting to sync`. Technical values may exist internally, but they are not the entrepreneur-facing language.

Alternative considered: display raw states such as `queued`, `syncing`, or `needs_review`. These are useful implementation states but do not meet the accepted UX guardrail for plain business language.

### Decision: Simple totals are local estimates

Money earned, money spent, and estimated profit must be calculated from confirmed local prototype records for the displayed period. The UI and evidence must not represent them as audited, complete, synced, loan-eligible, or impact-proving.

Alternative considered: include richer dashboard, cash position, trends, or reports. Those are V1 directions, but this slice only needs enough summary behavior to prove local records are useful after confirmation.

## Risks / Trade-offs

- Local prototype is mistaken for production readiness -> Mitigation: requirements explicitly prohibit real data, pilot use, deployment, backend sync, and external setup.
- SQLite persistence is treated as optional polish -> Mitigation: restart survival is a required scenario and must be evidenced before central verification can pass.
- M1 scope expands into M1.2 backend work -> Mitigation: live REST API synchronization and executable API contracts are explicitly routed to a separate approved M1.2 change.
- Outbox is implemented as UI-only status without durable identity -> Mitigation: the spec requires stable local identity, client idempotency key, and queued outbox or equivalent sync record evidence.
- Totals imply unsupported business or impact conclusions -> Mitigation: totals must be local estimates and cannot be framed as audited, loan-eligible, impact-proving, or production financial statements.
- Android installability evidence depends on external distribution choices -> Mitigation: the requirement is outcome-based; direct APK installation or another separately approved Android delivery path can satisfy it if it proves physical-device install/open without a developer workstation.

## Migration Plan

No runtime migration applies in this planning repository. After review, the follow-on path is:

1. Approve Apply for this planning change.
2. Complete planning/review/validation tasks in this repository.
3. Create a separate approved follow-on for mobile repository creation and component-local implementation, including repository owner/location, access, branch/change name, validation commands, and durable links.
4. Use the mobile repository to implement and verify the Android prototype behavior.
5. Return mobile evidence to central verification before Sync/Archive of the central product contract.

## Open Questions

- Exact prototype language/currency defaults can be finalized in the mobile component-local proposal as long as they remain synthetic, explicit, localizable, and consistent with accepted V1 localization and currency guardrails.
- Exact Android distribution mechanism can be finalized in the mobile component-local proposal as long as it proves installation and opening on a representative physical Android device without a developer workstation connection.

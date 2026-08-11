# Phase 02 Research: Offline-First SQLite And Sync Architecture

Date: 2026-08-08

Related plan:

- `../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md`
- `phase-01-mobile-foundation-react-native-expo-typescript.md`

## Question

How should the mobile bookkeeping proof of concept model offline-first local data, SQLite persistence, sync queues, retries, idempotency, local/synced state indicators, and conflict handling?

## High-Level Summary

The recipient mobile app should be offline-first in the strong sense: local SQLite should be the app's primary source of truth for the mobile UI, and network sync should reconcile local changes with the backend when connectivity is available.

For this project, the first prototype should not store only a pending queue. It should store:

1. A durable local transaction table for recent business records.
2. A durable sync operation queue for unsynced writes.
3. Status metadata showing whether each transaction is local, queued, syncing, synced, failed, or needs review.

This gives users trust: if they record a sale offline, close the app, and reopen it later, the sale is still visible. It also gives the implementation enough structure to support receipts, corrections, retries, and server reconciliation later.

The first sync protocol should be intentionally narrow:

- mobile generates a local transaction ID;
- mobile generates an idempotency key per write operation;
- mobile saves the transaction and queue operation locally in one SQLite transaction;
- sync sends queued operations to the backend one at a time or in a small ordered batch;
- backend deduplicates by idempotency key;
- backend returns a server transaction ID, server revision, and accepted status;
- mobile updates local state from the server response.

Conflict handling should start simple. For MVP sales and expenses created by one device, most conflicts can be avoided with append-only transaction creation and idempotent retries. Corrections should be represented as new operations or explicit edits with version checks, not silent overwrites.

## 101 Background

### What Does Offline-First Mean?

Offline-first means the app is designed to keep working when the network is unavailable, slow, expensive, or unreliable.

In a normal online-first app:

- the user enters data;
- the app sends it to a server;
- the server confirms it;
- the UI updates from the server response.

That fails badly in low-connectivity environments. If the user records a sale while offline, the app may reject it, spin forever, or lose trust.

In an offline-first app:

- the user enters data;
- the app saves it locally first;
- the UI reads from local storage;
- the app queues network sync for later;
- the server catches up when connectivity returns.

The user experience should make local-vs-synced state visible without making the user think about technical sync details.

### What Is SQLite?

SQLite is a small relational database engine embedded directly in the app. It stores structured data in a local database file on the device.

For this mobile app, SQLite is a good fit for:

- transactions;
- categories;
- local business profile snapshot;
- sync queue operations;
- idempotency keys;
- server IDs and revisions;
- receipt file metadata;
- simple local reports such as weekly revenue, expenses, and profit.

SQLite is not a remote database. Each phone has its own local SQLite database. The app still needs a backend API to synchronize data across devices, staff systems, and reporting.

### What Is A Sync Queue?

A sync queue is a durable local list of work the app needs to send to the server.

Example:

```text
User records a $10 sale offline
  -> save transaction locally
  -> add operation to sync queue
  -> show status "Saved on this phone"
  -> later, when online, send operation to backend
  -> backend accepts it
  -> mark transaction "Synced"
```

The queue must be durable. If the app crashes or the phone restarts, queued work should still exist.

### What Is Idempotency?

Idempotency means the same operation can be retried without creating duplicate side effects.

This matters because mobile sync often fails at ambiguous moments:

- the request reached the server, but the response was lost;
- the phone switched networks mid-request;
- the app was backgrounded;
- the server returned a timeout after partially completing work.

If the app retries without idempotency, one sale might be posted twice. For bookkeeping, that is unacceptable.

The usual pattern is:

- client creates a unique idempotency key for each logical operation;
- server stores the result for that key;
- retries with the same key return the same result or are rejected if the payload changed.

### What Is A Conflict?

A conflict happens when local and server state cannot both be accepted automatically.

Example:

- phone has transaction revision 3;
- staff member edits the same transaction in the back office, creating revision 4;
- phone later tries to edit revision 3;
- backend sees that the edit is based on stale data.

The backend should reject or flag the operation instead of silently overwriting newer data.

For this MVP, create operations can avoid most conflicts. Edit/correction workflows need explicit versioning.

### What Is A Local Projection?

A local projection is a queryable local copy of the data the mobile app needs to display.

For this project, that means the app should not only store raw sync operations. It should also store local rows that power the UI:

- recent sales and expenses;
- current sync status;
- simple totals;
- linked receipt file status.

The local projection may temporarily be ahead of the server while offline.

## Foundational Concepts

### Local Source Of Truth

The UI should read from SQLite, not directly from network responses.

This pattern keeps behavior consistent:

- offline: UI reads local state;
- slow connection: UI reads local state;
- online: network sync updates local state, then UI reacts to local changes.

The backend remains the system of record for organization-wide reporting, staff review, loans, and audit history. But on the phone, SQLite is the source of truth for the mobile user's current working view.

### Lazy Writes

Lazy write means:

1. Write locally first.
2. Queue network synchronization.
3. Send to the server later.

This is the correct strategy for critical user-entered bookkeeping data. A sale or expense should not disappear just because the user is offline.

### Operation Log Versus Current State

There are two related concepts:

- Current state table: what the app displays now.
- Operation log / sync queue: what the app still needs to send to the backend.

For example, `local_transactions` stores the row shown in the transaction list. `sync_operations` stores the queued operation that has not been accepted by the backend yet.

Do not rely only on an operation queue for the UI. That makes normal screens harder and becomes fragile as reports, corrections, and receipts grow.

### Local IDs And Server IDs

Offline-created records need local IDs before the server sees them.

Recommended model:

- `local_id`: generated by the mobile app, available immediately;
- `server_id`: assigned by backend after sync, nullable until accepted;
- `idempotency_key`: generated by the mobile app per operation;
- `server_revision`: assigned/incremented by backend.

The local ID lets the app link records before sync. The server ID becomes the canonical backend identity after sync.

### Sync Status Lifecycle

Recommended MVP statuses:

- `draft`: user is still entering/reviewing data; not queued;
- `local`: saved locally but not yet eligible for sync, or waiting for queue creation;
- `queued`: ready to sync;
- `syncing`: currently being sent;
- `synced`: accepted by backend;
- `failed`: sync failed and can be retried;
- `needs_review`: backend rejected or flagged the operation for user/staff review.

The first prototype can collapse `draft` into component state and persist only:

- `queued`
- `syncing`
- `synced`
- `failed`
- `needs_review`

But the domain vocabulary should reserve `draft` for receipt/speech/AI confirmation flows later.

### Retry Strategy

Retries should be deliberate:

- retry network/timeouts/server `5xx` with backoff;
- do not blindly retry validation errors;
- preserve the original idempotency key;
- increment local attempt count;
- store the last error message/code;
- avoid concurrent sync of the same operation.

The queue can start with manual retry plus foreground auto-retry. Background sync can be added later, but should not be the only path.

### Connectivity Awareness

Connectivity state is a hint, not a guarantee. A phone can report connectivity and still fail to reach the backend.

Use network state to decide when to attempt sync, but treat the actual request result as authoritative.

### Background Sync Limits

Mobile operating systems do not let apps run arbitrary background work whenever they want.

Expo BackgroundTask uses Android WorkManager and iOS BGTaskScheduler. These systems run tasks when the OS decides conditions are acceptable, such as network availability and battery state. iOS in particular may delay work, and background tasks are unavailable on iOS simulators.

Project implication: the app should sync in the foreground whenever possible and use background sync as a helpful enhancement, not as the only guarantee.

### Conflict Detection

Use optimistic concurrency:

- backend returns `server_revision`;
- mobile includes the last known `server_revision` when editing server-known records;
- backend rejects stale writes with a conflict response;
- mobile marks the local item `needs_review`.

For the first prototype, avoid complex conflicts by focusing on create-only sales/expenses. Add edit/correction conflicts later.

### Receipt Files

Receipt images should not be stored as large blobs in SQLite for the MVP.

Recommended model:

- store image file in app document storage;
- store file URI and metadata in SQLite;
- queue upload separately or as a dependent operation;
- do not mark the receipt fully synced until upload is confirmed.

This will be handled more deeply in the receipt-capture phase.

## Baeldung-Style Technology Introduction

### Offline-First In Practical Terms

The core pattern is simple:

```text
UI -> repository -> SQLite
                -> sync queue
                -> backend API when online
```

The UI does not call the backend directly when saving a transaction. It calls a local repository:

```ts
import * as Crypto from "expo-crypto";

type TransactionInput = {
  type: "sale" | "expense";
  amountMinorUnits: number;
  currencyCode: "USD";
  note?: string;
};

async function saveTransaction(input: TransactionInput) {
  const localId = Crypto.randomUUID();
  const idempotencyKey = Crypto.randomUUID();

  await db.withExclusiveTransactionAsync(async tx => {
    await tx.runAsync(
      `insert into transactions
        (local_id, type, amount_minor_units, currency_code, note, sync_status)
       values (?, ?, ?, ?, ?, ?)`,
      localId,
      input.type,
      input.amountMinorUnits,
      input.currencyCode,
      input.note ?? null,
      "queued"
    );

    await tx.runAsync(
      `insert into sync_operations
        (operation_id, entity_local_id, operation_type, idempotency_key, status)
       values (?, ?, ?, ?, ?)`,
      Crypto.randomUUID(),
      localId,
      "create_transaction",
      idempotencyKey,
      "queued"
    );
  });
}
```

The important part is not the exact SQL. The important part is that the user-visible transaction and the queued sync operation are saved in one local transaction.

### SQLite In Practical Terms

Expo SQLite gives the app a persisted local database:

```ts
import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("bookkeeping.db");

await db.execAsync(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  create table if not exists transactions (
    local_id text primary key,
    server_id text,
    type text not null,
    amount_minor_units integer not null,
    currency_code text not null,
    note text,
    sync_status text not null,
    server_revision integer,
    created_at text not null,
    updated_at text not null
  );

  create table if not exists sync_operations (
    operation_id text primary key,
    entity_local_id text not null,
    operation_type text not null,
    idempotency_key text not null unique,
    status text not null,
    attempt_count integer not null default 0,
    last_error_code text,
    last_error_message text,
    created_at text not null,
    next_attempt_at text
  );
`);
```

For money, store integer minor units, not floating-point decimals:

- 10 dollars = `1000` cents
- 1.25 dollars = `125` cents

This avoids floating-point rounding problems.

### Sync Queue In Practical Terms

The first queue processor can be simple:

```ts
async function drainSyncQueue() {
  const operations = await db.getAllAsync<SyncOperation>(
    `select * from sync_operations
     where status in ('queued', 'failed')
       and (next_attempt_at is null or next_attempt_at <= datetime('now'))
     order by created_at asc
     limit 10`
  );

  for (const operation of operations) {
    await syncOneOperation(operation);
  }
}
```

The first prototype should process one operation at a time. That is slower but simpler and safer for idempotency and ordering.

### Idempotency In Practical Terms

A create-transaction sync request should include a key:

```http
POST /mobile-sync/transactions
Idempotency-Key: 7e84c1ef-5b6c-4f01-9c76-7f65c9f45275
Content-Type: application/json
```

```json
{
  "clientOperationId": "op_123",
  "localTransactionId": "txn_local_123",
  "businessId": "biz_123",
  "type": "sale",
  "amountMinorUnits": 1000,
  "currencyCode": "USD",
  "occurredAt": "2026-08-08T16:00:00Z",
  "note": "cash sale"
}
```

If the phone sends this twice, the backend should not create two transactions.

### Conflict Handling In Practical Terms

For create-only MVP transactions:

- duplicate idempotency key means retry, not duplicate transaction;
- duplicate local transaction ID for the same business should be treated carefully;
- validation failure should mark `needs_review` or `failed_validation`, not retry forever.

For later edits:

```json
{
  "serverTransactionId": "txn_789",
  "expectedServerRevision": 3,
  "patch": {
    "note": "corrected category"
  }
}
```

If the server is already at revision 4, the backend should reject with conflict and return enough information for user/staff review.

## Recommendation

Use SQLite as a queryable local projection plus sync queue, not merely as a pending-operation cache.

For Phase 2, implement the mobile data model with these minimum tables:

- `transactions`
- `sync_operations`
- optionally `schema_migrations`, or use SQLite `PRAGMA user_version`

Use these minimum transaction statuses:

- `queued`
- `syncing`
- `synced`
- `failed`
- `needs_review`

Use these minimum sync fields:

- `operation_id`
- `operation_type`
- `entity_local_id`
- `idempotency_key`
- `status`
- `attempt_count`
- `last_error_code`
- `last_error_message`
- `next_attempt_at`
- `created_at`

Use these minimum ID fields on local transactions:

- `local_id`
- nullable `server_id`
- nullable `server_revision`

Treat background sync as a later enhancement. First implement:

- foreground sync on app open;
- foreground sync after save when online;
- manual retry button;
- durable queue state.

## Primary Decisions

### Pending Queue Only Or Queryable Local Projection?

Decision: store a queryable local projection plus a sync queue.

Why:

- user must see recent transactions while offline;
- local reports need transaction rows;
- receipt attachment status needs local relationships;
- retries need independent operation metadata;
- future AI/speech proposal flows need draft/proposed/confirmed state.

Pending queue only is too thin for this app.

### What Actions Must Work Offline In MVP?

MVP offline actions:

- create sale;
- create expense;
- view recent transactions;
- view basic local totals;
- queue transaction sync;
- retry failed sync;
- later: attach receipt photo.

Not required for first offline MVP:

- loan repayment posting;
- staff review;
- cross-device conflict resolution UI;
- AI extraction;
- OCR;
- speech-to-text;
- multi-business switching while offline unless pilot requires it.

### What Is The First Sync Contract?

Use one mobile-created operation per transaction create.

Request:

- idempotency key;
- local transaction ID;
- business ID;
- transaction type;
- amount in minor units;
- currency code;
- occurred-at timestamp;
- note/category if available.

Response:

- accepted/rejected status;
- local transaction ID echoed back;
- server transaction ID if accepted;
- server revision if accepted;
- validation errors if rejected;
- review reason if flagged.

### Which Conflicts Can Be Automatically Resolved?

Automatically handle:

- retry of same operation with same idempotency key and same payload;
- network timeout after backend accepted operation;
- duplicate sync attempt for already synced local transaction.

Require review:

- same idempotency key with different payload;
- edit based on stale server revision;
- backend validation failure;
- suspicious duplicate transaction detection;
- receipt upload linked to missing/rejected transaction.

## Alternatives Considered

### AsyncStorage / Key-Value Storage Only

Pros:

- simpler API;
- good for small preferences and simple flags.

Cons:

- awkward for transaction lists, totals, filtering, indexing, and reports;
- harder to maintain relational links between transactions, operations, receipts, and statuses;
- not a good fit for financial records.

Assessment:

- Use only for simple preferences if needed. Do not use as the primary offline bookkeeping store.

### SQLite Pending Queue Only

Pros:

- simple first implementation;
- easy to post operations later.

Cons:

- UI has to reconstruct user-visible state from operations;
- local reporting becomes awkward;
- receipt/status relationships become fragile;
- less representative of the real app.

Assessment:

- Not recommended.

### Full Sync Framework Or Local-First Database

Examples to research later only if needed:

- WatermelonDB;
- RxDB;
- ElectricSQL;
- PowerSync;
- Realm/Atlas Device SDK alternatives.

Pros:

- may provide higher-level sync abstractions;
- can reduce custom sync code for complex multi-device data.

Cons:

- extra architecture/vendor complexity;
- may impose backend/database assumptions;
- may be overkill for first MVP;
- some options may introduce paid-service or licensing considerations.

Assessment:

- Defer. The first prototype should use simple custom sync so the project learns its actual requirements.

### Server-Only Writes

Pros:

- simpler backend consistency;
- no local conflict handling.

Cons:

- does not meet offline requirement;
- bad fit for low-connectivity users;
- creates trust problems when users cannot record business events.

Assessment:

- Rejected for recipient app.

## Prototype Impact

Phase 2 prototype should prove:

- SQLite database initializes with migrations.
- User-created transaction is saved locally.
- Transaction remains after app restart.
- Recent transactions screen/list reads from SQLite.
- Transaction status is visible.
- Sync operation is created atomically with the local transaction.
- Failed operations can be retried.
- Queue processor preserves idempotency keys across retries.

Do not build full backend sync yet unless intentionally combining Phase 2 and Phase 3. Phase 2 can use a fake sync function that simulates success/failure and updates local status.

## Risks / Follow-Up

### Background Sync Reliability

Risk:

- iOS and Android control background execution. Work may not run immediately, and iOS simulator cannot test Expo BackgroundTask.

Mitigation:

- foreground sync first;
- manual retry visible;
- background sync later as enhancement.

### SQLite Migration Discipline

Risk:

- schema changes can break existing local data.

Mitigation:

- add migration/version strategy from first SQLite implementation;
- keep Phase 2 schema small;
- test app restart and migration path.

### Financial Data Correctness

Risk:

- early transaction table may drift away from eventual ledger model.

Mitigation:

- name early records as transaction intake or simple transactions;
- avoid pretending the mobile local table is the final double-entry ledger;
- backend Phase 3 can decide when to convert intake records to ledger entries.

### Duplicate Posting

Risk:

- retries may duplicate sales/expenses if backend does not enforce idempotency.

Mitigation:

- generate idempotency key at local save time;
- store it durably;
- backend must persist idempotency result.

### Multi-Device Editing

Risk:

- same business may eventually use multiple devices.

Mitigation:

- MVP assumes one primary device per business unless field requirements say otherwise;
- use server revisions so multi-device support can be added without redesigning everything.

## Cost / Nonprofit Notes

No new nonprofit-cost entry is required for Phase 2.

Expo SQLite, local file storage, and local sync queue implementation do not create direct paid-service accounts. Future costs may appear when adding:

- EAS paid plan needs;
- backend hosting;
- cloud database;
- S3 receipt storage;
- OCR/speech/AI services;
- managed sync vendors if considered.

Those should be added to `nonprofit-cost-programs-running-list.md` when researched.

## Recommended Next Action

Create the Phase 2 prototype spec:

- `specs/mobile-poc/offline-storage-and-sync-queue.md`

The spec should define:

- local SQLite schema;
- status lifecycle;
- transaction save behavior;
- fake sync behavior;
- retry behavior;
- app restart persistence acceptance test;
- what is deliberately out of scope.

Then implement the local mobile persistence spike.

## Sources

- Android Developers: Build an offline-first app: https://developer.android.com/topic/architecture/data-layer/offline-first
- Android Developers: Data layer and source of truth: https://developer.android.com/topic/architecture/data-layer
- Expo SQLite: https://docs.expo.dev/versions/v55.0.0/sdk/sqlite/
- Expo FileSystem: https://docs.expo.dev/versions/latest/sdk/filesystem/
- Expo FileSystem legacy directories: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy/
- Expo BackgroundTask: https://docs.expo.dev/versions/latest/sdk/background-task/
- Expo TaskManager: https://docs.expo.dev/versions/latest/sdk/task-manager/
- Expo Crypto: https://docs.expo.dev/versions/latest/sdk/crypto/
- React Native NetInfo: https://github.com/react-native-netinfo/react-native-netinfo
- React Native Async Storage: https://react-native-async-storage.github.io/
- RFC 9110 HTTP Semantics, idempotent methods: https://datatracker.ietf.org/doc/html/rfc9110
- Stripe idempotent requests: https://docs.stripe.com/api/idempotent_requests
- Microsoft Azure API design, idempotent operations: https://learn.microsoft.com/en-us/azure/architecture/microservices/design/api-design
- Microsoft REST API guidelines: https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md

## Learn More

Best first reads:

- Android offline-first guide: https://developer.android.com/topic/architecture/data-layer/offline-first
- Expo SQLite docs: https://docs.expo.dev/versions/v55.0.0/sdk/sqlite/
- Expo BackgroundTask docs: https://docs.expo.dev/versions/latest/sdk/background-task/
- Stripe idempotency docs: https://docs.stripe.com/api/idempotent_requests

Good search terms for beginner-friendly follow-up reading:

- `offline first architecture local source of truth sync queue`
- `mobile offline sync conflict resolution idempotency`
- `SQLite mobile app migrations WAL foreign keys`
- `React Native SQLite offline first`
- `idempotency keys REST API retries duplicate requests`

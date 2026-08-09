# Phase 03 Research: Thin Backend Sync Slice With Spring Boot Modular Monolith

Date: 2026-08-08

Related plan:

- `../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md`
- `phase-02-offline-first-sqlite-sync-architecture.md`

## Question

What is the thinnest useful backend architecture for accepting mobile offline sync operations while preserving modular-monolith direction, validation, idempotency, auditability, and a path toward real financial correctness?

## High-Level Summary

The first backend should be a Spring Boot modular monolith, not microservices.

For the proof of concept, the backend should do one important thing well: accept mobile-created sale/expense sync operations without duplicating them on retry. It should validate the request, enforce idempotency, persist a server-side transaction-intake record, assign a server ID and revision, and write an audit event in the same database transaction.

Do not build the full accounting ledger, loans, reporting, AI, documents, Cognito, or AWS deployment stack in this phase. Keep those as later modules and integration points.

Recommended first backend modules:

- `organizations`
- `businesses`
- `mobileSync`
- `transactionIntake`
- `audit`
- `sharedKernel`

Use Spring Modulith or Spring Modulith-style package boundaries so the backend remains one deployable while still having enforceable module separation.

The key design choice: the mobile sync endpoint should create a server-side transaction-intake record first. Later, the ledger module can convert accepted intake records into double-entry ledger postings. This avoids pretending the first prototype has a complete accounting engine while still giving the system durable, auditable records.

## 101 Background

### What Is A Backend?

The backend is the server-side application that receives data from the mobile app, stores shared records, enforces business rules, exposes APIs, and supports staff/admin/reporting workflows.

For this project, the backend will eventually handle:

- organizations and tenants;
- businesses and owners;
- users and roles;
- mobile sync;
- sales and expenses;
- double-entry ledger posting;
- loans and repayments;
- documents and receipt extraction;
- AI proposals;
- reports;
- audit history.

The Phase 3 backend does not need all of that. It needs only enough structure to avoid painting the architecture into a corner.

### What Is Spring Boot?

Spring Boot is a Java framework for building production-grade applications quickly. It builds on the Spring Framework and provides conventions, auto-configuration, dependency management, embedded servers, and integrations for common application needs.

For this project, Spring Boot is useful because it has mature support for:

- REST APIs;
- validation;
- transactions;
- relational database access;
- authentication/authorization integration later;
- testing;
- observability;
- background workers and events;
- modular application patterns through Spring Modulith.

### What Is A Modular Monolith?

A monolith is one deployable application. A modular monolith is one deployable application with clear internal module boundaries.

That means:

- one backend process;
- one deployment pipeline;
- usually one primary database;
- separate packages/modules for different business capabilities;
- clear rules about which module can call which other module;
- tests that catch unwanted coupling.

This is different from microservices, where each capability might be deployed separately with its own database/API. Microservices add operational complexity. For an early product with changing workflows, a modular monolith is usually the more pragmatic starting point.

### What Is Spring Modulith?

Spring Modulith is a Spring project that helps build structured modular applications with Spring Boot. It treats direct sub-packages under the main application package as application modules by default, supports module-boundary verification, can generate module documentation, supports module-level integration tests, and provides event publication support.

For this project, Spring Modulith is useful because it can make "modular monolith" enforceable instead of aspirational.

### What Is Idempotency On The Backend?

Idempotency means the backend can safely receive the same logical operation more than once and still produce only one business effect.

Mobile sync needs this because the mobile app may retry after timeouts or connectivity failures. The server may have accepted the transaction, but the phone may not have received the response.

The backend should store idempotency keys and return the original result on retry.

### What Is An Audit Event?

An audit event is a durable record of something important that happened.

For Phase 3, example audit events:

- mobile transaction accepted;
- mobile transaction rejected by validation;
- idempotent retry returned existing result;
- transaction marked needs review.

Audit events are not just logs. Logs are operational text streams and may be rotated. Audit events are structured business records that support review, compliance, debugging, and funder/report traceability.

### What Is A Server Revision?

A server revision is a version number assigned by the backend to a record. It helps the mobile app and backend detect stale edits later.

For creates, the first accepted transaction can be revision `1`.

For later edits, the mobile app can say:

```json
{
  "serverTransactionId": "txn_789",
  "expectedServerRevision": 1,
  "changes": {
    "note": "Corrected category"
  }
}
```

If the backend record is already revision `2`, the backend can reject the edit as a conflict instead of silently overwriting newer data.

## Foundational Concepts

### Module Boundary

A module boundary defines what code belongs together and what it exposes to the rest of the application.

For example:

- `mobileSync` should know how to receive mobile operations.
- `transactionIntake` should know how to store accepted transaction-intake records.
- `audit` should know how to append audit events.
- `mobileSync` should not reach directly into hidden repository internals of unrelated modules.

In Java/Spring, modules can start as packages. Spring Modulith can verify that modules do not depend on internal types from other modules.

### Package Arrangement

Recommended starting package shape:

```text
org.homeroots.bookkeeping
  BookkeepingApplication.java

  organizations
    OrganizationId.java
    internal/

  businesses
    BusinessId.java
    BusinessLookup.java
    internal/

  mobileSync
    MobileSyncController.java
    MobileSyncService.java
    api/
    internal/

  transactionIntake
    TransactionIntakeService.java
    TransactionIntakeRecord.java
    internal/

  audit
    AuditLog.java
    AuditEvent.java
    internal/

  sharedKernel
    Money.java
    CurrencyCode.java
    IdempotencyKey.java
```

Direct sub-packages can become logical application modules. Keep public APIs small. Put implementation details in `internal` packages.

### Transaction Boundary

A transaction boundary defines what database changes commit together.

For mobile transaction create:

1. Validate request.
2. Check idempotency key.
3. Create server transaction-intake record.
4. Create idempotency record/result.
5. Append audit event.
6. Commit all together.

If any required step fails, the transaction should roll back. The backend should not accept the transaction without the idempotency result or audit event.

### Request Validation

Validation should happen at multiple levels:

- API shape validation: required fields, types, string length.
- Domain validation: amount must be positive, currency must be supported, business must exist, operation type must be allowed.
- Authorization validation later: user/device is allowed to sync for that business.
- Idempotency validation: same key cannot be reused with different payload.

Spring supports Jakarta Bean Validation through `spring-boot-starter-validation`, `@Valid`, and service-level validation with `@Validated`.

### Problem Details

For REST errors, Spring supports RFC 9457 Problem Details. This gives structured error responses rather than ad hoc strings.

For the mobile app, structured errors matter because it needs to decide:

- retry later;
- mark failed;
- mark needs review;
- ask user to correct input.

### Idempotency Record

The backend should persist something like:

```text
idempotency_key
request_hash
operation_type
response_status
response_body
created_at
expires_at or retained_until
```

For financial-ish data, keep idempotency records long enough to protect against real retry windows. For the prototype, do not prematurely expire them.

### Request Hash

A request hash lets the backend detect misuse of the same idempotency key with a different payload.

Same key + same payload:

- return original result.

Same key + different payload:

- return conflict.

### Transaction Intake Versus Ledger

Transaction intake is a record of what the mobile app submitted and what the backend accepted.

Ledger posting is the later accounting transformation into double-entry records.

For Phase 3, transaction intake is enough. The backend can store:

- sale or expense type;
- amount;
- currency;
- business;
- occurred-at timestamp;
- submitted note/category;
- source device/user metadata if available;
- status.

Later, a ledger module can transform accepted intake records into debit/credit entries.

### Audit Trail

The audit module should append immutable events. Do not update old audit events except maybe internal technical metadata.

Minimal fields:

- audit event ID;
- event type;
- actor type;
- actor ID if known;
- organization/business ID;
- target type;
- target ID;
- timestamp;
- structured details JSON.

### Domain Events

Inside the modular monolith, modules can interact through application/domain events instead of direct cross-module calls.

For Phase 3, do not overbuild this. Direct service calls between `mobileSync`, `transactionIntake`, and `audit` are acceptable if boundaries are clear. Introduce Spring Modulith events when secondary behavior begins to grow, such as ledger posting, reporting projection updates, document jobs, or notifications.

## Baeldung-Style Technology Introduction

### Spring Boot REST Controller In Practical Terms

A Spring Boot controller receives HTTP requests:

```java
@RestController
@RequestMapping("/api/mobile-sync")
class MobileSyncController {

  private final MobileSyncService mobileSyncService;

  MobileSyncController(MobileSyncService mobileSyncService) {
    this.mobileSyncService = mobileSyncService;
  }

  @PostMapping("/transactions")
  ResponseEntity<MobileSyncTransactionResponse> createTransaction(
      @RequestHeader("Idempotency-Key") String idempotencyKey,
      @Valid @RequestBody MobileCreateTransactionRequest request
  ) {
    var response = mobileSyncService.createTransaction(idempotencyKey, request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
```

The controller should stay thin. It should not implement business rules directly.

### Bean Validation In Practical Terms

Request DTOs can declare basic constraints:

```java
record MobileCreateTransactionRequest(
    @NotBlank String localTransactionId,
    @NotBlank String businessId,
    @NotNull TransactionType type,
    @Positive long amountMinorUnits,
    @Pattern(regexp = "USD") String currencyCode,
    @NotNull Instant occurredAt,
    @Size(max = 500) String note
) {}
```

This catches basic invalid input before domain logic runs.

### Service Transaction In Practical Terms

The service owns the transaction boundary:

```java
@Service
class MobileSyncService {

  private final IdempotencyService idempotency;
  private final TransactionIntakeService transactionIntake;
  private final AuditLog auditLog;

  @Transactional
  MobileSyncTransactionResponse createTransaction(
      String idempotencyKey,
      MobileCreateTransactionRequest request
  ) {
    return idempotency.executeOrReturnExisting(
        idempotencyKey,
        request,
        () -> {
          var record = transactionIntake.acceptMobileTransaction(request);
          auditLog.append(AuditEvent.mobileTransactionAccepted(record.id()));
          return MobileSyncTransactionResponse.accepted(
              request.localTransactionId(),
              record.id(),
              record.revision()
          );
        }
    );
  }
}
```

The important idea: transaction record, idempotency result, and audit event commit together.

### Modular Monolith In Practical Terms

A modular monolith is enforced by tests:

```java
class ModularityTests {

  @Test
  void verifiesModuleBoundaries() {
    ApplicationModules.of(BookkeepingApplication.class).verify();
  }
}
```

If `mobileSync` reaches into `transactionIntake.internal`, this test should fail.

### Idempotency In Practical Terms

Idempotency table:

```sql
create table idempotency_records (
  idempotency_key varchar(255) primary key,
  operation_type varchar(100) not null,
  request_hash varchar(128) not null,
  response_status integer not null,
  response_body jsonb not null,
  created_at timestamptz not null
);
```

Transaction-intake table:

```sql
create table transaction_intake_records (
  id uuid primary key,
  organization_id uuid not null,
  business_id uuid not null,
  local_transaction_id varchar(100) not null,
  type varchar(20) not null,
  amount_minor_units bigint not null,
  currency_code char(3) not null,
  occurred_at timestamptz not null,
  note varchar(500),
  status varchar(40) not null,
  revision integer not null,
  created_at timestamptz not null,
  unique (business_id, local_transaction_id)
);
```

The exact schema can evolve, but the idempotency uniqueness and local/server identity mapping should exist from the first backend prototype.

## Recommendation

Build a thin Spring Boot modular monolith backend with a single real mobile sync endpoint:

```text
POST /api/mobile-sync/transactions
```

The endpoint should:

1. Require an `Idempotency-Key` header.
2. Validate the request body.
3. Verify the business exists or use a seeded stub business for the prototype.
4. Accept only one MVP currency.
5. Store a server transaction-intake record.
6. Store the idempotency result.
7. Append an audit event.
8. Return the mobile `localTransactionId`, backend `serverTransactionId`, and `serverRevision`.

Use package modules from day one. Add Spring Modulith verification tests early, even if the first implementation does not use every Spring Modulith runtime feature.

Do not implement full double-entry posting in Phase 3. Represent the accepted mobile record as transaction intake and leave ledger posting for a later financial-design phase.

## Primary Decisions

### What Backend Modules Should Exist First?

Use these initial modules:

- `mobileSync`: API boundary for mobile sync requests.
- `transactionIntake`: accepted mobile financial-intake records.
- `businesses`: business lookup and ownership context, seeded or stubbed for prototype.
- `organizations`: tenant/organization context, seeded or stubbed for prototype.
- `audit`: append-only audit events.
- `sharedKernel`: small value objects shared across modules.

Defer:

- `ledger`;
- `loans`;
- `documents`;
- `aiProposals`;
- `reports`;
- `auth`;
- `outcomeMetrics`.

### Should The First Prototype Create Real Double-Entry Ledger Entries?

Decision: no.

Reason:

- ledger correctness matters and should not be rushed;
- Phase 3's purpose is mobile sync safety, not accounting model completion;
- transaction intake keeps data durable while preserving a clean future path to ledger posting.

Add a clear status such as `ACCEPTED_PENDING_LEDGER_POSTING` if useful.

### How Should Idempotency Work?

Use client-generated idempotency keys. The mobile app already stores an idempotency key per sync operation from Phase 2.

Backend behavior:

- new key + valid payload: process and persist result;
- same key + same payload: return original result;
- same key + different payload: return `409 Conflict`;
- validation failure before processing: return validation error and do not create final transaction-intake record;
- ambiguous internal failure: safe retry depends on whether idempotency result was committed.

For the prototype, store idempotency results indefinitely or with a long enough retention window. Do not prune aggressively.

### How Should Server Revisions Work?

For created records:

- assign revision `1`.

For later updates:

- require `expectedServerRevision`;
- increment revision on accepted update;
- reject stale updates with `409 Conflict`.

Phase 3 only needs create behavior, but including `serverRevision` in the create response establishes the contract.

### How Should Audit Work?

Append audit events in the same transaction as accepted writes.

Minimum event types:

- `MOBILE_TRANSACTION_ACCEPTED`
- `MOBILE_TRANSACTION_IDEMPOTENT_REPLAYED`
- `MOBILE_TRANSACTION_REJECTED`

For the first implementation, it is acceptable to audit accepted writes first and add rejected-write audit later if validation error volume is noisy.

### What Can Be Stubbed?

Stub or seed:

- one organization;
- one business;
- one mobile user/device identity;
- authentication;
- authorization;
- production database setup.

Keep real:

- validation;
- idempotency;
- transaction-intake persistence;
- server IDs/revisions;
- audit event append;
- integration tests around duplicate retry behavior.

## Prototype API Sketch

### Request

```http
POST /api/mobile-sync/transactions
Idempotency-Key: 7e84c1ef-5b6c-4f01-9c76-7f65c9f45275
Content-Type: application/json
```

```json
{
  "clientOperationId": "op_local_123",
  "localTransactionId": "txn_local_123",
  "businessId": "biz_seed_001",
  "type": "sale",
  "amountMinorUnits": 1000,
  "currencyCode": "USD",
  "occurredAt": "2026-08-08T16:00:00Z",
  "note": "cash sale"
}
```

### Accepted Response

```json
{
  "status": "accepted",
  "localTransactionId": "txn_local_123",
  "serverTransactionId": "8fb9f8a1-22df-456b-b3cb-b46bd3d845c9",
  "serverRevision": 1
}
```

### Validation Failure

Use a structured error response. Problem Details is a good default shape:

```json
{
  "type": "https://example.org/problems/validation-error",
  "title": "Validation failed",
  "status": 400,
  "detail": "The transaction amount must be greater than zero.",
  "fieldErrors": [
    {
      "field": "amountMinorUnits",
      "message": "must be greater than 0"
    }
  ]
}
```

### Idempotency Conflict

```json
{
  "type": "https://example.org/problems/idempotency-conflict",
  "title": "Idempotency key conflict",
  "status": 409,
  "detail": "The idempotency key was already used with a different request payload."
}
```

## Alternatives Considered

### Microservices

Pros:

- independent deployment;
- clearer physical service ownership later.

Cons:

- too much operational overhead now;
- distributed transactions and cross-service consistency would complicate financial workflows;
- harder local development and testing;
- premature service boundaries are likely to be wrong.

Assessment:

- Not recommended for MVP.

### One Unstructured Spring Boot App Without Module Rules

Pros:

- fastest first code;
- fewer dependencies.

Cons:

- module boundaries will erode quickly;
- harder for AI-assisted coding to preserve architecture;
- financial, AI, documents, loans, and reporting code can tangle.

Assessment:

- Avoid. Even a lightweight module-boundary test is worth it.

### Full Ledger First

Pros:

- closer to final financial correctness;
- fewer later migration questions.

Cons:

- slows the proof of concept;
- requires more accounting design before validating mobile sync;
- risks implementing the wrong ledger model before field workflows are clear.

Assessment:

- Defer. Capture transaction intake first.

### Backend-As-A-Service

Examples:

- Supabase;
- Firebase;
- Appwrite;
- Amplify/AppSync.

Pros:

- faster backend bootstrap;
- auth/storage/database pieces can be quick.

Cons:

- custom financial validation, audit, idempotency, and modular domain logic still need careful implementation;
- may create vendor-specific sync assumptions;
- proposed architecture is already Spring Boot/AWS-native.

Assessment:

- Keep as alternative only if custom backend velocity becomes a problem.

## Prototype Impact

Phase 3 prototype should prove:

- Spring Boot app starts locally.
- A `POST /api/mobile-sync/transactions` endpoint accepts a valid mobile transaction.
- Request validation rejects invalid amount/currency/type.
- Idempotency key prevents duplicate transaction creation on retry.
- Reusing an idempotency key with a different payload returns conflict.
- Accepted transaction receives server ID and revision.
- Audit event is written for accepted transaction.
- Mobile Phase 2 sync queue can call this endpoint and transition local status to `synced`.

Suggested tests:

- controller validation test;
- service idempotency test;
- repository persistence test;
- integration test for duplicate retry;
- Spring Modulith `ApplicationModules.of(...).verify()` module-boundary test.

## Risks / Follow-Up

### Idempotency Result Storage

Risk:

- storing full response bodies can create schema and retention questions.

Mitigation:

- for prototype, store response JSON;
- later decide retention period and whether to store normalized result references instead.

### Request Hash Canonicalization

Risk:

- hashing raw JSON can treat semantically identical payloads as different if field order or formatting changes.

Mitigation:

- hash a canonical representation based on parsed DTO fields, not raw request text.

### Audit Scope

Risk:

- too much audit data too early creates noise; too little loses traceability.

Mitigation:

- start with accepted writes and idempotency conflicts;
- add rejected validation audit if needed for field debugging.

### Ledger Gap

Risk:

- transaction intake is not the final accounting ledger.

Mitigation:

- name it clearly;
- document that accepted intake records require later ledger posting;
- do not expose intake totals as final audited accounting reports.

### Auth Gap

Risk:

- Phase 3 stubs auth, so endpoint is not production-safe.

Mitigation:

- bind the prototype to local/dev only;
- add authentication before any real recipient data is used.

## Cost / Nonprofit Notes

No new nonprofit-cost entry is required for local Spring Boot research.

Future backend cost entries should be added when evaluating:

- AWS RDS/Aurora PostgreSQL;
- ECS Fargate or Lambda hosting;
- S3 receipt storage;
- Cognito;
- CloudWatch/Sentry;
- Textract/Transcribe/Polly/Bedrock;
- managed backend alternatives.

AWS nonprofit program information is already tracked in:

- `nonprofit-cost-programs-running-list.md`

## Recommended Next Action

Create the Phase 3 backend prototype spec:

- `specs/backend-poc/mobile-sync-api.md`
- `specs/backend-poc/transaction-validation-and-audit.md`

Then implement a local Spring Boot prototype with:

- seeded organization/business;
- mobile transaction sync endpoint;
- local database persistence;
- idempotency table;
- transaction-intake table;
- audit-event table;
- tests for duplicate retry behavior.

## Sources

- Spring Modulith overview: https://docs.spring.io/spring-modulith/docs/current-SNAPSHOT/reference/html/
- Spring Modulith fundamentals: https://docs.spring.io/spring-modulith/reference/1.1/fundamentals.html
- Spring Modulith verification: https://docs.spring.io/spring-modulith/reference/verification.html
- Spring Modulith application-module testing: https://docs.spring.io/spring-modulith/reference/testing.html
- Spring Modulith events: https://docs.spring.io/spring-modulith/reference/events.html
- Spring Framework transaction management: https://docs.spring.io/spring-framework/reference/data-access/transaction.html
- Spring Framework transaction-bound events: https://docs.spring.io/spring-framework/reference/6.2/data-access/transaction/event.html
- Spring Boot validation: https://docs.spring.io/spring-boot/reference/io/validation.html
- Spring Framework Bean Validation: https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html
- Spring MVC validation: https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-validation.html
- Spring MVC error responses and Problem Details: https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html
- Spring Data JPA transactions: https://docs.spring.io/spring-data/jpa/reference/jpa/transactions.html
- Spring Data JDBC reference: https://docs.spring.io/spring-data/relational/reference/jdbc.html
- RFC 9110 HTTP idempotent methods: https://datatracker.ietf.org/doc/html/rfc9110
- Stripe idempotent requests: https://docs.stripe.com/api/idempotent_requests
- Microsoft Azure API design, idempotent operations: https://learn.microsoft.com/en-us/azure/architecture/microservices/design/api-design
- Microsoft REST API guidelines: https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md

## Learn More

Best first reads:

- Spring Boot docs: https://docs.spring.io/spring-boot/
- Spring Modulith project page: https://spring.io/projects/spring-modulith/
- Spring Modulith quickstart: https://spring.io/projects/spring-modulith/#learn
- Spring validation overview: https://docs.spring.io/spring-framework/reference/core/validation.html
- Spring transaction management: https://docs.spring.io/spring-framework/reference/data-access/transaction.html

Good search terms for beginner-friendly follow-up reading:

- `Spring Boot REST API validation transaction tutorial`
- `Spring Modulith modular monolith introduction`
- `modular monolith vs microservices Spring Boot`
- `idempotency key REST API duplicate retry`
- `Spring Boot ProblemDetail validation errors`
- `Spring Boot audit log append-only events`

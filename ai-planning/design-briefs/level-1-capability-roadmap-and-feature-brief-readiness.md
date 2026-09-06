# Level 1 Capability Roadmap and Feature-Brief Readiness

Status: Draft planning artifact — does not amend the V1 Scope Map and Milestone Plan or authorize implementation

Purpose: Turn JLP's Level 1 capability list into a separate sequence of milestones and slices. For each slice, identify the design brief required, whether the available source material is sufficient to create that brief, and the product or technical decisions that must be resolved before an OpenSpec proposal can be accepted.

Companion sources: [V1 Scope Map and Milestone Plan](V1%20Scope%20Map%20and%20Milestone%20Plan.md), [JLP UX Synthesis and V1 Design Decisions](JLP%20UX%20Synthesis%20and%20V1%20Design%20Decisions.md), [Reinvest-to-Grow Methodology Synthesis and V1 Design Brief](Reinvest-to-Grow%20Methodology%20Synthesis%20and%20V1%20Design%20Brief.md), and the accepted product guardrails under [`openspec/specs/`](../../openspec/specs/).

## How to use this roadmap

JLP's documents establish the business objective, entrepreneur context, operating principles, and several feature expectations. They are intentionally more directional than a detailed screen or behavior specification. Each new feature brief therefore must distinguish:

1. **Source intent** — what JLP's material directly states or strongly implies.
2. **Derived product contract** — detailed requirements, screens, workflows, states, and non-functional behavior defined to fulfill that intent.
3. **Owner decisions** — facts that cannot safely be inferred from direction alone.

`Source-ready` means the project has enough direction to create a reviewable feature brief now. `Proposal-ready` means the brief has an outcome, scope, non-goals, observable evidence, dependencies, and all material product/technical decisions resolved. A source-ready brief is not automatically proposal-ready.

## Relationship to the existing roadmap

This is a Level 1 capability map, not a replacement for the existing milestone plan.

- M1 remains the current narrow, synthetic, local-first interaction proof.
- M1.1 remains the real offline multilingual speech/TTS spike.
- M1.2 remains the narrow live-sync proof.
- The milestones below organize the full Level 1 feature set after those proofs; they do not pull their scope backward into M1.

## Milestone sequence

| Milestone | Level 1 outcome | JLP capability coverage |
| --- | --- | --- |
| L1-A — Trusted access and platform foundation | A person can securely access a business context, and the platform has a safe local/cloud boundary. | Mobile-first, authentication, multilingual interface, cloud backend/database, security/audit foundation. |
| L1-B — Trusted Business Journal | An entrepreneur can record, correct, and retain core business activity despite poor connectivity. | Sales, expenses, cash tracking, transaction history, offline/low-connectivity, sync. |
| L1-C — Evidence and assisted input | Receipt, speech, and AI assistance reduce entry effort without becoming authoritative. | Receipt/document capture, AI organization/classification, speech-assisted input, multilingual input. |
| L1-D — Business understanding | The entrepreneur can understand basic performance and reports in plain language. | Profit/performance calculations, simple business reports. |
| L1-E — HRF support and operational visibility | HRF can support the pilot, see permitted activity, and operate from trustworthy metrics. | Basic admin capability, analytics/monitoring, reporting/export. |
| L1-F — Conditional operational extensions | Scope is added only after its operating model and authoritative data are defined. | Basic inventory tracking, loan balance/repayment visibility, general documents if required. |

## L1-A — Trusted access and platform foundation

| Slice | Required design brief | Brief status | Proposal gate: open decisions |
| --- | --- | --- | --- |
| L1-A1 Mobile shell, onboarding, accessibility, and language setup | **Entrepreneur Access, Onboarding, and Localization Brief** | Source-ready. The UX synthesis defines plain language, low-literacy, small-Android, interruption, and localization principles. | **Product:** first-use value statement; required entrepreneur/business fields; supported languages and translation-review owner; country/currency defaults; help/support path. **Tech:** Android/iPhone floor; local accessibility target; locale fallback; offline onboarding behavior. |
| L1-A2 Authentication, roles, and business context | **Identity, Roles, and Business Context Brief** | Source-ready. The V1 synthesis and accepted domain model define entrepreneur, business, program, role, and language context. | **Product:** self-registration versus provisioned accounts; one or multiple businesses; staff role matrix; recovery/support owner. **Tech:** authentication provider; session/offline policy; MFA rules for staff; account-recovery controls. |
| L1-A3 Local-first cloud-record boundary | Existing **M1.2 Live Sync REST API Proof Brief**, followed by a **Production Local-First Sync and Backend Foundation Brief** | M1.2 is ready for its limited synthetic proof; the production brief is source-ready but not proposal-ready. | **Product:** what records sync first; who resolves conflicts; user-visible retry/review behavior. **Tech:** nonprofit-owned cloud account/region/budget; API and data-store selection; offline conflict algorithm; device auth; backup/recovery objectives; deployment ownership. |
| L1-A4 Security, privacy, audit, and data lifecycle | **Security, Privacy, Audit, and Recovery Foundation Brief** | Source-ready for a baseline. Guardrails and prior architecture material establish least privilege, traceability, and synthetic-data boundaries. | **Product:** data classification; consent; participant-data approval; retention/deletion policy; staff access policy; incident owner. **Tech:** threat model; encryption/key ownership; logging redaction; audit-event scope; backup/restore targets; vulnerability and incident-response process. |

## L1-B — Trusted Business Journal

| Slice | Required design brief | Brief status | Proposal gate: open decisions |
| --- | --- | --- | --- |
| L1-B1 Sale, expense, and cash-movement lifecycle | Existing [M1 Rapid Thin-Slice Prototype Brief](m1-rapid-thin-slice-prototype.md), expanded by a **Business Journal Transaction Lifecycle Brief** | Source-ready. Existing M1 screens/workflows prove the core pattern; the accepted domain model protects confirmation and traceability. | **Product:** exact cash-movement policy; required versus optional fields; categories; payment methods; category/product defaults; correction/void rules. **Tech:** durable model; validation; local migration; audit representation. |
| L1-B2 History, detail, correction, and duplicate review | **Transaction History, Correction, and Trust Brief** | Source-ready. The UX synthesis names the screens and the domain model requires correction/audit concepts. | **Product:** date/search/filter needs; which changes are permitted; delete versus void; duplicate-review language; receipt/source visibility. **Tech:** pagination/search approach; immutable audit representation; offline edit and conflict behavior. |
| L1-B3 Offline resilience and sync experience | **Offline Resilience and Sync Experience Brief** | Source-ready. Existing guardrails, M1 workflows, and sync research provide a strong behavioral base. | **Product:** when to surface `Needs attention`; manual conflict path; support escalation. **Tech:** queue/retry policy; network detection; idempotency; conflict detection; storage quotas; test device/connectivity matrix. |

## L1-C — Evidence and assisted input

| Slice | Required design brief | Brief status | Proposal gate: open decisions |
| --- | --- | --- | --- |
| L1-C1 Receipt capture, retention, and assisted review | Existing M1 receipt design/workflows, expanded by a **Receipt and Document Evidence Brief** | Source-ready for receipts. Generic documents are not yet source-ready. | **Product:** receipt-only versus other document types; retention; replacement/deletion policy; whether a receipt is required for any transaction. **Tech:** local versus cloud storage; upload timing; image limits; malware scanning; OCR service/local path; access control. |
| L1-C2 Offline STT/TTS in English, French, and Haitian Creole | Existing [M1.1 Offline Multilingual Speech Design Brief](m1.1-offline-multilingual-speech.md) | Brief is ready to begin OpenSpec Propose after M1 completion; permanent-engine selection is intentionally not yet decided. | **Product:** accepted language quality and fallback copy; whether TTS is optional when a voice is unavailable. **Tech:** Whisper runtime/model/quantization; target Android and iPhone floors; performance thresholds; Haitian Creole offline-TTS availability; synthetic evaluation corpus. |
| L1-C3 Bounded AI organization, categorization, explanations, and next actions | **Bounded AI Assistance and Human Confirmation Brief** | Source-ready for bounded assistance only. The guardrails rule out an autonomous coach, credit decisioning, or unsupported impact claims. | **Product:** category taxonomy; permitted questions and explanations; recommendation evidence/copy; confidence labels; consent; correction path. **Tech:** local versus cloud provider; data sent to provider; retention/opt-out; schema/versioning; evaluation set; latency and cost limits; failure behavior. |
| L1-C4 Multilingual UI content and translation operations | **Localization Content, Review, and Fallback Brief** | Source-ready. The project has clear Haitian Creole priority and plain-language/accessibility principles. | **Product:** language release order; translation reviewer; terminology glossary; how bilingual/uncertain copy is handled. **Tech:** resource management; plural/date/number formatting; translation QA; text expansion; fallback and update delivery. |

## L1-D — Business understanding

| Slice | Required design brief | Brief status | Proposal gate: open decisions |
| --- | --- | --- | --- |
| L1-D1 Dashboard and basic business-performance calculations | **Business Snapshot and Calculation Policy Brief** | Source-ready. The UX synthesis defines the dashboard hierarchy and the roadmap defines revenue, expense, profit, cash, trend, and estimate boundaries. | **Product:** meaning of `cash available`; calculation period; incomplete-data labels; permitted trend/health language; empty-state coaching. **Tech:** local versus server calculation; calculation versioning; freshness; rounding/currency rules; test fixtures. |
| L1-D2 Weekly/monthly reports and plain-language explanations | **Reports, Explanations, and Export Policy Brief** | Source-ready for entrepreneur reports. | **Product:** required report periods; chart versus comparison patterns; language/copy review; what constitutes a useful explanation; whether a guided weekly review is needed. **Tech:** report generation/storage; offline availability; export formats; print/share policy; accessibility and performance limits. |

## L1-E — HRF support and operational visibility

| Slice | Required design brief | Brief status | Proposal gate: open decisions |
| --- | --- | --- | --- |
| L1-E1 Staff access, entrepreneur/business lookup, and basic activity view | **HRF Admin Portal Information Architecture and Access Brief** | Source-ready for a read-mostly pilot portal. The existing staff-back-office research supplies a technical UI direction. | **Product:** staff roles; permitted fields; default filters; coach notes or read-only posture; support workflow; what staff may correct. **Tech:** staff authentication; authorization enforcement; audit logging; search/pagination; staff-device/browser support. |
| L1-E2 Engagement metrics, operational monitoring, and exports | **Pilot Metrics, Operational Monitoring, and Export Brief** | Source-ready for basic pilot metrics and exports; not for an advanced analytics platform. | **Product:** metric dictionary; audience; report cadence; allowed exports; interpretation and impact-claim language. **Tech:** event instrumentation; data-quality checks; observability dashboards/alerts; export format/access controls; retention and redaction. |
| L1-E3 Pilot support, quality, and production-readiness gate | **Pilot Readiness, Support, and Quality Gate Brief** | Source-ready. The V1 plan already identifies usability, offline resilience, security/privacy review, support, and evidence-seeking outcomes. | **Product:** pilot cohort; support model; incident escalation; success/exit criteria; participant consent. **Tech:** release process; device matrix; monitoring/alert thresholds; rollback; backup/restore exercise; penetration/vulnerability-review scope. |

## L1-F — Conditional operational extensions

| Slice | Required design brief | Brief status | Proposal gate: open decisions |
| --- | --- | --- | --- |
| L1-F1 Read-only loan balance and repayment visibility | **Loan Data Source, Visibility, and Entitlement Brief** | Discovery required before a feature brief can become proposal-ready. Current accepted scope permits only read-only visibility when reliable data exists. | **Product:** authoritative source; update owner/cadence; participant and staff visibility; meaning of repayment status; correction/support process. **Tech:** integration or import method; source identifiers; reconciliation; access controls; data freshness; error/fallback behavior. |
| L1-F2 Basic inventory tracking | **Inventory Operating Model and Minimum Viable Tracking Brief** | Discovery required. The methodology explains why inventory matters, but does not define a first inventory workflow. Current V1 decisions intentionally defer stock counts and inventory screens. | **Product:** entrepreneur stock versus Supply Hub stock; ownership; unit of measure; receiving/sale/adjustment/shrinkage flows; stock valuation; reorder need; staff roles; whether the actual need is only product labels. **Tech:** inventory ledger versus simple quantity model; offline stock conflict policy; barcode/catalog needs; performance; integration boundary with Supply Hub procurement. |
| L1-F3 General document management, if JLP means more than receipts | **General Document Types, Access, and Retention Brief** | Discovery required. The existing materials specify receipt evidence, not a general document-management product. | **Product:** document types; purpose; ownership; retention; participant/staff access; required versus optional documents. **Tech:** storage, metadata, virus scanning, upload limits, encryption, sharing, deletion, and audit behavior. |

## Required content for every new feature brief

Every brief created from this roadmap must contain:

- source intent and derived decisions, with links to the supporting JLP/planning material;
- outcome, included behavior, non-goals, dependencies, and risks;
- screen inventory with empty, loading, permission, validation, offline, failure, correction, and accessibility states;
- end-to-end workflows, including manual fallback when speech, OCR, AI, or connectivity fails;
- data, API, localization, privacy, audit, and offline implications;
- observable acceptance evidence, representative device coverage, and remaining owner decisions.

## Recommended brief creation order

1. Entrepreneur Access, Onboarding, and Localization
2. Business Journal Transaction Lifecycle
3. Transaction History, Correction, and Trust
4. Offline Resilience and Sync Experience
5. Business Snapshot and Calculation Policy
6. Receipt and Document Evidence
7. HRF Admin Portal Information Architecture and Access
8. Pilot Metrics, Operational Monitoring, and Export
9. Bounded AI Assistance and Human Confirmation
10. Localization Content, Review, and Fallback
11. M1.1 Offline Multilingual Speech proposal
12. Conditional discovery: Loan Data Source and Inventory Operating Model

Do not create an implementation proposal from an L1-F conditional slice until its listed product and technical decisions are confirmed. A detailed feature brief can record those gaps without inventing the operational policy.

## Open questions, options, and recommendations

The following records the decision guide provided during planning. It groups tightly linked prompts into decision bundles; it covers all open product and technical questions named in the slice tables above. These are not all upfront blockers. The next section distinguishes the small set of answers needed before real participant-facing development from choices that belong in the relevant feature brief.

### One-line open-question list

- What is the minimum onboarding journey, required profile data, language order, and support path?
- Will pilot users self-register or receive provisioned accounts?
- Will one entrepreneur have one business or support multiple businesses?
- What staff roles exist, and who owns account recovery?
- Which records sync first, who resolves conflicts, and how should retry work?
- Who owns the cloud account, deployment, backups, and recovery?
- What data is sensitive, what consent is required, and who may access it?
- What are the exact cash-movement rules, required transaction fields, categories, and correction rules?
- How should history, editing, voiding, duplicate review, and offline edits behave?
- When should sync problems require user action, and what devices/connectivity must be tested?
- Is Level 1 receipt-only, or does it need general document management?
- Where are receipts stored, how long are they kept, and is OCR local or cloud-based?
- What quality threshold, device floor, model, and fallback define acceptable offline speech?
- Which AI actions are allowed, what evidence must they show, and may data leave the device?
- What languages ship first, who approves translations, and how are fallbacks handled?
- What exactly do `cash available`, profit, trends, and business health mean?
- Which reports, visuals, explanations, exports, and offline behavior are required?
- What may HRF staff see, search, correct, export, and do in the admin portal?
- Which pilot metrics, monitoring alerts, support processes, and release gates define readiness?
- What is the authoritative loan-data source and who can see or correct it?
- What does `basic inventory tracking` actually mean operationally?
- If general documents are needed, what types, access, retention, and security rules apply?

### 1. Onboarding, profile, language, and support

**Question: What is the smallest useful first-use experience?**

- Option A: Full profile and business setup before any transaction. More complete data; higher abandonment risk.
- Option B: Minimal setup, then add details later. Faster first value; some records initially have less context.
- Recommendation: use Option B — business name, language, business category, and location only when operationally necessary; get the user to a first recorded sale or expense quickly.

**Question: Which languages ship first?**

- Option A: English/French first, Haitian Creole later. Faster implementation; misaligned with the planned primary entrepreneur language.
- Option B: Haitian Creole first, with French and English supported where needed. Better user fit; requires qualified translation review.
- Recommendation: Haitian Creole should be the primary entrepreneur UI language, with French and English available through localized resources. Do not ship unreviewed machine translations.

**Question: What support path exists?**

- Option A: In-app self-service only. Cheapest; weak for low-literacy or account problems.
- Option B: Coach/HRF-assisted support with short in-app help. More operational effort; more realistic.
- Recommendation: Option B — contextual help plus a named HRF/coach recovery path.

### 2. Accounts, businesses, roles, and recovery

**Question: Self-registration or provisioned accounts?**

- Option A: Self-registration. Scales better; increases identity, verification, recovery, and support work.
- Option B: HRF-provisioned pilot accounts. Faster and safer for a controlled pilot; requires staff onboarding.
- Recommendation: provisioned accounts for the first pilot, with self-registration deferred.

**Question: One business or multiple businesses per entrepreneur?**

- Option A: One business. Simpler screens, reports, and permissions.
- Option B: Multiple businesses immediately. More flexible; adds switching, aggregation, and support complexity.
- Recommendation: one active business per entrepreneur in Level 1, while keeping the data model capable of more later.

**Question: Which staff roles exist?**

- Option A: Entrepreneur and admin only. Simple; too broad for real operations.
- Option B: Entrepreneur, coach/support, finance/operations viewer, and administrator. More setup; aligns with HRF operations.
- Recommendation: Option B, with least-privilege access and no staff authority to silently alter confirmed financial records.

**Question: Who handles account recovery?**

- Option A: Email/password recovery. Familiar; may be impractical or insecure for the pilot population.
- Option B: HRF-assisted verified recovery. More staff work; better fit for a controlled pilot.
- Recommendation: HRF-assisted recovery initially, with a documented verification procedure.

### 3. Sync, cloud, deployment, and recovery

**Question: What syncs first?**

- Option A: Every feature, image, and report. Broad scope; high failure risk.
- Option B: Confirmed sales, expenses, cash movements, and essential metadata first. Smaller, testable path.
- Recommendation: Option B. Receipt images, AI artifacts, and secondary data follow behind explicit policies.

**Question: Who resolves conflicts?**

- Option A: Automatic last-write-wins. Easy; can silently corrupt financial meaning.
- Option B: Append-only confirmed records with idempotency; conflicts become `Needs attention`. Safer; needs support flow.
- Recommendation: Option B. Never silently merge conflicting financial edits.

**Question: Automatic retry or manual retry?**

- Option A: Manual only. Transparent; burdens users.
- Option B: Safe automatic retry plus visible action only when needed. Better experience; needs reliable idempotency.
- Recommendation: Option B.

**Question: Who owns the cloud environment?**

- Option A: Engineer-owned cloud account. Fast; unacceptable ownership and continuity risk.
- Option B: HRF-owned account with least-privilege engineer access. More setup; correct governance.
- Recommendation: Option B.

**Question: What backend pattern should be used?**

- Option A: Many services early. Flexible in theory; costly and slow.
- Option B: One modular backend with PostgreSQL and versioned APIs. Easier to test, operate, and evolve.
- Recommendation: Option B, consistent with the current architecture direction.

**Question: What backup and recovery standard applies?**

- Option A: Provider defaults only. Cheapest; weak assurance.
- Option B: Defined backups, restore tests, ownership, recovery objectives, and rollback. More work; production credible.
- Recommendation: Option B before participant data is used.

### 4. Privacy, security, audit, and consent

**Question: What data is sensitive and who may see it?**

- Option A: Treat all data alike. Simple; inappropriate for financial, identity, audio, and document data.
- Option B: Define classifications and role-based access. More planning; necessary.
- Recommendation: Option B — minimum collection, least privilege, encrypted storage, and redacted logs.

**Question: What consent is needed?**

- Option A: General app terms only. Fast; insufficient for sensitive data, audio, AI, and documents.
- Option B: Separate, plain-language consent for data use and any cloud AI/audio processing. More UX work; responsible.
- Recommendation: Option B. Keep core manual entry usable if optional AI/speech consent is declined.

**Question: What audit events are mandatory?**

- Option A: Audit only final transactions. Less volume; weak traceability.
- Option B: Audit confirmation, correction, void, sync acknowledgment, staff access, and sensitive export events. Better accountability.
- Recommendation: Option B, while avoiding sensitive raw content in logs.

### 5. Transactions, cash, history, and corrections

**Question: What does cash tracking mean?**

- Option A: Sales minus expenses only. Simple; can misrepresent actual cash.
- Option B: Explicit cash-in and cash-out events, labeled as estimated cash availability. More data entry; more honest.
- Recommendation: Option B. Start with cash movement reasons such as owner contribution, owner withdrawal, loan payment, and other business cash movement.

**Question: Which fields are required?**

- Option A: Many fields for every entry. Better detail; slows use.
- Option B: Type, amount, date, and simple category/purpose required; everything else optional. Faster, more usable.
- Recommendation: Option B.

**Question: What categories and payment methods exist?**

- Option A: Large accounting taxonomy. Detailed; overwhelming.
- Option B: Short plain-language categories plus `Other`; cash, mobile money, and `Other` payment method. Usable; less reporting precision.
- Recommendation: Option B initially, based on real pilot entries.

**Question: Edit, delete, or void?**

- Option A: Edit/delete in place. Familiar; weak auditability.
- Option B: Allow permitted corrections and voids while preserving the original event and audit trail. More design work; trustworthy.
- Recommendation: Option B.

**Question: How does duplicate review work?**

- Option A: Automatically remove suspected duplicates. Dangerous.
- Option B: Show a non-blocking warning and let the entrepreneur review. Safer.
- Recommendation: Option B.

### 6. Offline resilience

**Question: When does the app show `Needs attention`?**

- Option A: For every temporary network problem. Noisy and confusing.
- Option B: Only when safe retry fails or a person must decide something. Calm and actionable.
- Recommendation: Option B.

**Question: What devices and connectivity conditions are accepted?**

- Option A: Emulators and modern phones only. Fast; unrepresentative.
- Option B: Named low-cost Android device(s), a representative iPhone, low storage, restart/interruption, and weak/no-network tests. More effort; credible.
- Recommendation: Option B.

**Question: How are local images and storage limits handled?**

- Option A: Unlimited local storage. Easy; will eventually fail.
- Option B: Defined size limits, clear status, safe cleanup only after confirmed upload, and no silent loss. More engineering; necessary.
- Recommendation: Option B.

### 7. Receipts and documents

**Question: Is Level 1 receipt-only or general document management?**

- Option A: General documents now. Flexible; large scope.
- Option B: Receipt evidence only. Directly supports transaction capture; stays bounded.
- Recommendation: Option B unless HRF identifies a specific non-receipt document required for pilot operations.

**Question: Are receipts required?**

- Option A: Required for selected transactions. Stronger evidence; may block real-world use.
- Option B: Optional supporting evidence. More practical; lower completeness.
- Recommendation: Option B for Level 1.

**Question: Local or cloud storage?**

- Option A: Cloud-only. Easier central access; fails offline.
- Option B: Local-first capture, then encrypted upload when eligible and connected. More work; fulfills offline-first.
- Recommendation: Option B.

**Question: Local OCR or cloud OCR?**

- Option A: Cloud OCR. Potentially better accuracy; costs, privacy, connectivity, and consent issues.
- Option B: On-device/best-effort OCR. Offline; quality may be limited.
- Option C: No required OCR; capture image and permit manual entry, with optional future extraction.
- Recommendation: Option C as the baseline; add Option B or consented Option A only if evidence supports it.

### 8. Speech and multilingual input

**Question: What quality is acceptable?**

- Option A: Language supported is enough. Misleading and unsafe for amounts.
- Option B: Agree measurable amount, intent, latency, battery, and failure thresholds on representative devices. More work; credible.
- Recommendation: Option B.

**Question: Which STT model/runtime should ship?**

- Option A: Whisper-first local implementation. Meets language/offline goals; device-performance risk.
- Option B: Vosk-first. Lighter; lacks maintained Haitian Creole support.
- Option C: Cloud STT. Easier managed service; violates the offline baseline.
- Recommendation: Option A for the spike, behind `SpeechToTextAdapter`; do not make it permanent until benchmark results pass.

**Question: What devices define success?**

- Option A: Newer phones only. Better performance; misses the target audience.
- Option B: Existing representative low-cost Android hardware plus a named representative iPhone. More restrictive; credible.
- Recommendation: Option B.

**Question: What happens if Haitian Creole TTS is unavailable offline?**

- Option A: Add a cloud TTS dependency. Better voice coverage; breaks offline and cost goals.
- Option B: Use visible localized text and make audio optional. Less ideal; preserves accessibility and reliability.
- Recommendation: Option B until a tested offline voice exists.

### 9. Bounded AI

**Question: What may AI do?**

- Option A: General AI coach/chatbot. Broad appeal; large safety and trust risk.
- Option B: Category suggestions, plain-language explanation, bounded questions, and traceable next actions. Smaller; useful and controllable.
- Recommendation: Option B.

**Question: May AI use cloud services or business data?**

- Option A: Send all data by default. Simplest; unacceptable privacy risk.
- Option B: On-device where feasible; otherwise explicit consent, minimum necessary data, provider controls, and opt-out. More work; appropriate.
- Recommendation: Option B.

**Question: How should uncertainty appear?**

- Option A: Numeric confidence scores. Precise-looking; can be misunderstood.
- Option B: Plain-language labels such as `Suggested`, `Check this`, and `Estimated`, with source context. More understandable.
- Recommendation: Option B.

**Question: What validates AI quality?**

- Option A: Informal manual testing. Fast; weak evidence.
- Option B: Synthetic multilingual evaluation set, correction-rate tracking, failure tests, and cost/latency limits. More preparation; defensible.
- Recommendation: Option B.

### 10. Localization operations

**Question: Who approves wording?**

- Option A: Engineers translate. Fast; poor fit and quality risk.
- Option B: Named Haitian Creole/French business-language reviewers approve terminology and critical flows. More coordination; necessary.
- Recommendation: Option B.

**Question: What happens when a translation is missing?**

- Option A: Mix languages on a screen. Confusing.
- Option B: Fall back consistently to one approved language and flag the missing resource. Better quality control.
- Recommendation: Option B.

**Question: How do localized numbers and dates work?**

- Option A: Format all data as one locale. Easy; less natural.
- Option B: Store currency/date semantically and format for the active locale. Correct; requires proper localization support.
- Recommendation: Option B.

### 11. Dashboard and reports

**Question: What does `cash available` mean?**

- Option A: Claim actual cash on hand. Attractive; inaccurate without full accounting/reconciliation.
- Option B: Show estimated business cash based on recorded cash-related activity, with a clear label. Honest; limited.
- Recommendation: Option B.

**Question: Which periods and visuals come first?**

- Option A: Rich charts and many periods. Impressive; cognitively heavy.
- Option B: Today/this week/this month cards, simple comparisons, and recent activity. Focused and understandable.
- Recommendation: Option B.

**Question: Should the app show business-health scores?**

- Option A: Growing well / Needs attention early. Simple; risks unsupported claims.
- Option B: Show neutral observations until validated indicators exist. Less flashy; trustworthy.
- Recommendation: Option B.

**Question: Are reports local or server-generated?**

- Option A: Server only. Centrally consistent; unavailable offline.
- Option B: Local summaries from confirmed local data, reconciled after sync. More design work; fits the product.
- Recommendation: Option B.

**Question: What exports are needed?**

- Option A: Many export types immediately. Broad; security and scope burden.
- Option B: Staff-only CSV first, with role controls and audit records. Practical.
- Recommendation: Option B.

### 12. HRF admin, analytics, and pilot readiness

**Question: What can staff see and do?**

- Option A: Broad operational editing. Flexible; high data-integrity risk.
- Option B: Read-mostly access to permitted entrepreneur, business, activity, and summary data; controlled correction/support routes. Safer.
- Recommendation: Option B.

**Question: Which staff roles and filters matter?**

- Option A: One admin role and generic table. Fast; poor operational fit.
- Option B: Coach/support, finance/operations viewer, and administrator; default filters for assigned/active entrepreneurs and sync/support attention. Better fit.
- Recommendation: Option B.

**Question: Which metrics matter?**

- Option A: Collect everything. Expensive and invasive.
- Option B: Small metric dictionary: activation, successful records, correction rate, sync health, report use, support requests, and participant confidence. Focused.
- Recommendation: Option B.

**Question: What monitoring and alerting are required?**

- Option A: Technical logs only. Useful to engineers; weak operational visibility.
- Option B: Error, sync-failure, backup, and release-health monitoring with named responders. More setup; production credible.
- Recommendation: Option B.

**Question: What defines pilot readiness?**

- Option A: App is published. Insufficient.
- Option B: Defined cohort, consent, support coverage, device matrix, offline/sync evidence, restore test, rollback path, and success/exit metrics. More discipline; necessary.
- Recommendation: Option B, using the existing 25-50 entrepreneur pilot direction as the starting point.

### 13. Loan visibility

**Question: Where does loan data come from?**

- Option A: Manually enter loan balances into the app. Fast; creates a second, unreliable loan system.
- Option B: Read from or import from an HRF-authoritative loan source with a named data owner. More integration work; trustworthy.
- Recommendation: Option B.

**Question: Who sees it and how current must it be?**

- Option A: All users see all details, with no freshness indicator. Risky and misleading.
- Option B: Role-controlled views, a displayed last-updated time, and an explicit support path for discrepancies. Better.
- Recommendation: Option B.

### 14. Basic inventory tracking

**Question: What does `inventory` mean?**

- Option A: Product/category labels on transactions. Small scope; not stock tracking.
- Option B: Entrepreneur stock quantities and movements. Useful; requires a real inventory model.
- Option C: Supply Hub inventory, purchasing, procurement, and distribution. Strategically important; substantially broader operational system.
- Recommendation: JLP should decide this explicitly. For Level 1, start with Option A unless he specifically requires Option B. Treat Option C as Level 2.

**Question: If stock is tracked, what are the rules?**

- Decisions needed: owner of stock, units of measure, receiving, sale, adjustment, loss/shrinkage, valuation, reorder logic, staff permissions, barcode/catalog use, and offline conflict handling.
- Options: simple quantity model versus an immutable stock-movement ledger.
- Recommendation: if Option B is approved, use a simple movement-based model, no valuation/forecasting/reorder automation initially, and no silent sync merges.

### 15. General documents

**Question: Are non-receipt documents needed?**

- Option A: No — receipts only. Keeps Level 1 focused.
- Option B: Add specific named types, such as onboarding or loan documents. Adds compliance, storage, retention, and access requirements.
- Recommendation: Option A unless HRF identifies a pilot-critical document type.

**Question: If yes, what are the rules?**

- Decisions needed: document types, owner, upload purpose, required/optional status, retention, participant/staff access, deletion, encryption, malware scanning, metadata, and audit trail.
- Recommendation: create a separate document-management brief only after the exact types and operating workflow are confirmed.

## Required answers before real development

Most detailed decisions above should be made in the relevant feature brief, while the feature is being designed. The following are different: they affect multiple downstream slices, change the product's operating model, or create an external/data commitment. They must be answered before real participant-facing development, real data, or production-like cloud deployment begins. They do not retroactively change the synthetic M1 prototype.

| Required answer | Why it is cross-cutting | Minimum decision needed now | Recommended direction |
| --- | --- | --- | --- |
| Level 1 Core commitment | Determines what a funded build promises and prevents every roadmap capability from becoming immediate scope. | Name the required pilot capabilities and conditional/deferred capabilities. | Commit to the Business Journal core, offline/sync, basic reports, receipt evidence, and basic admin; keep inventory, loan visibility, broader documents, and broad AI conditional. |
| Pilot audience, geography, language, and currency | Controls copy, onboarding, legal/consent context, test devices, reporting, and localization. | Identify pilot location, cohort, primary language, secondary languages, and default currency. | Haiti, HTG, Haitian Creole as the primary entrepreneur language, with French/English resources and named language reviewers. |
| Entrepreneur/business model and access posture | Affects identity, profiles, permissions, sync ownership, reporting, and support. | Decide provisioned versus self-service access, one versus multiple businesses, and staff role classes. | Provisioned pilot accounts; one active business per entrepreneur; entrepreneur, coach/support, finance/operations viewer, and administrator roles. |
| Financial-record and cash policy | Affects every transaction, dashboard, report, audit, sync, and AI slice. | Define the initial transaction types, required fields, cash-movement reasons, correction/void policy, and estimated-value labels. | Sale, expense, and explicit cash movements; minimal required fields; append-only correction/void behavior; `estimated` cash/profit where appropriate. |
| Data governance and consent | Required before participant identity, financial records, receipts, audio, or cloud AI data are used. | Name data owner, classification, permitted uses, consent model, staff access policy, retention/deletion owner, and incident owner. | HRF owns data/accounts; minimum data collection; role-based access; plain-language consent; optional cloud AI/audio processing only with separate consent. |
| Nonprofit ownership, cost, and deployment authority | Determines whether real backend, storage, monitoring, and recovery can be responsibly created. | Identify account owner, budget owner, region, deploy approvers, backup/recovery owner, and external-service approval path. | HRF-owned accounts and budget; least-privilege engineering access; named human deploy approver; backup/restore and rollback evidence before participant use. |
| Representative device and offline acceptance baseline | Controls mobile UX, speech feasibility, performance, storage behavior, and validation. | Name the low-cost Android floor, representative iPhone, connectivity scenarios, and accessibility expectations. | Retain the representative low-cost Android; add a named available iPhone; test no network, weak network, restart, interruption, low storage, large text, and permission denial. |
| Translation and content-review ownership | Prevents participant-facing copy and financial wording from being improvised by engineers. | Name Haitian Creole/French/English reviewers, terminology owner, and missing-translation fallback. | Use named business-language reviewers; keep a shared glossary; fall back consistently to one approved language rather than mixing languages. |
| HRF support and staff operating model | Determines admin scope, recovery, conflict handling, data correction, and incident response. | Identify first-line support, escalation path, staff correction rights, and required admin visibility. | Coach/support is first line; admin is read-mostly; financial corrections use controlled, audited routes; no silent staff edits. |
| Pilot readiness and evidence standard | Determines whether the build can make credible safety, quality, and funder claims. | Define cohort, success/exit criteria, essential metrics, release criteria, and support coverage. | Start with the existing 25-50 entrepreneur direction; require offline/sync evidence, device checks, support coverage, rollback, restore test, and measurable adoption/data-quality outcomes. |

### Questions intentionally deferred to individual feature briefs

These do not need a global answer before real development begins, provided the upstream answers above are in place:

- exact screen layout, visual treatment, and optional fields;
- receipt OCR engine and whether extraction is added after capture;
- exact Whisper model/runtime and speech performance thresholds;
- AI provider selection, prompts, taxonomy refinements, and explanation templates;
- exact dashboard charts, report layout, and export enhancements;
- staff list filters, data-table behavior, and secondary admin views;
- loan integration method, only after an authoritative source exists;
- inventory quantity model, only if Level 1 commits to true stock tracking; and
- general document types, only if a pilot-critical need is identified.

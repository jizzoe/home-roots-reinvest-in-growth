# JLP UX Synthesis and V1 Design Decisions

Status: Working product-design control document  
Purpose: Translate JLP's UX direction into buildable V1 interaction decisions.  
Companion: [V1 Scope Map and Milestone Plan](V1%20Scope%20Map%20and%20Milestone%20Plan.md)

## Recommendation

Treat the UX/UI Product Guidelines as the controlling interaction-design source for V1. It is concise, internally consistent, and aligns with the PRD's strongest principles:

- The product is a **business assistant**, not accounting software.
- Its purpose is to help an entrepreneur understand and strengthen her business, while producing trustworthy records that support coaching, financing readiness, and learning.
- Simplicity, trust, accessibility, and data preservation override automation and feature volume.

The main PRD adds useful workflow detail, but it also mixes V1 requirements with V1.1 and long-term Enterprise Growth Platform concepts. Appendix D is the practical V1 checklist. The pilot plan makes usability, adoption, data quality, and coaching usefulness the validation criteria.

## Source Hierarchy for UX Decisions

| Source | Use in product design |
| --- | --- |
| `Enterprise Growth App 2, UXUI Product Guidelines v1.0.docx` | Controlling UX principles, language, input hierarchy, confirmation, trust, and accessibility posture. |
| `Enterprise Growth Platform, Enterprise Growth App, Entrepreneur Application.docx` | Detailed user journeys, functional requirements, screen/workflow concepts, localization, and quality criteria. Must be filtered through the V1 scope map. |
| `Features Reference Sheet, Appendix D.docx` | Engineer's V1 feature checklist and minimum screen/API coverage. |
| `Executive Product Brief.docx` | Positioning and intended user context. |
| `Enterprise Growth App 3, Version 1 Pilot Operations Plan.docx` | Pilot onboarding, feedback, and measures of real usability/value. |
| `Jizzoe App Suggestions.docx` | Advisory implementation insight: touch, speech, OCR, and AI are proposals that require confirmation; offline status must be understandable. |
| `Jizzoe Feedback.docx` and `Credit Scoring Dialogue.docx` | Strategic context only. They do not add V1 interaction scope. |

## Core UX Thesis

The desired emotional outcome is: **"I understand my business."** The app should not make the entrepreneur feel that she needs bookkeeping or accounting training.

Every screen should answer a practical business question:

- Did I make money today?
- What did I spend money on?
- How much money is available in the business?
- What changed this week?
- What should I consider next?

This is the product distinction between a Business Journal and a conventional bookkeeping application. Recordkeeping is the means; business understanding, confidence, coaching readiness, and reliable longitudinal data are the outcomes.

## Non-Negotiable Interaction Rules

### 1. Use business language, not accounting language

Never expose debit, credit, ledger, assets, liabilities, balance sheet, gross revenue, or net income in the entrepreneur experience.

Prefer:

- `Money earned` or `Sales`
- `Money spent` or `Expenses`
- `Money you kept` or `Profit`
- `Money available` or `Cash available`
- `What happened today?` instead of `Create transaction`

The internal accounting and audit model may be more rigorous than the displayed language. Complexity belongs in the system, not in the entrepreneur's workflow.

### 2. Make common actions obvious and fast

The primary daily actions are recording a sale, expense, or cash movement. A typical entry should take less than 30 seconds. The entrepreneur should never have to infer where to start.

- Use large, labeled touch targets.
- Start with only the fields required to record the event.
- Remember frequent products, categories, suppliers, and choices.
- Use sensible defaults such as today and the preferred currency.
- Reveal optional detail only when it is useful.
- Let a returning user repeat a recent/common transaction and edit it.

This is progressive disclosure, not a reduction in data-model capability.

### 3. Prefer low-effort input, but retain a complete manual path

JLP's preferred input order is:

1. Voice
2. Buttons/simple selections
3. Camera for receipts
4. Typing only when necessary

For implementation, this is an experience goal, not permission to make voice or OCR required for completing a record. Manual, button-led entry is the baseline completion path. Voice and receipt capture should create reviewable proposals and have graceful manual fallback when unavailable or inaccurate.

### 4. Separate input, suggestion, confirmation, and record state

The app must clearly distinguish:

- What the entrepreneur entered or captured.
- What the system extracted, inferred, or suggested.
- What the entrepreneur confirmed.
- What is saved locally, queued to sync, synced, failed, or needs review.
- What is calculated from recorded data versus estimated or AI-generated.

The standard confirmation pattern is a plain-language summary followed by clear `Confirm` and `Edit` actions. An example: `You are recording a sale of 1,500 HTG for rice today. Is this correct?`

No AI, OCR, or speech output may silently create, modify, or delete an authoritative financial record.

### 5. Treat trust and correction as first-class UX

Financial mistakes are expected. The entrepreneur must be able to edit permitted fields, correct a suggestion, replace a receipt, and understand what changed. The backend preserves audit history, but the entrepreneur-facing flow stays calm and uncomplicated.

Errors must explain the outcome and the next action. For example, prefer `We saved this on your phone and will try again when the connection returns` to technical error codes. Never indicate that data is lost unless that is known to be true.

### 6. Make offline normal, not exceptional

Core Business Journal activity works without connectivity. The design should not repeatedly interrupt someone with online/offline errors or force them to understand synchronization infrastructure.

Show a quiet, plain-language status only when useful:

- `Saved on this phone`
- `Waiting to sync`
- `Synced`
- `Needs attention` when user action is actually required

Preserve locally created records across app restart, retry safely, prevent duplicates, and retain a data-preserving review path for conflicts.

### 7. Design for dignity, low literacy, and constrained Android hardware

The app should acknowledge that its users are business owners, not treat them as deficient users of a simplified system.

- Make Haitian Creole the planned primary entrepreneur-facing language; keep all strings localizable and allow language changes after onboarding.
- Use icons, visual indicators, short phrases, examples, progress markers, and text together. Icons may support meaning but should not be the only label for critical financial actions.
- Use large controls, high legibility, strong outdoor contrast, and layouts that work on small/older Android screens.
- Avoid long instructions, dense tables, complex financial charts, and unnecessary background processing or data use.
- Support interruptions: phone calls, app closure, battery loss, weak storage, and connectivity changes must not discard a partially completed or saved transaction.

### 8. Use AI as a supportive, explainable assistant

AI should explain, organize, suggest, and encourage. It should not shame users, exaggerate certainty, promise outcomes, or replace a human coach.

Recommendations should say:

1. What happened.
2. Why it matters.
3. One practical next action.
4. The expected benefit, without guarantees.

Facts, estimates, and suggestions need visibly different labels. The Business Journal remains usable when AI, receipt extraction, or speech services fail.

## Recommended V1 Screen Architecture

The detailed PRD proposes five navigation destinations: Home, Journal, Growth, Money, and Profile. That is a useful future information architecture, but it is too broad for the first thin slice. V1 should prioritize a smaller architecture around recurring business moments.

| Screen / flow | V1 decision | UX purpose |
| --- | --- | --- |
| Welcome and account access | Build | Explain value in business terms, register/login, and recover access. |
| Language and basic setup | Build | Select language/currency; create entrepreneur and business profile with minimal fields; produce a first success moment. |
| Home | Build | Daily business check-in: business snapshot, recent activity, quiet sync state, and large quick actions. |
| Record event | Build | Select `I made a sale`, `I spent money`, or `Money moved in/out`; enter the smallest useful set of fields. |
| Review and confirm | Build | Present manual, voice, or receipt-derived values in a single, comprehensible confirmation state; allow edit before save. |
| Journal / transaction history | Build | See, search/filter, and open prior records without accounting terminology. |
| Transaction detail and correction | Build | See record, receipt/source, status, and permitted correction actions; retain audit history behind the interface. |
| Receipt capture and review | Build as a staged V1 capability | Take/select photo offline, store it, and allow manual completion. OCR can populate suggested fields but cannot block the flow. |
| Dashboard summary | Build | Show money earned, money spent, profit, money available, recent activity, and simple trend/explanation. |
| Weekly/monthly reports | Build | Explain progress in plain language with simple visual comparisons, not financial-statement UI. |
| Settings/help | Build | Manage language/profile and provide contextual examples and support. |
| Growth / AI coach | Defer as a dedicated nav area | In V1, place bounded explanations or a single suggested next action in Home and reports. Do not build a full AI Growth Coach workspace. |
| Loan overview | Conditional | Build read-only only if HRF has reliable pilot loan data. Do not build loan administration or financing decisions in the entrepreneur app. |
| Inventory status | Defer | Transactions may retain optional product/category information, but V1 does not need inventory screens, stock counts, or restocking workflows. |

### Home Screen

The home screen should feel like a coach's short daily check-in, not an accounting dashboard. Recommended hierarchy:

1. Greeting and business name.
2. Four plain-language, period-aware indicators: sales, expenses, profit, and cash available.
3. Large quick actions: `Record sale`, `Record expense`, and `Record cash movement`; show `Scan receipt` when it is available.
4. Recent activity and quiet sync state.
5. At most one bounded explanation or suggested next action, grounded in available data.

Business health colors, inventory calls to action, loan progress, milestones, and personalized recommendations are valid concepts, but should appear only when the data is reliable and the pilot validates their value. Do not fill empty states with unsupported health scores or speculative coaching.

### Record and Confirm Flow

Each record flow should follow one durable structure:

`Choose business moment -> capture minimum information -> show a proposed/plain-language summary -> edit or confirm -> save locally -> show sync state`

For a sale, begin with amount and optionally product/category, payment method, date, note, or photo. For an expense, start with amount and a plain-language purpose such as `Bought inventory`, `Transportation`, `Rent`, `Utilities`, `Paid helper`, or `Other business expense`. Cash movement needs explicit policy and wording before implementation so totals remain meaningful.

The confirm screen is the most important reusable surface in V1. It must work identically whether the source was manual entry, a voice transcript, OCR, or a repeated past transaction.

### Reports and Explanations

Reports should answer `What happened?`, `What changed?`, and, where sufficiently supported, `What should I consider?`

Use simple trend lines, before/after comparisons, progress indicators, and short explanations. Avoid dense tables, raw accounting ratios, or a complex dashboard. Revenue/sales, expenses, profit, cash available, weekly summary, and monthly summary are the V1 baseline. Mark cash and profit as estimated when coverage or transaction classifications do not justify certainty.

## V1 Scope Decisions from UX Tensions

| Topic | JLP material says | V1 decision |
| --- | --- | --- |
| Voice | UX guideline calls it preferred and PRD calls it core; PRD roadmap places voice in V1.1. | Preserve a voice-ready proposal/confirmation architecture. Deliver it in the prototype or V1 only when target-language quality and pilot value are demonstrated. Manual entry remains complete without it. |
| Receipt extraction | PRD describes extensive OCR/extraction; Appendix D requires extraction of available information. | Receipt capture, retention, review, correction, and manual completion are V1. Extraction is best-effort and cannot block record completion. |
| AI Growth Coach | PRD describes a broad assistant, business health, forecasting, and conversational experiences. | V1 includes bounded category suggestions and plain-language explanations. Suggested next actions are permitted only when traceable; do not build prediction, complex health scoring, or a standalone coach workspace. |
| Weekly review | Detailed PRD describes a rich reflection flow; roadmap lists it as V1.1. | Build simple weekly/monthly summaries first. Promote a guided weekly review only after pilot evidence shows it is understood and used. |
| Loan dashboard | Detailed PRD treats it as an entrepreneur workflow; Appendix D marks visibility `where applicable`. | Conditional, read-only V1. No borrower self-service changes, automated eligibility, or loan decisions. |
| Inventory | PRD frequently references inventory outcomes. | Keep optional product/category fields and receipt detail; defer inventory management and stock claims. |
| Business health | PRD uses `Growing Well`, `Needs Attention`, and `Action Recommended`. | Do not surface a health label until the indicators, data completeness, evidence, and copy are defined and piloted. |

## Design and Validation Requirements

Before a V1 workflow is considered complete, validate it with representative entrepreneurs on realistic Android devices and constrained connectivity. The pilot plan calls for a 25-50 entrepreneur cohort with varied business types, business maturity, digital comfort, and locations; do not test only with technically confident users.

Key UX validation questions:

- Can a first-time user independently record a sale and an expense?
- Does she understand the confirmed record, the dashboard summary, and the difference between saved locally and synced?
- Which input method is actually preferred in the target language and operating context?
- Do users correct AI/OCR suggestions easily rather than accepting them by default?
- Does the app produce a useful coaching conversation and a more consistent recording habit?
- Which screens or fields are ignored, confusing, slow, or unnecessary?

Measure workflow completion, time to first successful record, transaction frequency, dashboard/report use, correction rate, sync success/failure, support requests, self-reported confidence, perceived usefulness, and coach usefulness. Treat these as product-learning evidence, not impact claims.

## Implications for APIs and Data Design

UX requirements create non-optional platform behavior:

- A transaction needs source metadata (`manual`, `voice`, `receipt`), raw input/reference, proposed values, confirmed values, confirmation time, and audit events.
- Transactions must have stable local IDs, idempotency keys, sync state, and data-preserving conflict/review state.
- Receipt/image metadata and extraction results must remain separate from confirmed transaction fields.
- Dashboard/report APIs or local projections must label period, currency, calculation basis, freshness, and whether values are estimated.
- AI responses must carry source evidence, confidence/uncertainty, recommendation/explanation type, and an explicit non-authoritative status.
- Localization is a product capability: all user-facing copy, categories, explanations, errors, and AI output require a language context.

## Bottom Line

JLP's UX direction is strong enough to guide V1 design. It gives a clear product character and a sound set of interaction guardrails. It is **not** a pixel-level design specification or a complete V1 screen contract by itself, because the PRD mixes immediate work with future Enterprise Growth Platform aspirations.

Use this document and the V1 Scope Map as the design-control layer before slice-level proposals. The next concrete artifact should be a V1 design brief or screen-flow specification that turns the selected screen architecture into user flows, states, copy, acceptance criteria, and API contracts. That brief should preserve the strategic goal: a trusted Business Journal that creates the data foundation for coaching, growth, financing readiness, impact measurement, and learning.

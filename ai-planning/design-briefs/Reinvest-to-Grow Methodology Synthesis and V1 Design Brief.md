# Reinvest-to-Grow™ Methodology Synthesis and V1 Design Brief

_Source review, email match, and product/design recommendations for Enterprise Growth App Version 1_

Prepared for Joe Rice. Sources reviewed from ai-planning/jpaul-documents/Reinvest-to-Grow™ Methodology. Output saved in ai-planning/research.

## Executive Conclusion

The documents are strong enough to support V1 product decisions, but they should not be taken straight into a proposal as-is. The PRD folder contains real Version 1 product requirements, especially the main Entrepreneur Application PRD, Executive Product Brief, UX/UI Guidelines, Pilot Operations Plan, and Appendix D Feature Reference Sheet. However, the requirements are spread across long narrative documents and include future-platform material that could inflate the V1 proposal if not controlled.

Recommendation: extract a concise design brief/proposal brief from the existing PRD set before proposing. Use the PRD folder as the authoritative source, and use the broader methodology/platform documents to explain why the product matters: the app is the business-intelligence layer of Reinvest-to-Grow™, not an external-facing bookkeeping app.

## Closest Match to JLP Email

| Email element | Closest matching source | Finding |
| --- | --- | --- |
| Feature checklist for engineer | Enterprise Growth App PRD v1.0 / Features Reference Sheet, Appendix D.docx | Direct match. It contains the same structure: entrepreneur app, HRF portal, technical requirements, deferred features, and completion test. |
| Do not call it a bookkeeping app externally | Executive Product Brief; Pilot Operations Plan; main Entrepreneur Application PRD | Strong match. These docs explicitly distinguish the product from traditional bookkeeping and frame it as Enterprise Growth App / Business Journal Module. |
| Business intelligence layer for coaching, financing readiness, impact measurement | Executive Product Brief; Reinvest-to-Grow Methodology Summary; Enterprise Growth Platform 2.0; main PRD | Strong match. The repeated theme is data foundation → insight → coaching → financing readiness → impact reporting. |
| V1 feature set: mobile app, admin portal, offline, AI assistance, reports, deferred features | Appendix D and main Entrepreneur Application PRD | Direct match. Appendix D is the cleanest implementation checklist; the main PRD provides rationale and deeper requirements. |

**Conclusion: the email was effectively summarizing Appendix D plus the positioning language from the executive/pilot/product briefs. Appendix D is the document to keep open while coding; the main PRD is the controlling source for why those features exist and how they should behave.**

## PRD Folder Confirmation

**Confirmed:** The folder named Enterprise Growth App PRD v1.0 is a Version 1 product-doc set, not merely brainstorming. The strongest PRD file is Enterprise Growth Platform, Enterprise Growth App, Entrepreneur Application.docx. It is labeled Product Requirements Document (PRD), Version 1.0, Draft v1.0, and includes product philosophy, functional requirements, data architecture, reporting, nonfunctional requirements, testing, pilot, roadmap, and appendices.

**Caution:** Enterprise Growth App 1, Technical Implementation Brief v1.0.docx is empty/not a valid docx container in the local folder, so it cannot be used as a technical baseline. Supporting Documents / Enterprise Growth Platform 3.0.docx is also empty/not a valid docx container.

**Working baseline:** Use the main PRD, Executive Product Brief, UX/UI Product Guidelines, Pilot Operations Plan, and Appendix D together as the V1 baseline. Treat Credit Scoring Dialogue and Jizzoe App Suggestions/Feedback as advisory inputs, not controlling scope.

## Strategic Synthesis

- Reinvest-to-Grow™ is an enterprise development methodology centered on retaining more business income, reinvesting productively, and building stronger, more resilient enterprises.
- The Enterprise Growth Platform is the operating infrastructure that standardizes and scales the methodology across purchasing, growth financing, enterprise growth support, business intelligence, and impact measurement.
- The Enterprise Growth App is the entrepreneur-facing digital interface for that platform. Version 1 begins with the Business Journal because reliable business activity data is the foundation for coaching, financing readiness, impact measurement, and future AI guidance.
- The first product should feel like a business assistant or growth companion, not an accounting system. Bookkeeping is a means to better decisions, not the market-facing product category.
- The long-term vision includes inventory, supplier ordering, financing workflows, savings, digital payments, marketplace functions, stronger analytics, and AI-powered business coaching, but those should remain outside V1 except where the data model must anticipate them.
## Recommended V1 Product Boundary

Build V1 as Enterprise Growth App — Business Journal Module, with an HRF administrative portal. The MVP should prove that entrepreneurs can record business activity consistently, understand basic performance, and create reliable data HRF can use for coaching and program learning.

### Keep in V1

- [ ] Account/profile and business profile
- [ ] Sales, expenses, cash movement, transaction history, edits with audit history
- [ ] Receipt capture with user review/correction before save
- [ ] Basic AI assistance for categorization, plain-language explanation, and suggested next actions
- [ ] Dashboard: revenue, expenses, profit, cash position, recent activity, simple trends
- [ ] Weekly/monthly and basic sales/expense/profit reports
- [ ] Offline-first local transaction entry, sync, duplicate prevention, conflict/data preservation
- [ ] HRF admin portal: entrepreneurs, businesses, transaction activity, summaries, engagement metrics, roles, reporting, exports
- [ ] Loan visibility where applicable: amount, outstanding balance, repayment status/history
### Defer from V1

- [ ] Automated credit score or automated loan approval
- [ ] Full accounting system
- [ ] Marketplace, supplier ordering, and advanced inventory
- [ ] Mobile money/payments integration unless required for pilot operations
- [ ] Predictive financing model and advanced analytics
- [ ] Voice-first workflows as must-have unless pilot audience requires it; keep architecture ready and consider V1.1
## V1 Screens to Build

| Area | Recommended screens |
| --- | --- |
| Onboarding | Welcome/value framing; registration/login; language selection; entrepreneur profile; business profile setup; first transaction walkthrough. |
| Home | Business snapshot dashboard; quick actions; sync/status indicator; recent activity; next suggested action. |
| Record activity | Record sale; record expense; record cash movement; receipt capture/review; AI interpretation/confirmation; manual edit fallback. |
| History | Transaction list; search/filter; transaction detail; edit/correct transaction; audit-safe delete/cancel behavior. |
| Reports | Weekly summary; monthly summary; sales report; expense report; profit report; plain-language explanations. |
| Support and trust | Contextual help; offline/sync status; account settings; language; privacy/permission notices. |
| HRF portal | Admin login; entrepreneur list/detail; business detail; transaction activity; engagement dashboard; loan visibility; reports/export; user/role management. |

## V1 APIs to Build

| API/domain | V1 responsibility |
| --- | --- |
| Auth and identity | Registration/login, password recovery, sessions/tokens, role-based access. |
| Entrepreneurs | Entrepreneur profile, language, location, cohort/program status, coach assignment. |
| Businesses | Business profile, category/type, products/services basics, operating status. |
| Transactions | Create/update/list/detail sales, expenses, cash movements; immutable audit trail; duplicate detection metadata. |
| Receipts/documents | Image upload/storage, extraction status, extracted fields, user confirmation/correction. |
| Sync | Offline change queue, device/client IDs, conflict detection, idempotency keys, server reconciliation. |
| Dashboard/reports | Revenue/expense/profit/cash summaries; recent activity; weekly/monthly reports; export support. |
| AI assistance | Categorization suggestions, plain-language explanation, question answering within safe boundaries, confidence and confirmation workflow. |
| Loans | Read-only loan visibility for applicable entrepreneurs: amount, balance, schedule/status, payment history. |
| Admin/monitoring | Entrepreneur/business lookup, engagement metrics, audit logs, error/sync monitoring. |

## Proposal Readiness

**Good enough to propose?:** Yes, after extraction. The source material contains sufficient vision, V1 scope, user needs, quality constraints, and pilot framing. It is not yet in a proposal-ready shape because it mixes product requirements, long-term platform vision, commentary, and future modules.

**Best next artifact:** Create a concise V1 design/proposal brief of roughly 8-12 pages: product positioning, V1 scope, user journeys, screen inventory, API/data domains, AI boundaries, offline/sync architecture assumptions, pilot success metrics, and out-of-scope list.

**Proposal risk to manage:** The largest risk is scope creep from the long-term Enterprise Growth Platform vision. The proposal should explicitly say V1 builds the Business Journal data foundation while preserving architecture paths for financing, inventory, supplier, and impact modules.

## Open Decisions Before Engineering Proposal

- Pilot geography, language priority, and initial currency/country assumptions.
- Whether voice entry is V1 must-have or V1.1 enhancement.
- Whether receipt extraction is OCR-only, AI-assisted, or manual-first with later automation.
- Cloud/backend stack and authentication provider.
- Offline sync conflict policy and audit-history requirements.
- Whether loan visibility is read-only from manually entered HRF data or integrated with an existing loan system.
- Admin portal depth: basic monitoring/reporting versus operational workflow management.
- Data consent model for coaching, financing readiness, impact measurement, and AI use.
## Email-Matched Feature Reference

### Enterprise Growth App Version 1 — Business Journal Module Feature Reference

Formatted to match the structure and compact checkbox style of Appendix D.

#### Entrepreneur Mobile Application

#### Account & Profile

- [ ] User registration/login
- [ ] Entrepreneur profile
- [ ] Business profile
- [ ] Language preference
- [ ] Business category
#### Transaction Management

- [ ] Record sale
- [ ] Record expense
- [ ] Record cash movement
- [ ] Edit transactions
- [ ] View transaction history
- [ ] Search/filter transactions
- [ ] Add notes
#### Receipt Management

- [ ] Capture receipt image
- [ ] Store receipt
- [ ] Extract receipt information
- [ ] Review extracted information
- [ ] Confirm/correct transaction
#### AI Assistance

- [ ] Transaction categorization
- [ ] Plain-language explanations
- [ ] Basic business questions
- [ ] Suggested next actions
- [ ] Confirmation before saving financial data
#### Dashboard

- [ ] Revenue summary
- [ ] Expense summary
- [ ] Profit summary
- [ ] Cash position
- [ ] Recent activity
- [ ] Business trends
#### Reports

- [ ] Weekly summary
- [ ] Monthly summary
- [ ] Sales report
- [ ] Expense report
- [ ] Profit report
#### Offline Capability

- [ ] Offline transaction entry
- [ ] Local storage
- [ ] Sync when connected
- [ ] Sync conflict handling
#### HRF Administrative Portal

#### Entrepreneur Management

- [ ] View entrepreneurs
- [ ] View businesses
- [ ] Manage user roles
#### Business Monitoring

- [ ] View transaction activity
- [ ] View business summaries
- [ ] View engagement metrics
#### Loan Visibility (if applicable)

- [ ] Loan amount
- [ ] Outstanding balance
- [ ] Repayment status
#### Reporting

- [ ] Program participation
- [ ] Business activity
- [ ] Basic impact reporting
- [ ] Export capability
#### Technical Requirements

#### Required

- [ ] Mobile-first
- [ ] Android priority
- [ ] Offline-first
- [ ] Secure authentication
- [ ] Cloud database
- [ ] API architecture
- [ ] Audit logging
- [ ] Scalable architecture
#### Deferred Features

#### Not Version 1

- [ ] Automated credit score
- [ ] Automated loan approval
- [ ] Full accounting system
- [ ] Marketplace
- [ ] Supplier ordering
- [ ] Mobile payments
- [ ] Advanced inventory
## Reviewed Source Set

| Source group | Role in synthesis |
| --- | --- |
| Enterprise Growth App PRD v1.0 | Primary V1 source. Contains PRD, executive brief, UX guidelines, pilot plan, feature reference, feedback/advisory notes, and credit scoring dialogue. |
| Supporting Documents | Strategic/platform context: methodology summary, master architecture, platform scale logic, investment thesis, strategy stack, lexicon, moats, organizational capabilities. |
| Reinvest-to-Grow Methodology Book | Deeper theory/background and intermediary content. Useful for vision and language; not controlling V1 build scope. |
| Final Deck 2027 Version 9 | Investor/storytelling context. Useful for external framing, not engineering requirements. |

Source-quality note: Some materials contain conversational prefaces, draft language, and intermediary thinking. The V1 proposal should cite the latest coherent PRD and platform/methodology docs rather than every historical draft.

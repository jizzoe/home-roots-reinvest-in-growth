# Architecture Alignment Brief v0.1

## Purpose

This brief is intended to align our understanding of Home Roots Foundation's current Reinvest-to-Grow concept before deeper technical architecture work begins.

It summarizes:

- The current conceptual model from the Home Roots Foundation documents
- How Joe's initial technical architecture maps to that model
- Where the assumptions appear aligned, narrower, or incomplete
- Questions that should be confirmed before detailed system design

This is not a final requirements document or implementation plan. It is an alignment artifact.

## Current Understanding

Home Roots Foundation's concept has expanded beyond a microlending or bookkeeping application.

The current model appears to be an enterprise-development methodology called Reinvest-to-Grow, supported by an eventual Enterprise Growth Platform.

At a high level, the methodology is:

```text
Retain more income
  -> Reinvest more income
  -> Build productive capital and enterprise capability
  -> Improve enterprise performance and growth
  -> Increase economic resilience
```

The platform is intended to support consistent implementation, measurement, learning, and responsible scaling of that methodology.

## Stated In The Home Roots Documents

The Reinvest-to-Grow methodology is not primarily a loan program. Financing is one component within a broader enterprise-development system.

The methodology has three primary intervention mechanisms:

- Margin expansion, initially through collective purchasing
- Appropriate growth capital
- Enterprise growth support through training, coaching, and capability-building

The Enterprise Supply Hub is described as the operational heart of the methodology. It is not just a store or warehouse. It is a physical operating environment where purchasing, inventory access, entrepreneur interaction, financing touchpoints, coaching, data collection, and model validation come together.

The Enterprise Growth Platform is described as the future digital operating system for the methodology. It should integrate entrepreneur management, Supply Hub operations, financing, coaching, assessments, enterprise measurement, reporting, analytics, research support, and organizational learning.

The platform should be:

- Mobile-first
- Offline-first
- Human-centered
- Modular
- Secure and privacy-conscious by design
- Built around role-based access
- Designed around decisions and workflows
- Flexible enough to evolve as the methodology is validated

The documents also emphasize that claims of impact should be evidence-seeking rather than assumed. The Enterprise Growth Score is a proposed construct, not yet a validated instrument.

## Joe's Original Architecture Assumptions

Joe's initial technical architecture focused on a mobile-first bookkeeping and reporting platform for a nonprofit that provides microloans to disadvantaged small businesses.

The assumed product included:

- A recipient-facing mobile app
- Simple bookkeeping workflows
- Speech input
- Multilingual interaction
- Receipt and document scanning
- Offline support
- AI assistance for transaction organization and report explanation
- Loan balance and repayment visibility
- A nonprofit back-office application
- Loan administration
- Portfolio reporting
- Grant and impact metrics
- Auditability and traceable reporting

The proposed architecture was a custom AWS-native platform with:

- React Native and Expo for mobile
- SQLite for offline local storage
- React web back office
- Java/Spring Boot modular monolith backend
- PostgreSQL
- S3 for document storage
- Async AI/OCR/document workers
- Cognito for authentication
- SQS/EventBridge/Step Functions where useful
- Strong security, audit, and data-governance practices

## Where The Assumptions Align

Several original assumptions remain strongly aligned with the broader Home Roots vision:

- Offline-first mobile experience
- Mobile-first workflows for field and entrepreneur use
- Multilingual support
- Simple user experience for entrepreneurs
- Role-based access control
- Sensitive financial and personal data protection
- Audit history for important changes
- Traceable outcome metrics
- Staff back-office tools
- Loan and repayment tracking as one platform capability
- AI as an assistant rather than the system of record
- Human confirmation before important actions
- Reports grounded in source records rather than AI-generated summaries alone
- Modular architecture that can evolve over time

These choices appear compatible with the Enterprise Growth Platform concept.

## Where The Original Scope Is Narrower

The original architecture is narrower than the current Home Roots scope.

It centers the system around:

```text
Business bookkeeping
  -> Loan administration
  -> Outcome and grant reporting
```

The Home Roots documents center the system around:

```text
Entrepreneur journey
  -> Supply Hub participation
  -> Purchasing and margin expansion
  -> Coaching and capability development
  -> Appropriate financing
  -> Enterprise assessment
  -> Growth measurement
  -> Organizational learning
```

The original architecture can likely expand to support this broader model, but the domain model and MVP priorities should be reframed.

## Architecture Implications

The modular monolith approach remains appropriate for an early platform because the methodology and operating model are still evolving.

However, the domain modules should shift from a bookkeeping/loan-centered model to an enterprise-growth operating model.

Potential first-class platform domains should include:

- Organizations, users, roles, and permissions
- Entrepreneur profiles
- Enterprise/business profiles
- Enrollment and consent
- Baseline and follow-up assessments
- Supply Hub operations
- Product catalog and inventory
- Supplier management
- Collective purchasing and demand aggregation
- Entrepreneur purchasing history
- Financing applications, disbursements, repayments, and portfolio monitoring
- Coaching sessions and action plans
- Training participation
- Productive reinvestment tracking
- Enterprise Growth Score versions and measurements
- Growth ladder stage history
- Outcome observations
- Dashboards and operational reports
- Research/export datasets
- Audit history and data governance
- AI, speech, OCR, translation, and document-processing support

The entrepreneur or enterprise record should become the central object linking these domains.

## Requirements Joe Assumed That May Benefit The Program

Some original assumptions may still be beneficial even if they were not emphasized in the Home Roots documents.

### Lightweight Bookkeeping

Simple bookkeeping may help entrepreneurs understand sales, expenses, profit, cash, inventory, and reinvestment capacity. It could also support measurement of income retention and productive reinvestment.

However, bookkeeping should probably be treated as a supporting capability rather than the center of the platform.

### Double-Entry Accounting Internally

Maintaining financial correctness internally while hiding accounting terminology from entrepreneurs is a strong design principle.

This may be especially useful for:

- Supply Hub accounting
- Financing records
- Organizational reporting
- Auditability
- Business financial summaries

Care should be taken not to impose full accounting complexity on early entrepreneur workflows unless the operational value is clear.

### AI Proposal Workflow

The proposed AI workflow appears highly compatible with Home Roots' human-centered design principles:

```text
User input
  -> speech/OCR/AI extraction
  -> structured proposal
  -> deterministic validation
  -> user or staff confirmation
  -> durable system record
  -> audit history
```

AI should assist with data entry, classification, translation, summarization, recommendations, and anomaly detection, but should not autonomously finalize financial records, approve loans, or generate unsupported impact claims.

### Traceable Outcome Observations

The idea that outcome metrics should be stored as dated observations with source and collection method is highly aligned with the evidence and validation goals of the methodology.

## Preliminary Feasibility Judgment

The proposed technical architecture can likely support the broader Enterprise Growth Platform vision if it is reframed before detailed design.

The architecture does not need to be discarded. The following choices remain viable:

- Offline-first mobile architecture
- Web-based staff/admin application
- Modular monolith backend
- PostgreSQL shared data layer
- Async worker architecture for OCR, AI, document processing, and reporting tasks
- Strong audit, security, and role-based access controls
- Modular domain boundaries

The larger change is product architecture, not basic technical feasibility.

The platform should be reframed from:

```text
Mobile bookkeeping and microlending platform
```

to:

```text
Offline-capable enterprise growth operating system
```

In that reframed platform, bookkeeping, microlending, speech, OCR, AI, and grant reporting are important supporting capabilities, but not the main organizing principle.

## Areas That May Not Make Sense To Build From Scratch

Even if the main platform is custom-built, some components should probably use existing services or products where appropriate:

- OCR engines
- Speech-to-text and text-to-speech
- Translation models or services
- Authentication primitives
- File storage and malware scanning infrastructure
- Mobile payment rails
- Banking integrations
- SMS/email delivery
- General BI/dashboard tooling in early phases
- Full accounting suite functionality
- Sophisticated loan servicing core, if a configurable system can meet the actual lending requirements

Custom development should focus on the parts that are unique to the Reinvest-to-Grow methodology:

- Entrepreneur journey
- Supply Hub workflows
- Collective purchasing tied to enterprise development
- Coaching and action plans
- Enterprise assessments
- Enterprise Growth Score and growth ladder tracking
- Reinvestment tracking
- Longitudinal outcomes
- Organizational learning loops

## Open Questions For JPaul And His Assistant

1. Is this understanding correct: the Supply Hub, not microlending or bookkeeping, is the initial operational center of the methodology?

2. Should entrepreneur-facing bookkeeping be part of the first platform phase, or should the first phase focus on enrollment, assessments, Supply Hub purchasing, coaching records, and basic financing records?

3. What operating workflows already exist today, even if they are manual or spreadsheet-based?

4. What is the first real-world pilot environment: one Supply Hub, one community, one product category, one group of entrepreneurs, or something else?

5. Which data must be collected from entrepreneurs directly, and which data can be collected by staff during normal operations?

6. What financing workflows are already defined versus still conceptual?

7. What does HRF need to report to funders in the next 6-12 months?

8. Which Enterprise Growth Score indicators are already known, and which are still research questions?

9. What languages and literacy constraints should shape the first mobile workflows?

10. Are entrepreneurs expected to use the platform themselves in phase 1, or will staff/coaches be the primary users at first?

## Suggested Next Step

Before technical blueprint work, the team should confirm whether this alignment brief accurately represents the current Home Roots vision.

After confirmation, the next artifact should be a revised technical blueprint that starts from the broader Enterprise Growth Platform scope and defines:

- Initial MVP scope
- Domain model
- User roles and permissions
- Core workflows
- Offline sync strategy
- Data governance model
- Integration boundaries
- Reporting and validation data requirements
- Build-vs-buy decision points


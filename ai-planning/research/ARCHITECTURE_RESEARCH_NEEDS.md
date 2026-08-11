# Architecture Research Needs

Source: `../PROJECT_SUMMARY.md`

This document lists architectural components, technologies, platform services, and domain concepts from the project summary that may need research. Remove anything already familiar.

## Mobile Recipient App

- [ ] React Native
- [ ] Expo
- [ ] TypeScript for mobile development
- [ ] Mobile-first application design
- [ ] Touch-first transaction-entry workflows
- [ ] Speech-operated mobile workflows
- [ ] Multilingual mobile input and output
- [ ] Receipt photo capture
- [ ] Document scanning from mobile devices
- [ ] Offline-first mobile architecture
- [ ] Low-connectivity UX patterns
- [ ] Local mobile persistence
- [ ] SQLite on mobile
- [ ] Offline synchronization
- [ ] Sync queues
- [ ] Conflict detection and conflict resolution
- [ ] Local versus synced state indicators
- [ ] Mobile handling of currencies, languages, and regional formats

## Back-Office Web App

- [ ] React
- [ ] TypeScript for frontend development
- [ ] Vite
- [ ] Material UI
- [ ] Administrative dashboards
- [ ] Staff-facing role-based workflows
- [ ] Portfolio health views
- [ ] Business and recipient management screens
- [ ] Transaction review screens
- [ ] Document and note review workflows
- [ ] Exportable reporting UI

## Backend Application

- [ ] Java 21+
- [ ] Spring Boot
- [ ] Modular monolith architecture
- [ ] Module boundaries inside a Spring Boot backend
- [ ] Backend validation for financial workflows
- [ ] Versioned API design
- [ ] Internal provider interfaces for replaceable services
- [ ] Deterministic validation after AI extraction
- [ ] User-confirmation workflow before final writes
- [ ] Immutable audit event generation

## Backend Domain Modules

- [ ] Organizations and tenants
- [ ] Users
- [ ] Roles and permissions
- [ ] Businesses
- [ ] Owner profiles
- [ ] Financial ledger
- [ ] Sales
- [ ] Expenses
- [ ] Inventory
- [ ] Cash movements
- [ ] Loans
- [ ] Loan applications
- [ ] Loan disbursements
- [ ] Repayment schedules
- [ ] Partial payments
- [ ] Late payments
- [ ] Loan balances
- [ ] Documents
- [ ] Extraction jobs
- [ ] AI suggestions
- [ ] Approval workflows
- [ ] Outcome metrics
- [ ] Reports
- [ ] Audit history

## Financial And Accounting Design

- [ ] Double-entry accounting
- [ ] Ledger modeling
- [ ] Journal entries
- [ ] Transaction posting
- [ ] Cash accounting workflows
- [ ] Sales tracking
- [ ] Expense tracking
- [ ] Inventory purchase versus expense classification
- [ ] Profit calculation
- [ ] Cash on hand calculation
- [ ] Outstanding customer payments
- [ ] Inventory movement reporting
- [ ] Loan balance calculation
- [ ] Repayment schedule calculation
- [ ] Delinquency calculation
- [ ] Portfolio-at-risk calculation
- [ ] Capital deployed and recycled
- [ ] Cost to administer each loan
- [ ] Auditability of financial records

## AI And Document Processing

- [ ] Python workers
- [ ] AWS Lambda handlers
- [ ] Worker architecture for asynchronous processing
- [ ] AI as an assistant rather than system of record
- [ ] Structured AI proposals
- [ ] Versioned JSON schemas for AI outputs
- [ ] Prompt input storage
- [ ] Model/provider/version tracking
- [ ] Confidence score storage
- [ ] User correction storage
- [ ] Final approved result storage
- [ ] Duplicate transaction detection
- [ ] Unusual transaction detection
- [ ] Plain-language report explanations
- [ ] AI-assisted transaction classification
- [ ] AI-assisted receipt extraction
- [ ] AI-assisted document extraction
- [ ] AI-assisted translation
- [ ] Follow-up question suggestions

## AWS Platform Services

- [ ] Amazon RDS PostgreSQL
- [ ] Amazon Aurora PostgreSQL
- [ ] Amazon S3
- [ ] Amazon Cognito
- [ ] Amazon SQS
- [ ] Amazon EventBridge
- [ ] AWS Step Functions
- [ ] Amazon ECS Fargate
- [ ] Amazon CloudFront
- [ ] S3 static website hosting
- [ ] AWS Amplify
- [ ] AWS CDK with TypeScript
- [ ] Terraform
- [ ] Amazon CloudWatch
- [ ] AWS KMS
- [ ] AWS Secrets Manager
- [ ] AWS CloudTrail
- [ ] Amazon GuardDuty
- [ ] AWS account separation for development, staging, and production

## AI, OCR, And Speech AWS Services

- [ ] Amazon Textract
- [ ] Amazon Transcribe
- [ ] Amazon Polly
- [ ] Amazon Bedrock
- [ ] Bedrock provider abstraction
- [ ] Speech-to-text workflow design
- [ ] Text-to-speech workflow design
- [ ] OCR extraction workflow design
- [ ] Human review of OCR and AI extraction results

## Data Storage And Reporting

- [ ] PostgreSQL relational schema design
- [ ] Transactional consistency for financial data
- [ ] Reporting tables or views
- [ ] Traceable grant-reporting records
- [ ] Dated outcome observations
- [ ] Outcome source tracking
- [ ] Outcome collection method tracking
- [ ] Consolidated reporting store
- [ ] Export formats for funder reports
- [ ] Data-quality checks
- [ ] Vendor-independent exports

## Security, Privacy, And Compliance Baseline

- [ ] TLS everywhere
- [ ] KMS encryption for databases
- [ ] KMS encryption for S3 documents
- [ ] KMS encryption for queues
- [ ] KMS encryption for backups
- [ ] MFA for staff and administrators
- [ ] Role-based access control
- [ ] Tenant isolation
- [ ] Immutable audit events
- [ ] Malware scanning for uploaded files
- [ ] Presigned S3 upload URLs
- [ ] Presigned S3 download URLs
- [ ] Automated backups
- [ ] Tested recovery
- [ ] Secret storage and rotation
- [ ] Security alerts
- [ ] Data retention policies
- [ ] Data deletion policies
- [ ] Sensitive-data logging controls
- [ ] Sensitive-data controls for AI prompts

## DevOps And Delivery

- [ ] GitHub Actions
- [ ] CI/CD pipeline design
- [ ] Infrastructure deployment environments
- [ ] Backend deployment to ECS Fargate
- [ ] Web deployment to CloudFront/S3
- [ ] Web deployment to Amplify
- [ ] Mobile build and release process
- [ ] Monitoring for backend services
- [ ] Monitoring for mobile apps
- [ ] Monitoring for web apps
- [ ] Sentry for mobile and web
- [ ] CloudWatch logs and metrics
- [ ] Recovery and rollback strategy

## Product Architecture And UX Concepts

- [ ] Plain-language bookkeeping UX
- [ ] Low-literacy financial workflows
- [ ] Confirmation flows before posting transactions
- [ ] Multilingual terminology testing
- [ ] Speech-first UX testing
- [ ] Offline review of recent transactions
- [ ] Manual user provisioning for MVP
- [ ] Narrow pilot design
- [ ] One-currency MVP constraints
- [ ] One- or two-language MVP constraints
- [ ] Real-world field testing strategy

## Build-Versus-Buy Alternatives To Understand

- [ ] Hybrid buy-and-build architecture
- [ ] Custom integration and reporting layer
- [ ] Loan-management system of record
- [ ] Outcome/reporting system integration
- [ ] Bookkeeping product integration
- [ ] Cross-system recipient identifiers
- [ ] Cross-system authentication and authorization
- [ ] Cross-system data synchronization
- [ ] Cross-system audit logs
- [ ] Vendor-risk assessment
- [ ] Loandisk
- [ ] Mifos X
- [ ] Apache Fineract
- [ ] ActivityInfo
- [ ] Talkbooks
- [ ] SparkReceipt
- [ ] Finovo
- [ ] Zoho Books
- [ ] Odoo
- [ ] Wave
- [ ] QuickBooks Online
- [ ] OMNIFince
- [ ] Kweezi
- [ ] MarathonBooks
- [ ] Bryt
- [ ] Cladfy Microlender
- [ ] Oradian Instafin
- [ ] Salesforce Nonprofit Cloud
- [ ] Submittable

## Suggested First Research Pass

- [ ] React Native + Expo + TypeScript
- [ ] Offline-first mobile SQLite synchronization
- [ ] Spring Boot modular monoliths
- [ ] Double-entry ledger design for simple bookkeeping apps
- [ ] Amazon Cognito authentication and role mapping
- [ ] RDS/Aurora PostgreSQL schema design for financial records
- [ ] S3 document storage with presigned URLs and malware scanning
- [ ] Textract receipt/document extraction
- [ ] Transcribe and Polly for multilingual speech workflows
- [ ] Bedrock structured-output patterns and provider abstraction
- [ ] SQS/EventBridge/Step Functions worker orchestration
- [ ] CloudWatch and Sentry monitoring split
- [ ] Tenant isolation and immutable audit history
- [ ] Loan repayment, delinquency, and portfolio-at-risk metrics
- [ ] Grant/outcome metric traceability

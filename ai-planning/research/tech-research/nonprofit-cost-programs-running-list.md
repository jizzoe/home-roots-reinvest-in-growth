# Nonprofit Cost Programs Running List

Date started: 2026-08-08

Purpose:

Track nonprofit discounts, credits, waivers, eligibility rules, and application ownership for paid technologies and services considered for the mobile bookkeeping platform.

This is a running document. Add a new section whenever architecture research reaches a paid service or account requirement.

## Research Questions To Answer For Each Paid Service

- What does the service normally cost?
- Is there a nonprofit discount, credit, grant, or fee waiver?
- What are the eligibility requirements?
- How does the nonprofit apply?
- Who must apply: the nonprofit, the developer, or either?
- Can an outside developer manage implementation after the nonprofit owns the account?
- What documents or identity checks are likely required?
- Are there usage restrictions, expiration dates, or excluded services?
- What operational risks remain after credits or waivers expire?

## Working Recommendation

Use two research tracks:

1. Main architecture research continues in order.
2. Nonprofit cost research runs as a side track whenever a paid service becomes relevant.

This is better than waiting until the end because account ownership, nonprofit eligibility, free-credit expiration, and app-store identity can affect architecture and rollout decisions early. The side track should stay lightweight: capture eligibility, application path, owner, benefits, limits, and links, then return to the main research step.

Do not let cost-program research block technical research unless the account ownership model changes the architecture or release path.

## Account Ownership Principle

For nonprofit benefits, assume the nonprofit organization should own and apply for the relevant paid account unless official documentation clearly allows a developer/vendor to apply on its behalf.

The outside developer can usually be invited later as an admin, developer, IAM user, IAM Identity Center user, App Store Connect user, or project collaborator. That is different from the developer personally owning the discounted account.

This matters because:

- app stores display legal seller/developer identity;
- AWS accounts contain billing, data, and security responsibility;
- nonprofit credits/waivers are granted based on the nonprofit's legal status;
- ownership should survive if the outside developer stops working on the project.

## Apple Developer Program

### High-Level Summary

Apple normally charges for Apple Developer Program membership. Eligible nonprofit organizations can request a fee waiver, but the organization must qualify. For this project, the nonprofit should apply for and own the Apple Developer Program membership; the developer should be added to the team afterward.

### Normal Cost

- Apple Developer Program: 99 USD per membership year.
- Apple Developer Enterprise Program: 299 USD per membership year.

The regular Apple Developer Program is the likely relevant program for App Store and TestFlight distribution. Enterprise Program is for internal enterprise distribution and is probably not the starting point.

### Nonprofit Benefit

Apple offers an annual membership fee waiver for eligible nonprofit organizations, accredited educational institutions, and government entities.

If approved, the organization does not need to pay the annual Apple Developer Program membership fee while it remains eligible and renews the waiver properly.

Apple also states that nonprofits, educational institutions, and government entities approved for an Apple Developer Program fee waiver do not pay the EU Core Technology Fee under the relevant alternative terms context.

### Eligibility Requirements

Apple's fee-waiver requirements include:

- applicant must be a legal entity with nonprofit, accredited educational institution, or government entity status;
- applicant cannot be an individual, sole proprietor, or single-person business;
- applicant must not have signed the Paid Applications Agreement to offer paid apps or in-app purchases, or must have terminated it;
- applicant must not otherwise sell digital goods or services through its apps.

For organization enrollment generally, Apple requires organization identity verification. For organizations, this commonly includes:

- legal entity status;
- D-U-N-S Number, except for government organizations;
- legal authority for the enrolling person to bind the organization;
- work email address associated with the organization domain;
- public, functional organization website associated with the organization.

### How To Apply

If the nonprofit is joining the Apple Developer Program:

1. Enroll as an organization, not as an individual.
2. During enrollment, select the option to request a fee waiver.
3. Complete Apple's organization verification.
4. Apple reviews and may request documentation.

If the nonprofit already has an Apple Developer Program membership:

1. The Account Holder can submit a fee-waiver request before membership expiration.
2. The Account Holder must confirm ongoing eligibility during annual renewal.

### Who Should Apply?

The nonprofit should apply.

The person applying should be someone with legal authority for the nonprofit, or someone Apple accepts as having authority to bind the organization. If your friend owns/runs the nonprofit, they are the likely applicant or Account Holder.

You, as the outside developer, generally should not apply personally for the nonprofit fee waiver unless you also have legal authority to bind the nonprofit and are enrolling on behalf of the organization through its legal identity. A personal developer account would list your legal identity, would not qualify as the nonprofit, and would be the wrong long-term ownership model for the nonprofit's app.

Practical model:

- nonprofit owns Apple Developer Program membership;
- nonprofit founder/director is Account Holder;
- developer is invited into App Store Connect / Apple Developer team with appropriate permissions;
- app is distributed under nonprofit identity.

### Project Implications

- For early iOS Simulator testing, a paid Apple Developer account may not be needed.
- For physical iPhone ad hoc/internal distribution, TestFlight, or App Store release, plan on Apple Developer Program access.
- If the nonprofit qualifies for the waiver, Apple membership cost may be zero.
- If waiver approval is delayed, budget 99 USD/year as fallback.

### Sources

- Apple Developer Program enrollment: https://developer.apple.com/programs/enroll/
- Apple membership enrollment help: https://developer.apple.com/help/account/membership/program-enrollment
- Apple fee waiver help: https://developer.apple.com/help/account/membership/fee-waivers
- Apple membership comparison: https://developer.apple.com/support/compare-memberships/
- Apple Core Technology Fee support: https://developer.apple.com/support/core-technology-fee/

## AWS

### High-Level Summary

AWS has nonprofit credit programs that can offset cloud costs, but they are credits, not a permanent free tier. The nonprofit should own the AWS account or AWS Organization used for the production system. The developer can be granted access through proper IAM roles/users.

AWS nonprofit programs are relevant because the proposed architecture uses paid AWS services:

- RDS or Aurora PostgreSQL
- S3
- Cognito
- SQS
- EventBridge
- Step Functions
- ECS Fargate
- CloudFront
- CloudWatch
- KMS
- Secrets Manager
- Textract
- Transcribe
- Translate
- Polly
- Bedrock

### Normal Cost

AWS is generally pay-as-you-go. Costs depend on actual service usage.

For this project, the first meaningful costs are likely to come from:

- always-on database capacity;
- backend compute;
- document storage and transfer;
- OCR/speech/AI calls;
- logging/monitoring;
- multi-environment infrastructure.

Credits can help prototype and pilot costs, but the architecture still needs budgets, alarms, and shutdown controls.

### Nonprofit Benefit

AWS lists several nonprofit-related programs:

- AWS Nonprofit Credit Program, distributed through TechSoup and partner NGOs.
- AWS TechAction, for donor/member engagement and fundraising-related projects.
- AWS Imagine Grant Program, for registered 501(c) nonprofits in the United States using technology to address major challenges.
- AWS Cloud Credit for Research, if the project has a qualifying research angle.

For a U.S. 501(c)(3), the TechSoup program is currently tiered by annual operating budget:

| Annual operating budget | AWS credit | TechSoup administrative fee | Gross monthly equivalent | Net annual value after fee |
|---|---:|---:|---:|---:|
| Under $10 million | $1,000 | $95 | $83.33 | $905, or $75.42/month |
| $10 million-$50 million | $2,000 | $190 | $166.67 | $1,810, or $150.83/month |
| Over $50 million | $5,000 | $475 | $416.67 | $4,525, or $377.08/month |

The arithmetic behind the 5,000 USD assumption is correct: `5000 / 12 = 416.6667`. The assumption that every nonprofit receives that amount is not correct. A nonprofit with an operating budget below 10 million USD should plan around the 1,000 USD tier unless it qualifies for a separate program.

TechSoup says an eligible organization may request one grant per AWS fiscal year, July 1 through June 30. This makes the program renewable in principle, but it should be treated as an annual application and eligibility decision rather than a guaranteed perpetual subsidy. Credits are valid for 12 months and cannot be rolled over.

AWS TechAction is a separate program that can award up to 5,000 USD for qualified donor, member, and fundraising projects. It is not guaranteed, and this mission-delivery platform is not an obvious fit unless the submitted project genuinely addresses those use cases. Do not use the TechAction maximum as the operating budget baseline.

### Eligibility Requirements

For the AWS Nonprofit Credit Program, AWS states eligibility includes nonprofits with these U.S. designations:

- 501(c)(1)
- 501(c)(3)
- 501(c)(8)
- 501(c)(9)
- 501(c)(11)
- 501(c)(12)
- 501(c)(14)
- 501(c)(15)

AWS also mentions public libraries with valid 501(c)(3) status or licensed within the Institute of Museum and Library Services database.

AWS says organizations with annual operating budgets of any size are eligible.

Educational institutions such as K-12 schools, colleges, universities, and trade schools are not eligible for that nonprofit credit program, but may be eligible for AWS Educate.

For AWS TechAction, AWS states criteria include:

- organization must be a registered nonprofit or credit union in the United States with a valid EIN;
- organization must have an active AWS account;
- organization must complete the credit application;
- application must include a project description for donor engagement or fundraising.

The current mobile bookkeeping project may or may not fit TechAction depending on whether AWS considers it donor/member engagement or fundraising. It looks more directly aligned with mission service delivery and impact reporting, so the TechSoup nonprofit credit program or Imagine Grant may be better initial fits.

### How To Apply

For AWS Nonprofit Credit Program:

1. Verify nonprofit eligibility through TechSoup or the relevant international TechSoup partner NGO.
2. Request AWS Promotional Credit through TechSoup for U.S.-registered organizations, or through the relevant partner NGO for international organizations.
3. Receive a promotional credit code.
4. Redeem it in the AWS Billing console under Credits.

For AWS TechAction:

1. Create or identify the nonprofit-owned AWS account.
2. Complete the TechAction application.
3. Include a project description focused on donor/member engagement or fundraising, if applicable.
4. AWS says applications are reviewed and credits are disbursed within a stated review window if approved.

For AWS Imagine Grant:

1. Confirm the nonprofit is a registered 501(c) nonprofit in the United States.
2. Review the grant cycle and program requirements.
3. Apply through the AWS Imagine Grant application process if the project is mature enough to compete.

### Who Should Apply?

The nonprofit should apply.

You, as the developer, should not apply for nonprofit AWS credits under your personal AWS account. The credit is for the eligible nonprofit organization, and production cloud ownership should sit with the nonprofit.

Practical model:

- nonprofit creates or owns the AWS account or AWS Organization;
- nonprofit billing/contact/legal details are used;
- nonprofit applies for credits;
- developer receives least-privilege access through IAM Identity Center, IAM roles, or project-specific IAM users;
- billing alarms and budgets are configured before meaningful infrastructure is deployed.

### Usage Restrictions And Expiration

AWS Promotional Credit typically has limits:

- valid for on-demand pay-as-you-go services;
- may exclude Reserved Instances, some support charges, AWS Marketplace, Route 53 domain registration/transfer, cryptocurrency mining, upfront fees, and other excluded charges;
- expires after the stated credit validity period or when exhausted;
- once exhausted or expired, normal AWS charges apply.

Because this project may involve AI/OCR/speech services, do not assume every cost will be fully covered without checking AWS Promotional Credit terms at redemption time.

### AWS Free Tier And Small-POC Cost Audit

**Research date:** August 9, 2026

**Bottom line:** A new AWS customer can probably run the small proof of concept with a **zero cash bill for several months without using nonprofit-specific credits**, but not because every proposed service has a traditional free usage allowance. AWS changed its Free Tier for accounts created on or after July 15, 2025. New customers receive 100 USD in general AWS signup credits, can earn up to 100 USD more through guided activities, and can use a Free Plan for up to six months or until those credits are depleted. These are ordinary new-customer credits, not nonprofit credits.

This distinction matters:

- **Always-free allowance:** a service has a recurring free monthly quota for new and existing customers.
- **Time-limited service trial:** a service has a free quota for a stated number of months.
- **Credit-covered only:** ordinary charges accrue and consume the new-account credit balance; the service is not inherently free.
- **No free allowance:** the service creates a cash charge unless general AWS credits cover it.

The Free Plan itself closes when the six-month period or credit balance ends. A customer can upgrade to the Paid Plan and use remaining general Free Tier credits, which expire 12 months after account creation. An existing account generally does not receive a new signup-credit allocation. Accounts created before July 15, 2025 follow legacy rules until their original eligibility expires.

#### Estimate Assumptions

Unless stated otherwise, estimates use:

- US East (N. Virginia), `us-east-1`;
- 730 hours in a month;
- one non-production environment;
- one backend task or instance;
- one small PostgreSQL database;
- synthetic data only;
- low request, document, speech, and AI volume;
- no Multi-AZ database, NAT Gateway, paid support plan, WAF, or production redundancy;
- prices before tax and excluding domain registration, SMS, and unusually high data transfer.

AWS prices vary by Region and can change. The rates below should be rechecked in the AWS Pricing Calculator before deployment.

#### Service-By-Service Audit

| Service | Free Tier treatment as of research date | Current `us-east-1` price relevant to the POC | Minimal POC estimate |
|---|---|---|---|
| Amazon RDS for PostgreSQL | New Free Plan usage consumes general credits. Legacy eligible accounts received 750 Single-AZ `db.t3.micro`/`db.t4g.micro` hours, 20 GB storage, and 20 GB backups monthly for 12 months. It is not always free. | `db.t4g.micro`: $0.016/hour on demand. One-year Standard RI: $95 all upfront, or $0.0116/hour no upfront. GP3 storage: $0.115/GB-month. | 20 GB, always on: **$13.98/month on demand**, **$10.22/month effective** with one-year all-upfront RI, or **$10.77/month** with one-year no-upfront RI. |
| Amazon Aurora PostgreSQL Serverless v2 | Available to new Free Plan customers, but the offer is credit-backed, not an enduring zero-cost database. | $0.12/ACU-hour, $0.10/GB-month storage, and $0.20/million I/O requests. Supported versions can auto-pause at 0 ACUs. | At 0.5 ACU for 40 active hours and 1 GB storage: approximately **$2.50/month**, plus negligible I/O. It can be cheaper than RDS for an intermittent POC that tolerates resume latency. |
| Amazon S3 | Time-limited new-customer allowance: 5 GB S3 Standard, 20,000 GET, 2,000 PUT/COPY/POST/LIST, and 100 GB transfer out monthly for 12 months. | S3 Standard starts at $0.023/GB-month; PUT is $0.005/1,000 and GET is $0.0004/1,000 in `us-east-1`. | Usually **$0 during the allowance**. Afterward, 1 GB plus a few thousand requests is normally **under $0.05/month**. |
| Amazon Cognito | Always-free for Lite and Essentials up to 10,000 direct/social monthly active users. SAML/OIDC federation has only 50 free MAUs. Identity pools are free. Plus tier, M2M tokens, SMS, email delivery, and advanced features can add charges. | Lite above the direct-user allowance starts at $0.0055/MAU; Essentials starts at $0.015/MAU. | **$0/month** for a small direct-sign-in POC. Avoid SMS MFA and use authenticator-app MFA or development-only email flows. |
| Amazon SQS | Always-free first 1 million requests each month. | Standard requests above the allowance are priced per million; payloads are billed in 64 KB units. | **$0/month** at POC volume. |
| Amazon EventBridge | AWS management-event ingestion is free. There is no general free quota for application custom events. | Custom, partner, and opt-in data-event ingestion: $1/million events; same-account delivery to a service is free. | 10,000 custom events: approximately **$0.01/month**. This is chargeable but immaterial at POC volume. |
| AWS Step Functions | Always-free first 4,000 Standard Workflow state transitions each month. | $0.000025 per Standard state transition above the allowance. | **$0** below 4,000 transitions; 10,000 total transitions would cost approximately **$0.15/month**. Do not add it until orchestration is useful. |
| Amazon ECS | ECS orchestration has no separate charge. The underlying Fargate or EC2 capacity is billed. | $0 ECS control-plane charge. | **$0 for ECS itself**; see Fargate or EC2 compute below. |
| AWS Fargate for ECS | No enduring Fargate compute allowance. New Free Plan credits can cover it. | ARM Linux: $0.0000089944/vCPU-second and $0.0000009889/GB-second; 20 GB ephemeral storage is included. | One always-on 0.25-vCPU/0.5-GB ARM task: approximately **$7.21/month**, before networking. Running only 40 hours/month is approximately **$0.40**. |
| Amazon EC2 alternative | New Free Plan credits can be used with eligible instances including `t4g.micro`; this is credit-backed for six months. Legacy rules differ. | Linux `t4g.micro`: $0.0084/hour on demand; one-year Standard RI is $43 all upfront or $0.0053/hour no upfront. GP3 EBS: $0.08/GB-month. | Compute only: **$6.13/month on demand** or **$3.58/month effective** with one-year all-upfront RI. Add storage and public IPv4. |
| Amazon ECR private repositories | Time-limited allowance: 500 MB/month for one year for new customers. Public repository allowances are larger and always free, but public images are inappropriate for private application artifacts unless intentional. | Private storage: $0.10/GB-month; same-Region transfer to ECS/EC2/Fargate is free. | **$0** if kept below 500 MB during the first year; otherwise typically **$0.05-$0.20/month** with aggressive image cleanup. |
| Amazon CloudFront | Always-free traditional allowance: 1 TB data transfer and 10 million HTTP/HTTPS requests monthly. AWS also offers a separate $0 flat-rate CloudFront plan, but Free Plan accounts cannot enroll in flat-rate plans. | POC traffic should remain within the traditional allowance. | **$0/month** for the expected static web and test traffic. |
| Amazon CloudWatch | Always-free allowances include 5 GB of logs, 10 custom/detailed metrics, 1 million API requests, three dashboards, and 10 standard alarm metrics monthly. Basic AWS service metrics are free. | Standard log ingestion starts at $0.50/GB beyond the allowance; log storage starts at $0.03/GB-month. | **$0/month** if application logs are sampled, retained briefly, and remain below 5 GB. |
| AWS KMS | Always-free first 20,000 eligible requests monthly, but customer-managed key storage is not free. AWS-managed and AWS-owned keys have no monthly key-storage charge. | Customer-managed key: $1/month; symmetric requests above the allowance: $0.03/10,000. | **$0** using AWS-managed service keys; **$1/month per customer-managed key** if isolation or key-policy control requires one. |
| AWS Secrets Manager | No enduring per-secret free allowance. New Free Plan credits can cover it. | $0.40/secret-month and $0.05/10,000 API calls. | One database secret with low API use: approximately **$0.40/month**. Standard SSM Parameter Store parameters are a lower-cost POC alternative when rotation is not required. |
| Amazon Textract | Three-month trial for new customers: 1,000 Detect Document Text pages or 100 Analyze Expense pages monthly. No enduring allowance. | Detect Document Text: $0.0015/page; Analyze Expense: $0.01/page for the first million. | **$0** for up to 100 receipt pages/month during the trial; afterward **$1/month** for 100 Analyze Expense pages. |
| Amazon Transcribe | Time-limited allowance: 60 audio minutes/month for 12 months starting with the first request. | Standard transcription starts at $0.0004/second, or $0.024/minute, with minimum billable duration rules. | **$0** at or below 60 minutes during the trial; afterward **$1.44/month** for 60 minutes. |
| Amazon Translate | Time-limited allowance: 2 million standard text characters/month for 12 months starting with the first request. | Standard text and batch document translation: $15/million characters. Real-time DOCX translation is $30/million and has no service-specific free allowance. | **$0** for 100,000 characters during the trial; afterward **$1.50/month**. |
| Amazon Polly | Time-limited allowances include 5 million Standard voice characters and 1 million Neural voice characters monthly for the first 12 months. | Standard: $4/million characters; Neural: $16/million. | **$0** for 100,000 characters during the trial; afterward **$0.40 Standard** or **$1.60 Neural** per month. |
| Amazon Bedrock | No enduring general model-inference allowance. New-account credits can pay for inference. Model prices vary substantially. | Amazon Nova Micro on-demand: $0.035/million input tokens and $0.14/million output tokens. | 1,000 proposals averaging 1,000 input and 200 output tokens: approximately **$0.06/month**. Guardrails, agents, knowledge bases, larger models, or provisioned throughput are separate. |

#### Supporting Infrastructure That Changes The Total

The original service list omits several resources in the proposed ECS/RDS deployment that can cost more than the application traffic:

| Resource | Free treatment and current price | Minimal POC effect |
|---|---|---|
| VPC, subnets, route tables, security groups, internet gateway | No hourly charge for the basic constructs. | **$0**. |
| Public IPv4 | $0.005/address-hour. It is not an always-free allowance. | **$3.65/month per continuously allocated address**. An internet-facing ALB normally consumes at least two because it spans at least two Availability Zones. |
| Application Load Balancer | New-account benefits are time-limited/credit-backed. Afterward, $0.0225/hour plus $0.008/LCU-hour in `us-east-1`, plus public IPv4 charges. | Base ALB charge is **$16.43/month**. With two public IPv4 addresses and negligible traffic, budget at least **$23.73/month**. |
| NAT Gateway | No enduring free allowance. Approximately $0.045/hour plus $0.045/GB processed and a public IPv4 address. | About **$36.50/month before data transfer** for one continuously running NAT Gateway and IPv4 address. Do not use one in the POC. |
| Route 53 public hosted zone | No free allowance. | **$0.50/month** for one hosted zone, plus approximately $0.40/million standard queries. Domain registration is separate and generally cannot be paid with promotional credits. |
| AWS Certificate Manager | Non-exportable public certificates used with integrated AWS services such as ALB and CloudFront are issued at no cost. | **$0**. Exportable certificates are chargeable and unnecessary for this POC. |
| AWS Budgets | Basic budget monitoring and the guided Free Tier activity are available without a meaningful POC charge. | **$0** for the small number of required budgets and alerts. |

#### Architecture-Level Monthly Estimates

**Option A: Keep the planned ECS Fargate, RDS, and ALB shape**

This is the closest POC to the current target architecture:

| Component | Estimate |
|---|---:|
| One ARM Fargate task, 0.25 vCPU / 0.5 GB, always on | $7.21 |
| RDS PostgreSQL `db.t4g.micro`, 20 GB GP3, on demand | $13.98 |
| Application Load Balancer base charge | $16.43 |
| Two ALB public IPv4 addresses | $7.30 |
| One Fargate-task public IPv4 for no-NAT outbound access | $3.65 |
| One Secrets Manager secret | $0.40 |
| Route 53 hosted zone | $0.50 |
| S3, ECR, CloudWatch, Cognito, SQS, KMS requests, and low-volume usage services | approximately $0 |
| **Estimated total after general signup credits** | **approximately $49.50/month** |

This estimate deliberately excludes a NAT Gateway. Interface VPC endpoints are not automatically cheaper at this scale. With 100 USD of general signup credit, this shape has roughly two months of runway; with the full 200 USD, roughly four months. The cash bill can still be zero during that period, but the architecture consumes general AWS Free Tier credits quickly.

**Option B: Lowest-cost AWS connectivity proof**

For a disposable technical POC using synthetic data, run the Spring Boot application and PostgreSQL together on one ARM `t4g.micro` EC2 instance, use 10 GB GP3 EBS, one public IPv4 address, AWS-managed encryption keys, no ALB, no NAT Gateway, no Route 53 hosted zone, and no Secrets Manager. CloudFront's default domain can provide a public HTTPS entry point if the origin/security tradeoff is accepted for synthetic POC data.

| Component | On demand | One-year Standard RI, all upfront, amortized |
|---|---:|---:|
| `t4g.micro` compute | $6.13 | $3.58 ($43 upfront) |
| 10 GB GP3 EBS | $0.80 | $0.80 |
| One public IPv4 | $3.65 | $3.65 |
| **Estimated total** | **$10.58/month** | **$8.03/month effective** |

This is not a production design: one gigabyte of RAM is tight for Spring Boot plus PostgreSQL, the database is not managed, there is no high availability, and the origin path needs explicit security review. A `t4g.small` gives 2 GB RAM and raises on-demand compute to roughly twice the `t4g.micro` amount. The purpose of this shape is to prove mobile-to-AWS connectivity at minimal cost, not to establish the production runtime.

If the instance runs only during approximately 40 development/test hours per month and releases its public IPv4 when stopped, the on-demand compute, IP, and persistent 10 GB EBS cost is approximately **$1.35/month**. Automating teardown is therefore more valuable for an intermittent POC than buying a reservation.

#### Reserved-Instance Recommendation

Do not buy an EC2 or RDS Reserved Instance before the POC proves that the resource will remain in use for at least a year.

- Reserved Instances are billing commitments, not smaller runtime sizes.
- Free Tier and promotional credits may exclude upfront Reserved Instance fees.
- The one-year all-upfront EC2 saving in the lean POC is only about $2.55/month compared with on demand.
- Stopping or destroying POC resources when unused saves more and preserves architecture flexibility.
- If the selected shape becomes a stable pilot, reevaluate a one-year Compute Savings Plan or Reserved Instance using measured utilization.

#### Recommendation For Avoiding Nonprofit Credits

1. Use a new nonprofit-owned AWS account only if it legitimately qualifies as a new customer; do not create duplicate accounts merely to repeat Free Tier benefits.
2. Select the Paid Plan at signup only if the POC needs services unavailable to the Free Plan; otherwise start with the Free Plan and its 100-200 USD general credits.
3. Keep the first mobile/backend/database integration local until AWS-specific deployment behavior is the question being tested.
4. For the first AWS proof, use the lean, teardown-friendly EC2 shape or an equally disposable serverless shape rather than the full ECS/RDS/ALB topology.
5. Avoid NAT Gateway, Multi-AZ RDS, ALB, customer-managed KMS keys, SMS MFA, and always-on AI/document infrastructure.
6. Enable AWS Budgets, Free Tier usage alerts, cost-allocation tags, and a kill date before deployment.
7. Delay nonprofit-credit redemption until the project needs a longer-running shared pilot or a production-like topology.

Under this approach, the MVP can likely reach technical validation without consuming nonprofit-specific credits. The exact answer depends on whether the nonprofit AWS account is new, whether a continuously available public endpoint is required, and whether the POC must validate the target ECS/RDS/ALB topology rather than only application behavior.

### Scaled Architecture Cost Outlook

**Research date:** August 9, 2026

The architecture can remain below 400 USD/month beyond the MVP, but not at every reasonable meaning of "scale." Basic application requests, Cognito users, queues, and S3 bookkeeping data are inexpensive. Receipt OCR and speech transcription scale directly with user behavior and are likely to determine when the system crosses the budget.

#### Production Baseline

A lean production deployment should not use the single-instance POC shape. A credible starting point would include:

- two small ARM Fargate API tasks across Availability Zones;
- burst or scheduled worker capacity;
- an internet-facing ALB;
- private application and database subnets with one NAT Gateway initially;
- a small Multi-AZ RDS PostgreSQL database with 50-100 GB storage;
- short log retention, database backups, S3 documents, secrets, and monitoring;
- one production environment, without a permanently running duplicate staging environment.

At current `us-east-1` rates, budget approximately **$180-$230/month** for that fixed production floor. The range allows for database sizing, ALB capacity units, logs, backups, and low worker utilization. A redundant NAT Gateway in a second Availability Zone, a continuously running staging environment, or larger database instances would raise the floor.

This is intentionally an operationally lean design. It is more resilient than the POC, but it does not include enterprise support, cross-Region disaster recovery, a data warehouse, large observability products, or dedicated infrastructure per nonprofit tenant.

#### Usage Assumptions

The following model uses monthly active entrepreneurs, not registered accounts.

**Moderate use per active entrepreneur per month:**

- 10 receipt or invoice pages processed with Textract Analyze Expense;
- 2 minutes of Transcribe speech input;
- 1,000 translated characters;
- 1,000 Polly Standard characters;
- ordinary bookkeeping API traffic and small Bedrock Nova prompts.

At published unit prices, this is approximately **$0.17 per active entrepreneur/month** before shared infrastructure:

- Textract: `10 x $0.01 = $0.10`;
- Transcribe: `2 x $0.024 = $0.048`;
- Translate: `1,000 x $15 / 1,000,000 = $0.015`;
- Polly Standard: `1,000 x $4 / 1,000,000 = $0.004`;
- Bedrock, S3, queues, and ordinary API traffic: normally less than one cent at this usage level.

**Heavy use per active entrepreneur per month:** 20 OCR pages, 5 speech minutes, 2,000 translated characters, and 2,000 Polly Standard characters. This is approximately **$0.36 per active entrepreneur/month** before shared infrastructure.

These are planning assumptions, not observed product metrics. Offline entry and touch-first workflows may reduce speech usage, while receipt-heavy businesses may generate substantially more OCR pages.

#### Monthly Scale Scenarios

| Monthly active entrepreneurs | Workload | Shared infrastructure estimate | Usage-service estimate | Expected total | Below $400? |
|---:|---|---:|---:|---:|---|
| 100 | Moderate | $180-$230 | about $17 | **$200-$250** | Yes |
| 500 | Moderate | $190-$250 | about $84 | **$275-$335** | Yes |
| 1,000 | Moderate | $220-$310 | about $167 | **$390-$480** | Borderline |
| 1,000 | Heavy | $230-$330 | about $356 | **$585-$685** | No |
| 5,000 | Moderate | $300-$600 | about $835 | **$1,135-$1,435** | No |

The shared-infrastructure range rises at 1,000 and 5,000 active users to allow more API tasks, worker capacity, database memory, storage, logs, and load-balancer use. These tiers are directional estimates, not capacity-test results. Load testing and measured user behavior should replace them before committing to a grant-funded production budget.

#### Assessment Of The $400 Hypothesis

The hunch is **reasonable for a pilot and probably for several hundred monthly active entrepreneurs**. It is also possible near 1,000 active entrepreneurs if users average roughly 10 OCR pages and two speech minutes monthly and the platform remains operationally lean. It is not a safe assumption for heavy usage or several thousand active entrepreneurs.

The credit tier changes the conclusion:

- A small nonprofit's normal 1,000 USD credit offsets only $83.33/month on a gross annualized basis, not $416.67/month.
- A 5,000 USD grant can cover up to $5,000 of eligible annual on-demand charges, but its $475 administrative fee remains a cash expense.
- At $400/month, annual eligible AWS usage is $4,800, leaving only $200 of credit headroom. The effective cost including the TechSoup fee is still $475/year, plus excluded charges such as domain registration.
- Promotional credit does not cover Reserved Instances, Savings Plan upfront fees, or other upfront charges. On-demand and aggressive rightsizing are therefore the appropriate grant-funded baseline even when a reservation would have a lower nominal unit price.

To stay below 400 USD/month as adoption grows, measure and control `OCR pages / active user`, `speech minutes / active user`, log ingestion, NAT data processing, and database utilization. Those metrics should become budget alarms and product analytics events before the pilot expands.

### AWS Free Tier And Pricing Sources

- AWS Free Tier FAQ and plan rules: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-FAQ.html
- AWS Nonprofit Credit Program: https://aws.amazon.com/government-education/nonprofits/nonprofit-credit-program/
- TechSoup AWS credit tiers and administrative fees: https://page.techsoup.org/amazon-web-services-for-nonprofits
- TechSoup AWS Nonprofit Credit Program FAQ: https://www.techsoup.org/support/articles-and-how-tos/aws-nonprofit-credit-program-faq
- AWS TechAction FAQ: https://aws.amazon.com/government-education/nonprofits/techaction/aws-techaction-faq/
- AWS Free Plan versus Paid Plan: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html
- AWS 2025 Free Tier announcement: https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/
- RDS PostgreSQL pricing: https://aws.amazon.com/rds/postgresql/pricing/
- RDS and Aurora Free Tier: https://aws.amazon.com/rds/free/
- Aurora PostgreSQL Free Tier announcement: https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-aurora-postgresql-aws-free-tier/
- Aurora Serverless v2 auto-pause: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html
- AWS official regional price catalogs: https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json
- S3 pricing and free usage: https://aws.amazon.com/s3/pricing/ and https://aws.amazon.com/s3/faqs/
- Cognito pricing: https://aws.amazon.com/cognito/pricing/
- SQS pricing: https://aws.amazon.com/sqs/pricing/
- EventBridge pricing: https://aws.amazon.com/eventbridge/pricing/
- Step Functions pricing: https://aws.amazon.com/step-functions/pricing/
- ECS and Fargate pricing: https://aws.amazon.com/ecs/pricing/ and https://aws.amazon.com/fargate/pricing/
- EC2 pricing and Free Tier eligibility: https://aws.amazon.com/ec2/pricing/ and https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-free-tier-usage.html
- ECR pricing: https://aws.amazon.com/ecr/pricing/
- CloudFront free usage: https://aws.amazon.com/cloudfront/faqs/
- CloudWatch pricing: https://aws.amazon.com/cloudwatch/pricing/
- KMS pricing: https://aws.amazon.com/kms/pricing/
- Secrets Manager pricing: https://aws.amazon.com/secrets-manager/pricing/
- Textract pricing: https://aws.amazon.com/textract/pricing/
- Transcribe pricing: https://aws.amazon.com/transcribe/pricing/
- Translate pricing: https://aws.amazon.com/translate/pricing/
- Polly pricing: https://aws.amazon.com/polly/pricing/
- Bedrock pricing: https://aws.amazon.com/bedrock/pricing/
- VPC, NAT Gateway, and public IPv4 pricing: https://aws.amazon.com/vpc/pricing/
- Elastic Load Balancing pricing: https://aws.amazon.com/elasticloadbalancing/pricing/
- Route 53 pricing: https://aws.amazon.com/route53/pricing/
- Certificate Manager pricing: https://aws.amazon.com/certificate-manager/pricing/

### Project Implications

- Build early prototypes locally where possible.
- Use AWS only when validating AWS-specific architecture.
- Create AWS budgets and billing alerts before deploying.
- Prefer low-cost pilot architecture over production-grade always-on infrastructure during research.
- Keep development, staging, and production account separation as a security target, but delay full multi-account rollout until the architecture is clearer.
- Track credit expiration dates and monthly burn rate.

### Sources

- AWS Nonprofit Credit Program: https://aws.amazon.com/government-education/nonprofits/nonprofit-credit-program/
- AWS Programs for Nonprofits & NGOs: https://aws.amazon.com/government-education/nonprofits/programs/
- AWS TechAction FAQ: https://aws.amazon.com/government-education/nonprofits/techaction/aws-techaction-faq/
- AWS Imagine Grant overview: https://aws.amazon.com/government-education/nonprofits/programs/

## Future Paid Services To Track

Add entries when these become part of the research:

- Expo EAS paid plans, if free limits are insufficient.
- GitHub paid features, if private org/team features become relevant.
- Sentry, if nonprofit/open-source/startup discounts apply.
- OpenAI, Anthropic, or other AI API credits if used outside AWS Bedrock.
- Google Play Console developer account.
- Domain registration and DNS.
- Email/SMS providers.
- OCR, speech, translation, and AI services outside AWS.
- Database hosting alternatives such as Supabase, Neon, or PlanetScale if considered.
- Monitoring/logging vendors.
- MUI X Pro/Premium, if paid Data Grid or advanced component features become necessary.

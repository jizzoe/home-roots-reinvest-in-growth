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

There is some amount variation across AWS pages:

- one AWS nonprofit credit page says the program provides access to up to 5,000 USD in AWS Promotional Credit;
- another AWS nonprofit programs page references 2,000 USD in promotional credits;
- AWS TechAction FAQ says the TechSoup nonprofit credit program provides 1,000 USD once per year, while TechAction provides up to 5,000 USD for donor/member engagement projects.

Treat the amount as program-specific and time-sensitive. Verify the current amount on the exact application page before applying.

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

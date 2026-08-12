# EKS CI/CD and Environment Strategy Research

Research date: 2026-08-12  
Scope: Delivery of Spring Boot/container workloads from GitHub into Amazon EKS environments.

## Decision Summary

**Recommended starting architecture:** GitHub Actions for CI, Amazon ECR for immutable container images, and GitHub Environments plus AWS IAM OIDC for deployment controls. Use Helm as the workload package format. Adopt **AWS-managed Argo CD on EKS** for GitOps delivery once the team has development, staging, and production environments to promote between.

This is the best balance for the project:

- GitHub already holds the code and pull-request workflow.
- AWS owns the runtime, image registry, IAM, and EKS clusters.
- GitHub OIDC avoids long-lived AWS access keys in repository secrets.
- Argo CD makes the desired state, promotion history, rollback, and drift recovery visible in Git without operating an Argo control plane ourselves.
- It can begin with a small number of services and evolve cleanly into more repositories/environments.

Do **not** begin with Jenkins or Harness unless HRF already has an operator, a policy requirement, or a broader portfolio that justifies their management/control-plane cost.

## What "CI/CD to EKS" Actually Includes

Continuous integration should:

1. Run linting, unit tests, integration tests, and API/contract checks on pull requests.
2. Build a container only from protected, merged source.
3. Scan dependencies/container image, generate an SBOM if selected, and publish an immutable image reference to ECR.
4. Publish deployment metadata, such as image digest, Helm chart version, commit SHA, and test results.

Continuous delivery should:

1. Promote the **same image digest**, not rebuild different images per environment.
2. Apply the environment's Helm values/Kustomize overlay through a reviewed change.
3. Require explicit production approval and run health/rollback checks.
4. Record who approved and what image/configuration was deployed.

EKS deployment is only one part of delivery. Terraform (or another selected IaC tool) should separately create AWS accounts, VPCs, EKS, ECR, RDS, IAM, observability, and shared services. The application deployer should not have broad infrastructure-administrator rights.

## Recommended Environment Strategy

### Environments

| Environment | Purpose | AWS boundary | Deployment rule |
| --- | --- | --- | --- |
| Local | Fast developer feedback, Docker/Testcontainers where useful. | Developer machine; no shared cloud data. | Manual. |
| Development | Shared integration and API testing with synthetic data. | Non-production AWS account; namespace per service or team. | Automatically promote the main branch after CI passes. |
| Staging / pilot rehearsal | Release-candidate validation, migration rehearsal, end-to-end smoke tests. | Separate non-production account or a strongly isolated cluster/namespace. | Promote a tested image digest by PR; optional approval. |
| Production / pilot | Real pilot workload and participant data only after governance approval. | Dedicated AWS account and EKS cluster. | Protected production environment, required human approval, deployment window/rollback evidence. |

At minimum, separate production from non-production by **AWS account**. For the initial small team, development and staging may share a non-production EKS cluster only when they have separate namespaces, IAM roles, network policies, secrets, databases/buckets, resource quotas, and clear cost/availability isolation. Production should have its own cluster/account so testing cannot affect participant data or availability.

### Promotion Model

Use a build-once, promote-by-digest model:

`pull request -> CI checks -> merge to main -> build/scan -> ECR image digest -> dev -> staging -> production`

- Store the image digest, not mutable tags such as `latest`, in the environment deployment configuration.
- Keep Kubernetes manifests/Helm chart and environment values in a dedicated GitOps repository or a clearly separated `deploy/` area in the application repository during the earliest phase.
- A promotion is a pull request that changes the digest/version in the next environment's values file. It creates an auditable, reviewable record.
- GitHub Environments should restrict which branches/tags deploy, require reviewers for production, and scope any environment secrets. GitHub recommends environment protection rules when using environments with AWS OIDC. [GitHub OIDC guidance](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)
- Use AWS IAM roles trusted through GitHub OIDC. Do not store static AWS keys in GitHub secrets. Give each environment a distinct narrowly scoped deploy role.
- Use EKS access entries/RBAC and namespace-level permissions. The AWS EKS CodePipeline example explicitly calls for scoping cluster permissions down from the tutorial's admin example. [AWS EKS deployment tutorial](https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-eks-deploy.html)

### Configuration and Secrets

- Commit non-secret environment configuration to Git: endpoints, replica ranges, feature switches, resource requests/limits, and Helm/Kustomize values.
- Store secrets in AWS Secrets Manager or Parameter Store and expose them to workloads through a selected, audited Kubernetes secret-integration pattern. Do not put secrets in Helm values, GitHub Actions variables, images, or Kubernetes manifests.
- Keep production database schemas and data migrations backward compatible. Deploy schema expansion before code that depends on it; remove old fields only after the prior version is no longer running.
- Require readiness/liveness checks, smoke tests, CloudWatch alarms, and a documented rollback path before production.

## Tooling Options

### Option A: GitHub Actions -> ECR -> Helm/kubectl Directly to EKS

**How it works:** A GitHub Actions workflow uses OIDC to assume the environment's AWS deploy role, builds/pushes the image to ECR, then runs Helm or `kubectl` against EKS.

**Strengths**

- Lowest setup overhead when GitHub is already the source host.
- Pull-request status, releases, environment approvals, and workflow code stay next to application code.
- Strong AWS credential posture through short-lived OIDC credentials rather than stored access keys. [GitHub OIDC documentation](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)
- Easy to use for the first development environment.

**Limits**

- The CI runner has direct cluster access, which requires careful IAM/RBAC design.
- It does not inherently reconcile manual cluster drift or present a separate desired-state dashboard.
- As environments multiply, workflow logic can accumulate promotion and deployment responsibilities.

**Fit:** Good earliest implementation choice. Use it for CI in all cases; use it for direct development deployment only until GitOps is adopted.

### Option B: GitHub Actions -> ECR -> AWS-Managed Argo CD on EKS

**How it works:** GitHub Actions builds/tests/scans/pushes an image. A reviewed Git change updates the environment's image digest and Helm/Kustomize configuration. Argo CD in EKS reconciles that desired state into the target environment.

AWS documents Argo CD as a declarative GitOps CD tool that supports Git, Helm registries, and OCI sources, and describes its Git-based audit trail, rollback, and review alignment. AWS EKS Capabilities now offers a managed Argo CD capability, eliminating the need to install, maintain, and scale the Argo controllers ourselves. [AWS managed Argo CD for EKS](https://docs.aws.amazon.com/eks/latest/userguide/argocd.html)

**Strengths**

- Clear separation: CI produces artifacts; CD reconciles reviewed desired state.
- Git becomes the source of truth for each environment; drift can be surfaced/reconciled.
- Promotion/rollback is a Git change, which fits code review and auditing.
- EKS-managed Argo CD reduces controller operations.
- Strong option for multiple environments and future services.

**Limits**

- Requires GitOps repository/layout, Argo access controls, and team familiarity.
- Not necessary for a one-screen local prototype with no shared EKS environment.

**Fit:** Recommended target delivery model once shared EKS environments exist. Start the repository structure early even if direct Helm deployment is used for the first development slice.

### Option C: AWS CodePipeline + CodeBuild + ECR + EKS Deploy Action

**How it works:** CodePipeline receives source through a GitHub connection; CodeBuild runs build/test/image actions; CodePipeline's EKS deploy action uses Helm or manifests to deploy to EKS.

AWS provides a current EKS tutorial supporting GitHub source, ECR/container prerequisites, public or private EKS clusters, and Helm/manifests. The EKS action uses CodePipeline-managed CodeBuild compute and is available on V2 pipelines. [AWS CodePipeline EKS tutorial](https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-eks-deploy.html)

**Strengths**

- AWS-native IAM, CloudTrail, CloudWatch, VPC/private-network integration, and billing.
- Useful where a private EKS endpoint or AWS-only operational boundary is required.
- CodePipeline has a first-party EKS deploy action; AWS also publishes a Java/EKS reference pipeline using CodeBuild, ECR, security scanning, and Helm. [AWS reference architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/automatically-build-and-deploy-a-java-application-to-amazon-eks-using-a-ci-cd-pipeline.html)

**Limits**

- More AWS service configuration and console/IaC surface than GitHub Actions for a GitHub-centric team.
- Managed CodeBuild time has separate cost; it duplicates some GitHub workflow capabilities.
- Direct deployment has the same GitOps/drift limitations unless paired with Argo CD.

**Fit:** Best if HRF wants delivery entirely inside AWS, must reach private EKS without self-hosted GitHub runners, or later requires centralized AWS controls. It is a credible alternative, not the recommended first choice for this GitHub-based project.

### Option D: Jenkins on EKS

**How it works:** Run a Jenkins controller with persistent storage and Kubernetes-based agents. Define build/test/deploy stages in versioned `Jenkinsfile` pipelines. Jenkins can deploy with Helm/kubectl or update a GitOps repository.

Jenkins Pipeline supports versioned `Jenkinsfile` pipeline-as-code, branch/PR workflows, Docker, and shared libraries. [Jenkins Pipeline documentation](https://www.jenkins.io/doc/book/pipeline/) Jenkins documents Helm/Kubernetes deployment, controller persistence, service accounts, and dynamically scalable Kubernetes agents; production requires durable storage such as EBS. [Jenkins on Kubernetes](https://www.jenkins.io/doc/book/installing/kubernetes/)

**Strengths**

- Mature, highly extensible, and familiar in many enterprises.
- Can work with unusual build systems, legacy integrations, or air-gapped/on-premise requirements.
- Plugin ecosystem and custom shared-library patterns are extensive.

**Limits**

- HRF would own Jenkins upgrades, plugin compatibility, controller backup/recovery, agent security, and credential governance.
- Adds a stateful operational platform before the product needs one.
- Do not grant it cluster-admin permissions as shown in generic tutorials; use a narrow deploy identity.

**Fit:** Choose only if there is an existing Jenkins platform/team or a specific incompatible requirement. It is not the efficient greenfield choice here.

### Option E: Harness CD / Harness GitOps

**How it works:** Harness provides a managed CD/GitOps control plane with deployment orchestration, approvals, governance, audit, verification, and Kubernetes agents. Its GitOps model treats Git as the desired-state source and uses a GitOps agent in or connected to the target cluster. [Harness GitOps basics](https://developer.harness.io/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics/)

**Strengths**

- Strong deployment governance, approvals, audit trails, multi-cluster visibility, and progressive delivery features.
- Attractive when many applications/environments need a centralized platform and controlled releases.
- Harness can manage Argo CD fleets and GitOps promotions. [Harness GitOps overview](https://www.harness.io/products/continuous-delivery/harness-gitops)

**Limits**

- Commercial platform cost and platform learning curve.
- Duplicates much of what GitHub Environments + AWS + Argo CD can provide for a small number of services.
- Still needs careful agent/network/RBAC design.

**Fit:** Reconsider after there are multiple production services, compliance/approval demands, or a dedicated platform team. Do not lead with it for the V1 pilot.

## Popularity and Market Reality

There is no single neutral market-share measure for CI/CD. Adoption differs sharply between personal projects, existing enterprises, and Kubernetes-specific CD. Use these as directional evidence, not a procurement scorecard:

- A 2025 JetBrains CI/CD survey reported GitHub Actions as the most-used tool for personal projects (62%) and used in organizations by 41% of respondents. It explicitly attributes its easy start to GitHub integration. [JetBrains survey summary](https://blog.jetbrains.com/teamcity/2025/10/the-state-of-cicd/)
- Jenkins remains a large installed enterprise base, but it is often an existing-platform choice rather than the lowest-operations greenfield choice.
- For Kubernetes GitOps specifically, CNCF reported Argo CD as the majority-adopted GitOps solution among respondents to its 2025 Argo CD end-user survey. [CNCF announcement](https://www.cncf.io/announcements/2025/07/24/cncf-end-user-survey-finds-argo-cd-as-majority-adopted-gitops-solution-for-kubernetes/)

The pragmatic conclusion is not that one tool wins universally. It is that **GitHub Actions is the most natural CI starting point for this repository, and Argo CD is the strongest standard GitOps destination for EKS**. Jenkins and Harness are valid when organizational context warrants them.

## Suggested Initial Implementation Sequence

1. Provision non-production AWS account, ECR, EKS, observability, and IAM through Terraform.
2. Create GitHub Actions PR workflow: Java tests, lint/static analysis, container build validation, Helm lint/template validation.
3. Create protected `development`, `staging`, and `production` GitHub Environments; configure separate OIDC trust policies and deploy roles.
4. On main, build once and push digest-addressable images to ECR. Attach commit SHA and version labels.
5. Introduce Helm chart with environment values. Deploy development directly through GitHub Actions only if that accelerates the first environment.
6. Add AWS-managed Argo CD and a GitOps repository/overlay layout before staging and production promotion becomes routine.
7. Promote an unchanged image digest through reviewed pull requests; require production approval, smoke tests, alarms, and a rollback exercise.
8. Add SAST/dependency/image scanning, SBOM/provenance, policy checks, backup/restore validation, and progressive deployment only when the pilot needs them.

## Open Decisions Before Implementation

- One repository or separate application and GitOps configuration repositories?
- One non-production cluster with namespaces or distinct development/staging clusters?
- Which rollback signal is authoritative: Kubernetes readiness only, application health endpoint, smoke tests, or monitored error/latency thresholds?
- How will database migration approval and rollback be handled?
- Which secrets integration will be used with AWS Secrets Manager?
- What data and operational changes require a change-management approval beyond GitHub production approval?


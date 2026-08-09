# OpenSpec Adoption Decision And Initial Structure

Date: 2026-08-08

Status: Adopted for the proof-of-concept specification workflow; project-specific setup details are intentionally deferred.

Related documents:

- `../../PROJECT_SUMMARY.md`
- `../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md`
- `phase-01-mobile-foundation-react-native-expo-typescript.md`
- `phase-02-offline-first-sqlite-sync-architecture.md`
- `phase-03-thin-backend-sync-slice-spring-boot-modular-monolith.md`

## Question

Should this project adopt OpenSpec for specification-driven development, and how should OpenSpec fit with the separate reusable SDLC skills being developed for code standards, testing, code quality, guardrails, and code review?

## High-Level Summary

Adopt OpenSpec as the lightweight product-specification and change-planning layer for this project.

OpenSpec will help the developer and AI coding assistants agree on what a change should accomplish before implementation begins. It will provide a consistent home for current system behavior, proposed changes, acceptance scenarios, technical designs, and implementation tasks.

OpenSpec will not attempt to own the entire software development lifecycle. A separate set of reusable SDLC skills will complement it by defining and enforcing how code is implemented and evaluated.

The intended division is:

| Concern | Primary Owner |
|---|---|
| Product behavior and requirements | OpenSpec specifications |
| Scope, motivation, and non-goals of a change | OpenSpec proposal |
| Change-specific technical design | OpenSpec design |
| Change-specific implementation steps | OpenSpec tasks |
| Durable architectural decisions | Architecture Decision Records |
| Project-wide engineering constraints | Project guardrails |
| Code standards and clean-code practices | Reusable SDLC skills |
| Testing standards and test quality | Reusable SDLC skills |
| Code-quality checks | Reusable SDLC skills and CI |
| Code-review procedure | Reusable SDLC skills and pull requests |
| Security and dependency review | Reusable SDLC skills and CI |
| Final product and architecture judgment | Human developer |

This separation keeps OpenSpec focused. It describes the intended behavior and the planned change, while the SDLC skills govern the quality of the resulting implementation.

## Decision

Use OpenSpec's current OPSX spec-driven artifact flow as the initial specification framework:

```text
proposal -> specs -> design -> tasks -> implement
```

Start with the standard OpenSpec schema instead of creating a custom schema immediately.

The default OpenSpec command profile uses the quick path around `explore`, `propose`, `apply`, `sync`, and `archive`. OpenSpec also offers `/opsx:verify` in its expanded profile, but enabling that profile is a later setup decision. Verification against the specification is required either way and will initially be governed by the reusable SDLC workflow.

Keep each artifact proportional to the change. A one-screen mobile prototype should have short artifacts. Offline synchronization, financial validation, authentication, or database migration changes should receive more design and test detail because their risk is higher.

Revisit schema customization only after completing several changes and identifying repeated, measurable friction in the default workflow.

## Why OpenSpec Fits This Project

### Lightweight Agreement Before Coding

The project will use AI-assisted implementation. A short, reviewable agreement about behavior is more reliable than asking an AI assistant to infer requirements from conversation history.

OpenSpec captures that agreement in repository files that both the developer and different AI assistants can read.

### Current Truth Is Separate From Proposed Work

OpenSpec distinguishes between:

- `openspec/specs/`: behavior that is currently accepted as true;
- `openspec/changes/`: behavior being proposed or implemented.

This is valuable as the prototype evolves. Completed changes are archived and their specification deltas are folded into the current specifications. The active specifications can therefore remain useful without preserving every old implementation plan as if it were still current.

### Changes Are Small, Reviewable Packages

Each change collects its proposal, specification changes, design, and tasks in one directory. This creates a practical review point before coding and gives later AI sessions durable context.

### Cross-Assistant Use

OpenSpec integrates with multiple AI coding tools and also exposes structured command output for agents and scripts. The Markdown artifacts remain useful even when a particular assistant integration is unavailable.

### Flexible Depth

OpenSpec's artifact order provides structure, but the artifacts can be revised as implementation reveals new information. The amount of detail can scale with risk rather than being exhaustive for every change.

## 101 Background

### What Is Specification-Driven Development?

Specification-driven development means agreeing on observable behavior and constraints before treating implementation as complete.

For this project, a specification should answer questions such as:

- What can the user do?
- What should happen when the device is offline?
- What behavior is deliberately out of scope?
- What results are required for the change to be accepted?
- Which failure cases must be handled?

The specification describes the intended behavior. It should avoid prescribing internal implementation details unless those details are actual project constraints.

### What Is OpenSpec?

OpenSpec is a lightweight specification layer designed for collaboration between people and AI coding assistants.

Its core model has two durable areas:

```text
openspec/
|-- specs/       # The accepted behavior of the system today
`-- changes/     # Proposed or active changes
```

A change normally contains four planning artifacts:

```text
proposal -> specs -> design -> tasks
   why       what      how      steps
```

After implementation and verification, archiving merges the change's specification deltas into the main specifications and preserves the completed change in an archive.

### What Is A Specification Delta?

A delta describes only what a change adds, modifies, or removes. It does not rewrite the complete system specification for every feature.

For example, the first transaction-entry change may add the requirement that a user can select either a sale or an expense. A later offline-storage change can modify the behavior by requiring the saved transaction to survive an app restart and receive a queued synchronization status.

### What Is A Scenario?

A scenario is a concrete example of required behavior, often written with Given/When/Then language:

```gherkin
Given the user has selected Expense
And entered a valid positive amount
When the user saves the transaction
Then the app confirms that the transaction was saved
```

Scenarios make requirements testable and give AI implementers less room to invent behavior.

## Foundational Concepts

### Specification

A specification is the current behavioral contract for one capability, such as transaction entry, offline storage, or mobile synchronization.

### Change

A change is one reviewable unit of proposed work. It should be small enough to understand, implement, test, and review without losing its purpose.

### Proposal

The proposal explains why the change is needed, its intended outcome, its scope, and its relationship to existing capabilities.

### Design

The design explains consequential implementation choices for the change. Small designs should remain short. Higher-risk changes should cover data flow, module boundaries, failure behavior, security implications, migration concerns, and important alternatives.

### Tasks

Tasks convert the approved proposal, specification, and design into an ordered implementation checklist. Tasks are not a substitute for acceptance criteria.

### Archive

Archiving closes a completed change, merges its specification deltas into the current specifications, and preserves the historical change package.

### Project Context

OpenSpec supports shared project context through `openspec/config.yaml`. This context should summarize stable information that every change needs, while linking to larger source documents instead of copying them into the configuration.

### Project Guardrails

Project guardrails are stable, non-negotiable engineering and product constraints. Examples for this project include:

- AI output is a proposal and cannot directly finalize financial records.
- Offline operation is a core requirement, not optional polish.
- The backend begins as a modular monolith.
- Sensitive writes require deterministic validation and auditability.
- Mobile UI uses plain language instead of accounting terminology.

The final location and exact content of these guardrails will be decided during OpenSpec setup. They may be summarized in `openspec/config.yaml` and maintained in a separate durable project document.

## Baeldung-Style Technology Introduction

### The Smallest Useful Workflow

Once OpenSpec is installed and initialized, a normal change follows this shape:

1. Explore an uncertain idea with `/opsx:explore` when research or clarification is needed.
2. Create a named change with `/opsx:propose`.
3. Review and correct the generated proposal, specifications, design, and tasks.
4. Approve the artifacts before implementation begins.
5. Implement the tasks with `/opsx:apply` or through a supervised coding workflow.
6. Run implementation tests and SDLC quality checks.
7. Validate the OpenSpec artifacts and use the SDLC workflow to compare the implementation against the approved requirements and scenarios.
8. If the expanded OpenSpec profile is enabled later, `/opsx:verify` may provide an additional specification-aware verification pass.
9. Archive the completed change with `/opsx:archive`.

The commands help generate and maintain artifacts. They do not remove the need for human review.

### Illustrative Project Structure

The exact generated structure will be confirmed during setup, but the intended shape is:

```text
mobie-bookkeeping/
|-- openspec/
|   |-- config.yaml
|   |-- specs/
|   |   |-- transaction-entry/
|   |   |   `-- spec.md
|   |   `-- mobile-sync/
|   |       `-- spec.md
|   `-- changes/
|       |-- one-screen-transaction-entry/
|       |   |-- proposal.md
|       |   |-- specs/
|       |   |   `-- transaction-entry/
|       |   |       `-- spec.md
|       |   |-- design.md
|       |   `-- tasks.md
|       `-- archive/
|-- docs/
|   |-- project-guardrails.md
|   `-- architecture/
|       `-- decisions/
|-- mobile/
|-- backend/
`-- staff-web/
```

The application source-directory names shown here are illustrative. The proof-of-concept repository layout has not yet been decided.

### Example Requirement And Scenario

```markdown
## ADDED Requirements

### Requirement: Select transaction type

The mobile application SHALL allow the user to identify a transaction as a sale or an expense before saving it.

#### Scenario: Record an expense

- **GIVEN** the transaction-entry screen is open
- **WHEN** the user selects Expense, enters a valid amount, and saves
- **THEN** the saved transaction is identified as an expense
```

This requirement states observable behavior. The implementation can change without rewriting the requirement as long as the behavior remains true.

## Initial Operating Structure

### OpenSpec Responsibilities

OpenSpec will initially own:

- current capability specifications;
- proposed behavioral changes;
- scope and non-goals;
- acceptance scenarios;
- change-specific technical design;
- implementation task breakdown;
- specification inputs and scenarios used during implementation verification;
- completed-change history.

### Reusable SDLC Skill Responsibilities

The base SDLC skills being developed alongside this application will initially own:

- language and framework coding standards;
- clean-code and maintainability checks;
- testing strategy and test-quality review;
- static analysis, formatting, linting, and type checking;
- dependency and security review;
- code-review checklists and severity rules;
- diff-based regression review;
- pull-request readiness;
- confirmation that required validation commands were actually run;
- evidence-based reporting of failures, limitations, and residual risks.

The SDLC skills should consume the relevant OpenSpec artifacts during implementation and review. For example, a code-review skill should read the active change's requirements and scenarios before deciding whether the implementation is correct.

### Human Developer Responsibilities

The human developer remains responsible for:

- approving scope and product behavior;
- deciding material architecture tradeoffs;
- judging whether generated specifications are complete enough;
- reviewing sensitive financial, security, privacy, and nonprofit decisions;
- approving significant dependency or cost commitments;
- deciding when a change is accepted and ready to archive.

### CI And Repository Responsibilities

CI and repository rules should eventually enforce objective checks such as:

- formatting and linting;
- type checking and compilation;
- unit and integration tests;
- dependency and security scans;
- required pull-request review;
- protected main branch;
- required status checks before merge.

OpenSpec documents intent. SDLC skills guide the work. CI and repository rules provide repeatable enforcement.

## Lightweight Usage Rules

To keep OpenSpec from becoming burdensome:

1. Prefer one small change for one independently testable vertical slice.
2. Keep proposals focused on outcome, scope, and non-goals.
3. Write requirements around observable behavior.
4. Include scenarios for primary behavior and meaningful failure or offline behavior.
5. Keep design documents concise for low-risk changes.
6. Increase design and test depth with financial, security, data-loss, synchronization, or migration risk.
7. Do not duplicate project-wide coding standards in every change.
8. Do not treat generated artifacts as approved until the developer reviews them.
9. Update artifacts when implementation reveals a legitimate requirement or design change.
10. Archive only after behavior is verified and the required SDLC checks pass.

## Alternatives Considered

### Hand-Built Lightweight Markdown Workflow

This would use a project guardrails document, one compact feature specification, optional design notes, tasks, and ADRs without installing a framework.

It has the lowest tooling overhead, but the project would need to invent and maintain its own artifact lifecycle, validation behavior, assistant instructions, and method for keeping current specifications separate from historical plans.

OpenSpec provides enough of this structure to justify its modest additional terminology and tooling.

### GitHub Spec Kit

Spec Kit provides a broader `constitution -> specify -> plan -> tasks -> implement` process, quality checklists, and cross-artifact analysis.

It is a credible alternative, but its complete default process is more extensive than this prototype currently needs. OpenSpec better matches the preference for a lightweight, flexible agreement layer that can be complemented by separate SDLC skills.

### Tool-Specific Specification Features

Some AI development environments provide their own specification workflow. Depending on one environment would make the project's planning process less portable across assistants.

OpenSpec's repository-based Markdown artifacts provide a more neutral source of truth.

## Tradeoffs And Risks

### Additional Concepts

The developer must learn OpenSpec's distinction between current specs, active changes, delta specs, designs, tasks, and archives.

Mitigation: learn only the default workflow initially and avoid custom schemas.

### Generated Documentation Can Become Verbose

AI assistants may produce more text than a small change requires.

Mitigation: explicitly require concise artifacts whose depth is proportional to risk.

### Framework Evolution

OpenSpec and OPSX are evolving. Commands, templates, or recommended practices may change.

Mitigation: keep the meaningful product requirements in version-controlled Markdown, pin the installed OpenSpec version when implementation begins, and review upgrades deliberately.

### False Confidence

A complete-looking specification does not prove that the design is sound or the implementation is correct.

Mitigation: combine OpenSpec with human approval, reusable SDLC skills, automated tests, CI checks, and independent code review.

### Overlapping Instructions

OpenSpec context, project guardrails, assistant instructions, and SDLC skills could provide conflicting guidance.

Mitigation: define clear ownership, keep stable rules in one canonical location, link rather than duplicate, and resolve instruction conflicts before implementation.

## Proof-Of-Concept Impact

Before writing the first mobile implementation spec, this project should eventually:

1. Confirm the repository or workspace boundary where OpenSpec will be initialized.
2. Install and pin an OpenSpec version.
3. Initialize OpenSpec using the default spec-driven schema.
4. Create concise shared project context.
5. Define the project guardrails and their canonical location.
6. Define how the reusable SDLC skills discover the active OpenSpec change.
7. Decide the approval and verification checkpoints.
8. Translate the existing prototype sequence into appropriately sized OpenSpec changes.
9. Create the first change for one-screen mobile transaction entry.

These steps are not being executed as part of this decision note.

## Deferred Expansion: Mobile Proof-Of-Concept Plan

A later task will expand this document with the project-specific OpenSpec plan for the mobile proof of concept.

That expansion should define:

- the exact OpenSpec version and installation method;
- the initialized directory structure produced by that version;
- the initial `openspec/config.yaml` context and rules;
- the project guardrails document and canonical ownership of each rule;
- capability names for mobile entry, offline storage, synchronization, receipt capture, speech proposals, and staff review;
- the mapping from the implementation plan's prototype slices to OpenSpec changes;
- the first change name and artifact contents;
- acceptance-criteria conventions;
- test-plan and evidence conventions;
- when an ADR is required;
- how SDLC skills locate and consume OpenSpec artifacts;
- human approval checkpoints before apply and archive;
- verification, pull-request, CI, and archive procedures;
- rules for keeping generated artifacts concise;
- version-pinning and OpenSpec upgrade policy.

## Recommendation

Proceed with OpenSpec, using the standard spec-driven workflow and minimal customization.

Treat OpenSpec as the product agreement and change-planning layer. Treat the reusable SDLC skills as the implementation-quality and review layer. Connect them through shared repository artifacts rather than duplicating standards inside every OpenSpec change.

Do not initialize OpenSpec or create the first application change until the later proof-of-concept planning task resolves the deferred setup decisions above.

## Sources

- [OpenSpec documentation](https://openspec.dev/docs)
- [OpenSpec core concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md)
- [OpenSpec OPSX workflow](https://openspec.dev/docs/opsx)
- [OpenSpec CLI reference](https://openspec.dev/docs/reference/cli)
- [OpenSpec GitHub repository](https://github.com/Fission-AI/OpenSpec)
- [GitHub Spec Kit documentation](https://github.github.io/spec-kit/)

## Learn More

Start with:

1. OpenSpec's [Core Concepts at a Glance](https://openspec.dev/docs/overview) for specs, changes, deltas, and archives.
2. OpenSpec's [Getting Started](https://openspec.dev/docs/getting-started) guide for installation and the first complete change.
3. OpenSpec's [Writing Good Specs](https://openspec.dev/docs/writing-specs) guide before authoring project requirements.
4. OpenSpec's [Reviewing a Change](https://openspec.dev/docs/reviewing-changes) guide before approving AI-generated artifacts.
5. OpenSpec's [OPSX Workflow](https://openspec.dev/docs/opsx) reference when the default commands or artifact order need clarification.

Useful search terms:

- `OpenSpec current specs versus delta specs`
- `OpenSpec OPSX propose apply verify archive`
- `OpenSpec config.yaml shared context rules`
- `specification by example Given When Then`
- `architecture decision records lightweight template`
- `AI assisted development specification guardrails`

# Specification-Driven Development Workflow

## Purpose And Status

This document defines the local Specification-Driven Development (SDD) policy for the Invest in Growth planning repository. It supplements the generated OpenSpec lifecycle integrations with repository-owned product context, approvals, validation, and recovery rules.

OpenSpec 1.8.0 was used for the initial bootstrap on 2026-08-13. Upgrades must be deliberate: review generated changes, rerun this validation contract, and record any workflow or schema impact. See [`AGENTS.md`](../AGENTS.md) before starting lifecycle work and [`sdd-bootstrap-evidence.md`](sdd-bootstrap-evidence.md) for activation evidence.

## Approved Bootstrap Decisions

- **Product identity:** Invest in Growth technology planning supporting Home Roots Foundation's Reinvest-to-Grow methodology and the prospective Enterprise Growth Platform.
- **Repository ownership:** this repository is the central planning, architecture, and cross-repository specification boundary. Application and infrastructure implementations belong in component repositories.
- **Assistants:** Claude and Codex.
- **Lifecycle:** Explore, Propose, Apply, Verify, Sync, and Archive.
- **Delivery profile:** interactive by default. A separately authorized, bounded autonomous run may operate only within its recorded target, mutations, evidence gates, and stopping condition.
- **GitHub and delivery integration:** deferred. This bootstrap does not authorize or configure Issues, Projects, pull requests, CI, repository settings, cloud resources, or an OpenSpec Store.
- **Global reusable skills:** no user-level installations are required by this bootstrap. Installed capabilities apply only by their documented triggers.
- **Stopping condition:** generated integrations and project-owned governance exist, inventories match the selected lifecycle, baseline validation is recorded accurately, and any session-discovery step is explicit.

## Prerequisites And Ownership

Git, Node.js, OpenSpec, Claude, and Codex are installed separately from repository policy. OpenSpec's user-level workflow selection is currently:

```json
["explore","propose","apply","verify","sync","archive"]
```

Do not change user-level workflow configuration, install global skills, authenticate services, or create external resources without just-in-time approval.

| Path | Owner and purpose |
| --- | --- |
| `openspec/config.yaml` | Project-owned OpenSpec context, artifact rules, and operation guidance. |
| `openspec/specs/` | OpenSpec-owned location for accepted living behavior. |
| `openspec/changes/` | OpenSpec-owned location for proposed and active change packages. |
| `.agents/skills/openspec-*` | Generated Codex lifecycle skills; regenerate, do not hand-edit. |
| `.claude/skills/openspec-*` | Generated Claude lifecycle skills; regenerate, do not hand-edit. |
| `.claude/commands/opsx/` | Generated Claude lifecycle commands; regenerate, do not hand-edit. |
| `AGENTS.md` | Repository-owned agent policy and safety boundary. |
| `docs/sdd-workflow.md` | Repository-owned lifecycle, validation, evidence, and recovery contract. |
| `ai-planning/research/` | Research and feasibility evidence. |
| `ai-planning/design-briefs/` | Accepted or reviewable design context; status must be read from each document. |
| `ai-planning/ai-planning/implementation-plans/` | Existing delivery planning; plans are not implementation authorization. |

This repository is a local OpenSpec root. A future nonprofit-owned canonical product Store and component references remain separate, explicitly approved work because Store support is beta and final external ownership is not configured here.

## Lifecycle Contract

### Explore

Use Explore for uncertainty, tradeoffs, research needs, and boundary clarification. Exploration does not change accepted product behavior. Label facts, inferences, hypotheses, and open decisions distinctly. External reads must follow applicable source and privacy rules; external writes still require approval.

### Propose

Use Propose for one small, independently reviewable outcome. The change package must define why the change matters, affected repositories, scope and non-goals, observable requirements and scenarios, consequential design decisions, ordered tasks, validation, and recovery needs.

Propose is planning only. Generated artifacts are drafts until the human developer accepts their product scope, behavior, architecture decisions, external ownership implications, cost exposure, privacy implications, and validation contract.

### Apply

Apply begins only after explicit human approval of the relevant proposal, specifications, design, tasks, repository target, mutation boundary, and validation commands. Work in dependency-valid batches, preserve unrelated changes, and update artifacts if implementation reveals a legitimate approved change. Do not silently broaden scope to make an implementation easier.

Cross-repository work requires a separate local change, branch, tests, review, pull request, and archive lifecycle in every affected component repository. This planning root coordinates the product contract; it does not route one task list across repositories.

### Verify

Verification must map every approved requirement and scenario to authoritative evidence at the same scope. Review task completion, tests, static checks, security and privacy constraints, documentation, recovery behavior, component linkage, and residual gaps. A green narrow test cannot prove a broader cross-component requirement.

This repository has no executable application or application test suite. Product implementation evidence must come from the affected component repositories and, for system behavior, end-to-end acceptance evidence coordinated here.

### Sync

Sync promotes verified, accepted change deltas into living specifications. Resolve discrepancies between implementation evidence and proposed behavior before Sync. Do not promote unapproved hypotheses, deferred roadmap items, or component-local details into product truth.

### Archive

Archive only after Verify and required Sync work are complete, all required validation evidence is current, external/component linkages are durable, and the human developer explicitly approves closure. Archive history must preserve the rationale, requirements, design, tasks, evidence references, and known residual risks.

## Approval And Data Policy

Local, reversible planning edits within an explicitly approved change are the normal mutation class. Require confirmation before:

- external writes or state changes, including GitHub lifecycle actions;
- global or user-level configuration and skill changes;
- authentication, credentials, secrets, or recovery material;
- destructive or difficult-to-recover operations;
- cloud provisioning, deployment, paid services, or purchases;
- use of real participant, enterprise, operational, financial, personal, or sensitive data;
- security exceptions, nonprofit ownership decisions, or material architecture choices; and
- changes to other repositories or material expansion beyond the accepted scope.

Only synthetic data may be used in prototypes or examples. Never commit credentials, tokens, OAuth material, payment details, recovery codes, participant records, production financial data, or mutable approval grants.

## Validation Contract

Run these commands from the repository root for bootstrap and planning/specification delivery:

```bash
openspec --version
openspec context --json
openspec config get workflows
openspec list --json
openspec validate --all --strict --no-interactive
git diff --check
git status --short
```

Interpret them precisely:

- `context` must resolve this repository as the nearest OpenSpec root with no error status.
- the workflow list must exactly match the approved six actions.
- `list` must return the actual active changes; an empty list is expected immediately after bootstrap.
- strict validation checks OpenSpec artifacts and is unrelated to independent AI review. `No items found to validate` is an expected empty state, not a passing specification suite.
- `git diff --check` must report no whitespace or patch errors.
- `git status --short` records the exact delivery scope; it does not need to be clean while approved work is awaiting commit.

No application validation command exists in this planning-only repository. Each component change must add its repository's deterministic build, formatting, lint, type-check, unit, integration, security, migration, and acceptance commands to its own OpenSpec tasks and evidence.

Evidence must name the command, timestamp or delivery run, exit/result, artifacts and requirements covered, skipped checks, failures, corrections, reviewer gates when required by the selected delivery profile, and residual gaps. Task completion without behavioral evidence is insufficient.

## Trigger-Based Reusable Skills

Generated `openspec-*` actions are lifecycle entry points. Reusable global skills remain separate capabilities and are never universal policy merely because they are installed.

| Need | Skill when installed and its trigger applies |
| --- | --- |
| Focused research before a decision | `research-topic-workflow` |
| Accepted research into a design record | `design-brief-from-research` |
| Accepted requirements into delivery options | `sdd-requirements-to-plan` |
| Bounded local code review | `base-code-review` |
| Local implementation evidence | `base-verification-loop` |
| Production-rapid isolated review gate | `independent-review` |

If a required triggered skill is unavailable, record it as a gap and do not substitute an unreviewed local copy. Production-rapid delivery may not degrade or bypass its independent-review gate; interactive delivery does not invoke that gate unless separately required.

## Recovery

- **Partial initialization:** keep valid generated files, record the failed assistant, path, and error, correct only the environment issue, and rerun the same `openspec init --tools claude,codex --profile custom --no-animation` command.
- **Generated-content drift:** do not hand-edit generated lifecycle files. Confirm the workflow selection, regenerate, inspect the diff, and rerun validation.
- **Incomplete policy:** keep valid integrations but pause lifecycle actions that depend on the unresolved decision.
- **Dirty worktree:** inspect status and diffs, preserve unrelated user work, and avoid destructive cleanup.
- **Validation failure:** make up to three materially different, behavior-preserving corrections for the same failure signature; then stop with exact evidence if unresolved.
- **Unavailable skill or tool:** report the missing capability and affected gate. Do not fabricate success or replace it with an unreviewed copy.
- **External or cross-repository dependency:** preserve local evidence and pause before external mutation until ownership and authorization are explicit.

After initialization or regeneration, start a new Claude or Codex session in the repository before relying on newly generated commands or skills. Confirm that Claude exposes `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:verify`, `/opsx:sync`, and `/opsx:archive`, and that Codex exposes the corresponding `$openspec-*` skills.

# Agent Guidance

## Required Reading

Before any OpenSpec lifecycle work, read these sources in order:

1. `AGENTS.md`.
2. `docs/sdd-workflow.md`.
3. `README.md` for the current product and repository boundary.
4. The relevant accepted specifications under `openspec/specs/`, active change under `openspec/changes/`, and source material under `ai-planning/`.

Resolve conflicts in favor of the narrower, more recent, explicitly approved project decision. Stop and ask when a material product, ownership, validation, or safety conflict remains.

## Repository Boundary

This public repository is the central planning, architecture, and cross-repository specification workspace for the Invest in Growth technology initiative supporting Home Roots Foundation's Reinvest-to-Grow methodology. It owns product-wide planning context, research, design briefs, cross-component specifications, and coordination evidence.

It does not own mobile, backend, staff-web, worker, or infrastructure implementation code. It is not authorization to create repositories, accounts, cloud resources, deployments, vendor integrations, or production data systems. Component repositories own their source code, tests, builds, deployment definitions, and repository-local OpenSpec implementation changes.

## OpenSpec Lifecycle

Use the generated OpenSpec lifecycle entry point for Explore, Propose, Apply, Verify, Sync, and Archive. Every lifecycle action must also follow `docs/sdd-workflow.md`.

- Explore may investigate and clarify without changing product truth.
- Propose creates reviewable artifacts; a proposal is not authorization to implement it.
- Apply requires explicit human approval of the applicable proposal, requirements, design, tasks, repository scope, and validation plan.
- Verify must compare evidence with every approved requirement, scenario, task, and quality constraint.
- Sync may promote verified, accepted behavior into living specifications; it must not make unapproved product decisions.
- Archive requires completed verification evidence and explicit human approval.

Do not manually edit generated OpenSpec integration content under `.agents/skills/openspec-*`, `.claude/skills/openspec-*`, or `.claude/commands/opsx/`. Regenerate it with OpenSpec when the approved workflow changes. Project-owned context in `openspec/config.yaml` is maintained locally.

## Approval And Safety Boundaries

Require just-in-time confirmation before:

- any external write, including GitHub Issues, Projects, pull requests, repository settings, or vendor resources;
- user-level or global configuration changes, skill installation, authentication, or credential work;
- destructive or difficult-to-recover changes;
- deployment, cloud provisioning, paid services, purchases, or cost commitments;
- using real participant, enterprise, financial, operational, personal, or otherwise sensitive data; or
- expanding work into another repository or materially beyond the approved change.

Never commit credentials, tokens, OAuth material, payment details, recovery codes, secrets, or personal data. Prototype and example data must be synthetic. AI output is a proposal and may not finalize financial records, approve financing, or manufacture impact claims.

Interactive delivery is the default. A bounded autonomous run requires explicit authorization, an exact target and mutation boundary, deterministic work selection, validation evidence, and a stopping condition. Global skill installation is capability availability, not standing authorization.

## Validation And Evidence

For planning and specification changes in this repository, run the validation contract documented in `docs/sdd-workflow.md`, including:

```bash
openspec context --json
openspec config get workflows
openspec list --json
openspec validate --all --strict --no-interactive
git diff --check
git status --short
```

This repository currently has no application build or test suite. Affected component repositories must supply and pass their own compilation, lint, type-check, unit, integration, security, and acceptance checks before cross-repository behavior can be verified here.

Report the command, outcome, artifact or requirement covered, failures, skipped checks, and residual gaps. Never describe an expected empty OpenSpec validation result as a passing specification suite.

## Working Tree And Skills

Preserve unrelated user changes. Inspect the worktree before editing, never use destructive cleanup to make it appear clean, and do not overwrite user-authored policy. Preserve generated OpenSpec files and update them only through the generator.

Use installed reusable skills only when their documented trigger applies. In particular, production-rapid delivery requires `independent-review`; ordinary interactive work does not. If a referenced skill is unavailable, report that gap instead of copying or inventing an unreviewed replacement.

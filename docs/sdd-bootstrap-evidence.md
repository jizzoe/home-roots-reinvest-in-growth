# SDD Bootstrap Evidence

Date: 2026-08-13

Target: `home-roots-reinvest-in-growth`

Runbook: `/Users/joerice/git/joericearchitect/joericearchitect-ai-skills/docs/sdd-project-bootstrap.md`

## Approved Scope

The project owner approved the bootstrap decision record before repository initialization:

- use this repository as the planning, architecture, and cross-repository specification root;
- generate Claude and Codex integrations;
- use Explore, Propose, Apply, Verify, Sync, and Archive;
- keep delivery interactive by default, with explicit approval before Apply and Archive;
- make only local repository changes;
- defer GitHub, OpenSpec Store, global skill installation, authentication, external resources, and user-level configuration changes; and
- validate the documentation-only repository with OpenSpec and Git checks rather than inventing application tests.

The worktree was clean and `openspec context --json` reported `no_openspec_root` before initialization.

## Initialization And Recovery

Installed OpenSpec version:

```text
1.8.0
```

The pre-existing user-level workflow selection already matched the approved lifecycle:

```json
["explore","propose","apply","verify","sync","archive"]
```

No user-level configuration change was made.

Initialization command:

```bash
openspec init --tools claude,codex --profile custom --no-animation
```

The first run created the OpenSpec root and Claude integration but could not create `.agents/` because that path had a workspace-specific write restriction. Valid generated output was preserved. After narrowly scoped permission to create the approved Codex integration was granted, the same command was rerun. It refreshed Claude and completed Codex generation successfully.

Generated inventory:

- six Codex skills under `.agents/skills/openspec-*`;
- six Claude skills under `.claude/skills/openspec-*`;
- six Claude commands under `.claude/commands/opsx/`; and
- `openspec/config.yaml` using the `spec-driven` schema.

Codex intentionally receives skills rather than a separate generated commands directory. `.agents/skills/.openspec-target` contains `codex`.

Generated lifecycle files were not edited manually. Project-specific context was added only to the intended project-owned `openspec/config.yaml` surface.

## Project-Owned Governance

The bootstrap added:

- `AGENTS.md` for repository purpose, reading order, lifecycle requirements, approval and data boundaries, validation, evidence, and generated-file preservation;
- `openspec/config.yaml` for concise product context, repository ownership, canonical paths, artifact rules, and Apply/Archive guidance;
- `docs/sdd-workflow.md` for lifecycle authorization, generated ownership, canonical locations, reusable-skill triggers, validation, evidence, and recovery; and
- this evidence record.

Optional `config/ai-skills.json` and `config/sdd-github.json` were not created because no stable local defaults or approved GitHub lifecycle integration were selected. No global skills were installed; none are required for bootstrap completion.

## Validation Results

The following checks were run from the repository root after initialization and governance seeding.

### OpenSpec root and context

```bash
openspec context --json
```

Result: the nearest root resolved to this repository, its role was `openspec_root`, and `status` was empty.

### Workflow selection

```bash
openspec config get workflows
```

Result:

```json
["explore","propose","apply","verify","sync","archive"]
```

### Active changes

```bash
openspec list --json
```

Result: `changes` was empty and the root resolved to this repository. This is the expected newly initialized state.

### Strict OpenSpec validation

```bash
openspec validate --all --strict --no-interactive
```

Result:

```text
No items found to validate.
```

This is an accurately recorded empty state, not a claim that a specification suite passed. Strict validation concerns OpenSpec artifact structure; it is unrelated to the independent-review delivery gate.

### Git whitespace and scope checks

```bash
git diff --check
git status --short
```

`git diff --check` produced no output. Because all bootstrap artifacts were new and untracked, a supplemental equivalent check ran `git diff --no-index --check /dev/null <file>` for every file under `.agents/`, `.claude/`, `openspec/`, and `docs/`, plus `AGENTS.md`. It reported:

```text
No whitespace errors in untracked bootstrap files.
```

`git status --short` reported only the intended untracked bootstrap paths:

```text
?? .agents/
?? .claude/
?? AGENTS.md
?? docs/
?? openspec/
```

### Content review

- Generated inventories contain exactly the six approved lifecycle actions for both assistants.
- A temporary OpenSpec root using this project's `config.yaml` produced proposal instructions containing the configured product context and all three proposal rules, proving that OpenSpec consumes rather than merely parses the project context.
- No unresolved `TODO`, `TBD`, `FIXME`, template boundary, or replacement markers were found in project-owned governance.
- No common committed-secret signatures were found in generated or project-owned bootstrap files.
- Canonical planning paths named by the policy exist in the repository.
- No pre-existing user-authored file was overwritten and no unrelated worktree change was present.
- No application build or tests exist in this planning-only repository, so no application test result is claimed.

## Activation And Expected Gaps

The generated integration files and target marker prove that both assistant inventories were installed. Newly generated commands and skills are loaded at assistant-session startup, so the operator must start a new session in this repository before first use and confirm one known action is exposed—for example, Claude `/opsx:explore` or Codex `$openspec-explore`.

The first real proposal will create the initial OpenSpec item that can receive meaningful strict validation. Component implementations must provide their own build, lint, type-check, test, security, and acceptance evidence; this planning repository cannot substitute for those checks.

GitHub linkage, a nonprofit-owned canonical OpenSpec Store, component references, external repository creation, CI, and global skill installation remain explicitly deferred rather than partially configured.

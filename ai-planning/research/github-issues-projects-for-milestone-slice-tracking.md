# GitHub Issues and Projects for Milestone/Slice Tracking

Status: Research  
Scope: How GitHub Issues and Projects could track the milestone → slice → task model, and what the SDD lifecycle and skills would need to gain  
Companions: [Cross-Repository SDD Flow](../../docs/cross-repository-sdd-flow.md) · [SDD Workflow](../../docs/sdd-workflow.md) · [Cross-Repository Architecture spec](../../openspec/specs/cross-repository-architecture/spec.md)

## Purpose

Establish what GitHub actually provides, propose a mapping from the SDD delivery model onto those primitives, and identify what the lifecycle and the reusable skills would need to change.

This is research. GitHub and delivery integration is currently **deferred** by [`docs/sdd-workflow.md`](../../docs/sdd-workflow.md), which records that the bootstrap "does not authorize or configure Issues, Projects, pull requests, CI, repository settings, cloud resources, or an OpenSpec Store." Nothing here creates, configures, or authorizes any of that.

## What GitHub Provides

### Issues and sub-issues

Sub-issues are the load-bearing primitive for this model, and their limits are generous enough:

- **Up to 100 sub-issues per parent**, and **up to eight levels of nesting**.
- **Sub-issues can live in a different repository from their parent.** When adding an existing issue, the repository can be changed.
- Sub-issue progress surfaces in Projects, where views can filter and group by parent issue.

The cross-repository capability matters more than anything else here: it means a slice issue in the planning repository can own component-change issues that physically live in the mobile, backend, and infrastructure repositories, while still rolling up as one tree.

### Milestones

Native GitHub milestones have historically been **repository-scoped** — a milestone named `M1.2` in one repository has no relationship to one of the same name in another.

**Cross-repository milestones now appear to have shipped, but the evidence is contradictory.** The [roadmap issue](https://github.com/github/roadmap/issues/1086) is labelled GA ("Feature phase: Generally available") and lists availability for Free/Team/Enterprise and GHES 3.20/3.23 — while simultaneously remaining open with a roadmap status of "Exploring." Community sources disagree with each other on the same point.

Treat this as **unresolved**. Verify directly in the target account before designing around it, and prefer a design that does not depend on it.

### Projects

- **Layouts:** table, board, and roadmap. **Hierarchy view became generally available in March 2026** and is enabled by default for new views — expand and collapse sub-issues up to eight levels, with grouping, slicing, sorting, and filtering that preserve the hierarchy.
- **Custom fields:** date, number, single-select, text, and iteration (week-by-week with break support). **Maximum 50 fields per project**, built-in and custom combined.
- **Insights:** configurable charts sourced from project items, with filtering.
- **Automation:** built-in workflows that set fields when items are added or change, plus the GraphQL API and GitHub Actions for anything more sophisticated.
- Projects live at user or organization level and are linked to repositories and teams for access.

Hierarchy view plus cross-repository sub-issues is precisely the birds-eye-and-detail combination this question is asking for. That combination is new — it would not have been a reasonable design a year ago.

### GitHub's own guidance

The official best-practices page recommends breaking large issues into smaller ones so work can proceed in parallel, using custom fields rather than relying on built-in metadata alone, using milestones **or labels** to show how smaller issues fit a larger goal, automating status updates, and — most relevant here — maintaining **a single source of truth**, tracking a value in one location rather than spreading it across fields.

## Proposed Mapping

| SDD concept | GitHub representation | Why |
| --- | --- | --- |
| **Milestone** (M1, M1.2) | An **issue** in the planning repository, not a native GitHub milestone | Issues accept sub-issues, custom fields, and cross-repository children; native milestones accept none of that and their cross-repo status is unresolved |
| **Slice** | A **sub-issue** of the milestone issue, in the planning repository | One slice, one reviewable outcome, one tree root for its implementation |
| **Central change** | The slice issue itself | The central change *is* the slice's envelope; a separate issue would duplicate it |
| **Component change** | A **sub-issue of the slice, created in the component repository** | Cross-repo sub-issues let the work live where the code lives while rolling up centrally |
| **Task** | A **sub-issue of the component change**, or a checklist inside it | Tasks are iterative steps inside one delta; issues only if they need individual tracking |
| **Lifecycle state** | A single-select **field** | Distinct from delivery status; see below |

Depth used: milestone → slice → component change → task is **four levels of eight**. Comfortable headroom.

### Two status fields, not one

The existing `config/sdd-github.json` in the skills repository defines a `Status` field with `Backlog, Ready, In Progress, In Review, Done`. That is a delivery-flow vocabulary and does not express the SDD lifecycle at all.

Rather than overload it, add a second single-select field:

- **`Status`** (existing) — where the work sits in the flow: Backlog, Ready, In Progress, In Review, Done.
- **`Lifecycle`** (new) — where the OpenSpec change sits: Explore, Propose, Apply, Verify, Sync, Archive.

They answer different questions and collapsing them loses information. A change can be "In Progress" while sitting in Verify, or "In Review" while sitting at a gate.

### Suggested additional fields

| Field | Type | Purpose |
| --- | --- | --- |
| `Level` | single-select | Milestone / Slice / Component change / Task — makes hierarchy sliceable and filterable |
| `Repo role` | single-select | Planning / Mobile / Backend / Infrastructure — the birds-eye cross-repo cut |
| `Gate` | single-select | None / Awaiting Gate 1 / Awaiting Gate 2 — surfaces what is actually blocked on a human |
| `Delivery profile` | single-select | prototype-rapid / production-rapid |
| `E2E verification` | single-select | Not required / Unassigned / Assigned / Passed / Gap recorded |
| `Central pin` | text | The pinned central revision a component change was dispatched against |

Six custom fields against a 50-field ceiling — no pressure on the limit.

### Suggested views

| View | Layout | Configuration | Answers |
| --- | --- | --- | --- |
| **Plan** | Roadmap | Items where `Level = Milestone` | Where is the whole V1 plan |
| **Milestone detail** | Table, hierarchy on | Filtered to one milestone, expanded | What is in this milestone and how far along |
| **Current work** | Board | Grouped by `Status`, filtered to current milestone | Day-to-day flow |
| **Cross-repo** | Table | Grouped by `Repo role` | Which repositories owe what on the current slice |
| **Blocked on me** | Table | `Gate` is not None | What is waiting for a human decision |
| **Verification** | Table | `E2E verification` in Unassigned / Gap recorded | Slices with no path to proof |

The last two are the ones worth building deliberately. A cross-repository slice's characteristic failure is silent waiting — a component that never reported back, or a slice that reached Verify with no end-to-end owner. Those two views make both visible without anyone remembering to check.

## Source-Of-Truth Rule

This is the design decision everything else depends on.

**OpenSpec artifacts and the linkage ledger remain authoritative. GitHub is a projection.** Specs, change packages, tasks, evidence, and the ledger stay in the repositories; the Project mirrors them for human visibility and reporting.

The one exception is **intake**: a human-authored issue can precede and seed a change, which is exactly what the existing `github-issue-to-openspec` skill does. So the flow is:

- **Intake** — GitHub issue → OpenSpec change (one time, at the start)
- **Everything after** — OpenSpec state → GitHub fields (one way)

Without that rule, the Project and the change package become two competing truths and reconciliation becomes guesswork. It also aligns with GitHub's own "single source of truth" guidance, applied across tools rather than within one.

Practical consequence: the Project must never be the place a lifecycle transition is *decided*. Moving a card cannot approve a gate.

## What The Lifecycle And Skills Would Need

### Already present in the skills repository

`github-issue-authoring`, `github-issue-to-openspec`, `openspec-github-sync`, `project-pr-status-sync`, and `github-pr-linkage` exist, along with `config/sdd-github.json` carrying repository, project, status-field, managed-label, and managed-block configuration. The foundation is real — it handles one issue per change.

### What is missing

1. **Hierarchy is not modelled.** Current skills create an issue per change. Nothing creates a milestone issue, attaches slices as sub-issues, or attaches component changes as cross-repository sub-issues. This is the largest gap.
2. **Cross-repository sub-issue creation** requires the GraphQL API and write access in the component repository — a different authorization scope than the planning repository alone.
3. **No lifecycle field.** The `Lifecycle` vocabulary above does not exist in configuration or in any skill.
4. **The linkage ledger and the Project do not know about each other.** Dispatch, return records, and end-to-end status would need to project onto `Repo role`, `Central pin`, and `E2E verification` fields.
5. **Gate state is not represented.** Nothing surfaces "awaiting Gate 1" as a queryable state.
6. **Status queries read only git.** The cadence resolves "current milestone" and "last slice" from `openspec/changes/archive/**` history. A Project-backed source would need to agree with that, or defer to it — `dependency-aware-work-selection` already anticipates a Project-backed source, so this is an extension rather than a new idea.
7. **`config/sdd-github.json` needs a schema bump** for the hierarchy configuration, the new field names and their option vocabularies, and per-repository settings for component repositories.

### Sequencing if this is pursued

The order matters because each step is only useful once the prior one exists:

1. Approve GitHub integration in this repository, replacing the deferral in `docs/sdd-workflow.md`.
2. Extend `config/sdd-github.json` with the field and hierarchy configuration.
3. Add milestone and slice issue creation with sub-issue attachment, single repository only.
4. Add the `Lifecycle` field and one-way projection from OpenSpec state.
5. Add cross-repository sub-issue attachment once component repositories exist.
6. Project ledger state — dispatch, returns, pin, end-to-end status — onto fields.
7. Add the Blocked-on-me and Verification views.

Steps 1 through 4 are useful on their own with a single repository, which matters because **no component repository exists yet**. Step 5 has nothing to attach to until one does.

## Risks And Cautions

- **Cross-repository milestone support is unverified.** The proposed mapping deliberately avoids native milestones, so this does not block anything — but do not design around it until it is confirmed in the account.
- **Hierarchy view is recent** (GA March 2026). Recent GA features change. The roadmap layout does not currently support hierarchy, which is a community request.
- **Two truths is the failure mode.** Any bidirectional sync beyond intake will eventually disagree with the change packages, and the disagreement will surface at Verify when it is most expensive.
- **Cross-repository writes are a wider authorization scope** than most existing skills assume, and each is an external mutation requiring approval.
- **Automation can silently rewrite human-authored content.** The existing managed-block markers in `config/sdd-github.json` exist for this reason and should govern any new projection.
- **This adds a maintenance surface.** For a solo developer with no component repositories, the Project may cost more than the visibility returns until M1.2 actually spans repositories.

## Open Questions

- Is cross-repository milestone support actually GA on the target account, and does it change the mapping if so?
- Should the milestone issue live in the planning repository, or would an organization-level Project with draft items be a better home given repositories that do not exist yet?
- Is the visibility worth the integration cost before any component repository exists, or should this wait until M1.2 makes the cross-repository tree real?
- Should `Lifecycle` be a Project field, or derived on demand from the OpenSpec change state to avoid a second place that can drift?
- Which account owns the Project — a personal account, or an eventual nonprofit-owned organization? This is an ownership decision with the same shape as the repository-ownership questions already recorded in the architecture spec.

## Sources

- [GitHub Docs: About Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [GitHub Docs: Best practices for Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects)
- [GitHub Docs: Adding sub-issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues)
- [GitHub Changelog: Hierarchy view now generally available (March 2026)](https://github.blog/changelog/2026-03-19-hierarchy-view-in-github-projects-is-now-generally-available/)
- [GitHub Changelog: Hierarchy view public preview (January 2026)](https://github.blog/changelog/2026-01-15-hierarchy-view-now-available-in-github-projects/)
- [GitHub Roadmap: Cross-repository milestones](https://github.com/github/roadmap/issues/1086)
- [GitHub Community: Evolving GitHub Issues and Projects (GA)](https://github.com/orgs/community/discussions/154148)
- [GitHub Features: Issues](https://github.com/features/issues)

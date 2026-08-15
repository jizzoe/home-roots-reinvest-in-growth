# Cross-Repository SDD Flow

## Purpose And Status

This document explains how a single delivery slice that spans this planning repository *and* one or more component repositories moves through the SDD lifecycle. It supplements [`sdd-workflow.md`](sdd-workflow.md), which defines the lifecycle contract itself, and is governed by the accepted [`cross-repository-architecture`](../openspec/specs/cross-repository-architecture/spec.md) specification.

It exists to answer four recurring questions:

1. Is the planning-repository lifecycle the same as a component-repository lifecycle?
2. Which change closes first?
3. How does a central change hand off to a component change?
4. How does this fit the milestone/slice delivery cadence?

Status: repository-owned explanatory governance. Where this document and an accepted specification disagree, the specification wins.

## The Shape Of A Cross-Repository Slice

```
WORKSPACE   Propose ──[GATE 1]──▶ Apply ─────────────────────▶ Verify ──[GATE 2]──▶ Sync ▶ Archive
                                    │                            ▲
                                    │  (stays open)              │
                    ┌───────────────┼────────────────────────────┤
                    │               │                            │
MOBILE REPO         └─▶ Propose ▶ Apply ▶ Verify ▶ Sync ▶ Archive┤
                                    │                            │
SERVICE REPO        ┌─▶ Propose ▶ Apply ▶ Verify ▶ Sync ▶ Archive┤
                    │                                            │
E2E QA              └───────────────────────▶ vertical slice run ┘
```

The central change is an **envelope, not a predecessor**. It opens first and closes last. Component changes open and archive *inside* it.

## Central And Component Changes Are Not The Same

Both use the same six lifecycle actions — Explore, Propose, Apply, Verify, Sync, Archive — but they carry different content. Per `cross-repository-architecture` (Requirement: *Central and component OpenSpec responsibilities are separated*):

> Central OpenSpec changes SHALL define product contracts, cross-component requirements, affected repository roles, system acceptance scenarios, and residual cross-repository risks. Component-local OpenSpec changes SHALL define repository-local implementation tasks, code/configuration changes, tests, builds, migrations, deployment changes, validation commands, and archive evidence.

And a central change "names affected component repository roles, contract expectations, and system acceptance evidence **without assigning file-level implementation tasks across those repositories**."

| | Central (this repository) | Component (mobile, backend, infra, staff-web) |
| --- | --- | --- |
| Owns | Product contract, cross-component requirements, system acceptance scenarios | Implementation code, local tasks, tests, builds, migrations, deployment |
| Never contains | File-level implementation tasks for another repository | Product-wide behavior decisions not traceable to a central change |
| Propose produces | Requirements and scenarios split by responsible repository | Repository-local ordered tasks citing the central contract |
| Apply produces | Coordination artifacts and evidence links | Working, tested code |
| Verify produces | Aggregated cross-repository system acceptance | Local validation evidence for that repository only |

## Sequencing Rule: Open First, Close Last

The central change cannot archive before its component changes. Central verification's defined job is to record "links to each component repository revision, component change, validation command results, and evidence artifacts used for system acceptance." There is nothing to verify until the component repositories have produced that evidence.

Consequences:

- Component repositories archive **before** the central change archives.
- Component repositories run **in parallel** with each other, not in sequence. They do not queue behind one another because the contract that lets them work independently was pinned at Gate 1.
- The central change remains open — and visible as in-progress work — for the whole duration of component delivery.
- `sdd-workflow.md` is explicit that this is not one task list routed across repositories: "Cross-repository work requires a separate local change, branch, tests, review, pull request, and archive lifecycle in every affected component repository."

## Handoff Mechanism

Until an approved OpenSpec Store or equivalent reference model exists, central and component work are linked by **durable manual links**. A component change's proposal must record:

- the central repository URL or path;
- the central branch;
- the central **commit or revision**;
- the central change identifier;
- the relevant central capability, spec, or delta path; and
- its own component repository and change identifier.

The pinned commit is the handoff artifact. It is what makes "which revision of the contract did mobile build against?" answerable later.

Approval of Gate 1 on the central change is what authorizes component repositories to open their local changes at all. A central proposal is not that authorization; the approval of it is.

## Mapping Onto The Milestone/Slice Cadence

The two-gate checkpointed cadence survives intact when the gates are held at the **slice** level rather than per repository:

| Cadence gate | Cross-repository meaning |
| --- | --- |
| **Gate 1** — after Propose, before Apply | Approve the contract *and* the repository split. This single approval authorizes every affected component repository to run its full local lifecycle. |
| *(no gate between)* | Component repositories Propose through Archive locally; end-to-end QA runs against the assembled vertical slice. Component-local review happens in each repository's own pull request, not as a central approval prompt. |
| **Gate 2** — after Verify, before Sync | Approve the aggregated evidence. Authorizes central Sync, Archive, merge, and cleanup as a single close-out. |

No third gate is introduced by cross-repository work.

## What Verify Actually Verifies Centrally

Central Verify re-runs nothing. Per `sdd-workflow.md`, "Product implementation evidence must come from the affected component repositories and, for system behavior, end-to-end acceptance evidence coordinated here," and "a green narrow test cannot prove a broader cross-component requirement."

Central Verify therefore:

1. takes every requirement and scenario from the approved central change;
2. maps each to authoritative evidence — each component repository's verification evidence, plus the end-to-end vertical-slice QA evidence;
3. confirms no approved requirement is left uncovered; and
4. records residual gaps and any divergence between proposed and delivered behavior.

## Known Gaps

- The reusable milestone/slice delivery cadence brief (`sdd-milestone-slice-delivery-skill.md`, maintained in the separate `joericearchitect-ai-skills` repository) currently assumes a single target repository. Its Required Inputs name a singular "target repository/workspace and its configured integration path," and its close-out step describes one branch and one worktree. A cross-repository slice has N+1 branches and N+1 archives. That brief needs cross-repository vocabulary before the cadence can be applied to a slice of this shape without improvisation.
- M1 as scoped in `m1-rapid-thin-slice-prototype.md` is mobile-only and explicitly excludes live backend sync. The first genuinely cross-repository slice is **M1.2**, which `cross-repository-architecture` scopes to proving exactly one Android-prototype-to-Spring-Boot-REST-API synthetic transaction sync path.

## Related Documents

- [`sdd-workflow.md`](sdd-workflow.md) — lifecycle contract, approvals, validation, recovery
- [`../AGENTS.md`](../AGENTS.md) — repository boundary and safety boundaries
- [`../openspec/specs/cross-repository-architecture/spec.md`](../openspec/specs/cross-repository-architecture/spec.md) — accepted repository roles and linkage requirements
- [`../openspec/specs/api-contract-conventions/spec.md`](../openspec/specs/api-contract-conventions/spec.md) — the contract conventions a central change pins

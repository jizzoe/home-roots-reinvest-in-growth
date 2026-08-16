## Context

See [proposal.md](proposal.md) for the motivation. M0's four planning changes are archived, the accepted living specifications are present, and the planning-root bootstrap is documented; however, the M0 brief and roadmap still present pre-completion wording. The closure must be evidence-backed, narrow, and reversible through normal Git history.

## Goals / Non-Goals

**Goals:**

- Create one durable closure-audit record that maps the M0 milestone's candidate slices, acceptance criteria, and blocking questions to repository evidence.
- Make the M0 brief and roadmap truthful, mutually consistent, and useful to a future session selecting the next milestone.
- Preserve the distinction between foundation completion and authorization to create or implement in the M1 mobile repository.

**Non-Goals:**

- Change accepted product requirements or add a new capability specification.
- Create, configure, or access any component repository, account, cloud resource, vendor, credential, or external service.
- Approve or begin M1 implementation, TestFlight distribution, or use of non-synthetic data.

## Decisions

### Use a repository-owned closure audit as the primary evidence record

The audit will reside under `ai-planning/evidence/` and link M0's own milestone criteria to immutable archived change artifacts, accepted living specs, and the current planning-root policy. This makes the decision reviewable without duplicating requirements into new specs.

Alternative considered: mark M0 complete only in the roadmap. Rejected because a roadmap status alone cannot show why each acceptance criterion is satisfied.

### Preserve M0's scope; do not create delta specs

The change sets `skip_specs: true`. M0 closure changes delivery-state documentation and evidence only; it does not alter observable product behavior held in `openspec/specs/`.

Alternative considered: add an `m0-foundation-closure` capability. Rejected because it would convert governance status into an artificial product requirement and create duplicate sources of truth.

### Make M1 the next planning milestone, not an authorized implementation action

The reconciled documents will identify M1 as the next milestone, but retain its existing Apply gates: nonprofit-owned mobile repository location and access, agreed scope, synthetic-only fixtures, dual-platform target, SQLite-only local behavior, and component-local validation plan.

Alternative considered: state that M1 begins immediately upon M0 closure. Rejected because M0 completion does not authorize implementation or external configuration.

## Risks / Trade-offs

- [Archive evidence may not fully satisfy an M0 acceptance criterion] → The audit must name the gap rather than claiming closure; if a material gap remains, M0 stays open.
- [M0 closure could be mistaken for M1 implementation approval] → Repeat M1's separate approval boundary in the roadmap, M0 brief, and closure audit.
- [Existing user documentation changes could be overwritten] → Limit Apply edits to the named M0 brief, roadmap, and new audit; preserve all unrelated working-tree changes.

## Migration Plan

1. Review the closure audit and proposed M0 status edits with the human owner.
2. After explicit Apply approval, create the audit and update only the M0 brief and milestone roadmap.
3. Verify every audit link, the M0/M1 boundary, OpenSpec validation, whitespace check, and working-tree scope.
4. After human approval of verification and closure, archive this documentation-only change without syncing specs.

## Why

M1 delivered its manual offline transaction slice and its speech proposal and
confirmation slice, both archived, synced, and accepted on the representative
physical Android device. Its third phase never delivered: the receipt slice was
attempted twice, discontinued on 2026-09-06, and its whole scope including image
capture moved to the new M1.3 milestone so that evaluation-corpus assembly would
not hold M1 open indefinitely.

M1 therefore has no remaining work, but it is still represented as in progress
and its acceptance evidence has never been consolidated. That leaves the roadmap
stale, leaves the deferred PRD receipt requirements unrecorded, and makes it
unclear whether M1.1 can become the active milestone.

## What Changes

- Create a durable M1 closure audit mapping every M1 acceptance criterion and
  blocking question to archived change artifacts, accepted living specifications,
  device-acceptance evidence, or an explicitly named gap.
- Record the deferred receipt scope honestly: PRD REC-001 through REC-004 are
  unmet by M1, owed at V1, and carried by M1.3 and M8.
- Record the Haitian Creole third-language capability, which shipped and was
  archived in the component repository on 2026-09-05 with no central record, and
  its outstanding second human-translation pass.
- Record the two receipt build artifacts that have no surviving source or no
  passing evidence, so no future review encounters an unexplained build.
- Mark M1 complete in the V1 milestone roadmap and name M1.1 as the next
  milestone to propose.
- Preserve all existing gates: closure authorizes no implementation, no external
  resource, no participant data, and no repository transfer.

## Capabilities

### New Capabilities

None. This is a documentation and evidence-reconciliation change; it introduces
no product behavior.

### Modified Capabilities

None. Accepted requirements in `openspec/specs/` are unchanged.

## Impact

Affected planning artifacts are
`ai-planning/design-briefs/V1 Scope Map and Milestone Plan.md`,
`ai-planning/design-briefs/m1-rapid-thin-slice-prototype.md`, and a new M1
closure-audit evidence record. No code, API, executable contract, repository,
vendor account, cloud resource, credential, cost commitment, sensitive data, or
external system is affected.

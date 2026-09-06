## Context

See [proposal.md](proposal.md) for the motivation. M1's two delivered slices are
archived with central verification and physical-device acceptance records. Its
third phase is deferred in full to M1.3, recorded in the roadmap and in the
superseded change archived at
`openspec/changes/archive/2026-09-06-prototype-receipt-capture-ocr-review/`.

Closing M1 is therefore an evidence-consolidation task, not a delivery task. The
risk it must manage is the opposite of optimism: M1 closes with a real capability
gap, and the closure must state that plainly rather than let archive placement
imply completeness.

## Goals / Non-Goals

**Goals:**

- Produce one durable closure audit mapping M1's acceptance criteria and blocking
  questions to immutable evidence or a named gap.
- Make the deferred receipt scope, and the PRD requirements it leaves unmet,
  impossible to lose.
- Give the Haitian Creole capability its first central record, including the
  two-pass translation plan and the constraint that unreviewed strings must not
  reach participants.
- Make the roadmap truthful and identify M1.1 as the next milestone.

**Non-Goals:**

- Deliver, restart, or re-scope any receipt behavior. M1.3 owns that.
- Change accepted product requirements or add a capability specification.
- Authorize implementation, external resources, participant data, or the pending
  transfer of the mobile repository to HRF.

## Decisions

### Close M1 with a named capability gap rather than holding it open

M1's purpose was to burn down the riskiest V1 assumptions early. Offline-first
durability and proposal-then-confirm were both proven on a real device. Receipt
extraction was the third risk and remains unproven, but holding the milestone
open until a photographed corpus exists would misrepresent the state of the work
and block M1.1 for no benefit.

Alternative considered: keep M1 open until receipts ship. Rejected because the
blocking dependency is corpus assembly, which is scheduled ahead of M1.3 and is
unrelated to anything else in M1.

### Record unmet PRD requirements explicitly in the audit

REC-001, REC-003, and REC-004 (capture, confirmation before a record, image
retention) and REC-002 (AI extraction) are all unmet by M1. Appendix C.2 lists
receipt capture and receipt extraction assistance as Version 1 must-haves, so
these are deferrals within V1, not descoped requirements.

Alternative considered: treat receipts as out of prototype scope and say nothing.
Rejected because it would quietly drop four `shall` requirements.

### Give Haitian Creole a central record inside this change

The third interface language shipped and archived in the component repository on
2026-09-05 with no central artifact. The roadmap still defers Haitian Creole UI
localization to post-M1. Closing M1 without reconciling that would leave a
shipped, participant-visible capability unrecorded, along with the fact that
every `ht.json` value is machine-generated and marked `unreviewed`.

### Preserve M0's precedent: skip specs, archive after explicit approval

The change sets `skip_specs: true`. It alters delivery-state documentation and
evidence only, and it is archived only after the owner accepts the completed
audit.

## Risks / Trade-offs

- [Closure reads as "receipts were descoped"] → The audit states REC-001 through
  REC-004 as owed at V1 and names M1.3 and M8 as the carriers.
- [Archive placement implies the receipt change succeeded] → The superseded
  record carries discontinued banners on every document; the audit repeats the
  status.
- [The two receipt builds look like unexplained artifacts in a later review] →
  Both are recorded with their source revision, outcome, and evidence status.
- [Unreviewed Haitian Creole strings reach participants] → The audit records the
  constraint and the second-pass plan as an open obligation, not a completed one.

## Migration Plan

1. Create the closure audit and reconcile the roadmap and M1 control brief.
2. Verify every audit link resolves and that no document claims receipt delivery,
   implementation authorization, or participant-data approval.
3. Run the repository validation contract and record outcomes, skipped checks,
   and residual gaps in the audit.
4. Present the completed audit for explicit human verification and archive
   approval; archive without syncing specs only after that approval.

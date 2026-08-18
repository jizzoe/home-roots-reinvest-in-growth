# SDD Collaboration Profile Adoption

Status: Reviewable design brief — no OpenSpec proposal or active-policy edit is
authorized by this brief alone.

Date: 2026-08-17

## 1. Problem And Desired Outcome

The planning repository coordinates slices that may span the central contract
and implementation repositories. Current repository policy correctly requires
separate component changes and durable linkage, but it does not record whether
the work is being conducted by a team of repository owners or by one owner
deliberately operating both roles. The resulting ambiguity made the mobile
speech-proposal component transition appear optional and allowed an autonomous
delivery path to be selected without the milestone/slice briefing cadence.

The desired outcome is a visible, user-selected collaboration profile for every
cross-repository milestone and slice. The default must preserve the normal
central/component split, while a solo owner can intentionally operate both
roles without weakening change boundaries, durable handoffs, verification, or
approval gates.

## 2. Evidence And Key Findings

- [Cross-Repository SDD Flow](../../docs/cross-repository-sdd-flow.md) defines
  the central change as an envelope, component-local changes as distinct
  lifecycles, and the linkage ledger as the durable cross-repository record.
- [The current speech-proposal linkage ledger](../../openspec/changes/prototype-speech-proposal-confirmation/linkage.md)
  records a valid component dispatch and an assigned Android acceptance path,
  but it has no collaboration-profile field.
- [The reusable cadence design brief](</Users/joerice/git/joericearchitect/joericearchitect-ai-skills/ai-planning/design-briefs/sdd-milestone-slice-delivery-skill.md>)
  specifies team-style role separation and linkage but, before its current
  amendment, did not distinguish a single owner who intentionally operates both
  roles.
- Current autonomous delivery skills advance evidenced lifecycle checkpoints;
  they do not provide milestone/slice narration, profile selection, or a
  cross-repository role router. The reusable cadence skill is still a design
  brief rather than an installed capability.

## 3. Options Considered And Tradeoffs

1. Keep one mandatory team split. This maximizes role separation but obscures
   the legitimate one-person operating case and encourages informal bypasses.
2. Treat any one-user or one-agent session as solo automatically. This is
   convenient but unsafe: access to multiple repositories is not approval to
   operate them, and it makes role and handoff boundaries invisible.
3. Require a collaboration profile, defaulting to team and allowing explicit
   solo selection. This preserves safe defaults while making a one-person
   operating model visible, reviewable, and durable.

Option 3 is recommended and reflects the owner's stated preference.

## 4. Decisions, Assumptions, And Owner

Owner decision (Joe Rice, 2026-08-17): cross-repository delivery has two
profiles: `team` and `solo`. If a profile is absent, present `team` as the
default and require the user to accept it or explicitly choose `solo` before
the slice starts.

Recommended definitions:

- `team`: central and component roles operate through their normal separate
  sessions and named repository owners.
- `solo`: one named owner may operate both roles, but only after a visible role
  transition and durable inbound handoff. Central and component changes,
  controller state, Gate 1/Gate 2 approvals, return records, and end-to-end
  acceptance remain distinct.

The current `prototype-speech-proposal-confirmation` slice uses `solo`, selected
by Joe Rice on 2026-08-17 and recorded in its linkage ledger. The next action
is a visible switch into the component-implementer role for formal component
Verify; no central or EAS operation is implied by this choice.

## 5. Scope, Non-Goals, Constraints, Dependencies, And Risks

Included: profile selection, briefing language, durable recording in the
milestone/slice source and linkage ledger, and future reusable-skill behavior.

Excluded: changing approved product behavior, retroactively declaring the
speech slice closed, installation of a global skill, weakening EAS/device
approval, merging component work, or replacing the two existing lifecycle
gates.

Dependencies: the reusable cadence brief must become an approved and tested
global skill before the behavior can be mechanically enforced. A project-local
OpenSpec proposal must update this repository's workflow guidance and template
fields once that global contract is accepted.

Risks: a permissive solo profile could be mistaken for blanket authority; a
missing profile could be silently inferred; and central evidence could be
mistaken for component or end-to-end evidence. The proposed definitions
explicitly prohibit all three.

## 6. Open Questions And Blocking Decisions

- Should the profile be stored at milestone scope and inherited by slices, at
  slice scope only, or both with an explicit slice override? Recommendation:
  milestone default plus explicit slice override recorded in the linkage
  ledger.
- Should one explicit `solo` selection authorize a component role transition
  for all named component repositories in the slice, or should each component
  require a separate acknowledgement? Recommendation: each component requires
  its own acknowledgement because each has an independent mutation boundary.

## 7. Recommended Next Step

Accept or revise this design brief, then create a focused OpenSpec proposal in
this repository to adopt collaboration-profile fields in milestone planning,
cross-repository flow guidance, linkage-ledger templates, and resumption
briefings. Coordinate that proposal with the global
`sdd-milestone-slice-delivery` skill proposal; do not install or rely on a new
global skill until its own design, implementation, and tests are accepted.

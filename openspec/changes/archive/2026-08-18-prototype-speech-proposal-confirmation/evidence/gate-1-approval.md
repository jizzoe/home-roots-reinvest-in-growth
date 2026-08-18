# Gate 1 Approval

Date: 2026-08-17

Change: `prototype-speech-proposal-confirmation`

Decision: Approved

Human decision: Joe Rice wrote, `Approve Gate 1 and continue`.

## Approved Scope

This decision approves the corrected central proposal, delta requirements and
scenarios, design decisions, ordered tasks, central/mobile repository split,
`prototype-rapid` quality profile, synthetic-only and no-live-provider
constraints, validation plan, and recovery path. It authorizes the central
contract pin and dispatch plus the mobile component's complete local OpenSpec
lifecycle for this exact slice under the existing bounded `sdd-delivery`
authorization.

The approval is bound to controller run
`c7322a6f-1301-432c-ae1f-9913fd711f60`, selected change
`prototype-speech-proposal-confirmation`, and expiration
`2026-08-18T01:06:28.000Z`.

## Retained Boundary

This approval does not authorize an EAS build or artifact operation, any other
vendor write, deployment, release, credential or permission change, real or
sensitive data, cloud resource, live speech provider, backend integration, or
unrelated repository mutation. Task 3.1 retains the exact just-in-time EAS
approval gate.

## Recovery

Resume from Git, the central controller record, this approval record, current
OpenSpec instructions, and the first incomplete evidenced task. Preserve
unrelated worktree content. Before Archive, rollback may revert only this
change's central coordination artifacts and the registered component speech
change while preserving the accepted Phase 1 manual path.

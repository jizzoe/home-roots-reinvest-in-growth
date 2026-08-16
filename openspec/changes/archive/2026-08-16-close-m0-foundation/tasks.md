## 1. Evidence Audit

- [x] 1.1 Create `ai-planning/evidence/m0-foundation-closure-audit.md` mapping `setup-sdd-product-context` and every archived M0 candidate slice to durable paths and completion evidence.
- [x] 1.2 Map each M0 acceptance criterion and blocking question to accepted specifications, archived task evidence, or current repository policy; record any material gap instead of inferring completion.

## 2. M0 Documentation Reconciliation

- [x] 2.1 Update `ai-planning/design-briefs/m0-sdd-and-product-foundation.md` with the verified M0 completion status, the named M1 mobile repository planning context, and a next action that preserves M1's separate Apply gate.
- [x] 2.2 Update `ai-planning/design-briefs/V1 Scope Map and Milestone Plan.md` to mark M0 complete, reference the closure audit, and resolve the M0 blocking questions from accepted sources without authorizing implementation.

## 3. Verification And Closure Readiness

- [x] 3.1 Verify all closure-audit links resolve and that the M0 brief, roadmap, and accepted M1 boundary make no claim of implementation, external-resource, or participant-data authorization.
- [x] 3.2 Run `openspec context --json`, `openspec config get workflows`, `openspec list --json`, `openspec validate --all --strict --no-interactive`, `git diff --check`, and `git status --short`; record outcomes, skipped checks, and residual gaps in the closure audit.
- [x] 3.3 Present the completed audit and document reconciliation for human verification and explicit archive approval; archive this change without syncing specs only after that approval. Approval recorded from the owner on 2026-08-16.

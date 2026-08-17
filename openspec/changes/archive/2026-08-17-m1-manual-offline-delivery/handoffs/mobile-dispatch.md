# M1 Phase-1 Mobile Component Dispatch

Date: 2026-08-16

## Central Contract

- Central repository: `https://github.com/jizzoe/home-roots-reinvest-in-growth`
- Central change: `m1-manual-offline-delivery`
- Contract pin: `bd55571688818a47746dae673c35d7f2a125b77e`
- Relevant delta: `openspec/changes/m1-manual-offline-delivery/specs/prototype-manual-offline-transaction/spec.md`
- Ledger: `openspec/changes/m1-manual-offline-delivery/linkage.md`

## Component Boundary

- Component repository: `https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app`
- Approved branch: `feat/m1-manual-offline-delivery`
- Required next lifecycle action: propose one component-local OpenSpec change before component Apply or code/build configuration work.

## Required Phase-1 Outcome

- Android Expo foundation using application identifier `org.homerootsfoundation.reinvesttogrow`.
- English/French resource mechanics and synthetic HTG example data.
- Manual sale and expense capture with explicit local confirmation.
- SQLite local durability, recent activity, simple totals, local status, and a sync-shaped outbox/client stub.
- Deterministic component checks and Android preview/internal-distribution build evidence for the representative Android 15 device.

## Profile And Non-Goals

- Profile: `prototype-rapid`; controller policy `strict-first-degraded`; no isolated independent reviewer is required.
- Synthetic data only. No participant, production, financial, or personal data.
- No backend synchronization, infrastructure, deployment, AWS, other cloud provider, iOS/TestFlight, speech/STT/TTS behavior, or receipt/OCR behavior in this Phase-1 component change.
- Do not record credentials, EAS signing material, device identifiers, tokens, or browser-login material.

## Return Requirements

Return the component change identifier and archive revision, exact component revision, passed deterministic-check and build evidence, the central contract pin above, any contract-divergence statement, and references needed for `ai-planning/evidence/m1-manual-offline-e2e.md`.

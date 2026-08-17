## MODIFIED Requirements

### Requirement: Prototype scope remains manual, offline, and planning-only
The planning repository SHALL retain `prototype-manual-offline-transaction` as the accepted M1 product contract for a manual Android prototype slice. It SHALL coordinate delivery only through a distinct central envelope and one explicit component-local mobile implementation change; it SHALL NOT host mobile application code, substitute central planning work for component validation, or expand the slice to backend synchronization, infrastructure, real data, or production/pilot use.

#### Scenario: Planning proposal is reviewed
- **WHEN** the accepted `prototype-manual-offline-transaction` contract and `m1-manual-offline-delivery` envelope are reviewed in the planning repository
- **THEN** it identifies the accepted contract, responsible component repository, linkage ledger, system acceptance evidence, and residual gaps without containing component file-level implementation work

#### Scenario: Implementation is attempted from the central change
- **WHEN** someone attempts to use the central envelope to create or modify mobile application code, build configuration, provider configuration, credentials, or external resources before the central Gate 1 plan approval and component-local authorization are recorded
- **THEN** review blocks the work until the required central and component lifecycle evidence exists

#### Scenario: Central change attempts to replace component work
- **WHEN** the central envelope attempts to add mobile application code, claim component tests or device evidence without a returned component record, or finalize the slice from central planning evidence alone
- **THEN** review rejects the claim and keeps the delivery envelope open

## ADDED Requirements

### Requirement: Cross-repository manual-offline delivery uses durable linkage and system acceptance
The M1 manual-offline delivery envelope SHALL initialize a linkage ledger at `openspec/changes/m1-manual-offline-delivery/linkage.md` at approved central Gate 1 and SHALL retain the central contract pin, the single mobile component dispatch and return, end-to-end verification status, and residual gaps. The central envelope SHALL not archive until the returned component evidence and the assigned system acceptance evidence cover every applicable M1 manual-offline requirement and scenario.

#### Scenario: Gate 1 dispatches the mobile component
- **WHEN** the central proposal, repository split, end-to-end executor, environment, evidence location, component repository, and delivery profile have all been approved
- **THEN** the central change is committed and pushed, the ledger records its pinned revision and dispatched mobile component, and the component receives one outbound handoff record

#### Scenario: Required end-to-end input is incomplete
- **WHEN** the physical Android test device, executable development environment, component repository, or durable evidence location is unresolved
- **THEN** central Gate 1 remains blocked and no component handoff or archive claim is made

#### Scenario: Component evidence returns
- **WHEN** the mobile component completes its own lifecycle
- **THEN** the ledger records its repository revision, component change identifier, validation evidence references, contract pin, and any divergence before central verification begins

#### Scenario: Central close-out is evaluated
- **WHEN** the component return and Joe Rice's development-environment acceptance evidence are available
- **THEN** central verification maps the evidence to the M1 manual-offline requirements and scenarios, records residual gaps, and refuses Archive if any behavior remains uncovered

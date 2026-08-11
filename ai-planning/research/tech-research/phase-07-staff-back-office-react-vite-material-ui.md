# Phase 07 Research: Staff Back-Office Thin Slice With React, Vite, TypeScript, And Material UI

Date: 2026-08-08

Related plan:

- `../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md`
- `phase-03-thin-backend-sync-slice-spring-boot-modular-monolith.md`

## Question

What is the thinnest useful staff back-office web app for the proof of concept, and are React, Vite, TypeScript, and Material UI a good foundation?

## High-Level Summary

Use React + Vite + TypeScript + Material UI for the staff back-office prototype.

This is a good fit because the back office is a conventional web admin app: staff need to review businesses, transactions, receipts, sync issues, and later loans/outcomes/reports. Material UI provides ready-made layout, forms, dialogs, tables, navigation, status chips, and accessibility-conscious components. Vite gives a fast local development loop and simple static build output.

The first staff app should be intentionally thin:

1. Dashboard shell with left navigation.
2. Businesses list.
3. Transactions list.
4. Transaction detail/review panel.
5. Receipt preview placeholder if Phase 5 exists.
6. Basic status filters.

Do not build a polished nonprofit reporting dashboard yet. The first proof point is that staff can see records submitted by the mobile app and inspect their status.

Recommendation:

- Use free Material UI Core components.
- Use free MUI X Data Grid Community only if the table needs sorting/filtering/pagination beyond simple Material UI tables.
- Avoid MUI X Pro/Premium at MVP unless there is a clear need for paid grid features.

## 101 Background

### What Is React?

React is a JavaScript library for building user interfaces from components.

For a staff web app, React lets the app define reusable pieces such as:

- navigation shell;
- business list;
- transaction table;
- status chip;
- transaction detail panel;
- receipt preview;
- forms and dialogs.

React is a good fit for admin interfaces because staff screens are naturally component-based and stateful.

### What Is Vite?

Vite is a modern frontend build tool and development server.

It provides:

- fast local dev server;
- hot module replacement;
- TypeScript-friendly templates;
- production build command;
- static assets suitable for CloudFront/S3, Amplify, or other web hosting later.

For this project, Vite is enough. The back office does not need server-side rendering at the start.

### What Is Material UI?

Material UI, often called MUI, is a React component library implementing Material Design-inspired components.

It includes common admin-app building blocks:

- buttons;
- text fields;
- select inputs;
- dialogs;
- app bars;
- drawers;
- cards;
- tables;
- alerts;
- chips;
- tabs;
- themes.

The practical value is speed and consistency. Staff tools do not need a custom design system on day one.

### What Is MUI X Data Grid?

MUI X Data Grid is MUI's richer table/grid component.

It has:

- a free Community version under MIT license;
- paid Pro and Premium versions for advanced features.

For MVP, simple Material UI `Table` or free `@mui/x-data-grid` Community should be enough. Paid grid features such as advanced multi-filtering, row grouping, Excel export, and column pinning can wait.

### What Is A Back Office?

The back office is the staff/admin side of the system.

For this project, staff eventually need to:

- manage businesses and owners;
- review mobile transactions;
- inspect receipt documents;
- resolve sync/review issues;
- manage loans and repayments;
- track portfolio health;
- produce grant and impact reports.

Phase 7 should only prove the first staff visibility loop.

## Foundational Concepts

### Admin Shell

The admin shell is the persistent layout around staff pages:

- top app bar;
- side navigation drawer;
- page title;
- content area;
- user/account menu later.

Use a restrained operational layout. This should feel like a working tool, not a landing page.

### Resource List

A resource list shows many records of the same type.

Examples:

- businesses;
- transactions;
- receipts;
- sync issues.

For MVP, each list needs:

- clear columns;
- status indicators;
- search/filter if cheap;
- row click to detail.

### Detail Panel

A detail panel shows one selected record without losing the list context.

Good MVP pattern:

```text
Transactions table on left/full page
  -> click row
  -> side panel or detail route
  -> inspect transaction and receipt
```

This is more efficient than forcing staff through separate pages for every small review.

### Status Chips

Material UI `Chip` works well for status display:

- Synced
- Needs review
- Receipt missing
- Receipt sent
- Failed

Status should not rely on color only. Include text labels.

### Forms And Dialogs

Admin forms will eventually handle:

- business profile edits;
- notes;
- issue resolution;
- loan updates.

For the first slice, keep forms read-only or mock-only unless staff edits are part of the prototype.

### Client-Side Routing

The back office should use client-side routing for pages:

- `/businesses`
- `/transactions`
- `/transactions/:id`
- `/sync-issues`

React Router is the likely default. For the first static prototype, route state can be simple.

### API Client Layer

Do not scatter `fetch` calls directly across UI components.

Use a small API client layer:

```text
api/
  businessesApi.ts
  transactionsApi.ts
  types.ts
```

This is important for later auth headers, error handling, pagination, and typed contracts.

### Authentication Stub

Phase 7 can stub authentication, but the UI should be shaped for future staff auth.

Prototype:

- no real login;
- seeded staff identity;
- clear local-only warning if runnable.

Later:

- Cognito or other identity provider;
- role-based access control;
- staff MFA;
- audit for sensitive actions.

### Accessibility

Staff apps need accessibility too:

- semantic table/grid labels;
- keyboard navigation;
- visible focus;
- sufficient contrast;
- form labels;
- status text;
- accessible dialogs.

Material UI helps but does not guarantee accessibility if used poorly.

## Baeldung-Style Technology Introduction

### Creating A Vite React TypeScript App

Vite can scaffold a React + TypeScript app:

```bash
npm create vite@latest backoffice-poc -- --template react-ts
cd backoffice-poc
npm install
npm run dev
```

Install Material UI:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

Optional icons:

```bash
npm install @mui/icons-material
```

Optional free Data Grid Community:

```bash
npm install @mui/x-data-grid
```

### Basic Material UI Shell

```tsx
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function StaffShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Mobile Bookkeeping Staff</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: 240 }}>
        {/* navigation items */}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
```

This establishes the admin app shape without custom design-system work.

### Simple Transactions Table

For a small MVP, Material UI `Table` can be enough:

```tsx
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type StaffTransaction = {
  id: string;
  businessName: string;
  type: "sale" | "expense";
  amountLabel: string;
  status: "synced" | "needs_review" | "failed";
};

export function TransactionsTable({ rows }: { rows: StaffTransaction[] }) {
  return (
    <Table size="small" aria-label="Transactions">
      <TableHead>
        <TableRow>
          <TableCell>Business</TableCell>
          <TableCell>Type</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow hover key={row.id}>
            <TableCell>{row.businessName}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell align="right">{row.amountLabel}</TableCell>
            <TableCell>
              <Chip size="small" label={statusLabel(row.status)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Data Grid If Needed

If sorting/filtering/pagination becomes useful:

```tsx
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "businessName", headerName: "Business", width: 220 },
  { field: "type", headerName: "Type", width: 120 },
  { field: "amountLabel", headerName: "Amount", width: 120 },
  { field: "status", headerName: "Status", width: 160 },
];

export function TransactionsGrid({ rows }: { rows: StaffTransaction[] }) {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
```

MUI docs note that the Data Grid parent needs intrinsic dimensions. Do not put it in an auto-collapsing container.

### API Client In Practical Terms

```ts
export type StaffTransaction = {
  serverTransactionId: string;
  businessName: string;
  type: "sale" | "expense";
  amountMinorUnits: number;
  currencyCode: string;
  status: string;
};

export async function listTransactions(): Promise<StaffTransaction[]> {
  const response = await fetch("/api/staff/transactions");

  if (!response.ok) {
    throw new Error("Could not load transactions");
  }

  return response.json();
}
```

Later, the API client can add auth headers, pagination, typed errors, and runtime validation.

## Recommendation

Use React + Vite + TypeScript + Material UI for the staff back-office app.

For the first thin slice:

1. Create a staff web app shell.
2. Add navigation for Businesses, Transactions, and Sync Issues.
3. Use mocked data first if backend endpoints do not exist.
4. Show a transactions list with status chips.
5. Show a transaction detail panel or route.
6. Show receipt attachment placeholder/preview if Phase 5 exists.
7. Keep editing disabled or very narrow.
8. Keep auth mocked.
9. Use free MUI components.
10. Avoid paid MUI X features for MVP.

Material UI is a good default for this project because the staff app is operational and form/table-heavy. It should be dense, clear, and repeat-use friendly.

## Primary Decisions

### Is Material UI The Right Default?

Decision: yes.

Why:

- mature React component ecosystem;
- good coverage for staff/admin screens;
- fast to prototype;
- TypeScript support;
- accessible components when used correctly;
- pairs well with Vite;
- MUI X Community Data Grid is available if tables need more power.

### What Is The First Staff Screen?

Decision: transactions list.

Why:

- directly proves mobile-to-backend-to-staff visibility;
- validates sync status concepts;
- supports receipt-review path;
- gives the nonprofit immediate operational value.

Businesses list can be second. Portfolio/reporting dashboards should come later.

### Should The Back Office Be In The First Prototype Milestone?

Decision: include a thin slice after mobile-to-backend sync works.

Why:

- staff visibility confirms end-to-end data flow;
- it should not block proving offline mobile sync first;
- the first staff screen can be thin and still useful.

### Table Or Data Grid?

Decision:

- start with Material UI `Table` if mocked/small data;
- use MUI X Data Grid Community if staff need sorting, pagination, filtering, or larger row sets.

Do not use MUI X Pro/Premium unless a specific paid feature becomes necessary.

### What Should Be Stubbed?

Stub:

- login/auth;
- staff roles;
- organization switcher;
- edit/approve workflows;
- exports;
- charts;
- advanced filters.

Keep real once backend exists:

- transaction list API;
- transaction detail API;
- receipt metadata/preview link;
- status mapping;
- error/loading states.

## Alternatives Considered

### Build Custom UI Components

Pros:

- full design control;
- no dependency on MUI conventions.

Cons:

- slower;
- accessibility burden;
- more visual QA;
- less useful for a staff tool where conventional controls are fine.

Assessment:

- Not recommended for MVP.

### Next.js Instead Of Vite

Pros:

- full-stack React framework;
- routing, server rendering, API routes, deployment patterns.

Cons:

- more framework surface than needed;
- back office can be a static SPA served separately from Spring Boot;
- no current need for SSR.

Assessment:

- Vite is simpler for this prototype.

### Admin Framework Such As React Admin

Pros:

- rapid CRUD scaffolding;
- built-in list/edit/show patterns.

Cons:

- may impose data-provider assumptions;
- could obscure product-specific workflows;
- another framework to learn/debug.

Assessment:

- Consider later if CRUD volume dominates. For now, plain React + MUI is clearer.

### Paid MUI X Pro/Premium

Pros:

- advanced grid capabilities;
- more powerful filtering/sorting/export/grouping.

Cons:

- paid per frontend developer;
- nonprofit discount/eligibility would need research;
- unnecessary for first staff slice.

Assessment:

- Avoid for MVP. Track as future paid candidate only.

## Prototype Impact

Phase 7 prototype should prove:

- staff web app can run locally;
- app has an admin shell;
- staff can see transactions submitted from mobile/backend;
- statuses are clear;
- staff can inspect one transaction;
- receipt metadata or placeholder appears if available;
- API client layer is separated from UI components;
- mocked auth does not leak into production assumptions;
- free MUI components are sufficient for first slice.

Acceptance checks:

- `npm run dev` starts the app;
- `npm run build` succeeds;
- no paid MUI packages are used unless intentionally approved;
- transaction list works with mocked data and can switch to API data;
- loading, empty, and error states exist;
- status labels are text, not color-only;
- responsive layout is usable at laptop and tablet widths.

## Risks / Follow-Up

### Paid Grid Feature Drift

Risk:

- developers may accidentally use Pro/Premium-only Data Grid features.

Mitigation:

- install only `@mui/x-data-grid`;
- avoid `@mui/x-data-grid-pro` and `@mui/x-data-grid-premium`;
- add cost tracker entry if paid features become real candidates.

### Admin App Scope Creep

Risk:

- dashboards, reports, exports, roles, and workflow actions can expand quickly.

Mitigation:

- first screen is transaction visibility;
- defer report/export/loan workflows;
- keep staff edits read-only unless specifically needed.

### API Contract Drift

Risk:

- frontend mocked data shape diverges from Spring Boot API.

Mitigation:

- define staff API DTOs in a spec;
- use TypeScript types;
- later use OpenAPI generation or runtime validation if useful.

### Security Gap

Risk:

- mocked auth may hide real role/security needs.

Mitigation:

- label auth as stubbed;
- do not use real data;
- add Cognito/RBAC research before real pilot data.

### Table Performance

Risk:

- simple tables may become slow for large datasets.

Mitigation:

- use server pagination/filtering later;
- adopt MUI X Data Grid Community before reaching for paid features.

## Cost / Nonprofit Notes

No immediate nonprofit-cost entry is required if using:

- React;
- Vite;
- TypeScript;
- Material UI Core;
- MUI X Data Grid Community.

MUI X Pro/Premium are paid commercial products. If advanced grid features become necessary, research nonprofit pricing/discounts and add details to:

- `nonprofit-cost-programs-running-list.md`

I added MUI X Pro/Premium to the future paid services list there as a candidate to revisit only if needed.

## Recommended Next Action

Create the Phase 7 staff web prototype spec:

- `specs/backoffice-poc/staff-transaction-review-thin-slice.md`

The spec should define:

- admin shell layout;
- navigation items;
- transaction list columns;
- transaction detail panel fields;
- status chip labels;
- mocked data shape;
- API client boundary;
- loading/empty/error states;
- auth stub behavior;
- what is deliberately out of scope: staff edits, exports, portfolio dashboard, loans, real auth.

Then build the staff thin slice after the backend sync endpoint exists, or build it against mocked data if implementation order favors UI prototyping first.

## Sources

- Vite getting started: https://vite.dev/guide/
- React TypeScript guide: https://react.dev/learn/typescript
- TypeScript React docs: https://www.typescriptlang.org/docs/handbook/react.html
- Material UI usage: https://mui.com/material-ui/getting-started/usage/
- Material UI TypeScript: https://mui.com/material-ui/guides/typescript/
- Material UI supported components: https://mui.com/material-ui/getting-started/supported-components/
- Material UI Drawer: https://mui.com/material-ui/react-drawer/
- Material UI Drawer API: https://mui.com/material-ui/api/drawer/
- MUI X Data Grid quickstart: https://mui.com/x/react-data-grid/quickstart/
- MUI X licensing: https://mui.com/x/introduction/licensing/
- MUI pricing: https://mui.com/pricing/

## Learn More

Best first reads:

- Vite guide: https://vite.dev/guide/
- React TypeScript guide: https://react.dev/learn/typescript
- Material UI usage: https://mui.com/material-ui/getting-started/usage/
- MUI X Data Grid quickstart: https://mui.com/x/react-data-grid/quickstart/

Good search terms for beginner-friendly follow-up reading:

- `React Vite TypeScript admin dashboard Material UI`
- `Material UI Drawer AppBar admin layout`
- `MUI Data Grid community vs pro`
- `React admin table detail panel pattern`
- `TypeScript API client React fetch error handling`

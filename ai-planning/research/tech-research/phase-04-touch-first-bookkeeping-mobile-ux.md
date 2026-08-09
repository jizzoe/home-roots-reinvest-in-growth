# Phase 04 Research: Touch-First Bookkeeping Mobile UX

Date: 2026-08-08

Related plan:

- `../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md`
- `phase-01-mobile-foundation-react-native-expo-typescript.md`
- `phase-02-offline-first-sqlite-sync-architecture.md`
- `phase-03-thin-backend-sync-slice-spring-boot-modular-monolith.md`

## Question

What should the first touch-first mobile bookkeeping workflow look like for sales, expenses, recent transactions, low-connectivity states, and simple profit reporting?

## High-Level Summary

The MVP mobile app should start with manual touch entry as the dependable baseline. Speech, receipt scanning, OCR, and AI can improve speed later, but the app must remain usable when those tools fail or are unavailable.

The first screen set should be small:

1. Home / today summary
2. Add transaction
3. Review and save
4. Recent transactions
5. Simple profit summary
6. Sync issues / retry, if needed

The first transaction-entry workflow should support:

- sale or expense;
- amount;
- optional category;
- optional note;
- occurred date/time defaulting to now;
- clear review before save;
- visible saved/sync state after save.

Use plain bookkeeping language:

- "Sale" instead of "credit revenue account"
- "Expense" instead of "debit expense account"
- "Saved on this phone" instead of "local unsynced row"
- "Sent" or "Backed up" instead of "server accepted"
- "Needs review" instead of "conflict"

For one-currency MVP, store money internally in integer minor units and format display with locale-aware tools. Do not hard-code assumptions that every future currency uses two decimal places.

## 101 Background

### What Is Touch-First UX?

Touch-first UX means the app is designed primarily for fingers on small screens. It assumes:

- limited screen space;
- imprecise taps compared with a mouse;
- one-handed use;
- distractions and interruptions;
- on-screen keyboards covering content;
- slow or intermittent sessions;
- users who may not know accounting vocabulary.

For this project, touch-first is the fallback workflow. If speech transcription, receipt scanning, or AI classification fails, the business owner still needs to record a sale or expense quickly.

### What Is A Transaction-Entry Flow?

A transaction-entry flow is the path a user follows to record a business event.

For the MVP:

```text
Choose sale or expense
  -> enter amount
  -> choose optional category
  -> add optional note
  -> review plain-language confirmation
  -> save locally
  -> sync later or immediately
```

This flow should be fast, but not reckless. Financial records need confirmation before final save.

### What Is Low-Connectivity UX?

Low-connectivity UX is how the app behaves when the network is slow, unavailable, or unstable.

The main rule: do not leave users guessing.

The app should clearly communicate:

- what was saved locally;
- what is waiting to sync;
- what has synced;
- what failed;
- what the user can do next.

### What Is Locale-Aware Formatting?

People write and read numbers, dates, and currency differently depending on region and language.

Examples:

- United States: `$1,234.56`
- Germany: `1.234,56 €`
- Japan: `￥1,235`
- India: `₹1,23,456.78`

Locale-aware formatting means the app uses platform/browser internationalization APIs instead of hand-building strings with `"$" + amount`.

### What Is A One-Currency MVP?

A one-currency MVP means the pilot app supports only one operating currency, such as USD, for a business.

This simplifies:

- transaction entry;
- reports;
- profit calculations;
- backend validation;
- ledger design;
- grant reporting.

But the code should still store currency code explicitly, because future expansion may require different countries or businesses.

## Foundational Concepts

### Minimum Screen Set

Recommended MVP screens:

- `Home`: today/this-week summary and primary actions.
- `AddTransaction`: manual transaction entry.
- `ReviewTransaction`: confirm before saving.
- `RecentTransactions`: local list with sync status.
- `ProfitSummary`: revenue, expenses, and profit for a selected period.
- `SyncIssues`: failed or needs-review items.

The first prototype can combine `Home`, `AddTransaction`, and `RecentTransactions` into one screen, but the product model should recognize them as separate workflows.

### Primary Action

Each screen should have one obvious primary action.

Examples:

- Home: "Add sale" and "Add expense" may be the two primary actions.
- Add transaction: "Review"
- Review: "Save"
- Sync issue: "Try again"

Avoid crowding early screens with reporting, loan, receipt, speech, and settings actions. Those can be secondary.

### Tap Target Size

Touch targets need to be large enough for fingers.

Good baselines:

- Android / Material guidance: at least 48 x 48 dp.
- Apple guidance: at least 44 x 44 pt.
- WCAG enhanced target-size guidance: 44 x 44 CSS px.

For this project, use at least 48 logical pixels for interactive controls in React Native unless a platform-specific component already provides an accessible hit area.

### Plain-Language Labels

The UI should avoid accounting terms where possible.

Use:

- "Money in" / "Sale"
- "Money out" / "Expense"
- "Saved on this phone"
- "Waiting to send"
- "Sent"
- "Could not send"
- "Needs review"

Avoid:

- debit;
- credit;
- journal;
- posting;
- reconciliation;
- idempotency;
- server revision;
- conflict.

Those concepts belong in the backend and developer documentation, not recipient-facing UI.

### Confirmation Before Save

The app should show a review step before saving:

```text
Record a $50 expense for flour paid today?
```

This is especially important once speech/OCR/AI proposals are added. The same confirmation pattern should be used for manual, speech, and receipt-derived entries.

### Status Language

Map technical states to user language:

| Technical State | User-Facing Language |
|---|---|
| `queued` | Saved on this phone |
| `syncing` | Sending |
| `synced` | Sent |
| `failed` | Could not send |
| `needs_review` | Needs review |

Do not over-notify. A small row badge or status line is better than frequent modal dialogs.

### Feedback After Save

After saving, give immediate feedback:

- row appears in recent transactions;
- status says "Saved on this phone" or "Sent";
- optional snackbar/toast confirms save;
- user can continue entering another sale/expense.

Never block the user with a full-screen network spinner after local save.

### Error And Retry UX

Retry should be visible but calm.

For failed sync:

- keep the transaction visible;
- show "Could not send";
- provide "Try again";
- store the last error internally;
- do not ask the user to re-enter the transaction.

For validation rejection:

- show "Needs review";
- explain the fix in plain language if possible;
- avoid retrying forever.

### Amount Entry

Amount entry is the most important field.

Recommended behavior:

- show numeric keyboard;
- accept locale-appropriate decimal separator where possible;
- store integer minor units internally;
- show formatted currency in review;
- reject zero or negative amount for basic sale/expense create;
- avoid floating-point math for stored money.

### Category Selection

Category is useful, but should not block the first prototype.

MVP options:

- `Sale`
- `Food / supplies`
- `Transport`
- `Rent`
- `Utilities`
- `Other`

For a low-literacy workflow, category can be optional or default to "Other" with later correction.

### Local Reports

The first report should be simple:

```text
This week
Sales: $120
Expenses: $80
Profit: $40
```

This should be computed from local SQLite so it works offline. Label it clearly if not all records are synced.

### Accessibility

Accessibility is not separate from low-literacy design. It directly improves usability.

MVP rules:

- large tap targets;
- labels that remain visible after typing;
- sufficient color contrast;
- text labels with icons, not icons alone;
- logical focus order;
- screen-reader labels for icon-only controls;
- do not rely on color alone for status;
- avoid gesture-only actions;
- support font scaling where practical.

## Baeldung-Style Technology Introduction

### A Simple Transaction Flow In Practical Terms

The flow can be modeled as a small state machine:

```ts
type TransactionEntryStep = "editing" | "reviewing" | "saved";

type TransactionDraft = {
  type: "sale" | "expense";
  amountText: string;
  categoryId?: string;
  note?: string;
  occurredAt: Date;
};
```

User flow:

```text
editing
  -> user enters amount and details
  -> reviewing
  -> user confirms
  -> save to SQLite
  -> saved
```

This pattern works for manual entry now and AI proposals later.

### Amount Formatting In Practical Terms

Store money as integer minor units:

```ts
type Money = {
  amountMinorUnits: number;
  currencyCode: "USD";
};
```

Format for display:

```ts
function formatMoney(money: Money, locale = "default") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode,
  }).format(money.amountMinorUnits / 100);
}
```

This is acceptable for USD MVP. Later, use currency metadata because not every currency has two decimal places.

### Locale Detection In Practical Terms

Expo can read locale information:

```ts
import { getLocales, getCalendars } from "expo-localization";

const locale = getLocales()[0];
const calendar = getCalendars()[0];

console.log(locale.languageTag);
console.log(locale.currencyCode);
console.log(locale.decimalSeparator);
console.log(calendar.timeZone);
```

Use locale for display. Do not let device locale silently change the business's accounting currency.

### Status Badges In Practical Terms

Technical state:

```ts
type SyncStatus =
  | "queued"
  | "syncing"
  | "synced"
  | "failed"
  | "needs_review";
```

User label:

```ts
function syncStatusLabel(status: SyncStatus) {
  switch (status) {
    case "queued":
      return "Saved on this phone";
    case "syncing":
      return "Sending";
    case "synced":
      return "Sent";
    case "failed":
      return "Could not send";
    case "needs_review":
      return "Needs review";
  }
}
```

The UI can show both a small icon and the label. Do not rely on a color dot alone.

### Review Message In Practical Terms

Manual entry and AI proposal should converge on the same review text:

```ts
function reviewSentence(draft: TransactionDraft) {
  const direction = draft.type === "sale" ? "sale" : "expense";
  const amount = formatMoney(parseDraftAmount(draft));
  const category = draft.categoryId ? ` for ${draft.categoryId}` : "";

  return `Record a ${amount} ${direction}${category}?`;
}
```

In real implementation, category labels should be localized and human-readable.

## Recommendation

Build the touch-first workflow before speech, OCR, and AI.

For the first mobile prototype:

1. Make `Sale` and `Expense` the primary choices.
2. Make amount the most prominent input.
3. Include category and note as optional fields.
4. Include a review/confirmation step.
5. Save locally first.
6. Show recent transactions immediately after save.
7. Show local/sync status in plain language.
8. Show a simple local profit summary.
9. Enforce one business currency for MVP.
10. Use locale-aware display formatting.

Do not build:

- complex charting;
- full accounting reports;
- loan screens;
- receipt OCR;
- speech entry;
- staff review;
- multi-currency accounting.

Those follow after the manual offline workflow is proven.

## Primary Decisions

### What Is The Minimum Screen Set?

MVP screen set:

- Home / summary
- Add sale/expense
- Review transaction
- Recent transactions
- Profit summary
- Sync issues if failed items exist

Prototype compression:

- combine Home, Add, Recent, and Summary into one screen if implementation speed matters;
- keep Review as a distinct step or modal because it establishes the future AI-confirmation pattern.

### What Is The Default Transaction Flow?

Default manual flow:

```text
Tap Add sale or Add expense
  -> enter amount
  -> optionally choose category/note
  -> review sentence
  -> save
  -> see transaction in recent list
```

### What Works Offline?

Offline MVP:

- record sale;
- record expense;
- view recent transactions;
- view simple totals;
- see which entries are waiting to send;
- retry later.

Online-only or later:

- staff review;
- loan repayment;
- account setup;
- OCR/speech/AI;
- cross-device sync conflict UI.

### What Language Should Be Used?

Use plain action language.

Recommended labels:

- Add sale
- Add expense
- Review
- Save
- Saved on this phone
- Sending
- Sent
- Could not send
- Try again
- Needs review
- Sales
- Expenses
- Profit

Avoid implementation language:

- sync queue;
- ledger;
- idempotency;
- conflict;
- server;
- revision;
- debit;
- credit.

### How Should One-Currency MVP Work?

Recommended:

- business has one configured currency code;
- all mobile transactions include that currency code;
- amount entry assumes that currency;
- UI displays currency with `Intl.NumberFormat`;
- backend rejects unsupported currency;
- database stores currency code explicitly.

Do not:

- infer accounting currency from device locale;
- store money as floating-point values;
- omit currency code just because MVP is one currency.

## Alternatives Considered

### Speech-First MVP

Pros:

- aligns with long-term product vision;
- can reduce typing.

Cons:

- transcription, language switching, noisy environments, and confirmation UX add early uncertainty;
- manual fallback is required anyway;
- harder to debug before offline sync is proven.

Assessment:

- Defer. Build touch-first first, then add speech as another input path into the same review/confirmation flow.

### Receipt-First MVP

Pros:

- receipt capture is highly valuable;
- can reduce manual data entry.

Cons:

- camera permissions, image storage, upload queues, OCR, and review UI add complexity;
- manual transaction workflow still needed for cash sales and no-receipt expenses.

Assessment:

- Defer to Phase 5 after the manual transaction flow works.

### Dashboard-First MVP

Pros:

- reports are motivating and useful.

Cons:

- reports are only useful after there is data;
- too much dashboard design can delay the core record-entry workflow.

Assessment:

- Include only simple local totals at first.

### Full Accounting Terminology

Pros:

- closer to formal bookkeeping concepts.

Cons:

- wrong audience for recipient app;
- increases cognitive load;
- conflicts with project goal of no bookkeeping expertise required.

Assessment:

- Reject for recipient-facing UI. Keep accounting terms internal.

## Prototype Impact

Phase 4 prototype should prove:

- user can manually record sale/expense without network;
- amount entry is fast and hard to misread;
- transaction review sentence is understandable;
- saved transaction appears immediately;
- recent list shows plain-language status;
- failed status offers retry without re-entry;
- summary shows sales, expenses, and profit from local data;
- UI controls are large enough for touch;
- screen text does not depend on accounting vocabulary.

Acceptance checks:

- all primary tap targets are at least 48 x 48 logical pixels;
- amount input uses numeric keyboard;
- save does not wait for network;
- no modal spinner blocks after local save;
- status does not rely on color only;
- app still makes sense if all items are unsynced.

## Risks / Follow-Up

### Low-Literacy UX Risk

Risk:

- even "sale" and "expense" may be too abstract for some users.

Mitigation:

- field test labels;
- consider icons and examples;
- consider "Money in" and "Money out" variants.

### Currency Parsing Risk

Risk:

- parsing user-entered amounts across locales is harder than formatting.

Mitigation:

- MVP can restrict input format while displaying formatted output;
- store minor units;
- add explicit parsing tests;
- avoid accepting ambiguous formats silently.

### Category Complexity

Risk:

- categories may become too detailed too early.

Mitigation:

- start with few categories;
- allow "Other";
- let staff or AI suggest corrections later.

### Over-Notification Risk

Risk:

- frequent sync messages may annoy users or reduce trust.

Mitigation:

- persistent quiet row statuses;
- snackbar only for important state changes;
- no repeated warnings for expected offline use.

### Translation Risk

Risk:

- literal translations of financial terms may not match local business language.

Mitigation:

- use i18n infrastructure early;
- test translations with real users;
- prefer plain examples over technical terms.

## Cost / Nonprofit Notes

No new nonprofit-cost entry is required for Phase 4.

The researched topics are product design, accessibility guidance, and locale formatting. They do not introduce paid accounts.

Potential future paid items:

- professional translation/localization services;
- field usability testing incentives;
- icon or design asset libraries if not using free/open-source options.

Add those to `nonprofit-cost-programs-running-list.md` only if they become real purchase candidates.

## Recommended Next Action

Create the Phase 4 mobile workflow spec:

- `specs/mobile-poc/touch-first-transaction-workflow.md`

The spec should define:

- first screen layout;
- transaction draft model;
- sale/expense entry behavior;
- review sentence;
- local-save behavior;
- recent transaction row states;
- summary calculation;
- accessibility/tap-target acceptance checks;
- one-currency MVP rules.

Then update the prototype UI after Phase 2/3 persistence exists, or create a static interactive mock if implementation has not started yet.

## Sources

- Android Accessibility: Touch target size: https://support.google.com/accessibility/android/answer/7101858
- Android Developers: Make apps more accessible: https://developer.android.com/guide/topics/ui/accessibility/views/apps-views
- W3C WAI WCAG input modalities: https://www.w3.org/WAI/WCAG22/Understanding/input-modalities.html
- W3C WAI target size: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
- Material Design accessibility: https://m1.material.io/usability/accessibility.html
- Material Design buttons: https://m2.material.io/develop/android/components/buttons
- Material Design text fields: https://m2.material.io/design/components/text-fields.html
- Material Design snackbars: https://m2.material.io/go/design-snackbar
- Material Design offline states: https://m1.material.io/patterns/offline-states.html
- Apple Human Interface Guidelines: Text fields: https://developer.apple.com/design/human-interface-guidelines/text-fields
- Apple Human Interface Guidelines: Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons
- Expo Localization SDK: https://docs.expo.dev/versions/latest/sdk/localization/
- Expo Localization guide: https://docs.expo.dev/guides/localization/
- MDN Intl.NumberFormat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
- MDN Intl.DateTimeFormat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
- MDN JavaScript internationalization: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationalization
- web.dev Offline UX design guidelines: https://web.dev/articles/offline-ux-design-guidelines

## Learn More

Best first reads:

- web.dev offline UX design guidelines: https://web.dev/articles/offline-ux-design-guidelines
- Expo localization guide: https://docs.expo.dev/guides/localization/
- Material Design accessibility: https://m1.material.io/usability/accessibility.html
- Apple text fields guidance: https://developer.apple.com/design/human-interface-guidelines/text-fields

Good search terms for beginner-friendly follow-up reading:

- `mobile form UX amount entry financial app`
- `offline UX saved locally syncing failed retry`
- `React Native accessibility touch target`
- `mobile low literacy UX financial services`
- `Intl.NumberFormat currency React Native`
- `Expo localization i18n-js tutorial`

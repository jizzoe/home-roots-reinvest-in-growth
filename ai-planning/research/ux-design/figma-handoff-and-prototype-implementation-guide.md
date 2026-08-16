# Figma Handoff and Prototype Implementation Guide

Status: Working guide
Scope: M1 Rapid Thin-Slice Prototype
Companion: [M1 Mobile UI Design Brief and Screen Inventory](../../design-briefs/m1-mobile-ui-design-brief-and-screen-inventory.md)

## Purpose

Provide a practical, low-overhead way to turn the approved UX brief and visual concepts into editable Figma frames and then into the React Native prototype. This guide is designed for an engineer who has collaborated with designers but has not previously authored a Figma file.

## What Codex Can and Cannot Do Here

Codex can create the screen concepts, visual tokens, component specifications, frame-by-frame build instructions, interaction/state notes, and React Native handoff material. The current session does not have a connected Figma integration, so Codex cannot create or edit native Figma files in the Home Roots Foundation workspace yet.

Connecting Figma and writing native files are external, account-level actions. They require a connected HRF-owned account and just-in-time user approval. Until then, this repository holds the complete, versioned design source material.

## Source of Truth

| Artifact | Owns |
| --- | --- |
| UX synthesis and M1 brief | Product language, user workflow, offline/confirmation rules, and data behavior |
| M1 mobile UI design brief | Screen inventory, visual system, component set, and layout rules |
| Generated PNG concepts | Approved visual reference and review target; not editable implementation source |
| Figma file | Editable frames, components, constraints, prototype links, and layout measurements |
| React Native code | Actual UI behavior, accessibility, local persistence, and device-specific implementation |

Do not let a PNG become the only specification. It cannot describe states, focus, validation, keyboard behavior, navigation, or offline persistence.

## Minimum Figma File

Create one HRF-owned Figma Design file named `Enterprise Growth App V1`. Keep all M1 work in this file to stay within the free Starter shared-file limit described in the Figma research.

Create these pages:

1. `00 Foundations` - color, type, spacing, icon, radius, and accessibility styles.
2. `01 Components` - reusable components and variants.
3. `02 M1 Manual Flow` - Home, manual sale/expense entry, review/confirm, and saved states.
4. `03 Speech and Receipt Variants` - later M1 proposal/capture states.
5. `04 Visual References` - generated PNG concepts, labeled and locked.
6. `05 Build Notes` - concise per-screen behavior/state annotations for implementation.

## Build a Screen in Figma

Use this sequence for every M1 screen:

1. Put its approved PNG in `04 Visual References`, label it with the asset filename, and lock it.
2. In the matching flow page, create a `360 x 800` Android frame. It represents a constrained device; check the same composition in a larger Android frame before accepting it.
3. Recreate the layout with real Figma text, Auto Layout, components, and vectors. Do not trace the PNG into flattened shapes.
4. Use the original Home Roots Foundation logo asset, not a logo embedded in a generated concept image.
5. Apply the approved token roles and spacing system. Use components wherever a pattern will recur.
6. Create the normal state plus the stated error, empty, focus, and confirmation variants before calling the screen complete.
7. Add prototype links for its expected forward and back behavior.
8. Add a short build note covering source data, validation, local-save result, sync wording, and exceptional states.

## Foundations to Create First

### Tokens

Use the provisional token set in the M1 mobile design brief: warm near-white surface, primary green, deep navy, coral-red expense/error emphasis, readable dark text, divider, and quiet surface. Confirm final contrast in Figma and the actual app before calling values production-ready.

Use a 4 dp spacing scale, 16-24 dp screen gutters, 16 px minimum body copy, and 48 dp minimum touch targets. Start with Roboto or another Android-legible sans serif that supports the initial locales.

### Components

Build the following on `01 Components` as reusable Auto Layout components:

- `AppHeader`: back affordance where needed, Home Roots logo, status.
- `SyncStatus`: saved on this phone, waiting to sync, synced, needs attention.
- `BusinessMetric`: label, icon, period/currency-aware amount, positive/expense/estimated variants.
- `BusinessMomentAction`: sale, expense, speech, receipt.
- `MoneyInput`: empty, focused, valid, validation-error variants.
- `SelectionRow`: label, selected value, icon, chevron, and disabled/error variants.
- `PrimaryBottomAction`: helper text plus full-width primary action.
- `TransactionReview`: entered/suggested source, editable values, summary, and confirm/cancel actions.
- `PlainLanguageMessage`: empty, success, and recoverable error variants.

## What Must Exist Before React Native Work

For each implemented screen, provide:

- One editable normal-state Figma frame.
- Variants for empty, validation/error, and loading/capture/sync states that apply.
- Exact visible copy, locale/currency assumptions, and icon meaning.
- Component references and measured spacing, rather than a screenshot alone.
- Prototype links or a written navigation table.
- A small behavior note: source data, default values, input validation, confirm/cancel result, local persistence result, and sync outcome.

The rapid prototype does not require every future V1 screen or a full production design system. It does require that the manual sale/expense flow and its review/save/offline states are unambiguous.

## React Native Handoff

Images are sufficient to start visible layout work, but not to implement the prototype safely or consistently. Use all of the following together:

| Need | Implementation source |
| --- | --- |
| Visual hierarchy and tone | Approved PNG concept plus editable Figma frame |
| Dimensions, alignment, and reusable controls | Figma Auto Layout/components and design tokens |
| User-facing copy and interaction rules | UX synthesis and M1 mobile design brief |
| Local transaction, proposal, receipt, and sync behavior | M1 rapid prototype brief and relevant OpenSpec requirements |
| Final behavior/accessibility | React Native implementation and device testing |

Screen images alone do not specify navigation, focus, keyboard, scrolling, validation, disabled states, correction, accessibility labels, text scaling, localization, or SQLite/offline behavior. Treat them as a visual acceptance target, not a complete engineering contract.

## Suggested M1 Sequence

1. Establish foundations and components from the selected Home-screen template.
2. Rebuild Home and `Record sale` in Figma from their approved PNG references.
3. Draw the unified review-and-confirm screen and its saved-locally result.
4. Add the expense variant using the same entry template.
5. Add receipt and speech proposal states only after the manual flow is stable.
6. Implement React Native from the combined brief, frame, and state notes; compare screenshots on a representative Android device to the Figma frames.

## Current Assets

- [Home screen concept](../../design-assets/home-roots-mobile-home-screen-concept-v1.png)
- [Record sale concept](../../design-assets/home-roots-mobile-record-sale-concept-v1.png)
- [Record expense concept](../../design-assets/home-roots-mobile-record-expense-concept-v1.png)
- [Review sale concept](../../design-assets/home-roots-mobile-review-sale-concept-v1.png)
- [Review expense concept](../../design-assets/home-roots-mobile-review-expense-concept-v1.png)
- [Saved locally concept](../../design-assets/home-roots-mobile-sale-saved-locally-concept-v1.png)
- [First-use empty Home concept](../../design-assets/home-roots-mobile-home-empty-concept-v1.png)
- [Scan receipt concept](../../design-assets/home-roots-mobile-scan-receipt-concept-v1.png)
- [Review receipt concept](../../design-assets/home-roots-mobile-review-receipt-concept-v1.png)
- [Use speech concept](../../design-assets/home-roots-mobile-use-speech-concept-v1.png)
- [Review speech concept](../../design-assets/home-roots-mobile-review-speech-concept-v1.png)

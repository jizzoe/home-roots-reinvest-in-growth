# React Native UI and Design-System Options

Research date: 2026-08-12  
Scope: Free/open-source React Native components and foundations that create a consistent mobile UI and reduce custom implementation work.

## Answer

Yes. React Native has open-source component libraries analogous to a company's internal component system: buttons, text fields, dialogs, menus, lists, checkboxes, switches, progress indicators, theming, accessibility behavior, and icons. There is no single universal library with every specialized mobile control, especially a desktop-style data table. A reliable approach is:

1. Choose one maintained UI foundation.
2. Define a project-owned theme and a small set of domain components on top of it.
3. Add focused, well-maintained packages only for components the foundation does not provide well, such as a native date/time picker, chart, or virtualized data list.

For the entrepreneur mobile app, **React Native Paper + a project-owned `ui/` layer** is the recommended starting point. It is free/open source, has a broad standard component set, Material Design 3 theming/accessibility conventions, current maintenance, and works cleanly with Expo. Its material appearance must be customized rather than adopted unchanged so the product retains the calm, low-literacy, mobile-first UX in the JLP design brief.

## Important Design-System Boundary

Do not let any third-party library become the product's design system. The design system should live in this project and include:

- Semantic color roles: primary action, neutral surface, success, caution, error, sync state, and readable high-contrast text.
- Typography roles: display, screen heading, section heading, body, label, helper, and numeric amount.
- Spacing, touch-target, radius, elevation, and icon-size tokens.
- Shared components: `AppButton`, `MoneyInput`, `TransactionTypeButton`, `ConfirmationSheet`, `SyncStatus`, `MetricCard`, `EmptyState`, `ReceiptCapture`, `PlainLanguageError`, and `ScreenLayout`.
- Accessibility defaults: minimum touch target, screen-reader labels, focus order, text scaling, contrast, offline/error copy, and localization support.

This insulation makes a later library migration feasible and ensures the UI follows the Business Journal's needs rather than a generic Material or iOS visual template.

## Full UI Foundation Options

| Option | What it provides | Strengths | Risks / fit |
| --- | --- | --- | --- |
| **React Native Paper** | Material Design components, theme provider, inputs, buttons, dialogs, lists, menus, FABs, progress, chips, and more. | Mature, broad, Expo-friendly, free/open source, standard Material accessibility/interaction patterns. Its site reports 55k weekly npm downloads, and current releases demonstrate active maintenance. [Paper overview](https://reactnativepaper.com/) [current releases](https://github.com/callstack/react-native-paper/releases) | Opinionated Material look; theme it carefully. It does not eliminate the need for specialty date/chart/table packages. **Recommended V1 foundation.** |
| **React Native Elements / RNEUI** | Ready-made UI kit with centralized `ThemeProvider`, buttons, input, overlay, list, and other common controls. | Open source, familiar all-in-one API, centralized theming. [RNEUI overview](https://reactnativeelements.com/docs/4.0.0-rc.4) | Current v4 documentation is still release-candidate; evaluate maintenance and Expo/RN compatibility on the selected SDK before committing. Good alternative when Paper's Material language is too prescriptive. |
| **Tamagui** | Cross-platform style system, optimizing compiler, and styled/unstyled component kit for React Native and web. | Strong option when sharing substantial mobile and web UI code matters; supports design-system composition and responsive adaptation. [Tamagui introduction](https://tamagui.dev/docs/intro/introduction) | More setup/concepts and current native requirements include React Native 0.81+ with New Architecture. Overkill for a mobile-first V1 unless a shared web/mobile UI codebase is a near-term goal. |
| **Gluestack UI** | Successor direction from the NativeBase team: universal/headless component approach. | Flexible and themable; NativeBase documentation itself recommends Gluestack for new projects. [NativeBase/Gluestack guidance](https://docs.nativebase.io/) | Evaluate Expo compatibility, maintenance cadence, and component quality in a spike. Do not start a new project on NativeBase v3 itself. |
| **Shopify Restyle** | TypeScript-enforced primitives for building a custom themed component library. | Excellent for project-owned tokens and typed design-system primitives; low visual lock-in. [Restyle overview](https://shopify.github.io/restyle/) | It is a foundation, not a full component catalog. Pair it with native/specialist controls and build more yourself. Strong alternative if custom brand control outweighs speed. |

## Focused Components You Will Still Need

The detailed library choice should be made in a small Expo spike, but expect to evaluate these categories separately:

| Need | Recommended direction | Why |
| --- | --- | --- |
| Navigation | Expo Router / React Navigation | App navigation is deliberately a separate concern from UI kits. Choose one before building screens. |
| Icons | `@expo/vector-icons` or the icon solution integrated by the selected foundation | Reuse familiar, labeled icons; do not hand-draw control icons. |
| Date/time picker | Community native date-time picker compatible with the chosen Expo SDK | This follows platform date/time behavior and is more reliable than an improvised calendar. |
| Progress indicator | Paper/RNEUI/Tamagui component where available; otherwise a project-owned semantic progress component | Useful for sync, upload, onboarding, and loan/milestone progress. |
| Lists / transaction history | Native `FlatList`/`SectionList` plus project item components | Mobile transaction history should be a performant list, not a desktop data table. React Native supplies core list/UI APIs. [React Native core components](https://reactnative.dev/docs/components-and-apis) |
| Data tables | Use a mobile list/detail/filter pattern; reserve a true data grid for the HRF web portal | A scrollable column grid is poor on small screens and does not fit JLP's low-literacy/mobile guidance. For the web admin portal, use Material UI Data Grid or another web system separately. |
| Charts / trends | A minimal chart library or custom SVG/canvas component after the report requirements are validated | Start with numbers, directional comparisons, and simple trend lines. Avoid chart dependencies until data is meaningful. |
| Forms/validation | Project form primitives plus a typed validation schema library | Financial input needs consistent validation, errors, confirmation, and localization. |
| Camera/receipts | Expo Camera/Image Picker and a project-owned capture/review flow | Treat capture/OCR as a domain flow, not a generic upload widget. |

## Specific Recommendation for the Enterprise Growth App

### Start With React Native Paper, But Wrap It

Use Paper for the commodity layer:

- `Button`, `TextInput`, `Checkbox`, `RadioButton`, `Switch`
- Dialog/bottom-sheet-like confirmation surface where appropriate
- `List`, `Card` only for individual repeated items, `Menu`, `Snackbar`
- `ActivityIndicator`, progress indicators, icon support, and theming

Then define project components that match the UX synthesis:

- `BusinessMomentAction`: Sale, expense, and cash movement choices with icon, plain-language label, and large target.
- `TransactionReview`: visibly separates entered/suggested/confirmed information and exposes `Edit`/`Confirm`.
- `SyncIndicator`: `Saved on this phone`, `Waiting to sync`, `Synced`, and `Needs attention` states.
- `BusinessMetric`: sales, expenses, profit, and money available with explicit period/currency/basis.
- `GuidanceCard`: one traceable observation plus optional suggested next action; clearly label any AI output.
- `CategoryPicker`: plain-language expense options; do not expose internal accounting categories.
- `ReceiptReview`: image, OCR result, correction fields, and safe manual fallback.

Avoid a permanent visual dependency on built-in `Card`/dashboard patterns. The app's home screen should remain an efficient, touch-first business check-in, not a generic material dashboard.

### Build a Design-System Package Early

Create a `src/ui/` or workspace package that owns tokens and exported project components. Feature screens import only this package where practical. This provides the same benefits as the prior company's shared components:

- consistent behavior and visual language;
- one accessibility/localization implementation for recurring controls;
- easier visual iteration from Figma/design decisions;
- less duplicated form/sync/error code;
- ability to change an underlying third-party component without rewriting all screens.

## Evaluation Criteria and One-Week Spike

Evaluate Paper and one alternative (RNEUI or Restyle) against the exact first flows rather than choosing by screenshots.

Build these in an Expo test app:

1. Home screen with metric hierarchy, recent transaction list, large actions, and sync state.
2. Sale/expense form with numeric amount, category, date, optional note, keyboard behavior, validation, and confirmation.
3. Language/text scaling and screen-reader pass.
4. Small Android device / bright contrast check.
5. Offline/failed-sync error and receipt upload progress state.

Select the foundation only if it can meet these without deep internal overrides, excessive bundle/native complexity, or compromising the product's plain-language and accessibility rules.

## What Not to Reuse Blindly

- Do not copy a web admin component library into the entrepreneur mobile app. Mobile and web have different interaction patterns.
- Do not adopt a library's default color palette, card-heavy layouts, data-table patterns, or technical error copy.
- Do not use a UI kit as evidence that a user journey is designed. Component availability does not resolve business-language, confirmation, offline, AI-trust, or pilot-usability decisions.
- Do not choose an abandoned/uncertain library based on historical popularity. Check releases, Expo SDK compatibility, issue response, license, accessibility, and native dependencies at the time of the spike.


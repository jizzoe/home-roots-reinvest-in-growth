# Beginner Tutorial: Build an M1 Screen in Figma

Status: Working guide
Audience: A backend engineer with no Figma or UX background
Companion: [Figma Handoff and Prototype Implementation Guide](figma-handoff-and-prototype-implementation-guide.md)

## What You Are Building

You are not trying to become a visual designer or recreate every pixel by hand. You are creating an **editable blueprint** for the React Native prototype: real text, meaningful component names, predictable spacing, and enough prototype links to review the user journey.

Start with only the four M1 manual-flow screens:

1. Home
2. Record sale (then reuse it for expense)
3. Review and confirm
4. Saved locally / updated Home

The approved PNGs are visual references. They show the intended appearance, but the Figma frame must be rebuilt with native Figma objects so it can be edited and measured.

## Before You Open Figma

Have these open in separate windows:

- [M1 Mobile UI Design Brief and Screen Inventory](../../design-briefs/m1-mobile-ui-design-brief-and-screen-inventory.md)
- [Figma Handoff and Prototype Implementation Guide](figma-handoff-and-prototype-implementation-guide.md)
- The current PNG concept from `ai-planning/design-assets/M1/`

Use one HRF-owned Figma Design file named `Enterprise Growth App V1`. Do not start a separate file for every screen.

## Learn Only What You Need

Work through these resources in order. Stop after each resource and apply the concept to one M1 component; passive video watching will not build the file.

| Order | Resource | Why it matters now |
| --- | --- | --- |
| 1 | [Guide to Auto Layout](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties) | Makes lists, buttons, and screen sections move correctly when text changes. Practice with the Home-screen action buttons. |
| 2 | [Figma for Education: Learning Auto layout](https://www.youtube.com/watch?v=PGYCZbP3xH4) | A beginner-friendly official video demonstration of Auto Layout. |
| 3 | [Guide to components in Figma](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma) | Explains the reusable building blocks you need for buttons, headers, and status indicators. |
| 4 | [Create and use variants](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants) | Shows how one component can have related states such as default, error, and disabled. |
| 5 | [Guide to prototyping in Figma](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma) | Covers frame connections and a testable click-through flow. |
| 6 | [Figma for Edu: Auto layout components](https://www.youtube.com/watch?v=wukJ1MTRxgQ) | Official workshop on combining components and Auto Layout once the basics are comfortable. |

These resources are useful because Auto Layout is intended to arrange content by direction, padding, gap, and alignment; components and variants preserve reuse; and Figma prototypes link top-level frames into testable flows. [Figma Auto Layout guide](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties) [Figma components guide](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma) [Figma prototyping guide](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma)

## One-Time File Setup

1. Create the file and add six pages: `00 Foundations`, `01 Components`, `02 M1 Manual Flow`, `03 Speech and Receipt Variants`, `04 Visual References`, and `05 Build Notes`.
2. On `04 Visual References`, drag in the Home, Record sale, and Review sale PNGs from `ai-planning/design-assets/M1/`.
3. Rename each image to match its filename, put each one in its own labeled frame, and lock it. Do not build production screens by placing buttons or text on top of a flattened screenshot.
4. On `00 Foundations`, add text notes for the M1 visual rules: warm near-white surface, deep navy headings, green primary action, darkened coral expense/error emphasis, 4 dp spacing scale, 16 px minimum body text, and 48 dp minimum touch targets.
5. Add the actual Home Roots Foundation logo file to `00 Foundations`. Use that source asset in real headers, not a logo copied from a generated PNG.

## First Exercise: Rebuild Home

### 1. Create the screen frame

1. Go to `02 M1 Manual Flow`.
2. Press `F` and choose a phone frame, or draw a frame at `360 x 800`.
3. Name it `M01 Home - populated`.
4. Give the frame the page-surface fill from the visual brief.
5. Turn on a layout grid only if it helps you learn alignment. Do not try to force every item to line up to a complex multi-column grid.

### 2. Build the vertical screen structure

1. Select the empty phone frame and add Auto Layout with `Shift` + `A`.
2. Set its direction to vertical, set a 16-24 dp horizontal padding, and add a consistent vertical gap between major sections.
3. Add these empty child frames, in order: `Header`, `Business snapshot`, `Quick actions`, and `Recent activity`.
4. Give each child frame a vertical Auto Layout only when it holds vertically stacked content. Keep the overall page simple.

Think of this like nested React Native `View` containers using `flexDirection: 'column'` and `gap`, not absolute-positioned `View`s.

### 3. Build the header

1. Make `Header` a horizontal Auto Layout frame with space between its children.
2. Add the real Home Roots logo at the left.
3. Add the `Saved on this phone` text plus a small status icon at the right.
4. Add the greeting, business name, and period below the first row as a vertical text group.
5. Check the result at 360 px wide. If the logo/status row collides, reduce logo width before reducing body-text legibility.

### 4. Build one metric row

1. Create a horizontal Auto Layout frame named `BusinessMetric`.
2. Add an icon container, then a text stack for the label, and then the amount aligned to the right.
3. Use one thin divider beneath the row; do not put every metric in a raised card.
4. Duplicate the row for `Money earned`, `Money spent`, and `Estimated profit`.
5. Select the completed row and create a component. Name it `BusinessMetric/Default`.

Do not create every possible variation yet. The goal is one reusable row that you can edit safely.

### 5. Build one quick-action button

1. Create a horizontal Auto Layout frame with an icon and visible label.
2. Apply a 48 dp minimum height, a restrained border radius, and a green outline/label treatment matching the concept.
3. Create a component named `BusinessMomentAction/Default`.
4. Make an instance for `Record sale`, then change only the text and icon. Repeat for `Record expense`, `Use speech`, and `Scan receipt`.
5. Put the instances in a two-column grid or two horizontal rows. Check that long labels do not overlap.

### 6. Build one recent-activity row

1. Create a horizontal Auto Layout frame: category icon, purpose text, signed amount, optional chevron.
2. Create a component named `TransactionListItem/Default`.
3. Use it twice in the Home frame with synthetic data.
4. Create an empty-state variant later, after the populated screen is correct.

## Build Record Sale and Review Sale

Follow the same pattern for the two existing concepts:

### Record sale

1. Duplicate the header pattern and name the frame `M03 Record sale - valid`.
2. Build the large amount field as a real text/input layout, not a text label pasted over the screenshot.
3. Build category and date as reusable `SelectionRow` components with a label, selected value, icon, and chevron.
4. Build the note row with visible optional wording.
5. Build the helper copy plus `Review sale` as a `PrimaryBottomAction` component.
6. Duplicate the frame and create `M03 Record sale - validation error`; show one clear error near the amount field, not an error on every field.

### Review sale

1. Duplicate the shared header and name the frame `M04 Review sale - manual`.
2. Add the source label `Entered by you` and the plain-language summary.
3. Build one editable detail row and make it a `TransactionReviewRow` component.
4. Use four instances for amount, item, date, and note.
5. Add a quiet `Cancel` action and a large `Confirm sale` primary action.
6. Duplicate the frame for later speech/receipt proposal states. Change the source label and raw-input area; do not create a separate visual system.

## Turn Repetition Into Components

Use components only after a pattern appears twice. Create variants only when a component has the same structure but a small, meaningful state change.

Good first variants:

- `MoneyInput`: default, focused, error.
- `SyncStatus`: saved, waiting, needs attention.
- `BusinessMomentAction`: sale, expense, speech, receipt.

Avoid a giant component with dozens of switches. A M1 prototype needs clarity more than a universal component platform.

## Link the Prototype

After the four manual-flow frames exist:

1. Open Figma's Prototype panel.
2. Make `M01 Home - populated` the starting point.
3. Connect `Record sale` to `M03 Record sale - valid` with `On click -> Navigate to`.
4. Connect `Review sale` to `M04 Review sale - manual`.
5. Connect `Confirm sale` to a brief `M05 Saved locally` frame or an updated Home frame.
6. Connect the back and cancel controls to the preceding screen.
7. Use a simple instant or short dissolve transition. Do not spend prototype time on elaborate animation.
8. Use Presentation view and click through the flow at phone scale.

The prototype is for reviewing the journey and copy. It does not replace React Native input, camera, SQLite, sync, or accessibility behavior.

## Add Build Notes

For every M1 frame, put a compact note beside the frame on `05 Build Notes`:

```text
Screen: M03 Record sale - valid
Initial data: type=sale, date=today, currency=HTG
Required input: amount
Optional input: item, note
Validation: amount must be a positive whole currency value
Forward action: Review sale opens M04; does not save a record
Back/cancel: discard unsaved input after the app's final policy is defined
Offline behavior: entry remains available without network access
```

## Definition of Done for One Screen

- The screen is a named top-level frame at the target phone size.
- All visible text is real text, not part of an image.
- Repeated controls are component instances.
- The normal state and relevant error/empty/confirmation states exist.
- The frame has a prototype path forward and back where applicable.
- A build note defines data, validation, save/confirmation, and offline behavior.
- The screen is checked at normal and larger Android widths and with longer localized text.

## Common Beginner Traps

- **Using a screenshot as the UI:** it cannot be measured, localized, reused, or inspected by developers.
- **Using Groups instead of Frames with Auto Layout:** groups do not provide responsive padding/gap behavior.
- **Drawing each repeated button from scratch:** it guarantees visual drift.
- **Starting with variants before a base component works:** first make one correct default component.
- **Copying web dashboards into mobile:** do not use data tables or dense multi-card grids in this entrepreneur flow.
- **Treating Figma links as complete requirements:** keep the business, confirmation, and offline rules in the M1 briefs.

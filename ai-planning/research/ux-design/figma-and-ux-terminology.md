# Figma and UX Terminology for the M1 Prototype

Status: Working glossary
Audience: A backend engineer new to Figma, UX, and recent React Native UI work
Companion: [Beginner Tutorial: Build an M1 Screen in Figma](figma-screen-building-tutorial.md)

## The Short Version

Figma is a shared visual workspace. It lets a team describe what a screen should look like and how a click-through demonstration should move. It does not replace the React Native application or its real behavior.

For this project, use the terms in this guide consistently. The goal is enough shared language to create and review the prototype, not to memorize design vocabulary.

## Core Figma Terms

| Term | Plain-language meaning | Closest engineering analogy | M1 example |
| --- | --- | --- | --- |
| Canvas | The large working area where you arrange work. | An IDE workspace. | The area holding all M1 phone frames. |
| File | A saved Figma document. | A repository document, not an app build. | `Enterprise Growth App V1`. |
| Page | A named work area inside a Figma file. | A folder or focused workspace. | `02 M1 Manual Flow`. |
| Frame | A container with explicit width and height. It represents a screen or a reusable layout area. | A React Native `View` with a defined layout boundary. | `M03 Record sale - valid` at 360 x 800. |
| Layer | Any individual object in the file: text, shape, icon, image, or frame. | A node in a UI tree. | The `Review sale` heading. |
| Group | A loose collection of layers that move together. | A code editor selection; not a durable layout container. | Use sparingly; prefer a frame for UI. |
| Auto Layout | Figma behavior that arranges items vertically, horizontally, or in a grid using padding, gap, and alignment. | Flexbox or a React Native `View` using `flexDirection`, `gap`, and alignment. | The stack of four review rows. |
| Padding | Empty space inside a container, between its edge and its contents. | `padding` in CSS/React Native. | 16 dp inside a primary button. |
| Gap | Intentional space between sibling items in an Auto Layout frame. | `gap` in Flexbox. | 12 dp between list rows. |
| Constraint | A resizing rule for a child layer when its parent changes size. | Anchoring or flex sizing behavior. | Keep the right chevron aligned to the trailing edge. |
| Style | A saved, reusable visual setting such as a text style or paint style. | A named constant or theme rule. | A `Screen heading` text style. |
| Variable | A reusable raw value such as a color, number, or string. Figma can switch it by mode. | A theme/config value. | `color/primary` set to the approved green. |
| Mode | A context-specific value set inside a variable collection. | An environment/theme variant. | Light vs. dark mode; not needed for M1 yet. |

Figma defines variables as raw values such as colors, numbers, and strings that can change by design context. [Figma variables overview](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes)

## Design-System Terms

| Term | Plain-language meaning | M1 example |
| --- | --- | --- |
| Design system | The shared rules and reusable pieces that make screens look and behave consistently. | The M1 colors, type, spacing, components, copy rules, and states. |
| Token | A named value used repeatedly instead of hardcoding it everywhere. Tokens make global changes safe. | `color/primary = #2D7A3D`, `space/4 = 16`, `radius/control = 8`. |
| Semantic token | A token named for its purpose, not its raw appearance. | `color/action-primary`, not `green-700`. |
| Foundation | The base visual rules: color, type, spacing, icon sizes, radii, and elevation. | The `00 Foundations` Figma page. |
| Component | A reusable UI building block whose main definition can update all copies. | `PrimaryBottomAction`. |
| Main component | The original, editable definition of a component. | The master `SelectionRow`. |
| Instance | A reusable copy connected to its main component. | A `SelectionRow` used for `Date`. |
| Variant | A related version of a component with a small state/configuration difference. | `MoneyInput` in default, focused, or error state. |
| Component property | A controlled value someone can change in an instance without breaking it. | A button-label text property or an icon on/off property. |
| Library | Components/styles published for reuse across files. | A shared package. Avoid creating a cross-file library for M1. |

A token is not a special Figma-only object. It is a team convention that gives a reusable value a stable purpose-based name. For this prototype, begin with a few color, spacing, type, and radius tokens; do not build hundreds of them.

## UI and UX Terms

| Term | Plain-language meaning | M1 example |
| --- | --- | --- |
| UI (user interface) | The visible controls, copy, layout, and feedback on a screen. | The `Record sale` amount field and button. |
| UX (user experience) | Whether the whole task is understandable, efficient, safe, and dignified. | Can someone record a sale without accounting training or connection? |
| User flow | The ordered path a person takes to finish a task. | Home -> Record sale -> Review -> Confirm -> Saved locally. |
| Screen | A top-level app view. | Home or Review sale. |
| State | The same screen/component under a different condition. | Empty Home, amount error, saved locally, needs attention. |
| Happy path | The normal, successful route through a task. | A valid sale is reviewed and confirmed. |
| Empty state | What a screen shows before it has data. | Home before any business activity is recorded. |
| Error state | What a screen shows when the user must correct or recover from a problem. | Amount is missing; receipt extraction failed. |
| Loading/progress state | Temporary feedback while work is happening. | Receipt photo is being processed. |
| Confirmation | An explicit user choice that finalizes an important action. | `Confirm sale` creates the local record. |
| Suggestion/proposal | Information the app inferred but has not made authoritative. | A receipt/OCR value waiting for review. |
| Information hierarchy | The order in which the eye notices content. | Amount first, then purpose/date, then review action. |
| Affordance | A clue that tells a user what can be done. | A button looks tappable; a chevron suggests a selectable row. |
| Progressive disclosure | Show the minimum necessary first; reveal optional detail only when useful. | Amount is required; note is optional. |
| Plain language | Words the user recognizes, with no unnecessary technical jargon. | `Money earned`, not revenue. |
| Accessibility | Making the experience usable with different abilities, devices, text sizes, and conditions. | Labels plus icons, high contrast, readable type, large tap targets. |
| Touch target | The tappable area, including invisible padding, not just visible text. | At least 48 dp for a main action. |
| Contrast | How visibly different foreground text/icon is from its background. | Navy text on near-white, checked for WCAG AA. |
| WCAG AA | A common baseline for readable text and non-text contrast. | Verify final text/action colors in Figma and the app. |
| Localization | Designing text and formatting so another language/locale can be used. | Leave room for Haitian Creole or French labels and locale-specific currency formats. |

## Prototype Terms

| Term | Plain-language meaning | M1 example |
| --- | --- | --- |
| Prototype | A clickable visual demonstration, not the implemented app. | Tapping `Record sale` moves to the entry frame. |
| Flow | A connected set of frames that represents a task journey. | The manual sale flow. |
| Starting point | The first frame shown when a prototype flow begins. | Home. |
| Hotspot | The layer that receives an interaction. | The `Review sale` button. |
| Connection | The link from a hotspot to its destination frame. | `Review sale` -> Review sale frame. |
| Trigger | The user action that starts an interaction. | On click/tap. |
| Action | What Figma does after the trigger. | Navigate to another frame. |
| Destination | The frame reached after an action. | Review and confirm. |
| Overlay | A frame shown over the current one. | A small action sheet; avoid unless it simplifies M1. |

Figma's prototype guide uses these same terms for connections, flows, starting points, triggers, actions, and destinations. [Figma prototyping guide](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma)

## Figma Versus React Native

| Figma concept | React Native concept | Important difference |
| --- | --- | --- |
| Frame | Screen-level component/view hierarchy | Figma frame is static until you connect it; React Native has real runtime layout. |
| Auto Layout | Flexbox layout | Auto Layout shows intended structure; React Native must handle actual screen size, keyboard, and text scaling. |
| Component / instance | React component / rendered usage | Figma components document visual reuse; React components own real behavior and accessibility. |
| Variant | Prop/state combination | Figma variants show expected states; application state determines which React view renders. |
| Prototype connection | Navigation action | Figma navigation is illustrative; the app must implement back stacks, params, and error behavior. |
| Text/style/token | Theme/constants/localized strings | The app needs typed values, localization, and tests. |
| Screenshot/PNG | Snapshot-test reference | A PNG has no behavior, measurements, or accessibility semantics. |

## M1 Words to Use Precisely

Use these distinctions in files, code, and conversations:

- A **manual entry** is information the entrepreneur typed or selected.
- A **proposal** is speech/OCR/AI-suggested information waiting for review.
- A **confirmed record** is created only after the user confirms.
- **Saved on this phone** means the record is durably local.
- **Waiting to sync** means the local record remains safe and will be sent later.
- **Synced** means the app has confirmed remote acceptance.
- **Needs attention** means a user action may be needed; it never means data is lost unless that fact is known.

## Do Not Worry About Yet

- A full company-wide design system or published Figma library.
- Dark mode, advanced variables, advanced animations, or responsive desktop layouts.
- Pixel-perfect visual effects that do not improve the business-recording task.
- Figma Make, code generation, or Dev Mode as a substitute for the approved brief and actual React Native review.

For M1, the useful skill is simple: make the core sale/expense flow clear, reusable, accessible, and reviewable before adding more screens.

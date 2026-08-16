# Image to Figma to React Native Tooling

Status: Research
Scope: Tooling options for turning reference images into editable Figma files, and Figma files into React Native + Expo code
Companions: [Figma Handoff and Prototype Implementation Guide](figma-handoff-and-prototype-implementation-guide.md) · [Figma Desktop Pricing and Nonprofit Research](../figma-desktop-pricing-and-nonprofit.md) · [React Native UI Design System Options](../react-native-ui-design-system-options.md)

## Purpose

Inventory the plugins, tools, and services that support two transitions — image to editable Figma, and Figma to React Native + Expo code — ordered by how official and how widely adopted they are, and then propose one end-to-end workflow for this project.

This is research, not a tooling decision. Nothing here is authorization to install a plugin, create an account, connect a workspace, or pay for a service.

## Constraints That Shape Every Choice Below

These come from [the existing pricing research](../figma-desktop-pricing-and-nonprofit.md) and materially narrow what is usable here:

- **Figma Starter (free) is the assumed plan.** Three shared design files, unlimited private drafts, no co-editing of drafts.
- **The remote Figma MCP server works on Starter, but Starter is limited to six MCP tool calls per month.** This is the single most important constraint in this document. It rules MCP out as a per-screen working loop and reserves it for a handful of high-value calls.
- **The desktop MCP server needs a Full or Dev seat on a paid plan.** Not available here.
- **Code Connect is Organization/Enterprise.** Out of reach, so component-accurate codegen from Figma is not available to this project regardless of which tool is chosen.
- **The target stack is Expo + React Native**, using project-owned components and React Native Paper — not generic web React with CSS.

The practical consequence: tools that emit **React + Tailwind for the web** are of limited value here, and much of the Figma-to-code market emits exactly that.

## Part 1 — Image to Editable Figma

### First-party (Figma's own)

| Tool | What it does | Fit here |
| --- | --- | --- |
| **Figma First Draft** (formerly Make Designs) | Prompt-to-design inside a Figma file via Cmd+K. Choose site/app wireframe or basic site/app, then describe the screen. | Useful for blank-page starts. **Draws from Figma's own UI libraries, not your design system**, so output needs reconciling with the project's tokens and components. Prompt-driven, not image-driven. |
| **Figma Make** | Generates interactive, clickable components and prototypes from a prompt, without code. | Prototype exploration. Same design-system caveat. |
| **Figma remote MCP server** | Beta. Can **write directly to the Figma canvas** and generate designs from live web UI — both remote-only capabilities. | Genuinely relevant, but the six-calls-per-month Starter cap makes it a scalpel, not a workflow. |

First Draft's documented limits are worth stating plainly: it is for mocking up components, sections, and screens — **not whole apps** — and it does not create prototype connections. Uncommon design patterns tend to come out poorly.

### Widely adopted plugins

| Plugin | What it does | Notes |
| --- | --- | --- |
| **Codia AI Design — Screenshot to Editable Figma Design** | The best-known screenshot-to-Figma converter. Text becomes editable text, buttons become groups/components, layout becomes frames, colors become reusable values, icons reconstructed where possible. Supports batch upload, crop, and ordered insertion. | The closest match to "AI builds Figma files from images." Adoption figures (300k+ designers, 1M+ designs) are **vendor-published**, not independently verified. |
| **html.to.design** | Imports a live URL or HTML into editable Figma layers. | Only useful when a reference exists as a real web page, not a static image. Excellent for capturing an existing product's patterns. |
| **Builder.io — Figma plugins** | Two-way: generates Figma designs with AI, and converts designs to code. | Strongest when used for the code direction (Part 2). |

### Other options

- **Google Stitch** — AI-native design canvas generating high-fidelity UI from text, uploaded images, sketches, or voice; relaunched March 2026 with an infinite canvas and context-aware agents. Image input makes it directly relevant; it is not a Figma plugin, so getting results *into* Figma is a separate step.
- **Uizard** — sketches and rough prompts to working UI. Long-established in the low-fidelity-to-UI niche.
- **Flowstep, UX Pilot, AIDesigner, Magic Patterns** — prompt-to-UI generators of varying maturity. Treat as exploratory.

## Part 2 — Figma to React Native + Expo

### First-party

| Tool | Reality check |
| --- | --- |
| **Figma Dev Mode MCP server** | Beta. Exposes `get_code`, `get_variable_defs`, `get_image`, and `get_code_connect_map`. **`get_code` returns a React and Tailwind representation by default** — web, not React Native. Its real value here is `get_variable_defs` (pulling actual spacing and color tokens instead of guessing) and `get_image`. React Native output requires the agent to translate, which is exactly where a coding agent with the project's component library in context does better than a converter. |
| **Figma Code Connect** | Officially supports React **and React Native**, and Expo is a React Native framework, so the path exists in principle. **Organization/Enterprise only** — not available to this project. Note for a future tier decision, not a current option. |

The honest summary: **there is no official, free, Figma-to-Expo code path.** The official tooling gives design *context* to an AI client; the React Native translation is the client's job.

### Widely adopted converters

| Tool | React Native support | Notes |
| --- | --- | --- |
| **Locofy** (Lightning / Classic) | Yes — React Native among React, Next.js, Gatsby, Angular, Vue. Delivered as a **Figma plugin export**: no chat iteration, no in-browser run. | Gives the most control over component boundaries through layer tagging. Reputation is built on output that reads as human-written. Classic mode trades setup time for control. |
| **Builder.io Visual Copilot** | **Partial** React Native support, plugin-based. Widest framework range overall. | Can map to your existing React components so output integrates rather than creating a parallel component tree — valuable in principle, but the mapping strength is on the web side. |
| **Anima** | React, Vue, HTML from inside Dev Mode. **No React Native.** | Deepest Figma integration of the three, but the wrong target for this project. |

Ranked for this project's stack: **Locofy** is the only one of the three with first-class React Native export. Builder.io is a partial second. Anima is not applicable.

### Other options

- **CodeTea** — Figma plugin emitting React Native, Flutter, SwiftUI, React, HTML, Vue, Android XML, and Compose. Broad target list; verify output quality before trusting it.
- **Community Figma-to-React-Native MCP servers** — several exist, generating RN components with typing, styling, hierarchy, and props via Cursor's MCP. Unofficial, unvetted, and they carry the usual third-party-MCP caution: they receive your design content.
- **Coding agent + exported assets** — no converter at all. Give the agent the frame image, the token values, and the project's component library, and have it write the screen directly.

## Part 3 — Skipping Figma Entirely

Worth naming, because for a prototype it may be the faster path:

- **v0 (Vercel)** — generates React components from prompts/images. Web React, so RN still needs translation.
- **Google Stitch / Uizard** — image or prompt to UI, exportable, with Figma as an optional stop rather than a required one.

The argument for keeping Figma in the loop is not code generation — it is that **a PNG cannot describe states, focus, validation, keyboard behavior, navigation, or offline persistence**, as the existing handoff guide already argues. Figma earns its place as the state and interaction record, not as a code source.

## Part 4 — Proposed Workflow

Designed around the Starter constraints, spending the six monthly MCP calls where they pay off most.

**Stage 1 — Reference image to draft Figma frames**

1. Collect reference images (competitor screens, generated concepts, sketches).
2. Run them through **Codia AI Design** in Figma to get editable layers rather than a flat image.
3. Expect to rebuild rather than accept: reconstructed layers will not match the project's tokens, Auto Layout conventions, or component set.

**Stage 2 — Reconcile against the project design system**

4. Rebuild the converted frames onto the `00 Foundations` and `01 Components` pages defined in the handoff guide — real colour, type, spacing, and radius styles; real components with variants.
5. This stage is manual and is the one that actually determines output quality. A converted screenshot that skips it produces code full of hardcoded values.
6. Annotate states, focus order, validation, and offline behaviour on `05 Build Notes`. No converter infers these.

**Stage 3 — Figma to Expo code**

7. Spend **one MCP call** on `get_variable_defs` to pull real token values once the foundations page is stable. Reuse that output locally rather than re-calling.
8. For each screen, give the coding agent: the frame image, the token values from step 7, the build notes, and the project's existing component library.
9. Have the agent write the screen in the Expo project using **project-owned components and React Native Paper** — explicitly not generic web React with CSS.
10. Use **Locofy** only where a screen is layout-heavy and a structural head start is worth the cleanup cost. Treat its output as a draft to be rewritten against the project components, never as a drop-in.

**Stage 4 — Verify on device**

11. Run on a real Android device, compare against the Figma frame, and check the behaviours the frame cannot express: offline persistence, restart survival, sync status, and confirmation flow.
12. Iterate in Figma first when a change is visual, in code first when it is behavioural.

### Why not a one-click pipeline

An image-to-Figma-to-code chain compounds three lossy conversions. Each step's errors become the next step's input, and none of the three knows the project's offline-first, confirmation-before-save rules. The workflow above deliberately puts a human reconciliation stage in the middle, which is where the design system is actually enforced.

## Limitations and Cautions

- **Vendor claims are unverified.** Adoption numbers, "production-ready code," and "pixel-perfect" language throughout this market are marketing. Evaluate on a real screen before committing.
- **Generated code is a draft.** None of these tools know the accessibility requirements, offline rules, or confirmation semantics this product depends on.
- **Third-party plugins receive your design content.** Any plugin or unofficial MCP server processing a Figma file is a data-sharing decision. With synthetic prototype data the exposure is low, but the decision should be explicit.
- **Installing plugins, connecting accounts, and paying for services all require approval** under this repository's boundaries and are not authorized by this research.
- **Figma pricing and AI features are moving quickly.** The MCP server and First Draft are both beta, and beta features change. Re-check before relying on any specific behaviour.

## Open Questions

- Is the six-calls-per-month MCP limit workable, or does the M1 mobile work justify a Professional seat sooner than the pricing research assumed?
- Is Locofy worth trialling on one representative screen, or is the coding-agent-plus-tokens path sufficient for a prototype of this size?
- Should reference images be converted through Codia at all, or is building directly from the UX brief onto the project design system faster given that stage 2 rebuild is unavoidable?

## Sources

- [Figma: Introducing our Dev Mode MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/)
- [Figma Help: Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Figma Help: Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
- [Figma Developers: Code Connect for React](https://developers.figma.com/docs/code-connect/react)
- [Figma Blog: Building a better First Draft for designers](https://www.figma.com/blog/figma-ai-first-draft/)
- [LogRocket: Figma AI in 2026 — everything it can do and what it still can't](https://blog.logrocket.com/ux-design/figma-ai-2026-quick-overview/)
- [LogRocket: How to structure Figma files for MCP and AI-powered code generation](https://blog.logrocket.com/ux-design/design-to-code-with-figma-mcp/)
- [Codia: Screenshot to Figma — the complete 2026 guide](https://codia.ai/blog/screenshot-to-figma-guide)
- [Codia Docs: Screenshot to editable Figma design](https://codia.ai/docs/screenshot-to-design)
- [sixtythirtyten: AI Figma-to-code in 2026 — Builder.io vs Locofy vs Anima](https://www.sixtythirtyten.co/blog/from-figma-to-code-ai-design-to-dev-workflows-in-2026)
- [gendesigns: Figma to code tools 2026 — 5 approaches compared](https://gendesigns.ai/blog/figma-to-code-alternatives)
- [RapidNative: Convert Figma to React Native — a practical guide](https://www.rapidnative.com/blogs/figma-to-react-native)
- [CodeTea Figma plugin](https://www.figma.com/community/plugin/1299643423790238613/codetea-figma-to-code-react-native-flutter-swiftui-reactjs-html-vue-android-xml-compose)
- [toools.design: Best AI tools for UI/UX designers 2026](https://www.toools.design/blog-posts/best-ai-tools-ui-ux-designers-2026)
- [Magic Patterns: Figma Make alternatives in 2026](https://www.magicpatterns.com/blog/figma-make-alternatives)

# Figma Desktop Pricing and Nonprofit Research

Research date: 2026-08-12

## Answer

**The Figma desktop application is free to download and is available on every Figma plan.** It provides the same core product functionality as using Figma in a browser, plus access to locally installed fonts and plugin/widget development. [Figma desktop-app guide](https://help.figma.com/hc/en-us/articles/5601429983767-Guide-to-the-Figma-desktop-app)

The desktop application itself does not require a paid license. Cost depends on the Figma workspace plan and the seat type required for collaboration/design features.

## Current Plan Structure

Figma's published pricing currently lists these USD seat prices:

| Plan | Full seat | Dev seat | Collaboration seat | Practical use |
| --- | ---: | ---: | ---: | --- |
| Starter | Free, limited access | Free viewer/limited access as applicable | Free | Individual work, drafts, and very small collaboration. |
| Professional | US$16/month | US$12/month | US$3/month | Small team requiring unlimited files/projects, team libraries, advanced prototyping, and easier developer handoff. |
| Organization | US$55/month, annual billing | US$25/month, annual billing | US$5/month, annual billing | Larger organization with centralized administration and shared libraries. |
| Enterprise | US$90/month, annual billing | US$35/month, annual billing | US$5/month, annual billing | Enterprise governance and security. |

Prices and included AI credits/features can change, so confirm at purchase. [Figma pricing](https://www.figma.com/pricing/)

## What the Free Starter Plan Supports

Figma's Starter plan is appropriate for the immediate V1 design work:

- Unlimited personal Draft files.
- Unlimited viewers for shared drafts.
- One shared team folder/project, with three total Figma Design and Figma Sites files in that folder. Each other Figma product, such as FigJam or Slides, has its own three-file limit in that folder.
- Draft files are unlimited, but Starter drafts cannot be co-edited with other editors; they can be shared with unlimited viewers.
- Figma's pricing FAQ states that anyone can use the Starter plan. [Figma pricing FAQ](https://www.figma.com/pricing-faq/)

The practical distinction is important: **there is no limit on private drafts, but there is a three-file limit for shared Figma Design files in the free team folder.** The current Figma file/folder documentation is the source of truth for these limits. [Figma file and folder limits](https://help.figma.com/hc/en-us/articles/1500005554982-Guide-to-files-and-folders)

For this project, a practical free setup is:

1. One HRF-owned Figma account/workspace, not a personal developer-owned workspace.
2. One initial `Enterprise Growth App V1` design file with pages for foundations, flows, mobile screens, prototype, and feedback.
3. Stakeholders added as viewers/commenters, which does not require full paid design seats.
4. A small project-owned design library of colors, typography, spacing, icon usage, buttons, input/confirmation/sync states, and mobile screen templates.

The Starter collaboration/file limit will become a constraint when the team wants multiple active design files, shared libraries, broader prototyping, or several paid editors. At that point, Professional is the sensible next tier; Organization/Enterprise are unnecessary for the V1 pilot unless an external governance requirement appears.

## Nonprofit Discount and Education Eligibility

Figma states that it **does not offer nonprofit discounts**. Its Education plan can be free for qualifying students and educators, but the FAQ specifically says nonprofits are not eligible for free Education teams merely because they are nonprofits. [Figma pricing FAQ](https://www.figma.com/pricing-faq/)

Therefore:

- Use Starter at no cost for initial wireframes, screen flows, and stakeholder review.
- Budget Professional only if the collaboration limits materially impede work.
- Do not plan on an HRF nonprofit discount from Figma. A person independently eligible as a student/educator may use an Education plan for genuine eligible educational work, but that should not be treated as the organization's production design-system license.

## Figma MCP, React Native, and Expo

### Can Starter Use Figma MCP?

Yes, with limits. Figma currently provides a hosted **remote MCP server** on all plans and seats. The remote option is link-based and does not require the desktop app. Figma's current documentation lists Codex by OpenAI among supported MCP clients. Starter users are limited to **six MCP tool calls per month**; the current free beta status does not remove that Starter rate limit. [Figma MCP introduction](https://developers.figma.com/docs/figma-mcp-server/) [Figma MCP plan/access documentation](https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/)

The local desktop MCP server is different: Figma documents it as available to Full or Dev seats on paid plans. Therefore, a free Starter account should plan to use the remote MCP server, not the desktop-selection workflow. [Remote vs. desktop MCP](https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers)

This Codex session does not currently have the Figma connector installed, so it cannot be used here until the Figma plugin is installed and the HRF Figma account is connected.

### Does Figma Support React Native + Expo?

Figma Code Connect explicitly supports **React (or React Native)**. Expo is a React Native framework, so the React Native route applies to an Expo codebase. Code Connect's purpose is to associate Figma components with the project's real code components so Dev Mode and MCP context can show accurate, reusable implementation examples. It is not an Expo-specific compiler or an application-build/deployment service. [Figma Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)

Code Connect is an Organization/Enterprise feature requiring a Full or Dev seat. It is a later design-system investment, not required for initial Expo screen development.

### Can a Non-UX Specialist Use This to Produce UI Code?

Yes, for a controlled, iterative workflow:

1. Start from the JLP UX synthesis and V1 screen-flow brief rather than an empty canvas.
2. Create basic mobile frames using a small project design system: colors, typography, spacing, button/input/metric/sync/confirmation components, and Auto Layout.
3. Use Figma MCP to let an AI client create or refine native Figma frames/components, then provide a selected-frame URL to the AI client as implementation context.
4. Ask the agent to implement the frame in the existing Expo project using the project-owned UI components and React Native Paper; do not ask for generic web React/CSS.
5. Run the app on a real Android/iOS device or simulator, inspect it against the Figma frame and usability criteria, then iterate.

The limitation is material: Figma states that MCP provides structured design context and a code starting point; the **AI client**, not Figma MCP, generates final code. MCP is language/framework agnostic and does not automatically understand the project's components, accessibility rules, navigation, offline behavior, localization, business logic, or Expo configuration. [What Figma MCP sends vs. what the agent does](https://developers.figma.com/docs/figma-mcp-server/mcp-vs-agent/) [Why MCP often returns React-like context](https://developers.figma.com/docs/figma-mcp-server/server-returning-web-code/)

For V1, this is still useful: it can accelerate layout and component scaffolding. Treat the generated UI as a reviewed implementation draft. The human/engineering review must confirm touch target sizes, accessibility, localization, keyboard/camera behavior, Android/iOS differences, offline/sync states, secure data handling, and alignment with the Business Journal's confirmation and plain-language rules.

## Recommendation

Begin with the free desktop application and HRF-owned Starter workspace. Produce the V1 screen-flow/design brief first; that will reveal whether the three-file team limit is a practical problem. Purchase the minimum number of Professional full seats only when shared team libraries, unlimited projects/files, or sustained multi-editor work is actually needed.

Use Figma MCP only as a short, early proof of concept on Starter because six calls/month is too limited for routine design-to-code iteration. If the proof is valuable, a Professional Full/Dev seat improves MCP throughput and Dev Mode access; defer Organization/Enterprise and Code Connect until the team has a stable component system worth mapping.

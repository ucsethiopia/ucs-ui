---
name: component-selector
description: "Use to search 21st.dev using MCP, find 5 candidates, source the component, and apply it directly to the UI."
---

# Skill: Component Selector and Implementor (21st.dev)

> Browses 21st.dev via Chrome DevTools MCP (or Playwright) to find components relevant to UCS Ethiopia that would enhance our current frontend for our consultancy platform.
> Presents a curated shortlist of 5 candidates, extracts the chosen code, saves it, and directly applies
> it to the current project file to improve UI/UX.

---

## Instructions for Claude Code

When the user asks you to run the `component-selector` tool, follow these steps exactly in order:

### STEP 1: Understand Context
Analyze the current page or section the user is working on in the `ucs-ui` project. Understand the existing design system (navy/gold branding, strict Tailwind 4 rules, Framer motion, editorial minimalism).

### STEP 2: Browse 21st.dev
Use your `chrome-devtools` MCP server (or Playwright if unavailable) to navigate to `https://21st.dev`.
Search or browse the site for components that could replace, modify, or be added to our current website section to improve UI/UX.

### STEP 3: Present Shortlist
Identify the top 5 components that align with our use case.
Present them to the user explicitly detailing:
1. Component Name
2. Brief description of what it is and why it improves our UI/UX for the specific section.
Ask the user to explicitly choose one (or specify a different folder/choice).

### STEP 4: Extract and Save
Once the user chooses:
1. Navigate to the component's detailed page.
2. Extract the component's code (TSX/JSX) and any required dependencies.
3. Create the necessary files directly under `components/component-sourced/` (e.g., `components/component-sourced/[component-name].tsx`), converting code to React 19 / Next.js 16 where necessary, applying our `@/` path alias.

### STEP 5: Implementation & Review
1. Analyze how to replace/add the component into our current project codebase.
2. Outline the exact files you will modify to the user.
3. Ask for confirmation before modifying code.
4. Once confirmed, modify the files to integrate the component seamlessly, ensuring we use our strict typing and Tailwind v4 themes.
5. If there are new dependencies, make sure the user is informed to install them.

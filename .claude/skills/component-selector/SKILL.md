---
name: component-selector
description: "Use when sourcing a new UI component from 21st.dev for UCS, shortlisting candidates, extracting the chosen code, and producing integration guidance."
---

# Skill: Component Selector (21st.dev)

> Browses 21st.dev with UCS-specific intent, filters components by relevance to our
> use case, screenshots candidates, presents a curated shortlist, then extracts and
> saves the chosen component with an integration suggestion.
> Screenshots are deleted after the session.

---

## Usage

1. Paste the full prompt block below into Claude Code
2. Claude will browse, filter by relevance, and present a shortlist
3. You pick one — Claude extracts the code and tells you exactly how to apply it

---

## Prompt

```text
We are going to browse 21st.dev to find components relevant to the UCS Ethiopia
consultancy platform. This is NOT a general component hunt — you are filtering
specifically for our use case. Follow every step in order.

--- STEP 1: Setup ---

Create the required directories if they don't exist:
  mkdir -p screenshots
  mkdir -p components/sourced

--- STEP 2: Crawl 21st.dev and Build a Candidate List ---

Write and run a Playwright script at scripts/_component-selector.ts that does:

  1. Launch headless Chromium, viewport 1440x900
  2. Go to https://21st.dev and wait for network idle
  3. Extract ALL component titles, descriptions, and their URLs visible on the page
     (parse the DOM — get text content of all component card titles and subtitles)
  4. Save the full extracted list to screenshots/_21stdev_all_components.txt
     (one entry per line: "Title | Description | URL")
  5. Close the browser

Run: npx ts-node scripts/_component-selector.ts

--- STEP 3: Filter by UCS Relevance ---

Open screenshots/_21stdev_all_components.txt.

Read every entry. For each one, ask yourself:
  "Could this component serve a real purpose on an enterprise Ethiopian consultancy
   platform targeting banks, government, and international partners?"

Accept a component if it fits ANY of these UCS use cases:

  LAYOUT & STRUCTURE
  - Constrained max-width containers or centered layout wrappers
  - Section dividers or editorial spacing components
  - Responsive grid or masonry layouts for content cards

  NAVIGATION & WAYFINDING
  - Sticky or scroll-aware navbars
  - Breadcrumbs, tab bars, or step indicators
  - Smooth anchor-scroll or page transition patterns

  DATA & FINANCIAL DISPLAY
  - Ticker strips, scrolling data bars, or marquee-style displays
  - Stat counters or animated KPI number cards
  - Sparklines, mini charts, or data visualization primitives
  - Table components with sort/filter

  CONTENT & EDITORIAL
  - News card grids or article preview cards
  - Modal or drawer overlays for reading content
  - Quote blocks, testimonial cards, or case study layouts
  - Team member cards or profile grids

  CALLS TO ACTION & FORMS
  - CTA sections with headline + button
  - Contact or inquiry form layouts
  - Toast or notification components

  MOTION & POLISH
  - Scroll-triggered reveal animations (subtle, editorial)
  - Text fade-in or stagger animations for headings
  - Skeleton loaders or loading state patterns
  - Page transition wrappers

Reject a component if it matches any of these:
  - Playful, cartoon, or consumer-app aesthetic
  - Gaming, SaaS onboarding, or product tour UI
  - Emoji-heavy or overly colorful designs
  - Social media style interactions (likes, reactions)
  - Components that are purely decorative with no content purpose

--- STEP 4: Screenshot Each Candidate ---

For each component that passed the filter (there may be 10-20):

  Update the Playwright script to:
  1. Go to the component's URL
  2. Wait for network idle
  3. Take a screenshot saved to screenshots/_candidate_[slug].png
     where [slug] is a short kebab-case name from the component title
  4. Continue to the next candidate

  Run the updated script to capture all candidate screenshots.

--- STEP 5: Present the Top 5 Shortlist ---

Review all candidate screenshots alongside the component titles and descriptions.

Select the top 5 based on:
  1. Visual fit with UCS design direction (navy/gold, editorial luxury minimalism)
  2. Practical applicability — which page or section would this slot into?
  3. Implementation effort — prefer components that don't require a full refactor
  4. Uniqueness — avoid picking 5 similar things (e.g. don't pick 3 card variants)

Present the shortlist like this:

  1. [Component Name]
     What it does: [1 sentence]
     Where it fits on UCS: [specific page + section]
     Why it suits our aesthetic: [1 sentence]
     URL: [full URL]

  2. ...
  3. ...
  4. ...
  5. ...

Then ask me: "Which component would you like to use? Reply with a number (1-5)
or say 'none' to browse a specific category instead."

Wait for my answer before continuing.

--- STEP 6: Extract Code from Chosen Component ---

Once I give you a number:

  Update scripts/_component-selector.ts to:
  1. Go to the chosen component's URL
  2. Wait for full load
  3. Find and extract:
     a. The prompt text (copy-prompt block, textarea, or labeled prompt section)
     b. The full component code block (TSX/JSX)
     c. Any dependency or install instructions shown on the page
  4. Save prompt to screenshots/_component_prompt.txt
  5. Save code to screenshots/_component_code.txt
  6. Save install notes (if any) to screenshots/_component_deps.txt
  7. Close the browser

  Run the updated script.

--- STEP 7: Save to Filesystem ---

Read the extracted files and create:

  1. components/sourced/[component-name-kebab].tsx
     containing the raw component code exactly as extracted

  2. components/sourced/[component-name-kebab].prompt.md
     containing the following:

     # [Component Name]
     Source: [URL]
     Retrieved: [today's date]

     ## Original Prompt
     [prompt text]

     ## Dependencies
     [any install instructions found, or "None listed"]

     ## Suggested Integration for UCS
     Write a specific, concrete suggestion covering:
     - Which page this should go on (e.g. Home, Services, About)
     - Which section or position (e.g. "replace the current EconomicDashboard
       ticker row" or "add above the FirmNews carousel")
     - Which existing file(s) it would replace or complement
       (reference actual filenames from CLAUDE.md file structure)
     - Any props or data it would need wired up
       (e.g. "needs FXRate[] from useEconomicDashboard hook")
     - Any design token adjustments needed
       (e.g. "replace hardcoded #3b82f6 with var(--color-gold-500)")

     ## Stack Compatibility Notes
     Check against our stack and list any issues:
     - React 19 compatibility
     - Framer Motion 12 import paths
     - Tailwind 4 class syntax (e.g. bg-opacity-* should be bg-navy/50)
     - TypeScript strict mode — any implicit any types
     - Import paths — convert to @/ alias

--- STEP 8: Cleanup ---

Delete all temporary files:

  rm -f screenshots/_21stdev_all_components.txt \
        screenshots/_candidate_*.png \
        screenshots/_component_prompt.txt \
        screenshots/_component_code.txt \
        screenshots/_component_deps.txt \
        scripts/_component-selector.ts

--- STEP 9: Final Report ---

Tell me:
  - Component name and source URL
  - The two files saved under components/sourced/
  - The specific integration suggestion (where + how it fits into UCS)
  - Whether it needs adaptation before use, and what specifically
  - Suggested next prompt to actually integrate it
```

---

## Output Structure

```text
components/
  sourced/
    [component-name].tsx            <- raw extracted code
    [component-name].prompt.md      <- source, prompt, integration plan, compat notes
```

---

## After You Pick a Component

Use this follow-up prompt to integrate it:

```text
Read components/sourced/[component-name].prompt.md.
Follow the Suggested Integration section.
Before making any changes:
  1. Show me exactly which files you will modify or create
  2. Show me where in the component tree it will live
  3. List any imports or dependencies to install first
Then wait for my approval before touching any files.
```

---

## Variant: Browse a Specific Category

If you already know what you're looking for, narrow the search in Step 2:

```text
Instead of the 21st.dev homepage, start from:
  https://21st.dev/?category=animation     <- motion components
  https://21st.dev/?category=data          <- data display
  https://21st.dev/?search=ticker          <- ticker/marquee
  https://21st.dev/?search=card            <- card layouts
```

Add to the prompt before Step 2:

```text
Start from this URL instead of the homepage: [YOUR URL]
Apply the same UCS relevance filter from Step 3.
```

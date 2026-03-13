---
name: legacy-scraper
description: "Use to scrape content (Motto, CTA, About text) from the legacy ucsethiopia.com site and replace placeholders in the current codebase."
---

# Skill: Legacy Scraper and Identifier

> Connects to the legacy `ucsethiopia.com` website to extract static content
> (motto, landing page CTAs, about us text, etc.) that does not come from our APIs,
> and seamlessly patches our new UI codebase to replace placeholder text.

---

## Instructions for Claude Code

When instructed to run the legacy scraper skill, follow this procedure:

### STEP 1: Browse Legacy Site
Use the `chrome-devtools` MCP server (or Playwright if unavailable) to navigate to `https://ucsethiopia.com` and load the page.

### STEP 2: Identify and Scrape Static Data
Analyze the legacy site structure. We already receive economic data, news, and team members via API. We ONLY need:
- Company Motto
- Landing Page Call-to-Action (CTA) text
- About Us text variations
- Other textual placeholder data not covered by APIs

### STEP 3: Replace Placeholders
Analyze the current codebase (`ucs-ui`), looking for placeholder text in `app/page.tsx` or any `components/home/`, `components/about/` sections.

Ask the user: "I found this text ... on the legacy site. Should I replace the placeholder ... in `file.tsx`?" Wait for confirmation.

### STEP 4: Document Missing Data
If any placeholder data remains that cannot abide by API or the legacy site, open `PLAN.md` and append those instances for stakeholder review. Do not just delete them. Note down what is missing and leave the placeholder.

### STEP 5: Report to User
Provide a summary of what was replaced exactly, what files were updated, and what was noted down in `PLAN.md`.

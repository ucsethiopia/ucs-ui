---
name: ui-review
description: "Use when reviewing the current UCS UI via screenshots, scoring phase criteria, identifying regressions, and fixing top visual issues."
---

Run `npx ts-node scripts/screenshot.ts` to capture the current state of the UI.

Once the screenshot is saved to `screenshots/`, do the following:

1. Check if a previous screenshot exists in `screenshots/` from before the current
   changes. If one exists, note the filename so we can compare before vs. after.

2. Open and analyze the latest screenshot against these phase-specific criteria:

   Phase: [CURRENT PHASE — e.g. "Phase 6: News Page Layout"]

   Criteria:
   - [CRITERION 1 — e.g. "Is the max-width container centered and capped at 1440px?"]
   - [CRITERION 2 — e.g. "Are skeleton loaders visible during async states?"]
   - [CRITERION 3 — e.g. "Does the color scheme match the navy/gold editorial palette?"]
   - [CRITERION 4 — add or remove as needed]

3. For each criterion, mark it as:
   - ✅ Looks correct
   - ⚠️ Needs minor adjustment (describe what)
   - ❌ Broken or missing (describe what)

4. If a before screenshot exists, note any visible regressions introduced since then.

5. Summarize your findings in two lists:
   - What looks good (keep as-is)
   - What needs fixing (ordered by visual impact, highest first)

6. Fix top 3 issues

7. Confirm improvement. If score < 8/10, repeat from step 4.
8. When satisfied, note what was improved in `PLAN.md`

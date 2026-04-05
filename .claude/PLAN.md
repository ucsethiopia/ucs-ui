# PLAN.md — UCS Ethiopia Frontend Sprint

> Active branch: `feat/ux-overhaul`
> Last updated: 2026-04-04 (session 10)

---

## Sprint Goal

Bring the site to production-ready quality matching McKinsey/BCG-tier digital presence. Remaining work: hotfixes from session 10, live API hardening (LRU cache, skeleton fix), color system migration, logo/image asset integration, graph polish, and a full UI review pass before demo prep.

---

## Active Work

### Hotfix Batch — Session 10 New Issues

These are the immediate priority before resuming the phase queue.

#### HF-1 — Color Scheme Migration _(no blockers)_

- [x] **HF-1.1** Audit current `globals.css` — verify the default color scheme is ucs-brand navy/gold color
- [x] **HF-1.2** Audit current `globals.css` to make sure dark mode in broswers don't invert anything. Also make sure the default mode is alwasy the company brand color

#### HF-2 — Client & Partner Logo Hover Effects _(no blockers)_

- [x] **HF-2.1** Audit current marquee hover state for client logos (`brightness-95` default, `brightness-100 scale-110` hover) — increase brightness boost to match new spec (visibly brighter + scaled)
- [x] **HF-2.2** Apply identical static display + hover treatment to partner logos section (currently partners may not have same hover behavior as clients)
- [x] **HF-2.3** Confirm hover effect is consistent across both rows; test at multiple viewport widths
- [x] **HF-2.4** Remove partner logo background treatments and scale all partner logos proportionally so they read consistently
- [x] **HF-2.5** Refine partner logo sizing for a more balanced, visually appealing presentation across the row

#### HF-3 — Background Images: About & Services _(BLOCKED: waiting on Natoli's image decision)_

> **Dependency**: Natoli selects final images and copies to `public/images/`. Claude Code handles integration.

- [x] **HF-3.1** Implement and Confirm UCS own logo renders correctly in navbar and footer at all breakpoints.
- [x] **HF-3.2** _(Natoli)_ Choose hero/section background image for About page; copy to `public/images/about-bg.jpg` (or similar)
- [x] **HF-3.3** _(Natoli)_ Choose background image for Services page; copy to `public/images/services-bg.jpg`
- [x] **HF-3.4** Integrate images using `next/image` with `fill` layout, `object-cover`, correct `objectPosition`; add to `next.config` `remotePatterns` if external
- [x] **HF-4.4** Verify no layout shift (CLS) introduced; confirm images render across dark/light modes

#### HF-5 — Data Visualization & Performance

- [x] **5.1 Economic Dashboard Refinement**:
  - Adjust 3-graph aspect ratio (reduce horizontal stretch, increase vertical presence).
  - Add responsive padding to the container row to balance white space.
- [x] **5.2 LRU Cache Implementation**:
  - Implement indefinite TTL LRU cache for commodities historical data to minimize redundant API calls.
  - Store data thinned (downsampled) from original ~6000 lines (5 years) to ~1000 points in cache overhead.
  - Set cache to manually refresh through the API only once every 12 hours, using cached data as fallback.
- [x] **5.3 Loader Resilience**: Fix bug where skeleton loaders fail to reset/disappear after API failure or subsequent successful fetch.

---

## Remaining Phase Queue

### Phase 12 — News + About Improvements

- [ ] **12.2** _(Paused)_ Date-range filter for news archive (month/year picker against `publishedAt`)
- [x] **12.3** Improve `NewsModal` — drop cap, pull quote typography, keyboard trap, smooth open/close
- [x] **12.4** Fix the news filtering system so tag filtering works reliably again
- [x] **12.5** Update the available news filter tags to match the real content tags, including leadership
- [x] **12.6** Unify the news tag set between the home page and news page so both use the home-page tag list under the News section
- [ ] **12.7** _(Paused)_ The news api returns multiple tags, but we only display one. Suggest a fix for that

### Phase 13 — Remaining API Tasks

- [x] **13.1** Image audit — enforce `aspect-square object-cover object-top` on team photos; `aspect-video object-cover` on news cards; `object-contain` in news modal carousel; migrate bare `<img>` tags to `next/image`
- [x] **13.2** Use percentage based change key value pair from api for trend change. 
- [x] **13.3** Use the team/team_member endpoint data appropriately
- [x] **13.4** Commit + push, note phase 9 complete

### Phase 13.9 — Stakeholder Data Confirmation Gate 

- [ ] **13.9.1–13.9.10** Confirm/correct: vision, mission, SPEED descriptions, contact details, partner list, client list, stats, milestone years, team bios, publications, `internationalTrainingCountries`; flip `logoMissing` flags as assets arrive. (Natoli Will Provide two documets with data to compare against)

### Phase 14 — Component Sourcing (21st.dev)

- [ ] **14.0** UI review pass — all pages
- [ ] **14.1** Animated stats/metrics display
- [ ] **14.2** Team members pages
- [ ] **14.3** Services animations
- [ ] **14.3** Global Partners Section
- [ ] **14.4** Hero background element (subtle gradient or geometric SVG, no parallax)
- [ ] **14.5** Service comparison / feature-matrix table
- [ ] **14.6** Timeline component for About milestones
- [ ] **14.7** Integrate sourced components, style to brand tokens
- [ ] **14.8** UI review pass on all affected pages

### Phase 15 — Security + Performance

- [ ] **15.1** Security audit — XSS vectors, no exposed secrets, CSP headers in `next.config`
- [ ] **15.2** Bundle size audit — `ANALYZE=true npm run build`, eliminate heavy deps
- [ ] **15.3** Image optimization — all `<img>` → `next/image`, explicit dimensions, WebP
- [ ] **15.4** Core Web Vitals — Lighthouse (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- [ ] **15.5** Final build verification — clean `npm run build` with zero TS errors + ESLint warnings

### Phase 16 — Demo Prep

- [ ] **16.1** Full-site UI review — all pages: home, about, services, news, contact, 404
- [ ] **16.2** Cross-browser — Chrome, Firefox, Safari (macOS + iOS)
- [ ] **16.3** Mobile viewports — iPhone SE (375px), iPhone 14 Pro (393px), iPad (768px)
- [ ] **16.4** Deploy to staging — Vercel preview, share URL with stakeholders
- [ ] **16.5** Demo script — page-by-page walkthrough notes + talking points
- [ ] **16.6** Final stakeholder sign-off on UI, content, and data

---

## Current Task

> > **13.4** — Phase 13: Commit + push

---

## Blocked Items

| Item                                  | Blocker                          | Owner            |
| ------------------------------------- | -------------------------------- | ---------------- |
| HF-3 Partner logos                    | Natoli sourcing + rembg pipeline | @Natoli74        |
| HF-4 About/Services background images | Natoli selects images            | @Natoli74        |
| Phase 13.9 data confirmation          | Stakeholder review               | Stakeholders     |
| Home page section reorder             | Input from @jaft24               | @Natoli74        |
| Google Maps embed (Contact)           | Maps API key decision            | Project decision |

---

## Content Gaps

| #   | Item                                        | Status                                                                                     |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | Milestone timeline years (2014, 2017, 2020) | ⚠️ Unconfirmed                                                                             |
| 2   | Hero sub-copy                               | ⚠️ Adapted, not sourced from firm                                                          |
| 3   | SPEED core value descriptions               | ⚠️ Claude-written, needs stakeholder sign-off                                              |
| 4   | Team member bios                            | ⚠️ Blocked on stakeholders                                                                 |
| 5   | Partner logos (all 10)                      | ⚠️ Missing                                                                                 |
| 6   | Client logos (6 of 19)                      | ⚠️ Siinqee Bank, CBE, VisionFund, United Insurance, IRC, National Alcohol & Liquor Factory |
| 7   | Publications list completeness              | ⚠️ 2 confirmed; may be more                                                                |
| 8   | Oda publication year                        | ⚠️ null — confirm with stakeholders                                                        |

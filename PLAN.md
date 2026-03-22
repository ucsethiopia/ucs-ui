# PLAN.md — UCS Ethiopia Frontend Sprint

> Active branch: `feat/ux-overhaul`
> Last updated: 2026-03-22 (sessions 3 / 3b — post-session update)

---

## Sprint Goal

Complete the remaining frontend phases (6–16): ship the News archive page, Contact page, apply global polish, integrate live APIs, and resolve all outstanding UX/layout issues — then continue with UI refinements, news/about improvements, real content scraping, component sourcing, security/optimization, and demo prep — bringing the site to production-ready quality that matches McKinsey/BCG-tier digital presence.

---

## Ordered Task List

### Phase 6 — News Page (Full Archive)
- [x] **6.1** Build news grid layout reusing `FirmNews` card components
- [x] **6.2** Add category filter pills (All, Firm News, Economic, etc.)
- [x] **6.3** Implement initial load (top N items) with "Load More" pagination
- [x] **6.4** Wire up `NewsModal` for article reading (no page navigation)
- [x] **6.5** Mock API pagination behavior via `useNews` hook
- [x] **6.6** Use the UI-review skill to make sure the news page is working displaying, polished and refined

### Phase 7 — Contact Page
- [x] **7.1** Add React Hook Form + Zod validation to contact form
- [x] **7.2** Integrate `POST /contact` endpoint (or mock) with success/error toast via `sonner`
- [x] **7.3** Build office information panel (address, phone, email, hours)
- [x] **7.4** Decision: remove static map image OR embed interactive Google Maps
- [x] **7.5** Use the UI-review skill to make sure the contact page is working displaying, polished and refined
- [x] **7.6** Commit changed made and note that phase 7 is complete, push code to current branch

### Phase 8 — Polish & Refinement
- [x] **8.1** Apply global max-width constraint (~1440px, horizontally centered) — Infisical-style
- [x] **8.2** Align mock data shapes with API doc format
- [x] **8.3** Scale navbar font proportionally to page content
- [x] **8.4** Remove `EconomicNews` component from home page and route
- [x] **8.5** Implement scroll-triggered reveal animations across all sections
- [x] **8.6** Animated count-up for stats (About page)
- [x] **8.7** Spacing and alignment audit
- [x] **8.8** Mobile UX pass
- [x] **8.9** Accessibility pass
- [ ] **8.10** Reorder home page sections — BLOCKED, skipped
- [x] **8.11** UI review pass
- [x] **8.12** Commit and push

### Phase 9 — Mock Data → Live API Integration *(SKIPPED — APIs not yet live)*
- [ ] **9.1** Replace `useEconomicDashboard` mock with live endpoints
- [ ] **9.2** Replace `useNews` mock with `GET /news/latest` and `GET /news`
- [ ] **9.3** Replace `useTeam` mock with `GET /team` and `GET /team/{name}`
- [ ] **9.4** Wire contact form to `POST /contact`
- [ ] **9.5** UI review pass
- [ ] **9.6** Commit and push

### Phase 10 — UX/UI Fixes
- [x] **10.1** Restructure financial data layout — TickerBar + EconomicDashboard + MarketAnalytics
- [x] **10.2** Implement native-themed 404 page
- [x] **10.3** Add skeleton loaders for all async data components
- [x] **10.4** Replace marquee placeholder text with actual logos
- [ ] **10.4b** Source logos for 5 strategic partners — *(in progress — images being processed from PDF source)*
- [x] **10.5** Improve Training pillar animation on services page
- [x] **10.6** Add commodity symbols to economic dashboard
- [x] **10.7** Add x/y axis reference values to dashboard charts
- [x] **10.8** Split `EconomicDashboard` component
- [x] **10.9** Creative team-member detail page
- [x] **10.10** UI review pass
- [x] **10.11** Commit and push

### Phase 11 — UI/Layout Refinements
- [x] **11.1** Fix hero section proportions
- [x] **11.2** Fix TickerBar positioning
- [x] **11.3** Improve card hover states
- [x] **11.4** Audit and complete footer
- [x] **11.5** Dark mode consistency pass
- [x] **11.6** Button and CTA hierarchy audit
- [x] **11.7** Typography scale audit
- [x] **11.8** Services page section polish
- [x] **11.9** About page visual flow
- [x] **11.10** UI review pass
- [x] **11.11** Fix Hero background image
- [x] **11.12** Hero height decision — `h-[85vh] min-h-[650px]`
- [x] **11.13** Refactor Economic Dashboard + remove MarketAnalytics
- [x] **11.14** News multi-image support with Embla carousel in modal
- [x] **11.15** Hero entrance animation overhaul

### Phase 12 — News + About Improvements
- [ ] **12.2** Add date-range filter to news archive
- [ ] **12.3** Improve `NewsModal` — better article typography, keyboard trap, smooth open/close
- [x] **12.4** About page — "Our Story" section rebuilt: two-column grid, milestone timeline with circle badges + connector lines, ScrollReveal animations

### Phase 13 — Content Scraping + Real Copy
- [x] **13.1** Research UCS Ethiopia existing web presence
- [x] **13.2** Extract and adapt service descriptions
- [ ] **13.3** Extract team member information — real names scraped; bios blocked on stakeholders
- [ ] **13.4** Identify brand-consistent photography style
- [ ] **13.5** Update team members with real names/titles (blocked on bios)
- [x] **13.6** Replace hero tagline, sub-copy, about page narrative, mission, vision, core values
- [ ] **13.7** Stakeholder review checkpoint

### Phase 14 — Component Sourcing (21st.dev)
- [ ] **14.1** Source testimonials / social-proof component
- [ ] **14.2** Source stats / metrics display component
- [ ] **14.3** Source hero background element
- [ ] **14.4** Source service comparison table component
- [ ] **14.5** Source timeline component
- [ ] **14.6** Implement sourced components
- [ ] **14.7** UI review pass

### Phase 15 — Security + Performance Optimization
- [ ] **15.1** Security audit
- [ ] **15.2** Bundle size audit
- [ ] **15.3** Image optimization
- [ ] **15.4** Core Web Vitals pass
- [ ] **15.5** Final production build verification

### Phase 16 — Demo Prep
- [ ] **16.1** Full-site final UI review
- [ ] **16.2** Cross-browser testing
- [ ] **16.3** Mobile device testing
- [ ] **16.4** Deploy to staging/preview
- [ ] **16.5** Prepare demo script
- [ ] **16.6** Final stakeholder review

---

### Phase 16.1 — Remaining UI Polish
- [ ] Apply correct margin and padding to Ethiopian Economic Dashboard section so it scales and resizes responsively across all breakpoints
- [ ] Resize all images site-wide so they don't get cut off — audit hero, team, news, and service images for `object-fit`/`object-position` issues
- [ ] Enlarge client logos in marquee and increase brightness — scale up logo container size, apply `brightness-110` or `brightness-125` filter
- [ ] Source and integrate base background images for About Us page hero and Services page hero (using company-provided photos once processed)
- [ ] Update all site copy to match firm profile documents — audit every page against CONTENT.md, fix any remaining placeholder text
- [ ] Add "Message from the CEO" section — MD Fanta Tesgera (PhD), use message text from company profile PDF; add to About page after origin story or as standalone home page section
- [ ] Wire team detail pages to live API — ensure all fields from `GET /team/{name}` (education, experience, skills, projects, grants) are displayed on team member page
- [ ] Publications section *(low priority)*
- [ ] Training country map component *(low priority)*

---

### Phase 16.0 — Visual Gap Analysis & Improvements *(completed session 6)*
- [x] **G1** FirmNews editorial grid
- [x] **G2** Home stats strip
- [x] **G3** Hero headline scale
- [x] **G4** Stats dark band
- [x] **G5** Remove CoreValues from About
- [x] **G6** Services program grid
- [x] **G7** Contact map polish
- [x] **G8** Dashboard card contrast

---

### Session 3 — Dashboard Restructure *(completed 2026-03-22)*
- [x] Remove ESX section from `EconomicDashboard`
- [x] Add commodity sparkline graphs — Gold (XAU/USD), Silver (XAG/USD), Coffee (KC1) — historical data from 2015
- [x] Add GDP / T-Bill / Policy Rate as compact text row below graphs

---

### Session 3b — UI Polish *(completed 2026-03-22)*
- [x] **3b.1** Rename dashboard heading → "Ethiopian Economic Dashboard" (`economic-dashboard.tsx`)
- [x] **3b.2** Dark mode overhaul — remove light mode; default theme `blue-black` (navy); second theme `inverted` (warm charcoal ~`#302e2c`); updated `ThemeProvider`, `globals.css` (renamed `.dark`→`.blue-black`, added `.inverted` CSS variable block, updated `@custom-variant dark` to cover both themes), `theme-toggle.tsx` (icons: `Contrast` / `Building2`)
- [x] **3b.3** Core values icons updated to match SPEED acronym: `Synergy→Users2`, `Provision→BadgeCheck`, `Enthusiasm→Zap`, `Endurance→Target`, `Dedication→Scale`; icon container changed to gold ring circle style (`rounded-full ring-1 ring-gold-500/20 bg-gold-500/10 text-gold-500`, icon `h-8 w-8`)
- [x] **3b.4** `text-justify` applied to all multi-line prose `<p>` elements in `about/page.tsx` (story paragraphs, milestone descs, mission/vision), `service-pillars.tsx` (description), `services-overview.tsx` (card descriptions)
- [x] **3b.5** Logo hover overflow fix — `overflow-x-hidden py-3` on scrollRef div (required for JS `scrollLeft`); parent `<div class="relative">` no longer clips vertically
- [x] **3b.6** Sparkline gradient enhanced — `stopColor={color}` added to gradient stops, `fillOpacity` removed, unique `gradientId` per instance via `React.useId()` (`charts.tsx`); XAU/USD chart color changed to green `oklch(0.72 0.17 142)`
- [x] **3b.7** Constraint edges — `xl:border-x xl:border-border/20` added to `max-w-[1440px]` container in `layout.tsx`
- [x] **3b.8** About page Our Story — heading + eyebrow moved full-width above grid; grid changed to `items-stretch`; milestone rows use `flex-1` so both columns start and end at same level; connector lines stretch proportionally via `flex-1`

---

## Upcoming Session Order

| Priority | Session | Focus |
|----------|---------|-------|
| **Next** | Phase 16.1 | Remaining UI Polish |
| 2 | Phase 15 | Security Review |
| 3 | Phase 16 | Full-site UI Review |
| 4 | Outsourcing | 21st.dev components + Claude/Anthropic plugins *(Stitch/Google removed from plan)* |

---

## Current Task

>> **Phase 16.1** — Starting with dashboard responsive margin/padding fix.

---

## Decisions Log

| Decision | Rationale |
|----------|-----------|
| Phases executed in order (6→7→8→9→10) | Sequential dependencies |
| `NewsModal` for article reading (no routing) | Keeps user on page, faster perceived navigation |
| `sonner` for toast notifications | Already installed |
| oklch-based navy/gold design tokens | Locked in Phase 1; do not introduce new color variables |
| shadcn/ui primitives via `components/ui/` | Do not modify directly |
| Max-width ~1440px centered container | Infisical-inspired constraint |
| Bloomberg-style ticker for FX/commodity data | Phase 10 restructure |
| Navbar + TickerBar chrome | Option B: dark navy always-on, `h-14` navbar, `top-14 h-10` ticker |
| Footer layout | Full-width outside `max-w-[1440px]` wrapper |
| Two dark themes: `blue-black` + `inverted` | No light mode — default is navy dark; toggle switches to warm charcoal (~`#302e2c`) |
| `@custom-variant dark` covers both themes | `dark:` Tailwind utilities activate under `.blue-black *` and `.inverted *` |
| About Our Story grid restructure | Heading full-width above grid; `items-stretch` + milestone `flex-1` rows ensures both columns start and end at same level |

---

## Content Gaps (Phase 13)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Milestone timeline years | ⚠️ Not on legacy site | Founding year 2012 confirmed; others estimated |
| 2 | Hero sub-copy | ⚠️ No equivalent on legacy | Adapted from About intro |
| 3 | Services hero description | ⚠️ No equivalent on legacy | Kept existing copy |
| 4 | Core value descriptions | ⚠️ Titles replaced; descriptions not on legacy | Real titles used |
| 5 | Team member bios | ⚠️ Not published on legacy site | Real names scraped; bios need stakeholders |

---

## Blocked Items

| Item | Blocker | Owner |
|------|---------|-------|
| Home page section reorder (8.10) | Needs input from @jaft24 | @Natoli74 |
| Live API base URL / auth config | Backend deployment config not yet in repo | Backend team |
| Actual client logos for marquee | Real logos not provided | UCS stakeholders |
| Services hero background image | No image provided | UCS stakeholders |
| Interactive Google Maps embed (7.4) | Requires Maps API key decision | Project decision |
| Strategic partner logos (10.4b) | Not yet sourced | UCS stakeholders |

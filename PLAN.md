# PLAN.md — UCS Ethiopia Frontend Sprint

> Active branch: `feat/ux-overhaul`
> Last updated: 2026-03-11

---

## Sprint Goal

Complete the remaining frontend phases (6–10): ship the News archive page, Contact page, apply global polish, integrate live APIs, and resolve all outstanding UX/layout issues — bringing the site to production-ready quality that matches McKinsey/BCG-tier digital presence.

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
- [x] **8.1** Apply global max-width constraint (~1440px, horizontally centered) — Infisical-style (`max-w-7xl` applied to EconomicDashboard and MarketAnalytics)
- [x] **8.2** Align mock data shapes with API doc format — `interestRate.policyRate/tbillYield`, `gdp.value/year`, `esx.aggregate`, added GBP/AUD FX rates
- [x] **8.3** Scale navbar font proportionally to page content
- [x] **8.4** Remove `EconomicNews` component from home page and route
- [x] **8.5** Implement scroll-triggered reveal animations across all sections (Framer Motion `useInView`)
- [x] **8.6** Animated count-up for stats (About page)
- [x] **8.7** Spacing and alignment audit — reduce excessive vertical whitespace
- [x] **8.8** Mobile UX pass (touch targets, responsive breakpoints)
- [x] **8.9** Accessibility pass (contrast ratios, focus states, aria labels)
- [ ] **8.10** Reorder home page sections (coordinate with @jaft24) — BLOCKED, skipped
- [x] **8.11** Use the UI-review skill to make sure the website is working displaying, polished and refined
- [x] **8.12** Commit changed made and note that phase 8 is complete, push code to current branch

### Phase 9 — Mock Data → Live API Integration
- [ ] **9.1** Replace `useEconomicDashboard` mock with `GET /fx/latest`, `/commodities/latest`, `/interest`, `/gdp`, `/esx/latest`
- [ ] **9.2** Replace `useNews` mock with `GET /news/latest` and `GET /news` (paginated)
- [ ] **9.3** Replace `useTeam` mock with `GET /team` and `GET /team/{name}`
- [ ] **9.4** Wire contact form to `POST /contact` (Mailgun email notification)
- [ ] **9.5** Use the UI-review skill to make sure the website is working displaying, polished and refined
- [ ] **9.6** Commit changed made and note that phase 9 is complete, push code to current branch  

### Phase 10 — UX/UI Fixes
- [x] **10.1** Restructure financial data layout:
  - FX rates (6) + commodities (3) → Bloomberg-style `TickerBar` fixed below navbar (`components/home/ticker-bar.tsx`)
  - NBE policy rate + T-bill yield + ESX aggregate → compact number cards in `EconomicDashboard`
  - Charts relocated to new `MarketAnalytics` section (`components/home/market-analytics.tsx`)
- [x] **10.8** Split `EconomicDashboard` component — now < 150 lines; charts extracted to `MarketAnalytics`
- [ ] **10.2** Implement native-themed 404 page (`app/not-found.tsx`)
- [ ] **10.3** Add skeleton loaders for all async data components (dashboard, news, team)
- [ ] **10.4** Replace marquee placeholder text with actual/AI-generated logos styled to brand
- [ ] **10.5** Improve Training pillar animation on services page
- [ ] **10.6** Add commodity symbols to economic dashboard display
- [ ] **10.7** Add x/y axis reference values to dashboard charts
- [ ] **10.9** Implement a creative and artistic way to display the team-member information in the about us section under team when "learn more" is clicked. Make sure data is matched from api docs
- [ ] **10.10** Make sure the entire website is responsive and works on all devices, use the UI iterate skill to check and fix any issues
- [ ] **10.11** Commit changed made and note that phase 10 is complete, push code to current branch  

---

## Current Task

>> **Phase 8.12** — Commit and push Phase 8

---

## Pending Review

| Item | Status | Notes |
|------|--------|-------|
| Navbar + TickerBar visual treatment | **Awaiting stakeholder review** | Two options prototyped (screenshots in `screenshots/`). Currently on **Option B** (unified dark navy chrome: `bg-navy-950/80 backdrop-blur-sm` on both navbar and ticker always, hero `background-position: center 30%`). **Option A** (scroll-aware transparency matching navbar behavior) is also available — see `screenshots/option-a.png` vs `screenshots/option-b.png`. Revert by swapping `ticker-bar.tsx` transparency logic and restoring navbar `bg-transparent` on homepage+not-scrolled. |

---

## Decisions Log

| Decision | Rationale |
|----------|-----------|
| Phases executed in order (6→7→8→9→10) | Sequential dependencies: polish requires complete pages; API integration replaces mocks after UI is finalized |
| Reuse `FirmNews` card component for news grid | Avoids duplication; consistent card design across home and archive |
| `NewsModal` for article reading (no routing) | Decided in Phase 3; keeps user on page, faster perceived navigation |
| `sonner` for toast notifications | Already installed; used in contact form success/error feedback |
| oklch-based navy/gold design tokens | Locked in Phase 1; do not introduce new color variables |
| shadcn/ui primitives via `components/ui/` | Do not modify directly; use composition and wrappers |
| Max-width ~1440px centered container | Infisical.com-inspired constraint for editorial luxury feel |
| Bloomberg-style ticker for FX/commodity data | Phase 10 restructure; removes cluttered flat-grid layout |
| Remove `EconomicNews` section | Planned removal; reduces home page length and duplication |
| Navbar + TickerBar chrome style | Currently Option B (dark navy always-on). Option A (transparent, scroll-aware) prototyped. Pending stakeholder decision. |

---

## Blocked Items

| Item | Blocker | Owner |
|------|---------|-------|
| Home page section reorder (8.9) | Needs input from @jaft24 | @jaft24 |
| Live API base URL / auth config | Backend deployment config not yet in repo | Backend team |
| Actual client logos for marquee | Real logos not provided; AI-generated fallback possible | UCS stakeholders |
| Services hero background image (Phase 5 leftover) | No PR/client-based image provided | UCS stakeholders |
| Interactive Google Maps embed (7.4) | Needs decision: remove vs. embed (requires Maps API key if embedded) | Project decision |

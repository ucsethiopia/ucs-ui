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

#### HF-1 — Color Scheme Migration *(no blockers)*
- [ ] **HF-1.1** Audit current `globals.css` — verify the default color scheme is ucs-brand navy/gold color

#### HF-2 — Client & Partner Logo Hover Effects *(no blockers)*
- [ ] **HF-2.1** Audit current marquee hover state for client logos (`brightness-95` default, `brightness-100 scale-110` hover) — increase brightness boost to match new spec (visibly brighter + scaled)
- [ ] **HF-2.2** Apply identical static display + hover treatment to partner logos section (currently partners may not have same hover behavior as clients)
- [ ] **HF-2.3** Confirm hover effect is consistent across both rows; test at multiple viewport widths

#### HF-3 — UCS & Partner Logos *(BLOCKED: waiting on Natoli to process images)*
> **Dependency**: Natoli must find logos, run background removal, and copy PNGs to `public/images/partners/`. Claude Code will integrate once files are in place.
- [ ] **HF-3.1** *(Natoli)* Source logos for 5 strategic partners: Glocal Management Partners, B and M Development Consultants, JEPICS, Halkago Connect, Zinger Solutions Limited
- [ ] **HF-3.2** *(Natoli)* Run `rembg` background removal pipeline on each logo; save as PNG to `public/images/partners/` with kebab-case names
- [ ] **HF-3.3** Update `lib/mock-data.ts` partner entries — swap in real logo paths, flip `logoMissing: false`
- [ ] **HF-3.4** Implement and Confirm UCS own logo renders correctly in navbar and footer at all breakpoints

#### HF-4 — Background Images: About & Services *(BLOCKED: waiting on Natoli's image decision)*
> **Dependency**: Natoli selects final images and copies to `public/images/`. Claude Code handles integration.
- [ ] **HF-4.1** *(Natoli)* Choose hero/section background image for About page; copy to `public/images/about-bg.jpg` (or similar)
- [ ] **HF-4.2** *(Natoli)* Choose background image for Services page; copy to `public/images/services-bg.jpg`
- [ ] **HF-4.3** Integrate images using `next/image` with `fill` layout, `object-cover`, correct `objectPosition`; add to `next.config` `remotePatterns` if external
- [ ] **HF-4.4** Verify no layout shift (CLS) introduced; confirm images render across dark/light modes

#### HF-5 — Data Visualization & Performance
- [ ] **5.1 Economic Dashboard Refinement**: 
    - Adjust 3-graph aspect ratio (reduce horizontal stretch, increase vertical presence).
    - Add responsive padding to the container row to balance white space.
- [ ] **5.2 LRU Cache Implementation**:
    - Add `lru-cache` to market data hooks.
    - Implement data thinning (downsampling) for historical points (2000+ lines → ~1000) to optimize render performance while keeping "spikes."
    - Set 1-hour TTL (Time-To-Live) for cached historical data.
- [ ] **6.3 Loader Resilience**: Fix bug where skeleton loaders fail to reset/disappear after API failure or subsequent successful fetch.

---

## Remaining Phase Queue

### Phase 9 — Remaining API Tasks
- [ ] **9.5** UI review pass — all pages
- [ ] **9.6** Commit + push, note phase 9 complete
- [ ] **9.7** Fix Backblaze B2 image URLs — add `*.backblazeb2.com` to `next.config` `images.remotePatterns`; write `getImageUrl()` helper in `lib/utils.ts`; migrate team + news `<img>` tags to `next/image`
- [ ] **9.8** Image audit — enforce `aspect-square object-cover object-top` on team photos; `aspect-video object-cover` on news cards; `object-contain` in news modal carousel; migrate bare `<img>` tags to `next/image`

### Phase 12 — News + About Improvements
- [ ] **12.2** Date-range filter for news archive (month/year picker against `publishedAt`)
- [ ] **12.3** Improve `NewsModal` — drop cap, pull quote typography, keyboard trap, smooth open/close
- [ ] **12.4** Curent news filtering system doesn't work. Fix that. 
- [ ] **12.5** Imporve current news filter tags to reflect actual tags we can use - e.g. adding leadership, 

### Phase 13.9 — Stakeholder Data Confirmation Gate *(BLOCKED: waiting on stakeholders)*
- [ ] **13.9.1–13.9.10** Confirm/correct: vision, mission, SPEED descriptions, contact details, partner list, client list, stats, milestone years, team bios, publications, `internationalTrainingCountries`; flip `logoMissing` flags as assets arrive

### Phase 14 — Component Sourcing (21st.dev)
- [ ] **14.1** Testimonials / social-proof carousel or grid
- [ ] **14.2** Animated stats/metrics display
- [ ] **14.3** Hero background element (subtle gradient or geometric SVG, no parallax)
- [ ] **14.4** Service comparison / feature-matrix table
- [ ] **14.5** Timeline component for About milestones
- [ ] **14.6** Integrate sourced components, style to brand tokens
- [ ] **14.7** UI review pass on all affected pages

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

>> **HF-1** — Color Scheme Migration (default → UCS navy/gold)

---

## Blocked Items

| Item | Blocker | Owner |
|------|---------|-------|
| HF-3 Partner logos | Natoli sourcing + rembg pipeline | @Natoli74 |
| HF-4 About/Services background images | Natoli selects images | @Natoli74 |
| Phase 13.9 data confirmation | Stakeholder review | Stakeholders |
| Home page section reorder | Input from @jaft24 | @Natoli74 |
| Google Maps embed (Contact) | Maps API key decision | Project decision |

---

## Content Gaps

| # | Item | Status |
|---|------|--------|
| 1 | Milestone timeline years (2014, 2017, 2020) | ⚠️ Unconfirmed |
| 2 | Hero sub-copy | ⚠️ Adapted, not sourced from firm |
| 3 | SPEED core value descriptions | ⚠️ Claude-written, needs stakeholder sign-off |
| 4 | Team member bios | ⚠️ Blocked on stakeholders |
| 5 | Partner logos (all 10) | ⚠️ Missing |
| 6 | Client logos (6 of 19) | ⚠️ Siinqee Bank, CBE, VisionFund, United Insurance, IRC, National Alcohol & Liquor Factory |
| 7 | Publications list completeness | ⚠️ 2 confirmed; may be more |
| 8 | Oda publication year | ⚠️ null — confirm with stakeholders |
# PLAN.md — UCS Ethiopia Frontend Sprint

> Active branch: `feat/ux-overhaul`
> Last updated: 2026-03-13 (session 5)

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
- [x] **8.1** Apply global max-width constraint (~1440px, horizontally centered) — Infisical-style (`max-w-7xl` applied to EconomicDashboard and MarketAnalytics)
- [x] **8.2** Align mock data shapes with API doc format — `interestRate.policyRate/tbillYield`, `gdp.value/year`, `esx.aggregate`, added GBP/AUD FX rates
- [x] **8.3** Scale navbar font proportionally to page content — navbar height `h-20`→`h-14` (56px), logo `text-xl sm:text-2xl`→`text-base sm:text-lg`, CTA `px-5 py-2.5`→`px-4 py-2`
- [x] **8.4** Remove `EconomicNews` component from home page and route
- [x] **8.5** Implement scroll-triggered reveal animations across all sections (Framer Motion `useInView`)
- [x] **8.6** Animated count-up for stats (About page)
- [x] **8.7** Spacing and alignment audit — reduce excessive vertical whitespace
- [x] **8.8** Mobile UX pass (touch targets, responsive breakpoints)
- [x] **8.9** Accessibility pass (contrast ratios, focus states, aria labels)
- [ ] **8.10** Reorder home page sections (coordinate with @jaft24) — BLOCKED, skipped
- [x] **8.11** Use the UI-review skill to make sure the website is working displaying, polished and refined
- [x] **8.12** Commit changed made and note that phase 8 is complete, push code to current branch

### Phase 9 — Mock Data → Live API Integration *(SKIPPED — APIs not yet live)*
- [ ] **9.1** Replace `useEconomicDashboard` mock with live endpoints:
  - Latest values: `GET /fx/latest`, `/commodities/latest`, `/interest`, `/gdp`, `/esx/latest`
  - **Sparkline history strategy** (reviewed against `api-docs/market-data-API.md`):
    - **USD/ETB**: use `GET /fx/historical?from_date=<12mo ago>&to_date=<today>&currency=USD` — implement `buildDateRange(months)` helper that generates YYYY-MM-DD params from `Date.today()`, then downsample daily response to one point per month (last value per month) for clean sparklines
    - **NBE Policy Rate & T-Bill Yield**: no history endpoint exists — keep static hardcoded history (rate changes only a few times/year at NBE MPC meetings; history is known and stable)
    - **Ethiopia GDP**: no history endpoint exists — keep static annual values (World Bank data, changes once/year)
    - **ESX Aggregate**: no history endpoint exists — request `GET /esx/historical` from backend team, or keep static fallback until available
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
- [x] **10.2** Implement native-themed 404 page (`app/not-found.tsx`)
- [x] **10.3** Add skeleton loaders for all async data components (dashboard, news, team)
- [ ] **10.4** Replace marquee placeholder text with actual/AI-generated logos styled to brand
- [x] **10.5** Improve Training pillar animation on services page — true circular orbit via x/y keyframes
- [x] **10.6** Add commodity symbols to economic dashboard display
- [x] **10.7** Add x/y axis reference values to dashboard charts
- [x] **10.9** Creative team-member detail page — stats strip, gold numbered achievements, expertise tag cloud, corner-accented image, ghost monogram hero watermark
- [x] **10.10** UI review pass — fixed orbit animation (removed opacity delay), improved dashboard bg contrast, fixed team member stats strip fallback label
- [x] **10.11** Commit changed made and note that phase 10 is complete, push code to current branch

### Phase 11 — UI/Layout Refinements
- [x] **11.1** Fix hero section proportions — tighten vertical rhythm, adjust headline size, improve CTA button spacing *(covered by 1440px constraint work below)*
- [x] **11.2** Fix TickerBar positioning — updated `top-20`→`top-14` and `h-14`→`h-10` to flush against reduced navbar height
- [x] **11.3** Improve card hover states — `hover:-translate-y-1`, `hover:border-gold-500/30`, `hover:shadow-xl`, `duration-300` applied consistently across all interactive cards (news, team, values, services); subtle `hover:border-gold-500/20` on stat/commodity info cards; fixed firm-news `border-accent` → `border-gold-500/30`
- [x] **11.4** Audit and complete footer — all nav links, services, socials, contact, copyright confirmed complete; logo reduced to `text-xl`; footer moved outside `max-w-[1440px]` wrapper in `layout.tsx` (full-width, no edge lines); Navbar/Footer ownership moved to `layout.tsx`, removed from all 7 individual page files; bottom edge decoration L-brackets removed (vertical lines open-end); bottom accent verticals matched to lighter `border-gray-300`; footer `border-t-2 border-white/10` as full-width separator; removed `border-b` from `NewsCarouselLayout` (was creating double-border above footer)
- [x] **11.5** Dark mode consistency pass — identify and fix any components with hardcoded light-mode colors
- [x] **11.6** Button and CTA hierarchy audit — ensure primary/secondary/ghost variants are visually distinct and accessible *(404 button fixed to gold primary; all others consistent)*
- [x] **11.7** Typography scale audit — fix any rogue font sizes, normalize line-height and letter-spacing across breakpoints *(normalized 3 eyebrow labels to `text-sm tracking-widest`)*
- [x] **11.8** Services page section polish — improve pillar card proportions, icon sizing, and hover animations *(added scroll-reveal to header, AnimatePresence tab content transition)*
- [x] **11.9** About page visual flow — tighten CEO highlight, improve stats strip, refine team grid spacing *(fixed vision icon to gold, added ScrollReveal to team header, removed redundant CEO wrapper div, tightened py-28→py-24)*
- [x] **11.10** UI review pass — use `/ui-review` skill, screenshot all pages, fix top 3 regressions *(fixed: "01/04" pillar indicator, statistics padding normalized, statistics py-28→py-24, left column header now animates on tab change)*
- [x] **11.11** Fix Hero background image — replaced CSS `background-image` with Next.js `<Image fill priority sizes="100vw" />`, `object-cover`, `objectPosition: center 30%`; eliminates layout shift, proper responsive scaling on all breakpoints; UI review 10/10 ✅
- [x] **11.12** Hero height decision pending — applied `h-[85vh] min-h-[650px]` (Option A) for stakeholder review; compare against original `h-screen min-h-[700px]`; screenshots saved at `screenshots/hero-option-a-85vh.png` vs `screenshots/hero-desktop-top.png`; revert or keep based on feedback
- [x] **11.13** Refactor Economic Dashboard + remove MarketAnalytics — eliminated duplicate commodity cards (already in TickerBar), deleted `MarketAnalytics` section entirely, merged sparkline charts inline into each stat card (right-aligned, interactive Recharts tooltip on hover); added `SparklineChart` component to `charts.tsx`; section footprint reduced by ~50%; 5 cards in 3-2 grid: Policy Rate, T-Bill Yield, ESX Aggregate, GDP, ESX Companies — applied `h-[85vh] min-h-[650px]` (Option A) for stakeholder review; compare against original `h-screen min-h-[700px]`; screenshots saved at `screenshots/hero-option-a-85vh.png` vs `screenshots/hero-desktop-top.png`; revert or keep based on feedback

- [x] **11.14** News multi-image support — added `images?: string[]` to `NewsItem` interface; news cards (home + archive) display cover image (`images[0]` with `image` fallback); `NewsModal` shows Embla carousel when `images.length > 1`: left/right chevron buttons fade in/out based on scroll position, pill dot indicators, `1/N` counter; single image shows static display with no carousel chrome; 6 demo articles seeded with 2–3 images each
- [x] **11.15** Hero entrance animation overhaul — applied prototype animation to existing hero: `bgY` parallax `0→25%` with `scale: 1.12` on background; content block gets independent `contentY` `0→15%` parallax; opacity fade extended to `[0, 0.6]`; eyebrow text gets fade-in entrance (`y: 16→0`, delay 0.1s); headline words use blur-in (`blur(4px)→0`) with faster ease `[0.22, 1, 0.36, 1]` and tighter stagger (×0.1 vs ×0.15); subheading delay 1.4s→0.9s; CTA delay 1.6s→1.05s; scroll indicator replaced with "Scroll" text + bouncing ↓ arrow

### Phase 12 — News + About Improvements
- [ ] **12.1** Add keyword search input to news archive (client-side filter against loaded articles)
- [ ] **12.2** Add date-range filter to news archive (month/year picker, filter against article `publishedAt`)
- [ ] **12.3** Improve `NewsModal` — better article typography (drop cap, pull quote), keyboard trap, smooth open/close
- [x] **12.4** About page — "Our Story" section rebuilt from prototype code: two-column grid (`items-center`), left has `ScrollReveal`-wrapped serif heading + 3-paragraph origin narrative, right has `ScrollReveal delay={0.15}` milestone timeline — each item uses a **circle badge** (w-10 h-10 rounded-full, border, numbered 1–5) with a **vertical connector line** (`w-px flex-1 bg-border`) between items (except last), gold year label + serif bold title inline, muted description below; implemented with `ScrollReveal` (replaced manual `storyRef`/`storyVisible`); also applied global vertical spacing audit reducing `py-28`/`py-24` → max `py-16` site-wide
- [ ] **12.5** About page — enrich team member bios: add quote field, expand expertise tags, improve photo aspect-ratio handling
- [ ] **12.6** About page — CEO highlight section redesign: larger portrait, pull-quote overlay, signature element
- [ ] **12.7** UI review pass — screenshot news and about pages, fix top issues

### Phase 13 — Content Scraping + Real Copy
- [x] **13.1** Research UCS Ethiopia existing web presence — scraped ucsethiopia.com (React SPA, client-side routing)
- [x] **13.2** Extract and adapt service descriptions — all 4 pillar descriptions replaced with real UCS language in `lib/mock-data.ts`
- [ ] **13.3** Extract team member information — real names on legacy site (Fanta Tesgera, Tamrat Bayle, Kiram Tadesse, Jaleta Tesgera, Habtamu Sileshi, Talile Kebede); bios not published; update names when bios provided by stakeholders
- [ ] **13.4** Identify brand-consistent photography style — source stock or AI-generated imagery aligned to navy/gold brand
- [ ] **13.5** Update `lib/mock-data.ts` team members with real names/titles (blocked on bios from stakeholders)
- [x] **13.6** Replace hero tagline ("Think Agile, Get Inspired for Change!"), sub-copy, about page origin narrative (3 paragraphs), mission, vision, core value titles — all from live site
- [ ] **13.7** Stakeholder review checkpoint — present copy pass, collect feedback, revise

### Phase 14 — Component Sourcing (21st.dev)
- [ ] **14.1** Source testimonials / social-proof component — carousel or grid of client quotes, star ratings
- [ ] **14.2** Source stats / metrics display component — animated counters, clean number cards for KPIs
- [ ] **14.3** Source hero background element — subtle animated gradient or geometric SVG pattern (no parallax)
- [ ] **14.4** Source service comparison or feature-matrix table component
- [ ] **14.5** Source timeline component for About page history / milestones section
- [ ] **14.6** Implement sourced components — integrate into relevant pages, style to brand tokens
- [ ] **14.7** UI review pass — `/ui-review` on all affected pages

### Phase 15 — Security + Performance Optimization
- [ ] **15.1** Security audit — review all form inputs for XSS vectors, ensure API calls don't expose secrets, check CSP headers in `next.config`
- [ ] **15.2** Bundle size audit — run `npm run build` with `ANALYZE=true`, identify and eliminate heavy dependencies
- [ ] **15.3** Image optimization — migrate all `<img>` tags to `next/image`, add explicit `width`/`height`, use `WebP` where possible
- [ ] **15.4** Core Web Vitals pass — Lighthouse audit (LCP < 2.5s, CLS < 0.1, FID < 100ms), fix top offenders
- [ ] **15.5** Final production build verification — `npm run build` clean with zero TypeScript errors and zero ESLint warnings

### Phase 16 — Demo Prep
- [ ] **16.1** Full-site final UI review — `/ui-review` across all pages (home, about, services, news, contact, 404), fix any remaining issues
- [ ] **16.2** Cross-browser testing — Chrome, Firefox, Safari (macOS + iOS), document and fix any rendering differences
- [ ] **16.3** Mobile device testing — test on iPhone SE (375px), iPhone 14 Pro (393px), iPad (768px) viewports
- [ ] **16.4** Deploy to staging/preview — push branch, trigger Vercel preview deploy, share preview URL with stakeholders
- [ ] **16.5** Prepare demo script — page-by-page walkthrough notes, key features to highlight, talking points for each section
- [ ] **16.6** Final stakeholder review — collect sign-off on UI, content, and data; document any last-minute change requests

---

## Current Task

>> **Phase 13.3** — Team member names (blocked on bios from stakeholders)

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
| Navbar + TickerBar chrome style | Option B confirmed (dark navy always-on, `bg-navy-950/80 backdrop-blur-sm`). Navbar `h-14` (56px), ticker `top-14 h-10` — flush, proportional. |
| Footer layout | Full-width (outside `max-w-[1440px]` wrapper). Edge decoration lines open-end vertically — no bottom horizontal close. Footer `border-t-2 border-white/10` is the page-content separator. |
| Phase 10 complete | All UX/UI fixes shipped: TickerBar, MarketAnalytics split, 404 page, skeleton loaders, orbit animation, commodity symbols, chart axes, team detail page redesign. 10.4 (client logos) remains blocked on stakeholder assets. |
| 1440px page-level layout constraint | All inner containers updated from `max-w-7xl` (1280px) to `max-w-[1440px]` with `xl:px-14`. Page wrapper added in `layout.tsx` (`max-w-[1440px] mx-auto`). Navbar and ticker reverted to `left-0 right-0` (full viewport width, matching Infisical). Body `bg-background` provides base color on side gutters in both light and dark mode. Edge decoration added: full-height dashed lines (`border-gray-300 dark:border-gray-600`) + L-bracket corner accents + hollow circle dots at all 4 corners — all `hidden min-[1441px]:block` so they only appear when gutters exist. |

---

## Content Gaps (Phase 13)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Milestone timeline years | ⚠️ Not on legacy site | Founding year corrected to 2012; other milestones (2014, 2017, 2020) remain estimated — confirm with stakeholders |
| 2 | Hero sub-copy | ⚠️ No equivalent on legacy | Adapted from About intro paragraph; confirm with stakeholders |
| 3 | Services hero description | ⚠️ No equivalent on legacy | Kept existing descriptive copy; no legacy text to replace it |
| 4 | Core value descriptions | ⚠️ Titles replaced; descriptions not on legacy site | Real titles used; descriptions written to reflect each value's meaning |
| 5 | Team member bios | ⚠️ Not published on legacy site | Real names scraped; full bios need to come from stakeholders |

---

## Blocked Items

| Item | Blocker | Owner |
|------|---------|-------|
| Home page section reorder (8.9) | Needs input from @jaft24 | @Natoli74 |
| Live API base URL / auth config | Backend deployment config not yet in repo | Backend team |
| Actual client logos for marquee | Real logos not provided; AI-generated fallback possible | UCS stakeholders |
| Services hero background image (Phase 5 leftover) | No PR/client-based image provided | UCS stakeholders |
| Interactive Google Maps embed (7.4) | Needs decision: remove vs. embed (requires Maps API key if embedded) | Project decision |

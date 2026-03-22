# PLAN.md — UCS Ethiopia Frontend Sprint

> Active branch: `feat/ux-overhaul`
> Last updated: 2026-03-22 (session 9)

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

### Phase 9 — Mock Data → Live API Integration *(Market Data API live as of session 7)*
- [x] **9.1b** Economic Dashboard restructure (session 3):
  - ESX removed entirely (unreliable `/esx/latest`, no historical API)
  - AUD sparkline card removed from dashboard (AUD still visible in TickerBar)
  - Compact `TextStatCard` row added above graph grid: Ethiopian GDP · T-Bill Yield · NBE Policy Rate (no charts, fast read)
  - Commodity sparkline cards added: Gold (XAU/USD) · Silver (XAG/USD) · Coffee (KC1) — 10-year monthly history via `/commodities/historical`
  - EUR/ETB and CNY/ETB sparkline cards replace AUD/ESX slots — 12-month monthly history via `/fx/historical`
  - Graph grid is now 2×3: Gold | Silver | Coffee / USD | EUR | CNY
  - Removed static `ESX_HISTORY` and `INTEREST_HISTORY` arrays; `GDP_HISTORY` refactored to `GDP_HISTORY_VALUES`
  - Hook fires 10 parallel fetches (added fxHistEurRes, fxHistCnyRes, 3 commodity historical fetches)
- [x] **9.1** Replace `useEconomicDashboard` mock with live endpoints:
  - Parallel fetch: `GET /fx/latest`, `/commodities/latest`, `/interest`, `/gdp`, `/esx/latest`
  - **USD & AUD sparklines**: `GET /fx/historical` (12-month, downsampled monthly) — `buildDateRange()` + `downsampleMonthly()` helpers implemented
  - **NBE Policy Rate & T-Bill**: live from `/interest`; history kept static (changes only at MPC meetings)
  - **Ethiopia GDP**: live value + year from `/gdp`; growth computed from static annual history; static history updated to 149.74 (2024, from live API)
  - **ESX Aggregate**: live from `/esx/latest`; change/% zeroed (no history endpoint)
  - **ESX Companies card** → replaced with **AUD/ETB rate card** with 12-month sparkline
  - **TickerBar**: `change` field removed (not in API); trend shown as ▲/▼/— arrow; CNY/ETB added
  - `.env`: `MARKET_DATA_API_URL` → `NEXT_PUBLIC_MARKET_DATA_API_URL` (required for client-side Next.js)
- [x] **9.2** Replace `useNews` mock with `GET /news/latest` and `GET /news` — live API wired; lib/types.ts added
- [x] **9.3** Replace `useTeam` mock with `GET /team` and `GET /team/{name}` — live API wired; 404 handling; contact form fullname fix
- [x] **9.4** Wire contact form to `POST /contact` (Mailgun email notification) — *already integrated in Phase 7*
- [ ] **9.5** Use the UI-review skill to make sure the website is working displaying, polished and refined
- [ ] **9.6** Commit changed made and note that phase 9 is complete, push code to current branch
- [ ] **9.8** Fit all images with appropriate constraints (size, aspect ratio, object-fit):
  - Audit every `<img>` and `<Image>` tag site-wide for missing `width`/`height`, unset `object-fit`, or images that distort/overflow their containers
  - Client logos: enforce uniform height (e.g. `h-12`) + `object-contain` so varied logo shapes don't break the marquee row
  - Partner logos: same treatment as client logos
  - Team member photos: enforce `aspect-square` + `object-cover object-top` so portrait crops are consistent across grid
  - News card images (`main_image`): enforce `aspect-video` + `object-cover` on card thumbnails; carousel images in modal should be `object-contain` with max-height cap
  - Hero background: verify `object-cover object-center` is set and `fill` layout is correct (no layout shift)
  - About page team/CEO photo: verify aspect ratio + crop position
  - Migrate any remaining bare `<img>` tags to `next/image` with explicit `width`/`height` or `fill` + `sizes`
  - Run Lighthouse image audit to confirm no oversized or layout-shift images remain
- [ ] **9.7** Fix and update Backblaze B2 image URL fetching:
  - The UCS Service API returns Backblaze B2 URLs for `image` (team), `main_image` and `images[]` (news)
  - Add `*.backblazeb2.com` (and Backblaze CDN domain if configured) to `next.config` `images.remotePatterns` so `next/image` can serve them
  - Add `NEXT_PUBLIC_B2_CDN_URL` env var (if a friendly CDN/custom domain is configured in front of B2) and write a `getImageUrl(raw: string | null): string` helper in `lib/utils.ts` that rewrites raw B2 URLs to the CDN domain
  - Update all `<img>` tags in team and news components to use `next/image` (or the URL helper) so images load correctly in prod
  - Verify both team member photos and news `main_image`/`images[]` render in the browser with no broken-image states

### Phase 10 — UX/UI Fixes
- [x] **10.1** Restructure financial data layout:
  - FX rates (6) + commodities (3) → Bloomberg-style `TickerBar` fixed below navbar (`components/home/ticker-bar.tsx`)
  - NBE policy rate + T-bill yield + ESX aggregate → compact number cards in `EconomicDashboard`
  - Charts relocated to new `MarketAnalytics` section (`components/home/market-analytics.tsx`)
- [x] **10.8** Split `EconomicDashboard` component — now < 150 lines; charts extracted to `MarketAnalytics`
- [x] **10.2** Implement native-themed 404 page (`app/not-found.tsx`)
- [x] **10.3** Add skeleton loaders for all async data components (dashboard, news, team)
- [x] **10.4** Replace marquee placeholder text with actual/AI-generated logos styled to brand — rembg background removal pipeline for 4 JPEG/RGB sources; all 13 logos copied to `public/images/clients/` with kebab-case names; `mock-data.ts` paths updated (.jpg→.png); UI review pass: brightness-95 default / brightness-100 + scale-110 hover + company name fade-up; spacing tightened (mb-12→mb-8); Oromia Insurance & Oromia Bank re-processed; Hibret Insurance threshold-cleaned; screenshots pruned to 2 hero comparison shots
- [x] **10.4b** Upgrade client/partner section headers — replaced single all-caps label with full 3-line treatment: gold eyebrow + `font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-balance` headline + subtitle, matching all other section headers site-wide; "Our Valued Clients" / "Global Network"
- [ ] **10.4c** Source logos for 5 strategic partners (Glocal Management Partners, B and M Development Consultants, JEPICS, Halkago Connect, Zinger Solutions Limited); copy to `public/images/partners/`; update `mock-data.ts`
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
- [x] **11.11** Fix Hero background image — replaced CSS `background-image` with Next.js `<Image fill priority sizes="100vw" />`, `object-cover`, `objectPosition: center 30%`; eliminates layout shift, proper responsive scaling on all breakpoints; UI review 10/10
- [x] **11.12** Hero height decision pending — applied `h-[85vh] min-h-[650px]` (Option A) for stakeholder review; compare against original `h-screen min-h-[700px]`; screenshots saved at `screenshots/hero-option-a-85vh.png` vs `screenshots/hero-desktop-top.png`; revert or keep based on feedback
- [x] **11.13** Refactor Economic Dashboard + remove MarketAnalytics — eliminated duplicate commodity cards (already in TickerBar), deleted `MarketAnalytics` section entirely, merged sparkline charts inline into each stat card (right-aligned, interactive Recharts tooltip on hover); added `SparklineChart` component to `charts.tsx`; section footprint reduced by ~50%; 5 cards in 3-2 grid: Policy Rate, T-Bill Yield, ESX Aggregate, GDP, ESX Companies — applied `h-[85vh] min-h-[650px]` (Option A) for stakeholder review; compare against original `h-screen min-h-[700px]`; screenshots saved at `screenshots/hero-option-a-85vh.png` vs `screenshots/hero-desktop-top.png`; revert or keep based on feedback

- [x] **11.14** News multi-image support — added `images?: string[]` to `NewsItem` interface; news cards (home + archive) display cover image (`images[0]` with `image` fallback); `NewsModal` shows Embla carousel when `images.length > 1`: left/right chevron buttons fade in/out based on scroll position, pill dot indicators, `1/N` counter; single image shows static display with no carousel chrome; 6 demo articles seeded with 2–3 images each
- [x] **11.15** Hero entrance animation overhaul — applied prototype animation to existing hero: `bgY` parallax `0→25%` with `scale: 1.12` on background; content block gets independent `contentY` `0→15%` parallax; opacity fade extended to `[0, 0.6]`; eyebrow text gets fade-in entrance (`y: 16→0`, delay 0.1s); headline words use blur-in (`blur(4px)→0`) with faster ease `[0.22, 1, 0.36, 1]` and tighter stagger (×0.1 vs ×0.15); subheading delay 1.4s→0.9s; CTA delay 1.6s→1.05s; scroll indicator replaced with "Scroll" text + bouncing ↓ arrow

### Phase 12 — News + About Improvements
- [ ] **12.2** Add date-range filter to news archive (month/year picker, filter against article `publishedAt`)
- [ ] **12.3** Improve `NewsModal` — better article typography (drop cap, pull quote), keyboard trap, smooth open/close
- [x] **12.4** About page — "Our Story" section rebuilt from prototype code: two-column grid (`items-center`), left has `ScrollReveal`-wrapped serif heading + 3-paragraph origin narrative, right has `ScrollReveal delay={0.15}` milestone timeline — each item uses a **circle badge** (w-10 h-10 rounded-full, border, numbered 1–5) with a **vertical connector line** (`w-px flex-1 bg-border`) between items (except last), gold year label + serif bold title inline, muted description below; implemented with `ScrollReveal` (replaced manual `storyRef`/`storyVisible`); also applied global vertical spacing audit reducing `py-28`/`py-24` → max `py-16` site-wide

### Phase 13 — Content Scraping + Real Copy
- [x] **13.1** Research UCS Ethiopia existing web presence — scraped ucsethiopia.com (React SPA, client-side routing)
- [x] **13.2** Extract and adapt service descriptions — all 4 pillar descriptions replaced with real UCS language in `lib/mock-data.ts`
- [ ] **13.3** Extract team member information — real names on legacy site (Fanta Tesgera, Tamrat Bayle, Kiram Tadesse, Jaleta Tesgera, Habtamu Sileshi, Talile Kebede); bios not published; update names when bios provided by stakeholders
- [ ] **13.4** Identify brand-consistent photography style — source stock or AI-generated imagery aligned to navy/gold brand
- [ ] **13.5** Update `lib/mock-data.ts` team members with real names/titles (blocked on bios from stakeholders)
- [x] **13.6** Replace hero tagline ("Think Agile, Get Inspired for Change!"), sub-copy, about page origin narrative (3 paragraphs), mission, vision, core value titles — all from live site
- [x] **13.8** Apply verified company profile data to `lib/mock-data.ts` — vision, mission, SPEED core values, contact info, 10 strategic partners (4 local + 6 overseas), full client list audit (19 clients), `internationalTrainingCountries`, `publications`, `companyStats` (5,000+ trained confirmed). All new interfaces typed; `logoMissing: true` flags on all unresourced logos.
- [ ] **13.7** Stakeholder review checkpoint — present copy pass, collect feedback, revise

### Phase 13.9 — Mock Data Confirmation with Firm *(data integrity gate)*
> Wire up once stakeholders have reviewed. Do not deploy until this phase is complete.
- [ ] **13.9.1** Share `lib/mock-data.ts` exports with UCS stakeholders for review — confirm: vision, mission, SPEED value descriptions, contact details, partner list, client list, stats
- [ ] **13.9.2** Confirm or correct: years of excellence stat (currently 15+), partners count (currently 10+), founding year (currently 2012)
- [ ] **13.9.3** Confirm or correct milestone timeline years in About page (2014, 2017, 2020 are estimated)
- [ ] **13.9.4** Confirm hero sub-copy (currently adapted from About intro — not sourced from firm)
- [ ] **13.9.5** Obtain full team member bios from stakeholders — update `teamMembers` array with real names/titles/bios (currently placeholder names)
- [ ] **13.9.6** Confirm publications list is complete — any other UCS-produced books, reports, or profiles to add
- [ ] **13.9.7** Confirm `internationalTrainingCountries` is complete (currently: Kenya, Thailand, Turkey, Ethiopia)
- [ ] **13.9.8** Source/confirm partner logos — move 3 existing files from `assets/logos/` to `public/images/partners/`; obtain remaining 7 partner logos; flip `logoMissing` flags to `false` as logos are confirmed
- [ ] **13.9.9** Source/confirm client logos — 6 clients still have `logoMissing: true` (Siinqee Bank, CBE, VisionFund, United Insurance, IRC, National Alcohol & Liquor Factory)
- [ ] **13.9.10** Remove all `logoMissing: true` flags once logos are in place — do a final audit before launch

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

### Phase 16.0 — Visual Gap Analysis & Improvements *(completed session 6)*
- [x] **G1** FirmNews editorial grid — replaced horizontal carousel with asymmetric 2-col grid (featured large card left + 3 small horizontal cards right); `firm-news.tsx`
- [x] **G2** Home stats strip — new `HomeStatsStrip` component between ServicesOverview and CoreValues; animated counters (150+, 15+, 4, 5+); `home-stats-strip.tsx` + `app/page.tsx`
- [x] **G3** Hero headline scale — increased to `text-5xl md:text-6xl lg:text-7xl xl:text-8xl`; `hero.tsx`
- [x] **G4** Stats dark band — `bg-navy-950` forced dark section, white text; `statistics.tsx`
- [x] **G5** Remove CoreValues from About — `CoreValues` import + usage removed; `about/page.tsx`
- [x] **G6** Services program grid — replaced Training accordion with 2-col chip grid (icon + name + subtitle); `service-pillars.tsx`
- [x] **G7** Contact map polish — gold-tinted border `border-gold-500/20`; `contact/page.tsx`
- [x] **G8** Dashboard card contrast — `border-border/60 shadow-md` on stat cards; `economic-dashboard.tsx`
- [x] **G9** Economic Dashboard visual polish (session 8–9):
  - Sparkline color fixes: Silver `oklch(0.78 0.09 210)`, Coffee `oklch(0.68 0.12 50)`, CNY `var(--color-gold-600)` — all were rendering black due to undefined CSS tokens
  - TextStatCard redesigned as compact single-line flex row (label | divider | value · subLabel) — reduced height ~50%
  - StatCard layout flipped: text=flex-shrink-0, chart=flex-1 — charts now ~2× wider
  - Commodity trend badges fixed: derive from `trendFromHistory()` on historical data, not unreliable API `direction` field
  - FX sparkline row (USD/EUR/CNY) commented out pending layout decision — uncomment in `economic-dashboard.tsx` to restore
  - LIVE badge upgraded: animate-ping radiating dot + emerald pill with border/bg + larger tracking text
  - Commodity tooltip date format fixed: `year: "2-digit"` → `year: "numeric"` + `timeZone: "UTC"` — tooltips now show "Jan 2015" instead of ambiguous "Jan 15"

---

## Current Task

>> **9.7** — Fix Backblaze B2 image URL fetching (remotePatterns, CDN helper, next/image migration for team + news)

---


## Content Gaps (Phase 13)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Milestone timeline years | ⚠️ Unconfirmed | Founding year 2012 confirmed; milestones 2014, 2017, 2020 are estimated — confirm with stakeholders |
| 2 | Hero sub-copy | ⚠️ Unconfirmed | Adapted from About intro paragraph — not sourced from firm directly |
| 3 | Core value descriptions | ⚠️ Unconfirmed | SPEED titles are real; descriptions are UCS-aligned but written by Claude — confirm wording with stakeholders |
| 4 | JEPICS partner | ❌ Removed | Replaced with Path Consulting PLC and Askiibez Consulting PLC per verified list; JEPICS unconfirmed |
| 5 | Team member bios | ⚠️ Blocked | Real names scraped; full bios and titles need to come from stakeholders |
| 6 | Partner logos | ⚠️ All missing | 3 source files in assets/logos/ need moving; 7 others need sourcing |
| 7 | Client logos | ⚠️ 6 missing | Siinqee Bank, CBE, VisionFund Microfinance, United Insurance, IRC, National Alcohol & Liquor Factory |
| 8 | Publications list | ⚠️ Possibly incomplete | 2 confirmed publications in data; stakeholders should confirm if more exist |
| 9 | Oda publication year | ⚠️ Unknown | Year is null — confirm with stakeholders |

---

## Blocked Items

| Item | Blocker | Owner |
|------|---------|-------|
| Home page section reorder (8.9) | Needs input from @jaft24 | @Natoli74 |
| Interactive Google Maps embed (7.4) | Needs decision: remove vs. embed (requires Maps API key if embedded) | Project decision |

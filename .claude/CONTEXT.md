# CONTEXT.md — UCS Ethiopia Frontend Deep Reference

> Detailed component map, known issues, API integrations, and development goals.
> Companion to `CLAUDE.md`. Use this for targeted work on specific areas.

---

## Component Map

### App Routes (`app/`)

| Route          | File                       | Description                                                                                         |
| -------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| `/`            | `app/page.tsx`             | Home — Hero, ClientMarquee, EconomicDashboard, ServicesOverview, CoreValues, FirmNews, EconomicNews |
| `/about`       | `app/about/page.tsx`       | Company story, team grid, CEO highlight, stats                                                      |
| `/services`    | `app/services/page.tsx`    | Four service pillars with visual layouts                                                            |
| `/news`        | `app/news/page.tsx`        | News archive (WIP — Phase 6)                                                                        |
| `/contact`     | `app/contact/page.tsx`     | Contact form (WIP — Phase 7)                                                                        |
| `/team/[name]` | `app/team/[name]/page.tsx` | Individual team member profile                                                                      |

### Layout Components (`components/layout/`)

| Component | File         | Lines   | Description                                                       |
| --------- | ------------ | ------- | ----------------------------------------------------------------- |
| `Navbar`  | `navbar.tsx` | ~4.6 KB | Main navigation — desktop + mobile responsive, theme toggle, logo |
| `Footer`  | `footer.tsx` | ~5.2 KB | Site footer — links, contact info, social                         |

### Home Page Components (`components/home/`)

| Component           | File                     | Lines     | Description                                                                                                                   |
| ------------------- | ------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `Hero`              | `hero.tsx`               | ~6 KB     | Full-width hero with background image, headline, tagline                                                                      |
| `ClientMarquee`     | `client-marquee.tsx`     | ~6.6 KB   | Continuous scrolling client/partner logos, pause on hover                                                                     |
| `EconomicDashboard` | `economic-dashboard.tsx` | 267 lines | Bloomberg-style financial data — FX rates, commodities, GDP, interest, ESX. Uses `RateItem` sub-component and `MiniLineChart` |
| `ServicesOverview`  | `services-overview.tsx`  | ~5.8 KB   | Four service pillars summary cards with "Learn More" links                                                                    |
| `CoreValues`        | `core-values.tsx`        | ~3 KB     | Company values display (Integrity, Excellence, Innovation, Collaboration, Client Focus)                                       |
| `FirmNews`          | `firm-news.tsx`          | ~7 KB     | Firm news carousel with cards and category tags                                                                               |
| `EconomicNews`      | `economic-news.tsx`      | ~7 KB     | Economic/market news carousel                                                                                                 |
| `NewsModal`         | `news-modal.tsx`         | ~5.7 KB   | Shared modal overlay for reading full news articles                                                                           |

### Services Page Components (`components/services/`)

| Component        | File                  | Description                                  |
| ---------------- | --------------------- | -------------------------------------------- |
| `PillarVisual`   | `pillar-visual.tsx`   | Visual representation of each service pillar |
| `ServicePillars` | `service-pillars.tsx` | Container layout for all four pillars        |
| `ServicesCTA`    | `services-cta.tsx`    | End-of-page "Get in Touch" call-to-action    |
| `ServicesHero`   | `services-hero.tsx`   | Page hero (shorter than home hero)           |
| Barrel export    | `index.ts`            | Re-exports all services components           |

### Shared Components (`components/shared/`)

| Component  | File            | Description                                              |
| ---------- | --------------- | -------------------------------------------------------- |
| `PageHero` | `page-hero.tsx` | Reusable page-level hero (used by About, Services, etc.) |

### UI Primitives (`components/ui/`)

62 files — **shadcn/ui (new-york style)**. Auto-generated via `npx shadcn@latest add`. Key ones:

| Component                                  | Notable Usage                          |
| ------------------------------------------ | -------------------------------------- |
| `button.tsx`                               | CVA-based variants                     |
| `card.tsx`                                 | Content cards across all sections      |
| `carousel.tsx`                             | Embla-based carousel (news sections)   |
| `chart.tsx` / `charts.tsx`                 | Recharts integration + `MiniLineChart` |
| `dialog.tsx` / `modal.tsx`                 | News article reading overlay           |
| `scroll-reveal.tsx`                        | Framer Motion scroll-triggered reveals |
| `theme-toggle.tsx`                         | Dark/light mode switcher               |
| `toast.tsx` / `toaster.tsx` / `sonner.tsx` | Toast notification system              |
| `navigation-menu.tsx`                      | Navbar menu (Radix-based)              |

### Custom Hooks (`hooks/`)

| Hook                   | File                        | Description                                                                                                                                                                      |
| ---------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useEconomicDashboard` | `use-economic-dashboard.ts` | Returns FX rates, commodities, interest, GDP, ESX data. Currently mocked with 1.2s simulated delay. Interfaces: `FXRate`, `Commodity`, `TimeSeriesData`, `EconomicDashboardData` |
| `useMobile`            | `use-mobile.ts`             | Responsive breakpoint detection                                                                                                                                                  |
| `useNews`              | `use-news.ts`               | News data fetching + filtering (12 KB — complex)                                                                                                                                 |
| `useScrollAnimation`   | `use-scroll-animation.ts`   | Intersection Observer-based scroll reveal                                                                                                                                        |
| `useTeam`              | `use-team.ts`               | Team member data fetching                                                                                                                                                        |
| `useToast`             | `use-toast.ts`              | Toast notification state management                                                                                                                                              |
| `useDarkMode`          | `use-dark-mode.ts`          | Dark mode hook                                                                                                                                                                   |

### Data Layer (`lib/`)

| File           | Description                                                                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mock-data.ts` | 921 lines — all mock data (exchange rates, economic indicators, news items, team members, training programs, clients, partners, service pillars, core values). Contains TypeScript interfaces. |
| `utils.ts`     | `cn()` utility — `clsx` + `tailwind-merge`                                                                                                                                                     |

---

## Known Issues

### Known Issues List

- Landing page: background image resize not optimized
- Navbar: dimensions disproportionate, font scaling inconsistent
- FX/Economic dashboard: font sizes inconsistent, analytics not consolidated
- Market data section: stakeholders want compact graph+text cards on landing, with "Load More" expanding to an interactive chart with history
- News section: Read More should open image carousel (multiple images from API), not just the base image
- About section: impact counter should trigger on nav click scroll, not page load
- About section: margins too wide, Team section needs full-profile refinement
- Client/Global Network: placeholder graphics need replacing with real logos
- Color scheme: needs professional refresh across all pages
- Old website: content needs scraping (mottos, About Us text) via ChromeDevTools MCP for content not available through backend APIs
- Backblaze/S3 image URLs require backend auth resolution — images from UCS Service API not rendering until fixed
- Client logos need enlarging and brightness increase in marquee
- Team detail page needs full API field mapping (education, experience, skills, projects, grants)
- CEO message section not yet implemented — MD Fanta Tesgera (PhD), text from company profile PDF
- About and Services hero background images pending company photo processing

### Critical (Blocking UX)

1. **Financial data layout is broken** — 9 data boxes are displayed in a flat grid. Need restructuring:
   - FX rates (6 currencies) + commodities (3) → horizontal scrollable ticker row below navbar (Bloomberg-style)
   - NBE policy rate + GDP → compact number cards
2. **Color scheme needs revision** — current oklch navy/gold palette needs fine-tuning for contrast and warmth
3. **Section proportions are off** — sections take up unequal/awkward vertical space

### High Priority

4. **No max-width constraint on content** — content stretches full-width on large screens. Need Infisical-style horizontally centered container (~1440px max)
5. **Navbar font doesn't scale** — font size is disproportionate to page content on various viewports
6. **No skeleton loaders** — components show nothing while data loads (should show animated placeholders)
7. **No 404 page** — navigating to invalid routes shows default Next.js error

### Medium Priority

8. **Market news section should be removed** — `EconomicNews` component is planned for removal
9. **Client marquee uses placeholder text** — needs actual company logos (generate AI versions styled to brand if real logos unavailable)
10. **Contact page map is a static image** — either remove or replace with interactive Google Maps embed with actual office address
11. **Services page hero** — needs a PR/client-based background image
12. **Training pillar animation** — current animation under services page needs improvement

### Low Priority / Polish

13. **Scroll-triggered reveal animations** — not yet implemented across all sections
14. **Stats counter** — should be animated (count-up effect)
15. **Missing testimonials section** — no client testimonials or results showcase
16. **Hero CTA button** — not yet implemented
17. **Commodity symbols** — not displayed in dashboard
18. **Chart axis values** — x and y reference values missing from economic dashboard charts

---

## API Integrations Inventory

### API Integrations

- News API returns multiple images per article — all must be passed to Read More modal

### Market Data API (FastAPI + MongoDB + Redis)

**Base URL:** Backend server (see deployment config)
**Cache:** Redis-backed, real-time updates

| Endpoint                      | Data                                                                | Status                                        |
| ----------------------------- | ------------------------------------------------------------------- | --------------------------------------------- |
| `GET /fx/latest`              | ETB rates vs USD, EUR, AUD, GBP, JPY, CNY with direction indicators | Documented, backend live, frontend using mock |
| `GET /fx/historical`          | Historical FX rates (date range, optional currency filter)          | Documented, backend live, not integrated      |
| `GET /commodities/latest`     | Gold (XAU/USD), Silver (XAG/USD), Coffee (KC1) with direction       | Documented, backend live, frontend using mock |
| `GET /commodities/historical` | Historical OHLC data for commodities                                | Documented, backend live, not integrated      |
| `GET /interest`               | NBE policy rate + T-Bill yield                                      | Documented, backend live, frontend using mock |
| `GET /gdp`                    | Latest GDP value + year                                             | Documented, backend live, frontend using mock |
| `GET /esx/latest`             | Ethiopian Securities Exchange aggregate + company prices            | Documented, backend live, frontend using mock |
| `GET /health`                 | Health check (Redis + MongoDB status)                               | Documented, backend live, not integrated      |

### UCS Service API (FastAPI + PostgreSQL)

**Base URL:** Backend server (see deployment config)

| Endpoint           | Data                                                                 | Status                                        |
| ------------------ | -------------------------------------------------------------------- | --------------------------------------------- |
| `GET /news/latest` | Latest 9 news items (title, subtitle, date, tags, images)            | Documented, backend live, live API integrated (Session 2) |
| `GET /news`        | Paginated news list (page, per_page params)                          | Documented, backend live, live API integrated (Session 2) |
| `POST /contact`    | Contact form submission (persisted + email notification via Mailgun) | Documented, backend live, not integrated      |
| `GET /team`        | All team members (summary view)                                      | Documented, backend live, live API integrated (Session 2) |
| `GET /team/{name}` | Full team member detail (education, experience, skills, projects)    | Documented, backend live, live API integrated (Session 2) |
| `GET /health`      | Health check (Postgres status)                                       | Documented, not integrated                    |

### Ticker Symbols Reference

| Symbol                       | Name                       | Category  |
| ---------------------------- | -------------------------- | --------- |
| XAU/USD                      | Gold                       | Commodity |
| XAG/USD                      | Silver                     | Commodity |
| KC1                          | Coffee                     | Commodity |
| USD, EUR, AUD, GBP, JPY, CNY | FX Currencies              | Forex     |
| WGBX                         | Wegagen Bank Share Company | ESX       |
| GDAB                         | Gadaa Bank Share Company   | ESX       |

---

## Skills & Tools Active This Sprint

- `skills/ui-visual-review.md` — Playwright visual feedback loop
- `skills/component-selector.md` — 21st.dev component sourcing
- Claude plugins / Anthropic frontend plugin — component sourcing and UI generation
- MCP: `chrome-devtools-mcp` (old site scraping + live debug)
- MCP: GitHub MCP (optional, PR automation)
- ~~Stitch (Google)~~ — removed from outsourcing plan

---

## Our Goals for This Website (As Developers)

### The Vision

Build a website that makes UCS Ethiopia look like it belongs alongside McKinsey, BCG, and Deloitte in digital presence. This is not a template site or a portfolio project — it's the public face of a real consultancy serving Ethiopian enterprises, government bodies, and international partners.

### Core Objectives

1. **Establish credibility through data**: The economic dashboard is not decoration — it signals that UCS understands the Ethiopian market at a quantitative level. Real-time FX rates, commodity prices, and macroeconomic indicators position UCS as a firm that lives and breathes the data their clients need.

2. **Editorial authority**: The news system (firm news + economic news) must feel like a curated publication, not a blog. Modal-based reading keeps users on-page. Category filtering and pagination enable content scalability.

3. **Enterprise-grade UX**: Every interaction should feel deliberate. No janky transitions, no layout shifts, no broken states. Skeleton loaders for async data. Smooth scroll reveals. Consistent spacing. This site should feel like it was built by a team that charges $500/hr.

4. **Conversion-ready contact flow**: The contact page is where revenue starts. Form validation, clear CTAs, office information, and immediate toast feedback tell potential clients that UCS is responsive and professional.

5. **Scalable architecture**: Components are modular. Data flows through hooks. Mock data has a clear migration path to live APIs. Adding a new service pillar, a new team member, or a new data source should not require architectural changes.

### Design Principles (What "Good" Looks Like)

- **Constraint over sprawl**: Content is horizontally capped (Infisical-style ~1440px max-width). White space is intentional, not accidental.
- **Navy and gold, not navy and everything**: Gold is an accent. It should appear in CTAs, highlights, and rings — never as a background color for large areas.
- **Motion with purpose**: Every animation should communicate something (element entering view, state change, loading). If removing the animation changes nothing about comprehension, remove it.
- **Data density when appropriate**: The financial ticker bar should feel like Bloomberg — dense, scannable, professional. The rest of the site should breathe.
- **Mobile is not an afterthought**: Every section must work on mobile. The economic dashboard should gracefully degrade. The navbar must be functional. Touch targets must be adequate.

### What Success Looks Like

- A client in Addis Ababa visits the site and immediately perceives UCS as a Tier-1 firm
- An international partner sees the economic dashboard and trusts that UCS has analytical depth
- A potential hire sees the team page and understands the caliber of people at UCS
- The site loads fast, looks correct on every device, and never shows a broken state

---

## Social Stream Subsystem (Separate System)

A PostgreSQL-backed content publishing system built alongside the main platform:

- **One-click publish** to 6+ social platforms
- **Domain-restricted authentication** with RBAC (role-based access control)
- Operates independently from the main frontend but shares the UCS brand

---

## Quick Reference: File Size Watchlist

Components approaching or exceeding the 200-line limit:

| File                                     | Size      | Status                                |
| ---------------------------------------- | --------- | ------------------------------------- |
| `components/home/economic-dashboard.tsx` | 267 lines | ⚠️ Over limit — candidate for split   |
| `hooks/use-news.ts`                      | ~12 KB    | ⚠️ Complex — may need refactoring     |
| `lib/mock-data.ts`                       | 921 lines | Expected — data file, not a component |
| `components/ui/sidebar.tsx`              | ~21 KB    | shadcn/ui — do not modify             |
| `components/ui/chart.tsx`                | ~9.8 KB   | shadcn/ui — do not modify             |

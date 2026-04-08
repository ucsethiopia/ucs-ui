# CONTEXT.md — UCS Ethiopia Frontend Deep Reference

> Detailed component map, known issues, API integrations, and development goals.
> Companion to `CLAUDE.md`. Use this for targeted work on specific areas.

---

## Component Map

### App Routes (`app/`)

| Route          | File                       | Description                                                                                         |
| -------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| `/`            | `app/page.tsx`             | Home — Hero, ClientMarquee, EconomicDashboard, ServicesOverview, CoreValues, FirmNews               |
| `/about`       | `app/about/page.tsx`       | Company story, team grid, CEO highlight, stats                                                      |
| `/services`    | `app/services/page.tsx`    | Four service pillars with visual layouts                                                            |
| `/news`        | `app/news/page.tsx`        | News archive — grid layout, category filters, pagination, modal reading                             |
| `/contact`     | `app/contact/page.tsx`     | Contact form with validation, toast feedback, office info panel                                     |
| `/team/[name]` | `app/team/[name]/page.tsx` | Individual team member profile (full API field mapping)                                             |
| `not-found`    | `app/not-found.tsx`        | Custom 404 page                                                                                     |

### Layout Components (`components/layout/`)

| Component | File         | Description                                                       |
| --------- | ------------ | ----------------------------------------------------------------- |
| `Navbar`  | `navbar.tsx` | Main navigation — desktop + mobile responsive, theme toggle, logo |
| `Footer`  | `footer.tsx` | Site footer — links, contact info, social                         |

### Home Page Components (`components/home/`)

| Component           | File                     | Description                                                                                                                   |
| ------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `Hero`              | `hero.tsx`               | Full-width hero with background image, headline, tagline, CTA                                                                 |
| `ClientMarquee`     | `client-marquee.tsx`     | Continuous scrolling client/partner logos, pause on hover. Two rows: clients + partners                                       |
| `TickerBar`         | `ticker-bar.tsx`         | Bloomberg-style financial data ticker below navbar — FX rates + commodities, marquee scroll                                   |
| `EconomicDashboard` | `economic-dashboard.tsx` | Financial data panel — GDP, interest rates, ESX. Uses `RateItem` sub-component and `MiniLineChart`. Candidate for split (>200 lines) |
| `ServicesOverview`  | `services-overview.tsx`  | Four service pillars summary cards with "Learn More" links                                                                    |
| `CoreValues`        | `core-values.tsx`        | SPEED values display with icons                                                                                               |
| `FirmNews`          | `firm-news.tsx`          | Firm news carousel with cards and category tags                                                                               |
| `NewsModal`         | `news-modal.tsx`         | Shared modal overlay for reading full news articles                                                                           |

### Services Page Components (`components/services/`)

| Component        | File                  | Description                                  |
| ---------------- | --------------------- | -------------------------------------------- |
| `PillarVisual`   | `pillar-visual.tsx`   | Visual representation of each service pillar |
| `ServicePillars` | `service-pillars.tsx` | Container layout for all four pillars        |
| `ServicesCTA`    | `services-cta.tsx`    | End-of-page "Get in Touch" call-to-action    |
| `ServicesHero`   | `services-hero.tsx`   | Page hero (shorter than home hero)           |
| Barrel export    | `index.ts`            | Re-exports all services components           |

### Contact Components (`components/contact/`)

| Component       | File                 | Description                                                     |
| --------------- | -------------------- | --------------------------------------------------------------- |
| `ContactForm`   | `contact-form.tsx`   | React Hook Form + Zod validated form, `POST /contact` API call  |

### Shared Components (`components/shared/`)

| Component  | File            | Description                                              |
| ---------- | --------------- | -------------------------------------------------------- |
| `PageHero` | `page-hero.tsx` | Reusable page-level hero (used by About, Services, etc.) |

### UI Primitives (`components/ui/`)

shadcn/ui (new-york style) — do not edit directly. Key ones:

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

| Hook                   | File                        | Description                                                                                                                                       |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useEconomicDashboard` | `use-economic-dashboard.ts` | Returns FX rates, commodities, interest, GDP, ESX data. Live API integrated. Has skeleton loader bug (fails to reset after API error). LRU cache pending. Interfaces: `FXRate`, `Commodity`, `TimeSeriesData`, `EconomicDashboardData` |
| `useMobile`            | `use-mobile.ts`             | Responsive breakpoint detection                                                                                                                   |
| `useNews`              | `use-news.ts`               | News data fetching + filtering (~12 KB). Live API integrated. Filtering bug present (category filters not working correctly)                       |
| `useScrollAnimation`   | `use-scroll-animation.ts`   | Intersection Observer-based scroll reveal                                                                                                         |
| `useTeam`              | `use-team.ts`               | Team member data fetching. Live API integrated                                                                                                    |
| `useToast`             | `use-toast.ts`              | Toast notification state management                                                                                                               |
| `useDarkMode`          | `use-dark-mode.ts`          | Dark mode hook                                                                                                                                    |

### Data Layer (`lib/`)

| File           | Description                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mock-data.ts` | Fallback/seed data — exchange rates, economic indicators, news items, team members, training programs, clients, partners, service pillars, core values. Some entries still in use pending live data parity |
| `utils.ts`     | `cn()` utility — `clsx` + `tailwind-merge`                                                                                                                                                                |

---

## Active Issues (Current Sprint)

### Immediate Priority (Hotfix Batch)

| # | Issue | Status |
|---|-------|--------|
| HF-1 | Color scheme audit — verify `globals.css` defaults to UCS navy/gold brand tokens | Active |
| HF-2 | Client/partner logo hover effects — increase brightness boost, apply consistently to both rows | Active |
| HF-3 | Partner logos (5 strategic partners) — rembg pipeline + integration | **BLOCKED** (Natoli sourcing) |
| HF-4 | About + Services hero background images | **BLOCKED** (Natoli selecting) |
| HF-5.1 | Economic dashboard graph aspect ratio — reduce horizontal stretch, increase vertical presence | Active |
| HF-5.2 | LRU cache for market data hooks — 1-hour TTL, ~1000-point downsampling for historical data | Active |
| HF-5.3 | Skeleton loader bug — loaders fail to reset after API failure or subsequent successful fetch | Active |

### Remaining Phase Queue

| Phase | Item | Notes |
|-------|------|-------|
| 9.5–9.8 | UI review pass, Backblaze B2 image URL fix, `next/image` migration, image audit | In queue |
| 12 | News improvements — date-range filter, NewsModal polish, fix category filtering, better filter tags | In queue |
| 13.9 | Stakeholder data confirmation (vision, mission, team bios, partner list, stats, etc.) | **BLOCKED** (stakeholders) |
| 14 | Component sourcing via 21st.dev — testimonials, animated stats, hero background, timeline | In queue |
| 15 | Security audit, bundle size, image optimization, Core Web Vitals | In queue |
| 16 | Demo prep — full UI review, cross-browser, mobile, Vercel staging deploy | In queue |

### Content Gaps (Unconfirmed Data)

| Item | Status |
|------|--------|
| Milestone timeline years (2014, 2017, 2020) | Unconfirmed |
| Hero sub-copy | Adapted, not sourced from firm |
| SPEED core value descriptions | Claude-written, needs sign-off |
| Team member bios | Blocked on stakeholders |
| Partner logos (all 10) | Missing |
| Client logos (6 of 19): Siinqee Bank, CBE, VisionFund, United Insurance, IRC, National Alcohol & Liquor Factory | Missing |
| Publications list completeness | 2 confirmed; may be more |
| Oda publication year | null — confirm with stakeholders |

---

## API Integrations

### Market Data API (FastAPI + MongoDB + Redis)

**Cache:** Redis-backed, real-time updates

| Endpoint                      | Data                                                                | Status                          |
| ----------------------------- | ------------------------------------------------------------------- | ------------------------------- |
| `GET /fx/latest`              | ETB rates vs USD, EUR, AUD, GBP, JPY, CNY with direction indicators | Live — integrated               |
| `GET /fx/historical`          | Historical FX rates (date range, optional currency filter)          | Live — integrated               |
| `GET /commodities/latest`     | Gold (XAU/USD), Silver (XAG/USD), Coffee (KC1) with direction       | Live — integrated               |
| `GET /commodities/historical` | Historical OHLC data for commodities                                | Live — integrated               |
| `GET /interest`               | NBE policy rate + T-Bill yield                                      | Live — integrated               |
| `GET /gdp`                    | Latest GDP value + year                                             | Live — integrated               |
| `GET /esx/latest`             | Ethiopian Securities Exchange aggregate + company prices            | Live — integrated               |
| `GET /health`                 | Health check (Redis + MongoDB status)                               | Not integrated                  |

### UCS Service API (FastAPI + PostgreSQL)

| Endpoint           | Data                                                                 | Status                          |
| ------------------ | -------------------------------------------------------------------- | ------------------------------- |
| `GET /news/latest` | Latest 9 news items (title, subtitle, date, tags, images)            | Live — integrated               |
| `GET /news`        | Paginated news list (page, per_page params)                          | Live — integrated               |
| `POST /contact`    | Contact form submission (persisted + email notification via Mailgun) | Live — integrated               |
| `GET /team`        | All team members (summary view)                                      | Live — integrated               |
| `GET /team/{name}` | Full team member detail (education, experience, skills, projects)    | Live — integrated               |
| `GET /health`      | Health check (Postgres status)                                       | Not integrated                  |

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

- `/ui-review` skill — screenshot-based visual review loop
- `/component-selector` skill — 21st.dev component sourcing
- MCP: `chrome-devtools-mcp` — live debug + visual inspection
- MCP: GitHub MCP (optional, PR automation)

---

## Our Goals for This Website (As Developers)

### The Vision

Build a website that makes UCS Ethiopia look like it belongs alongside McKinsey, BCG, and Deloitte in digital presence. This is not a template site or a portfolio project — it's the public face of a real consultancy serving Ethiopian enterprises, government bodies, and international partners.

### Core Objectives

1. **Establish credibility through data**: The economic dashboard is not decoration — it signals that UCS understands the Ethiopian market at a quantitative level. Real-time FX rates, commodity prices, and macroeconomic indicators position UCS as a firm that lives and breathes the data their clients need.

2. **Editorial authority**: The news system must feel like a curated publication, not a blog. Modal-based reading keeps users on-page. Category filtering and pagination enable content scalability.

3. **Enterprise-grade UX**: Every interaction should feel deliberate. No janky transitions, no layout shifts, no broken states. Skeleton loaders for async data. Smooth scroll reveals. Consistent spacing. This site should feel like it was built by a team that charges $500/hr.

4. **Conversion-ready contact flow**: The contact page is where revenue starts. Form validation, clear CTAs, office information, and immediate toast feedback tell potential clients that UCS is responsive and professional.

5. **Scalable architecture**: Components are modular. Data flows through hooks. Adding a new service pillar, a new team member, or a new data source should not require architectural changes.

### Design Principles (What "Good" Looks Like)

- **Constraint over sprawl**: Content is horizontally capped (Infisical-style ~1440px max-width). White space is intentional, not accidental.
- **Navy and gold, not navy and everything**: Gold is an accent. It should appear in CTAs, highlights, and rings — never as a background color for large areas.
- **Motion with purpose**: Every animation should communicate something. If removing the animation changes nothing about comprehension, remove it.
- **Data density when appropriate**: The financial ticker bar should feel like Bloomberg — dense, scannable, professional. The rest of the site should breathe.
- **Mobile is not an afterthought**: Every section must work on mobile. The economic dashboard should gracefully degrade. Touch targets must be adequate.

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
| `lib/mock-data.ts`                       | Large     | Expected — data file, not a component |
| `components/ui/sidebar.tsx`              | ~21 KB    | shadcn/ui — do not modify             |
| `components/ui/chart.tsx`                | ~9.8 KB   | shadcn/ui — do not modify             |

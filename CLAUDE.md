# CLAUDE.md — UCS Ethiopia Frontend

> This file is for Claude Code (claude.ai/code). It contains project context, coding standards, and constraints that Claude must follow when working in this repo.

---

## Project Overview

**Ultimate Consultancy Service (UCS Ethiopia)** — a production-grade enterprise consultancy platform serving Ethiopian businesses and international partners. This repo (`ucs-ui`) is the **frontend only**.

- **Domain**: Strategic advisory, training, research & publication, communication & promotion
- **Users**: Ethiopian enterprise clients (banks, government, corporates), international partners
- **Stage**: Active development — frontend is the focus. Backend APIs are live and documented in `api-docs/`.

---

## Tech Stack

| Layer             | Technology                 | Version             |
| ----------------- | -------------------------- | ------------------- |
| Framework         | Next.js (App Router)       | 16.x                |
| UI Library        | React                      | 19.x                |
| Language          | TypeScript (strict mode)   | 5.x                 |
| Styling           | Tailwind CSS               | 4.x                 |
| Component Library | shadcn/ui (new-york style) | Radix UI primitives |
| Animation         | Framer Motion              | 12.x                |
| Charts            | Recharts                   | 2.x                 |
| Forms             | React Hook Form + Zod      | latest              |
| Icons             | Lucide React               | latest              |
| Theme             | next-themes                | 0.4.x               |

### Key Dependencies

- `class-variance-authority` + `clsx` + `tailwind-merge` for className composition
- `embla-carousel-react` for carousels
- `sonner` for toast notifications
- `vaul` for drawer component

---

## Current State & Priorities

### Completed (Phases 1–5)

- Design system locked (navy/gold brand colors, oklch tokens, dark/light mode)
- Home page structure: Hero → Client Marquee → Economic Dashboard → Services Overview → Core Values → Firm News → Economic News
- About page: story, team grid, CEO highlight, stats, individual team member pages (`/team/[name]`)
- Services page: four pillars with visual layouts and CTA

### Active Work (Phases 6–10)

- **Phase 6**: News page — grid layout, category filters, pagination, modal reading
- **Phase 7**: Contact page — form validation, toast feedback, office info panel
- **Phase 8**: Polish — scroll animations, spacing audit, max-width constraint (Infisical-style), mobile UX pass
- **Phase 9**: Replace mock data with live API calls (all endpoints in `api-docs/`)
- **Phase 10**: UX fixes — market data display restructure, skeleton loaders, 404 page, navbar font scaling
- **Sprint focus**: UI overhaul, data integration, component sourcing, security audit
- Duplicate test project created for safe UI experimentation
- All major changes should be screenshot-reviewed using `skills/ui-visual-review.md`

### Known Issues to Fix

- Color scheme needs updating
- Section proportions are off
- 9 financial data boxes need restructured layout:
  - FX rates + commodities → scrollable graph row below nav (Bloomberg-style ticker bar)
  - NBE rates + GDP → number cards
- Constraint on content layout — max-width horizontally centered (Infisical inspiration)
- Navbar font scaling proportional to page content
- Remove market news section
- Implement skeleton loaders for async data
- Contact page map: either remove or replace with interactive Google Maps

### Coming Soon

- AI chatbot integration

---

## Design System & Constraints

### Visual Direction

- **Editorial luxury minimalism** — inspired by McKinsey.com, BCG.com
- **Layout**: Infisical-style constrained max-width (~1440px), centered content container
- **Data bar**: Bloomberg.com-style financial data ticker at top of page

### Brand Colors (oklch-based, defined in `app/globals.css`)

| Token                   | Usage                                    |
| ----------------------- | ---------------------------------------- |
| `navy-950` → `navy-600` | Primary scale — backgrounds, text, cards |
| `gold-600` → `gold-400` | Accent only — highlights, rings, CTAs    |
| White/off-white base    | Light mode backgrounds                   |

### Typography

| Role              | Font             | Variable             |
| ----------------- | ---------------- | -------------------- |
| Headlines (serif) | Playfair Display | `--font-playfair`    |
| Body (sans-serif) | Source Sans 3    | `--font-source-sans` |

### Motion Rules

- Calm, editorial motion only — scroll reveals, subtle transitions
- No flashy animations, no parallax
- Use Framer Motion (`motion`, `useInView`)
- Marquee: CSS `@keyframes` in `globals.css`, pause on hover
- Calm reveal/transitions only
- Avoid flashy parallax-heavy effects in core content sections
- Prioritize clarity over novelty

### Dark/Light Mode

- Controlled via `next-themes` (`ThemeProvider` in `app/layout.tsx`)
- Default: light mode. System detection: disabled.
- All color tokens have dark mode variants in `globals.css` `.dark` block

---

## Git Rules

> [!CAUTION]
> **Active branch: `feature/ux-overhaul`**
>
> Claude may ONLY commit and push to `feature/ux-overhaul`.
> **NEVER touch `main`**. No merges, no direct commits, no force pushes to `main`.

- Write clear, descriptive commit messages
- One logical change per commit
- Run `npm run build` to verify before committing

---

## Coding Standards

### TypeScript

- **Strict mode is ON** (`tsconfig.json` → `"strict": true`)
- **No `any` types** — use proper interfaces/types for all data
- Export interfaces from hooks or a shared types file
- Use `@/` path alias for all imports (configured in `tsconfig.json`)

### Component Rules

- **Max 200 lines per component file** — split into sub-components if larger
- Colocate sub-components in the same directory
- Use `"use client"` directive only when needed (hooks, interactivity)
- Prefer server components where possible (Next.js App Router)

### Styling

- **Tailwind CSS only** — no inline styles, no CSS modules
- Use design tokens from `globals.css` (e.g., `bg-primary`, `text-accent`)
- Use `cn()` from `@/lib/utils` for conditional class merging
- shadcn/ui primitives live in `components/ui/` — do not modify these directly

### Data & API Integration

- **All API calls go through a service layer** — hooks in `hooks/` directory
- Current data: mock data in `lib/mock-data.ts` (being migrated to live APIs)
- API contracts documented in `api-docs/`:
  - `market-data-API.md` — FX, commodities, interest, GDP, ESX endpoints
  - `ucs-service-API.md` — contact, news, team endpoints
  - `market-data-TICKER-SYMBOL.md` — ticker symbol reference

### File Organization

```
app/              → Pages and layouts (App Router)
components/
  home/           → Home page sections (hero, dashboard, news, etc.)
  layout/         → Navbar, Footer
  services/       → Services page components
  shared/         → Reusable cross-page components (PageHero)
  ui/             → shadcn/ui primitives (don't edit directly)
hooks/            → Custom React hooks (data fetching, scroll, theme)
lib/              → Utilities (cn, mock data)
api-docs/         → Backend API documentation
public/           → Static assets (images, logos, icons)
```

### Naming Conventions

- Components: `PascalCase` (e.g., `EconomicDashboard`)
- Files: `kebab-case` (e.g., `economic-dashboard.tsx`)
- Hooks: `use-` prefix, `kebab-case` (e.g., `use-economic-dashboard.ts`)
- Interfaces/Types: `PascalCase` (e.g., `FXRate`, `EconomicDashboardData`)

---

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (verify before commits)
npm run lint     # ESLint check
npm run start    # Start production server
```

---

## Context Recovery Protocol

If you are starting a new session or context was cleared:

1. Read PLAN.md for the current sprint plan
2. Run `git log --oneline -10` to see recent commits
3. Run `git status` to see any uncommitted changes
4. Ask the user: 'I have recovered context. Shall I resume from [last task in PLAN.md]?'

---

## Tip

After each completed task in PLAN.md, mark that task done in PLAN.md and update the >> pointer to the next task.' This keeps the plan current at all times.

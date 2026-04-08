# UCS UI — Cleanup Audit

Generated: 2026-04-05  
Branch: `feat/ux-overhaul`  
Audited by: Claude Code (automated grep + manual review)

---

## 1. DEAD COMPONENTS

Components that appear to have zero importers across the codebase.

### Non-UI Components

| File | Status | Notes |
|------|--------|-------|
| `scripts/screenshot.ts` | **KEEP** | Standalone Playwright dev utility — outputs comparison PNGs to `screenshots/`. No imports. Not referenced in package.json scripts. Superseded by the `screenshots/` dir which already has the outputs. |

### shadcn/ui Primitives (components/ui/)

These were bulk-installed via shadcn/ui but have no import in any page, component, or hook. They are Radix/shadcn boilerplate and safe to delete if the feature using them is not planned.

| File | Status | Notes |
|------|--------|-------|
| `components/ui/alert-dialog.tsx` | **KEEP** | No imports found. Common modal pattern — may be needed for future confirm dialogs. |
| `components/ui/aspect-ratio.tsx` | **SAFE TO DELETE** | No imports. Not referenced anywhere. |
| `components/ui/avatar.tsx` | **SAFE TO DELETE** | No imports. Could be used in team profile expansion. |
| `components/ui/badge.tsx` | **SAFE TO DELETE** | No direct imports found via grep on filename. Double-check — could be used as `Badge` inside other UI primitives. |
| `components/ui/breadcrumb.tsx` | **SAFE TO DELETE** | No imports. No page-level breadcrumb navigation exists. |
| `components/ui/button-group.tsx` | **SAFE TO DELETE** | No imports. Not a standard shadcn component — likely custom-added then abandoned. |
| `components/ui/calendar.tsx` | **REVIEW NEEDED** | No imports. But `react-day-picker` and `date-fns` are in package.json — if calendar is deleted, those deps should go too. |
| `components/ui/carousel.tsx` | **SAFE TO DELETE** | No direct filename imports. `embla-carousel-react` IS imported by `news-carousel-layout.tsx` — check if carousel.tsx wraps it. |
| `components/ui/checkbox.tsx` | **SAFE TO DELETE** | No imports. No form uses checkboxes. |
| `components/ui/collapsible.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/command.tsx` | **SAFE TO DELETE** | No imports. `cmdk` package would become orphaned. |
| `components/ui/context-menu.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/drawer.tsx` | **SAFE TO DELETE** | No imports. `vaul` package would become orphaned if deleted. |
| `components/ui/dropdown-menu.tsx` | **KEEP** | No imports found via filename grep. Navbar may use it for mobile menu — verify before deleting. |
| `components/ui/empty.tsx` | **SAFE TO DELETE** | No imports. Non-standard shadcn component. |
| `components/ui/field.tsx` | **SAFE TO DELETE** | No imports. Non-standard shadcn component. |
| `components/ui/hover-card.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/input-group.tsx` | **SAFE TO DELETE** | No imports. Non-standard shadcn component. |
| `components/ui/input-otp.tsx` | **SAFE TO DELETE** | No imports. `input-otp` package becomes orphaned. |
| `components/ui/item.tsx` | **SAFE TO DELETE** | No imports. Non-standard shadcn component. |
| `components/ui/kbd.tsx` | **SAFE TO DELETE** | No imports. Non-standard shadcn component. |
| `components/ui/menubar.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/modal.tsx` | **KEEP** | No imports via filename. Check if `news-modal.tsx` uses shadcn Modal internally. |
| `components/ui/navigation-menu.tsx` | **KEEP** | No imports via filename. Navbar uses custom nav — but verify. |
| `components/ui/pagination.tsx` | **SAFE TO DELETE** | No imports. News/team lists don't paginate. |
| `components/ui/popover.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/progress.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/radio-group.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/resizable.tsx` | **SAFE TO DELETE** | No imports. `react-resizable-panels` becomes orphaned. |
| `components/ui/scroll-area.tsx` | **SAFE TO DELETE** | No imports via filename grep. Could be used inside sidebar. |
| `components/ui/sidebar.tsx` | **REVIEW NEEDED** | No imports via filename. Large component — likely never integrated but check. |
| `components/ui/slider.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/spinner.tsx` | **SAFE TO DELETE** | No imports. Non-standard shadcn component. |
| `components/ui/switch.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/table.tsx` | **REVIEW NEEDED** | No imports via filename. Economic dashboard might use a table in a future phase. |
| `components/ui/tabs.tsx` | **KEEP** | No imports via filename grep. `vision-mission-tabs.tsx` uses a tabs pattern — verify if it pulls from this. |
| `components/ui/toast.tsx` | **SAFE TO DELETE** | No imports via filename. But `toaster.tsx` + `use-toast.ts` exist — check if toast.tsx is the base. |
| `components/ui/toaster.tsx` | **SAFE TO DELETE** | No imports via filename. Is `<Toaster />` mounted in layout.tsx? If not, delete. |
| `components/ui/toggle.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/toggle-group.tsx` | **SAFE TO DELETE** | No imports. |
| `components/ui/use-mobile.tsx` | **SAFE TO DELETE** | Exact duplicate of `hooks/use-mobile.ts`. `sidebar.tsx` imports from hooks, not this file. |
| `components/ui/use-toast.ts` | **SAFE TO DELETE** | Exact duplicate of `hooks/use-toast.ts`. `toaster.tsx` imports from hooks, not this file. |

**Note on REVIEW NEEDED items above:** Grep matched on filename substring — confirm with a full-text import search (e.g. `grep -r "from.*ui/tabs"`) before deleting.

---

## 2. COMMENTED-OUT CODE BLOCKS

Blocks of 5+ consecutive commented lines.

| File | Lines | Summary | Status |
|------|-------|---------|--------|
| `components/home/economic-dashboard.tsx` | 273–304 (32 lines) | Three FX `<StatCard>` components for USD/ETB, EUR/ETB, CNY/ETB sparklines. Left out "pending layout decision." | **KEEP** — If FX sparklines are not coming back, delete. If they are, uncomment and test. Don't leave indefinitely. |
| `lib/mock-data.ts` | 647–655 (9 lines) | Partner entry: "B and M Development Consultants" — commented out because logo file is missing. | **KEEP** — Either source the logo and restore, or delete the block. |
| `lib/mock-data.ts` | 705–713 (9 lines) | Partner entry: "Precise Corporate Services" — commented out because logo file is missing. | **KEEP** — Same as above. |

---

## 3. DEAD MOCK DATA

Exports from `lib/mock-data.ts` with zero importers outside that file (live API data replaced them or they were never wired up).

| Export | Importers | Status | Notes |
|--------|-----------|--------|-------|
| `companyStats` | 0 | **SAFE TO DELETE** | Stats now come from live API or are hardcoded in `home-stats-strip.tsx`. |
| `exchangeRates` | 0 | **SAFE TO DELETE** | Replaced by `use-economic-dashboard` → live market data API. |
| `economicIndicators` | 0 | **SAFE TO DELETE** | Replaced by live API hook. |
| `newsItems` | 0 | **SAFE TO DELETE** | Replaced by `use-news` hook → live UCS service API. |
| `trainingPrograms` | 0 | **SAFE TO DELETE** | Never wired to a component. |
| `simulateApiDelay` | 0 | **SAFE TO DELETE** | Dev utility, replaced by real async API calls. |
| `internationalTrainingCountries` | 0 | **SAFE TO DELETE** | Never consumed by any component. |
| `publications` | 0 | **SAFE TO DELETE** | Publications page not built yet; if/when built, should use live API. |
| `newsCategories` | 2 | **KEEP** | Still imported — used in news filtering UI. |
| `ExchangeRate` interface | 0 | **SAFE TO DELETE** | Only backs `exchangeRates` which is dead. |
| `EconomicIndicator` interface | 0 | **SAFE TO DELETE** | Only backs `economicIndicators` which is dead. |
| `TrainingProgram` interface | 0 | **SAFE TO DELETE** | Only backs `trainingPrograms` which is dead. |
| `TrainingCountry` interface | 0 | **SAFE TO DELETE** | Only backs `internationalTrainingCountries` which is dead. |
| `Publication` interface | 0 | **SAFE TO DELETE** | Only backs `publications` which is dead. |

**Still-active mock data** (kept for reference):
- `vision`, `mission`, `contactInfo` — used on About/Contact pages
- `coreValues` — used in `core-values.tsx`
- `clientLogos` — used in `client-marquee.tsx`
- `strategicPartners` — used in `orbital-partners.tsx`
- `servicePillars` — used in `service-pillars.tsx`
- `trainingCategories` — used in `service-pillars.tsx`

---

## 4. UNUSED IMPORTS / PACKAGES

### Duplicate Hook Files

| Duplicate | Canonical | Status |
|-----------|-----------|--------|
| `components/ui/use-toast.ts` | `hooks/use-toast.ts` | **SAFE TO DELETE** — Files are byte-for-byte identical. All importers use the `hooks/` version. |
| `components/ui/use-mobile.tsx` | `hooks/use-mobile.ts` | **SAFE TO DELETE** — Files are byte-for-byte identical. `sidebar.tsx` imports from `hooks/`, not this file. |

### npm Packages with Zero Direct Source Imports

| Package | Status | Notes |
|---------|--------|-------|
| `date-fns` | **KEEP** | No direct imports, but `react-day-picker` (used by `calendar.tsx`) requires it as a peer dependency. Only becomes removable if `calendar.tsx` and `react-day-picker` are also removed. |
| `@next/bundle-analyzer` | **KEEP** | Imported and used in `next.config.mjs` — conditionally wraps the Next.js config when `ANALYZE=true`. Not a dev waste. |
| `cmdk` | **KEEP** | Only used by `components/ui/command.tsx`, which has no importers. If `command.tsx` is deleted, remove this package too. |
| `input-otp` | **KEEP** | Only used by `components/ui/input-otp.tsx`, which has no importers. Delete together. |
| `vaul` | **KEEP** | Only used by `components/ui/drawer.tsx`, which has no importers. Delete together. |
| `react-resizable-panels` | **KEEP** | Only used by `components/ui/resizable.tsx`, which has no importers. Delete together. |
| `react-day-picker` | **KEEP** | Only used by `components/ui/calendar.tsx`, which has no importers. Delete together (and `date-fns`). |

### `hooks/use-dark-mode.ts`

| File | Importers | Status |
|------|-----------|--------|
| `hooks/use-dark-mode.ts` | 0 | **KEEP** — Zero importers. Dark mode is managed by `next-themes` / `ThemeProvider` directly; this hook is superseded. |

---

## 5. TEMP / TEST / DEV-ONLY FILES

| File/Dir | Status | Notes |
|----------|--------|-------|
| `scripts/screenshot.ts` | **SAFE TO DELETE** | One-off Playwright dev script. Already ran (screenshots are in `screenshots/`). |
| `screenshots/` (entire directory) | **KEEP** | 8 dev-comparison PNGs (`compare-vh*.png`, `compare-3graphs.png`, `compare-6graphs.png`, `compare-hero-overlay.png`). These were used during UI iteration — no runtime use. |
| `assets/inspo/` | **SAFE TO DELETE** | 4 inspiration screenshots (Infisical, McKinsey, BCG, Knapsack). Design reference only — no runtime use, not imported. |
| `assets/logos/unwanted-cbe.png` | **SAFE TO DELETE** | Prefixed "unwanted" — explicitly marked for removal during staging. |
| `assets/logos/unwanted_hibret_insurance.png` | **SAFE TO DELETE** | Same — explicitly marked unwanted. |
| `assets/logos/unwanted-ethiopian_water_tech_ins.jpg` | **SAFE TO DELETE** | Same — explicitly marked unwanted. |
| `assets/logos/unic.png` | **REVIEW NEEDED** | Not referenced in any source file. Unclear origin — could be a client logo candidate not yet added to mock-data. |
| `assets/logos/oromia-insurance.png` | **KEEP** | Exists in `assets/` (not `public/`) so it's never served. Separate from `public/images/logos/clients/oromia-insurance.png` (also unreferenced). Check if it should replace one of the live client logos. |
| `lighthouse-report.json` | **SAFE TO DELETE** | Generated artifact from Phase 15 Lighthouse audit. Should not be committed to the repo; add to `.gitignore` if re-run. |

---

## 6. DUPLICATE ASSETS

### Partner Logos — With-BG Originals (code uses removebg versions only)

All six partners below have both `{name}.png` (with background) and `{name}-removebg-preview.png`. Code only references the removebg versions.

| File | Status | Notes |
|------|--------|-------|
| `public/images/logos/partners/aarohan-service-management-solutions.png` | **KEEP** | With-bg original; `-removebg-preview.png` is what's used. |
| `public/images/logos/partners/askiibez-consulting.png` | **KEEP** | Same. |
| `public/images/logos/partners/glocal-management-partners.png` | **KEEP** | Same. |
| `public/images/logos/partners/path-consulting.png` | **SKEEP** | Same. |
| `public/images/logos/partners/purchasing-and-procurement-center.png` | **KEEP** | Same. |
| `public/images/logos/partners/zinger-solutions.png` | **KEEP** | Same. |
| `public/images/logos/partners/Trempplin.png` | **KEEP** | With-bg original AND wrong case (capital T). Code references `trempplin-removebg-preview.png`. On case-sensitive filesystems (Linux/Docker) this case mismatch would cause a 404. |

### Client Logos — In public/ but not referenced in code or mock-data

| File | Status | Notes |
|------|--------|-------|
| `public/images/logos/clients/hibret-insurance.png` | **KEEP** | Not in `clientLogos` array or any component. May be a planned addition. |
| `public/images/logos/clients/kenera.png` | **KEEP** | Same — not referenced anywhere. |
| `public/images/logos/clients/national-alcohol-and-liquor-factory-nobg.png` | **SAFE TO DELETE** | `nalf.png` is used instead. This may be a longer-named duplicate of the same logo. Verify before deleting. |
| `public/images/logos/clients/oromia-insurance.png` | **KEEP** | Not in `clientLogos`. Distinct from `oromia-bank.png` (which is used). May be intentionally excluded. |

---

## Summary Counts

| Category | Safe to Delete | Review Needed | Keep |
|----------|---------------|---------------|------|
| Dead components (non-UI) | 1 | 0 | 0 |
| Unused shadcn/ui primitives | 18 | 13 | 0 |
| Commented code blocks | 0 | 3 | 0 |
| Dead mock data exports | 8 | 0 | 7 |
| Dead mock data interfaces | 5 | 0 | 0 |
| Duplicate hook files | 2 | 0 | 0 |
| Orphaned npm packages | 0 | 5 | 2 |
| Dead hooks | 1 | 0 | 0 |
| Temp/dev files | 6 | 3 | 0 |
| Duplicate assets | 7 | 4 | 0 |
| **TOTAL** | **48** | **28** | **9** |

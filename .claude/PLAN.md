# PLAN.md — UCS Ethiopia Frontend Sprint



> Active branch: `feat/ux-overhaul`

> Last updated: 2026-04-07



---



## Sprint Goal



Pre-deployment sprint — resolve all API breaking changes, bug fixes, visual polish, responsive issues, and new feature integration before staging deploy.



---



## Active Work



### Phase 17 — Pre-Deployment: UI, Bug Fixes & API Alignment



> Must resolve before staging deploy. Work in order — each batch assumes the previous batch is done.



#### Batch 1 — API & Data (Breaking Changes First)



- [x] **17.1** Team member image response: updated `image` to `string[]` in both interfaces; about page uses `image[0]`; detail page uses `image[1]` for hero bg and `image[3]` for profile photo (generic: any member with multiple images gets different hero vs profile shots).

- [x] **17.2** News API endpoint swap. Added `NEXT_PUBLIC_SOCIAL_STREAM_URL` to `.env`; swapped to `/news/ultimate-consultancy-services/latest` and `/feed?page=X&page_size=9`; updated `NewsItem` type (`body`, `extra_images`, `published_at`), `PaginatedNewsResponse` (`page_size`), and all 3 render sites.

- [x] **17.3** Integrated `percentage_change` from `/fx/latest` and `/commodities/latest`. Removed client-side calc helpers and hardcoded mocks. Null defaults to `0`.

- [x] **17.4** Remove unused FX historical fetch. Delete `GET /fx/historical` calls from `hooks/use-economic-dashboard.ts` and any associated LRU cache keys in `lib/market-data-cache.ts`. Confirm commodity historical fetches still work.



#### Batch 2 — Bug Fixes



- [x] **17.5** Contact form success toast z-index + visibility: added `className="z-[9999]"` and `toastOptions` with solid white/navy background, border, and `shadow-2xl` drop shadow to `<Toaster>` in `app/layout.tsx`.

- [x] **17.6** News filter bar sticky offset: changed to `top-19` in `app/news/page.tsx`.

- [x] **17.7** Services Overview section links: updated "Learn More" hrefs to `/services#slug`; added `id` per tab button and hash-based tab activation in `service-pillars.tsx`.

- [x] **17.8** Contact form phone auto-formatter: already implemented via `formatPhone()` — verified complete.

- [x] **17.9** Contact form SQL injection filtering: added `INJECTION_RE` regex + `.refine(safe, ...)` to all text fields in Zod schema.



#### Batch 3 — Visual Polish



- [x] **17.10** Economic Dashboard symbol name sizing: increase symbol/icon name (e.g. XAU/USD, KC1) to at least `text-sm font-medium` with sufficient contrast. File: `components/home/economic-dashboard.tsx`.

- [x] **17.11** Economic Dashboard symbol name justify + even spacing between the three words (e.g. Ethiopian GDP $149.74B FY 2024 · +8.7% YoY). File: `components/home/economic-dashboard.tsx`.

- [x] **17.12** About page SPEED values: add `text-justify` to description paragraphs in the CoreValues / SPEED section. File: `components/home/core-values.tsx`.

- [x] **17.13** Training pillar orbit animation: fix x/y keyframe animation so orbiting elements are separated by exactly 120° (for 3 items). Rotation should be mechanically uniform. File: `components/services/pillar-visual.tsx`.

- [x] **17.13a** Economic Dashboard GDP YoY change: render `+X.X% YoY` in emerald (positive) or red (negative) via new `change` prop on `TextStatCard`. File: `components/home/economic-dashboard.tsx`.

- [x] **17.14** Add a top padding to the home hero background image to prevent cropping of the building. Preferably same as the height of nav bar(top-19) or half of it so the image starts at the bottom of the nav bar. File: `components/home/hero.tsx`.



#### Batch 4 — Responsive Fixes



- [x] **17.15** Hero image mobile crop: on 375px–430px viewports, adjust `objectPosition` to keep the primary subject visible (e.g. `center 20%`). Test iPhone SE (375px) and iPhone 14 Pro (393px). File: `components/home/hero.tsx`.

- [x] **17.16** Global Partners section mobile: reduce logo height from `h-12` to `h-8` below `md:`, reduce grid gap. Verify no horizontal overflow at 375px. File: `components/home/client-marquee.tsx`.



#### Batch 5 — New Features



- [x] **17.17** News homepage section: editorial grid layout — 1 featured (left) + 3 stacked (right). Grid `lg:grid-cols-2`, column tops aligned via `pt-0` on first right item, `justify-between` fills height on desktop, thumbnails `w-24 h-20 sm:w-32 sm:h-24`, generous bottom padding `clamp(6rem,10vw,10rem)`, fully responsive (single-col mobile, wrapping header). File: `components/home/firm-news.tsx`.

- [ ] **17.18** Light/white mode theme: add a third theme option — light (white), base (navy), dark. Implement as a sliding pane or 3-way toggle. Default to base. Audit all components to ensure the white theme looks professional (not washed out). This touches `globals.css` and potentially every component's color tokens — do last.



#### >> Next: **17.18**



---



## Completed Phases (History)



<details>

<summary>Phases 1–16 (click to expand)</summary>



### Hotfix Batch — Session 10 New Issues



#### HF-1 — Color Scheme Migration

- [x] **HF-1.1** Audit `globals.css` — verify default color scheme is ucs-brand navy/gold

- [x] **HF-1.2** Audit dark mode — ensure browsers don't invert, default is always brand color



#### HF-2 — Client & Partner Logo Hover Effects

- [x] **HF-2.1–2.5** Logo hover consistency, sizing, background cleanup



#### HF-3 — Background Images

- [x] **HF-3.1–3.4** Logo rendering, hero images for About/Services, integration



#### HF-5 — Data Visualization & Performance

- [x] **5.1** Economic Dashboard aspect ratio refinement

- [x] **5.2** LRU Cache (12-hour TTL, ~1000-point downsampling)

- [x] **5.3** Skeleton loader resilience fix



### Phase 12 — News + About Improvements

- [x] **12.3–12.6** NewsModal, filtering, tag unification



### Phase 13 — API Tasks + Stakeholder Data

- [x] **13.1–13.4** Image audit, trend API, team endpoints

- [x] **13.9.1–13.9.11** All stakeholder data confirmed

- [ ] **13.9.12** _(Blocked)_ B&M + Precise partner logos



### Phase 14 — Component Sourcing & Polish

- [x] **14.1–14.9** Stats animation, team profiles, services animations, partners, vision/mission tabs, UI review



### Phase 15 — Security + Performance

- [x] **15.1–15.5** Security audit, bundle size, image optimization, Core Web Vitals, build verification



### Phase 16 — Demo Prep

- [x] **16.1–16.3, 16.5** UI review, cross-browser, mobile, demo script

- [ ] **16.4** Deploy to staging

- [ ] **16.6** Final stakeholder sign-off



</details>



---



## Blocked Items



| Item | Blocker | Owner |

|------|---------|-------|

| Date-range filter for news archive | Input from ucs-service-api | @Natoli74 |

| Multi-tag display in news | Input from ucs-service-api | @Natoli74 |

| Partner logos (B&M, Precise) | Missing assets | @Natoli74 |

| Deploy to staging | Awaiting revamp completion | @Natoli74 |



---



## Content Gaps



| # | Item | Status |

|---|------|--------|

| 1 | Hero sub-copy | ⚠️ Adapted, not sourced from firm |

| 2 | SPEED core value descriptions | ⚠️ Claude-written, needs sign-off |

| 3 | Team member bios | ⚠️ Blocked on stakeholders |

| 4 | Partner logos (all 10) | ⚠️ Missing |

| 5 | Client logos (6 of 19) | ⚠️ Siinqee, CBE, VisionFund, United Insurance, IRC, NALF |

| 6 | Publications completeness | ⚠️ 2 confirmed; may be more |

| 7 | Oda publication year | ⚠️ null — confirm with stakeholders |


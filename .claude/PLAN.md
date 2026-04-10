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

- [x] **17.16a** Hero image mobile crop direction: changed `object-top` → `object-right-top sm:object-top` on home hero; `bg-top` → `bg-right-top sm:bg-top` on about/services PageHero. Crops from left on phones, preserving center-to-right subject. Files: `components/home/hero.tsx`, `app/about/page.tsx`, `app/services/page.tsx`.

- [x] **17.16b** Client marquee edge blur: added `backdrop-blur-sm` with `mask-image` gradient overlays on top of the existing colour-fade overlays, creating a frosted-glass entrance/exit effect at both ends. File: `components/home/client-marquee.tsx`.

- [x] **17.16c** Economic Dashboard TextStatCard mobile layout: changed `flex-col → flex-row` always, with `justify-between` and responsive font scaling (`text-xs sm:text-sm` / `text-sm sm:text-lg`). All three values stay on one line across all viewports. File: `components/home/economic-dashboard.tsx`.



#### Batch 5 — New Features



- [x] **17.17** News homepage section: editorial grid layout — 1 featured (left) + 3 stacked (right). Grid `lg:grid-cols-2`, column tops aligned via `pt-0` on first right item, `justify-between` fills height on desktop, thumbnails `w-24 h-20 sm:w-32 sm:h-24`, generous bottom padding `clamp(6rem,10vw,10rem)`, fully responsive (single-col mobile, wrapping header). File: `components/home/firm-news.tsx`.

- [x] **17.18** Light/white mode theme: added `.light` class to `globals.css` with `--accent: var(--gold-600)` for contrast; 3-way segmented toggle (Sun/Building2/Contrast) in `theme-toggle.tsx`; updated ThemeProvider to include `"light"` theme; fixed hardcoded `bg-navy-900`/`text-white` in 12 content components to use semantic tokens (`bg-card`, `bg-muted`, `text-card-foreground`, etc.) while keeping branded sections (navbar, footer, hero, ticker) always dark. Visual audit passed on all pages (home, about, services, news, contact) at desktop and mobile.



#### >> All Phase 17 tasks complete.


### Phase 18 — Pre-Staging: Reverts, Polish & Responsiveness

#### Reverts

- [x] **18.1** News homepage section: revert to the original news section that existed before the `chore/plugin-fluff` cherry-pick. Remove the ported version entirely and restore what was there previously. Use `git log` or `git diff` to identify the original component if needed.

- [x] **18.2** SPEED acronym values: revert the `text-justify` change on the SPEED values paragraphs under the home page. Return to the original text alignment.

#### Visual Polish

- [x] **18.3** Global Partners logos on About page: scale up logo sizes to be more visible. On the hover effect, add a `z-index` so the hovered logo renders above neighboring logos — only apply the z-index bump on hover, not at rest.

- [x] **18.4** Currency ticker bar responsiveness: the ticker bar disappears entirely on mobile viewports. Fix so it remains visible on phone-sized screens. May need to adjust the layout, reduce item count, or allow horizontal scroll.

- [x] **18.5** Client marquee mobile speed: increase marquee scroll speed on smaller breakpoints. Speed should scale proportionally — fastest on phone, medium on tablet, current speed on desktop. Adjust the CSS animation duration or JS config at `sm:` and `md:` breakpoints.

#### >> All Phase 18 tasks complete.

#### Post-18 Corrections (2026-04-08)
- **18.1 re-done**: News section restored from `238fd9a` (not `e3b6fa6`) — horizontal carousel layout with `NewsCarouselLayout`, `useFirmNews(9)`, prev/next controls, modal on click.
- **18.3 refined**: Orbital partner node reverted from `h-22` to `h-20 w-20`; z-index propagated to outer `motion.div.absolute` wrappers (not just `PartnerNode` inner div) so tooltip clears all neighbors on hover.


### Phase 19 — Light Mode Visual Refinement

- [ ] **19.1** __Paused__ Conduct a thorough visual audit of the entire site in light mode, comparing against the design mockups. Look for any inconsistencies in colors, spacing, typography, or component styling that may have been missed during development.

#### >> Phase 20

### Phase 20 — Demo Prep

- [ ] **20.1–20.3, 20.5** UI review, cross-browser, mobile, demo script

### License & Security

- [x] **20.6** Replace the MIT license in LICENSE file with a proprietary license. Use this template, polished for professionalism: "".  Update the `license` field in `package.json` from `"MIT"` to `"SEE LICENSE IN LICENSE"`. Apply the same license to any other repos in the project (backend, etc.) if accessible.

- [x] **20.7** Update source code files if any have header comments that mention the MIT License; you should either remove it or add a simple one-line header: // Copyright (c) 2025 Ultimate Consultancy Service PLC. All rights reserved

- [x] **20.8** Security audit: do a pass over the codebase for common frontend vulnerabilities — unescaped user input, exposed env vars in client bundles, open CORS issues, any hardcoded secrets. Flag and fix anything found.




After writing the plan, run `npm run build` to confirm clean build, then report back.

- [ ] **20.8** Deploy to staging

- [ ] **20.10** Final stakeholder sign-off



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


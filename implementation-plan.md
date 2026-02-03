# UCS UI Redesign Roadmap

This document tracks the phased redesign of the UCS Ethiopia frontend.
Each phase should be completed in order.  
Each new ChatGPT conversation corresponds to **one phase**.

---

## Phase 1 – Design System Lock

**Goal:** Freeze all foundations so future work is consistent and scalable.

### Tasks

- [ ] Define brand colors as CSS variables (navy, gold, base neutrals)
- [ ] Replace hardcoded Tailwind colors with design tokens
- [ ] Configure dark / light mode at the root level
- [ ] Add theme toggle to the navbar
- [ ] Finalize global typography
  - [ ] Headline font (serif)
  - [ ] Body font (sans-serif)
  - [ ] Type scale (H1–H6, body, captions)
- [ ] Lock base spacing rules (section padding, max-widths)
- [ ] Review and finalize navbar (desktop + mobile)
- [ ] Review and finalize footer

### Constraints

- No new features
- No animations
- No Canva-inspired visuals yet
- No layout experimentation

---

## Phase 2 – Home Page Core Structure

**Goal:** Make the Home page structurally correct and aligned with product logic.

### Tasks

- [ ] Rebuild Hero section visually (inspired by Canva)
  - [ ] Background image
  - [ ] Headline + tagline
  - [ ] Primary CTA
- [ ] Replace “Training” section with **Services Overview**
  - [ ] Four service pillars summary
  - [ ] Clear “Learn More” links to `/services`
- [ ] Implement Core Values section
- [ ] Implement Client / Partner marquee
  - [ ] Continuous horizontal scroll
  - [ ] Pause on hover
- [ ] Ensure responsive layout integrity (mobile / tablet / desktop)

### Constraints

- Static layout only
- No API simulation
- No economic data yet
- Minimal motion (layout only)

---

## Phase 3 – Economic Dashboard + News (Home)

**Goal:** Make the site feel live, credible, and data-driven.

### Tasks

- [ ] Economic Dashboard
  - [ ] FX rates row (with flags and directional change)
  - [ ] Graph row (GDP, policy rate)
  - [ ] Desktop-only sparklines
  - [ ] “LIVE” indicator
- [ ] News Carousel (firm news only)
  - [ ] Card-based layout
  - [ ] Category tags
  - [ ] “Read More” action
- [ ] Reusable Modal system
  - [ ] News modal
  - [ ] Shared overlay logic
- [ ] Mock API behavior
  - [ ] Simulated loading delay
  - [ ] Placeholder JSON data

### Notes

This phase introduces realism and perceived depth.

---

## Phase 4 – About Page

**Goal:** Establish editorial authority and trust.

### Tasks

- [ ] Page hero (shorter than Home)
- [ ] “Our Story” narrative section
- [ ] Team section
  - [ ] CEO highlighted (larger card or row)
  - [ ] Remaining team in grid
  - [ ] Profile modal with full bio
- [ ] Stats section
  - [ ] Years of experience
  - [ ] Projects completed
  - [ ] Clients served

---

## Phase 5 – Services Page

**Goal:** Clearly communicate enterprise offerings.

###

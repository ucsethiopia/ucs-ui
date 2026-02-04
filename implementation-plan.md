# UCS UI Redesign Roadmap

This document tracks the phased redesign of the UCS Ethiopia frontend.
Each phase should be completed in order.  
Each new ChatGPT conversation corresponds to **one phase**.

---

## Phase 1 – Design System Lock

**Goal:** Freeze all foundations so future work is consistent and scalable.

### Tasks

- [x] Define brand colors as CSS variables (navy, gold, base neutrals)
- [x] Replace hardcoded Tailwind colors with design tokens
- [x] Configure dark / light mode at the root level
- [x] Add theme toggle to the navbar
- [x] Finalize global typography
  - [x] Headline font (serif)
  - [x] Body font (sans-serif)
  - [x] Type scale (H1–H6, body, captions)
- [x] Lock base spacing rules (section padding, max-widths)
- [x] Review and finalize navbar (desktop + mobile)
- [x] Review and finalize footer

### Constraints

- No new features
- No animations
- No Canva-inspired visuals yet
- No layout experimentation

---

## Phase 2 – Home Page Core Structure

**Goal:** Make the Home page structurally correct and aligned with product logic.

### Tasks

- [x] Rebuild Hero section visually (inspired by Canva)
  - [x] Background image
  - [x] Headline + tagline
  - [ ] Primary CTA
- [x] Replace “Training” section with **Services Overview**
  - [x] Four service pillars summary
  - [x] Clear “Learn More” links to `/services`
- [x] Implement Core Values section
- [x] Implement Client / Partner marquee
  - [x] Continuous horizontal scroll
  - [x] Pause on hover
- [x] Ensure responsive layout integrity (mobile / tablet / desktop)

### Constraints

- Static layout only
- No API simulation
- No economic data yet
- Minimal motion (layout only)

---

## Phase 3 – Economic Dashboard + News (Home)

**Goal:** Make the site feel live, credible, and data-driven.

### Tasks

- [x] Economic Dashboard
  - [x] FX rates row (with flags and directional change)
  - [x] Graph row (GDP, policy rate)
  - [x] Desktop-only sparklines
  - [x] “LIVE” indicator
  - [ ] x and y coordinate values for reference 
- [x] News Carousel (firm news only)
  - [x] Card-based layout
  - [x] Category tags
  - [x] “Read More” action
- [x] Reusable Modal system
  - [x] News modal
  - [x] Shared overlay logic
- [x] Mock API behavior
  - [ ] Simulated loading delay
  - [x] Placeholder JSON data

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

### Tasks

- [ ] Implement four service pillars
  - [ ] Training
  - [ ] Advisory
  - [ ] Research & Publication
  - [ ] Communication & Promotion
- [ ] Choose layout pattern (tabs, alternating rows, or sections)
- [ ] Add service-specific bullet lists
- [ ] End-of-page CTA banner (“Get in Touch”)

---

## Phase 6 – News Page (Full Archive)

**Goal:** Build a scalable content system.

### Tasks

- [ ] News grid layout (reusing Home cards)
- [ ] Category filter pills
- [ ] Initial load (top N items)
- [ ] “Load More” pagination
- [ ] Modal-based article reading (no navigation)
- [ ] Mock API pagination behavior

---

## Phase 7 – Contact Page

**Goal:** Optimize for conversion and clarity.

### Tasks

- [ ] Contact form
  - [ ] Name
  - [ ] Email
  - [ ] Phone
  - [ ] Company
  - [ ] Service of interest
  - [ ] Message
- [ ] Client-side validation
- [ ] Success / error toast feedback
- [ ] Office information panel
  - [ ] Address (Bole, Addis Ababa)
  - [ ] Phone
  - [ ] Email
  - [ ] Hours

---

## Phase 8 – Mock Data to API Requests

**Goal:** Use all API docs and fully integrate backend and frontend

### Tasks

- [ ] Econ dash API
- [ ] Economic News API
- [ ] Firm News API
- [ ] team + team/member API


---

## Phase 8 – Polish & Refinement

**Goal:** Make the site feel premium and complete.

### Tasks

- [ ] Decide on order of sections in the home page - include @jaft24 in this
- [ ] Scroll-triggered reveal animations
- [ ] Consider Setting a max width of about 1440 px and a slightly less marquee window
- [ ] Motion tuning (durations, easing, stagger)
- [ ] Spacing and alignment audit
- [ ] Typography fine-tuning
- [ ] Mobile UX pass
- [ ] Accessibility pass (contrast, focus states)

---


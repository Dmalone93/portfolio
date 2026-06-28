# Personality Pass: The Living Portfolio

**Date:** 2026-06-28
**Goal:** Add micro-interactions, a showpiece hero, scroll animations, voice rewrites, and visual polish to the portfolio — making it feel crafted with creative edge while staying job-focused.

---

## Scope

### In scope
- Showpiece hero with text animation and magnetic cursor
- 3D tilt project cards with hover effects
- Scroll-triggered entrance animations across all pages
- Animated metric count-ups on case study pages
- View Transitions API for page crossfades
- Copy rewrite across all pages (generic → human voice)
- Custom cursor (desktop only)
- Two-tone accent color system
- Button hover sweep animations
- Card noise texture
- Typography tightening

### Out of scope
- New pages or content
- Layout restructuring
- Mobile-specific gesture interactions (tilt/cursor effects are desktop-only, graceful fallback)
- Third-party animation libraries (Framer Motion, GSAP) — all interactions built with vanilla JS/CSS + React hooks

---

## Section 1: Showpiece Hero

### Text animation
- Each word of "Declan Malone" fades in and slides up from ~20px below
- Staggered: ~80ms delay between words, ~600ms total duration per word
- Title and tagline follow after the name completes, with their own fade-up
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo feel)

### Magnetic cursor zone
- The hero section tracks mouse position
- A soft radial gradient (accent color at ~5% opacity, ~300px radius) follows the cursor
- Text elements shift very slightly in response to cursor position (max ~3px parallax offset)
- Effect disabled on touch devices

### CTA button — magnetic pull
- When cursor enters ~100px radius of the button, button nudges toward cursor (max ~6px offset)
- On hover: background color sweeps from left to right (200ms)
- Spring-like return to center when cursor exits radius

---

## Section 2: Project Cards

### 3D perspective tilt
- Each card tracks mouse position relative to its own bounds
- Tilt range: max 8-10 degrees on both X and Y axes
- A specular sheen/highlight (white at ~8% opacity) follows the cursor across the card surface
- `transform-style: preserve-3d`, `perspective: 800px` on the grid container

### Hover effects
- translateY: -4px on hover
- Shadow deepens from subtle to medium
- Metric pills shift from `#f5f5f5` background to accent color background with white text
- Subtle border glow (accent color at ~15% opacity via box-shadow)

### Staggered entrance
- When project grid scrolls into viewport, cards animate in one by one
- Each card: fade in + slide up 20px
- Stagger: ~100ms between cards
- Triggered once (IntersectionObserver, `{ once: true }`)

### Click feedback
- On mousedown: card scales to 0.98 (50ms)
- On release/navigation: scale back to 1

---

## Section 3: Scroll Animations & Page Transitions

### Scroll-triggered entrances
- Every major element (headings, text blocks, stat cards, process steps, comparison sections) fades in and slides up ~20px
- Triggered once via IntersectionObserver with `threshold: 0.1`
- Within groups (stats row, skills grid, process steps): stagger ~100ms between items
- Duration: 500ms per element
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Case study specifics
- Section headers: fade in with a subtle left-to-right clip reveal
- Metric callout numbers: count up from 0 to their value when scrolling into view
  - Parse the number from the stat value string (e.g. "+13%" → count to 13, suffix "%", prefix "+")
  - Duration: ~1000ms, eased
  - Non-numeric stats display normally without animation

### Page transitions
- Use the View Transitions API (`document.startViewTransition`)
- Next.js integration: wrap navigation in `startViewTransition` where supported
- Crossfade: ~200ms opacity transition
- Progressive enhancement: unsupported browsers get instant navigation (no polyfill)

### Smooth scroll
- CSS `scroll-behavior: smooth` on `<html>` element
- Applied to "See the work" CTA anchor link

---

## Section 4: Copy Rewrites

All copy changes — labels, headings, and body text:

| Location | Current | New |
|---|---|---|
| Homepage section heading | "Selected Work" | "What I've shipped" |
| Homepage CTA button | "View my work" | "See the work" |
| Case study: Challenge heading | "Challenge" | "The problem" |
| Case study: Process heading | "Process" | "How I approached it" |
| Case study: What Changed heading | "What Changed" | "What I changed" |
| Case study: Impact heading | "Impact" | "What it did" |
| Case study: Before & After heading | "Before & After" | "Before & after" |
| Case study: Live Prototype heading | "Live Prototype" | "Try it" |
| About page heading | "About" | "A bit about me" |
| About page: Details heading | "Details" | "The basics" |
| Contact page heading | "Contact" | "Get in touch" |
| Contact intro text | "I'm open to Product and UX Design roles. Get in touch." | "I'm looking for my next Product/UX Design role. If you think we'd work well together, I'd love to hear from you." |

Navigation labels stay unchanged: Work, About, Resume, Contact.

---

## Section 5: Visual Polish

### Two-tone accent colors
- Primary accent: `#2563eb` (blue) — links, metric highlights, primary actions
- Secondary accent: `#f97316` (amber/orange) — CTA button hover fill, metric count-up highlight flash
- The two colors are used sparingly and never compete in the same element

### Custom cursor (desktop only)
- Small inner dot: 8px, solid accent color
- Larger trailing circle: 32px, 1px border accent color, follows with lerp (0.15 factor)
- Both use `position: fixed`, `pointer-events: none`
- Hidden on touch devices (`@media (hover: none)`)
- Reverts to default cursor over interactive elements (links, buttons) — the custom cursor hides, native pointer appears
- Implementation: a client component at the layout level

### Card noise texture
- CSS-only noise using a tiny inline SVG `<filter>` with `feTurbulence`
- Applied as a pseudo-element overlay on project cards at ~3% opacity
- Gives a subtle paper/printed texture

### Button hover sweep
- CTA and action buttons: background fill sweeps left-to-right on hover
- Implemented with a `::before` pseudo-element, `scaleX(0)` → `scaleX(1)` with `transform-origin: left`
- Duration: 200ms

### Typography tightening
- Hero name: `text-4xl sm:text-5xl` (up from 3xl/4xl)
- All headings: `tracking-tight` (letter-spacing: -0.02em)
- Hero name specifically: `tracking-tighter` (-0.04em)

---

## Technical Approach

### No external animation libraries
All interactions built with:
- CSS transitions and animations
- CSS `@keyframes`
- Vanilla JavaScript via React hooks (`useEffect`, `useRef`, `useState`)
- `IntersectionObserver` for scroll triggers
- `requestAnimationFrame` for cursor tracking and lerp
- View Transitions API (native browser)

### New components to create
| Component | Type | Purpose |
|---|---|---|
| `animated-hero.tsx` | Client | Hero with text stagger, magnetic cursor, CTA |
| `tilt-card.tsx` | Client | 3D tilt wrapper for project cards |
| `scroll-reveal.tsx` | Client | IntersectionObserver wrapper for entrance animations |
| `count-up.tsx` | Client | Animated number count-up for metrics |
| `custom-cursor.tsx` | Client | Dot + trailing circle cursor |
| `magnetic-button.tsx` | Client | Button with magnetic pull effect |

### Files to modify
| File | Changes |
|---|---|
| `src/app/layout.tsx` | Add CustomCursor, smooth scroll class |
| `src/app/page.tsx` | Replace hero with AnimatedHero, wrap cards in TiltCard, add ScrollReveal |
| `src/app/work/[slug]/page.tsx` | Add ScrollReveal to sections, CountUp to metrics, copy rewrites |
| `src/app/about/page.tsx` | Add ScrollReveal, copy rewrites |
| `src/app/resume/page.tsx` | Add ScrollReveal to sections |
| `src/app/contact/page.tsx` | Copy rewrites, ScrollReveal |
| `src/components/project-card.tsx` | Metric pill hover color change, noise texture |
| `src/app/globals.css` | Smooth scroll, noise texture filter, sweep animation keyframes |

### Performance considerations
- All cursor tracking uses `requestAnimationFrame` (no layout thrashing)
- IntersectionObserver callbacks are lightweight (toggle a class)
- View Transitions are progressive enhancement
- Custom cursor hidden on mobile (no unnecessary DOM/listeners)
- No heavy libraries — total JS addition should be minimal

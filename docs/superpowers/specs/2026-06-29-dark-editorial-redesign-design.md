# Dark Editorial Redesign — Trionn-Inspired

**Date:** 2026-06-29
**Goal:** Complete visual overhaul from clean minimal white to dark editorial aesthetic inspired by Trionn.com. Same content and data layer, entirely new visual identity.

---

## Scope

### In scope
- Preloader with logo, crosshairs, counter, wipe transition
- Full color system swap: white → near-black (#0C0C0C)
- 3-font typography stack (editorial serif, grotesque sans, monospace)
- Redesigned navigation (logo left, CTA + menu right, dark theme)
- Full-viewport hero with bold serif headline, staggered word reveal, 3D/animated motif
- Asymmetric project grid with image/video placeholders
- Media placeholders on all pages (hero, case studies, about)
- Crosshair corner motifs as decorative elements
- Updated motion system (vibration/glitch hovers, line-by-line text reveals, cubic-bezier(0.25, 0, 0, 1))
- Redesigned footer with establishment year + descriptor
- Copy overhaul — casual, specific, storytelling-driven
- Case study pages with full-width hero media, inline media placeholders
- About page with split layout (copy + media)
- All existing personality pass components updated or replaced for dark theme

### Out of scope
- Actual media assets (all placeholders with dashed borders)
- New content or pages
- CMS changes
- External animation libraries (still vanilla CSS/JS + React hooks)

---

## Color System

| Token | Value | Usage |
|---|---|---|
| `bg` | `#0C0C0C` | Page background |
| `bg-elevated` | `#141414` | Cards, elevated surfaces |
| `bg-preloader` | `#d4d4d4` | Preloader screen |
| `text` | `#ffffff` | Primary text |
| `text-muted` | `#888888` | Secondary text, labels |
| `text-dim` | `#555555` | Tertiary text |
| `border` | `#222222` | Dividers, borders |
| `border-light` | `#333333` | Card borders, hover states |
| `accent` | `#ffffff` | CTAs, active links |

---

## Typography

### Font stack
1. **Editorial serif** — PP Editorial New (Google Fonts alternative: Playfair Display Italic or similar). Used for headlines.
   - Weight: 300-400 (light/regular)
   - Size: 60-80px+ for hero, 36-48px for section heads
   - Style: italic for hero headline, regular for section heads
   - Letter-spacing: -0.02em

2. **Grotesque sans** — Neue Haas Display (Google Fonts alternative: Inter or Geist). Used for body text.
   - Weight: 400 for body, 500 for emphasis
   - Size: 16-18px
   - Line-height: 1.6-1.7

3. **Monospace** — Martian Mono (available on Google Fonts). Used for labels, tags, counters.
   - Weight: 300-400
   - Size: 11-13px
   - Letter-spacing: 0.1em
   - Text-transform: uppercase

### Hierarchy
- Hero headline: editorial serif, 72-80px, italic, light weight
- Section headings: editorial serif, 36-48px, regular
- Body: grotesque sans, 16-18px
- Labels/tags: monospace, 11-12px, uppercase, spaced
- Nav links: monospace, 12px, uppercase
- Stats/metrics: monospace, 24-32px, light weight

---

## Preloader

### Layout
- Full-screen overlay, `z-index: 9999`, `#d4d4d4` background
- Center: name "DECLAN MALONE" in monospace, uppercase, spaced, inside a thin-bordered rectangle (~300x200px)
- Corner crosshairs on the rectangle:
  - Top-left and top-right: `×` character
  - Bottom-left and bottom-right: `+` character
- Below rectangle: tagline "PRODUCT / UX DESIGNER" in monospace, 11px, uppercase, letter-spacing 0.2em
- Bottom of screen: counter "0" → "100" in monospace, animates over ~2.5 seconds

### Transition
- On counter reaching 100: preloader wipes upward (translateY -100%) over 600ms
- Easing: cubic-bezier(0.25, 0, 0, 1)
- Main site content is already rendered behind the preloader

### Implementation
- Client component wrapping the body
- Counter uses requestAnimationFrame
- CSS transition for the wipe
- Runs once per session (sessionStorage flag to skip on back-navigation)

---

## Navigation

### Desktop
- Sticky top, transparent background with backdrop-blur on scroll
- Left: "DECLAN MALONE" in monospace, uppercase, letter-spacing 0.1em
- Right: "Start a project →" CTA (monospace, underline on hover) + hamburger menu icon
- Hamburger opens full-screen overlay menu with page links in editorial serif, large (48px)

### Mobile
- Same layout, hamburger always visible
- No horizontal link list

### Menu overlay
- Full-screen `#0C0C0C` with slight opacity
- Links centered: Work, About, Resume, Contact — editorial serif, 48px
- Close button top-right
- Fade-in transition

---

## Homepage

### Hero (full viewport)
- Full `100dvh` section
- Large editorial serif headline in italic: "I design products that move numbers."
- Staggered word-by-word reveal (same technique as current AnimatedHero but with new font/sizing)
- Below headline: 1-2 line descriptor in sans-serif, muted text
- Visual centerpiece: animated motif/logo element (placeholder: a rotating crosshair SVG or geometric shape, CSS animation)
- Bottom: scroll indicator ("Scroll" in monospace + small animated chevron)

### Copy
```
I design products that move numbers.

At DFYNE, I built the UX practice from scratch — hired 10 people,
established CRO from zero, and shipped features that lifted AOV by 13%.
Before that, I designed trading interfaces at JP Morgan and margin
analytics at OpenGamma.

I come from fine art photography, so I think about
composition and clarity in everything I make.
```

### Project showcase
- Section label: "SELECTED WORK" in monospace, uppercase, spaced
- Asymmetric grid: alternating rows
  - Odd rows: large card left (60%), small card right (40%)
  - Even rows: small card left (40%), large card right (60%)
- Each card:
  - Media placeholder area (dashed border `#333`, rounded corners, aspect-ratio 16/10)
  - Below: project title in editorial serif (24px), company in monospace (12px, uppercase, muted)
  - Hover: placeholder border brightens, card lifts, title shifts color
  - Corner crosshair motif on the media placeholder (top-left `×`)

---

## Case Study Pages

### Hero
- Full-width media placeholder (aspect-ratio 21/9, dashed border)
- Below: project title in editorial serif (48px), company + role in monospace
- Stats row: each stat in a bordered card, number in monospace (28px), label in monospace (11px, muted)
- CountUp animation on stats preserved

### Body sections
- Max-width ~720px centered
- Each section heading in editorial serif (28px)
- Body in sans-serif
- Inline media placeholders between sections (full-width within the content column, dashed border, aspect-ratio 16/9, labeled "Screenshot / video")
- Place media placeholders after: summary, process, and before impact

### Section labels
- "THE PROBLEM", "HOW I APPROACHED IT", "WHAT I CHANGED", "TRY IT", "WHAT IT DID" — in monospace, uppercase, spaced, muted, above the serif heading
- Serif heading below is the section's descriptive title (or omit if redundant)

### Motion
- Scroll reveals with fade-up, 20px offset
- Line-by-line text reveal for longer paragraphs (each line fades in with 50ms stagger)
- Easing: cubic-bezier(0.25, 0, 0, 1)

---

## About Page

### Layout
- Split: 60% copy left, 40% media placeholder right (sticky on scroll)
- Media placeholder: tall portrait aspect ratio (3/4), dashed border, labeled "Photo / video"

### Copy
```
A bit about me

I'm Declan — a product and UX designer based in Glasgow, currently
leading UX at DFYNE.

I started in fine art photography at the Glasgow School of Art, then
moved into software through a full-stack development course at CodeClan.
That crossover — visual composition meets engineering logic — shapes how
I approach every design problem.

I've designed trading platforms at JP Morgan, margin analytics tools at
OpenGamma, and ecommerce experiences at DFYNE and Toolstop. I care most
about the intersection of design systems, data, and commercial outcomes.

When I'm not designing, I'm probably reading about systems thinking or
falling down a rabbit hole about ancient artifacts.
```

### Details section
- Stats in a horizontal row: "6+ YEARS", "50+ PROJECTS", "10 PEOPLE HIRED" — monospace, bordered cards
- Skills in two columns below, monospace labels

---

## Resume Page

- Same content, restyled for dark theme
- Section labels in monospace uppercase
- Experience entries: role in serif, company/timeframe in monospace
- Clean typographic hierarchy, no cards — just well-spaced sections with subtle `#222` dividers

---

## Contact Page

### Copy
```
Get in touch

I'm looking for my next Product/UX Design role. If you think
we'd work well together, I'd love to hear from you.
```

- Contact links styled as underlined text rows (not cards): email, LinkedIn, portfolio
- Monospace labels, sans-serif values
- "Start a project →" style with underline hover animation

---

## Footer

- Full-width, top border `#222`
- Left: "© 2025 DECLAN MALONE" in monospace
- Center: "PRODUCT / UX DESIGNER — EST. 2019" in monospace, muted
- Right: email link
- Crosshair motif in corners

---

## Motion System

### Global easing
`cubic-bezier(0.25, 0, 0, 1)` for all transitions (replaces current cubic-bezier(0.16, 1, 0.3, 1))

### Scroll reveals
- Fade up: opacity 0→1, translateY 20px→0
- Duration: 600ms
- Triggered once via IntersectionObserver

### Text reveals
- Headlines: word-by-word stagger (80ms between words)
- Body paragraphs: line-by-line (50ms stagger) — implemented by splitting text into span-wrapped lines via CSS `display: inline` with overflow hidden containers

### Hover effects
- Interactive elements: subtle vibration effect (rapid small translateX oscillation, 2-3 cycles over 300ms) on hover
- CTA underlines: width animates from 0 to 100% on hover
- Project cards: border color brightens `#333`→`#555`, translateY -4px

### Preloader
- Counter: 0→100 over 2.5s with eased acceleration
- Wipe: translateY(0) → translateY(-100%) over 600ms

---

## Decorative Elements

### Corner crosshairs
A reusable pattern applied to key containers (preloader frame, project media placeholders, footer):
```
×————————————————————×
|                    |
|     content        |
|                    |
+————————————————————+
```
Implemented as CSS pseudo-elements or a wrapper component.

### Category labels
`SELECTED WORK`, `THE PROBLEM`, `EXPERIENCE` etc. — all monospace, 11px, uppercase, letter-spacing 0.15em, `#888`

### CTA style
"Start a project →" — monospace, with underline that grows from left on hover

---

## Technical Approach

### Fonts (Google Fonts available)
- Playfair Display (italic) — closest free editorial serif to PP Editorial New
- Geist (already installed) — grotesque sans, keep as body font
- Martian Mono — available on Google Fonts, add to next/font

### New components
| Component | Purpose |
|---|---|
| `preloader.tsx` | Full-screen loader with counter and wipe |
| `crosshair-frame.tsx` | Reusable crosshair corner decoration |
| `media-placeholder.tsx` | Dashed-border placeholder for images/videos |
| `menu-overlay.tsx` | Full-screen navigation menu |
| `text-reveal.tsx` | Line-by-line text reveal on scroll |
| `vibrate-hover.tsx` | Wrapper adding vibration on hover |

### Modified components
| Component | Changes |
|---|---|
| `animated-hero.tsx` | New fonts, sizing, italic serif, motif element |
| `nav.tsx` | Dark theme, hamburger + CTA right, menu overlay |
| `footer.tsx` | Dark theme, establishment year, crosshair motifs |
| `scroll-reveal.tsx` | Updated easing to cubic-bezier(0.25, 0, 0, 1) |
| `project-card.tsx` | Dark cards, asymmetric grid, media placeholders |
| `tilt-card.tsx` | Updated for dark surfaces |
| `custom-cursor.tsx` | White dot/circle instead of blue |
| `globals.css` | Complete retheme — dark background, new CSS vars, font stacks |

### Modified pages
| Page | Changes |
|---|---|
| `layout.tsx` | Add Playfair Display + Martian Mono fonts, add Preloader, dark body |
| `page.tsx` | New hero copy, asymmetric project grid, media placeholders |
| `work/[slug]/page.tsx` | Hero media, inline placeholders, monospace labels, dark theme |
| `about/page.tsx` | Split layout, media placeholder, new copy, stats row |
| `resume/page.tsx` | Dark restyle, serif/mono hierarchy |
| `contact/page.tsx` | Underlined link style, new copy |

# Dark Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual overhaul of the portfolio from clean minimal white to a dark editorial aesthetic inspired by Trionn.com — new color system, 3-font typography, preloader, redesigned nav/footer, Trionn-style stacked project cards with media placeholders, and updated copy.

**Architecture:** Replace all styling and page components in-place. Add Playfair Display (editorial serif) and Martian Mono (monospace) fonts alongside existing Geist (sans). New components: Preloader, MediaPlaceholder, MenuOverlay. All existing components rewritten for dark theme. No external animation libraries.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Playfair Display + Geist + Martian Mono (next/font/google), CSS transitions, IntersectionObserver, requestAnimationFrame

## Global Constraints

- Background: `#0C0C0C`, text: `#ffffff`, muted: `#888888`, borders: `#222222`
- Editorial serif: Playfair Display (italic for hero, regular for sections)
- Grotesque sans: Geist (already installed)
- Monospace: Martian Mono (labels, tags, counters, CTAs — always uppercase, letter-spacing 0.1em)
- Global easing: `cubic-bezier(0.25, 0, 0, 1)`
- No external animation libraries
- Working directory: `~/Desktop/portfolio`
- IMPORTANT: Read `~/Desktop/portfolio/node_modules/next/dist/docs/01-app/` before modifying layout or page components if unsure about API

---

### Task 1: Dark foundation — fonts, globals.css, layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: CSS custom properties for colors, three font CSS variables (`--font-geist`, `--font-serif`, `--font-mono`), dark body styling
- Produces: updated `RootLayout` with Playfair Display + Martian Mono fonts loaded

- [ ] **Step 1: Replace globals.css with dark theme**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Color tokens */
:root {
  --bg: #0C0C0C;
  --bg-elevated: #141414;
  --bg-preloader: #d4d4d4;
  --text: #ffffff;
  --text-muted: #888888;
  --text-dim: #555555;
  --border: #222222;
  --border-light: #333333;
  --easing: cubic-bezier(0.25, 0, 0, 1);
}

/* Scroll reveal animations */
.reveal {
  opacity: 0;
  transition: opacity 600ms var(--easing),
    transform 600ms var(--easing);
}

.reveal-up {
  transform: translateY(20px);
}

.reveal-left {
  transform: translateX(-20px);
}

.reveal.revealed {
  opacity: 1;
  transform: translate(0, 0);
}

/* Monospace label utility */
.label-mono {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}

/* CTA underline animation */
.cta-underline {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  text-decoration: none;
}

.cta-underline::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--text);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms var(--easing);
}

.cta-underline:hover::after {
  transform: scaleX(1);
}

/* Vibration hover effect */
@keyframes vibrate {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-1px); }
}

.hover-vibrate:hover {
  animation: vibrate 300ms ease-in-out;
}

/* Inset frame for media placeholders */
.inset-frame::after {
  content: "";
  position: absolute;
  inset: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  pointer-events: none;
  transition: border-color 300ms var(--easing);
}

.inset-frame:hover::after {
  border-color: rgba(255, 255, 255, 0.3);
}
```

- [ ] **Step 2: Replace layout.tsx with dark theme + 3 fonts**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display, Martian_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { getProfile } from "@/lib/site-content";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const martianMono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Declan Malone — Product / UX Designer",
  description:
    "Portfolio of Declan Malone, Product and UX Designer with 6+ years of experience in ecommerce, wealth management, and SaaS.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <html
      lang="en"
      className={`${geist.variable} ${playfair.variable} ${martianMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-[var(--bg)] text-[var(--text)] font-[family-name:var(--font-geist)]">
        <CustomCursor />
        <Nav name={profile.name} />
        <main className="flex-1">{children}</main>
        <Footer email={profile.email} linkedin={profile.linkedin} />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/portfolio
git add src/app/globals.css src/app/layout.tsx
git commit -m "dark foundation: fonts, color tokens, and dark layout"
```

---

### Task 2: Preloader component

**Files:**
- Create: `src/components/preloader.tsx`
- Modify: `src/app/layout.tsx` — add Preloader wrapping body content

**Interfaces:**
- Produces: `<Preloader />` client component — full-screen overlay with counter and wipe transition, skipped on return visits via sessionStorage

- [ ] **Step 1: Create Preloader component**

Create `src/components/preloader.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const startRef = useRef<number>(0);

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem("preloader-shown")) {
      setDone(true);
      setHidden(true);
      return;
    }

    startRef.current = performance.now();
    const duration = 2500;

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out for counter
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("preloader-shown", "1");
        setDone(true);
        // Allow wipe animation to complete before removing from DOM
        setTimeout(() => setHidden(true), 700);
      }
    }

    requestAnimationFrame(tick);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center transition-transform duration-[600ms]"
      style={{
        backgroundColor: "var(--bg-preloader)",
        transitionTimingFunction: "var(--easing)",
        transform: done ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      {/* Crosshair frame with name */}
      <div className="relative flex items-center justify-center" style={{ width: 300, height: 180 }}>
        {/* Border */}
        <div className="absolute inset-0 border border-[#999]" />
        {/* Corner crosshairs */}
        <span className="absolute -top-2.5 -left-1.5 text-xs text-[#666] select-none">&#215;</span>
        <span className="absolute -top-2.5 -right-1.5 text-xs text-[#666] select-none">&#215;</span>
        <span className="absolute -bottom-2.5 -left-1 text-xs text-[#666] select-none">+</span>
        <span className="absolute -bottom-2.5 -right-1 text-xs text-[#666] select-none">+</span>
        {/* Name */}
        <span
          className="text-sm tracking-[0.2em] text-[#333] select-none"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          DECLAN MALONE
        </span>
      </div>

      {/* Tagline */}
      <p
        className="mt-6 text-[11px] tracking-[0.2em] text-[#666] select-none"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        PRODUCT / UX DESIGNER
      </p>

      {/* Counter */}
      <p
        className="absolute bottom-12 text-sm tracking-[0.1em] text-[#333] select-none"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {count}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Add Preloader to layout.tsx**

In `src/app/layout.tsx`, add `import { Preloader } from "@/components/preloader";` and add `<Preloader />` as the first child of `<body>`, before `<CustomCursor />`:

```tsx
<body className="flex min-h-dvh flex-col bg-[var(--bg)] text-[var(--text)] font-[family-name:var(--font-geist)]">
  <Preloader />
  <CustomCursor />
  <Nav name={profile.name} />
  <main className="flex-1">{children}</main>
  <Footer email={profile.email} linkedin={profile.linkedin} />
</body>
```

- [ ] **Step 3: Verify and commit**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
git add src/components/preloader.tsx src/app/layout.tsx
git commit -m "add preloader with counter, crosshair frame, and wipe transition"
```

---

### Task 3: MediaPlaceholder component + update cursor/scroll-reveal for dark theme

**Files:**
- Create: `src/components/media-placeholder.tsx`
- Modify: `src/components/custom-cursor.tsx` — change blue to white
- Modify: `src/components/scroll-reveal.tsx` — update easing reference

**Interfaces:**
- Produces: `<MediaPlaceholder>` component
  - Props: `{ label?: string, aspectRatio?: string, className?: string }`
  - Renders a dark placeholder box with inset frame and centered label

- [ ] **Step 1: Create MediaPlaceholder**

Create `src/components/media-placeholder.tsx`:

```tsx
export function MediaPlaceholder({
  label = "Image / video",
  aspectRatio = "16/10",
  className = "",
}: {
  label?: string;
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div
      className={`inset-frame relative overflow-hidden rounded-lg bg-[#1a1a1a] ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="label-mono text-[var(--text-dim)]">{label}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update custom-cursor.tsx — white instead of blue**

In `src/components/custom-cursor.tsx`, change `bg-[#2563eb]` to `bg-white` and `border-[#2563eb]` to `border-white`:

Line 83: `bg-[#2563eb]` → `bg-white`
Line 88: `border border-[#2563eb]` → `border border-white`

- [ ] **Step 3: Verify and commit**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
git add src/components/media-placeholder.tsx src/components/custom-cursor.tsx
git commit -m "add MediaPlaceholder component and update cursor for dark theme"
```

---

### Task 4: Nav + MenuOverlay + Footer — dark editorial

**Files:**
- Create: `src/components/menu-overlay.tsx`
- Modify: `src/components/nav.tsx` — complete rewrite for dark theme
- Modify: `src/components/footer.tsx` — complete rewrite for dark theme

**Interfaces:**
- Produces: `<MenuOverlay>` — full-screen menu with serif links
  - Props: `{ open: boolean, onClose: () => void }`
- Modifies: `<Nav>` — dark sticky header, monospace name left, CTA + hamburger right
- Modifies: `<Footer>` — dark theme, establishment year, three-column layout

- [ ] **Step 1: Create MenuOverlay**

Create `src/components/menu-overlay.tsx`:

```tsx
"use client";

import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]/95 backdrop-blur-sm"
      style={{ transition: "opacity 300ms var(--easing)" }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        aria-label="Close menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>

      {/* Links */}
      <nav className="flex flex-col items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-4xl sm:text-5xl font-[family-name:var(--font-serif)] italic text-[var(--text)] hover:text-[var(--text-muted)] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

- [ ] **Step 2: Replace nav.tsx**

Replace `src/components/nav.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuOverlay } from "@/components/menu-overlay";

export function Nav({ name }: { name: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xs tracking-[0.1em] uppercase text-[var(--text)] font-[family-name:var(--font-mono)]"
          >
            {name}
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="cta-underline hidden sm:inline-flex"
            >
              Start a project <span aria-hidden="true">&rarr;</span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
```

- [ ] **Step 3: Replace footer.tsx**

Replace `src/components/footer.tsx` with:

```tsx
export function Footer({ email }: { email: string; linkedin: string }) {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="label-mono">&copy; 2025 DECLAN MALONE</p>
        <p className="label-mono text-[var(--text-dim)]">
          PRODUCT / UX DESIGNER — EST. 2019
        </p>
        <a
          href={`mailto:${email}`}
          className="cta-underline text-[11px]"
        >
          {email}
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Verify and commit**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
git add src/components/menu-overlay.tsx src/components/nav.tsx src/components/footer.tsx
git commit -m "redesign nav, footer, and add menu overlay for dark editorial theme"
```

---

### Task 5: Homepage — dark hero + Trionn-style project cards

**Files:**
- Modify: `src/components/animated-hero.tsx` — rewrite for dark editorial
- Modify: `src/components/project-card.tsx` — Trionn card style with media placeholder
- Modify: `src/app/page.tsx` — new layout, copy, stacked cards

**Interfaces:**
- Consumes: `MediaPlaceholder` from `@/components/media-placeholder`
- Consumes: `ScrollReveal` from `@/components/scroll-reveal`
- Consumes: `MagneticButton` from `@/components/magnetic-button`

- [ ] **Step 1: Replace animated-hero.tsx**

Replace `src/components/animated-hero.tsx` with:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedHero({
  headline,
  description,
}: {
  headline: string;
  description: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    const container = containerRef.current;
    if (!glow || !container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.03), transparent 60%)`;
  };

  const handleMouseLeave = () => {
    const glow = glowRef.current;
    if (glow) glow.style.background = "transparent";
  };

  const words = headline.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Animated crosshair motif */}
      <div
        className="mb-12 h-16 w-16 transition-opacity duration-1000"
        style={{
          opacity: mounted ? 1 : 0,
          transitionTimingFunction: "var(--easing)",
        }}
      >
        <svg viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" className="animate-[spin_20s_linear_infinite]">
          <circle cx="32" cy="32" r="28" />
          <line x1="32" y1="0" x2="32" y2="64" />
          <line x1="0" y1="32" x2="64" y2="32" />
          <circle cx="32" cy="32" r="8" />
        </svg>
      </div>

      {/* Headline */}
      <h1 className="max-w-4xl">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
            <span
              className="inline-block font-[family-name:var(--font-serif)] text-5xl italic sm:text-7xl lg:text-8xl tracking-tight transition-[opacity,transform] duration-[800ms]"
              style={{
                transitionTimingFunction: "var(--easing)",
                transitionDelay: `${800 + i * 100}ms`,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(100%)",
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>

      {/* Descriptor */}
      <p
        className="mt-8 max-w-xl text-[var(--text-muted)] leading-relaxed transition-[opacity,transform] duration-[800ms]"
        style={{
          transitionTimingFunction: "var(--easing)",
          transitionDelay: `${800 + words.length * 100 + 200}ms`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {description}
      </p>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 flex flex-col items-center gap-2 transition-opacity duration-1000"
        style={{
          opacity: mounted ? 1 : 0,
          transitionDelay: `${800 + words.length * 100 + 400}ms`,
        }}
      >
        <span className="label-mono text-[10px]">Scroll</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" className="animate-bounce text-[var(--text-muted)]">
          <path d="M2 4l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace project-card.tsx — Trionn card style**

Replace `src/components/project-card.tsx` with:

```tsx
import Link from "next/link";
import type { Project } from "@/data/projects";
import { MediaPlaceholder } from "@/components/media-placeholder";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group">
      {/* Media area */}
      <Link href={`/work/${project.slug}`} className="block overflow-hidden rounded-lg">
        <div className="transition-transform duration-500 group-hover:scale-[1.02]" style={{ transitionTimingFunction: "var(--easing)" }}>
          <MediaPlaceholder
            label={project.title}
            aspectRatio="16/10"
          />
        </div>
      </Link>

      {/* Info row */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--text)]">
            {project.title}
          </h3>
          <p className="mt-1 max-w-md text-sm text-[var(--text-muted)] leading-relaxed">
            {project.summary}
          </p>
        </div>
        <Link
          href={`/work/${project.slug}`}
          className="cta-underline shrink-0"
        >
          Explore project <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Replace page.tsx — dark homepage**

Replace `src/app/page.tsx` with:

```tsx
import { getProfile, getProjects } from "@/lib/site-content";
import { AnimatedHero } from "@/components/animated-hero";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  const heroDescription = `At DFYNE, I built the UX practice from scratch — hired 10 people, established CRO from zero, and shipped features that lifted AOV by 13%. Before that, I designed trading interfaces at JP Morgan and margin analytics at OpenGamma. I come from fine art photography, so I think about composition and clarity in everything I make.`;

  return (
    <div>
      <AnimatedHero
        headline="I design products that move numbers."
        description={heroDescription}
      />

      {/* Project showcase */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <h2 className="text-center font-[family-name:var(--font-serif)] text-3xl italic sm:text-4xl">
            Selected work &amp; explorations
          </h2>
        </ScrollReveal>

        <div className="mt-20 space-y-24">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 50}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Verify and commit**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
git add src/components/animated-hero.tsx src/components/project-card.tsx src/app/page.tsx
git commit -m "dark editorial homepage with hero, Trionn-style project cards"
```

---

### Task 6: Case study pages — dark theme with media placeholders

**Files:**
- Modify: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `MediaPlaceholder` from `@/components/media-placeholder`
- Consumes: `ScrollReveal` from `@/components/scroll-reveal`
- Consumes: `CountUp` from `@/components/count-up`
- Consumes: `PrototypeEmbed` from `@/components/prototype-embed`

- [ ] **Step 1: Replace case study page**

Replace `src/app/work/[slug]/page.tsx` with:

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/site-content";
import { PrototypeEmbed } from "@/components/prototype-embed";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CountUp } from "@/components/count-up";
import { MediaPlaceholder } from "@/components/media-placeholder";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      {/* Back link */}
      <Link href="/#work" className="cta-underline text-[10px] text-[var(--text-muted)]">
        &larr; All projects
      </Link>

      {/* Hero media */}
      <ScrollReveal className="mt-8">
        <MediaPlaceholder label={`${project.title} — Hero`} aspectRatio="21/9" />
      </ScrollReveal>

      {/* Header */}
      <ScrollReveal className="mt-10">
        <header className="max-w-3xl">
          <p className="label-mono">{project.company}{project.eyebrow ? ` — ${project.eyebrow}` : ""}</p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-3xl sm:text-5xl tracking-tight">
            {project.title}
          </h1>
        </header>
      </ScrollReveal>

      {/* Stats */}
      {project.stats && project.stats.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-4">
          {project.stats.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 100}>
              <div className="border border-[var(--border)] rounded-lg px-5 py-4">
                <p className="font-[family-name:var(--font-mono)] text-2xl font-light text-[var(--text)]">
                  <CountUp value={stat.value} />
                </p>
                <p className="label-mono mt-1">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Body content */}
      <div className="mx-auto mt-16 max-w-3xl space-y-16">
        {/* Summary */}
        {project.summary && (
          <ScrollReveal>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">{project.summary}</p>
          </ScrollReveal>
        )}

        {/* Media placeholder after summary */}
        <ScrollReveal>
          <MediaPlaceholder label="Screenshot / video" aspectRatio="16/9" />
        </ScrollReveal>

        {/* Challenge */}
        {project.challenge && project.challenge.length > 0 && (
          <ScrollReveal>
            <section>
              <p className="label-mono">THE PROBLEM</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl">The problem</h2>
              <ul className="mt-4 space-y-3">
                {project.challenge.map((item) => (
                  <li key={item} className="text-[var(--text-muted)] leading-relaxed">{item}</li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        )}

        {/* Process */}
        {project.processSteps && project.processSteps.length > 0 && (
          <ScrollReveal>
            <section>
              <p className="label-mono">HOW I APPROACHED IT</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl">How I approached it</h2>
              <ol className="mt-6 space-y-8">
                {project.processSteps.map((step, i) => (
                  <ScrollReveal key={step.key} delay={i * 80}>
                    <li className="flex gap-5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-medium">{step.title}</h3>
                        <p className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">{step.text}</p>
                      </div>
                    </li>
                  </ScrollReveal>
                ))}
              </ol>
            </section>
          </ScrollReveal>
        )}

        {/* Media placeholder after process */}
        <ScrollReveal>
          <MediaPlaceholder label="Screenshot / video" aspectRatio="16/9" />
        </ScrollReveal>

        {/* What Changed */}
        {project.whatChanged && project.whatChanged.length > 0 && (
          <ScrollReveal>
            <section>
              <p className="label-mono">WHAT I CHANGED</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl">What I changed</h2>
              <ul className="mt-4 space-y-3">
                {project.whatChanged.map((item) => (
                  <li key={item} className="text-[var(--text-muted)] leading-relaxed">{item}</li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        )}

        {/* Comparison */}
        {project.comparison && (
          <ScrollReveal>
            <section>
              <p className="label-mono">BEFORE &amp; AFTER</p>
              {project.comparison.intro && (
                <p className="mt-2 text-sm text-[var(--text-muted)]">{project.comparison.intro}</p>
              )}
              <div className="mt-4 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="label-mono text-[var(--text-dim)]">Before</h3>
                  <ul className="mt-3 space-y-2">
                    {project.comparison.before.map((item) => (
                      <li key={item} className="text-sm text-[var(--text-muted)]">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label-mono text-[var(--text)]">After</h3>
                  <ul className="mt-3 space-y-2">
                    {project.comparison.after.map((item) => (
                      <li key={item} className="text-sm text-[var(--text-muted)]">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Narrative sections */}
        {project.narrativeSections && project.narrativeSections.length > 0 && (
          <>
            {project.narrativeSections.map((section) => (
              <ScrollReveal key={section.key}>
                <section>
                  <h2 className="font-[family-name:var(--font-serif)] text-2xl">{section.title}</h2>
                  {section.paragraphs.map((p) => (
                    <p key={p} className="mt-3 text-[var(--text-muted)] leading-relaxed">{p}</p>
                  ))}
                </section>
              </ScrollReveal>
            ))}
          </>
        )}

        {/* Prototype */}
        {project.liveUrl && (
          <ScrollReveal>
            <section>
              <p className="label-mono">TRY IT</p>
              <div className="mt-4">
                <PrototypeEmbed
                  url={project.liveUrl}
                  embedMode={project.embedMode}
                  viewport={project.prototypeViewport}
                />
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Media placeholder before impact */}
        <ScrollReveal>
          <MediaPlaceholder label="Screenshot / video" aspectRatio="16/9" />
        </ScrollReveal>

        {/* Impact */}
        {project.impact && project.impact.length > 0 && (
          <ScrollReveal>
            <section>
              <p className="label-mono">WHAT IT DID</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl">What it did</h2>
              <ul className="mt-4 space-y-3">
                {project.impact.map((item) => (
                  <li key={item} className="text-[var(--text-muted)] leading-relaxed">{item}</li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        )}
      </div>

      {/* Prev / Next */}
      <nav className="mx-auto mt-20 flex max-w-3xl items-center justify-between border-t border-[var(--border)] pt-8">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="cta-underline text-[10px]">
            &larr; {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/work/${next.slug}`} className="cta-underline text-[10px]">
            {next.title} &rarr;
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
git add src/app/work/\[slug\]/page.tsx
git commit -m "dark editorial case study pages with media placeholders and monospace labels"
```

---

### Task 7: About page — split layout, new copy, stats

**Files:**
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `ScrollReveal`, `MediaPlaceholder` from respective components

- [ ] **Step 1: Replace about page**

Replace `src/app/about/page.tsx` with:

```tsx
import { getProfile, getResumeContent } from "@/lib/site-content";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MediaPlaceholder } from "@/components/media-placeholder";

export default async function AboutPage() {
  const [profile, resume] = await Promise.all([getProfile(), getResumeContent()]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      {/* Split layout */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Copy — left */}
        <div className="flex-1 lg:max-w-[60%]">
          <ScrollReveal>
            <p className="label-mono">ABOUT</p>
            <h1 className="mt-3 font-[family-name:var(--font-serif)] text-3xl italic sm:text-5xl tracking-tight">
              A bit about me
            </h1>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-10 space-y-6 text-[var(--text-muted)] leading-relaxed">
              <p>
                I&apos;m Declan — a product and UX designer based in Glasgow, currently leading UX at DFYNE.
              </p>
              <p>
                I started in fine art photography at the Glasgow School of Art, then moved into software through a full-stack development course at CodeClan. That crossover — visual composition meets engineering logic — shapes how I approach every design problem.
              </p>
              <p>
                I&apos;ve designed trading platforms at JP Morgan, margin analytics tools at OpenGamma, and ecommerce experiences at DFYNE and Toolstop. I care most about the intersection of design systems, data, and commercial outcomes.
              </p>
              <p>
                When I&apos;m not designing, I&apos;m probably reading about systems thinking or falling down a rabbit hole about ancient artifacts.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal>
            <div className="mt-12 flex flex-wrap gap-4">
              {[
                { value: "6+", label: "YEARS" },
                { value: "50+", label: "PROJECTS" },
                { value: "10", label: "PEOPLE HIRED" },
              ].map((stat) => (
                <div key={stat.label} className="border border-[var(--border)] rounded-lg px-5 py-4">
                  <p className="font-[family-name:var(--font-mono)] text-2xl font-light">{stat.value}</p>
                  <p className="label-mono mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal>
            <div className="mt-12">
              <p className="label-mono">THE BASICS</p>
              <dl className="mt-4 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="label-mono text-[10px]">Role</dt>
                  <dd className="mt-1 text-[var(--text)]">{profile.title} at {profile.company}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[10px]">Location</dt>
                  <dd className="mt-1 text-[var(--text)]">{profile.location}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[10px]">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${profile.email}`} className="cta-underline text-[11px]">{profile.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          {/* Skills */}
          <ScrollReveal>
            <div className="mt-12">
              <p className="label-mono">SKILLS</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {resume.skillSections.map((section) => (
                  <div key={section.heading}>
                    <h3 className="label-mono text-[10px] text-[var(--text-dim)]">{section.heading}</h3>
                    {section.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-[var(--text-muted)]">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Media — right (sticky) */}
        <div className="lg:w-[40%]">
          <div className="lg:sticky lg:top-24">
            <ScrollReveal>
              <MediaPlaceholder label="Photo / video" aspectRatio="3/4" />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
git add src/app/about/page.tsx
git commit -m "dark editorial about page with split layout and media placeholder"
```

---

### Task 8: Resume + Contact pages — dark theme

**Files:**
- Modify: `src/app/resume/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/resume-pdf-action.tsx` — dark theme buttons

**Interfaces:**
- Consumes: `ScrollReveal` from `@/components/scroll-reveal`

- [ ] **Step 1: Replace resume page**

Replace `src/app/resume/page.tsx` with:

```tsx
import { getProfile, getResumeContent } from "@/lib/site-content";
import { renderResumeInlineText } from "@/components/resume-rich-text";
import { ResumePdfAction } from "@/components/resume-pdf-action";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function ResumePage() {
  const [profile, resume] = await Promise.all([getProfile(), getResumeContent()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <ScrollReveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl tracking-tight">{profile.name}</h1>
            <p className="mt-1 label-mono">{resume.headline}</p>
          </div>
          {resume.pdfUrl && <ResumePdfAction pdfUrl={resume.pdfUrl} fileName={resume.pdfFileName} />}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
          {resume.contactLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <section className="mt-8">
          <p className="text-[var(--text-muted)] leading-relaxed">{renderResumeInlineText(resume.professionalSummary)}</p>
        </section>
      </ScrollReveal>

      <div className="mt-12 border-t border-[var(--border)]" />

      <ScrollReveal>
        <section className="mt-12">
          <p className="label-mono">EXPERIENCE</p>
          <div className="mt-6 space-y-10">
            {resume.experience.map((item) => (
              <div key={`${item.company}-${item.role}-${item.timeframe}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl">{item.role}</h3>
                  <span className="label-mono text-[10px]">{item.timeframe}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {item.company}
                  {item.website && (
                    <>
                      {" — "}
                      <a href={item.website} target="_blank" rel="noreferrer" className="cta-underline text-[11px] inline">
                        {item.website}
                      </a>
                    </>
                  )}
                </p>
                <ul className="mt-3 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {renderResumeInlineText(bullet)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="mt-12 border-t border-[var(--border)]" />

      <ScrollReveal>
        <section className="mt-12">
          <p className="label-mono">EDUCATION</p>
          <div className="mt-4 space-y-2">
            {resume.education.map((line) => (
              <p key={line} className="text-sm text-[var(--text-muted)]">{renderResumeInlineText(line)}</p>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="mt-12 border-t border-[var(--border)]" />

      <ScrollReveal>
        <section className="mt-12">
          <p className="label-mono">SKILLS</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {resume.skillSections.map((section) => (
              <div key={section.heading}>
                <h3 className="label-mono text-[10px] text-[var(--text-dim)]">{section.heading}</h3>
                {section.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-[var(--text-muted)]">{renderResumeInlineText(line)}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
```

- [ ] **Step 2: Replace contact page**

Replace `src/app/contact/page.tsx` with:

```tsx
import { getProfile, getResumeContent } from "@/lib/site-content";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function ContactPage() {
  const [profile, resume] = await Promise.all([getProfile(), getResumeContent()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <ScrollReveal>
        <p className="label-mono">CONTACT</p>
        <h1 className="mt-3 font-[family-name:var(--font-serif)] text-3xl italic sm:text-5xl tracking-tight">
          Get in touch
        </h1>
        <p className="mt-6 max-w-lg text-[var(--text-muted)] leading-relaxed">
          I&apos;m looking for my next Product/UX Design role. If you think we&apos;d work well together, I&apos;d love to hear from you.
        </p>
      </ScrollReveal>

      <div className="mt-12 space-y-6">
        <ScrollReveal>
          <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
            <span className="label-mono text-[10px]">Email</span>
            <a href={`mailto:${profile.email}`} className="cta-underline text-[11px]">
              {profile.email} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>

        {profile.linkedin && profile.linkedin !== "LinkedIn URL pending" && (
          <ScrollReveal delay={100}>
            <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
              <span className="label-mono text-[10px]">LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="cta-underline text-[11px]">
                View profile <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </ScrollReveal>
        )}

        {resume.portfolioUrl && (
          <ScrollReveal delay={200}>
            <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
              <span className="label-mono text-[10px]">Portfolio</span>
              <a href={resume.portfolioUrl} target="_blank" rel="noreferrer" className="cta-underline text-[11px]">
                {resume.portfolioUrl} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update resume-pdf-action.tsx for dark theme**

In `src/components/resume-pdf-action.tsx`, change the button styles:
- Download button: `bg-[#111]` → `bg-white text-[var(--bg)]` and hover `bg-[#333]` → `bg-[var(--text-muted)]`
- Share button: `border-[#e5e5e5]` → `border-[var(--border)]`, `text-[#555]` → `text-[var(--text-muted)]`, hover `bg-[#f5f5f5]` → `bg-[var(--bg-elevated)]`

- [ ] **Step 4: Verify and commit**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
git add src/app/resume/page.tsx src/app/contact/page.tsx src/components/resume-pdf-action.tsx
git commit -m "dark editorial resume and contact pages"
```

---

### Task 9: Update prototype embed for dark theme + final build

**Files:**
- Modify: `src/components/prototype-embed.tsx` — update colors for dark theme
- Verify: full build

- [ ] **Step 1: Update prototype-embed.tsx colors**

In `src/components/prototype-embed.tsx`:
- Change `border-[#e5e5e5]` → `border-[var(--border)]`
- Change `bg-[#f5f5f5]` → `bg-[var(--bg-elevated)]`
- Change `text-[#555]` → `text-[var(--text-muted)]`
- Change `text-[#2563eb]` → `text-[var(--text)]`
- Change `hover:bg-[#f5f5f5]` → `hover:bg-[var(--bg-elevated)]`

- [ ] **Step 2: Run TypeScript check**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 3: Run build**

```bash
cd ~/Desktop/portfolio && npm run build
```

Fix any errors.

- [ ] **Step 4: Commit and push**

```bash
cd ~/Desktop/portfolio
git add -A
git commit -m "update prototype embed for dark theme, final build pass"
git push
```

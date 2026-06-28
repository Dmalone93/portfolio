# Personality Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add micro-interactions, a showpiece hero, scroll animations, copy rewrites, and visual polish to the portfolio — making it feel crafted and alive.

**Architecture:** Six new client components (scroll-reveal, tilt-card, animated-hero, count-up, custom-cursor, magnetic-button) layered into existing server-rendered pages. All animation uses vanilla CSS/JS via React hooks — no external animation libraries. Interactions are desktop-only where appropriate, with graceful mobile fallback.

**Tech Stack:** React 19 hooks (useEffect, useRef, useState), CSS transitions/animations, IntersectionObserver, requestAnimationFrame, View Transitions API

## Global Constraints

- No external animation libraries (no Framer Motion, no GSAP)
- All interactions use `requestAnimationFrame` for cursor/mouse tracking (no layout thrashing)
- Touch devices: disable cursor effects, tilt effects degrade to simple hover lift
- IntersectionObserver callbacks only toggle CSS classes (lightweight)
- View Transitions are progressive enhancement — unsupported browsers get instant nav
- Primary accent: `#2563eb`, secondary accent: `#f97316`
- All new components are client components (`"use client"`)
- Working directory: `~/Desktop/portfolio`

---

### Task 1: ScrollReveal component + globals.css foundations

**Files:**
- Create: `src/components/scroll-reveal.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `<ScrollReveal>` component — wraps children, fades them in on scroll
  - Props: `{ children: React.ReactNode, className?: string, delay?: number, direction?: "up" | "left" }`
  - `delay` in ms, applied as `transition-delay` inline style
  - `direction`: "up" slides from below (default), "left" slides from the left (for section headers)

- [ ] **Step 1: Create ScrollReveal component**

Create `src/components/scroll-reveal.tsx`:

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass = direction === "left" ? "reveal-left" : "reveal-up";

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Add reveal animations and global styles to globals.css**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Scroll reveal animations */
.reveal {
  opacity: 0;
  transition: opacity 500ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
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

/* Noise texture for cards */
.noise-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
}

/* Button sweep effect */
.btn-sweep {
  position: relative;
  overflow: hidden;
  z-index: 0;
}

.btn-sweep::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: #f97316;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-sweep:hover::before {
  transform: scaleX(1);
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/portfolio
git add src/components/scroll-reveal.tsx src/app/globals.css
git commit -m "add ScrollReveal component and global animation styles"
```

---

### Task 2: TiltCard component

**Files:**
- Create: `src/components/tilt-card.tsx`

**Interfaces:**
- Produces: `<TiltCard>` component — wraps children, adds 3D perspective tilt on mouse move
  - Props: `{ children: React.ReactNode, className?: string }`
  - Applies perspective tilt (max 8deg), specular sheen, hover lift, click scale
  - Disabled on touch devices

- [ ] **Step 1: Create TiltCard component**

Create `src/components/tilt-card.tsx`:

```tsx
"use client";

import { useCallback, useRef, type ReactNode, type MouseEvent } from "react";

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!card || !sheen) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 16; // -8 to 8 degrees
    const rotateX = (0.5 - y) * 16; // -8 to 8 degrees

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    sheen.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08), transparent 60%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!card || !sheen) return;

    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    sheen.style.background = "transparent";
  }, []);

  const handleMouseDown = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.scale = "0.98";
  }, []);

  const handleMouseUp = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.scale = "1";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-[transform,scale,box-shadow] duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
      <div
        ref={sheenRef}
        className="pointer-events-none absolute inset-0 rounded-lg"
        aria-hidden="true"
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/portfolio
git add src/components/tilt-card.tsx
git commit -m "add TiltCard component with 3D perspective and sheen"
```

---

### Task 3: CountUp component

**Files:**
- Create: `src/components/count-up.tsx`

**Interfaces:**
- Produces: `<CountUp>` component — animates a number from 0 to its value on scroll
  - Props: `{ value: string }` — the full stat string like "+13% AOV" or "4M+"
  - Parses numeric portion, animates it, preserves prefix/suffix
  - Non-numeric values render as-is without animation

- [ ] **Step 1: Create CountUp component**

Create `src/components/count-up.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

function parseStatValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} | null {
  const match = value.match(/^([^0-9]*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function CountUp({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parsed = parseStatValue(value);
    if (!parsed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(el);

          const duration = 1000;
          const start = performance.now();
          const isInteger = Number.isInteger(parsed.number);

          function animate(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * parsed!.number;

            setDisplayed(
              `${parsed!.prefix}${isInteger ? Math.round(current) : current.toFixed(1)}${parsed!.suffix}`
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayed(value);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{displayed}</span>;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/portfolio
git add src/components/count-up.tsx
git commit -m "add CountUp component for animated metric numbers"
```

---

### Task 4: MagneticButton component

**Files:**
- Create: `src/components/magnetic-button.tsx`

**Interfaces:**
- Produces: `<MagneticButton>` component — button/anchor that nudges toward cursor
  - Props: `{ children: React.ReactNode, href: string, className?: string }`
  - Renders an anchor tag
  - Pulls toward cursor within ~100px radius (max 6px offset)
  - Springs back on mouse leave

- [ ] **Step 1: Create MagneticButton component**

Create `src/components/magnetic-button.tsx`:

```tsx
"use client";

import { useCallback, useRef, type ReactNode, type MouseEvent } from "react";

export function MagneticButton({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    const maxOffset = 6;
    const offsetX = (distX / (rect.width / 2)) * maxOffset;
    const offsetY = (distY / (rect.height / 2)) * maxOffset;

    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/portfolio
git add src/components/magnetic-button.tsx
git commit -m "add MagneticButton component with cursor pull effect"
```

---

### Task 5: AnimatedHero component

**Files:**
- Create: `src/components/animated-hero.tsx`

**Interfaces:**
- Consumes: `MagneticButton` from `@/components/magnetic-button`
- Produces: `<AnimatedHero>` component — showpiece hero with text stagger and cursor glow
  - Props: `{ name: string, title: string, mission: string }`
  - Staggered word-by-word reveal for the name
  - Title and mission fade in after name completes
  - Radial gradient glow follows cursor
  - CTA uses MagneticButton with sweep effect

- [ ] **Step 1: Create AnimatedHero component**

Create `src/components/animated-hero.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/magnetic-button";

export function AnimatedHero({
  name,
  title,
  mission,
}: {
  name: string;
  title: string;
  mission: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    const container = containerRef.current;
    if (!glow || !container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.05), transparent 60%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.background = "transparent";
  }, []);

  const words = name.split(" ");
  const totalNameDuration = words.length * 80 + 600; // last word start + animation duration

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        aria-hidden="true"
      />

      {/* Name with staggered word reveal */}
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
        {words.map((word, i) => (
          <span
            key={word}
            className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
          >
            <span
              className="inline-block transition-[opacity,transform] duration-[600ms]"
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${i * 80}ms`,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>

      {/* Title */}
      <p
        className="mt-2 text-lg text-[#555] transition-[opacity,transform] duration-[600ms]"
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${totalNameDuration}ms`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {title}
      </p>

      {/* Mission */}
      <p
        className="mt-4 max-w-xl text-[#555] leading-relaxed transition-[opacity,transform] duration-[600ms]"
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${totalNameDuration + 100}ms`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {mission}
      </p>

      {/* CTA */}
      <div
        className="mt-6 transition-[opacity,transform] duration-[600ms]"
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${totalNameDuration + 200}ms`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <MagneticButton
          href="#work"
          className="btn-sweep rounded-md bg-[#111] px-5 py-2.5 text-sm font-medium text-white"
        >
          See the work
        </MagneticButton>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/portfolio
git add src/components/animated-hero.tsx
git commit -m "add AnimatedHero component with stagger and cursor glow"
```

---

### Task 6: CustomCursor component

**Files:**
- Create: `src/components/custom-cursor.tsx`

**Interfaces:**
- Produces: `<CustomCursor />` component — dot + trailing circle, desktop only
  - No props
  - Mounted in root layout
  - Hidden on touch devices and over interactive elements

- [ ] **Step 1: Create CustomCursor component**

Create `src/components/custom-cursor.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    function onMouseMove(e: globalThis.MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!visible.current) {
        visible.current = true;
        dot!.style.opacity = "1";
        circle!.style.opacity = "1";
      }

      dot!.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    }

    function onMouseLeave() {
      visible.current = false;
      dot!.style.opacity = "0";
      circle!.style.opacity = "0";
    }

    function onMouseOverInteractive(e: globalThis.MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      if (interactive) {
        dot!.style.opacity = "0";
        circle!.style.opacity = "0";
        document.body.style.cursor = "auto";
      } else {
        if (visible.current) {
          dot!.style.opacity = "1";
          circle!.style.opacity = "1";
        }
        document.body.style.cursor = "none";
      }
    }

    let rafId: number;
    function animateCircle() {
      const lerp = 0.15;
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * lerp;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * lerp;
      circle!.style.transform = `translate(${circlePos.current.x - 16}px, ${circlePos.current.y - 16}px)`;
      rafId = requestAnimationFrame(animateCircle);
    }

    document.body.style.cursor = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOverInteractive);
    rafId = requestAnimationFrame(animateCircle);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOverInteractive);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-[#2563eb] opacity-0 transition-opacity duration-150"
        aria-hidden="true"
      />
      <div
        ref={circleRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-[#2563eb] opacity-0 transition-opacity duration-150"
        aria-hidden="true"
      />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/portfolio
git add src/components/custom-cursor.tsx
git commit -m "add CustomCursor component with dot and trailing circle"
```

---

### Task 7: Wire up homepage — hero, tilt cards, scroll reveals, copy

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/project-card.tsx`

**Interfaces:**
- Consumes: `AnimatedHero` from `@/components/animated-hero`
- Consumes: `TiltCard` from `@/components/tilt-card`
- Consumes: `ScrollReveal` from `@/components/scroll-reveal`

- [ ] **Step 1: Update project-card.tsx — add noise texture class**

Replace `src/components/project-card.tsx` with:

```tsx
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const topStats = project.stats?.slice(0, 2) ?? [];

  return (
    <Link
      href={`/work/${project.slug}`}
      className="noise-texture group relative block rounded-lg border border-[#e5e5e5] bg-white p-6 transition-shadow duration-200 hover:shadow-lg"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-[#555]">
        {project.company}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-[#111] group-hover:text-[#2563eb] transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#555]">
        {project.summary}
      </p>
      {topStats.length > 0 && (
        <div className="mt-4 flex gap-4">
          {topStats.map((stat) => (
            <div
              key={stat.key}
              className="rounded bg-[#f5f5f5] px-3 py-1.5 transition-colors duration-200 group-hover:bg-[#2563eb] group-hover:text-white"
            >
              <span className="text-sm font-semibold text-[#2563eb] transition-colors duration-200 group-hover:text-white">
                {stat.value}
              </span>
              <span className="ml-1.5 text-xs text-[#555] transition-colors duration-200 group-hover:text-white/80">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}
```

- [ ] **Step 2: Replace homepage with animated version**

Replace `src/app/page.tsx` with:

```tsx
import { getProfile, getProjects } from "@/lib/site-content";
import { AnimatedHero } from "@/components/animated-hero";
import { ProjectCard } from "@/components/project-card";
import { TiltCard } from "@/components/tilt-card";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <AnimatedHero
        name={profile.name}
        title={profile.targetTitle}
        mission={profile.mission}
      />

      {/* Project grid */}
      <section id="work" className="pb-16 sm:pb-24">
        <ScrollReveal direction="left">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#555]">
            What I&apos;ve shipped
          </h2>
        </ScrollReveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 100}>
              <TiltCard className="h-full">
                <ProjectCard project={project} />
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
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
git add src/app/page.tsx src/components/project-card.tsx
git commit -m "wire up homepage with animated hero, tilt cards, and scroll reveals"
```

---

### Task 8: Wire up case study page — scroll reveals, count-up, copy rewrites

**Files:**
- Modify: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `ScrollReveal` from `@/components/scroll-reveal`
- Consumes: `CountUp` from `@/components/count-up`

- [ ] **Step 1: Replace case study page with animated version**

Replace `src/app/work/[slug]/page.tsx` with:

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/site-content";
import { PrototypeEmbed } from "@/components/prototype-embed";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CountUp } from "@/components/count-up";

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
  const next =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      {/* Back link */}
      <Link
        href="/#work"
        className="text-sm text-[#555] hover:text-[#111] transition-colors"
      >
        &larr; All projects
      </Link>

      {/* Header */}
      <ScrollReveal>
        <header className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-[#555]">
            {project.company}
            {project.eyebrow ? ` — ${project.eyebrow}` : ""}
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h1>

          {/* Hero metrics with count-up */}
          {project.stats && project.stats.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {project.stats.map((stat, i) => (
                <ScrollReveal key={stat.key} delay={i * 100}>
                  <div className="rounded-lg bg-[#f5f5f5] px-4 py-3">
                    <p className="text-xl font-bold text-[#2563eb]">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="text-xs text-[#555]">{stat.label}</p>
                    {stat.detail && (
                      <p className="mt-0.5 text-xs text-[#888]">
                        {stat.detail}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </header>
      </ScrollReveal>

      {/* Summary */}
      {project.summary && (
        <ScrollReveal>
          <section className="mt-10">
            <p className="text-[#555] leading-relaxed">{project.summary}</p>
          </section>
        </ScrollReveal>
      )}

      {/* Challenge */}
      {project.challenge && project.challenge.length > 0 && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">The problem</h2>
            <ul className="mt-3 space-y-2">
              {project.challenge.map((item) => (
                <li key={item} className="text-[#555] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      {/* Process */}
      {project.processSteps && project.processSteps.length > 0 && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">How I approached it</h2>
            <ol className="mt-4 space-y-6">
              {project.processSteps.map((step, i) => (
                <ScrollReveal key={step.key} delay={i * 100}>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-xs font-semibold text-[#555]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-[#555] leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </section>
        </ScrollReveal>
      )}

      {/* What Changed */}
      {project.whatChanged && project.whatChanged.length > 0 && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">What I changed</h2>
            <ul className="mt-3 space-y-2">
              {project.whatChanged.map((item) => (
                <li key={item} className="text-[#555] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      {/* Comparison */}
      {project.comparison && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">Before &amp; after</h2>
            {project.comparison.intro && (
              <p className="mt-2 text-sm text-[#555]">
                {project.comparison.intro}
              </p>
            )}
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-[#555]">Before</h3>
                <ul className="mt-2 space-y-1.5">
                  {project.comparison.before.map((item) => (
                    <li key={item} className="text-sm text-[#555]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#2563eb]">After</h3>
                <ul className="mt-2 space-y-1.5">
                  {project.comparison.after.map((item) => (
                    <li key={item} className="text-sm text-[#555]">
                      {item}
                    </li>
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
              <section className="mt-10">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-3 text-[#555] leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            </ScrollReveal>
          ))}
        </>
      )}

      {/* Live Prototype */}
      {project.liveUrl && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">Try it</h2>
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

      {/* Impact */}
      {project.impact && project.impact.length > 0 && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">What it did</h2>
            <ul className="mt-3 space-y-2">
              {project.impact.map((item) => (
                <li key={item} className="text-[#555] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      {/* Prev / Next */}
      <nav className="mt-16 flex items-center justify-between border-t border-[#e5e5e5] pt-6">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="text-sm text-[#555] hover:text-[#111] transition-colors"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="text-sm text-[#555] hover:text-[#111] transition-colors"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/portfolio
git add src/app/work/\[slug\]/page.tsx
git commit -m "add scroll reveals, count-up metrics, and copy rewrites to case studies"
```

---

### Task 9: Wire up About, Contact, Resume pages — scroll reveals + copy rewrites

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/resume/page.tsx`

**Interfaces:**
- Consumes: `ScrollReveal` from `@/components/scroll-reveal`

- [ ] **Step 1: Update About page**

Replace `src/app/about/page.tsx` with:

```tsx
import { getProfile, getResumeContent } from "@/lib/site-content";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function AboutPage() {
  const [profile, resume] = await Promise.all([
    getProfile(),
    getResumeContent(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <ScrollReveal>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          A bit about me
        </h1>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mt-8 space-y-4 text-[#555] leading-relaxed">
          <p>{profile.summary}</p>
          <p>{profile.mission}</p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mt-10">
          <h2 className="text-lg font-semibold">The basics</h2>
          <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[#888]">Role</dt>
              <dd className="font-medium">
                {profile.title} at {profile.company}
              </dd>
            </div>
            <div>
              <dt className="text-[#888]">Location</dt>
              <dd className="font-medium">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-[#888]">Email</dt>
              <dd>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-medium text-[#2563eb] hover:underline"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            {profile.linkedin &&
              profile.linkedin !== "LinkedIn URL pending" && (
                <div>
                  <dt className="text-[#888]">LinkedIn</dt>
                  <dd>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#2563eb] hover:underline"
                    >
                      LinkedIn
                    </a>
                  </dd>
                </div>
              )}
          </dl>
        </section>
      </ScrollReveal>

      {/* Skills from resume */}
      <ScrollReveal>
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {resume.skillSections.map((section, i) => (
              <ScrollReveal key={section.heading} delay={i * 80}>
                <div>
                  <h3 className="text-sm font-medium text-[#888]">
                    {section.heading}
                  </h3>
                  {section.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm text-[#555]">
                      {line.replace(/\*\*/g, "")}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
```

- [ ] **Step 2: Update Contact page**

Replace `src/app/contact/page.tsx` with:

```tsx
import { getProfile, getResumeContent } from "@/lib/site-content";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function ContactPage() {
  const [profile, resume] = await Promise.all([
    getProfile(),
    getResumeContent(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <ScrollReveal>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Get in touch
        </h1>
        <p className="mt-4 text-[#555] leading-relaxed">
          I&apos;m looking for my next Product/UX Design role. If you think
          we&apos;d work well together, I&apos;d love to hear from you.
        </p>
      </ScrollReveal>

      <div className="mt-8 space-y-4">
        <ScrollReveal delay={0}>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] px-5 py-4 text-[#111] transition-colors hover:bg-[#f5f5f5]"
          >
            <span className="text-sm font-medium">Email</span>
            <span className="text-sm text-[#555]">{profile.email}</span>
          </a>
        </ScrollReveal>

        {profile.linkedin &&
          profile.linkedin !== "LinkedIn URL pending" && (
            <ScrollReveal delay={100}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] px-5 py-4 text-[#111] transition-colors hover:bg-[#f5f5f5]"
              >
                <span className="text-sm font-medium">LinkedIn</span>
                <span className="text-sm text-[#555]">View profile</span>
              </a>
            </ScrollReveal>
          )}

        {resume.portfolioUrl && (
          <ScrollReveal delay={200}>
            <a
              href={resume.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] px-5 py-4 text-[#111] transition-colors hover:bg-[#f5f5f5]"
            >
              <span className="text-sm font-medium">Portfolio</span>
              <span className="text-sm text-[#555]">
                {resume.portfolioUrl}
              </span>
            </a>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update Resume page — add scroll reveals to sections**

Read `src/app/resume/page.tsx` first, then wrap each major section (`header`, `experience`, `education`, `skills`) in `<ScrollReveal>`. Add `import { ScrollReveal } from "@/components/scroll-reveal";` to the imports. Do not change the resume content or copy — it should remain professional/formal.

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd ~/Desktop/portfolio && npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/portfolio
git add src/app/about/page.tsx src/app/contact/page.tsx src/app/resume/page.tsx
git commit -m "add scroll reveals and copy rewrites to about, contact, and resume pages"
```

---

### Task 10: Wire CustomCursor into layout + final build verification

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `CustomCursor` from `@/components/custom-cursor`

- [ ] **Step 1: Add CustomCursor to layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { getProfile } from "@/lib/site-content";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
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
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-white text-[#111111] font-[family-name:var(--font-geist)]">
        <CustomCursor />
        <Nav name={profile.name} />
        <main className="flex-1">{children}</main>
        <Footer email={profile.email} linkedin={profile.linkedin} />
      </body>
    </html>
  );
}
```

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
git add src/app/layout.tsx
git commit -m "add custom cursor to layout and finalize personality pass"
git push
```

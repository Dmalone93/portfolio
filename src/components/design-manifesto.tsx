"use client";

import { useEffect, useRef } from "react";

const principles = [
  "INNOVATIVE",
  "USEFUL",
  "AESTHETIC",
  "UNDERSTANDABLE",
  "UNOBTRUSIVE",
  "HONEST",
  "LONG-LASTING",
  "THOROUGH",
  "SUSTAINABLE",
  "MINIMAL",
];

export function DesignManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll<HTMLElement>("[data-principle]");

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      // How far the section is through the viewport
      const progress = 1 - rect.top / vh;

      words.forEach((word, i) => {
        const threshold = i * 0.06;
        const wordProgress = Math.min(Math.max((progress - threshold) / 0.15, 0), 1);
        word.style.opacity = `${wordProgress}`;
        word.style.transform = `translateY(${(1 - wordProgress) * 30}px)`;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-32 overflow-hidden"
    >
      {/* Large background text — overlaid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <p
          className="font-[family-name:var(--font-geist)] text-[12vw] sm:text-[10vw] font-bold leading-none tracking-tighter text-[var(--text)] opacity-[0.04]"
        >
          GOOD<br />DESIGN
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="label-mono">PRINCIPLES</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Inspired by Dieter Rams</p>

        {/* Principle words — staggered reveal */}
        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-10 sm:gap-y-6">
          {principles.map((word) => (
            <span
              key={word}
              data-principle
              className="font-[family-name:var(--font-geist)] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] will-change-transform"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-20 max-w-2xl">
          <blockquote className="text-xl sm:text-2xl leading-relaxed text-[var(--text-muted)]">
            &ldquo;Good design is as little design as possible. Less, but better.&rdquo;
          </blockquote>
          <p className="mt-4 label-mono text-[10px]">— DIETER RAMS</p>
        </div>
      </div>
    </section>
  );
}

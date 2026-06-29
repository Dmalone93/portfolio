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
        <svg viewBox="0 0 64 64" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" className="animate-[spin_20s_linear_infinite]">
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
              className="inline-block font-[family-name:var(--font-geist)] text-4xl font-semibold sm:text-6xl lg:text-7xl tracking-normal leading-[1.15] transition-[opacity,transform] duration-[800ms]"
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

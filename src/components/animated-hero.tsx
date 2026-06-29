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
  const textRef = useRef<HTMLDivElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const motif = motifRef.current;
    if (!container || !text || !motif) return;

    function onScroll() {
      const scrollY = window.scrollY;
      const containerHeight = container!.offsetHeight;
      if (scrollY > containerHeight) return;

      // Text moves slower (sticky feel), fades out
      const progress = scrollY / containerHeight;
      text!.style.transform = `translateY(${scrollY * 0.3}px)`;
      text!.style.opacity = `${1 - progress * 1.5}`;

      // Motif moves faster (parallax depth)
      motif!.style.transform = `translateY(${scrollY * 0.5}px)`;
      motif!.style.opacity = `${1 - progress * 1.2}`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    const container = containerRef.current;
    if (!glow || !container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0, 0, 0, 0.02), transparent 60%)`;
  };

  const handleMouseLeave = () => {
    const glow = glowRef.current;
    if (glow) glow.style.background = "transparent";
  };

  const words = headline.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] overflow-hidden px-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Text content — parallax layer (slower) */}
      <div
        ref={textRef}
        className="sticky top-0 flex min-h-dvh flex-col justify-center will-change-transform"
      >
        <div className="mx-auto w-full max-w-6xl">
          {/* Headline — left aligned like Trionn */}
          <h1 className="max-w-3xl">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
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

          {/* CTA */}
          <div
            className="mt-8 transition-[opacity,transform] duration-[800ms]"
            style={{
              transitionTimingFunction: "var(--easing)",
              transitionDelay: `${800 + words.length * 100 + 100}ms`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <a href="#work" className="cta-underline w-fit">
              Start a project <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Motif — parallax layer (faster, overlaps into next section) */}
      <div
        ref={motifRef}
        className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 will-change-transform"
      >
        <div
          className="h-40 w-40 sm:h-56 sm:w-56 transition-opacity duration-1000"
          style={{
            opacity: mounted ? 1 : 0,
            transitionTimingFunction: "var(--easing)",
            transitionDelay: "1200ms",
          }}
        >
          <svg viewBox="0 0 64 64" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.3">
            <circle cx="32" cy="32" r="30" className="animate-[spin_30s_linear_infinite]" />
            <circle cx="32" cy="32" r="20" className="animate-[spin_20s_linear_infinite_reverse]" />
            <line x1="32" y1="0" x2="32" y2="64" className="animate-[spin_25s_linear_infinite]" />
            <line x1="0" y1="32" x2="64" y2="32" className="animate-[spin_25s_linear_infinite]" />
            <circle cx="32" cy="32" r="6" />
            <circle cx="32" cy="32" r="2" fill="rgba(0,0,0,0.1)" />
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000"
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

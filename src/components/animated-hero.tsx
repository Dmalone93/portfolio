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

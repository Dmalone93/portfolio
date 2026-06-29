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
        <div className="absolute inset-0 border border-[#ccc]" />
        {/* Corner crosshairs */}
        <span className="absolute -top-2.5 -left-1.5 text-xs text-[#999] select-none">&#215;</span>
        <span className="absolute -top-2.5 -right-1.5 text-xs text-[#999] select-none">&#215;</span>
        <span className="absolute -bottom-2.5 -left-1 text-xs text-[#999] select-none">+</span>
        <span className="absolute -bottom-2.5 -right-1 text-xs text-[#999] select-none">+</span>
        {/* Name */}
        <span
          className="text-sm tracking-[0.2em] text-[#666] select-none"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          DECLAN MALONE
        </span>
      </div>

      {/* Tagline */}
      <p
        className="mt-6 text-[11px] tracking-[0.2em] text-[#999] select-none"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        PRODUCT / UX DESIGNER
      </p>

      {/* Counter */}
      <p
        className="absolute bottom-12 text-sm tracking-[0.1em] text-[#666] select-none"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {count}
      </p>
    </div>
  );
}

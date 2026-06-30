"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const inspirationItems = [
  { image: "/hobbies/climbing.png", startX: -30, startY: -20, size: 100 },
  { image: "/hobbies/anime.png", startX: 25, startY: -35, size: 90 },
  { image: "/hobbies/netsuke.png", startX: -35, startY: 15, size: 70 },
  { image: "/hobbies/onepiece-tcg.png", startX: 30, startY: 20, size: 85 },
  { image: "/hobbies/camping.png", startX: -20, startY: 35, size: 110 },
  { image: "/hobbies/trees.png", startX: 35, startY: -10, size: 65 },
  { image: "/hobbies/coffee.png", startX: -25, startY: -30, size: 75 },
  { image: "/hobbies/tent.png", startX: 20, startY: 30, size: 95 },
];

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (sessionStorage.getItem("preloader-shown")) {
      setDone(true);
      setHidden(true);
      return;
    }

    startRef.current = performance.now();
    const duration = 3500;

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      const eased = p < 0.5
        ? 2 * p * p
        : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setCount(Math.round(eased * 100));
      setProgress(eased);

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("preloader-shown", "1");
        setDone(true);
        setTimeout(() => setHidden(true), 700);
      }
    }

    requestAnimationFrame(tick);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center transition-transform duration-[600ms] overflow-hidden"
      style={{
        backgroundColor: "var(--bg-preloader)",
        transitionTimingFunction: "var(--easing)",
        transform: done ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      {/* Inspiration items — converge toward portrait */}
      {inspirationItems.map((item, i) => {
        const converge = Math.min(progress * 1.5, 1);
        const eased = converge * converge;
        const currentX = item.startX * (1 - eased);
        const currentY = item.startY * (1 - eased);
        const scale = 1 - eased * 0.6;
        const opacity = converge > 0.7 ? 1 - (converge - 0.7) / 0.3 : Math.min(progress * 3, 1);
        const itemSize = item.size * (typeof window !== "undefined" && window.innerWidth < 640 ? 0.6 : 1);

        return (
          <div
            key={i}
            className="absolute will-change-transform"
            style={{
              top: `calc(50% + ${currentY}vh - ${itemSize / 2}px)`,
              left: `calc(50% + ${currentX}vw - ${itemSize / 2}px)`,
              width: itemSize,
              height: itemSize,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              className="object-contain"
              sizes={`${itemSize}px`}
            />
          </div>
        );
      })}

      {/* Portrait — fades in as items converge */}
      <div
        className="relative z-10 transition-all duration-500"
        style={{
          opacity: progress > 0.3 ? Math.min((progress - 0.3) / 0.3, 1) : 0,
          transform: `scale(${0.8 + Math.min(progress, 1) * 0.2})`,
        }}
      >
        <div className="relative h-32 w-32 sm:h-44 sm:w-44 overflow-hidden rounded-full border-2 border-white/50 shadow-2xl">
          <Image
            src="/declan.png"
            alt="Declan Malone"
            fill
            className="object-cover object-top"
            sizes="176px"
            priority
          />
        </div>
      </div>

      {/* Name + tagline */}
      <div className="relative z-10 mt-6 text-center">
        <p
          className="text-sm tracking-[0.2em] text-[#555] select-none"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          DECLAN MALONE
        </p>
        <p
          className="mt-2 text-[11px] tracking-[0.2em] text-[#999] select-none"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          PRODUCT / UX DESIGNER
        </p>
      </div>

      {/* Counter */}
      <p
        className="absolute bottom-10 text-sm tracking-[0.1em] text-[#666] select-none z-10"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {count}
      </p>
    </div>
  );
}

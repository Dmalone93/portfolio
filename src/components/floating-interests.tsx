"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const interests = [
  { label: "Climbing", image: "/hobbies/climbing.png", note: "Problem-solving with your body. Every route is a design challenge — read it, plan it, execute it.", startTop: 3, startLeft: 58, size: 220, mobileSize: 80, rotate: 8, delay: 0 },
  { label: "Anime", image: "/hobbies/anime.png", note: "Berserk taught me more about persistence and craft than any design book. Miura drew for 30 years and never compromised.", startTop: 25, startLeft: 2, size: 150, mobileSize: 60, rotate: -5, delay: 200 },
  { label: "Netsuke", image: "/hobbies/netsuke.png", note: "Tiny carved objects from Edo-era Japan. Incredible detail at miniature scale — proof that constraints breed the best work.", startTop: 8, startLeft: 30, size: 100, mobileSize: 40, rotate: 12, delay: 400 },
  { label: "One Piece TCG", image: "/hobbies/onepiece-tcg.png", note: "Collector and player. Built MyTCG because no tool existed for tracking a collection properly. Scratch your own itch.", startTop: 55, startLeft: 5, size: 150, mobileSize: 55, rotate: -3, delay: 600 },
  { label: "Camping", image: "/hobbies/camping.png", note: "Slowing down, making coffee with an Aeropress in the middle of nowhere. Best way to reset.", startTop: 72, startLeft: 55, size: 100, mobileSize: 45, rotate: 2, delay: 800 },
  { label: "Trees", image: "/hobbies/trees.png", note: "There's something about old trees. Standing in one place for hundreds of years, adapting to everything. Quiet resilience.", startTop: 5, startLeft: 42, size: 120, mobileSize: 50, rotate: -7, delay: 500 },
  { label: "Tent life", image: "/hobbies/tent.png", note: "Setting up camp, disconnecting from screens, reconnecting with the basics. The best ideas come when you stop trying.", startTop: 75, startLeft: 12, size: 350, mobileSize: 120, rotate: -2, delay: 900 },
];

// Target: the portrait in the hero (right side on desktop)
const TARGET_TOP = 45;
const TARGET_LEFT = 80;
const CONVERGE_START = 0;
const CONVERGE_END = 80;

export function FloatingInterests() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 hidden" aria-hidden="true">
      {interests.map((item) => (
        <FloatingItem key={item.label} {...item} />
      ))}
    </div>
  );
}

function FloatingItem({
  label,
  image,
  note,
  startTop,
  startLeft,
  size,
  mobileSize,
  rotate,
  delay,
}: {
  label: string;
  image: string;
  note: string;
  startTop: number;
  startLeft: number;
  size: number;
  mobileSize: number;
  rotate: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [showNote, setShowNote] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const displaySize = isMobile ? mobileSize : size;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((scrollY - CONVERGE_START * vh / 100) / ((CONVERGE_END - CONVERGE_START) * vh / 100), 0), 1);

      const eased = progress * progress;
      const currentTop = startTop + (TARGET_TOP - startTop) * eased;
      const currentLeft = startLeft + (TARGET_LEFT - startLeft) * eased;
      const scale = 1 - eased * 0.8;
      const opacity = progress > 0.6 ? 1 - (progress - 0.6) / 0.4 : 1;
      const currentRotate = rotate * (1 - eased);

      el!.style.top = `${currentTop}%`;
      el!.style.left = `${currentLeft}%`;
      el!.style.transform = `scale(${scale}) rotate(${currentRotate}deg)`;
      el!.style.opacity = `${opacity}`;
    }

    setTimeout(() => {
      el!.style.opacity = "1";
    }, 1500 + delay);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startTop, startLeft, rotate, delay]);

  // Smart tooltip position: avoid clipping off any edge
  const tooltipX = startLeft > 40 ? "right" : "left";
  const tooltipY = startTop > 60 ? "above" : "below";

  return (
    <div
      ref={ref}
      className="absolute will-change-[transform,top,left,opacity] pointer-events-auto cursor-pointer"
      style={{
        top: `${startTop}%`,
        left: `${startLeft}%`,
        width: displaySize,
        height: displaySize,
        opacity: 0,
        transform: `scale(1) rotate(${rotate}deg)`,
        transition: "opacity 1000ms var(--easing)",
      }}
      onMouseEnter={() => setShowNote(true)}
      onMouseLeave={() => setShowNote(false)}
      onClick={() => setShowNote(!showNote)}
    >
      <div className="relative h-full w-full drop-shadow-lg transition-transform duration-300 hover:scale-110" style={{ transitionTimingFunction: "var(--easing)" }}>
        <Image
          src={image}
          alt={label}
          fill
          className="object-contain"
          sizes={`${displaySize}px`}
        />
      </div>

      {showNote && (
        <div
          className={`absolute z-50 w-60 rounded-xl bg-white p-5 shadow-2xl border border-[var(--border)] ${
            tooltipX === "left" ? "left-full ml-4" : "right-full mr-4"
          } ${
            tooltipY === "above" ? "bottom-0" : "top-0"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <p className="font-[family-name:var(--font-geist)] text-sm font-semibold text-[var(--text)]">{label}</p>
          <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">{note}</p>
        </div>
      )}
    </div>
  );
}

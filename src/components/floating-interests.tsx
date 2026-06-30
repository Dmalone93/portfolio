"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const interests = [
  { label: "Climbing", image: "/hobbies/climbing.png", note: "Problem-solving with your body. Every route is a design challenge — read it, plan it, execute it.", startTop: 10, startLeft: 80, size: 140, rotate: 6, delay: 0 },
  { label: "Anime", image: "/hobbies/anime.png", note: "Berserk taught me more about persistence and craft than any design book. Miura drew for 30 years and never compromised.", startTop: 25, startLeft: 3, size: 120, rotate: -4, delay: 200 },
  { label: "Netsuke", image: "/hobbies/netsuke.png", note: "Tiny carved objects from Edo-era Japan. Incredible detail at miniature scale — proof that constraints breed the best work.", startTop: 45, startLeft: 83, size: 130, rotate: 3, delay: 400 },
  { label: "One Piece TCG", image: "/hobbies/onepiece-tcg.png", note: "Collector and player. Built MyTCG because no tool existed for tracking a collection properly. Scratch your own itch.", startTop: 55, startLeft: 6, size: 110, rotate: -6, delay: 600 },
  { label: "Camping", image: "/hobbies/camping.png", note: "Slowing down, making coffee with an Aeropress in the middle of nowhere. Best way to reset.", startTop: 70, startLeft: 76, size: 160, rotate: 2, delay: 800 },
];

// Photo position — right side of hero
const PHOTO_TOP = 40;
const PHOTO_LEFT = 75;
// Scroll range — converge within the first viewport
const CONVERGE_START = 0;
const CONVERGE_END = 80;

export function FloatingInterests() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 hidden lg:block" aria-hidden="true">
      <PhotoAnchor />
      {interests.map((item) => (
        <FloatingItem key={item.label} {...item} />
      ))}
    </div>
  );
}

function PhotoAnchor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((scrollY - CONVERGE_START * vh / 100) / ((CONVERGE_END - CONVERGE_START) * vh / 100), 0), 1);

      if (progress > 0.1 && progress < 0.95) {
        const fadeIn = Math.min((progress - 0.1) / 0.2, 1);
        const fadeOut = progress > 0.8 ? 1 - (progress - 0.8) / 0.15 : 1;
        el!.style.opacity = `${Math.min(fadeIn, fadeOut) * 0.9}`;
        el!.style.transform = `translate(-50%, -50%) scale(${0.9 + progress * 0.1})`;
      } else {
        el!.style.opacity = "0";
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute will-change-transform"
      style={{
        top: `${PHOTO_TOP}%`,
        left: `${PHOTO_LEFT}%`,
        width: 200,
        height: 250,
        opacity: 0,
        transform: "translate(-50%, -50%) scale(0.9)",
      }}
    >
      <div className="relative h-full w-full drop-shadow-2xl">
        <Image
          src="/declan.png"
          alt="Declan Malone"
          fill
          className="rounded-2xl object-cover object-top"
          sizes="200px"
        />
      </div>
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
  rotate,
  delay,
}: {
  label: string;
  image: string;
  note: string;
  startTop: number;
  startLeft: number;
  size: number;
  rotate: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((scrollY - CONVERGE_START * vh / 100) / ((CONVERGE_END - CONVERGE_START) * vh / 100), 0), 1);

      const eased = progress * progress;
      const currentTop = startTop + (PHOTO_TOP - startTop) * eased;
      const currentLeft = startLeft + (PHOTO_LEFT - startLeft) * eased;
      const scale = 1 - eased * 0.7;
      const opacity = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
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

  // Tooltip position: flip based on which side of screen
  const tooltipSide = startLeft > 50 ? "right" : "left";

  return (
    <div
      ref={ref}
      className="absolute will-change-[transform,top,left,opacity] pointer-events-auto cursor-pointer"
      style={{
        top: `${startTop}%`,
        left: `${startLeft}%`,
        width: size,
        height: size,
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
          sizes={`${size}px`}
        />
      </div>

      {/* Tooltip */}
      {showNote && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 z-50 w-56 rounded-xl bg-white p-4 shadow-xl ${
            tooltipSide === "left" ? "left-full ml-3" : "right-full mr-3"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <p className="label-mono text-[10px] text-[var(--text)]">{label}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">{note}</p>
        </div>
      )}
    </div>
  );
}

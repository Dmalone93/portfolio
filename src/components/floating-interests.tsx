"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const interests = [
  { label: "Climbing", image: "/hobbies/climbing.png", note: "Problem-solving with your body. Every route is a design challenge — read it, plan it, execute it.", startTop: 8, startLeft: 78, size: 200, rotate: 6, delay: 0 },
  { label: "Anime", image: "/hobbies/anime.png", note: "Berserk taught me more about persistence and craft than any design book. Miura drew for 30 years and never compromised.", startTop: 20, startLeft: 2, size: 180, rotate: -4, delay: 200 },
  { label: "Netsuke", image: "/hobbies/netsuke.png", note: "Tiny carved objects from Edo-era Japan. Incredible detail at miniature scale — proof that constraints breed the best work.", startTop: 42, startLeft: 84, size: 110, rotate: 3, delay: 400 },
  { label: "One Piece TCG", image: "/hobbies/onepiece-tcg.png", note: "Collector and player. Built MyTCG because no tool existed for tracking a collection properly. Scratch your own itch.", startTop: 52, startLeft: 4, size: 170, rotate: -6, delay: 600 },
  { label: "Camping", image: "/hobbies/camping.png", note: "Slowing down, making coffee with an Aeropress in the middle of nowhere. Best way to reset.", startTop: 60, startLeft: 68, size: 320, rotate: 2, delay: 800 },
  { label: "Trees", image: "/hobbies/trees.png", note: "There's something about old trees. Standing in one place for hundreds of years, adapting to everything. Quiet resilience.", startTop: 35, startLeft: 1, size: 120, rotate: 5, delay: 500 },
  { label: "Coffee", image: "/hobbies/coffee.png", note: "Aeropress ritual. The process matters as much as the result — measure, pour, press. Design thinking in a cup.", startTop: 15, startLeft: 45, size: 150, rotate: -3, delay: 700 },
  { label: "Tent life", image: "/hobbies/tent.png", note: "Setting up camp, disconnecting from screens, reconnecting with the basics. The best ideas come when you stop trying.", startTop: 78, startLeft: 15, size: 250, rotate: 1, delay: 900 },
];

// Target: the about-strip photo position (roughly where the photo sits on screen)
// About strip is the second section, photo is on the left ~10% from left, roughly 120vh down
const TARGET_TOP = 18; // percentage of viewport
const TARGET_LEFT = 12;
const CONVERGE_START = 0;
const CONVERGE_END = 80;

export function FloatingInterests() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
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

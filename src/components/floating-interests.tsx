"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const interests = [
  { label: "Climbing", image: "/hobbies/climbing.png", startTop: 8, startLeft: 82, size: 140, rotate: 6, delay: 0 },
  { label: "Anime", image: "/hobbies/anime.png", startTop: 22, startLeft: 2, size: 120, rotate: -4, delay: 200 },
  { label: "Netsuke", image: "/hobbies/netsuke.png", startTop: 42, startLeft: 85, size: 130, rotate: 3, delay: 400 },
  { label: "One Piece TCG", image: "/hobbies/onepiece-tcg.png", startTop: 58, startLeft: 5, size: 110, rotate: -6, delay: 600 },
  { label: "Camping", image: "/hobbies/camping.png", startTop: 75, startLeft: 78, size: 160, rotate: 2, delay: 800 },
];

// Photo position — center of the page, about 45% down
const PHOTO_TOP = 45;
const PHOTO_LEFT = 50;
// Scroll range where items converge and disappear (in vh units of scroll)
const CONVERGE_START = 100; // items start moving toward photo
const CONVERGE_END = 250;  // items reach photo and fade out

export function FloatingInterests() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 hidden lg:block" aria-hidden="true">
      {/* Photo of Declan — fixed center */}
      <PhotoAnchor />
      {/* Floating hobby items */}
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

      // Photo fades in as items converge, then fades out after they arrive
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
      className="absolute will-change-transform transition-opacity duration-300"
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
  startTop,
  startLeft,
  size,
  rotate,
  delay,
}: {
  label: string;
  image: string;
  startTop: number;
  startLeft: number;
  size: number;
  rotate: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((scrollY - CONVERGE_START * vh / 100) / ((CONVERGE_END - CONVERGE_START) * vh / 100), 0), 1);

      // Ease the convergence
      const eased = progress * progress;

      // Lerp from start position toward photo center
      const currentTop = startTop + (PHOTO_TOP - startTop) * eased;
      const currentLeft = startLeft + (PHOTO_LEFT - startLeft) * eased;

      // Scale down and fade out as they reach the photo
      const scale = 1 - eased * 0.7;
      const opacity = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
      const currentRotate = rotate * (1 - eased);

      el!.style.top = `${currentTop}%`;
      el!.style.left = `${currentLeft}%`;
      el!.style.transform = `scale(${scale}) rotate(${currentRotate}deg)`;
      el!.style.opacity = `${opacity}`;
    }

    // Fade in with delay
    setTimeout(() => {
      el!.style.opacity = "1";
    }, 1500 + delay);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startTop, startLeft, rotate, delay]);

  return (
    <div
      ref={ref}
      className="absolute will-change-[transform,top,left,opacity]"
      style={{
        top: `${startTop}%`,
        left: `${startLeft}%`,
        width: size,
        height: size,
        opacity: 0,
        transform: `scale(1) rotate(${rotate}deg)`,
        transition: "opacity 1000ms var(--easing)",
      }}
    >
      <div className="relative h-full w-full drop-shadow-lg">
        <Image
          src={image}
          alt={label}
          fill
          className="object-contain"
          sizes={`${size}px`}
        />
      </div>
    </div>
  );
}

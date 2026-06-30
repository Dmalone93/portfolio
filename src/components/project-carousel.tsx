"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectCarousel({
  projects,
  title,
}: {
  projects: Project[];
  title: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-card]")?.clientWidth ?? 400;
    el.scrollBy({
      left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
      behavior: "smooth",
    });
  }, []);

  // Staggered card entrance via IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = container.querySelectorAll<HTMLElement>("[data-card]");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("card-revealed");
              }, i * 150);
            });
            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Header row */}
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-[family-name:var(--font-geist)] text-2xl sm:text-3xl">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project) => (
          <CarouselCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

function CarouselCard({ project }: { project: Project }) {
  const screenshot = getScreenshot(project.slug);
  const video = getCardVideo(project.slug);

  return (
    <Link
      href={`/work/${project.slug}`}
      data-card
      data-cursor="view"
      className="group flex-none w-[85vw] sm:w-[500px] snap-start"
    >
      {/* Media area */}
      <div className="inset-frame relative overflow-hidden rounded-lg bg-[#e8e8e8] aspect-[16/10]">
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ transitionTimingFunction: "var(--easing)" }}
          />
        ) : screenshot ? (
          <Image
            src={screenshot}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ transitionTimingFunction: "var(--easing)" }}
            sizes="(max-width: 640px) 85vw, 500px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="label-mono text-[var(--text-dim)]">{project.title}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-geist)] text-xl text-[var(--text)]">
            {project.title}
          </h3>
          <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>
        <span className="cta-underline w-fit shrink-0 text-[11px]">
          Explore project <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

function getScreenshot(slug: string): string | null {
  const map: Record<string, string> = {
    cardconomy: "/screenshots/cardconomy.png",
    mytcg: "/screenshots/mytcg.png",
    "quick-add": "/screenshots/quick-add.png",
    "product-details-page": "/screenshots/product-details-page.png",
    "support-hub": "/screenshots/dfyne-homepage.png",
    "athlete-styles": "/screenshots/dfyne-homepage.png",
    "homepage-refresh": "/screenshots/dfyne-homepage.png",
  };
  return map[slug] ?? null;
}

function getCardVideo(slug: string): string | null {
  const map: Record<string, string> = {
    cardconomy: "/videos/cardconomy/hero.mp4",
  };
  return map[slug] ?? null;
}

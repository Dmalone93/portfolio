"use client";

import { useState } from "react";

export function PrototypeEmbed({
  url,
  embedMode,
  viewport,
}: {
  url: string;
  embedMode?: "iframe" | "external-only";
  viewport?: "mobile" | "desktop";
}) {
  const [loaded, setLoaded] = useState(false);

  if (!url) return null;

  if (embedMode === "external-only") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-[#e5e5e5] px-4 py-2.5 text-sm font-medium text-[#2563eb] transition-colors hover:bg-[#f5f5f5]"
      >
        View live prototype
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </a>
    );
  }

  const isMobile = viewport === "mobile";
  const aspectClass = isMobile ? "aspect-[9/16] max-w-sm" : "aspect-video w-full";

  return (
    <div className={`relative mx-auto overflow-hidden rounded-lg border border-[#e5e5e5] bg-[#fafafa] ${aspectClass}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-[#555]">
          Loading prototype…
        </div>
      )}
      <iframe
        src={url}
        title="Live prototype"
        className="h-full w-full"
        onLoad={() => setLoaded(true)}
        allow="clipboard-write"
      />
    </div>
  );
}

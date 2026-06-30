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
        className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--bg-elevated)]"
      >
        View live prototype
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </a>
    );
  }

  const isMobile = viewport === "mobile";

  if (isMobile) {
    return (
      <div className="flex justify-center">
        <div
          className="relative overflow-hidden rounded-[40px] bg-[#1a1a1a] p-[10px] shadow-2xl"
          style={{ width: 320 }}
        >
          {/* Dynamic island */}
          <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2">
            <div className="h-[26px] w-[100px] rounded-b-[14px] bg-[#1a1a1a]" />
          </div>

          {/* Screen */}
          <div className="relative overflow-hidden rounded-[30px] bg-white">
            {!loaded && (
              <div className="flex items-center justify-center text-sm text-[var(--text-muted)]" style={{ height: 680 }}>
                Loading prototype…
              </div>
            )}
            <iframe
              src={url}
              title="Live prototype"
              className="w-full"
              style={{ height: 680, display: loaded ? "block" : "none" }}
              onLoad={() => setLoaded(true)}
              allow="clipboard-write"
            />
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pt-[6px] pb-[2px]">
            <div className="h-[4px] w-[100px] rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] aspect-video w-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--text-muted)]">
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

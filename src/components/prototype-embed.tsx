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
        {/* Phone frame */}
        <div className="relative w-[375px]">
          {/* Notch */}
          <div className="relative z-10 mx-auto h-7 w-36 rounded-b-2xl bg-[#111]" />
          {/* Screen */}
          <div className="relative -mt-1 overflow-hidden rounded-[2.5rem] border-[3px] border-[#111] bg-[var(--bg-elevated)] shadow-xl">
            {/* Status bar area */}
            <div className="h-3 bg-[#111]" />
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--text-muted)]">
                Loading prototype…
              </div>
            )}
            <iframe
              src={url}
              title="Live prototype"
              className="w-full"
              style={{ height: "750px" }}
              onLoad={() => setLoaded(true)}
              allow="clipboard-write"
            />
            {/* Home indicator */}
            <div className="flex justify-center py-2 bg-white">
              <div className="h-1 w-28 rounded-full bg-[#111]/20" />
            </div>
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

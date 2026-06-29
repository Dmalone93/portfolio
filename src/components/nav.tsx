"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuOverlay } from "@/components/menu-overlay";

export function Nav({ name }: { name: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xs tracking-[0.1em] uppercase text-[var(--text)] font-[family-name:var(--font-mono)]"
          >
            {name}
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="cta-underline hidden sm:inline-flex"
            >
              Start a project <span aria-hidden="true">&rarr;</span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

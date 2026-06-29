"use client";

import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]/95 backdrop-blur-sm"
      style={{ transition: "opacity 300ms var(--easing)" }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        aria-label="Close menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>

      {/* Links */}
      <nav className="flex flex-col items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-4xl sm:text-5xl font-[family-name:var(--font-geist)] text-[var(--text)] hover:text-[var(--text-muted)] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

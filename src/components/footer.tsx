export function Footer({ email }: { email: string; linkedin: string }) {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="label-mono">&copy; 2025 DECLAN MALONE</p>
        <p className="label-mono text-[var(--text-dim)]">
          PRODUCT / UX DESIGNER — EST. 2019
        </p>
        <a
          href={`mailto:${email}`}
          className="cta-underline text-[11px]"
        >
          {email}
        </a>
      </div>
    </footer>
  );
}

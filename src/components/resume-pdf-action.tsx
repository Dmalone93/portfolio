"use client";

export function ResumePdfAction({ pdfUrl, fileName }: { pdfUrl: string; fileName?: string }) {
  return (
    <div className="mt-8 flex gap-3">
      <a
        href={pdfUrl}
        download={fileName || "resume.pdf"}
        className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-[var(--bg)] transition-colors hover:bg-[var(--text-muted)]"
      >
        Download PDF
      </a>
      <button
        type="button"
        onClick={() => {
          if (navigator.share) {
            navigator.share({ title: "Resume", url: pdfUrl });
          } else {
            navigator.clipboard.writeText(pdfUrl);
          }
        }}
        className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-elevated)]"
      >
        Share
      </button>
    </div>
  );
}

export function MediaPlaceholder({
  label = "Image / video",
  aspectRatio = "16/10",
  className = "",
}: {
  label?: string;
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div
      className={`inset-frame relative overflow-hidden rounded-lg bg-[#1a1a1a] ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="label-mono text-[var(--text-dim)]">{label}</span>
      </div>
    </div>
  );
}

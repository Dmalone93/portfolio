import Link from "next/link";
import type { Project } from "@/data/projects";
import { MediaPlaceholder } from "@/components/media-placeholder";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group">
      {/* Media area */}
      <Link href={`/work/${project.slug}`} className="block overflow-hidden rounded-lg">
        <div className="transition-transform duration-500 group-hover:scale-[1.02]" style={{ transitionTimingFunction: "var(--easing)" }}>
          <MediaPlaceholder
            label={project.title}
            aspectRatio="16/10"
          />
        </div>
      </Link>

      {/* Info row */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--text)]">
            {project.title}
          </h3>
          <p className="mt-1 max-w-md text-sm text-[var(--text-muted)] leading-relaxed">
            {project.summary}
          </p>
        </div>
        <Link
          href={`/work/${project.slug}`}
          className="cta-underline shrink-0"
        >
          Explore project <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

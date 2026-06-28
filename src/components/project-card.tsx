import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const topStats = project.stats?.slice(0, 2) ?? [];

  return (
    <Link
      href={`/work/${project.slug}`}
      className="noise-texture group relative block rounded-lg border border-[#e5e5e5] bg-white p-6 transition-shadow duration-200 hover:shadow-lg"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-[#555]">
        {project.company}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-[#111] group-hover:text-[#2563eb] transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#555]">
        {project.summary}
      </p>
      {topStats.length > 0 && (
        <div className="mt-4 flex gap-4">
          {topStats.map((stat) => (
            <div
              key={stat.key}
              className="rounded bg-[#f5f5f5] px-3 py-1.5 transition-colors duration-200 group-hover:bg-[#2563eb] group-hover:text-white"
            >
              <span className="text-sm font-semibold text-[#2563eb] transition-colors duration-200 group-hover:text-white">
                {stat.value}
              </span>
              <span className="ml-1.5 text-xs text-[#555] transition-colors duration-200 group-hover:text-white/80">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}

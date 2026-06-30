import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

const cardVideos: Record<string, string> = {
  cardconomy: "/videos/cardconomy/hero.mp4",
  mytcg: "/videos/mytcg/hero.mp4",
};

const cardScreenshots: Record<string, string> = {
  cardconomy: "/screenshots/cardconomy.png",
  mytcg: "/screenshots/mytcg.png",
};

export function FeaturedProjectCard({ project }: { project: Project }) {
  const video = cardVideos[project.slug];
  const screenshot = cardScreenshots[project.slug];

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      className="group block"
    >
      {/* Full-width media */}
      <div className="inset-frame relative overflow-hidden rounded-xl bg-[#ebebeb] aspect-[16/9]">
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ transitionTimingFunction: "var(--easing)" }}
          />
        ) : screenshot ? (
          <Image
            src={screenshot}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ transitionTimingFunction: "var(--easing)" }}
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="label-mono text-[var(--text-dim)]">{project.title}</span>
          </div>
        )}
      </div>

      {/* Info row */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="label-mono text-[10px]">{project.company}</p>
          <h3 className="mt-2 font-[family-name:var(--font-geist)] text-2xl sm:text-3xl text-[var(--text)]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)] leading-relaxed">
            {project.summary}
          </p>
        </div>
        <span className="cta-underline w-fit shrink-0 text-[11px] sm:mt-6">
          Explore project <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

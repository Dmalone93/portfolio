import { getProfile, getProjects } from "@/lib/site-content";
import { ProjectCard } from "@/components/project-card";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg text-[#555]">{profile.targetTitle}</p>
        <p className="mt-4 max-w-xl text-[#555] leading-relaxed">
          {profile.mission}
        </p>
        <a
          href="#work"
          className="mt-6 inline-block rounded-md bg-[#111] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333]"
        >
          View my work
        </a>
      </section>

      {/* Project grid */}
      <section id="work" className="pb-16 sm:pb-24">
        <h2 className="text-sm font-medium uppercase tracking-wide text-[#555]">
          Selected Work
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

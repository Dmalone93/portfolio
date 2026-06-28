import { getProfile, getProjects } from "@/lib/site-content";
import { AnimatedHero } from "@/components/animated-hero";
import { ProjectCard } from "@/components/project-card";
import { TiltCard } from "@/components/tilt-card";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <AnimatedHero
        name={profile.name}
        title={profile.targetTitle}
        mission={profile.mission}
      />

      {/* Project grid */}
      <section id="work" className="pb-16 sm:pb-24">
        <ScrollReveal direction="left">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#555]">
            What I&apos;ve shipped
          </h2>
        </ScrollReveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 100}>
              <TiltCard className="h-full">
                <ProjectCard project={project} />
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}

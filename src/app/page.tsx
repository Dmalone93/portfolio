import { getProfile, getProjects } from "@/lib/site-content";
import { AnimatedHero } from "@/components/animated-hero";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  const heroDescription = `Product and UX designer who works across the full stack — research, systems, prototyping, and front-end implementation. At DFYNE I built the UX practice from zero, hired the team, and shipped features that moved real numbers. Before that, trading platforms at JP Morgan and margin analytics at OpenGamma.`;

  return (
    <div>
      <AnimatedHero
        headline="I design and ship, from concept to production."
        description={heroDescription}
      />

      {/* Seamless transition — no hard section break */}
      <section id="work" className="relative mx-auto max-w-6xl px-6 -mt-[10vh] pb-24">
        <ScrollReveal>
          <div className="flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-geist)] text-3xl sm:text-4xl">
              Selected work &amp; explorations
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-20 space-y-24">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 50}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}

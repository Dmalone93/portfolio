import { getProfile, getProjects } from "@/lib/site-content";
import { AnimatedHero } from "@/components/animated-hero";
import { AboutStrip } from "@/components/about-strip";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { SkillsGrid } from "@/components/skills-grid";
import { ProjectCarousel } from "@/components/project-carousel";
import { ClosingStatement } from "@/components/closing-statement";
import { FloatingInterests } from "@/components/floating-interests";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  const personalProjects = projects.filter(
    (p) => p.slug === "cardconomy" || p.slug === "mytcg"
  );

  const workProjects = projects.filter(
    (p) => p.company === "DFYNE"
  );

  const privateWork = projects.filter(
    (p) => p.slug === "gallery-design-bedrooms"
  );

  const heroDescription = `Product and UX designer who works across the full stack — research, systems, prototyping, and front-end implementation. At DFYNE I built the UX practice from zero, hired the team, and shipped features that moved real numbers. Before that, trading platforms at JP Morgan and margin analytics at OpenGamma.`;

  return (
    <div className="relative">
      <FloatingInterests />
      <AnimatedHero
        headline="I design and ship, from concept to production."
        description={heroDescription}
      />

      <AboutStrip />

      {/* Personal Projects — full-width stacked */}
      <section id="work" className="mx-auto max-w-6xl px-6 pt-8 pb-16">
        <ScrollReveal>
          <p className="label-mono">PERSONAL PROJECTS</p>
          <h2 className="mt-3 font-[family-name:var(--font-geist)] text-3xl sm:text-4xl">
            Selected work &amp; explorations
          </h2>
        </ScrollReveal>

        <div className="mt-16 space-y-32">
          {personalProjects.map((project) => (
            <ScrollReveal key={project.slug}>
              <FeaturedProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <SkillsGrid />

      {/* Work — carousel */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <ProjectCarousel
            title="Work"
            projects={workProjects}
          />
        </ScrollReveal>
      </section>

      {/* Private Work — carousel */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <ScrollReveal>
          <ProjectCarousel
            title="Private work"
            projects={privateWork}
          />
        </ScrollReveal>
      </section>

      <ClosingStatement />
    </div>
  );
}

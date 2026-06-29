import { getProfile, getProjects } from "@/lib/site-content";
import { AnimatedHero } from "@/components/animated-hero";
import { ProjectCarousel } from "@/components/project-carousel";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Marquee } from "@/components/marquee";

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
    <div>
      <AnimatedHero
        headline="I design and ship, from concept to production."
        description={heroDescription}
      />

      <Marquee />

      {/* Personal Projects */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <ProjectCarousel
            title="Personal projects"
            projects={personalProjects}
          />
        </ScrollReveal>
      </section>

      <Marquee />

      {/* Work */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <ScrollReveal>
          <ProjectCarousel
            title="Work"
            projects={workProjects}
          />
        </ScrollReveal>
      </section>

      <Marquee />

      {/* Private Work */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <ScrollReveal>
          <ProjectCarousel
            title="Private work"
            projects={privateWork}
          />
        </ScrollReveal>
      </section>
    </div>
  );
}

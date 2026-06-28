import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/site-content";
import { PrototypeEmbed } from "@/components/prototype-embed";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CountUp } from "@/components/count-up";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      {/* Back link */}
      <Link
        href="/#work"
        className="text-sm text-[#555] hover:text-[#111] transition-colors"
      >
        &larr; All projects
      </Link>

      {/* Header */}
      <ScrollReveal>
        <header className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-[#555]">
            {project.company}
            {project.eyebrow ? ` — ${project.eyebrow}` : ""}
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h1>

          {/* Hero metrics with count-up */}
          {project.stats && project.stats.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {project.stats.map((stat, i) => (
                <ScrollReveal key={stat.key} delay={i * 100}>
                  <div className="rounded-lg bg-[#f5f5f5] px-4 py-3">
                    <p className="text-xl font-bold text-[#2563eb]">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="text-xs text-[#555]">{stat.label}</p>
                    {stat.detail && (
                      <p className="mt-0.5 text-xs text-[#888]">
                        {stat.detail}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </header>
      </ScrollReveal>

      {/* Summary */}
      {project.summary && (
        <ScrollReveal>
          <section className="mt-10">
            <p className="text-[#555] leading-relaxed">{project.summary}</p>
          </section>
        </ScrollReveal>
      )}

      {/* Challenge */}
      {project.challenge && project.challenge.length > 0 && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">The problem</h2>
            <ul className="mt-3 space-y-2">
              {project.challenge.map((item) => (
                <li key={item} className="text-[#555] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      {/* Process */}
      {project.processSteps && project.processSteps.length > 0 && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">How I approached it</h2>
            <ol className="mt-4 space-y-6">
              {project.processSteps.map((step, i) => (
                <ScrollReveal key={step.key} delay={i * 100}>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-xs font-semibold text-[#555]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-[#555] leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </section>
        </ScrollReveal>
      )}

      {/* What Changed */}
      {project.whatChanged && project.whatChanged.length > 0 && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">What I changed</h2>
            <ul className="mt-3 space-y-2">
              {project.whatChanged.map((item) => (
                <li key={item} className="text-[#555] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      {/* Comparison */}
      {project.comparison && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">Before &amp; after</h2>
            {project.comparison.intro && (
              <p className="mt-2 text-sm text-[#555]">
                {project.comparison.intro}
              </p>
            )}
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-[#555]">Before</h3>
                <ul className="mt-2 space-y-1.5">
                  {project.comparison.before.map((item) => (
                    <li key={item} className="text-sm text-[#555]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#2563eb]">After</h3>
                <ul className="mt-2 space-y-1.5">
                  {project.comparison.after.map((item) => (
                    <li key={item} className="text-sm text-[#555]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Narrative sections */}
      {project.narrativeSections && project.narrativeSections.length > 0 && (
        <>
          {project.narrativeSections.map((section) => (
            <ScrollReveal key={section.key}>
              <section className="mt-10">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-3 text-[#555] leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            </ScrollReveal>
          ))}
        </>
      )}

      {/* Live Prototype */}
      {project.liveUrl && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">Try it</h2>
            <div className="mt-4">
              <PrototypeEmbed
                url={project.liveUrl}
                embedMode={project.embedMode}
                viewport={project.prototypeViewport}
              />
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Impact */}
      {project.impact && project.impact.length > 0 && (
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="text-lg font-semibold">What it did</h2>
            <ul className="mt-3 space-y-2">
              {project.impact.map((item) => (
                <li key={item} className="text-[#555] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      {/* Prev / Next */}
      <nav className="mt-16 flex items-center justify-between border-t border-[#e5e5e5] pt-6">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="text-sm text-[#555] hover:text-[#111] transition-colors"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="text-sm text-[#555] hover:text-[#111] transition-colors"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

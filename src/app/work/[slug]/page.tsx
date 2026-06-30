import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/site-content";
import { PrototypeEmbed } from "@/components/prototype-embed";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CountUp } from "@/components/count-up";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { CaseStudyVideo } from "@/components/case-study-video";

type ProjectVideo = { src: string; label: string };
type ProjectVideos = {
  hero?: ProjectVideo;
  afterSummary?: ProjectVideo;
  afterProcess?: ProjectVideo;
  afterWhatChanged?: ProjectVideo;
  beforeImpact?: ProjectVideo;
  walkthrough?: ProjectVideo[];
};

const projectVideos: Record<string, ProjectVideos> = {
  cardconomy: {
    hero: { src: "/videos/cardconomy/hero.mp4", label: "" },
  },
  mytcg: {
    hero: { src: "/videos/mytcg/hero.mp4", label: "" },
    afterSummary: { src: "/videos/mytcg/search-browse.mp4", label: "SEARCH & BROWSE" },
    afterProcess: { src: "/videos/mytcg/card-detail.mp4", label: "CARD DETAIL & PRICING" },
    afterWhatChanged: { src: "/videos/mytcg/news-feed.mp4", label: "NEWS FEED" },
    beforeImpact: { src: "/videos/mytcg/collection-share.mp4", label: "COLLECTION SHARING" },
    walkthrough: [
      { src: "/videos/mytcg/dashboard.mp4", label: "HOME DASHBOARD" },
      { src: "/videos/mytcg/search-browse.mp4", label: "SEARCH & BROWSE" },
      { src: "/videos/mytcg/card-detail.mp4", label: "CARD DETAIL & PRICING" },
      { src: "/videos/mytcg/news-feed.mp4", label: "NEWS FEED" },
      { src: "/videos/mytcg/collection-share.mp4", label: "COLLECTION SHARING" },
    ],
  },
};

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
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const videos = projectVideos[slug];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      {/* Back link */}
      <Link href="/#work" className="cta-underline text-[10px] text-[var(--text-muted)]">
        &larr; All projects
      </Link>

      {/* Hero media */}
      <ScrollReveal className="mt-8">
        {videos?.hero ? (
          <CaseStudyVideo src={videos.hero.src} label={videos.hero.label || undefined} />
        ) : (
          <MediaPlaceholder label={`${project.title} — Hero`} aspectRatio="21/9" />
        )}
      </ScrollReveal>

      {/* Header */}
      <ScrollReveal className="mt-10">
        <header className="max-w-3xl">
          <p className="label-mono">{project.company}{project.eyebrow ? ` — ${project.eyebrow}` : ""}</p>
          <h1 className="mt-3 font-[family-name:var(--font-geist)] text-3xl sm:text-5xl tracking-tight">
            {project.title}
          </h1>
        </header>
      </ScrollReveal>

      {/* Stats */}
      {project.stats && project.stats.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-4">
          {project.stats.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 100}>
              <div className="border border-[var(--border)] rounded-lg px-5 py-4">
                <p className="font-[family-name:var(--font-mono)] text-2xl font-light text-[var(--text)]">
                  <CountUp value={stat.value} />
                </p>
                <p className="label-mono mt-1">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Body content */}
      <div className="mx-auto mt-16 max-w-6xl space-y-20">
        {/* Summary */}
        {project.summary && (
          <ScrollReveal>
            <p className="max-w-3xl text-lg text-[var(--text-muted)] leading-relaxed">{project.summary}</p>
          </ScrollReveal>
        )}

        {/* Challenge + video side by side */}
        {project.challenge && project.challenge.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
              <section className="flex-1">
                <p className="label-mono">THE PROBLEM</p>
                <h2 className="mt-2 font-[family-name:var(--font-geist)] text-2xl">The problem</h2>
                <ul className="mt-4 space-y-3">
                  {project.challenge.map((item) => (
                    <li key={item} className="text-[var(--text-muted)] leading-relaxed">{item}</li>
                  ))}
                </ul>
              </section>
              <div className="lg:w-[45%] lg:shrink-0">
                {videos?.afterSummary ? (
                  <CaseStudyVideo src={videos.afterSummary.src} label={videos.afterSummary.label} />
                ) : (
                  <MediaPlaceholder label="Screenshot / video" aspectRatio="9/16" />
                )}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Process + video side by side */}
        {project.processSteps && project.processSteps.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-16">
              <section className="flex-1">
                <p className="label-mono">HOW I APPROACHED IT</p>
                <h2 className="mt-2 font-[family-name:var(--font-geist)] text-2xl">How I approached it</h2>
                <ol className="mt-6 space-y-8">
                  {project.processSteps.map((step, i) => (
                    <ScrollReveal key={step.key} delay={i * 80}>
                      <li className="flex gap-5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-medium">{step.title}</h3>
                          <p className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">{step.text}</p>
                        </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ol>
              </section>
              <div className="lg:w-[45%] lg:shrink-0">
                {videos?.afterProcess ? (
                  <CaseStudyVideo src={videos.afterProcess.src} label={videos.afterProcess.label} />
                ) : (
                  <MediaPlaceholder label="Screenshot / video" aspectRatio="9/16" />
                )}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* What Changed + video side by side */}
        {project.whatChanged && project.whatChanged.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
              <section className="flex-1">
                <p className="label-mono">WHAT I CHANGED</p>
                <h2 className="mt-2 font-[family-name:var(--font-geist)] text-2xl">What I changed</h2>
                <ul className="mt-4 space-y-3">
                  {project.whatChanged.map((item) => (
                    <li key={item} className="text-[var(--text-muted)] leading-relaxed">{item}</li>
                  ))}
                </ul>
              </section>
              <div className="lg:w-[45%] lg:shrink-0">
                {videos?.afterWhatChanged ? (
                  <CaseStudyVideo src={videos.afterWhatChanged.src} label={videos.afterWhatChanged.label} />
                ) : (
                  <MediaPlaceholder label="Screenshot / video" aspectRatio="9/16" />
                )}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Comparison */}
        {project.comparison && (
          <ScrollReveal>
            <section>
              <p className="label-mono">BEFORE &amp; AFTER</p>
              {project.comparison.intro && (
                <p className="mt-2 text-sm text-[var(--text-muted)]">{project.comparison.intro}</p>
              )}
              <div className="mt-4 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="label-mono text-[var(--text-dim)]">Before</h3>
                  <ul className="mt-3 space-y-2">
                    {project.comparison.before.map((item) => (
                      <li key={item} className="text-sm text-[var(--text-muted)]">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label-mono text-[var(--text)]">After</h3>
                  <ul className="mt-3 space-y-2">
                    {project.comparison.after.map((item) => (
                      <li key={item} className="text-sm text-[var(--text-muted)]">{item}</li>
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
                <section>
                  <h2 className="font-[family-name:var(--font-geist)] text-2xl">{section.title}</h2>
                  {section.paragraphs.map((p) => (
                    <p key={p} className="mt-3 text-[var(--text-muted)] leading-relaxed">{p}</p>
                  ))}
                </section>
              </ScrollReveal>
            ))}
          </>
        )}

        {/* Prototype */}
        {project.liveUrl && (
          <ScrollReveal>
            <section>
              <p className="label-mono">TRY IT</p>
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

        {/* Media before impact */}
        <ScrollReveal>
          {videos?.beforeImpact ? (
            <CaseStudyVideo src={videos.beforeImpact.src} label={videos.beforeImpact.label} />
          ) : (
            <MediaPlaceholder label="Screenshot / video" aspectRatio="16/9" />
          )}
        </ScrollReveal>

        {/* Impact */}
        {project.impact && project.impact.length > 0 && (
          <ScrollReveal>
            <section>
              <p className="label-mono">WHAT IT DID</p>
              <h2 className="mt-2 font-[family-name:var(--font-geist)] text-2xl">What it did</h2>
              <ul className="mt-4 space-y-3">
                {project.impact.map((item) => (
                  <li key={item} className="text-[var(--text-muted)] leading-relaxed">{item}</li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        )}
      </div>

      {/* All videos in a row — full width */}
      {videos?.walkthrough && videos.walkthrough.length > 0 && (
        <ScrollReveal className="mt-20">
          <section>
            <p className="label-mono">PROTOTYPE WALKTHROUGH</p>
            <div className="mt-6 flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
              {videos.walkthrough.map((video) => (
                <div key={video.src} className="flex-none w-[70vw] sm:w-[280px] lg:w-[calc((100%-64px)/5)]">
                  <CaseStudyVideo src={video.src} />
                  <p className="label-mono mt-3 text-[10px]">{video.label}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Prev / Next */}
      <nav className="mx-auto mt-20 flex max-w-3xl items-center justify-between border-t border-[var(--border)] pt-8">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="cta-underline text-[10px]">
            &larr; {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/work/${next.slug}`} className="cta-underline text-[10px]">
            {next.title} &rarr;
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}

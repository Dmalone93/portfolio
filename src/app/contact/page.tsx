import { getProfile, getResumeContent } from "@/lib/site-content";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function ContactPage() {
  const [profile, resume] = await Promise.all([getProfile(), getResumeContent()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <ScrollReveal>
        <p className="label-mono">CONTACT</p>
        <h1 className="mt-3 font-[family-name:var(--font-geist)] text-3xl sm:text-5xl tracking-tight">
          Get in touch
        </h1>
        <p className="mt-6 max-w-lg text-[var(--text-muted)] leading-relaxed">
          I&apos;m looking for my next Product/UX Design role. If you think we&apos;d work well together, I&apos;d love to hear from you.
        </p>
      </ScrollReveal>

      <div className="mt-12 space-y-6">
        <ScrollReveal>
          <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
            <span className="label-mono text-[10px]">Email</span>
            <a href={`mailto:${profile.email}`} className="cta-underline text-[11px]">
              {profile.email} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>

        {profile.linkedin && profile.linkedin !== "LinkedIn URL pending" && (
          <ScrollReveal delay={100}>
            <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
              <span className="label-mono text-[10px]">LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="cta-underline text-[11px]">
                View profile <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </ScrollReveal>
        )}

        {resume.portfolioUrl && (
          <ScrollReveal delay={200}>
            <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
              <span className="label-mono text-[10px]">Portfolio</span>
              <a href={resume.portfolioUrl} target="_blank" rel="noreferrer" className="cta-underline text-[11px]">
                {resume.portfolioUrl} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}

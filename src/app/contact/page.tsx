import { getProfile, getResumeContent } from "@/lib/site-content";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function ContactPage() {
  const [profile, resume] = await Promise.all([
    getProfile(),
    getResumeContent(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <ScrollReveal>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Get in touch
        </h1>
        <p className="mt-4 text-[#555] leading-relaxed">
          I&apos;m looking for my next Product/UX Design role. If you think
          we&apos;d work well together, I&apos;d love to hear from you.
        </p>
      </ScrollReveal>

      <div className="mt-8 space-y-4">
        <ScrollReveal delay={0}>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] px-5 py-4 text-[#111] transition-colors hover:bg-[#f5f5f5]"
          >
            <span className="text-sm font-medium">Email</span>
            <span className="text-sm text-[#555]">{profile.email}</span>
          </a>
        </ScrollReveal>

        {profile.linkedin &&
          profile.linkedin !== "LinkedIn URL pending" && (
            <ScrollReveal delay={100}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] px-5 py-4 text-[#111] transition-colors hover:bg-[#f5f5f5]"
              >
                <span className="text-sm font-medium">LinkedIn</span>
                <span className="text-sm text-[#555]">View profile</span>
              </a>
            </ScrollReveal>
          )}

        {resume.portfolioUrl && (
          <ScrollReveal delay={200}>
            <a
              href={resume.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] px-5 py-4 text-[#111] transition-colors hover:bg-[#f5f5f5]"
            >
              <span className="text-sm font-medium">Portfolio</span>
              <span className="text-sm text-[#555]">
                {resume.portfolioUrl}
              </span>
            </a>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}

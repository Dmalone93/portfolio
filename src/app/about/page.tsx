import { getProfile, getResumeContent } from "@/lib/site-content";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function AboutPage() {
  const [profile, resume] = await Promise.all([
    getProfile(),
    getResumeContent(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <ScrollReveal>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          A bit about me
        </h1>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mt-8 space-y-4 text-[#555] leading-relaxed">
          <p>{profile.summary}</p>
          <p>{profile.mission}</p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mt-10">
          <h2 className="text-lg font-semibold">The basics</h2>
          <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[#888]">Role</dt>
              <dd className="font-medium">
                {profile.title} at {profile.company}
              </dd>
            </div>
            <div>
              <dt className="text-[#888]">Location</dt>
              <dd className="font-medium">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-[#888]">Email</dt>
              <dd>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-medium text-[#2563eb] hover:underline"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            {profile.linkedin &&
              profile.linkedin !== "LinkedIn URL pending" && (
                <div>
                  <dt className="text-[#888]">LinkedIn</dt>
                  <dd>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#2563eb] hover:underline"
                    >
                      LinkedIn
                    </a>
                  </dd>
                </div>
              )}
          </dl>
        </section>
      </ScrollReveal>

      {/* Skills from resume */}
      <ScrollReveal>
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {resume.skillSections.map((section, i) => (
              <ScrollReveal key={section.heading} delay={i * 80}>
                <div>
                  <h3 className="text-sm font-medium text-[#888]">
                    {section.heading}
                  </h3>
                  {section.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm text-[#555]">
                      {line.replace(/\*\*/g, "")}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

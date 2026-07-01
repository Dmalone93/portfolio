import Image from "next/image";
import { getProfile, getResumeContent } from "@/lib/site-content";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function AboutPage() {
  const [profile, resume] = await Promise.all([getProfile(), getResumeContent()]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      {/* Split layout */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Copy — left */}
        <div className="flex-1 lg:max-w-[60%]">
          <ScrollReveal>
            <p className="label-mono">ABOUT</p>
            <h1 className="mt-3 font-[family-name:var(--font-geist)] text-3xl sm:text-5xl tracking-tight">
              A bit about me
            </h1>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-10 space-y-6 text-[var(--text-muted)] leading-relaxed">
              <p>
                I&apos;m Declan — a product and UX designer based in Glasgow, currently leading UX at DFYNE.
              </p>
              <p>
                I started in fine art photography at the Glasgow School of Art, then moved into software through a full-stack development course at CodeClan. That crossover — visual composition meets engineering logic — shapes how I approach every design problem.
              </p>
              <p>
                I&apos;ve designed trading platforms at JP Morgan, margin analytics tools at OpenGamma, and ecommerce experiences at DFYNE and Toolstop. I care most about the intersection of design systems, data, and commercial outcomes.
              </p>
              <p>
                When I&apos;m not designing, I&apos;m probably reading about systems thinking or falling down a rabbit hole about ancient artifacts.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal>
            <div className="mt-12 flex flex-wrap gap-4">
              {[
                { value: "6+", label: "YEARS" },
                { value: "50+", label: "PROJECTS" },
                { value: "10", label: "PEOPLE HIRED" },
              ].map((stat) => (
                <div key={stat.label} className="border border-[var(--border)] rounded-lg px-5 py-4">
                  <p className="font-[family-name:var(--font-mono)] text-2xl font-light">{stat.value}</p>
                  <p className="label-mono mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal>
            <div className="mt-12">
              <p className="label-mono">THE BASICS</p>
              <dl className="mt-4 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="label-mono text-[10px]">Role</dt>
                  <dd className="mt-1 text-[var(--text)]">{profile.title} at {profile.company}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[10px]">Location</dt>
                  <dd className="mt-1 text-[var(--text)]">{profile.location}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[10px]">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${profile.email}`} className="cta-underline text-[11px]">{profile.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          {/* Skills */}
          <ScrollReveal>
            <div className="mt-12">
              <p className="label-mono">SKILLS</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {resume.skillSections.map((section) => (
                  <div key={section.heading}>
                    <h3 className="label-mono text-[10px] text-[var(--text-dim)]">{section.heading}</h3>
                    {section.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-[var(--text-muted)]">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Media — right (sticky) */}
        <div className="lg:w-[40%]">
          <div className="lg:sticky lg:top-24">
            <ScrollReveal>
              <Image
                src="/declan.png"
                alt="Declan Malone"
                width={560}
                height={700}
                className="object-cover"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

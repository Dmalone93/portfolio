import { getProfile, getResumeContent } from "@/lib/site-content";
import { renderResumeInlineText } from "@/components/resume-rich-text";
import { ResumePdfAction } from "@/components/resume-pdf-action";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function ResumePage() {
  const [profile, resume] = await Promise.all([getProfile(), getResumeContent()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <ScrollReveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-geist)] text-3xl sm:text-4xl tracking-tight">{profile.name}</h1>
            <p className="mt-1 label-mono">{resume.headline}</p>
          </div>
          {resume.pdfUrl && <ResumePdfAction pdfUrl={resume.pdfUrl} fileName={resume.pdfFileName} />}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
          {resume.contactLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <section className="mt-8">
          <p className="text-[var(--text-muted)] leading-relaxed">{renderResumeInlineText(resume.professionalSummary)}</p>
        </section>
      </ScrollReveal>

      <div className="mt-12 border-t border-[var(--border)]" />

      <ScrollReveal>
        <section className="mt-12">
          <p className="label-mono">EXPERIENCE</p>
          <div className="mt-6 space-y-10">
            {resume.experience.map((item) => (
              <div key={`${item.company}-${item.role}-${item.timeframe}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-[family-name:var(--font-geist)] text-xl">{item.role}</h3>
                  <span className="label-mono text-[10px]">{item.timeframe}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {item.company}
                  {item.website && (
                    <>
                      {" — "}
                      <a href={item.website} target="_blank" rel="noreferrer" className="cta-underline text-[11px] inline">
                        {item.website}
                      </a>
                    </>
                  )}
                </p>
                <ul className="mt-3 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {renderResumeInlineText(bullet)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="mt-12 border-t border-[var(--border)]" />

      <ScrollReveal>
        <section className="mt-12">
          <p className="label-mono">EDUCATION</p>
          <div className="mt-4 space-y-2">
            {resume.education.map((line) => (
              <p key={line} className="text-sm text-[var(--text-muted)]">{renderResumeInlineText(line)}</p>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="mt-12 border-t border-[var(--border)]" />

      <ScrollReveal>
        <section className="mt-12">
          <p className="label-mono">SKILLS</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {resume.skillSections.map((section) => (
              <div key={section.heading}>
                <h3 className="label-mono text-[10px] text-[var(--text-dim)]">{section.heading}</h3>
                {section.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-[var(--text-muted)]">{renderResumeInlineText(line)}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

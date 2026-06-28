import { getProfile, getResumeContent } from "@/lib/site-content";
import { renderResumeInlineText } from "@/components/resume-rich-text";
import { ResumePdfAction } from "@/components/resume-pdf-action";

export default async function ResumePage() {
  const [profile, resume] = await Promise.all([getProfile(), getResumeContent()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{profile.name}</h1>
          <p className="mt-1 text-[#555]">{resume.headline}</p>
        </div>
        {resume.pdfUrl && <ResumePdfAction pdfUrl={resume.pdfUrl} fileName={resume.pdfFileName} />}
      </div>

      {/* Contact */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#555]">
        {resume.contactLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      {/* Summary */}
      <section className="mt-8">
        <p className="text-[#555] leading-relaxed">{renderResumeInlineText(resume.professionalSummary)}</p>
      </section>

      {/* Experience */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Experience</h2>
        <div className="mt-4 space-y-8">
          {resume.experience.map((item) => (
            <div key={`${item.company}-${item.role}-${item.timeframe}`}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-medium">{item.role}</h3>
                <span className="text-sm text-[#888]">{item.timeframe}</span>
              </div>
              <p className="text-sm text-[#555]">
                {item.company}
                {item.website && (
                  <>
                    {" — "}
                    <a href={item.website} target="_blank" rel="noreferrer" className="text-[#2563eb] hover:underline">
                      {item.website}
                    </a>
                  </>
                )}
              </p>
              <ul className="mt-2 space-y-1.5">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-[#555] leading-relaxed">
                    {renderResumeInlineText(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Education</h2>
        <div className="mt-4 space-y-2">
          {resume.education.map((line) => (
            <p key={line} className="text-sm text-[#555]">{renderResumeInlineText(line)}</p>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Skills</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {resume.skillSections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-medium text-[#888]">{section.heading}</h3>
              {section.lines.map((line) => (
                <p key={line} className="mt-1 text-sm text-[#555]">{renderResumeInlineText(line)}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

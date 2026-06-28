import { defineQuery } from "next-sanity";

export const profileQuery = defineQuery(`*[_type == "profile"][0] {
  name,
  title,
  company,
  targetTitle,
  location,
  summary,
  mission,
  email,
  linkedin,
  resumeLabel
}`);

export const resumeQuery = defineQuery(`*[_id == "resume.main"][0] {
  headline,
  professionalSummary,
  contactLines,
  experience[] {
    company,
    role,
    timeframe,
    website,
    bullets
  },
  education,
  skillSections[] {
    heading,
    lines
  },
  portfolioUrl,
  "pdfUrl": pdfFile.asset->url,
  "pdfFileName": pdfFile.asset->originalFilename
}`);

export const projectsQuery = defineQuery(`*[_type == "project" && portfolioVisible == true] | order(coalesce(sortOrder, 9999) asc, _createdAt asc) {
  title,
  "slug": slug.current,
  company,
  sortOrder,
  portfolioVisible,
  eyebrow,
  summary,
  stats[]{
    _key,
    value,
    label,
    detail
  },
  challenge,
  whatChanged,
  impact,
  processSteps[]{
    _key,
    title,
    text
  },
  comparison{
    intro,
    before,
    after
  },
  liveUrl,
  embedMode,
  prototypeViewport,
  hasMobilePrototype,
  hasDesktopPrototype,
  previousVersionUrl,
  previousVersionLabel,
  previousVersionEmbedMode
}`);

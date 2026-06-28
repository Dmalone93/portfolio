import { profile as fallbackProfile } from "@/data/profile";
import {
  getProjectBySlug as getFallbackProjectBySlug,
  projects as fallbackProjects,
  type Project,
  type ProjectComparison,
  type ProjectProcessStep,
  type ProjectStat,
} from "@/data/projects";
import { resumeContent as fallbackResumeContent, type ResumeContent, type ResumeExperience, type ResumeSection } from "@/data/resume";
import { isSanityConfigured } from "@/sanity/env";
import { getSanityClient } from "@/sanity/lib/client";
import { profileQuery, projectsQuery, resumeQuery } from "@/sanity/lib/queries";

type Profile = typeof fallbackProfile;

function normalizeStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function normalizeProjectStats(value: unknown): ProjectStat[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((stat): stat is Record<string, unknown> => Boolean(stat) && typeof stat === "object")
    .map((stat, statIndex) => ({
      key: typeof stat._key === "string" ? stat._key : `stat-${statIndex + 1}`,
      value: typeof stat.value === "string" ? stat.value : "",
      label: typeof stat.label === "string" ? stat.label : "",
      detail: typeof stat.detail === "string" ? stat.detail : undefined,
    }))
    .filter((stat) => stat.value && stat.label);
}

function normalizeProjectProcessSteps(value: unknown): ProjectProcessStep[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((step): step is Record<string, unknown> => Boolean(step) && typeof step === "object")
    .map((step, stepIndex) => ({
      key: typeof step._key === "string" ? step._key : `process-${stepIndex + 1}`,
      title: typeof step.title === "string" ? step.title : "",
      text: typeof step.text === "string" ? step.text : "",
    }))
    .filter((step) => step.title && step.text);
}

function normalizeProjectComparison(value: unknown): ProjectComparison | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const before = normalizeStringArray(record.before);
  const after = normalizeStringArray(record.after);

  if (before.length === 0 || after.length === 0) {
    return undefined;
  }

  return {
    intro: typeof record.intro === "string" ? record.intro : undefined,
    before,
    after,
  };
}

function normalizePrototypeViewport(value: unknown) {
  if (value === "desktop") {
    return "desktop" as const;
  }

  if (value === "mobile") {
    return "mobile" as const;
  }

  return "mobile" as const;
}

function normalizePrototypeAvailability(value: unknown) {
  if (value === true) {
    return true;
  }

  if (value === false) {
    return false;
  }

  return undefined;
}

function mergeProjectsWithFallback(projects: Project[]) {
  const fallbackBySlug = new Map(fallbackProjects.map((project) => [project.slug, project]));
  const mergedBySlug = new Map<string, Project>();

  fallbackProjects.forEach((project) => {
    mergedBySlug.set(project.slug, project);
  });

  projects.forEach((project) => {
    const fallbackProject = fallbackBySlug.get(project.slug);

    mergedBySlug.set(project.slug, {
      ...(fallbackProject ?? {}),
      ...project,
      narrativeSections: project.narrativeSections ?? fallbackProject?.narrativeSections,
      stats: project.stats && project.stats.length > 0 ? project.stats : fallbackProject?.stats,
      challenge: project.challenge && project.challenge.length > 0 ? project.challenge : fallbackProject?.challenge,
      whatChanged: project.whatChanged && project.whatChanged.length > 0 ? project.whatChanged : fallbackProject?.whatChanged,
      impact: project.impact && project.impact.length > 0 ? project.impact : fallbackProject?.impact,
      processSteps: project.processSteps && project.processSteps.length > 0 ? project.processSteps : fallbackProject?.processSteps,
      comparison: project.comparison ?? fallbackProject?.comparison,
      hasMobilePrototype: project.hasMobilePrototype ?? fallbackProject?.hasMobilePrototype,
      hasDesktopPrototype: project.hasDesktopPrototype ?? fallbackProject?.hasDesktopPrototype,
    });
  });

  return [...mergedBySlug.values()].sort((left, right) => (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER));
}

function normalizeProfile(input: unknown): Profile {
  if (!input || typeof input !== "object") {
    return fallbackProfile;
  }

  const record = input as Record<string, unknown>;

  return {
    name: typeof record.name === "string" && record.name ? record.name : fallbackProfile.name,
    title: typeof record.title === "string" ? record.title : fallbackProfile.title,
    company: typeof record.company === "string" ? record.company : fallbackProfile.company,
    targetTitle: typeof record.targetTitle === "string" ? record.targetTitle : fallbackProfile.targetTitle,
    location: typeof record.location === "string" ? record.location : fallbackProfile.location,
    summary: typeof record.summary === "string" ? record.summary : fallbackProfile.summary,
    mission: typeof record.mission === "string" ? record.mission : fallbackProfile.mission,
    email: typeof record.email === "string" ? record.email : fallbackProfile.email,
    linkedin: typeof record.linkedin === "string" ? record.linkedin : fallbackProfile.linkedin,
    resumeLabel: typeof record.resumeLabel === "string" ? record.resumeLabel : fallbackProfile.resumeLabel,
  };
}

function normalizeProjects(input: unknown): Project[] {
  if (!Array.isArray(input)) {
    return fallbackProjects;
  }

  return mergeProjectsWithFallback(input
    .filter((project): project is Record<string, unknown> => Boolean(project) && typeof project === "object")
    .map((project, index) => {
      const slug = typeof project.slug === "string" && project.slug ? project.slug : `project-${index + 1}`;

      return {
        slug,
        title: typeof project.title === "string" ? project.title : `Project ${index + 1}`,
        company: typeof project.company === "string" ? project.company : "",
        sortOrder: typeof project.sortOrder === "number" ? project.sortOrder : undefined,
        portfolioVisible: project.portfolioVisible === true,
        eyebrow: typeof project.eyebrow === "string" ? project.eyebrow : undefined,
        summary: typeof project.summary === "string" ? project.summary : "",
        stats: normalizeProjectStats(project.stats),
        challenge: normalizeStringArray(project.challenge),
        whatChanged: normalizeStringArray(project.whatChanged),
        impact: normalizeStringArray(project.impact),
        processSteps: normalizeProjectProcessSteps(project.processSteps),
        comparison: normalizeProjectComparison(project.comparison),
        liveUrl: typeof project.liveUrl === "string" ? project.liveUrl : undefined,
        embedMode:
          project.embedMode === "external-only"
            ? ("external-only" as const)
            : project.embedMode === "iframe"
              ? ("iframe" as const)
              : undefined,
        prototypeViewport: normalizePrototypeViewport(project.prototypeViewport),
        hasMobilePrototype: normalizePrototypeAvailability(project.hasMobilePrototype),
        hasDesktopPrototype: normalizePrototypeAvailability(project.hasDesktopPrototype),
        previousVersionUrl: typeof project.previousVersionUrl === "string" ? project.previousVersionUrl : undefined,
        previousVersionLabel: typeof project.previousVersionLabel === "string" ? project.previousVersionLabel : undefined,
        previousVersionEmbedMode:
          project.previousVersionEmbedMode === "external-only"
            ? ("external-only" as const)
            : project.previousVersionEmbedMode === "iframe"
              ? ("iframe" as const)
              : undefined,
      };
    })
  );
}

function normalizeResumeExperience(input: unknown): ResumeExperience[] {
  if (!Array.isArray(input)) {
    return fallbackResumeContent.experience;
  }

  return input
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      company: typeof item.company === "string" ? item.company : "",
      role: typeof item.role === "string" ? item.role : "",
      timeframe: typeof item.timeframe === "string" ? item.timeframe : "",
      website: typeof item.website === "string" ? item.website : undefined,
      bullets: normalizeStringArray(item.bullets),
    }))
    .filter((item) => item.company || item.role || item.timeframe || item.bullets.length > 0);
}

function normalizeResumeSections(input: unknown): ResumeSection[] {
  if (!Array.isArray(input)) {
    return fallbackResumeContent.skillSections;
  }

  return input
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      heading: typeof item.heading === "string" ? item.heading : "",
      lines: normalizeStringArray(item.lines),
    }))
    .filter((item) => item.heading || item.lines.length > 0);
}

function normalizeResume(input: unknown): ResumeContent {
  if (!input || typeof input !== "object") {
    return fallbackResumeContent;
  }

  const record = input as Record<string, unknown>;

  return {
    headline: typeof record.headline === "string" && record.headline ? record.headline : fallbackResumeContent.headline,
    professionalSummary:
      typeof record.professionalSummary === "string" && record.professionalSummary
        ? record.professionalSummary
        : fallbackResumeContent.professionalSummary,
    contactLines: normalizeStringArray(record.contactLines).length > 0 ? normalizeStringArray(record.contactLines) : fallbackResumeContent.contactLines,
    experience: normalizeResumeExperience(record.experience),
    education: normalizeStringArray(record.education).length > 0 ? normalizeStringArray(record.education) : fallbackResumeContent.education,
    skillSections: normalizeResumeSections(record.skillSections),
    portfolioUrl: typeof record.portfolioUrl === "string" ? record.portfolioUrl : fallbackResumeContent.portfolioUrl,
    pdfUrl: typeof record.pdfUrl === "string" ? record.pdfUrl : fallbackResumeContent.pdfUrl,
    pdfFileName: typeof record.pdfFileName === "string" ? record.pdfFileName : fallbackResumeContent.pdfFileName,
  };
}

export async function getProfile() {
  if (!isSanityConfigured()) {
    return fallbackProfile;
  }

  try {
    const client = getSanityClient();
    if (!client) {
      return fallbackProfile;
    }

    const result = await client.fetch(profileQuery);
    return normalizeProfile(result);
  } catch {
    return fallbackProfile;
  }
}

export async function getProjects() {
  if (!isSanityConfigured()) {
    return fallbackProjects;
  }

  try {
    const client = getSanityClient();
    if (!client) {
      return fallbackProjects;
    }

    const result = await client.fetch(projectsQuery);
    return normalizeProjects(result);
  } catch {
    return fallbackProjects;
  }
}

export async function getResumeContent() {
  if (!isSanityConfigured()) {
    return fallbackResumeContent;
  }

  try {
    const client = getSanityClient();
    if (!client) {
      return fallbackResumeContent;
    }

    const result = await client.fetch(resumeQuery);
    return normalizeResume(result);
  } catch {
    return fallbackResumeContent;
  }
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) || getFallbackProjectBySlug(slug) || null;
}

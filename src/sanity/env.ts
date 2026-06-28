export const apiVersion = "2026-04-05";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bxtd47ya";
export const studioBasePath = "/studio";
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || studioBasePath;
export const sanityReadPerspective = process.env.NODE_ENV === "development" ? ("drafts" as const) : ("published" as const);
export const hasSanityProjectId = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export const hasSanityWriteToken = Boolean(process.env.SANITY_API_TOKEN);
export const hasInspirationOwnerKey = Boolean(process.env.INSPIRATION_OWNER_KEY);

export function isSanityConfigured() {
  return Boolean(hasSanityProjectId && dataset);
}

import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId, sanityReadPerspective } from "@/sanity/env";

export function getSanityClient() {
  if (!isSanityConfigured()) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_TOKEN,
    perspective: sanityReadPerspective,
    useCdn: false,
  });
}

export function getSanityWriteClient() {
  if (!isSanityConfigured() || !process.env.SANITY_API_TOKEN) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  });
}

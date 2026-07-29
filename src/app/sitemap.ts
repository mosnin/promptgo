import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getPromptsByCategory, prompts } from "@/lib/prompts";
import { absoluteUrl, site } from "@/lib/site";

/**
 * The date the legal and informational pages were last actually written. They
 * do not change when the catalogue does, so they carry a fixed date rather than
 * a build timestamp.
 */
const STATIC_PAGE_REVISION = "2026-07-01T00:00:00.000Z";

/** The most recent updated date across a set of prompts. */
function newestUpdate(list: { updated: string }[], fallback: string) {
  const timestamps = list
    .map((prompt) => new Date(prompt.updated).getTime())
    .filter((value) => Number.isFinite(value));

  if (timestamps.length === 0) return new Date(fallback);
  return new Date(Math.max(...timestamps));
}

/**
 * XML sitemap.
 *
 * Every lastmod here is derived from content, never from the clock at build
 * time. That distinction matters more than it looks: a build timestamp tells
 * Google that every listed page changed on every deploy, including the privacy
 * page. Google ignores lastmod once it finds the value unreliable, so a sitemap
 * that cries wolf on each deploy loses the signal for the pages that genuinely
 * did change.
 *
 * Listing pages inherit the newest update among the prompts they list, which is
 * exactly when their content actually changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const catalogueUpdated = newestUpdate(prompts, STATIC_PAGE_REVISION);
  const staticRevision = new Date(STATIC_PAGE_REVISION);

  const staticRoutes: MetadataRoute.Sitemap = [
    // site.url rather than absoluteUrl("/"), because absoluteUrl appends a
    // trailing slash and the home page's canonical tag has none. A sitemap
    // entry that disagrees with the canonical is a contradiction Google has to
    // resolve on its own, so the two are kept byte for byte identical.
    {
      url: site.url,
      lastModified: catalogueUpdated,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/explore"),
      lastModified: catalogueUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: staticRevision,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: staticRevision,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: staticRevision,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/${category.slug}`),
    lastModified: newestUpdate(getPromptsByCategory(category.slug), STATIC_PAGE_REVISION),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const toolRoutes: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: absoluteUrl(prompt.href),
    lastModified: new Date(prompt.updated),
    changeFrequency: "monthly",
    priority: prompt.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}

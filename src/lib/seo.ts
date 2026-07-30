import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** ISO date, surfaced as article:modified_time for freshness signals. */
  updated?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  /**
   * Route segment with its own generated opengraph-image.tsx, e.g. a prompt
   * page passing its own href so the per-prompt social card is actually
   * used. Without this, every route fell back to the single site-wide
   * image, silently shadowing the file-convention image Next.js generates
   * per route: setting openGraph.images explicitly here overrides the
   * automatic per-segment image, so a route with its own opengraph-image.tsx
   * has to say so or its build-time image is generated and never linked to.
   */
  ogImagePath?: string;
}

/**
 * Central metadata builder. Every route uses this so canonical URLs, OpenGraph
 * images and Twitter cards can never drift apart between page types.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  updated,
  type = "website",
  noIndex = false,
  ogImagePath,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(`${ogImagePath ?? ""}/opengraph-image`);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(updated ? { modifiedTime: new Date(updated).toISOString() } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: site.twitter,
      creator: site.twitter,
      images: [ogImage],
    },
  };
}

/** Rough word count used by the SEO auditor and the reading time badge. */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingTime(words: number): number {
  return Math.max(1, Math.round(words / 225));
}

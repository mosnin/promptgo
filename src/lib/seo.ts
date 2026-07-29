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
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(`/opengraph-image`);

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

/**
 * Keyword density as a percentage of total words. Phrase matching is done on a
 * normalised string so punctuation and casing do not skew the result.
 */
export function keywordDensity(text: string, keyword: string): number {
  const normalised = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ");
  const target = keyword.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!target) return 0;

  const totalWords = normalised.split(" ").filter(Boolean).length;
  if (totalWords === 0) return 0;

  const keywordWords = target.split(" ").length;
  let matches = 0;
  let index = normalised.indexOf(target);
  while (index !== -1) {
    matches += 1;
    index = normalised.indexOf(target, index + target.length);
  }

  return (matches * keywordWords * 100) / totalWords;
}

export function readingTime(words: number): number {
  return Math.max(1, Math.round(words / 225));
}

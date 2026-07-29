/**
 * Global site configuration. Every SEO surface reads from here so that domain,
 * brand name and social handles change in exactly one place.
 */

export const site = {
  name: "Convert Filez",
  legalName: "Convert Filez",
  /**
   * Used for canonical URLs, sitemap, OpenGraph and JSON-LD. Must match the
   * domain the site actually serves from: a canonical pointing at a domain you
   * do not serve tells Google the real pages are duplicates of somewhere else,
   * which is the one SEO mistake that can keep a whole site out of the index.
   */
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.convertfilez.org"),
  tagline: "Free Online File Conversion And Asset Tools",
  description:
    "Convert, compress and transform files directly in your browser. 120+ free online file conversion tools that run client side with no uploads, no signup and no file size limits.",
  locale: "en_US",
  language: "en",
  twitter: "@convertfilez",
  themeColor: "#08090c",
  founded: "2026",
} as const;

function normalizeUrl(value: string) {
  const withProtocol = value.startsWith("http") ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * AdSense is opt in. When the publisher id is absent every ad slot renders
 * nothing at all, which keeps the layout clean during development and avoids
 * shipping empty ad containers to production.
 */
export const adsense = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  get enabled() {
    return this.client.length > 0;
  },
  slots: {
    /** Above the fold, directly under the tool heading. */
    toolTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP ?? "",
    /** The highest value placement: beside the processing and download panel. */
    toolProcessing: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_PROCESSING ?? "",
    /** Between the tool interface and the long form article. */
    toolMid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_MID ?? "",
    /** Inside the article, after the first two sections. */
    article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? "",
    /** Under the FAQ, before the related tools cluster. */
    toolFooter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_FOOTER ?? "",
    /** Category and explore listing pages. */
    listing: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LISTING ?? "",
    /** Home page mid scroll. */
    home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
    /** Search results. */
    search: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SEARCH ?? "",
  },
} as const;

/**
 * The GA4 property for this site.
 *
 * Checked in as the default rather than left to an environment variable alone.
 * NEXT_PUBLIC_ values are inlined at build time, not read at runtime, so an
 * unset variable in the deployment environment does not degrade to "no
 * analytics for this request", it bakes a build with no tag in it at all. That
 * failure is silent and only shows up as flat traffic days later.
 *
 * The environment variable still wins when present, which is what preview and
 * staging deployments use to report into a separate property.
 */
const GA_MEASUREMENT_ID = "G-3JYZQ7NNJ1";

export const analytics = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || GA_MEASUREMENT_ID,
  get enabled() {
    return this.gaId.length > 0;
  },
} as const;

/**
 * Search Console site ownership. Only the token is needed here, not the whole
 * meta tag: Next renders the tag itself from the metadata export. Left blank
 * the tag is simply omitted.
 */
export const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
} as const;

export type AdSlotName = keyof typeof adsense.slots;

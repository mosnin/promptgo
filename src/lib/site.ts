/**
 * Global site configuration. Every SEO surface reads from here so that domain,
 * brand name and social handles change in exactly one place.
 */

export const site = {
  name: "Fast Prompts",
  legalName: "Cool Digital Tools LLC",
  /** Named individual responsible for the directory. Rendered in Organization schema and on the about page. */
  founder: "Jerico Herrera",
  /** Contact address. Assembled at render on the contact page so it is not sitting in the markup as a mailto. */
  email: "help@fastprompts.org",
  /**
   * Used for canonical URLs, sitemap, OpenGraph and JSON-LD. Must match the
   * domain the site actually serves from: a canonical pointing at a domain you
   * do not serve tells Google the real pages are duplicates of somewhere else,
   * which is the one SEO mistake that can keep a whole site out of the index.
   */
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "https://fastprompts.org"),
  tagline: "148 Free AI Prompts, Tested And Ready To Use",
  description:
    "A directory of 148 free AI prompts for ChatGPT, Claude and Gemini, organised by job function. Every prompt is tested on real output before it is published, with no signup required to copy one.",
  locale: "en_US",
  language: "en",
  twitter: "@fastprompts",
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
    /** Above the fold, directly under the prompt heading. */
    promptTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PROMPT_TOP ?? "",
    /** Beside the copy ready prompt panel, the highest value placement. */
    promptPanel: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PROMPT_PANEL ?? "",
    /** Between the prompt panel and the long form article. */
    promptMid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PROMPT_MID ?? "",
    /** Inside the article, after the first two sections. */
    article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? "",
    /** Under the FAQ, before the related prompts cluster. */
    promptFooter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PROMPT_FOOTER ?? "",
    /** Category and explore listing pages. */
    listing: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LISTING ?? "",
    /** Home page mid scroll. */
    home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
    /** Search results. */
    search: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SEARCH ?? "",
  },
} as const;

/**
 * The GA4 property for this site. Left blank on purpose: the ID checked into
 * the repo this was ported from belongs to that site's own property, and
 * baking someone else's measurement ID in here would send this site's traffic
 * into their analytics. Set NEXT_PUBLIC_GA_ID in the deployment environment
 * before launch.
 */
export const analytics = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
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

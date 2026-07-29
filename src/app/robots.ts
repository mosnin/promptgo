import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Search result pages carry no unique value and would otherwise create
        // an unbounded crawl space from every query permutation.
        disallow: ["/search"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // No host directive. It is not part of the robots.txt standard, Google and
    // Bing both ignore it, and Next renders it as a full URL with a trailing
    // slash, which is not the bare hostname the one crawler that does read it
    // expects. Canonical tags carry this now.
  };
}

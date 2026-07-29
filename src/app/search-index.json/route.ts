import { buildSearchIndex } from "@/lib/search";

export const dynamic = "force-static";

/**
 * Static JSON index fetched on demand by the command palette. Emitting it as a
 * route rather than importing it into a client component keeps the full tool
 * registry, including every article body, out of the JavaScript bundle.
 */
export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: {
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

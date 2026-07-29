import { adsense } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Authorised Digital Sellers. AdSense will not serve on a domain that does not
 * declare its publisher id here, so this file is a hard requirement for revenue
 * rather than an optional extra.
 *
 * It is emitted as a route rather than a static public file because the
 * publisher id lives in an environment variable. When AdSense is not connected
 * we return 404, which is what Google expects from a site that has not enrolled
 * yet, and is better than publishing a file containing a placeholder id.
 *
 * f08c47fec0942fa0 is Google's own fixed certification authority id and is the
 * same for every AdSense publisher.
 */
export function GET() {
  if (!adsense.enabled) {
    return new Response("Not found", { status: 404 });
  }

  const publisherId = adsense.client.replace(/^ca-/, "");
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

import { Suspense } from "react";
import { analytics } from "@/lib/site";
import { GaPageViews } from "./GaPageViews";

/**
 * The Google tag itself. Must be rendered inside <head>.
 *
 * These are deliberately plain script elements rather than next/script. With
 * strategy="afterInteractive" Next emits only a <link rel="preload"> into the
 * server HTML and injects the real <script> after hydration, so the served
 * markup never contains a gtag.js script tag. Google's tag detector fetches the
 * page and looks for that tag, finds a preload hint instead, and reports the
 * tag as missing even though it loads perfectly well in a real browser.
 *
 * Rendering the snippet verbatim, the way Google documents it, costs nothing
 * here: the script is async, so it does not block parsing or first paint.
 *
 * The inline bootstrap runs in document order, before hydration, so anything
 * reporting through lib/track.ts early queues on dataLayer instead of being
 * dropped.
 */
export function GoogleAnalyticsTag() {
  if (!analytics.enabled) return null;

  const bootstrap = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${analytics.gaId}',{send_page_view:false,anonymize_ip:true});`;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaId}`}
      />
      <script id="ga-bootstrap" dangerouslySetInnerHTML={{ __html: bootstrap }} />
    </>
  );
}

/**
 * Page view reporting for client side navigation. Rendered in the body.
 *
 * send_page_view is off in the config call above and page views are fired here
 * instead. GA4 only counts one page view per script load, which under the App
 * Router would mean a single hit for an entire session of browsing.
 */
export function GoogleAnalyticsRouteTracking() {
  if (!analytics.enabled) return null;

  return (
    // useSearchParams needs a boundary or it opts every static page into
    // dynamic rendering at build time.
    <Suspense fallback={null}>
      <GaPageViews gaId={analytics.gaId} />
    </Suspense>
  );
}

import Script from "next/script";
import { adsense } from "@/lib/site";

/**
 * Loads the AdSense library once per document, and only when a publisher id is
 * configured. Rendered from the root layout so every route inherits it.
 */
export function AdSenseScript() {
  if (!adsense.enabled) return null;

  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`}
    />
  );
}

/** Verification meta tag required while an AdSense account is under review. */
export function AdSenseMeta() {
  if (!adsense.enabled) return null;
  return <meta name="google-adsense-account" content={adsense.client} />;
}

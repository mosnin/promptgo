import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { AdSenseMeta, AdSenseScript } from "@/components/ads/AdSenseScript";
import {
  GoogleAnalyticsRouteTracking,
  GoogleAnalyticsTag,
} from "@/components/analytics/GoogleAnalytics";
import { graph, organizationSchema, websiteSchema } from "@/lib/jsonld";
import { site, verification } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  // Next omits the tag entirely when the token is blank, so an unconfigured
  // install ships no empty verification meta.
  verification: {
    google: verification.google || undefined,
    other: verification.bing ? { "msvalidate.01": verification.bing } : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101116" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};

/**
 * Applied before first paint so a stored light preference never flashes dark.
 * Kept deliberately tiny and dependency free.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={site.language}
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* The Google tag goes in the head, as a real script element, so that
            it is present in the served HTML for tag detection. */}
        <GoogleAnalyticsTag />
        <AdSenseMeta />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: graph([organizationSchema(), websiteSchema()]),
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-signal-ink"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <Header />
        <main id="main" className="pt-16">
          {children}
        </main>
        <Footer />

        <AdSenseScript />
        <GoogleAnalyticsRouteTracking />
      </body>
    </html>
  );
}

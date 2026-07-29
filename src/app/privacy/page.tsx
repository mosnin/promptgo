import type { Metadata } from "next";
import { ProsePage } from "@/components/site/ProsePage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Convert Filez handles your data. Files are processed entirely in your browser and never uploaded. This policy covers analytics, advertising and cookies.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ProsePage
      title="Privacy Policy"
      path="/privacy"
      updated="28 July 2026"
      intro={`How ${site.name} handles data. The short version is that the files you convert never leave your device, and the only data we collect is anonymous usage measurement.`}
    >
      <h2>Files you process</h2>
      <p>
        Every prompt on this site runs as JavaScript inside your own browser. When you select a
        file it is read from your disk into the memory of the browser tab, transformed there and
        written back out as a download. The file is never transmitted to us, never written to a
        server and never stored. Closing the tab discards it entirely.
      </p>
      <p>
        You can verify this yourself. Open the network panel in your browser developer prompts,
        run any conversion, and observe that no request carrying your file is made.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics 4 to understand which prompts are used and where visitors come
        from. It records anonymised page views, approximate location at country level, device
        type and referrer. IP anonymisation is enabled. We do not collect names, email
        addresses or any personally identifying information, and we do not attempt to link
        sessions to individuals.
      </p>
      <p>
        Prompt interaction events are recorded in aggregate form, for example that a conversion
        completed on a given prompt page. These events never include file names, file contents or
        any data derived from your files.
      </p>

      <h2>Advertising and cookies</h2>
      <p>
        This site is funded by display advertising served through Google AdSense. Google and its
        partners may use cookies or similar technologies to serve ads based on your prior visits
        to this and other websites. Google&apos;s use of advertising cookies enables it and its
        partners to serve ads based on your visit to this site.
      </p>
      <p>
        You can opt out of personalised advertising by visiting Google Ads Settings, and you can
        opt out of third party vendor cookies for personalised advertising at
        aboutads.info. Where required by law, a consent prompt is shown before any advertising
        cookie is set.
      </p>

      <h2>Local storage</h2>
      <p>
        We store one preference in your browser: your chosen colour theme. It is kept in local
        storage, it never leaves your device and it is not readable by any third party.
      </p>

      <h2>Data we do not have</h2>
      <p>
        Because there is no account system, we hold no user records. We do not have your name,
        email address, password, payment details or file history, because none of those things
        are ever collected.
      </p>

      <h2>Children</h2>
      <p>
        This site is a general purpose utility and is not directed at children under 13. We do
        not knowingly collect information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes materially, the updated date at the top of this page will change
        and the revised policy will be published here. Continued use of the site after a change
        constitutes acceptance of the revised policy.
      </p>
    </ProsePage>
  );
}

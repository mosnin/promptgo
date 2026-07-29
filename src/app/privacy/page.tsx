import type { Metadata } from "next";
import { ProsePage } from "@/components/site/ProsePage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How PromptGo handles your data. Anything you type into a prompt panel stays in your browser. This policy covers analytics, advertising and cookies.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ProsePage
      title="Privacy Policy"
      path="/privacy"
      updated="28 July 2026"
      intro={`How ${site.name} handles data. The short version is that anything you type into a prompt panel stays in your browser, and the only data we collect is anonymous usage measurement.`}
    >
      <h2>What you type into a prompt</h2>
      <p>
        Every prompt page has fill in fields for its variables. Those values are held in the
        memory of your own browser tab and are used only to assemble the finished prompt shown
        beside them. They are never transmitted to us, never written to a server and never
        stored. Closing the tab discards them entirely.
      </p>
      <p>
        This matters more than it might sound, because people routinely put unreleased copy,
        client names, salary figures and internal numbers into those fields. You can verify the
        claim yourself: open the network panel in your browser developer tools, fill in a prompt,
        and observe that no request carrying your input is made.
      </p>
      <p>
        What you do afterwards with the copied prompt is between you and whichever AI assistant
        you paste it into. That service has its own privacy policy and its own retention rules,
        and this policy does not cover it.
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
        completed on a given prompt page. These events never include the values you type into a prompt panel or
        any data derived from what you type into a prompt.
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
        email address, password, payment details or prompt history, because none of those things
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

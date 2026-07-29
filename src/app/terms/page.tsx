import type { Metadata } from "next";
import { ProsePage } from "@/components/site/ProsePage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms Of Use",
  description:
    "The terms that govern use of Convert Filez. Free to use, no account required, output files belong to you, and the service is provided without warranty.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ProsePage
      title="Terms Of Use"
      path="/terms"
      updated="28 July 2026"
      intro={`The terms that govern your use of ${site.name}. They are short because the service is simple: free prompts, no account, and the files you produce are yours.`}
    >
      <h2>Using the service</h2>
      <p>
        The prompts on this site are provided free of charge for personal and commercial use. No
        account is required and no licence fee applies. You may use the output files however you
        wish, including in commercial work. We claim no rights over anything you process.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to use the site to process material you have no legal right to process,
        and not to attempt to disrupt the site or the experience of other visitors. Because
        processing happens on your own device, you remain solely responsible for the content of
        the files you handle.
      </p>

      <h2>No warranty</h2>
      <p>
        The prompts are provided as is, without warranty of any kind, express or implied. While
        each prompt is tested against real files, no software is defect free. Always keep an
        original copy of any file that matters before transforming it.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any loss of data, loss of
        profit or other damages arising from use of this site. Since files are processed locally
        and never transmitted, the practical risk is limited to the file you chose to process on
        your own machine.
      </p>

      <h2>Advertising</h2>
      <p>
        The site is supported by display advertising. We do not control the content of third
        party advertisements and do not endorse advertised products or services.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated from time to time. The updated date at the top of this page
        reflects the most recent revision.
      </p>
    </ProsePage>
  );
}

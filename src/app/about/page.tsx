import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CatalogueChart } from "@/components/home/CatalogueChart";
import { ProofBand } from "@/components/home/ProofBand";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { totalToolCount } from "@/lib/tools";
import { catalogueStats, categoryVolumes } from "@/lib/stats";
import { breadcrumbSchema, graph } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  // Not "About Convert Filez": buildMetadata appends the site name as a
  // template, so naming the brand here renders "About Convert Filez | Convert
  // Filez" in the tab and in every search result.
  title: "About",
  description:
    "About Convert Filez, a collection of 120+ free file conversion tools that run entirely in your browser with no uploads, no signup and no file size limits.",
  path: "/about",
  keywords: ["about convert filez", "browser based file tools", "client side file conversion"],
});

const STORY = [
  {
    heading: "The problem is the upload",
    body: [
      `Almost every online converter works the same way. You hand it your file, it travels to a machine you know nothing about, something happens there, and a result travels back. That round trip is where all of the friction lives: the wait before the work starts, the queue behind other people's jobs, the file size cap that exists because compute costs the operator money, and the copy of your document now sitting on somebody else's disk.`,
      `None of it is necessary. Browsers have been able to decode images, parse documents, hash data and encode media natively for years. The server pipeline persists because it is the easier thing to build, not because it is the better thing to use.`,
    ],
  },
  {
    heading: "So the file never moves",
    body: [
      `Every tool here reads your file directly into browser memory, does the work on your own processor, and hands back a download. There is no upload step to wait through, no queue to sit in, and no ceiling imposed by us, because the only resource being spent is the one already in front of you.`,
      `The consequence worth stating plainly is the privacy one. Your file is not protected here by a policy document or a retention schedule or a promise about what we do not look at. It is protected because it never reaches us. That is a property of how the tools are built rather than a commitment we are asking you to trust, and you can verify it in about ten seconds by opening your browser's network panel while you convert something.`,
    ],
  },
  {
    heading: "What that pays for and what it costs",
    body: [
      `Serving ${totalToolCount} static pages costs close to nothing, and the conversions themselves cost nothing at all, because we are not the ones running them. Display advertising covers the difference. There is no premium tier, no data sale, no newsletter quietly harvesting addresses and no account to create, because none of those are needed to keep the lights on.`,
      `The honest trade is that a tool has to fit in a browser tab. A conversion that needs a heavy native codec, or a file larger than your device memory, is a job for desktop software, and the pages here say so rather than failing halfway through.`,
    ],
  },
];

export default function AboutPage() {
  const volumes = categoryVolumes();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([breadcrumbSchema(crumbs)]) }}
      />

      {/* ---- Hero ---------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden />
        <div className="glow pointer-events-none absolute inset-x-0 -top-40 h-[32rem]" aria-hidden />

        <div className="shell relative py-20 sm:py-24">
          <Reveal blur={false}>
            <div className="flex items-center gap-2 text-[0.8125rem] text-ink-subtle">
              <Icon name="spark" size={15} />
              <span>About {site.name}</span>
            </div>
          </Reveal>

          <TextReveal
            as="h1"
            className="mt-4 max-w-4xl text-[2.5rem] font-medium leading-[0.95] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl"
            text="The file never leaves your machine."
            highlight={["never"]}
            delay={0.08}
          />

          <Reveal delay={0.3} className="mt-6 max-w-2xl">
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
              {totalToolCount} file conversion and asset tools that do their work inside your
              browser rather than on somebody else&apos;s server. No account, no upload, no
              queue and no file size cap.
            </p>
          </Reveal>

          <Reveal delay={0.42} className="mt-8">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/explore" size="lg">
                Explore all {totalToolCount} tools
                <Icon name="arrow-right" size={16} />
              </ButtonLink>
              <ButtonLink href="/privacy" size="lg" variant="outline">
                Read the privacy policy
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- The numbers --------------------------------------------------- */}
      <section className="shell py-14 sm:py-16">
        <ProofBand
          stats={[
            {
              value: "0",
              label: "bytes uploaded",
              tone: "signal",
              span: true,
              body: `Not a rounded figure. There is no upload path in any of the ${catalogueStats.tools} tools, so the number of bytes that reach a server is exactly zero. The network panel in your browser will confirm it.`,
            },
            {
              value: String(catalogueStats.tools),
              label: "working tools",
              body: `Across ${catalogueStats.categories} categories, reading ${catalogueStats.inputFormats} input formats.`,
            },
          ]}
        />
      </section>

      <HowItWorks />

      {/* ---- Story --------------------------------------------------------- */}
      <section className="shell pb-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <h2 className="text-[1.75rem] font-medium tracking-[-0.035em] text-ink sm:text-[2rem]">
                Why it is built this way
              </h2>
            </Reveal>
          </div>

          <div className="max-w-2xl">
            {STORY.map((section, index) => (
              <Reveal key={section.heading} delay={index * 0.05} className="mt-10 first:mt-0">
                <h3 className="text-[1.125rem] font-medium tracking-[-0.02em] text-ink">
                  {section.heading}
                </h3>
                {section.body.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="mt-3 text-[0.9375rem] leading-relaxed text-ink-subtle"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Catalogue shape ------------------------------------------------ */}
      <section className="shell py-14 sm:py-16">
        <Reveal>
          <CatalogueChart volumes={volumes} total={catalogueStats.tools} />
        </Reveal>
      </section>

      {/* ---- Corrections ---------------------------------------------------- */}
      <section className="shell pb-20">
        <Reveal>
          <div className="grid gap-8 rounded-xl border border-hairline bg-surface-2/30 p-7 sm:p-9 lg:grid-cols-2">
            <div>
              <h2 className="text-[1.25rem] font-medium tracking-[-0.025em] text-ink">
                Accuracy and corrections
              </h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-subtle">
                Every tool page documents which formats it accepts, what it produces and where
                browser support is uneven. Where a browser cannot do something natively the page
                says so before you select a file, rather than failing halfway through. If a tool
                gives a result you believe is wrong, its page names the specification it follows.
              </p>
            </div>
            <div>
              <h2 className="text-[1.25rem] font-medium tracking-[-0.025em] text-ink">
                Where to start
              </h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-subtle">
                The <Link href="/explore" className="text-signal-bright underline underline-offset-2">explore page</Link>{" "}
                lists every tool grouped by category. If you already know what you need, the search
                box in the header opens with command K and matches on tool name, file format or
                task.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

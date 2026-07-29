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
import { totalPromptCount } from "@/lib/prompts";
import { catalogueStats, categoryVolumes } from "@/lib/stats";
import { breadcrumbSchema, graph } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  // Not "About Fast Prompts": buildMetadata appends the site name as a
  // template, so naming the brand here would render "About Fast Prompts |
  // Fast Prompts" in the tab and in every search result.
  title: "About",
  description:
    "About Fast Prompts, a directory of free AI prompts organised by job function, where every prompt is tested against current models before it is published.",
  path: "/about",
  keywords: ["about fast prompts", "how prompts are tested", "ai prompt directory"],
});

const STORY = [
  {
    heading: "The problem is that most prompt lists are untested",
    body: [
      `A prompt directory is easy to produce badly. Ask a model to write fifty prompts about marketing and it will, fluently, and every one will read plausibly because plausibility is what a language model is best at. Nobody runs them. Nobody finds out that the cold email prompt cheerfully writes from a company name alone, or that the analysis prompt invents a statistic when the word count needs filling.`,
      `The result is a genre of content that looks like help and functions as filler. You paste one in, get something generic back, and conclude the model is not very good at your job, when the actual fault was a prompt that gave it nothing to work with.`,
    ],
  },
  {
    heading: "So every prompt is run before it is published",
    body: [
      `Each page names the models it was tested against and states what the first version got wrong. That section is not decoration. It is where you learn that Gemini needed the word STOP in capitals before it would decline rather than apologise and comply, or that requiring a visible arithmetic step was the only thing that stopped a walk away number being invented.`,
      `A consequence worth stating plainly is that several of these prompts refuse to help you. Given a company name and no research, one of them stops and asks for something real. Given no evidence for a claim, another marks the gap rather than filling it. Those refusals are the most valuable behaviour in the catalogue and the hardest thing to get a model to do reliably.`,
    ],
  },
  {
    heading: "How the directory is organised, and why",
    body: [
      `Categories are job functions rather than task types, because that is how people search and because it produces categories that do not compete with each other. Task type still matters for browsing, so it exists as a filter on each category page rather than as a second address for the same prompt, which would split the signal for no gain.`,
      `Serving ${totalPromptCount} static pages costs close to nothing and display advertising covers it. There is no premium tier, no data sale, no newsletter harvesting addresses and no account to create, because none of those are needed and each would put something between you and a copy button.`,
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
              {totalPromptCount} AI prompts organised by the job you are doing, each run against
              current models before it was published. Every page tells you what the prompt got
              wrong in testing and where it still needs a human.
            </p>
          </Reveal>

          <Reveal delay={0.42} className="mt-8">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/explore" size="lg">
                Explore all {totalPromptCount} prompts
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
              body: `Not a target. There is no account system behind any of the ${catalogueStats.prompts} prompts, no email wall and no metered usage, so the number of signups between you and a finished prompt is exactly zero.`,
            },
            {
              value: String(catalogueStats.prompts),
              label: "working prompts",
              body: `Across ${catalogueStats.categories} job function categories, spanning ${catalogueStats.taskTypes} kinds of task.`,
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
          <CatalogueChart volumes={volumes} total={catalogueStats.prompts} />
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
                Every prompt page documents which formats it accepts, what it produces and where
                browser support is uneven. Where a browser cannot do something natively the page
                says so before you select a file, rather than failing halfway through. If a prompt
                gives a result you believe is wrong, its page names the specification it follows.
              </p>
            </div>
            <div>
              <h2 className="text-[1.25rem] font-medium tracking-[-0.025em] text-ink">
                Where to start
              </h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-subtle">
                The <Link href="/explore" className="text-signal-bright underline underline-offset-2">explore page</Link>{" "}
                lists every prompt grouped by category. If you already know what you need, the search
                box in the header opens with command K and matches on prompt name, file format or
                task.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

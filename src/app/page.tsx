import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";
import { HeroFrame } from "@/components/site/HeroFrame";
import { ToolMarquee } from "@/components/home/ToolMarquee";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CatalogueChart } from "@/components/home/CatalogueChart";
import { ProofBand, ProofHeading } from "@/components/home/ProofBand";
import { AudienceProof } from "@/components/home/AudienceProof";
import { VerifyStack } from "@/components/home/VerifyStack";
import { HowItWorks } from "@/components/home/HowItWorks";
import { getCategory } from "@/lib/categories";
import { catalogueStats, categoryVolumes } from "@/lib/stats";
import { FaqAccordion } from "@/components/prompt/FaqAccordion";
import { categoriesWithPrompts, getFeaturedPrompts, totalPromptCount } from "@/lib/prompts";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, graph } from "@/lib/jsonld";
import { site } from "@/lib/site";

const PRIMARY_KEYWORD = "free online file conversion prompts";

export const metadata: Metadata = buildMetadata({
  title: "Free Online File Conversion Prompts: 120+ Browser Based Prompts",
  description:
    "Free online file conversion prompts that run in your browser. Convert images, PDFs, code, data and media with no uploads, no signup and no file size limits.",
  path: "/",
  keywords: [
    PRIMARY_KEYWORD,
    "online file converter",
    "convert files online free",
    "browser based file prompts",
    "client side file conversion",
  ],
});

const homeFaq = [
  {
    question: "Are these free online file conversion prompts genuinely free?",
    answer:
      "Yes. There is no account, no trial period, no credit card and no daily conversion cap. The prompts run as JavaScript in your own browser, so we do not pay for the compute and have no reason to meter it. The site is supported by display advertising alone.",
  },
  {
    question: "Do my files get uploaded anywhere?",
    answer:
      "No. Every prompt reads your file directly from disk into browser memory, does the work locally and hands back a download. Nothing is sent over the network, nothing is written to a server and nothing survives closing the tab. You can confirm this by opening the network panel in developer prompts while you convert a file.",
  },
  {
    question: "Is there a maximum file size?",
    answer:
      "We do not impose one. The real ceiling is your own device memory, since the file has to fit in the browser tab while it is processed. In practice most laptops handle files of several hundred megabytes comfortably, and mobile devices handle less.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. There is no extension, no desktop app and no plugin. Open the prompt page, choose a file and download the result. Everything needed is already part of a modern browser.",
  },
  {
    question: "Which file formats can I convert between?",
    answer:
      `The catalogue covers ${totalPromptCount} prompts across images, PDF and documents, code, text, structured data, audio and video, colour, encoding and technical SEO. Each prompt page states exactly which input formats it accepts and what it produces.`,
  },
  {
    question: "Can I use the output commercially?",
    answer:
      "Yes. The files you produce are yours. No watermark is applied, no rights are claimed and no attribution is required.",
  },
];

export default function HomePage() {
  const featured = getFeaturedPrompts(18);

  // Compact payloads for the client components. The full registry carries every
  // article body, so only the fields the marquee and the showcase actually
  // render cross the boundary.
  const marqueeTools = featured.map((prompt) => {
    const category = getCategory(prompt.category);
    return {
      name: prompt.name,
      href: prompt.href,
      summary: prompt.summary,
      category: category?.name ?? "Prompts",
      accent: category?.accent ?? "var(--color-signal)",
    };
  });

  const volumes = categoryVolumes();

  const showcase = categoriesWithPrompts.map((category) => ({
    slug: category.slug,
    name: category.name,
    icon: category.icon,
    accent: category.accent,
    intro: category.intro,
    count: category.prompts.length,
    prompts: category.prompts.map((prompt) => ({ name: prompt.name, href: prompt.href })),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph([faqSchema(homeFaq, "/")]) }}
      />

      {/* ---- Hero ---------------------------------------------------------- */}
      <HeroFrame>
        <div className="shell relative py-20 text-center sm:py-28 lg:py-32">
          <Reveal blur={false}>
            <Badge tone="signal">
              <Icon name="spark" size={11} />
              {totalPromptCount} prompts. Zero uploads.
            </Badge>
          </Reveal>

          <TextReveal
            as="h1"
            className="display mx-auto mt-7 max-w-5xl text-ink"
            text="Free online file conversion prompts that run in your browser"
            highlight={["browser"]}
            delay={0.1}
          />

          <Reveal delay={0.35} className="mx-auto mt-7 max-w-2xl">
            <p className="text-[1.125rem] leading-relaxed text-ink-muted">
              Convert images, compress PDFs, minify code, reshape data and transform media
              without uploading a single byte. Every one of these {PRIMARY_KEYWORD} does its
              work locally, so your files stay on your machine and results appear instantly.
            </p>
          </Reveal>

          <Reveal delay={0.45} className="mt-9">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/explore" size="lg">
                Explore all {totalPromptCount} prompts
                <Icon name="arrow-right" size={16} />
              </ButtonLink>
              <ButtonLink href="/image-conversion" size="lg" variant="outline">
                Start with images
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.55} className="mt-14">
            <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-4">
              {[
                { value: `${totalPromptCount}`, label: "Working prompts" },
                { value: "10", label: "Categories" },
                { value: "0", label: "Bytes uploaded" },
                { value: "$0", label: "Cost to use" },
              ].map((stat) => (
                <div key={stat.label} className="bg-canvas px-5 py-5">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-ink tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </HeroFrame>

      {/* ---- Featured ------------------------------------------------------ */}
      {featured.length > 0 && (
        <section className="pt-16 sm:pt-20">
          <div className="shell">
            <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Most used</p>
                <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2rem]">
                  Start with the popular ones
                </h2>
              </div>
              <Link
                href="/explore"
                className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-signal-bright"
              >
                Browse everything
                <Icon
                  name="arrow-right"
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            </Reveal>
          </div>

          {/* Full bleed. The transport reads as a belt running past the page
              rather than a widget sitting inside it, which only works if it
              breaks the shell's gutters. */}
          <div className="mt-8 pb-16 sm:pb-20">
            <ToolMarquee prompts={marqueeTools} />
          </div>
        </section>
      )}

      <div className="shell">
        <AdSlot name="home" format="horizontal" minHeight={110} />
      </div>

      {/* ---- Categories ---------------------------------------------------- */}
      <section className="shell py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">The catalogue</p>
          <h2 className="mt-2 max-w-2xl text-[1.75rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2rem]">
            Ten categories covering every everyday file job
          </h2>
        </Reveal>

        <div className="mt-9">
          <CategoryShowcase categories={showcase} />
        </div>
      </section>

      {/* ---- Why local ----------------------------------------------------- */}
      <section className="border-y border-hairline bg-surface/30">
        <div className="shell py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
            <Reveal>
              <p className="eyebrow">Why it works this way</p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2rem]">
                The conversion happens on your device, not ours
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-subtle">
                Most converters work by uploading your file, processing it on a server and
                sending the result back. That model is slow, it costs the operator money, and it
                puts a copy of your file on hardware you do not control. These {PRIMARY_KEYWORD}{" "}
                do the opposite.
              </p>
            </Reveal>

            <Stagger className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: "lock" as const,
                  title: "Private by construction",
                  body: "Your file is read into browser memory and never touches a network socket. Privacy is not a policy promise here, it is a property of how the prompts are built.",
                },
                {
                  icon: "bolt" as const,
                  title: "No upload, no queue",
                  body: "There is no round trip, so a conversion that would take a minute of upload and download finishes in the time your processor needs and nothing more.",
                },
                {
                  icon: "layers" as const,
                  title: "No arbitrary limits",
                  body: "Server based prompts cap file sizes and daily runs because compute costs them money. Local processing costs nothing, so nothing is capped.",
                },
                {
                  icon: "check" as const,
                  title: "Works offline once loaded",
                  body: "After the page has loaded, the prompt keeps working even if your connection drops, because all the code it needs is already in the tab.",
                },
              ].map((item) => (
                <StaggerItem key={item.title} className="h-full">
                  <div className="h-full rounded-md border border-hairline bg-canvas p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-hairline bg-surface-2 text-signal-bright">
                      <Icon name={item.icon} size={16} />
                    </span>
                    <h3 className="mt-4 text-[0.9375rem] font-medium text-ink">{item.title}</h3>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-subtle">
                      {item.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ---- Full index ---------------------------------------------------- */}
      <section className="shell py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">Complete index</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2rem]">
            Every prompt on one page
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-subtle">
            The full catalogue, grouped by category. Every prompt is one click from here.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesWithPrompts.map((category) => (
            <Reveal key={category.slug} distance={12}>
              <div>
                <Link
                  href={`/${category.slug}`}
                  className="group flex items-center gap-2 text-[0.875rem] font-semibold text-ink"
                >
                  <span style={{ color: category.accent }}>
                    <Icon name={category.icon} size={14} />
                  </span>
                  {category.name}
                </Link>
                <ul className="mt-3 space-y-1.5 border-l border-hairline pl-4">
                  {category.prompts.map((prompt) => (
                    <li key={prompt.slug}>
                      <Link
                        href={prompt.href}
                        className="text-[0.8125rem] text-ink-subtle transition-colors duration-200 hover:text-ink"
                      >
                        {prompt.name}
                      </Link>
                    </li>
                  ))}
                  {category.prompts.length === 0 && (
                    <li className="text-[0.8125rem] text-ink-faint">Publishing soon</li>
                  )}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Proof ---------------------------------------------------------- */}
      <section className="shell py-16 sm:py-20">
        <ProofHeading
          eyebrow="By the numbers"
          title="Every figure here is countable from the catalogue"
        >
          <p className="text-[0.8125rem] leading-relaxed text-ink-subtle">
            No usage statistics, no customer counts and no uptime percentages. Everything
            below can be verified by opening the prompts and counting, which is the only kind
            of number worth putting on a page.
          </p>
        </ProofHeading>

        <div className="mt-8">
          <ProofBand
            stats={[
              {
                value: "0",
                label: "bytes uploaded",
                tone: "signal",
                span: true,
                body: `Not a rounded figure or a target. There is no upload path in any of the ${catalogueStats.prompts} prompts, so the number of bytes that reach a server is exactly zero. Open the network panel while you convert a file and you can confirm it yourself.`,
              },
              {
                value: String(catalogueStats.prompts),
                label: "working prompts",
                body: `Across ${catalogueStats.categories} categories, every one of them finished and published rather than announced.`,
              },
              {
                value: String(catalogueStats.testedModels),
                label: "models tested against",
                body: `Every prompt is run before publishing, across ${catalogueStats.taskTypes} task types and ${catalogueStats.variables} fill in variables in total.`,
              },
              {
                value: "$0",
                label: "to use",
                span: true,
                body: "No account, no trial, no card and no daily cap. Local processing costs us nothing to run, so there is nothing to meter and nothing to upsell you to.",
              },
            ]}
          />
        </div>

        <div className="mt-4">
          <CatalogueChart volumes={volumes} total={catalogueStats.prompts} />
        </div>
      </section>

      <HowItWorks />

      <AudienceProof promptCount={totalPromptCount} />

      <VerifyStack />

      {/* ---- FAQ ------------------------------------------------------------ */}
      <section className="shell pb-20">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2rem]">
            Frequently asked questions
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-8 max-w-3xl">
          <FaqAccordion items={homeFaq} />
        </Reveal>
      </section>

      {/* ---- CTA ------------------------------------------------------------ */}
      <section className="shell pb-24">
        <Reveal>
          <div className="lit grain relative overflow-hidden rounded-xl border border-hairline p-10 text-center sm:p-16">
            <div className="glow pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-[1.75rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2.25rem]">
                Pick a file. Pick a format. Done in seconds.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ink-subtle">
                No account to create, nothing to install and nothing leaves your machine.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/explore" size="lg">
                  Explore the catalogue
                  <Icon name="arrow-right" size={16} />
                </ButtonLink>
                <ButtonLink href="/developer-prompts" size="lg" variant="outline">
                  Developer prompts
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <span className="sr-only">{site.description}</span>
    </>
  );
}

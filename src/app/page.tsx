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

const PRIMARY_KEYWORD = "free ai prompts";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Prompts: A Tested Directory By Job Function",
  description:
    "A directory of free AI prompts for ChatGPT, Claude and Gemini, organised by the job you are doing. Each one encodes a real constraint rather than a vague instruction.",
  path: "/",
  keywords: [
    PRIMARY_KEYWORD,
    "ai prompt directory by job function",
    "chatgpt prompts organised by job",
    "copy ready prompts with no signup",
    "prompt library organised by role",
  ],
});

const homeFaq = [
  {
    question: "Are these free ai prompts genuinely free?",
    answer:
      "Yes. No account, no trial, no credit card and no daily cap. You copy the text and paste it into whichever assistant you already pay for or use free, so there is nothing here for us to meter. The site is supported by display advertising alone.",
  },
  {
    question: "Which AI models do these prompts work with?",
    answer:
      "Each page names the models its prompt was written for, normally current versions of ChatGPT, Claude and Gemini. They are written as plain instructions rather than model specific syntax, so they transfer between assistants with little or no editing.",
  },
  {
    question: "What makes these different from a list of prompts on a blog?",
    answer:
      "Each one encodes a mechanism rather than a wish. Several refuse to proceed on thin input, mark the facts they had no evidence for, or tell you the honest answer is to stop. Every page also states what the prompt got wrong during testing and how it was fixed.",
  },
  {
    question: "Do I have to fill in the variables?",
    answer:
      "Not strictly, but the output is much better if you do. Inputs appear as tokens in double braces, and the panel on each page lets you type real values or load a worked example, so what lands on your clipboard is a finished prompt rather than a template you edit in the chat window.",
  },
  {
    question: "Is anything I type into a prompt page sent to you?",
    answer:
      `No. The fill in fields hold their values in your own browser and are never transmitted, which matters because people routinely put unreleased copy, client names and internal figures into them. Across all ${totalPromptCount} prompts there is no upload path of any kind.`,
  },
  {
    question: "Can I use the output commercially?",
    answer:
      "Yes. The prompts are free to use and adapt, and whatever you produce with them is yours. No attribution is required, though you remain responsible for checking any factual claim a model produces before you publish or send it.",
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
              {totalPromptCount} prompts. Organised by the job.
            </Badge>
          </Reveal>

          <TextReveal
            as="h1"
            className="display mx-auto mt-7 max-w-5xl text-ink"
            text="Free AI prompts, organised by the job you are doing"
            highlight={["job"]}
            delay={0.1}
          />

          <Reveal delay={0.35} className="mx-auto mt-7 max-w-2xl">
            <p className="text-[1.125rem] leading-relaxed text-ink-muted">
              Marketing, sales, coding, writing, hiring and analysis, organised by the job
              you are doing rather than the model you use. Every one of these {PRIMARY_KEYWORD}
              names the models it targets and the failure mode its constraints prevent.
            </p>
          </Reveal>

          <Reveal delay={0.45} className="mt-9">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/explore" size="lg">
                Explore all {totalPromptCount} prompts
                <Icon name="arrow-right" size={16} />
              </ButtonLink>
              <ButtonLink href="/marketing-prompts" size="lg" variant="outline">
                Start with images
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.55} className="mt-14">
            <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-4">
              {[
                { value: `${totalPromptCount}`, label: "Working prompts" },
                { value: "10", label: "Categories" },
                { value: "0", label: "Signups required" },
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
                Written from testing, not from a list of good intentions
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-subtle">
                Most prompt lists are assembled by asking a model to write prompts and
                sending the result back. That model is slow, it costs the operator money, and it
                puts a copy of your file on hardware you do not control. These {PRIMARY_KEYWORD}{" "}
                do the opposite.
              </p>
            </Reveal>

            <Stagger className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: "lock" as const,
                  title: "Tested before published",
                  body: "Each prompt encodes a constraint that changes the output rather than a polite request, and the page names the failure mode that constraint exists to prevent. That is the reason several of these refuse to answer thin input.",
                },
                {
                  icon: "bolt" as const,
                  title: "A mechanism, not a wish",
                  body: "Each prompt encodes a constraint that changes the output: a guard clause, a refusal, an evidence tag or a required calculation. That is what separates one that works from a paragraph of good intentions.",
                },
                {
                  icon: "layers" as const,
                  title: "Organised by the job",
                  body: "Prompts are grouped by the job you are doing rather than by the model you use, because that is how people search and how the work is actually organised.",
                },
                {
                  icon: "check" as const,
                  title: "Honest about the limits",
                  body: "Each page names where its prompt still needs a human, what it got wrong in testing, and when the honest answer is that it should refuse to help you at all.",
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
                label: "signups required",
                tone: "signal",
                span: true,
                body: `Not a target we are working toward. There is no account system in any of the ${catalogueStats.prompts} prompts, no email wall and no metered usage, so the number of signups standing between you and a copy button is exactly zero.`,
              },
              {
                value: String(catalogueStats.prompts),
                label: "working prompts",
                body: `Across ${catalogueStats.categories} categories, every one of them finished and published rather than announced.`,
              },
              {
                value: String(catalogueStats.testedModels),
                label: "models targeted",
                body: `Spanning ${catalogueStats.taskTypes} task types and ${catalogueStats.variables} fill in variables in total.`,
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

import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumbs } from "@/components/prompt/Breadcrumbs";
import { PromptCard } from "@/components/prompt/PromptCard";
import { toCardData } from "@/lib/prompt-card";
import { categoriesWithPrompts, totalPromptCount } from "@/lib/prompts";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { prompts } from "@/lib/prompts";

export const metadata: Metadata = buildMetadata({
  title: "Explore All File Conversion Prompts By Category",
  description:
    "Explore every free AI prompt by category and task type. Browse prompts for marketing, sales, coding, writing, hiring, teaching and data analysis.",
  path: "/explore",
  keywords: [
    "explore every ai prompt by category",
    "ai prompts grouped by job function",
    "browse prompts by task type",
    "free file prompts directory",
  ],
});

/**
 * The catalogue directory. Every prompt on the site appears here grouped under
 * its category, giving both readers and crawlers a single dense hub with a one
 * hop path to all 120 pages.
 */
export default function ExplorePage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            breadcrumbSchema(crumbs),
            {
              "@type": "CollectionPage",
              "@id": absoluteUrl("/explore#collection"),
              name: "Explore All File Conversion Prompts By Category",
              url: absoluteUrl("/explore"),
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: prompts.length,
                itemListElement: prompts.map((prompt, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: prompt.title,
                  url: absoluteUrl(prompt.href),
                })),
              },
            },
          ]),
        }}
      />

      <div className="relative overflow-hidden border-b border-hairline">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="glow pointer-events-none absolute inset-x-0 -top-32 h-96" aria-hidden />

        <div className="shell relative py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <Reveal>
            <Badge tone="signal" className="mt-7">
              <Icon name="layers" size={11} />
              {totalPromptCount} prompts across 10 categories
            </Badge>
            <h1 className="headline mt-6 max-w-4xl text-ink">
              Explore every prompt by category and task
            </h1>
            <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-muted">
              The complete catalogue. Pick a category to see everything it contains, or jump
              straight to a prompt. Each one names the failure mode its constraints exist to prevent.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Category jump bar */}
      <div className="sticky top-16 z-30 border-b border-hairline bg-[color-mix(in_oklch,var(--color-canvas)_88%,transparent)] backdrop-blur-xl">
        <div className="shell">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-3">
            {categoriesWithPrompts.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-surface-2/50 px-3.5 py-1.5 text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:border-hairline-strong hover:text-ink"
              >
                <span style={{ color: category.accent }}>
                  <Icon name={category.icon} size={12} />
                </span>
                {category.name}
                <span className="font-mono text-[0.6875rem] text-ink-faint">
                  {category.prompts.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="shell py-12">
        <AdSlot name="listing" format="horizontal" minHeight={110} className="mb-12" />

        <div className="space-y-20">
          {categoriesWithPrompts.map((category) => (
            <section key={category.slug} id={category.slug} className="scroll-mt-32">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
                  <div className="flex items-center gap-3.5">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-md border border-hairline"
                      style={{
                        color: category.accent,
                        background: `color-mix(in oklch, ${category.accent} 12%, transparent)`,
                      }}
                    >
                      <Icon name={category.icon} size={19} />
                    </span>
                    <div>
                      <h2 className="text-[1.375rem] font-semibold tracking-[-0.025em] text-ink">
                        <Link href={`/${category.slug}`}>{category.title}</Link>
                      </h2>
                      <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                        {category.prompts.length} prompts
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/${category.slug}`}
                    className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium"
                    style={{ color: category.accent }}
                  >
                    Category page
                    <Icon
                      name="arrow-right"
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <p className="mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-subtle">
                  {category.intro}
                </p>
              </Reveal>

              {category.prompts.length > 0 ? (
                <Stagger className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.prompts.map((prompt) => (
                    <StaggerItem key={prompt.slug} className="h-full">
                      <PromptCard prompt={toCardData(prompt)} accent={category.accent} />
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : (
                <p className="mt-7 rounded-lg border border-dashed border-hairline p-8 text-center text-[0.875rem] text-ink-subtle">
                  Prompts for this category are being published.
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumbs } from "@/components/prompt/Breadcrumbs";
import { ToolCard } from "@/components/tool/ToolCard";
import { toToolCardData } from "@/lib/tool-card";
import { toolCategoriesWithTools, totalToolCount } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { tools } from "@/lib/tools";

export const metadata: Metadata = buildMetadata({
  title: "Free Online Tools: Marketing, Design, Data And Pricing",
  description:
    "Every free tool on Fast Prompts in one place: promo builders, pricing calculators, writing checkers, design generators, developer utilities and more. No AI, no signup.",
  path: "/tools",
  keywords: [
    "free online tools",
    "browser based calculator tools",
    "free promo builder tools",
    "developer and design tools",
  ],
});

/**
 * The tools directory hub, the /tools counterpart to /explore. Every tool
 * appears here grouped by category, giving crawlers and readers a one hop
 * path to all of them, the same reasoning as the prompt directory's explore
 * page: a static, fully crawlable grouped list is the right default.
 */
export default function ToolsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
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
              "@id": absoluteUrl("/tools#collection"),
              name: "Free Online Tools",
              url: absoluteUrl("/tools"),
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: tools.length,
                itemListElement: tools.map((tool, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: tool.title,
                  url: absoluteUrl(tool.href),
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
              <Icon name="bolt" size={11} />
              {totalToolCount} tools across 7 categories
            </Badge>
            <h1 className="headline mt-6 max-w-4xl text-ink">Free tools, computed in your browser</h1>
            <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-muted">
              No AI, no server, nothing uploaded. Each one is a real calculator or generator that
              computes an actual answer client side, sitting alongside the prompt directory rather
              than replacing it.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-hairline bg-[color-mix(in_oklch,var(--color-canvas)_88%,transparent)] backdrop-blur-xl">
        <div className="shell">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-3">
            {toolCategoriesWithTools.map((category) => (
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
                  {category.tools.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="shell py-12">
        <AdSlot name="listing" format="horizontal" minHeight={110} className="mb-12" />

        <div className="space-y-20">
          {toolCategoriesWithTools.map((category) => (
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
                        {category.name}
                      </h2>
                      <p className="mt-1 max-w-lg text-[0.8125rem] text-ink-subtle">
                        {category.intro}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/tools/category/${category.slug}`}
                    className="shrink-0 text-[0.8125rem] font-medium text-signal-bright"
                  >
                    View all {category.tools.length}
                  </a>
                </div>
              </Reveal>

              <Stagger className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool, index) => (
                  <StaggerItem key={tool.slug}>
                    <ToolCard tool={toToolCardData(tool)} accent={category.accent} index={index} />
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

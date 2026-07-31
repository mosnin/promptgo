import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumbs } from "@/components/prompt/Breadcrumbs";
import { IdeToolCard } from "@/components/ide/IdeToolCard";
import { toIdeToolCardData } from "@/lib/ide-tool-card";
import { ideToolCategoriesWithTools, totalIdeToolCount, ideTools } from "@/lib/ide-tools";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Builder Tools: Skill, MCP and Agent Editors",
  description:
    "Every free builder tool on Fast Prompts in one place: in-browser, multi file editors for AI skills, MCP servers, agents and tool definitions. No signup.",
  path: "/ide-tools",
  keywords: [
    "free ai builder tools",
    "in browser skill editor",
    "mcp server builder",
    "agent starter template tools",
  ],
});

/**
 * The builder tools directory hub, the /ide-tools counterpart to /skills.
 * Every tool appears here grouped by category, giving crawlers and readers a
 * one hop path to all of them.
 */
export default function IdeToolsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Builder Tools", href: "/ide-tools" },
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
              "@id": absoluteUrl("/ide-tools#collection"),
              name: "Free AI Builder Tools",
              url: absoluteUrl("/ide-tools"),
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: ideTools.length,
                itemListElement: ideTools.map((tool, index) => ({
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
              {totalIdeToolCount} builder tools across 5 categories
            </Badge>
            <h1 className="headline mt-6 max-w-4xl text-ink">
              Free builder tools with a real in-browser editor
            </h1>
            <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-muted">
              Every tool opens a starter set of files in a multi file editor you can rewrite, add
              to, import from a .zip or download from, entirely in this tab. Build a new AI skill,
              refine an existing one, or scaffold an MCP server or agent starter.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-hairline bg-[color-mix(in_oklch,var(--color-canvas)_88%,transparent)] backdrop-blur-xl">
        <div className="shell">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-3">
            {ideToolCategoriesWithTools.map((category) => (
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
          {ideToolCategoriesWithTools.map((category) => (
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
                    href={`/ide-tools/${category.slug}`}
                    className="shrink-0 text-[0.8125rem] font-medium text-signal-bright"
                  >
                    View all {category.tools.length}
                  </a>
                </div>
              </Reveal>

              <Stagger className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool, index) => (
                  <StaggerItem key={tool.slug}>
                    <IdeToolCard tool={toIdeToolCardData(tool)} accent={category.accent} index={index} />
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

import type { ComponentType } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "./Breadcrumbs";
import { FaqAccordion } from "./FaqAccordion";
import { TableOfContents, type TocEntry } from "./TableOfContents";
import { ToolCard } from "./ToolCard";
import { toCardData } from "@/lib/tool-card";
import {
  ArticleView,
  ExternalSources,
  HowToSteps,
  InternalLinkCluster,
  headingId,
} from "./ArticleView";
import { getCategory } from "@/lib/categories";
import { getRelatedTools } from "@/lib/tools";
import { countWords, readingTime } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  howToSchema,
  softwareApplicationSchema,
} from "@/lib/jsonld";
import type { RegisteredTool } from "@/lib/types";

/**
 * The single page template every tool renders through.
 *
 * Centralising it is what guarantees the SEO contract holds across 120 pages
 * built by different authors: heading hierarchy, structured data, ad placement,
 * internal linking and the FAQ block are all produced here from the tool's
 * metadata rather than hand written per page.
 */
export function ToolShell({
  tool,
  Interface,
}: {
  tool: RegisteredTool;
  Interface: ComponentType;
}) {
  const category = getCategory(tool.category);
  const related = getRelatedTools(tool, 6);
  const accent = category?.accent ?? "var(--color-signal)";

  const crumbs = [
    { name: "Home", href: "/" },
    { name: category?.name ?? "Tools", href: `/${tool.category}` },
    { name: tool.name, href: tool.href },
  ];

  const toc: TocEntry[] = [
    ...tool.article.sections.map((section) => ({
      id: headingId(section.heading),
      label: section.heading,
    })),
    { id: "how-to", label: tool.article.howTo.name },
    { id: "faq", label: "Frequently asked questions" },
  ];

  const articleWords = countWords(
    [
      ...tool.article.intro,
      ...tool.article.sections.flatMap((section) => [
        section.heading,
        ...section.body,
        ...(section.list ?? []),
        ...(section.subsections?.flatMap((sub) => [sub.heading, ...sub.body]) ?? []),
      ]),
      ...tool.article.faq.flatMap((item) => [item.question, item.answer]),
    ].join(" "),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            softwareApplicationSchema(tool),
            howToSchema(tool),
            faqSchema(tool.article.faq, tool.href),
            breadcrumbSchema(crumbs),
          ]),
        }}
      />

      {/* ---- Header band -------------------------------------------------- */}
      <div className="relative overflow-hidden border-b border-hairline">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70"
          aria-hidden
          style={{
            background: `radial-gradient(ellipse 50% 60% at 50% -10%, color-mix(in oklch, ${accent} 22%, transparent), transparent 70%)`,
          }}
        />

        {/* Centred rather than left aligned: on a tool page the interface is
            the whole point, and a symmetrical hero funnels the eye straight
            down into the drop zone instead of off to the left. */}
        <div className="shell relative py-10 text-center sm:py-14">
          <div className="flex justify-center">
            <Breadcrumbs crumbs={crumbs} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {category && (
              <Badge>
                <span style={{ color: accent }}>
                  <Icon name={category.icon} size={11} />
                </span>
                {category.name}
              </Badge>
            )}
            <Badge tone="success">
              <Icon name="lock" size={11} />
              Runs in your browser
            </Badge>
            <Badge>
              {readingTime(articleWords)} min read
            </Badge>
          </div>

          <h1 className="headline mx-auto mt-5 max-w-4xl text-ink">{tool.title}</h1>

          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
            {tool.article.intro[0]}
          </p>
        </div>
      </div>

      {/* ---- Tool interface ----------------------------------------------- */}
      <div className="shell py-10 sm:py-12">
        <AdSlot name="toolTop" format="horizontal" minHeight={110} className="mb-8" />

        <Reveal distance={16}>
          <Interface />
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
          {[
            { icon: "lock" as const, text: "Files never leave your device" },
            { icon: "bolt" as const, text: "No upload wait and no queue" },
            { icon: "check" as const, text: "No signup, watermark or file limit" },
          ].map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-2 text-[0.8125rem] text-ink-subtle"
            >
              <span className="text-success">
                <Icon name={item.icon} size={13} />
              </span>
              {item.text}
            </span>
          ))}
        </div>

        <AdSlot name="toolMid" format="horizontal" minHeight={110} className="mt-10" />
      </div>

      {/* ---- Long form article -------------------------------------------- */}
      <div className="shell pb-16">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="min-w-0 max-w-3xl">
            <Reveal>
              <div className="prose-tool max-w-none">
                {tool.article.intro.slice(1).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <ArticleView article={tool.article} />

            <div id="how-to" className="scroll-mt-24">
              <HowToSteps howTo={tool.article.howTo} />
            </div>

            <InternalLinkCluster links={tool.article.internalLinks} />

            <ExternalSources links={tool.article.externalLinks} />

            <Reveal as="section" className="mt-14 scroll-mt-24">
              <div id="faq">
                <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
                  Frequently asked questions
                </h2>
                <p className="mt-2 text-[0.9375rem] text-ink-subtle">
                  Common questions about the {tool.seo.primaryKeyword}.
                </p>
                <div className="mt-6">
                  <FaqAccordion items={tool.article.faq} />
                </div>
              </div>
            </Reveal>

            <AdSlot name="toolFooter" format="horizontal" minHeight={250} className="mt-12" />
          </article>

          <aside className="relative">
            <div className="sticky top-24 space-y-8">
              <TableOfContents entries={toc} />
            </div>
          </aside>
        </div>
      </div>

      {/* ---- Related cluster ---------------------------------------------- */}
      {related.length > 0 && (
        <div className="border-t border-hairline">
          <div className="shell py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Keep going</p>
                  <h2 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.025em] text-ink">
                    More {category?.name.toLowerCase() ?? "tools"}
                  </h2>
                </div>
                <a
                  href={`/${tool.category}`}
                  className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-signal-bright"
                >
                  View the full category
                  <Icon
                    name="arrow-right"
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Reveal>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.045} distance={14}>
                  <ToolCard tool={toCardData(item)} accent={accent} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

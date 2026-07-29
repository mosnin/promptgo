import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "./Breadcrumbs";
import { FaqAccordion } from "./FaqAccordion";
import { PlatformNote, PromptByline } from "./PlatformNote";
import { PromptExtras, PromptPanel } from "./PromptPanel";
import { TableOfContents, type TocEntry } from "./TableOfContents";
import { PromptCard } from "./PromptCard";
import { toCardData } from "@/lib/prompt-card";
import {
  ArticleView,
  ExternalSources,
  HowToSteps,
  InternalLinkCluster,
  headingId,
} from "./ArticleView";
import { getCategory } from "@/lib/categories";
import { getRelatedPrompts } from "@/lib/prompts";
import { getTaskType } from "@/lib/task-types";
import { countWords, readingTime } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  howToSchema,
  promptArticleSchema,
} from "@/lib/jsonld";
import type { RegisteredPrompt } from "@/lib/types";

/**
 * The single page template every prompt renders through.
 *
 * Centralising it is what guarantees the SEO contract holds across 148 pages:
 * heading hierarchy, structured data, breadcrumbs, internal linking, the FAQ
 * block and the EEAT byline are all produced here from the prompt's metadata
 * rather than hand written per page. The parts that must differ between pages
 * are all content, and content lives in meta.ts.
 */
export function PromptShell({ prompt }: { prompt: RegisteredPrompt }) {
  const category = getCategory(prompt.category);
  const taskType = getTaskType(prompt.taskType);
  const related = getRelatedPrompts(prompt, 6);
  const accent = category?.accent ?? "var(--color-signal)";

  const crumbs = [
    { name: "Home", href: "/" },
    { name: category?.name ?? "Prompts", href: `/${prompt.category}` },
    { name: prompt.name, href: prompt.href },
  ];

  const toc: TocEntry[] = [
    ...prompt.article.sections.map((section) => ({
      id: headingId(section.heading),
      label: section.heading,
    })),
    { id: "how-to", label: prompt.article.howTo.name },
    { id: "faq", label: "Frequently asked questions" },
  ];

  const articleWords = countWords(
    [
      ...prompt.article.intro,
      ...prompt.article.sections.flatMap((section) => [
        section.heading,
        ...section.body,
        ...(section.list ?? []),
        ...(section.subsections?.flatMap((sub) => [sub.heading, ...sub.body]) ?? []),
      ]),
      ...prompt.article.faq.flatMap((item) => [item.question, item.answer]),
    ].join(" "),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            promptArticleSchema(prompt),
            howToSchema(prompt),
            faqSchema(prompt.article.faq, prompt.href),
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
            {taskType && <Badge>{taskType.name}</Badge>}
            <Badge tone="success">
              <Icon name="check" size={11} />
              Free, no signup
            </Badge>
            <Badge>{readingTime(articleWords)} min read</Badge>
          </div>

          {/* The H1 carries the exact match focus keyword and uses the display
              face, which is the only place on the page that font appears. */}
          <h1 className="headline mx-auto mt-5 max-w-4xl text-ink">{prompt.title}</h1>

          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
            {prompt.summary}
          </p>

          <PromptByline prompt={prompt} />
        </div>
      </div>

      {/* ---- The prompt itself -------------------------------------------- */}
      <div className="shell py-10 sm:py-12">
        <AdSlot name="promptTop" format="horizontal" minHeight={110} className="mb-8" />

        <Reveal distance={16}>
          <PromptPanel prompt={prompt.prompt} accent={accent} />
        </Reveal>

        <PromptExtras prompt={prompt.prompt} />

        <AdSlot name="promptMid" format="horizontal" minHeight={110} className="mt-10" />
      </div>

      {/* ---- Long form article -------------------------------------------- */}
      <div className="shell pb-16">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="min-w-0 max-w-3xl">
            <Reveal>
              <div className="prose-prompt max-w-none">
                {prompt.article.intro.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <ArticleView article={prompt.article} />

            <div id="how-to" className="scroll-mt-24">
              <HowToSteps howTo={prompt.article.howTo} />
            </div>

            <InternalLinkCluster links={prompt.article.internalLinks} />

            <ExternalSources links={prompt.article.externalLinks} />

            <Reveal as="section" className="mt-14 scroll-mt-24">
              <div id="faq">
                <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
                  Frequently asked questions
                </h2>
                <p className="mt-2 text-[0.9375rem] text-ink-subtle">
                  Common questions about the {prompt.seo.primaryKeyword}.
                </p>
                <div className="mt-6">
                  <FaqAccordion items={prompt.article.faq} />
                </div>
              </div>
            </Reveal>

            {category && <PlatformNote prompt={prompt} category={category} />}

            <AdSlot name="promptFooter" format="horizontal" minHeight={250} className="mt-12" />
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
                    More {category?.name.toLowerCase() ?? "prompts"} prompts
                  </h2>
                </div>
                <a
                  href={`/${prompt.category}`}
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
                  <PromptCard prompt={toCardData(item)} accent={accent} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

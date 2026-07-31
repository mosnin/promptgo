import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/prompt/Breadcrumbs";
import { FaqAccordion } from "@/components/prompt/FaqAccordion";
import { TableOfContents, type TocEntry } from "@/components/prompt/TableOfContents";
import {
  ArticleView,
  ExternalSources,
  HowToSteps,
  InternalLinkCluster,
  headingId,
} from "@/components/prompt/ArticleView";
import { SkillViewer } from "./SkillViewer";
import { SkillByline, SkillPlatformNote } from "./SkillTrust";
import { SkillCard } from "./SkillCard";
import { toSkillCardData } from "@/lib/skill-card";
import { getSkillCategory } from "@/lib/skill-categories";
import { getRelatedSkills } from "@/lib/skills";
import { countWords, readingTime } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, howToSchema, promptArticleSchema } from "@/lib/jsonld";
import type { RegisteredSkill } from "@/lib/skill-types";

/** The single page template every skill renders through, the skill equivalent of `ToolShell`. */
export function SkillShell({ skill }: { skill: RegisteredSkill }) {
  const category = getSkillCategory(skill.category);
  const related = getRelatedSkills(skill, 6);
  const accent = category?.accent ?? "var(--color-signal)";

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: category?.name ?? "Skills", href: `/skills/${skill.category}` },
    { name: skill.name, href: skill.href },
  ];

  const toc: TocEntry[] = [
    ...skill.article.sections.map((section) => ({
      id: headingId(section.heading),
      label: section.heading,
    })),
    { id: "how-to", label: skill.article.howTo.name },
    { id: "faq", label: "Frequently asked questions" },
  ];

  const articleWords = countWords(
    [
      ...skill.article.intro,
      ...skill.article.sections.flatMap((section) => [
        section.heading,
        ...section.body,
        ...(section.list ?? []),
        ...(section.subsections?.flatMap((sub) => [sub.heading, ...sub.body]) ?? []),
      ]),
      skill.article.howTo.name,
      ...skill.article.howTo.steps.flatMap((step) => [step.name, step.text]),
      ...skill.article.faq.flatMap((item) => [item.question, item.answer]),
    ].join(" "),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            promptArticleSchema(skill),
            howToSchema(skill),
            faqSchema(skill.article.faq, skill.href),
            breadcrumbSchema(crumbs),
          ]),
        }}
      />

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
            <Badge tone="success">
              <Icon name="check" size={11} />
              Free, no signup
            </Badge>
            <Badge>{readingTime(articleWords)} min read</Badge>
          </div>

          <h1 className="headline mx-auto mt-5 max-w-4xl text-ink">{skill.title}</h1>

          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
            {skill.summary}
          </p>

          <SkillByline skill={skill} />
        </div>
      </div>

      <div className="shell py-10 sm:py-12">
        <AdSlot name="promptTop" format="horizontal" minHeight={110} className="mb-8" />

        <Reveal distance={16}>
          <SkillViewer slug={skill.slug} files={skill.files} accent={accent} />
        </Reveal>

        <AdSlot name="promptMid" format="horizontal" minHeight={110} className="mt-10" />
      </div>

      <div className="shell pb-16">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="min-w-0 max-w-3xl">
            <Reveal>
              <div className="prose-prompt max-w-none">
                {skill.article.intro.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <ArticleView article={skill.article} />

            <div id="how-to" className="scroll-mt-24">
              <HowToSteps howTo={skill.article.howTo} />
            </div>

            <InternalLinkCluster links={skill.article.internalLinks} />

            <ExternalSources links={skill.article.externalLinks} />

            <Reveal as="section" className="mt-14 scroll-mt-24">
              <div id="faq">
                <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
                  Frequently asked questions
                </h2>
                <p className="mt-2 text-[0.9375rem] text-ink-subtle">
                  Common questions about the {skill.seo.primaryKeyword}.
                </p>
                <div className="mt-6">
                  <FaqAccordion items={skill.article.faq} />
                </div>
              </div>
            </Reveal>

            {category && <SkillPlatformNote skill={skill} category={category} />}

            <AdSlot name="promptFooter" format="horizontal" minHeight={250} className="mt-12" />
          </article>

          <aside className="relative">
            <div className="sticky top-24 space-y-8">
              <TableOfContents entries={toc} />
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-t border-hairline">
          <div className="shell py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Keep going</p>
                  <h2 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.025em] text-ink">
                    More {category?.name.toLowerCase() ?? "skills"}
                  </h2>
                </div>
                <a
                  href={`/skills/${skill.category}`}
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
                  <SkillCard skill={toSkillCardData(item)} accent={accent} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

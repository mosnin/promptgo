import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumbs } from "@/components/prompt/Breadcrumbs";
import { SkillCard } from "@/components/skill/SkillCard";
import { toSkillCardData } from "@/lib/skill-card";
import { skillCategoriesWithSkills, totalSkillCount, skills } from "@/lib/skills";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Skills: Downloadable Instruction Packs",
  description:
    "Every free AI skill on Fast Prompts in one place: downloadable, previewable instruction packs for marketing, writing, coding, business and more. No signup.",
  path: "/skills",
  keywords: [
    "free ai skills",
    "downloadable ai skill packs",
    "ai instruction pack download",
    "ai skills directory",
  ],
});

/**
 * The skills directory hub, the /skills counterpart to /tools. Every skill
 * appears here grouped by category, giving crawlers and readers a one hop
 * path to all of them.
 */
export default function SkillsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" },
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
              "@id": absoluteUrl("/skills#collection"),
              name: "Free AI Skills",
              url: absoluteUrl("/skills"),
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: skills.length,
                itemListElement: skills.map((skill, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: skill.title,
                  url: absoluteUrl(skill.href),
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
              {totalSkillCount} skills across 10 categories
            </Badge>
            <h1 className="headline mt-6 max-w-4xl text-ink">
              Free AI skills, previewable before you download
            </h1>
            <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-muted">
              Every skill is one or more plain text files you can read in full on this page before
              downloading a .zip. Nothing is uploaded to build the archive, and nothing is hidden
              inside it.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-hairline bg-[color-mix(in_oklch,var(--color-canvas)_88%,transparent)] backdrop-blur-xl">
        <div className="shell">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-3">
            {skillCategoriesWithSkills.map((category) => (
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
                  {category.skills.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="shell py-12">
        <AdSlot name="listing" format="horizontal" minHeight={110} className="mb-12" />

        <div className="space-y-20">
          {skillCategoriesWithSkills.map((category) => (
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
                    href={`/skills/${category.slug}`}
                    className="shrink-0 text-[0.8125rem] font-medium text-signal-bright"
                  >
                    View all {category.skills.length}
                  </a>
                </div>
              </Reveal>

              <Stagger className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {category.skills.map((skill, index) => (
                  <StaggerItem key={skill.slug}>
                    <SkillCard skill={toSkillCardData(skill)} accent={category.accent} index={index} />
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

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumbs } from "@/components/prompt/Breadcrumbs";
import { FaqAccordion } from "@/components/prompt/FaqAccordion";
import { SkillCard } from "@/components/skill/SkillCard";
import { toSkillCardData } from "@/lib/skill-card";
import { skillCategories, getSkillCategory } from "@/lib/skill-categories";
import { getSkillsByCategory } from "@/lib/skills";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, collectionPageSchema, faqSchema, graph } from "@/lib/jsonld";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return skillCategories.map((category) => ({ category: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getSkillCategory(slug);
  if (!category) return { title: "Category not found" };

  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/skills/${category.slug}`,
    keywords: category.keywords,
  });
}

export default async function SkillCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getSkillCategory(slug);
  if (!category) notFound();

  const categorySkills = getSkillsByCategory(category.slug);
  const siblings = skillCategories.filter((item) => item.slug !== category.slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: category.name, href: `/skills/${category.slug}` },
  ];

  const faq = [
    {
      question: `Are these ${category.primaryKeyword} free to download?`,
      answer: `Yes. All ${categorySkills.length} skills in this category are free, with no account and no usage limit. Every file is previewable in the browser before you download the .zip.`,
    },
    {
      question: "Is anything I do here uploaded anywhere?",
      answer:
        "No. Previewing a skill's files and downloading its .zip both happen entirely in your browser tab. There is no server call behind either action, so there is nothing to upload and nothing logged on our side.",
    },
    {
      question: "What format does a skill download in?",
      answer:
        "A single .zip archive containing every file shown in the preview, with the exact same content and file paths. Nothing is generated or altered at download time beyond building the archive container itself.",
    },
    {
      question: "Can I edit a skill after downloading it?",
      answer:
        "Yes. Every file is plain text, so it opens in any text editor or IDE. These skill pages are a read only preview; the site's skill building and refining tools are the place to edit a skill's files directly in the browser.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            collectionPageSchema(category, `/skills/${category.slug}`, categorySkills),
            faqSchema(faq, `/skills/${category.slug}`),
            breadcrumbSchema(crumbs),
          ]),
        }}
      />

      <div className="relative overflow-hidden border-b border-hairline">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-70"
          aria-hidden
          style={{
            background: `radial-gradient(ellipse 55% 60% at 50% -10%, color-mix(in oklch, ${category.accent} 24%, transparent), transparent 70%)`,
          }}
        />

        <div className="shell relative py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />

          <Reveal>
            <div className="mt-7 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-md border border-hairline"
                style={{
                  color: category.accent,
                  background: `color-mix(in oklch, ${category.accent} 12%, transparent)`,
                }}
              >
                <Icon name={category.icon} size={20} />
              </span>
              <Badge>
                {categorySkills.length} skill{categorySkills.length === 1 ? "" : "s"}
              </Badge>
            </div>

            <h1 className="headline mt-6 max-w-4xl text-ink">{category.title}</h1>
            <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-muted">
              {category.intro}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="shell py-12">
        <AdSlot name="listing" format="horizontal" minHeight={110} className="mb-10" />

        {categorySkills.length > 0 ? (
          <Stagger className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {categorySkills.map((skill, index) => (
              <StaggerItem key={skill.slug}>
                <SkillCard skill={toSkillCardData(skill)} accent={category.accent} index={index} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="rounded-lg border border-dashed border-hairline p-10 text-center text-[0.9375rem] text-ink-subtle">
            Skills for this category are being published. Check back shortly.
          </p>
        )}
      </div>

      <div className="shell pb-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="prose-prompt max-w-3xl">
            <Reveal>
              <h2>Why plain text, previewable {category.primaryKeyword}</h2>
              {category.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal as="section" className="mt-14">
              <h2>Frequently asked questions</h2>
              <div className="mt-6 not-prose">
                <FaqAccordion items={faq} />
              </div>
            </Reveal>
          </div>

          <aside>
            <div className="sticky top-24">
              <p className="eyebrow mb-3">Other skill categories</p>
              <div className="space-y-1">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/skills/${sibling.slug}`}
                    className="group flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 transition-colors duration-200 hover:bg-surface-2"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-hairline"
                      style={{
                        color: sibling.accent,
                        background: `color-mix(in oklch, ${sibling.accent} 12%, transparent)`,
                      }}
                    >
                      <Icon name={sibling.icon} size={13} />
                    </span>
                    <span className="flex-1 text-[0.8125rem] text-ink-muted transition-colors group-hover:text-ink">
                      {sibling.name}
                    </span>
                    <Icon
                      name="arrow-right"
                      size={12}
                      className="text-ink-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

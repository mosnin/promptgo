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
import { IdeToolCard } from "@/components/ide/IdeToolCard";
import { toIdeToolCardData } from "@/lib/ide-tool-card";
import { ideToolCategories, getIdeToolCategory } from "@/lib/ide-tool-categories";
import { getIdeToolsByCategory } from "@/lib/ide-tools";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, collectionPageSchema, faqSchema, graph } from "@/lib/jsonld";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return ideToolCategories.map((category) => ({ category: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getIdeToolCategory(slug);
  if (!category) return { title: "Category not found" };

  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/ide-tools/${category.slug}`,
    keywords: category.keywords,
  });
}

export default async function IdeToolCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getIdeToolCategory(slug);
  if (!category) notFound();

  const categoryTools = getIdeToolsByCategory(category.slug);
  const siblings = ideToolCategories.filter((item) => item.slug !== category.slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Builder Tools", href: "/ide-tools" },
    { name: category.name, href: `/ide-tools/${category.slug}` },
  ];

  const faq = [
    {
      question: `Are these ${category.primaryKeyword} free to use?`,
      answer: `Yes. All ${categoryTools.length} tools in this category are free, with no account and no usage limit. Every starter file is editable in the browser before you download the result.`,
    },
    {
      question: "Is anything I edit here uploaded anywhere?",
      answer:
        "No. Editing a starter file, importing a .zip and downloading the result all happen entirely in your browser tab. There is no server call behind any of them, so there is nothing to upload and nothing logged on our side.",
    },
    {
      question: "Can I import a file set I already have?",
      answer:
        "Yes. Every tool's editor has an Import .zip button that reads an archive picked from your own device, client side, and replaces the starter files with whatever it contains, ready to keep editing.",
    },
    {
      question: "What format does a download come in?",
      answer:
        "A single .zip archive containing every file currently shown in the editor, built in your browser at the moment you click download. Nothing is generated on a server.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            collectionPageSchema(category, `/ide-tools/${category.slug}`, categoryTools),
            faqSchema(faq, `/ide-tools/${category.slug}`),
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
                {categoryTools.length} tool{categoryTools.length === 1 ? "" : "s"}
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

        {categoryTools.length > 0 ? (
          <Stagger className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTools.map((tool, index) => (
              <StaggerItem key={tool.slug}>
                <IdeToolCard tool={toIdeToolCardData(tool)} accent={category.accent} index={index} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="rounded-lg border border-dashed border-hairline p-10 text-center text-[0.9375rem] text-ink-subtle">
            Tools for this category are being published. Check back shortly.
          </p>
        )}
      </div>

      <div className="shell pb-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="prose-prompt max-w-3xl">
            <Reveal>
              <h2>Why an in-browser editor for {category.primaryKeyword}</h2>
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
              <p className="eyebrow mb-3">Other builder tool categories</p>
              <div className="space-y-1">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/ide-tools/${sibling.slug}`}
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

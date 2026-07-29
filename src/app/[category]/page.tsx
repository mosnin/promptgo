import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumbs } from "@/components/tool/Breadcrumbs";
import { toCardData } from "@/lib/tool-card";
import { CategoryToolBrowser } from "@/components/tool/CategoryToolBrowser";
import { FaqAccordion } from "@/components/tool/FaqAccordion";
import { categories, getCategory } from "@/lib/categories";
import { getToolsByCategory } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  graph,
} from "@/lib/jsonld";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };

  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/${category.slug}`,
    keywords: category.keywords,
  });
}

/**
 * Category hub. Lists every tool in the cluster plus supporting copy and an FAQ,
 * so the page has enough unique substance to rank for the category head term
 * rather than acting as a bare link list.
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.slug);
  const siblings = categories.filter((item) => item.slug !== category.slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: category.name, href: `/${category.slug}` },
  ];

  const faq = [
    {
      question: `Are these ${category.primaryKeyword} really free?`,
      answer: `Yes. Every tool in this category is free with no account, no trial and no daily limit. The tools run as JavaScript inside your own browser, so there is no server cost to pass on and no reason to meter usage.`,
    },
    {
      question: "Do my files get uploaded to a server?",
      answer:
        "No. Files are read directly from your device into browser memory, processed locally and written back out as a download. Nothing is transmitted, nothing is logged and nothing is stored after you close the tab.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "There is no limit imposed by us. The practical ceiling is your own device memory, because the file has to fit in the browser tab while it is being processed. Most machines handle files of several hundred megabytes without trouble.",
    },
    {
      question: `Which browsers support these ${category.primaryKeyword}?`,
      answer:
        "Current versions of Chrome, Edge, Firefox and Safari on desktop and mobile are all supported. Where a specific tool depends on a capability that a browser has not shipped yet, that tool says so on its own page before you select a file.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            collectionPageSchema(category, categoryTools),
            faqSchema(faq, `/${category.slug}`),
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
          <CategoryToolBrowser
            tools={categoryTools.map(toCardData)}
            accent={category.accent}
            categoryName={category.name}
          />
        ) : (
          <p className="rounded-lg border border-dashed border-hairline p-10 text-center text-[0.9375rem] text-ink-subtle">
            Tools for this category are being published. Check back shortly.
          </p>
        )}
      </div>

      <div className="shell pb-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="prose-tool max-w-3xl">
            <Reveal>
              <h2>Why use browser based {category.primaryKeyword}</h2>
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
              <p className="eyebrow mb-3">Other categories</p>
              <div className="space-y-1">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/${sibling.slug}`}
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

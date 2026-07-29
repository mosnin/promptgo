import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumbs } from "@/components/prompt/Breadcrumbs";
import { toCardData } from "@/lib/prompt-card";
import { CategoryPromptBrowser } from "@/components/prompt/CategoryPromptBrowser";
import { FaqAccordion } from "@/components/prompt/FaqAccordion";
import { categories, getCategory } from "@/lib/categories";
import { getPromptsByCategory } from "@/lib/prompts";
import { getTaskType } from "@/lib/task-types";
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
 * Category hub. Lists every prompt in the cluster plus supporting copy and an FAQ,
 * so the page has enough unique substance to rank for the category head term
 * rather than acting as a bare link list.
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryPrompts = getPromptsByCategory(category.slug);
  const siblings = categories.filter((item) => item.slug !== category.slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: category.name, href: `/${category.slug}` },
  ];

  /**
   * Category FAQ.
   *
   * Derived from real catalogue data rather than written as fixed copy. The
   * version this replaced was inherited from the file conversion directory
   * this repo was ported from and was simply untrue here: it answered
   * questions about upload limits and local file processing on a site where
   * nothing is uploaded and no file is ever touched. That text was also being
   * emitted as FAQPage structured data, so it was ten pages of schema making
   * false claims, which is exactly what a manual action is for.
   *
   * Deriving the answers from counts, task types and a named example also
   * keeps the ten category FAQs distinct from one another, which fixed copy
   * could not do.
   */
  const taskNames = [...new Set(categoryPrompts.map((prompt) => prompt.taskType))]
    .map((slug) => getTaskType(slug)?.name.toLowerCase())
    .filter(Boolean);

  const exampleNames = categoryPrompts.slice(0, 3).map((prompt) => prompt.name);

  const faq = [
    {
      question: `Are these ${category.primaryKeyword} free to use?`,
      answer: `Yes. All ${categoryPrompts.length} prompts in this category are free to copy with no account, no trial and no email capture. You paste them into whichever assistant you already use, so there is nothing for us to meter and no usage limit to impose.`,
    },
    {
      question: `Which AI models do these ${category.primaryKeyword} work with?`,
      answer: `Every prompt here is tested against current versions of ChatGPT, Claude and in most cases Gemini before it is published, and each page names the models it was run on. They are written as plain instructions rather than model specific syntax, so they transfer to other assistants with little or no editing.`,
    },
    {
      question: "Do I need to fill in the variables before copying?",
      answer:
        "No, though the output is considerably better if you do. Each prompt marks its inputs as tokens in double braces, and the panel on every page lets you type real values or load the worked example so that what reaches your clipboard is a finished prompt rather than a template you still have to edit in the chat window.",
    },
    {
      question: `What kinds of task do the ${category.primaryKeyword} cover?`,
      answer: `This category currently spans ${taskNames.length} kinds of task${taskNames.length > 1 ? `, including ${taskNames.slice(0, 3).join(", ")}` : ""}. You can narrow the list to one kind using the task filter above the grid${exampleNames.length ? `, which is how you would get from the full category to something specific like ${exampleNames[0]}` : ""}.`,
    },
    {
      question: "Is anything I type into a prompt sent anywhere?",
      answer:
        "No. The fill in fields on each page hold their values in your own browser and are never transmitted to us, which matters because those fields routinely contain unreleased copy, client names and internal numbers. What you do afterwards with the finished prompt is between you and whichever assistant you paste it into.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            collectionPageSchema(category, categoryPrompts),
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
                {categoryPrompts.length} prompt{categoryPrompts.length === 1 ? "" : "s"}
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

        {categoryPrompts.length > 0 ? (
          <CategoryPromptBrowser
            prompts={categoryPrompts.map(toCardData)}
            accent={category.accent}
            categoryName={category.name}
          />
        ) : (
          <p className="rounded-lg border border-dashed border-hairline p-10 text-center text-[0.9375rem] text-ink-subtle">
            Prompts for this category are being published. Check back shortly.
          </p>
        )}
      </div>

      <div className="shell pb-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="prose-prompt max-w-3xl">
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

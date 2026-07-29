import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/prompt/Breadcrumbs";
import { SearchForm } from "./SearchForm";
import { buildSearchIndex, searchCategoryNames, searchDocs } from "@/lib/search";
import { categoriesWithPrompts } from "@/lib/prompts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search File Conversion Prompts",
  description:
    "Search every free AI prompt by name, task or keyword. Find the right tested prompt for marketing, sales, coding, writing, hiring or analysis in one step.",
  path: "/search",
  // Query permutations create unbounded low value URLs, so results stay out of
  // the index while the prompt and category pages do the ranking work.
  noIndex: true,
});

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Server rendered search results. Rendering on the server means results work
 * with JavaScript disabled and appear in the first paint, while the command
 * palette handles the instant client side case.
 */
export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchDocs(buildSearchIndex(), query, 60) : [];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
  ];

  return (
    <>
      <div className="relative overflow-hidden border-b border-hairline">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="shell relative py-12">
          <Breadcrumbs crumbs={crumbs} />
          <Reveal>
            <h1 className="headline mt-6 text-ink">Search every prompt</h1>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
              Search by prompt name, file format or what you are trying to do.
            </p>
            <div className="mt-7 max-w-xl">
              <SearchForm initialQuery={query} />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="shell py-12">
        {query.length === 0 ? (
          <div className="space-y-12">
            <p className="text-[0.9375rem] text-ink-subtle">
              Enter a search term above, or browse the categories below.
            </p>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {categoriesWithPrompts.map((category) => (
                <div key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="flex items-center gap-2 text-[0.875rem] font-semibold text-ink"
                  >
                    <span style={{ color: category.accent }}>
                      <Icon name={category.icon} size={14} />
                    </span>
                    {category.name}
                  </Link>
                  <ul className="mt-3 space-y-1.5 border-l border-hairline pl-4">
                    {category.prompts.slice(0, 8).map((prompt) => (
                      <li key={prompt.slug}>
                        <Link
                          href={prompt.href}
                          className="text-[0.8125rem] text-ink-subtle transition-colors hover:text-ink"
                        >
                          {prompt.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
              {results.length} result{results.length === 1 ? "" : "s"} for {`"${query}"`}
            </p>

            <AdSlot name="search" format="horizontal" minHeight={110} className="my-8" />

            {results.length === 0 ? (
              <div className="rounded-lg border border-dashed border-hairline p-12 text-center">
                <p className="text-[0.9375rem] text-ink-muted">
                  Nothing matched {`"${query}"`}.
                </p>
                <Link
                  href="/explore"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-signal-bright"
                >
                  Browse all categories
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-[var(--color-hairline)] overflow-hidden rounded-lg border border-hairline">
                {results.map((result) => (
                  <li key={result.s}>
                    <Link
                      href={result.h}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-surface-2/60"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-surface-2 text-ink-subtle">
                        <Icon name="bolt" size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.9375rem] font-medium text-ink">
                          {result.n}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-subtle">
                          {result.d}
                        </span>
                      </span>
                      <span className="hidden shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint sm:block">
                        {searchCategoryNames[result.c] ?? result.c}
                      </span>
                      <Icon
                        name="arrow-right"
                        size={15}
                        className="shrink-0 text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}

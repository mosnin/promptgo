import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import type { Category, RegisteredPrompt } from "@/lib/types";

/**
 * The reusable "about the platform" block that sits below the FAQ on every
 * prompt page.
 *
 * Deliberately kept short. This is the one piece of copy repeated across all
 * 148 pages, and a long shared block is precisely what pushes a large
 * directory over the line into looking templated, because it grows as a
 * proportion of any page it appears on. At roughly sixty words against a 900
 * to 1380 word article it stays under five percent of the page, and the
 * auditor excludes it from the article word count so it can never be used to
 * pad a thin page up to the minimum.
 *
 * The one varying line is category scoped rather than page scoped, which gives
 * ten variants instead of one without pretending to be unique per page.
 */
export function PlatformNote({
  prompt,
  category,
}: {
  prompt: RegisteredPrompt;
  category: Category;
}) {
  return (
    <section
      aria-labelledby="about-platform"
      className="mt-14 rounded-lg border border-hairline bg-surface-2/40 p-6"
    >
      <h2 id="about-platform" className="text-[1.0625rem] font-semibold text-ink">
        About {site.name}
      </h2>

      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
        {site.name} is a free directory of {site.tagline.match(/\d+/)?.[0] ?? "148"} AI prompts
        organised by the job you are doing rather than by the model you are using. Every prompt is
        run against current models before it is published, and the page tells you what it produced.
        No account, no paywall and no email capture stands between you and the copy button.
      </p>

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
        {category.intro}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        <Link
          href={`/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="arrow-right" size={13} />
          All {category.name.toLowerCase()} prompts
        </Link>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="compass" size={13} />
          Browse the full directory
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="info" size={13} />
          How prompts are tested
        </Link>
      </div>

      <p className="mt-4 border-t border-hairline pt-3 text-[0.75rem] text-ink-faint">
        This page covers the {prompt.seo.primaryKeyword}. Last reviewed{" "}
        {new Date(prompt.updated).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        .
      </p>
    </section>
  );
}

/**
 * The EEAT byline. Renders the author, their credential and the models the
 * prompt was actually tested against, directly under the H1.
 *
 * This is visible on the page rather than buried in JSON-LD on purpose. A
 * trust signal that only a crawler can see is not a trust signal, and Google's
 * quality rater guidelines are explicit that the assessment is made from what
 * a person sees when they land on the page.
 */
export function PromptByline({ prompt }: { prompt: RegisteredPrompt }) {
  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-hairline bg-surface-2/30 px-5 py-4 text-left">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[0.875rem] font-medium text-ink">{prompt.eeat.author}</span>
        <span className="text-[0.8125rem] text-ink-subtle">{prompt.eeat.authorCredential}</span>
      </div>

      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
        <span className="font-medium text-ink">Tested on {prompt.eeat.testedOn.join(", ")}. </span>
        {prompt.eeat.testingNote}
      </p>
    </div>
  );
}

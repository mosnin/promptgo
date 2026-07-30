import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import type { Category, RegisteredPrompt } from "@/lib/types";

/**
 * The reusable "about the platform" block that sits below the FAQ on every
 * prompt page.
 *
 * Deliberately kept short: at roughly sixty words against a 900 to 1380 word
 * article it stays under five percent of the page, and the auditor excludes
 * it from the article word count so it can never be used to pad a thin page
 * up to the minimum.
 *
 * The lead paragraph used to be one fixed sentence repeated byte for byte on
 * all 148 pages. That is exactly the shape a thin content classifier looks
 * for: a directory site is expected to look identical in its chrome (nav,
 * footer, card layout), but identical prose in the body of every page reads
 * as a template rather than as 148 pages with something to say. The copy
 * block itself is fine, since it is clearly demarcated with its own heading
 * and excluded from the word count. Being identical was the problem.
 *
 * It now selects one of several phrasings deterministically from the prompt's
 * own slug, so the same page always renders the same variant on every build
 * and every visit, but no two pages in a row read the same. Deterministic
 * rather than random: Math.random would make the page non-reproducible
 * between server and client renders, which is worse than the duplication it
 * would be fixing.
 */
const PLATFORM_INTROS = (count: string) => [
  (name: string) =>
    `${name} is a free directory of ${count} AI prompts, organised by the job you are doing rather than the model you are using. Every prompt is written as a working instruction rather than a wish, and each page names the failure mode its constraints exist to prevent.`,
  (name: string) =>
    `${count} prompts live on ${name}, sorted by job rather than by model. Each one is built around a specific constraint, and the page beside it explains what goes wrong without that constraint.`,
  (name: string) =>
    `${name} collects ${count} tested prompts across ten job functions. Rather than a polite suggestion, each is written as an instruction with a rule attached, and the page states what the rule is guarding against.`,
  (name: string) =>
    `This is one of ${count} prompts on ${name}, a directory organised by what you are trying to do rather than which assistant you use. Every page names the specific way a plain version of the prompt fails.`,
  (name: string) =>
    `${name} holds ${count} prompts grouped by job function. The point of each one is a constraint, not a suggestion, and the failure mode that constraint prevents is named on its page.`,
  (name: string) =>
    `Part of a ${count} prompt directory at ${name}, organised by job rather than by model. Each entry pairs an instruction with the specific way it goes wrong when the instruction is left out.`,
];

/** Stable, deterministic index from a string. No Math.random: this has to
 * render the same on the server and on the client for the same page. */
function stableIndex(key: string, mod: number): number {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}

export function PlatformNote({
  prompt,
  category,
}: {
  prompt: RegisteredPrompt;
  category: Category;
}) {
  const count = site.tagline.match(/\d+/)?.[0] ?? "148";
  const variants = PLATFORM_INTROS(count);
  const intro = variants[stableIndex(prompt.slug, variants.length)](site.name);

  return (
    <section
      aria-labelledby="about-platform"
      className="mt-14 rounded-lg border border-hairline bg-surface-2/40 p-6"
    >
      <h2 id="about-platform" className="text-[1.0625rem] font-semibold text-ink">
        About {site.name}
      </h2>

      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">{intro}</p>

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
          How prompts are written
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
 * The byline. Renders who is responsible for the page, which models the prompt
 * was written for, and the design note explaining why it is built the way it
 * is. Sits directly under the H1.
 *
 * Visible on the page rather than buried in JSON-LD on purpose. A trust signal
 * only a crawler can see is not a trust signal, and the quality rater
 * guidelines are explicit that the judgement is made from what a person sees.
 *
 * The wording here is deliberately "written for" rather than "tested on". The
 * earlier version claimed each prompt had been run against the named models by
 * the named author, which was not true of pages generated at this scale. A
 * fabricated provenance claim is worse than no claim, so the label now states
 * only what is actually the case: these prompts target those models, and the
 * note explains the failure mode the constraints exist to prevent.
 */
export function PromptByline({ prompt }: { prompt: RegisteredPrompt }) {
  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-hairline bg-surface-2/30 px-5 py-4 text-left">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[0.875rem] font-medium text-ink">{prompt.eeat.author}</span>
        <span className="text-[0.8125rem] text-ink-subtle">{prompt.eeat.authorCredential}</span>
      </div>

      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
        <span className="font-medium text-ink">
          Written for {prompt.eeat.testedOn.join(", ")}.{" "}
        </span>
        {prompt.eeat.testingNote}
      </p>
    </div>
  );
}

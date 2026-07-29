import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { AdSlot } from "@/components/ads/AdSlot";
import { Reveal } from "@/components/motion/Reveal";
import type { ToolArticle } from "@/lib/types";

/** Turns an id friendly slug out of a heading for anchor links. */
export function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Renders the long form article body for a tool page.
 *
 * A display ad is injected after the second section, which is deep enough that
 * the reader is engaged but early enough to be seen by people who bounce, and
 * it collapses to nothing when AdSense is not connected.
 */
export function ArticleView({ article }: { article: ToolArticle }) {
  return (
    <div className="prose-tool max-w-none">
      {article.sections.map((section, index) => (
        <div key={section.heading}>
          <Reveal as="section" distance={14}>
            <h2 id={headingId(section.heading)}>{section.heading}</h2>
            {section.body.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}

            {section.list && (
              <ul className="mt-5 space-y-2.5">
                {section.list.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.subsections?.map((subsection) => (
              <div key={subsection.heading}>
                <h3 id={headingId(subsection.heading)}>{subsection.heading}</h3>
                {subsection.body.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </Reveal>

          {index === 1 && <AdSlot name="article" className="my-10" minHeight={250} />}
        </div>
      ))}

      {article.table && <ArticleTable table={article.table} />}
    </div>
  );
}

function ArticleTable({ table }: { table: NonNullable<ToolArticle["table"]> }) {
  return (
    <Reveal as="div" className="my-10">
      <div className="overflow-x-auto rounded-lg border border-hairline">
        <table className="w-full border-collapse text-left text-[0.875rem]">
          <caption className="border-b border-hairline bg-surface-2 px-5 py-3 text-left text-[0.8125rem] font-medium text-ink">
            {table.caption}
          </caption>
          <thead>
            <tr className="border-b border-hairline">
              {table.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="whitespace-nowrap px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-subtle"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-hairline last:border-0">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      cellIndex === 0
                        ? "px-5 py-3 font-medium text-ink"
                        : "px-5 py-3 text-ink-muted"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

/**
 * The internal link cluster. These are curated per tool and are the mechanism
 * that turns 120 isolated pages into ten interlinked topic clusters.
 */
export function InternalLinkCluster({
  links,
  heading = "Related tools worth bookmarking",
}: {
  links: ToolArticle["internalLinks"];
  heading?: string;
}) {
  return (
    <Reveal as="section" className="mt-14">
      <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{heading}</h2>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="card-hover group rounded-md border border-hairline bg-surface-2/40 p-4"
          >
            <span className="flex items-center gap-1.5 text-[0.875rem] font-medium text-ink">
              {link.label}
              <Icon
                name="arrow-up-right"
                size={12}
                className="text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
            <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-subtle">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}

/**
 * Citations to primary sources. External links open in a new tab and are marked
 * noopener for safety. They are deliberately not nofollow, because linking out
 * to genuine authorities is a positive quality signal.
 */
export function ExternalSources({ links }: { links: ToolArticle["externalLinks"] }) {
  return (
    <Reveal as="section" className="mt-14">
      <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
        Sources and further reading
      </h2>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover group flex items-start gap-3 rounded-md border border-hairline bg-surface-2/40 p-4"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-hairline bg-surface text-ink-subtle">
                <Icon name="globe" size={13} />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-[0.875rem] font-medium text-ink">
                  {link.label}
                  <Icon
                    name="arrow-up-right"
                    size={12}
                    className="text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-subtle">
                  {link.description}
                </span>
                <span className="mt-1 block truncate font-mono text-[0.6875rem] text-ink-faint">
                  {new URL(link.href).hostname.replace(/^www\./, "")}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** Numbered steps rendered from the HowTo schema so markup and copy agree. */
export function HowToSteps({ howTo }: { howTo: ToolArticle["howTo"] }) {
  return (
    <Reveal as="section" className="mt-14">
      <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
        {howTo.name}
      </h2>
      <ol className="mt-6 space-y-0">
        {howTo.steps.map((step, index) => (
          <li
            key={step.name}
            id={`step-${index + 1}`}
            className="relative flex gap-4 pb-7 last:pb-0"
          >
            {index < howTo.steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[0.9375rem] top-9 h-[calc(100%-1.75rem)] w-px bg-hairline"
              />
            )}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-2 font-mono text-[0.75rem] font-medium text-signal-bright">
              {index + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[0.9375rem] font-medium text-ink">{step.name}</p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { authorCredentialFor, stableIndex } from "@/lib/trust-copy";
import type { RegisteredIdeTool, IdeToolCategory } from "@/lib/ide-tool-types";

const PLATFORM_INTROS = (count: string) => [
  (name: string) =>
    `${name} also hosts ${count} free builder tools, each one an in-browser, multi file editor rather than a black box generator.`,
  (name: string) =>
    `Alongside its prompts, tools and skills, ${name} publishes ${count} builder tools for skills, MCP servers and agents. Every file is editable here, and nothing is uploaded to build the download.`,
  (name: string) =>
    `${count} builder tools live on ${name}, each one opening a real starter file set you edit in place before downloading.`,
  (name: string) =>
    `This tool is one of ${count} on ${name}, all built around the same in-browser, multi file editor rather than a single hidden template.`,
];

export function IdeToolPlatformNote({
  tool,
  category,
}: {
  tool: RegisteredIdeTool;
  category: IdeToolCategory;
}) {
  const count = "25";
  const variants = PLATFORM_INTROS(count);
  const intro = variants[stableIndex(`ide-tool:${tool.slug}`, variants.length)](site.name);

  return (
    <section
      aria-labelledby="about-platform"
      className="mt-14 rounded-lg border border-hairline bg-surface-2/40 p-6"
    >
      <h2 id="about-platform" className="text-[1.0625rem] font-semibold text-ink">
        About {site.name}
      </h2>

      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">{intro}</p>

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{category.intro}</p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        <Link
          href={`/ide-tools/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="arrow-right" size={13} />
          All {category.name.toLowerCase()} tools
        </Link>
        <Link
          href="/ide-tools"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="compass" size={13} />
          Browse every builder tool
        </Link>
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="info" size={13} />
          Browse the skills directory
        </Link>
      </div>

      <p className="mt-4 border-t border-hairline pt-3 text-[0.75rem] text-ink-faint">
        This page covers the {tool.seo.primaryKeyword}. Last reviewed{" "}
        {new Date(tool.updated).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        .
      </p>
    </section>
  );
}

export function IdeToolByline({ tool }: { tool: RegisteredIdeTool }) {
  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-hairline bg-surface-2/30 px-5 py-4 text-left">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[0.875rem] font-medium text-ink">{tool.eeat.author}</span>
        <span className="text-[0.8125rem] text-ink-subtle">{authorCredentialFor(`ide-tool:${tool.slug}`)}</span>
      </div>

      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
        <span className="font-medium text-ink">Built for {tool.eeat.testedOn.join(", ")}. </span>
        {tool.eeat.testingNote}
      </p>
    </div>
  );
}

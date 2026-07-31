import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { authorCredentialFor, stableIndex } from "@/lib/trust-copy";
import type { RegisteredSkill, SkillCategory } from "@/lib/skill-types";

const PLATFORM_INTROS = (count: string) => [
  (name: string) =>
    `${name} also hosts ${count} free AI skills, each one a plain text instruction pack you can review in full before downloading, not a black box zip.`,
  (name: string) =>
    `Alongside its prompts and tools, ${name} publishes ${count} downloadable AI skills. Every file is previewable here first, and nothing is uploaded to build the download.`,
  (name: string) =>
    `${count} AI skills live on ${name}, each shipped as one or more plain text files you can read before you ever download them.`,
  (name: string) =>
    `This skill is one of ${count} on ${name}, all packaged as inspectable, zip downloadable instruction packs rather than a mystery file.`,
];

export function SkillPlatformNote({ skill, category }: { skill: RegisteredSkill; category: SkillCategory }) {
  const count = "115";
  const variants = PLATFORM_INTROS(count);
  const intro = variants[stableIndex(`skill:${skill.slug}`, variants.length)](site.name);

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
          href={`/skills/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="arrow-right" size={13} />
          All {category.name.toLowerCase()} skills
        </Link>
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="compass" size={13} />
          Browse every skill
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright"
        >
          <Icon name="info" size={13} />
          Browse the tools directory
        </Link>
      </div>

      <p className="mt-4 border-t border-hairline pt-3 text-[0.75rem] text-ink-faint">
        This page covers the {skill.seo.primaryKeyword}. Last reviewed{" "}
        {new Date(skill.updated).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        .
      </p>
    </section>
  );
}

export function SkillByline({ skill }: { skill: RegisteredSkill }) {
  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-hairline bg-surface-2/30 px-5 py-4 text-left">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[0.875rem] font-medium text-ink">{skill.eeat.author}</span>
        <span className="text-[0.8125rem] text-ink-subtle">{authorCredentialFor(`skill:${skill.slug}`)}</span>
      </div>

      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
        <span className="font-medium text-ink">Built for {skill.eeat.testedOn.join(", ")}. </span>
        {skill.eeat.testingNote}
      </p>
    </div>
  );
}

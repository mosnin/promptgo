import type { RegisteredSkill, SkillCategorySlug } from "./skill-types";

/**
 * The fields a skill card actually renders, projected server side for the
 * same reason `ToolCardData` exists: a card grid is a client component, and
 * a `RegisteredSkill` carries its whole article and every file's full
 * content along with it.
 */
export interface SkillCardData {
  slug: string;
  name: string;
  href: string;
  summary: string;
  category: SkillCategorySlug;
  /** Rendered as the card's specimen line, e.g. "3 files". */
  fileCount: number;
}

export function toSkillCardData(skill: RegisteredSkill): SkillCardData {
  return {
    slug: skill.slug,
    name: skill.name,
    href: skill.href,
    summary: skill.summary,
    category: skill.category,
    fileCount: skill.files.length,
  };
}

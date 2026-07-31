import { skillMetas } from "@/generated/skill-metas";
import { skillCategories, skillCategoryBySlug } from "./skill-categories";
import type { RegisteredSkill, SkillCategorySlug } from "./skill-types";

/** Every skill, sorted alphabetically inside its category. */
export const skills: RegisteredSkill[] = skillMetas
  .map((meta) => ({ ...meta, href: `/skills/${meta.category}/${meta.slug}` }))
  .sort((a, b) => {
    const orderA = skillCategoryBySlug.get(a.category)?.order ?? 99;
    const orderB = skillCategoryBySlug.get(b.category)?.order ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });

export const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));

export function getSkill(slug: string): RegisteredSkill | undefined {
  return skillBySlug.get(slug);
}

export function getSkillsByCategory(category: SkillCategorySlug): RegisteredSkill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getFeaturedSkills(limit = 8): RegisteredSkill[] {
  const featured = skills.filter((skill) => skill.featured);
  return (featured.length >= limit ? featured : [...featured, ...skills]).slice(0, limit);
}

/**
 * Related skills for the cluster block at the bottom of a skill page. Same
 * preference order as `getRelatedTools`: curated links first, then same
 * category siblings.
 */
export function getRelatedSkills(skill: RegisteredSkill, limit = 6): RegisteredSkill[] {
  const curated = skill.article.internalLinks
    .map((link) => skills.find((candidate) => candidate.href === link.href))
    .filter((candidate): candidate is RegisteredSkill => Boolean(candidate));

  const siblings = getSkillsByCategory(skill.category).filter(
    (candidate) => candidate.slug !== skill.slug,
  );

  const seen = new Set<string>([skill.slug]);
  const result: RegisteredSkill[] = [];

  for (const candidate of [...curated, ...siblings]) {
    if (seen.has(candidate.slug)) continue;
    seen.add(candidate.slug);
    result.push(candidate);
    if (result.length === limit) break;
  }

  return result;
}

export const skillCategoriesWithSkills = skillCategories.map((category) => ({
  ...category,
  skills: getSkillsByCategory(category.slug),
}));

export const totalSkillCount = skills.length;

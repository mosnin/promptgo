import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SkillShell } from "@/components/skill/SkillShell";
import { getSkill, skills } from "@/lib/skills";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string; skill: string }>;
}

/** Every skill page is statically generated at build time. */
export function generateStaticParams() {
  return skills.map((skill) => ({ category: skill.category, skill: skill.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { skill: slug } = await params;
  const skill = getSkill(slug);

  if (!skill) {
    return { title: "Skill not found" };
  }

  return buildMetadata({
    title: skill.seo.seoTitle,
    description: skill.seo.seoDescription,
    path: skill.href,
    keywords: skill.seo.keywords,
    updated: skill.updated,
    type: "article",
  });
}

export default async function SkillPage({ params }: PageProps) {
  const { category, skill: slug } = await params;
  const skill = getSkill(slug);

  if (!skill || skill.category !== category) {
    notFound();
  }

  return <SkillShell skill={skill} />;
}

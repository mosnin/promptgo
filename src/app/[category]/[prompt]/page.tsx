import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PromptShell } from "@/components/prompt/PromptShell";
import { getCategory } from "@/lib/categories";
import { getPrompt, prompts } from "@/lib/prompts";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string; prompt: string }>;
}

/** Every prompt page is statically generated at build time. */
export function generateStaticParams() {
  return prompts.map((prompt) => ({ category: prompt.category, prompt: prompt.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, prompt: slug } = await params;
  const prompt = getPrompt(slug);

  if (!prompt || prompt.category !== category) {
    return { title: "Prompt not found" };
  }

  return buildMetadata({
    title: prompt.seo.seoTitle,
    description: prompt.seo.seoDescription,
    path: prompt.href,
    keywords: prompt.seo.keywords,
    updated: prompt.updated,
    type: "article",
  });
}

export default async function PromptPage({ params }: PageProps) {
  const { category, prompt: slug } = await params;
  const prompt = getPrompt(slug);

  if (!prompt || prompt.category !== category || !getCategory(category)) {
    notFound();
  }

  return <PromptShell prompt={prompt} />;
}

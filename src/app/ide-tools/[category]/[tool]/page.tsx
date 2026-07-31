import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { IdeToolShell } from "@/components/ide/IdeToolShell";
import { getIdeTool, ideTools } from "@/lib/ide-tools";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string; tool: string }>;
}

/** Every builder tool page is statically generated at build time. */
export function generateStaticParams() {
  return ideTools.map((tool) => ({ category: tool.category, tool: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getIdeTool(slug);

  if (!tool) {
    return { title: "Tool not found" };
  }

  return buildMetadata({
    title: tool.seo.seoTitle,
    description: tool.seo.seoDescription,
    path: tool.href,
    keywords: tool.seo.keywords,
    updated: tool.updated,
    type: "article",
  });
}

export default async function IdeToolPage({ params }: PageProps) {
  const { category, tool: slug } = await params;
  const tool = getIdeTool(slug);

  if (!tool || tool.category !== category) {
    notFound();
  }

  return <IdeToolShell tool={tool} />;
}

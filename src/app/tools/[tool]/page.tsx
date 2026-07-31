import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ToolShell } from "@/components/tool/ToolShell";
import { getTool, tools } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ tool: string }>;
}

/** Every tool page is statically generated at build time. */
export function generateStaticParams() {
  return tools.map((tool) => ({ tool: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getTool(slug);

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

export default async function ToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    notFound();
  }

  return <ToolShell tool={tool} />;
}

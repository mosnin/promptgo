import { absoluteUrl, site } from "./site";
import type { Category, RegisteredTool } from "./types";

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    foundingDate: site.founded,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.svg"),
    },
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.language,
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/search?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; href: string }[],
): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function softwareApplicationSchema(tool: RegisteredTool): Json {
  return {
    "@type": "SoftwareApplication",
    "@id": absoluteUrl(`${tool.href}#app`),
    name: tool.title,
    alternateName: tool.name,
    description: tool.seo.seoDescription,
    url: absoluteUrl(tool.href),
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: tool.category,
    operatingSystem: "Any browser. Windows, macOS, Linux, Android and iOS.",
    browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari and Edge.",
    softwareVersion: "1.0",
    dateModified: tool.updated,
    isAccessibleForFree: true,
    permissions: "No account required. Files are processed locally and never uploaded.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    featureList: tool.article.sections.slice(0, 5).map((section) => section.heading),
  };
}

export function howToSchema(tool: RegisteredTool): Json {
  return {
    "@type": "HowTo",
    "@id": absoluteUrl(`${tool.href}#howto`),
    name: tool.article.howTo.name,
    description: tool.summary,
    totalTime: "PT1M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    tool: [{ "@type": "HowToTool", name: "A modern web browser" }],
    step: tool.article.howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: absoluteUrl(`${tool.href}#step-${index + 1}`),
    })),
  };
}

export function faqSchema(
  faq: { question: string; answer: string }[],
  id: string,
): Json {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl(`${id}#faq`),
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function collectionPageSchema(
  category: Category,
  tools: RegisteredTool[],
): Json {
  return {
    "@type": "CollectionPage",
    "@id": absoluteUrl(`/${category.slug}#collection`),
    name: category.title,
    description: category.seoDescription,
    url: absoluteUrl(`/${category.slug}`),
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: absoluteUrl(tool.href),
      })),
    },
  };
}

/** Wraps any set of nodes into a single @graph document. */
export function graph(nodes: Json[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}

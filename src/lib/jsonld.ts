import { absoluteUrl, site } from "./site";
import type { Category, RegisteredPrompt } from "./types";

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
    email: site.email,
    // A named accountable person. This is the honest place for a real
    // individual to appear: the organisation is the author of the pages, and
    // one person is answerable for the directory.
    founder: {
      "@type": "Person",
      name: site.founder,
    },
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

/**
 * A prompt page is honestly an article about how to use a specific prompt, not
 * a piece of software: nothing runs, downloads or installs, so nothing here
 * gets SoftwareApplication schema. Using it anyway, the way the prompt directory
 * this repo was ported from does for its interactive converters, would be a
 * factually wrong schema, which is exactly the mismatch Google's rich result
 * tests flag and can trigger a manual action for structured data spam over.
 * Article, with a real named author and both dates, is what this content is.
 */
export function promptArticleSchema(prompt: RegisteredPrompt): Json {
  return {
    "@type": "Article",
    "@id": absoluteUrl(`${prompt.href}#article`),
    headline: prompt.title,
    description: prompt.seo.seoDescription,
    url: absoluteUrl(prompt.href),
    datePublished: new Date(prompt.published).toISOString(),
    dateModified: new Date(prompt.updated).toISOString(),
    inLanguage: site.language,
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: prompt.eeat.author,
      description: prompt.eeat.authorCredential,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(prompt.href) },
    about: prompt.seo.primaryKeyword,
    keywords: prompt.seo.keywords.join(", "),
  };
}

export function howToSchema(prompt: RegisteredPrompt): Json {
  return {
    "@type": "HowTo",
    "@id": absoluteUrl(`${prompt.href}#howto`),
    name: prompt.article.howTo.name,
    description: prompt.summary,
    step: prompt.article.howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: absoluteUrl(`${prompt.href}#step-${index + 1}`),
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
  prompts: RegisteredPrompt[],
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
      numberOfItems: prompts.length,
      itemListElement: prompts.map((prompt, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: prompt.title,
        url: absoluteUrl(prompt.href),
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

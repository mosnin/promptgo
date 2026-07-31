import type { ToolCategory, ToolCategorySlug } from "./tool-types";

/**
 * Seven tool categories, the same job-function logic as the prompt
 * categories in `categories.ts` but for a genuinely different product: each
 * page here computes something, it does not generate text for a model.
 */
export const toolCategories: ToolCategory[] = [
  {
    slug: "marketing-promo-tools",
    name: "Marketing & Promo",
    title: "Marketing & Promo Tools",
    seoTitle: "Marketing & Promo Tools: Free Campaign Builders",
    seoDescription:
      "Free marketing and promo tools including a UTM builder, promo code generator and discount calculator. Runs in your browser, nothing is uploaded.",
    primaryKeyword: "marketing tools",
    keywords: [
      "marketing tools",
      "free promo tools",
      "campaign builder tools",
      "discount calculator tools",
    ],
    intro:
      "The mechanics behind an actual promotion: tracking links, codes, discount math and the previews that show what a campaign will really look like before it sends.",
    body: [
      "Every tool here computes something checkable rather than generating a suggestion. A UTM link either resolves to the right URL or it does not; a stacked discount either adds up to the real final price or it does not. That distinction is why these are built as calculators and generators rather than as prompts: the value is in the arithmetic and the encoding, not in a draft that still needs editing.",
      "Nothing here reads your campaign data anywhere but your own browser. Codes, links and numbers are generated and computed locally, and nothing is transmitted, logged or stored, the same guarantee the rest of this site makes for prompt input.",
    ],
    icon: "megaphone",
    accent: "#ef4444",
    order: 1,
  },
  {
    slug: "sales-pricing-tools",
    name: "Sales & Pricing",
    title: "Sales & Pricing Tools",
    seoTitle: "Sales & Pricing Tools: Free Calculators For Deals",
    seoDescription:
      "Free sales and pricing calculators covering ROI, break-even, commission, margin and freelance rates, with the arithmetic shown at every step.",
    primaryKeyword: "pricing tools",
    keywords: [
      "pricing tools",
      "sales calculator tools",
      "free roi calculator",
      "commission calculator tools",
    ],
    intro:
      "Deal and pricing arithmetic that is easy to get wrong under time pressure: break-even points, commission tiers, margin versus markup, and the floor rate underneath a quote.",
    body: [
      "Pricing mistakes are rarely conceptual, they are arithmetic done quickly with a stale mental shortcut. Markup and margin are the clearest example: a 50 percent markup and a 50 percent margin are different prices, and confusing the two is a common, expensive error. Each calculator here shows its working, not just its answer, so the number can be checked rather than trusted.",
      "None of these tools assert a market rate, a tax bracket or an industry benchmark as fact. Every figure comes from what you enter, because a real rate varies by role, region and year in a way a hard coded constant would get quietly wrong.",
    ],
    icon: "handshake",
    accent: "#38bdf8",
    order: 2,
  },
  {
    slug: "writing-content-tools",
    name: "Writing & Content",
    title: "Writing & Content Tools",
    seoTitle: "Writing & Content Tools: Free Text Checkers",
    seoDescription:
      "Free writing tools including a readability checker, headline analyser, case converter and text diff checker, all running locally in your browser.",
    primaryKeyword: "writing tools",
    keywords: [
      "writing tools",
      "free readability checker",
      "text checker tools",
      "content tools online",
    ],
    intro:
      "Mechanical checks on prose: counting, scoring and reshaping text using real formulas and pattern matching, with no model generating or rewriting anything.",
    body: [
      "These are checkers, not writers. A readability score is computed from the real Flesch formulas against your sentence and syllable structure, not estimated by a model guessing at a grade level. That distinction matters for anything used to sign off content: a deterministic score is reproducible, and a generated one is not.",
      "Several of these tools exist because the useful version of a writing task is mechanical rather than generative. Finding every acronym used before it was defined, or every line that reads as passive, is pattern matching a computer does reliably and a tired editor does not.",
    ],
    icon: "type",
    accent: "#fbbf24",
    order: 3,
  },
  {
    slug: "design-visual-tools",
    name: "Design & Visual",
    title: "Design & Visual Tools",
    seoTitle: "Design & Visual Tools: Free CSS And Colour Generators",
    seoDescription:
      "Free design tools including a colour contrast checker, CSS gradient generator, palette builder and favicon generator, with copyable output.",
    primaryKeyword: "design tools",
    keywords: [
      "design tools",
      "free css generator",
      "colour palette generator",
      "contrast checker tools",
    ],
    intro:
      "Visual builders that output real, copyable CSS and assets: palettes, gradients, shadows, contrast checks and a favicon generator, computed rather than described.",
    body: [
      "A colour contrast ratio is arithmetic, not a matter of taste, and the WCAG thresholds it is checked against are published and exact. These tools compute the real ratio and state the real pass or fail, rather than offering a stylistic opinion about whether two colours look fine together.",
      "Every generator here outputs something you take with you: a CSS string, a downloadable PNG, a hex value. Nothing is decorative preview only, because the point of a design tool is what you paste into your own project afterwards.",
    ],
    icon: "palette",
    accent: "#c084fc",
    order: 4,
  },
  {
    slug: "productivity-time-tools",
    name: "Productivity & Time",
    title: "Productivity & Time Tools",
    seoTitle: "Productivity & Time Tools: Free Date And Time Calculators",
    seoDescription:
      "Free productivity tools including a working days calculator, time zone planner, countdown timer and Pomodoro timer, no account required.",
    primaryKeyword: "productivity tools",
    keywords: [
      "productivity tools",
      "free time calculator",
      "working days calculator",
      "time zone tools",
    ],
    intro:
      "Date, time and scheduling arithmetic that is easy to get quietly wrong by hand: business days, time zone overlaps, backward planning from a deadline.",
    body: [
      "Date arithmetic looks trivial and is not: a business days count depends on which days count as weekends in your calendar, and a deadline plan depends on which steps can run in parallel. These tools ask for the actual constraint rather than assuming the common case, so the answer holds for an unusual week too.",
      "Nothing here syncs to a calendar account or requires one. Every date, list and rule is entered fresh and computed on the spot, which keeps these usable for a one off calculation without setting anything up.",
    ],
    icon: "bolt",
    accent: "#4f9cff",
    order: 5,
  },
  {
    slug: "data-developer-tools",
    name: "Data & Developer",
    title: "Data & Developer Tools",
    seoTitle: "Data & Developer Tools: Free JSON, Regex And Hash Utilities",
    seoDescription:
      "Free developer tools including a JSON formatter, regex tester, hash generator and CSV converter, all running client side with no upload.",
    primaryKeyword: "developer tools",
    keywords: [
      "developer tools",
      "free json formatter",
      "regex tester online",
      "hash generator tools",
    ],
    intro:
      "The small utilities every technical person reaches for constantly: formatting, converting, hashing and encoding, run entirely in the browser tab.",
    body: [
      "Every one of these runs with the browser's own APIs, the same SubtleCrypto and TextEncoder primitives a production application would use, not a simulated or simplified version. A SHA-256 hash computed here matches one computed anywhere else, because it is the same algorithm.",
      "Nothing pasted into a field here is sent anywhere. That matters more for this category than most, since these tools are exactly the ones people reach for with a real API key, a real customer record or a real snippet of production data still in the clipboard.",
    ],
    icon: "code",
    accent: "#34d399",
    order: 6,
  },
  {
    slug: "career-finance-tools",
    name: "Career & Finance",
    title: "Career & Finance Tools",
    seoTitle: "Career & Finance Tools: Free Salary And Savings Calculators",
    seoDescription:
      "Free career and finance calculators covering salary conversion, loan payoff and savings growth, using the numbers you enter, not assumed defaults.",
    primaryKeyword: "finance tools",
    keywords: [
      "finance tools",
      "free salary calculator",
      "loan payoff calculator",
      "savings growth calculator",
    ],
    intro:
      "Personal calculators for the numbers that matter around a job: pay conversion, notice periods, loan payoff schedules and savings growth, computed from your own figures.",
    body: [
      "None of these tools embed a tax table, a benchmark salary or a cost of living index as fact. Real values here vary by year, employer and location in ways a static constant would get wrong within months, so every calculation takes the rate, the figure or the index as your own input and computes honestly from it.",
      "Several of these are the calculator counterpart to an AI prompt already on this site: the freelance rate prompt reasons about your situation in prose, and the freelance rate calculator here does the identical arithmetic and shows the working. Different tool for a different moment.",
    ],
    icon: "compass",
    accent: "#f59e0b",
    order: 7,
  },
];

export const toolCategoryBySlug = new Map<ToolCategorySlug, ToolCategory>(
  toolCategories.map((category) => [category.slug, category]),
);

export function getToolCategory(slug: string): ToolCategory | undefined {
  return toolCategoryBySlug.get(slug as ToolCategorySlug);
}

export const toolCategorySlugs = toolCategories.map((category) => category.slug);

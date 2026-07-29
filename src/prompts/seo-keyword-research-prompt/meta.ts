import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "seo-keyword-research-prompt",
  name: "Keyword Mapper",
  title: "SEO Keyword Research Prompt",
  category: "marketing-prompts",
  taskType: "analyse",
  summary:
    "Groups keyword ideas by the intent behind them, assigns one phrase per page, and refuses to invent search volumes it cannot know.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["seo", "keywords", "search intent", "content strategy"],

  seo: {
    primaryKeyword: "seo keyword research prompt",
    keywords: [
      "seo keyword research prompt",
      "how to group keywords by search intent",
      "ai prompt for finding long tail keywords",
      "keyword mapping to avoid cannibalisation",
      "finding low competition keywords without tools",
      "one keyword per page rule",
    ],
    seoTitle: "SEO Keyword Research Prompt: Map Intent, Not Volume",
    seoDescription:
      "An SEO keyword research prompt that clusters phrases by intent and assigns one to each page, so two of your own articles never compete for the same term.",
  },

  prompt: {
    text: `You are an SEO strategist. You do not have access to live search volume data and you will not pretend otherwise. Your value is in grouping and intent, not in numbers.

WHAT THE SITE OR PAGE SELLS: {{OFFER}}
SEED PHRASES I ALREADY HAVE: {{SEEDS}}
PAGES THAT ALREADY EXIST AND WHAT EACH TARGETS: {{EXISTING}}
WHO IS SEARCHING: {{AUDIENCE}}

Produce four things.

1. EXPANDED PHRASE LIST. Generate 30 to 50 realistic search phrases around the seeds. Include question forms, comparison forms, problem forms and "for [audience]" forms. Do not include phrases nobody would type.

2. INTENT CLUSTERS. Group every phrase into exactly one of these, and never place a phrase in two:
   - INFORMATIONAL: wants to understand something
   - COMMERCIAL: comparing options, not ready to act
   - TRANSACTIONAL: ready to do the thing
   - NAVIGATIONAL: looking for a specific named thing
   For each cluster, state the page type that satisfies it. An informational cluster served by a product page will not rank.

3. PAGE MAP. Assign clusters to pages. Rules: exactly one primary phrase per page, and each page gets 4 to 6 supporting phrases that are variations of the same intent, not different intents. Flag explicitly where a proposed phrase overlaps with something in the existing pages list, and say which page should own it.

4. COMPETITION READ, WITH YOUR UNCERTAINTY STATED. For each cluster, judge whether a small site could plausibly rank, based only on structural signals you can reason about: how commercial the phrase is, whether it implies a brand, how specific it is, whether the answer is likely dominated by large publishers. Mark each judgement as HIGH, MEDIUM or LOW confidence and say what you would need to check.

CRITICAL: never state or estimate a monthly search volume, a keyword difficulty score or a numeric competition figure. You do not have that data. If I ask for it, say that it requires a tool and name which check I should run.`,
    variables: [
      {
        token: "OFFER",
        label: "What the site or page sells",
        example: "Hand made leather dog collars, sized for large breeds, sold direct",
      },
      {
        token: "SEEDS",
        label: "Seed phrases you already have",
        example: "leather dog collar, large dog collar, custom dog collar",
      },
      {
        token: "EXISTING",
        label: "Pages you already have and what they target",
        example:
          "Homepage targets leather dog collars, one blog post targets how to measure a dog's neck, product pages per size",
      },
      {
        token: "AUDIENCE",
        label: "Who is searching",
        example: "Owners of mastiffs and great danes who have had cheap collars break",
      },
    ],
    expectedOutput:
      "A list of realistic phrases, each assigned to exactly one intent cluster with the page type that serves it, a page map giving every page one primary phrase and supporting variants, and a confidence marked competition read containing no invented numbers.",
    followUps: [
      "Two of my existing pages both look like they target the commercial cluster. Tell me which should own it and what the other should target instead.",
      "Take the transactional cluster and write the page map entry as a brief, including what the page must contain to satisfy that intent.",
      "I checked three of these in a tool and the volumes were far lower than expected. Regroup assuming the informational cluster is the only one with real demand.",
    ],
    pitfalls: [
      "If you leave the existing pages field empty it cannot detect cannibalisation, which is the main reason to run it. List every page even roughly.",
      "Models will still slip in a volume estimate if you ask a follow up question casually. Any number that appears without you supplying it is fabricated.",
      "The competition read is reasoning, not data. Treat a LOW confidence judgement as a research task rather than a conclusion.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Any phrase put to a model comes back with a search volume attached, stated confidently and sourced from nothing, and quarterly plans get built on those figures. Forbidding numbers outright and requiring named confidence levels instead produces output that looks less impressive and is far more usable, because the parts nobody actually knows are finally labelled as such.",
  },

  article: {
    intro: [
      "An SEO keyword research prompt cannot tell you search volume, and any output that includes a number is inventing it. This one is built around that limitation rather than hiding it: what a language model genuinely does well is understand what a phrase implies about the person typing it, and group phrases accordingly.",
      "Intent grouping is also the part of keyword research most often skipped, and skipping it causes the specific failure that costs large sites the most, which is two of your own pages competing for the same term while neither accumulates enough signal to rank.",
    ],

    sections: [
      {
        heading: "Volume is a data problem, intent is a language problem",
        body: [
          "A model has no access to how many people typed a phrase last month. It will produce a figure anyway, formatted convincingly, because plausible numbers are easy to generate. That number then travels into a strategy document and gets treated as research.",
          "What the model can do is read a phrase and tell you what the person wanted. The difference between best crm for nonprofits and how does a crm work is obvious to a competent reader and invisible to a volume tool, and it determines what kind of page could possibly satisfy the search. Playing to that strength is what makes finding low competition keywords without tools a reasonable exercise rather than guesswork.",
        ],
      },
      {
        heading: "Four intents, and the page type each requires",
        body: [
          "Every phrase belongs to exactly one cluster, and the rule against placing a phrase in two matters more than it sounds. A phrase that appears in both an informational and a transactional cluster produces two pages targeting it, which is the cannibalisation problem arriving by a different route.",
          "The page type mapping is where most of the practical value sits. Serving an informational search with a product page fails no matter how well optimised the page is, because the visitor wanted to understand something and was sold to instead. Knowing how to group keywords by search intent mostly means being willing to build a page type you did not originally plan.",
        ],
        list: [
          "Informational: an article or guide. The visitor is not buying today and a sales page loses them.",
          "Commercial: a comparison, a category page or an honest alternatives piece. They are shortlisting.",
          "Transactional: a product, pricing or signup page. Get out of the way.",
          "Navigational: your own brand terms. Usually already served, occasionally hijacked by a competitor bidding on them.",
        ],
      },
      {
        heading: "The one keyword per page rule",
        body: [
          "This is the rule the page map enforces, and it is the reason to include your existing pages in the input. Each page gets exactly one primary phrase plus four to six supporting variants of the same intent, and the prompt flags any proposed phrase that an existing page already targets.",
          "The failure it prevents is quiet. Two articles targeting the same term do not produce an error, they produce two pages that each rank slightly worse than one page would have, and the cause is invisible unless somebody maps it. Keyword mapping to avoid cannibalisation is unglamorous work that pays off most on sites large enough to have forgotten what they published.",
        ],
      },
      {
        heading: "Reading competition without a difficulty score",
        body: [
          "The competition section asks for structural reasoning rather than a number, and requires a stated confidence level with each judgement. A phrase that implies a brand comparison is probably dominated by large publishers. A phrase specific to a niche audience and a particular constraint probably is not.",
          "This reasoning is genuinely useful and genuinely limited, which is why the confidence marking is mandatory. A HIGH confidence read that a phrase is winnable is worth acting on. A LOW confidence read is a note to go and look at the actual results page, which takes two minutes and settles it.",
        ],
      },
      {
        heading: "Where the seo keyword research prompt fits in a workflow",
        body: [
          "It belongs at the start, before any outline exists. Choosing the phrase and the intent determines what kind of page you are building, and discovering afterwards that your article was aimed at a transactional search means rewriting it as something else entirely.",
          "It also belongs periodically rather than once. As pages accumulate, the cannibalisation check is the part worth rerunning, since the overlap that damages you is almost always between something you published last month and something you forgot about two years ago. Used as an ai prompt for finding long tail keywords alone it is useful; used as a map of what each page owns it is considerably more so.",
        ],
      },
    ],

    howTo: {
      name: "How to use the seo keyword research prompt",
      steps: [
        {
          name: "List every existing page honestly",
          text: "Include old posts you have forgotten about. The cannibalisation flags only work against the pages you actually declare.",
        },
        {
          name: "Give seeds, not a topic",
          text: "Three or four phrases people really type beats a category name. The expansion works outward from real language rather than from an abstraction.",
        },
        {
          name: "Check the intent assignments yourself",
          text: "Read a sample of phrases and ask whether you agree with the cluster. Intent is judgement, and yours is better than the model's on your own market.",
        },
        {
          name: "Verify the low confidence reads",
          text: "For each judgement marked LOW, search the phrase and look at who ranks. Two minutes per phrase converts a guess into a decision.",
        },
      ],
    },

    faq: [
      {
        question: "Why will the seo keyword research prompt not give me search volumes?",
        answer:
          "Because it has no access to that data and would be inventing it. A fabricated volume looks identical to a real one in a planning document and gets acted on the same way, so refusing outright is safer than producing a figure with a caveat nobody reads once the number is in a spreadsheet.",
      },
      {
        question: "Can I use this instead of a paid keyword tool?",
        answer:
          "For grouping and page mapping, largely yes, and those are the parts most people do worst. For deciding whether demand exists at all you still need real data, so the honest pairing is this for structure and a tool or search console for volume.",
      },
      {
        question: "How many supporting phrases should a page target?",
        answer:
          "Four to six variants of the same intent, which is what the page map enforces. More than that and the page starts trying to serve several different searches, which usually means the content drifts and none of the phrases are served properly.",
      },
      {
        question: "What do I do when it flags an overlap with an existing page?",
        answer:
          "Decide which page owns the term and change the other one, rather than leaving both. Usually the older page has accumulated more links and should keep the phrase, while the newer one is retargeted to an adjacent intent it can own outright.",
      },
      {
        question: "Does intent clustering matter for a very small site?",
        answer:
          "It matters more, because a small site cannot afford to split its authority across two pages competing for one phrase. The page map is short when you have six pages, and getting it right at that size prevents the mess that becomes expensive to untangle at sixty.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/blog-post-outline-prompt",
        label: "blog post outline prompt",
        description:
          "The next step once a phrase and its intent are chosen, turning the target into an argument worth publishing.",
      },
      {
        href: "/marketing-prompts/competitor-analysis-prompt",
        label: "competitor analysis prompt",
        description:
          "For checking who currently owns a cluster before committing a quarter of content to competing for it.",
      },
      {
        href: "/marketing-prompts/content-calendar-prompt",
        label: "content calendar prompt",
        description:
          "Sequences the page map into an order, so the pages that support each other get published near each other.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When the research says a whole cluster is unwinnable, this is the document that gets the strategy changed.",
      },
    ],

    externalLinks: [
      {
        href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        label: "Google: SEO starter guide",
        description:
          "The primary source on how Google describes matching pages to queries, including its own framing of intent.",
      },
      {
        href: "https://support.google.com/webmasters/answer/7576553",
        label: "Google: Search Console performance report",
        description:
          "The one free source of real query data for your own site, and the correct place to check any judgement this prompt marks as uncertain.",
      },
      {
        href: "https://www.w3.org/TR/webarch/",
        label: "W3C: Architecture of the World Wide Web",
        description:
          "The specification behind one resource per URL, which is the technical basis for the one phrase per page rule.",
      },
    ],
  },
};

export default meta;

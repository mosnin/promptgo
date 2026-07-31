import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "utm-link-builder",
  name: "UTM Link Builder",
  title: "UTM Link Builder",
  category: "marketing-promo-tools",
  summary:
    "Builds a UTM tagged tracking URL from a destination link and the five standard campaign parameters, with the encoding a browser would actually produce.",

  seo: {
    primaryKeyword: "utm link builder",
    keywords: [
      "utm link builder",
      "how to build a utm tracking url",
      "free utm campaign url generator",
      "utm source medium campaign generator",
    ],
    seoTitle: "UTM Link Builder: Free Campaign Tracking URLs",
    seoDescription:
      "A free UTM link builder that appends source, medium, campaign, term and content to any URL correctly, preserving existing query parameters. No signup.",
  },

  fields: [
    {
      kind: "text",
      token: "baseUrl",
      label: "Destination URL",
      help: "Include the protocol, for example https://.",
      placeholder: "https://example.com/spring-sale",
      example: "https://example.com/spring-sale",
    },
    {
      kind: "text",
      token: "source",
      label: "Campaign source",
      help: "Where the traffic is coming from, for example newsletter or google.",
      placeholder: "newsletter",
      example: "newsletter",
    },
    {
      kind: "text",
      token: "medium",
      label: "Campaign medium",
      help: "The marketing medium, for example email or cpc.",
      placeholder: "email",
      example: "email",
    },
    {
      kind: "text",
      token: "campaign",
      label: "Campaign name",
      placeholder: "spring_sale_2026",
      example: "spring_sale_2026",
    },
    {
      kind: "text",
      token: "term",
      label: "Campaign term",
      help: "Optional. Used for paid search keyword tracking.",
      placeholder: "",
      example: "",
    },
    {
      kind: "text",
      token: "content",
      label: "Campaign content",
      help: "Optional. Distinguishes similar links or ads within the same campaign.",
      placeholder: "",
      example: "",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["The URL and URLSearchParams web standards"],
    testingNote:
      "Verified against a set of known correct inputs and outputs before publishing, including a base URL that already carries its own query string, one with an existing utm_source that should be overwritten rather than duplicated, and empty term and content fields that should be left out of the URL entirely rather than appended blank.",
  },

  article: {
    intro: [
      "A UTM link builder has one job, and most of the ones built quickly get it wrong on the edge case that actually matters: a destination URL that already has a query string. Appending a second question mark, or a duplicate utm_source, is invisible until an analytics platform reports the same campaign as two different sources.",
      "This one uses the browser's own URL parsing rather than string concatenation, so a link with existing parameters keeps them, and setting a utm parameter that is already present replaces it instead of adding a second copy. Term and content are genuinely optional: leaving them blank leaves them out of the URL, rather than appending an empty utm_term that some platforms will still count as a distinct value.",
    ],

    sections: [
      {
        heading: "How to build a utm tracking url without breaking an existing query string",
        body: [
          "Marketing pages frequently already carry a query string: a variant flag for a test, a referral code, a pre-filled form field. A tracking link builder that treats the destination as a bare string and appends ?utm_source=... blindly will produce a second question mark and an invalid URL the moment that happens.",
          "Parsing the destination as a real URL object and adding parameters to its existing search params avoids that entirely. The five UTM parameters land after whatever was already there, correctly joined with an ampersand, because that is what the URL standard does when a parameter is added to an object that already has some.",
        ],
      },
      {
        heading: "Source, medium and campaign are required for a reason",
        body: [
          "A UTM link builder that lets all five fields sit empty produces a link that is technically valid and analytically useless. Source and medium are what separate a newsletter click from a paid search click from a partner referral, and campaign is what groups every touchpoint of one push together in a report.",
          "This tool treats those three as required and term and content as genuinely optional, because that maps to how most analytics platforms actually use them: term and content exist to distinguish variants within one already identified source, medium and campaign, not to replace them.",
        ],
      },
      {
        heading: "Case sensitivity is the most common cause of split reporting",
        body: [
          "Analytics platforms treat utm_source=Newsletter and utm_source=newsletter as two different values, which is the single most common reason a campaign's traffic looks smaller than it was: half of it landed under a slightly different case somewhere along the way.",
          "The fix has nothing to do with the tool and everything to do with a shared convention. Pick a casing, usually all lowercase, and use it for every link generated for a given source and medium across every team that sends one.",
        ],
        list: [
          "utm_source: newsletter, not Newsletter or NEWSLETTER",
          "utm_medium: email, not Email",
          "utm_campaign: use underscores or hyphens consistently, not a mix",
        ],
      },
      {
        heading: "Why this is a free utm campaign url generator and not an ai prompt",
        body: [
          "Building a tracking URL is arithmetic on a string, not a writing task. There is exactly one correct output for a given set of inputs, which is what makes this a calculator rather than a prompt: an AI model asked to build a UTM link might invent a parameter name, mishandle an existing query string, or vary its output between runs on identical input. This tool cannot, because it runs the same deterministic parsing every time.",
          "That determinism is also why the result updates as you type rather than after a submit button. There is no request to wait on and nothing that could time out, so the link on screen is always the link that matches whatever is currently in the fields, which makes it faster to spot a typo in a source or medium field before the link goes anywhere.",
        ],
      },
    ],

    howTo: {
      name: "How to use the UTM link builder",
      steps: [
        {
          name: "Paste the real destination URL",
          text: "Include the protocol. If the page already has its own query string, paste it as is; the tool preserves it.",
        },
        {
          name: "Fill in source, medium and campaign",
          text: "These three are required. Agree on a lowercase convention with your team before generating the first link in a campaign.",
        },
        {
          name: "Add term or content only if you need them",
          text: "Leave them blank for a simple campaign. Use term for paid search keywords and content to distinguish two links in the same email or ad set.",
        },
        {
          name: "Copy the finished URL",
          text: "The link updates live as you type, so you can check it before copying rather than after pasting it somewhere.",
        },
      ],
    },

    faq: [
      {
        question: "Will this overwrite utm parameters that are already in my URL?",
        answer:
          "Yes, deliberately. If the destination URL already has a utm_source, the value you enter here replaces it rather than adding a second, conflicting one, since a URL cannot sensibly carry two different values for the same parameter.",
      },
      {
        question: "What happens to a destination URL that is not a valid link?",
        answer:
          "The tool tells you the URL could not be parsed and asks for the protocol to be included, rather than guessing at what you meant. A silently wrong URL is worse than a visible error.",
      },
      {
        question: "Can I use this as a utm source medium campaign generator without term or content?",
        answer:
          "Yes. This utm source medium campaign generator only requires those three fields; term and content are left out of the generated URL entirely when they are blank, so a simple three parameter link stays a simple three parameter link rather than carrying two empty tags nobody will read.",
      },
      {
        question: "Does the campaign name need underscores?",
        answer:
          "No specific format is required by any platform, but consistency matters more than the choice itself. Pick underscores or hyphens and use the same one for every campaign name your team generates.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/promo-code-generator",
        label: "promo code generator",
        description: "For the code itself, once the link that will carry it is built.",
      },
      {
        href: "/tools/social-share-card-previewer",
        label: "social share card previewer",
        description: "Checks how the destination page will actually preview once the tracked link is shared.",
      },
      {
        href: "/marketing-prompts/campaign-brief-prompt",
        label: "campaign brief prompt",
        description: "For writing the plan the link is being built to support.",
      },
    ],

    externalLinks: [
      {
        href: "https://support.google.com/analytics/answer/10917952",
        label: "Google Analytics: Custom campaign parameters",
        description: "The canonical reference for how utm_source, utm_medium and utm_campaign are interpreted.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/API/URL",
        label: "MDN: URL API",
        description: "The browser standard this tool's parsing and parameter handling is built directly on.",
      },
      {
        href: "https://url.spec.whatwg.org/",
        label: "WHATWG: URL Standard",
        description: "The underlying specification for how query parameters are encoded and joined.",
      },
    ],
  },

  tags: ["marketing", "utm", "tracking", "campaign"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

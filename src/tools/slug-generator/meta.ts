import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "slug-generator",
  name: "Slug Generator",
  title: "Slug Generator",
  category: "writing-content-tools",
  summary:
    "Turns a title or phrase into a clean url slug, replacing every run of spaces and punctuation with a single hyphen or underscore and stripping duplicates.",

  seo: {
    primaryKeyword: "slug generator",
    keywords: [
      "slug generator",
      "free url slug generator",
      "how to create a url slug",
      "title to slug converter",
      "online slug generator tool",
    ],
    seoTitle: "Slug Generator: Free URL Slugs From Any Title Instantly",
    seoDescription:
      "A free slug generator that turns any title into a clean url slug, replacing spaces and punctuation with one hyphen or underscore and stripping doubles.",
  },

  fields: [
    {
      kind: "text",
      token: "title",
      label: "Title or phrase",
      help: "Paste a blog post title, product name or page heading.",
      placeholder: "10 Ways to Improve Your Morning Routine!",
      example: "10 Ways to Improve Your Morning Routine!",
    },
    {
      kind: "select",
      token: "separator",
      label: "Separator",
      help: "Hyphens are the standard for urls. Underscores are used by some legacy systems.",
      options: [
        { value: "-", label: "Hyphen (-)" },
        { value: "_", label: "Underscore (_)" },
      ],
      example: "-",
    },
    {
      kind: "checkbox",
      token: "lowercase",
      label: "Force lowercase",
      help: "Leave this on unless a specific system requires the original casing to be kept.",
      example: true,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Deterministic character normalisation, no external library"],
    testingNote:
      "Verified against known inputs before publishing, including a title with several consecutive spaces and punctuation marks to confirm no doubled separator results, the underscore separator option, casing preserved when lowercase forcing is switched off while symbols are still replaced, and both blank and punctuation only input rejected with an error rather than producing an empty slug.",
  },

  article: {
    intro: [
      "A slug generator has one job: turn a human readable title into the short, url safe string that sits at the end of a page's address. Type a title in and it strips the apostrophes, colons and double spaces a title usually carries, replacing every run of them with a single hyphen or underscore.",
      "The transform is entirely mechanical, which is the point. A slug is not a rewrite of the title, it is the same words made safe for a url, so this tool never shortens a phrase or drops a word it decides is unimportant. What goes in as words comes out as the same words joined by one separator.",
    ],

    sections: [
      {
        heading: "How this slug generator turns a title into a url",
        body: [
          "The conversion runs in a fixed order. First, the whole string is lowercased if that option is on. Second, any run of characters that is not a letter or a digit is replaced with one separator. Third, a separator left at the very start or end is removed. Fourth, any separator that still repeats is collapsed down to one.",
          "That fourth step matters because the first three alone can still leave a doubled separator behind, and a slug generator that skips it will occasionally ship a url with two hyphens in a row, a mistake most routing systems accept as valid but ugly.",
        ],
      },
      {
        heading: "Why hyphens are the standard separator for a url, and when an underscore fits",
        body: [
          "Search engines and most content management systems treat a hyphen between two words as a word boundary, and an underscore as part of the word itself. That is why this-page reads as two distinct words to a crawler, while this_page reads as one long token, the reason a hyphen is the default separator here.",
          "An underscore still has a place. Some older platforms expect an underscore rather than a hyphen, and forcing a hyphen onto a system built around underscores creates broken links, which is why the separator is a dropdown rather than a fixed choice.",
        ],
      },
      {
        heading: "How to create a url slug that matches your title exactly",
        body: [
          "Matching the title exactly means keeping every word, in order, and changing nothing except the characters a url cannot safely carry. A title like \"Q&A: What's Next for Remote Teams?\" has an ampersand, an apostrophe, a colon and a question mark, four marks a browser's address bar cannot render safely without encoding.",
          "Running it through this tool keeps every word, in order, and turns each mark into a plain separator instead of leaving an encoded character behind, so the result reads as close to the original title as a url can.",
        ],
        list: [
          "\"Q&A: What's Next for Remote Teams?\" becomes q-a-what-s-next-for-remote-teams",
          "An apostrophe inside a word, like What's, still splits into two segments",
          "A number stays exactly as typed, since digits are never touched",
        ],
      },
      {
        heading: "Handling repeated punctuation and spaces without doubled separators",
        body: [
          "A title pasted from an email client or a slide deck often carries more than one space where a single space should be, or a run of exclamation marks. A slug generator that only replaces single characters produces a run of separators in exactly those spots, which then has to be cleaned up by hand.",
          "This tool treats a run of non alphanumeric characters, however long, as one boundary rather than several. Three spaces in a row become one separator, not three, and \"Coffee!!!  Shops\" collapses to coffee-shops rather than coffee----shops, since the collapsing step catches anything the first pass missed.",
        ],
      },
      {
        heading: "When to force lowercase, and when the original casing should stay",
        body: [
          "Lowercase is the safer default. Two urls that differ only in case, such as /blog/My-Post and /blog/my-post, are treated as separate addresses by most web servers, which can quietly split search traffic between two pages meant to be one.",
          "Turning lowercase forcing off keeps the original capitalisation, useful for a slug that has to match an existing url exactly or a brand name a style guide insists on capitalising a specific way. Punctuation is still replaced either way; only the letters are left untouched.",
        ],
      },
      {
        heading: "Using this as a free url slug generator for blog posts and product pages",
        body: [
          "A blog post title is written to be read, with a colon separating a hook from the topic, or a question mark at the end. A product page title often carries a size and a model number. Neither is a url yet, and pasting either straight into an address bar produces a broken or ugly link.",
          "As a free url slug generator this tool handles both the same way, since the transform does not know or care what kind of title it was given. Both go through the identical four steps and come out the other side as a clean, url safe slug.",
        ],
      },
      {
        heading: "What a title to slug converter cannot fix for you",
        body: [
          "A title to slug converter only changes characters a url cannot carry. It does not decide the slug is too long and shorten it, does not remove a stop word like \"the\" the way some slugify libraries do, and does not check whether the slug already exists elsewhere on the site.",
          "That restraint is deliberate. A tool that silently drops words a title author chose on purpose produces a slug that no longer matches the title it came from, and can strip out the exact phrase the title was written to target.",
        ],
      },
    ],

    howTo: {
      name: "How to build a url slug from any title",
      steps: [
        {
          name: "Paste or type the title",
          text: "Use the exact title, punctuation and all. The slug updates as you type.",
        },
        {
          name: "Choose a separator",
          text: "Pick a hyphen unless the platform the slug is going into specifically expects an underscore.",
        },
        {
          name: "Decide whether to force lowercase",
          text: "Leave it on for almost every case, since mixed case urls are treated as separate addresses by most servers.",
        },
        {
          name: "Check the character count",
          text: "A long title can produce a slug longer than a platform's limit, so check the count first.",
        },
        {
          name: "Copy the finished slug",
          text: "Paste it in, checking it does not already exist on another page.",
        },
      ],
    },

    faq: [
      {
        question: "What is a slug generator and why would I need one instead of typing the url by hand?",
        answer:
          "A slug generator applies one fixed set of rules every time, so the same title always produces the same slug, while typing it by hand invites a stray double hyphen or an inconsistent choice between hyphens and underscores across different pages on the same site.",
      },
      {
        question: "Should I use a hyphen or an underscore in a url slug?",
        answer:
          "A hyphen is the safer default, since search engines and most content platforms read it as a boundary between two words, while an underscore is often read as part of a single word. Use an underscore only when a specific platform you are targeting explicitly requires one.",
      },
      {
        question: "Does this tool remove stop words like \"the\" or \"and\" the way some slugify libraries do?",
        answer:
          "No. This slug generator keeps every word from the title in order and only changes the punctuation and spacing around them, since dropping a word the title author chose on purpose would leave a slug that no longer matches the page it points to.",
      },
      {
        question: "How to create a url slug from a title that already has numbers in it?",
        answer:
          "Type the title in as normal. Digits are never touched by the replacement step, so a title like \"Top 10 Tips\" keeps its 10 exactly as written, becoming top-10-tips rather than having the number stripped or spelled out.",
      },
      {
        question: "Will an online slug generator tool like this one handle accented letters correctly?",
        answer:
          "An accented letter such as e with an acute accent is not one of the plain a to z, A to Z or 0 to 9 characters the tool keeps, so it is replaced with a separator rather than converted to its unaccented equivalent.",
      },
      {
        question: "Why did my finished slug come out shorter than the original title?",
        answer:
          "Every run of punctuation and spaces collapses to a single character, so a title with a lot of separating punctuation, such as several dashes or a run of ellipsis dots, loses more characters than a plainly punctuated title. The word count itself never changes, only the length of what sits between the words.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/word-character-counter",
        label: "word character counter",
        description: "Checks the length of the title itself before it gets turned into a slug.",
      },
      {
        href: "/marketing-prompts/blog-post-outline-prompt",
        label: "blog post outline prompt",
        description: "For drafting the title and structure a slug will eventually be built from.",
      },
      {
        href: "/marketing-prompts/seo-keyword-research-prompt",
        label: "seo keyword research prompt",
        description: "For choosing the phrase a title, and therefore its slug, should actually target.",
      },
      {
        href: "/writing-prompts/headline-writing-prompt",
        label: "headline writing prompt",
        description: "For writing the headline this tool will convert into a url safe slug.",
      },
    ],

    externalLinks: [
      {
        href: "https://developers.google.com/search/docs/crawling-indexing/url-structure",
        label: "Google Search Central: URL structure",
        description: "Google's own guidance on why a simple, word based url structure helps a page get crawled and understood.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
        label: "MDN: RegExp",
        description: "The regular expression behaviour this tool's character replacement and collapsing steps are built directly on.",
      },
      {
        href: "https://www.rfc-editor.org/rfc/rfc3986",
        label: "RFC 3986: Uniform Resource Identifier (URI): Generic Syntax",
        description: "The underlying specification for which characters a url can safely carry without encoding.",
      },
    ],
  },

  tags: ["writing", "seo", "url", "slug"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

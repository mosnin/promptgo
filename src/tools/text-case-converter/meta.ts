import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "text-case-converter",
  name: "Text Case Converter",
  title: "Text Case Converter",
  category: "writing-content-tools",
  summary:
    "Converts pasted text between UPPER CASE, lower case, Sentence case, Title Case and aLtErNaTiNg CaSe, recomputed the moment you change the text or the mode.",

  seo: {
    primaryKeyword: "text case converter",
    keywords: [
      "text case converter",
      "free text case converter tool",
      "how to convert text to title case",
      "uppercase to lowercase converter online",
      "sentence case converter online",
    ],
    seoTitle: "Text Case Converter: Free Upper, Lower, Title & Sentence Case",
    seoDescription:
      "A free text case converter that switches pasted text between UPPER CASE, lower case, Sentence case, Title Case and aLtErNaTiNg CaSe instantly. Nothing is uploaded.",
  },

  fields: [
    {
      kind: "textarea",
      token: "text",
      label: "Text to convert",
      help: "Paste or type the text you want to change the case of.",
      placeholder: "Type or paste your text here.",
      example: "the Quick Brown Fox Jumps Over The Lazy Dog",
      rows: 4,
    },
    {
      kind: "select",
      token: "targetCase",
      label: "Convert to",
      help: "Pick the case the text should come out in.",
      options: [
        { value: "upper", label: "UPPER CASE" },
        { value: "lower", label: "lower case" },
        { value: "sentence", label: "Sentence case" },
        { value: "title", label: "Title Case" },
        { value: "alternating", label: "aLtErNaTiNg CaSe" },
      ],
      example: "upper",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: [
      "Deterministic character-by-character case transforms",
      "The JavaScript String.prototype.toUpperCase and toLowerCase methods",
    ],
    testingNote:
      "Verified against hand computed strings before publishing, including a multi-sentence passage checked mark by mark for sentence case, a doubled internal space confirmed to survive title case unchanged, and a mixed alphanumeric string confirmed to keep the alternating pattern moving only on letters rather than resetting on a space or digit.",
  },

  article: {
    intro: [
      "A text case converter takes whatever casing a block of text arrived in and rewrites it to a different one: upper, lower, sentence, title, or the alternating cAsE some people use for stylised or joke text. Paste in a heading typed in the wrong case, a paragraph pulled from an old spreadsheet, or a reply typed with the caps lock stuck on, and it comes back the way it should read, without retyping a single character.",
      "This is a free text case converter tool with five modes, each a distinct, deterministic transform rather than a guess. Two are a one to one swap of every letter, one looks for sentence boundaries, one looks for word boundaries, and one alternates strictly on letters and ignores everything that is not one. The same input in the same mode always produces the same output.",
    ],

    sections: [
      {
        heading: "How this text case converter handles sentence case",
        body: [
          "Sentence case starts by lowercasing the whole passage, then capitalises exactly two kinds of letter: the very first character of the text, and the first letter that follows a run of sentence ending punctuation, a period, exclamation mark or question mark, once that punctuation is itself followed by whitespace.",
          "A period not followed by a space, inside a decimal number or a URL, is left alone rather than treated as the end of a sentence. A period followed by two spaces still counts as a boundary, since the rule only checks for whitespace, not exactly one space.",
        ],
      },
      {
        heading: "How to convert text to title case without breaking headline style",
        body: [
          "Title case here works on whitespace separated words, not on a style guide's list of major and minor words. Every token between two runs of whitespace gets its first character capitalised and the rest of that token lowercased, and the whitespace between tokens is copied through exactly as it was found.",
          "That is a different rule from the exceptions a copyeditor applies by hand, where a short preposition like of or an article like the is deliberately left lowercase in the middle of a headline. This tool does not apply those exceptions, because they depend on which style guide is in use, not on a fixed rule a function can apply the same way every time.",
        ],
      },
      {
        heading: "Why UPPER CASE and lower case are exact opposites, not two different tools",
        body: [
          "UPPER CASE and lower case are the two simplest transforms this tool offers, because every letter in the passage is treated identically, with no exceptions for the first word or for what follows a period. Anyone searching for an uppercase to lowercase converter online is usually undoing the same problem this tool sees constantly, a paragraph pasted from a source where the caps lock key was on the whole time.",
          "Numbers, punctuation and spacing are untouched by both modes, since neither an uppercase nor a lowercase letter applies to a character that was never a letter in the first place.",
        ],
      },
      {
        heading: "What aLtErNaTiNg CaSe actually alternates on",
        body: [
          "Alternating case is the one mode where a naive implementation and a correct one visibly disagree. A naive version alternates on every character, including spaces, so a single space between two words shifts the rest of the pattern by one position and the letters after it land upper or lower almost at random relative to the word they are in.",
          "This tool alternates only on alphabetic characters. A space, digit or punctuation mark is copied straight through and does not advance the alternation counter, so the letter after a space picks up exactly where the last letter before it left off. Hello World becomes HeLlO wOrLd, not HeLlO WoRlD, because the space is not counted as a turn.",
        ],
      },
      {
        heading: "Common reasons pasted text arrives in the wrong case",
        body: [
          "Wrong casing shows up constantly in ordinary editing work, usually because it was produced by a system that was never trying to write readable prose in the first place.",
        ],
        list: [
          "A CSV or database export that stores every field in UPPER CASE for consistent sorting.",
          "An old email or a chat message typed entirely in lower case, or typed with the caps lock key stuck on.",
          "A CMS or form field that force-capitalises the first letter of every word, turning ordinary sentences into unintended Title Case.",
          "A heading copied from a slide deck that used a different capitalisation convention than the page it is being pasted into.",
        ],
      },
      {
        heading: "What this text case converter does not do",
        body: [
          "It does not know which lowercase words are actually proper nouns. Converting a paragraph to sentence case will also lowercase a name, a brand, or a place unless that word happens to start a sentence, and converting to title case capitalises every word's first letter regardless of whether the source intended a stylised name like eBay or McDonald's to keep its own internal capitalisation.",
          "Used as a sentence case converter online for a paragraph pasted from a caps lock email, it fixes the sentence structure correctly but still leaves proper nouns for a quick manual pass afterward. Guessing at which lowercase word is secretly a name is a judgement call, and that is exactly what a deterministic converter should not attempt.",
        ],
      },
    ],

    howTo: {
      name: "How to use the text case converter",
      steps: [
        {
          name: "Paste or type the text",
          text: "Drop in whatever needs recasing: a heading, an email, a CSV field, a whole paragraph. There is no length limit and nothing is uploaded.",
        },
        {
          name: "Choose the case you want",
          text: "Pick UPPER CASE, lower case, Sentence case, Title Case or aLtErNaTiNg CaSe from the dropdown.",
        },
        {
          name: "Check the result",
          text: "The converted text updates immediately, so you can compare it against the original before copying anything.",
        },
        {
          name: "Copy the converted text",
          text: "Use the copy button to grab the exact output, ready to paste back where it came from.",
        },
        {
          name: "Fix proper nouns by hand if needed",
          text: "Sentence case and lower case flatten a brand or person's name along with everything else. A quick manual scan catches those.",
        },
      ],
    },

    faq: [
      {
        question: "Does this text case converter fix capitalization on names like McDonald's or iPhone?",
        answer:
          "No. Sentence case and lower case treat every letter the same way based only on its position relative to whitespace and punctuation, so a name in the middle of a sentence gets lowercased along with everything around it. A short manual pass after conversion catches any proper noun that needs capitalisation restored.",
      },
      {
        question: "What happens to numbers and punctuation in alternating case?",
        answer:
          "They pass through completely unchanged and are never assigned an upper or lower state, since neither concept applies to a digit or a punctuation mark. More importantly, they do not consume a turn in the alternation sequence, so the letter immediately after a number or a comma continues the pattern exactly where the previous letter left it.",
      },
      {
        question: "Can I use this as a free text case converter tool for a long document?",
        answer:
          "Yes, there is no character limit on the text field, and the conversion runs the same deterministic pass over a short heading or several paragraphs alike. Everything happens locally in your browser as you type, so pasting a longer passage does not send it anywhere or slow the result down noticeably.",
      },
      {
        question: "Why does sentence case sometimes miss a sentence boundary after an abbreviation?",
        answer:
          "The rule looks for a period, exclamation mark or question mark followed by whitespace, and an abbreviation such as Dr. or U.S. also fits that pattern, since its own period is followed by a space before the next word. There is no reliable way to tell an abbreviation's period from a real sentence ending using punctuation alone.",
      },
      {
        question: "Is there a difference between this and an uppercase to lowercase converter online that only does two modes?",
        answer:
          "The upper and lower modes here work the same way any two-mode converter would, but this tool also adds sentence case, title case and alternating case, so a single paste can be tried against all five without switching between separate tools for each one.",
      },
      {
        question: "Does title case know that a short word like of or the should sometimes stay lowercase?",
        answer:
          "No, and this is deliberate. Style guides disagree on which minor words stay lowercase in a headline, so rather than picking one guide's rule and applying it silently, this tool capitalises every word's first letter consistently and leaves any stylistic exception to a human editing pass.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/word-character-counter",
        label: "word character counter",
        description: "Checks length once the casing on a draft is already fixed.",
      },
      {
        href: "/writing-prompts/headline-writing-prompt",
        label: "headline writing prompt",
        description: "For drafting the headline this tool then puts into a consistent title case.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "For the grammar and consistency pass a case conversion alone cannot do.",
      },
      {
        href: "/writing-prompts/ux-writing-prompt",
        label: "ux writing prompt",
        description: "For button and label copy, where a consistent case convention matters as much as the wording.",
      },
    ],

    externalLinks: [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase",
        label: "MDN: String.prototype.toUpperCase()",
        description: "The browser standard this tool's upper and lower case modes are built directly on.",
      },
      {
        href: "https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case",
        label: "APA Style: Title case capitalization",
        description: "One published style guide's rules for which words a title case convention capitalises.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Title_case",
        label: "Wikipedia: Title case",
        description: "A comparison of how several major style guides define title case differently.",
      },
    ],
  },

  tags: ["writing", "editing", "case conversion", "text formatting"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "proofreading-prompt",
  name: "Error Register",
  title: "Proofreading Prompt",
  category: "writing-prompts",
  taskType: "evaluate",
  summary:
    "Returns a locatable error register instead of a corrected draft, counts the document's own conventions before judging consistency, and states what it could not verify.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["proofreading", "editing", "consistency", "quality"],

  seo: {
    primaryKeyword: "proofreading prompt",
    keywords: [
      "proofreading prompt",
      "how to proofread a document with ai",
      "how to catch typos spell check misses",
      "checklist for a final proofread",
    ],
    seoTitle: "Proofreading Prompt: Find Errors, Change No Wording",
    seoDescription:
      "A proofreading prompt that returns an error register rather than a rewrite, counts the document's own conventions before flagging anything, and admits its limits.",
  },

  prompt: {
    text: `You are a proofreader working at the last stage before publication. You do not improve writing. You find errors and report them.

DOCUMENT: {{DOCUMENT}}
SPELLING AND DATE CONVENTION: {{CONVENTION}}
HOUSE RULES THAT OVERRIDE THE DOCUMENT: {{HOUSE}}
DO NOT TOUCH: {{EXCLUDE}}

STEP ONE. Build a consistency profile from the document itself. Count which form wins for each of: any word with two accepted spellings, the hyphenation of each compound, the capitalisation of every product and role name, number style, date format, and quotation marks. Report the counts, for example organise 7, organize 2.

STEP TWO. Report errors as a numbered register. Never print a corrected version of the document. Each entry carries a quoted anchor of at least six words so I can find the place, the exact string at fault, the correction, a class, and a confidence of high or low.

Class is one of SPELLING, GRAMMAR, PUNCTUATION, CONSISTENCY, NUMBER or DUPLICATION. A CONSISTENCY entry must cite the winning count from step one rather than an external style guide, unless a house rule covers it.

Rules. Skip anything in the do not touch list, inside quoted speech, or inside code. Do not propose a better word. Do not comment on rhythm, length or structure. If something is a defensible choice rather than an error, leave it out entirely.

STEP THREE. List what you could not check: claims of fact, the spelling of real names, whether figures agree with their source, and whether links resolve. Name the specific items in this document that fall into each of those categories.`,
    variables: [
      {
        token: "DOCUMENT",
        label: "The text to proofread",
        example:
          "Our data-set covers 1,204 sites across 14 countries. The dataset was compiled in Feburary 2026 by the Site Reliability team, and the site reliability team will refresh it each quarter.",
      },
      {
        token: "CONVENTION",
        label: "Spelling and date convention",
        example: "British English, day month year, no serial comma unless needed for sense",
      },
      {
        token: "HOUSE",
        label: "House rules that override the document",
        example: "Product names always title case. Numbers under ten spelled out except in tables.",
      },
      {
        token: "EXCLUDE",
        label: "Passages not to touch",
        example: "The customer quotations in section 4 and the SQL block in appendix B",
      },
    ],
    expectedOutput:
      "A counted consistency profile, then a numbered register in which every entry can be located from its quoted anchor, no corrected draft appears anywhere, and a closing list names the specific facts, figures and proper nouns that still need a human check.",
    followUps: [
      "Give me only the high confidence entries as a flat find and replace list, in document order.",
      "The consistency profile shows two spellings of the product name at nine and seven. Tell me which sections each cluster falls in, since that suggests two authors.",
      "Recheck the numbers class alone against this source table and tell me which figures I need to verify by hand.",
    ],
    pitfalls: [
      "Models invent plausible errors when the document is clean. A register with forty low confidence entries on two pages is padding, so read the confidence field before the corrections.",
      "Quoted material gets corrected silently unless it is excluded by name. Fixing a typo inside a customer quotation changes the quotation.",
      "The consistency profile is only as good as the sample. On documents under about four hundred words the counts are too small to establish a winner, so state the convention explicitly instead.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Convention has to come from the document. A proofreader with no profile of it imposes whichever spelling and date style the model defaults to, and reports every British form in a British text as an error. Counting the document's own usage first makes consistency an internal measure, and the separate unverifiable step stops names and figures being silently confirmed.",
  },

  article: {
    intro: [
      "A proofreading prompt has one job that every other editing task lacks: it must not change anything. The output is a list of defects, not a better document, and the moment a model returns a cleaned up version you have lost the ability to see what it did.",
      "Most attempts get this wrong because a model asked to proofread will proofread and improve, then present both as one deliverable. The improvements are usually reasonable, which is exactly the problem, since they arrive at the stage where nothing is supposed to move.",
      "The prompt below returns a numbered register with a quoted anchor for every entry, builds its consistency rules by counting what the document already does, and ends by listing what it was not able to verify. That last section is where a proofreading prompt earns its place in a workflow.",
    ],

    sections: [
      {
        heading: "The errors a spell checker cannot see",
        body: [
          "Spell checkers work on words in isolation, so they miss everything that is spelled correctly and wrong anyway. Form for from, manger for manager, public missing a letter, the duplicated the at a line break, a heading that says 2025 in a 2026 report. Every one of these passes a dictionary check because every one is a real word.",
          "Knowing how to catch typos spell check misses needs a reader that holds context, which is what a language model does well. It also needs a reader that will not get bored on page nine, which is what a human does badly. The two failure modes are complementary, and that is the honest case for automating this stage.",
          "The trade is that a model will also confidently report errors that are not there. The confidence field exists for this reason, and so does the rule against suggesting better words: a system that can only report violations of a named class has fewer places to be creative than one asked to review the writing.",
        ],
      },
      {
        heading: "Why the proofreading prompt refuses to rewrite",
        body: [
          "Proofreading without changing the wording is a hard constraint, not a stylistic preference. At this stage the text has been signed off, sometimes legally, and a correction that also tightens a clause has altered an approved document. The register format makes each change a discrete decision that someone applies deliberately.",
          "A clean version handed back instead hides the following, all of which I have seen models do while claiming only to have corrected errors.",
        ],
        list: [
          "Replacing a repeated word with a synonym, on the grounds that the repetition looked accidental.",
          "Expanding a contraction, which shifts formality across the whole document.",
          "Reordering a list into alphabetical order when the original order was by priority.",
          "Standardising a deliberately inconsistent quotation to match the surrounding prose.",
          "Adding a serial comma throughout, in a document whose convention was to omit it.",
        ],
      },
      {
        heading: "Consistency is counted, not imposed",
        body: [
          "Finding inconsistent spelling and hyphenation is most of what a final pass turns up, and it is where an external style guide does the most damage. A document using data set nineteen times and dataset twice has a clear internal convention. Whether Chicago prefers the closed form is beside the point, because the fix is two edits either way and the majority form costs less.",
          "Counting first also produces a diagnostic the register alone does not. When the counts come back close to even, at nine against seven rather than nineteen against two, the document usually had two authors and the split will fall along section boundaries. That is a merge problem rather than a proofreading problem, and it is better discovered before someone starts making individual corrections.",
        ],
      },
      {
        heading: "What the proofreading prompt cannot check",
        body: [
          "Step three is the part people skip and the part I would keep if I had to lose the rest. A model cannot verify that the chief executive's surname is spelled the way her passport spells it, that the revenue figure matches the ledger, or that a footnote points at the paper it claims to. It can spell all three convincingly.",
          "So the register ends with a scoped list of exactly those items in this document. That list is your checklist for a final proofread, and it is short enough to be done properly: four proper nouns, three figures, six links. Anyone learning how to proofread a document with ai should treat that list as the actual output and the corrections as the easy part.",
        ],
      },
    ],

    howTo: {
      name: "How to use the proofreading prompt",
      steps: [
        {
          name: "Run it only when the text is final",
          text: "If sentences are still moving, the register goes stale before you apply it. Finish the line editing, then freeze the document and proofread the frozen version.",
        },
        {
          name: "Exclude quotations and code by name",
          text: "List the sections containing quoted speech, transcript extracts, code and anything reproduced from a source. Those must come through untouched even where they contain genuine errors.",
        },
        {
          name: "Read the consistency profile before the register",
          text: "The counts tell you whether the document has one convention or two. Near even counts mean a merge problem, and correcting the minority form one instance at a time is the wrong response.",
        },
        {
          name: "Apply high confidence entries in one pass",
          text: "Work in document order using the quoted anchors. Low confidence entries go in a second pass where you look at each in context rather than accepting the correction as offered.",
        },
        {
          name: "Verify the step three list by hand",
          text: "Names against a source, figures against the ledger, links by clicking them. Nothing in the model output can substitute for this, and it is where the expensive mistakes live.",
        },
      ],
    },

    faq: [
      {
        question: "Can I paste a whole book or report in one go?",
        answer:
          "Better not to. Recall degrades over long inputs and the consistency counts become unreliable when the model is tracking dozens of compounds. Ten to fifteen pages per run works well, with the convention and house fields kept identical so the registers can be combined afterwards.",
      },
      {
        question: "How is this different from asking a model to check my grammar?",
        answer:
          "A grammar check returns opinions mixed with errors and usually a rewritten version. This returns classified entries with anchors and confidence, which means you can accept a batch without rereading everything, and it declines to comment on anything that is merely a defensible choice.",
      },
      {
        question: "Does the proofreading prompt replace a human proofreader?",
        answer:
          "For internal documents it gets you most of the way. For anything printed, legally binding or public facing, no. A professional catches the error of fact that reads perfectly, notices that a caption describes the wrong image, and knows which convention your readers expect.",
      },
      {
        question: "What should I do about low confidence entries?",
        answer:
          "Treat them as questions rather than corrections. In my experience roughly half are real and the rest are the model pattern matching against a convention your document does not follow. They are still worth reading, because a cluster of them in one section often marks a passage written in a hurry.",
      },
      {
        question: "Should the house rules field ever be empty?",
        answer:
          "Yes, and empty is the better default. With no house rules the model can only judge consistency against the document's own counts, which is the safer behaviour. Add rules when you have a published style guide and someone will check the output against it.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description:
          "The pass that comes before this one. Finish moving sentences there, then freeze the text and proofread it.",
      },
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description:
          "Use earlier still, when a sentence is not wrong but nobody can follow it.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "For turning a recurring consistency profile into the written house rules that populate the override field.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style",
        label: "GOV.UK style guide: A to Z",
        description:
          "A published consistency register covering hyphenation and capitalisation decisions, useful as the model for what the house rules field should contain.",
      },
      {
        href: "https://www.chicagomanualofstyle.org/home.html",
        label: "The Chicago Manual of Style",
        description:
          "The reference an external style adjudication would appeal to, cited to mark why the prompt counts the document instead.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "Documents why an explicit prohibition works better than an implied one, which is what keeps the corrected draft from appearing.",
      },
    ],
  },
};

export default meta;

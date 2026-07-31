import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "word-character-counter",
  name: "Word & Character Counter",
  title: "Word Character Counter",
  category: "writing-content-tools",
  summary:
    "Counts words, characters with and without spaces, and sentences in pasted text, and estimates reading and speaking time, recalculated on every keystroke.",

  seo: {
    primaryKeyword: "word character counter",
    keywords: [
      "word character counter",
      "free online word counter",
      "character count checker tool",
      "how to count words and characters",
      "reading time calculator",
    ],
    seoTitle: "Word Character Counter: Free Words, Characters and Reading Time",
    seoDescription:
      "A free word character counter that counts words, characters with and without spaces, sentences, and reading and speaking time as you type. Nothing is uploaded.",
  },

  fields: [
    {
      kind: "textarea",
      token: "text",
      label: "Text to count",
      help: "Paste or type the passage you want counted. Every figure updates as you edit it.",
      placeholder: "Paste your draft here.",
      example:
        "Our new onboarding guide walks first time users through account setup, the three core features, and where to find help if something goes wrong. It replaces the four separate emails we used to send, and early feedback suggests people finish setup in under five minutes.",
      rows: 6,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: [
      "Standard whitespace tokenisation for word counts",
      "225 words per minute average adult silent reading rate",
      "130 words per minute average spoken delivery rate",
    ],
    testingNote:
      "Verified against hand counted short strings before publishing, including a sentence with repeated spaces and line breaks between words to confirm whitespace splitting does not overcount, an empty and a whitespace only input to confirm both report zero words rather than an error, and a longer paragraph checked against the stated 225 and 130 words per minute figures to confirm reading and speaking time round correctly.",
  },

  article: {
    intro: [
      "A word character counter answers one question precisely: how long is this text, measured the way an editor, a submission form or a script actually measures it. Paste a draft in and it reports the word count, the character count with and without spaces, the sentence count, and how long the passage takes to read or say aloud, recalculated on every keystroke.",
      "A dedicated tool beats eyeballing a draft because the definitions genuinely differ. A word processor's own count can disagree with a submission form's count depending on how each one treats a hyphenated word or a stray double space. Used as a reading time calculator alongside the raw counts, this tool states exactly how it counts each figure, so the number on screen matches what a strict limit will actually enforce.",
    ],

    sections: [
      {
        heading: "How this word character counter counts words",
        body: [
          "Word counting sounds simple until a paste from an email client arrives with three spaces between two words, or a line break where a space should be. A naive counter that just counts spaces reports a higher total than the real number of words, because two adjacent spaces count as two separators rather than one gap.",
          "This tool trims the text first, then splits on any run of whitespace, whether a single space, several spaces, a tab or a blank line, and drops any empty segment the split produces. A sentence with three spaces between two words counts the same as the same sentence typed with a single space, because extra whitespace is never itself a word.",
        ],
      },
      {
        heading: "Why character counts with and without spaces both matter",
        body: [
          "A character limit rarely specifies which kind of count it means, and the two numbers can differ by ten percent or more on ordinary prose. An SMS gateway or a form field with a hard cap almost always counts every character including spaces, so that is the figure to check against a limit stated as a raw character count.",
          "The count without spaces suits comparing writing density, or a platform that strips whitespace before storing a value, such as a username field. This word character counter reports both side by side rather than picking one, since the correct figure depends on which system the text is headed toward.",
        ],
      },
      {
        heading: "How sentence counting works, and where it can be misleading",
        body: [
          "Sentence count here is based on runs of period, exclamation mark or question mark, since those three characters end a sentence in ordinary English prose. A run of punctuation, such as an ellipsis, counts as a single boundary rather than three, and any empty segment the split produces is dropped rather than counted as a sentence with nothing in it.",
        ],
        list: [
          "Abbreviations such as Dr. or U.S. can split what is really one sentence into two, inflating the count slightly.",
          "A list of single word bullet points punctuated with periods counts as several short sentences rather than one.",
          "A question inside quotation marks is counted the same as a plain sentence ending in a question mark.",
        ],
      },
      {
        heading: "Reading time and speaking time are not the same number",
        body: [
          "Reading time and speaking time answer different questions, and this tool keeps them separate rather than reporting one generic estimate. Reading time uses 225 words per minute, a commonly cited figure for an adult reading ordinary prose silently, close to the 238 words per minute a large meta-analysis of reading rate studies found for adult English readers of non-fiction text.",
          "Speaking time uses 130 words per minute, slower and steadier than silent reading because a speaker has to physically produce every syllable rather than skim ahead. Both figures round to the nearest minute and never show as zero, so a single short sentence still reports one minute rather than a number that reads as instant and therefore useless for pacing a script.",
        ],
      },
      {
        heading: "Common word count and character limits worth checking a draft against",
        body: [
          "Most limits a writer runs into are round numbers set by a specific platform rather than a general rule, which is why running a free online word counter over a finished draft first catches a miss early rather than after a rejection.",
        ],
        list: [
          "X and most SMS gateways cap a single message at 280 characters, counted with spaces included.",
          "A meta description is generally kept under 160 characters so it does not get cut off in results pages.",
          "A cover letter commonly runs 250 to 400 words, and a college application essay often has a firm 650 word ceiling.",
          "A press release typically runs 400 to 600 words, short enough to read in under three minutes.",
        ],
      },
      {
        heading: "What a word character counter cannot tell you about writing quality",
        body: [
          "None of these numbers say anything about whether the writing is good. A count is a measurement, not a judgement: an awkward sentence and a clean one can share the same word, character and sentence count.",
          "That is a deliberate limit, not a missing feature. A character count checker tool answers a length question fast and correctly, leaving clarity, grammar and tone to an actual read-through once the length already fits.",
        ],
      },
    ],

    howTo: {
      name: "How to count words and characters accurately before you submit a draft",
      steps: [
        {
          name: "Paste or type the text",
          text: "Drop in a draft, a caption, a message or an essay. The counts update as you type, so there is nothing to submit.",
        },
        {
          name: "Check the word count against your limit",
          text: "Compare the headline figure to whatever cap applies: a minimum for an assignment, or a maximum for a submission form.",
        },
        {
          name: "Check the right character count",
          text: "Use the count with spaces for an SMS or form field limit, and the count without spaces when comparing density.",
        },
        {
          name: "Use reading and speaking time to plan pacing",
          text: "Reading time estimates how long a reader spends on the page. Speaking time estimates the same text read aloud, for a script or a speech.",
        },
        {
          name: "Trim and recheck",
          text: "Cut a sentence and watch every figure update immediately, rather than re-pasting the whole draft into a separate counter each time.",
        },
      ],
    },

    faq: [
      {
        question: "Does this word character counter count a hyphenated word as one word or two?",
        answer:
          "It counts a hyphenated word such as well-known as one word, because the tool splits only on whitespace and a hyphen is not whitespace. This matches how most word processors and submission forms count a hyphenated compound, worth knowing if a strict word count limit sits close to the edge.",
      },
      {
        question: "Why do my characters with spaces and without spaces differ by so much?",
        answer:
          "The gap grows with the number of words in the text, since every space between two words counts once in the with-spaces total and is dropped entirely from the without-spaces total. A short passage with long words shows a smaller gap than one full of short words separated by many spaces.",
      },
      {
        question: "Is 225 words per minute the right reading speed for every kind of text?",
        answer:
          "No. It is a reasonable average for straightforward adult prose, but technical writing or unfamiliar vocabulary reads more slowly, and a large meta-analysis of reading rate studies found adult readers averaging closer to 238 words per minute for easy non-fiction. Treat the reading time figure as a useful estimate, not an exact prediction.",
      },
      {
        question: "Can I use this as a free online word counter for a school essay with a strict word limit?",
        answer:
          "Yes. Paste the essay in and the headline word count is calculated the same way most word processors count words, by splitting on whitespace after trimming the text, so it should closely match the figure a teacher or a submission portal reports for the same draft.",
      },
      {
        question: "How is sentence count different from just counting the periods in my text?",
        answer:
          "Counting raw periods would overcount an abbreviation such as U.S. as several sentence endings and undercount an ellipsis, three periods ending exactly one sentence. This tool treats a run of sentence ending punctuation as a single boundary instead, tracking natural sentence breaks more closely than a raw period count would.",
      },
      {
        question: "Does the tool store or upload the text I paste in?",
        answer:
          "No. Every count is computed locally in your own browser the moment you type or paste, and the text is never sent anywhere, logged or stored, the same guarantee every other tool on this site makes for whatever you enter into its fields.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/cutting-word-count-prompt",
        label: "cutting word count prompt",
        description: "For trimming a draft down to a specific limit once this counter shows how far over it runs.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "For the grammar and clarity pass this counter deliberately does not attempt.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description: "For tightening sentence by sentence once the overall length already fits.",
      },
      {
        href: "/education-prompts/essay-feedback-prompt",
        label: "essay feedback prompt",
        description: "For structural feedback on an essay once it already sits inside its word limit.",
      },
    ],

    externalLinks: [
      {
        href: "https://doi.org/10.1016/j.jml.2019.104047",
        label: "Brysbaert (2019): How many words do we read per minute?",
        description:
          "The meta-analysis of 190 studies behind the adult silent reading rate figure this tool's reading time is checked against.",
      },
      {
        href: "https://ncvs.org/tutorials/voice-qualities/",
        label: "National Center for Voice and Speech: average speech rate",
        description: "Research centre reference for the spoken words per minute figure used for speaking time.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
        label: "MDN: String.prototype.split",
        description: "The whitespace splitting behaviour this tool's word tokenisation is built directly on.",
      },
    ],
  },

  tags: ["writing", "editing", "word count", "readability"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "text-diff-checker",
  name: "Text Diff Checker",
  title: "Text Diff Checker",
  category: "writing-content-tools",
  summary:
    "Compares two blocks of text line by line using a longest common subsequence diff, and reports exactly which lines are unchanged, removed or added.",

  seo: {
    primaryKeyword: "text diff checker",
    keywords: [
      "text diff checker",
      "free text diff checker",
      "online diff checker tool",
      "how to compare two texts",
      "line by line diff checker",
      "compare two texts online",
    ],
    seoTitle: "Text Diff Checker: Free Line By Line Comparison Tool",
    seoDescription:
      "A free text diff checker that compares two blocks of text line by line and reports what was removed, added or left unchanged, computed in your browser.",
  },

  fields: [
    {
      kind: "textarea",
      token: "textA",
      label: "Original text",
      help: "The starting version. Lines removed in the revised text are marked here.",
      placeholder: "Paste the original version of the text.",
      example: "The quick brown fox jumps over the lazy dog.\nA second line here.",
      rows: 8,
    },
    {
      kind: "textarea",
      token: "textB",
      label: "Revised text",
      help: "The updated version. Lines added since the original are marked here.",
      placeholder: "Paste the revised version of the text.",
      example: "The quick brown fox leaps over the lazy dog.\nA second line here.\nA third new line.",
      rows: 8,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Longest common subsequence (LCS) dynamic programming diff algorithm"],
    testingNote:
      "Verified by tracing the dynamic programming table and the backtrace by hand against several short worked examples, including a single line changed in the middle of a passage, a line added at the end, a line removed from the middle, and two short texts sharing no common line at all, before checking the traced result against the automated self tests that ship with this tool.",
  },

  article: {
    intro: [
      "A text diff checker answers one specific question: which lines actually changed between two versions of the same text, and which only look different because everything after a single edit shifted down by a line. Paste an original and a revised version in and it reports every line as unchanged, removed or added, using the same longest common subsequence method behind the Unix diff utility, rather than lining line one up against line one and calling everything after the first edit changed.",
      "As a free text diff checker, this one runs the comparison the moment either box is edited, with no file upload and no size limit beyond what a browser tab can hold. It is built for the ordinary moment a writer or an editor runs into constantly: two drafts, a before and an after, and a need to know what actually moved.",
      "The result shows as two panels. A line only in the original gets a minus in the left panel. A line only in the revision gets a plus in the right panel. A line present in both appears unmarked in both, so the eye lands on what changed rather than the whole passage again.",
    ],

    sections: [
      {
        heading: "How this text diff checker finds real differences, not just changed lines",
        body: [
          "The naive way to compare two texts is to line them up by position: line one against line one, line two against line two. That breaks the moment a single line is inserted or deleted anywhere in the middle, because every line after it is now one position out of step, and a position based comparison reports all of them as changed even though most of the words never moved.",
          "This tool instead finds the longest ordered sequence of lines the two texts share, the longest common subsequence, and treats everything in that shared sequence as unchanged regardless of where it sits in either text. Only the lines outside it are reported as removed or added, which is what lets a single edited line show up as exactly one removal and one addition instead of dragging the rest of the document along with it.",
        ],
      },
      {
        heading: "What a line by line diff checker actually compares",
        body: [
          "Every comparison here happens at the level of a whole line, never a single word or character inside it. Two lines either match exactly, character for character, or they count as entirely different lines. A line by line diff checker built this way is deliberately coarse: it will not underline the one changed word inside a long sentence, only report that the sentence as a whole is different.",
          "That granularity is a real tradeoff, not an oversight. Line level comparison is unambiguous, fast even on a long passage, and matches how most editors and version control systems already think about a document: an ordered list of lines, each kept, removed or added.",
        ],
      },
      {
        heading: "Reading the before and after panels",
        body: [
          "The before panel shows the original with every removed line prefixed by a minus sign. The after panel shows the revision with every added line prefixed by a plus sign. A line that survived unchanged appears in both panels with no prefix, in the same order it holds in each text, so a glance at either panel shows the full document, not only the parts that changed.",
        ],
        list: [
          "A minus prefixed line exists only in the original and was removed.",
          "A plus prefixed line exists only in the revision and is new.",
          "An unprefixed line is identical in both texts and appears in both panels.",
          "The summary line under both panels states the unchanged, removed and added counts.",
        ],
      },
      {
        heading: "What counts as one line, and how blank lines are handled",
        body: [
          "A line is whatever sits between one line break and the next. A trailing space inside a line and a genuinely blank line are both preserved exactly as typed, since either can be the real difference between two versions of a document, such as an extra blank line separating two paragraphs. An empty box counts as zero lines, not one blank line, so a filled box compared against an empty one reports every line as added or removed with no stray extra line in the count.",
          "Comparing one blank box against text is a valid comparison, not an error: every line on the non blank side is reported as added or removed, depending on which side is empty. Only leaving both boxes blank is rejected, since there is nothing left to compare.",
        ],
      },
      {
        heading: "Where a text diff checker matters most",
        body: [
          "Line level comparison turns up anywhere a document exists in two versions and the actual change matters more than a general sense that something is different.",
        ],
        list: [
          "Checking a contract redline against the previous signed version before approving it.",
          "Comparing two drafts of an essay or an article after a revision pass.",
          "Checking an AI generated rewrite against the original to see what it changed.",
          "Confirming a translated document kept every paragraph the source document has.",
        ],
      },
      {
        heading: "What this text diff checker cannot tell you",
        body: [
          "It reports no opinion on whether a change improved the text. A line marked as changed might be a correction, a regression, or a stylistic preference, and only a human reading both versions can judge which. It also will not highlight the specific word inside a changed line, so a one character edit and a completely rewritten line are reported the same way: one line removed, one line added.",
        ],
      },
    ],

    howTo: {
      name: "How to compare two texts and read the line by line result",
      steps: [
        {
          name: "Paste the original text",
          text: "Put the starting version, the one everything else compares against, into the original box.",
        },
        {
          name: "Paste the revised text",
          text: "Put the updated version into the revised box. The comparison runs immediately, with no submit step.",
        },
        {
          name: "Scan the minus and plus prefixed lines",
          text: "A minus prefixed line was removed. A plus prefixed line is new. Everything unprefixed survived unchanged.",
        },
        {
          name: "Check the summary counts",
          text: "The unchanged, removed and added line counts give a quick sense of how large the revision actually was.",
        },
        {
          name: "Edit either box and recheck",
          text: "Rewrite a line and the comparison updates immediately, so a fix can be checked without re-pasting either text.",
        },
      ],
    },

    faq: [
      {
        question: "Does this text diff checker compare word by word or line by line?",
        answer:
          "It compares line by line, never word by word or character by character within a line. Two lines either match exactly or count as entirely different, one removed and one added, even if only a single word inside the line changed. This keeps the comparison fast and unambiguous, at the cost of not underlining the specific word that differs.",
      },
      {
        question: "Why does changing one word in a sentence mark the entire line as different?",
        answer:
          "Because the comparison operates on whole lines, not the words inside them. If one word in a sentence changes, that whole line no longer matches the original character for character, so it is reported as one removed line and one added line rather than a highlighted word inside an otherwise unchanged line.",
      },
      {
        question: "What happens if I compare two texts online with completely different content?",
        answer:
          "Every line in the original is reported as removed, and every line in the revision is reported as added, since the two texts share no line in common for the diff to treat as unchanged. The summary count will show zero unchanged lines alongside the full removed and added counts.",
      },
      {
        question: "Is this a free text diff checker, with no limit on how much text I can paste?",
        answer:
          "Yes. There is no account, no upload and no hard cap built into the tool itself beyond what your own browser tab can comfortably hold in memory, which covers a document, an email thread or a page of code. A very large document, tens of thousands of lines, simply takes a little longer to compute.",
      },
      {
        question: "Does this online diff checker tool store or upload the text I paste in?",
        answer:
          "No. Both texts are compared locally in your own browser the instant you type or paste them, and neither is ever sent anywhere, logged or stored, the same guarantee every other tool on this site makes for whatever is entered into its fields.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/word-character-counter",
        label: "word character counter",
        description: "For the raw word and character counts behind whichever draft comes out longer once a diff shows what changed.",
      },
      {
        href: "/tools/readability-score-checker",
        label: "readability score checker",
        description: "For checking whether a revision this diff checker flags also moved the reading difficulty score.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description: "For the sentence level edit that produces the kind of revision this diff checker is built to compare.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "For the error pass that often precedes the exact before and after comparison this tool runs.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.cs.dartmouth.edu/~doug/diff.pdf",
        label: "Hunt and McIlroy (1976): An Algorithm for Differential File Comparison",
        description: "The original Bell Labs paper describing the longest common subsequence algorithm behind the Unix diff utility this tool's method follows.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Longest_common_subsequence",
        label: "Wikipedia: Longest common subsequence problem",
        description: "An explanation of the dynamic programming approach this tool's line matching is built directly on.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
        label: "MDN: String.prototype.split",
        description: "The line splitting behaviour this tool's text-to-lines step is built directly on.",
      },
    ],
  },

  tags: ["writing", "editing", "diff", "text comparison"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

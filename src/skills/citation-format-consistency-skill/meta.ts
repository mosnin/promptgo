import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Citation Format Consistency Check

Use this skill whenever you are handed a document that cites sources in text, whether as
parenthetical citations, numbered bracket references, or footnotes and endnotes, and you need to
confirm that every citation in it follows one consistent format. This skill checks format only.
It does not check whether a cited source is real, whether a quote pulled from that source is
accurate, or whether the citation actually supports the claim it is attached to. Those are
different jobs handled by other skills. This one asks a single, narrow question of every citation
in the document: does it look like every other citation in the document, or does it not.

## Step 1: Establish the one format the document is held to

Before flagging anything, decide what the correct format actually is. There are exactly two valid
sources for that decision, in this order of priority.

1. A style named explicitly by the person asking for the check: APA, MLA, Chicago, or a numbered
   bracket style. If a style is named, that named style is the standard every citation is checked
   against, even if the document's own first citation happens to depart from it.
2. If no style is named, the document's own first citation sets the standard. Read the document
   from the start and record the exact shape of the first citation encountered: what punctuation
   surrounds it, what order the author name and year appear in, whether it is a name and year pair
   or a bracketed number, and how a multi author citation is joined. That exact shape is the
   pattern every later citation in the document is compared against.

Write this pattern down in plain terms before checking a single further citation. A pattern stated
only as an impression, "looks like APA," is not specific enough to catch a subtle deviation such as
a missing comma or a bracket style swapped from round to square. State the pattern as a literal
example: for instance, opening parenthesis, author surname, comma, four digit year, closing
parenthesis.

## Step 2: Extract every citation instance verbatim

Read the whole document and pull out every in-text citation, footnote marker, or endnote
reference, in the order it appears. Quote each one exactly as it appears in the document,
character for character, including its surrounding punctuation. Do not paraphrase a citation or
normalise its punctuation while extracting it. List every instance found before judging any of
them, so the full set being checked is visible before a single verdict is reached.

## Step 3: Compare every instance against the established pattern

For each citation extracted in step 2, compare it directly against the pattern established in step
1, checking each of these dimensions separately.

- Bracket or punctuation style: round parentheses versus square brackets versus no enclosing
  punctuation at all, and whether the punctuation inside matches, a comma between author and year
  where the pattern calls for one.
- Presence of every required field: an APA or MLA style pattern built on author and year needs
  both present in every instance; a numbered style needs the number present and nothing else
  injected alongside it.
- Author name formatting: full name versus surname only, initials present or absent, and the exact
  joining word or punctuation used for multiple authors, such as an ampersand against the word
  "and."
- Field order: author before year against year before author, or a number placed before the
  citation's punctuation against one placed after it.

A citation that matches the established pattern on every one of these dimensions passes. A
citation that differs on even one dimension is a deviation and must be flagged, no matter how
small the difference looks on a casual read.

## Step 4: Report every deviation with the exact citations quoted

For every citation that deviates from the established pattern, report all three of the following
together, never a summary judgement alone.

1. The deviating citation, quoted exactly as it appears in the document.
2. The established pattern it is being compared against, quoted exactly as recorded in step 1.
3. A precise statement of what specifically is different: the year is missing, the bracket style
   changed from round to square, the author name is formatted differently than the pattern
   requires, the field order is reversed, or whichever specific difference actually applies. A
   vague note such as "this citation looks off" is not an acceptable report; name the exact
   difference.

Close the report with a short count: how many citations were found in total, how many matched the
established pattern, and how many deviated from it.

## What this skill does not do

It does not verify that a cited source actually exists, that a quoted passage attributed to that
source is accurate, or that the citation supports the claim next to it. Checking whether a source
is real and whether a quote from it is genuine is a separate task, covered by a separate skill.
This skill also does not decide which citation style a document should use; it only enforces
whichever style was named or established by the document's own first citation, applied
consistently to every instance that follows.
`;

const WORKED_EXAMPLE_MD = `# Worked example: five citations, four consistent and one deviating

Use this alongside \`SKILL.md\` as a model for how a check should read: the established pattern
stated in literal terms, every citation quoted exactly, and the one deviation named with a precise
reason rather than a general impression.

## The document, as supplied

A short excerpt from a report on regional water usage, containing five in-text citations in the
order they appear.

"Average household consumption has declined for six consecutive years (Alvarez, 2019). This trend
holds even after adjusting for population growth (Kessler, 2021). A parallel study of commercial
usage found a smaller but still measurable decline (Alvarez & Ruiz, 2022). Some of this shift is
attributed to updated fixture standards introduced statewide (Bramwell, 2020). However, one
regional utility reported the opposite trend in its own service area [Kessler 2021], attributing
the increase to new industrial demand."

No citation style was named by the person requesting the check, so the document's own first
citation sets the standard.

## Step 1: Establish the pattern

The first citation encountered is "(Alvarez, 2019)". Its exact shape: an opening parenthesis, the
author's surname, a comma, a four digit year, and a closing parenthesis. That is the established
pattern every later citation is checked against.

## Step 2: Extract every citation instance verbatim

1. "(Alvarez, 2019)"
2. "(Kessler, 2021)"
3. "(Alvarez & Ruiz, 2022)"
4. "(Bramwell, 2020)"
5. "[Kessler 2021]"

## Step 3 and 4: Check each instance and report deviations

**Citation 1**: "(Alvarez, 2019)". Matches the established pattern exactly: round parentheses,
surname, comma, four digit year. Passes.

**Citation 2**: "(Kessler, 2021)". Matches the established pattern exactly on every dimension.
Passes.

**Citation 3**: "(Alvarez & Ruiz, 2022)". Two authors joined with an ampersand, followed by a
comma and a four digit year, inside round parentheses. The established pattern did not include a
multi author example, but the ampersand joining convention is a standard extension of the same
comma and parenthesis shape and does not change the punctuation the single author instances use.
Passes.

**Citation 4**: "(Bramwell, 2020)". Matches the established pattern exactly. Passes.

**Citation 5**: "[Kessler 2021]". This citation deviates from the established pattern on two
separate dimensions.

- Bracket style: the established pattern uses round parentheses. This instance uses square
  brackets instead.
- Missing comma: the established pattern places a comma between the author's surname and the
  year. This instance has no comma between "Kessler" and "2021" at all.

Reported deviation: the citation "[Kessler 2021]" does not match the established pattern
"(Alvarez, 2019)". It differs in two ways: the enclosing punctuation has changed from round
parentheses to square brackets, and the comma that the established pattern places between the
author surname and the year has been dropped entirely. Both changes should be corrected to read
"(Kessler, 2021)" to match every other citation in the document, especially since this is the same
source already cited correctly earlier in citation 2, which makes the inconsistency easy to miss
on a fast read because the name and year are both already familiar to the reader.

## The closing summary, as it should appear in the output

Five citations checked against the pattern established by the document's own first citation,
round parentheses, surname, comma, four digit year, closing parentheses. Four citations matched
the pattern exactly. One citation, "[Kessler 2021]", deviated on bracket style and on a missing
comma between author and year, and should be corrected to "(Kessler, 2021)" to match the rest of
the document.
`;

const meta: SkillMeta = {
  slug: "citation-format-consistency-skill",
  name: "Citation Format Consistency Check",
  title: "Citation Format Consistency Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that checks every in-text citation in a document against one established format, quoting each instance verbatim and naming the exact way any deviation breaks the pattern.",

  seo: {
    primaryKeyword: "citation format consistency skill",
    keywords: [
      "citation format consistency skill",
      "free ai skill to check citation format",
      "downloadable citation consistency checklist",
      "ai skill to check citation style consistency",
      "how to check if citations follow one format",
    ],
    seoTitle: "Citation Format Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable citation format consistency skill that checks every in-text citation in a document against one established format and flags any that deviate.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/citation-format-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Models asked to check a document's citations for consistency tend to notice a dramatic mismatch, one style used throughout and a completely different one used once, but let a single small deviation slide past unflagged: a comma dropped between an author and a year, a bracket style swapped once in a document that otherwise uses parentheses throughout, an author name given in full once where every other instance uses a surname only. The deviation reads as close enough to the surrounding citations that a fast pass treats it as the same pattern. This skill's instructions require the established format to be stated in literal, checkable terms before any citation is judged, and require every deviation to be reported with the exact citation quoted, the pattern it was checked against, and the precise dimension it broke.",
  },

  article: {
    intro: [
      "A citation format consistency skill only earns its name if it catches the deviation that looks close enough to pass on a fast read, not just the one that is obviously wrong. A document that cites five sources in parenthetical author and year format and then switches to a numbered bracket style once, or drops a single comma between a name and a year, still reads smoothly from a distance. This skill checks that kind of document line by line instead of trusting the overall impression.",
      "It ships as two plain text files: instructions defining a four step process, and a worked example walking through five real citations, four consistent and one that deviates on two dimensions, each quoted exactly as it appears. Both are previewable in full before download, exactly what an AI assistant receives once handed the archive, which is what makes it a genuinely free ai skill to check citation format rather than a paid tool locked behind a signup.",
      "The check this skill runs is deliberately narrow. It never asks whether a citation is correct in the sense of pointing to a real, accurately represented source. It asks only whether every citation in the document follows the same format as every other one.",
    ],
    sections: [
      {
        heading: "Why a small formatting drift is easy to miss",
        body: [
          "A document with fifteen citations in a consistent style, and one that quietly swaps to square brackets or drops a comma, does not read as broken. The consistent instances anchor the reader's expectation, and a single deviation slips past because the author name and year inside it are still familiar and correct in substance. Format consistency is a different property from correctness.",
          "A citation format consistency skill is only useful if it checks every single instance against a stated pattern, rather than scanning for the kind of dramatic mismatch that would have been obvious anyway.",
        ],
      },
      {
        heading: "Establishing the one pattern every citation is checked against",
        body: [
          "Before flagging anything, the skill requires a stated standard. If a style is named explicitly, APA, MLA, Chicago, or a numbered bracket style, that named style becomes the standard. If none is named, the document's own first citation sets it, recorded in literal terms: what punctuation encloses it, what order author and year appear in, and how multiple authors are joined.",
          "Writing the pattern down as a specific, checkable example rather than a general label such as 'looks like APA' is what makes a downloadable citation consistency checklist actually work. A vague label cannot catch a missing comma.",
        ],
      },
      {
        heading: "Extracting every citation verbatim before judging any of them",
        body: [
          "The skill reads the whole document once and pulls out every in-text citation, footnote marker, or endnote reference, quoted exactly as it appears, in order. Nothing is paraphrased or normalised during extraction, and no citation is judged until the full list is visible.",
          "This ordering matters as an ai skill to check citation style consistency, because judging citations one at a time while still reading risks anchoring each new judgement on whatever citation came immediately before it.",
        ],
      },
      {
        heading: "Comparing each instance on four separate dimensions",
        body: [
          "Every citation is checked against the established pattern on four dimensions: bracket or enclosing punctuation style, presence of every required field, author name formatting, and field order. A citation matching three dimensions and failing one is still a deviation, flagged for the specific dimension it fails.",
          "This is how to check if citations follow one format without collapsing four kinds of drift into a single vague verdict: a missing year is a different problem from a swapped bracket style, and the report says which one happened.",
        ],
      },
      {
        heading: "Worked example: catching a bracket swap and a missing comma",
        body: [
          "The reference file walks through five citations from a short report on water usage. The first, '(Alvarez, 2019),' sets the pattern: round parentheses, surname, comma, four digit year. Three more citations match it exactly, including one with two authors joined by an ampersand, a natural extension of the same shape.",
          "The fifth citation, '[Kessler 2021],' deviates on two dimensions: the punctuation changed from round parentheses to square brackets, and the comma between surname and year is dropped. Both are named explicitly rather than folded into a single 'this one looks different' note, and the source was already cited correctly earlier, which is why the drift is easy to miss.",
        ],
      },
      {
        heading: "How this differs from checking whether a citation is accurate",
        body: [
          "This skill never asks whether a cited source is real, whether a quoted passage from it is genuine, or whether the citation supports the claim beside it. Those questions belong to the quote attribution verification skill, which checks a quote's exact wording against real source material rather than a citation's punctuation. A citation can pass this skill's check and still misrepresent its source, or be accurate and still formatted inconsistently.",
          "It is also a different check from a cross reference integrity pass, which confirms internal pointers such as 'see Section 3.2' point to a real section in the right direction. This skill never checks whether a citation's target exists at all. It checks only whether the citation's shape matches every other citation's shape.",
        ],
      },
      {
        heading: "How to use the downloaded files",
        body: [
          "Hand both files to an AI assistant together, since the instructions file points to the worked example by its relative path. Keeping the folder structure intact preserves that link once unzipped, and naming a required style up front saves the skill from inferring one from the document's first citation.",
        ],
      },
    ],
    howTo: {
      name: "How to use the citation format consistency skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/citation-format-worked-example.md on this page before downloading, so you know what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Name a required style if the document must follow one",
          text: "If the document must use a specific style, APA, MLA, Chicago, or a numbered bracket style, state that up front so the skill checks against it rather than inferring a pattern from the first citation.",
        },
        {
          name: "Hand both files to your assistant with the full document",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply the complete document so every citation in it gets checked against the established pattern.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill check whether a citation points to a real source?",
        answer:
          "No. It checks only whether a citation's format, its punctuation, field order, and author name style, matches every other citation in the document. Whether the source is real, or a quote pulled from it is accurate, is a separate question this skill does not answer.",
      },
      {
        question: "What happens if the document does not use a named style like APA or MLA?",
        answer:
          "The document's own first citation sets the standard. The skill records that citation's exact shape, punctuation, field order, and author formatting, then checks every later citation against that recorded pattern.",
      },
      {
        question: "Will it flag a citation for a very small difference, like a missing comma?",
        answer:
          "Yes, and that is deliberate. A missing comma or a bracket swapped from round to square is exactly the kind of deviation that reads as close enough to pass on a fast read. The skill checks bracket style, required fields, author formatting, and field order separately.",
      },
      {
        question: "How is this different from the quote attribution verification skill?",
        answer:
          "That skill checks whether a quoted statement's exact wording matches real supplied source material. This skill never checks wording or source accuracy; it checks only whether a citation's format matches the rest of the document. A citation can pass this skill's check and still be flagged by that one, or the reverse.",
      },
      {
        question: "Can it check footnotes and endnotes, not just parenthetical citations?",
        answer:
          "Yes. The skill's instructions cover in-text parenthetical citations, numbered bracket references, and footnote or endnote markers alike, treating whichever form the document uses as the citation instances to compare.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and no document you check with this skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/writing-skills/quote-attribution-verification-skill",
        label: "quote attribution verification skill",
        description: "Checks a quote's exact wording against real source material, a different check than this skill's citation formatting pass.",
      },
      {
        href: "/skills/writing-skills/cross-reference-integrity-skill",
        label: "cross reference integrity skill",
        description: "Confirms that internal pointers such as section references actually point to something real, a related but distinct integrity check.",
      },
      {
        href: "/writing-prompts/essay-feedback-prompt",
        label: "essay feedback prompt",
        description: "A natural document type to run through this skill afterward, since essays with source citations are exactly where formatting drift tends to appear.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "For sentence level and grammar issues once this skill's citation format check has confirmed every citation matches the same pattern.",
      },
    ],
    externalLinks: [
      {
        href: "https://apastyle.apa.org/style-grammar-guidelines/citations",
        label: "APA Style: In-Text Citations",
        description: "The official APA guidance this skill's parenthetical author and year pattern is checked against when APA is the named style.",
      },
      {
        href: "https://www.mla.org/MLA-Style",
        label: "Modern Language Association: MLA Style Center",
        description: "The official MLA style resource, an alternative named standard this skill can check a document against.",
      },
      {
        href: "https://www.chicagomanualofstyle.org/tools_citationguide.html",
        label: "The Chicago Manual of Style: Citation Guide",
        description: "The official Chicago style citation guide, covering both the author-date and notes-bibliography formats this skill can be asked to check against.",
      },
      {
        href: "https://owl.purdue.edu/owl/research_and_citation/ieee_style/ieee_general_format.html",
        label: "Purdue OWL: IEEE General Format",
        description: "An independent guide to the numbered bracket citation style this skill checks when a document uses that format instead of author and year.",
      },
    ],
  },

  tags: ["writing", "citations", "editing", "academic writing", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

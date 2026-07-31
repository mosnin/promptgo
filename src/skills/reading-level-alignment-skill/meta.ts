import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Reading Level Alignment Check

Use this skill when a piece of text has a stated target grade level or a
stated target audience, and the job is to find out whether the text actually
sits at that level, and if not, exactly which sentences are pulling it off
target. This skill does not produce a single aggregate number. It produces a
list of specific sentences, each one quoted, each one paired with the exact
reason it reads harder or easier than the target.

## Required input before checking anything

Refuse to run a reading level check without a stated target. A target is
either a specific grade number ("write this for a grade 7 reading level") or
an audience description that translates to a specific grade using
\`reference/flesch-kincaid-grade-scale.md\` ("general public," "a children's
picture book," "an internal engineering audience"). Do not infer a target
from the text's own apparent difficulty, its topic, or its genre. A dense
paragraph about a simple topic is not evidence of what grade level it was
written for; only a stated target is.

If the audience description given does not map cleanly to a grade band in
the reference file, ask which grade number is intended rather than picking
one. Guessing a target defeats the entire purpose of this skill, which is to
check text against a real standard rather than a vague impression.

## Step one: get or compute the aggregate score

If a Flesch-Kincaid Grade Level score for the text already exists, for
example from a readability tool, use that number. Otherwise compute it
directly: for each sentence, count words and count syllables per word using
the standard vowel-group heuristic (each run of a, e, i, o, u or y counts as
one syllable, a silent trailing e drops one), then apply
0.39 times average words per sentence, plus 11.8 times average syllables per
word, minus 15.59. State this aggregate score and the stated target side by
side before doing anything else.

## Step two: find the sentences actually driving the gap

An aggregate score is an average, so it can hide the truth: a text can sit
close to its target on average while containing three sentences that are
each far too advanced. Go sentence by sentence. For each sentence, compute
its word count and its syllables-per-word ratio. Flag a sentence when either
number sits well outside what the target grade typically supports, using the
bands in \`reference/flesch-kincaid-grade-scale.md\` as the reference point,
not a general sense of what "sounds" hard.

## Step three: report every flag with a quote and a named driver

Every flagged sentence must be reported as: the sentence, quoted exactly as
written, its word count, and the specific driver, either "this sentence runs
to N words against a target band of roughly M" or the specific multi-syllable
or technical words responsible, named individually. A comment such as "this
sentence seems too advanced" without a quoted sentence and a named driver is
not an acceptable output from this skill and should never appear in one.

## Step four: propose a targeted rewrite, not a rewrite of everything

For each flagged sentence, propose one rewrite that shortens it or replaces
the specific words named as drivers, while preserving its meaning. Leave
every sentence that was not flagged untouched. A reading level check that
rewrites the whole passage regardless of which parts already sit on target
has stopped being a diagnostic and become a generic simplification pass,
which is a different job.

## Pairing with an aggregate readability tool

When a readability tool has already produced a Flesch-Kincaid Grade Level
number for the whole passage, treat that number as the starting signal, not
the finished analysis. The number says whether the passage as a whole sits
above, at, or below its target. This skill's job starts after that: turning
"the aggregate score is 2.4 grades above target" into the specific sentences
responsible, so a writer knows exactly what to open and change.

## What this skill does not do

It does not invent a target grade level when none is given. It does not
grade writing quality, argument strength, or grammar; a simple sentence with
a grammar error can still score as easy, and a correct sentence can still
score as hard. It does not rewrite sentences that were never flagged, and it
does not report a mismatch without quoting the exact sentence and naming the
exact driver behind it.
`;

const GRADE_SCALE_MD = `# The Flesch-Kincaid grade scale and common audience targets

Use this alongside \`SKILL.md\` to translate a stated audience into a grade
number, and to judge whether a specific sentence's length or word choice
sits inside or outside its target band.

## The formula

Flesch-Kincaid Grade Level is calculated as 0.39 times the average number of
words per sentence, plus 11.8 times the average number of syllables per
word, minus 15.59. It reads as a US school grade: a result of 7.0 suggests a
seventh grader can follow the passage on a first read, and a result of 14.0
reaches past high school into college level material. Rudolf Flesch
published the original Reading Ease formula, and J. Peter Kincaid and
colleagues recalibrated it into the Grade Level version for the US Navy in
1975, validated against real trainees' reading comprehension rather than
proposed as untested theory.

The same two inputs, sentence length and syllables per word, drive the
score in both directions, but sentence length usually moves it further.
A single twenty-five word sentence dropped into an otherwise simple
paragraph can pull the whole passage's average up by close to a full grade,
which is exactly why an aggregate score alone hides which sentence to fix.

## Typical grade targets by stated audience

- A children's picture book or early reader: grade 1 to grade 3. Sentences
  are typically well under twelve words, and multi-syllable words are rare.
- General public writing, a consumer product page, a support article, or
  patient facing health material: grade 6 to grade 8. Medical and health
  bodies commonly recommend that public facing material not exceed an
  eighth grade reading level, on the basis that a meaningful share of adult
  readers read below that line.
- A newspaper or general interest magazine article: grade 8 to grade 10.
  Sentences mix short, direct statements with an occasional longer one
  carrying a name or a statistic.
- A high school textbook or a workplace policy document written for a
  general employee audience: grade 9 to grade 12.
- A college textbook, an internal technical specification, or a report
  written for a specialist audience already fluent in the subject's
  vocabulary: grade 13 and above, with no real ceiling on the formula
  itself.
- A legal contract, an academic paper, or a regulation: often grade 16 or
  higher, dense with long sentences and technical vocabulary by necessity.

## What to look for at the sentence level once a target is set

For a target in the grade 6 to grade 8 band, treat a sentence running past
roughly twenty words as a candidate for flagging on length alone, and treat
any sentence containing two or more words of four or more syllables as a
candidate for flagging on word choice, even if its overall length is
modest. For a target above grade 13, those same thresholds do not apply;
what counts as a driver shifts upward with the target, which is why a flag
always has to state the target band it is being measured against, not a
fixed universal cutoff.

## Why the target has to be stated, not guessed

Two passages can contain the exact same sentence, and it can be entirely
appropriate for one target and a clear outlier for the other. A twenty-two
word sentence with two technical terms is unremarkable in a grade 13
document and a real problem in a grade 6 one. Every judgment in this
reference only means something once it is anchored to a stated target grade,
which is why \`SKILL.md\` refuses to run a check before that target exists.
`;

const meta: SkillMeta = {
  slug: "reading-level-alignment-skill",
  name: "Reading Level Alignment Check",
  title: "Reading Level Alignment Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that checks whether a text's actual complexity matches its stated target grade level, quoting the specific sentences and naming the specific length or word choice driving any mismatch.",

  seo: {
    primaryKeyword: "reading level alignment skill",
    keywords: [
      "reading level alignment skill",
      "free ai skill for reading level",
      "downloadable reading level checklist",
      "ai skill to check text grade level",
      "flesch kincaid grade level skill",
    ],
    seoTitle: "Reading Level Alignment Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable reading level alignment skill that checks text against a stated grade level and quotes the specific sentences driving any mismatch.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/flesch-kincaid-grade-scale.md", content: GRADE_SCALE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked whether a passage matches a stated grade level reliably report a mismatch in general terms, an aggregate score or a claim that the text 'reads a bit advanced', without identifying which specific sentences are actually driving that score. This skill's step by step process forces every flagged mismatch to trace to a quoted sentence and a named driver, either a specific word count or specific difficult words, and refuses to run at all until a real target grade or audience has been stated.",
  },

  article: {
    intro: [
      "A reading level alignment skill only earns its name if it can point at the exact sentence causing a mismatch, not just report that one exists. Asked whether a passage matches its stated audience, most AI assistants will hand back a single number or a vague impression, 'this reads a bit advanced for a general audience', with nothing a writer can actually open and fix. This skill is built to refuse that shortcut and produce a quoted sentence and a named driver instead.",
      "It ships as two plain text files: a main instructions file that walks through confirming the target, computing the score, finding the driving sentences, and proposing a targeted rewrite, plus a reference file mapping the Flesch-Kincaid grade scale to the audiences that commonly target each band. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant or a teammate receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a stated target grade level is the whole starting point",
        body: [
          "A sentence cannot be judged too advanced in isolation. A twenty-two word sentence with two technical terms is unremarkable in a document written for grade 13 readers and a genuine problem in one written for grade 6 readers. This skill's first instruction is to get a real target, either a specific grade number or an audience description that translates to one, before checking a single sentence.",
          "When the audience given does not map cleanly to a grade band, the skill asks for a number rather than picking one. Guessing the target would defeat the entire purpose of a reading level alignment skill, which exists specifically to check text against a stated standard rather than a vague impression of what sounds hard.",
        ],
      },
      {
        heading: "How the aggregate score gets computed or accepted",
        body: [
          "If a Flesch-Kincaid Grade Level score already exists for the passage, from a readability tool or an earlier pass, this skill uses that number directly rather than recomputing it. Otherwise it works from the same published formula: 0.39 times average words per sentence, plus 11.8 times average syllables per word, minus 15.59, with syllables estimated from the standard vowel-group heuristic.",
          "That aggregate score and the stated target are reported side by side before anything else happens, so the size of the gap is visible from the first line of output, not buried at the end.",
        ],
      },
      {
        heading: "Finding the specific sentences driving the mismatch",
        body: [
          "An aggregate score is an average, and averages hide outliers. A passage can sit close to its target overall while containing two or three sentences that are each considerably harder than the rest. This skill goes sentence by sentence, computing word count and syllables-per-word for each one, and flags any sentence that sits well outside the band its target grade typically supports.",
          "This is the step that separates a downloadable reading level checklist worth using from a tool that only ever reports one number. A single grade level score cannot tell a writer which paragraph to open. A flagged sentence, quoted, can. It is the difference between a generic score and a genuinely free ai skill for reading level work that a writer can act on directly.",
        ],
      },
      {
        heading: "Every flag needs a quote and a named driver",
        body: [
          "This skill's core discipline is that a flagged sentence is always reported as three things together: the sentence quoted exactly as written, its word count, and the specific driver, either the word count itself against the target's typical band, or the specific multi-syllable or technical words responsible, named individually rather than gestured at.",
          "A comment like 'this seems too advanced' with no quoted sentence and no named driver is treated as an unacceptable output. As an ai skill to check text grade level, its entire value is in being specific enough that a writer can act on the flag without asking a follow up question.",
        ],
      },
      {
        heading: "Pairing this skill with a readability score checker tool",
        body: [
          "This site's readability score checker computes the aggregate Flesch Reading Ease and Flesch-Kincaid Grade Level numbers for a pasted passage instantly. That tool answers the first question: is this passage's overall difficulty above, at, or below its target. This skill answers the second question the tool was never built to answer: which specific sentences are responsible, and what exactly about each one is driving the score.",
          "The two are meant to run in sequence. Paste the passage into the tool to get the aggregate number and confirm there is a real gap worth investigating, then hand the same passage and its stated target to this skill to get the sentence level breakdown and the targeted rewrites.",
        ],
      },
      {
        heading: "What this flesch kincaid grade level skill will not do",
        body: [
          "It will not invent a target grade level when none is given, and it will not grade writing quality, argument strength or grammar separately from the two formulas it works from; a grammatically flawed simple sentence can still score as easy, and a correct, precise sentence can still score as hard. It also will not rewrite sentences that were never flagged, keeping every revision targeted to the specific parts of a passage that are actually off target.",
        ],
      },
    ],
    howTo: {
      name: "How to use the reading level alignment skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/flesch-kincaid-grade-scale.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "State a real target grade level or audience",
          text: "Before using the skill, decide the specific grade number or audience description the text needs to match; the skill refuses to run without one.",
        },
        {
          name: "Hand both files, the text and the target to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the grade scale reference, then supply the passage to check and its stated target.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't give this skill a target grade level?",
        answer:
          "The skill refuses to run a check rather than guessing one from the text's apparent difficulty or topic. It asks for either a specific grade number or an audience description it can translate to one using the included grade scale reference, since a mismatch can only be judged against a real stated standard.",
      },
      {
        question: "Does this skill replace a readability score checker tool?",
        answer:
          "No, and it is not meant to. A readability score checker computes the single aggregate Flesch-Kincaid Grade Level number for a passage. This skill starts from that number and finds the specific sentences responsible for any gap from the target, which an aggregate score alone cannot show.",
      },
      {
        question: "How does the skill decide which sentences to flag?",
        answer:
          "It computes word count and syllables per word for every sentence, then flags any sentence that sits well outside the typical band for the stated target grade, using the reference file's bands rather than a general impression of difficulty. A sentence is never flagged without a quoted excerpt and a named driver.",
      },
      {
        question: "Will the skill rewrite my entire document?",
        answer:
          "No. It proposes a targeted rewrite only for sentences it has flagged, and leaves every sentence that already sits within its target band untouched. Rewriting a whole passage regardless of which parts already match the target would defeat the point of a sentence level diagnosis.",
      },
      {
        question: "Can this skill judge whether my writing is actually good?",
        answer:
          "No. Flesch-Kincaid Grade Level measures sentence length and syllables per word, not argument quality, accuracy or grammar. A grammatically flawed simple sentence can still score as easy, and a precise, correct sentence can still score as hard, so this skill deliberately stays inside that narrow, mechanical question.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the text you eventually use the skill on is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/tools/readability-score-checker",
        label: "readability score checker",
        description: "For the aggregate Flesch Reading Ease and Flesch-Kincaid Grade Level score this skill starts from before finding the specific sentences behind it.",
      },
      {
        href: "/education-prompts/lesson-differentiation-prompt",
        label: "lesson differentiation prompt",
        description: "For adapting a lesson to several reading levels at once, a natural next step once this skill has flagged which sentences sit off target.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description: "For rewriting a passage into plain English once this skill's flagged sentences show which specific parts need it.",
      },
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description: "For a broader clarity pass once the specific reading level mismatches this skill finds have been addressed.",
      },
    ],
    externalLinks: [
      {
        href: "https://eric.ed.gov/?id=ED108134",
        label: "Kincaid et al. (1975): Derivation of New Readability Formulas",
        description: "The US Navy technical report, archived by the Department of Education's ERIC database, that derived the Flesch-Kincaid Grade Level formula this skill's instructions apply sentence by sentence.",
      },
      {
        href: "https://readabilityformulas.com/flesch-grade-level-readability-formula.php",
        label: "Readability Formulas: Flesch-Kincaid Grade Level Formula",
        description: "An independent explainer walking through the grade level formula's terms and how a resulting score maps to a school grade.",
      },
      {
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7435342/",
        label: "PMC: Comparison of Readability of Official Public Health Information",
        description: "A peer reviewed article citing the AMA, NIH and CDC recommendation that public facing material not exceed an eighth grade reading level, the basis for this skill's general public target band.",
      },
    ],
  },

  tags: ["education", "readability", "reading level", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

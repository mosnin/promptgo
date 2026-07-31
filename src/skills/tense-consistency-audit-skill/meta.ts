import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Tense Consistency Audit

Use this skill whenever you are asked to review a piece of narrative or
instructional writing, a case study, a blog post, a set of how-to
instructions, a short story, an incident report, or any other prose where
verb tense should stay consistent within a passage, and check it for
unjustified tense shifts.

## The checkable method

Read the text sentence by sentence. For each distinct passage (a paragraph,
a scene, a numbered step sequence, a section under one heading), identify
the tense that passage has established: the tense the majority of its
finite verbs use, judged from the first two or three sentences that set the
pattern. A case study narrating past events typically establishes past
tense. A how-to's numbered instructions typically establish present tense
("open the settings menu," "the system saves your changes"). A prediction
or a plan typically establishes future tense.

Once a passage's established tense is identified, check every following
sentence in that passage against it. A sentence whose main, finite verb sits
in a different tense from the one the passage established is a candidate
for a flag.

## The three grammatically justified reasons a shift is allowed

Not every tense change is an error. Before flagging a shift, check whether
it falls into one of these three categories. If it does, the shift is
justified and must not be flagged.

1. **A quotation.** Direct speech, quoted dialogue, or a quoted source keeps
   whatever tense the speaker actually used, independent of the surrounding
   passage's tense. "She said, 'I am staying until Friday,'" inside a past
   tense narrative is correct: the quoted words are not part of the
   narrating voice.
2. **A general truth or standing fact.** A sentence stating something true
   regardless of when the story takes place is conventionally present tense
   even inside past tense narration. "He remembered that water boils at a
   lower temperature at altitude" correctly mixes tenses because the boiling
   point is a standing fact, not an event in the story.
3. **An explicit time jump signal.** A word or phrase that plainly marks a
   deliberate shift to a different point in time, such as "now," "today,"
   "these days," "later," "years afterward," or "in the years since,"
   licenses a tense change for the sentences that follow it, because the
   passage is deliberately moving to a different narrative moment.

Any tense shift that is not covered by one of these three reasons is
unjustified and must be flagged.

## What every flag needs

For every flagged sentence, report all four of the following. A flag
missing any one of these four is not complete and should not be reported as
a finding.

1. The exact sentence, quoted verbatim from the source text.
2. The tense that sentence's main verb is actually in.
3. The tense the surrounding passage established, quoted from an earlier
   sentence in the same passage as evidence.
4. A one line reason the shift is not covered by any of the three justified
   categories.

Do not report a shift as a finding based on a general sense that "the tense
feels wrong." Every flag must trace to the passage's own established
pattern, never to an assumption about what tense the document should use.

## Working only from the text supplied

Never assume or invent what tense a document "should" be in based on its
genre or title alone. The established tense for any passage is discovered
by reading that passage's own sentences, never assigned in advance. A case
study is not required to be past tense; if its own opening sentences are
written in present tense throughout, present tense is that passage's
established pattern, and only a shift away from present tense gets flagged.

## Output format

List each flag as: the quoted sentence, its tense, the passage's established
tense, and the reason the shift is unjustified. Close with a one line count
of sentences read, passages identified, and shifts flagged, so the pass is
auditable rather than a vague impression.

## How this differs from a passive voice or style guide check

This skill checks one specific axis: whether a sentence's verb tense matches
the tense its own surrounding passage has already established, and whether
any mismatch is grammatically justified. It does not check whether a
sentence is passive or active voice, a different grammatical axis entirely,
covered by a dedicated passive voice audit skill instead. It also does not
check mechanical house style rules such as commas, capitalization, or
number formatting against a named guide, which a dedicated editorial style
guide enforcement skill covers. A passage can be perfectly consistent in
tense and still be full of unnecessary passive constructions, or perfectly
active and still shift tense without justification. Run this skill for
tense, and the other two for their own separate axes.

## What this skill does not do

It does not rewrite the whole passage into one tense on the assumption that
consistency always means uniformity. Quoted speech, standing facts, and
explicit time jumps are meant to differ from the surrounding tense, and
forcing them into line with the rest of the passage would make the writing
wrong, not right. This skill's value is the sentence by sentence check
against the passage's own established pattern, not a blanket find and
replace of every verb.
`;

const WORKED_EXAMPLE_MD = `# Worked example: a tense consistency pass

This is a fully worked example demonstrating the method in \`SKILL.md\`, run
against a two-passage sample text. Use it as a calibration reference: when a
real sentence resembles one of the patterns below, treat it the same way.

## The sample text

**Passage 1, a case study narrative:**

"The support team rolled out the new ticketing system in March. Response
times fell within the first week. The lead engineer said, 'We expect this
to keep improving.' By April, the average resolution time drops to under
two hours. Complaints about slow replies had almost disappeared by then."

**Passage 2, how-to instructions:**

"Open the account settings panel first. Click the billing tab near the top
of the page. The system saved your new payment method automatically.
Confirm the change by checking the confirmation banner."

## Passage 1 walked through sentence by sentence

1. "The support team rolled out the new ticketing system in March." Past
   tense ("rolled out"). This is the first sentence of the passage, so it
   sets the established tense: past.
2. "Response times fell within the first week." Past tense ("fell").
   Matches the established tense. No flag.
3. "The lead engineer said, 'We expect this to keep improving.'" The
   reporting verb "said" is past tense and matches the established pattern.
   The quoted words "We expect this to keep improving" are present tense,
   but they sit inside a direct quotation, one of the three justified
   categories. Not flagged.
4. "By April, the average resolution time drops to under two hours."
   Present tense ("drops"). The established tense for this passage is past.
   This sentence contains no quotation, no general truth, and no explicit
   time jump signal: "by April" names a point on the story's own past
   timeline, it does not mark a deliberate jump to the narrator's present
   the way "now" or "today" would. This is an unjustified shift. Flag it.
   - Sentence: "By April, the average resolution time drops to under two
     hours."
   - Tense used: present.
   - Passage's established tense: past, set by sentence 1 ("rolled out")
     and confirmed by sentence 2 ("fell").
   - Why unjustified: no quotation, no general truth, and "by April" is a
     past story date, not a present tense signal like "now" or "today."
5. "Complaints about slow replies had almost disappeared by then." Past
   perfect ("had disappeared"), a past tense form. Matches the established
   tense. No flag.

## Passage 2 walked through sentence by sentence

1. "Open the account settings panel first." Imperative, present tense
   instruction. This is the first sentence of the passage, so it sets the
   established tense: present.
2. "Click the billing tab near the top of the page." Present tense
   imperative. Matches. No flag.
3. "The system saved your new payment method automatically." Past tense
   ("saved"). The established tense for this passage is present. No
   quotation, no general truth, no explicit time jump signal appears in
   this sentence. This is an unjustified shift. Flag it.
   - Sentence: "The system saved your new payment method automatically."
   - Tense used: past.
   - Passage's established tense: present, set by sentence 1 ("open") and
     sentence 2 ("click").
   - Why unjustified: a how-to step describing what the system does when
     the reader performs the action should stay present tense, like "the
     system saves your new payment method automatically." Nothing in the
     sentence marks a deliberate jump to a past event.
4. "Confirm the change by checking the confirmation banner." Present tense
   imperative. Matches. No flag.

## Summary of this pass

- Sentences read: 9.
- Passages identified: 2.
- Shifts flagged: 2 (passage 1 sentence 4, passage 2 sentence 3).
- Shifts checked and correctly left unflagged as justified: 1 (the quoted
  dialogue in passage 1 sentence 3).

## What made the quoted dialogue different from the two flagged sentences

The two flagged sentences had no quotation marks, no general truth, and no
explicit time jump word marking a deliberate move to a different point in
time. The unflagged quotation kept the speaker's own words exactly as
spoken, never judged against the surrounding narration's tense. This is the
dividing line the method in \`SKILL.md\` applies: a shift is justified only
when it traces to one of the three named categories, with quoted evidence,
not to a general sense that a sentence "sounds fine anyway."
`;

const meta: SkillMeta = {
  slug: "tense-consistency-audit-skill",
  name: "Tense Consistency Audit",
  title: "Tense Consistency Audit Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that reads a piece of writing passage by passage, tracks the verb tense each passage has established, and flags only the sentences that shift tense without one of three grammatically justified reasons.",

  seo: {
    primaryKeyword: "tense consistency audit skill",
    keywords: [
      "tense consistency audit skill",
      "free ai skill for tense consistency",
      "downloadable verb tense checklist",
      "ai skill to flag tense shifts",
      "verb tense checker for ai assistant",
    ],
    seoTitle: "Tense Consistency Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable tense consistency audit skill that tracks each passage's established verb tense and flags every unjustified shift, sentence quoted.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check a document for tense consistency tend to either flag every verb that is not the passage's dominant tense, including quoted speech and general truths that are correctly different, or wave through a genuine mid-paragraph drift because no single sentence looks wrong in isolation. This skill's three named justified categories and its requirement to quote the passage's own established tense as evidence before flagging anything narrows the check to shifts that are actually unjustified.",
  },

  article: {
    intro: [
      "A tense consistency audit skill only earns its name if it can tell an unjustified tense shift from a deliberate, grammatically justified one, because flagging every sentence that is not the dominant tense of a passage produces noise, not a real audit. This skill reads a piece of writing sentence by sentence, identifies the tense each distinct passage has already established, and flags only the sentences that shift away from that established tense without one of three specific, checkable reasons.",
      "It ships as two plain text files: a main instructions file that defines the method and the three justified reasons a shift is allowed, and a fully worked reference example that shows two unjustified shifts flagged and one justified shift correctly left alone. Both are previewable in full on this page before you download the .zip.",
      "This is a free ai skill for tense consistency built for one grammatical axis: whether a sentence's tense matches what its own surrounding passage has already established. It does not check passive voice or house style mechanics, different jobs covered by two other skills in this catalogue.",
    ],
    sections: [
      {
        heading: "The checkable method: reading passage by passage",
        body: [
          "The skill never opens with an assumption about what tense a document should be in. It reads the first two or three sentences of each distinct passage, a paragraph, a scene, a numbered step sequence, and identifies which tense the majority of that passage's finite verbs already use. A case study narrating past events typically establishes past tense; a how-to's numbered steps typically establish present tense.",
          "Every following sentence in the same passage is then checked against that established tense. This is what makes the skill an ai skill to flag tense shifts rather than a blunt search for any sentence using a particular verb form somewhere in the document.",
        ],
      },
      {
        heading: "The three grammatically justified reasons a shift is allowed",
        body: [
          "Not every tense change is an error, so the method names exactly three cases where a shift is justified and must not be flagged: a direct quotation keeping the speaker's own original tense, a general truth stated in present tense regardless of the surrounding narration, and an explicit time jump signal such as 'now,' 'later,' or 'in the years since' that marks a deliberate move to a different point in time.",
          "Any shift that does not trace to one of these three named reasons is unjustified. Keeping the list to exactly three, rather than a vague 'unless it makes sense,' keeps the audit checkable by a second person afterward.",
        ],
      },
      {
        heading: "What every flag needs",
        body: [
          "A flag from this tense consistency audit skill is only complete when it reports all four required parts: the exact sentence quoted verbatim, the tense that sentence is actually in, the tense the surrounding passage established, quoted as evidence, and a one line reason the shift fails all three justified categories. A flag missing any one of these four is an impression, not a finding.",
          "The reference file works through a full worked example against this exact structure, functioning as a downloadable verb tense checklist you can hold a real flag up against before trusting it.",
        ],
      },
      {
        heading: "Why the skill never assumes what tense a document should be",
        body: [
          "Genre is not a rule. A case study is not required to be past tense, and a set of instructions is not required to be present tense; the established tense for any passage comes only from reading that passage's own opening sentences, never from an assumption about what that kind of document usually looks like.",
          "A check built on an assumed convention will confidently flag a passage that never actually shifted tense at all, only differed from what the checker expected going in.",
        ],
      },
      {
        heading: "How this differs from a passive voice or style guide check",
        body: [
          "Tense consistency is one specific grammatical axis: whether a sentence's verb tense matches what its own passage already established. It is not whether a sentence is passive or active voice, which this catalogue's passive voice audit skill covers, and not whether commas, capitalization, or number formatting follow a named house style, which the editorial style guide enforcement skill covers.",
          "A passage can be perfectly consistent in tense and still be full of unnecessary passive constructions, or perfectly active voice and still drift from past to present tense without justification. Each of the three skills checks its own axis and none substitutes for the other two.",
        ],
      },
      {
        heading: "Using the downloaded files as a verb tense checker for ai assistant work",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file's method and its worked reference example are meant to be read side by side. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link once the files are unzipped on your own machine, and works as a verb tense checker for ai assistant workflows without any change to the method itself.",
        ],
      },
    ],
    howTo: {
      name: "How to use the tense consistency audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know the method and the three justified categories before you use them.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Hand the skill a piece of writing",
          text: "Give your assistant both files together with the narrative or instructional text you want checked, whether a case study, a blog post, a story, or a set of how-to steps.",
        },
        {
          name: "Review each flag against its evidence",
          text: "Confirm each flagged sentence's quoted tense against the passage's own quoted established tense before accepting the flag, and leave any shift marked justified exactly as written.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill flag every sentence that is not in the passage's dominant tense?",
        answer:
          "No. This tense consistency audit skill only flags a sentence whose tense differs from the passage's established tense and does not fall into one of three justified categories: a quotation, a general truth, or an explicit time jump signal. A quoted line of dialogue in a different tense is expected to differ and is never flagged on that basis alone.",
      },
      {
        question: "What counts as a grammatically justified tense shift?",
        answer:
          "Three specific cases: direct speech or a quoted source keeping the speaker's own original tense, a general truth or standing fact stated in present tense inside a differently tensed passage, and an explicit time jump signal such as 'now,' 'later,' or 'in the years since' that plainly marks a deliberate move to a different point in time.",
      },
      {
        question: "How is this different from the passive voice audit skill?",
        answer:
          "Tense consistency and passive voice are two separate grammatical axes. This skill checks whether a sentence's verb tense matches what its own passage established; the passive voice audit skill checks whether the sentence's subject performs or receives the action. A sentence can fail one check, both, or neither, independently.",
      },
      {
        question: "Does this skill assume a case study must be past tense or a how-to must be present tense?",
        answer:
          "No. The established tense for any passage is discovered from that passage's own opening sentences, never assigned in advance from genre or title. If a case study's own sentences happen to be written in present tense throughout, present tense is what the rest of that passage is checked against.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no text you eventually review with this skill is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens afterward in your own editor or in this site's skill building tools.",
      },
      {
        question: "Does the skill rewrite the flagged sentences for me?",
        answer:
          "The instructions focus on producing a complete, evidence-backed flag, quoted sentence, its tense, the passage's established tense, and the reason the shift is unjustified, rather than an automatic rewrite, since the correct fix depends on which tense the writer actually intended for that passage.",
      },
    ],
    internalLinks: [
      {
        href: "/writing-skills/passive-voice-audit-skill",
        label: "passive voice audit skill",
        description: "A different grammatical axis entirely, voice rather than tense, and a natural companion pass on the same draft.",
      },
      {
        href: "/writing-skills/editorial-style-guide-enforcement-skill",
        label: "editorial style guide enforcement skill",
        description: "For mechanical house style rules like commas and capitalization, a separate job from checking verb tense.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description: "A natural next pass once flagged tense shifts have already been resolved sentence by sentence.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "For seeing exactly what changed between a draft and its tense-corrected rewrite, line by line.",
      },
    ],
    externalLinks: [
      {
        href: "https://owl.purdue.edu/owl/general_writing/grammar/verb_tenses/index.html",
        label: "Purdue OWL: Verb Tenses",
        description: "An independent reference on English verb tense forms and their conventional narrative uses.",
      },
      {
        href: "https://writingcenter.unc.edu/tips-and-tools/verb-tenses/",
        label: "UNC Writing Center: Verb Tenses",
        description: "Guidance on choosing a consistent tense for a piece of writing and where a deliberate shift is appropriate.",
      },
      {
        href: "https://www.grammarly.com/blog/verb-tense-consistency/",
        label: "Grammarly: Verb Tense Consistency",
        description: "An independent explainer on keeping verb tense consistent within a passage and common shift mistakes.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to tense review.",
      },
    ],
  },

  tags: ["writing", "editing", "verb tense", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

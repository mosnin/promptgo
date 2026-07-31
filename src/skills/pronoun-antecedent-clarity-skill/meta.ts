import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Pronoun Antecedent Clarity Check

Use this skill whenever you are asked to review a real piece of writing, an
email, an article, a report, a set of documentation, a script, or any other
prose, for pronouns whose antecedent a reader could genuinely misread. This
is a narrow, single axis check. It does not judge tone, grammar generally,
verb tense, passive voice, or mechanical style. It checks one thing: can a
reader tell, from the text alone, exactly which noun each pronoun points
back to.

## The six pronouns this skill tracks

Read the text sentence by sentence. For every sentence containing one of
these six pronouns, it, this, that, they, these, those, stop and look back
at that sentence and the one or two sentences immediately before it for
every noun the pronoun could plausibly stand in for. Do not track other
pronouns such as he, she, we, or I; those carry their own separate gender
and person cues that are outside this skill's scope.

## The two ways a pronoun becomes genuinely ambiguous

A pronoun only gets flagged when it falls into one of these two cases. A
pronoun that does not fall into either case is left alone, even if it is
technically vague in the abstract.

1. **Multiple candidate nouns.** More than one noun in the preceding
   sentence or sentences is a grammatically and semantically plausible
   referent for the pronoun, and nothing in word order, number, or the
   immediate context of the sentence rules any of them out. If two nouns
   are both singular, both capable of performing the verb that follows the
   pronoun, and nothing narrows the field to one, the antecedent is
   genuinely ambiguous.
2. **A whole idea, with no single noun stated.** The pronoun, almost always
   "this" or "that," refers back to an entire preceding action, decision,
   or situation rather than to any specific noun phrase that was actually
   written in the text. Flag this only when a reader could reasonably ask
   "what exactly does that refer to," not merely because the reference is
   broad. A broad reference that a reader would resolve instantly without
   friction is not what this skill exists to catch.

## What every flag needs

For every sentence that is flagged, report all of the following. A flag
missing any one of these parts is incomplete and should not be reported as
a finding.

1. The exact sentence containing the pronoun, quoted verbatim from the
   source text.
2. The pronoun itself, named directly.
3. Every candidate antecedent, each quoted verbatim as it actually appears
   in the text, never paraphrased.
4. A one line reason a reader could genuinely pick either candidate, or, for
   a whole idea reference, a one line reason no single noun in the prior
   text stands in for what the pronoun is pointing at.

## What this skill never does

It never proposes a rewrite of the flagged sentence. It never guesses which
candidate the writer actually meant and presents that guess as the answer.
Deciding what the writer intended requires asking the writer, not inferring
from a plausible reading; this skill's entire job stops at naming the
ambiguity and the candidates, not resolving it. It also never flags a
pronoun that has exactly one plausible antecedent, even when a stricter
style guide might prefer the sentence be rewritten anyway. A pronoun with
one clear referent is not this skill's concern.

## Working only from the text supplied

Never invent context that was not written down. If a candidate antecedent
could be ruled out only by knowledge outside the text, such as who the
writer likely meant based on an email thread the reader was not shown, do
not use that outside knowledge to resolve the ambiguity silently. The check
runs against the text as given, not against assumed shared context.

## Output format

List each flag in order of appearance: the quoted sentence, the pronoun,
the quoted candidate antecedents, and the reason for the ambiguity. Close
with a one line count: how many sentences were read, how many pronouns from
the six tracked were found, and how many were flagged as ambiguous. This
count is what turns a subjective pass into an auditable one, and it also
makes clear that most pronouns in ordinary writing are not ambiguous at all.

## How this differs from other checks in this catalogue

This skill checks exactly one axis: whether a reader can tell which noun a
pronoun refers to. It does not check whether a sentence's subject performs
or receives the action, a separate axis covered by a dedicated passive
voice audit skill. It does not check whether a sentence's verb tense
matches what its own passage established, covered by a dedicated tense
consistency audit skill. It does not check commas, capitalization, or
number formatting against a named house style, covered by a dedicated
editorial style guide enforcement skill. A sentence can pass every one of
those checks and still leave a reader unsure which noun "it" or "they"
points to, and a sentence can have a perfectly clear pronoun while failing
any of the other three checks. Run this skill for pronoun clarity, and the
others for their own separate axes.
`;

const WORKED_EXAMPLE_MD = `# Worked example: a pronoun antecedent clarity pass

This is a fully worked example demonstrating the method in \`SKILL.md\`, run
against a short three sentence sample. Use it as a calibration reference:
when a real sentence resembles one of the patterns below, treat it the same
way.

## The sample text

"The vendor's team briefed our engineers on the new API before they signed
the updated contract. The rollout had already been delayed twice and the
budget was already tight. This convinced the steering committee to pause
the project instead of extending the deadline again. The intern printed the
handout and stapled it before the meeting started."

## Sentence one, walked through

Sentence: "The vendor's team briefed our engineers on the new API before
they signed the updated contract."

Pronoun: "they."

Candidate antecedents: "the vendor's team" and "our engineers." Both are
plural noun phrases in the same sentence, and both are plausible signers of
a contract. A vendor's team plausibly signs the contract it is delivering
under, and a client's engineering team plausibly signs the contract it is
receiving work under. Nothing in the sentence's word order, number, or
surrounding context rules either one out.

Why a reader could be confused: without knowing which party actually signs
this kind of contract in this organization, a reader has no way to tell,
from the sentence alone, whether "they" means the vendor's team or our own
engineers. This is flagged as an ambiguous pronoun with multiple candidate
antecedents.

## Sentence two and three, read together

Sentence: "This convinced the steering committee to pause the project
instead of extending the deadline again."

Pronoun: "this."

Looking back at the immediately preceding sentence, "The rollout had
already been delayed twice and the budget was already tight," there is no
single noun phrase that "this" stands in for. It is not "the rollout," not
"the budget," and not "twice." It refers to the whole situation described
by that sentence, the combination of repeated delay and tight budget
together.

Why a reader could be confused: a reader cannot tell, from the text alone,
whether the committee was convinced primarily by the repeated delays, by
the tight budget, or by both together, since "this" is doing the work of
naming a decisive cause without stating what that cause actually was. This
is flagged as an ambiguous pronoun referring to a whole idea with no single
noun stated.

## Sentence four, walked through

Sentence: "The intern printed the handout and stapled it before the
meeting started."

Pronoun: "it."

Candidate antecedents in the sentence: "the handout" is the only noun that
"it" could plausibly stand in for. "The intern" is a person and cannot be
stapled, and "the meeting" has not been introduced yet at the point "it"
appears, so it is not a candidate either. Only one plausible referent
exists.

Why this is not flagged: with exactly one grammatically and semantically
plausible candidate, there is nothing for a reader to be confused about.
The pronoun "it" resolves to "the handout" immediately and without
friction, so this sentence is correctly left alone.

## Summary of this pass

- Sentences read: 4.
- Tracked pronouns found: 3 ("they," "this," "it").
- Flagged as ambiguous: 2 (sentence one's "they," sentence three's "this").
- Checked and correctly left unflagged: 1 (sentence four's "it").

## What made the fourth sentence different from the first two

The first two flagged sentences each had more than one plausible candidate,
or no single stated noun at all, and a reader genuinely could not resolve
either pronoun from the text alone. The fourth sentence had exactly one
noun in the sentence capable of being the referent, since a person cannot
be stapled and the meeting had not yet been mentioned. This is the line the
method in \`SKILL.md\` draws: a pronoun gets flagged only when a real reader,
working only from the words on the page, would genuinely be unable to pick
one answer, not whenever a pronoun is present at all.
`;

const meta: SkillMeta = {
  slug: "pronoun-antecedent-clarity-skill",
  name: "Pronoun Antecedent Clarity Check",
  title: "Pronoun Antecedent Clarity Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that reads real writing sentence by sentence, flags only the pronouns whose antecedent a reader could genuinely misread, quotes every candidate noun, and never rewrites the sentence or guesses what the writer meant.",

  seo: {
    primaryKeyword: "pronoun antecedent clarity skill",
    keywords: [
      "pronoun antecedent clarity skill",
      "free ai skill for pronoun ambiguity",
      "downloadable pronoun antecedent checklist",
      "ai skill to flag ambiguous pronouns",
      "pronoun clarity checker for ai assistant",
    ],
    seoTitle: "Pronoun Antecedent Clarity Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable pronoun antecedent clarity skill that flags ambiguous pronouns in real writing, quotes each candidate noun, and never rewrites your sentence.",
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
      "Models asked to check writing for unclear pronouns tend to either flag nearly every occurrence of it, this, that or they on principle, burying the handful of genuine problems in noise, or silently resolve an ambiguous pronoun by guessing which candidate the writer probably meant and presenting that guess as fact. This skill's two named categories, multiple plausible candidates or a whole idea with no stated noun, keep a flag limited to real ambiguity, and its instructions explicitly forbid proposing a rewrite or a guessed resolution.",
  },

  article: {
    intro: [
      "A pronoun antecedent clarity skill only earns its name if it can tell a genuinely ambiguous pronoun from an ordinary one, because a check that flags every occurrence of it, this, that, they, these and those is not auditing anything, it is pattern matching against six common words. This skill reads a piece of writing sentence by sentence, tracks exactly those six pronouns, and flags a sentence only when more than one noun in the preceding text is a plausible antecedent, or when the pronoun points at a whole idea with no single noun stated at all.",
      "It ships as two plain text files: a main instructions file defining the two ambiguity categories and what every flag must contain, and a worked reference example that flags two genuinely ambiguous pronouns and correctly leaves a third, unambiguous pronoun alone. Both are previewable in full on this page before you download the .zip, exactly what a teammate or an AI assistant receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "Why flagging every pronoun is not a real clarity check",
        body: [
          "Most sentences containing it, this, that, they, these or those have exactly one plausible antecedent, and a reader resolves the reference instantly without noticing they did it. A check that treats every one of the six tracked pronouns as suspect produces a wall of findings a person has to wade through, most of which point at nothing genuinely confusing, and the real ambiguity gets lost in the noise.",
          "This skill's method starts from the opposite assumption: a pronoun is only a finding when a real reader, working only from the text on the page, could genuinely land on more than one answer. A free ai skill for pronoun ambiguity built this way stays useful precisely because most of what it reads gets left alone.",
        ],
      },
      {
        heading: "The two categories a genuinely ambiguous pronoun falls into",
        body: [
          "Every flag traces to one of two named categories. The first is multiple candidate nouns: more than one noun in the preceding sentence or sentences is grammatically and semantically capable of being the antecedent, and nothing in word order, number or immediate context narrows the field to one. The second is a whole idea reference: the pronoun, almost always this or that, points back at an entire preceding action or situation rather than any single noun phrase that was actually written down.",
          "Keeping the check to exactly two named categories, rather than a vague sense that a pronoun 'feels unclear,' is what makes this a genuine ai skill to flag ambiguous pronouns instead of a subjective read-through dressed up as an audit.",
        ],
      },
      {
        heading: "What a complete flag actually contains",
        body: [
          "A flag from this skill always has four parts: the exact sentence containing the pronoun, quoted verbatim, the pronoun itself named directly, every candidate antecedent quoted exactly as it appears in the source text, and a one line reason a reader could genuinely pick more than one candidate or find no single noun to land on. A flag missing any one of these four parts is treated as incomplete, not as a finding worth reporting.",
          "The worked reference file demonstrates this structure against a real sample, a multiple candidate case where 'they' could mean either the vendor's team or the client's engineers, and functions as a downloadable pronoun antecedent checklist you can hold a real flag up against before trusting it.",
        ],
      },
      {
        heading: "What this skill deliberately refuses to do",
        body: [
          "It never rewrites the flagged sentence, and it never guesses which candidate the writer actually meant and presents that guess as the resolved answer. Deciding intent belongs to the writer, not to a plausible sounding inference, so this skill's job stops at naming the ambiguity and its candidates, never at resolving it for the person who wrote the sentence.",
          "This is a deliberate limit, not a missing feature. A skill that quietly picked the likelier candidate and rewrote around it would hide the confusion a reader is likely to hit, replacing a visible problem with an invisible guess.",
        ],
      },
      {
        heading: "How this differs from other checks in this catalogue",
        body: [
          "Pronoun antecedent clarity is one specific axis: whether a reader can tell which noun a pronoun refers to. It is not whether a sentence's subject performs or receives the action, which this catalogue's passive voice audit skill covers, not whether verb tense matches what a passage already established, which the tense consistency audit skill covers, and not whether commas, capitalization or number formatting follow a named house style, which the editorial style guide enforcement skill covers.",
          "A sentence can pass every one of those three checks and still leave a reader unsure which noun 'it' or 'they' points to. A general purpose rewrite prompt might mention an unclear pronoun as one of many things it fixes in passing; this skill's entire job is finding and naming that one kind of ambiguity, never touching the sentence itself.",
        ],
      },
      {
        heading: "Using the downloaded files as a pronoun clarity checker for ai assistant work",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file's two categories and the worked reference example are meant to be read side by side. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link once the files are unzipped on your own machine, and works as a pronoun clarity checker for ai assistant workflows without any change to the method itself.",
        ],
      },
    ],
    howTo: {
      name: "How to use the pronoun antecedent clarity skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know the two ambiguity categories and what a complete flag looks like before you use them.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Hand the skill a piece of writing",
          text: "Give your assistant both files together with the text you want checked, whether that is an email, an article, a report or a set of documentation.",
        },
        {
          name: "Review each flag against its quoted candidates",
          text: "Confirm each flagged sentence's quoted pronoun and candidate antecedents against the original text, then decide yourself how to resolve the ambiguity, since the skill will not do that for you.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill flag every occurrence of it, this, that, they, these or those?",
        answer:
          "No. Those are the six pronouns this pronoun antecedent clarity skill tracks, but a sentence is flagged only when more than one preceding noun is a plausible antecedent, or the pronoun points at a whole idea with no noun stated. Most sentences have one clear referent and are left alone.",
      },
      {
        question: "Will the skill rewrite an ambiguous sentence for me?",
        answer:
          "No, and its instructions explicitly forbid it. The skill quotes the sentence, the pronoun, and every candidate antecedent, and states why a reader could genuinely be confused, but resolving the ambiguity is left entirely to the writer, who actually knows which candidate was meant.",
      },
      {
        question: "How does the skill decide when a pronoun refers to a whole idea rather than a specific noun?",
        answer:
          "It checks whether any single noun phrase in the preceding sentence stands in for what the pronoun points at. If the pronoun, usually this or that, is really pointing at an entire action or situation, and a reader could reasonably ask what exactly it refers to, it is flagged as a whole idea reference.",
      },
      {
        question: "How is this different from the passive voice or tense consistency skills in this catalogue?",
        answer:
          "Each checks a different, separate axis. This skill checks whether a reader can tell which noun a pronoun refers to. The passive voice audit skill checks whether a subject performs or receives the action. The tense consistency audit skill checks whether verb tense matches what a passage already established.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The preview and the .zip download both happen entirely in your browser, with no server call behind either action, and no text you review with this skill is ever sent anywhere by this site.",
      },
      {
        question: "Does this skill also flag pronouns like he, she, we or I?",
        answer:
          "No. This skill's scope is limited to six pronouns, it, this, that, they, these and those, because those other pronouns carry their own separate gender and person cues, outside this method's scope.",
      },
    ],
    internalLinks: [
      {
        href: "/writing-skills/passive-voice-audit-skill",
        label: "passive voice audit skill",
        description: "A different grammatical axis entirely, voice rather than pronoun reference, and a natural companion pass on the same draft.",
      },
      {
        href: "/writing-skills/tense-consistency-audit-skill",
        label: "tense consistency audit skill",
        description: "For checking verb tense against a passage's own established pattern, a separate job from checking pronoun clarity.",
      },
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description: "For a single one-off clarity pass that also fixes an unresolved pronoun directly, rather than a reusable downloadable flag-only audit.",
      },
      {
        href: "/tools/readability-score-checker",
        label: "readability score checker",
        description: "For checking whether a passage reads clearly overall, after this skill's sentence level pronoun clarity pass.",
      },
    ],
    externalLinks: [
      {
        href: "https://owl.purdue.edu/owl/general_writing/mechanics/pronoun_use.html",
        label: "Purdue OWL: Pronoun Use",
        description: "An independent explainer on how pronouns must agree with and clearly point back to their antecedent noun.",
      },
      {
        href: "https://writingcenter.unc.edu/tips-and-tools/pronoun-reference/",
        label: "UNC Writing Center: Pronoun Reference",
        description: "Guidance on spotting a pronoun with more than one plausible antecedent and why that reads as unclear.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/words/use-pronouns-carefully/",
        label: "plainlanguage.gov: Use Pronouns Carefully",
        description: "A federal plain language guideline on keeping pronoun references clear enough for any reader to follow.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to pronoun review.",
      },
    ],
  },

  tags: ["writing", "editing", "pronoun clarity", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

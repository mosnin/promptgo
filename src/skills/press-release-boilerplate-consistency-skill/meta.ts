import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Press Release Boilerplate Consistency Check

Use this skill whenever you are checking one or more actual press releases
against a company's approved boilerplate, the standardized "About [Company]"
paragraph appended to the end of every release, to catch any release that
used an outdated or altered version of that paragraph.

This is a press release boilerplate consistency skill, not a general
terminology check and not a tone check. It compares one specific, fixed
paragraph, word for word, against the exact paragraph a company has actually
approved. It does not judge anything else in the release.

## Before you check anything

Ask for, or locate, the company's actual approved boilerplate text, exactly
as it stands today, word for word. Do not draft, guess or reconstruct this
paragraph from the company name, its industry, or a past release you happen
to recall. A boilerplate is authored once by the company and updated on its
own schedule; there is no way to know what the current approved version says
without being given it, and producing a plausible sounding paragraph in its
place is exactly the shortcut this skill exists to prevent.

If no approved text is supplied, say so explicitly and stop before checking
anything, rather than proceeding against a paragraph pulled from general
knowledge of what a company like this one probably says about itself.

## Checking a set of press releases

For every press release supplied:

1. Locate the boilerplate paragraph inside it, typically the paragraph
   following a "###" end marker or the final paragraph before the media
   contact block.
2. Compare that paragraph to the approved text sentence by sentence, word by
   word.
3. If any difference exists, quote the exact approved sentence and the exact
   sentence actually used, side by side, so the drift is visible word for
   word. Never replace the two exact sentences with a vague summary such as
   "the wording is different."
4. Name what changed as one of four kinds of drift: a stale fact (an
   employee count, a funding figure, a founding year, a facility count), a
   changed or dropped tagline, a sentence missing from the approved text, or
   a sentence added that the approved text does not contain. Quote whichever
   applies.
5. If a release's boilerplate is identical to the approved text, state that
   plainly rather than leaving the release unmentioned, since silence should
   never be the only signal that a release passed.

Do not flag a formatting only difference, such as a stray extra space or a
straight quote in place of a curly quote, as boilerplate drift unless it
changes what a reader would understand the sentence to say. State that a
formatting variance was seen but not treated as drift, so the distinction
between changed prose and changed characters stays visible in the output.

## Handling more than one release at once

When several releases are supplied together, check each one independently
against the same approved text, then summarise across all of them in one
short list or table stating which releases matched the approved text exactly
and which drifted and how. That turns a pattern across a whole archive of
releases into something visible in one place, rather than something that has
to be rediscovered release by release by whoever reads the output next.

## What this skill does not do

It never invents, approximates or reconstructs a company's boilerplate from
its name, industry, or a remembered press release; it only compares what it
has actually been given against what a release actually used. It does not
check tone, terminology used elsewhere in the release body, or press release
structure generally; those are separate checks with separate skills. If no
approved text is supplied, this skill's entire job is to say so and stop, not
to draft a boilerplate of its own to check against.
`;

const REFERENCE_MD = `# Worked example: one approved boilerplate, two drifted releases

Use this alongside \`SKILL.md\`. It shows the approved text once, two press
releases that each drifted from it in a different way, and the exact output
this skill produces for each.

## The approved boilerplate, as supplied by the company

"About Larkspur Robotics: Larkspur Robotics designs warehouse automation
systems for mid-size distribution centers. Founded in 2019, the company has
deployed its systems in over 40 facilities across North America. Larkspur
Robotics is headquartered in Columbus, Ohio, and is backed by Meridian
Ventures. For more information, visit larkspur-robotics.example."

Treat this exact text, supplied by the company, as the only standard the
skill checks against. Nothing in this reference file is a substitute for a
real approved paragraph in an actual case.

## Release A: a stale fact

The boilerplate at the end of release A reads: "Larkspur Robotics designs
warehouse automation systems for mid-size distribution centers. Founded in
2019, the company has deployed its systems in over 25 facilities across
North America. Larkspur Robotics is headquartered in Columbus, Ohio, and is
backed by Meridian Ventures. For more information, visit
larkspur-robotics.example."

Flagged output for release A:

- Drift type: stale fact.
- Approved sentence: "the company has deployed its systems in over 40
  facilities across North America."
- Sentence actually used: "the company has deployed its systems in over 25
  facilities across North America."
- Everything else in the paragraph matches the approved text word for word.

## Release B: a dropped sentence

The boilerplate at the end of release B reads: "Larkspur Robotics designs
warehouse automation systems for mid-size distribution centers. Founded in
2019, the company has deployed its systems in over 40 facilities across
North America. For more information, visit larkspur-robotics.example."

Flagged output for release B:

- Drift type: sentence missing from the approved text.
- Approved sentence not present in release B: "Larkspur Robotics is
  headquartered in Columbus, Ohio, and is backed by Meridian Ventures."
- The remaining sentences in release B match the approved text word for
  word, and no sentence was added that the approved text does not contain.

## Summary table across both releases

| Release | Result | Exact drift |
|---|---|---|
| Release A | drifted | "over 40 facilities" approved versus "over 25 facilities" used |
| Release B | drifted | headquarters and investor sentence missing entirely |

## A release that matches exactly

If a third release used the boilerplate exactly as approved, word for word,
the correct output is a plain statement that release C matched the approved
text exactly, not silence. A reader comparing several releases needs to see
a pass stated as clearly as a flagged drift.

## Formatting variance that is not drift

If a release rendered the company name in all capitals in a headline style,
or used a curly apostrophe where the approved text used a straight one, note
that the variance was seen and was treated as formatting, not as boilerplate
drift, since it changes no word a reader would understand differently.
`;

const meta: SkillMeta = {
  slug: "press-release-boilerplate-consistency-skill",
  name: "Press Release Boilerplate Consistency Check",
  title: "Press Release Boilerplate Consistency Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that checks the standardized About paragraph on real press releases against a company's actual approved boilerplate, and quotes the exact word for word drift in each release that used an outdated or altered version.",

  seo: {
    primaryKeyword: "press release boilerplate consistency skill",
    keywords: [
      "press release boilerplate consistency skill",
      "free ai skill for press release boilerplate",
      "downloadable press release boilerplate checklist",
      "ai skill to check boilerplate drift",
      "press release boilerplate guide for ai assistant",
    ],
    seoTitle: "Press Release Boilerplate Consistency Skill: Free AI Skill",
    seoDescription:
      "A free, downloadable press release boilerplate consistency skill that checks real releases against a company's actual approved boilerplate, word for word.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: REFERENCE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to compare a boilerplate paragraph across several documents tend to skim for overall similarity and pass a release whose wording is close enough, missing a single stale statistic or a dropped sentence carried across multiple releases before anyone notices. This skill's instructions require the real approved text as input rather than a remembered or assumed version, and require every flag to quote the exact approved sentence beside the exact sentence actually used, so a small but consequential change like an old employee count or a former executive name cannot pass as a rounding error.",
  },

  article: {
    intro: [
      "A press release boilerplate consistency skill only earns its name if it checks one specific paragraph against the one text a company has actually approved, not against a general impression of what the paragraph probably says. The boilerplate is the standardized \"About the company\" text appended to every release, and it drifts quietly: someone copies last quarter's release as a starting point, forgets to update a facility count, and the outdated line ships in a dozen releases before anyone reads them side by side.",
      "It ships as two plain text files: a main instructions file and a worked example reference the instructions point to, showing one approved boilerplate, two press releases that each drifted from it differently, and the exact flagged output for each. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "This is narrower than a general consistency check: it never judges tone or product naming elsewhere in a release, only whether one fixed paragraph matches, word for word, what the company actually approved.",
    ],
    sections: [
      {
        heading: "Why the approved boilerplate has to be supplied, not guessed",
        body: [
          "A boilerplate paragraph is written once by a company and updated on its own internal schedule, so there is no way for an outside reader, or a model, to know what the current approved version actually says. Guessing at it from the company name or industry produces a plausible sounding paragraph that has no relationship to the real one, which defeats the entire point of a check meant to catch drift against a real standard.",
          "The skill's first instruction enforces this: locate or request the actual approved text before comparing a single sentence, and stop if none is supplied.",
        ],
      },
      {
        heading: "The four kinds of drift this skill catches",
        body: [
          "Every flag this skill raises traces back to one of four specific, nameable kinds of change between the approved text and what a release actually used. Naming the kind of drift, not just noting that something differs, is what turns a downloadable press release boilerplate checklist into something a communications team can act on quickly rather than a vague sense that a paragraph reads differently.",
        ],
        list: [
          "A stale fact: an employee count, a funding figure, a founding year, or a facility count that the approved text has since updated.",
          "A changed or dropped tagline: the short descriptive phrase a company uses to summarise what it does, altered or missing.",
          "A sentence missing from the release that the approved text contains.",
          "A sentence present in the release that the approved text does not contain.",
        ],
      },
      {
        heading: "How the comparison pass works, as an ai skill to check boilerplate drift",
        body: [
          "Given the approved text and a press release, the skill locates the boilerplate paragraph inside the release, typically the text following an end marker or the final paragraph before the media contact block, and compares it to the approved text sentence by sentence and word by word.",
          "Every flagged difference is output as two exact quotes side by side, the approved sentence and the sentence actually used, never a summary like the wording seems different. That is the standard a free ai skill for press release boilerplate has to meet before a communications team can trust a passing result across a whole archive of releases without rereading every one by hand.",
        ],
      },
      {
        heading: "How this differs from a brand glossary consistency skill",
        body: [
          "A brand glossary consistency skill checks whether copy uses a company's standardized word for a product, feature or category anywhere it appears across many different pieces of writing, comparing individual terms against a list of approved and rejected synonyms. This skill checks one specific, fixed paragraph against one specific approved version of that exact paragraph, word for word, across a set of press releases.",
          "A release could pass a glossary check cleanly, using every product name correctly throughout its body copy, and still fail this check because its boilerplate carries an employee count from two years ago. The two skills catch different defects and neither substitutes for the other; run both when a real glossary and a real approved boilerplate both exist.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It never invents, approximates or reconstructs a company's boilerplate from its name, industry, or a remembered press release; it only compares what it has actually been given. It does not evaluate the newsworthiness of the release, its headline, its quotes, or the tone of its body copy, and it does not flag a formatting only difference such as a stray space as if it were a change in meaning.",
        ],
      },
      {
        heading: "Using the files as a press release boilerplate guide for ai assistant work",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file explicitly points to the worked example by its relative path. Keeping them in the same folder structure they downloaded in, SKILL.md alongside a reference folder, preserves that reference and gives the assistant a concrete precedent for the exact output format expected: two quoted sentences and a named drift type, not a paraphrase.",
        ],
      },
    ],
    howTo: {
      name: "How to use the press release boilerplate consistency skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real approved boilerplate and the actual releases",
          text: "Before using the skill, get the company's current approved boilerplate paragraph word for word, plus the press releases whose boilerplate needs checking against it.",
        },
        {
          name: "Hand both files, the approved text and the releases to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply the approved paragraph and every release to be checked in the same request.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't have the company's officially approved boilerplate text?",
        answer:
          "The skill says so explicitly rather than guessing at what the paragraph probably says. It stops before comparing anything, because a plausible sounding paragraph produced from the company name or industry is not a real standard, and checking releases against a guess would produce results that look like a real audit but are not.",
      },
      {
        question: "How is this different from the brand glossary consistency skill already on this site?",
        answer:
          "A brand glossary consistency skill checks whether individual terms, like a product or feature name, match a company's standardized word for that thing anywhere they appear. This skill checks one specific, fixed paragraph, the boilerplate, word for word against one approved version of that exact paragraph across a set of press releases.",
      },
      {
        question: "What counts as drift versus an acceptable formatting difference?",
        answer:
          "A change that alters what a reader would understand the sentence to mean, such as a different number, a dropped sentence or an added one, counts as drift. A stray extra space or a straight quote used in place of a curly quote does not, and the skill states plainly that such a variance was seen but not treated as drift.",
      },
      {
        question: "Can it check more than two press releases against the same approved text at once?",
        answer:
          "Yes. Each release is checked independently against the same approved text, then the results are summarised in one list or table stating which releases matched exactly and which drifted and how, so a pattern across a whole archive becomes visible in one place rather than release by release.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the approved boilerplate or the press releases you eventually check with this skill is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Splitting the worked example into its own reference file keeps the main instructions file focused on the comparison process itself, while the example file can gain more worked cases later, such as additional drift types, without restructuring the instructions that point to it.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/marketing-skills/brand-glossary-consistency-skill",
        label: "brand glossary consistency skill",
        description: "The general term consistency counterpart: checks individual product and feature words anywhere they appear, rather than one fixed paragraph.",
      },
      {
        href: "/skills/marketing-skills/brand-voice-consistency-skill",
        label: "brand voice consistency skill",
        description: "For how a release sounds against a documented tone, a different defect from whether its boilerplate paragraph matches the approved text.",
      },
      {
        href: "/marketing-prompts/press-release-prompt",
        label: "press release prompt",
        description: "For drafting a new release, including its boilerplate, that this skill can later check against the company's approved version.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "For seeing every character level change between an approved boilerplate and a drifted version, line by line.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.prnewswire.com/resources/articles/press-release-boilerplate/",
        label: "PR Newswire: What Is a Press Release Boilerplate?",
        description: "An independent explainer of the boilerplate's purpose and standard components, the paragraph this skill checks for drift.",
      },
      {
        href: "https://progressions.prsa.org/index.php/2020/01/13/press-release-writing/",
        label: "PRSA Progressions: Press Release Writing 101",
        description: "A professional body's account of the standard structure a press release follows, including where the boilerplate sits.",
      },
      {
        href: "https://mailchimp.com/resources/boilerplate/",
        label: "Mailchimp: What Is a Boilerplate?",
        description: "Independent guidance recommending a scheduled review of a boilerplate's facts, the update discipline that failing to follow is what creates the drift this skill flags.",
      },
      {
        href: "https://www.nngroup.com/articles/consistency-and-standards/",
        label: "Nielsen Norman Group: Consistency and Standards",
        description: "The usability case for why a reader's confidence depends on standardized text staying the same everywhere it appears.",
      },
    ],
  },

  tags: ["marketing", "press release", "boilerplate", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

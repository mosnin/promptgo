import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Quote Attribution Verification Check

Use this skill whenever you are asked to check a document, article, press release, or report
that contains quoted statements attributed to real people, and you need to confirm that every
quote is genuine rather than invented, or lightly rewritten and then presented as if it were
said word for word. This skill does not draft or edit the document. It checks the quotes that
are already in it, one at a time, against real source material.

## The one input this skill will not work without

Do not run a check without the actual source material each quote is supposed to come from: an
interview transcript, a recorded call log, an email thread, a written statement, a press
conference transcript, or some other real record of what the person actually said or wrote. A
quote cannot be verified against a source that was never supplied, and it cannot be verified
against a general impression of how that person usually talks either. If the source material
for a given quote is missing, say so plainly and ask for it before checking that quote, rather
than letting it pass because nothing contradicts it.

## Extracting every quote in the document

Read the document from start to finish and pull out every quoted statement attributed to a
named person: anything set off in quotation marks and credited to someone by name or title.
List each one exactly as it appears in the document, together with who it is attributed to,
before checking any of them, so the full set being checked is visible before a single verdict
is reached.

## Checking each quote against the supplied source material

For every quote extracted, search the source material for the passage it should trace back to.
Compare the two word for word, not for general similarity of meaning. Three outcomes are
possible for each quote:

- Verified: the quote matches the source material verbatim, or near verbatim once legitimate
  ellipsis and bracket edits are accounted for. Quote the exact source passage that supports it.
- Altered: something in the source material clearly corresponds to the quote, but the document's
  wording departs from it, a word changed, a hedge removed, grammar tightened, two separate
  remarks merged into one. Quote both the document's version and the source passage it was built
  from, and name the specific change.
- Unverified: no passage in the supplied source material corresponds to the quote at all. Say so
  directly, quote the document's version, and state that nothing in the material traces to it,
  rather than guessing at where it might have come from.

An ellipsis that omits material without changing what remains is legitimate. A bracketed
insertion that clarifies an ambiguous pronoun or supplies missing context, written in brackets,
is legitimate. Anything else that changes a word, a tense, a qualifier, or a certainty level
counts as an alteration and must be flagged, even when the edit reads as a minor tidy up rather
than a meaningful change.

## Reporting a flagged quote

For every quote that is not a clean verified match, report in this order: the exact quote as it
appears in the document, the outcome it received, the closest matching source passage quoted in
full, or a plain statement that none exists, and a specific description of the discrepancy, not
a general comment that something feels off. Close with a short summary: how many quotes were
checked, how many verified, how many altered, and how many unverified.

## What this skill does not do

It does not judge whether a quote is newsworthy, well phrased, or well chosen. It does not
decide whether a quote sounds like something the attributed person would plausibly say. That
question is never asked, because plausibility is not evidence and this skill's entire job is to
replace plausibility with a traceable source. A quote earns a verified outcome only by matching
real supplied material, never by sounding right for the speaker.
`;

const WORKED_EXAMPLE_MD = `# Worked example: one verified quote and one altered quote

Use this alongside \`SKILL.md\` as a model for how a check should read against real source
material: specific, quoting both versions in full, and naming the exact discrepancy rather than
describing it in general terms.

## The source material, as supplied

A recorded phone interview transcript with Maria Chen, VP of Engineering at a company called
Lindercore, conducted by a reporter about a delayed product launch.

"REPORTER: Can you walk me through why the release slipped from March to June?

CHEN: Sure. The honest answer is we underestimated how much rework the payment integration
would need once we started testing it against real transaction volume. We think the new date
holds, but I want to be upfront that we said the same thing about March, so I understand if
people are skeptical. We're not adding new features between now and June. This is entirely about
finishing what we already committed to."

## The document quoting it, as supplied

A news article about the delay, containing two quotes attributed to Maria Chen.

Quote one: "\\"The honest answer is we underestimated how much rework the payment integration
would need once we started testing it against real transaction volume,\\" Chen said."

Quote two: "\\"We know the new date holds,\\" Chen said, adding that the company is focused
entirely on finishing its existing commitments rather than adding new features before launch."

## Checking quote one

Searching the transcript for the passage behind quote one finds an exact match: "The honest
answer is we underestimated how much rework the payment integration would need once we started
testing it against real transaction volume." Every word lines up, in the same order, with no
insertion, omission, or substitution.

Outcome: verified.

Source passage: "The honest answer is we underestimated how much rework the payment integration
would need once we started testing it against real transaction volume."

## Checking quote two

Searching the transcript for the passage behind quote two finds a clearly corresponding
statement, but the wording does not match. The transcript records Chen saying "We think the new
date holds, but I want to be upfront that we said the same thing about March, so I understand if
people are skeptical." The document's quote reads "We know the new date holds," dropping the
hedge entirely and the entire acknowledgment that the same claim was wrong once already, then
presenting the flattened sentence inside quotation marks as though Chen said it exactly that way.

Outcome: altered.

Document's version: "We know the new date holds."

Closest source passage: "We think the new date holds, but I want to be upfront that we said the
same thing about March, so I understand if people are skeptical."

The specific discrepancy: "think" was changed to "know," which converts a hedged, self aware
statement into an unqualified one, and the entire second half of the sentence, the admission
that the same date claim was wrong before, was removed rather than represented with an ellipsis.
Neither change is a legitimate edit. Tightening a quote's confidence level and cutting a
qualifying clause both alter what the source material shows Chen actually said, so the quote
cannot be reported as a direct quotation of her words even though a real, related statement
exists in the transcript.

## Why this matters even though nothing here is dramatic

Nothing about quote two looks like an obvious fabrication on a first read. It sounds like
something a confident executive would say, and it is built from a real interview rather than
invented from nothing. That is exactly the failure mode this skill exists to catch: an altered
quote does not need to be dramatic or implausible to be wrong, it only needs to no longer match
what the source material actually records, and a reader has no way to tell the difference
between a verified quote and an altered one without checking the source directly.

## The report, as it should appear in the output

Quote 1: "The honest answer is we underestimated how much rework the payment integration would
need once we started testing it against real transaction volume." Outcome: verified. Source
passage matches exactly.

Quote 2: "We know the new date holds." Outcome: altered. Source passage: "We think the new date
holds, but I want to be upfront that we said the same thing about March, so I understand if
people are skeptical." Discrepancy: "think" was changed to "know," and the qualifying admission
that the same claim was wrong before was cut without an ellipsis marking the omission.

Summary: two quotes checked, one verified, one altered, zero unverified.
`;

const meta: SkillMeta = {
  slug: "quote-attribution-verification-skill",
  name: "Quote Attribution Verification Check",
  title: "Quote Attribution Verification Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that checks every quoted statement in a document against real supplied source material, verbatim or near verbatim, and flags anything altered or unverified with both versions quoted side by side.",

  seo: {
    primaryKeyword: "quote attribution verification skill",
    keywords: [
      "quote attribution verification skill",
      "free ai skill to verify quotes",
      "downloadable quote fact-check checklist",
      "ai skill to check quote accuracy",
      "how to verify a quoted statement is real",
    ],
    seoTitle: "Quote Attribution Verification Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable quote attribution verification skill that checks every quote in a document against real source material and flags altered or unverified quotes.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/quote-verification-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Models asked to check a quote against a real transcript reliably let small changes through unflagged: a hedge word dropped, a tense tightened, a qualifying clause cut, all while the rest of the sentence stays close enough to the source that the result still reads as a faithful quotation. The altered version no longer matches the source verbatim, yet nothing about it looks fabricated on its own, which is exactly why it passes an casual read. This skill's instructions require a word for word comparison against the supplied source for every quote, and require any departure beyond a legitimate ellipsis or bracketed clarification to be flagged with both versions quoted and the specific change named.",
  },

  article: {
    intro: [
      "A quote attribution verification skill only earns its name if it checks quotes against something real. Handed a document full of confident, well phrased quotations, an AI assistant with no source material to check against has nothing to verify a quote with except how plausible it sounds for the person it is attributed to, and plausible is not the same thing as true. This skill refuses that shortcut: it will not check a quote without the actual source material that quote is supposed to come from.",
      "It ships as two plain text files: a main instructions file and a worked reference example that walks through one verified quote and one altered quote from a single interview transcript, naming the exact discrepancy in the altered one. Both are previewable in full on this page before you download the zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "The discipline underneath both files is conservative on purpose. Every quote gets compared word for word against real supplied material, and anything that does not trace back verbatim, or near verbatim once legitimate ellipsis and bracket edits are accounted for, gets flagged rather than waved through.",
    ],
    sections: [
      {
        heading: "Why sounding like something they'd say is not verification",
        body: [
          "A quote can read as completely in character for the person it is attributed to and still be wrong. An executive who talks in short, confident sentences elsewhere makes a short, confident quote about a delay feel plausible on sight, which is the trap: plausibility comes from a speaker's general style, not from any actual record of what they said in this instance.",
          "This skill treats that instinct as a failure mode to guard against, not a shortcut to lean on. A quote earns a verified outcome only by matching real, supplied source material, never by sounding right for the speaker, and the instructions say this directly so the check never reverts to a plausibility judgment when a passage is hard to find.",
        ],
      },
      {
        heading: "The one input a quote attribution verification skill refuses to work without",
        body: [
          "This skill will not check a single quote without the real source material it is supposed to trace to: an interview transcript, a recorded call, an email, a written statement, or some other genuine record of what the person actually said. Nothing else counts, not a press kit summary, not a paraphrase, and not a confident description of the person's usual tone.",
          "When that material is missing for a given quote, the skill says so plainly and asks for it, rather than checking against context clues and reporting a result that looks complete while skipping the one thing that would have caught a real problem.",
        ],
      },
      {
        heading: "How a quote earns a verified, altered or unverified outcome",
        body: [
          "Every quote pulled from the document is compared word for word against the source material and sorted into one of three outcomes. A verified quote matches the source exactly, or near exactly once a legitimate ellipsis or a bracketed clarifying insertion is accounted for. An altered quote traces to something real, but the wording has moved, a hedge dropped, a tense tightened, two remarks merged into one. An unverified quote has no corresponding passage at all.",
          "As a free ai skill to verify quotes, the distinction matters because the report differs by outcome: an altered quote gets both versions quoted with the change named, and an unverified quote gets a plain statement that nothing traces to it, never a softened result to make the check look cleaner.",
        ],
      },
      {
        heading: "Worked example: verifying one quote and catching one altered quote",
        body: [
          "The reference file walks a single case from a real interview transcript: a reporter's question about a delayed launch, an executive's recorded answer, and two quotes a document built from it. The first quote matches the transcript exactly. The second changes 'we think' to 'we know' and cuts a qualifying clause without an ellipsis marking the omission.",
          "The flag raised against the second quote is a downloadable quote fact-check checklist in miniature: the document's version, the closest transcript passage beside it, and the exact discrepancy named, a certainty level tightened and a hedge removed, rather than a general note that the quote feels slightly off.",
        ],
      },
      {
        heading: "What this skill will not do, as an ai skill to check quote accuracy",
        body: [
          "It will not judge whether a quote is well chosen or well phrased. It will not decide a quote is fine because it fits the speaker's known style, and it will not fill in a source passage from context when the real material does not contain one. Every judgment traces to a specific comparison against real material, never an impression of how the quote reads.",
        ],
      },
      {
        heading: "How to verify a quoted statement is real once you have both files",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file points to the worked example by its relative path inside the archive. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link once the files are unzipped, and supplying the full source material for every quote, not a summary of it, is what makes the check possible at all.",
        ],
      },
    ],
    howTo: {
      name: "How to use the quote attribution verification skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/quote-verification-worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real source material for every quote",
          text: "Collect the actual interview transcript, email, recorded call, or written statement each quoted person's words are supposed to come from before starting a check.",
        },
        {
          name: "Hand both files to your assistant with the document and the source material",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply the document being checked alongside the real source material for each quote in it.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as real source material for this skill?",
        answer:
          "An interview transcript, a recorded call log, an email thread, a written statement, or a press conference transcript, something that records what the person actually said or wrote. A press release summary, a paraphrase, or a description of the speaker's usual tone does not count, because none of those are a record of the specific words being checked.",
      },
      {
        question: "Will it flag a quote just because the wording was slightly tightened?",
        answer:
          "Yes, and that is deliberate. Dropping a hedge word, changing a tense, or tightening grammar changes what the source material shows the person actually said, even when the edit reads as minor. The skill flags any departure beyond a legitimate ellipsis or a bracketed clarifying insertion, rather than treating a small change as close enough to pass.",
      },
      {
        question: "What happens if no source material was supplied for a quote?",
        answer:
          "The skill says so plainly and asks for it before checking that quote. It will not check a quote against context, general plausibility, or how the speaker usually talks, because none of those are evidence that the specific words in the document were actually said.",
      },
      {
        question: "Does it accept a quote just because it sounds like something the person would say?",
        answer:
          "No. Sounding in character for the attributed speaker is explicitly not treated as verification anywhere in this skill's instructions. A quote is verified only by matching real, supplied source material word for word, never by how plausible it reads on its own.",
      },
      {
        question: "How does the skill handle a legitimate ellipsis or a bracketed clarification?",
        answer:
          "An ellipsis that omits material without changing the meaning of what remains, and a bracketed insertion that clarifies an ambiguous word without adding a new claim, are both treated as legitimate edits rather than alterations. Anything beyond that, a changed word, a shifted certainty level, or a merged pair of remarks, gets flagged.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and none of the document or source material anyone eventually checks with this skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-prompts/press-release-prompt",
        label: "press release prompt",
        description: "Applies its own quote test to executive quotes at draft time, the same discipline this skill applies after a document already exists.",
      },
      {
        href: "/marketing-prompts/case-study-prompt",
        label: "case study prompt",
        description: "Keeps every customer quote on the record and tagged for approval, the kind of source material this skill checks a finished draft against.",
      },
      {
        href: "/skills/career-skills/cover-letter-fact-check-skill",
        label: "cover letter fact check skill",
        description: "Applies the same trace every claim to real supplied material discipline to a cover letter's claims instead of a document's quotes.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "A quick way to see exactly what changed, word for word, once this skill has flagged a quote as altered from its source.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.npr.org/about-npr/688424402/special-section-attribution",
        label: "NPR Ethics Handbook: Special Section on Attribution",
        description: "NPR's own newsroom standard for attributing sourced material, the same discipline this skill applies to a quote's traceability.",
      },
      {
        href: "https://www.poynter.org/tag/accuracy-tips/",
        label: "Poynter: Accuracy Tips",
        description: "An independent journalism institute's archive of practical guidance on catching inaccuracies before publication.",
      },
      {
        href: "https://www.thomsonreuters.com/en/about-us/trust-principles",
        label: "Thomson Reuters: The Trust Principles",
        description: "A major news organisation's public commitment to accuracy and reliable sourcing as a condition of its journalism.",
      },
      {
        href: "https://americanpressinstitute.org/lessons-journalists-practicing-fact-checking/",
        label: "American Press Institute: Lessons for journalists practicing fact-checking",
        description: "Independent research on how a technically accurate partial quote can still misrepresent what the full source material actually says.",
      },
    ],
  },

  tags: ["writing", "fact check", "journalism", "quotes", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

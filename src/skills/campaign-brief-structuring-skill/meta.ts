import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Campaign Brief Structuring Skill

Use this skill whenever you are asked to turn a rough marketing request, such
as "we need a campaign for the fall sale" or "can you put together something
for the product launch," into a complete, structured campaign brief.

## The rule this skill will not break

Do not write a full campaign brief until three things have been stated
directly by the person asking for it: a success metric, a budget range, and
an audience description. If any of the three is missing or too vague to act
on, stop and ask for it instead of filling in a plausible sounding guess.
This is the entire discipline the skill exists to enforce.

## 1. The success metric

A success metric must be a number, a rate, or a specific measurable outcome,
stated with a deadline. "Increase awareness," "get more engagement," or
"go viral" are goals, not metrics, and none of them can be checked against
a result after the campaign runs. Examples of a real success metric: "1,200
qualified leads by October 15," "an 8 percent lift in repeat purchase rate
within 60 days of launch," or "3,000 newsletter signups during the four week
window."

If the person asking has not stated a real metric, do not draft a full brief
around a guessed one. Refuse politely and explain the specific reason: a
brief built around a vague goal cannot be judged after the campaign runs,
because there is no number to compare the result against, and that failure
only becomes visible weeks later when it is too late to fix the campaign
itself. Ask directly for a number, a rate, or a specific measurable outcome
and the date by which it should be reached. Offer one or two concrete
examples of what a real metric looks like, drawn from the ones above, so the
person has something to react to rather than a blank request.

## 2. The budget

Ask for a real budget range, for example "$8,000 to $12,000" or "around
$25,000 total." If the person genuinely has no budget constraint, that is an
acceptable answer, but it must be stated explicitly as "unconstrained" or
"no fixed budget," not left blank. Never invent a number. A guessed budget
range shapes every recommendation that follows it, from channel selection to
creative scope, so an invented figure quietly corrupts the rest of the brief.

## 3. The audience

Ask for a real audience description: who specifically the campaign is
speaking to, described by something concrete such as role, life stage,
existing relationship to the brand, or a segment pulled from real customer
data. "Everyone" or "anyone interested" is not an audience description and
should be treated the same as a missing answer. Push for at least one
specific, checkable detail before proceeding, for example "returning
customers who have not purchased in 90 days" rather than "our customers."

## 4. Writing the brief once all three inputs are real

Once a real success metric, a real budget or an explicit "unconstrained," and
a real audience description are all in hand, write the brief following the
exact section order in \`reference/brief-template.md\`. Do not reorder or
skip sections. Fill in every section using only what was actually provided;
where a detail beyond the three required inputs is still missing, such as a
firm launch date or a specific channel preference, mark that section as
"not yet specified" rather than inventing a plausible sounding placeholder.

## What this skill does not do

It does not soften the refusal into a brief that "assumes" a metric, a
budget, or an audience while quietly noting the assumption in a footnote.
An assumed number gets treated as a real one by everyone who reads the brief
later, which defeats the entire point of asking first. It also does not
invent competitor names, pricing, or product claims that were not supplied;
those get asked for the same way the three required inputs are asked for.
`;

const BRIEF_TEMPLATE_MD = `# Campaign brief template

Use this section order every time a full brief is written by the campaign
brief structuring skill. Keep the headings exactly as written below so
briefs stay comparable to one another across campaigns.

## 1. Campaign name and one line summary

A short, memorable name for internal reference, plus one sentence describing
what the campaign is and who it is for.

## 2. Success metric

The exact number, rate, or measurable outcome supplied, and the date it is
due. This section is never left blank and is never filled in with a vague
goal; if this input was not real when the brief was requested, the brief
should not have been written yet. State the metric exactly as given, for
example "1,200 qualified leads by October 15," not a paraphrase.

## 3. Budget

The real budget range supplied, or the word "unconstrained" if that was the
explicit answer given. Never a guessed figure.

## 4. Audience

The specific audience description supplied: who they are, what makes them a
distinct group worth targeting separately from everyone else the brand
reaches, and, where given, how they were identified (a customer segment, a
life stage, an existing relationship to the brand).

## 5. Objective

One or two sentences connecting the success metric to a business reason,
for example why 1,200 leads by October 15 matters to the team requesting the
campaign right now.

## 6. Key message

The single idea the campaign should communicate to the audience described in
section 4, stated in plain language rather than finished ad copy.

## 7. Channels

The specific channels the campaign will run on, only if this was supplied or
can be reasonably inferred from the audience description. Otherwise marked
"not yet specified."

## 8. Timeline

Key dates: when the campaign starts, when it ends, and how that end date
relates to the deadline stated in the success metric section. If the
campaign deadline and the metric deadline do not match, flag that mismatch
directly rather than silently picking one.

## 9. Risks and open questions

Anything the brief could not resolve from the inputs given, listed plainly
so the person reading the brief knows exactly what still needs a decision
before work starts. This section should never be empty on a first draft; a
brief with no open questions usually means questions were quietly answered
with guesses instead of being surfaced.

## 10. Sign-off

A line for the name of the person who requested the campaign and the date
the brief was approved, left blank until that approval actually happens.

## How to reuse this template

Keep this file next to \`SKILL.md\` when handing both to an assistant, since
the main instructions file names these ten sections by their exact headings.
Do not add new top level sections without updating the instructions file to
reference them, and do not remove the success metric, budget, or audience
sections under any circumstance, since those three are what the refusal
rule in \`SKILL.md\` exists to protect.
`;

const meta: SkillMeta = {
  slug: "campaign-brief-structuring-skill",
  name: "Campaign Brief Structuring",
  title: "Campaign Brief Structuring Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that turns a rough marketing request into a complete campaign brief, and refuses to write one until a real success metric, budget range and audience description are stated.",

  seo: {
    primaryKeyword: "campaign brief structuring skill",
    keywords: [
      "campaign brief structuring skill",
      "free ai skill for campaign briefs",
      "downloadable campaign brief template",
      "ai skill to write a marketing campaign brief",
      "campaign brief checklist for ai assistant",
    ],
    seoTitle: "Campaign Brief Structuring Skill: Free AI Download",
    seoDescription:
      "A free, downloadable campaign brief structuring skill that refuses to draft a brief until you give it a real success metric, budget and audience.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/brief-template.md", content: BRIEF_TEMPLATE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to turn a rough marketing request into a brief reliably produce a fluent, well formatted document built around whatever goal was mentioned first, even when that goal is a slogan rather than a number. The resulting brief reads as complete but cannot be checked against a real result later, because there is nothing measurable in it to compare against. This skill's refusal rule forces a stated success metric, budget and audience before any brief gets written, so the gap surfaces before work starts rather than after the campaign has already run.",
  },

  article: {
    intro: [
      "A campaign brief structuring skill only earns its name if it can tell the difference between a real success metric and a slogan. Handed a request like \"we need a campaign for the fall sale,\" most AI assistants will happily produce a polished, complete looking brief built around whatever goal phrase was mentioned first, whether or not that phrase is something anyone could ever check against a result. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file and a ten section brief template the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a vague goal cannot become a real brief",
        body: [
          "\"Increase awareness,\" \"get more engagement,\" and \"go viral\" describe a feeling, not a result. None of them can be checked against anything after a campaign runs, because none of them names a number, a rate, or a date. A brief built around one of these phrases will still read as complete: it will have an audience, a message, a channel list, all filled in with confident, specific sounding language. What it will not have is any way to say, three months later, whether the campaign worked.",
          "That gap is invisible at the moment the brief gets written and expensive at the moment someone tries to evaluate the campaign against it. A free ai skill for campaign briefs earns its keep by catching that gap before the brief exists rather than after.",
        ],
      },
      {
        heading: "Why this skill requires a stated success metric before writing anything",
        body: [
          "Before producing a full brief, the skill requires a success metric stated as a number, a rate, or a specific measurable outcome, with a date attached: 1,200 qualified leads by a named date, an 8 percent lift in repeat purchase rate within 60 days, 3,000 newsletter signups during a four week window. If no real metric has been given, the skill does not draft a full brief around a guessed one.",
          "Instead it refuses directly and explains why: a metric-free brief cannot actually be evaluated later, since there is no number to hold the finished campaign against, and that failure only becomes obvious after the budget has already been spent. It then asks for a number, a rate, or a measurable outcome and a deadline, offering a concrete example so the person supplying it has something real to react to rather than a blank prompt.",
        ],
      },
      {
        heading: "A real budget range, or an explicit unconstrained",
        body: [
          "The skill also asks for a real budget range, such as \"$8,000 to $12,000,\" before writing a full brief. An unconstrained budget is an acceptable answer, but it has to be stated as exactly that rather than left blank or guessed at, because a guessed figure quietly shapes every recommendation that follows it, from which channels are affordable to how much creative production the campaign can support.",
        ],
      },
      {
        heading: "A real audience, not everyone",
        body: [
          "\"Everyone\" is treated the same as a missing answer. The skill asks for a specific, checkable audience description, something like \"returning customers who have not purchased in 90 days\" rather than \"our customers,\" because a campaign brief structuring skill that accepts a vague audience produces messaging and channel choices that are really aimed at nobody in particular.",
        ],
      },
      {
        heading: "The exact section structure a completed brief follows",
        body: [
          "Once a real metric, a real budget or an explicit unconstrained, and a real audience are all in hand, the skill writes the brief in the ten section order set out in reference/brief-template.md: campaign name, success metric, budget, audience, objective, key message, channels, timeline, risks and open questions, and sign-off. Sections are never reordered or skipped, and any detail beyond the three required inputs that is still missing gets marked \"not yet specified\" rather than filled in with a plausible sounding placeholder.",
          "The risks and open questions section is deliberately never left empty on a first draft, because a brief with nothing open in it usually means a gap got quietly filled with a guess instead of being surfaced for someone to answer. That ten section order is what makes this a downloadable campaign brief template rather than a loose set of writing tips.",
        ],
      },
      {
        heading: "How to use the downloaded files together, as an ai skill to write a marketing campaign brief",
        body: [
          "Hand both files to an AI assistant at the same time, since the main instructions file names the ten template sections by their exact headings and expects the template file to be present alongside it. Keeping the folder structure intact (SKILL.md next to a reference folder) preserves that reference exactly as downloaded.",
          "Treat the pair as a campaign brief checklist for ai assistant work generally, not a one-time script: the same two files can be reused for every new campaign request, with a fresh metric, budget and audience supplied each time.",
        ],
      },
    ],
    howTo: {
      name: "How to use the campaign brief structuring skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/brief-template.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather a real metric, budget and audience",
          text: "Before using the skill, settle on a specific measurable success metric with a date, a real budget range or an explicit unconstrained, and a specific audience description.",
        },
        {
          name: "Hand the campaign request to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the template file, then supply your rough campaign request along with the three required inputs.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't have a success metric yet?",
        answer:
          "The skill will not draft a full brief around a guessed one. It refuses directly, explains that a metric-free brief cannot be evaluated after the campaign runs, and asks you for a number, a rate, or a specific measurable outcome along with a date, offering an example so you have something concrete to respond to.",
      },
      {
        question: "Is 'increase brand awareness' an acceptable success metric?",
        answer:
          "No. It names a feeling rather than a checkable result, so the skill treats it the same as a missing metric and asks for something with a number and a date attached instead, such as a specific lead count, conversion rate, or signup total by a named deadline.",
      },
      {
        question: "What if the budget is genuinely unlimited?",
        answer:
          "That is an acceptable answer, but it has to be stated explicitly as unconstrained rather than left blank. The skill treats a blank budget field as a missing input and asks for it directly, since an invented figure would quietly shape every channel and scope recommendation that follows.",
      },
      {
        question: "Can the skill write a brief for a small internal team with no formal audience research?",
        answer:
          "Yes, as long as the audience is described with at least one specific, checkable detail, such as a customer segment or a shared trait, rather than 'everyone' or 'anyone interested.' The skill does not require formal research, only a real answer instead of a placeholder.",
      },
      {
        question: "Does the skill invent channels, competitor names or pricing if I don't provide them?",
        answer:
          "No. Anything beyond the three required inputs that is missing, such as a channel list or a firm launch date, is marked 'not yet specified' in the finished brief rather than filled in with a plausible sounding guess, so nobody mistakes an invented detail for a supplied one.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Splitting the ten section brief structure into its own reference file keeps the main instructions file focused on the refusal rule and the reasoning behind it, while the template file can be extended with additional sections later without restructuring the instructions that point to it.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description: "For building out a real, specific audience description before handing it to this skill's audience requirement.",
      },
      {
        href: "/marketing-prompts/content-calendar-prompt",
        label: "content calendar prompt",
        description: "A natural next step once a brief's channels and timeline sections are filled in with real dates.",
      },
      {
        href: "/tools/roi-calculator",
        label: "ROI calculator",
        description: "For turning a campaign's budget and expected return into a number worth stating as part of the success metric.",
      },
      {
        href: "/skills/marketing-skills/brand-voice-consistency-skill",
        label: "brand voice consistency skill",
        description: "A companion skill for checking the campaign's copy against the brand's real voice once the brief itself is settled.",
      },
    ],
    externalLinks: [
      {
        href: "https://blog.hubspot.com/marketing/creative-brief",
        label: "HubSpot: How to Write a Creative Brief",
        description: "An independent walkthrough of the sections a real marketing or creative brief typically contains.",
      },
      {
        href: "https://www.mindtools.com/a4wo118/smart-goals",
        label: "MindTools: SMART Goals",
        description: "Background on the measurable, time bound goal setting standard this skill's success metric requirement is built on.",
      },
      {
        href: "https://business.google.com/en-all/think/measurement/",
        label: "Think with Google: Measurement",
        description: "Independent resources on marketing measurement, relevant to setting a campaign success metric that can actually be checked.",
      },
      {
        href: "https://www.projectmanager.com/blog/creative-brief-template",
        label: "ProjectManager: Creative Brief Template",
        description: "Another real world example of how a structured brief separates objectives, audience and channels into distinct sections.",
      },
    ],
  },

  tags: ["marketing", "campaign brief", "success metric", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: true,
};

export default meta;

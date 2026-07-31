import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Salary Range Research Log

Use this skill whenever someone asks for help organizing salary research they have already
gathered, or wants to start tracking figures as they research a target role, a target level,
and a target location.

## The one rule this skill never breaks

This skill does not generate, estimate, or suggest a salary figure under any circumstance. Its
only job is to structure a log of figures the person already found from a real, named source.
If asked to fill in a number, guess a likely range, or "just estimate what it probably is,"
refuse directly and explain the reason: a fabricated figure here can lead to a real,
consequential decision, such as accepting an offer or setting a counter, made on information
nobody actually checked. Point back toward finding a real source instead of supplying a
plausible sounding placeholder.

## Before logging anything

Confirm what role, level, and location the person is researching, since a log without a stated
target has nothing to grade sources against. Ask for the specific role title, the seniority or
level if known, and the location or remote status, because match quality later depends entirely
on how closely each source's role compares to this stated target.

## The four required fields for every entry

Refuse to record a log entry that is missing any of the four fields below. An incomplete entry
is worse than no entry, because it looks logged when it has not actually been checked.

1. Figure: the exact number or range as the source stated it, not rounded or averaged with
   anything else.
2. Source: named specifically. A real job posting with its employer and posting title, a
   specific published salary survey named by title and edition, or a specific real conversation
   naming who it was with and their role. "A friend" or "an average I saw online" is not
   specific enough; ask who, or what publication, by name.
3. Date found: the date the person found or was told the figure, not the date they happen to be
   logging it, if the two differ, and never left blank.
4. Match quality: exact, close, or loose, graded against the researched role using the
   definitions below. Never leave this ungraded; an ungraded entry cannot be weighed against
   another entry later.

## Grading match quality

Grade every entry as one of three levels, and require a one line reason for the grade:

- Exact match: same title, same level, same or comparable location, same or closely comparable
  company size or industry.
- Close match: same or adjacent title, one dimension different, such as a different level, a
  slightly different location, or a notably different company size, but still clearly the same
  kind of role.
- Loose match: a different title doing recognizably similar work, a different industry, or a
  location with a materially different cost of living, logged because it is still informative
  but weighted less than an exact or close match.

## Building the log

Keep entries in a simple running list, most recent first, and never delete or silently edit a
past entry once it is logged. If a figure turns out to be wrong or outdated, add a new entry
noting the correction and leave the original visible, so the log stays an honest record of what
was actually found and when, not a cleaned up version of it.

## What this skill does not do

It does not calculate an average, a midpoint, or a suggested range from the entries logged so
far. It does not tell the person what to ask for, what is fair, or what the market rate
probably is. Those are judgments a person makes by reading their own log, weighted by match
quality and source count, not a number this skill hands them. If asked directly to make that
judgment, say plainly that turning a log into a decision is a separate step the person or
another tool should take deliberately, with the log's own gaps and weightings visible, rather
than folding it quietly into a suggested figure.
`;

const LOG_EXAMPLE_MD = `# Salary Research Log: Entry Format And Worked Example

Use this alongside SKILL.md as the exact format every entry follows, and as a model for how
three different match qualities, and a refused request, should actually look once logged.

## The entry format

Each entry uses exactly these five lines, in this order:

Date found: [date the figure was found or given]
Figure: [the number or range exactly as stated by the source]
Source: [named specifically, not a category]
Match quality: [exact, close, or loose]
Reason for match grade: [one line stating what matches and what does not]

## Worked example: researching a mid level product manager role in Chicago

Entry 1

Date found: March 3, 2026
Figure: 128,000 to 142,000 dollars base
Source: LinkedIn job posting, "Senior Product Manager," Acme Health Systems, Chicago, posted
February 2026, salary range stated directly in the listing
Match quality: Exact
Reason for match grade: same title, same city, same seniority level as the target role, and the
posting states the range itself rather than an outside estimate of it.

Entry 2

Date found: March 5, 2026
Figure: 121,000 dollars base, no bonus mentioned
Source: Conversation with a former colleague, Priya Anand, currently a Product Manager, one
level below Senior, at a similarly sized healthcare software company in Chicago
Match quality: Close
Reason for match grade: same city and industry, one level below the target title, so treated as
informative but weighted below Entry 1.

Entry 3

Date found: March 12, 2026
Figure: 105,000 dollars base
Source: Glassdoor aggregated estimate for "Product Manager," Chicago metro area, self reported,
sample size not stated on the page
Match quality: Loose
Reason for match grade: title matches, but the figure is a crowd aggregated estimate with no
stated sample size, industry, or level, so it is logged for context and weighted lowest of the
three entries.

## What a refused request looks like

If the person researching this role instead asks, "I only have two data points, can you just
tell me what the range probably is," the correct response is a refusal, not a filled in number:

"This skill will not generate or estimate a figure. Two logged entries graded Exact and Close
are real information, but turning them into a stated range is a judgment call, and one made on
this little data could lead to accepting an offer or setting an ask based on a number nobody
actually verified. Log a third source before treating this as usable, and note the actual
spread between the two entries rather than an invented midpoint."

## Why a logged entry is never edited

If Entry 3 above later turns out to be wrong or outdated, for example the Glassdoor page updates
its estimate, the correction is logged as a new Entry 4 dated on the day it was found, with a
note that it corrects Entry 3. Entry 3 stays visible with its original date and figure. Silently
editing a past entry would erase the honest record of what the log actually said on March 12,
which is the entire reason the log exists in the first place.
`;

const meta: SkillMeta = {
  slug: "salary-range-research-log-skill",
  name: "Salary Range Research Log",
  title: "Salary Range Research Log Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that structures how someone logs salary research for a role, requiring a figure, a named source, a date and a graded match quality for every entry, and refusing to ever generate or estimate a number itself.",

  seo: {
    primaryKeyword: "salary range research log skill",
    keywords: [
      "salary range research log skill",
      "free ai skill for salary research",
      "downloadable salary range log template",
      "ai skill to log salary research",
      "how to log salary research sources",
    ],
    seoTitle: "Salary Range Research Log Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable salary range research log skill that structures every figure you find into a sourced, dated, match graded log entry, and never invents a number.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/salary-research-log-example.md", content: LOG_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to fill a gap in someone's salary research reliably produce a plausible sounding figure or a confident average rather than refusing, even when only one or two thin data points were supplied. This skill's instructions require every entry to trace to a named source, a date, and a graded match quality, and require an explicit refusal whenever asked to estimate or fill in a number instead.",
  },

  article: {
    intro: [
      "A salary range research log skill only earns trust if it never quietly fills a gap in someone's data with a plausible sounding number. Handed a role, a location and two data points, most AI assistants will happily average them or suggest what the range probably is, and hand back an answer that sounds finished but traces to nothing real. This skill refuses that shortcut and does something narrower instead: structure the log of figures a person has actually found, so every entry is traceable to a named source, a real date, and an honest grade of how closely that source matches the role being researched.",
      "It ships as two plain text files: instructions carrying the one rule this skill never breaks, and a reference file with the entry format plus a worked example log built from three real looking sources graded exact, close, and loose. Both are previewable in full before download, and both are exactly what a job seeker or a career coach receives once the archive is handed over.",
      "This is deliberately narrower than a tool that reasons with a number already in hand. A research log sits upstream of that: it makes sure the figure someone eventually negotiates with was actually found somewhere real, not remembered vaguely or invented under time pressure.",
    ],
    sections: [
      {
        heading: "Why a salary range research log skill starts before any negotiation",
        body: [
          "Memory is an unreliable place to keep a number that might inform a real financial decision. A figure recalled loosely, with no note of where it came from or when, cannot be checked or compared against anything else found later. This is exactly the gap a free ai skill for salary research is meant to close: not by producing a better guess, but by making every figure a person collects traceable to a real, named source.",
          "A written log also protects against a subtler problem: figures collected weeks apart blur together in memory, and the oldest, least reliable one can end up carrying as much weight as the most recent one. Dating every entry keeps that from happening.",
        ],
      },
      {
        heading: "The core discipline: this skill never generates a salary figure",
        body: [
          "This is the single most important thing this skill does, and the instruction it will not bend on: it never generates, estimates, or suggests a salary figure itself. If asked to fill in a number, or to just estimate what the range probably is, the skill refuses directly and explains why, rather than quietly complying with a plausible sounding answer.",
          "The refusal is not left implicit: a fabricated figure here is not a harmless placeholder, because the log exists to inform a real, consequential decision, such as accepting an offer or setting a counter. An invented number dressed up as researched data is worse than an honestly incomplete log, because it looks finished when it is not. So the skill points toward what real research looks like instead: a specific job posting to check, a specific published survey to search for, or a specific person in the target role worth asking.",
        ],
      },
      {
        heading: "How this differs from a salary negotiation prompt",
        body: [
          "A separate salary negotiation prompt on this site takes numbers a person already has and reasons with them, building three figures and priced negotiation levers from data the person supplies. As an ai skill to log salary research, this skill sits upstream of that entirely. It never reasons with a figure or produces a target, acceptable, or decline number; its only output is a clean, dated, sourced log someone might later hand to a negotiation prompt.",
          "The distinction matters because the two fail in opposite directions if confused. A negotiation prompt handed an unsourced guess will still confidently reason with it. A research log skill asked to reason with its own entries would be doing exactly the job it exists to avoid, so the boundary between logging and deciding stays a hard one.",
        ],
      },
      {
        heading: "The four fields every log entry requires",
        body: [
          "Every entry this skill accepts carries four fields, and an entry missing any one of them is refused rather than logged as complete. The figure is recorded exactly as the source stated it, never rounded or blended with another figure. The source is named specifically: a job posting by employer and title, a published salary survey by name and edition, or a real conversation naming who it was with and their actual role, never an unnamed acquaintance or an unnamed average found online.",
          "The date is logged too, since a figure found eight months ago carries different weight than one found last week, and an undated entry cannot tell the two apart. This is the structure a downloadable salary range log template gives a person: a repeatable shape, applied consistently, rather than a fresh format invented for every new figure.",
        ],
      },
      {
        heading: "Grading match quality: exact, close, or loose",
        body: [
          "The fourth field, match quality, is graded as exact, close, or loose against the role actually being researched, never left blank. An exact match shares the same title, level, and location. A close match shares most of those but differs on one dimension. A loose match is recognisably related work that differs more substantially, still worth logging, but weighted lightly.",
          "Grading honestly is what makes a log usable later. A person who wants to know how to log salary research sources correctly, rather than just collect numbers, needs each entry's reliability visible at a glance, not buried in a wall of undifferentiated figures that all look equally solid.",
        ],
      },
      {
        heading: "How to use the downloaded files",
        body: [
          "Hand both files to an AI assistant together, since the instructions file points to the entry format and worked example in the reference file. Keeping SKILL.md alongside a reference folder lets the assistant check a new entry against the example.",
        ],
      },
    ],
    howTo: {
      name: "How to use the salary range research log skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and the reference file on this page before downloading, so you know what you are handing to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the files shown in the preview, entirely in your browser.",
        },
        {
          name: "State the target role before logging anything",
          text: "Name the exact title, level, and location you are researching, since match quality is graded against this target.",
        },
        {
          name: "Log every figure with all four fields",
          text: "Record the figure as stated, name the source specifically, date it the day you found it, and grade match quality honestly.",
        },
      ],
    },
    faq: [
      {
        question: "Can this skill just tell me what I should ask for?",
        answer:
          "No, and this is deliberate rather than a limitation to work around. The skill only structures a log of figures found from real sources; it never turns entries into a suggested figure, a midpoint, or advice on what to ask for. That judgment stays a separate step for the person.",
      },
      {
        question: "What happens if I only have one source for a role?",
        answer:
          "The entry still gets logged, but it stands alone rather than being treated as confirmed. A single source, however well matched, is one data point, and the instructions call for at least two sources before treating a figure as reasonably established.",
      },
      {
        question: "Does the skill accept a recruiter's spoken figure as a source?",
        answer:
          "Yes, provided it is logged specifically: who said it, their role, the company, and the date of the conversation. A vaguely remembered figure with none of those details is refused as too unspecific to log.",
      },
      {
        question: "How is this different from a salary negotiation prompt?",
        answer:
          "A salary negotiation prompt reasons with figures a person already has, building a target, an acceptable number, and a decline point. This skill sits upstream of that: it only produces a clean, sourced, dated log of what was actually found.",
      },
      {
        question: "What happens if a logged figure has no clear date?",
        answer:
          "The entry is refused until a date is supplied, even an approximate one such as found in early March 2026. A figure with no date cannot be weighed against a more recent or more outdated one, defeating the purpose of a dated log.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the figures you log with this skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description: "For reasoning with figures already in hand into a target, acceptable and decline number, once this skill's log has sourced them.",
      },
      {
        href: "/tools/salary-hourly-converter",
        label: "salary hourly converter",
        description: "For converting a logged annual figure into an hourly rate comparable against a posting quoted in different units.",
      },
      {
        href: "/tools/freelance-rate-calculator",
        label: "freelance rate calculator",
        description: "For comparing a logged contract or client rate against the hourly floor your own income target actually requires.",
      },
      {
        href: "/skills/career-skills/interview-answer-structure-skill",
        label: "interview answer structure skill",
        description: "A sibling skill built on the same discipline: structuring real material honestly rather than inventing a detail to fill a gap.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.bls.gov/oes/",
        label: "US Bureau of Labor Statistics: Occupational Employment and Wage Statistics",
        description: "A published wage source worth naming specifically as a source, rather than citing loosely as an average online figure.",
      },
      {
        href: "https://www.dol.gov/general/topic/wages",
        label: "US Department of Labor: Wages",
        description: "Primary reference on wage rules that shapes what a real employer posting or disclosure can and cannot tell a researcher.",
      },
      {
        href: "https://www.indeed.com/career-advice/pay-salary",
        label: "Indeed: Pay and salary resources",
        description: "An independent hub of guidance on where salary information for a specific role and location can actually be found.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow, the same discipline this skill applies to a refusal.",
      },
    ],
  },

  tags: ["career", "salary research", "compensation", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

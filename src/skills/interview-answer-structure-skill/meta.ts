import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Interview Answer Structure Check

Use this skill whenever someone gives you a real story about something that happened to them at
work and asks for help shaping it into a behavioral interview answer using the Situation, Task,
Action, Result framework, commonly called STAR.

## Before you structure anything

Ask for, or confirm you already have, an account of something that actually happened: a real
project, a real decision, a real outcome, described by the person who was there. A one line
summary such as "I fixed a process problem" is not enough to work with. Ask for the specifics
that are missing: what was broken, what they were personally asked to handle, what they actually
did, and what changed afterward.

If a detail is missing, such as a number the person never measured or a date they cannot recall,
do not invent one on their behalf. Say plainly that the detail is missing, then either ask the
person to go and find it or help them phrase the sentence as a qualitative statement they can
actually defend without a fabricated figure attached to it.

## Sorting the real story into the four parts

Read through the story and identify which existing sentences already belong to which of the four
parts, rather than drafting new sentences from nothing.

1. Situation: the real context the story happened inside. A team, a deadline, a system, a
   customer, whatever set the scene for what came next.
2. Task: what the person was personally responsible for delivering, not what the team as a whole
   was working on around them.
3. Action: what the person specifically did, step by step, in their own verbs and their own
   decisions.
4. Result: what changed because of the action, stated as something that could be checked by
   someone else who was there.

Quote the phrase from the original story that belongs to each part before touching the wording.
Where a part already has a workable sentence, restructure and clarify that sentence. Do not
replace it with a new one invented from scratch.

## Checking each part is genuinely present and specific

Go through all four parts one at a time and check two separate things: whether the part is
present at all, and whether it is specific enough that another person could check it against
what actually happened.

A Situation that never names what was actually going on, such as "things were difficult," is too
vague to count as present. A sentence describing what "we" were doing as a team, without saying
what this person specifically owned, is not yet a Task, it is still Situation dressed up as one.
An Action described only as "I helped," with no verb naming a concrete decision or step, is too
thin to show what the person actually did. A Result that says only "it went well" or "leadership
was happy" is too vague; a genuine Result names what changed, even without an exact number, such
as which recurring problem stopped happening or what specifically became possible afterward that
was not possible before.

## Flagging a gap instead of hiding it

When a part is missing or too vague, say so directly and name which of the four parts it is. Do
not silently pad the answer with invented specifics just to make all four parts look complete.
A Result section that only says "it went well" gets flagged as too vague, with a direct question
back to the person about what actually changed, never quietly rewritten into a specific
percentage or dollar figure the person never gave you. The gap belongs to the person to fill with
a real answer, not to you to paper over.

## Returning the structured answer

Once all four parts are checked, return the answer organised under clear Situation, Task, Action
and Result headings, using the person's own words wherever a workable sentence already existed.
Alongside the structured version, list which parts were genuinely strong going in and which parts
still need the person to supply a specific detail you flagged but could not invent on their
behalf.

## What this skill does not do

It does not invent achievements, metrics, outcomes, job titles or anything else about what
happened. It does not accept a placeholder detail as though it had been checked, and it does not
smooth over a missing Result by manufacturing one that sounds convincing. If a story genuinely has
no measurable outcome, say so plainly and ask what did change, even in qualitative terms, rather
than supply a number nobody confirmed.
`;

const DIAGNOSIS_EXAMPLE_MD = `# Worked example: diagnosing a weak STAR answer without inventing facts

Use this alongside \`SKILL.md\` as a model for how a diagnosis pass should read: specific about
which part is weak, honest about what is still missing, and never filled in with an invented
detail to make the answer look more finished than the person's real account supports.

## The original story, as the candidate gave it

"At my last job our onboarding process was a mess and new hires kept getting confused. I worked
on fixing it and helped put together some better documentation. I also talked to a few new
starters about what they needed. It went well and people seemed happier afterward."

## Part by part diagnosis

**Situation: present, but thin.** "Our onboarding process was a mess and new hires kept getting
confused" names a real problem, which is a genuine Situation. It is missing scale: how many new
hires, over what period, at what kind of company. Ask the candidate for that instead of assuming
a number. If they only remember "a handful over about six months," that qualitative scale is
still usable and still theirs.

**Task: missing, currently folded into Situation.** "I worked on fixing it" does not say what the
candidate was actually asked to own. Was this assigned to them, did they volunteer, were they the
only person on it or one of several. Ask directly: what were you specifically responsible for
delivering, and who gave you that responsibility. Do not guess an answer like "was appointed lead
of the onboarding taskforce" when nothing in the story supports it.

**Action: present, but generic.** "Helped put together some better documentation" and "talked to
a few new starters about what they needed" are real actions but described too generally to show
judgment. Ask what the documentation actually changed, in what order the candidate did things, and
what they decided based on what the new starters told them. If the candidate says "I rewrote the
first week checklist so it matched what people actually asked about in their first meeting," that
sentence belongs in Action and it came directly from them, not from a guess.

**Result: too vague to count as present.** "It went well and people seemed happier afterward" is
exactly the kind of Result this skill flags rather than accepts. It names no change that another
person could check. The honest move is to ask directly: what specifically changed. If the
candidate genuinely does not know, that is the answer to record, paired with a suggestion to go
find out, for example by asking a former colleague or checking whether onboarding time was ever
tracked.

## What a strengthened version looks like, built only from clarified real facts

Suppose the candidate then recalls, unprompted, that the same new hire questions used to come up
in every first week meeting, and that after the documentation rewrite those specific questions
stopped coming up. That detail was always true, it just had not been said yet. The strengthened
Result becomes: "the questions that used to come up in every first week meeting stopped coming
up," which is checkable and belongs to the candidate, not invented by whoever is helping them.

## What was deliberately not done

No percentage was added to the Result. No specific number of new hires was invented for the
Situation. No formal title such as "onboarding lead" was assigned to the candidate in the Task
without them confirming it. Every strengthened sentence traces back to something the candidate
actually said, either in the original account or in response to a direct follow up question.
`;

const meta: SkillMeta = {
  slug: "interview-answer-structure-skill",
  name: "Interview Answer Structure Check",
  title: "Interview Answer Structure Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that sorts a candidate's real interview story into Situation, Task, Action and Result, checks each part is genuinely present and specific, and never invents a detail the candidate did not give it.",

  seo: {
    primaryKeyword: "interview answer structure skill",
    keywords: [
      "interview answer structure skill",
      "free ai skill for behavioral interviews",
      "downloadable star method checklist",
      "ai skill to structure interview answers",
      "situation task action result skill",
    ],
    seoTitle: "Interview Answer Structure Skill: Free STAR Skill Download",
    seoDescription:
      "A free, downloadable interview answer structure skill that sorts a real story into Situation, Task, Action and Result and never invents a detail.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/star-diagnosis-example.md", content: DIAGNOSIS_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to structure a thin story into all four STAR parts, models reliably fill a missing or vague Result with a plausible sounding number or outcome the candidate never supplied, which makes an incomplete answer look finished rather than flagging the real gap. This skill's instructions require every strengthened sentence to trace back to something the candidate actually said, and require a missing part to be named directly rather than quietly manufactured.",
  },

  article: {
    intro: [
      "An interview answer structure skill is only worth downloading if it can tell the difference between a story that is genuinely complete and one that only looks complete because a gap got smoothed over. Handed a thin account of what someone did at work, most AI assistants will happily invent the missing detail, usually the Result, and hand back a confident looking answer that the candidate cannot actually defend under a follow up question.",
      "This skill is built to do the opposite. It takes a real story the candidate already lived through, sorts the existing sentences into Situation, Task, Action and Result, checks each part is genuinely present and specific enough to be checked by someone else, and names exactly which part is missing or vague rather than papering over it.",
      "It ships as two plain text files: a main instructions file and a worked reference example that diagnoses a weak answer part by part and strengthens it using only facts the candidate actually supplied. Both are previewable in full on this page before you download the zip, and both are exactly what a candidate or a career coach receives once the archive is handed over.",
    ],

    sections: [
      {
        heading: "Why a real story is the only acceptable input",
        body: [
          "A behavioral interview question is testing whether a candidate can account for something they actually did, so an answer built from an invented example fails the moment a real interviewer asks a specific follow up. This skill's first instruction is to confirm the account it has been given actually happened, and to ask for the specific missing details rather than accept a one line summary as though it were the whole story.",
          "When a detail genuinely is not known, such as a number the candidate never measured, the skill says so plainly instead of filling the gap with a plausible figure. That is the difference between an interview answer structure skill that survives a real follow up question and one that just sounds finished on the page. It is also why this is offered as a free ai skill for behavioral interviews rather than a script generator: the value is in the honest check, not a polished paragraph.",
        ],
      },
      {
        heading: "Sorting a real story into Situation, Task, Action and Result",
        body: [
          "As a situation task action result skill, its whole job is reading through the existing story and identifying which sentences already belong to which of the four parts, quoting the original phrase before touching a single word of it. Situation is the real context the story happened inside. Task is what the person was personally responsible for, not what the wider team was doing around them. Action is the specific steps the person took, in their own decisions and their own verbs. Result is what changed because of it, stated so another person could check it.",
          "Where a part already has a workable sentence, the skill restructures and clarifies that sentence rather than replacing it with something invented from nothing.",
        ],
      },
      {
        heading: "Checking that each part is genuinely present and specific",
        body: [
          "Presence and specificity are checked separately for every part, as an ai skill to structure interview answers has to do to be useful. A Situation that never names what was actually going on is too vague to count. A sentence about what 'we' were doing, with no mention of what this person personally owned, is still Situation dressed up as a Task. An Action described only as 'I helped' is too thin to show real judgment.",
          "A Result that only says 'it went well' is flagged exactly the same way: too vague, not accepted, with a direct question sent back about what specifically changed.",
        ],
      },
      {
        heading: "The never fabricate discipline: restructuring a real story, not inventing a better one",
        body: [
          "This is the core constraint the entire skill is built around. Every strengthened sentence has to trace back to something the candidate actually said, either in the original account or in response to a direct follow up question the skill asks them. Nothing about the candidate's achievements, numbers, outcomes, titles or dates is invented, embellished, or rounded up to sound more impressive.",
          "This is what separates restructuring from ghostwriting. A downloadable star method checklist that quietly manufactures a percentage to fill an empty Result is not helping the candidate, it is setting them up to be caught out the moment a real interviewer asks how that number was measured.",
        ],
      },
      {
        heading: "Flagging a gap instead of hiding it",
        body: [
          "When a part is missing or too vague, the skill names exactly which of the four parts it is, rather than rewriting the whole answer around the gap so it disappears from view. A vague Result is not quietly reworded into something that sounds finished; it is called out directly, with the person asked what actually changed.",
          "This keeps the feedback useful. The candidate learns precisely which part of their story still needs a real detail, instead of receiving a polished answer that hides exactly the weakness a real interview would find.",
        ],
      },
      {
        heading: "How to use the downloaded files",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file points to the worked reference example by its relative path. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that reference so the diagnosis pattern in the example stays available while structuring a new story.",
        ],
      },
    ],

    howTo: {
      name: "How to use the interview answer structure skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/star-diagnosis-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Bring a real story",
          text: "Write down something that actually happened at work, including the parts you are not sure sound impressive, before handing it to an assistant running this skill.",
        },
        {
          name: "Answer every follow up honestly",
          text: "When the skill flags a missing or vague part, answer with a real detail or say plainly that you do not know it, rather than inventing something to fill the gap yourself.",
        },
      ],
    },

    faq: [
      {
        question: "What happens if my story genuinely has no measurable Result?",
        answer:
          "The skill says so plainly instead of inventing one. It asks what specifically changed, even in qualitative terms such as a recurring problem that stopped happening, and treats that honest answer as the Result rather than manufacturing a percentage or dollar figure nobody confirmed.",
      },
      {
        question: "Will this skill write a better story for me if mine is thin?",
        answer:
          "No. It restructures and clarifies the story you actually give it and asks follow up questions to surface details you already know but had not stated, but it will not invent an achievement, a number, or an outcome on your behalf, no matter how thin the original account is.",
      },
      {
        question: "How does it decide a Result like 'it went well' is too vague?",
        answer:
          "A genuine Result names something checkable, such as what specifically changed or which problem stopped happening. A phrase that only states a feeling or a general impression, with nothing another person could verify, is flagged directly as too vague rather than accepted as complete.",
      },
      {
        question: "Can it help with a story where I was one of several people involved?",
        answer:
          "Yes, and this is exactly where the Task check matters most. The skill separates what the wider team was doing from what you specifically were responsible for and asks you to state that boundary clearly, rather than letting a 'we did this' sentence stand in for your individual contribution.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the story you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "The worked diagnosis example is long enough that folding it into the main instructions file would bury the process steps under a single lengthy illustration. Splitting it into its own reference file lets the instructions stay focused while the example remains available for the assistant to model its diagnosis on.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description: "For rehearsing an answer live against a sceptical follow up question, once this skill has structured the story you plan to tell.",
      },
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description: "The resume line that gets you into the room is often the same real story this skill later structures into a full answer.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description: "The specific, checkable Result this skill surfaces is the same evidence a later negotiation conversation runs on.",
      },
      {
        href: "/career-prompts/promotion-case-prompt",
        label: "promotion case prompt",
        description: "Building a promotion case draws on the same discipline of a real, specific outcome rather than a vague claim of success.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique",
        label: "Indeed: How to use the STAR interview response technique",
        description: "An independent explainer of the four part Situation, Task, Action, Result structure this skill checks against.",
      },
      {
        href: "https://www.themuse.com/advice/star-interview-method",
        label: "The Muse: The STAR interview method",
        description: "A widely used breakdown of what makes each of the four STAR parts specific enough to hold up under a follow up question.",
      },
      {
        href: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/",
        label: "US Office of Personnel Management: Structured interviews",
        description: "The federal reference on structured behavioral interviewing and why specific, checkable evidence matters more than a polished narrative.",
      },
      {
        href: "https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a real story.",
      },
    ],
  },

  tags: ["career", "interview prep", "star method", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

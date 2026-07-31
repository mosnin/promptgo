import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Thank You Note Specificity Check

Use this skill after a post interview thank you note or email has already been drafted, to
check whether it references anything real from the actual interview conversation, or reads as
something that could have followed any interview with any company.

## The two required inputs

Do not run a check with only the draft note. This skill needs two things supplied in full.

1. The draft thank you note or email, exactly as written.
2. The candidate's real notes on what was actually discussed in the interview: specific
   questions asked, specific topics covered, and the names of the interviewers.

If the interview notes are missing, say so plainly and ask for them before proceeding. A
sentence in a thank you note cannot be checked for groundedness against a conversation nobody
described. Do not guess at what a typical interview for that kind of role probably covered and
check the note against that guess instead.

## Extracting every reference in the note

Read the draft note sentence by sentence and pull out every sentence that could plausibly be a
reference to the interview itself, as opposed to a sentence that is pure closing courtesy such
as a greeting or a sign off. List each one, quoted exactly as written, before judging any of
them, so the full set being checked stays visible to whoever reads the output.

## Marking each reference GROUNDED or GENERIC

For every extracted sentence, compare it against the real interview notes supplied and mark it
one of two ways.

- GROUNDED: the sentence names something that appears in the real interview notes. Quote the
  exact line from the notes that supports it, side by side with the sentence from the draft.
- GENERIC: the sentence could have been sent after any interview with any company, because
  nothing in it traces to a specific detail in the real interview notes. A phrase such as thank
  you for your time or I am very excited about this opportunity is GENERIC by default, no
  matter how warm it sounds, unless it is immediately followed by a specific detail that makes
  it concrete.

A sentence naming an interviewer correctly, referencing a specific question that was asked, or
referencing a specific topic the notes describe as discussed, is a candidate for GROUNDED. A
sentence naming a detail that is not present anywhere in the supplied notes does not get marked
GROUNDED, even if it sounds plausible for that kind of interview. Flag it as unsupported
instead, and say plainly that the note references something this check cannot confirm was
actually discussed.

## Never inventing an interview detail on the candidate's behalf

This is the rule the whole skill exists to enforce. When a note reads as generic and the real
interview notes are thin, do not draft a replacement sentence that invents a plausible sounding
detail, a project name, a question topic, a shared interest, to make the note look more
specific than the interview notes actually support. Point out exactly what is missing and ask
the candidate to supply it from memory, or state that the sentence stays generic unless a real
detail is added.

## Reporting the result

Report every extracted sentence with its verdict, GROUNDED or GENERIC, and for GROUNDED
sentences quote the supporting line from the real interview notes alongside it. Close with a
short count: how many sentences were checked, how many were GROUNDED, and how many were
GENERIC. A note with zero GROUNDED references should be flagged plainly as one that could be
sent after any interview, regardless of how polished or warm its language is.

## What this skill does not do

It does not write a thank you note from scratch, and it does not invent an interview detail to
patch a generic sentence. It does not accept a specific sounding detail as GROUNDED unless that
detail traces to the real interview notes supplied for that specific check, and it does not
proceed on a draft note alone without those notes.
`;

const GROUNDED_EXAMPLE_MD = `# Worked example: grounded and generic references side by side

Use this alongside \`SKILL.md\` as a model for how a groundedness check should read: every
reference sentence quoted exactly, checked against the real interview notes, and marked plainly
instead of assumed.

## The candidate's real interview notes, as supplied

Interviewed with Priya Nandan, engineering manager, and Tom Bradfield, senior backend engineer.
Priya asked about a time the candidate had to debug a production incident under time pressure,
and the candidate described a checkout timeout bug from March. Tom spent most of the
conversation asking how the candidate would approach migrating a monolith service into smaller
pieces, and the candidate walked through a rough plan using the strangler pattern. Near the end
Priya mentioned the team is about to start a project moving their queue system off a vendor
they are unhappy with, and asked how the candidate would prioritise that against ongoing
feature work.

## The draft thank you note, as supplied

Hi Priya and Tom, thank you both for taking the time to speak with me today. I really enjoyed
our conversation and I am very excited about the opportunity to join your team. I think my
background lines up well with what you are looking for and I would love the chance to
contribute. Tom, I appreciated you walking through your thinking on breaking apart the
monolith, it matched a lot of how I think about that kind of migration using the strangler
pattern. Looking forward to hearing about next steps.

## Sentence by sentence check

1. Hi Priya and Tom, thank you both for taking the time to speak with me today. GROUNDED. Both
   names appear in the real interview notes as the two interviewers, so naming them correctly
   is a checkable reference to who was actually in the room, not an assumption.

2. I really enjoyed our conversation and I am very excited about the opportunity to join your
   team. GENERIC. Nothing in this sentence traces to a specific detail in the interview notes.
   The exact same sentence could follow any interview with any company, and nothing about it
   would need to change if the company or the role changed.

3. I think my background lines up well with what you are looking for and I would love the
   chance to contribute. GENERIC. The same failure as above, a general statement of fit with no
   specific project, question or topic named anywhere in it.

4. Tom, I appreciated you walking through your thinking on breaking apart the monolith, it
   matched a lot of how I think about that kind of migration using the strangler pattern.
   GROUNDED. The interview notes state that Tom asked about migrating a monolith into smaller
   pieces and that the candidate discussed the strangler pattern, so this sentence names a
   specific topic that traces directly back to the supplied notes.

5. Looking forward to hearing about next steps. GENERIC in form, but treated as closing
   courtesy rather than counted against the note, since it makes no claim about the
   conversation at all.

## What the check flags back to the candidate

Sentences checked: five. GROUNDED: two. GENERIC: two, excluding the closing courtesy line. The
note has real, checkable references to Tom's monolith migration question and correctly names
both interviewers, but the opening excitement sentence and the fit sentence are interchangeable
with any other company's interview. Priya's question about prioritising the queue migration
against feature work, the most recent and most memorable part of the conversation according to
the notes, is never referenced anywhere in the draft. That gap is worth flagging back to the
candidate as a missed opportunity for a genuinely grounded sentence, not something this skill
should draft on the candidate's behalf.
`;

const meta: SkillMeta = {
  slug: "thank-you-note-specificity-skill",
  name: "Thank You Note Specificity Check",
  title: "Thank You Note Specificity Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that checks a drafted post interview thank you note against the candidate's real interview notes, marking every reference GROUNDED or GENERIC, and refuses to invent a plausible interview detail when no real notes are supplied.",

  seo: {
    primaryKeyword: "thank you note specificity skill",
    keywords: [
      "thank you note specificity skill",
      "ai skill to check interview thank you notes",
      "downloadable checklist for grounded thank you notes",
      "how to check a thank you note for generic phrases",
      "free ai skill for post interview follow up notes",
    ],
    seoTitle: "Thank You Note Specificity Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable thank you note specificity skill that checks a post interview note against real interview notes and marks every sentence GROUNDED or GENERIC.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/grounded-example.md", content: GROUNDED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a post interview thank you note reliably praise its warmth and structure without ever checking whether a single sentence traces to something that actually happened in the conversation, and when a note reads as thin they tend to invent a plausible sounding project or topic to patch it rather than flag the gap. This skill's sentence by sentence GROUNDED or GENERIC check forces every judgment to trace to a line in real interview notes, and requires the check to say plainly when no such notes were supplied rather than proceeding on an assumed conversation.",
  },

  article: {
    intro: [
      "A thank you note specificity skill only earns its name if it can tell a note that references something real from the interview apart from a note that could have been sent after any interview with any company. Handed a draft thank you note and nothing else, most AI assistants will happily polish the wording and call it done, without ever checking whether a single sentence in it is tied to what was actually discussed.",
      "It ships as two plain text files: a main instructions file and a worked example file showing a real set of interview notes checked against a real draft, sentence by sentence, with each reference marked GROUNDED or GENERIC. Both are previewable in full on this page before you download the zip, and both are exactly what a teammate or an AI assistant receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "Why a warm sounding note can still be entirely generic",
        body: [
          "Two candidates can send a thank you note using almost identical phrasing, warm, polite, well punctuated, and one of those notes can be traced sentence by sentence back to a real conversation while the other could have followed any interview at any company. A model asked to judge the note has almost nothing to check that difference against, unless it is handed the real interview notes and instructed to compare them line by line.",
          "A thank you note specificity skill exists because warmth and specificity are not the same signal. A note can be warm and entirely generic at once, and it is the generic half of that pair, not the warmth, that hiring managers report noticing as interchangeable across dozens of candidates.",
        ],
      },
      {
        heading: "The two required inputs, and why neither is optional",
        body: [
          "This skill will not run a groundedness check against a draft note alone. It needs the draft exactly as written, and it needs the candidate's real notes on what was actually discussed: specific questions asked, specific topics covered, and the names of the interviewers who were in the room.",
          "When the interview notes are missing, the skill says so plainly and asks for them rather than guessing at what a typical interview for that role probably covered. Checking a note against an assumed conversation instead of a real one produces a result that looks like a check and is not one.",
        ],
      },
      {
        heading: "Marking every reference GROUNDED or GENERIC, as an ai skill to check interview thank you notes",
        body: [
          "Every sentence in the draft that could plausibly reference the interview gets extracted and quoted exactly, then compared against the real interview notes supplied for that check. A sentence that names something present in those notes, an interviewer by name, a specific question, a specific topic, gets marked GROUNDED, with the exact supporting line from the notes quoted alongside it.",
          "A sentence that could have followed any interview with any company gets marked GENERIC, even when it sounds warm and sincere. Thank you for your time and I am very excited about this opportunity are treated as GENERIC by default unless a specific detail immediately follows to anchor them.",
        ],
      },
      {
        heading: "Why this check never invents an interview detail",
        body: [
          "The rule this skill exists to enforce is simple to state and easy for a model to quietly break: when a note is generic and the interview notes are thin, do not draft a replacement sentence that invents a plausible sounding project name, question topic, or shared interest to make the note look more specific than the conversation supports.",
          "Instead the gap gets pointed out directly, and the candidate is asked to supply the missing detail from memory. A thank you note specificity skill that filled in its own plausible details would be solving the wrong problem, since the point is to catch language never tied to a real exchange in the first place.",
        ],
      },
      {
        heading: "How this differs from checking an interview answer or a cover letter",
        body: [
          "A related skill on this site checks the structure of an answer given during an interview itself, sorting a candidate's real story into Situation, Task, Action and Result. That is a different artifact at a different moment: an answer spoken live inside the interview, not a note written afterward and checked against a record of the conversation.",
          "Another related skill checks a cover letter's specific claims against a job posting and a candidate's background material, a different comparison source entirely. This skill's comparison source is always the real interview notes, and its artifact is always the note or email sent after the interview has ended.",
        ],
      },
      {
        heading: "Using the downloaded files as a downloadable checklist for grounded thank you notes",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file assumes the worked example sits alongside it in the same reference folder. Supply the draft note and the real interview notes in full each time, since the check is only as good as the record of the conversation it is compared against.",
        ],
      },
    ],
    howTo: {
      name: "How to use the thank you note specificity skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/grounded-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Write down what was actually discussed",
          text: "Before checking any draft, capture the real interview notes: specific questions asked, specific topics covered, and the names of the interviewers, while the conversation is still fresh.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply your draft note and your real interview notes together.",
        },
        {
          name: "Revise using the GROUNDED and GENERIC verdicts",
          text: "Replace or cut sentences marked GENERIC with a real detail from your notes where one exists, and leave the gap flagged where it does not, rather than inventing one.",
        },
      ],
    },
    faq: [
      {
        question: "How to check a thank you note for generic phrases before sending it?",
        answer:
          "Supply the draft note alongside the candidate's real interview notes, then have the skill extract every sentence that could plausibly reference the interview and mark each one GROUNDED or GENERIC against what the notes actually describe as discussed, rather than judging warmth or polish alone.",
      },
      {
        question: "What happens if I don't have real interview notes to check against?",
        answer:
          "The skill states plainly that groundedness cannot be checked without a real record of what was discussed, and asks for specific questions asked, topics covered, and interviewer names before attempting any sentence by sentence comparison against the draft.",
      },
      {
        question: "Will the skill invent a specific detail to fix a generic sentence?",
        answer:
          "No, and its instructions explicitly forbid it. A generic sentence gets flagged and explained, never quietly rewritten with a plausible sounding project name or shared interest the candidate never actually discussed in the real interview.",
      },
      {
        question: "Is this a free ai skill for post interview follow up notes, or does it write the note itself?",
        answer:
          "It is a free ai skill for post interview follow up notes that checks a note someone else already drafted; it does not draft a thank you note from a blank page. A separate prompt on this site handles first drafts built around one specific remembered moment.",
      },
      {
        question: "Does a GROUNDED sentence mean the note is good writing?",
        answer:
          "Not on its own. GROUNDED only measures whether a sentence traces to something real from the interview, not whether it is well phrased, appropriately brief, or free of other issues. A note can have every reference GROUNDED and still need editing for length or tone.",
      },
      {
        question: "How is this different from the site's interview answer structure skill?",
        answer:
          "That skill checks the structure of an answer spoken live during an interview, sorted into Situation, Task, Action and Result. This skill checks a written note sent after the interview has ended, comparing it against real interview notes rather than checking an answer's internal structure.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in the browser. There is no server call behind either action, and nothing about the interview notes or draft note used with this skill afterward is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/career-prompts/thank-you-note-prompt",
        label: "thank you note prompt",
        description: "For drafting a first thank you note built around one remembered moment, the natural input this skill checks once a draft exists.",
      },
      {
        href: "/skills/career-skills/interview-answer-structure-skill",
        label: "interview answer structure skill",
        description: "Checks the structure of an answer given live during an interview, a different artifact and a different moment from a note sent afterward.",
      },
      {
        href: "/skills/career-skills/cover-letter-fact-check-skill",
        label: "cover letter fact check skill",
        description: "Checks a cover letter's specific claims against a job posting and background material, a different comparison source from this skill's real interview notes.",
      },
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description: "For drafting the STAR formatted answer that the interview answer structure skill later checks, part of the same interview preparation cluster.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.indeed.com/career-advice/interviewing/sample-thank-you-letter-after-interview",
        label: "Indeed: Sample thank you letter after an interview",
        description: "Career advice recommending candidates reference details of what was discussed rather than send a generic message, the same distinction this skill checks for.",
      },
      {
        href: "https://www.themuse.com/advice/6-thank-you-note-mistakes-that-could-very-easily-ruin-your-chances",
        label: "The Muse: Thank you note mistakes to avoid",
        description: "Independent career guidance naming a cookie cutter message that could apply to any job or company as a specific, common mistake.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to groundedness review.",
      },
    ],
  },

  tags: ["career", "thank you note", "interview follow up", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

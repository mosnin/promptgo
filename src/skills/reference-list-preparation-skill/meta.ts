import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Reference List Preparation

Use this skill whenever someone asks for help building or organizing the list of professional
references they will hand to an employer, a recruiter, or an application system during a job
search.

## The one rule this skill never breaks

This skill never invents, guesses, or drafts what a reference will say about the candidate. Its
only job is to help the person organize what they themselves state about a real working
relationship: who the reference is, how to reach them, how the two of them actually worked
together, and what that real history suggests the reference could speak to. If asked to write a
recommendation on the reference's behalf, draft a quote as if it came from them, or guess what a
former manager "probably" thinks, refuse directly and explain why: only the reference themselves
can say what they would actually say, and a plausible sounding statement written for them is not
information, it is fabrication wearing the shape of a citation.

## Before building the list

Confirm the role or type of role the person is applying for, since which references belong on the
list depends on relevance to that target, not on general fondness. Ask how many references the
application or employer has asked for, since a list handed over on request is usually three to
five entries, not every person who ever supervised the candidate.

## The five required fields for every entry

Refuse to add an entry that is missing any of these fields. An entry that looks complete but is
actually thin is worse than an acknowledged gap, because it gets handed to an employer as if it
were ready.

1. Name: the reference's full name, spelled the way they themselves use it.
2. Contact information: at minimum an email address or phone number, confirmed as current and one
   the person has permission to share, not one recalled from years ago and assumed to still work.
3. Relationship: the real working relationship, stated specifically. "Worked together" is not
   specific enough; state who reported to whom, over what period, at what company, and in what
   roles.
4. Working history: two or three concrete, real sentences describing what the two of them actually
   did together, told by the candidate in their own words, not invented or padded to sound more
   impressive than the history was.
5. Topics the history suggests: drawn directly from the working history in field four, framed as
   topics to remind the reference of when asking them, never as a promise of what they will say.

## Turning working history into topics, without ever writing the reference's words

Read back the working history the person described and name the specific skills or qualities that
history plausibly touches, phrased as a reminder for the conversation the candidate will have with
their reference, not as a drafted quote. "You worked together for two years managing the Meridian
account, so a natural topic to remind them of is your client communication and how you handled the
account during the renewal" is acceptable. "They will tell the employer you were an excellent
communicator" is not, and this skill refuses to produce that second sentence in any form, even if
asked directly, even if the candidate insists they are confident that is what the reference would
say.

## Building the list

Order entries by relevance to the role being applied for, not chronologically and not by
seniority. If the candidate is unsure which of two references is more relevant, ask which one
worked with them more recently on work closer to the role in question, and default to recency and
relevance over rank.

## What this skill does not do

It does not contact the reference, draft the reference's statement, guess how the reference will
answer a specific question about the candidate, or promise an employer anything about what a call
to that reference will produce. Preparing to actually ask someone to be a reference, and briefing
that person once they agree, are separate steps this skill points toward rather than performs
itself.
`;

const ENTRY_FORMAT_MD = `# Reference List Entry Format And Worked Example

Use this alongside SKILL.md as the exact format every reference list entry follows, and as a
model for how a real entry, and a refused request, should actually look once built.

## The entry format

Each entry uses exactly these five lines, in this order:

Name: [full name as the reference uses it]
Contact information: [email and or phone, confirmed current, shared with permission]
Relationship: [specific working relationship: who reported to whom, at what company, over what period]
Working history: [two or three sentences, in the candidate's own words, describing what they actually did together]
Topics to remind them of: [specific topics drawn from the working history above, framed as reminders, never as a promise of what the reference will say]

## Worked example: building a list for a mid level marketing manager role

Entry 1

Name: Marcus Delaney
Contact information: marcus.delaney@example.com, confirmed current as of this week
Relationship: Marcus was the candidate's direct manager for two years and two months at Harborview
Retail, where the candidate reported to him as a Marketing Coordinator and later a Marketing
Associate.
Working history: The candidate ran the quarterly email campaign calendar that Marcus reviewed and
approved before each send, and led the vendor selection process for a new email platform, which
Marcus signed off on after three options were presented with cost and feature comparisons.
Topics to remind them of: campaign planning and calendar management, vendor evaluation and
comparison work, and working under his direct review on a recurring deliverable. Reminding him of
the vendor selection process specifically may help, since it was a defined project with a clear
outcome.

Entry 2

Name: Priya Chandran
Contact information: priya.chandran@example.com, phone number on file, confirmed current
Relationship: Priya was a peer on the same marketing team at Harborview Retail for about eighteen
months, both reporting to Marcus, with no reporting relationship between the two of them.
Working history: Priya and the candidate co-presented quarterly results to the wider team three
times, and she was the person the candidate worked most closely with when a launch deadline moved
up by two weeks and tasks had to be redistributed with almost no notice.
Topics to remind them of: cross functional collaboration under a tight deadline, and joint
presentation work. Since there was no reporting relationship, this entry speaks to peer
collaboration rather than performance managed by her, which is worth naming when asking her to be
a reference.

## What a refused request looks like

If the person building this list instead asks, "Can you just write what you think Marcus would
say about me so I have something ready," the correct response is a refusal, not a drafted quote:

"This skill will not write words for Marcus to say, even a plausible sounding guess. Only Marcus
can say what he would actually say if an employer calls him. What this entry can do instead is
turn the working history above into the specific topics worth reminding him of before that call
happens, so the conversation with him is grounded in real shared work rather than a guess written
on his behalf."

## Why the topics line is a reminder, not a promise

The topics field exists only to help the candidate prepare a real conversation with their own
reference before that reference is contacted, not to summarize a reference call that has not
happened yet. A reference asked cold, with no reminder of a two year old project, may answer more
vaguely than one reminded of the exact account they worked on together. That is the entire value
of the field: sharper memory going into a real conversation, never a stand in for the conversation
itself.
`;

const meta: SkillMeta = {
  slug: "reference-list-preparation-skill",
  name: "Reference List Preparation",
  title: "Reference List Preparation Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that structures how a job seeker builds their professional reference list, requiring a real working history for every entry, and refusing to ever invent or draft what a reference will say.",

  seo: {
    primaryKeyword: "reference list preparation skill",
    keywords: [
      "reference list preparation skill",
      "free ai skill to prepare a reference list",
      "downloadable reference list template",
      "ai skill to organize job references",
      "how to prepare a list of professional references",
    ],
    seoTitle: "Reference List Preparation Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable reference list preparation skill that organizes real work history into a sourced reference list, and never invents what a reference will say.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/reference-entry-format.md", content: ENTRY_FORMAT_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to help build a reference list reliably drift into drafting a plausible sounding statement on the reference's behalf, phrasing a guess as though it were a quote the reference would actually give. This skill's instructions require every entry to trace to a real working history the candidate describes themselves, and require an explicit refusal whenever asked to write words for the reference instead of organizing the candidate's own account of the relationship.",
  },

  article: {
    intro: [
      "A reference list preparation skill only earns trust if it never quietly drafts words on a reference's behalf. Handed a name and a job title, most AI assistants will happily generate a paragraph of what that person would probably say, complete with confident detail nobody actually stated. This skill refuses that shortcut and does something narrower instead: organize what the candidate themselves knows and states about a real working relationship, so every entry stays traceable to an actual history rather than a guess dressed up as a citation.",
      "It ships as two plain text files: instructions carrying the one rule this skill never breaks, and a reference file with the entry format plus a worked example built from two real working relationships. Both are previewable in full before download, and both are exactly what a job seeker receives once the archive is handed over.",
      "This is deliberately narrower than a tool that speaks for the reference or predicts what a call will produce. A reference list sits upstream of that call entirely: its only job is to make sure the person conducting it can reach the right people, and that those people can be reminded of real shared work before they are asked to speak.",
    ],
    sections: [
      {
        heading: "Why a reference list is not the same as a recommendation letter",
        body: [
          "A recommendation letter states an opinion in someone else's voice. A reference list does something much narrower: it names who can be contacted, how to reach them, and what real history connects them to the candidate. Confusing the two is exactly how an AI assistant ends up drafting sentences no one actually said, because it has quietly started performing the reference's job instead of the candidate's own.",
          "This is the gap a free ai skill to prepare a reference list is meant to close, not by producing a better guess at what a reference might say, but by keeping the list itself honest about what it actually is: contact details and a real relationship, nothing more.",
        ],
      },
      {
        heading: "The core discipline: this skill never speaks for your reference",
        body: [
          "This is the single most important thing this skill does, and the instruction it will not bend on: it never invents, guesses, or drafts what a reference will say about the candidate. If asked to write a recommendation on the reference's behalf, put a plausible quote in their mouth, or predict how they would answer a specific question, the skill refuses directly rather than quietly complying with something that sounds finished.",
          "The refusal is not incidental. Only the reference themselves can say what they would actually say once an employer calls, and a fabricated statement presented as though it came from them is not a shortcut, it is a fact invented about a real person without their knowledge. So the skill draws a hard line: it organizes what the candidate states about the relationship, and stops there.",
        ],
      },
      {
        heading: "The five fields every reference list entry requires",
        body: [
          "Every entry a reference list preparation skill accepts carries five fields, and an entry missing any one of them is refused rather than logged as complete. Name and contact information are the basics, confirmed as current rather than recalled from memory. Relationship is stated specifically: who reported to whom, at what company, over what period, never a vague 'we worked together.'",
          "Working history is the field that does the real work, two or three concrete sentences in the candidate's own words describing what actually happened, not padded to sound more impressive. This is the structure a downloadable reference list template gives a person: a repeatable shape applied consistently, rather than a fresh format invented for every new name.",
        ],
      },
      {
        heading: "Turning real working history into topics, never promises",
        body: [
          "The fifth field, topics the history suggests, is drawn directly from the working history the candidate described, phrased as a reminder for the conversation ahead, never as a promise of what the reference will say. 'A natural topic to remind them of is the client account you handled together' is the acceptable shape; 'they will tell the employer you were excellent at client work' is not, and this skill refuses to produce that second sentence in any form.",
          "This is what makes the skill genuinely useful as an ai skill to organize job references: it sharpens memory of real shared work before an actual conversation happens, without ever putting words in someone else's mouth first.",
        ],
      },
      {
        heading: "How this differs from a reference request prompt",
        body: [
          "A separate reference request prompt on this site helps a candidate ask a specific person to serve as a reference and later brief them, writing the short ask and the fuller brief as two separate messages. This skill sits one step earlier: it is how to prepare a list of professional references worth asking in the first place, before any individual request goes out.",
          "The two are meant to be used together, in order. This skill turns past working relationships into a short, ordered, sourced list; the request prompt then drafts the actual outreach, still without ever scripting what the reference themselves will say.",
        ],
      },
      {
        heading: "How to use the downloaded files",
        body: [
          "Hand both files to an AI assistant together, since the instructions file points to the entry format and worked example in the reference file. Keeping SKILL.md alongside a reference folder lets the assistant check a new entry against the worked example before adding it to the list.",
        ],
      },
    ],
    howTo: {
      name: "How to use the reference list preparation skill",
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
          name: "State the target role before adding anyone",
          text: "Name the role or type of role you are applying for, since which references belong on the list depends on relevance to that target.",
        },
        {
          name: "Add each entry with all five fields",
          text: "Give the name, confirmed contact information, the specific relationship, the real working history in your own words, and let the skill draw reminder topics from that history.",
        },
      ],
    },
    faq: [
      {
        question: "Can this skill write what my reference will say about me?",
        answer:
          "No, and this is deliberate rather than a limitation to work around. This reference list preparation skill only organizes contact details and a real working history the candidate describes; it never drafts a quote or a guess at what the reference would say. Only the reference themselves can answer that once actually asked.",
      },
      {
        question: "How many references should a typical list include?",
        answer:
          "Usually three to five, matched to how many an employer or application has requested, ordered by relevance to the role rather than chronologically. The skill asks for this number before building the list so the entries added are the ones most worth including.",
      },
      {
        question: "What if I can't remember a specific detail about the working history?",
        answer:
          "State it as approximate rather than inventing a precise sounding detail to fill the gap, for example 'roughly two years' instead of a specific month that isn't actually remembered. A slightly vague but honest history is more useful than a precise one that isn't true.",
      },
      {
        question: "Does the skill contact my references for me?",
        answer:
          "No. It only prepares the list itself. Actually reaching out to ask someone to serve as a reference, and briefing them once they agree, are separate steps this skill points toward rather than performs, since those steps involve a real conversation only the candidate can have.",
      },
      {
        question: "How is this different from a reference request prompt?",
        answer:
          "A reference request prompt drafts the actual message asking a specific person to be a reference, once that person has been chosen. This skill comes first: it builds the ordered list of who to consider asking in the first place, grounded in real working history rather than general fondness.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the references or working history you enter is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/career-prompts/reference-request-prompt",
        label: "reference request prompt",
        description: "For drafting the actual ask and later brief to a specific reference, once this skill's list has named who to approach.",
      },
      {
        href: "/skills/career-skills/resume-bullet-audit-skill",
        label: "resume bullet audit skill",
        description: "A sibling skill checking that resume claims trace to real, stated achievements rather than invented detail.",
      },
      {
        href: "/skills/career-skills/interview-answer-structure-skill",
        label: "interview answer structure skill",
        description: "For structuring real interview answers around a candidate's own experience, the same discipline applied to a different part of the job search.",
      },
      {
        href: "/skills/career-skills/salary-range-research-log-skill",
        label: "salary range research log skill",
        description: "A sibling skill built on the same family of discipline: structuring only what was actually found or stated, never a plausible sounding invention.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.indeed.com/career-advice/resumes-cover-letters/ask-job-reference",
        label: "Indeed: How To Ask Someone To Be a Job Reference",
        description: "Independent guidance on approaching a former manager or colleague once this skill has helped identify them as worth asking.",
      },
      {
        href: "https://www.themuse.com/advice/the-right-and-wrong-way-to-ask-someone-to-be-a-reference",
        label: "The Muse: The Right and Wrong Way To Ask Someone To Be a Reference",
        description: "A cautionary account of what goes wrong when a reference is listed without being asked or reminded of the real shared work first.",
      },
      {
        href: "https://www.shrm.org/topics-tools/news/talent-acquisition/reference-check-checkup",
        label: "SHRM: Reference Check Checkup",
        description: "An employer side view of how reference checks are actually conducted, useful context for why a specific, real working history matters more than a vague one.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow, the same discipline this skill applies to its refusal rule.",
      },
    ],
  },

  tags: ["career", "references", "job search", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

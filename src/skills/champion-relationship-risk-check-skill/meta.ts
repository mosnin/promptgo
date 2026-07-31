import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Champion Relationship Risk Check

Use this skill when you are given a deal's real, stated stakeholder list, every
person the account has named with a role, including which one is the economic
buyer or final decision maker, together with the rep's real notes on who has
actually been contacted and when. The job is diagnostic: check documented
contact against the stated list, and say exactly where coverage is thin,
never assume a normal deal would have covered everyone by now.

## Before you check anything

You need two real things: the stated stakeholder list with roles, and the
rep's actual contact notes. Do not invent a stakeholder who is not on the
list, and do not invent contact that the notes do not actually describe. A
rep saying a stakeholder "should be fine" or "is probably supportive" is not
contact evidence, it is a guess about someone nobody has actually reached.

If the stakeholder list does not name which person is the economic buyer or
final decision maker, or if either the list or the notes are missing
entirely, say so plainly and name precisely what is missing rather than
proceeding as though the gap were not there.

## Step 1: build the documented contact tally

For every person on the stated stakeholder list, search the notes for a
specific, attributable interaction: something the notes actually show that
person saying, asking, writing, or replying, ideally with a date. For each
stakeholder, record:

1. Name and role, exactly as stated on the list.
2. The number of documented contact instances found.
3. The date of the most recent documented instance, or "no date given" when
   the notes describe contact without one.
4. The exact quote or close paraphrase from the notes behind each instance.

What counts as documented contact: a call where that specific person's
questions or comments are recorded, an email that person sent or replied to,
a line directly attributed to them in the notes. What does not count: being
listed as a meeting attendee or invite recipient with nothing recorded that
they personally said, an email the rep sent to them with no recorded reply,
or a second stakeholder's opinion about how that person feels. Contact
requires participation the notes actually show, not proximity to a meeting.

## Step 2: find the economic buyer's own tally

Locate the stakeholder marked economic buyer, final decision maker, or
budget owner on the stated list. If two people share that mark, or nobody
does, say so plainly instead of picking one. Once found, report that
specific person's tally from Step 1: how many documented contacts exist, and
how long since the most recent one, or "no documented contact" when the
count is zero.

## Step 3: check for single-threading concentration

Count how many stakeholders on the full list have at least one documented
contact instance from Step 1.

- If only one stakeholder out of the whole list has any documented contact,
  flag SINGLE-THREADED, regardless of how many people are on the list.
- If more than one stakeholder has contact, but one person's instance count
  exceeds every other stakeholder's combined, and at least half the list
  shows zero contact, flag SINGLE-THREADED too, and state the exact numbers
  behind the flag.
- Otherwise, state NOT SINGLE-THREADED and name how many stakeholders show
  documented engagement.

## Step 4: check for a decision-maker gap

- If the economic buyer's tally from Step 2 is zero, flag DECISION-MAKER GAP
  regardless of what Step 3 found.
- If the economic buyer has at least one documented contact, state NOT
  FLAGGED and give the recency of the most recent instance.
- If the list never actually identified an economic buyer, state
  DECISION-MAKER GAP: UNKNOWN and name the missing input directly.

## Producing the verdict

State the deal AT RISK on this check when either Step 3 or Step 4 flags a
problem. State it HEALTHY ON THIS CHECK, naming the check as relationship
coverage rather than a whole deal health estimate, only when neither step
flags anything. Always close with the full contact tally table so the
verdict can be checked by rereading the same real notes it came from.

## What this skill does not do

It does not forecast whether the deal will close, does not draft outreach or
recommend which specific message to send next, and does not assess deal
stage, pricing, or contract terms. It never counts implied or assumed
contact, and it never fills a missing role or a missing note with a
plausible sounding guess. Its whole job stops at the tally and the two
flags, so that whatever multithreading plan comes next starts from a real
picture of who has actually been reached.
`;

const WORKED_EXAMPLE_MD = `# Worked example: a five stakeholder deal flagged AT RISK

Use this alongside \`SKILL.md\`. The stakeholder list and notes below are the
kind of real inputs this skill checks; nothing in the tally was invented,
only tallied and flagged from what the notes actually say.

## The stated stakeholder list, as given

| Name | Role |
|---|---|
| Priya Nandan | VP of Operations, economic buyer, final budget sign-off |
| Marcus Feld | Director of Warehouse Systems, day to day point of contact |
| Sarah Kwan | IT Security Lead, technical evaluator |
| Devon Ruiz | Procurement Manager |
| Alicia Tran | Regional Ops Manager, end user representative |

## The rep's real contact notes, as given

- Mar 3: Discovery call with Marcus Feld. "Marcus walked us through current
  WMS pain points, warehouse mis-picks up 12% year over year."
- Mar 10: Demo call. Attendees per calendar invite: Marcus Feld, Alicia Tran.
  Notes only record Marcus's questions about integration timelines; nothing
  is recorded that Alicia said or asked.
- Mar 17: Email thread with Marcus Feld. "Marcus confirmed the security
  questionnaire would go to Sarah this week." No reply from Sarah is
  recorded anywhere in the notes.
- Mar 24: Call with Marcus Feld. "Marcus said Priya is very supportive and
  shouldn't be a blocker." Priya has not appeared on a call or in an email
  thread anywhere else in the notes.
- Apr 2: "Marcus forwarded the pricing sheet internally." No recorded
  feedback from anyone it was forwarded to.

## Step 1: the documented contact tally

| Name | Role | Documented contacts | Most recent | Evidence |
|---|---|---|---|---|
| Priya Nandan | Economic buyer | 0 | none | No note anywhere records Priya saying, writing, or asking anything directly. |
| Marcus Feld | Day to day contact | 5 | Apr 2 | Quoted or paraphrased directly in every note from Mar 3 through Apr 2. |
| Sarah Kwan | Technical evaluator | 0 | none | Notes record an email sent to her, not a reply from her. |
| Devon Ruiz | Procurement | 0 | none | Never mentioned in any note. |
| Alicia Tran | End user | 0 | none | Listed as a meeting attendee once; nothing recorded that she said or asked. |

## Step 2: the economic buyer's tally specifically

Priya Nandan is stated as the economic buyer on the list. Her tally from
Step 1 is zero documented contacts. Marcus's secondhand comment that "Priya
is very supportive" is not evidence Priya herself has said anything; it is
Marcus's opinion about Priya, and the skill does not count it as her
contact.

## Step 3: single-threading concentration

One stakeholder, Marcus Feld, accounts for all five documented contact
instances in the notes. The other four stakeholders, Priya, Sarah, Devon,
and Alicia, show zero documented contact each. Flag: SINGLE-THREADED. Only
one of five stated stakeholders has any documented engagement at all.

## Step 4: decision-maker gap

Priya Nandan's tally is zero. Flag: DECISION-MAKER GAP. The economic buyer
who holds final budget sign-off has no documented contact anywhere in the
notes supplied.

## Overall verdict

AT RISK. Both Step 3 and Step 4 are flagged from the same underlying gap:
every documented interaction in this deal runs through Marcus Feld, and the
person who actually signs off on the budget has never appeared in a call,
an email reply, or a quoted line anywhere in the notes. The fix is not
written here, since choosing who to contact next and how is a planning
decision for the rep, but the gap itself is exact: reach Priya Nandan
directly, and confirm real, documented contact with Sarah Kwan, Devon Ruiz,
and Alicia Tran beyond a calendar invite.
`;

const meta: SkillMeta = {
  slug: "champion-relationship-risk-check-skill",
  name: "Champion Relationship Risk Check",
  title: "Champion Relationship Risk Check Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that tallies documented contact against a deal's real stakeholder list, flags single threading and an unengaged economic buyer, and never assumes contact the rep's actual notes do not describe.",

  seo: {
    primaryKeyword: "champion relationship risk check skill",
    keywords: [
      "champion relationship risk check skill",
      "free ai skill for single threading risk",
      "downloadable stakeholder engagement checklist",
      "ai skill to check deal stakeholder coverage",
      "how to spot single threaded sales deals",
    ],
    seoTitle: "Champion Relationship Risk Check Skill: Free AI Download",
    seoDescription:
      "A free, downloadable champion relationship risk check skill that tallies real stakeholder contact, flags single threading, and checks the economic buyer.",
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
      "Asked to assess relationship risk on a deal, models reliably treat a champion's secondhand assurance about another stakeholder, a line like the economic buyer is supportive, as if it were contact with that stakeholder directly, and treat a calendar invite as evidence of engagement even when nothing was recorded that person saying. This skill's contact tally requires a specific, attributable line in the real notes for every counted instance, and keeps the economic buyer's own tally separate from the rest of the list so a single engaged champion can never stand in for that check.",
  },

  article: {
    intro: [
      "A champion relationship risk check skill only earns its name if it can tell a genuinely covered deal apart from one where a single enthusiastic contact is standing in for everyone else on the list. Handed a stakeholder list and call notes, most AI assistants will summarize the deal as healthy the moment one person sounds engaged, without checking whether the economic buyer has said a word. This skill refuses that shortcut.",
      "It ships as two plain text files: a main instructions file and a worked example reference file showing a five stakeholder deal audited end to end. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "Its job stops at the tally and the two flags. It does not forecast whether the deal closes or draft the next outreach message; it names, stakeholder by stakeholder, who the notes show has been reached, and whether the person who signs the budget is one of them.",
    ],
    sections: [
      {
        heading: "Why a stakeholder list is not proof anyone has been contacted",
        body: [
          "A deal's stated stakeholder list names who matters. It says nothing about who has actually been reached. Five names can describe a deal where everyone has taken a call, or one where a single person answered every question while the other four never said a word in any note the rep kept. Only the contact notes, read carefully, tell those two situations apart.",
          "This skill's first instruction is to work only from what the real notes show, not what a normal, healthy deal would probably look like by this stage. A rep's comment that a stakeholder should be fine or is probably supportive is a guess about someone, not contact with them, and Step 1 does not count it as one.",
        ],
      },
      {
        heading: "The documented contact tally: what counts and what does not",
        body: [
          "Every stakeholder gets the same treatment: a search through the notes for a specific, attributable line, something that person is recorded saying, asking, or replying, with a date where given. A transcript quoting their question counts. An email they replied to counts. Being listed as an attendee with nothing recorded that they said does not.",
          "That distinction is the discipline behind a downloadable stakeholder engagement checklist worth trusting over a vague summary. A calendar invite proves someone was scheduled to be in the room, not that they spoke once they got there.",
        ],
      },
      {
        heading: "Why the economic buyer's tally gets checked on its own",
        body: [
          "Step 2 pulls the economic buyer's row out of the tally and reports it alone, separate from the rest of the list. A deal can show four engaged stakeholders and still be at serious risk if the fifth, the person who signs off on budget, has zero documented contact anywhere in the notes.",
          "This is also where a secondhand assurance does the most damage if allowed to count. A champion's line that the buyer is supportive describes the champion's belief, not a documented interaction with the buyer, and this skill keeps that distinction explicit rather than letting warmth from one contact stand in for evidence about another.",
        ],
      },
      {
        heading: "How to spot single threaded sales deals from the tally itself",
        body: [
          "Single-threading is not a feeling about a deal, it is a countable pattern: one stakeholder's contact instances outweighing everyone else's combined, or a list where only one name shows any documented engagement at all. Step 3 applies both tests directly to the Step 1 tally, so the SINGLE-THREADED flag always comes with the exact numbers behind it, not a general sense that the rep talks to one person a lot.",
          "That is what makes this a free ai skill for single threading risk worth running before a deal review, not after one has already stalled. As an ai skill to check deal stakeholder coverage, its output stays narrow: a count per stakeholder and the evidence line behind each entry, so anyone rereading the notes can confirm the flag themselves.",
        ],
      },
      {
        heading: "How this differs from the renewal risk flagging skill",
        body: [
          "The renewal risk flagging skill on this site checks a different, later signal set: usage decline, support escalation, budget cycle timing, and contract terms nearing an unfavorable auto renewal, mostly on accounts already closed and approaching renewal. Stakeholder or champion change is one of its five categories, but it checks whether a known champion left or went quiet, not documented contact across a stakeholder list.",
          "This champion relationship risk check skill runs earlier and narrower. It never touches usage numbers, support tickets, or contract clauses. Its only inputs are the stated stakeholder list and the rep's contact notes, and its outputs are the tally, the single-threading flag, and the economic buyer's own gap, so the two skills run side by side without repeating each other's job.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not decide who to contact next or draft the message that reaches them; that planning call belongs to the rep, using the gap this skill names. It will not fold the tally into a single deal health score, forecast a close date, or judge pricing, proposal quality, or deal stage. Its whole job stops at naming, with cited evidence, who has actually been reached and who has not.",
        ],
      },
    ],
    howTo: {
      name: "How to use the champion relationship risk check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md on this page before downloading, so you know exactly what counts as documented contact before you run the check.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real stakeholder list and contact notes",
          text: "Collect the deal's actual stated stakeholder list with roles, including who the economic buyer is, and the rep's real notes on who has been contacted and when.",
        },
        {
          name: "Hand both files and the real inputs to your assistant",
          text: "Keep the folder structure intact so the instructions can point to the worked example, then supply the real stakeholder list and notes and ask for the tally and both flags.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as documented contact for a stakeholder?",
        answer:
          "A specific, attributable line in the real notes: something that stakeholder is recorded saying, asking, or replying to, ideally with a date. Being listed as a meeting attendee with nothing recorded that they personally said does not count, since the skill only tallies participation the notes actually show.",
      },
      {
        question: "Does attending a group demo count as contact with that stakeholder?",
        answer:
          "Only if the notes record something that person said or asked during it. The worked example shows a stakeholder listed as a demo attendee whose tally still comes back zero, because nothing in the notes was ever attributed to her directly, only to the person doing most of the talking.",
      },
      {
        question: "What happens if the stakeholder list does not name an economic buyer?",
        answer:
          "The skill says so plainly and states DECISION-MAKER GAP: UNKNOWN rather than guessing which role normally holds final budget authority. It names the missing input directly, the identity of the economic buyer, instead of assuming a title like director or VP automatically fills that role.",
      },
      {
        question: "How is this different from the renewal risk flagging skill?",
        answer:
          "The renewal risk flagging skill checks five later signals, usage decline, support escalation, budget cycle timing, and contract terms, mostly on accounts approaching renewal. This skill runs earlier, checking only whether documented contact exists across the stated stakeholder list, and specifically with the economic buyer, with no usage or contract data involved.",
      },
      {
        question: "Can this skill tell me who to contact next?",
        answer:
          "No, its instructions stop short of that. It names the exact gap, which stakeholders show zero documented contact and whether the economic buyer is among them, but deciding the next outreach message, timing, or channel is a planning call left to the rep using that gap.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the deal or stakeholder data run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/sales-prompts/account-research-prompt",
        label: "account research prompt",
        description: "For identifying the full stakeholder list and economic buyer before this skill checks how much of it has actually been contacted.",
      },
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description: "A natural source of the real, dated contact notes this skill's tally is built from.",
      },
      {
        href: "/skills/sales-skills/renewal-risk-flagging-skill",
        label: "renewal risk flagging skill",
        description: "A related but later diagnostic that checks usage, support, and contract signals on accounts nearing renewal, not stakeholder contact breadth.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description: "The natural next step once a stakeholder shows zero documented contact, for planning the call that actually reaches them.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.highspot.com/blog/multithreading-in-sales/",
        label: "Highspot: Multithreading in Sales",
        description: "An independent explainer of single-threaded deal risk and why relying on one engaged contact leaves a deal exposed when priorities shift.",
      },
      {
        href: "https://blog.hubspot.com/sales/meddpicc-methodology",
        label: "HubSpot: The MEDDPICC Sales Qualification Methodology",
        description: "A primary source defining the economic buyer as the specific person with final authority to spend the budget, the role this skill's decision-maker check isolates.",
      },
      {
        href: "https://www.mixmax.com/blog/sales-multithreading",
        label: "Mixmax: Multithreading Sales, A Guide to Winning Big Deals",
        description: "Independent data on how many reps stay single-threaded by default and the win rate gap between single-threaded and multithreaded deals.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to citing contact evidence.",
      },
    ],
  },

  tags: ["sales", "stakeholders", "champion", "deal risk", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

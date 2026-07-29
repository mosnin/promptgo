import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "stakeholder-update-prompt",
  name: "Audience Renderer",
  title: "Stakeholder Update Prompt",
  category: "business-prompts",
  taskType: "rewrite",
  summary:
    "Takes one set of facts and renders it separately for each person who can act, leading with the fact they will least enjoy and closing with a single ask.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["communication", "governance", "projects", "leadership"],

  seo: {
    primaryKeyword: "stakeholder update prompt",
    keywords: [
      "stakeholder update prompt",
      "how to update stakeholders on a project",
      "writing for stakeholders who control budget",
      "delivering bad news to a steering group",
      "ai prompt for an executive project summary",
      "asking stakeholders for a specific decision",
    ],
    seoTitle: "Stakeholder Update Prompt: Bad News Goes First",
    seoDescription:
      "A stakeholder update prompt that rewrites one set of facts for each reader, puts the worst news in the opening line, and ends every version with one clear ask.",
  },

  prompt: {
    text: `You render a single set of project facts into separate updates, one per stakeholder. You do not write a broadcast. You believe a person only reads carefully when the first line is about something they control.

THE FACTS, INCLUDING THE UNFLATTERING ONES: {{FACTS}}
MY STAKEHOLDERS, AND WHAT EACH ONE CONTROLS OR IS ACCOUNTABLE FOR: {{AUDIENCE}}
WHAT EACH OF THEM WILL BE ASKED IN THEIR OWN MEETINGS: {{THEIR_PRESSURE}}
DECISIONS OR INPUTS I NEED, AND FROM WHOM: {{ASKS}}
WHAT THEY ALREADY BELIEVE ABOUT THIS PROJECT: {{PRIORS}}

Work in three stages.

STAGE ONE, THE SHARED LEDGER. Reduce my facts to a numbered list of statements, each either observed or forecast, labelled as such. No adjectives. This list is the only thing every version may draw from, so anything absent here cannot appear later. Mark any statement that contradicts what a stakeholder currently believes, using my priors field.

STAGE TWO, THE RENDERINGS. For each stakeholder, write an update of no more than 150 words containing, in this order: the single ledger statement that most affects the thing they control, stated first and without preamble; the two or three other statements relevant to them; anything from the ledger they would otherwise hear from somebody else before hearing it from me; and one ask.

Rules for the renderings. Never open with a project summary or a recap of the plan. Never move a negative statement below a positive one. Never include a ledger statement that does not touch what this person controls, is accountable for, or will be asked about. The ask must be one thing, be answerable, and carry a date.

STAGE THREE, THE CHECKS. Produce a short table mapping each ledger statement to which stakeholders received it, and flag any statement that reached nobody. Then, for each rendering, name the question that reader is most likely to fire back, and write the one sentence answer using only ledger statements. If the honest answer is not in the ledger, say what I need to find out before sending.

If any stakeholder's rendering would consist only of good news, say so explicitly. It usually means I have filtered rather than segmented.`,
    variables: [
      {
        token: "FACTS",
        label: "The facts, including the unflattering ones",
        example:
          "Cutover slipped from 3 Nov to 24 Nov. Compliance sign off not booked. Pilot merchants processed 4,000 live transactions with no failures. Contractor spend is 18k over the approved figure. Two of four mobile screens still unbuilt.",
      },
      {
        token: "AUDIENCE",
        label: "Stakeholders and what each controls",
        example:
          "COO chairs steering and owns the board commitment. CFO controls the contractor budget. Head of Support owns customer comms. Rachel is accountable for compliance sign off.",
      },
      {
        token: "THEIR_PRESSURE",
        label: "What each will be asked in their own meetings",
        example:
          "COO will be asked at the board whether November still holds. CFO reports variances monthly. Support plans staffing three weeks ahead.",
      },
      {
        token: "ASKS",
        label: "Decisions or inputs you need and from whom",
        example:
          "Need CFO approval for the 18k by Friday, need Rachel to book compliance for week of 10 Nov, need COO to decide whether we tell the board now or at the next scheduled update",
      },
      {
        token: "PRIORS",
        label: "What they already believe about this project",
        example: "Everyone still thinks 3 November is the date. CFO believes contractor spend is on budget.",
      },
    ],
    expectedOutput:
      "A numbered ledger separating observed from forecast statements, one short update per stakeholder opening with the fact that touches what they control and closing with a single dated ask, a coverage table showing which statements reached whom, and a predicted pushback question with an answer drawn only from the ledger.",
    followUps: [
      "The COO rendering is the one that decides whether the board hears this now. Give me two versions, one assuming we tell them this week and one assuming we wait.",
      "Rewrite the CFO version as four lines in a message rather than an email, keeping the 18k and the date.",
      "One ledger statement reached nobody. Tell me who should have had it and why the segmentation missed them.",
    ],
    pitfalls: [
      "Supplying tidied facts produces tidied updates. The ledger can only be as honest as the input, and the statement you leave out is invariably the one somebody else mentions first.",
      "Writing three renderings feels like three times the work until the first time a stakeholder replies to the wrong part of a broadcast email and you spend an afternoon correcting the impression.",
      "The ask gets softened into keen to hear your thoughts during editing. An ask without a date and a single subject is a paragraph nobody has to respond to.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Coverage tables sound like bureaucracy until one shows a fact that reached no stakeholder at all, which happens most often with items that do not obviously belong to anyone and later force a rushed decision. Mapping every ledger entry to a named recipient is cheap insurance. Models open each rendering with a polite recap, so the ban on preamble belongs in the rules block.",
  },

  article: {
    intro: [
      "A stakeholder update prompt is not a formatting exercise. Sending the same paragraph to six people who care about six different things means five of them skim it, and the one sentence that mattered to each of them was somewhere in the middle, next to four sentences that did not.",
      "The mechanism here is one ledger and several renderings. Facts get reduced to numbered statements, marked observed or forecast, and nothing may appear in any version that is not in that list. Each stakeholder then gets a short update built only from the statements touching what they control.",
      "The ordering rule is the part people resist. The worst relevant fact goes first, before any context, and no positive statement may be placed above a negative one.",
    ],

    sections: [
      {
        heading: "One ledger, several renderings",
        body: [
          "Separating the facts from the writing solves a problem that editing cannot. When each version is drafted independently, the numbers drift, the dates disagree, and two stakeholders compare notes and discover they were told different things, which costs more trust than the original bad news would have.",
          "The ledger fixes the content and lets the framing vary. Marking each statement as observed or forecast does a second job, because most disputes about a project update are really disputes about whether something has happened or is expected to.",
          "Statements that contradict what a reader currently believes get flagged. Knowing that the finance lead still thinks the contractor spend is on budget changes how that sentence has to be written, and it stops the correction arriving as an aside in paragraph four.",
        ],
      },
      {
        heading: "Sort readers by what they control",
        body: [
          "Seniority is the wrong axis, and the stakeholder update prompt ignores it. The useful segmentation is control and accountability: who signs, who reports the number upwards, who has to staff something differently, who will be asked about this in a meeting you are not in.",
          "Writing for stakeholders who control budget looks nothing like writing for the person who owns customer communications, even from identical facts. One needs the variance and the approval request; the other needs the date change and how much notice their team gets.",
          "That third field, what each of them will be asked in their own meetings, is the one people leave blank and the one that produces the sharpest updates. You are not writing to inform someone. You are equipping them for a conversation you will not be present at.",
        ],
      },
      {
        heading: "Delivering bad news to a steering group",
        body: [
          "The instinct is to build up to it. Context first, progress second, difficulty third, so the reader understands the situation before hearing the problem. It reads as fair and functions as concealment, because senior readers stop after two paragraphs and the two paragraphs they read were reassuring.",
          "Delivering bad news to a steering group works better in the opposite order. The slipped date opens the update, the reason follows in one clause, and the context sits underneath for whoever wants it. Nobody has ever been annoyed by finding out too plainly.",
          "The rule that no positive statement may sit above a negative one exists because the softening happens during editing rather than during drafting. Everyone writes an honest draft and then moves the good sentence up.",
        ],
      },
      {
        heading: "The secondhand test",
        body: [
          "Each rendering has to include anything the reader would otherwise learn from someone else first. This is the cheapest reputational protection available and it is almost never applied systematically.",
          "The damage from a stakeholder hearing about a slip from a peer is not the slip. It is the conclusion they draw about what else they have not been told, and that conclusion applies retroactively to every update you have sent.",
          "The coverage table at the end catches the opposite failure. A ledger statement that reached nobody is usually a fact with no obvious owner, and those are the ones that resurface later as a decision made under time pressure.",
        ],
      },
      {
        heading: "Every version ends with one ask",
        body: [
          "One ask, answerable, with a date. Not a list of three, not an invitation to share thoughts. Asking stakeholders for a specific decision is the difference between an update that generates movement and an update that generates a thumbs up reaction.",
          "Multiple asks in one message reliably produce a response to the easiest one. If a reader genuinely owes you three things, that is three messages, or one message and an explicit statement of which is blocking.",
          "The predicted pushback step then rehearses the reply. Naming the question each reader is most likely to fire back, and answering it from the ledger only, exposes the places where you do not yet have an answer, which is better discovered before sending.",
        ],
      },
      {
        heading: "Where the stakeholder update prompt cuts your detail",
        body: [
          "An ai prompt for an executive project summary that keeps everything has produced a report. The 150 word cap per rendering forces the removal of anything the reader does not control, is not accountable for and will not be asked about, which is usually two thirds of what a project lead wants to include.",
          "The instinct to include the hard work is strong and it is worth resisting. Learning how to update stakeholders on a project mostly means accepting that effort you are proud of is context for you and noise for them.",
          "One warning sign is built in. If any rendering comes back containing only good news, the prompt says so, because a stakeholder whose update never contains anything difficult is a stakeholder being managed rather than informed.",
        ],
      },
    ],

    howTo: {
      name: "How to use the stakeholder update prompt",
      steps: [
        {
          name: "Write the facts before you think about audiences",
          text: "Include the overspend, the unbooked review and the thing you hope nobody asks about. The segmentation happens later and cannot recover a fact you withheld.",
        },
        {
          name: "Fill in what each person will be asked elsewhere",
          text: "This is the field that turns a summary into something useful. If you do not know, that is worth finding out before writing anything.",
        },
        {
          name: "Check the opening line of every rendering",
          text: "If it starts with a recap or a positive, move the hard statement up yourself. This is the edit the model most often reverses.",
        },
        {
          name: "Read the coverage table before sending",
          text: "A statement that reached nobody either needs an owner or needs to be in the version going to whoever chairs your governance forum.",
        },
        {
          name: "Send the hardest one first",
          text: "Deal with the person whose reaction you are dreading before the others reply, so you are not answering three threads with inconsistent detail.",
        },
      ],
    },

    faq: [
      {
        question: "Is this not just spinning the same news several ways?",
        answer:
          "Spin changes the facts to suit the audience. The stakeholder update prompt changes which facts appear and in what order, while the ledger keeps every version consistent. If two recipients compared their updates side by side, nothing in one would contradict anything in the other, which is the test worth applying.",
      },
      {
        question: "How many stakeholders is too many for this?",
        answer:
          "Above five or six renderings the cost outweighs the benefit and you are better grouping people by what they control rather than by name. Two or three groups plus one individual rendering for whoever chairs governance covers most projects without becoming a second job.",
      },
      {
        question: "What if the news is genuinely all good this period?",
        answer:
          "Then say so briefly and use the space for the forecast statements instead, which is where the uncertainty lives. A period with nothing difficult in it is unusual enough that stating it plainly is more credible than filling the update with detail nobody needs.",
      },
      {
        question: "Should the same update go in writing and verbally?",
        answer:
          "The hardest rendering should be spoken first and confirmed in writing afterwards, using the same ledger statements. Letting someone read about a decision that affects their budget without any warning is the fastest way to make the next one harder to deliver.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description:
          "The internal delivery version that produces the variance figures which become the observed statements in the ledger here.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When one of the asks turns out to need a proper choice rather than an approval, it graduates into its own document.",
      },
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description:
          "Forecast statements in the ledger are usually register entries, and the escalation threshold decides who hears about them.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "The same audience discipline turned outward, where what the other person controls determines which questions are worth asking.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2013/06/how-to-present-to-senior-executives",
        label: "Harvard Business Review: how to present to senior executives",
        description:
          "Institutional source on why senior readers expect the conclusion first and treat build up as evasion.",
      },
      {
        href: "https://www.gov.uk/service-manual/agile-delivery/governance-principles-for-agile-service-delivery",
        label: "GOV.UK Service Manual: governance principles",
        description:
          "Sets out what a governance forum is entitled to be told and when, which is what the escalation and coverage checks apply.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: prompting strategies for Gemini",
        description:
          "Documents the fixed source constraint that stops each rendering introducing detail absent from the shared ledger.",
      },
    ],
  },
};

export default meta;

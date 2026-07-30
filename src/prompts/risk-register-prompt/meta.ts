import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "risk-register-prompt",
  name: "Register Gatekeeper",
  title: "Risk Register Prompt",
  category: "business-prompts",
  taskType: "analyse",
  summary:
    "Refuses any entry that lacks a named person, an observable trigger and a response agreed in advance, and moves the things that already happened onto an issue list.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["risk", "delivery", "governance", "operations"],

  seo: {
    primaryKeyword: "risk register prompt",
    keywords: [
      "risk register prompt",
      "how to build a project risk register",
      "what is the difference between a risk and an issue",
      "ai prompt for risk management on a project",
      "how to set an escalation threshold for a project risk",
    ],
    seoTitle: "Risk Register Prompt: Every Risk Needs An Owner",
    seoDescription:
      "A risk register prompt that rejects any entry without a named owner, an observable trigger and a pre agreed response, and separates real risks from open issues.",
  },

  prompt: {
    text: `You are the gatekeeper of a project risk register. Entries do not go in because someone is worried. They go in because they pass four gates, and your default answer is rejection with a reason.

WHAT WE ARE DELIVERING AND BY WHEN: {{SCOPE}}
THINGS PEOPLE HAVE RAISED AS RISKS: {{RAISED}}
WHO IS ON THIS PROJECT AND WHAT THEY DECIDE: {{PEOPLE}}
WHAT HAS ALREADY GONE WRONG SO FAR: {{HISTORY}}
GOVERNANCE: WHO WE ESCALATE TO AND HOW OFTEN WE MEET: {{GOVERNANCE}}

Gate one, is it a risk at all? If the thing has already happened it is an issue, not a risk. Move it to a separate ISSUES list with an owner and a resolution date. If it is a permanent property of the project rather than an uncertain event, call it a constraint and move it to a CONSTRAINTS list.

Gate two, is it specific? Resourcing, scope creep and stakeholder alignment are categories, not risks. Rewrite each into the form: a named event happens, which causes a named consequence to a named part of the delivery. If the raised item cannot be rewritten that way from what I gave you, reject it and say what information would make it writable.

Gate three, who owns it and what would we see? Assign one named individual from my list, never a team and never me by default. Then write the trigger condition, which is the observable event meaning the risk has now occurred, and the early indicator, which is something visible before the trigger and could be checked weekly. An entry with no early indicator is marked BLIND and listed first, because a risk you cannot see coming is the expensive kind.

Gate four, is the response real? Monitor, keep an eye on it and manage closely are not responses. Each entry needs a pre agreed action, who executes it, and roughly what it costs in money or days. State whether the action reduces likelihood or reduces impact, because most teams only ever write the second.

Then, three extra passes.
A. Score each surviving entry on likelihood and impact, and set the escalation threshold: the score or the trigger at which this leaves the project meeting and goes to the governance forum I described, with the name of the person it goes to.
B. Add the risks nobody raised. Look at my history and my delivery scope and propose up to four entries that follow the same pattern as things that already went wrong. Mark these as UNRAISED.
C. Name the one risk that would be embarrassing to write down because of who would read it, and write it anyway in neutral language.`,
    variables: [
      {
        token: "SCOPE",
        label: "What you are delivering and by when",
        example: "Replacing the payments provider across web and mobile, cutover planned for 3 November",
      },
      {
        token: "RAISED",
        label: "Things people have raised as risks",
        example:
          "Resourcing, the mobile team is behind, we might not get PCI sign off in time, scope creep from the marketing team, our provider contract renews in December",
      },
      {
        token: "PEOPLE",
        label: "Who is on the project and what they decide",
        example:
          "Priya leads mobile, Tom owns the payments integration, Rachel is the compliance lead, the CTO signs the cutover go or no go",
      },
      {
        token: "HISTORY",
        label: "What has already gone wrong so far",
        example:
          "Sandbox credentials took five weeks to arrive, two integration tests were written against the wrong API version, compliance review of the last release slipped by three weeks",
      },
      {
        token: "GOVERNANCE",
        label: "Who you escalate to and how often you meet",
        example: "Weekly project meeting, monthly steering group chaired by the COO, CTO available same day for cutover decisions",
      },
    ],
    expectedOutput:
      "A register where every entry names an individual, an observable trigger, an early indicator and a costed response, plus separate issue and constraint lists holding the rejected items, entries marked BLIND listed first, escalation thresholds tied to a named person, and several unraised risks derived from what has already gone wrong.",
    followUps: [
      "Three entries came back BLIND. For each, design the weekly check that would turn it into something we can see coming.",
      "Convert the register into the five line summary that goes to the monthly steering group, keeping only entries above the escalation threshold.",
      "The compliance risk is owned by someone who does not report to me. Draft how I confirm they accept the ownership without it sounding like blame allocation.",
    ],
    pitfalls: [
      "Teams reinstate the rejected category entries because resourcing feels like a real risk. It is a heading. The specific version, which engineer leaves in October and which deliverable stops, is the one somebody can act on.",
      "Ownership drifts to whoever is running the project, which makes the register a personal worry list. If an entry has no owner other than you, that is the escalation.",
      "The unraised entries are usually the most accurate ones in the output, because they come from your own history, and they are the first ones deleted for being speculative.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Most registers are half full of issues that have already landed, which is why the review meeting overruns, and the four gates exist to clear those out. The early indicator gate is the uncomfortable one, since entries pass the other three and still carry no signal that would arrive before the event itself. Both models accept monitor as a mitigation unless the instruction forbids it outright.",
  },

  article: {
    intro: [
      "A risk register prompt is worth having only if it is willing to throw entries out. Most registers grow by accretion, because adding a line costs nothing and removing one requires someone to say a worry is not real, so they end the project as a long document nobody has read since month two.",
      "The risk register prompt below is built as four gates. An entry gets in when it is an uncertain future event, stated specifically, owned by a named person with an observable trigger, and paired with a response that costs something. Everything else is redirected to an issues list, a constraints list, or back to whoever raised it.",
    ],

    sections: [
      {
        heading: "Four gates, and rejection is the default",
        body: [
          "Gatekeeping is the mechanism. A model asked to produce a register will produce twenty plausible lines in eight seconds, and volume is exactly what makes registers useless. Asking it to reject is a different task and it produces a different document.",
          "The gates run in order because each is cheaper than the next. Deciding whether something is even a risk takes a sentence. Assigning ownership and writing a trigger takes real thought, and there is no point spending it on an item that should have been an issue all along.",
          "Knowing how to build a project risk register is mostly knowing what not to put in it. A register of eight entries that people can recite beats a register of forty that lives in a spreadsheet tab nobody opens.",
        ],
      },
      {
        heading: "What is the difference between a risk and an issue",
        body: [
          "A risk is an uncertain future event. An issue has already happened and now needs resolving. The difference between a risk and an issue sounds pedantic until you notice that mixing them is why the weekly meeting spends forty minutes discussing things that are no longer uncertain.",
          "The two need different treatment. Issues need an owner and a resolution date. Risks need an owner, a trigger and a response held in reserve. Managing an issue as a risk means monitoring something that has already cost you money.",
          "Constraints are the third pile. A fixed regulatory date or a team that will never be larger than four people is not uncertain, and treating a permanent property of the project as a risk generates a monthly conversation with no possible conclusion.",
        ],
      },
      {
        heading: "A risk with no trigger is a worry",
        body: [
          "Each surviving entry has to name a risk owner and trigger condition: one individual, never a team, and one observable event meaning the thing has now occurred. Without the trigger, an entry can be discussed indefinitely because nobody can say whether it has happened yet.",
          "The early indicator gate is harder and more valuable. It asks what you could see beforehand and check weekly. Entries with no answer are marked BLIND and listed first, since a risk you can only detect on the day it lands is one you can prepare for but never avoid.",
          "In practice most inherited registers are largely blind. That is worth knowing, because it tells you the register is a record of anxieties rather than an instrument.",
        ],
      },
      {
        heading: "Monitor is not a mitigation",
        body: [
          "Keep an eye on it appears in the response column of nearly every inherited register. It commits nobody to anything, survives every review, and is indistinguishable from having no plan.",
          "The fourth gate requires an action, an executor and a rough cost in money or days, plus a statement of whether it reduces likelihood or reduces impact. That last distinction catches a common gap: teams write contingency plans for after the event and almost never write the cheaper action that stops it happening.",
          "Any ai prompt for risk management on a project that accepts monitor as a response has produced a document for the auditor rather than for the team.",
        ],
      },
      {
        heading: "Escalation, and the entry the risk register prompt makes you write",
        body: [
          "Each entry shows how to set an escalation threshold for a project risk: the score or the trigger at which it stops being a project meeting item and goes to a named person in the governance forum. Without that line, escalation happens when someone panics, which is reliably too late and occasionally too early.",
          "The final pass asks for the risk that would be embarrassing to write down because of who reads the register. There is almost always one, it is usually about a person, a sponsor's commitment or a decision nobody wants to reopen, and it is usually the risk that materialises.",
          "Written in neutral language it becomes discussable. Left out, it stays in the corridor conversation, where it cannot be assigned an owner.",
        ],
      },
    ],

    howTo: {
      name: "How to use the risk register prompt",
      steps: [
        {
          name: "Dump the raw worry list in unedited",
          text: "Include the vague ones. Watching resourcing get rejected and rewritten into a specific event is the part that teaches the team what an entry looks like.",
        },
        {
          name: "Give it your project history",
          text: "The unraised entries are generated from what has already gone wrong here. Without that field you get generic risks that could belong to any project.",
        },
        {
          name: "Get each named owner to accept in writing",
          text: "Ownership assigned in a document nobody agreed to is ownership by you. One message per owner, confirming the trigger and the response, is enough.",
        },
        {
          name: "Review the BLIND entries first each week",
          text: "They are the ones where the weekly meeting can add something, by designing an indicator rather than restating the worry.",
        },
      ],
    },

    faq: [
      {
        question: "How many entries should a register have?",
        answer:
          "Few enough that the project lead can recall them without looking. Somewhere between five and twelve for most delivery projects. Beyond that the register stops being an instrument and becomes an archive, and the entries that matter get the same attention as the ones that do not.",
      },
      {
        question: "Can a team own a risk instead of a person?",
        answer:
          "No, and this is the rule that gets argued about most. A team owning a risk means the first person to notice it decides whether to act, which is the same arrangement as before the register existed. The risk register prompt insists on one individual, the person who will be asked at the next review.",
      },
      {
        question: "What if the right owner does not work for me?",
        answer:
          "Assign them anyway and confirm it with them directly. If they decline, that refusal is itself a risk with an obvious owner, which is you, and it belongs in the register with an escalation threshold attached to it.",
      },
      {
        question: "How often should the register be reviewed?",
        answer:
          "Weekly for the early indicators, monthly for scores and thresholds. Reviewing scores every week produces small pointless adjustments, while reviewing indicators monthly means you find out about a slow moving problem four weeks after it became visible.",
      },
      {
        question: "Should closed risks be deleted?",
        answer:
          "Close them with a date and a one line reason and keep them visible for the rest of the project. Deleted entries come back as new discoveries, and the record of what stopped being a concern is useful evidence when someone asks why a decision was made.",
      },
      {
        question: "Are probability percentages worth assigning?",
        answer:
          "Only as a rough band such as low, medium or high. A stated 35 percent implies a model nobody built, and it invites arguments about the number rather than about the trigger and the response, which are the two fields that change behaviour.",
      },
      {
        question: "What do I do with the embarrassing entry?",
        answer:
          "Write it neutrally, own it yourself if nobody else can, and raise it once at the governance forum rather than burying it in the document. Its value is that it exists in writing on a date, which changes the conversation if it later materialises.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/post-mortem-prompt",
        label: "post mortem prompt",
        description:
          "What the register should have caught, analysed after the fact, and the best source of your next unraised entries.",
      },
      {
        href: "/business-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description:
          "Where a risk that has crossed its trigger stops being a register line and becomes a variance with a new date.",
      },
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description:
          "The assumptions ranked as dangerous in a funding case convert directly into the first entries of the register.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "An early indicator only gets checked if it lands in somebody's actual week rather than in a spreadsheet column.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.iso.org/iso-31000-risk-management.html",
        label: "ISO 31000: risk management principles",
        description:
          "The international standard that distinguishes uncertain events from realised issues, which the first gate applies directly.",
      },
      {
        href: "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        label: "NIST SP 800-30: guide for conducting risk assessments",
        description:
          "Primary reference for expressing a risk as an event with a stated consequence rather than as a category heading.",
      },
      {
        href: "https://www.pmi.org/learning/library",
        label: "Project Management Institute: research library",
        description:
          "Source material on risk ownership and escalation practice, including why individual ownership outperforms team ownership.",
      },
    ],
  },
};

export default meta;

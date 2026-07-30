import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "project-status-update-prompt",
  name: "Status Variance Reporter",
  title: "Project Status Update Prompt",
  category: "business-prompts",
  taskType: "generate",
  summary:
    "Reports the gap between the date you committed and the date you now believe, refuses green without proof, and names who has not been told yet.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["projects", "reporting", "delivery", "operations"],

  seo: {
    primaryKeyword: "project status update prompt",
    keywords: [
      "project status update prompt",
      "how to write a project status report",
      "ai prompt for a weekly project update",
      "status update that names what is blocked",
    ],
    seoTitle: "Project Status Update Prompt: Name What Slipped",
    seoDescription:
      "A project status update prompt that reports date variance instead of activity, refuses to call a workstream green without proof, and routes bad news early.",
  },

  prompt: {
    text: `You are a delivery lead writing this week's project update. You report variance, not effort. A reader should be able to tell in fifteen seconds whether the end date moved and who now has to do something about it.

WHAT I REPORTED LAST TIME: {{LAST_UPDATE}}
WHAT ACTUALLY HAPPENED SINCE: {{EVENTS}}
COMMITTED MILESTONES AND THEIR DATES: {{MILESTONES}}
THINGS WAITING ON SOMEONE OUTSIDE MY TEAM: {{DEPENDENCIES}}
WHO READS THIS AND WHAT THEY CONTROL: {{READERS}}

Produce four blocks.

BLOCK A, MILESTONE VARIANCE. One line per committed milestone: name, date I previously gave, date I now believe, variance in days, and a one clause reason. Sort by largest slip first. If a date moved and I did not give you a new one, write DATE UNKNOWN plus the exact question that must be answered to set it and the person who can answer it.

BLOCK B, STATUS WITH PROOF. Rate each workstream green, amber or red. Green requires a named observable proof from my events: something merged, signed, passed or confirmed by the person who controls it. Force amber where a dependency outside my team has no owner and date, or where remaining work has never been estimated by the people who will do it. State which rule forced each amber.

BLOCK C, BLOCKERS. Per blocker: what is stopping the work, the named person or team who can remove it, the date their answer is needed by, and how many consecutive updates it has appeared in. Flag anything at three or more as ESCALATE NOW.

BLOCK D, WHO NEEDS TO KNOW. Map each material change to the specific reader it affects, what you need from them, and the date you need it by. A change with no named recipient is either immaterial or you have not thought about who it hurts.

Banned words: ongoing, almost done, progressing well, on track when the only evidence is that nobody complained. Never state a percentage complete. Where a template demands one, give the count of remaining items instead.`,
    variables: [
      {
        token: "LAST_UPDATE",
        label: "What you reported last time",
        example:
          "All four workstreams green. Data migration due 12 Aug, pilot launch 2 Sept, security review booked for late August.",
      },
      {
        token: "EVENTS",
        label: "What actually happened since",
        example:
          "Migration script fails on 6 percent of rows, cause unknown. Security team says late August is not possible, no new date offered. Pilot customer signed. Two engineers were pulled onto the billing incident for nine days.",
      },
      {
        token: "MILESTONES",
        label: "Committed milestones and their dates",
        example: "Data migration 12 Aug, security sign off 29 Aug, pilot launch 2 Sept, general availability 14 Oct",
      },
      {
        token: "DEPENDENCIES",
        label: "Things waiting on someone outside your team",
        example: "Security review sits with the platform team, legal need to approve the pilot data agreement, no owner named for either",
      },
      {
        token: "READERS",
        label: "Who reads this and what they control",
        example:
          "COO owns the launch date commitment to the board, platform lead controls the security queue, finance owns the contractor budget",
      },
    ],
    expectedOutput:
      "A variance table sorted by biggest slip with a new date or a stated unknown for each, statuses that cite the rule or the proof behind them, blockers with named people and an age count, and a routing list pairing each change with the reader who has to act on it.",
    followUps: [
      "The COO will ask whether October is still real. Draft the two sentence answer I give in the meeting, based only on the variance above.",
      "Turn Block D into three separate messages, one per recipient, each opening with the thing that affects them rather than a project summary.",
      "Rewrite Block A assuming the security review slips a further three weeks, and show which downstream dates break first.",
    ],
    pitfalls: [
      "Feeding it a tidy summary of the week instead of raw events produces a tidy update. The variance only surfaces if you hand over the awkward detail, including the days lost to something unrelated.",
      "People delete the amber rule explanations before sending because they read as excuses. They are the audit trail, and without them the next update cannot show whether anything actually changed.",
      "DATE UNKNOWN gets quietly replaced with an optimistic guess more often than any other field here. A guessed date is repeated back to you as a commitment within a week.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Given a slipping project, models convert lost engineering days into a sentence praising the team for flexibility, because narrative absorbs bad news and a number cannot. Stating the variance in days before any prose removes the option. GPT-5.2 also treats DATE UNKNOWN as an invitation and turns it into a range at the faintest hint, so the input should stay silent about dates nobody has.",
  },

  article: {
    intro: [
      "A project status update prompt earns its place on the weeks when the news is bad. Anyone can report a project that is going well. The document worth writing is the one that names the milestone that moved, the dependency nobody owns, and the person who has not been told yet.",
      "This one works as a delta engine. It compares what you said last time against what is true now, and every line has to be a change, a confirmation backed by evidence, or an explicit statement that nothing moved. Effort is not a status.",
      "The hardest constraint is the amber rule. No workstream can be reported green unless you can point at something observable, and anything waiting on a team outside the project stays amber until that dependency has a name and a date attached to it.",
    ],

    sections: [
      {
        heading: "Lead with the variance, not the activity",
        body: [
          "The default update lists what the team did. It reads as effort, it is pleasant to write, and it says nothing about whether the project will land. A reader asked to reconstruct the schedule position from a list of completed tickets will not do it, so they assume things are fine.",
          "Variance reporting inverts the order. Each milestone opens with the difference between the date you committed and the date you now believe, in days, and only then explains itself. Learning how to write a project status report is mostly learning to lead with that number, because it is the only part a reader can act on. The activity still appears, underneath, as evidence for the forecast.",
        ],
      },
      {
        heading: "The amber rule and why green needs proof",
        body: [
          "Green is the most abused word in delivery reporting. It usually means nobody has raised anything, which is a fact about communication rather than about the work. The prompt demands a proof point for every green: something merged, signed, passed, or confirmed by the person who controls it.",
          "Two conditions force amber whatever the owner feels. The first is a dependency outside the team with no owner and no date. The second is remaining work that has never been estimated by the people who will do it. Avoiding false green in status reporting is the whole purpose of that rule, and both conditions are common enough that an honest first draft usually comes back with more amber than last week's version.",
          "That jump is uncomfortable and it is the useful output. A project that moves from green to amber with no event having occurred was never green.",
        ],
      },
      {
        heading: "Reporting a slipped milestone honestly",
        body: [
          "A slip has one honest form: the old date, the new date, the reason. Everything else is avoidance, and the most common substitute is a paragraph about the effort being applied to the original date, which reassures and commits to nothing.",
          "Reporting a slipped milestone honestly means naming the new date rather than describing how hard everyone is working on the old one. Where the new date genuinely is not knowable yet, the prompt writes DATE UNKNOWN next to the question that has to be answered first and the person who can answer it, which turns a vague worry into an assignable task.",
          "It then runs a downstream check. Any milestone depending on the one that moved is listed with its own revised date or an explicit note that the knock on effect has not been assessed.",
        ],
      },
      {
        heading: "Blocked means a person and a date",
        body: [
          "Blocked gets written as though it were weather. In practice a blocker is a specific decision or piece of work sitting with a specific person, and omitting that name is exactly what lets it survive four consecutive updates.",
          "A status update that names what is blocked, along with who owns removing it, is the only version anyone can act on. Three fields are required for each: the thing stopping the work, the named person or team who can unstick it, and the date their answer is needed for the current forecast to hold.",
          "The project status update prompt also counts age. A blocker in its third consecutive update is flagged for escalation, because by then the problem is not the blocker but the absence of an escalation.",
        ],
      },
      {
        heading: "Route the bad news to the person it costs",
        body: [
          "An update sent to a distribution list reaches everybody and lands on nobody. The final block routes each material change to the reader it affects: the budget owner when forecast cost moves, the dependent team when their input date changes, the sponsor when a decision now sits with them.",
          "An ai prompt for a weekly project update has to survive the week where nothing good happened, and this block is what makes that survivable. Naming who must hear the bad news turns a broadcast into several small conversations that happen before the steering meeting rather than during it.",
          "Every routed item carries a date. Telling a dependent team about a slip three days before their work was due to start is not notification.",
        ],
      },
      {
        heading: "What the project status update prompt refuses to print",
        body: [
          "Three phrasings are banned outright. Ongoing, used as a status, describes work with no end state anyone agreed to. Almost done, which in my experience has meant anything from one day to six weeks. And on track, where the supporting evidence is that nobody has complained.",
          "Percentages are banned too. They are the easiest number to produce and the hardest to falsify, and a workstream stuck at eighty percent for three weeks is a reporting artefact rather than a measure of progress. Where a template insists on one, the prompt substitutes the count of remaining items, which cannot drift quietly.",
        ],
      },
    ],

    howTo: {
      name: "How to use the project status update prompt",
      steps: [
        {
          name: "Paste last week's update in verbatim",
          text: "The variance is calculated against what you actually said, not against what you meant. Editing it first removes the comparison that makes the output worth reading.",
        },
        {
          name: "Include the events you would rather not mention",
          text: "Days lost to an unrelated incident, the reviewer who stopped replying, the estimate nobody ever gave you. These produce the amber ratings that matter.",
        },
        {
          name: "Check every green against its proof",
          text: "If the cited proof is a plan or an intention rather than an observed event, downgrade it yourself before sending. The model will accept a weak proof if you supply one.",
        },
        {
          name: "Resolve or keep every DATE UNKNOWN",
          text: "Either get the answer from the named person or send it with the marker visible. Substituting a guess creates a commitment you did not intend to make.",
        },
        {
          name: "Send the routed messages before the update lands",
          text: "Nobody should learn that their date moved by reading a group email. Block D exists so those conversations happen first.",
        },
      ],
    },

    faq: [
      {
        question: "Will this make my project look worse than it is?",
        answer:
          "It will make it look more uncertain, which is usually accurate. The compensation is that a report which has previously named a slip early is believed when it later says something is fine, and that credit is worth more than a run of untroubled green weeks.",
      },
      {
        question: "What if my organisation requires a percentage complete?",
        answer:
          "Give the count of remaining items alongside it and let the percentage be derived from that count rather than estimated. Anyone comparing the two across a few weeks will see which one moves honestly, and the remaining count is the figure your team can actually verify.",
      },
      {
        question: "How often should this run?",
        answer:
          "Weekly for anything with a date inside a quarter. The delta mechanism needs a previous version to compare against, so the first run produces less value than the third, and skipping a week breaks the chain that makes blocker ageing meaningful.",
      },
      {
        question: "Should the update include what went well?",
        answer:
          "Yes, as proof points inside the status block rather than as a separate celebration section. A green rating supported by a named achievement communicates the same good news while doing work, and it avoids the pattern where positives are read as padding before the bad part.",
      },
      {
        question: "My sponsor only wants three bullet points. Does this still work?",
        answer:
          "Run the full version for yourself and send the top three lines of the variance block. The value sits in the analysis rather than the length, and those three lines will be the ones that matter because the block is sorted by size of slip.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/stakeholder-update-prompt",
        label: "stakeholder update prompt",
        description:
          "The outward facing version, where the same facts get rendered differently for each person who can act on them.",
      },
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description:
          "Anything you keep reporting as a concern rather than an event belongs in a register with an owner and a trigger.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "The decisions and owners captured there are the raw events this update compares against the previous week.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "Once the variance is visible, the personal version decides which of the slipping items you work on yourself.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.pmi.org/learning/library",
        label: "Project Management Institute: research library",
        description:
          "Primary source on schedule variance reporting and why forecast dates are tracked separately from baseline dates.",
      },
      {
        href: "https://www.gov.uk/service-manual/agile-delivery",
        label: "GOV.UK Service Manual: agile delivery",
        description:
          "Public sector guidance on reporting delivery confidence honestly, including how dependency status is expected to be stated.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: prompt engineering guide",
        description:
          "Documents the structured output and banned phrasing techniques that keep the four blocks intact across runs.",
      },
    ],
  },
};

export default meta;

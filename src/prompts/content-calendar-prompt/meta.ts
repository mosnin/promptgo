import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "content-calendar-prompt",
  name: "Calendar Planner",
  title: "Content Calendar Prompt",
  category: "marketing-prompts",
  taskType: "plan",
  summary:
    "Sequences planned pieces so the ones that support each other publish together, and cuts the calendar to what you can actually produce.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["content", "planning", "editorial", "publishing"],

  seo: {
    primaryKeyword: "content calendar prompt",
    keywords: [
      "content calendar prompt",
      "how to sequence content for topic clusters",
      "ai prompt for an editorial calendar",
      "realistic publishing schedule example for a small team",
      "best blog posting frequency for seo",
      "which article to publish first in a cluster",
    ],
    seoTitle: "Content Calendar Prompt: Sequence, Then Schedule",
    seoDescription:
      "A content calendar prompt that orders pieces by which ones support each other, then cuts the plan down to what your team can actually produce.",
  },

  prompt: {
    text: `You are a managing editor. You have seen many calendars fail for the same two reasons: they were sequenced by the calendar rather than by dependency, and they assumed a production rate the team has never once achieved.

PLANNED PIECES: {{PIECES}}
WHO PRODUCES THEM AND HOW MUCH TIME THEY REALLY HAVE: {{CAPACITY}}
WHAT ALREADY EXISTS ON THE SITE: {{EXISTING}}
ANY FIXED DATES: {{FIXED_DATES}}

Work in this order.

STEP ONE: CAPACITY REALITY CHECK. From the capacity input, state the sustainable output per month as a number. If the planned pieces exceed what that allows over a sensible horizon, say so before scheduling anything, and tell me how many pieces have to be cut or deferred. Do not quietly compress estimates to make the list fit.

STEP TWO: DEPENDENCY MAP. For each piece, identify which other pieces it should link to and which should link to it. Then mark:
   - PILLAR: the piece others point at. Usually broad, usually hardest to write.
   - SUPPORTING: pieces that reference the pillar and each other.
   - ORPHAN: pieces that connect to nothing. For each orphan, either name the piece that would connect it or recommend cutting it.

STEP THREE: SEQUENCE. Order the pieces by dependency, not by date. Rules: a pillar publishes before or alongside its supporting pieces, never after. Two pieces that link to each other should publish within the same two week window. State the reason for each position in the order.

STEP FOUR: THE CALENDAR. Only now assign dates, respecting the sustainable rate from step one and any fixed dates given. For each slot include what has to be true before that piece can start, especially anything requiring someone other than the writer.

Finally, name the single piece most likely to slip and what to do when it does.`,
    variables: [
      {
        token: "PIECES",
        label: "What you plan to publish",
        example:
          "Guide to restaurant food costing, three posts on portion control, a supplier negotiation piece, two customer stories",
      },
      {
        token: "CAPACITY",
        label: "Who writes and how much time they really have",
        example:
          "Me, about six hours a week, and I have never finished more than two pieces in a month even when I planned four",
      },
      {
        token: "EXISTING",
        label: "What already exists on the site",
        example: "A menu pricing calculator page and one old post about waste tracking",
      },
      {
        token: "FIXED_DATES",
        label: "Anything with a fixed date",
        example: "The supplier piece has to be out before the trade show on 12 October",
      },
    ],
    expectedOutput:
      "A stated sustainable output rate, a dependency map naming pillars and orphans, a sequence justified by dependency rather than date, and only then a calendar that fits the rate, plus a named piece most likely to slip.",
    followUps: [
      "I missed two slots. Reschedule from today without extending the end date, and tell me what gets cut rather than compressed.",
      "Turn the pillar piece into its own mini plan, since it is three times the size of everything else on this list.",
      "One of the customer stories fell through. Tell me which supporting piece now has nothing pointing at it.",
    ],
    pitfalls: [
      "If you inflate your capacity, everything downstream is fiction. Give the number you have actually hit, not the one you intend to hit.",
      "Models want to fill every week. An empty slot in the calendar is usually correct and gets removed if you do not defend it.",
      "The orphan flag frequently lands on a piece somebody is attached to. Cutting it is nearly always right, and merging it into a supporting piece is the compromise.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Order the steps wrong and the plan is unsalvageable. When scheduling comes first, models produce a calendar at roughly double the stated capacity and then write a justification for it. Asking for the sustainable output rate as a standalone answer, before any dates exist, makes overcommitment impossible to bury inside a grid of weeks.",
  },

  article: {
    intro: [
      "A content calendar prompt that starts by assigning dates has already made the two mistakes that kill calendars. It sequences by what fits neatly into weeks rather than by which pieces depend on each other, and it assumes a production rate nobody on the team has ever sustained.",
      "This one does capacity first and dates last. In between it maps which pieces support which, so the order is driven by dependency, and it names the pieces that connect to nothing rather than scheduling them alongside everything else as though they were equivalent.",
    ],

    sections: [
      {
        heading: "Capacity before dates, always",
        body: [
          "Ask for a calendar and you will get one shaped like a calendar: something in every week, evenly distributed, quietly assuming that each piece takes the same effort and that nothing else happens. Teams then miss the third week, fall behind, and abandon the plan by week six.",
          "Any ai prompt for an editorial calendar that skips this step inherits the same optimism. Making the sustainable rate a separate output, produced before any dates exist, changes the conversation. A number like two pieces a month, stated plainly against a list of nine, forces the cut to happen during planning rather than through attrition. Setting the best blog posting frequency for seo you can actually sustain is unglamorous and it is the difference between a plan and a wish.",
        ],
      },
      {
        heading: "Sequence by dependency, not by date",
        body: [
          "Pieces in a cluster support each other through links, and the support only works in one direction at a time. A supporting article published two months before its pillar spends those two months pointing at nothing, and the pillar arrives with no established context around it.",
          "So the prompt orders by dependency first and only then lays the order onto dates. The rule that mutually linking pieces publish within a fortnight of each other exists because a link added retroactively to an old post gets far less attention than one present at publication. Deciding which article to publish first in a cluster is a structural question, not a scheduling preference.",
        ],
        list: [
          "Pillar first, or alongside its first supporting piece. Never after.",
          "Mutually linking pieces within a two week window.",
          "Anything with an external fixed date scheduled backwards from that date, not forwards from today.",
          "Orphans cut or connected before they take a slot.",
        ],
      },
      {
        heading: "What the orphan flag is really telling you",
        body: [
          "A piece that connects to nothing else on the plan is usually a leftover from a different strategy, or something somebody wanted to write for reasons unrelated to the audience. It will publish, get no internal links, and sit unvisited.",
          "The prompt requires a decision on each one: name the piece that would connect it, or cut it. Both outcomes are better than scheduling it. In practice the most common good result is merging the orphan into a supporting piece, where its content survives and the slot is freed for something the cluster needs. This is how to sequence content for topic clusters in a way that survives a change of plan.",
        ],
      },
      {
        heading: "Prerequisites, the reason slots slip",
        body: [
          "Each calendar slot includes what has to be true before work can start, with particular attention to anything requiring another person. Customer stories need a customer to agree. Data pieces need someone to pull the numbers. Interviews need diaries to align.",
          "These dependencies are the actual cause of most missed dates, and they are invisible on a calendar showing only titles and publication days. Surfacing them at planning time converts a slipped deadline into an email you could have sent three weeks earlier.",
        ],
      },
      {
        heading: "Using the content calendar prompt when things slip",
        body: [
          "The final output names the piece most likely to slip and what to do when it does, which matters because the default response to a missed slot is to compress the remaining schedule. That guarantees the next miss.",
          "The correct response is almost always to cut rather than compress, and deciding in advance which piece is expendable makes that choice available under pressure. Rerunning the prompt after a miss, with the same honest capacity figure, is faster than negotiating with yourself about whether you can catch up.",
        ],
      },
    ],

    howTo: {
      name: "How to use the content calendar prompt",
      steps: [
        {
          name: "State the capacity you have actually achieved",
          text: "Not your target. The number of pieces you finished in your best recent month, which is usually lower than the plan you wrote at the time.",
        },
        {
          name: "List everything, including the half formed ideas",
          text: "The dependency map is more useful when it can see the full set, and the orphan flag works by comparison across the whole list.",
        },
        {
          name: "Act on the orphan flags before scheduling",
          text: "Cut or merge each one. Scheduling an orphan and deciding later means it takes a slot from a piece the cluster needed.",
        },
        {
          name: "Chase the prerequisites immediately",
          text: "Every slot listing a dependency on another person is an email to send this week, regardless of how far away the publication date is.",
        },
      ],
    },

    faq: [
      {
        question: "How many pieces should a small team plan per month?",
        answer:
          "Whatever it has actually produced, which for most one person operations is two rather than the four they plan. The prompt asks for the achieved figure rather than the intended one specifically because using the intended number is how calendars become fiction by week three.",
      },
      {
        question: "Should the pillar piece really publish first?",
        answer:
          "Before or alongside its first supporting piece, yes. Publishing supporting content into a gap where the pillar should be means those pieces link outward to nothing and the cluster has no centre for however long the pillar takes.",
      },
      {
        question: "What if a fixed date makes the dependency order impossible?",
        answer:
          "Then the fixed date wins and the prompt schedules backwards from it, but it will tell you which dependency broke. That is worth knowing, because it usually means one supporting piece needs a temporary link target until the pillar catches up.",
      },
      {
        question: "Is a realistic publishing schedule example for a small team really this conservative?",
        answer:
          "Usually more conservative than people expect and considerably more productive than the alternative. Two published pieces a month sustained for a year beats eight pieces in a burst followed by nine months of nothing, both for search and for the habit of finishing things.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/seo-keyword-research-prompt",
        label: "seo keyword research prompt",
        description:
          "Produces the page map this calendar sequences, including which phrase each planned piece owns.",
      },
      {
        href: "/marketing-prompts/blog-post-outline-prompt",
        label: "blog post outline prompt",
        description:
          "Run per piece once it has a slot, since the author required tags tell you which slots need your time rather than a writer's.",
      },
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description:
          "The recurring slot most calendars forget to budget for, and the one that quietly consumes the capacity meant for articles.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "For editorial meetings, where the unowned action is nearly always the piece that later slips.",
      },
    ],

    externalLinks: [
      {
        href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        label: "Google: Creating helpful, people first content",
        description:
          "Sets out why consistent quality matters more than publishing volume, which is the argument behind cutting rather than compressing.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the staged output technique that keeps the capacity check from being absorbed into the scheduling step.",
      },
      {
        href: "https://hbr.org/2003/01/why-good-projects-fail-anyway",
        label: "Harvard Business Review: Why good projects fail anyway",
        description:
          "The research on planning fallacy and prerequisite dependencies, which is why each slot lists what must be true before work starts.",
      },
    ],
  },
};

export default meta;

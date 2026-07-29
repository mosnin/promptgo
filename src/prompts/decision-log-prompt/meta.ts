import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "decision-log-prompt",
  name: "Running Decision Record",
  title: "Decision Log Prompt",
  category: "productivity-prompts",
  taskType: "extract",
  summary:
    "Turns scattered notes into log entries that name the decider, the date, the assumption underneath, and the event that would reopen the question.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["decisions", "records", "accountability", "team memory"],

  seo: {
    primaryKeyword: "decision log prompt",
    keywords: [
      "decision log prompt",
      "recording decisions that were already made",
      "who decided and on what date",
      "ai prompt for a decision record",
      "what would make us revisit this",
      "assumptions behind a decision",
    ],
    seoTitle: "Decision Log Prompt: Decider, Date, Assumption, Trigger",
    seoDescription:
      "A decision log prompt that turns scattered notes into entries naming who decided, what they assumed, what was rejected, and what would reopen the question.",
  },

  prompt: {
    text: `You are maintaining a running decision log. You are not helping anybody decide anything. Every entry describes a choice that has already been made, written so that somebody joining in six months understands it without asking.

RAW MATERIAL, WHICH MAY BE MESSY: {{RAW}}
PEOPLE INVOLVED AND THEIR ROLES: {{PEOPLE}}
PERIOD THIS COVERS: {{PERIOD}}
DECISIONS ALREADY IN THE LOG: {{EXISTING}}

For each candidate decision, produce a row with exactly these fields.
- DECISION: one sentence beginning we will, in the past tense of having chosen. No hedging verbs. If it cannot be written this way it is not a decision.
- DECIDER: one named person. Not the team, not the group, not we. If the raw material does not name anybody, write UNATTRIBUTED and flag it.
- DATE: the date it was settled, not the date it was discussed. If unknown, write the range you can defend.
- ALTERNATIVES REJECTED: what was on the table and is now closed.
- ASSUMPTION: the thing believed at the time that makes this the right choice. Every decision has at least one. If you cannot find it, say so, because an unfindable assumption usually means the decision was made on preference.
- REVISIT TRIGGER: the observable event that should reopen this. An event, not a date. Not we will review in six months.

Then produce three lists.
1. NOT DECISIONS: material that looks like a decision and is not, each labelled discussion, preference, aspiration or instruction, so nobody logs it later.
2. CONTRADICTIONS: anything here that conflicts with an entry already in the log, with both entries quoted.
3. STALE ENTRIES: existing entries whose assumption you can already see has expired.

Never invent a decider, a date or an assumption. UNATTRIBUTED is a useful answer and a guess is not.`,
    variables: [
      {
        token: "RAW",
        label: "Raw material, which may be messy",
        example:
          "Paste of three weeks of a project channel: we agreed to drop the Android build for now, Priya said she is fine going with Postgres over Dynamo, someone suggested moving standup to Tuesdays, Marcus confirmed we are not hiring a second designer until Q3.",
      },
      {
        token: "PEOPLE",
        label: "People involved and their roles",
        example:
          "Marcus (engineering director, budget holder), Priya (staff engineer, owns the data layer), Ana (product), Ravi (contractor, no decision rights)",
      },
      {
        token: "PERIOD",
        label: "Period this covers",
        example: "1 to 21 July, between the kickoff and the first delivery review",
      },
      {
        token: "EXISTING",
        label: "Decisions already in the log",
        example:
          "12 June, Marcus: we will ship web first. 20 June, Priya: we will use managed hosting rather than run our own cluster.",
      },
    ],
    expectedOutput:
      "One row per real decision with a named decider, a defensible date, the rejected alternatives, the assumption underneath and an event based revisit trigger, plus a list of things that were not decisions, any contradictions with existing entries, and entries whose assumptions have expired.",
    followUps: [
      "For every UNATTRIBUTED row, draft the one line message I send to find out who actually made the call.",
      "Take the three entries with the shakiest assumptions and tell me what evidence would confirm or kill each one.",
      "Write the half page a new joiner reads on day one, built only from entries whose triggers have not fired.",
    ],
    pitfalls: [
      "Pasting a meeting transcript produces a log full of discussion. Transcripts record what was said, and a log records what was settled, which is usually four lines out of an hour.",
      "Allowing the team as a decider destroys the value of the field within a month, because nobody can be asked about it later and nobody feels able to change it.",
      "A review date is not a revisit trigger. Six months from now is a diary entry that gets deleted. When our monthly volume passes ten thousand orders is a condition somebody will actually notice.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Run over a real project channel, the first output logged eleven decisions and only five survived the named decider rule. The other six were somebody thinking out loud and nobody objecting, which is exactly the material that gets quoted back a year later as an agreement. Gemini 3 Pro is the most willing to invent a plausible decider, so the unattributed instruction has to be repeated in the closing line.",
  },

  article: {
    intro: [
      "A decision log prompt is not a tool for making decisions. It is for the much duller and more valuable job of recording the ones that already happened, in a form that survives the people who made them leaving.",
      "The failure it exists to prevent is specific. Six months after a choice, nobody can remember who made it, what was assumed at the time, or whether the thing that made it correct is still true. So the choice gets relitigated from scratch, usually by people who were not there, and the second decision is often the one the first one already rejected.",
      "Four fields prevent most of that: who decided, when, what they were assuming, and what would tell you to look again.",
    ],

    sections: [
      {
        heading: "A log is neither minutes nor a memo",
        body: [
          "Recording decisions that were already made sits between two things teams already do. Minutes capture a meeting, including the discussion, and are read by nobody after the following week. A decision memo argues towards a choice and is written before it, so it is a document about uncertainty.",
          "A log is the thin residue of both. One line per settled question, no argument, no narrative, no attendance list. That thinness is what makes it readable in one sitting a year later, which is the only test that matters.",
        ],
      },
      {
        heading: "A decision with no name attached did not happen",
        body: [
          "Who decided and on what date is the field that gets hedged, because naming an individual feels like assigning blame in advance. In practice the opposite happens. An unnamed decision belongs to everybody, which means nobody feels able to change it, and it hardens into a constraint that outlives its reasoning.",
          "The prompt refuses to guess. When the raw material genuinely does not say, the entry is marked unattributed and flagged, and the follow up drafts the message that finds out. That message is nearly always answered in a sentence, because somebody does remember.",
        ],
      },
      {
        heading: "The assumption is the part that expires",
        body: [
          "Assumptions behind a decision are what actually go stale. The decision to run everything on one managed database was correct when the team was four people with a hundred customers, and it is the same decision, written in the same words, when it becomes wrong at forty people and ten thousand customers.",
          "Recording the assumption converts an argument about the choice into a question about a fact. Nobody has to defend a decision they made two years ago. They just have to look at whether the thing they believed is still true, which is a much shorter and less personal conversation.",
        ],
        subsections: [
          {
            heading: "When no assumption can be found",
            body: [
              "The prompt is told to say so rather than invent one, and that answer is informative. A decision with no findable assumption was usually made on preference or on who spoke last, and it is the first candidate for revisiting when circumstances change.",
            ],
          },
        ],
      },
      {
        heading: "Triggers, not review dates",
        body: [
          "What would make us revisit this is a better field than when will we review this, and the difference is not pedantry. A review date arrives when everybody is busy and gets moved. A trigger is a condition somebody notices in the course of their ordinary work: a volume threshold, a customer segment appearing, a contract ending, a dependency reaching end of life.",
          "Good triggers are observable by somebody who has never read the log. If checking whether the trigger has fired requires a meeting, it is not a trigger, and the prompt is instructed to reject date based ones and ask again.",
        ],
      },
      {
        heading: "What the decision log prompt throws out",
        body: [
          "An ai prompt for a decision record that logs everything produces a document nobody reads, which is functionally the same as no log with extra maintenance. So this one sorts aggressively and shows you the discard pile.",
          "Four things get thrown out. Discussion, where options were weighed and nothing closed. Preference, where somebody stated a view. Aspiration, where a future intention was described as though settled. And instruction, where one person told another to do something, which is a task rather than a decision. Seeing them labelled is what stops them reappearing in next month's log.",
        ],
        list: [
          "Discussion: we talked about moving to monthly releases.",
          "Preference: I would rather we did not add another vendor.",
          "Aspiration: we want to be on the new platform by the autumn.",
          "Instruction: Ravi, can you update the deployment script.",
        ],
      },
      {
        heading: "Reading the log backwards",
        body: [
          "The most useful pass over a decision log is not chronological. It is filtering for entries whose triggers have fired and whose assumptions look shaky, which turns a static record into a short list of things worth reopening this quarter.",
          "That list is normally three or four items long, and it is a far better agenda than any planning session that starts from a blank page. The contradictions section does similar work in the other direction, catching the case where two teams have quietly settled the same question in opposite ways.",
        ],
      },
    ],

    howTo: {
      name: "How to keep a log with the decision log prompt",
      steps: [
        {
          name: "Run it fortnightly on channel history",
          text: "Little and often beats a quarterly archaeology session. Two weeks of a busy channel yields three or four real entries and takes about ten minutes to check.",
        },
        {
          name: "Paste the existing log every time",
          text: "The contradiction and stale entry checks only work with the current log in context, and those two sections are worth more than the new rows.",
        },
        {
          name: "Chase the unattributed rows the same day",
          text: "Memory of who made a call decays in weeks. Asking after a fortnight gets an answer, and asking after a quarter gets three people guessing.",
        },
        {
          name: "Store it somewhere with no permissions on it",
          text: "A log people cannot read is a log nobody trusts. If a decision is too sensitive to record openly, log the fact that it was made and where the detail lives.",
        },
      ],
    },

    faq: [
      {
        question: "How is a decision log prompt different from taking meeting notes?",
        answer:
          "Notes record a conversation and are organised by when it happened. A log records outcomes and is organised by what was settled, with four extra fields that notes never carry: the named decider, the assumption, the rejected alternatives and the revisit trigger. Most meetings produce notes and no log entries at all.",
      },
      {
        question: "Should every small decision go in?",
        answer:
          "No, and the fastest filter is to ask whether somebody joining in six months would be confused by the result without knowing the reasoning. Choices about tools, scope, sequencing and who owns what usually qualify. Choices you could reverse in an afternoon usually do not.",
      },
      {
        question: "What do we do when a trigger fires?",
        answer:
          "Reopen the entry rather than the argument. Check whether the assumption still holds, and if it does not, write a new entry that supersedes the old one rather than editing history. The superseded row is evidence that the process works and is worth keeping visible.",
      },
      {
        question: "Who should own the log?",
        answer:
          "One person, and preferably not the most senior one. Ownership by a rotating group produces gaps at every handover. The owner does not decide anything, they just run this every fortnight and chase the unattributed rows, which is about twenty minutes of work.",
      },
      {
        question: "Can it work from a meeting transcript?",
        answer:
          "It can, but the discard pile will be enormous, because a transcript is mostly discussion. Better input is the channel where work is coordinated, plus your own notes. If you only have the transcript, expect around four entries per hour of conversation.",
      },
      {
        question: "Does naming a decider cause friction?",
        answer:
          "Less than you would expect, and less than the alternative. People are usually comfortable owning a decision they actually made, and the discomfort tends to appear where the decision was made ambiguously, which is precisely the case the log needs to surface rather than smooth over.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description:
          "For the instruction rows the log discarded, which are tasks needing an owner rather than decisions needing a record.",
      },
      {
        href: "/productivity-prompts/note-summary-prompt",
        label: "note summary prompt",
        description:
          "Condenses the raw material before it comes here, which shrinks the discard pile considerably.",
      },
      {
        href: "/productivity-prompts/meeting-agenda-prompt",
        label: "meeting agenda prompt",
        description:
          "Build the next agenda from the entries whose triggers have fired rather than from a blank page.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "The capture step this feeds on, for teams that want the conversation recorded as well as the outcome.",
      },
    ],

    externalLinks: [
      {
        href: "https://adr.github.io/",
        label: "Architecture Decision Records",
        description:
          "The originating practice for recording context and consequences alongside a choice, generalised here beyond software.",
      },
      {
        href: "https://hbr.org/2010/06/the-case-for-behavioral-strategy",
        label: "Harvard Business Review: The case for behavioral strategy",
        description:
          "Documents how organisations reconstruct the reasoning behind past choices inaccurately, which is what the assumption field guards against.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the extraction with refusal pattern used here, where the model must say unattributed rather than fill a required field.",
      },
    ],
  },
};

export default meta;

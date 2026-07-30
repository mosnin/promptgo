import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "daily-standup-prompt",
  name: "Four Line Standup",
  title: "Daily Standup Prompt",
  category: "productivity-prompts",
  taskType: "generate",
  summary:
    "Writes four capped lines: one finished thing, one commitment, one properly shaped blocker with a named person and a duration, and one risk.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["standup", "status", "async", "blockers"],

  seo: {
    primaryKeyword: "daily standup prompt",
    keywords: [
      "daily standup prompt",
      "what to say in a daily standup",
      "ai prompt for an async status update",
      "how to report a blocker in standup",
      "how to write a good standup update",
      "daily update for a distributed team",
    ],
    seoTitle: "Daily Standup Prompt: Name the Blocker, Skip the Theatre",
    seoDescription:
      "A daily standup prompt that reports one finished thing, one commitment and a blocker shaped as a person and a duration. Four capped lines, no progress language.",
  },

  prompt: {
    text: `You are writing one person's daily standup update. The update exists to move work, not to demonstrate effort. Activity with no result is noise, so do not report it.

WHAT I DID SINCE THE LAST UPDATE: {{YESTERDAY}}
WHAT I INTEND TO DO TODAY: {{TODAY}}
WHAT IS IN MY WAY: {{FRICTION}}
WHO READS THIS: {{AUDIENCE}}

Write exactly four lines, each under twenty five words.

FINISHED: one thing now done and checkable by somebody else. If nothing finished, write "nothing finished" and name the closest item with the completion percentage you are guessing at.

TODAY: one commitment stated as a result, not an activity. Not "continue the migration" but "the migration dry run passes on staging". One only. Extra intentions go unsaid.

BLOCKED: either "not blocked" or a blocker in this exact shape: what is stuck, the named person or decision that unblocks it, and how long it has been stuck. Never write "waiting on the team". If something I described as friction meets that definition, promote it to a blocker and tell me you did.

WATCH: one risk to today's commitment, or "none".

Refuse to pad. Two empty lines can be an accurate update. Do not convert a thin day into three sentences of progress language.`,
    variables: [
      {
        token: "YESTERDAY",
        label: "What you did since the last update, as fragments",
        example:
          "reviewed Sam's onboarding rewrite, half of the export fix, chased legal about the vendor DPA again, two escalation calls",
      },
      {
        token: "TODAY",
        label: "What you intend to do today",
        example:
          "finish the export fix and get it into staging, start the headcount case if there is time",
      },
      {
        token: "FRICTION",
        label: "Anything slowing you down, however minor it feels",
        example:
          "legal have had the DPA since last Tuesday, and the staging environment keeps timing out on large exports",
      },
      {
        token: "AUDIENCE",
        label: "Who reads the update and what they need from it",
        example:
          "Eight engineers across three time zones plus my manager, who only reads the blocked line",
      },
    ],
    expectedOutput:
      "Four short labelled lines with no narrative between them, a finished item somebody else could verify, exactly one committed result, and a blocker carrying a name and a duration or an explicit not blocked.",
    followUps: [
      "Write the one message that unblocks the blocked line, addressed to the named person, under sixty words.",
      "Read my last five updates and tell me which commitment I have now made three times without finishing.",
      "Rewrite this for my manager only, cutting anything she does not need in order to act.",
    ],
    pitfalls: [
      "Writing the friction field apologetically makes the model treat a real blocker as background noise. State the wait in days and let the promotion rule work.",
      "If you supply three intentions the model will sometimes keep all three. Reject any today line containing the word and twice.",
      "Nothing finished is a valid update. Rerunning until something looks like progress is the exact failure this format was built to prevent.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models consistently record a multi day wait on someone else as friction rather than as a blocker, which hides the item most likely to cost the week. Requiring a duration on every blocker, and promoting anything over a day, is what makes the delay visible in the update.",
  },

  article: {
    intro: [
      "A daily standup prompt should make exactly one line hard to write, and that line is the blocked one. Everything else in a status update is comfortable, which is why so many updates are three sentences of activity followed by a note that things are progressing well.",
      "This format allows four lines, caps each at twenty five words, and will promote something you described as friction into a blocker when that is what it actually is. Naming a blocker costs a little social capital today and saves several days later, which is precisely the trade people keep postponing.",
    ],

    sections: [
      {
        heading: "Status theatre, and why it keeps winning",
        body: [
          "Knowing how to write a good standup update is harder than it sounds, because status theatre is locally rational. Reporting activity is safe. Reporting a finished thing invites somebody to check whether it is really finished. Reporting a blocker puts a name next to a delay, and the name is often senior to you.",
          "A word cap removes most of the room for it. Twenty five words will not hold a sentence explaining that the work is complex and ongoing. Either something finished or nothing did, and nothing finished is treated here as a legitimate output rather than a confession.",
        ],
      },
      {
        heading: "Finished means checkable by somebody else",
        body: [
          "The first line rejects worked on and made progress. It wants something another person could verify without asking you a question first. That is a demanding bar for a single day, and clearing it three days in five is a healthy rate rather than a poor one.",
          "When nothing qualifies, the prompt asks for the nearest item plus a guessed percentage. The guess is the valuable part. It is a number you can be wrong about, and being visibly wrong twice running is how a stuck task gets noticed before the deadline notices it first.",
        ],
        subsections: [
          {
            heading: "One commitment, not three",
            body: [
              "Three intentions for a day is a forecast nobody checks. One is a commitment somebody could hold you to tomorrow morning, and choosing which one carries most of the value. Anyone wondering what to say in a daily standup is really deciding how much to promise, and the right answer is less than feels generous.",
            ],
          },
          {
            heading: "Results rather than verbs",
            body: [
              "Continue the migration is an activity that can stay true all week without anything changing. The migration dry run passes on staging either happened or it did not. The second phrasing makes tomorrow's update trivial to write and impossible to fudge.",
            ],
          },
        ],
      },
      {
        heading: "Why the daily standup prompt gives the blocker a fixed shape",
        body: [
          "How to report a blocker in standup is the question that matters, because the blocker is the line most people quietly leave out. So the shape is mandatory: what is stuck, the person or decision that unblocks it, and how long it has been stuck.",
          "The duration field is what changes behaviour. Blocked on legal is a status. Blocked on legal for six days is a problem with a name attached, and it tends to get resolved within an hour of the right person reading it.",
        ],
      },
      {
        heading: "Promotion, and the ban on waiting on the team",
        body: [
          "People describe blockers as friction because friction sounds like something you ought to push through unaided. The prompt is told to promote friction to a blocker whenever it meets the definition and to declare that it did, so you can disagree deliberately rather than never notice.",
          "Waiting on the team is forbidden for the same reason a team cannot own an action. Ownership without a name is not ownership. If nobody specific can clear it, then it is not a blocker at all, it is a design problem, and the update should say which of the two it is.",
        ],
      },
      {
        heading: "Written updates are judged more harshly than spoken ones",
        body: [
          "As an ai prompt for an async status update this format has to survive a reader four time zones away with no context and no opportunity to ask a follow up question. That is stricter than saying the same words on a call, where a confused expression prompts an immediate clarification.",
          "A daily update for a distributed team therefore trades warmth for precision. Four short lines, the same four every day, always in the same order, so somebody can scan twelve of them in under a minute and stop only at the ones that changed.",
        ],
      },
    ],

    howTo: {
      name: "How to run the daily standup prompt",
      steps: [
        {
          name: "Dump yesterday as fragments",
          text: "Do not write prose in the input. Fragments give the model something to compress, while a paragraph gets lightly reworded and keeps all of its hedging.",
        },
        {
          name: "Write the friction field without apologising",
          text: "State the wait in days. Apologetic phrasing is what causes a genuine blocker to be filed as background noise that nobody acts on.",
        },
        {
          name: "Say who reads it",
          text: "An update for eight peers is not an update for one manager. The audience field changes which detail survives the word cap.",
        },
        {
          name: "Post the thin days too",
          text: "The updates that build trust are the ones that say nothing finished on a Tuesday and then say the thing finished on Wednesday.",
        },
      ],
    },

    faq: [
      {
        question: "Does the daily standup prompt help if my team meets live?",
        answer:
          "Yes. Write the four lines beforehand and read them out. Live standups drift into narrative mainly because nobody prepared, and arriving with a finished item and a shaped blocker is what keeps a nine person meeting inside its fifteen minutes.",
      },
      {
        question: "What if I finish nothing for several days running?",
        answer:
          "Then several updates say nothing finished, and the guessed percentages beside them tell the story clearly. Something stuck at ninety percent for four days is either badly scoped or blocked by something nobody has named, and both of those are worth surfacing early.",
      },
      {
        question: "Is one commitment a day too little for a senior role?",
        answer:
          "Senior days contain more interruption rather than less, so a single protected commitment is often optimistic rather than modest. The line describes what you are willing to be held to, and the rest of what you do still happens without being promised in advance.",
      },
      {
        question: "Will naming a blocker make me look slow?",
        answer:
          "It makes the blocking visible, which is a different thing, and the duration field usually moves attention towards whoever is sitting on the decision. The updates that actually damage credibility are the ones reporting steady progress right up until a missed date.",
      },
      {
        question: "How long should writing one of these take?",
        answer:
          "Under three minutes once the shape is habitual. If it is taking longer, the yesterday field is being written as prose. Paste fragments instead, let the prompt compress them, and read the promoted blocker carefully before you post it anywhere.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/note-summary-prompt",
        label: "note summary prompt",
        description:
          "Turns yesterday's scribbles into the startable actions the today line has to choose between.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description:
          "For the blocker that turns out to be work you should have handed to somebody else last week.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "The same refusal to promote discussion into progress, applied to a whole meeting rather than a day.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts",
        label: "Anthropic: Giving the model a role",
        description:
          "Why assigning a reporting role and a strict line format holds better than asking for a short update.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/text-generation",
        label: "Google: Controlling generation length",
        description:
          "Explains why per line word caps are followed more reliably than a global instruction to be concise.",
      },
      {
        href: "https://about.gitlab.com/company/culture/all-remote/asynchronous/",
        label: "GitLab: Asynchronous communication handbook",
        description:
          "A large distributed organisation documenting why written updates need a fixed shape readers can scan.",
      },
    ],
  },
};

export default meta;

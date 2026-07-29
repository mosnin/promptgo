import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "context-switching-prompt",
  name: "Switch Cost Reducer",
  title: "Context Switching Prompt",
  category: "productivity-prompts",
  taskType: "plan",
  summary:
    "Sorts a day's work by the mental setup each task needs, batches it into runs, counts the switches you removed, and writes a re entry note for every unavoidable one.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["focus", "interruptions", "batching", "cognitive load"],

  seo: {
    primaryKeyword: "context switching prompt",
    keywords: [
      "context switching prompt",
      "grouping work by context to reduce switches",
      "cost of switching between tasks",
      "ai prompt for reducing interruptions",
      "writing a re entry note before you stop",
      "cognitive load across a working day",
    ],
    seoTitle: "Context Switching Prompt: Batch The Day, Count The Switches",
    seoDescription:
      "A context switching prompt that groups a day's work by the mental setup it needs, counts the switches removed, and writes a re entry note for each one left.",
  },

  prompt: {
    text: `You are reorganising one working day to minimise the number of times I have to change mental gear. You are not making the list shorter and you are not reprioritising it.

WHAT I HAVE TO DO TODAY: {{WORK}}
FIXED EVENTS I CANNOT MOVE: {{FIXED}}
WHERE INTERRUPTIONS COME FROM: {{INTERRUPTIONS}}
WHEN MY ATTENTION IS BEST AND WORST: {{ENERGY}}
ANYTHING THAT MUST FINISH TODAY: {{DEADLINES}}

Steps.
1. Assign every item a CONTEXT, defined as the setup it needs rather than the subject it concerns. Use at most five contexts across the whole day and name them after the setup: deep writing, code, people, numbers, shallow admin. Two tasks share a context only if I could move between them without changing tools, tabs or frame of mind.
2. Count the switches in the order I gave you. Report the number.
3. Rebuild the day into runs of one context each, respecting the fixed events and anything that must finish today. Report the new switch count and the difference.
4. Cost the difference at fifteen minutes of degraded work per avoided switch and state the reclaimed minutes as an estimate, labelled as an estimate.
5. Put the heaviest context in my best attention window and shallow admin in my worst. Never place deep work immediately after a people block without a five minute gap.
6. For every switch that remains, write the RE ENTRY NOTE I should leave before I stop: where exactly I got to, the next physical action, and the one thing I was holding in my head.
7. Name the single interruption source worth removing today and the one sentence I say or send to remove it. One only.

Return the context assignment, both switch counts, the rebuilt day as a timeline, the re entry notes, and the interruption to remove. End with the run most likely to collapse and what will collapse it.`,
    variables: [
      {
        token: "WORK",
        label: "What you have to do today",
        example:
          "Review two pull requests, write the board update, three interview debriefs to write up, approve invoices, one to one with Ravi, fix the flaky test, reply to the vendor about pricing, prep tomorrow's demo",
      },
      {
        token: "FIXED",
        label: "Fixed events you cannot move",
        example: "Standup at 9.30, one to one with Ravi at 2pm, all hands 4pm to 4.45pm",
      },
      {
        token: "INTERRUPTIONS",
        label: "Where interruptions come from",
        example:
          "Support channel pings roughly every twenty minutes, two direct reports drop by when they are blocked, and I check email whenever a build is running",
      },
      {
        token: "ENERGY",
        label: "When your attention is best and worst",
        example: "Sharpest between 8 and 11, useless from 2.30 to 3.30, second wind around 4",
      },
      {
        token: "DEADLINES",
        label: "Anything that must finish today",
        example: "The board update goes to the chair by 6pm, and the vendor needs an answer before their quote expires tonight",
      },
    ],
    expectedOutput:
      "Every task tagged with the setup it needs, the switch count before and after, a rebuilt timeline of single context runs that respects your fixed events, an estimate of reclaimed minutes, a re entry note for each remaining switch, and one interruption source to remove today.",
    followUps: [
      "Write the message I send to the support channel that redirects pings for the next three hours without making anybody wait on something urgent.",
      "The 11am run collapsed. Rebuild the rest of the day from now, keeping the two hard deadlines.",
      "Turn the context assignment into a set of rules I can apply to tomorrow's list myself, in five lines.",
    ],
    pitfalls: [
      "Naming contexts after projects rather than setups is the mistake that undoes the whole thing. Two tasks on the same project can need completely different gear, and grouping them buys nothing.",
      "Leaving the energy field blank puts deep work wherever there is a gap, which is usually the dead hour after lunch, and the run collapses within fifteen minutes.",
      "Asking it to remove three interruption sources produces three things you do not do. One removed source, actually removed, beats a list every time.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Grouping is where this task goes wrong. Left to their own definition, models batch by project rather than by setup cost, so two tasks that need different tools and different files end up inside one block. Defining a switch as a change of tools and context, and demanding a written re entry note, keeps the batches real.",
  },

  article: {
    intro: [
      "A context switching prompt is not another way of ordering a to do list. The order is mostly given to you by deadlines and meetings. What is not given, and what nobody counts, is how many times in a day you change the setup your brain is running, and that number is where the hours go.",
      "This one assigns each task the mental gear it needs rather than the project it belongs to, counts the switches in your day as it stands, rebuilds it into runs, and counts them again. Two numbers, before and after.",
      "Then it does the part that matters when the plan fails, which is every day: it writes the note you leave behind when something interrupts you, so getting back in costs seconds rather than minutes.",
    ],

    sections: [
      {
        heading: "Switch cost is paid twice",
        body: [
          "The cost of switching between tasks is not the moment of transition. It is the tail on either side: the two minutes of half attention before you fully leave the old task, and the much longer stretch afterwards where you are technically working on the new one and are actually still reconstructing where you were.",
          "That reconstruction is invisible in a calendar and invisible in a time log. A day with eleven switches and a day with four can contain identical hours and identical tasks, and produce very different amounts of finished work.",
        ],
      },
      {
        heading: "Contexts are setups, not subjects",
        body: [
          "Grouping work by context to reduce switches only works if the contexts are defined by what your working state has to be. Two tasks belong together when you could move from one to the other without changing tools, tabs or frame of mind. By that test, reviewing a pull request and writing an interview debrief are different contexts even though both are reading and typing, while three interview debriefs in a row are one.",
          "The common mistake is grouping by project. Everything about the migration in one block sounds tidy and contains a code review, a stakeholder email and a budget line, which is three gear changes wearing one label. The prompt caps the day at five contexts and forces them to be named after the setup, which makes the project instinct hard to act on.",
        ],
        list: [
          "Deep writing: prose that has to be reasoned out, one window, no notifications.",
          "Code: an editor, a test suite and a mental model of a system you have to hold.",
          "People: calls, one to ones, anything where you are reading somebody in real time.",
          "Numbers: spreadsheets, budgets, anything where an arithmetic error is expensive.",
          "Shallow admin: approvals, expenses, short replies, work that survives being interrupted.",
        ],
      },
      {
        heading: "Counting the switches you actually have",
        body: [
          "The before and after counts are the most persuasive part of the output, because almost everybody underestimates the first number. A day that feels like four or five blocks routinely contains twelve transitions once the small ones are counted, and the small ones are not cheap.",
          "Cognitive load across a working day accumulates rather than resetting. The eleventh switch costs more than the third, which is why the rebuilt timeline puts the heaviest context in your best window and leaves shallow admin for the dead hour.",
        ],
      },
      {
        heading: "Writing a re entry note before you stop",
        body: [
          "Writing a re entry note before you stop is the highest return habit in this whole prompt and takes about twenty seconds. Three things: exactly where you got to, the next physical action, and the one thing you were holding in your head that is not written down anywhere.",
          "The third element is the one people leave out and the one that costs the most. You can find your place in a document. You cannot recover the half formed objection to the third paragraph that you were about to check, and without it you reread the whole thing to get back to where you already were.",
        ],
        subsections: [
          {
            heading: "Notes for planned stops, not just interruptions",
            body: [
              "The note is most valuable at the end of a run you chose to end, because you know the stop is coming and can write it calmly. A note written while somebody is standing at your desk is worse than one written thirty seconds earlier.",
            ],
          },
        ],
      },
      {
        heading: "What the context switching prompt refuses to batch",
        body: [
          "Batching has a limit and pretending otherwise produces a plan that quietly misses a deadline. Anything that must finish today, anything another person is waiting on to start their own work, and anything with a hard external time are all exempt from grouping, and the output states which items it could not batch and why.",
          "The other refusal is stacking deep work directly after a people block. A one to one does not end when the call does, and five minutes of gap costs less than the ten it saves.",
        ],
      },
      {
        heading: "Remove one interruption source, not five",
        body: [
          "An ai prompt for reducing interruptions will happily hand you a list of six changes to your working environment, and you will make none of them. The instruction here is to name one and to write the sentence that removes it, whether that is a message to a channel, a change to a notification setting, or telling two people when you are available instead of always.",
          "One removed source per day compounds quietly. The list produces nothing, because the effort of changing how other people reach you is social rather than technical, and social effort does not parallelise.",
        ],
      },
    ],

    howTo: {
      name: "How to reorganise a day with the context switching prompt",
      steps: [
        {
          name: "List the work in whatever order it is already in",
          text: "Do not tidy it first. The before count is measured against your real order, and a pre sorted list makes the comparison meaningless.",
        },
        {
          name: "Be specific about your attention windows",
          text: "Two good hours and one dead hour is enough detail. This determines which context lands where, and it is the difference between a plan that fits you and one that fits a generic day.",
        },
        {
          name: "Name your interruption sources honestly",
          text: "Include the ones you cause. Checking email while a build runs is a self inflicted switch, and it is usually the easiest one to remove.",
        },
        {
          name: "Write the re entry notes as you go, not in advance",
          text: "Use the template the output gives you, but fill it in at the moment you stop. A note written from imagination misses the thing you were actually holding.",
        },
        {
          name: "Check the collapse prediction at lunchtime",
          text: "The output names the run most likely to fail. If it has already failed, rerun from now rather than trying to squeeze the remaining runs into less time.",
        },
      ],
    },

    faq: [
      {
        question: "Does a context switching prompt help if my job is mostly meetings?",
        answer:
          "Yes, and differently. With a calendar full of people work the useful output is grouping the small non meeting tasks into the gaps by type, and protecting one gap for the single deep item, rather than scattering admin between every call where it produces a switch each time.",
      },
      {
        question: "Is fifteen minutes per switch a real number?",
        answer:
          "It is an average drawn from attention research, not a measurement of your day, and the output labels it as an estimate. The value is in the comparison rather than the absolute figure. Eleven switches versus five is a meaningful difference whatever the per switch cost turns out to be for you.",
      },
      {
        question: "What if the batched plan falls apart by ten in the morning?",
        answer:
          "That is normal and the plan is still worth having, because you rebuild from a known structure rather than from a list. Rerun with the remaining work and the time left, and expect fewer runs and more admin, which is the honest shape of an interrupted day.",
      },
      {
        question: "How is this different from time blocking?",
        answer:
          "Time blocking assigns hours to tasks. This assigns hours to mental setups, which means the blocks contain several tasks that share a gear rather than one task each. The practical difference is that a block survives one task finishing early, because the next thing in the run needs no new setup.",
      },
      {
        question: "Can I run this for a whole week instead?",
        answer:
          "The contexts hold across a week and the switch counting does not, because a week has too much unknown in it to count transitions honestly. Plan the week by outcome and use this on the day, ideally the evening before while you can still remember what state each task is in.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/focus-session-prompt",
        label: "focus session prompt",
        description:
          "For what happens inside the longest run, once the day has been arranged so the run can exist.",
      },
      {
        href: "/productivity-prompts/time-audit-prompt",
        label: "time audit prompt",
        description:
          "Run it first if you do not trust your own account of where the switches come from.",
      },
      {
        href: "/productivity-prompts/daily-standup-prompt",
        label: "daily standup prompt",
        description:
          "The first people block of most days, and the one most likely to be followed too closely by deep work.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "For the recurring interruption that is really a missing document somebody keeps asking you to be.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.apa.org/topics/research/multitasking",
        label: "American Psychological Association: multitasking research",
        description:
          "The source for task switching carrying a measurable time cost rather than being free, which the switch count depends on.",
      },
      {
        href: "https://dl.acm.org/doi/10.1145/1357054.1357072",
        label: "ACM: The cost of interrupted work",
        description:
          "Peer reviewed study of resumption time after interruption, which is what the re entry note is designed to reduce.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents why asking for a count before and after a transformation produces a more disciplined rearrangement than asking for a better plan.",
      },
    ],
  },
};

export default meta;

import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "delegation-brief-prompt",
  name: "Handover Brief Builder",
  title: "Delegation Brief Prompt",
  category: "productivity-prompts",
  taskType: "generate",
  summary:
    "Draws an explicit decision boundary, guesses the constraints you never said out loud, and fixes a definition of done both sides could check.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["delegation", "handover", "briefing", "management"],

  seo: {
    primaryKeyword: "delegation brief prompt",
    keywords: [
      "delegation brief prompt",
      "how to hand off work without rework",
      "ai prompt for briefing a teammate",
      "deciding what only you can do",
      "delegation brief that states the constraints",
      "handing over a task with a decision boundary",
    ],
    seoTitle: "Delegation Brief Prompt: Hand Off Without the Rework",
    seoDescription:
      "A delegation brief prompt that sets the decision boundary, surfaces the constraints you never said out loud, and defines done before any work starts.",
  },

  prompt: {
    text: `You are writing a delegation brief so a task can leave one person's hands and not come back. The usual cause of rework is an unstated constraint, so your job is to surface the constraints the delegator has not thought to mention.

THE TASK: {{TASK}}
WHO IS TAKING IT: {{OWNER}}
WHAT I ACTUALLY CARE ABOUT: {{INTENT}}
THINGS I HAVE NOT SAID OUT LOUD: {{UNSPOKEN}}

Produce these six sections.

1. OUTCOME AND DEFINITION OF DONE. What exists when this is finished, described so the owner and I would agree whether it happened. Include format, audience and deadline.

2. DECISION BOUNDARY. Three lists. DECIDE FREELY: choices the owner makes alone and I will not revisit. CHECK FIRST: choices needing one message before proceeding, each with its reason. NOT YOURS: choices that stay with me, each with its reason. Every list holds at least one item. An empty NOT YOURS list is abdication, and an empty DECIDE FREELY list is not delegation.

3. CONSTRAINTS I DID NOT STATE. Infer up to five constraints that are probably true and were never written down: budget, tone, people who must be consulted, things that must not change. Mark each INFERRED and phrase it as a question I can confirm or reject in one word.

4. FIRST CHECKPOINT. A date and the specific artefact shown at it. Never "check in next week".

5. WHAT GOOD AND BAD LOOK LIKE. One short example of each, so the owner can calibrate without asking me.

6. WHAT I AM NOT TELLING THEM AND SHOULD BE. One blunt line, or nothing.

Do not write encouragement and do not restate the task as the outcome.`,
    variables: [
      {
        token: "TASK",
        label: "The task being handed over",
        example:
          "Rewrite the customer onboarding checklist and get it agreed with support before the end of the month.",
      },
      {
        token: "OWNER",
        label: "Who is taking it, and how much context they already have",
        example:
          "Sam, six months in, has run onboarding calls but has never negotiated anything with the support lead.",
      },
      {
        token: "INTENT",
        label: "What you actually care about in the result",
        example:
          "That support stop getting the same four questions in week one. The document itself matters less than the four questions disappearing.",
      },
      {
        token: "UNSPOKEN",
        label: "Things you know but have not said",
        example:
          "Dana rewrote this last year and will take it personally. The month end date is soft. This is partly a trial for owning onboarding outright.",
      },
    ],
    expectedOutput:
      "A brief under a page with a checkable definition of done, three populated decision lists each carrying reasons, up to five inferred constraints phrased as one word questions, a dated checkpoint naming an artefact, and paired good and bad examples.",
    followUps: [
      "Rewrite this as the message I actually send, keeping the decision boundary intact and cutting everything else.",
      "Given the unspoken list, tell me which item will cause a problem if I keep it to myself.",
      "Draft the three questions the owner is most likely to ask in week one, and answer them in the brief instead.",
    ],
    pitfalls: [
      "A thin intent field produces invented constraints. If the inferred questions read as generic, the model had nothing specific to reason from.",
      "Retained decisions accumulate by habit. Read the reasons in the not yours list and delete any that only say because I always have.",
      "The good and bad examples get cut for length more than anything else, and they are the cheapest calibration in the whole brief.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Delegation reads to a model as generosity rather than as a split, so the list of what the other person does not own comes back empty and every boundary stays theoretical. Requiring at least one entry in all three lists, and making each inferred constraint rejectable in a single word, turns the brief into something arguable.",
  },

  article: {
    intro: [
      "A delegation brief prompt is judged by one number: how much of the work comes back. Handing something over is easy, and it stays easy right up to the moment the result is not what was in your head, at which point you have paid for the task twice.",
      "The failure is almost never effort or ability. It is an unstated constraint, usually one so obvious to you that saying it never occurred to you: the tone this has to hit, the person who will be annoyed if nobody asks them, the figure that must not move.",
      "So this brief spends most of its effort in two places. It guesses the constraints you did not write down and asks you to confirm each in a single word, and it draws an explicit line around which decisions belong to whom.",
    ],

    sections: [
      {
        heading: "Deciding what only you can do",
        body: [
          "Deciding what only you can do comes before the brief, and most people get it wrong in the same direction. The list of things genuinely requiring you is shorter than it feels, and it is dominated by decisions rather than by tasks.",
          "Work needing your judgement about a trade off cannot be handed over. Work needing your knowledge can, as soon as the knowledge is written down. Confusing the two is how people end up keeping the drafting and delegating the formatting, which is precisely backwards.",
        ],
      },
      {
        heading: "Why the delegation brief prompt draws a decision boundary",
        body: [
          "Three lists: decide freely, check first, not yours. Each must hold something, and both empty list cases are failures with names. An empty not yours list is abdication. An empty decide freely list is supervision wearing a brief as a costume.",
          "Handing over a task with a decision boundary is the difference between somebody who can move and somebody who has to ask. Most of the traffic in a slow handover is requests for permission that could have been granted in advance, in writing, one line each.",
        ],
        subsections: [
          {
            heading: "Check first needs a reason",
            body: [
              "A checkpoint with no stated reason reads as distrust and gets skipped. With a reason attached it reads as information the owner did not have, and gets honoured. The reason is usually that the choice touches something outside their view: a commitment made elsewhere, a person with strong opinions, a cost landing on somebody else's budget.",
            ],
          },
          {
            heading: "Retained decisions need a reason too",
            body: [
              "Keeping a decision is a claim, and stating why makes the claim reviewable. Roughly half the retained decisions in a first draft turn out to be habit rather than necessity, and reading the reasons back in a list is the quickest way to notice that.",
            ],
          },
        ],
      },
      {
        heading: "The inferred constraints section pays for the rest",
        body: [
          "The model reads the task and the intent and proposes up to five constraints that are probably true and were never written down, each phrased as a question answerable with yes or no.",
          "It is fast, because rejecting a wrong guess costs one word. It is valuable because listing your own assumptions on demand is nearly impossible, while recognising one the moment somebody else says it out loud is effortless. How to hand off work without rework mostly reduces to getting those five questions asked before the work starts instead of after.",
        ],
      },
      {
        heading: "Done has to be checkable by both of you",
        body: [
          "Format, audience, deadline. A brief missing any of the three produces something perfectly reasonable that arrives in the wrong shape, and the resulting rework belongs to whoever wrote the brief.",
          "A delegation brief that states the constraints and then leaves done implicit is half a brief. Done is a shared test rather than a feeling, and the useful version is specific enough that neither side could argue about it afterwards without looking silly.",
        ],
      },
      {
        heading: "Checkpoints need an artefact, not a date alone",
        body: [
          "Check in next week is not a checkpoint. A checkpoint is a date plus a thing that will exist by then, and that thing should be small enough to throw away without regret.",
          "An early artefact is a cheap way to catch a misread brief while it still represents an hour of work. An outline, a first section, three example rows. Skipping it usually means finding the misunderstanding at the deadline, when the only options left are accept it or redo it yourself.",
        ],
      },
      {
        heading: "The blunt line at the end",
        body: [
          "The final section asks what you are not telling them and should be. It is uncomfortable, and it is where the genuinely useful information tends to sit: that this is a trial for something larger, that the deadline is softer than stated, that the last person to attempt it had a difficult time with a stakeholder.",
          "Run as an ai prompt for briefing a teammate, this is the section people delete before sending. It is also the one that most reliably stops a handover failing for reasons that had nothing to do with the task.",
        ],
      },
    ],

    howTo: {
      name: "How to run the delegation brief prompt",
      steps: [
        {
          name: "Write the intent before the task",
          text: "What you care about shapes every inference that follows. A task description alone produces a brief about the artefact rather than about the result you wanted from it.",
        },
        {
          name: "Answer the inferred questions in one word each",
          text: "Yes or no, straight down the list. Anything you hesitate over is a constraint worth a sentence, and hesitation is a reliable signal here.",
        },
        {
          name: "Read the two boundary lists back",
          text: "Check first and not yours are where over management hides. If either is longer than decide freely, you are supervising rather than handing over.",
        },
        {
          name: "Send the brief and the checkpoint together",
          text: "A brief without a dated artefact quietly becomes a suggestion. Put the checkpoint in both calendars at the same time you send the document.",
        },
      ],
    },

    faq: [
      {
        question: "How long should a delegation brief actually be?",
        answer:
          "Under a page for most tasks. The parts worth length are the decision boundary, which should be exhaustive, and the constraints, which should be confirmed. Everything else can stay short, because an owner will ask about anything genuinely missing from it.",
      },
      {
        question: "Does the delegation brief prompt work for handing work sideways?",
        answer:
          "Sideways it works well, with the retained list reframed as what stays with your team. Upwards it does not apply, since you cannot set a decision boundary for somebody who outranks you, and attempting one reads exactly as badly as it sounds.",
      },
      {
        question: "What if every inferred constraint comes back wrong?",
        answer:
          "You reject five questions in about fifteen seconds and the brief is better for it, because you now know your assumptions were less obvious than they felt. A model guessing badly here usually means the intent field was too thin to reason from.",
      },
      {
        question: "Should the owner see the section about what I am not telling them?",
        answer:
          "Yes, once you have decided what to keep back. That section exists to force the choice rather than to create a private note. Anything you read there and still withhold should at least be withheld deliberately instead of by simple omission.",
      },
      {
        question: "How do I stop work coming back in the wrong tone?",
        answer:
          "Include the bad example. One short paragraph of what you do not want calibrates faster than three sentences describing what you do want, and the prompt produces both examples in the same pass, so the extra cost is nothing at all.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description:
          "Use it first to work out which items should leave your list entirely rather than being handed on.",
      },
      {
        href: "/productivity-prompts/inbox-triage-prompt",
        label: "inbox triage prompt",
        description:
          "Produces the delegate bucket that this turns into something the other person can act on.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "For work you hand over repeatedly, where writing the process once beats writing a brief every month.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2017/10/to-be-a-great-leader-you-have-to-learn-how-to-delegate-well",
        label: "Harvard Business Review: Learning to delegate well",
        description:
          "Management research on why retained decisions accumulate by habit, which is the pattern the reasons column exposes.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting",
        label: "Anthropic: Using examples in prompts",
        description:
          "Evidence that a paired good and bad example calibrates output faster than a written description of the standard.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers asking a model to surface unstated assumptions as questions, the mechanism behind the inferred constraints section.",
      },
    ],
  },
};

export default meta;

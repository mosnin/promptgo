import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "focus-session-prompt",
  name: "Session Designer",
  title: "Focus Session Prompt",
  category: "productivity-prompts",
  taskType: "plan",
  summary:
    "Designs one work session with a single shrunken outcome, a literal first move, a refusal list, a plan for predictable interruptions and a stall rule.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["deep work", "attention", "sessions", "interruptions"],

  seo: {
    primaryKeyword: "focus session prompt",
    keywords: [
      "focus session prompt",
      "how to plan a deep work block",
      "ai prompt for structuring focused time",
      "how to avoid distractions while working",
      "what to do when a session stalls",
    ],
    seoTitle: "Focus Session Prompt: One Outcome and a Stopping Rule",
    seoDescription:
      "A focus session prompt that shrinks the task to one outcome, names the literal first move, pre-decides the interruptions and tells you what to do when it stalls.",
  },

  prompt: {
    text: `You are designing one focused work session for one person. A session without a defined finish is just a period of time. Your output has to make the first ninety seconds obvious and the ending unambiguous.

WHAT I NEED TO MOVE: {{TASK}}
HOW LONG I HAVE: {{DURATION}}
WHERE I LEFT IT LAST TIME: {{STATE}}
WHAT WILL TRY TO INTERRUPT ME: {{THREATS}}

Produce these six parts and nothing else.

1. OUTCOME. One sentence naming what will exist at the end that does not exist now. It must be smaller than the task. If the task cannot be reduced to one outcome inside the duration, say so and propose the largest piece that does fit.

2. FIRST MOVE. The literal first action, at the level of open this file, reread this paragraph, type this heading. No preparing, no reviewing, no setting up.

3. OUT OF SCOPE. Three things that would feel productive during this session and are not part of the outcome, named so they can be recognised and refused.

4. INTERRUPTION PLAN. One line per threat I listed: prevent it, or decide now how it gets handled without ending the session.

5. STALL RULE. What to do if nothing has moved after fifteen minutes. A specific action, not encouragement. Stopping and recording why is an acceptable action.

6. STOPPING RULE. How I know it is done, plus the one sentence I write down so the next session starts without rereading anything.

Do not motivate me and do not suggest breaks, music or timers.`,
    variables: [
      {
        token: "TASK",
        label: "The work you need to move forward",
        example: "The delivery handbook, which currently has a contents page and one finished chapter.",
      },
      {
        token: "DURATION",
        label: "How long you genuinely have, minus the ragged end",
        example: "Fifty minutes, hard stop at the two o'clock review board",
      },
      {
        token: "STATE",
        label: "Where you left it, in two sentences",
        example:
          "Last time I wrote the escalation paths heading and three bullet points under it, then got pulled away. The bullets are in the wrong order.",
      },
      {
        token: "THREATS",
        label: "Interruptions you can actually name",
        example:
          "Sam usually messages around half past one. The delivery sync sometimes overruns into this slot. Email badge is still on.",
      },
    ],
    expectedOutput:
      "Six labelled parts with an outcome smaller than the task, a first move you could perform without thinking, three named plausible substitutions, one line per threat, and a stall rule that is an action rather than a pep talk.",
    followUps: [
      "Split the task into the four sessions that would finish it, each with its own outcome and handover sentence.",
      "Given what I actually produced, write the handover sentence and the outcome for the next session.",
      "Look at my last five stall records and tell me what these tasks have in common.",
    ],
    pitfalls: [
      "An outcome the same size as the task is the default failure. If the outcome sentence could describe next week too, it has not been shrunk.",
      "Generic distractions in the threats field produce a generic plan. Name the person, the meeting and the notification.",
      "Skipping the handover sentence costs the first ten minutes of every subsequent session, which is more than the sentence would have taken.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Nothing in a session plan tells a model what to do when the work stalls, so it writes encouragement where an action belongs and the session ends with no record of where it stopped. Naming a concrete fallback move, plus a handover sentence written before the timer runs out, is what makes the next session start fast.",
  },

  article: {
    intro: [
      "A focus session prompt is not a timer with encouragement bolted on. What makes it useful is a session that has already settled what it is for, what it refuses to do, and how it ends, because those are the three decisions that get made badly at minute forty.",
      "Blocked out hours fail in the first two minutes or the last ten. The first two because there is no obvious opening action and orienting feels like working. The last ten because nothing was written down, so the next session begins by reconstructing this one from memory.",
      "The format is therefore narrow: one outcome, a literal first move, a short refusal list, a plan for the interruptions you can predict, and a written rule for what happens when the work refuses to move.",
    ],

    sections: [
      {
        heading: "One outcome per focus block",
        body: [
          "One outcome per focus block sounds restrictive and it is the only thing that makes a session checkable afterwards. Two outcomes means neither was really committed to, and the hour ends with both half done, which reads like progress and behaves like nothing.",
          "The outcome also has to be smaller than the task. If the task is the delivery handbook, the outcome is the escalation paths section in a state Sam can react to. Shrinking is the difficult step, and an ai prompt for structuring focused time earns its keep here, because shrinking honestly is hard for the person who wanted the whole thing finished today.",
        ],
      },
      {
        heading: "The first move has to be literal",
        body: [
          "Open the file. Reread the last paragraph you wrote. Type the heading. These feel too small to be worth specifying, and they are exactly the right size, because the gap between sitting down and starting is where most sessions are quietly lost.",
          "Advice on how to plan a deep work block tends to cover environment and duration, which are the easy variables. The hard one is the first ninety seconds, when the work has no momentum and every other task on earth is briefly more appealing than this one.",
        ],
      },
      {
        heading: "Out of scope, named before you start",
        body: [
          "Three things that would feel productive and are not the outcome. Tidying the references, renaming the variables, rereading the brief for a fourth time. All of them are genuine work and none of them is this work.",
          "Naming them in advance is what makes them refusable. An impulse you have not anticipated arrives feeling like an idea. The same impulse with its name already sitting on a list feels like what it is, which is a way of postponing the difficult part of the outcome.",
        ],
        list: [
          "Reorganising the document instead of writing the missing section.",
          "Finding one more source when the argument is already settled.",
          "Fixing the formatting of something still in draft.",
          "Answering a message because the reply will only take a second.",
        ],
      },
      {
        heading: "Predictable interruptions get a plan, not willpower",
        body: [
          "How to avoid distractions while working is largely a prediction problem. You already know which ones are coming: the sync that overruns, the colleague who asks at half past one, the notification badge nobody has turned off in two years.",
          "So the prompt wants one line per named threat, and that line is either prevention or a decision made in advance about how it gets handled. Pre-deciding matters because the expensive part of an interruption is not the interruption, it is choosing whether to take it while holding something complicated in your head.",
        ],
      },
      {
        heading: "Why the focus session prompt insists on a stall rule",
        body: [
          "Fifteen minutes in with nothing moved is a common state and a badly handled one. The usual response is to keep sitting there, because leaving feels like failure and the clock has not run out yet.",
          "The rule is therefore written before the session begins and has to be an action. Deciding what to do when a session stalls while you are calm might produce an instruction to write down the single question that is blocking you and stop. Decided in the moment, the instruction is always to try harder for another forty minutes.",
        ],
      },
    ],

    howTo: {
      name: "How to run the focus session prompt",
      steps: [
        {
          name: "Describe where you left it, not what the task is",
          text: "The state field removes the reorientation tax. Two sentences about the last thing you wrote saves ten minutes of rereading before anything new appears.",
        },
        {
          name: "Give the real duration, including the ragged end",
          text: "A block ending at a hard meeting is shorter than it looks. Say fifty minutes if the final ten will be spent watching the clock.",
        },
        {
          name: "Name the interruptions you can actually name",
          text: "Generic distraction cannot be planned for. Specific threats can: the sync that overruns, the person who always asks at four, the badge on the mail icon.",
        },
        {
          name: "Do the first move before reading the rest",
          text: "Read part two, perform it, then read everything else. Reading the whole plan first is itself a well disguised way of not starting.",
        },
        {
          name: "Write the handover sentence before standing up",
          text: "One line saying where you stopped and what comes next. It costs twenty seconds and buys back the opening ten minutes of the next session.",
        },
        {
          name: "Keep a log of the stalls",
          text: "Any task that triggers the stall rule twice is not a focus problem. It is missing a decision, a piece of information, or a conversation with somebody.",
        },
      ],
    },

    faq: [
      {
        question: "How long should a session actually be?",
        answer:
          "Long enough for the outcome and short enough to defend. Fifty to ninety minutes suits most written or analytical work. Past two hours the outcome usually needs splitting, and the prompt will say so rather than accept a session it does not believe in.",
      },
      {
        question: "Does the focus session prompt work for collaborative work?",
        answer:
          "It works for the part you own. A session with two people needs a shared outcome and a shared stopping rule, which is a different exercise entirely. Run this for your half, then agree the handover sentence with the other person before you both leave.",
      },
      {
        question: "What if the outcome turns out to be wrong halfway through?",
        answer:
          "Stop and rewrite it rather than continuing towards a target you no longer believe in. The stall rule covers the case where nothing moves. A wrong outcome is a different failure, and the honest response is a thirty second reset instead of an hour of drift.",
      },
      {
        question: "Should I use a timer as well?",
        answer:
          "Use one if it helps, although the prompt deliberately never suggests it. Timers manage duration, and this manages the decisions inside the duration. A session with a perfect timer and no stopping rule still ends with nothing written down anywhere.",
      },
      {
        question: "Is the out of scope list just a distraction list?",
        answer:
          "It is narrower and considerably more useful. A distraction is obviously unrelated. These are the plausible substitutions, the work that resembles the outcome without being it, and those are the tasks you would otherwise do all hour in perfectly good conscience.",
      },
      {
        question: "What belongs in the handover sentence?",
        answer:
          "Where you stopped and what the next move is, in that order, on one line. Not a summary of what you did. The next session does not need the history, it needs to know the first thing to type when it sits down.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/time-audit-prompt",
        label: "time audit prompt",
        description:
          "Finds whether your week contains any stretch long enough to hold a session in the first place.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "Books the protected block that this then fills with a single defined outcome.",
      },
      {
        href: "/productivity-prompts/note-summary-prompt",
        label: "note summary prompt",
        description:
          "Turns a pile of handover sentences and stall records into the actions they were pointing at.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "When the same session stalls repeatedly, the missing thing is usually a written process rather than more effort.",
      },
    ],

    externalLinks: [
      {
        href: "https://dl.acm.org/doi/10.1145/2858036.2858570",
        label: "Mark et al: Focused, aroused, but so distractible",
        description:
          "Measured attention span and switching during real workdays, which is the basis for pre-deciding interruptions rather than resisting them.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "Why an instruction phrased as a literal action outperforms an abstract one, which is the reason the first move is specified so narrowly.",
      },
      {
        href: "https://www.nngroup.com/articles/response-times-3-important-limits/",
        label: "Nielsen Norman Group: Three response time limits",
        description:
          "Established thresholds for how quickly attention breaks, supporting the fifteen minute checkpoint used by the stall rule.",
      },
    ],
  },
};

export default meta;

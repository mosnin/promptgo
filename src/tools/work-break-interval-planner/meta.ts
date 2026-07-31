import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "work-break-interval-planner",
  name: "Work Break Interval Planner",
  title: "Work Break Interval Planner",
  category: "productivity-time-tools",
  summary:
    "Works out how many full work intervals actually fit in a session, where the short and long breaks land, and how many minutes are left over, from your own numbers rather than a fixed 25/5 split.",

  seo: {
    primaryKeyword: "work break interval planner",
    keywords: [
      "work break interval planner",
      "free pomodoro timer calculator",
      "pomodoro technique interval calculator",
      "how to plan work break intervals",
      "work session break planner tool",
    ],
    seoTitle: "Work Break Interval Planner: Plan Focus And Break Times",
    seoDescription:
      "A free work break interval planner that works out how many work intervals fit a session, where short and long breaks land, and leftover minutes at the end.",
  },

  fields: [
    {
      kind: "number",
      token: "totalSessionMinutes",
      label: "Total focus session length (minutes)",
      help: "The whole block of time you have available, breaks included.",
      example: 120,
      min: 5,
      max: 720,
      suffix: "min",
    },
    {
      kind: "number",
      token: "workIntervalMinutes",
      label: "Work interval length (minutes)",
      help: "How long one uninterrupted stretch of work lasts.",
      example: 25,
      min: 1,
      max: 180,
      suffix: "min",
    },
    {
      kind: "number",
      token: "shortBreakMinutes",
      label: "Short break length (minutes)",
      help: "Taken after every work interval that is not a long break interval. Use 0 for no short break.",
      example: 5,
      min: 0,
      max: 60,
      suffix: "min",
    },
    {
      kind: "number",
      token: "longBreakEvery",
      label: "Take a long break after this many work intervals",
      help: "For example, 4 means a long break lands after the 4th, 8th and 12th interval.",
      example: 4,
      min: 1,
      max: 20,
    },
    {
      kind: "number",
      token: "longBreakMinutes",
      label: "Long break length (minutes)",
      help: "Taken on the cadence set above instead of a short break. Use 0 for no long break.",
      example: 15,
      min: 0,
      max: 120,
      suffix: "min",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: [
      "A deterministic work and break interval simulation, run forward minute by minute from an elapsed total of zero to the total session length",
    ],
    testingNote:
      "Verified against a set of hand traced session lengths before publishing, including a session that divides evenly with no minutes left over, one that stops in the middle of a work interval, one where a long break lands exactly on the final interval and does not fit, a long break cadence of one so every break is a long one, and both short and long breaks set to zero, each checked against the exact elapsed minute count the simulation should produce.",
  },

  article: {
    intro: [
      "The Pomodoro Technique, developed by Francesco Cirillo in the late 1980s, structures work into short timed intervals separated by breaks, with a longer break after a handful of intervals have been completed. This work break interval planner runs that same structure as arithmetic: enter a total session length, a work interval length, a short break length, how many intervals happen before a long break, and the long break length, and it works out how many full work intervals fit, how many focused and break minutes that adds up to, and how many minutes are left over at the end.",
      "It does not run a clock. Nothing on this page counts down, beeps, or tracks which interval you are on, because a static page cannot reliably keep a timer running once you switch tabs, and a JavaScript interval pretending otherwise would drift or stop the moment the page loses focus. What it produces instead is the plan: the sequence of work and break minutes for a session, worked out once and in full, so you can run it against a phone timer or kitchen timer you already trust.",
    ],

    sections: [
      {
        heading: "How the work break interval planner simulates a session",
        body: [
          "The logic is a single pass forward, not a lookup table or a rounded estimate. Elapsed time starts at zero, and a work interval is added only if the remaining time can hold it in full; a partial interval is never counted as complete. The break that follows is then added only if it also fits, and the moment either does not fit, the simulation stops.",
          "Because the same starting inputs always walk through that same sequence of additions in the same order, the plan for a given set of five numbers is always identical, which is what makes it something you can check by hand once and trust afterward rather than a rough guess.",
        ],
      },
      {
        heading: "Why this is a planner, not a live pomodoro timer app",
        body: [
          "A page that claims to run a countdown needs JavaScript executing accurately in the background and still notify you at the right second, and browsers throttle background timers because they were not built to be trusted with that job.",
          "That is also why this is described as a free pomodoro timer calculator rather than a live timer: it calculates the schedule once, in advance, instead of trying to run one. The actual counting down is left to a phone clock or a kitchen timer, which are built and tested for exactly that job.",
        ],
      },
      {
        heading: "Picking a work interval length that matches the task",
        body: [
          "Twenty five minutes suits tasks with a natural stopping point every few minutes: clearing a queue of short messages, or working through a checklist. A single stretch of writing or debugging often loses more to the restart cost of stopping every 25 minutes than it gains from the break, which is why a 45 to 90 minute interval is common for that kind of work instead.",
          "Treat this as a pomodoro technique interval calculator for testing a few different splits against the actual time you have before you commit a real afternoon to one of them.",
        ],
      },
      {
        heading: "What happens when a break does not fit at the end",
        body: [
          "A session rarely divides evenly. Once the numbers stop dividing cleanly, there are two honest ways to handle the leftover minutes: squeeze in slightly more raw work time, or end the plan as soon as a full interval or its break no longer fits. This planner takes the second option and stops outright the moment either one does not fit, rather than quietly rearranging the plan to use up every remaining minute.",
          "That is the core of how to plan work break intervals against a fixed total: decide in advance whether a session ends on a finished interval or a finished break, instead of discovering it while you are trying to work.",
        ],
      },
      {
        heading: "Setting the long break cadence",
        body: [
          "The long break cadence field counts completed work intervals, not elapsed minutes: a value of 4 means the long break lands after the 4th, 8th and 12th interval, whatever their length. Set it to 1 and every single break becomes a long one, which suits a small number of demanding, widely spaced intervals rather than a long run of short ones.",
          "For most sessions, something between 2 and 6 keeps the long break landing where concentration tends to drop.",
        ],
      },
      {
        heading: "Reading focused minutes, break minutes and leftover minutes",
        body: [
          "The headline is the count of completed work intervals, the number that matters most for judging whether a session was worth the time. Total focused minutes is the count of intervals multiplied by their length, total break minutes is every short and long break actually taken, and leftover minutes is whatever was left unused once neither another interval nor its break would fit.",
          "Use it as a work session break planner tool before a meeting free afternoon or a single long stretch of deep work, whenever it is worth knowing the shape of a day before it starts.",
        ],
      },
    ],

    howTo: {
      name: "How to use the work break interval planner",
      steps: [
        {
          name: "Enter the total session length",
          text: "The whole block of time available, including every break inside it, from 5 minutes up to 720.",
        },
        {
          name: "Set the work interval length",
          text: "How long one uninterrupted stretch of work should last. 25 minutes is the classic Pomodoro length; longer suits work with a real restart cost.",
        },
        {
          name: "Set the short and long break lengths and the cadence",
          text: "Choose how many minutes a normal break takes, how many minutes a long break takes, and after how many work intervals the long break lands. Either break can be set to 0 for no break.",
        },
        {
          name: "Read the result and run it with your own clock",
          text: "The completed interval count, focused minutes, break minutes and leftover minutes update instantly. Follow the plan with a phone timer, since this page does not run one itself.",
        },
      ],
    },

    faq: [
      {
        question: "Does this planner start a countdown timer when I fill in the fields?",
        answer:
          "No. It computes the full session plan the moment the numbers change, but nothing on the page counts down, beeps, or tracks which interval you are on. That is a deliberate limitation of a static page, and the plan it returns is meant to be run against a separate clock or timer app you already trust.",
      },
      {
        question: "Why does the plan sometimes end before using the whole session length?",
        answer:
          "Because the simulation stops the moment a work interval or its break no longer fits, rather than shortening it or skipping to more work. The leftover minutes figure shows how much was left unused by that rule, useful context for extending the session next time.",
      },
      {
        question: "What happens if I set both the short and long break to zero minutes?",
        answer:
          "The planner treats a zero minute break as a real, deliberate choice rather than an error: it still runs the same simulation, it simply adds nothing for every break along the way. The result is a session made of back to back work intervals with no break minutes counted anywhere.",
      },
      {
        question: "How is this different from an actual Pomodoro timer app on my phone?",
        answer:
          "A phone app keeps a real clock running in the background and can notify you at the correct second, which a static web page genuinely cannot do reliably. This tool instead calculates the whole schedule in advance, so you know the shape of a session before you start, then hands the actual counting down to whichever timer you already use.",
      },
      {
        question: "What is a reasonable default work interval length to start from?",
        answer:
          "Twenty five minutes, the length the Pomodoro Technique popularised, suits tasks with natural short breaks built in, such as email or a review queue. For a single piece of continuous work like writing or debugging, a longer interval of 45 to 90 minutes often loses less to restart cost, worth testing against the time you actually have.",
      },
      {
        question: "What does setting the long break cadence to 1 actually do?",
        answer:
          "It makes the long break apply after every single work interval instead of only after every few, since the cadence is checked against the completed interval count and a cadence of 1 always matches. That produces a session of evenly spaced, identically long breaks, suited to a small number of demanding intervals rather than a long run of short ones.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/working-days-calculator",
        label: "working days calculator",
        description: "For planning at the scale of a project, not a single session, once the daily rhythm here is set.",
      },
      {
        href: "/productivity-prompts/focus-session-prompt",
        label: "focus session prompt",
        description: "Shrinks a task down to one outcome and a literal first move for whichever interval this plan sets aside for it.",
      },
      {
        href: "/productivity-prompts/time-audit-prompt",
        label: "time audit prompt",
        description: "For finding out how many real, unclaimed minutes a calendar has before planning a session against them.",
      },
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description: "For deciding what actually earns one of the work intervals this planner lays out.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.pomodorotechnique.com/",
        label: "Pomodoro Technique: official site",
        description: "Francesco Cirillo's own description of the technique this planner's default numbers are drawn from.",
      },
      {
        href: "https://www.cdc.gov/niosh/bulletin/2012/sleep-and-work.html",
        label: "CDC NIOSH: Sleep and Work bulletin",
        description: "Public health guidance that frequent short breaks during demanding work outperform a few longer ones for managing fatigue.",
      },
      {
        href: "https://www.gov.uk/rest-breaks-work",
        label: "GOV.UK: rest breaks at work",
        description: "Official guidance on statutory rest breaks during a working day, the baseline this planner's breaks sit on top of.",
      },
    ],
  },

  tags: ["productivity", "pomodoro", "focus", "breaks", "time management"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

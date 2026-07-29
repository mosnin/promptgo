import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "okr-writing-prompt",
  name: "Key Result Tribunal",
  title: "OKR Writing Prompt",
  category: "business-prompts",
  taskType: "plan",
  summary:
    "Puts every proposed key result on trial against one question, and throws out the ones you could finish while the objective stays untrue.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["okrs", "goals", "planning", "measurement"],

  seo: {
    primaryKeyword: "okr writing prompt",
    keywords: [
      "okr writing prompt",
      "how to write key results that are measurable",
      "ai prompt for quarterly goal setting",
      "difference between a key result and a task",
      "setting a baseline before a target",
      "writing okrs for a small team",
    ],
    seoTitle: "OKR Writing Prompt: Key Results, Not A Task List",
    seoDescription:
      "An okr writing prompt that rejects any key result you could complete while the objective stays false, and demands a baseline, a source and a named reader.",
  },

  prompt: {
    text: `Act as a sceptical reviewer of quarterly goals. Your job is to reject weak key results, not to make my draft sound better. You believe that most teams write a to do list, format it in bold, and call it an OKR set.

MY DRAFT OBJECTIVE: {{OBJECTIVE}}
MY DRAFT KEY RESULTS: {{KEY_RESULTS}}
WHAT MY TEAM ACTUALLY CONTROLS: {{SCOPE}}
NUMBERS I ALREADY MEASURE, AND WHERE THEY LIVE: {{INSTRUMENTS}}
THE QUARTER AND ANY FIXED DATES IN IT: {{PERIOD}}

Step one, judge the objective. It must describe a state of the world at the end of the quarter, not an activity. If it contains a verb like build, launch, improve or drive, rewrite it as the condition that would be true if the work succeeded, and show me both versions.

Step two, run the tribunal on each key result. Ask one question: could we fully complete this and the objective still be untrue? If the answer is yes, label it TASK and move it to a separate delivery list. Shipping a feature, hiring a person, running a campaign and finishing a migration are all tasks. Do not soften this by rewriting a task as a percentage of itself.

Step three, rebuild the survivors into the form: metric, baseline today, target by end of quarter, the system the number is read from, and the named person who reads it. If I gave you no baseline, write BASELINE MISSING and state how to obtain it this week. A target with no baseline is a wish with a decimal point.

Step four, stress the set. Name the cheapest dishonest way to hit each target without achieving the objective, and propose a counterweight metric that would catch it. Then say which key result you would drop if the team lost a third of its capacity, and why that one.

Cap the set at three key results. If my draft has more, tell me which ones you cut and what evidence made them least load bearing.`,
    variables: [
      {
        token: "OBJECTIVE",
        label: "Your draft objective",
        example: "Improve the onboarding experience for new self serve customers",
      },
      {
        token: "KEY_RESULTS",
        label: "Your draft key results",
        example:
          "Ship the new setup wizard, run four customer interviews, reduce support tickets about setup, launch in app guides",
      },
      {
        token: "SCOPE",
        label: "What your team actually controls",
        example: "The signup flow, in product messaging and the help centre. We do not control pricing or the sales handover.",
      },
      {
        token: "INSTRUMENTS",
        label: "Numbers you already measure and where they live",
        example:
          "Activation rate at day seven in Amplitude, ticket volume by tag in Zendesk, time to first successful import in our own logs",
      },
      {
        token: "PERIOD",
        label: "The quarter and any fixed dates in it",
        example: "October to December, with a two week code freeze from 15 December and three people on leave in November",
      },
    ],
    expectedOutput:
      "An objective rewritten as an end state, a clearly separated list of items demoted to tasks with reasons, at most three key results each carrying a baseline, a target, a source system and a named reader, plus a gaming risk and counterweight for each.",
    followUps: [
      "Two of my key results have BASELINE MISSING. Write the exact query or report I need to run this week to fill them.",
      "Assume the code freeze moves two weeks earlier. Which target becomes unreachable, and what is the honest revised number?",
      "Write the one paragraph I read out at the quarterly review explaining why the feature launches are on the delivery list and not in the OKR set.",
    ],
    pitfalls: [
      "The tribunal will demote most of a normal draft, and the reaction is to argue that shipping the thing is the point. It might be. It is still a task, and putting it on the delivery list keeps it visible without pretending it is an outcome.",
      "Counterweight metrics get dropped for being pessimistic. They are the only defence against a team hitting activation targets by loosening the definition of activation.",
      "Feeding it aspirational instruments you do not actually have produces key results nobody can report on. Only list numbers you could pull today.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Every model I tried was happy to accept launch the new wizard as a key result until the completion question was stated as a single yes or no test. Once it was, Claude demoted four of five items in my first real draft and told me the remaining one had no baseline, which was correct and mildly humiliating. Gemini needed the cap on three spelled out twice or it quietly kept a fourth.",
  },

  article: {
    intro: [
      "An okr writing prompt is only useful if it is willing to reject things. Most quarterly goal drafts are a roadmap in disguise, and any model asked to tidy them up will return the same roadmap with better formatting and a percentage sign bolted onto two of the lines.",
      "This one runs a tribunal. Each proposed key result faces a single question, and anything that fails is moved off the OKR set and onto a delivery list where it can still be tracked without pretending to be an outcome.",
      "The second half is arithmetic rather than judgement: no target survives without a baseline, a source system and a person who reads the number. That combination is what makes a goal reportable in week six instead of relitigated in week twelve.",
    ],

    sections: [
      {
        heading: "The test that separates a key result from a task",
        body: [
          "One question does the work: could you fully complete this and the objective still be untrue? Ship the setup wizard passes that test easily, because you can ship a wizard nobody uses. Day seven activation moves from 31 to 45 percent does not, because the objective is the number.",
          "The difference between a key result and a task is not a matter of phrasing, and dressing a task up as a percentage does not convert it. Complete 100 percent of the migration is still the migration. The tribunal is explicit about refusing that move because it is the single most common way a task survives review.",
          "Tasks are not worthless. They are the plan. Keeping them on a separate delivery list means the team can still see what it committed to build, while the OKR set stays about whether the building achieved anything.",
        ],
      },
      {
        heading: "No target without a baseline",
        body: [
          "A target with nothing behind it is unfalsifiable in both directions. Reach 45 percent activation might be an ambitious stretch or a number the team passed last month, and until someone says what today looks like there is no way to tell, which means there is also no way to argue about whether it is the right goal.",
          "Setting a baseline before a target is the cheapest discipline available and the one most often skipped, usually because obtaining the current figure takes an afternoon nobody has. The prompt writes BASELINE MISSING rather than inventing a plausible starting point, and it names the query or report that would fill the gap.",
          "Knowing how to write key results that are measurable comes down to this pair. A metric with a baseline and a target can be checked halfway through the quarter by anyone. A metric with only a target can be checked by nobody until it is too late to change course.",
        ],
      },
      {
        heading: "Where the number comes from, and who reads it",
        body: [
          "Two fields prevent most mid quarter arguments. The first is the source system, because activation measured in the product analytics tool and activation measured in the data warehouse rarely agree, and discovering that in December is expensive. The second is the named reader, the person who pulls the figure and says it out loud.",
          "Unnamed metrics decay. Nobody owns the report, the number stops being quoted, and by the review the team is discussing effort again. An ai prompt for quarterly goal setting that stops at the target has produced something that reads well and reports on nothing.",
          "The okr writing prompt then asks the uncomfortable question: what is the cheapest dishonest route to this target? Activation rates can be raised by narrowing who counts as activated. Naming that in advance and pairing it with a counterweight is considerably less awkward than discovering it in the retrospective.",
        ],
      },
      {
        heading: "Running the okr writing prompt when the team is five people",
        body: [
          "Writing okrs for a small team fails differently from writing them for a department. The risk is not misalignment, it is that three key results plus normal operational load equals a quarter where the goals are ignored from week three, and the team quietly reverts to the ticket queue.",
          "The capacity question in step four exists for this. Asking which key result you would drop if you lost a third of your people forces a ranking before the quarter rather than during it, and small teams lose a third of their capacity routinely, through one resignation, one long illness or one incident that runs for two weeks.",
          "The cap at three is also load bearing here. A five person team with six key results has a wish list, and the honest version is usually one outcome that matters plus a delivery list that is allowed to be long.",
        ],
      },
    ],

    howTo: {
      name: "How to use the okr writing prompt",
      steps: [
        {
          name: "Bring your bad draft, not a clean one",
          text: "The demotions are the output. Pre filtering your own tasks out removes the feedback about which ones you were fooling yourself over.",
        },
        {
          name: "List only instruments that exist today",
          text: "Name the actual tool and the actual metric. A key result pointing at a dashboard somebody intends to build is unreportable for the first half of the quarter.",
        },
        {
          name: "Fill every BASELINE MISSING in week one",
          text: "Treat each as a task with a deadline of the first Friday. A baseline gathered in week five is measured against a quarter already in progress.",
        },
        {
          name: "Publish the delivery list beside the OKRs",
          text: "The demoted items still have to happen. Showing both documents stops people concluding that the roadmap was cancelled.",
        },
      ],
    },

    faq: [
      {
        question: "What if my objective genuinely is to launch something?",
        answer:
          "Then the launch is a milestone on the delivery list and the objective is whatever the launch was meant to change. If nothing measurable was meant to change, that is worth knowing now, because it means the quarter has a deadline rather than a goal.",
      },
      {
        question: "Can a key result be a leading indicator rather than an outcome?",
        answer:
          "Yes, provided it still fails the completion test. Trial to paid conversion is a leading indicator of revenue and remains a genuine key result, because you can do all the planned work and watch the conversion rate stay flat, which is exactly the information you wanted.",
      },
      {
        question: "Is three key results too few for a whole quarter?",
        answer:
          "It usually is exactly right for one objective. If you have six things that all matter equally, you have either two objectives or no priorities, and the second is far more common than teams like to admit when they look at what actually got attention.",
      },
      {
        question: "Should individuals have their own OKRs?",
        answer:
          "Rarely. Outcomes at the level of a single person are usually either tasks in disguise or things that person cannot move alone, and pushing goal setting down to individuals tends to produce the exact task lists this prompt was written to reject.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description:
          "The weekly reporting mechanism that keeps a baseline and target pair visible instead of surfacing it at the quarterly review.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "What to do when a quarter ends and you need to separate the person's contribution from whether the number moved.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "Where a quarterly target becomes the three things you personally do this week, or visibly does not.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.gov.uk/service-manual/measuring-success",
        label: "GOV.UK Service Manual: measuring success",
        description:
          "Public guidance on choosing metrics tied to a service outcome, including why a baseline is collected before a target is set.",
      },
      {
        href: "https://sloanreview.mit.edu/topic/leadership/",
        label: "MIT Sloan Management Review: leadership research",
        description:
          "Institutional source on goal displacement, the effect the counterweight metric in step four is designed to catch.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: prompt engineering overview",
        description:
          "Documents the single criterion classification technique that makes the completion test reliable rather than advisory.",
      },
    ],
  },
};

export default meta;

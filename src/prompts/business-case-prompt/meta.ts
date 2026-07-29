import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "business-case-prompt",
  name: "Funding Case Builder",
  title: "Business Case Prompt",
  category: "business-prompts",
  taskType: "plan",
  summary:
    "Prices the option of doing nothing, puts a named owner behind every cost and every benefit, and writes the conditions for stopping before the money is released.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["finance", "investment", "planning", "governance"],

  seo: {
    primaryKeyword: "business case prompt",
    keywords: [
      "business case prompt",
      "how to build a business case for a budget request",
      "quantifying the cost of doing nothing",
      "naming a budget owner for a proposal",
      "benefit realisation after approval",
      "sensitivity check on business case assumptions",
    ],
    seoTitle: "Business Case Prompt: Cost, Owner And Kill Criteria",
    seoDescription:
      "A business case prompt that prices the do nothing option, attaches a named owner to every cost and benefit, and writes the kill criteria before approval.",
  },

  prompt: {
    text: `You are a finance business partner reviewing a funding request before it reaches an approval committee. You are not the advocate. Your job is to make the numbers survive contact with someone who will subtract them.

WHAT I WANT FUNDED: {{PROPOSAL}}
COSTS I KNOW ABOUT: {{COSTS}}
BENEFITS I EXPECT, AND HOW I WOULD MEASURE THEM: {{BENEFITS}}
WHAT HAPPENS IF THIS IS NOT FUNDED: {{STATUS_QUO}}
WHO HOLDS THE BUDGET AND WHO SIGNS: {{APPROVERS}}
TIME HORIZON THE ORGANISATION USES: {{HORIZON}}

Build the case in this order.

ONE, THE COUNTERFACTUAL, PRICED. Before anything about my proposal, express the current situation as an annual cost using only figures I supplied: staff hours, error rates, licence spend, revenue foregone. Where a cost is real but I gave you no figure, list it as an unpriced consequence with the unit that would measure it. This section leads the document.

TWO, THE COST MODEL. Split one off cost from recurring cost, and split cash spend from internal time. Convert internal time into days rather than money unless I gave you a rate. Attach a named budget holder to every line from the approvers I listed. Any line whose budget holder is unclear is marked UNFUNDED LINE and totalled separately.

THREE, BENEFIT SCHEDULE. Each benefit gets: the metric, the current value, the expected value, the month it starts appearing, the month it reaches full effect, and the person who will report it after go live. Nothing may be described as improved, streamlined or better. If a benefit cannot carry a metric and a person, move it to a list titled claimed but unmeasurable.

FOUR, SENSITIVITY. Take each material assumption in turn, move it 20 percent in the unfavourable direction, and state what happens to the case. Rank the assumptions by how much damage each does. Name the single one that, if wrong, turns this from worthwhile into not worthwhile.

FIVE, KILL CRITERIA. Write three conditions observable within the first two reporting periods that would mean stopping and reclaiming the remaining budget, with the date each is checked and who checks it.

SIX, THE ASK. Amount, budget line, decision date, and the specific consequence of a decision arriving one quarter late.

Use no figure I did not give you. Write [FIGURE NEEDED] instead, and never annualise a single data point as though it were a trend.`,
    variables: [
      {
        token: "PROPOSAL",
        label: "What you want funded",
        example: "Two contract data engineers for six months to replace the nightly spreadsheet reconciliation",
      },
      {
        token: "COSTS",
        label: "Costs you know about",
        example:
          "Contractors at 550 a day each for 120 days, 9k of cloud spend over the period, roughly 15 days of our own lead engineer's time",
      },
      {
        token: "BENEFITS",
        label: "Benefits you expect and how you would measure them",
        example:
          "Finance team currently spends 3 days a month on reconciliation, measured in their timesheets. Month end close would move from day 9 to day 5.",
      },
      {
        token: "STATUS_QUO",
        label: "What happens if this is not funded",
        example:
          "Reconciliation stays manual, two errors reached customer invoices last quarter, one finance analyst has said the task is why they are looking elsewhere",
      },
      {
        token: "APPROVERS",
        label: "Who holds the budget and who signs",
        example: "CFO signs anything over 50k, engineering contractor budget sits with the CTO, cloud spend sits with platform",
      },
      {
        token: "HORIZON",
        label: "Time horizon the organisation uses",
        example: "Three years for capital, twelve months for anything funded from operating budget",
      },
    ],
    expectedOutput:
      "A priced description of the current situation before any mention of the proposal, costs split by type with a named budget holder per line, benefits carrying metrics and dates and owners, a ranked sensitivity table naming the assumption that flips the case, three checkable kill criteria, and a dated ask.",
    followUps: [
      "The CFO will attack the three days a month figure. Show me how the case reads if it is really one and a half days.",
      "Rewrite section one as four sentences I can say verbally, keeping the annual number and the invoice errors.",
      "Two cost lines came back as UNFUNDED LINE. Draft the message that finds out whose budget they belong to without triggering a turf argument.",
    ],
    pitfalls: [
      "The counterfactual section is the one people move to the end because it reads as negative. At the end it is skipped, and the reader then evaluates your cost against zero rather than against the cost they are already paying.",
      "Internal time converted into money inflates every case and everyone knows it. Days are harder to argue with and harder to dismiss.",
      "Kill criteria feel like arguing against yourself. They are the reason a second request from you gets read, because the first one came with a stated way of being wrong.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Forcing the priced counterfactual to lead was the change that got cases approved. When it sat at the end, reviewers compared my number to nothing and the answer was always to wait a quarter. Every model tested will also annualise a single month of data if you let it, so the explicit ban on that is doing real work. Claude was the only one that reliably kept internal time in days rather than converting it to a salary figure I never supplied.",
  },

  article: {
    intro: [
      "A business case prompt that starts with your proposal has already lost the argument. The reader compares the number you are asking for against zero, decides it is a lot of money, and asks whether it could wait until next quarter. It usually can, and it usually does.",
      "This one leads with the price of the current situation. Everything else follows from that comparison: a cost model where every line has a named budget holder, benefits that arrive on dated months with someone assigned to report them, and a sensitivity pass that names the assumption capable of flipping the whole thing.",
      "The last section is the one that makes people uncomfortable. Before any money moves, you write the conditions under which it stops.",
    ],

    sections: [
      {
        heading: "Price the current situation before you mention the proposal",
        body: [
          "Nobody is currently spending nothing. They are spending three finance days a month, two reprocessed invoices a quarter and, in the example above, most of one analyst's willingness to stay. Quantifying the cost of doing nothing turns an unfamiliar request into a comparison between two costs, which is a question a committee knows how to answer.",
          "The business case prompt restricts itself to figures you supplied, and lists everything else as an unpriced consequence with the unit that would measure it. That list is often more persuasive than the priced part, because it is visibly incomplete rather than conveniently rounded.",
        ],
      },
      {
        heading: "Every cost line needs a budget holder",
        body: [
          "Costs do not get approved. Budget holders approve costs, and a proposal that spans three budgets without saying so gets approved in principle and then stalls for six weeks while three people discover the other two exist.",
          "Naming a budget owner for a proposal at the line level surfaces that immediately. Anything without a clear holder is marked as an unfunded line and totalled separately, which is uncomfortable to read and considerably cheaper than finding out in month two.",
          "Internal time stays in days. Converting engineering days into money makes every case look better and makes every reviewer suspicious, because they know the conversion rate was chosen after the answer.",
        ],
      },
      {
        heading: "Benefits arrive in months, not eventually",
        body: [
          "A benefit with no start month is a benefit that never gets checked. The schedule requires the month it begins appearing, the month it reaches full effect, and the person reporting it, which changes how a case is written because ramp up is normally the part quietly omitted.",
          "Benefit realisation after approval is where most funded projects fail invisibly. The money is spent, the thing is built, and nobody ever compares the month nine figure against what the case promised. Assigning a named reporter at the point of approval is the cheapest available fix.",
          "Anything that cannot carry a metric and a person moves to a list called claimed but unmeasurable. Some genuine benefits live there, and putting them in an honest bucket is better than attaching a fabricated number to them.",
        ],
      },
      {
        heading: "Find the assumption that flips the case",
        body: [
          "Moving each assumption 20 percent in the unfavourable direction takes a model that looks robust and shows which single input it actually rests on. It is usually not the one the author expected, and it is almost never the cost estimate.",
          "A sensitivity check on business case assumptions also prepares you for the meeting. The most senior person in the room will attack one number, and knowing in advance which number that should be lets you answer with a range rather than a defence.",
        ],
      },
      {
        heading: "Write the kill criteria while you still want the money",
        body: [
          "Three conditions, observable in the first two reporting periods, that would mean stopping. Each with a date and a checker. This is the section people delete before circulating, on the grounds that it invites rejection.",
          "It has the opposite effect. A case that states how it could be wrong and commits to noticing is treated as an estimate rather than a pitch, and the second request from someone who wrote kill criteria the first time gets a materially easier hearing.",
          "It also protects the team. Without them, a project that is visibly not working continues because stopping requires someone to volunteer for the blame.",
        ],
      },
      {
        heading: "What the business case prompt refuses to calculate",
        body: [
          "No figure appears that you did not supply. The prompt writes [FIGURE NEEDED] instead, and it will not annualise a single month of data as though it were a trend, which is the most common way a modest saving becomes an impressive one.",
          "Learning how to build a business case for a budget request is partly learning that the invented numbers are the ones that get remembered. A figure survives forwarding long after the caveat attached to it has been dropped, and the person who quoted it is you.",
        ],
      },
      {
        heading: "Approval is the beginning of the obligation",
        body: [
          "The ask names the amount, the budget line, the decision date and what a quarter of delay costs. That last clause matters more than the others, because a proposal with no cost of delay is a proposal that can safely be deferred, and deferral is the default outcome of every committee.",
          "After approval the document keeps working. The benefit schedule becomes the reporting calendar, the kill criteria become two diary entries, and the sensitivity ranking tells the team which number to watch first.",
        ],
      },
    ],

    howTo: {
      name: "How to use the business case prompt",
      steps: [
        {
          name: "Collect the current cost first",
          text: "Timesheets, error counts, licence invoices, the reason the last person left. An hour spent here is worth more than any amount of polish on the proposal itself.",
        },
        {
          name: "Separate cash from internal time in your input",
          text: "Give days for people and currency for spend. Mixing them lets the model choose a conversion rate, and it will choose a flattering one.",
        },
        {
          name: "List every approver you can think of",
          text: "The unfunded line output is only as good as this field. A missing budget holder here becomes a stalled approval later.",
        },
        {
          name: "Argue with the sensitivity ranking",
          text: "If the assumption named as decisive surprises you, either the model misread the case or you have been defending the wrong number in your head.",
        },
        {
          name: "Keep the kill criteria in the version you send",
          text: "Removing them is the most tempting edit and the most costly. They are what makes the rest of the document credible.",
        },
        {
          name: "Diarise the benefit reporting dates",
          text: "Put the month each benefit reaches full effect in the calendar of the person named to report it, on the day the funding is granted.",
        },
      ],
    },

    faq: [
      {
        question: "How is this different from a decision memo?",
        answer:
          "A memo forces a choice between options and fits on one page. A funding case argues for money, so it needs a cost model, a benefit schedule with dates and named owners, and a stated way of stopping. Use the memo when the question is which path, and the business case prompt when the question is how much.",
      },
      {
        question: "What if my benefits are genuinely soft?",
        answer:
          "Put them in the claimed but unmeasurable list and say so plainly. Reviewers are far more tolerant of an honest soft benefit than of a hard number they suspect was reverse engineered from the cost, and the honest version does not damage your next case.",
      },
      {
        question: "Should I include a payback period?",
        answer:
          "Only if the organisation asks for one and you have real figures for both sides. A payback calculated from an unpriced counterfactual is arithmetic performed on a guess, and it is the first thing a finance reviewer will test.",
      },
      {
        question: "Who should the named benefit reporter be?",
        answer:
          "Someone who will still be accountable for that number in nine months and who does not report to the person who wrote the case. The finance analyst whose days you claimed to save is usually a better choice than the project sponsor.",
      },
      {
        question: "The committee only wants one slide. What do I send?",
        answer:
          "The priced counterfactual, the total ask, the assumption that flips the case, and the decision date. Keep the full document available, because the questions asked in the room come from the sections you left out of the slide.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For the version of this argument that is about choosing between options rather than releasing money.",
      },
      {
        href: "/business-prompts/vendor-evaluation-prompt",
        label: "vendor evaluation prompt",
        description:
          "When the funded thing is bought rather than built, the scoring and exit cost work belongs beside the cost model.",
      },
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description:
          "The assumptions your sensitivity pass ranks as dangerous are the first entries in the register once the case is approved.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description:
          "The same substitution discipline applied outward, where a buyer is deciding whether your claim could be made by anyone.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.gao.gov/products/gao-20-195g",
        label: "US GAO: Cost Estimating and Assessment Guide",
        description:
          "Primary standard for separating one off from recurring cost and for documenting the basis of every estimate.",
      },
      {
        href: "https://www.gov.uk/government/collections/the-green-book-and-accompanying-guidance-and-documents",
        label: "HM Treasury: The Green Book",
        description:
          "The reference appraisal method that requires a costed do nothing baseline and a sensitivity analysis on key assumptions.",
      },
      {
        href: "https://hbr.org/2014/11/a-refresher-on-net-present-value",
        label: "Harvard Business Review: a refresher on net present value",
        description:
          "Explains why benefits are discounted by the month they arrive, which is what the dated benefit schedule captures.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: prompt engineering guide",
        description:
          "Covers the grounding constraints behind the refusal to supply any figure that was not present in the input.",
      },
    ],
  },
};

export default meta;

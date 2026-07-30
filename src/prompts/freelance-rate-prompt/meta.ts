import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "freelance-rate-prompt",
  name: "Floor Calculator",
  title: "Freelance Rate Prompt",
  category: "career-prompts",
  taskType: "analyse",
  summary:
    "Counts your real billable days, grosses up for tax and costs, and produces a floor day rate with the arithmetic shown, then prices the project in scope units with a written change trigger.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["freelance", "pricing", "self employment", "scope"],

  seo: {
    primaryKeyword: "freelance rate prompt",
    keywords: [
      "freelance rate prompt",
      "how to calculate a freelance day rate",
      "ai prompt for pricing a freelance project",
      "how to calculate billable days per year",
      "what to put in a scope creep clause",
      "how to set a minimum freelance rate",
    ],
    seoTitle: "Freelance Rate Prompt: Build A Floor You Can Defend",
    seoDescription:
      "A freelance rate prompt that counts your real billable days, grosses up for tax and costs, and prices the project in scope units with a written change trigger.",
  },

  prompt: {
    text: `You are pricing my work. You are an accountant, not a coach. You never tell me to value myself more highly.

WHAT I NEED TO EARN IN A YEAR AFTER TAX, AND WHY THAT FIGURE: {{INCOME}}
MY UNBILLABLE TIME IN DAYS PER YEAR: ADMIN, SALES, INVOICING, HOLIDAY, SICKNESS, DEAD WEEKS: {{UNBILLABLE}}
MY ANNUAL BUSINESS COSTS: {{COSTS}}
TAX AND CONTRIBUTIONS I PAY, AS A RATE OR AS AMOUNTS: {{TAX}}
THE PROJECT: DELIVERABLES, EXPECTED REVISIONS, WHO I DEAL WITH, AND THE DEADLINE: {{PROJECT}}
WHAT I HAVE CHARGED BEFORE, AND ANYTHING I KNOW ABOUT THIS CLIENT'S BUDGET: {{HISTORY}}

Show every line of arithmetic.

One. Billable days. Start at 365, subtract weekends, holiday, sickness, admin, sales and dead time. State the result and compare it with the figure people assume.
Two. Required annual revenue: my target income grossed up for tax, plus business costs.
Three. FLOOR DAY RATE, being required revenue divided by billable days. Label it the floor. This is the rate below which working makes me poorer than not working, and it is not a price.
Four. Price this project in scope units rather than hours. List each deliverable, the days it needs, and what is explicitly excluded. Give a total and state how many contingency days sit inside it.
Five. Write the change trigger: the exact conditions under which this quote stops applying, in one sentence a non lawyer would understand, plus the number of revision rounds included and the rate for anything beyond them.

Rules. Never give a number without the calculation behind it. Never round the floor up to sound confident, and never round it down to win the work. If the client's known budget sits below my floor, say so and either name what must come out of scope to fit or tell me to decline. Do not tell me what I am worth, because you cannot know that.`,
    variables: [
      {
        token: "INCOME",
        label: "Target annual income after tax, and why",
        example:
          "32,000 after tax. Rent is 1,150 a month, and I need about 400 a month of slack so a late invoice is not a crisis.",
      },
      {
        token: "UNBILLABLE",
        label: "Unbillable days per year",
        example:
          "104 weekend days, 25 holiday, 5 sick, one admin day a fortnight so 26, roughly 20 days a year chasing and pitching work, and last year about 15 days with nothing booked.",
      },
      {
        token: "COSTS",
        label: "Annual business costs",
        example:
          "Software 900, accountant 700, insurance 300, laptop amortised at 500, coworking 1,800, training 400",
      },
      {
        token: "TAX",
        label: "Tax and contributions",
        example: "Sole trader, roughly 28 percent effective once income tax and national insurance are counted",
      },
      {
        token: "PROJECT",
        label: "The project as deliverables and deadline",
        example:
          "Rewrite 40 pages of product documentation, two rounds of review with the product manager, delivered in markdown, six weeks, they want a style guide as well but have not said so in writing.",
      },
      {
        token: "HISTORY",
        label: "Your past rates and their budget",
        example:
          "Charged 350 a day on the last two jobs. This client mentioned an approved budget of 8,000 but was vague about whether that includes the style guide.",
      },
    ],
    expectedOutput:
      "A visible billable day count, a grossed up revenue figure, a floor day rate labelled as a floor, a project price broken into deliverables with exclusions and contingency, and a written change trigger with revision rounds.",
    followUps: [
      "The style guide is now confirmed as in scope. Reprice it and tell me what else has to move to hold the deadline.",
      "They came back at 6,500. Show me the version of the scope that fits, and the version I should decline.",
      "Turn the change trigger into two sentences I can put in the email, without legal language.",
    ],
    pitfalls: [
      "Guessing your unbillable days upward feels prudent and produces a floor you will undercut on the first quote. Count last year properly, including the weeks with nothing booked.",
      "Quoting the floor as the price is the mistake this is meant to prevent. The floor is where you stop, not where you start, and every project priced at the floor leaves nothing for the ones that overrun.",
      "A quote with no change trigger becomes a monthly argument. The client is not being difficult; nobody wrote down where the work ended.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Asked for a rate, models return a market range and a paragraph about positioning, which gives a freelancer nothing to act on. Putting the billable day subtraction first changes the arithmetic, since holidays, admin and unpaid pitching remove a large share of a year that most people never deduct. GPT-5.2 rounds the resulting floor to a tidy figure unless forbidden, and Claude Opus 4.5 is readier to recommend declining the work.",
  },

  article: {
    intro: [
      "A freelance rate prompt that returns a number you feel good about has done the opposite of its job. The number that matters is the one below which the work costs you money, and it is produced by arithmetic rather than by positioning.",
      "Most people arrive at a day rate by comparison: something someone else charges, a forum post, a client who once said yes without flinching. None of that accounts for your costs, your tax, or the weeks nobody hires you.",
      "The prompt below builds the floor from the bottom, shows every subtraction, and then prices the actual project separately, because a floor and a price are different objects that get confused constantly.",
    ],

    sections: [
      {
        heading: "A rate is arithmetic before it is confidence",
        body: [
          "How to calculate a freelance day rate comes down to a short sum nobody enjoys doing. Target income, grossed up for tax, plus the annual cost of running the business, divided by the days you can actually sell.",
          "The reason it gets skipped is that the answer is usually higher than the rate you are currently charging, and the gap is uncomfortable. Advice to charge what you are worth avoids that discomfort by replacing the calculation with an attitude.",
          "Every line stays visible in the output for the same reason: a number you can reconstruct is one you can defend, and one you cannot is one you will discount under mild pressure.",
        ],
      },
      {
        heading: "Billable days are fewer than you think",
        body: [
          "The single biggest error in freelance pricing is the denominator. People divide by something close to 220 working days, which quietly assumes that every non holiday weekday is sold.",
          "How to calculate billable days per year starts by taking out weekends, holiday, sickness, invoicing, chasing, pitching and the weeks with nothing booked. A hundred and seventy is common. A hundred and fifty is not unusual in the first two years.",
          "Dividing the same revenue by 172 rather than 220 raises the floor by roughly a quarter, which is how a busy year finishes short.",
        ],
      },
      {
        heading: "The freelance rate prompt produces a floor, not a target",
        body: [
          "The freelance rate prompt labels its output a floor deliberately. It answers how to set a minimum freelance rate, the point at which accepting work leaves you worse off than leaving the week empty, and it is not the price you quote.",
          "Quoting at the floor is a slow failure. It leaves nothing for the projects that overrun, no margin for the client who pays sixty days late, and no capacity for the unbilled work that keeps the business running. The floor is a boundary, and prices sit above boundaries.",
          "Knowing exactly where the boundary sits changes how negotiations feel, since a discount request is easy to answer once you can see it lands under that point.",
        ],
      },
      {
        heading: "Pricing the project, not the hours",
        body: [
          "Once the floor exists, the project is priced in scope units: this deliverable takes four days, this one two, these three excluded. An ai prompt for pricing a freelance project that returns an hourly figure hands the client a meter to watch and gives you a reason to work slowly.",
          "Exclusions carry as much weight as inclusions. The style guide nobody wrote down, the stakeholder who appears in week three, the migration of old content: naming these as excluded costs one line and prevents a client being genuinely surprised.",
          "Contingency is stated rather than hidden. Two of fourteen days named as contingency survives scrutiny better than a padded estimate a client can sense.",
        ],
      },
      {
        heading: "Scope creep is a definitions problem",
        body: [
          "Most creep is not opportunism. It is two people holding different pictures of the work, discovering the gap gradually with nothing written down to check against.",
          "Knowing what to put in a scope creep clause does not require legal language. One sentence naming what changes the price, plus the number of revision rounds included and the day rate beyond them, covers the overwhelming majority of disputes.",
          "The revision count is the part people leave out, and the part that consumes the margin. Two rounds means two; a third is chargeable at the stated rate, an easier conversation in advance than in week seven.",
        ],
      },
      {
        heading: "What to say when the number lands badly",
        body: [
          "Sometimes the client budget sits below the floor. The freelance rate prompt says so plainly and offers two routes: remove scope until the work fits the money, or decline.",
          "Declining is a real option, priced into the model. A week spent below your floor is a week unavailable for work above it, and freelancers who take everything spend good years fully occupied and barely solvent.",
          "Reducing scope is the better conversation where possible, since it keeps the rate intact and makes the trade explicit: twenty five pages instead of forty, one review round instead of two, no style guide. Same rate, less work, a client who can see what their budget bought.",
        ],
      },
    ],

    table: {
      caption: "The floor calculation, line by line",
      headers: ["Line", "What goes in", "Common error"],
      rows: [
        ["Target income", "What you need after tax, with slack", "Setting it at survival level"],
        ["Gross up", "Income tax and contributions", "Forgetting it entirely until January"],
        ["Business costs", "Software, insurance, accountant, space", "Counting only the obvious ones"],
        ["Billable days", "365 less weekends, leave, admin, sales, dead weeks", "Dividing by 220"],
        ["Floor rate", "Required revenue divided by billable days", "Treating the floor as the price"],
      ],
    },

    howTo: {
      name: "How to use the freelance rate prompt",
      steps: [
        {
          name: "Count last year rather than estimating",
          text: "Open the calendar and count the days you actually billed. This one input moves the floor more than anything else in the calculation.",
        },
        {
          name: "Put the honest income number in",
          text: "Including the slack that stops a late invoice becoming a crisis. A floor built on a survival figure is a floor you will resent.",
        },
        {
          name: "Read the floor, then set your price above it",
          text: "The gap between the two is your margin for overruns, late payers and the quiet month. Decide it deliberately rather than discovering it.",
        },
        {
          name: "Write the exclusions before the price",
          text: "What is not included shapes the day count. Listing exclusions first usually removes two days of assumed work nobody had agreed to.",
        },
        {
          name: "Send the change trigger with the quote",
          text: "One sentence in the same email. Introducing it later, once the work has already expanded, reads as a renegotiation.",
        },
        {
          name: "Recalculate when anything structural changes",
          text: "New costs, a changed tax position, a year with more dead weeks. The floor is not permanent, and treating it as one is how rates fall behind.",
        },
      ],
    },

    faq: [
      {
        question: "Should I quote a day rate or a project price?",
        answer:
          "Project price for defined work, with the day rate held in reserve for anything beyond scope. A project price rewards you for working efficiently, while an hourly or daily quote invites a client to audit your speed and quietly penalises experience.",
      },
      {
        question: "What if my floor is above the market rate?",
        answer:
          "Then one of three things is true: costs are high, billable days are low, or the work genuinely does not pay what you need. All three are worth knowing, and none is solved by charging below the floor while hoping volume covers the difference.",
      },
      {
        question: "How much contingency should sit in a quote?",
        answer:
          "Around fifteen percent for familiar work and considerably more for a new client or a system you have not seen. State it as contingency rather than hiding it inside the estimates, which holds up better under questioning.",
      },
      {
        question: "Is it worth telling a client my rate is a floor?",
        answer:
          "No. The floor is an internal figure and describing your pricing as barely viable invites a client to test it. What the calculation gives you is the ability to hold a number calmly, which reads externally as confidence without any of it being performed.",
      },
      {
        question: "How do I handle a long standing client below my new floor?",
        answer:
          "Give notice rather than an ultimatum. A rate change effective from the next project, mentioned two months ahead with the reason stated as costs rather than as worth, is accepted far more often than freelancers expect, and the ones who refuse were the least profitable anyway.",
      },
      {
        question: "Does this work for retainers?",
        answer:
          "Yes, with one addition: decide what the retainer buys, days or availability. A retainer priced as days is straightforward arithmetic. One priced as availability must include the cost of work turned down to stay free, which is the part usually forgotten.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description:
          "The employment version of the same discipline, where the numbers come from a market band rather than from your own costs.",
      },
      {
        href: "/career-prompts/portfolio-description-prompt",
        label: "portfolio description prompt",
        description:
          "What justifies sitting well above the floor: entries that show decisions rather than deliverables.",
      },
      {
        href: "/career-prompts/networking-message-prompt",
        label: "networking message prompt",
        description:
          "How the pipeline gets filled, which is what turns dead weeks back into billable ones.",
      },
      {
        href: "/business-prompts/job-description-prompt",
        label: "job description prompt",
        description:
          "Useful for writing scope, since the same discipline of naming what is and is not included applies to a quote.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center",
        label: "IRS: Self employed individuals tax center",
        description:
          "The primary source on self employment tax obligations, which is what the gross up line in the calculation accounts for.",
      },
      {
        href: "https://www.gov.uk/working-for-yourself",
        label: "GOV.UK: Working for yourself",
        description:
          "UK government guidance on operating as a sole trader, cited for the allowable business costs that belong in the annual figure.",
      },
      {
        href: "https://www.freelancersunion.org/",
        label: "Freelancers Union",
        description:
          "A membership body publishing contract and late payment guidance, the basis for treating a written change trigger as standard practice.",
      },
    ],
  },
};

export default meta;

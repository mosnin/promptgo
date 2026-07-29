import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "renewal-conversation-prompt",
  name: "Renewal Planner",
  title: "Renewal Conversation Prompt",
  category: "sales-prompts",
  taskType: "plan",
  summary:
    "Grades four churn signals against what was promised at signing, then either builds the renewal call or tells you the account is not ready for one.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["renewals", "retention", "customer success", "account management"],

  seo: {
    primaryKeyword: "renewal conversation prompt",
    keywords: [
      "renewal conversation prompt",
      "how to prepare for a renewal call",
      "churn signals to check before a renewal",
      "renewal talk track when usage has dropped",
      "ai prompt for customer retention conversations",
      "asking for a renewal without leading with price",
    ],
    seoTitle: "Renewal Conversation Prompt: Check Before You Ask",
    seoDescription:
      "A renewal conversation prompt that grades usage, champion continuity, open issues and silence, then blocks the commercial ask when two signals are red.",
  },

  prompt: {
    text: `You are a retention lead preparing an account owner for a renewal conversation. You are sceptical by default and you never let a commercial ask go out ahead of the evidence.

WHAT WE PROMISED AT SIGNING: {{PROMISE}}
USAGE PICTURE NOW: {{USAGE}}
PEOPLE AND CHAMPION STATUS: {{PEOPLE}}
OPEN ISSUES AND TICKET TONE: {{ISSUES}}
COMMERCIAL POSITION: {{COMMERCIALS}}

STAGE ONE. Grade four signals as GREEN, AMBER or RED, quoting the specific evidence for each and writing UNKNOWN where I gave you nothing:
1. Usage trend against the promise, not against last month.
2. Champion continuity, including anyone who has changed role or left.
3. Unresolved issues, weighted by age rather than severity.
4. Engagement silence, meaning how long since they initiated contact with us.

STAGE TWO. Give a verdict of OPEN THE RENEWAL, REPAIR FIRST or ESCALATE. Two or more RED signals forces REPAIR FIRST. Two or more UNKNOWN forces ESCALATE, because we do not know this account.

STAGE THREE. If the verdict is REPAIR FIRST, output a repair agenda only, and do not write a single line about price, term or uplift.

If the verdict is OPEN THE RENEWAL, output: an opening paragraph that states what we promised and what measurably happened, using their numbers; the three questions I ask before any commercial discussion; the expansion topic I am parking until a second call, with the reason; and one pre decided concession with the thing I ask for in exchange.

STAGE FOUR, always. List every claim in the above that my inputs do not actually support, under the heading CANNOT EVIDENCE.`,
    variables: [
      {
        token: "PROMISE",
        label: "What was sold at signing",
        example:
          "Cut invoice approval time from 5 days to under 2 and give finance self serve reporting without IT tickets",
      },
      {
        token: "USAGE",
        label: "What the product data shows",
        example:
          "Approvals averaging 2.4 days, down from 5. Reporting module used by 3 of 22 licensed finance users, flat since March",
      },
      {
        token: "PEOPLE",
        label: "Stakeholders and any changes",
        example:
          "Original champion moved to a group role in April. Her replacement has attended one call and did not sign off the last QBR",
      },
      {
        token: "ISSUES",
        label: "Open tickets and their tone",
        example:
          "Two open tickets, one about SSO timeouts open 11 weeks, tone has moved from patient to terse in the last three replies",
      },
      {
        token: "COMMERCIALS",
        label: "Price, term and what you want",
        example: "42k annual, expires 30 September, we want a 9 percent uplift and a two year term",
      },
    ],
    expectedOutput:
      "Four graded signals each quoting its evidence, a verdict that follows the stated rules, either a repair agenda or a full call plan with parked expansion and one pre decided trade, and a closing list of everything the inputs did not actually support.",
    followUps: [
      "Write the repair agenda as a message to the new champion who has never met us, assuming she has no history with the original promise.",
      "Rehearse the moment they open with a demand for a discount before I have said anything. Give me the first two sentences only.",
      "Turn the CANNOT EVIDENCE list into the four questions I should answer internally before the call.",
    ],
    pitfalls: [
      "People fill the promise field with the marketing pitch rather than the specific commitment made in the room. The whole grading then floats free of anything the customer would recognise.",
      "Grading usage against last month rather than against the promise produces cheerful amber where the honest answer is red. The instruction says so explicitly and models still drift back.",
      "An account that has gone quiet reads as low maintenance. It is the signal most often marked green by hand and most often red by the time the renewal date arrives.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "The UNKNOWN grade came out of testing rather than design. Given a blank people field, all three models simply graded champion continuity green and moved on, which is the exact error that loses accounts after a reorganisation. Forcing UNKNOWN and making two of them trigger an escalation turned a silent assumption into a visible gap.",
  },

  article: {
    intro: [
      "A renewal conversation prompt has one job that matters more than the wording it produces, which is telling you when not to have the conversation yet. Most renewals are decided weeks before the call, by things that were visible in the account data and that nobody looked at until the date got close.",
      "Guides on how to prepare for a renewal call usually start from the commercial ask: the uplift you want, the term you want, the discount you are willing to trade. That is the last part of the preparation, not the first, and starting there is how a renewal turns into a price negotiation you did not need to have.",
      "This one grades four signals first, produces a verdict, and blocks the commercial output entirely when the evidence says the account is not ready to be asked.",
    ],

    sections: [
      {
        heading: "What was promised at signing is the only baseline",
        body: [
          "Every account looks acceptable when measured against last quarter. Measured against what someone told the customer would happen when they bought, a good number of them look thin, and the customer has been quietly doing that comparison all year.",
          "Asking for a renewal without leading with price requires you to have something else to open with, and the promise is it. Stating what was committed and what actually happened, in the customer's own numbers, puts the conversation on ground where you either have a case or you find out early that you do not.",
        ],
      },
      {
        heading: "Four signals, graded before anything else",
        body: [
          "The churn signals to check before a renewal are not mysterious, and the reason they get missed is that each one individually looks survivable. Usage flat but not falling. A champion who moved sideways. A ticket that has been open a while. Nobody has called in a couple of months.",
          "Graded together with evidence attached, the same four facts read as an account that has quietly stopped depending on you. The grading is deliberately mechanical so that your relationship with the customer, which is the least reliable instrument you own, does not get a vote.",
        ],
        list: [
          "Usage measured against the promise, because against last month almost everything looks stable.",
          "Champion continuity, since a role change resets every piece of context you built.",
          "Open issues weighted by age, because an eleven week ticket says more than a severe one closed in a day.",
          "Silence, meaning how long since they contacted you first rather than replied.",
        ],
      },
      {
        heading: "When the renewal conversation prompt tells you not to ask yet",
        body: [
          "Two red signals produce a repair verdict, and the output then contains no price, no term and no uplift at all. This is the constraint people argue with and it is the one worth keeping, because a commercial ask into a damaged account converts a retention problem into a negotiation problem while the original issue stays unfixed.",
          "A renewal talk track when usage has dropped has to earn the right to reach the commercials, which usually takes a separate meeting and something visibly repaired between the two. The repair agenda is short on purpose: fix one thing the customer can see, then come back.",
        ],
      },
      {
        heading: "Champion turnover rewrites the whole call",
        body: [
          "When the person who bought has gone, you are not renewing. You are selling to someone who inherited a contract they did not choose and who is measured on decisions they make, not on decisions their predecessor made. Continuing the old conversation with a new person is the most common way a healthy account is lost.",
          "The grading treats a role change as seriously as a departure, which surprises people. Someone promoted into a group function still has a successor who owes you nothing, and the successor is who signs.",
        ],
      },
      {
        heading: "Parking the expansion, deliberately",
        body: [
          "Renewal and expansion feel efficient to combine and almost never are. Attaching a bigger number to a conversation about whether the current number was worth it invites the customer to reopen the original decision, and you end up defending both.",
          "The renewal conversation prompt names the expansion topic and states that it is parked, which is different from forgetting it. You keep the plan and you keep it out of the first conversation, where its only effect would be to make the renewal harder.",
        ],
      },
    ],

    table: {
      caption: "How each signal is graded",
      headers: ["Signal", "Green looks like", "Red looks like"],
      rows: [
        ["Usage against promise", "The committed outcome is measurably happening", "The headline promise is unmet or unmeasured"],
        ["Champion continuity", "Same buyer, still engaged, still sponsoring", "Buyer moved, left, or has a successor you have not met"],
        ["Open issues", "Nothing older than a fortnight", "Anything unresolved past two months, whatever the severity"],
        ["Silence", "They initiate contact most months", "You have started every conversation this quarter"],
      ],
    },

    howTo: {
      name: "How to prepare the renewal",
      steps: [
        {
          name: "Find the original commitment",
          text: "Dig out the proposal or the signing email and quote the specific outcome that was promised. Not the pitch deck, the sentence someone actually agreed to.",
        },
        {
          name: "Fill the four inputs honestly, including the blanks",
          text: "Leave a field empty rather than guessing. An UNKNOWN grade is information, and a fabricated green is how accounts get lost quietly.",
        },
        {
          name: "Act on the verdict rather than negotiating with it",
          text: "If it says repair first, book the repair meeting. The renewal date does not move, but the order of the two conversations is entirely within your control.",
        },
      ],
    },

    faq: [
      {
        question: "What if the renewal date is next week and the verdict says repair first?",
        answer:
          "Then you run both, in the right order, compressed. A short call that names the unmet promise and commits to a fix, followed by the commercial conversation once something has visibly changed. Compressing the sequence is survivable, inverting it is not.",
      },
      {
        question: "Is this ai prompt for customer retention conversations useful outside software subscriptions?",
        answer:
          "The four signals were chosen for recurring software, but three of them transfer to any renewing contract. Usage becomes consumption or attendance, champion continuity is identical everywhere, and silence works unchanged. Only the open issues signal needs rewriting around whatever your service equivalent of a ticket is.",
      },
      {
        question: "Why does the renewal conversation prompt list things it cannot evidence?",
        answer:
          "Because the plan will read as confident whether or not the inputs justified it, and you are the one who has to say the sentences out loud. The closing list shows you which of them you would be improvising, so you can go and check before the customer does.",
      },
      {
        question: "Should the customer success owner or the account owner run this?",
        answer:
          "Whoever has access to the usage data should fill the inputs, and whoever holds the commercial relationship should read the verdict. Splitting it that way tends to produce honest grading, because the person supplying the evidence has no target riding on the outcome.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description:
          "Where the second conversation goes once the verdict is green and the customer opens with a demand for a discount.",
      },
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description:
          "For recording what the customer actually committed to on the renewal call, separately from what they seemed positive about.",
      },
      {
        href: "/sales-prompts/referral-request-prompt",
        label: "referral request prompt",
        description:
          "A renewal that went through with no friction is one of the few proof moments strong enough to justify asking for an introduction.",
      },
      {
        href: "/data-analysis-prompts/survey-analysis-prompt",
        label: "survey analysis prompt",
        description:
          "Turns account health survey responses into something you can quote in the usage signal rather than summarising by feel.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2002/07/the-mismanagement-of-customer-loyalty",
        label: "Harvard Business Review: The mismanagement of customer loyalty",
        description:
          "The source for treating tenure and warmth as poor predictors of retention, which is why the grading ignores relationship quality.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the staged reasoning and conditional output structure that lets the verdict suppress the commercial section entirely.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Prompting strategies",
        description:
          "Primary reference for the explicit unknown handling that produces an escalation rather than a confident guess on missing inputs.",
      },
    ],
  },
};

export default meta;

import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "win-back-campaign-prompt",
  name: "Lapsed Customer Writer",
  title: "Win Back Campaign Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Writes to a lapsed customer using the actual reason they likely left, and if that reason is genuinely unknown, asks instead of inventing one.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["retention", "email", "reactivation", "churn"],

  seo: {
    primaryKeyword: "win back campaign prompt",
    keywords: [
      "win back campaign prompt",
      "how to write a win back email to a lapsed customer",
      "ai prompt for lapsed customer email",
      "how to avoid a generic we miss you email",
      "how to reactivate lapsed customers with email",
      "chatgpt prompt for customer reactivation campaign",
    ],
    seoTitle: "Win Back Campaign Prompt: Write To The Real Reason",
    seoDescription:
      "A win back campaign prompt that writes to the actual reason a customer left, and asks rather than guesses when the reason is genuinely unknown.",
  },

  prompt: {
    text: `You are a retention copywriter writing a win back email to one lapsed customer. You know that a generic "we miss you" message performs badly because it ignores whatever actually happened, and that guessing a reason you were not given is worse than admitting you do not know one.

CUSTOMER: {{CUSTOMER_NAME}}
WHAT THEY BOUGHT AND HOW LONG THEY WERE ACTIVE: {{RELATIONSHIP_SUMMARY}}
WHY THEY LIKELY LEFT: {{CHURN_REASON}}
WHAT YOU CAN OFFER TO ADDRESS IT: {{OFFER}}
BRAND VOICE: {{TONE}}

Write one win back email of 120 to 180 words plus a subject line.

If CHURN_REASON names a specific cause such as a price complaint, an unresolved support issue, or a switch to a named competitor, address that cause directly and specifically in the second sentence, before anything else. Do not open with an apology that names no cause.

If CHURN_REASON is "unknown" or similarly unspecified, do not invent a reason. Write an email that asks a short, specific, low effort question about what changed, and make the ask the point of the email rather than a courtesy line at the end. Do not offer a discount as a substitute for asking.

Output the subject line, then the email body, then one sentence stating which of the two modes above you used and why, so I can check the reasoning against the input I gave you.`,
    variables: [
      {
        token: "CUSTOMER_NAME",
        label: "Customer's first name",
        example: "Priya",
      },
      {
        token: "RELATIONSHIP_SUMMARY",
        label: "What they bought and how long they were active",
        example: "Monthly subscription to the analytics plan, active for fourteen months, lapsed nine weeks ago",
      },
      {
        token: "CHURN_REASON",
        label: "Why they likely left, or 'unknown' if genuinely not known",
        example: "Two support tickets about slow report exports went unanswered for five days each",
      },
      {
        token: "OFFER",
        label: "What you can offer to address the reason, if anything",
        example: "A direct line to a senior support engineer and a fixed export bug they reported",
      },
      {
        token: "TONE",
        label: "Brand voice",
        example: "Plain and a little apologetic, no exclamation marks",
      },
    ],
    expectedOutput:
      "A subject line and a short email that either names the specific reason the customer left and addresses it directly, or, when the reason is unknown, asks a concrete question instead of guessing, plus a one line note on which mode was used and why.",
    followUps: [
      "Here are the churn reasons for six accounts, three known and three unknown. Write all six and keep the two modes clearly distinct.",
      "Rewrite this one assuming the offer is a price reduction rather than a fixed bug, and check whether it still reads as addressing the actual complaint.",
      "The customer replied to the unknown mode email and gave a reason. Write the follow up that responds to what they actually said.",
    ],
    pitfalls: [
      "Leaving CHURN_REASON as 'probably price' when nobody actually said that produces a confident, specific sounding email built on a guess, which reads worse than a generic one if the guess is wrong.",
      "Feeding in a real reason but writing a generic 'we miss you' opener anyway wastes the one piece of information that would have made the email work.",
      "Offering a discount in the unknown reason mode turns a genuine question into a transaction, and most people who were asked and then discounted at will not answer honestly.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked to write a win back email without a stated reason will still produce one, usually price, because a specific sounding cause reads as more competent than an open question. Splitting the prompt into two explicit modes, addressing a given reason or asking when there is none, is what stops a guess being presented as a finding.",
  },

  article: {
    intro: [
      "A win back campaign prompt that opens with 'we miss you' is answering a question nobody asked. The customer already knows the relationship lapsed. What they do not know is whether you noticed why, and a message that skips straight to a discount code reads as though you did not.",
      "This prompt writes to the actual reason a customer left when you have one, whether that is a price complaint, an unresolved support issue, or a switch to a named competitor, and it addresses that reason specifically rather than around it. When the reason is genuinely unknown, it does not invent one. It asks, briefly and specifically, and treats the answer as more valuable than the sale.",
    ],

    sections: [
      {
        heading: "What a win back campaign prompt should do differently",
        body: [
          "A win back campaign prompt has to say something the customer could not have predicted before opening the email. 'We miss you' is predictable. So is a flat percentage off. Neither responds to anything specific about that account, which is exactly what a lapsed customer notices, because they are the one person who knows precisely why they stopped.",
          "Knowing how to avoid a generic we miss you email starts with treating the reason for churn as an input rather than an afterthought. The generic version is not lazy by accident. It is the safe default when nobody ever recorded why the account actually went quiet, and the prompt closes that gap by requiring the reason before it writes a word.",
        ],
      },
      {
        heading: "A price complaint gets a different email than a support failure",
        body: [
          "How to write a win back email to a lapsed customer changes completely depending on what actually happened. A price objection wants acknowledgement and, if you have one, a concrete change: a lower tier, a longer trial, a fixed cost that was previously usage based. A support failure wants something closer to an apology with a name attached, since the customer's complaint was about being ignored, not about being asked to pay again.",
          "The prompt forces the specific cause into the second sentence, before any offer appears. An email that leads with 20% off in response to a support complaint tells the customer their ticket was translated into a coupon, which is roughly the experience that made them leave.",
        ],
        list: [
          "Price complaint: acknowledge the cost concern directly, then offer a concrete change, not just a discount.",
          "Support issue: name what went wrong and what was fixed, before anything resembling a sales pitch.",
          "Competitor switch: be honest about what changed on your side rather than badmouthing the competitor.",
          "Feature gap: confirm plainly whether the gap has closed, since a vague 'we've made improvements' invites the same disappointment twice.",
        ],
      },
      {
        heading: "A competitor switch needs honesty, not a discount race",
        body: [
          "When CHURN_REASON names a competitor, the temptation is to answer with a lower price, which starts a race that ends with both companies worse off and the customer trained to wait for the next one. The prompt instead asks what changed on your side since they left, since a customer who switched for a specific feature or a specific price point is not won back by a coupon that ignores the actual gap.",
          "This is where an ai prompt for lapsed customer email earns its keep over a template, because the honest answer is different for every account and a template cannot hold that variance.",
        ],
      },
      {
        heading: "When the reason is genuinely unknown",
        body: [
          "Most churn is unrecorded. The account went quiet, nobody asked why, and by the time someone writes the win back email the actual cause is gone. Guessing at that point produces a confident sounding email built on nothing, and a wrong guess reads worse to the customer than an honest question would have.",
          "Set CHURN_REASON to unknown and the prompt switches modes entirely. It writes a short, specific question instead of a statement, and it is instructed not to soften that question with a discount, because an offer changes what the customer is actually responding to. How to reactivate lapsed customers with email, in the unknown case, starts with finding out what happened before trying to fix it.",
        ],
      },
      {
        heading: "One offer, tied to the reason",
        body: [
          "The OFFER field only does work when it answers the stated reason. A fixed export bug answers a support complaint. A lower tier answers a price complaint. A generic percentage off answers nothing in particular, which is why the prompt treats the offer as optional rather than mandatory, and drops it entirely in the unknown reason mode.",
          "A chatgpt prompt for customer reactivation campaign that always includes a discount teaches the list to wait for one, whether or not the underlying problem was ever addressed. Tying the offer to the reason, or withholding it when there is no reason to tie it to, keeps the email honest about what is actually being fixed.",
        ],
      },
    ],

    howTo: {
      name: "How to use the win back campaign prompt",
      steps: [
        {
          name: "Pull the real reason before you write anything",
          text: "Check support tickets, cancellation surveys or account notes for what the customer actually said. Set CHURN_REASON to unknown rather than a guess if nothing specific exists.",
        },
        {
          name: "Match the offer to the reason, or drop it",
          text: "A support fix, a pricing change or nothing at all. An offer that does not respond to the stated reason reads as a distraction from it.",
        },
        {
          name: "Run it once for a known reason and once for unknown",
          text: "Compare the two outputs before sending either. The unknown mode should read as a genuine question, not a discount with a question mark added.",
        },
        {
          name: "Segment the list by reason before generating",
          text: "A batch where every account shares one CHURN_REASON produces emails you can sanity check together, rather than one at a time.",
        },
        {
          name: "Read the mode note before sending",
          text: "The prompt states which mode it used and why. If that does not match what you intended, the input was ambiguous and needs tightening, not the output.",
        },
      ],
    },

    faq: [
      {
        question: "What is a win back campaign prompt for, exactly?",
        answer:
          "It generates the individual email in a win back campaign, written to address the specific reason one customer lapsed rather than a single message sent to the whole list. The campaign is the segmentation and the send; the prompt is what makes each email specific instead of interchangeable.",
      },
      {
        question: "I do not know why most of my lapsed customers left. Is this still useful?",
        answer:
          "Yes. Setting the reason to unknown switches the prompt into asking mode rather than guessing mode, which is usually the more honest and more effective email anyway. A specific question gets replies that a generic message never would, and those replies become real reasons for the next round.",
      },
      {
        question: "Should the win back email always include a discount?",
        answer:
          "No. A discount only makes sense when it responds to the stated reason, typically a price complaint. Attaching one to a support failure or an unknown reason turns the message into a transaction and tends to depress reply rates on the question you actually needed answered.",
      },
      {
        question: "How is this different from a normal reactivation email template?",
        answer:
          "A template is fixed copy with a name merged in. This prompt takes the actual churn reason as an input and changes the entire structure of the email around it, including switching to a question rather than a statement when no reason is known, which a static template cannot do.",
      },
      {
        question: "Can I use this for a competitor who undercut us on price?",
        answer:
          "Yes, and the prompt is instructed to respond with an honest account of what changed rather than immediately matching or beating the competitor's price. A discount race rarely wins a customer back permanently, while addressing the actual gap they switched for sometimes does.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/win-loss-analysis-prompt",
        label: "win loss analysis prompt",
        description:
          "Finds the real reason a deal or a customer relationship turned before you try to write the email that responds to it.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "Sharpens the subject line once the body of the win back email is written, since a vague subject undoes a specific message.",
      },
      {
        href: "/promo-prompts/loyalty-tier-email-prompt",
        label: "loyalty tier email prompt",
        description:
          "For customers who have not lapsed, the same principle of writing to their actual status rather than a generic tier announcement applies before they go quiet.",
      },
      {
        href: "/promo-prompts/referral-program-copy-prompt",
        label: "referral program copy prompt",
        description:
          "Once a lapsed customer replies to a win back email, referral copy is a natural next ask for the reactivated account.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2014/10/the-value-of-keeping-the-right-customers",
        label: "Harvard Business Review: The value of keeping the right customers",
        description:
          "The research on why acquiring a replacement customer costs more than retaining or reactivating an existing one, which is the economic case for a win back message worth writing well.",
      },
      {
        href: "https://www.nngroup.com/articles/error-message-guidelines/",
        label: "Nielsen Norman Group: Error message and communication guidelines",
        description:
          "The usability research behind writing to a specific cause rather than a generic apology, applied here to a lapsed customer rather than a system error.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the pattern of instructing a model to state which conditional branch it took, which is what the mode note at the end of the output is built on.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act compliance guide for business",
        description:
          "The legal baseline for any commercial reactivation email, including the unsubscribe and identification requirements a win back send has to meet regardless of tone.",
      },
    ],
  },
};

export default meta;

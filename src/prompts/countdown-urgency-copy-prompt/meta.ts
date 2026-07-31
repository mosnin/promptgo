import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "countdown-urgency-copy-prompt",
  name: "Countdown Copy Writer",
  title: "Countdown Urgency Copy Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Writes last chance and countdown copy only when a real, enforced deadline backs it, and writes an honest evergreen version of the same offer when it doesn't.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["countdown", "urgency", "deadline", "ecommerce"],

  seo: {
    primaryKeyword: "countdown urgency copy prompt",
    keywords: [
      "countdown urgency copy prompt",
      "how to write countdown urgency copy",
      "ai prompt for limited time offer copy",
      "chatgpt prompt for last chance email",
      "how to avoid fake urgency in marketing copy",
    ],
    seoTitle: "Countdown Urgency Copy Prompt: Real Deadlines Only",
    seoDescription:
      "A countdown urgency copy prompt that writes last chance and X left copy only when the deadline is real, and an honest evergreen offer when it isn't.",
  },

  prompt: {
    text: `You are a promotions copywriter who only writes deadline pressure into copy when the deadline is real. Read DEADLINE_IS_REAL closely: it must describe a specific, irreversible consequence tied to DEADLINE_VALUE, such as a price reverting, a discount code being disabled, a listing coming down, or a batch that will not be restocked. A bare yes with no such mechanism, an answer left empty or vague, or a mechanism that reveals the offer resets, relaunches, or continues anyway, means the deadline is not real.

OFFER: {{OFFER}}
DEADLINE TYPE, DATE BASED OR QUANTITY BASED: {{DEADLINE_TYPE}}
DEADLINE VALUE, THE ACTUAL DATE AND TIME OR THE ACTUAL REMAINING COUNT: {{DEADLINE_VALUE}}
WHAT ACTUALLY HAPPENS WHEN THE DEADLINE HITS: {{DEADLINE_IS_REAL}}
AUDIENCE: {{AUDIENCE}}
TONE: {{TONE}}

If the deadline is real, write a countdown message under 110 words. For a date based deadline, state DEADLINE_VALUE exactly, in the reference the input gives, and use hours left or last chance language only to the degree the actual gap to DEADLINE_VALUE supports it. For a quantity based deadline, state the exact remaining count from DEADLINE_VALUE, never rounded and never dramatised into almost gone. If the deadline is not real, write no countdown at all. Drop every last chance, ends tonight, and units left phrase, and instead write an honest evergreen version of OFFER for AUDIENCE in TONE that sells the offer's ongoing value rather than a deadline that does not exist. Close with one sentence stating which mode you used and citing the specific mechanism, or the reason none qualified, so the choice can be checked against the input above.`,
    variables: [
      {
        token: "OFFER",
        label: "What's actually being offered",
        example: "20% off all cold weather gear, applied automatically at checkout",
      },
      {
        token: "DEADLINE_TYPE",
        label: "date based or quantity based",
        example: "quantity-based",
      },
      {
        token: "DEADLINE_VALUE",
        label: "The exact date and time, or the exact remaining count",
        example: "14 units left in this batch, tracked live in the inventory system",
      },
      {
        token: "DEADLINE_IS_REAL",
        label: "What concretely happens the moment the deadline hits or the count reaches zero",
        example:
          "Once these 14 sell out the listing closes for this colourway and we are not reordering it before next winter, confirmed with the warehouse this morning",
      },
      {
        token: "AUDIENCE",
        label: "Who is receiving this",
        example: "Existing subscribers who bought outerwear in the last 12 months",
      },
      {
        token: "TONE",
        label: "Voice for the copy",
        example: "Direct and calm, no exclamation marks, no all caps",
      },
    ],
    expectedOutput:
      "Either a countdown message under 110 words stating the exact time or exact remaining count from a real, enforced deadline, or, when no real mechanism was given, an honest evergreen version of the same offer with no countdown or last chance language, plus a closing sentence naming which mode was used and why.",
    followUps: [
      "The 14 units sold out but we just found 20 more in a second warehouse. Rewrite DEADLINE_VALUE for the new count and check the copy updates the exact number rather than reusing the old one.",
      "Turn this into a three message countdown sequence, one at DEADLINE_VALUE minus 48 hours, one at minus 4 hours, and one at the actual close, without repeating the same urgency phrase in all three.",
      "Rewrite this one assuming DEADLINE_IS_REAL admits the sale actually relaunches next quarter, and confirm the output drops every countdown phrase and switches to the evergreen version.",
    ],
    pitfalls: [
      "Answering DEADLINE_IS_REAL with a plain yes gives the model nothing to check the deadline against, and a bare yes reads the same as a real mechanism unless the field actually states what happens, a price reverting, a code disabling, a batch not restocking.",
      "Stating a quantity in DEADLINE_VALUE that is not actually tracked live, a guess rather than a live inventory count, produces copy that states an exact number the business cannot stand behind if a customer orders after it apparently sold out.",
      "Reusing a countdown message after the real deadline has already passed once, because the offer got extended informally, is the fabricated urgency claim the DEADLINE_IS_REAL field exists to catch. The value has to be edited every time the offer's real end changes.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked for last chance or countdown copy reaches for hours left and units remaining language by default, because the genre expects urgency regardless of whether a checkable deadline exists behind it. Requiring the deadline's actual enforcement mechanism as an input, and treating a vague or reversible answer as no deadline at all, is what stops manufactured time pressure from being dressed up as a real cutoff.",
  },

  article: {
    intro: [
      "A countdown urgency copy prompt is only honest when the deadline behind it is real: a date the offer actually stops being honoured, or a quantity that is actually tracked down to the last unit. Most countdown copy gets written the other way round. The tone is decided first, urgent and final, and a deadline gets attached to it afterward whether or not anything about the offer is actually ending.",
      "This prompt requires the deadline's real mechanism as an input before it writes a single line of countdown language. Given a date that genuinely stops the offer, or a quantity genuinely tracked to zero, it states the exact hours left or the exact units remaining. Given anything less, an empty field, a bare yes, or a mechanism that quietly resets, it refuses the countdown entirely and writes an honest evergreen version of the same offer instead.",
    ],

    sections: [
      {
        heading: "What a countdown urgency copy prompt needs before it writes a countdown",
        body: [
          "How to write countdown urgency copy that a reader still trusts starts with treating the deadline mechanism as the input that gates everything else, not a detail dressed up after the tone is already decided. Countdown copy earns its name from a real countdown, a clock or a tally actually running down to zero outside the marketing copy itself. A discount code that keeps working after the banner says it expires is not a countdown. It is a permanent fixture wearing a countdown's clothing.",
          "The gate is DEADLINE_IS_REAL, which does not ask for a yes or a no so much as what actually happens the moment the clock or the tally hits zero. A price reverting, a code being disabled, a batch that will not be reordered, all count. A field left blank, or filled with a sentiment rather than a mechanism, does not.",
        ],
      },
      {
        heading: "Two real deadline mechanisms: date based and quantity based",
        body: [
          "DEADLINE_TYPE splits into exactly two honest shapes. A date based deadline is a specific stop time: the offer or the discount code stops applying at that moment, checkable by anyone who tries it a minute later. A quantity based deadline is a specific remaining count, drawn from an inventory system that is actually being watched, not a round number chosen because it sounds urgent.",
        ],
        list: [
          "Date based: the sale, the code, or the page itself stops working at a stated time, in a stated time zone.",
          "Quantity based: a live count of units left, drawn from the same system that will actually stop selling once it hits zero.",
        ],
      },
      {
        heading: "How to avoid fake urgency in marketing copy",
        body: [
          "How to avoid fake urgency in marketing copy is mostly a discipline of refusing to write a deadline the business itself is not honouring. A reader who has clicked into one too many countdowns that quietly reset the following week reads every last chance banner as decorative, and the next genuinely time limited offer from the same sender inherits that scepticism.",
          "The Federal Trade Commission's 2022 report on dark patterns names fake countdown timers directly, describing interfaces built to make a shopper believe an offer is about to end when it is not, alongside low stock messages with no real count behind them. Both are treated as a deceptive design pattern, not clever copywriting.",
        ],
      },
      {
        heading: "Writing the date based countdown",
        body: [
          "Used as an ai prompt for limited time offer copy, the date based branch states DEADLINE_VALUE exactly, in whatever time zone the input gives, rather than compressing a Sunday midnight deadline into ends tonight for a list that spans three time zones. Hours left language is only used to the degree the actual gap to DEADLINE_VALUE supports it. A genuinely six hour window can say six hours left. A three day window should not.",
        ],
      },
      {
        heading: "Writing the quantity based countdown",
        body: [
          "A quantity based deadline states the number from DEADLINE_VALUE as given, fourteen units rather than almost gone, because a shopper who has seen a low stock badge sit at the same count for a week trusts the next one less. The exact figure is also checkable: a customer who orders the fifteenth unit after the copy said fourteen finds out immediately whether the number was real.",
        ],
      },
      {
        heading: "The honest evergreen alternative when the deadline isn't real",
        body: [
          "Not every offer has a real end. A permanent discount, a standing loyalty perk, or a sale that quietly gets extended every time it is about to close has no countdown to write honestly, and forcing one in produces exactly the fake urgency the FTC guidance describes. The evergreen alternative sells OFFER on what is actually true about it, its value and its fit for AUDIENCE, without inventing a clock. This is not a downgrade: an offer good enough not to need a fake deadline is often the more credible email in the inbox.",
        ],
      },
    ],

    howTo: {
      name: "How to use the countdown urgency copy prompt",
      steps: [
        {
          name: "Pull the real deadline mechanism before opening the prompt",
          text: "Check the checkout system or the inventory feed for what actually happens at the deadline. If nothing enforces it, set DEADLINE_IS_REAL to 'none, the offer continues' rather than a plausible sounding yes.",
        },
        {
          name: "Set DEADLINE_TYPE to what is actually being tracked",
          text: "Date based only when a stop time is actually enforced, quantity based only when a live count is actually watched. Picking whichever sounds more dramatic undoes the mechanism check before it starts.",
        },
        {
          name: "Keep DEADLINE_VALUE exact, never rounded",
          text: "An exact time and time zone for a date, or an exact current count for a quantity. A rounded figure such as a few left gives the prompt nothing to check itself against.",
        },
        {
          name: "Read the closing mode note before sending",
          text: "The prompt states which mode it used, countdown or evergreen, and why. If that does not match what you meant to send, DEADLINE_IS_REAL was not specific enough, and the fix is tightening the input, not editing the output by hand.",
        },
      ],
    },

    faq: [
      {
        question: "What is a countdown urgency copy prompt for, exactly?",
        answer:
          "It writes the closing message sent as a date based or quantity based offer nears its real end, checking first whether the deadline behind it is genuinely enforced. When it is, the copy states the exact time or count. When it is not, the prompt writes an honest evergreen version instead of inventing a clock.",
      },
      {
        question: "What actually counts as a real deadline the prompt will accept?",
        answer:
          "A date where the offer, the discount code, or the page itself genuinely stops working at that moment, or a quantity drawn from a live inventory count that is actually being watched and will not be restocked. Either has to be checkable by someone outside the marketing team, not just asserted by it.",
      },
      {
        question: "What happens if I can't state a concrete cutoff for my sale?",
        answer:
          "The prompt writes an honest evergreen version of the same offer, describing its value and its fit for the audience without any countdown, last chance, or units remaining language. This is usually the more accurate email anyway, since it describes what is actually true about the offer instead of a deadline nobody is enforcing.",
      },
      {
        question: "Does the FTC actually treat fake countdown timers as deceptive?",
        answer:
          "Yes. The Federal Trade Commission's 2022 report on dark patterns names fake countdown timers and unsupported low stock claims directly, describing interfaces built to make a shopper believe a deal is about to end when it is not as a deceptive design pattern rather than ordinary persuasive copywriting.",
      },
      {
        question: "Why would the chatgpt prompt for last chance email refuse to write 'last chance' at all?",
        answer:
          "Because DEADLINE_IS_REAL did not describe an enforced mechanism: an empty field, a bare yes, or an answer admitting the offer resets or relaunches. Without a checkable consequence behind it, last chance is a guess dressed up as a fact, and the prompt is built to write the honest alternative instead of guessing.",
      },
      {
        question: "Can I use this for a quantity based drop as well as a date based sale?",
        answer:
          "Yes, set DEADLINE_TYPE to quantity based and DEADLINE_VALUE to the live remaining count. The copy states units remaining rather than hours left, and the same DEADLINE_IS_REAL check applies: a count has to come from a system that is actually tracked and will not be quietly restocked once it reaches zero.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/flash-sale-announcement-prompt",
        label: "flash sale announcement prompt",
        description:
          "The initial sale announcement this countdown message follows once the same offer is genuinely nearing its real end.",
      },
      {
        href: "/promo-prompts/price-drop-alert-prompt",
        label: "price drop alert prompt",
        description:
          "Another promo prompt in the same category that gates superlative language behind a real calculated number instead of a vibe.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "Sharpens the subject line carrying the countdown or the evergreen framing once the body of the message is written.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description:
          "Adapts the same real deadline or the same evergreen framing into paid ad copy once the email version exists.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers",
        label: "FTC: Report on the rise of dark patterns",
        description:
          "Names fake countdown timers and unsupported low stock claims as a deceptive practice, which is the exact claim the deadline mechanism gate is built to hold the copy to.",
      },
      {
        href: "https://www.nngroup.com/articles/scarcity-principle-ux/",
        label: "Nielsen Norman Group: The scarcity principle in UI design",
        description:
          "Draws the line between genuine scarcity, where the count or the clock reflects reality, and a fabricated version of the same signal that erodes trust once discovered.",
      },
      {
        href: "https://arxiv.org/abs/1907.07032",
        label: "Mathur et al.: Dark Patterns at Scale",
        description:
          "The large scale study of manipulative interface patterns across thousands of shopping sites that establishes how common manufactured urgency actually is in ecommerce copy.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the conditional gate pattern this prompt relies on to refuse the countdown framing unless the deadline input actually supports it.",
      },
    ],
  },
};

export default meta;

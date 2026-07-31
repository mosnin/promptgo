import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "flash-sale-announcement-prompt",
  name: "Sale Announcer",
  title: "Flash Sale Announcement Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Writes flash sale copy from the real discount and the real end time, and refuses to write almost gone or won't last unless a real number or a real cause actually supports it.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["flash sale", "promo copy", "urgency", "ecommerce"],

  seo: {
    primaryKeyword: "flash sale announcement prompt",
    keywords: [
      "flash sale announcement prompt",
      "how to write a flash sale email",
      "chatgpt prompt for flash sale announcement",
      "flash sale email template without fake urgency",
      "ai prompt for ecommerce flash sale copy",
      "how to announce a sale without fake scarcity",
    ],
    seoTitle: "Flash Sale Announcement Prompt: Real Urgency Only",
    seoDescription:
      "A flash sale announcement prompt that writes from the real discount and end time, and refuses almost gone or won't last unless the inputs support it.",
  },

  prompt: {
    text: `You are a promotions copywriter who has been told plainly that invented urgency is not allowed. You work only from the mechanics you are given, the actual discount, the actual end time, and the actual reason a limit exists if one exists at all, and you say so when no such reason was supplied.

CHANNEL: {{CHANNEL}}
WHAT IS ON SALE: {{PRODUCT}}
THE REAL DISCOUNT: {{DISCOUNT}}
SALE WINDOW, START TO END: {{WINDOW}}
WHY IT ENDS OR IS LIMITED, IF ANYTHING: {{LIMIT_REASON}}
AUDIENCE: {{AUDIENCE}}

Produce three labelled blocks.

HEADLINE OR SUBJECT LINE, under 12 words, stating the discount plainly. Use a countdown framing only if the window given is under 48 hours from now.

THE ANNOUNCEMENT, under 120 words, opening with the product and the discount, stating the end time exactly as given, and including the limit reason only if one was supplied, in language close to what you were told rather than a dramatised version of it.

ONE LINE CLOSING CALL TO ACTION naming the actual end date, never today only unless today genuinely is the end date.

Hard rule. Never write almost gone, won't last, selling fast, limited stock or any equivalent unless LIMIT_REASON supplies a real number or a real cause that supports it. If LIMIT_REASON is empty or generic, state in a short note under the three blocks that no scarcity claim was made, and write the announcement on the discount and the deadline alone. Success means a reader could check every claim in the copy against the inputs above and find it accurate.`,
    variables: [
      {
        token: "CHANNEL",
        label: "Where this copy will run",
        example: "Email to the full subscriber list",
      },
      {
        token: "PRODUCT",
        label: "What is actually on sale",
        example: "All end of season fleece jackets, every size and colour currently in stock",
      },
      {
        token: "DISCOUNT",
        label: "The real discount, stated as it actually applies",
        example: "35% off the marked price, applied automatically at checkout",
      },
      {
        token: "WINDOW",
        label: "The real start and end of the sale, with a time zone or local reference",
        example: "Starts Friday 8am, ends Sunday 11:59pm Pacific time",
      },
      {
        token: "LIMIT_REASON",
        label: "The real reason for the deadline or stock limit, if one exists",
        example:
          "This is the last shipment of this style. 220 units in this batch, once they sell out we are not reordering before next winter",
      },
      {
        token: "AUDIENCE",
        label: "Who is receiving this",
        example: "Existing customers who bought outerwear in the last 12 months",
      },
    ],
    expectedOutput:
      "A headline under 12 words, a 120 word announcement that states the real discount and the exact end time and mentions the limit reason only if one was actually given, a one line call to action naming the true end date, and a short note confirming whether a scarcity claim was made and why.",
    followUps: [
      "The stock count turned out to be wrong, we actually have 600 units left, not 220. Rewrite the announcement with LIMIT_REASON left empty and check that every scarcity phrase drops out.",
      "Turn the announcement into a three message SMS sequence, one per day of the window, without repeating the same scarcity language in each one.",
      "The sale got extended by two days after this went out. Write the correction message that states the new end time without pretending the first deadline never existed.",
    ],
    pitfalls: [
      "Typing 'limited time' into LIMIT_REASON without a number gives the model nothing to grip, and it will still reach for 'almost gone' because the field looks populated. Give the actual mechanism, a count, a batch, a supplier date, or leave it explicitly blank.",
      "Leaving WINDOW without a time zone lets the model round a Sunday night deadline into 'ends today', which is only true for part of a national list. State the time zone or a clear local reference point.",
      "Reusing this copy after a sale is quietly extended breaks the discipline the prompt is built for. The end time has to be edited every time the promotion changes, since a stale deadline still live in an inbox is itself a fabricated urgency claim.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Flash sale copy is the genre most reliably marbled with invented urgency, since a model asked to sound exciting reaches for almost gone and won't last whether or not either is true. Gating those phrases behind a real count or a stated cause in the limit reason input, and requiring a plain note when no such cause exists, is what stops fabricated scarcity from reaching a list that has been trained by exactly that pattern to distrust every sale email it receives.",
  },

  article: {
    intro: [
      "A flash sale announcement prompt is worth using only if the urgency in the copy is real, because a reader who has clicked into one too many sales that reappeared the following week has learned to treat every deadline as decorative. Most flash sale copy is written backwards, the tone is decided first, urgent and exciting, and the language is chosen to match that tone whether or not anything about the sale is actually scarce or genuinely time limited.",
      "This one works the other way round. It takes the real discount, the real end time, and the real reason a limit exists, if one exists at all, and writes only from those. Where no real limit exists, it says so instead of inventing one, because a fabricated scarcity claim costs more trust on a list than it earns in extra orders that week.",
    ],

    sections: [
      {
        heading: "What a flash sale announcement prompt refuses to write",
        body: [
          "Give this prompt no real reason for the deadline and it will not write almost gone, won't last or selling fast, because none of those phrases have anything under them. Most flash sale copy reaches for those words as a genre convention rather than a factual claim, and a reader has seen the same convention attached to sales that were quietly still running a week later.",
          "The ban only lifts when LIMIT_REASON names something checkable, a batch size, a unit count, a supplier date. Given nothing, it says plainly that no scarcity claim was made, which is a more honest sentence than most sale emails contain anywhere in their copy.",
        ],
      },
      {
        heading: "The discount has to be the one that is actually running",
        body: [
          "A percentage that gets rounded up somewhere between the brief and the draft, 30% becoming 'up to half price', is a specific and avoidable failure. The prompt takes DISCOUNT as a literal input and states it as given, rather than translating it into a bigger sounding phrase.",
          "How to write a flash sale email without exaggerating the numbers is mostly a discipline of leaving the discount exactly as written. Used with new numbers dropped in each time, it behaves like a flash sale email template without fake urgency built into the wording by default, rather than one that needs the exaggeration edited back out.",
        ],
      },
      {
        heading: "The end time is the only deadline that counts",
        body: [
          "Sale windows drift in ordinary production. A calendar says Friday to Sunday and the email goes out saying 'this weekend only' with no time zone attached, which reads differently on the west coast than three time zones east. The prompt states WINDOW exactly as supplied and will not compress a three day sale into 'today only' unless today genuinely is the last day.",
          "This matters most in the closing line, since a call to action that says 'ends tonight' on the first day of a three day sale is not urgency, it is an error that happens to look like urgency.",
        ],
      },
      {
        heading: "When the limit reason is real, and when it plainly is not",
        body: [
          "Some flash sales are genuinely constrained: a batch of 220 units that will not be reordered, a supplier contract that ends the discount on a fixed date, a warehouse clearing space for a new season. Those are real reasons and the copy is allowed to state them plainly, close to the words they were given in, rather than dramatised into 'almost gone'.",
          "Most flash sales have no such reason. The discount is scheduled, the stock is not actually limited, and the deadline exists only because someone picked a date for the campaign to end. How to announce a sale without fake scarcity, in that ordinary case, means admitting there is no scarcity and letting the discount and the date do the work on their own.",
        ],
        list: [
          "A named batch size or unit count that will not be replenished. Real.",
          "A supplier or licensing date the discount is tied to. Real.",
          "A vague 'while supplies last' with no number behind it. Not a reason.",
          "A deadline that exists only because the campaign was scheduled to end. Not scarcity, just a date.",
        ],
      },
      {
        heading: "Running it for ecommerce, where the numbers are checkable",
        body: [
          "An ai prompt for ecommerce flash sale copy earns its place because ecommerce is where every claim is checkable within thirty seconds. The discount applies or it does not at checkout, the deadline either matches the real end time or it does not, and a customer who catches one mismatch reads the sender's next email more sceptically.",
          "The AUDIENCE input exists for the same reason a good ecommerce send is segmented in the first place. A sale on winter boots announced to a list that bought nothing but summer sandals last year is not urgency, it is noise sent to the wrong list.",
        ],
      },
      {
        heading: "What the discipline does not solve",
        body: [
          "A prompt this careful about the mechanics still cannot fix a discount that is not actually attractive, or a product nobody in the audience wants at any price. Honesty about the deadline does not manufacture demand that was never there, and a flash sale announcement prompt built to refuse invented urgency will simply produce an accurate, unexciting email when the underlying offer is unexciting.",
          "It also will not check that the discount is legal to advertise the way it is phrased. Reference pricing, the 'before' price a discount is measured against, has its own rules in several markets and belongs to whoever set the original price, not to the copy announcing the markdown.",
        ],
      },
    ],

    howTo: {
      name: "How to use the flash sale announcement prompt",
      steps: [
        {
          name: "Get the real discount and the real end time first",
          text: "From whoever owns the promotion, not from last quarter's headline. A rounded up figure or a vague weekend window undoes the rest of the discipline before you start.",
        },
        {
          name: "Check whether a limit reason genuinely exists",
          text: "A real batch size, a supplier date, a stock count. If nothing checkable exists, leave LIMIT_REASON blank rather than writing 'limited time' as a placeholder.",
        },
        {
          name: "Match the audience to what is actually on sale",
          text: "Send winter stock to people who bought winter stock. A discount is not urgent to a reader it was never relevant to.",
        },
        {
          name: "Re-run it if the window changes",
          text: "An extended sale needs a new end time in WINDOW, not a reused draft. A deadline that has already passed once is the clearest fabricated urgency claim there is.",
        },
      ],
    },

    faq: [
      {
        question: "Can a flash sale announcement prompt work for SMS as well as email?",
        answer:
          "Yes, set CHANNEL to SMS and the announcement block will read shorter and blunter, since the same discount, end time and honesty rules apply regardless of length. The headline block alone is often enough for a text, with the fuller announcement kept for email or a landing page.",
      },
      {
        question: "What if I genuinely have no reason for the deadline other than the campaign schedule?",
        answer:
          "Leave LIMIT_REASON blank or say so plainly, since a scheduled promotion is a legitimate reason to run a sale even without scarcity behind it. The prompt writes the announcement from the discount and the date alone and states that no scarcity claim was made, which is accurate and still converts.",
      },
      {
        question: "Why does the chatgpt prompt for flash sale announcement refuse to say 'almost gone' by default?",
        answer:
          "Because the model has no way to know that phrase is true unless a number or a cause was given to support it, and writing it anyway would be a guess dressed up as a fact. The refusal is the default state, and it only lifts once LIMIT_REASON supplies something checkable.",
      },
      {
        question: "Is honest flash sale copy less effective than urgent sounding copy?",
        answer:
          "Not on a list that has seen the same brand run fake deadlines before. A discount stated plainly with a real end time still gives a reason to act now, and it does not cost the next campaign's credibility the way a deadline that quietly moved does.",
      },
      {
        question: "Can I use this for a sale that runs for two weeks rather than a few hours?",
        answer:
          "Yes, though the countdown framing in the headline block is designed to switch off automatically once the window is longer than 48 hours, since a countdown clock on a two week sale reads as decorative rather than informative. The discount and end date rules apply at any length.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/win-back-campaign-prompt",
        label: "win back campaign prompt",
        description:
          "The same refusal to invent a reason, applied to why a customer left rather than to why a deadline exists.",
      },
      {
        href: "/promo-prompts/referral-program-copy-prompt",
        label: "referral program copy prompt",
        description:
          "Another promo prompt that states the real mechanics of an offer rather than a rounded headline version of them.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "For sharpening the headline block once the announcement itself is written, without drifting into the manufactured urgency this prompt bans.",
      },
      {
        href: "/marketing-prompts/product-description-prompt",
        label: "product description prompt",
        description:
          "Useful for the product itself when the sale is on a single item rather than a whole category.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers",
        label: "FTC: Report on the rise of dark patterns",
        description:
          "Names false countdown timers and manufactured urgency claims as a deceptive pattern, which is the specific practice this prompt is built to refuse.",
      },
      {
        href: "https://hbr.org/2024/06/research-smaller-more-precise-discounts-could-increase-your-sales",
        label: "Harvard Business Review: Research on precise discounts",
        description:
          "The research behind stating the real discount plainly rather than rounding it into a bigger sounding figure to seem more generous.",
      },
      {
        href: "https://www.nngroup.com/articles/deceptive-patterns/",
        label: "Nielsen Norman Group: Deceptive patterns in UX",
        description:
          "Distinguishes honest scarcity, where a limit reflects reality, from deceptive scarcity, which is the line the limit reason gate is built to hold.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the conditional gate pattern this prompt relies on to refuse a scarcity claim unless the input actually supports it.",
      },
    ],
  },
};

export default meta;

import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "loyalty-tier-email-prompt",
  name: "Tier Update Writer",
  title: "Loyalty Tier Email Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Writes a loyalty tier progress email that states the real, calculated gap to the next tier and refuses to guess when the numbers given cannot be subtracted.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["loyalty", "email", "retention", "tiers"],

  seo: {
    primaryKeyword: "loyalty tier email prompt",
    keywords: [
      "loyalty tier email prompt",
      "how to write a loyalty tier email",
      "ai prompt for loyalty program emails",
      "how to calculate the gap to the next loyalty tier",
      "chatgpt prompt for tier upgrade emails",
      "loyalty tier progress email example",
    ],
    seoTitle: "Loyalty Tier Email Prompt: The Real Gap, Not So Close",
    seoDescription:
      "A loyalty tier email prompt that calculates the real gap to the next tier from the numbers you give it and refuses to write so close without a figure behind it.",
  },

  prompt: {
    text: `You are a loyalty program copywriter writing a tier progress email. Your defining rule: state the exact numeric gap to the next tier, calculated from the inputs given, never a vague line like you are so close. If the current value and the next threshold cannot actually be subtracted into a real number, because a figure is missing, written as a range, or measured in a different unit than the threshold, stop and say which input is missing rather than inventing or rounding one.

CUSTOMER NAME: {{CUSTOMER_NAME}}
PROGRAM NAME: {{PROGRAM_NAME}}
CURRENT TIER: {{CURRENT_TIER}}
NEXT TIER: {{NEXT_TIER}}
CURRENT VALUE, SPEND OR POINTS TO DATE: {{CURRENT_VALUE}}
THRESHOLD TO REACH THE NEXT TIER: {{NEXT_THRESHOLD}}
UNIT THE THRESHOLD IS MEASURED IN: {{METRIC_LABEL}}
WHAT THE NEXT TIER UNLOCKS: {{NEXT_TIER_PERK}}
WHEN THE QUALIFYING PERIOD ENDS: {{QUALIFYING_WINDOW}}

First subtract the current value from the threshold and state the result in the unit given, inside the first two sentences, as a single stated number, for example 47 dollars more to reach Gold or 210 points more to reach Platinum. Never write so close or almost there without that number sitting directly next to it. Then write two to four short sentences naming the specific perk the next tier unlocks, mentioning the qualifying window only if one was given. Keep the subject line under nine words and include either the calculated gap or the next tier name in it. If the current value or the threshold is missing, non numeric, or given in a unit that does not match, do not write the email. State plainly which figure is missing and what is needed before you can proceed.`,
    variables: [
      {
        token: "CUSTOMER_NAME",
        label: "The customer's first name",
        example: "Priya",
      },
      {
        token: "PROGRAM_NAME",
        label: "The loyalty program's name",
        example: "Northfield Rewards",
      },
      {
        token: "CURRENT_TIER",
        label: "The tier the customer is in now",
        example: "Silver",
      },
      {
        token: "NEXT_TIER",
        label: "The tier they are progressing toward",
        example: "Gold",
      },
      {
        token: "CURRENT_VALUE",
        label: "Their current spend or points to date, as a number",
        example: "453",
      },
      {
        token: "NEXT_THRESHOLD",
        label: "The threshold required to reach the next tier, in the same unit",
        example: "500",
      },
      {
        token: "METRIC_LABEL",
        label: "The unit both figures are measured in",
        example: "dollars spent this calendar year",
      },
      {
        token: "NEXT_TIER_PERK",
        label: "What the next tier specifically unlocks",
        example: "free shipping on every order and early access to seasonal sales",
      },
      {
        token: "QUALIFYING_WINDOW",
        label: "When the qualifying period ends, if it does",
        example: "before December 31",
      },
    ],
    expectedOutput:
      "A short email whose first two sentences state the exact numeric gap, drawn from subtracting the current value from the threshold, followed by the specific perk at the next tier and a subject line under nine words carrying the gap or the tier name. If the two figures cannot be subtracted, a short message naming the missing or mismatched input instead of an email.",
    followUps: [
      "Here are the current values for eighty customers at Silver, all with the same threshold. Write the subject line pattern once and tell me which fields must still be generated per customer.",
      "Rerun this assuming the qualifying window has already passed and the gap is now against next year's threshold instead.",
      "Take the refusal case and write it as the error message our email platform should show the marketer before a send goes out with a missing threshold.",
    ],
    pitfalls: [
      "A model asked to sound encouraging will reach for so close even when a real number is sitting right there in the inputs. The instruction to keep the number next to that phrase, not instead of it, is what stops the two from separating.",
      "Points programs and spend programs get mixed constantly when a business runs both. A threshold written as 500 without a unit gets subtracted against a spend figure as though it were dollars, producing a gap that is confidently stated and wrong.",
      "A qualifying window that has already passed changes what the gap means entirely. Sending a tier progress email against a deadline that lapsed last week reads as either careless or manipulative, and the fix is checking the window before the send, not after a reply comes in.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked for encouraging tier copy will default to so close regardless of whether a real number is available, because the phrase reads as warm and costs nothing to generate. Requiring the subtraction to happen first, in the first two sentences, and blocking the send when the two figures use different units is what keeps the stated gap accurate rather than merely plausible.",
  },

  article: {
    intro: [
      "A loyalty tier email prompt that tells a customer they are so close to the next tier without saying how close is not encouragement, it is filler. Close by how much. A customer who is 47 dollars away from Gold and one who is 340 dollars away do not want the same email, and a template that flatters both identically trains people to skim past the whole loyalty program.",
      "This chatgpt prompt for tier upgrade emails takes the customer's current spend or points and the next tier's threshold, subtracts one from the other, and puts that number in the first two sentences. If the two figures cannot actually be subtracted, because one is missing, written as a range, or measured in a different unit than the threshold, it stops and says so instead of shipping an email that reads finished but is quietly wrong.",
    ],

    sections: [
      {
        heading: "Vague encouragement has no number behind it",
        body: [
          "Most tier progress emails are built from a single template with a slot for the tier name and nothing else. You're so close to Gold fits a customer at forty percent progress exactly as well as one at ninety five percent, which means it is a true statement about nobody in particular. A subject line that could go to the entire tier at once was never really about that individual's progress.",
          "Stating an actual number costs nothing extra to generate and changes how the whole email reads. 47 dollars more to reach Gold is a fact a customer can act on today. So close is a mood, and moods do not survive contact with an account balance the customer can check in one tap.",
        ],
      },
      {
        heading: "The loyalty tier email prompt does the subtraction first",
        body: [
          "How to calculate the gap to the next loyalty tier is the instruction that matters most in this prompt, and it sits before any copywriting happens: subtract the current value from the threshold and state the result in the first two sentences, in the same unit the program already uses. Not implied by tone, not gestured at with an emoji, stated as a number the customer could check against their own account this minute.",
        ],
        list: [
          "The number anchors the rest of the email instead of decorating it, so the perk gets read as a reason rather than an afterthought.",
          "A customer can verify the figure in one click, which is what makes the email feel accurate rather than promotional.",
          "Writing the perk before the number tempts a model into padding around a gap it never actually calculated, which is why the order is fixed.",
        ],
      },
      {
        heading: "Why the units have to match before anything gets written",
        body: [
          "A program that tracks spend in dollars and a threshold expressed in points cannot be subtracted into a meaningful figure, and a model asked to try anyway will quietly invent a conversion rate nobody agreed to. The same failure shows up more subtly when one number is exact and the other is a rounded estimate or a note like around 400.",
          "The prompt is instructed to check that both figures share a unit before doing any arithmetic, and to stop rather than proceed if they do not match or if a figure is missing outright. A plain refusal here is more useful than a confident email stating a gap that turns out to be wrong once the customer checks their account.",
        ],
      },
      {
        heading: "The perk needs a name, not a category",
        body: [
          "In a loyalty tier progress email example like this one, better benefits is not a reason to spend the extra 47 dollars. Free shipping on every order and early access to seasonal sales is. The prompt requires the specific perk unlocked at the next tier, named plainly, placed after the number rather than before it, so the number is not competing with adjectives for the reader's attention.",
          "This is also where a qualifying window earns its place, when the program has one. A deadline attached to a real gap turns the email into something a customer can plan around, a birthday sale or a final purchase before month end, rather than a countdown with nothing underneath it.",
        ],
      },
      {
        heading: "How to write a loyalty tier email with the numbers checked",
        body: [
          "Treat the gap as the first thing to verify, not the last. Pull it from the same account record the customer would see, not from a segment average, since an averaged gap is wrong for almost every individual it is sent to.",
        ],
      },
      {
        heading: "What happens when the inputs don't add up",
        body: [
          "The refusal case is not an edge case worth skipping past. Loyalty platforms export threshold values in whatever unit the program was originally built around, and a marketer pulling data for a send often has the customer's spend in one column and the threshold in a different one from an older program design.",
          "When that happens, the prompt names the missing or mismatched input directly rather than writing an email around a guess. That single check is the difference between a send that occasionally embarrasses the brand with a wrong number and one that simply does not go out until someone fixes the export.",
        ],
      },
    ],

    howTo: {
      name: "How to use the loyalty tier email prompt",
      steps: [
        {
          name: "Pull the two real numbers before opening the prompt",
          text: "Get the customer's current spend or points and the next tier's threshold from the same account record, not from a segment average or a rounded estimate.",
        },
        {
          name: "Confirm the unit matches on both sides",
          text: "Dollars against dollars, points against points. If the export gives you one of each, resolve that first rather than letting the prompt guess a conversion.",
        },
        {
          name: "Name what the next tier actually unlocks",
          text: "A specific perk, not a category like better benefits. The number earns attention; the perk is the reason to close the gap.",
        },
        {
          name: "Run it and check the first two sentences",
          text: "The calculated gap should be sitting there as a number. If the output says so close without a figure next to it, the inputs were incomplete and it should have refused instead.",
        },
        {
          name: "Send from the individual record, not the tier segment",
          text: "Batching by tier is fine for scheduling, but each send still needs its own current value pulled fresh, since two customers in the same tier rarely have the same gap.",
        },
      ],
    },

    faq: [
      {
        question: "Should the gap always be shown in dollars?",
        answer:
          "No, it should be shown in whatever unit the program's threshold actually uses, whether that is dollars spent, points earned, or qualifying purchases. Converting into a different unit for the email introduces a second calculation that was never verified against the program's real rules, which is exactly the kind of invented number this prompt is built to avoid.",
      },
      {
        question: "What if the customer has already qualified for the next tier?",
        answer:
          "Then the gap is zero or negative, and the email should say so plainly rather than forcing a progress framing onto an outcome that has already happened. A congratulations email for a reached tier is a different message with a different job, and treating it as a progress update reads as the brand not noticing the customer already got there.",
      },
      {
        question: "Can I use a loyalty tier email prompt for a points based program?",
        answer:
          "Yes, as long as both the current value and the threshold are given in points rather than one of them being expressed in dollars or purchases. The arithmetic is identical to a spend based program; the only requirement is that both figures share the same unit before the subtraction happens.",
      },
      {
        question: "What if I don't have the exact numbers yet?",
        answer:
          "Then the prompt should refuse rather than write the email, and that is the intended behaviour, not a bug. Sending a tier progress email built on a guessed or rounded gap risks stating a figure the customer can disprove by checking their own account, which does more damage to trust than delaying the send by a day.",
      },
      {
        question: "Is an ai prompt for loyalty program emails worth it for a small list?",
        answer:
          "Yes, because the value comes from accuracy per send rather than volume. A list of two hundred customers each with a genuinely different gap still needs that gap calculated correctly for every one of them, and doing that by hand at any list size is where copy paste errors and stale thresholds usually creep in.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/referral-program-copy-prompt",
        label: "referral program copy prompt",
        description:
          "Applies the same refusal against missing numbers to a referral reward instead of a loyalty threshold, inside the same category.",
      },
      {
        href: "/promo-prompts/win-back-campaign-prompt",
        label: "win back campaign prompt",
        description:
          "For customers who lapse before reaching the next tier, which needs the real reason they stopped rather than an assumed one.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "For the nine word limit on the tier update subject line, which needs the same discipline against padding as the body copy.",
      },
      {
        href: "/sales-prompts/renewal-conversation-prompt",
        label: "renewal conversation prompt",
        description:
          "Applies the same refuse rather than guess rule to a renewal figure instead of a loyalty threshold, from an adjacent category.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the pattern of instructing a model to refuse and state what is missing rather than filling a gap with an invented value.",
      },
      {
        href: "https://hbr.org/2002/07/the-mismanagement-of-customer-loyalty",
        label: "Harvard Business Review: The mismanagement of customer loyalty",
        description:
          "The research on loyal customers responding to genuine, individual signals rather than generic tier messaging, which underlies the case for a real number over a mood.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act compliance guide for business",
        description:
          "The federal standard for accurate, non misleading claims in commercial email, which a stated but unverified tier gap risks breaching.",
      },
      {
        href: "https://www.nngroup.com/articles/personalization/",
        label: "Nielsen Norman Group: Successful personalization",
        description:
          "The usability research on why generic messaging applied to individual accounts reads as inauthentic, which is the failure mode a calculated gap avoids.",
      },
    ],
  },
};

export default meta;

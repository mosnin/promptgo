import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "vip-sale-invite-prompt",
  name: "VIP Invite Writer",
  title: "VIP Sale Invite Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Writes a VIP sale invite around the actual criteria that earned the status, and refuses the label entirely when no real basis is given.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["vip", "email", "loyalty", "segmentation"],

  seo: {
    primaryKeyword: "vip sale invite prompt",
    keywords: [
      "vip sale invite prompt",
      "how to write a vip sale invite email",
      "ai prompt for vip customer email",
      "how to avoid a fake vip email",
      "chatgpt prompt for early access sale invite",
      "vip email prompt for ecommerce",
    ],
    seoTitle: "VIP Sale Invite Prompt: State The Real Criteria",
    seoDescription:
      "A vip sale invite prompt that states the real, checkable reason a customer is VIP, and refuses the label with an honest alternative when no reason is given.",
  },

  prompt: {
    text: `You are a retention copywriter writing a VIP sale invite email to one customer. Your defining rule: the word VIP, or any equivalent status label, only belongs in the email when VIP_CRITERIA states a real, specific, checkable basis for that status, such as a loyalty tier name, a percentile of spend, or a count of past purchases. When it does, state that exact criteria in plain language inside the first two sentences, so the customer sees the actual basis rather than being told to take the label on faith. If VIP_CRITERIA is missing, vague, or reads as a marketing label with no measurable basis behind it, such as "we like you" or "valued customer", do not use the word VIP, or any synonym implying elite status, anywhere in the output. Instead, write the same early access invite using an honest alternative framing, for example "early access" or "a preview before the public sale", that does not claim a status you cannot substantiate.

CUSTOMER: {{CUSTOMER_NAME}}
SALE NAME: {{SALE_NAME}}
CRITERIA THAT MADE THIS CUSTOMER VIP, OR NONE: {{VIP_CRITERIA}}
SALE DETAILS: {{SALE_DETAILS}}
EARLY ACCESS WINDOW: {{ACCESS_WINDOW}}
BRAND VOICE: {{TONE}}

Write one invite email of 100 to 160 words plus a subject line. State the criteria, or the honest alternative framing, before any sale detail appears. List the sale details and the access window plainly, after the opening reason, not before it. Close with one sentence stating which mode you used, VIP with stated criteria or the honest alternative, and why, so I can check the reasoning against the input I gave you.`,
    variables: [
      {
        token: "CUSTOMER_NAME",
        label: "Customer's first name",
        example: "Dana",
      },
      {
        token: "SALE_NAME",
        label: "Name of the private sale",
        example: "the Autumn Restock Private Sale",
      },
      {
        token: "VIP_CRITERIA",
        label: "The real, checkable basis for VIP status, or 'none given'",
        example: "Top 8% of total spend in the last 12 months",
      },
      {
        token: "SALE_DETAILS",
        label: "What's on sale and the discount",
        example: "20% off the full new arrivals collection, no exclusions, running for one week",
      },
      {
        token: "ACCESS_WINDOW",
        label: "How long before the public sale this access starts",
        example: "48 hours before public launch, starting Thursday at 9am",
      },
      {
        token: "TONE",
        label: "Brand voice",
        example: "Warm but not gushing, no exclamation marks",
      },
    ],
    expectedOutput:
      "A subject line and a short invite that either states the customer's real, checkable VIP criteria in the first two sentences before any sale detail, or, when no real criteria was given, uses an honest alternative framing such as early access instead of the word VIP, plus a one line note on which mode was used and why.",
    followUps: [
      "Here are the spend percentiles for forty customers, all above the top 10% threshold. Write all forty invites and keep the stated criteria specific to each one's actual percentile rather than a rounded figure.",
      "Rewrite this one assuming VIP_CRITERIA is 'none given' and check that the honest alternative framing never slips back into the word VIP anywhere in the output.",
      "The customer replied asking why they were called VIP. Write the follow up that points to the specific criteria stated in the original invite.",
    ],
    pitfalls: [
      "Leaving VIP_CRITERIA as 'our best customers' produces an invite that still calls someone VIP without a number behind it, since a subjective label reads the same as a real one to a model unless the input actually forces a checkable fact.",
      "Filling VIP_CRITERIA with a criteria the recipient does not actually meet, because a marketer reused the top tier's invite for a lower segment, produces a technically compliant but factually false invite that the criteria check alone cannot catch.",
      "Softening the honest alternative with a downgraded VIP synonym such as 'VIP-ish' or 'practically VIP' defeats the whole rule while reading as compliant on a quick scan.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked to write a VIP invite will use the word VIP by default regardless of whether any qualifying data was given, because the label reads as flattering and costs nothing to generate. Requiring a checkable criteria before the label is used, and substituting an honest early access framing when none exists, is what stops a marketing word from being presented as an earned status.",
  },

  article: {
    intro: [
      "A vip sale invite prompt that calls every recipient VIP is making a claim it cannot back up. VIP means nothing when it goes to the whole list, and a customer who actually spent enough, stayed loyal long enough, or bought enough to earn a real distinction can tell the difference between an earned label and a marketing habit.",
      "This prompt only uses the word VIP when given a real, checkable basis for that status, a loyalty tier name, a spend percentile, or a count of past purchases, and states that basis in the first two sentences rather than leaving it implied. When no such basis exists, it refuses the label and writes the same invite around an honest alternative framing instead, such as early access.",
    ],

    sections: [
      {
        heading: "What a vip sale invite prompt should require before writing VIP",
        body: [
          "Most VIP invites are sent to a segment that was never actually ranked against anything. The list is called VIP because it is smaller than the full list, not because anyone checked whether the recipients meet a threshold that would justify the word. A customer who has genuinely spent in the top tier notices when the same headline goes to someone who bought once, and the label loses meaning for both of them the moment that happens.",
          "The fix is a requirement upstream of the sentence: no VIP claim without a criteria that could be checked against the account record it describes. That single gate separates a status a customer can trust from one that is simply flattering.",
        ],
      },
      {
        heading: "Three real bases for VIP status",
        body: [
          "An ai prompt for vip customer email needs something to check the claim against, and in practice that is almost always one of three things: a named loyalty tier the customer has actually reached, a percentile or dollar threshold of spend over a defined period, or a count of past purchases against a stated minimum. Each of these can be looked up in an account record and survives the customer asking, in effect, why me.",
          "A criteria that cannot be looked up, such as 'engaged' or 'loyal', is not one of the three. It might be true in general, but it is not a specific reason, and a specific reason is what the invite depends on.",
        ],
        list: [
          "Loyalty tier: a named tier the customer has actually reached, such as Gold or Platinum, not a tier they are merely progressing toward.",
          "Spend percentile: a stated ranking such as top 8% of spend in the last 12 months, drawn from the same period the sale applies to.",
          "Purchase count: a stated minimum such as 15 or more orders, checkable against the order history rather than a rounded impression of it.",
        ],
      },
      {
        heading: "How to avoid a fake vip email when there's no real criteria",
        body: [
          "The harder case is when a marketer wants to send a VIP invite with no number to attach to it. Maybe the segment came from an old export, or the loyalty program launched after this list existed, or the criteria genuinely was 'people we like'. Forcing the word VIP into the subject line anyway produces an email that reads confidently while being unable to answer the one question a recipient might ask.",
          "The prompt refuses instead. If VIP_CRITERIA arrives empty, vague, or phrased as a sentiment rather than a fact, the output drops the word VIP entirely, including any near synonym implying elite status, and writes the same offer around a framing that needs no justification it cannot provide.",
        ],
      },
      {
        heading: "The honest alternative to a status you can't prove",
        body: [
          "Early access does not require a rank. It only requires that the recipient shops before the general list does, a fact about timing rather than a claim about standing. The same is true of 'a preview before the public sale' or 'first look'. These framings carry real value, arguably the value a VIP invite was reaching for in the first place, without asserting a status the sender cannot check.",
          "A generic invite generator either always says VIP or never does, and neither behaviour matches the actual state of the data behind any given send. Switching the framing based on whether a real criteria exists is what makes the output trustworthy either way.",
        ],
      },
      {
        heading: "Sale details and the access window come after the reason",
        body: [
          "Used as a chatgpt prompt for early access sale invite copy, the template treats the sale details and the access window as facts that follow the opening reason rather than facts that lead it. A discount percentage and a start time are useful, but they are not why the customer is being written to first, and putting them before the criteria buries the one sentence the whole email depends on.",
          "The access window also gives the recipient a reason to act inside it rather than assume the offer will still be there next week, which a vague 'shop early' line does not provide.",
        ],
      },
      {
        heading: "Why a fake VIP label costs more than it earns",
        body: [
          "A discount code works whether or not the invite calls someone VIP. The status claim only does extra work if the recipient believes it, and a customer who gets the same 'you're one of our VIP shoppers' line sent to thousands learns to discount the word, so the next genuinely earned status email lands with the same skepticism as the fake ones before it.",
        ],
      },
    ],

    howTo: {
      name: "How to write a vip sale invite email",
      steps: [
        {
          name: "Pull the real criteria before opening the prompt",
          text: "Check the loyalty platform or the order history for an actual tier, percentile, or purchase count. If none exists for this segment, set VIP_CRITERIA to 'none given' rather than writing one in from memory.",
        },
        {
          name: "Match the criteria to the actual segment being sent to",
          text: "A criteria copied from the top tier's invite and reused for a lower segment is worse than no criteria at all, since it states something false rather than nothing.",
        },
        {
          name: "Check the opening two sentences against the input",
          text: "The stated criteria, or the honest alternative, should appear before any sale detail. If a discount percentage comes first, the input was not strict enough to force the order.",
        },
        {
          name: "Read the mode note before sending",
          text: "The prompt states which mode it used and why. If that does not match the segment you meant to reach, the input was ambiguous and needs tightening, not the output.",
        },
      ],
    },

    faq: [
      {
        question: "What is a vip sale invite prompt for, exactly?",
        answer:
          "It writes the individual early access invite sent to a segment believed to be VIP, checking whether that belief is backed by anything real before the word appears. If a genuine criteria exists it is stated plainly; if not, the invite is written around an honest alternative instead of a false claim.",
      },
      {
        question: "What if I don't have a real percentile or tier for a customer?",
        answer:
          "Set VIP_CRITERIA to 'none given' and the prompt switches to the honest alternative framing automatically, using language like early access rather than VIP. This is usually the more accurate email anyway, since it describes what is actually happening, timing rather than rank, without asserting a status nobody verified.",
      },
      {
        question: "Is it ever okay to call someone VIP without a number attached?",
        answer:
          "Not in this prompt's design, because a status claim without a checkable basis is functionally identical to a guess, however confident it sounds. A named tier, a spend percentile, or a purchase count all survive scrutiny; a general sense of being a good customer does not.",
      },
      {
        question: "How is this different from a normal early access email template?",
        answer:
          "A template applies the same copy regardless of whether the underlying data supports it. This prompt takes the actual criteria as an input and changes the opening of the email around it, including dropping the word VIP when none was given, which a static template has no mechanism to do.",
      },
      {
        question: "Is a vip sale invite prompt worth it for a small ecommerce list?",
        answer:
          "Yes. A vip email prompt for ecommerce lists earns its keep specifically when segments are small enough that a customer would notice if criteria were copied from the top tier onto their invite by mistake, exactly the error the criteria check is designed to catch before a send goes out.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/loyalty-tier-email-prompt",
        label: "loyalty tier email prompt",
        description:
          "Applies the same refusal against an unverified figure to a loyalty threshold instead of a VIP criteria, inside the same category.",
      },
      {
        href: "/promo-prompts/flash-sale-announcement-prompt",
        label: "flash sale announcement prompt",
        description:
          "The public sale announcement that follows once the VIP early access window closes, aimed at the full list rather than one checked segment.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "Sharpens the subject line carrying the stated criteria or the honest alternative, once the body of the invite is written.",
      },
      {
        href: "/sales-prompts/renewal-conversation-prompt",
        label: "renewal conversation prompt",
        description:
          "Applies the same refuse rather than guess discipline to a renewal figure instead of a VIP criteria, from an adjacent category.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the pattern of instructing a model to state which conditional branch it took, which is what the mode note at the end of the invite is built on.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act compliance guide for business",
        description:
          "The federal standard against misleading claims in commercial email, which an unearned VIP label risks breaching regardless of how the offer itself is priced.",
      },
      {
        href: "https://www.nngroup.com/articles/personalization/",
        label: "Nielsen Norman Group: Successful personalization",
        description:
          "The usability research on why a status claim applied to the wrong individual reads as inauthentic, which is the failure mode the criteria check is designed to catch.",
      },
      {
        href: "https://hbr.org/2002/07/the-mismanagement-of-customer-loyalty",
        label: "Harvard Business Review: The mismanagement of customer loyalty",
        description:
          "The research on loyalty status losing its value once it stops correlating with genuine behaviour, which is the economic case for gating the VIP label on a real criteria.",
      },
    ],
  },
};

export default meta;

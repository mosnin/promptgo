import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "referral-request-prompt",
  name: "Referral Asker",
  title: "Referral Request Prompt",
  category: "sales-prompts",
  taskType: "generate",
  summary:
    "Checks that the customer has recently had a good reason to say yes, then writes both the ask and the paragraph they can forward untouched.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["referrals", "introductions", "customer advocacy", "account management"],

  seo: {
    primaryKeyword: "referral request prompt",
    keywords: [
      "referral request prompt",
      "how to ask a customer for a referral",
      "when to ask for a referral after a win",
      "asking for an introduction to one named person",
      "referral request email template",
      "chatgpt prompt for customer referrals",
    ],
    seoTitle: "Referral Request Prompt: Ask at the Right Moment",
    seoDescription:
      "A referral request prompt that checks for a dated proof moment before writing, names one person instead of asking who you know, and drafts the forwardable text.",
  },

  prompt: {
    text: `You are an account manager who asks for referrals rarely and successfully. You treat every ask as a withdrawal from a relationship account, so you only make one when the balance is clearly positive.

CUSTOMER: {{CUSTOMER}}
PROOF MOMENT: {{PROOF_MOMENT}}
WHO I WANT INTRODUCING TO: {{TARGET}}
WHAT I CAN OFFER BACK: {{RECIPROCITY}}

STEP ONE, the timing gate. Look at the proof moment. It must be something the customer said or did, with a date, inside the last sixty days, that shows the product worked for them. Vague satisfaction, a renewal you had to chase, or anything you inferred rather than observed does not qualify. If it fails, reply only with: "No recent proof moment. Do not ask yet." and name the two things you could do in the next month to create one.

STEP TWO, if the gate passes, produce three blocks and label them.

BLOCK A, THE ASK. Under 100 words, addressed to the customer. Reference the proof moment in its first line using their words. Request an introduction to the single target named above, never an open question about who else they know. End with one sentence that makes declining costless.

BLOCK B, THE FORWARDABLE PARAGRAPH. Written in the customer's voice, not yours, for them to paste with no edits. Under 70 words. No adjectives about my company, no positioning language, and no claim the customer did not personally observe.

BLOCK C, THE EXCHANGE. One sentence stating what the customer gets from making this introduction, drawn from the reciprocity input. If the reciprocity input is empty, say so plainly rather than inventing a benefit.`,
    variables: [
      {
        token: "CUSTOMER",
        label: "The customer you are asking",
        example: "Tom Aldiss, Head of Support at Kestrel Health, 18 months on the platform",
      },
      {
        token: "PROOF_MOMENT",
        label: "Dated evidence the product worked",
        example:
          "On 3 July he wrote in the shared channel that first response time had dropped from 9 hours to under 2 since the routing change",
      },
      {
        token: "TARGET",
        label: "The one person or tightest profile",
        example: "Nadia Frost, who runs support at Bramble Clinics and spoke alongside him at the same conference",
      },
      {
        token: "RECIPROCITY",
        label: "What the customer gets back",
        example: "Early access to the escalation dashboard and a slot on our customer panel in October",
      },
    ],
    expectedOutput:
      "Either a refusal naming two ways to create a proof moment, or three labelled blocks: an ask under 100 words opening on the customer's own words, a forwardable paragraph in their voice, and one sentence on what they get back.",
    followUps: [
      "Rewrite Block B assuming the customer is more senior than the person being introduced, so the tone reads as a favour rather than a recommendation.",
      "The customer said yes but has not sent anything in two weeks. Write the one line nudge that does not make them feel chased.",
      "Draft the message I send to the new contact immediately after the introduction lands, in under 60 words, that does not pitch.",
    ],
    pitfalls: [
      "People paste a positive quarterly review as the proof moment. A review is a scheduled meeting, not a moment of value, and the gate is right to reject it.",
      "Block B keeps drifting back into your voice. If it contains a phrase your marketing team would recognise, the model has written an advertisement for the customer to sign.",
      "If you leave the target vague, the ask degrades into the open question the prompt exists to prevent, and it will not warn you loudly enough about it.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Proof of a customer's success goes stale quickly, and a warm referral ask built on an old testimonial lands badly once usage has dropped. The sixty day rule makes recency a gate rather than a preference. Claude enforces the date check consistently, while GPT-5.2 accepts an undated proof moment unless the instruction states plainly that anything without a date fails.",
  },

  article: {
    intro: [
      "A referral request prompt is easy to write badly. Ask any model for one and you get a warm paragraph thanking the customer for their business and wondering whether they know anyone else who might benefit. That message gets read, nodded at, and never answered, because it hands the customer the hardest part of the job.",
      "Most advice on how to ask a customer for a referral treats this as a wording problem. It is a timing problem and a specificity problem. This version refuses to write anything until you can name a dated moment where the customer showed the product worked, and it will not ask an open question about their network.",
      "What comes out is two pieces of text rather than one: a short ask addressed to your customer, and a separate paragraph written in their voice that they can forward without editing a word.",
    ],

    sections: [
      {
        heading: "Open questions put the work on the wrong person",
        body: [
          "Asking who else might need this requires the customer to search their memory, judge which contacts would tolerate an introduction, and then compose a message on your behalf. Three jobs, none of which they had planned for that week. The usual outcome is a promise to have a think, which is a polite ending.",
          "Every constraint here moves that work back to you. You supply the target. You supply the words. The customer supplies one thing, which is the decision to press send.",
        ],
      },
      {
        heading: "The timing gate and what qualifies as proof",
        body: [
          "The question of when to ask for a referral after a win has a narrower answer than most playbooks admit. The window opens the moment a customer has just felt the value and closes within a few weeks, once that feeling has been absorbed into normal service and stopped being remarkable.",
          "So the gate wants a dated observation. A support thread that ended in genuine thanks, a number they quoted back to you unprompted, a renewal that went through without a negotiation. If the most recent one is four months old, the prompt declines and tells you to go create a new one instead of writing on a stale feeling.",
        ],
        list: [
          "A dated message where the customer said the thing worked. Strong.",
          "A result they quantified themselves, rather than one you calculated for them. Strongest.",
          "A renewal signed with no back and forth. Decent, and usually overlooked.",
          "A generally warm relationship. Not a proof moment, and the gate will say so.",
        ],
      },
      {
        heading: "Why the referral request prompt names one person",
        body: [
          "Asking for an introduction to one named person is a different request from asking for referrals. It can be answered in ten seconds with a yes or a no, it demonstrates that you did the looking, and it bounds the commitment instead of leaving it open ended.",
          "Where you genuinely cannot name an individual, the prompt takes the tightest profile you can describe and builds the ask around that. A named role at a named company beats an industry, and an industry beats anyone who might find this useful, which is exactly the phrasing this exists to delete.",
        ],
      },
      {
        heading: "The forwardable paragraph is the real deliverable",
        body: [
          "Block B is the part people skip and the part that determines whether anything happens. A referral request email template earns its place by being easy to forward: already written for the customer, in their register, short enough to sit above the fold, and containing nothing they would be uncomfortable saying.",
          "It is written in their voice rather than yours. No product positioning, no adjectives about your company, no metric they did not personally see. If the customer has to edit it, the friction that stopped the referral in the first place is still sitting there.",
        ],
      },
      {
        heading: "Making the ask cost the customer less",
        body: [
          "Every introduction spends a little of the customer's own credibility, and the prompt is told to acknowledge that rather than pretend the favour is free. The ask ends with an explicit line making refusal easy, which sounds like it would reduce the yes rate and does the opposite.",
          "Block C then states what the customer gets. Not necessarily an incentive, since paid referrals carry disclosure obligations, but often something simpler: an introduction in the other direction, early access, or a straightforward offer to make them look useful to the person they introduce you to.",
        ],
      },
      {
        heading: "What better wording cannot fix",
        body: [
          "A customer who is quietly unhappy will not be talked round by a well built ask, and the referral request prompt takes your proof moment on trust. Feed it a thank you note from an account whose team stopped logging in six weeks ago and you get a fluent request that costs you the relationship.",
          "It also cannot judge whether your target makes sense from the customer's side. Ask someone to vouch for you to a person whose problems they do not understand and you have asked them to take a risk on your behalf without knowing the size of it.",
        ],
      },
    ],

    howTo: {
      name: "How to run the referral ask",
      steps: [
        {
          name: "Find the dated moment",
          text: "Search the shared channel, the ticket history and your call notes for something the customer said in the last two months. Copy it with its date.",
        },
        {
          name: "Pick one target, not a category",
          text: "Name the individual you want introducing to. If you cannot, write the narrowest profile you can defend, down to role and company type.",
        },
        {
          name: "Read Block B as the customer",
          text: "Would you send this about a supplier under your own name? If any line makes you hesitate, that line is doing marketing rather than vouching.",
        },
        {
          name: "Send the ask, then wait",
          text: "One nudge after two weeks, then stop. A second chase converts almost nothing and quietly changes how the account reads your messages.",
        },
      ],
    },

    faq: [
      {
        question: "What if the referral request prompt refuses because my proof moment is too old?",
        answer:
          "Take the refusal seriously and read the two suggestions it gives you. Creating a fresh proof moment usually means shipping something the account asked for, or resolving an issue visibly and quickly. That work is worth more than a rewritten ask, and it makes the next request straightforward.",
      },
      {
        question: "Can I run this chatgpt prompt for customer referrals across my whole account list?",
        answer:
          "The writing scales but the gate does not, because finding a dated proof moment per account is manual work. In practice this suits the ten or fifteen relationships where you already know what happened last month. Running it against a full book produces refusals, which is the correct answer.",
      },
      {
        question: "Should I offer a reward for the referral?",
        answer:
          "You can, but an incentive changes the nature of the recommendation and in many jurisdictions has to be disclosed to the person being referred. The prompt keeps the exchange separate from the ask for that reason, so you can decide deliberately rather than burying it in a sentence.",
      },
      {
        question: "Why write the forwardable paragraph in the customer's voice rather than mine?",
        answer:
          "Because the recipient can tell. A paragraph that reads like supplier copy signals that the introduction was arranged rather than offered, which removes the only advantage a referral has over cold outreach. Writing it as the customer would speak keeps that advantage intact.",
      },
      {
        question: "Does this work for partner and investor introductions too?",
        answer:
          "Yes, with one change. Swap the proof moment for a recent reason the introducer has to think well of you, such as a piece of work you did that they saw. The timing gate, the single named target and the forwardable block all transfer without modification.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/follow-up-email-prompt",
        label: "follow up email prompt",
        description:
          "For the nudge when a customer agreed to make the introduction and then went quiet on you.",
      },
      {
        href: "/sales-prompts/renewal-conversation-prompt",
        label: "renewal conversation prompt",
        description:
          "Run this first. A renewal that closed without friction is one of the strongest proof moments you can use.",
      },
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "What you fall back on when no introduction is available, and the standard the referred approach has to beat.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "Useful on Block B, where any surviving supplier vocabulary gives away who really wrote the paragraph.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2003/12/the-one-number-you-need-to-grow",
        label: "Harvard Business Review: The one number you need to grow",
        description:
          "The original argument that willingness to recommend is a measurable and separate thing from satisfaction, which is why the gate asks for evidence rather than sentiment.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
        label: "FTC: Endorsement guides, what people are asking",
        description:
          "The authoritative guidance on when a rewarded recommendation has to be disclosed, which is why the exchange is kept in its own block.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the conditional gate and labelled multi block output structure that this prompt depends on to refuse cleanly.",
      },
    ],
  },
};

export default meta;

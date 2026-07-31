import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "affiliate-program-announcement-prompt",
  name: "Affiliate Recruiter",
  title: "Affiliate Program Announcement Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Announces a paid affiliate program to prospective partners with the real commission structure, who the program is built for, and a required paragraph telling affiliates they must disclose the relationship when they promote.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["affiliate marketing", "promo copy", "disclosure", "recruitment"],

  seo: {
    primaryKeyword: "affiliate program announcement prompt",
    keywords: [
      "affiliate program announcement prompt",
      "how to announce an affiliate program with ai",
      "chatgpt prompt for affiliate recruitment email",
      "affiliate email prompt that discloses commission terms",
      "affiliate recruitment prompt for bloggers and youtubers",
      "ftc disclosure prompt for affiliate programs",
    ],
    seoTitle: "Affiliate Program Announcement Prompt: State Terms Plainly",
    seoDescription:
      "An affiliate program announcement prompt that states the real commission and requires affiliates disclose the relationship, not just a recruiting pitch.",
  },

  prompt: {
    text: `You are a partnerships marketer writing an affiliate program announcement to send to prospective affiliates, not to existing customers. Your job is to recruit real applicants, so every commission figure, cap, or payout term you state has to match exactly what was supplied, never rounded up, softened, or described as unlimited when a real number exists. Because an affiliate who is compensated for promoting {{PRODUCT_OR_SERVICE}} is required under FTC guidelines to disclose that relationship to their own audience, you must also write a separate paragraph, distinct from the persuasive copy above it, telling affiliates plainly that they are required to disclose the relationship whenever they promote {{PRODUCT_OR_SERVICE}}.

PROGRAM NAME: {{PROGRAM_NAME}}
PRODUCT OR SERVICE: {{PRODUCT_OR_SERVICE}}
COMMISSION STRUCTURE: {{COMMISSION_STRUCTURE}}
WHO YOU ARE RECRUITING: {{TARGET_AFFILIATES}}
HOW TO APPLY: {{APPLICATION_PROCESS}}
TONE: {{TONE}}

Write the announcement in the tone given above. State the program name, what affiliates will be promoting, the commission structure exactly as supplied, who the program is built for, and the exact steps to apply, in that order. End with the disclosure requirement paragraph as its own block, not folded into the pitch above it. Do not invent a commission percentage, a cap, a cookie window, or a payout schedule that was not given. If the commission structure is missing, refuse to write the announcement and say only which input is missing.`,
    variables: [
      {
        token: "PROGRAM_NAME",
        label: "The affiliate program's name",
        example: "Lumen CRM Partner Program",
      },
      {
        token: "PRODUCT_OR_SERVICE",
        label: "What affiliates will be promoting",
        example: "Lumen CRM, a customer relationship tool built for small sales teams",
      },
      {
        token: "COMMISSION_STRUCTURE",
        label: "The real commission, including duration and any cap",
        example: "20 percent recurring commission for the first 12 months of a referred customer's subscription",
      },
      {
        token: "TARGET_AFFILIATES",
        label: "Who this program is recruiting",
        example: "SaaS review bloggers, YouTube channels covering sales tools, and existing customers who want to refer other small businesses",
      },
      {
        token: "APPLICATION_PROCESS",
        label: "The real steps to apply",
        example: "Apply through the partner portal, submit your audience size and main platform, and expect a decision within 5 business days",
      },
      {
        token: "TONE",
        label: "The tone the announcement should be written in",
        example: "Professional and direct, not hypey",
      },
    ],
    expectedOutput:
      "An announcement in the given tone that states the program name, what affiliates will promote, the commission structure exactly as supplied, who the program is built for, and the real application steps, followed by a separate paragraph telling affiliates they must disclose the paid relationship whenever they promote the product. If the commission structure is missing, a plain refusal naming the gap, with no announcement written.",
    followUps: [
      "Shorten this to a single paragraph for an existing customer email list, keeping the disclosure line intact.",
      "Here is our actual cookie window, 30 days from first click. Add it to the commission structure without lengthening the application section.",
      "Write the version of this for affiliates who already applied once and were rejected for having no audience data, without sounding discouraging.",
    ],
    pitfalls: [
      "Teams often supply a commission structure like generous commission, apply to find out rather than a real percentage and duration. A prospective affiliate cannot evaluate an offer they cannot do arithmetic on, so a vague structure produces an announcement nobody can act on, only one that sounds like it might be worth a click.",
      "The disclosure requirement is the part a naive prompt skips entirely, because it reads as friction inside a recruiting pitch. Leaving it out does not remove the affiliate's legal obligation to disclose, it just means they learn about it after they have already posted something that should have carried a disclosure.",
      "APPLICATION_PROCESS supplied as vaguely as reach out to us produces an announcement with no real next step, which is the exact moment a genuinely interested affiliate gives up and applies to a competing program with a working form instead.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to announce an affiliate program, a model optimises for enthusiasm: a confident sounding commission, urgency to apply, no mention of what an affiliate is legally required to tell their own audience once they start promoting. Requiring the disclosure requirement as a distinct, mandatory paragraph rather than an optional legal footer is what keeps a paid promotional relationship from being announced as though it needs no acknowledgment the moment an affiliate posts about it.",
  },

  article: {
    intro: [
      "An affiliate program announcement prompt is not a referral email wearing a different subject line. A referral message goes to an existing customer who might mention a brand to one friend. This one recruits an outside partner, a blogger, a YouTuber, a course creator, someone with an audience the brand does not own, to promote a product on an ongoing, compensated basis, built around a different set of facts: the real commission, who qualifies, and how to apply.",
      "It is also the one place a naive prompt fails legally, not just stylistically. Affiliate marketing in the United States sits under the FTC's Endorsement Guides, and an affiliate paid to promote a product must disclose that relationship to their own audience. This affiliate program announcement prompt treats that disclosure as part of the job, not a compliance note bolted on afterward: it requires a concrete commission structure, a named audience, a real application process, and a separate paragraph telling affiliates plainly that they must disclose the relationship when they promote.",
    ],

    sections: [
      {
        heading: "Recruiting affiliates is not the same job as a referral email",
        body: [
          "A referral program pays an existing customer for one introduction and stops. An affiliate program pays a partner on an ongoing basis for however many customers they bring, often for the life of the relationship. The audience differs too: a referral email reaches someone who already uses the product, while an affiliate announcement reaches a stranger whose entire relationship to the product is the pitch in front of them, so it needs the actual commission structure and application steps, not a friendly nudge.",
        ],
      },
      {
        heading: "What an affiliate program announcement prompt actually checks",
        body: [
          "For how to announce an affiliate program with ai without losing the compliance line, the prompt takes six inputs: the program name, the product or service, the commission structure, who is being recruited, how to apply, and the tone. Every one has to be a real value; a commission supplied as competitive rates, contact us to discuss produces an announcement with nothing to decide on. Run as a chatgpt prompt for affiliate recruitment email, the output states the commission exactly as given and lists the real steps to apply before it reaches the disclosure paragraph most templates skip entirely.",
        ],
      },
      {
        heading: "Why the FTC disclosure requirement belongs in the announcement, not an afterthought",
        body: [
          "The FTC's Endorsement Guides, codified at 16 CFR Part 255, require that an endorsement disclose any material connection between the endorser and the brand, and a commission counts as exactly that. An affiliate who recommends a product while being paid to do so must say so, clearly and near the recommendation, not buried in a bio link. An affiliate email prompt that discloses commission terms to the affiliate is only half the job if it does not also tell them what they owe their own audience, so this prompt writes that requirement as its own paragraph, separate from the pitch above it.",
        ],
        list: [
          "State that affiliates must disclose the relationship whenever they promote the product.",
          "Keep the disclosure requirement in its own paragraph, not folded into the commission line.",
          "Never describe a paid relationship as unpaid, gifted, or an unsponsored mention.",
        ],
      },
      {
        heading: "The commission structure has to be a real number, not a teaser",
        body: [
          "Twenty percent recurring for twelve months is a structure a prospective affiliate can evaluate against the time a recommendation costs them. Generous payouts is a placeholder for a number nobody has committed to, and an affiliate who cannot estimate their return cannot decide whether the relationship is worth disclosing to their own audience. The same discipline applies to caps and cookie windows: if a program pays only within a 30 day window, that belongs in the commission structure input, not a terms page read after the applicant has already agreed to promote.",
        ],
      },
      {
        heading: "Who you are actually recruiting changes the pitch",
        body: [
          "An affiliate recruitment prompt for bloggers and youtubers cannot use the same register as one aimed at existing customers turned part time promoters. A blogger evaluating a dozen offers a week reads for the commission number first; an existing customer being invited to formalise into a paid affiliate reads for whether the brand trusts them with one at all. Naming the target audience precisely, rather than defaulting to anyone interested, lets the tone match the reader instead of trying to persuade both at once.",
        ],
      },
      {
        heading: "What this prompt cannot do",
        body: [
          "It cannot make a program with a low, uncompetitive commission sound generous by writing around the number, and it does not replace a legal review of the program's actual terms. An FTC disclosure prompt for affiliate programs like this one states the general obligation to disclose a paid relationship; it does not draft platform specific disclosure language for every network, and a program with affiliates outside the United States may have additional rules this prompt does not check.",
        ],
      },
    ],

    howTo: {
      name: "How to write the affiliate program announcement",
      steps: [
        {
          name: "Get the real commission structure before opening the prompt",
          text: "Pull the exact percentage or flat amount, the duration, and any cap from whoever owns the program's economics, not from a pitch deck headline.",
        },
        {
          name: "Name exactly who you are recruiting",
          text: "Bloggers, YouTube channels in a specific niche, existing customers, or all three, stated plainly rather than left as anyone interested, so the tone matches the reader.",
        },
        {
          name: "Run the prompt and confirm the disclosure paragraph survived",
          text: "Check the output includes a separate paragraph telling affiliates they must disclose the relationship when they promote. If it reads trimmed for space, put it back before sending.",
        },
        {
          name: "Route every applicant through the real application process",
          text: "Confirm the steps in the announcement match what actually happens when someone applies, so a new affiliate's first experience with the program is not a broken link.",
        },
      ],
    },

    faq: [
      {
        question:
          "Why does an affiliate program announcement prompt insist on a disclosure paragraph instead of just recruiting well?",
        answer:
          "Because recruiting well and disclosing correctly are not the same job, and skipping the second moves risk onto the affiliate. Under the FTC's Endorsement Guides, the affiliate promoting a product for a commission is the one required to disclose it, so an announcement that never mentions this leaves them to find out only after posting something that should have carried a disclosure.",
      },
      {
        question: "How is this different from the referral program copy prompt already on the site?",
        answer:
          "A referral program copy prompt writes to an existing customer who might refer one friend, stating the reward and its conditions in a single paragraph. This prompt writes to an outside partner entering an ongoing, compensated relationship, and its core requirement differs: stating the commission clearly and requiring affiliates be told to disclose it, which a customer referral rarely needs to mention.",
      },
      {
        question: "What if the commission percentage is not finalised yet?",
        answer:
          "Wait until it is. A placeholder like competitive commission produces an announcement nobody can act on, since a prospective affiliate who cannot estimate their return has no basis to decide whether recruiting their audience is worth it. The prompt refuses when this input is missing rather than inventing a number to fill the gap.",
      },
      {
        question: "Can I use this to recruit YouTubers specifically, or is it built for any affiliate?",
        answer:
          "Either. Naming the target audience precisely, YouTubers covering a specific niche rather than anyone interested, changes the tone and the detail the announcement includes, so state the actual audience you are recruiting rather than leaving the field generic and expecting the prompt to guess.",
      },
      {
        question: "Does mentioning the FTC disclosure requirement make the announcement sound like a legal notice?",
        answer:
          "Not if it is written as one clear paragraph in ordinary language rather than a clause. Telling an affiliate that their audience needs to know when a link earns them a commission reads as practical guidance, not legal boilerplate, and it protects the affiliate as much as the brand issuing the announcement.",
      },
      {
        question: "Is this a substitute for a lawyer reviewing the affiliate program's actual terms?",
        answer:
          "No. The prompt states the general obligation to disclose a paid relationship, accurate and drawn from the FTC's published guidance, but it does not review a program's contract, tax treatment, or terms for a specific jurisdiction, which a program launching at any real scale should still have reviewed separately.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/referral-program-copy-prompt",
        label: "referral program copy prompt",
        description:
          "The customer facing give and get version of this idea, written for someone who already uses the product rather than an outside partner being recruited to promote it for a commission.",
      },
      {
        href: "/promo-prompts/giveaway-rules-terms-prompt",
        label: "giveaway rules terms prompt",
        description:
          "The same refusal to fill a required disclosure with generic boilerplate, applied to how a giveaway winner is actually chosen rather than how a paid promotion must be disclosed.",
      },
      {
        href: "/marketing-prompts/influencer-outreach-prompt",
        label: "influencer outreach prompt",
        description:
          "For approaching one specific creator individually before a program exists, a different job from announcing a standing affiliate program to many prospective partners at once.",
      },
      {
        href: "/marketing-prompts/press-release-prompt",
        label: "press release prompt",
        description:
          "For announcing news to media and the public, a different audience and a different disclosure standard from recruiting paid affiliates directly.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
        label: "FTC: Endorsement Guides, what people are asking",
        description:
          "The FTC's own guidance on affiliate and network marketing disclosure, including that a commission or payment counts as a material connection an affiliate must disclose to their audience.",
      },
      {
        href: "https://www.govinfo.gov/app/details/CFR-2023-title16-vol1/CFR-2023-title16-vol1-part255",
        label: "GovInfo: 16 CFR Part 255",
        description:
          "The codified text of the FTC's Guides Concerning the Use of Endorsements and Testimonials in Advertising, the regulation this prompt's disclosure requirement is built around.",
      },
      {
        href: "https://business.cornell.edu/news/2018/08/14/disclosing-sponsored-content-consumer-trust/",
        label: "Cornell SC Johnson College of Business: disclosing sponsored content and consumer trust",
        description:
          "Research on how sponsorship disclosure affects audience trust, relevant to why the disclosure paragraph is written as practical guidance rather than a legal notice.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the pattern of a mandatory output block paired with a refusal condition that this prompt depends on to keep the disclosure paragraph from being trimmed out.",
      },
    ],
  },
};

export default meta;

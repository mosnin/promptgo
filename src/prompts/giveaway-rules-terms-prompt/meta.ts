import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "giveaway-rules-terms-prompt",
  name: "Giveaway Rules Writer",
  title: "Giveaway Rules Terms Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Drafts giveaway and contest rules that state how a winner is actually chosen in plain language near the top, and refuses to fill gaps with generic legal boilerplate.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["giveaway", "contest", "rules", "promotions", "compliance"],

  seo: {
    primaryKeyword: "giveaway rules terms prompt",
    keywords: [
      "giveaway rules terms prompt",
      "how to write giveaway rules for a social media contest",
      "ai prompt for sweepstakes terms and conditions",
      "how to state the odds of winning a giveaway",
      "giveaway rules template with eligibility restrictions",
      "chatgpt prompt for contest rules disclaimer",
    ],
    seoTitle: "Giveaway Rules Terms Prompt: State The Real Odds",
    seoDescription:
      "A giveaway rules terms prompt that states the real odds mechanism, entry method, eligibility and prize details plainly near the top, not buried in boilerplate.",
  },

  prompt: {
    text: `You are a promotions copy assistant drafting plain language rules for a giveaway or contest. This is a drafting aid, not legal advice, and it does not replace review by a lawyer licensed in the sponsor's jurisdiction.

SPONSOR: {{SPONSOR}}
ENTRY METHOD: {{ENTRY_METHOD}}
HOW A WINNER IS ACTUALLY CHOSEN: {{ODDS_MECHANISM}}
ELIGIBILITY RESTRICTIONS: {{ELIGIBILITY}}
PRIZE DETAILS: {{PRIZE_DETAILS}}
ENTRY PERIOD: {{ENTRY_PERIOD}}

Produce the rules in five parts, in this order: a one paragraph plain language summary that names the entry method, the odds mechanism and the prize in its first two sentences; the full eligibility section; the full entry method section; the winner selection section, restating the odds mechanism above exactly as given, never softened into a vaguer stock phrase when a specific method or number was provided; and the prize section with the exact value stated. Do not invent a mechanism, a date, a value or a restriction that was not supplied. If any of the six inputs above is missing or too vague to state plainly, stop and list what is missing instead of filling the gap with generic boilerplate. Close every draft with a note that it needs review by a lawyer licensed in the sponsor's jurisdiction before publication.`,
    variables: [
      {
        token: "SPONSOR",
        label: "Who is legally running the giveaway",
        example: "Marigold Coffee Roasters LLC, a company based in Portland, Oregon",
      },
      {
        token: "ENTRY_METHOD",
        label: "Exactly how someone enters",
        example: "Follow @marigoldcoffee on Instagram and comment on the giveaway post naming a friend",
      },
      {
        token: "ODDS_MECHANISM",
        label: "How a winner is actually selected",
        example:
          "After entries close, every unique commenter is assigned a number and one winner is picked using a random number generator",
      },
      {
        token: "ELIGIBILITY",
        label: "Who can and cannot enter",
        example:
          "Open to legal residents of the United States aged 18 or older, excluding employees of Marigold Coffee Roasters and their immediate family",
      },
      {
        token: "PRIZE_DETAILS",
        label: "What is won and its exact value",
        example: "One 75 dollar gift card to Marigold Coffee Roasters, not transferable and not redeemable for cash",
      },
      {
        token: "ENTRY_PERIOD",
        label: "Exact open and close date and time",
        example: "Opens August 4 2026 at 9am Pacific, closes August 18 2026 at 11:59pm Pacific",
      },
    ],
    expectedOutput:
      "Five clearly labelled sections opening with a plain language summary that names the entry method, the exact odds mechanism and the prize in its first two sentences, followed by eligibility, entry method, a winner selection section restating the given mechanism verbatim, prize details with an exact value, and a closing note that the draft needs review by a lawyer in the sponsor's jurisdiction before publication.",
    followUps: [
      "Rewrite the plain language summary as a single sentence short enough to sit above the fold on a landing page without dropping the odds mechanism.",
      "The sponsor operates in three states with different prize value thresholds. Flag which sections need a state by state addendum.",
      "Turn the winner selection section into a short numbered procedure a staff member could follow without the marketing language.",
    ],
    pitfalls: [
      "A model asked for generic contest rules defaults to stock phrasing, winners will be selected at random from all eligible entries, even when a specific method and timing were supplied. Requiring the winner selection section to restate the given mechanism verbatim, not paraphrase it, is what stops that substitution.",
      "Putting the odds mechanism only in the dense winner selection section and leaving it out of the opening summary is the exact failure this prompt exists to prevent. Rules an entrant has to read six paragraphs into before finding out how a winner gets picked are rules in name only.",
      "Treating the output as finished copy is a mistake. It is a structured draft built strictly from what was supplied, and sweepstakes and contest law differs by state and by whether the promotion is skill based or chance based, which is exactly why the disclaimer at the end is load bearing and not decoration.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked to draft sweepstakes rules from a short brief reaches for stock legal phrasing, winners selected at random from all eligible entries, regardless of the actual mechanism supplied, and places that phrasing under eligibility clauses an entrant is unlikely to read in full. Naming the odds mechanism as a required input and forcing it into the opening summary, restated verbatim rather than paraphrased, is the constraint that keeps the stated method matching the real one and keeps it visible before the dense legal detail begins.",
  },

  article: {
    intro: [
      "A giveaway rules terms prompt that outputs the same boilerplate for every giveaway is describing a mechanism it never checked, not the rules for the giveaway actually running. Real giveaways are entered through a specific method, close on a fixed date, and pick a winner through one particular mechanism, and rules that do not state that mechanism plainly near the top have failed the one entrant who actually reads before entering.",
      "This prompt takes the real entry method, the real odds mechanism, the eligibility restrictions and the prize details as required inputs, and refuses to fill any gap with phrasing borrowed from a generic template. It puts how the winner is actually chosen in the first two sentences instead of six paragraphs down, and it is a drafting aid rather than legal advice: every draft closes with a note that a lawyer should review it for the sponsor's jurisdiction before it goes live.",
    ],

    sections: [
      {
        heading: "Why giveaway rules bury the odds mechanism",
        body: [
          "Most contest rules templates open with definitions and eligibility boilerplate and leave the winner selection method for a paragraph near the end, written in the same dense register as everything around it. An entrant skimming for the one fact that matters, how does someone actually win, has to read past sponsor identification, release language and void where prohibited clauses first.",
          "Knowing how to state the odds of winning a giveaway plainly, in the same paragraph as the entry method, is the single change that turns a legal document into rules a reader can actually use. It costs nothing and it is the part almost every template gets wrong by putting last what an entrant looks for first.",
        ],
      },
      {
        heading: "The six inputs a giveaway rules terms prompt requires",
        body: [
          "A model given a one line request for giveaway rules will produce something that reads correctly and describes a giveaway that does not exist. The fix is not a better instruction, it is refusing to run without the specific facts that make the rules true of this giveaway rather than a plausible one.",
        ],
        list: [
          "Sponsor, the legal entity actually running the promotion",
          "Entry method, the exact action that counts as an entry",
          "Odds mechanism, precisely how a winner gets picked from the entries",
          "Eligibility restrictions, who is excluded by age, location or relationship to the sponsor",
          "Prize details, what is won and its exact value",
          "Entry period, the exact open and close date and time",
        ],
      },
      {
        heading: "Writing the odds mechanism precisely, not vaguely",
        body: [
          "How to write giveaway rules for a social media contest starts with naming the platform action, a follow and a comment, a share, a tag, and then the exact method used to pick a winner from among those entries, a random number generator run after a stated close time, a manual draw witnessed by a named staff member, or the first entry meeting a stated condition.",
          "An ai prompt for sweepstakes terms and conditions is only useful if it is built to refuse invented terms rather than to produce a plausible sounding document from a one line request. This prompt requires the mechanism as a named input and then restates it verbatim in the winner selection section, so a numbered draw described in the input cannot come back out as a vague random selection.",
        ],
      },
      {
        heading: "Eligibility restrictions are not optional decoration",
        body: [
          "Age, residency, and exclusion of the sponsor's employees and their immediate family are the three restrictions almost every promotion needs, and each one has to be a real, checkable fact rather than a placeholder. A giveaway rules template with eligibility restrictions copied from an example rather than the sponsor's own list is the most common way rules pass a skim and fail the one entrant who lives outside the eligible region or works for a related company.",
          "Void where prohibited is a real legal phrase, but it does not excuse leaving out a restriction the sponsor already knows applies. If a promotion is only open to one country or one age band, the prompt requires that stated explicitly rather than folded into a general disclaimer.",
        ],
      },
      {
        heading: "The prize section needs a number, not an adjective",
        body: [
          "A prize described as amazing or a great gift card is not a prize description, it is marketing copy sitting where a legal fact belongs. The prize section states what is won, its approximate retail value, and whether it can be substituted or exchanged for cash, because several states require that value to be disclosed accurately.",
        ],
      },
      {
        heading: "This is a drafting aid, not legal advice",
        body: [
          "A chatgpt prompt for contest rules disclaimer earns that description only if the disclaimer is not the only thing it gets right, since a legally reviewed sounding disclaimer attached to fabricated eligibility terms is worse than no disclaimer at all. The closing note in every draft says plainly that a lawyer licensed in the sponsor's jurisdiction needs to review the rules before they go live.",
          "That review matters in practice, not just in principle. Several states require registration and a bond or trust account for promotions above a stated prize value, and the threshold and the process differ by state. A drafting prompt can produce a structured, honest starting point. It cannot know which state's registration rules apply to a specific sponsor and prize value, and it should not pretend to.",
        ],
      },
    ],

    howTo: {
      name: "How to use the giveaway rules terms prompt",
      steps: [
        {
          name: "Gather all six real inputs before you start",
          text: "Sponsor, entry method, odds mechanism, eligibility restrictions, prize details and entry period. If any one of these is not decided yet, decide it first rather than letting the prompt guess.",
        },
        {
          name: "Write the odds mechanism in your own words first",
          text: "So you can check the draft restated it rather than softened it. A numbered random draw described in the input should never come back as a vague at random from all eligible entries.",
        },
        {
          name: "Check the plain language summary leads with the mechanism",
          text: "The first two sentences of the output should tell an entrant how to enter and how a winner gets picked, before any eligibility clause appears.",
        },
        {
          name: "Compare eligibility against the sponsor's actual restrictions",
          text: "Confirm every exclusion the sponsor actually intends, state, country, age, employee relationship, is present and none has been invented or dropped.",
        },
        {
          name: "Send the draft for legal review before publishing",
          text: "The closing disclaimer is a reminder, not a substitute. Prize value thresholds and registration requirements differ by state and need a lawyer familiar with the sponsor's jurisdiction.",
        },
      ],
    },

    faq: [
      {
        question: "Is a giveaway rules terms prompt a substitute for a lawyer?",
        answer:
          "No. It produces a structured, honest draft built from the facts supplied, but several states require registration and a bond or trust account for promotions above a stated prize value, and the threshold and process differ by state. Review by a lawyer licensed in the sponsor's jurisdiction is required before the rules are published, not optional.",
      },
      {
        question: "What counts as the odds mechanism if entries are first come first served?",
        answer:
          "State it exactly as that: the first stated number of eligible entries received after the entry period opens win, with the exact cutoff and how ties at the cutoff are broken. First come first served is still a specific mechanism and needs to be described as precisely as a random draw would be.",
      },
      {
        question: "Do giveaway rules need no purchase necessary language?",
        answer:
          "If entry never requires buying anything, stating that plainly protects the sponsor and reassures entrants the promotion is a sweepstakes rather than an unlawful lottery, which in most jurisdictions requires payment, chance and a prize together. If a purchase is genuinely required, that also needs to be stated rather than implied.",
      },
      {
        question: "Can I use this for an Instagram or TikTok giveaway?",
        answer:
          "Yes. Describe the platform action in the entry method field, a follow and comment, a share, a duet, and the prompt writes rules around it. The platform's own promotion guidelines still apply on top of this, including requirements to release the platform from responsibility and never imply the giveaway is sponsored by it.",
      },
      {
        question: "What if I do not know the exact prize value yet?",
        answer:
          "Find it out before running the prompt. Several states require prizes to be valued accurately in the rules, and a placeholder value is exactly the kind of gap this prompt is built to refuse rather than fill with a rounded guess.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/win-back-campaign-prompt",
        label: "win back campaign prompt",
        description: "Another promo prompt that requires real numbers as input rather than manufactured urgency.",
      },
      {
        href: "/promo-prompts/referral-program-copy-prompt",
        label: "referral program copy prompt",
        description: "For the ongoing referral mechanic that often runs alongside a one off giveaway.",
      },
      {
        href: "/marketing-prompts/press-release-prompt",
        label: "press release prompt",
        description: "For announcing a giveaway winner publicly once the rules and the draw are settled.",
      },
      {
        href: "/marketing-prompts/social-media-caption-prompt",
        label: "social media caption prompt",
        description: "Writes the entry post itself, which needs the same entry method stated here to stay accurate.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/business-guidance/resources/com-disclosures-how-make-effective-disclosures-digital-advertising",
        label: "FTC: .com Disclosures guidance",
        description: "The federal standard for making a required disclosure clear and conspicuous rather than buried, which underlies the plain language summary requirement.",
      },
      {
        href: "https://www.fdacs.gov/Business-Services/Game-Promotions-Sweepstakes",
        label: "Florida Department of Agriculture and Consumer Services: Game Promotions",
        description: "Documents Florida's registration and bonding requirement for promotions offering prizes over a stated value, cited for the legal review note.",
      },
      {
        href: "https://dos.ny.gov/games-chance-registration",
        label: "New York Department of State: Games of Chance Registration",
        description: "A second state's registration requirement, cited to show the threshold and process genuinely differ by jurisdiction rather than following one federal rule.",
      },
      {
        href: "https://help.instagram.com/179379842258600",
        label: "Instagram: Promotion Guidelines",
        description: "The platform specific rules a giveaway run on Instagram must also follow, referenced in the FAQ on social media giveaways.",
      },
    ],
  },
};

export default meta;

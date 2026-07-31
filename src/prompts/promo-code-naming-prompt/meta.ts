import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "promo-code-naming-prompt",
  name: "Code Namer",
  title: "Promo Code Naming Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Turns a discount and a campaign theme into ranked promo code candidates that are easy to say out loud and type correctly, rather than handing off the job a random string generator already does.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["promo codes", "branding", "ecommerce", "copywriting"],

  seo: {
    primaryKeyword: "promo code naming prompt",
    keywords: [
      "promo code naming prompt",
      "how to name a promo code",
      "chatgpt prompt for discount code names",
      "ai prompt for coupon code names",
      "memorable promo code ideas generator",
      "easy to say and type promo code examples",
    ],
    seoTitle: "Promo Code Naming Prompt: Say It, Type It, Redeem It",
    seoDescription:
      "A promo code naming prompt that turns a discount and a campaign theme into ranked candidates, each checked for ambiguous characters and awkward pronunciation.",
  },

  prompt: {
    text: `You are a promo code naming specialist, a different job entirely from drawing a random string of characters. Given the discount and the campaign theme below, you generate promo code candidates a customer can say out loud, type correctly from a receipt, and still recall a week later.

DISCOUNT: {{DISCOUNT}}
CAMPAIGN THEME: {{CAMPAIGN_THEME}}
BRAND OR PRODUCT NAME: {{BRAND_NAME}}
MAXIMUM LENGTH: {{MAX_LENGTH}} characters, prefix included
CODES ALREADY IN USE, DO NOT REPEAT: {{AVOID}}
BRAND VOICE: {{TONE}}

Produce five ranked candidate codes in capital letters, each within MAXIMUM LENGTH and each distinct from anything listed in CODES ALREADY IN USE. For every candidate, give one line of reasoning stating what in the discount, the theme or the brand name it reflects, and why it reads and speaks cleanly.

Hard rule. Reject any candidate that pairs the digit 0 with the letter O, the digit 1 with the letter I or the letter L, or any other digit and letter a person would misread from a receipt or a screenshot. Reject any candidate with three or more consonants in a row that a typical speaker would stumble reading aloud, unless that string is already a familiar brand abbreviation. Rank the five from strongest to weakest, and for the top candidate state specifically why it beats the runner up.`,
    variables: [
      {
        token: "DISCOUNT",
        label: "The real discount the code will apply",
        example: "20% off, applied automatically at checkout",
      },
      {
        token: "CAMPAIGN_THEME",
        label: "Campaign name or theme the code should evoke",
        example: "Spring bloom collection launch, first two weeks of April",
      },
      {
        token: "BRAND_NAME",
        label: "Brand or product name, if it should be reflected in the code",
        example: "Petal and Co",
      },
      {
        token: "MAX_LENGTH",
        label: "Maximum characters the code can be, prefix included",
        example: "10",
      },
      {
        token: "AVOID",
        label: "Codes already in use or reserved that new candidates must not repeat",
        example: "SPRING10 and BLOOM15 were both used last year and cannot be reissued",
      },
      {
        token: "TONE",
        label: "Brand voice the codes should sound like",
        example: "Playful and a little cheeky, never twee",
      },
    ],
    expectedOutput:
      "Five ranked promo code candidates in capital letters, each within the length limit and distinct from any code already in use, each with one line explaining what it reflects from the discount or theme and why it is easy to say and type, plus a note on why the top candidate beats the second.",
    followUps: [
      "Two of these get mixed up with our SKU prefixes over the phone. Regenerate excluding any candidate that starts with the same three letters as an existing SKU.",
      "Turn the top candidate into a matching subject line and a short social caption, keeping the same MAX_LENGTH discipline in mind.",
      "The discount just moved from 20 percent to 25 percent. Regenerate the batch with the new DISCOUNT and confirm none of the previous winners still make sense unchanged.",
    ],
    pitfalls: [
      "Leaving AVOID empty when codes already exist elsewhere in the business produces a candidate that collides with a reserved or already redeemed code, which fails quietly at checkout instead of in the review.",
      "Setting MAX_LENGTH generously, twenty characters or more, removes the constraint that forces short, sayable candidates, and the model drifts back toward long descriptive strings nobody types twice.",
      "Approving the candidate that simply looks best on the page skips the actual check, since the reasoning line is where the ambiguous character rule and the pronunciation rule actually get applied, not the capital letters alone.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked to name a promo code will often default to the exact discount spelled out against a random alphanumeric tail, because neither choice requires weighing how the result sounds spoken aloud or looks typed from a receipt. Requiring five ranked candidates with a stated reason, and rejecting pairs like the digit zero next to the letter O outright, is what stops a code that looks fine on a design mockup from being misread at a register or misdialled into a phone order.",
  },

  article: {
    intro: [
      "A promo code naming prompt turns a discount and a campaign theme into candidates a customer can actually say out loud and type correctly, which is a different job from the random string a generator produces on demand. Twenty percent off a spring sale becomes SPRING20 or BLOOM20, not a nine character block of letters and digits nobody would guess twice.",
      "The naming job and the random string job solve different problems and get confused constantly. A generator produces a code nobody could predict, useful for single use or fraud resistant codes. A campaign code exists to be remembered and repeated in conversation, which requires a candidate built from the discount and the theme rather than drawn at random.",
    ],

    sections: [
      {
        heading: "What a promo code naming prompt is for",
        body: [
          "Most promo codes are named in about thirty seconds by whoever is setting up the discount, and the result is whatever combination of the percentage and the season came to mind first. SPRING20 is fine. SPRNG2O, with a zero standing in for the letter O, is not, and the difference is invisible until a customer tries to redeem it.",
          "This prompt is built for the naming decision specifically, not the mechanical generation of a unique string, and works as a chatgpt prompt for discount code names for any model that follows structured instructions. It takes the real discount and the real campaign theme as required inputs and returns ranked options, each with a stated reason, so the choice is a review rather than a guess.",
        ],
      },
      {
        heading: "Turning the discount and the theme into real candidates",
        body: [
          "How to name a promo code starts with treating the discount and the theme as raw material, not decoration. A twenty percent spring sale gives a namer several honest directions: the number, the season, the product category, or the brand name if it is short enough to carry a suffix.",
          "The prompt draws candidates from what was actually given, not a generic promo vocabulary. A theme described as a spring bloom collection launch should produce something closer to BLOOM20 or PETAL20 than a placeholder like SAVE20, which would fit any sale a business has ever run.",
        ],
        list: [
          "Number led: SPRING20, the discount stated plainly against the season.",
          "Theme led: BLOOM20, the campaign concept carried into the code.",
          "Brand led: PETAL20, the brand name shortened and paired with the number.",
          "Occasion led: EARLYBIRD, used when the discount rewards timing rather than a fixed percentage.",
        ],
      },
      {
        heading: "The two checks every candidate has to pass: say it, type it",
        body: [
          "A candidate that reads cleanly on screen can still fail in a customer's hand, read off a printed receipt or repeated to a partner over the phone. The prompt runs every candidate through two checks before it is allowed to rank, one for speech and one for typing, producing easy to say and type promo code examples instead of a single untested guess.",
          "The typing check is a hard rule against letter and digit pairs that are genuinely ambiguous in most fonts and handwriting: zero next to O, one next to I or L, and any similar pair a person would misread from a screenshot. The speech check rejects strings with three or more consonants in a row that a typical reader would stumble over, unless the string is already a familiar brand abbreviation.",
        ],
      },
      {
        heading: "Ranking candidates instead of settling on one",
        body: [
          "An ai prompt for coupon code names is only useful if it gives you something to choose between, which is why the output is five ranked candidates, not one best guess. Each carries one line of reasoning: what it reflects from the discount, theme or brand name, and why it passed the two checks above.",
          "The reasoning line matters more than the ranking number. A candidate that looks strongest but has thin reasoning, or skipped the ambiguous character check, should be moved down manually rather than accepted for appearing first. The ranking is a starting point for a decision, not the decision itself.",
        ],
      },
      {
        heading: "Keeping candidates clear of what already exists",
        body: [
          "A campaign code that accidentally repeats one already redeemed in a previous sale either gets rejected at checkout or, worse, silently reactivates an old discount at the wrong price. The AVOID input carries that list forward so the prompt is not told the same history twice.",
          "A candidate distinctive enough to double as a short slogan is worth a quick trademark search before it goes live in paid ads, since a coined word can already belong to someone else.",
        ],
      },
      {
        heading: "When a random string is the right answer instead",
        body: [
          "Not every code needs a name. Single use codes, referral codes tied to one account, or fraud resistant codes are better served by a dedicated promo code generator tool that draws from a proper random source and guarantees no duplicates in a batch. Chasing memorability in a code nobody is meant to remember is wasted effort.",
          "This prompt covers the opposite case: one code, shared broadly, meant to be repeated in an email subject line, a social caption or word of mouth. Confusing the two jobs produces either an unmemorable mass code or a guessable single use one.",
        ],
      },
    ],

    howTo: {
      name: "How to use the promo code naming prompt",
      steps: [
        {
          name: "Confirm the real discount and the real theme",
          text: "Pull the actual percentage or offer and the actual campaign name from whoever owns the promotion, not a placeholder written before the campaign was finalised.",
        },
        {
          name: "List every code already in use",
          text: "Check the cart platform for reserved and previously redeemed codes and put them in AVOID, so a ranked candidate cannot quietly collide with one.",
        },
        {
          name: "Set a length limit that fits every channel",
          text: "A code has to fit a text message and a social caption, not just an email. Ten to twelve characters, prefix included, keeps it readable everywhere.",
        },
        {
          name: "Read the reasoning line before picking a winner",
          text: "Do not default to candidate one. Check the top ranked option actually passed the ambiguous character and pronunciation checks, not just that it looks good.",
        },
        {
          name: "Say the winner out loud and type it from a printout",
          text: "A final manual check catches anything the two rules missed, since a candidate can pass both checks and still feel awkward in an actual sentence.",
        },
      ],
    },

    faq: [
      {
        question: "How is a promo code naming prompt different from a promo code generator?",
        answer:
          "A generator draws a random string from a character set to produce a code nobody could predict, the right tool for single use or fraud resistant codes. This prompt works as a memorable promo code ideas generator instead, building on brand candidates from a real discount and a real campaign theme, meant to be shared broadly and repeated from memory.",
      },
      {
        question: "Why does the prompt reject codes with a zero next to the letter O?",
        answer:
          "In most fonts, and especially in handwriting or a low resolution screenshot, a zero and a capital O are functionally identical, and a customer who copies the wrong one gets an invalid code with no obvious reason why. The same logic applies to the digit one against the letters I and L, which is why the rule covers both pairs.",
      },
      {
        question: "What if my campaign theme does not lend itself to an obvious word?",
        answer:
          "Give the prompt whatever detail exists, even a rough one, since a partial theme like a colour or an occasion still gives it more to work with than the discount number alone. The five candidates will lean harder on the number or the brand name when the theme is thin, a legitimate fallback rather than a failure.",
      },
      {
        question: "Can I use this for a code my brand voice wants to sound quiet, not punny?",
        answer:
          "Yes, set TONE to describe that directly, for example plain and understated rather than playful, and the candidates will be built from the discount and theme without a forced pun. The two hard rules about ambiguous characters and pronunciation apply regardless of tone, since those are typing and speech constraints, not style choices.",
      },
      {
        question: "Should the code always include the brand name?",
        answer:
          "Not necessarily. A short brand name suffix works well, but forcing a long one into every candidate can push the code past a reasonable length or crowd out the part that describes the offer. If the name itself is long, let the prompt weigh whether to use it at all rather than forcing it in.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/flash-sale-announcement-prompt",
        label: "flash sale announcement prompt",
        description:
          "Writes the announcement copy the finished code will actually appear in, once a candidate from this prompt has been chosen.",
      },
      {
        href: "/promo-prompts/referral-program-copy-prompt",
        label: "referral program copy prompt",
        description:
          "For codes tied to an individual referrer rather than a broad campaign, where the naming discipline shifts toward personalisation instead of a theme.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Defines the TONE input this prompt takes as a variable, useful before naming codes for a brand whose voice has not been written down yet.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "Puts the finished code into the subject line that gets the email opened in the first place.",
      },
    ],

    externalLinks: [
      {
        href: "https://baymard.com/blog/checkout-usability-apply-buttons",
        label: "Baymard Institute: Checkout usability and promo code fields",
        description:
          "Research on how exact, one way input requirements around promo code fields cause avoidable checkout errors, which is the practical cost of a code that is hard to type correctly.",
      },
      {
        href: "https://www.nngroup.com/articles/chunking/",
        label: "Nielsen Norman Group: How chunking helps content processing",
        description:
          "The working memory research behind why a short, word like code is recalled more reliably than a longer, arbitrary string of characters.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the pattern of requiring a model to state its reasoning alongside each option, which is what the one line justification per candidate is built on.",
      },
      {
        href: "https://www.uspto.gov/trademarks/search",
        label: "USPTO: Search the trademark database",
        description:
          "The primary tool for checking whether a distinctive, coined candidate is already claimed by another brand before it appears in paid campaigns.",
      },
    ],
  },
};

export default meta;

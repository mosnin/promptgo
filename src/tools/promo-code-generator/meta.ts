import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "promo-code-generator",
  name: "Promo Code Generator",
  title: "Promo Code Generator",
  category: "marketing-promo-tools",
  summary:
    "Generates a batch of unique promo codes from a chosen character set and length, drawn from the Web Crypto API rather than a predictable pseudo-random function, with no duplicates within a batch.",

  seo: {
    primaryKeyword: "promo code generator",
    keywords: [
      "promo code generator",
      "free promo code generator",
      "random promo code generator tool",
      "how to generate promo codes",
      "bulk discount code generator",
      "unique coupon code generator",
    ],
    seoTitle: "Promo Code Generator: Free Random Discount Codes",
    seoDescription:
      "A free promo code generator that creates unique, randomly generated discount codes in bulk from the Web Crypto API, with no duplicates and no signup required.",
  },

  fields: [
    {
      kind: "text",
      token: "prefix",
      label: "Code prefix",
      help: "Optional. Added to the front of every code and always uppercased, for example SAVE.",
      placeholder: "SAVE",
      example: "SAVE",
    },
    {
      kind: "select",
      token: "charset",
      label: "Character set",
      help: "What the random part of the code is built from.",
      options: [
        { value: "alnum", label: "Letters and numbers" },
        { value: "numeric", label: "Numbers only" },
        { value: "alpha", label: "Letters only" },
      ],
      example: "alnum",
    },
    {
      kind: "number",
      token: "length",
      label: "Code length",
      help: "The random part only, not counting the prefix. 4 to 16 characters.",
      min: 4,
      max: 16,
      example: 8,
    },
    {
      kind: "number",
      token: "count",
      label: "How many codes",
      help: "Codes to generate in this batch. 1 to 50.",
      min: 1,
      max: 50,
      example: 5,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Web Crypto API (crypto.getRandomValues)"],
    testingNote:
      "Verified with structural checks rather than fixed output, since every code is genuinely random: the requested count is returned, every code is the requested length once the prefix is accounted for, every character is drawn only from the selected character set, no two codes in a single batch repeat, and a length or batch size outside the allowed range is rejected with an error instead of being silently clamped.",
  },

  article: {
    intro: [
      "A promo code generator has one real job: produce a batch of codes that are genuinely unpredictable and never collide with each other, not codes that merely look random while following a guessable pattern. This one builds every character from the Web Crypto API's random number source, and checks the whole batch for duplicates before handing any code back.",
      "Marketing teams rarely need one code. A seasonal sale needs hundreds of single-use codes handed to an email platform, an influencer campaign needs one unique code per creator, and support needs a short list to hand out manually. The character set, length and prefix are all adjustable, covering a six digit numeric code read aloud over the phone as well as a twelve character alphanumeric code for a gift card.",
      "Every code shown here is produced client side. Nothing about the prefix, character set or finished codes is sent anywhere, which matters for a code about to become a real, redeemable discount before a marketing platform has even seen it.",
    ],

    sections: [
      {
        heading: "How to generate promo codes that a spreadsheet can't predict",
        body: [
          "A code generated from Math.random or a similar pseudo-random function is not unpredictable in the sense that matters here. It is fine for a game or a UI animation, but its output can in principle be predicted from earlier values, the wrong property for something about to function as currency.",
          "That is what makes this a random promo code generator tool rather than a pattern that happens to look random: every character comes from crypto.getRandomValues, the same secure source browsers use for session tokens, drawn with rejection sampling so no character in the set is more likely than any other.",
        ],
      },
      {
        heading: "Choosing a character set for the code's actual use",
        body: [
          "This promo code generator supports three character sets because promo codes get used in different ways. Letters and numbers together give the widest range of possible codes for a given length, which matters when a batch is large.",
          "Numbers only suits a code read aloud over the phone or typed on a keypad, where a letter that could be an O or a zero causes support tickets. Letters only suits a code that needs to be pronounceable or memorable in print, at the cost of a smaller pool of codes at the same length.",
        ],
      },
      {
        heading: "Why prefixes exist and how they're normalised",
        body: [
          "A prefix turns an anonymous string into a code someone can recognise on sight: SAVE10ABCD reads as a discount before anyone types it in, where a bare ABCD1234 does not. The prefix is always converted to uppercase and stripped of anything that is not a letter or digit, so a stray space or punctuation mark cannot end up inside a code a checkout page then rejects.",
          "The prefix does not count toward the code length you set. A prefix of SAVE with a length of eight produces a twelve character code in total, since length describes only the random part that actually needs to be unpredictable.",
        ],
      },
      {
        heading: "Why a bulk discount code generator has to guarantee no duplicates",
        body: [
          "Two customers redeeming the same code because a generator produced it twice is not a cosmetic bug. Depending on how the code is wired into a discount platform, it either fails one of them at checkout or lets both redeem a promotion meant to work once each.",
          "Every code produced here is added to a set as it is generated, and a random draw that matches one already in the batch is discarded and drawn again rather than returned. A bulk discount code generator that skips this step will look correct in a small test and then produce a collision the first time someone asks for fifty codes instead of five.",
        ],
      },
      {
        heading: "Code length and batch size limits",
        body: [
          "Length is capped between four and sixteen characters, and a batch is capped at fifty codes. The lower length bound exists because a four digit numeric code already has only ten thousand possible values, and asking for anywhere near that many at once turns a rare coincidence into a near certainty, the same birthday paradox effect that makes short hashes collide sooner than intuition suggests.",
          "Because the tool checks for duplicates rather than assuming they won't happen, it also doubles as a unique coupon code generator at the tighter end of that range: a four digit numeric batch of twenty codes still comes back with twenty distinct values, with the generator doing more retries behind the scenes to get there.",
        ],
      },
      {
        heading: "What this free promo code generator does not do",
        body: [
          "This free promo code generator only guarantees uniqueness inside the batch it just produced. It has no memory of a batch generated five minutes ago in another tab, and cannot see the codes already sitting in your ecommerce platform, so a fresh batch should still be checked against the system that will redeem it.",
          "It also does not apply platform specific rules, such as a discount tool that treats codes as case insensitive or reserves certain words. Those vary by platform, so the safest habit is generating a longer code than the platform's minimum and skimming the batch before importing it.",
        ],
      },
    ],

    howTo: {
      name: "How to use the promo code generator",
      steps: [
        {
          name: "Set an optional prefix",
          text: "Type a short prefix like SAVE or WELCOME if you want the codes to be recognisable at a glance. Leave it blank for a bare random code.",
        },
        {
          name: "Pick a character set",
          text: "Choose letters and numbers for the widest range of codes, numbers only for something read aloud or typed on a keypad, or letters only for a pronounceable code.",
        },
        {
          name: "Set the code length and batch size",
          text: "Length is the random part only, from 4 to 16 characters. Batch size is how many codes you need at once, from 1 to 50.",
        },
        {
          name: "Copy the batch",
          text: "The codes appear as soon as the settings are valid. One button copies the whole batch, one code per line, ready to paste into a spreadsheet or a bulk import field.",
        },
      ],
    },

    faq: [
      {
        question: "Is this promo code generator free to use?",
        answer:
          "Yes. There is no signup, no account and no limit on how many batches can be generated in a session. Every code is produced in the browser, so nothing about a prefix, a character set choice or a finished batch is sent to a server before it is copied.",
      },
      {
        question: "Does every code in a batch stay unique?",
        answer:
          "Within a single batch, yes, always. Each newly drawn code is checked against every code already produced in that batch, and a match is discarded and redrawn rather than returned, so a requested batch of fifty codes always comes back as fifty genuinely distinct values.",
      },
      {
        question: "Can I generate purely numeric codes for a phone or SMS promotion?",
        answer:
          "Yes, choose the numbers only character set. It avoids letters that are easily confused with digits when read aloud or typed on a numeric keypad, such as a capital O next to a zero, which is the most common source of support tickets for phone redeemed codes.",
      },
      {
        question: "Could a code from one batch collide with a code from an earlier batch?",
        answer:
          "It is possible, because uniqueness is only checked within the batch currently being generated, not against codes produced in a previous session or already stored in a discount platform. Increasing the code length makes an accidental match across separate batches negligibly unlikely, and any list going live should still be checked against the platform that will redeem it.",
      },
      {
        question: "Why is the batch size capped at 50 codes?",
        answer:
          "Fifty keeps a single batch fast to generate and easy to review by eye before it is copied anywhere. For a campaign that needs thousands of codes, running the generator several times and combining the batches produces the same guaranteed-unique-per-batch codes without a single request growing unwieldy to scan.",
      },
      {
        question: "Does the tool check my codes against ones I've already issued?",
        answer:
          "No. It has no memory of any previous batch and no connection to any discount platform, CRM or database, so it cannot know what codes already exist outside the batch currently on screen. A fresh batch should still be checked against your own records before it is imported anywhere it will actually be redeemed.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/utm-link-builder",
        label: "utm link builder",
        description: "For tagging the tracking link that will carry a promo code to a landing page.",
      },
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description: "For writing the newsletter that will actually announce a batch of new codes.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description: "For the ad copy that will surface a code to the audience it's meant for.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description: "For the cases where a one-off discount code is negotiated directly rather than generated in bulk.",
      },
    ],

    externalLinks: [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues",
        label: "MDN: Crypto.getRandomValues()",
        description: "The browser and Node standard this generator's randomness is built directly on.",
      },
      {
        href: "https://www.w3.org/TR/WebCryptoAPI/",
        label: "W3C: Web Cryptography API",
        description: "The specification defining the cryptographically secure random number source used here.",
      },
      {
        href: "https://csrc.nist.gov/pubs/sp/800/90/a/r1/final",
        label: "NIST SP 800-90A Rev. 1",
        description: "The federal standard for the deterministic random bit generators that Web Crypto implementations are built on.",
      },
    ],
  },

  tags: ["marketing", "promo code", "discount", "generator"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

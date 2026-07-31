import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "password-generator",
  name: "Password Generator",
  title: "Password Generator",
  category: "data-developer-tools",
  summary:
    "Builds a password from crypto.getRandomValues, guarantees one character from every selected type, and shuffles the result with a Fisher-Yates shuffle so nothing sits in a fixed position.",

  seo: {
    primaryKeyword: "password generator",
    keywords: [
      "password generator",
      "free password generator tool",
      "random password generator online",
      "how to generate a strong password",
      "secure password generator with symbols",
      "strong password generator tool",
    ],
    seoTitle: "Password Generator: Free Secure Random Passwords",
    seoDescription:
      "A free password generator that builds strong passwords from the Web Crypto API, guarantees every selected character type appears, and never uses Math.random.",
  },

  fields: [
    {
      kind: "number",
      token: "length",
      label: "Password length",
      help: "How many characters the finished password should have. 8 to 64.",
      min: 8,
      max: 64,
      example: 16,
    },
    {
      kind: "checkbox",
      token: "uppercase",
      label: "Include uppercase letters",
      help: "A to Z.",
      example: true,
    },
    {
      kind: "checkbox",
      token: "lowercase",
      label: "Include lowercase letters",
      help: "a to z.",
      example: true,
    },
    {
      kind: "checkbox",
      token: "numbers",
      label: "Include numbers",
      help: "0 to 9.",
      example: true,
    },
    {
      kind: "checkbox",
      token: "symbols",
      label: "Include symbols",
      help: "Drawn from !@#$%^&*()-_=+",
      example: false,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Web Crypto API (crypto.getRandomValues) with rejection sampling"],
    testingNote:
      "Verified with structural checks rather than fixed output, since every password is genuinely random: the requested length is always returned, a selected character type always appears at least once rather than merely being likely to, an unselected type never leaks into the result, all four types unchecked is rejected as an error, and length is rejected outside the 8 to 64 boundary while the boundary values themselves are accepted.",
  },

  article: {
    intro: [
      "A password generator only has one job worth trusting: produce a string nobody could have guessed, predicted from an earlier password, or narrowed down by knowing how the generator works. This one draws every character from crypto.getRandomValues, the Web Crypto API's cryptographically secure random source, using the same rejection sampling technique that keeps the character selection free of modulo bias.",
      "Most password generators stop at picking random characters and hope the result happens to contain a digit or a symbol if the box for it was checked. This strong password generator tool does not hope. It draws one character from every selected type first, so a checked box is a guarantee, then fills the rest of the length from the combined set and shuffles the whole array before joining it into a string, so the guaranteed characters do not sit in the same predictable slot every time.",
      "Everything happens in the browser tab. The length, the checkbox choices and the finished password are never sent anywhere, which matters for a string about to become the one thing standing between an account and whoever else finds out what it is.",
    ],

    sections: [
      {
        heading: "Why this password generator uses crypto.getRandomValues, not Math.random",
        body: [
          "Math.random is a fine source of randomness for a game animation or shuffling a quiz question list, but it is not built to resist someone trying to predict its output. Depending on the JavaScript engine, its internal state can in principle be reconstructed from a run of previous outputs, exactly the property a password generator cannot afford.",
          "crypto.getRandomValues pulls from the operating system's cryptographically secure random number generator instead, the same source browsers use for session tokens and TLS keys. Every character comes from that source, drawn with rejection sampling so a character set of 26, 36 or 76 symbols is never subtly biased toward the ones nearer the start of the set.",
        ],
      },
      {
        heading: "Choosing which character types to include",
        body: [
          "The four checkboxes map onto the four character classes most account forms ask for: uppercase letters, lowercase letters, numbers and symbols. Turning more of them on widens the pool of possible characters at every position, one of the two levers that make a password harder to guess, the other being length.",
          "A secure password generator with symbols on is the right choice for an account that requires all four types, common on financial and enterprise logins. Turning symbols off produces a password that is easier to read aloud or type on an awkward keyboard, at the cost of a smaller character pool for the same length.",
        ],
      },
      {
        heading: "Why a checked box is a guarantee, then shuffled into place",
        body: [
          "A naive random password generator online just draws every character from the full combined set and hopes a symbol shows up if you asked for one. For a short password that hope can fail outright, and even for a long one the actual mix of character types varies unpredictably from one password to the next.",
          "This one draws one character from each selected type first, so a password with all four types checked is guaranteed to contain at least one of each, not merely likely to. Appending those characters and then the rest would leave them clustered near the front, so the full set runs through a Fisher-Yates shuffle, driven by the same unbiased random draw as every character selection, before being joined into the final string.",
        ],
      },
      {
        heading: "How to generate a strong password of the right length",
        body: [
          "Length does more for resistance to guessing than character variety does, because each additional character multiplies the number of possible passwords rather than adding to it. A sixteen character password drawn from all four types is a reasonable default for most accounts, and the field here accepts 8 up to 64 characters for a system that calls for a longer one.",
          "The eight character floor exists because a shorter password gives an attacker too small a space to search, even with every type on, and is below what current guidance treats as adequate for anything worth protecting. There is no upper bound to how secure a longer password can be within the 64 character ceiling; it exists to keep the field usable, not to cap strength.",
        ],
      },
      {
        heading: "What this free password generator tool does not do",
        body: [
          "This free password generator tool does not store, remember or transmit anything it produces. Once you leave the page or generate a new password, the previous one exists only wherever you copied it to, so it is gone for good if you close the tab before pasting it somewhere.",
          "It is not a password manager and does not check a password against a breach database or a site's own rules, such as a maximum length shorter than 64 characters or a restricted symbol set. Those checks belong to the account you are setting the password on, and a generated password should be verified against them before it is saved.",
        ],
      },
    ],

    howTo: {
      name: "How to use the password generator",
      steps: [
        {
          name: "Set the password length",
          text: "Choose a length from 8 to 64 characters. Longer is stronger; sixteen or more is a reasonable default for most accounts.",
        },
        {
          name: "Choose which character types to include",
          text: "Check any combination of uppercase, lowercase, numbers and symbols. At least one has to stay checked, since the tool needs a character set to draw from.",
        },
        {
          name: "Copy the generated password",
          text: "The password appears immediately, built from crypto.getRandomValues rather than Math.random. Use the copy button to place it on your clipboard.",
        },
        {
          name: "Change any setting to draw a fresh password",
          text: "Adjusting the length or toggling any checkbox recomputes the result with a brand new set of random draws, since the same settings never produce the same password twice.",
        },
      ],
    },

    faq: [
      {
        question: "Is this password generator free, and does it send my password anywhere?",
        answer:
          "Yes to both. There is no signup and no limit on how many passwords you can generate in a session, and every password is built with crypto.getRandomValues directly in your browser tab. Nothing about the length, the checkbox choices or the finished password is ever sent to a server.",
      },
      {
        question: "If I check the symbols box, is a symbol guaranteed to appear, or just likely?",
        answer:
          "Guaranteed. The generator draws one character from every selected type before filling the rest of the length from the combined set, so a checked box for symbols, numbers, uppercase or lowercase means that type is definitely present in the output, not merely probable the way a fully random draw over the whole set would leave it.",
      },
      {
        question: "Why is the length capped between 8 and 64 characters?",
        answer:
          "Eight is close to the shortest length treated as adequate by current password guidance, and going lower leaves too small a space of possible passwords for an attacker to search even with every character type turned on. Sixty four is a practical ceiling rather than a security limit, chosen because almost no real form accepts anything longer.",
      },
      {
        question: "Can I use this as a secure password generator with symbols for a work account?",
        answer:
          "Yes. Check uppercase, lowercase, numbers and symbols together and set a length that meets your organisation's policy, and every one of those four types is guaranteed to appear in the result. That combination satisfies the character variety rules used by most enterprise and financial account systems.",
      },
      {
        question: "What happens if I uncheck every character type?",
        answer:
          "The tool returns an error instead of generating anything, because there would be no characters left to draw from. At least one of uppercase, lowercase, numbers or symbols has to stay checked for a password to be produced at all.",
      },
      {
        question: "Does this replace a password manager?",
        answer:
          "No. It generates a strong password but does not store it, sync it across devices, or fill it into a login form for you. Pairing a generated password with a password manager gets you both a genuinely random password and a safe place to keep it, which this tool alone does not provide.",
      },
      {
        question: "Can I use this as a random password generator online for more than one account?",
        answer:
          "Yes, run it as many times as you like. Each password is drawn independently from crypto.getRandomValues, so generating one for an email account and another for a banking login produces two genuinely unrelated strings, with no pattern connecting them beyond the length and character types you chose.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/promo-code-generator",
        label: "promo code generator",
        description: "Another tool built on the same crypto.getRandomValues rejection sampling technique, for discount codes instead of passwords.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "json formatter validator",
        description: "A fellow data and developer tool for checking the structure of a config or API response.",
      },
      {
        href: "/coding-prompts/security-review-prompt",
        label: "security review prompt",
        description: "For reviewing a codebase for weak or hardcoded credentials once a strong password exists to replace them.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "For catching a hardcoded password or secret during review before it ships.",
      },
    ],

    externalLinks: [
      {
        href: "https://pages.nist.gov/800-63-3/sp800-63b.html",
        label: "NIST SP 800-63B: Digital Identity Guidelines, Authentication",
        description: "The federal guidance on password length and complexity this tool's length bounds are informed by.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues",
        label: "MDN: Crypto.getRandomValues()",
        description: "The browser and Node standard this generator's randomness is built directly on.",
      },
      {
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
        label: "OWASP Authentication Cheat Sheet",
        description: "Practical guidance on password strength and storage from the Open Web Application Security Project.",
      },
      {
        href: "https://www.cisa.gov/secure-our-world/use-strong-passwords",
        label: "CISA: Use Strong Passwords",
        description: "The US Cybersecurity and Infrastructure Security Agency's public guidance on what makes a password strong.",
      },
    ],
  },

  tags: ["developer", "security", "password", "generator"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

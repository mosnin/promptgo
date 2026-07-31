import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "uuid-generator",
  name: "UUID Generator",
  title: "UUID Generator",
  category: "data-developer-tools",
  summary:
    "Generates a batch of version 4 UUIDs with crypto.randomUUID(), the browser and Node's own RFC 9562 compliant method, with no duplicates within a batch.",

  seo: {
    primaryKeyword: "uuid generator",
    keywords: [
      "uuid generator",
      "free online uuid generator",
      "random uuid generator tool",
      "how to generate a uuid",
      "bulk uuid generator tool",
      "version 4 uuid generator",
    ],
    seoTitle: "UUID Generator: Free RFC 9562 Version 4 UUID Tool",
    seoDescription:
      "A free uuid generator that creates unique, RFC 9562 version 4 UUIDs in bulk with crypto.randomUUID(), the standard Web Crypto API method. No signup needed.",
  },

  fields: [
    {
      kind: "number",
      token: "count",
      label: "How many UUIDs",
      help: "UUIDs to generate in this batch. 1 to 100.",
      min: 1,
      max: 100,
      example: 5,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["crypto.randomUUID(), the standard Web Crypto API for RFC 4122 version 4 UUIDs"],
    testingNote:
      "Verified with structural checks rather than fixed output, since every UUID is genuinely random: the requested count is returned, every UUID matches the version 4 pattern exactly, including the fixed version and variant nibbles, no two UUIDs in a single batch repeat, the boundary values of 1 and 100 are both accepted, and a count outside that range or a non-integer count is rejected with an error instead of being silently rounded or clamped.",
  },

  article: {
    intro: [
      "A uuid generator has one real job: hand back an identifier that is, for every practical purpose, guaranteed never to collide with any other identifier ever generated, without a central authority checking every request. This one builds every UUID with crypto.randomUUID(), the method browsers and Node already ship for exactly this, rather than a hand rolled string of random hex digits that only looks the part.",
      "Developers rarely need one UUID. A database migration needs a primary key for every row in a new table, a distributed system needs a trace ID attached to every request, and a test fixture needs identifiers that will never collide with data seeded by another run. The batch size is adjustable from one up to a hundred at once.",
      "Every UUID shown here is produced client side. Nothing about the requested count or the finished UUIDs is sent anywhere, which matters when the values are often destined to become real primary keys before any server has seen them.",
    ],

    sections: [
      {
        heading: "What makes a uuid generator's output genuinely unique",
        body: [
          "A version 4 UUID is 128 bits long, written as 32 hex characters grouped 8-4-4-4-12. Only 122 of those bits are actually random; the other 6 are fixed, so the first character of the third group is always 4, marking the version, and the first character of the fourth group is always 8, 9, a or b, marking the variant.",
          "122 random bits is an enormous space. Generating a billion version 4 UUIDs a second for a hundred years would still leave any single collision less likely than a hardware failure corrupting the value instead, which is why a uuid generator can promise practical uniqueness without a central registry checking every value it hands out. That is also what makes a random uuid generator tool actually random rather than merely random looking: only 6 of 128 bits are ever fixed, purely so a UUID can be identified as version 4 on sight.",
        ],
      },
      {
        heading: "How this uuid generator uses crypto.randomUUID()",
        body: [
          "crypto.randomUUID() is not a convenience wrapper around a hand rolled routine. It is the same Web Crypto API method browsers use internally wherever a spec calls for a random identifier, backed by a cryptographically secure random number source rather than Math.random, which was never designed to be unpredictable in this sense.",
          "Calling it directly also removes an entire category of bugs a hand assembled UUID risks: getting the version and variant nibbles right and formatting the groups correctly are handled by the platform's own implementation, tested against the specification rather than reimplemented here.",
        ],
      },
      {
        heading: "Batch size limits and why duplicates stay effectively impossible",
        body: [
          "The batch here is capped at 100 UUIDs per request, generous for a seed script while keeping a result easy to scan before it is copied. There is no meaningful risk of two version 4 UUIDs colliding within a batch that size: 122 random bits give a batch of 100 a collision probability far below one in a trillion.",
          "That is unlike a shorter identifier such as a six digit numeric code, where the birthday paradox makes a collision likely once a batch reaches the thousands. A UUID's random space is large enough that the same math does not bite at any batch size this tool allows.",
        ],
      },
      {
        heading: "Where UUIDs actually get used, and how to generate a uuid without a library",
        body: [
          "A UUID column as a primary key lets a database row get its identifier the moment it is created, without a round trip to ask a sequence for the next number, which matters once more than one service writes to the same table. A distributed system attaches a UUID to a request as a trace ID, so a failure can be traced across independent logs without those services agreeing on a scheme in advance. A test suite uses a bulk uuid generator tool for the same reason: fixture data from one run never collides with data from another.",
          "Most languages ship a UUID function in their standard library, but reaching for a package just to answer how to generate a uuid for a one-off script is often more setup than the task deserves. This free online uuid generator exists for that gap: the moments a UUID is needed right now, in a browser tab, without touching a package manager or a terminal.",
        ],
      },
      {
        heading: "What this uuid generator does not do",
        body: [
          "This tool only guarantees uniqueness inside the batch it just produced, the same practical guarantee every version 4 UUID generator offers: it has no memory of an earlier batch, and does not need one, since the random space is large enough that cross-batch collisions are not a realistic concern. It also only generates version 4 UUIDs, not a version 1 UUID that encodes a timestamp or a version 7 UUID designed to sort by creation time, neither of which is interchangeable with a version 4 UUID if a system depends on those other properties.",
        ],
      },
    ],

    howTo: {
      name: "How to use the uuid generator",
      steps: [
        {
          name: "Set the batch size",
          text: "Type how many UUIDs you need, from 1 to 100. The default of 5 is enough to see the format before scaling up.",
        },
        {
          name: "Read the result",
          text: "The batch appears as soon as the count is valid, one version 4 UUID per line, generated fresh each time the count changes.",
        },
        {
          name: "Check the format if you need to",
          text: "Every UUID follows the 8-4-4-4-12 hex pattern, with the version and variant nibbles fixed in the third and fourth groups.",
        },
        {
          name: "Copy the batch",
          text: "One button copies the whole batch, one UUID per line, ready to paste into a migration script or a seed file.",
        },
      ],
    },

    faq: [
      {
        question: "Is this uuid generator free to use?",
        answer:
          "Yes. There is no signup, no account and no limit on how many batches can be generated in a session. Every UUID is produced in the browser with crypto.randomUUID(), so nothing about the count or the finished batch is sent to a server before it is copied.",
      },
      {
        question: "Does every UUID in a batch stay unique?",
        answer:
          "Within a batch, yes, and across separate batches the odds of a collision stay far below any realistic concern. A version 4 UUID has 122 random bits, a space large enough that generating billions a second for decades would still leave a collision extraordinarily unlikely.",
      },
      {
        question: "How to generate a uuid for a database primary key specifically?",
        answer:
          "Set the batch size to however many rows you are inserting and copy the result into the primary key column, or generate one at a time as each row is created. A version 4 UUID needs no coordination with a sequence, which makes it convenient in a system with more than one writer.",
      },
      {
        question: "What is the difference between a UUID and a GUID?",
        answer:
          "In practice, nothing meaningful. GUID is Microsoft's older name for the same 128-bit identifier format that RFC 9562 now standardises as a UUID, and the two terms are used interchangeably in most documentation. A version 4 UUID produced here is a valid GUID under either name.",
      },
      {
        question: "Why is the batch size capped at 100 UUIDs?",
        answer:
          "A hundred keeps a single batch fast to generate and easy to review by eye before it is copied. For a migration that needs many more, running this random uuid generator tool several times and combining the batches produces the same genuinely unique values without one request growing unwieldy to scan.",
      },
      {
        question: "Can I use this as a bulk uuid generator tool for test fixtures?",
        answer:
          "Yes. Set the batch size to however many fixture rows you need and copy the result into your seed script. Because each UUID is drawn independently from crypto.randomUUID(), fixture data from one test run will not collide with fixture data from another, without any coordination between them.",
      },
      {
        question: "Does this tool generate any UUID version other than version 4?",
        answer:
          "No, only version 4, identifiable by the fixed 4 as the first character of the third group. Other versions serve different purposes, such as encoding a timestamp, and are not interchangeable with a version 4 UUID if a system specifically depends on those other properties.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/json-formatter-validator",
        label: "JSON formatter validator",
        description: "For checking the shape of an API response or config file once its id fields hold UUIDs from this generator.",
      },
      {
        href: "/tools/promo-code-generator",
        label: "promo code generator",
        description: "For a shorter, human readable identifier when a full UUID is more than a use case actually needs.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "API documentation prompt",
        description: "For writing up an endpoint whose ids are UUIDs once the format is settled.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "SQL query prompt",
        description: "For querying a table keyed by the same UUID primary keys this tool generates.",
      },
    ],

    externalLinks: [
      {
        href: "https://datatracker.ietf.org/doc/html/rfc9562",
        label: "RFC 9562: Universally Unique IDentifiers (UUIDs)",
        description: "The current IETF specification this generator's version 4 UUIDs are built to, obsoleting RFC 4122.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID",
        label: "MDN: Crypto.randomUUID()",
        description: "The browser and Node API reference for the exact method this tool's generation is built directly on.",
      },
      {
        href: "https://www.w3.org/TR/WebCryptoAPI/",
        label: "W3C: Web Cryptography API",
        description: "The specification defining randomUUID() as part of the Crypto interface this tool calls.",
      },
      {
        href: "https://nodejs.org/api/crypto.html#cryptorandomuuidoptions",
        label: "Node.js documentation: crypto.randomUUID()",
        description: "The server side implementation of the same method, for anyone generating UUIDs outside a browser.",
      },
    ],
  },

  tags: ["developer", "uuid", "identifier", "generator"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

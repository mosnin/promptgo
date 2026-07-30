import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "product-description-prompt",
  name: "Description Writer",
  title: "Product Description Prompt",
  category: "marketing-prompts",
  taskType: "generate",
  summary:
    "Writes descriptions around the question that stops someone buying, and refuses to invent a specification you did not supply.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["ecommerce", "product copy", "retail", "conversion"],

  seo: {
    primaryKeyword: "product description prompt",
    keywords: [
      "product description prompt",
      "how to write ecommerce product copy that sells",
      "ai prompt for shopify product descriptions",
      "what to include in a product description",
      "how to stop ai inventing product details",
      "how to write a product description for a physical item",
    ],
    seoTitle: "Product Description Prompt: Answer The Hesitation",
    seoDescription:
      "A product description prompt built around the one question that stops people buying, with a hard rule against inventing any specification you did not give it.",
  },

  prompt: {
    text: `You are writing for an online shop. You know that a description does not persuade anyone who was already going to buy, and does not rescue a product nobody wants. It exists to resolve the hesitation of the person who is undecided.

THE PRODUCT: {{PRODUCT}}
VERIFIED SPECIFICATIONS: {{SPECS}}
WHO BUYS IT AND WHAT THEY COMPARE IT AGAINST: {{BUYER}}
THE MOST COMMON REASON SOMEONE DOES NOT BUY: {{HESITATION}}
RETURNS OR COMPLAINTS WE ACTUALLY GET: {{COMPLAINTS}}

ABSOLUTE RULE: you may not state any dimension, weight, material, capacity, compatibility, certification or care instruction that does not appear in the verified specifications above. If a sentence needs one, write [SPEC NEEDED: what] inline. This rule outranks every other instruction, including length.

Write four parts.

1. THE ONE LINE. Under 15 words, what it is and who it is for. Not a slogan. Someone skimming a category page should be able to rule it in or out.

2. THE BODY, 90 to 150 words. Structure it so the hesitation named above is answered in the second or third sentence, not at the end. Lead with the thing that makes this item the right choice for that specific buyer. Use concrete nouns and verbs; no adjective may appear that is not doing work a specification could not do better.

3. THE HONEST LIMITS. Two or three lines on who should not buy this and why, drawn from the complaints input. This reduces returns and is read as confidence rather than weakness.

4. SPEC BLOCK. Reproduce only the verified specifications, formatted as scannable pairs. Add nothing.

Then list every [SPEC NEEDED] marker you used, so I know exactly what to go and measure.

Never write: perfect for any occasion, high quality, premium, must have, or any sentence that would be equally true of a competing product.`,
    variables: [
      {
        token: "PRODUCT",
        label: "What the product is",
        example: "A cast iron skillet, pre seasoned, made in a small foundry",
      },
      {
        token: "SPECS",
        label: "Verified specifications only",
        example: "26cm diameter, 2.1kg, 4mm base, pre seasoned with flaxseed oil, oven safe to 260C, no handle cover included",
      },
      {
        token: "BUYER",
        label: "Who buys it and what they compare it against",
        example:
          "Home cooks upgrading from non stick, comparing against a well known mass produced brand at half the price",
      },
      {
        token: "HESITATION",
        label: "The most common reason people do not buy",
        example: "They think cast iron is difficult to look after and will rust if they get it wrong",
      },
      {
        token: "COMPLAINTS",
        label: "Returns and complaints you actually get",
        example: "A few people find it too heavy, and two said the handle gets hotter than they expected",
      },
    ],
    expectedOutput:
      "A one line summary under fifteen words, a body of 90 to 150 words answering the hesitation early, two or three honest limits drawn from real complaints, a spec block containing only what you supplied, and a list of every missing specification it needed.",
    followUps: [
      "Rewrite the body assuming the hesitation is price rather than maintenance, and tell me which sentences changed.",
      "Generate the variant for a marketplace listing where the first 80 characters are all most people see.",
      "Take my complaints list and tell me which one should be fixed in the product rather than handled in the copy.",
    ],
    pitfalls: [
      "If the specs field is thin, the output fills with [SPEC NEEDED] markers. That is the correct behaviour and the list at the end is your measuring task.",
      "The honest limits section gets deleted by shop owners more than any other. It reduces returns, which is worth more than the marginal sale it costs.",
      "A hesitation stated as price is usually a value communication problem. If price is your answer, run the variant follow up before accepting it.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "When word count needs filling, models invent a plausible weight, fabric or material rather than leave a gap, so the specification rule has to be written as outranking every other instruction in the prompt. The missing data marker also sits inline rather than in a footnote, because footnoted gaps get skimmed past while a marker mid sentence cannot be published by accident.",
  },

  article: {
    intro: [
      "A product description prompt that asks for persuasive copy will produce adjectives, and adjectives are the least useful thing a description can contain. The buyer already knows what the product is from the photograph and the title. What they do not know is whether it solves the specific worry that has them hovering rather than clicking.",
      "This one is built around that worry. You supply the most common reason people do not buy, and the description answers it in the second or third sentence. It also refuses, absolutely, to state any specification you did not give it.",
    ],

    sections: [
      {
        heading: "Descriptions resolve hesitation, they do not create desire",
        body: [
          "Three groups land on a product page. The people who were always going to buy do not read the description. The people who were never going to buy are not persuaded by it. The description exists entirely for the third group, who want the thing but have one unresolved question.",
          "Writing for that group changes what belongs in the copy. Their question is rarely what the product is, and almost always something narrower: whether it fits, whether it lasts, whether it is difficult, whether returning it would be a nuisance. The answer to what to include in a product description is the hesitation rather than the item, because describing the item duplicates the photograph.",
        ],
      },
      {
        heading: "Why the specification rule outranks everything else",
        body: [
          "Invented specifications are the most damaging thing a language model can do in ecommerce. A fabricated weight or an imagined compatibility claim produces returns, chargebacks and in regulated categories a legal problem, and it does so with copy that reads perfectly.",
          "The rule is therefore written to outrank length and every other instruction, and the markers appear inline rather than in a footnote. How to stop ai inventing product details only works as a rule if the gap is impossible to miss, and a marker sitting mid sentence cannot be published by accident the way a footnote can.",
        ],
      },
      {
        heading: "Turning complaints into an asset",
        body: [
          "Most shops treat their returns data as a problem to be reduced and never as material for the copy. It is the best material available, because it is a record of the mismatches between what people expected and what arrived.",
          "The honest limits section converts that record into a filter. Saying plainly that the skillet is heavy and the handle gets hot loses the customer who would have returned it and keeps the one who wanted exactly that. The net effect on revenue is usually positive and the effect on review scores reliably is.",
        ],
        list: [
          "Weight or size complaints: state the number early, not in the spec table alone.",
          "Difficulty complaints: name the skill or effort required rather than promising ease.",
          "Compatibility returns: state what it does not fit, since buyers assume it fits unless told.",
          "Expectation gaps: describe the finish or behaviour that surprised people, plainly.",
        ],
      },
      {
        heading: "The one line does the category page work",
        body: [
          "Most shoppers see the fifteen word line long before they see the body, in a category grid or a search result, and they use it to decide whether to click at all. Written as a slogan it wastes that position entirely.",
          "The instruction is to make it possible to rule the product in or out, which sounds unambitious and is exactly right. A visitor who correctly rules it out has been saved a click, and a visitor who rules it in arrives at the page already halfway convinced. This is where knowing how to write a product description for a physical item earns most of its traffic value.",
        ],
      },
      {
        heading: "What the product description prompt will not do for you",
        body: [
          "It cannot know your hesitation input, and a guessed one produces a description aimed at the wrong worry. That field should come from your support inbox or from asking three recent customers what nearly stopped them, which takes an afternoon and improves every description you write afterwards.",
          "It also cannot rescue a product with no distinct buyer. Where the buyer field is vague, the copy comes back general no matter how well the rules hold. Anyone working out how to write ecommerce product copy that sells at scale should invest in the inputs rather than in the phrasing.",
        ],
      },
    ],

    howTo: {
      name: "How to use the product description prompt",
      steps: [
        {
          name: "Collect the real hesitation",
          text: "Look at pre purchase questions in your inbox or ask recent buyers what nearly stopped them. This single input determines the shape of the body copy.",
        },
        {
          name: "Paste only verified specifications",
          text: "Anything you have measured or confirmed with the manufacturer. Leaving a field out produces a visible marker, which is far safer than a plausible guess.",
        },
        {
          name: "Include your complaints honestly",
          text: "Returns reasons and negative review themes. These become the limits section, which is what reduces the next round of returns.",
        },
        {
          name: "Fill every marker before publishing",
          text: "The list at the end is a measuring task. Publishing with a marker in place is obvious, which is the point of putting them inline.",
        },
      ],
    },

    faq: [
      {
        question: "How long should a product description be?",
        answer:
          "Ninety to a hundred and fifty words for the body, which is enough to answer one hesitation properly and not enough to pad. Longer descriptions almost always add general praise, and general praise is what shoppers skip on their way to the specifications.",
      },
      {
        question: "Will unique descriptions help my product pages rank?",
        answer:
          "They prevent the specific harm of duplicate manufacturer copy appearing on dozens of retailer sites, which is a real problem for small shops. Beyond avoiding that, ranking depends far more on the rest of the page and the site, so treat unique copy as necessary rather than sufficient.",
      },
      {
        question: "Should I really tell people not to buy something?",
        answer:
          "Yes, when your returns data says they will regret it. The lost sale was going to become a return with a shipping cost and often a poor review, and the honesty is read by everyone else as confidence, which lifts conversion on the buyers you do want.",
      },
      {
        question: "Can I use this as an ai prompt for shopify product descriptions across a whole catalogue?",
        answer:
          "For the writing step, yes, but the hesitation and complaints fields have to be filled per product or per category, and that is the part that cannot be batched. Products sharing a category usually share a hesitation, which is the practical shortcut.",
      },
      {
        question: "What if I sell something with no meaningful specifications?",
        answer:
          "Then the spec block is short and the body carries more weight, which is normal for soft goods and services. The rule still applies to any factual claim, including provenance, timing or what is included, since those are the claims that generate disputes.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description:
          "For the shop as a whole rather than one item, deciding what your range claims that a marketplace seller cannot.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Keeps a catalogue of hundreds of descriptions sounding like one shop rather than a dozen freelancers.",
      },
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description:
          "Supplies the buyer and comparison fields, particularly what shoppers are weighing this against.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "The hesitation is an objection arriving silently. This decodes what a stated one actually means.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business",
        label: "FTC: Advertising and product claim guidance",
        description:
          "The authoritative statement of what a product claim must be able to substantiate, which is why invented specifications are prohibited outright.",
      },
      {
        href: "https://developers.google.com/search/docs/appearance/structured-data/product",
        label: "Google: Product structured data",
        description:
          "Documents the fields Google expects for product rich results, and why the spec block must match what is marked up.",
      },
      {
        href: "https://www.nngroup.com/articles/ecommerce-product-pages/",
        label: "Nielsen Norman Group: Ecommerce product page research",
        description:
          "The usability findings on what shoppers actually read on a product page, which is the basis for answering hesitation early.",
      },
    ],
  },
};

export default meta;

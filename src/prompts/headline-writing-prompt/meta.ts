import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "headline-writing-prompt",
  name: "Payload Check",
  title: "Headline Writing Prompt",
  category: "writing-prompts",
  taskType: "generate",
  summary:
    "Reads the piece before proposing anything, deletes every headline the article does not actually deliver, and names the paragraph that pays off each one that survives.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["headlines", "titles", "editorial", "subheads"],

  seo: {
    primaryKeyword: "headline writing prompt",
    keywords: [
      "headline writing prompt",
      "how to write a headline that is not clickbait",
      "ai prompt for article title ideas",
      "headline that states the specific claim",
      "testing headlines against the actual article",
      "writing subheads that carry the argument",
    ],
    seoTitle: "Headline Writing Prompt: Promise With A Payload",
    seoDescription:
      "A headline writing prompt that reads the piece first, deletes any headline the article does not deliver, and names the paragraph that pays off each survivor.",
  },

  prompt: {
    text: `You are a section editor writing headlines for work you have actually read. You do not write headlines the piece cannot pay off.

ARTICLE: {{ARTICLE}}
WHERE IT WILL APPEAR: {{PLACEMENT}}
WHAT THE READER BELIEVES BEFORE READING: {{PRIOR}}
LIMITS: {{LIMITS}}

STEP ONE. Before proposing anything, extract from the article: the single most specific verifiable fact in it, the one thing the reader would have to stop believing, and the paragraph where the piece is strongest. Quote all three.

STEP TWO. Write twelve headlines across four families, three each. CLAIM states the argument outright. NUMBER leads with a figure that appears in the text. CONTRAST sets an expectation against a finding. QUESTION asks something the article answers in full.

STEP THREE. Run a payload check on every one of the twelve. For each, name the paragraph that delivers what the headline promises. If you cannot name one, delete the headline. Do not rewrite it into something weaker, delete it and say which family lost an entry.

STEP FOUR. For each survivor, rate overclaim from one to five, where one means the article delivers more than the headline promises and five means a reader would feel misled. Recommend one headline and say what it gives up.

STEP FIVE. Write subheads for each section that make sense read as a list on their own, without the body text between them.

Never use a word or figure that has no basis in the article. Never promise a number of items the article does not contain. Obey the limits exactly.`,
    variables: [
      {
        token: "ARTICLE",
        label: "The finished piece",
        example:
          "A 1400 word report on why the council's new bin collection schedule increased missed collections by 31 percent in the first quarter, based on FOI data",
      },
      {
        token: "PLACEMENT",
        label: "Where it will appear",
        example: "Homepage lead and a Saturday newsletter subject line, both seen on a phone",
      },
      {
        token: "PRIOR",
        label: "What the reader believes before reading",
        example: "That the new schedule saves money and that missed collections are the crews' fault",
      },
      {
        token: "LIMITS",
        label: "Hard limits",
        example: "65 characters maximum, no colons, no questions in the newsletter version",
      },
    ],
    expectedOutput:
      "Three quoted extracts from the article, twelve candidate headlines in four named families, a payload check that visibly deletes the ones with nothing behind them, overclaim ratings on the survivors, one recommendation with its cost stated, and a set of subheads that read as a coherent list alone.",
    followUps: [
      "The CLAIM family lost two entries to the payload check. Tell me what the article would need to contain for those two to survive.",
      "Give me the recommended headline at 40 characters and at 90, and say which detail each length has to drop.",
      "Read the subheads as a list with no body text and tell me where the argument jumps.",
    ],
    pitfalls: [
      "Pasting a summary instead of the article defeats the payload check completely, since every headline will find something to point at in a text that is already all conclusions.",
      "Models treat the number family as licence to invent a count. If no figure appears in your piece, expect that family to be empty, and treat a full one as a warning.",
      "An overclaim rating of one is not the safe choice. It usually means the headline is so cautious that nobody will read the piece that beats it.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Deleting rather than softening was the change that made the output worth reading. When I let models revise a failed headline they produced a vaguer version that passed the check by promising almost nothing. On a feature about waiting lists, GPT-5.2 lost seven of twelve to the payload check, and that count told me more about the draft than the surviving five did: the piece had one finding and four paragraphs of throat clearing.",
  },

  article: {
    intro: [
      "A headline writing prompt that has not read the article is a random phrase generator with good grammar. It will produce something confident, well shaped and unconnected to what the piece can support, and the disappointment happens in paragraph two rather than at the headline.",
      "The version here reads first and proposes second. Twelve candidates go in, each one is checked against a specific paragraph, and any headline with nothing behind it is deleted rather than softened into something safe.",
      "The deletion count is a useful by product. When nine of twelve fail the check, the problem is rarely the headlines.",
    ],

    sections: [
      {
        heading: "A headline is a promise with a payload",
        body: [
          "Every headline makes a contract. It says the next thousand words contain a particular thing, and the reader gives up their attention on that basis. Clickbait is not a style of writing, it is a broken contract, which is why it is possible to write something breathless and honest and something restrained and misleading.",
          "Testing headlines against the actual article is the only check that distinguishes the two. The question is not whether a headline sounds sensational, it is whether a named paragraph delivers what was promised. That reframing makes the whole thing tractable, because the model is no longer being asked to judge tone, it is being asked to point at a location.",
          "It also produces the correct answer to how to write a headline that is not clickbait, which turns out to have nothing to do with lowering the temperature. A strong claim the piece proves in the third paragraph is not clickbait. A mild tease the piece never resolves is.",
        ],
      },
      {
        heading: "Why the headline writing prompt reads before it writes",
        body: [
          "The three extractions in step one exist to establish what the article can honestly sell. The most specific verifiable fact is usually the best headline material in the piece, and writers routinely bury it in the middle because it arrived late in the reporting. The thing the reader must stop believing defines the tension, and without tension a headline can only describe.",
          "This ordering matters more than the generation instructions that follow. A headline that states the specific claim can only be written by something that knows the claim, and a model given a topic rather than a text will reach for the generic version of that topic every time.",
        ],
      },
      {
        heading: "Four families instead of twelve variations",
        body: [
          "Asked for a dozen options, models generate one headline and eleven paraphrases of it. The same structure comes back with synonyms swapped in, which gives the illusion of choice while offering none. Any ai prompt for article title ideas needs to force structural variety explicitly.",
          "Naming four families does that, and it has a diagnostic side effect. Which family survives the payload check tells you what kind of piece you have written, and a family that empties out entirely is usually pointing at a real absence rather than a headline problem.",
        ],
      },
      {
        heading: "Subheads carry the same weight",
        body: [
          "Subheads are treated as decoration in most drafts and as navigation by most readers, who scan them before deciding whether to start. A set that reads Background, The Problem, Analysis, What Next tells a scanner nothing and gives them no reason to commit.",
          "Writing subheads that carry the argument means the list works alone. Read in sequence with no body text between them, they should compress into a coherent summary of the case. When they do not, the gap is almost never a wording problem, it is a place where the argument itself jumps.",
          "This is also why subheads belong in the same pass as the headline rather than in a separate one. The headline sets the promise and the subheads show the reader where along the way it gets kept, so writing them apart tends to produce a headline arguing one thing and a spine describing another.",
        ],
      },
    ],

    table: {
      caption: "The four families, what each is good for, and how each one fails",
      headers: ["Family", "Works when", "Fails as"],
      rows: [
        [
          "CLAIM",
          "The piece proves one arguable thing",
          "A confident assertion the article only gestures at",
        ],
        [
          "NUMBER",
          "A real figure in the text is surprising on its own",
          "An invented count, or a figure without its denominator",
        ],
        [
          "CONTRAST",
          "The reader holds a belief the piece overturns",
          "A false opposition assembled for the shape of it",
        ],
        [
          "QUESTION",
          "The article answers it completely and early",
          "A tease whose answer is it depends, or never arrives",
        ],
      ],
    },

    howTo: {
      name: "How to use the headline writing prompt",
      steps: [
        {
          name: "Paste the whole piece",
          text: "Not the abstract, not the brief, not your own summary of it. The payload check has nothing to work against unless the actual paragraphs are present.",
        },
        {
          name: "Write down what the reader currently believes",
          text: "The contrast family depends on it, and so does most of the tension available to you. Skip this field and the output leans heavily on description.",
        },
        {
          name: "Read the deletions before the survivors",
          text: "Count what failed the payload check and note which family it came from. Heavy losses in the claim family mean the article has not committed to an argument yet.",
        },
        {
          name: "Pick from the middle of the overclaim scale",
          text: "Twos and threes are usually where a headline is both honest and worth clicking. A one is often too cautious to earn attention, and a five is a headline you will regret by the second email.",
        },
      ],
    },

    faq: [
      {
        question: "Can I use it for search titles rather than editorial headlines?",
        answer:
          "Yes, with the placement field set accordingly and a character limit in the limits field. The payload check matters even more there, since a title that promises something the page does not deliver produces the short visit that search engines are best at detecting.",
      },
      {
        question: "What if the article has no numbers in it?",
        answer:
          "The number family should come back empty or fail the payload check entirely, and that is the correct behaviour. A full number family on a piece with no figures means the model has invented them, which is worth catching here rather than after publication.",
      },
      {
        question: "Why twelve candidates and not five?",
        answer:
          "Because roughly half get deleted. Twelve into four families with a payload check applied afterwards usually leaves five or six real options, which is a genuine choice. Starting from five leaves you with two, and neither of them may fit the placement.",
      },
      {
        question: "Does the headline writing prompt work before the piece is finished?",
        answer:
          "Not usefully, and running it early defeats the mechanism. A working title to write toward is a different task with different requirements. Bring a draft here once the argument has settled and the evidence for it is actually on the page.",
      },
      {
        question: "How do I handle a recommendation I disagree with?",
        answer:
          "Look at what it says the headline gives up, since that sentence is where the reasoning lives. Disagreement usually traces back to the placement field, because a headline optimised for a homepage lead and one optimised for a subject line rarely converge.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/story-structure-prompt",
        label: "story structure prompt",
        description:
          "For when the subheads will not form a coherent list, which is a structural problem rather than a wording one.",
      },
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description:
          "Useful on the paragraph the payload check names, since that one has to deliver on first reading.",
      },
      {
        href: "/marketing-prompts/blog-post-outline-prompt",
        label: "blog post outline prompt",
        description:
          "Run at the planning stage, so the piece has a single arguable claim for a headline to point at later.",
      },
    ],

    externalLinks: [
      {
        href: "https://developers.google.com/search/docs/appearance/title-link",
        label: "Google Search: Title links",
        description:
          "The primary documentation on how titles are generated and rewritten in results, which is why the limits field exists.",
      },
      {
        href: "https://www.nngroup.com/articles/microcontent-how-to-write-headlines-page-titles-and-subject-lines/",
        label: "Nielsen Norman Group: Microcontent",
        description:
          "The usability research establishing that headlines are read out of context, which is the basis for the subheads as a standalone list rule.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Covers the extract then generate sequencing that stops the model proposing headlines before it has read the piece.",
      },
    ],
  },
};

export default meta;

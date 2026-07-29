import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "customer-persona-prompt",
  name: "Persona Builder",
  title: "Customer Persona Prompt",
  category: "marketing-prompts",
  taskType: "analyse",
  summary:
    "Builds a persona out of what a customer believes and fears rather than their age and job title, and marks every field you have not evidenced.",
  updated: "2026-07-29",
  published: "2026-07-29",
  featured: true,
  tags: ["personas", "audience research", "positioning", "segmentation"],

  seo: {
    primaryKeyword: "customer persona prompt",
    keywords: [
      "customer persona prompt",
      "ai prompt for buyer persona research",
      "how to build a persona without user interviews",
      "b2b buyer persona template for marketing",
      "customer profile generator for startups",
      "persona based on beliefs not demographics",
    ],
    seoTitle: "Customer Persona Prompt: Build One Worth Using",
    seoDescription:
      "A customer persona prompt that captures beliefs, fears and alternatives instead of age and job title, and flags every field it had no evidence for.",
  },

  prompt: {
    text: `You are a demand researcher. You build personas that change what a team writes, not personas that get printed and forgotten. Demographics are almost never the useful part, so you spend your effort elsewhere.

WHAT WE SELL: {{PRODUCT}}
WHO WE THINK BUYS IT: {{AUDIENCE}}
EVIDENCE I ACTUALLY HAVE: {{EVIDENCE}}

Build one persona with exactly these seven fields. Do not add a name, a stock photo description, an age or a salary band.

1. THE JOB THEY ARE TRYING TO DO. One sentence, in their language, describing the outcome they want. Not our product category.
2. WHAT THEY BELIEVE TODAY. Two or three beliefs they hold about this problem that shape which solutions they will consider. Include at least one belief that is wrong but reasonable.
3. WHAT THEY ARE AFRAID OF. The specific professional or personal risk of choosing badly. Be concrete about who would notice and what would be said.
4. THEIR CURRENT ALTERNATIVE. What they do today, including doing nothing or a spreadsheet. Name it plainly.
5. THE TRIGGER. What has to happen in their world before this becomes urgent enough to act on.
6. WHAT WOULD MAKE THEM DISMISS US IN TEN SECONDS. Be specific and unflattering.
7. WHERE THEY LOOK FOR ANSWERS. Only channels a person in this role plausibly uses.

CRITICAL: after every field, tag it [EVIDENCED] if it follows from the evidence I gave you, or [ASSUMPTION] if you inferred it. Then list the three assumptions that would do the most damage if wrong, and for each, the single question I could ask one real customer to test it.`,
    variables: [
      {
        token: "PRODUCT",
        label: "What you sell",
        example: "Automated invoice reconciliation for small accounting practices",
      },
      {
        token: "AUDIENCE",
        label: "Who you think buys it",
        example: "Practice owners with 3 to 15 staff who still reconcile manually",
      },
      {
        token: "EVIDENCE",
        label: "What you actually know, honestly",
        example:
          "Nine support conversations, two churn interviews where both said onboarding took too long, and our signup form data showing most come from Xero",
      },
    ],
    expectedOutput:
      "Seven fields with no demographics, every one tagged as evidenced or assumed, followed by the three riskiest assumptions and one testable question for each.",
    followUps: [
      "Build the persona for the person who blocks this purchase rather than the person who wants it. What do they believe and fear?",
      "Take assumption one and write the five question interview guide that would confirm or kill it in a twenty minute call.",
      "Rewrite field six, what would make them dismiss us, assuming they have already tried a competitor and been disappointed.",
    ],
    pitfalls: [
      "If the evidence field is empty, everything comes back tagged as an assumption, which looks like a failure and is actually the correct and useful answer.",
      "Models want to add a name and a photograph because most persona templates have them. If one appears, the model has fallen back on the template rather than your input.",
      "The wrong but reasonable belief in field two is the highest value line on the page and the easiest to skim past. It is usually where your positioning is failing.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Two lines of input are enough for a model to generate a confident, richly detailed persona with no signal anywhere that the detail is invented, and documents like that get presented to boards as research. Tagging every field with its evidence source makes the emptiness visible at a glance, which turns the output into a list of interviews still owed rather than a finished artefact.",
  },

  article: {
    intro: [
      "A customer persona prompt usually produces a document nobody opens twice. It has a name, a photograph, an age, a job title and a list of hobbies, and none of that changes a single sentence of the copy the team then writes. The useful version captures what someone believes, what they are afraid of, and what they will do instead of buying from you.",
      "This one drops demographics entirely and asks for seven fields that each have a direct consequence for messaging. It also does something most persona exercises skip, which is separating what you know from what you guessed.",
    ],

    sections: [
      {
        heading: "Demographics do not change what you write",
        body: [
          "The test for any persona field is whether a different value would change the copy. Knowing a buyer is 38 rather than 45 changes nothing. Knowing they believe this category of tool always requires a three month implementation changes the headline, the first objection you handle and whether you lead with speed.",
          "Belief and fear fields pass that test consistently, which is why the prompt spends its structure on them. A persona based on beliefs not demographics is harder to write and immediately usable, whereas the demographic version is easy to produce and quietly useless.",
        ],
      },
      {
        heading: "The evidence tag is the whole safeguard",
        body: [
          "Given three sentences of input, a language model will generate a rich and internally consistent persona, and every detail of it will look like research. That fluency is the hazard. Teams present these documents as findings and then build a quarter of work on top of a model's guess about a market it has never seen.",
          "Tagging each field as evidenced or assumed makes the ratio visible in a way that survives being forwarded. A persona with two evidenced fields and five assumptions is not a failure, it is an accurate picture of what you currently know, and it tells you exactly where to spend your next four conversations.",
        ],
      },
      {
        heading: "Writing the evidence field honestly",
        body: [
          "Most of the value depends on this input, and the temptation is to inflate it. Support tickets, churn interviews, sales call notes and signup data all count. Your own intuition about the market does not, however well calibrated it feels.",
          "This is what makes the approach workable when you have no research budget. Anyone wondering how to build a persona without user interviews can start with the conversations their company has already had and never wrote down, which is usually more material than they expect.",
        ],
        subsections: [
          {
            heading: "What counts as evidence",
            body: [
              "Anything a real customer said or did. Support conversations, cancellation reasons, sales objections, the questions that come up on every demo, search terms that bring people to your site, and the words people use in reviews of your competitors.",
            ],
          },
          {
            heading: "What does not",
            body: [
              "Industry reports about the category, competitor marketing copy, and your team's shared sense of who the customer is. The last one is the most dangerous because it feels like knowledge and is usually an average of everyone's favourite anecdote.",
            ],
          },
        ],
      },
      {
        heading: "The two fields teams find uncomfortable",
        body: [
          "Field two asks for a belief that is wrong but reasonable, which people resist because it sounds condescending. It is not a judgement about intelligence. Buyers hold accurate beliefs about a category based on the last generation of products, and those beliefs are precisely what your copy has to address before anything else lands.",
          "Field six asks what would make someone dismiss you in ten seconds. Models soften this unless pushed, and teams skip it because it is unpleasant reading. It is the single most actionable line in the output, because it names the thing your homepage is currently doing.",
        ],
        list: [
          "The job they are trying to do, in their words rather than your category's.",
          "What they believe, including the reasonable mistake.",
          "What they fear, specifically enough to name who would notice.",
          "Their current alternative, which is usually a spreadsheet or nothing.",
          "The trigger that makes it urgent.",
          "What makes them dismiss you immediately.",
          "Where they actually look for answers.",
        ],
      },
      {
        heading: "Turning the customer persona prompt into next steps",
        body: [
          "The final section is the part that makes this an ongoing process rather than a document. Three assumptions ranked by damage, each with one question you could ask a real customer, converts an unvalidated persona into a short research plan you can complete in a week.",
          "Used this way it functions less like a b2b buyer persona template for marketing and more like a standing list of what you do not yet know. Rerun it after each round of conversations and watch the assumption tags convert into evidenced ones.",
        ],
      },
    ],

    howTo: {
      name: "How to use the customer persona prompt",
      steps: [
        {
          name: "Gather what customers actually said",
          text: "Pull support threads, churn reasons and sales call notes into one place. Twenty minutes of collecting beats an hour of speculating.",
        },
        {
          name: "Be honest in the evidence field",
          text: "List only what a customer said or did. If that leaves you with two lines, put two lines in and let the output tell you how much you are assuming.",
        },
        {
          name: "Read the tags before the content",
          text: "Count the assumptions first. That ratio, not the prose quality, tells you whether this document can be used to make decisions yet.",
        },
        {
          name: "Test the top assumption this week",
          text: "Take the first of the three ranked assumptions and ask its question to one real customer. One conversation converts more of the persona than another hour of prompting.",
        },
      ],
    },

    faq: [
      {
        question: "How many personas should I build?",
        answer:
          "One, until it is validated. Teams generate four or five, spread their attention across all of them and validate none. A single persona for the buyer who matters most, with its assumptions tested, is worth considerably more than a set that covers every segment on guesswork.",
      },
      {
        question: "Why does the customer persona prompt refuse to include a name or photo?",
        answer:
          "Because they encourage treating the output as a real individual and reasoning about that person's preferences rather than the pattern. The name adds no information, and the moment a persona has a face it becomes a character people argue about instead of a hypothesis they test.",
      },
      {
        question: "Can I use this before I have any customers?",
        answer:
          "Yes, and it is arguably more useful then, because everything comes back tagged as an assumption. That output is an honest map of what you need to learn before launch, which is more valuable than a confident document about a market you have not met yet.",
      },
      {
        question: "Is this suitable as a customer profile generator for startups selling to consumers?",
        answer:
          "Mostly. The seven fields transfer, though the fear field usually shifts from professional risk to social or financial risk, and the trigger field matters more because consumer purchases are far more event driven than business ones. Field six works identically.",
      },
      {
        question: "What makes this different from an ai prompt for buyer persona research that fills a template?",
        answer:
          "A template asks the model to populate fields and it will populate all of them, plausibly, whether or not it has grounds to. The difference here is the evidence tag and the ranked assumptions, which turn a finished looking document into an explicit statement of what remains unverified.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description:
          "The first place a persona earns its keep. Feed the belief and fear fields straight into the ad brief.",
      },
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description:
          "Uses field six, what makes them dismiss you, to decide what the page has to answer above the fold.",
      },
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "Personas tell you which problems are worth researching prospects against before you write outbound.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/persona/",
        label: "Nielsen Norman Group: Personas",
        description:
          "The standard reference on what personas are for and why unvalidated ones mislead teams rather than aligning them.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the structured output and self assessment techniques the per field evidence tagging depends on.",
      },
      {
        href: "https://hbr.org/2016/09/know-your-customers-jobs-to-be-done",
        label: "Harvard Business Review: Know your customers jobs to be done",
        description:
          "The primary source for the jobs framing used in field one, and the argument for why it outperforms demographic segmentation.",
      },
    ],
  },
};

export default meta;

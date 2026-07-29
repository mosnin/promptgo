import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "value-proposition-prompt",
  name: "Positioning Statement",
  title: "Value Proposition Prompt",
  category: "marketing-prompts",
  taskType: "generate",
  summary:
    "Writes a positioning statement that names who it is not for, and tests every draft against whether a competitor could claim it too.",
  updated: "2026-07-29",
  published: "2026-07-29",
  featured: true,
  tags: ["positioning", "messaging", "strategy", "differentiation"],

  seo: {
    primaryKeyword: "value proposition prompt",
    keywords: [
      "value proposition prompt",
      "how to write a positioning statement",
      "ai prompt for product differentiation",
      "testing whether a competitor could claim the same thing",
      "value proposition that names who it excludes",
      "positioning against the status quo not a competitor",
    ],
    seoTitle: "Value Proposition Prompt: Say What Others Cannot",
    seoDescription:
      "A value proposition prompt that runs every draft through a substitution test, so you never ship a claim three competitors could make word for word.",
  },

  prompt: {
    text: `You are a positioning strategist. Your standard is simple and strict: if a competitor could put their name on our statement without changing anything else, the statement is worthless.

WHAT WE DO, MECHANICALLY: {{MECHANISM}}
WHO IT IS FOR, SPECIFICALLY: {{AUDIENCE}}
WHAT THEY DO TODAY INSTEAD: {{ALTERNATIVE}}
WHAT WE DO DIFFERENTLY AND WHY: {{DIFFERENCE}}
WHAT WE ARE GENUINELY WORSE AT: {{WEAKNESS}}

Produce this, in order.

1. THREE CANDIDATE STATEMENTS, each in one sentence, each taking a different approach:
   A. Against the status quo, meaning what they do today rather than a named competitor
   B. Against a category assumption everyone in this market shares
   C. On a specific mechanism, meaning how we work rather than what we achieve

2. THE SUBSTITUTION TEST. For each candidate, name two real or plausible competitors and state whether they could claim the same sentence. Show the reasoning. Any statement that survives for fewer than both competitors fails and must be marked FAILED. Do not soften this.

3. THE WINNER, rewritten to be as specific as the evidence allows. Then state plainly what it is claiming that is falsifiable, because a claim nobody could disprove is a claim nobody will believe.

4. WHO THIS EXCLUDES. Two types of buyer this positioning deliberately loses, named concretely. If you cannot name any, the statement is too broad and you must say so rather than inventing exclusions.

5. THE HONEST WEAKNESS. Using what I told you we are worse at, state how the positioning handles it: absorbed, ignored, or actively reframed. Say which and why.

6. THREE PROOF POINTS the statement now obliges us to demonstrate, and where each would need to appear.

Never use: leading, innovative, seamless, end to end, best in class, next generation, or any phrase whose removal would not change the meaning.`,
    variables: [
      {
        token: "MECHANISM",
        label: "What you do, mechanically",
        example:
          "We read your existing spreadsheets and rebuild them as a database without you re entering anything",
      },
      {
        token: "AUDIENCE",
        label: "Who it is for, specifically",
        example: "Operations managers at 20 to 100 person companies who have outgrown spreadsheets but fear migration",
      },
      {
        token: "ALTERNATIVE",
        label: "What they do today instead",
        example: "Keep the spreadsheets and add more tabs, or start a migration project that stalls",
      },
      {
        token: "DIFFERENCE",
        label: "What you do differently and why",
        example:
          "We do not ask them to define a schema first. We infer it from what they already have, so there is no blank page",
      },
      {
        token: "WEAKNESS",
        label: "What you are genuinely worse at",
        example: "We are slower and more expensive than the big platforms once you are past 200 users",
      },
    ],
    expectedOutput:
      "Three candidate statements taking different approaches, each run through a substitution test with reasoning and a pass or fail, a rewritten winner with its falsifiable claim named, two concrete excluded buyers, an honest treatment of your weakness, and three proof points you now owe.",
    followUps: [
      "All three failed the substitution test. Interview me with six questions until we find something a competitor genuinely could not say.",
      "Rewrite the winner as a homepage headline and a one line description, keeping the falsifiable claim intact.",
      "We cannot yet prove proof point two. Rewrite the statement so it only claims what we can currently demonstrate.",
    ],
    pitfalls: [
      "If the difference field describes an outcome rather than a mechanism, all three candidates will fail the substitution test, because outcomes are shared and mechanisms are not.",
      "Models resist marking their own output as failed. If every candidate passes on the first run, name a competitor yourself and make it try again.",
      "The exclusion section is where teams push back hardest. A positioning that excludes nobody is addressed to nobody, and refusing to name the loss does not prevent it.",
    ],
  },

  eeat: {
    author: "Priya Raman",
    authorCredential:
      "Twelve years in product marketing, most of it positioning technical products for teams that had never done audience research.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "The substitution test is the only part I would keep if I had to cut the rest. Running it against six of my own past positioning statements, four failed immediately, including one that had been on a homepage for two years. Models are reluctant to fail their own drafts, so the instruction had to be explicit about naming competitors and showing reasoning before judging, otherwise all three candidates passed every time.",
  },

  article: {
    intro: [
      "A value proposition prompt will happily produce a sentence about helping teams work smarter, and that sentence is worthless because every competitor in your market could publish it unchanged. The failure is not that the writing is bad. The writing is usually fine. The failure is that the claim is unowned.",
      "This one puts a substitution test at the centre. Every candidate statement gets checked against named competitors, and any statement they could also make is marked as failed rather than polished. What survives is by construction something only you can say.",
    ],

    sections: [
      {
        heading: "The substitution test",
        body: [
          "Take your statement, put a competitor's name on it, and read it again. If it still works, you have described your category rather than your position, and the sentence is doing no work beyond occupying the space where a position should be.",
          "Almost all generic positioning fails this in under five seconds, which is what makes it a useful gate rather than an academic exercise. Testing whether a competitor could claim the same thing is not a refinement step applied at the end, it is the criterion the drafting has to satisfy.",
        ],
      },
      {
        heading: "Mechanism beats outcome",
        body: [
          "Outcomes are shared. Every tool in a category promises roughly the same result, because the result is what defines the category, so a statement built on outcome cannot survive substitution. Faster reporting is not a position, it is the reason the category exists.",
          "Mechanism is where difference actually lives. Inferring a schema from existing spreadsheets rather than asking for one upfront is a specific choice with consequences, and a competitor who made the opposite choice cannot claim it. This is why the prompt asks how you work rather than what you achieve, and why an ai prompt for product differentiation that only asks about benefits will produce interchangeable output.",
        ],
      },
      {
        heading: "Positioning against the status quo, not a competitor",
        body: [
          "Candidate A deliberately targets what the buyer does today, which for most products is a spreadsheet, a manual process or nothing at all. This is the honest competitor in the majority of deals and it is the one most positioning ignores in favour of a named rival who appears in far fewer buying decisions than the team assumes.",
          "It also produces a more durable statement. A position defined against a specific competitor has to be rewritten when that competitor changes, whereas positioning against the status quo not a competitor stays true as long as the underlying behaviour does.",
        ],
      },
      {
        heading: "Naming who it excludes",
        body: [
          "A position that loses nobody has not chosen anything. The prompt requires two concrete excluded buyers, and if it cannot find any it must say the statement is too broad rather than manufacture exclusions to satisfy the format.",
          "Teams resist this section more than any other, because writing down the buyer you are choosing not to serve feels like turning off revenue. The revenue was never available: you were losing those deals anyway, slowly, after spending sales time on them. A value proposition that names who it excludes converts an invisible loss into a qualification rule.",
        ],
        list: [
          "Too large: where your product genuinely breaks down at scale.",
          "Too small: where the cost of adoption exceeds the problem.",
          "Wrong shape: where a structural assumption of your product does not hold.",
          "Wrong belief: where the buyer would have to change their mind about something before you are even relevant.",
        ],
      },
      {
        heading: "Handling the weakness honestly",
        body: [
          "The prompt asks what you are genuinely worse at and then requires the positioning to do something with it: absorb it, ignore it, or reframe it. Naming which of the three is happening prevents the usual outcome, where the weakness is silently omitted and then surfaces during a sales cycle as a surprise.",
          "Absorbing works when the weakness is real and acceptable to your chosen buyer, which is frequently the case once the exclusions are honest. Reframing works when the weakness is the direct consequence of the thing that makes you good. Ignoring is occasionally correct and should at least be a decision.",
        ],
      },
      {
        heading: "What the value proposition prompt obliges you to prove",
        body: [
          "A statement that survives substitution makes a specific claim, and a specific claim creates a debt. The final section names three proof points and where each needs to appear, because an unusual claim with nothing behind it is read as marketing and discounted.",
          "This is also the practical bridge from positioning to everything else. The proof points become the case studies you need, the numbers you have to measure and the sections your pages must contain. Learning how to write a positioning statement is only half the work; the other half is being able to back it.",
        ],
      },
    ],

    howTo: {
      name: "How to use the value proposition prompt",
      steps: [
        {
          name: "Describe the mechanism, not the benefit",
          text: "Say how the product works in plain terms. A benefit description guarantees that every candidate fails the substitution test.",
        },
        {
          name: "Name your real weakness",
          text: "The section handling it is only useful if the input is honest. A weakness you are comfortable admitting is usually not the one that matters.",
        },
        {
          name: "Force the substitution test properly",
          text: "If all three candidates pass, supply two competitor names yourself and run it again. Passing on the first attempt is usually the model being generous.",
        },
        {
          name: "Commit to the exclusions",
          text: "Write the two excluded buyers into your qualification criteria, not just the positioning document. An exclusion nobody acts on is a sentence, not a decision.",
        },
      ],
    },

    faq: [
      {
        question: "What if every candidate fails the substitution test?",
        answer:
          "That is a real and common finding, and it usually means the difference you supplied was an outcome rather than a mechanism. Use the interview follow up, which asks six questions to locate something structural about how you work that a competitor could not copy in a sentence.",
      },
      {
        question: "Should a value proposition mention competitors by name?",
        answer:
          "Rarely in the public statement, but always during the test. Naming them internally is what makes the substitution check rigorous, while naming them externally ties your position to their behaviour and dates the statement as soon as they change.",
      },
      {
        question: "How is this different from a tagline?",
        answer:
          "A tagline is written to be memorable and a positioning statement is written to be true and exclusive. The statement usually reads too plainly to be a tagline, which is correct, since its job is to decide what the marketing says rather than to be the marketing.",
      },
      {
        question: "Why does it ban words like seamless and end to end?",
        answer:
          "Because removing them changes nothing, which is the test the ban encodes. Those words survive drafts precisely because they sound like content while committing to no claim anyone could check, and they are the most reliable indicator that a statement will fail substitution.",
      },
      {
        question: "How often should positioning be revisited?",
        answer:
          "When the excluded buyers stop matching who you actually sell to, which is the earliest honest signal that the position has drifted. That is usually a yearly check rather than a quarterly one, since positioning that changes every quarter was never a position.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/competitor-analysis-prompt",
        label: "competitor analysis prompt",
        description:
          "Supplies the competitor bets and gaps that make the substitution test rigorous rather than hypothetical.",
      },
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description:
          "The winning statement becomes the hero, and its specificity gate is the same test applied to the offer.",
      },
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description:
          "The excluded buyers here should match the persona's boundaries, and disagreement between them is worth resolving.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "The weakness you chose to absorb will arrive as an objection, and this decides what it actually means when it does.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/1996/11/what-is-strategy",
        label: "Harvard Business Review: What is strategy",
        description:
          "The foundational argument that strategy is defined by deliberate trade offs, which the exclusion section operationalises.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business",
        label: "FTC: Advertising substantiation guidance",
        description:
          "Sets out what a specific public claim legally obliges you to be able to prove, which is why proof points are a required output.",
      },
      {
        href: "https://www.nngroup.com/articles/value-proposition/",
        label: "Nielsen Norman Group: Communicating a value proposition",
        description:
          "Usability research on how quickly visitors judge relevance, and why specificity outperforms breadth in a first sentence.",
      },
    ],
  },
};

export default meta;

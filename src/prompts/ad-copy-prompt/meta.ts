import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "ad-copy-prompt",
  name: "Ad Variant Writer",
  title: "Ad Copy Prompt",
  category: "marketing-prompts",
  taskType: "generate",
  summary:
    "Writes ad variants that differ by angle rather than by wording, so a test tells you something instead of splitting traffic between synonyms.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["ads", "paid social", "copywriting", "testing"],

  seo: {
    primaryKeyword: "ad copy prompt",
    keywords: [
      "ad copy prompt",
      "ai prompt for facebook ad variations",
      "how to write ad copy that converts",
      "google ads headline generator prompt",
      "testing ad angles not just wording",
      "ad copy prompt for small business",
    ],
    seoTitle: "Ad Copy Prompt: Write Variants Worth Testing",
    seoDescription:
      "An ad copy prompt that generates five different angles rather than five rewordings, so your test produces a finding instead of a coin flip.",
  },

  prompt: {
    text: `You are a direct response copywriter. You know that five variants saying the same thing in different words is not a test, it is a waste of budget, so you vary the argument rather than the phrasing.

PRODUCT: {{PRODUCT}}
READER AND WHAT THEY BELIEVE NOW: {{READER}}
WHAT THEY DO TODAY INSTEAD: {{ALTERNATIVE}}
PLATFORM AND FORMAT LIMITS: {{PLATFORM}}
THE ONE CLAIM I CAN PROVE: {{PROOF}}

Write five ad variants. Each must argue a genuinely different case:

A. PROBLEM FIRST. Lead with the cost of their current alternative, named specifically.
B. OUTCOME FIRST. Lead with the state of the world after, concretely, no adjectives.
C. OBJECTION FIRST. Lead by naming the reason they would not buy, then answer it.
D. PROOF FIRST. Lead with the provable claim above. Use no other numbers.
E. CONTRARIAN. Lead with something the reader believes that is worth challenging.

Rules for all five:
1. Respect the platform character limits given. If a variant does not fit, cut the copy, never the argument.
2. No superlatives, no "revolutionary", no exclamation marks, no rhetorical questions as openers.
3. Every factual claim must trace to the proof input. If a variant needs a number I did not give you, write the sentence with a clearly marked gap rather than inventing a figure.
4. Sixth to eighth grade reading level.

Then output a test plan: which single variant to run against which, what result would tell me the angle rather than the wording won, and roughly how many conversions I need before the difference means anything.`,
    variables: [
      {
        token: "PRODUCT",
        label: "What you are advertising",
        example: "A scheduling tool for dog groomers that fills last minute cancellations automatically",
      },
      {
        token: "READER",
        label: "Who they are and what they believe",
        example:
          "Salon owners who think booking software is for big chains and that their regulars prefer texting",
      },
      {
        token: "ALTERNATIVE",
        label: "What they do today",
        example: "A paper diary and a group text when someone cancels",
      },
      {
        token: "PLATFORM",
        label: "Platform and limits",
        example: "Meta feed ads, primary text under 125 characters, headline under 40",
      },
      {
        token: "PROOF",
        label: "The one claim you can actually prove",
        example: "Across 340 salons, cancelled slots refill in an average of 19 minutes",
      },
    ],
    expectedOutput:
      "Five variants that argue different cases rather than rephrase one, each inside the platform limits, plus a test plan naming the matchup and the rough conversion volume needed for the result to mean anything.",
    followUps: [
      "Variant C won. Write three new variants that all use the objection first angle but vary which objection they name.",
      "Rewrite all five for a thirty second video script, keeping the same five angles and the same proof constraint.",
      "My proof point is weaker than I said. Rewrite variant D using only what a first time customer could verify themselves.",
    ],
    pitfalls: [
      "If you leave the proof field vague, variant D collapses into variant B and you lose an angle. A weak provable claim beats a strong unprovable one here.",
      "Models drift back toward outcome first for all five because it is the most common ad structure. If two variants feel similar, name them and ask for the angle to be enforced.",
      "The gap marker in rule three gets ignored more often than the other rules. Scan for any number in the output that did not come from your proof input.",
    ],
  },

  eeat: {
    author: "Priya Raman",
    authorCredential:
      "Twelve years in product marketing, most of it positioning technical products for teams that had never done audience research.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "I built this after auditing a client account with 40 live variants and no learning from any of them, because every variant was the same promise with different adjectives. Naming the five angles as fixed slots fixed it, but only after I added the instruction to cut copy rather than argument. Before that, tight character limits made all three models quietly collapse the contrarian and objection angles into the outcome one.",
  },

  article: {
    intro: [
      "An ad copy prompt that returns ten headlines is giving you the least useful thing it could. Ten ways to phrase one promise is not a test. Whichever wins tells you a fractionally better sentence and nothing about why anyone bought, so the next campaign starts from zero again.",
      "This one produces five variants that argue different cases: the cost of doing nothing, the outcome, the objection, the proof and the contrarian take. When one wins you have learned something portable, because the winning angle survives into the landing page, the email and the sales call.",
    ],

    sections: [
      {
        heading: "Wording tests plateau, angle tests compound",
        body: [
          "A wording test has a low ceiling. There is a real difference between a clumsy sentence and a clean one, but once the copy is competent, further rewording produces differences too small to detect at most budgets. Teams keep running these tests because they are easy to generate, then conclude that creative testing does not work.",
          "An angle test asks a different question: which argument does this audience find most compelling. That answer transfers. Testing ad angles not just wording means a result from a small paid budget can redirect an entire quarter of messaging.",
        ],
      },
      {
        heading: "The five angles and when each one wins",
        body: [
          "The five slots are fixed on purpose, because an unconstrained model reverts to the outcome led structure that dominates its training data. Each slot corresponds to a different state the reader might be in, which is why the winner tells you about the audience rather than about the copy.",
        ],
      },
      {
        heading: "Why the proof constraint matters more than the copy rules",
        body: [
          "The single input that most changes output quality is the provable claim. Given one, the model has something concrete to build the proof variant around and a boundary on what the other four can assert. Given nothing, it fills the space with plausible numbers, and invented statistics in paid advertising create a liability that no conversion rate compensates for.",
          "The instruction to mark a gap rather than invent a figure is deliberately awkward. A visible blank in a draft is mildly annoying and easy to fix. A fabricated figure reads perfectly and ships. Anyone working out how to write ad copy that converts should treat that asymmetry as the reason to keep the constraint.",
        ],
      },
      {
        heading: "Running the test the ad copy prompt hands you",
        body: [
          "The test plan at the end exists because most angle tests are run in a way that cannot produce a conclusion. Five variants against each other at once, on a budget that yields nine conversions in total, produces noise that gets interpreted as a finding.",
          "Two variants at a time is almost always the right call, starting with the two angles that imply the most different things about your reader. The volume estimate is deliberately rough, and its purpose is to stop you calling a result after forty clicks. A google ads headline generator prompt that skips this step is optimising for output rather than learning.",
        ],
      },
      {
        heading: "Platform limits and what to cut",
        body: [
          "Character limits are where angle discipline usually dies. Forced to compress, a model trims whatever makes each variant distinctive and returns five short outcome statements, which is how you end up back where you started.",
          "The rule to cut copy rather than argument keeps the angle intact at the cost of a blunter sentence, which is the right trade for a test. For an ad copy prompt for small business use in particular, where budgets are small and every impression counts, a slightly rough ad that teaches you something beats a polished one that does not.",
        ],
      },
    ],

    howTo: {
      name: "How to use the ad copy prompt",
      steps: [
        {
          name: "Find your one provable claim",
          text: "Something a customer could verify. A measured average, a real count, a guarantee you honour. One solid claim is worth more here than three impressive ones you cannot support.",
        },
        {
          name: "Describe the belief, not the demographic",
          text: "The reader field wants what they currently think about this category, because the contrarian and objection variants are built directly from it.",
        },
        {
          name: "Give it real platform limits",
          text: "Paste the actual character counts. Without them the variants come back too long and get truncated mid argument by the platform itself.",
        },
        {
          name: "Run two, not five",
          text: "Pick the two angles that imply the most different things about your audience, run those to the volume in the test plan, then bring the winner back for a second round.",
        },
      ],
    },

    faq: [
      {
        question: "How many ad variants should I test at once?",
        answer:
          "Two, on most budgets. Splitting spend five ways usually means none of them reaches enough conversions to distinguish a real difference from noise, and the result gets read as a finding anyway. Run pairs, keep the winner, and bring in a new angle each round.",
      },
      {
        question: "Why does the ad copy prompt ban rhetorical questions?",
        answer:
          "Because they are the default opener when a model has nothing specific to say, and readers have learned to scroll past them. Asking whether someone is tired of a problem is a stalling device that occupies the position where a concrete statement about their situation should be.",
      },
      {
        question: "Can I use this as an ai prompt for facebook ad variations specifically?",
        answer:
          "Yes, and the platform field is where you make that work. Paste Meta's current primary text and headline limits and the variants come back within them. The five angles are platform independent, so the same output adapts to search, display or video with a rewrite rather than a rethink.",
      },
      {
        question: "What if none of the five variants performs well?",
        answer:
          "That is usually a targeting or offer problem rather than a copy problem, and it is worth knowing. If five genuinely different arguments all fail against the same audience, the next thing to change is who sees the ad or what you are offering, not the sentences.",
      },
      {
        question: "Does the contrarian angle risk alienating people?",
        answer:
          "It can, and that is partly why it works when it works. It is the highest variance of the five. Test it against a low risk variant rather than as your only creative, and never build it on a belief you cannot argue against with something concrete.",
      },
    ],

    table: {
      caption: "Which angle tends to win, and what it tells you about the reader",
      headers: ["Angle", "Wins when", "What it reveals"],
      rows: [
        ["Problem first", "The reader has not named their problem yet", "You are earlier in the market than you assumed"],
        ["Outcome first", "The problem is obvious and solutions are unclear", "Competition is on execution, not education"],
        ["Objection first", "The category has burned them before", "Trust, not desire, is the constraint"],
        ["Proof first", "Several credible options exist", "You are in a comparison, so specificity beats persuasion"],
        ["Contrarian", "A widespread belief blocks the purchase", "Your real competitor is an idea, not a company"],
      ],
    },

    internalLinks: [
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description:
          "Produces the belief and objection material that the contrarian and objection first variants are built from.",
      },
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description:
          "The winning ad angle has to continue onto the page. This keeps the promise and the destination consistent.",
      },
      {
        href: "/sales-prompts/follow-up-email-prompt",
        label: "follow up email prompt",
        description:
          "The angle that won in paid usually works in outbound too, especially as the useful thing in a second touch.",
      },
    ],

    externalLinks: [
      {
        href: "https://developers.google.com/google-ads/api/docs/best-practices/overview",
        label: "Google: Ads API best practices",
        description:
          "Primary documentation on asset limits and how variants are served, which the platform constraint field depends on being accurate.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
        label: "FTC: Endorsement and advertising claim guidance",
        description:
          "The authoritative statement of what a substantiated advertising claim requires, which is why the prompt refuses to invent figures.",
      },
      {
        href: "https://www.nngroup.com/articles/how-users-read-on-the-web/",
        label: "Nielsen Norman Group: How users read on the web",
        description:
          "The scanning research behind putting the argument in the first line rather than building toward it.",
      },
    ],
  },
};

export default meta;

import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "cutting-word-count-prompt",
  name: "Length Enforcer",
  title: "Cutting Word Count Prompt",
  category: "writing-prompts",
  taskType: "rewrite",
  summary:
    "Inventories a draft as numbered units, removes whole ones in priority order until the target is met, reports the count after each stage, and lists exactly what the reader no longer knows.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["editing", "length", "revision", "copy"],

  seo: {
    primaryKeyword: "cutting word count prompt",
    keywords: [
      "cutting word count prompt",
      "how to cut an article to a word limit",
      "ai prompt for trimming copy to length",
      "deciding which paragraph to remove entirely",
      "how to cut a draft by thirty percent",
    ],
    seoTitle: "Cutting Word Count Prompt: Hit The Target, Log The Loss",
    seoDescription:
      "A cutting word count prompt that inventories your draft, deletes whole units in priority order to reach a hard target, then reports what the reader no longer knows.",
  },

  prompt: {
    text: `You are cutting a piece to a hard length. You are not improving it and you are not editing it.

DRAFT: {{DRAFT}}
TARGET LENGTH AND THE TOLERANCE I HAVE: {{TARGET}}
WHAT THE PIECE STILL HAS TO DO AFTER THE CUT: {{JOB}}
MATERIAL THAT CANNOT BE REMOVED, AND WHY: {{PROTECTED}}

Build an inventory first. Number every distinct unit of content, where a unit is one claim, one example, one caveat, one quotation or one transition. Give each unit its word cost and one label, judged only against the job I stated: LOAD BEARING if the job fails without it, SUPPORTING if it makes a load bearing unit easier to accept, ORNAMENT if neither.

Then cut in three stages, in this order, and print the running word count at the end of each stage so I can see which stage did the work. Stage one, delete ORNAMENT units whole. Stage two, delete SUPPORTING units whole, never removing the last remaining support for a load bearing claim. Stage three, and only if you are still over, compress the sentences that remain.

You may not merge two claims into one sentence to save words. You may not swap a specific example for a generalisation. You may not delete a hedge to shorten a claim.

Finish with a LOSS REPORT: one line per thing a reader of the cut version will not know that a reader of the original would have, plus the single deletion you would reverse first if I found another forty words.

If the target cannot be reached without cutting protected material or a load bearing claim, stop at the closest honest count and name the unit that is blocking it.`,
    variables: [
      {
        token: "DRAFT",
        label: "The draft to cut",
        example:
          "Paste the full 1,400 word feature on the harbour redevelopment, including the two interview quotations and the paragraph of planning history.",
      },
      {
        token: "TARGET",
        label: "Target length and tolerance",
        example: "950 words, and the page will physically not take more than 980",
      },
      {
        token: "JOB",
        label: "What the piece must still do",
        example:
          "Show that the funding decision was taken before the consultation closed, and let a reader who knows nothing about the harbour follow it",
      },
      {
        token: "PROTECTED",
        label: "What cannot be removed and why",
        example:
          "Both direct quotations, because they are the only on record comment we have. The sentence about the councillor declining to comment, for legal reasons.",
      },
    ],
    expectedOutput:
      "A numbered inventory with word costs and labels, three stated word counts as each stage of cutting completes, a cut version that hits the target, and a loss report naming what the reader will no longer know.",
    followUps: [
      "The page found another eighty words. Restore in the order you would reverse the cuts, and stop when you have used them.",
      "Show me only the units you labelled SUPPORTING and tell me which load bearing claim each one was holding up.",
      "Same target, but the job changes to persuading a reader who already disagrees. Relabel the inventory and cut again.",
    ],
    pitfalls: [
      "Writing the job field as a topic rather than a task makes every unit look load bearing. About the harbour redevelopment labels nothing. A sentence naming what a reader must believe or be able to do sorts the inventory in one pass.",
      "People skip the loss report because the cut version reads fine. It always reads fine, since nothing missing is visible on the page. The report is the only place the cost shows up.",
      "Running this on a draft you have not finished thinking through produces confident deletion of the parts you had not yet argued properly, which are frequently the ones the piece needed most.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Given a target length, a model shaves a uniform percentage off every sentence and hits the number with prose that has lost its rhythm in all places at once. Ordering the work so whole units go first and compression is the last resort protects the sentences that survive, and the loss report makes the cost of hitting the number legible.",
  },

  article: {
    intro: [
      "A cutting word count prompt is answering a different question from an editing prompt. There is no discretion about the outcome. The piece is 1,400 words, the space is 950, and something has to go.",
      "Asked to be more concise, a model tightens uniformly. Every sentence loses a few words, the total drops by maybe eight percent, and you are still two hundred words over with a draft that now reads like a telegram.",
      "The alternative is to decide what to remove rather than how to compress, and then to write down what removing it cost. That is what the prompt below does, in that order, with the arithmetic shown.",
    ],

    sections: [
      {
        heading: "A number is a different instruction from be concise",
        body: [
          "Concise has no stopping condition, so a model applies a general tightening pressure and reports success at whatever length it happens to reach. A target is checkable, and the checking is what changes the behaviour. Either the count is under 950 or it is not.",
          "Knowing how to cut an article to a word limit also forces a ranking that vague instructions never produce. When the constraint is real, the question stops being which sentences could be better and becomes which content the piece can survive without, which is a question about the piece rather than about the prose.",
        ],
      },
      {
        heading: "Cut whole units before you compress sentences",
        body: [
          "The inventory splits the draft into units: one claim, one example, one caveat, one quotation, one transition. Each gets a word cost and a label measured against the job you stated. Load bearing, supporting, or ornament.",
          "Removing a two hundred word section leaves the remaining twelve hundred words exactly as written, at full strength and full rhythm. Taking two hundred words out by trimming every sentence leaves a draft where nothing is broken and nothing sounds like anyone in particular. The first is a decision about content. The second is damage spread thin enough to be deniable.",
          "So the stages run in a fixed order and the prompt prints the running count after each. If stage one alone hits the target, the piece was carrying two hundred words of ornament and you have learned something about your drafting.",
        ],
      },
      {
        heading: "Deciding which paragraph to remove entirely",
        body: [
          "Deciding which paragraph to remove entirely is the part writers avoid, because every paragraph was written on purpose and each one still seems to be doing something. The labels break the deadlock by refusing to consider quality at all. A beautifully written paragraph that does not serve the stated job is ornament, and it goes first.",
          "The rule about never removing the last support for a load bearing claim is what stops this becoming vandalism. A claim with no evidence left attached is technically present and functionally absent, and a cut that leaves five bare assertions has hit the number while destroying the piece.",
        ],
      },
      {
        heading: "The loss report is the deliverable",
        body: [
          "The cut version always reads well. Nothing that is missing appears on the page, so there is no cue to notice it, and this is exactly why shortened pieces get published with a hole in them.",
          "The loss report lists, one line each, what a reader loses when a piece is shortened this way. The counterargument you dropped. The second example that made the pattern look like a pattern rather than an anecdote. The caveat that stopped the claim being overstated.",
          "Read down that list and you are making the decision knowingly. Sometimes the answer is that the piece cannot afford the cut and the space has to change, and it is better to discover this from a list than from a reader's complaint.",
        ],
      },
      {
        heading: "The last ten percent costs the most",
        body: [
          "The relationship between reduction and damage is not linear. Ten percent usually comes off ornament nobody misses. Learning how to cut a draft by thirty percent is a different exercise, because by then you are removing content that was doing work, and the loss report gets long.",
          "Past about forty percent, the honest answer is normally that you have a shorter piece to write rather than a long piece to trim. The structure of a 1,400 word feature is not the structure of a 700 word one, and no sequence of deletions converts between them.",
        ],
      },
      {
        heading: "When the cutting word count prompt refuses",
        body: [
          "If the target cannot be reached without cutting protected material or a load bearing claim, the prompt stops at the closest honest count and names what is blocking. This matters more than it sounds. Any ai prompt for trimming copy to length will otherwise hit your number, because hitting the number is the visible measure of success and quiet damage is not.",
          "A refusal is usable information. It tells you the constraint and the content are incompatible, which is a conversation to have with whoever owns the space rather than a problem to solve silently in the text.",
        ],
      },
    ],

    howTo: {
      name: "How to run the cutting word count prompt",
      steps: [
        {
          name: "State the job as something the reader must do or believe",
          text: "This single field decides every label in the inventory. Written as a topic it sorts nothing, and every unit comes back load bearing.",
        },
        {
          name: "Check the stage counts before reading the cut version",
          text: "They tell you where the words came from. Most of the reduction happening in stage three means the draft had little slack and the target may be wrong.",
        },
        {
          name: "Read the loss report against your brief",
          text: "One line at a time, deciding whether the piece can be published without it. This is the only part of the process that requires you rather than the model.",
        },
      ],
    },

    faq: [
      {
        question: "How accurate is the word count it reports?",
        answer:
          "Close but not exact. Both models tend to run a few percent under their own estimate, which matters when the tolerance is tight. Paste the result into whatever will actually publish it and check there, particularly if the limit is a hard character or line count rather than a word figure.",
      },
      {
        question: "Can I use this to cut something to a character limit?",
        answer:
          "Yes, and it works better than word targets for very short formats because characters are what the container actually enforces. State the limit including spaces, and expect stage three to do more of the work, since below about eighty words there are no whole units left to remove.",
      },
      {
        question: "What if I disagree with the load bearing labels?",
        answer:
          "Relabel and rerun rather than arguing. The labels come from the job field, so a disagreement about labels is nearly always a disagreement about what the piece is for, and that is worth resolving before you cut anything rather than after.",
      },
      {
        question: "Does it work on documents rather than articles?",
        answer:
          "It works on anything with a stated purpose and a hard limit, including grant applications, tender responses and internal memos. Application forms are the strongest case, since the box will not accept overflow and the loss report tells you which omission the assessor is most likely to penalise.",
      },
      {
        question: "Should I cut before or after line editing?",
        answer:
          "Cut first. Line editing a section that a length constraint will delete an hour later is wasted work, and the finer editing pass is more useful on the material that survived, where every remaining sentence has already earned its place.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/summarise-document-prompt",
        label: "summarise document prompt",
        description:
          "Use this instead when you need a shorter piece about the source rather than the same piece made shorter.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description:
          "The pass to run on the surviving material, once nothing further is going to be deleted.",
      },
      {
        href: "/writing-prompts/paragraph-restructure-prompt",
        label: "paragraph restructure prompt",
        description:
          "Deleting whole units usually breaks the order of what remains, and this repairs the joins without rewriting.",
      },
      {
        href: "/business-prompts/job-description-prompt",
        label: "job description prompt",
        description:
          "The same deletion discipline applied to a role specification, where the padding is requirements nobody needs.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/how-little-do-users-read/",
        label: "Nielsen Norman Group: How little do users read",
        description:
          "The reading time measurements behind treating length as a hard constraint rather than a preference.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/concise/",
        label: "plainlanguage.gov: Be concise",
        description:
          "Federal guidance on which categories of words carry no information, which maps closely onto the ornament label.",
      },
      {
        href: "https://www.gov.uk/guidance/content-design/writing-for-gov-uk",
        label: "GOV.UK: Content design guidance",
        description:
          "A publisher that enforces strict length limits at scale, cited for the practice of deciding content before compressing wording.",
      },
    ],
  },
};

export default meta;

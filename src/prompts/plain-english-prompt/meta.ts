import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "plain-english-prompt",
  name: "Term Sorter",
  title: "Plain English Prompt",
  category: "writing-prompts",
  taskType: "rewrite",
  summary:
    "Sorts every hard word into jargon it can replace or a term of art it must keep and gloss, and surfaces the ambiguity that simpler wording always uncovers.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["plain language", "accessibility", "public writing", "jargon"],

  seo: {
    primaryKeyword: "plain english prompt",
    keywords: [
      "plain english prompt",
      "how to rewrite jargon into plain language",
      "ai prompt for readability improvement",
      "plain language rules for public documents",
      "keeping legal meaning while simplifying wording",
      "explaining a technical term on first use",
    ],
    seoTitle: "Plain English Prompt: Keep The Terms That Bind",
    seoDescription:
      "A plain English prompt that separates jargon from terms of art, glosses what it has to keep, and flags the ambiguity that simpler wording brings to the surface.",
  },

  prompt: {
    text: `You are a plain language editor working on a document that people have to act on, and that may later be read in a dispute.

DOCUMENT: {{DOCUMENT}}
WHO HAS TO READ IT AND WHAT THEY MUST DO: {{READER}}
TERMS THAT ARE LEGALLY OR TECHNICALLY BINDING: {{BINDING}}

STEP ONE. List every word or phrase a reader outside the organisation would not use in conversation. Sort each into one of two piles.

TERM OF ART: the word has a precise meaning and no ordinary English word carries the same scope. Anything in the binding list goes here automatically. These are kept, not replaced.

JARGON: an ordinary word means exactly the same thing. These are replaced.

If you are not certain which pile a word belongs in, put it in TERM OF ART and say why you hesitated. Replacing something binding is a worse error than keeping something plain.

STEP TWO. Rewrite. Every term of art keeps its original wording and gets a short gloss the first time it appears, in the form: term of art, followed by a comma and a plain explanation of eight words or fewer. Do not gloss it twice.

STEP THREE. Preserve must, may, should and will exactly as they appear. These carry obligation and are not style choices.

STEP FOUR. Plain wording forces you to name who acts. Wherever the original hid that and more than one reading is possible, do not choose. Print AMBIGUITY, give both readings, and leave the original sentence in place until someone decides.

Finish with the glossary as a list, and the count of ambiguities found.`,
    variables: [
      {
        token: "DOCUMENT",
        label: "The document to rewrite",
        example:
          "Where an overpayment has been identified, recovery may be effected by deduction from subsequent entitlement unless representations are received within the prescribed period.",
      },
      {
        token: "READER",
        label: "Who has to read it and what they must do",
        example:
          "People receiving a housing payment, many reading on a phone, who need to know whether money will be taken and by when they must reply",
      },
      {
        token: "BINDING",
        label: "Terms that are legally or technically binding",
        example: "overpayment, entitlement, representations, prescribed period",
      },
    ],
    expectedOutput:
      "Two sorted lists of hard words with a reason for every uncertain call, a rewrite in which binding terms survive verbatim and carry a short gloss on first use, obligation words unchanged, and any hidden actor reported as an ambiguity rather than resolved.",
    followUps: [
      "You classified three words as terms of art with hesitation. Argue the case for moving each one to jargon so I can take it to legal.",
      "Turn the glossary into a box that sits above the letter, and shorten each gloss to six words without losing the scope.",
      "You found four ambiguities. For each, tell me which reading the organisation currently acts on in practice, based only on the rest of this document.",
    ],
    pitfalls: [
      "An empty binding field is the most expensive mistake here. Models will simplify a defined term into a friendlier near synonym and the sentence stops meaning what the regulation means.",
      "Glossing everything defeats the purpose. If more than about one word in forty needs a gloss, the document is not a plain language problem, it is aimed at the wrong reader.",
      "Ambiguities get resolved silently unless the instruction is explicit, and a resolved ambiguity is indistinguishable from a decision nobody made.",
    ],
  },

  eeat: {
    author: "Ruth Adeyemi",
    authorCredential:
      "Eighteen years editing long form journalism and technical documentation, most recently as a standards editor.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "The ambiguity rule came out of a benefits letter I rewrote for a housing association. Turning may be effected by deduction into we will take it from your next payment read beautifully and answered a question the original had left open, which nobody in the organisation could actually answer when I asked. Every model I tried resolved it the same confident way. Now they have to print both readings and stop.",
  },

  article: {
    intro: [
      "A plain english prompt fails in a way that is hard to see, because the failure reads well. Ask a model to simplify a regulated document and it will return something warm, short and easy to follow in which two defined terms have become approximate synonyms and a conditional obligation has become a promise.",
      "The document is now more readable and less true. For a marketing page that trade is survivable. For a benefits letter, a tenancy agreement or a medicine label it is the whole risk.",
      "The prompt below starts by sorting hard words into two piles, and only one of the piles gets touched.",
    ],

    sections: [
      {
        heading: "Jargon and terms of art are different problems",
        body: [
          "Both look the same from outside the organisation: a word ordinary people do not use. Underneath they are opposites. Jargon is a hard word standing where an easy one would do the identical job, and utilise for use is the standard example. A term of art is a word carrying a precise scope that no ordinary word matches, which is why entitlement, consideration, remission and tort survive centuries of complaint.",
          "How to rewrite jargon into plain language is a solved problem, and a model does it well. The difficulty is that the same model applies the same operation to the second pile, where it is not simplification but substitution of one meaning for another. Sorting before rewriting is the entire mechanism.",
          "The tie break rule matters as much as the sort. When the model is unsure, the word stays and it explains its hesitation. Keeping a word that could have gone costs the reader a gloss. Replacing a word that should have stayed costs somebody their appeal rights.",
        ],
      },
      {
        heading: "Why the plain english prompt keeps and glosses",
        body: [
          "Explaining a technical term on first use is a better move than removing it, and it is underused because it feels like a compromise. It is not. The reader will meet that word again in the next letter, on the phone and in the appeal form, so teaching it once is more useful than translating it away here and leaving them unequipped for everywhere else.",
          "The gloss format is constrained to eight words for a reason. Longer glosses turn into explanations, explanations attract caveats, and the caveats reintroduce the density the rewrite was meant to remove. Eight words is enough for a plain statement of scope and not enough for a second clause.",
          "Keeping legal meaning while simplifying wording therefore works on two tracks at once. The sentences around the term get shorter, more direct and honest about who is acting. The term itself does not move. Readers report the result as much clearer even though the hardest words are still on the page, because what was actually blocking them was the structure.",
        ],
      },
      {
        heading: "Plain wording exposes what jargon concealed",
        body: [
          "This is the part nobody warns you about. Official prose hides the actor as a matter of habit, and recovery may be effected by deduction does not say who deducts, from what, or whether they have decided to. Writing that plainly requires naming a subject and choosing a tense, and both are decisions the original avoided.",
          "So the prompt is forbidden from choosing. It prints AMBIGUITY, sets out both readings, and leaves the original sentence in place. In practice this converts an editing task into a governance one, and the count at the end is frequently the most valuable number in the output. Four ambiguities in a two page letter means four things the organisation has never settled and has been posting to people anyway.",
        ],
      },
      {
        heading: "Reading level is a proxy, not the goal",
        body: [
          "Every ai prompt for readability improvement is tempted by a score, and readability formulas measure syllable counts and sentence lengths because those are countable, not because they are what makes text hard. A document can hit any grade level you like while remaining incomprehensible, and short sentences full of undefined terms score well.",
          "The better targets are the ones the prompt actually enforces. One idea per sentence. A named actor for every action. Obligation words left exactly as written. A gloss for anything a reader could not look up in a dictionary. Most published plain language rules for public documents amount to these four with local variations.",
          "Obligation words deserve the strictest handling of all. Must, may, should and will encode whether something is required, permitted, recommended or promised, and a rewrite that swaps one for another has changed the reader's position without changing anything that looks important. That substitution is the single most common serious error I see in simplified official text.",
        ],
      },
    ],

    howTo: {
      name: "How to use the plain english prompt",
      steps: [
        {
          name: "Get the binding list from whoever owns the document",
          text: "Not from your own reading of it. The lawyer, policy owner or clinician knows which words have defined scope, and that list is the difference between a safe rewrite and a liability.",
        },
        {
          name: "Review the two piles before reading the rewrite",
          text: "The sort is where the risk sits. Check every word the model moved into jargon and every hesitation it flagged, then read the prose knowing the classification is sound.",
        },
        {
          name: "Send the ambiguities to a decision maker",
          text: "Each one is a question the organisation has not answered. Answer them properly and the next version of the document is genuinely clearer. Answer them yourself and you have invented policy.",
        },
      ],
    },

    faq: [
      {
        question: "How do I tell a term of art from jargon myself?",
        answer:
          "Try to replace it with an ordinary word and ask whether the set of things it covers changes. Dwelling and home feel interchangeable until you find the definition that includes a houseboat. If the scope shifts at all, it is a term of art.",
      },
      {
        question: "Does the plain english prompt work on medical or technical writing?",
        answer:
          "Yes, and the sort tends to be cleaner there than in legal text, because technical terms usually have documented definitions. Set the binding field from the standard or the formulary rather than from the draft, and expect a longer glossary than you would get from a letter.",
      },
      {
        question: "Should the glossary sit at the top or the bottom?",
        answer:
          "The gloss on first use does most of the work, so the collected list is a reference rather than a prerequisite. Putting it at the end keeps the opening clear. A box at the top only helps when the same four terms recur throughout a long document.",
      },
      {
        question: "What if legal rejects the rewrite anyway?",
        answer:
          "Show them the sort rather than the prose. Most objections to plain language rewrites are really objections to a changed term, and a document proving that every binding word survived character for character removes the disagreement in one meeting.",
      },
      {
        question: "Can I set a target reading age?",
        answer:
          "You can, and it is worth stating who the reader is instead. A named audience with a task produces better decisions about vocabulary than a numeric grade level, which rewards short sentences regardless of whether the reader could act on them.",
      },
      {
        question: "Why not resolve the ambiguities and note them separately?",
        answer:
          "Because a resolved ambiguity disappears. Once the plain sentence exists, reviewers read it, find it clear, and approve a meaning nobody selected. Leaving the original in place with both readings printed keeps the decision visible until a person makes it deliberately.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description:
          "For general prose where the vocabulary is fine and the sentences are the obstacle.",
      },
      {
        href: "/writing-prompts/tone-adjustment-prompt",
        label: "tone adjustment prompt",
        description:
          "Plain does not mean warm. Use this when the formality has come down but the letter still reads as cold.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description:
          "Run last, with the glossary terms listed as house rules so their spelling and capitalisation stay fixed.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "The place to send an ambiguity, since most of them turn out to be a process nobody has written down.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "Plainlanguage.gov: Federal plain language guidelines",
        description:
          "The published rule set behind naming the actor and keeping one idea per sentence, both enforced directly by this prompt.",
      },
      {
        href: "https://www.gov.uk/guidance/content-design/writing-for-gov-uk",
        label: "GOV.UK: Writing for GOV.UK",
        description:
          "Source for the position that specialist terms should be kept and explained rather than replaced with approximations.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG21/Understanding/reading-level.html",
        label: "W3C: Understanding reading level",
        description:
          "The accessibility criterion that treats supplementary explanation as an alternative to simplification, which is what the gloss rule implements.",
      },
      {
        href: "https://www.nngroup.com/articles/writing-style-for-print-vs-web/",
        label: "Nielsen Norman Group: Writing style for print versus web",
        description:
          "Evidence on how people actually read official text on screen, cited for the limits of readability scores as a target.",
      },
    ],
  },
};

export default meta;

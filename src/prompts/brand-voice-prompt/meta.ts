import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "brand-voice-prompt",
  name: "Voice Definer",
  title: "Brand Voice Prompt",
  category: "marketing-prompts",
  taskType: "analyse",
  summary:
    "Extracts a usable voice guide from writing you already like, expressed as rules a stranger could apply rather than adjectives.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["brand", "tone of voice", "style guide", "copywriting"],

  seo: {
    primaryKeyword: "brand voice prompt",
    keywords: [
      "brand voice prompt",
      "how to document tone of voice for a team",
      "ai prompt for a writing style guide",
      "defining brand voice from existing copy",
      "tone of voice rules instead of adjectives",
      "keeping ai output on brand",
    ],
    seoTitle: "Brand Voice Prompt: Rules A Stranger Can Apply",
    seoDescription:
      "A brand voice prompt that turns writing you already like into concrete rules, replacing adjectives like friendly with instructions someone can follow.",
  },

  prompt: {
    text: `You are a style editor. You believe that describing a voice as friendly, professional or approachable is useless, because two writers given those words produce completely different copy.

SAMPLES OF WRITING WE LIKE (ours or anyone's): {{SAMPLES}}
SAMPLES WE DEFINITELY DO NOT WANT TO SOUND LIKE: {{ANTI_SAMPLES}}
WHO WE ARE WRITING FOR: {{AUDIENCE}}
WHERE THIS VOICE HAS TO WORK: {{SURFACES}}

Do not produce adjectives. Produce rules. Specifically:

1. SENTENCE MECHANICS. From the samples, extract the observable patterns: typical sentence length and variation, whether the voice uses fragments, how often it starts sentences with conjunctions, active versus passive tendency, paragraph length. Give numbers where you can count them.

2. VOCABULARY RULES. Three lists, drawn from the samples rather than invented: words this voice uses that a generic brand would not, words this voice avoids, and pairs where we consistently pick one over the other, for example "use" over "utilise". At least fifteen entries total.

3. STANCE. How this voice handles four situations: delivering bad news, describing a limitation of our own product, disagreeing with a common industry belief, and being asked something it does not know. Give a one sentence rule and a one sentence example for each.

4. THE CONTRAST TEST. Take three sentences from the anti samples and rewrite each in our voice. Then state, in one line per pair, what specifically changed. This is the most useful section, so be concrete about the mechanism rather than saying it sounds warmer.

5. WHAT THIS VOICE CANNOT DO. Every distinctive voice has limits. Name two contexts where these rules would produce something inappropriate and say what to do instead.

Finally, write the eight line version I can paste into another prompt to keep generated drafts on voice.`,
    variables: [
      {
        token: "SAMPLES",
        label: "Writing you like, pasted in full",
        example:
          "Three of our support replies that customers praised, plus two paragraphs from a newsletter we admire, pasted verbatim",
      },
      {
        token: "ANTI_SAMPLES",
        label: "Writing you do not want to sound like",
        example:
          "Two competitor homepage paragraphs full of leverage, empower and end to end solutions",
      },
      {
        token: "AUDIENCE",
        label: "Who you are writing for",
        example: "Independent letting agents, mostly non technical, sceptical of software vendors",
      },
      {
        token: "SURFACES",
        label: "Where the voice has to work",
        example: "Website, support replies, onboarding emails, occasional apology when we have an outage",
      },
    ],
    expectedOutput:
      "Countable sentence mechanics, at least fifteen concrete vocabulary rules taken from your samples, stance rules for four hard situations, three rewritten contrast pairs explaining what changed, stated limits, and an eight line summary you can paste into other prompts.",
    followUps: [
      "Apply the eight line version to this draft and mark every sentence that breaks a rule, with the rule number.",
      "Our support replies and our website sound like different companies. Compare them against these rules and tell me which surface is drifting.",
      "Write the apology template for an outage, using the bad news stance rule, and keep it under 80 words.",
    ],
    pitfalls: [
      "Paste real samples in full rather than describing them. A description of your voice produces a description back, which is the problem you started with.",
      "Anti samples matter as much as samples. Without them the rules come back generic, because the model has nothing to define the voice against.",
      "The eight line summary drifts if you paste it into a long prompt. Put it at the end of the prompt rather than the beginning, where it is closer to the generation.",
    ],
  },

  eeat: {
    author: "Priya Raman",
    authorCredential:
      "Twelve years in product marketing, most of it positioning technical products for teams that had never done audience research.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The contrast test section was an afterthought that turned out to carry the whole document. Teams read a list of rules and nod; they read a competitor sentence rewritten in their own voice with the changes named and immediately understand what to do. I also learned to demand counts rather than descriptions, because both models will characterise sentence length as varied unless you require an actual average.",
  },

  article: {
    intro: [
      "A brand voice prompt that returns three adjectives has given you nothing. Friendly, professional and approachable are the default output, they describe almost every brand, and two writers handed those words produce copy with nothing in common. The document gets filed and the writing stays inconsistent.",
      "This one refuses adjectives and produces rules instead: measurable sentence mechanics, specific word choices with the alternatives they replace, and stance rules for the four situations where voice actually gets tested. It works from writing you already like rather than from a description of how you would prefer to sound.",
    ],

    sections: [
      {
        heading: "Adjectives do not transfer, rules do",
        body: [
          "The reason voice guides fail is that they describe an impression rather than a behaviour. Told to be conversational, one writer produces contractions and short sentences, another produces exclamation marks and rhetorical questions, and both believe they followed the brief.",
          "A rule saying to use fewer than twenty words per sentence on average, prefer use over utilise, and never open with a question transfers exactly. Working from tone of voice rules instead of adjectives is the difference between a document that changes output and one that describes an aspiration.",
        ],
      },
      {
        heading: "Why it needs samples and anti samples",
        body: [
          "Extracting a voice requires something to extract from, which is why the prompt asks for real text pasted in full. Describing your voice produces a description back, and the loop closes with nothing gained.",
          "Anti samples do the other half of the work. A voice is partly defined by what it refuses, and without a contrast the model has no way to know that your plainness is deliberate rather than incidental. Defining brand voice from existing copy works best when the copy you reject is as specific as the copy you admire.",
        ],
      },
      {
        heading: "The four situations that test a voice",
        body: [
          "Most voice guides cover marketing copy, which is the easy case, because everyone sounds good when describing something they are proud of. Voice breaks under pressure, and the stance section covers exactly the moments where it does.",
          "Bad news, admitting a limitation, disagreeing with the industry and not knowing an answer are the four situations where a brand either has a voice or reverts to corporate default. Having a written rule for each is what stops an outage notice sounding like it came from a different company than the homepage.",
        ],
        list: [
          "Bad news: whether you lead with the apology or the fact, and whether you explain the cause.",
          "Your own limitation: whether you name it plainly or route around it.",
          "Disagreeing with industry consensus: how much you soften, and whether you name who you disagree with.",
          "Not knowing: whether you say so directly or promise to find out.",
        ],
      },
      {
        heading: "The contrast test does the teaching",
        body: [
          "Three sentences from the anti samples, rewritten in your voice, with the specific change named for each. This section teaches faster than the rules that precede it, because a rule is abstract and a rewritten sentence is a demonstration.",
          "The requirement to name the mechanism is what keeps it useful. Saying the rewrite sounds warmer explains nothing. Saying it replaced two abstract nouns with a verb and cut the sentence from thirty one words to fourteen gives a writer something to do next time.",
        ],
      },
      {
        heading: "Using the brand voice prompt to keep generated copy on brand",
        body: [
          "The eight line summary at the end exists because a full voice document is too long to paste into every drafting prompt, and a summarised version written by hand loses the specifics that made it work.",
          "In practice it belongs at the end of a generation prompt rather than the start, closest to the instruction it is meant to constrain. Keeping ai output on brand is mostly this: a short set of concrete rules positioned late in the prompt, plus a habit of checking drafts against the numbered rules rather than against a feeling.",
        ],
      },
      {
        heading: "What a distinctive voice cannot do",
        body: [
          "The prompt is required to name two contexts where its own rules would produce something inappropriate, and it is right to. A voice built on brevity and directness serves a status page badly during a serious incident, where people need more explanation than usual, not less.",
          "Naming the limits protects the rest of the document. A voice guide presented as universal gets abandoned the first time it produces something obviously wrong, whereas one with stated exceptions survives the exception. Anyone working out how to document tone of voice for a team should include this section even though nobody asks for it.",
        ],
      },
    ],

    howTo: {
      name: "How to use the brand voice prompt",
      steps: [
        {
          name: "Collect writing you actually like",
          text: "Support replies customers praised are better source material than marketing copy, because they were written to be understood rather than to impress.",
        },
        {
          name: "Find two anti samples",
          text: "Competitor copy that makes you wince works well. Without a contrast the rules come back generic and describe any competent brand.",
        },
        {
          name: "Check the mechanics against a real page",
          text: "Take the sentence length and vocabulary rules and run them over an existing page. Where the page breaks its own rules, decide which one is wrong.",
        },
        {
          name: "Paste the eight line version into your drafting prompts",
          text: "Put it at the end, after the task instruction. Placed at the start it gets crowded out by whatever follows.",
        },
      ],
    },

    faq: [
      {
        question: "How much sample text does the brand voice prompt need?",
        answer:
          "Around five hundred words of writing you like is enough to extract countable patterns, and more helps mainly for the vocabulary lists. Quality matters more than quantity, so three genuinely good support replies beat two thousand words of committee written homepage copy.",
      },
      {
        question: "Can I define a voice before I have written anything?",
        answer:
          "Partly. Use samples from writers outside your industry whose register you want, plus anti samples from your own market. The result is a borrowed voice rather than an extracted one, which is a reasonable starting point that should be rerun once you have your own material.",
      },
      {
        question: "Why does it refuse to say our voice is friendly?",
        answer:
          "Because friendly does not tell a writer what to type. Every rule in the output has to be checkable against a draft, and an adjective cannot be checked. If the samples show warmth, it appears as specific mechanics like second person address and short sentences rather than as a label.",
      },
      {
        question: "How do I stop the voice drifting across a team?",
        answer:
          "Review against the numbered rules rather than by impression, since impressions vary between reviewers and the rules do not. The contrast test section is also worth circulating on its own, because it teaches the mechanism faster than the rule list does.",
      },
      {
        question: "Does an ai prompt for a writing style guide replace a proper brand guideline?",
        answer:
          "It replaces the tone of voice section, which is usually the weakest part of a brand guideline because it is written in adjectives. Visual identity, logo usage and naming conventions are separate concerns this does not touch.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/blog-post-outline-prompt",
        label: "blog post outline prompt",
        description:
          "Pair the eight line voice summary with an outline so the connecting sections read as one author rather than a committee.",
      },
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description:
          "The surface where voice drifts fastest, because newsletters are written quickly and often by whoever is free.",
      },
      {
        href: "/marketing-prompts/product-description-prompt",
        label: "product description prompt",
        description:
          "Where the vocabulary rules matter most, since product copy attracts the abstract nouns the anti samples were full of.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "The same extraction problem applied to knowledge rather than style, pulling out what a person does without noticing.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/tone-of-voice-dimensions/",
        label: "Nielsen Norman Group: The four dimensions of tone of voice",
        description:
          "The research framework behind treating voice as measurable dimensions rather than as a set of descriptive adjectives.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents why constraints placed near the end of a prompt hold better, which is the basis for where to paste the summary.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "US Government: Plain language guidelines",
        description:
          "The established standard for concrete writing rules, and a working example of guidance written as instructions rather than impressions.",
      },
    ],
  },
};

export default meta;

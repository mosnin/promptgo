import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "press-release-prompt",
  name: "Announcement Screener",
  title: "Press Release Prompt",
  category: "marketing-prompts",
  taskType: "generate",
  summary:
    "Scores your announcement against five news criteria before writing a word, and tells you plainly when the honest format is a blog post.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["press release", "public relations", "announcements", "media"],

  seo: {
    primaryKeyword: "press release prompt",
    keywords: [
      "press release prompt",
      "how to tell if a story is newsworthy",
      "press release embargo line example for journalists",
      "how to write a press release headline",
      "press release quote examples",
      "ai prompt for a product launch announcement",
    ],
    seoTitle: "Press Release Prompt: Pass the News Value Test First",
    seoDescription:
      "A press release prompt that scores five news criteria before drafting, cuts empty executive quotes, and handles embargo lines, datelines and contacts.",
  },

  prompt: {
    text: `You are a former trade reporter who now writes releases. You know that a release is read by one busy person deciding in four seconds whether to keep reading, and that nothing about our internal excitement transfers to them.

WHAT WE ARE ANNOUNCING: {{ANNOUNCEMENT}}
WHY IT IS HAPPENING NOW: {{WHY_NOW}}
WHICH PUBLICATION AND WHICH BEAT: {{OUTLET}}
VERIFIABLE FACTS AND FIGURES: {{FACTS}}
SPOKESPERSON AND THEIR ROLE: {{SPOKESPERSON}}

TEST FIRST. Score the announcement against five criteria for the named outlet, marking each present or absent with one line of reasoning: consequence for someone outside our company, scale, novelty measured against the sector rather than against us, tension or disagreement, and a reason it is happening this week rather than any other.

If fewer than two criteria are present, output only: the verdict NOT NEWS FOR THIS OUTLET, the format this should be instead, and the single change that would make it news. Write nothing else.

If it passes, write the release:

HEADLINE. Under twelve words. States what happened and to whom. No colon, no adjectives, no wordplay.
SUBHEAD. One line adding the consequence, not restating the headline.
LEDE. One sentence: who did what, when, and why a reader outside the company should care.
BODY. Two paragraphs. Every fact must trace to the facts input. Words like leading, first or fastest are banned unless the input contains the evidence, in which case state the basis in the same sentence.
QUOTE. Apply the quote test: the spokesperson must say at least one thing that appears nowhere else in the release. If they cannot, delete the quote, replace it with a factual sentence, and tell me the quote was cut and why.
MECHANICS. Dateline, embargo line with date, time and timezone, named contact with a direct line, and a boilerplate under sixty words.

FINISH with the three questions a journalist will ask that this release does not answer.`,
    variables: [
      {
        token: "ANNOUNCEMENT",
        label: "What you are announcing",
        example: "We are opening our routing engine as a public API and dropping the per call fee for the first 100k calls",
      },
      {
        token: "WHY_NOW",
        label: "Why this week and not any other",
        example: "The regulator's new delivery reporting rules take effect on 1 October and hauliers have to report route data",
      },
      {
        token: "OUTLET",
        label: "Publication and beat",
        example: "Logistics Manager magazine, the technology and compliance beat, readership of operations directors",
      },
      {
        token: "FACTS",
        label: "Checkable facts and figures",
        example:
          "Used by 240 fleets, 1.9 billion route calculations last year, independent audit by Fraser Klein published in May, free tier confirmed for 24 months",
      },
      {
        token: "SPOKESPERSON",
        label: "Who is quoted and their role",
        example: "Ana Duarte, chief technology officer, who led the audit response",
      },
    ],
    expectedOutput:
      "Either a scored refusal naming a better format and the one change that would make it news, or a full release with a twelve word headline, a single sentence lede, fact traced body copy, a quote that survived the information test, complete mechanics and three unanswered questions.",
    followUps: [
      "Rewrite this for a national business desk rather than the trade title, and tell me which criteria now fail.",
      "Give me the pitch email that goes above this release, under 80 words, that does not repeat the headline.",
      "Answer the three unanswered questions as the spokesperson would in a follow up call, marking anything we cannot say publicly.",
    ],
    pitfalls: [
      "Novelty is scored against the sector, and teams routinely supply novelty measured against their own roadmap. The first time we have done this is not news to anyone who does not work here.",
      "The quote test cuts most executive quotes on the first run. That is accurate rather than harsh, and the fix is to go back to the spokesperson with a question rather than to soften the test.",
      "If the outlet field is vague, the scoring becomes generous, because a release can be news to somebody somewhere. Name a publication and a beat.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models are generous graders of their own inputs. Asked to judge whether news is newsworthy and then draft, they score kindly, write the release anyway and append a soft caveat at the end. Making the verdict and an alternative format the entire permitted output, with nothing else allowed to follow, is what stops a failed test turning into a draft.",
  },

  article: {
    intro: [
      "A press release prompt that writes whatever you ask it to announce is a machine for producing documents nobody reads. The wording of a release is a small problem. Whether the thing being announced is news to anyone outside the building is the large one, and it is settled before drafting starts.",
      "Trade reporters receive well over a hundred of these a week and open a handful. What separates the handful is rarely craft. It is whether the first line describes something with a consequence for the reader, and whether the sender clearly understood which publication they were writing to.",
      "So the press release prompt screens first, against five criteria, for one named outlet. Fail the screen and the output is a verdict and a better format, not a polished announcement of nothing.",
    ],

    sections: [
      {
        heading: "The reader is one journalist with a full inbox",
        body: [
          "Everything internal about an announcement is invisible to that person. The quarters of work, the argument with engineering, the fact that this was the hardest thing the team shipped all year. None of it appears in the four seconds they spend on your subject line and first sentence.",
          "Writing for that reader means leading with the consequence rather than the achievement. The achievement belongs to you. The consequence belongs to their audience, and their audience is the only thing they are paid to think about.",
        ],
      },
      {
        heading: "How the press release prompt scores news value",
        body: [
          "The first question is not how to phrase this. It is how to tell if a story is newsworthy to someone with no relationship to your company, and the five criteria make that answerable rather than a matter of taste.",
          "Novelty is the criterion teams score wrongly, because they measure against their own history. A capability that is new to you and ordinary in the sector scores zero, however hard it was to build. Scoring it against the sector is what makes the test useful and what makes it uncomfortable.",
        ],
        list: [
          "Consequence: someone outside the company has to do something differently.",
          "Scale: the number involved is large enough to be worth a reader's attention.",
          "Novelty against the sector, not against your roadmap.",
          "Tension: a disagreement, a reversal, a regulator, a competitor.",
          "Timing: a reason it is this week rather than any other week.",
        ],
      },
      {
        heading: "Headlines that state what happened",
        body: [
          "Most guidance on how to write a press release headline drifts into keyword advice, which is a search problem rather than a newsroom one. A journalist scanning a list needs a subject, a verb and an object in under twelve words. Everything else is decoration that pushes the object off the end of the line.",
          "The colon is banned for the same reason. A headline with a clever phrase, a colon and then the actual news has spent its first four words on nothing, and those are the only four words guaranteed to be read.",
        ],
      },
      {
        heading: "Quotes are where announcements go to die",
        body: [
          "The standard executive quote contains no information. It expresses excitement, restates the headline in longer form, and mentions a commitment to customers. A journalist cannot use it, so the paragraph is dead space in a document that has very little room.",
          "The test applied here is mechanical: unlike most press release quote examples, the quote must contain at least one fact appearing nowhere else in the release. A reason, a constraint, a number, an admission about what is still hard. If the spokesperson has nothing like that to offer, the quote is cut and replaced with a sentence that does carry information.",
        ],
      },
      {
        heading: "Datelines, embargoes and the boring mechanics",
        body: [
          "The mechanical block gets neglected because it is dull, and its absence is the fastest way to look like an amateur to someone who handles releases daily. A dateline, a named contact with a direct line, and a boilerplate short enough to skip.",
          "A press release embargo line example for journalists needs a date, a clock time and a timezone, all three. Embargoes without a timezone break routinely across markets, and a broken embargo costs you the relationship with the reporter who honoured it while a competitor's outlet published early.",
        ],
      },
      {
        heading: "The three questions a journalist will ask next",
        body: [
          "Closing with the questions the release invites and does not answer is the most practically useful part of the output. It is usually where the actual story is, and it tells you what your spokesperson needs to be ready for before the phone rings.",
          "It also functions as a last check on the draft. If all three questions are ones you cannot answer publicly, the announcement is thinner than it looked, and the reporter will reach the same conclusion about ten minutes after you send it.",
        ],
      },
    ],

    howTo: {
      name: "How to run the press release prompt",
      steps: [
        {
          name: "Name one publication and one beat",
          text: "Not the media generally. The scoring only means something when it is applied to a specific readership with specific interests.",
        },
        {
          name: "Gather the checkable facts first",
          text: "Numbers, dates, audits, named partners. Anything the body copy cannot trace back to this list will be cut from the draft.",
        },
        {
          name: "Accept the verdict if it fails",
          text: "A failed announcement published anyway teaches the reporter to ignore your next one, which is a real cost paid later. Take the suggested format instead.",
        },
      ],
    },

    faq: [
      {
        question: "Is this ai prompt for a product launch announcement or for company news generally?",
        answer:
          "Both, and the scoring behaves differently for each. Funding, leadership changes and partnerships usually score on scale or tension. Product launches usually have to earn their place on consequence and timing, which is why so many of them fail the test and become blog posts.",
      },
      {
        question: "Nobody reads press releases any more. Why bother with the format?",
        answer:
          "The document is less important than it was, but the discipline of the format still forces the questions that make a pitch work. Many teams now use the output as source material for a direct email to two reporters rather than sending it to a wire, and it holds up perfectly well in that shape.",
      },
      {
        question: "What if the executive insists on keeping their quote?",
        answer:
          "Show them the test rather than arguing about the wording. Asking which fact in the quote appears nowhere else in the release turns a matter of seniority into a specific question, and it usually produces a better quote within a couple of minutes.",
      },
      {
        question: "How far in advance should an embargo be set?",
        answer:
          "Enough for a reporter to make a call and write, which for a trade title is usually two or three days, and longer for anything requiring an interview. Sending an embargoed release the evening before publication offers a courtesy nobody can actually use.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/case-study-prompt",
        label: "case study prompt",
        description:
          "Where an announcement that failed the news value test often belongs, since a customer outcome is provable in a way a launch is not.",
      },
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description:
          "The other honest home for news that matters to your customers and to nobody else, which is most of it.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Keeps the boilerplate and the spokesperson quote sounding like your company rather than like every other release that week.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For the internal argument about whether to announce at all, which is a decision with tradeoffs rather than a writing task.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.sec.gov/rules/final/33-7881.htm",
        label: "SEC: Regulation FD final rule",
        description:
          "The authoritative rule on selective disclosure of material information, which governs what a listed company may put under embargo and to whom.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "PlainLanguage.gov: Federal plain language guidelines",
        description:
          "The standard reference behind the ban on adjectives and clause heavy headlines, written for documents that have to be understood at first pass.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the evaluate before generate pattern that allows the scoring step to suppress the draft entirely when the test fails.",
      },
    ],
  },
};

export default meta;

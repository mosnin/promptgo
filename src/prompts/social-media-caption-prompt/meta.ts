import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "social-media-caption-prompt",
  name: "Caption Builder",
  title: "Social Media Caption Prompt",
  category: "marketing-prompts",
  taskType: "generate",
  summary:
    "Writes the first line as a standalone unit that survives truncation, gives each platform its own wording, and produces the alt text alongside it.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["social media", "captions", "organic content", "accessibility"],

  seo: {
    primaryKeyword: "social media caption prompt",
    keywords: [
      "social media caption prompt",
      "caption that survives the see more cut",
      "writing captions for multiple platforms at once",
      "how many hashtags to use on a post",
      "instagram caption prompt for brands",
      "alt text for a social media image",
    ],
    seoTitle: "Social Media Caption Prompt: Survive the See More Cut",
    seoDescription:
      "A social media caption prompt that makes the visible first line stand alone, rewrites per platform instead of reposting, and drafts the alt text with it.",
  },

  prompt: {
    text: `You are a social editor. You have watched thousands of posts get judged on the fragment visible before the truncation, and you write for that fragment first.

THE ONE THING I WANT TO SAY: {{IDEA}}
THE SPECIFIC DETAIL OR NUMBER BEHIND IT: {{PROOF}}
PLATFORMS AND THEIR VISIBLE LENGTH: {{PLATFORMS}}
WHAT THE IMAGE OR VIDEO SHOWS: {{VISUAL}}
HOW THIS ACCOUNT SOUNDS: {{VOICE}}

FIRST, reduce the idea to one sentence. If the input contains more than one idea, choose the strongest, and list the rest as separate posts for later. Never merge two ideas into one caption, however related they are.

THEN, for each platform in the list, produce:

HOOK. A complete, self contained statement that fits inside that platform's visible length before truncation. It must make sense with nothing after it. No cliffhanger, no colon leading to the real sentence, no question that only pays off later.
BODY. Two or three short lines carrying the proof detail. Line breaks, not a paragraph.
ACTION. One thing to do, or nothing at all. Do not append a question to a post that does not need one.

Write different wording for every platform. If two hooks share an opening phrase, rewrite one.

HASHTAGS. No more than three, each a tag a real person would follow or search. One broad topical tag, up to two narrow ones. Do not invent a branded tag.

ALT TEXT. Describe what is visible for a reader who cannot see it. Factual, under 125 characters, no marketing language, and never a restatement of the caption.

CUT CHECK. For each hook, list the words you removed to fit the limit, so I can see what was lost.`,
    variables: [
      {
        token: "IDEA",
        label: "The single thing you want to say",
        example: "Our support team now answers in under an hour because we stopped routing tickets through a queue manager",
      },
      {
        token: "PROOF",
        label: "The specific detail behind it",
        example: "Median first reply went from 9 hours to 41 minutes over eight weeks, with the same six people",
      },
      {
        token: "PLATFORMS",
        label: "Platforms and their visible length",
        example: "LinkedIn, about 210 characters visible. Instagram, about 125. X, no truncation but 280 total",
      },
      {
        token: "VISUAL",
        label: "What the image or video shows",
        example: "A line chart on a whiteboard showing reply time falling, with two team members standing beside it",
      },
      {
        token: "VOICE",
        label: "How this account sounds",
        example: "Direct, no exclamation marks, first person plural, technical readers who dislike hype",
      },
    ],
    expectedOutput:
      "One idea stated in a sentence, any surplus ideas parked as future posts, a hook per platform that reads completely on its own inside the visible length, distinct wording across platforms, at most three searchable hashtags, factual alt text, and a list of the words each hook lost.",
    followUps: [
      "Rewrite every hook so none of them starts with a noun phrase, and tell me which version you would ship.",
      "Take the parked ideas and sequence them into a four post series, with the order justified by which one needs the least context.",
      "Write the reply I post underneath if the first comment challenges the number.",
    ],
    pitfalls: [
      "Models love a hook that ends on a colon or a teaser. Both are cliffhangers, both fail the standalone test, and both need rejecting on sight even when they read well.",
      "If you list platforms without their visible lengths, the truncation logic quietly stops working and you get one length applied everywhere.",
      "The alt text drifts into promotion unless the visual input is purely descriptive. Describe what is in the frame, not what the post is about.",
    ],
  },

  eeat: {
    author: "Priya Raman",
    authorCredential:
      "Twelve years in product marketing, most of it positioning technical products for teams that had never done audience research.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "The cut check was an accident that turned out to be the most useful line in the output. I added it to debug why hooks felt thin, and found the models were consistently dropping the number to make room for a transition word. Seeing the cuts listed made me rewrite the instruction so the proof detail is protected and the connective tissue goes instead.",
  },

  article: {
    intro: [
      "A social media caption prompt is usually asked to write a post. The more useful framing is that it writes two things: the fragment a scrolling reader sees, and the rest, which only exists for people the fragment already convinced.",
      "Nearly every caption problem comes from ignoring that split. A first line ending in a colon, a question whose answer sits three lines down, a warm up sentence before the point. Each of them reads fine in a document and disappears at the truncation.",
      "So the social media caption prompt writes the visible portion as a complete statement first, then builds the body behind it, and does that separately for every platform rather than posting one block of text in four places.",
    ],

    sections: [
      {
        heading: "The truncation point is the real headline",
        body: [
          "A caption that survives the see more cut has to make sense with everything after it deleted. That single rule removes most of what people write, including all the constructions that are trying to create curiosity, because curiosity requires the reader to believe there is a payoff and they have no reason to.",
          "The visible length varies by platform and changes without notice, so the constraint is supplied as an input rather than assumed. What does not change is the requirement. Whatever the number, the words inside it have to stand alone.",
        ],
        list: [
          "Ends in a colon. The actual sentence is hidden. Rejected.",
          "Opens with a question the body answers. The reader has to opt in before knowing what for. Rejected.",
          "Opens with context before the point. The point is now invisible. Rejected.",
          "States the thing, in full, in a way a person could react to immediately. Accepted.",
        ],
      },
      {
        heading: "One idea per caption, always",
        body: [
          "Two related ideas in one post produces something that is about neither of them. The reader takes the first, the second arrives as an appendix, and the post performs worse than either would have alone. Splitting them costs you nothing except a slot in the calendar.",
          "So the model is instructed to choose and to park the rest rather than merge. The parked list is genuinely useful, since it accumulates into a queue of posts you have already decided are worth making.",
        ],
      },
      {
        heading: "One idea, four platforms, four captions",
        body: [
          "Writing captions for multiple platforms at once tempts everyone into a single block of text pasted everywhere, and the same block reads as native on at most one of them. The tell is a hook tuned for one truncation length sitting on a platform with a different one.",
          "Rewriting per platform is not the same as spinning synonyms. The idea holds constant and the entry point moves. What earns attention in a professional feed is different from what earns it under a photograph, and the difference lives almost entirely in the first line.",
        ],
      },
      {
        heading: "Hashtags are a discovery tool, not decoration",
        body: [
          "The question of how many hashtags to use on a post has an unsatisfying answer, which is as few as are genuinely searched. Three is the ceiling here because past that they stop being navigation and start being a visual block at the bottom of the caption that readers skip.",
          "The test applied is whether a real person would follow or search that tag. Invented branded tags fail it unless the tag already has a body of posts behind it, in which case it is doing something. An empty branded tag is a link to a room with nobody in it.",
        ],
      },
      {
        heading: "Alt text belongs in the same workflow",
        body: [
          "Writing alt text for a social media image is skipped mostly because it happens somewhere else, in a separate field, after the caption is done and the person is finished thinking. Producing it in the same output removes the gap where it gets forgotten.",
          "The rule is descriptive rather than promotional. Someone using a screen reader wants to know what is in the frame, not what the post is arguing. Alt text that repeats the caption is worse than none, because it wastes the reader's time confirming they already have the information.",
        ],
      },
      {
        heading: "Where the social media caption prompt stops being useful",
        body: [
          "It cannot tell you whether the idea deserves a post. Fed something nobody outside your company cares about, it will produce four well constructed captions about it, and the constraint that makes the hook strong will simply make the emptiness more visible.",
          "It also has no sense of what your audience has already seen. Posting the same idea in four different framings across a fortnight looks deliberate to you and repetitive to everyone else, and only a calendar you keep yourself will catch that.",
        ],
      },
    ],

    howTo: {
      name: "How to write the post",
      steps: [
        {
          name: "Write the idea as one sentence yourself",
          text: "If you cannot get it into a sentence, the post is not ready. This is faster to discover now than after four captions exist.",
        },
        {
          name: "Check the current visible lengths",
          text: "Platforms change these quietly. Open your own feed on a phone and see where the truncation actually falls before you supply the numbers.",
        },
        {
          name: "Read each hook with the body covered",
          text: "Cover everything after the cut point with your hand. If the fragment left is not a complete thought, it fails, whatever the rest says.",
        },
        {
          name: "Read the cut check before shipping",
          text: "Look at what was removed to make the hook fit. If the number went, put it back and cut a connective phrase instead.",
        },
      ],
    },

    faq: [
      {
        question: "Does this work as an instagram caption prompt for brands with a strict tone guide?",
        answer:
          "Yes, provided you put the tone rules into the voice input as constraints rather than adjectives. Saying no exclamation marks and never address the reader as friends produces consistent output. Saying friendly and playful produces whatever the model considers friendly, which changes between runs.",
      },
      {
        question: "How long should the body be?",
        answer:
          "Short enough that the reader who expanded it does not regret doing so, which in practice is two or three lines with breaks between them. The body exists to deliver the proof detail behind the hook, and once that is delivered the post should stop rather than continue into a reflection.",
      },
      {
        question: "Should every post have a call to action?",
        answer:
          "No, and the instruction allows the action to be nothing. A question tacked onto a post that did not need one reads as a request for engagement, which readers recognise instantly. Ask when you genuinely want an answer, and otherwise let the statement stand by itself.",
      },
      {
        question: "What about threads and carousels?",
        answer:
          "The same logic applies to the first unit, since a carousel is judged on slide one and a thread on its opening post. Supply the visible length of that first unit as the platform constraint and treat the rest as the body, which the structure handles without modification.",
      },
      {
        question: "Can I schedule a month of these in one sitting?",
        answer:
          "You can generate them, and the parked ideas list makes that tempting. The risk is that a month written on one afternoon shares one mood and one set of examples, which is visible in a feed. Generating in batches of four or five spread across weeks tends to hold up better.",
      },
      {
        question: "Is alt text worth the effort on a small account?",
        answer:
          "It costs one line and it is the only part of the post some readers will get. It also gives you a plain description of the image that is useful later when you are searching your own archive for a post you half remember, which is a small practical benefit on top of the obvious one.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description:
          "For the paid version of the same problem, where the variants need to differ by angle rather than by opening line.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Produces the voice rules that make the tone input work as constraints instead of as adjectives the model reinterprets.",
      },
      {
        href: "/marketing-prompts/content-calendar-prompt",
        label: "content calendar prompt",
        description:
          "Where the parked ideas belong, and the only reliable defence against posting four framings of the same thought.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "Useful on a hook that fits the limit but still reads as written rather than said, which is the usual reason a line lands flat.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/WAI/tutorials/images/decision-tree/",
        label: "W3C: An alt decision tree",
        description:
          "The standards body guidance on what alt text should contain for different image types, which is the basis for the descriptive rule here.",
      },
      {
        href: "https://www.nngroup.com/articles/how-little-do-users-read/",
        label: "Nielsen Norman Group: How little do users read",
        description:
          "The research behind treating the visible fragment as the whole message, since most readers never expand past it.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the per variant constraint and self reported diff techniques that produce the cut check at the end of the output.",
      },
    ],
  },
};

export default meta;

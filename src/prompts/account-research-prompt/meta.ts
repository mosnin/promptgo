import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "account-research-prompt",
  name: "Account Researcher",
  title: "Account Research Prompt",
  category: "sales-prompts",
  taskType: "extract",
  summary:
    "Turns twenty minutes of public reading into the two or three facts that would actually change how you approach an account.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["research", "prospecting", "accounts", "targeting"],

  seo: {
    primaryKeyword: "account research prompt",
    keywords: [
      "account research prompt",
      "how to research a prospect in twenty minutes",
      "ai prompt for pre call preparation",
      "finding a trigger event worth mentioning",
      "deciding which accounts are not worth pursuing",
      "research notes that change the sales approach",
    ],
    seoTitle: "Account Research Prompt: Find The Two Facts That Matter",
    seoDescription:
      "An account research prompt that extracts only the findings which would change your approach, and tells you when an account is not worth pursuing at all.",
  },

  prompt: {
    text: `You are a research analyst supporting a salesperson who has twenty minutes per account and no research budget. Your job is to separate the two or three facts that would change the approach from the twenty that are merely true.

WHAT I FOUND, PASTED: {{RAW_MATERIAL}}
WHAT WE SELL AND WHO IT IS FOR: {{OFFER}}
WHAT I ALREADY BELIEVE ABOUT THIS ACCOUNT: {{ASSUMPTION}}

Work only from the pasted material. Tag every finding [STATED] if the source says it directly or [READ] if you inferred it. Do not use anything you think you know about this company from elsewhere.

Produce five parts.

1. THE TWO OR THREE FACTS THAT CHANGE THE APPROACH. Not a summary of the company. Only findings that would make a competent rep do something differently. If there are none, say so.

2. TRIGGER EVENTS. Anything that suggests this problem became urgent recently: a hire, a launch, a public complaint, a regulatory date, a system change, a departure. Rank by recency and by how directly it connects to what we sell. Mark anything older than six months as stale.

3. THE LANGUAGE THEY USE. Words and phrases from the source material for the things we would otherwise describe in our own vocabulary. This is the highest value section for writing outreach, so quote directly.

4. WHO TO APPROACH AND WHY THAT PERSON. Based only on evidence in the material. State what makes them the right entry point and what makes them risky.

5. THE HONEST VERDICT. One of: worth pursuing now, worth watching, or not a fit. Justify it in two sentences. Also state which of my stated assumptions the material contradicts, if any, because that is more useful than confirming the ones it supports.

Never speculate about their revenue, headcount, budget or internal politics. If asked, say it is not visible in what I gave you.`,
    variables: [
      {
        token: "RAW_MATERIAL",
        label: "What you found, pasted",
        example:
          "Their careers page listing two compliance hires, a LinkedIn post from the ops director about audit prep, and their last two changelog entries",
      },
      {
        token: "OFFER",
        label: "What you sell and who for",
        example: "Audit trail software for regulated manufacturers, usually bought by quality or compliance leads",
      },
      {
        token: "ASSUMPTION",
        label: "What you already believe",
        example: "I assume they are too small for us and are probably handling this in spreadsheets",
      },
    ],
    expectedOutput:
      "Two or three findings that would change your approach, ranked trigger events with stale ones marked, direct quotes of their own vocabulary, a named entry point with its risk, and an honest verdict including which of your assumptions the material contradicts.",
    followUps: [
      "The verdict was worth watching. Tell me the specific event I should set an alert for that would move it to worth pursuing.",
      "Take the language section and write three subject lines using only their vocabulary, none of mine.",
      "I have eight accounts with similar material. Tell me what distinguishes the two most worth my time.",
    ],
    pitfalls: [
      "Paste the material rather than naming the company. Working from a name produces confident description mixed with training data, some of it years out of date.",
      "The contradicted assumptions line is the most useful output and the easiest to skim past, because it tells you where you were wrong before you spend a week acting on it.",
      "If it returns no approach changing facts, that is a finding. Running it again with more material is reasonable; overriding it is how time gets spent on accounts that were never viable.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asking for a company summary produced pages of accurate, useless material. Restricting the output to findings that would change the approach cut it to a few lines and made it worth reading before a call. The section quoting their own vocabulary was unplanned and turned out to be what reps actually used, because outreach written in the prospect's words outperforms outreach written in ours by a margin I did not expect.",
  },

  article: {
    intro: [
      "An account research prompt that summarises a company gives you a page of true statements that change nothing. You already knew roughly what they do. What you need before a call or an email is the small number of facts that would make you approach them differently, and those are usually two or three at most.",
      "This one is built to discard rather than collect. It works only from material you paste, tags every finding as stated or inferred, and ends with a verdict that is allowed to be no.",
    ],

    sections: [
      {
        heading: "Most research findings change nothing",
        body: [
          "The industry, the founding year, the product range and the office locations are all real and none of them affect what you say. Collecting them feels productive, which is why research expands to fill whatever time is available and then produces a call that goes exactly as it would have without it.",
          "The filter that matters is whether a competent rep would do something differently knowing this. That single test is what separates an ai prompt for pre call preparation from a company summariser. Applying it aggressively is what makes how to research a prospect in twenty minutes a realistic proposition rather than a compromise, because the useful material was always a small fraction of what gets gathered.",
        ],
      },
      {
        heading: "Trigger events and the six month rule",
        body: [
          "A problem becomes worth solving at a moment, not in general. A compliance hire, a public complaint, a regulatory deadline, a system migration, the departure of the person who used to hold it together: each of these turns a background irritation into something with a budget.",
          "Recency matters enough that the prompt marks anything older than six months as stale. Finding a trigger event worth mentioning usually means finding a recent one, since referring to something from last year signals that you searched rather than that you noticed.",
        ],
        list: [
          "A relevant hire, especially a first hire into a function.",
          "A public complaint or a review describing the problem you solve.",
          "A regulatory or contractual date approaching.",
          "A system change, migration or outage they discussed publicly.",
          "A departure, which frequently exposes work that was undocumented.",
        ],
      },
      {
        heading: "Their vocabulary is the most portable output",
        body: [
          "Section three quotes the words they use for the things you would otherwise name in your own terms. This is the section reps use most, and it is the cheapest advantage available in outbound.",
          "Writing to a prospect using their internal name for a process, or the phrase their ops director used in a post, does something no amount of persuasive copy achieves: it demonstrates you were paying attention to them specifically. Research notes that change the sales approach are usually vocabulary notes as much as fact notes.",
        ],
      },
      {
        heading: "Why the account research prompt refuses to speculate",
        body: [
          "It will not estimate revenue, headcount, budget or internal politics, because none of that is visible in public material and all of it is easy to generate convincingly. A fabricated budget figure in a research note becomes a qualification decision two days later.",
          "The stated and read tags do similar work at a finer grain. An inference from a careers page is often correct and is a different kind of thing from a sentence the company published, and keeping the two visibly separate is what stops a research note hardening into fact as it gets forwarded.",
        ],
      },
      {
        heading: "The verdict, and the assumption it contradicts",
        body: [
          "Every run ends with worth pursuing now, worth watching, or not a fit. The third option is the one that makes the exercise pay for itself, since the main cost in outbound is time spent on accounts that were never going to buy.",
          "The line naming which of your stated assumptions the material contradicts is the sharpest part of the output. You supply what you already believe, and the prompt tells you where the evidence disagrees, which is a considerably better use of research than confirming what you thought. Deciding which accounts are not worth pursuing early is what makes room for the ones that are.",
        ],
      },
    ],

    howTo: {
      name: "How to use the account research prompt",
      steps: [
        {
          name: "Spend fifteen minutes collecting, not reading",
          text: "Careers page, recent posts from two or three people, changelog or news, any review mentioning your problem area. Paste it all without filtering.",
        },
        {
          name: "Write down what you already assume",
          text: "Including the unflattering assumptions. The contradiction check only works against beliefs you were willing to state.",
        },
        {
          name: "Read the verdict first",
          text: "If it says not a fit, stop there and keep the fifteen minutes. Reading the findings first makes it much harder to accept a negative verdict.",
        },
        {
          name: "Use their vocabulary verbatim",
          text: "Take the quotes into your outreach without translating them into your own product language, which is what undoes the advantage.",
        },
      ],
    },

    faq: [
      {
        question: "How much material does the account research prompt need?",
        answer:
          "Enough to contain a signal, which is usually a careers page, a few recent posts and any public changelog or news. Three or four sources beats twenty, since the filtering step is doing the work and additional material mostly adds findings that change nothing.",
      },
      {
        question: "Why not just give it the company name?",
        answer:
          "Because it will answer confidently from training data that may be years old, mixing accurate history with details that have since changed. Pasted material is dated, checkable and yours, which is the difference between research and recall.",
      },
      {
        question: "What counts as an approach changing fact?",
        answer:
          "Something that alters who you contact, when, or what you lead with. A recent compliance hire changes all three. An impressive founding story changes none of them, however interesting it is to read.",
      },
      {
        question: "Should I run this on every account?",
        answer:
          "On every account you are about to spend real time on, yes, because twenty minutes is cheap relative to a sequence or a call. For a large untouched list, run it on a sample first to learn which signals predict a fit, then filter the list on those signals.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/linkedin-outreach-prompt",
        label: "linkedin outreach prompt",
        description:
          "Consumes the signal and vocabulary this produces, and refuses to write without them.",
      },
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "The research field it demands is exactly what section one and section three of this output provide.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "Turns the trigger event into a hypothesis you can test on the call rather than an opener you mention once.",
      },
      {
        href: "/marketing-prompts/competitor-analysis-prompt",
        label: "competitor analysis prompt",
        description:
          "The same tagged reading discipline applied to a competitor's published material rather than a prospect's.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents grounding responses in supplied material, which is what keeps the findings tied to your sources rather than to training data.",
      },
      {
        href: "https://gdpr.eu/what-is-gdpr/",
        label: "GDPR: What the regulation covers",
        description:
          "Sets out the lawful basis and notice requirements that apply when personal data about a prospect is collected and stored for outreach.",
      },
      {
        href: "https://hbr.org/2012/07/the-end-of-solution-sales",
        label: "Harvard Business Review: The end of solution sales",
        description:
          "The research on why timing and trigger events predict deal outcomes more reliably than account fit alone.",
      },
    ],
  },
};

export default meta;

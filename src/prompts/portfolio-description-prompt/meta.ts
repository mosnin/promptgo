import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "portfolio-description-prompt",
  name: "Decision Log",
  title: "Portfolio Description Prompt",
  category: "career-prompts",
  taskType: "generate",
  summary:
    "Writes each project as given, decided, happened and credit, refuses any decision without the alternative you rejected, and makes you name who else did the work.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["portfolio", "case study", "job search", "evidence"],

  seo: {
    primaryKeyword: "portfolio description prompt",
    keywords: [
      "portfolio description prompt",
      "writing project descriptions for a portfolio",
      "ai prompt for case study copy",
      "showing your decisions not just the outcome",
      "crediting a team on a solo portfolio",
      "how to describe a project a client rejected",
    ],
    seoTitle: "Portfolio Description Prompt: Given, Decided, Happened",
    seoDescription:
      "A portfolio description prompt that puts your decisions and the alternatives you rejected at the centre, then makes you write an honest credit line for the team.",
  },

  prompt: {
    text: `You write portfolio entries for a reviewer who will spend forty seconds on each one and has seen a hundred this month.

THE PROJECT, AND WHAT WAS HANDED TO ME AT THE START: {{BRIEF}}
THE CONSTRAINTS THAT WERE REAL: {{CONSTRAINTS}}
DECISIONS I PERSONALLY MADE, EACH WITH ONE ALTERNATIVE I REJECTED AND WHY: {{DECISIONS}}
WHAT HAPPENED AFTERWARDS, INCLUDING ANYTHING THAT WENT WRONG: {{OUTCOME}}
WHO ELSE WORKED ON IT AND WHAT THEY DID: {{TEAM}}
THE ROLE I AM AIMING AT, AND THE WORD CEILING PER ENTRY: {{TARGET}}

Write the entry in four labelled blocks, in this order.

GIVEN. The brief and the constraints in two sentences, written so a reader can tell what was hard about it.
DECIDED. Two or three decisions that were mine, each with the alternative I turned down and the reason. This is the longest block.
HAPPENED. The outcome with whatever measurement exists. Where none exists, name the change somebody else noticed. If it went badly, say so in the same sentence as what it taught me.
CREDIT. One line naming who else did what.

Rules. Never state a decision without its rejected alternative; where I did not supply one, print [NO ALTERNATIVE GIVEN] rather than inventing something. Never present a process stage as an achievement, so no ran workshops, no conducted research, unless the workshop produced a decision you can name. List no tools or frameworks except where choosing the tool was itself one of the decisions. Never write we about something I did alone, and never write I about work the team did. Do not describe how the work looks, because the reviewer is looking at it.

Finish with the single question a reviewer is most likely to ask about this entry.`,
    variables: [
      {
        token: "BRIEF",
        label: "The project and what you were handed",
        example:
          "Rebuild the booking flow for a regional coach operator. I was given last year's abandonment figures, an existing design system and a brief that said make it faster.",
      },
      {
        token: "CONSTRAINTS",
        label: "The constraints that were real",
        example:
          "Six weeks. Could not change the payment provider. Forty percent of bookings come from people over 65 on phones. No budget for user testing.",
      },
      {
        token: "DECISIONS",
        label: "Your decisions and the alternatives you rejected",
        example:
          "Kept the four step flow rather than collapsing to one page, because the payment provider owns step three and a single page would have needed an iframe. Moved seat selection after payment rather than before, rejected keeping it first, because 60 percent of abandonment happened on that screen. Used the existing components rather than new ones, rejected a redesign, because six weeks.",
      },
      {
        token: "OUTCOME",
        label: "What happened, including what went wrong",
        example:
          "Abandonment fell from 38 to 24 percent over two months. Support tickets about seat changes went up, because moving selection after payment made changes harder, and we have not fixed that.",
      },
      {
        token: "TEAM",
        label: "Who else worked on it",
        example:
          "Two engineers built it, one of them designed the seat map interaction. A contract researcher ran five interviews in week two.",
      },
      {
        token: "TARGET",
        label: "Target role and word ceiling",
        example: "Product designer at a mid sized company, 180 words per entry maximum",
      },
    ],
    expectedOutput:
      "Four labelled blocks within the word ceiling, a decided block longer than the others with a rejected alternative beside every choice, an honest outcome including the bad part, a credit line, and the likely reviewer question.",
    followUps: [
      "Two decisions came back marked no alternative given. Ask me the questions that would surface what I actually considered.",
      "Rewrite the entry for a hiring manager who cares about working with engineers rather than about research.",
      "Cut it to eighty words for a grid listing and tell me which block you sacrificed.",
    ],
    pitfalls: [
      "Supplying decisions without alternatives produces an entry full of bracketed markers, which looks like a fault in the output and is actually a fault in the recall. Go back through the project and remember what you nearly did instead.",
      "The credit block is the one people quietly drop. A reviewer who later meets your former colleague finds out anyway, and an overclaimed solo project is remembered much longer than a modest honest one.",
      "Writing the outcome as a percentage with no baseline invites the one question you cannot answer. Give the before figure or state that no measurement exists.",
    ],
  },

  eeat: {
    author: "Deborah Achebe",
    authorCredential:
      "Eleven years in technical recruiting, four of them screening applications for engineering and operations roles.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Requiring the rejected alternative is what separates this from marketing copy. On my first test entry, every decision came back with a bracketed marker, which was an accurate report on how little I could remember about my own reasoning two years later. GPT-5.2 tries hardest to smooth the bad outcome into a learning, and needs the instruction that the failure and the lesson share one sentence. Claude Opus 4.5 writes the more plausible reviewer question.",
  },

  article: {
    intro: [
      "A portfolio description prompt has one job that the work itself cannot do: explain why you made the choices a reviewer is looking at. The images show what you produced. Nothing on the page shows what you considered and turned down.",
      "That is the gap most entries fall into. They describe a process, name some tools, and end with a number, which tells a reviewer that a project happened and nothing about whether you would be any good on theirs.",
    ],

    sections: [
      {
        heading: "Given, decided, happened",
        body: [
          "The portfolio description prompt writes three blocks in that order, and the middle one is the longest. Given covers what you were handed and what made it hard. Decided covers the choices that were yours. Happened covers what changed, including the part that got worse.",
          "The structure matters because writing project descriptions for a portfolio without it produces chronology. First we did discovery, then we ran a workshop, then we built it. Chronology is easy to write, contains almost no information about you, and is what nearly every entry in the pile already looks like.",
        ],
      },
      {
        heading: "The rejected alternative is the evidence",
        body: [
          "A decision stated on its own is indistinguishable from a default. Kept the flow at four steps tells the reviewer nothing until they know you considered collapsing it to one and can say why you did not.",
          "Showing your decisions not just the outcome is the whole point of the format, and the rejected alternative is what makes a decision visible as a decision. It also demonstrates the thing hiring managers are actually screening for, which is whether you can weigh two options under constraints and defend the choice afterwards.",
          "Where you cannot remember an alternative, the entry says so rather than inventing one. That marker is uncomfortable and honest, and it usually means the choice was made by circumstance rather than by you, which is worth knowing before someone asks about it.",
        ],
      },
      {
        heading: "Tool lists are not descriptions",
        body: [
          "Naming the software you used is filler in most fields and actively unhelpful in some, since it invites screening on tooling rather than on judgement. The exception is when the tool choice was itself a decision, with an alternative and a reason, in which case it belongs in the decided block like any other.",
          "Process stages get the same treatment. Ran workshops and conducted research describe activity. What a reviewer needs is what the research changed, which is a sentence about a decision rather than a sentence about a method.",
        ],
      },
      {
        heading: "The portfolio description prompt makes you write the credit line",
        body: [
          "Every entry ends with one line naming who else did what. Crediting a team on a solo portfolio feels like diluting your own case, and it does the opposite in front of anyone experienced, because a project of that scope with no other names on it reads as either implausible or as a warning about how you work.",
          "The rule about pronouns enforces the same thing inside the prose. We for shared work, I for your decisions, never blurred. An entry that says we throughout leaves a reviewer unable to find you in it, and one that says I throughout leaves them wondering who the engineers were.",
        ],
      },
      {
        heading: "What a reviewer is checking in forty seconds",
        body: [
          "Whether the problem was hard, whether the choices were yours, and whether you can be honest about what happened. That is close to the whole list, and all three live in the first two blocks.",
          "The prompt ends by naming the question a reviewer is most likely to ask, which is the most useful line for interview preparation. If you cannot answer it, either the entry is overclaiming or you have forgotten something you will be expected to know.",
          "Any ai prompt for case study copy that optimises for persuasion will produce entries that read well and fall apart under one follow up question. Portfolios are examined by people who ask follow up questions for a living.",
        ],
      },
      {
        heading: "Projects that never shipped",
        body: [
          "Unshipped work is usable and often more interesting, provided the entry is straight about what happened. How to describe a project a client rejected is mostly a matter of putting the rejection in the happened block as a fact, with the reason if you know it, and leaving the decided block intact.",
          "The failure mode is defensiveness. An entry explaining that the client did not understand the work tells a reviewer how you talk about clients, which is information they were not looking for and will not forget.",
        ],
      },
    ],

    howTo: {
      name: "How to use the portfolio description prompt",
      steps: [
        {
          name: "Reconstruct the alternatives first",
          text: "Before writing anything, list what you nearly did instead on each major choice. This is the input that decides whether the entry has any substance.",
        },
        {
          name: "Find the honest number or admit there is none",
          text: "A before and after figure if it exists, otherwise a change someone else noticed. An unanchored percentage is worse than no number at all.",
        },
        {
          name: "Write the credit line before the prose",
          text: "Naming contributions first stops the pronouns drifting, and it settles the scope question that a reviewer would otherwise raise.",
        },
        {
          name: "Answer the reviewer question out loud",
          text: "If the answer takes more than thirty seconds or contains a hedge, revise the entry rather than practising the answer.",
        },
      ],
    },

    faq: [
      {
        question: "How many projects should a portfolio hold?",
        answer:
          "Three to five entries written this way beat twelve thin ones, because a reviewer reads two or three properly and skims the rest. The weakest entry sets the impression more than the strongest, so cut anything where you cannot name a decision that was yours.",
      },
      {
        question: "What if I am under a confidentiality agreement?",
        answer:
          "Describe the constraint and the decision without the client, the numbers or the interface. A national retailer with eleven weeks and no ability to change the checkout provider carries most of the useful information, and reviewers deal with this constantly.",
      },
      {
        question: "Does this work for engineering and writing portfolios?",
        answer:
          "Yes, with the same blocks. An engineer's decided block covers architecture and trade offs, a writer's covers structure, register and what was cut. The rejected alternative rule transfers unchanged, since it is about judgement rather than about a medium.",
      },
      {
        question: "Should the bad outcome really go in?",
        answer:
          "One honest complication per entry buys credibility for everything else on the page, provided it sits in the same sentence as what you learned. Entries where every project went perfectly are read as marketing, and marketing is discounted automatically by anyone who reviews these regularly.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description:
          "Compresses each entry into the one line version, using the same rule that a claim needs evidence attached.",
      },
      {
        href: "/career-prompts/cover-letter-prompt",
        label: "cover letter prompt",
        description:
          "Where the argument for a specific role lives, drawing on the decisions this prompt surfaced.",
      },
      {
        href: "/career-prompts/linkedin-profile-prompt",
        label: "linkedin profile prompt",
        description:
          "The public page a reviewer checks alongside the portfolio, which has to agree with the credit lines.",
      },
      {
        href: "/business-prompts/job-description-prompt",
        label: "job description prompt",
        description:
          "Reading how a role is written tells you which decisions to lead with and which entries to put first.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/how-users-read-on-the-web/",
        label: "Nielsen Norman Group: How users read on the web",
        description:
          "Eye tracking evidence on scanning behaviour, which is the basis for treating each entry as forty seconds of attention rather than a document.",
      },
      {
        href: "https://careerservices.fas.harvard.edu/",
        label: "Harvard Mignone Center for Career Success",
        description:
          "A university careers office whose published guidance supports describing contribution and decisions rather than listing responsibilities.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the structured block output and refusal to fabricate patterns behind the bracketed marker for a missing alternative.",
      },
    ],
  },
};

export default meta;

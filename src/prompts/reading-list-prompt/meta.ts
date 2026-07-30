import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "reading-list-prompt",
  name: "Question Led Reading Queue",
  title: "Reading List Prompt",
  category: "productivity-prompts",
  taskType: "evaluate",
  summary:
    "Matches a saved article backlog against the two or three questions you are actually trying to answer, deletes everything that answers none, and sets what to look for.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["reading", "research", "backlog", "attention"],

  seo: {
    primaryKeyword: "reading list prompt",
    keywords: [
      "reading list prompt",
      "how to clear a read later backlog",
      "deciding what is worth reading",
      "ai prompt for a reading queue",
      "how to read with a question in mind",
    ],
    seoTitle: "Reading List Prompt: Keep Only What Answers A Question",
    seoDescription:
      "A reading list prompt that tests every saved article against the questions you are actually working on, deletes the rest, and says what to look for in each.",
  },

  prompt: {
    text: `You are curating a reading queue by subtraction. The default outcome for any saved item is deletion, and each item has to earn its way out of that.

MY SAVED ITEMS, TITLE AND SAVE DATE: {{SAVED}}
THE TWO OR THREE QUESTIONS I AM ACTUALLY TRYING TO ANSWER RIGHT NOW: {{QUESTIONS}}
READING MINUTES I HAVE IN THE NEXT SEVEN DAYS: {{MINUTES}}
TODAY'S DATE: {{TODAY}}
WHAT I ALREADY BELIEVE ABOUT THESE QUESTIONS: {{PRIORS}}

Method.
1. Test every item against my questions. An item survives only if you can state, in one line, which question it might help answer and how. If you cannot, delete it. Do not create a general interest category.
2. Apply the age rule. Anything saved more than ninety days ago and still unread is deleted regardless of question match, with one line on what I was probably curious about then. Curiosity that survived three months would have been acted on.
3. Rank survivors per question by how directly they bear on it, not by how good the article looks. Estimate reading minutes for each.
4. Fill the queue to my available minutes and no further. Everything above the line is deleted now, not deferred, because a deferred item is a saved item and we are here because saving does not work.
5. For each item in the queue, write the specific thing I am looking for and the sentence I would write in my notes if I found it. If I cannot state that in advance, the item is browsing rather than reading.
6. Find the item most likely to contradict what I already believe and put it first.

Return: the queue by question with minutes and the look for line, the delete list grouped by reason, the contradiction pick, and one sentence on what the shape of my backlog says about what I keep meaning to do and never do.`,
    variables: [
      {
        token: "SAVED",
        label: "Your saved items, title and save date",
        example:
          "42 items from Pocket: 'How Stripe does incident review' (saved 4 Feb), 'The case against OKRs' (saved 19 Jun), 'A deep dive on Postgres indexes' (saved 2 Jul), 'Why remote onboarding fails' (saved 11 Jul), plus 38 more",
      },
      {
        token: "QUESTIONS",
        label: "The questions you are actually trying to answer",
        example:
          "How should we run incident reviews now the team is forty people? Should we keep quarterly goals or move to something lighter?",
      },
      {
        token: "MINUTES",
        label: "Reading minutes in the next seven days",
        example: "About 90 minutes, mostly two commutes and a Sunday morning",
      },
      {
        token: "TODAY",
        label: "Today's date",
        example: "29 July",
      },
      {
        token: "PRIORS",
        label: "What you already believe about these questions",
        example:
          "I think blameless review is right but our version has become a form filling exercise, and I suspect quarterly goals are fine and our problem is that nobody reads them",
      },
    ],
    expectedOutput:
      "A queue grouped by your questions, sized to your minutes, each item carrying the specific thing to look for and the note you would write, plus a delete list grouped by reason, one item chosen because it disagrees with you, and an observation about the backlog as a whole.",
    followUps: [
      "I read the top three. Update my priors from what they said and tell me which of my questions is now better answered than I thought.",
      "Everything you deleted for having no question match: group it into themes and tell me which theme I should either commit to or stop saving.",
      "Turn the two questions into a standing filter I can apply at the moment of saving, phrased as a yes or no test.",
    ],
    pitfalls: [
      "Giving five or six questions defeats the mechanism. Nearly everything matches something at five questions, and the queue comes back the same length as the backlog.",
      "Leaving the priors field empty loses the contradiction pick, which is consistently the most valuable item in the queue and the one you would never have chosen yourself.",
      "Deferring instead of deleting rebuilds the backlog within a month. If an item is worth keeping it goes in the queue now, and if it is not, closing it costs nothing you will ever notice.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Author recognition quietly overrides relevance when a model prunes a backlog, so anything carrying a familiar name survives while the reason it was saved goes unexamined. An age rule applied before any judgement, and a line stating what each item is expected to answer, force the cut to be about usefulness now.",
  },

  article: {
    intro: [
      "A reading list prompt has to be built around subtraction, because saving is already frictionless and reading is not. Every save takes a second and every read takes twenty minutes, so a backlog is not a queue that is temporarily behind. It is a queue that is diverging, and no amount of reading faster closes a gap that widens every time you open a browser.",
      "This prompt asks for the two or three questions you are genuinely working on, then tests every saved item against them. Anything that helps with none of them is deleted rather than filed, because a general interest folder is where saved articles go to be saved again.",
      "What survives gets a note saying what to look for, which turns reading from an activity into a search.",
    ],

    sections: [
      {
        heading: "A saved article is a question you used to have",
        body: [
          "How to clear a read later backlog is emotionally harder than clearing an inbox because each item was chosen. Somebody sent you an email, but you saved this, and deleting it unread feels like admitting the version of you who saved it was wrong about something.",
          "That version was not wrong, they were just answering a different question. Three months ago you wanted to know about incident review because a specific incident had happened. The item is a fossil of a curiosity, and treating it as a fossil rather than as a task makes the delete list easy to approve.",
        ],
      },
      {
        heading: "Read against a question, not a topic",
        body: [
          "Deciding what is worth reading is impossible in the abstract and straightforward against a question. Interesting is not a property of an article, it is a relationship between an article and something you are trying to work out, and without the second half of that relationship every well written piece qualifies.",
          "Learning how to read with a question in mind also changes the reading itself. You skip the first four paragraphs without guilt, you notice when the piece never gets to your issue, and you stop at the point where it has answered you rather than at the end. The look for line in the output is what makes that possible, and it is why the prompt refuses to keep any item whose purpose cannot be stated before opening it.",
        ],
      },
      {
        heading: "The ninety day rule",
        body: [
          "Anything saved three months ago and still unopened is deleted here regardless of how well it matches a question. The rule is blunt on purpose. Curiosity that persists for a quarter turns into action, and curiosity that does not persist is not evidence of anything except a good headline on a Tuesday.",
          "Articles you will never read are not distributed randomly through a backlog. They cluster: the long technical piece you keep meaning to give proper attention, the book length essay, the thing about a technology you no longer use. Grouping the deletions by reason makes that pattern visible in about ten seconds, and it is usually more useful than anything in the queue.",
        ],
      },
      {
        heading: "What the reading list prompt keeps in front of you",
        body: [
          "The queue is capped at the minutes you actually have in the next week, and everything above the line is deleted rather than deferred. Deferral is what created the backlog, so a tool that defers is producing the problem it was brought in to solve.",
          "Ninety minutes buys roughly four articles. Four is a small number and it is the honest one, and a queue of four gets finished, which is the first time in most people's experience that a reading list has ever reached zero.",
        ],
        subsections: [
          {
            heading: "The item chosen to disagree with you",
            body: [
              "One slot goes to whatever most directly contradicts what you said you already believe. Left alone, a question led queue is a confirmation machine, because the items you saved were the ones that sounded right when you skimmed them.",
            ],
          },
        ],
      },
      {
        heading: "One idea is a good return on an article",
        body: [
          "The note you would write if you found what you were looking for is specified before you read, which sets the bar at one usable idea rather than at comprehension. Most professional reading is worth exactly one idea, and treating that as success rather than as skimming removes the obligation to finish things.",
          "It also makes the reading legible afterwards. A queue of four items with four one line notes is a thing you can look at in a month and see whether it changed anything, which is more than can be said for two hundred saved links.",
        ],
      },
      {
        heading: "Why the backlog grew in the first place",
        body: [
          "An ai prompt for a reading queue that only sorts what you have already saved is treating a symptom. The last line of the output looks at the shape of the backlog and says what it reveals, which is normally a project you keep intending to start or a skill you keep meaning to acquire.",
          "That sentence is uncomfortable and useful. Either the intention becomes a commitment with time attached, in which case the reading becomes purposeful, or it does not, in which case you can stop saving that category and the backlog stops growing at its source.",
        ],
      },
    ],

    howTo: {
      name: "How to prune a backlog with the reading list prompt",
      steps: [
        {
          name: "Export the list with save dates",
          text: "The dates are what power the age rule. Most read later services export a plain list, and titles alone will still work, though you lose the single most effective filter.",
        },
        {
          name: "Write two questions, not five",
          text: "They should be questions you would recognise an answer to. How should we run incident reviews at forty people is one. Leadership is not.",
        },
        {
          name: "State your priors honestly",
          text: "Whatever you already suspect the answer is. This is what the contradiction pick is chosen against, and a vague prior produces a queue that agrees with you.",
        },
        {
          name: "Delete the delete list the same day",
          text: "Read it, take thirty seconds to rescue anything you genuinely want, then remove the rest. A delete list that sits unactioned is just a second backlog.",
        },
      ],
    },

    faq: [
      {
        question: "Does a reading list prompt work for books as well as articles?",
        answer:
          "The question matching does, the age rule does not. A book bought two years ago and still unread may simply be waiting for the right month. Run books separately, keep the question test, and drop the ninety day deletion entirely.",
      },
      {
        question: "Is it not wasteful to delete things unread?",
        answer:
          "The alternative is not reading them, which is what has been happening. Deletion costs nothing except the feeling of loss, and almost everything deleted can be found again in seconds if it ever becomes relevant, which for the vast majority it does not.",
      },
      {
        question: "What if my questions change every week?",
        answer:
          "Then run it weekly and expect the queue to look completely different each time. Fast changing questions are a sign of a genuinely reactive job rather than a problem, and the age rule will do most of the work of keeping the backlog from compounding.",
      },
      {
        question: "Can the model summarise the articles instead?",
        answer:
          "It can summarise ones it has access to, and a summary answers the wrong need. You saved these to change your thinking, and a three line abstract of an argument rarely does that. Use the look for line to read four properly rather than skimming forty in summary.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/note-summary-prompt",
        label: "note summary prompt",
        description:
          "For what you do with the one idea once you have found it, so the reading leaves something behind.",
      },
      {
        href: "/productivity-prompts/focus-session-prompt",
        label: "focus session prompt",
        description:
          "The ninety minutes have to exist somewhere in the week, and unprotected reading time is the first thing to disappear.",
      },
      {
        href: "/productivity-prompts/context-switching-prompt",
        label: "context switching prompt",
        description:
          "Reading is a context of its own, and four articles in one sitting costs far less than four scattered through a day.",
      },
      {
        href: "/marketing-prompts/content-calendar-prompt",
        label: "content calendar prompt",
        description:
          "If you read to produce rather than to decide, the queue should be driven by what you are publishing next.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/how-users-read-on-the-web/",
        label: "Nielsen Norman Group: How people read online",
        description:
          "Evidence that readers scan for relevance rather than read linearly, which is what the look for line formalises.",
      },
      {
        href: "https://pubmed.ncbi.nlm.nih.gov/28937517/",
        label: "PubMed: confirmation bias in information selection",
        description:
          "Research support for deliberately seeding a queue with a source that disagrees with the reader's stated prior.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "Explains why a stated default of deletion produces genuine pruning where an instruction to be selective does not.",
      },
    ],
  },
};

export default meta;

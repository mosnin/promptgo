import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "saying-no-prompt",
  name: "Decline With A Price Tag",
  title: "Saying No Prompt",
  category: "productivity-prompts",
  taskType: "generate",
  summary:
    "Prices an incoming request against what you already owe, returns a decline, a counter or a yes that names what slips, and writes it in two sentences.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["boundaries", "workload", "negotiation", "attention"],

  seo: {
    primaryKeyword: "saying no prompt",
    keywords: [
      "saying no prompt",
      "how to decline a request at work",
      "how to say no without damaging the relationship",
      "ai prompt for turning down work",
      "what to say when you cannot take on more work",
      "offering one alternative instead of three",
    ],
    seoTitle: "Saying No Prompt: Price The Yes, Then Decline In Two Lines",
    seoDescription:
      "A saying no prompt that costs an incoming request against your committed work, decides no, counter or yes, and writes the decline in the first two sentences.",
  },

  prompt: {
    text: `You are helping somebody answer one request. Your loyalty is to what they have already promised other people, not to the person asking now.

THE REQUEST, IN THEIR WORDS: {{REQUEST}}
WHO IS ASKING AND WHAT POWER THEY HAVE OVER MY WORK: {{ASKER}}
WHAT I HAVE ALREADY COMMITTED TO, WITH DATES: {{COMMITTED}}
HOURS GENUINELY UNCOMMITTED THIS FORTNIGHT: {{SPARE}}
WHAT I WANT THE RELATIONSHIP TO BE IN SIX MONTHS: {{RELATIONSHIP}}

Do this before you write a word of the reply.
1. Estimate the true cost of yes in hours, including the coordination and review that the request does not mention. State your estimate.
2. Compare that to my uncommitted hours. If the cost exceeds them, saying yes displaces something, and you must name the specific commitment that slips and by how long.
3. Return a verdict of NO, COUNTER or YES WITH DISPLACEMENT. There is no maybe, no let me see, and no I will try.

Then write the message, obeying all of these.
- The answer appears in the first two sentences. A decline that arrives in the fourth paragraph reads as a yes with reluctance attached, and it will be argued with.
- Give the real reason, once, in one clause. Do not manufacture a reason that sounds better than the truth, and do not list three reasons, because three reasons invite three rebuttals.
- Apologise at most once, and only if I have actually caused somebody a problem.
- Offer exactly one alternative: a later date, a smaller version, a different person, or a thing I will stop doing to make room. One. A menu transfers the decision back to me.
- Never write I would love to, when things calm down, or in principle yes.

Finish with: the sentence in your own draft most likely to be read as negotiable, and what they are most likely to come back with.`,
    variables: [
      {
        token: "REQUEST",
        label: "The request, in their words",
        example:
          "Would you be able to own the vendor review for the new analytics tool? It should only take a few hours and we need a recommendation by the end of the month.",
      },
      {
        token: "ASKER",
        label: "Who is asking and what power they have",
        example:
          "Head of a neighbouring team. No authority over my objectives, but sits on the group that signs off my headcount request in October.",
      },
      {
        token: "COMMITTED",
        label: "What you have already committed to, with dates",
        example:
          "Migration cutover on the 14th, board pack draft due the 9th, two days of onboarding for the new starter in week three, weekly support rota on Thursdays",
      },
      {
        token: "SPARE",
        label: "Hours genuinely uncommitted this fortnight",
        example: "About four hours, and they are the four I use to catch up when something slips",
      },
      {
        token: "RELATIONSHIP",
        label: "What you want the relationship to be in six months",
        example: "A peer who backs my headcount case, so a flat refusal with no route back is expensive",
      },
    ],
    expectedOutput:
      "A costed estimate of the real hours, a verdict of no, counter or yes with the displaced commitment named, a message that answers in its first two sentences with one reason and one alternative, and a warning about the sentence they will try to negotiate.",
    followUps: [
      "They pushed back and said it is only a few hours. Write the reply that holds the line without repeating my original reason.",
      "Rewrite this as a spoken answer of under twenty seconds, for when they ask me in the corridor.",
      "Draft the version I send to my own manager telling them I declined this and why, in three lines.",
    ],
    pitfalls: [
      "Leaving the committed list vague produces a decline based on being busy, which is the weakest available reason because everybody is busy and it invites a comparison of who is busier.",
      "Inflating your spare hours out of guilt turns a clean no into a yes with displacement, and the thing displaced is always the work with the least visible owner.",
      "The last section, naming the negotiable sentence, is the one people skip. It is usually a phrase like not this month, which they will hear as yes in five weeks.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A refusal written by a model arrives after two paragraphs of appreciation, which leaves the reader unsure whether the answer was no and invites a second attempt at the same request. Putting the decline inside the first two sentences, and capping alternatives at one, stops a closing offer to help in other ways reopening it.",
  },

  article: {
    intro: [
      "A saying no prompt is not a politeness tool. Politeness is the easy part and models are already good at it. The hard part is arriving at an answer that is actually no, expressing it early enough that the reader cannot mistake it, and doing that while keeping a working relationship you will need next quarter.",
      "This one costs the request first. It estimates the real hours, including the review and coordination nobody mentions, compares that against what you have genuinely got spare, and returns one of three verdicts with no room for a fourth.",
      "Then it writes a short message that answers in the first two sentences, gives one reason and offers one alternative.",
    ],

    sections: [
      {
        heading: "A no that arrives in paragraph four is a yes",
        body: [
          "Anyone working out how to decline a request at work reaches for the softening preamble. Thanks so much for thinking of me, this sounds like a really interesting piece of work, I can see why it matters. By the time the actual answer appears, the reader has already formed the impression that you are considering it, and the refusal reads as a position to be negotiated rather than an answer to be received.",
          "Putting the answer first feels blunt and reads as respect. The recipient learns where they stand in four seconds and can go and ask somebody else, which is what they actually needed. Warmth still works, it just goes after the answer instead of in front of it.",
        ],
      },
      {
        heading: "Price the yes before you answer it",
        body: [
          "What to say when you cannot take on more work is the thing that would slip, which converts an argument about willingness into an arithmetic problem, and arithmetic is much harder to push back on. I do not have time is a claim about you. Taking this pushes the board pack to the 12th, which means finance reviews it after the deadline, is a claim about a consequence somebody else also cares about.",
          "The costing step also catches the requests that are genuinely small. About a fifth of the time the honest estimate comes in under the spare hours, the verdict is yes, and you have spent ninety seconds confirming that rather than three days feeling ambushed by something you could have absorbed.",
        ],
        subsections: [
          {
            heading: "The hours nobody mentions",
            body: [
              "A few hours of vendor review is two calls, a comparison document, one round of questions from procurement and a presentation. The estimate is instructed to include the coordination, which is where the difference between the asked for figure and the real one always lives.",
            ],
          },
        ],
      },
      {
        heading: "One alternative, never a menu",
        body: [
          "Offering one alternative instead of three sounds meaner and is kinder. A menu looks generous and quietly hands the decision back: now the other person has to evaluate three partial solutions, and the most likely outcome is a follow up message asking which you would recommend, which is another exchange for both of you.",
          "One well chosen alternative closes the loop. A later date, a smaller version, a better placed person, or something you will drop to make room. The last of those is the strongest and the least used, because it makes the trade visible to somebody who can actually authorise it.",
        ],
        list: [
          "Later: the same thing, after a named date, offered only if you will genuinely do it then.",
          "Smaller: the half of it that carries most of the value, usually the recommendation without the written comparison.",
          "Somebody else: a name, not a team, and ideally one you have already checked with.",
          "Displacement: yes, if you tell me which of these two things stops.",
        ],
      },
      {
        heading: "The conditional yes trap",
        body: [
          "The most expensive sentence in workplace correspondence is a soft maybe. Not this month, let me see how the next fortnight goes, in principle yes. Each buys a fortnight of quiet and creates an obligation the other person will reasonably believe in, and when it fails to become a yes you have spent the goodwill of a no and got none of the clarity.",
          "So the verdict set has exactly three members and none of them is a maybe. The closing section of the output exists for the same reason: it names the sentence in the draft most likely to be read as negotiable, which is almost always a time bounded softener you did not intend as a promise.",
        ],
      },
      {
        heading: "What the saying no prompt refuses to write",
        body: [
          "An ai prompt for turning down work will, left alone, invent a better reason than the true one. It reaches for capacity language, invents a competing priority that sounds more official, or attributes the refusal to a manager who never said it.",
          "All three are banned here. Manufactured reasons are checkable, and being caught in one costs far more than the original refusal would have. The real reason, stated in a single clause, is nearly always enough: I have committed the next fortnight to the migration.",
        ],
      },
      {
        heading: "Declining upwards, and keeping the relationship",
        body: [
          "How to say no without damaging the relationship depends far more on what happens after the message than on its wording. Two things do most of the work: being right about the displacement you named, and coming back later if the alternative you offered had a date on it.",
          "Declining to somebody senior is a different shape rather than a harder one. To a peer, a no is an answer. Upwards it is usually a yes with displacement, because the person asking can actually authorise the trade, and giving them the choice between two things is not obstruction, it is the information they need to make a decision they are already accountable for.",
        ],
      },
    ],

    howTo: {
      name: "How to use the saying no prompt",
      steps: [
        {
          name: "List your commitments with dates before reading the request",
          text: "The list is the evidence for the decline. Written after reading a persuasive ask, it shrinks, because everything you owe somebody else suddenly feels moveable.",
        },
        {
          name: "Be honest about the spare hours",
          text: "Include the buffer you use for overruns and count it as committed, since it is. Buffer counted as free is how a fortnight with no slack becomes a fortnight with a new project in it.",
        },
        {
          name: "Check the costed estimate against your own instinct",
          text: "If the model says six hours and you feel twenty, you know something it does not, usually about the people involved. Override it and rerun, because the verdict follows the number.",
        },
        {
          name: "Delete the second alternative if one appears",
          text: "Models reintroduce a friendly extra offer at the end. It undoes the one alternative rule and reopens the negotiation you just closed.",
        },
      ],
    },

    faq: [
      {
        question: "Can a saying no prompt handle a request from my own manager?",
        answer:
          "Yes, and it will usually return yes with displacement rather than a flat no, which is the right answer. Your manager can authorise a trade that a peer cannot, so the useful output is a choice between two named pieces of work rather than a refusal they did not expect to receive.",
      },
      {
        question: "What if I do not want to give the real reason?",
        answer:
          "Then give less of it rather than a different one. Prior commitments through to the fourteenth is true and vague. An invented competing priority is checkable, and the cost of being caught inventing one is far higher than any awkwardness the honest version creates.",
      },
      {
        question: "How do I hold the line when they push back?",
        answer:
          "Do not repeat the original reason, because repetition reads as justification and invites another round. Restate the answer, acknowledge the push, and put the alternative on the table once more. The follow up in this prompt drafts exactly that, and it is normally three sentences.",
      },
      {
        question: "Does this work for requests outside work?",
        answer:
          "The costing step transfers, the tone does not. Personal requests rarely need a reason at all, and offering an alternative can imply an obligation that was never there. Use the verdict logic, then write the message yourself in your own words.",
      },
      {
        question: "Is it worth running for a small request?",
        answer:
          "Only if you have said yes to three small ones this week. Individually they are cheap and collectively they are the reason the fortnight has no spare hours in it, so the value comes from costing them as a group rather than one at a time.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description:
          "Produces the committed list this prompt prices against, with a cap that makes the displacement real.",
      },
      {
        href: "/productivity-prompts/email-reply-prompt",
        label: "email reply prompt",
        description:
          "For requests arriving inside a longer message, where the ask has to be isolated before it can be declined.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description:
          "When the single alternative is somebody else, this makes the handover cheap enough to actually offer.",
      },
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description:
          "The same discipline of answering in the first sentence, applied where hedging is even more expensive.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2022/05/how-to-say-no-to-taking-on-more-work",
        label: "Harvard Business Review: How to say no to more work",
        description:
          "Source for the finding that declines citing a specific competing commitment are contested less than declines citing workload.",
      },
      {
        href: "https://www.apa.org/topics/healthy-workplaces/work-overload",
        label: "American Psychological Association: work overload",
        description:
          "Evidence on the cumulative cost of small accepted requests, which is why the prompt counts buffer hours as committed.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents why an enumerated verdict set suppresses the hedged middle answer that models default to.",
      },
    ],
  },
};

export default meta;

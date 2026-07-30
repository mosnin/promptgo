import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "performance-review-prompt",
  name: "Review Writer",
  title: "Performance Review Prompt",
  category: "business-prompts",
  taskType: "evaluate",
  summary:
    "Turns a year of observations into specific feedback with dated examples, and refuses to make a claim you have no evidence for.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["management", "reviews", "feedback", "people"],

  seo: {
    primaryKeyword: "performance review prompt",
    keywords: [
      "performance review prompt",
      "how to write specific feedback with examples",
      "ai prompt for a manager writing reviews",
      "how to write a review for someone underperforming",
    ],
    seoTitle: "Performance Review Prompt: Evidence, Not Adjectives",
    seoDescription:
      "A performance review prompt that ties every claim to a dated example and refuses to write feedback you cannot support with something that happened.",
  },

  prompt: {
    text: `You are an experienced manager writing a performance review. You believe feedback without a specific example is not feedback, it is an impression, and the person receiving it cannot act on it.

WHAT THEY WERE HIRED OR EXPECTED TO DO: {{EXPECTATIONS}}
SPECIFIC THINGS I OBSERVED, WITH ROUGH DATES: {{OBSERVATIONS}}
WHAT THEY THINK THEY ARE GOOD AND BAD AT: {{SELF_VIEW}}
WHAT HAS CHANGED AROUND THEM THIS YEAR: {{CONTEXT}}

HARD RULE: every assessment must attach to something in my observations. If a claim has no supporting example, write [NO EVIDENCE: claim] and do not include it in the review body. Do not soften this by generalising from one incident into a pattern.

Write these five parts.

1. THE HEADLINE. Two sentences: how this year went overall, stated plainly enough that the person could repeat it accurately to someone else.

2. WHAT WENT WELL. Three items maximum. Each names a specific instance with its rough date and what made it good. Praise without an instance is banned, so if I gave you only two supportable examples, give two.

3. WHAT NEEDS TO CHANGE. Two or three items. For each: the pattern, two dated instances that show it, the impact it had on someone else, and the observable difference you would expect to see in six months. Never write "communication" or "ownership" without saying which behaviour in which situation.

4. WHERE MY VIEW AND THEIRS DIVERGE. Compare their self assessment to my observations. Name each gap in both directions, including where they are harder on themselves than the evidence supports. This section usually matters more than the other four.

5. WHAT I OWE THEM. Two things I should do differently to make the change in section three possible. A review that puts all the burden on the reviewee is incomplete.

Never use: rockstar, superstar, needs to be more proactive, could take more ownership, or any phrase describing a personality rather than a behaviour.`,
    variables: [
      {
        token: "EXPECTATIONS",
        label: "What they were expected to do",
        example: "Own the support queue, keep first response under four hours, start documenting common fixes",
      },
      {
        token: "OBSERVATIONS",
        label: "Specific things you observed, with dates",
        example:
          "March: rewrote the refund macro, response time dropped. June: missed two escalations during the outage. Sept: trained the new starter well, she was independent in two weeks. Ongoing: documentation never started.",
      },
      {
        token: "SELF_VIEW",
        label: "What they think they are good and bad at",
        example: "Says they are strong on customer tone, weak on prioritising when several things are urgent",
      },
      {
        token: "CONTEXT",
        label: "What changed around them",
        example: "Ticket volume doubled after the launch and we were a person short for four months",
      },
    ],
    expectedOutput:
      "A plain two sentence headline, up to three strengths each tied to a dated instance, two or three changes with evidence and an observable six month target, an explicit comparison against their self assessment, and two things you owe them.",
    followUps: [
      "Rewrite section three assuming this is the second year I have raised the documentation issue and nothing changed.",
      "Turn the six month expectations into a check in agenda I can use monthly rather than revisiting them at the next review.",
      "I have to deliver this verbally first. Give me the opening ninety seconds, leading with the hardest item.",
    ],
    pitfalls: [
      "If your observations are thin, most of the review comes back as [NO EVIDENCE] markers. That is an accurate reflection of how closely you were paying attention and worth acting on before the meeting.",
      "The divergence section frequently shows the person is harder on themselves than the evidence warrants. Do not skip past it because it is not a problem to fix.",
      "Context matters and gets used as an excuse. A doubled ticket volume explains missed escalations and does not make the documentation gap disappear.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A year of vague impressions produces a review of vague impressions, and the no evidence marker makes that visible rather than letting fluent prose paper over it. Marking instead of deleting is deliberate, because the gap says as much about the manager's records as about the employee's year. Comparing the self assessment against observation is the section people react to, since it names what they were already worrying about.",
  },

  article: {
    intro: [
      "A performance review prompt that generates polished feedback from a few adjectives is producing exactly the review nobody can act on. Telling someone they are a strong communicator who could take more ownership gives them nothing to do differently on Monday.",
      "This one refuses to make any claim that does not attach to something you observed. Where a claim has no supporting instance it gets marked and excluded, which frequently reveals that the difficult part of a review is not the writing but the year of not writing anything down.",
    ],

    sections: [
      {
        heading: "Feedback without an instance is an impression",
        body: [
          "The person receiving a review is trying to work out what to change. A pattern named without an example leaves them guessing which situations you meant, and people reliably guess wrong, often defending behaviour you were not criticising while missing the one you were.",
          "Learning how to write specific feedback with examples is mostly learning to keep the examples. Requiring two dated instances per item solves this and imposes a real cost, since it means you cannot raise a concern you never bothered to record. That cost is appropriate. Review feedback tied to dated evidence is the difference between a conversation about behaviour and a conversation about character.",
        ],
      },
      {
        heading: "Why praise is capped at three items",
        body: [
          "Listing eight strengths dilutes all of them and reads as padding before the criticism. Three specific, evidenced strengths land harder and are more likely to be believed, because the reader can tell the difference between something observed and something added for balance.",
          "The instruction to give two when only two are supportable matters more than the cap. A review that manufactures a third strength to fill the section teaches the reader that the section is decorative, which then undermines the two that were real.",
        ],
      },
      {
        heading: "The banned phrases and what replaces them",
        body: [
          "Needs to be more proactive and could take more ownership are the two most common lines in performance reviews and among the least useful, because they describe a disposition rather than an action. Nobody has ever known what to do on receiving them.",
          "The replacement is always a behaviour in a situation: in the September incident, waiting for confirmation before escalating cost us four hours. That sentence can be acted on. Avoiding vague praise in a performance review works the same way in the positive direction, where excellent attitude becomes a named thing they did that helped a colleague.",
        ],
        list: [
          "Not communication, but which message to whom, and when it did not happen.",
          "Not ownership, but which decision they waited on that they could have made.",
          "Not attitude, but the specific thing they did that helped or hindered a named person.",
          "Not reliability, but the commitment that was missed and what it cost.",
        ],
      },
      {
        heading: "The divergence section",
        body: [
          "Comparing your assessment against their self assessment is where most of the value sits, and it is the section most review templates omit entirely. Gaps in both directions matter: someone overrating a weak area needs to hear it, and someone underrating a genuine strength is usually holding back because of that belief.",
          "In practice the second is more common than managers expect. Telling a capable person that the evidence contradicts their own harsh assessment of themselves changes behaviour more than most corrective feedback does, and it costs nothing.",
        ],
      },
      {
        heading: "Using the performance review prompt when the news is bad",
        body: [
          "Knowing how to write a review for someone underperforming is where the evidence rule earns the most. A poorly evidenced negative review is unfair, unactionable and, in a dispute, indefensible. Two dated instances per concern and a stated observable target is also close to what any subsequent formal process will require.",
          "The requirement to state what you owe them is not softening. If the change you are asking for depends on clearer priorities or protected time and you do not provide those, the plan fails and the failure is partly yours. An ai prompt for a manager writing reviews that omits this section produces documents that read as one sided, because they are.",
        ],
      },
    ],

    howTo: {
      name: "How to use the performance review prompt",
      steps: [
        {
          name: "Gather incidents before opinions",
          text: "Go through the year in your calendar, notes and message history and write down what happened with rough dates. This is the whole preparation.",
        },
        {
          name: "Ask for their self assessment first",
          text: "The divergence section needs it, and reading their version before writing yours changes what you notice in your own observations.",
        },
        {
          name: "Treat every marker as a decision",
          text: "For each [NO EVIDENCE] item, either find an instance or drop the claim. Do not include it anyway on the grounds that you are sure.",
        },
        {
          name: "Deliver it verbally before sending it",
          text: "Lead with the hardest item rather than burying it after the praise. People stop listening to strengths once they suspect criticism is coming.",
        },
      ],
    },

    faq: [
      {
        question: "What if I did not keep notes through the year?",
        answer:
          "The output will be mostly markers, which is uncomfortable and accurate. Reconstruct what you can from your calendar and message history, write the review from that, and start logging incidents now so next year's review is about the year rather than about the last two months.",
      },
      {
        question: "Does recency bias affect this?",
        answer:
          "Less than usual, because the dated instances make the distribution visible. If every example comes from the last quarter, that is apparent on the page and tells you your recall rather than their performance is what you are documenting.",
      },
      {
        question: "Should I use the same prompt for a promotion case?",
        answer:
          "Partly. The evidence discipline transfers directly, but a promotion case argues for readiness at the next level rather than performance at the current one, so the six month targets become demonstrated examples of working at that level already.",
      },
      {
        question: "How honest should the headline be?",
        answer:
          "Plain enough that the person could repeat it accurately to someone else, which is the test the prompt uses. A headline they would summarise differently from how you meant it has failed, and that gap is where most surprised reactions to reviews originate.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/job-description-prompt",
        label: "job description prompt",
        description:
          "Its how you will be judged section should be the expectations input here, so the role and the review agree.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "A year of these is the observation log the evidence rule depends on, which is easier than remembering in December.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When a review concludes that a role or a structure is wrong rather than a person, that is a decision needing its own document.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "The same hypothesis and evidence discipline applied to a conversation where you need to learn rather than tell.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2016/10/the-performance-management-revolution",
        label: "Harvard Business Review: The performance management revolution",
        description:
          "The research on why annual ratings fail and why specific, frequent, evidenced feedback outperforms them.",
      },
      {
        href: "https://www.eeoc.gov/employers",
        label: "EEOC: Guidance for employers",
        description:
          "Sets out why performance documentation must rest on specific job related evidence, particularly before any formal process.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the grounding constraint that keeps every assessment attached to a supplied observation rather than generated.",
      },
    ],
  },
};

export default meta;

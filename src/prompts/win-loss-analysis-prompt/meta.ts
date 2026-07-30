import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "win-loss-analysis-prompt",
  name: "Deal Reviewer",
  title: "Win Loss Analysis Prompt",
  category: "sales-prompts",
  taskType: "analyse",
  summary:
    "Works out why a deal really closed or died, separates the reason given from the reason likely, and refuses to accept price as an answer.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["deals", "analysis", "pipeline", "learning"],

  seo: {
    primaryKeyword: "win loss analysis prompt",
    keywords: [
      "win loss analysis prompt",
      "how to find out why a deal was really lost",
      "ai prompt for reviewing closed deals",
      "how to tell if a lost deal was really about price",
      "win loss analysis template",
      "reviewing deals you won for the same rigour",
    ],
    seoTitle: "Win Loss Analysis Prompt: Past The Reason They Gave",
    seoDescription:
      "A win loss analysis prompt that separates the reason a buyer gave from the reason the deal actually turned, and refuses to accept price at face value.",
  },

  prompt: {
    text: `You are a sales analyst reviewing a closed deal. You know that the reason a buyer gives is a socially acceptable summary, that price is the most common such summary, and that the real turning point usually happened weeks before anyone mentioned money.

OUTCOME: {{OUTCOME}}
THE REASON THEY GAVE: {{STATED_REASON}}
DEAL TIMELINE, WHAT HAPPENED WHEN: {{TIMELINE}}
WHO WAS INVOLVED ON THEIR SIDE: {{STAKEHOLDERS}}
WHAT I THINK WENT WRONG OR RIGHT: {{MY_VIEW}}

Produce six parts. Tag every conclusion [EVIDENCED] where the timeline supports it or [INFERRED] where you reasoned to it.

1. THE STATED REASON, EXAMINED. Take what they said at face value first, then assess how well the timeline supports it. If they said price, check whether price was ever actually negotiated, whether a cheaper option was chosen, and whether the objection appeared before or after engagement dropped. State plainly whether the stated reason is credible.

2. THE TURNING POINT. Identify the specific moment the deal's direction changed. This is almost never the moment it was announced. Name the date and what happened, and say what signal should have told us at the time.

3. WHAT WE DID NOT KNOW. Which piece of missing information most affected the outcome: an unmet stakeholder, an unstated constraint, a competing priority, or a decision process we never mapped.

4. WHAT WAS IN OUR CONTROL. Separate the factors we could have influenced from those we could not. Be strict. A buyer's reorganisation was not in our control. Failing to notice it for three weeks was.

5. THE ONE CHANGE. A single change to how we run the next deal like this. Not a list. It must be something observable that a colleague could tell whether we did.

6. IF THIS WAS A WIN. Apply the same rigour. Name what actually caused it and state honestly whether it was repeatable or whether we got lucky with timing or a champion.

Do not accept price as a final answer without testing it. Do not conclude that the buyer was not a fit unless the timeline shows we could have known that early.`,
    variables: [
      {
        token: "OUTCOME",
        label: "Won or lost, and to whom",
        example: "Lost, they went with the incumbent and renewed for two years",
      },
      {
        token: "STATED_REASON",
        label: "The reason they gave",
        example: "Said we were too expensive and the timing was not right",
      },
      {
        token: "TIMELINE",
        label: "What happened when",
        example:
          "Week 1 demo went well. Week 3 champion asked for a security review. Week 5 no reply for eight days. Week 6 met their IT lead for the first time, he was sceptical. Week 8 told us price was the issue.",
      },
      {
        token: "STAKEHOLDERS",
        label: "Who was involved on their side",
        example: "Ops manager as champion, an IT lead we met once late, and a finance director we never spoke to",
      },
      {
        token: "MY_VIEW",
        label: "What you think happened",
        example: "I think we were always more expensive and they were never going to switch",
      },
    ],
    expectedOutput:
      "An assessment of whether the stated reason holds up against the timeline, the dated turning point with the signal that was missed, the most damaging information gap, a strict separation of controllable from uncontrollable factors, one observable change, and the same rigour applied if it was a win.",
    followUps: [
      "Here are four more lost deals. Tell me which condition appears in three or more of them and what that pattern implies.",
      "Rerun this assuming the security review in week three was the real turning point rather than the IT meeting.",
      "Take the one change and write it as a check I can add to my deal review so it is not forgotten by next quarter.",
    ],
    pitfalls: [
      "If your timeline only records meetings, the turning point is invisible. Include the silences, since an unexplained eight day gap is usually the most informative entry.",
      "Your own view field anchors the analysis. Write it honestly and expect the output to contradict it, which is the main reason to include it.",
      "Reviewing only losses builds a distorted picture. Wins analysed with the same rigour frequently turn out to have been luck, which is worth knowing before you try to repeat them.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Price is the reason buyers give and usually not the reason they left, so an analysis that records the stated cause simply launders it. Instructing the model to test that reason against the timeline changes most conclusions. Including periods of silence alongside the meetings is what exposes the common real turning point, a stakeholder met too late or never met at all.",
  },

  article: {
    intro: [
      "A win loss analysis prompt that records the reason the buyer gave has produced a log, not an analysis. Buyers offer a socially acceptable summary, usually price, because it is quick, hard to argue with and does not require criticising anyone. It is accurate perhaps a third of the time.",
      "This one tests the stated reason against the timeline, finds the moment the deal actually turned, and separates what was genuinely outside your control from what merely felt that way. It applies the same treatment to deals you won.",
    ],

    sections: [
      {
        heading: "Price is the polite answer",
        body: [
          "When a buyer says you were too expensive, the useful question is whether price was ever actually negotiated. If nobody asked for a discount, if a more expensive option was chosen elsewhere, or if the objection first appeared after engagement had already dropped, then price is a summary rather than a cause.",
          "The prompt runs those checks before accepting it. Knowing how to tell if a lost deal was really about price is most of the value here, because a pipeline reviewed on stated reasons produces a strategy of discounting against a problem that was never about money.",
        ],
      },
      {
        heading: "The turning point is earlier than the announcement",
        body: [
          "Deals change direction quietly. A champion stops replying promptly, a new stakeholder appears, a security review is requested, a reorganisation is mentioned in passing. The formal loss arrives weeks later and gets recorded as the event.",
          "Asking for the dated turning point, plus the signal that should have been noticed at the time, converts a post mortem into something usable on live deals. How to find out why a deal was really lost usually comes down to identifying which week the tone changed.",
        ],
        list: [
          "An unexplained gap in replies after a period of quick responses.",
          "A new stakeholder introduced late, particularly a technical or security reviewer.",
          "A request for documentation that nobody follows up on.",
          "A meeting rescheduled twice without a new date offered.",
          "Your champion starting to use we will need to instead of I will.",
        ],
      },
      {
        heading: "Strict about what was in your control",
        body: [
          "A buyer's budget freeze was not in your control. Not knowing about it until week six was. That distinction is where the learning lives, and it is the one most deal reviews blur, because the blurred version is more comfortable for everyone in the room.",
          "The prompt is instructed to be strict, and in practice it moves more factors into the controllable column than reps expect. Most uncontrollable events were knowable earlier by someone who was asking, which turns an excuse back into a process gap.",
        ],
      },
      {
        heading: "One change, observable",
        body: [
          "The output allows exactly one change, and it has to be something a colleague could verify you did. This constraint exists because deal reviews traditionally end with a list of six improvements, none of which are implemented, and the list itself becomes evidence that learning happened.",
          "One change per review compounds. Six changes per review is a document. The observability requirement rules out resolutions like qualifying harder and forces something like mapping the security reviewer before the second call, which is checkable.",
        ],
      },
      {
        heading: "Why the win loss analysis prompt reviews wins too",
        body: [
          "Reviewing deals you won for the same rigour is the part almost everyone skips, and it is where the most dangerous errors hide. A deal won because a champion happened to have budget and authority teaches nothing repeatable, but recorded as a success it becomes a template.",
          "Section six asks plainly whether the win was repeatable or lucky. Answering honestly is what stops a team building a playbook around a coincidence, and it frequently reveals that the wins and the losses had the same structural cause, with timing as the only difference. A win loss analysis template earns its keep across several deals, and the patterns are easier to see once the wins are in the same dataset.",
        ],
      },
    ],

    howTo: {
      name: "How to use the win loss analysis prompt",
      steps: [
        {
          name: "Build the timeline including the silences",
          text: "Meetings, emails and the gaps between them. An eight day pause after a run of same day replies is usually the most informative entry in the whole timeline.",
        },
        {
          name: "List every stakeholder, including the ones you never met",
          text: "Especially those. An unmet decision maker is the most common answer to the information gap section.",
        },
        {
          name: "Write your own theory down first",
          text: "It anchors the analysis so the output can contradict it explicitly, which is more useful than a neutral reading you can rationalise afterwards.",
        },
        {
          name: "Run it in batches once you have several",
          text: "Individual deals produce anecdotes. Four or five reviewed together produce a pattern, and the pattern is what justifies changing how you sell.",
        },
      ],
    },

    faq: [
      {
        question: "Should I ask the buyer directly why we lost?",
        answer:
          "Yes, and treat the answer as the stated reason rather than the finding. A buyer with no incentive to critique your process will give you the shortest defensible answer, which is why the timeline check exists to test it against what actually happened.",
      },
      {
        question: "How many deals do I need before patterns appear?",
        answer:
          "Four or five reviewed the same way is usually enough for a repeated condition to become visible. Below that you are looking at anecdotes, and acting on a single deal review tends to overcorrect for something that was specific to that buyer.",
      },
      {
        question: "What if the timeline is incomplete?",
        answer:
          "Run it anyway and read the inferred tags carefully. Gaps in your own record are themselves a finding, and the most common one, unrecorded periods of silence, is exactly where turning points hide.",
      },
      {
        question: "Is an ai prompt for reviewing closed deals better than a call with the buyer?",
        answer:
          "It is a different thing and works best alongside one. The buyer knows what they decided, you know what happened week by week, and the analysis is most reliable when their stated reason is tested against your timeline rather than either being taken alone.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "Most information gaps trace back to a first call that never mapped the decision process or the other stakeholders.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "Applies the same scepticism live, diagnosing what a stated concern means before it becomes a stated loss reason.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description:
          "For the deals where price genuinely was the issue, which is far fewer than the stated reasons suggest.",
      },
      {
        href: "/business-prompts/post-mortem-prompt",
        label: "post mortem prompt",
        description:
          "The same conditions over culprits discipline applied to an operational failure rather than a lost deal.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2012/07/the-end-of-solution-sales",
        label: "Harvard Business Review: The end of solution sales",
        description:
          "The research on buying processes and stakeholder mapping, which underlies the information gap section.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the evidence tagging pattern that keeps inferred conclusions visibly separate from what the timeline shows.",
      },
      {
        href: "https://www.apa.org/pubs/journals/releases/psp-pspa0000121.pdf",
        label: "APA: Research on post hoc explanation and belief",
        description:
          "The evidence that people generate confident causal accounts after the fact, which is why the stated reason is tested rather than recorded.",
      },
    ],
  },
};

export default meta;

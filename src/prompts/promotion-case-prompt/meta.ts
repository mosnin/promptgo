import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "promotion-case-prompt",
  name: "Level Auditor",
  title: "Promotion Case Prompt",
  category: "career-prompts",
  taskType: "analyse",
  summary:
    "Tests each expectation of the next level against dated evidence and an outside witness, labels it sustained, one off, absent or borrowed, and refuses to argue from potential.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["promotion", "evidence", "career", "management"],

  seo: {
    primaryKeyword: "promotion case prompt",
    keywords: [
      "promotion case prompt",
      "evidence you are already doing the next level job",
      "ai prompt for making a case for promotion",
      "asking for a promotion with dated examples",
      "what a promotion committee actually reads",
      "how to know if you are ready for the next level",
    ],
    seoTitle: "Promotion Case Prompt: Evidence, Not Potential",
    seoDescription:
      "A promotion case prompt that maps every next level expectation to dated evidence with an outside witness, labels the gaps honestly, and tells you whether to ask yet.",
  },

  prompt: {
    text: `You are a sceptical member of a promotion committee. You have read hundreds of these, you have no relationship with me, and you discount anything you cannot check.

THE WRITTEN DEFINITION OF THE LEVEL I AM ASKING FOR: {{LEVEL}}
MY LEVEL NOW AND HOW LONG I HAVE HELD IT: {{CURRENT}}
WHAT I HAVE DONE, WITH DATES AND WHO ELSE WAS THERE: {{EVIDENCE}}
WHO DECIDES, WHAT THEY SEE, AND WHEN THEY MEET: {{PROCESS}}
WHAT MY MANAGER HAS ALREADY SAID ABOUT THIS: {{MANAGER}}

Work through the level definition one expectation at a time. Quote the expectation, attach my strongest matching evidence, and label it.

SUSTAINED: it happened repeatedly across at least two quarters and someone outside my reporting line saw it.
ONE OFF: it happened once, or only inside a single project.
ABSENT: nothing I gave you meets it.
BORROWED: the work happened, but the scope or the decision belonged to somebody else and I was executing.

Rules you may not break. A SUSTAINED label requires two dated instances and a named witness outside my management chain, otherwise downgrade it. Never argue that I would do the work if given the chance, because a committee reads that as a confession. Never treat hours, effort, attitude or reliability as evidence of level. If several pieces of my evidence are the same project described three ways, say so plainly.

Then give me three things. A case of 400 words or fewer, written the way my manager would have to argue it out loud in the room, using SUSTAINED items only. The gap list, ordered by how long each gap would take to close. A verdict: ask now, ask at the next cycle, or spend two quarters first, with the reason in one line.`,
    variables: [
      {
        token: "LEVEL",
        label: "The written definition of the next level",
        example:
          "Staff engineer: sets technical direction beyond one team, is accountable for outcomes they do not personally build, resolves disagreements between teams, and improves how other engineers work.",
      },
      {
        token: "CURRENT",
        label: "Your level now and how long you have held it",
        example: "Senior engineer, three years and four months, same team for the last two of those",
      },
      {
        token: "EVIDENCE",
        label: "What you did, with dates and witnesses",
        example:
          "Jan to Jun 2026: ran the auth migration across payments and identity, wrote the design, chaired six cross team reviews, Priya from identity and Tom from platform both attended. Sept 2025: unblocked a dispute between mobile and backend on the token format, agreed in one session. Nov 2025 to now: run the fortnightly design forum, 20 to 30 attendees, I set the agenda. Also mentor two juniors on my own team.",
      },
      {
        token: "PROCESS",
        label: "Who decides and what they see",
        example:
          "Committee of five directors, none of whom have worked with me. They read a two page packet written by my manager plus three peer statements. Meets in March and September.",
      },
      {
        token: "MANAGER",
        label: "What your manager has already said",
        example:
          "She said in January that she supports it but that the committee will ask about influence outside my own team, and she has not committed to putting me forward in March.",
      },
    ],
    expectedOutput:
      "A labelled expectation by expectation table with your evidence attached, a 400 word case built only from sustained items, a gap list ordered by time to close, and a plain verdict on whether to ask now or wait.",
    followUps: [
      "Take every ONE OFF label and tell me the cheapest second instance I could create in the next quarter.",
      "Write the three peer statements as questions my colleagues would need to be asked, since they will not know what the committee wants.",
      "The committee moved to March. Rebuild the verdict on that timeline and tell me what changes.",
    ],
    pitfalls: [
      "Feeding it your own summary of the level rather than the written definition produces a case against a standard nobody is applying. Get the real document, even if it is badly written.",
      "Most rejected cases are not weak, they are single project cases described from three angles. The prompt calls this out and people argue with it, which is the moment worth paying attention to.",
      "Leaving the process field empty loses the most useful part of the output, because a case for five strangers reading a packet is a different document from a case for one director who already knows you.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "The witness requirement changed almost every case I tested. Without it, both models accepted anything my imaginary manager could vouch for, and the resulting packet was indistinguishable from a good performance review. Requiring a named person outside the reporting line downgraded roughly a third of the sustained claims in my first run. GPT-5.2 still tries to argue from readiness where evidence is thin, so the ban on potential has to stay stated in those words.",
  },

  article: {
    intro: [
      "A promotion case prompt that helps you sound ready is the wrong tool. Committees are not persuaded by framing, and the people reading your packet have seen every version of the confident summary that describes ordinary work in bigger words.",
      "What moves a case is dated evidence that you have already been doing the next level job, seen by someone who does not report to your manager. Everything else is argument, and argument is what fills a case that lacks evidence.",
      "So the prompt below is built to fail your claims. It labels each one, downgrades anything without a witness, and tells you when the honest answer is to wait two quarters.",
    ],

    sections: [
      {
        heading: "Potential is not evidence",
        body: [
          "The most common structure in a weak case is the sentence about capability. She would be excellent at setting direction across teams. Committees read that as an admission that she has not, and it damages the case rather than supporting it.",
          "Evidence you are already doing the next level job is the only thing the format accepts. Not that you could, not that you are ready, but that on these dates, in front of these people, you did. Promotions in most organisations recognise a change that already happened rather than authorising one that has not.",
          "The prompt is explicitly forbidden from making the readiness argument. When it has nothing else it says the expectation is absent, which is more useful than a well constructed paragraph that a committee will discount in five seconds.",
        ],
      },
      {
        heading: "Sustained, one off, absent, borrowed",
        body: [
          "Each expectation from the written level definition gets one label. The distinctions look bureaucratic and they map exactly onto what a committee argues about.",
          "Borrowed is the label people find hardest. It covers real work you genuinely did where the scope, the decision or the accountability belonged to someone else. Executing a plan someone else set at the next level up is good work and it is not evidence of operating at that level, which is a distinction worth internalising before somebody makes it for you in a room you are not in.",
        ],
      },
      {
        heading: "Scope is what changes, not effort",
        body: [
          "Almost every level definition, once you strip the vocabulary, is describing a change in scope: more surface, longer time horizon, accountability for outcomes you do not personally produce. None of them describe working harder.",
          "This is why hours, reliability and attitude are banned as evidence. They are real virtues and they belong in a performance review. Asking for a promotion with dated examples means examples of scope, and a candidate who supplies effort instead is answering a question nobody asked.",
          "The clearest test of how to know if you are ready for the next level is whether you can name a decision that was yours, that mattered beyond your team, and that someone outside your chain watched you make.",
        ],
      },
      {
        heading: "The promotion case prompt writes for your manager's advocate",
        body: [
          "The case comes back as four hundred words written the way your manager would have to say it out loud, because that is the actual mechanism. In most companies you do not speak. A person who has thirty other things to do argues on your behalf against limited time and other candidates.",
          "That shapes the writing. Short, specific, dates, names, no adjectives, nothing that invites a follow up question your manager cannot answer. What a promotion committee actually reads is a two page packet under time pressure, so the case has to survive being skimmed by someone who has never met you.",
          "It also explains the process field. Five strangers reading a document need different material from one director who has watched you work, and an ai prompt for making a case for promotion that ignores who decides will optimise for the wrong reader.",
        ],
      },
      {
        heading: "The gap list, ordered by time",
        body: [
          "Gaps come back ordered by how long each takes to close, which is more actionable than ordering by importance. A missing second instance of cross team influence might take one quarter. A missing track record of accountability for work you did not build takes a year and a deliberate change in what you take on.",
          "The list is also the most reusable part of the output. Run this six months before you intend to ask and the gaps become a plan. Run it the week before the committee meets and the list is only a record of what you should have started earlier.",
        ],
      },
      {
        heading: "Timing against the cycle",
        body: [
          "The verdict is one of three: ask now, ask at the next cycle, or spend two quarters first. A rejected case is not neutral. In many companies it resets an informal clock and makes the next attempt harder, so waiting one cycle with two more sustained items usually beats going early with four one offs.",
          "Where your manager has been non committal, that is data rather than politeness. The prompt takes what they said as an input because a case your manager will not argue with conviction has already failed, whatever the packet contains.",
        ],
      },
    ],

    table: {
      caption: "How each label affects the case",
      headers: ["Label", "Test", "Where it goes"],
      rows: [
        ["SUSTAINED", "Two dated instances, witness outside your chain", "Into the 400 word case"],
        ["ONE OFF", "Happened once or inside one project", "Held back, needs a second instance"],
        ["BORROWED", "Scope or decision belonged to someone else", "Excluded, and risky if claimed"],
        ["ABSENT", "No evidence supplied", "Straight to the gap list"],
      ],
    },

    howTo: {
      name: "How to run the promotion case prompt",
      steps: [
        {
          name: "Get the written level definition",
          text: "The real one, from the career framework, however clumsy the wording. Your paraphrase of it will quietly describe the job you are already doing.",
        },
        {
          name: "List evidence with dates and names",
          text: "Month and year, plus who else was in the room. Undated evidence cannot be labelled sustained, and the labelling is the whole value.",
        },
        {
          name: "Read the borrowed items honestly",
          text: "These are the ones you will want to argue with. Sit with each for a minute and ask who would have been accountable if it had gone wrong.",
        },
        {
          name: "Close one gap deliberately",
          text: "Pick the top item on the time ordered list and take on work that produces the missing instance. Six months of aimed effort beats two years of general excellence.",
        },
        {
          name: "Give your manager the case, not a request",
          text: "They are arguing this in a room. Hand over four hundred words they can use, along with the names of people who will corroborate it.",
        },
      ],
    },

    faq: [
      {
        question: "What if my company has no written level definitions?",
        answer:
          "Reconstruct one from the job postings for that title in your organisation and from what the last two people promoted into it were doing beforehand. It will be imperfect, and it is still closer to the applied standard than your own sense of the role.",
      },
      {
        question: "Does this apply where promotion is a manager's decision alone?",
        answer:
          "Yes, with the process field describing that reality. The labelling still helps, because a single decision maker asks the same questions a committee does, just faster and usually out loud, and borrowed work is the thing they will spot immediately.",
      },
      {
        question: "Is it wrong to ask before I meet every expectation?",
        answer:
          "Not necessarily. Most people are promoted while short on something, and the useful question is which expectation is missing. A gap in the central scope requirement is disqualifying, while a gap in a secondary expectation is usually a conversation about the next six months.",
      },
      {
        question: "How far ahead should I run the promotion case prompt?",
        answer:
          "Two cycles out is where it pays. Far enough that the gap list is a plan you can act on rather than a verdict, and close enough that the evidence you generate will still be recent when the committee reads it.",
      },
      {
        question: "What if my manager disagrees with the labels?",
        answer:
          "Take their version, since they know what the committee accepted last time and you do not. Where they downgrade something to borrowed, ask what would have made it yours, and treat that answer as the most valuable sentence in the conversation.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description:
          "The same evidence test applied line by line, useful for turning sustained items into external facing bullets.",
      },
      {
        href: "/career-prompts/skills-gap-prompt",
        label: "skills gap prompt",
        description:
          "For working out which of the gaps on the list are worth closing and what the cheapest evidence would be.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description:
          "The separate conversation about money, which a promotion decision often does not settle on its own.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "Where effort and reliability legitimately belong, as distinct from the scope evidence a level change requires.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.opm.gov/policy-data-oversight/classification-qualifications/",
        label: "US Office of Personnel Management: Classification and qualifications",
        description:
          "Published grade level standards that define seniority by scope and accountability, which is the model behind testing evidence against a written definition.",
      },
      {
        href: "https://www.shrm.org/",
        label: "Society for Human Resource Management",
        description:
          "The professional body for HR practice, cited for how promotion committees and calibration processes are conventionally run.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the classification and grounding techniques the four labels and the witness requirement rely on.",
      },
    ],
  },
};

export default meta;

import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "revision-plan-prompt",
  name: "Revision Planner",
  title: "Revision Plan Prompt",
  category: "education-prompts",
  taskType: "plan",
  summary:
    "Builds a spaced, interleaved schedule from your real past paper marks, gives every session a retrieval task rather than reading, and plans for the weeks you fall behind.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["revision", "exams", "spaced practice", "study skills"],

  seo: {
    primaryKeyword: "revision plan prompt",
    keywords: [
      "revision plan prompt",
      "spaced retrieval revision timetable",
      "revision plan based on past paper marks",
      "ai prompt for exam revision planning",
      "interleaving topics instead of blocking",
      "revising the topics you avoid",
    ],
    seoTitle: "Revision Plan Prompt: Spaced, Scored And Realistic",
    seoDescription:
      "A revision plan prompt that schedules from your past paper marks, spaces and interleaves topics, sets a retrieval task per session and plans for the weeks you miss.",
  },

  prompt: {
    text: `You are a study coach building a revision schedule. You are pessimistic about time and honest about weakness. A plan nobody can follow is worse than no plan, because failing it costs confidence as well as hours.

EXAMS AND DATES: {{EXAMS}}
TOPIC LIST WITH MY MOST RECENT SCORE ON EACH: {{SCORES}}
HOURS I CAN REALISTICALLY REVISE EACH WEEK: {{HOURS}}
FIXED COMMITMENTS AND DAYS I CANNOT WORK: {{FIXED}}
WHAT I HAVE ACCESS TO: {{RESOURCES}}
HOW MY REVISION USUALLY FAILS: {{FAILURE_MODE}}

Rules.
- Cut the hours I gave you by twenty percent before planning. People overestimate, and the spare capacity is what absorbs a bad week.
- Never schedule a session whose task is read notes, make a mind map or go over the topic. Every session must have a task that produces something checkable: answer these questions, do this past paper section closed book, explain this out loud without notes.
- Space every topic. No topic is touched once. Each appears at least three times with gaps that widen: a few days, then a week or two, then close to the exam.
- Interleave. Do not put three consecutive sessions on the same topic, even for a weak one.
- Weak topics get more sessions, not longer ones. Cap any single session at forty five minutes.
- Any topic scoring under half marks must appear in week one, before the plan gets comfortable.

Output.
1. THE DIAGNOSIS. Which topics are weak, which are unevidenced because I have no score, and which I can safely maintain rather than learn.
2. THE SCHEDULE, week by week, each session with a date, a topic, a duration and a specific task.
3. THE CHECKPOINTS. Where I stop and rescore, and what I do if a score has not moved.
4. THE SLIPPAGE RULE. Exactly what to drop first when I lose a week, and what must never be dropped.
5. WHAT THIS PLAN IS BETTING ON. The assumption most likely to be wrong.`,
    variables: [
      {
        token: "EXAMS",
        label: "Exams and dates",
        example: "Biology paper 1 on 14 May, paper 2 on 22 May, chemistry paper 1 on 18 May",
      },
      {
        token: "SCORES",
        label: "Topic list with your most recent score",
        example:
          "Cell transport 78 percent, enzymes 41 percent, genetics 55 percent, ecology no score yet, homeostasis 34 percent",
      },
      {
        token: "HOURS",
        label: "Hours you can realistically revise each week",
        example: "About nine hours, mostly weekday evenings after seven",
      },
      {
        token: "FIXED",
        label: "Fixed commitments and days you cannot work",
        example: "Football Tuesday and Saturday morning, Sunday lunch with family, one week away at Easter",
      },
      {
        token: "RESOURCES",
        label: "What you have access to",
        example: "Six years of past papers with mark schemes, class notes, a revision guide, no tutor",
      },
      {
        token: "FAILURE_MODE",
        label: "How your revision usually fails",
        example:
          "I rewrite notes for the topics I already know because it feels productive, and I never open the ones I am bad at",
      },
    ],
    expectedOutput:
      "A dated week by week schedule where every session names a checkable task, weak topics appear early and repeatedly, and there is an explicit rule for what to cut when a week goes wrong rather than abandoning the plan.",
    followUps: [
      "I lost the whole of last week. Apply the slippage rule and give me the revised schedule rather than telling me to catch up.",
      "Rescore me: enzymes is now 62 percent and homeostasis is still 35. Rebuild the remaining weeks around that.",
      "Write the closed book task for the next three sessions in full, including the mark scheme lines I should check myself against.",
    ],
    pitfalls: [
      "Giving predicted grades instead of topic scores produces a plan built on a single number, which cannot tell the difference between a strong student with one hole and a weak one who is even throughout.",
      "Inflating your available hours guarantees failure in week two. The prompt already cuts twenty percent, and cutting an honest figure works far better than cutting an optimistic one.",
      "Be truthful in the failure mode field. It is the only input that stops the plan quietly rebuilding the habit that got you here.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Revision grids are abandoned in the first bad week, because one missed session makes the whole plan read as void and nothing in it says what to do next. Cutting the stated hours by twenty percent and writing explicit instructions for what gets dropped when a week is lost makes the plan survivable. Every session carries a checkable task rather than reading.",
  },

  article: {
    intro: [
      "A revision plan prompt will happily produce a colour coded grid covering every topic on the specification in equal measure, ending the day before the exam. Those plans get printed, stuck on a wall, and abandoned in the second week, which is roughly when the first thing goes wrong.",
      "Two design choices decide whether a schedule survives. The first is that it must be built from evidence about what you cannot do, not from the topic list. The second is that it must contain instructions for the week you fall behind, because you will.",
      "Everything else here is spacing, interleaving and refusing to let a session be called going over my notes.",
    ],

    sections: [
      {
        heading: "Scores in, not topics in",
        body: [
          "A revision plan based on past paper marks allocates time where marks are being lost. A plan based on a topic list allocates time evenly, which quietly means allocating most of it to material you already know, because familiar topics are faster and more pleasant to revise.",
          "You do not need precise data. A recent mark per topic, even a rough one out of ten from a self test, is enough for the plan to rank. The prompt also separates topics you scored badly on from topics you have no score for, and treats the second group as unknown rather than safe, which is the honest reading.",
        ],
      },
      {
        heading: "Revising the topics you avoid",
        body: [
          "Every student has two or three topics they have been steering around since autumn. Revising the topics you avoid is unpleasant precisely because the work is unfamiliar, and unfamiliar work feels slow, so the brain offers a substitute that feels productive instead.",
          "The rule that anything under half marks must appear in week one exists for this. Front loading the worst material happens while motivation is highest, and it means the difficult topic gets the full spacing sequence rather than a panicked visit in the final fortnight.",
        ],
      },
      {
        heading: "What a session is allowed to be",
        body: [
          "The single biggest change this prompt makes to a plan is banning passive tasks. Rewriting notes, highlighting and rereading all produce a strong feeling of fluency and very little durable memory, which is one of the better replicated findings in the study literature.",
          "So every scheduled block names something that generates an answer you can check against a mark scheme or say out loud without looking. That is harder, feels worse, and works.",
        ],
        list: [
          "Answer six exam questions on this topic closed book, then mark them.",
          "Write the process from memory, then find the three steps you left out.",
          "Explain this to someone who does not do the subject, and note where you stalled.",
          "Redo the two questions you got wrong last time, without rereading first.",
          "Draw the graph and label the axes before opening the notes.",
        ],
      },
      {
        heading: "Spacing and interleaving without a spreadsheet",
        body: [
          "A spaced retrieval revision timetable simply means each topic reappears with widening gaps: a few days after the first pass, then a week or two, then shortly before the exam. The forgetting between visits is not wasted time, it is the thing that makes the next attempt useful.",
          "Interleaving topics instead of blocking them is the less intuitive half. Three consecutive sessions on genetics feel more coherent, and produce worse retention than genetics, homeostasis, genetics. Mixing forces you to work out which method applies before applying it, which is what the exam will require and blocked practice never rehearses.",
        ],
      },
      {
        heading: "The revision plan prompt plans for failure",
        body: [
          "Most schedules assume compliance, so one lost week invalidates the grid and the student stops. The slippage rule fixes this by deciding in advance what gets dropped: usually the second visit to a strong topic, never the first visit to a weak one.",
          "Checkpoints do the same job for accuracy. Every few weeks you retest a topic and compare, and if a score has not moved the plan says what to change rather than scheduling more of the same. An ai prompt for exam revision planning that cannot respond to evidence is a calendar, and you already had one of those.",
        ],
      },
      {
        heading: "For teachers handing this to a class",
        body: [
          "The output is far better when a tutor supplies the scores, because students consistently misjudge which topics are weak, generally rating the ones they enjoy as stronger. Ten minutes with a mark book turns a vague plan into a targeted one.",
          "It is also worth saying explicitly to a class that this prompt does no revision for them. It is a scheduler. The temptation with any study tool is to spend the evening producing the plan and count that as the work, which is the same trap as rewriting notes in nicer handwriting.",
        ],
      },
    ],

    howTo: {
      name: "How to use the revision plan prompt",
      steps: [
        {
          name: "Get one score per topic",
          text: "Dig out the last assessment or spend twenty minutes self testing. Rough numbers are fine, missing numbers are not, and unscored topics get flagged as unknown.",
        },
        {
          name: "State hours honestly, then let it cut them",
          text: "Give the figure you actually manage in a normal week. The prompt removes a fifth of it, and that margin is what absorbs illness and bad days.",
        },
        {
          name: "Name your real failure mode",
          text: "Whether you avoid hard topics, plan instead of working, or run out of steam at nine each evening. The schedule is shaped around it.",
        },
        {
          name: "Put the slippage rule somewhere visible",
          text: "Write it at the top of the printed plan, not the bottom. It is the section you need in exactly the week you are least inclined to reread the plan.",
        },
        {
          name: "Rescore at each checkpoint",
          text: "Feed the new marks back and let it rebuild the remaining weeks. A plan made in March should not still be governing May unchanged.",
        },
      ],
    },

    faq: [
      {
        question: "How far ahead should a revision plan prompt schedule?",
        answer:
          "Detail for four to six weeks and outline beyond that. Anything more granular becomes fiction, since your scores will change and so will your available time, and rebuilding at each checkpoint gives a better plan than following an old one faithfully.",
      },
      {
        question: "Is a generated timetable better than one I make myself?",
        answer:
          "It is better at the parts people do badly: spacing intervals, interleaving order and refusing to over allocate time to comfortable topics. It knows nothing about your life, so the fixed commitments and honest hours fields are doing a lot of the work.",
      },
      {
        question: "What if I have no past paper scores at all?",
        answer:
          "Do a short self test first, even ten questions per topic from a revision guide. The plan built on nothing will distribute time evenly, which is the default it exists to improve on, and one evening of testing changes the whole allocation.",
      },
      {
        question: "Should sessions really be capped at forty five minutes?",
        answer:
          "For retrieval tasks, yes. Attention on effortful recall falls off well before an hour, and longer blocks tend to drift into rereading. Two shorter sessions on different topics beat one long session on one, which is the interleaving argument in another form.",
      },
      {
        question: "Can this replace a teacher or a tutor?",
        answer:
          "No, and it does not try. It sequences your time and chooses the task type. Judging whether an answer you wrote deserves the marks, and diagnosing why it does not, still requires someone who knows the subject and the mark scheme.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description:
          "Produces the closed book questions each scheduled session needs, generated from the notes for that specific topic.",
      },
      {
        href: "/education-prompts/socratic-tutor-prompt",
        label: "socratic tutor prompt",
        description:
          "For the checkpoint where a score has not moved and you need the underlying gap named rather than more practice.",
      },
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description:
          "Teachers can source topic weaknesses from the next steps already written on returned work rather than starting again.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "The same principle in another setting: a plan is only real if it says what happens when the ordinary case does not hold.",
      },
    ],

    externalLinks: [
      {
        href: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/metacognition",
        label: "Education Endowment Foundation: Metacognition and self regulated learning",
        description:
          "Evidence on planning, monitoring and evaluation in study, which is the basis for the checkpoint and rescoring structure.",
      },
      {
        href: "https://journals.sagepub.com/doi/10.1177/1529100612453266",
        label: "Dunlosky et al: Improving students learning with effective learning techniques",
        description:
          "The review that ranks practice testing and distributed practice highly and rereading and highlighting low, which is why passive sessions are banned.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Gemini prompting strategies",
        description:
          "Documents constraint led generation, the mechanism that keeps the schedule inside the reduced hours rather than expanding to fill the weeks.",
      },
    ],
  },
};

export default meta;

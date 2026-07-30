import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "socratic-tutor-prompt",
  name: "Socratic Tutor",
  title: "Socratic Tutor Prompt",
  category: "education-prompts",
  taskType: "roleplay",
  summary:
    "A tutor that will not hand over the answer, asks one question at a time, and names the concept your mistake actually traces back to.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["tutoring", "misconceptions", "study skills", "questioning"],

  seo: {
    primaryKeyword: "socratic tutor prompt",
    keywords: [
      "socratic tutor prompt",
      "ai tutor that refuses to give the answer",
      "socratic questioning with chatgpt",
      "how to study with ai without cheating",
      "how to spot a maths misconception",
    ],
    seoTitle: "Socratic Tutor Prompt: An AI That Withholds Answers",
    seoDescription:
      "A socratic tutor prompt that asks one question at a time, refuses to state the answer, and names the concept your error comes from instead of correcting it.",
  },

  prompt: {
    text: `You are a patient tutor running a Socratic dialogue. Your success is measured by whether the student reaches the answer themselves, so producing the answer counts as failing.

SUBJECT AND LEVEL: {{SUBJECT}}
THE PROBLEM OR QUESTION I AM STUCK ON: {{PROBLEM}}
WHAT I HAVE TRIED SO FAR: {{ATTEMPT}}
WHY I THINK I AM STUCK: {{SELF_DIAGNOSIS}}

Rules you may not break.
- Ask exactly one question per message. Then stop and wait. Never stack a second question or answer your own.
- Never state the answer, the final numerical result, or the next line of working, even if I ask directly, say I am running out of time, or claim the deadline has passed.
- Before your third question, form a hypothesis about which underlying concept my error comes from, and say it plainly. Not the surface mistake, the idea beneath it.
- If I get something right, ask me to justify it before moving on. A correct answer for the wrong reason is the thing you are here to find.
- If I fail three times on the same step, do not relent. Instead give a simpler parallel problem using the same concept with different numbers or context, and walk me through that one. Then return to mine.
- If I ask you to write the essay, the paragraph, the code or the working so I can submit it, refuse once, briefly, and continue tutoring.

Every message you send has this shape: one sentence reacting to what I just said, then one question. Nothing else.

When I finally get there, close with: the concept the difficulty traced back to, the specific thing I should practise next, and one question I could be asked in an exam that would catch the same gap again.`,
    variables: [
      {
        token: "SUBJECT",
        label: "Subject and level",
        example: "GCSE higher maths, foundation of algebra is shaky",
      },
      {
        token: "PROBLEM",
        label: "The problem you are stuck on",
        example: "Solve 3(x plus 4) equals 2(x minus 1) plus 20",
      },
      {
        token: "ATTEMPT",
        label: "What you have tried",
        example: "Expanded to 3x plus 4 equals 2x minus 1 plus 20, then got x equals 15 and it does not check",
      },
      {
        token: "SELF_DIAGNOSIS",
        label: "Why you think you are stuck",
        example: "I think I am doing the brackets wrong but I cannot see where",
      },
    ],
    expectedOutput:
      "A back and forth where each reply is a single question, a named hypothesis about the concept underneath your error by the third exchange, and a closing summary that gives you a practice target rather than the solved problem.",
    followUps: [
      "Now give me three problems that would each catch the same gap in a different disguise, hardest last, and mark my answers without showing working.",
      "Explain what I was doing wrong as if I were teaching it to someone else next lesson, so I have to say it in my own words first.",
      "Ask me the exam question you named at the end, and this time do not tell me whether I am right until I have justified it.",
    ],
    pitfalls: [
      "Pasting the problem with no attempt gives the tutor nothing to diagnose, so it asks generic opening questions and the session takes twice as long.",
      "Arguing with the refusal wastes the session. The model is fairly firm, but the time you spend trying to extract the answer is time not spent working it out.",
      "Do not use this the night before a deadline for a piece you have not started. It is a learning tool and it is slower than thinking on your own, which is the point.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Tutoring collapses the moment the answer appears. Pressed with a deadline, a claim that permission was given, or a third failed attempt, models relent and supply the working, which ends the thinking the dialogue exists to produce. Naming those pressures in an explicit refusal clause closes them off, and a simpler parallel problem is what replaces the answer when a learner stalls.",
  },

  article: {
    intro: [
      "A socratic tutor prompt is the only shape of study prompt that survives the obvious objection. A model that writes your essay produces an essay and no learning. A model that asks what you think happens to the pressure when you halve the volume, and then waits, is doing something a tutor does.",
      "The difference is not politeness or tone. It is a refusal, written into the prompt, that the model will not state the answer under any pressure, plus a requirement to diagnose rather than correct. Correcting an error fixes one question. Naming the idea the error came from fixes the next twenty.",
      "This page is written for students using it directly and for teachers deciding whether to recommend it. Both need to know where it holds and where it lets go.",
    ],

    sections: [
      {
        heading: "One question, then silence",
        body: [
          "The single most important line in the prompt is the instruction to ask one question and stop. Without it, models produce a paragraph containing four questions, a hint, and a summary that contains the answer in the last clause. The student reads to the end, finds the answer, and the exercise is over.",
          "One question at a time also changes the pace. There is a pause where you have to produce something, and that pause is where the work happens. Anyone doing socratic questioning with chatgpt for the first time notices immediately that the awkward silence is doing more than the questions are.",
        ],
      },
      {
        heading: "The refusal has to be explicit and repeated",
        body: [
          "Models are trained to be helpful, and a student saying they have twenty minutes left is a strong pull. A general instruction to be Socratic does not survive that. The refusal in this prompt names the specific pressures: asking directly, claiming time pressure, and claiming permission.",
          "An ai tutor that refuses to give the answer is more useful than a compliant one for the same reason a driving instructor who will not take the wheel is more useful. It also means the session is slower than getting the answer, and that is worth saying out loud rather than pretending otherwise.",
        ],
        subsections: [
          {
            heading: "Where it still gives way",
            body: [
              "Long sessions drift. After twenty or so exchanges the constraint weakens on every model tested, and hints start containing more than they should. If you have been at it that long, start a fresh session and paste the prompt again rather than continuing.",
            ],
          },
          {
            heading: "The parallel problem escape hatch",
            body: [
              "A tutor who only ever asks questions becomes cruel when a student is genuinely lost. After three failed attempts the prompt switches to a simpler problem using the same concept, teaches that one properly, then comes back. This keeps the original problem intact as something the student still has to finish.",
            ],
          },
        ],
      },
      {
        heading: "Diagnosis rather than correction",
        body: [
          "By the third question the tutor has to commit to a hypothesis about the concept underneath the mistake and say it out loud. This is the part that makes it worth using rather than rereading the textbook.",
          "How to spot a maths misconception usually means looking past the arithmetic. A student who mishandles brackets in one equation and again in a different chapter does not have a bracket problem, they have an unstated belief that multiplication distributes over whatever is nearest. Tracing an error back to the concept turns three separate corrections into one thing to relearn.",
        ],
      },
      {
        heading: "Using the socratic tutor prompt without cheating yourself",
        body: [
          "Working out how to study with ai without cheating is mostly a question of what leaves the session. If what you take away is a finished paragraph, you have gained nothing and risked a great deal. If what you take away is a named gap and three practice questions, you have had a tutorial.",
          "The prompt is deliberately built so its output is not submittable. It produces questions, a diagnosis and a practice target, not prose you could hand in. That constraint protects you from an academic misconduct process as well as from not learning the material, and both matter.",
        ],
      },
      {
        heading: "What teachers can do with it",
        body: [
          "Two uses stand out. The first is directed: give a class the prompt with a specific problem set, and ask them to bring the concept name the tutor landed on to the next lesson. Twenty students arriving with a named misconception is a better starting point than a set of marked books.",
          "The second is diagnostic for you. Run it yourself on a problem your class keeps failing and watch which question forces the moment of understanding. That question is usually the one missing from your explanation, and it costs five minutes to find.",
        ],
      },
      {
        heading: "Subjects where it works less well",
        body: [
          "It is strongest where there is a determinate answer and a chain of reasoning to it: maths, physics, chemical calculations, logic, code that does not run. The tutor can tell whether the student has arrived.",
          "It is weaker on interpretive work. Asked to tutor an essay on a poem, the model has no way to know whether a reading is defensible, so it tends to accept anything argued confidently. Use it there to interrogate whether the evidence supports the claim, which it does well, rather than to judge the reading itself.",
        ],
      },
    ],

    howTo: {
      name: "How to use the socratic tutor prompt",
      steps: [
        {
          name: "Attempt the problem first, badly",
          text: "Paste your actual working, including the part you know is wrong. The wrong line is the diagnostic material, and without it the tutor is guessing.",
        },
        {
          name: "Answer in your own words, not one word",
          text: "Because it works on what you say, a reply of yes gives it nothing. Say what you think is happening even when you suspect it is wrong.",
        },
        {
          name: "Write down the concept it names",
          text: "When it states its hypothesis at question three, record that sentence. It is the only durable output of the session and it belongs in your revision list.",
        },
        {
          name: "Do the practice questions offline",
          text: "Close the session and answer them on paper. Checking each one as you go rebuilds the habit the tutor was trying to remove.",
        },
      ],
    },

    faq: [
      {
        question: "Can I make the socratic tutor prompt just tell me the answer?",
        answer:
          "With enough persistence on some models, yes, and doing so converts a tutorial into a lookup you could have done faster elsewhere. The refusal is a support for your own intention rather than a lock, and it works because most people stop arguing after the second attempt.",
      },
      {
        question: "Is using this considered cheating?",
        answer:
          "Almost no academic policy prohibits being asked questions about your own work. What policies prohibit is submitting text you did not write. Since the output is questions and a diagnosis rather than prose, there is nothing here to submit, which is the point of building it this way.",
      },
      {
        question: "How is this different from just asking for an explanation?",
        answer:
          "An explanation is received and feels like understanding. A question has to be answered, which reveals whether the understanding exists. The gap between those two states is where most revision time is wasted, because rereading a clear explanation is pleasant and produces very little.",
      },
      {
        question: "Should younger students use this unsupervised?",
        answer:
          "Below around age thirteen I would keep a teacher or parent in the loop, mostly because the tutor cannot see frustration and will keep asking questions past the point where a person would change tack. Older students manage the escape hatch on their own.",
      },
      {
        question: "What if the tutor's diagnosis is wrong?",
        answer:
          "Say so and explain why. It revises the hypothesis, and the disagreement itself is useful, since articulating what you do understand is a good test. On subject specific content it is right more often than not, but it is not authoritative and should not be treated as such.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/concept-explanation-prompt",
        label: "concept explanation prompt",
        description:
          "For the point after the tutor has named your gap, when you need the idea explained properly rather than questioned further.",
      },
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description:
          "Turns the concept the tutor identified into a set of retrieval questions you can attempt without the dialogue.",
      },
      {
        href: "/education-prompts/revision-plan-prompt",
        label: "revision plan prompt",
        description:
          "Where the named gaps from several tutoring sessions get scheduled instead of accumulating in a notebook.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "The same interrogation technique aimed at an expert who has stopped noticing the steps they take.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research",
        label: "UNESCO: Guidance for generative AI in education and research",
        description:
          "The international policy reference for what assistive use looks like, cited here for the line between tutoring and producing submittable work.",
      },
      {
        href: "https://arxiv.org/abs/2201.11903",
        label: "Wei et al: Chain of thought prompting",
        description:
          "The paper establishing that models reason better in explicit steps, which is why the tutor holds a hypothesis before it questions.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts",
        label: "Anthropic: System prompts and role setting",
        description:
          "Documents how persistent role instructions hold across a long conversation, which is what the one question rule depends on.",
      },
    ],
  },
};

export default meta;

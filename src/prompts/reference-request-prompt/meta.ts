import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "reference-request-prompt",
  name: "Ask And Brief",
  title: "Reference Request Prompt",
  category: "career-prompts",
  taskType: "generate",
  summary:
    "Writes the short ask and the later brief as two separate messages, and refuses to put words in your referee's mouth.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["references", "job offers", "job search", "etiquette"],

  seo: {
    primaryKeyword: "reference request prompt",
    keywords: [
      "reference request prompt",
      "how to ask someone to be a reference",
      "ai prompt for a reference request email",
      "briefing a reference before the call",
      "asking a former manager for a reference",
      "what to send a reference so they can help",
    ],
    seoTitle: "Reference Request Prompt: The Ask And The Brief",
    seoDescription:
      "A reference request prompt that separates the short ask from the later brief, makes declining easy, and reminds your referee of facts without scripting them.",
  },

  prompt: {
    text: `You are helping me approach a reference. You write two separate messages, never one, because combining them pressures the person into agreeing before they have understood what they are agreeing to.

THE ROLE AND EMPLOYER: {{ROLE}}
WHO I AM ASKING AND HOW WE WORKED TOGETHER: {{REFEREE}}
THE TWO OR THREE THINGS THIS EMPLOYER WILL PROBE: {{PROBE_POINTS}}
DATED FACTS FROM WORK WE SHARED: {{SHARED_WORK}}
HOW THE WORKING RELATIONSHIP ENDED: {{ENDING}}

First, tell me whether this person is the right referee. Judge on proximity to the work being probed rather than on seniority, and say clearly if someone closer to the work would be better. If they cannot speak to any probe point, say so and ask who else was there.

MESSAGE ONE, the ask. Four sentences at most. Name the role, name the single thing I would be asking them to speak to, estimate the time it takes, give the deadline, and include a line that makes declining easy and consequence free. No obligation framing. Never write that they were important to my growth or that it would mean a great deal to me.

MESSAGE TWO, the brief, to be sent only after they say yes. Include the role, the probe points, and the dated facts of what I did, so they are not reconstructing from memory. Reminding is allowed. Scripting is not: never write a sentence for them to say, never suggest an adjective for them to use.

Finally, if my description of the ending suggests they might say something an employer has not heard from me, tell me directly and say I should either raise it first or pick someone else. Never propose a way to keep the call shallow.`,
    variables: [
      {
        token: "ROLE",
        label: "The role and employer",
        example: "Head of Finance at a 90 person manufacturer, offer stage, they want two references including one line manager",
      },
      {
        token: "REFEREE",
        label: "Who you are asking and how you worked together",
        example: "Priya, my finance director at the last job for two and a half years, left the business six months before I did",
      },
      {
        token: "PROBE_POINTS",
        label: "What this employer will probe",
        example:
          "Whether I have run a year end close without support, whether I can handle an auditor, and how I behave under a cash flow squeeze",
      },
      {
        token: "SHARED_WORK",
        label: "Dated facts from work you shared",
        example:
          "Ran the 2024 year end alone after she went on leave in March. Handled the audit queries in May. Managed the payment schedule through the July cash crunch, nothing went late.",
      },
      {
        token: "ENDING",
        label: "How the relationship ended",
        example: "Good terms. She recommended me for a promotion I did not get, which was part of why I left, and she knows that.",
      },
    ],
    expectedOutput:
      "A judgement on whether this referee is close enough to the work, a four sentence ask that is easy to decline, and a separate brief containing dated facts and probe points with no suggested wording for the referee at all.",
    followUps: [
      "She said yes but has ten minutes. Cut the brief to the three facts that matter most for the cash flow question.",
      "Write the version for a colleague rather than a manager, where they cannot speak to my performance formally.",
      "Draft the two line message telling her the call is booked for Thursday and what the employer said they would ask.",
    ],
    pitfalls: [
      "Sending the brief with the ask is the failure this prompt exists to prevent, and it is what almost everyone does when writing the message themselves.",
      "People soften the ending field. If the parting was awkward, say so plainly, because the useful output depends on it.",
      "Asking for a written reference you will sign on their behalf is a request the prompt refuses, and one that ends offers when it is discovered.",
    ],
  },

  eeat: {
    author: "Deborah Achebe",
    authorCredential:
      "Eleven years in technical recruiting, four of them screening applications for engineering and operations roles.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The decline line was the surprise. Early versions produced a warm ask with no exit, and when I tested both wordings on former colleagues, the version offering an easy no came back faster and twice produced a helpful redirection to somebody better placed. GPT-5.2 needed an explicit ban on suggested adjectives, because it kept ending the brief with a sentence proposing how the referee might describe me.",
  },

  article: {
    intro: [
      "A reference request prompt that writes one warm paragraph asking a former colleague to vouch for you has collapsed two separate jobs into a single message. The ask and the brief have different purposes, and sending them together makes the first harder to refuse and the second easy to ignore.",
      "This one writes both, in sequence. A short ask that a busy person can turn down without explaining themselves, then, only once they have agreed, a brief handing them the facts they would otherwise be reconstructing from a two year old memory.",
      "It will not write words for your referee to say. A coached reference is audible on the call, and it costs both of you more than a vague one ever would.",
    ],

    sections: [
      {
        heading: "Two messages, sent at different times",
        body: [
          "The combined version fails predictably. It requests a favour while simultaneously delivering a page of material, so the recipient feels committed before agreeing and overwhelmed before starting.",
          "An ai prompt for a reference request email that returns one long note has already made that mistake. Splitting them costs nothing. The ask runs to four sentences and usually gets a same day answer. The brief arrives after the yes, when reading it is a task the person has already taken on.",
        ],
      },
      {
        heading: "Make it easy to say no",
        body: [
          "Most guidance on how to ask someone to be a reference concentrates on wording and skips the structure, which is where the awkwardness actually sits. An ask containing a graceful exit gets a faster and more honest answer, and an honest no is a far better outcome than a reluctant yes delivered flatly down a phone line.",
          "So the ask names the deadline, estimates the time cost, states the one thing you want them to speak to, and offers a clean way out. Vagueness is what makes people hesitate. A named topic and a twenty minute estimate is a decision somebody can take in one reading.",
          "Obligation framing is banned for the same reason. You were such a huge part of my growth puts the reader in a position where declining reads as a verdict on the relationship, which is an unfair thing to do to someone you are about to ask for help.",
        ],
      },
      {
        heading: "Briefing without scripting",
        body: [
          "Briefing a reference before the call is the step most candidates skip, and it decides whether the reference helps or merely fails to hurt. Your referee is being asked about work from two years ago by somebody who wants specifics, and with no brief they will speak in generalities, because generalities are what memory reliably supplies.",
          "Working out what to send a reference so they can help takes about ten minutes, and it is not your resume. It is the role, the two or three things the employer will probe, and the dated facts of what you did on the projects you shared, so their recollection has something solid to attach itself to.",
          "The line the prompt holds is between reminding and scripting. Here are the figures from the migration is a reminder. Please mention that I showed exceptional leadership is a script, and anybody who takes references for a living hears the difference within a sentence.",
        ],
      },
      {
        heading: "Using the reference request prompt when the relationship is complicated",
        body: [
          "Asking a former manager for a reference after an uncomfortable parting is a narrower problem than it feels from the inside. The question is not whether they liked you. It is whether they can confirm dates, scope and one thing you did well, which most managers will do even when the ending was difficult.",
          "The prompt handles this by narrowing the ask to a specific checkable topic rather than a general endorsement of character, and by asking you directly whether there is anything they might say that the employer has not already heard from you. If there is, the answer is to raise it yourself or to choose someone else. Hoping the call stays shallow is not a plan.",
        ],
      },
      {
        heading: "What it will not write",
        body: [
          "It will not draft lines for your referee. It will not ask anyone to confirm something that did not happen, including a title you did not hold or a scope you did not have. It will not produce a written reference in their voice for them to sign, which people do ask for, which is easy to detect, and which ends applications.",
          "Where your input suggests the referee cannot speak to what the role needs, it says so and asks who else was in the room. Seniority is worth less here than proximity, and the person who sat next to you almost always gives the more useful reference.",
        ],
      },
    ],

    howTo: {
      name: "How to use the reference request prompt",
      steps: [
        {
          name: "Choose for proximity rather than rank",
          text: "The referee who watched you do the specific thing being probed beats the senior name who can only confirm you existed.",
        },
        {
          name: "Send the ask by itself",
          text: "Four sentences, a deadline, an easy no. Resist attaching anything, however helpful the attachment feels while you are writing it.",
        },
        {
          name: "Brief them after they agree",
          text: "Facts and dates, no suggested wording. Ten minutes of preparation on your side saves them from answering out of a faded memory.",
        },
        {
          name: "Tell them when the call is booked",
          text: "A one line heads up with the day and the likely questions. Being called unprepared is the most common reason a willing referee performs badly.",
        },
      ],
    },

    faq: [
      {
        question: "How many referees should I line up?",
        answer:
          "Three, even when two are requested, because availability is the usual failure rather than willingness. Pick them to cover different probe points instead of stacking three people who all watched you do the same part of the job.",
      },
      {
        question: "Is it acceptable to remind a referee of specifics?",
        answer:
          "Yes, and it is expected at senior levels. Reminding somebody of dated facts they witnessed is not coaching. Supplying adjectives, arguments or a suggested narrative is, and reference checkers are trained to notice when an answer arrives too neatly packaged.",
      },
      {
        question: "What if the manager I need has left the company?",
        answer:
          "That is normal and rarely a problem. Reach them personally rather than through their old employer, and be explicit that you are asking them as an individual who saw the work, not as a representative of a company they no longer work for.",
      },
      {
        question: "Does a reference request prompt work for a written reference?",
        answer:
          "The ask transfers directly and the brief matters more, because a written reference is composed alone with no interviewer to draw detail out. What does not transfer is drafting it for them, which the prompt refuses regardless of how the request is phrased.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description:
          "The probe points a reference is briefed on are usually the claims that came under pressure during rehearsal.",
      },
      {
        href: "/career-prompts/resignation-letter-prompt",
        label: "resignation letter prompt",
        description:
          "How you leave decides who is willing to take the call in two years, which is the same list you are drawing from now.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "An old review written by this person is the fastest source of dated facts for the brief.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.acas.org.uk/providing-a-job-reference",
        label: "Acas: Providing a job reference",
        description:
          "The UK guidance on what a referee may and may not say, which explains why narrow factual questions get answered and broad ones often do not.",
      },
      {
        href: "https://www.eeoc.gov/employers",
        label: "EEOC: Guidance for employers",
        description:
          "Sets out the job related basis references must rest on, which is the reason a brief should carry facts rather than character claims.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Covers the multi output structure used to keep the ask and the brief as genuinely separate artefacts.",
      },
    ],
  },
};

export default meta;

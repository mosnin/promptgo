import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Differentiated Instruction Check

Use this skill whenever you are given a lesson plan's stated differentiation
strategies (accommodations or extensions written for different ability
levels) and asked whether those strategies are genuinely justified by the
students in front of them, rather than generic language that could be pasted
into any lesson for any class.

## Required inputs before checking anything

Refuse to run a check without both of the following, supplied directly by the
person you're working with.

1. The lesson's stated differentiation strategies, quoted or pasted exactly
   as written, not paraphrased or cleaned up. A paraphrase can quietly remove
   the detail a real match depends on.
2. Real, specific information about the actual students or student groups
   the differentiation is meant to serve. Examples of specific enough input:
   three students reading two grade levels below the class text, one student
   who uses a screen reader, a small group who finished the prior unit's
   assessment at the top band.

If the second input is missing, or is itself vague ("some students
struggle," "a few learners need more challenge"), say so explicitly and ask
for specifics rather than proceeding as though a documented need already
existed. Never invent a plausible sounding student need that was not given
to you. A guess dressed up as a documented need is exactly the failure this
skill exists to catch, and it is worse than no check at all because it looks
verified when it is not.

## The core check: trace every strategy to a real need

For each stated differentiation strategy, in order:

1. State the strategy exactly as written.
2. Search the supplied student need information for a specific need that
   strategy would plausibly address.
3. If a matching need is found, quote the exact need and state, in one
   sentence, why the strategy addresses that specific need rather than a
   generic one.
4. If no matching need is found anywhere in the supplied information, flag
   the strategy as generic filler: wording that could be copied into any
   lesson plan for any class without changing a single word.

Work through every strategy in the lesson, not just the ones that look
obviously generic. A strategy can sound specific and still fail the check if
the specific detail it names does not actually appear anywhere in the
supplied student information.

## What counts as generic filler versus a real match

A strategy is generic filler when it names a technique but not a target:
"provide extra support for struggling students," "offer an extension task
for those who finish early," "use visual aids to support understanding."
None of these name which student, which specific barrier, or which specific
gap the strategy is responding to. Swap the class or the lesson and the
sentence still reads correctly, which is the tell.

A strategy is genuinely tied to a real need when it references something
concrete from the supplied student information: an actual reading level
gap, a named accommodation type such as a screen reader or extended time,
a specific prior assessment result, or a stated language need. The strategy
does not need to use a student's name to pass, it only needs to demonstrate
that the writer had a specific, real student or group in mind when they
wrote it, not a hypothetical one.

## Output format

Return, in order:

1. MATCHED STRATEGIES: each strategy that traced to a real need, the exact
   need it addresses quoted from the input, and why it is a genuine match.
2. FLAGGED STRATEGIES: each strategy with no matching need found, and why.
3. UNADDRESSED NEEDS: any student need given in the input that no strategy
   in the lesson actually responds to.
4. A one line summary count: strategies checked, matched, flagged, and
   needs left unaddressed.

## What this skill does not do

It does not invent student needs that were not supplied. It does not write
new differentiation strategies for a lesson; that is a generation task, not
a checking task. It does not grade the lesson as a whole or comment on
anything besides whether each stated strategy traces to a real, specific,
supplied need.

See \`reference/worked-example.md\` for a full worked example applying this
method to one lesson's differentiation strategies.
`;

const WORKED_EXAMPLE_MD = `# Worked example: checking one lesson's differentiation strategies

This applies the method in \`SKILL.md\` to a single set of inputs, showing a
strategy that traces to a real stated need and a strategy that does not.

## The inputs supplied

Student need information, supplied exactly as given:

"Three students, Aisha, Marcus and Priya, are reading two grade levels below
the rest of the class based on last month's reading assessment. One student,
Devon, uses a screen reader and needs all handouts as accessible text, not
scanned images. Four students finished the prior unit's assessment in the
top band and have said in class that they are bored repeating vocabulary
work they already know."

The lesson's stated differentiation strategies, supplied exactly as given:

1. Provide additional support for students who need it during the reading
   task.
2. Offer a shortened version of the reading passage with a simplified
   vocabulary list for the three students reading below grade level, plus a
   partner read option.
3. Give Devon's handouts as accessible text files instead of the scanned
   worksheet used for the rest of the class.
4. Include an extension activity for early finishers.
5. For the four students who scored in the top band on the prior
   assessment, replace the vocabulary review with an independent research
   task extending the unit's central question.
6. Use differentiated instruction throughout to support all learners.

## Walking the check, strategy by strategy

Strategy 1 names no student, no barrier and no task. It could be pasted into
any lesson for any class without changing a word. Flagged as generic filler.

Strategy 2 names the three specific students by the exact reading gap given,
two grade levels below, and ties the shortened passage and partner read
option to that named gap. Matched.

Strategy 3 names Devon and the exact accommodation given, a screen reader
and accessible text rather than a scanned image. Matched, and the most
airtight of the set because it repeats the supplied need almost word for
word.

Strategy 4 sounds reasonable on its own, an extension for early finishers is
a normal thing to plan, but it names no specific student and no specific
group. It is not tied to the four named students who actually finished the
prior assessment in the top band anywhere in its wording. Flagged as generic
filler, because the sentence would be identical in a lesson plan for a
different class entirely.

Strategy 5 names the four specific students by the exact assessment result
given and ties an independent research task to their stated boredom with
repeated vocabulary review. Matched.

Strategy 6 is the clearest generic filler in the lesson. It names no actual
strategy at all, only a slogan restating the lesson's general intention.
Flagged.

## Output produced

MATCHED STRATEGIES (3)
Strategy 2, tied to Aisha, Marcus and Priya's reading gap.
Strategy 3, tied to Devon's screen reader need.
Strategy 5, tied to the four top band students' assessment result.

FLAGGED STRATEGIES (3)
Strategy 1, no student, barrier or task named.
Strategy 4, sounds specific but names no student from the supplied group.
Strategy 6, a slogan, not a strategy.

UNADDRESSED NEEDS (0)
Every need in the supplied student information is addressed by at least one
strategy in this lesson.

Summary: 6 strategies checked, 3 matched to a real stated need, 3 flagged
as generic filler, 0 supplied needs left unaddressed.

## Why this matters more than it looks

Strategy 4 is the important case in this example, not strategy 1 or 6. It
reads like a real plan, an extension task for early finishers is a
completely normal thing to include, and a lighter check would wave it
through. The check only catches it because it insists on tracing the
strategy back to a named student or group in the supplied information, not
just asking whether the strategy sounds plausible on its own.
`;

const meta: SkillMeta = {
  slug: "differentiated-instruction-check-skill",
  name: "Differentiated Instruction Check",
  title: "Differentiated Instruction Check Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that checks a lesson's stated differentiation strategies against real, specific student need information, flags any strategy that is generic filler, and never invents a student need that was not supplied.",

  seo: {
    primaryKeyword: "differentiated instruction check skill",
    keywords: [
      "differentiated instruction check skill",
      "ai skill to check differentiation strategies",
      "downloadable checklist for differentiated instruction",
      "how to check if differentiation is real",
      "free ai skill for lesson plan differentiation",
    ],
    seoTitle: "Differentiated Instruction Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable differentiated instruction check skill that traces every accommodation and extension to a real stated student need and flags generic filler.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard for downloadable classroom skills.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to review a lesson's differentiation strategies, models reliably generate plausible sounding commentary that praises or lightly edits generic language such as extra support for students who need it, without ever checking whether that language is tied to any real student the class actually contains. Models also tend to invent specific sounding student needs that were never supplied, presenting a guess as though it were documented information. This skill's checklist forces every strategy to trace to a specific quoted need from the supplied student information, and requires the check to say plainly when a strategy does not, rather than assuming a plausible sounding strategy must be justified.",
  },

  article: {
    intro: [
      "A differentiated instruction check skill only earns that name if it can tell the difference between a strategy that is genuinely built for the students in a specific room and a strategy that would read the same way in any lesson plan for any class. Handed a lesson's accommodations and extensions with nothing to compare them against, most AI assistants default to reading each one charitably and confirming it sounds reasonable. This skill is built to refuse that shortcut and check instead.",
      "It ships as two plain text files: a main instructions file and a worked example the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what a teacher or an AI assistant receives once the archive is handed over.",
      "Its job is narrow and checkable on purpose. Given a lesson's stated differentiation strategies and real, specific information about the actual students those strategies are meant to serve, it traces every strategy to a named need or flags it as generic filler, and it never fills a gap in the student information with a guess of its own.",
    ],
    sections: [
      {
        heading: "Why a differentiation strategy needs to be checked, not assumed real",
        body: [
          "A sentence like \"provide extra support for students who need it\" reads as a perfectly reasonable line in a lesson plan. It also reads as a perfectly reasonable line in every other lesson plan ever written, for every class that has ever existed, because it names no student, no barrier and no task. That is the exact quality a differentiated instruction check skill has to catch, and it is precisely what a quick, charitable read misses.",
          "The check does not ask whether a strategy sounds like good teaching in general. It asks whether the strategy is tied to a real, specific need that was actually supplied, and treats a plausible sounding strategy with nothing behind it the same way it treats an obviously lazy one: flagged.",
        ],
      },
      {
        heading: "The two inputs this skill requires before it checks anything",
        body: [
          "The skill will not run a check on a lesson's differentiation strategies alone. It insists on two inputs together, because a strategy can only be judged genuine or generic against something concrete.",
        ],
        list: [
          "The lesson's stated differentiation strategies, quoted or pasted exactly as written, not paraphrased, since a paraphrase can quietly remove the one detail a match depends on.",
          "Real, specific information about the actual students the differentiation targets, such as a named reading gap, a stated accommodation, or a specific assessment result, not a general description of the class.",
        ],
      },
      {
        heading: "The core method, as an ai skill to check differentiation strategies",
        body: [
          "For each strategy in the lesson, the skill searches the supplied student information for a specific need that strategy would plausibly address. When one is found, it is quoted directly and the match is stated in one sentence. When none is found anywhere in the supplied information, the strategy is flagged as generic filler, wording that could be copied into any other lesson plan without changing a word.",
          "This is a downloadable checklist for differentiated instruction in the strict sense that every judgment traces to a specific quoted line, not to a general impression of whether the lesson looks thoughtful.",
        ],
      },
      {
        heading: "A strategy that sounds specific can still fail the check",
        body: [
          "An extension task for early finishers sounds like a completely normal, well planned piece of differentiation. It fails the check anyway if it never names which finishers, because a lesson can supply four specific students who finished the prior assessment in the top band and still write an extension line that ignores every one of them by name.",
          "This is exactly how to check if differentiation is real rather than merely well phrased: the check does not stop once a strategy sounds reasonable, it keeps searching the supplied student information for a specific match, and flags the strategy if that match is never actually found.",
        ],
      },
      {
        heading: "A full worked example",
        body: [
          "The reference file walks through one lesson with six stated differentiation strategies checked against three supplied student needs: a reading gap for three named students, a screen reader accommodation for one named student, and a top band assessment result for four named students. Three strategies trace cleanly to a named need and are matched. Three do not, including one that sounds reasonable on its own but never actually names the students it claims to serve, and are flagged as generic filler.",
          "That gap between sounding reasonable and being genuinely tied to a real, specific student is the entire reason a free ai skill for lesson plan differentiation exists as a separate check rather than being folded into ordinary lesson plan review.",
        ],
      },
      {
        heading: "How this differs from generating differentiated routes for a lesson",
        body: [
          "This skill checks strategies that already exist against real student information supplied to it; it does not write new differentiation strategies for a lesson that has none yet. Writing supported, core and deepening routes to the same learning objective is a generation task best handled by the lesson differentiation prompt, and the two are meant to be used in sequence, not interchangeably.",
          "Once a lesson has differentiation strategies in place, whether written by a teacher or generated with that prompt, this skill is the pass that checks each one against the real students the lesson names before anyone treats the plan as finished.",
        ],
      },
    ],
    howTo: {
      name: "How to use the differentiated instruction check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it entirely in your browser.",
        },
        {
          name: "Gather the lesson's strategies and the real student information",
          text: "Copy the lesson's stated differentiation strategies exactly as written, and pair them with specific, real information about the students those strategies are meant to serve.",
        },
        {
          name: "Hand both inputs to your assistant together",
          text: "Supply the strategies and the student need information in the same message, since the skill refuses to check strategies against information it was not actually given.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only give the lesson's strategies and no student information?",
        answer:
          "The skill refuses to run the check and says so explicitly, rather than guessing at what kind of students the strategies might be for. It asks for real, specific student need information before tracing any strategy to anything.",
      },
      {
        question: "Will the skill invent a student need if my description is vague?",
        answer:
          "No. If the supplied student information is itself vague, such as some students need extra help, the skill states plainly that it is not specific enough and asks for detail instead of inventing a plausible sounding need to fill the gap.",
      },
      {
        question: "How is this different from the lesson differentiation prompt on this site?",
        answer:
          "The lesson differentiation prompt generates new supported, core and deepening routes for a lesson that does not have them yet. This skill checks strategies that already exist against real student information already supplied, and flags any that are generic filler rather than genuinely targeted.",
      },
      {
        question: "Can a strategy that sounds reasonable still get flagged?",
        answer:
          "Yes, and this is the case the skill is built to catch. A strategy like an extension task for early finishers can sound like solid planning and still be flagged as generic filler if it never actually names the specific students or group the supplied information describes.",
      },
      {
        question: "Does the skill say when every need in the lesson is covered?",
        answer:
          "Yes. Alongside matched and flagged strategies, the output lists any student need from the supplied information that no strategy in the lesson actually responds to, so a genuine gap in coverage is visible, not just generic wording.",
      },
      {
        question: "Is anything about my students uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the lesson or the student information you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/education-prompts/lesson-differentiation-prompt",
        label: "lesson differentiation prompt",
        description: "For generating new supported, core and deepening routes for a lesson, the natural step before this skill has anything to check.",
      },
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description: "For building the lesson itself before its differentiation strategies are checked against real student information.",
      },
      {
        href: "/skills/education-skills/misconception-diagnosis-skill",
        label: "misconception diagnosis skill",
        description: "Another narrow classroom checking skill, tracing one wrong answer to a specific belief rather than a strategy to a specific need.",
      },
      {
        href: "/skills/education-skills/rubric-based-feedback-skill",
        label: "rubric based feedback skill",
        description: "For checking finished student work against stated criteria, once the lesson that produced it has already been differentiated.",
      },
    ],
    externalLinks: [
      {
        href: "https://iris.peabody.vanderbilt.edu/module/di/",
        label: "IRIS Center: Differentiated Instruction",
        description: "A Vanderbilt University teacher training module on differentiating content, process and product by student readiness and need.",
      },
      {
        href: "https://www.ascd.org/el/articles/the-goals-of-differentiation",
        label: "ASCD: The Goals of Differentiation",
        description: "Carol Ann Tomlinson's explanation of what differentiation is meant to achieve, the standard this skill's generic filler check is measured against.",
      },
      {
        href: "https://www.cast.org/impact/universal-design-for-learning-udl",
        label: "CAST: Universal Design for Learning",
        description: "A framework for designing instruction around real learner variability, relevant background for judging whether a strategy targets an actual need.",
      },
      {
        href: "https://www.understood.org/en/articles/differentiated-instruction-what-you-need-to-know",
        label: "Understood.org: Differentiated Instruction",
        description: "A plain language explainer distinguishing differentiation from individualization, useful background for the students or groups a strategy should name.",
      },
    ],
  },

  tags: ["education", "differentiation", "lesson planning", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

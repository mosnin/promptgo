import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Classroom Instruction Pacing Check

Use this skill whenever you are given a lesson's list of activities, each
with a stated time allocation, and a real description of what each activity
actually involves in practice: the number of discrete steps, whether it
requires student movement or physical setup, whether it is discussion or
silent independent work, and any materials distribution or collection
involved.

This skill does not check whether an entire lesson's minutes sum to the
class length. That is a separate, whole lesson check. This skill looks
inside each individual activity block and asks a narrower question: given
what this specific activity actually requires, is the time allotted to it
plausible.

## Required inputs before checking anything

Refuse to run a check without both of the following, supplied directly by
the person you are working with.

1. The activity list, each item with its name and its stated minutes,
   exactly as planned.
2. A real, concrete description of what each activity actually involves:
   the distinct steps a student or teacher has to complete, whether it
   needs movement around the room or physical setup, whether it is a
   discussion, a silent task, or teacher led explanation, and whether
   materials need to be distributed or collected.

If the second input is missing, or an activity is described only by a
label such as "lab activity" or "group work" with no detail of what it
actually involves, say so explicitly and ask for the real description
rather than inferring what a "lab activity" usually involves from the name
alone. A guess dressed up as a checked activity is worse than no check at
all, because it looks verified when it is not.

## The core check: match real content to stated time, activity by activity

For each activity, in order:

1. List the actual described components: the distinct steps, any movement
   or physical setup required, whether it is discussion or silent work, and
   any materials handling.
2. From those specific components, reason out a rough plausible time range,
   not a single precise "correct" duration. Ground the range in what was
   actually described: roughly how long each step would plausibly take,
   plus any movement or setup time, plus any cleanup or materials return.
3. Compare the stated minutes against that reasoned range.
4. If the stated minutes sit clearly below the low end of that range, flag
   the activity as RUSHED. Name the specific reason: which steps, which
   movement requirement, or which setup or cleanup step makes the allotted
   time look insufficient given what was described.
5. If the stated minutes sit clearly above the high end, flag the activity
   as PADDED. Name the specific reason: what the described activity
   actually requires that would plausibly fill only a fraction of the time
   given.
6. If the stated minutes sit inside the reasoned range, record the activity
   as realistic and move on without a flag.

## The one discipline that matters more than the rest

Every flag must cite three things together: the specific activity, its
stated time, and the specific reason drawn from the real description that
makes that time look unrealistic. A flag that only says an activity "seems
short" or "seems long" without naming the steps, movement, or setup that
drives that judgment has not actually done the check.

Never assert a single correct time for an activity. The skill's job is to
flag a pacing risk and explain the reasoning behind it from the activity's
real described content, not to claim it knows the one true duration an
activity should take. Two reasonable teachers could disagree by a couple of
minutes on the exact right number; the check exists to catch activities
that are far enough off to be a genuine risk, not to replace a teacher's
judgment with a precise figure.

## Output format

Return, in order:

1. ACTIVITY BY ACTIVITY: each activity's name, its stated minutes, a short
   recap of its real described components, and a verdict of realistic,
   rushed, or padded with the specific reasoning behind that verdict.
2. FLAGGED FOR RUSHED PACING: every activity flagged rushed, restated with
   its stated time and the specific reason.
3. FLAGGED FOR PADDED PACING: every activity flagged padded, restated with
   its stated time and the specific reason.
4. A one line summary count: activities checked, flagged rushed, flagged
   padded, and left realistic.

## What this skill does not do

It does not check whether a lesson's total minutes sum to its stated class
length; that whole lesson arithmetic is a different check performed
elsewhere. It does not judge whether an activity is pedagogically sound or
whether it serves the lesson's learning objective. It does not propose a
replacement number of minutes as a fact. It only checks, activity by
activity, whether the time allotted is plausible given what the activity
was actually described as requiring.

See \`reference/worked-example.md\` for a full worked example applying this
method to one lesson's activity list, with one activity flagged as likely
rushed and one flagged as likely padded.
`;

const WORKED_EXAMPLE_MD = `# Worked example: checking one lesson's activity pacing

This applies the method in \`SKILL.md\` to a single lesson's activity list,
showing an activity flagged as likely rushed, an activity flagged as likely
padded, and activities left as realistic.

## The lesson supplied

A forty five minute middle school science class on how sediment layers
form, with five activities. Each is supplied with its stated minutes and a
real description of what it actually involves, exactly as given.

1. Warm up recall, 5 minutes. Students write a two sentence answer to a
   review question already printed on a handout at their desks. Silent,
   independent, no movement, one step.
2. Vocabulary introduction, 10 minutes. The teacher explains three new
   terms, each with one worked example, while students listen and take
   short notes. No student movement, mostly teacher led explanation with
   brief note taking.
3. Lab setup and sediment layering demonstration, 5 minutes. Students must
   collect a clear plastic cup and lid from a shared supply table at the
   front of the room, measure and pour three different colored layers of
   sand and gravel into the cup, seal the lid and shake it to observe
   mixing, record an initial observation on a worksheet, then clean up any
   spilled sand and place the sealed cup in a rack to settle overnight.
   Five distinct steps, two of which require moving around the room.
4. Think pair share on initial predictions, 10 minutes. Students turn to
   face a partner, exchange a one sentence prediction, discuss it for one
   round of back and forth, then two or three pairs share one observation
   with the whole class.
5. Exit ticket, 15 minutes. Students write a single sentence prediction on
   an index card already sitting on their desk. Silent, one step, no
   movement, no discussion.

The stated minutes for these five activities add up to exactly forty five,
matching the class length. A check that only sums minutes against the
class period would pass this lesson without a single flag. This example
exists to show why that is not the same question as whether each
activity's own allotted time is realistic.

## Walking the check, activity by activity

Activity 1, warm up recall: one described step, silent, no movement, two
sentences to write from a prompt already in front of the student. Five
minutes comfortably covers a one step silent task like this. Realistic, no
flag.

Activity 2, vocabulary introduction: three terms explained with one
example each, teacher led, students mostly listening and taking brief
notes. Ten minutes for three explained terms is a plausible pace for
worked examples delivered aloud. Realistic, no flag.

Activity 3, lab setup and sediment layering demonstration: five minutes
allotted for a five step activity that includes collecting materials from
a shared supply table, measuring and pouring three separate layers,
sealing and shaking the cup, recording an observation, and cleaning up
spilled sand, is unlikely to be enough time based on the steps described.
Two of those steps require students to move around the room, which on its
own typically consumes more than a token amount of time once an entire
class is doing it at once, and the measuring and pouring step is the kind
of fine physical task that resists being rushed without spilling. FLAGGED
RUSHED: five minutes for a five step activity with two movement
requirements and a cleanup step looks unrealistic given what the activity
actually involves.

Activity 4, think pair share on initial predictions: moving to face a
partner, one exchange, one round of discussion, then a short whole class
share back. Ten minutes for a short discussion cycle with only two or
three pairs reporting out is a plausible pace. Realistic, no flag.

Activity 5, exit ticket: fifteen minutes allotted for writing a single
sentence prediction on an index card already sitting on the desk, a
silent, one step task with no movement and no discussion, is far more time
than the described task appears to need. The activity as described, one
sentence on a card already in hand, does not contain enough real content
to plausibly occupy fifteen minutes for most students. FLAGGED PADDED:
fifteen minutes for a one step, one sentence, no movement silent task looks
like far more time than the described activity would need.

## Output produced

ACTIVITY BY ACTIVITY
1. Warm up recall, 5 minutes, realistic.
2. Vocabulary introduction, 10 minutes, realistic.
3. Lab setup and sediment layering demonstration, 5 minutes, rushed.
4. Think pair share on initial predictions, 10 minutes, realistic.
5. Exit ticket, 15 minutes, padded.

FLAGGED FOR RUSHED PACING (1)
Activity 3, lab setup and sediment layering demonstration, 5 minutes: five
described steps including two that require moving around the room, plus a
cleanup step, is unlikely to fit in five minutes.

FLAGGED FOR PADDED PACING (1)
Activity 5, exit ticket, 15 minutes: a one step, silent, no movement task
writing one sentence on a card already at hand does not appear to need
fifteen minutes.

Summary: 5 activities checked, 1 flagged rushed, 1 flagged padded, 3 left
realistic.

## Why this matters more than the minute sum alone

This lesson's minutes add up to exactly forty five, matching the stated
class length, so a check that only verifies the total would pass it
cleanly. The pacing risk in this lesson is invisible to that check. It only
becomes visible once each activity's stated time is weighed against what
that specific activity actually requires, which is the entire reason this
skill exists as a check distinct from a whole lesson time sum.
`;

const meta: SkillMeta = {
  slug: "classroom-instruction-pacing-skill",
  name: "Classroom Instruction Pacing Check",
  title: "Classroom Instruction Pacing Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that checks each activity in a lesson against what it actually requires, flagging activities whose stated minutes look rushed or padded given the real steps, movement and setup described, without ever claiming to know the one correct duration.",

  seo: {
    primaryKeyword: "classroom instruction pacing skill",
    keywords: [
      "classroom instruction pacing skill",
      "ai skill to check lesson activity pacing",
      "downloadable checklist for lesson pacing",
      "how to check if a lesson activity is paced realistically",
      "free ai skill for teachers to check lesson timing",
    ],
    seoTitle: "Classroom Instruction Pacing Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable classroom instruction pacing skill that checks each activity's stated minutes against what it actually requires and flags pacing risk.",
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
      "Given a lesson's stated activity minutes, models reliably accept those numbers at face value and comment on the lesson's structure or objective without ever checking a stated time against what the described activity actually requires. A five minute block labelled as a lab setup gets treated as a reasonable five minutes purely because it is presented as such, even when the described steps plainly need longer. This skill's checklist forces every verdict to trace to the specific steps, movement or setup named in the real activity description, and it is written to flag a pacing risk with stated reasoning rather than assert a single correct duration.",
  },

  article: {
    intro: [
      "A classroom instruction pacing skill only earns that name if it can catch the gap between what a lesson's timetable says and what its activities actually require. Handed a list of activities and their stated minutes, most AI assistants take the numbers as given and move on to commenting on the lesson's structure, never once checking whether five minutes is enough for the five real steps a described activity contains. This skill makes that comparison instead of skipping it.",
      "It ships as two plain text files: a main instructions file and a worked example the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what a teacher or an AI assistant receives once the archive is handed over.",
      "Its job is narrow and checkable on purpose. Given a lesson's activities, their stated minutes, and a real description of what each activity actually involves, it checks each activity on its own terms and flags the ones whose allotted time looks rushed or padded, always citing the specific steps or requirements that drive the flag.",
    ],
    sections: [
      {
        heading: "Why a lesson's minutes can add up correctly and still be wrong",
        body: [
          "A lesson planning prompt can require every activity's minutes to sum exactly to the stated class length, and that check is genuinely useful: it catches a plan that is short by several minutes or one that quietly overruns the bell. But a lesson can pass that arithmetic perfectly and still contain a five minute block that needed twelve, and a fifteen minute block that only needed four. A whole lesson total says nothing about what any single activity actually requires.",
          "This is the gap a classroom instruction pacing skill closes. It does not replace a whole lesson time check; it works inside each activity block once the totals are already settled, asking a narrower question about that one activity's real content.",
        ],
      },
      {
        heading: "The two inputs this skill requires before it checks anything",
        body: [
          "The skill will not run a check on a list of activity names and minutes alone. It insists on two inputs together, because a stated time can only be judged realistic or not against something concrete.",
        ],
        list: [
          "The activity list, each item with its name and its stated minutes exactly as planned.",
          "A real description of what each activity actually involves: the distinct steps, whether it requires student movement or physical setup, whether it is discussion or silent work, and any materials handling.",
        ],
      },
      {
        heading: "The core method, as an ai skill to check lesson activity pacing",
        body: [
          "For each activity, the skill lists the real described components, reasons out a rough plausible time range grounded in those specific components, and compares the stated minutes against that range. An activity clearly below the low end gets flagged rushed; clearly above the high end gets flagged padded; inside the range, it is recorded as realistic with no flag.",
          "Every flag names the specific activity, its stated time, and the specific reason drawn from the real description, whether that is a count of steps, a movement requirement, or a setup and cleanup task that the stated minutes do not appear to leave room for. That trace back to a cited reason is how to check if a lesson activity is paced realistically instead of just eyeballing whether a block feels roughly right.",
        ],
      },
      {
        heading: "What a rushed activity looks like",
        body: [
          "A rushed flag names exactly what the stated minutes do not leave room for: a specific number of steps, a movement requirement such as collecting materials from a shared table, or a setup and cleanup task described in the activity. Five minutes allotted for a four step lab setup plus data collection plus cleanup is unlikely to be enough based on the steps described, and the flag says so in those terms rather than in a vague sense that the block feels tight.",
        ],
      },
      {
        heading: "What a padded activity looks like",
        body: [
          "A padded flag works the same way in reverse. Fifteen minutes for a single sentence written on a card already sitting on the desk, a silent, one step task with no movement and no discussion, is far more time than the described activity appears to need, and the flag states plainly what is missing from the description that would justify that much time.",
        ],
      },
      {
        heading: "A full worked example",
        body: [
          "The reference file walks through a forty five minute science lesson with five activities whose stated minutes sum correctly to the class length, exactly the case where a whole lesson time check alone would pass the plan cleanly. One activity, a lab setup with five real steps and two movement requirements, is flagged rushed at five minutes. Another, a one sentence exit ticket with no movement, is flagged padded at fifteen minutes. The other three are left realistic once weighed against their own described content.",
          "That gap between a correct total and a realistic activity is a downloadable checklist for lesson pacing worth running even on a plan that has already passed a whole lesson arithmetic check.",
        ],
      },
    ],
    howTo: {
      name: "How to use the classroom instruction pacing skill",
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
          name: "Gather the activity list and real descriptions",
          text: "Write out each activity's stated minutes alongside a real description of its steps, whether it needs movement or setup, and whether it is discussion or silent work.",
        },
        {
          name: "Hand both inputs to your assistant together",
          text: "Supply the activity list and the real descriptions in the same message, since the skill refuses to check a time allocation against a description it was not actually given.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only give activity names and their minutes, without describing what each one involves?",
        answer:
          "The skill refuses to run the check and says so explicitly, rather than guessing what a label like lab activity or group work usually involves. It asks for a real description of the steps, movement and setup each activity actually requires before it will compare that against the stated time.",
      },
      {
        question: "Does this replace a whole lesson check that the minutes sum to the class length?",
        answer:
          "No. That is a different, whole lesson arithmetic check performed elsewhere. This skill assumes the totals may already be correct and looks inside each individual activity block instead, which is why a lesson can pass a minute sum check completely and still have activities flagged here.",
      },
      {
        question: "Will the skill tell me the correct number of minutes an activity should take?",
        answer:
          "No, and its instructions explicitly forbid it. The skill flags a pacing risk and explains the reasoning behind that flag from the activity's real described content, but it never asserts a single correct duration, since two reasonable teachers could plan the same activity a couple of minutes apart.",
      },
      {
        question: "Can an activity be flagged even if the lesson's total time is exactly right?",
        answer:
          "Yes, and this is the central case the skill is built to catch. The worked example shows a forty five minute lesson whose five activities sum exactly to the class length while one activity is still flagged rushed and another flagged padded, because the total says nothing about any single activity's real content.",
      },
      {
        question: "How is this different from a lesson planning prompt that already checks the total minutes?",
        answer:
          "A lesson planning prompt that requires minutes to sum to the class length works at the whole lesson level, catching a plan that is short or long overall. This skill works at the level of one activity at a time, comparing its stated minutes against the specific steps, movement and setup that activity was actually described as requiring.",
      },
      {
        question: "Is anything about my lesson uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the lesson or the activity descriptions you eventually use the skill with is ever sent anywhere by this site. It stays a free ai skill for teachers to check lesson timing without any account, upload or tracking involved.",
      },
    ],
    internalLinks: [
      {
        href: "/education-prompts/lesson-planning-prompt",
        label: "lesson planning prompt",
        description: "Generates the timed activity list and enforces that its minutes sum to the whole class length, the plan this skill then checks activity by activity.",
      },
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description: "A broader lesson plan generator with a named cut for when a lesson overruns, useful before this skill's per activity pacing check runs.",
      },
      {
        href: "/education-prompts/curriculum-mapping-prompt",
        label: "curriculum mapping prompt",
        description: "For sequencing a scheme of work across many lessons, once a single lesson's activity pacing has already been checked for realism.",
      },
      {
        href: "/skills/education-skills/differentiated-instruction-check-skill",
        label: "differentiated instruction check skill",
        description: "Another narrow classroom checking skill, tracing a differentiation strategy to a real student need rather than an activity's time to its real content.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.edutopia.org/blog/instructional-pacing-tips-rebecca-alber",
        label: "Edutopia: Instructional Pacing",
        description: "A classroom teacher's practical account of how lesson pacing goes wrong and what keeps a sequence of activities flowing at a realistic speed.",
      },
      {
        href: "https://www.ascd.org/el/articles/pacing-lessons-for-optimal-learning",
        label: "ASCD: Pacing Lessons for Optimal Learning",
        description: "Describes realistic time allocation and rehearsing a lesson in advance as the discipline this skill's per activity check is meant to support.",
      },
      {
        href: "https://www.cultofpedagogy.com/classroom-timing/",
        label: "Cult of Pedagogy: The Art of Classroom Timing",
        description: "Ten practical strategies for fitting activities into the time available, including planning for activities that finish earlier or later than expected.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description: "Documents the explicit constraint and structured output patterns this skill relies on to keep every pacing verdict tied to a cited reason rather than a general impression.",
      },
    ],
  },

  tags: ["education", "pacing", "lesson planning", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

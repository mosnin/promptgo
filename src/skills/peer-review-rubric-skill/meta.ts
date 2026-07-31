import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Peer Review Rubric Skill

Use this skill whenever you are asked to set up, run, or check a peer review session in
which students give feedback on each other's work against a real assignment rubric, rather
than producing feedback on the work yourself. The job here is structuring how student
reviewers write comments to their classmates, not grading the work directly.

## Before the session starts

Ask for, or locate, the actual assignment rubric the work will be judged against: the
specific criteria, and what each performance level looks like for every one of them. Do not
build a peer review template from a topic or a general assignment description alone. A
rubric that says only "Argument, Evidence, Structure" gives a student reviewer nothing to
check a comment against.

If only a topic or a brief is supplied and no rubric exists yet, say so plainly and ask for
one, or point out that building a rubric is a separate job that needs to happen first. Student
reviewers cannot write specific, checkable feedback against criteria nobody has written down.

If the rubric names criteria but does not describe performance levels for each one, ask for
those descriptions before building the review template. A reviewer cannot tell a strength
from a gap on a criterion whose only content is a one word label.

## Building the structured feedback template

For every criterion in the rubric, create one feedback block with three required parts, in
this fixed order:

1. Strength: one specific thing the piece does well against this criterion, naming the
   criterion and quoting or precisely describing the exact part of the peer's work the
   comment is about.
2. Gap: one specific place the piece falls short of the criterion, again naming the criterion
   and pointing to the exact part of the work.
3. Suggestion: one concrete, actionable change the writer could make, tied directly to the
   gap just named, phrased as something the writer could actually do in a next draft.

Pull sentence starters for each of the three parts from
\`reference/feedback-sentence-starters.md\` and hand them to reviewers alongside the blank
template. A blank text box produces vague comments by default; a sentence starter that
requires naming a criterion and pointing to a location does not.

## Coaching against vague feedback while reviewers write

Before a reviewer's comment is treated as finished, check it against the vague versus
specific comparison in the reference file. A comment fails this check if it does not name the
rubric criterion it addresses, does not quote or point to a specific part of the peer's work,
or does not state one concrete suggestion. "Good job" and "needs work" fail on all three
counts at once.

Send a failed comment back to the reviewer with the specific missing part named, rather than
accepting it as is or silently rewriting it for them. The point of this skill is that the
student reviewer learns to write the specific comment themselves, not that the comment merely
looks specific by the time a teacher sees it.

## Checking a completed peer review

When asked to check a finished peer review rather than build the template for a new one, work
through every comment a reviewer wrote and flag, by name, any comment that is too vague to
act on: no named criterion, no pointer to a specific part of the work, or no concrete
suggestion attached to the gap. Report the flagged comments back with the exact missing
element identified, so the reviewer or the teacher moderating the session can see precisely
what to fix, rather than a generic instruction to try harder next time.

## What this skill does not do

It does not write the peer feedback for the student reviewer, and it does not soften a
reviewer's actual judgement of a peer's work into something kinder than what the reviewer
actually wrote. It structures how feedback is captured against the rubric and checks the
result for specificity; the content of the judgement itself stays the student reviewer's own.
`;

const SENTENCE_STARTERS_MD = `# Peer review feedback: sentence starters and the vague versus specific test

Use this alongside \`SKILL.md\`. It supplies the sentence starters reviewers fill in for each
of the three required comment parts, and a side by side test for telling a vague comment from
a specific one before it is accepted as finished.

## Strength sentence starters

- "Against [criterion], the strongest part is [quote or location], because it..."
- "In [location], you meet [criterion] by..., which works because..."
- "One clear example of [criterion] being met is [quote], since it..."

## Gap sentence starters

- "Against [criterion], the part that falls short is [quote or location], because..."
- "[Criterion] is not yet met in [location] because it..."
- "Compared with what [criterion] asks for, [quote] is missing..."

## Suggestion sentence starters

- "To move this up on [criterion], try..."
- "One specific change that would strengthen [criterion] here is..."
- "Consider replacing [quote] with something that..."
- "A concrete next step for [criterion] would be to..."

## The vague versus specific comparison

Vague comment, rejected: "Good job!"
Specific comment, required: "Against Clarity, the opening sentence states the argument in
plain language, which meets the top level because a reader knows the claim before finishing
the first paragraph."

Vague comment, rejected: "Needs more detail."
Specific comment, required: "In paragraph three, the claim that renewable energy is cheaper
has no cited source, which is what Use of Evidence requires at the meets level. Add one
source for the cost claim and say in a sentence how it supports the claim."

Vague comment, rejected: "This is confusing."
Specific comment, required: "The second sentence of paragraph two shifts from cost to safety
with no transition, so the reader loses the thread on Organization. Add a linking sentence
between the two ideas."

Vague comment, rejected: "I liked it."
Specific comment, required: "Against Structure, the topic sentence at the start of each body
paragraph correctly signals what that paragraph argues, which is exactly what Structure asks
for at the top level."

## Running the vague check on a finished comment

For each comment a reviewer submits, check for three things in order: a named rubric
criterion, a quote or precise location from the peer's actual work, and one concrete
suggestion tied to the gap named. If any of the three is missing, name which one is missing
when the comment is sent back, rather than only saying the comment needs to be more specific.
A reviewer told exactly which of the three parts is missing can fix it in one revision; a
reviewer told only to "be more specific" usually cannot.
`;

const meta: SkillMeta = {
  slug: "peer-review-rubric-skill",
  name: "Peer Review Rubric Skill",
  title: "Peer Review Rubric Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that structures how student reviewers give each other feedback against a real assignment rubric, with sentence starters that force a named criterion, a quoted example and one concrete suggestion, and flags comments too vague to act on.",

  seo: {
    primaryKeyword: "peer review rubric skill",
    keywords: [
      "peer review rubric skill",
      "free ai skill for peer review rubric",
      "downloadable peer review checklist for students",
      "ai skill to structure student peer feedback",
      "specific feedback sentence starters for peer review",
    ],
    seoTitle: "Peer Review Rubric Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable peer review rubric skill that structures student feedback against real rubric criteria and flags vague, unhelpful peer comments.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/feedback-sentence-starters.md", content: SENTENCE_STARTERS_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Students asked to give each other feedback in a peer review session default to short, generic comments such as good job or needs work when they are not given a structured format that forces specificity, because a vague comment takes less effort and still feels polite to write. This skill's three part template requires every comment to name a rubric criterion, point to a specific part of the peer's work, and state one concrete suggestion, and it flags any completed comment missing one of those three parts before the session is treated as done.",
  },

  article: {
    intro: [
      "A peer review rubric skill only earns its name when the feedback students hand to each other names a specific rubric criterion, points to a specific part of the work, and suggests one specific change, rather than a friendly sentence that could be pasted onto any classmate's paper unchanged. Left to write comments in a blank box, most students default to short, kind sounding phrases like good job or needs work, because that pattern takes the least effort and still reads as polite. This skill is built to structure the session so that shortcut is not available.",
      "It ships as two plain text files: a main instructions file that walks through building and checking the peer review, and a reference file of sentence starters and a vague versus specific comparison that reviewers fill in and check their comments against. Both are previewable in full on this page before you download the .zip, and both are exactly what a teacher or an AI assistant receives once the archive is handed over.",
      "Nothing about the student work or the completed reviews you eventually use it on is sent anywhere by this site. The preview and the download both happen entirely in your browser.",
    ],
    sections: [
      {
        heading: "Why a blank comment box produces vague peer feedback by default",
        body: [
          "Handed a classmate's essay and an empty text box, most students write the fastest thing that sounds supportive: good job, nice work, needs more detail. None of those phrases name a criterion, point to a location in the work, or suggest a change, so the writer receiving them has nothing concrete to act on and the teacher moderating the session cannot tell whether the review was actually done carefully.",
          "This skill removes the blank box. Every comment is built from a three part template, strength, gap, suggestion, tied to a named criterion, which is what makes this a free ai skill for peer review rubric sessions, not a template that only sounds thorough.",
        ],
      },
      {
        heading: "The three part comment: strength, gap, suggestion",
        body: [
          "Every criterion in the rubric gets one feedback block with three fixed parts. A strength names what the work does well against that criterion and quotes or points to the exact location. A gap names where the work falls short of that same criterion, again with a quote or location. A suggestion states one concrete, actionable change tied directly to the gap just named.",
          "Sentence starters in the reference file scaffold all three parts, so a reviewer who has never written structured feedback before still produces a comment with a named criterion, a specific quote, and one suggestion, not a paragraph of general impressions.",
        ],
      },
      {
        heading: "How this differs from a rubric based feedback skill",
        body: [
          "A rubric based feedback skill has an AI mark a piece of student work directly against a rubric, producing the feedback itself, criterion by criterion, in the assistant's own words. This skill does a different job: as an ai skill to structure student peer feedback, it coaches how the students themselves give feedback to each other in a peer review session, turning a classmate's comment into something specific rather than writing the comment for them.",
          "The two are complementary rather than interchangeable. A teacher might use a rubric based pass to check the quality of grading consistency across a stack of essays, and this skill to run the peer review session those same students hold with each other before a final draft is due, where the audience for the feedback is a classmate, not a grade.",
        ],
      },
      {
        heading: "Checking a completed peer review for vague comments",
        body: [
          "Once reviewers have submitted their comments, the skill works through every one of them and flags, by name, any comment missing a named criterion, a quote or location, or a concrete suggestion. Good job and needs work both fail on all three counts, and get flagged rather than passed through to the writer as though the review were complete.",
          "A flagged comment is returned with the specific missing part identified, not a general note to be more specific. A reviewer told exactly which of the three parts is missing can usually fix the comment in one revision.",
        ],
      },
      {
        heading: "Running a full class peer review session",
        body: [
          "When several students review several pieces of work against the same rubric in one session, keep every comment block independent. A reviewer's earlier, generous comment on one classmate's draft should not soften how the next classmate's genuine gaps get named; each comment is checked against the rubric, not the tone of comments before it.",
        ],
      },
      {
        heading: "How the two files work together",
        body: [
          "SKILL.md sets the process: locate or request the real rubric, build the three part template per criterion, and check finished comments against it before the session is treated as done. It points directly to reference/feedback-sentence-starters.md for the exact sentence starters and the vague versus specific comparison reviewers check their own draft comments against.",
          "Keep both files in the same folder structure they were downloaded in, since the main instructions file references the sentence starter file by its relative path.",
        ],
      },
    ],
    howTo: {
      name: "How to use the peer review rubric skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/feedback-sentence-starters.md directly on this page before downloading, so you know exactly what specific feedback sentence starters for peer review comments you are about to hand to students or an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real assignment rubric",
          text: "Before running the session, write out the specific criteria and what a strong, middling and weak response looks like for each one. A list of category names alone is not enough for reviewers to check comments against.",
        },
        {
          name: "Hand the files, the rubric and the work to your reviewers",
          text: "Keep the folder structure intact so the instructions can point to the sentence starter file, then give reviewers the rubric and the peer work to review, or supply a completed peer review for the skill to check.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only give it an assignment topic and no rubric?",
        answer:
          "The skill says so plainly and asks for the actual rubric rather than building a peer review template from category names alone. Reviewers cannot write specific, checkable comments against criteria nobody has written down, so the session template is not built until a real rubric with performance levels is supplied.",
      },
      {
        question: "Does this replace a teacher grading the work?",
        answer:
          "No. This peer review rubric skill structures the feedback students give each other in a peer review session; it does not assign a grade or produce the teacher's own marking. A separate rubric based feedback skill exists for an AI to mark work directly, which is a different job from structuring peer to peer comments.",
      },
      {
        question: "How does the skill stop students writing good job or needs work?",
        answer:
          "Every comment has to fill in three required parts, a named strength, a named gap, and a concrete suggestion, each tied to a quote or location in the peer's actual work. A comment missing any of the three parts is flagged and sent back with the specific missing element named, rather than accepted as finished.",
      },
      {
        question: "Can it check a peer review that has already been completed?",
        answer:
          "Yes. Given a finished set of peer comments, the skill works through each one and flags, by name, any comment that is too vague to act on, whether that means no named criterion, no quote or location, or no concrete suggestion attached to the gap.",
      },
      {
        question: "What sentence starters does the reference file include?",
        answer:
          "This downloadable peer review checklist for students separates sentence starters for each of the three comment parts, strength, gap and suggestion, and includes a side by side vague versus specific comparison showing exactly what a rejected comment like good job or needs more detail should be rewritten into once it names a criterion and a location.",
      },
      {
        question: "Is anything about the student work uploaded when I use this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser, and there is no server call behind either action. Whatever rubric, student work or completed peer reviews you eventually use these files with is never sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/education-skills/rubric-based-feedback-skill",
        label: "rubric based feedback skill",
        description: "For an AI to mark student work directly against a rubric in its own words, rather than structuring how classmates give feedback to each other.",
      },
      {
        href: "/education-prompts/essay-feedback-prompt",
        label: "essay feedback prompt",
        description: "A single prompt that marks one essay against a pasted mark scheme, a natural companion to a session where students then review each other's redrafts.",
      },
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description: "For feedback built from marking notes and quotes with one next step, when no formal peer review session or rubric applies to the piece at all.",
      },
      {
        href: "/education-prompts/grading-rubric-prompt",
        label: "grading rubric prompt",
        description: "Use this first if no rubric exists yet; it builds analytic bands with observable descriptors this skill's peer review template can then be built from.",
      },
    ],
    externalLinks: [
      {
        href: "https://owl.purdue.edu/owl/general_writing/the_writing_process/feedback/giving%20feedback_peer%20review.html",
        label: "Purdue OWL: Giving Feedback for Peer Review",
        description: "A writing lab's own guide to moving reviewers past vague comments toward the describe, evaluate, suggest structure this skill's three part template builds on.",
      },
      {
        href: "https://www.edutopia.org/article/teaching-students-give-peer-feedback/",
        label: "Edutopia: How to Teach Students to Give Peer Feedback",
        description: "A classroom account of teaching peer feedback as a deliberate, scaffolded skill rather than assuming students already know how to write a specific comment.",
      },
      {
        href: "https://eric.ed.gov/?id=EJ734529",
        label: "ERIC: Nicol and Macfarlane-Dick, seven principles of good feedback practice",
        description: "The peer reviewed research record behind treating specific, actionable feedback as a defined, checkable practice rather than a matter of individual style.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to structuring peer comments.",
      },
    ],
  },

  tags: ["education", "peer review", "rubric", "feedback", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Resume Bullet Audit

Use this skill when you are given a full set of existing resume bullets, from
one section or an entire resume, and asked to check them against a fixed
quality standard rather than draft new ones from a blank page. This skill
audits what is already written. It does not invent bullets that do not
exist, and it does not invent facts to make an existing bullet stronger.

## Before auditing anything

Confirm you have been given the complete set of bullets to review, not a
single line pulled out of context. This skill's value is in applying the
same four criteria consistently across an entire draft, catching the bullet
on line three that leans on a vague filler phrase and the bullet on line
eleven that is missing a number, in one pass. If you are handed only one
bullet and asked to make it better, say plainly that this skill is built for
auditing a full set of existing bullets rather than drafting a single new
one, and ask for the rest of the draft or point toward a drafting tool
instead.

## The four criteria

Run every bullet against \`reference/bullet-quality-checklist.md\`. That file
names four specific, checkable criteria, each with a passing example and a
failing example:

1. Quantified impact: a number, a count, or a named before and after figure
   is present.
2. Action verb lead: the sentence opens with a specific action verb, not a
   phrase like responsible for, worked on, or duties included.
3. No vague filler phrase: generic phrases like team player, detail
   oriented, or results driven are flagged unless a specific fact follows
   and supports them.
4. No unverifiable superlative: a claim like world class, industry leading,
   or best in class is flagged unless a specific, checkable citation backs
   it.

Score each bullet against all four criteria separately, reporting pass or
fail for each one on its own rather than folding them into a single verdict.
A bullet can lead with a strong verb and still fail on quantified impact, or
carry a real number and still fail because it also leans on an unbacked
superlative elsewhere in the same line.

## The single hard rule: never invent a metric

When a bullet fails the quantified impact criterion because no number,
count, or figure exists in the material you were given, the fix suggestion
you write must ask the person for the real number. It must never supply a
plausible sounding percentage, dollar figure, headcount, or timeframe on
their behalf, however reasonable that number would look sitting inside the
sentence.

This is not a minor style preference. A number invented to make a weak
bullet look stronger is a fact the candidate might later be asked to defend
in an interview or during a background or reference check, and a model that
fills in a confident sounding figure to smooth over a real gap in the
evidence is solving the wrong problem. The correct output when a number is
missing is a specific question back to the person: what was the actual
percentage, the actual headcount, the actual dollar figure, or the actual
before and after measurement. Never estimate on their behalf, even when a
plausible range seems obvious from context.

## Reporting format

For every bullet supplied, report in this order: the bullet quoted exactly
as given, a pass or fail against each of the four criteria stated
separately, an overall verdict, and, for anything that failed, a specific
fix suggestion. A bullet that passes all four criteria is left alone rather
than rewritten for style, since this is an audit pass, not a rewrite pass.
Close with a short summary stating how many bullets passed outright, how
many need a real number supplied before they can pass, and how many need a
filler phrase or superlative removed or backed with evidence.

## What this skill does not do

It does not draft a new bullet that did not already exist in the material it
was given. It does not rewrite a bullet that already passes all four
criteria purely for style. It does not soften a fail into a pass to make a
resume look more complete, and it does not accept or invent a number, a
headcount, or a ranking that was not explicitly present in the bullets or
supporting facts supplied to it.
`;

const BULLET_QUALITY_CHECKLIST_MD = `# Bullet quality checklist: four criteria, with pass and fail examples

Use this alongside \`SKILL.md\`. Each criterion below is checkable on its own,
and a bullet is scored against all four separately rather than given one
overall impression.

## 1. Quantified impact present or absent

A passing bullet carries a number, a count, or a named before and after
figure that shows scale or change.

Pass: "Cut average ticket resolution time from 48 hours to 6 hours across a
12 person support team."
Fail: "Helped improve ticket resolution time for the support team."

What separates them: the pass names a specific before figure, a specific
after figure, and the size of the team affected. The fail describes the same
kind of work with nothing a reader could check or question.

If the material supplied has no number for a given bullet, do not write one.
Flag the bullet as failing this criterion and ask the person for the real
figure.

## 2. Action verb leads the sentence

A passing bullet opens with a specific, active verb naming what the person
actually did.

Pass: "Negotiated a new vendor contract that reduced packaging costs by 18
percent."
Fail: "Was responsible for vendor contract negotiations."

What separates them: the pass states who acted and what happened as a
result. The fail describes a responsibility rather than an action, which
reads as a job description line rather than an achievement. Watch for
openers like responsible for, worked on, helped with, involved in, and
duties included, all of which describe a role rather than a result.

## 3. No vague filler phrase

A passing bullet either avoids generic self description entirely or backs it
with a specific fact in the same line.

Pass: "Rebuilt the onboarding checklist that cut new hire ramp time from
five weeks to three."
Fail: "Detail oriented team player with a proven track record of success."

What separates them: the pass demonstrates the quality through a specific,
checkable outcome. The fail asserts a quality with no fact attached to it
anywhere in the line, which is exactly the kind of sentence a screener has
trained themselves to skip.

Common filler phrases to flag: team player, detail oriented, results driven,
go getter, hard worker, excellent communication skills, and proven track
record when nothing specific follows it.

## 4. No unverifiable superlative

A passing bullet either avoids superlative language or backs it with a
specific, checkable citation.

Pass: "Ranked first of 40 regional sales representatives for closed revenue
in Q3 2025."
Fail: "Delivered world class customer service to every client."

What separates them: the pass names the ranking, the field it was measured
against, and the period it covers, all of which someone could go and
confirm. The fail asserts a superlative with nothing behind it, world class
by whose measure, compared against whom, over what period.

Common unverifiable superlatives to flag: world class, industry leading,
best in class, number one, and unmatched, whenever none of them is followed
by a specific ranking, citation, or measurable comparison.

## Using this checklist alongside SKILL.md

Score every bullet against all four criteria above, separately, following
the reporting format in \`SKILL.md\`. Where criterion one fails for a missing
number, the fix suggestion asks for the real figure and never supplies an
invented one. Where criteria two through four fail, the fix suggestion names
the exact phrase to cut, replace, or back with evidence.
`;

const meta: SkillMeta = {
  slug: "resume-bullet-audit-skill",
  name: "Resume Bullet Audit",
  title: "Resume Bullet Audit Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that audits a full set of existing resume bullets against a fixed four part checklist, reports pass or fail per line, and asks for a real number instead of inventing one whenever quantified impact is missing.",

  seo: {
    primaryKeyword: "resume bullet audit skill",
    keywords: [
      "resume bullet audit skill",
      "free ai skill to audit resume bullets",
      "resume bullet checklist for ai assistant",
      "downloadable resume bullet checklist",
      "how to audit resume bullets before applying",
    ],
    seoTitle: "Resume Bullet Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable resume bullet audit skill that checks every existing bullet against a fixed checklist and asks for missing numbers instead of inventing them.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/bullet-quality-checklist.md", content: BULLET_QUALITY_CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to strengthen a weak resume bullet reliably default to supplying a plausible sounding metric, a percentage, a headcount or a dollar figure, that was never present in the material supplied, because a confident number reads as a stronger line than an honest gap. This skill's checklist requires every fix suggestion for a missing metric to ask the person for the real figure instead, and forbids treating an invented number as an acceptable substitute for one.",
  },

  article: {
    intro: [
      "A resume bullet audit skill has one job: work through every bullet on an existing draft resume and check each one against a fixed, named checklist, rather than draft a single line from scratch. Handed a full set of bullets, it returns a pass or fail per line against four criteria, quantified impact, a leading action verb, no vague filler phrase, and no unverifiable superlative, then attaches a fix suggestion wherever a bullet fails.",
      "That makes it a different tool from a prompt built to help someone write one bullet at a time from a blank page. This skill assumes the bullets already exist, sometimes fourteen or twenty of them across several jobs, and reviews the whole draft at once, the way an editor reads a finished manuscript rather than dictating the next sentence.",
      "It ships as two plain text files, a main instructions file and a reference checklist naming what a passing bullet looks like against each criterion, with a failing example beside it. Both carry one hard rule: if a bullet is missing a number, the fix suggestion asks for the real figure and never supplies an invented one.",
    ],
    sections: [
      {
        heading: "What a free ai skill to audit resume bullets actually checks",
        body: [
          "Every bullet run through this skill is checked against four specific, named criteria, not a vague sense of whether the line sounds strong. Each gets a pass or fail against every one of the four, reported separately, because a bullet can lead with a strong verb and still fail on quantified impact, or carry a real number and still fail on an unverifiable superlative.",
        ],
        list: [
          "Quantified impact: a number, a count, or a named before and after figure is present.",
          "Action verb lead: the sentence opens with a specific verb, not a phrase like responsible for or duties included.",
          "No vague filler: phrases like team player or results driven are flagged unless a specific fact follows them.",
          "No unverifiable superlative: a claim like industry leading or world class is flagged unless a specific citation backs it.",
        ],
      },
      {
        heading: "The single most important rule: never invent a metric",
        body: [
          "When a bullet fails the quantified impact check because no number, count, or figure is present in the material supplied, the fix suggestion asks the person for the real number. It does not supply a plausible sounding percentage, dollar figure, headcount, or timeframe on their behalf. A fabricated number on a resume is not a small stylistic slip, it is a claim a candidate might be asked to defend in an interview or a background check, and a model that fills in a confident figure to make a weak bullet read better is solving the wrong problem.",
        ],
      },
      {
        heading: "How this differs from writing one resume bullet at a time",
        body: [
          "A prompt built to help someone write a single resume bullet from scratch starts from raw facts and produces one polished line, a different job from this skill's. This resume bullet audit skill instead starts from bullets that already exist, sometimes an entire resume's worth across several roles, and works through the whole set against the same fixed checklist. The two are complementary: someone drafting a brand new bullet is better served by a dedicated resume bullet prompt, while someone with a full draft wanting every line checked against a consistent standard is the situation this skill exists for.",
        ],
      },
      {
        heading: "Reading a resume bullet checklist for ai assistant report",
        body: [
          "Output from this skill lists every bullet in the order supplied, with a pass or fail against each of the four criteria stated separately, an overall verdict, and a fix suggestion attached to anything that failed. A bullet that passes all four is left alone rather than rewritten for style. A fix suggestion for a missing number names exactly what to go and find, the actual percentage, the specific headcount, or the real before and after figures, rather than a generic instruction to add detail, and a fix suggestion for a filler phrase or an unbacked superlative names the exact words to cut or replace.",
        ],
      },
      {
        heading: "Why vague filler and unverifiable superlatives fail on their own",
        body: [
          "A phrase like team player, detail oriented, or results driven carries no information a screener can check, and a claim like world class or industry leading is a superlative with nothing underneath it unless a specific ranking or citation is attached. Both fail the same way a missing number fails, asking a reader to take the strength of the claim on faith. Resume dishonesty is a documented problem rather than a hypothetical one; independent survey research has repeatedly found that a large share of hiring managers uncover exaggerated or fabricated claims during screening, which is exactly the outcome a fixed checklist and a refusal to invent numbers keeps this skill's output away from.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It does not draft a new bullet that did not already exist in the material given, and it does not rewrite a passing bullet purely for style once it has cleared all four criteria. It also will not soften a fail into a pass to make a resume look more complete, and it will not accept a number, a headcount, or a ranking not explicitly present in the bullets or supporting facts supplied. Where evidence is missing, the report says so and asks for it.",
        ],
      },
    ],
    howTo: {
      name: "How to audit resume bullets before applying",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/bullet-quality-checklist.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Paste in every bullet from the draft",
          text: "Hand over the complete set of bullets from the section or resume being reviewed, not a single line, since the audit compares a whole draft against a fixed checklist.",
        },
        {
          name: "Send back the real numbers it asks for",
          text: "Where the report flags a bullet for missing quantified impact, look up the actual figure and return it rather than accept a rewritten line with a number nobody supplied.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly does a resume bullet audit skill check on each bullet?",
        answer:
          "Four specific, separately reported criteria: whether quantified impact such as a number or a named before and after figure is present, whether a leading action verb opens the sentence, whether a vague filler phrase like team player is doing the work a fact should be doing, and whether any superlative claim is backed by something checkable.",
      },
      {
        question: "Will it ever add a number to a bullet that is missing one?",
        answer:
          "No. If a bullet fails the quantified impact check because no figure was supplied, the fix suggestion asks for the real number instead of inventing a plausible sounding one. This is the single hard rule the whole skill is built around, since a fabricated figure on a resume is a claim someone could be asked to defend later.",
      },
      {
        question: "How is this different from a downloadable resume bullet checklist I could just read myself?",
        answer:
          "The reference checklist here is meant to be handed to an AI assistant alongside the main instructions file so an entire draft gets checked consistently, bullet by bullet, rather than relying on a person to remember and apply four criteria evenly across twenty lines by eye.",
      },
      {
        question: "Does this skill work on bullets from any job or industry?",
        answer:
          "Yes. The four criteria apply to a warehouse role, a sales role, or an engineering role alike, since none depend on the specific industry a bullet describes, only on whether a number, a verb, a filler phrase, or a superlative is present.",
      },
      {
        question: "Should I use this instead of a resume bullet prompt?",
        answer:
          "Not instead of, alongside. A resume bullet prompt is built to help draft a single new bullet from raw facts, while this skill is built to review a whole set of bullets that already exist against a fixed checklist. Most people preparing an application benefit from running both at different points.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no resume content anyone uses the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description: "For drafting a single new bullet from raw facts one line at a time, rather than auditing a full set of bullets that already exist.",
      },
      {
        href: "/career-prompts/cover-letter-prompt",
        label: "cover letter prompt",
        description: "A natural next step once a resume's bullets have passed this audit, since a cover letter should not repeat what the strongest bullets already prove.",
      },
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description: "For preparing to defend the specific numbers and claims that survive this audit once an interviewer asks about them directly.",
      },
      {
        href: "/career-prompts/linkedin-profile-prompt",
        label: "linkedin profile prompt",
        description: "For carrying the same evidenced bullets into a profile written for browsing rather than scanning against a shortlist.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.shrm.org/topics-tools/news/talent-acquisition/liar-liar-resume-fire",
        label: "SHRM: Liar, Liar, Resume on Fire",
        description: "Independent survey data on how often resume claims are exaggerated or fabricated, and how often screening actually catches it.",
      },
      {
        href: "https://www.indeed.com/career-advice/resumes-cover-letters/how-to-quantify-resume",
        label: "Indeed: How to Quantify Resume Accomplishments",
        description: "A practical guide to gathering and presenting the real numbers this skill's fix suggestions ask a candidate to go and find.",
      },
      {
        href: "https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/",
        label: "Harvard FAS Career Services: Create a Strong Resume",
        description: "University career guidance on leading a resume line with a specific action verb, the second of this skill's four criteria.",
      },
    ],
  },

  tags: ["career", "resume", "job search", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

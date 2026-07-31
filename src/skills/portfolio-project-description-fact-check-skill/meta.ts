import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Portfolio Project Description Fact Check

Use this skill after a portfolio project description has already been drafted or polished, and
before it goes on a portfolio site, into a resume, or gets said out loud in an interview, to
check every specific claim in that description against the candidate's own real, honest account
of what happened on the project. This skill does not know what actually happened on the project,
and it is not connected to the project's real history, its codebase, or anyone else who worked on
it. It only knows what the candidate has told it happened, in their own honest words, and it
checks the polished description against that account for internal consistency. This skill does
not write a portfolio project description. It checks one that someone else, a person or another
prompt, already wrote.

## The two required inputs

Do not run a check with anything less than both of the following, supplied in full:

1. The polished portfolio project description, exactly as written, word for word. This is the
   version the candidate intends to publish or say out loud: what they say they built, their
   specific role or contribution, and any outcome or impact they claim.
2. The candidate's real, honest account of the project, in their own words: what actually
   happened, who else was involved, which parts they personally built, and what, if anything,
   they actually measured about the result.

If either input is missing, say so plainly and ask for it before proceeding. There is no external
source this skill can check a claim against. The honest account supplied by the candidate is the
only ground truth available to it, so a check run without that account is not a check at all, it
is a guess dressed up as one.

## What counts as the candidate's honest account

The honest account does not need to be polished, structured, or written for an audience. A rough,
first person description of what actually happened, including the messy parts, the parts someone
else did, and the parts the candidate is unsure about, is exactly the right input. Treat any
uncertainty in that account as important information, not noise to smooth over. If the candidate
writes that they are not sure whether a number changed because of their work or something else
happening at the same time, that uncertainty belongs in the check, not out of it.

Do not treat the polished description itself as a stand in for the honest account, even in part.
The whole purpose of this skill is to compare two different documents against each other. If only
one document is supplied, there is nothing to compare it to.

## Extracting every specific claim

Read the polished portfolio project description sentence by sentence and pull out every specific
claim: a task the candidate says they did, a part of the system they say they built, a role or
title they held on the project, a tool or technique they say they used, a team size or structure
they describe, and any outcome, metric, or impact they attribute to their own work. A general
statement of enthusiasm such as "this project taught me a lot about backend design" is not a claim
to check. A specific factual assertion such as "I built the payment system that processes all
customer transactions" is.

List every claim extracted before checking any of them, quoted exactly as written in the polished
description, so the person reviewing the output can see the full set being checked, not only the
ones that end up flagged.

## Checking each claim against the honest account

For every claim extracted, search the candidate's honest account for the closest matching fact.
Two specific failure patterns matter more than any other, because they are the ones a polishing
pass is most likely to introduce without anyone noticing.

Role overstatement: the honest account describes a team effort, a shared contribution, or a part
of the project someone else built, and the polished description turns that into solo work, sole
ownership, or credit for a part the candidate did not actually build. Watch closely for a
polished description that switches from "we" in the honest account to "I" in the finished
version, and for any claim of having built, led, designed, or owned a component the honest
account attributes to a teammate, a template, a library, or an existing system the candidate
modified rather than created.

Untraceable outcome: a number, a percentage, a count, or a measurable outcome appears in the
polished description that the honest account never mentions measuring, observing, or being told
about. A number is only traceable when the honest account states, even roughly, where it came
from. A number that sounds plausible for a project like this one is not traceable; it is invented,
and it must be flagged the same way a role overstatement is flagged, whether or not it happens to
be true.

Three outcomes are possible for each claim:

- Consistent: the claim matches what the honest account describes, including who did the work and
  where any number came from. Quote the line in the honest account that supports it.
- Overstated: something in the honest account is genuinely related, but the polished description
  has expanded the candidate's role, sole ownership, or the size or certainty of an outcome beyond
  what the honest account supports.
- Untraceable: nothing in the honest account supports the claim at all, whether it is a task, a
  role, or a number. The claim appears to have been added during polishing rather than reported
  by the candidate.

## Reporting the result

For every claim that is not fully consistent, report in this order: the exact sentence quoted
from the polished description, which outcome it received, and, where anything in the honest
account comes closest to supporting it, that closest material quoted alongside a plain statement
of how far the polished version has gone beyond it. Close with a short summary: how many claims
were checked, how many were consistent outright, how many were overstated, and how many were
untraceable.

Do not soften an overstated or untraceable claim into a consistent one to make the review look
cleaner, and do not rewrite the description as part of this check. The output is a report on what
is currently written, not a replacement draft. Where useful, offer a corrected version of a single
flagged sentence built only from what the honest account actually supports, clearly labelled as a
suggestion rather than folded into the report itself.

## What this skill does not do

It does not verify a claim against the actual codebase, a former teammate, an employer, or any
source outside the two documents supplied. It does not write a portfolio project description from
scratch, and it does not draft replacement sentences beyond a single clearly labelled suggestion
for a flagged claim. It does not accept a claim because it sounds reasonable for a project like
this one, or because the role described would look good on an application. It accepts a claim only
when it is directly traceable to the candidate's own honest account, supplied for that specific
check, and it treats an honest account it was never given as a missing input, not as permission to
assume the best version of events.
`;

const WORKED_EXAMPLE_MD = `# Worked example: flagging an overstated role and an untraceable number

Use this alongside \`SKILL.md\` as a model for how a flagged claim should read: specific, quoting
the exact sentence, and naming the closest material in the honest account without inventing
anything beyond what that account actually supports.

## The candidate's honest account, as supplied

"Four of us built an internal inventory dashboard over one semester as a class project. I owned
the front end: the table views, the filtering, and the low stock alert banner. Another student,
Priya, built the backend API and the database schema. A third student handled deployment and our
demo environment. The fourth mostly worked on the slides for our final presentation. Our
professor said the warehouse manager who came to our demo day seemed impressed and said something
like it would save her team a lot of time compared to their spreadsheet, but we never got real
usage numbers because it was never actually deployed anywhere real. I'm proud of the filtering
logic especially, that took a few rewrites to get right."

## The polished portfolio project description, as supplied

"I built an inventory management dashboard that reduced stock tracking time by 60 percent for a
warehouse team, designing the full stack from the database schema through the interactive front
end, including a low stock alert system that let managers act before items ran out."

## The claims extracted

1. "I built an inventory management dashboard"
2. "reduced stock tracking time by 60 percent for a warehouse team"
3. "designing the full stack from the database schema through the interactive front end"
4. "including a low stock alert system that let managers act before items ran out"

## The check

Claim 1, "I built an inventory management dashboard": overstated. The honest account describes a
four person team project, not solo work. The dashboard exists, but "I built" implies sole
authorship of the whole thing, which the honest account does not support.

Claim 2, "reduced stock tracking time by 60 percent for a warehouse team": untraceable. The honest
account states plainly that the project "was never actually deployed anywhere real" and that "we
never got real usage numbers." There is no 60 percent figure, or any figure, anywhere in the
honest account. This number was added during polishing with nothing behind it.

Claim 3, "designing the full stack from the database schema through the interactive front end":
overstated. The honest account is explicit that "Priya" built the backend API and the database
schema, and that the candidate "owned the front end." Claiming the database schema as part of
what "I" designed credits the candidate with a teammate's specific contribution.

Claim 4, "including a low stock alert system that let managers act before items ran out": this
part is consistent. The honest account states the candidate owned "the low stock alert banner"
directly, and the claim about what the feature does is a reasonable plain description of that
same feature, not an expansion of it.

## The flags, as they should appear in the output

Claim: "I built an inventory management dashboard that reduced stock tracking time by 60 percent
for a warehouse team, designing the full stack from the database schema through the interactive
front end, including a low stock alert system that let managers act before items ran out."

Outcome: overstated and untraceable, in three separate places within one sentence.

Closest honest account material: "Four of us built an internal inventory dashboard over one
semester as a class project. I owned the front end: the table views, the filtering, and the low
stock alert banner. Another student, Priya, built the backend API and the database schema... we
never got real usage numbers because it was never actually deployed anywhere real."

How far the polished version goes beyond it: the sentence turns a four person class project into
solo work, claims a teammate's database schema as part of what the candidate personally designed,
and states a specific 60 percent improvement figure for a system the honest account says was
never deployed and never measured at all.

## What a corrected sentence looks like, built only from the honest account

"As one of four students on a class project, I built the front end of an inventory management
dashboard, including the table views, filtering, and a low stock alert banner, while a teammate
built the backend API and database schema. The project was not deployed for real usage, but a
warehouse manager who saw our demo said it looked like it would save her team time compared to
their current spreadsheet process." Every specific detail in that sentence traces back to the
honest account supplied, including the parts that are less impressive than the polished
version, and the demo day reaction is described as a reaction, not restated as a measured result.

## The general pattern this example demonstrates

A polishing pass tends to fail in one of exactly two ways: it silently swaps "we" for "I" around
a real piece of work someone else actually did, or it turns an unmeasured, hoped for outcome into
a specific number that reads as if it were measured. Neither failure requires the underlying
project to be fake. The dashboard in this example is real, the front end work is real, and the
positive reaction at the demo is real. The problem is entirely in how far the description reaches
past what the candidate's own honest account can support, which is exactly the gap this skill is
built to find.
`;

const meta: SkillMeta = {
  slug: "portfolio-project-description-fact-check-skill",
  name: "Portfolio Project Description Fact Check",
  title: "Portfolio Project Description Fact Check Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that checks every claimed role and outcome in a polished portfolio project description against the candidate's own honest account of what actually happened, flagging solo credit for team work and numbers nobody actually measured.",

  seo: {
    primaryKeyword: "portfolio project description fact check skill",
    keywords: [
      "portfolio project description fact check skill",
      "free ai skill to check portfolio project claims",
      "downloadable portfolio project honesty checklist",
      "ai skill to verify a portfolio project description",
      "how to check a portfolio project for overstated claims",
    ],
    seoTitle: "Portfolio Project Description Fact Check Skill: Free AI Download",
    seoDescription:
      "A free, downloadable portfolio project description fact check skill that checks claimed role and outcome against the candidate's own honest account.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to polish a portfolio project description reliably default to tightening a team contribution into sole ownership and rounding a hoped for or anecdotal result into a specific measured figure, because a cleaner, bigger claim reads as a stronger line than an honest, shared, unmeasured one. This skill's instructions require every claim in the polished version to trace back to a specific statement in the candidate's own honest account before it can pass, and require a role or a number that outruns that account to be flagged with the exact sentence quoted, whether or not the underlying claim happens to be true.",
  },

  article: {
    intro: [
      "A portfolio project description fact check skill exists for one specific moment: after a project description has already been polished into its strongest version, and before that version goes anywhere a candidate cannot easily take it back. Polishing quietly turns a shared contribution into solo ownership, or turns a hoped for improvement someone mentioned once into a specific number nobody ever measured.",
      "This skill checks a finished description against exactly one source: the candidate's own honest account of what happened on the project, supplied directly, in their own words. It is not connected to the project's real codebase or a former teammate. Its entire discipline is internal consistency between what a candidate is about to claim and what that same candidate has already said, honestly, actually occurred.",
      "It ships as two plain text files, a main instructions file and a worked reference example that traces a realistic overstatement, a four person class project turned into solo work carrying an invented efficiency figure, back to the honest account it should have stayed inside of. Both are previewable in full before you download the zip.",
    ],
    sections: [
      {
        heading: "Why a portfolio project description needs its own fact check pass",
        body: [
          "A portfolio project description usually carries more room than a resume bullet: a paragraph or two describing what was built, who built it, and what happened as a result. That extra room is exactly where a polishing pass drifts furthest from what actually happened, since there is space to fill and a pull toward the most impressive available version of events rather than the accurate one. A free ai skill to check portfolio project claims exists for exactly that drift, catching it before a candidate repeats a claim in an interview that their own honest account never supported.",
        ],
      },
      {
        heading: "The two inputs a downloadable portfolio project honesty checklist refuses to work without",
        body: [
          "This skill will not run a check on a polished description alone, because there is nothing to compare a single document against. It needs the polished version and the candidate's own honest account, side by side, and if either is missing it says so and asks for it rather than producing something that looks complete while skipping the part that would catch the real problem.",
          "The honest account does not need to be tidy. A rough, first person description that includes the parts a teammate handled and the parts the candidate is genuinely unsure about is exactly the right input, and that uncertainty is treated as information worth keeping.",
        ],
      },
      {
        heading: "How a claim earns a consistent, overstated, or untraceable verdict, as an ai skill to verify a portfolio project description",
        body: [
          "Every specific claim pulled from the polished description, a task performed, a role held, a number attributed to the work, gets checked against the honest account and sorted into one of three outcomes. A consistent claim matches the honest account in substance and scope, including who did the work. An overstated claim is rooted in something real but has grown past what the honest account shows, most often a shared contribution rewritten as sole ownership. An untraceable claim, frequently a specific number, has nothing behind it in the honest account at all.",
        ],
      },
      {
        heading: "Worked example: turning a team project into an untraceable solo win",
        body: [
          "The reference file walks a single case in full: a class project four students built together, an honest account naming exactly which teammate built the backend, and a polished description that claims the whole stack plus a specific 60 percent efficiency figure for a system the honest account says was never deployed for real use.",
          "The flag raised against that sentence quotes it exactly, states the verdict, quotes the closest honest account material back, and spells out precisely how far the polished version strayed from it, alongside a corrected sentence rebuilt using only what the honest account actually supports.",
        ],
      },
      {
        heading: "How this differs from the resume bullet audit skill and the cover letter fact check skill",
        body: [
          "The resume bullet audit skill checks short, existing bullet lines against a fixed four part checklist without requiring a separate honest account to check them against. The cover letter fact check skill checks a longer prose document against two other inputs, the actual job posting and background material. This skill's artifact is different from both: a portfolio project description checked against exactly one source, the candidate's own honest account of that same project, with no job posting and no fixed scoring rubric involved.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not verify a claim against the real codebase or a former teammate, and it will not write a portfolio project description from scratch. It will not accept a claim purely because it sounds reasonable for a project like the one described, or because the bigger version of the role would look better on an application. A role or a number is accepted only when it is directly traceable to the candidate's own honest account.",
        ],
      },
    ],
    howTo: {
      name: "How to check a portfolio project for overstated claims",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather both real inputs",
          text: "Collect the finished portfolio project description exactly as written, and write out your own honest account of the project in your own words, including the parts a teammate handled.",
        },
        {
          name: "Work through every flag with real specifics",
          text: "Where a claim is flagged as overstated or untraceable, either scale it back to what your honest account actually shows or remove it, rather than defending the original wording without new evidence.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as the candidate's honest account for this skill?",
        answer:
          "Any written, first person description of what actually happened on the project, in the candidate's own words. A portfolio project description fact check skill can only compare against something real, so it can be rough and unstructured, and it should include the parts a teammate handled and anything the candidate is unsure about.",
      },
      {
        question: "Will it flag a claim just because the honest account does not mention it?",
        answer:
          "Yes, and that is the point. A claim only passes when it is directly traceable to the honest account supplied. If nothing in that account supports it, even a claim that sounds entirely plausible for the project gets marked untraceable rather than waved through on the strength of how reasonable it sounds.",
      },
      {
        question: "How is this different from the resume bullet audit skill?",
        answer:
          "The resume bullet audit skill scores existing resume bullets against a fixed four part checklist covering quantified impact, verb choice, filler phrases, and superlatives. This skill instead compares a longer portfolio project description against a second document, the candidate's own honest account, checking for role overstatement and untraceable numbers rather than scoring style against a checklist.",
      },
      {
        question: "How is this different from the cover letter fact check skill?",
        answer:
          "The cover letter fact check skill checks a full cover letter against a job posting and a candidate's resume or background material, looking for claims that echo the posting rather than the candidate's real history. This skill checks one specific portfolio project description against the candidate's own honest account of that same project, with no job posting involved at all.",
      },
      {
        question: "Does this skill flag an outcome number even if it might actually be true?",
        answer:
          "Yes. A number is judged on whether it is traceable to the honest account, not on whether it happens to be accurate. A plausible sounding figure the honest account never mentions measuring is flagged as untraceable, because the check has no way to confirm a number the candidate themselves never reported.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and neither the portfolio description nor the honest account anyone eventually checks with this skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/career-prompts/portfolio-description-prompt",
        label: "portfolio description prompt",
        description: "For drafting a first version of a portfolio project description from scratch, the natural step this skill's check runs after, not instead of.",
      },
      {
        href: "/skills/career-skills/resume-bullet-audit-skill",
        label: "resume bullet audit skill",
        description: "Audits short, existing resume bullet lines against a fixed four part checklist, a different artifact from a longer portfolio project description.",
      },
      {
        href: "/skills/career-skills/cover-letter-fact-check-skill",
        label: "cover letter fact check skill",
        description: "Applies a related claim tracing discipline to a full cover letter checked against a job posting and background material, not a single project description.",
      },
      {
        href: "/skills/career-skills/interview-answer-structure-skill",
        label: "interview answer structure skill",
        description: "For structuring how a project described here gets told out loud as a spoken story once its claims have already been checked.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.shrm.org/topics-tools/news/talent-acquisition/liar-liar-resume-fire",
        label: "SHRM: Liar, Liar, Resume on Fire",
        description: "Independent survey data on how often application claims are exaggerated, useful context for why a project description deserves its own check.",
      },
      {
        href: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/about-your-profile",
        label: "GitHub Docs: About your profile",
        description: "Official guidance on how a profile and its pinned projects present a candidate's real, attributable contributions.",
      },
      {
        href: "https://www.coursera.org/articles/how-to-make-a-portfolio",
        label: "Coursera: How to Make a Portfolio",
        description: "Independent guidance on adding process context to each portfolio project, the same detail this skill checks for accuracy.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a claim check.",
      },
    ],
  },

  tags: ["career", "portfolio", "job search", "fact check", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

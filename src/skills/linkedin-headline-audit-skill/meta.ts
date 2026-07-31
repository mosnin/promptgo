import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# LinkedIn Headline Audit

Use this skill when you are given someone's existing LinkedIn headline and asked to check
it against specific, checkable criteria. Do not use it when asked to draft a new headline
from a blank page or to rewrite an entire LinkedIn profile end to end. This skill audits
one headline that already exists. It does not draft a profile summary, an About section,
or work history bullets, and it never invents a keyword or a background claim that was not
actually supplied.

## What you need before starting

Ask for, or confirm you already have, three things:

1. The exact headline text as it appears on the profile today, quoted verbatim, not
   paraphrased from memory.
2. The person's real, current skills and the specific role or roles they are targeting,
   stated in their own words.
3. Anything else they have told you about their background that a keyword suggestion
   might need to trace back to, a certification, a tool, a domain, a company size.

If any of the three is missing, ask for it before auditing. A missing headline means there
is nothing to quote. Missing skills or a missing target role means any keyword suggestion
made afterward would have nothing real to trace back to and would have to be invented,
which this skill forbids outright.

## Run three checks, in order

For each headline supplied, run all three checks below in order. Do not stop at the first
flag: a single headline can fail more than one of the three at once.

1. Specific role or value proposition check. LinkedIn already shows the person's current
   job title separately, directly under their name, so a headline that just repeats that
   title again adds nothing new. Check whether the headline states a specific role plus a
   distinguishing detail, a domain, a result, an audience, rather than the bare title alone.
   Quote the exact headline text and state which part, if any, goes beyond the title
   LinkedIn already displays for free.
2. Real, relevant keyword check. Compare the headline against the skills and target role
   the person actually gave you. A keyword belongs in the headline only if it traces to
   something they told you is real and current: a tool, a certification, a domain word, an
   exact job title. Flag any keyword present in the headline that does not trace to their
   stated material as unverified, and separately flag any keyword they did give you that a
   recruiter searching their target role would plausibly use but the headline is currently
   missing.
3. Generic filler phrase check. Compare the headline against
   \`reference/filler-phrase-list.md\`. That file lists specific filler phrases that add no
   checkable information, alongside real before and after examples. Flag any exact or close
   match and quote the specific words that triggered the flag.

## The one hard rule this skill will not break

Never invent a keyword, a skill, or a claim about the person's background that was not
explicitly supplied. A suggested keyword must always trace to something the person actually
told you: their real stated skills, their stated target role, or a specific fact they gave
you about their work. If a headline is missing a keyword recruiters plausibly search for and
the person never told you they actually have that skill, name the gap and ask whether it is
true rather than writing it into a suggested rewrite. This applies even when the missing
keyword seems obvious from context; a job title alone is never enough evidence for a
specific tool, certification, or domain claim.

## How to report findings

For every headline audited, report in this order:

1. The exact headline text, quoted.
2. A pass or fail against each of the three checks, stated separately, each with the
   specific rule cited by name and the exact words that triggered any flag.
3. A specific rewrite suggestion for anything that failed, built only from keywords and
   facts the person already supplied.
4. A short list of any gap where a plausible keyword is missing but was never confirmed as
   true, phrased as a question back to the person, never filled in on their behalf.

A flag with no quoted text and no cited rule is not a finished audit, it is a guess wearing
an audit's format.

## What this skill does not do

It does not draft a full LinkedIn profile, an About section, or work history bullets, all of
which are a different job with a different discipline. It does not rewrite a headline that
already passes all three checks purely for style. It does not accept a keyword, a metric, or
a claim about someone's background that was not explicitly given to it, and it will not
soften a fail into a pass to make a headline look more finished than the material supports.
`;

const FILLER_PHRASE_LIST_MD = `# Filler phrase list: what to flag, and real before and after examples

Use this alongside \`SKILL.md\`. Every phrase below adds no checkable information to a
headline: it cannot be searched for, and it states nothing a reader could verify about the
person's actual skills or role.

## Phrases to flag on sight

- passionate professional
- results driven leader, or any results driven claim with no specific result attached
- dynamic team player
- proven track record, unless a specific, named result follows immediately
- seasoned expert
- thought leader
- go getter
- hard worker
- detail oriented professional
- visionary leader
- guru, ninja, or rockstar used as a job description
- extremely dependable
- highly motivated

A phrase on this list is not automatically disqualifying if it is followed in the same
headline by a specific, checkable fact, but the flag should still note that the phrase
itself carries no information and the fact attached to it is doing all the actual work.

## Before and after examples

Before: "Passionate marketing professional and results driven leader"
After: "B2B marketing manager, demand generation for mid market SaaS"
What changed: the filler phrases are gone, replaced with a specific role and a specific
domain the person actually works in. Nothing here should be invented; the domain and
function must come from what the person told the skill about their real work.

Before: "Dynamic team player with a proven track record of success"
After: "Supply chain analyst, inventory forecasting for a 40 store retail chain"
What changed: "dynamic team player" and "proven track record" are both flagged filler,
neither is searchable and neither states anything specific. The replacement states a
function and a scale, and both must trace to something the person actually supplied, never
a plausible sounding number invented to fill the gap.

Before: "Seasoned HR generalist and thought leader in talent strategy"
After: "HR generalist, benefits administration and full cycle recruiting for a 200 person
company"
What changed: "seasoned" and "thought leader" are removed. The replacement lists two
specific functions and a company size, again only usable once the person actually confirms
those details are real.

Before: "Passionate about helping businesses grow"
After: ask the person what they specifically do; this before line contains no role, no
skill and no target audience to rewrite from
What changed: sometimes a filler heavy headline contains nothing usable at all. When that
happens, do not invent a role or a skill to fill the gap. Ask the person directly what they
do and who they do it for, and wait for a real answer before drafting a replacement.

## Why these specific phrases keep appearing

These phrases are common precisely because they require no research and carry no risk:
nobody can be wrong for calling themselves a passionate professional. That is exactly why
they carry no search weight, and why a recruiter scanning a results list skips past them
without registering anything specific about the person underneath.
`;

const meta: SkillMeta = {
  slug: "linkedin-headline-audit-skill",
  name: "LinkedIn Headline Audit",
  title: "LinkedIn Headline Audit Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that checks an existing LinkedIn headline against three checkable criteria, quotes the exact text behind every flag, and never invents a keyword or background claim the person did not actually supply.",

  seo: {
    primaryKeyword: "linkedin headline audit skill",
    keywords: [
      "linkedin headline audit skill",
      "free ai skill to audit linkedin headline",
      "downloadable linkedin headline checklist",
      "ai skill to check linkedin headline keywords",
      "linkedin headline filler phrase checklist",
    ],
    seoTitle: "LinkedIn Headline Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable linkedin headline audit skill that checks an existing headline against three checkable rules and never invents a keyword you did not supply.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/filler-phrase-list.md", content: FILLER_PHRASE_LIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to audit a LinkedIn headline reliably default to two failure modes: reaching for a generic filler phrase like passionate professional when a headline needs strengthening, and inventing a plausible sounding keyword or skill claim that the person never actually supplied. This skill's checklist forces every flag to quote the exact headline text and cite a specific rule, and requires any suggested keyword to trace to a skill or target role the person genuinely stated rather than a guess dressed up as an observation.",
  },

  article: {
    intro: [
      "A linkedin headline audit skill has one narrow job: check a headline that already exists against specific, checkable criteria, not draft a new one from a blank page and not rewrite the rest of a profile around it. LinkedIn already displays a person's current job title directly under their name, so a headline that just repeats that title again is wasted space where something more specific could sit instead.",
      "Most headline reviews stop at a vague impression, this one feels weak, try something punchier, which is not an audit, it is a guess wearing an audit's format. This skill instead runs every headline through three named checks: whether it states a specific role or value proposition beyond the bare title, whether its keywords actually trace to skills and a target role the person stated, and whether it leans on a generic filler phrase that carries no information at all.",
      "It ships as two plain text files, a main instructions file and a downloadable linkedin headline checklist of filler phrases paired with before and after examples. Both are previewable in full before download, and both carry one hard rule: never invent a keyword, a skill, or a claim about someone's background that was not actually supplied.",
    ],
    sections: [
      {
        heading: "Auditing an existing headline, not drafting one from scratch",
        body: [
          "This is a free ai skill to audit linkedin headline text that already exists, not one that drafts something new. Handed the exact text, it runs three checks in a fixed order and reports a pass or fail against each separately, since a headline can pass one check while failing another: a strong keyword match still fails the filler check if it sits beside a phrase like results driven leader with nothing specific attached.",
          "A review that jumps straight to a rewrite skips the part that teaches something: naming, specifically, which rule the current headline breaks and why.",
        ],
      },
      {
        heading: "Why a headline should not just repeat the job title",
        body: [
          "LinkedIn shows a person's current title in its own field, directly under their name, on every view of the profile. A headline that repeats that title verbatim, senior product manager as both the title field and the headline, has done nothing the platform was not already doing for free. The first check asks whether the headline states something beyond the title: a domain, an audience, a specific result, a distinguishing detail a recruiter scanning forty results would actually register.",
          "The check does not require flash. A domain and a specific function, payments engineer, card acquiring and PSD2, is enough to pass, since it tells a reader something the bare title did not.",
        ],
      },
      {
        heading: "How a real, relevant keyword check works",
        body: [
          "As an ai skill to check linkedin headline keywords, the second check compares every keyword in the headline against the skills and target role the person actually stated. A tool name, a certification, or a domain word only counts as verified if it traces back to something they told the skill directly. Anything that does not trace to that stated material gets flagged as unverified.",
          "The same check runs in reverse: if the person's stated skills include a keyword recruiters searching their target role would plausibly type, and the headline is missing it, that gap gets named as a suggestion, never silently inserted into a rewrite as though already confirmed.",
        ],
      },
      {
        heading: "Generic filler phrases the skill flags on sight",
        body: [
          "A linkedin headline filler phrase checklist sits behind the third check, naming specific phrases that add no searchable information: passionate professional, results driven leader, dynamic team player, proven track record with nothing named after it. Every entry in that reference file pairs with a real before and after example, so a flag comes with a concrete replacement pattern, never just a red mark.",
        ],
      },
      {
        heading: "How this differs from a full LinkedIn profile prompt",
        body: [
          "A prompt built to rebuild an entire LinkedIn profile, headline, current and past titles, skills list, and a first person About section, is solving a different problem: drafting new content across several fields at once. This linkedin headline audit skill only ever touches one field, in audit mode only, checking what already exists against three named rules rather than writing new prose anywhere on the profile.",
          "The two are complementary. Someone rebuilding a profile from nothing is better served starting with a dedicated profile prompt, while someone who already has a headline and wants it checked against a fixed, checkable standard before it goes live is the exact situation this skill exists for.",
        ],
      },
      {
        heading: "The one hard rule: never invent a keyword or a claim",
        body: [
          "When a headline is missing a keyword a recruiter might plausibly search, the fix suggestion asks the person whether that skill is genuinely theirs rather than writing it into a rewrite for them. A keyword invented to make a thin headline look stronger is a claim the person might later be asked to defend in a screening call, and a model that fills a gap with a confident sounding tool name is solving the wrong problem.",
        ],
      },
    ],
    howTo: {
      name: "How to use the linkedin headline audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/filler-phrase-list.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Supply the exact headline, real skills, and target role",
          text: "Paste the current headline verbatim, then state your actual current skills and target role in your own words, so any suggested keyword has something real to trace back to.",
        },
        {
          name: "Confirm any flagged gap before it goes live",
          text: "Where the audit names a missing keyword as a possible gap, only add it once you have confirmed it is genuinely true of you, never because the audit suggested it sounded plausible.",
        },
      ],
    },
    faq: [
      {
        question: "What does a linkedin headline audit skill actually check?",
        answer:
          "Three specific, separately reported checks: whether the headline states a specific role or value proposition beyond the bare job title LinkedIn already shows, whether every keyword in it traces to skills and a target role you actually stated, and whether it leans on a generic filler phrase like passionate professional that carries no searchable information.",
      },
      {
        question: "Will it ever add a keyword to my headline that I did not mention?",
        answer:
          "No. If a keyword recruiters might plausibly search is missing, the audit names that gap and asks whether the skill is genuinely yours instead of writing it into a suggested rewrite. This is the one hard rule the whole skill is built around, since an invented keyword is a claim you might later be asked to defend.",
      },
      {
        question: "How is this different from the linkedin profile prompt on this site?",
        answer:
          "The linkedin profile prompt drafts new content across an entire profile, headline, titles, skills list, and a first person About section. This skill only audits one field, the headline, checking what already exists against three fixed rules rather than writing new prose anywhere on the page.",
      },
      {
        question: "Does the skill work if I do not have a target role picked yet?",
        answer:
          "It needs at least a rough target role and your real current skills to run the keyword check meaningfully, since a suggestion has nothing to trace to otherwise. Without that, the skill will ask for it before auditing rather than guessing at what recruiters for an unspecified role might search.",
      },
      {
        question: "Can it check headlines for people outside a typical corporate job search?",
        answer:
          "Yes. The three checks, specificity beyond the title, keyword traceability, and filler avoidance, apply the same way to a freelancer, a consultant, or a career changer, since none of them depend on a particular industry, only on what the person actually states about their own skills and target role.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no headline or background information anyone uses the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/career-prompts/linkedin-profile-prompt",
        label: "linkedin profile prompt",
        description: "For drafting an entire profile from scratch, headline, titles, skills and About section together, rather than auditing one headline that already exists.",
      },
      {
        href: "/skills/career-skills/resume-bullet-audit-skill",
        label: "resume bullet audit skill",
        description: "The same audit discipline, quoting exact text and citing a specific rule, applied to an existing set of resume bullets instead of a headline.",
      },
      {
        href: "/skills/career-skills/cover-letter-fact-check-skill",
        label: "cover letter fact check skill",
        description: "Shares this skill's refusal to invent a claim: checks a cover letter's statements against evidence the person actually supplied.",
      },
      {
        href: "/skills/career-skills/interview-answer-structure-skill",
        label: "interview answer structure skill",
        description: "A natural next step once a headline passes this audit, for preparing to speak to the same real skills and results in an interview.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.indeed.com/career-advice/resumes-cover-letters/profile-headline",
        label: "Indeed: Crafting a Profile Headline That Stands Out",
        description: "Independent career guidance naming the same specificity and generic language problems this skill's first and third checks are built to catch.",
      },
      {
        href: "https://www.jobscan.co/blog/impactful-linkedin-headline-examples/",
        label: "Jobscan: LinkedIn Headline Examples and Formulas",
        description: "Explains why a headline carries outsized weight in LinkedIn's search ranking, the reason a keyword mismatch matters more here than elsewhere on a profile.",
      },
      {
        href: "https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/",
        label: "Nielsen Norman Group: First Two Words as a Scanning Signal",
        description: "Research behind why a headline's opening words carry the most weight with a scanning reader, the basis for checking specificity ahead of everything else.",
      },
    ],
  },

  tags: ["career", "linkedin", "job search", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

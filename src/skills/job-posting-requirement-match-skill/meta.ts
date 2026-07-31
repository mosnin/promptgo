import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Job Posting Requirement Match

Use this skill when you have a real job posting's stated requirements and a candidate's real
work history and skills, and you need each requirement checked one at a time against that real
background. The output is a map: every requirement marked MET, PARTIAL, or GAP, with the exact
real evidence quoted beside it. This skill does not draft a resume, does not draft a cover
letter, and does not decide whether the candidate should apply. It produces the honest map a
candidate uses to make that decision themselves.

## The two required inputs, supplied in full

Do not run a match with anything less than both of the following, supplied directly:

1. The job posting's stated requirements, pasted in full or listed out, not paraphrased and not
   inferred from the job title alone.
2. The candidate's real background material: a resume, notes on real work history, or any other
   written record of what the candidate has actually done, using their own words.

If either is missing, say so plainly and ask for it before proceeding. A requirement cannot be
checked against a job posting that was never supplied, and a requirement cannot be matched
against background material that was never supplied either. Do not proceed on a partial set of
inputs and produce a match that looks complete when it is not.

## Extracting every requirement first

Read the posting and list every requirement separately before checking any of them, quoted
exactly as written. Keep the posting's own distinction between required and preferred
qualifications if it makes one; do not collapse a "nice to have" line into the same weight as a
"must have" line. List the full set before scoring a single one, so the person reading the
output can see everything that was checked, not only the requirements that ended up as gaps.

## The three verdicts

Score every requirement against the candidate's real background material using exactly one of
these three verdicts:

- MET: the background material contains real experience that fully satisfies the requirement,
  including any qualifier the requirement names, such as years, a specific tool, a scope of
  responsibility, or a credential. Quote the exact line from the background material that
  satisfies it.
- PARTIAL: the background material contains real, related experience, but it does not fully
  satisfy the requirement as stated. State precisely what is missing, for example a shorter
  duration than asked for, a different but adjacent tool, or informal responsibility where the
  requirement asks for a formal one.
- GAP: nothing in the background material supplied matches the requirement at all. Say so
  plainly rather than reaching for an adjacent skill or a similar sounding job title to paper
  over the absence.

## The two hard rules

Never invent or infer experience the candidate did not supply in order to manufacture a MET.
A requirement asking for a specific tool is not satisfied by a similar tool the candidate never
mentioned, and a requirement asking for management experience is not satisfied by inferring that
a senior sounding title probably included it. If the material does not say it, the match cannot
claim it.

Never soften a genuine GAP into a false MET, and never round a PARTIAL up into a MET to make the
match look stronger. The candidate reading this output is deciding whether to apply or what to
address directly in a cover letter, and an inflated match serves neither purpose. An honest GAP
is more useful than a flattering rewrite, because it tells the candidate exactly where to spend
their attention before submitting the application.

## Reporting format

For every requirement, report in this order: the requirement quoted exactly as it appeared in
the posting, the verdict, and the specific evidence behind that verdict, quoted from the
background material for a MET or a PARTIAL, or a plain statement that nothing in the material
supports it for a GAP. Close with a short summary: how many requirements were checked, how many
came back MET, how many PARTIAL, and how many GAP.

## What this skill does not do

It does not draft a resume, and it does not draft a cover letter. It does not soften a GAP or a
PARTIAL to make an application look stronger, and it does not manufacture experience the
candidate did not actually supply, however plausible that experience would sound sitting next to
the requirement it would satisfy. It does not decide whether the candidate should apply; the map
it produces is the input to that decision, not the decision itself.
`;

const WORKED_EXAMPLE_MD = `# Worked example: matching five requirements against one real background

Use this alongside \`SKILL.md\` as a model for how a full match should read: every requirement
quoted exactly, every verdict stated on its own, and every piece of evidence quoted from the real
material rather than summarised or softened.

## The job posting, as supplied

Role: Marketing Analytics Manager, mid sized ecommerce company.

Stated requirements, pasted in full:

1. "5+ years of experience in marketing analytics or a related field."
2. "Advanced proficiency in SQL and experience building dashboards in Tableau or Looker."
3. "Experience managing a team of at least 2 direct reports."
4. "Experience with multi touch attribution modeling."
5. "Bachelor's degree in marketing, statistics, or a related field."

## The candidate's real background material, as supplied

"6 years in marketing analytics, most recently as Senior Marketing Analyst at a mid sized
ecommerce company. Built and maintain 12 Looker dashboards used by the growth team weekly. Write
SQL daily to pull and join first party data from Snowflake. No direct reports; have mentored 2
interns informally but no formal management responsibility. Have not personally built or
maintained an attribution model, though pulled data once for the data science team's attribution
project. Bachelor's degree in economics."

## The match, requirement by requirement

**Requirement 1: "5+ years of experience in marketing analytics or a related field."**

Verdict: MET.

Evidence: "6 years in marketing analytics, most recently as Senior Marketing Analyst at a mid
sized ecommerce company." Six years clears the five year bar stated in the requirement, and the
role named is marketing analytics itself, not an adjacent field being stretched to fit.

**Requirement 2: "Advanced proficiency in SQL and experience building dashboards in Tableau or
Looker."**

Verdict: MET.

Evidence: "Write SQL daily to pull and join first party data from Snowflake" and "Built and
maintain 12 Looker dashboards used by the growth team weekly." Both halves of the requirement are
satisfied by real, dated, ongoing work, and the tool named, Looker, is one of the two the
requirement explicitly accepts.

**Requirement 3: "Experience managing a team of at least 2 direct reports."**

Verdict: PARTIAL.

Evidence: "No direct reports; have mentored 2 interns informally but no formal management
responsibility." What is missing: the requirement asks for formal management of direct reports,
and the material states plainly that no direct reports exist. Mentoring two interns is real,
related experience in guiding other people's work, but the candidate's own words rule out
treating it as management, so it cannot be marked MET.

**Requirement 4: "Experience with multi touch attribution modeling."**

Verdict: GAP.

Evidence: nothing in the background material supports this requirement. The material states "Have
not personally built or maintained an attribution model, though pulled data once for the data
science team's attribution project." Pulling data once for a project someone else owned is not
experience with attribution modeling itself, and the candidate's own account already draws that
line, so this is reported as a gap rather than stretched into a partial match.

**Requirement 5: "Bachelor's degree in marketing, statistics, or a related field."**

Verdict: MET.

Evidence: "Bachelor's degree in economics." Economics is a quantitative, related field to
statistics and marketing analytics, and the requirement's own wording accepts "a related field"
rather than naming marketing or statistics exclusively.

## The summary, as it should appear in the output

Five requirements checked. Three MET: years of experience, SQL and dashboard tooling, and the
degree requirement. One PARTIAL: team management, where real mentoring experience exists but does
not meet the requirement's formal management bar. One GAP: multi touch attribution modeling,
where no real matching experience was supplied.

## Why the PARTIAL and the GAP were not rounded up

A weaker match would have folded the internship mentoring into a MET on team management, or
treated the single data pull for the attribution project as a PARTIAL rather than a GAP. Both
would have been comfortable readings and both would have been false ones. The candidate using
this map benefits far more from knowing exactly where the team management line falls short and
that attribution modeling is a real, named gap, since either one is a natural line to address
directly in a cover letter or in an interview, and neither can be addressed honestly if the map
never said it was missing.
`;

const meta: SkillMeta = {
  slug: "job-posting-requirement-match-skill",
  name: "Job Posting Requirement Match",
  title: "Job Posting Requirement Match Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that checks every stated requirement in a real job posting against a candidate's real work history one at a time, marking each MET, PARTIAL, or GAP with the exact evidence quoted, and never softens a genuine gap into a flattering match.",

  seo: {
    primaryKeyword: "job posting requirement match skill",
    keywords: [
      "job posting requirement match skill",
      "free ai skill to match resume to job posting",
      "downloadable job requirement match checklist",
      "ai skill to check if you meet job requirements",
      "how to compare your background to a job posting",
    ],
    seoTitle: "Job Posting Requirement Match Skill: Free AI Skill",
    seoDescription:
      "A free, downloadable job posting requirement match skill that checks every stated requirement against your real background and marks it met, partial, or a gap.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/requirement-match-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to compare a resume against a job posting reliably default to a generous overall impression, marking a candidate as a strong fit whenever most requirements look roughly covered, rather than checking each requirement on its own and stating plainly where the real background falls short. This skill's instructions require a separate verdict for every requirement, forbid inferring experience from an adjacent title or a similar sounding tool, and forbid rounding a partial match or a genuine gap up into a false met.",
  },

  article: {
    intro: [
      "A job posting requirement match skill only earns its name if it can say gap and mean it. Handed a posting and a resume, most AI assistants default to an encouraging overall impression, a strong fit or a good match, rather than working through each stated requirement on its own and reporting honestly where the real background falls short. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file and a worked reference example matching five real requirements from one posting against one real candidate background, with the verdicts and evidence quoted exactly. Both are previewable in full before you download the .zip, and both are exactly what an assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a resume-shaped impression is not a requirement match",
        body: [
          "A posting lists five, ten, sometimes fifteen separate requirements, each with its own qualifier, a number of years, a named tool, a scope of responsibility. Folding all of that into a single overall verdict, strong fit or partial fit, throws away exactly the information a candidate needs: which specific line is the problem, and what real evidence would fix it.",
          "A free ai skill to match resume to job posting that returns one adjective is answering the wrong question. This skill checks the posting's requirements one at a time instead, because a candidate deciding whether to apply, or what to name directly in a cover letter, is served by specific gaps and partial matches, not a single word standing in for several separate judgments.",
        ],
      },
      {
        heading: "The three verdicts, and why there are only three",
        body: [
          "Every requirement checked by this job posting requirement match skill gets exactly one of three verdicts. MET means the real background material fully satisfies the requirement, including any qualifier it names, and the exact supporting line is quoted. PARTIAL means real, related experience exists but does not meet the requirement as stated, with the specific missing piece named. GAP means nothing in the material supplied matches the requirement at all.",
          "Three verdicts, not five and not a percentage score, because a finer scale invites the kind of hedging this skill exists to prevent. A requirement has real supporting evidence, has related but incomplete evidence, or has none, and naming which of the three applies is more useful than a number that sounds precise but hides the same judgment.",
        ],
      },
      {
        heading: "The two hard rules a downloadable job requirement match checklist enforces",
        body: [
          "The first rule: never invent or infer experience the candidate did not actually supply to manufacture a MET. A requirement naming a specific tool is not satisfied by a similar tool the candidate never mentioned, and a requirement naming formal management is not satisfied by assuming a senior title probably included it.",
          "The second rule: never soften a genuine GAP into a false MET, and never round a PARTIAL up because the rest of the profile looks strong. Both point the same direction, toward an honest map, because the candidate reading the output is the one who will be asked about these claims later.",
        ],
      },
      {
        heading: "What the worked example shows, as an ai skill to check if you meet job requirements",
        body: [
          "The reference file walks all five requirements from a real looking posting against one candidate's real background in full. Three come back MET, with the exact supporting sentence quoted for each. One comes back PARTIAL, informal mentoring against a requirement for formal direct reports. One comes back GAP, a requirement for attribution modeling experience the candidate's own account rules out rather than stretches to fit.",
          "Reading that example end to end shows what a comfortable, softened version of the same match would have looked like, and why each softened reading would have been false.",
        ],
      },
      {
        heading: "How this differs from checking a cover letter or auditing a resume's bullets",
        body: [
          "The resume bullet audit skill on this site checks the construction quality of bullets already written, quantified impact, an action verb lead, no vague filler, against a fixed checklist, never against a specific job posting.",
          "The cover letter fact check skill checks a different artifact: a finished cover letter draft, sentence by sentence, for claims that outrun the candidate's real background material, sorting each into supported, embellished, or unsupported. It starts from something already written. This skill starts earlier, before any cover letter exists, and produces a structured, requirement by requirement map built directly from the posting and the raw background material, the map a later cover letter often gets built around.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not draft a resume or a cover letter, and it will not decide whether the candidate should apply. It will not soften a GAP or a PARTIAL to make an application look stronger, and it will not manufacture experience the candidate did not supply, however plausible that experience would sound sitting next to the requirement it would satisfy. The map is the input to a decision, never the decision itself.",
        ],
      },
    ],
    howTo: {
      name: "How to compare your background to a job posting",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/requirement-match-worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Paste in the full posting and your real background",
          text: "Supply every stated requirement from the posting, not a paraphrase, alongside your real work history and skills in your own words, not a polished resume summary.",
        },
        {
          name: "Read every verdict before deciding whether to apply",
          text: "Work through the MET, PARTIAL, and GAP list in full, since the PARTIAL entries usually name exactly what a cover letter should address directly.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly does a job posting requirement match skill check?",
        answer:
          "Every stated requirement in a real job posting, checked one at a time against a candidate's real background material, and marked MET, PARTIAL, or GAP with the specific evidence or missing piece named beside it, rather than a single overall fit impression.",
      },
      {
        question: "Will it ever mark something MET without real evidence behind it?",
        answer:
          "No. A requirement is only marked MET when the background material supplied contains a line that fully satisfies it, including any qualifier the requirement names. If nothing in the material supports it, the requirement is reported as a GAP instead, never inferred from an adjacent skill or a similar sounding title.",
      },
      {
        question: "How is this different from the cover letter fact check skill?",
        answer:
          "The cover letter fact check skill checks claims in a cover letter draft that already exists against real background material and a posting, sorting each claim into supported, embellished, or unsupported. This skill starts earlier, before any cover letter exists, and produces a structured map of every requirement in the posting against the raw background material directly.",
      },
      {
        question: "How is this different from the resume bullet audit skill?",
        answer:
          "The resume bullet audit skill checks the construction quality of existing resume bullets against a fixed four part checklist, quantified impact, an action verb lead, no vague filler, no unbacked superlative, and never compares those bullets to any specific job posting. This skill does the opposite: it starts from a specific posting's stated requirements and checks each one against real background material.",
      },
      {
        question: "What happens when a requirement is only partly matched?",
        answer:
          "It is marked PARTIAL rather than MET or GAP. The output states precisely what is missing, for example a shorter duration than the requirement names or informal experience where the requirement asks for a formal one, so the candidate knows exactly what a cover letter or an interview answer needs to address.",
      },
      {
        question: "Can I use this on more than one job posting?",
        answer:
          "Yes. Run it separately for each posting, since requirements vary even across similar sounding roles, and a MET on one posting's SQL requirement does not automatically transfer to another posting that names a different tool or a different scope.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no job posting or background material anyone eventually uses the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/career-skills/cover-letter-fact-check-skill",
        label: "cover letter fact check skill",
        description: "Checks a finished cover letter draft's claims against real background material and a posting, a different artifact and check from a requirement by requirement map.",
      },
      {
        href: "/skills/career-skills/resume-bullet-audit-skill",
        label: "resume bullet audit skill",
        description: "Audits the construction quality of existing resume bullets against a fixed checklist, never against a specific job posting's requirements.",
      },
      {
        href: "/career-prompts/skills-gap-prompt",
        label: "skills gap prompt",
        description: "Aggregates requirements across several postings to plan a learning path, rather than mapping one posting's requirements against your real background.",
      },
      {
        href: "/career-prompts/cover-letter-prompt",
        label: "cover letter prompt",
        description: "A natural next step once the MET and PARTIAL requirements are mapped, since a strong cover letter is built directly from that evidence.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.indeed.com/career-advice/finding-a-job/job-requirements",
        label: "Indeed: What Are Job Requirements?",
        description: "An independent breakdown of the qualification types a posting typically names, useful background for extracting a full requirement list.",
      },
      {
        href: "https://www.onetonline.org/",
        label: "O*NET Online",
        description: "The US Department of Labor occupational database, a reference for which skills and qualifications genuinely define a role.",
      },
      {
        href: "https://www.wright.edu/human-resources/writing-an-effective-job-description",
        label: "Wright State University: Writing an Effective Job Description",
        description: "A university HR guide distinguishing required from preferred qualifications, the same distinction this skill preserves when it extracts a posting's requirements.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a requirement match.",
      },
    ],
  },

  tags: ["career", "job search", "job posting", "resume", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

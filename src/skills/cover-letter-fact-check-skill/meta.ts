import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Cover Letter Fact Check

Use this skill after a cover letter draft already exists and before it gets sent, to check
every specific claim in that draft against the candidate's real, supplied background material
and the actual job posting the letter responds to. This skill does not write a cover letter.
It checks one that someone else, a person or another prompt, already wrote.

## The three required inputs

Do not run a check with anything less than all three of the following, supplied in full:

1. The cover letter draft, exactly as written, word for word.
2. The actual job posting text, pasted in full, not a paraphrase or a job title alone.
3. The candidate's real background material: a resume, notes on real projects, or any other
   written record of what the candidate has actually done.

If any one of the three is missing, say so plainly and ask for it before proceeding. A claim
cannot be checked against a job posting that was never supplied, and a claim cannot be traced
to background material that was never supplied either. Do not proceed on a partial set of
inputs and produce a review that looks complete when it is not.

## Extracting every specific claim

Read the draft cover letter sentence by sentence and pull out every specific claim: a skill
claimed, an achievement stated, a metric cited, a project referenced, a title held, a duration
worked, or an outcome attributed to the candidate. A general statement of interest such as
"I am drawn to this role" is not a claim to check. A specific factual assertion such as "I led
the migration that cut deployment time by 40 percent" is.

List every claim extracted before checking any of them, quoted exactly as written in the draft,
so the person reviewing the output can see the full set being checked, not only the ones that
end up failing.

## Checking each claim against the real background material

For every claim extracted, search the candidate's real background material for the closest
matching fact. A claim passes only when it is directly traceable to something stated in that
material, not to something plausible sounding or merely adjacent to what is written there.

Three outcomes are possible for each claim:

- Supported: the claim matches a fact stated in the background material, including the scope
  and scale of what is claimed. Quote the line in the background material that supports it.
- Embellished: something in the background material is genuinely related, but the draft has
  expanded its scope, scale, seniority, or certainty beyond what the material supports, for
  example a project one contributor helped with becomes something the candidate led, or a
  modest, local improvement becomes something described as company wide.
- Unsupported: nothing in the background material traces to the claim at all. The claim appears
  invented, either from a general assumption about someone at that level or by echoing language
  from the job posting itself.

## Using the job posting as pressure, not as evidence

Compare the draft against the job posting for one specific failure pattern: language lifted
from the posting and echoed back as a claim about the candidate, with that claim absent from
the real background material. A posting that asks for "cross functional leadership experience"
followed by a draft that claims exactly that, with nothing in the background material to back
it, is the single most common shape this failure takes. The job posting explains why a claim
might have been embellished. It is never itself evidence that the claim is true.

## Reporting the result

For every claim that is not fully supported, report in this order: the exact sentence quoted
from the draft, which outcome it received, and, where anything in the background material comes
closest to supporting it, that closest material quoted alongside a plain statement of how far
the draft has gone beyond it. Close with a short summary: how many claims were checked, how many
were supported outright, how many were embellished, and how many were unsupported.

Do not soften an embellished or unsupported claim into a supported one to make the review look
cleaner, and do not rewrite the letter as part of this check. The output is a report on what is
currently written, not a replacement draft.

## What this skill does not do

It does not write a cover letter from scratch, and it does not draft replacement sentences for
a claim that fails the check. It does not accept a claim because it sounds reasonable for
someone at that level, or because the job posting describes exactly that kind of experience.
It accepts a claim only when it is directly traceable to the real background material supplied
for that specific check.
`;

const CLAIM_TRACE_EXAMPLE_MD = `# Worked example: tracing one embellished claim back to real material

Use this alongside \`SKILL.md\` as a model for how a single flagged claim should read: specific,
quoting the exact sentence, and naming the closest real material without inventing anything
beyond what that material actually supports.

## The candidate's real background material, as supplied

"Worked on the support team at a 40 person software company for two years. Was part of a three
person group that rebuilt the onboarding email sequence in the second year. The team lead ran
the project; wrote the copy for four of the seven emails and tested them against open rates.
Open rate on the sequence went from 22 percent to 31 percent after the rebuild. Also handled
the day to day ticket queue, an average of 35 tickets a week."

## The job posting, as supplied

"We are hiring a Marketing Coordinator to own lifecycle email campaigns end to end, from
strategy through execution, and to lead cross functional projects that improve how new
customers experience our product."

## The cover letter draft, as supplied

"In my most recent role, I led a complete overhaul of our email onboarding sequence, driving
open rates up by nearly 40 percent and transforming how new customers experienced our product
from day one."

## The claim extracted

"I led a complete overhaul of our email onboarding sequence, driving open rates up by nearly
40 percent and transforming how new customers experienced our product from day one."

## The check

Supported by the background material: an onboarding email sequence rebuild happened, and open
rates did rise, from 22 percent to 31 percent.

Not supported: three specific elements of the claim outrun the background material.

1. "I led" is not supported. The background material states a team lead ran the project and the
   candidate was one of three people on it, responsible for the copy on four of the seven
   emails and for testing them.
2. "nearly 40 percent" is not supported as stated. The recorded change is 22 percent to 31
   percent, a rise of 9 percentage points, and the draft states an unqualified, much larger
   figure with no basis in the material supplied.
3. "transforming how new customers experienced our product from day one" is not supported.
   Nothing in the background material describes a change to the customer experience beyond the
   email sequence itself, and this phrase also echoes language from the job posting rather than
   from anything the candidate actually reported doing.

## The flag, as it should appear in the output

Claim: "I led a complete overhaul of our email onboarding sequence, driving open rates up by
nearly 40 percent and transforming how new customers experienced our product from day one."

Outcome: embellished.

Closest real material: "Was part of a three person group that rebuilt the onboarding email
sequence in the second year. The team lead ran the project; wrote the copy for four of the
seven emails and tested them against open rates. Open rate on the sequence went from 22 percent
to 31 percent after the rebuild."

How far the draft goes beyond it: the draft turns a three person project with a named team lead
into something the candidate personally led, restates a 22 to 31 percent open rate change as
"nearly 40 percent" with no qualification, and adds a claim about transforming the overall
customer experience that both outruns the background material and echoes the job posting's own
wording rather than anything the candidate reported.

## What a corrected claim looks like, built only from the real material

"As one of three people on the team that rebuilt our onboarding email sequence, I wrote and
tested four of the seven emails, helping lift the sequence's open rate from 22 percent to 31
percent." Every word of that sentence traces back to the background material supplied, with
nothing added and nothing rounded up.
`;

const meta: SkillMeta = {
  slug: "cover-letter-fact-check-skill",
  name: "Cover Letter Fact Check",
  title: "Cover Letter Fact Check Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that checks every specific claim in a cover letter draft against the candidate's real background material and the actual job posting, and flags anything embellished or invented with the exact sentence quoted.",

  seo: {
    primaryKeyword: "cover letter fact check skill",
    keywords: [
      "cover letter fact check skill",
      "free ai skill to check cover letter claims",
      "downloadable cover letter fabrication checklist",
      "ai skill to verify a cover letter against a resume",
      "how to check a cover letter for fabricated claims",
    ],
    seoTitle: "Cover Letter Fact Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable cover letter fact check skill that checks every claim in a draft against the candidate's real background material and the job posting.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/claim-trace-example.md", content: CLAIM_TRACE_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check a cover letter draft against real background material default to accepting a claim as plausible whenever it fits the tone of the letter, rather than tracing it to a specific line in the material supplied. Left unchecked, a project one person contributed to becomes a project the candidate led, and a modest metric gets rounded up into a stronger one. This skill's instructions require every claim to be traced to a specific quote in the real background material before it can pass, and require an embellished or unsupported claim to be flagged with the exact sentence and the closest real material behind it.",
  },

  article: {
    intro: [
      "A cover letter draft can read confidently and still contain a claim nobody could actually stand behind in an interview. A cover letter fact check skill exists for that moment: after a draft is written, before it gets sent, when every specific claim needs checking against what the candidate can actually prove, not against how convincing the sentence sounds.",
      "That check needs three pieces of real material at once: the draft itself, the actual job posting it responds to, and the candidate's real background, a resume or notes describing what genuinely happened at work. Without all three, there is nothing to trace a claim back to.",
      "This skill ships as two plain text files, a main instructions file and a worked reference example that traces one embellished claim from a real cover letter back to the background material it should have stayed inside of. Both are previewable in full before you download the zip.",
    ],
    sections: [
      {
        heading: "Why a cover letter needs a fact check pass of its own",
        body: [
          "Writing a cover letter and checking one for accuracy pull in opposite directions. Writing rewards a confident, persuasive sentence. Checking rewards the opposite instinct: does this sentence hold up against something real, or only against how it sounds. The momentum of drafting a strong sentence makes it easy to keep writing past the point where the evidence runs out.",
          "That is the gap a free ai skill to check cover letter claims is built to close. Handed a draft that already exists, it asks one question about every sentence in it: what, exactly, is this claim resting on.",
        ],
      },
      {
        heading: "The three inputs a cover letter fact check skill refuses to work without",
        body: [
          "A downloadable cover letter fabrication checklist is only as good as what it checks the draft against, which is why this skill will not proceed on a partial set of inputs. The draft shows what was written. The posting shows what the employer asked for. The candidate's real background material is the only one of the three that can confirm or contradict a specific claim.",
          "Missing any one of the three, the skill says so and asks for it, rather than producing a review that looks thorough while skipping the part that would have caught the real problem.",
        ],
      },
      {
        heading: "How a claim earns a supported, embellished or unsupported verdict",
        body: [
          "Every specific claim pulled from the draft, a skill named, an achievement stated, a project referenced, gets checked against the background material and sorted into one of three outcomes. A supported claim matches the material in scope as well as substance. An embellished claim is rooted in something real but has grown past what the material shows, in scale, seniority, or how solely the candidate is credited. An unsupported claim has nothing behind it at all.",
          "As an ai skill to verify a cover letter against a resume, the distinction matters because the fix differs. An embellished claim needs scaling back to what actually happened. An unsupported claim needs to come out entirely.",
        ],
      },
      {
        heading: "Worked example: how a cover letter fact check skill traces one embellished claim",
        body: [
          "The reference file walks a single case in full: a background summary describing a three person project with a named team lead, a job posting asking for cross functional leadership, and a draft sentence that turns the candidate into the sole leader while rounding a real 9 percentage point rise in open rate into a vaguer, larger sounding figure.",
          "The flag raised against that sentence quotes it exactly, states the verdict, quotes the closest real material back, and spells out how far the draft strayed from it, along with what a corrected version looks like once rebuilt from only the real material supplied.",
        ],
      },
      {
        heading: "How this differs from the cover letter prompt, and from the other career skills",
        body: [
          "The cover letter prompt on this site is a drafting tool: it builds a letter from scratch around evidence someone supplies. This skill starts after a letter already exists and checks it, a different job with a different failure mode to guard against, a plausible draft versus a claim that quietly outruns the evidence.",
          "It also sits beside, rather than repeats, the resume bullet audit skill and the interview answer structure skill. The resume bullet audit skill checks bullets already on a resume against a fixed four part checklist, and the interview answer structure skill sorts a spoken story into Situation, Task, Action and Result. This skill's artifact is neither: a finished cover letter, checked sentence by sentence against a job posting and real background material for claims that cannot be traced back to something true.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not write a cover letter from scratch, and it will not draft replacement sentences for a claim that fails the check. It will not accept a claim purely because it sounds reasonable for someone at that career stage, or because the job posting describes exactly that kind of experience. The posting explains why a claim might have been shaped that way. It is never proof the claim is true.",
        ],
      },
    ],
    howTo: {
      name: "How to check a cover letter for fabricated claims",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/claim-trace-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather all three real inputs",
          text: "Collect the finished cover letter draft, the actual job posting text pasted in full, and the candidate's real background material, a resume or honest notes on real experience, before starting a check.",
        },
        {
          name: "Work through every flag with real answers",
          text: "Where a claim is flagged as embellished or unsupported, either scale it back to what the background material actually shows or remove it, rather than defending the original wording without new evidence.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as real background material for this skill?",
        answer:
          "A resume, honest notes on real projects, performance review text, or any other written record of what the candidate has actually done. It has to describe things that genuinely happened, in the candidate's own words or an employer's, rather than a rough sketch of the kind of work someone at that level typically does.",
      },
      {
        question: "Will it flag a claim just because the background material does not mention it directly?",
        answer:
          "Yes, and that is the point. A claim only passes when it is directly traceable to the material supplied. If nothing in that material supports it, even a claim that sounds entirely plausible for the role gets marked unsupported rather than waved through on the strength of how reasonable it sounds.",
      },
      {
        question: "How is this different from the cover letter prompt on this site?",
        answer:
          "The cover letter prompt drafts a new letter from evidence a person supplies. This skill checks a letter that already exists, sentence by sentence, against the candidate's real background material and the job posting, looking specifically for claims that have been embellished or invented rather than helping to write the letter in the first place.",
      },
      {
        question: "Does the job posting count as evidence that a claim is true?",
        answer:
          "No. The job posting only explains what an employer is asking for, which is exactly why a claim that echoes the posting's own language deserves closer scrutiny rather than less. A claim is only supported when it is traceable to the candidate's real background material, never to the posting itself.",
      },
      {
        question: "What happens to a claim that is only partly true?",
        answer:
          "It is marked embellished rather than supported or unsupported. The report quotes the exact sentence, quotes the closest real material behind it, and states plainly how far the draft has gone beyond what that material actually shows, so the fix is scaling the claim back rather than deleting it outright.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and none of the cover letter, job posting, or background material anyone eventually checks with this skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/career-prompts/cover-letter-prompt",
        label: "cover letter prompt",
        description: "For drafting a new cover letter from scratch around real evidence, the natural step this skill's fact check runs after, not instead of.",
      },
      {
        href: "/skills/career-skills/resume-bullet-audit-skill",
        label: "resume bullet audit skill",
        description: "Checks the resume bullets a candidate already has, the same kind of real background material this skill traces a cover letter's claims back to.",
      },
      {
        href: "/skills/career-skills/interview-answer-structure-skill",
        label: "interview answer structure skill",
        description: "Applies the same never invent a detail discipline to a spoken interview story instead of a written cover letter draft.",
      },
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description: "For drafting a single new resume bullet from raw facts, a common source of the real evidence this skill checks a cover letter's claims against.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.shrm.org/topics-tools/news/talent-acquisition/liar-liar-resume-fire",
        label: "SHRM: Liar, Liar, Resume on Fire",
        description: "Independent survey data on how often application claims are exaggerated or fabricated, and how often screening actually catches it.",
      },
      {
        href: "https://www.themuse.com/advice/how-to-write-a-cover-letter-31-tips-you-need-to-know",
        label: "The Muse: How to write a cover letter",
        description: "Independent guidance on what a cover letter is supposed to demonstrate, useful context for why an unsupported claim undermines the whole letter.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-employers-need-know",
        label: "FTC: Using Consumer Reports, What Employers Need to Know",
        description: "The federal background on employment background checks, the process that eventually tests whether an application claim was accurate.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a claim check.",
      },
    ],
  },

  tags: ["career", "cover letter", "job search", "fact check", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

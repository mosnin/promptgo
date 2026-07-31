import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Career Gap Explanation Honesty Check

Use this skill whenever someone needs help putting a real employment gap into words, either
as a short resume line or as a spoken answer to "walk me through what happened here," and
wants that explanation to be honest, concise and matter of fact rather than defensive or
inflated.

## Before phrasing anything

Ask for the actual real reason the gap happened: caregiving for a family member, a layoff or
role elimination, a health issue, further study or a certification, or a job search that
simply took longer than expected. Do not proceed until you have the real reason. A vague
input such as "just say something that sounds good" is not a reason, it is a request to
invent one, and this skill does not accept that request. See "The refuse to fabricate
discipline" below for exactly how to respond when that happens.

Also ask how long the gap actually was and whether the person is applying with a resume, an
interview, or both, since a resume line and a spoken answer are sized differently even when
they describe the same real gap.

## The refuse to fabricate discipline

If the person asks for help inventing a more flattering but false reason, for example turning
a layoff into a claimed sabbatical, or claiming freelance work that never happened, decline
plainly and explain why: a fabricated reason that is later contradicted by a reference call,
a background check, a former colleague, or a simple LinkedIn date mismatch is a far bigger
problem than an honestly stated gap ever was. An honest gap gets explained once and closed. A
discovered lie reopens the whole application and often ends it on the spot, for a reason that
had nothing to do with the actual gap.

After declining, redirect immediately to the real reason. Ask what actually happened, then
help phrase that real reason concisely. Never leave the person without a usable next step
just because the fabricated version was refused.

## Phrasing the real reason concisely

Once you have the real reason, write it as one to three sentences that do the following, in
order: name what happened in neutral, factual language, state briefly what the person did
during or because of it if anything is worth mentioning, and then move on to their current
readiness or what they want to do next. Do not pad this with extra sentences of apology or
justification. A gap does not require a defense; it requires a plain statement of fact.

Match the length to the medium. A resume line is usually one short phrase or sentence, for
example a line under the relevant dates such as "Family caregiving leave" or "Role
eliminated in a company restructuring." A spoken interview answer can run two to three
sentences, since the person is also expected to sound natural, but it should still end by
turning toward the role being discussed rather than continuing to explain the gap itself.

## Checking the draft before returning it

Read the drafted explanation back against three checks. First, does every sentence come from
something the person actually told you, with nothing added that they did not say. Second, is
it free of over apologising, hedging, or repeated justification, phrases like "I know this
looks bad but" or three separate sentences all restating the same excuse. Third, does it stop
once the real reason has been stated, rather than continuing to explain past the point where
an interviewer or reader needs more.

If a check fails, do not silently shorten or pad the draft. Say plainly which check failed
and rewrite only the part that failed it, the same way an over-long draft gets trimmed back to
the real substance and an under-explained draft gets one more concrete detail the person
actually gave you, never an invented one.

## Adjusting for the specific type of gap

Caregiving, layoffs, health issues, further study and an extended job search each carry a
different amount of detail that is actually useful to share. A layoff needs almost no
elaboration beyond the fact of it. A caregiving or health gap needs only as much detail as the
person is comfortable disclosing, since neither requires a medical or family history to be
credible. Further study or a certification usually benefits from naming the specific
qualification. Consult \`reference/gap-phrasing-examples.md\` for a worked, concise phrasing of
each type before drafting a new one from scratch.

## What this skill does not do

It does not invent a cover story, a job title, a freelance client, a diagnosis, or any other
detail the person did not actually give it, even when asked directly to do so. It does not
write a lengthy justification where a single plain sentence is enough, and it does not leave a
real gap unexplained by defaulting to silence when the person asked for help. The only
acceptable input is what actually happened, and the only acceptable output is that same real
reason, said plainly.
`;

const GAP_PHRASING_EXAMPLES_MD = `# Worked examples: phrasing a real gap concisely and honestly

Use this alongside \`SKILL.md\` as a model for length and tone. Every example below starts from
a real reason as a person might first describe it, then shows a resume line and a short spoken
version, both built only from that real reason with nothing invented.

## Caregiving

Real reason as given: "I stopped working for about a year and a half to look after my mother
after her stroke. There wasn't really anyone else who could do it full time."

Resume line: "Family caregiving leave, 2024 to 2025."

Spoken version: "I stepped away from work for about a year and a half to care for a family
member after a serious health event. That responsibility has eased, and I'm ready to be fully
back in a full time role."

What was left out on purpose: no diagnosis, no family member's name, no detail about the
household situation beyond what explains the gap. None of that is needed for the explanation
to be complete or honest.

## Layoff or role elimination

Real reason as given: "My whole department got cut when the company merged with a bigger
firm. It wasn't performance related, they just eliminated the entire team."

Resume line: "Role eliminated in a company restructuring, 2025."

Spoken version: "My role was eliminated when my company restructured after a merger, along
with the rest of my department. It wasn't performance related, and I used the time since to
sharpen my skills and look for the right next fit."

What was left out on purpose: no name of the acquiring company unless directly asked, no
editorialising about the employer, no extra sentence defending the layoff further once the
fact of it has been stated plainly.

## Health issue

Real reason as given: "I had a health problem that needed surgery and a few months to
recover properly. It's fully resolved now, I just didn't want to rush back before I was
actually ready."

Resume line: "Medical leave, spring to summer 2025."

Spoken version: "I took a few months off for a personal health matter that required surgery
and recovery time. It's fully resolved, and I'm cleared and ready to work at full capacity
again."

What was left out on purpose: no diagnosis, no procedure name, no detail beyond what confirms
the issue is resolved. A candidate is never obligated to disclose more than this to explain a
health related gap honestly.

## Further study or certification

Real reason as given: "I left my job to finish a certification I'd been putting off for
years. It took about eight months full time because I wanted to actually focus on it properly."

Resume line: "Completed [certification name], full time study, 2025."

Spoken version: "I took eight months away from full time work to complete a certification I'd
been wanting to finish for a while. I'm now applying that directly to roles like this one."

What was left out on purpose: no inflated claim about how the certification transformed their
skill set beyond what is true, no invented coursework that was not actually completed.

## Extended job search

Real reason as given: "Honestly the search just took longer than I expected. I was looking
the whole time, it just took nine months to land something that was actually a good fit."

Resume line: no separate line is usually needed; a gap of this kind is often best left to the
interview answer rather than a resume annotation.

Spoken version: "The search took longer than I expected, closer to nine months, because I was
holding out for the right fit rather than taking the first offer. I used that time to stay
sharp and be selective, and this role is exactly the kind of fit I was looking for."

What was left out on purpose: no invented freelance projects or consulting work to fill the
months if none actually happened. An honestly stated long search is a normal, explainable gap
on its own and does not need a fabricated occupation layered on top of it.
`;

const meta: SkillMeta = {
  slug: "career-gap-explanation-honesty-skill",
  name: "Career Gap Explanation Honesty Check",
  title: "Career Gap Explanation Honesty Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that turns a candidate's real employment gap reason into a concise, honest resume line or spoken explanation, and refuses to invent a more flattering cover story.",

  seo: {
    primaryKeyword: "career gap explanation honesty skill",
    keywords: [
      "career gap explanation honesty skill",
      "free ai skill for explaining employment gaps",
      "downloadable career gap honesty checklist",
      "ai skill to explain a resume gap honestly",
      "employment gap explanation skill for job seekers",
    ],
    seoTitle: "Career Gap Explanation Honesty Skill: Free Download",
    seoDescription:
      "A free, downloadable career gap explanation honesty skill that phrases a real employment gap concisely for a resume or interview, and never invents a cover story.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/gap-phrasing-examples.md", content: GAP_PHRASING_EXAMPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to help explain an employment gap, models often default to suggesting a more flattering but false cover story, such as reframing a layoff as a sabbatical or inventing freelance clients that never existed, rather than helping phrase the real reason concisely. This skill requires the actual real reason as input, declines to draft a fabricated alternative even when asked directly, and shapes an honest, matter of fact explanation sized to the gap rather than padded with unnecessary justification.",
  },

  article: {
    intro: [
      "A career gap explanation honesty skill only earns its name if it can do the one thing most AI assistants get wrong here: refuse to invent a better story. Handed a real employment gap and asked to make it sound good, most assistants will happily suggest reframing a layoff as a sabbatical or inventing a freelance client that never existed. This skill is built to do the opposite, and to do it without turning a short, normal gap into three defensive paragraphs.",
      "It takes the candidate's actual real reason, whether that is caregiving, a layoff, a health issue, further study, or a job search that simply took longer than planned, and shapes it into a resume line or a short spoken answer that states the fact plainly and stops there. That is why this is offered as a free ai skill for explaining employment gaps rather than a script generator that polishes over the real story.",
      "It ships as two plain text files: a main instructions file and a worked reference of concisely phrased real examples across five gap types. Both are previewable in full on this page before you download the zip, and both are exactly what a candidate or a career coach receives once the archive is handed over.",
    ],

    sections: [
      {
        heading: "Why the real reason is the only acceptable input",
        body: [
          "This skill will not phrase a gap it has not actually been told the truth about. Its first instruction is to ask for the real reason behind the gap and to hold off on drafting anything until that reason is supplied, whether that is caregiving for a family member, a role that was eliminated, a health issue, a period of further study, or a job search that ran longer than expected.",
          "That constraint exists because a phrased explanation only works if the candidate can say it aloud without contradicting themselves later. A reason that never happened cannot survive a specific follow up question, and it puts the candidate at risk the moment anyone checks it.",
        ],
      },
      {
        heading: "The refuse to fabricate discipline",
        body: [
          "This is the core constraint the whole skill is built around. If a candidate asks for a more flattering but false reason, such as turning a layoff into a claimed sabbatical, the skill declines plainly and explains why: a fabricated reason that gets contradicted later, by a reference call, a background check, a former colleague, or even a simple date mismatch on LinkedIn, is a far bigger problem than an honestly stated gap ever was.",
          "After declining, the skill redirects immediately back to the real reason and helps phrase that instead, since an honest gap stated once and stated well closes the topic, while a discovered lie reopens the entire application for a reason that had nothing to do with the original gap.",
        ],
      },
      {
        heading: "How this differs from the interview answer structure skill",
        body: [
          "The interview answer structure skill sorts a real work story into Situation, Task, Action and Result so a candidate can talk through something they accomplished. This skill has a narrower and different job: phrasing the fact of a gap itself, the period where nothing was being accomplished at a job, concisely enough that it stops being a source of anxiety rather than something that needs a four part structure to defend.",
          "The two are meant to be used together. A candidate might phrase the gap itself with this skill, then use the interview answer structure skill separately if a specific accomplishment from during or after the gap needs its own fuller story.",
        ],
      },
      {
        heading: "Phrasing the real reason concisely, as an ai skill to explain a resume gap honestly",
        body: [
          "Once the real reason is known, the skill writes it as one to three sentences: what happened, stated in neutral language, briefly what the person did if anything is worth mentioning, and then a turn toward current readiness. It does not pad the explanation with apology or repeated justification, because a gap is a fact to state, not a case to argue.",
          "Length is matched to the medium. A resume line is usually a short phrase under the relevant dates. A spoken interview answer can run slightly longer since it needs to sound natural, but it still ends by turning the conversation back toward the role rather than continuing to explain the gap.",
        ],
      },
      {
        heading: "Adjusting the phrasing across different gap types",
        body: [
          "Caregiving, layoffs, health issues, further study and an extended job search each call for a different amount of useful detail. A layoff needs almost no elaboration past the fact of it. A caregiving or health gap needs only what the candidate is comfortable disclosing, since neither requires medical or family detail to be credible or complete.",
          "The bundled reference file works through a concise, honest example of each of these five gap types side by side, as a downloadable career gap honesty checklist and employment gap explanation skill for job seekers moving across very different situations, rather than starting from a blank page each time.",
        ],
      },
      {
        heading: "How to use the downloaded files",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file points to the worked reference examples by their relative path. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that reference so the phrasing patterns stay available while drafting a new explanation.",
        ],
      },
    ],

    howTo: {
      name: "How to use the career gap explanation honesty skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/gap-phrasing-examples.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Write down the actual real reason",
          text: "Before using the skill, write down what genuinely happened during the gap, including details you are unsure sound impressive, rather than a version already smoothed over.",
        },
        {
          name: "Hand the real reason to your assistant",
          text: "Give the real reason and whether you need a resume line, a spoken answer, or both, and let the skill phrase it concisely rather than asking it to invent a better story.",
        },
      ],
    },

    faq: [
      {
        question: "Can this skill help me make up a reason for my gap?",
        answer:
          "No. The skill's instructions explicitly refuse to invent a more flattering but false reason, even if directly asked, and explain why: a fabricated story that gets contradicted later by a reference or a background check is a far bigger problem than an honestly stated gap. It will always redirect to helping phrase the real reason instead.",
      },
      {
        question: "What if my gap barely needs any explanation at all?",
        answer:
          "Then the skill keeps the explanation just as short as that. A layoff or a short caregiving period often only needs one plain sentence, and the skill is built to avoid padding a simple, honest fact with unnecessary apology or repeated justification just to seem thorough.",
      },
      {
        question: "How is this different from the interview answer structure skill?",
        answer:
          "That skill structures a real accomplishment story into Situation, Task, Action and Result. This skill has a narrower job: phrasing the fact of the gap itself concisely, whether on a resume or spoken aloud, so it stops feeling like something that needs defending.",
      },
      {
        question: "Does this work for a caregiving or health gap, not just a layoff?",
        answer:
          "Yes. The bundled reference file works through concise phrasing for caregiving, a layoff, a health issue, further study, and an extended job search, and the main instructions apply the same discipline of stating the real reason plainly across every one of those situations.",
      },
      {
        question: "Will it help with the resume line as well as the spoken interview answer?",
        answer:
          "Yes, both. The skill asks whether you need a resume line, an interview answer, or both, since the two are sized differently even when they describe the exact same real gap, and phrases each one to match the medium it will actually appear in.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the real gap reason you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],

    internalLinks: [
      {
        href: "/skills/career-skills/interview-answer-structure-skill",
        label: "interview answer structure skill",
        description: "For structuring a real accomplishment story into Situation, Task, Action and Result, once the gap itself has already been phrased.",
      },
      {
        href: "/skills/career-skills/cover-letter-fact-check-skill",
        label: "cover letter fact check skill",
        description: "A sibling fabrication-prevention skill that checks claims already written against real background material rather than phrasing a new explanation.",
      },
      {
        href: "/career-prompts/career-change-prompt",
        label: "career change prompt",
        description: "For framing the broader narrative of a transition once the gap itself has been honestly explained.",
      },
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description: "For writing the surrounding resume bullets that sit above and below the gap line this skill phrases.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.indeed.com/career-advice/resumes-cover-letters/employment-gaps-on-resume",
        label: "Indeed: How to explain employment gaps on your resume",
        description: "An independent explainer on stating a resume gap honestly and consistently across a resume, cover letter and interview.",
      },
      {
        href: "https://www.shrm.org/topics-tools/news/talent-acquisition/how-to-evaluate-resume-employment-gaps",
        label: "SHRM: How to evaluate resume employment gaps",
        description: "A human resources industry perspective on how hiring managers actually weigh a disclosed gap against an unexplained one.",
      },
      {
        href: "https://hbr.org/2021/02/how-to-fill-an-employment-gap-on-your-resume",
        label: "Harvard Business Review: How to fill an employment gap on your resume",
        description: "A business press explainer on presenting a real career gap clearly and confidently without over justifying it.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a real gap reason.",
      },
    ],
  },

  tags: ["career", "employment gap", "honesty", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

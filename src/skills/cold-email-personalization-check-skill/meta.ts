import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Cold Email Personalization Check Skill

Use this skill when you have a cold outreach email draft and the real research
or context the sender actually holds about the recipient, and you need to know
whether the email's personalized details are genuinely traceable to that
research or are generic filler dressed up to look personal. This is a
verification skill, not a writing skill: it checks what is already on the
page, and it never proposes a new personalization detail of its own.

## What counts as input

Two things are required before any check can run:

1. The email draft, exactly as written, including the subject line if one
   exists.
2. The real research or context the sender actually has about the recipient:
   their real company, their real role, and any specific trigger such as a
   funding announcement, a job posting, a conference talk, a LinkedIn post,
   or a support ticket they filed.

If either piece is missing, say so and stop. A check without the research
input is a guess wearing a verdict, and a check without the email draft has
nothing to check. Do not proceed on a partial input by inferring the missing
half yourself.

## The rule every verdict has to pass

Every claim in the email draft that reads as personalized, meaning it implies
the sender knows something specific about this recipient rather than any
recipient in their role, must be checked against the research supplied.
Nothing else. Not general knowledge about the recipient's industry, not a
plausible guess about what a company that size probably does, not an
inference drawn from the company name alone. Only the research actually
given counts as evidence.

This skill never suggests a plausible sounding personalization detail on its
own, at any point in the process, even when the supplied research is thin
and a stronger detail would obviously help the email land. Filling a gap
with something that sounds right is exactly the failure this skill exists to
catch, and doing it from inside the skill would be the same failure wearing
better cover.

## How to extract the claims

Read the email draft sentence by sentence. A sentence is a personalization
claim if it makes a statement that would not be equally true of every other
person in the recipient's role at a similarly sized company: a specific
detail, a recent event, something the recipient said or did, a named
project, a described problem. A sentence that only uses the recipient's
name, title, or company name in a template slot is not a personalization
claim by itself; it becomes one only if it asserts something specific beyond
that.

List every claim found, quoting the exact sentence it appears in, in the
order the sentences appear in the draft.

## How to check each claim

For every claim on the list, search the supplied research for a line that
supports it. Then assign exactly one verdict:

- REAL: a specific line in the supplied research supports the claim as
  written. Quote the email sentence and the research line side by side.
- FAKE: the claim reads as personal and specific, but nothing in the
  supplied research supports it. Quote the exact sentence from the email and
  state plainly that it is not traceable to anything supplied, even if it
  sounds plausible or is phrased with confidence.
- GENERIC, NOT A PERSONALIZATION CLAIM: the sentence is template language
  that does not assert anything specific about this recipient, so there is
  nothing to trace. Note it and move on without a REAL or FAKE verdict.

A claim that happens to be true in general but is not supported by anything
the sender was actually given is still FAKE. The research supplied is the
only evidence this skill accepts; a detail being independently correct does
not make it traceable if the sender's own notes never mentioned it.

## Reporting the result

Report every claim in the order it appears in the email, its verdict, and
the quoted evidence or the quoted absence of evidence. Close with a one line
count: how many claims were REAL, how many were FAKE, and how many sentences
were generic filler with no personalization claim at all. Lead with the FAKE
count, since it is the strongest signal that a recipient will recognise the
email as a mass send dressed up as personal, which damages reply rates and
sender reputation.

See \`reference/personalization-audit-example.md\` for a full worked example:
real research notes, an email draft with one genuine personalized detail and
one fake one, and the completed check.

## What this skill does not do

It does not rewrite the email. It does not suggest what a stronger
personalization detail would be, even right after flagging a claim as fake,
because doing so would just replace one invented detail with another. It
does not verify whether the supplied research itself is factually accurate;
it only checks whether the email's claims are traceable to what was
supplied, taking that input in good faith. It does not judge tone, length,
subject lines, or the call to action, unless one of those elements itself
makes a personalization claim.
`;

const AUDIT_EXAMPLE_MD = `# Worked example: checking a cold email against real research

This example shows the full check described in SKILL.md, from real research
notes through to a completed verdict on each personalization claim in a
draft email.

## The real research supplied

The sender provided the following notes, and nothing else, about the
recipient:

Recipient: Priya Nair, Head of Data Platform at Ridgeline Foods, a mid-size
food logistics company.

Research: "Two weeks ago Priya posted on LinkedIn that her team had just
finished moving their nightly inventory sync job off an old on-prem SQL
Server box and onto a cloud data warehouse, and that the next project on her
list is fixing what she called flaky ETL jobs that page someone every
Tuesday night. Ridgeline Foods also has an open job posting for a Data
Engineer, Reliability, that mentions an on-call rotation for the pipeline."

That is the entire research input. Nothing about company growth, funding,
headcount, or strategy was supplied.

## The email draft under review

Subject: Tuesday night pages

Hi Priya,

I saw your post about the flaky ETL jobs paging someone every Tuesday night
right after your SQL Server migration. That's exactly the kind of pipeline
reliability problem we help teams fix, usually inside a few weeks.

I also noticed Ridgeline Foods is growing fast and modernizing its whole
data stack, which tells me reliability is probably top of mind for your
team this quarter.

Worth a fifteen minute call to see if the Tuesday pages are still happening?

Priya

## The check

Claim 1: "I saw your post about the flaky ETL jobs paging someone every
Tuesday night right after your SQL Server migration."
Verdict: REAL. This is directly traceable to the supplied research, which
states Priya posted about flaky ETL jobs paging someone every Tuesday night
and the recent move off an on-prem SQL Server box. The email quotes the
detail accurately and attributes it to the correct source.

Claim 2: "I also noticed Ridgeline Foods is growing fast and modernizing its
whole data stack, which tells me reliability is probably top of mind for
your team this quarter."
Verdict: FAKE. Nothing in the supplied research mentions company growth or a
company wide modernization effort; that is an invented framing dressed up
as an observation. "Reliability is probably top of mind" is a guess
presented as a finding, not a detail traced to anything supplied. Flag this
sentence specifically: it is the one a recipient is most likely to
recognise as filler, because it could be sent to any data leader at any
growing company.

Claim 3: "Worth a fifteen minute call to see if the Tuesday pages are still
happening?"
Verdict: GENERIC, NOT A PERSONALIZATION CLAIM. This is a call to action
referencing the already verified Tuesday pages detail, not a new claim
about the recipient, so it carries no separate verdict of its own.

## Summary line for this email

One REAL claim, one FAKE claim, one non-claim. Recommend removing or
rewriting the FAKE sentence before sending; the REAL claim is strong enough
to carry the email on its own, and the FAKE sentence sitting right next to
it undercuts the credibility the real detail earned.

## What made the fake claim easy to catch

The FAKE claim used confident, specific sounding language, "growing fast",
"modernizing its whole data stack", "top of mind", without any of it
tracing to a line in the research. That is the exact pattern this skill is
built to catch: specific sounding language is not the same as specific
evidence. Checking claim by claim against the supplied research, rather than
judging the email's overall tone, is what catches it.
`;

const meta: SkillMeta = {
  slug: "cold-email-personalization-check-skill",
  name: "Cold Email Personalization Check",
  title: "Cold Email Personalization Check Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that checks a cold outreach draft's personalized details against the real research the sender actually has, and flags any detail that is not traceable to it by quoting the exact sentence.",

  seo: {
    primaryKeyword: "cold email personalization check skill",
    keywords: [
      "cold email personalization check skill",
      "free ai skill to check cold email personalization",
      "downloadable cold outreach personalization checklist",
      "ai skill to catch fake personalization in emails",
      "how to spot fake personalization in a cold email",
    ],
    seoTitle: "Cold Email Personalization Check Skill: Free AI Download",
    seoDescription:
      "A free, downloadable cold email personalization check skill that flags fake personalization dressed up as real research, quoting the exact sentence that fails.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/personalization-audit-example.md", content: AUDIT_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check cold email personalization reliably write generic filler that sounds personal, phrases such as noticing rapid growth or a busy quarter, when no real supporting research backs the claim. Recipients recognize that filler on sight, and repeated sends of it are what get a domain flagged, which is why the skill's instructions forbid confirming or inventing any detail the supplied research does not actually contain.",
  },

  article: {
    intro: [
      "A cold email personalization check skill has one job: read a cold outreach draft next to the real research the sender actually has about the recipient, then decide whether each personalized sounding line traces back to that research or is generic filler dressed up to look personal. It never writes the email and never proposes a new detail of its own; it only checks what is already there against what was actually supplied.",
      "This downloadable cold outreach personalization checklist works because a personalized email and an email that merely sounds personalized read almost identically at a glance. Both name the recipient's company and close with a low pressure ask. The only way to tell them apart is to check every specific sounding claim against the sender's actual notes and quote the exact sentence that does or does not hold up.",
      "It ships as two plain text files, previewable in full before download: a main instructions file setting out the rule and three verdicts, and a worked reference example carrying a full check from research notes through a completed verdict on each claim.",
    ],
    sections: [
      {
        heading: "The rule every verdict has to pass",
        body: [
          "Every claim in a draft that reads as personalized has to trace back to a specific line in the research the sender actually supplied, not to general industry knowledge, a plausible guess, or an inference drawn from the company name alone. If the supplied research does not contain it, the claim does not pass, no matter how reasonable it sounds.",
          "The instructions are explicit that this skill never suggests a stronger personalization detail of its own, even when the supplied research is thin. Filling a gap with something plausible is the exact failure the skill exists to catch, so doing it from inside the skill would just move the problem rather than solve it.",
        ],
      },
      {
        heading: "How to spot fake personalization in a cold email",
        body: [
          "The check runs sentence by sentence. A sentence counts as a personalization claim if it says something that would not be equally true of every other person holding that job at a similarly sized company: a recent event, something the recipient said or wrote, a named project, a described problem.",
          "Every claim gets one of three verdicts. REAL means a specific line in the supplied research supports it, quoted alongside the sentence. FAKE means the sentence reads as personal but nothing supplied backs it up. GENERIC means the sentence makes no specific claim at all, so there is nothing to check.",
        ],
      },
      {
        heading: "A worked example: real research, one true detail, one fake one",
        body: [
          "The bundled reference file walks a complete check end to end. The research supplied is a single LinkedIn post about a recipient's flaky nightly ETL job and a matching job posting for a reliability engineer, nothing about company growth. The draft's opening line references that exact detail correctly, which the check marks REAL.",
          "The same draft's second paragraph adds a line noting the company is growing fast and that reliability is probably top of mind this quarter. Neither claim traces to the supplied research; it is confident sounding language standing in for evidence that was never given, so the check marks it FAKE and quotes the exact sentence.",
        ],
      },
      {
        heading: "How this differs from the cold email prompt",
        body: [
          "The cold email prompt on this site writes a new email from a research input and refuses to proceed if that research is too generic. This skill does the opposite job at the other end of the process: it takes an email someone already drafted, by any method, and checks whether its personalized lines match the real research the sender has.",
          "A sender who used the cold email prompt correctly should get a draft with nothing to flag. This skill earns its keep on drafts written another way, or edited afterward in ways that quietly detached a sentence from the evidence that once supported it.",
        ],
      },
      {
        heading: "Why fake personalization hurts more than generic copy",
        body: [
          "A plainly generic email reads as low effort but honest about what it is. An email dressed up with a fake personalization detail reads as an attempt to manufacture trust that was not earned, and recipients who catch the tell react worse to it than to one that never pretended to be personal.",
          "This is why fake claims get flagged by quoting the exact sentence rather than a general impression: a specific quote is checkable, a vague feeling is not. A free ai skill to check cold email personalization only earns that name if its output can be verified against what the sender actually gave it.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "As an ai skill to catch fake personalization in emails, it will not rewrite the flagged email or propose a replacement detail, since a new suggested line would just substitute one invented detail for another. It does not verify whether the supplied research itself is accurate, only whether the email traces to it.",
          "It also will not judge subject lines, tone, or length, unless one of those elements itself makes a personalization claim. Those are separate editorial judgments this skill is not built to make.",
        ],
      },
    ],
    howTo: {
      name: "How to use the cold email personalization check skill",
      steps: [
        {
          name: "Gather the draft and the real research",
          text: "Collect the exact email draft and the sender's actual research notes about the recipient. Both are required before any check can start.",
        },
        {
          name: "List every personalization claim",
          text: "Read the draft sentence by sentence and quote every line that asserts something specific about this recipient, not just their name or company in a template slot.",
        },
        {
          name: "Check each claim against the research",
          text: "For every claim, search the supplied research for a matching line, then assign REAL, FAKE, or GENERIC. Never fill a gap with a guess.",
        },
        {
          name: "Report the verdicts with quotes",
          text: "List each claim, its verdict, and the quoted evidence or absence of it, closing with a count of REAL versus FAKE claims to lead the summary.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as real research for this skill to check against?",
        answer:
          "Anything the sender actually has and can quote: a LinkedIn post, a conference talk, a job posting, a support ticket, or notes from a call. General knowledge about the recipient's industry or a guess about a company that size does not count, because it is not something the sender specifically found out about this recipient.",
      },
      {
        question: "How is this different from the cold email prompt on this site?",
        answer:
          "The cold email prompt writes a new email from a research input and refuses to proceed if that research is too generic. This cold email personalization check skill checks an email that already exists, by any author, against the real research supplied, and flags any personalized sounding line that does not trace back to it.",
      },
      {
        question: "Will the skill suggest a better personalization detail once it flags one as fake?",
        answer:
          "No, and its instructions explicitly forbid it. Suggesting a replacement detail would mean inventing something the sender did not actually verify, which is the exact failure the skill exists to catch. It flags the fake sentence and stops there, leaving the sender to find real evidence or remove the claim.",
      },
      {
        question: "What happens if the email doesn't claim to be personalized at all?",
        answer:
          "Sentences that are plainly template language, using only the recipient's name or company in a generic slot without asserting anything specific, get marked generic rather than forced into a real or fake verdict. A fully generic email returns a report with no real or fake claims and a note that nothing in it claimed specific knowledge.",
      },
      {
        question: "Can the skill tell whether the sender's research notes are actually true?",
        answer:
          "No. It checks whether the email's claims are traceable to the research it was given, taking that research in good faith rather than independently verifying the recipient's LinkedIn post or job posting. Confirming the research is accurate is a separate step the sender still has to do.",
      },
      {
        question: "Why does the skill insist on quoting the exact sentence for a fake claim?",
        answer:
          "A vague note that an email feels generic cannot be checked or acted on. Quoting the exact sentence that lacks supporting evidence gives the sender something specific to remove, rewrite honestly, or go find real evidence for, the same discipline that makes the real verdicts checkable rather than just asserted.",
      },
    ],
    internalLinks: [
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description: "Writes a new cold email from a research input and refuses thin research, rather than checking a draft that already exists against evidence.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description: "The next step once a checked, honest cold email earns a reply and turns into a scheduled conversation.",
      },
      {
        href: "/skills/sales-skills/competitor-battlecard-fact-check-skill",
        label: "competitor battlecard fact check skill",
        description: "The same claim by claim, evidence only discipline applied to competitor claims on a sales battlecard instead of personalization details.",
      },
      {
        href: "/skills/sales-skills/sales-call-review-skill",
        label: "sales call review skill",
        description: "Another verdict and quote pattern, scoring whether a sales call actually covered discovery instead of checking an email draft.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.woodpecker.co/blog/cold-email-personalization/",
        label: "Woodpecker: Cold email personalization",
        description: "An outreach platform's practical breakdown of what separates a genuinely researched cold email from a templated one.",
      },
      {
        href: "https://mailtrap.io/blog/email-deliverability/",
        label: "Mailtrap: Email deliverability guide",
        description: "Explains how sender reputation and recipient engagement, both damaged by emails that read as fake personalization, affect inbox placement.",
      },
      {
        href: "https://www.mailchimp.com/resources/email-personalization/",
        label: "Mailchimp: Email personalization strategies",
        description: "A broader look at personalization built on real customer data rather than surface level template variables.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act compliance guide",
        description: "The authoritative United States standard for what commercial email is required to disclose, relevant to any outreach at volume.",
      },
    ],
  },

  tags: ["sales", "cold email", "personalization", "outreach", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

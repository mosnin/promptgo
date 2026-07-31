import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Event Invite Detail Completeness Check

Use this skill whenever you are handed a real event invitation draft, a
webinar, a launch event, a conference booth invite, a customer dinner, and
asked whether it gives the recipient everything they need to decide and
attend.

This skill only checks a draft that already exists. If you are asked to
write a new invitation from scratch, say so plainly and point out that
drafting invite copy is a different job; do not quietly switch into writing
mode and produce new wording instead of a check.

## The fixed checklist

Every draft gets checked against exactly five elements, in this order, every
time:

1. Exact date
2. Exact start time, including timezone
3. Exact location or join link
4. RSVP deadline and method
5. What to expect, meaning an agenda or description of what happens

Do not add a sixth element and do not skip one because it seems obvious from
context. A dinner invite still needs a location as concretely as a webinar
needs a join link.

## For each of the five elements

1. Quote the exact wording from the draft, or state plainly that no wording
   addresses it at all.
2. Mark it PRESENT, VAGUE, or MISSING using the definitions below.
3. If VAGUE, name exactly what is ambiguous and what a recipient could not
   determine from it alone.
4. If MISSING, state what a recipient cannot do without it, for example
   "cannot add this to a calendar with a real start time" or "cannot confirm
   attendance without knowing where to send it."

## Definitions of PRESENT, VAGUE, MISSING

PRESENT: a concrete value is stated that a recipient could act on without
asking a follow up question. A full calendar date, a clock time paired with
a named timezone, a named venue with an address or a working join link, a
dated deadline paired with a stated method, and a real description of what
will happen are each PRESENT when stated this specifically.

VAGUE: something is present but too imprecise to act on. Common examples:
"afternoon" instead of a clock time, "downtown" instead of an address,
"soon" instead of a dated deadline, or a promise that a join link is coming
later instead of the link itself. Quote the vague phrase exactly as written;
do not paraphrase it into something that sounds more complete than it is.

MISSING: no wording anywhere in the draft addresses the element at all.

## The rule this skill will not break

Never invent a plausible date, time, location, deadline, or agenda item the
draft did not state. If a date is missing, the correct output is MISSING
plus a note of what is needed, never a fabricated stand in like "presumably
next Tuesday" or a default guess like "likely 9 in the morning." Guessing
here produces a report that reads as complete while quietly reintroducing
the exact ambiguity a recipient would hit reading the invite unassisted.

## Timezone gets its own rule

A clock time with no timezone marked is VAGUE, not PRESENT, even when the
time itself looks exact. "3:00 PM" with nothing after it is one of the most
common failures this checklist exists to catch: it reads as complete to
whoever wrote it, sitting in one timezone, and vague to any recipient
sitting in another.

## Output format

Report the five elements as a numbered list in the fixed order above, each
with its quoted wording, its PRESENT, VAGUE, or MISSING mark, and a one line
reason. Close with a short summary count, for example "2 present, 1 vague, 2
missing," followed by a plain list of what needs to be added or clarified
before the invite goes out.

## What this skill does not do

It does not rewrite the draft, does not propose replacement copy, and does
not generate a new invitation from a blank page. It only checks what is
already there. Producing the actual filled in wording, subject line, or tone
of a new invite is a separate job for a dedicated invite writing prompt, not
this checklist.
`;

const WORKED_EXAMPLE_MD = `# Worked example: checking a webinar invite draft

This example shows the checklist in \`SKILL.md\` applied to a real sounding
draft, including one VAGUE flag and one MISSING flag, so you can see the
expected level of detail before running the skill on your own draft.

## The draft as supplied

\`\`\`
Subject: You're invited: Q3 Product Roadmap Webinar

Hi there,

We're excited to invite you to our Q3 Product Roadmap Webinar. Join our
product team as they walk through what's shipping next and take your
questions live.

When: Thursday, September 17, 2026
Time: Kicks off in the afternoon, Pacific time
Where: We'll be live on Zoom, link in your calendar invite
Agenda: Q3 roadmap highlights, a live demo of two new features, and open Q&A

Let us know if you're coming!

The Product Team
\`\`\`

## The check, element by element

**1. Exact date**
Quote: "Thursday, September 17, 2026"
Mark: PRESENT
Reason: a full calendar date is stated, including the year, and a recipient
can add it to a calendar without guessing which September 17 is meant.

**2. Exact start time, including timezone**
Quote: "Kicks off in the afternoon, Pacific time"
Mark: VAGUE
Reason: a timezone is named, but "afternoon" is not a clock time. A
recipient cannot set a calendar reminder or know whether the event starts at
noon or five o'clock from this wording alone.

**3. Exact location or join link**
Quote: "We'll be live on Zoom, link in your calendar invite"
Mark: MISSING
Reason: no actual join link, meeting ID, or URL appears anywhere in the
draft itself. A promise that a link is coming separately is not a join link
a recipient can use from this text, so it is treated as missing rather than
present.

**4. RSVP deadline and method**
Quote: no wording in the draft addresses an RSVP deadline or method.
Mark: MISSING
Reason: "Let us know if you're coming" asks for a response but states
neither a deadline nor how to actually respond, so a recipient cannot
confirm attendance from the draft alone.

**5. What to expect**
Quote: "Q3 roadmap highlights, a live demo of two new features, and open Q&A"
Mark: PRESENT
Reason: three concrete agenda items are named, giving a recipient a real
sense of what the session covers rather than a vague promise of value.

## Summary

2 present, 1 vague, 2 missing.

What needs to be added or clarified before this invite goes out: an exact
clock time with the Pacific timezone already named, the actual Zoom link or
meeting ID, and a stated RSVP deadline with the method for responding.

## What this example does not do

It does not rewrite the subject line, the greeting, or the agenda wording.
Every phrase quoted above is copied exactly from the draft; nothing here
proposes replacement copy, because that is outside what this skill checks.
`;

const meta: SkillMeta = {
  slug: "event-invite-detail-completeness-skill",
  name: "Event Invite Detail Completeness Check",
  title: "Event Invite Detail Completeness Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that checks a real event invitation draft against a fixed five point checklist, quoting the exact wording for date, time, location, RSVP deadline and agenda, and never inventing a detail the draft did not state.",

  seo: {
    primaryKeyword: "event invite detail completeness skill",
    keywords: [
      "event invite detail completeness skill",
      "free ai skill for event invitations",
      "downloadable event invite checklist",
      "ai skill to check webinar invite details",
      "rsvp deadline checklist for event invites",
    ],
    seoTitle: "Event Invite Detail Completeness Skill: Free AI Download",
    seoDescription:
      "A free, downloadable event invite detail completeness skill that checks a real draft against a five point checklist for date, time, location, RSVP and agenda.",
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
      "Models asked to review an event invite tend to read past a missing RSVP deadline or an unmarked timezone because the surrounding sentence still sounds finished, and they will sometimes fill in a plausible date or time rather than flag the gap. This skill's checklist forces a PRESENT, VAGUE, or MISSING call on five fixed elements with the exact source wording quoted for each one, and explicitly forbids inventing a detail the draft never stated.",
  },

  article: {
    intro: [
      "An event invite detail completeness skill only earns its name if it can tell the difference between an invite that sounds finished and one a recipient can actually act on. A line like \"join us this afternoon\" reads as complete sentence, but it gives nobody a clock time to put on a calendar. This skill is built to catch exactly that gap, on a real draft you already have, rather than write new invite copy.",
      "It ships as two plain text files: a main instructions file holding the fixed five point checklist, and a worked example file showing the checklist applied to a full webinar invite draft, including a vague timezone flag and a missing RSVP flag. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why \"this afternoon\" is where invites actually fail",
        body: [
          "Most event invitations do not fail because they are badly written. They fail because a phrase that sounds complete to the person who wrote it, sitting in their own timezone with the join link already saved somewhere, leaves a recipient with a real, unanswered question. \"Afternoon\" is not a clock time. \"Link to follow\" is not a link. \"Let us know if you can make it\" is not a deadline or a method.",
          "A free ai skill for event invitations earns its place by treating those phrases as flags to catch rather than tone to admire, and by checking a draft that already exists instead of generating something new that would carry the same risk of vagueness all over again.",
        ],
      },
      {
        heading: "The five elements this skill checks, every time",
        body: [
          "Every draft is measured against the same fixed list, in the same order: the exact date, the exact start time with its timezone, the exact location or join link, the RSVP deadline and method, and what a recipient should expect once they show up. Nothing gets added because it seems relevant to one particular event, and nothing gets skipped because it feels obvious from context.",
          "That fixed order is what makes this a downloadable event invite checklist rather than a loose set of impressions. A conference booth invite and a customer dinner invite get the same five checks, quoted against their own exact wording each time.",
        ],
      },
      {
        heading: "How PRESENT, VAGUE, and MISSING get decided",
        body: [
          "PRESENT means a recipient could act on the wording without asking a follow up question: a full calendar date, a clock time paired with a named timezone, a working join link or a named venue with an address, a dated deadline with a stated method, and a real description of what the session or dinner covers.",
          "VAGUE means something is there but not precise enough to act on, and the skill quotes that exact phrase rather than paraphrasing it into something that sounds more finished than it is. MISSING means no wording anywhere in the draft addresses the element at all, and the report says so plainly instead of leaving a gap the reader has to notice themselves.",
        ],
      },
      {
        heading: "Why timezone gets its own rule, as an ai skill to check webinar invite details",
        body: [
          "A clock time with no timezone attached is marked VAGUE, not PRESENT, even when the number itself looks precise. \"3:00 PM\" alone is one of the most common failures this checklist exists to catch, because it reads as finished to whoever wrote it and genuinely ambiguous to any recipient in a different timezone, especially on a webinar invite going out to a distributed list.",
          "Treating an unmarked time as incomplete, rather than close enough, is what keeps this skill useful for genuinely remote or multi region events rather than only ones where everyone happens to share a timezone already.",
        ],
      },
      {
        heading: "The rule this skill will not break",
        body: [
          "Never invent a plausible date, time, location, deadline, or agenda item the draft did not actually state. A missing RSVP deadline gets reported as MISSING, never quietly filled in with a guessed date, because a fabricated detail in the report is worse than an honestly flagged gap: it looks resolved when it is not.",
          "This is the same discipline behind a rsvp deadline checklist for event invites done properly. The checklist exists to surface what a recipient cannot act on, not to paper over it with a plausible sounding assumption that was never actually in the draft.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It does not rewrite the draft, does not propose replacement copy for a vague line, and does not draft a new invitation from a blank page. Producing the actual wording for a new invite, including its subject line and tone, is a separate job handled by a dedicated invite writing prompt, not by this checklist.",
          "Keeping the two jobs separate is deliberate. A skill that both checks a draft and quietly rewrites it stops being a check; this one only reports what is there, quoted exactly, so the person reading the output can trust it reflects the draft they actually sent in.",
        ],
      },
    ],
    howTo: {
      name: "How to use the event invite detail completeness skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Paste in a real invite draft",
          text: "Hand the assistant the actual text of the invitation you are about to send, not a summary or a description of what it will eventually say.",
        },
        {
          name: "Read the five element report",
          text: "Check each of the five marks and its quoted wording before sending the invite, and fix any element the report marks VAGUE or MISSING using your own real details, not a guess the assistant supplies.",
        },
      ],
    },
    faq: [
      {
        question: "Will this skill write my event invite for me?",
        answer:
          "No. It only checks a draft you already have against the five point checklist. If you ask it to write a new invitation from scratch, it will say so plainly and point out that drafting invite copy is a different job than checking one.",
      },
      {
        question: "What happens if my invite is missing the RSVP deadline?",
        answer:
          "The skill marks that element MISSING, states plainly that no wording in the draft addresses it, and explains what a recipient cannot do without it, such as confirm attendance with a real deadline. It never fills in a guessed date on your behalf.",
      },
      {
        question: "Why does a time without a timezone count as vague instead of fine?",
        answer:
          "Because a clock time alone only works for a recipient in the same timezone as the sender. The checklist treats an unmarked time as VAGUE, not PRESENT, so the gap gets caught before the invite goes out to a distributed or remote list.",
      },
      {
        question: "Does the skill ever guess a date or location that isn't in the draft?",
        answer:
          "No, and its instructions explicitly forbid it. A missing detail is reported as MISSING with a note of what a recipient cannot do without it, never replaced with a plausible sounding invention that was never actually written in the draft.",
      },
      {
        question: "Can I use this on a dinner invite or a conference booth invite, not just a webinar?",
        answer:
          "Yes. The same five elements apply regardless of event type: an in person dinner still needs an exact location as concretely as a webinar needs a join link, and a booth invite still needs a real time and an RSVP method.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and the invite draft you eventually check with this skill is never sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/promo-prompts/vip-sale-invite-prompt",
        label: "vip sale invite prompt",
        description: "For drafting a new invite from scratch, since this skill only checks a draft that already exists rather than writing one.",
      },
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description: "A natural place to announce the same event to a wider list once the invite itself has passed this skill's checklist.",
      },
      {
        href: "/skills/marketing-skills/campaign-brief-structuring-skill",
        label: "campaign brief structuring skill",
        description: "For structuring the wider campaign an event sits inside, including the metric and audience the invite is meant to serve.",
      },
      {
        href: "/skills/marketing-skills/utm-campaign-naming-skill",
        label: "utm campaign naming skill",
        description: "For naming the tracking parameters on the actual registration or join link this checklist confirms is present.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.rfc-editor.org/rfc/rfc5545",
        label: "RFC 5545: Internet Calendaring (iCalendar)",
        description: "The technical standard behind calendar invites, showing why a start time needs an explicit timezone to be unambiguous across systems.",
      },
      {
        href: "https://www.eventbrite.com/blog/event-invitation-etiquette-ds00/",
        label: "Eventbrite: Event Invitation Etiquette",
        description: "An independent explainer on the practical details an event invitation is expected to include before it goes out.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "plainlanguage.gov Federal Plain Language Guidelines",
        description: "A real, checkable standard for stating concrete details plainly rather than in vague or hedged language.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to invite review.",
      },
    ],
  },

  tags: ["marketing", "events", "invitations", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

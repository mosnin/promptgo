import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Social Caption Hashtag Relevance Check

Use this skill when you are given a finished social media caption together
with the hashtags already attached to it, and asked to check whether each
hashtag genuinely connects to what the caption actually says. This skill
audits hashtags that already exist on a caption. It does not draft the
caption, and it does not invent new hashtags to add in their place.

## Before auditing anything

Confirm you have the full caption text, word for word, and the complete list
of hashtags attached to it, in the order given. Judging hashtags without the
caption's real content is impossible to do honestly, and reviewing a partial
list will miss the pattern where one caption is padded with several broad
tags, none of which actually connect to the specific thing the caption talks
about.

## The two part relevance test

Run every hashtag supplied against \`reference/hashtag-relevance-examples.md\`
and answer two separate questions:

1. Topical relevance: does the hashtag connect to a specific claim, subject,
   product, place or detail the caption actually states, not just the
   general industry the caption's author works in.
2. Genericness: even when a hashtag is technically on topic, is it so broad
   and high volume (#love, #instagood, #viral, #fyp, #explore) that it
   returns millions of unrelated posts and adds no real discoverability.

Score each hashtag on both questions independently. A hashtag can be
topically on point and still fail for being too generic to help anyone find
this specific post, and a hashtag can be narrow and specific while still
having nothing to do with what the caption actually says.

## Reporting format

For every hashtag supplied, quote it exactly as written, including the pound
sign, then give a verdict: relevant, irrelevant, or too generic to add
value. Every verdict must name the specific word, claim or detail in the
caption the hashtag does or does not connect to. A flag that only says a
hashtag "doesn't fit" without pointing at what it fails to connect to is not
acceptable output.

Close with a short summary: how many hashtags passed, how many were flagged
as irrelevant, how many were flagged as too generic, and how many would
remain if the flagged ones were removed.

## The single hard rule: never invent a hashtag suggestion

This skill only assesses hashtags it is actually given. It must never
propose a replacement hashtag, a stronger tag, or a hashtag described as
currently trending, because judging whether a tag is trending or performing
well right now requires live platform data this skill has no access to. A
hashtag that sounds reasonable based on general topic knowledge could be
dead, overused to the point of invisibility, or restricted on a given
platform right now, and presenting a guess as verified trending advice is
fabricating authority nobody actually has.

If the person supplying the caption asks for new hashtag ideas rather than a
check of the ones already attached, say plainly that this skill only
assesses the relevance of hashtags already on a caption, and that
recommending currently trending tags needs a live search on the actual
platform, not a static judgment call.

## What this skill does not do

It does not write or rewrite the caption itself. It does not add hashtags,
rank them by assumed popularity, or predict reach. It does not claim to know
a platform's current algorithm behaviour beyond the well documented, general
principle that irrelevant or generic hashtags read as spam to both the
platform's discovery systems and the people scrolling past them.
`;

const HASHTAG_RELEVANCE_EXAMPLES_MD = `# Hashtag relevance examples: worked pass and fail cases

Use this alongside \`SKILL.md\`. Each example below shows a caption, its
attached hashtags, and the verdict this skill's two part test produces for
each one, so the reasoning stays consistent from one audit to the next.

## Example 1: a specific product detail buried under generic tags

Caption: "Restocked the oat milk cold brew concentrate today. Small batch,
six bottles left."

Hashtags: #coldbrew, #oatmilk, #smallbatch, #love, #instagood, #foodie

- #coldbrew: relevant. Names the exact product the caption describes.
- #oatmilk: relevant. Names the specific ingredient the caption calls out.
- #smallbatch: relevant. Directly echoes a phrase used in the caption
  itself.
- #love: too generic. Nothing in the caption is about love as a subject;
  the tag returns billions of unrelated posts and connects to no specific
  word or claim here.
- #instagood: too generic. A catch all engagement tag with no connection to
  cold brew, oat milk, or a restock.
- #foodie: borderline generic. It technically sits in the right category
  but is broad enough to return posts about every kind of food; flag as too
  generic unless the account is specifically building a foodie tagged
  audience.

## Example 2: a hashtag that is simply off topic

Caption: "Finished my first half marathon this morning. Legs are done,
heart is full."

Hashtags: #halfmarathon, #running, #skincare

- #halfmarathon: relevant. Names the exact event in the caption.
- #running: relevant. Directly describes the activity the caption is about.
- #skincare: irrelevant. Nothing in the caption mentions skin, beauty or a
  related product; there is no connecting word or claim to point to at all.

## Example 3: a narrow tag that is on topic but still fails discovery

Caption: "New office hours starting Monday: 9 to 5, no more late nights."

Hashtags: #officehours, #q4marketingstrategysummitplanning2026

- #officehours: relevant. Matches the caption's actual subject directly.
- #q4marketingstrategysummitplanning2026: technically on topic in a loose
  sense if the account works in marketing, but so narrow and specific to an
  unrelated internal planning cycle that it connects to nothing the caption
  states, and would return almost no real audience. Flag as irrelevant, not
  merely generic, since the caption never mentions a summit, a quarter, or a
  planning cycle.

## Example 4: when someone asks for new hashtag ideas instead

If a caption and hashtag list are supplied and the actual request is "give
me five hashtags that are trending right now," the correct response states
plainly that this skill only checks the relevance of hashtags already
attached to a caption, and that trending status changes constantly and needs
a live platform search, not a guess based on general topic familiarity. Do
not supply a list of hashtags described as trending in this situation, even
if several plausible looking candidates come to mind immediately.

## Using this alongside SKILL.md

Score every hashtag on both the topical relevance question and the
genericness question, separately, following the reporting format in
\`SKILL.md\`. A hashtag can fail one question and pass the other, and both
verdicts should be stated rather than collapsed into a single pass or fail.
`;

const meta: SkillMeta = {
  slug: "social-caption-hashtag-relevance-skill",
  name: "Social Caption Hashtag Relevance Check",
  title: "Social Caption Hashtag Relevance Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that checks each hashtag attached to a finished social media caption against the caption's actual content, flags irrelevant or overly generic tags by name, and refuses to invent a trending hashtag it cannot verify.",

  seo: {
    primaryKeyword: "social caption hashtag relevance skill",
    keywords: [
      "social caption hashtag relevance skill",
      "free ai skill to check hashtag relevance",
      "downloadable hashtag relevance checklist",
      "ai skill to audit social media hashtags",
      "how to check if hashtags match a caption",
    ],
    seoTitle: "Social Caption Hashtag Relevance Skill: Free AI Skill",
    seoDescription:
      "A free, downloadable social caption hashtag relevance skill that flags hashtags with no real connection to a caption, without inventing new tags.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    {
      path: "reference/hashtag-relevance-examples.md",
      content: HASHTAG_RELEVANCE_EXAMPLES_MD,
      kind: "markdown",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review or add hashtags on a caption reliably default to including a handful of generic high traffic tags such as love, instagood or viral, because those read as safe and popular, even when nothing in the caption connects to them. Platforms and audiences both treat that pattern as spam signalling rather than genuine discovery, which is why this skill scores topical relevance and genericness separately and refuses to substitute an invented trending suggestion for real platform data it cannot check.",
  },

  article: {
    intro: [
      "A social caption hashtag relevance skill has one narrow job: given a finished caption and the hashtags already attached to it, decide whether each hashtag genuinely connects to what the caption actually says, or whether it is padding that looks fine and does nothing. Most hashtag advice is about volume, how many to use and how popular they are. This skill is about connection, whether a specific tag traces back to a specific word, claim or detail actually present in the caption.",
      "It runs a two part test on every hashtag supplied: is it topically relevant to the caption's real content, and even if it is, is it so broad and high traffic that it functions as noise rather than discovery. A hashtag can fail either test on its own, and both verdicts get stated separately rather than folded into one vague impression.",
      "It ships as two plain text files, a main instructions file and a downloadable hashtag relevance checklist of worked pass and fail examples the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what an assistant receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "What a free ai skill to check hashtag relevance actually flags",
        body: [
          "This social caption hashtag relevance skill does not judge caption quality, grammar, or writing style. It takes a caption and its attached hashtags as fixed inputs and checks one thing only: does each hashtag connect to something the caption actually states. A hashtag that would fit almost any post in the same general industry is treated as a weak connection, not a real one, because a tag that fits everything discovers nothing.",
          "Every flag traces back to a quoted hashtag and a named detail in the caption it does or does not connect to. There is no room for a flag that just asserts a tag feels off; the caption's own wording is the evidence either way.",
        ],
      },
      {
        heading: "Why a broad hashtag can still fail, even when it is on topic",
        body: [
          "A tag like #marketing can be technically accurate for a caption written by a marketer and still fail the genericness check, because it returns such a large volume of unrelated posts that it adds nothing a real searcher would find useful. That is what separates an ai skill to audit social media hashtags from one that merely counts how many tags are attached: volume and relevance are scored as two different questions with two different answers.",
          "A narrow hashtag that matches nothing the caption says is a different failure again, irrelevant rather than generic, and the two get reported separately so the fix is obvious: cut the irrelevant tag entirely, and reconsider the generic one only if a more specific alternative already exists in the material supplied.",
        ],
      },
      {
        heading: "Why this skill will not suggest trending hashtags for you",
        body: [
          "Recommending a currently trending hashtag requires knowing what is trending right now, on a specific platform, for a specific audience, which is live data this skill has no access to. A model that guesses at a trending tag from general topic familiarity is presenting an unverifiable claim as if it were current, which is exactly the kind of confident sounding fabrication this skill is built to avoid.",
          "So the skill's job stops at the boundary of what it can actually check: whether the hashtags already given connect to the caption's real content. Asked for new suggestions instead, it says so plainly rather than filling the gap with a plausible sounding guess.",
        ],
      },
      {
        heading: "How this differs from the social media caption prompt",
        body: [
          "A prompt built to write a social media caption produces the caption and a short hashtag list from scratch, choosing tags as part of drafting the post. This skill starts after that step is finished: it takes a caption and hashtags that already exist, from any source, and checks whether the pairing actually holds up. One writes, the other audits, and the two are meant to be used in sequence rather than as substitutes for each other.",
          "Someone who already has a caption and a hashtag list, whether from a drafting tool, a teammate, or an earlier campaign, is the exact situation this skill is for. Someone starting from a blank page with only an idea is better served drafting the caption first.",
        ],
      },
      {
        heading: "How to check if hashtags match a caption, hashtag by hashtag",
        body: [
          "Every hashtag is read against the caption on its own, not against the general topic of the post. The question is always the same: point to the word, claim or detail in the caption this specific tag connects to. If nothing in the caption supports it, the hashtag is flagged as irrelevant regardless of how reasonable it looks in isolation.",
        ],
      },
      {
        heading: "What this skill does not do",
        body: [
          "It does not draft or rewrite the caption itself, and it does not touch anything beyond the hashtags supplied with it. It does not add a new hashtag, guess at reach or engagement, or claim insight into a platform's current ranking behaviour beyond the general, well documented principle that irrelevant and generic tags read as spam. Where a hashtag's status is genuinely uncertain without live data, the report says so instead of guessing.",
        ],
      },
    ],
    howTo: {
      name: "How to use the social caption hashtag relevance skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/hashtag-relevance-examples.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the caption and its full hashtag list",
          text: "Supply the complete caption text and every hashtag currently attached to it, in order, since a partial list will miss padding patterns across the whole set.",
        },
        {
          name: "Read each flag against the caption's actual wording",
          text: "Check that every irrelevant or too generic verdict points at a specific word or detail in the caption, and cut only the hashtags that genuinely fail to connect.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly makes a hashtag count as irrelevant under this skill?",
        answer:
          "A social caption hashtag relevance skill flags a hashtag as irrelevant when nothing in the caption's actual wording, no claim, subject, product or detail, connects to it. The verdict always names the specific word or detail the hashtag fails to connect to, rather than stating a general feeling that the tag seems out of place.",
      },
      {
        question: "Will this skill ever suggest new or currently trending hashtags to add?",
        answer:
          "No. It only assesses hashtags it is actually given, because judging what is trending right now on a specific platform requires live data the skill has no access to. Asked for new suggestions, it states that limitation plainly instead of guessing at a plausible sounding replacement tag.",
      },
      {
        question: "How is this different from the social media caption prompt on this site?",
        answer:
          "The social media caption prompt drafts a new caption and a short hashtag list from an idea. This skill starts after that step, taking a caption and hashtags that already exist and checking whether each tag genuinely connects to what the caption says, which is an audit pass rather than a drafting one.",
      },
      {
        question: "Does a broad, high traffic hashtag automatically fail the check?",
        answer:
          "Not automatically, but it is scored on its own question separate from topical relevance. A broad tag that is technically on topic can still be flagged as too generic to add real discoverability, while a narrow tag with no connection to the caption is flagged as irrelevant instead, since the two failures need different fixes.",
      },
      {
        question: "Can this skill check hashtags written for any platform, not just Instagram?",
        answer:
          "Yes. The two part test, topical relevance and genericness, applies to hashtags on any platform that uses them for discovery, since neither question depends on a specific platform's algorithm, only on whether a tag connects to the caption's own words.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no caption or hashtag content anyone eventually uses the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-prompts/social-media-caption-prompt",
        label: "social media caption prompt",
        description: "For drafting a new caption and its hashtags from an idea, rather than auditing hashtags a caption already has.",
      },
      {
        href: "/skills/marketing-skills/email-subject-line-audit-skill",
        label: "email subject line audit skill",
        description: "A sibling downloadable skill applying the same quote and connect discipline to a different piece of existing copy.",
      },
      {
        href: "/skills/marketing-skills/utm-campaign-naming-skill",
        label: "utm campaign naming skill",
        description: "A related discoverability discipline for tracking where traffic actually came from once a tagged post goes out.",
      },
      {
        href: "/marketing-prompts/content-calendar-prompt",
        label: "content calendar prompt",
        description: "A natural place to plan the posts this skill's hashtag check runs against before each one goes live.",
      },
    ],
    externalLinks: [
      {
        href: "https://blog.hootsuite.com/instagram-hashtags/",
        label: "Hootsuite: Instagram Hashtags Guide",
        description: "Independent guidance on choosing hashtags specific enough to reach a relevant audience instead of a vague, high volume tag.",
      },
      {
        href: "https://later.com/blog/instagram-hashtags/",
        label: "Later: Instagram Hashtag Strategy",
        description: "A practical breakdown of niche versus mega hashtags and why stuffing a post with high volume tags does not help discovery.",
      },
      {
        href: "https://buffer.com/resources/instagram-hashtags/",
        label: "Buffer: Instagram Hashtag Strategy",
        description: "Covers matching hashtags to a post's actual content and the reach risk of hashtags that violate a platform's own guidelines.",
      },
      {
        href: "https://sproutsocial.com/insights/instagram-hashtags/",
        label: "Sprout Social: Instagram Hashtags",
        description: "Warns directly that generic or repetitive tags with no connection to the post read as spam to discovery systems.",
      },
    ],
  },

  tags: ["marketing", "social media", "hashtags", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

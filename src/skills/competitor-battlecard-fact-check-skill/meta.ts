import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Competitor Battlecard Fact Check

Use this skill whenever you are handed a sales battlecard, or any list of claims a
battlecard makes about a named competitor, and asked to check whether those claims
still hold up. Its entire value depends on one rule that is not optional: every
claim is checked against real source material about that competitor supplied by the
person asking, pasted or attached as text, never confirmed or denied from general
knowledge about the competitor.

## Before you check anything

Ask for the competitor's real, current source material for each claim if it has not
been supplied: their actual pricing page, their actual feature or security
documentation, a real comparison page, a signed quote, anything that is the
competitor's own material rather than a description of it from memory. Training
knowledge about a competitor is not a source. Competitors change pricing, packaging,
integrations and features on their own schedule, often quietly, so a fact that was
true when a model was trained can be false by the time a rep repeats it on a call.

If no source material is supplied for a given claim, do not confirm it, deny it, or
soften it into a guess. Say plainly that the claim was not checked because no source
material was given for it, and stop there for that claim specifically. Checking the
rest of the battlecard against material that was supplied is still worthwhile; the
rule applies claim by claim, not as an all-or-nothing gate on the whole battlecard.

## Checking each claim

Work through the battlecard one claim at a time. For each claim:

1. Quote the exact claim as the battlecard states it.
2. Quote or closely paraphrase the specific line in the supplied source material
   that is relevant to that claim.
3. Assign one verdict: Confirmed (the source material supports the claim as stated),
   Contradicted (the source material states something different), Unsupported (the
   source material was supplied but does not mention this claim either way), or Not
   checked (no source material was supplied for this claim).
4. For Contradicted or Unsupported, state exactly what the supplied source material
   shows instead of the claim, in your own words, next to the quoted source line.

Never round Unsupported or Not checked up to Confirmed because the claim sounds
plausible or matches what similar competitors typically do. A plausible claim with
no source behind it is exactly the failure mode this skill exists to catch.

## What this skill does not do

It does not verify a competitor claim from general familiarity with that competitor,
its category, or what competitors of its type usually offer. It does not treat an
old source document as current without asking whether newer material exists. It does
not water a Contradicted verdict down to a softer one to avoid an awkward finding; a
wrong claim caught before a sales call is a save, and a wrong claim caught after one
is a credibility problem this skill is meant to prevent.

## Reporting back

Return one line per claim: the claim, the verdict, and the evidence or its absence.
Group Contradicted and Unsupported claims first, since those are the ones a rep needs
to stop repeating immediately, then Confirmed claims, then Not checked claims with a
note on what source material would resolve each one.
`;

const EXAMPLE_MD = `# Worked example: one claim, one source, one verdict

Use this alongside \`SKILL.md\` to see the format a completed check should follow.
The company and product names below are invented for illustration; treat the
structure, not the specific facts, as the part to reuse.

## The battlecard claim

A sales battlecard for a project management tool contains this line under
"Objection handling":

> "Rivex doesn't offer single sign-on, so security-conscious buyers will end up
> stuck on manual account provisioning if they choose Rivex over us."

## The source material supplied

The person asking pasted in the relevant section of Rivex's own public security
documentation page, dated this quarter:

> "Rivex Security Overview, updated this quarter. Single sign-on (SAML 2.0 and
> OIDC) is available on the Business and Enterprise plans. Customers on the
> Starter plan do not have access to SSO and use email and password
> authentication only."

## The check

1. Claim as stated: "Rivex doesn't offer single sign-on."
2. Relevant source line: the security documentation states SSO is available on
   Business and Enterprise plans, and only unavailable on the Starter plan.
3. Verdict: Contradicted. The claim is true only for one specific plan tier and
   false as a blanket statement about Rivex overall.
4. What the source shows instead: Rivex offers SSO on its two higher plan tiers.
   The accurate version of this objection, if it still applies at all, would need
   to be scoped to prospects specifically evaluating Rivex's Starter plan, not
   stated as a general fact about the competitor.

## A second claim from the same battlecard, with no source supplied

> "Rivex charges per seat, while we offer flat rate pricing regardless of team
> size."

No pricing page, quote or other Rivex material was supplied to check this claim
against. The correct output is not a guess about typical project management
pricing models. The correct output is:

Verdict: Not checked. No source material was supplied to verify Rivex's current
pricing structure. Before this claim is used in a live call, supply Rivex's
current pricing page or a comparable, dated source so it can be checked the same
way the SSO claim was.

## Reading this example back into the process

Notice that the first claim was checked to a specific, dated line and produced a
scoped correction rather than a flat true or false, while the second claim was
correctly left unchecked rather than filled in with a plausible sounding number.
Both outcomes follow the same rule: the verdict traces to supplied material, or it
states plainly that no material was supplied.
`;

const meta: SkillMeta = {
  slug: "competitor-battlecard-fact-check-skill",
  name: "Competitor Battlecard Fact Check",
  title: "Competitor Battlecard Fact Check Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that checks each claim a sales battlecard makes about a competitor against real source material you supply, and refuses to confirm or deny a claim from general knowledge alone.",

  seo: {
    primaryKeyword: "competitor battlecard fact check skill",
    keywords: [
      "competitor battlecard fact check skill",
      "free ai skill to verify battlecard claims",
      "downloadable battlecard fact check checklist",
      "ai skill to check competitor claims",
      "how to verify a sales battlecard claim",
    ],
    seoTitle: "Competitor Battlecard Fact Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable competitor battlecard fact check skill that checks each battlecard claim about a competitor against real source material you supply.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/battlecard-claim-check-example.md", content: EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked whether a battlecard claim about a competitor is accurate will often confirm or deny it from general training knowledge, which goes stale quickly because competitors change pricing, packaging and features on their own schedule and rarely announce the change widely. A confident sounding answer built on that stale knowledge is exactly what turns into a wrong claim spoken out loud in a live sales call. This skill's verdicts trace every claim to a quoted line in source material supplied for that specific check, or state plainly that no source material was given rather than filling the gap with a remembered fact.",
  },

  article: {
    intro: [
      "A competitor battlecard fact check skill only earns its name if it can tell the difference between a verified claim and a remembered one. Handed a line like \"Competitor X doesn't offer SSO,\" most AI assistants will happily answer from whatever they recall about that competitor, and competitor facts go stale fastest of all: pricing tiers, plan names, security features and integrations change on the competitor's own schedule, usually without a wide announcement. This is a free ai skill to verify battlecard claims against real material, not a general research assistant answering from memory.",
      "It ships as two plain text files: a main instructions file that defines four checkable verdicts, and a reference file that walks through one battlecard claim, one real-looking source snippet, and the completed check, so the format is visible before you ever run it yourself. Both are previewable in full on this page, and the .zip contains exactly the wording shown here.",
      "The job this skill does is narrow on purpose: check what a battlecard already claims against material you supply about the competitor, one claim at a time, and say clearly when a claim cannot be checked at all.",
    ],
    sections: [
      {
        heading: "Why training knowledge cannot verify a competitor claim",
        body: [
          "A model's training data is a snapshot, and a competitor's pricing page, feature list and security documentation are not fixed targets; they change whenever that company decides to, often with no wide announcement a training run would have caught. Asking a model whether a competitor claim is still accurate, with nothing current to check against, is asking it to guess from an old snapshot and present the guess as an answer.",
          "That gap matters most exactly where a battlecard gets used: live, in front of a buyer, where a rep repeating a stale or wrong claim about a named competitor is not a small error. It is a credibility problem in the room, often unrecoverable for that deal. This skill's design exists to keep a remembered fact from standing in for a checked one.",
        ],
      },
      {
        heading: "The four verdicts every claim gets",
        body: [
          "Every claim checked by this skill, working as an ai skill to check competitor claims rather than write about them, lands in exactly one of four categories: Confirmed, where supplied source material supports the claim as stated; Contradicted, where the source material says something different; Unsupported, where source material exists but never actually addresses the claim; and Not checked, where no source material was supplied for that claim at all.",
          "Keeping Unsupported and Not checked as their own categories, distinct from a flat true or false, stops a plausible sounding claim from quietly becoming a confirmed one. A downloadable battlecard fact check checklist that only offers true or false invites a guess to hide inside those two boxes; this one does not allow it.",
        ],
      },
      {
        heading: "How to verify a sales battlecard claim, one line at a time",
        body: [
          "For each claim, the skill quotes the battlecard's exact wording, quotes or closely paraphrases the relevant line from the supplied source, assigns one of the four verdicts, and, for anything short of Confirmed, states exactly what the source shows instead. Nothing is summarised away; the quoted claim and the quoted source sit next to each other so the reasoning is checkable by anyone reading the output.",
          "The check runs one claim at a time rather than as a single judgment on the whole battlecard, since a real battlecard usually mixes claims source material was supplied for with claims it was not, and one pass over the whole thing would either block the checkable claims or wave through the rest.",
        ],
      },
      {
        heading: "How this differs from a competitor messaging audit skill",
        body: [
          "A competitor messaging audit reads a competitor's own copy to analyse how that competitor positions itself: what it claims, to whom, and which of its own claims read as unsubstantiated. This competitor battlecard fact check skill does the opposite job. It takes claims your side has already written about a competitor, on a battlecard, and checks each one against real source material, flagging anything unsupported, outdated or contradicted.",
          "One works from the competitor's own words to understand the competitor. The other works from your team's words about the competitor to catch a mistake before it reaches a buyer. The two passes ask different questions and neither substitutes for the other.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not confirm or deny a claim using general familiarity with the competitor or its category, and it will not treat an undated or clearly old source document as automatically current. A Contradicted verdict is never softened because the original claim sounds reasonable; the source material decides the verdict, not how plausible the claim reads.",
        ],
      },
      {
        heading: "Working through a real battlecard section by section",
        body: [
          "Battlecards are usually organised by section: objection handling, pricing comparison, feature comparison, security posture. Run this skill one section at a time, gathering the source material each section needs before starting it, rather than assembling every document up front. A rep can get a corrected version of the highest priority section back quickly, with the rest following as source material arrives.",
        ],
      },
    ],
    howTo: {
      name: "How to use the competitor battlecard fact check skill",
      steps: [
        {
          name: "Read the instructions and the worked example",
          text: "Scroll through SKILL.md and reference/battlecard-claim-check-example.md above so the four verdicts and the claim-by-claim format are clear before anything downloads.",
        },
        {
          name: "Build the archive",
          text: "One click assembles the .zip from the exact wording shown in the preview, entirely in your browser, with nothing sent to a server.",
        },
        {
          name: "Gather the battlecard and real source material",
          text: "Pull the battlecard's claims together with the competitor's actual pricing page, feature docs or comparison material for each claim you want checked, as plain text.",
        },
        {
          name: "Load the files, the battlecard and the source material into your assistant",
          text: "Keep SKILL.md next to its reference folder, then paste in the battlecard claims and whatever source material you have for each one and ask for the check.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't have source material for one of the claims?",
        answer:
          "That specific claim gets marked Not checked rather than guessed at, and the output says plainly that no source material was supplied for it. The rest of the battlecard still gets checked normally against whatever material you did supply, since the rule applies claim by claim rather than blocking the whole battlecard.",
      },
      {
        question: "Can the skill confirm a claim from what it already knows about the competitor?",
        answer:
          "No, and its instructions explicitly forbid it. Competitor pricing, plans and features change on their own schedule, so a recalled fact could already be wrong; every Confirmed or Contradicted verdict has to trace to a quoted line in source material supplied for that specific check.",
      },
      {
        question: "How is this different from the competitor messaging audit skill?",
        answer:
          "The messaging audit reads a competitor's own copy to analyse how that competitor positions itself and which of its claims lack evidence. This skill instead checks claims your own team already wrote about a competitor, on a battlecard, against real source material to catch anything unsupported, outdated or contradicted before it gets used on a call.",
      },
      {
        question: "What counts as real source material for a claim?",
        answer:
          "The competitor's own current material: a pricing page, feature or security documentation, a comparison page, or a dated quote, pasted in as text. A summary of the competitor from memory, a review site's paraphrase, or a guess about what similar companies typically offer does not count as source material.",
      },
      {
        question: "Does this site see the battlecard or source material I use?",
        answer:
          "No. Previewing the files on this page and building the .zip both happen entirely in your browser, with nothing sent to a server in either step, and whatever battlecard or source material you later paste into an assistant is a separate action this site never touches at all.",
      },
      {
        question: "What if the source material only partly supports a claim?",
        answer:
          "The verdict should be Contradicted with the scoped correction spelled out, as in the worked example where a blanket claim about a feature was true for one plan tier and false as a general statement. A partial match is not rounded up to Confirmed just because part of the claim happens to hold.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/marketing-skills/competitor-messaging-audit-skill",
        label: "competitor messaging audit skill",
        description: "For analysing how a competitor positions itself from their own pasted copy, rather than fact checking claims your own team already wrote about them.",
      },
      {
        href: "/skills/sales-skills/sales-call-review-skill",
        label: "sales call review skill",
        description: "For reviewing a call transcript after the fact, including any competitor claims a rep actually repeated live.",
      },
      {
        href: "/sales-prompts/sales-objection-handling-prompt",
        label: "sales objection handling prompt",
        description: "For drafting a rep's response to a competitor objection once this skill has confirmed which claims about that competitor actually hold up.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "For lining up a battlecard claim against the supplied source text word for word once this skill has flagged a mismatch.",
      },
    ],
    externalLinks: [
      {
        href: "https://klue.com/blog/competitive-battlecards-101",
        label: "Klue: Sales Battlecards 101",
        description: "An independent explainer on battlecard structure that notes trust breaks the moment a rep finds something out of date or incorrect on one.",
      },
      {
        href: "https://www.apollo.io/insights/sales-battlecard-template",
        label: "Apollo: Sales Battlecard Template Guide",
        description: "A practical case for a source and last-verified date on every battlecard claim, and the cost of a rep repeating a stale AI-generated claim.",
      },
      {
        href: "https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation",
        label: "FTC Policy Statement Regarding Advertising Substantiation",
        description: "The regulatory standard behind why a claim needs a reasonable evidentiary basis before it is repeated, the same discipline this skill applies to a battlecard claim.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a battlecard check.",
      },
    ],
  },

  tags: ["sales", "competitive intelligence", "battlecard", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

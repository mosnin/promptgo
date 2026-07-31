import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Code Comment Staleness Audit

Use this skill when you are given a real code file, actual code and the actual comments
attached to it, and asked whether those comments still describe what the code does right
now. This is a code comment staleness audit skill: its whole job is to check whether an
existing comment's claim matches the current, visible behaviour of the code beneath it.

## The one job this skill does

It does not summarise the file, it does not rewrite the comments, and it does not judge
whether a comment is well written. A comment can be perfectly written and still be wrong
about what the code does, and a badly worded comment can still be completely accurate. The
only question this skill answers is whether the claim and the code agree.

## Required input

The actual code and its actual comments, as they exist right now, pasted in full for every
function or block being checked. A description of the code, a summary of what changed, or a
diff without the surrounding context is not enough. If only a diff is supplied, ask for the
full current file before flagging anything, since a diff shows what changed, not what the
finished code does today.

## Core discipline: never assume, only compare

Do not guess what a comment used to say before it went stale, and do not guess what the code
used to do before it changed. Both are invisible in a single snapshot of a file. The only
comparison this skill makes is between the comment's claim, read as written, and the code's
behaviour, read as written, in the file that was actually supplied. A comment referencing a
fact the supplied code cannot confirm is not evidence of staleness. It is only evidence that
this file alone cannot verify the claim.

## Step 1: read every comment as a checkable claim

For each comment attached to a function, block, or line, restate what it asserts about
behaviour in one plain sentence: a count, a condition, a return type, a parameter, an order
of operations, a side effect. A comment that only names intent with no checkable claim, such
as "helper for the retry logic", has nothing to compare against code and should be left
alone rather than forced into a verdict.

## Step 2: check the claim against the code beneath it, line by line

Read the code the comment is attached to and determine whether its actual, visible behaviour
matches the claim from step 1. A loop bound, a conditional, a function signature, a return
statement, a parameter list, all count as visible behaviour worth checking. Do not infer
intent from a variable's name or a function's name; only the code's actual logic counts as
evidence.

## Step 3: quote both for every flag, never one alone

A staleness flag is not finished until it quotes the comment's exact wording and the specific
line or lines of code that contradict it. "The comment appears out of date" without both
quotes is not an output this skill produces. State plainly what the comment claims, what the
code actually does, and exactly where the mismatch sits.

## Step 4: say plainly when staleness cannot be determined

Some comments describe something the supplied code cannot confirm at all: a downstream
service's response, a caller's contract, a database's behaviour, a config value defined
elsewhere in the codebase. When a comment's claim is not visible in the code supplied, say so
directly instead of marking it accurate or stale. "Cannot verify from the code shown" is a
valid, complete finding, not a gap that needs a guess to fill it.

## What this skill does not do

It does not rewrite or delete a stale comment; it only reports the mismatch and lets the
person decide the fix. It does not flag a comment as stale because it is vague, poorly
worded, or unhelpful, only because its claim contradicts the visible code. It does not assume
a comment used to be correct and drifted over time; it only checks what is true right now, in
the file it was actually given.

## Output shape

List every comment checked. For each, give one of three verdicts: accurate, with the code
line that confirms it; stale, with the comment quoted alongside the contradicting code; or
cannot verify, with the specific thing the supplied code does not show. Skip comments with no
checkable claim rather than forcing a verdict onto them.
`;

const WORKED_EXAMPLE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It runs the four step process against a short, realistic
code snippet containing three comments, one accurate, one stale, and one whose claim cannot
be verified from the code alone, showing exactly how each judgment gets made and quoted.

## The code as supplied

\`\`\`javascript
// Retries the request up to 3 times before giving up.
function fetchWithRetry(url, options) {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return performFetch(url, options);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

// Parses the response body as JSON and returns the parsed object.
function parseResponseBody(response) {
  return JSON.parse(response.body);
}

// The billing service treats a 429 here as a soft failure and does not charge the customer.
function handleRateLimit(response) {
  if (response.status === 429) {
    return null;
  }
  return response;
}
\`\`\`

## Comment 1: stale

Claim, from the comment: the request is retried up to 3 times before giving up.

Code beneath it: \`for (let attempt = 0; attempt < 5; attempt++)\` runs while attempt is
0, 1, 2, 3 and 4, five iterations, not three.

Verdict: STALE. The comment says 3 attempts, the loop condition \`attempt < 5\` runs 5
attempts. Quote the comment ("up to 3 times") against the code ("attempt < 5"); the two do
not agree.

## Comment 2: accurate

Claim, from the comment: the function parses the response body as JSON and returns the
parsed object.

Code beneath it: \`return JSON.parse(response.body);\` does exactly that, parses
\`response.body\` as JSON and returns the result directly.

Verdict: ACCURATE. The comment's claim and the single line of code beneath it match exactly.
Nothing else the function does contradicts it.

## Comment 3: cannot verify

Claim, from the comment: the billing service treats a 429 status here as a soft failure and
does not charge the customer.

Code beneath it: \`if (response.status === 429) { return null; }\` shows this function
returning null on a 429, but nothing in the supplied code shows what the billing service
itself does with that status. Whether it charges or not is a fact about a separate, external
system.

Verdict: CANNOT VERIFY. The comment makes a claim about the billing service's own behaviour,
not about this function. The supplied code only shows this function's local response to a
429; it does not show the billing service's side. Marking this stale or accurate would both
be a guess.

## What this example is not

Three comments is a small sample. A real file will usually mix all three verdicts across many
more comments, and some will have no checkable claim at all and should be skipped rather than
forced into a verdict. Treat this file as a demonstration of the citation discipline, quote
the comment, quote the code, name the specific mismatch or the specific thing that cannot be
confirmed, not as a template whose exact verdicts apply to any other codebase.
`;

const meta: SkillMeta = {
  slug: "code-comment-staleness-audit-skill",
  name: "Code Comment Staleness Audit",
  title: "Code Comment Staleness Audit Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that checks whether a real comment's claim still matches the real code beneath it, quoting both for every stale flag and saying plainly when a claim cannot be verified from the code supplied.",

  seo: {
    primaryKeyword: "code comment staleness audit skill",
    keywords: [
      "code comment staleness audit skill",
      "free ai skill for stale code comments",
      "downloadable code comment audit checklist",
      "ai skill to check code comments against code",
      "how to detect outdated code comments",
    ],
    seoTitle: "Code Comment Staleness Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable code comment staleness audit skill that checks real comments against real code, quoting the exact mismatch instead of guessing.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and reviewed by the Fast Prompts editorial team against this site's authoring standard for skills that assess real, user supplied material rather than generate new content.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Given a comment and the function it sits above, models reliably default to trusting the comment's claim about what the code does instead of checking that claim against what the code actually, visibly does, especially when the comment reads as confident and specific. A comment stating a retry count or a parameter that no longer exists gets echoed back as fact rather than checked line by line against the loop bound or the signature in front of it. This skill requires every verdict to quote the comment's exact wording next to the specific line of code that confirms or contradicts it, and requires an explicit cannot verify finding whenever a comment's claim describes something the supplied code does not show, rather than letting a confident sounding comment stand in for a checked one.",
  },

  article: {
    intro: [
      "A code comment staleness audit skill is only worth downloading if it can tell the difference between a comment that is wrong and a comment that merely sounds old. Handed a function and the comment above it, most AI assistants default to trusting whatever the comment claims, since a comment reads like a statement of fact rather than a claim that needs checking. This skill treats every comment as a claim, checked against the current, visible behaviour of the code it is attached to, nothing else.",
      "This is a free ai skill for stale code comments built on one narrow discipline: never guess what a comment used to say, never guess what the code used to do before it changed. It works only from the real code and comments supplied, comparing the claim in front of it to the behaviour in front of it, and says plainly when a single file cannot confirm a claim either way.",
      "It ships as two plain text files, a main instructions file and a worked reference example running the process against a short snippet with one stale comment, one accurate comment, and one comment that cannot be verified from the code alone. Both are previewable in full before download, exactly what an assistant or teammate receives once the zip is handed over.",
    ],

    sections: [
      {
        heading: "Why a comment's claim has to be checked, not assumed",
        body: [
          "A comment sits next to code, but it is not generated from the code, so nothing keeps the two in sync. A function can be edited many times after a comment was written, and the comment stays as it was, still reading as confident about behaviour the code no longer has. Treating a comment as accurate because it is well written is the shortcut this code comment staleness audit skill exists to refuse.",
          "The check is narrow: read the comment's claim, read the code's actual behaviour, and state whether they agree. A retry count, a return type, a parameter, or an order of operations becomes a checkable claim the moment it sits next to code that confirms or contradicts it.",
        ],
      },
      {
        heading: "The worked example: a stale comment caught by a loop bound",
        body: [
          "The bundled reference file runs this process against a small function whose comment claims the code retries a request up to three times before giving up. The loop beneath it reads \`for (let attempt = 0; attempt < 5; attempt++)\`, which runs five attempts, not three. The verdict quotes both the comment's exact wording and the loop condition that contradicts it, so the mismatch is checkable, not just asserted.",
          "This is the shape every flag from this skill takes. A vague note like \"the comment looks outdated\" is not acceptable output; the specific words of the comment and the specific line of code that disagrees with them both have to appear together.",
        ],
      },
      {
        heading: "Why an accurate verdict needs its own citation too",
        body: [
          "It would be easy to only cite evidence for the stale findings and let accurate comments pass silently, but that quietly turns the audit into a search for problems rather than a genuine check of every claim. This skill requires the same discipline for an accurate verdict: quote the comment's claim, quote the line of code that confirms it, and state that the two agree. A downloadable code comment audit checklist that only shows its work for the bad news is not one worth trusting.",
        ],
      },
      {
        heading: "The cannot verify case: honesty about what the code doesn't show",
        body: [
          "Some comments make claims about something outside the file entirely, an upstream service's contract, a caller's guarantees. The worked example's third comment claims a billing service treats a status code as a soft failure and does not charge the customer, but the code shown only returns null on that status; nothing in the snippet shows the billing service's own behaviour. Marking that comment stale or accurate would both be a guess dressed up as a finding.",
          "This is the honesty case this skill is built around: when a claim is not visible in the code supplied, the skill says exactly that, cannot verify from the code shown. As an ai skill to check code comments against code, its output is only as trustworthy as its willingness to leave a question open.",
        ],
      },
      {
        heading: "What this skill refuses to do",
        body: [
          "It does not rewrite or delete a comment it flags as stale, leaving that decision to the reader. It does not judge writing quality; a clumsy sentence that accurately describes the code is left alone, and a well written one that contradicts the code is flagged. It does not assume a comment drifted over time; every judgment is made fresh, which is how to detect outdated code comments without inventing a change history nobody supplied.",
        ],
      },
      {
        heading: "How this pairs with a code review pass",
        body: [
          "A code comment staleness audit skill is a narrow, repeatable check meant to run alongside a broader review, not instead of one. It answers one question, does this comment's claim match this code, and leaves judgment calls about design, naming, and structure to a full review pass. Running this skill first can surface a stale comment that would otherwise mislead a reviewer who trusts the comment more than the code in front of them.",
        ],
      },
    ],

    howTo: {
      name: "How to use the code comment staleness audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md on this page before downloading, so you know exactly how a claim gets checked against code before you run it on your own file.",
        },
        {
          name: "Gather the real code and its real comments",
          text: "Paste the actual current file, code and comments together, not a summary or a diff alone. A diff shows what changed, not what the finished code does today.",
        },
        {
          name: "Download the zip and hand both files to your assistant",
          text: "One button builds the archive from the exact files shown in the preview. Keep the folder structure intact so SKILL.md can point to the worked example.",
        },
        {
          name: "Read every verdict before touching a comment",
          text: "Check the quoted comment against the quoted code for each stale flag, confirm the accurate verdicts against their citations, and treat every cannot verify finding as a question still open rather than a pass.",
        },
      ],
    },

    faq: [
      {
        question: "Can this skill tell me what a comment used to say before it went stale?",
        answer:
          "No, and it is built to refuse that guess. It only works from the single file it is given, comparing the comment's current wording to the code's current behaviour. Any claim about the comment's history would be invented, not observed, so it produces none.",
      },
      {
        question: "What happens if a comment describes something outside the code I supplied?",
        answer:
          "It gets an explicit cannot verify verdict rather than stale or accurate. A comment about a downstream service or a config value defined elsewhere cannot be checked against a single file, so the skill states plainly what the supplied code does not show.",
      },
      {
        question: "Does the skill fix or rewrite the comments it flags as stale?",
        answer:
          "No. It only reports the mismatch, quoting the comment's exact wording next to the line of code that contradicts it, and leaves the fix to the person reading the report. Rewriting is a separate choice this skill does not make on its own.",
      },
      {
        question: "Will it flag a comment just because the wording is awkward or unclear?",
        answer:
          "No. Writing quality is not what this skill checks. A clumsy sentence that accurately describes the code is left alone, and a well written sentence that contradicts the code is flagged. The only question is whether the claim matches what the code visibly does.",
      },
      {
        question: "What if a comment has no specific claim to check, just a general note?",
        answer:
          "It is skipped rather than forced into a verdict. A comment like a helper for the retry logic names intent but makes no checkable claim about a count or a return value, so there is nothing for the code to confirm, and it is left alone.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser, with no server call behind either action, and nothing about the code you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "For a broader review of a diff or pull request, with this skill's narrower comment check as one useful pass inside it.",
      },
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description: "For the wider work of restructuring code safely, once a stale comment near the code being touched has already been identified.",
      },
      {
        href: "/coding-prompts/code-explanation-prompt",
        label: "code explanation prompt",
        description: "For a plain language walkthrough of what a function actually does, useful groundwork before checking a comment's claim against it.",
      },
      {
        href: "/skills/coding-skills/pull-request-review-standard-skill",
        label: "pull request review standard skill",
        description: "A broader, structured pass through an entire pull request, into which a comment staleness check fits as one specific, repeatable step.",
      },
    ],

    externalLinks: [
      {
        href: "https://martinfowler.com/bliki/CodeAsDocumentation.html",
        label: "Martin Fowler: Code As Documentation",
        description: "An argument for treating code itself as the primary source of truth, useful context for why a comment's claim needs checking rather than trusting.",
      },
      {
        href: "https://google.github.io/styleguide/docguide/best_practices.html",
        label: "Google Documentation Best Practices",
        description: "Guidance recommending documentation change alongside the code it describes, the same discipline that keeps a comment from drifting out of sync.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Technical_debt",
        label: "Wikipedia: Technical debt",
        description: "Background on how insufficient or outdated documentation accumulates as a maintenance cost over time, the same cost a stale comment quietly adds.",
      },
      {
        href: "https://blog.codinghorror.com/coding-without-comments/",
        label: "Coding Horror: Coding Without Comments",
        description: "An independent argument that a comment should explain why code exists rather than restate how it works, the distinction this skill's checkable claim test relies on.",
      },
    ],
  },

  tags: ["coding", "code comments", "documentation", "code review", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

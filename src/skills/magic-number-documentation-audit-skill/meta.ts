import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Magic Number Documentation Audit

Use this skill when you are given real source code and asked whether its numeric or short
string literals are actually explained, or just sitting in the logic unnamed and uncommented.
This is a magic number documentation audit skill: its whole job is to find literals used
inside conditionals, calculations, or configuration that have no named constant and no
comment nearby, and to flag them as undocumented unless something already present in the
supplied code explains what they mean.

## The one job this skill does

It does not judge whether a literal's value is correct, sensible, or well chosen. A threshold
of 4 retries and a threshold of 40 retries are equally checkable by this skill, and it takes no
position on which is right. The only question it answers is whether the literal in front of it
is explained, right now, by something already in the code: a comment, or a variable name
specific enough to carry the meaning on its own.

## Required input

The actual source code, pasted in full for every function or block being checked, not a
description of what the code does or a partial excerpt with the literal's surrounding context
cut away. A literal cannot be judged undocumented or explained without seeing the lines around
it, since the explanation this skill looks for, a comment or a named variable, has to be
visible in the same file to count.

## What counts as a candidate literal

A numeric or short string literal used inside a conditional (an if, a comparison, a switch
case), a calculation (a multiplication, an offset, a division), or a piece of inline
configuration (a timeout, a limit, a retry count, a status code checked directly). Exclude the
obvious cases that never need a name: 0, 1, and -1 used as ordinary starting points,
increments, or not found markers, and a plain loop index counting up through an array in a
simple for loop. Everything else that shapes what the code decides or computes is a candidate.

## Step 1: find every candidate literal

Read the code line by line and list every literal that meets the definition above. Quote the
exact line it appears on for each one. Do not paraphrase the line or describe it in prose only;
the literal has to be shown exactly as it is written in the code supplied.

## Step 2: decide if it is already explained

For each candidate, check two things and only two things: is there a comment on the same line
or the line directly above that states what the value means or why it was chosen, and does the
literal sit inside, or get assigned to, a variable whose name alone makes the meaning clear
without a comment. A variable name has to actually carry the meaning, not just gesture at the
general topic. \`maxRetryAttempts\` explains a retry limit; \`n\` or \`value\` does not, even if it
sits near retry logic. If neither condition is met, the literal is undocumented.

## Step 3: name the role and flag it

For every undocumented literal, quote the line, state the specific role the literal plays in
that line (a threshold, a limit, a timeout, a multiplier, an offset, a status code being
compared directly, a configuration value), and flag it as undocumented. For every literal that
is already explained, quote the line and the comment or variable name that explains it, and say
so plainly rather than silently skipping it, so the audit's coverage is visible.

## What this skill does not do

It never invents what a literal's correct value should be, and it never proposes a replacement
value or a fix. It never renames a variable itself or suggests a specific new name; naming is a
decision for the person who understands why the value was chosen, which this skill has no way
to know from the code alone. It does not flag 0, 1, -1, or a simple loop counter, and it does
not flag a literal that already has a comment or a clearly named variable next to it, even if
the audit disagrees with the choice of value.

## How this differs from a comment staleness check

A code comment staleness audit skill asks whether an existing comment's claim still matches
what the code currently does, a question that only makes sense once a comment already exists.
This skill asks a different, earlier question: does a comment or a clear name exist near this
literal at all. A literal can have zero comments anywhere near it and still be entirely outside
the scope of a staleness check, because staleness only applies to a claim that was made and
might now be wrong. This skill catches the case where no claim was ever made in the first
place. It also does not check identifier case style the way a naming convention drift skill
does; a literal can be flagged as undocumented regardless of whether the surrounding code uses
camelCase or snake_case, since case style and explanation are unrelated questions.

## Output shape

List every candidate literal found, in the order it appears in the code. For each, give the
exact quoted line, the role the literal plays, and a verdict: undocumented, with nothing else
to add, or explained, with the specific comment or variable name that does the explaining
quoted alongside it. Skip nothing; a literal that is fine gets a stated verdict, not silence.
`;

const WORKED_EXAMPLE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It runs the three step process against a short, realistic
function containing four literal values: one already explained by a nearby comment, and three
flagged as undocumented because nothing in the code states what they mean or why those specific
values were chosen.

## The code as supplied

\`\`\`javascript
function shouldRetryUpload(fileSizeBytes, attemptCount, response) {
  // Files above 10485760 bytes (10 MB) exceed the upload proxy's buffer limit.
  if (fileSizeBytes > 10485760) {
    return false;
  }

  if (attemptCount > 4) {
    return false;
  }

  const backoffMs = attemptCount * 1500;

  if (response.status === 503) {
    return true;
  }

  return backoffMs > 0;
}
\`\`\`

## Literal 1: fileSizeBytes compared against 10485760, explained

Line: \`if (fileSizeBytes > 10485760) {\`

Role: an upper size threshold gating whether a retry is attempted at all.

Verdict: EXPLAINED. The comment directly above the line states the value in bytes, gives its
megabyte equivalent, and names the specific constraint it enforces, the upload proxy's buffer
limit. Nothing about this literal is left for a reader to guess.

## Literal 2: attemptCount compared against 4, undocumented

Line: \`if (attemptCount > 4) {\`

Role: a retry limit, the maximum number of attempts allowed before giving up.

Verdict: UNDOCUMENTED. There is no comment on this line or the line above it, and the variable
\`attemptCount\` names what is being counted but says nothing about why 4 is the cutoff rather
than 3 or 10. Nothing in the supplied code explains why this specific number was chosen.

## Literal 3: the multiplier 1500 in the backoff calculation, undocumented

Line: \`const backoffMs = attemptCount * 1500;\`

Role: a per attempt delay multiplier, in milliseconds, used to calculate a growing backoff
period.

Verdict: UNDOCUMENTED. The variable name \`backoffMs\` explains what the result represents, a
delay in milliseconds, but it does not explain why 1500 specifically was picked as the per
attempt increment. The unit is named, the value is not.

## Literal 4: the status code 503, undocumented

Line: \`if (response.status === 503) {\`

Role: a specific HTTP status code being compared directly, used to decide whether a retry
should proceed.

Verdict: UNDOCUMENTED. Nothing in the code names this status as a service unavailable response
or explains why it is treated as retryable while other status codes are not. A reader
unfamiliar with HTTP status codes has no way to recover that meaning from this line alone, and
even a reader who does recognise 503 cannot tell why this function singles it out.

## What this example is not

Four literals is a small, deliberately compact sample. A real file will often mix many more
candidates across several functions, some explained, most not. Treat this file as a
demonstration of the two part check, a comment on or above the line, or a variable name
specific enough to carry the meaning alone, not as a template whose exact verdicts transfer to
a different codebase.
`;

const meta: SkillMeta = {
  slug: "magic-number-documentation-audit-skill",
  name: "Magic Number Documentation Audit",
  title: "Magic Number Documentation Audit Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that scans real code for numeric and short string literals used in conditionals, calculations, or configuration with no named constant and no explaining comment, quoting the exact line and flagging each one as undocumented unless the code already explains it.",

  seo: {
    primaryKeyword: "magic number documentation audit skill",
    keywords: [
      "magic number documentation audit skill",
      "free ai skill for magic number audit",
      "downloadable magic number checklist",
      "ai skill to flag undocumented literals",
      "how to find undocumented magic numbers in code",
    ],
    seoTitle: "Magic Number Documentation Audit Skill: Free AI Download",
    seoDescription:
      "A free, downloadable magic number documentation audit skill that scans real code for undocumented numeric and string literals and quotes the exact line for each one.",
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
      "Given a function with several unnamed numeric literals, models asked for a general code review tend to mention one or two of the more obvious ones in passing and move on to structure or naming, without working through every candidate literal in the file. A literal sitting inside a calculation, such as a multiplier applied to a count, is especially likely to be skipped even when a comparison a few lines away gets flagged. This skill requires every candidate literal in the supplied code to receive an explicit verdict, explained or undocumented, with the exact line quoted, rather than letting a review mention only the most visible cases and leave the rest unexamined.",
  },

  article: {
    intro: [
      "A magic number documentation audit skill only earns its name if it checks every candidate literal in a file, not just the one or two that happen to stand out. Handed a function full of numbers, most AI assistants asked for a general review will comment on the most obvious threshold and move on, leaving a multiplier buried in a calculation untouched. This is a free ai skill for magic number audit work built to work through every candidate literal in the code it is given, one line at a time.",
      "It ships as two plain text files: a main instructions file and a worked reference example that runs the process against a short function with four literals, three flagged as undocumented and one already explained by a comment. Both are previewable in full on this page before you download the zip, exactly what a teammate or an AI assistant receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "Why an unnamed literal is a real, checkable gap",
        body: [
          "A literal sitting inside a conditional or a calculation carries a decision someone made, a threshold, a limit, an offset, a delay, but the code alone rarely says why that specific value was chosen. Six months later, nobody reading `if (attemptCount > 4)` can tell whether 4 is load bearing or arbitrary, and changing it feels risky precisely because no explanation survived next to the number.",
          "A named constant or a comment is what turns a bare number into a documented decision, and a magic number documentation audit skill's entire mechanism is checking, for every candidate literal, whether that documentation actually exists in the code supplied rather than assuming it does.",
        ],
      },
      {
        heading: "What counts as a candidate, and what does not",
        body: [
          "A candidate literal is a number or short string used inside a conditional, a calculation, or inline configuration: a timeout, a retry limit, a status code compared directly, a multiplier applied to a count. The obvious cases that never need a name are excluded outright: 0, 1, and -1 used as ordinary starting points or not found markers, and a plain loop index counting through an array in a simple for loop.",
          "Keeping that exclusion narrow matters. A downloadable magic number checklist that flags every 0 and 1 in a file buries the literals that actually need attention under noise nobody will read.",
        ],
      },
      {
        heading: "The two part explanation check",
        body: [
          "For every candidate, this skill checks exactly two things: is there a comment on the same line or the line directly above stating what the value means, and does the literal sit inside a variable whose name alone carries that meaning without a comment. A variable like `maxRetryAttempts` genuinely explains a retry limit; a variable like `n` near the same logic does not.",
          "As an ai skill to flag undocumented literals, its judgment stops there. It does not ask whether the comment is well written or whether the variable name follows the file's usual pattern, only whether the explanation, however phrased, is actually present.",
        ],
      },
      {
        heading: "What the worked example shows",
        body: [
          "The bundled reference file runs this check against a four line function. A file size threshold of 10485760 is explained by a comment stating the megabyte equivalent and the constraint it enforces, so it gets an explained verdict. An attempt limit of 4, a backoff multiplier of 1500, and a status code of 503 have no comment and no specific enough variable name attached, so all three get flagged undocumented.",
          "That mix, one explained and three undocumented from a single short function, is typical of how how to find undocumented magic numbers in code plays out in practice: the most visible threshold often gets a comment, and the values buried inside a calculation or a direct comparison do not.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It never proposes what a literal's correct value should be, and it never suggests a replacement name for a variable; both are decisions for someone who understands why the original value was chosen. It also never renames anything itself. Its entire output is a set of quoted lines and verdicts, not a rewritten file.",
        ],
      },
      {
        heading: "How this differs from a comment staleness check and a naming convention check",
        body: [
          "A code comment staleness audit skill checks whether an existing comment's claim still matches what the code currently does, a question that presumes a comment is already there. This skill asks the earlier question of whether any explanation exists near a literal at all, so it catches literals that never had a comment written for them, a case staleness checking cannot reach.",
          "It is equally distinct from a naming convention drift skill, which checks whether identifiers follow a consistent case style such as camelCase or snake_case. A literal can be flagged as undocumented in a file whose naming is perfectly consistent, since case style and whether a value is explained are separate questions.",
        ],
      },
    ],
    howTo: {
      name: "How to use the magic number documentation audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly how a literal gets checked before running it on your own code.",
        },
        {
          name: "Gather the real, complete source code",
          text: "Paste the actual current function or file, not a summary or an excerpt with the surrounding lines removed, since the explanation this skill looks for has to be visible in the same file as the literal.",
        },
        {
          name: "Download the zip and hand both files to your assistant",
          text: "One button builds the archive from the exact files shown in the preview. Keep the folder structure intact so SKILL.md can point to the worked example.",
        },
        {
          name: "Work through every flagged literal before changing code",
          text: "Read each verdict, undocumented or explained, and decide whether to add a comment, introduce a named constant, or leave the value as is, since this skill only reports the gap and never proposes the fix itself.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill tell me what the correct value for a magic number should be?",
        answer:
          "No, and it is built to refuse that guess. It only reports whether a literal is currently explained by a comment or a clearly named variable in the code supplied. Deciding what the right value is, or should be, requires context about the system that only the person maintaining it has.",
      },
      {
        question: "Will it flag every 0 or 1 it finds in my code?",
        answer:
          "No. Ordinary uses of 0, 1, and -1 as starting points, increments, or not found markers are excluded outright, along with a plain loop index counting through an array. The skill only flags literals that carry a genuine, arbitrary decision, such as a threshold or a limit.",
      },
      {
        question: "Does a well named variable make a literal safe from being flagged?",
        answer:
          "Yes, as long as the name is specific enough to carry the meaning on its own, such as maxRetryAttempts for a retry limit. A generic name like value or n sitting near the same logic does not count, even though it is technically close to the literal.",
      },
      {
        question: "How is this different from a comment staleness check?",
        answer:
          "A comment staleness check asks whether an existing comment's claim still matches the code, which only applies once a comment already exists. This skill asks whether any comment or clear name exists near a literal at all, which catches literals that were never explained in the first place.",
      },
      {
        question: "How is this different from a naming convention check?",
        answer:
          "A naming convention check looks at whether identifiers follow a consistent case style, like camelCase or snake_case, across a codebase. This skill has nothing to do with case style; it checks whether a literal's meaning is explained, which is a separate question from how that variable's name is formatted.",
      },
      {
        question: "Will the skill rename a variable or add a comment for me?",
        answer:
          "No. It only reports the quoted line, the literal's role, and a verdict. It never renames anything and never writes a comment on your behalf, leaving both decisions to the person who understands why the value was chosen.",
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
        description: "For a broader review of a diff or file, with this skill's narrower literal check as one useful pass inside it.",
      },
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description: "For the wider work of introducing named constants and restructuring code, once an undocumented literal has already been identified.",
      },
      {
        href: "/skills/coding-skills/code-comment-staleness-audit-skill",
        label: "code comment staleness audit skill",
        description: "For checking whether an existing comment still matches the code beneath it, a different question from whether a literal has no explanation at all.",
      },
      {
        href: "/skills/coding-skills/naming-convention-drift-skill",
        label: "naming convention drift skill",
        description: "For checking whether identifiers follow a consistent case style, a separate question from whether a literal's value is documented.",
      },
    ],
    externalLinks: [
      {
        href: "https://en.wikipedia.org/wiki/Magic_number_(programming)",
        label: "Wikipedia: Magic number (programming)",
        description: "Background on the term this skill's mechanism is named after, an unexplained literal value embedded directly in code.",
      },
      {
        href: "https://google.github.io/styleguide/docguide/best_practices.html",
        label: "Google Documentation Best Practices",
        description: "Guidance on documenting non obvious values close to where they are used, the same discipline this skill's comment check relies on.",
      },
      {
        href: "https://refactoring.guru/replace-magic-number-with-symbolic-constant",
        label: "Refactoring Guru: Replace Magic Number with Symbolic Constant",
        description: "An independent explanation of the fix this skill's findings point toward, kept separate from this skill's own scope of reporting only.",
      },
    ],
  },

  tags: ["coding", "magic numbers", "code documentation", "code review", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

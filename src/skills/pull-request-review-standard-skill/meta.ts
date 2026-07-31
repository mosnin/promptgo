import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Pull Request Review Standard

Use this skill whenever you are asked to review a pull request, a code diff, or a merge
request against a team's own documented review standard, rather than giving a general
opinion about whether the change looks fine.

## The one rule this skill enforces on itself

Every comment this skill produces about a problem in the diff must name a specific rule
from \`reference/review-checklist.md\`. State it exactly as: \`Rule: <rule name> - <the
rule's exact statement>\`, followed by the line or hunk it applies to and the specific text
that triggers it. A comment with no named rule attached is not a valid output of this
skill.

If something in the diff genuinely bothers you and it does not match any rule in the
checklist, do not stretch a rule to cover it and do not invent a new rule on the spot. Put
it in a clearly separate section headed "Worth a human look, not a standard violation" and
say plainly why it stood out even though no documented rule covers it. That distinction is
the entire point of this skill: a personal style preference dressed up as a standard is
exactly the failure this exists to prevent.

## Before you review anything

Read \`reference/review-checklist.md\` in full first. Do not begin commenting on the diff
before you have the actual list of rules in front of you. If the checklist file is missing
or was not supplied alongside this file, say so and stop, rather than reviewing from memory
or from a generic sense of what good code looks like.

Confirm what is actually in scope: the lines the diff adds, removes or modifies. Do not
review code the diff does not touch, even if you notice something else wrong nearby. If a
defect elsewhere is directly required to understand whether a rule is violated (for
example, a caller of a changed function), you may read it to check, but do not comment on
it unless the diff itself is what violates a rule.

## Reviewing the diff

1. Walk the diff hunk by hunk. For each hunk, check it against every rule in the checklist
   that applies to the kind of change it makes: new logic, changed logic, a new external
   call, a new query, deleted error handling, and so on.
2. For any hunk that violates a rule, write the finding using the exact \`Rule:\` format
   described above, quoting the specific line and stating what about it fails the rule's
   stated condition.
3. For any hunk that changes conditional logic, a new branch, or an error path, check the
   test coverage rule specifically: is there a new or updated test in the same pull request
   that exercises the new behaviour. If not, that is itself a rule violation, not a request
   phrased as a suggestion.
4. Collect anything that is not a rule violation but is still worth flagging into the
   separate worth a human look section. Never let this section grow because a rule was
   applied loosely. If in doubt about whether something matches a rule, quote the rule's
   exact wording and explain why the observed code does or does not meet it, rather than
   rounding up to a violation.

## Output format

Produce two lists and nothing else as the substance of the review, plus a one line summary
count at the top:

- Standard violations: each entry cites a \`Rule:\` line, a specific quoted fragment of the
  diff, and a one sentence explanation of why the fragment fails that rule.
- Worth a human look, not a standard violation: each entry explains, in plain terms, why
  the fragment stood out, and states explicitly that it is not a checklist violation.

If a pull request has no violations of any documented rule, say so plainly rather than
manufacturing a finding to have something to report, and say whether anything landed in the
worth a look list instead.

## What this skill does not do

It does not comment on formatting, whitespace or import ordering unless a rule in the
checklist covers it, since those are almost always the domain of an automated linter, not a
review comment. It does not approve or reject a pull request outright; it produces findings
against a standard, and the decision to merge stays with the humans on the review. It does
not treat the checklist as fixed forever: if a team's checklist is missing a category they
care about, the fix is to add a new named rule to \`reference/review-checklist.md\`, not to
have this skill enforce an unwritten one.
`;

const REVIEW_CHECKLIST_MD = `# Pull Request Review Checklist

Ten named rules this skill's review pass checks a diff against. Each rule below is written
so it can be quoted directly in a review comment using the \`Rule: <name> - <statement>\`
format required by \`SKILL.md\`. A finding that cannot be traced to one of the rules below
belongs in the worth a human look section of the output, not in the violations list.

## 1. Error handling

Statement: a caught exception or error value must either be logged with enough context to
diagnose it, or rethrown or returned to a caller that can act on it. It must never be
caught and silently discarded.

Why it matters: a silently swallowed error turns a real failure into a state that looks
like success everywhere downstream, which is far harder to diagnose than a loud crash.

Triggers a citation when: a catch block, error branch, or checked result is empty, contains
only a comment, or logs nothing and returns a default value without noting the failure
occurred.

## 2. Test coverage for changed logic

Statement: any new or modified branch, conditional, or loop boundary introduced by the
diff must be exercised by at least one new or updated test in the same pull request.

Why it matters: logic that ships without a test regresses silently the next time someone
touches the same function, because nothing fails when it breaks.

Triggers a citation when: the diff adds or changes a conditional, an edge case, or an
error path, and no test file in the same diff touches that new behaviour.

## 3. Naming clarity

Statement: a variable, function, or parameter name must state what it holds or does
clearly enough that a reader does not need to open its definition to understand its role
at the call site.

Why it matters: a misleading or generic name moves the cost of understanding the code from
the one person writing it to every person reading it afterward.

Triggers a citation when: a new identifier is abbreviated to the point of ambiguity, reused
for two different meanings in the same scope, or named after its type rather than its
purpose.

## 4. SQL injection risk

Statement: a SQL query built from request derived, user supplied, or otherwise external
data must use parameterised queries or an established query builder's binding mechanism,
never string concatenation or interpolation of the unsanitised value directly into the
query text.

Why it matters: string built SQL is one of the most common routes to a full database
compromise, and it is preventable with the same query libraries most codebases already
depend on.

Triggers a citation when: a diff builds a query string with a plus operator, an f-string,
template literal interpolation, or a format call around a value that came from outside the
function.

## 5. Hardcoded secrets

Statement: no credential, API key, access token, password, or connection string may appear
as a literal value in source code. It must be read from environment configuration, a
secrets manager, or an injected configuration object.

Why it matters: a secret committed to source control is effectively public the moment the
repository is cloned, mirrored, or exposed, regardless of the repository's stated
visibility.

Triggers a citation when: a new line assigns a string that matches the shape of a key,
token, or password to a constant or variable directly in the diff.

## 6. Resource cleanup

Statement: any file handle, network connection, database cursor, or lock acquired in the
diff must be released on every exit path from the function that acquired it, including
exception paths.

Why it matters: a resource leaked on an exception path is invisible in normal testing and
shows up later as exhausted connections or file descriptors under real load.

Triggers a citation when: a resource is opened without a context manager, a finally block,
or an equivalent guaranteed release, and any path through the function can exit without
closing it.

## 7. Input validation at trust boundaries

Statement: data arriving from an external caller, such as an HTTP request body, a queue
message, a command line argument, or a third party API response, must be validated or type
checked before it is used, not passed directly into business logic.

Why it matters: a boundary that trusts its input by default is the point where a malformed,
oversized, or malicious payload first enters the system, and it is the cheapest place to
stop it.

Triggers a citation when: the diff reads a field from an external payload and uses it in a
query, a file path, or a calculation without a validation or type check step first.

## 8. Logging on failure paths

Statement: a code path that catches, retries, or otherwise handles a failure must emit a
log line that includes enough identifying context, such as an operation name or a relevant
identifier, to find that failure later without reproducing it.

Why it matters: a failure handled quietly and without a trace is functionally invisible to
whoever is on call when its downstream effects eventually surface.

Triggers a citation when: an error or retry branch runs no logging call, or logs a message
with no identifying detail beyond a generic string such as failed.

## 9. Backward compatibility for public interfaces

Statement: a change to a public function's signature, an API response's shape, or a
database column's type or nullability must either preserve the old behaviour for existing
callers or be explicitly flagged as a breaking change with a migration note.

Why it matters: a silent breaking change in a widely called interface fails every caller at
once, often in production, rather than surfacing during the review that could have caught
it.

Triggers a citation when: a diff removes a field, renames a parameter, or narrows an
accepted type on an interface that other files or services already call, with no note
about the change.

## 10. Concurrency and shared state

Statement: code that reads and then writes state shared across threads, requests, or
asynchronous tasks must use a lock, an atomic operation, or another established
concurrency safe pattern, not an unguarded read then write.

Why it matters: an unguarded read then write on shared state produces a bug that only
appears under real concurrent load, which means a single threaded test is very unlikely to
catch it.

Triggers a citation when: the diff reads a shared variable, cache entry, or counter and
writes a new value back to it without a synchronization primitive around both steps.

## Extending this checklist

Add a new numbered rule here, written in the same three part shape of statement, why it
matters, and what triggers a citation, when a team decides a new category deserves a
standing rule. Do not have the review skill enforce a category that has no numbered rule in
this file, since an unwritten rule is indistinguishable from a personal preference to
whoever receives the comment.
`;

const meta: SkillMeta = {
  slug: "pull-request-review-standard-skill",
  name: "Pull Request Review Standard",
  title: "Pull Request Review Standard Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that reviews a pull request against a documented ten rule checklist, requiring every comment to cite a named rule and separating genuine standard violations from a human's own style preference.",

  seo: {
    primaryKeyword: "pull request review standard skill",
    keywords: [
      "pull request review standard skill",
      "free ai skill for pull request review",
      "downloadable pr review checklist skill",
      "ai skill to review code against team rules",
      "how to review a pull request with ai",
    ],
    seoTitle: "Pull Request Review Standard Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable pull request review standard skill that cites a specific documented rule for every comment instead of a vague, unattributed opinion.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/review-checklist.md", content: REVIEW_CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to review a diff, models default to a comfortable middle ground: a short list of unattributed style suggestions, or a plain looks good to me on anything that compiles. Neither response is checkable against a team's actual standard, and neither distinguishes a real defect from a reviewer's personal taste. Requiring every comment to cite a specific named rule from a fixed checklist, and requiring anything that fails to match a rule to be labelled separately rather than folded into the findings, closes both gaps at once.",
  },

  article: {
    intro: [
      "A pull request review standard skill has one job: apply the same documented set of rules to every pull request a team reviews, and never let a finding land without a rule attached to it. Handed a diff and nothing else, most AI assistants default to a generic impression, a loose list of style suggestions or a bare looks good to me, and neither one is checkable against anything a team actually agreed to.",
      "This is a free ai skill for pull request review teams who want a consistent standard rather than a fresh opinion every time. It ships as two plain text files, a main instructions file and a ten rule reference checklist covering error handling, test coverage, naming clarity, and security sensitive patterns such as string built SQL and hardcoded secrets, both previewable in full before you download the zip.",
    ],

    sections: [
      {
        heading: "Why citing a named rule beats a vague comment",
        body: [
          "This could be cleaner is not a finding, it is a feeling, and it gives the person receiving it nothing to act on beyond guessing what the reviewer meant. This pull request review standard skill closes that gap by making every comment trace back to a specific, quotable rule with a stated condition and a stated reason it exists, so a reader can check the rule against the code in seconds.",
        ],
      },
      {
        heading: "How this differs from a one-off code review prompt",
        body: [
          "A code review prompt like this site's own code review prompt is built to run once, on one diff, hunting freshly for whatever specific failing input that particular change introduces. That is the right tool for a single high stakes diff.",
          "This skill does something narrower on purpose. It does not reason freely about what might be wrong; it checks a diff against a fixed, named checklist agreed in advance, and refuses to report anything absent from that list as though it were a rule. The prompt is an adversary hunting fresh bugs, this skill is a compliance pass, the same rules applied the same way on the hundredth pull request as the first.",
        ],
      },
      {
        heading: "The rules inside the checklist",
        body: [
          "The reference checklist names ten rules across four groups: correctness discipline (error handling, test coverage, backward compatibility), readability (naming clarity), security sensitive patterns (SQL injection risk, hardcoded secrets, input validation), and operational safety (resource cleanup, logging on failure paths, concurrency). Built as an ai skill to review code against team rules rather than general taste, each rule states its condition, why it matters, and what specifically triggers a citation, so the instructions can demand an exact quoted format rather than a paraphrase.",
        ],
      },
      {
        heading: "How to review a pull request with AI using this checklist",
        body: [
          "The checklist is read in full before a single line is commented on, then the diff is walked hunk by hunk against every rule that applies to the kind of change it makes. A hunk adding a new conditional gets checked against the test coverage rule specifically, not just glanced at, and scope stays tight to what the diff actually touches.",
        ],
      },
      {
        heading: "The worth a human look list, and why it stays separate",
        body: [
          "Not everything a careful reviewer notices maps onto one of ten named rules, and pretending otherwise is how a personal preference quietly becomes an enforced standard. When the skill notices something that bothers it but cannot point to a specific rule, the instructions require a separate section headed worth a human look, not a standard violation, keeping the credibility of the checklist itself intact.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not approve or reject a pull request outright, only produce structured findings against a documented standard, leaving the merge decision with the humans on the review. As a downloadable pr review checklist skill it also will not treat the checklist as permanent, since teams extend it with new numbered rules whenever a category deserves standing coverage.",
        ],
      },
    ],

    howTo: {
      name: "How to use the pull request review standard skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/review-checklist.md directly on this page before downloading, so you know exactly what standard is about to be applied.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Adapt the checklist to your team",
          text: "Add, remove or reword numbered rules so the file reflects the standard your team has actually agreed to, in the same three part shape as the existing rules.",
        },
        {
          name: "Hand both files to your assistant with the diff",
          text: "Keep the folder structure intact so the instructions can point to the checklist file, then supply the pull request diff to review.",
        },
      ],
    },

    faq: [
      {
        question: "How is this different from just asking an AI assistant to review my code?",
        answer:
          "A plain request produces whatever the model considers good practice in general, which shifts from run to run and rarely matches what your team specifically agreed to enforce. This skill forces every finding to cite one of a fixed set of named rules, so the standard applied is written down and the same on every pull request rather than improvised each time.",
      },
      {
        question: "What happens to an issue that does not match any rule in the checklist?",
        answer:
          "It still gets written down, but in a clearly separate section labelled worth a human look, not a standard violation, rather than folded into the findings as though it carried equal weight. That keeps a personal style preference from being disguised as an agreed standard, while still surfacing a genuine instinct worth a second look.",
      },
      {
        question: "Can I add my own rules to the checklist?",
        answer:
          "Yes, and that is the intended way to use this skill over time. The checklist file is plain markdown text, so a team edits it directly, adding a new numbered rule in the same statement, why it matters, and trigger condition shape as the ten that ship with it.",
      },
      {
        question: "Should I use this instead of the code review prompt on this site?",
        answer:
          "Use the code review prompt for a single high stakes diff where you want a fresh adversarial search for whatever specific bug that change introduces. Use this skill when you want the same named rules applied consistently across every pull request a team reviews over time, which a one-off prompt is not built to guarantee.",
      },
      {
        question: "Does the checklist cover security issues like SQL injection and hardcoded secrets?",
        answer:
          "Yes, both are named rules in the reference checklist with a stated trigger condition: string built SQL queries touching external data, and any literal credential, API key or connection string committed directly in source code rather than read from configuration.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser, with no server call behind either action, and nothing about the diff or codebase you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "For a single fresh adversarial pass on one diff, rather than a reusable checklist applied the same way to every pull request.",
      },
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description: "A natural next step once this skill's test coverage rule flags a changed branch with no accompanying test.",
      },
      {
        href: "/coding-prompts/security-review-prompt",
        label: "security review prompt",
        description: "For a deeper, dedicated pass on authorisation and injection risk beyond the two security rules this checklist covers.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "For seeing exactly what a diff changed, line by line, before running it through this skill's rule by rule review.",
      },
    ],

    externalLinks: [
      {
        href: "https://google.github.io/eng-practices/review/reviewer/standard.html",
        label: "Google engineering practices: the standard of code review",
        description: "An independent, published statement of what a reviewer is responsible for, and the source this skill's approach to scope and evidence is checked against.",
      },
      {
        href: "https://owasp.org/www-community/attacks/SQL_Injection",
        label: "OWASP: SQL Injection",
        description: "The reference explanation of the attack pattern behind this checklist's SQL injection risk rule.",
      },
      {
        href: "https://martinfowler.com/bliki/TestCoverage.html",
        label: "Martin Fowler: Test Coverage",
        description: "An independent argument for treating coverage as a diagnostic signal rather than a target, informing how this checklist's test coverage rule is framed.",
      },
      {
        href: "https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning",
        label: "GitHub Docs: About Secret Scanning",
        description: "Background on automated detection of committed credentials, the same failure this checklist's hardcoded secrets rule checks for by hand.",
      },
    ],
  },

  tags: ["coding", "code review", "pull requests", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

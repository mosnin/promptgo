import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Error Handling Consistency Audit

Use this skill when you are given real source code, a whole file or a
cohesive module of it, containing multiple functions or methods that can
fail, and the job is to check whether their failure paths follow one
consistent pattern. This skill does not judge which pattern is correct in
the abstract. It only checks whether the code in front of it is internally
consistent, and names exactly where it is not.

## What you need before you start

Real code, not a description of code. A summary like "the repository layer
throws on not found" is not enough to audit; this skill reasons from the
literal lines that handle failure, quoted exactly, never from a paraphrase
of what those lines probably do. If you are handed a description instead of
code, say so and ask for the actual source before producing any findings.

## Step 1: find every function that can fail

Read the supplied file or module and list every function or method with at
least one path that can fail: a lookup that might not find a record, a
network or file call that might reject, a parse that might not produce a
valid value, a validation check that might reject its input. Skip pure
functions with no failure path; they have nothing for this skill to
classify. Number the list.

## Step 2: quote each function's exact failure path

For every function on the list, quote the exact lines that run when the
failure happens, copied verbatim from the source, not summarised. This is
the evidence the rest of the audit is built on. A function that returns
null on one line and throws on another, inside the same failure branch, gets
both lines quoted; that is itself a finding worth surfacing.

## Step 3: classify each quoted failure path

Assign each quoted path to one of these named patterns, or to "other" with a
one line description if none fit:

- **Thrown typed exception**: a \`throw\` of a named error class or a
  built-in error type.
- **Thrown generic exception**: a \`throw\` of a bare string, a plain object
  literal, or the built-in \`Error\` with no subclass.
- **Result or Either return**: a return value that wraps success and failure
  in a tagged shape, for example \`{ ok: true, value }\` versus
  \`{ ok: false, error }\`, or a named \`Result\`/\`Either\` type.
- **Sentinel return**: \`null\`, \`undefined\`, \`-1\`, \`false\`, or another
  in-band value standing in for failure, indistinguishable from a valid
  result by its type alone.
- **Rejected promise**: an \`async\` function that lets a failure propagate
  as a rejected promise without an explicit \`throw\` in the function body
  itself, or an explicit \`Promise.reject\`.
- **Error-first callback**: a callback invoked as \`callback(err, ...)\`
  with a non-null first argument on failure.

Do not invent a seventh category to avoid picking one of these; if a failure
path genuinely fits none of them, use "other" and describe it in one plain
sentence rather than stretching a category to fit.

## Step 4: establish the module's pattern

The established pattern is whichever classification the largest number of
functions in the file or module use, unless the user has explicitly told
you what the project's convention is, in which case use that stated
convention instead of counting. State which of the two you used: counted
majority, or a convention the user told you directly.

If there is a tie, or every function uses a different pattern, say plainly
that no established pattern exists in the supplied code, rather than
arbitrarily picking one side of the tie to call correct.

## Step 5: flag every function that differs

For every function whose classification does not match the established
pattern, write one flag. A flag must name the function, quote its exact
failure path again, name its classification, name the established pattern
it differs from, and state the concrete difference in behaviour a caller
would see, for example: "getOrderById throws OrderNotFoundError on a
missing record; refundOrder returns null in the same situation, so a caller
that wraps every other call in try/catch will silently receive null instead
of an exception here."

Do not flag a function whose failure path genuinely matches the established
pattern, and do not flag a function with no failure path at all; step 1
already excluded it.

## What this skill does not do

It does not decide which pattern a codebase should use in the abstract. It
never recommends "always throw" or "always return Result" as a universal
rule, because that judgement depends on language, framework and team
convention this skill has no visibility into. It only ever compares the
supplied code against itself, or against a convention the user explicitly
stated, and reports where the two disagree. If asked for a suggested fix, it
proposes aligning the deviating function to the pattern already established
in that file or module, never a pattern invented from outside the supplied
code.

It also does not review naming, formatting, test coverage, or anything
about the code besides the failure path itself. A broader pull request
review checklist and a check for configuration drift are different jobs
with different skills; this one is narrow on purpose, matching this site's
practice of keeping each skill's mechanism to one checkable thing.

## The limitation you must state every time

This audit reasons only from the source actually supplied. It cannot see a
function defined elsewhere that the module calls into, it cannot see
whether a caller actually depends on the current inconsistent behaviour,
and it cannot know whether a deviation was a deliberate, documented
exception rather than an oversight. Every audit produced with this skill
must end by stating that limitation and recommending the flagged functions
be confirmed with whoever owns that code before any pattern is changed.

## Working example

Before running this on real code the first time, read through
\`reference/worked-example.md\`. It is a full pass over one small module,
four functions, three of them consistent and one flagged, with every quote
and every classification shown so you can see exactly what a correct audit
output looks like end to end.
`;

const WORKED_EXAMPLE_MD = `# Worked example: auditing one module's error handling

This is a complete pass of the process in SKILL.md against one small,
realistic module. Use it to check your own output is shaped the same way:
every function listed, every failure path quoted verbatim, every
classification named, and exactly one function flagged with a concrete
statement of what differs.

## The supplied code

\`\`\`typescript
// src/services/orderService.ts

class OrderNotFoundError extends Error {
  constructor(orderId: string) {
    super(\`Order \${orderId} was not found\`);
    this.name = "OrderNotFoundError";
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function getOrderById(orderId: string): Order {
  const order = database.orders.find((o) => o.id === orderId);
  if (!order) {
    throw new OrderNotFoundError(orderId);
  }
  return order;
}

export function createOrder(payload: OrderInput): Order {
  if (!payload.customerId || payload.items.length === 0) {
    throw new ValidationError("customerId and at least one item are required");
  }
  const order = buildOrderFrom(payload);
  database.orders.push(order);
  return order;
}

export function cancelOrder(orderId: string): Order {
  const order = database.orders.find((o) => o.id === orderId);
  if (!order) {
    throw new OrderNotFoundError(orderId);
  }
  order.status = "cancelled";
  return order;
}

export function refundOrder(orderId: string): Order | null {
  const order = database.orders.find((o) => o.id === orderId);
  if (!order) {
    return null;
  }
  order.status = "refunded";
  return order;
}
\`\`\`

## Step 1: functions that can fail

All four exported functions have a failure path: each one performs a lookup
or a validation check that can reject its input, so all four go on the
list. Nothing is excluded at this step in this particular module.

## Step 2 and 3: quoted failure paths and classification

1. **getOrderById**
   \`\`\`typescript
   if (!order) {
     throw new OrderNotFoundError(orderId);
   }
   \`\`\`
   Classification: thrown typed exception. \`OrderNotFoundError\` is a named
   class extending \`Error\`.

2. **createOrder**
   \`\`\`typescript
   if (!payload.customerId || payload.items.length === 0) {
     throw new ValidationError("customerId and at least one item are required");
   }
   \`\`\`
   Classification: thrown typed exception. \`ValidationError\` is a named
   class extending \`Error\`.

3. **cancelOrder**
   \`\`\`typescript
   if (!order) {
     throw new OrderNotFoundError(orderId);
   }
   \`\`\`
   Classification: thrown typed exception, the same \`OrderNotFoundError\`
   class used by \`getOrderById\`.

4. **refundOrder**
   \`\`\`typescript
   if (!order) {
     return null;
   }
   \`\`\`
   Classification: sentinel return. \`null\` is an in-band value the return
   type \`Order | null\` allows, indistinguishable from a valid absence
   without checking that type explicitly.

## Step 4: the established pattern

Three of the four functions, \`getOrderById\`, \`createOrder\` and
\`cancelOrder\`, throw a named typed exception on failure. That is the
counted majority, so thrown typed exception is this module's established
pattern. No convention was stated by a user in this example, so the
majority count is what establishes it.

## Step 5: the flag

**refundOrder** differs from the established pattern.

- Established pattern: thrown typed exception, matching
  \`getOrderById\` and \`cancelOrder\`, both of which throw
  \`OrderNotFoundError\` on exactly the same condition, an order id with no
  matching record.
- refundOrder's pattern: sentinel return, \`return null\`.
- Concrete difference: a caller that wraps \`getOrderById\` and
  \`cancelOrder\` in a try/catch expecting \`OrderNotFoundError\` on a
  missing order will not catch anything when the same missing-order
  condition happens inside \`refundOrder\`. It will instead receive \`null\`
  where it expected an \`Order\`, and any code that calls
  \`refundedOrder.status\` without a null check will throw a completely
  unrelated \`TypeError\` at a different point in the program, far from
  where the real problem, the missing order, actually occurred.

## What a suggested fix would say, if one were asked for

If asked to propose a fix, this skill would suggest changing
\`refundOrder\`'s failure path to throw \`OrderNotFoundError\` on a missing
order, the same class and the same condition already used by
\`getOrderById\` and \`cancelOrder\`, since that is the pattern already
established inside this module. It would not propose switching the whole
module to a Result type or any other pattern not already present in the
supplied code, because inventing a new convention from outside the source
is outside what this skill does.

## Reading this example correctly

Notice what did not happen here. The audit did not say returning null is
wrong in general; plenty of consistent codebases use sentinel returns
everywhere on purpose. It said this specific function returns null while
the other three functions performing the same kind of lookup throw, inside
one module, and that mismatch is what a caller will actually trip over.
`;

const meta: SkillMeta = {
  slug: "error-handling-consistency-audit-skill",
  name: "Error Handling Consistency Audit",
  title: "Error Handling Consistency Audit Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that checks whether every function in a real code module handles failure the same way, quoting each failure path verbatim and flagging any function whose pattern differs from the one already established.",

  seo: {
    primaryKeyword: "error handling consistency audit skill",
    keywords: [
      "error handling consistency audit skill",
      "free ai skill for error handling review",
      "downloadable error handling pattern checklist",
      "ai skill to check error handling consistency in code",
      "how to audit error handling patterns with ai",
    ],
    seoTitle: "Error Handling Consistency Audit Skill: Free AI Download",
    seoDescription:
      "A free, downloadable error handling consistency audit skill that checks whether every function in a code module fails the same way, and flags the ones that do not.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and reviewed by the Fast Prompts engineering editorial team against this site's authoring standard for analytical, non-generative skills.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to review error handling across a file, models tend to comment on each function in isolation, praising or critiquing its individual choice of throw versus return without ever comparing it against the other functions in the same module. This skill's classification step forces every failure path into one of six named patterns first, so a mismatch inside a single file becomes visible as a direct comparison rather than a set of disconnected individual opinions.",
  },

  article: {
    intro: [
      "An error handling consistency audit skill only earns its name if it compares functions against each other, not against an abstract idea of the right pattern. Handed a file with four functions that can fail, most AI assistants will happily praise or critique each one on its own terms, throw versus return null, without ever noticing that three of the four already agree with each other and the fourth quietly does not. This skill is built to make that comparison the whole point, which is what makes it a free ai skill for error handling review worth trusting rather than a generic code review aid wearing a consistency label.",
      "It ships as two plain text files: a main instructions file and a worked example reference file that runs the process against a full, realistic module. Both are previewable in full on this page before you download the .zip.",
      "It is deliberately narrow. It does not decide which pattern a codebase should use, only whether the code in front of it already agrees with itself.",
    ],
    sections: [
      {
        heading: "Why per-function opinions miss the actual problem",
        body: [
          "A model reviewing one function at a time can only say whether that function's own choice looks reasonable in isolation. It cannot say whether that choice matches the other functions beside it, because nothing in a per-function review forces the comparison. Most real defects are not 'this pattern is bad,' they are 'this pattern differs from the other three doing the same kind of work,' and a caller written against the majority pattern will not notice until the deviation reaches production.",
          "This skill's process is built to surface that mismatch: it treats consistency across a file as the thing being measured, not the merit of any single function's approach.",
        ],
      },
      {
        heading: "The six named patterns this ai skill to check error handling consistency in code uses",
        body: [
          "Every quoted failure path gets sorted into one of six concrete categories: thrown typed exception, thrown generic exception, Result or Either return, sentinel return, rejected promise, or error-first callback. Naming the categories up front is what makes 'these two functions disagree' a checkable claim instead of a vague impression, because both functions being compared land in a specific, named bucket rather than a fuzzy sense of 'different style.'",
          "A failure path that fits none of the six gets called 'other' with a one line description, rather than being stretched into a category it does not really belong to.",
        ],
      },
      {
        heading: "How the established pattern gets decided",
        body: [
          "The skill counts which classification the largest number of functions in the file or module actually use, and calls that the established pattern, unless the user has directly stated what the project's convention is, in which case that stated convention is used instead of a count. When there is a tie, or every function differs, the instructions require saying plainly that no established pattern exists in the supplied code rather than arbitrarily picking a side.",
          "This is what keeps the audit honest in a module that genuinely has no convention yet: it reports the absence of one instead of inventing a majority that is not really there.",
        ],
      },
      {
        heading: "How a flag is written",
        body: [
          "Every flagged function gets its exact failure path quoted a second time alongside the established pattern it differs from, plus a concrete sentence about what a caller would actually experience because of the mismatch, not a generic 'this is inconsistent' comment. A downloadable error handling pattern checklist is only useful if the output it produces tells a reviewer exactly which line to look at and exactly why it matters to whoever calls that function. That flag format is how to audit error handling patterns with ai without producing a list of vague style opinions.",
        ],
      },
      {
        heading: "How this differs from a broader pull request review",
        body: [
          "This site also publishes a pull request review standard skill covering the full range of a PR review: naming, tests, structure, documentation, and more, as one broad pass. This skill is not a smaller version of that checklist. It looks at exactly one thing, whether a module's failure paths agree with each other, and goes deeper on that dimension than a general review pass would. It is also unrelated to checking configuration values against an expected state, a separate skill on this site; this one never looks at configuration, only at code that can fail.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It never recommends a universal 'correct' error handling pattern, because that judgement depends on language, framework and team convention this skill cannot see from a code excerpt alone. It only compares the supplied code against itself, or against a convention the user explicitly stated, and any suggested fix aligns a deviating function to the pattern already established in that file, never a pattern invented from outside the code it was given.",
        ],
      },
    ],
    howTo: {
      name: "How to use the error handling consistency audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real source code",
          text: "Copy the actual file or module you want audited, not a description of it. The audit reasons from quoted, verbatim failure paths, so a paraphrase will not produce a reliable result.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so SKILL.md can point to the worked example, then supply the source code and ask for the five step audit described in the instructions.",
        },
        {
          name: "Confirm any flag with the code's owner",
          text: "Treat every flagged function as a starting point for a conversation with whoever owns that file, since the audit cannot see whether a deviation was deliberate and documented elsewhere.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill decide which error handling pattern I should use?",
        answer:
          "No. It only compares the functions in the code you supply against each other, or against a convention you explicitly state, and reports where they disagree. It never recommends a universal correct pattern, since that depends on language, framework and team convention it has no visibility into from a code excerpt alone.",
      },
      {
        question: "What counts as real code for this audit?",
        answer:
          "The actual source, a file or a cohesive module, copied verbatim. A summary of what the code does is not enough, because every finding this skill produces is built on quoting the exact failure path lines, not a paraphrase of what those lines probably do.",
      },
      {
        question: "How is this different from the pull request review standard skill on this site?",
        answer:
          "That skill runs a broad pass covering naming, tests, structure and documentation across a whole pull request. This skill looks at exactly one dimension, whether a module's failure paths follow one consistent pattern, and goes deeper on that single check than a general review pass would.",
      },
      {
        question: "Is this the same as checking for configuration drift?",
        answer:
          "No. Configuration drift is about comparing configuration values against an expected state, a separate skill on this site entirely. This skill never looks at configuration; it only examines code that can fail and classifies how each function fails.",
      },
      {
        question: "What happens if the code has no clear majority pattern?",
        answer:
          "The skill's instructions require stating plainly that no established pattern exists in the supplied code, rather than arbitrarily picking one side of a tie to call correct. A tie is itself a finding worth reporting, not something to paper over.",
      },
      {
        question: "Will it flag a function that has no failure path at all?",
        answer:
          "No. The first step of the process only lists functions that can actually fail, a lookup that might miss, a call that might reject, a check that might reject its input. A pure function with nothing that can fail is excluded before classification even starts.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads, and editing happens afterward in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description: "A natural next step once this skill has flagged a function whose failure path needs aligning to the module's established pattern.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "For a broader pass over the same diff, once this skill's narrower error handling check is finished.",
      },
      {
        href: "/coding-prompts/api-error-handling-prompt",
        label: "api error handling prompt",
        description: "For drafting a new error handling approach for an API from scratch, rather than auditing an existing module's consistency.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description: "For tracing the actual production failure that a deviating error handling pattern this skill flags can quietly cause.",
      },
    ],
    externalLinks: [
      {
        href: "https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions",
        label: "Microsoft Learn: Best Practices for Exceptions",
        description: "An independent reference on typed exception design, one of the patterns this skill classifies failure paths against.",
      },
      {
        href: "https://doc.rust-lang.org/book/ch09-00-error-handling.html",
        label: "The Rust Programming Language: Error Handling",
        description: "A worked explanation of the Result pattern this skill checks for as a distinct, named category of failure handling.",
      },
      {
        href: "https://www.joelonsoftware.com/2003/10/13/13/",
        label: "Joel on Software: Exceptions",
        description: "A widely cited independent argument on the tradeoffs between exceptions and return based error signalling, the same tradeoff this skill remains neutral on by design.",
      },
    ],
  },

  tags: ["coding", "error handling", "code review", "consistency", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

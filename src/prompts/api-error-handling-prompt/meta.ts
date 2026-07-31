import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "api-error-handling-prompt",
  name: "Error Handling Reviewer",
  title: "API Error Handling Prompt",
  category: "coding-prompts",
  taskType: "evaluate",
  summary:
    "Tests whether a caller can actually tell one failure mode from another, and names every place a generic catch block quietly merges them into one.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["apis", "error handling", "status codes", "reliability"],

  seo: {
    primaryKeyword: "api error handling prompt",
    keywords: [
      "api error handling prompt",
      "how to handle api errors with ai",
      "chatgpt prompt for api error handling",
      "how to tell a 400 error from a 500 error",
      "retryable vs permanent api errors",
      "api error handling checklist",
    ],
    seoTitle: "API Error Handling Prompt: Find the Collapsed Failures",
    seoDescription:
      "An api error handling prompt that checks whether a caller can tell a validation failure from a timeout apart, not just whether an exception was caught.",
  },

  prompt: {
    text: `You are reviewing error handling in an API endpoint. Your job is not to confirm that errors are caught, it is to test whether a caller can tell one failure apart from another using only what the response actually contains: the status code, the error body, and whether a retry is safe.

STACK: {{STACK}}
THE CODE OR ENDPOINT DESCRIPTION: {{CODE}}
FAILURE MODES THAT MUST STAY DISTINGUISHABLE: {{FAILURE_MODES}}
WHAT THE CALLER DOES WITH AN ERROR RESPONSE: {{CALLER_BEHAVIOR}}

STEP 1: MAP EVERY PATH. Walk each branch that returns or throws an error and name the failure mode it represents: validation, authentication, authorization, not found, conflict, rate limit, downstream timeout, downstream failure, or unexpected exception.

STEP 2: FIND THE COLLAPSES. List every place where two or more distinct failure modes reach the same status code, the same error shape, or the same generic catch block. For each collapse, state precisely what the caller cannot currently tell apart, and name the wrong action that follows, such as retrying a validation error or failing silently on a timeout.

STEP 3: CHECK RETRYABILITY IS SIGNALLED. For each failure mode, state plainly whether it is safe to retry, and whether the response makes that decidable without knowledge the caller does not have.

STEP 4: RANK AND FIX. Order the collapses by how much damage they could cause the caller described, then propose the smallest change, a distinct status code, an error code field, or a retry header, that would make each one distinguishable again.

Do not treat a try block or a catch clause as proof that error handling exists. A single catch that returns 500 for everything is a defect, not a safety net, and should be named as one.`,
    variables: [
      {
        token: "STACK",
        label: "Stack and what the endpoint calls",
        example: "Node.js 20, Express, this endpoint calls a downstream payments service over HTTP",
      },
      {
        token: "CODE",
        label: "The code or a precise description of the endpoint",
        example:
          "router.post('/orders', async (req, res) => {\n  try {\n    const order = await createOrder(req.body);\n    res.status(200).json(order);\n  } catch (err) {\n    res.status(500).json({ error: 'Something went wrong' });\n  }\n});",
      },
      {
        token: "FAILURE_MODES",
        label: "Failure modes that must stay distinguishable",
        example:
          "Invalid request body, expired auth token, order already exists (idempotency conflict), payments service timeout, payments service decline",
      },
      {
        token: "CALLER_BEHAVIOR",
        label: "What the caller does with an error response",
        example:
          "A mobile client that retries automatically on any 5xx response and shows the raw error message to the user on any 4xx response",
      },
    ],
    expectedOutput:
      "Every branch labelled with its failure mode, a list of collapses naming exactly what the caller cannot tell apart and the wrong action that follows, a retryability verdict per failure mode, and a ranked, minimal fix for each collapse in order of caller damage.",
    followUps: [
      "Take the highest ranked collapse and write the exact response body, status code and error code field that would fix it.",
      "The caller behaviour is now a server side job that retries with backoff instead of a client. Redo step three under that assumption.",
      "Here is the updated code after applying your top two fixes. Check whether it introduced a new collapse.",
    ],
    pitfalls: [
      "Describing the failure modes vaguely, such as bad input, gives the mapping step nothing to check the code against, and every branch ends up labelled the same generic thing the diff already implied.",
      "Supplying the code without saying what the caller does with an error turns step three into a guess. The same missing retry signal is a minor annoyance for a human clicking retry and a production incident for an automated client.",
      "Fixing the top collapse and stopping there. The rank exists because most endpoints have three or four, and the second one is usually the timeout that a monitoring alert will eventually surface as a mystery.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked to review error handling will confirm that a try block exists and stop there, because catching an exception reads as handling it. The distinguishability test asks a harder question: whether the response a caller receives actually differs between a validation mistake and a downstream timeout, since one generic catch block satisfies the first check while quietly failing the second.",
  },

  article: {
    intro: [
      "An api error handling prompt that only checks whether errors are caught is grading the wrong thing. Almost every endpoint catches something. What most of them fail to do is tell the caller which of several different failures actually happened, which means a validation mistake, an expired token and a downstream timeout can all arrive at the client wearing the same status code and the same generic message.",
      "This one starts from the caller's side of the wire. It maps every branch to a named failure mode, finds where distinct modes collapse into one response shape, and checks whether retryability is decidable from the response alone rather than guessed.",
    ],

    sections: [
      {
        heading: "Catching an exception is not the same as handling it",
        body: [
          "Learning how to handle api errors with ai starts by refusing to accept a caught exception as proof that anything downstream of it was handled. A try block that funnels every failure into one 500 and one message has technically caught the error. It has also erased the information a caller would need to respond correctly.",
          "The prompt treats a catch clause as a claim rather than evidence. Step one names every branch before anything is judged, so the review works from what the code actually does rather than the intention a try block signals just by existing.",
        ],
      },
      {
        heading: "Why a 400 is not a 500",
        body: [
          "Knowing how to tell a 400 error from a 500 error is the most basic form of this discipline, and it is the one a generic catch block erases first. A 400 means the caller sent something the server will never accept, however many times it is retried. A 500 means the server failed on a request that might succeed if tried again. Collapsing both into one code turns a client's retry logic into a coin flip.",
          "Clients are written to trust the code. A mobile app that retries on any 5xx will hammer an endpoint that is actually rejecting malformed input, and one that treats every error as terminal will give up on a timeout a second attempt would have cleared.",
        ],
      },
      {
        heading: "Using it as a chatgpt prompt for api error handling",
        body: [
          "Used as a chatgpt prompt for api error handling, the mapping step does more work than it looks like. Naming eight branches as eight failure modes forces a comparison a summary review skips: two branches with different causes and the same status code sit next to each other in the output, and the collapse becomes visible.",
          "That structure is also why a description of the endpoint works almost as well as the code itself. What matters is the shape of the responses the caller can receive, and a precise list of those shapes carries the same information a diff does.",
        ],
      },
      {
        heading: "Retryable vs permanent, signalled or guessed",
        body: [
          "The retryable vs permanent api errors distinction only helps a caller if the response states it. A rate limit and a permanent authorization failure both commonly arrive as a bare 4xx with no header and no field, leaving the caller to guess, and a wrong guess either burns a retry budget on something that will never succeed or gives up on something that would have.",
          "Step three makes that guess explicit by asking, for every failure mode, whether retryability is decidable from the response alone. Where it is not, the fix is rarely a rewrite. It is usually one field or one header that turns a guess into a lookup.",
        ],
        list: [
          "A rate limit response with no Retry-After header and no distinction from a hard block.",
          "A timeout and a validation failure both returned as a bare 500 with the same message.",
          "An idempotency conflict returned as 500 instead of 409, making a safe no-op look like a fresh failure.",
          "An authentication failure and an authorization failure sharing one 401 with identical text.",
          "A downstream provider decline surfaced as the same generic error as an internal bug.",
        ],
      },
      {
        heading: "What the api error handling prompt maps before it judges anything",
        body: [
          "The order of the steps is deliberate. Judging first and mapping second produces the generic advice every review of this kind tends to produce: add more specific error handling, without saying where. Mapping first means every collapse reported points at a real branch, with the failure modes it merges named explicitly.",
          "This also keeps the review honest about scope. A branch with only one failure mode is not a defect for returning one status code, and the prompt is instructed to say so rather than manufacture a distinction that does not exist.",
        ],
      },
      {
        heading: "An api error handling checklist for endpoints already in production",
        body: [
          "This doubles as an api error handling checklist for endpoints that already shipped, the more common situation than reviewing something new. Production code accumulates collapsed failure modes gradually, usually because a second cause was added to an existing catch block rather than given its own branch, and nobody revisits the original status code.",
          "Running it periodically against endpoints that have grown catches these additions before a caller discovers them the expensive way, through a support ticket rather than a review.",
        ],
      },
    ],

    howTo: {
      name: "How to use the api error handling prompt",
      steps: [
        {
          name: "Supply the code or a precise endpoint description",
          text: "Every branch that can produce an error, not a summary of what the endpoint is meant to do. A description of intentions hides exactly the collapse the review exists to find.",
        },
        {
          name: "Name the failure modes you actually care about",
          text: "Vague categories like bad input give the mapping step nothing to check against. List specific causes, since the ones you forget to name are the ones most likely to be merged.",
        },
        {
          name: "State what the caller does with an error",
          text: "A retry policy, a user facing message, a queue that dead letters after three attempts. Damage from a collapse depends on what happens next, and step four cannot rank anything without it.",
        },
        {
          name: "Fix the top collapse, then run it again",
          text: "One endpoint usually has more than one, and the fix for the first can expose a second by changing which branches now share a shape.",
        },
      ],
    },

    faq: [
      {
        question: "Does this replace following a standard like RFC 9110 for status codes?",
        answer:
          "No, it assumes the standard as a baseline and checks whether the code actually follows it in practice. Plenty of endpoints return technically valid status codes while still collapsing several distinct causes into the same one, which a standard cannot catch on its own because it defines the codes rather than how consistently a given codebase applies them.",
      },
      {
        question: "What if I only have a description of the endpoint, not the code?",
        answer:
          "It still works, provided the description lists every response shape and the condition that produces it rather than a summary of the feature. What the review needs is the set of things a caller can actually receive, and a precise list of those carries the same information as a diff for this particular task.",
      },
      {
        question: "How is this different from a general code review prompt?",
        answer:
          "A general review looks for defects across the whole diff. This one has a single, narrow question: can the caller tell these failures apart from the response alone. That narrower scope is what lets it catch collapses that a broader review usually treats as acceptable, since a catch block that returns 500 looks correct at a glance.",
      },
      {
        question: "Should I run it on internal service to service calls too?",
        answer:
          "Yes, and arguably it matters more there, because internal callers are more likely to be automated and to retry blindly on whatever code they receive. A collapsed failure mode between two internal services tends to surface as a retry storm rather than as a single confused user, which is more expensive to unwind.",
      },
      {
        question: "Can I use it before I have written any error handling yet?",
        answer:
          "Yes, feed it the happy path code plus the list of failure modes you expect, and it will point out which ones the current code cannot distinguish yet rather than only critiquing handling that already exists. Designing the responses before the handling is written tends to produce fewer collapses than adding them afterward.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/error-message-prompt",
        label: "error message prompt",
        description:
          "Once a collapse is found and given its own status code, this writes the visible message and the log line that go with it.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description:
          "For the incident that follows when a caller retries a failure that was never safe to retry in the first place.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "The broader adversarial pass this narrows into one question, whether the caller can tell the failures the diff produces apart.",
      },
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description:
          "For turning the highest ranked collapse into a tracked risk with an owner, rather than a finding nobody revisits.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.rfc-editor.org/rfc/rfc9110.html",
        label: "RFC 9110: HTTP Semantics",
        description:
          "The primary specification for what a 4xx versus a 5xx status code actually means, which the collapse check is measured against.",
      },
      {
        href: "https://docs.stripe.com/api/errors",
        label: "Stripe API reference: errors",
        description:
          "A production example of an API that gives each failure a distinct type and code, cited for what a distinguishable error body looks like in practice.",
      },
      {
        href: "https://sre.google/sre-book/addressing-cascading-failures/",
        label: "Google SRE book: addressing cascading failures",
        description:
          "The primary source on how blind retries against undifferentiated errors turn one failure into an outage.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: prompt engineering overview",
        description:
          "Documents the step ordering pattern behind mapping every branch before any judgement is made about it.",
      },
    ],
  },
};

export default meta;

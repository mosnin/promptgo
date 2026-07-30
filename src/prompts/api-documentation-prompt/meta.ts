import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "api-documentation-prompt",
  name: "Source Cited Reference",
  title: "API Documentation Prompt",
  category: "coding-prompts",
  taskType: "generate",
  summary:
    "Documents only what the handler provably does, traces every field and status code to the line that produces it, and quarantines everything it could not check.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["api", "openapi", "documentation", "endpoints"],

  seo: {
    primaryKeyword: "api documentation prompt",
    keywords: [
      "api documentation prompt",
      "how to document a rest api endpoint",
      "how to document api error responses",
      "how to generate an openapi spec from code",
    ],
    seoTitle: "API Documentation Prompt: Only What the Code Does",
    seoDescription:
      "An api documentation prompt that states only behaviour present in the handler, enumerates errors from real return sites, and quarantines what it cannot verify.",
  },

  prompt: {
    text: `You are documenting an HTTP endpoint from its implementation. Every statement you make must be traceable to a line in the code supplied. If you cannot point at the code, it belongs in the UNVERIFIED section rather than in the reference.

HANDLER CODE: {{HANDLER}}
REQUEST AND RESPONSE TYPES OR SERIALISERS: {{MODELS}}
MIDDLEWARE, DECORATORS AND FRAMEWORK CONFIG: {{MIDDLEWARE}}
WHO READS THIS AND IN WHAT FORMAT: {{AUDIENCE}}

SECTION 1: SIGNATURE. Method, path, path parameters with types, query parameters with their defaults, and the request body. For every field give the type, whether it is required, whether it is nullable, and the validation actually applied, each cited to the line or construct that establishes it. A field with no validation is documented as unvalidated, never as accepting anything sensible.

SECTION 2: SUCCESS RESPONSES. Every status code this handler can return on a success path, with the body shape for each. Where one endpoint returns both 200 and 201 down different branches, document both and the condition that selects between them.

SECTION 3: ERROR RESPONSES. Walk every path that raises, returns early or fails validation. Give the status, the body and the exact trigger for each. Include framework level errors such as validation failures or content type rejection only where the middleware you were given produces them. Never list a status code because it is conventional.

SECTION 4: SIDE EFFECTS AND IDEMPOTENCY. What changes on success, what remains changed when the handler fails part way through, and whether a second identical call is safe. Mark each as proven by the code or inferred.

SECTION 5: UNVERIFIED. Authentication, authorisation, rate limits, pagination defaults, timeouts, and anything else living in configuration or in middleware you were not shown. For each, say what you would need to see to confirm it.

Write nothing aspirational. Do not describe how the endpoint should behave. Do not produce example values that the validation in section 1 would reject.`,
    variables: [
      {
        token: "HANDLER",
        label: "The handler code",
        example:
          "@router.post('/v2/shipments') async def create_shipment(body: ShipmentIn, idem: str | None = Header(None), db=Depends(get_db)): ... returns 201 with ShipmentOut, or 200 with the existing shipment when idem matches a stored key.",
      },
      {
        token: "MODELS",
        label: "Request and response types or serialisers",
        example:
          "class ShipmentIn(BaseModel): destination: Address; weight_grams: int = Field(gt=0, le=30000); service: Literal['standard','express']; reference: str | None = None",
      },
      {
        token: "MIDDLEWARE",
        label: "Middleware, decorators and framework config",
        example:
          "A global exception handler mapping ValidationError to 422 with a detail array. An auth dependency on the router that raises 401. No rate limiting visible in the application code.",
      },
      {
        token: "AUDIENCE",
        label: "Who reads this and in what format",
        example:
          "External integrators, published as an OpenAPI 3.1 fragment plus a short prose section on idempotency behaviour.",
      },
    ],
    expectedOutput:
      "A signature section where every field carries its real validation and a citation, success and error responses derived from actual branches, an idempotency assessment split into proven and inferred, and a quarantined list of everything the supplied code could not establish.",
    followUps: [
      "Convert sections one to three into an OpenAPI 3.1 path item, leaving the unverified items out entirely rather than guessing at them.",
      "The auth dependency was not supplied. Write the three questions I need answered to move authentication out of the unverified list.",
      "Draft the idempotency section for external readers, describing only the behaviour the handler code proves.",
    ],
    pitfalls: [
      "Supplying the handler without the serialiser produces a signature section full of citations to nothing. The field level truth about nullability almost always lives in the model, not the function.",
      "Publishing the unverified list as though it were documentation is the obvious misuse. It is a list of questions for you, and every item on it needs answering or deleting before anything ships.",
      "A model that has seen a thousand REST APIs will offer 429 and 503 unprompted. The rule against conventional status codes exists because those entries look authoritative and are pure invention.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "Handed a single handler, models document the API they expect rather than the one in front of them: rate limit sections, 429 responses and bearer token schemes appear with nothing in the pasted code to support them. Requiring a line citation for every claim, and a quarantine section for the rest, pushes unverifiable behaviour out of the reference and into a list the reader can check.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "The characteristic failure of an api documentation prompt is fluency. Models have absorbed an enormous quantity of API reference material, so they produce a page that reads exactly like good documentation, complete with a rate limit table and a token scheme, for an endpoint that has neither. The output is confident, well structured and partly fictional.",
      "The defence is a sourcing rule. Every statement in the reference has to be traceable to a line in the code that was supplied, and anything else goes into a quarantined section at the end. That turns invention into a visible list of open questions instead of a paragraph a reader will believe.",
      "The result is api docs that match the actual behaviour, including the parts that are embarrassing: the field with no validation, the endpoint that returns two different success codes, the write that is not rolled back when the second call fails.",
    ],

    sections: [
      {
        heading: "How to document a rest api endpoint from the handler",
        body: [
          "Working out how to document a rest api endpoint means accepting that the truth is spread across at least three files. The route decorator carries the method and path. The model or serialiser carries types, defaults and nullability. The middleware carries authentication and whatever the framework does to a malformed body before your function is entered.",
          "Give the prompt all three and the reference is largely correct on the first pass. Give it only the function and you get a signature section that guesses at the request shape, which is why the models field is separate rather than folded into the handler field.",
          "The distinction between required, optional and nullable is where most existing documentation is wrong. A field that may be omitted and a field that may be sent as null are different contracts, and integrators discover the difference by getting a 422 they did not expect.",
        ],
      },
      {
        heading: "How to document api error responses",
        body: [
          "Anyone asking how to document api error responses is looking at the section everyone skips and every integrator reads first. Success is easy to infer from an example. Failure is not, and an integration is mostly failure handling.",
          "Section three walks every branch that raises or returns early rather than listing the status codes an API of this kind usually has. That produces a shorter list than a generic template would, and every entry on it is real.",
        ],
        list: [
          "The validation rejection, with the exact body shape the framework emits, not a simplified version.",
          "The conflict path, when a uniqueness constraint or an idempotency key collides.",
          "The not found case, and whether it distinguishes absent from forbidden.",
          "The partial failure, where one write succeeded before the error was raised.",
          "The unhandled exception, and what the global handler turns it into.",
        ],
      },
      {
        heading: "Why the api documentation prompt quarantines what it cannot see",
        body: [
          "Authentication, rate limits, pagination defaults and timeouts usually live outside the handler, in a gateway, a decorator or a configuration file. A model that documents them anyway is not being careless, it is completing a familiar pattern, and the completion is plausible enough to survive review.",
          "Section five collects all of it into a list of things the api documentation prompt could not establish, each with the specific artefact that would settle it. Documenting authentication and rate limits properly then becomes a short errand rather than an omission: fetch the gateway config, paste it in, rerun.",
          "The rule also improves the rest of the output. Once a model has somewhere legitimate to put an uncertain claim, it stops smuggling uncertain claims into the reference sections.",
        ],
      },
      {
        heading: "How to generate an openapi spec from code",
        body: [
          "Asking a model how to generate an openapi spec from code is worth doing only where a generator cannot already do it. Frameworks that derive a schema from type annotations produce a more accurate document than any prompt will, and it stays accurate as the code changes.",
          "What generators do badly is everything that is not a type: which status codes a branch can actually produce, whether a second identical call is safe, what remains written after a mid request failure, and what a field means as opposed to what type it holds. That is the gap this fills, and the sensible workflow is generator first, then this prompt for the semantics the generator cannot see.",
        ],
      },
    ],

    howTo: {
      name: "How to use the api documentation prompt",
      steps: [
        {
          name: "Paste the models with the handler",
          text: "Request and response types together. Nullability and defaults live there, and a citation to a line you did not supply is worth nothing.",
        },
        {
          name: "Include the global exception handler",
          text: "It determines what an unhandled error actually returns, which is frequently different from what any individual branch suggests.",
        },
        {
          name: "State the audience and the output format",
          text: "An internal note and a published OpenAPI fragment need different levels of detail, and the field decides how much prose surrounds the reference.",
        },
        {
          name: "Clear the unverified list before publishing",
          text: "Every entry gets answered from the config or deleted. Shipping a reference with a quarantine section still attached is worse than shipping nothing.",
        },
        {
          name: "Curl each documented error",
          text: "Reproduce at least the validation and conflict cases against a running instance. Bodies drift from what the code appears to emit once middleware has reshaped them.",
        },
      ],
    },

    faq: [
      {
        question: "Does the api documentation prompt replace a schema generator?",
        answer:
          "No, it complements one. Use the generator for types and paths, since it stays correct as code changes. Use this for the behaviour a schema cannot express, such as idempotency, partial failure and the conditions that select between two success codes.",
      },
      {
        question: "How many endpoints should I do at once?",
        answer:
          "One. The citation requirement depends on the model holding a specific set of lines in view, and batching endpoints causes the errors from one handler to migrate into the reference for another, which is precisely the failure the sourcing rule exists to prevent.",
      },
      {
        question: "What if my endpoint has no validation at all?",
        answer:
          "It gets documented as unvalidated, which is honest and frequently uncomfortable. Seeing a field described that way in a reference intended for external readers tends to produce the validation ticket faster than any code review comment ever has.",
      },
      {
        question: "Can it document a GraphQL or gRPC service?",
        answer:
          "The structure adapts, though sections two and three need rewording since status codes are replaced by error extensions or status enums. The sourcing rule and the quarantine section carry over unchanged and are the parts doing most of the work.",
      },
      {
        question: "Will it keep the docs up to date as code changes?",
        answer:
          "Only if you rerun it, and the honest answer is that prose documentation drifts regardless. Keep the generated schema as the source of truth for shapes and use this output for the narrative sections, which change far less often than field lists do.",
      },
      {
        question: "Why not let it infer authentication from the route prefix?",
        answer:
          "Because the inference is right often enough to be trusted and wrong often enough to matter. An endpoint mounted under an authenticated router can still have the dependency overridden, and a reader who believes a request needs a token when it does not has been misled about the security posture.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-explanation-prompt",
        label: "code explanation prompt",
        description:
          "Run it on the handler first when the branching is dense, since its side effect list feeds section four directly.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "The unverified list often names real gaps, and the ones that are defects rather than omissions belong in a review.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "sql query prompt",
        description:
          "For endpoints whose response shape is decided by a query, where the grain of the result is the contract.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "For the surrounding material an integrator needs, such as how to obtain credentials and who approves access.",
      },
    ],

    externalLinks: [
      {
        href: "https://spec.openapis.org/oas/v3.1.0",
        label: "OpenAPI Specification 3.1",
        description:
          "The standard that defines how required, nullable and default interact, which is the distinction section one is built around.",
      },
      {
        href: "https://www.rfc-editor.org/rfc/rfc9457",
        label: "RFC 9457: problem details for HTTP APIs",
        description:
          "The published format for machine readable error bodies, and the reference point for what section three should be documenting.",
      },
      {
        href: "https://developers.google.com/style/api-reference-comments",
        label: "Google developer documentation style guide",
        description:
          "Institutional guidance on describing parameters and responses precisely, including why aspirational wording misleads integrators.",
      },
    ],
  },
};

export default meta;

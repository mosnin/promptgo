import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# API Documentation Consistency Check

Use this skill whenever you are given a set of existing API endpoint documentation
entries, two or more, and asked whether they are consistent with each other. This is
an api documentation consistency skill: it compares endpoints that have already been
documented against one another, it does not write documentation for a new endpoint
from its code. If the task is to document a single handler that has no existing
documentation to compare against, this is the wrong skill for that job.

## Before you check anything

Confirm you actually have at least two, and ideally three or more, endpoint
documentation entries to compare. A single endpoint has no majority to derive and
nothing to be inconsistent with, so a consistency check cannot run against it alone.
If only two entries are supplied and they disagree, say plainly that two entries is
not enough to call either one a majority convention, and report the disagreement as
an open question rather than picking a side.

Do not bring in an external standard, OpenAPI style guides, a particular company's
public API reference, or a general sense of REST convention, as the yardstick. The
only correct convention for this check is whichever pattern the majority of the
supplied endpoints actually use today. An endpoint that matches a textbook standard
but disagrees with every other endpoint in the set you were given is still an
outlier, and it gets reported as one.

## Step 1: extract four dimensions from every endpoint

For each endpoint documentation entry supplied, read out its actual convention on
each of these four dimensions. Do not summarise or paraphrase yet, just record what
each entry literally does:

1. Parameter naming convention: camelCase, snake_case, kebab-case, or another
   pattern, and whether path, query and body parameters are named the same way.
2. Error response documentation format: which fields are documented for an error
   body (for example code, message, status, detail, error_code), what they are
   named, and how they are structured.
3. Required-field marking: whether required parameters are marked at all, and if
   so, how, a Required column, an asterisk, bold text, or an explicit sentence.
4. Example request and response formatting: whether examples exist, what is
   included in them (headers, a full body, a curl command), and how the block is
   presented.

## Step 2: derive the majority convention per dimension, separately

Work through the four dimensions one at a time. For each one, group the endpoints by
which structural variant they actually use, then state which group has more members.
Name the endpoints in the majority group explicitly, by their method and path, and
say how many of the total supplied endpoints support that convention, for example
"6 of 8 endpoints document required parameters with a Required column: GET
/v1/orders, POST /v1/orders, and four others."

If a dimension splits evenly with no group larger than another, say so directly
instead of picking a side. Report the split with counts on each side and treat that
dimension as unresolved rather than manufacturing a majority that does not exist.

## Step 3: flag every minority outlier by name, never in general terms

For every endpoint that does not match the derived majority on a dimension, write
one inconsistency entry. Each entry must contain all three of the following, or it
is not a valid output of this skill:

- The specific endpoints being compared, named by method and path: the outlier and
  at least one majority endpoint it is being compared against.
- Exactly what differs between them on that dimension, quoting or describing each
  side's actual convention rather than asserting they simply do not match.
- Which convention was inferred as the majority and from how many endpoints, so the
  comparison is checkable against the evidence rather than asserted from nowhere.

A sentence like "the documentation could be more consistent" or "parameter naming
varies across endpoints" is not an acceptable output. If you cannot name the two
endpoints and the exact difference, the finding is not finished, not a reason to
round it down to a general comment.

## Step 4: separate stylistic drift from a missing-marker gap

Treat one category differently from the other three: an endpoint that marks no
parameters as required at all, when most other endpoints in the set do mark required
parameters, is not a stylistic variant, it is a coverage gap. State that distinction
explicitly in the report, since a reader hitting an endpoint with no required-field
markers cannot tell whether every parameter is genuinely optional or whether marking
was simply skipped when that page was written.

## What this skill does not do

It does not write new documentation for an endpoint that has none. It does not
rewrite the flagged entries to match the derived majority unless explicitly asked to,
since deciding whether to converge on the majority or to keep an outlier for a good
reason is a call for the person who owns the documentation. It does not treat an
external standard, however well known, as the correct answer when it disagrees with
what the majority of the supplied endpoints actually do. It does not invent an
inconsistency between two endpoints that genuinely already agree, and it does not
report a finding on a dimension that only has one supported entry to compare, since a
group of one cannot be an outlier against nothing.

## Output shape

Produce a short summary line stating how many endpoints were compared and how many
inconsistencies were found, then one section per dimension. Each dimension section
states the derived majority with its supporting endpoint count and names, followed by
a list of every outlier entry in the three part shape from step 3. End with the
required-field coverage gaps, if any, reported separately as described in step 4.
`;

const WORKED_EXAMPLE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It walks the full four step process against three
sample endpoint documentation entries, showing how a majority convention is derived
from two of them and how the third is flagged as an outlier against that derived
majority, never against an external standard.

## The three sample endpoint entries

**Endpoint A: GET /v1/orders/{order_id}**

Parameters: order_id (path, required), customer_id (query, required),
status_filter (query, optional). Required parameters are marked with a Required
column set to yes or no. Error response documented as:
\`{ "error_code": "ORDER_NOT_FOUND", "message": "No order matches the supplied id" }\`.
Example response is a fenced JSON block with no accompanying request example.

**Endpoint B: GET /v1/customers/{customer_id}**

Parameters: customer_id (path, required), region_code (query, optional). Required
parameters are marked with the same Required column set to yes or no. Error response
documented as:
\`{ "error_code": "CUSTOMER_NOT_FOUND", "message": "No customer matches the supplied id" }\`.
Example response is a fenced JSON block with no accompanying request example.

**Endpoint C: GET /v1/shipments/{shipmentId}**

Parameters: shipmentId (path), trackingNumber (query), carrier (query). No Required
column and no other marking of any kind, so a reader cannot tell which parameters
are mandatory. Error response documented as:
\`{ "code": "NOT_FOUND", "detail": "Shipment could not be located" }\`. Example
response is a fenced JSON block that also includes a full curl request example,
which neither endpoint A nor endpoint B has.

## Step 1 and 2: deriving the majority

Parameter naming: endpoints A and B both name path and query parameters in
snake_case (order_id, customer_id, region_code). Endpoint C names its parameters in
camelCase (shipmentId, trackingNumber). Two of the three supplied endpoints, A and B,
support snake_case as the majority convention.

Error response format: endpoints A and B both use a body shaped as error_code plus
message. Endpoint C uses a body shaped as code plus detail, a different field count
and different field names entirely, not just a different naming style. Two of the
three supplied endpoints, A and B, support the error_code plus message shape as the
majority convention.

Required-field marking: endpoints A and B both use an explicit Required column with
a yes or no value on every parameter. Endpoint C has no marking of any kind on any of
its three parameters. Two of the three supplied endpoints, A and B, mark required
fields explicitly, which is the majority convention for this dimension.

Example formatting: endpoints A and B each show a response only. Endpoint C shows a
request and a response. This is the one dimension where the sample size is too thin
to call two out of three a stable majority for a formatting choice this specific, so
this reference notes it as observed rather than asserting a firm rule from it.

## Step 3: the inconsistency entries this produces

Parameter naming: endpoint C (GET /v1/shipments/{shipmentId}) uses camelCase
parameter names (shipmentId, trackingNumber, carrier), while endpoints A (GET
/v1/orders/{order_id}) and B (GET /v1/customers/{customer_id}) both use snake_case
(order_id, customer_id, region_code). The majority convention, snake_case, is
supported by two of the three supplied endpoints.

Error response format: endpoint C documents its error body as
\`{ "code": "NOT_FOUND", "detail": "..." }\`, while endpoints A and B both document
theirs as \`{ "error_code": "...", "message": "..." }\`. The field names differ
entirely, not just their casing. The majority convention, the error_code plus
message shape, is supported by two of the three supplied endpoints.

## Step 4: the required-field coverage gap

Endpoint C (GET /v1/shipments/{shipmentId}) marks none of its three parameters as
required or optional, while endpoints A and B both mark every parameter explicitly
with a Required column. This is reported separately from the naming and error format
findings above, since it is a missing piece of information rather than a difference
in style, and a reader of endpoint C's documentation cannot currently tell whether
shipmentId is mandatory without testing the endpoint directly.

## What this example is not

This is a worked illustration with three endpoints, well below the size a real
consistency pass should use. A genuine check should be run against every endpoint in
a documentation set, and a majority derived from three entries is far less reliable
than one derived from fifteen or thirty. Treat this file as a demonstration of the
process, not as a template whose specific conventions, snake_case, the error_code
plus message shape, apply to any team beyond the one whose real documentation is
actually being checked.
`;

const meta: SkillMeta = {
  slug: "api-documentation-consistency-skill",
  name: "API Documentation Consistency Check",
  title: "API Documentation Consistency Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that checks a set of existing API endpoint documentation entries against each other for naming, error format and required-field consistency, deriving the expected convention from the majority pattern actually present rather than an external standard.",

  seo: {
    primaryKeyword: "api documentation consistency skill",
    keywords: [
      "api documentation consistency skill",
      "free ai skill for api documentation consistency",
      "downloadable api endpoint consistency checklist",
      "ai skill to check api docs for consistency",
      "how to check api documentation for consistency",
    ],
    seoTitle: "API Documentation Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable api documentation consistency skill that checks existing endpoint docs against each other and cites the exact endpoints that disagree.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and reviewed by the Fast Prompts editorial team against this site's authoring standard for skills that check existing material rather than generate new content.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asked to check a batch of endpoint documentation for consistency, models default to a general comment such as parameter naming could be more consistent or the error format varies across the set, without naming which specific endpoints were compared or exactly what differs between them. The same failure appears when the convention judged correct is pulled from a remembered external standard rather than from the actual majority of the documents supplied. This skill's step by step process forces every flagged inconsistency to name the specific endpoints being compared, state exactly what differs, and cite which convention was derived as the majority and from how many endpoints, so a reader can check the claim against the evidence rather than take it on faith.",
  },

  article: {
    intro: [
      "An api documentation consistency skill only earns that name if it can name the exact endpoints that disagree and exactly what differs between them. Handed a batch of existing endpoint documentation and asked whether it is consistent, most AI assistants default to a general impression, parameter naming could be tidier, the error format varies, without pointing at the two entries being compared or the specific field that differs. This skill refuses that shortcut, which is what makes it a free ai skill for api documentation consistency worth trusting rather than a generic pass dressed up as review.",
      "It ships as two plain text files, a main instructions file that walks through a four step comparison process, and a worked reference example that runs the full process against three sample endpoints. Both are previewable in full on this page before you download the zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "Its job is narrow on purpose: it checks documented endpoints against each other for naming, error format, required-field marking and example formatting. It never writes new documentation, and it never brings in an outside standard as the answer.",
    ],

    sections: [
      {
        heading: "Why this skill compares documentation against itself, not an external standard",
        body: [
          "A team's actual documentation convention is whatever pattern the team has already been shipping, and that pattern can disagree with any published style guide while still being the thing every existing reader has learned to expect. An api documentation consistency skill that quietly swaps in a remembered OpenAPI convention or a well known public API's style is answering a question nobody asked, and it will flag entries that are perfectly consistent with each other simply because they disagree with a textbook.",
          "This skill's instructions state the rule plainly: the only correct convention is whichever pattern the majority of the supplied endpoints actually use today. An endpoint matching a famous external standard but disagreeing with every other endpoint in its own set is still reported as the outlier.",
        ],
      },
      {
        heading: "The four dimensions this skill checks across endpoints",
        body: [
          "Every comparison runs across the same four checkable dimensions: parameter naming convention, error response documentation format, whether and how required fields are marked, and how example requests and responses are formatted. Each dimension is read out literally from every supplied endpoint before any comparison happens, so the record of what each entry actually does exists before any judgment is made about consistency.",
          "Keeping the dimensions separate matters for the report: an endpoint can be consistent on naming while disagreeing sharply on error format, and one vague verdict would hide which part actually needs attention.",
        ],
      },
      {
        heading: "Deriving the majority convention instead of assuming an external standard",
        body: [
          "For each dimension, the endpoints are grouped by which structural variant they actually use, and a convention only counts as the majority once one group genuinely outnumbers the others. The report names the supporting endpoints explicitly, by method and path, and states the count, for example six of eight endpoints marking required parameters the same way.",
          "When a dimension splits evenly with no clear majority, the skill's instructions require saying so directly rather than picking a side and presenting it as settled. That is how to check api documentation for consistency without smuggling in a standard nobody on the team actually agreed to: a downloadable api endpoint consistency checklist is only trustworthy if it admits when the evidence does not support a single answer.",
        ],
      },
      {
        heading: "How the citation requirement works, as an ai skill to check api docs for consistency",
        body: [
          "Every flagged inconsistency contains three specific things: the endpoints being compared, exactly what differs between them, and which convention was derived as the majority and from how many endpoints. A sentence claiming the documentation could be more consistent is treated as invalid output, not a lighter version of a real finding.",
          "The missing-marker case is separated out too. An endpoint with no required-field marking at all, next to a majority that marks it explicitly, is reported as a coverage gap rather than folded into naming or formatting findings, since a reader cannot tell whether a field is truly optional.",
        ],
      },
      {
        heading: "How this differs from the api documentation prompt on this site",
        body: [
          "The api documentation prompt on this site writes the reference for one endpoint from its handler code, citing every field and status code to the line in the implementation that produces it. It is a generation tool, and it needs exactly one endpoint's source code to run.",
          "This skill does the opposite job: it takes documentation that already exists for two or more endpoints and checks whether those entries agree with each other, never touching source code. Running the prompt first for a new endpoint, then this skill once a fuller set exists, is a natural pairing.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not write documentation for an endpoint with none to compare against. It will not rewrite the flagged outliers to match the derived majority unless explicitly asked to, since deciding whether an outlier gets converged or kept for a real reason belongs to whoever owns the documentation. It will not report a finding on a dimension where only one entry could be compared, since a single entry cannot be an outlier against nothing.",
        ],
      },
    ],

    howTo: {
      name: "How to use the api documentation consistency skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what process is about to run against your documentation.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather every endpoint entry you want compared",
          text: "Collect the existing documentation for at least three endpoints, ideally a service's full set, since a majority derived from more entries is more reliable.",
        },
        {
          name: "Hand both files and the endpoint set to your assistant",
          text: "Keep the folder structure intact so SKILL.md can point to the worked example, then supply the endpoint documentation and review the dimension by dimension report it returns.",
        },
      ],
    },

    faq: [
      {
        question: "How many endpoints do I need to supply for this to work?",
        answer:
          "At least two, though three or more is strongly preferred. A single endpoint has no majority to derive, and with only two entries that disagree the skill reports the disagreement as an open question rather than declaring either one the standard, since two is too small a sample for a reliable majority.",
      },
      {
        question: "Does this skill decide which convention my team should use going forward?",
        answer:
          "No. It only reports which convention the majority already follow and names the outliers against it. Deciding whether to converge the outliers, keep an exception for a genuine reason, or adopt a different convention entirely is left with the people who own the documentation.",
      },
      {
        question: "What happens if none of my endpoints agree with a published API style guide?",
        answer:
          "Nothing changes about how the check runs. The skill never treats an external standard as the correct answer, only the pattern the majority of the supplied endpoints actually use. Matching a well known style guide is irrelevant here, since the comparison stays entirely internal to the set provided.",
      },
      {
        question: "How is this different from the api documentation prompt on this site?",
        answer:
          "The api documentation prompt writes a reference for a single new endpoint from its handler code, citing every claim to a specific line. This skill instead takes documentation that already exists for multiple endpoints and checks whether those entries are consistent with each other, and it never looks at source code at all.",
      },
      {
        question: "Can it tell me a required field is genuinely missing from the API, not just undocumented?",
        answer:
          "No. It only compares how required fields are marked across the documentation you supply, not the underlying API's actual behaviour. An endpoint with no Required marking gets flagged as a documentation coverage gap, and confirming whether the field is truly optional still requires checking the real API or its source code.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser, with no server call behind either action, and nothing about the endpoint documentation you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "api documentation prompt",
        description: "For writing the reference documentation for a single new endpoint from its handler code, the generation step this skill's comparison assumes already happened.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "For reviewing the endpoint's implementation itself, separate from checking whether its documentation agrees with the rest of the set.",
      },
      {
        href: "/skills/coding-skills/pull-request-review-standard-skill",
        label: "pull request review standard skill",
        description: "For reviewing a code diff against a named rule checklist, a different job from comparing already published documentation entries against each other.",
      },
      {
        href: "/skills/coding-skills/test-coverage-gap-skill",
        label: "test coverage gap skill",
        description: "For naming untested branches in code rather than naming inconsistent conventions across documentation, though both skills share the discipline of citing a specific, checkable finding.",
      },
    ],

    externalLinks: [
      {
        href: "https://spec.openapis.org/oas/v3.1.0",
        label: "OpenAPI Specification 3.1",
        description: "The formal schema for describing parameters and responses, useful context for what a dimension like required-field marking actually means in a machine readable spec.",
      },
      {
        href: "https://www.rfc-editor.org/rfc/rfc9457",
        label: "RFC 9457: Problem Details for HTTP APIs",
        description: "The published standard shape for a machine readable error body, a reference point for what an error response documentation format is describing in the first place.",
      },
      {
        href: "https://google.aip.dev/general",
        label: "Google API Improvement Proposals: General Index",
        description: "A real, published example of an organisation deriving and documenting its own consistent API conventions, the same discipline this skill checks for within a supplied set of endpoints.",
      },
      {
        href: "https://github.com/microsoft/api-guidelines",
        label: "Microsoft REST API Guidelines",
        description: "Another organisation's own documented conventions, cited here as an example of what an internally consistent standard looks like, never as the standard this skill checks endpoints against.",
      },
    ],
  },

  tags: ["coding", "api", "documentation", "consistency", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

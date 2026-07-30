import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "security-review-prompt",
  name: "Source to Sink",
  title: "Security Review Prompt",
  category: "coding-prompts",
  taskType: "evaluate",
  summary:
    "Enumerates every value an attacker can influence, every place a value escapes the process, and forces a verdict on the control standing between each pair.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["threat modelling", "appsec", "authorisation", "trust boundaries"],

  seo: {
    primaryKeyword: "security review prompt",
    keywords: [
      "security review prompt",
      "secure code review checklist",
      "how to find authorisation bugs in code",
      "ai prompt for a secure code review",
      "how to find ssrf in code",
    ],
    seoTitle: "Security Review Prompt: Trace What the Attacker Controls",
    seoDescription:
      "A security review prompt built on a threat model rather than pattern matching. It lists attacker controlled sources, the sinks they reach and the control in between.",
  },

  prompt: {
    text: `You are performing a security review by threat model, not by pattern matching. Do not scan for dangerous function names. Begin with what an attacker can influence and follow it forwards.

THE CHANGE OR COMPONENT: {{CODE}}
WHO CAN REACH THIS AND HOW: {{EXPOSURE}}
WHAT IS WORTH TAKING HERE: {{ASSETS}}
CONTROLS THAT EXIST ELSEWHERE IN THE REQUEST PATH: {{CONTROLS}}

PHASE 1, SOURCES. List every value an attacker can influence at this point, including the ones that do not look like input: path and query parameters, headers, cookies, body fields, uploaded file names as well as contents, values read back from storage that a user wrote earlier, webhook payloads, and anything a downstream service returns. For each, name who can set it and whether it crosses a trust boundary here.

PHASE 2, SINKS. List every place a value leaves this process or changes what the process does: query languages, shell and process invocation, filesystem paths, outbound HTTP where the attacker influences the URL, template rendering, deserialisation, redirects, log fields, and any comparison that decides access.

PHASE 3, PAIRS. For each source that reaches a sink, write one line: source, sink, the path between them, and the control standing in the way. Mark that control PRESENT IN WHAT I WAS SHOWN, CLAIMED BUT NOT VISIBLE, or ABSENT. A claimed but invisible control is neither a finding nor a pass. It is a question with a named owner.

PHASE 4, AUTHORISATION ON ITS OWN. Authentication is not authorisation. For every operation this code performs, state which identity is permitted, where that check actually happens, and what occurs if an object identifier is swapped for one belonging to another account. Assume your attacker is a legitimate, fully authenticated user of a different account.

PHASE 5, BLIND SPOTS. Middleware, framework defaults, gateway rules, database grants, and validation upstream of what you were given. Say which findings would evaporate if a named control turned out to exist.

Do not assign a severity score without an exploit path you can narrate end to end. Do not report a missing header or a linting rule as a finding. Do not propose a single fix until every pair has been listed.`,
    variables: [
      {
        token: "CODE",
        label: "The change or component",
        example:
          "A new endpoint POST /integrations/import that accepts a JSON body with a source_url, fetches it server side with requests.get, parses the CSV and writes rows keyed by the tenant_id found in the body.",
      },
      {
        token: "EXPOSURE",
        label: "Who can reach this and how",
        example:
          "Any signed in user on any paid plan, over the public internet. No IP allowlist. The service runs in the same VPC as the metadata endpoint and the internal admin API.",
      },
      {
        token: "ASSETS",
        label: "What is worth taking here",
        example:
          "Other tenants' imported records, the cloud instance credentials available from the metadata service, and the internal admin API which trusts requests originating inside the VPC.",
      },
      {
        token: "CONTROLS",
        label: "Controls elsewhere in the request path",
        example:
          "Session middleware sets request.user before the handler runs. There is a rate limit of 60 requests per minute per account. No egress filtering. I have not been able to confirm whether the ORM parameterises the tenant filter.",
      },
    ],
    expectedOutput:
      "A list of attacker controlled sources with their trust boundaries, a list of sinks in this code, one line per reachable pair with an explicit verdict on the intervening control, a separate authorisation analysis, and a blind spot list tied to specific findings.",
    followUps: [
      "For every pair you marked ABSENT, write the request that demonstrates it, using the endpoint and field names from the code rather than a generic payload.",
      "Redo phase four assuming tenant_id comes from the session instead of the body. Which findings survive that change and which are replaced by new ones?",
      "Turn the CLAIMED BUT NOT VISIBLE list into questions for the author, each answerable by pasting one function.",
    ],
    pitfalls: [
      "Leaving the exposure field vague. Internal only and reachable by any signed in user produce entirely different reviews, and the model will assume the more comfortable of the two if you do not say.",
      "Accepting a finding that has no narrated exploit path. A pair marked absent with no request that demonstrates it is a lead, and shipping leads to the author as vulnerabilities is how security review gets ignored.",
      "Treating the blind spot list as boilerplate. It is where a genuine finding turns into a false positive, and reading it first saves you from filing a bug against validation that lives one layer up.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "Checklists match on shape rather than on flow, which is why a generic security review returns missing headers and a note about input validation while a user supplied URL is fetched server side a few lines away. Enumerating sources and sinks separately, then pairing them, surfaces the reachable path instead. Claude Opus 4.5 under reports log fields as sinks unless the prompt names them.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
  },

  article: {
    intro: [
      "A security review prompt that asks a model to look for vulnerabilities gets a checklist back. The checklist is not wrong, it is just unconnected to your code: add input validation, use parameterised queries, set a content security policy. All true, none of it a finding.",
      "The alternative is to make the model do what an attacker does. Work out what you control, work out where the code lets that value do something interesting, and see whether anything stands in between. Everything else in application security follows from that pairing.",
      "Used as an ai prompt for a secure code review, the structure below is deliberately slow. Two enumerations before any judgement, then one line per pair, and no fixes until the pairs are complete.",
    ],

    sections: [
      {
        heading: "Start from what the attacker controls",
        body: [
          "The source enumeration is where most of the value is, because the surprising entries are never the request body. They are the values that arrived from somewhere trusted and were written by an untrusted person earlier: a display name pulled from the database, a filename stored at upload time, a webhook field a third party will echo back.",
          "Threat modelling a pull request at this level takes a few minutes and does not require a formal methodology. You need the list of things an adversary can set, the list of places those things can act, and honesty about which trust boundary each crossing represents.",
          "The exposure field carries more weight than it looks. Reachable by any signed in user and reachable only from an internal network are different systems with different findings, and a model given neither will quietly assume the safer one.",
        ],
      },
      {
        heading: "A secure code review checklist built on sources and sinks",
        body: [
          "A secure code review checklist starts by tracing every source to its sink, and the pair line is the output that matters. Source, sink, the path, and the verdict on whatever sits between them. Three verdicts are allowed and the middle one does the real work.",
          "Present means the control is visible in what you supplied. Absent means nothing stands in the way. Claimed but not visible means somebody told the model a validator exists upstream, which is not evidence, and the pair stays open as a question rather than being quietly resolved in either direction.",
          "How to find ssrf in code is the clearest illustration. The source is a URL field that looks like configuration, the sink is an outbound HTTP call, and the control is either an allowlist or nothing. Pattern matching for dangerous functions never finds it, because the function involved is the ordinary HTTP client every service uses.",
        ],
      },
      {
        heading: "How to find authorisation bugs in code",
        body: [
          "How to find authorisation bugs in code is a separate phase for a reason. They do not look like the other categories: there is no dangerous function, no unsanitised value, and the code is usually correct in the sense that it does exactly what it says.",
          "The framing that works is to assume the attacker is a fully authenticated user of a different account. Then walk each operation and ask where the check is, what it compares, and what happens when an identifier in the request is replaced with somebody else's. Objects reached by identifier and no ownership test are the most common serious finding in application code and the least likely to be caught by tooling.",
        ],
        list: [
          "An identifier taken from the request body rather than from the session.",
          "A check on the collection endpoint that is missing from the single item endpoint.",
          "A role verified at page render but not on the underlying write.",
          "An export or bulk endpoint added later that skipped the filter the single record path applies.",
          "A background job that runs with elevated rights on behalf of whoever queued it.",
        ],
      },
      {
        heading: "Why the security review prompt will not score anything",
        body: [
          "Severity scores arrive early and unearned. A model that has not established a path from an attacker to an asset can still produce a plausible looking rating, and the rating then travels through your tracker with more authority than the reasoning behind it.",
          "So the security review prompt withholds scoring until an exploit path can be narrated end to end. That constraint also filters the findings themselves. Anything that cannot be narrated tends to be a best practice rather than a vulnerability, and best practices belong in a different conversation from the one about whether to hold the release.",
        ],
      },
    ],

    howTo: {
      name: "How to use the security review prompt",
      steps: [
        {
          name: "Describe the exposure before the code",
          text: "Who can reach this, from where, authenticated or not, and what network the process sits on. This single field changes more findings than any amount of extra source code.",
        },
        {
          name: "Name the assets in reach, not in general",
          text: "The instance metadata endpoint, the other tenants' rows, the internal admin API. Generic answers like user data produce generic findings.",
        },
        {
          name: "Supply the controls you believe exist",
          text: "Then watch which ones come back marked as claimed rather than visible. Those are the ones worth actually opening the file to confirm, and they are frequently not what you remembered.",
        },
        {
          name: "Demand the request before filing anything",
          text: "Ask for the concrete payload that exercises the pair. If the model cannot construct one against your field names, the pair is a lead and it goes on a list rather than into the tracker.",
        },
        {
          name: "Run phase four on its own for anything multi tenant",
          text: "Authorisation deserves a dedicated pass, because it produces findings that no scanner reports and that a reviewer reading for correctness will read straight past.",
        },
      ],
    },

    faq: [
      {
        question: "Does this replace a scanner?",
        answer:
          "No, and they fail in opposite directions. A scanner is better at known dangerous patterns across a whole repository, and it cannot reason about whether the current user is allowed to touch that record. Run both and expect very little overlap in what they find.",
      },
      {
        question: "How much code does it need to be useful?",
        answer:
          "One handler plus the functions it calls is usually enough for the source and sink enumeration to be complete. What it needs more than volume is the exposure and controls context, since the same fifty lines are safe in one deployment and exploitable in another.",
      },
      {
        question: "What about vulnerabilities in the libraries rather than my code?",
        answer:
          "Out of scope here by design, because reachability of a library flaw is a different analysis with different inputs. This pass assumes your dependencies behave as documented and asks whether your own code hands them attacker controlled values.",
      },
      {
        question: "Will it invent vulnerabilities that are not there?",
        answer:
          "Less often than an unstructured prompt, because a finding has to survive the pair format and the demand for an exploit path. The residual false positives cluster in the claimed but not visible category, which is exactly where the format tells you to go and check rather than believe.",
      },
      {
        question: "Is it safe to paste production code into a model?",
        answer:
          "That is a policy question for your organisation rather than a technical one, and the answer usually depends on the retention terms of the account you are using. Redact credentials and internal hostnames regardless, since neither of them changes the analysis and both are worth keeping out of a chat log.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "The correctness pass that runs alongside this one, hunting for defects rather than for attacker controlled paths.",
      },
      {
        href: "/coding-prompts/dependency-upgrade-prompt",
        label: "dependency upgrade prompt",
        description:
          "Covers the library side that this review deliberately leaves alone, including whether an advisory is reachable.",
      },
      {
        href: "/coding-prompts/error-message-prompt",
        label: "error message prompt",
        description:
          "Log fields are sinks too, and this decides what the failure path is allowed to record.",
      },
      {
        href: "/business-prompts/post-mortem-prompt",
        label: "post mortem prompt",
        description:
          "For after an incident, where the question moves from which control was absent to why nobody noticed.",
      },
    ],

    externalLinks: [
      {
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html",
        label: "OWASP: server side request forgery prevention",
        description:
          "The reference treatment of the source and sink pattern behind the outbound HTTP example used here.",
      },
      {
        href: "https://cwe.mitre.org/data/definitions/639.html",
        label: "CWE-639: authorisation bypass through user controlled key",
        description:
          "The catalogued definition of the object identifier problem that phase four exists to find.",
      },
      {
        href: "https://csrc.nist.gov/pubs/sp/800/218/final",
        label: "NIST SP 800-218: secure software development framework",
        description:
          "Standards body guidance placing threat modelling before code inspection in the review order.",
      },
      {
        href: "https://www.first.org/cvss/specification-document",
        label: "FIRST: CVSS specification",
        description:
          "The scoring specification itself, which requires environmental and exploitability context that a code snippet alone cannot supply.",
      },
    ],
  },
};

export default meta;

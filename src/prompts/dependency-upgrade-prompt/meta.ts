import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "dependency-upgrade-prompt",
  name: "Surface Intersection",
  title: "Dependency Upgrade Prompt",
  category: "coding-prompts",
  taskType: "analyse",
  summary:
    "Crosses the changelog against the API surface your code actually calls, hunts for breakage the maintainers never labelled, and asks whether an advisory is even reachable.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["semver", "changelogs", "cves", "lockfiles"],

  seo: {
    primaryKeyword: "dependency upgrade prompt",
    keywords: [
      "dependency upgrade prompt",
      "reading a changelog for breaking changes",
      "semver major bump that is actually safe",
      "how to prioritise dependency updates",
      "is a cve reachable in my code",
      "ai prompt for upgrading a package",
    ],
    seoTitle: "Dependency Upgrade Prompt: Cross the Changelog With You",
    seoDescription:
      "A dependency upgrade prompt that intersects the changelog with the API surface you actually call, then asks whether the advisory is reachable from your code.",
  },

  prompt: {
    text: `You are assessing a dependency upgrade. The changelog says what the maintainers changed. What matters is the intersection between that and the API surface this codebase actually touches. Compute the intersection. Do not summarise either side.

PACKAGE AND VERSION RANGE: {{PACKAGE}}
RELEASE NOTES OR CHANGELOG: {{CHANGELOG}}
WHAT WE ACTUALLY CALL: {{USAGE}}
WHY WE ARE UPGRADING: {{DRIVER}}
HOW WE WOULD KNOW IT BROKE: {{SIGNALS}}

A. SURFACE INTERSECTION. Take every changelog entry and give it one verdict: TOUCHES US, naming the thing in the usage list it affects; DOES NOT TOUCH US, with the reason; or CANNOT TELL, because the decision needs code you were not shown. Never resolve a CANNOT TELL by assuming. The size of the intersection, not the length of the changelog, is the cost of this upgrade.

B. UNLABELLED BREAKAGE. Maintainers label the breaks they know about. Look separately for changes that break callers without being marked: a default value changed, an error type widened or narrowed, an altered timeout or retry policy, stricter input validation, a dropped runtime version, a transitive dependency bumped underneath, and undocumented behaviour that callers rely on anyway.

C. VERSION NUMBER AGAINST REALITY. Say whether the version signal matches the intersection you computed. A major bump touching nothing you call is cheap. A patch release that tightens validation on a field you pass is expensive. Name which of the two this is, in those words.

D. WHERE SECURITY IS THE DRIVER. Identify the vulnerable function or code path from the advisory. Then say whether the usage list reaches it, and along which call chain. Where you cannot tell, give the exact thing to grep for. Reachability moves the urgency far more than the published severity does.

E. ORDER AND BLAST RADIUS. Where several upgrades are queued, order them: what unblocks what, which share a transitive dependency, which can travel together and which need their own change. Nothing that lands inside the intersection may be batched with anything else.

F. VERIFICATION AND RETREAT. Name the test, metric or log line that would reveal breakage, mapped to the signals supplied. State the retreat: pin the previous version, revert the lockfile, or turn a flag off. If the new version writes data in a shape the old one cannot read, say so plainly, because that is the case where rolling back does not work.`,
    variables: [
      {
        token: "PACKAGE",
        label: "Package and version range",
        example: "pydantic, upgrading from 1.10.13 to 2.9.2, in a service with 40 model classes.",
      },
      {
        token: "CHANGELOG",
        label: "Release notes or changelog",
        example:
          "The v2 migration guide plus the 2.0 through 2.9 release notes: validators renamed, orm_mode replaced by from_attributes, strict mode default changed for int coercion, and error message shape changed.",
      },
      {
        token: "USAGE",
        label: "What we actually call",
        example:
          "BaseModel, Field with regex and ge constraints, 6 uses of validator, parse_obj in three request handlers, and .dict() serialising into a JSON response. No custom root types, no ORM integration.",
      },
      {
        token: "DRIVER",
        label: "Why we are upgrading",
        example:
          "A library we need for the new export feature requires pydantic 2. Nobody is asking for this and there is no security advisory involved.",
      },
      {
        token: "SIGNALS",
        label: "How we would know it broke",
        example:
          "820 unit tests, a contract test suite against the public API, and a 4xx rate alert on the ingest endpoint. No load test and no golden file coverage of the JSON response shape.",
      },
    ],
    expectedOutput:
      "A verdict per changelog entry with the untellable ones left open, a separate list of breakage the maintainers never labelled, a statement of whether the version number matches the real cost, and a named retreat path with the case where it fails.",
    followUps: [
      "Everything you marked CANNOT TELL is a grep. Write the exact search for each one, including the false positives it will return.",
      "Assume the contract tests do not cover the serialised response shape. Which entries in the intersection stop being verified, and what is the smallest fixture that would cover them?",
      "There are nine upgrades queued behind this one. Order them by what unblocks what and mark the two that must not travel together.",
    ],
    pitfalls: [
      "Giving the changelog and skipping the usage list. Without it the model rates the release rather than your exposure to it, and every long changelog then looks like a large project.",
      "Treating an advisory as urgent before checking reachability. Half of the noisy ones sit in a code path the application never enters, and the other half are genuinely urgent, which is why the two need separating rather than averaging.",
      "Batching a lockfile refresh with the upgrade under review. The transitive changes then hide inside a thousand line diff, and a failing test could be caused by any of them.",
    ],
  },

  eeat: {
    author: "Tom Vasquez",
    authorCredential:
      "Sixteen years as a backend engineer, the last five reviewing pull requests full time on a platform team.",
    testingNote:
      "Both models summarised a migration guide competently and neither connected it to our call sites until the usage list became a required field. The CANNOT TELL verdict came after Claude Opus 4.5 confidently ruled out a validator rename we did use in three files. GPT-5.2 is noticeably better at the unlabelled breakage pass and worse at reachability.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
  },

  article: {
    intro: [
      "A dependency upgrade prompt is only useful if it knows what your code calls. Hand a model a changelog on its own and you get a competent summary of somebody else's release, which tells you nothing about whether the upgrade will take an hour or a fortnight.",
      "The work is an intersection. On one side, everything the maintainers changed. On the other, the small set of classes, functions and behaviours your codebase actually depends on. Almost all of the risk lives in the overlap, and almost all of the anxiety lives outside it.",
      "As an ai prompt for upgrading a package it is deliberately unimpressed by version numbers. A major release that touches nothing you use is a lockfile edit. A patch release that tightens validation on a field you pass is a week.",
    ],

    sections: [
      {
        heading: "Intersect the changelog with the surfaces you call",
        body: [
          "Every entry gets one of three verdicts, and the third one is what makes the output trustworthy. Touches us, does not touch us, or cannot tell without code that was not supplied. Models resolve that third case by guessing unless you forbid it, and a guess here is indistinguishable from an answer.",
          "The size of the intersection is the estimate. Forty release notes reducing to three affected call sites is a morning. Four release notes hitting your serialisation layer is not, regardless of how short the changelog looked.",
        ],
      },
      {
        heading: "Reading a changelog for breaking changes it forgot to label",
        body: [
          "Reading a changelog for breaking changes works well for the entries under the heading marked breaking. The dangerous ones are elsewhere, filed as improvements, because the maintainer did not consider your usage a supported pattern.",
          "A tightened validator, a widened exception type, a default timeout that dropped from thirty seconds to five: none of those get the breaking label and all of them break callers. The second pass exists purely to hunt for that category, separately from the labelled list.",
        ],
        list: [
          "A default value changed, so behaviour shifts for every call site that omitted the argument.",
          "An error type replaced, so the caller catching the old class stops catching anything.",
          "Validation tightened, so input you have always sent is now rejected.",
          "A transitive dependency bumped, bringing changes nobody read.",
          "A dropped platform or runtime version, discovered on the oldest build agent.",
        ],
      },
      {
        heading: "A semver major bump that is actually safe",
        body: [
          "A semver major bump that is actually safe is common enough to be worth naming. Maintainers increment the major version when they remove any public surface, including surfaces you have never touched, so the number tells you about their API rather than about your code.",
          "Saying this out loud in the output has a practical effect. Teams defer major upgrades for years on the strength of the number alone, and the deferral is what eventually makes the upgrade genuinely hard.",
        ],
      },
      {
        heading: "The patch release that costs more than the major",
        body: [
          "The mirror case is worse because nothing warns you. A patch release promises no behavioural change, gets applied by an automated bot, and quietly rejects a field your ingest endpoint has been sending since 2022.",
          "That is why the version number is assessed against the intersection rather than used as a proxy for it. The question is never how large the version jump is, it is how much of it lands on surfaces you touch.",
        ],
      },
      {
        heading: "Is a cve reachable in my code",
        body: [
          "Is a cve reachable in my code is the question that decides urgency, and it is almost never answered by the tool that raised the alert. Scanners match version ranges. They do not know whether your application enters the vulnerable function.",
          "So the security branch of the prompt asks for the vulnerable code path by name, then for the call chain from your usage list to it, then for the grep that would settle it where the answer is not visible. An unreachable advisory still gets fixed, but it gets fixed on Thursday rather than tonight.",
        ],
      },
      {
        heading: "How to prioritise dependency updates when everything is behind",
        body: [
          "How to prioritise dependency updates in a repository that has drifted for two years is an ordering problem rather than a list of upgrades. Some unblock others, several share a transitive dependency and will fight if done separately, and one of them is holding back your language runtime.",
          "The ordering rule that matters most is the one about batching. Anything landing inside the intersection travels alone, because the point of a small upgrade change is that a failing test names the cause without a bisect.",
        ],
      },
      {
        heading: "What the dependency upgrade prompt admits it cannot know",
        body: [
          "Dynamic imports, plugin registries, reflection and configuration driven behaviour all defeat a usage list, and so does a monorepo where another team calls the same library differently. The dependency upgrade prompt is instructed to leave those open rather than close them.",
          "The other honest gap is data. Where the new version writes state the old version cannot read, the retreat path fails and the upgrade becomes a one way door. That deserves a sentence in the output, because rollback plans are written on the assumption that reverting code is enough.",
        ],
      },
    ],

    howTo: {
      name: "How to use the dependency upgrade prompt",
      steps: [
        {
          name: "Build the usage list from grep, not memory",
          text: "Search for the imports and the symbols, then list what comes back. The surfaces you forget are the ones added by somebody else two years ago, and those are where the breakage sits.",
        },
        {
          name: "Paste the changelog for every intermediate version",
          text: "Not only the target. Skipping from 1.4 to 1.9 means five sets of release notes, and the default that changed in 1.6 is invisible in the 1.9 notes.",
        },
        {
          name: "Say why you are upgrading",
          text: "An advisory, a blocking feature, or routine hygiene. The driver decides how much of the analysis is about reachability and how much is about breakage.",
        },
        {
          name: "Turn every cannot tell into a search",
          text: "They are usually five minutes of grepping each, and resolving them converts the assessment from a plausible estimate into one you can commit to in planning.",
        },
        {
          name: "Land the version bump on its own",
          text: "One commit for the manifest and lockfile, a separate one for the call site changes. When something fails, you want to know which half caused it without unpicking a merged change.",
        },
        {
          name: "Check the retreat path before you merge",
          text: "Confirm that pinning the old version actually restores the previous behaviour. Where the new version has already written data in a new shape, it will not, and you need to know that beforehand.",
        },
      ],
    },

    faq: [
      {
        question: "Can this replace an automated update bot?",
        answer:
          "No, and they do different jobs. The bot is good at noticing that a release exists and opening the change. It has no view on whether the release touches anything you call, which is the judgement this produces and the reason so many bot pull requests sit unmerged for months.",
      },
      {
        question: "What if the project has no changelog worth reading?",
        answer:
          "Paste the commit log or the diff of the public interface between the two tags instead. The intersection method does not care where the list of changes came from, only that it covers every version you are jumping over rather than just the destination.",
      },
      {
        question: "How reliable is the reachability answer?",
        answer:
          "Treat it as a hypothesis with a stated call chain rather than a verdict. It is reliable enough to sort a backlog of twenty advisories into two piles, and not reliable enough to close one without running the grep it hands you.",
      },
      {
        question: "Should the upgrade go behind a feature flag?",
        answer:
          "Rarely possible for a library, since the import is global, though a flag around the new code path sometimes works. The more practical equivalent is a fast revert: one small commit, a pinned version, and a deploy you have already rehearsed.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-migration-prompt",
        label: "code migration prompt",
        description:
          "When the intersection is large enough that the upgrade becomes a mechanical change across hundreds of call sites.",
      },
      {
        href: "/coding-prompts/security-review-prompt",
        label: "security review prompt",
        description:
          "For the advisories that are reachable, where the next question is what an attacker can actually put into that path.",
      },
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description:
          "Covers the surfaces the intersection flagged before the version changes underneath them.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For arguing the case when the upgrade is a quarter of work and nobody outside the team can see why.",
      },
    ],

    externalLinks: [
      {
        href: "https://semver.org/",
        label: "Semantic versioning 2.0.0",
        description:
          "The specification itself, which defines a major bump in terms of the maintainer's public API rather than your exposure to it.",
      },
      {
        href: "https://nvd.nist.gov/vuln",
        label: "NIST national vulnerability database",
        description:
          "The authoritative record for advisory details, including the affected functions that reachability analysis depends on.",
      },
      {
        href: "https://osv.dev/",
        label: "OSV: open source vulnerability database",
        description:
          "Publishes affected version ranges and, where known, the specific symbols involved, which is what turns an alert into a call chain question.",
      },
      {
        href: "https://docs.npmjs.com/cli/v10/commands/npm-audit",
        label: "npm audit documentation",
        description:
          "Vendor documentation on how version range matching produces advisories, and therefore why the tooling cannot judge reachability.",
      },
    ],
  },
};

export default meta;

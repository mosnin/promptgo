import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "code-migration-prompt",
  name: "Fidelity Table",
  title: "Code Migration Prompt",
  category: "coding-prompts",
  taskType: "plan",
  summary:
    "Maps every construct across the boundary as exact, lossy or unavailable, then orders the work into revertible batches by blast radius.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["migrations", "codemods", "framework upgrades", "blast radius"],

  seo: {
    primaryKeyword: "code migration prompt",
    keywords: [
      "code migration prompt",
      "migrating a codebase to a new framework",
      "behaviour differences between two runtimes",
      "how to plan a large migration in batches",
      "ai prompt for porting code between languages",
      "keeping a migration reviewable commit by commit",
    ],
    seoTitle: "Code Migration Prompt: Map Before You Port Anything",
    seoDescription:
      "A code migration prompt that builds a fidelity table of exact, lossy and missing equivalents, then batches the work by blast radius with a revert per batch.",
  },

  prompt: {
    text: `You are planning the migration of working code across a boundary: a language version, a framework, a library or a runtime. Observable behaviour must survive the crossing unchanged. You have not been asked to improve anything, and an improvement smuggled into a migration is a defect nobody catches, because reviewers assume every line changed for mechanical reasons.

SOURCE SIDE: {{SOURCE}}
TARGET SIDE: {{TARGET}}
THE CODE OR PATTERN THAT HAS TO MOVE: {{CODE}}
WHAT PROVES BEHAVIOUR IS UNCHANGED: {{ORACLE}}
HOW MUCH OF THIS EXISTS: {{SCALE}}

PART A, FIDELITY TABLE. One row per construct that has to cross: source construct, target construct, verdict. EXACT means identical observable behaviour for every input, and you must be able to say why. LOSSY means the behaviour diverges somewhere, and you must name the input where it diverges. NO EQUIVALENT means the target has nothing that does this and a person has to decide. Never write EXACT to avoid writing LOSSY.

PART B, SILENT DIFFERENCES. Separately from Part A, list what changes without any line of code changing: default timezone, integer division, string collation, floating point formatting, sort stability, dictionary iteration order, null against empty, exception types, encoding and truncation, thread and task scheduling. For each, say whether this codebase can observe it.

PART C, BATCHES. Order the work by blast radius, smallest first. A batch is one mechanical transformation applied everywhere it applies. It must land alone, be reverted without touching another batch, and be checkable by the oracle. Name the batch that must go last and why it cannot move earlier.

PART D, MECHANISATION. For every EXACT row, give the search pattern or codemod rule that performs it, so a tool applies it rather than a person. Say which rows resist mechanisation and must be done by hand.

Do not rename anything. Do not restructure. Do not adopt an idiom of the target beyond what the mapping forces. Anything you want to improve goes in a closing list headed AFTER THE MIGRATION, and nowhere else.`,
    variables: [
      {
        token: "SOURCE",
        label: "Source side",
        example:
          "Django 3.2 on Python 3.9, using the ORM directly in view functions, pytz for all timezone handling, and 340 templates using the built in engine.",
      },
      {
        token: "TARGET",
        label: "Target side",
        example:
          "Django 5.0 on Python 3.12, standard library zoneinfo, and the same template engine. No architectural change intended.",
      },
      {
        token: "CODE",
        label: "The code or pattern that has to move",
        example:
          "Every call site of pytz.timezone and localize, roughly 90 of them, mostly wrapping datetimes read from the orders table before they are rendered or compared.",
      },
      {
        token: "ORACLE",
        label: "What proves behaviour is unchanged",
        example:
          "A golden file suite that renders 200 stored orders to HTML and diffs the output, plus 1,100 unit tests. Nothing currently covers the hour of the daylight saving transition.",
      },
      {
        token: "SCALE",
        label: "How much of this exists",
        example:
          "About 240,000 lines across 12 apps in one repository, six engineers, and no window where merges to the main branch can be frozen.",
      },
    ],
    expectedOutput:
      "A fidelity table where every row carries an explicit verdict and a reason, a separate list of behaviour that shifts with no code change, an ordered batch plan with a stated revert for each, and codemod rules for the mechanical rows.",
    followUps: [
      "Take the batch you ranked smallest and write the exact codemod rule, including the cases where the pattern matches but must not be rewritten.",
      "Every LOSSY row is a decision. Write each one as a question for the team, phrased so the answer picks one behaviour rather than describing the trade off.",
      "Assume the golden file suite does not cover the daylight saving transition. Which rows in the fidelity table stop being verifiable, and what would the smallest new fixture be?",
    ],
    pitfalls: [
      "Skipping the oracle field. Without a stated way to prove behaviour survived, the batch plan is just an ordering of edits, and the first silent difference reaches production unnoticed.",
      "Letting the model answer with target idioms. Left alone it will convert loops into comprehensions and callbacks into async while it is in the file, and the diff becomes unreviewable at exactly the moment review matters most.",
      "Treating NO EQUIVALENT rows as blockers to route around. They are the rows that carry a product decision, and postponing them until the end is how migrations stall at 80 percent for a year.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "The verdict column started as a free text note and both models used it to hedge, so it was narrowed to three words and the instruction not to write EXACT defensively was added. Claude Opus 4.5 then correctly flagged pytz localize against zoneinfo as lossy at the ambiguous hour, which is the exact row a hand written plan had missed twice.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
  },

  article: {
    intro: [
      "A code migration prompt is not a refactoring prompt with a bigger input. Refactoring improves code you keep; migration moves code you are not allowed to change, across a boundary where things that looked equivalent turn out not to be.",
      "The instruction set below spends its first half on a mapping table before it writes a single line. Every construct that has to cross gets a verdict: identical, different somewhere, or nothing on the other side. The rows marked different are the entire risk of the project, and they are invisible until somebody writes them down.",
      "Used as an ai prompt for porting code between languages, or across two versions of one framework, its most valuable output is the short list of things it refuses to call equivalent.",
    ],

    sections: [
      {
        heading: "The fidelity table comes before any code",
        body: [
          "A three column table sounds like process overhead until you try to build one. Naming the target construct for each source construct is easy. Committing to a verdict is not, because EXACT is a claim that holds for every input, and most people discover halfway through the row that theirs does not.",
          "That discomfort is the value. The rows that resist a clean verdict are the rows where behaviour will drift, and they surface in an afternoon rather than in a support ticket six weeks after the cutover.",
        ],
      },
      {
        heading: "Migrating a codebase to a new framework without improving it",
        body: [
          "Migrating a codebase to a new framework produces a strong urge to fix things on the way past. The file is already open, the old pattern is visibly worse, and the target has a nicer idiom. Every one of those edits makes the change harder to review and impossible to bisect.",
          "So the prompt bans improvement outright and gives the impulse somewhere to go. Anything the model wants to change beyond the mapping lands in a closing list, which becomes a genuinely useful backlog once the migration is finished and the codebase is uniform enough to work on.",
        ],
      },
      {
        heading: "Behaviour differences between two runtimes hide in the defaults",
        body: [
          "Part B exists because the worst migration bugs involve no changed line at all. Behaviour differences between two runtimes usually live in a default: which timezone is assumed, how a division rounds, whether a sort is stable, what order a hash map yields, how a string with a combining character compares.",
          "None of those appear in a diff and most are invisible to a test suite written before anyone thought about them. Asking for them as a separate list, decoupled from the mapping, is what gets them enumerated instead of discovered.",
        ],
        list: [
          "Sort stability, which changes report ordering for rows with equal keys and nothing else.",
          "Integer division and rounding mode, which move money by one unit in the last place.",
          "Timezone defaults and the ambiguous hour when the clocks go back.",
          "Exception type hierarchies, where a caller catching a parent class quietly stops catching.",
          "String collation and case folding, which decide whether two identifiers are the same identifier.",
        ],
      },
      {
        heading: "Keeping a migration reviewable commit by commit",
        body: [
          "How to plan a large migration in batches starts with blast radius rather than with directory layout. The first batch should be the transformation whose failure mode is smallest and most obvious, because the first batch is also where you find out whether the oracle actually works.",
          "Keeping a migration reviewable commit by commit means each batch is one mechanical transformation applied everywhere it applies. A reviewer then checks the rule once and spot checks the application, instead of reading nine hundred changed lines and approving them out of fatigue.",
        ],
      },
      {
        heading: "What the code migration prompt will not guess",
        body: [
          "Reflection, dynamic dispatch, string based imports and anything assembled at runtime defeat static mapping. The code migration prompt is told to say so rather than assume the obvious binding, because the obvious binding is right most of the time and catastrophically wrong occasionally.",
          "The same applies to the oracle. If the suite you described does not exercise a behaviour, the plan should say that batch is unverified rather than that it is safe. An unverified batch is still worth shipping, but it goes behind a feature flag and it goes on a day when the people who wrote it are at their desks.",
        ],
      },
    ],

    howTo: {
      name: "How to use the code migration prompt",
      steps: [
        {
          name: "Describe both sides precisely, including versions",
          text: "Framework and language versions on each side, plus the libraries that wrap them. Most lossy rows come from a library that changed under you, not from the headline version bump.",
        },
        {
          name: "Be honest about the oracle",
          text: "State what your tests actually cover and what they do not. A plan built on an imagined golden suite is worse than one that knows it is flying with instruments missing.",
        },
        {
          name: "Argue with every EXACT verdict once",
          text: "Pick three rows and try to find an input where they diverge. If you succeed on one, ask for the whole table again with that failure quoted back, because the same optimism will be in other rows.",
        },
        {
          name: "Mechanise before you start editing",
          text: "Write the codemod for the first batch and run it on a throwaway branch. A rule that matches 900 sites and needs 40 manual exclusions is still faster and far more reviewable than 900 hand edits.",
        },
        {
          name: "Land the batches with the flag ready",
          text: "Each batch reverts on its own, so keep the revert one command away. The batch you were most confident about is not the one that breaks, which is the entire argument for small batches.",
        },
      ],
    },

    faq: [
      {
        question: "How large a migration can this plan in one pass?",
        answer:
          "The fidelity table works at any scale because it is keyed on constructs rather than files, and a quarter of a million lines usually reduces to twenty or thirty distinct constructs. The batch plan degrades sooner, so re run it per application once the table is settled.",
      },
      {
        question: "Does it write the migrated code as well?",
        answer:
          "It writes codemod rules rather than migrated files, which is deliberate. A rule is reviewable once and applies uniformly, whereas generated files have to be checked individually and will contain small inconsistencies that reviewers stop noticing after the first thirty.",
      },
      {
        question: "What if the target genuinely has no equivalent for something?",
        answer:
          "Those rows are the point of the exercise. They carry a product decision about which behaviour you keep, and they need a named person to answer rather than a clever workaround, because a workaround here silently redefines what the software does.",
      },
      {
        question: "Should the migration and the version bump be separate commits?",
        answer:
          "Always, and usually separate pull requests. Bumping the dependency and adapting the call sites in one change means a failing test could come from either, and bisecting through a single enormous commit tells you only that the enormous commit was the problem.",
      },
      {
        question: "How does this interact with a long lived migration branch?",
        answer:
          "Badly, which is why the batch plan assumes you are merging to the main branch continuously. A branch that carries a mechanical transformation across three hundred files will conflict with everything, and resolving those conflicts by hand reintroduces exactly the variation the codemod removed.",
      },
      {
        question: "Can I use it for a database or data format migration?",
        answer:
          "Partly. The fidelity table transfers well to schema and encoding changes, and the silent difference list is if anything more relevant there. The batching advice needs adjusting, because data migrations are usually gated on backfill throughput rather than on review capacity.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description:
          "For the AFTER THE MIGRATION list, once the codebase is uniform enough that improvements are safe to review.",
      },
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description:
          "Builds the oracle first, which is the input this plan is weakest without.",
      },
      {
        href: "/coding-prompts/dependency-upgrade-prompt",
        label: "dependency upgrade prompt",
        description:
          "The narrower case where the boundary is one package version rather than a whole framework.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For the rows with no equivalent, where somebody has to choose a behaviour and record why.",
      },
    ],

    externalLinks: [
      {
        href: "https://martinfowler.com/bliki/StranglerFigApplication.html",
        label: "Martin Fowler: the strangler fig application",
        description:
          "The named source for replacing a system incrementally while both versions run, which is what the batch ordering assumes.",
      },
      {
        href: "https://www.unicode.org/reports/tr10/",
        label: "Unicode technical report 10: collation algorithm",
        description:
          "The standard behind the claim that string ordering and equality can differ between two runtimes with no code change.",
      },
      {
        href: "https://learn.microsoft.com/en-us/dotnet/core/porting/",
        label: "Microsoft: porting guidance for .NET",
        description:
          "A vendor migration guide structured as a compatibility mapping, which is the format the fidelity table follows.",
      },
      {
        href: "https://google.github.io/eng-practices/review/developer/small-cls/",
        label: "Google engineering practices: small changes",
        description:
          "The published argument for why one mechanical transformation per change is reviewable and a mixed change is not.",
      },
    ],
  },
};

export default meta;

import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "design-system-prompt",
  name: "Variant Consolidator",
  title: "Design System Prompt",
  category: "design-prompts",
  taskType: "analyse",
  summary:
    "Takes an inventory of the components you already have and returns a merge plan, a naming rule, a stepped token scale and the merges that are not worth doing.",
  updated: "2026-07-29",
  published: "2026-07-29",
  featured: true,
  tags: ["design systems", "components", "design tokens", "consolidation"],

  seo: {
    primaryKeyword: "design system prompt",
    keywords: [
      "design system prompt",
      "how to audit component variants",
      "naming design tokens consistently",
      "component deprecation plan",
      "type scale and spacing scale rules",
      "reducing duplicate button variants",
    ],
    seoTitle: "Design System Prompt: Merge What You Already Have",
    seoDescription:
      "A design system prompt that audits your component inventory, folds duplicate variants into survivors, fixes token naming and sequences the merges by payoff.",
  },

  prompt: {
    text: `You are consolidating a design system that already exists. You are not designing a new one. Every recommendation must be justified by something in the inventory below, and you never invent a component that is not in it.

INVENTORY: {{INVENTORY}}
CURRENT VALUES: {{VALUES}}
CANNOT CHANGE: {{FIXED}}
TEAM AND CADENCE: {{TEAM}}

Work in four passes and output each as a table.

PASS 1, DUPLICATES. Group the inventory into sets that do the same job. For each set name the survivor, list the variants folding into it, and identify the one property that genuinely differs and should become a prop rather than a separate component.
PASS 2, NAMES. Express a naming rule as a pattern such as category-role-state. Rename every survivor to fit it. Flag any name that becomes ambiguous once the rule is applied.
PASS 3, SCALES. Map the raw numbers in CURRENT VALUES onto stepped scales for type and spacing. Any value that does not land on a step is either an error or a deliberate exception. Label each one, and give the exceptions a reason.
PASS 4, SEQUENCE. Order the merges by the ratio of instances removed to files touched, highest first. For each, state what breaks at the call site and whether a mechanical find and replace can do it.

Finally, add a list titled NOT WORTH IT for any merge that would require redesigning a screen, with one line on why it stays.`,
    variables: [
      {
        token: "INVENTORY",
        label: "What exists today, with instance counts",
        example:
          "Button: 14 variants, 806 instances. Card: 9 variants, 212 instances. Modal: 5 variants, 61 instances. Two separate Tag and Chip components, 340 instances combined",
      },
      {
        token: "VALUES",
        label: "The raw numbers currently in use",
        example:
          "Font sizes 11, 12, 13, 14, 15, 16, 18, 20, 24, 25, 32. Spacing 2, 4, 6, 8, 10, 12, 16, 20, 24, 30, 32, 48",
      },
      {
        token: "FIXED",
        label: "Constraints that are not up for discussion",
        example:
          "The brand blue and the 8px grid stay. Nothing that changes the public component API before the March release",
      },
      {
        token: "TEAM",
        label: "Who does the work and how often you ship",
        example: "Two designers, eleven engineers across four squads, fortnightly release train",
      },
    ],
    expectedOutput:
      "Four tables covering duplicate sets with named survivors, a stated naming pattern, type and spacing steps with every exception labelled, and merges ordered by instances removed against files touched.",
    followUps: [
      "Write the migration note for the highest ranked merge, aimed at an engineer who has never opened the design file.",
      "Take the exceptions from pass 3 and argue for deleting each one. Which survive the argument?",
      "Given the team and cadence above, split the sequence into what fits in one release and what does not.",
    ],
    pitfalls: [
      "An inventory without instance counts produces a plan ordered by neatness rather than payoff, and the top item is usually a component used four times.",
      "Models like proposing a rewrite. The NOT WORTH IT list exists to catch that, and if it comes back empty the model has quietly recommended one anyway.",
      "Do not paste your token file as the inventory. Tokens are pass 3. Components and their counts are what pass 1 needs.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Consolidation advice arrives unconditionally. Shown a long list of button variants, models recommend collapsing them to three and hiding the difference behind props, including variants that exist for a certification requirement rather than for taste. A cannot change field on every component, plus permission to say a merge is not worth doing, keeps the audit honest.",
  },

  article: {
    intro: [
      "A design system prompt is usually asked to invent a system from nothing, which is the least likely situation any team is in. What most teams actually have is fourteen button variants, two components that both mean tag, and a spacing set containing 6, 10 and 30 because three people were in a hurry on three different Tuesdays.",
      "This prompt does the unglamorous version of the job. You give it an inventory with instance counts and it returns a merge plan: which variants fold into which survivor, what the survivors should be called, which raw values belong on a scale, and the order to do the work in so that the first merge removes the most duplication for the least disruption.",
      "It also has to say what is not worth merging, which is the pass most systems work skips and then regrets in the third month.",
    ],

    sections: [
      {
        heading: "Systems decay by accretion, not by bad decisions",
        body: [
          "Nobody chooses to ship fourteen buttons. Each one arrives as a reasonable local decision: a slightly tighter variant for a dense table, a version with the icon on the right for a partner integration, a duplicate created because search in the file did not surface the original. The system does not break, it silts up.",
          "That is why a design system prompt aimed at generation is answering the wrong question. Generation gives you a tidy set that ignores the eight hundred existing instances, and those instances are the actual system regardless of what the documentation site says.",
        ],
      },
      {
        heading: "Count the instances before collecting opinions",
        body: [
          "The practical question is how to audit component variants without spending a fortnight on it, and the answer is that instance counts do most of the work. Every component library tool can export them. A variant used four times and a variant used four hundred times present completely different problems, and no amount of discussion in a review session substitutes for knowing which is which.",
          "Counts also settle arguments that otherwise run for weeks. When two designers each defend their card variant, the conversation ends quickly once one of them turns out to be used on a single archived screen.",
        ],
        subsections: [
          {
            heading: "What to include in the inventory",
            body: [
              "Component name, variant count, total instances, and how many distinct files or routes use it. That last number predicts merge cost better than the instance count does, because two hundred instances inside one file is an afternoon and forty across eleven repositories is a quarter.",
            ],
          },
        ],
      },
      {
        heading: "Naming design tokens consistently is a search problem",
        body: [
          "Names exist so someone can find the thing without asking. That reframes the whole exercise: the test of a name is whether a designer who has never seen it types the right word into the search box on the first attempt, not whether it reads elegantly in the documentation.",
          "Naming design tokens consistently means committing to a pattern and accepting that some names get uglier. A rule such as surface-raised-hover is unlovely and predictable, and predictable beats lovely at the moment someone is looking for it while under deadline. Pass two flags names that turn ambiguous under the rule, which is where you make the exceptions deliberately rather than by accident.",
        ],
      },
      {
        heading: "Type scale and spacing scale rules need their exceptions named",
        body: [
          "Type scale and spacing scale rules fail the same way in every organisation. Someone defines a clean scale, someone else needs 13px for a dense data table, the exception ships without a label, and within a year the scale has fourteen steps and no longer constrains anything.",
          "The third pass forces every off scale value into one of two buckets: mistake or exception with a reason. A labelled exception is fine. Dense financial tables genuinely need a tighter step, and saying so in the token file is how the next person knows not to delete it. An unlabelled one is indistinguishable from a typo, and after a year nobody can tell which it was.",
        ],
      },
      {
        heading: "Why the design system prompt sequences by ratio",
        body: [
          "Reducing duplicate button variants is the standard opening move and it is often the wrong one, because buttons appear everywhere and touching them means touching every squad's code in the same sprint. The ratio of instances removed to files touched is a better ordering, and it frequently puts something unglamorous first: two tag components merging into one across four files.",
          "An early merge that lands cleanly buys the political capital for the harder ones. A first attempt that stalls halfway through a button migration leaves the system with fifteen variants instead of fourteen, which is worse than never starting.",
        ],
      },
      {
        heading: "The list of merges you should refuse",
        body: [
          "The closing list is a refusal, and it is the section that makes the plan credible to engineers. Some duplicates exist because two screens genuinely have different needs, and merging them means redesigning a screen that nobody has budget to redesign this year.",
          "Writing those down converts a permanent low grade argument into a decision with a date on it. The variant stays, the reason is recorded, and the next person to notice the duplication reads the line instead of reopening the debate.",
        ],
      },
      {
        heading: "Turning the merge plan into a component deprecation plan",
        body: [
          "A component deprecation plan is what engineering can actually schedule. For each survivor it needs the old names, the new name, what breaks at the call site, whether a find and replace covers it, and the release the old name stops being supported.",
          "Keep the deprecated component alive and visibly marked for at least one release cycle. Deleting on the day of the merge means the migration lands as a broken build for whichever squad was mid feature, and the system gets blamed for a scheduling decision.",
        ],
      },
    ],

    table: {
      caption: "A typical first pass on a mid sized library",
      headers: ["Component", "Variants", "Instances", "Files", "Survivors"],
      rows: [
        ["Tag and Chip", "6", "340", "4", "1"],
        ["Card", "9", "212", "23", "3"],
        ["Button", "14", "806", "61", "4"],
        ["Modal", "5", "61", "9", "2"],
      ],
    },

    howTo: {
      name: "How to run the design system prompt on a real library",
      steps: [
        {
          name: "Export counts, not screenshots",
          text: "Pull variant and instance counts from your component tooling, plus how many files each component appears in. Those three numbers drive every recommendation the prompt makes.",
        },
        {
          name: "Write down what cannot move",
          text: "Brand colours, grid units, anything with a compliance or contractual reason to exist. Without this the plan will confidently merge the one variant that is audited annually.",
        },
        {
          name: "Do the top merge before reading the rest",
          text: "Ship the highest ratio merge, then rerun the prompt on the updated inventory. A plan validated by one completed migration is worth more than a plan covering all twelve.",
        },
      ],
    },

    faq: [
      {
        question: "Does the design system prompt work before a system exists?",
        answer:
          "Poorly, and that is deliberate. With no inventory there is nothing to consolidate, and what comes back is a generic starter set you could get anywhere. If you are starting from nothing, build ten screens first and run this once the duplication is real.",
      },
      {
        question: "How large an inventory can it handle in one pass?",
        answer:
          "Around forty components with counts stays coherent. Beyond that the fourth pass starts losing precision on sequencing, so split by domain: forms in one run, navigation and layout in another, and reconcile the naming rule across both afterwards.",
      },
      {
        question: "What if engineering and design have different component names?",
        answer:
          "Put both in the inventory as separate lines with the same instance count and let the naming pass reconcile them. That mismatch is usually the single largest source of duplicate work in the system, and it surfaces immediately once both names sit in one table.",
      },
      {
        question: "Should the token pass include colour?",
        answer:
          "It can, though colour behaves differently from type and spacing because it does not sit on a numeric scale in a way a model can verify. Semantic roles and measured contrast are the better structure there, and that is a separate exercise from stepping numbers.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/colour-palette-prompt",
        label: "colour palette prompt",
        description:
          "Handles the colour half of the token work, using semantic roles and measured contrast rather than numeric steps.",
      },
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description:
          "The same consistency argument applied to an icon set, where stroke weight and grid do the work names do here.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description:
          "Writes the behaviour spec each surviving component needs before an engineer can build it once and for all.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "Useful on the migration commits, where the risk sits in the call sites rather than in the component itself.",
      },
    ],

    externalLinks: [
      {
        href: "https://m3.material.io/foundations/design-tokens/overview",
        label: "Material Design 3: design tokens",
        description:
          "A published token architecture with a role based naming pattern, useful as the reference structure for pass two.",
      },
      {
        href: "https://www.w3.org/community/design-tokens/",
        label: "W3C Design Tokens Community Group",
        description:
          "The standards effort defining an interchange format for tokens, which constrains how names should be structured.",
      },
      {
        href: "https://www.nngroup.com/articles/design-systems-101/",
        label: "Nielsen Norman Group: Design systems 101",
        description:
          "Sets out the difference between a component library and a system, which is the distinction the consolidation passes rely on.",
      },
    ],
  },
};

export default meta;

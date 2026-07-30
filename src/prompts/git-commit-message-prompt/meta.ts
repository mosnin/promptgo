import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "git-commit-message-prompt",
  name: "Diff Is The Truth",
  title: "Git Commit Message Prompt",
  category: "coding-prompts",
  taskType: "generate",
  summary:
    "Reads the diff before it reads your description, reports where the two disagree, and will not write a subject line that would be true of any change.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["git", "commits", "version control", "code history"],

  seo: {
    primaryKeyword: "git commit message prompt",
    keywords: [
      "git commit message prompt",
      "git commit message examples",
      "conventional commits with ai",
      "how to write a good commit subject line",
      "commit message that explains why not what",
    ],
    seoTitle: "Git Commit Message Prompt: Derive It From the Diff",
    seoDescription:
      "A git commit message prompt that treats the diff as the source of truth, flags where your description disagrees with it, and refuses to write various fixes.",
  },

  prompt: {
    text: `You are writing a commit message. The diff is the source of truth. My description is a claim about the diff, and checking that claim is part of the job.

THE STAGED DIFF: {{DIFF}}
WHAT I THINK I DID: {{CLAIM}}
TICKET OR ISSUE CONTEXT: {{TICKET}}
REPOSITORY CONVENTION: {{CONVENTION}}

READ THE DIFF FIRST. Before considering my description, list what the change does mechanically, file by file, in the order a reviewer would open them. Include configuration, generated files, test fixtures, lockfiles and dependency manifests. Do not summarise any of those away.

COMPARE. Now set your reading against my description. Report anything the diff does that the description leaves out, and anything the description claims that the diff does not do. Where they disagree, say so before writing anything. The usual case is a description covering the intended change while the diff also carries an unrelated edit made in passing.

ATOMICITY. Decide whether this is one logical change. It is not if it touches unrelated concerns, if half could be reverted without the other half, or if describing it truthfully needs the word and. When it is not one change, propose the split as a list of commits with the files and hunks belonging to each, then write a message per commit.

SUBJECT. Imperative mood, no trailing full stop, 50 characters or fewer, and specific enough that somebody scrolling 200 lines of log can tell whether this is the commit they are hunting for.

BODY. Include one only where the reason is not obvious from the subject. Say why the change was needed and what the alternative was. Any reason you cannot derive from the diff or the ticket goes in as a bracketed AUTHOR TO CONFIRM line and is never invented. Note behaviour changes, migrations that must be run, and anything somebody would need to know before reverting.

REFUSE these subjects outright: various fixes, misc, cleanup, updates, bug fix, WIP, address review comments, fix tests, and anything whose truth would be unaffected by the contents of the diff.

Output only the message or messages, plus the disagreement report where there is one.`,
    variables: [
      {
        token: "DIFF",
        label: "The staged diff",
        example:
          "@@ -12,6 +12,10 @@ class RateLimiter:\n-        self.window = 60\n+        self.window = int(os.environ.get(\"RATE_WINDOW\", 60))\n@@ -3,1 +3,1 @@ requirements.txt\n-redis==4.5.1\n+redis==5.0.1\n@@ -88,0 +89,3 @@ tests/test_limiter.py\n+def test_window_from_env(monkeypatch):",
      },
      {
        token: "CLAIM",
        label: "What I think I did",
        example:
          "Made the rate limit window configurable so staging can use a shorter one.",
      },
      {
        token: "TICKET",
        label: "Ticket or issue context",
        example:
          "PLAT-812: staging tests take 60 seconds to observe a rate limit reset, which is why the suite times out on CI.",
      },
      {
        token: "CONVENTION",
        label: "Repository convention",
        example:
          "Conventional Commits with the scope in brackets, body wrapped at 72 characters, ticket key on the last line as Refs: PLAT-812.",
      },
    ],
    expectedOutput:
      "A mechanical file by file reading of the diff, an explicit note where your description and the diff disagree, a verdict on whether this is one logical change, and a subject line that could only describe this commit.",
    followUps: [
      "You flagged the dependency bump as unrelated. Give me the exact git commands to split it out of the staged changes without losing the rest.",
      "Rewrite the body assuming the reader is bisecting a production failure and has never seen this ticket.",
      "The convention changed to a required type prefix and a 72 character subject limit. Regenerate without altering the body.",
    ],
    pitfalls: [
      "Passing a description and no diff. The model will then write an excellent message for the change you believe you made, which is precisely the failure the whole structure exists to prevent.",
      "Ignoring the disagreement report because the message underneath it reads well. That report is usually pointing at a stray edit you meant to drop, and it is far cheaper to notice now than during a revert.",
      "Letting it write a body for every commit. Most commits need only a subject, and a body that restates the diff in prose trains reviewers to stop reading bodies at all.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "Given a description alongside a diff, a model paraphrases the description and never notices the dependency bump riding along in the same staged change. Forcing a file by file reading before the description is even looked at fixes that on both models. The banned phrase list stays because GPT-5.2 otherwise falls back to update dependencies and fix tests whenever a change touches more than one concern.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "A git commit message prompt usually gets used the wrong way round. You tell the model what you changed, it writes a tidy sentence about what you told it, and the commit now records your recollection rather than the contents of the change.",
      "That matters because the two differ more often than anyone expects. The diff you are about to commit contains the thing you set out to do plus a debug line you forgot, a formatting pass your editor applied, and occasionally a dependency bump from an afternoon of trying things.",
      "So the ordering here is inverted. The diff is read first, mechanically and file by file, and your description is treated as a claim to be checked against it. The disagreement report that comes out is frequently more useful than the message.",
    ],

    sections: [
      {
        heading: "Git commit message examples come from the diff, not from memory",
        body: [
          "Grounding git commit message examples in the diff means the model has to account for every hunk, including the ones you stopped seeing. Lockfiles, generated output, test fixtures and configuration all get named rather than folded into a summary, because those are exactly the changes people forget they staged.",
          "The comparison step then runs in both directions. What did the diff do that you did not mention, and what did you mention that the diff does not contain. The second direction catches the case where you described the intent and implemented something narrower.",
        ],
      },
      {
        heading: "How to write a good commit subject line",
        body: [
          "How to write a good commit subject line has a mechanical answer and a real one. The mechanical answer is imperative mood, under fifty characters, no full stop. The real answer is that somebody scanning two hundred lines of log has to be able to tell whether this is the commit they want.",
          "That second test is what the length limit is actually for. A subject that fits in fifty characters and still identifies the change has to name something specific, which rules out the entire family of subjects that describe the act of committing rather than the change.",
          "Conventional commits with ai works well here, since the type and scope are largely derivable from which files moved. State the convention explicitly though, because a model left to guess will produce a plausible variant of the format that fails your commit hook.",
        ],
      },
      {
        heading: "Commit message that explains why not what",
        body: [
          "A commit message that explains why not what is the standard advice, and it hits a hard limit with a model: the reason usually is not in the diff. The diff shows a constant becoming an environment variable. It does not show that CI was timing out.",
          "The rule adopted here is that any reason not derivable from the diff or the ticket has to be marked for the author to confirm rather than invented. That is a small amount of friction that stops the history filling with confident explanations nobody actually gave.",
          "Where the ticket is supplied, most of the why arrives with it. Pasting two lines of issue context is the highest value input in this whole prompt, and it is the field people leave empty most often.",
        ],
      },
      {
        heading: "Splitting a commit that does two things",
        body: [
          "Splitting a commit that does two things is the recommendation people resent and later rely on. The test used here is deliberately blunt: if a truthful description needs the word and, or if half the change could be reverted without the other half, it is two commits.",
          "The reason is bisect. A commit that fixes a bug and bumps a library is a commit you cannot revert cleanly six weeks later when the library turns out to be the problem. You end up reverting the fix as well and reapplying it by hand under time pressure.",
        ],
      },
      {
        heading: "What the git commit message prompt refuses to accept",
        body: [
          "The ban list is not about taste. Various fixes, misc, cleanup and updates share one property: their truth does not depend on the contents of the diff. You could paste any change in the repository under them and they would still be accurate, which means they carry no information at all.",
          "Applying that test is the whole rule the git commit message prompt uses. Would this subject still be true of a completely different change? If yes, it is rejected and rewritten around something only this commit did.",
        ],
      },
    ],

    howTo: {
      name: "How to use the git commit message prompt",
      steps: [
        {
          name: "Paste the staged diff, not the branch diff",
          text: "Run it against what is actually about to be committed. A whole branch diff produces a summary of the feature and hides the stray hunks the comparison step exists to find.",
        },
        {
          name: "Write your claim badly and on purpose",
          text: "One casual sentence is enough, and polishing it defeats the point. The value comes from the gap between what you thought you did and what the diff contains.",
        },
        {
          name: "Read the disagreement report before the message",
          text: "It takes ten seconds and it is where the unstaged debug print, the accidental reformat and the forgotten dependency bump turn up.",
        },
        {
          name: "Resolve every AUTHOR TO CONFIRM line yourself",
          text: "Those are the reasons the model could not derive. Fill them in from what you know, or delete them, but never ship them, because a bracketed placeholder in the history is worse than no body.",
        },
      ],
    },

    faq: [
      {
        question: "Can it work from git diff output alone, with no description?",
        answer:
          "Yes, and the subject line quality holds up well because subjects are mostly derivable. The body suffers, since intent rarely appears in a diff, and you will get more bracketed confirmation lines than you would with two sentences of ticket context.",
      },
      {
        question: "Does it handle squash merges and pull request titles?",
        answer:
          "Give it the combined diff and it will write the squashed message, though the atomicity check will usually complain, which is fair. A pull request that fails the one logical change test is a pull request whose reviewer is about to have a harder time than necessary.",
      },
      {
        question: "What about repositories that require a ticket key in every commit?",
        answer:
          "Put the exact format in the convention field, including where the key goes and whether a trailer is expected. Models reproduce a stated format reliably and invent a near miss when left to infer it from a couple of examples in the log.",
      },
      {
        question: "Is a fifty character subject limit not arbitrary?",
        answer:
          "The number comes from how git formats output rather than from principle, and seventy two is defensible in a repository that uses it consistently. The limit matters less than the discipline it enforces, which is naming one specific thing instead of gesturing at a category of work.",
      },
      {
        question: "Should generated files get their own commit?",
        answer:
          "Usually yes, and the atomicity check will suggest it. A regenerated lockfile or client stub next to a hand written change makes the diff unreadable in review, and separating them costs one extra commit while saving the reviewer from scrolling past four thousand lines.",
      },
      {
        question: "How does it behave on a revert or a merge commit?",
        answer:
          "Reverts come out well, because the diff carries all the information and the subject writes itself from the original commit. Merge commits are not worth running it on at all, since the useful history lives in the commits being merged rather than in the merge itself.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "Runs on the same diff, looking for the defect rather than for the sentence that describes it.",
      },
      {
        href: "/coding-prompts/code-migration-prompt",
        label: "code migration prompt",
        description:
          "Produces the batch plan whose commits this then writes, one mechanical transformation at a time.",
      },
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description:
          "For when the atomicity check says a move and a rewrite have been combined into one change.",
      },
      {
        href: "/productivity-prompts/daily-standup-prompt",
        label: "daily standup prompt",
        description:
          "A week of honest subject lines is most of the material for the update you have to give anyway.",
      },
    ],

    externalLinks: [
      {
        href: "https://git-scm.com/docs/git-commit",
        label: "Git documentation: git commit",
        description:
          "Primary reference for how git itself treats the subject line, the blank line and the body when formatting output.",
      },
      {
        href: "https://www.kernel.org/doc/html/latest/process/submitting-patches.html",
        label: "Linux kernel: submitting patches",
        description:
          "The long standing published statement of one logical change per patch and why reviewers depend on it.",
      },
      {
        href: "https://www.conventionalcommits.org/en/v1.0.0/",
        label: "Conventional Commits v1.0.0",
        description:
          "The specification to quote verbatim in the convention field when a repository enforces a machine readable format.",
      },
      {
        href: "https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits",
        label: "GitHub: about commits",
        description:
          "Vendor documentation on how commit metadata surfaces in review, blame and history views that read the subject alone.",
      },
    ],
  },
};

export default meta;

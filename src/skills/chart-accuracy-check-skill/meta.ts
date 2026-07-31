import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Chart Accuracy Check

Use this skill whenever you are given a description of a chart or data visualization,
either before it is published or while it is still a draft, and asked whether it is
accurate and honest about what it shows.

## What you are given

Expect a description of the chart rather than the rendered image itself: the chart
type, the axis labels and their starting and ending values, what the underlying data
represents, and often the actual numbers or a rough sense of them. Work from exactly
what is described. Do not assume a rendering detail, such as a colour, a legend
position, or an exact pixel scale, that was not stated in the description.

## The checklist this skill runs against

Run every chart description against \`reference/chart-accuracy-checklist.md\` in full.
That file names seven specific, checkable accuracy issues: a truncated or non-zero
y-axis on a bar chart, a pie chart used for data that does not sum to a meaningful
whole, dual y-axes that imply a false correlation, a line chart connecting categories
that are not continuous, inconsistent bin sizes in a histogram, a cherry-picked axis
range or time window, and three dimensional perspective distortion. For each issue on
that list:

1. Check whether the described chart matches the specific condition that issue names.
2. If it does, cite the issue by its exact name from the checklist, and explain, using
   the actual numbers, categories or axis values given, exactly how a reader would be
   misled.
3. If it does not match, move on to the next issue without flagging it.

## What counts as a real finding

A finding must name one specific checklist issue and trace it to a specific detail in
the chart description: an axis start value, a chart type paired with data that does not
fit it, a bin width that changes partway through a histogram. A comment like "this chart
seems misleading" is not a finding and should never appear in your output. If you
cannot point to which checklist issue applies and which detail in the description
triggers it, you have not found anything yet, so keep working through the remaining
issues instead of writing that sentence.

## When the chart has no issues

Run the full checklist even when the first few issues clearly do not apply. If none of
the seven issues match, say so plainly: state that the chart was checked against the
named checklist and that none of the listed issues were found, rather than inventing a
minor stylistic critique to appear thorough. A bar chart with a zero baseline, one clear
comparison, and axis labels that match the data it plots is allowed to pass with no
notes attached.

## What this skill does not do

It does not redesign the chart, suggest a different chart type, or comment on colour,
font choice or layout, unless a checklist issue specifically calls for one of those
changes. It does not guess at data the description did not supply. If an axis start
value or the underlying numbers are missing and a check depends on them, ask for that
detail instead of assuming a reasonable-looking default and checking against the guess.

## Reporting the result

List every checklist issue that applies, each with its exact name, the triggering
detail from the description, and one sentence explaining how a reader is misled by it.
If nothing on the checklist applies, say that explicitly as the entire finding. Never
mix the two outcomes in one report: a chart either has named issues attached to it or it
has none, and the report should read as one or the other, not as a hedge between them.
`;

const CHECKLIST_MD = `# Chart accuracy checklist: seven named issues

Use this alongside \`SKILL.md\`. Each issue below is written to be specific and
checkable: a described chart either matches the condition named or it does not. Cite an
issue by the exact name below, never by a paraphrase of it.

## 1. Truncated or non-zero y-axis on a bar chart

A bar chart's value axis starts above zero, so the visible bar heights no longer scale
in proportion to the actual values they represent.

Why it misleads: a reader judges a bar chart by comparing bar heights directly. Starting
the axis at, for example, 95 instead of 0 turns a real three percent difference into
bars that look several times apart, because the visual ratio and the numeric ratio have
been pulled apart from one another.

## 2. Pie chart used for data that does not sum to a meaningful whole

A pie chart is applied to values that are not mutually exclusive parts of one total, for
example a survey where respondents could select more than one option, or categories
that overlap with each other.

Why it misleads: a pie chart's entire visual grammar promises that the slices add up to
one hundred percent of something real. When the underlying numbers do not actually sum
to a whole, the slice angles carry no honest meaning, even though the shape still looks
like a complete, accountable total.

## 3. Dual y-axes that imply a false correlation

Two series with two independently scaled y-axes are plotted on the same chart, and the
two scales happen to line the series up so the lines appear to move together.

Why it misleads: because each axis can be scaled independently, the apparent
relationship between the two lines is a property of the scaling choice, not of the
data. Rescaling either axis can make the same two series look correlated,
uncorrelated, or inversely related, with no change to the underlying numbers at all.

## 4. Line chart connecting non-continuous categories

A line is drawn between points on a categorical or unordered axis, for example
connecting named regions, product names, or survey answer options with a line rather
than plotting them as separate bars or points.

Why it misleads: a line implies a continuous path with real values in between its
points, which only makes sense on an axis with a genuine order and an in-between state,
such as time or a numeric scale. Connecting categories that have no natural sequence
invites a reader to see a trend or transition that does not actually exist between them.

## 5. Inconsistent bin sizes in a histogram

A histogram's bars represent unequal ranges of the underlying variable, for example
narrower bins for lower values and wider bins for higher ones, without adjusting bar
height to account for the width difference.

Why it misleads: a histogram's bar height is supposed to represent density across a
consistent interval. When bin widths vary but heights are drawn as raw counts, wider
bins collect more values by construction and appear as taller, more significant bars,
distorting the shape of the distribution the histogram claims to show.

## 6. Cherry-picked axis range or time window

A chart's start and end points on a time axis, or the range shown on a value axis, are
chosen to capture a favourable trend while cropping out data immediately before or after
that would change the impression it gives.

Why it misleads: the same underlying series can be made to look like sustained growth or
sustained decline purely by choosing where the window starts and ends. A reader has no
way to see what was cropped out of the frame unless the full range is disclosed
alongside it.

## 7. Three dimensional perspective distortion

A bar, pie or bubble chart is rendered with a three dimensional, angled perspective
effect rather than a flat, direct view.

Why it misleads: perspective foreshortening changes the apparent size of elements based
on their position in the fake depth of the scene, not their actual value. A slice or bar
placed in the foreground can appear larger than one placed behind it even when the two
represent identical numbers.

## How to use this list

Work through every issue in order for each chart description handed to you. Cite an
issue only when the description contains the specific condition it names, quoting the
axis value, chart type or bin detail that triggers it. When a chart clears every issue
on this list, say so directly rather than inventing a softer version of one of these
seven problems to appear thorough.
`;

const meta: SkillMeta = {
  slug: "chart-accuracy-check-skill",
  name: "Chart Accuracy Check",
  title: "Chart Accuracy Check Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that checks a described chart against a named checklist of seven real accuracy issues, cites which specific one applies, and says plainly when none of them do.",

  seo: {
    primaryKeyword: "chart accuracy check skill",
    keywords: [
      "chart accuracy check skill",
      "free ai skill for chart accuracy",
      "downloadable chart accuracy checklist",
      "ai skill to check chart for misleading axis",
      "chart honesty checklist for ai assistants",
    ],
    seoTitle: "Chart Accuracy Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable chart accuracy check skill that checks a described chart against seven named issues and states plainly when none apply.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/chart-accuracy-checklist.md", content: CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Models asked to review a chart description for accuracy default to a vague comment such as 'this looks a bit misleading' or focus on layout and colour while missing a genuine axis or scale problem entirely. Requiring every finding to trace to a specific, named checklist issue and a specific detail in the description closes that gap, and requiring an explicit no-issues statement stops the opposite failure of manufacturing a critique to seem thorough.",
  },

  article: {
    intro: [
      "A chart accuracy check skill only earns its name if it can point to a specific reason a chart misleads, not a general feeling that something looks off. Handed a description of a bar chart with a truncated axis or a pie chart built on overlapping categories, most AI assistants offer a vague warning at best, or nothing at all, because they are not checking against any fixed list of known problems. This skill is built to run every chart description against a named checklist instead, and to say so plainly when nothing on that checklist actually applies.",
      "It ships as two plain text files: a main instructions file and a seven issue reference checklist the instructions point to before any finding is allowed to leave a citation. Both are fully readable on this page before you download the .zip, and the same content is exactly what a teammate or an AI assistant receives once that archive is opened.",
    ],
    sections: [
      {
        heading: "Why 'this chart looks misleading' is not a finding",
        body: [
          "A vague warning gives the person building the chart nothing to act on. It cannot be checked, argued with, or fixed, because it does not say which axis, which chart type or which number is the problem. An ai skill to check chart for misleading axis issues has to do better than a feeling, which is why every instruction in this skill routes through a named list rather than an open-ended judgment.",
          "The difference shows up immediately in the output. Instead of a general caution, the skill states the exact checklist issue, quotes the axis value or category that triggers it, and explains in one sentence how a reader would be misled by that specific detail.",
        ],
      },
      {
        heading: "The seven issues on the checklist",
        body: [
          "A downloadable chart accuracy checklist only works if its items are specific enough to check against a description rather than a rendered image. The seven issues here cover the failure modes that recur most often in bar charts, pie charts, line charts, histograms and dual axis figures.",
        ],
        list: [
          "Truncated or non-zero y-axis on a bar chart",
          "Pie chart used for data that does not sum to a meaningful whole",
          "Dual y-axes that imply a false correlation",
          "Line chart connecting non-continuous categories",
          "Inconsistent bin sizes in a histogram",
          "Cherry-picked axis range or time window",
          "Three dimensional perspective distortion",
        ],
      },
      {
        heading: "A worked example: a truncated y-axis exaggerating a small difference",
        body: [
          "Say a bar chart compares quarterly revenue of 148,000 against 152,000, with the value axis running from 145,000 to 155,000 instead of from zero. The two bars, drawn against that narrow range, end up looking roughly three times apart in height, when the real difference between the two figures is under three percent.",
          "The skill cites this against issue one, truncated or non-zero y-axis on a bar chart, names the axis start value of 145,000 as the specific detail that triggers it, and states plainly that a reader glancing at the bar heights would conclude the newer quarter is dramatically stronger than the numbers actually support.",
        ],
      },
      {
        heading: "Dual axes and the correlation they don't actually show",
        body: [
          "A chart honesty checklist for ai assistants earns its keep on dual axis figures more than almost anywhere else, because the problem is invisible unless you specifically look for it. Two lines that appear to rise and fall together on a chart with two independently scaled axes are not evidence of any real relationship between the underlying series.",
          "The skill flags this as issue three whenever a description names two series plotted with two separate y-axes, and states that the apparent correlation is a property of how the two scales were set, not of the data, since either axis could be rescaled to make the lines look correlated, uncorrelated, or inverted.",
        ],
      },
      {
        heading: "When the checklist finds nothing, and why that has to be sayable",
        body: [
          "A free ai skill for chart accuracy is only trustworthy if it can pass a chart with no notes attached. A bar chart with a zero baseline, a single clear comparison between two categories, and axis labels that match the data plotted clears every issue on the checklist, and the correct output is a plain statement that the chart was checked and no listed issue applies.",
          "Manufacturing a minor critique to appear thorough would undermine every other finding this skill produces, since a reader could no longer tell a real accuracy issue from a filler comment added out of habit.",
        ],
      },
      {
        heading: "Using the downloaded files with an AI assistant",
        body: [
          "Give an AI assistant both files at once, because the main instructions file references the checklist file by its relative path. Preserving the folder layout from the download, SKILL.md next to a reference folder, keeps that link intact and keeps every citation this chart accuracy check skill produces traceable back to the exact checklist item it names.",
        ],
      },
    ],
    howTo: {
      name: "How to use the chart accuracy check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/chart-accuracy-checklist.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Describe the chart in detail",
          text: "Give the chart type, the axis labels and their starting and ending values, what the data represents, and the underlying numbers where possible, before asking for a check.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the checklist file, then supply your chart description and ask for a review.",
        },
      ],
    },
    faq: [
      {
        question: "What if my chart has more than one issue from the checklist?",
        answer:
          "The skill lists every checklist issue that applies, not just the first one found. Each listed issue gets its own exact name, the specific detail in the chart description that triggers it, and a one sentence explanation of how a reader would be misled by that particular problem.",
      },
      {
        question: "Can this skill check a chart I only describe in words, without an image?",
        answer:
          "Yes, and that is the intended use. It works from the chart type, the axis labels and values, and what the data represents, checking those details against the named checklist rather than analysing pixels in a rendered image.",
      },
      {
        question: "Does the skill ever say a chart is fine when it has real problems?",
        answer:
          "It only says a chart is fine after working through every issue on the seven item checklist and finding none of them apply. If a described chart is missing information needed to check a specific issue, the instructions call for asking for that detail rather than assuming the chart passes.",
      },
      {
        question: "Why does the skill refuse to just say a chart looks misleading?",
        answer:
          "Because that comment cannot be checked or acted on. The instructions require every finding to trace to one named checklist issue and a specific detail in the description, so the person building the chart knows exactly what to fix and why it matters.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. Previewing the files and building the .zip both happen entirely in your browser, with no server call behind either action. Nothing about the chart data you eventually use the skill with is ever transmitted anywhere by this site.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Keeping the seven issue checklist in its own reference file lets the main instructions file stay focused on process, and the checklist can grow with more named issues later without any restructuring of the instructions that point to it.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-prompts/chart-selection-prompt",
        label: "chart selection prompt",
        description: "For choosing the right chart form before a chart exists, rather than checking one that has already been drafted.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description: "Use before drawing a difference between two bars, so the figure is not illustrating a gap that sampling alone explains.",
      },
      {
        href: "/data-analysis-prompts/data-storytelling-prompt",
        label: "data storytelling prompt",
        description: "For writing the sentence a chart is supposed to support, a natural next step once the chart itself has been checked.",
      },
      {
        href: "/data-analysis-prompts/data-quality-prompt",
        label: "data quality prompt",
        description: "For checking the underlying numbers before they reach a chart at all, upstream of any axis or scale decision.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.data-to-viz.com/caveats.html",
        label: "data-to-viz.com: chart caveats",
        description: "An independent collection of common charting pitfalls, including truncated axes, dual axes and pie chart misuse, that lines up closely with this checklist.",
      },
      {
        href: "https://www.edwardtufte.com",
        label: "Edward Tufte: graphical integrity",
        description: "The reference point for graphical integrity as a design discipline, the standard this checklist is built to make checkable rather than aesthetic.",
      },
      {
        href: "https://bbc.github.io/rcookbook/",
        label: "BBC Visual and Data Journalism Cookbook",
        description: "A working newsroom style guide for building charts, useful for seeing named accuracy issues applied to real editorial output.",
      },
      {
        href: "https://www.datajournalism.com/read/handbook/one",
        label: "Data Journalism Handbook",
        description: "An open access guide covering how newsrooms visualise data responsibly, the same discipline this skill applies to a single chart description.",
      },
    ],
  },

  tags: ["data analysis", "charts", "data visualization", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;

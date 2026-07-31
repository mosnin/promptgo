import type { IdeToolMeta } from "@/lib/ide-tool-types";

const AGENT_PY_TEMPLATE = `"""
Research Agent Starter Template
================================

A minimal, working structure for an agent that researches a question by
searching, reading sources, and tracking exactly which source supports
which claim before writing a final answer. The final answer is built only
from claims that carry a logged source, never from anything the model
recalls or infers along the way.

Read README.md for what to plug in first. Read SOURCE_TRACKING.md for the
exact logging format this file assumes.
"""

from dataclasses import dataclass
from typing import Optional


@dataclass
class SearchResult:
    title: str
    url: str
    snippet: str


@dataclass
class SourceRecord:
    """One logged use of a source, matching the format in SOURCE_TRACKING.md.

    A SourceRecord is created only after a passage has actually been read,
    never in advance of reading it. claim is the specific statement the
    passage supports, not a paraphrase of the whole source.
    """

    source: str
    claim: str
    passage: str


class ResearchAgent:
    """Searches, reads, and synthesises an answer with every claim tied to a
    logged source.

    The loop is deliberately linear and inspectable: plan, search, read,
    track, repeat until the question is answered or the source budget runs
    out, then synthesise from the tracked records only.
    """

    def __init__(self, max_sources: int = 6):
        self.max_sources = max_sources
        self.records: list[SourceRecord] = []

    def search(self, query: str) -> list[SearchResult]:
        """PLACEHOLDER: replace with a real search call.

        Plug in a real search API here, for example a web search endpoint
        or an internal document index. Return a short list of candidate
        results for the query, most relevant first. Do not fabricate
        results if the underlying call fails, raise instead so the caller
        knows the search step did not actually happen.
        """
        raise NotImplementedError("Wire up a real search call here. See README.md.")

    def read_and_extract(self, result: SearchResult) -> str:
        """PLACEHOLDER: replace with a real fetch and extraction call.

        Plug in a real page fetch and text extraction here, for example an
        HTTP client plus an HTML to text conversion or a PDF text
        extractor. Return the readable text of the source, or an empty
        string if the fetch failed, so the caller can skip it rather than
        track a source it never actually read.
        """
        raise NotImplementedError("Wire up a real fetch and extract call here. See README.md.")

    def track_source(self, source: str, claim: str, passage: str) -> None:
        """Log one source against the specific claim it supports.

        This is the only path by which a claim is allowed to reach the
        final answer. source should be a stable identifier, ideally a URL.
        claim should be one specific statement, not a summary of the whole
        source. passage should be the exact sentence or data point relied
        on, copied rather than rewritten.
        """
        if not source or not claim or not passage:
            raise ValueError("source, claim and passage are all required to log a record.")
        self.records.append(SourceRecord(source=source, claim=claim, passage=passage))

    def plan_queries(self, question: str) -> list[str]:
        """PLACEHOLDER: turn one question into a short list of search
        queries.

        A single query rarely covers a real question well. Break the
        question into two or three angles a search engine can actually
        answer, for example a direct query and a query aimed at a counter
        argument or a more recent source.
        """
        return [question]

    def evaluate_and_track(self, source: str, text: str) -> None:
        """PLACEHOLDER: decide what in text is worth tracking.

        Replace this with logic, or a call to a model, that reads text and
        calls self.track_source once per specific claim it actually
        supports, quoting the exact passage relied on. Do not track a
        source against a claim the passage only loosely relates to.
        """
        return None

    def research(self, question: str) -> str:
        """Run the full loop for a question and return the final answer.

        This method is the shape worth keeping even as the placeholders
        above get replaced with real calls. It never writes a claim that
        is not backed by a record in self.records.
        """
        queries = self.plan_queries(question)
        for query in queries:
            if len(self.records) >= self.max_sources:
                break
            results = self.search(query)
            for result in results:
                text = self.read_and_extract(result)
                if not text:
                    continue
                self.evaluate_and_track(result.url, text)

        return self.synthesize_answer(question)

    def synthesize_answer(self, question: str) -> str:
        """Build the final answer using only tracked, cited material.

        Every sentence in the returned answer must trace back to at least
        one record in self.records. If self.records is empty, say so
        rather than answering from general knowledge.
        """
        if not self.records:
            return "No sourced claims were tracked for this question. Refusing to answer without citations."

        lines = [f"Answer to: {question}", ""]
        for record in self.records:
            lines.append(f"- {record.claim} (source: {record.source})")
        lines.append("")
        lines.append("Every line above is backed by a logged source. See SOURCE_TRACKING.md for the full record format.")
        return "\\n".join(lines)


if __name__ == "__main__":
    agent = ResearchAgent(max_sources=6)
    # PLACEHOLDER: replace with a real question once search and
    # read_and_extract are wired up to real calls.
    print(agent.research("Replace this with your research question"))
`;

const SOURCE_TRACKING_TEMPLATE = `# Source Tracking Format

This file defines the record a research agent built from this template keeps
for every source it uses. The rule is simple and absolute: no claim reaches
the final answer unless it has a matching record here. A claim with no
logged source does not get written into the answer, no matter how plausible
the agent judges it to be.

## What counts as one record

Each source used during a research task gets one record for every distinct
claim it supports, not one record per source. A single article that
supports three separate claims in the final answer needs three records,
each quoting the specific passage relied on for that claim.

A record has exactly three fields.

### Source

A stable identifier for where the information came from. A URL is
preferred. If the source has no URL, for example an uploaded document, use
a stable name a reader could ask for, such as the file name plus a page or
section number.

### Claim

One specific statement the source supports, written as it will appear in
the final answer, not as a paraphrase of the whole source. "The vendor's
uptime SLA is 99.9 percent" is a claim. "The vendor's contract terms" is a
topic, not a claim, and does not belong in a record.

### Passage

The exact sentence, phrase or data point in the source that the claim
relies on, copied rather than rewritten. If a claim depends on a number in
a table, quote the row and the number directly instead of describing the
table in general terms.

## Example record

Source: https://example.com/vendor-security-report
Claim: The vendor's uptime SLA is 99.9 percent.
Passage: "We guarantee 99.9% uptime measured monthly across all production regions."

## The rule this file exists to enforce

Before the final answer is written, every sentence in it is checked against
this log. If a sentence states something with no matching record, one of
two things happens: the agent goes back and finds a source for it, or the
sentence is removed. A sentence never stays in the final answer because it
seems obviously true or because the agent recalls something similar from
training. Claims involving numbers, dates and direct quotes are held to
this rule most strictly, since these are the details a reader is most
likely to act on directly.

## When two sources disagree

Log both records rather than silently picking one. The final answer should
state plainly that sources disagree and cite both, rather than choosing
the source that merely sounds more authoritative. A synthesis that hides a
disagreement between sources is less useful than one that surfaces it
clearly.

## When no source supports a claim the question needs answered

Say so directly in the final answer instead of leaving the question
unaddressed or filling the gap with an unsourced statement. "No source
found for this" is a valid and complete part of a research answer, and is
always preferable to a fabricated one.
`;

const README_TEMPLATE = `# Research Agent Starter Template

A minimal starting point for an agent that researches a question by
searching, reading sources, and tracking exactly which source supports
which claim, so the final answer only contains material that traces back
to something actually read. See agent.py for the working loop and
SOURCE_TRACKING.md for the exact logging format the loop assumes.

## Files in this template

- agent.py: the agent's search, read, track and synthesise loop. Three
  methods are placeholders you fill in before this runs against anything
  real.
- SOURCE_TRACKING.md: the format every logged source follows, and the rule
  against writing an unsourced claim into the final answer.
- README.md: this file.

## What to plug in first

Two methods in agent.py raise NotImplementedError on purpose, so the
template fails loudly instead of silently returning an empty answer.

### 1. The search call

ResearchAgent.search needs a real search API behind it: a web search
endpoint, an internal document index, or a vector search over a knowledge
base already maintained elsewhere. Whatever is chosen, keep the return
shape as a short, ranked list of candidate results, since the rest of the
loop assumes it can iterate over results in relevance order.

### 2. The fetch and extract call

ResearchAgent.read_and_extract needs a real HTTP client and a way to turn
a fetched page or document into readable text, for example an HTML to text
conversion or a PDF text extractor. Return an empty string on a failed
fetch rather than raising, so one bad URL does not stop the whole research
run partway through.

## After the two calls are wired up

evaluate_and_track is the third method worth rewriting early. The
placeholder version tracks nothing at all. Replace it with logic, or a
call to a model, that reads the extracted text and logs one record per
specific claim it actually supports, quoting the exact passage relied on,
exactly as SOURCE_TRACKING.md describes.

## Running it

python agent.py

The bundled entry point runs a placeholder question through the loop and
prints the result. Replace the question in the if __name__ block once
search and read_and_extract return real data, and confirm the printed
answer only contains claims that carry a source.

## Extending the template

Reasonable next steps once the placeholders are filled in: caching fetched
pages so a re-run does not refetch the same URL, a stopping rule based on
how well the tracked records currently cover the question rather than a
fixed source count, and a separate export of the source log alongside the
final answer so a reader can audit the research without rerunning the
agent themselves.
`;

const meta: IdeToolMeta = {
  slug: "research-agent-starter-template",
  title: "Research Agent Starter Template: Search, Read and Cite in Browser",
  name: "Research Agent Starter",
  category: "agent-starter-templates",
  summary:
    "Open a working three file research agent starter template in the browser: a Python search, read and track loop, a source tracking format, and a README naming exactly what to plug in first.",
  seo: {
    primaryKeyword: "research agent starter template",
    keywords: [
      "research agent starter template",
      "research agent starter kit",
      "multi file research agent template",
      "ai agent that tracks its sources",
      "download a research agent template",
    ],
    seoTitle: "Research Agent Starter Template: Search, Read, Cite",
    seoDescription:
      "A free research agent starter template with a working Python search, read and track loop, a source tracking format and a README, ready to edit and download as a zip.",
  },
  files: [
    { path: "agent.py", content: AGENT_PY_TEMPLATE, kind: "code" },
    { path: "SOURCE_TRACKING.md", content: SOURCE_TRACKING_TEMPLATE, kind: "markdown" },
    { path: "README.md", content: README_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the multi source citation discipline this site's writing and research prompts already enforce.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "An agent given a research question and left to search, read and answer in one unstructured pass tends to blend several sources into a single confident sentence, so the specific number or claim can no longer be traced back to where it came from. Splitting the loop into a search step, a read step and a separate tracking step, then refusing to synthesise from anything outside the tracked log, keeps every claim in the final answer attributable to a specific passage rather than a blended impression across sources.",
  },
  article: {
    intro: [
      "This research agent starter template opens a working, three file starting point directly in your browser: a Python agent that searches, reads and tracks its sources before writing an answer, a markdown file defining the record format every source is logged in, and a README naming the two calls to wire up first. There is nowhere to download a research agent template with real placeholder logic already filled in except by opening one directly.",
      "A research agent is a different shape of problem from a document summariser, because it runs its own loop across several sources before writing a sentence, and nothing forces it to remember which source supported which line unless the structure demands it. Everything opens in the shared in-browser editor this site's builder tools share, so this is a genuinely free research agent starter kit rather than a signup gated service: editing, importing a .zip, and downloading a fresh archive all happen client side.",
    ],
    sections: [
      {
        heading: "Why a research loop needs a source log, not just an answer",
        body: [
          "A model asked to research a question and answer it in one pass will usually produce something fluent and something ungrounded at the same time, because fluency and traceability are different properties and only one of them is visible in the output text. The fix in this template is structural: agent.py separates searching, reading and tracking into distinct steps, and the final synthesis step is only allowed to draw on records that were explicitly logged during the read step, which is a stronger guarantee than asking the model to be careful about citations after the fact.",
        ],
      },
      {
        heading: "How the search, read and track loop in agent.py works",
        body: [
          "The ResearchAgent class in agent.py runs a plan, search, read, track cycle: plan_queries breaks one question into a short list of angles, search returns candidate results, read_and_extract turns a result into readable text, and evaluate_and_track decides what is worth logging. Three of those methods are placeholders on purpose, marked clearly rather than left as silent stubs. Keeping the loop this explicit is what makes it a multi file research agent template rather than a single function, since a failure in one step is handled locally instead of taking down the whole run.",
        ],
      },
      {
        heading: "The exact format SOURCE_TRACKING.md enforces",
        body: [
          "SOURCE_TRACKING.md is not a general note about citing sources. It defines a record with exactly three fields: the source itself, the specific claim it supports, and the exact passage or data point relied on, copied rather than paraphrased. Before a final answer is written, every sentence in it is checked against the log, and a sentence with no matching record either gets a source found for it or gets removed. This is what an ai agent that tracks its sources looks like in file form, rather than an instruction buried inside a prompt.",
        ],
        list: [
          "Source: a stable identifier, ideally a URL, for where the information came from.",
          "Claim: one specific statement the source supports, not a summary of the whole source.",
          "Passage: the exact sentence or data point relied on, quoted rather than rewritten.",
        ],
      },
      {
        heading: "The rule against unsourced claims, and why it is absolute",
        body: [
          "The template treats an unsourced claim as a defect worth refusing to ship. synthesize_answer in agent.py returns an explicit refusal message when no records exist at all, and SOURCE_TRACKING.md states the same rule from the documentation side. This matters most when two sources disagree: SOURCE_TRACKING.md instructs logging both records and stating the disagreement rather than quietly picking whichever source sounds more authoritative.",
        ],
      },
      {
        heading: "What to wire up first",
        body: [
          "README.md names the two calls that turn this from a structure into a working agent: a real search call behind ResearchAgent.search, and a real fetch and extraction call behind read_and_extract. Both raise NotImplementedError in the starter file on purpose, so anyone who tries to run agent.py before wiring them up gets a clear error instead of a silent, empty result. Once those two calls return real data, evaluate_and_track is the next method worth rewriting, since the placeholder version tracks nothing at all, and replacing it is what turns the loop into an agent that produces a real, cited answer.",
        ],
      },
      {
        heading: "Where this differs from a single document summary",
        body: [
          "A document summariser reads one source and condenses it, with no search step and no need to compare competing sources against each other. A research agent starter template covers a different job: a running loop that decides what to search for, reads several independent sources, and has to keep straight which one supports which specific line of the eventual answer, which is why the tracking format logs a claim and a passage per source rather than just a bibliography at the end.",
        ],
      },
    ],
    howTo: {
      name: "How to build on this research agent starter template",
      steps: [
        { name: "Read all three starter files first", text: "Open agent.py, SOURCE_TRACKING.md and README.md before changing anything, since the record format and the loop structure depend on each other." },
        { name: "Wire up the search call", text: "Replace the NotImplementedError in ResearchAgent.search with a real search API call, keeping the SearchResult shape the loop expects." },
        { name: "Wire up the fetch and extract call", text: "Replace the NotImplementedError in read_and_extract with a real HTTP client and text extraction step, returning empty on a failed fetch." },
        { name: "Replace evaluate_and_track with real logic", text: "Write logic, or a model call, that reads extracted text and logs one record per claim it supports, quoting the exact passage relied on." },
        { name: "Run agent.py against a real question", text: "Replace the placeholder question and confirm the printed answer only contains claims tied to a logged record." },
        { name: "Download the finished agent", text: "Click Download .zip to save the file set exactly as shown, ready to extend further outside the browser." },
      ],
    },
    faq: [
      {
        question: "What makes this a research agent starter template rather than a search wrapper?",
        answer:
          "A search wrapper returns results and stops. This research agent starter template runs a full loop that plans queries, reads what the search returns, logs it against a specific claim, and only then writes an answer, refusing to synthesise anything that skipped the tracking step.",
      },
      {
        question: "Do I have to use the exact SOURCE_TRACKING.md format?",
        answer:
          "No. The three field structure, source, claim and passage, is a sensible default matching how agent.py logs records, but it is plain markdown and can be extended with fields such as a confidence rating without breaking the core rule that every claim needs a matching entry.",
      },
      {
        question: "Can this multi file research agent template call a real search API out of the box?",
        answer:
          "No, and that is deliberate. ResearchAgent.search and read_and_extract raise NotImplementedError until a real search and fetch call are wired in, so the starter file never pretends to have searched or read anything it has not actually reached.",
      },
      {
        question: "Is anything I edit here saved or uploaded anywhere?",
        answer:
          "No. The editor holds changes only in the browser tab's own memory for the length of the visit. Nothing is sent to a server while editing, so downloading the zip before leaving is the only way to keep the work done on the files.",
      },
      {
        question: "How is this different from the account research prompt or summarise document prompt on this site?",
        answer:
          "Those are single pass prompts: paste material once, get one structured output back, with no agent loop and no running source log. This template is a multi file agent structure meant to be run repeatedly, tracking sources across an entire research session rather than one paste.",
      },
      {
        question: "What happens if the agent cannot find a source for part of the question?",
        answer:
          "synthesize_answer and SOURCE_TRACKING.md both treat this as an acceptable outcome rather than a failure to hide. The final answer should state plainly that no source was found, instead of filling the gap with a plausible sounding but unsourced sentence.",
      },
      {
        question: "Can I add more files to this ai agent that tracks its sources beyond the starting three?",
        answer:
          "Yes. The Add file control in the editor's sidebar allows any additional file at any path, for example a query planning module or a config file for search API credentials. There is no limit on file count beyond what stays practical to maintain by hand.",
      },
    ],
    internalLinks: [
      {
        href: "/writing-prompts/summarise-document-prompt",
        label: "Summarise document prompt",
        description: "A single pass prompt for condensing one document with anchored claims, a different job from a running multi source agent loop.",
      },
      {
        href: "/sales-prompts/account-research-prompt",
        label: "Account research prompt",
        description: "A single pass research prompt for pasted material, useful context for how this template's tracked, multi source version differs.",
      },
      {
        href: "/skills/writing-skills/citation-format-consistency-skill",
        label: "Citation format consistency skill",
        description: "A read only skill that checks citation formatting in finished writing, distinct from this template's own source tracking loop.",
      },
      {
        href: "/ide-tools/agent-starter-templates",
        label: "See more agent starter templates",
        description: "Every archetype template in this category, for starting a command line, browser driven, workflow or support agent from a working structure.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips",
        label: "Anthropic: Long context prompting tips",
        description: "Guidance on retrieval and grounding behaviour over long or multiple inputs, directly relevant to keeping a research loop's claims traceable.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description: "Covers structured output and explicit grounding techniques applicable to the track and synthesise steps in this loop.",
      },
      {
        href: "https://arxiv.org/abs/2005.00661",
        label: "Maynez et al: On faithfulness and factuality in abstractive summarisation",
        description: "Measures how often generated text contains claims unsupported by its source material, the exact failure the source tracking rule guards against.",
      },
      {
        href: "https://www.python.org/dev/peps/pep-0008/",
        label: "PEP 8: Style guide for Python code",
        description: "The style conventions agent.py follows, useful when extending the placeholders into a longer, real implementation.",
      },
    ],
  },
  tags: ["research agent", "agent starter template", "source tracking", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

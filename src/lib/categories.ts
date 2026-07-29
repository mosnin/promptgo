import type { Category, CategorySlug } from "./types";

/**
 * Ten job function clusters. Each category slug is an exact match keyword and
 * doubles as the first URL segment, so /marketing-prompts/cold-email-prompt
 * reads as a clean keyword hierarchy for both crawlers and humans.
 *
 * The categories are deliberately chosen so that no two compete for the same
 * head term. "marketing prompts" and "sales prompts" are adjacent in meaning
 * but are genuinely different searches made by different people, whereas
 * "content prompts" and "writing prompts" would have cannibalised each other,
 * which is why only one of those exists.
 */
export const categories: Category[] = [
  {
    slug: "marketing-prompts",
    name: "Marketing",
    title: "Marketing Prompts",
    seoTitle: "Marketing Prompts: Free AI Prompts For Campaigns",
    seoDescription:
      "Free marketing prompts for ChatGPT, Claude and Gemini covering ad copy, landing pages, email campaigns and positioning. Tested, copy ready and no signup.",
    primaryKeyword: "marketing prompts",
    keywords: [
      "marketing prompts",
      "ai prompts for marketing",
      "chatgpt prompts for marketing",
      "marketing copy prompts",
    ],
    intro:
      "Campaign work is mostly drafting, and drafting is where a good prompt earns its keep. These marketing prompts cover the assets you actually ship: ad variants, landing page copy, email sequences, positioning statements and audience research.",
    body: [
      "The difference between a marketing prompt that works and one that returns beige filler is almost always specificity about the reader. A prompt that says 'write an ad for my product' has given the model nothing to work with, so it averages across every ad it has ever seen and hands back the mean. Every prompt in this category forces the inputs that change the output: who the reader is, what they currently believe, what they are comparing you against, and what one action the copy is supposed to cause.",
      "The second thing these prompts do is refuse to let the model pick its own success criteria. Left alone, a language model optimises for sounding finished. Marketing copy is not judged on sounding finished, it is judged on whether a specific person takes a specific action, so each prompt states the constraint set explicitly: the word ceiling, the reading level, the claim the copy is not allowed to make without evidence, and the format the result has to arrive in.",
    ],
    icon: "megaphone",
    accent: "#f472b6",
    order: 1,
  },
  {
    slug: "writing-prompts",
    name: "Writing",
    title: "Writing Prompts",
    seoTitle: "Writing Prompts: Free AI Prompts For Better Drafts",
    seoDescription:
      "Free writing prompts for ChatGPT and Claude that edit, restructure and sharpen your drafts. Built for editors and writers, tested on real copy, no signup.",
    primaryKeyword: "writing prompts",
    keywords: [
      "writing prompts",
      "ai writing prompts",
      "chatgpt prompts for writing",
      "editing prompts for ai",
    ],
    intro:
      "The useful writing prompts are not the ones that write for you. They are the ones that edit, restructure, pressure test and cut, which is where a model genuinely outperforms a tired author on a second read.",
    body: [
      "Asking a model to write an article from a title produces exactly the kind of text readers have learned to skim past, because the model has no information beyond the title and fills the gap with generalities. Asking it to take your draft and mark every sentence that asserts something without supporting it is a different task entirely, and one it is extremely good at. The prompts in this category lean hard in that direction: they treat the model as an editor with infinite patience rather than as a ghostwriter with nothing to say.",
      "Each prompt also fixes the failure mode that makes AI editing frustrating, which is that the model rewrites your voice into its own. Left unconstrained it will smooth out the specific word choices and rhythm that made the draft yours. These prompts pin the voice explicitly, ask for changes as suggestions against numbered sentences rather than as a wholesale replacement, and require the model to say why each change earns its place.",
    ],
    icon: "type",
    accent: "#fbbf24",
    order: 2,
  },
  {
    slug: "coding-prompts",
    name: "Coding",
    title: "Coding Prompts",
    seoTitle: "Coding Prompts: Free AI Prompts For Developers",
    seoDescription:
      "Free coding prompts for ChatGPT and Claude covering code review, debugging, refactoring, tests and migrations. Written by engineers and tested on real code.",
    primaryKeyword: "coding prompts",
    keywords: [
      "coding prompts",
      "ai prompts for developers",
      "chatgpt prompts for coding",
      "code review prompts",
    ],
    intro:
      "These coding prompts target the parts of the job that are tedious rather than hard: reading unfamiliar code, writing the tests you skipped, tracing a bug through layers you did not write, and migrating a pattern across a hundred files.",
    body: [
      "The reason a lot of AI coding output disappoints is that the request omits the constraints the code actually has to satisfy. A model asked to 'fix this function' does not know which behaviour is load bearing, which callers exist, what the performance envelope is, or which style the codebase follows, so it produces something plausible that fails review. Every prompt here front loads that context and states what the model is not allowed to change, which turns a guess into an answer.",
      "Several of these prompts are adversarial by design. Asking a model whether your code has a bug invites agreement; asking it to assume a bug exists and produce the input that triggers it is a materially different question that surfaces real defects. The same applies to review: a prompt that asks for feedback gets compliments, and a prompt that asks for the three changes a staff engineer would block the pull request over gets useful criticism.",
    ],
    icon: "code",
    accent: "#34d399",
    order: 3,
  },
  {
    slug: "business-prompts",
    name: "Business",
    title: "Business Prompts",
    seoTitle: "Business Prompts: Free AI Prompts For Operators",
    seoDescription:
      "Free business prompts for ChatGPT and Claude covering strategy, meetings, hiring, process documentation and decision memos. Practical, tested and copy ready.",
    primaryKeyword: "business prompts",
    keywords: [
      "business prompts",
      "ai prompts for business",
      "chatgpt prompts for business owners",
      "strategy prompts for ai",
    ],
    intro:
      "Running anything generates a steady stream of documents nobody enjoys writing: decision memos, process docs, meeting summaries, job descriptions and post mortems. These business prompts turn each of those into a filled in template rather than a blank page.",
    body: [
      "Most business writing follows a structure that is well understood and rarely followed, which is why so much of it is unreadable. A decision memo has a known shape: the decision, the options considered, the criteria, the recommendation and what would have to be true for it to be wrong. The prompts here encode those structures directly, so the model is not inventing a format on the fly and you are not editing one into existence afterwards.",
      "The other thing these prompts do is force the uncomfortable content into the document. A model asked to summarise a plan will produce an optimistic summary, because that is what the input emphasised. Asked to state the three assumptions the plan depends on and what happens if each is wrong, it produces the section the plan actually needed. Several prompts in this category exist purely to generate that missing half.",
    ],
    icon: "briefcase",
    accent: "#38bdf8",
    order: 4,
  },
  {
    slug: "sales-prompts",
    name: "Sales",
    title: "Sales Prompts",
    seoTitle: "Sales Prompts: Free AI Prompts For Outreach And Calls",
    seoDescription:
      "Free sales prompts for ChatGPT and Claude covering cold email, discovery calls, objection handling, follow ups and proposals. Tested on real pipelines.",
    primaryKeyword: "sales prompts",
    keywords: [
      "sales prompts",
      "ai prompts for sales",
      "chatgpt prompts for sales reps",
      "cold outreach prompts",
    ],
    intro:
      "Selling is a research problem wearing a writing problem's clothes. These sales prompts spend their effort on the research half, because a personalised opener written from a real trigger event outperforms a beautifully worded generic one every time.",
    body: [
      "The standard AI sales email fails for a diagnosable reason: it personalises the greeting and nothing else. The model is handed a company name, inserts it into a template, and produces something the recipient has seen four hundred times. The prompts in this category instead require a specific, checkable observation about the prospect before a single line of copy is drafted, and they instruct the model to refuse to proceed if that observation has not been supplied.",
      "Objection handling gets the same treatment. A prompt asking for rebuttals produces defensive scripts that make a call worse. Asking the model to state what the objection probably means underneath, and what question would confirm it, produces something a good rep would actually say. Several prompts here are written as call preparation rather than as copy generation for exactly that reason.",
    ],
    icon: "handshake",
    accent: "#fb7185",
    order: 5,
  },
  {
    slug: "education-prompts",
    name: "Education",
    title: "Education Prompts",
    seoTitle: "Education Prompts: Free AI Prompts For Teaching",
    seoDescription:
      "Free education prompts for teachers and students covering lesson plans, rubrics, feedback, revision and explanation. Tested with real classroom material.",
    primaryKeyword: "education prompts",
    keywords: [
      "education prompts",
      "ai prompts for teachers",
      "chatgpt prompts for students",
      "lesson plan prompts",
    ],
    intro:
      "These education prompts split cleanly into two jobs: reducing the preparation and marking load on teachers, and helping students understand material rather than outsource it. Both are handled explicitly, because the prompts that serve one badly serve the other.",
    body: [
      "The teaching prompts here are built around the artefacts that consume the most unpaid hours: differentiated lesson plans, marking rubrics that are specific enough to be applied consistently, and written feedback that tells a student what to do next instead of what they did wrong. Each one takes the curriculum objective as an input, because a lesson plan generated without one is a decorative document.",
      "The student prompts are deliberately constructed so that the model does not do the work. A prompt that asks for an essay produces an essay and no learning. A prompt that asks the model to interrogate your understanding using the Socratic method, refuse to give the answer, and tell you which specific concept your confusion traces back to, produces something closer to a patient tutor. Where a prompt could be misused to submit generated work as your own, the page says so plainly.",
    ],
    icon: "graduation",
    accent: "#a78bfa",
    order: 6,
  },
  {
    slug: "design-prompts",
    name: "Design",
    title: "Design Prompts",
    seoTitle: "Design Prompts: Free AI Prompts For Designers",
    seoDescription:
      "Free design prompts for ChatGPT, Claude and image models covering critique, design systems, UX copy, art direction and image generation. Tested and specific.",
    primaryKeyword: "design prompts",
    keywords: [
      "design prompts",
      "ai prompts for designers",
      "midjourney prompt templates",
      "ux writing prompts",
    ],
    intro:
      "Design prompts fall into two families that behave completely differently: language prompts that critique, name and document design decisions, and image prompts where the phrasing is closer to camera settings than to a sentence. Both are covered here, separately.",
    body: [
      "For the language half, the highest value use is critique, because a model will happily say the thing a polite colleague will not. A prompt that asks whether a layout is good gets reassurance. A prompt that asks which single element is doing the most damage to the visual hierarchy and why, in the vocabulary of a design system review, gets an answer worth acting on. The UX writing prompts work the same way, treating microcopy as a decision about what the user is worried about at that exact moment.",
      "For the image half, the prompts are structured rather than poetic. Image models respond to explicit statements of subject, composition, lens, lighting, medium and negative constraints, in roughly that order of impact. Each image prompt here is written as a template with those slots labelled, so you can hold five of them constant and vary one, which is the only reliable way to learn what a given model is actually responding to.",
    ],
    icon: "palette",
    accent: "#c084fc",
    order: 7,
  },
  {
    slug: "data-analysis-prompts",
    name: "Data Analysis",
    title: "Data Analysis Prompts",
    seoTitle: "Data Analysis Prompts: Free AI Prompts For Analysts",
    seoDescription:
      "Free data analysis prompts for ChatGPT and Claude covering SQL, spreadsheets, statistics, dashboards and reporting. Written to avoid confident wrong answers.",
    primaryKeyword: "data analysis prompts",
    keywords: [
      "data analysis prompts",
      "ai prompts for data analysis",
      "chatgpt prompts for excel",
      "sql prompts for ai",
    ],
    intro:
      "Data work is the area where a confident wrong answer costs the most, so these data analysis prompts are built defensively. Every one of them asks the model to state its assumptions and flag what it cannot verify from the data it was given.",
    body: [
      "A language model handed a table will find a pattern in it, whether or not one exists. That is the central risk in using AI for analysis and the reason a naive prompt is actively dangerous: it produces a fluent narrative about noise. The prompts here counter that directly by requiring the model to report sample size, state which comparisons are underpowered, and explicitly list the alternative explanations for any pattern it reports before it reports the pattern itself.",
      "The technical prompts, for SQL and spreadsheet formulas, are structured around schema first. Most incorrect generated SQL is not a syntax problem, it is a join that silently multiplies rows because the model guessed at cardinality it was never told. These prompts require the table shapes and key relationships as an input and instruct the model to state the expected row count of its own query, which surfaces that class of error before you run it.",
    ],
    icon: "database",
    accent: "#22d3ee",
    order: 8,
  },
  {
    slug: "productivity-prompts",
    name: "Productivity",
    title: "Productivity Prompts",
    seoTitle: "Productivity Prompts: Free AI Prompts To Get Work Done",
    seoDescription:
      "Free productivity prompts for ChatGPT and Claude covering inbox triage, note taking, prioritisation, planning and meeting notes. Practical and copy ready.",
    primaryKeyword: "productivity prompts",
    keywords: [
      "productivity prompts",
      "ai prompts for productivity",
      "chatgpt prompts for time management",
      "prompts for task management",
    ],
    intro:
      "These productivity prompts handle the administrative overhead that sits between you and actual work: triaging an inbox, turning a messy meeting into decisions and owners, and converting a vague week into an ordered list.",
    body: [
      "The prompts that work in this category share a trait: they produce a decision, not a summary. A prompt that summarises your inbox leaves you with a shorter inbox to process. A prompt that sorts every message into reply now, delegate, schedule or archive, and drafts the replies for the first bucket, has actually removed work. Each prompt here is judged on that standard, which is why several of them insist on a fixed output format you can act down.",
      "Prioritisation gets special handling because it is where models are most tempted to be agreeable. Asked to prioritise a task list, a model will find a reason to keep everything and hand back the same list reordered. The prompts here force scarcity explicitly by capping how many items may be ranked as important and requiring an explicit justification for every task the model recommends dropping, which is the only version of the exercise that helps.",
    ],
    icon: "bolt",
    accent: "#4f9cff",
    order: 9,
  },
  {
    slug: "career-prompts",
    name: "Career",
    title: "Career Prompts",
    seoTitle: "Career Prompts: Free AI Prompts For Job Seekers",
    seoDescription:
      "Free career prompts for ChatGPT and Claude covering resumes, cover letters, interview prep, salary negotiation and performance reviews. Honest and tested.",
    primaryKeyword: "career prompts",
    keywords: [
      "career prompts",
      "ai prompts for job seekers",
      "chatgpt prompts for resume",
      "interview preparation prompts",
    ],
    intro:
      "These career prompts cover the documents and conversations that decide outcomes: resumes screened in six seconds, cover letters nobody wants to write, interview answers that need evidence, and salary conversations that need a number and a reason.",
    body: [
      "The resume prompts are built around a specific failure. Asked to improve a resume, a model inflates it, swapping plain verbs for grand ones and adding adjectives that a recruiter reads as noise. The prompts here do the opposite: they require every bullet to carry a number or a named outcome, and they instruct the model to delete any line it cannot attach evidence to rather than dress it up. That produces a shorter, better document.",
      "Interview and negotiation prompts are written as rehearsal rather than scripting. A generated answer delivered from memory sounds generated. A prompt that puts the model in the role of a sceptical hiring manager, has it ask a follow up to whatever you just claimed, and then tells you which part of your answer was unsupported, prepares you for the actual conversation. The negotiation prompts likewise focus on assembling your evidence and your walk away position rather than on producing a script to read aloud.",
    ],
    icon: "compass",
    accent: "#f59e0b",
    order: 10,
  },
];

export const categoryBySlug = new Map<CategorySlug, Category>(
  categories.map((category) => [category.slug, category]),
);

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug as CategorySlug);
}

export const categorySlugs = categories.map((category) => category.slug);

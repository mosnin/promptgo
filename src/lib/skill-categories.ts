import type { SkillCategory, SkillCategorySlug } from "./skill-types";

/**
 * Ten skill categories, the same job function taxonomy as the prompt
 * categories in `categories.ts`, because a skill and a prompt answer the
 * same question ("what do I need for marketing work") at a different depth:
 * a prompt is one piece of text filled in and copied, a skill is a
 * downloadable, often multi file instruction pack meant to be handed to an
 * AI assistant or agent and reused across many tasks.
 */
export const skillCategories: SkillCategory[] = [
  {
    slug: "marketing-skills",
    name: "Marketing",
    title: "Marketing AI Skills",
    seoTitle: "Marketing AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free marketing AI skills you can preview in the browser and download as a zip, covering campaign planning, brand voice and channel specific playbooks.",
    primaryKeyword: "marketing ai skills",
    keywords: ["marketing ai skills", "free ai skills for marketing", "downloadable marketing skill packs", "ai marketing playbook download"],
    intro:
      "Reusable instruction packs for recurring marketing work, built to be handed to an AI assistant once and reused across every campaign afterward, rather than rewritten from scratch each time.",
    body: [
      "A prompt on this site answers one request. A skill is built for the work that repeats: the same brand voice check, the same campaign brief structure, the same channel specific checklist, run again every week with different inputs. Packaging that as a downloadable instruction set means the standard travels with the file, not with whoever happened to write the prompt last time.",
      "Every skill here is plain text: a main instructions file and, where the task genuinely needs it, supporting reference material the instructions point to. Nothing is hidden in a binary format, and nothing calls out to a server, so what is previewed on the page is exactly what downloads.",
    ],
    icon: "megaphone",
    accent: "#ef4444",
    order: 1,
  },
  {
    slug: "writing-skills",
    name: "Writing",
    title: "Writing AI Skills",
    seoTitle: "Writing AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free writing AI skills you can preview and download as a zip, covering editing standards, style guides and structured drafting workflows.",
    primaryKeyword: "writing ai skills",
    keywords: ["writing ai skills", "free ai skills for writers", "downloadable writing skill packs", "ai editing skill download"],
    intro:
      "Instruction packs for the writing and editing standards worth applying consistently: a house style, a structural checklist, a review pass, packaged once rather than re-explained in every new chat.",
    body: [
      "Good editorial standards are specific and repeatable, which makes them a natural fit for a downloadable skill rather than a one-off prompt. A style guide or a structural checklist does not change from document to document; what changes is the document.",
      "Every skill here ships as plain text files, previewable in full before download, so what a writer or editor is actually adopting is visible up front rather than trusted blind.",
    ],
    icon: "type",
    accent: "#fbbf24",
    order: 2,
  },
  {
    slug: "coding-skills",
    name: "Coding",
    title: "Coding AI Skills",
    seoTitle: "Coding AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free coding AI skills you can preview and download as a zip, covering code review standards, testing checklists and structured debugging workflows.",
    primaryKeyword: "coding ai skills",
    keywords: ["coding ai skills", "free ai skills for developers", "downloadable coding skill packs", "ai code review skill download"],
    intro:
      "Instruction packs for engineering standards that hold across an entire codebase: review checklists, testing discipline, debugging method, packaged so the same bar applies on every pull request.",
    body: [
      "A one-off prompt answers one question about one function. A coding skill encodes a standard meant to apply everywhere: how this team reviews a diff, what a test suite has to cover before it counts as done, how a bug gets isolated before it gets fixed. That consistency is the entire value.",
      "Some of these skills bundle more than one file, for example a main checklist plus a longer reference document it points to for edge cases, exactly the shape a real internal engineering standard actually takes.",
    ],
    icon: "code",
    accent: "#34d399",
    order: 3,
  },
  {
    slug: "business-skills",
    name: "Business",
    title: "Business AI Skills",
    seoTitle: "Business AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free business AI skills you can preview and download as a zip, covering document review, decision frameworks and structured planning workflows.",
    primaryKeyword: "business ai skills",
    keywords: ["business ai skills", "free ai skills for business", "downloadable business skill packs", "ai business framework download"],
    intro:
      "Instruction packs for recurring business judgment calls: reviewing a document against a standard, running a decision through a consistent framework, structuring a plan the same way every time.",
    body: [
      "Business work is full of decisions that should be evaluated the same way every time they come up, and rarely are, because the standard lives in someone's head rather than somewhere reusable. A skill fixes that by writing the standard down once, in enough detail that an AI assistant can apply it consistently.",
      "None of these skills assert a specific market benchmark, growth rate or industry figure as fact, since a real one varies by year and sector in a way a hard coded number would get quietly wrong. Every skill takes the actual figures as input instead.",
    ],
    icon: "briefcase",
    accent: "#a78bfa",
    order: 4,
  },
  {
    slug: "sales-skills",
    name: "Sales",
    title: "Sales AI Skills",
    seoTitle: "Sales AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free sales AI skills you can preview and download as a zip, covering call review, proposal structure and objection response workflows.",
    primaryKeyword: "sales ai skills",
    keywords: ["sales ai skills", "free ai skills for sales", "downloadable sales skill packs", "ai sales workflow download"],
    intro:
      "Instruction packs for the sales motions that repeat every deal: reviewing a call, structuring a proposal, responding to an objection, packaged so the standard is consistent from rep to rep.",
    body: [
      "A sales team's actual advantage is rarely a single clever line, it is consistency: every proposal following the same structure, every objection handled against the same real material rather than improvised claims. A skill is the way to make that consistency portable.",
      "Every skill here is honest about what it can and cannot verify. None of them invent a customer result, a guarantee or a statistic on your behalf, and the instructions say so explicitly.",
    ],
    icon: "handshake",
    accent: "#38bdf8",
    order: 5,
  },
  {
    slug: "education-skills",
    name: "Education",
    title: "Education AI Skills",
    seoTitle: "Education AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free education AI skills you can preview and download as a zip, covering lesson structure, assessment design and feedback workflows.",
    primaryKeyword: "education ai skills",
    keywords: ["education ai skills", "free ai skills for teachers", "downloadable education skill packs", "ai lesson planning skill download"],
    intro:
      "Instruction packs for the parts of teaching that benefit from a consistent method every time: mapping activities to an objective, structuring an assessment, giving feedback against a stated standard.",
    body: [
      "Good teaching practice is method as much as content: a lesson tied to a stated objective, an assessment that actually measures what it claims to, feedback anchored to a real standard rather than a gut feeling. A skill packages that method so it applies the same way to a new topic every time.",
      "Every skill here is built for a specific instructional job, not a vague ambition to be helpful in a classroom, which is what makes the download worth having.",
    ],
    icon: "graduation",
    accent: "#f472b6",
    order: 6,
  },
  {
    slug: "design-skills",
    name: "Design",
    title: "Design AI Skills",
    seoTitle: "Design AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free design AI skills you can preview and download as a zip, covering accessibility review, design system checks and critique workflows.",
    primaryKeyword: "design ai skills",
    keywords: ["design ai skills", "free ai skills for designers", "downloadable design skill packs", "ai design review skill download"],
    intro:
      "Instruction packs for design review work that should be checked against a real, named standard every time: accessibility criteria, a design system's own rules, a structured critique format.",
    body: [
      "A design review is only as useful as the standard it's measured against. These skills bake in a specific, checkable standard (a named WCAG criterion, a documented design system rule) rather than a vague sense of what looks right, so the same review holds up the same way twice.",
      "Every skill here ships as plain text, reviewable in full in the browser before download, so the actual standard being applied is never a black box.",
    ],
    icon: "palette",
    accent: "#c084fc",
    order: 7,
  },
  {
    slug: "data-analysis-skills",
    name: "Data Analysis",
    title: "Data Analysis AI Skills",
    seoTitle: "Data Analysis AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free data analysis AI skills you can preview and download as a zip, covering data cleaning standards, statistical checks and report structure.",
    primaryKeyword: "data analysis ai skills",
    keywords: ["data analysis ai skills", "free ai skills for analysts", "downloadable data analysis skill packs", "ai data cleaning skill download"],
    intro:
      "Instruction packs for the checks a real analysis needs every time: a data cleaning standard, a statistical sanity check, a report structure that states its own assumptions.",
    body: [
      "The most common failure in an AI assisted analysis is confidence without a check: a summary stated as fact when the underlying data was never actually validated. These skills build the check into the instructions, so an assumption gets stated and a limitation gets flagged instead of quietly skipped.",
      "None of these skills assert a specific statistical threshold as universally correct without stating where it comes from and when it does not apply, since that kind of unqualified claim is exactly the failure mode a data analysis skill should prevent, not repeat.",
    ],
    icon: "database",
    accent: "#22d3ee",
    order: 8,
  },
  {
    slug: "productivity-skills",
    name: "Productivity",
    title: "Productivity AI Skills",
    seoTitle: "Productivity AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free productivity AI skills you can preview and download as a zip, covering meeting structure, planning workflows and review checklists.",
    primaryKeyword: "productivity ai skills",
    keywords: ["productivity ai skills", "free ai skills for productivity", "downloadable productivity skill packs", "ai planning skill download"],
    intro:
      "Instruction packs for the recurring planning and review work that eats a week: structuring a meeting, running a planning pass, checking a plan against its own constraints.",
    body: [
      "Productivity work is mostly the same handful of structures applied over and over: an agenda with a real owner and outcome per item, a plan whose steps add up to the actual time available. A skill makes that structure reusable instead of reinvented every Monday.",
      "Every skill here states its method plainly rather than promising a specific hours-saved figure, since that number depends entirely on how it's used and would be a fabricated claim if asserted as fact.",
    ],
    icon: "bolt",
    accent: "#4f9cff",
    order: 9,
  },
  {
    slug: "career-skills",
    name: "Career",
    title: "Career AI Skills",
    seoTitle: "Career AI Skills: Free Downloadable Instruction Packs",
    seoDescription:
      "Free career AI skills you can preview and download as a zip, covering resume review, interview preparation and negotiation checklists.",
    primaryKeyword: "career ai skills",
    keywords: ["career ai skills", "free ai skills for job seekers", "downloadable career skill packs", "ai interview prep skill download"],
    intro:
      "Instruction packs for the recurring moments in a career that benefit from a consistent, honest method: reviewing a resume against a real standard, preparing for an interview, structuring a negotiation.",
    body: [
      "A career decision rarely benefits from generic encouragement, it benefits from a specific, honest method applied consistently: what actually makes a resume bullet checkable, what a negotiation actually needs prepared in advance. These skills package that method rather than a pep talk.",
      "None of these skills invent a market salary figure or a hiring statistic as fact, since real ones vary by role, region and year in a way a hard coded number would get wrong. Every skill takes the real figures as input.",
    ],
    icon: "compass",
    accent: "#f59e0b",
    order: 10,
  },
];

export const skillCategoryBySlug = new Map<SkillCategorySlug, SkillCategory>(
  skillCategories.map((category) => [category.slug, category]),
);

export function getSkillCategory(slug: string): SkillCategory | undefined {
  return skillCategoryBySlug.get(slug as SkillCategorySlug);
}

export const skillCategorySlugs = skillCategories.map((category) => category.slug);

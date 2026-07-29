import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "linkedin-profile-prompt",
  name: "Profile Rebuild",
  title: "LinkedIn Profile Prompt",
  category: "career-prompts",
  taskType: "rewrite",
  summary:
    "Splits the page into a search surface that must carry literal query terms and a read surface written in six first person sentences.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["linkedin", "profile", "job search", "recruiting"],

  seo: {
    primaryKeyword: "linkedin profile prompt",
    keywords: [
      "linkedin profile prompt",
      "how to write a linkedin headline that gets found",
      "ai prompt for a linkedin about section",
      "linkedin profile keywords recruiters search",
      "rewriting a linkedin profile after a layoff",
      "linkedin summary that is not a resume copy",
    ],
    seoTitle: "LinkedIn Profile Prompt: Get Found, Then Get Read",
    seoDescription:
      "A LinkedIn profile prompt that puts the literal terms recruiters search into your headline and skills, then writes an about section in six first person sentences.",
  },

  prompt: {
    text: `You are rebuilding my LinkedIn profile. Treat the page as two documents that happen to share a URL. The search surface, meaning headline, current title, past titles and skills, is matched against queries typed by recruiters. The read surface, meaning the about section, is read by a person who already clicked.

ROLES I WANT NEXT: {{TARGET_ROLES}}
LANGUAGE FROM FIVE ADVERTISEMENTS I WOULD ACCEPT: {{AD_LANGUAGE}}
MY MATERIAL, INCLUDING FIGURES, TOOLS, DATES AND TITLES AS THEY OFFICIALLY WERE: {{MY_MATERIAL}}
MY PROFILE AS IT READS TODAY: {{CURRENT_PROFILE}}
HOW VISIBLE I CAN BE, GIVEN MY CURRENT EMPLOYER: {{VISIBILITY}}

Step one. Extract from the advertisement language every literal term a recruiter would type: exact job titles, tool and platform names, certifications, domain words, location. Ignore adjectives. For each term, tell me whether it currently appears verbatim in my search surface. A synonym counts as absent.

Step two. Rewrite the headline as role, domain, and one distinguishing specific. Never state a level above the title in my material. Front load the words most likely to be queried, because the headline is truncated in result lists.

Step three. Write the about section in the first person, six sentences maximum, opening with a fact rather than a description of my character. Banned throughout: visionary, passionate, results driven, thought leader, seasoned, dynamic, proven track record.

Step four. List terms from the advertisements I cannot honestly claim. These are gaps to close, not words to add. Do not put them on the profile.

Respect my visibility constraint in everything you suggest.`,
    variables: [
      {
        token: "TARGET_ROLES",
        label: "Roles you want next",
        example: "Senior site reliability engineer or platform engineer, mid sized product companies, Manchester or remote UK",
      },
      {
        token: "AD_LANGUAGE",
        label: "Language lifted from five advertisements",
        example:
          "Kubernetes, Terraform, on call rotation, SLO, incident response, AWS, observability, Prometheus, platform engineering, infrastructure as code",
      },
      {
        token: "MY_MATERIAL",
        label: "Your material, with official titles",
        example:
          "Official title DevOps Engineer, not SRE. Six years. Run Terraform for 40 services, cut page volume from 90 to 34 a month, migrated two clusters to EKS. No Prometheus, we use Datadog.",
      },
      {
        token: "CURRENT_PROFILE",
        label: "Your profile as it reads today",
        example:
          "Headline: Passionate technologist helping teams build better systems. About section is three paragraphs in the third person written in 2021.",
      },
      {
        token: "VISIBILITY",
        label: "How visible you can be right now",
        example: "Still employed, manager is on LinkedIn, so no open to work banner and no obvious rewrite of the current role",
      },
    ],
    expectedOutput:
      "A term by term audit showing which searched words are missing from your search surface, a plain headline that front loads them, a six sentence first person about section, and a separate list of claims you cannot honestly make yet.",
    followUps: [
      "Rewrite the headline for the discreet version, where it must not look like I am job hunting.",
      "My Datadog experience keeps failing searches asking for Prometheus. What is the honest way to describe transferable observability work?",
      "Turn the gap list into a three month plan with one item I could evidence publicly.",
    ],
    pitfalls: [
      "Feeding it your resume instead of advertisement language produces a profile optimised for the job you already have.",
      "People accept a headline that reads a level up because it sounds better. It generates calls about roles you will not get past the second interview for.",
      "The gap list gets treated as a keyword list and pasted into the skills section. Every model will let you do this and every reference check will find it.",
    ],
  },

  eeat: {
    author: "Deborah Achebe",
    authorCredential:
      "Eleven years in technical recruiting, four of them screening applications for engineering and operations roles.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Running this on my own profile, the term audit found that the single job title I most wanted to be found for appeared nowhere on the page, while three tool names I had not touched in four years were in the skills list. Claude Opus 4.5 handled the synonym rule well. GPT-5.2 kept counting near matches as present until I spelled out that a boolean search does not resolve synonyms.",
  },

  article: {
    intro: [
      "A LinkedIn profile prompt that rewrites your page into confident marketing copy has misunderstood what the page is for. A large part of it is never read by a person at all. It is queried, by recruiters typing job titles and tool names into a search box, and prose does not match a query.",
      "This one treats the profile as two documents sharing a URL. The search surface has to contain the literal words people type. The read surface has to say something your resume cannot, in the first person, in about six sentences.",
      "It also declines to inflate your title, since a headline claiming a level you have not held produces conversations you then have to disappoint.",
    ],

    sections: [
      {
        heading: "Two documents sharing one URL",
        body: [
          "The usual mistake is writing the entire page in one register. A polished narrative buries the terms a search needs, and a page stuffed with terms reads as though nobody lives there. Both fail, in opposite directions, and the fix is deciding which part of the page is doing which job.",
        ],
        subsections: [
          {
            heading: "The search surface",
            body: [
              "Headline, current title, previous titles and the skills list are what get matched. LinkedIn profile keywords recruiters search are duller than people expect: an exact job title, two or three tool names, a certification, sometimes a city. Nobody has ever run a search for strategic leader.",
              "The prompt pulls those terms out of advertisements you would genuinely accept, then checks whether each appears literally on your page. A synonym is counted as absent, because a boolean search does not know it is a synonym and will not do you the favour.",
            ],
          },
          {
            heading: "The read surface",
            body: [
              "A LinkedIn summary that is not a resume copy earns its place by doing what the resume cannot: first person, one honest line about why you work on this, and the two or three things you are actually known for. Six sentences is usually enough and eleven is always too many.",
              "An ai prompt for a LinkedIn about section normally returns quiet self congratulation written in the third person. This one bans the third person and requires the opening line to state a fact rather than describe a character trait.",
            ],
          },
        ],
      },
      {
        heading: "The headline is doing three jobs at once",
        body: [
          "Working out how to write a LinkedIn headline that gets found means noticing everything the line has to do. It is a search field. It is the text shown beside every comment you leave anywhere on the platform. It is the only thing a recruiter reads about you in a list of forty results.",
          "That argues for plain construction: role, domain, one distinguishing specific. Payments engineer, card acquiring and PSD2, previously at a challenger bank. It is unglamorous, and it matches queries, works beside a comment, and tells a scanner what you are in about two seconds.",
          "Slogan headlines fail all three jobs simultaneously. Helping teams do their best work matches no query, says nothing next to a comment, and is indistinguishable from the eleven results above it.",
        ],
      },
      {
        heading: "Using the LinkedIn profile prompt after a layoff",
        body: [
          "Rewriting a LinkedIn profile after a layoff is largely a question of tense and of what you leave alone. Keep the role, keep the dates, move the achievements into past tense, and change nothing else about how the job is described. A suddenly shortened entry looks like concealment.",
          "The prompt adds no explanation of why the role ended, because the profile is not where that belongs and a recruiter who reads a redundancy into a date is usually correct and usually untroubled by it. Whether to switch on the open to work signal is a judgement about your current employer rather than about the market, so the prompt asks instead of assuming.",
        ],
      },
      {
        heading: "Words that match nothing",
        body: [
          "Visionary, passionate, results driven, thought leader and seasoned professional are neither searched for nor read. They occupy the most valuable space on the page while contributing to neither of its two jobs.",
          "The prompt removes them and asks, for each one, what you were trying to say. Results driven almost always turns out to mean one specific result, and once that result is written down the adjective has nothing left to do.",
        ],
      },
      {
        heading: "What it will not claim for you",
        body: [
          "It will not upgrade a title. It will not say you led a team you supported. It will not add a skill missing from your material just because the advertisements keep mentioning it, and instead files those as gaps to close.",
          "That restraint matters more here than on a resume. A profile is public, durable, and read by the people who actually worked with you, which makes it the worst possible place to round anything up.",
        ],
      },
    ],

    howTo: {
      name: "How to use the LinkedIn profile prompt",
      steps: [
        {
          name: "Collect five advertisements you would accept",
          text: "Not roles you admire. Roles you would take. The vocabulary of jobs you would decline pulls the whole page in the wrong direction.",
        },
        {
          name: "Pull out the literal terms",
          text: "Titles, tools, certifications, domain words, location. Discard every adjective, because none of them is ever typed into a search field.",
        },
        {
          name: "Fix the search surface before the prose",
          text: "Headline, titles and skills first. The about section cannot rescue a page that never appears in the results list.",
        },
        {
          name: "Write the about section last",
          text: "By that point you know what you are claiming, so six first person sentences is genuinely enough to say it.",
        },
      ],
    },

    faq: [
      {
        question: "How long should the about section be?",
        answer:
          "Six sentences or fewer. Only the first two lines show before the reader has to expand it, so anything after that is optional reading, and treating it as optional is a better discipline than hoping for a patient audience.",
      },
      {
        question: "Do recruiters genuinely search by keyword?",
        answer:
          "Constantly, and with narrower queries than candidates imagine. A typical search is a job title, one or two tools and a location, run against filters. Missing the exact title you want removes you from the list before anyone forms an opinion.",
      },
      {
        question: "Should I turn on the open to work banner?",
        answer:
          "It depends on whether your current employer would mind, not on whether it works. It does raise inbound volume, and much of that volume is poorly targeted, so the discreet recruiter only setting is often the better trade while you are still employed.",
      },
      {
        question: "Can a LinkedIn profile prompt help if I am not job hunting?",
        answer:
          "Yes, and the term audit is the useful half. Being findable for the work you want to be offered matters even when you are settled, because the interesting approaches tend to arrive during the years you were not looking for them.",
      },
      {
        question: "Does the skills list still matter?",
        answer:
          "It is part of the search surface, so it matters mechanically rather than persuasively. Keep it short, current and honest, and remove anything you would not want to be asked about in a first call, because a stale entry attracts exactly the wrong conversation.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description:
          "Run the evidence classification first, then reuse only the lines that survived it in your profile.",
      },
      {
        href: "/career-prompts/career-change-prompt",
        label: "career change prompt",
        description:
          "When the terms you want to be searched for are not yet true of you, the gap list becomes a plan rather than a rewrite.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description:
          "The headline construction here borrows the same test: could anyone else in the results list say this sentence?",
      },
    ],

    externalLinks: [
      {
        href: "https://www.linkedin.com/help/linkedin",
        label: "LinkedIn Help Centre",
        description:
          "Primary documentation for how profile fields, search visibility and the open to work setting actually behave.",
      },
      {
        href: "https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/",
        label: "Nielsen Norman Group: First two words as a scanning signal",
        description:
          "The research behind front loading a headline, since result lists truncate and readers fixate on the opening words.",
      },
      {
        href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        label: "Google Search Central: SEO starter guide",
        description:
          "Explains literal term matching in retrieval, which is why a synonym on your page does not satisfy a recruiter's query.",
      },
    ],
  },
};

export default meta;

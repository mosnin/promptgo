import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "working-days-calculator",
  name: "Working Days Calculator",
  title: "Working Days Calculator",
  category: "productivity-time-tools",
  summary:
    "Counts the working days between two dates, excluding weekends and any holidays you list, with a breakdown of what got excluded and why.",

  seo: {
    primaryKeyword: "working days calculator",
    keywords: [
      "working days calculator",
      "free working days calculator",
      "business days between two dates calculator",
      "how to calculate working days",
      "how to count business days excluding weekends",
      "how many working days are in a date range",
    ],
    seoTitle: "Working Days Calculator: Business Days Between Two Dates",
    seoDescription:
      "A free working days calculator that counts business days between two dates, excluding weekends and any holidays you list, with a full breakdown.",
  },

  fields: [
    {
      kind: "date",
      token: "startDate",
      label: "Start date",
      help: "The first day of the range. Counted as a working day if it falls on a weekday and is not listed as a holiday.",
      example: "2026-08-03",
    },
    {
      kind: "date",
      token: "endDate",
      label: "End date",
      help: "The last day of the range, included in the count on the same terms as the start date.",
      example: "2026-08-14",
    },
    {
      kind: "textarea",
      token: "holidays",
      label: "Holidays to exclude",
      placeholder: "2026-08-05\n2026-08-06",
      example: "",
      help: "One date per line, YYYY-MM-DD, excluded from the count.",
      rows: 4,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["UTC calendar date iteration, no timezone-dependent Date parsing"],
    testingNote:
      "Verified against hand checked calendar ranges including a single Monday to Friday week, a range spanning exactly one weekend, a range where an entered holiday lands on an otherwise working weekday, a holiday that lands on a weekend and is correctly counted once as a weekend day rather than double excluded, an end date entered before the start date rejected as an error, and single day ranges on both a weekday and a weekend.",
  },

  article: {
    intro: [
      "A working days calculator answers a narrower question than a plain date difference: not how many days sit between two dates, but how many of those are actually working days once weekends and any holidays are taken out. Enter a start date and an end date and this free working days calculator counts every calendar day in the range, then removes Saturdays, Sundays and any date entered as a holiday, leaving the number a delivery estimate or a notice period actually needs.",
      "A lot of planning gets stated casually in calendar days when it really means working days: a ten business day refund window, a two week hiring process that really means ten working days once the weekend in the middle is set aside. Counting by hand starts producing off by one errors the moment a range crosses more than one weekend or a holiday nobody remembered to subtract.",
      "This tool takes a start date, an end date, and an optional list of holiday dates, and returns the working day total alongside a breakdown of calendar days, weekend days and holiday days, so the number can be checked rather than trusted on faith.",
    ],

    sections: [
      {
        heading: "How a business days between two dates calculator classifies each day",
        body: [
          "The calculation walks the range one calendar day at a time and sorts each day into exactly one of three buckets: a working day, a weekend day, or a holiday. Every day lands in one bucket only, which is what makes the three secondary figures add back up to the total calendar day count.",
          "Saturday and Sunday are checked first. A day that falls on either one is counted as a weekend day immediately, even if it also appears in the holidays list, because a Saturday was never a working day the holiday needed to remove. Only a day that survives that check is tested against the holiday list.",
        ],
      },
      {
        heading: "How to calculate working days by hand, and where it goes wrong",
        body: [
          "How to calculate working days without a tool: count the total days in the range, subtract two for every full weekend crossed, then subtract one more for every holiday that lands on a day that was not already a weekend. That third step is the one that gets skipped under time pressure.",
          "The other common mistake is an off by one error at either end of the range: forgetting the end date is normally meant to be included, or not counting the start date as day one. Both errors are silent, handing back a number that is one or two days short.",
        ],
      },
      {
        heading: "What counts as a weekend, and why Saturday and Sunday are the default",
        body: [
          "This calculator treats Saturday and Sunday as the weekend, matching the standard working week across most of North America, Europe and much of the Asia-Pacific region. It is not universal: several countries in the Middle East and parts of South Asia run a working week that excludes Friday instead.",
          "For a range that needs a different weekend definition, the holidays field absorbs the difference: any date that should not count as a working day can be added to the list regardless of which day of the week it falls on.",
        ],
      },
      {
        heading: "Why holidays have to be entered explicitly rather than assumed",
        body: [
          "Public holidays are not the same set of dates everywhere, and most do not repeat on the same calendar date every year: a fixed date holiday moves to a different weekday annually, and one tied to a lunar calendar moves by weeks. A built in holiday list would be quietly wrong for a region it was not written for.",
          "Instead, the holidays field takes whatever dates are relevant to the range being checked, one per line in YYYY-MM-DD format. Blank lines are ignored and surrounding whitespace on each line is trimmed automatically.",
        ],
      },
      {
        heading: "How many working days are in a date range, and why both ends count",
        body: [
          "How many working days are in a date range depends on where the range starts and ends relative to the weekend, not just its total length. A five day range starting on a Monday returns a different working day count than one starting on a Thursday, since the second absorbs a weekend in the middle.",
          "Both the start date and the end date are included in the count when they qualify as working days, matching how a notice period is normally read: day one is the start date itself, not the day after it.",
        ],
      },
      {
        heading: "How to count business days excluding weekends and holidays separately",
        body: [
          "The headline figure is the working day count, but the three secondary figures underneath it are what make that number checkable: a total calendar day count, a weekend day count and a holiday day count, kept separate rather than folded into one adjustment.",
          "Those three secondary numbers always add up to the total calendar days in the range, which doubles as a sanity check: if the weekend count looks too low for a range that visibly crosses two weekends, the input is worth a second look before the working day figure is used for anything.",
        ],
      },
    ],

    howTo: {
      name: "How to use the working days calculator",
      steps: [
        {
          name: "Enter the start date",
          text: "The first day of the range. It counts toward the total if it falls on a weekday and is not also listed as a holiday.",
        },
        {
          name: "Enter the end date",
          text: "The last day of the range, included in the count on the same terms as the start date. It has to be on or after the start date.",
        },
        {
          name: "List any holidays to exclude",
          text: "One date per line, in YYYY-MM-DD format. Leave the field empty if the range has no holidays to subtract.",
        },
        {
          name: "Read the working days total",
          text: "The headline figure is the working day count. The three lines underneath show total calendar days, weekend days excluded and holiday days excluded.",
        },
        {
          name: "Re-run it for a different range or holiday list to compare",
          text: "Change the dates or the holiday list and compare the new total against the previous one, especially near a range that starts or ends close to a weekend.",
        },
      ],
    },

    faq: [
      {
        question: "Does the working days calculator count the start date and the end date?",
        answer:
          "Yes, both are included in the count when they qualify as working days, matching how a notice period or a delivery window is normally read. A Monday to Friday range counts as five working days, not four, because the start date is treated as the first day of the range rather than a day before counting begins.",
      },
      {
        question: "What happens if I enter an end date before the start date?",
        answer:
          "The calculator returns an explicit error instead of a number, since a range that runs backward has no defined working day count. Swap the two dates so the start date comes first, or double check which field a date was typed into if the error appears unexpectedly.",
      },
      {
        question: "Can I exclude more than one holiday at a time?",
        answer:
          "Yes. The holidays field accepts one date per line, in YYYY-MM-DD format, and every valid date listed is checked against the range and excluded if it falls on a day that is not already a weekend. There is no limit on how many can be entered.",
      },
      {
        question: "What happens if a holiday I enter falls on a Saturday or Sunday?",
        answer:
          "It is counted once, as a weekend day, not counted a second time as a holiday. Since that date was never going to count as a working day anyway, entering it does not change the total; it simply gets absorbed into the weekend count instead of the holiday count.",
      },
      {
        question: "Does the calculator account for time zones?",
        answer:
          "No, and it does not need to. Dates are parsed as calendar dates rather than moments in time, and every day of week check runs against the parsed year, month and day directly, so the same two dates return the same count regardless of where the calculator is used.",
      },
      {
        question: "Is Saturday and Sunday always treated as the weekend?",
        answer:
          "By default, yes, since that matches the working week in most regions this tool is used from. A range that follows a different working week, such as one that excludes Friday instead of Sunday, can still be handled correctly by adding the non-standard days to the holidays list instead.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description: "For turning a working day total into an actual weekly schedule once the range is known.",
      },
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description: "For deciding what fits inside a working day count once it stops looking generous.",
      },
      {
        href: "/productivity-prompts/time-audit-prompt",
        label: "time audit prompt",
        description: "For checking whether the working days available are actually being spent on the work they were counted for.",
      },
      {
        href: "/productivity-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description: "For reporting progress against a deadline once the working days remaining are known exactly.",
      },
    ],

    externalLinks: [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC",
        label: "MDN: Date.UTC()",
        description: "Reference for the UTC date construction this calculator uses to avoid timezone-dependent day of week checks.",
      },
      {
        href: "https://www.iso.org/iso-8601-date-and-time-format.html",
        label: "ISO: ISO 8601 date and time format",
        description: "The YYYY-MM-DD date format this tool's holiday list and date fields are built around.",
      },
      {
        href: "https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/",
        label: "US Office of Personnel Management: Federal Holidays",
        description: "A primary source for one region's holiday dates to paste into the holidays field.",
      },
      {
        href: "https://www.gov.uk/bank-holidays",
        label: "GOV.UK: UK bank holidays",
        description: "A primary source for another region's holiday dates, illustrating why holidays are a manual input rather than a built-in assumption.",
      },
    ],
  },

  tags: ["working days", "business days", "date calculator", "scheduling"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

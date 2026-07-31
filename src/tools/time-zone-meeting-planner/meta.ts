import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "time-zone-meeting-planner",
  name: "Time Zone Meeting Planner",
  title: "Time Zone Meeting Planner",
  category: "productivity-time-tools",
  summary:
    "Converts one meeting hour in a base location into every attendee's local time using raw UTC offsets, and flags whether the meeting lands on the same day, the day before, or the day after for each of them.",

  seo: {
    primaryKeyword: "time zone meeting planner",
    keywords: [
      "time zone meeting planner",
      "free time zone meeting planner",
      "how to schedule a meeting across time zones",
      "meeting time converter by utc offset",
      "utc offset meeting time calculator",
      "best way to plan a meeting across time zones",
    ],
    seoTitle: "Time Zone Meeting Planner: Convert by UTC Offset",
    seoDescription:
      "A free time zone meeting planner that converts one meeting hour into every attendee's local time using raw UTC offsets, and flags a next day or previous day meeting.",
  },

  fields: [
    {
      kind: "number",
      token: "meetingHour",
      label: "Meeting time (hour, 24h)",
      help: "The hour of day for the meeting in the base location's local time",
      example: 9,
      min: 0,
      max: 23,
      step: 1,
    },
    {
      kind: "number",
      token: "baseUtcOffset",
      label: "Base location's current UTC offset",
      help: "e.g. -5 for US Eastern during standard time, +1 for Central Europe during standard time",
      example: -5,
      min: -12,
      max: 14,
      step: 0.25,
    },
    {
      kind: "list",
      token: "attendeeOffsets",
      label: "Attendees to convert the meeting time for",
      itemLabel: "attendee",
      min: 1,
      max: 10,
      fields: [
        {
          kind: "text",
          token: "label",
          label: "Attendee or city name",
          help: "A name for this row. Shown as-is in the results table.",
          placeholder: "Tokyo team",
          example: "Tokyo team",
        },
        {
          kind: "number",
          token: "utcOffset",
          label: "Their CURRENT UTC offset",
          help: "Enter the offset this location is actually on right now, for example +9 or +5.5, not a city name or a fixed year-round value. If the location observes daylight saving, use the offset it is currently in, not its winter or summer default.",
          example: 9,
          min: -12,
          max: 14,
          step: 0.25,
        },
      ],
      example: [
        { label: "Tokyo team", utcOffset: 9 },
        { label: "London office", utcOffset: 1 },
      ],
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Modular arithmetic for 24 hour clock wraparound"],
    testingNote:
      "Verified against hand worked cases including a same day conversion, a conversion that rolls forward into the next calendar day, a conversion that rolls back into the previous calendar day, an extreme offset pair at the outer edge of the -12 to +14 range, a fractional half hour offset, and a batch of two attendees converted independently in one pass. The day shift is checked against the unwrapped hour total before the 24 hour wrap is applied, since the wrapped value alone cannot distinguish a same day meeting from a next day one at the same clock time.",
  },

  article: {
    intro: [
      "A time zone meeting planner has one narrow job: take a meeting hour stated in one location's local time and work out what that same moment reads as on every attendee's own clock, including whether it falls on a different calendar day for any of them. Enter the meeting hour on a 24 hour clock, the base location's current UTC offset, and a row for each attendee with their current UTC offset, and this tool converts the meeting into every attendee's local time and flags same day, next day or previous day for each one.",
      "This is a free time zone meeting planner built on UTC offsets, the plain numbers describing how far ahead of or behind UTC a location is right now, rather than a built in list of city or time zone names. That is a deliberate choice, explained below.",
      "The output is a table, one row per attendee, showing the converted local time and a day shift note, since a meeting scheduled late at night in one location can land on breakfast time the next calendar date somewhere else.",
    ],

    sections: [
      {
        heading: "How the time zone meeting planner converts one hour into many",
        body: [
          "The conversion is one offset subtraction followed by a wrap into a 24 hour clock. The difference between an attendee's UTC offset and the base location's UTC offset is added to the meeting hour, giving a raw hour total that can run below 0 or past 23. That raw total is folded back into a 0 to 23 clock hour with modular arithmetic, the same thing a clock face does every time the hour hand passes midnight.",
          "Reading the raw total before it gets folded is what lets the tool report a next day or previous day meeting correctly. A raw hour of 27 and a raw hour of 3 both display as 3 something once wrapped, but only one happens a calendar day later, and the raw value is the only place that fact still exists.",
        ],
      },
      {
        heading: "Why this free time zone meeting planner uses raw UTC offsets instead of city names",
        body: [
          "A tool that accepted a city name instead of a number would need a table mapping every city to its current offset, changing twice a year for any city with daylight saving, on dates set by national law that do not line up across countries.",
          "Hardcoding that mapping means committing to a fact that goes stale on a schedule this tool cannot track. Asking for the current offset instead sidesteps that: the number entered is simply true for that location right now.",
        ],
      },
      {
        heading: "How to schedule a meeting across time zones with a number instead of a guess",
        body: [
          "How to schedule a meeting across time zones without a shared tool usually means one person doing the arithmetic by hand, under time pressure, for every attendee separately. Entering the base hour and offset once and listing every attendee's offset runs the same arithmetic for the whole group in one pass.",
          "The one step a tool cannot do is confirm the offset itself. Checking each offset close to the meeting date, rather than trusting a number written weeks earlier, is the difference between a correct time and one that quietly drifts an hour off.",
        ],
        list: [
          "Confirm each attendee's current offset, not a remembered one, close to the meeting date",
          "Enter the base location's own current offset, not its year-round default",
          "Re-check the whole list again if the meeting is scheduled near a daylight saving change",
        ],
      },
      {
        heading: "Reading the day shift from a meeting time converter by UTC offset",
        body: [
          "Same day, next day and previous day are relative to the base location's calendar date for the meeting, not to each other. An attendee marked next day is a calendar day ahead of the base meeting date; one marked previous day is a day behind. Two attendees can land on opposite sides of that boundary for the same meeting.",
          "A time that reads as 1am somewhere is only useful once it is clear whether it falls before or after the meeting starts on the calendar, which is what the day shift column answers.",
        ],
      },
      {
        heading: "A UTC offset meeting time calculator for fractional and half hour zones",
        body: [
          "Not every location sits on a whole hour offset from UTC. India runs at plus five and a half hours, and a few regions sit at a quarter or three quarter hour offset. A UTC offset meeting time calculator that only accepted whole numbers would be unusable for those, so offsets here go to a quarter hour and the local time shows minutes rather than rounding them away.",
          "The same arithmetic handles a fractional offset with no special casing: the fraction carries through the addition and the wrap, and the clock time is read off to the nearest minute.",
        ],
      },
      {
        heading: "The best way to plan a meeting across time zones when offsets change with the season",
        body: [
          "The best way to plan a meeting across time zones is to treat every offset as something to check close to the date, not memorise once. A recurring meeting correctly scheduled in January can land an hour off by July if one side observes daylight saving and the other does not, since the gap between them shifts even though the meeting never changed.",
          "Running the same base hour and attendee list through this planner again shortly before a recurring meeting catches that drift before it costs someone an hour.",
        ],
      },
    ],

    howTo: {
      name: "How to use the time zone meeting planner",
      steps: [
        {
          name: "Enter the meeting hour",
          text: "Use the 24 hour clock hour for the meeting in the base location's own local time, for example 14 for 2pm.",
        },
        {
          name: "Enter the base location's current UTC offset",
          text: "Use the offset that location is actually on right now, already accounting for daylight saving if it observes it.",
        },
        {
          name: "Add a row for each attendee",
          text: "Give each attendee a name and their own current UTC offset, checked close to the meeting date.",
        },
        {
          name: "Read the local time and day shift for each attendee",
          text: "The table shows each attendee's local time and whether it falls on the same day, the day before, or after.",
        },
      ],
    },

    faq: [
      {
        question: "Why does this time zone meeting planner ask for a UTC offset instead of a city name?",
        answer:
          "A city name would need a lookup table mapping it to a UTC offset, changing twice a year for any city that observes daylight saving, on dates set separately by each country. A hardcoded table would be quietly wrong for half the year, so this tool asks for the current offset directly.",
      },
      {
        question: "How do I find a location's current UTC offset?",
        answer:
          "Check the current local time where that person is and compare it against UTC for the same instant. Most phones and calendar apps display a location's current offset directly, worth checking close to the meeting date rather than relying on a number noted down weeks earlier.",
      },
      {
        question: "What does it mean when an attendee is marked next day or previous day?",
        answer:
          "It means the meeting falls on a different calendar date for that attendee than for the base location. Next day means their calendar date is one day ahead of the base meeting date; previous day means one day behind, both common when a group spans a wide offset range.",
      },
      {
        question: "Can this handle a half hour or quarter hour UTC offset?",
        answer:
          "Yes. Offsets can be entered to a quarter hour of precision, covering locations such as India at plus five and a half hours. The converted local time is shown with minutes rather than rounded to the nearest whole hour, so a half hour offset attendee still gets an accurate result.",
      },
      {
        question: "Does the tool know which locations currently observe daylight saving?",
        answer:
          "No, and it is not meant to. The UTC offset entered for each attendee should already reflect whether that location is currently in daylight saving, which is why the fields ask for the current value rather than a fixed one, keeping the tool correct without a maintained rules database.",
      },
      {
        question: "Is there a limit to how many attendees I can add?",
        answer:
          "The tool accepts up to ten attendee rows in one pass, each converted independently against the same base meeting hour and offset, comfortably covering a typical cross-region meeting split across several offices.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/working-days-calculator",
        label: "working days calculator",
        description: "For counting the business days available once a recurring cross-timezone meeting is on the calendar.",
      },
      {
        href: "/productivity-prompts/meeting-agenda-prompt",
        label: "meeting agenda prompt",
        description: "For building the agenda itself once every attendee's local meeting time is confirmed.",
      },
      {
        href: "/productivity-prompts/daily-standup-prompt",
        label: "daily standup prompt",
        description: "For an async update format that survives a reader several time zones away from the meeting.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description: "For placing a converted meeting time into the rest of a week already full of fixed commitments.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.iana.org/time-zones",
        label: "IANA: Time Zone Database",
        description: "The maintained database of city-to-offset history this tool deliberately avoids embedding, since it changes on a schedule no static table can track.",
      },
      {
        href: "https://www.nist.gov/pml/time-and-frequency-division/how-utcnist-related-coordinated-universal-time-utc-international",
        label: "NIST: How UTC(NIST) relates to Coordinated Universal Time",
        description: "The federal reference explaining Coordinated Universal Time, the fixed point every offset entered here is measured from.",
      },
      {
        href: "https://www.transportation.gov/regulations/daylight-saving-time",
        label: "US DOT: Daylight Saving Time regulation",
        description: "The federal rule showing why a location's offset is not fixed year-round and why it can differ from a neighbouring state or region.",
      },
      {
        href: "https://www.w3.org/TR/NOTE-datetime",
        label: "W3C: Date and Time Formats",
        description: "The specification note defining the +hh:mm UTC offset notation this tool's offset fields are built around.",
      },
    ],
  },

  tags: ["time zone", "meeting", "scheduling", "utc offset"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;

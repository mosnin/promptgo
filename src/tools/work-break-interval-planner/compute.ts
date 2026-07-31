import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Simulates a work/break session as a fixed sequence of intervals rather than
 * a running clock. Starting from elapsed = 0, each pass adds one work
 * interval only if it fits inside the remaining session time, then adds the
 * break that follows it (a long break on the cadence set by longBreakEvery,
 * a short break otherwise) only if that break also fits. The moment either a
 * work interval or the break after it does not fit, the simulation stops
 * outright: a session that runs out of room for a full break is treated as
 * over, not as a session that skips the break and squeezes in more work.
 *
 * This produces a plan (how many work intervals fit, and where the breaks
 * land) rather than a countdown, since the tool has no clock, no timer and
 * no client side interval state, deliberately: see the article for why.
 */
export const compute: ComputeFn = (inputs) => {
  const totalSessionMinutes = Number(inputs.totalSessionMinutes);
  const workIntervalMinutes = Number(inputs.workIntervalMinutes);
  const shortBreakMinutes = Number(inputs.shortBreakMinutes);
  const longBreakEvery = Number(inputs.longBreakEvery);
  const longBreakMinutes = Number(inputs.longBreakMinutes);

  const bounds: { label: string; value: number; min: number; max: number }[] = [
    { label: "Total focus session length", value: totalSessionMinutes, min: 5, max: 720 },
    { label: "Work interval length", value: workIntervalMinutes, min: 1, max: 180 },
    { label: "Short break length", value: shortBreakMinutes, min: 0, max: 60 },
    { label: "Long break cadence", value: longBreakEvery, min: 1, max: 20 },
    { label: "Long break length", value: longBreakMinutes, min: 0, max: 120 },
  ];

  for (const { label, value, min, max } of bounds) {
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      return { kind: "error", message: `${label} must be a whole number of minutes.` };
    }
    if (value < min || value > max) {
      return { kind: "error", message: `${label} must be between ${min} and ${max} minutes.` };
    }
  }

  let elapsed = 0;
  let completedIntervals = 0;
  let totalBreakMinutes = 0;

  while (true) {
    if (elapsed + workIntervalMinutes > totalSessionMinutes) break;
    elapsed += workIntervalMinutes;
    completedIntervals += 1;

    const breakLength = completedIntervals % longBreakEvery === 0 ? longBreakMinutes : shortBreakMinutes;
    if (elapsed + breakLength <= totalSessionMinutes) {
      elapsed += breakLength;
      totalBreakMinutes += breakLength;
    } else {
      break;
    }
  }

  const leftoverMinutes = totalSessionMinutes - elapsed;
  const totalFocusMinutes = completedIntervals * workIntervalMinutes;

  if (completedIntervals === 0) {
    return {
      kind: "value",
      headline: { label: "Completed work intervals", value: "0 work intervals" },
      secondary: [
        { label: "Total focused minutes", value: "0 minutes" },
        { label: "Total break minutes", value: "0 minutes" },
        { label: "Leftover unused minutes", value: `${leftoverMinutes} minutes` },
      ],
      warning: `The total session length is shorter than one ${workIntervalMinutes} minute work interval, so no full interval fits. Shorten the work interval or lengthen the session.`,
      notes: [
        "This planner only counts a work interval once it fits inside the remaining session time in full, so a partial interval is never counted as complete.",
      ],
    };
  }

  return {
    kind: "value",
    headline: {
      label: "Completed work intervals",
      value: `${completedIntervals} work interval${completedIntervals === 1 ? "" : "s"}`,
    },
    secondary: [
      { label: "Total focused minutes", value: `${totalFocusMinutes} minutes` },
      { label: "Total break minutes", value: `${totalBreakMinutes} minutes` },
      { label: "Leftover unused minutes", value: `${leftoverMinutes} minutes` },
    ],
    notes: [
      `A ${longBreakMinutes} minute long break is scheduled after every ${longBreakEvery} work interval${longBreakEvery === 1 ? "" : "s"}; every other work interval is followed by a ${shortBreakMinutes} minute short break.`,
      "This is a session plan to follow with your own clock or timer app, not a running countdown: the tool works out the whole schedule in advance in one pass rather than ticking down in real time.",
      leftoverMinutes > 0
        ? `${leftoverMinutes} minute${leftoverMinutes === 1 ? "" : "s"} is left over at the end because it was not enough time for another full work interval, or not enough for the break that would have followed one.`
        : "The session divides evenly: the plan ends exactly at the total session length with no unused minutes.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "divides evenly with every break, including the final long break, landing inside the session",
    inputs: {
      totalSessionMinutes: 130,
      workIntervalMinutes: 25,
      shortBreakMinutes: 5,
      longBreakEvery: 4,
      longBreakMinutes: 15,
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "4 work intervals" &&
      result.secondary?.[0].value === "100 minutes" &&
      result.secondary?.[1].value === "30 minutes" &&
      result.secondary?.[2].value === "0 minutes",
  },
  {
    name: "stops mid work interval, leaving unused minutes at the end",
    inputs: {
      totalSessionMinutes: 110,
      workIntervalMinutes: 25,
      shortBreakMinutes: 5,
      longBreakEvery: 4,
      longBreakMinutes: 15,
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "3 work intervals" &&
      result.secondary?.[0].value === "75 minutes" &&
      result.secondary?.[1].value === "15 minutes" &&
      result.secondary?.[2].value === "20 minutes",
  },
  {
    name: "the long break lands exactly on the final interval with no room for it, so the session ends without it",
    inputs: {
      totalSessionMinutes: 115,
      workIntervalMinutes: 25,
      shortBreakMinutes: 5,
      longBreakEvery: 4,
      longBreakMinutes: 15,
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "4 work intervals" &&
      result.secondary?.[0].value === "100 minutes" &&
      result.secondary?.[1].value === "15 minutes" &&
      result.secondary?.[2].value === "0 minutes",
  },
  {
    name: "longBreakEvery of 1 makes every break a long break rather than a short one",
    inputs: {
      totalSessionMinutes: 100,
      workIntervalMinutes: 20,
      shortBreakMinutes: 5,
      longBreakEvery: 1,
      longBreakMinutes: 10,
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "3 work intervals" &&
      result.secondary?.[0].value === "60 minutes" &&
      result.secondary?.[1].value === "30 minutes" &&
      result.secondary?.[2].value === "10 minutes",
  },
  {
    name: "zero minute short and long breaks are honoured as no break at all, not skipped",
    inputs: {
      totalSessionMinutes: 50,
      workIntervalMinutes: 25,
      shortBreakMinutes: 0,
      longBreakEvery: 4,
      longBreakMinutes: 0,
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "2 work intervals" &&
      result.secondary?.[0].value === "50 minutes" &&
      result.secondary?.[1].value === "0 minutes" &&
      result.secondary?.[2].value === "0 minutes",
  },
  {
    name: "a session shorter than one work interval completes zero intervals and warns rather than erroring",
    inputs: {
      totalSessionMinutes: 10,
      workIntervalMinutes: 25,
      shortBreakMinutes: 5,
      longBreakEvery: 4,
      longBreakMinutes: 15,
    },
    check: (result) =>
      result.kind === "value" && result.headline.value === "0 work intervals" && !!result.warning,
  },
  {
    name: "rejects a zero minute work interval",
    inputs: {
      totalSessionMinutes: 120,
      workIntervalMinutes: 0,
      shortBreakMinutes: 5,
      longBreakEvery: 4,
      longBreakMinutes: 15,
    },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a negative total session length",
    inputs: {
      totalSessionMinutes: -30,
      workIntervalMinutes: 25,
      shortBreakMinutes: 5,
      longBreakEvery: 4,
      longBreakMinutes: 15,
    },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a total session length below the 5 minute minimum",
    inputs: {
      totalSessionMinutes: 2,
      workIntervalMinutes: 1,
      shortBreakMinutes: 0,
      longBreakEvery: 4,
      longBreakMinutes: 0,
    },
    check: (result) => result.kind === "error",
  },
];

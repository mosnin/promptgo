import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Counts working days between two dates, inclusive of both ends, excluding
 * Saturdays, Sundays and any date supplied in the holidays list.
 *
 * Dates are parsed from their YYYY-MM-DD parts directly into a UTC
 * timestamp with Date.UTC, and every day-of-week check reads getUTCDay()
 * on that timestamp rather than getDay(). Handing "2026-08-03" to `new
 * Date(...)` and asking for the local day of week is exactly the kind of
 * thing that silently shifts by one day depending on the server's time
 * zone offset; building the timestamp from the parsed year, month and day
 * with Date.UTC avoids that entirely, so the count is identical no matter
 * where this function runs.
 */

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function parseDateUTC(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const match = DATE_RE.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const ts = Date.UTC(year, month - 1, day);

  // Date.UTC silently rolls an invalid day (e.g. day 31 of a 30 day month)
  // into the following month, so round trip it and reject anything that
  // does not come back out exactly as entered.
  const check = new Date(ts);
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {
    return null;
  }
  return ts;
}

function formatDateUTC(ts: number): string {
  const d = new Date(ts);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseHolidays(raw: unknown): Set<string> {
  const text = typeof raw === "string" ? raw : "";
  const set = new Set<string>();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (DATE_RE.test(trimmed)) set.add(trimmed);
  }
  return set;
}

export const compute: ComputeFn = (inputs) => {
  const startTs = parseDateUTC(inputs.startDate);
  const endTs = parseDateUTC(inputs.endDate);

  if (startTs === null || endTs === null) {
    return { kind: "error", message: "Enter a valid start date and end date in YYYY-MM-DD format." };
  }

  if (endTs < startTs) {
    return { kind: "error", message: "The end date has to be on or after the start date." };
  }

  const holidays = parseHolidays(inputs.holidays);

  let totalDays = 0;
  let workingDays = 0;
  let weekendDays = 0;
  let holidayDays = 0;

  for (let ts = startTs; ts <= endTs; ts += DAY_MS) {
    totalDays += 1;
    const dayOfWeek = new Date(ts).getUTCDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
      // A holiday that lands on a Saturday or Sunday is a weekend day, not
      // a working day already excluded twice over. It is counted once,
      // as a weekend day, never as a holiday day.
      weekendDays += 1;
      continue;
    }

    if (holidays.has(formatDateUTC(ts))) {
      holidayDays += 1;
      continue;
    }

    workingDays += 1;
  }

  return {
    kind: "value",
    headline: { label: "Working days", value: `${workingDays} days` },
    secondary: [
      { label: "Total calendar days", value: `${totalDays} days` },
      { label: "Weekend days excluded", value: `${weekendDays} days` },
      { label: "Holidays excluded", value: `${holidayDays} days` },
    ],
    notes: [
      "The start date and the end date are both included in the count when either one falls on a working day.",
      "A holiday date that falls on a Saturday or Sunday is counted once, as a weekend day, not counted again as a holiday.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "a full Monday to Friday week counts five working days",
    // 3 to 7 August 2026 is a Monday to Friday week with no weekend inside it.
    inputs: { startDate: "2026-08-03", endDate: "2026-08-07", holidays: "" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "5 days" &&
      result.secondary?.[0]?.value === "5 days" &&
      result.secondary?.[1]?.value === "0 days" &&
      result.secondary?.[2]?.value === "0 days",
  },
  {
    name: "a range spanning exactly one weekend excludes two days",
    // 3 to 10 August 2026 runs Monday to Monday, crossing the 8th and 9th (Sat, Sun).
    inputs: { startDate: "2026-08-03", endDate: "2026-08-10", holidays: "" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "6 days" &&
      result.secondary?.[0]?.value === "8 days" &&
      result.secondary?.[1]?.value === "2 days" &&
      result.secondary?.[2]?.value === "0 days",
  },
  {
    name: "a holiday on an otherwise working weekday is excluded from the count",
    // 5 August 2026 is a Wednesday inside the 3 to 7 August week.
    inputs: { startDate: "2026-08-03", endDate: "2026-08-07", holidays: "2026-08-05" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "4 days" &&
      result.secondary?.[0]?.value === "5 days" &&
      result.secondary?.[1]?.value === "0 days" &&
      result.secondary?.[2]?.value === "1 days",
  },
  {
    name: "a holiday that falls on a weekend is counted as a weekend day, not a holiday",
    // 8 August 2026 is a Saturday, already inside the weekend count.
    inputs: { startDate: "2026-08-03", endDate: "2026-08-10", holidays: "2026-08-08" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "6 days" &&
      result.secondary?.[1]?.value === "2 days" &&
      result.secondary?.[2]?.value === "0 days",
  },
  {
    name: "blank lines and surrounding whitespace in the holidays list are ignored",
    inputs: { startDate: "2026-08-03", endDate: "2026-08-07", holidays: "  \n  2026-08-05  \n\n2026-08-06\n  " },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "3 days" &&
      result.secondary?.[2]?.value === "2 days",
  },
  {
    name: "a single day range on a weekday counts as one working day",
    inputs: { startDate: "2026-08-03", endDate: "2026-08-03", holidays: "" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "1 days" &&
      result.secondary?.[0]?.value === "1 days" &&
      result.secondary?.[1]?.value === "0 days",
  },
  {
    name: "a single day range on a weekend counts zero working days",
    inputs: { startDate: "2026-08-08", endDate: "2026-08-08", holidays: "" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "0 days" &&
      result.secondary?.[0]?.value === "1 days" &&
      result.secondary?.[1]?.value === "1 days",
  },
  {
    name: "an end date before the start date is rejected as an error",
    inputs: { startDate: "2026-08-14", endDate: "2026-08-03", holidays: "" },
    check: (result) => result.kind === "error",
  },
  {
    name: "a missing or invalid date is rejected as an error rather than throwing",
    inputs: { startDate: "not-a-date", endDate: "2026-08-14", holidays: "" },
    check: (result) => result.kind === "error",
  },
];

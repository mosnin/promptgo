import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Converts one meeting hour, stated in a base location's local time, into
 * every attendee's local time using raw UTC offsets only.
 *
 * There is no timezone database in this repository and none is added here on
 * purpose: an IANA city name resolves to a different UTC offset twice a year
 * in any region that observes daylight saving time, and a hardcoded
 * city-to-offset table would be quietly wrong for half of the calendar the
 * moment the clocks change. Instead every location, base and attendee alike,
 * is described by the number that is actually true right now: its current
 * UTC offset, already adjusted for daylight saving if that location observes
 * it. That keeps the arithmetic exact and keeps this tool from asserting a
 * fact (which cities are in daylight saving today) that goes stale on a
 * schedule this codebase has no way to track.
 *
 * The conversion itself is one offset subtraction and one wrap into a 24
 * hour clock, done per attendee:
 *
 *   offsetDelta   = attendee's UTC offset - base UTC offset
 *   rawLocalHour  = meeting hour + offsetDelta
 *   localHour     = ((rawLocalHour % 24) + 24) % 24
 *
 * The double modulo handles a negative rawLocalHour correctly: JavaScript's
 * % operator returns a negative result for a negative dividend (-2 % 24 is
 * -2, not 22), so a plain rawLocalHour % 24 would hand back a negative clock
 * hour for any attendee far enough behind the base location. Adding 24 and
 * taking the modulo a second time folds that negative result back into the
 * 0 to 23 range correctly.
 *
 * The day shift is read from rawLocalHour BEFORE that wrap, not after,
 * because the wrapped value has already thrown away the information that
 * distinguishes "2am the same day" from "2am the next day": both wrap to the
 * same localHour of 2. rawLocalHour still carries the sign and magnitude
 * needed to tell them apart, so it is checked first.
 */

const MIN_OFFSET = -12;
const MAX_OFFSET = 14;

function isValidOffset(value: unknown): value is number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) && n >= MIN_OFFSET && n <= MAX_OFFSET;
}

function toNumber(value: unknown): number {
  return typeof value === "number" ? value : Number(value);
}

/** Formats a possibly fractional 0 to 23.999 hour value as a 12 hour clock string, e.g. 14.5 -> "2:30 PM". */
function formatClock12(hour: number): string {
  const totalMinutes = Math.round(hour * 60);
  const wrappedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(wrappedMinutes / 60);
  const minutes = wrappedMinutes % 60;
  const period = hours24 < 12 ? "AM" : "PM";
  const hours12raw = hours24 % 12;
  const hours12 = hours12raw === 0 ? 12 : hours12raw;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export const compute: ComputeFn = (inputs) => {
  const meetingHour = toNumber(inputs.meetingHour);
  const baseUtcOffset = toNumber(inputs.baseUtcOffset);

  if (!Number.isInteger(meetingHour) || meetingHour < 0 || meetingHour > 23) {
    return { kind: "error", message: "Meeting time must be a whole hour from 0 to 23 on the 24 hour clock." };
  }
  if (!isValidOffset(baseUtcOffset)) {
    return { kind: "error", message: `Base location's UTC offset must be a number from ${MIN_OFFSET} to ${MAX_OFFSET}.` };
  }

  const rows = Array.isArray(inputs.attendeeOffsets) ? inputs.attendeeOffsets : [];
  if (rows.length === 0) {
    return { kind: "error", message: "Add at least one attendee with a name and their current UTC offset." };
  }

  const attendees: { label: string; utcOffset: number }[] = [];
  for (const rowRaw of rows) {
    const row = (rowRaw ?? {}) as Record<string, unknown>;
    const label = typeof row.label === "string" ? row.label.trim() : "";
    const utcOffset = toNumber(row.utcOffset);

    if (!label) {
      return { kind: "error", message: "Every attendee needs a name or city label." };
    }
    if (!isValidOffset(utcOffset)) {
      return {
        kind: "error",
        message: `"${label || "One of the attendees"}" needs a current UTC offset from ${MIN_OFFSET} to ${MAX_OFFSET}.`,
      };
    }
    attendees.push({ label, utcOffset });
  }

  const rowsOut: (string | number)[][] = attendees.map((attendee) => {
    const offsetDelta = attendee.utcOffset - baseUtcOffset;
    const rawLocalHour = meetingHour + offsetDelta;
    const localHour = ((rawLocalHour % 24) + 24) % 24;
    const dayShift = rawLocalHour < 0 ? "Previous day" : rawLocalHour >= 24 ? "Next day" : "Same day";

    return [attendee.label, formatClock12(localHour), dayShift];
  });

  return {
    kind: "table",
    caption: "Meeting time by attendee",
    columns: ["Attendee", "Local time", "Day"],
    rows: rowsOut,
    notes: [
      "Local times are shown on a 12 hour clock. \"Next day\" and \"Previous day\" are relative to the base location's calendar date for this meeting, not to each other.",
      "Every offset entered should be the CURRENT UTC offset for that location right now, already accounting for daylight saving if it applies, rather than a city name or a fixed year-round value.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "9:00 base time at UTC-5 is 3:00 PM the same day for an attendee at UTC+1",
    inputs: {
      meetingHour: 9,
      baseUtcOffset: -5,
      attendeeOffsets: [{ label: "Berlin", utcOffset: 1 }],
    },
    check: (result) =>
      result.kind === "table" &&
      result.rows[0][0] === "Berlin" &&
      result.rows[0][1] === "3:00 PM" &&
      result.rows[0][2] === "Same day",
  },
  {
    name: "22:00 base time at UTC-5 wraps to 12:00 PM the next day for an attendee at UTC+9 (raw hour 36)",
    inputs: {
      meetingHour: 22,
      baseUtcOffset: -5,
      attendeeOffsets: [{ label: "Tokyo", utcOffset: 9 }],
    },
    check: (result) =>
      result.kind === "table" &&
      result.rows[0][1] === "12:00 PM" &&
      result.rows[0][2] === "Next day",
  },
  {
    name: "1:00 base time at UTC+9 falls back to 11:00 AM the previous day for an attendee at UTC-5 (raw hour -13)",
    inputs: {
      meetingHour: 1,
      baseUtcOffset: 9,
      attendeeOffsets: [{ label: "New York", utcOffset: -5 }],
    },
    check: (result) =>
      result.kind === "table" &&
      result.rows[0][1] === "11:00 AM" &&
      result.rows[0][2] === "Previous day",
  },
  {
    name: "extreme offsets still wrap correctly: 0:00 at UTC+14 for an attendee at UTC-12 gives raw hour -26, wraps to 10:00 PM the previous day",
    inputs: {
      meetingHour: 0,
      baseUtcOffset: 14,
      attendeeOffsets: [{ label: "Baker Island", utcOffset: -12 }],
    },
    check: (result) =>
      result.kind === "table" &&
      result.rows[0][1] === "10:00 PM" &&
      result.rows[0][2] === "Previous day",
  },
  {
    name: "a half hour offset attendee lands on a half hour local time",
    inputs: {
      meetingHour: 10,
      baseUtcOffset: 0,
      attendeeOffsets: [{ label: "Mumbai", utcOffset: 5.5 }],
    },
    check: (result) => result.kind === "table" && result.rows[0][1] === "3:30 PM" && result.rows[0][2] === "Same day",
  },
  {
    name: "multiple attendees are each converted independently in one table",
    inputs: {
      meetingHour: 9,
      baseUtcOffset: -5,
      attendeeOffsets: [
        { label: "Berlin", utcOffset: 1 },
        { label: "Tokyo", utcOffset: 9 },
      ],
    },
    check: (result) =>
      result.kind === "table" &&
      result.rows.length === 2 &&
      result.rows[0][0] === "Berlin" &&
      result.rows[0][1] === "3:00 PM" &&
      result.rows[0][2] === "Same day" &&
      result.rows[1][0] === "Tokyo" &&
      result.rows[1][1] === "11:00 PM" &&
      result.rows[1][2] === "Same day",
  },
  {
    name: "rejects a meeting hour outside 0 to 23",
    inputs: {
      meetingHour: 24,
      baseUtcOffset: -5,
      attendeeOffsets: [{ label: "Berlin", utcOffset: 1 }],
    },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects an attendee offset outside -12 to 14",
    inputs: {
      meetingHour: 9,
      baseUtcOffset: -5,
      attendeeOffsets: [{ label: "Out of range", utcOffset: 20 }],
    },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects an attendee row with a blank label",
    inputs: {
      meetingHour: 9,
      baseUtcOffset: -5,
      attendeeOffsets: [{ label: "", utcOffset: 1 }],
    },
    check: (result) => result.kind === "error",
  },
];

import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Counts words, characters, sentences and estimated reading and speaking
 * time for a block of pasted text.
 *
 * Word count uses whitespace tokenisation on the trimmed text: split on any
 * run of whitespace, then drop empty segments, so leading, trailing and
 * repeated whitespace between words never inflates the count. Character
 * counts are taken from the raw, untrimmed text, since a visitor pasting
 * text with surrounding whitespace is usually curious about the string as
 * pasted, not a trimmed version of it. Sentence count splits on runs of
 * ., ! or ? and drops any resulting segment that is empty once trimmed, so
 * an ellipsis or a stray punctuation run does not count as several
 * sentences. Reading and speaking time use the commonly cited averages of
 * 225 words per minute for silent adult reading and 130 words per minute
 * for spoken delivery, each rounded to the nearest minute with a floor of
 * one minute so a short passage never reports a time of zero.
 */
export const compute: ComputeFn = (inputs) => {
  const text = String(inputs.text ?? "");
  const trimmed = text.trim();

  const wordCount = trimmed === "" ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentenceCount =
    trimmed === ""
      ? 0
      : text
          .split(/[.!?]+/)
          .map((segment) => segment.trim())
          .filter((segment) => segment.length > 0).length;

  const readingMinutes = Math.max(1, Math.round(wordCount / 225));
  const speakingMinutes = Math.max(1, Math.round(wordCount / 130));

  return {
    kind: "value",
    headline: { label: "Words", value: String(wordCount) },
    secondary: [
      { label: "Characters (with spaces)", value: String(charsWithSpaces) },
      { label: "Characters (no spaces)", value: String(charsNoSpaces) },
      { label: "Sentences", value: String(sentenceCount) },
      { label: "Reading time", value: `${readingMinutes} min` },
      { label: "Speaking time", value: `${speakingMinutes} min` },
    ],
    notes: [
      "Word count splits on whitespace after trimming, so extra spaces, tabs or blank lines between words never inflate the total.",
      "Reading and speaking time are both rounded to the nearest minute and never show as zero, even for a single short sentence.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "counts a simple short sentence correctly",
    inputs: { text: "The quick brown fox jumps." },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "5" &&
      result.secondary?.[0].value === "26" &&
      result.secondary?.[1].value === "22" &&
      result.secondary?.[2].value === "1" &&
      result.secondary?.[3].value === "1 min" &&
      result.secondary?.[4].value === "1 min",
  },
  {
    name: "does not overcount words split by repeated spaces, tabs and blank lines",
    inputs: { text: "Hello    world.\n\nThis   is\ta   test." },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "6" &&
      result.secondary?.[0].value === "36" &&
      result.secondary?.[1].value === "23" &&
      result.secondary?.[2].value === "2",
  },
  {
    name: "treats empty input as a valid all zero result, not an error",
    inputs: { text: "" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "0" &&
      result.secondary?.[0].value === "0" &&
      result.secondary?.[1].value === "0" &&
      result.secondary?.[2].value === "0",
  },
  {
    name: "treats whitespace only input as zero words despite non zero raw length",
    inputs: { text: "   \n\t  " },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "0" &&
      result.secondary?.[0].value === "7" &&
      result.secondary?.[1].value === "0" &&
      result.secondary?.[2].value === "0",
  },
  {
    name: "computes reading and speaking time correctly for a longer paragraph",
    inputs: {
      text: "Reading speed varies enormously from one person to another, yet researchers who study silent reading have found that an average adult reads somewhere close to two hundred and twenty five words in a single minute when the material is ordinary prose rather than dense technical writing. That average is exactly why a blog editor, a student finishing an essay, or a content marketer sizing an article for a busy audience benefits from a quick estimate of how long a draft will take to read before it is published, submitted, or sent out in a newsletter. Speaking speed is slower and more consistent than silent reading, because a speaker has to physically produce every syllable rather than skimming ahead, which is why a podcast script or a conference talk is usually paced against a lower words per minute figure than an article meant to be read on a screen. Anyone rehearsing a speech, recording a video voiceover, or timing a toast for a wedding runs into the same problem: a page of text that looks short can still run well past its allotted slot once it is read aloud at a natural, unhurried pace, and a page that looks long can pass quickly once trimmed of filler and repeated phrases that add words without adding meaning to the sentence.",
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "218" &&
      result.secondary?.[3].value === "1 min" &&
      result.secondary?.[4].value === "2 min",
  },
];

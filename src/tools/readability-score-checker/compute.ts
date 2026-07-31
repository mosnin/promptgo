import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Scores a passage with the Flesch Reading Ease and Flesch-Kincaid Grade
 * Level formulas, the two most widely published English readability
 * measures.
 *
 * Word count splits the trimmed text on whitespace. Sentence count splits
 * on runs of ., ! or ?, drops any empty segment the split produces, and
 * floors at 1 so a passage with no terminal punctuation still divides
 * cleanly instead of producing a divide by zero. Syllables per word use the
 * standard vowel group heuristic: lowercase the word, strip everything but
 * letters, count each run of consecutive a, e, i, o, u or y as one
 * syllable, then subtract one for a silent trailing "e", unless the word
 * ends in "le" preceded by a consonant (table keeps its second syllable
 * because the "le" is voiced, unlike the silent e in like or time). Every
 * word is floored at one syllable, since no real word has zero.
 */

function countSyllables(rawWord: string): number {
  const letters = rawWord.toLowerCase().replace(/[^a-z]/g, "");
  if (letters === "") return 1;

  const vowelGroups = letters.match(/[aeiouy]+/g) ?? [];
  let count = vowelGroups.length;

  if (letters.endsWith("e")) {
    const precedingChar = letters[letters.length - 3];
    const endsInVoicedLe =
      letters.length > 2 && letters.endsWith("le") && precedingChar !== undefined && !/[aeiouy]/.test(precedingChar);
    if (!endsInVoicedLe) count -= 1;
  }

  return Math.max(1, count);
}

export const compute: ComputeFn = (inputs) => {
  const text = String(inputs.text ?? "");
  const trimmed = text.trim();

  if (trimmed === "") {
    return {
      kind: "value",
      headline: { label: "Flesch Reading Ease", value: "0.0" },
      secondary: [
        { label: "Flesch-Kincaid Grade Level", value: "0.0" },
        { label: "Words", value: "0" },
        { label: "Sentences", value: "0" },
        { label: "Average syllables per word", value: "0.0" },
      ],
      notes: [
        "Paste in a paragraph to score it. The Flesch Reading Ease scale runs from 0 to 100: 90 to 100 reads as very easy, 60 to 70 reads as plain English a typical adult finishes school able to read comfortably, and 0 to 30 reads as very difficult, the range of dense legal or academic text.",
      ],
    };
  }

  const wordTokens = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = wordTokens.length;

  const sentenceSegments = text
    .split(/[.!?]+/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
  const sentenceCount = Math.max(1, sentenceSegments.length);

  const totalSyllables = wordTokens.reduce((sum, word) => sum + countSyllables(word), 0);

  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = totalSyllables / wordCount;

  const readingEase = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
  const gradeLevel = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;

  return {
    kind: "value",
    headline: { label: "Flesch Reading Ease", value: readingEase.toFixed(1) },
    secondary: [
      { label: "Flesch-Kincaid Grade Level", value: gradeLevel.toFixed(1) },
      { label: "Words", value: String(wordCount) },
      { label: "Sentences", value: String(sentenceCount) },
      { label: "Average syllables per word", value: syllablesPerWord.toFixed(1) },
    ],
    notes: [
      "The Flesch Reading Ease scale runs from 0 to 100: 90 to 100 is very easy, 60 to 70 is plain English most adults read comfortably, and 0 to 30 is very difficult, the range typical of dense legal or academic text.",
      "The Flesch-Kincaid Grade Level estimates the US school grade a reader needs to follow the passage on a first read, calculated from the same sentence length and syllable count figures.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "scores an all one syllable sentence as very easy",
    inputs: { text: "The cat sat on the mat." },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "116.1" &&
      result.secondary?.[0].value === "-1.4" &&
      result.secondary?.[1].value === "6" &&
      result.secondary?.[2].value === "1" &&
      result.secondary?.[3].value === "1.0",
  },
  {
    name: "counts three short sentences correctly, an edge case with many sentence boundaries",
    inputs: { text: "Dogs run fast. Cats jump high. Birds fly far." },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "119.2" &&
      result.secondary?.[0].value === "-2.6" &&
      result.secondary?.[1].value === "9" &&
      result.secondary?.[2].value === "3" &&
      result.secondary?.[3].value === "1.0",
  },
  {
    name: "scores a mostly one and two syllable paragraph in the plain English range",
    inputs: { text: "Reading a simple story can help a young child learn new words quickly." },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "83.0" &&
      result.secondary?.[0].value === "4.9" &&
      result.secondary?.[1].value === "13" &&
      result.secondary?.[2].value === "1" &&
      result.secondary?.[3].value === "1.3",
  },
  {
    name: "scores a paragraph dense with three and four syllable words as difficult",
    inputs: { text: "The elephant needed important information about the wonderful computer." },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "-9.1" &&
      result.secondary?.[0].value === "16.8" &&
      result.secondary?.[1].value === "9" &&
      result.secondary?.[2].value === "1" &&
      result.secondary?.[3].value === "2.4",
  },
  {
    name: "treats blank input as a zero state result rather than an error or NaN",
    inputs: { text: "" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "0.0" &&
      result.secondary?.[0].value === "0.0" &&
      result.secondary?.[1].value === "0" &&
      result.secondary?.[2].value === "0",
  },
];

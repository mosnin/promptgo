import type { IdeToolFile, IdeToolFileKind } from "./ide-tool-types";

/**
 * Builds a .zip archive of the editor's current files and triggers a browser
 * download. JSZip is imported dynamically so it never lands in the shared
 * page bundle, the same "pay only for what you use" principle
 * `downloadSkillZip` already follows.
 */
export async function downloadIdeZip(slug: string, files: IdeToolFile[]): Promise<void> {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.path, file.content);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${slug}.zip`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

/** A rough guess at a file's editor kind from its extension, for imported or newly created files with no other hint. */
export function kindForPath(path: string): IdeToolFileKind {
  const lower = path.toLowerCase();
  if (lower.endsWith(".md") || lower.endsWith(".mdx")) return "markdown";
  if (lower.endsWith(".json") || lower.endsWith(".yaml") || lower.endsWith(".yml") || lower.endsWith(".toml")) {
    return "json";
  }
  if (lower.endsWith(".txt")) return "text";
  return "code";
}

/**
 * Reads a .zip a visitor picked from disk and returns its text entries as
 * editor files, entirely client side. Binary entries (anything JSZip cannot
 * decode as UTF-8 text, such as an image) are skipped rather than corrupted,
 * since the editor only ever displays and edits plain text.
 */
export async function importIdeZip(file: File): Promise<IdeToolFile[]> {
  const { default: JSZip } = await import("jszip");
  const zip = await JSZip.loadAsync(file);
  const results: IdeToolFile[] = [];

  // Deliberately not re-sorted alphabetically: that would push a root file
  // like "SKILL.md" after a nested "reference/*.md" entry (lowercase "r"
  // sorts before uppercase "S" under locale comparison), losing the
  // convention that the first file is the main one. JSZip's own iteration
  // order matches the archive's original entry order, which for anything
  // built by `downloadIdeZip` is exactly the `files` array order it was
  // created from.
  const entries = Object.values(zip.files).filter((entry) => !entry.dir);

  for (const entry of entries) {
    try {
      const content = await entry.async("text");
      // A binary file decoded as text usually contains the Unicode
      // replacement character where invalid byte sequences were coerced.
      // Skipping those keeps a stray image out of the text editor instead of
      // showing it as scrambled content.
      if (content.includes("�")) continue;
      results.push({ path: entry.name, content, kind: kindForPath(entry.name) });
    } catch {
      // Unreadable entry; skip it rather than fail the whole import.
    }
  }

  return results;
}

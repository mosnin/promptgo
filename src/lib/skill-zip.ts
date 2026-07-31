import type { SkillFile } from "./skill-types";

/**
 * Builds a .zip archive of a skill's files and triggers a browser download.
 * JSZip is imported dynamically so it never lands in the shared page bundle;
 * it only loads the moment someone actually clicks download, the same
 * "pay only for what you use" principle `AdSlot` and the search index already
 * follow elsewhere on this site.
 */
export async function downloadSkillZip(slug: string, files: SkillFile[]): Promise<void> {
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

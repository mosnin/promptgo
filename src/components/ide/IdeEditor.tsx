"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { downloadIdeZip, importIdeZip, kindForPath } from "@/lib/ide-zip";
import type { IdeToolFile } from "@/lib/ide-tool-types";

function iconForKind(kind: IdeToolFile["kind"]) {
  switch (kind) {
    case "markdown":
      return "type" as const;
    case "code":
      return "code" as const;
    case "data":
    case "json":
      return "database" as const;
    default:
      return "document" as const;
  }
}

function ToolbarButton({
  icon,
  label,
  onClick,
  disabled,
  accent,
  filled,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  accent?: string;
  filled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={filled && accent ? { backgroundColor: accent } : undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200 disabled:opacity-60",
        filled
          ? "border-transparent text-canvas hover:opacity-90"
          : "border-hairline bg-surface-2 text-ink hover:bg-surface-3",
      )}
    >
      <Icon name={icon} size={13} />
      {label}
    </button>
  );
}

/**
 * The shared multi file, in-browser IDE engine every builder tool page
 * renders through: a file tree with add, rename and delete; a plain
 * monospace textarea per active file with a scroll-synced line number
 * gutter; import from a .zip picked off disk; download the current file set
 * as a .zip; and a reset back to the tool's starter files.
 *
 * Deliberately a styled `<textarea>` rather than a syntax highlighted code
 * editor library: this repo keeps its client bundle near zero (see
 * CLAUDE.md), and pulling in Monaco or CodeMirror for occasional editing of
 * short instruction and config files is not a proportionate cost. Everything
 * here (state, .zip import and export) runs entirely client side; nothing
 * a visitor types is ever sent anywhere.
 */
export function IdeEditor({
  slug,
  starterFiles,
  accent = "var(--color-signal)",
}: {
  slug: string;
  starterFiles: IdeToolFile[];
  accent?: string;
}) {
  const [files, setFiles] = useState<IdeToolFile[]>(starterFiles);
  const [activeIndex, setActiveIndex] = useState(0);
  const [addingFile, setAddingFile] = useState(false);
  const [newFilePath, setNewFilePath] = useState("");
  const [importing, setImporting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const active = files[activeIndex] ?? files[0];
  const lineCount = Math.max(1, (active?.content ?? "").split("\n").length);
  const lineNumbers = Array.from({ length: lineCount }, (_, index) => index + 1);

  function updateActiveContent(content: string) {
    setFiles((prev) => prev.map((file, index) => (index === activeIndex ? { ...file, content } : file)));
  }

  function handleAddFile() {
    const path = newFilePath.trim().replace(/^\/+/, "");
    if (!path) return;
    if (path.includes("..")) {
      setError("A file path cannot contain \"..\".");
      return;
    }
    if (files.some((file) => file.path === path)) {
      setError(`A file named "${path}" already exists.`);
      return;
    }
    const nextIndex = files.length;
    setFiles((prev) => [...prev, { path, content: "", kind: kindForPath(path) }]);
    setActiveIndex(nextIndex);
    setNewFilePath("");
    setAddingFile(false);
    setError(null);
  }

  function handleDeleteFile(index: number) {
    if (files.length <= 1) return;
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setActiveIndex((prev) => (index <= prev ? Math.max(0, prev - 1) : prev));
  }

  async function handleImportChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setImporting(true);
    setError(null);
    try {
      const imported = await importIdeZip(file);
      if (imported.length === 0) {
        setError("No readable text files were found in that archive.");
      } else {
        setFiles(imported);
        setActiveIndex(0);
      }
    } catch {
      setError("That file could not be read as a .zip archive.");
    } finally {
      setImporting(false);
    }
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadIdeZip(slug, files);
    } finally {
      setDownloading(false);
    }
  }

  function handleReset() {
    setFiles(starterFiles);
    setActiveIndex(0);
    setError(null);
  }

  function handleTextareaKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const target = event.currentTarget;
    const { selectionStart, selectionEnd, value } = target;
    const nextValue = `${value.slice(0, selectionStart)}\t${value.slice(selectionEnd)}`;
    updateActiveContent(nextValue);
    requestAnimationFrame(() => {
      target.selectionStart = target.selectionEnd = selectionStart + 1;
    });
  }

  function syncGutterScroll() {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-surface-2/30">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-2 text-[0.8125rem] font-medium text-ink">
          <Icon name="layers" size={14} style={{ color: accent }} />
          {files.length} file{files.length === 1 ? "" : "s"}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            onChange={handleImportChange}
            className="hidden"
          />
          <ToolbarButton
            icon="upload"
            label={importing ? "Reading…" : "Import .zip"}
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
          />
          <ToolbarButton icon="close" label="Reset" onClick={handleReset} />
          <ToolbarButton
            icon="download"
            label={downloading ? "Building zip…" : "Download .zip"}
            onClick={handleDownload}
            disabled={downloading}
            accent={accent}
            filled
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 border-b border-hairline bg-[color-mix(in_oklch,var(--color-alert)_10%,transparent)] px-4 py-2 text-[0.8125rem] text-alert">
          <Icon name="alert" size={13} />
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-[13rem_minmax(0,1fr)]">
        <nav className="border-b border-hairline sm:border-b-0 sm:border-r sm:border-hairline">
          <ul className="flex gap-1 overflow-x-auto p-2 sm:block sm:max-h-[26rem] sm:space-y-0.5 sm:overflow-y-auto sm:overflow-x-visible">
            {files.map((file, index) => (
              <li key={file.path} className="group/file shrink-0 sm:shrink">
                <div
                  className={cn(
                    "flex w-full items-center gap-1 whitespace-nowrap rounded-md py-1 pl-2.5 pr-1 text-left text-[0.75rem] transition-colors duration-150",
                    index === activeIndex
                      ? "bg-surface-3 text-ink"
                      : "text-ink-subtle hover:bg-surface-3/60 hover:text-ink",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="flex min-w-0 flex-1 items-center gap-1.5 py-0.5 text-left"
                  >
                    <Icon
                      name={iconForKind(file.kind)}
                      size={12}
                      style={{ color: index === activeIndex ? accent : undefined }}
                    />
                    <span className="truncate font-mono">{file.path}</span>
                  </button>
                  {files.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(index)}
                      aria-label={`Delete ${file.path}`}
                      className="shrink-0 rounded p-1 text-ink-faint opacity-0 transition-opacity duration-150 hover:text-alert group-hover/file:opacity-100"
                    >
                      <Icon name="close" size={11} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-hairline p-2">
            {addingFile ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  value={newFilePath}
                  onChange={(event) => setNewFilePath(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleAddFile();
                    if (event.key === "Escape") {
                      setAddingFile(false);
                      setNewFilePath("");
                    }
                  }}
                  placeholder="path/to/file.md"
                  className="w-full min-w-0 rounded-md border border-hairline bg-canvas px-2 py-1 font-mono text-[0.75rem] text-ink outline-none focus:border-hairline-strong"
                />
                <button
                  type="button"
                  onClick={handleAddFile}
                  aria-label="Confirm new file"
                  className="shrink-0 rounded-md p-1.5 text-ink-subtle hover:bg-surface-3 hover:text-ink"
                >
                  <Icon name="check" size={13} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAddingFile(true)}
                className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[0.75rem] text-ink-subtle transition-colors duration-150 hover:bg-surface-3/60 hover:text-ink"
              >
                <Icon name="upload" size={12} className="rotate-180" />
                Add file
              </button>
            )}
          </div>
        </nav>

        <div className="min-w-0">
          {active && (
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)]">
              <div
                ref={gutterRef}
                aria-hidden
                className="max-h-[26rem] select-none overflow-hidden border-r border-hairline py-3 text-right font-mono text-[0.6875rem] leading-relaxed text-ink-faint"
              >
                {lineNumbers.map((line) => (
                  <div key={line} className="pr-2">
                    {line}
                  </div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={active.content}
                onChange={(event) => updateActiveContent(event.target.value)}
                onScroll={syncGutterScroll}
                onKeyDown={handleTextareaKeyDown}
                spellCheck={false}
                className="max-h-[26rem] min-h-[16rem] w-full resize-none bg-transparent px-3 py-3 font-mono text-[0.8125rem] leading-relaxed text-ink-muted outline-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

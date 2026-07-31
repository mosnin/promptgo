"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { downloadSkillZip } from "@/lib/skill-zip";
import type { SkillFile } from "@/lib/skill-types";

function iconForKind(kind: SkillFile["kind"]) {
  switch (kind) {
    case "markdown":
      return "type" as const;
    case "code":
      return "code" as const;
    case "data":
      return "database" as const;
    default:
      return "document" as const;
  }
}

function CopyFileButton({ value, accent }: { value: string; accent: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied by permissions policy; nothing else to fall back to.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      style={{ borderColor: `color-mix(in oklch, ${accent} 45%, transparent)` }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border bg-surface-2 px-3 py-1.5 text-[0.8125rem] font-medium text-ink transition-colors duration-200 hover:bg-surface-3"
    >
      <Icon name={copied ? "check" : "copy"} size={13} />
      {copied ? "Copied" : "Copy file"}
    </button>
  );
}

/**
 * A read only, multi file preview: a file tree on the left, the selected
 * file's content on the right in a monospace, line numbered pane, and a
 * "Download .zip" button that builds the archive client side from the exact
 * same `files` array being previewed. Deliberately not a syntax highlighted
 * editor: this repo keeps its client bundle near zero (see CLAUDE.md), and a
 * plain monospace view is both lighter and, for a file someone is about to
 * download rather than edit here, sufficient.
 */
export function SkillViewer({
  slug,
  files,
  accent = "var(--color-signal)",
}: {
  slug: string;
  files: SkillFile[];
  accent?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const active = files[activeIndex] ?? files[0];
  const lines = active?.content.split("\n") ?? [];

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadSkillZip(slug, files);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-surface-2/30">
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-2 text-[0.8125rem] font-medium text-ink">
          <Icon name="code" size={14} style={{ color: accent }} />
          {files.length} file{files.length === 1 ? "" : "s"}
        </div>
        <div className="flex items-center gap-2">
          {active && <CopyFileButton value={active.content} accent={accent} />}
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            style={{ backgroundColor: accent }}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-[0.8125rem] font-medium text-canvas transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
          >
            <Icon name="download" size={13} />
            {downloading ? "Building zip…" : "Download .zip"}
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-[13rem_minmax(0,1fr)]">
        <nav className="border-b border-hairline sm:border-b-0 sm:border-r sm:border-hairline">
          <ul className="flex gap-1 overflow-x-auto p-2 sm:block sm:space-y-0.5 sm:overflow-visible">
            {files.map((file, index) => (
              <li key={file.path} className="shrink-0 sm:shrink">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex w-full items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-left text-[0.75rem] transition-colors duration-150",
                    index === activeIndex
                      ? "bg-surface-3 text-ink"
                      : "text-ink-subtle hover:bg-surface-3/60 hover:text-ink",
                  )}
                >
                  <Icon
                    name={iconForKind(file.kind)}
                    size={12}
                    style={{ color: index === activeIndex ? accent : undefined }}
                  />
                  <span className="truncate font-mono">{file.path}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 overflow-x-auto">
          <pre className="min-w-full px-0 py-3 text-[0.8125rem] leading-relaxed">
            <code className="grid grid-cols-[2.5rem_minmax(0,1fr)]">
              {lines.map((line, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index} className="contents">
                  <span className="select-none border-r border-hairline pr-2 text-right font-mono text-[0.6875rem] text-ink-faint">
                    {index + 1}
                  </span>
                  <span className="whitespace-pre pl-3 font-mono text-ink-muted">{line || " "}</span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

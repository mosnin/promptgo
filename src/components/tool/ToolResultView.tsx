"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { ToolResult } from "@/lib/tool-types";

/** Small inline copy button reused by every result shape that has one string worth copying. */
function CopyButton({ value, accent }: { value: string; accent: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied by permissions policy; nothing else to fall back to
      // here since there is no single backing textarea the way the prompt panel has.
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
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Notes({ notes }: { notes?: string[] }) {
  if (!notes?.length) return null;
  return (
    <ul className="mt-3 space-y-1.5">
      {notes.map((note) => (
        <li key={note} className="flex gap-2 text-[0.8125rem] leading-relaxed text-ink-faint">
          <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
          <span>{note}</span>
        </li>
      ))}
    </ul>
  );
}

function QrCanvas({ value }: { value: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current || !value) return;
    QRCode.toCanvas(ref.current, value, { width: 220, margin: 1 }).catch(() => {
      // An unencodable value (empty string, or one exceeding QR capacity) just
      // leaves the previous canvas frame in place rather than throwing.
    });
  }, [value]);

  function download() {
    const canvas = ref.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas ref={ref} width={220} height={220} className="rounded-md border border-hairline bg-white" />
      <button
        type="button"
        onClick={download}
        className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-2 px-3 py-1.5 text-[0.8125rem] font-medium text-ink transition-colors duration-200 hover:bg-surface-3"
      >
        <Icon name="download" size={13} />
        Download PNG
      </button>
    </div>
  );
}

/**
 * Renders one of the closed set of `ToolResult` shapes. Every tool routes
 * through exactly one of these branches, which is what keeps 94 tools from
 * needing 94 hand rolled result displays: the variety lives in `compute()`,
 * not in the rendering.
 */
export function ToolResultView({ result, accent }: { result: ToolResult; accent: string }) {
  if (result.kind === "error") {
    return (
      <div className="flex items-start gap-2.5 rounded-md border border-warning/40 bg-warning/10 p-4 text-[0.875rem] text-ink-muted">
        <Icon name="alert" size={15} className="mt-0.5 shrink-0 text-warning" />
        <span>{result.message}</span>
      </div>
    );
  }

  if (result.kind === "value") {
    return (
      <div className="rounded-lg border border-hairline bg-surface-2/40 p-5">
        {result.warning && (
          <div className="mb-4 flex items-start gap-2 rounded-md border border-warning/40 bg-warning/10 p-3 text-[0.8125rem] text-ink-muted">
            <Icon name="alert" size={14} className="mt-0.5 shrink-0 text-warning" />
            <span>{result.warning}</span>
          </div>
        )}
        <p className="eyebrow">{result.headline.label}</p>
        <p
          className="mt-1.5 font-mono text-[2rem] font-semibold tracking-[-0.02em]"
          style={{ color: accent }}
        >
          {result.headline.value}
        </p>
        {result.secondary && result.secondary.length > 0 && (
          <dl className="mt-4 grid gap-2.5 border-t border-hairline pt-4 sm:grid-cols-2">
            {result.secondary.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-3">
                <dt className="text-[0.8125rem] text-ink-subtle">{item.label}</dt>
                <dd className="font-mono text-[0.875rem] font-medium text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <Notes notes={result.notes} />
      </div>
    );
  }

  if (result.kind === "table") {
    return (
      <div className="rounded-lg border border-hairline bg-surface-2/40 p-5">
        <p className="eyebrow mb-3">{result.caption}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.8125rem]">
            <thead>
              <tr className="border-b border-hairline text-left text-ink-subtle">
                {result.columns.map((column) => (
                  <th key={column} className="px-2.5 py-2 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, index) => (
                <tr key={index} className="border-b border-hairline last:border-b-0">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-2.5 py-2 font-mono text-ink tabular-nums"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Notes notes={result.notes} />
      </div>
    );
  }

  if (result.kind === "text") {
    return (
      <div className="rounded-lg border border-hairline bg-surface-2/40 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">{result.label}</p>
          <CopyButton value={result.value} accent={accent} />
        </div>
        <pre
          className={cn(
            "mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-md border border-hairline bg-surface p-3.5 text-[0.8125rem] leading-relaxed text-ink-muted",
            result.monospace !== false && "font-mono",
          )}
        >
          {result.value}
        </pre>
        <Notes notes={result.notes} />
      </div>
    );
  }

  if (result.kind === "list") {
    return (
      <div className="rounded-lg border border-hairline bg-surface-2/40 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">{result.label}</p>
          <CopyButton value={result.items.join("\n")} accent={accent} />
        </div>
        <ul className="mt-3 space-y-1.5">
          {result.items.map((item, index) => (
            <li
              key={index}
              className="rounded-md border border-hairline bg-surface px-3 py-2 font-mono text-[0.8125rem] text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
        <Notes notes={result.notes} />
      </div>
    );
  }

  if (result.kind === "swatches") {
    return (
      <div className="rounded-lg border border-hairline bg-surface-2/40 p-5">
        <p className="eyebrow mb-3">{result.label}</p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {result.swatches.map((swatch, index) => (
            <SwatchTile key={`${swatch.hex}-${index}`} swatch={swatch} />
          ))}
        </div>
        <Notes notes={result.notes} />
      </div>
    );
  }

  if (result.kind === "css") {
    return (
      <div className="rounded-lg border border-hairline bg-surface-2/40 p-5">
        <p className="eyebrow mb-3">{result.label}</p>
        <div
          className="mb-3.5 h-28 w-full rounded-md border border-hairline"
          style={result.previewStyle}
          aria-hidden
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.75rem] text-ink-faint">CSS</p>
          <CopyButton value={result.css} accent={accent} />
        </div>
        <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-hairline bg-surface p-3.5 font-mono text-[0.8125rem] text-ink-muted">
          {result.css}
        </pre>
        <Notes notes={result.notes} />
      </div>
    );
  }

  if (result.kind === "qr") {
    return (
      <div className="rounded-lg border border-hairline bg-surface-2/40 p-5">
        <p className="eyebrow mb-3">{result.label}</p>
        <QrCanvas value={result.value} />
        <Notes notes={result.notes} />
      </div>
    );
  }

  if (result.kind === "diff") {
    return (
      <div className="rounded-lg border border-hairline bg-surface-2/40 p-5">
        <p className="eyebrow mb-3">{result.label}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[0.75rem] text-ink-faint">Before</p>
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-md border border-hairline bg-surface p-3 font-mono text-[0.8125rem] text-ink-muted">
              {result.before}
            </pre>
          </div>
          <div>
            <p className="mb-1.5 text-[0.75rem] text-ink-faint">After</p>
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-md border border-hairline bg-surface p-3 font-mono text-[0.8125rem] text-ink-muted">
              {result.after}
            </pre>
          </div>
        </div>
        <Notes notes={result.notes} />
      </div>
    );
  }

  return null;
}

function SwatchTile({ swatch }: { swatch: { hex: string; label?: string } }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(swatch.hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // No clipboard access; the hex value is still visible on the tile.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group overflow-hidden rounded-md border border-hairline text-left transition-transform duration-150 hover:-translate-y-0.5"
    >
      <div className="h-16 w-full" style={{ background: swatch.hex }} aria-hidden />
      <div className="flex items-center justify-between gap-2 bg-surface-2 px-2.5 py-1.5">
        <span className="font-mono text-[0.75rem] text-ink">{swatch.hex}</span>
        <Icon name={copied ? "check" : "copy"} size={11} className="text-ink-faint" />
      </div>
      {swatch.label && (
        <p className="truncate bg-surface-2 px-2.5 pb-1.5 text-[0.6875rem] text-ink-faint">
          {swatch.label}
        </p>
      )}
    </button>
  );
}

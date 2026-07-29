"use client";

type GtagArgs =
  | ["event", string, Record<string, unknown>]
  | ["config", string, Record<string, unknown>];

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Thin wrapper over gtag so tool components can report engagement without
 * caring whether analytics is connected. Every call is a no op when the GA id
 * is absent, so tools can instrument freely.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

/** Fired when a user selects or drops files into a tool. */
export function trackFileSelected(tool: string, count: number, bytes: number) {
  track("tool_file_selected", { tool_slug: tool, file_count: count, total_bytes: bytes });
}

/** Fired when a conversion or transformation completes successfully. */
export function trackConversion(tool: string, durationMs: number, outputBytes?: number) {
  track("tool_conversion_complete", {
    tool_slug: tool,
    duration_ms: Math.round(durationMs),
    output_bytes: outputBytes,
  });
}

/** Fired when the user downloads a result. This is the primary success metric. */
export function trackDownload(tool: string, format?: string) {
  track("tool_download", { tool_slug: tool, output_format: format });
}

/** Fired when a tool surfaces an error to the user. */
export function trackToolError(tool: string, message: string) {
  track("tool_error", { tool_slug: tool, error_message: message.slice(0, 120) });
}

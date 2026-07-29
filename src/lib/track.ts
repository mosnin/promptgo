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
 * Thin wrapper over gtag so prompt components can report engagement without
 * caring whether analytics is connected. Every call is a no op when the GA id
 * is absent, so prompts can instrument freely.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

/** Fired when a user selects or drops files into a prompt. */
export function trackFileSelected(prompt: string, count: number, bytes: number) {
  track("tool_file_selected", { tool_slug: prompt, file_count: count, total_bytes: bytes });
}

/** Fired when a conversion or transformation completes successfully. */
export function trackConversion(prompt: string, durationMs: number, outputBytes?: number) {
  track("tool_conversion_complete", {
    tool_slug: prompt,
    duration_ms: Math.round(durationMs),
    output_bytes: outputBytes,
  });
}

/** Fired when the user downloads a result. This is the primary success metric. */
export function trackDownload(prompt: string, format?: string) {
  track("tool_download", { tool_slug: prompt, output_format: format });
}

/** Fired when a prompt surfaces an error to the user. */
export function trackToolError(prompt: string, message: string) {
  track("tool_error", { tool_slug: prompt, error_message: message.slice(0, 120) });
}

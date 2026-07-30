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

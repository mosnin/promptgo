"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { PromptPayload } from "@/lib/types";

/**
 * The interactive part of every prompt page.
 *
 * A prompt directory usually ships a static code block and a copy button, which
 * is why most of them are interchangeable. The useful version fills the
 * variables in for you: the tokens in the prompt body become real inputs, the
 * preview updates as you type, and what lands on your clipboard is a finished
 * prompt rather than a template you still have to edit in the chat window.
 *
 * Everything is local state. Nothing you type here is sent anywhere, which
 * matters because these fields routinely hold unreleased copy, client names and
 * internal numbers.
 */
export function PromptPanel({ prompt, accent }: { prompt: PromptPayload; accent: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [useExamples, setUseExamples] = useState(false);
  const [copied, setCopied] = useState(false);

  /** Resolved prompt text with every {{TOKEN}} substituted. */
  const resolved = useMemo(() => {
    return prompt.text.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, token: string) => {
      const typed = values[token]?.trim();
      if (typed) return typed;
      if (useExamples) {
        const variable = prompt.variables.find((item) => item.token === token);
        if (variable) return variable.example;
      }
      return match;
    });
  }, [prompt, values, useExamples]);

  const filled = prompt.variables.filter(
    (variable) => values[variable.token]?.trim() || useExamples,
  ).length;
  const remaining = prompt.variables.length - filled;

  async function copy() {
    try {
      await navigator.clipboard.writeText(resolved);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied by permissions policy in an iframe.
      // Selecting the textarea is a workable fallback and needs no permission.
      const field = document.getElementById("prompt-output") as HTMLTextAreaElement | null;
      field?.select();
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-2/40">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        {/* ---- Variable inputs ------------------------------------------- */}
        {prompt.variables.length > 0 && (
          <div className="border-b border-hairline p-5 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow">Fill in the blanks</p>
              <button
                type="button"
                onClick={() => setUseExamples((previous) => !previous)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium transition-colors duration-200",
                  useExamples
                    ? "border-transparent bg-signal/15 text-signal-bright"
                    : "border-hairline text-ink-faint hover:text-ink-muted",
                )}
              >
                {useExamples ? "Using examples" : "Use examples"}
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {prompt.variables.map((variable) => (
                <label key={variable.token} className="block">
                  <span className="mb-1.5 flex items-baseline justify-between gap-2">
                    <span className="text-[0.8125rem] font-medium text-ink">{variable.label}</span>
                    <code className="font-mono text-[0.625rem] text-ink-faint">
                      {`{{${variable.token}}}`}
                    </code>
                  </span>
                  <textarea
                    rows={2}
                    value={values[variable.token] ?? ""}
                    placeholder={useExamples ? variable.example : `e.g. ${variable.example}`}
                    onChange={(event) =>
                      setValues((previous) => ({
                        ...previous,
                        [variable.token]: event.target.value,
                      }))
                    }
                    className="w-full resize-y rounded-md border border-hairline bg-surface px-3 py-2 text-[0.8125rem] leading-relaxed text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-signal/60"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ---- Resolved prompt ------------------------------------------- */}
        <div className="flex min-w-0 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">Copy ready prompt</p>
            {prompt.variables.length > 0 && (
              <span className="text-[0.6875rem] text-ink-faint">
                {remaining === 0
                  ? "All variables filled"
                  : `${remaining} placeholder${remaining === 1 ? "" : "s"} left`}
              </span>
            )}
          </div>

          <textarea
            id="prompt-output"
            readOnly
            value={resolved}
            rows={14}
            className="mt-3 w-full flex-1 resize-y rounded-md border border-hairline bg-surface p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-muted outline-none"
          />

          <button
            type="button"
            onClick={copy}
            style={{ borderColor: `color-mix(in oklch, ${accent} 45%, transparent)` }}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border bg-surface-2 px-4 py-2.5 text-[0.875rem] font-medium text-ink transition-colors duration-200 hover:bg-surface-3"
          >
            <Icon name={copied ? "check" : "copy"} size={14} />
            {copied ? "Copied to clipboard" : "Copy prompt"}
          </button>
        </div>
      </div>

      {/* ---- What good output looks like --------------------------------- */}
      <div className="border-t border-hairline bg-surface/40 px-5 py-4">
        <p className="text-[0.8125rem] leading-relaxed text-ink-muted">
          <span className="font-medium text-ink">What a good response looks like: </span>
          {prompt.expectedOutput}
        </p>
      </div>
    </div>
  );
}

/** Follow up prompts and known failure modes, rendered under the panel. */
export function PromptExtras({ prompt }: { prompt: PromptPayload }) {
  if (!prompt.followUps?.length && !prompt.pitfalls?.length) return null;

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {prompt.followUps?.length ? (
        <section className="rounded-lg border border-hairline bg-surface-2/40 p-5">
          <h2 className="text-[0.9375rem] font-semibold text-ink">Follow up prompts</h2>
          <p className="mt-1 text-[0.8125rem] text-ink-subtle">
            Send these after the first response to push the output further.
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {prompt.followUps.map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink-muted">
                <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-signal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {prompt.pitfalls?.length ? (
        <section className="rounded-lg border border-hairline bg-surface-2/40 p-5">
          <h2 className="text-[0.9375rem] font-semibold text-ink">Where this goes wrong</h2>
          <p className="mt-1 text-[0.8125rem] text-ink-subtle">
            Observed during testing, with the fix for each.
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {prompt.pitfalls.map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink-muted">
                <span className="mt-0.5 shrink-0 text-warning">
                  <Icon name="alert" size={12} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { BorderBeam } from "border-beam";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useThemeAttribute } from "@/lib/use-theme";
import { cn } from "@/lib/cn";
import type { PromptCardData } from "@/lib/prompt-card";

interface PromptCardProps {
  prompt: PromptCardData;
  accent?: string;
  /** Compact variant used in dense grids such as the related prompts cluster. */
  compact?: boolean;
  /** Catalogue position, printed as a plate number. */
  index?: number;
}

/**
 * A prompt, presented as a specimen plate.
 *
 * The card this was adapted from set two file extensions large in mono as the
 * artwork, because on a converter directory the extensions are what someone is
 * matching against. Prompts have no equivalent, and the obvious substitute, the
 * prompt's name in larger text, would just be the caption printed twice.
 *
 * So the specimen here is the prompt's opening instruction, set in mono and
 * clamped to two lines. It is the one field guaranteed to differ between any
 * two prompts, which is what stops a twelve card grid reading as a list of
 * interchangeable tiles, and it is genuinely the most useful thing to show:
 * the opening line tells you what the prompt will actually make the model do.
 */
export function PromptCard({
  prompt,
  accent = "var(--color-signal)",
  compact,
  index,
}: PromptCardProps) {
  const [lit, setLit] = useState(false);
  const reduced = useReducedMotion();
  const theme = useThemeAttribute();

  return (
    <BorderBeam
      size="pulse-outside"
      colorVariant="colorful"
      theme={theme}
      borderRadius={16}
      active={lit && !reduced}
      strength={0.8}
      className="block h-full"
    >
      <motion.div
        whileHover={reduced ? undefined : { y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        onHoverStart={() => setLit(true)}
        onHoverEnd={() => setLit(false)}
        className="h-full"
      >
        <Link
          href={prompt.href}
          onFocus={() => setLit(true)}
          onBlur={() => setLit(false)}
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-canvas transition-colors duration-300 hover:border-hairline-strong",
            compact ? "p-4" : "p-5",
          )}
        >
          {!compact && <RegistrationTicks accent={accent} />}

          {/* ---- Plate header ------------------------------------------- */}
          <div className="relative flex items-center justify-between gap-2">
            <span
              className="truncate font-mono text-[0.625rem] uppercase tracking-[0.16em]"
              style={{ color: accent }}
            >
              {prompt.taskType}
              {prompt.variableCount > 0 && (
                <span className="text-ink-faint"> / {prompt.variableCount} var</span>
              )}
            </span>
            {index !== undefined && (
              <span className="shrink-0 font-mono text-[0.625rem] tabular-nums text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>

          {/* ---- The specimen ------------------------------------------- */}
          {!compact && (
            <div className="relative mt-3">
              <p className="line-clamp-2 font-mono text-[0.75rem] leading-[1.55] text-ink-muted">
                {prompt.opening}
              </p>

              {/* The rule under the specimen is the card's one moving part,
                  travelling left to right on hover. */}
              <span className="relative mt-3 flex h-px w-full items-center">
                <span className="absolute inset-0 bg-hairline-strong" />
                <motion.span
                  className="absolute inset-y-0 left-0 w-full origin-left"
                  style={{ background: accent }}
                  initial={false}
                  animate={{ scaleX: lit && !reduced ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </div>
          )}

          {/* ---- Caption ------------------------------------------------- */}
          <div className={cn("relative", compact ? "mt-2" : "mt-4")}>
            <h3
              className={cn(
                "font-medium tracking-[-0.015em] text-ink",
                compact ? "text-[0.875rem]" : "text-[0.9375rem]",
              )}
            >
              {prompt.name}
            </h3>
            <p
              className={cn(
                "mt-1.5 leading-relaxed text-ink-subtle",
                compact ? "line-clamp-2 text-[0.75rem]" : "text-[0.8125rem]",
              )}
            >
              {prompt.summary}
            </p>
          </div>

          {/* ---- Baseline ------------------------------------------------ */}
          {!compact && (
            <div className="relative mt-auto flex items-center gap-1.5 pt-5">
              <span
                className="text-[0.8125rem] font-medium transition-colors duration-300"
                style={{ color: lit ? accent : "var(--color-ink-muted)" }}
              >
                Open prompt
              </span>
              <Icon
                name="arrow-right"
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: lit ? accent : "var(--color-ink-faint)" }}
              />
            </div>
          )}
        </Link>
      </motion.div>
    </BorderBeam>
  );
}

/** Corner measurement marks, in the technical drawing language of the site. */
function RegistrationTicks({ accent }: { accent: string }) {
  const corners = [
    "left-2 top-2 border-l border-t",
    "right-2 top-2 border-r border-t",
    "left-2 bottom-2 border-b border-l",
    "right-2 bottom-2 border-b border-r",
  ];

  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {corners.map((corner) => (
        <span
          key={corner}
          className={cn(
            "absolute h-2.5 w-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            corner,
          )}
          style={{ borderColor: accent }}
        />
      ))}
    </span>
  );
}

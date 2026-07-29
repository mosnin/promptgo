"use client";

import Link from "next/link";
import { BorderBeam } from "border-beam";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useThemeAttribute } from "@/lib/use-theme";
import { cn } from "@/lib/cn";
import type { ToolCardData } from "@/lib/tool-card";

interface ToolCardProps {
  tool: ToolCardData;
  accent?: string;
  /** Compact variant used in dense grids such as the related tools cluster. */
  compact?: boolean;
  /** Catalogue position, printed as a plate number. */
  index?: number;
}

/**
 * A tool, presented as a specimen plate.
 *
 * The previous card put the name first and the formats last, in a translucent
 * rounded box with an arrow in a circle in the corner. That arrangement is
 * wrong twice over. It is wrong functionally, because someone scanning twelve
 * cards is matching file extensions and the extensions were the smallest thing
 * on the card. And the corner arrow button, the even vertical stack and the
 * single type weight are the exact set of defaults that make a card look like
 * nobody chose anything.
 *
 * So the conversion is now the artwork: the input and output set large in mono
 * with a rule running between them, filling the top half of the plate. The name
 * drops below the rule as a caption, which is what it actually is. Registration
 * ticks sit in the corners, borrowed from the technical drawing language the
 * rest of the site already uses, and the arrow becomes a line that travels when
 * you point at it rather than a button pretending to be clickable inside a card
 * that is entirely clickable.
 */
export function ToolCard({
  tool,
  accent = "var(--color-signal)",
  compact,
  index,
}: ToolCardProps) {
  const [lit, setLit] = useState(false);
  const reduced = useReducedMotion();
  const theme = useThemeAttribute();

  const inputs = tool.accepts ?? [];
  const from = inputs[0]?.replace(/^\./, "") ?? "any";
  const to = tool.outputs?.replace(/^\./, "") ?? "out";
  const extra = Math.max(inputs.length - 1, 0);

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
          href={tool.href}
          onFocus={() => setLit(true)}
          onBlur={() => setLit(false)}
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-canvas transition-colors duration-300 hover:border-hairline-strong",
            compact ? "p-4" : "p-5",
          )}
        >
          {/* Registration ticks. Two strokes per corner, drawn short of the
              edge so they read as measurement marks rather than a second
              border. */}
          {!compact && <RegistrationTicks accent={accent} />}

          {/* ---- Plate header ------------------------------------------- */}
          <div className="relative flex items-center justify-between gap-2">
            <span
              className="truncate font-mono text-[0.625rem] uppercase tracking-[0.16em]"
              style={{ color: accent }}
            >
              {from}
              {extra > 0 && <span className="text-ink-faint"> +{extra}</span>}
            </span>
            {index !== undefined && (
              <span className="shrink-0 font-mono text-[0.625rem] tabular-nums text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>

          {/* ---- The specimen ------------------------------------------- */}
          {!compact && (
            <div className="relative mt-3 flex items-center gap-3">
              <span className="font-mono text-[1.375rem] font-medium uppercase leading-none tracking-[-0.02em] text-ink">
                {from}
              </span>

              {/* The connector. It grows into the gap on hover, which is the
                  card's one moving part. */}
              <span className="relative flex h-px flex-1 items-center">
                <span className="absolute inset-0 bg-hairline-strong" />
                <motion.span
                  className="absolute inset-y-0 left-0 origin-left"
                  style={{ background: accent }}
                  initial={false}
                  animate={{ scaleX: lit && !reduced ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
                <span
                  className="absolute -right-px h-1.5 w-1.5 -translate-y-px rotate-45 border-r border-t transition-colors duration-300"
                  style={{ borderColor: lit ? accent : "var(--color-hairline-strong)" }}
                />
              </span>

              <span
                className="font-mono text-[1.375rem] font-medium uppercase leading-none tracking-[-0.02em] transition-colors duration-300"
                style={{ color: lit ? accent : "var(--color-ink-muted)" }}
              >
                {to}
              </span>
            </div>
          )}

          {/* ---- Caption ------------------------------------------------- */}
          <div className={cn("relative", compact ? "mt-2" : "mt-4 border-t border-hairline pt-4")}>
            <h3
              className={cn(
                "font-medium tracking-[-0.015em] text-ink",
                compact ? "text-[0.875rem]" : "text-[0.9375rem]",
              )}
            >
              {tool.name}
            </h3>
            <p
              className={cn(
                "mt-1.5 leading-relaxed text-ink-subtle",
                compact ? "line-clamp-2 text-[0.75rem]" : "text-[0.8125rem]",
              )}
            >
              {tool.summary}
            </p>
          </div>

          {/* ---- Baseline ------------------------------------------------ */}
          {!compact && (
            <div className="relative mt-auto flex items-center gap-1.5 pt-5">
              <span
                className="text-[0.8125rem] font-medium transition-colors duration-300"
                style={{ color: lit ? accent : "var(--color-ink-muted)" }}
              >
                Open tool
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

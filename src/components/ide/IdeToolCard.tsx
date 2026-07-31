"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { IdeToolCardData } from "@/lib/ide-tool-card";

interface IdeToolCardProps {
  tool: IdeToolCardData;
  accent?: string;
  compact?: boolean;
  index?: number;
}

/** A builder tool, presented as a specimen plate matching SkillCard, with a starter file count in place of an input count. */
export function IdeToolCard({ tool, accent = "var(--color-signal)", compact, index }: IdeToolCardProps) {
  const [lit, setLit] = useState(false);
  const reduced = useReducedMotion();

  return (
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
        <div className="relative flex items-center justify-between gap-2">
          <span
            className="truncate font-mono text-[0.625rem] uppercase tracking-[0.16em]"
            style={{ color: accent }}
          >
            {tool.fileCount} starter file{tool.fileCount === 1 ? "" : "s"}
          </span>
          {index !== undefined && (
            <span className="shrink-0 font-mono text-[0.625rem] tabular-nums text-ink-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        <div className={cn("relative", compact ? "mt-2" : "mt-4")}>
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

        {!compact && (
          <div className="relative mt-auto flex items-center gap-1.5 pt-5">
            <span
              className="text-[0.8125rem] font-medium transition-colors duration-300"
              style={{ color: lit ? accent : "var(--color-ink-muted)" }}
            >
              Open in the editor
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
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The proof band.
 *
 * Every figure here is countable from the catalogue, and that is a deliberate
 * limit rather than an oversight. A site published this week cannot honestly
 * claim active teams or requests per day, invented numbers are the sort of
 * claim that puts an advertising account at risk, and none of it is necessary:
 * the genuinely unusual fact about this catalogue is that the number of bytes
 * it receives is zero, and that one is true.
 *
 * The zero is given the largest card for the same reason. It is the only figure
 * on the page a competitor cannot match without rebuilding their product.
 */

interface Stat {
  value: string;
  unit?: string;
  label: string;
  body: string;
  span?: boolean;
  tone?: "signal" | "plain";
}

export function ProofBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3 sm:gap-4">
      {stats.map((stat, index) => (
        <ProofCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
}

function ProofCard({ stat, index }: { stat: Stat; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.75, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }
      }
      className={cn(stat.span && "md:col-span-2")}
    >
      <div
        className={cn(
          "lit relative h-full overflow-hidden rounded-xl border p-5 sm:p-6",
          stat.tone === "signal"
            ? "border-[color-mix(in_oklch,var(--color-signal)_38%,transparent)] bg-[color-mix(in_oklch,var(--color-signal)_12%,transparent)]"
            : "border-hairline bg-surface-2/40",
        )}
      >
        {stat.tone === "signal" && (
          <span
            aria-hidden
            className="glow pointer-events-none absolute inset-x-0 -top-24 h-48"
          />
        )}

        <div className="relative flex items-baseline gap-2">
          <p
            className={cn(
              "text-4xl font-semibold tracking-[-0.04em] tabular-nums sm:text-6xl",
              stat.tone === "signal" ? "text-signal-bright" : "text-ink",
            )}
          >
            {stat.value}
          </p>
          {stat.unit && (
            <span
              className={cn(
                "text-2xl font-medium sm:text-4xl",
                stat.tone === "signal" ? "text-signal-bright/90" : "text-ink/90",
              )}
            >
              {stat.unit}
            </span>
          )}
          <span className="ml-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
            {stat.label}
          </span>
        </div>

        <p className="relative mt-3 text-[0.8125rem] leading-relaxed text-ink-subtle sm:text-[0.875rem]">
          {stat.body}
        </p>
      </div>
    </motion.div>
  );
}

export function ProofHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 max-w-3xl text-[1.75rem] font-semibold tracking-[-0.035em] text-ink sm:text-[2.5rem]">
          {title}
        </h2>
      </div>
      {children && <div className="max-w-sm">{children}</div>}
    </div>
  );
}

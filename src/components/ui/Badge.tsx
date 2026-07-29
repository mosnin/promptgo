import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "signal" | "success";
}

const tones = {
  neutral: "border-hairline bg-surface-2 text-ink-subtle",
  signal:
    "border-[color-mix(in_oklch,var(--color-signal)_40%,transparent)] bg-[color-mix(in_oklch,var(--color-signal)_12%,transparent)] text-signal-bright",
  success:
    "border-[color-mix(in_oklch,var(--color-success)_38%,transparent)] bg-[color-mix(in_oklch,var(--color-success)_12%,transparent)] text-success",
} as const;

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

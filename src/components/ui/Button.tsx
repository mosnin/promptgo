"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { spring } from "@/components/motion/tokens";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-signal-ink hover:bg-signal-bright shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_8px_24px_-8px_color-mix(in_oklch,var(--color-signal)_65%,transparent)]",
  secondary:
    "bg-surface-2 text-ink border border-hairline hover:border-hairline-strong hover:bg-surface-3",
  outline:
    "border border-hairline-strong text-ink hover:bg-surface-2 hover:border-signal",
  ghost: "text-ink-muted hover:text-ink hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem] gap-1.5 rounded-full",
  md: "h-11 px-5 text-sm gap-2 rounded-full",
  lg: "h-13 px-6.5 text-[0.9375rem] gap-2.5 rounded-full",
};

const base =
  "relative inline-flex select-none items-center justify-center font-medium tracking-[-0.01em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, keyof CommonProps>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      whileHover={reduced ? undefined : { y: -1 }}
      whileTap={reduced ? undefined : { scale: 0.975 }}
      transition={spring.snappy}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(props as ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}

type ButtonLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      whileHover={reduced ? undefined : { y: -1 }}
      whileTap={reduced ? undefined : { scale: 0.975 }}
      transition={spring.snappy}
      className="inline-flex"
    >
      <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </Link>
    </motion.span>
  );
}

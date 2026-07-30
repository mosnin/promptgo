"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";

/**
 * The three steps, and the one that is missing.
 *
 * The whole argument for this site is an absence: there is no signup and no
 * gate between finding a prompt and using it. An absence is difficult to
 * illustrate, so the section shows the omitted step explicitly, struck through
 * and greyed, sitting where every other prompt library would put it. Naming the
 * thing that is not happening lands harder than three cheerful steps that could
 * describe any prompt on the internet.
 *
 * The connector between steps draws itself as the section enters, left to
 * right, so the sequence reads in order rather than arriving all at once.
 */

const STEPS = [
  {
    n: "01",
    title: "Find the prompt",
    body: "Search or browse by category and pick the one built for the exact job, not a generic version of it.",
    icon: "search" as const,
  },
  {
    n: "02",
    title: "Fill in the blanks",
    body: "Every token in the prompt becomes a field on the page. Type your details in, or use the examples to see it filled instantly.",
    icon: "wand" as const,
  },
  {
    n: "03",
    title: "Copy the finished prompt",
    body: "The output box holds a complete prompt with your details already in it, ready to paste into whatever model you use.",
    icon: "copy" as const,
  },
];

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section className="shell py-16 sm:py-20">
      <div className="flex items-center gap-2 text-[0.8125rem] text-ink-subtle">
        <Icon name="bolt" size={15} />
        <span>How it works</span>
      </div>

      <h2 className="mt-2 max-w-3xl text-[2rem] font-medium leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl">
        Three steps, and one that never happens.
      </h2>

      <div className="relative mt-12">
        {/* The spine. Drawn rather than faded, so the eye follows it in order. */}
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-transparent via-hairline-strong to-transparent lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduced ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <ol className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {STEPS.map((step, index) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.15 + index * 0.14, ease: [0.16, 1, 0.3, 1] }
              }
              className="relative"
            >
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-canvas text-signal-bright">
                <Icon name={step.icon} size={18} />
              </span>

              <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
                {step.n}
              </p>
              <h3 className="mt-2 text-[1.0625rem] font-medium tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2 max-w-sm text-[0.875rem] leading-relaxed text-ink-subtle">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* The omitted step. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={reduced ? { duration: 0 } : { duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 flex flex-col gap-4 rounded-xl border border-dashed border-hairline-strong p-6 sm:flex-row sm:items-center sm:gap-6"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed border-hairline-strong text-ink-faint">
          <Icon name="close" size={18} />
        </span>
        <div>
          <p className="text-[1.0625rem] font-medium tracking-[-0.02em] text-ink-faint line-through decoration-1">
            Sign up, verify your email, then hit the paywall
          </p>
          <p className="mt-2 max-w-2xl text-[0.875rem] leading-relaxed text-ink-subtle">
            This is the step most prompt libraries put between finding a prompt and using one,
            and it is the reason you close the tab. There is no account here, no gated download
            and no email capture. The prompt is on the page. It does not exist here.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";

/**
 * A fanned stack of claims, each with the method for checking it.
 *
 * This sits where a review wall would go and does the job a review wall is
 * meant to do, which is to make a stranger willing to hand over a file. Reviews
 * do that by borrowing other people's trust. A site published this week has
 * none to borrow, and manufacturing it means inventing named people, employers
 * and star ratings, which is deceptive advertising rather than a design
 * decision.
 *
 * The substitute is stronger than a fabricated quote anyway: every card states
 * something checkable and tells the reader exactly how to check it. A claim a
 * sceptic can disprove in ten seconds and fails to is worth more than five
 * stars from a person who does not exist.
 *
 * The cards fan out from the centre, tilt back on hover, and lift the hovered
 * one clear of its neighbours.
 */

const CLAIMS = [
  {
    icon: "lock" as const,
    claim: "Nothing you convert is uploaded.",
    method:
      "Open your browser's network panel, convert a file, and watch the request list. No upload appears, because there is no endpoint to upload to.",
    label: "Check the network panel",
    rotate: -10,
  },
  {
    icon: "bolt" as const,
    claim: "The prompts keep working with the network off.",
    method:
      "Load any prompt page, switch to airplane mode, then convert a file. Everything the prompt needs is already in the tab, so it finishes normally.",
    label: "Try it offline",
    rotate: -3,
  },
  {
    icon: "check" as const,
    claim: "No account, no watermark, no cap.",
    method:
      "There is no signup form anywhere on the site, no output carries a mark, and the only ceiling on file size is your own device memory.",
    label: "Look for the signup",
    rotate: 5,
  },
];

export function VerifyStack() {
  const reduced = useReducedMotion();

  return (
    <section className="shell py-16 sm:py-24">
      <div className="mb-12 text-center">
        <p className="eyebrow">Instead of testimonials</p>
        <h2 className="mt-2 text-[1.75rem] font-medium tracking-[-0.035em] text-ink sm:text-4xl">
          Three claims you can check yourself
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[0.875rem] leading-relaxed text-ink-subtle">
          Every one of these is verifiable from your own browser in under a minute, which is
          worth more than a quote you would have to take on faith.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-0">
        {CLAIMS.map((item, index) => (
          <motion.div
            key={item.claim}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: reduced ? 0 : item.rotate }}
            viewport={{ once: true, amount: 0.3 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }
            }
            whileHover={reduced ? undefined : { rotate: 0, y: -14, zIndex: 20, scale: 1.03 }}
            style={{ zIndex: index }}
            className="relative w-full max-w-[21rem] lg:-mx-6"
          >
            <div className="lit grain relative h-full overflow-hidden rounded-xl border border-hairline bg-[color-mix(in_oklch,var(--color-surface)_82%,transparent)] p-6 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-hairline bg-surface-2 text-signal-bright">
                <Icon name={item.icon} size={16} />
              </span>

              <p className="mt-5 text-[1.0625rem] font-medium leading-snug tracking-[-0.02em] text-ink">
                {item.claim}
              </p>

              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-subtle">
                {item.method}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-hairline pt-3">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                  {item.label}
                </span>
                <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-success">
                  <Icon name="check" size={12} />
                  Verifiable
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

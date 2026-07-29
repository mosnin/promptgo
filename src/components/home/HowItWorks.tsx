"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";

/**
 * The three steps, and the one that is missing.
 *
 * The whole argument for this site is an absence: there is no upload and no
 * queue between choosing a file and getting it back. An absence is difficult to
 * illustrate, so the section shows the omitted step explicitly, struck through
 * and greyed, sitting where every other converter would put it. Naming the
 * thing that is not happening lands harder than three cheerful steps that could
 * describe any tool on the internet.
 *
 * The connector between steps draws itself as the section enters, left to
 * right, so the sequence reads in order rather than arriving all at once.
 */

const STEPS = [
  {
    n: "01",
    title: "Choose a file",
    body: "Drop it on the page or pick it from disk. The browser hands the tool a reference to the file on your own device.",
    icon: "upload" as const,
  },
  {
    n: "02",
    title: "The work happens in the tab",
    body: "Your processor does the decoding and encoding, using the same engines the browser uses to display media. Nothing is queued behind anyone else.",
    icon: "bolt" as const,
  },
  {
    n: "03",
    title: "Download the result",
    body: "The output is written straight to your downloads folder. Close the tab and nothing of it remains anywhere.",
    icon: "download" as const,
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
            Upload your file to our servers and wait in the queue
          </p>
          <p className="mt-2 max-w-2xl text-[0.875rem] leading-relaxed text-ink-subtle">
            This is the step every other converter puts between step one and step three, and it
            is the one that costs you upload time, imposes the file size cap and puts a copy of
            your document on hardware you do not control. It is not slow here. It does not exist
            here.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

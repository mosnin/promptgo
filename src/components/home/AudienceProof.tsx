"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import type { CategoryIcon } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * Who the catalogue is built for.
 *
 * This occupies the slot a testimonial wall usually takes, and deliberately is
 * not one. Attributed quotes from named people with star ratings would have to
 * be invented, and invented endorsements are not a grey area: they breach
 * Google's policies on a site being put up for AdSense review, they are
 * regulated as deceptive advertising in the US, UK and EU, and the first person
 * who searches one of the names finds nothing. A brand new site has no
 * customers to quote yet, which is a timing problem, not a design problem.
 *
 * So the same layout carries what is actually true: the audiences the prompts
 * were built around, the job each one does, and the prompts they reach for. The
 * pull quotes are statements about the product in the site's own voice rather
 * than words placed in a stranger's mouth. When real testimonials exist, they
 * drop into this grid without redesigning it.
 */

interface Audience {
  role: string;
  context: string;
  claim: string;
  body: string;
  href: string;
  hrefLabel: string;
  accent: string;
  icon: CategoryIcon;
}

const AUDIENCES: Audience[] = [
  {
    role: "Sales teams",
    context: "Outbound that gets answered",
    claim: "A cold email prompt that refuses to write from a company name alone.",
    body: "Research first, then a short message built on one checkable observation. Several of these stop and ask for better input rather than producing the email everyone has already deleted.",
    href: "/sales-prompts",
    hrefLabel: "Sales prompts",
    accent: "var(--color-accent-rose)",
    icon: "handshake",
  },
  {
    role: "Marketers",
    context: "Copy that has to earn a click",
    claim: "Five ad variants that argue different cases, not five rewordings.",
    body: "Angle tests you can learn from, personas tagged by what you evidenced rather than guessed, and a positioning statement that fails itself when a competitor could make the same claim.",
    href: "/marketing-prompts",
    hrefLabel: "Marketing prompts",
    accent: "var(--color-accent-violet)",
    icon: "megaphone",
  },
  {
    role: "Engineers",
    context: "The review nobody has time for",
    claim: "Assume a bug exists and produce the input that triggers it.",
    body: "Adversarial framing beats asking a model whether your code looks fine, because asking invites agreement. These state what they cannot verify from the code you pasted.",
    href: "/coding-prompts",
    hrefLabel: "Coding prompts",
    accent: "var(--color-accent-lime)",
    icon: "code",
  },
  {
    role: "Managers and operators",
    context: "The documents nobody enjoys writing",
    claim: "Meeting notes that keep unowned actions visibly unowned.",
    body: "Decision memos that name what you give up, reviews tied to dated evidence, and post mortems that reject any cause which reduces to a person being careless.",
    href: "/business-prompts",
    hrefLabel: "Business prompts",
    accent: "var(--color-signal)",
    icon: "briefcase",
  },
];

export function AudienceProof({ promptCount }: { promptCount: number }) {
  const reduced = useReducedMotion();

  return (
    <section className="shell py-16 sm:py-24">
      <div className="flex items-center gap-2 text-[0.8125rem] text-ink-subtle">
        <Icon name="spark" size={15} />
        <span>Who it is for</span>
      </div>

      <div className="mt-2">
        <h2 className="text-[2.75rem] font-medium leading-[0.9] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
          Built for.
        </h2>
        <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-ink-subtle sm:text-[0.9375rem]">
          Four kinds of work the catalogue was shaped around. No invented
          testimonials and no star ratings: the site launched this week, so the
          honest version is who it was built for rather than who has praised it.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {AUDIENCES.map((audience, index) => (
          <motion.article
            key={audience.role}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }
            }
            className="group/aud relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-xl border border-hairline bg-surface-2/40 p-5 backdrop-blur-lg transition-colors duration-300 hover:border-hairline-strong sm:p-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/aud:opacity-100"
              style={{
                background: `radial-gradient(100% 70% at 50% 0%, color-mix(in oklch, ${audience.accent} 16%, transparent), transparent 65%)`,
              }}
            />

            <div className="relative">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline"
                style={{
                  color: audience.accent,
                  background: `color-mix(in oklch, ${audience.accent} 12%, transparent)`,
                }}
              >
                <Icon name={audience.icon} size={15} />
              </span>

              <p className="mt-4 text-[0.9375rem] font-medium leading-tight tracking-[-0.015em] text-ink">
                {audience.role}
              </p>
              <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                {audience.context}
              </p>
            </div>

            <p
              className={cn(
                "relative my-6 text-[1.375rem] font-normal leading-snug tracking-[-0.03em] text-ink",
                "sm:text-[1.5rem]",
              )}
            >
              {audience.claim}
            </p>

            <div className="relative">
              <p className="text-[0.8125rem] leading-relaxed text-ink-subtle">{audience.body}</p>
              <Link
                href={audience.href}
                className="group/link mt-5 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-hairline bg-surface text-[0.8125rem] font-medium text-ink transition-colors duration-200 hover:bg-surface-3"
              >
                {audience.hrefLabel}
                <Icon
                  name="arrow-right"
                  size={13}
                  className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="mt-6 text-[0.8125rem] text-ink-faint">
        All {promptCount} prompts are free and run entirely in your browser.
      </p>
    </section>
  );
}

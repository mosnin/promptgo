"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
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
  icon: "image" | "code" | "document" | "waveform" | "globe" | "palette";
}

const AUDIENCES: Audience[] = [
  {
    role: "Photographers and retouchers",
    context: "Batch format work",
    claim: "A folder of HEIC files becomes JPEGs without a single upload.",
    body: "Convert, resize and compress an entire shoot locally, at full quality, with no watermark and no per file cap.",
    href: "/image-conversion",
    hrefLabel: "Image conversion",
    accent: "var(--color-signal)",
    icon: "image",
  },
  {
    role: "Developers",
    context: "The small jobs between commits",
    claim: "The detour that interrupts a build, handled in the tab already open.",
    body: "Format a payload, decode a token, minify a stylesheet or turn an SVG into a typed component without installing a package for a one off.",
    href: "/developer-prompts",
    hrefLabel: "Developer prompts",
    accent: "var(--color-accent-lime)",
    icon: "code",
  },
  {
    role: "Legal, finance and admin teams",
    context: "Documents that cannot leave the building",
    claim: "A contract never touches hardware you do not control.",
    body: "Merge, split, compress and convert PDFs on your own machine, which is the only version of this that survives a confidentiality review.",
    href: "/pdf-and-documents",
    hrefLabel: "PDF and documents",
    accent: "var(--color-accent-rose)",
    icon: "document",
  },
  {
    role: "Marketers and SEO teams",
    context: "Shipping pages that rank",
    claim: "Meta tags, canonicals and Open Graph built in the browser.",
    body: "Generate the technical markup a page needs and check it before it ships, without a subscription to a suite you use twice a month.",
    href: "/web-and-seo",
    hrefLabel: "Web and SEO",
    accent: "var(--color-accent-violet)",
    icon: "globe",
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

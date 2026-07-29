"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { CategoryMark } from "@/components/ui/CategoryMark";
import { Icon } from "@/components/ui/Icon";
import type { CategoryIcon } from "@/lib/types";

export interface ShowcaseCategory {
  slug: string;
  name: string;
  icon: CategoryIcon;
  accent: string;
  intro: string;
  count: number;
  prompts: { name: string; href: string }[];
}

export function CategoryShowcase({ categories }: { categories: ShowcaseCategory[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {categories.map((category, index) => (
        <ShowcaseCard key={category.slug} category={category} index={index} />
      ))}
    </div>
  );
}

/**
 * One category, presented as a specimen card.
 *
 * Three things are doing work here and each earns its place.
 *
 * The card tilts toward the pointer. The rotation is tiny, four degrees at the
 * extremes, and runs through a spring rather than tracking the cursor exactly,
 * which is the difference between a surface responding to you and a sheet of
 * paper stuck to your finger. Perspective sits on the wrapper rather than the
 * card so the vanishing point stays put while the card moves inside it.
 *
 * The accent glow follows the pointer as a separate layer, so the light source
 * and the tilt agree about where your hand is.
 *
 * The prompt list is a transport rather than a truncated list. Ten prompts in a
 * card either overflow it or get cut to four with a "more" link that nobody
 * follows; scrolling them means the full inventory passes under the eye in the
 * space of four rows, and the reason it stops on hover is so that reading one
 * is possible at all.
 */
function ShowcaseCard({
  category,
  index,
}: {
  category: ShowcaseCategory;
  index: number;
}) {
  const reduced = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-4, 4]), springConfig);

  const glowX = useTransform(pointerX, (value) => `${value * 100}%`);
  const glowY = useTransform(pointerY, (value) => `${value * 100}%`);
  const glow = useMotionTemplate`radial-gradient(60% 60% at ${glowX} ${glowY}, color-mix(in oklch, ${category.accent} 20%, transparent), transparent 70%)`;

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  }

  function onPointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  // Duplicated so the ticker loop closes on an identical frame. Short lists
  // would otherwise leave a gap halfway through the cycle.
  const ticker = category.prompts.length > 0 ? [...category.prompts, ...category.prompts] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="h-full"
    >
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group/cat relative flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface-2/35 p-6 transition-colors duration-300 hover:border-hairline-strong sm:p-7"
      >
        <motion.span
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/cat:opacity-100"
        />

        <div className="relative flex items-start gap-5">
          <CategoryMark icon={category.icon} accent={category.accent} size={92} />

          <div className="min-w-0 flex-1 pt-1">
            <Link
              href={`/${category.slug}`}
              className="text-[1.375rem] font-semibold tracking-[-0.028em] text-ink"
            >
              <span className="absolute inset-0" aria-hidden />
              {category.name}
            </Link>

            <div className="mt-2 flex items-baseline gap-2">
              <span
                className="font-mono text-[1.75rem] font-medium leading-none tabular-nums"
                style={{ color: category.accent }}
              >
                {String(category.count).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                prompts
              </span>
            </div>
          </div>
        </div>

        <p className="relative mt-5 text-[0.875rem] leading-relaxed text-ink-subtle">
          {category.intro}
        </p>

        {ticker.length > 0 && (
          <div className="ticker edge-fade-y relative mt-5 h-[7.5rem] overflow-hidden">
            <div
              className="ticker-track"
              style={{
                ["--ticker-duration" as string]: `${Math.max(18, category.prompts.length * 2.4)}s`,
              }}
            >
              {ticker.map((prompt, tickerIndex) => {
                // Second half of the loop renders as a span. See ToolMarquee:
                // duplicating anchors for a seamless transport multiplies the
                // internal links a crawler sees for the same URL.
                const copy = tickerIndex >= category.prompts.length;
                const className =
                  "relative z-10 flex items-center gap-2 py-[0.3125rem] text-[0.8125rem] text-ink-subtle transition-colors duration-200 hover:text-ink";
                const body = (
                  <>
                    <span
                      className="h-1 w-1 shrink-0 rounded-full"
                      style={{ background: category.accent }}
                    />
                    <span className="truncate">{prompt.name}</span>
                  </>
                );

                return copy ? (
                  <span key={`${prompt.href}-${tickerIndex}`} aria-hidden className={className}>
                    {body}
                  </span>
                ) : (
                  <Link key={prompt.href} href={prompt.href} className={className}>
                    {body}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <Link
          href={`/${category.slug}`}
          className="group/cta relative z-10 mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium"
          style={{ color: category.accent }}
        >
          All {category.name.toLowerCase()}
          <Icon
            name="arrow-right"
            size={14}
            className="transition-transform duration-200 group-hover/cta:translate-x-1"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

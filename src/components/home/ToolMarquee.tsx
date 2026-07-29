"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export interface MarqueeTool {
  name: string;
  href: string;
  summary: string;
  category: string;
  accent: string;
}

/**
 * Two counter running rows of tool cards.
 *
 * The direction split is the whole point. A single moving row reads as a
 * decoration that happens to contain links; two rows travelling against each
 * other read as a catalogue being turned over, and the opposing motion makes
 * any individual card easier to fix on rather than harder, because the eye
 * gets a stationary reference from the row above.
 *
 * The track is duplicated and translated exactly half its width, so the loop
 * closes on an identical frame with no seam. aria-hidden on the second copy
 * keeps the duplication out of the accessibility tree, and the row pauses on
 * hover and on keyboard focus so a link is never a moving target.
 */
export function ToolMarquee({ tools }: { tools: MarqueeTool[] }) {
  const half = Math.ceil(tools.length / 2);
  const rows = [tools.slice(0, half), tools.slice(half)];

  return (
    <div className="space-y-4">
      {rows.map((row, index) => (
        <MarqueeRow
          key={index}
          tools={row}
          reverse={index === 1}
          duration={index === 0 ? 52 : 64}
        />
      ))}
    </div>
  );
}

function MarqueeRow({
  tools,
  reverse,
  duration,
}: {
  tools: MarqueeTool[];
  reverse: boolean;
  duration: number;
}) {
  if (tools.length === 0) return null;

  return (
    <div className="marquee edge-fade-x relative overflow-hidden">
      <div
        className={cn(
          "marquee-track flex w-max gap-4",
          reverse && "marquee-track-reverse",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-4" aria-hidden={copy === 1}>
            {tools.map((tool) => (
              <MarqueeCard key={`${copy}-${tool.href}`} tool={tool} inert={copy === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MarqueeCard({ tool, inert }: { tool: MarqueeTool; inert: boolean }) {
  const reduced = useReducedMotion();

  // The duplicate half of the track is a div, not a link. A seamless loop needs
  // the content twice, but aria-hidden only hides the copy from assistive
  // technology: a crawler still sees a second anchor to the same URL, and with
  // both transports duplicating there were six anchors per tool on this page.
  // Rendering the copy as a plain element keeps the loop and drops the
  // duplicates.
  const Card = inert ? "div" : Link;
  const linkProps = inert ? {} : { href: tool.href };

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      className="w-[19rem] shrink-0"
    >
      <Card
        {...(linkProps as { href: string })}
        className="group/card relative flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface-2/40 p-5 transition-colors duration-300 hover:border-hairline-strong hover:bg-surface-2"
      >
        {/* A wash of the category accent that only resolves on hover, so a
            stationary row of cards is calm and the one under the pointer is
            unmistakable. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(120% 100% at 0% 0%, color-mix(in oklch, ${tool.accent} 16%, transparent), transparent 60%)`,
          }}
        />
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-400 group-hover/card:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${tool.accent}, transparent)`,
          }}
        />

        <div className="relative flex items-start justify-between gap-3">
          <span
            className="font-mono text-[0.625rem] uppercase tracking-[0.14em]"
            style={{ color: tool.accent }}
          >
            {tool.category}
          </span>
          <Icon
            name="arrow-up-right"
            size={14}
            className="shrink-0 -translate-x-1 text-ink-faint opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100"
          />
        </div>

        <p className="relative mt-3 text-[0.9375rem] font-medium tracking-[-0.015em] text-ink">
          {tool.name}
        </p>
        <p className="relative mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-subtle">
          {tool.summary}
        </p>
      </Card>
    </motion.div>
  );
}

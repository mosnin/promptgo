"use client";

import { BorderBeam } from "border-beam";
import { ThinkingOrb } from "thinking-orbs";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useThemeAttribute } from "@/lib/use-theme";

/**
 * The hero surface: an animated beam framing the section, and an orb blown up
 * behind the copy as an ambient field.
 *
 * The orb ships at a fixed 64px canvas, so the backdrop is a CSS scale of that
 * canvas rather than a larger render. Scaling a particle field is forgiving in
 * a way that scaling type or an icon would not be: the dots simply become soft
 * blooms, which is the intended effect anyway. It is pushed to a low opacity
 * and marked aria-hidden so it never competes with the headline or reaches the
 * accessibility tree.
 *
 * Both effects freeze under a reduced motion preference: the orb pauses on a
 * still frame and the beam stops animating, rather than the section losing its
 * composition entirely.
 */
export function HeroFrame({ children }: { children: ReactNode }) {
  const theme = useThemeAttribute();
  const reduced = useReducedMotion() ?? false;

  return (
    <BorderBeam
      size="pulse-outside"
      colorVariant="colorful"
      theme={theme}
      borderRadius={0}
      active={!reduced}
      strength={0.55}
      className="block"
    >
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden />
        <div className="glow pointer-events-none absolute inset-x-0 -top-40 h-[38rem]" aria-hidden />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {/* Blurred hard, because a 64px canvas scaled this far renders each
              particle as a crisp square. The blur is what turns those squares
              back into the soft blooms the effect is meant to read as. */}
          <div className="scale-[9] opacity-[0.16] blur-[3px] sm:scale-[11]">
            <ThinkingOrb state="shaping" size={64} speed={0.55} paused={reduced} />
          </div>
        </div>

        <div className="grain pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative">{children}</div>
      </section>
    </BorderBeam>
  );
}

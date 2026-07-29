"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactElement } from "react";
import type { CategoryIcon } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * Display marks for the ten categories.
 *
 * These are deliberately a separate system from Icon, not the same drawings
 * scaled up. A 16px glyph survives by discarding everything except silhouette;
 * at 96px that same shape reads as a blank slab, because there is nothing
 * inside it for the eye to travel over. So these are drawn the other way round:
 * thin strokes, real interior structure, and geometry that depicts the
 * transformation the category performs rather than a noun associated with it.
 * Image conversion is pixels crossing between two frames, not a photograph.
 * Developer prompts is a caret advancing through code, not a wrench.
 *
 * Every mark is built from one vocabulary so the ten read as a family: a 96
 * unit canvas, a rounded plate at 1.25 stroke that draws itself in, and
 * interior geometry in the category accent at 2. Each carries one perpetual
 * motion, slow enough to notice only on a second look.
 *
 * Everything here is driven by variants and nothing by a bare animate prop.
 * That is a hard constraint rather than a style preference: a motion element
 * with its own animate object stops passing variant labels to its children, so
 * a single loop declared the convenient way orphans every shape beneath it and
 * the mark renders blank. Loops are therefore expressed as variant transitions
 * with repeat, which keeps the whole tree reachable from the root.
 */

interface MarkProps {
  icon: CategoryIcon;
  accent: string;
  size?: number;
  className?: string;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Stroke drawing itself on, staggered so the ten feel like one hand. */
function draw(index: number, reduced: boolean): Variants {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.9, delay: 0.06 * index, ease: EASE_OUT },
    },
  };
}

/** Fill appearing by scale rather than stroke, for solid shapes. */
function pop(index: number, reduced: boolean, origin = 1): Variants {
  return {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: origin,
      scale: 1,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.6, delay: 0.1 + 0.06 * index, ease: EASE_OUT },
    },
  };
}

/** A perpetual motion, expressed as a variant so propagation is preserved. */
function cycle(
  keyframes: Record<string, number[]>,
  duration: number,
  reduced: boolean,
  delay = 0,
): Variants {
  if (reduced) return { initial: {}, animate: {} };
  return {
    initial: {},
    animate: {
      ...keyframes,
      transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
    },
  };
}

export function CategoryMark({ icon, accent, size = 96, className }: MarkProps) {
  const reduced = useReducedMotion() ?? false;
  const Mark = MARKS[icon];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      focusable="false"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.4 }}
      className={cn("overflow-visible", className)}
      style={{ color: accent }}
    >
      {/* The plate. Common to all ten, and the thing that makes a row of marks
          scan as a set rather than ten unrelated illustrations. */}
      <motion.rect
        x="8"
        y="8"
        width="80"
        height="80"
        rx="22"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.25"
        variants={draw(0, reduced)}
      />
      <Mark reduced={reduced} />
    </motion.svg>
  );
}

interface SubMarkProps {
  reduced: boolean;
}

/* ==========================================================================
   Image conversion: pixels crossing between two frames
   ========================================================================== */

function ImageMark({ reduced }: SubMarkProps) {
  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.rect x="20" y="30" width="26" height="26" rx="5" variants={draw(1, reduced)} />
      <motion.rect
        x="50"
        y="40"
        width="26"
        height="26"
        rx="5"
        strokeDasharray="4 4"
        strokeOpacity="0.55"
        variants={draw(2, reduced)}
      />
      {/* Contents of the source frame: a horizon and a sun. */}
      <motion.path d="M24 50l7-7 6 6 5-4" variants={draw(3, reduced)} />
      <motion.circle cx="38" cy="37" r="2.5" variants={draw(4, reduced)} />
      {/* Three pixels making the crossing, staggered into a stream. */}
      {[0, 1, 2].map((index) => (
        <motion.rect
          key={index}
          x="44"
          y="42"
          width="4"
          height="4"
          rx="1"
          fill="currentColor"
          stroke="none"
          variants={cycle(
            { x: [0, 18], y: [0, 8], opacity: [0, 1, 1, 0] },
            1.8,
            reduced,
            index * 0.45,
          )}
        />
      ))}
    </g>
  );
}

/* ==========================================================================
   Image editing: a crop frame closing on a subject
   ========================================================================== */

function WandMark({ reduced }: SubMarkProps) {
  const corners = [
    "M28 38v-6a2 2 0 0 1 2-2h6",
    "M60 30h6a2 2 0 0 1 2 2v6",
    "M68 58v6a2 2 0 0 1-2 2h-6",
    "M36 66h-6a2 2 0 0 1-2-2v-6",
  ];

  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.g
        variants={cycle({ scale: [1, 0.93, 1] }, 4.2, reduced)}
        style={{ transformOrigin: "48px 48px" }}
      >
        {corners.map((d, index) => (
          <motion.path key={d} d={d} variants={draw(1 + index, reduced)} />
        ))}
      </motion.g>

      <motion.circle cx="48" cy="48" r="9" strokeOpacity="0.5" variants={draw(5, reduced)} />
      <motion.path d="M42 52l4-4 3 3 5-5" variants={draw(6, reduced)} />
    </g>
  );
}

/* ==========================================================================
   PDF and documents: sheets fanning out of a stack
   ========================================================================== */

function DocumentMark({ reduced }: SubMarkProps) {
  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {[2, 1, 0].map((depth) => (
        <motion.g
          key={depth}
          variants={cycle(
            { x: [0, -depth * 2, 0], y: [0, depth * 1.5, 0] },
            5,
            reduced,
            depth * 0.2,
          )}
        >
          <motion.rect
            x={30 - depth * 4}
            y={26 + depth * 3}
            width="30"
            height="40"
            rx="4"
            strokeOpacity={depth === 0 ? 1 : 0.35 - depth * 0.08}
            variants={draw(1 + depth, reduced)}
          />
        </motion.g>
      ))}
      {/* Ruled lines on the front sheet, drawn as if being typed. */}
      {[38, 45, 52, 59].map((y, index) => (
        <motion.path
          key={y}
          d={`M36 ${y}h${index === 3 ? 12 : 18}`}
          strokeOpacity="0.65"
          variants={draw(4 + index, reduced)}
        />
      ))}
    </g>
  );
}

/* ==========================================================================
   Developer prompts: a caret advancing through code
   ========================================================================== */

function CodeMark({ reduced }: SubMarkProps) {
  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M34 38l-9 10 9 10" variants={draw(1, reduced)} />
      <motion.path d="M62 38l9 10-9 10" variants={draw(2, reduced)} />
      <motion.path d="M53 34l-10 28" strokeOpacity="0.5" variants={draw(3, reduced)} />
      {/* The caret, blinking on the cadence a terminal does. */}
      <motion.rect
        x="45"
        y="44"
        width="2.5"
        height="9"
        rx="1"
        fill="currentColor"
        stroke="none"
        variants={
          reduced
            ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
            : {
                initial: { opacity: 0 },
                animate: {
                  opacity: [1, 1, 0, 0],
                  transition: { duration: 1.1, repeat: Infinity, times: [0, 0.49, 0.5, 1] },
                },
              }
        }
      />
    </g>
  );
}

/* ==========================================================================
   Text and writing: a glyph on a baseline grid
   ========================================================================== */

function TypeMark({ reduced }: SubMarkProps) {
  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Cap height, x height and baseline: the scaffolding a typesetter sees. */}
      {[32, 44, 64].map((y, index) => (
        <motion.path
          key={y}
          d={`M22 ${y}h52`}
          strokeWidth="1"
          strokeOpacity={y === 64 ? 0.6 : 0.28}
          strokeDasharray={y === 64 ? undefined : "3 4"}
          variants={draw(1 + index, reduced)}
        />
      ))}
      <motion.path d="M36 64l12-32 12 32" variants={draw(4, reduced)} />
      <motion.path d="M40.5 54h15" variants={draw(5, reduced)} />
      {/* Cursor tracking along the baseline. */}
      <motion.rect
        x="24"
        y="57"
        width="2"
        height="7"
        rx="1"
        fill="currentColor"
        stroke="none"
        variants={cycle({ x: [0, 46, 0], opacity: [0, 1, 1, 0] }, 5.5, reduced)}
      />
    </g>
  );
}

/* ==========================================================================
   Data and formats: rows resolving into structure
   ========================================================================== */

function DatabaseMark({ reduced }: SubMarkProps) {
  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.rect x="24" y="28" width="48" height="40" rx="5" variants={draw(1, reduced)} />
      <motion.path d="M24 40h48" variants={draw(2, reduced)} />
      <motion.path d="M44 40v28" strokeOpacity="0.45" variants={draw(3, reduced)} />

      {/* A highlight scanning the rows, the way a query walks a table. */}
      {[47, 56].map((y, index) => (
        <motion.rect
          key={`scan${y}`}
          x="25"
          y={y}
          width="46"
          height="8"
          fill="currentColor"
          stroke="none"
          variants={cycle({ opacity: [0, 0.16, 0] }, 2.4, reduced, index * 0.7)}
        />
      ))}

      {[47, 56].map((y, index) => (
        <g key={`row${y}`}>
          <motion.path
            d={`M30 ${y + 4}h9`}
            strokeOpacity="0.7"
            strokeWidth="1.5"
            variants={draw(4 + index * 2, reduced)}
          />
          <motion.path
            d={`M50 ${y + 4}h16`}
            strokeOpacity="0.7"
            strokeWidth="1.5"
            variants={draw(5 + index * 2, reduced)}
          />
        </g>
      ))}
    </g>
  );
}

/* ==========================================================================
   Audio and video: a waveform inside a play triangle
   ========================================================================== */

function WaveformMark({ reduced }: SubMarkProps) {
  const bars = [
    { x: 40, base: 10 },
    { x: 46, base: 20 },
    { x: 52, base: 14 },
    { x: 58, base: 22 },
  ];

  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path
        d="M34 26l38 22-38 22z"
        strokeOpacity="0.4"
        variants={draw(1, reduced)}
      />
      {bars.map((bar, index) => (
        <motion.g
          key={bar.x}
          variants={cycle({ scaleY: [1, 0.35, 1.25, 0.6, 1] }, 1.6, reduced, index * 0.12)}
          style={{ transformOrigin: `${bar.x + 1.5}px 48px` }}
        >
          <motion.rect
            x={bar.x}
            y={48 - bar.base / 2}
            width="3"
            height={bar.base}
            rx="1.5"
            fill="currentColor"
            stroke="none"
            variants={pop(2 + index, reduced)}
            style={{ transformOrigin: `${bar.x + 1.5}px 48px` }}
          />
        </motion.g>
      ))}
    </g>
  );
}

/* ==========================================================================
   Colour and design: three inks overlapping
   ========================================================================== */

function PaletteMark({ reduced }: SubMarkProps) {
  const discs = [
    { cx: 48, cy: 40 },
    { cx: 40, cy: 54 },
    { cx: 56, cy: 54 },
  ];

  return (
    <g>
      <motion.g
        variants={
          reduced
            ? { initial: {}, animate: {} }
            : {
                initial: {},
                animate: {
                  rotate: 360,
                  transition: { duration: 26, repeat: Infinity, ease: "linear" },
                },
              }
        }
        style={{ transformOrigin: "48px 48px" }}
      >
        {discs.map((disc, index) => (
          <motion.circle
            key={index}
            cx={disc.cx}
            cy={disc.cy}
            r="13"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.1"
            variants={draw(1 + index, reduced)}
          />
        ))}
      </motion.g>
      <motion.circle
        cx="48"
        cy="49"
        r="3"
        fill="currentColor"
        stroke="none"
        variants={cycle({ opacity: [0.35, 1, 0.35] }, 3.4, reduced)}
      />
    </g>
  );
}

/* ==========================================================================
   Security and encoding: a cipher block resolving behind a shield
   ========================================================================== */

function ShieldMark({ reduced }: SubMarkProps) {
  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path
        d="M48 24l18 7v14c0 11-7.6 20-18 23-10.4-3-18-12-18-23V31l18-7z"
        variants={draw(1, reduced)}
      />
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <motion.rect
            key={`${row}-${col}`}
            x={41 + col * 8}
            y={39 + row * 8}
            width="5"
            height="5"
            rx="1.4"
            fill="currentColor"
            stroke="none"
            variants={cycle(
              { opacity: [0.18, 0.95, 0.18] },
              2.6,
              reduced,
              (row * 2 + col) * 0.22,
            )}
          />
        )),
      )}
    </g>
  );
}

/* ==========================================================================
   Web and SEO: a globe with rank rising against it
   ========================================================================== */

function GlobeMark({ reduced }: SubMarkProps) {
  const bars = [
    { x: 40, h: 8 },
    { x: 47, h: 13 },
    { x: 54, h: 18 },
  ];

  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.circle cx="48" cy="48" r="20" variants={draw(1, reduced)} />
      <motion.path d="M28 48h40" strokeOpacity="0.5" variants={draw(2, reduced)} />
      {/* The meridian narrows and widens, which is what sells it as a sphere
          rather than a circle with a line through it. */}
      <motion.g
        variants={cycle({ scaleX: [1, 0.16, 1] }, 7, reduced)}
        style={{ transformOrigin: "48px 48px" }}
      >
        <motion.ellipse
          cx="48"
          cy="48"
          rx="9"
          ry="20"
          strokeOpacity="0.5"
          variants={draw(3, reduced)}
        />
      </motion.g>
      {bars.map((bar, index) => (
        <motion.rect
          key={bar.x}
          x={bar.x}
          y={62 - bar.h}
          width="4"
          height={bar.h}
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.9"
          stroke="none"
          variants={pop(4 + index, reduced, 0.9)}
          style={{ transformOrigin: `${bar.x + 2}px 62px` }}
        />
      ))}
    </g>
  );
}

const MARKS: Record<CategoryIcon, (props: SubMarkProps) => ReactElement> = {
  // The animated marks are abstract technical figures rather than literal
  // pictograms, so they carry over from the prompt directory this was ported
  // from by remapping rather than redrawing. Each new category is paired with
  // the existing figure whose motion best fits its meaning: the marketing mark
  // radiates, the career mark orients, the productivity mark discharges.
  megaphone: WaveformMark,
  type: TypeMark,
  code: CodeMark,
  briefcase: DocumentMark,
  handshake: ShieldMark,
  graduation: ImageMark,
  palette: PaletteMark,
  database: DatabaseMark,
  bolt: WandMark,
  compass: GlobeMark,
};

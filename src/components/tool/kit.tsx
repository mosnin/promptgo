"use client";

/**
 * The tool authoring kit.
 *
 * Every tool page is assembled from these primitives so that 120 independently
 * built tools share one interaction model, one set of states and one visual
 * language. A tool author should almost never need raw Tailwind beyond layout.
 *
 * Import everything from "@/components/tool/kit".
 */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from "react";
import { BorderBeam } from "border-beam";
import { ThinkingOrb } from "thinking-orbs";
import { AdSlot } from "@/components/ads/AdSlot";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ease, spring } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";
import { copyToClipboard, formatBytes } from "@/lib/file";
import { useThemeAttribute } from "@/lib/use-theme";

export { formatBytes };

/* ==========================================================================
   Layout
   ========================================================================== */

/** The outermost surface of a tool interface. */
export function ToolPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("panel lit relative overflow-hidden p-5 sm:p-7", className)}>
      {children}
    </div>
  );
}

/** A titled group of controls inside a tool panel. */
export function ControlGroup({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-6 first:mt-0", className)}>
      {title && (
        <div className="mb-3">
          <h3 className="text-[0.8125rem] font-semibold text-ink">{title}</h3>
          {description && (
            <p className="mt-0.5 text-[0.75rem] text-ink-faint">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-3.5">{children}</div>
    </section>
  );
}

/** Label plus optional hint wrapper for a single control. */
export function Field({
  label,
  hint,
  htmlFor,
  children,
  value,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
  /** Optional right aligned readout, typically the current value. */
  value?: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-[0.8125rem] font-medium text-ink-muted"
        >
          {label}
        </label>
        {value !== undefined && (
          <span className="font-mono text-[0.75rem] text-ink-subtle">{value}</span>
        )}
      </div>
      {children}
      {hint && <p className="mt-1.5 text-[0.75rem] leading-relaxed text-ink-faint">{hint}</p>}
    </div>
  );
}

/* ==========================================================================
   File input
   ========================================================================== */

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  /** Accept attribute, for example "image/png,image/webp". */
  accept?: string;
  multiple?: boolean;
  /** Short instruction, for example "PNG, WebP, AVIF or GIF up to any size". */
  hint?: string;
  label?: string;
  icon?: IconName;
  disabled?: boolean;
  className?: string;
}

/**
 * Drag and drop file input.
 *
 * The choose button is the loud element rather than the box itself, because on
 * a first visit almost nobody drags: they look for something to click. The
 * dashed field around it is what tells the small minority who do drag that
 * dropping is allowed.
 *
 * Handles the drag counter correctly so that moving the pointer over a child
 * element does not flicker the active state.
 */
export function DropZone({
  onFiles,
  accept,
  multiple = false,
  hint,
  label = "Drop your file here",
  icon = "upload",
  disabled = false,
  className,
}: DropZoneProps) {
  const [active, setActive] = useState(false);
  const depth = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const reduced = useReducedMotion();
  const beamTheme = useThemeAttribute();

  const emit = useCallback(
    (list: FileList | null) => {
      if (!list || list.length === 0) return;
      onFiles(Array.from(list));
    },
    [onFiles],
  );

  function onDragEnter(event: DragEvent) {
    event.preventDefault();
    if (disabled) return;
    depth.current += 1;
    setActive(true);
  }

  function onDragLeave(event: DragEvent) {
    event.preventDefault();
    depth.current -= 1;
    if (depth.current <= 0) {
      depth.current = 0;
      setActive(false);
    }
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    depth.current = 0;
    setActive(false);
    if (disabled) return;
    emit(event.dataTransfer?.files ?? null);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    emit(event.target.files);
    // Reset so selecting the same file twice still fires a change event.
    event.target.value = "";
  }

  return (
    <div
      onDragEnter={onDragEnter}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn("relative", className)}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <BorderBeam
        size="pulse-outside"
        colorVariant="colorful"
        theme={beamTheme}
        borderRadius={20}
        active={!disabled}
        className="block"
      >
      <motion.label
        htmlFor={inputId}
        animate={{ scale: active && !reduced ? 1.006 : 1 }}
        transition={spring.snappy}
        className={cn(
          "group/zone relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed px-5 py-10 text-center transition-colors duration-300 sm:px-8 sm:py-14",
          active
            ? "border-signal bg-[color-mix(in_oklch,var(--color-signal)_10%,transparent)]"
            : "border-[color-mix(in_oklch,var(--color-signal)_30%,var(--color-hairline-strong))] bg-surface-2/35 hover:border-signal-dim hover:bg-surface-2/70",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <span className="relative flex flex-col items-center">
          <span className="mb-4 text-[0.9375rem] font-medium text-ink">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active ? "release" : "idle"}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: ease.out }}
                className="block"
              >
                {active ? `Release to add ${multiple ? "your files" : "your file"}` : label}
              </motion.span>
            </AnimatePresence>
          </span>

          {/* The visual primary action. It is a span, not a button: the whole
              field is already a label bound to the file input, and nesting an
              interactive control inside it would swallow the click. */}
          <motion.span
            whileHover={reduced || disabled ? undefined : { y: -2 }}
            whileTap={reduced || disabled ? undefined : { scale: 0.97 }}
            transition={spring.snappy}
            className="relative inline-flex h-12 select-none items-center justify-center gap-2.5 overflow-hidden rounded-full bg-signal px-6 text-[0.9375rem] font-medium tracking-[-0.01em] text-signal-ink shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_10px_30px_-10px_color-mix(in_oklch,var(--color-signal)_70%,transparent)] transition-colors duration-200 group-hover/zone:bg-signal-bright"
          >
            {/* Sheen. Parked off the left edge and swept across on hover. */}
            {!reduced && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)] transition-[left] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/zone:left-[150%]"
              />
            )}
            <Icon name={icon} size={17} />
            Choose {multiple ? "Files" : "File"}
          </motion.span>

          <span className="mt-3.5 text-[0.8125rem] text-ink-subtle">
            or drop {multiple ? "them" : "it"} anywhere in this box
          </span>

          {hint && <span className="mt-2 text-[0.75rem] text-ink-faint">{hint}</span>}
        </span>
      </motion.label>
      </BorderBeam>
    </div>
  );
}

/** A single selected file, with size and a remove affordance. */
export function FileChip({
  name,
  size,
  onRemove,
  meta,
}: {
  name: string;
  size?: number;
  onRemove?: () => void;
  /** Extra right aligned detail, for example image dimensions. */
  meta?: string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.24, ease: ease.out }}
      className="flex items-center gap-3 rounded-sm border border-hairline bg-surface-2 px-3.5 py-2.5"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-hairline bg-surface text-ink-subtle">
        <Icon name="document" size={14} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.8125rem] font-medium text-ink">{name}</span>
        <span className="block font-mono text-[0.6875rem] text-ink-faint">
          {size !== undefined ? formatBytes(size) : ""}
          {meta ? `${size !== undefined ? " · " : ""}${meta}` : ""}
        </span>
      </span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] text-ink-faint transition-colors hover:bg-surface-3 hover:text-ink"
        >
          <Icon name="close" size={13} />
        </button>
      )}
    </motion.div>
  );
}

export function FileList({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2">
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </div>
  );
}

/* ==========================================================================
   Controls
   ========================================================================== */

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  id,
  disabled,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  disabled?: boolean;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(Number(event.target.value))}
      className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none disabled:opacity-50 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-canvas [&::-webkit-slider-thumb]:bg-signal [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_var(--color-signal)] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-canvas [&::-moz-range-thumb]:bg-signal"
      style={{
        background: `linear-gradient(to right, var(--color-signal) ${percent}%, var(--color-surface-3) ${percent}%)`,
      }}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
  id,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  id?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full appearance-none rounded-xs border border-hairline bg-surface-2 pl-3 pr-9 text-[0.875rem] text-ink outline-none transition-colors duration-200 hover:border-hairline-strong focus:border-signal disabled:opacity-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
      />
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  id,
  type = "text",
  disabled,
  mono = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  type?: string;
  disabled?: boolean;
  mono?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "h-10 w-full rounded-xs border border-hairline bg-surface-2 px-3 text-[0.875rem] text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint hover:border-hairline-strong focus:border-signal disabled:opacity-50",
        mono && "font-mono text-[0.8125rem]",
      )}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  id,
  rows = 10,
  disabled,
  mono = true,
  readOnly = false,
}: {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  rows?: number;
  disabled?: boolean;
  mono?: boolean;
  readOnly?: boolean;
}) {
  return (
    <textarea
      id={id}
      value={value}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      spellCheck={false}
      onChange={(event) => onChange?.(event.target.value)}
      className={cn(
        "w-full resize-y rounded-sm border border-hairline bg-surface-2 p-3.5 text-[0.8125rem] leading-relaxed text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint hover:border-hairline-strong focus:border-signal disabled:opacity-50",
        mono && "font-mono",
        readOnly && "text-ink-muted",
      )}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
  disabled,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="flex w-full items-start gap-3 text-left disabled:opacity-50"
    >
      <span
        className={cn(
          "relative mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200",
          checked
            ? "border-signal bg-[color-mix(in_oklch,var(--color-signal)_35%,transparent)]"
            : "border-hairline bg-surface-3",
        )}
      >
        <motion.span
          animate={{ x: checked ? 17 : 3 }}
          transition={spring.snappy}
          className={cn(
            "block h-3.5 w-3.5 rounded-full",
            checked ? "bg-signal" : "bg-ink-faint",
          )}
        />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.8125rem] font-medium text-ink-muted">{label}</span>
        {hint && <span className="mt-0.5 block text-[0.75rem] text-ink-faint">{hint}</span>}
      </span>
    </button>
  );
}

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  const layoutId = useId();
  return (
    <div className="inline-flex rounded-full border border-hairline bg-surface-2 p-1">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-full px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200",
              active ? "text-ink" : "text-ink-faint hover:text-ink-muted",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-surface-3"
                transition={{ duration: 0.26, ease: ease.out }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   Actions
   ========================================================================== */

export function ActionButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  icon,
  className,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  icon?: IconName;
  className?: string;
  type?: "button" | "submit";
}) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={reduced || disabled ? undefined : { y: -1 }}
      whileTap={reduced || disabled ? undefined : { scale: 0.98 }}
      transition={spring.snappy}
      className={cn(
        "inline-flex h-11 select-none items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40",
        variant === "primary"
          ? "bg-signal text-signal-ink hover:bg-signal-bright"
          : "border border-hairline bg-surface-2 text-ink hover:border-hairline-strong hover:bg-surface-3",
        className,
      )}
    >
      {icon && <Icon name={icon} size={15} />}
      {children}
    </motion.button>
  );
}

export function CopyButton({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handle() {
    const ok = await copyToClipboard(text);
    if (!ok) return;
    setCopied(true);
  }

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={handle}
      disabled={!text}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-3 text-[0.8125rem] font-medium text-ink-muted transition-colors duration-200 hover:border-hairline-strong hover:text-ink disabled:opacity-40",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "idle"}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.16 }}
          className="flex"
        >
          <Icon name={copied ? "check" : "copy"} size={13} />
        </motion.span>
      </AnimatePresence>
      {copied ? "Copied" : label}
    </button>
  );
}

/* ==========================================================================
   Processing and results
   ========================================================================== */

export type ToolStatus = "idle" | "working" | "done" | "error";

/**
 * The processing and download panel.
 *
 * This is the highest value surface on the page. Users watch this area while a
 * file encodes, so the ad unit is rendered directly beside the progress bar to
 * capture that attention. The unit disappears entirely when AdSense is not
 * connected, and it only mounts once work has actually started so the idle
 * state stays clean.
 */
export function ProcessingPanel({
  status,
  progress,
  workingLabel = "Processing your file",
  doneLabel = "Finished",
  error,
  children,
  showAd = true,
}: {
  status: ToolStatus;
  /** 0 to 100. Omit for an indeterminate bar. */
  progress?: number;
  workingLabel?: string;
  doneLabel?: string;
  error?: string | null;
  /** Result actions, typically a download button. */
  children?: ReactNode;
  showAd?: boolean;
}) {
  const busy = status === "working";
  const started = status !== "idle";

  return (
    <AnimatePresence initial={false}>
      {started && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.34, ease: ease.out }}
          className="overflow-hidden"
        >
          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="rounded-md border border-hairline bg-surface-2/60 p-5">
              <div className="flex items-center gap-3">
                <StatusDot status={status} />
                <p className="flex-1 text-[0.875rem] font-medium text-ink">
                  {status === "working" && workingLabel}
                  {status === "done" && doneLabel}
                  {status === "error" && "Something went wrong"}
                </p>
                {busy && progress !== undefined && (
                  <span className="font-mono text-[0.75rem] text-ink-subtle">
                    {Math.round(progress)}%
                  </span>
                )}
              </div>

              <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-surface-3">
                {busy && progress === undefined ? (
                  <motion.div
                    className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-signal to-accent-violet"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : (
                  <motion.div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full",
                      status === "error"
                        ? "bg-danger"
                        : "bg-gradient-to-r from-signal to-accent-violet",
                    )}
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        status === "done"
                          ? "100%"
                          : status === "error"
                            ? "100%"
                            : `${progress ?? 0}%`,
                    }}
                    transition={{ duration: 0.4, ease: ease.out }}
                  />
                )}
              </div>

              {error && (
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-danger">{error}</p>
              )}

              {children && <div className="mt-5">{children}</div>}
            </div>

            {showAd && (
              <AdSlot
                name="toolProcessing"
                format="rectangle"
                minHeight={250}
                sticky
                label="Sponsored"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * The status indicator beside the progress bar.
 *
 * While work is in flight this is the orb, at the full 64px preset: it is the
 * thing users actually watch while a file encodes, so it earns the space. The
 * settled states collapse back to a small coloured dot, because a finished or
 * failed conversion needs a marker rather than a focal point.
 *
 * The orb paints to a canvas and reads the theme from the data-theme attribute
 * on the document element by itself, so it needs no theme prop here.
 */
function StatusDot({ status }: { status: ToolStatus }) {
  const reduced = useReducedMotion();

  const colour =
    status === "error"
      ? "var(--color-danger)"
      : status === "done"
        ? "var(--color-success)"
        : "var(--color-signal)";

  return (
    // Explicit dimensions rather than intrinsic ones, so the t-resize utility
    // has two concrete sizes to tween between. A CSS transition cannot animate
    // to or from height auto, which is the whole reason the box is measured
    // here instead of being left to its content.
    <span
      className={cn(
        "t-resize relative flex shrink-0 items-center justify-center",
        status === "working" ? "h-16 w-16" : "h-2.5 w-2.5",
      )}
    >
    <AnimatePresence mode="wait" initial={false}>
      {status === "working" ? (
        <motion.span
          key="orb"
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.82 }}
          transition={{ duration: 0.22, ease: ease.out }}
          className="flex shrink-0"
        >
          <ThinkingOrb
            state="shaping"
            size={64}
            speed={1.65}
            paused={reduced ?? false}
            aria-label="Working"
          />
        </motion.span>
      ) : (
        <motion.span
          key="dot"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.22, ease: ease.out }}
          className="relative flex h-2.5 w-2.5"
        >
          <span className="relative h-2.5 w-2.5 rounded-full" style={{ background: colour }} />
        </motion.span>
      )}
    </AnimatePresence>
    </span>
  );
}

/** Download action row rendered inside the processing panel once work is done. */
export function ResultActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2.5">{children}</div>;
}

export function DownloadButton({
  onClick,
  children = "Download",
  disabled,
}: {
  onClick: () => void;
  children?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <ActionButton onClick={onClick} icon="download" disabled={disabled}>
      {children}
    </ActionButton>
  );
}

/** Small labelled readouts, for example before and after file size. */
export function StatGrid({
  stats,
}: {
  stats: { label: string; value: string; tone?: "default" | "good" | "bad" }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-sm border border-hairline bg-surface-2 px-3 py-2.5"
        >
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
            {stat.label}
          </p>
          <p
            className={cn(
              "mt-1 text-[0.9375rem] font-medium tabular-nums",
              stat.tone === "good" && "text-success",
              stat.tone === "bad" && "text-danger",
              (!stat.tone || stat.tone === "default") && "text-ink",
            )}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Inline non blocking notice, used for warnings and browser support caveats. */
export function Note({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "warning" | "error";
}) {
  const tones = {
    info: "border-hairline bg-surface-2 text-ink-subtle",
    warning:
      "border-[color-mix(in_oklch,var(--color-warning)_35%,transparent)] bg-[color-mix(in_oklch,var(--color-warning)_9%,transparent)] text-warning",
    error:
      "border-[color-mix(in_oklch,var(--color-danger)_35%,transparent)] bg-[color-mix(in_oklch,var(--color-danger)_9%,transparent)] text-danger",
  } as const;

  return (
    <div
      className={cn(
        "rounded-sm border px-3.5 py-2.5 text-[0.8125rem] leading-relaxed",
        tones[tone],
      )}
    >
      {children}
    </div>
  );
}

/** Preview frame for image output, with a checkerboard to show transparency. */
export function PreviewFrame({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      {label && (
        <figcaption className="mb-2 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
          {label}
        </figcaption>
      )}
      <div
        className="flex items-center justify-center overflow-hidden rounded-sm border border-hairline p-3"
        style={{
          backgroundImage:
            "linear-gradient(45deg, var(--color-surface-2) 25%, transparent 25%), linear-gradient(-45deg, var(--color-surface-2) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--color-surface-2) 75%), linear-gradient(-45deg, transparent 75%, var(--color-surface-2) 75%)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
        }}
      >
        {children}
      </div>
    </figure>
  );
}

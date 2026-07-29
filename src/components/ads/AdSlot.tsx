"use client";

import { useEffect, useId, useRef, useState } from "react";
import { adsense, type AdSlotName } from "@/lib/site";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Format = "auto" | "horizontal" | "rectangle" | "vertical" | "fluid";

interface AdSlotProps {
  /** Which configured slot id to request. */
  name: AdSlotName;
  format?: Format;
  /** Minimum reserved height in pixels. Prevents cumulative layout shift. */
  minHeight?: number;
  className?: string;
  /** Optional label shown above the unit. Required by some ad policies. */
  label?: string;
  /** Sticky behaviour for the high value slot beside the processing panel. */
  sticky?: boolean;
}

/**
 * A Google AdSense display unit.
 *
 * The component renders absolutely nothing when AdSense is not connected, which
 * is determined at build time from NEXT_PUBLIC_ADSENSE_CLIENT and the matching
 * per placement slot id. That keeps the layout free of empty grey boxes during
 * development and before the publisher account is approved, and it means no ad
 * markup ships to users until there is a real unit to fill it.
 */
export function AdSlot({
  name,
  format = "auto",
  minHeight = 280,
  className,
  label = "Advertisement",
  sticky = false,
}: AdSlotProps) {
  const slotId = adsense.slots[name];
  const enabled = adsense.enabled && slotId.length > 0;

  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [filled, setFilled] = useState(false);
  const reactId = useId();

  useEffect(() => {
    if (!enabled || pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // AdSense throws when the script is blocked. There is nothing useful to
      // do about it, and the reserved space collapses below.
    }

    // AdSense sets data-ad-status on the ins element once it resolves. If the
    // request goes unfilled we collapse the reserved space rather than leaving
    // a hole in the page.
    const element = ref.current;
    if (!element) return;

    const observer = new MutationObserver(() => {
      const status = element.getAttribute("data-ad-status");
      if (status === "filled") setFilled(true);
      if (status === "unfilled") setFilled(false);
    });
    observer.observe(element, { attributes: true, attributeFilter: ["data-ad-status"] });

    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside
      aria-label={label}
      className={cn(
        "ad-reserve relative w-full overflow-hidden rounded-md border border-hairline bg-[color-mix(in_oklch,var(--color-surface)_60%,transparent)]",
        sticky && "lg:sticky lg:top-24",
        className,
      )}
      style={{ minHeight: filled ? undefined : minHeight }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint"
      >
        {label}
      </span>
      <ins
        ref={ref}
        key={reactId}
        className="adsbygoogle block"
        style={{ display: "block", minHeight }}
        data-ad-client={adsense.client}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}

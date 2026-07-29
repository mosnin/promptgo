import { site } from "@/lib/site";

/**
 * Brand mark. The glyph is a stylised file corner fold crossed by a conversion
 * arrow, drawn at 24px so it stays legible as a favicon.
 */
export function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <>
      <span
        className="relative flex items-center justify-center rounded-[8px] border border-hairline bg-surface-2"
        style={{ width: size + 8, height: size + 8 }}
      >
        <svg width={size - 6} height={size - 6} viewBox="0 0 24 24" aria-hidden>
          <defs>
            <linearGradient id="wordmark-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-signal-bright)" />
              <stop offset="100%" stopColor="var(--color-accent-violet)" />
            </linearGradient>
          </defs>
          <path
            d="M5 3.75A1.75 1.75 0 0 1 6.75 2h6.09c.46 0 .9.18 1.24.51l4.41 4.41c.33.33.51.78.51 1.24v11.09A1.75 1.75 0 0 1 17.25 21H6.75A1.75 1.75 0 0 1 5 19.25V3.75Z"
            fill="url(#wordmark-grad)"
            opacity="0.18"
          />
          <path
            d="M13 2.4v4.35c0 .69.56 1.25 1.25 1.25h4.35"
            stroke="url(#wordmark-grad)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M5 3.75A1.75 1.75 0 0 1 6.75 2h6.09c.46 0 .9.18 1.24.51l4.41 4.41c.33.33.51.78.51 1.24v11.09A1.75 1.75 0 0 1 17.25 21H6.75A1.75 1.75 0 0 1 5 19.25V3.75Z"
            stroke="url(#wordmark-grad)"
            strokeWidth="1.6"
            fill="none"
          />
          <path
            d="M8.4 14.2h5.4m0 0-1.9-1.9m1.9 1.9-1.9 1.9"
            stroke="url(#wordmark-grad)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>
      <span className="text-[0.9375rem] font-semibold tracking-[-0.02em] text-ink">
        {site.name}
      </span>
    </>
  );
}

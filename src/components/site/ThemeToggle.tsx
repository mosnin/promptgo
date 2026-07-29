"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/components/motion/tokens";

type Theme = "dark" | "light";

/**
 * Dark first theme switch. The stored preference is applied by an inline script
 * in the document head, so this component only has to read the attribute that
 * script already set. That avoids a flash of the wrong theme on first paint.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing modes can throw on write. The toggle still works for
      // the current session, it just will not persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
    >
      <motion.span
        key={mounted ? theme : "initial"}
        initial={{ opacity: 0, rotate: -70, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: ease.out }}
        className="flex"
      >
        {theme === "dark" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M21.3 13.6a1 1 0 0 0-1.2-.3 7.5 7.5 0 0 1-9.4-9.4 1 1 0 0 0-1.3-1.2A9.5 9.5 0 1 0 21.6 14.9a1 1 0 0 0-.3-1.3ZM12 20a7.5 7.5 0 0 1-4.4-13.6A9.5 9.5 0 0 0 17.6 16.4 7.46 7.46 0 0 1 12 20Z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm0 2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM12 1a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1Zm0 18.5a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1ZM23 12a1 1 0 0 1-1 1h-1.5a1 1 0 1 1 0-2H22a1 1 0 0 1 1 1ZM4.5 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1.5a1 1 0 0 1 1 1Zm14.8-7.3a1 1 0 0 1 0 1.42l-1.06 1.06a1 1 0 0 1-1.42-1.42l1.07-1.06a1 1 0 0 1 1.41 0ZM7.18 16.82a1 1 0 0 1 0 1.42L6.11 19.3a1 1 0 0 1-1.41-1.42l1.06-1.06a1 1 0 0 1 1.42 0Zm12.12 2.48a1 1 0 0 1-1.41 0l-1.07-1.06a1 1 0 0 1 1.42-1.42l1.06 1.06a1 1 0 0 1 0 1.42ZM7.18 7.18a1 1 0 0 1-1.42 0L4.7 6.11A1 1 0 0 1 6.11 4.7l1.07 1.06a1 1 0 0 1 0 1.42Z" />
          </svg>
        )}
      </motion.span>
    </button>
  );
}

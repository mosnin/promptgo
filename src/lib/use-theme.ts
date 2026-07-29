"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the site theme for components that need to be told about it rather
 * than reading a CSS variable.
 *
 * Theme is not held in React state anywhere: an inline script in the document
 * head sets data-theme before first paint, and the toggle writes the attribute
 * back. So the attribute is the source of truth, and this observes it.
 *
 * Starts at dark, which is both the site default and the server rendered value,
 * so the first client render matches the markup and hydration stays quiet.
 */
export function useThemeAttribute(): "dark" | "light" {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

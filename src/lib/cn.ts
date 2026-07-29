type ClassValue = string | false | null | undefined;

/** Tiny class joiner. Avoids pulling clsx in for what is three lines of code. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

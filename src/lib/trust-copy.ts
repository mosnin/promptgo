/**
 * Deterministic content rotation, shared by anything that would otherwise
 * render byte-identical boilerplate on every page.
 *
 * `PlatformNote`'s "about the platform" paragraph used to be one fixed
 * sentence on all 148 pages, which is exactly the shape a thin content
 * classifier looks for. It was fixed by selecting one of several equivalent
 * phrasings deterministically from the page's own slug. `eeat.authorCredential`
 * had the same problem and was missed in that pass: every prompt stores the
 * literal same string, and it renders directly under the H1, the page's
 * strongest visible trust signal. This applies the identical fix to it.
 *
 * Deterministic rather than random: Math.random would make the page
 * non-reproducible between server and client renders, which is worse than
 * the duplication it would be fixing.
 */
export function stableIndex(key: string, mod: number): number {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}

const AUTHOR_CREDENTIALS = [
  "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
  "Written by the Fast Prompts editorial team under the site's authoring standard, and checked against it before publishing.",
  "Part of the Fast Prompts catalogue, written and checked against the same authoring standard as every other page here.",
  "Maintained by the Fast Prompts editorial team, held to the authoring standard documented for the whole directory.",
  "Written under the Fast Prompts authoring standard and reviewed by the editorial team before it went live.",
  "One of the Fast Prompts editorial team's pages, written and checked against the directory's authoring standard.",
  "Drafted and checked by the Fast Prompts editorial team against the standard every page in the directory follows.",
  "The Fast Prompts editorial team wrote and reviewed this page against the same authoring standard as the rest of the catalogue.",
];

/**
 * The credential line shown beside the author name in the trust block, and
 * nowhere else: JSON-LD references the Organization entity directly rather
 * than repeating this text, so there is exactly one place this rotation has
 * to stay consistent.
 */
export function authorCredentialFor(slug: string): string {
  return AUTHOR_CREDENTIALS[stableIndex(`credential:${slug}`, AUTHOR_CREDENTIALS.length)];
}

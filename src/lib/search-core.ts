/**
 * Client safe half of the search module.
 *
 * This file must never import the prompt registry, directly or transitively. The
 * command palette is a client component, so anything reachable from here ends
 * up in the browser bundle, and `@/lib/prompts` pulls in every long form article
 * on the site. Registry backed helpers live in `@/lib/search` instead, which is
 * server only.
 */

/**
 * The compact shape shipped to the browser. Deliberately excludes article
 * bodies so the client search payload stays around 30 KB for 120 prompts rather
 * than the megabyte the full registry would cost.
 */
export interface SearchDoc {
  s: string; // slug
  n: string; // name
  h: string; // href
  c: string; // category slug
  d: string; // summary
  k: string; // haystack of keywords, tags and accepted extensions
}

export interface SearchResult extends SearchDoc {
  score: number;
}

/**
 * Deterministic relevance scoring shared by the server rendered results page
 * and the client side command palette, so both agree on ordering.
 *
 * Weighting favours prefix matches on the prompt name, because someone typing
 * "png" almost always wants a PNG prompt rather than a prompt that merely mentions
 * PNG somewhere in its keyword list.
 */
export function searchDocs(
  docs: SearchDoc[],
  rawQuery: string,
  limit = 40,
): SearchResult[] {
  const query = rawQuery.trim().toLowerCase();
  if (query.length === 0) return [];

  const terms = query.split(/\s+/).filter(Boolean);
  const results: SearchResult[] = [];

  for (const doc of docs) {
    const name = doc.n.toLowerCase();
    const summary = doc.d.toLowerCase();
    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      let termScore = 0;

      if (name === term) termScore += 120;
      else if (name.startsWith(term)) termScore += 70;
      else if (name.includes(term)) termScore += 45;

      if (doc.s.includes(term)) termScore += 30;
      if (doc.k.includes(term)) termScore += 18;
      if (summary.includes(term)) termScore += 10;
      if (doc.c.includes(term)) termScore += 8;

      if (termScore === 0) {
        matchedAll = false;
        break;
      }
      score += termScore;
    }

    if (!matchedAll) continue;

    // Slight bias toward shorter names so "cold email" outranks
    // "cold email follow up sequence" for the bare query.
    score += Math.max(0, 24 - doc.n.length) * 0.4;
    results.push({ ...doc, score });
  }

  return results
    .sort((a, b) => b.score - a.score || a.n.localeCompare(b.n))
    .slice(0, limit);
}

const REPO = 'spronta/crawlie';

/** Fetch the repo's star count at build time. Returns null if unreachable. */
export async function fetchStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'crawlie-site' },
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.stargazers_count === 'number') return data.stargazers_count;
    }
  } catch {
    // ignore — fall through to null
  }
  return null;
}

/** Compact star label, e.g. 312, 1.2k, 12k. Null when the count is unknown. */
export function formatStars(stars: number | null): string | null {
  if (stars === null) return null;
  return stars >= 1000
    ? `${(stars / 1000).toFixed(stars >= 10000 ? 0 : 1)}k`
    : String(stars);
}

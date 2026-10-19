/**
 * Blog posts are Markdown files in content/posts/, named YYYY-MM-DD-slug.md.
 * The filename (without .md) is the URL: /blog/2026-10-19-hard-tech-weekly.
 *
 * Each file starts with front matter:
 *
 *   ---
 *   title: "Hard Tech Weekly, October 19, 2026"
 *   date: 2026-10-19
 *   summary: "One sentence for the index, search results, and link previews"
 *   ---
 *
 * Add `draft: true` to keep a post out of the build.
 */

export interface Post {
  slug: string;
  title: string;
  /** YYYY-MM-DD, the publish date shown on the site. */
  date: string;
  summary: string;
  body: string;
}

const files = import.meta.glob('../../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontMatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^(\w+):\s*(.*)$/.exec(line);
    if (!field) continue;
    let value = field[2].trim();
    if (/^".*"$/.test(value)) value = value.slice(1, -1).replace(/\\"/g, '"');
    else if (/^'.*'$/.test(value)) value = value.slice(1, -1);
    data[field[1]] = value;
  }
  return { data, body: match[2] };
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { data, body } = parseFrontMatter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || slug.slice(0, 10),
      summary: data.summary || '',
      body,
      draft: data.draft === 'true',
    };
  })
  .filter((p) => !p.draft)
  .map(({ draft: _draft, ...post }) => post)
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** "2026-10-19" to "October 19, 2026", read as a calendar date so no time zone can shift it. */
export function formatDate(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

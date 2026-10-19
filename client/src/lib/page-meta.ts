import { useEffect } from 'react';

const ORIGIN = 'https://kevin-lowe.com';

interface PageMeta {
  /** Page title without the site name, which is appended for the browser tab. */
  title: string;
  description: string;
  /** Path such as /blog/2026-10-19-hard-tech-weekly. */
  path: string;
  type?: 'website' | 'article' | 'profile';
  /** YYYY-MM-DD, for articles. */
  published?: string;
}

function setMeta(attr: 'name' | 'property', key: string, value: string | undefined) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (value === undefined) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/**
 * Sets the title, description, canonical, and Open Graph tags for pages other
 * than home. The prerender step snapshots the result, so link previews see
 * each post's own title and summary.
 */
export function usePageMeta({ title, description, path, type = 'website', published }: PageMeta) {
  useEffect(() => {
    const url = ORIGIN + path;
    document.title = `${title} | Kevin Lowe`;
    setMeta('name', 'description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('property', 'article:published_time', published);
    setMeta('property', 'article:author', published ? 'Kevin Lowe' : undefined);
    if (type !== 'profile') {
      setMeta('property', 'profile:first_name', undefined);
      setMeta('property', 'profile:last_name', undefined);
    }
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
    // The home page's ProfilePage structured data does not describe these pages.
    document.head.querySelector('script[type="application/ld+json"]')?.remove();
  }, [title, description, path, type, published]);
}

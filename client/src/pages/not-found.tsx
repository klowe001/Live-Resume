import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | Kevin Lowe';
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex';
  }, []);

  return (
    <main className="page flex min-h-screen flex-col justify-center bg-paper py-20 text-ink">
      <p className="font-semibold text-accent">404</p>
      <h1 className="type-masthead mt-2 text-[clamp(4rem,14vw,10rem)]">Page not found</h1>
      <p className="mt-6 max-w-[40ch] text-lg text-ink-soft">This page doesn’t exist. Kevin’s résumé is on the home page.</p>
      <a href="/" className="mt-8 self-start border border-ink bg-ink px-5 py-3.5 font-semibold text-paper hover:bg-paper hover:text-ink">
        Go to the home page
      </a>
    </main>
  );
}

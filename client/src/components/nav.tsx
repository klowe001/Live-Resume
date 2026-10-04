import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { EMAIL, LINKEDIN_URL } from '@/lib/contact';

const links = [
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'How he works', id: 'how-he-works' },
  { name: 'Education', id: 'education' },
  { name: 'Life', id: 'life' },
  { name: 'Contact', id: 'contact' },
];

/** Tracks which section sits under the top third of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = links.map((l) => l.id);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || menuOpen ? 'border-b border-line bg-paper' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <a href="#top" className="text-lg font-bold tracking-tight text-ink" onClick={() => setMenuOpen(false)}>
            Kevin Lowe
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative py-2 text-[0.9375rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-300 ${
                      isActive ? 'text-ink after:scale-x-100' : 'text-ink-soft hover:text-ink after:scale-x-0'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 border border-ink px-3.5 py-2 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 p-2.5 text-ink lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-16 lg:hidden">
          <ul className="page flex flex-col pt-4">
            {links.map((link) => (
              <li key={link.id} className="border-b border-line">
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="type-section block py-3 text-[2.75rem] text-ink"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="page mt-8 flex flex-wrap gap-3 pb-10">
            <a href={`mailto:${EMAIL}`} className="bg-ink px-5 py-3.5 font-semibold text-paper">
              Email Kevin
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-ink px-5 py-3.5 font-semibold text-ink"
            >
              LinkedIn
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

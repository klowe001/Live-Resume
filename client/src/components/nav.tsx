import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';
import { mobileMotion } from '@/lib/motion';

const links = [
  { name: "Philosophy", href: "#philosophy", number: "01" },
  { name: "Experience", href: "#experience", number: "02" },
  { name: "Education", href: "#education", number: "03" },
  { name: "Projects", href: "#projects", number: "04" },
  { name: "Other", href: "#personal", number: "05" },
  { name: "Contact", href: "#contact", number: null },
];

export function Nav() {
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY.current) {
        lastScrollY.current = currentScrollY;
        setScrolled(currentScrollY > 50);
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass = "text-sm font-medium uppercase tracking-wider text-ink hover:text-accent transition-colors relative group py-1 focus-visible:outline-none focus-visible:text-accent";

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 ${
          scrolled ? 'bg-paper/95 backdrop-blur-md border-b border-warm/50 py-4' : 'bg-transparent'
        }`}
        {...m.navSlide}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-serif text-2xl text-ink tracking-tight hover:opacity-70 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:opacity-70">
            Kevin Lowe
          </Link>

          <ul className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={linkClass}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 -mr-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-paper"
          >
            <div className="pt-24 px-6">
              <ul className="flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
                    className="border-b border-warm/50"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="flex items-baseline gap-3 py-5 font-serif text-3xl text-ink hover:text-accent-dark transition-colors focus-visible:outline-none focus-visible:text-accent-dark"
                    >
                      {link.number ? (
                        <span className="text-accent italic text-sm w-6">
                          {link.number}
                        </span>
                      ) : (
                        <span className="w-6" aria-hidden="true" />
                      )}
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-12 text-sm text-muted"
              >
                <a
                  href="mailto:klowe001@gmail.com"
                  className="block hover:text-accent-dark transition-colors"
                >
                  klowe001@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

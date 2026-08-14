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
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
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
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-paper/90 backdrop-blur-sm border-b border-warm'
            : 'bg-paper/90 backdrop-blur-sm border-b border-warm'
        }`}
        {...m.navSlide}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-[22px] font-semibold tracking-tight text-ink hover:opacity-75 transition-opacity focus-visible:outline-none"
          >
            Apertura<span className="text-accent">*</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[13px] font-medium text-muted hover:text-ink transition-colors duration-200 focus-visible:outline-none focus-visible:text-ink"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="hidden md:inline-flex text-[13px] font-medium px-4 py-2 bg-ink text-paper rounded-full hover:bg-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Get in Touch
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 -mr-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
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
              <ul className="flex flex-col">
                {links.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
                    className="border-b border-warm"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="flex items-baseline gap-4 py-5 font-serif text-3xl text-ink hover:text-accent transition-colors focus-visible:outline-none"
                    >
                      <span className="text-accent italic text-sm w-6 font-sans">{link.number}</span>
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-12"
              >
                <a
                  href="mailto:klowe001@gmail.com"
                  className="text-[13px] font-medium text-muted hover:text-ink transition-colors"
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

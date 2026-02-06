import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
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

  const links = [
    { name: "Philosophy", href: "#philosophy" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Other", href: "#personal" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 ${
        scrolled ? 'bg-paper/95 backdrop-blur-md border-b border-warm/50 py-4' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-serif text-2xl text-ink tracking-tight hover:opacity-70 transition-opacity cursor-pointer">
          Kevin Lowe
        </Link>

        <ul className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium uppercase tracking-wider text-ink hover:text-accent transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <a
            href="mailto:kevin@wanderluxe.io"
            className="text-sm font-medium uppercase tracking-wider text-ink"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

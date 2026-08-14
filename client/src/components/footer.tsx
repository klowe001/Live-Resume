import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const marqueeItems = ['Strategy · Execution', 'Gen AI', 'Product Building', 'Loyalty Design', 'New York City'];

export function Footer() {
  const socialLinkClass =
    "p-4 border border-paper/20 hover:bg-accent hover:border-accent hover:text-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

  return (
    <footer id="contact" className="bg-ink text-paper">
      {/* Marquee strip */}
      <div className="overflow-hidden py-5 border-b border-paper/10">
        <style dangerouslySetInnerHTML={{ __html: `.apertura-marquee { animation: apertura-scroll 28s linear infinite; } @keyframes apertura-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }` }} />
        <div className="apertura-marquee flex whitespace-nowrap font-serif text-[15px] tracking-wide text-paper/40">
          {[...Array(2)].map((_, k) => (
            <span key={k} className="flex">
              {marqueeItems.map((t) => (
                <span key={t} className="mx-8 flex items-center gap-8">
                  {t} <span className="text-accent">✺</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div>
          <h2 className="font-serif font-light text-[38px] sm:text-[52px] leading-[1.05] tracking-[-0.015em] mb-8">
            Let's Build <br />
            <span className="italic text-paper/60">Something Real.</span>
          </h2>
          <p className="font-sans text-paper/70 max-w-md text-[15px] leading-relaxed mb-10">
            Expanding my skill set, exploring new technologies, and building on the side — all while serving clients at BCG and driving projects forward as a team leader.
          </p>

          <div className="flex flex-col gap-4 font-sans text-[14px] text-paper/70">
            <div className="flex items-baseline gap-4">
              <span className="w-20 shrink-0 text-[11px] uppercase tracking-widest text-accent">Location</span>
              <span>New York City</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-20 shrink-0 text-[11px] uppercase tracking-widest text-accent">Email</span>
              <a
                href="mailto:klowe001@gmail.com"
                className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:text-accent focus-visible:underline"
              >
                klowe001@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-between h-full gap-12">
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/kevin-andrew-lowe/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={socialLinkClass}
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/reminiscent-io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={socialLinkClass}
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:klowe001@gmail.com"
              aria-label="Send an email"
              className={socialLinkClass}
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="pt-8 border-t border-paper/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-sans text-[13px] text-paper/40">
            <span className="font-serif text-[18px] font-semibold text-paper">
              Apertura<span className="text-accent">*</span>
            </span>
            <div className="flex items-center gap-6">
              {['Work', 'Studio', 'Contact', 'LinkedIn'].map((l) => (
                <a key={l} href="#" className="hover:text-paper/80 transition-colors text-[12px] uppercase tracking-widest">
                  {l}
                </a>
              ))}
            </div>
            <span>© {new Date().getFullYear()} Kevin Lowe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

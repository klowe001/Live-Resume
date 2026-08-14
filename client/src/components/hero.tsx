import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';
import { mobileMotion } from '@/lib/motion';

export function Hero() {
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto w-full z-10">

        <div className="flex flex-col max-w-[1100px]">
          {/* Category label — Apertura style */}
          <motion.p
            {...m.heroFadeUp(0.15)}
            className="font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-accent mb-5"
          >
            Portfolio · MMXXVI
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...m.heroFadeUp(0.3)}
            className="font-serif font-light text-[44px] leading-[1.04] sm:text-[64px] lg:text-[88px] tracking-[-0.02em] mb-8 text-ink"
          >
            Strategist <br />
            <span className="italic">Who&nbsp;Builds.</span>
          </motion.h1>

          {/* Sub-copy — two-column Apertura pattern */}
          <motion.div
            {...m.heroFadeUp(0.5)}
            className="flex flex-wrap items-baseline gap-x-10 gap-y-3 font-sans text-[14px] text-muted mb-12"
          >
            <p className="max-w-md leading-relaxed">
              BCG Principal leading Gen AI strategy for Fortune 500 brands. I also ship the products: a collaborative travel platform, a SaaS for dance instructors, and the site you're reading.
            </p>
            <p className="text-[12px] tracking-wide">
              BCG <span className="mx-1 text-warm">·</span> Gen AI <span className="mx-1 text-warm">·</span> New York
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...m.heroFadeUp(0.7)}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-sans text-[13px] font-medium px-5 py-2.5 bg-ink text-paper rounded-full hover:bg-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-sans text-[13px] font-medium flex items-center gap-2 text-muted hover:text-ink transition-colors duration-300 focus-visible:outline-none"
            >
              See selected work
              <span className="w-8 h-8 rounded-full border border-warm grid place-items-center hover:border-ink transition-colors">
                <ArrowRight size={14} />
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isMobile ? 0.5 : 1, delay: isMobile ? 0.6 : 1.2 }}
        className="absolute bottom-12 left-6 md:left-10 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-ink to-transparent" />
        <span className="text-[11px] uppercase tracking-widest text-muted font-sans">Scroll</span>
      </motion.div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useAnimationContext } from '@/context/animation-context';
import { mobileMotion } from '@/lib/motion';

export function Hero() {
  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="max-w-4xl flex-1">
          <motion.div
            {...m.heroFadeUp(0.2)}
            className="text-accent-dark uppercase tracking-[0.15em] font-medium mb-6"
          >
            New York, NY
          </motion.div>

          <motion.h1
            {...m.heroFadeUp(0.4)}
            className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-8 text-ink"
          >
            Strategist <br />
            <span className="italic text-accent-dark">Who Builds</span>
          </motion.h1>

          <motion.p
            {...m.heroFadeUp(0.6)}
            className="text-xl md:text-2xl text-muted max-w-2xl leading-relaxed mb-12"
          >
            BCG Principal and AI practitioner driving growth strategy for Fortune 500 brands.
            I translate strategic vision into working products using modern development tools and agentic AI workflows.
          </motion.p>

          <motion.div
            {...m.heroFadeUp(0.8)}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-ink text-paper font-medium uppercase tracking-wider text-sm hover:bg-transparent hover:text-ink border-2 border-ink transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent text-ink font-medium uppercase tracking-wider text-sm hover:bg-ink hover:text-paper border-2 border-ink transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isMobile ? 0.5 : 1, delay: isMobile ? 0.6 : 1.2 }}
        className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-ink to-transparent animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
      </motion.div>
    </section>
  );
}

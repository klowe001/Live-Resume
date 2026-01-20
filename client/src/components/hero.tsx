import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-accent-dark uppercase tracking-[0.15em] font-medium mb-6"
          >
            New York, NY
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-8 text-ink"
          >
            Strategist <br />
            <span className="italic text-accent-dark">Who Builds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted max-w-2xl leading-relaxed mb-12"
          >
            BCG Principal and Gen AI Node Lead driving growth strategy for Fortune 500 brands.
            I translate strategic vision into working products using modern development tools and agentic AI workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-ink to-transparent animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
      </motion.div>
    </section>
  );
}

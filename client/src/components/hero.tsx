import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';
import { EMAIL, LINKEDIN_URL, OPEN_TO } from '@/lib/contact';
import portrait from '@assets/web/portrait.webp';
import bcgLogo from '@assets/logos/bcg.png';
import pizzaHutLogo from '@assets/logos/pizza-hut.png';
import whartonLogo from '@assets/logos/wharton.png';
import smuLogo from '@assets/logos/smu.png';
import siliconLabsLogo from '@assets/logos/silicon-labs.png';

const logos = [
  { src: bcgLogo, alt: 'Boston Consulting Group', width: 736, height: 160 },
  { src: pizzaHutLogo, alt: 'Pizza Hut', width: 200, height: 160 },
  { src: siliconLabsLogo, alt: 'Silicon Labs', width: 250, height: 128 },
  { src: whartonLogo, alt: 'The Wharton School', width: 643, height: 160 },
  { src: smuLogo, alt: 'Southern Methodist University', width: 207, height: 160 },
];

/**
 * Three layers, back to front: the masthead type, the cut-out portrait, and
 * the facts. On scroll the masthead drifts slowest and the portrait a little
 * slower than the page, which is what gives the hero its depth.
 */
export function Hero() {
  const { isMobile, prefersReducedMotion } = useAnimationContext();
  const still = isMobile || prefersReducedMotion;

  const { scrollY } = useScroll();
  const mastY = useTransform(scrollY, [0, 700], [0, 210]);
  const portraitY = useTransform(scrollY, [0, 700], [0, 70]);
  const portraitScale = useTransform(scrollY, [0, 700], [1, 1.03]);

  return (
    <header
      id="top"
      className="relative isolate overflow-hidden lg:min-h-[max(100svh,40rem)]"
      style={{
        // Masthead size: wide enough to dominate, narrow enough to leave a lane
        // for the portrait's head, short enough to clear the facts below.
        ['--mast' as string]:
          'clamp(4rem, min(calc(min(100vw - 7rem, 73rem) * 0.152), calc((88svh - 26rem) / 1.85)), 12rem)',
      }}
    >
      {/* Layer 1: masthead */}
      <motion.div
        aria-hidden="true"
        style={still ? undefined : { y: mastY }}
        className="page type-masthead relative z-0 select-none pt-[calc(4rem_+_0.75rem)] text-[20.5vw] text-ink lg:absolute lg:inset-x-0 lg:top-[calc(4.5rem_+_3svh)] lg:pt-0 lg:text-[length:var(--mast)]"
      >
        <span className="block lg:text-right">Strategist</span>
        <span className="block">Who Builds</span>
      </motion.div>

      {/* Layer 2: portrait. On desktop it hangs from the page grid, its head in
          the lane the masthead leaves free on the right. */}
      <div className="relative z-10 lg:pointer-events-none lg:absolute lg:inset-0">
      <div className="lg:page lg:relative lg:h-full">
      <motion.div
        style={still ? undefined : { y: portraitY, scale: portraitScale }}
        className="relative -mt-[13vw] ml-auto w-[74vw] max-w-md origin-bottom [mask-image:linear-gradient(to_bottom,black_72%,transparent)] lg:[mask-image:none] lg:absolute lg:bottom-0 lg:left-[83%] xl:left-[78%] 2xl:left-[82%] lg:top-[calc(4.5rem_+_3svh_+_var(--mast)*0.46)] lg:mt-0 lg:mr-0 lg:aspect-[1600/1307] lg:h-auto lg:w-auto lg:max-w-none lg:-translate-x-1/2"
      >
        <motion.img
          src={portrait}
          alt="Portrait of Kevin Lowe"
          width={1600}
          height={1307}
          fetchPriority="high"
          initial={prefersReducedMotion ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="block h-auto w-full max-w-none lg:h-full lg:drop-shadow-[0_24px_40px_oklch(0.2_0.01_60/0.16)]"
        />
      </motion.div>
      </div>
      </div>

      {/* Layer 3: the facts */}
      <div className="page relative z-20 -mt-6 pb-14 lg:mt-0 lg:pb-[max(2.5rem,6svh)] lg:pt-[calc(4.5rem_+_3svh_+_var(--mast)*1.68_+_1.75rem)]">
        <div className="max-w-[31rem]">
          <p className="sr-only">Strategist who builds.</p>
          <h1 className="text-[clamp(2.5rem,4.2vw,3.75rem)] font-extrabold leading-none tracking-[-0.035em]">
            Kevin Lowe
          </h1>
          <p className="mt-3 text-xl font-semibold leading-snug">
            Principal, Boston Consulting Group <span className="text-ink-soft">· New York</span>
          </p>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            Leads loyalty redesigns for Fortune 500 brands and GenAI enablement for BCG’s New York office.
            Builds his own products with AI coding agents.
          </p>
          <p className="mt-5 bg-paper-deep px-4 py-3 leading-snug">
            <span className="font-bold">Open to</span> {OPEN_TO}.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="border border-ink bg-ink px-5 py-3.5 font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Email Kevin
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-ink px-5 py-3.5 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              LinkedIn
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <ul aria-label="Employers and schools" className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            {logos.map((logo) => (
              <li key={logo.alt}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="h-7 w-auto mix-blend-multiply"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

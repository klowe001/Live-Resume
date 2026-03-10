/**
 * Mobile-tuned animation presets.
 *
 * On desktop we keep the original cinematic feel (longer durations, larger
 * translate distances). On mobile we tighten everything up so scrolling
 * feels snappy rather than laggy, while still preserving the fade-and-slide
 * character of the design.
 */

export function mobileMotion(isMobile: boolean) {
  return {
    /** Fade-up used by most section cards / timeline items */
    fadeUp: (index = 0) => ({
      initial: { opacity: 0, y: isMobile ? 12 : 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true } as const,
      transition: {
        duration: isMobile ? 0.35 : 0.6,
        delay: index * (isMobile ? 0.04 : 0.1),
      },
    }),

    /** Lighter fade-up for hero / above-the-fold elements (uses animate, not whileInView) */
    heroFadeUp: (delay: number) => ({
      initial: { opacity: 0, y: isMobile ? 8 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        delay: isMobile ? delay * 0.55 : delay,
      },
    }),

    /** Nav slide-in from top */
    navSlide: {
      initial: { y: isMobile ? -40 : -100 },
      animate: { y: 0 },
      transition: { duration: isMobile ? 0.3 : 0.5 },
    },

    /** Horizontal slide (for split layouts like personal-interests) */
    fadeX: (direction: 'left' | 'right', delay = 0) => {
      const x = direction === 'left' ? -(isMobile ? 10 : 20) : (isMobile ? 10 : 20);
      return {
        initial: { opacity: 0, x },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true } as const,
        transition: {
          duration: isMobile ? 0.3 : 0.5,
          delay: isMobile ? delay * 0.5 : delay,
        },
      };
    },

    /** Expand/collapse for accordions and details */
    expand: {
      initial: { height: 0, opacity: 0 },
      animate: { height: 'auto' as const, opacity: 1 },
      exit: { height: 0, opacity: 0 },
      transition: { duration: isMobile ? 0.2 : 0.3 },
    },

    /** Detail list items (staggered x-slide) */
    detailItem: (i: number) => ({
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: {
        duration: 0.2,
        delay: i * (isMobile ? 0.03 : 0.05),
      },
    }),

    /** Consent banner spring (tighter on mobile to avoid bounce) */
    bannerSpring: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
      transition: isMobile
        ? { type: 'spring' as const, damping: 30, stiffness: 350 }
        : { type: 'spring' as const, damping: 25, stiffness: 300 },
    },
  };
}

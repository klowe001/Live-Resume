/**
 * Shared motion presets. Ease out on an exponential curve; no springs or
 * bounce. Mobile shortens travel so the banner feels snappy.
 */

const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export function mobileMotion(isMobile: boolean) {
  return {
    /** Consent banner sliding up from the bottom edge */
    bannerSpring: {
      initial: { y: isMobile ? 40 : 80, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: isMobile ? 40 : 80, opacity: 0 },
      transition: { duration: isMobile ? 0.3 : 0.45, ease: easeOutQuart },
    },
  };
}

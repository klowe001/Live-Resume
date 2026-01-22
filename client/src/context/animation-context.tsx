import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface AnimationContextValue {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  shouldReduceAnimations: boolean;
}

const AnimationContext = createContext<AnimationContextValue | undefined>(undefined);

const MOBILE_BREAKPOINT = 768;

export function AnimationProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldReduceAnimations = isMobile || prefersReducedMotion;

  return (
    <AnimationContext.Provider value={{ isMobile, prefersReducedMotion, shouldReduceAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationContext(): AnimationContextValue {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return context;
}

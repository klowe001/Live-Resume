import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsent, ConsentPreferences } from '@/context/consent-context';
import { X, Settings } from 'lucide-react';
import { useAnimationContext } from '@/context/animation-context';
import { mobileMotion } from '@/lib/motion';

export function ConsentBanner() {
  const { showBanner, acceptAll, rejectNonEssential, updatePreferences, preferences, isLoading } = useConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [localPrefs, setLocalPrefs] = useState<ConsentPreferences>(preferences);

  if (isLoading || !showBanner) {
    return null;
  }

  const handleSaveSettings = () => {
    updatePreferences(localPrefs);
    setShowSettings(false);
  };

  const { isMobile } = useAnimationContext();
  const m = mobileMotion(isMobile);

  return (
    <AnimatePresence>
      <motion.div
        {...m.bannerSpring}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="mx-auto max-w-4xl bg-paper border border-warm shadow-[0_-8px_32px_rgba(0,0,0,0.06)]">
          {!showSettings ? (
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <p className="text-sm text-muted leading-relaxed flex-1">
                  This site uses cookies. Essential cookies are required; analytics are optional.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={acceptAll}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-paper bg-ink border-2 border-ink hover:bg-transparent hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={rejectNonEssential}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink border-2 border-ink hover:bg-ink hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={() => {
                      setLocalPrefs(preferences);
                      setShowSettings(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted hover:text-ink underline underline-offset-4 decoration-warm hover:decoration-accent transition-colors focus-visible:outline-none focus-visible:text-ink"
                  >
                    <Settings className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 md:p-6">
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-warm">
                <h3 className="font-serif text-2xl text-ink">Cookie Preferences</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  aria-label="Close settings"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              <dl className="divide-y divide-warm">
                <div className="flex items-center justify-between py-4 first:pt-0">
                  <div>
                    <dt className="text-sm font-semibold text-ink">Functional</dt>
                    <dd className="text-xs text-muted mt-0.5">Required for the site to work properly</dd>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-dark">Always on</span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <dt className="text-sm font-semibold text-ink">Analytics</dt>
                    <dd className="text-xs text-muted mt-0.5">Help us understand site usage</dd>
                  </div>
                  <Toggle
                    checked={localPrefs.analytics}
                    onChange={() => setLocalPrefs(p => ({ ...p, analytics: !p.analytics }))}
                    label="Analytics cookies"
                  />
                </div>

                <div className="flex items-center justify-between py-4 last:pb-0">
                  <div>
                    <dt className="text-sm font-semibold text-ink">Marketing</dt>
                    <dd className="text-xs text-muted mt-0.5">Personalized ads and content</dd>
                  </div>
                  <Toggle
                    checked={localPrefs.marketing}
                    onChange={() => setLocalPrefs(p => ({ ...p, marketing: !p.marketing }))}
                    label="Marketing cookies"
                  />
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-paper bg-ink border-2 border-ink hover:bg-transparent hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink border-2 border-ink hover:bg-ink hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`w-11 h-6 relative border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
        checked ? 'bg-ink border-ink' : 'bg-paper border-warm'
      }`}
    >
      <span
        className={`absolute top-[2px] w-4 h-4 transition-all ${
          checked ? 'right-[2px] bg-paper' : 'left-[2px] bg-ink'
        }`}
      />
    </button>
  );
}

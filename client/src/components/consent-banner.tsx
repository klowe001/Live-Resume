import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsent, ConsentPreferences } from '@/context/consent-context';
import { X, Settings, Cookie } from 'lucide-react';

export function ConsentBanner() {
  const { showBanner, acceptAll, rejectNonEssential, updatePreferences, preferences, isLoading } = useConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [localPrefs, setLocalPrefs] = useState<ConsentPreferences>(preferences);

  // Don't render anything while loading or if banner shouldn't show
  if (isLoading || !showBanner) {
    return null;
  }

  const handleSaveSettings = () => {
    updatePreferences(localPrefs);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="mx-auto max-w-4xl rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden">
          {!showSettings ? (
            // Main banner view
            <div className="p-4 md:p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Cookie className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    We use cookies to enhance your experience. Functional cookies are necessary for the site to work.
                    Analytics cookies help us understand how you use the site.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={acceptAll}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={rejectNonEssential}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      Essential Only
                    </button>
                    <button
                      onClick={() => {
                        setLocalPrefs(preferences);
                        setShowSettings(true);
                      }}
                      className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:underline transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Settings view
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Cookie Preferences</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Close settings"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Functional - Always on */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Functional</p>
                    <p className="text-xs text-gray-500">Required for the site to work properly</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-2">Always on</span>
                    <div className="w-10 h-6 bg-gray-900 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Analytics</p>
                    <p className="text-xs text-gray-500">Help us understand site usage</p>
                  </div>
                  <button
                    onClick={() => setLocalPrefs(p => ({ ...p, analytics: !p.analytics }))}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      localPrefs.analytics ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={localPrefs.analytics}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        localPrefs.analytics ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Marketing</p>
                    <p className="text-xs text-gray-500">Personalized ads and content</p>
                  </div>
                  <button
                    onClick={() => setLocalPrefs(p => ({ ...p, marketing: !p.marketing }))}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      localPrefs.marketing ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={localPrefs.marketing}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        localPrefs.marketing ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
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

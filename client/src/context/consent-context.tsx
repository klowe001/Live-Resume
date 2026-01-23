import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type ConsentCategory = 'functional' | 'analytics' | 'marketing';

export interface ConsentPreferences {
  functional: boolean; // Always true - necessary for site operation
  analytics: boolean;
  marketing: boolean;
}

interface ConsentContextValue {
  consentGiven: boolean | null; // null = not yet decided, true/false = decided
  preferences: ConsentPreferences;
  showBanner: boolean;
  isLoading: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updatePreferences: (prefs: Partial<ConsentPreferences>) => void;
  openSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

const CONSENT_COOKIE_NAME = 'gdpr_consent';
const CONSENT_VERSION = '1'; // Increment to re-prompt users when policy changes
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

const DEFAULT_PREFERENCES: ConsentPreferences = {
  functional: true, // Always enabled
  analytics: false,
  marketing: false,
};

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

function setCookie(name: string, value: string, maxAge: number): void {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function parseConsentCookie(): { version: string; preferences: ConsentPreferences } | null {
  const cookie = getCookie(CONSENT_COOKIE_NAME);
  if (!cookie) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie));
  } catch {
    return null;
  }
}

function saveConsentCookie(preferences: ConsentPreferences): void {
  const data = {
    version: CONSENT_VERSION,
    preferences,
    timestamp: new Date().toISOString(),
  };
  setCookie(CONSENT_COOKIE_NAME, encodeURIComponent(JSON.stringify(data)), COOKIE_MAX_AGE);
}

// Push consent state to GTM using Consent Mode v2
function pushConsentToGTM(preferences: ConsentPreferences): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'ad_storage': preferences.marketing ? 'granted' : 'denied',
      'ad_user_data': preferences.marketing ? 'granted' : 'denied',
      'ad_personalization': preferences.marketing ? 'granted' : 'denied',
      'analytics_storage': preferences.analytics ? 'granted' : 'denied',
      'personalization_storage': preferences.analytics ? 'granted' : 'denied',
    });
  }
}

// Declare gtag on window
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_PREFERENCES);
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Check for existing consent and geo-location on mount
  useEffect(() => {
    async function initializeConsent() {
      // First, check if user already has a valid consent cookie
      const existingConsent = parseConsentCookie();

      if (existingConsent && existingConsent.version === CONSENT_VERSION) {
        // User has already consented with current version
        setPreferences(existingConsent.preferences);
        setConsentGiven(true);
        pushConsentToGTM(existingConsent.preferences);
        setIsLoading(false);
        return;
      }

      // No valid consent - check if user is in a region requiring consent
      try {
        // Use ipapi.co for free geolocation (no API key needed for basic usage)
        const response = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code;

          // Show banner for non-US users (GDPR applies to EU, but being safe for all non-US)
          // You could narrow this to just EU/EEA countries if preferred
          const requiresConsent = countryCode !== 'US';

          if (requiresConsent) {
            setShowBanner(true);
            // Set default denied state for GTM until consent is given
            pushConsentToGTM(DEFAULT_PREFERENCES);
          } else {
            // US users - grant all consent by default
            const usPreferences: ConsentPreferences = {
              functional: true,
              analytics: true,
              marketing: true,
            };
            setPreferences(usPreferences);
            setConsentGiven(true);
            saveConsentCookie(usPreferences);
            pushConsentToGTM(usPreferences);
          }
        } else {
          // If geolocation fails, show banner to be safe (assume GDPR applies)
          setShowBanner(true);
          pushConsentToGTM(DEFAULT_PREFERENCES);
        }
      } catch {
        // On error (network issues, timeout), show banner to be safe
        setShowBanner(true);
        pushConsentToGTM(DEFAULT_PREFERENCES);
      }

      setIsLoading(false);
    }

    initializeConsent();
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: ConsentPreferences = {
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    setConsentGiven(true);
    setShowBanner(false);
    setSettingsOpen(false);
    saveConsentCookie(allAccepted);
    pushConsentToGTM(allAccepted);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const onlyEssential: ConsentPreferences = {
      functional: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyEssential);
    setConsentGiven(true);
    setShowBanner(false);
    setSettingsOpen(false);
    saveConsentCookie(onlyEssential);
    pushConsentToGTM(onlyEssential);
  }, []);

  const updatePreferences = useCallback((newPrefs: Partial<ConsentPreferences>) => {
    const updated: ConsentPreferences = {
      ...preferences,
      ...newPrefs,
      functional: true, // Always keep functional enabled
    };
    setPreferences(updated);
    setConsentGiven(true);
    setShowBanner(false);
    setSettingsOpen(false);
    saveConsentCookie(updated);
    pushConsentToGTM(updated);
  }, [preferences]);

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        consentGiven,
        preferences,
        showBanner: showBanner || settingsOpen,
        isLoading,
        acceptAll,
        rejectNonEssential,
        updatePreferences,
        openSettings,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}

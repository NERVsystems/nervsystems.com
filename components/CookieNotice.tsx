'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    // Check if user has already responded to cookie notice
    const cookieConsent = localStorage.getItem('nerv-cookie-consent');
    if (!cookieConsent) {
      // Small delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nerv-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('nerv-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slideUp">
      <div className="bg-tactical-surface/95 backdrop-blur-sm border-t border-tactical-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Message */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-tactical-textDim text-sm">
                <span className="font-mono text-tactical-accent">NOTICE:</span>{' '}
                This site uses cookies for form functionality and analytics.{' '}
                <Link
                  href={`/${locale}/privacy`}
                  className="text-tactical-accent hover:text-white underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="px-6 py-2 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 font-medium text-sm transition-all duration-300 whitespace-nowrap"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-tactical-accent text-black hover:bg-white font-medium text-sm transition-all duration-300 whitespace-nowrap"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

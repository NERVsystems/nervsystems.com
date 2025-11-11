'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-tactical-bg">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-tactical-surface border border-tactical-accent/20 p-8 rounded-lg">
            <div className="space-y-6">
              {/* Critical Error Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-red-500 text-sm">CRITICAL ERROR</span>
                  {error.digest && (
                    <span className="font-mono text-tactical-textDim text-xs">
                      ID: {error.digest}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-tactical-text">
                  Critical System Failure
                </h1>
              </div>

              {/* Error Message */}
              <div className="bg-tactical-bg border border-red-500/30 p-4 rounded">
                <p className="font-mono text-sm text-tactical-textDim">
                  {error.message || 'A critical error occurred in the application'}
                </p>
              </div>

              {/* Status Report */}
              <div className="space-y-2">
                <p className="text-tactical-textDim">
                  This critical error has been logged and our team has been notified.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-red-500">
                    Critical error tracked
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={reset}
                  className="flex-1 bg-tactical-accent text-tactical-bg font-mono px-6 py-3 rounded hover:bg-tactical-accent/90 transition-colors"
                >
                  RESTART APPLICATION
                </button>
                <Link
                  href="/"
                  className="flex-1 text-center border border-tactical-accent/30 text-tactical-text font-mono px-6 py-3 rounded hover:bg-tactical-accent/10 transition-colors"
                >
                  RETURN TO BASE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

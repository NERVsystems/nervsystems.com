'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';

export default function Error({
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
    <div className="min-h-screen bg-tactical-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-tactical-surface border border-tactical-accent/20 p-8 rounded-lg">
        <div className="space-y-6">
          {/* Error Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-tactical-accent text-sm">ERROR</span>
              {error.digest && (
                <span className="font-mono text-tactical-textDim text-xs">
                  ID: {error.digest}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-tactical-text">
              System Error Detected
            </h1>
          </div>

          {/* Error Message */}
          <div className="bg-tactical-bg border border-tactical-accent/10 p-4 rounded">
            <p className="font-mono text-sm text-tactical-textDim">
              {error.message || 'An unexpected error occurred'}
            </p>
          </div>

          {/* Status Report */}
          <div className="space-y-2">
            <p className="text-tactical-textDim">
              Our team has been automatically notified and will investigate this issue.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-tactical-accent rounded-full animate-pulse" />
              <span className="font-mono text-xs text-tactical-accent">
                Error logged and tracked
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 bg-tactical-accent text-tactical-bg font-mono px-6 py-3 rounded hover:bg-tactical-accent/90 transition-colors"
            >
              RETRY OPERATION
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
  );
}

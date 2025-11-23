'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Locale error boundary caught:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-tactical-bg text-tactical-text flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Tactical error display */}
        <div className="border border-tactical-accent/30 bg-tactical-surface p-8 mb-8 relative">
          {/* HUD-style corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-tactical-accent"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-tactical-accent"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-tactical-accent"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-tactical-accent"></div>

          <div className="font-mono text-tactical-accent text-sm mb-4 animate-pulse">
            [SYSTEM ERROR]
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            System Malfunction Detected
          </h1>

          <p className="text-tactical-textDim mb-6 leading-relaxed">
            The system has encountered an unexpected error. Our tactical systems are working to resolve this issue.
            You can try restarting the operation or return to the main interface.
          </p>

          {/* Development error details */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-900/20 border border-red-500/30 p-4 mb-6">
              <div className="font-mono text-xs text-red-400 mb-2">
                DEV MODE - Error Details:
              </div>
              <div className="text-xs text-red-300 font-mono">
                <div className="mb-2">
                  <span className="text-red-400">Message:</span> {error.message}
                </div>
                {error.digest && (
                  <div>
                    <span className="text-red-400">Digest:</span> {error.digest}
                  </div>
                )}
              </div>
              {error.stack && (
                <details className="mt-3">
                  <summary className="text-xs text-red-400 cursor-pointer hover:text-red-300">
                    Stack Trace
                  </summary>
                  <pre className="text-xs text-red-300 mt-2 overflow-x-auto">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="px-6 py-3 bg-tactical-accent text-black hover:bg-tactical-accent/90 transition-all duration-300 font-medium flex-1 sm:flex-none"
            >
              Retry Operation
            </button>
            <Link
              href="/"
              className="px-6 py-3 border border-tactical-accent/30 text-tactical-accent hover:bg-tactical-accent/10 transition-all duration-300 font-medium text-center flex-1 sm:flex-none"
            >
              Return to Home
            </Link>
          </div>
        </div>

        {/* Error code footer */}
        <div className="text-center">
          <p className="text-tactical-textDim text-sm font-mono">
            ERROR CODE: {error.digest || 'SYSTEM_ERR_UNKNOWN'}
          </p>
          <p className="text-tactical-textDim/50 text-xs font-mono mt-2">
            If this error persists, contact support at contact@nervsystems.com
          </p>
        </div>
      </div>
    </div>
  );
}

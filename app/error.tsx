'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error boundary caught:', error);
    }
  }, [error]);

  return (
    <html>
      <body className="bg-tactical-bg text-tactical-text min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Tactical error display */}
          <div className="border border-tactical-accent/30 bg-tactical-surface p-8 mb-8">
            <div className="font-mono text-tactical-accent text-sm mb-4">
              [SYSTEM ERROR]
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Critical System Failure
            </h1>
            <p className="text-tactical-textDim mb-6">
              An unexpected error occurred. The system has encountered a critical failure and needs to restart.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded mb-6 text-left">
                <div className="font-mono text-xs text-red-400 mb-2">
                  DEV MODE - Error Details:
                </div>
                <pre className="text-xs text-red-300 overflow-x-auto">
                  {error.message}
                </pre>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-tactical-accent text-black hover:bg-tactical-accent/80 transition-colors font-medium"
              >
                Restart System
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-tactical-accent/30 text-tactical-accent hover:bg-tactical-accent/10 transition-colors font-medium inline-block"
              >
                Return to Base
              </Link>
            </div>
          </div>

          <p className="text-tactical-textDim text-sm font-mono">
            ERROR CODE: {error.digest || 'UNKNOWN'}
          </p>
        </div>
      </body>
    </html>
  );
}

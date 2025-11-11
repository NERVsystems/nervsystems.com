import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-tactical-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-tactical-surface border border-tactical-accent/20 p-8 rounded-lg">
        <div className="space-y-6">
          {/* 404 Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-tactical-accent text-sm">ERROR 404</span>
              <span className="font-mono text-tactical-textDim text-xs">NOT FOUND</span>
            </div>
            <h1 className="text-3xl font-bold text-tactical-text">
              Target Not Found
            </h1>
          </div>

          {/* Message */}
          <div className="bg-tactical-bg border border-tactical-accent/10 p-4 rounded">
            <p className="font-mono text-sm text-tactical-textDim">
              The requested resource could not be located in the system.
            </p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <p className="text-tactical-textDim">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 text-center bg-tactical-accent text-tactical-bg font-mono px-6 py-3 rounded hover:bg-tactical-accent/90 transition-colors"
            >
              RETURN TO BASE
            </Link>
            <Link
              href="/solutions/tak"
              className="flex-1 text-center border border-tactical-accent/30 text-tactical-text font-mono px-6 py-3 rounded hover:bg-tactical-accent/10 transition-colors"
            >
              VIEW SOLUTIONS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

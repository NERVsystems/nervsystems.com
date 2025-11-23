import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-tactical-bg flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Grid background overlay */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="relative">
          {/* Error Code */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-tactical-accent font-mono">404</h1>
            <div className="h-1 w-32 bg-tactical-accent mx-auto mt-4"></div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              POSITION NOT FOUND
            </h2>
            <p className="text-tactical-textDim text-lg max-w-md mx-auto">
              The tactical coordinates you requested do not exist in our operational space.
            </p>
          </div>

          {/* Status Information */}
          <div className="tactical-border bg-white/5 p-6 mb-8 max-w-md mx-auto">
            <div className="font-mono text-sm text-tactical-textDim space-y-2">
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-red-500">NOT FOUND</span>
              </div>
              <div className="flex justify-between">
                <span>CODE:</span>
                <span className="text-tactical-accent">404</span>
              </div>
              <div className="flex justify-between">
                <span>SYSTEM:</span>
                <span className="text-tactical-accent">OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Navigation Options */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
            >
              RETURN TO BASE
            </Link>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/#nerva" className="text-tactical-textDim hover:text-white transition-colors">
                NERVA AI
              </Link>
              <span className="text-tactical-textDim/50">•</span>
              <Link href="/solutions/tak" className="text-tactical-textDim hover:text-white transition-colors">
                TAK Solutions
              </Link>
              <span className="text-tactical-textDim/50">•</span>
              <Link href="/#contact" className="text-tactical-textDim hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

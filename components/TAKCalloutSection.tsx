import Link from 'next/link';

export default function TAKCalloutSection() {
  return (
    <section className="relative py-20 bg-tactical-surface border-y border-white/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
              TAK/ATAK Solutions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Looking for TAK Hosting & Deployment?
            </h2>
            <p className="text-tactical-textDim text-lg leading-relaxed mb-8">
              NERV provides complete TAK/ATAK solutions for Asia Pacific: managed TAK server hosting from $495/month, expert deployment consulting, system administration, operator training, and AI-enhanced capabilities through NERVA integration.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="text-white font-bold text-sm">TAK.gov Certified</div>
                  <div className="text-tactical-textDim text-xs">Official TAK deployments</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Asia Pacific Focus</div>
                  <div className="text-tactical-textDim text-xs">Regional expertise</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="text-white font-bold text-sm">AI-Enhanced</div>
                  <div className="text-tactical-textDim text-xs">NERVA integration</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="text-white font-bold text-sm">99.9% Uptime</div>
                  <div className="text-tactical-textDim text-xs">Enterprise SLA</div>
                </div>
              </div>
            </div>

            <Link
              href="/solutions/tak"
              className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
            >
              Explore TAK Solutions →
            </Link>
          </div>

          {/* Right: Quick Stats */}
          <div className="space-y-4">
            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="font-mono text-tactical-accent text-sm mb-2">MANAGED HOSTING</div>
              <div className="text-3xl font-bold text-white mb-2">$495/mo</div>
              <div className="text-tactical-textDim text-sm">
                Enterprise TAK servers with AI monitoring, 24/7 support, and NERVA integration
              </div>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="font-mono text-tactical-accent text-sm mb-2">DEPLOYMENT</div>
              <div className="text-3xl font-bold text-white mb-2">Full Service</div>
              <div className="text-tactical-textDim text-sm">
                From initial assessment to go-live: TAK server setup, plugin config, training, and support
              </div>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="font-mono text-tactical-accent text-sm mb-2">TRAINING</div>
              <div className="text-3xl font-bold text-white mb-2">Certified</div>
              <div className="text-tactical-textDim text-sm">
                TAK operator fundamentals, advanced operations, and NERVA AI assistant training programs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

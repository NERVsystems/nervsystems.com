export default function TAKIntegrationSection() {
  return (
    <section className="relative py-24 bg-tactical-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Why Choose NERV for TAK Solutions?
            </h2>

            <p className="text-tactical-textDim text-lg mb-10 leading-relaxed">
              Unlike traditional TAK hosting providers, NERV Systems combines expert TAK deployment services with AI-powered intelligence. Every TAK solution includes NERVA integration, transforming your TAK/ATAK system from basic situational awareness into an intelligent decision support platform.
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-1">
                  01
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">AI-Enhanced TAK Platform</h4>
                  <p className="text-tactical-textDim text-sm">
                    NERVA adds autonomous mission planning, automated CASEVAC coordination, threat intelligence, and real-time decision support to your TAK system
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-1">
                  02
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Asia Pacific Expertise</h4>
                  <p className="text-tactical-textDim text-sm">
                    Local TAK deployment expertise across Singapore, Hong Kong, Japan, and the broader Asia Pacific region with understanding of regional requirements
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-1">
                  03
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Complete TAK Lifecycle Support</h4>
                  <p className="text-tactical-textDim text-sm">
                    From initial TAK assessment through deployment, training, and ongoing system administration—comprehensive support for your entire TAK journey
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-1">
                  04
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Enterprise-Grade TAK Infrastructure</h4>
                  <p className="text-tactical-textDim text-sm">
                    99.9% uptime SLA, automated TAK backups, DDoS protection, SSL certificates, and compliance with TAK.gov security standards
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-1">
                  05
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Flexible TAK Deployment Options</h4>
                  <p className="text-tactical-textDim text-sm">
                    Cloud-hosted TAK, on-premise TAK servers, hybrid TAK architectures, or edge-deployed TAK systems with our GPU-in-a-helmet hardware
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Use Cases */}
          <div className="space-y-6">
            <div className="tactical-border p-6 bg-white/5">
              <h4 className="text-xl font-bold text-white mb-3">TAK for Military Operations</h4>
              <p className="text-tactical-textDim text-sm leading-relaxed mb-3">
                Deploy TAK/ATAK systems for command and control, ISR operations, close air support, CASEVAC coordination, and multi-domain operations with AI-enhanced mission planning.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">C2</span>
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">ISR</span>
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">CASEVAC</span>
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">CAS</span>
              </div>
            </div>

            <div className="tactical-border p-6 bg-white/5">
              <h4 className="text-xl font-bold text-white mb-3">TAK for Law Enforcement</h4>
              <p className="text-tactical-textDim text-sm leading-relaxed mb-3">
                ATAK solutions for tactical operations, SWAT coordination, event security, border patrol, and inter-agency information sharing with real-time situational awareness.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">SWAT</span>
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">SECURITY</span>
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">PATROL</span>
              </div>
            </div>

            <div className="tactical-border p-6 bg-white/5">
              <h4 className="text-xl font-bold text-white mb-3">TAK for Emergency Management</h4>
              <p className="text-tactical-textDim text-sm leading-relaxed mb-3">
                Emergency response TAK systems for disaster response, search and rescue (SAR), fire operations, medical coordination, and multi-agency incident management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">SAR</span>
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">FIRE</span>
                <span className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">EMS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

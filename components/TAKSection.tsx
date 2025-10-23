export default function TAKSection() {
  return (
    <section id="platform" className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Built for Team Awareness
            </h2>

            <p className="text-tactical-textDim text-xl mb-10 leading-relaxed">
              Already using TAK for emergency coordination? Perfect. NERV integrates directly with your existing Team Awareness Kit systems.
            </p>

            {/* Integration Points */}
            <div className="space-y-5 mb-10">
              {[
                { label: "Native TAK Integration", desc: "Enhances your current workflows" },
                { label: "No Retraining Required", desc: "Familiar interface with AI superpowers" },
                { label: "Real-Time Data Fusion", desc: "From satellites, drones, and sensor feeds" },
                { label: "Natural Language Interface", desc: "Ask questions, get clear answers" },
                { label: "Portable Field Deployment", desc: "Works when connectivity fails" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <span className="text-white font-medium">{item.label}</span>
                    <span className="text-tactical-textDim ml-2">— {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium">
              View Integration Docs
            </button>
          </div>

          {/* Right: TAK Logo */}
          <div className="relative">
            <div className="tactical-border p-12 bg-white/5 backdrop-blur-sm">
              <img
                src="/img/TAK Logo.jpg"
                alt="TAK - Team Awareness Kit"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

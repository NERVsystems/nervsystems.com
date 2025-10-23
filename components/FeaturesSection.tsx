export default function FeaturesSection() {
  const features = [
    {
      icon: "◈",
      title: "REAL-TIME MISSION PLANNING",
      description: "Automated generation of tactical options from live ATAK data. 30-second planning cycles for time-critical operations.",
      code: "MAGI-01"
    },
    {
      icon: "◇",
      title: "MULTI-SOURCE INTELLIGENCE FUSION",
      description: "Unified analysis across drone feeds, sensor networks, and operator reports. Single operational picture from distributed data sources.",
      code: "MAGI-02"
    },
    {
      icon: "◆",
      title: "AUTONOMOUS ASSESSMENT",
      description: "Pattern recognition and anomaly detection for predictive analysis of operational environments.",
      code: "MAGI-03"
    },
    {
      icon: "◐",
      title: "EDGE COMPUTE",
      description: "Field-deployable 'GPU-in-a-box' for secure, private, AI at the edge. Operates when connectivity fails.",
      code: "HARDWARE-01"
    }
  ];

  return (
    <section id="features" className="relative py-24 bg-tactical-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Complete Platform
          </h2>
          <p className="text-tactical-textDim text-xl max-w-2xl">
            Software + Hardware for Tactical Edge Deployment
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-tactical-textDim leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import RequestDemoForm from './RequestDemoForm';

export default function NERVASection() {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const capabilities = [
    {
      icon: "UAS",
      title: "Autonomous Drone Operations",
      command: '"NERVA, launch reconnaissance pattern Alpha"',
      description: "Autonomous flight path planning for ISR, reconnaissance, and counter-UAS operations. NERVA monitors drone telemetry, issues direct commands, and can instantly retask friendly UAS from surveillance to intercept missions—plotting engagement courses for hostile drone neutralization or critical asset defense.",
      features: ["Autonomous flight planning", "Real-time telemetry monitoring", "Automated intercept planning", "UAS command & control"],
      videoPlaceholder: true
    },
    {
      icon: "MEDEVAC",
      title: "Automated CASEVAC Coordination",
      command: '"NERVA, we need a CASEVAC!"',
      description: "Identifies optimal helicopter landing zones in under 30 seconds, automatically notifies medical and aviation teams, monitors rescue progress, and updates all TAK clients in real-time.",
      features: ["LZ identification <30s", "Automatic team notifications", "Real-time monitoring", "TAK-wide updates"],
      videoPlaceholder: true
    },
    {
      icon: "THREAT",
      title: "Hostile Unit Intelligence",
      command: "Identify enemy unit → NERVA acts",
      description: "Automatic lookup from Jane's Defence databases, plots range-of-fire rings, alerts all units in danger zones, and provides recommended countermeasures based on threat capabilities.",
      features: ["Jane's database integration", "Range-of-fire analysis", "Automatic alerts", "Countermeasure recommendations"],
      videoPlaceholder: true
    },
    {
      icon: "SAR",
      title: "Search Area Calculation",
      command: '"NERVA, calculate search area for missing unit"',
      description: "Probability-based search zone generation using terrain analysis, weather conditions, and unit capabilities. Works for both military operations and civilian Search & Rescue (SAR).",
      features: ["Probabilistic modeling", "Terrain analysis", "Resource allocation", "Military & civilian SAR"],
      videoPlaceholder: true
    },
    {
      icon: "ALERT",
      title: "Geofence Enforcement & Response",
      command: '"NERVA, alert if any track enters the exclusion zone"',
      description: "Virtual perimeter defense with 2D/3D geofence monitoring. NERVA integrates with third-party sensors (ADS-B, RF detection, radar) to track aircraft and UAS. When any track violates virtual boundaries, NERVA instantly alerts all networked assets and coordinates response—from friendly UAS intercepts to integration with C-UAS effectors.",
      features: ["2D/3D virtual geofences", "Third-party sensor integration", "Instant network-wide alerts", "Coordinated response planning"],
      videoPlaceholder: true
    },
    {
      icon: "AIRSPACE",
      title: "3D Airspace Visualization",
      command: "Show chart → NERVA renders 3D airspace",
      description: "Multi-modal rendering of complex airspace from sectional charts, NOTAMs, and TFRs. NERVA extracts geospatial data, visualizes 3D restricted zones, and overlays real-time UAS tracks for total airspace awareness—critical for counter-UAS operations and flight deconfliction.",
      features: ["AI chart interpretation", "3D restricted zone rendering", "Real-time track overlay", "C-UAS airspace awareness"],
      videoPlaceholder: true
    }
  ];

  return (
    <section id="nerva" className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center mb-4 gap-4">
            {/* NERVA Face Logo with Hover Effect */}
            <div className="relative group cursor-pointer">
              <img
                src="/img/NERVA WHT Calm.png"
                alt="NERVA Calm"
                className="h-20 md:h-28 w-auto transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/img/NERVA WHT Fierce.png"
                alt="NERVA Fierce"
                className="h-20 md:h-28 w-auto absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>

            {/* NERVA Logotype */}
            <img
              src="/img/NERVA WHT Logotype.png"
              alt="NERVA"
              className="h-16 md:h-24 w-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-tactical-accent font-mono text-sm md:text-base mb-6 tracking-wide">
            Turning bad guy OODA loops to stone
          </p>

          <p className="text-tactical-textDim text-xl max-w-3xl mx-auto mb-4">
            Your AI Tactical Assistant
          </p>
          <p className="text-tactical-text text-lg max-w-3xl mx-auto">
            NERVA is an AI extension of your team. Not just situational awareness—<span className="text-white font-semibold">decision advantage</span>.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group relative tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className="font-mono text-sm text-tactical-accent mb-4 px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 inline-block">
                {capability.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">
                {capability.title}
              </h3>

              {/* Command */}
              <div className="font-mono text-sm text-tactical-accent mb-4 bg-black/30 p-2 rounded border border-tactical-accent/30">
                {capability.command}
              </div>

              {/* Description */}
              <p className="text-tactical-textDim text-sm leading-relaxed mb-4">
                {capability.description}
              </p>

              {/* Video Placeholder */}
              {capability.videoPlaceholder && (
                <div className="mb-4 bg-black/50 border border-white/10 rounded aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-tactical-textDim text-sm mb-2">Demo Video</div>
                    <div className="text-xs text-tactical-textDim/50">[Coming Soon]</div>
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-2">
                {capability.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div className="mt-1.5">
                      <div className="w-1 h-1 bg-tactical-accent rounded-full"></div>
                    </div>
                    <span className="text-xs text-tactical-textDim">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-tactical-textDim text-lg mb-6">
            Already using TAK? NERVA makes it intelligent.
          </p>
          <button
            onClick={() => setShowDemoForm(true)}
            className="px-8 py-4 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
          >
            See NERVA in Action
          </button>
        </div>
      </div>

      {/* Demo Form Modal */}
      {showDemoForm && (
        <RequestDemoForm
          onClose={() => setShowDemoForm(false)}
          formType="demo"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID}
        />
      )}
    </section>
  );
}

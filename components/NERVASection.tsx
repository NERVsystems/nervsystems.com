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
      description: "Autonomous flight path planning, real-time ISR analysis, automatic target identification, and predictive drone positioning. NERVA doesn't just show drone feeds—it plans, analyzes, and acts autonomously.",
      features: ["Autonomous flight planning", "Real-time ISR analysis", "Target identification", "Predictive positioning"],
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
      title: "Intelligent Geofencing",
      command: '"NERVA, alert me if anyone enters Zone Delta"',
      description: "Creates dynamic geofences with complex boundaries, monitors all TAK feeds, generates detailed incident descriptions, and automatically escalates threats based on assessment.",
      features: ["Dynamic geofences", "Automatic incident reports", "Threat escalation", "Pattern analysis"],
      videoPlaceholder: true
    },
    {
      icon: "AIRSPACE",
      title: "3D Airspace Visualization",
      command: "Show chart → NERVA renders 3D airspace",
      description: "Interprets complex airspace restriction charts and visualizes Class A/B/C/D/E airspace in 3D on tactical maps. Provides real-time airspace violation warnings and deconfliction with friendly assets.",
      features: ["AI chart interpretation", "3D visualization", "Violation warnings", "Asset deconfliction"],
      videoPlaceholder: true
    }
  ];

  return (
    <section id="nerva" className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Meet NERVA
          </h2>
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
      {showDemoForm && <RequestDemoForm onClose={() => setShowDemoForm(false)} formType="demo" />}
    </section>
  );
}

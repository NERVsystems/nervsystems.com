'use client';

import { useState } from 'react';
import RequestDemoForm from '@/components/RequestDemoForm';

export default function TAKServicesSection() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <section id="services" className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Introduction */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Professional TAK Solutions for Asia Pacific
          </h2>
          <p className="text-tactical-textDim text-lg leading-relaxed">
            NERV Systems provides comprehensive TAK (Team Awareness Kit) and ATAK (Android Team Awareness Kit) solutions including managed TAK server hosting, ATAK deployment consulting, TAK system administration, operator training programs, and custom TAK plugin development. Our AI-enhanced TAK platform combines traditional TAK capabilities with intelligent automation through NERVA.
          </p>
        </div>

        {/* Managed TAK Hosting */}
        <div className="mb-24">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Managed TAK Server Hosting</h3>
            <p className="text-tactical-textDim text-lg max-w-3xl">
              Enterprise-grade TAK server hosting with 99.9% uptime SLA. Our managed TAK hosting service eliminates the complexity of TAK server administration while providing AI-enhanced capabilities through NERVA integration. Perfect for organizations deploying TAK/ATAK systems across military, law enforcement, emergency management, and public safety operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Starter */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">Starter</h4>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-white">$495</span>
                  <span className="text-tactical-textDim ml-2">/month</span>
                </div>
                <p className="text-sm text-tactical-textDim mb-1">Up to 50 TAK users</p>
                <p className="text-xs font-mono text-tactical-accent">NERVA Lite (3 AI capabilities)</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Basic TAK Server deployment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Standard ATAK plugins included</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">99% TAK server uptime SLA</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Email support for TAK issues</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Monthly TAK security patches</span>
                </li>
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                Get Started with TAK
              </button>
            </div>

            {/* Professional */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ring-2 ring-tactical-accent relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                  POPULAR
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">Professional</h4>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-white">$1,495</span>
                  <span className="text-tactical-textDim ml-2">/month</span>
                </div>
                <p className="text-sm text-tactical-textDim mb-1">Up to 250 ATAK users</p>
                <p className="text-xs font-mono text-tactical-accent">Full NERVA (all 6 AI capabilities)</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Enterprise TAK Server</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Premium ATAK plugins</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">99.9% TAK uptime SLA</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">24/7 TAK support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">TAK federation support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">AI system health monitoring</span>
                </li>
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
              >
                Start Professional TAK
              </button>
            </div>

            {/* Enterprise */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">Enterprise</h4>
                <div className="text-3xl font-bold text-white mb-2">Custom</div>
                <p className="text-sm text-tactical-textDim mb-1">1,000+ TAK/ATAK users</p>
                <p className="text-xs font-mono text-tactical-accent">Custom NERVA + Training</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Custom TAK infrastructure</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">White-label TAK options</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">99.99% TAK uptime SLA</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Dedicated TAK support team</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Multi-region TAK deployment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">TAK compliance packages</span>
                </li>
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                Contact for Enterprise TAK
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-tactical-textDim">
            <p>All TAK hosting plans include: SSL certificates, automated backups, DDoS protection, and access to TAK.gov updates</p>
          </div>
        </div>

        {/* TAK Deployment Consulting */}
        <div className="mb-24">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">TAK Deployment Consulting</h3>
            <p className="text-tactical-textDim text-lg max-w-3xl">
              Expert TAK deployment services from initial requirements assessment to full operational capability. Our TAK consulting team brings extensive experience deploying ATAK systems for defense, law enforcement, and emergency management organizations. Every TAK deployment includes an AI capability integration roadmap showing how NERVA enhances your TAK operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Assessment */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">TAK Assessment</h4>
                <div className="text-3xl font-bold text-white mb-2">$4,500</div>
                <p className="text-sm text-tactical-textDim">1-day on-site TAK evaluation</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">TAK requirements assessment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">TAK infrastructure design</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">ATAK user requirements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">TAK plugin selection guidance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">30-day TAK support</span>
                </li>
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                Request TAK Assessment
              </button>
            </div>

            {/* Deployment */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ring-2 ring-tactical-accent relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                  POPULAR
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">TAK Deployment</h4>
                <div className="text-3xl font-bold text-white mb-2">$15,000</div>
                <p className="text-sm text-tactical-textDim">Complete TAK system setup</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Full TAK Server deployment (100 users)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">ATAK plugin installation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">TAK system integration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Basic ATAK operator training</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">90-day TAK priority support</span>
                </li>
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
              >
                Deploy TAK System
              </button>
            </div>

            {/* Enterprise */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">Enterprise TAK</h4>
                <div className="text-3xl font-bold text-white mb-2">$45,000+</div>
                <p className="text-sm text-tactical-textDim">Large-scale TAK deployment</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Large TAK deployment (100+ users)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">AI integration roadmap</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Custom TAK plugin development</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">Advanced ATAK training (3 days)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                  <span className="text-sm text-tactical-textDim">180-day dedicated TAK support</span>
                </li>
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                Plan Enterprise TAK
              </button>
            </div>
          </div>
        </div>

        {/* TAK Training */}
        <div className="mb-16">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">TAK & ATAK Training Programs</h3>
            <p className="text-tactical-textDim text-lg max-w-3xl">
              Comprehensive TAK operator training and ATAK certification programs. Our TAK training covers everything from basic ATAK interface operations to advanced mission planning with NERVA AI assistance. Volume discounts available for team training: 10% off for 5-10 students, 20% off for 11-20 students, 30% off for 21+ students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-2">TAK Fundamentals</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">$595</span>
                <span className="text-sm text-tactical-textDim ml-2">/student</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">1-day ATAK basics course</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                Enroll in TAK Training
              </button>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 ring-2 ring-tactical-accent relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-tactical-accent text-black text-xs font-bold px-2 py-1 rounded">
                  RECOMMENDED
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">NERVA AI Training</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">$795</span>
                <span className="text-sm text-tactical-textDim ml-2">/student</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">1-day AI-enhanced TAK course</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
              >
                Enroll in AI Training
              </button>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-2">Advanced TAK Ops</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">$1,495</span>
                <span className="text-sm text-tactical-textDim ml-2">/student</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">2-day advanced ATAK course</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                Enroll in Advanced Training
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <RequestDemoForm
          onClose={() => setShowQuoteForm(false)}
          formType="quote"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID}
        />
      )}
    </section>
  );
}

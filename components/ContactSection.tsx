'use client';

import { useState } from 'react';
import RequestDemoForm from './RequestDemoForm';

export default function ContactSection() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <section id="contact" className="relative py-24 bg-tactical-bg border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Deploy Tactical AI?
          </h2>
          <p className="text-tactical-textDim text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you need NERVA AI integration, TAK solutions, or want to discuss your operational requirements—our team is here to help.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form CTA */}
          <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="font-mono text-tactical-accent text-sm mb-4 uppercase tracking-wider">
              General Inquiry
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Send Us a Message
            </h3>
            <p className="text-tactical-textDim mb-6">
              Fill out our contact form and our team will respond within 24 hours.
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="px-8 py-4 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
            >
              Contact Us →
            </button>
          </div>

          {/* Direct Contact Info */}
          <div className="tactical-border p-8 bg-white/5">
            <div className="font-mono text-tactical-accent text-sm mb-4 uppercase tracking-wider">
              Direct Contact
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Reach Out Directly
            </h3>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-mono text-tactical-textDim mb-1">EMAIL</div>
                <a href="mailto:contact@nervsystems.com" className="text-white hover:text-tactical-accent transition-colors">
                  contact@nervsystems.com
                </a>
              </div>

              <div>
                <div className="text-sm font-mono text-tactical-textDim mb-1">REGION</div>
                <div className="text-white">Asia Pacific Operations</div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-sm font-mono text-tactical-textDim mb-3">AFFILIATIONS</div>
                <div className="space-y-2 text-xs text-tactical-textDim">
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-accent">▸</span>
                    <span>NVIDIA Inception Member</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-accent">▸</span>
                    <span>NUS Enterprise Incubated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-accent">▸</span>
                    <span>King&apos;s College London Affiliated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center text-sm text-tactical-textDim">
          <p>Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a href="#nerva" className="hover:text-white transition-colors">
              NERVA AI Platform
            </a>
            <span>•</span>
            <a href="/solutions/tak" className="hover:text-white transition-colors">
              TAK Solutions
            </a>
            <span>•</span>
            <a href="/solutions/tak#resources" className="hover:text-white transition-colors">
              Resources & Guides
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <RequestDemoForm
          onClose={() => setShowContactForm(false)}
          formType="contact"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID}
        />
      )}
    </section>
  );
}

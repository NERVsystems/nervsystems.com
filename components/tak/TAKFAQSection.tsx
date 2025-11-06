'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is TAK/ATAK and why do I need it?",
    answer: "TAK (Team Awareness Kit) is a geospatial collaboration platform developed by the U.S. Air Force Research Lab for military and tactical operations. ATAK (Android Team Awareness Kit) is the mobile Android version that provides real-time situational awareness, mapping, location sharing, and mission coordination. Organizations need TAK/ATAK when they require secure, real-time geospatial coordination across distributed teams—whether for military operations, law enforcement tactical teams, search and rescue, or emergency management. NERV enhances standard TAK deployments with NERVA AI capabilities for intelligent mission planning and automated decision support."
  },
  {
    question: "What are the requirements for TAK server hosting?",
    answer: "Professional TAK server hosting requires: a TAK.gov account for official TAK Server software downloads, SSL certificates for encrypted TAK communications, dedicated server infrastructure with 99.9% uptime, DDoS protection for operational security, automated backup systems for TAK data, and expertise in TAK Server configuration and system administration. NERV's managed TAK hosting includes all these requirements plus AI-enhanced features through NERVA integration, starting at $495/month for small teams up to $1,495/month for large-scale TAK deployments."
  },
  {
    question: "How long does TAK deployment take?",
    answer: "TAK deployment timelines vary by complexity. Basic TAK server setup can be completed in 1-2 weeks for simple deployments. Comprehensive TAK/ATAK implementation including server configuration, client device setup, user training, plugin integration, and custom TAK data package development typically takes 4-8 weeks. Enterprise TAK deployments with extensive customization, multi-site architecture, legacy system integration, and advanced ATAK plugin development can require 3-6 months. NERV's TAK deployment consulting services include detailed project planning, timeline estimation, and milestone tracking throughout your TAK implementation journey."
  },
  {
    question: "Do you provide ATAK training and certification?",
    answer: "Yes, NERV offers comprehensive ATAK training programs for all skill levels. Our TAK Operator Fundamentals course ($595 per operator) covers ATAK interface navigation, map management, marker placement, location sharing, and basic TAK communications—perfect for new ATAK users. The Advanced TAK Operations course ($995 per operator) includes mission planning in ATAK, data package creation, plugin usage, TAK video integration, and tactical workflows. For technical teams, our TAK Administrator Certification ($1,495 per admin) provides deep training in TAK Server administration, user management, security configuration, plugin deployment, and system troubleshooting. All ATAK training includes hands-on exercises with real TAK/ATAK systems."
  },
  {
    question: "What makes NERV's TAK solutions different from other TAK hosting providers?",
    answer: "Unlike traditional TAK hosting companies, NERV combines expert TAK deployment services with AI-powered intelligence through NERVA integration. Every NERV TAK solution includes autonomous mission planning, automated CASEVAC coordination, real-time threat intelligence, intelligent geofencing, and 3D airspace visualization—capabilities not available from standard TAK providers. We also specialize in the Asia Pacific region with local TAK server hosting in Singapore, understanding of regional compliance requirements, and Asia-focused TAK deployment expertise. Additionally, our flexible deployment options include cloud TAK hosting, on-premise TAK servers, hybrid architectures, and edge-deployed TAK systems with our GPU-enabled hardware."
  },
  {
    question: "Can you develop custom TAK plugins?",
    answer: "Absolutely. NERV provides professional TAK plugin development services as part of our TAK Solutions Engineering offering. We develop custom ATAK plugins for Android devices, TAK Server plugins for backend integration, WinTAK plugins for Windows environments, and iTAK plugins for iOS. Our TAK plugin development expertise includes: integration with existing enterprise systems, custom data sources and feeds, specialized mission planning tools, automated workflow plugins, sensor and hardware integration, and AI-enhanced TAK capabilities through NERVA. TAK plugin development projects start at $15,000 for basic plugins up to $100,000+ for comprehensive TAK platform extensions with ongoing support."
  },
  {
    question: "Do you offer TAK system administration support?",
    answer: "Yes, comprehensive TAK system administration is included in all our managed TAK hosting plans. Our TAK sysadmin services cover: TAK Server software updates and patches, user account management and access control, SSL certificate management and renewal, TAK data package deployment and updates, plugin installation and configuration, performance monitoring and optimization, security auditing and compliance, backup verification and disaster recovery, and 24/7 TAK system monitoring. For organizations running their own TAK infrastructure, we also offer standalone TAK system administration consulting at $195/hour or monthly TAK support retainers starting at $2,500/month."
  },
  {
    question: "What TAK/ATAK use cases do you support?",
    answer: "NERV supports the full spectrum of TAK/ATAK applications across defense, public safety, and emergency services. Military TAK use cases include: command and control (C2), intelligence/surveillance/reconnaissance (ISR), close air support (CAS) coordination, CASEVAC/MEDEVAC operations, multi-domain operations, and training exercises. Law enforcement ATAK applications include: SWAT team coordination, event security management, border patrol operations, fugitive tracking, and inter-agency collaboration. Emergency management TAK deployments cover: search and rescue (SAR), wildfire response, disaster relief coordination, EMS operations, and multi-agency incident management. Every use case is enhanced with NERVA AI capabilities for smarter mission execution."
  },
  {
    question: "How does NERVA AI integration enhance TAK systems?",
    answer: "NERVA transforms standard TAK/ATAK from basic situational awareness into an intelligent decision support platform. NERVA analyzes TAK data in real-time to provide: autonomous mission planning with optimized routes and timing, automated CASEVAC coordination calculating best LZ locations and flight paths, hostile unit intelligence with threat prediction and countermeasure recommendations, intelligent search area calculation for SAR operations, geofencing with automatic alerts for airspace violations, and 3D airspace visualization for UAS deconfliction. NERVA runs on cloud infrastructure, on-premise servers, or our edge-deployed GPU hardware, integrating seamlessly with existing TAK Server deployments through standard TAK protocols and APIs."
  }
];

export default function TAKFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            TAK Solutions FAQ
          </h2>
          <p className="text-tactical-textDim text-lg">
            Common questions about TAK/ATAK hosting, deployment, training, and NERVA AI integration
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="tactical-border bg-white/5 overflow-hidden transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-start justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-0.5 flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-white font-bold text-lg pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className={`text-tactical-accent text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                    +
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pl-20">
                  <p className="text-tactical-textDim leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-tactical-textDim mb-6">
            Have more questions about TAK hosting, ATAK deployment, or NERVA integration?
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
          >
            Contact Our TAK Experts
          </Link>
        </div>
      </div>
    </section>
  );
}

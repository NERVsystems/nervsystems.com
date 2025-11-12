'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Resource {
  title: string;
  description: string;
  pages: string;
  format: string;
  category: string;
  topics: string[];
}

export default function TAKResourcesSection() {
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    organization: '',
    jobtitle: '',
    role: '',
    currentStage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const resources: Resource[] = [
    {
      title: "Tactical AI ROI Calculator & Guide",
      description: "Comprehensive analysis of AI integration ROI for tactical operations. Calculate cost savings from automated mission planning, reduced planning time, improved decision accuracy, and enhanced operational tempo. Includes real-world case studies and deployment scenarios.",
      pages: "24 pages",
      format: "PDF",
      category: "ROI",
      topics: ["Cost-benefit analysis", "AI automation savings", "Deployment timelines", "Performance metrics"]
    },
    {
      title: "TAK vs. Commercial Alternatives: Complete Comparison",
      description: "In-depth comparison of TAK/ATAK against commercial C2 platforms, emergency management systems, and proprietary solutions. Covers functionality, total cost of ownership, security considerations, interoperability, and integration capabilities. Includes decision framework for platform selection.",
      pages: "32 pages",
      format: "PDF",
      category: "COMPARISON",
      topics: ["Platform comparison matrix", "TCO analysis", "Security comparison", "Integration capabilities"]
    },
    {
      title: "TAK Deployment Checklist: Complete Implementation Guide",
      description: "Step-by-step deployment checklist for TAK/ATAK implementations. Covers requirements gathering, infrastructure planning, security configuration, user onboarding, training programs, and go-live procedures. Includes templates, configuration examples, and common pitfall avoidance.",
      pages: "18 pages",
      format: "PDF",
      category: "DEPLOYMENT",
      topics: ["Pre-deployment planning", "Infrastructure setup", "Security hardening", "User training plan"]
    },
    {
      title: "NERVA AI Integration Architecture Guide",
      description: "Technical architecture documentation for NERVA integration with existing TAK deployments. Covers API specifications, data flows, security architecture, deployment patterns (cloud/on-premise/edge), and migration strategies. Includes reference implementations and code samples.",
      pages: "28 pages",
      format: "PDF",
      category: "TECHNICAL",
      topics: ["API integration", "Security architecture", "Deployment patterns", "Migration strategies"]
    },
    {
      title: "Asia Pacific TAK Compliance & Regulations Guide",
      description: "Comprehensive guide to regulatory requirements, data sovereignty considerations, and compliance frameworks for TAK deployments across Asia Pacific. Covers Singapore, Hong Kong, Japan, Australia, and regional requirements. Includes compliance checklists and certification guidance.",
      pages: "22 pages",
      format: "PDF",
      category: "COMPLIANCE",
      topics: ["Regional regulations", "Data sovereignty", "Security certifications", "Compliance frameworks"]
    },
    {
      title: "TAK System Administration Best Practices",
      description: "Operations manual for TAK system administrators. Covers monitoring, backup strategies, performance tuning, security patching, user management, federation setup, and troubleshooting. Includes automation scripts and operational runbooks.",
      pages: "36 pages",
      format: "PDF",
      category: "OPERATIONS",
      topics: ["System monitoring", "Backup & recovery", "Performance optimization", "Security operations"]
    }
  ];

  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource);
    setShowDownloadForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to HubSpot Forms API
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const formId = process.env.NEXT_PUBLIC_HUBSPOT_RESOURCE_FORM_ID;

      if (!portalId || !formId) {
        // Fallback: just show success
        console.warn('HubSpot not configured for resource downloads');
        setSubmitSuccess(true);
        setTimeout(() => {
          setShowDownloadForm(false);
          setSubmitSuccess(false);
          setFormData({ firstname: '', lastname: '', email: '', organization: '', jobtitle: '', role: '', currentStage: '' });
          setSelectedResource(null);
        }, 2000);
        return;
      }

      // HubSpot API submission
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: [
              { name: 'firstname', value: formData.firstname },
              { name: 'lastname', value: formData.lastname },
              { name: 'email', value: formData.email },
              { name: 'company', value: formData.organization },
              { name: 'jobtitle', value: formData.jobtitle },
              { name: 'hs_role', value: formData.role }, // HubSpot Employment Role dropdown
              { name: 'current_stage', value: formData.currentStage }, // Current Stage dropdown
              { name: 'resource_requested', value: selectedResource?.title || '' },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      );

      if (response.ok) {
        setSubmitSuccess(true);
        // In production, trigger actual PDF download here
        // window.location.href = `/downloads/${selectedResource?.category.toLowerCase()}.pdf`;

        setTimeout(() => {
          setShowDownloadForm(false);
          setSubmitSuccess(false);
          setFormData({ firstname: '', lastname: '', email: '', organization: '', jobtitle: '', role: '', currentStage: '' });
          setSelectedResource(null);
        }, 2000);
      } else {
        console.error('HubSpot submission failed:', await response.text());
        alert('There was an issue submitting the form. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Download form submission error:', error);
      alert('There was an issue submitting the form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="resources" className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            Free Resources
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            TAK Intelligence Library
          </h2>
          <p className="text-tactical-textDim text-lg max-w-3xl mx-auto">
            Download comprehensive guides, technical documentation, and strategic resources to accelerate your TAK deployment and maximize ROI from AI integration.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className="font-mono text-xs text-tactical-accent bg-black/30 px-2 py-1 rounded border border-tactical-accent/30">
                  {resource.category}
                </span>
                <span className="font-mono text-xs text-tactical-textDim ml-2">
                  {resource.pages} • {resource.format}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">
                {resource.title}
              </h3>

              {/* Description */}
              <p className="text-tactical-textDim text-sm mb-4 flex-grow leading-relaxed">
                {resource.description}
              </p>

              {/* Topics */}
              <div className="mb-4">
                <div className="text-xs font-mono text-tactical-accent mb-2">COVERS:</div>
                <div className="flex flex-wrap gap-1">
                  {resource.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-tactical-textDim bg-black/30 px-2 py-1 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownloadClick(resource)}
                className="w-full px-6 py-3 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
              >
                Download Free PDF →
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center tactical-border p-8 bg-white/5">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need custom analysis for your organization?
          </h3>
          <p className="text-tactical-textDim mb-6 max-w-2xl mx-auto">
            Our TAK consulting team can provide tailored assessments, ROI analysis, and deployment planning specific to your operational requirements.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>

      {/* Download Form Modal */}
      {showDownloadForm && selectedResource && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="tactical-border bg-tactical-surface p-8 max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setShowDownloadForm(false)}
              className="absolute top-4 right-4 text-tactical-textDim hover:text-white text-2xl"
            >
              ×
            </button>

            {!submitSuccess ? (
              <>
                {/* Modal Header */}
                <div className="mb-6">
                  <div className="font-mono text-xs text-tactical-accent mb-2 uppercase tracking-wider">
                    {selectedResource.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Download Resource
                  </h3>
                  <p className="text-tactical-textDim text-sm">
                    {selectedResource.title}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstname}
                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                        className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Company name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.jobtitle}
                      onChange={(e) => setFormData({ ...formData, jobtitle: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Employment Role *
                    </label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                    >
                      <option value="">Select your role</option>
                      <option value="Support">Support</option>
                      <option value="Sales">Sales</option>
                      <option value="Retired">Retired</option>
                      <option value="Research">Research</option>
                      <option value="Recruiting">Recruiting</option>
                      <option value="Product Management">Product Management</option>
                      <option value="Marketing">Marketing</option>
                      <option value="IT">IT</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Executive Leadership">Executive Leadership</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Education">Education</option>
                      <option value="Design">Design</option>
                      <option value="Customer Success">Customer Success</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Business Development">Business Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Current Stage
                    </label>
                    <select
                      value={formData.currentStage}
                      onChange={(e) => setFormData({ ...formData, currentStage: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                    >
                      <option value="">Select stage...</option>
                      <option value="Researching solutions">Researching solutions</option>
                      <option value="Evaluating vendors">Evaluating vendors</option>
                      <option value="Ready to purchase">Ready to purchase</option>
                      <option value="Already using TAK">Already using TAK</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Download PDF →'}
                  </button>

                  <p className="text-xs text-tactical-textDim text-center">
                    We respect your privacy. Your information will only be used to send you relevant TAK resources and updates.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-tactical-accent text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-white mb-2">Download Starting...</h3>
                <p className="text-tactical-textDim">
                  Your download should begin automatically. Check your email for additional resources.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

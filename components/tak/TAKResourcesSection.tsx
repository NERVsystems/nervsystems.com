'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('takSolutions.resources');
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
              pageUri: typeof window !== 'undefined' ? window.location.href : '',
              pageName: typeof document !== 'undefined' ? document.title : '',
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
            {t('eyebrow')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.raw('items').map((resource: Resource, index: number) => (
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
                <div className="text-xs font-mono text-tactical-accent mb-2">{t('covers')}</div>
                <div className="flex flex-wrap gap-1">
                  {resource.topics.map((topic: string, idx: number) => (
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
                {t('downloadButton')}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center tactical-border p-8 bg-white/5">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t('cta.title')}
          </h3>
          <p className="text-tactical-textDim mb-6 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
          >
            {t('cta.button')}
          </Link>
        </div>
      </div>

      {/* Download Form Modal */}
      {showDownloadForm && selectedResource && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="tactical-border bg-tactical-surface p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
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
                    {t('form.title')}
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
                        {t('form.firstName')} {t('form.required')}
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
                        {t('form.lastName')} {t('form.required')}
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
                      {t('form.email')} {t('form.required')}
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
                      {t('form.company')} {t('form.required')}
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
                      {t('form.jobTitle')}
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
                      {t('form.role')} {t('form.required')}
                    </label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                    >
                      <option value="">{t('form.selectRole')}</option>
                      <option value="Support">{t('form.roles.support')}</option>
                      <option value="Sales">{t('form.roles.sales')}</option>
                      <option value="Retired">{t('form.roles.retired')}</option>
                      <option value="Research">{t('form.roles.research')}</option>
                      <option value="Recruiting">{t('form.roles.recruiting')}</option>
                      <option value="Product Management">{t('form.roles.productManagement')}</option>
                      <option value="Marketing">{t('form.roles.marketing')}</option>
                      <option value="IT">{t('form.roles.it')}</option>
                      <option value="Human Resources">{t('form.roles.hr')}</option>
                      <option value="Finance">{t('form.roles.finance')}</option>
                      <option value="Executive Leadership">{t('form.roles.executiveLeadership')}</option>
                      <option value="Engineering">{t('form.roles.engineering')}</option>
                      <option value="Education">{t('form.roles.education')}</option>
                      <option value="Design">{t('form.roles.design')}</option>
                      <option value="Customer Success">{t('form.roles.customerSuccess')}</option>
                      <option value="Consulting">{t('form.roles.consulting')}</option>
                      <option value="Business Development">{t('form.roles.businessDevelopment')}</option>
                      <option value="Other">{t('form.roles.other')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('form.currentStage')}
                    </label>
                    <select
                      value={formData.currentStage}
                      onChange={(e) => setFormData({ ...formData, currentStage: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                    >
                      <option value="">{t('form.selectStage')}</option>
                      <option value="Researching solutions">{t('form.stages.researching')}</option>
                      <option value="Evaluating vendors">{t('form.stages.evaluating')}</option>
                      <option value="Ready to purchase">{t('form.stages.readyToPurchase')}</option>
                      <option value="Already using TAK">{t('form.stages.alreadyUsingTAK')}</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('form.processing') : t('form.downloadButton')}
                  </button>

                  <p className="text-xs text-tactical-textDim text-center">
                    {t('form.privacy')}
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-tactical-accent text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('form.successTitle')}</h3>
                <p className="text-tactical-textDim">
                  {t('form.successMessage')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

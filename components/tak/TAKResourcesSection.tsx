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
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const resources = t.raw('items') as Resource[];

  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource);
    setShowDownloadForm(true);
  };

  // Map resource category to form ID environment variable
  const getFormIdForResource = (category: string): string | undefined => {
    const formIdMap: Record<string, string | undefined> = {
      'ROI': process.env.NEXT_PUBLIC_HUBSPOT_RESOURCE_ROI_FORM_ID,
      'COMPARISON': process.env.NEXT_PUBLIC_HUBSPOT_RESOURCE_COMPARISON_FORM_ID,
      'DEPLOYMENT': process.env.NEXT_PUBLIC_HUBSPOT_RESOURCE_DEPLOYMENT_FORM_ID,
      'TECHNICAL': process.env.NEXT_PUBLIC_HUBSPOT_RESOURCE_TECHNICAL_FORM_ID,
      'COMPLIANCE': process.env.NEXT_PUBLIC_HUBSPOT_RESOURCE_COMPLIANCE_FORM_ID,
      'OPERATIONS': process.env.NEXT_PUBLIC_HUBSPOT_RESOURCE_OPERATIONS_FORM_ID,
    };
    return formIdMap[category];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const formId = selectedResource ? getFormIdForResource(selectedResource.category) : undefined;

      if (!portalId || !formId) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('HubSpot not configured for resource downloads');
        }
        setSubmitSuccess(true);
        setTimeout(() => {
          setShowDownloadForm(false);
          setSubmitSuccess(false);
          setFormData({ firstname: '', lastname: '', email: '', organization: '', jobtitle: '', role: '' });
          setSelectedResource(null);
        }, 2000);
        return;
      }

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
              { name: 'hs_role', value: formData.role },
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
        setTimeout(() => {
          setShowDownloadForm(false);
          setSubmitSuccess(false);
          setFormData({ firstname: '', lastname: '', email: '', organization: '', jobtitle: '', role: '' });
          setSelectedResource(null);
        }, 2000);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('HubSpot submission failed:', await response.text());
        }
        alert('There was an issue submitting the form. Please try again or contact us directly.');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Download form submission error:', error);
      }
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
                <div className="text-xs font-mono text-tactical-accent mb-2">{t('coversLabel')}</div>
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
                    {t('downloadForm.eyebrow', { category: selectedResource.category })}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t('downloadForm.title')}
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
                        {t('downloadForm.fields.firstName')} {t('downloadForm.fields.required')}
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
                        {t('downloadForm.fields.lastName')} {t('downloadForm.fields.required')}
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
                      {t('downloadForm.fields.email')} {t('downloadForm.fields.required')}
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
                      {t('downloadForm.fields.company')} {t('downloadForm.fields.required')}
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
                      {t('downloadForm.fields.jobTitle')}
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
                      {t('downloadForm.fields.role')} {t('downloadForm.fields.required')}
                    </label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 text-white focus:border-tactical-accent focus:outline-none"
                    >
                      <option value="">{t('downloadForm.fields.selectRole')}</option>
                      {Object.keys(t.raw('downloadForm.roles') as object).map((roleKey) => (
                        <option key={roleKey} value={t(`downloadForm.roles.${roleKey}`)}>
                          {t(`downloadForm.roles.${roleKey}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('downloadForm.submitting') : t('downloadForm.submitButton')}
                  </button>

                  <p className="text-xs text-tactical-textDim text-center">
                    {t('downloadForm.privacyNote')}
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-tactical-accent text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('downloadForm.success.title')}</h3>
                <p className="text-tactical-textDim">
                  {t('downloadForm.success.description')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

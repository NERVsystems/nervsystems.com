'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface RequestDemoFormProps {
  onClose: () => void;
  formType?: 'demo' | 'quote' | 'contact';
  formId?: string; // Optional: specify which HubSpot form to use
}

export default function RequestDemoForm({ onClose, formType = 'demo', formId }: RequestDemoFormProps) {
  const t = useTranslations('form');

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    organization: '',
    phone: '',
    jobtitle: '',
    interest: formType === 'quote' ? t('options.interest.hosting') : t('options.interest.nerva'),
    message: '',
    // TAK-specific fields
    organisationType: '',
    currentTakUsage: '',
    estimatedTakUsers: '',
    takDeploymentTimeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to HubSpot Forms API
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const hubspotFormId = formId || process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

      if (!portalId || !hubspotFormId) {
        // Fallback to mailto if HubSpot not configured
        const subject = encodeURIComponent(`${t(`${formType}.title`)} - ${formData.organization || `${formData.firstname} ${formData.lastname}`}`);
        const body = encodeURIComponent(`
First Name: ${formData.firstname}
Last Name: ${formData.lastname}
Email: ${formData.email}
Organization: ${formData.organization}
Phone: ${formData.phone}
Interest: ${formData.interest}

Message:
${formData.message}

---
Form Type: ${t(`${formType}.title`)}
Submitted: ${new Date().toISOString()}
        `);
        window.location.href = `mailto:contact@nervsystems.com?subject=${subject}&body=${body}`;
        setSubmitted(true);
        setIsSubmitting(false);
        return;
      }

      // Build fields based on form type
      let fields: Array<{ name: string; value: string }> = [
        { name: 'firstname', value: formData.firstname },
        { name: 'lastname', value: formData.lastname },
        { name: 'email', value: formData.email },
        { name: 'company', value: formData.organization },
      ];

      // Add phone - required for quote form
      if (formData.phone) {
        fields.push({ name: 'phone', value: formData.phone });
      }

      // Add job title if provided (for demo form)
      if (formData.jobtitle && formType === 'demo') {
        fields.push({ name: 'jobtitle', value: formData.jobtitle });
      }

      // Add form-specific fields
      if (formType === 'demo') {
        // Demo Request Form fields
        if (formData.interest) {
          fields.push({ name: 'use_case', value: formData.interest });
        }
      } else if (formType === 'quote') {
        // TAK Service Interest Form fields - all required by HubSpot
        fields.push({ name: 'phone', value: formData.phone || '' }); // Ensure phone is always sent
        if (formData.interest) {
          fields.push({ name: 'tak_interest_type', value: formData.interest });
        }
        fields.push({ name: 'organisation_type', value: formData.organisationType });
        fields.push({ name: 'current_tak_usage', value: formData.currentTakUsage });
        if (formData.estimatedTakUsers) {
          fields.push({ name: 'estimated_tak_users', value: formData.estimatedTakUsers });
        }
        if (formData.takDeploymentTimeline) {
          fields.push({ name: 'tak_deployment_timeline', value: formData.takDeploymentTimeline });
        }
      } else if (formType === 'contact') {
        // General Contact Form fields
        if (formData.interest) {
          fields.push({ name: 'enquiry_type', value: formData.interest });
        }
      }

      // Add message if provided
      if (formData.message) {
        fields.push({ name: 'message', value: formData.message });
      }

      // HubSpot API submission
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${hubspotFormId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: fields,
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorText = await response.text();
        console.error('HubSpot submission failed:', errorText);
        // Fallback to mailto on error
        alert(t('messages.error'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback to mailto on error
      alert(t('messages.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-tactical-surface tactical-border max-w-md w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-tactical-textDim hover:text-white transition-colors"
          >
            ✕
          </button>

          <div className="text-center">
            <div className="text-tactical-accent text-4xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('messages.success.title')}</h3>
            <p className="text-tactical-textDim mb-6">
              {t(`messages.success.${formType}`)}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
            >
              {t('buttons.close')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-tactical-surface tactical-border max-w-2xl w-full p-8 my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-tactical-textDim hover:text-white transition-colors text-2xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">{t(`${formType}.title`)}</h2>
        <p className="text-tactical-textDim mb-6">
          {t(`${formType}.subtitle`)}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-mono text-tactical-textDim mb-2">
                {t('fields.firstName.required')}
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                value={formData.firstname}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-mono text-tactical-textDim mb-2">
                {t('fields.lastName.required')}
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-tactical-textDim mb-2">
                {t('fields.email.required')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-mono text-tactical-textDim mb-2">
                {t('fields.organization.required')}
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                required
                value={formData.organization}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-mono text-tactical-textDim mb-2">
                {formType === 'quote' ? t('fields.phone.required') : t('fields.phone.label')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required={formType === 'quote'}
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
              />
            </div>
          </div>

          {formType === 'demo' && (
            <div>
              <label htmlFor="jobtitle" className="block text-sm font-mono text-tactical-textDim mb-2">
                {t('fields.jobTitle.label')}
              </label>
              <input
                type="text"
                id="jobtitle"
                name="jobtitle"
                value={formData.jobtitle}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
              />
            </div>
          )}

          {formType === 'quote' && (
            <>
              <div>
                <label htmlFor="organisationType" className="block text-sm font-mono text-tactical-textDim mb-2">
                  {t('fields.organisationType.required')}
                </label>
                <select
                  id="organisationType"
                  name="organisationType"
                  required
                  value={formData.organisationType}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
                >
                  <option value="">{t('fields.organisationType.placeholder')}</option>
                  <option value="Military/Defense">{t('options.organisationType.military')}</option>
                  <option value="Law Enforcement">{t('options.organisationType.lawEnforcement')}</option>
                  <option value="Emergency Services">{t('options.organisationType.emergency')}</option>
                  <option value="Government">{t('options.organisationType.government')}</option>
                  <option value="Private Security">{t('options.organisationType.privateSecurity')}</option>
                  <option value="Commercial">{t('options.organisationType.commercial')}</option>
                  <option value="Other">{t('options.organisationType.other')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="currentTakUsage" className="block text-sm font-mono text-tactical-textDim mb-2">
                  {t('fields.currentTakUsage.required')}
                </label>
                <select
                  id="currentTakUsage"
                  name="currentTakUsage"
                  required
                  value={formData.currentTakUsage}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
                >
                  <option value="">{t('fields.currentTakUsage.placeholder')}</option>
                  <option value="Already using TAK">{t('options.currentTakUsage.alreadyUsing')}</option>
                  <option value="Ready to purchase">{t('options.currentTakUsage.readyToPurchase')}</option>
                  <option value="Evaluating vendors">{t('options.currentTakUsage.evaluating')}</option>
                  <option value="Researching solutions">{t('options.currentTakUsage.researching')}</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="estimatedTakUsers" className="block text-sm font-mono text-tactical-textDim mb-2">
                    {t('fields.estimatedTakUsers.label')}
                  </label>
                  <select
                    id="estimatedTakUsers"
                    name="estimatedTakUsers"
                    value={formData.estimatedTakUsers}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
                  >
                    <option value="">{t('fields.estimatedTakUsers.placeholder')}</option>
                    <option value="1-50">{t('options.estimatedTakUsers.range1')}</option>
                    <option value="51-250">{t('options.estimatedTakUsers.range2')}</option>
                    <option value="251-1000">{t('options.estimatedTakUsers.range3')}</option>
                    <option value="1000+">{t('options.estimatedTakUsers.range4')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="takDeploymentTimeline" className="block text-sm font-mono text-tactical-textDim mb-2">
                    {t('fields.takDeploymentTimeline.label')}
                  </label>
                  <select
                    id="takDeploymentTimeline"
                    name="takDeploymentTimeline"
                    value={formData.takDeploymentTimeline}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
                  >
                    <option value="">{t('fields.takDeploymentTimeline.placeholder')}</option>
                    <option value="Immediate (0-1 month)">{t('options.takDeploymentTimeline.immediate')}</option>
                    <option value="Short term (1-3 months)">{t('options.takDeploymentTimeline.shortTerm')}</option>
                    <option value="Medium term (3-6 months)">{t('options.takDeploymentTimeline.mediumTerm')}</option>
                    <option value="Long term (6+ months)">{t('options.takDeploymentTimeline.longTerm')}</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="interest" className="block text-sm font-mono text-tactical-textDim mb-2">
              {t('fields.interest.required')}
            </label>
            <select
              id="interest"
              name="interest"
              required
              value={formData.interest}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
            >
              <option value="NERVA AI Platform">{t('options.interest.nerva')}</option>
              <option value="TAK Hosting">{t('options.interest.hosting')}</option>
              <option value="TAK Deployment">{t('options.interest.deployment')}</option>
              <option value="TAK Training">{t('options.interest.training')}</option>
              <option value="System Administration">{t('options.interest.administration')}</option>
              <option value="Plugin Development">{t('options.interest.plugins')}</option>
              <option value="Edge Hardware">{t('options.interest.edge')}</option>
              <option value="Other">{t('options.interest.other')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-mono text-tactical-textDim mb-2">
              {formType === 'contact' ? t('fields.message.required') : t('fields.message.label')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required={formType === 'contact'}
              value={formData.message}
              onChange={handleChange}
              placeholder={t('fields.message.placeholder')}
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
            >
              {t('buttons.cancel')}
            </button>
          </div>

          <p className="text-xs text-tactical-textDim text-center mt-4">
            {t('messages.privacyPrefix')}{' '}
            <a href="/privacy" target="_blank" className="text-tactical-accent hover:text-white underline">
              {t('messages.privacyLink')}
            </a>
            {' '}{t('messages.privacyAnd')}{' '}
            <a href="/terms" target="_blank" className="text-tactical-accent hover:text-white underline">
              {t('messages.termsLink')}
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

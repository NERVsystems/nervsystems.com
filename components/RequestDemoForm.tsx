'use client';

import { useState } from 'react';

interface RequestDemoFormProps {
  onClose: () => void;
  formType?: 'demo' | 'quote' | 'contact';
  formId?: string; // Optional: specify which HubSpot form to use
}

export default function RequestDemoForm({ onClose, formType = 'demo', formId }: RequestDemoFormProps) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    organization: '',
    phone: '',
    jobtitle: '',
    interest: formType === 'quote' ? 'TAK Hosting' : 'NERVA AI Platform',
    message: '',
    // TAK-specific fields
    organisationType: '',
    currentTakUsage: '',
    estimatedTakUsers: '',
    takDeploymentTimeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formTitles = {
    demo: 'Request a Demo',
    quote: 'Request a Quote',
    contact: 'Contact Us'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to HubSpot Forms API
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const hubspotFormId = formId || process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

      if (!portalId || !hubspotFormId) {
        // Fallback to mailto if HubSpot not configured
        const subject = encodeURIComponent(`${formTitles[formType]} - ${formData.organization || `${formData.firstname} ${formData.lastname}`}`);
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
Form Type: ${formTitles[formType]}
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
        alert('There was an issue submitting the form. Please email us directly at contact@nervsystems.com');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback to mailto on error
      alert('There was an issue submitting the form. Please email us directly at contact@nervsystems.com');
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-tactical-surface tactical-border max-w-md w-full p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-tactical-textDim hover:text-white transition-colors"
          >
            ✕
          </button>

          <div className="text-center">
            <div className="text-tactical-accent text-4xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
            <p className="text-tactical-textDim mb-6">
              Your {formType} request has been received. Our team will contact you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-tactical-surface tactical-border max-w-2xl w-full p-8 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-tactical-textDim hover:text-white transition-colors text-2xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">{formTitles[formType]}</h2>
        <p className="text-tactical-textDim mb-6">
          Fill out the form below and our team will get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-mono text-tactical-textDim mb-2">
                FIRST NAME *
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
                LAST NAME *
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
                EMAIL *
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
                ORGANIZATION *
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
                PHONE{formType === 'quote' ? ' *' : ''}
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
                JOB TITLE
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
                  ORGANISATION TYPE *
                </label>
                <select
                  id="organisationType"
                  name="organisationType"
                  required
                  value={formData.organisationType}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
                >
                  <option value="">Select organisation type...</option>
                  <option value="Military/Defense">Military/Defense</option>
                  <option value="Law Enforcement">Law Enforcement</option>
                  <option value="Emergency Services">Emergency Services</option>
                  <option value="Government">Government</option>
                  <option value="Private Security">Private Security</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="currentTakUsage" className="block text-sm font-mono text-tactical-textDim mb-2">
                  CURRENT TAK USAGE *
                </label>
                <select
                  id="currentTakUsage"
                  name="currentTakUsage"
                  required
                  value={formData.currentTakUsage}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
                >
                  <option value="">Select current usage...</option>
                  <option value="Already using TAK">Already using TAK</option>
                  <option value="Ready to purchase">Ready to purchase</option>
                  <option value="Evaluating vendors">Evaluating vendors</option>
                  <option value="Researching solutions">Researching solutions</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="estimatedTakUsers" className="block text-sm font-mono text-tactical-textDim mb-2">
                    ESTIMATED TAK USERS
                  </label>
                  <select
                    id="estimatedTakUsers"
                    name="estimatedTakUsers"
                    value={formData.estimatedTakUsers}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="1-50">1-50 users</option>
                    <option value="51-250">51-250 users</option>
                    <option value="251-1000">251-1000 users</option>
                    <option value="1000+">1000+ users</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="takDeploymentTimeline" className="block text-sm font-mono text-tactical-textDim mb-2">
                    DEPLOYMENT TIMELINE
                  </label>
                  <select
                    id="takDeploymentTimeline"
                    name="takDeploymentTimeline"
                    value={formData.takDeploymentTimeline}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="Immediate (0-1 month)">Immediate (0-1 month)</option>
                    <option value="Short term (1-3 months)">Short term (1-3 months)</option>
                    <option value="Medium term (3-6 months)">Medium term (3-6 months)</option>
                    <option value="Long term (6+ months)">Long term (6+ months)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="interest" className="block text-sm font-mono text-tactical-textDim mb-2">
              INTERESTED IN *
            </label>
            <select
              id="interest"
              name="interest"
              required
              value={formData.interest}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
            >
              <option value="NERVA AI Platform">NERVA AI Platform</option>
              <option value="TAK Hosting">Managed TAK Hosting</option>
              <option value="TAK Deployment">TAK Deployment Consulting</option>
              <option value="TAK Training">TAK Training Programs</option>
              <option value="System Administration">System Administration</option>
              <option value="Plugin Development">Plugin Development</option>
              <option value="Edge Hardware">Edge Hardware (GPU in a helmet)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-mono text-tactical-textDim mb-2">
              MESSAGE{formType === 'contact' ? ' *' : ''}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required={formType === 'contact'}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-tactical-textDim text-center mt-4">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </div>
  );
}

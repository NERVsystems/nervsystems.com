'use client';

import { useState } from 'react';

interface RequestDemoFormProps {
  onClose: () => void;
  formType?: 'demo' | 'quote' | 'contact';
  formId?: string; // Optional: specify which HubSpot form to use
}

export default function RequestDemoForm({ onClose, formType = 'demo', formId }: RequestDemoFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    interest: formType === 'quote' ? 'TAK Hosting' : 'NERVA AI Platform',
    message: ''
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

      // Debug logging
      console.log('[RequestDemoForm] Form submission started');
      console.log('[RequestDemoForm] Form Type:', formType);
      console.log('[RequestDemoForm] Portal ID:', portalId ? `${portalId} (SET)` : 'MISSING');
      console.log('[RequestDemoForm] Form ID (prop):', formId ? `${formId} (SET)` : 'NOT PROVIDED');
      console.log('[RequestDemoForm] Form ID (env):', process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID ? 'SET' : 'MISSING');
      console.log('[RequestDemoForm] Final Form ID:', hubspotFormId ? `${hubspotFormId} (SET)` : 'MISSING');

      if (!portalId || !hubspotFormId) {
        console.error('[RequestDemoForm] Missing HubSpot configuration - falling back to mailto');
        console.error('[RequestDemoForm] Portal ID present:', !!portalId);
        console.error('[RequestDemoForm] Form ID present:', !!hubspotFormId);
        // Fallback to mailto if HubSpot not configured
        const subject = encodeURIComponent(`${formTitles[formType]} - ${formData.organization || formData.name}`);
        const body = encodeURIComponent(`
Name: ${formData.name}
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

      // Split name into first and last
      const nameParts = formData.name.trim().split(' ');
      const firstname = nameParts[0] || '';
      const lastname = nameParts.slice(1).join(' ') || firstname;

      // Build fields based on form type
      let fields: Array<{ name: string; value: string }> = [
        { name: 'firstname', value: firstname },
        { name: 'lastname', value: lastname },
        { name: 'email', value: formData.email },
        { name: 'company', value: formData.organization },
      ];

      // Add phone if provided
      if (formData.phone) {
        fields.push({ name: 'phone', value: formData.phone });
      }

      // Add form-specific fields
      if (formType === 'demo') {
        // Demo Request Form fields
        if (formData.interest) {
          fields.push({ name: 'use_case', value: formData.interest });
        }
      } else if (formType === 'quote') {
        // TAK Service Interest Form fields
        if (formData.interest) {
          fields.push({ name: 'tak_interest_type', value: formData.interest });
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
      const apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${hubspotFormId}`;
      const payload = {
        fields: fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
      };

      console.log('[RequestDemoForm] Submitting to HubSpot API');
      console.log('[RequestDemoForm] API URL:', apiUrl);
      console.log('[RequestDemoForm] Payload:', JSON.stringify(payload, null, 2));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('[RequestDemoForm] Response status:', response.status);
      console.log('[RequestDemoForm] Response ok:', response.ok);

      if (response.ok) {
        console.log('[RequestDemoForm] Submission successful!');
        setSubmitted(true);
      } else {
        const errorText = await response.text();
        console.error('[RequestDemoForm] HubSpot submission failed');
        console.error('[RequestDemoForm] Status:', response.status);
        console.error('[RequestDemoForm] Error:', errorText);
        // Fallback to mailto on error
        alert('There was an issue submitting the form. Please email us directly at contact@nervsystems.com');
      }
    } catch (error) {
      console.error('[RequestDemoForm] Form submission error (catch block):', error);
      console.error('[RequestDemoForm] Error type:', error instanceof Error ? error.constructor.name : typeof error);
      console.error('[RequestDemoForm] Error message:', error instanceof Error ? error.message : String(error));
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
              <label htmlFor="name" className="block text-sm font-mono text-tactical-textDim mb-2">
                NAME *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
              />
            </div>

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
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
                PHONE
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 focus:border-tactical-accent focus:outline-none transition-colors"
              />
            </div>
          </div>

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
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
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

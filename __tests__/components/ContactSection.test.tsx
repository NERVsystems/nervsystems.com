import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactSection from '@/components/ContactSection';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'label': 'Contact Us',
      'title': 'Get in Touch',
      'subtitle': 'Ready to enhance your tactical operations?',
      'form.label': 'Request Demo',
      'form.title': 'Schedule a Demo',
      'form.description': 'See NERVA AI in action',
      'form.button': 'Open Contact Form',
      'direct.label': 'Direct Contact',
      'direct.title': 'Reach Out Directly',
      'direct.email.label': 'Email',
      'direct.email.value': 'contact@nervsystems.com',
      'direct.region.label': 'Region',
      'direct.region.value': 'Singapore & UK',
      'direct.affiliations.label': 'Affiliations',
      'direct.affiliations.nvidia': 'NVIDIA Inception Partner',
      'direct.affiliations.nus': 'NUS Enterprise Startup',
      'direct.affiliations.kcl': 'King\'s College London Alumni',
      'quickLinks.title': 'Quick Links',
      'quickLinks.nerva': 'NERVA AI',
      'quickLinks.tak': 'TAK Solutions',
      'quickLinks.resources': 'Resources',
    };
    return translations[key] || key;
  },
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock RequestDemoForm
jest.mock('@/components/RequestDemoForm', () => {
  return function MockRequestDemoForm({ onClose }: { onClose: () => void }) {
    return (
      <div data-testid="request-demo-form">
        <button onClick={onClose}>Close Form</button>
      </div>
    );
  };
});

describe('ContactSection', () => {

  it('renders section header correctly', () => {
    render(<ContactSection />);

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Ready to enhance your tactical operations?')).toBeInTheDocument();
  });

  it('renders contact form CTA card', () => {
    render(<ContactSection />);

    expect(screen.getByText('Request Demo')).toBeInTheDocument();
    expect(screen.getByText('Schedule a Demo')).toBeInTheDocument();
    expect(screen.getByText('See NERVA AI in action')).toBeInTheDocument();
    expect(screen.getByText('Open Contact Form')).toBeInTheDocument();
  });

  it('renders direct contact information card', () => {
    render(<ContactSection />);

    expect(screen.getByText('Direct Contact')).toBeInTheDocument();
    expect(screen.getByText('Reach Out Directly')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('contact@nervsystems.com')).toBeInTheDocument();
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('Singapore & UK')).toBeInTheDocument();
  });

  it('displays affiliations in direct contact', () => {
    render(<ContactSection />);

    expect(screen.getByText('Affiliations')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA Inception Partner')).toBeInTheDocument();
    expect(screen.getByText('NUS Enterprise Startup')).toBeInTheDocument();
    expect(screen.getByText('King\'s College London Alumni')).toBeInTheDocument();
  });

  it('renders quick links section', () => {
    render(<ContactSection />);

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('NERVA AI')).toBeInTheDocument();
    expect(screen.getByText('TAK Solutions')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('opens contact form modal when button is clicked', async () => {
    const { container } = render(<ContactSection />);

    // Wait for component to mount
    await waitFor(() => {
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    const openButton = screen.getByText('Open Contact Form');
    fireEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByTestId('request-demo-form')).toBeInTheDocument();
    });
  });

  it('closes contact form modal when close is triggered', async () => {
    const { container } = render(<ContactSection />);

    // Wait for component to mount
    await waitFor(() => {
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    const openButton = screen.getByText('Open Contact Form');
    fireEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByTestId('request-demo-form')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close Form');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('request-demo-form')).not.toBeInTheDocument();
    });
  });

  it('has proper section structure with contact id', () => {
    const { container } = render(<ContactSection />);

    const section = container.querySelector('#contact');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-24');
  });

  it('email link is properly formatted', () => {
    render(<ContactSection />);

    const emailLink = screen.getByText('contact@nervsystems.com').closest('a');
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@nervsystems.com');
  });
});

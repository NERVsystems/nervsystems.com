import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'tagline': 'AI-augmented mission planning for TAK systems',
      'taglineBottom': 'Enhancing operator capabilities through advanced AI',
      'copyright': '© 2025 NERV Systems. All rights reserved.',
      'navigation.title': 'Navigation',
      'navigation.nerva': 'NERVA AI',
      'navigation.platform': 'Platform',
      'navigation.takIntegration': 'TAK Integration',
      'navigation.solutions': 'Solutions',
      'contact.title': 'Contact',
      'contact.email': 'contact@nervsystems.com',
      'contact.region': 'Singapore & UK',
      'contact.affiliations.nvidia': 'NVIDIA Inception Partner',
      'contact.affiliations.nus': 'NUS Enterprise Startup',
      'contact.affiliations.kcl': 'King\'s College London Alumni',
      'legal.privacy': 'Privacy Policy',
      'legal.terms': 'Terms of Service',
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

describe('Footer', () => {
  it('renders footer with logo', () => {
    render(<Footer />);

    const logo = screen.getByAltText('NERV Systems');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/img/nerv-logo.png');
  });

  it('displays tagline', () => {
    render(<Footer />);

    expect(screen.getByText('AI-augmented mission planning for TAK systems')).toBeInTheDocument();
  });

  it('renders navigation section', () => {
    render(<Footer />);

    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('NERVA AI')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('TAK Integration')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);

    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('contact@nervsystems.com')).toBeInTheDocument();
    expect(screen.getByText('Singapore & UK')).toBeInTheDocument();
  });

  it('displays affiliations', () => {
    render(<Footer />);

    expect(screen.getByText(/NVIDIA Inception Partner/)).toBeInTheDocument();
    expect(screen.getByText(/NUS Enterprise Startup/)).toBeInTheDocument();
    expect(screen.getByText(/King's College London Alumni/)).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);

    const privacyLink = screen.getByText('Privacy Policy');
    const termsLink = screen.getByText('Terms of Service');

    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy');
    expect(termsLink.closest('a')).toHaveAttribute('href', '/terms');
  });

  it('displays copyright notice', () => {
    render(<Footer />);

    expect(screen.getByText('© 2025 NERV Systems. All rights reserved.')).toBeInTheDocument();
  });

  it('displays bottom tagline', () => {
    render(<Footer />);

    expect(screen.getByText('Enhancing operator capabilities through advanced AI')).toBeInTheDocument();
  });

  it('has proper footer structure with correct classes', () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-tactical-surface');
  });
});

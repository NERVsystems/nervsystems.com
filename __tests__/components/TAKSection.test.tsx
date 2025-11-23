import React from 'react';
import { render, screen } from '@testing-library/react';
import TAKSection from '@/components/TAKSection';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'title': 'TAK Integration',
      'subtitle': 'Native integration with Team Awareness Kit systems',
      'integration.native.label': 'Native CoT Protocol',
      'integration.native.description': 'Direct integration with TAK systems',
      'integration.noRetraining.label': 'Zero Training Required',
      'integration.noRetraining.description': 'Works with existing TAK deployments',
      'integration.realTime.label': 'Real-Time Sync',
      'integration.realTime.description': 'Instant updates across all TAK clients',
      'integration.natural.label': 'Natural Language Interface',
      'integration.natural.description': 'Voice and text commands',
      'integration.portable.label': 'Portable Edge Deployment',
      'integration.portable.description': 'Run on tactical edge hardware',
      'cta': 'Learn More',
    };
    return translations[key] || key;
  },
}));

describe('TAKSection', () => {
  it('renders section with correct heading', () => {
    render(<TAKSection />);

    expect(screen.getByText('TAK Integration')).toBeInTheDocument();
    expect(screen.getByText('Native integration with Team Awareness Kit systems')).toBeInTheDocument();
  });

  it('renders all five integration points', () => {
    render(<TAKSection />);

    expect(screen.getByText('Native CoT Protocol')).toBeInTheDocument();
    expect(screen.getByText('Zero Training Required')).toBeInTheDocument();
    expect(screen.getByText('Real-Time Sync')).toBeInTheDocument();
    expect(screen.getByText('Natural Language Interface')).toBeInTheDocument();
    expect(screen.getByText('Portable Edge Deployment')).toBeInTheDocument();
  });

  it('renders integration point descriptions', () => {
    render(<TAKSection />);

    expect(screen.getByText(/Direct integration with TAK systems/)).toBeInTheDocument();
    expect(screen.getByText(/Works with existing TAK deployments/)).toBeInTheDocument();
    expect(screen.getByText(/Instant updates across all TAK clients/)).toBeInTheDocument();
    expect(screen.getByText(/Voice and text commands/)).toBeInTheDocument();
    expect(screen.getByText(/Run on tactical edge hardware/)).toBeInTheDocument();
  });

  it('renders TAK logo', () => {
    render(<TAKSection />);

    const logo = screen.getByAltText('TAK - Team Awareness Kit');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/img/TAK Logo.jpg');
  });

  it('renders CTA button', () => {
    render(<TAKSection />);

    const ctaButton = screen.getByText('Learn More');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.tagName).toBe('BUTTON');
  });

  it('has proper section structure with platform id', () => {
    const { container } = render(<TAKSection />);

    const section = container.querySelector('#platform');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-24');
  });

  it('uses grid layout for content and image', () => {
    const { container } = render(<TAKSection />);

    const grid = container.querySelector('.grid.md\\:grid-cols-2');
    expect(grid).toBeInTheDocument();
  });
});

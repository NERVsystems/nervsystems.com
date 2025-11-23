import React from 'react';
import { render, screen } from '@testing-library/react';
import FeaturesSection from '@/components/FeaturesSection';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'title': 'Platform Capabilities',
      'subtitle': 'Advanced AI-powered tools for tactical operations',
      'items.planning.icon': '01',
      'items.planning.title': 'Mission Planning',
      'items.planning.description': 'AI-assisted mission planning and route optimization',
      'items.fusion.icon': '02',
      'items.fusion.title': 'Data Fusion',
      'items.fusion.description': 'Real-time intelligence aggregation and analysis',
      'items.assessment.icon': '03',
      'items.assessment.title': 'Threat Assessment',
      'items.assessment.description': 'Automated threat detection and risk analysis',
      'items.edge.icon': '04',
      'items.edge.title': 'Edge Computing',
      'items.edge.description': 'Deploy AI models on edge devices',
    };
    return translations[key] || key;
  },
}));

describe('FeaturesSection', () => {
  it('renders section header correctly', () => {
    render(<FeaturesSection />);

    expect(screen.getByText('Platform Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Advanced AI-powered tools for tactical operations')).toBeInTheDocument();
  });

  it('renders all four feature items', () => {
    render(<FeaturesSection />);

    expect(screen.getByText('Mission Planning')).toBeInTheDocument();
    expect(screen.getByText('Data Fusion')).toBeInTheDocument();
    expect(screen.getByText('Threat Assessment')).toBeInTheDocument();
    expect(screen.getByText('Edge Computing')).toBeInTheDocument();
  });

  it('renders feature icons with correct numbering', () => {
    render(<FeaturesSection />);

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<FeaturesSection />);

    expect(screen.getByText('AI-assisted mission planning and route optimization')).toBeInTheDocument();
    expect(screen.getByText('Real-time intelligence aggregation and analysis')).toBeInTheDocument();
    expect(screen.getByText('Automated threat detection and risk analysis')).toBeInTheDocument();
    expect(screen.getByText('Deploy AI models on edge devices')).toBeInTheDocument();
  });

  it('has proper section structure with features id', () => {
    const { container } = render(<FeaturesSection />);

    const section = container.querySelector('#features');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-24');
  });

  it('renders features in a grid layout', () => {
    const { container } = render(<FeaturesSection />);

    const grid = container.querySelector('.grid.md\\:grid-cols-2');
    expect(grid).toBeInTheDocument();
  });
});

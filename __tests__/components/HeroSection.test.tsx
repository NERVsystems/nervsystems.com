import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import HeroSection from '@/components/HeroSection';
import enMessages from '@/messages/en.json';

// Mock RequestDemoForm component
jest.mock('@/components/RequestDemoForm', () => {
  return function MockRequestDemoForm() {
    return <div data-testid="demo-form">Demo Form</div>;
  };
});

describe('HeroSection Component', () => {
  const renderWithIntl = (component: React.ReactNode) => {
    return render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        {component}
      </NextIntlClientProvider>
    );
  };

  it('should render without crashing', () => {
    renderWithIntl(<HeroSection />);
    expect(screen.getByText(enMessages.hero.title)).toBeInTheDocument();
  });

  it('should display translated title', () => {
    renderWithIntl(<HeroSection />);
    expect(screen.getByText(enMessages.hero.title)).toBeInTheDocument();
  });

  it('should display translated subtitle', () => {
    renderWithIntl(<HeroSection />);
    expect(screen.getByText(enMessages.hero.subtitle)).toBeInTheDocument();
  });

  describe('Stats section', () => {
    it('should display all stat values', () => {
      renderWithIntl(<HeroSection />);

      expect(screen.getByText(enMessages.hero.stats.planning.value)).toBeInTheDocument();
      expect(screen.getByText(enMessages.hero.stats.edge.value)).toBeInTheDocument();
      expect(screen.getByText(enMessages.hero.stats.tak.value)).toBeInTheDocument();
    });

    it('should display all stat labels', () => {
      renderWithIntl(<HeroSection />);

      expect(screen.getByText(enMessages.hero.stats.planning.label)).toBeInTheDocument();
      expect(screen.getByText(enMessages.hero.stats.edge.label)).toBeInTheDocument();
      expect(screen.getByText(enMessages.hero.stats.tak.label)).toBeInTheDocument();
    });

    it('should use nested translation paths correctly', () => {
      renderWithIntl(<HeroSection />);

      // Verify the structure: stats.planning.value, stats.planning.label, etc.
      const stats = ['planning', 'edge', 'tak'] as const;
      stats.forEach((statKey) => {
        const stat = enMessages.hero.stats[statKey];
        expect(screen.getByText(stat.value)).toBeInTheDocument();
        expect(screen.getByText(stat.label)).toBeInTheDocument();
      });
    });
  });

  describe('CTA buttons', () => {
    it('should display demo CTA button with translated text', () => {
      renderWithIntl(<HeroSection />);

      const demoButton = screen.getByRole('button', { name: enMessages.hero.cta.demo });
      expect(demoButton).toBeInTheDocument();
    });

    it('should display learn more link with translated text', () => {
      renderWithIntl(<HeroSection />);

      const learnLink = screen.getByRole('link', { name: enMessages.hero.cta.learn });
      expect(learnLink).toBeInTheDocument();
      expect(learnLink).toHaveAttribute('href', '#nerva');
    });

    it('should use nested cta translations', () => {
      renderWithIntl(<HeroSection />);

      expect(screen.getByText(enMessages.hero.cta.demo)).toBeInTheDocument();
      expect(screen.getByText(enMessages.hero.cta.learn)).toBeInTheDocument();
    });
  });

  it('should use translations from the hero namespace', () => {
    renderWithIntl(<HeroSection />);

    // Verify title and subtitle
    expect(screen.getByText(enMessages.hero.title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.hero.subtitle)).toBeInTheDocument();

    // Verify all stats
    Object.values(enMessages.hero.stats).forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });

    // Verify CTAs
    expect(screen.getByText(enMessages.hero.cta.demo)).toBeInTheDocument();
    expect(screen.getByText(enMessages.hero.cta.learn)).toBeInTheDocument();
  });
});

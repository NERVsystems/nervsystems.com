import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import TacticalNav from '@/components/TacticalNav';
import enMessages from '@/messages/en.json';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock RequestDemoForm component
jest.mock('@/components/RequestDemoForm', () => {
  return function MockRequestDemoForm() {
    return <div data-testid="demo-form">Demo Form</div>;
  };
});

describe('TacticalNav Component', () => {
  const renderWithIntl = (component: React.ReactNode) => {
    return render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        {component}
      </NextIntlClientProvider>
    );
  };

  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it('should render without crashing', () => {
    renderWithIntl(<TacticalNav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should display translated navigation items', () => {
    renderWithIntl(<TacticalNav />);

    expect(screen.getByText(enMessages.nav.features)).toBeInTheDocument();
    expect(screen.getByText(enMessages.nav.platform)).toBeInTheDocument();
    expect(screen.getByText(enMessages.nav.takSolutions)).toBeInTheDocument();
    expect(screen.getByText(enMessages.nav.contact)).toBeInTheDocument();
  });

  it('should display translated CTA button', () => {
    renderWithIntl(<TacticalNav />);

    const ctaButton = screen.getByRole('button', { name: enMessages.nav.requestDemo });
    expect(ctaButton).toBeInTheDocument();
  });

  it('should have correct href attributes for navigation links', () => {
    renderWithIntl(<TacticalNav />);

    const featuresLink = screen.getByText(enMessages.nav.features).closest('a');
    expect(featuresLink).toHaveAttribute('href', '/en/#features');

    const platformLink = screen.getByText(enMessages.nav.platform).closest('a');
    expect(platformLink).toHaveAttribute('href', '/en/#platform');

    const takSolutionsLink = screen.getByText(enMessages.nav.takSolutions).closest('a');
    expect(takSolutionsLink).toHaveAttribute('href', '/en/solutions/tak');

    const contactLink = screen.getByText(enMessages.nav.contact).closest('a');
    expect(contactLink).toHaveAttribute('href', '/en/#contact');
  });

  it('should display the logo image', () => {
    renderWithIntl(<TacticalNav />);

    const logo = screen.getByAltText('NERV Systems');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/img/nerv-logo.png');
  });

  it('should use translations from the nav namespace', () => {
    renderWithIntl(<TacticalNav />);

    // Verify all nav translations are used
    Object.values(enMessages.nav).forEach((translation) => {
      expect(screen.getByText(translation)).toBeInTheDocument();
    });
  });
});

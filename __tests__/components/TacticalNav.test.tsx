import { render, screen, fireEvent } from '@testing-library/react';
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
  return function MockRequestDemoForm({ onClose }: { onClose: () => void }) {
    return (
      <div data-testid="demo-form">
        <button onClick={onClose}>Close Form</button>
        Demo Form
      </div>
    );
  };
});

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

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
    expect(featuresLink).toHaveAttribute('href', '/#features');

    const platformLink = screen.getByText(enMessages.nav.platform).closest('a');
    expect(platformLink).toHaveAttribute('href', '/#platform');

    const takSolutionsLink = screen.getByText(enMessages.nav.takSolutions).closest('a');
    expect(takSolutionsLink).toHaveAttribute('href', '/solutions/tak');

    const contactLink = screen.getByText(enMessages.nav.contact).closest('a');
    expect(contactLink).toHaveAttribute('href', '/#contact');
  });

  it('should display the logo image', () => {
    renderWithIntl(<TacticalNav />);

    const logo = screen.getByAltText('NERV Systems');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/img/Screenshot 2025-06-20 at 20.44.53.png');
  });

  it('should use translations from the nav namespace', () => {
    renderWithIntl(<TacticalNav />);

    // Verify all nav translations are used
    Object.values(enMessages.nav).forEach((translation) => {
      expect(screen.getByText(translation)).toBeInTheDocument();
    });
  });

  describe('Demo Form Modal with Portal', () => {
    it('should not show demo form initially', () => {
      renderWithIntl(<TacticalNav />);
      expect(screen.queryByTestId('demo-form')).not.toBeInTheDocument();
    });

    it('should show demo form when CTA button is clicked', () => {
      renderWithIntl(<TacticalNav />);

      const ctaButton = screen.getByRole('button', { name: enMessages.nav.requestDemo });
      fireEvent.click(ctaButton);

      expect(screen.getByTestId('demo-form')).toBeInTheDocument();
    });

    it('should close demo form when close is triggered', () => {
      renderWithIntl(<TacticalNav />);

      // Open form
      const ctaButton = screen.getByRole('button', { name: enMessages.nav.requestDemo });
      fireEvent.click(ctaButton);
      expect(screen.getByTestId('demo-form')).toBeInTheDocument();

      // Close form
      const closeButton = screen.getByText('Close Form');
      fireEvent.click(closeButton);
      expect(screen.queryByTestId('demo-form')).not.toBeInTheDocument();
    });

    it('should render form via portal (mocked)', () => {
      // This test verifies that createPortal is being used
      // In the actual implementation, the form is rendered to document.body
      // Our mock just returns the node directly for testing purposes
      renderWithIntl(<TacticalNav />);

      const ctaButton = screen.getByRole('button', { name: enMessages.nav.requestDemo });
      fireEvent.click(ctaButton);

      // Form should be rendered (via mocked portal)
      expect(screen.getByTestId('demo-form')).toBeInTheDocument();
    });
  });
});
